---
name: Empty State
tier: pattern
status: draft
last-updated: 2026-04-29
maintainer: Team 4
source: Almosafer Design System
---

# Empty State

---

## 1. Overview

An empty state is a structured composition that appears when a page, section, search result, table, or list has no content to display. It replaces the absent content with a clear explanation of why nothing is showing and a direct path to the most useful next action.

On Almosafer, empty states appear across the search and booking flows: no flight results for a searched route, no hotel availability for selected dates, no saved trips yet, no booking history for a new account, or a search results page that failed to load. In all cases the user's momentum must be preserved — a dead end is a conversion failure.

An empty state is not a fallback decoration. It is a moment of guidance. Every empty state must justify the interruption to the user's intent by being specific, useful, and actionable.

---

## 2. When to Use

- A product list, catalogue section, or search result returns zero items — because the query matched nothing or active filters are too restrictive.
- A user's personal list is empty — cart, wishlist, saved addresses, order history — because they have not added anything yet.
- A feature the user has navigated to requires setup before content can appear — no saved payment methods, no notifications configured.
- A data request failed and the system cannot display the content it was asked to show.
- A table, grid, or list within an operator dashboard contains no records for the current filter or date range.

---

## 3. When Not to Use

- **While content is loading** — Use the spinner pattern or a skeleton placeholder. An empty state implies the request has completed and genuinely returned nothing. It must not flash during a load.
- **For inline validation errors** — Use the error state within the input or form pattern. Empty state is a page- or section-level concept, not a field-level one.
- **As a placeholder in a design** — Every empty state delivered to production must contain final, specific copy. Do not ship a generic "Nothing here yet" without context.
- **When content exists but is hidden** — If filters, permissions, or a subscription tier are hiding content that technically exists, the empty state must communicate that. A generic "no results" message when content is gated misleads the user and damages trust.
- **For full system errors that affect the entire page** — Use an error page or a page-level alert. Empty state is scoped to a specific content region, not the application as a whole.

---

## 4. Composition

| Element | Atom / role |
|---|---|
| Icon | `icon` atom — decorative variant, large size (`spacing.lg`). Provides a visual metaphor for the empty context. Always `aria-hidden="true"`. Color varies by variant. See the Variants section for per-variant color tokens. |
| Title | Heading element — the primary statement of the empty state. Carries `color.text.primary` and `text.heading.sm` for section-level contexts, `text.heading.md` for full-page contexts. The accessible name of the empty state region. |
| Description | Paragraph element — one to three sentences of supporting context. Explains why content is absent and, where relevant, what will change that. Carries `color.text.secondary` and `text.body.md`. |
| Primary action | `button` atom — primary variant. The single most useful next step the user can take. Optional — omitted only when no meaningful action is available, which should be rare. |
| Secondary action | `link` atom — default or subtle variant. A lower-emphasis alternative path: "Clear filters", "Browse all products", "Contact support". Optional. Supplements but does not replace the primary action. |

The icon is optional at the composition level. Omit it in compact inline contexts where vertical space is constrained and the title alone provides sufficient clarity.

---

## 5. Tokens Used

These tokens govern empty state layout decisions. Atom-internal tokens are defined in their respective specs and are not repeated here.

| Decision | Token | Role |
|---|---|---|
| Icon color — neutral (no data, no results) | `color.text.subtle` | Low-emphasis decorative icon for states that are neutral, not alarming |
| Icon color — brand (first-time setup) | `color.text.brand` | Positive, inviting icon for onboarding and feature introduction contexts |
| Icon color — error | `color.status.danger` | Signals a system problem clearly without using alarming red on text |
| Title color | `color.text.primary` | Maximum contrast for the primary heading |
| Description color | `color.text.secondary` | Reduced contrast for supporting copy — subordinate to the title |
| Title font size — section context | `text.heading.sm` | For empty states inside a card, panel, table, or page section |
| Title font size — full-page context | `text.heading.md` | For empty states occupying the full page canvas |
| Description font size | `text.body.md` | Body size for supporting message in all contexts |
| Stack gap — icon to title | `spacing.md` | Vertical gap between the icon and the title |
| Stack gap — title to description | `spacing.sm` | Vertical gap between the title and the description paragraph |
| Stack gap — description to actions | `spacing.lg` | Vertical gap between the description and the action group |
| Gap — between actions | `spacing.sm` | Horizontal or vertical gap between primary button and secondary link |
| Container padding — standalone | `spacing.layout.sm` | Padding for full-page and full-section empty states |
| Container padding — inline | `spacing.lg` | Padding for empty states inside cards, panels, or tables |

---

## 6. Variants

### No data

Used when a user-owned list or data set exists but contains no records. The user is familiar with the feature and understands what belongs here — they simply have not added anything yet. The tone is neutral and encouraging.

| Element | Specification |
|---|---|
| Icon | Decorative, large size, `color.text.subtle`. Metaphor reflects what is missing: a bookmark for no saved trips, a calendar for no upcoming bookings, a box for no booking history. |
| Title | Names what is missing. "No saved trips", "No upcoming bookings", "No booking history yet". |
| Description | One sentence explaining what will appear here and how to get started. |
| Primary action | A button that creates or adds the first item. "Search flights", "Browse hotels", "Add traveler details". |
| Secondary action | Optional. A link to a related feature or help resource. |

---

### No search results

Used when a search query or active filter combination returns zero matches. The user had an intent that could not be satisfied. The priority is to help them recover — adjust the query, remove filters, or try a different approach.

| Element | Specification |
|---|---|
| Icon | Decorative, large size, `color.text.subtle`. Magnifying glass or search-related metaphor. |
| Title | "No results for '[query]'" when the search term is known. "No results found" when the query cannot be surfaced. |
| Description | Suggests specific recovery actions: check spelling, try fewer terms, remove a filter. Do not repeat the title. |
| Primary action | Optional. "Clear search" or "Remove all filters" — a button that immediately resets the search state. |
| Secondary action | A link to browse all products or view a top-level category. |

**Rule:** When filters are the cause of zero results, the description must name the filter or category responsible. "No flights found for direct routes under SAR 500" is more useful than "No results found."

---

### First-time setup

Used when a user navigates to a feature they have not yet configured or used. This is an onboarding moment — the user is meeting the feature for the first time. The tone is positive and action-oriented.

| Element | Specification |
|---|---|
| Icon | Decorative, large size, `color.text.brand`. A brand-colored icon signals invitation and opportunity rather than absence. |
| Title | Names the feature benefit, not the absence. "Save trips for later", "Track your bookings", "Set up fast booking". |
| Description | Two to three sentences describing what the user will get when they complete the setup step. |
| Primary action | A high-emphasis primary button that starts the setup: "Add traveler details", "Save a trip", "Enable notifications". |
| Secondary action | Optional. A link to learn more or skip for now where appropriate. |

**Rule on Almosafer:** First-time setup states in the booking flow (no saved traveler details, no saved payment methods) must lead the user toward completion, not away from it. The primary action must be "Add now" or equivalent — never "Skip" as the primary.

---

### Error empty state

Used when content failed to load due to a system error, a network failure, or a server-side problem. The user's intent was valid — the system could not fulfil it. The tone is matter-of-fact, non-alarming, and recovery-focused. The error must not blame the user.

| Element | Specification |
|---|---|
| Icon | Decorative, large size, `color.status.danger`. Communicates a system problem visually without alarming headline text. |
| Title | States the problem plainly. "Could not load flights", "Something went wrong", "Unable to connect". |
| Description | One to two sentences: what happened (briefly) and what the user can do. "This is on our end. Refresh the page or try again in a moment." |
| Primary action | "Try again" or "Refresh page" — a button that retries the failed operation or reloads the content region. |
| Secondary action | Optional link to contact support or status page for persistent errors. |

**Rule on Almosafer:** Error empty states during checkout must never appear without a clear retry path. A payment or booking confirmation that fails to load must always offer "Try again" and a fallback such as "Contact support" — never a dead end at the payment step.

---

## 7. Behavior

**Guidance over absence**
Every empty state must explain the situation and provide a forward path. An empty state that displays a title with no action is a dead end. The only acceptable case for an action-free empty state is when every possible action is genuinely unavailable — and even then, the description must explain how the situation changes.

**Primary action clarity**
The primary action button must be the single most useful step the user can take from this state. Do not offer two primary buttons. Do not stack multiple buttons at equal visual weight. If more than one path exists, the secondary is always a link, never a second primary button.

**Filter and search recovery**
No search results and over-filtered states must offer an immediate escape: a button that clears the search or removes all active filters. This escape must be the primary or only action. Do not send the user to a separate settings page to clear filters.

**Error recovery**
Error empty states must offer a retry action that is directly executable — not a link to a help page. The retry must re-trigger the failed operation without requiring the user to navigate away and return.

**Auto-refresh is not acceptable**
The system must not silently retry a failed request and replace the empty state without user intent. If a retry is needed, the user must initiate it. Silent state changes break the user's sense of control.

**Compact contexts**
Within a card, panel, or table cell, the empty state may omit the icon. The title and description alone are sufficient in constrained vertical space. The actions remain. Do not reduce the text size below `text.body.sm` in any context.

**RTL layout**
All directional properties use logical CSS. The icon, title, description, and actions are stacked vertically — direction-independent. The action button row uses `justify-content: center` for centered layouts and `justify-content: flex-start` (logical: `start`) for inline aligned layouts. Physical directional properties are banned.

---

## 8. Accessibility

| Requirement | Rule |
|---|---|
| Icon is decorative | The icon always carries `aria-hidden="true"`. It is a visual metaphor only. The title and description carry all accessible meaning. |
| Readable hierarchy | The title must be a heading element at the appropriate level for the page structure — not a `<p>` or `<div>`. Screen readers use heading structure to navigate. An empty state without a heading is not reachable by heading navigation. |
| Region landmark | Wrap the empty state in a `<section>` with `aria-label` matching the title when the empty state replaces a named content region (e.g., `aria-label="Search results — no results found"`). This ensures screen reader users can identify the region correctly. |
| Action keyboard access | All buttons and links follow the accessibility rules defined in their respective atom specs. Tab to focus, Enter to activate links, Enter or Space to activate buttons. |
| Error empty state announcement | When an error empty state replaces content that was previously visible (e.g., a product list that fails to reload), announce the change using a live region or by moving focus to the empty state container so screen reader users are informed of the failure. |
| No reliance on icon alone | The error variant uses `color.status.danger` on the icon, but the title and description must communicate the problem in text. An icon color change alone does not convey meaning to users who cannot perceive color. |
| Reduced motion | No animations are defined for the empty state container itself. Entry transitions on any parent container (e.g., a search results region fading in) must respect `prefers-reduced-motion`. |
| WCAG criteria | Applies SC 1.1.1 (Non-text Content), SC 1.3.1 (Info and Relationships), SC 2.1.1 (Keyboard), SC 2.4.6 (Headings and Labels), SC 3.3.3 (Error Suggestion). |

---

## 9. Content Guidelines

**Title**
- Four to eight words. One clear statement of the situation.
- Sentence case. No ending punctuation.
- Name what is missing or what happened — do not name the component or page location.
- "No products found" is correct. "Empty results section" is not.
- On Almosafer: titles in booking-adjacent surfaces must name the specific resource. "No saved trips" rather than "Nothing here".

**Description**
- One to three sentences. Explain the situation and suggest the most useful recovery step.
- Do not repeat the title.
- Do not blame the user. "No results matched your search" is correct. "You searched for the wrong thing" is not.
- For error states: one sentence on the problem, one sentence on what to do. Do not over-explain the technical cause. "We could not load your bookings. Try again or contact support if the problem continues."
- For first-time states: describe the benefit, not the feature. "Save trips you love and come back to them any time" rather than "Use the saved trips feature".

**Primary action label**
- Verb-first, specific to the context. "Browse all destinations", "Clear filters", "Add traveler details", "Try again".
- Do not use "Go", "Click here", or "Continue" without a named destination or outcome.
- Match the label to the action it performs. "Clear search" must clear the search. "Try again" must retry the operation.

**Secondary action label**
- Lower-emphasis, lower-commitment. "Browse all destinations", "Contact support", "Learn more about saved trips".
- Never a duplicate of the primary action label.

**What to avoid**
- Filler copy: "Nothing to see here", "Such empty", "Oops".
- Unexplained absences: "No data" with no description.
- Mixed tones: do not be playful in error states or clinical in first-time states. Match the emotional register to the moment.

---

## 10. Code Example

```html
<!-- No search results — Almosafer travel search -->
<section class="empty-state empty-state--standalone"
         aria-label="Search results — no results found">
  <svg class="icon empty-state__icon" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#search" />
  </svg>
  <h2 class="empty-state__title">No results for "Dubai hotels"</h2>
  <p class="empty-state__description">
    Check the spelling or try a more general term.
    Removing active filters may also help.
  </p>
  <div class="empty-state__actions">
    <button class="button button--primary" type="button">
      Clear search
    </button>
    <a class="link" href="/destinations">Browse all destinations</a>
  </div>
</section>


<!-- First-time setup — empty saved trips -->
<section class="empty-state empty-state--standalone"
         aria-label="Saved trips">
  <svg class="icon empty-state__icon empty-state__icon--brand"
       aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#bookmark" />
  </svg>
  <h2 class="empty-state__title">Save trips for later</h2>
  <p class="empty-state__description">
    Tap the bookmark on any flight or hotel to save it here.
    Your saved trips are waiting whenever you are ready.
  </p>
  <div class="empty-state__actions">
    <button class="button button--primary" type="button">
      Search flights
    </button>
  </div>
</section>


<!-- No data — no upcoming bookings -->
<section class="empty-state empty-state--standalone"
         aria-label="Upcoming bookings">
  <svg class="icon empty-state__icon" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#calendar" />
  </svg>
  <h2 class="empty-state__title">No upcoming bookings</h2>
  <p class="empty-state__description">
    Search for a flight or hotel to get started.
  </p>
  <div class="empty-state__actions">
    <button class="button button--primary" type="button">
      Search now
    </button>
  </div>
</section>


<!-- Error empty state — failed to load bookings -->
<section class="empty-state empty-state--standalone"
         aria-label="Booking history"
         aria-live="polite">
  <svg class="icon empty-state__icon empty-state__icon--error"
       aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#alert-circle" />
  </svg>
  <h2 class="empty-state__title">Could not load your bookings</h2>
  <p class="empty-state__description">
    This is on our end. Refresh the page or try again in a moment.
  </p>
  <div class="empty-state__actions">
    <button class="button button--primary" type="button"
            onclick="location.reload()">
      Try again
    </button>
    <a class="link" href="/support">Contact support</a>
  </div>
</section>


<!-- Inline empty state — empty table, compact context -->
<section class="empty-state empty-state--inline"
         aria-label="Saved traveler details — none added">
  <h3 class="empty-state__title">No saved traveler details</h3>
  <p class="empty-state__description">
    Add traveler details to speed up booking.
  </p>
  <div class="empty-state__actions">
    <button class="button button--primary" type="button">
      Add traveler details
    </button>
  </div>
</section>
```

```css
/* Base empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Standalone — full page or section */
.empty-state--standalone {
  padding: var(--spacing-layout-sm);
  gap: 0;
}

/* Inline — inside a card, panel, or table */
.empty-state--inline {
  padding: var(--spacing-lg);
  align-items: flex-start;
  text-align: start;
}

/* Icon */
.empty-state__icon {
  width: var(--spacing-lg);
  height: var(--spacing-lg);
  color: var(--color-text-subtle);
  margin-block-end: var(--spacing-md);
  flex-shrink: 0;
}

.empty-state__icon--brand {
  color: var(--color-text-brand);
}

.empty-state__icon--error {
  color: var(--color-status-danger);
}

/* Title */
.empty-state__title {
  color: var(--color-text-primary);
  font-size: var(--text-heading-sm-size);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  margin: 0;
  margin-block-end: var(--spacing-sm);
}

/* Full-page context — larger title */
.empty-state--standalone .empty-state__title {
  font-size: var(--text-heading-md-size);
}

/* Description */
.empty-state__description {
  color: var(--color-text-secondary);
  font-size: var(--text-body-size);
  line-height: var(--line-height-normal);
  margin: 0;
  margin-block-end: var(--spacing-lg);
}

/* Actions */
.empty-state__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.empty-state--inline .empty-state__actions {
  justify-content: flex-start;
}
```

---

## 11. Cross References

- [icon.md](../atoms/icon.md) — The decorative icon variant at large size is the defined icon usage for empty states; icon sizing tokens and `aria-hidden` rules apply directly
- [button.md](../atoms/button.md) — Primary actions use the primary button variant; the danger variant is not used in empty states — it is reserved for destructive actions in dialogs
- [link.md](../atoms/link.md) — Secondary actions use the default or subtle link variant; the link atom's accessible name and keyboard rules apply
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all spacing, color, and typography values used in this pattern
