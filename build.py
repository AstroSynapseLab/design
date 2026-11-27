#!/usr/bin/env python3
"""Build index.html, the one page with every project, from build.json.

build.json lists the projects and, for each, exactly what to build. Nothing else is read.

  { "title": "...", "projects": [ { "id": "webagen", "title": "webAgen", "build": [ <item>, ... ] } ] }

An item is one of:

  website   { "id", "type": "website", "title", "path" }
            path: a folder with index.html and the other pages. Shown as-is in the clickable frame.

  template  { "id", "type": "template", "title", "path", "renderers": [...], "theme", "styles", "tailwind" }
            path: a template folder:
              README.md      title (first H1) and one-line description
              design.md      Design page: prose, ```json design:colors|type|scale``` blocks, <!-- kit: <renderer> -->
              components.md  Components page: ### sections with **Ruleset:** and ```json``` examples
              layouts/*.md   Example layouts: ## steps with **User:**, **Why:** and a ```json``` array of sections
              content.md     Content page: default web content (markdown)
              prototype/     Prototype page: the template's clickable site (like a website item)
            renderers: JS files that draw the components from their JSON (live previews)
            theme + styles: the CSS those renderers use (the name the renderers declare as theme: "...")
            tailwind: optional twlite.py that adds the Tailwind utilities the renderers use to the styles

Every page of a website or prototype includes frame.js (warned when missing).

Run:  python3 build.py      then open index.html
"""
import html, importlib.util, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CONFIG, SHELL, OUT, FRAME = ROOT / "build.json", ROOT / "page.html", ROOT / "index.html", ROOT / "frame.js"
WARN = []


def rel(p):
    return str(Path(p).relative_to(ROOT))


# ---------------------------------------------------------------- markdown (small, no dependencies)
def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def strip_tags(s):
    return re.sub(r"<[^>]+>", "", s)


def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<![\w*])\*([^*\n]+)\*(?![\w*])", r"<em>\1</em>", s)
    s = re.sub(r"(?<![\w])_([^_\n]+)_(?![\w])", r"<em>\1</em>", s)
    s = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r'<a href="\2" target="_blank" rel="noopener">\1</a>', s)
    return s


def md(text, toc=None, base_level=0):
    """Markdown -> HTML. Supports headings, paragraphs, lists, tables, quotes, rules and code fences."""
    out, lines, i = [], text.split("\n"), 0
    while i < len(lines):
        l = lines[i]
        if not l.strip():
            i += 1; continue
        if l.startswith("```"):
            buf = []; i += 1
            while i < len(lines) and not lines[i].startswith("```"):
                buf.append(lines[i]); i += 1
            out.append(f"<pre>{html.escape(chr(10).join(buf))}</pre>"); i += 1; continue
        if l.startswith("<!--"):
            i += 1; continue
        m = re.match(r"^(#{1,6})\s+(.*)$", l)
        if m:
            lv = len(m.group(1)) + base_level; t = m.group(2).strip(); sid = slug(t)
            if toc is not None and lv <= 3: toc.append({"id": sid, "title": re.sub(r"[`*]", "", t), "level": lv})
            out.append(f'<h{min(lv, 6)} id="{sid}">{inline(t)}</h{min(lv, 6)}>'); i += 1; continue
        if re.match(r"^-{3,}\s*$", l):
            out.append("<hr>"); i += 1; continue
        if l.startswith(">"):
            buf = []
            while i < len(lines) and lines[i].startswith(">"):
                buf.append(lines[i].lstrip("> ")); i += 1
            out.append(f"<blockquote>{inline(' '.join(buf))}</blockquote>"); continue
        if l.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")]); i += 1
            head, body = rows[0], [r for r in rows[1:] if not all(re.match(r"^:?-+:?$", c) for c in r)]
            th = "".join(f"<th>{inline(c)}</th>" for c in head) if any(head) else ""
            out.append(f'<div class="tablewrap"><table>{f"<thead><tr>{th}</tr></thead>" if th else ""}<tbody>'
                       + "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in body) + "</tbody></table></div>")
            continue
        if re.match(r"^\s*([-*]|\d+\.)\s", l):
            ordered = bool(re.match(r"^\s*\d+\.", l)); items = []
            while i < len(lines) and re.match(r"^\s*([-*]|\d+\.)\s", lines[i]):
                items.append(re.sub(r"^\s*([-*]|\d+\.)\s+", "", lines[i])); i += 1
                while i < len(lines) and lines[i].startswith("   ") and lines[i].strip():
                    items[-1] += " " + lines[i].strip(); i += 1
            tag = "ol" if ordered else "ul"
            out.append(f"<{tag}>" + "".join(f"<li>{inline(x)}</li>" for x in items) + f"</{tag}>"); continue
        buf = []
        while i < len(lines) and lines[i].strip() and not re.match(r"^(#|```|\||>|\s*([-*]|\d+\.)\s|<!--)", lines[i]):
            buf.append(lines[i].strip()); i += 1
        if buf: out.append(f"<p>{inline(' '.join(buf))}</p>")
        else: i += 1
    return "\n".join(out)


# ---------------------------------------------------------------- components.md
def parse_blocks(text):
    rules, jsons, notes, raw, label = [], [], [], [], None
    lines, i = text.split("\n"), 0
    while i < len(lines):
        line = lines[i]
        m = re.match(r"^\*\*(.+?):?\*\*:?\s*$", line.strip())
        if m:
            label = m.group(1).rstrip(":")
        elif line.strip().startswith("```"):
            buf = []; i += 1
            while i < len(lines) and not lines[i].strip().startswith("```"):
                buf.append(lines[i]); i += 1
            jsons.append({"label": label or "JSON", "code": "\n".join(buf).strip()})
        elif re.match(r"^\s*[-*] ", line):
            item = re.sub(r"^\s*[-*] ", "", line).rstrip()
            if (label or "").lower().startswith("rule"): rules.append(inline(item)); raw.append(item)
            else: notes.append(inline(item))
        elif line.strip() and not line.startswith("#"):
            notes.append(inline(line.strip()))
        i += 1
    return rules, jsons, notes, raw


def components_export(comps, name):
    """The Components page download: every component's ruleset and JSON example as markdown (no renderer code)."""
    out = [f"# {comps['title'] or name} · rulesets and JSON", ""]
    for sh in comps["shared"]:
        if sh["raw"]: out += [f"## {sh['title']}", "", *[f"- {r}" for r in sh["raw"]], ""]
    for c in comps["components"]:
        out += [f"## {c['title']}", "", f"`{c['id']}`", "", "**Ruleset:**", "", *[f"- {r}" for r in c["raw"]], ""]
        for v in c["variants"]:
            out += [f"**JSON{'' if len(c['variants']) == 1 else ' · ' + v['label']}:**", "", "```json", v["code"], "```", ""]
    return "\n".join(out).rstrip() + "\n"


def parse_components(path, name):
    comps = {"title": "", "source": rel(path), "shared": [], "components": []}
    if not path.exists(): return comps
    text = path.read_text(encoding="utf-8")
    comps["title"] = (re.search(r"^# (.+)$", text, re.M) or [None, ""])[1]
    parts = re.split(r"^### (.+)$", text, flags=re.M)
    for title, body in zip(parts[1::2], parts[2::2]):
        rules, jsons, notes, raw = parse_blocks(body)
        if not jsons:
            comps["shared"].append({"title": title.strip(), "id": "shared-" + slug(title), "rules": rules + notes, "raw": raw}); continue
        variants, cname, problems, unique = [], None, [], False
        for j in jsons:
            try:
                data = json.loads(j["code"]); err = None
            except json.JSONDecodeError as e:
                data, err = None, f"line {e.lineno}: {e.msg}"; problems.append(f"{j['label']}: invalid JSON ({err})")
            props, vlabel = {}, None
            if data:
                c = (data.get("components") or [{}])[0]; cname = cname or c.get("name"); props = c.get("props", {}); vlabel = props.get("variant")
                unique = unique or c.get("unique") is True
            variants.append({"label": vlabel or (j["label"] if len(jsons) > 1 else "Default"), "code": j["code"], "props": props, "error": err})
        comps["components"].append({"id": cname or slug(title), "title": title.strip(), "rules": rules, "raw": raw, "notes": notes, "variants": variants, "problems": problems, "unique": unique})
        WARN.extend(f"{rel(path)} · {title.strip()} · {p}" for p in problems)
    if comps["components"]: comps["export"] = {"name": f"{name}-components.md", "md": components_export(comps, name)}
    return comps


# ---------------------------------------------------------------- design.md
def parse_design(path):
    if not path.exists(): return None
    text = path.read_text(encoding="utf-8")
    title = (re.search(r"^# (.+)$", text, re.M) or [None, "Design"])[1]
    body = re.split(r"^# .+$", text, maxsplit=1, flags=re.M)[-1]
    parts = re.split(r"^## (.+)$", body, flags=re.M)
    design = {"title": title, "source": rel(path), "intro": md(parts[0]), "sections": []}
    for name, chunk in zip(parts[1::2], parts[2::2]):
        blocks = []
        for kind, code in re.findall(r"```json design:(\w+)\n(.*?)```", chunk, re.S):
            try: blocks.append({"kind": kind, "data": json.loads(code)})
            except json.JSONDecodeError as e: WARN.append(f"{rel(path)} · {name} · invalid design:{kind} JSON ({e.msg})")
        kit = re.search(r"<!--\s*kit:\s*([a-z0-9-]+)\s*-->", chunk)
        prose = re.sub(r"```json design:\w+\n.*?```", "", chunk, flags=re.S)
        design["sections"].append({"id": slug(name), "title": name.strip(), "html": md(prose), "blocks": blocks, "kit": kit.group(1) if kit else None})
    return design


# ---------------------------------------------------------------- layouts/*.md
def parse_layouts(folder, known):
    flows = []
    for f in sorted(folder.glob("*.md")) if folder.is_dir() else []:
        text = f.read_text(encoding="utf-8")
        title = (re.search(r"^# (.+)$", text, re.M) or [None, f.stem])[1]
        parts = re.split(r"^## (.+)$", text, flags=re.M)
        intro = re.sub(r"^# .+$", "", parts[0], flags=re.M)
        steps = []
        for st, chunk in zip(parts[1::2], parts[2::2]):
            user = (re.search(r"^\*\*User:\*\*\s*(.+)$", chunk, re.M) or [None, ""])[1]
            why = (re.search(r"^\*\*Why:\*\*\s*(.+)$", chunk, re.M) or [None, ""])[1]
            code = (re.search(r"```json\n(.*?)```", chunk, re.S) or [None, "[]"])[1].strip()
            try:
                secs = json.loads(code)
            except json.JSONDecodeError as e:
                WARN.append(f"{rel(f)} · {st} · invalid JSON ({e.msg})"); secs = []
            items = []
            for s in secs:
                for c in s.get("components", []):
                    if known and c.get("name") not in known: WARN.append(f"{rel(f)} · {st} · unknown component {c.get('name')}")
                    items.append({"name": c.get("name"), "section_id": s.get("section_id"), "props": c.get("props", {})})
            steps.append({"id": slug(st), "title": st.strip(), "user": inline(user), "why": inline(why), "code": code, "items": items})
        flows.append({"id": slug(f.stem), "file": rel(f), "title": title, "intro": md(intro), "steps": steps})
    return flows


# ---------------------------------------------------------------- sites (websites and template prototypes)
def site(folder):
    """List a site's pages (index first, then in the order its menus link them) and check its links and frame.js."""
    if not (folder / "index.html").exists():
        WARN.append(f"{rel(folder)} · no index.html"); return None
    for f in sorted(folder.rglob("*.html")):
        page = f.read_text(encoding="utf-8")
        for ref in re.findall(r'(?:href|src)="([^"]+)"', page) + re.findall(r'url\("?([^")]+)"?\)', page):
            target = ref.split("#")[0].split("?")[0]
            if target and not re.match(r"^(https?:|mailto:|tel:|data:|//)", target) and not (f.parent / target).exists():
                WARN.append(f"{rel(f)} · missing file {target}")
        if not any((f.parent / src).resolve() == FRAME for src in re.findall(r'<script[^>]*\ssrc="([^"]*frame\.js)"', page)):
            WARN.append(f"{rel(f)} · no <script src=\"{Path('../' * (len(f.relative_to(ROOT).parts) - 1)).as_posix()}/frame.js\">")
    index = (folder / "index.html").read_text(encoding="utf-8")
    labels = {}
    navs = "".join(re.findall(r"<nav\b.*?</nav>", index, re.S))  # page names as the site's menus call them
    for href, text in re.findall(r'<a\b[^>]*\bhref="([^"#:]+\.html)"[^>]*>(.*?)</a>', navs, re.S):
        labels.setdefault(href, re.sub(r"\s+", " ", html.unescape(strip_tags(text))).strip())
    files = ["index.html"] + [h for h in labels if h != "index.html" and (folder / h).exists()]
    files += sorted(p.name for p in folder.glob("*.html") if p.name not in files)
    def title(name):
        t = re.search(r"<title>(.*?)</title>", (folder / name).read_text(encoding="utf-8"), re.S)
        return html.unescape(t.group(1).strip()) if t else name
    pages = [{"file": n, "label": labels.get(n) or ("Home" if n == "index.html" else title(n).split(" · ")[0]), "title": title(n)} for n in files]
    return {"base": rel(folder) + "/", "pages": pages}


# ---------------------------------------------------------------- items
def registered(files):
    """Component names the renderer files register (R["name"] = … or def("name", …))."""
    names = set()
    for f in files:
        t = f.read_text(encoding="utf-8")
        names.update(re.findall(r"""R\[\s*["']([a-z0-9-]+)["']\s*\]\s*=""", t))
        names.update(re.findall(r"""def\(\s*["']([a-z0-9-]+)["']""", t))
    return names


def build_website(item, folder):
    return {"id": item["id"], "type": "website", "title": item.get("title") or folder.name, "path": rel(folder), "prototype": site(folder)}


def build_template(item, folder, renderers, styles):
    files = [ROOT / p for p in item.get("renderers", [])]
    for f in files:
        if not f.exists(): WARN.append(f"build.json · {item['id']} · renderer not found: {rel(f)}"); continue
        renderers.setdefault(f, f.read_text(encoding="utf-8"))
    files = [f for f in files if f.exists()]
    if item.get("styles"):
        css_path, theme = ROOT / item["styles"], item.get("theme") or Path(item["styles"]).stem
        if not css_path.exists(): WARN.append(f"build.json · {item['id']} · styles not found: {item['styles']}")
        elif theme not in styles:
            css = css_path.read_text(encoding="utf-8")
            if item.get("tailwind"):  # base styles + the Tailwind utilities the renderers use
                spec = importlib.util.spec_from_file_location("twlite", ROOT / item["tailwind"])
                twlite = importlib.util.module_from_spec(spec); spec.loader.exec_module(twlite)
                themed = [f for f in files if re.search(rf"""theme:\s*["']{re.escape(theme)}["']""", f.read_text(encoding="utf-8"))]
                utils, unknown = twlite.css_for(themed)  # only the renderers that draw in this theme
                css += "\n/* generated utilities */\n" + utils
                WARN.extend(f"{item['tailwind']} · no CSS for class {u}" for u in unknown)
            styles[theme] = css
    readme = folder / "README.md"
    rtext = readme.read_text(encoding="utf-8") if readme.exists() else f"# {folder.name}"
    title = item.get("title") or (re.search(r"^# (.+)$", rtext, re.M) or [None, folder.name])[1]
    desc = next((l.strip() for l in rtext.split("\n")[1:] if l.strip() and not l.startswith(("#", "-", "`"))), "")
    comps = parse_components(folder / "components.md", folder.name)
    live = registered(files)
    for c in comps["components"]: c["layout"] = {"kind": "live" if c["id"] in live else "wire"}
    toc, content = [], folder / "content.md"
    return {
        "id": item["id"], "type": "template", "title": title, "label": title.split("·")[0].strip(),
        "brand": title.split("·")[1].strip() if "·" in title else "", "path": rel(folder),
        "description": desc, "readme": md(re.sub(r"^# .+$", "", rtext, count=1, flags=re.M)),
        "design": parse_design(folder / "design.md"),
        "components": comps,
        "layouts": parse_layouts(folder / "layouts", {c["id"] for c in comps["components"]}),
        "prototype": site(folder / "prototype") if (folder / "prototype").is_dir() else None,
        "content": {"html": md(content.read_text(encoding="utf-8"), toc), "toc": toc, "source": rel(content)} if content.exists() else None,
    }


def main():
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    projects, renderers, styles = [], {}, {}
    for p in config.get("projects", []):
        items = []
        for item in p.get("build", []):
            if not item.get("id") or item.get("type") not in ("website", "template") or not item.get("path"):
                WARN.append(f"build.json · {p['id']} · every item needs an id, a type (website or template) and a path: {item}"); continue
            if any(x["id"] == item["id"] for x in items):
                WARN.append(f"build.json · {p['id']} · duplicate id {item['id']}"); continue
            folder = ROOT / item["path"]
            if not folder.is_dir():
                WARN.append(f"build.json · {p['id']} · folder not found: {item['path']}"); continue
            items.append(build_website(item, folder) if item["type"] == "website" else build_template(item, folder, renderers, styles))
        projects.append({"id": p["id"], "title": p.get("title") or p["id"], "items": items})
    esc = lambda s: s.replace("</", "<\\/")
    out = SHELL.read_text(encoding="utf-8")
    out = out.replace("/*__TITLE__*/", html.escape(config.get("title", "Design")))
    out = out.replace("/*__DATA__*/null", esc(json.dumps({"title": config.get("title", "Design"), "projects": projects}, ensure_ascii=False)))
    out = out.replace("/*__STYLES__*/{}", esc(json.dumps(styles, ensure_ascii=False)))
    out = out.replace("/*__RENDERERS__*/", "\n".join(renderers.values()).replace("</script", "<\\/script"))
    OUT.write_text(out, encoding="utf-8")
    for p in projects:
        print(f"  {p['title']}")
        for i in p["items"]:
            pr = i["prototype"]
            if i["type"] == "website":
                print(f"    {i['id']:18} website   · {len(pr['pages']) if pr else 0} pages")
            else:
                print(f"    {i['id']:18} template  · components {len(i['components']['components']):>2} · layouts {len(i['layouts'])} · design {'yes' if i['design'] else 'no '}"
                      f" · content {'yes' if i['content'] else 'no '} · prototype {str(len(pr['pages'])) + ' pages' if pr else 'none'}")
    print(f"Built index.html: {len(projects)} project{'s' if len(projects) != 1 else ''}, {sum(len(p['items']) for p in projects)} items")
    for w in WARN: print("  warning:", w)
    return 0


if __name__ == "__main__":
    sys.exit(main())
