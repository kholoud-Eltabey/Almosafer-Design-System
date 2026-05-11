---
name: Border Width Foundation
tier: foundation
status: stable
last-updated: 2026-05-11
maintainer: Team 4
source: Almosafer Design System
---

# Border Width Foundation

This file defines the primitive border width layer of the design system. It is the only place where border width values are declared. All border width decisions in components and patterns must trace back to this scale.

---

## 1. Philosophy

Border width defines the visual weight of boundaries and emphasis states. Used inconsistently, borders lose their communicative function — a focus ring indistinguishable from a default border, or an error state that carries no visual urgency.

This system uses **purposeful width steps**. The scale is minimal by design. Each step has a distinct communicative role: invisible, structural, emphasized, and strong. Adding width beyond what the role requires adds noise. Adding less reduces clarity.

**Rules:**

- Border width is a system property. It is not a per-component stylistic choice.
- Primitives are reference values. They are not consumed directly by components or patterns.
- The token layer is required. All component-level border width decisions pass through semantic tokens.
- Arbitrary width values are banned. If a value is not in the scale, it does not exist in the system.
- Consistency is enforced. The same interaction state always uses the same width tier across all components.

---

## 2. Border Width System Structure

The system uses a fixed numeric scale. Steps are named by their pixel value. The scale is intentionally short — four steps cover every use case this system requires.

**Separation of concerns:**

```
Border width primitives (this file)
    ↓
Border width tokens (semantic layer)
    ↓
Components and patterns (tokens only)
```

Primitives carry no context. A token such as `border.width.focus` carries meaning — it maps to the correct primitive for focus states across all components. The component does not need to know which primitive it resolves to.

---

## 3. Border Width Scale — Layer 1 (Primitives)

| Name | Value | Usage note |
|---|---|---|
| `border-width-0` | `0px` | No border. Used to suppress a border without removing the property. Background-only components with no visible edge. |
| `border-width-1` | `1px` | Default structural border. Input outlines, card edges, dividers, table cell borders. |
| `border-width-2` | `2px` | Emphasis state border. Focus rings, error states, selected and active states requiring stronger visual signal. |
| `border-width-4` | `4px` | Strong accent border. Left-edge emphasis on notifications, callouts, and high-priority indicators. |

The scale is fixed. Do not introduce values between or beyond these steps without following the addition process in section 7.

---

## 4. Usage Rules

| Rule | Detail |
|---|---|
| Primitives are not used in components | No atom or pattern spec may reference `border-width-2` or any primitive directly. |
| Token layer is mandatory | All component border width references a semantic token. The token maps to a primitive. |
| No arbitrary values | `border-width: 3px`, `border-width: 5px`, `outline-width: 1.5px` are not permitted. |
| `border-width-0` is not the same as no border | A layer with `border-width-0` still carries a border property. Use it intentionally when suppressing a border that exists in another state. |
| Width and color are independent | Border width tokens do not include color. Color decisions pass through `color.border.*` tokens. Width and color are always bound separately. |

---

## 5. State Mapping

Border width communicates interaction state. This table shows the expected resolution by state. All mappings are enforced at the token layer.

| State | Expected width tier | Notes |
|---|---|---|
| Default | `border-width-1` | Standard structural edge. Inputs, cards, separators. |
| Hover | `border-width-1` | Width does not change on hover. Color changes signal hover. |
| Focus | `border-width-2` | Focus rings must be heavier than the default border. |
| Active | `border-width-1` | Width does not change on press. Background change signals active. |
| Error / invalid | `border-width-2` | Error borders match focus weight for equal visual urgency. |
| Selected | `border-width-2` | Selected borders match focus weight for consistency. |
| Disabled | `border-width-1` | Disabled components retain structural width. Color desaturates. |
| Strong accent | `border-width-4` | Left-edge callouts, notification priority markers. Not for interactive states. |

These mappings are defined at the token layer. This table shows expected resolution for orientation only.

---

## 6. Accessibility

Border width has direct accessibility implications, particularly for keyboard navigation and input state visibility.

| Requirement | Rule |
|---|---|
| Focus ring visibility | The focus ring must use `border-width-2` minimum to meet WCAG 2.1 SC 2.4.11 (Focus Appearance). A 1px focus ring does not satisfy this criterion. |
| Error indication | Error states must not rely on color alone. A heavier border width (`border-width-2`) paired with an error color token is the required pairing. This satisfies WCAG 1.4.1 (Use of Color). |
| High-contrast mode | Border width values must render correctly in Windows High Contrast and forced-colors mode. Do not suppress borders in interactive elements via `border-width-0` without a structural alternative. |
| Touch target integrity | Border width does not reduce touch target size. Component padding and hit area remain fixed regardless of border width. |
| Minimum contrast | Border color combined with background must meet 3:1 contrast ratio for non-decorative UI components. This is a color token concern, but width does not compensate for contrast failure. |

---

## 7. Adding New Border Width Values

New primitives are added only when the existing scale cannot satisfy a genuine product need.

| Step | Action |
|---|---|
| 1. Justify | State specifically why no existing step satisfies the need. Name the component and describe the visual problem. |
| 2. Check the scale | Confirm the value does not already exist. A 1px difference from an existing step is not sufficient justification. |
| 3. Extend carefully | If a new step is justified, name it after its pixel value, consistent with the scale pattern (`border-width-3`, `border-width-6`). |
| 4. Document before use | Add the new primitive to this file with its value and usage note before any token or component references it. |
| 5. Update last-updated | Set `last-updated` in frontmatter to the date of the change. |

Do not add a new step to resolve a one-off design preference. Border width primitives are shared values. Every addition affects the visual weight system of the entire product.

---

## 8. Do / Don't

### ✓ Correct

Reference a semantic border width token. Let the token resolve to the correct primitive.

```
✓  border-width: border.width.default
✓  border-width: border.width.focus
✓  border-width: border.width.error
```

The component does not reference a primitive. It does not hardcode a value. All components in the same state resolve to the same width automatically.

---

### ✗ Incorrect

**Using a raw px value**

```
✗  border-width: 1px
✗  border-width: 2px
✗  outline-width: 2px
```

Raw values are not traceable, not auditable, and cannot be updated systematically across the product.

---

**Referencing a primitive directly**

```
✗  border-width: border-width-2
✗  outline-width: border-width-1
```

Primitives carry no semantic meaning. A component referencing `border-width-2` directly cannot participate in token-level updates.

---

**Mixing width and color into a single shorthand**

```
✗  border: 2px solid #005C5C
```

Shorthand properties combine width and color in a way that bypasses the token system for both. Always separate border width and border color into independently token-bound properties.

---

## 9. Cross-references

- [token-reference.md](../tokens/token-reference.md) — Semantic border width tokens that map to this primitive scale
- [color.md](color.md) — Border color tokens used alongside border width tokens
- [radius.md](radius.md) — Border radius values that shape the same boundaries this scale controls
