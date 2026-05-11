---
name: Dialog
tier: pattern
status: draft
last-updated: 2026-04-29
maintainer: Team 4
source: Almosafer Design System
---

# Dialog

---

## 1. Overview

A dialog is a focused overlay that interrupts the current context to require user attention or input. It opens above the page, blocks interaction with content behind it until dismissed, and closes when the user completes or abandons the task it presents.

On Almosafer, dialogs appear at high-stakes decision points: confirming a booking cancellation, acknowledging a payment failure, verifying before removing a saved trip. These are moments where the user must act deliberately. The dialog must communicate clearly, offer unambiguous actions, and resolve without trapping the user.

---

## 2. When to Use

- Confirming a destructive or irreversible action before it is committed: removing an item, cancelling an order, deleting an account.
- Presenting a critical system message that requires user acknowledgment before the session continues: payment declined, session expired, authentication required.
- Collecting a small, focused set of inputs that belong to a discrete decision — for example, entering a coupon code, selecting a delivery slot — where opening a full page would break flow.
- Surfacing secondary content that must remain separate from the primary page context, such as product image zoom or a terms preview before agreement.

---

## 3. When Not to Use

- **When the information can live inline** — Use an inline alert, helper text, or a notification. A dialog is an interruption. Reserve it for moments that genuinely require the user to stop and act.
- **For complex, multi-section forms** — Use a dedicated page or a multi-step flow. A dialog with many fields, sections, or navigation creates a context within a context and confuses the user's mental model.
- **For non-critical information** — Use a tooltip, popover, or inline text. Interrupting the user to display content they did not ask for damages trust.
- **For success confirmations that require no action** — Use a toast notification. A success dialog forces the user to dismiss feedback that did not require a decision.
- **As a navigation destination** — A dialog is not a page. Do not use it to present content that belongs in a route.
- **Nested dialogs** — Never open a dialog from within a dialog. If a second decision is needed, resolve the first or redesign the flow as a step sequence.

---

## 4. Composition

| Element | Atom / role |
|---|---|
| Scrim | Non-interactive full-viewport overlay rendered behind the dialog container. Signals that the page beneath is temporarily inactive. Uses `color.background.inverse` as its color base with implementation-level opacity. Not a separate atom — it is part of the dialog pattern's structure. |
| Dialog container | The surface that holds all dialog content. Carries background, border, radius, shadow, and padding tokens. Positioned at the centre of the viewport. |
| Header | Structural region containing the title and optional close control. Separated from the body by a divider. |
| Title | `text.heading.sm` — the dialog's accessible name. Always present. Concise and specific. Associated with the dialog via `aria-labelledby`. |
| Body | Structural region containing the message, supporting text, or embedded form fields. Text uses the `label` and `input` atoms when a form is present. Plain copy uses `color.text.secondary` at `text.body.md` size. |
| Actions | Structural region at the base of the dialog. Contains one primary `button` and optionally one secondary `button`. Buttons are provided by the button atom — their internal behaviour is defined there. |
| Close control | `icon-button` atom (default variant, small size) positioned in the dialog header. Present on modal dialogs only. Absent from alert dialogs and confirmation dialogs where the action buttons handle dismissal. |
| Dividers | Horizontal rules separating header from body and body from actions. Rendered using `color.border.subtle`. Optional — used when the dialog body contains scrollable content. |

When the dialog body contains form fields, the `input`, `label`, and form pattern apply in full. The dialog provides the container and action layer; the form pattern governs field layout, validation, and submission within it.

---

## 5. Tokens Used

These tokens govern dialog-level structural decisions. Atom-internal tokens are defined in their respective specs and are not repeated here.

| Decision | Token | Role |
|---|---|---|
| Container background | `color.background.surface` | Dialog surface on both light and dark scrim contexts |
| Container border | `color.border.default` | 1px boundary separating the container from the scrim |
| Container radius | `radius.xl` | Corner rounding — explicitly defined for modals and panels |
| Container padding — all sides | `spacing.lg` | Internal spacing between the container edge and all content regions |
| Header-to-body gap | `spacing.md` | Vertical gap between the title row and the body content |
| Body-to-actions gap | `spacing.md` | Vertical gap between the body content and the action button row |
| Action button gap | `spacing.sm` | Horizontal gap between the primary and secondary action buttons |
| Divider color | `color.border.subtle` | Horizontal rule between scrollable body and fixed header or footer |
| Title text color | `color.text.primary` | Dialog heading color |
| Body text color | `color.text.secondary` | Supporting message and descriptive copy color |
| Title font size | `text.heading.sm` | Dialog title typographic size |
| Body font size | `text.body.md` | Dialog body copy typographic size |
| Focus ring | `color.border.focus` | Focus outline on all interactive elements within the dialog |
| Scrim base color | `color.background.inverse` | Backdrop color reference — opacity applied at implementation level |
| Entry transition — dialog | `motion.enter` | Dialog container fade-in when opening |
| Entry transition — scrim | `motion.enter` | Scrim fade-in when opening |
| Exit transition — dialog | `motion.exit` | Dialog container fade-out when closing |
| Exit transition — scrim | `motion.exit` | Scrim fade-out when closing |

---

## 6. Variants

### Modal dialog

The general-purpose dialog variant. Used for non-destructive tasks: form input, content preview, settings that require confirmation before applying. Contains a close control in the header. The user can dismiss the dialog via the close icon button, the cancel action button, or the `Escape` key.

| Property | Value |
|---|---|
| ARIA role | `dialog` |
| Close icon button | Present in the header, `inline-end` aligned |
| Escape to dismiss | Permitted |
| Primary action | Primary button — names the confirmation or submit outcome |
| Secondary action | Secondary button — labelled "Cancel" |
| Background lockout | Yes — scrim blocks page interaction |

---

### Alert dialog

Used when the system must communicate a critical state that requires acknowledgment before the user can continue: payment declined, session about to expire, order processing failed. No close button is present. The user cannot dismiss the dialog by pressing `Escape` — acknowledgment via the action button is required.

| Property | Value |
|---|---|
| ARIA role | `alertdialog` |
| Close icon button | Absent |
| Escape to dismiss | Not permitted |
| Primary action | Primary button — labelled with the specific acknowledgment: "Try again", "Sign in again", "Return to payment" |
| Secondary action | Secondary button — present only when a safe alternative path exists |
| Background lockout | Yes — scrim blocks page interaction |

The `alertdialog` role causes screen readers to interrupt and announce the dialog content immediately, ahead of the current reading position. Use it only for genuinely critical system states.

---

### Confirmation dialog

Used when a user-initiated action is destructive, irreversible, or high-consequence and requires deliberate re-confirmation before proceeding. No close button in the header — the Cancel button is the sole dismiss path. The primary action uses the danger button variant when the action deletes or permanently alters data.

| Property | Value |
|---|---|
| ARIA role | `dialog` |
| Close icon button | Absent |
| Escape to dismiss | Permitted — equivalent to Cancel |
| Primary action | Danger button — names the destructive action explicitly: "Delete item", "Cancel order", "Remove card" |
| Secondary action | Secondary button — labelled "Cancel" |
| Background lockout | Yes — scrim blocks page interaction |

The destructive action button must name its specific consequence. "Delete", "Remove", or "Cancel order" are correct. "Confirm" or "OK" alone are not sufficient.

---

## 7. Behavior

### Opening

- The dialog opens programmatically in response to a user action — clicking a trigger button, failing a critical validation, or receiving a server-initiated prompt.
- The scrim and dialog container enter simultaneously using `motion.enter` applied to opacity.
- On open, focus is moved into the dialog. The initial focus target is the first focusable element in the dialog: the close icon button if present, otherwise the first action button.
- The page behind the scrim must not scroll while the dialog is open. Apply `overflow: hidden` to the `<body>` element during the open state.
- `aria-hidden="true"` is set on all page content outside the dialog to remove it from the accessibility tree during the open state. Remove this attribute on close.

### Closing

- The dialog closes when the user activates a close control (close icon button or cancel button), activates the primary action, or — where permitted — presses `Escape`.
- The dialog container and scrim exit simultaneously using `motion.exit` applied to opacity. They are removed from the DOM after the exit transition completes.
- On close, focus returns to the element that triggered the dialog to open. If the trigger no longer exists in the DOM (for example, because the dialog resulted in deletion of that element), focus moves to the closest logical container or the page heading.
- `aria-hidden` is removed from page content. `overflow: hidden` is removed from `<body>`. Page scroll position is restored.

### States

| State | Dialog | Scrim | Actions | Notes |
|---|---|---|---|---|
| Closed | Not in DOM | Not in DOM | — | Default. Dialog is absent. |
| Opening | Animating in (`motion.enter`) | Animating in (`motion.enter`) | Interactive after animation | Focus moved to dialog at animation start. |
| Open | Fully visible | Fully visible | Interactive | Focus trapped within dialog. |
| Loading | Visible | Visible | Primary button in loading state; all inputs disabled | During async operation following action activation. Body content unchanged. |
| Closing | Animating out (`motion.exit`) | Animating out (`motion.exit`) | Non-interactive | Removed from DOM after exit completes. |

### Focus trap

While the dialog is open, keyboard focus must not leave the dialog container. Pressing `Tab` from the last focusable element in the dialog must cycle focus back to the first. Pressing `Shift+Tab` from the first must cycle to the last. This applies to all three variants.

No focus may reach elements behind the scrim. This is enforced by inert behaviour on the page content or by setting `tabindex="-1"` on all page elements outside the dialog during the open state.

### Scrollable body

When dialog body content exceeds the available height, the body region scrolls independently. The header and footer (actions) remain fixed. A divider at `color.border.subtle` marks the boundary between the scrollable body and the fixed header and footer.

The dialog container must not exceed a maximum height that pushes the action buttons off screen. The implementation defines the maximum height in relation to viewport height. Action buttons must always be reachable without scrolling.

### Loading state

When the primary action triggers an asynchronous operation (order submission, account deletion):

- The primary button enters its loading state (`aria-busy="true"`, `aria-disabled="true"`, spinner replaces icon).
- All interactive elements in the dialog body (inputs, checkboxes) are disabled.
- The dialog remains open and visible. The scrim remains.
- On success, the dialog closes following the closing behaviour above.
- On failure, the loading state is cleared, an error message is surfaced within the dialog body, and focus returns to the first invalid field or the primary action button.

### RTL layout

All directional properties in the dialog use logical CSS:

- Close icon button: `inset-inline-end` for positioning in the header
- Action button row: `justify-content: flex-end` — resolves correctly in both directions
- Header padding: `padding-inline-start`, `padding-inline-end`
- Body and action region padding: uses the container `spacing.lg` uniformly

Physical directional properties (`right`, `left`, `padding-right`, `margin-left`) are banned in all dialog layout styles.

---

## 8. Accessibility

| Requirement | Rule |
|---|---|
| ARIA role | `role="dialog"` for modal and confirmation variants. `role="alertdialog"` for alert variants. The role is placed on the dialog container element, not the scrim. |
| Accessible name | The dialog container must carry `aria-labelledby` referencing the `id` of the title element. The title must always be present and visible. Do not use `aria-label` on the container when a visible title exists. |
| Accessible description | When the dialog body contains a descriptive paragraph separate from the title, the container carries `aria-describedby` referencing the body paragraph's `id`. |
| Focus management — open | Move focus into the dialog immediately when it opens. The first focusable element is the default target. Do not delay focus movement until after the animation completes. |
| Focus trap | All Tab and Shift+Tab navigation must cycle within the dialog while it is open. Focus must not reach elements behind the scrim. |
| Focus management — close | Return focus to the element that triggered the dialog. If the trigger is gone, move focus to the next logical landmark. Never drop focus to the document body. |
| Escape to close | Modal and confirmation dialogs must close when the user presses `Escape`. Alert dialogs must not — acknowledgment is required. Implement via `keydown` event listener on the dialog container. |
| Page inert | Set `aria-hidden="true"` on all page content outside the dialog while it is open. Remove on close. This prevents screen readers from navigating to page content during the dialog session. |
| Scroll lock | Prevent page scroll while the dialog is open. Users with scroll-enabled screen readers must not be able to scroll away from the dialog context. |
| Reduced motion | Apply `motion.enter` and `motion.exit` transitions to opacity only when `prefers-reduced-motion` is not active. Under `prefers-reduced-motion: reduce`, display and hide the dialog without transition. |
| Button roles | All action controls in the dialog footer are native `<button>` elements. Do not use `<div>` or `<a>` for dialog actions. |
| WCAG criteria | Applies SC 1.3.1 (Info and Relationships), SC 2.1.1 (Keyboard), SC 2.1.2 (No Keyboard Trap), SC 2.4.3 (Focus Order), SC 2.4.7 (Focus Visible), SC 3.3.1 (Error Identification), SC 4.1.2 (Name, Role, Value). |

---

## 9. Content Guidelines

**Title**
- One clear phrase naming what the dialog is about. "Cancel your booking", "Payment declined", "Remove saved trip".
- Sentence case. No ending punctuation.
- Do not use the title as the only instruction. The body must still carry a message.
- Avoid vague titles: "Are you sure?", "Warning", "Notice". Name the specific context.
- On Almosafer, booking-related dialog titles must name the specific consequence: "Cancel booking #1042" rather than "Cancel booking".

**Body message**
- One to three sentences. State what will happen and whether it can be undone.
- For destructive confirmations: name what will be lost. "Your order will be permanently cancelled. Any applied coupons will not be restored."
- For alert dialogs: state the problem and the available resolution path. "Your card ending in 4242 was declined. Check your card details or use a different payment method."
- Do not place instructions in the title. The title names the situation; the body delivers the message.
- Do not use placeholder copy ("Lorem ipsum", "Message goes here"). Every dialog must contain final, specific content.

**Action labels**
- Primary action: verb-first, names the specific outcome. "Cancel order", "Delete item", "Try again", "Save address".
- Secondary action: "Cancel" when the user abandons the dialog. Occasionally "Go back" when a step sequence applies.
- Do not use "OK", "Yes", "No", "Confirm" as standalone labels. Each requires the subject to be specific.
- Danger button labels must name the irreversible action explicitly. "Cancel booking" on the Almosafer checkout surface is a high-stakes label — it must match the consequence exactly.

**Close icon button**
- Present in modal dialogs only. Its `aria-label` must name the dialog context: "Close shipping address dialog", not "Close".
- Absent from alert and confirmation dialogs. The action buttons are the only exit path in those variants.

---

## 10. Code Example

```html
<!-- Confirmation dialog — cancel booking (Almosafer booking context) -->

<!-- Scrim -->
<div class="dialog-scrim" aria-hidden="true"></div>

<!-- Dialog container -->
<div
  class="dialog dialog--confirmation"
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-body"
  tabindex="-1"
>
  <!-- Header -->
  <header class="dialog__header">
    <h2 class="dialog__title" id="dialog-title">
      Cancel booking #1042
    </h2>
  </header>

  <!-- Body -->
  <div class="dialog__body" id="dialog-body">
    <p class="dialog__message">
      Your booking will be permanently cancelled. Any applied promotional
      discounts or loyalty points will not be restored.
    </p>
  </div>

  <!-- Actions -->
  <footer class="dialog__actions">
    <button class="button button--secondary" type="button"
            data-dialog-action="cancel">
      Keep booking
    </button>
    <button class="button button--danger" type="button"
            data-dialog-action="confirm">
      Cancel booking
    </button>
  </footer>
</div>


<!-- Modal dialog — with close button -->

<div class="dialog-scrim" aria-hidden="true"></div>

<div
  class="dialog dialog--modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-body"
  tabindex="-1"
>
  <header class="dialog__header">
    <h2 class="dialog__title" id="modal-title">
      Add delivery address
    </h2>
    <button
      class="icon-button icon-button--sm"
      type="button"
      aria-label="Close add delivery address dialog"
      data-dialog-action="close"
    >
      <svg class="icon-button__icon" aria-hidden="true" focusable="false">
        <use href="/icons/sprite.svg#x" />
      </svg>
    </button>
  </header>

  <div class="dialog__body" id="modal-body">
    <!-- Form fields use the form pattern and input atom -->
    <div class="form form--stacked">
      <div class="form__field">
        <label class="label" for="address-line-1">
          Address line 1
          <span class="label__required" aria-hidden="true">*</span>
          <span class="visually-hidden">Required</span>
        </label>
        <input
          class="input"
          id="address-line-1"
          name="address-line-1"
          type="text"
          autocomplete="address-line1"
          required
        />
      </div>
    </div>
  </div>

  <footer class="dialog__actions">
    <button class="button button--secondary" type="button"
            data-dialog-action="cancel">
      Cancel
    </button>
    <button class="button button--primary" type="button"
            data-dialog-action="confirm">
      Save address
    </button>
  </footer>
</div>


<!-- Alert dialog — payment declined -->

<div class="dialog-scrim" aria-hidden="true"></div>

<div
  class="dialog dialog--alert"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="alert-title"
  aria-describedby="alert-body"
  tabindex="-1"
>
  <header class="dialog__header">
    <h2 class="dialog__title" id="alert-title">
      Payment declined
    </h2>
  </header>

  <div class="dialog__body" id="alert-body">
    <p class="dialog__message">
      Your card ending in 4242 was declined. Check your card details
      or use a different payment method.
    </p>
  </div>

  <footer class="dialog__actions">
    <button class="button button--secondary" type="button"
            data-dialog-action="cancel">
      Return to payment
    </button>
    <button class="button button--primary" type="button"
            data-dialog-action="confirm">
      Try again
    </button>
  </footer>
</div>
```

```css
/* Scrim */
.dialog-scrim {
  position: fixed;
  inset: 0;
  background: var(--color-background-inverse);
  opacity: 0.5; /* implementation-level value — not covered by current token scope */
  z-index: 100;
  animation: dialog-fade-in var(--motion-enter) both;
}

/* Dialog container */
.dialog {
  position: fixed;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  background: var(--color-background-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  animation: dialog-fade-in var(--motion-enter) both;
}

/* Header */
.dialog__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.dialog__title {
  color: var(--color-text-primary);
  font-size: var(--text-heading-sm-size);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  margin: 0;
}

/* Body */
.dialog__body {
  color: var(--color-text-secondary);
  font-size: var(--text-body-size);
  line-height: var(--line-height-normal);
}

.dialog__message {
  margin: 0;
}

/* Scrollable body with dividers */
.dialog--scrollable .dialog__body {
  overflow-y: auto;
  border-block-start: 1px solid var(--color-border-subtle);
  border-block-end: 1px solid var(--color-border-subtle);
  padding-block: var(--spacing-md);
  margin-block: calc(var(--spacing-md) * -1);
}

/* Actions */
.dialog__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-sm);
}

/* Entry animation */
@keyframes dialog-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Exit — applied before removal */
.dialog.is-exiting,
.dialog-scrim.is-exiting {
  animation: dialog-fade-out var(--motion-exit) both;
}

@keyframes dialog-fade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .dialog,
  .dialog-scrim,
  .dialog.is-exiting,
  .dialog-scrim.is-exiting {
    animation: none;
    transition: none;
  }
}

/* Focus ring — inherited from atom specs, enforced here */
.dialog *:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

---

## 11. Cross References

- [button.md](../atoms/button.md) — All action buttons in dialog footers; the danger variant is required for confirmation dialogs with destructive outcomes; the loading state applies during async submission
- [icon-button.md](../atoms/icon-button.md) — Close control in the modal dialog header; uses default variant, small size, with a contextual `aria-label`
- [input.md](../atoms/input.md) — Form fields embedded in modal dialog bodies; all input atom behaviour, validation, and state rules apply unchanged
- [form.md](./form.md) — When a dialog body contains multiple fields, the form pattern governs field layout, validation timing, error handling, and the submission flow
- [spinner.md](../atoms/spinner.md) — Inline spinner used inside the primary button during the dialog loading state
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all spacing, color, radius, and motion values used in this pattern
