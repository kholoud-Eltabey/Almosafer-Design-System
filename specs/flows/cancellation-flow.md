---
name: Cancellation Flow
tier: flow
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Cancellation Flow

---

## 1. Overview

The cancellation flow governs how users cancel a booking or a pending action on the platform. It is a deliberate, guarded sequence: a trigger exposes a confirmation dialog, the user confirms their intent, and the system acts on that confirmation and communicates the outcome. The flow is designed around three non-negotiable constraints — the user must understand what they are cancelling, understand the consequence, and have confirmed the action deliberately before it is committed.

Cancellation is irreversible once confirmed. The flow's entire structure exists to prevent accidental cancellations and to ensure that any cancellation that does proceed is fully understood and intentional.

This flow composes the Dialog pattern as its primary surface. It does not introduce a new overlay mechanism or a new confirmation model. Where a reason is required, it embeds a Radio group and optionally a free-text Input within the Dialog body. The flow connects directly to the booking tracking and notification systems to communicate the outcome after confirmation.

---

## 2. When to Use

- The user initiates cancellation of a placed booking from the booking tracking view or booking history.
- The user cancels a pending action within a flow — for example, cancelling a payment retry in progress, or abandoning a checkout session that has already reserved a flight or hotel.
- The platform or business rules require confirmation before voiding a transaction or releasing a reservation.
- The cancellation involves a financial consequence — a refund, a cancellation fee, or the loss of a discount — that the user must acknowledge before proceeding.

---

## 3. When Not to Use

- **For non-destructive exits** — If the user is abandoning a partially filled form with no committed state (no stock reserved, no payment initiated), use a standard navigation exit without a confirmation dialog. Reserve the cancellation flow for actions that have real-world consequences.
- **For dismissing a dialog or closing a panel** — Standard dialog dismissal (Escape key, close Icon Button) does not require a confirmation flow. Only use the cancellation flow when a committed action is being reversed.
- **For booking states that cannot be cancelled** — Do not render a cancel trigger for bookings that are within the non-cancellable window, have already departed, or have been completed. Show a restricted state instead (see Variants). The restricted state communicates why cancellation is unavailable and directs the user to the refund or support flow.
- **For subscription or recurring billing cancellation** — Subscription cancellation has distinct legal and regulatory requirements. It must not share this flow. Use a dedicated subscription cancellation surface.
- **As a general-purpose "are you sure?" pattern** — The cancellation flow is scoped to order and action cancellation. For other destructive confirmations (deleting an account, removing a payment method), use the Dialog pattern directly with appropriate danger-variant copy.

---

## 4. Composition

| Atom / Pattern | Role |
|---|---|
| Button (danger variant) | The cancellation trigger on the source page (booking tracking, booking detail). Labelled "Cancel booking." Activating it opens the confirmation Dialog. Present only when the booking or action is in a cancellable state. |
| Dialog | The confirmation surface. Contains all cancellation content: title, consequence statement, optional reason selection, and action Buttons. Blocks interaction with the page behind it until the user confirms or dismisses. Provides the scrim, container, and structural layout. |
| Radio | Present in the cancellation-with-reason variant. Renders a group of predefined cancellation reason options within the Dialog body. One reason must be selected before the confirm action is available. The group is managed by a visible `<fieldset>` and `<legend>`. |
| Input | Optional free-text field within the cancellation-with-reason variant. Labelled "Other reason" or "Tell us more." Conditionally visible — appears only when the user selects an "Other" Radio option. Not required; submission is permitted if the field is empty when optional. |
| Checkbox | Present when the cancellation carries a financial consequence the user must explicitly acknowledge — for example, a non-refundable cancellation fee or a partial refund condition. The confirm action Button is disabled until the Checkbox is checked. Labelled with the specific consequence: "I understand this booking is non-refundable." |
| Button (primary, danger variant) | Confirm cancellation action within the Dialog. Labelled "Cancel booking" — matches the trigger label to confirm continuity of intent. Triggers the cancellation request and transitions to the confirming state. |
| Button (secondary) | Dismiss the Dialog without cancelling. Labelled "Keep booking." Closes the Dialog and returns focus to the trigger element. |
| Icon | Leading icon in the Dialog header. Uses a warning or danger icon (`alert-triangle` or `x-circle`) to signal the destructive nature of the action before the user reads the title. Carries `aria-hidden="true"` — the title provides the accessible name. |
| Spinner | Replaces the confirm Button during the confirming state while the cancellation request is in progress. The Dialog remains open and non-interactive. The Spinner carries `aria-label="Cancelling your booking"`. |

**Dialog structure for this flow**

The Dialog used in this flow follows the Dialog pattern's structure exactly. The body region contains, in order:

1. A consequence statement — one to two sentences stating what will happen if the user confirms (see Content Guidelines).
2. Radio group — present in the cancellation-with-reason variant only.
3. Input — conditionally present below the Radio group when "Other" is selected.
4. Checkbox — present when explicit acknowledgment of a financial consequence is required.

The action area contains the confirm Button (danger variant, primary) and the dismiss Button (secondary), in that order. The confirm Button is positioned first in the action row — this is the intended primary action and must be visually prominent. The dismiss Button carries lower visual weight.

**Token reference — surface and layout**

| Part | Token | Role |
|---|---|---|
| Trigger Button background | Danger variant — governed by button.md | Signals the destructive nature of the trigger before the Dialog opens. |
| Dialog container | All tokens governed by dialog.md | The Dialog pattern owns its own surface tokens. |
| Consequence statement text | `color.text.secondary` | Supporting body copy within the Dialog. |
| Consequence highlight text | `color.text.danger` | Specific financial or irreversible consequence called out inline. |
| Radio group gap | `spacing.sm` | Vertical gap between Radio options within the cancellation reason group. |
| Radio group to Input gap | `spacing.md` | Vertical gap between the Radio group and the conditional free-text Input. |
| Checkbox to actions gap | `spacing.md` | Vertical gap between the acknowledgment Checkbox and the action Button row. |
| Restricted state background | `color.background.subtle` | Surface behind the restricted cancellation message block. |
| Restricted state border | `color.border.default` | Border on the restricted cancellation message block. |
| Restricted state radius | `radius.lg` | Corner rounding on the restricted message block. |
| Restricted state padding | `spacing.md` | Internal padding within the restricted message block. |
| Restricted state icon color | `color.text.subtle` | Icon color within the restricted cancellation state. |
| Restricted state text | `color.text.secondary` | Explanatory copy within the restricted cancellation state. |

---

## 5. Variants

| Variant | Description | Reason selection | Acknowledgment required |
|---|---|---|---|
| Immediate cancellation | The booking is in a cancellable state and no reason input is required. The Dialog presents only the consequence statement and the two action Buttons. Confirmation triggers the cancellation immediately. | No | No — unless a financial consequence applies. |
| Cancellation with reason | The booking is cancellable and the platform requires a reason before processing. The Dialog body includes a Radio group of predefined reasons. An optional free-text Input appears if the user selects "Other". The confirm Button is disabled until a Radio option is selected. | Yes — Radio required, Input optional. | No — unless a financial consequence applies. |
| Restricted cancellation | The booking has passed the cancellable window (departed flight, completed hotel stay, within non-refundable period). The cancel trigger is replaced by a restricted state block on the booking tracking page. The block explains why cancellation is no longer available and provides a Link to the refund flow or support. No Dialog is opened. | Not applicable. | Not applicable. |

---

## 6. Behavior

### Confirm before cancel

The cancel trigger (Button, danger variant) on the source page opens the Dialog immediately on activation. No action is taken before the Dialog opens — the trigger does not initiate a cancellation request. The cancellation request is sent only when the user activates the confirm Button inside the Dialog.

### Allow reason input if required

In the cancellation-with-reason variant, the confirm Button is disabled until the user selects a Radio option. If the user selects "Other," a free-text Input appears immediately below the Radio group using `motion.fast`. The Input is not required — the user may leave it empty and confirm with "Other" selected. The confirm Button enables as soon as any Radio option is selected, regardless of Input state.

### Prevent accidental actions

The Dialog does not close on scrim click. Accidental clicks outside the Dialog during a high-stakes decision must not dismiss it. The only dismissal paths are: the "Keep booking" Button, the Escape key, and the close Icon Button if present. On dismissal, no cancellation action is taken and the booking state is unchanged.

The confirm Button label ("Cancel booking") matches the trigger label exactly. This repetition is intentional — it confirms continuity between what the user activated and what they are about to confirm.

When a financial acknowledgment Checkbox is required, the confirm Button remains disabled until the Checkbox is checked. The Checkbox cannot be pre-checked.

### Update status after cancellation

When the user confirms, the Dialog enters the confirming state: the confirm and dismiss Buttons are replaced by a Spinner, and the Dialog surface becomes non-interactive. The Dialog remains visible and open during this state.

On successful cancellation:
1. The Dialog closes with `motion.exit`.
2. Focus returns to the source page.
3. The booking status on the booking tracking page updates to reflect the cancelled state.
4. A success notification toast appears ("Booking cancelled") per notifications.md.

On failed cancellation:
1. The Spinner is replaced by the confirm and dismiss Buttons.
2. An inline error message appears within the Dialog body above the action area, per error-state.md inline variant.
3. The Dialog remains open. The user can retry or dismiss.

### Restricted state

When a booking is in a non-cancellable state, the cancel trigger is not rendered. In its place, a restricted state block explains the reason (e.g., "This booking has passed the cancellation window") and provides a Link to the refund flow or support channel. This block is static — it does not open a Dialog.

---

## 7. States

| State | Visual change | Token behavior |
|---|---|---|
| Default | Cancel trigger Button visible on the source page. No Dialog open. Booking is in a cancellable state. | Trigger Button: danger variant per button.md. |
| Confirming (Dialog open) | Dialog open with consequence statement, optional reason group, optional Checkbox, and action Buttons. Confirm Button may be disabled pending Radio selection or Checkbox acknowledgment. | Dialog surface tokens per dialog.md. Consequence highlight: `color.text.danger`. |
| Confirming (request in progress) | Confirm and dismiss Buttons replaced by Spinner. Dialog non-interactive. | Spinner: `color.text.secondary`. Dialog background unchanged. |
| Cancelled | Dialog closed. Booking tracking page reflects cancelled status. Success notification toast visible. | Toast tokens per notifications.md. Cancelled booking status tokens per order-tracking.md. |
| Failed cancellation | Dialog remains open. Inline error message appears in Dialog body. Confirm and dismiss Buttons restored. | Inline error tokens per error-state.md. Dialog surface unchanged. |
| Restricted | Cancel trigger absent. Restricted state block visible on source page. No Dialog path. | Restricted block: `color.background.subtle`, `color.border.default`, `color.text.secondary`. |

---

## 8. Accessibility

**ARIA roles**

The confirmation Dialog must use `role="alertdialog"` — not `role="dialog"` — because it presents a destructive action requiring an explicit decision. This signals higher urgency to assistive technologies.

| Element | Role | Purpose |
|---|---|---|
| Dialog container | `role="alertdialog"` | Identifies the surface as a high-urgency modal requiring a decision. |
| Dialog title | Referenced by `aria-labelledby` on the Dialog container | Provides the accessible name of the alertdialog. |
| Consequence statement | Referenced by `aria-describedby` on the Dialog container | Provides the accessible description, announced after the title. |
| Radio group | `<fieldset>` with `<legend>` | Groups the cancellation reason options with a visible group label. |
| Checkbox acknowledgment | `aria-required="true"` | Signals that checking the Checkbox is required before the confirm action is available. |
| Confirm Button (disabled) | `aria-disabled="true"` | Signals the Button is present but not yet activatable, without removing it from the Tab order. |
| Spinner (confirming state) | `aria-label="Cancelling your booking"` | Names the loading state for screen readers in place of the Buttons. |
| Restricted state block | `role="status"` | Announces the restriction when the block is dynamically rendered. |

**Keyboard navigation**

- When the Dialog opens, focus moves immediately to the Dialog container or the first interactive element within it — the first Radio option if a reason group is present, otherwise the dismiss Button ("Keep booking"), not the confirm Button.
- Focus is trapped within the Dialog while it is open. Tab cycles through all interactive elements: Radio options, Input (if visible), Checkbox (if present), confirm Button, dismiss Button, close Icon Button (if present).
- Escape dismisses the Dialog without cancelling. Equivalent to activating "Keep booking."
- Arrow keys navigate between Radio options within the reason group.
- Space toggles the Checkbox.
- Enter or Space activates the focused Button.

**Focus management**

- When the Dialog opens: focus moves to the first interactive element inside the Dialog.
- When the Dialog is dismissed (via "Keep booking" or Escape): focus returns to the cancel trigger Button on the source page.
- When cancellation succeeds and the Dialog closes: focus moves to the booking status heading on the booking tracking page, or to the next logical landmark if the page has navigated.
- When the restricted state block is rendered: focus does not move to it automatically. It is part of the static page layout and encountered during normal Tab navigation.

**Clear confirmation message**

The Dialog title and consequence statement together must make the action and its result unambiguous without requiring the user to read anything outside the Dialog. The combination of `aria-labelledby` (title) and `aria-describedby` (consequence statement) ensures screen readers announce both when the Dialog opens.

**Color contrast**

All text within the flow must meet WCAG 2.1 AA: minimum 4.5:1 for body text, minimum 3:1 for large text and UI component boundaries. The destructive nature of the confirm Button must not be communicated by color alone — the Button label ("Cancel booking") and the Dialog title must make the action explicit in text.

---

## 9. Content Guidelines

**Dialog title**

- Name the action being confirmed, not the object: "Cancel this booking?" — not "Are you sure?"
- Include a question mark. The Dialog is asking for confirmation, not announcing a decision.
- Maximum 50 characters.
- Do not use vague titles: "Confirm action", "Warning", "Please read this." Name the specific action.

**Consequence statement**

- State what will happen if the user confirms, in plain terms. One to two sentences.
- If a refund applies: "Your payment will be refunded within 3–5 business days."
- If a fee applies: call it out explicitly and use `color.text.danger` for the financial figure: "A cancellation fee applies. The remaining amount will be refunded."
- If the action is fully reversible (refund with no fees): "Your payment will be fully refunded. This cannot be undone."
- If the action is irreversible with no recovery: "Once cancelled, this booking cannot be reinstated. You will need to make a new booking."
- Do not use hedging language: "You may or may not receive a refund depending on various factors." If the refund outcome is known, state it. If it is not known, say: "Refund eligibility will be confirmed by email within 24 hours."

**Reason selection labels**

- Use plain, specific labels. Each option must be self-explanatory without reading the others.
- Preferred labels: "Changed my mind", "Found a better price", "Booked by mistake", "Dates no longer work", "Other."
- Do not use internal codes or system values as option labels.
- "Other" must always be the last option.

**Confirm Button label**

- "Cancel booking" — matches the trigger label exactly. Do not use "Confirm", "Yes", "Proceed", or "OK."
- The label must not change between the idle and confirming states. The Spinner replaces the Button entirely during the confirming state.

**Dismiss Button label**

- "Keep booking" — unambiguously names the outcome of dismissal. The user's booking is preserved.
- Do not use "No", "Cancel", "Close", or "Go back." "Cancel" on a dismiss button in a cancellation dialog creates a direct contradiction.

**Restricted state copy**

- Explain which stage the booking has reached and why that prevents cancellation: "This booking has passed the cancellation window and can no longer be cancelled."
- Provide the alternative path immediately: "For assistance, contact our support team or visit the refund flow." Include a Link to the refund flow.
- Do not apologise or attribute blame. State the fact and the path forward.

**Success notification copy**

- Per notifications.md success guidelines: "Booking #12345 cancelled." One sentence. No trailing reassurance.

**Failure copy (inline error within Dialog)**

- "Couldn't cancel your booking. Try again or contact support." Per error-state.md content guidelines.
- Do not close the Dialog on failure. The user must be able to retry or exit explicitly.

---

## 10. Cross References

- dialog.md
- order-tracking.md
- order-confirmation.md
- notifications.md
- error-state.md
- button.md
- radio.md
- input.md
- checkbox.md
- icon.md
- spinner.md
- token-reference.md
