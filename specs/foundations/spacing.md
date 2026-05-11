---
name: Spacing Foundation
tier: foundation
status: stable
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Spacing Foundation

This file defines the primitive spacing layer of the design system. It is the only place where spacing values are declared. All spacing decisions in components and patterns must trace back to this scale.

---

## 1. Philosophy

Spacing creates hierarchy, separates content, and guides the eye. Inconsistent spacing breaks visual rhythm and makes interfaces feel unfinished regardless of color or typography quality.

**Rules:**

- Spacing decisions are not arbitrary. Every gap, padding, and margin must map to a named primitive.
- Consistency is enforced through the scale. Values outside the scale are not permitted.
- Primitives are reference values. They are not consumed directly by components or patterns.
- The token layer is required. All component-level spacing decisions pass through semantic tokens.
- Rhythm is a system property. Individual components do not define their own spacing logic.

---

## 2. Spacing System Structure

The system is based on a **4pt grid**. All primary spacing values must be multiples of 4 (4, 8, 12, 16, 20, 24, …). The values `0` and `2` are permitted as limited exceptions for fine adjustments only — not for general layout or component spacing. Do not use arbitrary spacing values outside this system.

The system uses a **4px base unit**. All scale steps are multiples or subdivisions of 4px. This base aligns with standard screen rendering grids and supports both comfortable and compact density modes without introducing fractional values.

**Why 4px:**

- Divisible by 2 — supports half-step increments at small scales without subpixel rendering.
- Aligns with an 8px grid at larger steps — compatible with standard layout grids.
- Produces clean values across all standard screen densities.

**Scale approach:**

The scale is non-linear. Small steps are fine-grained for component internals (padding, gaps, icon spacing). Large steps are coarser for layout (section gaps, page margins). The scale does not need to be exhaustive — density is achieved by choosing the right step, not by adding more steps.

```
4px base
  ↓
Spacing scale (primitives)
  ↓
Spacing tokens (semantic layer)
  ↓
Components and patterns (tokens only)
```

---

## 3. Spacing Scale — Layer 1 (Primitives)

| Token | Value | Usage note |
|---|---|---|
| `space-0` | `0px` | No spacing. Explicit zero — never omit when zero is intentional. |
| `space-25` | `2px` | Micro spacing. Fine adjustments within a component (icon offset, indicator nudge). |
| `space-50` | `4px` | Extra small. Tight internal gaps, inline element spacing. |
| `space-100` | `8px` | Small. Standard component internal padding, icon-to-label gap. |
| `space-150` | `12px` | Small-medium. Compact list item padding, inline form spacing. |
| `space-200` | `16px` | Medium. Default component padding. Most frequent internal spacing step. |
| `space-300` | `24px` | Medium-large. Section internal spacing, card padding. |
| `space-400` | `32px` | Large. Component group separation, panel padding. |
| `space-500` | `40px` | Extra large. Major section separation. |
| `space-600` | `48px` | 2x large. Page section gaps, dialog padding. |
| `space-800` | `64px` | 3x large. Layout-level spacing, hero sections. |
| `space-1000` | `80px` | Maximum. Full-page layout margins, top-level section breaks. |

The scale is fixed. Do not introduce values between steps without following the addition process in section 9.

---

## 4. Usage Rules

| Rule | Detail |
|---|---|
| Primitives are not used in components | No atom or pattern spec may reference `space-200` or any other primitive directly. |
| Token layer is mandatory | All component spacing references a semantic spacing token. The token maps to a primitive. |
| No arbitrary values | `margin: 13px`, `padding: 22px`, `gap: 7px` are not permitted anywhere in the system. |
| No mixed scales | Do not combine system spacing values with arbitrary values in the same decision. |
| Visual rhythm is a system rule | Adjacent components and sections must use steps from the same scale. Do not skip steps without a documented reason. |
| Density decisions belong to tokens | Comfortable and compact density are handled at the token layer. Primitives do not change between density modes. |

---

## 5. Layout and Density Concept

The spacing system serves two distinct contexts: **component spacing** and **layout spacing**. They draw from the same primitive scale but are governed by separate token categories.

**Component spacing**
Padding, internal gaps, and icon spacing within a single atom. Uses the lower half of the scale (`space-25` through `space-300`).

**Layout spacing**
Gaps between sections, page margins, and structural whitespace. Uses the upper half of the scale (`space-400` through `space-1000`).

**Density modes**

| Mode | Description | Scale tendency |
|---|---|---|
| Comfortable | Default. Generous internal padding. Optimized for readability. | `space-200` and above for component padding |
| Compact | Reduced padding. For data-dense interfaces and power users. | `space-100` to `space-150` for component padding |

Density is not a component property. It is a token-level switch. Components do not change their primitive references when density changes — the tokens they reference resolve to different primitives.

**Responsiveness**

Spacing may adapt across breakpoints. Adaptation is handled at the token layer. A layout token may resolve to `space-400` on desktop and `space-200` on mobile. The component does not change. The token resolves to the correct primitive for the current breakpoint context.

---

## 6. Theming and Responsiveness

Spacing primitives are theme-agnostic. They do not change between light and dark modes. A `space-200` value is `16px` in both themes.

**Rules:**

- Do not define theme-specific spacing primitives.
- Do not write spacing values that assume a screen size.
- Responsive spacing is a token concern. If spacing must adapt at a breakpoint, define a responsive token — do not hardcode a breakpoint-specific primitive.
- Spacing tokens may resolve to different primitives per breakpoint. This is expected and correct behavior.

---

## 7. Accessibility

Spacing directly affects readability, touch usability, and cognitive load.

| Requirement | Rule |
|---|---|
| Touch targets | Interactive elements must have a minimum touch target of 44×44px. Use spacing tokens to achieve this — do not shrink below this threshold in compact mode. |
| Text line spacing | Line height decisions belong to typography. Do not use margin or padding to compensate for insufficient line height. |
| Content separation | Related content must be visually grouped. Use smaller spacing steps within groups, larger steps between groups. |
| Focus ring clearance | Focused elements must have enough surrounding space that the focus ring is not clipped or obscured by adjacent elements. |
| Proximity and grouping | Items spaced too closely lose their individual identity. Items spaced too far apart lose their relationship. Neither extreme is acceptable. |

Spacing is not a cosmetic decision. Insufficient spacing creates barriers for users with low vision, motor impairments, or cognitive differences.

---

## 8. Do / Don't

### ✓ Correct

Reference a semantic spacing token. Let the token resolve to the correct primitive.

```
✓  padding: space.component.button.padding
✓  gap: space.component.form.field-gap
✓  margin-block-end: space.layout.section.gap
```

The component does not reference a primitive. It does not hardcode a value. It does not know which screen size or density mode is active.

---

### ✗ Incorrect

**Using a raw px value**

```
✗  padding: 16px
✗  gap: 8px
✗  margin-bottom: 24px
```

Raw values are not traceable, not auditable, and break under density or responsive changes.

---

**Referencing a primitive directly**

```
✗  padding: space-200
✗  gap: space-100
✗  margin: space-300
```

Primitives carry no semantic meaning. A component referencing `space-200` directly cannot participate in density switching or responsive token resolution.

---

**Using arbitrary or inconsistent values**

```
✗  padding: 13px 18px
✗  gap: 7px
✗  margin-top: 22px
```

Values outside the scale are not permitted. They introduce visual inconsistency and cannot be systematically updated.

---

**Mixing scale values with arbitrary values**

```
✗  padding: 16px 13px      /* one value on-scale, one off */
✗  gap: space-100 + 3px    /* modifying a scale value */
```

All values in a single spacing declaration must come from the scale. Mixing is not permitted.

---

## 9. Adding New Spacing Values

New primitives are added only when the existing scale cannot satisfy a genuine product need.

| Step | Action |
|---|---|
| 1. Justify | State specifically why no existing step satisfies the need. Name the component or layout context. |
| 2. Check the scale | Confirm the value does not already exist under a different step name. Check both px value and usage note. |
| 3. Extend the scale | If a new step is justified, assign it the correct numeric name based on its px value. Do not name it arbitrarily. |
| 4. Document before use | Add the new primitive to this file with its value and usage note before any token or component references it. |
| 5. Update last-updated | Set `last-updated` in frontmatter to the date of the change. |

Do not add a new step to resolve a one-off design decision. Spacing primitives are shared values. Every addition becomes a permanent part of the scale and must be maintained indefinitely.

---

## 10. Cross-references

- [spacing-tokens.md](../tokens/spacing-tokens.md) — Semantic token definitions that map to this primitive scale
- [patterns/forms.md](../patterns/forms.md) — Form layout spacing references layout and component spacing tokens
- [patterns/tables.md](../patterns/tables.md) — Table row density is governed by spacing tokens derived from this scale
