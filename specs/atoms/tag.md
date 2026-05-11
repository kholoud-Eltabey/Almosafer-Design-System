---
name: Tag
tier: atom
status: stable
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Tag

---

## 1. Overview

A tag is a compact label used to categorize, filter, or annotate content. Tags can be static — presenting a label only — or removable, allowing the user to dismiss them.

Tags differ from badges in one key way: tags represent user-applied or user-removable labels. Badges represent system-defined status. A tag on a product represents a category the user has assigned or selected. A badge on that same product represents its publication state.

Tags appear in filter bars, input fields (multi-select), search refinement, and product categorization. They must always be readable, never truncated without accessible alternatives, and clearly interactive when removable.

---

## 2. When to Use

| Context | Description |
|---|---|
| User-applied labels | Categories, interests, or attributes the user has selected or applied: "Electronics", "On sale", "Size M". |
| Filter selections | Active filters in a filter bar. Each selected filter renders as a removable tag. |
| Multi-select input values | Selected values inside an input field (e.g., recipient list, tag input). |
| Content categorization | Static category markers on product cards, articles, or records. |
| Search refinement | Keywords or facets the user has added to narrow results. |

---

## 3. When Not to Use

| Context | Use instead |
|---|---|
| System-defined read-only status | Use a badge. Status is owned by the system, not the user. |
| Primary actions | Use a button. Tags do not drive actions. |
| Navigation | Use a link or navigation component. |
| Long descriptive labels | Tags are constrained to short text. Use a chip or an inline label for longer content. |
| Sole indicator of meaning via color | Pair color with a label. Do not rely on variant color alone to convey meaning. |

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | The bounding shape. Carries background, border, radius, and spacing tokens. Handles hover and active states. |
| Label | Yes | The visible text. Short and specific. Carries text color and typography tokens. Never truncated without an accessible alternative. |
| Leading icon | No | An optional icon before the label. Reinforces category or type visually. Decorative — carries `aria-hidden="true"`. Must not replace the label. |
| Remove action | Conditional | An icon button (`×`) appended inside the container when the tag is removable. It is an independent interactive target with its own accessible label: `aria-label="Remove [tag label]"`. Required when the tag can be dismissed by the user. |

---

## 5. Tokens Used

| Token | Role |
|---|---|
| `color.background.subtle` | Neutral tag background |
| `color.background.selected` | Neutral tag hover background |
| `color.background.primary` | Brand tag background |
| `color.background.success` | Success tag background |
| `color.background.warning` | Warning tag background |
| `color.background.danger` | Danger tag background |
| `color.background.disabled` | Disabled tag background |
| `color.text.secondary` | Neutral tag label |
| `color.text.inverse` | Brand tag label |
| `color.text.success` | Success tag label |
| `color.text.warning` | Warning tag label |
| `color.text.danger` | Danger tag label |
| `color.text.disabled` | Disabled tag label and remove icon |
| `color.text.subtle` | Remove icon color (default) |
| `color.text.primary` | Remove icon color (hover) |
| `color.border.default` | Neutral tag border |
| `color.border.selected` | Brand tag border |
| `color.status.success` | Success tag border |
| `color.status.warning` | Warning tag border |
| `color.status.danger` | Danger tag border |
| `color.border.disabled` | Disabled tag border |
| `color.border.focus` | Focus ring on tag or remove button |
| `spacing.xs` | Padding (small size) and gap between parts |
| `spacing.sm` | Horizontal padding (medium size) |
| `text.caption` | Small tag label font size |
| `text.body.sm` | Medium tag label font size |
| `font.weight.medium` | Label font weight |
| `line-height-normal` | Label line height |
| `radius.full` | Pill shape — default for tags |
| `radius.sm` | Square-corner shape — for dense or grid-aligned contexts |
| `border.width.default` | Tag border width |
| `border.width.focus` | Focus ring width (tag and remove button) |
| `motion.fast` | Background and border transitions |

---

## 6. Variants

### Neutral

Default tag for general categorization with no semantic status meaning.

| Property | Token |
|---|---|
| Background | `color.background.subtle` |
| Border | `color.border.default` |
| Label | `color.text.secondary` |

---

### Brand

High-visibility tag for primary categories, featured labels, or selected active filters.

| Property | Token |
|---|---|
| Background | `color.background.primary` |
| Border | `color.border.selected` |
| Label | `color.text.inverse` |

Rule: Use sparingly. Do not apply brand variant to every tag in a set. Reserve for selected or highlighted state.

---

### Success

Tags representing positive classification: Verified, In stock, Approved, Active.

| Property | Token |
|---|---|
| Background | `color.background.success` |
| Border | `color.status.success` |
| Label | `color.text.success` |

---

### Warning

Tags representing cautionary classification: Low stock, Expiring, Under review.

| Property | Token |
|---|---|
| Background | `color.background.warning` |
| Border | `color.status.warning` |
| Label | `color.text.warning` |

---

### Danger

Tags representing critical classification: Out of stock, Discontinued, Rejected, Blocked.

| Property | Token |
|---|---|
| Background | `color.background.danger` |
| Border | `color.status.danger` |
| Label | `color.text.danger` |

---

## 7. Sizes

| Size | Use case | Padding | Font size token |
|---|---|---|---|
| Small | Dense filter bars, multi-select inputs, compact product cards. | `spacing.xs` (all sides) | `text.caption` |
| Medium | Default. Standard filter selections, category labels, search refinement. | `spacing.xs` (vertical) + `spacing.sm` (horizontal) | `text.body.sm` |

Both sizes use `radius.full`, `font.weight.medium`, and `line-height-normal`.

---

## 8. States

| State | Background | Border | Label | Notes |
|---|---|---|---|---|
| Default | Variant default | Variant default | Variant default | Static or interactive. |
| Hover | `color.background.selected` (neutral) or darkened variant | Unchanged | Unchanged | Applies to the full tag container. Transition: `motion.fast`. |
| Focused | Unchanged | `color.border.focus` (2px ring, offset 2px) | Unchanged | Applies when the tag or remove button has keyboard focus. |
| Active / Pressed | Slightly elevated from hover | `color.border.selected` | Unchanged | Transition: `motion.fast`. |
| Disabled | `color.background.disabled` | `color.border.disabled` | `color.text.disabled` | Remove button also disabled. No interaction. |

**Rules:**

- Static tags (no remove action, no click behavior) do not render hover, focus, or active states. They must not receive focus or respond to pointer events.
- Interactive tags (removable or clickable) must render all states above.
- The remove button inside a removable tag has its own independent focus and hover states — it does not share states with the tag container.
- All interactive state transitions use `motion.fast`.
- Disabled tags use native `disabled` where applicable and are removed from tab order.

---

## 9. Behavior

- A static tag is presentational. It does not respond to click, hover, or keyboard events. It does not receive focus.
- A removable tag contains a separate remove button (`×`) as an independent interactive element. Clicking the remove button dismisses the tag. Clicking the tag label does not dismiss it.
- The remove button's accessible label must name the specific tag: `aria-label="Remove Electronics"`. A generic `aria-label="Remove"` is not sufficient when multiple tags are visible.
- When a tag is removed, focus must move to a logical next target: the next tag in the list, the previous tag, or the input field that owns the tag group. Focus must not be lost.
- Tags in a filter bar reflect active filter state. Removing a tag deactivates that filter and updates results immediately.
- Tags must not wrap their label. If the label exceeds available space, truncate with an ellipsis and expose the full label via `title` or `aria-label`.
- In RTL layouts, the remove button appears on the left and the leading icon on the right. Use logical CSS properties for all spacing and positioning.

---

## 10. Accessibility

| Requirement | Rule |
|---|---|
| Color alone is not sufficient | Every tag must carry a text label. Do not use variant color as the sole meaning carrier. |
| Contrast | Label-to-background contrast must meet WCAG 2.1 AA: 4.5:1 for normal text. Validate all variant token combinations before use. |
| Static tag | Static tags must not receive focus and must not appear in tab order. If presented as list items, wrap in a `<ul>` with `role="list"`. |
| Interactive tag (removable) | The tag container may be focusable if clicking it has a defined behavior. The remove button is always a focusable `<button>`. |
| Remove button label | `aria-label="Remove [tag label]"` is required on every remove button. Generic labels are not permitted. |
| Focus after removal | When a tag is removed, focus must move to a defined adjacent target. Focus must not be dropped to the document body. |
| Keyboard support | Remove button: `Tab` to focus, `Enter` or `Space` to activate. Tag (if interactive): same. |
| Focus ring | `color.border.focus` at 2px on the focused element (tag or remove button). `outline: none` is not permitted without a CSS replacement. |
| Icon accessibility | Leading icons carry `aria-hidden="true"`. The label carries all accessible meaning. |
| Group context | A set of tags (e.g., active filters) should be wrapped in a container with an accessible group label: `aria-label="Active filters"` or a visible heading associated via `aria-labelledby`. |
| WCAG criteria | Applies SC 1.4.1 (Use of Color), SC 1.4.3 (Contrast Minimum), SC 2.1.1 (Keyboard), SC 2.4.7 (Focus Visible), SC 4.1.2 (Name, Role, Value). |

---

## 11. Content Guidelines

| Rule | Detail |
|---|---|
| Keep labels to one to three words | "Electronics", "On sale", "Size M". Tags are not sentences. |
| Use nouns or noun phrases | "Free shipping", "New arrival", "Best seller". Avoid verb phrases. |
| Sentence case | "On sale" is correct. "ON SALE" and "On Sale" are not. |
| Labels must be self-explanatory | The tag must communicate its meaning without a tooltip. If a tooltip is required to explain the tag, reconsider the label. |
| Do not repeat surrounding context | If a tag appears inside a "Filters" section, it does not need to say "Filter: Electronics" — "Electronics" is sufficient. |
| Avoid vague labels | "Item", "Category", "Type" are not acceptable. Name the specific value. |
| Remove button carries no visible text | The `×` icon is sufficient visually. The accessible label on the remove button carries the full context: `aria-label="Remove Electronics"`. |

---

## 12. Code Example

```css
.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-background-subtle);
  border-width: var(--border-width-default);
  border-style: solid;
  border-color: var(--color-border-default);
  border-radius: var(--radius-full);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
  white-space: nowrap;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}

/* Size — small */
.tag--small {
  padding: var(--spacing-xs);
  font-size: var(--text-caption-size);
}

/* Variant — brand */
.tag--brand {
  background: var(--color-background-primary);
  border-color: var(--color-border-selected);
  color: var(--color-text-inverse);
}

/* Variant — success */
.tag--success {
  background: var(--color-background-success);
  border-color: var(--color-status-success);
  color: var(--color-text-success);
}

/* Variant — warning */
.tag--warning {
  background: var(--color-background-warning);
  border-color: var(--color-status-warning);
  color: var(--color-text-warning);
}

/* Variant — danger */
.tag--danger {
  background: var(--color-background-danger);
  border-color: var(--color-status-danger);
  color: var(--color-text-danger);
}

/* Interactive tag hover */
.tag--interactive:hover {
  background: var(--color-background-selected);
}

/* Focus on tag or remove button */
.tag:focus-visible,
.tag__remove:focus-visible {
  outline-width: var(--border-width-focus);
  outline-style: solid;
  outline-color: var(--color-border-focus);
  outline-offset: 2px;
}

/* Disabled */
.tag--disabled {
  background: var(--color-background-disabled);
  border-color: var(--color-border-disabled);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

/* Remove button */
.tag__remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  color: var(--color-text-subtle);
  cursor: pointer;
  transition: color var(--motion-fast);
  flex-shrink: 0;
}

.tag__remove:hover {
  color: var(--color-text-primary);
}

/* Leading icon */
.tag__icon {
  flex-shrink: 0;
}
```

---

## 13. Do / Don't

### ✓ Correct

```
✓  Short, specific labels: "Electronics", "Free shipping", "Size M"
✓  Remove button: aria-label="Remove Electronics"
✓  Focus moves to next tag after removal — not dropped
✓  Static tag has no tab stop, no hover, no pointer cursor
✓  Color paired with text label — never color alone
✓  Leading icon carries aria-hidden="true"
✓  Filter tag group labelled: aria-label="Active filters"
```

```css
/* ✓ Token-driven */
background: var(--color-background-success);
border-color: var(--color-status-success);
color: var(--color-text-success);
border-radius: var(--radius-full);
transition: background var(--motion-fast);
```

---

### ✗ Incorrect

```
✗  Using a tag as a primary action — use a button
✗  Using a tag for system status — use a badge
✗  Long labels: "This product qualifies for free shipping on orders over 200"
✗  Remove button: aria-label="Remove" (generic, ambiguous)
✗  Focus dropped to document body after tag removal
✗  Static tag in tab order (focusable without purpose)
✗  Color variant as sole meaning — no text label
✗  Hardcoded directional padding: padding-right instead of padding-inline-end
```

```css
/* ✗ Raw values — not permitted */
✗  background: #F1F2F4;
✗  border: 1px solid #DCDFE4;
✗  border-radius: 9999px;
✗  padding: 4px 8px;
✗  font-size: 12px;
```

---

## 14. Cross References

- [token-reference.md](../tokens/token-reference.md) — All tokens used by this component
- [color.md](../foundations/color.md) — Color primitive scale and contrast requirements
- [spacing.md](../foundations/spacing.md) — Spacing primitive scale
- [typography.md](../foundations/typography.md) — Font size and weight primitives
- [radius.md](../foundations/radius.md) — Border radius primitive scale
- [motion.md](../foundations/motion.md) — Duration and easing primitives
- [badge.md](badge.md) — Use badge for system-defined status; tag for user-applied or removable labels
- [button.md](button.md) — Use button when the element must trigger a primary action
