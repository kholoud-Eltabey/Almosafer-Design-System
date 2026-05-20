---
name: Design System — README
tier: enforcement
status: stable
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Design System

A token-driven, bilingual design system built for Almosafer. It covers travel booking experiences across flights, hotels, and packages. The system is structured for reuse — branding and product context are applied through tokens, not embedded in components.

---

## Architecture

```
Layer 1 — Foundations   /specs/foundations
  Raw values only: HEX, px, ms, easing curves.
  The only place in the system where raw values are permitted.

Layer 2 — Tokens        /specs/tokens
  Semantic mapping layer. Every token maps a name to a foundation primitive.
  The only layer referenced by components.

Layer 3 — Atoms         /specs/atoms
  Single-purpose components. Consume tokens only.

Layer 4 — Patterns      /specs/patterns
  Compositions of atoms that solve recurring interface problems.

Layer 5 — Flows         /specs/flows
  Complete user journeys built from patterns and atoms.
```

No layer may skip a level. A component that references a foundation primitive directly violates the contract.

---

## Foundations

| File | Responsibility |
|---|---|
| [color.md](specs/foundations/color.md) | Brand (teal), neutral, status, and extended color scales. Raw HEX only. |
| [typography.md](specs/foundations/typography.md) | `font.family` (mode-based), `font.size.*`, `font.weight.*`, line height, letter spacing. |
| [spacing.md](specs/foundations/spacing.md) | Spacing scale. Named steps used across all layout and component decisions. |
| [radius.md](specs/foundations/radius.md) | Border radius scale. From `radius-0` (sharp) to `radius-full` (pill). |
| [motion.md](specs/foundations/motion.md) | Duration and easing scale. Fast, normal, slow, enter, exit, layout. |

---

## Token System

All semantic tokens are defined in [token-reference.md](specs/tokens/token-reference.md).

Tokens cover:
- **Color** — background, surface, text, border, status
- **Typography** — text styles composing `font.family`, `font.size.*`, `font.weight.*`
- **Spacing** — xs through layout.lg
- **Radius** — none through full
- **Motion** — fast through layout

---

## Bilingual Support

The system supports Arabic (RTL) and English (LTR) through a single `font.family` primitive with two modes:

| Mode | Resolves to |
|---|---|
| English | IBM Plex Sans |
| Arabic | Cairo |

Font family switches with the active `lang` attribute and layout direction. No separate primitives or token variants are created per language. All directional layout properties in component specs use logical CSS (`text-align: start`, `margin-inline-start`).

---

## Theming

Light and dark themes are resolved entirely at the token layer. Primitives are theme-agnostic. A semantic token such as `color.background.default` maps to `neutral.0` in light mode and `neutral.900` in dark mode. Components do not change between themes.

---

## Branding

Almosafer uses a teal-based brand identity. Brand colors are applied through tokens only:

- `color.background.primary` → `brand.500`
- `color.text.brand` → `brand.500`
- `color.border.focus` → `brand.500`

No component spec may reference a brand color directly. All branding changes are made at the token layer.

---

## Maintainer

Team 4

---

## Enforcement

Rules for generating, editing, and reviewing all files in this system are defined in [CLAUDE.md](CLAUDE.md). All rules are mandatory.

---

## Key Files

| File | Purpose |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Binding rules for all file generation and editing |
| [Design.md](Design.md) | System philosophy and architecture decisions |
| [product.md](product.md) | Almosafer product context and UX priorities |
| [token-reference.md](specs/tokens/token-reference.md) | All semantic token definitions |
| [color.md](specs/foundations/color.md) | Color primitive scale |
| [typography.md](specs/foundations/typography.md) | Typography primitive scale |
