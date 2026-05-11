---
name: Form
tier: pattern
status: draft
last-updated: 2026-04-29
maintainer: Team 4
source: Almosafer Design System
---

# Form

---

## 1. Overview

A form is a structured composition of input controls, labels, and actions that collects data from the user and submits it to a system. It is the primary data-entry pattern across Almosafer — from account creation and booking checkout to filter configuration and preference management.

A form groups related fields into a coherent unit with a clear purpose, a defined submission path, and explicit validation feedback. Every field has a visible label. Every error has a specific message. Every submission has a visible outcome.

The booking checkout flow is the highest-priority form context on Almosafer. Form decisions must not introduce friction at the point of payment data entry. Inline validation, precise error messages, and a clear submission path are non-negotiable in that context.

---

## 2. When to Use

- Collecting user data that will be sent to a server: account creation, checkout, contact forms, shipping address entry.
- Presenting a set of configurable settings that apply on explicit save rather than immediately.
- Capturing filter or search parameters that require multiple inputs before submission.
- Any context where a defined set of inputs produces a single, intentional user action.

---

## 3. When Not to Use

- **Immediate, single-field updates** — Use an inline editable field, not a form. A form implies a submission step. If the value takes effect on change or blur without a button press, it is not a form.
- **Binary settings that apply instantly** — Use a switch directly. Wrapping an instant toggle in a form with a save button misrepresents the interaction model.
- **Single-action confirmations** — Use a dialog with a button pair. A form with one field and one button is usually a dialog pattern, not a standalone form.
- **Navigation menus and filter chips** — Use the appropriate navigation or filter pattern. These are selection controls, not data-entry forms.

---

## 4. Composition

| Atom | Role in this pattern |
|---|---|
| `label` | Identifies every field in the form. Always visible above its associated control. Never replaced by placeholder text. Reflects the field's validation state through color token changes. |
| `input` | Collects free-form text, email, password, phone, and numeric values. Handles its own border, background, helper text, and error message display. All checkout inputs must declare `autocomplete` attributes. |
| `checkbox` | Captures binary agreement (terms, consent, opt-in) and multi-select preference groups. Required agreement checkboxes are not pre-checked. |
| `radio` | Captures single-selection from a defined set of mutually exclusive options: shipping method, payment type, sort preference. Always wrapped in a `<fieldset>` with a `<legend>`. |
| `switch` | Captures immediately-applied settings within a settings form only. Not used in transactional forms (checkout, registration) where the change must be confirmed on submit. |
| `button` (primary) | Submits the form. Enters loading state during async submission to prevent duplicate requests. Label names the specific outcome: "Place order", "Create account", "Save changes". |
| `button` (secondary) | Provides an alternative action: cancel, go back, or clear. Lower visual weight than the submit button. Never competes with the primary action. |

**Helper text** and **error messages** are delivered through the input atom's own anatomy. They are not separate atoms — they are managed by each field individually. The form pattern coordinates when and how they are triggered.

---

## 5. Tokens Used

These tokens govern form-level layout decisions that exist above the individual atom level. They are the only additions this pattern makes beyond what atoms already define.

| Decision | Token | Role |
|---|---|---|
| Gap between form fields | `spacing.md` | Vertical gap between each field group (label + control + helper) in a stacked layout |
| Gap between form sections | `spacing.lg` | Vertical gap between logical field groups separated by a section heading |
| Gap between last field and action row | `spacing.lg` | Space between the final form field and the submit button group |
| Gap between action buttons | `spacing.sm` | Horizontal gap between the primary submit button and secondary cancel button |
| Error summary — background | `color.background.danger` | Background of the optional form-level error summary shown above the fields on failed submission |
| Error summary — text | `color.text.danger` | Text color of messages inside the error summary |
| Error summary — border | `color.border.danger` | Border of the error summary container |
| Error summary — radius | `radius.md` | Corner radius of the error summary container |
| Error summary — vertical padding | `spacing.sm` | Top and bottom padding inside the error summary |
| Error summary — horizontal padding | `spacing.md` | Left and right padding inside the error summary |
| Error summary — item gap | `spacing.xs` | Gap between individual error lines inside the summary |

---

## 6. Variants

### Stacked (default)

Fields are arranged in a single vertical column. Each label sits above its field. This is the standard layout for all checkout forms, account forms, and any data-entry context where field relationships must be immediately clear.

**Layout rules:**
- Fields occupy the full available width of the form container by default.
- Each field group (label + control + helper or error) is a self-contained vertical unit.
- Multiple fields may be placed side by side in a row when they are semantically paired — for example, first name and last name, or city and postcode. Paired fields each occupy approximately half the row using equal flexible widths.
- Section headings may divide a long stacked form into named groups. The heading spacing uses `spacing.lg` above and `spacing.md` below.

**Use for:** Checkout, account creation, shipping address, contact forms, settings pages with multiple grouped preferences.

---

### Inline

The label and field occupy the same horizontal row. The label is left-aligned (or `inline-start` in logical CSS) and the field takes the remaining available width. Suitable for compact settings rows, quick-add inputs, and filter controls where vertical space is constrained.

**Layout rules:**
- Label width is consistent across all rows in the inline form. Set a fixed `inline-size` on the label column to align field edges.
- Fields in an inline layout may be narrower than their stacked equivalents. Content requirements define the minimum width.
- Error messages appear below the field within the same row, not below the label. This preserves the horizontal alignment of all rows above the errored field.
- Inline forms must not be used for checkout or registration. The stacked layout is required in all transactional contexts.
- In RTL layouts, the label appears on the right and the field on the left. Use logical CSS — do not write directional properties by position name.

**Use for:** Settings panels, profile edit rows, filter sidebars, admin operator surfaces where density is prioritised.

---

## 7. Behavior

### Validation

Validation is the form's primary behavioral responsibility. The atoms surface errors; the form orchestrates when those errors appear.

**On blur (inline validation):**
- Validate each field individually when it loses focus.
- Surface the error message within the field if validation fails.
- Do not validate a field the user has not yet touched.
- This is the required validation strategy for all checkout fields on Almosafer.

**On submit (full validation sweep):**
- Validate all fields when the user activates the submit button.
- Any field that has not been validated by blur is validated at this point.
- All errors are surfaced simultaneously.
- Scroll to and move focus to the first invalid field in document order.

**Real-time validation (selective):**
- Used only for fields where immediate feedback adds genuine value: username availability, coupon code validity, password strength.
- Do not apply real-time validation broadly. It creates visual noise and interrupts the user mid-entry.
- Debounce real-time validation to avoid firing on every keystroke.

### Submission states

| State | Form behaviour | Submit button | Fields |
|---|---|---|---|
| Default | All fields at rest, no errors | Default state | Editable |
| Error | One or more fields have failed validation | Default state, re-enabled | Errored fields show error state |
| Submitting | Async request in progress | Loading state — `aria-busy="true"`, `aria-disabled="true"` | All fields disabled |
| Success | Request completed successfully | Removed or replaced with confirmation | Locked or cleared depending on context |
| Disabled | Form intentionally locked — e.g., read-only view | Absent or visually suppressed | All fields carry disabled state tokens |

### Error summary

For forms with more than four fields, display an error summary at the top of the form when submission fails. The summary:
- Appears above the first field using `color.background.danger`, `color.border.danger`, `radius.md`, and `spacing.sm` / `spacing.md` padding.
- Lists each error as a short phrase matching the error message shown at the field.
- Each item in the summary is a link that moves focus to the corresponding invalid field.
- Is announced to screen readers via `role="alert"` so users are notified immediately on submission failure.
- Is removed when the form is resubmitted successfully.

For forms with four fields or fewer, field-level errors alone are sufficient. Do not add a summary.

### Focus management

- On submission failure: move focus to the error summary container if present, otherwise move focus to the first invalid field.
- On submission success: move focus to the confirmation message, success page heading, or the first focusable element in the new view — never drop focus silently.
- On field error clear (user corrects the field): do not move focus. Allow the user to continue editing without interruption.

### RTL and bidirectional layout

All directional spacing and layout properties in the form must use logical CSS. This applies to:
- Field padding: `padding-inline-start`, `padding-inline-end`
- Label and field row alignment in inline layout: `margin-inline-end` on the label column
- Error icon placement: `inset-inline-start`
- Action button row: `justify-content: flex-end` mirrors correctly in RTL without additional rules

Physical properties (`margin-left`, `padding-right`, `float`, `text-align: left`) are banned in all form layout styles.

---

## 8. Accessibility

| Requirement | Rule |
|---|---|
| Label association | Every input, checkbox, radio, and switch must have a visible, programmatically associated label. Use `for` / `id` pairing. The label atom handles color state; the association is mandatory regardless of state. |
| Required fields | Mark required fields with `required` on the control and `aria-required="true"`. The label atom's required variant surfaces the visual asterisk and visually hidden "Required" text. |
| Grouped controls | Radio groups and checkbox groups must be wrapped in `<fieldset>` with a `<legend>` naming the group. The legend replaces the label at the group level. Individual controls within the group still carry their own labels. |
| Error association | Each field's error message element must have a unique `id`. The field control must carry `aria-describedby` referencing that `id` and `aria-invalid="true"` when in error state. This ensures screen readers announce the error message when the field is focused. |
| Error summary | The error summary container carries `role="alert"`. Its content is announced immediately when injected into the DOM. Each item links to its corresponding field — these links must have descriptive text matching the field label. |
| Keyboard navigation | Tab order must follow the visual order of fields from top to bottom (stacked) or left to right (inline). Do not use `tabindex` values greater than `0`. Do not skip fields or break the natural tab flow. |
| Submit on Enter | Pressing `Enter` in a single-line text input submits the form. This is native browser behaviour — do not suppress it unless there is a specific reason (e.g., a multi-field autocomplete). |
| Disabled form state | During submission, set `aria-disabled="true"` on all fields and the submit button. Use `aria-busy="true"` on the form element or a containing region to signal the active async operation. |
| No keyboard trap | Users must be able to Tab out of any field and away from the form at any point. Do not intercept Tab or restrict navigation to the form container. |
| Touch target | All interactive controls must meet the 44×44 minimum touch target. Do not reduce field height, checkbox size, or button padding below the atom-defined minimum values. |
| WCAG criteria | Applies SC 1.3.1 (Info and Relationships), SC 1.3.5 (Identify Input Purpose — autocomplete), SC 2.1.1 (Keyboard), SC 2.4.3 (Focus Order), SC 3.3.1 (Error Identification), SC 3.3.2 (Labels or Instructions), SC 3.3.3 (Error Suggestion), SC 4.1.2 (Name, Role, Value). |

---

## 9. Content Guidelines

**Labels**
- Use noun phrases that name what the field collects. "Email address", "Full name", "Phone number". Not "Enter your email" or "What is your name?".
- Keep labels to one to four words. If more context is needed, use helper text below the field.
- Sentence case. No ending punctuation.
- Do not use the same label for two different fields in the same form.

**Helper text**
- Use only when the label alone is insufficient — format hints, constraints, or brief clarifications.
- One line. Under ten words. Do not restate the label.
- Helper text must not contain the error message. It must remain visible and useful even when the error message replaces it.
- On Almosafer: helper text in checkout fields must be specific to the locale and payment method — for example, card number format hints must reflect the active card type.

**Error messages**
- Name the specific problem. "Email address is required" is correct. "Invalid input" is not.
- Name the fix when one exists. "Enter a valid email address, for example name@example.com" gives the user a clear path forward.
- Do not blame the user. Write in neutral, informative language. "The password must be at least eight characters" instead of "Your password is too short".
- Keep the message to one to two sentences. Do not write paragraphs.
- On Almosafer, booking checkout error messages must be precise enough to resolve without external help. "Card number is invalid — check the 16-digit number on the front of your card" is the required level of specificity.

**Submit button labels**
- Name the specific outcome of submission. "Place order", "Create account", "Save address", "Subscribe". Not "Submit", "Confirm", or "OK".
- Match the label to what actually happens. If the button places a paid order, the label must say so.
- Do not change the label between default and loading states. The spinner replaces the icon; the label remains to confirm what is happening.

**Fieldset legends**
- Name the group of controls, not the type of control. "Shipping method" is correct. "Radio buttons" is not.
- One to four words. Sentence case.

---

## 10. Code Example

```html
<!-- Stacked checkout form — Almosafer, account creation -->
<form
  class="form form--stacked"
  novalidate
  aria-label="Create account"
>

  <!-- Optional error summary — shown on failed submit when > 4 fields -->
  <div
    class="form__error-summary"
    role="alert"
    hidden
  >
    <p class="form__error-summary-heading">
      Fix the following errors before continuing:
    </p>
    <ul class="form__error-summary-list">
      <!-- Items injected by JS on submit failure -->
      <!-- <li><a href="#full-name">Full name is required</a></li> -->
    </ul>
  </div>

  <!-- Full name -->
  <div class="form__field">
    <label class="label" for="full-name">
      Full name
      <span class="label__required" aria-hidden="true">*</span>
      <span class="visually-hidden">Required</span>
    </label>
    <input
      class="input"
      id="full-name"
      name="full-name"
      type="text"
      autocomplete="name"
      required
      aria-describedby="full-name-error"
      aria-invalid="false"
    />
    <span
      id="full-name-error"
      class="input__error"
      role="status"
      aria-live="polite"
      hidden
    ></span>
  </div>

  <!-- Email address -->
  <div class="form__field">
    <label class="label" for="email">
      Email address
      <span class="label__required" aria-hidden="true">*</span>
      <span class="visually-hidden">Required</span>
    </label>
    <input
      class="input"
      id="email"
      name="email"
      type="email"
      autocomplete="email"
      required
      aria-describedby="email-helper email-error"
      aria-invalid="false"
    />
    <span id="email-helper" class="input__helper">
      You will use this to sign in
    </span>
    <span
      id="email-error"
      class="input__error"
      role="status"
      aria-live="polite"
      hidden
    ></span>
  </div>

  <!-- Password -->
  <div class="form__field">
    <label class="label" for="password">
      Password
      <span class="label__required" aria-hidden="true">*</span>
      <span class="visually-hidden">Required</span>
    </label>
    <input
      class="input"
      id="password"
      name="password"
      type="password"
      autocomplete="new-password"
      required
      aria-describedby="password-helper password-error"
      aria-invalid="false"
    />
    <span id="password-helper" class="input__helper">
      At least eight characters
    </span>
    <span
      id="password-error"
      class="input__error"
      role="status"
      aria-live="polite"
      hidden
    ></span>
  </div>

  <!-- Agreement checkbox -->
  <div class="form__field">
    <label class="checkbox-label" for="terms">
      <input
        class="checkbox"
        id="terms"
        name="terms"
        type="checkbox"
        required
        aria-describedby="terms-error"
        aria-invalid="false"
      />
      I agree to the
      <a class="link" href="/terms">Terms of Service</a>
      and
      <a class="link" href="/privacy">Privacy Policy</a>
    </label>
    <span
      id="terms-error"
      class="input__error"
      role="status"
      aria-live="polite"
      hidden
    ></span>
  </div>

  <!-- Action row -->
  <div class="form__actions">
    <button class="button button--primary" type="submit">
      Create account
    </button>
    <a class="link" href="/sign-in">
      Already have an account?
    </a>
  </div>

</form>
```

```css
/* Stacked form layout */
.form--stacked {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* Each field group */
.form__field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

/* Action row */
.form__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-block-start: var(--spacing-lg);
}

/* Error summary */
.form__error-summary {
  background: var(--color-background-danger);
  border: 1px solid var(--color-border-danger);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-danger);
}

.form__error-summary-heading {
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-medium);
  margin-block-end: var(--spacing-xs);
}

.form__error-summary-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding-inline-start: var(--spacing-md);
  font-size: var(--text-body-sm-size);
}

.form__error-summary-list a {
  color: var(--color-text-danger);
}

/* Inline form layout */
.form--inline {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.form--inline .form__field {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: var(--spacing-sm);
}

.form--inline .label {
  flex-shrink: 0;
  inline-size: 10rem; /* implementation-defined label column width */
}

/* Disabled form state during submission */
.form[aria-busy="true"] .input,
.form[aria-busy="true"] .checkbox,
.form[aria-busy="true"] .radio-control {
  pointer-events: none;
  opacity: 1; /* preserve token-based disabled appearance from atom */
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

- [input.md](../atoms/input.md) — Primary data collection atom; handles field border, background, helper text, and error message display
- [label.md](../atoms/label.md) — Required identifier for every form field; reflects error and disabled states through color tokens
- [button.md](../atoms/button.md) — Submit and cancel actions; loading state during async submission is mandatory for checkout flows
- [checkbox.md](../atoms/checkbox.md) — Agreement, consent, and multi-select fields within forms
- [radio.md](../atoms/radio.md) — Single-selection groups (shipping method, payment type) — always within a fieldset
- [switch.md](../atoms/switch.md) — Immediate settings toggles; valid in settings forms only, not transactional forms
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all spacing, color, and radius values used in form-level layout
