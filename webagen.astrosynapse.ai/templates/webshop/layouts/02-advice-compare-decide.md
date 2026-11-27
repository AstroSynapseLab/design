# Advice, compare, decide

A shopper asks for advice instead of browsing, compares two shoes and opens the one that fits. Shows a short card answer, a comparison built only from STORE INFO specs, and a full product page.

## Step 1 · Asks for advice

**User:** I overpronate. Which road shoe should I buy?

**Why:** A quick answer about one product is a `webshop-product-card-section`, not a full page. STORE INFO says the Aero Stable is the shoe for overpronation.

```json
[
  {
    "section_id": "section-s1",
    "components": [
      {
        "category": "product-card-section",
        "name": "webshop-product-card-section",
        "props": {
          "title": "Aero Stable",
          "subtitle": "Supportive road shoe for overpronators",
          "price": 149,
          "image": "photo-1571008887538-b36bb32f4571",
          "hover-image": "photo-1590333748338-d629e4564ad9",
          "badges": [
            "new"
          ],
          "rating": {
            "avg": 4.5,
            "count": 64
          },
          "swatches": [
            "#2f54c9",
            "#1b1b1b"
          ],
          "data-prompt": "Show product Aero Stable"
        }
      }
    ]
  }
]
```

## Step 2 · Compares

**User:** How is it different from the Aero Run 2?

**Why:** Two named products: `webshop-compare-section`. Every value comes from STORE INFO specs; the frontend adds price, rating and availability rows.

```json
[
  {
    "section_id": "section-s2",
    "components": [
      {
        "category": "compare-section",
        "name": "webshop-compare-section",
        "props": {
          "products": [
            {
              "title": "Aero Run 2",
              "subtitle": "Neutral road running shoe",
              "image": "photo-1542291026-7eec264c27ff",
              "price": 139,
              "compare-at": 169,
              "rating": {
                "avg": 4.7,
                "count": 183
              },
              "availability": "in-stock",
              "data-prompt": "Show product Aero Run 2"
            },
            {
              "title": "Aero Stable",
              "subtitle": "Supportive road shoe for overpronators",
              "image": "photo-1571008887538-b36bb32f4571",
              "price": 149,
              "rating": {
                "avg": 4.5,
                "count": 64
              },
              "availability": "in-stock",
              "data-prompt": "Show product Aero Stable"
            }
          ],
          "rows": [
            {
              "label": "Pronation",
              "values": [
                "Neutral",
                "Overpronation"
              ]
            },
            {
              "label": "Midsole",
              "values": [
                "EVA foam, 32 / 24 mm",
                "Dual-density EVA"
              ]
            },
            {
              "label": "Weight",
              "values": [
                "268 g (EU 42)",
                "281 g (EU 42)"
              ]
            },
            {
              "label": "Drop",
              "values": [
                "8 mm",
                "8 mm"
              ]
            },
            {
              "label": "Surface",
              "values": [
                "Road, light gravel",
                "Road"
              ]
            }
          ]
        }
      }
    ]
  }
]
```

## Step 3 · Decides

**User:** Show product Aero Stable

**Why:** Full product page from STORE INFO, its cross-sell list, then the sticky bar.

```json
[
  {
    "section_id": "section-s3",
    "components": [
      {
        "category": "product-section",
        "name": "webshop-product-section",
        "props": {
          "breadcrumbs": [
            "Home",
            "Running",
            "Road"
          ],
          "eyebrow": "Supportive road running shoe",
          "title": "Aero Stable",
          "brand": "Stride",
          "price": 149,
          "badges": [
            "new"
          ],
          "rating": {
            "avg": 4.5,
            "count": 64
          },
          "images": [
            "photo-1571008887538-b36bb32f4571",
            "photo-1590333748338-d629e4564ad9",
            "photo-1606107557195-0e29a4b5b4aa"
          ],
          "colors": [
            {
              "label": "Cobalt / White",
              "hex": "#2f54c9"
            },
            {
              "label": "Black / Volt",
              "hex": "#1b1b1b"
            }
          ],
          "sizes": [
            {
              "label": "39",
              "available": true
            },
            {
              "label": "40",
              "available": true
            },
            {
              "label": "41",
              "available": true
            },
            {
              "label": "42",
              "available": true
            },
            {
              "label": "43",
              "available": true
            },
            {
              "label": "44",
              "available": true
            },
            {
              "label": "45",
              "available": true
            },
            {
              "label": "46",
              "available": true
            }
          ],
          "summary": "Same Aero platform with a firmer medial post for runners who roll inward.",
          "highlights": [
            "Medial post for overpronation",
            "281 g in EU 42",
            "8 mm drop"
          ],
          "description": "If your old shoes wear on the inside edge first, the Aero Stable is the one. A denser foam wedge on the inside of the midsole slows the roll without feeling like a brick.\n\nEverything else is Aero Run 2: mesh upper, 8 mm drop, recycled outsole.",
          "specs": [
            {
              "group": "Build",
              "rows": [
                [
                  "Upper",
                  "Engineered mesh"
                ],
                [
                  "Midsole",
                  "Dual-density EVA"
                ],
                [
                  "Weight",
                  "281 g (EU 42)"
                ]
              ]
            },
            {
              "group": "Use",
              "rows": [
                [
                  "Surface",
                  "Road"
                ],
                [
                  "Pronation",
                  "Overpronation"
                ]
              ]
            }
          ],
          "fit": {
            "note": "True to size, same last as the Aero Run 2.",
            "testimonials": []
          },
          "size-guide": {
            "columns": [
              "EU",
              "UK",
              "US M",
              "US W",
              "Foot cm"
            ],
            "rows": [
              [
                41,
                7,
                7.5,
                9,
                25.5
              ],
              [
                42,
                8,
                8.5,
                10,
                26.5
              ],
              [
                43,
                8.5,
                9,
                10.5,
                27.0
              ],
              [
                44,
                9.5,
                10,
                11.5,
                28.0
              ]
            ]
          },
          "qa": [],
          "shipping": "Order by 14:00 for same-day dispatch from Zagreb. Delivery in 2–4 working days, free over €75, otherwise €4,90.",
          "returns": "30-day returns, prepaid label in the box. Refund within 5 days of receipt.",
          "reviews": [
            {
              "name": "Petar D.",
              "rating": 5,
              "title": "Knee pain gone",
              "text": "Switched from a neutral shoe on my physio's advice. Two months in, no more inner-knee ache.",
              "date": "2026-09-28",
              "verified": true
            }
          ]
        }
      }
    ]
  },
  {
    "section_id": "section-s4",
    "components": [
      {
        "category": "product-grid-section",
        "name": "webshop-cross-sell-section",
        "props": {
          "title": "Complete the kit",
          "products": [
            {
              "title": "Aero Run 2",
              "subtitle": "Neutral road running shoe",
              "price": 139,
              "compare-at": 169,
              "image": "photo-1542291026-7eec264c27ff",
              "hover-image": "photo-1597892657493-6847b9640bac",
              "badges": [
                "sale",
                "bestseller"
              ],
              "rating": {
                "avg": 4.7,
                "count": 183
              },
              "swatches": [
                "#d6341f",
                "#f1efe9",
                "#7c7f86"
              ],
              "data-prompt": "Show product Aero Run 2"
            },
            {
              "title": "Merino run sock 3-pack",
              "subtitle": "Cushioned ankle sock",
              "price": 29,
              "image": "photo-1773665230184-5fd8cb4fc928",
              "hover-image": "photo-1631024724206-6ccc65ab31bd",
              "badges": [
                "bestseller"
              ],
              "rating": {
                "avg": 4.8,
                "count": 530
              },
              "swatches": [],
              "data-prompt": "Show product Merino run sock 3-pack"
            }
          ]
        }
      }
    ]
  },
  {
    "section_id": "section-s5",
    "components": [
      {
        "category": "sticky-section",
        "name": "webshop-sticky-add-to-bag-section",
        "props": {
          "title": "Aero Stable",
          "options": [
            "Cobalt / White",
            "EU 42"
          ],
          "price": 149
        }
      }
    ]
  }
]
```
