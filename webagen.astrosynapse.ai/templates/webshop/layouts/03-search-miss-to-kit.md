# Search miss to a full kit

A shopper misspells a search, hits a size that's sold out, recovers with a neighbouring size and then asks what else to bring. Shows the search dropdown, the empty state's way out, a filtered category and a kit.

## Step 1 · Misspelled search

**User:** trial shoe

**Why:** A short, misspelled query gets `stride-search-suggest`. The spelling is corrected silently in the matches and in the data-prompt; the query stays as typed.

```json
[
  {
    "section_id": "section-s1",
    "components": [
      {
        "category": "search-section",
        "name": "stride-search-suggest",
        "props": {
          "query": "trial shoe",
          "data-prompt": "Search trail shoe",
          "categories": [
            {
              "label": "Trail",
              "data-prompt": "Show category Trail"
            }
          ],
          "products": [
            {
              "title": "Trail Max GTX",
              "subtitle": "Waterproof trail running shoe",
              "price": 179,
              "image": "photo-1617179395455-101d786b4b7d",
              "data-prompt": "Show product Trail Max GTX"
            },
            {
              "title": "Trail gaiter",
              "subtitle": "Low debris gaiter",
              "price": 29,
              "image": "photo-1655976795374-6b519928f1e1",
              "data-prompt": "Show product Trail gaiter"
            }
          ]
        }
      }
    ]
  }
]
```

## Step 2 · Filters to a sold-out size

**User:** Show Trail filtered by EU 41

**Why:** Trail Max GTX is sold out in EU 41 in STORE INFO, so nothing matches: `stride-empty-results` with a way out, not an empty category.

```json
[
  {
    "section_id": "section-s2",
    "components": [
      {
        "category": "empty-section",
        "name": "stride-empty-results",
        "props": {
          "title": "Nothing matches those filters",
          "text": "No trail shoe is in stock in EU 41 right now. Remove the size, or try a neighbouring one.",
          "actions": [
            {
              "label": "Remove size filter",
              "data-prompt": "Show category Trail"
            },
            {
              "label": "Show EU 42",
              "data-prompt": "Show Trail filtered by EU 42"
            }
          ],
          "tiles": []
        }
      }
    ]
  }
]
```

## Step 3 · Takes the way out

**User:** Show Trail filtered by EU 42

**Why:** The filtered category, with the applied size as a removable pill and only in-stock sizes in the Size filter.

```json
[
  {
    "section_id": "section-s3",
    "components": [
      {
        "category": "category-section",
        "name": "stride-category",
        "props": {
          "breadcrumbs": [
            "Home",
            "Running",
            "Trail"
          ],
          "title": "Trail",
          "intro": "Grip, protection and waterproofing for everything that isn't a road. Only shoes in stock in your size are shown.",
          "subcategories": [
            {
              "label": "All",
              "data-prompt": "Show category Running"
            },
            {
              "label": "Road",
              "data-prompt": "Show category Road"
            },
            {
              "label": "Trail",
              "active": true
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
                  "label": "EU 40"
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
              "label": "Colour",
              "options": [
                {
                  "label": "Orange",
                  "count": 1
                },
                {
                  "label": "Green",
                  "count": 1
                }
              ]
            }
          ],
          "applied": [
            {
              "group": "Size",
              "label": "EU 42"
            }
          ],
          "sort-options": [
            "Featured",
            "Newest",
            "Top rated",
            "Price: low to high",
            "Price: high to low"
          ],
          "total": 1,
          "products": [
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
            }
          ]
        }
      }
    ]
  }
]
```

## Step 4 · Asks what else to bring

**User:** What else do I need for my first trail race?

**Why:** A kit for one activity is `stride-edit`, built only from STORE INFO products.

```json
[
  {
    "section_id": "section-s4",
    "components": [
      {
        "category": "edit-section",
        "name": "stride-edit",
        "props": {
          "eyebrow": "The kit",
          "title": "Everything for your first trail race",
          "text": "A shoe that grips in mud, socks that don't rub at kilometre twenty, a gaiter for the grit and a cap for sun or rain. Four things, nothing extra.",
          "image": "photo-1530143311094-34d807799e8f",
          "products": [
            {
              "title": "Trail Max GTX",
              "subtitle": "Waterproof trail running shoe",
              "price": 179,
              "image": "photo-1617179395455-101d786b4b7d",
              "data-prompt": "Show product Trail Max GTX"
            },
            {
              "title": "Merino run sock 3-pack",
              "subtitle": "Cushioned ankle sock",
              "price": 29,
              "image": "photo-1773665230184-5fd8cb4fc928",
              "data-prompt": "Show product Merino run sock 3-pack"
            },
            {
              "title": "Trail gaiter",
              "subtitle": "Low debris gaiter",
              "price": 29,
              "image": "photo-1655976795374-6b519928f1e1",
              "data-prompt": "Show product Trail gaiter"
            },
            {
              "title": "Run cap",
              "subtitle": "Lightweight, packable",
              "price": 25,
              "image": "photo-1758922769578-68c5ba000d87",
              "data-prompt": "Show product Run cap"
            }
          ]
        }
      }
    ]
  }
]
```
