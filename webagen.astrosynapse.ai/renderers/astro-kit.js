// Design page: live UI kit for the Astro website template, drawn with the webAgen tokens.
(function () {
  const R = (window.WEBAGEN_RENDERERS = window.WEBAGEN_RENDERERS || {});
  const sec = (eyebrow, title, body) => `<section class="k-sec"><p class="k-eyebrow">${eyebrow}</p><h3 class="k-h">${title}</h3>${body}</section>`;
  R["astro-kit"] = {
    css: `
      .k{padding:48px 32px 56px;display:grid;gap:44px;font-family:Inter,system-ui,sans-serif;color:hsl(var(--foreground));
        background:radial-gradient(55% 40% at 90% 0%,hsl(var(--brand-violet)/.14),transparent 70%),radial-gradient(45% 40% at 0% 100%,hsl(var(--brand-cyan)/.1),transparent 70%),
        radial-gradient(circle at 1px 1px,hsl(var(--foreground)/.07) 1px,transparent 0) 0 0/22px 22px,hsl(var(--background))}
      .k-eyebrow{font:500 11px "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:hsl(var(--brand-cyan));margin:0 0 6px}
      .k-h{font:800 26px/1.15 Satoshi,Inter,sans-serif;letter-spacing:-.02em;margin:0 0 16px}
      .k-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
      .k-btn{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:11px 20px;font:600 14px/1 Satoshi,Inter,sans-serif;text-decoration:none;border:1px solid transparent;cursor:pointer;transition:transform .2s,box-shadow .2s}
      .k-btn--primary{background:hsl(var(--primary));color:hsl(var(--primary-foreground))}.k-btn--primary:hover{transform:translateY(-1px);box-shadow:0 8px 24px -8px hsl(var(--primary)/.7)}
      .k-btn--outline{border-color:hsl(var(--border));color:hsl(var(--foreground));background:hsl(var(--card)/.4)}.k-btn--outline:hover{border-color:hsl(var(--brand-cyan))}
      .k-btn--ghost{color:hsl(var(--brand-cyan));padding-inline:4px}
      .k-badge{border:1px solid hsl(var(--border));border-radius:999px;padding:4px 12px;font:500 12px "IBM Plex Mono",monospace;color:hsl(var(--muted-foreground))}
      .k-badge--live{color:hsl(var(--brand-cyan));border-color:hsl(var(--brand-cyan)/.5)}.k-badge--wait{color:hsl(var(--brand-gold));border-color:hsl(var(--brand-gold)/.5)}
      .k-brand{font:800 44px/1 Satoshi,Inter,sans-serif;letter-spacing:-.03em;background:linear-gradient(90deg,hsl(var(--brand-cyan)),hsl(var(--brand-violet)),hsl(var(--brand-magenta)));-webkit-background-clip:text;background-clip:text;color:transparent;margin:0}
      .k-display{font:800 40px/1.05 Satoshi,Inter,sans-serif;letter-spacing:-.025em;margin:12px 0 10px}.k-display em{font-style:normal;color:hsl(var(--brand-cyan))}
      .k-sub{color:hsl(var(--muted-foreground));max-width:56ch;margin:0}
      .k-marquee{display:flex;gap:18px;font:500 12px "IBM Plex Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:hsl(var(--muted-foreground));border-block:1px solid hsl(var(--border));padding:12px 0;margin-top:20px;overflow:hidden;white-space:nowrap}
      .k-marquee span::after{content:"·";margin-left:18px;color:hsl(var(--brand-cyan))}
      .k-cards{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
      .k-card{background:hsl(var(--card));border:1px solid hsl(var(--border)/.7);border-radius:16px;padding:20px;display:grid;gap:10px;transition:border-color .25s,transform .25s}
      .k-card:hover{border-color:hsl(var(--brand-cyan)/.6);transform:translateY(-3px)}
      .k-card h4{font:700 20px Satoshi,Inter,sans-serif;margin:0}.k-card p{margin:0;color:hsl(var(--muted-foreground));font-size:14px}
      .k-pills{display:flex;flex-wrap:wrap;gap:6px}.k-pill{background:hsl(var(--muted));border-radius:999px;padding:3px 10px;font:500 12px Inter,sans-serif}
      .k-list{list-style:none;margin:0;padding:0;display:grid;gap:0}.k-list li{display:grid;grid-template-columns:44px 1fr;gap:12px;padding:14px 0;border-bottom:1px solid hsl(var(--border)/.7)}
      .k-list b{font:700 16px Satoshi,Inter,sans-serif}.k-list span{color:hsl(var(--muted-foreground));font-size:14px}.k-list i{font:500 12px "IBM Plex Mono",monospace;font-style:normal;color:hsl(var(--brand-cyan));padding-top:3px}
      .k-input{display:grid;gap:6px;max-width:380px}.k-input label{font:500 12px Inter,sans-serif;color:hsl(var(--muted-foreground))}
      .k-input input{height:44px;border-radius:10px;border:1px solid hsl(var(--border));background:hsl(var(--muted)/.5);color:inherit;padding:0 14px;font:14px Inter,sans-serif;outline:none}.k-input input:focus{border-color:hsl(var(--brand-cyan));box-shadow:0 0 0 3px hsl(var(--brand-cyan)/.2)}
      .k-2{display:grid;gap:20px}@media(min-width:760px){.k-2{grid-template-columns:1fr 1fr}}
      @media(max-width:760px){.k{padding:32px 16px}.k-display{font-size:30px}.k-brand{font-size:34px}}`,
    render: () => `<div class="k">
      ${sec("01 · Brand", "Wordmark and landing heading", `<p class="k-brand">Korvane Silicon</p>
        <h2 class="k-display">We design chips that do one thing <em>exceptionally well.</em></h2>
        <p class="k-sub">Low-power chips for edge AI, power, radar sensing and security, plus custom silicon for products that have outgrown off-the-shelf parts.</p>
        <div class="k-marquee"><span>Edge AI</span><span>Power</span><span>Sensing</span><span>Security</span><span>Korvane Silicon</span></div>`)}
      ${sec("02 · Actions", "Buttons and links", `<div class="k-row"><a class="k-btn k-btn--primary" href="#" data-href="/contact">Start a project →</a><a class="k-btn k-btn--outline" href="#" data-prompt="What chips do you make? Show me your products.">Explore our chips</a><a class="k-btn k-btn--ghost" href="#" data-prompt="Tell me more about Nerva N1">View the datasheet →</a></div>`)}
      ${sec("03 · Signals", "Badges and pills", `<div class="k-row"><span class="k-badge">Efficiency</span><span class="k-badge">Reliability</span><span class="k-badge k-badge--live">In production</span><span class="k-badge k-badge--wait">Waitlist</span></div><div class="k-pills" style="margin-top:12px"><span class="k-pill">8 TOPS</span><span class="k-pill">Sub-1W</span><span class="k-pill">INT4/INT8</span><span class="k-pill">RISC-V control core</span></div>`)}
      ${sec("04 · Content", "Cards and lists", `<div class="k-2"><div class="k-cards"><article class="k-card"><span class="k-badge k-badge--live" style="justify-self:start">In production</span><h4>Nerva N1</h4><p>Edge AI inference accelerator, 8 TOPS at under one watt.</p><div class="k-pills"><span class="k-pill">8 TOPS</span><span class="k-pill">Sub-1W</span></div></article></div>
        <ol class="k-list"><li><i>01</i><div><b>Discovery.</b><br><span>Decide together whether custom silicon makes sense at all.</span></div></li><li><i>02</i><div><b>Specification.</b><br><span>Freeze functions, interfaces, power targets and unit cost.</span></div></li><li><i>03</i><div><b>Architecture.</b><br><span>Partition the system and model power before any design.</span></div></li></ol></div>`)}
      ${sec("05 · Forms", "Inputs", `<div class="k-input"><label>Work email</label><input placeholder="you@company.com" data-local></div>`)}
    </div>`,
  };
})();
