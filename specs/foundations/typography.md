---
name: Typography Foundation
tier: foundation
status: stable
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Typography Foundation

This file defines the primitive typography layer of the design system. It is the only place where font families, size scales, weights, line heights, and letter spacing values are declared. All typographic decisions in components and patterns must trace back to this file.

---

## 1. Philosophy

Typography establishes hierarchy, guides reading order, and signals meaning before the user reads a word. Inconsistent typography undermines trust in the interface and increases cognitive load.

**Rules:**

- Typography decisions are not stylistic choices. Every size, weight, and spacing value must map to a named primitive.
- Consistency is enforced through the scale. Values outside the scale are not permitted.
- Primitives are reference values. They are not consumed directly by components or patterns.
- The token layer is required. All component-level typography passes through semantic tokens.
- Hierarchy is a system property. Individual components do not define their own type scales.
- Stylistic freedom ends where the scale begins. If a value is not in the scale, it does not exist in the system.

---

## 2. Typography System Structure

The system uses a structured numeric scale for all typographic primitives. Each scale — size, weight, line height, letter spacing — is defined once and consumed through tokens.

**Separation of concerns:**

```
Typography primitives (this file)
    ↓
Typography tokens (semantic layer)
    ↓
Components and patterns (tokens only)
```

Primitives carry no meaning beyond their raw value. A token such as `text.heading.lg` carries meaning — it maps to the correct primitive combination for that context.

**Multilingual and directional support:**

The system renders in both LTR and RTL layouts. Typography primitives are direction-agnostic. Directional behavior (text alignment, reading direction) is handled at the token and component layer using logical CSS properties. Font family selection accounts for multilingual character coverage. No primitive is defined for a single language or script only.

---

## 3. Font Families

One font family variable is defined. Language switching is handled through modes, not separate primitives. All type in the system references `font.family` — the active mode determines which typeface resolves.

**Font family primitive:**

| Primitive name | Mode | Resolves to | Context |
|---|---|---|---|
| `font.family` | English | `"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif` | LTR — all Latin-script UI text |
| `font.family` | Arabic | `"IBM Plex Sans Arabic", "Geeza Pro", "Arial Unicode MS", sans-serif` | RTL — all Arabic-script UI text |

**Rules:**

- `font.family` is the only font family primitive in the system. Do not create `font.family.en`, `font.family.ar`, or `font.family.primary`.
- Language switching is mode-based. The resolved typeface changes with the active `lang` attribute and layout direction. The primitive name does not change.
- `"IBM Plex Sans"` is used for all UI text in LTR (English) contexts: headings, body, labels, captions, and actions.
- `"IBM Plex Sans Arabic"` is used for all UI text in RTL (Arabic) contexts. It is not a fallback — it is the primary typeface for Arabic script.
- Both IBM Plex Sans families share a common design system and optical scale, ensuring visual consistency across language contexts without size or weight adjustments.
- Do not introduce additional font families. Do not use display or decorative fonts.
- Font loading is a product-level concern. Primitives assume the font is available. Fallbacks are defined here and must not be altered in component specs.

---

## 4. Font Scale — Layer 1 (Primitives)

| Token | Value | Grid | Usage note |
|---|---|---|---|
| `font.size.12` | `12px` | 4pt grid | Minimum legible size. Captions, timestamps, metadata. |
| `font.size.16` | `16px` | 4pt grid | Base size. Body text, default UI copy. |
| `font.size.20` | `20px` | 4pt grid | Small heading or emphasized body. |
| `font.size.24` | `24px` | 4pt grid | Section heading. First clear heading tier. |
| `font.size.32` | `32px` | 4pt grid | Large heading. Page-level title or hero text. |
| `font.size.36` | `36px` | 4pt grid | Display small. Hero headings, feature titles. |
| `font.size.40` | `40px` | 4pt grid | Display medium. Largest heading tier, landing screens. |

All sizes follow a strict 4pt progression. Do not introduce intermediate values (e.g., 15px, 22px, 18px) outside this scale.

---

## 5. Line Height

Line height is defined as a unitless ratio applied to the font size. Unitless values scale correctly across all font sizes without producing subpixel rendering issues.

| Token | Value | Usage note |
|---|---|---|
| `line-height-tight` | `1.2` | Headings, display text, single-line labels. |
| `line-height-normal` | `1.5` | Body text, multi-line copy, form labels. |
| `line-height-loose` | `1.75` | Long-form content, help text, accessibility-sensitive contexts. |

**Rules:**

- Do not use pixel or em line height values. Unitless ratios only.
- Body text must use `line-height-normal` or `line-height-loose`. Never `line-height-tight`.
- Headings use `line-height-tight` at large sizes. Below `font.size.20`, use `line-height-normal`.
- Do not override line height in component specs without a documented accessibility justification.

---

## 6. Font Weights

| Token | Value | Usage note |
|---|---|---|
| `font.weight.regular` | `400` | Default. Body text, secondary labels. |
| `font.weight.medium` | `500` | Mild emphasis. Navigation labels, active states. |
| `font.weight.semibold` | `600` | Strong emphasis. Subheadings, primary labels, key data. |
| `font.weight.bold` | `700` | Maximum emphasis. Headings, critical values, status text. |

These are the only four weights in the system. No other numeric weight value is permitted.

**Rules:**

- Do not use weights outside this set (e.g., 300, 800, 900).
- Do not use `font.weight.bold` for body copy. It is reserved for headings and critical emphasis.
- Weight and size work together to signal hierarchy. Do not rely on weight alone to create hierarchy — pair it with size.
- Avoid stacking multiple emphasis signals (bold + large + uppercase) on the same element. Choose one dominant signal.

---

## 7. Letter Spacing

| Token | Value | Usage note |
|---|---|---|
| `letter-spacing-tight` | `-0.01em` | Large display text, headings at `font.size.24` and above. |
| `letter-spacing-normal` | `0` | Default. All body and UI text. |
| `letter-spacing-wide` | `0.02em` | Uppercase labels, metadata, badges, tags. |

**Rules:**

- Do not apply letter spacing to body text. `letter-spacing-normal` (0) is the correct default.
- `letter-spacing-tight` reduces visual spacing at large sizes where default tracking appears too loose.
- `letter-spacing-wide` is appropriate only for short, all-caps or small-caps text. Do not apply to multi-line content.
- Letter spacing adjustments for RTL scripts are not handled at the primitive level. RTL-specific overrides belong in the token layer.

---

## 8. Usage Rules

| Rule | Detail |
|---|---|
| Primitives are not used in components | No atom or pattern spec may reference `font.size.16` or `font.weight.semibold` directly. |
| Token layer is mandatory | All component typography references a semantic token. The token maps to a primitive combination. |
| No arbitrary font sizes | `font-size: 15px`, `font-size: 22px`, `font-size: 1.3rem` are not permitted anywhere in the system. |
| No unscaled weights | Do not use numeric weight values (300, 800) outside this defined set. |
| Hierarchy is consistent | The same typographic role must resolve to the same tokens across every component. Page titles do not have different sizes in different sections. |
| Line height is always declared | Never rely on browser default line height. Every text element in a component spec must declare a line height token. |

---

## 9. Accessibility

Typography decisions directly affect legibility, readability, and inclusive access.

| Requirement | Rule |
|---|---|
| Minimum font size | `font.size.12` is the absolute minimum for readable text. |
| Body text minimum | Body copy must use `font.size.16` or larger. `font.size.12` is reserved for captions and supplementary metadata only. |
| Line height for body | Multi-line body text must use `line-height-normal` (1.5) or `line-height-loose` (1.75). Tight line heights on body text fail readability requirements. |
| Text resizing | The system must support browser text scaling up to 200% without loss of content or functionality. Do not use fixed-height containers that clip scaled text. |
| Contrast | Text contrast is enforced at the token layer using color primitives. Text tokens must meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text). Refer to [color.md](color.md) for contrast ratios. |
| Multilingual rendering | Font families must support extended Latin, Arabic, and other required scripts. Validate character coverage before finalizing font selection. |
| RTL rendering | Do not use `text-align: left` in component specs. Use `text-align: start`. All directional text properties must use logical CSS equivalents. |
| Uppercase text | Do not use `text-transform: uppercase` on body text or long strings. Uppercase reduces legibility for dyslexic users. Limit to short labels and badges. |

---

## 10. Do / Don't

### ✓ Correct

Reference semantic typography tokens. Let the token resolve to the correct primitive combination.

```
✓  font-size: text.body.md.size
✓  font-weight: text.body.md.weight
✓  line-height: text.body.md.line-height
✓  font-family: font.family
```

The component does not reference a primitive. It does not know which scale step is active. It does not hardcode a size.

---

### ✗ Incorrect

**Using raw font size values**

```
✗  font-size: 16px
✗  font-size: 1rem
✗  font-size: 1.25em
```

Raw values are not traceable, not auditable, and break when the scale changes.

---

**Referencing a primitive directly**

```
✗  font-size: font.size.16
✗  font-weight: font.weight.semibold
✗  line-height: line-height-normal
```

Primitives carry no semantic meaning. A component referencing `font-size-300` directly cannot participate in token-level theming or density switching.

---

**Using arbitrary or out-of-scale values**

```
✗  font-size: 15px
✗  font-size: 22px
✗  letter-spacing: 0.5px
✗  font-weight: 300
```

Values outside the defined scale are not permitted. They introduce visual inconsistency and cannot be systematically updated.

---

**Mixing emphasis signals**

```
✗  font-size: font.size.24 + font.weight.bold + letter-spacing-wide + text-transform: uppercase
```

Stacking multiple emphasis signals on the same element overwhelms hierarchy. Use one dominant signal per element.

---

## 11. Adding New Typography Values

New primitives are added only when the existing scale cannot satisfy a genuine product need.

| Step | Action |
|---|---|
| 1. Justify | State specifically why no existing step satisfies the need. Name the component or content context. |
| 2. Check the scale | Confirm the value does not already exist. Check both the numeric value and the usage note of adjacent steps. |
| 3. Extend carefully | If a new step is justified, assign it the correct numeric name consistent with the scale pattern. Do not name it arbitrarily. |
| 4. Document before use | Add the new primitive to this file with its value and usage note before any token or component references it. |
| 5. Update last-updated | Set `last-updated` in frontmatter to the date of the change. |

Do not add a new step to resolve a one-off design decision. Typography primitives are shared values. Every addition becomes a permanent part of the scale.

---

## 12. Typography Rules

**Bilingual and directional support:**

- Typography must support Arabic (RTL) and English (LTR) rendering.
- `font.family` resolves to the correct typeface through the active language mode. No directional variants of the primitive are created.
- All directional text properties in components must use logical CSS properties (`text-align: start`, `margin-inline-start`). Do not use physical properties (`text-align: left`, `margin-left`).

**Semantic text style composition:**

- Every semantic text style must reference all three primitives: `font.family`, `font.size`, and `font.weight`.
- Line height must always be declared alongside font size. Never rely on browser defaults.
- Do not hardcode typography inside components. Every typographic decision passes through the token layer.

**Naming:**

- Font family: `font.family` — one primitive, mode-driven.
- Font size: `font.size.[value]` — named by the pixel value (e.g., `font.size.16`).
- Font weight: `font.weight.[name]` — named by semantic weight (e.g., `font.weight.semibold`).

---

## 13. Cross-references

- [typography-tokens.md](../tokens/typography-tokens.md) — Semantic token definitions that map to this primitive scale
- [color.md](color.md) — Text contrast requirements depend on color primitives defined in the color foundation
- [spacing.md](spacing.md) — Layout rhythm and text spacing decisions depend on the spacing scale

