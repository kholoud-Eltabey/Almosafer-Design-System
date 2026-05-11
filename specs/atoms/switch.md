---
name: Switch
tier: atom
status: stable
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Switch

---

## 1. Overview

A switch is a binary control that toggles a setting between on and off. It reflects the current state of a system setting and applies the change immediately — no form submission required.

A switch is not a selection control. It does not choose between options. It activates or deactivates a single, persistent setting. The change takes effect the moment the switch is toggled.

On Almosafer, switches appear in notification preferences, display settings, feature toggles, and account configuration. In all contexts, the state change must be instant, visible, and reversible.

---

## 2. When to Use

| Context | Description |
|---|---|
| Immediate system settings | Enabling or disabling a feature that takes effect without saving: notifications, dark mode, auto-renewal. |
| Binary preferences | A single setting with exactly two states — on or off — that the user controls directly. |
| Independent toggles | Settings that operate independently of other controls on the same surface. |
| Persistent state | Settings that persist across sessions and must clearly reflect their current active state. |

---

## 3. When Not to Use

| Context | Use instead |
|---|---|
| Selection from multiple options | Use a radio group. A switch is not a selector. |
| Agreeing to terms or opting in | Use a checkbox. Consent requires deliberate selection, not an immediate toggle. |
| Any action requiring confirmation | Use a button with a confirmation dialog. Switches are reversible and instant — they must not gate destructive or irreversible operations. |
| Form submission required before taking effect | Use a checkbox. If the change is not immediate, a switch misrepresents the interaction model. |
| Destructive or high-consequence operations | Use a danger button with confirmation. Switches communicate low-stakes, reversible changes. |

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | The outer interactive boundary. Defines the touch target. Houses the track and thumb. Handles hover and active state for the full control. |
| Track | Yes | The elongated pill-shaped background. Changes color between off and on states. Carries background and radius tokens. |
| Thumb | Yes | The circular handle that slides within the track. Moves from start to end on toggle. Carries inverse background and radius tokens. Its position communicates current state. |
| Label | Yes | Text describing the setting being controlled. Positioned adjacent to the track. Clicking the label toggles the switch. Always visible — never replaced by a tooltip or icon alone. |
| Helper text | No | Supporting context below the label. Used for consequences or constraints not clear from the label alone: "Applies to all devices" or "Changes take effect immediately." |

---

## 5. Tokens Used

| Token | Role |
|---|---|
| `color.background.primary` | Track background in on state |
| `color.background.subtle` | Track background in off state |
| `color.background.disabled` | Track background in disabled state |
| `color.background.selected` | Track background on hover (on state) |
| `color.text.inverse` | Thumb color (on all states) |
| `color.text.primary` | Label text color |
| `color.text.secondary` | Helper text color |
| `color.text.disabled` | Label and helper text in disabled state |
| `color.border.default` | Track border in off state |
| `color.border.focus` | Focus ring on the control |
| `color.border.disabled` | Track border in disabled state |
| `spacing.xs` | Gap between track and label |
| `spacing.sm` | Vertical gap between stacked switch items |
| `text.body.md` | Label font size (medium) |
| `text.body.sm` | Label font size (small) |
| `text.caption` | Helper text font size |
| `font.weight.regular` | Label font weight |
| `line-height-normal` | Label and helper line height |
| `radius.full` | Track shape (pill) and thumb shape (circle) |
| `border.width.default` | Track border width (off and disabled states) |
| `border.width.focus` | Focus ring width |
| `motion.fast` | Thumb slide and track color transition |

---

## 6. Variants

### Default

The standard switch for all settings and preference contexts.

| Property | Token |
|---|---|
| Track — off | `color.background.subtle` with `color.border.default` |
| Track — on | `color.background.primary` |
| Thumb | `color.text.inverse` |
| Label | `color.text.primary` |

---

### Disabled

The switch is not interactive. Its current state is read-only and cannot be changed.

| Property | Token |
|---|---|
| Track | `color.background.disabled` |
| Track border | `color.border.disabled` |
| Thumb | `color.text.inverse` |
| Label | `color.text.disabled` |
| Helper text | `color.text.disabled` |

Rule: Use native `disabled` attribute. Remove from tab order. A disabled switch must still communicate its current on/off state visually — do not collapse or hide the thumb position.

---

## 7. Sizes

| Size | Use case | Label font token |
|---|---|---|
| Small | Compact settings lists, dense preference panels, inline configuration rows. | `text.body.sm` |
| Medium | Default. Standard settings surfaces, account preferences, notification controls. | `text.body.md` |

Both sizes use `radius.full` for track and thumb, `font.weight.regular` for the label, and `motion.fast` for the toggle transition.

---

## 8. States

| State | Track background | Track border | Thumb | Label |
|---|---|---|---|---|
| Off — default | `color.background.subtle` | `color.border.default` | `color.text.inverse` | `color.text.primary` |
| Off — hover | `color.background.subtle` | `color.border.strong` | `color.text.inverse` | `color.text.primary` |
| Off — focused | `color.background.subtle` | `color.border.focus` (2px ring) | `color.text.inverse` | `color.text.primary` |
| On — default | `color.background.primary` | Transparent | `color.text.inverse` | `color.text.primary` |
| On — hover | `color.background.selected` | Transparent | `color.text.inverse` | `color.text.primary` |
| On — focused | `color.background.primary` | `color.border.focus` (2px ring) | `color.text.inverse` | `color.text.primary` |
| Active / Pressed | `color.background.selected` | `color.border.selected` | `color.text.inverse` | `color.text.primary` |
| Disabled — off | `color.background.disabled` | `color.border.disabled` | `color.text.inverse` | `color.text.disabled` |
| Disabled — on | `color.background.disabled` | `color.border.disabled` | `color.text.inverse` | `color.text.disabled` |

**Rules:**

- All transitions use `motion.fast` on track background, border-color, and thumb position.
- Thumb slides from start position (off) to end position (on) using `motion.fast`. Position communicates state.
- Focus ring applies to the track element. `outline: none` is not permitted without a CSS replacement.
- Disabled state must not respond to hover. Thumb position in disabled state must still reflect on or off accurately.
- In RTL layouts, the thumb slides from end (off) to start (on). Use logical CSS for positioning — do not hardcode `left` or `right`.

---

## 9. Behavior

- Clicking the track, thumb, or label toggles the switch between on and off immediately.
- The state change takes effect at the moment of toggle. No save, submit, or confirm step is required or implied.
- `Space` or `Enter` toggles the switch when it has keyboard focus.
- The thumb slides from the off position to the on position (and back) using `motion.fast`. The motion must be fast enough to feel instant, not animated.
- In RTL layouts, the thumb position is mirrored: off is at the end (right in LTR, left in RTL), on is at the start. Logical CSS properties must be used for thumb positioning.
- A switch must never be used to trigger a process that takes longer than one motion cycle. If an async operation follows the toggle (e.g., saving a preference), use a loading indicator on the track — do not block the toggle.
- If the toggle produces a consequence the user may not immediately understand, helper text must explain it. The label alone is not sufficient in these cases.

---

## 10. Accessibility

| Requirement | Rule |
|---|---|
| ARIA role | `role="switch"` on the control element. Native `<button role="switch">` or `<input type="checkbox" role="switch">` are both valid. |
| Checked state | `aria-checked="true"` when on, `aria-checked="false"` when off. Must be updated programmatically on toggle. |
| Label association | Every switch must have a visible label associated via `aria-labelledby`, a wrapping `<label>`, or `for`/`id`. |
| Keyboard toggle | `Space` toggles the switch. `Enter` toggles the switch. No other key is required. `Tab` moves focus in and out of the switch. |
| Visible focus | A focus ring using `color.border.focus` at 2px is required. Never suppress focus outline without a CSS replacement. |
| State announcement | When toggled, screen readers announce: label + "on" or "off" (or "checked"/"unchecked" depending on implementation). Both transitions must be announced. |
| Disabled state | Use native `disabled` attribute or `aria-disabled="true"`. Disabled switches must be removed from tab order. |
| Touch target | Minimum 44×44px for the combined track-and-label touch area. |
| Helper text | If present, associate helper text via `aria-describedby` on the switch control. |
| Motion sensitivity | Thumb animation uses `motion.fast`. Respect `prefers-reduced-motion` — when active, transition must be instant (handled by `tokens.css`). |
| WCAG criteria | Applies SC 1.3.1 (Info and Relationships), SC 1.4.3 (Contrast Minimum), SC 2.1.1 (Keyboard), SC 2.4.7 (Focus Visible), SC 4.1.2 (Name, Role, Value). |

---

## 11. Content Guidelines

| Rule | Detail |
|---|---|
| Labels describe the setting, not the action | "Email notifications" is correct. "Enable email notifications" is not. The switch already communicates the enabling action. |
| Labels must be unambiguous in both states | The label must make sense whether the switch is on or off. "Dark mode" works in both states. "Turn on dark mode" does not. |
| Avoid vague labels | "Settings", "Option", "Feature" are not acceptable. Name the specific setting: "Automatic updates", "Price alerts". |
| Do not use switches for destructive settings | If turning a setting off causes data loss or account restriction, do not use a switch. Use a confirmation dialog instead. |
| Helper text for non-obvious consequences | If toggling has a system-wide or irreversible-until-next-session effect, use helper text: "Applies to all devices on your account." |
| Keep labels short | One line. If the setting requires more explanation, use helper text — not a longer label. |
| Sentence case | Labels use sentence case. Do not use ALL CAPS or Title Case. |

---

## 12. Code Example

```css
.switch-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
}

.switch-track {
  position: relative;
  display: inline-flex;
  align-items: center;
  background: var(--color-background-subtle);
  border-width: var(--border-width-default);
  border-style: solid;
  border-color: var(--color-border-default);
  border-radius: var(--radius-full);
  transition: background var(--motion-fast), border-color var(--motion-fast);
  cursor: pointer;
  flex-shrink: 0;
}

.switch-track[aria-checked="true"] {
  background: var(--color-background-primary);
  border-color: transparent;
}

.switch-track:hover {
  border-color: var(--color-border-strong);
}

.switch-track[aria-checked="true"]:hover {
  background: var(--color-background-selected);
}

.switch-track:focus-visible {
  outline-width: var(--border-width-focus);
  outline-style: solid;
  outline-color: var(--color-border-focus);
  outline-offset: 2px;
}

.switch-track:disabled,
.switch-track[disabled] {
  background: var(--color-background-disabled);
  border-color: var(--color-border-disabled);
  cursor: not-allowed;
}

.switch-thumb {
  background: var(--color-text-inverse);
  border-radius: var(--radius-full);
  transition: transform var(--motion-fast);
}

.switch-track[aria-checked="true"] .switch-thumb {
  transform: translateX(100%);
}

.switch-label {
  font-size: var(--text-body-size);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
}

.switch-label--disabled {
  color: var(--color-text-disabled);
}

.switch-helper {
  font-size: var(--text-caption-size);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}
```

---

## 13. Do / Don't

### ✓ Correct

```
✓  Use for immediate, reversible settings: "Email notifications", "Dark mode"
✓  Label describes the setting: "Price alerts"
✓  aria-checked="true/false" updated on every toggle
✓  Space and Enter both toggle the switch on keyboard focus
✓  Helper text: "Applies to all devices on your account"
✓  Thumb position reflects current state even when disabled
✓  RTL: thumb position mirrored using logical CSS
```

```css
/* ✓ Token-driven */
background: var(--color-background-primary);
border-radius: var(--radius-full);
transition: background var(--motion-fast), transform var(--motion-fast);
color: var(--color-text-primary);
```

---

### ✗ Incorrect

```
✗  Using switch for form submission — use a button
✗  Using switch for destructive or irreversible actions — use confirmation dialog
✗  Label: "Enable dark mode" — remove the verb, label the setting
✗  Label: "Option" or "Setting" — name the specific setting
✗  Switch used as a standalone yes/no confirmation — use a checkbox
✗  No aria-checked update on toggle
✗  Suppressing focus ring with outline: none
✗  Hardcoding directional positioning: left: 0 instead of inset-inline-start: 0
```

```css
/* ✗ Raw values — not permitted */
✗  background: #1D55D6;
✗  border-radius: 9999px;
✗  transition: background 100ms ease;
✗  gap: 8px;
✗  transform: translateX(20px);
```

---

## 14. Cross References

- [token-reference.md](../tokens/token-reference.md) — All tokens used by this component
- [motion.md](../foundations/motion.md) — Duration and easing primitives for thumb and track transitions
- [color.md](../foundations/color.md) — Color primitive scale
- [spacing.md](../foundations/spacing.md) — Spacing primitive scale
- [radius.md](../foundations/radius.md) — Border radius primitive scale
- [checkbox.md](checkbox.md) — Use checkbox for selection and consent; switch is for immediate system state
- [radio.md](radio.md) — Use radio for mutually exclusive option selection
