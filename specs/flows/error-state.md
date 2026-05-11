---
name: Error State
tier: flow
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Error State

---

## 1. Overview

Error states are the system's structured response to failures, breakdowns, and conditions that prevent the user from completing their intended action. They appear across every flow on the platform — in checkout when a payment fails, in order tracking when status cannot be fetched, in catalog browsing when a request times out, and in forms when submitted data does not pass validation.

This spec defines how error states are composed, where each type belongs, how they behave, and what they must communicate. It governs the full range of system errors — from field-level validation messages to page-level failures — and establishes a consistent recovery model so users always have a path forward.

Error states are not decorative. They are not apologies. They are precise, actionable communications that preserve the user's ability to complete what they came to do. Every error state produced by the system must be specific about what failed, honest about why (when the system knows), and direct about what the user can do next.

This spec is distinct from:
- **notifications.md** — which covers ephemeral toast and inline feedback messages, including error toasts for non-blocking failures.
- **empty-state.md** — which covers the absence of content (no results, empty cart, no order history), not system or operational failures.

---

## 2. When to Use

**Network error** — when the user's request could not reach the server or the server did not respond within the timeout window. The user's action did not complete.

**Payment error** — when a payment attempt is declined, times out, or cannot be processed. Applies during checkout and any payment update flow.

**Validation error** — when data submitted by the user does not meet the system's requirements. Applies at the field level (input atom error state) and at the form level (form pattern error summary). Validation errors are in-page and do not require navigation.

**System error** — when the server returned an unexpected failure that is not attributable to the user's input or connectivity. The system could not complete the request for an internal reason.

**Empty error** — when a request completed successfully but the result set is empty because of a system condition, not a user query. Distinct from a user-initiated empty search result, which belongs in empty-state.md. Examples: order history unavailable due to a data sync failure, recommendations engine returned no data.

---

## 3. When Not to Use

- **For content that is simply absent** — If a list, cart, or section is empty because the user has not added anything yet, use the empty-state pattern. Empty state and error state are not interchangeable.
- **For inline field validation during typing** — Real-time field-level validation feedback is owned by the input atom's error state. Do not render a separate error state component for a single field.
- **As a substitute for a loading state** — If a request is still in progress, show a Spinner. Do not show an error state preemptively.
- **To communicate warnings or advisories** — If the system is degraded but the user can still proceed (e.g., non-critical data is unavailable), use the warning variant of the notifications inline pattern, not an error state.
- **In place of a Dialog for destructive confirmations** — An error state is a response to a failure. It is not a confirmation mechanism. Use dialog.md for confirming irreversible actions.
- **When the error resolves automatically** — If the system recovers within the same request cycle and the user need not act, surface the outcome as a success notification. Do not flash an error state that immediately disappears.

---

## 4. Composition

| Atom | Role |
|---|---|
| Icon | Identifies the error type visually. Placed as the leading or centred element depending on variant. Uses `aria-hidden="true"` when the adjacent title communicates the same meaning; carries an explicit `aria-label` when used without adjacent text. Fixed icon names per error type — see Variants. |
| Button (primary) | The recovery action. Labelled with the specific action: "Retry", "Try again", "Update payment", "Go back." One Button per error state. Must always be present unless the error is truly unrecoverable — in that case, the Link to support replaces it. |
| Button (secondary) | An optional lower-priority alternative path: "Go back", "Return to home", "View booking history." Present only when two genuinely distinct recovery options exist. |
| Link | Inline navigational reference to a support channel, help article, or related page. Used in place of a secondary Button when the alternative is a destination, not an action. One Link per error state at most. |
| Spinner | Replaces the primary Button during the retrying state. Communicates that the retry is in progress. Removed and replaced by the Button when the retry resolves (to success or back to error). |

**Structure**

An error state is a composed surface, not a named atom. Every error state contains:

1. **Icon** — semantic type indicator.
2. **Title** — one sentence naming the failure. The accessible name of the error region.
3. **Description** — one to two sentences: what happened, and what the user can do. Optional when the title is fully self-explanatory.
4. **Primary action** — Button or Spinner during retry.
5. **Secondary action** — Button or Link. Optional.

Inline error states (field-level) omit the Icon and reduce to title text only, as defined by the input and form pattern specs.

**Token reference — surface and layout**

| Part | Token | Role |
|---|---|---|
| Page-level error background | `color.background.sunken` | Canvas behind the error card on full-page errors. |
| Error card background | `color.background.surface` | Card surface for page-level and blocking error variants. |
| Error card border | `color.border.danger` | Border on page-level and blocking error cards. |
| Error card radius | `radius.xl` | Corner rounding on the error card. |
| Error card padding | `spacing.layout.sm` | Internal padding on all sides. |
| Inline error background | `color.background.danger` | Background of inline and non-blocking error banners. |
| Inline error border | `color.border.danger` | Left or full border on inline error banners. |
| Inline error radius | `radius.md` | Corner rounding on inline error banners. |
| Inline error padding | `spacing.md` | Internal padding on inline error banners. |
| Icon color — error | `color.status.danger` | Semantic error icon color. |
| Title text | `color.text.danger` | Error title in inline and banner variants. |
| Title text — page-level | `color.text.primary` | Error title on full-page and card variants where the card surface already communicates severity. |
| Description text | `color.text.secondary` | Supporting detail and instruction. |
| Gap — icon to title | `spacing.sm` | Horizontal gap between leading icon and title in inline variants. |
| Gap — title to description | `spacing.xs` | Vertical gap between title and description. |
| Gap — description to actions | `spacing.md` | Vertical gap between description and action area. |
| Gap — between actions | `spacing.sm` | Vertical or horizontal gap between stacked or adjacent actions. |

---

## 5. Variants

### By error type

| Error type | Icon name | Typical placement | Recovery action |
|---|---|---|---|
| Network error | `wifi-off` | Page-level or blocking | "Try again" — retries the failed request. |
| Payment error | `credit-card-x` | Inline within checkout payment section, or blocking overlay | "Update payment" — opens the payment editing surface. |
| Validation error | `alert-circle` | Inline at field level (input atom) or form-level summary | No explicit error state component — handled by input atom and form pattern. Included here for type taxonomy only. |
| System error | `server-off` | Page-level | "Try again" with fallback Link to support if retry fails repeatedly. |
| Empty error | `inbox` | Section-level, within the content region that failed to load | "Refresh" or "Try again" — retries the data request. |

### By placement

| Variant | Form | Persistence | Use case |
|---|---|---|---|
| Inline error | Embedded within a form, section, or content block. No card surface — uses a coloured banner with a leading Icon. | Persists until the condition is resolved or the user navigates away. Not dismissible. | Payment declined banner in checkout; data load failure within a single section of a page. |
| Page-level error | Full-page error card, centred in the main content area. Replaces the page's primary content entirely. | Persists until the user retries or navigates away. | Network failure that prevents the page from loading; system error on the order tracking page. |
| Blocking error | Modal-style surface that overlays the current page and prevents interaction with content behind it. Used only when the error prevents any action on the page and the user must resolve it before continuing. | Persists until resolved or the user exits the flow. | Payment processor timeout during order submission; session expired mid-checkout. |
| Non-blocking error | Inline banner at the top of the affected section or page. Does not prevent interaction with the rest of the page. | Persists until resolved or dismissed, depending on error type. Dismissible when the user can choose to ignore the condition. | Optional recommendation data unavailable; secondary content section failed to load. |

---

## 6. Behavior

### Showing a clear message

The error state renders immediately when the system confirms a failure. It does not delay, animate in speculatively, or appear before the failure is confirmed. The title and description are always fully rendered — no truncation, no ellipsis on error copy.

### Allowing recovery

Every error state must provide at least one recovery action. A dead end — an error with no action — is a flow failure. The recovery action is always specific to the error type:

- Network errors offer "Try again" which re-executes the failed request automatically.
- Payment errors offer an action that opens the payment editing surface directly, not a generic retry.
- System errors offer "Try again" with a fallback Link to contact support if the retry fails a second time.
- Empty errors offer "Refresh" which re-requests the missing data.

### Retrying

When the user activates the primary retry action, the Button is replaced by a Spinner immediately. The error title and description remain visible during the retry so the user retains context. If the retry succeeds, the error state is removed and replaced by the resolved content using `motion.enter`. If the retry fails again, the Spinner is replaced by the Button, and the error title and description remain unchanged — the user can retry again.

After two consecutive failures, the primary action label changes from "Try again" to "Try again" with a secondary Link to support appearing below it for the first time. The support Link was not shown on the first failure to avoid prematurely implying the issue is unresolvable.

### Avoiding dead ends

The system must never leave the user with only a generic error and no path forward. Rules:

- If retry is possible: show "Try again."
- If the session has expired: show "Sign in again" and preserve the user's in-progress state where possible.
- If payment failed: surface the payment editing interface, not a generic error.
- If the entire page failed: show a page-level error with "Go back" as a secondary action so the user can return to the previous working surface.
- If the error is truly unrecoverable and no retry is possible: show a Link to support as the sole action.

### Resolving

When an error condition clears — because the retry succeeded or the user corrected their input — the error state is removed. The previously blocked content or action is rendered in its place. A success notification toast (per notifications.md) accompanies the resolution when the user initiated a retry. No toast is shown if the error resolved automatically without user action.

---

## 7. States

| State | Visual change | Token behavior |
|---|---|---|
| Default (error shown) | Icon, title, description, and recovery action fully rendered. Primary Button present. | Icon: `color.status.danger`. Title (inline): `color.text.danger`. Title (page-level): `color.text.primary`. Description: `color.text.secondary`. Card border: `color.border.danger`. |
| Retrying | Primary Button replaced by Spinner. Title and description remain. No additional overlay. | Spinner: `color.text.secondary`. All other tokens unchanged. |
| Resolved | Error state removed from DOM. Content or action it was blocking renders in its place. Optional success toast appears. | Resolved content uses its own token set. Removal uses `motion.exit`. Content appearance uses `motion.enter`. |

---

## 8. Accessibility

**ARIA roles**

| Variant | Role | Rationale |
|---|---|---|
| Inline error (non-blocking) | `role="alert"` with `aria-live="assertive"` | Injected dynamically into the page in response to a failure; must interrupt the screen reader immediately. |
| Page-level error | `role="main"` landmark content, `aria-label` on the error card | The error is the primary content of the page. No special live region needed — the user navigates to it. |
| Blocking error | `role="alertdialog"` with `aria-modal="true"` and `aria-labelledby` pointing to the error title | Overlays the page and traps focus. Treated as a modal alert. |
| Non-blocking banner | `role="status"` with `aria-live="polite"` | Lower severity. Does not interrupt; announced at the next opportunity. |

**Required ARIA attributes**

| Attribute | Applied to | Purpose |
|---|---|---|
| `aria-live="assertive"` | Inline error container | Announces the error immediately when injected. |
| `aria-atomic="true"` | Inline error container | Ensures the full error message is read as a unit, not piecemeal. |
| `aria-labelledby` | Blocking error (`role="alertdialog"`) | References the error title element. Provides the accessible name of the dialog. |
| `aria-describedby` | Blocking error | References the error description element. |
| `aria-busy="true"` | Error card during retrying state | Signals that the region is updating. Removed when the retry resolves. |
| `aria-label="Error"` | Icon when used without adjacent text | Provides accessible name when the icon is the only semantic indicator present. |
| `aria-hidden="true"` | Icon when adjacent title communicates the same meaning | Removes redundant announcement. |

**Keyboard navigation**

- All interactive elements (Buttons, Links) within the error state are reachable by Tab in document order.
- Blocking errors (`role="alertdialog"`) must trap focus within the error surface until the user resolves or exits the error. Focus is placed on the primary action Button when the blocking error appears.
- Non-blocking and inline errors do not trap focus. The user can Tab past them freely.
- Escape dismisses a blocking error only if dismissal is a valid resolution (i.e., there is an explicit "Cancel" or "Go back" action). If dismissal without resolution is not possible, Escape has no effect and this must be communicated in the `aria-label` of the container.

**Focus management**

- When an inline error is injected dynamically, focus does not move to it. The error is announced via `aria-live`. Focus remains on the element that triggered the failed action.
- When a page-level error replaces page content, focus is placed on the error title or the error card's first interactive element after the content swap.
- When a blocking error appears, focus moves immediately to the primary action Button within the error.
- When an error resolves and the error state is removed, focus moves to the first interactive element within the restored content, or to the element that triggered the original action if it is still present.

**Readable hierarchy**

The error title must be a heading element at the appropriate level for its context — `<h1>` for page-level errors, `<h2>` or `<h3>` for section-level inline errors — so screen reader users can navigate to it by heading. The description is a paragraph element. Actions follow the description in DOM order.

**Color contrast**

All text within error states must meet WCAG 2.1 AA: minimum 4.5:1 for body and title text, minimum 3:1 for large text and UI component boundaries. The error condition must not be communicated by color alone. The Icon and the title text together provide both visual and semantic identification of the error type.

---

## 9. Content Guidelines

**Title**

- State what failed. Not what the system tried to do, not an apology — what failed.
- Use plain, specific language: "Payment declined", "Couldn't load your bookings", "No internet connection."
- Do not use vague titles: "Something went wrong", "Error", "Oops." These communicate nothing.
- Do not address the user: "Your payment failed" creates blame. "Payment declined" is neutral and accurate.
- Maximum 60 characters. If it cannot be expressed in 60 characters, the failure is complex — escalate to a support contact flow.

**Description**

- Provide one or two sentences: the cause (if the system knows it) and the recommended action.
- Cause example: "The card on file was declined by your bank."
- Instruction example: "Update your payment method to continue."
- If the cause is unknown, do not fabricate one. State: "We couldn't complete this. Try again or contact support if the problem continues."
- Do not use technical language: no HTTP status codes, no internal error identifiers in user-facing copy. If a reference is required for support, provide it as a plain reference: "Reference: ERR-4821."
- Do not use passive constructions that obscure agency: "An error was encountered." Instead: "The request failed."

**Recovery actions**

- Label the primary action with the specific recovery: "Try again", "Retry payment", "Update payment method", "Refresh", "Sign in again" — not "OK", "Close", or "Continue."
- Label the secondary action with its destination: "Go back", "Return to home", "Contact support" — not "Cancel" or "Dismiss" unless that is genuinely what the action does.
- Do not include more than two actions. One is preferred. Two is the maximum.
- If no recovery is possible, replace the Button with a Link to support. Do not leave the user with an error and no action.

**Network error copy**

- Title: "No internet connection" or "Couldn't connect to the server."
- Description: "Check your connection and try again."

**Payment error copy**

- Title: "Payment declined."
- Description: name the reason if available ("Your card expired on [date]"), otherwise: "Try a different payment method or contact your bank."

**System error copy**

- Title: "Something went wrong on our end."
- Description: "This isn't your fault. Try again — if the problem continues, contact support."
- Always include a reference number if the system generates one, labeled plainly: "Reference: [ID]."

**Empty error copy**

- Title: "Couldn't load [content name]."
- Description: "This information is temporarily unavailable. Refresh to try again."
- Do not use "Nothing here" — that reads as an empty state, not an error.

---

## 10. Cross References

- notifications.md
- empty-state.md
- checkout-flow.md
- order-confirmation.md
- order-tracking.md
- button.md
- icon.md
- link.md
- spinner.md
- dialog.md
- token-reference.md
