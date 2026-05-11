---
name: Search
tier: pattern
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Search

---

## 1. Overview

Search is a page-level or global interaction pattern that enables users to locate items, content, or records by entering a text query. It combines a controlled input surface with a results area and covers the full interaction arc: query entry, suggestion display, result rendering, empty state recovery, and error handling.

Search does not define new visual primitives. It is a composition of existing atoms arranged around a query lifecycle. Every visual decision is delegated to the atoms and tokens it references.

---

## 2. When to Use

- Users need to find a specific item within a large or unscoped collection — products, records, users, articles, or menu items.
- A browsable list or catalogue is too large to scan without filtering by keyword.
- The system has sufficient indexable content to return meaningful results from a query.
- Recent searches or typeahead suggestions would meaningfully accelerate the user's path to their target.
- A global search surface is required to span multiple sections or data domains simultaneously.

---

## 3. When not to Use

- The collection contains fewer than ten items — use a visible list directly instead.
- The user's goal is to narrow by attribute, not by keyword — use Filters instead.
- The search surface would duplicate a filter control already present on the same view — consolidate into one control.
- The query space is bounded and enumerable — use a Select or Combobox instead.

---

## 4. Composition

| Atom / Pattern | Role |
|---|---|
| Input | Receives the user's query. Provides the editable text field, focus ring, placeholder, and validation state surface. |
| Icon (search) | Communicates the field's purpose visually. Placed as a leading element inside the Input. |
| Icon Button (clear) | Dismisses the current query and resets the search surface. Appears only when the Input holds a non-empty value. |
| Tag | Represents an applied filter chip within search-with-filters variant. Each active filter is a dismissible Tag. |
| Button | Triggers explicit search submission in contexts where search is not live. Labeled "Search". |
| Spinner | Communicates loading state while the system processes the query and fetches results. Replaces the search icon during loading. |
| Empty State | Fills the results area when the query returns no matches or when an error prevents results from loading. |
| Catalog List | Renders the result set when the query returns matches. The Search pattern controls what Catalog List receives; Catalog List controls how items are displayed. |

---

## 5. Tokens Used

These tokens apply to the Search pattern's structural and compositional layer — surfaces, containers, and spacing not already handled by the atoms listed above.

| Part | Token | Role |
|---|---|---|
| Results container background | `color.background.surface` | Surface behind the result list or suggestions dropdown. |
| Results container border | `color.border.subtle` | Low-emphasis outline separating the results container from the page. |
| Suggestions dropdown background | `color.background.surface` | Background of the typeahead suggestions panel. |
| Suggestions dropdown border | `color.border.default` | Border around the suggestions panel. |
| Suggestion item background — hover | `color.background.subtle` | Hover highlight on a suggestion row. |
| Suggestion item background — selected | `color.background.selected` | Keyboard-focused or active suggestion row. |
| Suggestion item text | `color.text.primary` | Label text for each suggestion item. |
| Suggestion item secondary text | `color.text.secondary` | Supporting metadata within a suggestion row (e.g., category, count). |
| Section label text | `color.text.subtle` | Label for grouped suggestion sections (e.g., "Recent searches", "Suggestions"). |
| Divider | `color.border.subtle` | Horizontal rule separating suggestion groups or the search bar from the results area. |
| Results container padding | `spacing.md` | Internal padding inside the results container. |
| Suggestions panel padding | `spacing.sm` | Internal padding within each suggestion row. |
| Gap between search bar and results | `spacing.lg` | Vertical space separating the search input row from the results area. |
| Gap between suggestion rows | `spacing.xs` | Vertical gap between individual suggestion items. |
| Suggestions panel radius | `radius.lg` | Corner rounding on the suggestions dropdown panel. |
| Results container radius | `radius.xl` | Corner rounding on the results container surface. |
| Suggestions panel enter transition | `motion.enter` | Panel appearing after query input begins. |
| Suggestions panel exit transition | `motion.exit` | Panel dismissing after focus leaves or query is cleared. |
| Loading spinner transition | `motion.fast` | Icon-to-spinner crossfade during loading state. |

---

## 6. Variants

| Variant | Description | Default |
|---|---|---|
| Basic search | A single Input with a leading search icon and a trailing clear Icon Button. No suggestions. Results replace page content or populate a results container below. | Yes |
| Search with suggestions | Extends basic search with a typeahead dropdown that displays matching suggestions and optionally a "Recent searches" section. The dropdown appears on focus or after the first character is typed. | No |
| Search with filters | Extends search with suggestions by adding a row of active-filter Tags below the Input. Each Tag is dismissible. Removing a Tag narrows or expands the result scope. A "Clear all" Button appears when one or more filters are active. | No |
| Global search | Full-screen or wide-panel search surface spanning multiple content domains. Includes grouped suggestions (by domain or category), keyboard navigation across groups, and a dedicated results layout separate from the current page. | No |

---

## 7. Behavior

### Typing a query

The user focuses the Input. A cursor appears. Characters entered by the user are reflected immediately in the Input value. In the search-with-suggestions variant, the suggestions dropdown opens after the first character is entered. In the basic variant, no dropdown appears; results update only after submission.

### Submitting search

The user presses Enter or activates the "Search" Button. The system transitions to the loading state. The search icon is replaced by a Spinner. The suggestions dropdown closes. On result receipt, the Spinner is replaced by the search icon and the results area populates.

### Clearing the query

The clear Icon Button appears as soon as the Input holds a non-empty value. Activating it empties the Input, dismisses the suggestions dropdown, and returns the results area to its default (pre-search) state. Focus returns to the Input.

### Showing suggestions

After the first character is entered, the suggestions dropdown opens with `motion.enter`. Each suggestion row is keyboard-navigable. Selecting a suggestion populates the Input with the suggestion text and submits the query immediately. The dropdown closes with `motion.exit` when focus leaves the Input or the Escape key is pressed.

### Displaying results

When results are received, the loading state exits and the results area renders the Catalog List populated with matching items. The result count or a summary label may appear above the list using `color.text.secondary`.

### Handling no results

When the query returns zero matches, the results area renders the Empty State pattern. The Empty State headline names the query that failed. The body text suggests a recovery action — broaden the query, check spelling, or clear active filters. A "Clear search" action resets the Input.

### Handling errors

When the system cannot complete the search request, the results area renders the Empty State pattern in its error configuration. The body text communicates that the search failed and invites the user to try again. A "Retry" Button is included.

---

## 8. States

| State | Visual change | Token change |
|---|---|---|
| Default | Input is unfocused. Search icon visible. Clear button hidden. Results area absent or showing prior results. | No token change from base. |
| Focused | Input focus ring appears. Cursor active. Suggestions dropdown may open. | Input border transitions to `color.border.focus`. |
| Typing | Input shows entered characters. Clear Icon Button appears. Suggestions update with each keystroke. | No additional token change. |
| Loading | Search icon replaced by Spinner. Results area suppressed or shows skeleton state if appropriate. | Spinner uses `color.text.secondary`. |
| Results | Results area shows Catalog List. Result count label visible above list. | Results container background: `color.background.surface`. |
| No results | Results area shows Empty State. | Empty State uses its own token assignments. |
| Error | Results area shows Empty State in error configuration. | Empty State uses its own token assignments. |

---

## 9. Accessibility

**ARIA role**

The search Input must carry `role="searchbox"` or be wrapped in a `<form role="search">` landmark so screen readers announce the region as a search interface.

**Required ARIA attributes**

| Attribute | Applied to | Purpose |
|---|---|---|
| `aria-label="Search"` | Input | Identifies the field when no visible label is present. |
| `aria-autocomplete="list"` | Input | Indicates that a list of suggestions may appear. |
| `aria-expanded` | Input | Set to `true` when the suggestions dropdown is open; `false` when closed. |
| `aria-controls` | Input | References the `id` of the suggestions dropdown panel. |
| `aria-activedescendant` | Input | References the `id` of the currently focused suggestion row during keyboard navigation. |
| `role="listbox"` | Suggestions panel | Identifies the dropdown as a selectable list. |
| `role="option"` | Each suggestion row | Identifies each row as a selectable item within the listbox. |
| `aria-selected` | Each suggestion row | Set to `true` on the currently highlighted suggestion. |
| `aria-live="polite"` | Result count or status region | Announces result count changes to screen readers without interrupting the user. |
| `aria-busy="true"` | Results area | Set during loading state. Removed when results are rendered. |

**Keyboard navigation**

| Key | Behavior |
|---|---|
| Tab | Moves focus into the Input from the preceding focusable element. |
| Character keys | Enter query text. Update suggestions. |
| ArrowDown | Moves focus from the Input into the suggestions dropdown. Moves to the next suggestion row. |
| ArrowUp | Moves focus to the previous suggestion row. Returns focus to the Input from the first row. |
| Enter | Submits the current query, or selects the focused suggestion and submits. |
| Escape | Closes the suggestions dropdown without submitting. Returns focus to the Input. |
| Tab (within dropdown) | Closes the suggestions dropdown and moves focus to the next interactive element outside search. |

**Focus management**

- When the clear Icon Button is activated, focus returns to the Input immediately.
- When a suggestion is selected, focus moves to the results area or remains in the Input depending on whether results load inline.
- When the suggestions dropdown closes via Escape, focus stays on the Input.
- The suggestions dropdown must not trap focus.

**Screen reader announcements**

- When the suggestions dropdown opens: announce the number of available suggestions (e.g., "5 suggestions available").
- When results load: announce the result count (e.g., "12 results for 'pasta'") via the `aria-live` region.
- When no results: announce "No results found for [query]" via the `aria-live` region.
- When an error occurs: announce "Search failed. Please try again." via the `aria-live` region.

**Color contrast**

All text within the search pattern must meet WCAG 2.1 AA: minimum 4.5:1 for body text and suggestion labels, minimum 3:1 for large text and UI component boundaries. The focus ring using `color.border.focus` must be visible against all backgrounds used in the search surface.

---

## 10. Content Guidelines

**Placeholder text**

- Use a specific, instructive placeholder that describes what the user can search for. Example: "Search flights, hotels, or destinations"
- Do not use generic placeholders such as "Search…" alone when the scope is scoped to a specific domain.
- Do not use the placeholder to communicate constraints (e.g., "Minimum 3 characters"). Communicate constraints via helper text below the Input.

**Suggestions label**

- Use "Recent searches" for queries the user has previously submitted.
- Use "Suggestions" for system-generated completions.
- Do not use vague labels such as "Results" or "Options" for suggestion groups.

**No-results message**

- State exactly what the system searched and why it returned nothing. Example: "No results for 'Maldives hotels'. Try a different keyword or clear your filters."
- Do not use generic copy such as "Nothing found" or "No items".
- Always include a recovery action: "Clear search", "Remove filters", or "Browse all items".

**Error message**

- Be honest and specific: "Search is unavailable right now. Try again in a moment."
- Do not use technical language or error codes in user-facing copy.
- Always include a "Try again" action.

**Result count label**

- Use plain language: "12 results" or "Showing 12 of 48 results".
- Do not use "hits", "matches found", or other search-engine jargon.

**Clear button label**

- The clear Icon Button must carry `aria-label="Clear search"` for screen readers. No visible label is required.

---

## 11. Code Example

```jsx
<form role="search" aria-label="Travel search">
  <Input
    type="search"
    role="searchbox"
    aria-label="Search flights, hotels, or destinations"
    aria-autocomplete="list"
    aria-expanded={suggestionsOpen}
    aria-controls="search-suggestions"
    aria-activedescendant={activeSuggestionId}
    placeholder="Search flights, hotels, or destinations"
    value={query}
    onChange={handleQueryChange}
    leadingIcon={isLoading ? <Spinner /> : <Icon name="search" />}
    trailingAction={
      query.length > 0 ? (
        <IconButton
          icon="close"
          aria-label="Clear search"
          onClick={handleClear}
        />
      ) : null
    }
  />

  {suggestionsOpen && (
    <ul
      id="search-suggestions"
      role="listbox"
      aria-label="Search suggestions"
    >
      {recentSearches.length > 0 && (
        <li role="presentation">
          <span>Recent searches</span>
          {recentSearches.map((item) => (
            <li
              key={item.id}
              id={item.id}
              role="option"
              aria-selected={item.id === activeSuggestionId}
              onClick={() => handleSuggestionSelect(item)}
            >
              <Icon name="clock" />
              {item.label}
            </li>
          ))}
        </li>
      )}
      {suggestions.map((item) => (
        <li
          key={item.id}
          id={item.id}
          role="option"
          aria-selected={item.id === activeSuggestionId}
          onClick={() => handleSuggestionSelect(item)}
        >
          <Icon name="search" />
          {item.label}
        </li>
      ))}
    </ul>
  )}

  <div
    aria-live="polite"
    aria-busy={isLoading}
  >
    {hasResults && <CatalogList items={results} />}
    {noResults && (
      <EmptyState
        headline={`No results for "${query}"`}
        body="Try a different keyword or clear your filters."
        action={<Button onClick={handleClear}>Clear search</Button>}
      />
    )}
    {hasError && (
      <EmptyState
        headline="Search is unavailable right now"
        body="Try again in a moment."
        action={<Button onClick={handleRetry}>Try again</Button>}
      />
    )}
  </div>
</form>
```

---

## 12. Cross References

- input.md
- icon-button.md
- filters.md
- catalog-list.md
- empty-state.md
- token-reference.md
