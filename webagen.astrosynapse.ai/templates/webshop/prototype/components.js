// Preview renderers for the Stride webshop (components/webshop.md).
// Markup is ported from astro-webshop js/pages.js + js/core.js and styled by the real Stride CSS
// (docs/vendor/webshop.css), so each preview matches the live prototype. Data comes only from the JSON props.
// Clicks: data-prompt = sends a query · data-anchor = scrolls · data-action = static frontend action.
(function () {
  const R = (window.WEBAGEN_RENDERERS = window.WEBAGEN_RENDERERS || {});
  const FONTS = ["https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600;700&display=swap"];

  /* ---------- helpers (same output as core.js) ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const img = (id, w = 800, h = 1000) => (/^https?:\/\//.test(id) ? id : `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=75`);
  const money = (n) => "€" + Number(n || 0).toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const num1 = (n) => Number(n).toFixed(1).replace(".", ",");
  const P = (s) => (s ? ` data-prompt="${esc(s)}"` : "");
  const A = (s) => ` data-action="${esc(s)}"`;
  const stars = (avg) => { let h = '<span class="s">'; for (let i = 1; i <= 5; i++) h += avg >= i ? "<i></i>" : avg >= i - 0.5 ? '<i class="half"></i>' : '<i class="off"></i>'; return h + "</span>"; };
  const rating = (r, link) => r ? `<span class="stars">${stars(r.avg)}<b>${num1(r.avg)}</b>${link ? `<a class="n" href="#"${A("Scroll to reviews")}>${r.count} reviews</a>` : `<span class="n">(${r.count})</span>`}</span>` : "";
  const badges = (p) => {
    const b = [], bs = p.badges || [];
    const cmp = p["compare-at"];
    if (cmp && cmp > p.price) b.push(`<span class="badge badge-sale">−${Math.round(100 - (100 * p.price) / cmp)}%</span>`);
    else if (bs.includes("sale")) b.push('<span class="badge badge-sale">Sale</span>');
    if (bs.includes("new")) b.push('<span class="badge badge-new">New</span>');
    if (bs.includes("bestseller")) b.push('<span class="badge badge-soft">Best seller</span>');
    if (bs.includes("sold-out")) b.push('<span class="badge badge-out">Sold out</span>');
    else if (bs.includes("low-stock")) b.push('<span class="badge badge-low">Low stock</span>');
    return b.join("");
  };
  const price = (p, cls = "") => { const sale = p["compare-at"] && p["compare-at"] > p.price; return `<div class="price ${cls}"><span class="now ${sale ? "is-sale" : ""}">${money(p.price)}</span>${sale ? `<span class="was">${money(p["compare-at"])}</span>` : ""}</div>`; };
  const card = (p, ratio = 1.25) => {
    const sw = p.swatches || [];
    const swh = sw.length ? `<div class="swatches">${sw.slice(0, 4).map((c) => `<span class="swatch" style="--c:${esc(c)}"></span>`).join("")}${sw.length > 4 ? `<span class="swatch-more">+${sw.length - 4}</span>` : ""}</div>` : "";
    const sub = sw.length ? `${sw.length} colour${sw.length > 1 ? "s" : ""}` : p.subtitle || "";
    const h = Math.round(600 * ratio);
    return `<article class="card">
      <div class="card-media"><img class="main" src="${img(p.image, 600, h)}" alt="${esc(p.title)}" loading="lazy" width="600" height="${h}">${p["hover-image"] ? `<img class="alt" src="${img(p["hover-image"], 600, h)}" alt="" loading="lazy">` : ""}
        <div class="card-badges">${badges(p)}</div>
        <button class="icon-btn card-wish"${A("Save to wishlist")} aria-label="Save ${esc(p.title)} to wishlist">♡</button>
        <button class="btn btn-secondary btn-sm btn-block card-quick"${P("Quick view " + p.title)}>Quick view</button></div>
      <div class="card-body"><div class="card-title"><a href="#"${P(p["data-prompt"])}>${esc(p.title)}</a></div><div class="card-sub">${esc(sub)}</div>
        ${price(p)}${swh}${rating(p.rating)}</div></article>`;
  };
  const grid = (ps, cls = "") => `<div class="grid ${cls}">${(ps || []).map((p) => card(p)).join("")}</div>`;
  const head = (title, more, prompt) => `<div class="section-head"><h2 class="h2">${esc(title)}</h2>${more ? `<a class="btn btn-outline btn-sm" href="#"${P(prompt)}>${esc(more)}</a>` : ""}</div>`;
  const ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    bag: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 7h12l1 13H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>',
    heart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.6-9.3-9A5.2 5.2 0 0 1 12 6.6 5.2 5.2 0 0 1 21.3 12C19 16.4 12 21 12 21z"/></svg>',
    moon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
    "arrow-back-up": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v5h5"/></svg>',
    "shield-check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="m9 12 2 2 4-4"/></svg>',
    "map-pin": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 16.8 6.1 20l1.2-6.5L2.5 8.9 9.1 8z"/></svg>',
  };
  const icon = (n) => ICON[n] || ICON.star;
  // Static strip the frontend builds from STORE INFO (same copy as pages.js assure())
  const assure = () => `<div class="assure">
    <div>${ICON.truck}<div><b>Delivery 2–4 working days</b><br><span>Free over €75,00 · €4,90 below · order by 14:00 for same-day dispatch</span></div></div>
    <div>${ICON["arrow-back-up"]}<div><b>30-day free returns</b><br><span>Prepaid label in the box · refund within 5 days</span></div></div>
    <div>${ICON["shield-check"]}<div><b>Price includes 25% VAT</b><br><span>No surprises at checkout · 2-year warranty</span></div></div></div>`;
  const options = (colors, sizes) => `${colors && colors.length ? `<div class="opt"><div class="label">Colour · <b>${esc(colors[0].label)}</b></div><div class="swatches">${colors.map((c, i) => `<button class="swatch ${i === 0 ? "is-active" : ""}" style="--c:${esc(c.hex)};width:32px;height:32px"${A("Choose colour " + c.label)} aria-label="${esc(c.label)}" title="${esc(c.label)}"></button>`).join("")}</div></div>` : ""}
    ${sizes && sizes.length ? (() => { const cur = sizes.find((s) => s.available !== false) || sizes[0]; return `<div class="opt"><div class="label" style="display:flex;justify-content:space-between"><span>Size · <b>EU ${esc(cur.label)}</b></span><button class="linkish"${A("Open size guide")}>Size guide</button></div><div class="variants">${sizes.map((s) => `<button class="variant ${s === cur ? "is-active" : ""} ${s.available === false ? "is-out" : ""}"${A("Choose size " + s.label)}>${esc(s.label)}</button>`).join("")}</div></div>`; })() : ""}`;
  const buyBox = (p, extra = "") => `${price(p, "price-lg")}${extra}${options(p.colors, p.sizes)}
    <div><span class="stock">In stock · order by 14:00 for same-day dispatch</span></div>
    <div class="buy-actions"><div class="qty"><button${A("Decrease quantity")}>−</button><output>1</output><button${A("Increase quantity")}>+</button></div><button class="btn btn-primary btn-lg" style="flex:1"${A("Add to bag")}>Add to bag · ${money(p.price)}</button></div>
    <div class="express"><button class="btn btn-express"${A("Apple Pay")}> Pay</button><button class="btn btn-express"${A("Google Pay")}>G Pay</button><button class="btn btn-express"${A("PayPal")}>PayPal</button></div>${assure()}`;
  const gallery = (images, title, bs) => { const im = images || []; return `<div class="g-main card-media" style="--card-ratio:4/5"><img src="${img(im[0], 1000, 1250)}" alt="${esc(title)}"><div class="card-badges">${bs || ""}</div>${im.length > 1 ? `<button class="g-nav prev" data-local data-g="-1" aria-label="Previous image">‹</button><button class="g-nav next" data-local data-g="1" aria-label="Next image">›</button>` : ""}</div>${im.length > 1 ? `<div class="g-thumbs">${im.map((id, n) => `<button class="${n === 0 ? "is-active" : ""}" data-local data-gi="${n}" aria-label="Image ${n + 1}"><img src="${img(id, 160, 200)}" alt=""></button>`).join("")}</div>` : ""}`; };
  const galleryScript = `document.querySelectorAll('.gallery').forEach(g=>{const ths=[...g.querySelectorAll('[data-gi]')];if(!ths.length)return;const m=g.querySelector('.g-main img');let i=0;const go=k=>{i=(k+ths.length)%ths.length;m.src=ths[i].querySelector('img').src.replace('w=160&h=200','w=1000&h=1250');ths.forEach((t,j)=>t.classList.toggle('is-active',j===i))};g.addEventListener('click',e=>{const t=e.target.closest('[data-gi]');if(t)go(+t.dataset.gi);const n=e.target.closest('[data-g]');if(n)go(i+ +n.dataset.g)})})`;
  const specTables = (specs) => (specs || []).map((g) => `<div class="spec-group"><div class="eyebrow">${esc(g.group)}</div><table class="spec">${(g.rows || []).map((r) => `<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join("")}</table></div>`).join("");
  const date = (d) => { try { return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); } catch (e) { return d; } };
  const review = (r) => `<article class="review"><header><span class="stars">${stars(r.rating)}</span><b>${esc(r.name)}</b>${r.verified ? '<span class="verified">✓ Verified purchase</span>' : ""}<time datetime="${esc(r.date)}">${date(r.date)}</time>${r["variant-note"] ? `<span class="small muted">${esc(r["variant-note"])}</span>` : ""}</header>${r.title ? `<b>${esc(r.title)}</b>` : ""}<p>${esc(r.text)}</p>${(r.photos || []).length ? `<div class="photos">${r.photos.map((ph) => `<img src="${img(ph, 160, 160)}" alt="Customer photo" loading="lazy">`).join("")}</div>` : ""}${r.reply ? `<div class="reply"><b>${esc(r.reply.by)} replied</b>${esc(r.reply.text)}</div>` : ""}</article>`;
  const reviewsBlock = (rt, dist, list) => { const tot = (dist || []).reduce((a, b) => a + b, 0) || 1; return `<section class="section" id="reviews"><div class="section-head"><h2 class="h2">Reviews</h2><button class="btn btn-outline btn-sm"${A("Write a review")}>Write a review</button></div>
    <div class="rev-layout"><div class="rating-sum"><div><div class="big">${num1(rt.avg)}</div><span class="stars">${stars(rt.avg)}</span><div class="small muted">${rt.count} verified reviews</div></div>${dist ? `<div class="bars">${[5, 4, 3, 2, 1].map((s) => `<div>${s}<i style="--w:${Math.round((100 * dist[s - 1]) / tot)}%"></i><span class="num">${dist[s - 1]}</span></div>`).join("")}</div>` : ""}</div>
    <div>${(list || []).map(review).join("") || '<p class="muted">No written reviews yet for this item; the rating comes from verified purchases.</p>'}${(list || []).length && rt.count > list.length ? `<p class="small muted" style="margin-top:12px">Showing ${list.length} of ${rt.count} reviews.</p>` : ""}</div></div></section>`; };
  const tiles = (ts, cls = "") => `<div class="tiles ${cls}">${(ts || []).map((t) => `<a class="tile" href="#"${P(t["data-prompt"])}><img src="${img(t.image, 700, 700)}" alt="" loading="lazy"><span>${esc(t.label)}</span></a>`).join("")}</div>`;
  const lineItem = (l, withQty) => `<div class="line-item"><a href="#"${P(l["data-prompt"])}><img src="${img(l.image, 144, 180)}" alt=""></a><div><div class="t">${esc(l.title)}</div><div class="v">${esc((l.options || []).join(" · "))}${withQty ? "" : ` · Qty ${l.qty}`}</div>
    ${withQty ? `<div class="qty" style="margin-top:8px"><button${A("Decrease quantity")}>−</button><output>${l.qty}</output><button${A("Increase quantity")} ${l.qty >= l.max ? "disabled" : ""}>+</button></div>${l.qty >= l.max ? `<div class="hint" style="margin-top:4px">Only ${l.max} available</div>` : ""}` : ""}</div>
    <div style="text-align:right"><div class="price"><span class="now">${money(l.price)}</span></div>${withQty ? `<button class="btn btn-ghost btn-sm"${A("Remove line")}>Remove</button>` : ""}</div></div>`;
  const totals = (p, label = "Total") => `<div class="totals"><div><span>Subtotal</span><span class="num">${money(p.subtotal)}</span></div><div><span>Shipping</span><span class="num">${p.shipping ? money(p.shipping) : "Free"}</span></div>${p.vat != null ? `<div><span>Incl. VAT 25%</span><span class="num">${money(p.vat)}</span></div>` : ""}<div class="grand"><span>${label}</span><span class="num">${money(p.total)}</span></div></div>`;
  const def = (name, render, extra = {}) => { R[name] = Object.assign({ theme: "webshop", fonts: FONTS, render }, extra); };

  /* ---------- frame ---------- */
  def("webshop-announcement-section", (p) => `<div class="annc">${esc(p.text)}</div>`);

  def("webshop-header-section", (p) => `<header class="header is-static"><div class="container bar">
      <div class="bar-left"><button class="icon-btn menu-btn"${A("Open menu")} aria-label="Menu">${ICON.menu}</button><a class="logo" href="#"${P("Show the homepage")}>${esc(p.logo)}</a></div>
      <nav class="nav" aria-label="Main">${(p.nav || []).map((n) => `<div class="nav-item"><a href="#"${P(n["data-prompt"])}>${esc(n.label)}</a>${n.children ? `<div class="mega"><div class="mega-cols"><div><div class="eyebrow">${esc(n.label)}</div><ul>${n.children.map((c) => `<li><a href="#"${P(c["data-prompt"])}>${esc(c.label)}</a></li>`).join("")}<li><a href="#"${P(n["data-prompt"])}><b>All ${esc(n.label.toLowerCase())}</b></a></li></ul></div>${n.promo ? `<div class="mega-promo"><a href="#"${P(n.promo["data-prompt"])}><img src="${img(n.promo.image, 520, 340)}" alt=""><span>${esc(n.promo.label)}</span></a></div>` : ""}</div></div>` : ""}</div>`).join("")}</nav>
      <div class="utils"><div class="search-wrap"><div class="search">${ICON.search}<input class="input" type="search" placeholder="Search" aria-label="Search products" data-local></div></div>
        <button class="icon-btn search-btn"${A("Open search")} aria-label="Search">${ICON.search.replace("<svg", '<svg width="20" height="20"')}</button>
        <button class="icon-btn"${A("Toggle dark mode")} aria-label="Toggle dark mode">${ICON.moon}</button>
        <a class="icon-btn wish-btn" href="#"${A("Open wishlist")} aria-label="Wishlist">${ICON.heart}</a>
        <button class="icon-btn"${A("Open bag")} aria-label="Bag">${ICON.bag}</button></div></div></header>`,
    { css: ".header.is-static{position:relative}#wa-root>.header:only-child .nav:not(:hover) .nav-item:first-child .mega{opacity:1;pointer-events:auto;transform:translate(-50%,0)}#wa-root:has(>.header:only-child){min-height:380px}" });

  def("webshop-search-suggest-section", (p) => {
    const cats = p.categories || [], ps = p.products || [];
    const body = !cats.length && !ps.length
      ? `<div class="sug-empty">No matches for “${esc(p.query)}”. Press Enter to search anyway.</div>`
      : `${cats.length ? `<div class="sug-cats">${cats.map((c) => `<a class="pill" href="#"${P(c["data-prompt"])}>${esc(c.label)}</a>`).join("")}</div>` : ""}${ps.map((x) => `<a class="sug-item" href="#"${P(x["data-prompt"])}><img src="${img(x.image, 80, 100)}" alt=""><div><b>${esc(x.title)}</b><div class="small muted">${esc(x.subtitle || "")}</div></div><span class="price"><span class="now">${money(x.price)}</span></span></a>`).join("")}<a class="sug-all" href="#"${P(p["data-prompt"])}>All results for “${esc(p.query)}” →</a>`;
    return `<div class="container"><div class="search-wrap" style="position:relative;max-width:420px"><div class="search">${ICON.search}<input class="input" value="${esc(p.query)}" aria-label="Search" readonly></div><div class="suggest is-static">${body}</div></div></div>`;
  });

  def("webshop-mobile-menu-section", (p) => `<div class="drawer from-left is-static"><aside class="panel"><header><b>Menu</b><button class="icon-btn"${A("Close menu")} aria-label="Close">✕</button></header>
    <div class="body"><ul class="menu-list">${(p.nav || []).map((n) => `<li><a href="#"${P(n["data-prompt"])}>${esc(n.label)}</a>${n.children ? `<ul>${n.children.map((c) => `<li><a href="#"${P(c["data-prompt"])}>${esc(c.label)}</a></li>`).join("")}</ul>` : ""}</li>`).join("")}<li><a href="#"${A("Open wishlist")}>Wishlist</a></li></ul></div></aside></div>`,
    { css: "#wa-root>.drawer.from-left:not(:only-child){display:none}" });

  def("webshop-footer-section", (p) => `<footer class="footer"><div class="container"><div class="cols">
      <div><div class="logo">${esc(p.logo)}</div><p class="small" style="max-width:36ch;margin:10px 0 14px">${esc(p.tagline)}</p>
        <form class="field" style="max-width:340px" onsubmit="return false"><label>${esc(p.newsletter?.label)}</label><div class="nl-row"><input class="input" type="email" placeholder="Email" data-local><button class="btn btn-secondary"${A("Join newsletter")}>Join</button></div><span class="hint">${esc(p.newsletter?.hint)}</span></form></div>
      ${(p.columns || []).map((c) => `<div><h4>${esc(c.title)}</h4><ul>${(c.links || []).map((l) => `<li><a href="#"${P(l["data-prompt"])}>${esc(l.label)}</a></li>`).join("")}</ul></div>`).join("")}</div>
    <div class="paylogos" style="margin-top:var(--s-6)">${(p.payments || []).map((x) => `<span>${esc(x)}</span>`).join("")}</div>
    <div class="legal"><span>${esc(p.legal)}</span><span>Privacy · Terms · Cookies · Imprint</span></div></div></footer>`);

  /* ---------- heroes ---------- */
  def("webshop-hero-section", (p) => `<section class="section" style="padding-top:var(--s-4)"><div class="container"><div class="hero"><img src="${img(p.image, 1600, 900)}" alt=""><div class="copy"><div class="eyebrow" style="color:#fff;opacity:.85">${esc(p.eyebrow)}</div><h1 class="display">${esc(p.title)}</h1><p class="lead" style="color:#fff;opacity:.9;margin:0">${esc(p.text)}</p><div><a class="btn btn-primary btn-lg" href="#"${P(p.cta?.["data-prompt"])}>${esc(p.cta?.label)}</a></div></div></div></div></section>
    <section class="section" style="padding-top:0"><div class="container">${tiles(p.tiles)}</div></section>`);

  def("webshop-hero-campaign-section", (p) => `<section class="campaign"><div class="campaign-media"><img src="${img(p.image, 1600, 980)}" alt="">${(p.hotspots || []).map((h, i) => `<div class="hotspot ${i === 0 ? "is-open" : ""}" style="left:${+h.x}%;top:${+h.y}%"><button class="hs-dot" data-local aria-label="Shop ${esc(h.title)}"></button><a class="hs-card" href="#"${P(h["data-prompt"])}><img src="${img(h.image, 120, 150)}" alt=""><span><b>${esc(h.title)}</b><span class="price"><span class="now">${money(h.price)}</span></span></span></a></div>`).join("")}</div>
    <div class="container campaign-copy"><div class="eyebrow">${esc(p.eyebrow)}</div><h1 class="display">${esc(p.title)}</h1><p class="lead">${esc(p.text)}</p><div class="sg-row"><a class="btn btn-secondary btn-lg" href="#"${P(p.cta?.["data-prompt"])}>${esc(p.cta?.label)}</a><span class="small muted">Tap a dot on the image to shop the look</span></div></div></section>`,
    { script: "document.addEventListener('click',e=>{const d=e.target.closest('.hs-dot');if(!d)return;const h=d.parentElement,o=!h.classList.contains('is-open');document.querySelectorAll('.hotspot').forEach(x=>x.classList.remove('is-open'));h.classList.toggle('is-open',o)})" });

  def("webshop-hero-slider-section", (p) => { const s = p.slides || []; return `<section class="section" style="padding-top:var(--s-4)"><div class="container hybrid">
    <div class="slider"><div class="slides">${s.map((x, i) => `<div class="slide ${i === 0 ? "is-active" : ""}"><img src="${img(x.image, 1200, 800)}" alt=""><div class="copy"><div class="eyebrow" style="color:#fff;opacity:.85">${esc(x.eyebrow)}</div><h2 class="h1">${esc(x.title)}</h2><p>${esc(x.text)}</p><a class="btn btn-primary" href="#"${P(x.cta?.["data-prompt"])}>${esc(x.cta?.label)}</a></div></div>`).join("")}</div>
      <div class="slider-nav"><button class="icon-btn" data-local data-slide="-1" aria-label="Previous slide">‹</button><div class="dots">${s.map((_, i) => `<button class="${i === 0 ? "is-active" : ""}" data-local data-dot="${i}" aria-label="Slide ${i + 1}"></button>`).join("")}</div><button class="icon-btn" data-local data-slide="1" aria-label="Next slide">›</button></div></div>
    <div class="hero-tiles">${(p.tiles || []).map((t) => `<a class="tile" href="#"${P(t["data-prompt"])}><img src="${img(t.image, 500, 500)}" alt="" loading="lazy"><span>${esc(t.label)}</span></a>`).join("")}</div></div></section>`; },
    { script: "document.querySelectorAll('.slider').forEach(sl=>{const sl2=[...sl.querySelectorAll('.slide')],ds=[...sl.querySelectorAll('[data-dot]')];let i=0;const go=k=>{i=(k+sl2.length)%sl2.length;sl2.forEach((s,j)=>s.classList.toggle('is-active',j===i));ds.forEach((d,j)=>d.classList.toggle('is-active',j===i))};sl.addEventListener('click',e=>{const b=e.target.closest('[data-slide]');if(b)go(i+ +b.dataset.slide);const d=e.target.closest('[data-dot]');if(d)go(+d.dataset.dot)})})" });

  def("webshop-hero-product-section", (p) => `<div class="single pdp"><section class="s-hero container">
    <div class="s-hero-copy"><div class="eyebrow">${esc(p.eyebrow)}</div><h1 class="display">${esc(p.title)}</h1><p class="lead">${esc(p.text)}</p><div class="sg-row">${rating(p.rating, true)}</div></div>
    <div class="gallery s-gallery">${gallery(p.images, p.product, badges(p))}</div>
    <div class="buy s-buy">${buyBox(p)}${(p["key-specs"] || []).length ? `<dl class="keyspecs">${p["key-specs"].map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}</div></section></div>`,
    { script: galleryScript });

  def("webshop-chapter-nav-section", (p) => `<nav class="chapter-nav is-static" aria-label="Sections"><div class="container"><div class="cn-row">${(p.links || []).map((l, i) => `<a href="#" class="${i === 0 ? "is-active" : ""}" data-anchor="${esc(l.anchor)}">${esc(l.label)}</a>`).join("")}<a class="btn btn-primary btn-sm cn-buy" href="#" data-anchor="${esc(p["buy-anchor"] || "")}">Buy · ${money(p.price)}</a></div></div></nav>`);

  /* ---------- tiles ---------- */
  def("webshop-category-tiles-section", (p) => `<section class="section"><div class="container">${p.title ? head(p.title) : ""}${tiles(p.tiles, p.variant === "8-up" ? "tiles-8" : "")}</div></section>`);

  def("webshop-split-tiles-section", (p) => `<section class="section" style="padding-top:var(--s-4)"><div class="container"><div class="split">${(p.tiles || []).map((s) => `<a class="split-tile" href="#"${P(s["data-prompt"])}><img src="${img(s.image, 900, 1100)}" alt="" loading="lazy"><span class="display">${esc(s.label)}</span><span class="btn btn-outline btn-sm" style="border-color:#fff;color:#fff">Shop ${esc(s.label.toLowerCase())}</span></a>`).join("")}</div></div></section>`);

  def("webshop-size-section", (p) => `<section class="section size-strip"><div class="container"><div class="section-head"><div><h2 class="h2">${esc(p.title)}</h2>${p.text ? `<p class="muted" style="margin:4px 0 0">${esc(p.text)}</p>` : ""}</div></div><div class="chips">${(p.sizes || []).map((s) => `<a class="pill" href="#"${P("Show what's in stock in EU " + s)}>EU ${esc(s)}</a>`).join("")}</div></div></section>`);

  /* ---------- products ---------- */
  def("webshop-product-grid-section", (p) => {
    const v = p.variant || "grid";
    const note = p.text ? `<p class="small muted" style="margin:-12px 0 16px">${esc(p.text)}</p>` : "";
    if (v === "rail") return `<section class="section"><div class="container">${head(p.title, p["action-label"], p["data-prompt"])}${note}</div><div class="rail-wrap"><div class="rail container">${(p.products || []).map((x) => `<div class="rail-item">${card(x)}</div>`).join("")}</div></div></section>`;
    return `<section class="section"><div class="container">${head(p.title, p["action-label"], p["data-prompt"])}${note}${grid(p.products, v === "grid-large" ? "grid-2" : "")}</div></section>`;
  });

  def("webshop-product-card-section", (p) => `<section class="section"><div class="container" style="max-width:360px;margin:0"><div class="grid" style="grid-template-columns:1fr">${card(p)}</div></div></section>`);

  def("webshop-quick-view-section", (p) => `<div class="modal is-static"><div class="modal-box" role="dialog" aria-label="Quick view"><button class="icon-btn modal-x"${A("Close quick view")} aria-label="Close">✕</button><div class="qv"><div class="card-media" style="--card-ratio:4/5"><img src="${img(p.image, 600, 750)}" alt=""></div>
    <div class="buy"><div class="eyebrow">${esc(p.eyebrow)}</div><h2 class="h2">${esc(p.title)}</h2>${rating(p.rating)}${price(p, "price-lg")}<p class="small" style="margin:0">${esc(p.summary)}</p>${options(p.colors, p.sizes)}
    <button class="btn btn-primary btn-lg btn-block"${A("Add to bag")}>Add to bag · ${money(p.price)}</button><a class="btn btn-ghost btn-block" href="#"${P(p["data-prompt"])}>Full details</a></div></div></div></div>`);

  def("webshop-recently-viewed-section", (p) => `<section class="section"><div class="container">${head(p.title || "Recently viewed")}${grid(p.products)}</div></section>`);

  /* ---------- listing ---------- */
  def("webshop-category-section", (p) => {
    const crumbs = p.breadcrumbs || [];
    const applied = p.applied || [];
    const isOn = (g, o) => applied.some((a) => a.group === g && a.label === o);
    const facets = (p.filters || []).map((f) => `<details class="facet" open><summary>${esc(f.label)}${applied.some((a) => a.group === f.label) ? ` <span class="badge badge-soft">${applied.filter((a) => a.group === f.label).length}</span>` : ""}</summary><div class="list">${(f.options || []).map((o) => `<label class="check"><input type="checkbox" data-local ${isOn(f.label, o.label) ? "checked" : ""}>${esc(o.label)}${o.count != null ? `<span class="cnt">${o.count}</span>` : ""}</label>`).join("")}</div></details>`).join("");
    return `<div class="container plp">
     <nav class="crumbs" aria-label="Breadcrumb">${crumbs.map((c, i) => (i < crumbs.length - 1 ? `<a href="#"${P(i === 0 ? "Show the homepage" : "Show category " + c)}>${esc(c)}</a> › ` : `<span>${esc(c)}</span>`)).join("")}</nav>
     <header class="plp-head"><div><h1 class="h1">${esc(p.title)}</h1><p class="lead">${esc(p.intro)}</p></div></header>
     <div class="chips subcats">${(p.subcategories || []).map((s) => `<a class="pill ${s.active ? "is-active" : ""}" href="#"${P(s["data-prompt"])}>${esc(s.label)}</a>`).join("")}</div>
     <div class="plp-bar"><div class="small muted"><b>${p.total}</b> product${p.total === 1 ? "" : "s"}</div><div class="plp-tools"><button class="btn btn-outline btn-sm filters-btn"${A("Open filters drawer")}>Filters${applied.length ? ` (${applied.length})` : ""}</button><label class="sort"><span class="sr-only">Sort</span><select class="select" data-local>${(p["sort-options"] || []).map((o) => `<option>${esc(o)}</option>`).join("")}</select></label></div></div>
     ${applied.length ? `<div class="applied">${applied.map((a) => `<button class="pill is-active"${A("Remove filter " + a.label)}>${esc(a.label)} <span class="x">×</span></button>`).join("")}<a class="btn btn-ghost btn-sm" href="#"${P("Show category " + p.title)}>Clear all</a></div>` : ""}
     <div class="plp-body"><aside class="facets-col"><div class="facets">${facets}</div></aside><div class="plp-grid">${grid(p.products)}</div></div></div>`;
  });

  def("webshop-empty-results-section", (p) => `<div class="container"><div class="empty"><p class="h3">${esc(p.title)}</p><p class="muted">${esc(p.text)}</p><div class="sg-row" style="justify-content:center">${(p.actions || []).map((a, i) => `<a class="btn ${i === 0 ? "btn-primary" : "btn-outline"}" href="#"${P(a["data-prompt"])}>${esc(a.label)}</a>`).join("")}</div></div>${(p.tiles || []).length ? tiles(p.tiles) : ""}</div>`,
    { css: ".empty .sg-row{margin-top:var(--s-4)}" });

  def("webshop-compare-section", (p) => {
    const ps = p.products || [];
    const avail = { "in-stock": ["", "In stock"], "low-stock": ["is-low", "Low stock"], "sold-out": ["is-out", "Sold out"] };
    return `<div class="compare-tray is-static"><div class="container ct-row"><div class="ct-items">${ps.map((x) => `<div class="ct-item"><img src="${img(x.image, 80, 80)}" alt=""><span>${esc(x.title)}</span><button class="icon-btn"${A("Remove from compare")} aria-label="Remove">✕</button></div>`).join("")}</div><div class="ct-actions"><button class="btn btn-ghost btn-sm"${A("Clear compare")}>Clear</button><button class="btn btn-primary"${A("Open compare")}>Compare ${ps.length}</button></div></div></div>
    <div class="modal is-static" style="margin-top:16px"><div class="modal-box modal-wide" role="dialog" aria-label="Compare products"><h2 class="h2" style="margin-bottom:12px">Compare</h2><div class="tablewrap"><table class="cmp"><thead><tr><th></th>${ps.map((x) => `<th><a href="#"${P(x["data-prompt"])}><img src="${img(x.image, 200, 200)}" alt=""><b>${esc(x.title)}</b></a><div class="small muted">${esc(x.subtitle || "")}</div></th>`).join("")}</tr></thead><tbody>
     <tr><th>Price</th>${ps.map((x) => `<td>${price(x).replace('<div class="price ', '<span class="price ').replace(/<\/div>$/, "</span>")}</td>`).join("")}</tr>
     <tr><th>Rating</th>${ps.map((x) => `<td>${rating(x.rating)}</td>`).join("")}</tr>
     ${(p.rows || []).map((r) => `<tr><th>${esc(r.label)}</th>${(r.values || []).map((v) => `<td>${v === "—" ? '<span class="muted">—</span>' : esc(v)}</td>`).join("")}</tr>`).join("")}
     <tr><th>Availability</th>${ps.map((x) => { const a = avail[x.availability] || avail["in-stock"]; return `<td><span class="stock ${a[0]}">${a[1]}</span></td>`; }).join("")}</tr>
     <tr><th></th>${ps.map((x) => `<td><a class="btn btn-primary btn-sm" href="#"${P(x["data-prompt"])}>View</a></td>`).join("")}</tr></tbody></table></div></div></div>`;
  });

  /* ---------- product page ---------- */
  def("webshop-product-section", (p) => {
    const crumbs = p.breadcrumbs || [];
    const guide = p["size-guide"];
    const acc = `<div class="acc">
      <details open><summary>Details</summary><div class="acc-body">${String(p.description || "").split("\n\n").map((t) => `<p>${esc(t)}</p>`).join("")}<ul>${(p.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div></details>
      ${(p.specs || []).length ? `<details><summary>Specifications</summary><div class="acc-body">${specTables(p.specs)}</div></details>` : ""}
      ${p.fit || guide ? `<details><summary>Fit &amp; sizing</summary><div class="acc-body">${p.fit?.note ? `<p><b>${esc(p.fit.note)}</b></p>` : ""}${guide ? `<div class="tablewrap"><table class="spec guide"><thead><tr>${guide.columns.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>${guide.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>` : ""}${(p.fit?.testimonials || []).length ? `<div class="fit-tests">${p.fit.testimonials.map((t) => `<div><span class="badge badge-soft">${esc(t.width)} foot</span><p>“${esc(t.text)}”</p><cite>${esc(t.name)}</cite></div>`).join("")}</div>` : ""}</div></details>` : ""}
      <details><summary>Shipping &amp; returns</summary><div class="acc-body"><p>${esc(p.shipping)}</p><p>${esc(p.returns)}</p></div></details>
      ${(p.qa || []).length ? `<details><summary>Questions &amp; answers</summary><div class="acc-body">${p.qa.map((q) => `<p><b>Q: ${esc(q.q)}</b><br>A: ${esc(q.a)}</p>`).join("")}</div></details>` : ""}</div>`;
    return `<div class="container pdp">
     <nav class="crumbs" aria-label="Breadcrumb">${crumbs.map((c, i) => (i < crumbs.length - 1 ? `<a href="#"${P(i === 0 ? "Show the homepage" : "Show category " + c)}>${esc(c)}</a> › ` : `<a href="#"${P("Show category " + c)}>${esc(c)}</a> › `)).join("")}<span>${esc(p.title)}</span></nav>
     <div class="pdp-top"><div class="gallery">${gallery(p.images, p.title, badges(p))}</div>
      <div class="buy"><div><div class="eyebrow">${esc(p.eyebrow)}</div><h1 class="h1" style="margin-top:6px">${esc(p.title)}</h1><div class="small muted">${esc(p.brand || "")}</div></div>
       <div class="sg-row">${rating(p.rating, true)}</div><p class="small" style="margin:0">${esc(p.summary)}</p>${buyBox(p)}${acc}</div></div>
     ${reviewsBlock(p.rating || { avg: 0, count: 0 }, null, p.reviews)}</div>`;
  }, { script: galleryScript });

  def("webshop-bundle-section", (p) => { const items = p.items || []; const sum = items.reduce((a, x) => a + x.price, 0); return `<div class="container" style="max-width:520px;margin:0"><div class="bundle"><div class="bundle-head"><b>Buy together, save ${money(p.save)}</b><span class="small muted">${items.length} items</span></div><div class="bundle-items">${items.map((x) => `<a href="#"${P(x["data-prompt"])}><img src="${img(x.image, 96, 96)}" alt=""><span>${esc(x.title)}</span></a>`).join('<span class="plus">+</span>')}</div><div class="bundle-foot"><span class="price"><span class="now">${money(sum - p.save)}</span><span class="was">${money(sum)}</span></span><button class="btn btn-secondary btn-sm"${A("Add all to bag")}>Add all ${items.length}</button></div></div></div>`; });

  def("webshop-cross-sell-section", (p) => `<section class="section"><div class="container">${head(p.title || "Complete the kit")}${grid(p.products)}</div></section>`);

  def("webshop-reviews-section", (p) => `<div class="container">${reviewsBlock(p.rating, p.dist, p.reviews)}</div>`);

  def("webshop-sticky-add-to-bag-section", (p) => `<div class="sticky-atc is-static"><div class="container"><div class="sa-row"><div><b>${esc(p.title)}</b><div class="small muted">${esc((p.options || []).join(" · "))} · ${money(p.price)}</div></div><button class="btn btn-primary"${A("Add to bag")}>Add to bag</button></div></div></div>`);

  /* ---------- story & trust ---------- */
  def("webshop-editorial-section", (p) => `<section class="section"><div class="container"><div class="editorial ${p.reverse ? "is-reverse" : ""}"><img src="${img(p.image, 1200, 800)}" alt="" loading="lazy"><div class="ed-copy"><div class="eyebrow">${esc(p.eyebrow)}</div><h2 class="h1">${esc(p.title)}</h2><p class="lead">${esc(p.text)}</p><a class="btn btn-secondary" href="#"${P(p.cta?.["data-prompt"])}>${esc(p.cta?.label)}</a></div></div></div></section>`,
    { css: "@media (min-width:720px){.editorial.is-reverse{grid-template-columns:1fr 1.1fr}.editorial.is-reverse img{order:2}}" });

  def("webshop-edit-section", (p) => `<section class="section"><div class="container"><div class="edit"><div class="edit-media card-media" style="--card-ratio:4/5"><img src="${img(p.image, 1000, 1250)}" alt="" loading="lazy"></div><div class="edit-copy"><div class="eyebrow">${esc(p.eyebrow)}</div><h2 class="h1">${esc(p.title)}</h2><p class="lead">${esc(p.text)}</p><div class="edit-list">${(p.products || []).map((x) => `<a class="edit-item" href="#"${P(x["data-prompt"])}><img src="${img(x.image, 120, 150)}" alt=""><span><b>${esc(x.title)}</b><span class="small muted">${esc(x.subtitle || "")}</span></span><span class="price"><span class="now">${money(x.price)}</span></span></a>`).join("")}</div></div></div></div></section>`);

  def("webshop-journal-section", (p) => `<section class="section"><div class="container">${head(p.title || "Journal")}<div class="journal">${(p.articles || []).map((j) => `<article class="j-card"><img src="${img(j.image, 800, 600)}" alt="" loading="lazy"><h3 class="h3">${esc(j.title)}</h3><p class="small muted">${esc(j.text)}</p><a href="#" class="small"${P(j["data-prompt"])}>Read →</a></article>`).join("")}</div></div></section>`);

  def("webshop-ugc-section", (p) => `<section class="section"><div class="container"><div class="section-head"><div><h2 class="h2">${esc(p.title)}</h2><p class="muted" style="margin:4px 0 0">${esc(p.text)}</p></div></div><div class="ugc">${(p.items || []).map((u) => `<a class="ugc-item" href="#"${P(u["data-prompt"])}><img src="${img(u.image, 500, 625)}" alt="" loading="lazy"><span class="ugc-tag"><b>${esc(u.handle)}</b> wears ${esc(u.product)}</span></a>`).join("")}</div></div></section>`);

  def("webshop-chapter-section", (p) => {
    const t = p.tiles || [];
    const cols = p.columns || [];
    const body = p.variant === "compare"
      ? `<div class="tablewrap"><table class="cmp cmp-static"><thead><tr><th></th>${cols.map((h, i) => `<th class="${i === 0 ? "is-us" : ""}">${esc(h)}</th>`).join("")}</tr></thead><tbody>${(p.rows || []).map((r) => `<tr><th>${esc(r[0])}</th>${r.slice(1).map((v, i) => `<td class="${i === 0 ? "is-us" : ""}">${esc(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`
      : `<div class="ch-tiles ch-${t.length}">${t.map((x) => `<figure><img src="${img(x.image, 900, 675)}" alt="" loading="lazy"><figcaption>${esc(x.caption)}</figcaption></figure>`).join("")}</div>`;
    return `<section class="chapter"><div class="container"><div class="ch-head"><div class="eyebrow">${esc(p.eyebrow)}</div><h2 class="display">${esc(p.title)}</h2><p class="lead">${esc(p.text)}</p></div>${body}</div></section>`;
  });

  def("webshop-specs-section", (p) => `<section class="chapter"><div class="container"><div class="ch-head"><div class="eyebrow">${esc(p.eyebrow || "Specifications")}</div><h2 class="display">${esc(p.title)}</h2></div><div class="spec-cols">${specTables(p.specs)}</div>${(p["in-the-box"] || []).length ? `<div class="inbox"><div class="eyebrow">In the box</div><ol>${p["in-the-box"].map((i) => `<li>${esc(i)}</li>`).join("")}</ol></div>` : ""}</div></section>`);

  def("webshop-faq-section", (p) => `<section class="chapter"><div class="container"><div class="ch-head"><div class="eyebrow">${esc(p.eyebrow || "Questions")}</div><h2 class="display">${esc(p.title)}</h2></div><div class="acc faq">${(p.items || []).map((q, i) => `<details ${i === 0 ? "open" : ""}><summary>${esc(q.q)}</summary><div class="acc-body"><p>${esc(q.a)}</p></div></details>`).join("")}</div></div></section>`);

  def("webshop-final-cta-section", (p) => `<section class="chapter s-final"><div class="container"><div class="ch-head"><div class="eyebrow">${esc(p.eyebrow)}</div><h2 class="display">${esc(p.title)}</h2><p class="lead">${esc(p.text)}</p><div class="sg-row"><a class="btn btn-primary btn-lg" href="#" data-anchor="${esc(p.cta?.anchor || "")}">${esc(p.cta?.label)}</a><span class="small muted">${esc(p.note || "")}</span></div></div></div></section>`);

  def("webshop-press-section", (p) => `<section class="section press"><div class="container"><div class="press-row">${(p.quotes || []).map((q) => `<blockquote><p>“${esc(q.quote)}”</p><cite>${esc(q.source)}</cite></blockquote>`).join("")}</div></div></section>`);

  def("webshop-brand-strip-section", (p) => `<section class="section brands"><div class="container"><div class="brand-row">${(p.brands || []).map((b) => `<span>${esc(b)}</span>`).join("")}</div></div></section>`);

  def("webshop-trust-section", (p) => `<section class="section"><div class="container"><div class="trust">${(p.items || []).map((t) => `<div>${icon(t.icon)}<b>${esc(t.title)}</b><span>${esc(t.text)}</span></div>`).join("")}</div></div></section>`);

  /* ---------- cart & checkout ---------- */
  def("webshop-cart-section", (p) => {
    if (p.variant === "empty") return `<div class="drawer is-static"><aside class="panel" style="height:auto"><header><b>Your bag · 0</b><button class="icon-btn"${A("Close bag")} aria-label="Close">✕</button></header><div class="body"><div class="empty"><p class="h3">${esc(p.title)}</p><p class="muted">${esc(p.text)}</p><a class="btn btn-primary" href="#"${P(p.cta?.["data-prompt"])}>${esc(p.cta?.label)}</a></div></div></aside></div>`;
    const lines = p.lines || [];
    const count = lines.reduce((a, l) => a + (l.qty || 0), 0);
    const toFree = Math.max(0, (p["free-shipping-over"] || 0) - p.subtotal);
    const w = p["free-shipping-over"] ? Math.min(100, (100 * p.subtotal) / p["free-shipping-over"]) : 100;
    return `<div class="drawer is-static"><aside class="panel"><header><b>Your bag · ${count}</b><button class="icon-btn"${A("Close bag")} aria-label="Close">✕</button></header>
      <div class="body"><div class="progress">${toFree > 0 ? `<span>You're <b>${money(toFree)}</b> away from free shipping</span>` : "<span><b>Free shipping</b> unlocked</span>"}<i style="--w:${w}%"></i></div>${lines.map((l) => lineItem(l, true)).join("")}</div>
      <footer>${totals(p)}<button class="btn btn-primary btn-lg btn-block"${A("Checkout")}>Checkout</button><button class="btn btn-express btn-block"${A("Apple Pay")}> Pay</button><div class="small muted" style="text-align:center">Guest checkout · no account needed</div></footer></aside></div>`;
  });

  def("webshop-checkout-section", (p) => { const d = p.delivery || []; return `<div class="container checkout"><div class="co-head"><a class="logo" href="#"${P("Show the homepage")}>${esc(p.store || "Stride")}</a><div class="steps"><div class="is-active">Information</div><div>Shipping</div><div>Payment</div></div></div>
    <div class="co-body"><form class="co-form" onsubmit="return false">
     <section class="co-sec"><h2 class="h3">Express checkout</h2><div class="express"><button type="button" class="btn btn-express"${A("Apple Pay")}> Pay</button><button type="button" class="btn btn-express"${A("Google Pay")}>G Pay</button><button type="button" class="btn btn-express"${A("PayPal")}>PayPal</button></div><div class="or"><span>or continue as guest</span></div></section>
     <section class="co-sec"><h2 class="h3">Contact</h2><div class="field"><label>Email</label><input class="input" type="email" placeholder="you@example.com" data-local><span class="hint">Order updates only. No account needed; you can create one after paying.</span></div></section>
     <section class="co-sec"><h2 class="h3">Delivery address</h2><div class="co-grid">
      <div class="field"><label>First name</label><input class="input" data-local></div><div class="field"><label>Last name</label><input class="input" data-local></div>
      <div class="field span2"><label>Street and number</label><input class="input" data-local></div>
      <div class="field"><label>Postcode</label><input class="input" data-local></div><div class="field"><label>City</label><input class="input" data-local></div>
      <div class="field span2"><label>Country</label><select class="select" data-local>${(p.countries || []).map((c) => `<option>${esc(c)}</option>`).join("")}</select></div></div>
      <h2 class="h3" style="margin-top:var(--s-5)">Delivery method</h2><div class="radios">${d.map((m, i) => `<label class="radio"><input type="radio" name="ship" data-local ${i === 0 ? "checked" : ""}><div><b>${esc(m.label)}</b><span>${esc(m.note)}</span></div><b class="num">${m.price ? money(m.price) : "Free"}</b></label>`).join("")}</div></section>
     <section class="co-sec"><h2 class="h3">Payment</h2><div class="co-grid"><div class="field span2"><label>Card number</label><input class="input" placeholder="1234 1234 1234 1234" data-local></div><div class="field"><label>Expiry</label><input class="input" placeholder="MM / YY" data-local></div><div class="field"><label>CVC</label><input class="input" placeholder="123" data-local></div></div>
      <div class="co-submit"><button class="btn btn-primary btn-lg btn-block"${A("Pay")}>Pay ${money(p.total)}</button><p class="small muted" style="text-align:center;margin:10px 0 0">Encrypted · 30-day returns · prices include VAT</p></div></section></form>
    <aside class="co-summary"><details class="co-sum-toggle" open><summary><b>Order summary</b><span class="num">${money(p.total)}</span></summary><div>${(p.lines || []).map((l) => lineItem(l, false)).join("")}<div style="margin-top:12px">${totals(p)}</div><div class="paylogos" style="margin-top:14px">${(p.payments || []).map((x) => `<span>${esc(x)}</span>`).join("")}</div></div></details></aside></div></div>`; });

  def("webshop-order-confirmation-section", (p) => { let eta = p.eta; try { eta = new Date(p.eta).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }); } catch (e) {} return `<div class="container plp"><div class="order"><div class="eyebrow">Order #${esc(p.order)}</div><h1 class="h1">Thanks, ${esc(p["first-name"])}. It's on its way soon.</h1><p class="lead">Confirmation sent to <b>${esc(p.email)}</b>. Expected delivery by <b>${esc(eta)}</b> to ${esc(p.address)}.</p>
    <div class="order-box">${(p.lines || []).map((l) => lineItem(l, false)).join("")}<div style="margin-top:12px">${totals({ ...p, vat: null }, p.method === "express" ? "Paid with express checkout" : "Paid")}</div></div>
    <div class="order-next"><div><b>Create an account?</b><p class="small muted" style="margin:4px 0 10px">Track this order and reorder in one tap. Optional.</p><button class="btn btn-outline btn-sm"${A("Create account")}>Create account</button></div><div><b>Changed your mind?</b><p class="small muted" style="margin:4px 0 10px">30-day free returns, prepaid label in the box.</p><a class="btn btn-ghost btn-sm" href="#"${P(p["data-prompt"])}>Continue shopping</a></div></div></div></div>`; });

  def("webshop-toast-section", (p) => `<div style="padding:var(--s-5) 0"><div class="toast is-static"><span>${esc(p.message)}</span>${p.action ? `<button class="btn btn-sm" style="background:var(--bg);color:var(--fg)"${P(p.action["data-prompt"])}>${esc(p.action.label)}</button>` : ""}</div></div>`);
  /* ---------- design page: live UI kit ---------- */
  def("webshop-kit", () => {
    const h = (eyebrow, title) => `<div class="kit-h"><div class="eyebrow">${eyebrow}</div><h3 class="h2">${title}</h3></div>`;
    const sample = { title: "Aero Run 2", subtitle: "Neutral road running shoe", price: 139, "compare-at": 169, image: "photo-1542291026-7eec264c27ff", "hover-image": "photo-1597892657493-6847b9640bac", badges: ["sale", "bestseller"], rating: { avg: 4.7, count: 183 }, swatches: ["#d6341f", "#f1efe9", "#7c7f86"], "data-prompt": "Show product Aero Run 2" };
    const sample2 = { title: "Merino run sock 3-pack", subtitle: "Cushioned ankle sock", price: 29, image: "photo-1773665230184-5fd8cb4fc928", badges: ["bestseller", "low-stock"], rating: { avg: 4.8, count: 530 }, swatches: [], "data-prompt": "Show product Merino run sock 3-pack" };
    return `<div class="annc">Free shipping over €75 · 30-day free returns · VAT included</div>
    <div class="container kit">
      <section>${h("01 · Actions", "Buttons")}
        <div class="kit-row"><button class="btn btn-primary"${A("Primary")}>Add to bag</button><button class="btn btn-secondary"${A("Secondary")}>View collection</button><button class="btn btn-outline"${A("Outline")}>Compare</button><button class="btn btn-ghost"${A("Ghost")}>Size guide</button><button class="btn btn-primary" disabled>Sold out</button></div>
        <div class="kit-row"><button class="btn btn-primary btn-lg"${A("Large")}>Checkout · €189,00</button><button class="btn btn-outline btn-sm"${A("Small")}>Quick view</button><button class="btn btn-express"${A("Express")}> Pay</button><button class="btn btn-express"${A("Express")}>G Pay</button><button class="btn btn-express"${A("Express")}>PayPal</button></div></section>
      <section>${h("02 · Forms", "Inputs and filters")}
        <div class="kit-2"><div class="kit-col"><div class="field"><label>Email</label><input class="input" type="email" value="ana@example.com" data-local></div><div class="field"><label>Country</label><select class="select" data-local><option>Croatia</option><option>Slovenia</option></select></div><div class="field"><label>Postcode</label><input class="input is-invalid" value="1000" data-local><span class="hint is-error">Postcodes in Croatia have 5 digits, e.g. 10000.</span></div></div>
        <div class="kit-col"><div class="search">${ICON.search}<input class="input" placeholder="Search products, e.g. trail running 42" data-local></div><label class="check"><input type="checkbox" checked data-local> EU 42 <span class="cnt">18</span></label><label class="check"><input type="checkbox" data-local> Waterproof <span class="cnt">7</span></label><div class="applied"><span class="pill is-active">EU 42 <span class="x">×</span></span><span class="pill is-active">Under €150 <span class="x">×</span></span><button class="btn btn-ghost btn-sm"${A("Clear all")}>Clear all</button></div></div></div></section>
      <section>${h("03 · Signals", "Badges, ratings, stock and options")}
        <div class="kit-row"><span class="badge badge-new">New</span><span class="badge badge-sale">−18%</span><span class="badge badge-low">Low stock</span><span class="badge badge-out">Sold out</span><span class="badge badge-ok">Ships today</span><span class="badge badge-soft">Best seller</span></div>
        <div class="kit-row">${rating({ avg: 4.6, count: 212 })}<span class="stock">In stock</span><span class="stock is-low">Only 2 left in EU 43</span><span class="stock is-out">Sold out · notify me</span></div>
        <div class="kit-row"><div class="price price-lg"><span class="now is-sale">€139,00</span><span class="was">€169,00</span></div><div class="swatches"><button class="swatch is-active" style="--c:#d6341f" data-local></button><button class="swatch" style="--c:#f1efe9" data-local></button><button class="swatch is-out" style="--c:#7c7f86" data-local></button></div></div>
        <div class="variants"><button class="variant" data-local>40</button><button class="variant" data-local>41</button><button class="variant is-active" data-local>42</button><button class="variant is-low" data-local>43</button><button class="variant is-out" data-local>44</button><button class="variant" data-local>45</button></div></section>
      <section>${h("04 · Navigation", "Chips, breadcrumbs and section heads")}
        <nav class="crumbs"><a href="#"${P("Show the homepage")}>Home</a> › <a href="#"${P("Show category Running")}>Running</a> › <span>Road</span></nav>
        <div class="chips subcats" style="margin:12px 0"><a class="pill is-active" href="#">All</a><a class="pill" href="#"${P("Show category Road")}>Road</a><a class="pill" href="#"${P("Show category Trail")}>Trail</a><a class="pill" href="#"${P("Show category Track")}>Track</a></div>
        ${head("Best sellers", "View all", "Show all best sellers")}</section>
      <section>${h("05 · Graphics", "Cards, tiles and photo treatment")}
        <div class="kit-cards"><div class="grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">${card(sample)}${card(sample2)}</div>${tiles([{ label: "Running", image: "photo-1590333748338-d629e4564ad9", "data-prompt": "Show category Running" }, { label: "Outdoor", image: "photo-1600100315778-850119b19220", "data-prompt": "Show category Outdoor" }])}</div>
        <div class="trust" style="margin-top:24px">${[["truck", "Free shipping over €75", "2–4 working days, EU-wide"], ["arrow-back-up", "30-day returns", "Prepaid label in the box"], ["shield-check", "2-year warranty", "On every pair of shoes"], ["map-pin", "Shipped from Zagreb", "Same-day dispatch by 14:00"]].map(([i, t, x]) => `<div>${icon(i)}<b>${t}</b><span>${x}</span></div>`).join("")}</div></section>
    </div>`;
  }, { css: `.kit{display:grid;gap:40px;padding-block:28px 40px}.kit-h{margin-bottom:14px}.kit-h .h2{margin:4px 0 0}.kit-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:12px}
     .kit-2{display:grid;gap:24px}@media(min-width:760px){.kit-2{grid-template-columns:1fr 1fr}}.kit-col{display:grid;gap:12px;align-content:start}
     .kit-cards{display:grid;gap:16px}@media(min-width:760px){.kit-cards{grid-template-columns:1.2fr 1fr;align-items:start}.kit-cards .tiles{grid-template-columns:1fr 1fr}}` });
})();
