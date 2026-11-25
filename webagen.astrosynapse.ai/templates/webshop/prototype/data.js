// Stride prototype data: routes (prompt → page) and the props for overlays the frontend renders.
// Edit freely; components.js renders these with the same markup as the docs previews.
window.STRIDE = {
  "routes": {
    "Show the homepage": "index.html",
    "Show new arrivals": "new-in.html",
    "Show category Running": "running.html",
    "Show category Trail": "trail.html",
    "Show Trail filtered by EU 42": "trail-eu-42.html",
    "Show Trail filtered by EU 41": "trail-eu-41.html",
    "Search trail shoe": "trail.html",
    "Search running": "running.html",
    "Show product Aero Run 2": "aero-run-2.html",
    "Show product Aero Stable": "aero-stable.html",
    "Show product Trail Max GTX": "trail-max-gtx.html",
    "How do I choose a trail shoe?": "how-to-choose-a-trail-shoe.html",
    "What else do I need for my first trail race?": "how-to-choose-a-trail-shoe.html#kit",
    "Show the journal": "journal.html",
    "Show shipping and returns": "help.html#shipping",
    "Show the size guide": "help.html#size-guide",
    "Checkout": "checkout.html"
  },
  "bagEmpty": {
    "variant": "empty",
    "title": "Your bag is empty",
    "text": "Start with our best sellers.",
    "cta": {
      "label": "Shop now",
      "data-prompt": "Show category Running"
    }
  },
  "bagDefaults": {
    "free-shipping-over": 75,
    "shipping": 4.9,
    "vatRate": 0.25
  },
  "menu": {
    "nav": [
      {
        "label": "New in",
        "data-prompt": "Show new arrivals"
      },
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
        "label": "Journal",
        "data-prompt": "Show the journal"
      },
      {
        "label": "Sale",
        "data-prompt": "Show category Sale"
      }
    ]
  },
  "quickView": {
    "Aero Run 2": {
      "eyebrow": "Neutral road running shoe",
      "title": "Aero Run 2",
      "price": 139,
      "compare-at": 169,
      "rating": {
        "avg": 4.7,
        "count": 183
      },
      "image": "photo-1542291026-7eec264c27ff",
      "summary": "A light daily trainer with a roomy toe box and an 8 mm drop.",
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
      "data-prompt": "Show product Aero Run 2"
    }
  },
  "search": {
    "trail": {
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
    },
    "run": {
      "query": "runing",
      "data-prompt": "Search running",
      "categories": [
        {
          "label": "Running",
          "data-prompt": "Show category Running"
        }
      ],
      "products": [
        {
          "title": "Aero Run 2",
          "subtitle": "Neutral road running shoe",
          "price": 139,
          "image": "photo-1542291026-7eec264c27ff",
          "data-prompt": "Show product Aero Run 2"
        },
        {
          "title": "Aero Stable",
          "subtitle": "Supportive road shoe for overpronators",
          "price": 149,
          "image": "photo-1571008887538-b36bb32f4571",
          "data-prompt": "Show product Aero Stable"
        },
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
        }
      ]
    }
  }
};
