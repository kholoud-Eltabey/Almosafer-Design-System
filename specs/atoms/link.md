---
name: Link
tier: atom
status: draft
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Link

---

## 1. Overview

A link is an inline interactive element that navigates the user to another page, view, or resource, or opens related content. It communicates a destination, not an action. Its visual form is text, optionally accompanied by a leading or trailing icon.

Links are distinct from buttons. A link changes location. A button changes state.

---

## 2. When to Use

- Navigating to another page or route within the application.
- Navigating to an external URL.
- Opening a related resource, document, or help article.
- Referencing a destination inline within a block of body text.
- Providing a standalone navigation control in a list or interface region when a button would carry too much visual weight.

---

## 3. When Not to Use

- **Primary or secondary actions** — Use a button. Submitting a form, saving data, confirming a dialog, and triggering state changes are actions, not navigations.
- **Destructive operations** — Use a danger button. A link must not trigger deletion, removal, or irreversible changes.
- **Non-navigating controls** — Use a button with `ghost` variant. If clicking does not change location, it is an action, not a link.
- **Menu items in a dropdown** — Use the appropriate pattern component. Raw links inside menus do not carry correct ARIA semantics.

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Text label | Yes | The navigable text. Communicates the destination. Carries all text and color tokens. Must be descriptive on its own without surrounding context. |
| Leading icon | No | An icon placed before the text label. Reinforces the destination type (e.g., external link, document, folder). Must not replace the text label. |
| Trailing icon | No | An icon placed after the text label. Typically used to signal external destination or expansion. Must not replace the text label. |

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Text label — default variant | `color.text.brand` | Default link text color |
| Text label — subtle variant | `color.text.secondary` | Reduced-emphasis link text color |
| Text label — inverse variant | `color.text.inverse` | Link text on dark or brand-colored surfaces |
| Text label — visited | `color.text.secondary` | Visited state text color |
| Text label — disabled | `color.text.disabled` | Disabled state text color |
| Focus ring | `color.border.focus` | Keyboard focus indicator color |
| Leading icon | `color.text.brand` | Icon color matching the default text label |
| Leading icon — subtle | `color.text.secondary` | Icon color for subtle variant |
| Leading icon — inverse | `color.text.inverse` | Icon color for inverse variant |
| Trailing icon | `color.text.brand` | Icon color matching the default text label |
| Trailing icon — subtle | `color.text.secondary` | Icon color for subtle variant |
| Trailing icon — inverse | `color.text.inverse` | Icon color for inverse variant |
| Icon-to-label gap | `spacing.xs` | Space between icon and text label |
| Font size | `text.body.md` | Default body context font size (inherits from parent) |
| Transition | `motion.fast` | Color and decoration state transitions |

---

## 6. Variants

| Variant | Default | Text color token | Use case |
|---|---|---|---|
| Default | Yes | `color.text.brand` | Standard navigation links within body text, tables, and interface regions on neutral surfaces. |
| Subtle | No | `color.text.secondary` | Lower-emphasis links in dense interfaces, metadata sections, or secondary navigation where brand color would compete with primary content. |
| Inverse | No | `color.text.inverse` | Links placed on dark, brand-colored, or image backgrounds where brand text color would not meet contrast requirements. |

All variants share the same structural anatomy, states, and behavior. The difference is text and icon color only.

---

## 7. Sizes

A link inherits its font size from the typographic context in which it is placed. It does not define its own fixed size.

| Context | Token | Use case |
|---|---|---|
| Large body | `text.body.lg` | Introductory paragraphs, feature descriptions, prominent inline navigation. |
| Default body | `text.body.md` | Standard body text, form helper text, table cells. |
| Small body | `text.body.sm` | Secondary copy, captions, dense metadata regions. |
| Caption | `text.caption` | Timestamps, fine print, minimum-size contexts. |

Do not set font size on the link element directly. Allow it to inherit from the surrounding text node.

---

## 8. States

| State | Visual change | Token applied |
|---|---|---|
| Default | Underline visible. Color at rest. | `color.text.brand` (default), `color.text.secondary` (subtle), `color.text.inverse` (inverse) |
| Hover | Underline retained. Color shifts toward primary text. Text decoration weight increases. | `color.text.primary` (default and subtle), `color.text.inverse` (inverse, no change) |
| Focused | Focus ring appears at 2px offset. Color and underline unchanged. | `color.border.focus` (2px outline, 2px offset) |
| Active | Color shifts momentarily during click. Underline retained. | `color.text.primary` |
| Visited | Color shifts to indicate the destination has been seen. Underline retained. | `color.text.secondary` |
| Disabled | Color muted. No underline. Pointer cursor removed. Not keyboard focusable. | `color.text.disabled` |

Transitions on color and text-decoration use `motion.fast`. No transition is applied on disable or visited state change.

---

## 9. Behavior

**Mouse**
- Click navigates to the destination URL.
- Right-click exposes the browser context menu with standard link options (open in new tab, copy link, etc.).
- Hover activates the hover state and changes cursor to pointer.

**Keyboard**
- `Tab` moves focus to the link.
- `Enter` activates the link and navigates to the destination.
- `Shift+Tab` moves focus to the previous interactive element.

**External links**
- Links opening in a new tab or window must set `target="_blank"` and `rel="noopener noreferrer"`.
- A trailing icon indicating external destination is strongly recommended. The icon must include `aria-label` or an adjacent visually hidden label to announce the behavior to screen readers.

**Animation**
- Color transition on hover and active states uses `motion.fast`.
- No layout shift or dimension change occurs on any state transition.

**RTL and LTR**
- In RTL layouts, leading icons appear after the label and trailing icons appear before it. Use logical CSS for internal gap (`gap` with logical flex direction).
- Directional icons (external link arrow, back arrow) must flip in RTL. Apply `transform: scaleX(-1)` when `dir="rtl"` is active. Decorative icons do not flip.

---

## 10. Accessibility

| Requirement | Rule |
|---|---|
| ARIA role | Implicit role is `link` via the native `<a>` element. Do not override with `role="button"` unless the element is used as a button — in that case, use a button element instead. |
| Keyboard access | All links must be reachable and activatable via keyboard. `Tab` to focus, `Enter` to activate. |
| Focus indicator | A visible focus ring is required on all variants. Apply a 2px outline using `color.border.focus` with `outline-offset: 2px`. Never suppress focus without a replacement indicator. |
| Accessible name | Every link must have a descriptive accessible name. The name is derived from the text label. For icon-accompanied links, the text label provides the name; icons must carry `aria-hidden="true"`. |
| Do not rely on color alone | Links must be visually distinguishable from surrounding non-interactive text by means other than color. Underline is mandatory in body text contexts. |
| Disabled links | Disabled links must be non-interactive. Remove the `href` attribute rather than using `aria-disabled` alone. A link without `href` is not keyboard focusable and is correctly excluded from tab order. |
| External link announcement | When `target="_blank"` is used, include a visually hidden text node or `aria-label` suffix such as "opens in a new tab" to inform screen reader users before navigation. |
| Visited state | Do not suppress the visited state. Visited styling must remain distinct from default and hover to communicate navigation history. |
| Color contrast | Text color against its background must meet WCAG 2.1 AA: 4.5:1 minimum for normal text. `color.text.brand`, `color.text.secondary`, and `color.text.inverse` tokens satisfy this requirement on their respective surfaces. |
| WCAG criteria | Applies SC 1.4.1 (Use of Color), SC 1.4.3 (Contrast Minimum), SC 2.1.1 (Keyboard), SC 2.4.4 (Link Purpose), SC 2.4.7 (Focus Visible). |

---

## 11. Content Guidelines

| Rule | Detail |
|---|---|
| Describe the destination | The text label must communicate where the link leads, not the action of clicking. "Accessibility documentation" is correct. "Click here for docs" is not. |
| Avoid "click here" and "learn more" alone | These phrases are meaningless when read out of context by a screen reader. If used, supplement with a visually hidden destination name or `aria-label`. |
| Use sentence case | Link labels follow the surrounding prose case convention. Do not capitalize unnecessarily. |
| Keep labels concise | Link text should be the minimum length needed to describe the destination clearly. Avoid linking entire sentences. |
| Match label to destination | The label must accurately predict the page or content the user will land on. Misleading labels erode trust. |
| Distinguish internal from external | When a link opens an external domain or a new tab, indicate this visually (trailing icon) and to screen readers (hidden text). |
| Do not use punctuation as part of the link | Trailing commas, periods, and parentheses must not be included in the linked text region. |

---

## 12. Code Example

```html
<!-- Default link -->
<a href="/documentation" class="link">
  Documentation
</a>

<!-- Link with trailing icon (external) -->
<a href="https://example.com" class="link" target="_blank" rel="noopener noreferrer">
  External resource
  <span class="link__icon link__icon--trailing" aria-hidden="true">↗</span>
  <span class="visually-hidden">opens in a new tab</span>
</a>

<!-- Link with leading icon -->
<a href="/files/report.pdf" class="link">
  <span class="link__icon link__icon--leading" aria-hidden="true">📄</span>
  Download report
</a>

<!-- Subtle variant -->
<a href="/help" class="link link--subtle">
  Help center
</a>

<!-- Inverse variant (on dark surface) -->
<a href="/terms" class="link link--inverse">
  Terms of service
</a>
```

```css
.link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-text-brand);
  text-decoration: underline;
  cursor: pointer;
  transition: color var(--motion-fast), text-decoration-color var(--motion-fast);
}

.link:hover {
  color: var(--color-text-primary);
}

.link:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  border-radius: var(--radius-xs);
}

.link:active {
  color: var(--color-text-primary);
}

.link:visited {
  color: var(--color-text-secondary);
}

.link--subtle {
  color: var(--color-text-secondary);
}

.link--subtle:hover {
  color: var(--color-text-primary);
}

.link--subtle:visited {
  color: var(--color-text-secondary);
}

.link--inverse {
  color: var(--color-text-inverse);
}

.link--inverse:hover {
  color: var(--color-text-inverse);
}

/* Disabled state — remove href in markup instead of using this alone */
.link[aria-disabled="true"],
.link:not([href]) {
  color: var(--color-text-disabled);
  text-decoration: none;
  pointer-events: none;
  cursor: default;
}

.link__icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

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

- [button.md](./button.md) — Use when the interaction changes state or triggers an action rather than navigating
- [typography.md](../foundations/typography.md) — Font size primitives that links inherit from surrounding context
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all values used by this component
