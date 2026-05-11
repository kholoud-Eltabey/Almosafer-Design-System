---
name: Table
tier: pattern
status: draft
last-updated: 2026-04-29
maintainer: Team 4
source: Almosafer Design System
---

# Table

---

## 1. Overview

A table presents structured data in rows and columns, enabling users to scan, compare, sort, select, and act on multiple records simultaneously. It is the primary pattern for data-heavy surfaces on Almosafer — booking management, flight and hotel inventory, traveler records, and operator analytics.

Tables communicate density and control. They are built for users who know what they are looking for and need to find it, compare it, and act on it efficiently. Every structural and visual decision in this pattern serves that goal.

---

## 2. When to Use

- Displaying two or more attributes for each of several records, where comparison across rows is meaningful: bookings with status, amount, and date; flights with reference, route, and status.
- Enabling bulk operations on multiple records simultaneously: select ten bookings and export or cancel them.
- Presenting data that benefits from sorting by column: most recent orders first, highest-value products at the top.
- Operator dashboard views where data density and scan efficiency take priority over visual decoration.
- Any context where the user needs to see multiple records and their attributes at the same time before taking action.

---

## 3. When Not to Use

- **Fewer than two columns of meaningful attributes** — Use a list. A single-column table is a list with unnecessary structure.
- **Relationships between records, not attributes** — Use a tree view or a hierarchical list. Tables imply flat, parallel records.
- **A single record with many attributes** — Use a definition list or a detail panel. A one-row table is not a table.
- **Purely decorative or marketing content** — Use a grid or card layout. Tables imply scannable structured data, not visual presentation.
- **Small mobile-first screens without a responsive strategy** — Tables require horizontal space. On narrow viewports, prefer card lists unless the table has a defined responsive collapse behaviour.

---

## 4. Composition

| Element | Atom / role |
|---|---|
| Table container | Native `<table>` element. The semantic anchor for all row and cell structure. Must never be replaced by a `<div>` grid. Wrapped in a horizontally scrollable container to handle overflow on narrow viewports. |
| Caption | `<caption>` element. Provides an accessible name for the table. Visually hidden by default in most contexts — the page heading serves this role — but always present in the DOM for screen readers. |
| Column header row | `<thead>` with a single `<tr>`. Carries all `<th scope="col">` elements. Visually distinct from data rows via header background token. |
| Column header | `<th scope="col">`. Names the column. May contain a sort trigger. Carries `aria-sort` when the column is sortable. |
| Sort trigger | `icon-button` atom (subtle variant, small size) embedded in the column header. Activates sort ascending, descending, or cleared on successive clicks. Carries a `tooltip` atom surfacing the current sort action: "Sort ascending", "Sort descending", "Clear sort". |
| Table body | `<tbody>`. Contains all data rows. Replaced by the empty-state pattern when no records exist. Replaced by a centred `spinner` atom during data loading. |
| Data row | `<tr>`. One row per record. Carries hover and selected state backgrounds. May carry `aria-selected` when the table is in selectable mode. |
| Data cell | `<td>`. One cell per attribute. Carries cell padding tokens and text color tokens. Content may be plain text, a `badge` atom (status), a `tag` atom (category), a `link` atom (navigable record), or an icon. |
| Row selection cell | `<td>` in the first column (inline-start) of a selectable table. Contains a `checkbox` atom with no visible label. Its accessible name is provided by `aria-label="Select [record name]"`. |
| Select-all cell | `<th>` in the column header row of a selectable table, aligned to the selection column. Contains a `checkbox` atom with `aria-label="Select all rows"`. Displays the indeterminate state when some but not all rows are selected. |
| Row actions cell | `<td>` in the last column (inline-end). Contains one or more `icon-button` atoms for per-row operations: view, edit, cancel. Each icon button carries a `tooltip` and a contextual `aria-label` naming the record: `aria-label="Cancel booking #1042"`. |
| Bulk action bar | A panel appearing above the table when one or more rows are selected. Contains the count of selected rows and `button` atoms for bulk operations. Disappears when selection is cleared. Not part of the `<table>` element — rendered as a sibling above the table container. |
| Pagination | A row of navigation controls below the table. Uses `button` atoms for previous, next, and numbered page controls. Not part of the `<table>` element. Omit when the full record set fits within the default row limit. |
| Empty state | The `empty-state` pattern replaces the table body (`<tbody>`) when no records match the current filters or the data set is empty. Spans all columns using a single `<td colspan>`. |

---

## 5. Tokens Used

| Decision | Token | Role |
|---|---|---|
| Container border | `color.border.subtle` | Outer boundary of the table card |
| Container radius | `radius.lg` | Rounded corners on the table container |
| Header background | `color.background.subtle` | Distinguishes the column header row from data rows |
| Row background — default | `color.background.surface` | Standard data row background |
| Row background — hover | `color.background.subtle` | Hover feedback on interactive rows |
| Row background — selected | `color.background.selected` | Active selection state on checked rows |
| Row divider | `color.border.subtle` | Horizontal rule between data rows |
| Header text | `color.text.primary` | Column header label color |
| Header font size | `text.body.sm` | Column header label size |
| Header font weight | `font-weight-semibold` | Column header label weight |
| Cell text — primary | `color.text.primary` | Primary data value color |
| Cell text — secondary | `color.text.secondary` | Supporting, metadata, or de-emphasised value color |
| Cell font size — default | `text.body.md` | Data cell text size in the standard variant |
| Cell font size — dense | `text.body.sm` | Data cell text size in the dense variant |
| Sort indicator — active | `color.text.brand` | Active sort direction arrow color |
| Sort indicator — inactive | `color.text.subtle` | Inactive sort arrow color (column is sortable but not currently sorted) |
| Cell padding block — default | `spacing.sm` | Top and bottom padding in standard data cells and headers |
| Cell padding inline — default | `spacing.md` | Left and right padding in standard data cells and headers |
| Cell padding block — dense | `spacing.xs` | Top and bottom padding in dense variant cells |
| Cell padding inline — dense | `spacing.sm` | Left and right padding in dense variant cells |
| Row action gap | `spacing.xs` | Gap between multiple icon buttons in the actions cell |
| Bulk bar padding block | `spacing.sm` | Top and bottom padding in the bulk action bar |
| Bulk bar padding inline | `spacing.md` | Left and right padding in the bulk action bar |
| Bulk bar background | `color.background.selected` | Background of the bulk action bar when rows are selected |
| Bulk bar border | `color.border.selected` | Bottom border of the bulk action bar |
| Pagination gap | `spacing.xs` | Gap between page number buttons in the pagination row |
| Pagination padding block | `spacing.sm` | Top and bottom padding in the pagination row |
| Hover transition | `motion.fast` | Row background color transition on hover |
| Selection transition | `motion.fast` | Row background transition on checkbox toggle |
| Sort indicator transition | `motion.fast` | Sort arrow color and icon transition |

---

## 6. Variants

### Basic

A read-only table with no selection controls and no row action column. Used to present structured data for scanning and comparison only. No interaction beyond following links within cells.

| Property | Specification |
|---|---|
| Row interaction | Hover background only. No click behaviour unless cells contain links. |
| First column | Data content. No checkbox. |
| Last column | Data content. No action buttons. |
| Sort | Not available in this variant. |
| Keyboard | Tab navigates through links and other interactive cell content only. |

---

### Selectable

Adds a checkbox column at the inline-start of the table. Enables per-row selection and bulk operations via the bulk action bar. The select-all checkbox in the column header manages full-set selection.

| Property | Specification |
|---|---|
| First column | `checkbox` atom. No visible label. `aria-label="Select [record name]"` per row. |
| Header first column | `checkbox` atom. `aria-label="Select all rows"`. Shows indeterminate state on partial selection. |
| Selected row background | `color.background.selected` |
| Bulk action bar | Appears above the table on first selection. Shows count and bulk action buttons. |
| `aria-selected` | Set to `"true"` on selected `<tr>` elements. |

**Rule:** The bulk action bar must always show the count of selected rows in the form "N rows selected" so screen reader users know the scope of the pending operation.

---

### Sortable

Column headers become interactive controls that toggle sort order. Only one column is sorted at a time. The active sort column header carries a visual direction indicator and the `aria-sort` attribute.

| Property | Specification |
|---|---|
| Sortable header | Contains text label and a sort trigger `icon-button`. Cursor is pointer. `aria-sort` attribute present. |
| Sort state — none | `aria-sort="none"`. Inactive sort arrows in `color.text.subtle`. |
| Sort state — ascending | `aria-sort="ascending"`. Up arrow in `color.text.brand`. |
| Sort state — descending | `aria-sort="descending"`. Down arrow in `color.text.brand`. |
| Sort cycle | First click: ascending. Second click: descending. Third click: clears sort. |
| Non-sortable header | Plain text. No sort trigger. No cursor change. `aria-sort` absent. |

**Rule:** Do not make every column sortable by default. Sort the columns that are genuinely useful to sort — date, amount, status. Avoid sorting columns that contain names, descriptions, or non-comparable values unless there is a clear user need.

---

### Dense

Reduces cell padding and font size to maximise the number of visible rows. Intended for operator dashboard surfaces where data density outweighs readability at larger sizes. Uses the compact token set throughout.

| Property | Specification |
|---|---|
| Cell padding block | `spacing.xs` |
| Cell padding inline | `spacing.sm` |
| Cell font size | `text.body.sm` |
| Row actions | Always visible — not only on hover — because hover is less reliable in dense, fast-scrolling contexts. |
| Combination | Compatible with selectable and sortable variants. |

**Rule:** Do not apply the dense variant to consumer-facing surfaces. It is for operator and admin contexts only, where the user is a trained platform operator who understands the data.

---

## 7. Behavior

### Sorting

- Clicking or activating (Enter or Space) a sortable column header cycles the sort state: none → ascending → descending → none.
- Only one column may be sorted at a time. Activating a second column header clears the sort on the previously sorted column before applying the new one.
- The `aria-sort` attribute on the active header updates to reflect the current state.
- The sort trigger `icon-button` tooltip updates to reflect the next sort action: "Sort ascending" when currently unsorted, "Sort descending" when ascending, "Clear sort" when descending.
- The table body re-renders with the sorted data. If data is fetched from the server on sort, the table body enters the loading state (spinner) until the response returns.

### Selection

- Clicking a row checkbox selects that row. Its background transitions to `color.background.selected` using `motion.fast`.
- Clicking the select-all header checkbox selects all currently visible rows. If any rows are selected but not all, the header checkbox shows the indeterminate state. When all rows are selected, it shows the checked state.
- Selecting at least one row shows the bulk action bar above the table. The bar displays the count of selected rows and the available bulk action buttons.
- Deselecting all rows hides the bulk action bar.
- Clicking a selected row's checkbox deselects it. If this is the last selected row, the bulk action bar disappears.
- Sorting, filtering, or paginating away from selected rows does not preserve the selection. The selection is scoped to the current visible set.

### Row actions

- The row action cell contains one to three `icon-button` atoms. More than three actions per row introduces too much visual noise — use an overflow menu (not yet specified in this system).
- In the default and selectable variants, row action buttons are visible only on row hover. This reduces visual noise at rest in large tables.
- In the dense variant, row action buttons are always visible because hover is less reliable in compact, fast-scrolling operator contexts.
- Each icon button in the actions cell carries a unique `aria-label` naming both the action and the record: `aria-label="Edit order #1042"`. Generic labels like `aria-label="Edit"` are not sufficient when multiple rows are visible.
- Icon buttons in action cells carry `tooltip` atoms surfacing their `aria-label` text on hover and focus.

### Loading state

- When the table is fetching or refreshing data, the table body (`<tbody>`) is replaced with a single full-width row containing a centred `spinner` atom (medium size, default variant).
- The column header row remains visible during loading so users retain context about the column structure.
- `aria-busy="true"` is set on the `<table>` element during loading and removed on completion.
- If the loaded result is empty, the loading spinner is replaced by the empty-state pattern.

### Empty state

- When the table has no records to display, the `<tbody>` contains a single `<tr>` with a single `<td colspan>` spanning all columns.
- The empty-state pattern is rendered inside this cell.
- The variant of the empty state matches the reason: "no data" when the record set is genuinely empty; "no search results" when active filters or a search query caused zero results.
- The empty state's primary action, if it creates new records, must be reachable without leaving the table page.

### Pagination

- Pagination controls appear below the table when the total record count exceeds the page size.
- Controls include: previous page button, page number buttons (or a page indicator), and next page button — all using the `button` atom (secondary variant).
- The current page button uses `color.background.selected` as its background to distinguish it from adjacent page buttons.
- Navigating to a new page triggers the loading state on the table body.
- Page size selection (e.g., "25 per page") may appear in the pagination row as a secondary control when the operator needs to control density.

### RTL layout

All directional properties use logical CSS:
- Selection column is at `inline-start`.
- Row actions column is at `inline-end`.
- Cell padding uses `padding-block` and `padding-inline`.
- Bulk action bar layout uses `margin-inline-start` for the action group.
- Sort arrow direction (up/down) is direction-independent and does not require flipping.

---

## 8. Accessibility

| Requirement | Rule |
|---|---|
| Semantic table element | The table must be implemented with native `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` elements. `<div>`-based grid tables are not permitted in this pattern. |
| Caption | Every `<table>` must have a `<caption>` providing its accessible name. If the page heading names the table, the caption may be visually hidden using the `visually-hidden` utility but must remain in the DOM. |
| Column headers | All column headers must be `<th scope="col">`. Do not use `<td>` for headers. Scope tells screen readers which axis the header applies to. |
| Row headers | When a column contains record names or IDs that identify the row, mark those cells as `<th scope="row">`. |
| `aria-sort` | Present on all `<th>` elements in a sortable table. Value is `"ascending"`, `"descending"`, or `"none"` depending on current sort state. Absent on non-sortable columns. |
| Selection | Selected `<tr>` elements carry `aria-selected="true"`. Deselected rows carry `aria-selected="false"` or no attribute. The select-all checkbox uses the `indeterminate` DOM property (not a CSS class) for the partial selection state. |
| Selection announcement | A live region (`aria-live="polite"`) outside the table announces selection changes: "3 rows selected", "All rows deselected". Do not rely on the checkbox state alone to communicate selection scope. |
| Row action labels | Every `icon-button` in a row actions cell must have a unique, contextual `aria-label` naming both the action and the record. Generic labels are not permitted. |
| Keyboard navigation | Interactive elements within cells (links, icon buttons, checkboxes, sort triggers) are reached via Tab. Arrow key navigation within the table grid is not implemented unless a full ARIA grid pattern is adopted. |
| Loading state | `aria-busy="true"` is set on the `<table>` element during loading. A visually hidden live region announces "Loading data" on load start and "Data loaded" on completion. |
| Empty state | The empty state `<td>` carries `colspan` equal to the full column count so it spans the table width. It is announced as a single cell by screen readers. |
| Focus visibility | All interactive elements within the table (sort triggers, checkboxes, icon buttons, links) must display a visible focus ring using `color.border.focus`. `outline: none` is not permitted without a CSS replacement. |
| WCAG criteria | Applies SC 1.3.1 (Info and Relationships), SC 2.1.1 (Keyboard), SC 2.4.3 (Focus Order), SC 2.4.7 (Focus Visible), SC 4.1.2 (Name, Role, Value), SC 4.1.3 (Status Messages). |

---

## 9. Content Guidelines

**Column headers**
- One to three words per header. Name the data attribute, not the data type. "Order total" not "Amount (SAR)". Include the unit only when different columns use different units and the distinction is not obvious.
- Sentence case. No ending punctuation.
- Avoid abbreviations unless they are universally understood in the operator context. "SKU" and "ID" are acceptable. "Qty" should be "Quantity" unless space is severely constrained.
- Sortable columns do not need to signal their sortability in the header label. The sort trigger icon communicates this.

**Cell content**
- Primary cell content (record name, title, ID) uses `color.text.primary`. Supporting content (timestamps, metadata, secondary labels) uses `color.text.secondary`.
- Dates and times must follow a consistent, locale-appropriate format across the entire table. Do not mix formats within a column.
- Monetary values must include the currency symbol or code and use consistent decimal precision within a column. On Almosafer, amounts are displayed in SAR with two decimal places.
- Status values must use the `badge` atom — not plain text — so that colour and label communicate the status together without relying on colour alone.
- Avoid inline editing within table cells in the initial specification. If a cell value must be editable, open a dialog or a side panel.

**Row actions**
- Limit actions per row to three maximum. The most frequent actions appear first (inline-start within the cell in LTR, inline-end in RTL, because the eye reaches the start of the row first).
- Destructive actions (delete, remove) must always be the last icon button in the actions cell and must use the `danger` variant of the `icon-button` atom.
- Every row action must carry a contextual tooltip and aria-label that names both the action and the record. "Cancel booking #1042" not "Cancel".

**Bulk action bar**
- The selected count must be stated in full: "12 rows selected". Do not abbreviate.
- Bulk action button labels must name the operation: "Cancel selected", "Export to CSV", "Archive bookings". Not "Apply" or "Confirm".
- A "Deselect all" or "Clear selection" link must always appear in the bulk action bar to give users an easy exit from selection mode.

**Empty state copy**
- Follow the content guidelines in the empty-state pattern. The no-data and no-results variants are the most common in table contexts.
- Do not use the word "table" in the empty state copy. "No bookings found" is correct. "The bookings table is empty" is not.

---

## 10. Code Example

```html
<!-- Selectable, sortable table — booking management (Almosafer) -->

<!-- Bulk action bar — visible when rows are selected -->
<div class="table-bulk-bar" hidden aria-live="polite">
  <span class="table-bulk-bar__count">0 rows selected</span>
  <div class="table-bulk-bar__actions">
    <button class="button button--secondary" type="button">Cancel selected</button>
    <button class="button button--secondary" type="button">Export</button>
    <button class="table-bulk-bar__clear" type="button">
      Clear selection
    </button>
  </div>
</div>

<!-- Scrollable wrapper for overflow -->
<div class="table-wrapper">
  <table class="table" aria-busy="false">
    <caption class="visually-hidden">Booking management</caption>

    <thead class="table__head">
      <tr>
        <!-- Select-all column -->
        <th class="table__th table__th--select" scope="col">
          <input
            class="checkbox"
            type="checkbox"
            aria-label="Select all rows"
            id="select-all"
          />
        </th>

        <!-- Sortable: Booking ID -->
        <th class="table__th" scope="col" aria-sort="none">
          <div class="table__sort-header">
            <span>Booking</span>
            <button
              class="icon-button icon-button--subtle icon-button--sm"
              type="button"
              aria-label="Sort by Booking ascending"
              aria-describedby="sort-order-tooltip"
            >
              <svg class="icon-button__icon" aria-hidden="true" focusable="false">
                <use href="/icons/sprite.svg#arrows-sort" />
              </svg>
            </button>
            <div id="sort-order-tooltip" role="tooltip" class="tooltip tooltip--default" hidden>
              Sort ascending
            </div>
          </div>
        </th>

        <!-- Sortable: Date -->
        <th class="table__th" scope="col" aria-sort="descending">
          <div class="table__sort-header">
            <span>Date</span>
            <button
              class="icon-button icon-button--subtle icon-button--sm"
              type="button"
              aria-label="Clear sort by Date"
              aria-describedby="sort-date-tooltip"
            >
              <svg class="icon-button__icon" aria-hidden="true" focusable="false">
                <use href="/icons/sprite.svg#arrow-down" />
              </svg>
            </button>
            <div id="sort-date-tooltip" role="tooltip" class="tooltip tooltip--default" hidden>
              Clear sort
            </div>
          </div>
        </th>

        <!-- Non-sortable: Traveler -->
        <th class="table__th" scope="col">Traveler</th>

        <!-- Sortable: Total -->
        <th class="table__th table__th--numeric" scope="col" aria-sort="none">
          <div class="table__sort-header">
            <span>Total</span>
            <button
              class="icon-button icon-button--subtle icon-button--sm"
              type="button"
              aria-label="Sort by Total ascending"
              aria-describedby="sort-total-tooltip"
            >
              <svg class="icon-button__icon" aria-hidden="true" focusable="false">
                <use href="/icons/sprite.svg#arrows-sort" />
              </svg>
            </button>
            <div id="sort-total-tooltip" role="tooltip" class="tooltip tooltip--default" hidden>
              Sort ascending
            </div>
          </div>
        </th>

        <!-- Non-sortable: Status -->
        <th class="table__th" scope="col">Status</th>

        <!-- Actions column — no header label -->
        <th class="table__th table__th--actions" scope="col">
          <span class="visually-hidden">Actions</span>
        </th>
      </tr>
    </thead>

    <tbody class="table__body">
      <!-- Selected row -->
      <tr class="table__row table__row--selected" aria-selected="true">
        <td class="table__td table__td--select">
          <input
            class="checkbox"
            type="checkbox"
            aria-label="Select booking #1042"
            checked
          />
        </td>
        <td class="table__td">
          <a class="link" href="/bookings/1042">#1042</a>
        </td>
        <td class="table__td table__td--secondary">12 Apr 2026</td>
        <td class="table__td">Sara Al-Rashidi</td>
        <td class="table__td table__td--numeric">SAR 320.00</td>
        <td class="table__td">
          <span class="badge badge--success">Confirmed</span>
        </td>
        <td class="table__td table__td--actions">
          <div class="table__row-actions">
            <button
              class="icon-button icon-button--sm"
              type="button"
              aria-label="View booking #1042"
              aria-describedby="action-view-1042"
            >
              <svg class="icon-button__icon" aria-hidden="true" focusable="false">
                <use href="/icons/sprite.svg#eye" />
              </svg>
            </button>
            <div id="action-view-1042" role="tooltip" class="tooltip tooltip--default" hidden>
              View booking
            </div>

            <button
              class="icon-button icon-button--sm icon-button--danger"
              type="button"
              aria-label="Cancel booking #1042"
              aria-describedby="action-cancel-1042"
            >
              <svg class="icon-button__icon" aria-hidden="true" focusable="false">
                <use href="/icons/sprite.svg#x-circle" />
              </svg>
            </button>
            <div id="action-cancel-1042" role="tooltip" class="tooltip tooltip--default" hidden>
              Cancel booking
            </div>
          </div>
        </td>
      </tr>

      <!-- Standard row -->
      <tr class="table__row" aria-selected="false">
        <td class="table__td table__td--select">
          <input
            class="checkbox"
            type="checkbox"
            aria-label="Select booking #1041"
          />
        </td>
        <td class="table__td">
          <a class="link" href="/bookings/1041">#1041</a>
        </td>
        <td class="table__td table__td--secondary">11 Apr 2026</td>
        <td class="table__td">Mohammed Al-Farsi</td>
        <td class="table__td table__td--numeric">SAR 95.50</td>
        <td class="table__td">
          <span class="badge badge--warning">Pending</span>
        </td>
        <td class="table__td table__td--actions">
          <div class="table__row-actions">
            <button
              class="icon-button icon-button--sm"
              type="button"
              aria-label="View booking #1041"
              aria-describedby="action-view-1041"
            >
              <svg class="icon-button__icon" aria-hidden="true" focusable="false">
                <use href="/icons/sprite.svg#eye" />
              </svg>
            </button>
            <div id="action-view-1041" role="tooltip" class="tooltip tooltip--default" hidden>
              View booking
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Pagination -->
<nav class="table-pagination" aria-label="Booking table pagination">
  <button class="button button--secondary" type="button"
          aria-label="Previous page" disabled>Previous</button>
  <button class="button button--secondary table-pagination__page--active"
          type="button" aria-current="page" aria-label="Page 1">1</button>
  <button class="button button--secondary" type="button"
          aria-label="Page 2">2</button>
  <button class="button button--secondary" type="button"
          aria-label="Page 3">3</button>
  <button class="button button--secondary" type="button"
          aria-label="Next page">Next</button>
</nav>

<!-- Live region for selection announcements -->
<div
  class="visually-hidden"
  aria-live="polite"
  aria-atomic="true"
  id="table-selection-status"
></div>
```

```css
/* Scrollable wrapper */
.table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
}

/* Table */
.table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-background-surface);
}

/* Column header row */
.table__head {
  background: var(--color-background-subtle);
}

/* Header cells */
.table__th {
  padding-block: var(--spacing-sm);
  padding-inline: var(--spacing-md);
  color: var(--color-text-primary);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  text-align: start;
  white-space: nowrap;
  border-block-end: 1px solid var(--color-border-subtle);
}

.table__th--numeric {
  text-align: end;
}

.table__th--select,
.table__th--actions {
  padding-inline: var(--spacing-sm);
}

/* Sort header layout */
.table__sort-header {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}

/* Data rows */
.table__row {
  border-block-end: 1px solid var(--color-border-subtle);
  transition: background var(--motion-fast);
}

.table__row:last-child {
  border-block-end: none;
}

.table__row:hover {
  background: var(--color-background-subtle);
}

.table__row--selected {
  background: var(--color-background-selected);
}

.table__row--selected:hover {
  background: var(--color-background-selected);
}

/* Data cells */
.table__td {
  padding-block: var(--spacing-sm);
  padding-inline: var(--spacing-md);
  color: var(--color-text-primary);
  font-size: var(--text-body-size);
  line-height: var(--line-height-normal);
  text-align: start;
}

.table__td--secondary {
  color: var(--color-text-secondary);
}

.table__td--numeric {
  text-align: end;
}

.table__td--select {
  padding-inline: var(--spacing-sm);
}

.table__td--actions {
  padding-inline: var(--spacing-sm);
}

/* Row actions */
.table__row-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  justify-content: flex-end;
  opacity: 0;
  transition: opacity var(--motion-fast);
}

.table__row:hover .table__row-actions,
.table__row:focus-within .table__row-actions {
  opacity: 1;
}

/* Dense variant */
.table--dense .table__th,
.table--dense .table__td {
  padding-block: var(--spacing-xs);
  padding-inline: var(--spacing-sm);
  font-size: var(--text-body-sm-size);
}

.table--dense .table__row-actions {
  opacity: 1; /* always visible in dense */
}

/* Bulk action bar */
.table-bulk-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding-block: var(--spacing-sm);
  padding-inline: var(--spacing-md);
  background: var(--color-background-selected);
  border-block-end: 1px solid var(--color-border-selected);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.table-bulk-bar__count {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.table-bulk-bar__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-inline-start: auto;
}

/* Pagination */
.table-pagination {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding-block: var(--spacing-sm);
  justify-content: flex-end;
}

.table-pagination__page--active {
  background: var(--color-background-selected);
}

/* Focus ring — enforced for all interactive table elements */
.table *:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Visually hidden utility */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## 11. Cross References

- [checkbox.md](../atoms/checkbox.md) — Row selection and select-all controls; the indeterminate state is required for partial selection in the header checkbox
- [icon-button.md](../atoms/icon-button.md) — Sort triggers in column headers and action buttons in row action cells; contextual `aria-label` naming the record is mandatory for row actions
- [badge.md](../atoms/badge.md) — Status values in data cells; badge pairs color and text to communicate status without relying on color alone
- [tag.md](../atoms/tag.md) — Category and label values in data cells; static variant only within table cells
- [tooltip.md](../atoms/tooltip.md) — Companion to sort triggers and row action icon buttons; surfaces the action label on hover and focus
- [spinner.md](../atoms/spinner.md) — Loading state within the table body; medium size, default variant, centred within a full-width row
- [empty-state.md](./empty-state.md) — Replaces the table body when no records exist; no-data and no-results variants are the most common in table contexts
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all spacing, color, radius, and motion values used in this pattern
