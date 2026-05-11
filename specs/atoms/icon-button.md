---
name: Icon Button
tier: atom
status: draft
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Icon Button

---

## 1. Overview

An icon button is a button whose visible content is an icon. It triggers a single, clearly scoped action in compact contexts where a labelled button would consume too much space. The action must be immediately clear from the icon metaphor and its surrounding context.

An icon button is not a substitute for a labelled button when space allows. It is appropriate only when the action is well-known, contextually unambiguous, and accompanied by an accessible label for users who cannot see the icon.

---

## 2. When to Use

- Triggering a single action in a toolbar, table row, card header, or panel where space is constrained.
- Actions that are universally recognizable from their icon: close, edit, delete, copy, search, expand, collapse.
- Repeating actions in dense list or grid contexts where a labelled button would dominate the layout.
- Secondary or tertiary actions alongside a labelled primary button, when the icon action is supporting and familiar.

---

## 3. When Not to Use

- **When the action is not universally recognizable** — Use a labelled button. If the icon requires a tooltip to be understood, consider whether it should be an icon-only button at all.
- **For primary, high-consequence, or irreversible actions** — Use a labelled button. Deleting an account, submitting a payment, or revoking access requires an explicit label that cannot be misread.
- **As the only action control in an empty or unfamiliar context** — Use a labelled button with an icon. First-time users and infrequent users cannot reliably decode icon-only interfaces.
- **For navigation to another page** — Use a link or a labelled button. An icon button triggers an action; it does not navigate.
- **To replace a checkbox, radio button, or toggle** — Use the appropriate selection control. Icon buttons do not communicate persistent selected state.

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | The native `<button>` element. The interactive bounding box. Carries background, border, radius, spacing, and state tokens. Defines the touch target. Square by default — width and height reference the same size token. |
| Icon | Yes | An SVG glyph rendered inside the container. Always the decorative variant from the icon component — it carries `aria-hidden="true"`. The container's accessible label provides the meaning. Sized proportionally to the container using icon size tokens. |
| Accessible label | Yes | Not a visible element. Provided via `aria-label` on the container button element. Describes the action the button performs. Required without exception — there is no visible text to fall back on. |
| Loading indicator | Conditional | Replaces the icon during an async operation. A spinner or equivalent motion indicator. Prevents duplicate action submission. Must not change the container dimensions. |

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Icon — default variant | `color.text.secondary` | Default icon color at rest |
| Icon — default variant hover / active | `color.text.primary` | Icon color on hover and active |
| Icon — subtle variant | `color.text.subtle` | Subtle variant icon color at rest |
| Icon — subtle variant hover / active | `color.text.secondary` | Subtle variant icon color on hover and active |
| Icon — danger variant | `color.text.danger` | Danger variant icon color at rest and hover |
| Icon — disabled | `color.text.disabled` | Icon color in disabled state across all variants |
| Container — hover background (default / subtle) | `color.background.subtle` | Background tint on hover |
| Container — active background (default / subtle) | `color.background.selected` | Background tint on press |
| Container — hover background (danger) | `color.background.danger` | Background tint on hover for danger variant |
| Container — active background (danger) | `color.background.danger` | Background tint on press for danger variant |
| Container — disabled background | `color.background.disabled` | Background in disabled state |
| Container — focus ring | `color.border.focus` | Keyboard focus outline color |
| Container — focus ring width | `border.width.focus` | Keyboard focus outline width |
| Container — radius (default) | `radius.lg` | Corner radius for standard icon button |
| Container — radius (circular) | `radius.full` | Corner radius for circular icon button |
| Padding — small | `spacing.xs` | Internal padding around the icon at small size |
| Padding — medium | `spacing.sm` | Internal padding around the icon at medium size |
| Padding — large | `spacing.md` | Internal padding around the icon at large size |
| Icon size — small | `spacing.sm` | Glyph width and height at small size |
| Icon size — medium | `spacing.md` | Glyph width and height at medium size |
| Icon size — large | `spacing.lg` | Glyph width and height at large size |
| Transition — states | `motion.fast` | Background and icon color transitions |
| Transition — loading | `motion.normal` | Loading indicator entry transition |

---

## 6. Variants

### Default

The standard icon button. Transparent background at rest with a secondary icon color. Appropriate for most toolbar, card, and row actions.

| State | Icon color | Background |
|---|---|---|
| Default | `color.text.secondary` | Transparent |
| Hover | `color.text.primary` | `color.background.subtle` |
| Active | `color.text.primary` | `color.background.selected` |
| Disabled | `color.text.disabled` | `color.background.disabled` |

---

### Subtle

Lower visual weight than default. Used when the icon button must recede further — in dense data regions, alongside primary content, or as a tertiary action competing with higher-priority controls.

| State | Icon color | Background |
|---|---|---|
| Default | `color.text.subtle` | Transparent |
| Hover | `color.text.secondary` | `color.background.subtle` |
| Active | `color.text.secondary` | `color.background.selected` |
| Disabled | `color.text.disabled` | `color.background.disabled` |

---

### Danger

Signals a destructive or irreversible action. Reserved for delete, remove, or revoke operations where no labelled button is present. Must be paired with a confirmation step or sufficient contextual clarity.

| State | Icon color | Background |
|---|---|---|
| Default | `color.text.danger` | Transparent |
| Hover | `color.text.danger` | `color.background.danger` |
| Active | `color.text.danger` | `color.background.danger` |
| Disabled | `color.text.disabled` | `color.background.disabled` |

**Rule:** Do not use the danger variant for recoverable actions. Reserve it for operations that delete, permanently remove, or revoke something.

---

## 7. Sizes

| Size | Container padding | Icon size token | Use case |
|---|---|---|---|
| Small | `spacing.xs` | `spacing.sm` | Dense tables, toolbars with multiple controls, compact card headers, inline actions within tight layouts. |
| Medium | `spacing.sm` | `spacing.md` | Default. Most panel headers, list row actions, and standard toolbar controls. |
| Large | `spacing.md` | `spacing.lg` | High-emphasis standalone actions, prominent empty-state controls, or contexts requiring an enlarged touch target. |

All sizes use `radius.lg` by default. Use `radius.full` when a circular button shape is required by the layout context. Container width and height are equal at all sizes — the button is always square or circular, never rectangular.

---

## 8. States

| State | Icon color | Background | Border / Ring | Notes |
|---|---|---|---|---|
| Default | Variant default | Transparent | None | Resting state. No visual treatment beyond the icon itself. |
| Hover | Variant hover | Variant hover | None | Transition: `motion.fast` on icon color and background. Cursor changes to pointer. |
| Focused | Unchanged | Unchanged | `color.border.focus` (2px, 2px offset) | Transition: `motion.fast` on ring. Focus ring must never be suppressed. |
| Active | Variant active | Variant active | None | Transition: `motion.fast`. Triggered on mousedown or `Enter` / `Space` keydown. |
| Disabled | `color.text.disabled` | `color.background.disabled` | None | Native `disabled` attribute. Removed from tab order. No pointer cursor. No events. |
| Loading | Replaced by indicator | Unchanged | None | `aria-busy="true"`. `aria-disabled="true"`. Transition: `motion.normal` on indicator entry. Container dimensions unchanged. |

**Rules:**

- Hover and active backgrounds must be visually distinct. Do not use the same background token for both.
- The loading state must prevent further clicks immediately. The indicator must appear before any async response returns.
- Disabled and loading states must not co-occur. A button in a loading state is implicitly non-interactive — do not also mark it `disabled` with the native attribute.
- The focus ring applies on top of all other states. A loading button that somehow receives focus must still show the focus ring.

---

## 9. Behavior

**Mouse**
- Click triggers exactly one action. Do not bind multiple handlers to the same icon button.
- Mousedown activates the active state. Mouseup on the same target confirms the click.
- Hover activates the hover state and sets cursor to pointer.
- Clicking a disabled icon button produces no response.

**Keyboard**
- `Tab` moves focus to the icon button. `Shift+Tab` moves focus to the previous interactive element.
- `Enter` or `Space` activates the button and triggers the action.
- No other keys activate the button.

**Loading**
- On activation, if the action is asynchronous, enter the loading state immediately.
- Set `aria-busy="true"` and `aria-disabled="true"` on the button element.
- Replace the icon with a loading indicator. Do not collapse or resize the container.
- On completion, restore the default state and remove `aria-busy` and `aria-disabled`.
- If the action fails, restore the default state and surface an error through the appropriate feedback pattern.

**Tooltip**
- An icon button should surface its accessible label as a visible tooltip on hover and focus for sighted mouse and keyboard users.
- The tooltip is a companion, not a substitute for `aria-label`. Both must be present.
- Do not rely on the tooltip alone to communicate what the button does. The action must also be derivable from the icon metaphor in context.

**Single responsibility**
- An icon button triggers exactly one action. Do not use a single icon button to toggle between two different actions (e.g., play/pause implemented as one button that changes its icon). Use `aria-pressed` with a consistent label, or two separate buttons managed by visibility.

---

## 10. Accessibility

| Requirement | Rule |
|---|---|
| Accessible name | Every icon button must have `aria-label` describing the action it performs. There is no visible text fallback. The label is mandatory without exception. |
| Label describes the action | `aria-label` must describe what happens when the button is activated — not what the icon looks like. `aria-label="Delete comment"` is correct. `aria-label="Trash icon"` is not. |
| Icon is hidden from assistive technology | The SVG icon inside the container must carry `aria-hidden="true"` and `focusable="false"`. It contributes nothing to the accessible name. |
| Keyboard access | `Tab` to focus. `Enter` or `Space` to activate. Disabled buttons are removed from tab order via the native `disabled` attribute. |
| Focus indicator | A visible 2px focus ring using `color.border.focus` at 2px offset is required on all variants and sizes. `outline: none` is not permitted without a CSS replacement. |
| Disabled state | Use the native `disabled` attribute. Do not use `aria-disabled` alone — it keeps the button in tab order, which is incorrect for a fully disabled control. |
| Loading state | Set `aria-busy="true"` on the button during loading. Announce the state change to screen readers using `aria-live` on a related status region if the operation affects other page content. |
| Touch target | Minimum 44×44 touch target required across all sizes. Verify that the small size container plus padding meets this threshold in touch contexts. If not, increase the touch target area with a transparent hit-area extension without changing the visual size. |
| Tooltip relationship | When a tooltip is present, associate it using `aria-describedby` pointing to the tooltip element. Do not use the tooltip as the sole source of the button's accessible name. |
| WCAG criteria | Applies SC 1.1.1 (Non-text Content), SC 1.4.3 (Contrast Minimum), SC 1.4.11 (Non-text Contrast), SC 2.1.1 (Keyboard), SC 2.4.7 (Focus Visible), SC 4.1.2 (Name, Role, Value). |

---

## 11. Content Guidelines

- **The accessible label must name the action, not the icon.** Write what the button does: "Close dialog", "Copy link", "Delete row", "Expand section". Never describe the icon glyph: "X", "Clipboard icon", "Trash".
- **Be specific when context requires it.** In a list of rows, "Delete" is ambiguous. "Delete comment" or "Delete project" removes ambiguity for screen reader users navigating a page with multiple icon buttons of the same type.
- **Keep the label concise.** One to four words. Screen readers announce the full label on focus — long labels interrupt reading flow.
- **Use sentence case.** "Edit profile" is correct. "Edit Profile" and "EDIT PROFILE" are not.
- **Avoid vague labels.** "Menu", "More", and "Options" are acceptable only when the button opens a clearly scoped menu whose contents are immediately surfaced. Avoid them when the button's destination is unclear.
- **The danger variant label must name the subject.** "Delete" alone is insufficient for a danger icon button without adjacent context. "Delete file" or "Remove member" prevents misactivation.
- **Do not include "button" in the label.** Screen readers already announce the role. `aria-label="Close dialog"` is correct. `aria-label="Close dialog button"` is redundant.

---

## 12. Code Example

```html
<!-- Default icon button -->
<button class="icon-button icon-button--md" type="button" aria-label="Copy link">
  <svg class="icon-button__icon" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#copy" />
  </svg>
</button>

<!-- Subtle icon button -->
<button class="icon-button icon-button--subtle icon-button--md" type="button"
        aria-label="Expand section">
  <svg class="icon-button__icon" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#chevron-down" />
  </svg>
</button>

<!-- Danger icon button -->
<button class="icon-button icon-button--danger icon-button--md" type="button"
        aria-label="Delete comment">
  <svg class="icon-button__icon" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#trash" />
  </svg>
</button>

<!-- Loading state -->
<button class="icon-button icon-button--md is-loading" type="button"
        aria-label="Save changes" aria-busy="true" aria-disabled="true">
  <svg class="icon-button__spinner" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#spinner" />
  </svg>
</button>

<!-- Disabled state -->
<button class="icon-button icon-button--md" type="button"
        aria-label="Edit record" disabled>
  <svg class="icon-button__icon" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#edit" />
  </svg>
</button>

<!-- With tooltip association -->
<button class="icon-button icon-button--md" type="button"
        aria-label="Share" aria-describedby="share-tooltip">
  <svg class="icon-button__icon" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#share" />
  </svg>
</button>
<div id="share-tooltip" role="tooltip">Share this page</div>
```

```css
/* Base container */
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: color var(--motion-fast), background var(--motion-fast);
}

/* Sizes */
.icon-button--sm {
  padding: var(--spacing-xs);
}

.icon-button--sm .icon-button__icon {
  width: var(--spacing-sm);
  height: var(--spacing-sm);
}

.icon-button--md {
  padding: var(--spacing-sm);
}

.icon-button--md .icon-button__icon {
  width: var(--spacing-md);
  height: var(--spacing-md);
}

.icon-button--lg {
  padding: var(--spacing-md);
}

.icon-button--lg .icon-button__icon {
  width: var(--spacing-lg);
  height: var(--spacing-lg);
}

/* Default variant states */
.icon-button:hover {
  color: var(--color-text-primary);
  background: var(--color-background-subtle);
}

.icon-button:active {
  color: var(--color-text-primary);
  background: var(--color-background-selected);
}

.icon-button:focus-visible {
  outline-width: var(--border-width-focus);
  outline-style: solid;
  outline-color: var(--color-border-focus);
  outline-offset: 2px;
}

.icon-button:disabled {
  color: var(--color-text-disabled);
  background: var(--color-background-disabled);
  cursor: not-allowed;
}

/* Subtle variant */
.icon-button--subtle {
  color: var(--color-text-subtle);
}

.icon-button--subtle:hover {
  color: var(--color-text-secondary);
  background: var(--color-background-subtle);
}

.icon-button--subtle:active {
  color: var(--color-text-secondary);
  background: var(--color-background-selected);
}

/* Danger variant */
.icon-button--danger {
  color: var(--color-text-danger);
}

.icon-button--danger:hover {
  color: var(--color-text-danger);
  background: var(--color-background-danger);
}

.icon-button--danger:active {
  color: var(--color-text-danger);
  background: var(--color-background-danger);
}

/* Circular shape */
.icon-button--circle {
  border-radius: var(--radius-full);
}

/* Loading state */
.icon-button.is-loading {
  cursor: not-allowed;
  pointer-events: none;
}

.icon-button__spinner {
  width: var(--spacing-md);
  height: var(--spacing-md);
  transition: opacity var(--motion-normal);
}
```

---

## 13. Cross References

- [button.md](./button.md) — Use when the action requires a visible text label; icon button follows the same element rules and state contract
- [icon.md](./icon.md) — The glyph inside an icon button uses the decorative icon variant; icon sizing tokens apply directly
- [tooltip.md](./tooltip.md) — Recommended companion for all icon buttons to surface the accessible label as a visible hint on hover and focus
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all values used by this component
