---
name: Badge
tier: atom
status: stable
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Badge

---

## 1. Overview

A badge is a small, non-interactive label used to communicate status, classification, or a count. It surfaces contextual information at a glance without requiring user action.

Badges are supportive elements. They annotate content — they do not drive it. A badge clarifies what something is or what state it is in. It does not initiate a process, navigate the user, or confirm a decision.

---

## 2. When to Use

| Context | Description |
|---|---|
| Status communication | Indicate the current state of an item: Published, Draft, Pending, Expired. |
| Classification labels | Categorize content with a short, fixed label: New, Featured, Sale, Required. |
| Count indicators | Display a numeric count on a list item, tab, or icon: unread messages, cart quantity. |
| Severity indicators | Flag priority or urgency alongside content: High, Critical, Low. |
| Pipeline or workflow stage | Show where an item sits in a defined process: In review, Approved, Rejected. |

---

## 3. When Not to Use

| Context | Use instead |
|---|---|
| Triggering an action | Use a button. Badges do not respond to click by default. |
| Navigation | Use a link or navigation component. |
| Long descriptive text | Use inline text or a tooltip. Badges are constrained to short labels. |
| Selecting or filtering options | Use a tag (if interactive) or a checkbox group. |
| The sole indicator of critical information | Pair with text or an icon. Do not rely on badge color alone to communicate meaning. |

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | The bounding shape of the badge. Carries background, border, radius, and spacing tokens. Pill-shaped by default using `radius.full`. |
| Label | Yes | The visible text. Short, sentence-case, and specific. Carries text color and typography tokens. Maximum one to three words. |
| Icon | No | A leading icon reinforcing the badge meaning — typically a status icon. Decorative only; carries `aria-hidden="true"`. Must not replace the label. |

---

## 5. Tokens Used

| Token | Role |
|---|---|
| `color.background.subtle` | Neutral badge background |
| `color.background.primary` | Brand badge background |
| `color.background.success` | Success badge background |
| `color.background.warning` | Warning badge background |
| `color.background.danger` | Danger badge background |
| `color.background.disabled` | Disabled badge background |
| `color.text.secondary` | Neutral badge label |
| `color.text.inverse` | Brand badge label |
| `color.text.success` | Success badge label |
| `color.text.warning` | Warning badge label |
| `color.text.danger` | Danger badge label |
| `color.text.disabled` | Disabled badge label |
| `color.border.default` | Neutral badge border |
| `color.border.selected` | Brand badge border |
| `color.status.success` | Success badge border and icon |
| `color.status.warning` | Warning badge border and icon |
| `color.status.danger` | Danger badge border and icon |
| `color.border.disabled` | Disabled badge border |
| `color.border.focus` | Focus ring when badge is interactive |
| `spacing.xs` | Horizontal and vertical padding |
| `text.caption` | Small badge label font size |
| `text.body.sm` | Medium badge label font size |
| `font.weight.medium` | Label font weight |
| `letter-spacing-wide` | Label letter spacing (uppercase labels only) |
| `line-height-normal` | Label line height |
| `radius.full` | Default pill shape |
| `radius.sm` | Square-corner variant (counts, numeric badges) |
| `border.width.default` | Badge border width |
| `border.width.focus` | Focus ring width (interactive badges) |
| `motion.fast` | Background and border transition when interactive |

---

## 6. Variants

### Neutral

Default classification label. No semantic meaning. Used for general metadata, draft status, or inactive states.

| Property | Token |
|---|---|
| Background | `color.background.subtle` |
| Border | `color.border.default` |
| Label | `color.text.secondary` |

---

### Brand

High-visibility label for product identity, feature promotion, or primary classification.

| Property | Token |
|---|---|
| Background | `color.background.primary` |
| Border | `color.border.selected` |
| Label | `color.text.inverse` |

Rule: Use sparingly. Brand color carries high visual weight. Do not use for every badge in a list.

---

### Success

Confirms a positive state: Active, Published, Verified, Completed.

| Property | Token |
|---|---|
| Background | `color.background.success` |
| Border | `color.status.success` |
| Label | `color.text.success` |
| Icon (optional) | `color.status.success` |

---

### Warning

Flags a cautionary state requiring attention: Pending, Expiring, At risk, Review needed.

| Property | Token |
|---|---|
| Background | `color.background.warning` |
| Border | `color.status.warning` |
| Label | `color.text.warning` |
| Icon (optional) | `color.status.warning` |

---

### Danger

Signals an error, critical state, or failed condition: Failed, Rejected, Overdue, Error.

| Property | Token |
|---|---|
| Background | `color.background.danger` |
| Border | `color.status.danger` |
| Label | `color.text.danger` |
| Icon (optional) | `color.status.danger` |

---

## 7. Sizes

| Size | Use case | Padding token | Font size token |
|---|---|---|---|
| Small | Compact tables, dense lists, inline metadata, count indicators. | `spacing.xs` (all sides) | `text.caption` |
| Medium | Default. Standard status labels, classification tags, sidebar annotations. | `spacing.xs` (vertical) + `spacing.sm` (horizontal) | `text.body.sm` |

Both sizes use `radius.full`, `font.weight.medium`, and `line-height-normal`.

---

## 8. States

Badges are non-interactive by default. States apply only when a badge is explicitly made interactive (e.g., a dismissible tag or a clickable filter badge).

| State | When it applies | Background | Border | Label |
|---|---|---|---|---|
| Default | Always | Variant default | Variant default | Variant default |
| Hover | Interactive badge only | Slightly elevated — use `color.background.selected` for brand, `color.background.subtle` for neutral | Unchanged | Unchanged |
| Focused | Interactive badge only | Unchanged | `color.border.focus` / `border.width.focus` | Unchanged |
| Disabled | Interactive badge only | `color.background.disabled` | `color.border.disabled` | `color.text.disabled` |

**Rules:**

- A static badge must not receive focus, hover effects, or pointer cursor.
- An interactive badge must declare `role="button"` or be a native `<button>` element.
- All interactive state transitions use `motion.fast`.
- Disabled interactive badges use native `disabled` attribute and are removed from tab order.

---

## 9. Behavior

- A static badge is purely presentational. It does not respond to click, hover, or keyboard events.
- When a badge must be interactive (dismiss, filter toggle), it must be implemented as a native `<button>` or have `role="button"` with full keyboard support.
- Badge content must not change without a visible trigger or state change that the user initiated or that is clearly system-driven.
- Count badges must update in real time when the underlying count changes. If the count reaches zero, hide or remove the badge — do not display "0" unless zero has semantic meaning in context.
- Badges do not wrap. If the label exceeds available space, truncate with an ellipsis. The full label must be accessible via `title` or `aria-label`.
- Badges must not contain interactive elements (links, buttons) inside their container. An interactive badge is itself the interactive element.

---

## 10. Accessibility

| Requirement | Rule |
|---|---|
| Color alone is not sufficient | Every status badge must pair color with a text label. Do not communicate danger, warning, or success through color alone. |
| Contrast | Text-to-background contrast must meet WCAG 2.1 AA: 4.5:1 for normal text. All defined variant token combinations meet this requirement. Do not introduce custom combinations without validating contrast. |
| Icon accessibility | Icons inside badges carry `aria-hidden="true"`. They are decorative. The label carries the accessible meaning. |
| Interactive badge role | An interactive badge must have `role="button"` or be a native `<button>`. It must be keyboard focusable and activatable with `Space` or `Enter`. |
| Focus indicator | Interactive badges require a visible focus ring using `color.border.focus` at 2px. `outline: none` is not permitted without a CSS replacement. |
| Screen reader label | For count badges without visible text context (e.g., a badge on an icon), provide `aria-label` on the parent or the badge: `aria-label="3 unread notifications"`. |
| Live updates | Count badges that update dynamically must use `aria-live="polite"` or be within a live region so screen readers announce the change. |
| Disabled state | Interactive disabled badges use `aria-disabled="true"` or native `disabled` and are removed from tab order. |
| WCAG criteria | Applies SC 1.4.1 (Use of Color), SC 1.4.3 (Contrast Minimum), SC 2.1.1 (Keyboard), SC 2.4.7 (Focus Visible), SC 4.1.3 (Status Messages — for live count regions). |

---

## 11. Content Guidelines

| Rule | Detail |
|---|---|
| Keep labels to one to three words | "Published", "In review", "High priority". Badges are not sentences. |
| Use nouns or noun phrases | "Draft", "Pending approval", "Sale". Avoid verbs unless they name a state: "Archived". |
| Sentence case | "In review" is correct. "IN REVIEW" and "In Review" are not. Exception: all-caps only if `letter-spacing-wide` is applied and the label is a single word abbreviation. |
| Labels must be self-explanatory | The badge meaning must be clear without a tooltip. If a tooltip is required to explain the badge, reconsider the label. |
| Count badges show numerals only | Display the number. Do not add units: "12" not "12 items". Truncate at a threshold: "99+" not "132". |
| Avoid vague labels | "Active", "Done", "OK" are acceptable. "Status", "Info", "Data" are not. |
| Do not repeat the context | If the badge sits inside a "Orders" table, the badge does not need to say "Order pending" — "Pending" is sufficient. |

---

## 12. Code Example

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  border-width: var(--border-width-default);
  border-style: solid;
  border-color: var(--color-border-default);
  background: var(--color-background-subtle);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
  white-space: nowrap;
}

/* Size — small */
.badge--small {
  padding: var(--spacing-xs);
  font-size: var(--text-caption-size);
}

/* Variant — brand */
.badge--brand {
  background: var(--color-background-primary);
  border-color: var(--color-border-selected);
  color: var(--color-text-inverse);
}

/* Variant — success */
.badge--success {
  background: var(--color-background-success);
  border-color: var(--color-status-success);
  color: var(--color-text-success);
}

/* Variant — warning */
.badge--warning {
  background: var(--color-background-warning);
  border-color: var(--color-status-warning);
  color: var(--color-text-warning);
}

/* Variant — danger */
.badge--danger {
  background: var(--color-background-danger);
  border-color: var(--color-status-danger);
  color: var(--color-text-danger);
}

/* Interactive badge */
.badge--interactive {
  cursor: pointer;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}

.badge--interactive:focus-visible {
  outline-width: var(--border-width-focus);
  outline-style: solid;
  outline-color: var(--color-border-focus);
  outline-offset: 2px;
}

.badge--interactive:disabled {
  background: var(--color-background-disabled);
  border-color: var(--color-border-disabled);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

/* Icon inside badge */
.badge__icon {
  flex-shrink: 0;
}
```

---

## 13. Do / Don't

### ✓ Correct

```
✓  Short, specific labels: "Published", "Pending", "High priority"
✓  Color paired with text label — never color alone
✓  Icons carry aria-hidden="true"
✓  Count badge: "12" or "99+" — not "12 items"
✓  Static badge has no pointer cursor, no focus, no hover
✓  Interactive badge implemented as <button> with full keyboard support
✓  Sentence case: "In review"
```

```css
/* ✓ Token-driven */
background: var(--color-background-success);
border-color: var(--color-status-success);
color: var(--color-text-success);
border-radius: var(--radius-full);
font-size: var(--text-body-sm-size);
```

---

### ✗ Incorrect

```
✗  Using a badge as the sole indicator of status without a text label
✗  Long labels: "This item is currently pending your approval"
✗  Using badge for navigation or triggering an action (use button)
✗  Displaying "0" on a count badge when zero has no meaning
✗  Mixing badge variants without semantic reason (danger badge for a "New" label)
✗  All-caps label without letter-spacing token: "PUBLISHED"
✗  Interactive badge without role="button" or keyboard support
```

```css
/* ✗ Raw values — not permitted */
✗  background: #DCFFF1;
✗  border: 1px solid #22A06B;
✗  border-radius: 9999px;
✗  font-size: 12px;
✗  padding: 2px 8px;
```

---

## 14. Cross References

- [token-reference.md](../tokens/token-reference.md) — All tokens used by this component
- [color.md](../foundations/color.md) — Color primitive scale and contrast requirements
- [typography.md](../foundations/typography.md) — Font size and weight primitives
- [spacing.md](../foundations/spacing.md) — Spacing primitive scale
- [radius.md](../foundations/radius.md) — Border radius primitive scale
- [button.md](button.md) — Use button when the element must trigger an action
- [tag.md](tag.md) — Use tag when the label is user-generated, dismissible, or part of a filter set
