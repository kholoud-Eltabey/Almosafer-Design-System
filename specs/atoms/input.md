---
name: Input
tier: atom
status: stable
last-updated: 2026-05-11
maintainer: Team 4
source: Almosafer Design System
---

# Input

---

## 1. Overview

An input field is a single-line text control. It collects short, free-form data from the user. It is the foundational data entry element in forms, filters, and search interfaces.

Inputs carry a label, an editable field, and optional supporting elements: helper text, error messages, and icons. Every element has a defined role. None are decorative.

---

## 2. When to Use

| Context | Description |
|---|---|
| Short free-form text | Names, email addresses, usernames, URLs, numeric values. |
| Form fields | Any form that collects structured data from the user. |
| Search | Keyword-based filtering or content discovery. |
| Inline filters | Narrowing visible data within a table, list, or panel. |
| Editable settings | Single-value configuration fields in settings panels. |

---

## 3. When Not to Use

| Context | Use instead |
|---|---|
| Multi-line content | Use a textarea. Input fields truncate long text. |
| Selection from a defined list | Use a dropdown or radio group. Do not simulate selection with a text input. |
| Date or time entry | Use a date picker. Free-form date text introduces format errors. |
| Triggering an action | Use a button. An input does not submit or confirm. |
| Rich or formatted text | Use a rich text editor. |

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | The outer boundary of the input component. Carries spacing, border, radius, and background tokens. Defines the touch target. |
| Label | Yes | Text that identifies what the field collects. Always visible. Never replaced by placeholder text. Positioned above the field. |
| Input field | Yes | The editable text area. Receives keyboard input, paste, and selection. |
| Placeholder text | No | Hint text shown inside the field when empty. Disappears on focus or entry. Does not substitute for a label. |
| Helper text | No | Supporting instruction below the field. Visible at all times unless replaced by an error message. |
| Error message | No | Validation feedback. Replaces helper text when validation fails. Must describe the problem and the fix. |
| Leading icon | No | An icon at the start of the field. Communicates input type (search, email, URL). |
| Trailing icon | No | An icon at the end of the field. Used for clear actions, password visibility toggles, or status indicators. |

---

## 5. Tokens Used

| Token | Role |
|---|---|
| `color.background.surface` | Default input background |
| `color.background.subtle` | Filled variant background |
| `color.background.disabled` | Disabled state background |
| `color.text.primary` | Entered text color |
| `color.text.subtle` | Placeholder text color |
| `color.text.disabled` | Text color in disabled state |
| `color.text.danger` | Error message text |
| `color.text.success` | Success message text |
| `color.text.secondary` | Helper text color |
| `color.border.default` | Default field border |
| `color.border.focus` | Focus ring and focused border |
| `color.border.disabled` | Disabled state border |
| `color.border.danger` | Error state border |
| `color.border.selected` | Success state border |
| `color.background.danger` | Error state background tint |
| `color.background.success` | Success state background tint |
| `spacing.xs` | Vertical padding for small size |
| `spacing.sm` | Vertical padding for medium; horizontal padding all sizes |
| `spacing.md` | Horizontal padding for large size |
| `text.body.sm` | Font size for small input |
| `text.body.md` | Font size for medium input |
| `text.body.lg` | Font size for large input |
| `text.caption` | Font size for helper and error text |
| `font.weight.regular` | Input text weight |
| `font.weight.medium` | Label weight |
| `line-height-normal` | Input and label line height |
| `radius.lg` | Input field corner radius |
| `border.width.default` | Default field border width |
| `border.width.focus` | Focus ring border width |
| `border.width.error` | Error state border width |
| `motion.fast` | Border and background state transitions |

---

## 6. Variants

### Default

The standard input with a visible border on a surface background. Used in all standard form contexts.

| Property | Token |
|---|---|
| Background | `color.background.surface` |
| Border | `color.border.default` |
| Text | `color.text.primary` |

---

### Filled

A borderless input on a subtle background. Used in dense or embedded contexts where border lines add visual noise.

| Property | Token |
|---|---|
| Background | `color.background.subtle` |
| Border | None (transparent) |
| Text | `color.text.primary` |

Restriction: Do not mix default and filled inputs in the same form.

---

### Error

Validation failed. The field value does not meet requirements. An error message is required.

| Property | Token |
|---|---|
| Background | `color.background.danger` |
| Border | `color.border.danger` |
| Error text | `color.text.danger` |

Rule: Error state must never appear before the user has interacted with the field.

---

### Success

Validation passed. The field value is confirmed correct. Use when real-time validation provides meaningful feedback (e.g., username availability, coupon code).

| Property | Token |
|---|---|
| Background | `color.background.success` |
| Border | `color.border.selected` |
| Success text | `color.text.success` |

Rule: Do not apply success state to every field on form submit. Reserve for fields where inline confirmation adds value.

---

### Disabled

The field is not editable. No interaction is possible.

| Property | Token |
|---|---|
| Background | `color.background.disabled` |
| Border | `color.border.disabled` |
| Text | `color.text.disabled` |

Rule: Disabled inputs must be removed from tab order. Do not use `aria-disabled` alone — use the native `disabled` attribute.

---

## 7. Sizes

| Size | Use case | Vertical padding | Horizontal padding | Font size token |
|---|---|---|---|---|
| Small | Compact contexts. Inline filters, table cells, dense toolbars. | `spacing.xs` | `spacing.sm` | `text.body.sm` |
| Medium | Default. Standard forms, settings panels, search fields. | `spacing.sm` | `spacing.sm` | `text.body.md` |
| Large | High-emphasis entry. Prominent search fields, onboarding forms, standalone inputs. | `spacing.sm` | `spacing.md` | `text.body.lg` |

All sizes use `radius.lg`, `font.weight.regular` for input text, and `line-height-normal`.

---

## 8. States

| State | Background | Border | Text | Transition |
|---|---|---|---|---|
| Default | `color.background.surface` | `color.border.default` | `color.text.primary` | — |
| Hover | `color.background.subtle` | `color.border.default` | `color.text.primary` | `motion.fast` on background |
| Focused | `color.background.surface` | `color.border.focus` / `border.width.focus` | `color.text.primary` | `motion.fast` on border |
| Disabled | `color.background.disabled` | `color.border.disabled` | `color.text.disabled` | None |
| Error | `color.background.danger` | `color.border.danger` | `color.text.primary` | `motion.fast` on border, background |
| Success | `color.background.success` | `color.border.selected` | `color.text.primary` | `motion.fast` on border, background |

**Rules:**

- Hover state must be subtle. Do not use a background that competes with the focus state.
- Focus ring uses `color.border.focus` at 2px width. Never suppress focus outline without a visual replacement.
- Error and success states take priority over hover and focus backgrounds. Border color follows the validation state, not the interaction state.
- Disabled fields must not respond to hover.

---

## 9. Behavior

- The field accepts keyboard input, paste, cut, and text selection.
- Placeholder text disappears on focus or when any character is entered. It does not return on blur unless the field is cleared.
- Error state is triggered by validation — on blur, on submit, or on real-time validation. It must never appear before the user has touched the field.
- Error message replaces helper text when validation fails. Helper text returns when the error is resolved.
- Disabled state prevents all interaction: typing, focusing, and clicking. It does not fire events.
- Trailing icon actions (clear, toggle visibility) are independent interactive targets with their own accessible labels. They do not submit or modify the form.
- Leading icons are decorative by default. They communicate input type but do not trigger actions.
- The field width is set by its container. Inputs do not self-size to content.

---

## 10. Accessibility

| Requirement | Rule |
|---|---|
| Label association | Every input must have a visible label associated via `for`/`id` or `aria-labelledby`. Placeholder text is not a label. |
| Keyboard access | Inputs must be focusable via `Tab`. All trailing icon actions must be separately keyboard accessible. |
| Focus indicator | A visible focus ring using `color.border.focus` is required. `outline: none` is not permitted without a CSS replacement. |
| Error messages | Error text must be programmatically associated using `aria-describedby`. Screen readers must announce the error when it appears. |
| Placeholder contrast | Placeholder text using `color.text.subtle` must meet WCAG 2.1 AA contrast against `color.background.surface`. |
| Disabled state | Use native `disabled` attribute. Remove the field from tab order. |
| Touch target | Minimum 44×44px touch target applies to the input field and to all icon controls within it. |
| Required fields | Mark required fields with `aria-required="true"`. Do not rely on asterisks alone — include "required" in the label or helper text for screen reader users. |
| Autocomplete | Use the `autocomplete` attribute where applicable to support browser and assistive technology completion. |
| RTL / LTR | In RTL layouts, leading icons appear at the inline end and trailing icons at the inline start. All directional spacing must use logical CSS properties (`padding-inline-start`, `padding-inline-end`). The field supports both `dir="ltr"` and `dir="rtl"` — text input direction follows the active `dir` attribute without layout shifts. |
| WCAG criteria | Applies SC 1.3.1 (Info and Relationships), SC 1.4.3 (Contrast Minimum), SC 2.1.1 (Keyboard), SC 2.4.7 (Focus Visible), SC 3.3.1 (Error Identification), SC 3.3.2 (Labels or Instructions), SC 4.1.2 (Name, Role, Value). |

---

## 11. Content Guidelines

| Rule | Detail |
|---|---|
| Labels must be specific | "Email address" is correct. "Input" or "Field" is not. |
| Placeholder is supplemental | Use placeholder to show format or example values: "e.g. name@company.com". Never use it as the only instruction. |
| Helper text adds context | Use helper text for format rules, character limits, or constraints: "Must be at least 8 characters." |
| Error messages name the problem and the fix | "Email address is required." or "Password must be at least 8 characters." Not "Invalid input." |
| Keep helper and error text short | One sentence maximum. Concise messages are read. Long messages are skipped. |
| Do not duplicate label and placeholder | If the label already says "Email address", the placeholder should not repeat it. |
| Required markers | Append "(required)" in the label or use `aria-required`. Do not rely on a red asterisk alone. |

---

## 12. Code Example

```css
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.input-label {
  font-size: var(--text-body-size);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
}

.input-field {
  display: block;
  width: 100%;
  padding: var(--spacing-sm);
  background: var(--color-background-surface);
  color: var(--color-text-primary);
  border-width: var(--border-width-default);
  border-style: solid;
  border-color: var(--color-border-default);
  border-radius: var(--radius-lg);
  font-size: var(--text-body-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  transition: border-color var(--motion-fast), background var(--motion-fast);
}

.input-field::placeholder {
  color: var(--color-text-subtle);
}

.input-field:hover {
  background: var(--color-background-subtle);
}

.input-field:focus-visible {
  outline-width: var(--border-width-focus);
  outline-style: solid;
  outline-color: var(--color-border-focus);
  outline-offset: 2px;
  border-color: var(--color-border-focus);
  border-width: var(--border-width-focus);
}

.input-field:disabled {
  background: var(--color-background-disabled);
  color: var(--color-text-disabled);
  border-color: var(--color-border-disabled);
  cursor: not-allowed;
}

.input-field--error {
  background: var(--color-background-danger);
  border-color: var(--color-border-danger);
  border-width: var(--border-width-error);
}

.input-helper {
  font-size: var(--text-caption-size);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

.input-error {
  font-size: var(--text-caption-size);
  color: var(--color-text-danger);
  line-height: var(--line-height-normal);
}
```

---

## 13. Do / Don't

### ✓ Correct

```
✓  Visible label above the field at all times
✓  Placeholder: "e.g. name@company.com"
✓  Helper text: "Must be at least 8 characters"
✓  Error message: "Password must be at least 8 characters"
✓  aria-describedby linking field to error message
✓  Distinct hover, focus, and error visual states
✓  type="email" for email fields, type="password" for passwords
```

```css
/* ✓ Token-driven */
border-color: var(--color-border-focus);
background: var(--color-background-danger);
color: var(--color-text-danger);
```

---

### ✗ Incorrect

```
✗  No label — placeholder only: "Enter your email"
✗  Generic error: "Invalid input" or "Error"
✗  Error shown on page load before user interaction
✗  Focus ring suppressed with outline: none
✗  Disabled input still in tab order
✗  Placeholder text repeating the label verbatim
✗  Using input for multi-line text entry
```

```css
/* ✗ Raw values — not permitted */
✗  border-color: #E2483D;
✗  background: #FFECEB;
✗  padding: 8px 12px;
✗  border-radius: 6px;
✗  font-size: 14px;
```

---

## 14. Cross References

- [token-reference.md](../tokens/token-reference.md) — All tokens used by this component
- [color.md](../foundations/color.md) — Color primitive scale
- [spacing.md](../foundations/spacing.md) — Spacing primitive scale
- [typography.md](../foundations/typography.md) — Font size, weight, and line height primitives
- [radius.md](../foundations/radius.md) — Border radius primitive scale
- [motion.md](../foundations/motion.md) — Duration and easing primitives
- [button.md](button.md) — Button is the primary submit action paired with input in form contexts
