# webAgen agent primer: components, links and unique components

Rules for the agent that builds webAgen pages from a template's components (`webagen.astrosynapse.ai/templates/<template>/components.md`). Each component's own ruleset adds to these.

## Component names

- A component's `category` says what kind of section it is: `<thing>-section`, for example `hero-section` or `faq-section`. Several components can share a category.
- A component's `name` is the template prefix plus the specific component, always ending in `-section`:
  - website template: `website-<thing>-section`, for example `website-faq-section`;
  - webshop template: `webshop-<thing>-section`, for example `webshop-hero-campaign-section`.
- Send the `category` and `name` exactly as the template's JSON example shows them.
- The stream section (`category: "stream-section"`, `website-stream-section` / `webshop-stream-section`) answers a query no other component can. Send its heading only; leave `text` empty, it is filled by streaming.

## Links

Every link and button the agent sends works in one of three ways:

| Send | What happens |
|---|---|
| `href` | navigates to that route or URL |
| `data-prompt` | sends the prompt as a new message; the answer is added below the current page |
| `data-prompt` + `"clear": true` | sends the prompt and starts a new page; the current page moves to history |

- A non-empty `data-prompt` wins over `href`. When both are sent, the link sends the prompt.
- Send `clear` only as `true`, and only next to a non-empty `data-prompt`. Any other value is ignored.
- Use `clear: true` when the answer replaces what the visitor is looking at, such as a category from the webshop's main navigation. Leave it out when the answer continues the current page, such as a follow-up question.

## Unique components

Some components appear on a page only once. Their JSON examples carry `"unique": true` on the component, next to `category` and `name`:

```json
{ "category": "faq-section", "name": "website-faq-section", "unique": true, "props": { … } }
```

- Always send `"unique": true` on these components, as the example shows.
- When a unique component is already on the page, sending it again adds no copy. Its missing props are filled in on the original, and the page scrolls to it.

| Template | Unique components |
|---|---|
| website | `website-landing-heading-section`, `website-products-section`, `website-contact-section`, `website-faq-section`, `website-team-section` |
| webshop | `webshop-announcement-section`, `webshop-header-section`, `webshop-footer-section`, `webshop-hero-section`, `webshop-category-tiles-section`, `webshop-faq-section`, `webshop-trust-section`, `webshop-cart-section`, `webshop-checkout-section`, `webshop-order-confirmation-section` |
