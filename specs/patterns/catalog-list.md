---
name: Catalog List
tier: pattern
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Catalog List

---

## 1. Overview

A catalog list is a page-level layout pattern that presents a collection of travel inventory — flights, hotels, packages, or any browsable Almosafer offering — as a scannable, filterable, and sortable set of catalog cards. It combines a toolbar (search, active filters, sort controls) with a card grid or list, and handles the full range of collection states: loading, populated, and empty.

The catalog list is a composition surface, not a content surface. It arranges and manages existing patterns and atoms. It does not define new visual primitives.

---

## 2. When to Use

- Presenting a browsable collection of flights, hotels, or packages where the user scans, compares, and selects.
- Search results pages, destination browsing pages, and package listings on Almosafer.
- Any context where the user needs to narrow a collection by filtering or sorting before selecting a travel option.
- Collections that may be empty, partially loaded, or fully populated — all three states must be handled.

---

## 3. When Not to Use

- **Single items** — When only one item is shown, a catalog list adds unnecessary structural weight. Use a detail layout directly.
- **Attribute-based comparison** — When the user needs to compare many structured attributes side by side, use the table pattern. Cards do not support column alignment.
- **Navigation menus** — Catalog lists are content surfaces, not navigation surfaces. Use a navigation pattern for menus.
- **Non-browsable collections** — If the collection is read-only, fixed, and requires no filtering or sorting, a simpler list layout is sufficient.
- **Booking summary** — Line-item collections (itinerary, order confirmation) have a distinct interaction model. Do not use a catalog list for transactional summaries.

---

## 4. Composition

| Pattern / Atom | Role in Catalog List |
|---|---|
| **catalog-card** pattern | The repeating content unit within the grid or list. Renders each item. |
| **empty-state** pattern | Displayed when the collection has no items to show — no data, no search results, or error. |
| **input** atom | Search field for text-based filtering; sort select control where a dropdown approach is used. |
| **button** atom | Sort option buttons (when button-group approach is used); load more trigger; clear filters action; pagination controls. |
| **tag** atom | Active filter chips displayed in the toolbar row. Each tag represents an applied filter and carries a dismiss control. |
| **checkbox** atom | Individual filter options within a collapsible filter panel or inline filter group. |
| **link** atom | Pagination page numbers rendered as links where appropriate for bookmarkability. |
| **spinner** atom | Loading indicator during initial load and during load-more operations in infinite scroll. |

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Page background | `color.background.sunken` | Recessed canvas behind the entire catalog list |
| Page container — padding (inline) | `spacing.layout.md` | Outer horizontal page padding |
| Page container — padding (block) | `spacing.layout.sm` | Outer vertical page padding |
| Toolbar — background | `color.background.surface` | Toolbar surface color |
| Toolbar — border (block-end) | `color.border.subtle` | Bottom divider below the toolbar |
| Toolbar — padding (block) | `spacing.sm` | Top and bottom padding inside the toolbar |
| Toolbar — padding (inline) | `spacing.md` | Left and right padding inside the toolbar |
| Toolbar — gap between control groups | `spacing.md` | Horizontal gap between search, filters, and sort areas |
| Active filter tag row — gap | `spacing.xs` | Gap between adjacent active filter tags |
| Results count — font size | `text.body.sm` | Item count label below the toolbar |
| Results count — color | `color.text.secondary` | Supporting hierarchy for count metadata |
| Sort label — font size | `text.body.sm` | "Sort by" label beside the sort control |
| Sort label — color | `color.text.secondary` | Supporting hierarchy |
| Filter group label — font size | `text.body.sm` | Section label inside a filter panel |
| Filter group label — color | `color.text.secondary` | Supporting hierarchy |
| Grid — gap (default) | `spacing.md` | Gap between catalog cards in grid and list layouts |
| Grid — gap (compact) | `spacing.sm` | Tighter card gap in compact layout |
| Grid — padding (block-start) | `spacing.md` | Space between toolbar and the first row of cards |
| Pagination area — padding (block-start) | `spacing.lg` | Space above the pagination row |
| Pagination — gap between controls | `spacing.xs` | Gap between page number buttons or links |
| Divider | `color.border.subtle` | Horizontal rule between sections |
| Loading transition | `motion.fast` | State transitions in toolbar and sort controls |

---

## 6. Variants

### Grid layout (default)

Catalog cards arranged in a multi-column CSS grid. Column count is responsive: four columns on wide viewports, three on medium, two on narrow, one on mobile. Gap between cards: `spacing.md`. This is the primary layout for hotel listings and package browsing on Almosafer.

### List layout

Catalog cards arranged in a single column. Each card renders in its horizontal compact orientation (inline-start image, inline-end content). Gap between rows: `spacing.md`. Used when the user needs to scan more content per card — for example, flight search results pages where route, duration, and stop details are important.

### Compact layout

Catalog cards arranged in a denser multi-column grid — five columns on wide, four on medium, three on narrow. Gap between cards: `spacing.sm`. Used for operator-facing surfaces, cross-sell strips, and contexts where high information density is intentional and the audience is experienced with the interface.

---

## 7. Behavior

### Filtering

Filters are applied from the toolbar. Two modes are supported depending on the surface:

**Inline filter strip** — Filter options appear as tag atoms or checkbox atoms directly in the toolbar row. Applying a filter updates the grid immediately. Each active filter is surfaced as a dismissible tag atom in the active filter row. A "Clear all" button atom appears when one or more filters are active. Removing the last filter hides the "Clear all" button.

**Collapsible filter panel** — A "Filters" button atom toggles a panel below the toolbar or in a sidebar position. The panel contains grouped checkbox atoms per filter category. Filters are applied on change (immediate) or on explicit confirmation depending on the product context. Active filter count is shown on the "Filters" button when filters are applied.

Text search uses an input atom. The grid updates after a debounce period on keystroke. While updating, the grid enters its loading state.

### Sorting

Sort controls are placed at the inline-end of the toolbar. Two approaches are supported:

- **Select** — An input atom (select variant) listing the available sort options. Selecting an option immediately re-orders the grid.
- **Button group** — A set of button atoms in secondary variant. The active sort option carries `aria-pressed="true"` and a visually distinct selected state using `color.background.selected` and `color.border.selected`.

The sort state persists while the user navigates pages. Changing the sort option resets pagination to page one.

### Loading — initial

On the first load of the collection, a spinner atom is displayed centered in the grid area. The grid region carries `aria-busy="true"`. The toolbar renders normally. When results arrive, `aria-busy` is set to `false`, the spinner is removed, and the cards render with a `motion.fast` opacity transition.

### Loading — filter or sort change

When the user applies a filter or changes sort order, the existing cards remain visible while new results load. The grid region carries `aria-busy="true"`. A spinner atom appears below the toolbar, above the existing cards, to signal that results are updating. The toolbar controls remain interactive. When new results arrive, the old cards are replaced and `aria-busy` is set to `false`.

### Loading — load more (infinite scroll)

A sentinel element positioned after the last card row triggers a new results fetch when it enters the viewport (via IntersectionObserver at the implementation level). A spinner atom appears below the last row while the next batch loads. When all items are loaded, the sentinel is removed and a "You've reached the end" or equivalent message replaces the spinner. When no further items are available, the spinner and sentinel are removed.

### Loading — pagination

Navigating to a new page scrolls the viewport to the block-start of the grid, sets `aria-busy="true"` on the grid region, and shows the spinner atom centered in the grid area while the new page's cards load.

### Empty state

When the collection returns zero results, the catalog card grid is hidden and the empty-state pattern is rendered in the grid area. The empty-state variant depends on context:

- **No search results** — When active filters or search text produced zero results. The empty state includes a "Clear filters" action button.
- **No data** — When the collection is genuinely empty (no items exist). The empty state reflects the first-time setup or no-data variant.
- **Error** — When the fetch failed. The empty state reflects the error variant with a retry action.

The toolbar remains visible and interactive in all empty states. The user must be able to clear filters or modify search without a page reload.

### Scrolling

The catalog list does not scroll independently inside a fixed-height container. The page scrolls. The toolbar may be positioned sticky at the block-start of the viewport so that filter and sort controls remain accessible while the user scrolls the card grid. When the toolbar is sticky, it retains its background token (`color.background.surface`) and bottom border (`color.border.subtle`).

---

## 8. Accessibility

| Requirement | Rule |
|---|---|
| Landmark structure | The card grid and its controls must sit within a `<main>` landmark. Filter and sort controls within the toolbar require no additional landmark — they are part of the main content. Pagination must be wrapped in a `<nav>` element with `aria-label="Page navigation"`. |
| Grid as a list | The card grid must be a `<ul>` element. Each catalog card is an `<li>`. This communicates the collection structure to screen readers and enables screen-reader list navigation shortcuts. |
| Results count live region | The results count element must carry `aria-live="polite"` and `aria-atomic="true"`. When the count changes after a filter or sort, screen readers announce the new count without interrupting the current reading flow. |
| Loading state announcement | The grid region must carry `aria-busy="true"` while results are loading and `aria-busy="false"` when complete. This communicates the loading state to screen readers. A visually hidden status message using `aria-live="polite"` may supplement: "Loading results" on start, "Results loaded" on completion. |
| Filter controls | Each filter group must carry a visible or visually-hidden label. Checkbox groups must be wrapped in `<fieldset>` with a `<legend>` naming the filter category. |
| Active filter tags | Each dismissible active filter tag must carry an `aria-label` on its dismiss button that identifies what is being removed: `aria-label="Remove filter: Airline — Saudia"`. |
| Clear all | The "Clear all" button must programmatically move focus to the search input or the first filter control after clearing, so keyboard users do not lose their position. |
| Sort control | The sort select carries a `<label>` associated via `for`/`id`. Button-group sort options carry `aria-pressed` to communicate the current selection state. |
| Pagination | Page number links carry `aria-label` describing their destination: `aria-label="Page 3"`. The current page carries `aria-current="page"`. Prev/Next controls carry descriptive `aria-label` values: "Previous page", "Next page". |
| Keyboard navigation | Tab moves through: search input → filter controls → sort control → first card → subsequent cards → pagination. The filter panel (when collapsible) receives focus when opened and returns focus to the "Filters" button when closed. |
| Skip navigation | A skip link at the block-start of the page allows keyboard users to jump directly to the card grid, bypassing the toolbar. This is a product-level concern but the catalog list must not obstruct it. |
| WCAG criteria | SC 1.3.1 (Info and Relationships), SC 2.1.1 (Keyboard), SC 2.4.3 (Focus Order), SC 4.1.3 (Status Messages), SC 1.4.3 (Contrast Minimum) |

---

## 9. Content Guidelines

- **Results count: be specific.** "128 flights", "18 hotels", "6 results for 'Dubai'" — name the entity type and reflect any active search term. Do not use generic "results" without context if the entity type is known.
- **Empty state: explain the cause.** "No flights match your filters" is correct for a filtered-empty state. "No hotels found for 'Maldives'" is correct for a search-empty state. Do not show the same empty state message for all zero-result scenarios.
- **Filter labels: name the category, not the control type.** "Airline", "Star rating", "Price range", "Meal plan" — not "Filter by airline", "Filter by price", "Meal plan filter". The filter interaction context makes "filter by" redundant.
- **Active filter tags: show the selected value.** "Airline: Saudia", "Under SAR 500", "Direct flights only" — not just "Filter 1" or an icon alone. The user must be able to read what they have applied without opening the filter panel.
- **Sort options: use action-oriented labels.** "Price: low to high", "Highest rated", "Departure: earliest first" — not "Ascending", "Descending", or "Sort 1".
- **Pagination labels: reflect the scope.** "Showing 1–24 of 128 flights" provides orientation. When using infinite scroll, "You've seen 24 of 128 hotels" or "Showing all 128 results" when complete.
- **Avoid cluttering the toolbar.** The toolbar must not show more than one search input, one sort control, and one active filter area simultaneously. If the filter set is large, use a collapsible panel — do not expand the toolbar to accommodate every filter option inline.
- **Consistent card type per list.** A single catalog list must use one card variant throughout — do not mix flight cards and hotel cards in the same grid. A featured card may appear as an editorial exception at a fixed position (first item or top row) when needed by the product context.

---

## 10. Code Example

```html
<!-- ============================================================ -->
<!-- Catalog list — grid layout (default)                         -->
<!-- ============================================================ -->
<div class="catalog-list">

  <!-- Toolbar: search, active filters, sort -->
  <div class="catalog-list__toolbar" role="search" aria-label="Filter and sort flights">

    <!-- Search input atom -->
    <div class="catalog-list__search">
      <label for="catalog-search" class="visually-hidden">Search flights, hotels, or destinations</label>
      <input
        id="catalog-search"
        class="input input--md"
        type="search"
        placeholder="Search flights, hotels, or destinations"
        autocomplete="off"
      />
    </div>

    <!-- Active filter tags row -->
    <div class="catalog-list__active-filters" aria-label="Active filters">
      <!-- tag atoms with dismiss — rendered when filters are applied -->
      <span class="tag tag--brand">
        Airline: Saudia
        <button
          class="tag__dismiss"
          type="button"
          aria-label="Remove filter: Airline — Saudia"
        >
          <svg class="icon icon--sm" aria-hidden="true" focusable="false">
            <use href="/icons/sprite.svg#x" />
          </svg>
        </button>
      </span>

      <span class="tag tag--brand">
        Direct flights only
        <button
          class="tag__dismiss"
          type="button"
          aria-label="Remove filter: Direct flights only"
        >
          <svg class="icon icon--sm" aria-hidden="true" focusable="false">
            <use href="/icons/sprite.svg#x" />
          </svg>
        </button>
      </span>

      <!-- Clear all button atom — visible when filters are active -->
      <button class="button button--ghost button--sm" type="button">
        Clear all
      </button>
    </div>

    <!-- Sort control -->
    <div class="catalog-list__sort">
      <label for="catalog-sort" class="catalog-list__sort-label">Sort by</label>
      <select id="catalog-sort" class="input input--md input--select">
        <option value="relevance">Relevance</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="rating">Highest rated</option>
        <option value="departure">Departure: earliest first</option>
      </select>
    </div>

  </div>

  <!-- Results meta -->
  <div
    class="catalog-list__meta"
    aria-live="polite"
    aria-atomic="true"
  >
    <span class="catalog-list__count">Showing 1–24 of 128 flights</span>
  </div>

  <!-- Loading state — initial or page load -->
  <div class="catalog-list__loading-state" hidden aria-live="polite">
    <div class="catalog-list__spinner">
      <!-- spinner atom -->
      <div class="spinner spinner--default spinner--md" role="status">
        <span class="visually-hidden">Loading results</span>
      </div>
    </div>
  </div>

  <!-- Card grid — populated state -->
  <ul
    class="catalog-list__grid catalog-list__grid--4col"
    aria-label="Flights"
    aria-busy="false"
  >
    <li class="catalog-list__item">
      <!-- catalog-card pattern — flight card variant -->
    </li>
    <li class="catalog-list__item">
      <!-- catalog-card pattern — flight card variant -->
    </li>
    <!-- additional catalog-card items -->
  </ul>

  <!-- Empty state — zero results -->
  <div class="catalog-list__empty" hidden>
    <!-- empty-state pattern — no search results variant -->
  </div>

  <!-- Pagination -->
  <nav class="catalog-list__pagination" aria-label="Page navigation">
    <ul class="catalog-list__page-list">

      <li>
        <button
          class="button button--secondary button--sm"
          type="button"
          aria-label="Previous page"
          disabled
        >
          <svg class="icon icon--sm" aria-hidden="true" focusable="false">
            <use href="/icons/sprite.svg#chevron-start" />
          </svg>
        </button>
      </li>

      <li>
        <a
          href="/flights?page=1"
          class="link catalog-list__page-link catalog-list__page-link--current"
          aria-current="page"
          aria-label="Page 1"
        >1</a>
      </li>

      <li>
        <a
          href="/flights?page=2"
          class="link catalog-list__page-link"
          aria-label="Page 2"
        >2</a>
      </li>

      <li>
        <a
          href="/flights?page=3"
          class="link catalog-list__page-link"
          aria-label="Page 3"
        >3</a>
      </li>

      <li>
        <button
          class="button button--secondary button--sm"
          type="button"
          aria-label="Next page"
        >
          <svg class="icon icon--sm" aria-hidden="true" focusable="false">
            <use href="/icons/sprite.svg#chevron-end" />
          </svg>
        </button>
      </li>

    </ul>
  </nav>

</div>


<!-- ============================================================ -->
<!-- Infinite scroll — load more sentinel                         -->
<!-- ============================================================ -->
<!--
  Append below the grid when using infinite scroll instead of pagination.
  The sentinel is observed via IntersectionObserver at the implementation level.
-->
<div class="catalog-list__sentinel" aria-hidden="true"></div>

<div class="catalog-list__load-more-status" aria-live="polite" aria-atomic="true">
  <!-- spinner atom shown while loading next batch -->
  <div class="spinner spinner--default spinner--md" role="status" hidden>
    <span class="visually-hidden">Loading more results</span>
  </div>
  <!-- shown when all items are loaded -->
  <p class="catalog-list__end-message" hidden>All 128 flights shown</p>
</div>
```

```css
/* ============================================================ */
/* Catalog List — layout styles                                  */
/* All directional properties use logical CSS for RTL support   */
/* ============================================================ */

/* --- Page-level container --- */
.catalog-list {
  background: var(--color-background-sunken);
  padding-block: var(--spacing-layout-sm);
  padding-inline: var(--spacing-layout-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* --- Toolbar --- */
.catalog-list__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-md);
  background: var(--color-background-surface);
  border-block-end: 1px solid var(--color-border-subtle);
  padding-block: var(--spacing-sm);
  padding-inline: var(--spacing-md);
  border-radius: var(--radius-lg);
}

.catalog-list__search {
  flex: 1;
  min-inline-size: 0;
}

/* --- Active filter tags row --- */
.catalog-list__active-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-xs);
  flex: 1;
}

/* --- Sort control --- */
.catalog-list__sort {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-shrink: 0;
}

.catalog-list__sort-label {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-secondary);
  white-space: nowrap;
}

/* --- Results count meta --- */
.catalog-list__meta {
  display: flex;
  align-items: center;
}

.catalog-list__count {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-secondary);
}

/* --- Loading state --- */
.catalog-list__loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: var(--spacing-layout-sm);
}

/* --- Card grid — base --- */
.catalog-list__grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--spacing-md);
  /* Default: 4-column grid — column count managed per breakpoint */
  grid-template-columns: repeat(4, 1fr);
}

/* 3 columns — medium viewports */
@media (max-width: 1024px) {
  .catalog-list__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 2 columns — narrow viewports */
@media (max-width: 768px) {
  .catalog-list__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 1 column — mobile */
@media (max-width: 480px) {
  .catalog-list__grid {
    grid-template-columns: 1fr;
  }
}

/* --- List layout variant — single column horizontal cards --- */
.catalog-list__grid--list {
  grid-template-columns: 1fr;
}

/* --- Compact layout variant — denser grid --- */
.catalog-list__grid--compact {
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-sm);
}

@media (max-width: 1024px) {
  .catalog-list__grid--compact {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .catalog-list__grid--compact {
    grid-template-columns: repeat(3, 1fr);
  }
}

.catalog-list__item {
  display: contents;
}

/* --- Empty state --- */
.catalog-list__empty {
  display: flex;
  justify-content: center;
  padding-block: var(--spacing-layout-sm);
}

/* --- Pagination --- */
.catalog-list__pagination {
  display: flex;
  justify-content: center;
  padding-block-start: var(--spacing-lg);
}

.catalog-list__page-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.catalog-list__page-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: var(--spacing-lg);
  min-block-size: var(--spacing-lg);
  padding-inline: var(--spacing-sm);
  border-radius: var(--radius-md);
  font-size: var(--text-body-sm-size);
  color: var(--color-text-primary);
  text-decoration: none;
  transition: background-color var(--motion-fast);
}

.catalog-list__page-link:hover {
  background: var(--color-background-subtle);
}

.catalog-list__page-link--current {
  background: var(--color-background-selected);
  color: var(--color-text-brand);
  border: 1px solid var(--color-border-selected);
  font-weight: var(--font-weight-semibold);
}

/* --- Infinite scroll --- */
.catalog-list__sentinel {
  block-size: 1px;
}

.catalog-list__load-more-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding-block: var(--spacing-md);
}

.catalog-list__end-message {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-secondary);
  margin: 0;
}

/* --- Sticky toolbar --- */
.catalog-list__toolbar--sticky {
  position: sticky;
  inset-block-start: 0;
  z-index: 10;
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

/* --- Reduced motion --- */
@media (prefers-reduced-motion: reduce) {
  .catalog-list__page-link {
    transition: none;
  }
}
```

---

## 11. Cross References

- [catalog-card.md](../patterns/catalog-card.md) — The repeating content unit rendered inside the grid
- [empty-state.md](../patterns/empty-state.md) — Rendered when the collection is empty, filtered to zero results, or in an error state
- [button.md](../atoms/button.md) — Sort option buttons, load more trigger, clear filters action, and pagination controls
- [input.md](../atoms/input.md) — Search field and sort select control in the toolbar
- [tag.md](../atoms/tag.md) — Active filter chips displayed in the toolbar
- [checkbox.md](../atoms/checkbox.md) — Individual filter options within collapsible filter panels or inline filter groups
- [link.md](../atoms/link.md) — Bookmarkable pagination page number links
- [spinner.md](../atoms/spinner.md) — Loading indicator for initial load, filter-change load, and infinite scroll batch loading
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all values used by this pattern
