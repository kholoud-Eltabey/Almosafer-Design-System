---
name: Cart Summary
tier: pattern
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Atlassian Design System — https://atlassian.design
---

# Cart Summary

---

## 1. Overview

The cart summary pattern presents the user's selected items before checkout. It displays each item with its image, title, variant details, quantity controls, and line price, followed by a totals breakdown and a primary checkout action. It is the final review surface before the user commits to a purchase, and must communicate item details, pricing, and totals with complete accuracy and zero ambiguity.

The pattern operates in two placement contexts: a compact sidebar drawer for quick review after adding an item, and a full cart page for detailed review before proceeding to checkout. Both share the same item row structure and totals logic. The full cart page adds per-item detail and an order summary card.

---

## 2. When to Use

- Presenting the user's current cart contents for review before navigating to checkout.
- Surfacing a quick cart preview as a slide-in drawer when an item is added to the cart.
- Providing a dedicated full-page cart review surface accessible at any point during the session.

---

## 3. When Not to Use

- **Checkout flow** — Once the user has entered the checkout funnel (address, payment), the cart is presented as a read-only order summary sidebar, not as the full cart summary pattern.
- **Order confirmation** — After a successful order, show the placed order details using a receipt or order confirmation layout, not this pattern.
- **Browsing contexts** — Do not embed a cart summary inside a catalog page or product detail page. Use a cart drawer triggered by an add-to-cart action instead.
- **Wishlists or saved items** — Saved items are not committed to a cart and follow different interaction rules. Use a separate saved-items pattern.

---

## 4. Composition

| Atom / Pattern | Role |
|---|---|
| **icon-button** atom | Remove item action (one per row); quantity decrement and increment controls flanking the quantity input |
| **input** atom | Quantity field within the quantity stepper; promo code field in the totals section |
| **button** atom | Primary checkout action; secondary continue shopping or view full cart action; promo code apply trigger |
| **tag** atom | Item variant label — size, color, or other selected attribute displayed on each item row |
| **empty-state** pattern | Displayed in the item list area when the cart contains no items |
| **spinner** atom | Loading indicator within the checkout button during the checkout navigation request; inline loading indicator during quantity update and item removal |

Additional structural elements (not atoms):

| Element | Role |
|---|---|
| **Cart container** | The outermost wrapper. Establishes the variant context (sidebar drawer or full-page layout). |
| **Item list** | A `<ul>` containing one `<li>` per cart item. Scrollable in the sidebar variant. |
| **Item row** | A single cart line item. Contains the product thumbnail, content column (title, variant tags), quantity stepper, line total, and remove button. |
| **Product thumbnail** | A fixed-size image container for the item's product image. Uses the same aspect ratio and placeholder treatment as the compact catalog-card variant. |
| **Totals section** | A structured breakdown of subtotal, delivery, discounts, and final order total. Rendered as a `<dl>` (definition list) for semantic correctness. |
| **Order summary card** | Full-page variant only. A visually separated card on the inline-end column containing the totals section and the checkout action. Sticky on desktop scroll. |
| **Promo code group** | Optional. An input atom and apply button atom for entering a promotional or discount code. Inline success or error feedback below the field. |

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Cart container — background | `color.background.surface` | Default surface for the cart container |
| Cart container — border | `color.border.default` | Container edge, 1px, sidebar and order summary card |
| Cart container — radius (sidebar) | `radius.xl` | Rounding on the sidebar drawer container |
| Cart container — radius (order summary card) | `radius.xl` | Rounding on the full-page order summary card |
| Cart container — padding | `spacing.lg` | Internal padding for sidebar and order summary card |
| Page background | `color.background.sunken` | Recessed canvas behind the full-page cart layout |
| Item list — padding (block) | `spacing.md` | Top and bottom padding inside the item list |
| Item row — divider | `color.border.subtle` | Horizontal rule between adjacent item rows |
| Item row — padding (block) | `spacing.md` | Top and bottom padding within each item row |
| Item row — gap (image to content) | `spacing.md` | Horizontal gap between thumbnail and content column |
| Item row — error background | `color.background.danger` | Row background when an item is unavailable or has an error |
| Item row — error border | `color.border.danger` | Row border when an item is in an error state |
| Product thumbnail — background | `color.background.subtle` | Placeholder color while image loads |
| Product thumbnail — radius | `radius.md` | Corner rounding on the product thumbnail |
| Product thumbnail — size | `spacing.layout.sm` | Fixed width and height of the thumbnail |
| Item title — font size | `text.body` | Product name in each row |
| Item title — color | `color.text.primary` | Full-contrast item title |
| Item title — color (unavailable) | `color.text.disabled` | Suppressed title when item is unavailable |
| Item variant label — handled by tag atom | — | Size, color, or other variant attribute |
| Unit price — font size | `text.body.sm` | Price per single unit, shown below title |
| Unit price — color | `color.text.secondary` | Supporting hierarchy for unit price |
| Line total — font size | `text.body` | Quantity × unit price for that row |
| Line total — color | `color.text.primary` | Full-contrast line total |
| Line total — font weight | Used with `text.body` | Semibold to distinguish the total from supporting text |
| Quantity stepper — gap | `spacing.xs` | Gap between decrement button, input, and increment button |
| Error message (inline) — font size | `text.body.sm` | Inline error below an unavailable item |
| Error message (inline) — color | `color.text.danger` | Error text color |
| Totals section — background | `color.background.subtle` | Recessed background behind the totals rows |
| Totals section — padding | `spacing.md` | Padding inside the totals area |
| Totals section — gap between rows | `spacing.sm` | Vertical gap between each totals row |
| Totals section — divider (above total row) | `color.border.subtle` | Separator above the final total row |
| Totals row label — font size | `text.body.sm` | Subtotal, Delivery, Discount label text |
| Totals row label — color | `color.text.secondary` | Supporting hierarchy for totals labels |
| Totals row value — font size | `text.body.sm` | Subtotal, Delivery, Discount value text |
| Totals row value — color | `color.text.primary` | Value text in totals rows |
| Discount value — color | `color.text.success` | Savings amount shown in green |
| Total label — font size | `text.heading.sm` | "Total" label in the final row |
| Total label — color | `color.text.primary` | Full-contrast total label |
| Total value — font size | `text.heading.sm` | Final order total amount |
| Total value — color | `color.text.primary` | Full-contrast total value |
| Actions area — gap | `spacing.sm` | Gap between stacked action buttons |
| Actions area — padding (block-start) | `spacing.md` | Space above the action row |

---

## 6. Variants

### Compact summary (sidebar)

A slide-in drawer positioned at the inline-end edge of the viewport. Triggered when the user adds an item to the cart or opens the cart icon. The item list is scrollable when content exceeds the viewport height. The totals section and checkout button are fixed at the block-end of the drawer and remain visible while the user scrolls through items.

The compact variant shows each item in a condensed row: thumbnail, title, variant tag, quantity stepper, line total, and remove button. Unit price per item is omitted when space is constrained. A "View full cart" link atom at the block-end of the actions area navigates to the full cart page.

### Full cart page

A dedicated page at the cart URL. On desktop viewports, a two-column layout places the item list on the inline-start (wider) column and the order summary card on the inline-end (narrower, sticky) column. On mobile viewports, the layout is single-column with the item list above and the order summary card below.

The full cart page shows complete item detail per row: thumbnail, title, all variant tags, unit price, quantity stepper, line total, and remove button. The order summary card contains the full totals breakdown including optional delivery estimate, discount rows, and the final total. An optional promo code input group appears inside the order summary card above the totals.

---

## 7. Behavior

### Update quantity

The quantity stepper consists of a decrement icon-button, a number input atom, and an increment icon-button. Clicking increment increases the quantity by one. Clicking decrement decreases by one. The user may also type directly into the quantity input and commit by pressing Enter or blurring the field.

When the quantity changes, the line total for that row recalculates immediately (optimistic update). An async request persists the change. The checkout button and totals section enter a brief loading state while the totals are recalculated server-side. If the request fails, the quantity reverts to its previous value and an inline error message appears below the affected row.

When the user decrements a quantity that is already at 1, the decrement button triggers item removal (see Remove items below) rather than setting quantity to zero. The minimum allowed quantity is 1.

### Remove items

The icon-button on each item row removes that item from the cart. The row is removed from the DOM immediately (optimistic). The totals section updates. An async request persists the removal. If the request fails, the item row is restored and an inline error appears.

After removal, focus moves to the next item row in the list. If the removed item was the last one, focus moves to the empty state's primary action button.

### Recalculate totals

Any change to quantities or item removal triggers a recalculation of the subtotal. Delivery cost, discount amounts, and the final total are updated to reflect the new subtotal. During recalculation, the totals section values are replaced with a loading indicator. The checkout button is disabled while totals are recalculating to prevent the user from proceeding with stale totals.

### Promo code (optional)

An input atom accepts a promotional or discount code. Pressing the apply button atom or Enter submits the code. On success, a discount row is added to the totals section showing the savings in `color.text.success`. On failure, an inline error below the input describes the problem: "This code has expired" or "Code not recognised". A successfully applied code can be removed by a dismiss control on the discount row tag.

### Proceed to checkout

The checkout button is the primary action. Pressing it initiates the checkout navigation. The button enters its loading state (spinner atom within button atom) immediately to prevent duplicate submissions. If the user's session has expired or the cart has changed (an item became unavailable), an error state is surfaced before navigation proceeds.

### Empty cart state

When all items are removed, the item list is hidden and the empty-state pattern is shown in its place. The totals section and checkout button are also hidden. The empty state uses the no-data variant with an action pointing back to the catalog.

### Item unavailable state

If an item in the cart becomes unavailable between sessions (out of stock, delisted), its row is displayed in an error state: `color.background.danger` background, `color.border.danger` border, title in `color.text.disabled`, quantity stepper and line total disabled, and an inline error message below the title. The checkout button remains enabled but the checkout flow will validate and block on this item. The user must remove the unavailable item to proceed.

### Loading — initial cart fetch

On first render of the cart (page load or sidebar open), if cart contents are still loading, the item list area shows a spinner atom centered in the list region and `aria-busy="true"` on the list element. Totals and the checkout button are shown but disabled. When the fetch completes, `aria-busy` is set to `false` and the items render.

---

## 8. Accessibility

| Requirement | Rule |
|---|---|
| Cart region | The cart container must carry `role="region"` and `aria-label="Shopping cart"`. This allows screen reader users to navigate directly to the cart by landmark. |
| Item list | The item list must be a `<ul>` element. Each item row is an `<li>`. This communicates the list structure and item count to screen readers. |
| Item count announcement | When an item is added, removed, or the cart is updated, a live region outside the cart container (product-level) announces the change: "Sony WH-1000XM5 added to cart. Cart now contains 3 items." This is a product-level concern — the cart summary pattern must not duplicate the announcement. |
| Quantity input label | The quantity input carries a visually hidden `<label>` or `aria-label` identifying the item: `aria-label="Quantity for Sony WH-1000XM5"`. The `min` attribute is set to `1`. |
| Quantity decrement label | The decrement icon-button carries `aria-label="Decrease quantity of Sony WH-1000XM5"`. When the quantity is 1, the label updates to "Remove Sony WH-1000XM5 from cart" to communicate that the next decrement will remove the item. |
| Quantity increment label | The increment icon-button carries `aria-label="Increase quantity of Sony WH-1000XM5"`. |
| Remove button label | The remove icon-button carries `aria-label="Remove Sony WH-1000XM5 from cart"`. The label must include the item name — not a generic "Remove". |
| Focus after removal | When an item is removed, focus moves to the next item's remove button. If no next item exists, focus moves to the empty state's primary action. Focus must not be lost. |
| Totals structure | The totals section must be a `<dl>` element. Each row is a `<dt>` (label) and `<dd>` (value) pair. This allows screen readers to announce each label with its corresponding value. |
| Total row | The total row may carry `aria-label` on its value: `aria-label="Order total: SAR 498"` for unambiguous screen reader announcement. |
| Checkout button | The checkout button must carry `aria-disabled="true"` and `disabled` while totals are recalculating. The label must not change during the loading state — only the button's internal loading indicator appears. |
| Loading state | `aria-busy="true"` is set on the item list and totals section during async operations. A visually hidden status message using `aria-live="polite"` supplements: "Updating cart" on start, "Cart updated" on completion. |
| Unavailable item | The inline error message for an unavailable item must be associated with the row via `aria-describedby` on the row's `<li>`. The error must be in the DOM — not conveyed by color or disabled state alone. |
| Keyboard navigation | Tab moves through: remove buttons → quantity decrements → quantity inputs → quantity increments (per row in sequence) → promo code input → promo apply button → totals (non-interactive, skip) → checkout button → continue shopping button. |
| WCAG criteria | SC 1.3.1 (Info and Relationships), SC 2.1.1 (Keyboard), SC 2.4.3 (Focus Order), SC 4.1.2 (Name, Role, Value), SC 4.1.3 (Status Messages), SC 1.4.3 (Contrast Minimum) |

---

## 9. Content Guidelines

- **Item titles: match the product detail page exactly.** The title in the cart row must be the same string as the product title in the catalog. Do not shorten, abbreviate, or paraphrase. Truncate at two lines with an ellipsis if the container is narrow.
- **Variant tags: show the selected attributes.** "Size: M", "Color: Midnight Black" — not just "M" or "Black". The attribute name must be included so the user knows what dimension they selected.
- **Prices: always include the currency.** "SAR 249" not "249". Line totals and the order total must both carry the currency label. Do not rely on a page-level currency indicator — every price must be self-contained.
- **Unit price: clarify when shown alongside quantity.** When both unit price and line total appear in the same row, label the unit price: "SAR 249 each" or `SAR 249 × 2 = SAR 498`. Do not show two price figures with no relationship explained.
- **Discounts: show both the code and the saving.** "SAVE20 — SAR 99.60 off" is correct. "Discount applied" alone is not. The user must be able to verify the saving amount.
- **Totals labels: use plain, universal terms.** "Subtotal", "Delivery", "Discount", "Total" — not "Net total", "Shipping & handling", "Promotional reduction", "Grand total". Keep labels short and unambiguous.
- **Delivery: be explicit about the status.** "Free delivery", "Delivery: SAR 25", "Delivery calculated at checkout" — not "TBC" or blank. Never leave a totals row without a value or a clear placeholder.
- **Checkout button label: name the action.** "Proceed to checkout" or "Checkout" — not "Next", "Continue", or "Submit". The label must remain the same during the loading state.
- **Empty cart: direct the user.** The empty state headline must tell the user what happened: "Your cart is empty". The action must direct them forward: "Browse products" or "Start shopping" — not "Go back" or "OK".
- **Error messages: name the specific problem.** "Sony WH-1000XM5 is no longer available" — not "Item error" or "Something went wrong". Quantity update failures must specify what went wrong: "Only 3 units available — your quantity has been adjusted."

---

## 10. Code Example

```html
<!-- ============================================================ -->
<!-- Cart summary — full cart page                               -->
<!-- ============================================================ -->
<div class="cart-page">

  <h1 class="cart-page__heading">Your cart</h1>

  <div class="cart-layout">

    <!-- ── Item list column ── -->
    <section
      class="cart-summary"
      role="region"
      aria-label="Shopping cart"
      aria-busy="false"
    >

      <!-- Status live region -->
      <div
        class="cart-summary__status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span class="visually-hidden"></span>
      </div>

      <!-- Item list -->
      <ul class="cart-summary__list">

        <!-- ── Cart item row ── -->
        <li class="cart-item">

          <!-- Product thumbnail -->
          <div class="cart-item__image-wrapper">
            <img
              class="cart-item__image"
              src="/images/sony-wh1000xm5.jpg"
              alt="Sony WH-1000XM5 noise-cancelling headphones in midnight black"
              width="96"
              height="96"
              loading="lazy"
            />
          </div>

          <!-- Item content -->
          <div class="cart-item__content">
            <div class="cart-item__header">
              <p class="cart-item__title">Sony WH-1000XM5 Headphones</p>

              <!-- icon-button atom — remove -->
              <button
                class="icon-button icon-button--subtle icon-button--sm"
                type="button"
                aria-label="Remove Sony WH-1000XM5 Headphones from cart"
              >
                <svg class="icon-button__icon" aria-hidden="true" focusable="false">
                  <use href="/icons/sprite.svg#trash" />
                </svg>
              </button>
            </div>

            <!-- Variant tags -->
            <div class="cart-item__variants">
              <!-- tag atom -->
              <span class="tag tag--subtle">Color: Midnight Black</span>
            </div>

            <!-- Unit price -->
            <p class="cart-item__unit-price">SAR 249 each</p>

            <!-- Quantity and line total row -->
            <div class="cart-item__bottom">

              <!-- Quantity stepper -->
              <div class="cart-item__stepper" role="group" aria-label="Quantity for Sony WH-1000XM5 Headphones">

                <!-- icon-button atom — decrement -->
                <button
                  class="icon-button icon-button--default icon-button--sm"
                  type="button"
                  aria-label="Decrease quantity of Sony WH-1000XM5 Headphones"
                >
                  <svg class="icon-button__icon" aria-hidden="true" focusable="false">
                    <use href="/icons/sprite.svg#minus" />
                  </svg>
                </button>

                <!-- input atom — quantity -->
                <input
                  class="input input--sm cart-item__qty-input"
                  type="number"
                  value="2"
                  min="1"
                  aria-label="Quantity for Sony WH-1000XM5 Headphones"
                />

                <!-- icon-button atom — increment -->
                <button
                  class="icon-button icon-button--default icon-button--sm"
                  type="button"
                  aria-label="Increase quantity of Sony WH-1000XM5 Headphones"
                >
                  <svg class="icon-button__icon" aria-hidden="true" focusable="false">
                    <use href="/icons/sprite.svg#plus" />
                  </svg>
                </button>

              </div>

              <!-- Line total -->
              <p class="cart-item__line-total">SAR 498</p>
            </div>
          </div>

        </li>

        <!-- ── Cart item — unavailable state ── -->
        <li
          class="cart-item cart-item--error"
          aria-describedby="item-error-airpods"
        >

          <div class="cart-item__image-wrapper">
            <img
              class="cart-item__image cart-item__image--unavailable"
              src="/images/airpods-pro.jpg"
              alt="Apple AirPods Pro second generation in white"
              width="96"
              height="96"
              loading="lazy"
            />
          </div>

          <div class="cart-item__content">
            <div class="cart-item__header">
              <p class="cart-item__title cart-item__title--disabled">
                Apple AirPods Pro (2nd Gen)
              </p>
              <button
                class="icon-button icon-button--subtle icon-button--sm"
                type="button"
                aria-label="Remove Apple AirPods Pro (2nd Gen) from cart"
              >
                <svg class="icon-button__icon" aria-hidden="true" focusable="false">
                  <use href="/icons/sprite.svg#trash" />
                </svg>
              </button>
            </div>

            <p
              id="item-error-airpods"
              class="cart-item__error"
            >
              This item is no longer available. Remove it to proceed.
            </p>
          </div>

        </li>

      </ul>

      <!-- Empty cart state — shown when list is empty -->
      <div class="cart-summary__empty" hidden>
        <!-- empty-state pattern — no data variant -->
      </div>

    </section>

    <!-- ── Order summary card (full-page variant) ── -->
    <aside class="order-summary" aria-label="Order summary">

      <!-- Promo code group (optional) -->
      <div class="order-summary__promo">
        <label class="order-summary__promo-label" for="promo-code">
          Promo code
        </label>
        <div class="order-summary__promo-row">
          <!-- input atom -->
          <input
            id="promo-code"
            class="input input--md"
            type="text"
            placeholder="Enter code"
            autocomplete="off"
            aria-describedby="promo-error"
          />
          <!-- button atom -->
          <button class="button button--secondary button--md" type="button">
            Apply
          </button>
        </div>
        <!-- Inline error — hidden by default -->
        <p id="promo-error" class="order-summary__promo-error" hidden>
          This code has expired.
        </p>
      </div>

      <!-- Totals -->
      <dl class="order-summary__totals">

        <div class="order-summary__row">
          <dt class="order-summary__label">Subtotal</dt>
          <dd class="order-summary__value">SAR 498</dd>
        </div>

        <div class="order-summary__row">
          <dt class="order-summary__label">Delivery</dt>
          <dd class="order-summary__value">Free</dd>
        </div>

        <!-- Discount row — visible when promo is applied -->
        <div class="order-summary__row" hidden>
          <dt class="order-summary__label">Discount (SAVE20)</dt>
          <dd class="order-summary__value order-summary__value--discount">− SAR 99.60</dd>
        </div>

        <div class="order-summary__row order-summary__row--total">
          <dt class="order-summary__label order-summary__label--total">Total</dt>
          <dd
            class="order-summary__value order-summary__value--total"
            aria-label="Order total: SAR 498"
          >SAR 498</dd>
        </div>

      </dl>

      <!-- Actions -->
      <div class="order-summary__actions">
        <!-- button atom — primary -->
        <button class="button button--primary button--lg" type="button">
          Proceed to checkout
        </button>

        <!-- button atom — ghost -->
        <button class="button button--ghost button--md" type="button">
          Continue shopping
        </button>
      </div>

    </aside>

  </div>
</div>


<!-- ============================================================ -->
<!-- Cart summary — compact sidebar variant                      -->
<!-- ============================================================ -->
<div class="cart-summary cart-summary--sidebar" role="region" aria-label="Shopping cart">

  <div class="cart-summary__header">
    <h2 class="cart-summary__title">Your cart <span class="cart-summary__count">(2)</span></h2>
    <!-- icon-button atom — close drawer -->
    <button
      class="icon-button icon-button--subtle icon-button--md"
      type="button"
      aria-label="Close cart"
    >
      <svg class="icon-button__icon" aria-hidden="true" focusable="false">
        <use href="/icons/sprite.svg#x" />
      </svg>
    </button>
  </div>

  <!-- Scrollable item list -->
  <ul class="cart-summary__list cart-summary__list--scrollable">
    <!-- cart-item rows — same structure as full cart page -->
  </ul>

  <!-- Sticky footer -->
  <div class="cart-summary__footer">
    <div class="cart-summary__total-row">
      <span class="cart-summary__total-label">Total</span>
      <span class="cart-summary__total-value">SAR 498</span>
    </div>

    <div class="order-summary__actions">
      <button class="button button--primary button--md" type="button">
        Proceed to checkout
      </button>
      <button class="button button--ghost button--sm" type="button">
        View full cart
      </button>
    </div>
  </div>

</div>
```

```css
/* ============================================================ */
/* Cart Summary — layout styles                                  */
/* All directional properties use logical CSS for RTL support   */
/* ============================================================ */

/* --- Full cart page layout --- */
.cart-page {
  background: var(--color-background-sunken);
  padding-block: var(--spacing-layout-sm);
  padding-inline: var(--spacing-layout-md);
}

.cart-page__heading {
  font-size: var(--text-heading-lg-size);
  color: var(--color-text-primary);
  margin-block-end: var(--spacing-lg);
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: var(--spacing-lg);
  align-items: start;
}

@media (max-width: 768px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
}

/* --- Cart summary container --- */
.cart-summary {
  background: var(--color-background-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

/* --- Item list --- */
.cart-summary__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* --- Cart item row --- */
.cart-item {
  display: flex;
  gap: var(--spacing-md);
  padding-block: var(--spacing-md);
  padding-inline: var(--spacing-lg);
  border-block-end: 1px solid var(--color-border-subtle);
}

.cart-item:last-child {
  border-block-end: none;
}

/* Unavailable / error state */
.cart-item--error {
  background: var(--color-background-danger);
  border-inline-start: 3px solid var(--color-border-danger);
}

/* --- Product thumbnail --- */
.cart-item__image-wrapper {
  flex-shrink: 0;
  inline-size: var(--spacing-layout-sm);
  block-size: var(--spacing-layout-sm);
  background: var(--color-background-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.cart-item__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cart-item__image--unavailable {
  filter: grayscale(1);
}

/* --- Item content column --- */
.cart-item__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  flex: 1;
  min-inline-size: 0;
}

.cart-item__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.cart-item__title {
  font-size: var(--text-body-size);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cart-item__title--disabled {
  color: var(--color-text-disabled);
}

.cart-item__variants {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.cart-item__unit-price {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-secondary);
  margin: 0;
}

.cart-item__error {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-danger);
  margin: 0;
}

/* --- Bottom row: stepper + line total --- */
.cart-item__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  margin-block-start: var(--spacing-xs);
}

/* --- Quantity stepper --- */
.cart-item__stepper {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.cart-item__qty-input {
  inline-size: var(--spacing-xl);
  text-align: center;
}

/* --- Line total --- */
.cart-item__line-total {
  font-size: var(--text-body-size);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  margin: 0;
  flex-shrink: 0;
}

/* --- Order summary card --- */
.order-summary {
  background: var(--color-background-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  position: sticky;
  inset-block-start: var(--spacing-md);
}

/* --- Promo code group --- */
.order-summary__promo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.order-summary__promo-label {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-secondary);
}

.order-summary__promo-row {
  display: flex;
  gap: var(--spacing-xs);
}

.order-summary__promo-row .input {
  flex: 1;
}

.order-summary__promo-error {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-danger);
  margin: 0;
}

/* --- Totals --- */
.order-summary__totals {
  background: var(--color-background-subtle);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin: 0;
}

.order-summary__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--spacing-sm);
}

.order-summary__row--total {
  border-block-start: 1px solid var(--color-border-subtle);
  padding-block-start: var(--spacing-sm);
  margin-block-start: var(--spacing-xs);
}

.order-summary__label {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-secondary);
}

.order-summary__label--total {
  font-size: var(--text-heading-sm-size);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

.order-summary__value {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-primary);
}

.order-summary__value--discount {
  color: var(--color-text-success);
}

.order-summary__value--total {
  font-size: var(--text-heading-sm-size);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

/* --- Actions --- */
.order-summary__actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding-block-start: var(--spacing-md);
  border-block-start: 1px solid var(--color-border-subtle);
}

.order-summary__actions .button--primary {
  inline-size: 100%;
}

/* ============================================================ */
/* Compact sidebar variant                                       */
/* ============================================================ */
.cart-summary--sidebar {
  display: flex;
  flex-direction: column;
  block-size: 100%;
  border-radius: var(--radius-xl);
  padding: 0;
}

.cart-summary__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  border-block-end: 1px solid var(--color-border-subtle);
  flex-shrink: 0;
}

.cart-summary__title {
  font-size: var(--text-heading-sm-size);
  color: var(--color-text-primary);
  margin: 0;
}

.cart-summary__count {
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-normal);
}

.cart-summary__list--scrollable {
  flex: 1;
  overflow-y: auto;
}

.cart-summary__footer {
  padding: var(--spacing-md) var(--spacing-lg);
  border-block-start: 1px solid var(--color-border-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

.cart-summary__total-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.cart-summary__total-label {
  font-size: var(--text-heading-sm-size);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

.cart-summary__total-value {
  font-size: var(--text-heading-sm-size);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

/* --- Empty state area --- */
.cart-summary__empty {
  padding: var(--spacing-layout-sm) var(--spacing-lg);
  display: flex;
  justify-content: center;
}

/* --- Visually hidden utility --- */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
```

---

## 11. Cross References

- [button.md](../atoms/button.md) — Checkout action, continue shopping, promo code apply, and view full cart actions
- [input.md](../atoms/input.md) — Quantity field in the stepper and promo code field
- [icon-button.md](../atoms/icon-button.md) — Remove item, quantity increment/decrement, and sidebar close controls
- [tag.md](../atoms/tag.md) — Item variant labels (size, color, and other selected attributes) displayed on each row
- [spinner.md](../atoms/spinner.md) — Loading state within the checkout button and during item update operations
- [catalog-card.md](../patterns/catalog-card.md) — Compact card variant informs the thumbnail treatment used in cart item rows
- [empty-state.md](../patterns/empty-state.md) — Rendered when the cart contains no items
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all values used by this pattern
