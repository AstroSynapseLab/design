# Website · Astro

A company website the agent builds as the visitor asks questions: services, products, use cases, team and contact. Demo company: Korvane Silicon, a fictional fabless chip design house.

- `design.md` — colours, type, spacing, graphics and UI elements (dark-first, cyan accent, Satoshi)
- `components.md` — the sections the agent composes layouts from (ruleset + JSON), prefix `astro-`
- `content.md` — default web content: the Korvane company document the agent answers from
- `prototype/` — the full website as a classic multi-page site (HTML, `styles.css`, `main.js`, images); the main page shows it. The contact form has no action and sends nothing
- `layouts/` — example flows: what the agent sends back, step by step, for typical visitor journeys
- `prompts/` — AI instructions specific to this template (empty for now)

Live preview: webagen.astrosynapse.ai/website
