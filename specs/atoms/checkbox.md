---
name: Checkbox
tier: atom
status: stable
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Checkbox

---

## 1. Overview

A checkbox is a binary selection control. It allows a user to select one or more independent options from a list. Each checkbox operates independently — selecting one does not affect others in the group.

Checkboxes communicate persistent state. A checked checkbox means the option is active. An unchecked checkbox means it is not. The indeterminate state signals partial selection within a nested or grouped set.

---

## 2. When to Use

| Context | Description |
|---|---|
| Multiple selections | When the user may select any number of options from a list simultaneously. |
| Optional choices | Settings, preferences, and feature flags where all options are off by default. |
| Agreement and consent | Accepting terms, confirming understanding, or opting into a program. |
| Bulk selection | Selecting multiple items in a table or list for batch actions. |
| Nested selection | Parent checkbox controls a group; indeterminate state reflects partial child selection. |

---

## 3. When Not to Use

| Context | Use instead |
|---|---|
| Only one option may be selected at a time | Use a radio group. Checkboxes imply multi-selection is permitted. |
| Immediate action on toggle | Use a button or a switch. Checkboxes set state — they do not trigger actions. |
| Binary setting with instant system effect | Use a switch. A switch communicates an immediate on/off consequence. |
| Single required confirmation | Use a button labeled with the action. A solitary checkbox for confirmation creates ambiguity. |

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | The outer interactive boundary. Defines the touch target and houses the control and label in a row. |
| Checkbox control | Yes | The visual box. Carries border, background, and radius tokens. Changes appearance per state. |
| Checkmark indicator | Conditional | The mark rendered inside the control when checked. Uses the inverse text token for contrast. Hidden when unchecked. Replaced by a dash indicator when indeterminate. |
| Label | Yes | Text describing the option. Clicking the label toggles the checkbox state. Positioned to the right of the control. |
| Helper text | No | Supporting context below the label. Provides additional instruction when the label alone is insufficient. |
| Error message | No | Validation feedback below the control group. Appears when a required checkbox group has no selection. Must describe the problem and the required action. |

---

## 5. Tokens Used

| Token | Role |
|---|---|
| `color.background.surface` | Unchecked control background |
| `color.background.primary` | Checked and indeterminate control background |
| `color.background.disabled` | Disabled control background |
| `color.background.subtle` | Hover state background on control |
| `color.border.default` | Unchecked control border |
| `color.border.focus` | Focus ring |
| `color.border.disabled` | Disabled control border |
| `color.border.danger` | Error state control border |
| `color.background.danger` | Error state control background tint |
| `color.text.inverse` | Checkmark and indeterminate indicator color |
| `color.text.primary` | Label text color |
| `color.text.secondary` | Helper text color |
| `color.text.disabled` | Label and helper text in disabled state |
| `color.text.danger` | Error message text |
| `spacing.xs` | Gap between control and label; internal group row gap |
| `spacing.sm` | Spacing between stacked checkbox items in a group |
| `text.body.md` | Label font size |
| `text.caption` | Helper and error text font size |
| `font.weight.regular` | Label font weight |
| `line-height-normal` | Label and helper line height |
| `radius.sm` | Control corner radius |
| `border.width.default` | Control border width (unchecked and disabled states) |
| `border.width.focus` | Focus ring width |
| `motion.fast` | Background and border transitions |

---

## 6. Variants

### Default

The standard checkbox for use in all form contexts.

| Property | Token |
|---|---|
| Unchecked background | `color.background.surface` |
| Unchecked border | `color.border.default` |
| Checked background | `color.background.primary` |
| Checkmark | `color.text.inverse` |
| Label | `color.text.primary` |

---

### Error

Validation failed. Required selection was not made in the group.

| Property | Token |
|---|---|
| Control background | `color.background.danger` |
| Control border | `color.border.danger` |
| Error text | `color.text.danger` |
| Label | `color.text.primary` |

Rule: Apply error state at the group level when validation requires at least one selection. Do not apply error state to individual unchecked checkboxes within a valid optional group.

---

### Disabled

The checkbox is not interactive. Its current state is read-only.

| Property | Token |
|---|---|
| Control background | `color.background.disabled` |
| Control border | `color.border.disabled` |
| Label | `color.text.disabled` |
| Helper text | `color.text.disabled` |

Rule: Use native `disabled` attribute. Remove from tab order. Do not use `aria-disabled` alone.

---

## 7. States

| State | Control background | Border | Checkmark | Label |
|---|---|---|---|---|
| Unchecked — default | `color.background.surface` | `color.border.default` | Hidden | `color.text.primary` |
| Unchecked — hover | `color.background.subtle` | `color.border.default` | Hidden | `color.text.primary` |
| Unchecked — focus | `color.background.surface` | `color.border.focus` / `border.width.focus` | Hidden | `color.text.primary` |
| Checked — default | `color.background.primary` | Transparent | `color.text.inverse` | `color.text.primary` |
| Checked — hover | `color.background.selected` | Transparent | `color.text.inverse` | `color.text.primary` |
| Checked — focus | `color.background.primary` | `color.border.focus` / `border.width.focus` | `color.text.inverse` | `color.text.primary` |
| Indeterminate | `color.background.primary` | Transparent | Dash — `color.text.inverse` | `color.text.primary` |
| Indeterminate — focus | `color.background.primary` | `color.border.focus` / `border.width.focus` | Dash — `color.text.inverse` | `color.text.primary` |
| Active / Pressed | `color.background.selected` | `color.border.selected` | State-dependent | `color.text.primary` |
| Disabled — unchecked | `color.background.disabled` | `color.border.disabled` | Hidden | `color.text.disabled` |
| Disabled — checked | `color.background.disabled` | `color.border.disabled` | `color.text.disabled` | `color.text.disabled` |

**Rules:**

- All transitions use `motion.fast` on background and border.
- Focus ring must always be visible. `outline: none` is not permitted without a CSS replacement.
- Indeterminate state must be set via JavaScript (`indeterminate = true`). It cannot be set via HTML alone.
- Active/pressed state must be visually distinct from both hover and checked states.

---

## 8. Behavior

- Clicking the control or label toggles between unchecked and checked.
- Checkboxes in a group operate independently. Selecting one does not affect others.
- Indeterminate state is used when a parent checkbox represents a group where some — but not all — children are checked. It is a display state only. Clicking an indeterminate checkbox resolves to checked or unchecked depending on implementation.
- Disabled checkboxes do not respond to click, hover, or keyboard events.
- When used for bulk selection in a table, the parent checkbox becomes indeterminate when a subset of rows is selected, and checked when all rows are selected.
- Label click area extends to the full row, not the control alone. The touch target includes both the control and the label.
- In RTL layouts, the control appears on the right and the label on the left. Use logical CSS properties (`margin-inline-start`, `padding-inline-start`) for all directional spacing. Do not hardcode `margin-left` or `padding-left`.

---

## 9. Accessibility

| Requirement | Rule |
|---|---|
| Label association | Every checkbox must have a visible label associated via `for`/`id`, wrapping `<label>`, or `aria-labelledby`. |
| Keyboard navigation | `Tab` moves focus to the checkbox. `Space` toggles checked state. No other key is required. |
| Focus indicator | A visible focus ring using `color.border.focus` at 2px is required on all states. Never suppress focus outline without a CSS replacement. |
| Indeterminate announcement | Set `aria-checked="mixed"` when the checkbox is in indeterminate state. Screen readers must announce "mixed" or equivalent. |
| Group labelling | A set of related checkboxes must be wrapped in a `<fieldset>` with a `<legend>`. The legend names the group. |
| Error messages | Validation errors must be associated with the group via `aria-describedby`. Screen readers must announce the error when it appears. |
| Touch target | Minimum 44×44px for the combined control-and-label touch area. Do not reduce spacing below `spacing.xs` between the control and label. |
| Required groups | Mark required groups with `aria-required="true"` on the `<fieldset>` or group container. |
| Disabled state | Use native `disabled` attribute on each `<input type="checkbox">`. Remove from tab order. |
| WCAG criteria | Applies SC 1.3.1 (Info and Relationships), SC 1.4.3 (Contrast Minimum), SC 2.1.1 (Keyboard), SC 2.4.7 (Focus Visible), SC 3.3.1 (Error Identification), SC 3.3.2 (Labels or Instructions), SC 4.1.2 (Name, Role, Value). |

---

## 10. Content Guidelines

| Rule | Detail |
|---|---|
| Labels must be specific | "Send me product updates" is correct. "Option 1" is not. |
| Labels describe the checked state | The label reads as true when checked: "Enable notifications" means notifications are on when checked. |
| Avoid negatives | "Do not send me emails" creates double-negative confusion when unchecked. Rephrase as "Send me emails". |
| Group labels must name the group | "Notification preferences" as a group label is correct. Leaving the group unlabelled is not. |
| Helper text adds non-obvious context | Use helper text only when the label alone is insufficient. "You can change this later in settings" is appropriate. Do not repeat the label in helper text. |
| Error messages must be actionable | "Select at least one option to continue." Not "Error." or "Required." |
| Keep labels short | One line maximum per checkbox label. If more explanation is needed, use helper text below the label — not within it. |

---

## 11. Code Example

```css
.checkbox-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
}

.checkbox-control {
  appearance: none;
  width: 1em;
  height: 1em;
  background: var(--color-background-surface);
  border-width: var(--border-width-default);
  border-style: solid;
  border-color: var(--color-border-default);
  border-radius: var(--radius-sm);
  transition: background var(--motion-fast), border-color var(--motion-fast);
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox-control:hover {
  background: var(--color-background-subtle);
}

.checkbox-control:checked {
  background: var(--color-background-primary);
  border-color: transparent;
}

.checkbox-control:focus-visible {
  outline-width: var(--border-width-focus);
  outline-style: solid;
  outline-color: var(--color-border-focus);
  outline-offset: 2px;
}

.checkbox-control:disabled {
  background: var(--color-background-disabled);
  border-color: var(--color-border-disabled);
  cursor: not-allowed;
}

.checkbox-label {
  font-size: var(--text-body-size);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
}

.checkbox-label--disabled {
  color: var(--color-text-disabled);
}

.checkbox-helper {
  font-size: var(--text-caption-size);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

.checkbox-error {
  font-size: var(--text-caption-size);
  color: var(--color-text-danger);
  line-height: var(--line-height-normal);
}

.checkbox-control--error {
  background: var(--color-background-danger);
  border-color: var(--color-border-danger);
}
```

---

## 12. Do / Don't

### ✓ Correct

```
✓  Visible label for every checkbox
✓  Group wrapped in <fieldset> with <legend>
✓  aria-checked="mixed" on indeterminate parent
✓  Space key toggles checked state
✓  Error message: "Select at least one notification type"
✓  Label reads as true when checked: "Enable dark mode"
✓  Touch area covers both control and label
```

```css
/* ✓ Token-driven */
background: var(--color-background-primary);
border-color: var(--color-border-focus);
color: var(--color-text-primary);
transition: background var(--motion-fast);
```

---

### ✗ Incorrect

```
✗  Using a checkbox when only one option can be selected — use radio
✗  No label — control only, no text
✗  Applying error state to each individual unchecked box in an optional group
✗  Indeterminate state without aria-checked="mixed"
✗  Using checkbox to trigger an immediate action — use a button
✗  Group without <fieldset> and <legend>
✗  Suppressing focus ring with outline: none
```

```css
/* ✗ Raw values — not permitted */
✗  background: #1D55D6;
✗  border: 1px solid #DCDFE4;
✗  border-radius: 4px;
✗  transition: background 100ms ease;
✗  color: #091E42;
```

---

## 13. Cross References

- [token-reference.md](../tokens/token-reference.md) — All tokens used by this component
- [color.md](../foundations/color.md) — Color primitive scale
- [spacing.md](../foundations/spacing.md) — Spacing primitive scale
- [radius.md](../foundations/radius.md) — Border radius primitive scale
- [motion.md](../foundations/motion.md) — Duration and easing primitives
- [input.md](input.md) — Input is the primary sibling control in form contexts
- [radio.md](radio.md) — Use radio when only one selection is permitted
