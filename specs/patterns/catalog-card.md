---
name: Catalog Card
tier: pattern
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Catalog Card

---

## 1. Overview

A catalog card is a content-rich card pattern used in flight listings, hotel results, and package browsing on Almosafer. It presents the essential information a user needs to evaluate and act on a travel option — image or carrier logo, name, price, key details, and a primary action — within a consistent, scannable layout. Cards appear in grids and horizontal lists, supporting fast browsing, price comparison, and quick selection without requiring navigation to a detail page.

The card is a scanning and selection surface, not a presentation surface. It must carry the minimum information required for a decision, and nothing more.

---

## 2. When to Use

- Displaying flights, hotels, or packages in a browsable grid or list — search results, category pages.
- Surfacing available hotel rooms within a property listing.
- Listing packages or bundle offers in a deals or promotions directory.
- Showing promoted or featured options with greater visual emphasis in a listing context.
- Presenting a condensed option summary in recently viewed, saved trips, or search sidebar contexts.

---

## 3. When Not to Use

- **Product detail pages** — The card is a scanning surface. On a detail page, use an expanded layout. Do not embed a catalog card where a full content layout is needed.
- **Booking summary** — Line items in booking review or order confirmation have a distinct structure. Use a dedicated booking-item component, not a catalog card.
- **Navigation menus** — Cards are content objects, not navigation elements. Use link atoms or a navigation pattern for menu structures.
- **Side-by-side attribute comparison** — When the user needs to compare many attributes across multiple items, use a table or comparison pattern instead. Cards do not support column alignment.
- **Single isolated items** — When only one item is shown on a page, the card container adds unnecessary visual weight. Use a full-width content layout instead.

---

## 4. Composition

| Atom / Element | Role in Pattern |
|---|---|
| **badge** atom | Discount label, promotional flag, and status indicator (Out of Stock, Closing Soon) overlaid on the image or inline with the price block |
| **button** atom | Primary action — View details, Select flight, Choose room, Book now, Save trip |
| **icon-button** atom | Secondary action — Save/Favorite toggle; Share |
| **tag** atom | Travel category, meal inclusion, property type label (Direct, Refundable, New) |
| **link** atom | Card title as the primary navigable element linking to the detail page |
| **icon** atom | Rating stars (informative), duration/stops indicator, amenity icons |
| **spinner** atom | Loading state within the primary button during async booking operations — managed by the button atom |

Additional structural elements (not atoms):

| Element | Role |
|---|---|
| **Image container** | Constrained-aspect-ratio wrapper for hotel photography or carrier logo |
| **Price block** | Current price, optional struck-through original price, optional discount badge |
| **Rating block** | Star icon row, numeric score, optional review count |
| **Metadata row** | Duration, stops, check-in/check-out, meal plan, or availability text |

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Card container — background | `color.background.surface` | Default card surface |
| Card container — border | `color.border.default` | Card edge, 1px |
| Card container — border (hover) | `color.border.strong` | Elevated border on pointer hover |
| Card container — radius | `radius.xl` | Standard card rounding |
| Image placeholder | `color.background.subtle` | Shown while the image loads |
| Card title — font size | `text.heading.sm` | Item name, restaurant name |
| Card title — color (default) | `color.text.primary` | Full-contrast title |
| Card title — color (unavailable) | `color.text.disabled` | Suppressed title when item is unavailable |
| Subtitle / description — font size | `text.body.sm` | Secondary copy below the title |
| Subtitle / description — color | `color.text.secondary` | Supporting, non-primary text |
| Price (current) — font size | `text.heading.sm` | Prominent price display |
| Price (current) — color (default) | `color.text.primary` | Full-contrast current price |
| Price (current) — color (unavailable) | `color.text.disabled` | Suppressed price when item is unavailable |
| Price (original, struck through) — font size | `text.body.sm` | De-emphasized pre-discount price |
| Price (original, struck through) — color | `color.text.subtle` | Visual subordination of the original price |
| Rating score — font size | `text.body.sm` | Numeric value beside star icons |
| Rating score — color | `color.text.secondary` | Metadata-level hierarchy |
| Rating star — filled | `color.status.warning` | Active/filled star indicator |
| Rating star — empty | `color.border.default` | Inactive/empty star indicator |
| Metadata text — font size | `text.caption` | Delivery time, distance, minimum order |
| Metadata text — color | `color.text.secondary` | Supporting hierarchy |
| Availability — unavailable label | `color.text.danger` | "Out of Stock", "Unavailable", "Sold Out" |
| Content area — padding | `spacing.md` | All sides of the card content section |
| Gap — title to subtitle | `spacing.xs` | Tight coupling within the name group |
| Gap — subtitle to metadata | `spacing.xs` | Tight coupling within supporting text |
| Gap — metadata to price block | `spacing.sm` | Separation between data groups |
| Gap — price block to action row | `spacing.sm` | Separation before the primary action |
| Gap — between tags | `spacing.xs` | Space between adjacent tag atoms |
| Gap — primary to secondary action | `spacing.xs` | Space between button and icon-button |
| Compact variant — image column width | `spacing.layout.sm` | Fixed image column in horizontal layout |
| Hover transition | `motion.fast` | Border color transition on pointer hover |

---

## 6. Variants

### Flight card (default)

For flight search results. Airline logo or aircraft image (fixed height). Contains: route as link (origin → destination), airline name, departure and arrival times, duration, stop count, price, optional struck-through original price, optional discount badge, Select flight primary button, optional Save icon-button. This is the standard variant for Almosafer flight search.

### Hotel card

For hotel search results. Landscape image (4:3 aspect ratio). Contains: hotel name as link, location or neighborhood tag, star rating block, review score, price per night, optional meal plan tag (Breakfast included, All-inclusive), Choose room primary button, optional Save icon-button.

### Package card

For bundled flight-plus-hotel package listings. Landscape image (4:3 aspect ratio). Contains: package name or destination as link, included items summary (e.g. "Flight + 3 nights"), total price, optional savings badge, View details primary button, optional Save icon-button. Per-component pricing is not shown in the card — only the bundle total.

### Compact card

Horizontal layout. Image column is fixed width on the inline-start side; content column fills remaining space on the inline-end side. Used in recently viewed, cross-sell strips, and search sidebar contexts. Contains: title, price, primary action. Optional subtitle. Rating and metadata rows are omitted. The badge overlay may be retained on the image if a discount applies.

### Featured card

Full-width or two-column-spanning card used for promoted items and hero placements within a listing grid. Landscape image (16:9 aspect ratio). Contains: title, highlighted price or offer callout, promotional badge, full-width primary button. Increased visual weight signals editorial priority to the user without changing the underlying interaction model.

---

## 7. Behavior

### Card navigation

The card title (link atom) is the primary and accessible navigation mechanism to the detail page. The image may be wrapped in a second link to the same destination, but it must be hidden from the accessibility tree (`aria-hidden="true"`, `tabindex="-1"`) to prevent duplicate focus stops. The card container must not be a single `<a>` element when it contains interactive children (button, icon-button) — nesting interactive elements inside a link produces invalid HTML and breaks keyboard navigation.

### Primary action

The primary button triggers the booking or selection action. During the async operation the button enters its loading state (spinner atom, managed by the button atom). On success the user is navigated to the booking detail or checkout step. On failure the button returns to default and a notification surfaces the error.

### Save trip

The icon-button toggles between unsaved and saved states. The icon changes between an outline bookmark (unsaved) and a filled bookmark (saved). The `aria-label` updates to reflect the new state immediately: "Save [option name]" when unsaved; "Remove [option name] from saved trips" when saved. The action is optimistic — the UI updates immediately while the network request completes in the background. If the request fails, the UI reverts and a notification surfaces.

### Unavailable / Sold out

- Option image or logo: `filter: grayscale(1)` applied at implementation level — not a token concern.
- A "Sold out" or "Unavailable" badge atom appears at `inset-block-start: spacing.sm` / `inset-inline-start: spacing.sm` on the image.
- Title color shifts to `color.text.disabled`.
- Price color shifts to `color.text.disabled`.
- Primary action button enters its disabled state.
- The Save icon-button remains active — users may save an unavailable option to check later.
- The title link remains active — the detail page is still navigable.

### Hover (pointer devices)

On pointer hover over the card container, the border color transitions from `color.border.default` to `color.border.strong` using `motion.fast`. No layout shift or reflow occurs. Secondary actions (Favorite icon-button) that are visually suppressed at rest become fully visible on hover.

### Reduced motion

When `prefers-reduced-motion: reduce` is active, the hover border transition is instant — no `transition` property is applied. Motion within the button atom and spinner atom follows their respective reduced-motion rules.

---

## 8. Accessibility

| Requirement | Rule |
|---|---|
| Image alt text | Hotel images carry descriptive alt text naming the property: `alt="Al Faisaliah Hotel Riyadh exterior view"`. Flight cards use the airline name: `alt="Saudia Airlines"`. |
| Placeholder alt | Images still loading carry `aria-hidden="true"` on the placeholder element. Loaded images must never carry empty alt unless purely decorative. |
| Card title link | The link text must uniquely identify the option: "Saudia Airlines SV531 · Riyadh to Dubai" — not "View flight" or "Click here". Duplicate destination links (image + title) must remove the image link from the accessibility tree via `aria-hidden="true"` and `tabindex="-1"`. |
| Price — current | Rendered as plain DOM text. Screen readers announce "SAR 649". Do not use CSS `content` to inject price characters or currency symbols. |
| Price — original | Carries a visually hidden prefix so the struck-through value is distinguishable: `<span class="visually-hidden">Original price: </span>`. Without it, a screen reader announces two prices with no contextual separation. |
| Discount badge | Badge text must be self-explanatory: "20% off" not "20%". |
| Rating block | Carries an `aria-label` on its container: `aria-label="Rating: 4.3 out of 5 (1,200 reviews)"`. Individual star icon atoms carry `aria-hidden="true"`. The numeric score and review count are plain text. |
| Availability | "Sold out" or "Unavailable" must appear as DOM text — not conveyed by color change alone. The color shift on title and price is supplementary. |
| Metadata text | Metadata must be self-contained: "2h 15m · 1 stop" — not "2h 15m" without context for a flight card. "Check-in: 14 May" for a hotel card. |
| Primary action label | Button label names the action clearly: "Select flight", "Choose room", or "View details". Where multiple cards are in view and disambiguation is needed, the option name may be included in a visually hidden extension: `Select flight<span class="visually-hidden"> — Saudia SV531, SAR 649</span>`. |
| Save action label | `aria-label` updates with toggle state. Unsaved: "Save Saudia SV531 to Dubai". Saved: "Remove Saudia SV531 to Dubai from saved trips". `aria-pressed` reflects the current saved state: `true` when saved, `false` when unsaved. |
| Disabled primary action | The button carries the native `disabled` attribute. The reason for unavailability is communicated by the badge or availability label — not inferred from the disabled button alone. |
| Focus order | Within each card: title link → primary button → Save icon-button. Tags and rating content are non-interactive and excluded from the focus sequence unless a tag functions as a filter trigger. |
| Touch targets | Primary button and icon-button meet the 44×44 minimum touch target — enforced by those atoms. |
| WCAG criteria | SC 1.4.1 (Use of Color), SC 1.4.3 (Contrast Minimum), SC 2.1.1 (Keyboard), SC 2.4.6 (Headings and Labels), SC 4.1.2 (Name, Role, Value) |

---

## 9. Content Guidelines

- **Title: short and specific.** Flight card: airline + route, under 60 characters. Hotel card: property name, under 50 characters. Package card: destination or bundle name only — no tagline. Truncate at two lines with an ellipsis. The full title remains accessible via the link.
- **Price: always include the currency.** "SAR 649" is correct. "649" alone is not. For starting prices: "From SAR 649". Do not hardcode numeral systems — respect locale formatting.
- **Description: maximum two lines.** Descriptions are optional. When present, keep to one or two short lines. State the key detail: "Direct flight · 2h 15m" or "Breakfast included · Free cancellation." — not marketing copy.
- **Discount badge: name the saving.** "20% off" is preferred over "20%". Where space allows, include the saved amount: "20% off — Save SAR 130."
- **Rating: provide context.** "4.3 ★ (1,200)" is acceptable shorthand visually. The accessible label must always read "Rating: 4.3 out of 5 (1,200 reviews)".
- **Travel metadata: be specific.** "2h 15m · Direct" or "Check-in 14 May · 3 nights" are correct. "Short flight" or "A few nights" without values are not acceptable.
- **Availability: be direct.** "Sold out" — not "Unavailable right now" or "Check back soon." Avoid apologetic phrasing.
- **Actions: name the action precisely.** "Select flight" for flight cards. "Choose room" for hotel cards. "View details" for package cards. "Book now" for direct single-step booking flows. "Save trip" for the save icon-button. Do not use "Submit", "Go", or "Continue" on a catalog card.
- **Tags: one to three words only.** "Direct", "Free cancellation", "Breakfast included". No sentences. No punctuation within tags.
- **Do not overload cards.** Each variant carries the minimum required elements for its context. Flight cards omit hotel amenities. Package cards omit per-leg pricing. Compact cards omit descriptions and ratings. A card that shows every optional element simultaneously loses scannability and hierarchy.

---

## 10. Code Example

```html
<!-- ============================================================ -->
<!-- Flight card — default variant                                -->
<!-- ============================================================ -->
<article class="catalog-card catalog-card--flight">

  <!-- Airline logo area -->
  <div class="catalog-card__image-wrapper">
    <a href="/flights/sv531-ruh-dxb" tabindex="-1" aria-hidden="true">
      <img
        class="catalog-card__image"
        src="/images/airlines/saudia.svg"
        alt="Saudia Airlines"
        width="80"
        height="80"
        loading="lazy"
      />
    </a>

    <!-- Discount badge atom — positioned over image -->
    <div class="catalog-card__badge-overlay">
      <span class="badge badge--danger">20% off</span>
    </div>
  </div>

  <!-- Content area -->
  <div class="catalog-card__content">

    <!-- Title -->
    <h3 class="catalog-card__title">
      <a href="/flights/sv531-ruh-dxb" class="link link--default">
        Saudia · Riyadh to Dubai
      </a>
    </h3>

    <!-- Flight metadata -->
    <div class="catalog-card__metadata">
      <span>08:00 → 10:15</span>
      <span class="catalog-card__metadata-separator" aria-hidden="true">·</span>
      <span>2h 15m</span>
      <span class="catalog-card__metadata-separator" aria-hidden="true">·</span>
      <span>Direct</span>
    </div>

    <!-- Tags -->
    <div class="catalog-card__tags">
      <span class="tag tag--subtle">Direct</span>
      <span class="tag tag--subtle">Refundable</span>
    </div>

    <!-- Price block -->
    <div class="catalog-card__price-block">
      <span class="catalog-card__price-current">SAR 649</span>
      <span class="catalog-card__price-original">
        <span class="visually-hidden">Original price: </span>
        <s>SAR 810</s>
      </span>
    </div>

    <!-- Action row -->
    <div class="catalog-card__actions">
      <button
        class="button button--primary button--md catalog-card__action-primary"
        type="button"
      >
        Select flight
        <span class="visually-hidden"> — Saudia SV531, SAR 649</span>
      </button>

      <button
        class="icon-button icon-button--default icon-button--md"
        type="button"
        aria-label="Save Saudia SV531 Riyadh to Dubai"
        aria-pressed="false"
      >
        <svg class="icon-button__icon" aria-hidden="true" focusable="false">
          <use href="/icons/sprite.svg#bookmark" />
        </svg>
      </button>
    </div>

  </div>
</article>


<!-- ============================================================ -->
<!-- Hotel card                                                   -->
<!-- ============================================================ -->
<article class="catalog-card catalog-card--hotel">

  <div class="catalog-card__image-wrapper">
    <a href="/hotels/al-faisaliah-riyadh" tabindex="-1" aria-hidden="true">
      <img
        class="catalog-card__image"
        src="/images/hotels/al-faisaliah.jpg"
        alt="Al Faisaliah Hotel Riyadh exterior view"
        width="600"
        height="450"
        loading="lazy"
      />
    </a>
  </div>

  <div class="catalog-card__content">
    <h3 class="catalog-card__title">
      <a href="/hotels/al-faisaliah-riyadh" class="link link--default">
        Al Faisaliah Hotel
      </a>
    </h3>

    <!-- Hotel tags -->
    <div class="catalog-card__tags">
      <span class="tag tag--subtle">5 stars</span>
      <span class="tag tag--subtle">Breakfast included</span>
      <span class="tag tag--subtle">Free cancellation</span>
    </div>

    <!-- Rating -->
    <div
      class="catalog-card__rating"
      aria-label="Rating: 4.7 out of 5 (1,200 reviews)"
    >
      <span class="catalog-card__stars" aria-hidden="true">
        <svg class="icon icon--sm catalog-card__star catalog-card__star--filled" aria-hidden="true" focusable="false">
          <use href="/icons/sprite.svg#star-filled" />
        </svg>
        <!-- additional stars omitted for brevity -->
      </span>
      <span class="catalog-card__rating-score">4.7</span>
      <span class="catalog-card__rating-count">(1,200)</span>
    </div>

    <!-- Price block -->
    <div class="catalog-card__price-block">
      <span class="catalog-card__price-current">SAR 850</span>
      <span class="catalog-card__price-meta"> / night</span>
    </div>

    <div class="catalog-card__actions">
      <button
        class="button button--primary button--md catalog-card__action-primary"
        type="button"
      >
        Choose room
        <span class="visually-hidden"> — Al Faisaliah Hotel</span>
      </button>

      <button
        class="icon-button icon-button--default icon-button--md"
        type="button"
        aria-label="Save Al Faisaliah Hotel to saved trips"
        aria-pressed="false"
      >
        <svg class="icon-button__icon" aria-hidden="true" focusable="false">
          <use href="/icons/sprite.svg#bookmark" />
        </svg>
      </button>
    </div>
  </div>
</article>


<!-- ============================================================ -->
<!-- Package card                                                 -->
<!-- ============================================================ -->
<article class="catalog-card catalog-card--package">

  <div class="catalog-card__image-wrapper">
    <a href="/packages/dubai-3nights" tabindex="-1" aria-hidden="true">
      <img
        class="catalog-card__image"
        src="/images/destinations/dubai.jpg"
        alt="Dubai city skyline with Burj Khalifa"
        width="600"
        height="450"
        loading="lazy"
      />
    </a>
    <div class="catalog-card__badge-overlay">
      <span class="badge badge--success">Save SAR 200</span>
    </div>
  </div>

  <div class="catalog-card__content">
    <h3 class="catalog-card__title">
      <a href="/packages/dubai-3nights" class="link link--default">
        Dubai · 3 Nights Package
      </a>
    </h3>

    <p class="catalog-card__subtitle">
      Return flight + 3-night hotel · Breakfast included
    </p>

    <div class="catalog-card__price-block">
      <span class="catalog-card__price-current">SAR 1,850</span>
      <span class="catalog-card__price-original">
        <span class="visually-hidden">Original price: </span>
        <s>SAR 2,050</s>
      </span>
    </div>

    <div class="catalog-card__actions">
      <button
        class="button button--primary button--md catalog-card__action-primary"
        type="button"
      >
        View details
        <span class="visually-hidden"> — Dubai 3 Nights Package</span>
      </button>

      <button
        class="icon-button icon-button--default icon-button--md"
        type="button"
        aria-label="Save Dubai 3 Nights Package to saved trips"
        aria-pressed="false"
      >
        <svg class="icon-button__icon" aria-hidden="true" focusable="false">
          <use href="/icons/sprite.svg#bookmark" />
        </svg>
      </button>
    </div>
  </div>
</article>


<!-- ============================================================ -->
<!-- Compact card                                                 -->
<!-- ============================================================ -->
<article class="catalog-card catalog-card--compact">

  <div class="catalog-card__image-wrapper">
    <a href="/flights/sv531-ruh-dxb" tabindex="-1" aria-hidden="true">
      <img
        class="catalog-card__image"
        src="/images/airlines/saudia.svg"
        alt="Saudia Airlines"
        width="96"
        height="96"
        loading="lazy"
      />
    </a>
  </div>

  <div class="catalog-card__content">
    <h3 class="catalog-card__title">
      <a href="/flights/sv531-ruh-dxb" class="link link--default">
        Saudia · Riyadh to Dubai
      </a>
    </h3>

    <div class="catalog-card__price-block">
      <span class="catalog-card__price-current">SAR 649</span>
    </div>

    <div class="catalog-card__actions">
      <button
        class="button button--primary button--sm catalog-card__action-primary"
        type="button"
      >
        Select flight
        <span class="visually-hidden"> — Saudia SV531</span>
      </button>
    </div>
  </div>
</article>
```

```css
/* ============================================================ */
/* Catalog Card — base styles                                    */
/* All directional properties use logical CSS for RTL support   */
/* ============================================================ */

/* --- Card container --- */
.catalog-card {
  background: var(--color-background-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color var(--motion-fast);
}

.catalog-card:hover {
  border-color: var(--color-border-strong);
}

/* --- Image wrapper --- */
.catalog-card__image-wrapper {
  position: relative;
  aspect-ratio: 1 / 1;
  background: var(--color-background-subtle);
  overflow: hidden;
  flex-shrink: 0;
}

.catalog-card--restaurant .catalog-card__image-wrapper {
  aspect-ratio: 4 / 3;
}

.catalog-card--featured .catalog-card__image-wrapper {
  aspect-ratio: 16 / 9;
}

.catalog-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Grayscale treatment for unavailable items */
.catalog-card--unavailable .catalog-card__image {
  filter: grayscale(1);
}

/* --- Badge overlay on image --- */
.catalog-card__badge-overlay {
  position: absolute;
  inset-block-start: var(--spacing-sm);
  inset-inline-start: var(--spacing-sm);
}

/* --- Content area --- */
.catalog-card__content {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  flex: 1;
}

/* --- Title --- */
.catalog-card__title {
  font-size: var(--text-heading-sm-size);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.catalog-card--unavailable .catalog-card__title {
  color: var(--color-text-disabled);
}

/* --- Subtitle / description --- */
.catalog-card__subtitle {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-secondary);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* --- Rating block --- */
.catalog-card__rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.catalog-card__star--filled {
  color: var(--color-status-warning);
}

.catalog-card__star--empty {
  color: var(--color-border-default);
}

.catalog-card__rating-score,
.catalog-card__rating-count {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-secondary);
}

/* --- Tags row --- */
.catalog-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

/* --- Delivery metadata --- */
.catalog-card__metadata {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--text-caption-size);
  color: var(--color-text-secondary);
}

.catalog-card__metadata-separator {
  color: var(--color-text-subtle);
}

/* --- Price block --- */
.catalog-card__price-block {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
  margin-block-start: var(--spacing-sm);
}

.catalog-card__price-current {
  font-size: var(--text-heading-sm-size);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

.catalog-card--unavailable .catalog-card__price-current {
  color: var(--color-text-disabled);
}

.catalog-card__price-original {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-subtle);
}

/* --- Availability label --- */
.catalog-card__availability {
  font-size: var(--text-caption-size);
  color: var(--color-text-danger);
  margin: 0;
}

/* --- Action row --- */
.catalog-card__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-block-start: var(--spacing-sm);
}

.catalog-card__action-primary {
  flex: 1;
}

/* ============================================================ */
/* Compact variant — horizontal layout                          */
/* ============================================================ */
.catalog-card--compact {
  flex-direction: row;
}

.catalog-card--compact .catalog-card__image-wrapper {
  aspect-ratio: auto;
  width: var(--spacing-layout-sm);
  flex-shrink: 0;
}

.catalog-card--compact .catalog-card__content {
  padding: var(--spacing-sm);
}

/* ============================================================ */
/* Visually hidden utility                                       */
/* ============================================================ */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

/* ============================================================ */
/* Reduced motion                                               */
/* ============================================================ */
@media (prefers-reduced-motion: reduce) {
  .catalog-card {
    transition: none;
  }
}
```

---

## 11. Cross References

- [button.md](../atoms/button.md) — Primary action atom for Add to Cart, Add, View Menu, and Order Now actions
- [badge.md](../atoms/badge.md) — Discount labels, promotional flags, and status indicators (Out of Stock, Closing Soon)
- [tag.md](../atoms/tag.md) — Cuisine type, dietary labels, and category labels within the card
- [icon-button.md](../atoms/icon-button.md) — Favorite/Save secondary action and Share action
- [link.md](../atoms/link.md) — Card title as the primary navigable element to the detail page
- [icon.md](../atoms/icon.md) — Rating star indicators and supplementary metadata icons (clock, delivery)
- [spinner.md](../atoms/spinner.md) — Loading state within the primary button during async cart operations
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all values used by this pattern
