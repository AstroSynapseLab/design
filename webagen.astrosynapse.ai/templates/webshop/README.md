# Webshop · Stride

A webshop the agent builds as the shopper asks: homepage, categories, products, comparisons, bag and checkout. Demo store: Stride, a fictional sports footwear shop shipping from Zagreb.

- `design.md` — colours, type, spacing, graphics and UI elements (white, navy, orange, Barlow Condensed)
- `components.md` — the sections the agent composes layouts from (ruleset + JSON), prefix `stride-`
- `content.md` — default store content (STORE INFO): products, prices, sizes, reviews, shipping and returns
- `prototype/` — the full webshop as a classic multi-page site (HTML pages, `styles.css`, `main.js`); the main page shows it. Pages are built from the components and example layouts. `data.js` maps prompts to pages (routes) and holds the props for the bag, quick view, search and menu, which `components.js` (a copy of `webagen.astrosynapse.ai/renderers/stride.js`) renders in the browser. The bag lives in localStorage; checkout sends nothing
- `layouts/` — example flows: what the agent sends back, step by step, for typical shopping journeys
- `prompts/` — AI instructions specific to this template (empty for now)

Coded prototype: `astro-webshop` repo (`#/stride/sections` shows every section live).
