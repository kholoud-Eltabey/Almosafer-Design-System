---
name: Tooltip
tier: atom
status: draft
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Tooltip

---

## 1. Overview

A tooltip is a small, non-interactive overlay that surfaces brief supporting text when a user hovers over or focuses a trigger element. It clarifies the purpose of an ambiguous control, expands an abbreviated label, or provides the accessible name for an icon-only element.

A tooltip is supplementary by nature. It must never carry information the user needs to complete a task, and it must never contain interactive content. Its role is to clarify what is already implied by context — not to introduce essential, new, or critical information.

---

## 2. When to Use

- Providing the visible label text for an icon button, so sighted mouse and keyboard users can confirm the action without reading the `aria-label` in the accessibility tree.
- Expanding an abbreviated or truncated label that could not fit in the available space.
- Adding brief contextual notes to a UI element whose label is compressed by design constraints.
- Explaining a disabled control — briefly, without actionable steps — so the user understands why it is unavailable.
- Surfacing keyboard shortcut information alongside a control that has one.

---

## 3. When Not to Use

- **Critical information** — If the user needs the content to complete an action or understand the consequences of an action, it does not belong in a tooltip. Use visible text, helper text, or a popover instead.
- **Error messages or validation feedback** — Error messages must always be persistently visible and associated with their control. A tooltip cannot replace them.
- **Interactive content** — Tooltips must not contain links, buttons, inputs, or any interactive element. A user cannot reliably move focus into a tooltip. Use a popover or dialog instead.
- **Long explanations** — More than two short lines of text indicates the content belongs in a helper text field, a popover, or an inline description, not a tooltip.
- **Mobile-only interfaces** — Hover does not exist on touch-primary devices. Tooltips are unreliable as the sole delivery mechanism for any content on touch interfaces. Ensure the information is available through another persistent channel.
- **As the sole accessible name of a control** — A tooltip supplements `aria-label`. It does not replace it. Do not omit `aria-label` from an icon button and depend on the tooltip to provide the name.

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Trigger | Yes | The existing interactive element that owns the tooltip — a button, icon button, link, or any focusable control. The trigger is not part of the tooltip component itself; it is the element the tooltip is associated with via `aria-describedby`. The trigger must already have an accessible name. |
| Tooltip container | Yes | The floating overlay element. Carries background, border (inverse variant only), radius, and spacing tokens. Positioned adjacent to the trigger with a consistent gap. Carries `role="tooltip"` and an `id` that the trigger's `aria-describedby` references. |
| Tooltip text | Yes | The visible copy inside the container. Short, specific, and non-interactive. Carries text color and typography tokens. |
| Arrow | No | A small directional pointer extending from the container toward the trigger. Decorative — it carries `aria-hidden="true"` and is not announced to screen readers. Matches the container background token. The inverse variant arrow also matches the container border token on its two outward-facing edges. |

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Container — background (default) | `color.background.inverse` | Dark surface for the default tooltip on light backgrounds |
| Container — background (inverse) | `color.background.surface` | Light surface for the inverse tooltip on dark backgrounds |
| Container — border (inverse only) | `color.border.default` | Border to separate the inverse tooltip from dark surfaces |
| Container — border width (inverse only) | `border.width.default` | Border width for the inverse tooltip container and arrow border |
| Tooltip text — default | `color.text.inverse` | Text color on the dark default container |
| Tooltip text — inverse | `color.text.primary` | Text color on the light inverse container |
| Arrow — default | `color.background.inverse` | Arrow fill matching the default container |
| Arrow — inverse fill | `color.background.surface` | Arrow fill matching the inverse container |
| Arrow — inverse border | `color.border.default` | Arrow border on the two exposed edges of the inverse variant |
| Container — radius | `radius.xs` | Micro rounding applied to all tooltip containers |
| Container — padding (vertical) | `spacing.xs` | Top and bottom internal padding |
| Container — padding (horizontal) | `spacing.sm` | Left and right internal padding |
| Gap — trigger to tooltip | `spacing.xs` | Space between the trigger element and the tooltip container |
| Tooltip text — font size | `text.body.sm` | Text size for all tooltip content |
| Tooltip text — line height | `line-height-normal` | Line height for tooltip copy |
| Entry transition | `motion.enter` | Opacity transition when the tooltip becomes visible |
| Exit transition | `motion.exit` | Opacity transition when the tooltip is dismissed |

---

## 6. Variants

### Default

For use on light and neutral page surfaces. Dark container with inverse text. The highest contrast tooltip presentation — readable against most backgrounds where the trigger lives on a light surface.

| Part | Token |
|---|---|
| Container background | `color.background.inverse` |
| Text | `color.text.inverse` |
| Arrow | `color.background.inverse` |
| Border | None |
| Radius | `radius.xs` |

This is the standard tooltip for most product contexts: icon buttons in toolbars, abbreviated column headers in tables, truncated labels in navigation.

---

### Inverse

For use on dark or brand-colored surfaces where the default dark tooltip would merge with the background and become unreadable. Light container with a border to separate it from the dark surface.

| Part | Token |
|---|---|
| Container background | `color.background.surface` |
| Text | `color.text.primary` |
| Arrow fill | `color.background.surface` |
| Arrow border | `color.border.default` |
| Border | `color.border.default` |
| Radius | `radius.xs` |

Use the inverse variant inside dark panels, dark navigation bars, filled hero sections, and any surface using `color.background.inverse` as its own background.

---

## 7. Sizes

Tooltip size is content-based. The container expands to fit the text with consistent padding. No fixed width or height is defined. No size variants exist.

| Property | Token | Rule |
|---|---|---|
| Vertical padding | `spacing.xs` | Fixed. Does not change with content length. |
| Horizontal padding | `spacing.sm` | Fixed. Does not change with content length. |
| Font size | `text.body.sm` | Fixed. All tooltip text uses the same size. |
| Maximum width | Implementation-defined | Set at the product level. Text wraps to a second line before the container exceeds the implementation maximum. A second line is the absolute limit — tooltips with more content require a popover. |

The tooltip never clips or truncates its own text. If content exceeds a second line, the content itself must be shortened. Do not reduce font size or padding to accommodate more text.

---

## 8. States

The tooltip is either hidden or visible. The trigger interaction that causes the transition determines the appearance delay.

| State | Trigger condition | Visibility | Delay | Transition |
|---|---|---|---|---|
| Hidden | Default; trigger not hovered or focused | Not rendered | — | — |
| Visible (hover) | Pointer is over the trigger | Rendered, fully visible | Short debounce before appearance to prevent spurious flicker on fast mouse traversal | `motion.enter` on opacity |
| Visible (focused) | Trigger has received keyboard focus | Rendered, fully visible | None — appears immediately on focus for keyboard users | `motion.enter` on opacity |
| Exiting | Hover ended or focus lost | Fading, about to be removed | — | `motion.exit` on opacity, then removed from DOM |

**Rules:**

- The debounce delay on hover is an implementation value, not a token. It must not be long enough to feel broken on deliberate hover. It prevents tooltips from appearing when the pointer briefly crosses the trigger while moving toward another target.
- Keyboard focus must show the tooltip immediately with no delay. Keyboard users cannot hover — a delay penalises them.
- Pressing `Escape` must dismiss a visible tooltip and return focus to the trigger. The tooltip must not reappear unless the trigger is focused or hovered again.
- The tooltip must not appear or persist on touch events. On touch-primary devices, the tooltip is not a reliable interaction model. Do not simulate hover-on-tap unless the product has a confirmed desktop-first audience.
- The tooltip disappears when the trigger is clicked, activated, or loses focus. It does not persist through or after interaction.

---

## 9. Behavior

**Positioning**
- The tooltip appears adjacent to its trigger with a gap of `spacing.xs`.
- The default position is above the trigger. The positioning engine adjusts to below, left, or right when the preferred position lacks sufficient space within the viewport.
- The tooltip must never overflow the viewport. It must never occlude the trigger element itself.
- The arrow, when present, always points toward the trigger regardless of which position is active.

**Mouse**
- Tooltip becomes visible after a short debounce delay when the pointer enters the trigger's bounding box.
- Tooltip dismisses immediately when the pointer leaves the trigger's bounding box.
- Moving the pointer from the trigger to the tooltip container itself must not dismiss the tooltip — the tooltip region extends the hover target when the pointer path intersects it. This applies only when the arrow and container are close enough to the trigger for the pointer to reach without leaving the trigger area.

**Keyboard**
- Tooltip becomes visible immediately when the trigger receives focus via `Tab`.
- Tooltip dismisses when the trigger loses focus via `Tab`, `Shift+Tab`, or any other focus-moving interaction.
- `Escape` dismisses the tooltip while keeping focus on the trigger.
- No other key interaction is defined for the tooltip. The tooltip has no keyboard navigation of its own.

**Appearance and disappearance**
- Tooltip enters using `motion.enter` applied to opacity. Position is fixed at the target coordinates before the transition begins — the tooltip does not fly in from a direction.
- Tooltip exits using `motion.exit` applied to opacity, then is removed from the DOM.
- The tooltip must not reflow surrounding content. It is always positioned out of the document flow using absolute or fixed positioning.

**Reduced motion**
- When `prefers-reduced-motion: reduce` is active, the opacity transitions are either instant or replaced by the shortest available duration. The tooltip still appears and disappears — motion is reduced, not removed.

---

## 10. Accessibility

| Requirement | Rule |
|---|---|
| ARIA role | The tooltip container must carry `role="tooltip"` and a unique `id`. |
| Trigger association | The trigger element must carry `aria-describedby` referencing the tooltip's `id`. This exposes the tooltip text as a description — supplementary to, not a replacement for, the trigger's accessible name. |
| Tooltip is not the accessible name | The trigger must have its own `aria-label` or visible text label. `aria-describedby` adds description; it does not supply the name. An icon button with `aria-describedby` but no `aria-label` is inaccessible. |
| Keyboard visibility | The tooltip must appear when the trigger receives keyboard focus and disappear on blur. Keyboard users must be able to read the tooltip content without using a mouse. |
| No focus inside the tooltip | The tooltip must not contain any focusable element. If the user presses `Tab` while the tooltip is visible, focus must move to the next focusable element in the page — not into the tooltip. |
| Escape dismissal | Pressing `Escape` while a tooltip is visible must dismiss it. This is required by WCAG SC 1.4.13 (Content on Hover or Focus). |
| Persistent hover | When the pointer moves from the trigger onto the tooltip container, the tooltip must remain visible. WCAG SC 1.4.13 requires that hoverable content not dismiss when the pointer moves over it. |
| No obstruction of content | The tooltip must not cover interactive elements the user needs. Positioning must account for adjacent controls. |
| Not the sole information source | Any information in a tooltip must also be available through another persistent mechanism — visible text, accessible name, or page content. A tooltip that disappears on blur cannot be the only place critical information lives. |
| Touch devices | Tooltips triggered exclusively by hover are inaccessible on touch-primary devices. Ensure an alternative persistent information channel exists. |
| Color contrast | Tooltip text must meet WCAG 2.1 AA: 4.5:1 minimum. `color.text.inverse` on `color.background.inverse` and `color.text.primary` on `color.background.surface` satisfy this requirement for their respective variants. |
| WCAG criteria | Applies SC 1.4.3 (Contrast Minimum), SC 1.4.13 (Content on Hover or Focus), SC 2.1.1 (Keyboard), SC 4.1.3 (Status Messages). |

---

## 11. Content Guidelines

- **One short phrase or sentence — maximum two lines.** If the content requires more, it belongs in a popover, helper text, or inline description. Do not compress long content into a tooltip.
- **Write what the element does, not what it is.** For icon buttons: "Copy link address" rather than "Copy icon". For abbreviated labels: "Last modified date" rather than "LMD".
- **Sentence case, no ending punctuation.** "Archive this project" is correct. "Archive this project." and "Archive This Project" are not.
- **No HTML markup inside tooltip text.** Tooltips render plain text only. Bold, italic, and linked text are not permitted. If structured content is needed, use a popover.
- **No interactive instructions.** Do not write "Click to expand" or "Press Enter to confirm" in a tooltip. The tooltip cannot remain visible long enough for the user to act on instructions within it.
- **Keyboard shortcuts may be included.** Brief shortcut notation is acceptable as supplementary content: "Delete ⌫" or "Undo (Ctrl+Z)". Keep it concise and consistent with the system's shortcut notation.
- **Avoid repeating the trigger label exactly.** A tooltip that reads identically to the visible label of its trigger adds no value. Either remove the tooltip or provide genuinely supplementary information.
- **Avoid vague filler.** "More info", "See details", and "Help" are not acceptable tooltip content. Name the specific information or omit the tooltip.

---

## 12. Code Example

```html
<!-- Icon button with tooltip — default variant -->
<div class="tooltip-wrapper">
  <button
    class="icon-button icon-button--md"
    type="button"
    aria-label="Copy link"
    aria-describedby="tooltip-copy"
  >
    <svg class="icon-button__icon" aria-hidden="true" focusable="false">
      <use href="/icons/sprite.svg#copy" />
    </svg>
  </button>

  <div
    id="tooltip-copy"
    role="tooltip"
    class="tooltip tooltip--default"
    hidden
  >
    Copy link address
    <span class="tooltip__arrow" aria-hidden="true"></span>
  </div>
</div>

<!-- Icon button with tooltip — inverse variant (on dark surface) -->
<div class="tooltip-wrapper">
  <button
    class="icon-button icon-button--md"
    type="button"
    aria-label="Settings"
    aria-describedby="tooltip-settings"
  >
    <svg class="icon-button__icon" aria-hidden="true" focusable="false">
      <use href="/icons/sprite.svg#settings" />
    </svg>
  </button>

  <div
    id="tooltip-settings"
    role="tooltip"
    class="tooltip tooltip--inverse"
    hidden
  >
    Open account settings
    <span class="tooltip__arrow" aria-hidden="true"></span>
  </div>
</div>

<!-- Abbreviated label with tooltip -->
<div class="tooltip-wrapper">
  <span
    class="table-header"
    tabindex="0"
    aria-describedby="tooltip-lmd"
  >
    LMD
  </span>

  <div id="tooltip-lmd" role="tooltip" class="tooltip tooltip--default" hidden>
    Last modified date
    <span class="tooltip__arrow" aria-hidden="true"></span>
  </div>
</div>
```

```css
/* Wrapper — establishes positioning context */
.tooltip-wrapper {
  position: relative;
  display: inline-flex;
}

/* Tooltip container */
.tooltip {
  position: absolute;
  bottom: calc(100% + var(--spacing-xs));
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-xs);
  font-size: var(--text-body-sm-size);
  line-height: var(--line-height-normal);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  animation: tooltip-enter var(--motion-enter) forwards;
}

/* Visible state — toggled by JS removing the hidden attribute */
.tooltip:not([hidden]) {
  opacity: 1;
}

.tooltip[hidden] {
  display: none;
}

/* Default variant */
.tooltip--default {
  background: var(--color-background-inverse);
  color: var(--color-text-inverse);
}

/* Inverse variant */
.tooltip--inverse {
  background: var(--color-background-surface);
  color: var(--color-text-primary);
  border-width: var(--border-width-default);
  border-style: solid;
  border-color: var(--color-border-default);
}

/* Arrow — default */
.tooltip--default .tooltip__arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: var(--spacing-xs) solid transparent;
  border-right: var(--spacing-xs) solid transparent;
  border-top: var(--spacing-xs) solid var(--color-background-inverse);
}

/* Arrow — inverse */
.tooltip--inverse .tooltip__arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: var(--spacing-xs) solid transparent;
  border-right: var(--spacing-xs) solid transparent;
  border-top: var(--spacing-xs) solid var(--color-border-default);
}

/* Entry transition */
@keyframes tooltip-enter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Exit — apply class before removing */
.tooltip.is-exiting {
  animation: tooltip-exit var(--motion-exit) forwards;
}

@keyframes tooltip-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .tooltip,
  .tooltip.is-exiting {
    animation: none;
    transition: none;
  }
}
```

---

## 13. Cross References

- [icon-button.md](./icon-button.md) — Primary consumer of the tooltip; every icon button should surface its accessible label as a tooltip on hover and focus
- [icon.md](./icon.md) — Informative icons in ambiguous contexts may use a tooltip to clarify their meaning
- [motion.md](../foundations/motion.md) — Motion foundation governing the enter and exit transition values and reduced motion requirements
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all values used by this component
