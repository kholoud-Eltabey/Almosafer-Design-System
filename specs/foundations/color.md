---
name: Color Foundation
tier: foundation
status: stable
last-updated: 2026-05-07
maintainer: Team 4
source: Almosafer Design System
---

# Color Foundation

This file defines the primitive color layer of the design system. It is the only place in the system where raw HEX values are permitted.

---

## 1. Philosophy

The color system operates on a strict two-layer model. Primitives are defined here. Semantic tokens map primitives to intent. Components consume tokens only.

**Rules:**

- Primitives are reference values. They are not consumed directly by components or patterns.
- The token layer is required. No component may reference a primitive.
- Raw HEX values are banned outside this file.
- Theme switching is handled entirely at the token layer. Components do not change between themes.
- Contrast requirements are non-negotiable. Accessibility is enforced at the token definition stage.

---

## 2. Color System Structure

The system supports light and dark themes. Theme differences are resolved at the token layer — primitives do not change between themes. A semantic token such as `color.background.neutral.default` maps to a different primitive in light mode than in dark mode. The component referencing that token remains unchanged.

```
Primitives (this file)
    ↓
Semantic tokens  →  light values
                →  dark values
    ↓
Components (reference tokens only)
```

Primitives are organized into four categories: **Brand**, **Neutral**, **Status**, and **Extended**. Each category contains a named scale. Scale steps are numeric and consistent across categories. Extended palettes (teal, purple, brown) are used exclusively for tags, categories, charts, and supporting accents — never for brand or status roles.

---

## 3. Primitives — Layer 1

### Brand

The brand palette is the primary identity color for Almosafer. It is a deep navy-teal. Use sparingly — high-frequency use dilutes hierarchy. Brand must not share a hue with any status category. Navy-teal does not conflict with any of the four reserved status hues (green, yellow, red, blue).

#### Primary

| Token name | Value | Usage note |
|---|---|---|
| `brand.50` | `#E6F3F7` | Tints, backgrounds, hover surfaces |
| `brand.100` | `#CCE7EE` | Subtle fills, selected states |
| `brand.200` | `#99CFDD` | Borders, inactive indicators |
| `brand.300` | `#66B7CC` | Illustrated accents only |
| `brand.400` | `#339FBB` | Secondary interactive elements |
| `brand.500` | `#0077A8` | Primary interactive default |
| `brand.600` | `#00688F` | Primary interactive hover |
| `brand.700` | `#005977` | Primary interactive pressed |
| `brand.800` | `#00495E` | Deep emphasis, dark surface use |
| `brand.900` | `#003143` | Maximum depth, dark mode only |

---

#### Secondary

The secondary palette is a warm teal-green that complements the navy-teal brand without competing. Use for secondary interactive elements, supporting surfaces, tags, and brand contexts requiring a distinct but harmonious accent.

| Token name | Value | Usage note |
|---|---|---|
| `secondary.50` | `#E8F6F5` | Light tint, secondary surface background |
| `secondary.100` | `#D1EEEB` | Subtle fills, selected secondary states |
| `secondary.200` | `#A3DDD7` | Borders, inactive secondary indicators |
| `secondary.300` | `#75CCC3` | Illustrated accents, secondary icons |
| `secondary.400` | `#47BBAF` | Secondary interactive elements |
| `secondary.500` | `#199A8C` | Default secondary interactive |
| `secondary.600` | `#157F74` | Secondary interactive hover |
| `secondary.700` | `#11655C` | Secondary interactive pressed |
| `secondary.800` | `#0C4A43` | Deep secondary emphasis |
| `secondary.900` | `#072F2B` | Maximum secondary depth |

---

#### Accent

The accent palette is a vibrant coral-orange for high-energy brand moments: primary CTAs, promotional highlights, and energetic visual accents. Use sparingly — accent draws attention and overuse diminishes its effect.

| Token name | Value | Usage note |
|---|---|---|
| `accent.50` | `#FFF3EE` | Light tint, accent surface background |
| `accent.100` | `#FFD9C7` | Soft fills, accent hover surfaces |
| `accent.200` | `#FFB89F` | Subtle fills, inactive accent elements |
| `accent.300` | `#FF9777` | Illustrated accents |
| `accent.400` | `#FF764F` | Secondary accent interactive |
| `accent.500` | `#FF5527` | Default accent — primary CTA, key highlights |
| `accent.600` | `#DA4419` | Accent interactive hover |
| `accent.700` | `#B43410` | Accent interactive pressed |
| `accent.800` | `#8E2508` | Deep accent emphasis |
| `accent.900` | `#681603` | Maximum accent depth |

---

### Neutral

The neutral palette drives all layout, text, border, and surface decisions. It is the highest-frequency palette in the system. The scale is a true neutral gray — no blue or teal tint — that pairs cleanly with the navy-teal brand palette. All text-on-background combinations meet WCAG 2.1 AA minimum contrast.

| Token name | Value | Usage note | Contrast on white |
|---|---|---|---|
| `neutral.50` | `#FFFFFF` | Pure white. Light surface base. | — |
| `neutral.100` | `#F5F5F5` | Page background, canvas | — |
| `neutral.200` | `#E5E5E5` | Elevated surface, hover state | — |
| `neutral.300` | `#D4D4D4` | Subtle borders, dividers | — |
| `neutral.400` | `#AFAFAF` | Disabled borders, placeholder | — |
| `neutral.500` | `#8A8A8A` | Placeholder text, icons at rest (disabled — exempt) | 3.5 : 1 |
| `neutral.600` | `#6B6B6B` | Secondary text, captions | 5.3 : 1 AA ✓ |
| `neutral.700` | `#4B4B4B` | Body text, emphasis | 8.7 : 1 AAA ✓ |
| `neutral.800` | `#2F2F2F` | Headings, primary text | 13.4 : 1 AAA ✓ |
| `neutral.900` | `#1A1A1A` | Maximum emphasis, near-black | 17.4 : 1 AAA ✓ |
| `neutral.950` | `#121212` | Dark surface base | 18.7 : 1 AAA ✓ |
| `neutral.975` | `#0D0D0D` | Deep dark surface | 19.4 : 1 AAA ✓ |
| `neutral.1000` | `#090909` | Maximum contrast, near-black | 19.9 : 1 AAA ✓ |

---

### Status

Status colors communicate feedback and system state. Each status uses the full 50–900 scale. The `.500` step is the canonical default for icons and interactive elements. Use `.700` for text on light surfaces. Use `.50`–`.100` for background tints.

#### Success

| Token name | Value | Usage note |
|---|---|---|
| `status.success.50` | `#EBFAEF` | Background tint |
| `status.success.100` | `#C2EDCC` | Light surface fill |
| `status.success.200` | `#96DFA9` | Subtle fill |
| `status.success.300` | `#6ACF86` | Illustrated accents |
| `status.success.400` | `#45BE65` | Secondary icon and border |
| `status.success.500` | `#2F9E44` | Default icon and border |
| `status.success.600` | `#257E36` | Emphasis |
| `status.success.700` | `#1B5E28` | Bold text on light surfaces |
| `status.success.800` | `#113D1A` | Deep surfaces |
| `status.success.900` | `#081F0D` | Maximum depth |

#### Warning

| Token name | Value | Usage note |
|---|---|---|
| `status.warning.50` | `#FDF9EC` | Background tint |
| `status.warning.100` | `#F9EDBC` | Light surface fill |
| `status.warning.200` | `#F4DF8A` | Subtle fill |
| `status.warning.300` | `#EDD056` | Illustrated accents |
| `status.warning.400` | `#DEB82C` | Secondary icon and border |
| `status.warning.500` | `#C9A227` | Default icon and border |
| `status.warning.600` | `#A6821F` | Emphasis |
| `status.warning.700` | `#7E6217` | Bold text on light surfaces |
| `status.warning.800` | `#55410E` | Deep surfaces |
| `status.warning.900` | `#2C2107` | Maximum depth |

#### Danger

| Token name | Value | Usage note |
|---|---|---|
| `status.danger.50` | `#FFF1F0` | Background tint |
| `status.danger.100` | `#FFD6D6` | Light surface fill |
| `status.danger.200` | `#FFB3B4` | Subtle fill |
| `status.danger.300` | `#FF8C8D` | Illustrated accents |
| `status.danger.400` | `#FF6A6B` | Secondary icon and border |
| `status.danger.500` | `#FF4D4F` | Default icon and border |
| `status.danger.600` | `#D93234` | Emphasis |
| `status.danger.700` | `#A81C1E` | Bold text on light surfaces |
| `status.danger.800` | `#730B0C` | Deep surfaces |
| `status.danger.900` | `#400305` | Maximum depth |

#### Info

| Token name | Value | Usage note |
|---|---|---|
| `status.info.50` | `#EBF3FF` | Background tint |
| `status.info.100` | `#C5DCFF` | Light surface fill |
| `status.info.200` | `#9DC3FF` | Subtle fill |
| `status.info.300` | `#72A9FF` | Illustrated accents |
| `status.info.400` | `#4D94FF` | Secondary icon and border |
| `status.info.500` | `#3A86FF` | Default icon and border |
| `status.info.600` | `#2265D4` | Emphasis |
| `status.info.700` | `#1048A9` | Bold text on light surfaces |
| `status.info.800` | `#062E7E` | Deep surfaces |
| `status.info.900` | `#021752` | Maximum depth |

**Status role rules:**

| Category | Hue | Reserved for |
|---|---|---|
| `status.success` | Green | Confirmation, completion, positive outcomes |
| `status.warning` | Yellow | Caution, attention required, non-blocking risk |
| `status.danger` | Red | Errors, destructive actions, blocking failures |
| `status.info` | Blue | Informational messages, neutral system notices |

- Yellow is used exclusively for `status.warning`. It must not appear in brand or extended palettes.
- Blue is used exclusively for `status.info`. Brand must not share the blue hue when `status.info` is in use.
- Status colors must not be repurposed for decorative, categorical, or brand contexts.

---

## Extended Palettes

Extended palettes provide additional color range for tags, categories, data visualization, and secondary accents. They are not brand colors. They are not status colors. They must not be used for interactive controls, feedback states, or layout.

### Teal

| Token name | Value | Usage note |
|---|---|---|
| `teal.50` | `#E6FFFA` | Background tint |
| `teal.100` | `#B2F5EA` | Light surfaces |
| `teal.200` | `#81E6D9` | Subtle accents |
| `teal.300` | `#4FD1C5` | Decorative |
| `teal.400` | `#38B2AC` | Secondary accent |
| `teal.500` | `#319795` | Default teal |
| `teal.600` | `#2C7A7B` | Emphasis |
| `teal.700` | `#285E61` | Strong accent |
| `teal.800` | `#234E52` | Deep surfaces |
| `teal.900` | `#1D4044` | Maximum depth |

### Purple

| Token name | Value | Usage note |
|---|---|---|
| `purple.50` | `#FAF5FF` | Background tint |
| `purple.100` | `#F3E8FF` | Light surfaces |
| `purple.200` | `#E9D5FF` | Subtle accents |
| `purple.300` | `#D8B4FE` | Decorative |
| `purple.400` | `#C084FC` | Secondary accent |
| `purple.500` | `#A855F7` | Default purple |
| `purple.600` | `#9333EA` | Emphasis |
| `purple.700` | `#7E22CE` | Strong accent |
| `purple.800` | `#6B21A8` | Deep surfaces |
| `purple.900` | `#581C87` | Maximum depth |

### Brown

| Token name | Value | Usage note |
|---|---|---|
| `brown.50` | `#FFF8EE` | Background tint |
| `brown.100` | `#FFECD1` | Light surfaces |
| `brown.200` | `#FFD4A0` | Subtle accents |
| `brown.300` | `#FFB566` | Decorative |
| `brown.400` | `#FD9A38` | Secondary accent |
| `brown.500` | `#F07D12` | Default brown-orange |
| `brown.600` | `#C95F06` | Emphasis |
| `brown.700` | `#A04606` | Strong accent |
| `brown.800` | `#7A3007` | Deep surfaces |
| `brown.900` | `#5A200A` | Maximum depth |

### Orange

| Token name | Value | Usage note |
|---|---|---|
| `orange.50` | `#FFF8EC` | Background tint |
| `orange.100` | `#FFEBC7` | Light surface fill |
| `orange.200` | `#FFDDA0` | Subtle accents |
| `orange.300` | `#FFCC72` | Decorative |
| `orange.400` | `#FFBA49` | Secondary accent |
| `orange.500` | `#FFA92C` | Default orange |
| `orange.600` | `#E08720` | Emphasis |
| `orange.700` | `#B86515` | Strong accent |
| `orange.800` | `#8A440D` | Deep surfaces |
| `orange.900` | `#5C2607` | Maximum depth |

**Extended palette rules:**

- Extended palettes are used only for tags, categories, charts, and secondary accents.
- Do not use extended palettes for interactive controls, primary actions, or status feedback.
- Do not mix extended palette colors with status colors in the same context.
- The `teal.*` extended scale is distinct from the `brand.*` scale. `brand.*` carries Almosafer brand identity. `teal.*` is for decorative and categorical use only.
- Purple, brown, orange, and teal must not serve as primary interactive or brand identity colors.

---

## Scale System

All color scales follow a consistent numeric progression across every category in this file.

| Range | Role |
|---|---|
| `50` | Lightest tint. Backgrounds, hover surfaces, subtle fills. |
| `100–300` | Light range. Borders, indicators, illustrated accents, subtle states. |
| `400–500` | Base / default. Primary interactive and icon colors. |
| `600–700` | Emphasis / interaction. Hover, pressed, and bold text on light surfaces. |
| `800–900` | Deep / dark usage. Maximum contrast, dark surface base, dark mode usage. |

**Rules:**

- The same scale logic applies across all four categories: Brand, Neutral, Status, and Extended.
- Do not introduce arbitrary steps (e.g., `brand.350`, `neutral.450`).
- Each step must maintain visual consistency within its scale — a step at `600` must read as darker and more saturated than its `400` counterpart.
- Status scales use a subset of the full progression. The steps present are sufficient for their use cases; missing steps are intentional.
- Extended palettes use the full 50–900 range. All ten steps must be defined before a palette is added to this file.

---

## Color Hierarchy

The system defines four color categories. Each has a distinct role and a defined frequency of use.

| Category | Role | Frequency |
|---|---|---|
| **Neutral** | Layout, text, borders, surfaces | Highest — primary system driver |
| **Brand** | Interaction, identity, emphasis | Low — interactive elements only |
| **Status** | System feedback (success, warning, danger, info) | Contextual — feedback contexts only |
| **Extended** | Tags, categories, charts, secondary accents | Supporting — never primary or status |

**Rules:**

- Neutral scale must carry the visual weight of the interface. Brand, status, and extended colors are accents.
- Overuse of brand colors reduces hierarchy clarity. When brand color appears everywhere, it signals nothing.
- Status colors used outside feedback contexts create false meaning. A green element that is not a success indicator confuses users.
- Extended palette colors must never be used for interactive controls, status indicators, or brand identity.
- No category overlap is permitted. Blue belongs to `status.info` only. Yellow belongs to `status.warning` only. Brand must use a hue not already claimed by a status category.

---

## Brand Flexibility

The brand color scale is a structural system, not a fixed set of values.

- The scale structure (50–900) remains constant across all brand contexts. Only the HEX values change.
- Any brand identity — violet, amber, navy-teal, or other — can be expressed using the same ten-step scale. Blue and yellow are reserved for status categories (`status.info` and `status.warning`) and must not be used as brand hues in this system.
- When adapting the system to a new brand, replace the HEX values in the Brand scale only. Do not alter the step names, the scale structure, or the usage notes.
- Neutral and status scales are not brand-specific. They do not change between brand contexts.
- Token names remain unchanged across brand adaptations. The token `brand.500` continues to map to the primary interactive default — its resolved HEX value is the only thing that changes.

---

## 4. Usage Rules

| Rule | Detail |
|---|---|
| Primitives are not allowed in components | Components and patterns must reference semantic tokens. Never reference `brand.500`, `neutral.800`, `teal.400`, or any other primitive directly in a spec. |
| The token layer is mandatory | Every color decision in a component must pass through a named semantic token. |
| Brand colors are not default colors | Brand colors communicate interaction and identity. Do not use them for neutral surfaces, body text, or decorative fills. |
| Status colors are reserved for status | Do not repurpose any status category for non-status contexts. Each status color has one meaning — do not override it. |
| No category overlap | Blue belongs to `status.info`. Yellow belongs to `status.warning`. Green belongs to `status.success`. Red belongs to `status.danger`. Brand must use a distinct hue. Extended palettes must not replicate status hues. |
| Extended colors are not interactive | Teal, purple, and brown are for tags, categories, charts, and accents only. Do not use them for buttons, links, focus rings, or any interactive affordance. |
| Contrast must be validated | Every text-on-background combination must meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text and UI components). |
| Dark mode is handled by tokens | Do not create dark-mode-specific primitives. Map the same primitive category to a different step in the dark token definition. |

---

## 5. Theming Concept

The system supports light and dark themes without changing any component. Theme switching is handled entirely at the semantic token layer.

**How it works:**

- In light mode, `color.background.neutral.default` maps to `neutral.50`.
- In dark mode, `color.background.neutral.default` maps to `neutral.1000`.
- The component references `color.background.neutral.default` in both modes.
- The component does not change. The token resolves to the correct primitive at runtime.

**Rules:**

- Do not hardcode theme assumptions in component specs.
- Do not write separate light and dark component variants.
- All theme logic lives in the token definitions file.
- Primitives are theme-agnostic. They are not labeled "light" or "dark".

---

## Text Color Mapping

Semantic text color tokens resolve to different primitives depending on the active theme. The table below documents the primitive each token maps to in light and dark mode, with verified WCAG 2.1 contrast ratios against their default surface. Components must reference the token — not the primitive.

| Token | Light primitive | Light contrast (on `neutral.50`) | Dark primitive | Dark contrast (on `neutral.1000`) |
|---|---|---|---|---|
| `color.text.primary` | `neutral.1000` (#090909) | 19.9 : 1 AAA ✓ | `neutral.200` (#E5E5E5) | 15.8 : 1 AAA ✓ |
| `color.text.secondary` | `neutral.700` (#4B4B4B) | 8.7 : 1 AAA ✓ | `neutral.500` (#8A8A8A) | 5.8 : 1 AA ✓ |
| `color.text.subtle` | `neutral.600` (#6B6B6B) | 5.3 : 1 AA ✓ | `neutral.500` (#8A8A8A) | 5.8 : 1 AA ✓ |
| `color.text.inverse` | `neutral.50` (#FFFFFF) | — (on brand surface) | `neutral.1000` (#090909) | — (on brand surface) |
| `color.text.disabled` | `neutral.500` (#8A8A8A) | 3.5 : 1 (exempt — disabled) | `neutral.700` (#4B4B4B) | 2.3 : 1 (exempt — disabled) |

**Rules:**

- Components must use semantic tokens only. Never reference a primitive such as `neutral.800` directly in a component or pattern spec.
- All text token combinations must meet WCAG 2.1 AA contrast requirements against their corresponding background token. Verify at token definition time, not at implementation.
- Disabled text is exempt from WCAG contrast requirements per WCAG 2.1 success criterion 1.4.3.

---

## Example Token Mapping

The table below shows how selected semantic tokens resolve to primitives in each theme. This is illustrative — full token definitions are in [color-tokens.md](../tokens/color-tokens.md).

| Semantic token | Light | Dark |
|---|---|---|
| `color.background.neutral.default` | `neutral.50` | `neutral.1000` |
| `color.background.neutral.subtle` | `neutral.100` | `neutral.900` |
| `color.text.default` | `neutral.900` | `neutral.200` |
| `color.text.subtle` | `neutral.600` | `neutral.500` |
| `color.background.brand.default` | `brand.900` | `brand.700` |
| `color.border.default` | `neutral.300` | `neutral.800` |

---

## Surface and Background Mapping

Surface and background tokens resolve to different neutral primitives depending on the active theme. The table below documents the primitive each token maps to in light and dark mode.

| Token | Light | Dark |
|---|---|---|
| `color.background.default` | `neutral.50` | `neutral.1000` |
| `color.background.subtle` | `neutral.100` | `neutral.900` |
| `color.surface.default` | `neutral.50` | `neutral.900` |
| `color.surface.subtle` | `neutral.200` | `neutral.800` |
| `color.border.default` | `neutral.300` | `neutral.800` |
| `color.border.subtle` | `neutral.200` | `neutral.900` |

**Rules:**

- Components must reference these tokens by name. Never reference the underlying primitive directly.
- Surface tokens (`color.surface.*`) apply to elevated elements — cards, panels, dialogs, and dropdowns. Background tokens (`color.background.*`) apply to the page canvas and section fills.
- Border tokens must meet the WCAG 2.1 AA 3:1 contrast requirement for UI component boundaries against their adjacent surface.

---

## 6. Accessibility

All color decisions in this system must meet or exceed WCAG 2.1 AA.

| Requirement | Minimum ratio | Applies to |
|---|---|---|
| Normal text (< 18px regular, < 14px bold) | 4.5 : 1 | Body copy, labels, captions |
| Large text (≥ 18px regular, ≥ 14px bold) | 3 : 1 | Headings, display text |
| UI components and graphic elements | 3 : 1 | Borders, icons, input outlines |
| Focus indicators | 3 : 1 | Keyboard focus rings |

**Additional rules:**

- Do not communicate meaning through color alone. Pair color with an icon, label, or pattern.
- Status colors at the `400` step are designed for icons and borders, not text. Use the `700` step for text on light backgrounds.
- Validate every new token combination at definition time. Do not defer contrast checks to implementation.
- `neutral.50` (#FFFFFF) on `neutral.1000` (#090909) is 19.9 : 1. Use this combination for maximum contrast contexts only.

---

## 7. Do / Don't

### ✓ Correct

Reference a semantic token. Let the token resolve to the correct primitive.

```
✓  background: color.background.neutral.default
✓  color: color.text.default
✓  border-color: color.border.default
```

The component does not know which primitive is used. It does not need to.

---

### ✗ Incorrect

**Using a raw HEX value**

```
✗  background: #FFFFFF
✗  color: #172B4D
✗  border-color: #DCDFE4
```

Raw values are not maintainable. They break under theming and cannot be audited.

---

**Referencing a primitive directly**

```
✗  background: neutral.0
✗  color: neutral.800
✗  border-color: neutral.200
```

Primitives carry no semantic meaning. A component referencing `neutral.0` directly will not respond to theme changes.

---

**Hardcoding a theme assumption**

```
✗  background: white        /* assumes light mode */
✗  color: #172B4D           /* assumes light mode */
✗  border: 1px solid #DDD   /* approximation, not a system value */
```

Theme assumptions embedded in components make theming impossible to maintain.

---

## 8. Adding New Colors

New primitives are added only when a genuine product need cannot be met by the existing scale.

**Process:**

| Step | Action |
|---|---|
| 1. Justify | State why no existing primitive satisfies the need. Name the specific gap. |
| 2. Place in scale | Assign the new value to the correct category and step. Do not introduce a new category without approval. |
| 3. Map through token | Define a semantic token that references the new primitive before any component uses it. |
| 4. Document | Add the primitive to this file with its HEX value and usage note. |
| 5. Validate | Confirm contrast ratios for all intended token combinations using the new primitive. |
| 6. Update last-updated | Set `last-updated` in frontmatter to the date of the change. |

Do not add primitives to fill a one-off design gap. Primitives are shared values. Every new addition affects the entire system.

---

## 9. Cross-references

- [color-tokens.md](../tokens/color-tokens.md) — Semantic token definitions that reference this primitive scale
- [typography.md](typography.md) — Text color decisions depend on neutral and status primitives defined here

---

## Maintainer

Team 4
Responsible for maintaining color system consistency.
