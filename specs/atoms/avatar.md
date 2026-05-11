---
name: Avatar
tier: atom
status: draft
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Avatar

---

## 1. Overview

An avatar represents a user, account, or entity within the interface. It displays an identifying visual — either a photograph, generated initials, or a fallback icon — at a consistent size in contexts such as comments, assignee fields, navigation headers, and user lists.

Avatars are not decorative. Every avatar represents a specific, identifiable entity. When an avatar is interactive, it must behave as a link or button and meet all associated keyboard and accessibility requirements.

---

## 2. When to Use

- Representing the currently authenticated user in a navigation header or account menu.
- Identifying the author of a comment, post, or content item.
- Displaying an assignee, collaborator, or team member in a task or record.
- Showing a participant list or avatar group in a shared context.
- Identifying a sender or recipient in a messaging or notification interface.

---

## 3. When Not to Use

- **As decoration** — Every avatar must represent a real, named entity. Do not use an avatar as a generic illustration or placeholder image that carries no identifying meaning.
- **For non-person entities without clear identity** — Use an icon or illustration. Avatars imply a named user or account.
- **As the sole identifier in a critical action context** — Pair the avatar with a visible name label. Do not rely on the avatar image alone to confirm identity before destructive or irreversible operations.
- **As a navigation link without an accessible label** — Every interactive avatar must carry an accessible name. Do not use an image or initials as the only affordance for navigation.
- **At very small sizes without accompanying text** — At sizes below the small token, icons lose recognizability. Use a text label instead.

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | The circular bounding shape. Carries background, border, radius, and size tokens. Clips the image or centers the initials and fallback icon. Always circular using `radius.full`. |
| Image | Conditional | A photograph or custom image of the entity. Displayed when a valid image URL is available. Fills the container completely. Requires a descriptive `alt` attribute. |
| Initials | Conditional | One or two characters derived from the entity's name. Displayed when no image is available and a name is known. Carries typography and text color tokens. |
| Fallback icon | Conditional | A generic person icon displayed when no image and no name are available. Always the decorative variant from the icon component. |
| Status indicator | No | A small dot affixed to the bottom-right of the container. Communicates the entity's availability or presence state: online, away, busy, or offline. Carries a status color token and a surface-colored ring to visually separate it from the avatar container. |

Exactly one of image, initials, or fallback icon is displayed at any time. They do not overlap.

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Container — background (initials) | `color.background.subtle` | Background fill when displaying initials |
| Container — background (fallback) | `color.background.subtle` | Background fill when displaying fallback icon |
| Container — border (default) | `color.border.default` | Subtle boundary ring on initials and fallback variants |
| Container — border (hover, interactive) | `color.border.strong` | Reinforced boundary ring on hover for interactive avatars |
| Container — radius | `radius.full` | Circular shape applied to all avatar sizes and variants |
| Container — size, small | `spacing.lg` | Width and height of the small avatar |
| Container — size, medium | `spacing.xl` | Width and height of the medium avatar |
| Container — size, large | `spacing.layout.sm` | Width and height of the large avatar |
| Container — disabled background | `color.background.disabled` | Container fill when the avatar is in a disabled interactive state |
| Initials — text color | `color.text.secondary` | Color of the initials characters |
| Initials — font size, small | `text.caption` | Initials font size for the small avatar |
| Initials — font size, medium | `text.body.sm` | Initials font size for the medium avatar |
| Initials — font size, large | `text.body.md` | Initials font size for the large avatar |
| Initials — disabled text | `color.text.disabled` | Initials color when the avatar is in a disabled interactive state |
| Fallback icon — color | `color.text.subtle` | Color of the fallback person icon |
| Fallback icon — disabled color | `color.text.disabled` | Fallback icon color in a disabled interactive state |
| Status indicator — online | `color.status.success` | Dot color for online / available presence |
| Status indicator — away | `color.status.warning` | Dot color for away / idle presence |
| Status indicator — busy | `color.status.danger` | Dot color for busy / do not disturb presence |
| Status indicator — ring | `color.background.surface` | Border ring around the status dot to separate it from the avatar container |
| Status indicator — size | `spacing.xs` | Width and height of the status dot |
| Focus ring | `color.border.focus` | Keyboard focus outline color for interactive avatars |
| Focus ring width | `border.width.focus` | Keyboard focus outline width for interactive avatars |
| Container — border width | `border.width.default` | Container boundary ring width |
| Transition | `motion.fast` | Border and color transitions on interactive state changes |

---

## 6. Variants

| Variant | Default | Display condition | Description |
|---|---|---|---|
| Image | Yes | A valid image URL is available | Renders a photograph or custom image cropped and clipped to the circular container. The image must have a descriptive `alt` attribute. |
| Initials | No | No image is available; a name is known | Renders one or two characters derived from the entity's name on the subtle background. If the name has two or more words, use the first character of each of the first two words. If the name is a single word, use the first character only. |
| Fallback | No | No image and no name are available | Renders a generic person icon from the icon component using the decorative variant. The icon carries `aria-hidden="true"`. The accessible name must come from the container element. |

**Fallback cascade:** The system attempts to display each variant in order — image → initials → fallback. The first available data source is used. Do not skip the initials step if a name is available.

---

## 7. Sizes

| Size | Container token | Initials font token | Use case |
|---|---|---|---|
| Small | `spacing.lg` | `text.caption` | Dense lists, table rows, comment threads, inline mentions, avatar groups. |
| Medium | `spacing.xl` | `text.body.sm` | Default. Profile references in cards, assignee fields, notification items, sidebar entries. |
| Large | `spacing.layout.sm` | `text.body.md` | Account menus, profile pages, empty states identifying the current user, prominent user references. |

All sizes use `radius.full`. Container width and height reference the same token. Do not set dimensions in raw values. Do not scale width and height independently.

---

## 8. States

Static avatars (non-interactive) render the default state only. No hover, focus, or active effects apply.

| State | Condition | Container border | Container background | Text / icon | Transition |
|---|---|---|---|---|---|
| Default | Always | `color.border.default` | Variant default | Variant default | — |
| Hover | Interactive only | `color.border.strong` | Unchanged | Unchanged | `motion.fast` on border |
| Focused | Interactive only | `color.border.focus` (2px ring, 2px offset) | Unchanged | Unchanged | `motion.fast` on ring |
| Active | Interactive only | `color.border.strong` | `color.background.subtle` | Unchanged | `motion.fast` |
| Disabled | Interactive only | `color.border.disabled` | `color.background.disabled` | `color.text.disabled` / `color.text.disabled` | None |

**Rules:**

- A static avatar must not receive focus and must not appear in tab order.
- A disabled interactive avatar must use the native `disabled` attribute on the `<button>` element and be removed from tab order.
- The image variant in hover state does not change the image. Only the container border changes.
- Do not suppress the focus ring on interactive avatars. `outline: none` is not permitted without a CSS replacement.

---

## 9. Behavior

**Static avatar**
- Renders the appropriate variant based on available data.
- Does not respond to mouse, keyboard, or touch events.
- Is not included in tab order. Has no pointer cursor.
- When used in a list or group, the list container may carry semantic structure — the avatar itself does not.

**Interactive avatar — link behavior**
- Used when clicking navigates to a profile page or user view.
- Implemented as a native `<a>` element wrapping the avatar container.
- `Tab` to focus, `Enter` to activate. Opens the destination.
- Carries an `aria-label` describing the destination: `aria-label="View Kholoud Eltabey's profile"`.

**Interactive avatar — button behavior**
- Used when clicking opens a menu, dropdown, or inline panel.
- Implemented as a native `<button>` element.
- `Tab` to focus, `Enter` or `Space` to activate. Triggers the associated action.
- Carries an `aria-label` describing the action: `aria-label="Open account menu"`.

**Fallback cascade**
- When an image fails to load after rendering, the component falls back to initials if a name is available, then to the fallback icon. The fallback must not produce a broken image element in the DOM.
- The `<img>` element must handle the `onerror` event to trigger the cascade.

**Status indicator**
- The status dot is always static. It does not respond to interaction.
- Status values are set externally (online, away, busy, offline). The component does not compute status.
- When status is offline or unknown, the indicator is hidden — do not render a grey dot. Absence of the indicator communicates offline.
- The ring around the dot uses `color.background.surface` and must update to match the avatar container's background in non-white surface contexts.

**RTL and LTR**
- In RTL layouts, the status indicator dot moves to the bottom-left of the container. Use `inset-inline-end: 0; inset-block-end: 0` with logical CSS to position it correctly in both directions. Do not hardcode `bottom: 0; right: 0`.
- The interactive avatar accessible label must describe the destination or action in the active language, not a fixed LTR string.

**Transitions**
- Border changes on hover and active use `motion.fast`.
- No layout shift or size change occurs on any state transition.

---

## 10. Accessibility

| Requirement | Rule |
|---|---|
| Image avatar `alt` text | The `<img>` element must carry a descriptive `alt` attribute: the entity's full name. Do not use an empty `alt` on an image avatar. Empty `alt` is reserved for decorative images; an avatar is not decorative. |
| Initials and fallback | The container element must carry an `aria-label` with the entity's full name when there is no visible text label adjacent to the avatar. The initials characters and fallback icon carry `aria-hidden="true"`. |
| Interactive avatar accessible name | Every interactive avatar must have a descriptive accessible name via `aria-label` or `aria-labelledby`. The name must describe the action or destination, not just the entity name. |
| Keyboard access | Interactive avatars: `Tab` to focus. `Enter` to activate links. `Enter` or `Space` to activate buttons. Disabled avatars are removed from tab order. |
| Focus indicator | A visible focus ring is required on all interactive avatars. Apply a 2px outline using `color.border.focus` with `outline-offset: 2px`. Never suppress focus without a CSS replacement. |
| Non-interactive avatar tab order | Static avatars must not appear in tab order. Do not add `tabindex` to a non-interactive avatar. |
| Status indicator | The status dot is a visual indicator. Its meaning must also be communicated in text — either via a visible label, `aria-label` on the container, or a visually hidden text node adjacent to the dot. Do not rely on dot color alone to communicate presence state. |
| Fallback handling | The component must never render a broken `<img>` element. The fallback cascade must be handled before the broken image state is visible to the user or exposed to the accessibility tree. |
| Color contrast | Initials text against the subtle background must meet WCAG 2.1 AA: 4.5:1 for normal text. `color.text.secondary` on `color.background.subtle` satisfies this requirement. |
| WCAG criteria | Applies SC 1.1.1 (Non-text Content), SC 1.4.1 (Use of Color), SC 1.4.3 (Contrast Minimum), SC 1.4.11 (Non-text Contrast), SC 2.1.1 (Keyboard), SC 2.4.7 (Focus Visible). |

---

## 11. Content Guidelines

**Image**
- Use a photograph or official image that clearly identifies the entity.
- Do not use stock imagery, abstract art, or images that do not represent the actual user or entity.
- Images must be square and of sufficient resolution to render clearly at the largest size in the product. Avoid images that become unrecognizable when cropped to a circle.

**Initials**
- Derive initials from the entity's display name: first character of the first word and first character of the last word.
- Use uppercase for initials. One or two characters only — never three or more.
- If the name is a single word or a username with no spaces, use the first character only.
- Do not use special characters, numbers, or punctuation as initials.
- If the name contains characters that do not render clearly at small sizes, prefer the fallback icon.

**Fallback icon**
- The fallback icon is a last resort. Always attempt to collect a name for initials before showing the fallback.
- Do not use the fallback icon as a design choice. It signals missing data, not a stylistic decision.
- The fallback icon must always be the generic person icon from the approved icon library. Do not substitute a different icon.

**Status indicator**
- Label presence states in plain language: Online, Away, Busy. Do not use jargon or system-level state names.
- Do not invent new presence states. Use only the four defined values: online, away, busy, offline (hidden).

---

## 12. Code Example

```html
<!-- Image avatar — static -->
<div class="avatar avatar--md" aria-label="Kholoud Eltabey">
  <img class="avatar__image" src="/avatars/kholoud.jpg" alt="Kholoud Eltabey" />
</div>

<!-- Initials avatar — static -->
<div class="avatar avatar--md" aria-label="Kholoud Eltabey">
  <span class="avatar__initials" aria-hidden="true">KE</span>
</div>

<!-- Fallback avatar — static -->
<div class="avatar avatar--md" aria-label="Unknown user">
  <svg class="avatar__fallback" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#person" />
  </svg>
</div>

<!-- Image avatar with status indicator — static -->
<div class="avatar avatar--md" aria-label="Kholoud Eltabey, Online">
  <img class="avatar__image" src="/avatars/kholoud.jpg" alt="Kholoud Eltabey" />
  <span class="avatar__status avatar__status--online">
    <span class="visually-hidden">Online</span>
  </span>
</div>

<!-- Interactive avatar — link to profile -->
<a class="avatar avatar--md avatar--interactive" href="/users/kholoud"
   aria-label="View Kholoud Eltabey's profile">
  <img class="avatar__image" src="/avatars/kholoud.jpg" alt="" />
</a>

<!-- Interactive avatar — button opening a menu -->
<button class="avatar avatar--md avatar--interactive" type="button"
        aria-label="Open account menu" aria-haspopup="true" aria-expanded="false">
  <span class="avatar__initials" aria-hidden="true">KE</span>
</button>
```

```css
/* Base container */
.avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: var(--color-background-subtle);
  border-width: var(--border-width-default);
  border-style: solid;
  border-color: var(--color-border-default);
  overflow: hidden;
  flex-shrink: 0;
}

/* Sizes */
.avatar--sm {
  width: var(--spacing-lg);
  height: var(--spacing-lg);
}

.avatar--md {
  width: var(--spacing-xl);
  height: var(--spacing-xl);
}

.avatar--lg {
  width: var(--spacing-layout-sm);
  height: var(--spacing-layout-sm);
}

/* Image */
.avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Initials */
.avatar__initials {
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  text-transform: uppercase;
}

.avatar--sm .avatar__initials  { font-size: var(--text-caption-size); }
.avatar--md .avatar__initials  { font-size: var(--text-body-sm-size); }
.avatar--lg .avatar__initials  { font-size: var(--text-body-size); }

/* Fallback icon — inherits color via currentColor */
.avatar__fallback {
  width: 60%;
  height: 60%;
  color: var(--color-text-subtle);
}

/* Status indicator */
.avatar__status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: var(--spacing-xs);
  height: var(--spacing-xs);
  border-radius: var(--radius-full);
  border-width: var(--border-width-focus);
  border-style: solid;
  border-color: var(--color-background-surface);
}

.avatar__status--online { background: var(--color-status-success); }
.avatar__status--away   { background: var(--color-status-warning); }
.avatar__status--busy   { background: var(--color-status-danger); }

/* Interactive */
.avatar--interactive {
  cursor: pointer;
  text-decoration: none;
  transition: border-color var(--motion-fast), background var(--motion-fast);
}

.avatar--interactive:hover {
  border-color: var(--color-border-strong);
}

.avatar--interactive:active {
  border-color: var(--color-border-strong);
  background: var(--color-background-subtle);
}

.avatar--interactive:focus-visible {
  outline-width: var(--border-width-focus);
  outline-style: solid;
  outline-color: var(--color-border-focus);
  outline-offset: 2px;
}

.avatar--interactive:disabled {
  background: var(--color-background-disabled);
  border-color: var(--color-border-disabled);
  cursor: not-allowed;
}

.avatar--interactive:disabled .avatar__initials {
  color: var(--color-text-disabled);
}

.avatar--interactive:disabled .avatar__fallback {
  color: var(--color-text-disabled);
}

/* Visually hidden utility */
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

- [icon.md](./icon.md) — The fallback icon uses the decorative icon variant; icon sizing and color tokens apply
- [button.md](./button.md) — Interactive avatars that trigger actions follow button element and accessibility rules
- [link.md](./link.md) — Interactive avatars that navigate to a profile follow link element and accessibility rules
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all values used by this component
