---
name: Icon
tier: atom
status: draft
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Icon

---

## 1. Overview

An icon is a visual symbol that supports meaning, reinforces an action, or communicates status at a glance. Icons reduce cognitive load by pairing visual recognition with text, but they do not replace text for critical information.

Icons are always intentional. Every icon in the system must be clear, simple, and drawn from the approved icon library. Icons that introduce ambiguity or operate without a text label or accessible name are not permitted in production interfaces.

---

## 2. When to Use

- Alongside a text label to reinforce the meaning of an action or navigation item.
- As a leading or trailing element inside a button or link to add visual context.
- As a status indicator paired with a text label (success, warning, danger, info).
- As a standalone interactive element when space is constrained — only when the icon metaphor is universally recognizable and an accessible label is provided.
- As a decorative element to add visual rhythm or support illustration in empty states or onboarding flows.

---

## 3. When Not to Use

- **As the sole indicator of a critical action** — Use a labelled button. Icon-only actions require universal recognition that most product icons do not have.
- **As a replacement for text in status communication** — Pair with a badge or label. Color and shape alone do not meet accessibility requirements.
- **As a navigation item without a label** — Use a labelled link or navigation component. Icon-only navigation creates ambiguity for new users and screen reader users.
- **For decorative illustration in dense data contexts** — Use plain text. Icons in tables or form labels must carry direct semantic relevance.
- **To fill visual space without meaning** — Every icon must have a reason to exist. Remove icons that do not add clarity.

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Icon glyph | Yes | The SVG symbol itself. Drawn on a consistent artboard. Carries the visual metaphor. Rendered inline as an `<svg>` element to allow color inheritance via `currentColor`. |
| Container | No | An optional bounding box wrapping the glyph. Used when the icon needs a padded touch target (interactive variant) or a background fill (status context). Carries spacing and radius tokens when present. |

The glyph uses `currentColor` for fill and stroke so it inherits color from its CSS context. No color is hardcoded inside the SVG markup.

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Glyph — default | `color.text.secondary` | Default icon color in body content and supporting UI regions |
| Glyph — primary content | `color.text.primary` | Icon accompanying primary text or high-emphasis content |
| Glyph — brand / interactive | `color.text.brand` | Interactive icon color; icon inside a link or brand-colored control |
| Glyph — subtle | `color.text.subtle` | Low-emphasis decorative or tertiary icons |
| Glyph — inverse | `color.text.inverse` | Icon on dark or brand-colored surfaces |
| Glyph — success | `color.status.success` | Success status icon |
| Glyph — warning | `color.status.warning` | Warning status icon |
| Glyph — danger | `color.status.danger` | Danger or error status icon |
| Glyph — disabled | `color.text.disabled` | Disabled state icon color |
| Container — focus ring | `color.border.focus` | Keyboard focus ring on interactive icon |
| Container — hover background | `color.background.subtle` | Background tint on interactive icon hover |
| Container — active background | `color.background.selected` | Background tint on interactive icon press |
| Container — disabled background | `color.background.disabled` | Disabled state container background |
| Container — padding | `spacing.xs` | Internal padding between glyph and container edge |
| Container — radius | `radius.full` | Container shape for circular icon button affordance |
| Size — small | `spacing.sm` | Width and height of the glyph at small size |
| Size — medium | `spacing.md` | Width and height of the glyph at medium size |
| Size — large | `spacing.lg` | Width and height of the glyph at large size |
| Transition | `motion.fast` | Color and background transitions on interactive state changes |

---

## 6. Variants

| Variant | Default | Description |
|---|---|---|
| Default | Yes | An informative icon that carries semantic meaning and must have an accessible label if used without adjacent visible text. Used for status indicators, leading icons in navigation, and paired icon-label combinations. |
| Interactive | No | An icon that is itself a clickable or focusable control. Implemented as a `<button>` or `<a>` element wrapping the glyph. Must have an `aria-label`. Renders a container with hover, active, and focus states. |
| Decorative | No | An icon that is purely visual and adds no semantic information. Hidden from assistive technology via `aria-hidden="true"`. Used for illustration, rhythm, and visual support where adjacent text carries the full meaning. |

**Rules:**

- Do not use the decorative variant for icons that a user needs to understand the interface.
- Do not use the default variant inside a button or link without ensuring the parent element carries the accessible name.
- The interactive variant must never be implemented as a `<div>` or `<span>` with a click handler.

---

## 7. Sizes

| Size | Token | Use case |
|---|---|---|
| Small | `spacing.sm` | Inline icons alongside caption or body-small text. Dense tables, compact controls, metadata regions. |
| Medium | `spacing.md` | Default. Paired with standard body text in buttons, links, navigation items, and form fields. |
| Large | `spacing.lg` | Standalone icons in empty states, feature callouts, or high-emphasis UI regions where the icon carries visual prominence. |

Icons scale uniformly — width and height reference the same token. Do not scale width and height independently. Do not set icon dimensions in raw values.

---

## 8. States

States apply to the interactive variant only. The default and decorative variants are not interactive and render no state changes.

| State | Glyph color | Container background | Border / Ring | Transition |
|---|---|---|---|---|
| Default | `color.text.secondary` | Transparent | None | — |
| Hover | `color.text.primary` | `color.background.subtle` | None | `motion.fast` on color and background |
| Focused | Unchanged from default | Unchanged | `color.border.focus` (2px ring, 2px offset) | `motion.fast` on ring |
| Active | `color.text.primary` | `color.background.selected` | None | `motion.fast` |
| Disabled | `color.text.disabled` | `color.background.disabled` | None | None |

**Rules:**

- Disabled interactive icons must not be keyboard focusable. Use the native `disabled` attribute on the `<button>` element.
- Hover and active states must be visually distinct. Do not use the same background for both.
- Focus ring must never be suppressed without a CSS replacement.
- When an icon inherits its interactive state from a parent button or link, it does not render its own container states. The parent element owns the state.

---

## 9. Behavior

**Standalone interactive icon**
- Implemented as a native `<button>` element with a visible or accessible label.
- `Tab` moves focus to the icon button. `Enter` or `Space` activates it.
- Hover activates the hover state and changes cursor to pointer.
- Click triggers exactly one action. No double-binding.

**Icon inside a button or link**
- The icon inherits all interaction states from the parent element. It does not define its own hover, focus, or active behavior.
- The icon is decorative within the parent context. It carries `aria-hidden="true"`.
- The parent element's accessible name covers the icon. Do not add a redundant label to the icon itself.

**Icon inside a status context**
- Paired with a text label or badge. The icon reinforces the status visually.
- When the status changes (success → danger), the icon glyph and color update. Transitions use `motion.fast`.
- Do not animate the glyph on status changes. Replace it. Animation applies to color and background only.

**Sizing and alignment**
- Icons align to the center of the adjacent text baseline using `align-items: center` on the parent flex container.
- Icons do not scale with browser font size adjustments unless sized with a typography-relative token. Use spacing tokens for fixed sizing and typography tokens for fluid sizing contexts.

**RTL and LTR**
- Icons that imply direction — arrows, back/forward controls, chevrons — must be mirrored in RTL layouts. Apply `transform: scaleX(-1)` when `dir="rtl"` is active, or use direction-aware SVG variants from the approved library.
- Decorative icons do not flip. Status icons (success, warning, danger) do not flip.

---

## 10. Accessibility

| Requirement | Rule |
|---|---|
| Decorative icons | Must carry `aria-hidden="true"` and no `title` element inside the SVG. They contribute nothing to the accessible tree. |
| Informative icons (default variant) | Must have an accessible label. When adjacent visible text provides the label, no additional attribute is needed. When used alone, the parent element must carry `aria-label` or `aria-labelledby`. |
| Interactive icons | Must be a native `<button>` or `<a>` element. Must carry `aria-label` describing the action. Never use `<div>` or `<span>` with a click handler for interactive icons. |
| Keyboard access | Interactive icon buttons: `Tab` to focus, `Enter` or `Space` to activate. Disabled icons are removed from tab order via the native `disabled` attribute. |
| Focus indicator | A visible focus ring is required on all interactive icons. Apply a 2px outline using `color.border.focus` with `outline-offset: 2px`. Never suppress focus without a CSS replacement. |
| Do not rely on icon alone for meaning | Status icons (success, warning, danger) must be paired with a text label or badge. An icon's shape and color alone do not meet WCAG SC 1.4.1 (Use of Color) or SC 1.1.1 (Non-text Content). |
| SVG title element | Do not use `<title>` inside decorative SVGs. Use `<title>` only on informative standalone SVGs that have no adjacent text label, and associate it with `aria-labelledby`. |
| Minimum touch target | Interactive icon buttons must meet a minimum 44×44 touch target. Use container padding (`spacing.xs`) and a minimum container size to meet this requirement. Do not reduce the container below the minimum in touch contexts. |
| Color contrast | Icon color against its background must meet WCAG 2.1 AA: 3:1 for UI components and graphical objects (SC 1.4.11). All defined icon color tokens satisfy this on their intended surfaces. |
| WCAG criteria | Applies SC 1.1.1 (Non-text Content), SC 1.4.1 (Use of Color), SC 1.4.11 (Non-text Contrast), SC 2.1.1 (Keyboard), SC 2.4.7 (Focus Visible). |

---

## 11. Content Guidelines

- **Use recognizable metaphors.** Icons must map to a widely understood visual concept. A magnifying glass for search, a pencil for edit, a trash can for delete. Do not use internal or invented metaphors.
- **Avoid ambiguous icons.** If an icon's meaning requires a tooltip to understand, reconsider using it. Replace ambiguous icons with a text label, or add a persistent visible label.
- **Do not use the same icon for two different actions.** Every distinct action in the system maps to a distinct icon. Reusing an icon glyph for multiple meanings creates confusion and breaks visual consistency.
- **Match icon weight to text weight.** A bold icon alongside light body text creates visual imbalance. Icons should align with the visual weight of their surrounding content.
- **Draw from the approved library.** Do not introduce custom or one-off icons without going through the design review process. New icons must be added to the library before use in production.
- **Icon-only interfaces are not self-explanatory.** When in doubt, add a label. Icon-only navigation is only acceptable when research confirms universal recognition in the product's audience.

---

## 12. Code Example

```html
<!-- Decorative icon — hidden from assistive technology -->
<button class="button" type="button">
  <svg class="icon icon--md" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#plus" />
  </svg>
  Add item
</button>

<!-- Informative icon — label provided by adjacent text -->
<span class="status">
  <svg class="icon icon--sm icon--success" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#check-circle" />
  </svg>
  <span>Published</span>
</span>

<!-- Interactive icon button — standalone, accessible label required -->
<button class="icon-button" type="button" aria-label="Close dialog">
  <svg class="icon icon--md" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#x" />
  </svg>
</button>
```

```css
/* Base icon */
.icon {
  display: inline-flex;
  flex-shrink: 0;
  color: var(--color-text-secondary);
}

/* Sizes */
.icon--sm {
  width: var(--spacing-sm);
  height: var(--spacing-sm);
}

.icon--md {
  width: var(--spacing-md);
  height: var(--spacing-md);
}

.icon--lg {
  width: var(--spacing-lg);
  height: var(--spacing-lg);
}

/* Color variants */
.icon--primary   { color: var(--color-text-primary); }
.icon--brand     { color: var(--color-text-brand); }
.icon--subtle    { color: var(--color-text-subtle); }
.icon--inverse   { color: var(--color-text-inverse); }
.icon--success   { color: var(--color-status-success); }
.icon--warning   { color: var(--color-status-warning); }
.icon--danger    { color: var(--color-status-danger); }
.icon--disabled  { color: var(--color-text-disabled); }

/* Interactive icon button */
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xs);
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: color var(--motion-fast), background var(--motion-fast);
}

.icon-button:hover {
  color: var(--color-text-primary);
  background: var(--color-background-subtle);
}

.icon-button:active {
  color: var(--color-text-primary);
  background: var(--color-background-selected);
}

.icon-button:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

.icon-button:disabled {
  color: var(--color-text-disabled);
  background: var(--color-background-disabled);
  cursor: not-allowed;
}
```

---

## 13. Cross References

- [button.md](./button.md) — Icons used inside buttons inherit button interaction states; icon-only actions should use a button element
- [link.md](./link.md) — Icons used inside links inherit link interaction states and carry `aria-hidden="true"`
- [typography.md](../foundations/typography.md) — Typography scale that icons align to in text contexts
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all values used by this component
