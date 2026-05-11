---
name: Radio
tier: atom
status: stable
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Radio

---

## 1. Overview

A radio button is a single-selection control. It allows a user to choose exactly one option from a defined group. Selecting one radio button deselects all others in the same group.

Radio buttons always appear in groups of two or more. A solitary radio button is not a valid use. The group presents mutually exclusive choices — only one can be true at a time.

On Almosafer, radio buttons appear in checkout flows (shipping method, payment type), filter panels (sort order, condition), and settings surfaces (notification frequency, language preference). In all contexts, clarity and selection confidence are the primary requirements.

---

## 2. When to Use

| Context | Description |
|---|---|
| Mutually exclusive options | When only one choice from a list is valid at a time. Shipping method, payment type, sort order. |
| Visible choices | When the user benefits from seeing all options simultaneously before selecting. |
| Short option lists | Groups of two to six options. Longer lists should use a dropdown select instead. |
| Required selection | When a default must be pre-selected and the user must confirm or change it. |
| Filter and sort controls | Narrowing results by a single dimension: price order, rating, condition. |

---

## 3. When Not to Use

| Context | Use instead |
|---|---|
| Multiple selections are allowed | Use a checkbox group. Radio enforces single selection. |
| Immediate on/off system effect | Use a switch. Radio sets a value — it does not trigger an action. |
| More than six options | Use a dropdown select. Long radio lists are difficult to scan. |
| A single standalone toggle | Use a checkbox. A lone radio button has no group to deselect against. |
| Triggering an action on selection | Use a button. Radio communicates state, not action. |

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | The outer interactive boundary for the full radio row. Defines the touch target. Houses the control and label in a horizontal row. Handles hover and active states for the full row. |
| Radio control | Yes | The circular visual element. Carries border, background, and radius tokens. Reflects checked, unchecked, hover, focus, and disabled states. |
| Selected indicator | Conditional | A filled circle rendered inside the control when the option is checked. Uses the inverse text token for contrast against the checked background. Hidden when unchecked. |
| Label | Yes | Text describing the option. Clicking the label selects the option. Positioned to the right of the control. Always visible — never replaced by placeholder or tooltip. |
| Helper text | No | Supporting context below the label. Provides format hints or constraints when the label alone is insufficient. |
| Error message | No | Validation feedback displayed below the group when a required selection was not made. Must describe the problem and the required action. Associated with the group, not individual controls. |

---

## 5. Tokens Used

| Token | Role |
|---|---|
| `color.background.surface` | Unchecked control background |
| `color.background.primary` | Checked control background |
| `color.background.subtle` | Hover state background on control and row |
| `color.background.disabled` | Disabled control background |
| `color.background.danger` | Error state control background tint |
| `color.text.inverse` | Selected indicator dot color |
| `color.text.primary` | Label text color |
| `color.text.secondary` | Helper text color |
| `color.text.disabled` | Label and helper text in disabled state |
| `color.text.danger` | Error message text color |
| `color.border.default` | Unchecked control border |
| `color.border.focus` | Focus ring |
| `color.border.disabled` | Disabled control border |
| `color.border.danger` | Error state control border |
| `color.border.selected` | Active/pressed state border |
| `spacing.xs` | Gap between control and label; row gap within a group |
| `spacing.sm` | Vertical gap between radio items in a stacked group |
| `text.body.md` | Label font size |
| `text.caption` | Helper and error text font size |
| `font.weight.regular` | Label font weight |
| `line-height-normal` | Label and helper line height |
| `radius.full` | Control shape — always circular |
| `border.width.default` | Control border width (unchecked and disabled states) |
| `border.width.focus` | Focus ring width |
| `motion.fast` | Background and border state transitions |

---

## 6. Variants

### Default

The standard radio button for all form and filter contexts.

| Property | Token |
|---|---|
| Unchecked background | `color.background.surface` |
| Unchecked border | `color.border.default` |
| Checked background | `color.background.primary` |
| Selected indicator | `color.text.inverse` |
| Label | `color.text.primary` |

---

### Error

Required group with no selection made. Applied at the group level, not to individual controls.

| Property | Token |
|---|---|
| Control background | `color.background.danger` |
| Control border | `color.border.danger` |
| Error text | `color.text.danger` |
| Label | `color.text.primary` |

Rule: Error state must not appear before the user has interacted with the group or attempted to submit.

---

### Disabled

The control and its label are not interactive. Current state is read-only.

| Property | Token |
|---|---|
| Control background | `color.background.disabled` |
| Control border | `color.border.disabled` |
| Label | `color.text.disabled` |
| Helper text | `color.text.disabled` |

Rule: Use native `disabled` attribute. Remove from tab order. Do not use `aria-disabled` alone.

---

## 7. Sizes

| Size | Use case | Control size reference | Font size token |
|---|---|---|---|
| Small | Compact filter panels, dense settings lists, inline option groups. | Scaled via `spacing.xs` | `text.body.sm` |
| Medium | Default. Standard forms, checkout flows, preference settings. | Scaled via `spacing.sm` | `text.body.md` |
| Large | High-emphasis selection. Prominent checkout options, onboarding choices. | Scaled via `spacing.md` | `text.body.lg` |

All sizes use `radius.full` for the circular control and `font.weight.regular` for the label.

---

## 8. States

| State | Control background | Border | Indicator | Label |
|---|---|---|---|---|
| Unchecked — default | `color.background.surface` | `color.border.default` | Hidden | `color.text.primary` |
| Unchecked — hover | `color.background.subtle` | `color.border.default` | Hidden | `color.text.primary` |
| Unchecked — focus | `color.background.surface` | `color.border.focus` / `border.width.focus` | Hidden | `color.text.primary` |
| Checked — default | `color.background.primary` | Transparent | `color.text.inverse` | `color.text.primary` |
| Checked — hover | `color.background.selected` | Transparent | `color.text.inverse` | `color.text.primary` |
| Checked — focus | `color.background.primary` | `color.border.focus` / `border.width.focus` | `color.text.inverse` | `color.text.primary` |
| Active / Pressed | `color.background.selected` | `color.border.selected` | State-dependent | `color.text.primary` |
| Error — unchecked | `color.background.danger` | `color.border.danger` | Hidden | `color.text.primary` |
| Disabled — unchecked | `color.background.disabled` | `color.border.disabled` | Hidden | `color.text.disabled` |
| Disabled — checked | `color.background.disabled` | `color.border.disabled` | `color.text.disabled` | `color.text.disabled` |

**Rules:**

- All transitions use `motion.fast` on background and border-color.
- Focus ring applies on the control element only — not the full row.
- `outline: none` is not permitted without a CSS focus replacement.
- Hover state applies to the full container row, not the control alone.
- Active/pressed state must be visually distinct from both hover and checked states.

---

## 9. Behavior

- Clicking a radio button or its label selects that option and deselects all others in the group.
- Only one radio button in a group can be checked at any time. This is enforced by grouping all controls under the same `name` attribute.
- `Arrow keys` (Up, Down, Left, Right) move focus and selection between options in the group. There is no need to press `Space` or `Enter` to confirm — arrow key movement selects immediately.
- `Tab` moves focus to the first or currently selected item in the group, then exits the group on the next `Tab` press. The group behaves as a single tab stop.
- A default selection should be pre-selected when one option is the recommended or most common choice. Do not leave all options unchecked when a sensible default exists.
- Disabled individual options remain visible but are not selectable. They do not affect the selection state of other options.
- The group does not submit a value until a selection is made (if no default is pre-selected). Require at least one selection before allowing form submission if the field is mandatory.
- In RTL layouts, the control appears on the right and the label on the left. Use logical CSS properties for spacing — do not hardcode directional margin or padding.

---

## 10. Accessibility

| Requirement | Rule |
|---|---|
| ARIA role | Each control uses `role="radio"` (native `<input type="radio">` provides this implicitly). The group uses `role="radiogroup"`. |
| Group labelling | All radio buttons in a group must be wrapped in a `<fieldset>` with a `<legend>`, or a container with `role="radiogroup"` and `aria-labelledby` pointing to a visible group label. |
| Keyboard navigation | `Tab` enters and exits the group as a single stop. `Arrow keys` move selection within the group. `Space` selects the focused option if not already selected. |
| Visible focus | Focus ring using `color.border.focus` at 2px is required on the radio control. Never suppress `outline` without a CSS replacement. |
| Screen reader announcement | When focus moves to a radio button, the reader announces: option label, checked or not checked, position in group (e.g. "Express shipping, 2 of 3"). |
| Error messages | Group-level errors must be associated via `aria-describedby` on the group container. Screen readers must announce the error when it appears. |
| Required groups | Mark required groups with `aria-required="true"` on the `<fieldset>` or `role="radiogroup"` container. |
| Disabled options | Use native `disabled` attribute on each `<input>`. Disabled controls are removed from tab order and arrow-key navigation. |
| Touch target | Minimum 44×44px for the combined control-and-label touch area. Do not reduce `spacing.xs` between control and label in touch contexts. |
| Pre-selected defaults | When a default is pre-selected, `aria-checked="true"` is set on that option at render. Screen readers announce the pre-selected state on first focus. |
| WCAG criteria | Applies SC 1.3.1 (Info and Relationships), SC 1.4.3 (Contrast Minimum), SC 2.1.1 (Keyboard), SC 2.4.7 (Focus Visible), SC 3.3.2 (Labels or Instructions), SC 4.1.2 (Name, Role, Value). |

---

## 11. Content Guidelines

| Rule | Detail |
|---|---|
| Labels name the option, not the action | "Standard delivery" is correct. "Choose standard delivery" is not. |
| Labels are parallel in structure | All options in a group follow the same grammatical form. Do not mix nouns and sentences in the same group. |
| Keep labels short | One line per option. If more detail is needed, use helper text below the label — not within it. |
| Group labels name the decision | "Delivery method" is correct. "Options" or "Choose one" is not. |
| Avoid negatives | "Do not notify me" creates ambiguity. Rephrase as "No notifications". |
| Pre-select the most common option | In checkout flows, pre-select the most popular or recommended option to reduce decision friction. |
| Error messages name the group and the fix | "Select a delivery method to continue." Not "Required." or "Error." |
| Helper text is supplemental | Use helper text for price, duration, or constraint context: "Arrives in 3–5 business days". Do not repeat the label. |

---

## 12. Code Example

```css
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.radio-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
}

.radio-row:hover .radio-control {
  background: var(--color-background-subtle);
}

.radio-control {
  appearance: none;
  width: 1em;
  height: 1em;
  background: var(--color-background-surface);
  border-width: var(--border-width-default);
  border-style: solid;
  border-color: var(--color-border-default);
  border-radius: var(--radius-full);
  transition: background var(--motion-fast), border-color var(--motion-fast);
  cursor: pointer;
  flex-shrink: 0;
  display: grid;
  place-content: center;
}

.radio-control::before {
  content: "";
  width: 0.4em;
  height: 0.4em;
  border-radius: var(--radius-full);
  background: var(--color-text-inverse);
  transform: scale(0);
  transition: transform var(--motion-fast);
}

.radio-control:checked {
  background: var(--color-background-primary);
  border-color: transparent;
}

.radio-control:checked::before {
  transform: scale(1);
}

.radio-control:focus-visible {
  outline-width: var(--border-width-focus);
  outline-style: solid;
  outline-color: var(--color-border-focus);
  outline-offset: 2px;
}

.radio-control:disabled {
  background: var(--color-background-disabled);
  border-color: var(--color-border-disabled);
  cursor: not-allowed;
}

.radio-label {
  font-size: var(--text-body-size);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
}

.radio-label--disabled {
  color: var(--color-text-disabled);
}

.radio-helper {
  font-size: var(--text-caption-size);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

.radio-error {
  font-size: var(--text-caption-size);
  color: var(--color-text-danger);
  line-height: var(--line-height-normal);
}

.radio-control--error {
  background: var(--color-background-danger);
  border-color: var(--color-border-danger);
}
```

---

## 13. Do / Don't

### ✓ Correct

```
✓  Always use radio in a group of two or more options
✓  Wrap group in <fieldset> with a <legend>
✓  Pre-select the most common option in checkout flows
✓  Arrow keys move selection within the group
✓  Error message: "Select a delivery method to continue"
✓  Labels are parallel: "Standard", "Express", "Next day"
✓  Helper text: "Arrives in 3–5 business days"
✓  Touch area covers both the control and the label
```

```css
/* ✓ Token-driven */
background: var(--color-background-primary);
border-color: var(--color-border-focus);
color: var(--color-text-primary);
transition: background var(--motion-fast);
border-radius: var(--radius-full);
```

---

### ✗ Incorrect

```
✗  A single radio button used alone
✗  Using radio for multi-selection — use checkbox
✗  Using radio for an instant on/off toggle — use switch
✗  No <fieldset> and <legend> on the group
✗  Mixed label structures: "Standard delivery" and "Choose express for faster shipping"
✗  Error state on individual unchecked options — apply to group only
✗  Suppressing focus ring with outline: none
✗  Hardcoding directional margin: margin-left instead of margin-inline-start
```

```css
/* ✗ Raw values — not permitted */
✗  background: #1D55D6;
✗  border: 1px solid #DCDFE4;
✗  border-radius: 9999px;
✗  transition: background 100ms ease;
✗  gap: 8px;
```

---

## 14. Cross References

- [token-reference.md](../tokens/token-reference.md) — All tokens used by this component
- [color.md](../foundations/color.md) — Color primitive scale
- [spacing.md](../foundations/spacing.md) — Spacing primitive scale
- [radius.md](../foundations/radius.md) — Border radius primitive scale
- [motion.md](../foundations/motion.md) — Duration and easing primitives
- [checkbox.md](checkbox.md) — Use checkbox when multiple selections are permitted
- [input.md](input.md) — Input is the primary sibling control in form and checkout contexts
