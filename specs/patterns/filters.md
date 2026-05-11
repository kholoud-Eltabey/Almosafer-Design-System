---
name: Filters
tier: pattern
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Filters

---

## 1. Overview

The filters pattern provides structured controls that allow users to narrow a large collection of items by applying one or more criteria. It manages filter selection, display of active filters, and coordination with the catalog list or any collection it governs. Filters are composites of existing atoms — checkbox, radio, input, switch, tag, button, and icon-button — arranged into groups and surfaced in one of four placement variants: sidebar, top bar, modal, or inline.

The pattern operates in two apply modes. **Immediate mode** updates the collection after each individual filter change. **Explicit apply mode** stages all changes and commits them only when the user confirms with an Apply action — appropriate when recalculating results is expensive or when the full filter set is shown in a modal before the user has seen the results.

---

## 2. When to Use

- Narrowing a catalog list, search results page, or any large item collection by one or more criteria.
- Providing faceted filtering across multiple independent dimensions — airline, price, stops, star rating, meal plan, free cancellation.
- Surfaces where the user must be able to see and remove all currently active filters at a glance.
- Mobile or constrained surfaces where filter controls must be hidden by default and revealed on demand (modal variant).

---

## 3. When Not to Use

- **Single-attribute sorting** — If the user only needs to reorder a list by one attribute, use a sort control (select input or button group) within the catalog list toolbar. Sorting is not filtering.
- **Small fixed sets** — If the full collection fits on one page and has fewer than eight items, exposing filter controls adds complexity without benefit. Show all items directly.
- **Search-only narrowing** — If a text search input is the only narrowing mechanism needed, use the input atom alone. The full filters pattern is not required.
- **Table-level column filtering** — Filtering inside a data table is a distinct interaction handled within the table pattern. Do not embed the filters pattern inside a table.

---

## 4. Composition

| Atom / Pattern | Role |
|---|---|
| **checkbox** atom | Multi-select filter options within a group. Allows several values to be active simultaneously. |
| **radio** atom | Single-select filter options within a group. Selecting one option clears the previous selection in that group. |
| **input** atom | Text search within a filter group (when the option list is long); min/max range fields for numeric filters such as price or distance. |
| **switch** atom | Binary filter toggle for a single on/off criterion — "Direct flights only", "Free cancellation". |
| **tag** atom | Active filter chips displayed in the active filters bar. Each chip shows the applied value and carries a dismiss control. |
| **button** atom | Apply action (explicit apply mode); Clear all action; "Show more options" expander within an oversized group. |
| **icon-button** atom | Collapse/expand toggle for collapsible filter groups in the sidebar variant. |
| **catalog-list** pattern | The collection governed by the filters. Filter state changes propagate to the catalog list. |
| **empty-state** pattern | Displayed within the catalog list area when applied filters return zero results. |

Additional structural elements (not atoms):

| Element | Role |
|---|---|
| **Filter container** | The outermost wrapper for the filter pattern. Establishes the placement variant context (sidebar, top bar, modal, inline). |
| **Filter group** | A `<fieldset>` wrapping related filter controls. Carries a `<legend>` as the group label. Can be collapsible. |
| **Active filters bar** | A persistent row showing all currently active filter tags and the Clear all action. Shared between sidebar and top bar variants. |
| **Range pair** | Two input atoms (min/max) rendered side by side within a filter group for numeric range selection. |

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Filter container — background | `color.background.surface` | Surface for sidebar and top bar containers |
| Filter container — border | `color.border.default` | Container edge in sidebar variant, 1px |
| Filter container — radius | `radius.lg` | Container rounding in sidebar variant |
| Filter container — padding | `spacing.md` | Internal padding in sidebar variant |
| Filter group — gap between groups | `spacing.lg` | Vertical separation between filter groups |
| Filter group — gap between options | `spacing.sm` | Vertical gap between checkbox or radio items |
| Filter group — divider | `color.border.subtle` | Horizontal rule between adjacent groups |
| Filter group label — font size | `text.body.sm` | Group heading (`<legend>`) text size |
| Filter group label — color | `color.text.primary` | Full-contrast group label |
| Filter group label — font weight | Used with `text.body.sm` | Semibold to distinguish label from option text |
| Filter option count — font size | `text.caption` | Result count shown beside a filter option label |
| Filter option count — color | `color.text.subtle` | De-emphasised count beside the option label |
| Active filters bar — gap | `spacing.xs` | Gap between active filter tags |
| Active filters bar — padding (block-end) | `spacing.sm` | Space below the tag row before the filter groups |
| Range pair — gap | `spacing.sm` | Gap between min and max input atoms |
| Range field label — font size | `text.caption` | "Min" / "Max" label above each input |
| Range field label — color | `color.text.secondary` | Supporting hierarchy for range labels |
| Range separator — color | `color.text.subtle` | "–" glyph between min and max fields |
| Disabled option — text | `color.text.disabled` | Unavailable filter option label |
| Disabled option — border | `color.border.disabled` | Unavailable filter option control border (handled by atom) |
| Top bar — background | `color.background.surface` | Horizontal filter strip surface |
| Top bar — border (block-end) | `color.border.subtle` | Bottom divider below top bar |
| Top bar — padding (block) | `spacing.sm` | Top and bottom padding inside top bar |
| Top bar — padding (inline) | `spacing.md` | Left and right padding inside top bar |
| Top bar — gap between controls | `spacing.xs` | Gap between filter buttons and tags in top bar |
| Filter actions area — gap | `spacing.sm` | Gap between Apply and Clear all buttons |
| Filter actions area — padding (block-start) | `spacing.md` | Space above the action row in sidebar/modal |
| Loading transition | `motion.fast` | Control state transitions during filter operations |

---

## 6. Variants

### Sidebar filters

A vertical panel positioned on the inline-start side of the catalog list. Filter groups stack from block-start to block-end. Each group is optionally collapsible via an icon-button toggle. Suitable for desktop-primary surfaces with wide viewports and complex filter sets. The sidebar is always visible on desktop. On narrow viewports it collapses behind a toggle button in the catalog list toolbar, revealing as an overlay or a full-screen modal.

The sidebar operates in immediate mode by default. Explicit apply mode with an Apply button is available when result recalculation is slow enough to warrant it.

### Top bar filters

A horizontal strip above the catalog list. Filter categories are surfaced as button atoms or tag atoms in a scrollable row. Active filters appear as dismissible tag atoms in the same row or in a secondary row below. Best suited to a small number of filter categories (three to six) where each category has a compact label. Operates exclusively in immediate mode.

A "More filters" or "All filters" button atom reveals the remaining filter options — either as a popover or by opening the modal variant.

### Modal filters

Filter controls are presented inside a full-screen overlay on mobile or a centered dialog on desktop. The full filter set is shown before results are updated, making this well-suited to complex filter sets on mobile and to surfaces where immediate result updates would be disruptive. Always operates in explicit apply mode — the Apply button commits all staged changes. A Cancel or close action discards pending changes and restores the previous filter state.

The modal variant does not duplicate dialog pattern tokens or structure. It places the filter container and its groups inside the dialog body, with Apply and Cancel button atoms in the dialog footer area.

### Inline filters

Filter controls embedded directly within a content area — typically a compact row of checkboxes, radios, or a search input above a short list. No container or sidebar. Used when the filter set is minimal (one or two options) and the surface does not justify a full sidebar or modal. Operates in immediate mode only.

---

## 7. Behavior

### Immediate mode — selecting filters

Each filter option change (checkbox checked, radio selected, switch toggled, range value committed on blur) triggers an immediate result update in the governed catalog list. The catalog list enters its loading state while the new result set is fetched. Filter controls remain interactive during loading. The active filters bar updates to reflect the new selection immediately.

### Explicit apply mode — staging and applying

In explicit apply mode, filter changes are staged locally without triggering a fetch. The Apply button label reflects the number of matching results when that count is available: "Show 48 results". Pressing Apply commits all staged changes, triggers the fetch, and updates the catalog list. Pressing Cancel or the dialog close action discards all staged changes and restores the filter state to what it was before the modal was opened.

### Selecting checkbox filters

Multiple checkboxes within a group may be active simultaneously. Checking an option adds it to the active filters. Unchecking removes it. When all options within a group are cleared, the group returns to its default state and no tag is shown for that group. An active tag for a multi-value checkbox group shows the group name and the count of active values: "Airline: 2 selected".

### Selecting radio filters

Only one radio option per group can be active. Selecting a new option replaces the previous one. The active filters bar shows a single tag for the group: "Stops: Direct only". Deselecting the active radio within a group (if the group permits a no-selection state) clears the group's tag.

### Selecting range filters

Min and max input atoms accept numeric values. The range is applied on blur from either field. Both fields must be validated: min must not exceed max. If an invalid range is entered, an inline error state on the offending input atom describes the problem. The active filters bar shows a tag summarising the range: "SAR 100 – 500".

### Switching binary filters

A switch atom toggled to on applies the binary criterion immediately (in both modes). The active filters bar shows a tag: "Direct flights only". Toggling back removes the tag.

### Removing individual filters

Pressing the dismiss button on an active filter tag removes that filter. In immediate mode, the result set updates. In explicit apply mode, the removal is staged — the tag disappears from the active bar but the Apply button must still be pressed to commit. Removing a filter from a radio group resets that group to no selection. Removing a tag for a multi-value checkbox group that shows "Airline: 2 selected" opens the group in the sidebar so the user can see which specific options are active.

### Clearing all filters

The "Clear all" button atom removes all active filters at once. In immediate mode, the result set immediately returns to its unfiltered state. In explicit apply mode, all staged and committed filters are cleared. Focus moves to the first filter control after clearing so the keyboard user does not lose their position. The "Clear all" button and the active filters bar are hidden when no filters are active.

### Collapsible filter groups

In the sidebar variant, each group can be collapsed or expanded independently via its icon-button toggle. The toggle carries `aria-expanded` reflecting the current state. Groups with at least one active filter are always expanded by default, even if the user had previously collapsed them, so that active selections are never hidden. The collapsed state hides the group's options but keeps the group label and toggle visible.

### Empty results

When the applied filters produce zero results, the catalog list renders the empty-state pattern in the no-search-results variant. The filter panel remains visible and interactive. The empty state includes a "Clear filters" action button that triggers the same behavior as "Clear all". Filter controls must not be disabled or hidden when results are empty — the user must be able to modify the filter set without a page reload.

### Disabled filter options

Filter options that are not applicable under the current selection state are rendered in the disabled state of their respective atom (checkbox or radio). A disabled option carries a tooltip atom (on hover and focus) explaining why it is unavailable: "No results match your other filters." Disabled options remain in the DOM and in the focus order — they are not removed.

---

## 8. Accessibility

| Requirement | Rule |
|---|---|
| Group structure | Every filter group must be a `<fieldset>` element with a `<legend>` as the group label. This communicates group membership to screen readers and enables screen-reader fieldset navigation shortcuts. |
| Group legend | The `<legend>` must be the first child of `<fieldset>`. It must be visible — not visually hidden — unless the label is provided by a heading immediately preceding the fieldset. |
| Collapsible groups | The icon-button toggle for collapsing a group must carry `aria-expanded="true"` or `aria-expanded="false"`, and `aria-controls` referencing the `id` of the collapsible options container. |
| Checkbox and radio labels | Labels must be associated with their controls. Handled by the checkbox and radio atoms — do not override association within the filters pattern. |
| Option counts | Result counts shown beside an option label ("Sony (24)") must be readable in sequence. Do not use parentheses-only presentation without testing against screen readers. The count is supplementary — do not rely on it as the sole way to communicate option scope. |
| Active filters bar | The active filters bar must carry `aria-label="Active filters"`. When no filters are active and the bar is hidden, it must be removed from the accessibility tree (`hidden` attribute or `display: none`). |
| Tag dismiss labels | Each dismiss button on an active filter tag must carry a descriptive `aria-label`: "Remove filter: Airline — Saudia". Do not use a generic "Remove" or icon alone. |
| Clear all focus | After "Clear all" is activated, focus must move to the first interactive filter control. Do not leave focus at a now-removed element. |
| Result count live region | The result count in the catalog list must carry `aria-live="polite"` and `aria-atomic="true"` (handled by the catalog-list pattern). The filters pattern must not introduce a duplicate live region. |
| Apply button result count | In explicit apply mode, the Apply button label that includes a result count must also be available to screen readers: `aria-label="Show 48 results"` when the label is "Show 48 results". If the count is loading, the label must be "Apply filters" — do not show a spinner inside the button label text. |
| Keyboard navigation | Tab moves through: active filter tags and their dismiss buttons → Clear all → filter groups in order → each option within a group → Apply button (if present). Arrow keys navigate within a radio group. |
| Range filter labels | Each input in a range pair must carry a visible `<label>` — "Min" and "Max" — associated via `for`/`id`. Do not use placeholder text alone as the label. |
| Disabled options | Disabled checkboxes and radios must remain focusable and carry a tooltip explaining why they are unavailable. Removing them from the DOM would hide valid filter options from the user. |
| WCAG criteria | SC 1.3.1 (Info and Relationships), SC 2.1.1 (Keyboard), SC 2.4.3 (Focus Order), SC 4.1.2 (Name, Role, Value), SC 1.4.3 (Contrast Minimum), SC 4.1.3 (Status Messages) |

---

## 9. Content Guidelines

- **Group labels: name the dimension, not the control.** "Airline", "Price range", "Star rating", "Meal plan" — not "Filter by airline", "Select price range", "Choose a meal plan". The filter context makes the verb redundant.
- **Option labels: use the value, not a description.** "Saudia", "Under SAR 500", "5 stars", "4 stars and above" — not "Saudia flights", "Low price", "Five-star hotels". Brevity wins at this density.
- **Option counts: show when meaningful.** Showing the number of results each option would return helps the user avoid dead ends: "Saudia (24)". Omit counts when the collection is too dynamic for accurate counts to be reliable — stale counts are worse than no counts.
- **Active filter tags: show the value, not just the group.** "Airline: Saudia" is correct. "Airline" alone is not. For multi-value tags: "Airline: 3 selected" is acceptable. "Filters: 3" is not.
- **Apply button label: include the result count when known.** "Show 48 results" is clearer than "Apply". When the count is unknown or loading, use "Apply filters". Do not use "OK", "Done", or "Submit".
- **Clear all: never rename.** The label is always "Clear all". Do not use "Reset", "Remove filters", "Start over", or "Cancel filters". "Cancel" is reserved for discarding unsaved changes in a modal.
- **Avoid duplicate filters.** Do not expose the same dimension in two groups. Do not surface a filter option that is always true for the entire collection (it provides no narrowing value). Remove empty groups — groups with zero available options must not be shown.
- **Collapsible group labels: match the expanded label exactly.** The collapsed legend and the expanded legend must be identical. Do not rename a group based on its expand state.
- **Range placeholders: indicate the unit.** Placeholder text in a price range input must include the currency unit or zero: "0" or "SAR 0" for min, "Any" or "No limit" for max. Do not leave a price input without a unit indicator.
- **Short labels only.** No filter option label should exceed four words. If an option requires more explanation, the option is too complex for a filter — reconsider the data model.

---

## 10. Code Example

```html
<!-- ============================================================ -->
<!-- Sidebar filters — immediate apply mode                       -->
<!-- ============================================================ -->
<aside
  class="filters filters--sidebar"
  aria-label="Filter flights"
>

  <!-- Active filters bar — visible only when filters are active -->
  <div class="filters__active-bar" aria-label="Active filters">
    <div class="filters__active-tags">

      <!-- tag atom with dismiss — one per active filter value -->
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

    </div>

    <!-- button atom — clear all -->
    <button class="button button--ghost button--sm" type="button">
      Clear all
    </button>
  </div>

  <!-- ── Filter group: Airline (checkbox, collapsible) ── -->
  <fieldset class="filters__group">
    <div class="filters__group-header">
      <legend class="filters__group-label">Airline</legend>

      <!-- icon-button atom — collapse/expand toggle -->
      <button
        class="icon-button icon-button--subtle icon-button--sm"
        type="button"
        aria-expanded="true"
        aria-controls="filter-group-airline"
        aria-label="Collapse Airline filter group"
      >
        <svg class="icon-button__icon" aria-hidden="true" focusable="false">
          <use href="/icons/sprite.svg#chevron-up" />
        </svg>
      </button>
    </div>

    <div id="filter-group-airline" class="filters__group-options">

      <!-- checkbox atom -->
      <label class="checkbox filters__option">
        <input
          class="checkbox__input"
          type="checkbox"
          name="airline"
          value="saudia"
          checked
        />
        <span class="checkbox__label">
          Saudia
          <span class="filters__option-count" aria-hidden="true">(24)</span>
          <span class="visually-hidden">, 24 flights</span>
        </span>
      </label>

      <label class="checkbox filters__option">
        <input
          class="checkbox__input"
          type="checkbox"
          name="airline"
          value="flynas"
        />
        <span class="checkbox__label">
          flynas
          <span class="filters__option-count" aria-hidden="true">(18)</span>
          <span class="visually-hidden">, 18 flights</span>
        </span>
      </label>

      <label class="checkbox filters__option">
        <input
          class="checkbox__input"
          type="checkbox"
          name="airline"
          value="emirates"
        />
        <span class="checkbox__label">
          Emirates
          <span class="filters__option-count" aria-hidden="true">(31)</span>
          <span class="visually-hidden">, 31 flights</span>
        </span>
      </label>

      <!-- disabled option — not applicable under current selection -->
      <label class="checkbox filters__option filters__option--disabled">
        <input
          class="checkbox__input"
          type="checkbox"
          name="airline"
          value="turkish"
          disabled
          aria-describedby="tooltip-turkish"
        />
        <span class="checkbox__label">Turkish Airlines</span>
      </label>
      <div
        id="tooltip-turkish"
        role="tooltip"
        class="tooltip tooltip--default"
        hidden
      >
        No results match your other filters
      </div>

    </div>
  </fieldset>

  <!-- ── Filter group: Stops (radio) ── -->
  <fieldset class="filters__group">
    <div class="filters__group-header">
      <legend class="filters__group-label">Stops</legend>

      <button
        class="icon-button icon-button--subtle icon-button--sm"
        type="button"
        aria-expanded="true"
        aria-controls="filter-group-stops"
        aria-label="Collapse Stops filter group"
      >
        <svg class="icon-button__icon" aria-hidden="true" focusable="false">
          <use href="/icons/sprite.svg#chevron-up" />
        </svg>
      </button>
    </div>

    <div id="filter-group-stops" class="filters__group-options">

      <!-- radio atom -->
      <label class="radio filters__option">
        <input class="radio__input" type="radio" name="stops" value="any" checked />
        <span class="radio__label">Any</span>
      </label>

      <label class="radio filters__option">
        <input class="radio__input" type="radio" name="stops" value="direct" />
        <span class="radio__label">Direct only</span>
      </label>

      <label class="radio filters__option">
        <input class="radio__input" type="radio" name="stops" value="one-stop" />
        <span class="radio__label">1 stop</span>
      </label>

      <label class="radio filters__option">
        <input class="radio__input" type="radio" name="stops" value="two-plus" />
        <span class="radio__label">2+ stops</span>
      </label>

    </div>
  </fieldset>

  <!-- ── Filter group: Custom price range (input) ── -->
  <fieldset class="filters__group">
    <legend class="filters__group-label">Custom price</legend>

    <div class="filters__range">
      <div class="filters__range-field">
        <label class="filters__range-label" for="price-min">Min</label>
        <!-- input atom -->
        <input
          id="price-min"
          class="input input--md"
          type="number"
          min="0"
          placeholder="0"
          aria-label="Minimum price in SAR"
        />
      </div>

      <span class="filters__range-separator" aria-hidden="true">–</span>

      <div class="filters__range-field">
        <label class="filters__range-label" for="price-max">Max</label>
        <!-- input atom -->
        <input
          id="price-max"
          class="input input--md"
          type="number"
          min="0"
          placeholder="Any"
          aria-label="Maximum price in SAR"
        />
      </div>
    </div>
  </fieldset>

  <!-- ── Filter group: Options (switch) ── -->
  <fieldset class="filters__group">
    <legend class="filters__group-label">Options</legend>

    <div class="filters__group-options">
      <label class="switch filters__option">
        <!-- switch atom -->
        <input class="switch__input" type="checkbox" name="direct-only" value="1" />
        <span class="switch__track" aria-hidden="true"></span>
        <span class="switch__label">Direct flights only</span>
      </label>

      <label class="switch filters__option">
        <input class="switch__input" type="checkbox" name="free-cancellation" value="1" />
        <span class="switch__track" aria-hidden="true"></span>
        <span class="switch__label">Free cancellation</span>
      </label>
    </div>
  </fieldset>

</aside>


<!-- ============================================================ -->
<!-- Top bar filters — immediate apply mode                       -->
<!-- ============================================================ -->
<div class="filters filters--topbar" role="search" aria-label="Filter flights">

  <!-- Filter category buttons — each opens a popover or panel -->
  <div class="filters__topbar-controls">

    <!-- button atom — filter category trigger -->
    <button class="button button--secondary button--sm" type="button" aria-expanded="false">
      Airline
    </button>

    <button class="button button--secondary button--sm" type="button" aria-expanded="false">
      Price
    </button>

    <button class="button button--secondary button--sm filters__topbar-btn--active" type="button" aria-expanded="false" aria-pressed="true">
      Star rating
      <span class="visually-hidden">(1 filter active)</span>
    </button>

    <!-- button atom — reveal remaining filters -->
    <button class="button button--ghost button--sm" type="button">
      All filters
    </button>

  </div>

  <!-- Active filter tags — same row or secondary row -->
  <div class="filters__active-bar filters__active-bar--inline" aria-label="Active filters">
    <div class="filters__active-tags">

      <span class="tag tag--brand">
        4 stars and above
        <button
          class="tag__dismiss"
          type="button"
          aria-label="Remove filter: Star rating — 4 stars and above"
        >
          <svg class="icon icon--sm" aria-hidden="true" focusable="false">
            <use href="/icons/sprite.svg#x" />
          </svg>
        </button>
      </span>

    </div>

    <button class="button button--ghost button--sm" type="button">
      Clear all
    </button>
  </div>

</div>


<!-- ============================================================ -->
<!-- Explicit apply mode — action row (sidebar or modal footer)  -->
<!-- ============================================================ -->
<div class="filters__actions">
  <!-- button atom — primary -->
  <button class="button button--primary button--md" type="button" aria-label="Show 48 results">
    Show 48 results
  </button>

  <!-- button atom — ghost -->
  <button class="button button--ghost button--md" type="button">
    Clear all
  </button>
</div>
```

```css
/* ============================================================ */
/* Filters — layout styles                                       */
/* All directional properties use logical CSS for RTL support   */
/* ============================================================ */

/* --- Sidebar variant --- */
.filters--sidebar {
  background: var(--color-background-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* --- Active filters bar --- */
.filters__active-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-xs);
  padding-block-end: var(--spacing-sm);
  border-block-end: 1px solid var(--color-border-subtle);
}

.filters__active-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-xs);
  flex: 1;
}

/* --- Filter group --- */
.filters__group {
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.filters__group + .filters__group {
  padding-block-start: var(--spacing-lg);
  border-block-start: 1px solid var(--color-border-subtle);
}

.filters__group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filters__group-label {
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  float: none; /* fieldset legend reset */
  padding: 0;
}

/* --- Group options container --- */
.filters__group-options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

/* Collapsed state — toggled by JS removing/adding hidden attribute */
.filters__group-options[hidden] {
  display: none;
}

/* --- Filter option row --- */
.filters__option {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.filters__option--disabled {
  pointer-events: none;
}

/* --- Option count --- */
.filters__option-count {
  font-size: var(--text-caption-size);
  color: var(--color-text-subtle);
  margin-inline-start: var(--spacing-xs);
}

/* --- Range pair --- */
.filters__range {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-sm);
}

.filters__range-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  flex: 1;
}

.filters__range-label {
  font-size: var(--text-caption-size);
  color: var(--color-text-secondary);
}

.filters__range-separator {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-subtle);
  padding-block-end: var(--spacing-sm);
  flex-shrink: 0;
}

/* --- Filter actions row --- */
.filters__actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding-block-start: var(--spacing-md);
  border-block-start: 1px solid var(--color-border-subtle);
}

/* --- Top bar variant --- */
.filters--topbar {
  background: var(--color-background-surface);
  border-block-end: 1px solid var(--color-border-subtle);
  padding-block: var(--spacing-sm);
  padding-inline: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.filters__topbar-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-xs);
}

/* Active state on a top bar filter button */
.filters__topbar-btn--active {
  background: var(--color-background-selected);
  border-color: var(--color-border-selected);
  color: var(--color-text-brand);
}

/* Inline active bar (beside top bar controls) */
.filters__active-bar--inline {
  border-block-end: none;
  padding-block-end: 0;
}

/* --- Reduced motion --- */
@media (prefers-reduced-motion: reduce) {
  .filters__group-options {
    transition: none;
  }
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

- [input.md](../atoms/input.md) — Search-within-group input and min/max range field atoms
- [checkbox.md](../atoms/checkbox.md) — Multi-select filter options within each group
- [radio.md](../atoms/radio.md) — Single-select filter options within each group
- [switch.md](../atoms/switch.md) — Binary on/off filter criteria (Direct flights only, Free cancellation)
- [tag.md](../atoms/tag.md) — Active filter chips in the active filters bar
- [button.md](../atoms/button.md) — Apply, Clear all, Show more options, and top bar filter category triggers
- [icon-button.md](../atoms/icon-button.md) — Collapse/expand toggle for sidebar filter groups
- [tooltip.md](../atoms/tooltip.md) — Explanation tooltip on disabled filter options
- [catalog-list.md](../patterns/catalog-list.md) — The collection pattern governed by the filters; handles loading state and results count live region
- [empty-state.md](../patterns/empty-state.md) — Rendered within catalog-list when applied filters return zero results
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all values used by this pattern
