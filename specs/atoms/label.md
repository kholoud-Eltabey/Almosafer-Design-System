---
name: Label
tier: atom
status: draft
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Label

---

## 1. Overview

A label is a visible text element that identifies and describes a form control. It is programmatically associated with its control so that assistive technology announces the label when the control receives focus.

A label is mandatory for every form control. It must always be visible. Placeholder text, icon-only fields, and `aria-label` alone are not substitutes for a visible label.

---

## 2. When to Use

- Identifying every input, textarea, checkbox, radio button, and switch in a form.
- Providing a persistent visible name for a form control that remains visible when the field is filled or focused.
- Marking a field as required with a visible required indicator.
- Connecting a form control to its helper text or error message through semantic association.

---

## 3. When Not to Use

- **As a substitute for a heading or section title** — Use a heading element. Labels identify controls, not sections.
- **Replaced by placeholder text** — Placeholder text disappears on input and fails accessibility requirements. A label must always be visible alongside the field.
- **As a button label** — Use the button element's text content. Labels are for form controls only.
- **On controls without a matching `id`** — A label without a valid `for`/`id` association provides no programmatic benefit. Always associate the label with its control.
- **Describing a group of controls** — Use a `<fieldset>` with a `<legend>`. A label describes one control. A legend describes a group.

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | The native `<label>` element. Semantic wrapper that owns the association to its control via the `for` attribute matching the control's `id`. Clicking the container focuses or activates the associated control. |
| Label text | Yes | The visible copy that names the control. Short, specific, and written in sentence case. Carries text color and typography tokens. |
| Required indicator | Conditional | A visual marker signalling the associated control is required. Rendered as an asterisk character (`*`) following the label text. Accompanied by a visually hidden text node (`"Required"`) for screen readers. The asterisk itself carries `aria-hidden="true"`. |
| Helper reference | No | Not a visual child of the label. The associated control carries `aria-describedby` pointing to a helper text or error message element. The label does not render helper or error copy — it names the control. Helper and error text are sibling elements managed by the form field pattern. |

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Label text — default | `color.text.primary` | Default label color at rest |
| Label text — focused | `color.text.brand` | Label color when the associated control is focused |
| Label text — disabled | `color.text.disabled` | Label color when the associated control is disabled |
| Label text — error | `color.text.danger` | Label color when the associated control is invalid |
| Required indicator | `color.text.danger` | Asterisk color to visually signal a required field |
| Gap — text to required indicator | `spacing.xs` | Space between the label text and the required asterisk |
| Font size — small context | `text.body.sm` | Label size in compact or small-density form layouts |
| Font size — default context | `text.body.md` | Label size in standard form layouts |
| Font size — large context | `text.body.lg` | Label size in large or prominent form layouts |
| Font weight | `font-weight-medium` | Label weight to distinguish it from body copy |
| Line height | `line-height-normal` | Consistent line height across all label sizes |
| Transition | `motion.fast` | Color transition when state changes |

---

## 6. Variants

| Variant | Default | Description |
|---|---|---|
| Default | Yes | A label with visible text and no required indicator. Used for optional form fields or when all fields in a form are required and a global note communicates that. |
| Required | No | A label with visible text and a required indicator asterisk. Used when the associated control must have a value before the form can be submitted. The asterisk is visual only; a visually hidden `"Required"` text node provides the accessible announcement. |

**Rule:** Do not use the required indicator on every field in a form. If all fields are required, use a single form-level note — "All fields are required" — rather than repeating the indicator on every label.

---

## 7. Sizes

A label inherits its font size from the typographic context of the form layout in which it is placed. It does not define a fixed size.

| Context | Token | Use case |
|---|---|---|
| Small | `text.body.sm` | Compact forms, dense settings panels, inline filter controls. |
| Default | `text.body.md` | Standard form layouts, dialogs, onboarding flows, and settings pages. |
| Large | `text.body.lg` | High-prominence form sections, landing-page forms, or layouts requiring increased legibility. |

Do not set font size directly on the label element. Allow it to inherit from the form layout's typographic context, or apply the appropriate token at the form-field level.

All sizes use `font.weight.medium` and `line-height-normal`.

---

## 8. States

A label does not have independent interactive states. Its visual state mirrors the state of its associated control.

| State | Condition | Text color | Required indicator | Transition |
|---|---|---|---|---|
| Default | Control at rest | `color.text.primary` | `color.text.danger` | — |
| Focused | Associated control is focused | `color.text.brand` | `color.text.danger` | `motion.fast` on text color |
| Disabled | Associated control is disabled | `color.text.disabled` | `color.text.disabled` | None |
| Error | Associated control is invalid | `color.text.danger` | `color.text.danger` | `motion.fast` on text color |

**Rules:**

- The label never receives focus directly. It reflects the state of its control.
- The focused state is applied by the parent form-field container using `:focus-within` or a JavaScript-applied class, not by the label element itself.
- In the disabled state, the required indicator matches the disabled text color. Do not use `color.text.danger` for a required indicator when the field is disabled — the control cannot be submitted regardless of value.
- In the error state, the label and required indicator both shift to `color.text.danger`. This visually connects the label to the error message below the field.
- Transitions on color changes use `motion.fast`.

---

## 9. Behavior

**Click and touch**
- Clicking or tapping a label focuses the associated control if it is a text input or textarea.
- Clicking or tapping a label associated with a checkbox or radio button toggles the control's checked state.
- Clicking or tapping a label associated with a switch toggles the switch.
- This behavior is native to the `<label>` element when `for` matches the control's `id`. No JavaScript is required.

**State reflection**
- The label's visual state is driven by the state of its associated control, not by direct interaction with the label itself.
- The parent form-field container is responsible for applying state classes (`is-focused`, `is-disabled`, `is-error`) that cascade to the label's visual tokens.

**Required validation**
- The required indicator is visual only. The required constraint is enforced on the control via the native `required` attribute or `aria-required="true"`.
- The label does not perform validation. It communicates the requirement visually.

**No truncation**
- Label text must not be truncated. If the label exceeds the available width, it wraps to the next line. Do not apply `text-overflow: ellipsis` or `white-space: nowrap` to a label.

---

## 10. Accessibility

| Requirement | Rule |
|---|---|
| Programmatic association | Every label must be associated with its control using `for` on the `<label>` matching `id` on the control. Do not use proximity, visual placement, or `aria-label` alone as a substitute. |
| Visible text | Label text must always be visible. Do not hide a label with `display: none`, `visibility: hidden`, or `opacity: 0` — these remove it from the accessibility tree. |
| Required indicator semantics | The asterisk (`*`) must carry `aria-hidden="true"`. A visually hidden text node reading `"Required"` must accompany it so screen readers announce the requirement without reading a bare symbol. |
| Do not use placeholder as label | Placeholder text is not a label. It disappears on input, is not consistently announced by screen readers, and fails WCAG SC 3.3.2 (Labels or Instructions). A visible `<label>` is always required. |
| Fieldset and legend for groups | When labelling a group of related controls (radio group, checkbox group), use `<fieldset>` with `<legend>`. A `<label>` element applies to one control only. |
| Error association | Error messages are not part of the label. They are separate elements associated with the control via `aria-describedby`. The label names the control; the error message describes the problem. |
| Disabled controls | A disabled control must still have a visible, associated label. The label color shifts to `color.text.disabled` but the label text remains present and readable. |
| Color contrast | Label text against the page background must meet WCAG 2.1 AA: 4.5:1 minimum. `color.text.primary` on `color.background.surface` satisfies this. `color.text.disabled` intentionally falls below this threshold — it signals non-interactivity, not a contrast failure in this controlled context. |
| WCAG criteria | Applies SC 1.3.1 (Info and Relationships), SC 1.4.3 (Contrast Minimum), SC 2.4.6 (Headings and Labels), SC 3.3.2 (Labels or Instructions). |

---

## 11. Content Guidelines

| Rule | Detail |
|---|---|
| Use noun phrases, not questions | "Email address" is correct. "What is your email?" is not. Labels name the field; they do not ask questions. |
| Sentence case only | "First name" is correct. "First Name" and "FIRST NAME" are not. |
| Keep labels short | One to four words. If more context is needed, use helper text below the field, not a longer label. |
| No punctuation at the end | Do not add a colon, period, or question mark after the label text. The visual layout communicates the relationship between label and field. |
| Be specific | "Phone number" is better than "Number". "Company name" is better than "Name" when adjacent to a "Full name" field. |
| Avoid abbreviations | Write out full words unless the abbreviation is universally understood in the product's context (e.g., "URL", "ID"). |
| Do not use the required asterisk as the only signal | Always include an accessible `"Required"` text for screen readers. Consider also using helper text to explain the requirement if the context is not obvious. |
| Match the control's purpose precisely | The label must accurately describe what the control collects or controls. A mismatch between label and field purpose is a content error, not a styling issue. |

---

## 12. Code Example

```html
<!-- Default label associated with an input -->
<div class="form-field">
  <label class="label" for="email">
    Email address
  </label>
  <input id="email" type="email" name="email" />
</div>

<!-- Required label -->
<div class="form-field">
  <label class="label" for="full-name">
    Full name
    <span class="label__required" aria-hidden="true">*</span>
    <span class="visually-hidden">Required</span>
  </label>
  <input id="full-name" type="text" name="full-name" required />
</div>

<!-- Error state — class applied by form-field container -->
<div class="form-field is-error">
  <label class="label" for="username">
    Username
    <span class="label__required" aria-hidden="true">*</span>
    <span class="visually-hidden">Required</span>
  </label>
  <input id="username" type="text" name="username" required
         aria-describedby="username-error" aria-invalid="true" />
  <span id="username-error" class="field-error">
    Username is already taken. Choose a different one.
  </span>
</div>

<!-- Disabled state — class applied by form-field container -->
<div class="form-field is-disabled">
  <label class="label" for="account-id">
    Account ID
  </label>
  <input id="account-id" type="text" name="account-id" disabled />
</div>
```

```css
/* Base label */
.label {
  display: inline-flex;
  align-items: baseline;
  gap: var(--spacing-xs);
  color: var(--color-text-primary);
  font-size: var(--text-body-size);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  cursor: default;
  transition: color var(--motion-fast);
}

/* Required indicator */
.label__required {
  color: var(--color-text-danger);
  font-weight: var(--font-weight-medium);
}

/* Focused — applied via :focus-within on the form-field container */
.form-field:focus-within .label {
  color: var(--color-text-brand);
}

/* Error — applied via .is-error on the form-field container */
.form-field.is-error .label {
  color: var(--color-text-danger);
}

.form-field.is-error .label__required {
  color: var(--color-text-danger);
}

/* Disabled — applied via .is-disabled on the form-field container */
.form-field.is-disabled .label {
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.form-field.is-disabled .label__required {
  color: var(--color-text-disabled);
}

/* Size contexts */
.form-field--sm .label  { font-size: var(--text-body-sm-size); }
.form-field--lg .label  { font-size: var(--text-body-lg-size); }

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

## 13. Cross References

- [input.md](./input.md) — Primary control that a label identifies; label is a required part of every input
- [checkbox.md](./checkbox.md) — Label is associated with each checkbox control and toggles it on click
- [radio.md](./radio.md) — Label is associated with each radio control and selects it on click
- [switch.md](./switch.md) — Label is associated with the switch control and toggles it on click
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all values used by this component
