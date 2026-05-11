---
name: Radius Foundation
tier: foundation
status: stable
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Radius Foundation

This file defines the primitive border radius layer of the design system. It is the only place where radius values are declared. All border radius decisions in components and patterns must trace back to this scale.

---

## 1. Philosophy

Border radius defines the visual character of the interface. It signals softness or precision. Used inconsistently, it produces an interface that feels unintentional — components that look like they belong to different products.

This system uses **subtle, purposeful rounding**. Shapes are not sharp, nor are they aggressively pill-shaped. The default character is clean and functional, with radius applied to communicate interactivity and container boundaries — not decoration.

**Rules:**

- Radius is a system property. It is not a per-component stylistic choice.
- Primitives are reference values. They are not consumed directly by components or patterns.
- The token layer is required. All component-level radius decisions pass through semantic tokens.
- Arbitrary radius values are banned. If a value is not in the scale, it does not exist in the system.
- Consistency is enforced. Similar component types use the same radius tier. Mixing sharp and rounded styles within the same UI surface is not permitted.

---

## 2. Radius System Structure

The system uses a fixed numeric scale. Steps increase progressively, with a terminal `radius-full` value for pill and circular shapes. The scale is intentionally short — fewer steps mean fewer decisions and higher consistency.

**Separation of concerns:**

```
Radius primitives (this file)
    ↓
Radius tokens (semantic layer)
    ↓
Components and patterns (tokens only)
```

Primitives carry no context. A token such as `radius.component.button.default` carries meaning — it maps to the correct primitive for that component type. The component does not need to know which primitive it resolves to.

**Radius and UI coherence:**

A consistent radius tier across component families creates visual grouping. Cards, panels, and dialogs share one tier. Inputs and buttons share another. Badges and tags use a higher tier. This grouping communicates hierarchy and purpose without additional visual signals.

---

## 3. Radius Scale — Layer 1 (Primitives)

| Token | Value | Usage note |
|---|---|---|
| `radius-0` | `0px` | No rounding. Sharp corners. Structural dividers, table cells, full-bleed containers. |
| `radius-50` | `2px` | Micro rounding. Subtle edge softening. Tooltips, small indicators. |
| `radius-100` | `4px` | Small. Default rounding for compact elements. Tags, chips, small badges. |
| `radius-200` | `6px` | Small-medium. Standard interactive elements. Inputs, selects, compact buttons. |
| `radius-300` | `8px` | Medium. Default for most interactive components. Buttons, dropdowns, popovers. |
| `radius-400` | `12px` | Large. Cards, panels, modals, section containers. |
| `radius-500` | `16px` | Extra large. Prominent containers, feature cards, large overlays. |
| `radius-full` | `9999px` | Full pill. Avatars, toggle switches, pill badges, circular icon buttons. |

The scale is fixed. Do not introduce values between steps (e.g., 3px, 10px, 14px) without following the addition process in section 8.

---

## 4. Usage Rules

| Rule | Detail |
|---|---|
| Primitives are not used in components | No atom or pattern spec may reference `radius-300` or any primitive directly. |
| Token layer is mandatory | All component radius references a semantic token. The token maps to a primitive. |
| No arbitrary values | `border-radius: 5px`, `border-radius: 10px`, `border-radius: 50%` (except via `radius-full`) are not permitted. |
| No mixed scales in a single component | Do not apply different radius tiers to different sides of the same element without a documented structural reason. |
| Visual consistency across families | All components in the same visual family must use the same radius tier. Do not apply `radius-400` to one card and `radius-200` to a similar card in the same context. |
| Prefer limited variation | The fewer distinct radius tiers active on a single screen, the stronger the visual coherence. Default to two or three distinct tiers per view maximum. |
| `radius-full` is context-specific | Use only for inherently circular or pill-shaped elements. Do not apply to rectangular containers or text-heavy components. |

---

## 5. Visual Consistency

Radius contributes to component identity. Components that perform similar functions share a radius tier. This is a system rule, not a recommendation.

| Component type | Expected radius tier | Notes |
|---|---|---|
| Cards and panels | `radius-400` | Applies to all card-like containers regardless of content. |
| Modals and dialogs | `radius-400` | Consistent with card tier. Full-screen modals use `radius-0`. |
| Buttons (default) | `radius-300` | Applies to primary, secondary, and tertiary button variants. |
| Inputs and selects | `radius-200` | Applies to all text input types and select controls. |
| Dropdowns and popovers | `radius-300` | Detached menus align with button radius tier. |
| Badges and tags | `radius-100` | Compact label elements use the small tier. |
| Pill badges and toggles | `radius-full` | Applies when shape is inherently pill or circular. |
| Avatars | `radius-full` | Circular by default. Square avatars use `radius-200`. |
| Tooltips | `radius-50` | Minimal rounding. Tooltips are not interactive containers. |
| Table cells and rows | `radius-0` | No rounding. Tables are structural, not container elements. |

These mappings are defined at the token layer. This table shows expected resolution for orientation only. Do not reference it as a substitute for token definitions.

---

## 6. Accessibility

Border radius is a visual property, but it has direct usability implications.

| Requirement | Rule |
|---|---|
| Boundary clarity | Radius must not reduce the perceived boundary of interactive elements. Buttons and inputs must retain a clear, distinguishable edge at all radius values. |
| Touch target integrity | Rounding a button does not reduce its touch target. The clickable area extends to the full bounding box, not the visible rounded shape. Do not compensate for radius by reducing padding. |
| Focus ring alignment | Focus indicators must follow the element's border radius. A circular focus ring on a rectangular button is not acceptable. Ensure focus styles account for `border-radius` at the token level. |
| Avoid over-rounding text containers | Do not apply `radius-full` to containers with text content. Pill shapes on multi-line or wide text create ambiguous visual containers. |
| Contrast of borders | Radius does not affect contrast requirements. Components that rely on border to define their boundary must maintain 3:1 contrast between border and background regardless of radius. Refer to [color.md](color.md). |

---

## 7. Do / Don't

### ✓ Correct

Reference a semantic radius token. Let the token resolve to the correct primitive.

```
✓  border-radius: radius.component.button.default
✓  border-radius: radius.component.card.default
✓  border-radius: radius.component.input.default
```

The component does not reference a primitive. It does not hardcode a value. All components in the same family resolve to the same tier automatically.

---

### ✗ Incorrect

**Using a raw px value**

```
✗  border-radius: 8px
✗  border-radius: 4px 4px 0 0
✗  border-radius: 10px
```

Raw values are not traceable, not auditable, and cannot be updated systematically across the product.

---

**Referencing a primitive directly**

```
✗  border-radius: radius-300
✗  border-radius: radius-400
```

Primitives carry no semantic meaning. A component referencing `radius-300` directly cannot participate in token-level updates or component-family consistency rules.

---

**Mixing radius styles inconsistently**

```
✗  /* Card A */
   border-radius: 8px

   /* Card B — same context, same component type */
   border-radius: 12px
```

Inconsistent radius within a component family breaks visual grouping. Users perceive the two cards as belonging to different systems.

---

**Applying pill radius to wrong component types**

```
✗  border-radius: 9999px   /* applied to a content card */
✗  border-radius: 50%      /* applied to a rectangular button */
```

`radius-full` is reserved for inherently circular or pill-shaped elements. Applying it to content containers creates visual ambiguity and is not permitted.

---

## 8. Adding New Radius Values

New primitives are added only when the existing scale cannot satisfy a genuine product need.

| Step | Action |
|---|---|
| 1. Justify | State specifically why no existing step satisfies the need. Name the component and describe the visual problem. |
| 2. Check the scale | Confirm the value does not already exist. Check adjacent steps — a 1–2px difference is not sufficient justification. |
| 3. Extend carefully | If a new step is justified, assign it the correct numeric name consistent with the scale pattern. Do not insert a step between two existing steps without renaming. |
| 4. Document before use | Add the new primitive to this file with its value and usage note before any token or component references it. |
| 5. Update last-updated | Set `last-updated` in frontmatter to the date of the change. |

Do not add a new step to resolve a one-off design preference. Radius primitives are shared values. Every addition affects the visual character of the entire system.

---

## 9. Cross-references

- [radius-tokens.md](../tokens/radius-tokens.md) — Semantic token definitions that map to this primitive scale
- [spacing.md](spacing.md) — Spatial balance between container padding and border radius depends on spacing primitives
- [color.md](color.md) — Border contrast requirements apply to all components that use radius to define their boundary
