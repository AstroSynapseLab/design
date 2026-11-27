# Astro design

The look of the Astro website template, as shipped on webagen.astrosynapse.ai/website: a near-black ground, warm off-white type and a bright cyan accent, with a violet-to-magenta gradient reserved for the brand. Every component reads these tokens as `hsl(var(--token))`; none hard-code a colour.

## Principles

- Dark first. The site opens in dark mode; light mode uses the same accent on a warm off-white
- Cyan is the only action colour: primary buttons, links, eyebrows and focus rings
- The gradient (cyan → violet → magenta) belongs to the brand wordmark and soft background glows, never to text you read or to buttons
- Big, tight headings: Inter semibold with tight tracking for headings, Satoshi for body text, IBM Plex Mono for small uppercase labels
- Space over boxes: sections breathe on the dotted grid; cards appear only when items need to be compared

## Colour

```json design:colors
{
  "modes": {
    "dark": { "--background": "hsl(230 43% 3%)", "--foreground": "hsl(39 39% 93%)", "--card": "hsl(233 36% 4%)", "--muted": "hsl(232 28% 9%)", "--muted-foreground": "hsl(228 13% 60%)", "--border": "hsl(240 4% 14%)", "--primary": "hsl(170 85% 72%)", "--primary-foreground": "hsl(230 43% 3%)", "--brand-cyan": "hsl(170 85% 72%)", "--brand-violet": "hsl(253 100% 71%)", "--brand-magenta": "hsl(283 100% 71%)", "--brand-gold": "hsl(44 82% 71%)", "--accent": "hsl(232 24% 12%)" },
    "light": { "--background": "hsl(40 33% 97%)", "--foreground": "hsl(233 36% 6%)", "--card": "hsl(40 40% 99%)", "--muted": "hsl(38 25% 92%)", "--muted-foreground": "hsl(228 12% 42%)", "--border": "hsl(36 18% 86%)", "--primary": "hsl(173 80% 30%)", "--primary-foreground": "hsl(0 0% 100%)", "--brand-cyan": "hsl(173 80% 32%)", "--brand-violet": "hsl(253 75% 58%)", "--brand-magenta": "hsl(283 70% 50%)", "--brand-gold": "hsl(40 85% 40%)", "--accent": "hsl(38 28% 90%)" }
  },
  "usage": {
    "--background": "Page background",
    "--foreground": "Headings and body text",
    "--card": "Cards and panels",
    "--muted": "Quiet surfaces, inputs, chips",
    "--muted-foreground": "Secondary text",
    "--border": "Card borders and dividers",
    "--primary": "Primary buttons, links, focus",
    "--primary-foreground": "Text on primary buttons",
    "--brand-cyan": "Eyebrows, icons, hover glow",
    "--brand-violet": "Gradient middle, background glow",
    "--brand-magenta": "Gradient end",
    "--brand-gold": "Status: waitlist, highlights",
    "--accent": "Hover and selected surfaces"
  }
}
```

## Typography

```json design:type
[
  { "name": "Display", "family": "Inter", "weight": 600, "size": "36–96 px", "case": "none", "tracking": "-0.05em", "sample": "Purpose-built silicon for the intelligent edge", "use": "Landing heading, CTA heading" },
  { "name": "Heading", "family": "Inter", "weight": 600, "size": "36–72 px", "case": "none", "tracking": "-0.05em", "sample": "From concept to silicon under one roof", "use": "Section headings" },
  { "name": "Card title", "family": "Inter", "weight": 600, "size": "18–36 px", "case": "none", "tracking": "-0.05em", "sample": "Nerva N1", "use": "Product cards, list titles, names" },
  { "name": "Body", "family": "Satoshi", "weight": 400, "size": "14–20 px", "case": "none", "tracking": "0", "sample": "Low-power chips for edge AI, power, radar sensing and security, plus custom silicon for products that have outgrown off-the-shelf parts.", "use": "Paragraphs, sub-headings (70% foreground)" },
  { "name": "Eyebrow", "family": "IBM Plex Mono", "weight": 500, "size": "11–12 px", "case": "uppercase", "tracking": "0.14em", "sample": "Fabless semiconductor design house", "use": "Sur-headings, roles, badges" }
]
```

## Spacing, radius and shadow

```json design:scale
{
  "Spacing": { "1": "4px", "2": "8px", "3": "12px", "4": "16px", "6": "24px", "8": "32px", "12": "48px", "18": "72px" },
  "Radius": { "radius": "8px", "card": "16px", "pill": "999px" },
  "Layout": { "content": "1120px", "text": "640px", "section padding": "72px / 48px on phones" }
}
```

## Graphics

- Sections sit on the plain background; "void" sections fade to darker at the bottom (`website-void`)
- Cards are 24 px-radius panels with a thin border; product cards carry a photo or a cyan/violet mesh behind a dark scrim, and glow cyan on hover
- Section numbering in mono type (`ST/01`, `01 ·`) and small glowing cyan dots before badges
- The brand wordmark uses the cyan → violet → magenta gradient as text fill; nothing else does
- Portraits and product photos are slightly desaturated and come to full colour on hover
- A marquee of large phrases under the landing heading, alternating solid and outlined text, separated by a cyan ✦
- Icons are thin line icons in the text colour or cyan; no illustrations

## UI elements

The shared building blocks of the Astro components, drawn with the webAgen tokens. Use the theme toggle to switch between dark and light.

<!-- kit: website-kit -->
