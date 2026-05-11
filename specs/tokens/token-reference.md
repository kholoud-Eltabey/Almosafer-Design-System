---
name: Token Reference
tier: token
status: stable
last-updated: 2026-05-11
maintainer: Team 4
source: Almosafer Design System
---

# Token Reference

This file is the authoritative reference for all semantic tokens in the design system. Every token is defined here. Every component consumes from here. Nothing bypasses this layer.

---

## 1. Purpose

Tokens are named design decisions. They sit between raw foundation values and the components that consume them. A token does not hold a value — it holds the meaning of a value.

`color.background.surface` means "the color used for surface backgrounds." The foundation value it maps to may change. The token name and its meaning do not.

**Why this matters:**

- Components reference decisions, not values. A component that uses `color.background.surface` works correctly in both light and dark modes without modification.
- Tokens are the contract between design and engineering. Both sides reference the same names.
- When a foundation value changes, the change propagates automatically to every component that references the affected token.

**Rule:** Tokens are the only layer used by components. No component references a foundation primitive. No component holds a raw value.

---

## 2. Token Architecture

The system uses a strict three-layer model. Each layer has one responsibility.

```
Layer 1 — Foundations
  Raw values. HEX, px, ms, cubic-bezier.
  Defined in /specs/foundations.
  Never referenced by components.

Layer 2 — Tokens
  Semantic meaning. Maps a name to a foundation value.
  Defined in /specs/tokens.
  The ONLY layer referenced by components.

Layer 3 — Component usage
  Atoms and patterns.
  Reference Layer 2 tokens only.
  No direct foundation access. No raw values.
```

**Layer access rules:**

| From | May reference | May NOT reference |
|---|---|---|
| Tokens (Layer 2) | Foundations (Layer 1) | Other tokens, raw values |
| Components (Layer 3) | Tokens (Layer 2) | Foundations, raw values |
| Patterns (Layer 3) | Tokens (Layer 2), Atoms | Foundations, raw values |

No layer may skip a level. A component that references a foundation directly violates the contract.

---

## 3. Token Categories

### Color Tokens

Color tokens cover all surface, text, border, and status decisions. No component holds a color value. Every color passes through a token.

> **Secondary palette now active** — `secondary.*` (teal-green, steps 50–900) semantic tokens have been defined and are consumed by the Secondary button variant. `accent.*` semantic tokens remain pending.

#### Background

| Token | Light | Dark | Description |
|---|---|---|---|
| `color.background.primary` | `brand.900` | `brand.700` | Primary action surfaces and brand-prominent backgrounds. |
| `color.background.primary.hover` | `brand.800` | `brand.600` | Primary action surface hover state. |
| `color.background.primary.active` | `brand.700` | `brand.500` | Primary action surface active and pressed state. |
| `color.background.default` | `neutral.50` | `neutral.1000` | Default page surface. |
| `color.background.surface` | `neutral.50` | `neutral.1000` | Default page and card surface. |
| `color.background.subtle` | `neutral.100` | `neutral.900` | Elevated or secondary surfaces. Hover backgrounds. |
| `color.background.sunken` | `neutral.100` | `neutral.900` | Recessed surfaces. Page canvas behind cards. |
| `color.background.inverse` | `neutral.1000` | `neutral.50` | Surfaces requiring inverted text. |
| `color.surface.default` | `neutral.50` | `neutral.900` | Default elevated surface. Cards, panels, dialogs. |
| `color.surface.subtle` | `neutral.200` | `neutral.800` | Secondary elevated surface. Nested panels, hover fills. |
| `color.background.disabled` | `neutral.200` | `neutral.800` | Disabled component backgrounds. |
| `color.background.selected` | `brand.50` | `brand.400` | Selected state backgrounds and hover tints. Row highlights, active tabs, input hover. |
| `color.background.danger` | `status.danger.100` | `status.danger.200` | Error and destructive state backgrounds. |
| `color.background.warning` | `status.warning.100` | `status.warning.200` | Warning state backgrounds. |
| `color.background.success` | `status.success.100` | `status.success.200` | Success state backgrounds. |
| `color.background.secondary` | `secondary.500` | `secondary.600` | Secondary button default background. |
| `color.background.secondary-hover` | `secondary.600` | `secondary.500` | Secondary button hover and active background. |

#### Text

| Token | Light | Dark | Description |
|---|---|---|---|
| `color.text.primary` | `neutral.1000` | `neutral.200` | Default body and heading text. Maximum contrast. |
| `color.text.secondary` | `neutral.700` | `neutral.500` | Supporting text. Captions, metadata, helper text. |
| `color.text.subtle` | `neutral.600` | `neutral.500` | Tertiary text. Placeholders, disabled labels. |
| `color.text.inverse` | `neutral.50` | `neutral.1000` | Text on dark or brand-colored backgrounds. |
| `color.text.brand` | `brand.900` | `brand.300` | Brand-colored text. Links, active labels. |
| `color.text.disabled` | `neutral.500` | `neutral.700` | Disabled state text. |
| `color.text.danger` | `status.danger.700` | `status.danger.400` | Error messages, destructive action labels. |
| `color.text.warning` | `status.warning.700` | `status.warning.400` | Warning messages. |
| `color.text.success` | `status.success.700` | `status.success.400` | Success messages, confirmation text. |

#### Border

| Token | Light | Dark | Description |
|---|---|---|---|
| `color.border.default` | `neutral.300` | `neutral.800` | Default component borders. Input outlines, card edges. |
| `color.border.subtle` | `neutral.200` | `neutral.900` | Subtle dividers and low-emphasis separators. |
| `color.border.strong` | `neutral.500` | `neutral.600` | High-contrast borders for emphasis. |
| `color.border.focus` | `brand.500` | `brand.400` | Keyboard focus ring color. Applied to all interactive elements. |
| `color.border.disabled` | `neutral.300` | `neutral.800` | Disabled component borders. |
| `color.border.danger` | `status.danger.400` | `status.danger.400` | Error state borders. Invalid input outlines. |
| `color.border.selected` | `brand.500` | `brand.400` | Selected state borders. Active tabs, checked inputs. |

#### Status

| Token | Light | Dark | Description |
|---|---|---|---|
| `color.status.success` | `status.success.500` | `status.success.200` | Success icon and indicator color. |
| `color.status.success.bold` | `status.success.700` | `status.success.400` | Success text on light surfaces. On dark surfaces, use the default step. |
| `color.status.warning` | `status.warning.500` | `status.warning.200` | Warning icon and indicator color. |
| `color.status.warning.bold` | `status.warning.700` | `status.warning.400` | Warning text on light surfaces. On dark surfaces, use the default step. |
| `color.status.danger` | `status.danger.500` | `status.danger.200` | Danger icon and indicator color. |
| `color.status.danger.bold` | `status.danger.700` | `status.danger.400` | Danger text on light surfaces. On dark surfaces, use the default step. |
| `color.status.info` | `status.info.500` | `status.info.200` | Info button default and focused background. Info icon and indicator color. |
| `color.status.info-bold` | `status.info.700` | `status.info.400` | Info button hover, active, and focused border. Deep navy for high-contrast info surfaces. |
| `color.status.warning` | `status.warning.300` | `status.warning.300` | Warning button default and focused background. Yellow amber — use with `color.text.inverse`. |
| `color.status.warning-bold` | `status.warning.500` | `status.warning.500` | Warning button hover, active, and focused border. |

---

### Spacing Tokens

Spacing tokens map semantic sizing decisions to the spacing primitive scale. All padding, gap, and margin decisions in components reference these tokens.

| Token | Maps to | Description |
|---|---|---|
| `spacing.xs` | `space-100` | Extra small. Tight internal gaps, icon-to-label spacing. |
| `spacing.sm` | `space-200` | Small. Compact component padding, inline spacing. |
| `spacing.md` | `space-300` | Medium. Default component padding, section internal gaps. |
| `spacing.lg` | `space-400` | Large. Component group separation, panel padding. |
| `spacing.xl` | `space-500` | Extra large. Major section separation, page-level gaps. |
| `spacing.layout.sm` | `space-600` | Small layout gap. Dialog padding, page section spacing. |
| `spacing.layout.md` | `space-800` | Medium layout gap. Page-level structural spacing. |
| `spacing.layout.lg` | `space-1000` | Large layout gap. Full-page margins, top-level breaks. |

---

### Typography Tokens

Typography tokens map semantic text roles to their typography primitive values. The token layer covers font family, font size, font weight, and line height. Components reference these tokens only — never the underlying primitives.

#### Font Family

One primitive (`font.family`) with two modes. The resolved typeface switches with the active `lang` attribute and layout direction. The token name does not change between languages.

| Token | Mode | Maps to | Description |
|---|---|---|---|
| `typography.family` | English | `font.family` | All LTR UI text. Headings, body, labels, captions, actions. |
| `typography.family` | Arabic | `font.family` | All RTL UI text. Switches with active `lang` attribute and layout direction. |

#### Text Styles

Each text style is a composite token that references `font.family`, `font.size.*`, `font.weight.*`, and a line height primitive. `font.family` resolves to IBM Plex Sans in English mode and IBM Plex Sans Arabic in Arabic mode — the token name does not change between languages.

| Token | font.family | font.size | font.weight | line-height | Description |
|---|---|---|---|---|---|
| `text.caption` | `font.family` | `font.size.12` | `font.weight.regular` | `line-height-normal` | Fine print, timestamps, metadata. |
| `text.body.sm` | `font.family` | `font.size.12` | `font.weight.regular` | `line-height-normal` | Small body text. Labels, helper text, secondary copy. |
| `text.body.md` | `font.family` | `font.size.16` | `font.weight.regular` | `line-height-normal` | Default body text. Standard reading copy, form content. |
| `text.body.lg` | `font.family` | `font.size.16` | `font.weight.medium` | `line-height-normal` | Emphasized body text. Prices, key values, active labels. |
| `text.heading.sm` | `font.family` | `font.size.20` | `font.weight.semibold` | `line-height-tight` | Card and component-level headings. |
| `text.heading.md` | `font.family` | `font.size.24` | `font.weight.semibold` | `line-height-tight` | Section headings. |
| `text.heading.lg` | `font.family` | `font.size.24` | `font.weight.bold` | `line-height-tight` | Page-level headings. Maximum heading emphasis. |

#### Font Weight

| Token | Maps to | Description |
|---|---|---|
| `typography.weight.display` | `font.weight.bold` | Display and hero text. Maximum typographic emphasis. |
| `typography.weight.heading` | `font.weight.bold` | Page and section headings. |
| `typography.weight.subheading` | `font.weight.semibold` | Sub-section headings, primary labels, key data. |
| `typography.weight.label` | `font.weight.medium` | Navigation labels, active states, mild emphasis. |
| `typography.weight.body` | `font.weight.regular` | Default body copy, secondary labels. |
| `typography.weight.caption` | `font.weight.regular` | Captions, timestamps, metadata. |

#### Line Height

| Token | Maps to | Description |
|---|---|---|
| `typography.line-height.tight` | `line-height-tight` | Headings and display text at `text.heading.sm` and above. |
| `typography.line-height.normal` | `line-height-normal` | Default body text, form labels, multi-line copy. |
| `typography.line-height.loose` | `line-height-loose` | Long-form content, help text, accessibility-sensitive reading contexts. |

---

### Radius Tokens

Radius tokens map semantic shape decisions to the radius primitive scale. All border-radius decisions in components reference these tokens.

| Token | Maps to | Description |
|---|---|---|
| `radius.none` | `radius-0` | No rounding. Table cells, structural containers. |
| `radius.xs` | `radius-50` | Micro rounding. Tooltips, small indicators. |
| `radius.sm` | `radius-100` | Small. Tags, chips, badges. |
| `radius.md` | `radius-200` | Medium-small. Inputs, selects, compact buttons. |
| `radius.lg` | `radius-300` | Medium. Default buttons, dropdowns, popovers. |
| `radius.xl` | `radius-400` | Large. Cards, panels, modals. |
| `radius.2xl` | `radius-500` | Extra large. Feature cards, prominent containers. |
| `radius.full` | `radius-full` | Pill. Avatars, toggles, pill badges. |

---

### Border Width Tokens

Border width tokens map semantic stroke weight decisions to the border width primitive scale. All border-width and outline-width decisions in components reference these tokens.

| Token | Maps to | Description |
|---|---|---|
| `border.width.default` | `border-width-1` | Default structural border. Input outlines, card edges, dividers. |
| `border.width.focus` | `border-width-2` | Keyboard focus ring width. Applied to all interactive elements on focus. |
| `border.width.error` | `border-width-2` | Error and invalid state border. Paired with `color.border.danger`. |
| `border.width.strong` | `border-width-4` | Strong accent border. Notification priority markers, left-edge callouts. |

---

### Motion Tokens

Motion tokens map semantic interaction types to duration and easing primitive combinations. All transition and animation decisions in components reference these tokens.

| Token | Duration | Easing | Description |
|---|---|---|---|
| `motion.fast` | `duration-100` | `easing-standard` | Instant feedback. Color changes, icon state transitions. |
| `motion.normal` | `duration-200` | `easing-standard` | Standard state transitions. Dropdowns, tooltips, tab switches. |
| `motion.slow` | `duration-300` | `easing-standard` | Deliberate transitions. Accordions, panel expansions. |
| `motion.enter` | `duration-200` | `easing-enter` | Elements entering the viewport. Modals, overlays appearing. |
| `motion.exit` | `duration-150` | `easing-exit` | Elements leaving the viewport. Dismissing overlays, collapse. |
| `motion.layout` | `duration-400` | `easing-enter` | Layout-level transitions. Drawer open, page navigation. |

---

## 4. Usage Rules

| Rule | Detail |
|---|---|
| Tokens are mandatory in all components | Every atom and pattern spec must reference tokens only. No exceptions. |
| No foundation references in components | A component that references `brand.500`, `neutral.200`, or `space-300` directly violates the contract. |
| No raw values in components | `#FFFFFF`, `16px`, `0.3s`, `400` are not permitted in any component spec. |
| Tokens do not reference other tokens | A token maps to a foundation primitive only. Chained token references are not permitted. |
| New tokens require a foundation mapping | A token cannot exist without a foundation primitive to map to. Define the primitive first. |
| Token names are stable | Renaming a token is a breaking change. Deprecate the old name, introduce the new one, migrate all references before removal. |
| All token categories are covered | A component must not leave any styling decision — color, spacing, radius, motion — outside the token system. |

---

## 5. Banned Usage

The following are explicitly forbidden in any atom, pattern, or component spec.

**Raw color values**

```
✗  color: #172B4D
✗  background: rgba(0, 0, 0, 0.5)
✗  border-color: hsl(220, 50%, 30%)
```

**Raw dimension values**

```
✗  padding: 16px
✗  font-size: 14px
✗  border-radius: 8px
✗  gap: 24px
```

Exception: `0` is always permitted. Raw px border values are never permitted — `border.width.default` (1px), `border.width.focus` / `border.width.error` (2px), and `border.width.strong` (4px) must be used in all cases.

**Direct foundation references**

```
✗  color: brand.500
✗  padding: space-200
✗  border-radius: radius-300
✗  font-size: font-size-300
✗  transition-duration: duration-150
```

Foundation primitives are not semantic. A component referencing them directly cannot participate in theming, density switching, or systematic updates.

**Hardcoded theme assumptions**

```
✗  color: white
✗  background: black
✗  border: 1px solid #DDD
```

---

## 6. Naming Rules

Token names follow a strict pattern:

```
category.role.variant.state
```

| Segment | Description |
|---|---|
| `category` | Top-level domain: `color`, `spacing`, `text`, `radius`, `motion` |
| `role` | Semantic role within the category: `background`, `text`, `border`, `status`, `layout` |
| `variant` | Specific application: `primary`, `subtle`, `inverse`, `danger`, `heading`, `caption` |
| `state` | Interaction state (omit if stateless): `default`, `hover`, `focus`, `disabled`, `selected` |

**Valid examples:**

```
color.background.primary
color.background.surface
color.text.secondary
color.border.focus
color.status.danger
spacing.md
spacing.layout.lg
text.body.sm
text.body.md
text.body.lg
text.heading.sm
text.heading.md
radius.lg
radius.full
motion.normal
motion.enter
```

**Rules:**

- Names are lowercase. No camelCase, no PascalCase.
- Segments are separated by `.` only. No hyphens between segments.
- Do not abbreviate unless the abbreviation is unambiguous and already established in the system (`xs`, `sm`, `md`, `lg`, `xl`).
- State segment is omitted when the token applies to all states equally.
- Do not use positional or layout-specific language in token names (`left`, `top`, `first`).

---

## 7. Theming

Tokens are the mechanism that makes theming possible. Foundation values change between themes. Token names do not.

**How it works:**

```
Light mode:
  color.background.surface  →  neutral.50

Dark mode:
  color.background.surface  →  neutral.1000
```

The component references `color.background.surface` in both modes. The component does not change. The token resolves to the correct foundation value at runtime based on the active theme.

**Rules:**

- Do not create theme-specific tokens (e.g., `color.background.surface.light`). Theming is handled by resolving the same token to different primitives per theme context.
- Do not write component variants for light and dark modes. One component, one set of tokens, two theme resolutions.
- Foundation values are theme-agnostic. They are not labeled light or dark.
- Density modes follow the same pattern. A `spacing.md` token may resolve to `space-300` in comfortable mode and `space-200` in compact mode. The component does not change.

---

## 8. Cross-references

- [color.md](../foundations/color.md) — Color primitive scale referenced by all color tokens
- [spacing.md](../foundations/spacing.md) — Spacing primitive scale referenced by all spacing tokens
- [typography.md](../foundations/typography.md) — Typography primitive scale referenced by all text tokens
- [radius.md](../foundations/radius.md) — Radius primitive scale referenced by all radius tokens
- [motion.md](../foundations/motion.md) — Motion primitive scale referenced by all motion tokens
- [border-width.md](../foundations/border-width.md) — Border width primitive scale referenced by all border width tokens
