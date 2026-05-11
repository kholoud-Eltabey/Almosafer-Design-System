---
name: Button
tier: atom
status: stable
last-updated: 2026-05-12
maintainer: Team 4
source: Almosafer Design System
---

# Button

---

## 1. Overview

A button triggers a single, clearly defined action. It is the primary interactive control for submitting data, confirming decisions, and initiating processes.

Buttons communicate affordance. Their visual weight signals priority. Their label names the action. Together, these properties guide users toward the intended next step.

---

## 2. When to Use

| Context | Description |
|---|---|
| Primary actions | The single most important action on a page or in a dialog. Submit, Save, Confirm. |
| Secondary actions | Supporting or alternative actions. Cancel, Go back, Edit. |
| Destructive actions | Actions that delete, remove, or permanently alter data. Use the danger variant. |
| Form submission | Trigger form validation and data submission. |
| Confirmation actions | Confirm a decision in a dialog or modal. Pair with a secondary cancel action. |

---

## 3. When Not to Use

| Context | Use instead |
|---|---|
| Navigation between pages or views | Use a link component. Buttons do not navigate. |
| Static labels or non-interactive content | Use plain text or a badge. |
| Repeated inline text actions in a list | Use a link or inline action. Buttons add too much visual weight at frequency. |
| Displaying status or metadata | Use a badge or tag. |

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | The interactive bounding box. Carries background, border, radius, and spacing tokens. Defines the touch target. |
| Label | Yes | The action text. Short, verb-first. Carries text color and typography tokens. |
| Leading icon | No | An icon placed before the label. Reinforces the action visually. Must not replace the label unless the button is explicitly icon-only with an accessible name. |
| Trailing icon | No | An icon placed after the label. Used to signal expansion, dropdown, or direction. |
| Loading indicator | No | Replaces the label and icons during async operations. Prevents duplicate submission. Must not remove the container or change button dimensions. |

---

## 5. Tokens Used

| Token | Role |
|---|---|
| `color.background.primary` | Primary button default background |
| `color.background.secondary` | Secondary button default background |
| `color.background.secondary-hover` | Secondary button hover and active background |
| `color.background.disabled` | Disabled state background for all variants |
| `color.text.inverse` | Label on all filled variant backgrounds |
| `color.text.brand` | Ghost button label and icon color |
| `color.text.disabled` | Label color in disabled state |
| `color.border.focus` | Focus ring on Ghost variant |
| `color.border.disabled` | Border in disabled state |
| `color.border.danger` | Danger variant focused border |
| `color.status.danger` | Danger button default background |
| `color.status.danger-bold` | Danger button hover and active background |
| `color.status.success` | Success button default and focused background |
| `color.status.success-bold` | Success button hover, active, and focused border |
| `color.status.info` | Info button default and focused background |
| `color.status.info-bold` | Info button hover, active, and focused border |
| `color.status.warning` | Warning button default and focused background |
| `color.status.warning-bold` | Warning button hover, active, and focused border |
| `spacing.xs` | Horizontal and vertical padding for small size; vertical padding for medium |
| `spacing.sm` | Horizontal padding for medium size; vertical padding for large |
| `spacing.md` | Horizontal padding for large size |
| `text.body.sm` | Font size for small button label |
| `text.body.md` | Font size for medium button label |
| `text.body.lg` | Font size for large button label |
| `font.weight.semibold` | Label weight for all button sizes |
| `line-height-normal` | Label line height |
| `radius.lg` | Default button corner radius |
| `radius.full` | Pill button variant radius |
| `border.width.focus` | Focus ring border width |
| `motion.fast` | Background and border transitions |
| `motion.normal` | Loading state transition |

---

## 6. Variants

### Primary

| Property | Value |
|---|---|
| Purpose | The highest-priority action on a surface. Directs the user toward the intended outcome. |
| Allowed usage | One per view or dialog section. Never two primary buttons side by side. |
| Background | `color.background.primary` |
| Label | `color.text.inverse` |
| Restrictions | Do not use for destructive actions. Do not use more than once per context. |

---

### Secondary

| Property | Value |
|---|---|
| Purpose | Supporting actions. Second priority after primary. Used for alternative or supplemental actions. |
| Allowed usage | Paired with a primary button. Can appear alone when no primary action is required. |
| Background | `color.background.secondary` |
| Label | `color.text.inverse` |
| Restrictions | Do not use for the highest-priority action. Do not use for destructive actions. |

---

### Ghost

| Property | Value |
|---|---|
| Purpose | Lowest visual weight. Used for tertiary actions that should not compete with primary or secondary buttons. |
| Allowed usage | Inline actions, toolbars, icon-adjacent controls, compact contexts. |
| Background | Transparent |
| Label | `color.text.brand` |
| Restrictions | Do not use as the sole action in a confirmation dialog. Must have sufficient surrounding context to identify it as interactive. |

---

### Danger

| Property | Value |
|---|---|
| Purpose | Destructive, irreversible, or high-consequence actions. Delete, Remove, Revoke. |
| Allowed usage | When the action cannot be undone or causes significant data loss. Always pair with a secondary cancel option. |
| Background | `color.status.danger` |
| Label | `color.text.inverse` |
| Focused border | `color.border.danger` — not `color.border.focus`. Danger focused ring uses the danger color for visual consistency. |
| Restrictions | Do not use for standard negative actions (e.g., closing a panel). Reserve for genuine destructive operations. |

---

### Success

| Property | Value |
|---|---|
| Purpose | Confirming a positive outcome, completing a beneficial action, or approving a state change. |
| Allowed usage | When the action result is inherently positive. Save confirmation, approve, activate. |
| Background | `color.status.success` |
| Label | `color.text.inverse` |
| Restrictions | Do not use for general confirmation. Reserve for actions where the success outcome is meaningful to the user. |

---

### Info

| Property | Value |
|---|---|
| Purpose | Informational or neutral system-level actions. Acknowledge, Dismiss, Learn more. |
| Allowed usage | System dialogs, inline notifications, and neutral acknowledgements. |
| Background | `color.status.info` |
| Label | `color.text.inverse` |
| Restrictions | Do not use for primary or destructive actions. Info variant is for neutral system interactions only. |

---

### Warning

| Property | Value |
|---|---|
| Purpose | Actions that carry risk, require caution, or may have reversible consequences. Proceed with caution, Override, Confirm risk. |
| Allowed usage | When the user is about to take an action with a notable side effect that is not destructive but requires attention. Always pair with a cancel or secondary option. |
| Background | `color.status.warning` |
| Label | `color.text.inverse` |
| Focused border | `color.status.warning-bold` |
| Restrictions | Do not use for irreversible destructive actions — use the Danger variant instead. Do not use for general attention states or status display. |

---

## 7. Sizes

| Size | Use case | Padding (horizontal) | Padding (vertical) | Font size token |
|---|---|---|---|---|
| Small | Compact contexts. Dense tables, toolbars, inline form actions. | `spacing.xs` | `spacing.xs` | `text.body.sm` |
| Medium | Default. Most dialogs, forms, and page actions. | `spacing.sm` | `spacing.xs` | `text.body.md` |
| Large | High-emphasis contexts. Landing sections, confirmation dialogs, primary onboarding actions. | `spacing.md` | `spacing.sm` | `text.body.lg` |

All sizes use `font.weight.semibold` and `line-height-normal`. All sizes use `radius.lg`.

---

## 8. States

| State | Background | Text | Border | Transition |
|---|---|---|---|---|
| Default | Variant default | `color.text.inverse` | None | — |
| Hover | Variant hover token (one step darker) | Unchanged | None | `motion.fast` on background |
| Active / Pressed | Variant hover token at 85% opacity | Unchanged | None | `motion.fast` |
| Focused | Variant default at 85% opacity | Unchanged | Variant border token at `border.width.focus`, offset 2px, OUTSIDE | `motion.fast` on ring |
| Disabled | `color.background.disabled` | `color.text.disabled` | `color.border.disabled` | None |
| Loading | Unchanged | Hidden (replaced by indicator) | Unchanged | `motion.normal` on indicator entry |

**Focused border by variant:**

| Variant | Focused border token |
|---|---|
| Primary | `color.border.selected` |
| Secondary | `color.background.secondary-hover` |
| Ghost | `color.border.focus` |
| Danger | `color.border.danger` |
| Success | `color.status.success-bold` |
| Info | `color.status.info-bold` |
| Warning | `color.status.warning-bold` |

**Rules:**

- Disabled buttons must not be keyboard focusable. Use `disabled` attribute, not `aria-disabled` alone.
- Loading state must preserve button dimensions. Do not collapse the container while loading.
- Hover and active states must be visually distinct. Do not use the same background for both.
- Focus ring must not be hidden by `outline: none` without a replacement focus indicator.

---

## 9. Behavior

- A button triggers exactly one action per click. Do not bind multiple handlers.
- Clicking a disabled button produces no response. No tooltip, no error, no state change.
- Entering loading state must disable further clicks immediately. Do not allow duplicate submissions.
- Icon-only buttons must carry a visible or accessible label. A visible icon without text requires `aria-label` on the button element.
- Buttons inside forms default to `type="submit"`. Buttons that do not submit must declare `type="button"` explicitly.
- Long labels do not wrap. If a label exceeds available width, truncate with an ellipsis and expose the full label via `title` attribute.
- Button width follows content by default. Full-width buttons are permitted in mobile layouts and stacked form footers.
- In RTL layouts, leading icons appear after the label and trailing icons appear before it. Use logical CSS for internal spacing (`padding-inline-start`, `padding-inline-end`). Directional icons (arrows, chevrons) must flip in RTL. Decorative icons do not flip.

---

## 10. Accessibility

| Requirement | Rule |
|---|---|
| Keyboard access | All buttons must be reachable and activatable via keyboard. `Tab` to focus, `Enter` or `Space` to activate. |
| Focus indicator | A visible focus ring is required on all variants in all sizes. Use `color.border.focus`. Never suppress focus without a replacement. |
| Accessible name | Every button must have an accessible name. For text buttons: the label. For icon-only buttons: `aria-label`. |
| Disabled state | Use the native `disabled` attribute. Disabled buttons must be removed from tab order. |
| Loading state | Set `aria-busy="true"` and `aria-disabled="true"` during loading. Announce loading state to screen readers with `aria-live` if applicable. |
| Contrast | Label-to-background contrast must meet WCAG 2.1 AA: 4.5:1 for normal text, 3:1 for large text. Defined by color tokens. |
| Touch target | Minimum 44×44px bounding box for all interactive buttons. Do not reduce padding below the small size token values in touch contexts. |
| Icon labels | Decorative icons inside buttons carry `aria-hidden="true"`. They do not contribute to the accessible name. |
| WCAG criteria | Applies SC 1.4.3 (Contrast Minimum), SC 2.1.1 (Keyboard), SC 2.4.7 (Focus Visible), SC 4.1.2 (Name, Role, Value). |

---

## 11. Content Guidelines

| Rule | Detail |
|---|---|
| Use verb-first labels | Start with an action verb: Save, Delete, Confirm, Cancel, Submit, Add. |
| Keep labels short | One to three words. Avoid full sentences. |
| Be specific | "Delete report" is better than "Delete". Specificity reduces errors on destructive actions. |
| Avoid vague labels | Do not use OK, Yes, No, Click here. These labels carry no action context. |
| Danger labels must name the action | "Delete account" is required. "Confirm" alone is not sufficient for destructive actions. |
| Match label to outcome | The label must describe what happens when the button is clicked, not what the user wants to do. |
| Avoid punctuation | No periods, exclamation marks, or question marks in button labels. |
| Sentence case | Use sentence case for all labels. Do not use ALL CAPS or Title Case. |

---

## 12. Code Example

```css
.button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-background-primary);
  color: var(--color-text-inverse);
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  font-size: var(--text-body-size);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  cursor: pointer;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}

.button:hover {
  background: var(--color-background-selected);
}

.button:focus-visible {
  outline-width: var(--border-width-focus);
  outline-style: solid;
  outline-color: var(--color-border-focus);
  outline-offset: 2px;
}

.button:disabled {
  background: var(--color-background-disabled);
  color: var(--color-text-disabled);
  border-color: var(--color-border-disabled);
  cursor: not-allowed;
}

.button--secondary {
  background: var(--color-background-secondary);
  color: var(--color-text-inverse);
  border-color: transparent;
}

.button--secondary:hover {
  background: var(--color-background-secondary-hover);
}

.button--ghost {
  background: transparent;
  color: var(--color-text-brand);
  border-color: transparent;
}

.button--danger {
  background: var(--color-status-danger);
  color: var(--color-text-inverse);
  border-color: transparent;
}

.button--danger:focus-visible {
  outline-width: var(--border-width-focus);
  outline-style: solid;
  outline-color: var(--color-border-danger);
  outline-offset: 2px;
}

.button--success {
  background: var(--color-status-success);
  color: var(--color-text-inverse);
  border-color: transparent;
}

.button--success:hover {
  background: var(--color-status-success-bold);
}

.button--info {
  background: var(--color-status-info);
  color: var(--color-text-inverse);
  border-color: transparent;
}

.button--info:hover {
  background: var(--color-status-info-bold);
}

.button--info:focus-visible {
  outline-width: var(--border-width-focus);
  outline-style: solid;
  outline-color: var(--color-status-info-bold);
  outline-offset: 2px;
}

.button--warning {
  background: var(--color-status-warning);
  color: var(--color-text-inverse);
  border-color: transparent;
}

.button--warning:hover {
  background: var(--color-status-warning-bold);
}

.button--warning:focus-visible {
  outline-width: var(--border-width-focus);
  outline-style: solid;
  outline-color: var(--color-status-warning-bold);
  outline-offset: 2px;
}

.button--small {
  padding: var(--spacing-xs);
  font-size: var(--text-body-sm-size);
}

.button--large {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--text-body-lg-size);
}
```

---

## 13. Do / Don't

### ✓ Correct

```css
/* Token-driven styling */
background: var(--color-background-primary);
color: var(--color-text-inverse);
border-radius: var(--radius-lg);
transition: background var(--motion-fast);
```

```
✓  One primary button per context
✓  "Delete report" for destructive actions
✓  Icon-only button with aria-label="Close"
✓  type="button" on non-submit buttons
✓  Visible focus ring on keyboard navigation
```

---

### ✗ Incorrect

```css
/* Raw values — not permitted */
✗  background: #1D55D6;
✗  color: white;
✗  border-radius: 8px;
✗  transition: background 100ms ease;
✗  font-size: 14px;
```

```
✗  Two primary buttons side by side
✗  Using a button for page navigation
✗  Label: "OK" or "Yes" on a destructive dialog
✗  outline: none without replacement focus style
✗  Changing button dimensions during loading state
✗  Referencing brand-500 or neutral-0 directly
```

---

## 14. Cross References

- [token-reference.md](../tokens/token-reference.md) — All tokens used by this component
- [color.md](../foundations/color.md) — Color primitive scale
- [spacing.md](../foundations/spacing.md) — Spacing primitive scale
- [typography.md](../foundations/typography.md) — Font size, weight, and line height primitives
- [radius.md](../foundations/radius.md) — Border radius primitive scale
- [motion.md](../foundations/motion.md) — Duration and easing primitives
