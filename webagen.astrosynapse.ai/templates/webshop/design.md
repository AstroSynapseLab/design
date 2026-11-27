# Stride design

The look of the Stride webshop: a white ground, deep navy ink and one warm orange accent, with a condensed uppercase display face. Every component reads these tokens; none hard-code a colour, font or radius. Source: `astro-webshop/css/tokens.css`, `components.css` and `layouts.css`.

## Principles

- One accent. Orange is for the primary action and the active state, never for decoration
- Products first: photography carries the colour, the interface stays neutral
- Scan, then read: a condensed uppercase display for headings, plain Inter for everything you read
- States are shown, not hinted: selected options get a border and inner ring, sold-out stays visible and struck through, low stock gets a dot
- Prices always include VAT and use the store's format: `€139,00`

## Colour

Light is the default; dark follows the system setting or the theme toggle. Text on the accent is always white.

```json design:colors
{
  "modes": {
    "light": { "--bg": "#ffffff", "--bg-2": "#f4f3f0", "--surface": "#ffffff", "--fg": "#13213a", "--fg-2": "#4b556b", "--muted": "#7b8294", "--line": "#e3e1dc", "--line-strong": "#c9c6bf", "--accent": "#f26a21", "--accent-soft": "#fdebe0", "--accent-2": "#13213a", "--sale": "#d6341f", "--ok": "#1f7a4d", "--warn": "#9a5a12", "--err": "#b42318", "--star": "#e8a317", "--img-bg": "#f4f3f0" },
    "dark": { "--bg": "#0f1524", "--bg-2": "#161d2f", "--surface": "#161d2f", "--fg": "#eef0f5", "--fg-2": "#c3c8d6", "--muted": "#8c93a6", "--line": "#2a3246", "--line-strong": "#3a4359", "--accent": "#ff7a33", "--accent-soft": "#3a2416", "--accent-2": "#eef0f5", "--sale": "#d6341f", "--ok": "#1f7a4d", "--warn": "#9a5a12", "--err": "#b42318", "--star": "#e8a317", "--img-bg": "#1c2436" }
  },
  "usage": {
    "--bg": "Page background",
    "--bg-2": "Bands, editorial blocks, image placeholders",
    "--surface": "Cards, drawers, modals",
    "--fg": "Headings and body text",
    "--fg-2": "Secondary text",
    "--muted": "Hints, counts, meta",
    "--line": "Dividers and input borders",
    "--line-strong": "Hover borders",
    "--accent": "Primary buttons, active states, links",
    "--accent-soft": "Soft badges and highlights",
    "--accent-2": "Announcement bar, secondary buttons",
    "--sale": "Sale price and discount badge",
    "--ok": "In stock, verified",
    "--warn": "Low stock",
    "--err": "Errors, sold out",
    "--star": "Rating stars",
    "--img-bg": "Behind product photos"
  }
}
```

## Typography

```json design:type
[
  { "name": "Display", "family": "Barlow Condensed", "weight": 700, "size": "44–88 px", "case": "uppercase", "tracking": "-0.01em", "sample": "Built for the long way round", "use": "Heroes and chapter titles" },
  { "name": "Heading 1", "family": "Barlow Condensed", "weight": 700, "size": "34–52 px", "case": "uppercase", "tracking": "-0.01em", "sample": "Running", "use": "Page titles, product names" },
  { "name": "Heading 2", "family": "Barlow Condensed", "weight": 700, "size": "26–34 px", "case": "uppercase", "tracking": "-0.01em", "sample": "Best sellers", "use": "Section titles" },
  { "name": "Lead", "family": "Inter", "weight": 400, "size": "18 px", "case": "none", "tracking": "0", "sample": "Waterproof trail shoes, merino socks and gaiters, in stock and shipping today.", "use": "Intros under titles" },
  { "name": "Body", "family": "Inter", "weight": 400, "size": "16 px", "case": "none", "tracking": "0", "sample": "The engineered mesh upper is thinner than last year's but holds the midfoot better.", "use": "Descriptions, reviews" },
  { "name": "Eyebrow", "family": "JetBrains Mono", "weight": 500, "size": "12 px", "case": "uppercase", "tracking": "0.08em", "sample": "Trail season", "use": "Labels above titles, spec groups" },
  { "name": "Price", "family": "Inter", "weight": 700, "size": "16–24 px", "case": "none", "tracking": "0", "sample": "€139,00", "use": "Tabular figures, comma decimals" }
]
```

## Spacing, radius and shadow

```json design:scale
{
  "Spacing": { "s-1": "4px", "s-2": "8px", "s-3": "12px", "s-4": "16px", "s-5": "24px", "s-6": "32px", "s-7": "48px", "s-8": "64px", "s-9": "96px" },
  "Radius": { "r-sm": "3px", "r": "6px", "r-lg": "10px", "r-pill": "999px" },
  "Layout": { "container": "1320px", "gutter": "16px", "header": "64px", "announcement": "36px" }
}
```

## Graphics

- Photography only, no illustrations. Every image is an Unsplash photo id from the store info
- Product images: the first is a packshot on a light ground, the rest are in context (on foot, on the trail). Cards crop to 4:5 and swap to the second photo on hover
- Heroes and editorial blocks use one landscape photo (16:9 or 3:2); category tiles are square with a dark gradient at the bottom and the label in white display type
- Icons are 24 px line icons with a 2 px stroke (Tabler style), in the text colour; the accent is used only on trust icons
- No patterns, textures or gradients except the dark scrim under text on photos

## UI elements

The shared building blocks every component is made of, drawn with the live Stride CSS. Use the theme toggle to see them in dark mode.

<!-- kit: webshop-kit -->
