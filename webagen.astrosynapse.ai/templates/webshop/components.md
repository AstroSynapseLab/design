# Webshop UI components

## Webshop Components

- Webshop Announcement Section
- Webshop Header Section
- Webshop Search Suggest Section
- Webshop Mobile Menu Section
- Webshop Footer Section
- Webshop Hero Section
- Webshop Hero Campaign Section
- Webshop Hero Slider Section
- Webshop Hero Product Section
- Webshop Chapter Nav Section
- Webshop Category Tiles Section
- Webshop Split Tiles Section
- Webshop Size Section
- Webshop Product Grid Section
- Webshop Product Card Section
- Webshop Quick View Section
- Webshop Recently Viewed Section
- Webshop Category Section
- Webshop Empty Results Section
- Webshop Compare Section
- Webshop Product Section
- Webshop Bundle Section
- Webshop Cross-sell Section
- Webshop Reviews Section
- Webshop Sticky Add-to-bag Section
- Webshop Editorial Section
- Webshop Edit Section
- Webshop Journal Section
- Webshop UGC Section
- Webshop Chapter Section
- Webshop Specs Section
- Webshop FAQ Section
- Webshop Final CTA Section
- Webshop Press Section
- Webshop Brand Strip Section
- Webshop Trust Section
- Webshop Cart Section
- Webshop Checkout Section
- Webshop Order Confirmation Section
- Webshop Toast Section
- Webshop Stream Section

### Shared rules

**Ruleset:**

- Every block sends full props: the frontend has no product data of its own, so titles, prices, images and ratings all come from you
- Use only STORE INFO for products, prices, sizes, ratings, reviews and quotes; never invent a product, price or review
- Use only CART INFO for bag contents and totals, SESSION INFO for recently viewed and compared products, and ORDER INFO for a placed order; the frontend sends these with the query, and you never invent or change them
- Prices are numbers in EUR without a currency sign, for example `139` or `24.9`
- Inside text, write amounts the way the store shows them: `€75`, `€4,90`
- Send `compare-at` only when the product is on sale, and only when it is higher than `price`
- Images are Unsplash photo ids from STORE INFO (for example `photo-1542291026-7eec264c27ff`) or full `https://` URLs
- `badges` only take these values: `new`, `bestseller`, `sale`, `low-stock`, `sold-out`
- `rating.avg` is a number from 0 to 5 with one decimal, `rating.count` is the number of reviews
- `swatches` are hex colours, one per colour the product comes in
- `data-prompt` is the follow-up query the element sends when clicked; write it as a short user request
- Product `data-prompt` is always `Show product <title>`
- Category and subcategory `data-prompt` is always `Show category <category>`
- `anchor` scrolls to another section on the same page; it is that section's `section_id` and sends no query
- Add to bag, quantity, remove, wishlist hearts, compare checkboxes, sort and filter controls, forms and Pay buttons are frontend actions: send no `data-prompt` for them
- Frame components (announcement, header, mobile menu, footer) are sent once per session with the first response; never send them in reply to a later query
- Homepage order: Hero → Product Grid → Size → Editorial → Press → Trust; add or drop sections only when the user's query asks for it

### Webshop Announcement Section
- Every link and button sends either `href` (navigates) or `data-prompt` (sends a new message; the answer is added below the page)
- Add `"clear": true` next to a `data-prompt` when the answer should start a new page; the current page moves to history
- A non-empty `data-prompt` wins over `href`; send `clear` only as `true`, and only with a non-empty `data-prompt`

**Ruleset:**

- Frame component: send it once per session in the first response, as the first component, above `webshop-header-section`
- Never send it in reply to a later query
- Build the text only from STORE INFO shipping, returns and VAT facts
- Keep the text between min 4 - max 14 words, with min 1 - max 3 promises separated by ` · `
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON:**

```jsx
{
  "section_id": "section-s1",
  "components": [
    {
      "category": "announcement-section",
      "name": "webshop-announcement-section",
      "unique": true,
      "props": {
        "text": "Free shipping over €75 · 30-day free returns · VAT included"
      }
    }
  ]
}
```

### Webshop Header Section

**Ruleset:**

- Frame component: send it once per session in the first response, after `webshop-announcement-section` and before the first section
- Never send it in reply to a later query; the frontend keeps it sticky on every page
- Keep the logo as the store name from STORE INFO
- Keep the nav between min 3 - max 7 items, in STORE INFO order
- Keep the nav label between min 1 - max 2 words
- Send `children` only for nav items that have subcategories in STORE INFO, min 2 - max 6 items; the frontend adds an `All <label>` link and opens them as a mega menu on hover
- Keep the children label between min 1 - max 2 words
- Send `promo` only on nav items with children: one subcategory with its STORE INFO image, label min 1 - max 2 words
- Search, store switcher, theme toggle, wishlist and bag icons are static; the frontend handles them
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy
- Send `"clear": true` on the nav links: a category starts a new page

**JSON:**

```jsx
{
  "section_id": "section-s2",
  "components": [
    {
      "category": "header-section",
      "name": "webshop-header-section",
      "unique": true,
      "props": {
        "logo": "Stride",
        "nav": [
          {
            "label": "Running",
            "data-prompt": "Show category Running",
            "clear": true,
            "children": [
              { "label": "Road", "data-prompt": "Show category Road", "clear": true },
              { "label": "Trail", "data-prompt": "Show category Trail", "clear": true },
              { "label": "Track", "data-prompt": "Show category Track", "clear": true }
            ],
            "promo": { "label": "Trail", "image": "photo-1718248028293-934f04a578db", "data-prompt": "Show category Trail" }
          },
          { "label": "Training", "data-prompt": "Show category Training", "clear": true },
          { "label": "Football", "data-prompt": "Show category Football", "clear": true },
          { "label": "Outdoor", "data-prompt": "Show category Outdoor", "clear": true },
          { "label": "Fan gear", "data-prompt": "Show category Fan gear", "clear": true },
          { "label": "Sale", "data-prompt": "Show category Sale", "clear": true }
        ]
      }
    }
  ]
}
```

### Webshop Search Suggest Section

**Ruleset:**

- Use when the user's message is a short, partial or misspelled product search of min 1 - max 3 words, for example `runing`; for a full search sentence send `webshop-product-grid-section` instead
- Send it alone; the frontend shows it as a dropdown under the search field
- Match only STORE INFO titles, subtitles, category names and colour names; correct the spelling silently
- Keep the query as the user's text, unchanged
- Keep the categories between min 0 - max 3 items, label as the category name
- Keep the products between min 0 - max 5 items, best match first, subtitle min 2 - max 6 words
- Send empty `categories` and `products` when nothing matches; the frontend shows a "No matches" line
- Keep the data-prompt as `Search <corrected query>`; it is sent by the "All results" link and by Enter

**JSON:**

```jsx
{
  "section_id": "section-s3",
  "components": [
    {
      "category": "search-section",
      "name": "webshop-search-suggest-section",
      "props": {
        "query": "runing",
        "data-prompt": "Search running",
        "categories": [
          { "label": "Running", "data-prompt": "Show category Running" }
        ],
        "products": [
          { "title": "Aero Run 2", "subtitle": "Neutral road running shoe", "price": 139, "image": "photo-1542291026-7eec264c27ff", "data-prompt": "Show product Aero Run 2" },
          { "title": "Aero Stable", "subtitle": "Supportive road shoe for overpronators", "price": 149, "image": "photo-1571008887538-b36bb32f4571", "data-prompt": "Show product Aero Stable" },
          { "title": "Trail Max GTX", "subtitle": "Waterproof trail running shoe", "price": 179, "image": "photo-1617179395455-101d786b4b7d", "data-prompt": "Show product Trail Max GTX" },
          { "title": "Merino run sock 3-pack", "subtitle": "Cushioned ankle sock", "price": 29, "image": "photo-1773665230184-5fd8cb4fc928", "data-prompt": "Show product Merino run sock 3-pack" }
        ]
      }
    }
  ]
}
```

### Webshop Mobile Menu Section

**Ruleset:**

- Frame component: send it once per session in the first response, right after `webshop-header-section`; the frontend opens it from the menu button on phones
- Never send it in reply to a later query
- Keep the nav identical to the `webshop-header-section` nav: same labels, order and data-prompts, max 7 items
- Send `children` exactly as in `webshop-header-section`; the frontend lists them under their parent
- Send no `promo`; the wishlist link and store switcher are static

**JSON:**

```jsx
{
  "section_id": "section-s4",
  "components": [
    {
      "category": "menu-section",
      "name": "webshop-mobile-menu-section",
      "props": {
        "nav": [
          {
            "label": "Running",
            "data-prompt": "Show category Running",
            "children": [
              { "label": "Road", "data-prompt": "Show category Road" },
              { "label": "Trail", "data-prompt": "Show category Trail" },
              { "label": "Track", "data-prompt": "Show category Track" }
            ]
          },
          { "label": "Training", "data-prompt": "Show category Training" },
          { "label": "Football", "data-prompt": "Show category Football" },
          { "label": "Outdoor", "data-prompt": "Show category Outdoor" },
          { "label": "Fan gear", "data-prompt": "Show category Fan gear" },
          { "label": "Sale", "data-prompt": "Show category Sale" }
        ]
      }
    }
  ]
}
```

### Webshop Footer Section

**Ruleset:**

- Frame component: send it once per session in the first response, as the last component; the frontend keeps it at the bottom of every page
- Never send it in reply to a later query
- Keep the logo as the store name and the tagline as the STORE INFO tagline, min 6 - max 16 words
- Keep the newsletter label between min 3 - max 7 words and the newsletter hint between min 6 - max 14 words; the email field and Join button are static
- Keep the columns to exactly 3 items, titled `Shop`, `Help` and `Company`, each with min 2 - max 6 links
- Keep the Shop links as the first min 3 - max 5 `webshop-header-section` nav items, with the same data-prompts
- Keep the Help and Company link labels between min 1 - max 3 words; the data-prompt asks for that page, for example `Show shipping and returns`
- Keep the payments as the STORE INFO payment names in capitals, min 3 - max 8 items
- Keep the legal as `© <year> <store> d.o.o. · <city> · <note>`, min 5 - max 14 words
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON:**

```jsx
{
  "section_id": "section-s5",
  "components": [
    {
      "category": "footer-section",
      "name": "webshop-footer-section",
      "unique": true,
      "props": {
        "logo": "Stride",
        "tagline": "Footwear and sport gear, shipped from Zagreb to the whole EU.",
        "newsletter": { "label": "Get 10% off your first order", "hint": "One email a week at most. Unsubscribe any time." },
        "columns": [
          {
            "title": "Shop",
            "links": [
              { "label": "Running", "data-prompt": "Show category Running" },
              { "label": "Training", "data-prompt": "Show category Training" },
              { "label": "Football", "data-prompt": "Show category Football" },
              { "label": "Outdoor", "data-prompt": "Show category Outdoor" },
              { "label": "Fan gear", "data-prompt": "Show category Fan gear" }
            ]
          },
          {
            "title": "Help",
            "links": [
              { "label": "Shipping & returns", "data-prompt": "Show shipping and returns" },
              { "label": "Size guide", "data-prompt": "Show the size guide" },
              { "label": "Track order", "data-prompt": "How do I track my order?" },
              { "label": "Contact", "data-prompt": "How can I contact you?" }
            ]
          },
          {
            "title": "Company",
            "links": [
              { "label": "About", "data-prompt": "Tell me about Stride" },
              { "label": "Sustainability", "data-prompt": "What do you do for sustainability?" },
              { "label": "Press", "data-prompt": "What does the press say about you?" }
            ]
          }
        ],
        "payments": ["VISA", "MASTERCARD", "APPLE PAY", "GOOGLE PAY", "PAYPAL", "KLARNA", "SEPA"],
        "legal": "© 2026 Stride d.o.o. · Zagreb · Prototype, no real orders"
      }
    }
  ]
}
```

### Webshop Hero Section

**Ruleset:**

- Use when the page (components array) is empty, or when the user asks for the homepage; always place it first, after the frame components on the first response
- Follow it with the homepage order from Shared rules: Product Grid → Size → Editorial → Press → Trust
- Never send it together with `webshop-hero-campaign-section`, `webshop-hero-slider-section` or `webshop-hero-product-section`
- The hero and the category tiles are one block: always send them together
- Keep the eyebrow between min 1 - max 3 words
- Keep the title between min 3 - max 7 words
- Keep the text between min 8 - max 20 words
- Keep the image as one landscape photo id from STORE INFO
- Keep the cta label between min 1 - max 3 words
- Keep the cta data-prompt as `Show category <category>` or `Show product <title>`
- Keep the tiles between min 2 - max 6 items, one per top-level category
- Keep the tiles label to the category name, min 1 - max 2 words
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON:**

```jsx
{
  "section_id": "section-s6",
  "components": [
    {
      "category": "hero-section",
      "name": "webshop-hero-section",
      "unique": true,
      "props": {
        "eyebrow": "Trail season",
        "title": "Built for the long way round",
        "text": "Waterproof trail shoes, merino socks and gaiters, in stock and shipping today.",
        "image": "photo-1718248028293-934f04a578db",
        "cta": { "label": "Shop trail", "data-prompt": "Show category Trail" },
        "tiles": [
          { "label": "Running", "image": "photo-1590333748338-d629e4564ad9", "data-prompt": "Show category Running" },
          { "label": "Training", "image": "photo-1517836357463-d25dfeac3438", "data-prompt": "Show category Training" },
          { "label": "Football", "image": "photo-1689785280879-98b0fb52084d", "data-prompt": "Show category Football" },
          { "label": "Outdoor", "image": "photo-1600100315778-850119b19220", "data-prompt": "Show category Outdoor" }
        ]
      }
    }
  ]
}
```

### Webshop Hero Campaign Section

**Ruleset:**

- Use as the first section of a campaign or seasonal homepage, or when the user asks to shop a look, for example `What do I wear for a wet trail run?`
- Never send it together with another hero; it can be followed by `webshop-edit-section` or `webshop-product-grid-section`
- Keep the eyebrow between min 1 - max 4 words
- Keep the title between min 3 - max 7 words
- Keep the text between min 8 - max 20 words
- Keep the image as one landscape photo id from STORE INFO that shows the tagged products
- Keep the cta label between min 1 - max 4 words and the cta data-prompt as `Show category <category>`
- Keep the hotspots between min 2 - max 4 items, one per STORE INFO product visible in the image
- Keep the hotspot `x` and `y` as whole numbers from 5 to 95: the dot's position in percent from the image's left and top edge
- Each hotspot opens a small card with the product's title, price and image; keep its data-prompt as `Show product <title>`
- The "Tap a dot" hint is static

**JSON:**

```jsx
{
  "section_id": "section-s7",
  "components": [
    {
      "category": "hero-section",
      "name": "webshop-hero-campaign-section",
      "props": {
        "eyebrow": "Wet weather kit",
        "title": "Rain is just more trail",
        "text": "A waterproof shoe, a gaiter that keeps the grit out and a cap that packs away.",
        "image": "photo-1718248028293-934f04a578db",
        "cta": { "label": "Shop the kit", "data-prompt": "Show category Trail" },
        "hotspots": [
          { "x": 34, "y": 72, "title": "Trail Max GTX", "price": 179, "image": "photo-1617179395455-101d786b4b7d", "data-prompt": "Show product Trail Max GTX" },
          { "x": 46, "y": 58, "title": "Trail gaiter", "price": 29, "image": "photo-1655976795374-6b519928f1e1", "data-prompt": "Show product Trail gaiter" },
          { "x": 62, "y": 22, "title": "Run cap", "price": 25, "image": "photo-1758922769578-68c5ba000d87", "data-prompt": "Show product Run cap" }
        ]
      }
    }
  ]
}
```

### Webshop Hero Slider Section

**Ruleset:**

- Use as the first section when the store has two or three equal promotions, or when the user asks what's new or on offer
- Never send it together with another hero
- Slides never auto-advance; the frontend adds arrows, dots and swipe
- Keep the slides between min 2 - max 3 items, the most important first
- Keep the slide eyebrow between min 1 - max 2 words
- Keep the slide title between min 3 - max 6 words
- Keep the slide text between min 5 - max 12 words
- Keep the slide image as one landscape photo id from STORE INFO
- Keep the slide cta label between min 2 - max 4 words and its data-prompt as `Show product <title>` or `Show category <category>`
- Keep the tiles to exactly 4 items, label as the category name, min 1 - max 2 words

**JSON:**

```jsx
{
  "section_id": "section-s8",
  "components": [
    {
      "category": "hero-section",
      "name": "webshop-hero-slider-section",
      "props": {
        "slides": [
          {
            "eyebrow": "Trail season",
            "title": "Built for the long way",
            "text": "Waterproof shoes, merino socks and gaiters, shipping today.",
            "image": "photo-1718248028293-934f04a578db",
            "cta": { "label": "Shop trail shoes", "data-prompt": "Show category Trail" }
          },
          {
            "eyebrow": "Price drop",
            "title": "Strike FG, now €119",
            "text": "Our firm-ground boot, down from €149 while stock lasts.",
            "image": "photo-1529900748604-07564a03e7a6",
            "cta": { "label": "Shop Strike FG", "data-prompt": "Show product Strike FG" }
          },
          {
            "eyebrow": "New",
            "title": "One shoe for the gym",
            "text": "Flux Trainer: flat, stable and grippy for lifts and circuits.",
            "image": "photo-1606107557195-0e29a4b5b4aa",
            "cta": { "label": "See Flux Trainer", "data-prompt": "Show product Flux Trainer" }
          }
        ],
        "tiles": [
          { "label": "Running", "image": "photo-1590333748338-d629e4564ad9", "data-prompt": "Show category Running" },
          { "label": "Training", "image": "photo-1517836357463-d25dfeac3438", "data-prompt": "Show category Training" },
          { "label": "Football", "image": "photo-1689785280879-98b0fb52084d", "data-prompt": "Show category Football" },
          { "label": "Sale", "image": "photo-1542291026-7eec264c27ff", "data-prompt": "Show category Sale" }
        ]
      }
    }
  ]
}
```

### Webshop Hero Product Section

**Ruleset:**

- Use when the user wants everything about one flagship product on a single long page, for example `Tell me everything about the Trail Max GTX`; for a normal product page send `webshop-product-section` instead
- Send `webshop-chapter-nav-section` before it; after it send any of `webshop-chapter-section`, `webshop-specs-section`, `webshop-reviews-section`, `webshop-faq-section`, `webshop-final-cta-section` and `webshop-sticky-add-to-bag-section`, in that order
- Keep the eyebrow as the product name, min 1 - max 3 words
- Keep the title as a promise, not the product name, min 2 - max 6 words
- Keep the text between min 10 - max 25 words
- Keep the images between min 2 - max 5 items; the first one is the main image
- Keep the colors between min 1 - max 6 items, each with a label and a hex value
- Keep the sizes as every size the product comes in; send `available: false` for sizes out of stock
- Keep the key-specs between min 3 - max 5 items; each is a `[label, value]` pair, label min 1 - max 2 words, value min 1 - max 5 words
- The stock line, quantity, Add to bag, express pay buttons and the delivery, returns and VAT strip are static; the frontend builds them from STORE INFO

**JSON:**

```jsx
{
  "section_id": "section-s9",
  "components": [
    {
      "category": "hero-section",
      "name": "webshop-hero-product-section",
      "props": {
        "eyebrow": "Trail Max GTX",
        "title": "Dry feet. Any trail.",
        "text": "A waterproof membrane, 5 mm lugs and a rock plate, for runs that don't stay on the path.",
        "product": "Trail Max GTX",
        "price": 179,
        "badges": ["bestseller"],
        "rating": { "avg": 4.6, "count": 97 },
        "images": ["photo-1617179395455-101d786b4b7d", "photo-1718248028293-934f04a578db", "photo-1530143311094-34d807799e8f"],
        "colors": [
          { "label": "Ember / Black", "hex": "#f26a21" },
          { "label": "Olive", "hex": "#5e6b3f" }
        ],
        "sizes": [
          { "label": "39", "available": true },
          { "label": "40", "available": true },
          { "label": "41", "available": false },
          { "label": "42", "available": true },
          { "label": "43", "available": true },
          { "label": "44", "available": true },
          { "label": "45", "available": true },
          { "label": "46", "available": true }
        ],
        "key-specs": [["Weight", "318 g (EU 42)"], ["Drop", "6 mm"], ["Lugs", "5 mm, sticky rubber"], ["Upper", "Waterproof ripstop mesh"]]
      }
    }
  ]
}
```

### Webshop Chapter Nav Section

**Ruleset:**

- Use only on a long product page, as the first section, right before `webshop-hero-product-section`
- Keep the links between min 3 - max 7 items, one per section below it, in page order
- Keep the link label between min 1 - max 2 words, matching the eyebrow of the section it points to
- Keep the link `anchor` as the target section's `section_id`
- Keep the product as the product name and the price as its current price; the frontend shows a `Buy · €<price>` button that scrolls to the buy box
- The frontend keeps it sticky and highlights the section in view

**JSON:**

```jsx
{
  "section_id": "section-s10",
  "components": [
    {
      "category": "navigation-section",
      "name": "webshop-chapter-nav-section",
      "props": {
        "product": "Trail Max GTX",
        "price": 179,
        "buy-anchor": "section-s9",
        "links": [
          { "label": "Grip", "anchor": "section-s30" },
          { "label": "Compared", "anchor": "section-s31" },
          { "label": "Specs", "anchor": "section-s32" },
          { "label": "Reviews", "anchor": "section-s24" },
          { "label": "Questions", "anchor": "section-s33" }
        ]
      }
    }
  ]
}
```

### Webshop Category Tiles Section

**Ruleset:**

- Use when the user asks what the store sells or to see all categories, or on a homepage whose hero has no tiles (`webshop-hero-campaign-section`, `webshop-hero-product-section`)
- Never send it right after `webshop-hero-section` or `webshop-hero-slider-section`; they already show tiles
- Use `variant` `4-up` for large square tiles of the main categories and `8-up` for a dense grid of every department; default is `4-up`
- Keep the title between min 2 - max 4 words, optional
- Keep the tiles to exactly 4 items for `4-up` and min 5 - max 8 items for `8-up`, in STORE INFO order
- Keep the tiles label to the category name, min 1 - max 2 words
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON Variant 1:**

```jsx
{
  "section_id": "section-s11",
  "components": [
    {
      "category": "tiles-section",
      "name": "webshop-category-tiles-section",
      "unique": true,
      "props": {
        "variant": "4-up",
        "tiles": [
          { "label": "Running", "image": "photo-1590333748338-d629e4564ad9", "data-prompt": "Show category Running" },
          { "label": "Training", "image": "photo-1517836357463-d25dfeac3438", "data-prompt": "Show category Training" },
          { "label": "Football", "image": "photo-1689785280879-98b0fb52084d", "data-prompt": "Show category Football" },
          { "label": "Outdoor", "image": "photo-1600100315778-850119b19220", "data-prompt": "Show category Outdoor" }
        ]
      }
    }
  ]
}
```

**JSON Variant 2:**

```jsx
{
  "section_id": "section-s12",
  "components": [
    {
      "category": "tiles-section",
      "name": "webshop-category-tiles-section",
      "unique": true,
      "props": {
        "variant": "8-up",
        "title": "Shop by category",
        "tiles": [
          { "label": "Running", "image": "photo-1590333748338-d629e4564ad9", "data-prompt": "Show category Running" },
          { "label": "Training", "image": "photo-1517836357463-d25dfeac3438", "data-prompt": "Show category Training" },
          { "label": "Football", "image": "photo-1689785280879-98b0fb52084d", "data-prompt": "Show category Football" },
          { "label": "Outdoor", "image": "photo-1600100315778-850119b19220", "data-prompt": "Show category Outdoor" },
          { "label": "Lifestyle", "image": "photo-1629892679977-4a60230d1aab", "data-prompt": "Show category Lifestyle" },
          { "label": "Fan gear", "image": "photo-1585925452553-03549ee41dc9", "data-prompt": "Show category Fan gear" },
          { "label": "Socks", "image": "photo-1773665230184-5fd8cb4fc928", "data-prompt": "Show category Socks" },
          { "label": "Accessories", "image": "photo-1758922769578-68c5ba000d87", "data-prompt": "Show category Accessories" }
        ]
      }
    }
  ]
}
```

### Webshop Split Tiles Section

**Ruleset:**

- Use when the user is choosing between two equal branches of the store, for example `Road or trail shoes?`, or on a homepage whose store has two main halves
- Send it after a hero, never as the first section; it can be followed by `webshop-product-grid-section` for either branch
- Keep the tiles to exactly 2 items, one per STORE INFO category
- Keep the tiles label to the category name, min 1 - max 2 words
- Keep the tiles image as a portrait photo id from STORE INFO
- The `Shop <label>` button text is static

**JSON:**

```jsx
{
  "section_id": "section-s13",
  "components": [
    {
      "category": "tiles-section",
      "name": "webshop-split-tiles-section",
      "props": {
        "tiles": [
          { "label": "Road", "image": "photo-1590333748338-d629e4564ad9", "data-prompt": "Show category Road" },
          { "label": "Trail", "image": "photo-1718248028293-934f04a578db", "data-prompt": "Show category Trail" }
        ]
      }
    }
  ]
}
```

### Webshop Size Section

**Ruleset:**

- Use on the homepage after the first `webshop-product-grid-section`, or on its own when the user asks about sizes or fit
- Each size button sends `Show what's in stock in EU <size>`; the sizes need no data-prompt
- Keep the title between min 2 - max 4 words
- Keep the text between min 5 - max 12 words, optional
- Keep the sizes between min 4 - max 10 items, EU sizes as strings, in ascending order

**JSON:**

```jsx
{
  "section_id": "section-s14",
  "components": [
    {
      "category": "size-section",
      "name": "webshop-size-section",
      "props": {
        "title": "Shop by size",
        "text": "Only shows what's in stock in your size.",
        "sizes": ["39", "40", "41", "42", "43", "44", "45", "46"]
      }
    }
  ]
}
```

### Webshop Product Grid Section

**Ruleset:**

- Use to show a curated set of products: best sellers, new arrivals, sale items, search results or recommendations
- On the homepage send it right after the hero; after `webshop-product-section` send it as a `rail` of related products; on its own for search results
- Use `variant` `grid` for a main list, `rail` for a secondary, horizontally scrolling list and `grid-large` for a few products with big photos; default is `grid`
- Keep the title between min 1 - max 4 words
- Keep the text between min 5 - max 15 words, optional
- Keep the action-label between min 1 - max 3 words, optional
- Send `data-prompt` together with `action-label`: it is the query the action button sends
- Keep the products between min 4 - max 8 items for `grid`, min 4 - max 6 items for `rail` and min 2 - max 4 items for `grid-large`
- Keep the products subtitle between min 2 - max 6 words
- Send `hover-image` only when STORE INFO has a second photo of the product; the frontend shows it on hover
- Wishlist hearts and Quick view buttons are static; Quick view sends `Quick view <title>`

**JSON Variant 1:**

```jsx
{
  "section_id": "section-s15",
  "components": [
    {
      "category": "product-grid-section",
      "name": "webshop-product-grid-section",
      "props": {
        "title": "Best sellers",
        "action-label": "View all",
        "data-prompt": "Show all best sellers",
        "variant": "grid",
        "products": [
          {
            "title": "Aero Run 2",
            "subtitle": "Neutral road running shoe",
            "price": 139,
            "compare-at": 169,
            "image": "photo-1542291026-7eec264c27ff",
            "hover-image": "photo-1597892657493-6847b9640bac",
            "badges": ["sale", "bestseller"],
            "rating": { "avg": 4.7, "count": 183 },
            "swatches": ["#d6341f", "#f1efe9", "#7c7f86"],
            "data-prompt": "Show product Aero Run 2"
          },
          {
            "title": "Trail Max GTX",
            "subtitle": "Waterproof trail running shoe",
            "price": 179,
            "image": "photo-1617179395455-101d786b4b7d",
            "hover-image": "photo-1718248028293-934f04a578db",
            "badges": ["bestseller"],
            "rating": { "avg": 4.6, "count": 97 },
            "swatches": ["#f26a21", "#5e6b3f"],
            "data-prompt": "Show product Trail Max GTX"
          },
          {
            "title": "Ridge Mid",
            "subtitle": "Leather hiking boot",
            "price": 189,
            "image": "photo-1575987116913-e96e7d490b8a",
            "hover-image": "photo-1600100315778-850119b19220",
            "badges": ["bestseller"],
            "rating": { "avg": 4.7, "count": 201 },
            "swatches": ["#7a4b25", "#1b1b1b"],
            "data-prompt": "Show product Ridge Mid"
          },
          {
            "title": "Merino run sock 3-pack",
            "subtitle": "Cushioned ankle sock",
            "price": 29,
            "image": "photo-1773665230184-5fd8cb4fc928",
            "hover-image": "photo-1631024724206-6ccc65ab31bd",
            "badges": ["bestseller"],
            "rating": { "avg": 4.8, "count": 530 },
            "swatches": [],
            "data-prompt": "Show product Merino run sock 3-pack"
          }
        ]
      }
    }
  ]
}
```

**JSON Variant 2:**

```jsx
{
  "section_id": "section-s16",
  "components": [
    {
      "category": "product-grid-section",
      "name": "webshop-product-grid-section",
      "props": {
        "title": "New in",
        "action-label": "See all new",
        "data-prompt": "Show new arrivals",
        "variant": "rail",
        "products": [
          {
            "title": "Aero Stable",
            "subtitle": "Supportive road shoe for overpronators",
            "price": 149,
            "image": "photo-1571008887538-b36bb32f4571",
            "hover-image": "photo-1590333748338-d629e4564ad9",
            "badges": ["new"],
            "rating": { "avg": 4.5, "count": 64 },
            "swatches": ["#2f54c9", "#1b1b1b"],
            "data-prompt": "Show product Aero Stable"
          },
          {
            "title": "City Knit",
            "subtitle": "Knit lifestyle sneaker",
            "price": 89,
            "image": "photo-1562183241-b937e95585b6",
            "hover-image": "photo-1590333748338-d629e4564ad9",
            "badges": ["new"],
            "rating": { "avg": 4.4, "count": 29 },
            "swatches": ["#8a8c91", "#d6341f"],
            "data-prompt": "Show product City Knit"
          },
          {
            "title": "Flux Trainer",
            "subtitle": "Cross-training shoe",
            "price": 119,
            "image": "photo-1606107557195-0e29a4b5b4aa",
            "hover-image": "photo-1517836357463-d25dfeac3438",
            "badges": ["new"],
            "rating": { "avg": 4.4, "count": 38 },
            "swatches": ["#1b1b1b", "#8a8c91"],
            "data-prompt": "Show product Flux Trainer"
          },
          {
            "title": "Club home jersey 26/27",
            "subtitle": "Red and white stripes",
            "price": 79,
            "image": "photo-1616124619460-ff4ed8f4683c",
            "hover-image": "photo-1585925452553-03549ee41dc9",
            "badges": ["new"],
            "rating": { "avg": 4.7, "count": 312 },
            "swatches": [],
            "data-prompt": "Show product Club home jersey 26/27"
          }
        ]
      }
    }
  ]
}
```

**JSON Variant 3:**

```jsx
{
  "section_id": "section-s17",
  "components": [
    {
      "category": "product-grid-section",
      "name": "webshop-product-grid-section",
      "props": {
        "title": "Made for mountains",
        "text": "Two pairs that stay dry when the weather turns.",
        "variant": "grid-large",
        "products": [
          {
            "title": "Ridge Mid",
            "subtitle": "Leather hiking boot",
            "price": 189,
            "image": "photo-1575987116913-e96e7d490b8a",
            "hover-image": "photo-1600100315778-850119b19220",
            "badges": ["bestseller"],
            "rating": { "avg": 4.7, "count": 201 },
            "swatches": ["#7a4b25", "#1b1b1b"],
            "data-prompt": "Show product Ridge Mid"
          },
          {
            "title": "Trail Max GTX",
            "subtitle": "Waterproof trail running shoe",
            "price": 179,
            "image": "photo-1617179395455-101d786b4b7d",
            "hover-image": "photo-1718248028293-934f04a578db",
            "badges": ["bestseller"],
            "rating": { "avg": 4.6, "count": 97 },
            "swatches": ["#f26a21", "#5e6b3f"],
            "data-prompt": "Show product Trail Max GTX"
          }
        ]
      }
    }
  ]
}
```

### Webshop Product Card Section

**Ruleset:**

- Use for a quick answer about one product, for example `How much is the Strike FG?` or `What colours does the Aero Run 2 come in?`; send `webshop-product-section` instead when the user wants the full page
- Send it alone, or before a `webshop-product-grid-section` `rail` of alternatives
- The card uses the same product fields as every grid, rail and category; they follow the Shared rules
- Keep the subtitle between min 2 - max 6 words
- Keep `badges` as the STORE INFO state: the frontend shows `sale` as the discount percentage, and `low-stock` and `sold-out` over the photo

**JSON:**

```jsx
{
  "section_id": "section-s18",
  "components": [
    {
      "category": "product-card-section",
      "name": "webshop-product-card-section",
      "props": {
        "title": "Strike FG",
        "subtitle": "Firm-ground football boot",
        "price": 119,
        "compare-at": 149,
        "image": "photo-1529900748604-07564a03e7a6",
        "hover-image": "photo-1620650663852-9ff13eb84d8f",
        "badges": ["sale"],
        "rating": { "avg": 4.5, "count": 156 },
        "swatches": ["#f26a21", "#2f54c9", "#f3f3f1"],
        "data-prompt": "Show product Strike FG"
      }
    }
  ]
}
```

### Webshop Quick View Section

**Ruleset:**

- Use when the user asks for a quick look at one product from a listing, for example `Quick view Aero Run 2`; the frontend opens it as a modal over the current page
- Send it alone; never together with `webshop-product-section` for the same product
- Keep the eyebrow as the product subtitle, min 2 - max 6 words
- Keep the title as the product name
- Keep the summary between min 8 - max 20 words
- Keep the colors between min 0 - max 6 items, each with a label and a hex value
- Keep the sizes as every size the product comes in; send `available: false` for sizes out of stock
- The option pickers and Add to bag are static; the "Full details" link sends `Show product <title>`

**JSON:**

```jsx
{
  "section_id": "section-s19",
  "components": [
    {
      "category": "modal-section",
      "name": "webshop-quick-view-section",
      "props": {
        "eyebrow": "Neutral road running shoe",
        "title": "Aero Run 2",
        "price": 139,
        "compare-at": 169,
        "rating": { "avg": 4.7, "count": 183 },
        "image": "photo-1542291026-7eec264c27ff",
        "summary": "A light daily trainer with a roomy toe box and an 8 mm drop.",
        "colors": [
          { "label": "Signal Red / White", "hex": "#d6341f" },
          { "label": "White / Orange", "hex": "#f1efe9" },
          { "label": "Storm Grey", "hex": "#7c7f86" }
        ],
        "sizes": [
          { "label": "41", "available": true },
          { "label": "42", "available": true },
          { "label": "43", "available": false },
          { "label": "44", "available": true },
          { "label": "45", "available": true }
        ],
        "data-prompt": "Show product Aero Run 2"
      }
    }
  ]
}
```

### Webshop Recently Viewed Section

**Ruleset:**

- Use only with the products SESSION INFO lists as recently viewed; send nothing when it lists none
- Send it as the last section of the homepage, after `webshop-trust-section`, or on its own when the user asks what they looked at
- Never include the product the current page is about
- Keep the title as `Recently viewed`
- Keep the products between min 1 - max 4 items, most recent first, with the same fields as `webshop-product-grid-section`

**JSON:**

```jsx
{
  "section_id": "section-s20",
  "components": [
    {
      "category": "product-grid-section",
      "name": "webshop-recently-viewed-section",
      "props": {
        "title": "Recently viewed",
        "products": [
          {
            "title": "Trail Max GTX",
            "subtitle": "Waterproof trail running shoe",
            "price": 179,
            "image": "photo-1617179395455-101d786b4b7d",
            "badges": ["bestseller"],
            "rating": { "avg": 4.6, "count": 97 },
            "swatches": ["#f26a21", "#5e6b3f"],
            "data-prompt": "Show product Trail Max GTX"
          },
          {
            "title": "Ridge Mid",
            "subtitle": "Leather hiking boot",
            "price": 189,
            "image": "photo-1575987116913-e96e7d490b8a",
            "badges": ["bestseller"],
            "rating": { "avg": 4.7, "count": 201 },
            "swatches": ["#7a4b25", "#1b1b1b"],
            "data-prompt": "Show product Ridge Mid"
          },
          {
            "title": "Aero Stable",
            "subtitle": "Supportive road shoe for overpronators",
            "price": 149,
            "image": "photo-1571008887538-b36bb32f4571",
            "badges": ["new"],
            "rating": { "avg": 4.5, "count": 64 },
            "swatches": ["#2f54c9", "#1b1b1b"],
            "data-prompt": "Show product Aero Stable"
          }
        ]
      }
    }
  ]
}
```

### Webshop Category Section

**Ruleset:**

- Use when the user asks for a category, a subcategory, or a filtered or sorted list of products
- Send it alone: a category page is one block; send `webshop-empty-results-section` instead when no product matches
- Keep the breadcrumbs as the path from `Home` to the current category, min 2 - max 4 items
- Keep the title as the category name
- Keep the intro between min 10 - max 30 words
- Keep the subcategories between min 2 - max 6 items; the first is `All`
- Mark the current subcategory with `active: true` and send it without a data-prompt
- Keep the filters between min 1 - max 4 groups, each with min 2 - max 8 options
- Keep the filter label between min 1 - max 2 words and the option label between min 1 - max 4 words
- Send an option `count` only when STORE INFO gives it
- Send `applied` with the filters the user asked for, min 0 - max 6 items, each with its group and option label
- The frontend turns the chosen filters into `Show <title> filtered by <options>`, the chosen sort into `Sort <title> by <option>`, and a removed pill into the same query without it
- The filters show as a sidebar on desktop and as a drawer with a "Show N products" button on phones
- Keep the sort-options between min 2 - max 5 items; the first one is the current sort
- Keep `total` as the number of matching products, which can be higher than the products sent
- Keep the products between min 1 - max 12 items

**JSON:**

```jsx
{
  "section_id": "section-s21",
  "components": [
    {
      "category": "category-section",
      "name": "webshop-category-section",
      "props": {
        "breadcrumbs": ["Home", "Running"],
        "title": "Running",
        "intro": "Road, trail and track shoes. If you don't know your pronation, start with a neutral road shoe and our fit guide.",
        "subcategories": [
          { "label": "All", "active": true },
          { "label": "Road", "data-prompt": "Show category Road" },
          { "label": "Trail", "data-prompt": "Show category Trail" },
          { "label": "Track", "data-prompt": "Show category Track" }
        ],
        "filters": [
          {
            "label": "Size",
            "options": [{ "label": "EU 39" }, { "label": "EU 40" }, { "label": "EU 41" }, { "label": "EU 42" }]
          },
          {
            "label": "Surface",
            "options": [{ "label": "Road", "count": 2 }, { "label": "Trail", "count": 1 }, { "label": "Track", "count": 1 }]
          },
          {
            "label": "Price",
            "options": [{ "label": "Under €50", "count": 2 }, { "label": "€100 – €150", "count": 3 }, { "label": "Over €150", "count": 1 }]
          }
        ],
        "applied": [
          { "group": "Price", "label": "€100 – €150" }
        ],
        "sort-options": ["Featured", "Newest", "Top rated", "Price: low to high", "Price: high to low"],
        "total": 3,
        "products": [
          {
            "title": "Aero Run 2",
            "subtitle": "Neutral road running shoe",
            "price": 139,
            "compare-at": 169,
            "image": "photo-1542291026-7eec264c27ff",
            "hover-image": "photo-1597892657493-6847b9640bac",
            "badges": ["sale", "bestseller"],
            "rating": { "avg": 4.7, "count": 183 },
            "swatches": ["#d6341f", "#f1efe9", "#7c7f86"],
            "data-prompt": "Show product Aero Run 2"
          },
          {
            "title": "Aero Stable",
            "subtitle": "Supportive road shoe for overpronators",
            "price": 149,
            "image": "photo-1571008887538-b36bb32f4571",
            "hover-image": "photo-1590333748338-d629e4564ad9",
            "badges": ["new"],
            "rating": { "avg": 4.5, "count": 64 },
            "swatches": ["#2f54c9", "#1b1b1b"],
            "data-prompt": "Show product Aero Stable"
          },
          {
            "title": "Velocity Spike",
            "subtitle": "Track sprint spike",
            "price": 129,
            "image": "photo-1612387605830-d452ad0ab7c2",
            "hover-image": "photo-1598151639582-8ea0d33cd8ce",
            "badges": [],
            "rating": { "avg": 4.3, "count": 21 },
            "swatches": ["#d6341f"],
            "data-prompt": "Show product Velocity Spike"
          }
        ]
      }
    }
  ]
}
```

### Webshop Empty Results Section

**Ruleset:**

- Use when a search, category or filter leaves no products, instead of an empty `webshop-category-section` or `webshop-product-grid-section`
- Send it alone, or followed by a `webshop-product-grid-section` of close alternatives from STORE INFO
- Keep the title between min 3 - max 8 words, plain: say what found nothing
- Keep the text between min 8 - max 20 words: say why, and give one way out
- Keep the actions between min 1 - max 2 items, label min 2 - max 4 words; the data-prompt is the way out, for example `Show category Trail`
- Keep the tiles between min 0 - max 4 categories to browse instead, as in `webshop-category-tiles-section`; send them for a failed search

**JSON:**

```jsx
{
  "section_id": "section-s22",
  "components": [
    {
      "category": "empty-section",
      "name": "webshop-empty-results-section",
      "props": {
        "title": "Nothing matches those filters",
        "text": "No trail shoe is in stock in EU 41 right now. Remove the size, or try a neighbouring one.",
        "actions": [
          { "label": "Remove size filter", "data-prompt": "Show category Trail" },
          { "label": "Show EU 42", "data-prompt": "Show Trail filtered by EU 42" }
        ],
        "tiles": []
      }
    }
  ]
}
```

### Webshop Compare Section

**Ruleset:**

- Use when the user asks to compare two to four specific products, for example `Aero Run 2 vs Aero Stable`
- Send it alone, or followed by `webshop-product-section` for the product the user leans towards
- Use only STORE INFO specs; write `—` where a product has no value
- Keep the products between min 2 - max 4 items, with title, subtitle, image, price, rating and data-prompt `Show product <title>`
- Keep the availability as `in-stock`, `low-stock` or `sold-out`
- Keep the rows between min 3 - max 8 items; label min 1 - max 3 words; one value per product, in product order, min 1 - max 5 words each
- The frontend adds the price, rating and availability rows; the compare tray and "Compare" checkboxes are static

**JSON:**

```jsx
{
  "section_id": "section-s23",
  "components": [
    {
      "category": "compare-section",
      "name": "webshop-compare-section",
      "props": {
        "products": [
          { "title": "Aero Run 2", "subtitle": "Neutral road running shoe", "image": "photo-1542291026-7eec264c27ff", "price": 139, "compare-at": 169, "rating": { "avg": 4.7, "count": 183 }, "availability": "in-stock", "data-prompt": "Show product Aero Run 2" },
          { "title": "Aero Stable", "subtitle": "Supportive road shoe for overpronators", "image": "photo-1571008887538-b36bb32f4571", "price": 149, "rating": { "avg": 4.5, "count": 64 }, "availability": "in-stock", "data-prompt": "Show product Aero Stable" },
          { "title": "Trail Max GTX", "subtitle": "Waterproof trail running shoe", "image": "photo-1617179395455-101d786b4b7d", "price": 179, "rating": { "avg": 4.6, "count": 97 }, "availability": "in-stock", "data-prompt": "Show product Trail Max GTX" }
        ],
        "rows": [
          { "label": "Weight", "values": ["268 g (EU 42)", "281 g (EU 42)", "318 g (EU 42)"] },
          { "label": "Drop", "values": ["8 mm", "8 mm", "6 mm"] },
          { "label": "Surface", "values": ["Road, light gravel", "Road", "Trail, mud, rock"] },
          { "label": "Pronation", "values": ["Neutral", "Overpronation", "—"] },
          { "label": "Waterproof", "values": ["No", "—", "Yes"] }
        ]
      }
    }
  ]
}
```

### Webshop Product Section

**Ruleset:**

- Use when the user asks about one specific product
- Send it alone, optionally followed by `webshop-bundle-section`, then one `webshop-cross-sell-section` or one `webshop-product-grid-section` with `variant` `rail` for related products, then `webshop-sticky-add-to-bag-section`
- Keep the breadcrumbs as the path from `Home` to the product's subcategory, min 2 - max 4 items
- Keep the eyebrow as the product's short type, min 2 - max 6 words
- Keep the title as the product name and the brand as the STORE INFO brand
- Keep the images between min 1 - max 5 items; the first one is the main image
- Keep the colors between min 1 - max 6 items, each with a label and a hex value
- Keep the sizes as every size the product comes in; send `available: false` for sizes out of stock
- Keep the summary between min 8 - max 20 words
- Keep the highlights between min 3 - max 5 items, min 2 - max 6 words each
- Keep the description between min 30 - max 120 words; separate paragraphs with a blank line (`\n\n`)
- Keep the specs between min 1 - max 3 groups; each row is a `[label, value]` pair
- Send `fit` only when STORE INFO has fit notes: a note of min 4 - max 15 words and min 0 - max 3 testimonials, each with `width` (`narrow`, `normal` or `wide`), a text of min 5 - max 20 words and a name
- Send `size-guide` only when STORE INFO has one, with its columns and rows unchanged
- Keep the qa between min 0 - max 3 items, question min 3 - max 12 words, answer min 3 - max 30 words
- Keep the shipping and returns between min 8 - max 25 words each
- Keep the reviews between min 0 - max 5 items; a review title is optional, send `null` when there is none
- Keep the reviewer name as first name and last initial, the review text between min 5 - max 40 words, and `verified` as `true` only when STORE INFO says so
- Keep the review rating as a whole number from 1 to 5 and the date as `YYYY-MM-DD`
- Send a review `reply` only when STORE INFO has one, with `by` as the store name and a text of min 8 - max 40 words
- The option pickers, stock line, quantity, Add to bag and express pay buttons are static

**JSON:**

```jsx
{
  "section_id": "section-s25",
  "components": [
    {
      "category": "product-section",
      "name": "webshop-product-section",
      "props": {
        "breadcrumbs": ["Home", "Running", "Road"],
        "eyebrow": "Neutral road running shoe",
        "title": "Aero Run 2",
        "brand": "Stride",
        "price": 139,
        "compare-at": 169,
        "badges": ["sale", "bestseller"],
        "rating": { "avg": 4.7, "count": 183 },
        "images": ["photo-1542291026-7eec264c27ff", "photo-1597892657493-6847b9640bac", "photo-1590333748338-d629e4564ad9"],
        "colors": [
          { "label": "Signal Red / White", "hex": "#d6341f" },
          { "label": "White / Orange", "hex": "#f1efe9" },
          { "label": "Storm Grey", "hex": "#7c7f86" }
        ],
        "sizes": [
          { "label": "41", "available": true },
          { "label": "42", "available": true },
          { "label": "43", "available": false },
          { "label": "44", "available": true },
          { "label": "45", "available": true }
        ],
        "summary": "A light daily trainer with a roomy toe box and an 8 mm drop.",
        "highlights": ["268 g in EU 42", "8 mm heel-to-toe drop", "Recycled rubber outsole"],
        "description": "The Aero Run 2 is the shoe most of our customers run most of their kilometres in. The engineered mesh upper is thinner than last year's but holds the midfoot better.\n\nIt is a neutral shoe: if you overpronate, look at the Aero Stable instead.",
        "specs": [
          {
            "group": "Build",
            "rows": [["Upper", "Engineered mesh, 62% recycled polyester"], ["Midsole", "EVA foam, 32 / 24 mm"], ["Weight", "268 g (EU 42)"]]
          },
          {
            "group": "Use",
            "rows": [["Surface", "Road, light gravel"], ["Pronation", "Neutral"]]
          }
        ],
        "fit": {
          "note": "Runs true to size. Narrow feet: consider half a size down.",
          "testimonials": [
            { "width": "narrow", "text": "Half a size down and the heel lock is perfect.", "name": "Ana, EU 38" },
            { "width": "normal", "text": "True to size. Toe box is roomier than the Aero Run 1.", "name": "Marko, EU 43" }
          ]
        },
        "size-guide": {
          "columns": ["EU", "UK", "US M", "US W", "Foot cm"],
          "rows": [[41, 7, 7.5, 9, 25.5], [42, 8, 8.5, 10, 26.5], [43, 8.5, 9, 10.5, 27.0], [44, 9.5, 10, 11.5, 28.0]]
        },
        "qa": [
          { "q": "Is it waterproof?", "a": "No. For wet trails look at the Trail Max GTX." }
        ],
        "shipping": "Order by 14:00 for same-day dispatch from Zagreb. Delivery in 2–4 working days, free over €75, otherwise €4,90.",
        "returns": "30-day returns, prepaid label in the box. Refund within 5 days of receipt.",
        "reviews": [
          {
            "name": "Ivana K.",
            "rating": 5,
            "title": "Light and roomy",
            "text": "Light, roomy toe box, and the laces finally stay tied. Half marathon in week two with no hot spots.",
            "date": "2026-09-14",
            "verified": true
          },
          {
            "name": "Tomislav R.",
            "rating": 2,
            "title": "Too narrow for me",
            "text": "Too narrow in the midfoot; returned after one run. The return itself was painless.",
            "date": "2026-09-02",
            "verified": true,
            "reply": { "by": "Stride", "text": "Sorry about the fit, Tomislav. The Aero Run 2 is a medium last; our Trail Max comes in a wide fit." }
          }
        ]
      }
    }
  ]
}
```

### Webshop Bundle Section

**Ruleset:**

- Use right after `webshop-product-section` when STORE INFO lists a bundle for that product, or when the user asks what to buy with it for less
- Never send a bundle STORE INFO doesn't list
- Keep the items between min 2 - max 3; the first one is the product the page is about
- Keep each item's title as the product name, with its image, price and data-prompt `Show product <title>`
- Keep `save` as the STORE INFO saving, a number in EUR; the frontend works out the bundle price
- The "Add all" button is static

**JSON:**

```jsx
{
  "section_id": "section-s26",
  "components": [
    {
      "category": "bundle-section",
      "name": "webshop-bundle-section",
      "props": {
        "save": 15,
        "items": [
          { "title": "Trail Max GTX", "image": "photo-1617179395455-101d786b4b7d", "price": 179, "data-prompt": "Show product Trail Max GTX" },
          { "title": "Trail gaiter", "image": "photo-1655976795374-6b519928f1e1", "price": 29, "data-prompt": "Show product Trail gaiter" },
          { "title": "Merino run sock 3-pack", "image": "photo-1773665230184-5fd8cb4fc928", "price": 29, "data-prompt": "Show product Merino run sock 3-pack" }
        ]
      }
    }
  ]
}
```

### Webshop Cross-sell Section

**Ruleset:**

- Use after `webshop-product-section` or `webshop-bundle-section`, with products from that product's STORE INFO cross-sell list, in that order
- Never send it together with a `webshop-product-grid-section` `rail` for the same product
- Keep the title as `Complete the kit`, `Works with` or `Styled with`; default is `Complete the kit`
- Keep the products between min 2 - max 4 items, with the same fields as `webshop-product-grid-section`

**JSON:**

```jsx
{
  "section_id": "section-s27",
  "components": [
    {
      "category": "product-grid-section",
      "name": "webshop-cross-sell-section",
      "props": {
        "title": "Complete the kit",
        "products": [
          {
            "title": "Merino run sock 3-pack",
            "subtitle": "Cushioned ankle sock",
            "price": 29,
            "image": "photo-1773665230184-5fd8cb4fc928",
            "hover-image": "photo-1631024724206-6ccc65ab31bd",
            "badges": ["bestseller"],
            "rating": { "avg": 4.8, "count": 530 },
            "swatches": [],
            "data-prompt": "Show product Merino run sock 3-pack"
          },
          {
            "title": "Trail Max GTX",
            "subtitle": "Waterproof trail running shoe",
            "price": 179,
            "image": "photo-1617179395455-101d786b4b7d",
            "hover-image": "photo-1718248028293-934f04a578db",
            "badges": ["bestseller"],
            "rating": { "avg": 4.6, "count": 97 },
            "swatches": ["#f26a21", "#5e6b3f"],
            "data-prompt": "Show product Trail Max GTX"
          },
          {
            "title": "Aero Stable",
            "subtitle": "Supportive road shoe for overpronators",
            "price": 149,
            "image": "photo-1571008887538-b36bb32f4571",
            "hover-image": "photo-1590333748338-d629e4564ad9",
            "badges": ["new"],
            "rating": { "avg": 4.5, "count": 64 },
            "swatches": ["#2f54c9", "#1b1b1b"],
            "data-prompt": "Show product Aero Stable"
          },
          {
            "title": "Run cap",
            "subtitle": "Lightweight, packable",
            "price": 25,
            "image": "photo-1758922769578-68c5ba000d87",
            "hover-image": "photo-1461896836934-ffe607ba8211",
            "badges": [],
            "rating": { "avg": 4.7, "count": 142 },
            "swatches": ["#1b1b1b", "#f26a21"],
            "data-prompt": "Show product Run cap"
          }
        ]
      }
    }
  ]
}
```

### Webshop Reviews Section

**Ruleset:**

- Use when the user asks what customers think of one product, or on a long product page after `webshop-specs-section`
- Never send it together with `webshop-product-section` for the same product; that block already has reviews
- Use only STORE INFO reviews and ratings; never write a review
- Keep the product as the product name
- Keep `dist` as exactly 5 numbers: the count of 1★ to 5★ ratings, adding up to `rating.count`
- Keep the reviews between min 0 - max 5 items, newest first
- Keep the reviewer name as first name and last initial, and the rating as a whole number from 1 to 5
- Keep the variant-note between min 1 - max 6 words, optional: the size or colour the reviewer bought
- Keep the title between min 1 - max 6 words, or `null`
- Keep the text between min 5 - max 40 words and the date as `YYYY-MM-DD`
- Keep the photos between min 0 - max 3 photo ids from STORE INFO
- Send a `reply` only when STORE INFO has one, with `by` as the store name and a text of min 8 - max 40 words
- The "Write a review" button is static

**JSON:**

```jsx
{
  "section_id": "section-s24",
  "components": [
    {
      "category": "reviews-section",
      "name": "webshop-reviews-section",
      "props": {
        "product": "Trail Max GTX",
        "rating": { "avg": 4.6, "count": 97 },
        "dist": [5, 7, 14, 35, 36],
        "reviews": [
          {
            "name": "Maja B.",
            "rating": 5,
            "variant-note": "Size 40 · Olive",
            "title": "Dry feet on Velebit",
            "text": "Four hours in rain and streams, socks still dry. Lugs clean themselves in mud.",
            "date": "2026-10-02",
            "verified": true,
            "photos": ["photo-1530143311094-34d807799e8f"]
          }
        ]
      }
    }
  ]
}
```

### Webshop Sticky Add-to-bag Section

**Ruleset:**

- Send it as the last component of a response that contains `webshop-product-section` or `webshop-hero-product-section`; the frontend shows it when the buy button scrolls out of view
- Never send it on its own
- Keep the title as the product name
- Keep the options as the default selected option labels, min 1 - max 3 items, sizes written as `EU <size>`
- Keep the price as the price of that option
- The "Add to bag" button is static

**JSON:**

```jsx
{
  "section_id": "section-s28",
  "components": [
    {
      "category": "sticky-section",
      "name": "webshop-sticky-add-to-bag-section",
      "props": {
        "title": "Trail Max GTX",
        "options": ["Ember / Black", "EU 42"],
        "price": 179
      }
    }
  ]
}
```

### Webshop Editorial Section

**Ruleset:**

- Use for a guide, story or advice topic, for example how to choose a shoe
- On the homepage send it after `webshop-size-section`; on its own for an advice question; it can be followed by a `webshop-product-grid-section` with the products the story mentions
- Set `reverse` to `true` to put the image on the right; default is `false`
- Keep the eyebrow between min 1 - max 2 words
- Keep the title between min 3 - max 8 words
- Keep the text between min 8 - max 25 words
- Keep the image as one landscape photo id from STORE INFO
- Keep the cta label between min 1 - max 4 words
- Keep the cta data-prompt as the question the reader would ask next

**JSON Variant 1:**

```jsx
{
  "section_id": "section-s29",
  "components": [
    {
      "category": "editorial-section",
      "name": "webshop-editorial-section",
      "props": {
        "eyebrow": "Journal",
        "title": "How to choose a trail shoe",
        "text": "Lugs, drop, rock plates and membranes explained in five minutes.",
        "image": "photo-1530143311094-34d807799e8f",
        "cta": { "label": "Read the guide", "data-prompt": "How do I choose a trail shoe?" },
        "reverse": false
      }
    }
  ]
}
```

**JSON Variant 2:**

```jsx
{
  "section_id": "section-s34",
  "components": [
    {
      "category": "editorial-section",
      "name": "webshop-editorial-section",
      "props": {
        "eyebrow": "Fit help",
        "title": "Not sure about your size?",
        "text": "Every shoe lists its fit notes and a size guide in centimetres. Measure in the evening, when feet are largest.",
        "image": "photo-1597892657493-6847b9640bac",
        "cta": { "label": "Open the size guide", "data-prompt": "Show the size guide" },
        "reverse": true
      }
    }
  ]
}
```

### Webshop Edit Section

**Ruleset:**

- Use when the user asks for a kit or a look for one activity, for example `What do I need for my first trail race?`
- Send it alone, or after `webshop-hero-campaign-section`; it can be followed by `webshop-product-grid-section` with alternatives
- Keep the eyebrow between min 1 - max 3 words
- Keep the title between min 3 - max 7 words
- Keep the text between min 15 - max 40 words: why these products belong together
- Keep the image as one portrait photo id from STORE INFO
- Keep the products between min 2 - max 4 items, STORE INFO products only, with title, subtitle, price, image and data-prompt `Show product <title>`
- Keep the products subtitle between min 2 - max 6 words

**JSON:**

```jsx
{
  "section_id": "section-s36",
  "components": [
    {
      "category": "edit-section",
      "name": "webshop-edit-section",
      "props": {
        "eyebrow": "The kit",
        "title": "Everything for your first trail race",
        "text": "A shoe that grips in mud, socks that don't rub at kilometre twenty, a gaiter for the grit and a cap for sun or rain. Four things, nothing extra.",
        "image": "photo-1530143311094-34d807799e8f",
        "products": [
          { "title": "Trail Max GTX", "subtitle": "Waterproof trail running shoe", "price": 179, "image": "photo-1617179395455-101d786b4b7d", "data-prompt": "Show product Trail Max GTX" },
          { "title": "Merino run sock 3-pack", "subtitle": "Cushioned ankle sock", "price": 29, "image": "photo-1773665230184-5fd8cb4fc928", "data-prompt": "Show product Merino run sock 3-pack" },
          { "title": "Trail gaiter", "subtitle": "Low debris gaiter", "price": 29, "image": "photo-1655976795374-6b519928f1e1", "data-prompt": "Show product Trail gaiter" },
          { "title": "Run cap", "subtitle": "Lightweight, packable", "price": 25, "image": "photo-1758922769578-68c5ba000d87", "data-prompt": "Show product Run cap" }
        ]
      }
    }
  ]
}
```

### Webshop Journal Section

**Ruleset:**

- Use when the user asks for guides, stories or something to read, or near the end of an editorial homepage before `webshop-press-section`
- Send it at most once per page
- Keep the title between min 1 - max 3 words; default is `Journal`
- Keep the articles to exactly 3 items
- Keep the article title between min 3 - max 7 words and the text between min 6 - max 14 words
- Keep the article image as one landscape photo id from STORE INFO
- Keep the article data-prompt as the question the article answers

**JSON:**

```jsx
{
  "section_id": "section-s37",
  "components": [
    {
      "category": "journal-section",
      "name": "webshop-journal-section",
      "props": {
        "title": "Journal",
        "articles": [
          { "title": "How to choose a trail shoe", "text": "Lugs, drop, rock plates and membranes, explained in five minutes.", "image": "photo-1530143311094-34d807799e8f", "data-prompt": "How do I choose a trail shoe?" },
          { "title": "Breaking in leather boots", "text": "Three short walks before the long one, and why it matters.", "image": "photo-1600100315778-850119b19220", "data-prompt": "How do I break in hiking boots?" },
          { "title": "Why merino beats cotton", "text": "Warm when wet, and it doesn't smell after a long run.", "image": "photo-1631024724206-6ccc65ab31bd", "data-prompt": "Why are merino socks better for running?" }
        ]
      }
    }
  ]
}
```

### Webshop UGC Section

**Ruleset:**

- Use when the user asks how products look on real customers, or on the homepage after `webshop-press-section`
- Use only STORE INFO customer photos and handles; never invent a customer
- Keep the title between min 2 - max 4 words
- Keep the text between min 4 - max 10 words, with the store hashtag
- Keep the items between min 4 - max 6
- Keep the item handle starting with `@`, the product as the product name and the image as a portrait photo id
- Keep the item data-prompt as `Show product <title>`

**JSON:**

```jsx
{
  "section_id": "section-s38",
  "components": [
    {
      "category": "ugc-section",
      "name": "webshop-ugc-section",
      "props": {
        "title": "Worn by you",
        "text": "Tag #stride to be featured.",
        "items": [
          { "handle": "@maja.trails", "product": "Trail Max GTX", "image": "photo-1718248028293-934f04a578db", "data-prompt": "Show product Trail Max GTX" },
          { "handle": "@ivana.runs", "product": "Aero Run 2", "image": "photo-1597892657493-6847b9640bac", "data-prompt": "Show product Aero Run 2" },
          { "handle": "@ivo.hikes", "product": "Ridge Mid", "image": "photo-1600100315778-850119b19220", "data-prompt": "Show product Ridge Mid" },
          { "handle": "@luka.p", "product": "Run cap", "image": "photo-1461896836934-ffe607ba8211", "data-prompt": "Show product Run cap" },
          { "handle": "@petra_fc", "product": "Club home jersey 26/27", "image": "photo-1585925452553-03549ee41dc9", "data-prompt": "Show product Club home jersey 26/27" },
          { "handle": "@tomo.lifts", "product": "Flux Trainer", "image": "photo-1517836357463-d25dfeac3438", "data-prompt": "Show product Flux Trainer" }
        ]
      }
    }
  ]
}
```

### Webshop Chapter Section

**Ruleset:**

- Use on a long product page after `webshop-hero-product-section`: one chapter per topic, min 2 - max 5 chapters per page, then `webshop-specs-section`
- Use `variant` `tiles` for a story with photos and `compare` for a table against other products; default is `tiles`
- Keep the eyebrow between min 1 - max 2 words; `webshop-chapter-nav-section` uses it as the link label
- Keep the title between min 2 - max 6 words
- Keep the text between min 15 - max 45 words
- For `tiles`, keep the tiles between min 1 - max 3 items, each with a landscape photo id and a caption of min 8 - max 20 words
- For `compare`, keep the columns between min 2 - max 4 items; the first column is this product and is highlighted
- For `compare`, use other STORE INFO products as the other columns, never other brands, and keep the rows between min 3 - max 7 items: a label of min 1 - max 3 words, then one value per column of min 1 - max 4 words

**JSON Variant 1:**

```jsx
{
  "section_id": "section-s30",
  "components": [
    {
      "category": "chapter-section",
      "name": "webshop-chapter-section",
      "props": {
        "variant": "tiles",
        "eyebrow": "Grip",
        "title": "Five millimetres of bite",
        "text": "Sticky rubber lugs, 5 mm deep and spaced wide, so mud falls out instead of packing in. A rock plate under the forefoot takes the sting out of sharp stones.",
        "tiles": [
          { "image": "photo-1530143311094-34d807799e8f", "caption": "Wide-spaced 5 mm lugs shed mud on their own, so the grip is still there an hour in." },
          { "image": "photo-1718248028293-934f04a578db", "caption": "A waterproof membrane under ripstop mesh: streams stay outside, and your socks stay dry." }
        ]
      }
    }
  ]
}
```

**JSON Variant 2:**

```jsx
{
  "section_id": "section-s31",
  "components": [
    {
      "category": "chapter-section",
      "name": "webshop-chapter-section",
      "props": {
        "variant": "compare",
        "eyebrow": "Compared",
        "title": "The right shoe for the ground",
        "text": "The Trail Max GTX is heavier than our road shoe and lighter than our boot. Here is where each one belongs.",
        "columns": ["Trail Max GTX", "Aero Run 2", "Ridge Mid"],
        "rows": [
          ["Weight", "318 g", "268 g", "640 g"],
          ["Drop", "6 mm", "8 mm", "—"],
          ["Outsole", "5 mm lugs", "4 mm lugs", "Vibram, resoleable"],
          ["Waterproof", "Yes", "No", "Yes"],
          ["Best for", "Technical trails", "Road, light gravel", "Multi-day hiking"]
        ]
      }
    }
  ]
}
```

### Webshop Specs Section

**Ruleset:**

- Use on a long product page after the chapters, or when the user asks for full specifications or what's in the box
- Keep the eyebrow as `Specifications` and the title between min 2 - max 5 words
- Keep the specs between min 1 - max 4 groups; group name min 1 - max 2 words; each row is a `[label, value]` pair, min 2 - max 6 rows per group
- Keep the in-the-box between min 0 - max 8 items, min 1 - max 6 words each, only from STORE INFO

**JSON:**

```jsx
{
  "section_id": "section-s32",
  "components": [
    {
      "category": "specs-section",
      "name": "webshop-specs-section",
      "props": {
        "eyebrow": "Specifications",
        "title": "Everything in one table",
        "specs": [
          {
            "group": "Build",
            "rows": [["Upper", "Ripstop mesh with waterproof membrane"], ["Outsole", "Sticky rubber, 5 mm lugs"], ["Weight", "318 g (EU 42)"]]
          },
          {
            "group": "Use",
            "rows": [["Surface", "Trail, mud, rock"], ["Drop", "6 mm"]]
          }
        ],
        "in-the-box": []
      }
    }
  ]
}
```

### Webshop FAQ Section

**Ruleset:**

- Use when the user asks for an FAQ or several practical questions at once, or on a long product page before `webshop-final-cta-section`
- Answer only from STORE INFO: product Q&A, shipping, returns, sizing and warranty; never promise anything STORE INFO doesn't say
- Keep the eyebrow to max 1 word; default is `Questions`
- Keep the title between min 2 - max 5 words
- Keep the items between min 3 - max 8
- Keep the question as a full question, min 4 - max 12 words
- Keep the answer between min 8 - max 40 words
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON:**

```jsx
{
  "section_id": "section-s33",
  "components": [
    {
      "category": "faq-section",
      "name": "webshop-faq-section",
      "unique": true,
      "props": {
        "eyebrow": "Questions",
        "title": "Asked often",
        "items": [
          { "q": "Can I use the Trail Max GTX on road?", "a": "Yes, but the lugs wear faster on asphalt. For mostly road running, the Aero Run 2 is the better shoe." },
          { "q": "How fast do you ship?", "a": "Order by 14:00 and it leaves Zagreb the same day. Delivery takes 2–4 working days anywhere in the EU." },
          { "q": "How do returns work?", "a": "You have 30 days. A prepaid label is in the box, and the refund arrives within 5 days of receipt." },
          { "q": "Which size should I order?", "a": "Measure your foot in centimetres and match it in the size guide. Narrow feet can go half a size down." }
        ]
      }
    }
  ]
}
```

### Webshop Final CTA Section

**Ruleset:**

- Use as the last section of a long product page, after `webshop-faq-section` and before `webshop-trust-section`
- Keep the eyebrow as the product name
- Keep the title between min 4 - max 10 words, with the product's current price
- Keep the text as the STORE INFO tagline
- Keep the cta label between min 1 - max 3 words and the cta `anchor` as the `section_id` of `webshop-hero-product-section`
- Keep the note between min 3 - max 8 words, from STORE INFO warranty or returns facts

**JSON:**

```jsx
{
  "section_id": "section-s39",
  "components": [
    {
      "category": "cta-section",
      "name": "webshop-final-cta-section",
      "props": {
        "eyebrow": "Trail Max GTX",
        "title": "From €179. Thirty days to change your mind.",
        "text": "Footwear and sport gear, shipped from Zagreb to the whole EU.",
        "cta": { "label": "Choose yours", "anchor": "section-s9" },
        "note": "2-year warranty · repairs in Zagreb"
      }
    }
  ]
}
```

### Webshop Press Section

**Ruleset:**

- Use on the homepage after `webshop-editorial-section`, or when the user asks what others say about the shop
- Use only quotes and sources from STORE INFO
- Keep the quotes between min 2 - max 3 items
- Keep the quote between min 4 - max 12 words
- Keep the source as the publication name

**JSON:**

```jsx
{
  "section_id": "section-s40",
  "components": [
    {
      "category": "press-section",
      "name": "webshop-press-section",
      "props": {
        "quotes": [
          { "quote": "The best value road shoe of the year.", "source": "Runner's World" },
          { "quote": "Zagreb's answer to the big sports chains.", "source": "Jutarnji list" },
          { "quote": "Trail Max GTX: dry feet, finally.", "source": "Outside" }
        ]
      }
    }
  ]
}
```

### Webshop Brand Strip Section

**Ruleset:**

- Use when the user asks which materials, technologies or partner brands the products use, or on the homepage right before `webshop-trust-section`
- Use only names that appear in STORE INFO
- Keep the brands between min 4 - max 8 items, min 1 - max 3 words each; the frontend shows them as a quiet text row, no logos

**JSON:**

```jsx
{
  "section_id": "section-s41",
  "components": [
    {
      "category": "brands-section",
      "name": "webshop-brand-strip-section",
      "props": {
        "brands": ["Vibram", "Merino wool", "Recycled rubber", "Engineered mesh", "Full-grain leather", "Waterproof membrane"]
      }
    }
  ]
}
```

### Webshop Trust Section

**Ruleset:**

- Use near the end of every homepage, after `webshop-press-section`, or on its own when the user asks about shipping, returns or warranty
- Build every item from STORE INFO shipping, returns and warranty facts
- Keep the items to exactly 4
- Keep the icon as a Tabler icon name in kebab-case, without the `Icon` prefix, for example `truck`, `arrow-back-up`, `shield-check`, `map-pin`
- Keep the title between min 2 - max 5 words
- Keep the text between min 3 - max 8 words
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON:**

```jsx
{
  "section_id": "section-s42",
  "components": [
    {
      "category": "trust-section",
      "name": "webshop-trust-section",
      "unique": true,
      "props": {
        "items": [
          { "icon": "truck", "title": "Free shipping over €75", "text": "2–4 working days, EU-wide" },
          { "icon": "arrow-back-up", "title": "30-day returns", "text": "Prepaid label in the box" },
          { "icon": "shield-check", "title": "2-year warranty", "text": "On every pair of shoes" },
          { "icon": "map-pin", "title": "Shipped from Zagreb", "text": "Same-day dispatch if ordered by 14:00" }
        ]
      }
    }
  ]
}
```

### Webshop Cart Section

**Ruleset:**

- Use when the user asks to see their bag or what is in it; the frontend opens it as a drawer over the current page
- Send it alone
- Use only CART INFO; never add, remove or change a line yourself
- Use `variant` `empty` when CART INFO has no lines, and `filled` otherwise; default is `filled`
- For `filled`, keep the lines between min 1 - max 10 items, in CART INFO order
- Keep the line title as the product name, the options as the chosen option labels (min 1 - max 3 items, sizes written as `EU <size>`), `qty` and `max` (the stock cap) as whole numbers, and `price` as the line total
- Keep the line data-prompt as `Show product <title>`
- Keep `subtotal`, `shipping`, `vat` and `total` as CART INFO numbers in EUR, and `free-shipping-over` as the STORE INFO threshold; the frontend draws the free-shipping progress bar
- For `empty`, keep the title between min 2 - max 5 words, the text between min 3 - max 10 words, the cta label between min 1 - max 3 words and the cta data-prompt as `Show category <category>`
- Quantity buttons, Remove, Checkout and express pay are static frontend actions
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON Variant 1:**

```jsx
{
  "section_id": "section-s43",
  "components": [
    {
      "category": "cart-section",
      "name": "webshop-cart-section",
      "unique": true,
      "props": {
        "variant": "filled",
        "lines": [
          { "title": "Aero Run 2", "options": ["Signal Red / White", "EU 42"], "qty": 1, "max": 10, "price": 139, "image": "photo-1542291026-7eec264c27ff", "data-prompt": "Show product Aero Run 2" },
          { "title": "Merino run sock 3-pack", "options": ["39–42"], "qty": 2, "max": 8, "price": 58, "image": "photo-1773665230184-5fd8cb4fc928", "data-prompt": "Show product Merino run sock 3-pack" }
        ],
        "free-shipping-over": 75,
        "subtotal": 197,
        "shipping": 0,
        "vat": 39.4,
        "total": 197
      }
    }
  ]
}
```

**JSON Variant 2:**

```jsx
{
  "section_id": "section-s44",
  "components": [
    {
      "category": "cart-section",
      "name": "webshop-cart-section",
      "unique": true,
      "props": {
        "variant": "empty",
        "title": "Your bag is empty",
        "text": "Start with our best sellers.",
        "cta": { "label": "Shop now", "data-prompt": "Show category Running" }
      }
    }
  ]
}
```

### Webshop Checkout Section

**Ruleset:**

- Use only when the user asks to check out or pay and CART INFO has at least one line; otherwise send `webshop-cart-section` with `variant` `empty`
- Send it alone; the frontend shows it as a page of its own
- The steps, contact, address and payment fields, validation, express pay and the Pay button are static; never ask for, repeat or store card details
- Keep the delivery methods to exactly 3 items with `id` `standard`, `pickup` and `express`, from STORE INFO shipping
- Keep the delivery label between min 2 - max 6 words, the note between min 3 - max 8 words and the price as a number in EUR, `0` when free
- Keep the countries between min 2 - max 8 items from the STORE INFO shipping zone, the store's own country first
- Keep the lines, `subtotal`, `shipping`, `vat` and `total` as in `webshop-cart-section`, from CART INFO
- Keep the payments as in `webshop-footer-section`
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON:**

```jsx
{
  "section_id": "section-s45",
  "components": [
    {
      "category": "checkout-section",
      "name": "webshop-checkout-section",
      "unique": true,
      "props": {
        "store": "Stride",
        "delivery": [
          { "id": "standard", "label": "Standard · 2–4 working days", "note": "DPD or GLS to your door", "price": 0 },
          { "id": "pickup", "label": "Pickup point · 2–4 working days", "note": "Any DPD Pickup or Box", "price": 0 },
          { "id": "express", "label": "Express · next working day", "note": "Order by 14:00, Croatia only", "price": 9.9 }
        ],
        "countries": ["Croatia", "Austria", "Germany", "Italy", "Netherlands", "Slovenia", "Other EU country"],
        "lines": [
          { "title": "Aero Run 2", "options": ["Signal Red / White", "EU 42"], "qty": 1, "price": 139, "image": "photo-1542291026-7eec264c27ff" },
          { "title": "Merino run sock 3-pack", "options": ["39–42"], "qty": 2, "price": 58, "image": "photo-1773665230184-5fd8cb4fc928" }
        ],
        "subtotal": 197,
        "shipping": 0,
        "vat": 39.4,
        "total": 197,
        "payments": ["VISA", "MASTERCARD", "APPLE PAY", "GOOGLE PAY", "PAYPAL", "KLARNA", "SEPA"]
      }
    }
  ]
}
```

### Webshop Order Confirmation Section

**Ruleset:**

- Use only right after a completed checkout, with ORDER INFO; never invent an order number, address, date or total
- Send it alone
- Keep the order as the ORDER INFO number, the first-name as the buyer's first name and the email as given
- Keep the eta as the expected delivery date, `YYYY-MM-DD`
- Keep the address as one line, min 3 - max 14 words
- Keep the lines, `subtotal`, `shipping` and `total` as in ORDER INFO, and `method` as `card` or `express`
- The "Create account" block and returns reminder are static; "Continue shopping" sends `Show the homepage`
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON:**

```jsx
{
  "section_id": "section-s46",
  "components": [
    {
      "category": "order-section",
      "name": "webshop-order-confirmation-section",
      "unique": true,
      "props": {
        "order": "482913",
        "first-name": "Ana",
        "email": "ana@example.com",
        "eta": "2026-11-16",
        "address": "Ilica 1, 10000 Zagreb, Croatia",
        "lines": [
          { "title": "Aero Run 2", "options": ["Signal Red / White", "EU 42"], "qty": 1, "price": 139, "image": "photo-1542291026-7eec264c27ff" },
          { "title": "Merino run sock 3-pack", "options": ["39–42"], "qty": 2, "price": 58, "image": "photo-1773665230184-5fd8cb4fc928" }
        ],
        "subtotal": 197,
        "shipping": 0,
        "total": 197,
        "method": "card",
        "data-prompt": "Show the homepage"
      }
    }
  ]
}
```

### Webshop Toast Section

**Ruleset:**

- Use only to confirm an action the frontend reports, such as added to bag, saved to wishlist or removed; never as an answer to a question
- Send it alone; the frontend shows it for four seconds at the bottom of the page and reads it to screen readers
- Keep the message between min 2 - max 8 words
- Keep the action between min 0 - max 1 item: a label of min 1 - max 2 words and a data-prompt, for example `Show my bag`

**JSON:**

```jsx
{
  "section_id": "section-s47",
  "components": [
    {
      "category": "toast-section",
      "name": "webshop-toast-section",
      "props": {
        "message": "Added to bag · Aero Run 2",
        "action": { "label": "View bag", "data-prompt": "Show my bag" }
      }
    }
  ]
}
```

### Webshop Stream Section

**Ruleset:**

- Use only when no other component can answer the query
- Keep the heading between min 2 - max 8 words, optional
- Leave text empty, it is filled by streaming

**JSON:**

```jsx
{
  "section_id": "section-s1",
  "components": [
    {
      "category": "stream-section",
      "name": "webshop-stream-section",
      "props": {
        "heading": "About your question",
        "text": ""
      }
    }
  ]
}
```
