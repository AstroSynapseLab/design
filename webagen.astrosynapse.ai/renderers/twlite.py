#!/usr/bin/env python3
"""twlite: generate Tailwind v3-compatible CSS for the utility classes found in a set of files.

The build can't install Tailwind (no package registry), so this covers the utility families the
Astro renderers use, with Tailwind's values and variants (sm/md/lg/xl, hover, focus-visible,
group-hover, first, last, motion-safe). Colours resolve to the site's tokens: hsl(var(--name) / a).
Unknown classes are reported so a missing family is noticed instead of silently unstyled.

  python3 webagen.astrosynapse.ai/renderers/twlite.py webagen.astrosynapse.ai/renderers/website.js      # prints CSS
"""
import re, sys
from pathlib import Path

SCREENS = [("sm", 640), ("md", 768), ("lg", 1024), ("xl", 1280)]
COLORS = {"background", "foreground", "card", "card-foreground", "muted", "muted-foreground", "border", "input", "ring",
          "primary", "primary-foreground", "secondary", "accent", "brand-cyan", "brand-cyan-deep", "brand-violet",
          "brand-magenta", "brand-gold", "status-live", "status-wait", "status-dev"}
SIZES = {"xs": (".75rem", "1rem"), "sm": (".875rem", "1.25rem"), "base": ("1rem", "1.5rem"), "lg": ("1.125rem", "1.75rem"),
         "xl": ("1.25rem", "1.75rem"), "2xl": ("1.5rem", "2rem"), "3xl": ("1.875rem", "2.25rem"), "4xl": ("2.25rem", "2.5rem"),
         "5xl": ("3rem", "1"), "6xl": ("3.75rem", "1"), "7xl": ("4.5rem", "1"), "8xl": ("6rem", "1"), "9xl": ("8rem", "1")}
MAXW = {"xs": "20rem", "sm": "24rem", "md": "28rem", "lg": "32rem", "xl": "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem",
        "5xl": "64rem", "6xl": "72rem", "7xl": "80rem", "full": "100%", "none": "none", "prose": "65ch"}
RADIUS = {"": ".25rem", "none": "0", "sm": "calc(var(--radius) - 4px)", "md": "calc(var(--radius) - 2px)", "lg": "var(--radius)",
          "xl": "calc(var(--radius) + 4px)", "2xl": "1rem", "3xl": "1.5rem", "full": "9999px"}
TRACK = {"tighter": "-0.05em", "tight": "-0.025em", "normal": "0em", "wide": "0.025em", "wider": "0.05em", "widest": "0.1em"}
LEAD = {"none": "1", "tight": "1.25", "snug": "1.375", "normal": "1.5", "relaxed": "1.625", "loose": "2"}
WEIGHT = {"normal": 400, "medium": 500, "semibold": 600, "bold": 700, "extrabold": 800}
TRANSFORM = "translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"
FILTER = "var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)"


def space(v):
    """Tailwind spacing scale: 4 -> 1rem, 1.5 -> .375rem, px, 1/2, full, auto, [arbitrary]."""
    if v == "px": return "1px"
    if v == "0": return "0px"
    if v == "auto": return "auto"
    if v == "full": return "100%"
    if v == "screen": return "100vw"
    if v.startswith("[") and v.endswith("]"): return v[1:-1].replace("_", " ")
    if "/" in v:
        a, b = v.split("/"); return f"{float(a) / float(b) * 100:g}%"
    try: return f"{float(v) * .25:g}rem"
    except ValueError: return None


def color(v):
    if v in ("transparent", "current", "inherit"): return {"current": "currentColor"}.get(v, v)
    if v == "white": return "#fff"
    if v == "black": return "#000"
    name, _, alpha = v.partition("/")
    if name not in COLORS: return None
    if alpha:
        a = alpha[1:-1] if alpha.startswith("[") else f"{int(alpha) / 100:g}"
        return f"hsl(var(--{name}) / {a})"
    return f"hsl(var(--{name}))"


def utility(c):
    """Return declarations for a base utility class (no variants), or None."""
    neg = c.startswith("-"); b = c[1:] if neg else c
    sign = (lambda x: f"calc({x} * -1)" if x not in ("0px", "auto") else x) if neg else (lambda x: x)
    fixed = {
        "block": "display:block", "inline-block": "display:inline-block", "inline": "display:inline", "flex": "display:flex",
        "inline-flex": "display:inline-flex", "grid": "display:grid", "hidden": "display:none", "flow-root": "display:flow-root",
        "contents": "display:contents", "absolute": "position:absolute", "relative": "position:relative", "fixed": "position:fixed",
        "sticky": "position:sticky", "flex-row": "flex-direction:row", "flex-col": "flex-direction:column", "flex-wrap": "flex-wrap:wrap",
        "flex-1": "flex:1 1 0%", "flex-auto": "flex:1 1 auto", "flex-none": "flex:none", "shrink-0": "flex-shrink:0", "grow": "flex-grow:1",
        "items-start": "align-items:flex-start", "items-center": "align-items:center", "items-end": "align-items:flex-end", "items-baseline": "align-items:baseline",
        "justify-start": "justify-content:flex-start", "justify-center": "justify-content:center", "justify-end": "justify-content:flex-end", "justify-between": "justify-content:space-between",
        "self-start": "align-self:flex-start", "self-center": "align-self:center", "self-end": "align-self:flex-end", "place-items-center": "place-items:center",
        "overflow-hidden": "overflow:hidden", "overflow-x-auto": "overflow-x:auto", "overflow-auto": "overflow:auto",
        "whitespace-nowrap": "white-space:nowrap", "break-words": "overflow-wrap:break-word", "truncate": "overflow:hidden;text-overflow:ellipsis;white-space:nowrap",
        "uppercase": "text-transform:uppercase", "not-italic": "font-style:normal", "italic": "font-style:italic", "underline": "text-decoration-line:underline",
        "text-left": "text-align:left", "text-center": "text-align:center", "text-right": "text-align:right",
        "border": "border-width:1px", "border-0": "border-width:0", "border-t": "border-top-width:1px", "border-b": "border-bottom-width:1px",
        "border-l": "border-left-width:1px", "border-r": "border-right-width:1px", "border-y": "border-top-width:1px;border-bottom-width:1px",
        "border-x": "border-left-width:1px;border-right-width:1px", "object-cover": "object-fit:cover", "object-contain": "object-fit:contain",
        "pointer-events-none": "pointer-events:none", "cursor-pointer": "cursor:pointer", "resize-y": "resize:vertical", "select-none": "user-select:none",
        "snap-x": "scroll-snap-type:x var(--tw-scroll-snap-strictness)", "snap-mandatory": "--tw-scroll-snap-strictness:mandatory", "snap-start": "scroll-snap-align:start",
        "w-max": "width:max-content", "h-auto": "height:auto", "aspect-auto": "aspect-ratio:auto", "aspect-square": "aspect-ratio:1 / 1", "aspect-video": "aspect-ratio:16 / 9",
        "list-none": "list-style-type:none", "list-disc": "list-style-type:disc", "list-decimal": "list-style-type:decimal",
        "shadow-none": "--tw-shadow:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)",
        "shadow-lg": "--tw-shadow:0 10px 15px -3px rgb(0 0 0 / .1),0 4px 6px -4px rgb(0 0 0 / .1);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)",
        "backdrop-blur-md": "--tw-backdrop-blur:blur(12px);backdrop-filter:var(--tw-backdrop-blur)",
        "transition": "transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:150ms",
        "transition-all": "transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:150ms",
        "transition-colors": "transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:150ms",
        "transition-opacity": "transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:150ms",
        "transition-transform": "transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:150ms",
        "ease-out": "transition-timing-function:cubic-bezier(0,0,.2,1)", "ease-in-out": "transition-timing-function:cubic-bezier(.4,0,.2,1)",
        "bg-gradient-to-b": "background-image:linear-gradient(to bottom,var(--tw-gradient-stops))", "bg-gradient-to-r": "background-image:linear-gradient(to right,var(--tw-gradient-stops))",
        "bg-gradient-to-l": "background-image:linear-gradient(to left,var(--tw-gradient-stops))", "bg-gradient-to-br": "background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))",
        "sr-only": "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0",
    }
    if b in fixed and not neg: return fixed[b]
    m = re.fullmatch(r"(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(.+)", b)
    if m:
        v = space(m.group(2))
        if v is None: return None
        v = sign(v); k = m.group(1); prop = "padding" if k[0] == "p" else "margin"
        sides = {"": [""], "x": ["-left", "-right"], "y": ["-top", "-bottom"], "t": ["-top"], "b": ["-bottom"], "l": ["-left"], "r": ["-right"]}[k[1:]]
        return ";".join(f"{prop}{s}:{v}" for s in sides)
    m = re.fullmatch(r"(w|h|min-w|min-h|max-h|size)-(.+)", b)
    if m and not neg:
        k, v = m.groups()
        val = {"min": "min-content", "max": "max-content", "fit": "fit-content", "screen": "100vw" if k == "w" else "100vh"}.get(v) or space(v)
        if val is None: return None
        prop = {"w": "width", "h": "height", "min-w": "min-width", "min-h": "min-height", "max-h": "max-height"}.get(k)
        return f"width:{val};height:{val}" if k == "size" else f"{prop}:{val}"
    m = re.fullmatch(r"max-w-(.+)", b)
    if m: return f"max-width:{MAXW.get(m.group(1)) or space(m.group(1))}"
    m = re.fullmatch(r"(gap-x|gap-y|gap)-(.+)", b)
    if m:
        v = space(m.group(2)); prop = {"gap": "gap", "gap-x": "column-gap", "gap-y": "row-gap"}[m.group(1)]
        return f"{prop}:{v}" if v else None
    m = re.fullmatch(r"(inset-x|inset-y|inset|top|bottom|left|right)-(.+)", b)
    if m:
        v = space(m.group(2))
        if v is None: return None
        v = sign(v); k = m.group(1)
        return {"inset": f"inset:{v}", "inset-x": f"left:{v};right:{v}", "inset-y": f"top:{v};bottom:{v}"}.get(k, f"{k}:{v}")
    m = re.fullmatch(r"space-(x|y)-(.+)", b)
    if m:
        v = space(m.group(2))
        return f"@child margin-{'top' if m.group(1) == 'y' else 'left'}:{v}" if v else None
    m = re.fullmatch(r"z-(\d+)", b)
    if m: return f"z-index:{m.group(1)}"
    m = re.fullmatch(r"opacity-(\d+)", b)
    if m: return f"opacity:{int(m.group(1)) / 100:g}"
    m = re.fullmatch(r"grid-cols-(\d+)", b)
    if m: return f"grid-template-columns:repeat({m.group(1)},minmax(0,1fr))"
    m = re.fullmatch(r"col-span-(\d+|full)", b)
    if m: return "grid-column:1 / -1" if m.group(1) == "full" else f"grid-column:span {m.group(1)} / span {m.group(1)}"
    m = re.fullmatch(r"order-(\d+|first|last)", b)
    if m: return f"order:{ {'first': -9999, 'last': 9999}.get(m.group(1), m.group(1)) }"
    m = re.fullmatch(r"text-(.+)", b)
    if m:
        v = m.group(1)
        if v in SIZES: s, lh = SIZES[v]; return f"font-size:{s};line-height:{lh}"
        col = color(v)
        if col: return f"color:{col}"
        return None
    m = re.fullmatch(r"font-(.+)", b)
    if m and m.group(1) in WEIGHT: return f"font-weight:{WEIGHT[m.group(1)]}"
    m = re.fullmatch(r"tracking-(.+)", b)
    if m and m.group(1) in TRACK: return f"letter-spacing:{TRACK[m.group(1)]}"
    m = re.fullmatch(r"leading-(.+)", b)
    if m:
        v = m.group(1)
        return f"line-height:{LEAD.get(v) or space(v)}"
    m = re.fullmatch(r"rounded(?:-(.+))?", b)
    if m and (m.group(1) or "") in RADIUS: return f"border-radius:{RADIUS[m.group(1) or '']}"
    m = re.fullmatch(r"border-(.+)", b)
    if m:
        v = m.group(1)
        if v.isdigit(): return f"border-width:{v}px"
        col = color(v)
        if col: return f"border-color:{col}"
        return None
    m = re.fullmatch(r"bg-(.+)", b)
    if m:
        col = color(m.group(1))
        return f"background-color:{col}" if col else None
    m = re.fullmatch(r"(from|via|to)-(.+)", b)
    if m:
        col = color(m.group(2))
        if not col: return None
        zero = re.sub(r"\)$", " / 0)", col) if col.startswith("hsl") and "/" not in col else ("rgb(0 0 0 / 0)" if col == "transparent" else re.sub(r"/ [\d.]+\)$", "/ 0)", col))
        if m.group(1) == "from": return f"--tw-gradient-from:{col} var(--tw-gradient-from-position);--tw-gradient-to:{zero} var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)"
        if m.group(1) == "via": return f"--tw-gradient-to:{zero} var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),{col} var(--tw-gradient-via-position),var(--tw-gradient-to)"
        return f"--tw-gradient-to:{col} var(--tw-gradient-to-position)"
    m = re.fullmatch(r"(translate-x|translate-y)-(.+)", b)
    if m:
        v = space(m.group(2))
        return f"--tw-{m.group(1)}:{sign(v)};transform:{TRANSFORM}" if v else None
    m = re.fullmatch(r"scale-(\d+)", b)
    if m and not neg: v = int(m.group(1)) / 100; return f"--tw-scale-x:{v:g};--tw-scale-y:{v:g};transform:{TRANSFORM}"
    m = re.fullmatch(r"rotate-(\d+)", b)
    if m: return f"--tw-rotate:{'-' if neg else ''}{m.group(1)}deg;transform:{TRANSFORM}"
    m = re.fullmatch(r"duration-(\d+)", b)
    if m: return f"transition-duration:{m.group(1)}ms"
    m = re.fullmatch(r"grayscale(?:-(.+))?", b)
    if m:
        v = m.group(1); amt = "100%" if v is None else ("0" if v == "0" else v[1:-1] if v.startswith("[") else v)
        return f"--tw-grayscale:grayscale({amt});filter:{FILTER}"
    m = re.fullmatch(r"aspect-\[(\d+)/(\d+)\]", b)
    if m: return f"aspect-ratio:{m.group(1)} / {m.group(2)}"
    m = re.fullmatch(r"scroll-px-(.+)", b)
    if m:
        v = space(m.group(1)); return f"scroll-padding-left:{v};scroll-padding-right:{v}" if v else None
    m = re.fullmatch(r"ring-(\d+)", b)
    if m: return f"--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc({m.group(1)}px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)"
    m = re.fullmatch(r"ring-(.+)", b)
    if m:
        col = color(m.group(1)); return f"--tw-ring-color:{col}" if col else None
    if b == "outline-none" and not neg: return "outline:2px solid transparent;outline-offset:2px"
    return None


def esc(c):
    return re.sub(r"([:/.\[\]%(),=!#&>+~*'\"@])", r"\\\1", c)


SKIP = re.compile(r"^(group|group/[\w-]+|peer|container|font-(satoshi|inter|plex-mono)|website-.*|hover:website-.*|motion-safe:animate-bounce-y|no-scrollbar|tabler-icon.*|wa-.*)$")


def generate(classes):
    base, media, unknown = [], {}, []
    for c in sorted(classes):
        if SKIP.match(c): continue
        parts = c.split(":"); util = parts[-1]; variants = parts[:-1]
        decl = utility(util)
        if decl is None: unknown.append(c); continue
        sel = "." + esc(c); pre = ""; screen = None; hover = False; motion = False
        for v in variants:
            if v in dict(SCREENS): screen = v
            elif v == "hover": sel += ":hover"; hover = True
            elif v == "focus-visible": sel += ":focus-visible"
            elif v == "focus": sel += ":focus"
            elif v == "first": sel += ":first-child"
            elif v == "last": sel += ":last-child"
            elif v == "disabled": sel += ":disabled"
            elif v == "group-hover": pre = ".group:hover "; hover = True
            elif re.fullmatch(r"group-hover/[\w-]+", v): pre = f".group\\/{v.split('/')[1]}:hover "; hover = True
            elif v == "motion-safe": motion = True
            elif v == "dark": pre = ".dark " + pre
            else: decl = None
        if decl is None: unknown.append(c); continue
        if decl.startswith("@child "): sel += " > :not([hidden]) ~ :not([hidden])"; decl = decl[7:]
        rule = f"{pre}{sel}{{{decl}}}"
        wrap = []
        if hover: wrap.append("(hover: hover) and (pointer: fine)")
        if motion: wrap.append("(prefers-reduced-motion: no-preference)")
        key = (dict(SCREENS).get(screen, 0), " and ".join(wrap))
        if key == (0, ""): base.append(rule)
        else: media.setdefault(key, []).append(rule)
    out = "\n".join(base)
    for (w, extra), rules in sorted(media.items(), key=lambda kv: (kv[0][0], kv[0][1])):
        q = " and ".join(([f"(min-width: {w}px)"] if w else []) + ([extra] if extra else []))
        out += f"\n@media {q}{{" + "".join(rules) + "}"
    return out, unknown


TOKEN = re.compile(r"[\w:/.\[\]%-]+")


def classes_in(texts):
    """Strict: class="…" attributes and tw`…` strings (unknown ones are reported).
    Loose: tokens in any other quoted string, kept only if they resolve to a utility
    (catches classes passed as arguments, e.g. icon("h-4 w-4 group-hover:translate-x-1"))."""
    strict, loose = set(), set()
    for t in texts:
        for m in re.finditer(r'class="([^"$]*?)"', t):
            strict.update(x for x in m.group(1).split() if x and "${" not in x)
        for m in re.finditer(r'tw`([^`]*)`', t):
            strict.update(x for x in m.group(1).split() if TOKEN.fullmatch(x))
        for m in re.finditer(r'(?="([^"\n]{2,400})")', t):  # overlapping: quotes nest inside template strings
            loose.update(x for x in m.group(1).split() if TOKEN.fullmatch(x))
    known_loose = {c for c in loose - strict if ":" in c or "-" in c}
    _, bad = generate(known_loose)
    return strict | (known_loose - set(bad))


def css_for(paths):
    css, unknown = generate(classes_in(Path(p).read_text(encoding="utf-8") for p in paths))
    return css, unknown


if __name__ == "__main__":
    css, unknown = css_for(sys.argv[1:])
    print(css)
    if unknown: print("unknown classes: " + " ".join(unknown), file=sys.stderr)
