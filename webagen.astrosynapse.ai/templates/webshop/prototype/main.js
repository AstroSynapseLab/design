/* Stride prototype: a classic multi-page shop. Pages are plain HTML; this file adds what a shop
   does in the browser: bag, quick view, search, menu, options, toasts and dark mode.
   data-prompt = what the webAgen agent would be asked · routes in data.js say which page answers it.
   Anything this prototype doesn't have shows a toast instead of a dead link. */
(function () {
  "use strict";
  var S = window.STRIDE || {}, R = window.WEBAGEN_RENDERERS || {};
  var routes = S.routes || {};
  var page = {};
  try { page = JSON.parse(document.getElementById("page-data").textContent) || {}; } catch (e) {}
  var root = document.documentElement;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  /* ---------- storage (works without it, e.g. private windows) ---------- */
  var mem = {};
  function load(k) { try { var v = localStorage.getItem(k); if (v) return JSON.parse(v); } catch (e) {} return mem[k] || null; }
  function save(k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- render a component with the same markup as the docs previews ---------- */
  function html(name, props) { return R[name] ? R[name].render(props).replace(/ is-static/g, "") : ""; }
  function el(markup) { var w = document.createElement("div"); w.innerHTML = markup.trim(); return w.firstElementChild; }

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg, action) {
    var old = $(".toast"); if (old) old.remove();
    var t = el('<div class="toast" role="status"><span></span></div>');
    t.firstChild.textContent = msg;
    if (action) {
      var b = el('<button class="btn btn-sm" style="background:var(--bg);color:var(--fg)"></button>');
      b.textContent = action.label; b.addEventListener("click", function () { t.remove(); action.run(); });
      t.appendChild(b);
    }
    document.body.appendChild(t);
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.remove(); }, 4000);
  }
  function missing(what) { toast("Not in this prototype yet: " + what); }

  /* ---------- overlays: bag, menu, quick view ---------- */
  function closeAll() {
    $$("body > .drawer, body > .modal").forEach(function (o) { o.remove(); });
    root.style.overflow = "";
  }
  function overlay(markup) {
    closeAll();
    var o = el(markup);
    o.insertAdjacentHTML("afterbegin", '<div class="scrim" data-close></div>');
    if (o.classList.contains("drawer")) o.classList.add("is-open");
    document.body.appendChild(o);
    root.style.overflow = "hidden";
    var f = o.querySelector("button, a"); if (f) f.focus({ preventScroll: true });
    return o;
  }

  /* bag */
  function bag() { return load("webshop-bag") || []; }
  function totals(lines) {
    var d = S.bagDefaults || { "free-shipping-over": 75, shipping: 4.9, vatRate: 0.25 };
    var sub = lines.reduce(function (a, l) { return a + l.price * l.qty; }, 0);
    var ship = !sub || sub >= d["free-shipping-over"] ? 0 : d.shipping;
    var total = Math.round((sub + ship) * 100) / 100;
    return { subtotal: sub, shipping: ship, total: total, vat: Math.round((total - total / (1 + d.vatRate)) * 100) / 100, "free-shipping-over": d["free-shipping-over"] };
  }
  function setBag(lines) { save("webshop-bag", lines); paintCount(); if ($("body > .drawer.cart")) openBag(); }
  function openBag() {
    var lines = bag();
    var o = overlay(lines.length ? html("webshop-cart-section", Object.assign({ variant: "filled", lines: lines }, totals(lines))) : html("webshop-cart-section", S.bagEmpty || {}));
    o.classList.add("cart");
  }
  function paintCount() {
    var n = bag().reduce(function (a, l) { return a + l.qty; }, 0);
    $$('.header [data-action="Open bag"]').forEach(function (b) {
      var c = b.querySelector(".count");
      if (!n) { if (c) c.remove(); return; }
      if (!c) { c = el('<span class="count"></span>'); b.appendChild(c); }
      c.textContent = n;
    });
  }
  function lineIndex(btn) { var li = btn.closest(".line-item"); return li ? $$(".line-item", li.parentNode).indexOf(li) : -1; }

  function chosen(scope) {
    var labels = $$(".opt .label b", scope).map(function (b) { return b.textContent; });
    var q = $(".qty output", scope);
    return { options: labels, qty: q ? Math.max(1, +q.textContent || 1) : 1 };
  }
  function addToBag(btn, silent) {
    var modal = btn.closest(".modal"), product, scope;
    if (modal) {
      var name = ($("h2", modal) || {}).textContent;
      var qv = (S.quickView || {})[name] || {};
      product = { title: qv.title, price: qv.price, image: qv.image, "data-prompt": qv["data-prompt"] };
      scope = modal;
    } else {
      product = page.product;
      scope = $("main .buy") || document;
    }
    if (!product) return missing("Add to bag");
    var c = chosen(scope);
    var lines = bag(), key = product.title + "|" + c.options.join("|");
    var hit = lines.filter(function (l) { return l.title + "|" + l.options.join("|") === key; })[0];
    if (hit) hit.qty = Math.min(hit.max || 10, hit.qty + c.qty);
    else lines.push({ title: product.title, options: c.options, qty: c.qty, max: 10, price: product.price, image: product.image, "data-prompt": product["data-prompt"] });
    if (modal) closeAll();
    setBag(lines);
    if (!silent) toast("Added to bag · " + product.title, { label: "View bag", run: openBag });
  }
  function placeOrder() {
    var lines = bag();
    save("webshop-order", lines.length ? lines : null);
    save("webshop-bag", []);
    location.href = "order-confirmation.html";
  }

  /* menu + quick view */
  function openMenu() { overlay(html("webshop-mobile-menu-section", S.menu || {})); }
  function quickView(name) {
    var qv = (S.quickView || {})[name];
    if (qv) return overlay(html("webshop-quick-view-section", qv));
    if (routes["Show product " + name]) return go(routes["Show product " + name]);
    missing("Quick view " + name);
  }

  /* ---------- prompts and actions ---------- */
  function go(to) { location.href = to; }
  function ask(prompt) {
    if (/^Quick view /.test(prompt)) return quickView(prompt.slice(11));
    if (prompt === "Show my bag") return openBag();
    if (routes[prompt]) return go(routes[prompt]);
    missing("“" + prompt + "”");
  }
  function pickIn(btn, sel, label) {
    var group = btn.closest(".opt");
    if (!group) return;
    $$(sel, group).forEach(function (b) { b.classList.toggle("is-active", b === btn); });
    var b = $(".label b", group); if (b) b.textContent = label;
  }
  function act(name, btn) {
    var m;
    switch (name) {
      case "Open menu": return openMenu();
      case "Close menu": case "Close bag": case "Close quick view": return closeAll();
      case "Open bag": return openBag();
      case "Open search": return openSearch();
      case "Toggle dark mode": {
        var dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
        root.dataset.theme = dark ? "light" : "dark";
        try { localStorage.setItem("webshop-theme", root.dataset.theme); } catch (e) {}
        return;
      }
      case "Save to wishlist": btn.classList.toggle("is-on"); return toast(btn.classList.contains("is-on") ? "Saved to wishlist" : "Removed from wishlist");
      case "Join newsletter": {
        var i = btn.closest("form") && $("input", btn.closest("form"));
        if (i && !/.+@.+\..+/.test(i.value)) { i.focus(); return toast("Enter your email to get 10% off"); }
        if (i) i.value = "";
        return toast("Thanks. This is a demo, so no email was sent.");
      }
      case "Open filters drawer": { var f = $(".facets-col"); if (f) f.classList.toggle("is-open"); return; }
      case "Scroll to reviews": { var r = $("#reviews"); if (r) r.scrollIntoView(); return; }
      case "Open size guide": {
        var fit = $$(".acc summary").filter(function (s) { return /Fit/.test(s.textContent); })[0];
        if (fit) { fit.parentNode.open = true; fit.scrollIntoView(); return; }
        return go("help.html#size-guide");
      }
      case "Decrease quantity": case "Increase quantity": {
        var d = name === "Increase quantity" ? 1 : -1, idx = lineIndex(btn);
        if (btn.closest(".drawer") && idx > -1) {
          var lines = bag(), l = lines[idx];
          l.qty = Math.min(l.max || 10, l.qty + d);
          if (l.qty < 1) lines.splice(idx, 1);
          return setBag(lines);
        }
        var out = $("output", btn.closest(".qty")); if (out) out.textContent = Math.min(10, Math.max(1, +out.textContent + d));
        return;
      }
      case "Remove line": { var ls = bag(); ls.splice(lineIndex(btn), 1); return setBag(ls); }
      case "Add to bag": return addToBag(btn);
      case "Add all to bag": {
        var items = (page.bundle || {}).items || [], all = bag();
        items.forEach(function (x) { all.push({ title: x.title, options: [], qty: 1, max: 10, price: x.price, image: x.image, "data-prompt": x["data-prompt"] }); });
        setBag(all);
        return toast("Added " + items.length + " items to bag", { label: "View bag", run: openBag });
      }
      case "Checkout": return go("checkout.html");
      case "Pay": return placeOrder();
      case "Apple Pay": case "Google Pay": case "PayPal":
        if (!btn.closest(".drawer") && !btn.closest(".checkout") && page.product) addToBag(btn, true);
        return placeOrder();
      case "Open compare": { var t = $(".inline-compare"); if (t) t.scrollIntoView(); return; }
    }
    if ((m = /^Choose colour (.+)$/.exec(name))) return pickIn(btn, ".swatch", m[1]);
    if ((m = /^Choose size (.+)$/.exec(name))) {
      if (btn.classList.contains("is-out")) return toast("EU " + m[1] + " is sold out in this colour");
      return pickIn(btn, ".variant", "EU " + m[1]);
    }
    if (page.remove && page.remove[name]) return go(page.remove[name]);
    missing(name);
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest("[data-close]")) return closeAll();
    var a = t.closest("[data-action]");
    if (a) { e.preventDefault(); return act(a.getAttribute("data-action"), a); }
    var p = t.closest("[data-prompt]");
    if (p) {
      var href = p.getAttribute("href");
      if (href && href !== "#") return; // a real page answers this prompt
      e.preventDefault();
      return ask(p.getAttribute("data-prompt"));
    }
    if (t.closest('a[href="#"]')) e.preventDefault();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeAll(); hideSuggest(); } });

  /* ---------- filters: the sizes this prototype has pages for ---------- */
  document.addEventListener("change", function (e) {
    var box = e.target.closest(".facet input[type=checkbox]");
    if (!box) return;
    var label = ((box.nextSibling || {}).textContent || "").trim(); // the option text, without its count
    var to = (page.facets || {})[label];
    if (to) return go(to);
    box.checked = !box.checked;
    missing("filter " + label);
  });

  /* ---------- search ---------- */
  var wrap = $(".header .search-wrap"), input = wrap && $("input", wrap), sug;
  function suggestFor(q) {
    var s = S.search || {}, base = /tr[ia]/i.test(q) ? s.trail : /run/i.test(q) ? s.run : null;
    return base ? Object.assign({}, base, { query: q }) : { query: q, categories: [], products: [] };
  }
  function showSuggest() {
    var q = input.value.trim();
    if (!q) return hideSuggest();
    var box = el(html("webshop-search-suggest-section", suggestFor(q)));
    var next = $(".suggest", box);
    if (sug) sug.replaceWith(next); else wrap.appendChild(next);
    sug = next;
  }
  function hideSuggest() { if (sug) { sug.remove(); sug = null; } }
  function openSearch() { wrap.classList.toggle("is-open"); if (wrap.classList.contains("is-open")) input.focus(); else hideSuggest(); }
  if (input) {
    input.addEventListener("input", showSuggest);
    input.addEventListener("focus", showSuggest);
    input.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      e.preventDefault();
      var q = input.value.trim(); if (!q) return;
      var p = suggestFor(q)["data-prompt"];
      p && routes[p] ? go(routes[p]) : missing("search for “" + q + "”");
    });
    document.addEventListener("click", function (e) { if (!e.target.closest(".search-wrap") && !e.target.closest(".search-btn")) hideSuggest(); });
  }

  /* ---------- pages that show the bag: checkout and order confirmation ---------- */
  var co = $(".checkout");
  if (co && page.checkout && bag().length) {
    var lines = bag();
    co.outerHTML = html("webshop-checkout-section", Object.assign({}, page.checkout, { lines: lines }, totals(lines)));
  }
  var ord = $(".order");
  if (ord && page.order) {
    // delivery date: 3 working days from today; lines: the order just placed, else the example order
    var eta = new Date(), add = 3;
    while (add) { eta.setDate(eta.getDate() + 1); if (eta.getDay() % 6) add--; }
    var o = Object.assign({}, page.order, { eta: eta.toISOString().slice(0, 10) });
    var last = load("webshop-order");
    if (last && last.length) { var t2 = totals(last); Object.assign(o, { lines: last, subtotal: t2.subtotal, shipping: t2.shipping, total: t2.total }); }
    ord.closest(".container").outerHTML = html("webshop-order-confirmation-section", o);
  }

  /* ---------- component scripts (gallery, slider, hotspots), each once ---------- */
  var seen = {};
  Object.keys(R).forEach(function (k) {
    var s = R[k].script;
    if (!s || seen[s]) return;
    seen[s] = 1;
    try { new Function(s)(); } catch (e) {}
  });

  /* chapter nav: mark the chapter in view */
  var cn = $$(".chapter-nav .cn-row a:not(.cn-buy)");
  if (cn.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        cn.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    cn.forEach(function (a) { var s = document.getElementById(a.getAttribute("href").slice(1)); if (s) io.observe(s); });
  }

  paintCount();
})();
