# First visit to checkout

A new shopper lands on the empty page, browses running shoes, opens one, adds it to the bag and checks out. Shows the frame, the homepage order from the Shared rules, and how cart steps use only CART INFO.

## Step 1 · First visit

**User:** _Opens the site. The page is empty._

**Why:** First response: the frame (announcement, header, mobile menu, footer) plus the homepage in the Shared rules order.

```json
[
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
  },
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
              "children": [
                {
                  "label": "Road",
                  "data-prompt": "Show category Road"
                },
                {
                  "label": "Trail",
                  "data-prompt": "Show category Trail"
                },
                {
                  "label": "Track",
                  "data-prompt": "Show category Track"
                }
              ],
              "promo": {
                "label": "Trail",
                "image": "photo-1718248028293-934f04a578db",
                "data-prompt": "Show category Trail"
              }
            },
            {
              "label": "Training",
              "data-prompt": "Show category Training"
            },
            {
              "label": "Football",
              "data-prompt": "Show category Football"
            },
            {
              "label": "Outdoor",
              "data-prompt": "Show category Outdoor"
            },
            {
              "label": "Fan gear",
              "data-prompt": "Show category Fan gear"
            },
            {
              "label": "Sale",
              "data-prompt": "Show category Sale"
            }
          ]
        }
      }
    ]
  },
  {
    "section_id": "section-s3",
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
                {
                  "label": "Road",
                  "data-prompt": "Show category Road"
                },
                {
                  "label": "Trail",
                  "data-prompt": "Show category Trail"
                },
                {
                  "label": "Track",
                  "data-prompt": "Show category Track"
                }
              ]
            },
            {
              "label": "Training",
              "data-prompt": "Show category Training"
            },
            {
              "label": "Football",
              "data-prompt": "Show category Football"
            },
            {
              "label": "Outdoor",
              "data-prompt": "Show category Outdoor"
            },
            {
              "label": "Fan gear",
              "data-prompt": "Show category Fan gear"
            },
            {
              "label": "Sale",
              "data-prompt": "Show category Sale"
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
        "category": "hero-section",
        "name": "webshop-hero-section",
        "unique": true,
        "props": {
          "eyebrow": "Trail season",
          "title": "Built for the long way round",
          "text": "Waterproof trail shoes, merino socks and gaiters, in stock and shipping today.",
          "image": "photo-1718248028293-934f04a578db",
          "cta": {
            "label": "Shop trail",
            "data-prompt": "Show category Trail"
          },
          "tiles": [
            {
              "label": "Running",
              "image": "photo-1590333748338-d629e4564ad9",
              "data-prompt": "Show category Running"
            },
            {
              "label": "Training",
              "image": "photo-1517836357463-d25dfeac3438",
              "data-prompt": "Show category Training"
            },
            {
              "label": "Football",
              "image": "photo-1689785280879-98b0fb52084d",
              "data-prompt": "Show category Football"
            },
            {
              "label": "Outdoor",
              "image": "photo-1600100315778-850119b19220",
              "data-prompt": "Show category Outdoor"
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
              "title": "Trail Max GTX",
              "subtitle": "Waterproof trail running shoe",
              "price": 179,
              "image": "photo-1617179395455-101d786b4b7d",
              "hover-image": "photo-1718248028293-934f04a578db",
              "badges": [
                "bestseller"
              ],
              "rating": {
                "avg": 4.6,
                "count": 97
              },
              "swatches": [
                "#f26a21",
                "#5e6b3f"
              ],
              "data-prompt": "Show product Trail Max GTX"
            },
            {
              "title": "Ridge Mid",
              "subtitle": "Leather hiking boot",
              "price": 189,
              "image": "photo-1575987116913-e96e7d490b8a",
              "hover-image": "photo-1600100315778-850119b19220",
              "badges": [
                "bestseller"
              ],
              "rating": {
                "avg": 4.7,
                "count": 201
              },
              "swatches": [
                "#7a4b25",
                "#1b1b1b"
              ],
              "data-prompt": "Show product Ridge Mid"
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
    "section_id": "section-s6",
    "components": [
      {
        "category": "size-section",
        "name": "webshop-size-section",
        "props": {
          "title": "Shop by size",
          "text": "Only shows what's in stock in your size.",
          "sizes": [
            "39",
            "40",
            "41",
            "42",
            "43",
            "44",
            "45",
            "46"
          ]
        }
      }
    ]
  },
  {
    "section_id": "section-s7",
    "components": [
      {
        "category": "editorial-section",
        "name": "webshop-editorial-section",
        "props": {
          "eyebrow": "Journal",
          "title": "How to choose a trail shoe",
          "text": "Lugs, drop, rock plates and membranes explained in five minutes.",
          "image": "photo-1530143311094-34d807799e8f",
          "cta": {
            "label": "Read the guide",
            "data-prompt": "How do I choose a trail shoe?"
          },
          "reverse": false
        }
      }
    ]
  },
  {
    "section_id": "section-s8",
    "components": [
      {
        "category": "press-section",
        "name": "webshop-press-section",
        "props": {
          "quotes": [
            {
              "quote": "The best value road shoe of the year.",
              "source": "Runner's World"
            },
            {
              "quote": "Zagreb's answer to the big sports chains.",
              "source": "Jutarnji list"
            },
            {
              "quote": "Trail Max GTX: dry feet, finally.",
              "source": "Outside"
            }
          ]
        }
      }
    ]
  },
  {
    "section_id": "section-s9",
    "components": [
      {
        "category": "trust-section",
        "name": "webshop-trust-section",
        "unique": true,
        "props": {
          "items": [
            {
              "icon": "truck",
              "title": "Free shipping over €75",
              "text": "2–4 working days, EU-wide"
            },
            {
              "icon": "arrow-back-up",
              "title": "30-day returns",
              "text": "Prepaid label in the box"
            },
            {
              "icon": "shield-check",
              "title": "2-year warranty",
              "text": "On every pair of shoes"
            },
            {
              "icon": "map-pin",
              "title": "Shipped from Zagreb",
              "text": "Same-day dispatch if ordered by 14:00"
            }
          ]
        }
      }
    ]
  },
  {
    "section_id": "section-s10",
    "components": [
      {
        "category": "footer-section",
        "name": "webshop-footer-section",
        "unique": true,
        "props": {
          "logo": "Stride",
          "tagline": "Footwear and sport gear, shipped from Zagreb to the whole EU.",
          "newsletter": {
            "label": "Get 10% off your first order",
            "hint": "One email a week at most. Unsubscribe any time."
          },
          "columns": [
            {
              "title": "Shop",
              "links": [
                {
                  "label": "Running",
                  "data-prompt": "Show category Running"
                },
                {
                  "label": "Training",
                  "data-prompt": "Show category Training"
                },
                {
                  "label": "Football",
                  "data-prompt": "Show category Football"
                },
                {
                  "label": "Outdoor",
                  "data-prompt": "Show category Outdoor"
                },
                {
                  "label": "Fan gear",
                  "data-prompt": "Show category Fan gear"
                }
              ]
            },
            {
              "title": "Help",
              "links": [
                {
                  "label": "Shipping & returns",
                  "data-prompt": "Show shipping and returns"
                },
                {
                  "label": "Size guide",
                  "data-prompt": "Show the size guide"
                },
                {
                  "label": "Track order",
                  "data-prompt": "How do I track my order?"
                },
                {
                  "label": "Contact",
                  "data-prompt": "How can I contact you?"
                }
              ]
            },
            {
              "title": "Company",
              "links": [
                {
                  "label": "About",
                  "data-prompt": "Tell me about Stride"
                },
                {
                  "label": "Sustainability",
                  "data-prompt": "What do you do for sustainability?"
                },
                {
                  "label": "Press",
                  "data-prompt": "What does the press say about you?"
                }
              ]
            }
          ],
          "payments": [
            "VISA",
            "MASTERCARD",
            "APPLE PAY",
            "GOOGLE PAY",
            "PAYPAL",
            "KLARNA",
            "SEPA"
          ],
          "legal": "© 2026 Stride d.o.o. · Zagreb · Prototype, no real orders"
        }
      }
    ]
  }
]
```

## Step 2 · Browses a category

**User:** Show category Running _(taps the Running tile)_

**Why:** A category request is one `webshop-category-section` block, sent alone. All six Running products fit, so `total` equals the products sent.

```json
[
  {
    "section_id": "section-s11",
    "components": [
      {
        "category": "category-section",
        "name": "webshop-category-section",
        "props": {
          "breadcrumbs": [
            "Home",
            "Running"
          ],
          "title": "Running",
          "intro": "Road, trail and track shoes. If you don't know your pronation, start with a neutral road shoe and our fit guide.",
          "subcategories": [
            {
              "label": "All",
              "active": true
            },
            {
              "label": "Road",
              "data-prompt": "Show category Road"
            },
            {
              "label": "Trail",
              "data-prompt": "Show category Trail"
            },
            {
              "label": "Track",
              "data-prompt": "Show category Track"
            }
          ],
          "filters": [
            {
              "label": "Size",
              "options": [
                {
                  "label": "EU 39"
                },
                {
                  "label": "EU 40"
                },
                {
                  "label": "EU 41"
                },
                {
                  "label": "EU 42"
                },
                {
                  "label": "EU 43"
                },
                {
                  "label": "EU 44"
                }
              ]
            },
            {
              "label": "Surface",
              "options": [
                {
                  "label": "Road",
                  "count": 2
                },
                {
                  "label": "Trail",
                  "count": 1
                },
                {
                  "label": "Track",
                  "count": 1
                }
              ]
            },
            {
              "label": "Price",
              "options": [
                {
                  "label": "Under €50",
                  "count": 2
                },
                {
                  "label": "€100 – €150",
                  "count": 3
                },
                {
                  "label": "Over €150",
                  "count": 1
                }
              ]
            }
          ],
          "applied": [],
          "sort-options": [
            "Featured",
            "Newest",
            "Top rated",
            "Price: low to high",
            "Price: high to low"
          ],
          "total": 6,
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
            },
            {
              "title": "Trail Max GTX",
              "subtitle": "Waterproof trail running shoe",
              "price": 179,
              "image": "photo-1617179395455-101d786b4b7d",
              "hover-image": "photo-1718248028293-934f04a578db",
              "badges": [
                "bestseller"
              ],
              "rating": {
                "avg": 4.6,
                "count": 97
              },
              "swatches": [
                "#f26a21",
                "#5e6b3f"
              ],
              "data-prompt": "Show product Trail Max GTX"
            },
            {
              "title": "Velocity Spike",
              "subtitle": "Track sprint spike",
              "price": 129,
              "image": "photo-1612387605830-d452ad0ab7c2",
              "hover-image": "photo-1598151639582-8ea0d33cd8ce",
              "badges": [],
              "rating": {
                "avg": 4.3,
                "count": 21
              },
              "swatches": [
                "#d6341f"
              ],
              "data-prompt": "Show product Velocity Spike"
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
            },
            {
              "title": "Run cap",
              "subtitle": "Lightweight, packable",
              "price": 25,
              "image": "photo-1758922769578-68c5ba000d87",
              "hover-image": "photo-1461896836934-ffe607ba8211",
              "badges": [],
              "rating": {
                "avg": 4.7,
                "count": 142
              },
              "swatches": [
                "#1b1b1b",
                "#f26a21"
              ],
              "data-prompt": "Show product Run cap"
            }
          ]
        }
      }
    ]
  }
]
```

## Step 3 · Opens a product

**User:** Show product Aero Run 2

**Why:** `webshop-product-section`, then its cross-sell list from STORE INFO, then the sticky add-to-bag bar as the last component.

```json
[
  {
    "section_id": "section-s12",
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
          "eyebrow": "Neutral road running shoe",
          "title": "Aero Run 2",
          "brand": "Stride",
          "price": 139,
          "compare-at": 169,
          "badges": [
            "sale",
            "bestseller"
          ],
          "rating": {
            "avg": 4.7,
            "count": 183
          },
          "images": [
            "photo-1542291026-7eec264c27ff",
            "photo-1597892657493-6847b9640bac",
            "photo-1590333748338-d629e4564ad9"
          ],
          "colors": [
            {
              "label": "Signal Red / White",
              "hex": "#d6341f"
            },
            {
              "label": "White / Orange",
              "hex": "#f1efe9"
            },
            {
              "label": "Storm Grey",
              "hex": "#7c7f86"
            }
          ],
          "sizes": [
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
              "available": false
            },
            {
              "label": "44",
              "available": true
            },
            {
              "label": "45",
              "available": true
            }
          ],
          "summary": "A light daily trainer with a roomy toe box and an 8 mm drop.",
          "highlights": [
            "268 g in EU 42",
            "8 mm heel-to-toe drop",
            "Recycled rubber outsole"
          ],
          "description": "The Aero Run 2 is the shoe most of our customers run most of their kilometres in. The engineered mesh upper is thinner than last year's but holds the midfoot better.\n\nIt is a neutral shoe: if you overpronate, look at the Aero Stable instead.",
          "specs": [
            {
              "group": "Build",
              "rows": [
                [
                  "Upper",
                  "Engineered mesh, 62% recycled polyester"
                ],
                [
                  "Midsole",
                  "EVA foam, 32 / 24 mm"
                ],
                [
                  "Weight",
                  "268 g (EU 42)"
                ]
              ]
            },
            {
              "group": "Use",
              "rows": [
                [
                  "Surface",
                  "Road, light gravel"
                ],
                [
                  "Pronation",
                  "Neutral"
                ]
              ]
            }
          ],
          "fit": {
            "note": "Runs true to size. Narrow feet: consider half a size down.",
            "testimonials": [
              {
                "width": "narrow",
                "text": "Half a size down and the heel lock is perfect.",
                "name": "Ana, EU 38"
              },
              {
                "width": "normal",
                "text": "True to size. Toe box is roomier than the Aero Run 1.",
                "name": "Marko, EU 43"
              }
            ]
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
          "qa": [
            {
              "q": "Is it waterproof?",
              "a": "No. For wet trails look at the Trail Max GTX."
            }
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
              "reply": {
                "by": "Stride",
                "text": "Sorry about the fit, Tomislav. The Aero Run 2 is a medium last; our Trail Max comes in a wide fit."
              }
            }
          ]
        }
      }
    ]
  },
  {
    "section_id": "section-s13",
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
              "badges": [
                "bestseller"
              ],
              "rating": {
                "avg": 4.8,
                "count": 530
              },
              "swatches": [],
              "data-prompt": "Show product Merino run sock 3-pack"
            },
            {
              "title": "Trail Max GTX",
              "subtitle": "Waterproof trail running shoe",
              "price": 179,
              "image": "photo-1617179395455-101d786b4b7d",
              "hover-image": "photo-1718248028293-934f04a578db",
              "badges": [
                "bestseller"
              ],
              "rating": {
                "avg": 4.6,
                "count": 97
              },
              "swatches": [
                "#f26a21",
                "#5e6b3f"
              ],
              "data-prompt": "Show product Trail Max GTX"
            },
            {
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
            },
            {
              "title": "Run cap",
              "subtitle": "Lightweight, packable",
              "price": 25,
              "image": "photo-1758922769578-68c5ba000d87",
              "hover-image": "photo-1461896836934-ffe607ba8211",
              "badges": [],
              "rating": {
                "avg": 4.7,
                "count": 142
              },
              "swatches": [
                "#1b1b1b",
                "#f26a21"
              ],
              "data-prompt": "Show product Run cap"
            }
          ]
        }
      }
    ]
  },
  {
    "section_id": "section-s14",
    "components": [
      {
        "category": "sticky-section",
        "name": "webshop-sticky-add-to-bag-section",
        "props": {
          "title": "Aero Run 2",
          "options": [
            "Signal Red / White",
            "EU 42"
          ],
          "price": 139
        }
      }
    ]
  }
]
```

## Step 4 · Adds to bag

**User:** _Frontend reports: Aero Run 2, Signal Red / White, EU 42 added to the bag._

**Why:** Adding is a frontend action. The agent only confirms it with a toast; it never changes the bag.

```json
[
  {
    "section_id": "section-s15",
    "components": [
      {
        "category": "toast-section",
        "name": "webshop-toast-section",
        "props": {
          "message": "Added to bag · Aero Run 2",
          "action": {
            "label": "View bag",
            "data-prompt": "Show my bag"
          }
        }
      }
    ]
  }
]
```

## Step 5 · Opens the bag

**User:** Show my bag

**Why:** Lines and totals come straight from CART INFO. €139 is over the €75 threshold, so shipping is free.

```json
[
  {
    "section_id": "section-s16",
    "components": [
      {
        "category": "cart-section",
        "name": "webshop-cart-section",
        "unique": true,
        "props": {
          "variant": "filled",
          "lines": [
            {
              "title": "Aero Run 2",
              "options": [
                "Signal Red / White",
                "EU 42"
              ],
              "qty": 1,
              "max": 10,
              "price": 139,
              "image": "photo-1542291026-7eec264c27ff",
              "data-prompt": "Show product Aero Run 2"
            }
          ],
          "free-shipping-over": 75,
          "subtotal": 139,
          "shipping": 0,
          "vat": 27.8,
          "total": 139
        }
      }
    ]
  }
]
```

## Step 6 · Checks out

**User:** Checkout

**Why:** Sent alone. The form, validation and Pay button are static; the agent sends delivery options, countries and the CART INFO summary.

```json
[
  {
    "section_id": "section-s17",
    "components": [
      {
        "category": "checkout-section",
        "name": "webshop-checkout-section",
        "unique": true,
        "props": {
          "store": "Stride",
          "delivery": [
            {
              "id": "standard",
              "label": "Standard · 2–4 working days",
              "note": "DPD or GLS to your door",
              "price": 0
            },
            {
              "id": "pickup",
              "label": "Pickup point · 2–4 working days",
              "note": "Any DPD Pickup or Box",
              "price": 0
            },
            {
              "id": "express",
              "label": "Express · next working day",
              "note": "Order by 14:00, Croatia only",
              "price": 9.9
            }
          ],
          "countries": [
            "Croatia",
            "Austria",
            "Germany",
            "Italy",
            "Netherlands",
            "Slovenia",
            "Other EU country"
          ],
          "lines": [
            {
              "title": "Aero Run 2",
              "options": [
                "Signal Red / White",
                "EU 42"
              ],
              "qty": 1,
              "price": 139,
              "image": "photo-1542291026-7eec264c27ff"
            }
          ],
          "subtotal": 139,
          "shipping": 0,
          "vat": 27.8,
          "total": 139,
          "payments": [
            "VISA",
            "MASTERCARD",
            "APPLE PAY",
            "GOOGLE PAY",
            "PAYPAL",
            "KLARNA",
            "SEPA"
          ]
        }
      }
    ]
  }
]
```
