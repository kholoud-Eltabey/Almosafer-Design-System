---
name: Design System — Source of Truth
tier: enforcement
status: stable
last-updated: 2026-05-06
maintainer: Team 4
source: Atlassian Design System — https://atlassian.design
---

# Design System — Source of Truth

This document defines the structure, rules, and philosophy of this design system. It is the single reference point for all design and engineering decisions.

---

## 1. Project Context

The current product implementation is **Almosafer** — a travel booking platform covering flights, hotels, and packages. It supports Arabic and English speakers equally. Both languages are primary. The interface renders correctly in RTL and LTR layouts. Users make time-sensitive, high-stakes decisions. Trust, clarity, and speed are non-negotiable.

**System philosophy:**

- **Trust.** Every visual decision must signal reliability. Inconsistent components erode confidence at the moment of booking.
- **Clarity.** Hierarchy is strict. Users must always know where they are, what they can do, and what happens next.
- **Predictability.** Users learn the system once. Patterns must behave consistently across every surface.
- **Easy comparison.** Catalog layouts, pricing, and filters must support rapid, parallel evaluation of options.

The system is built as a thin product layer on top of a structured foundation. The foundation defines raw values. Tokens give those values meaning. Components consume tokens. Nothing skips a layer.

---

## 2. Design Principles

| Principle | Decision rule |
|---|---|
| Structure over decoration | Add visual weight only when it carries meaning. Remove it when it does not. |
| Tokens before custom | If a token exists for the decision, use it. Do not write a custom value. |
| Accessibility is not optional | WCAG 2.1 AA is the floor. Design for keyboard, screen reader, and low-vision users from the start. |
| Consistency over flexibility | Prefer fewer, consistent choices over many flexible ones. Flexibility is a source of drift. |
| Density without clutter | Information can be dense. Noise cannot. Remove anything that does not contribute to the user's task. |
| RTL is a first-class concern | Every layout decision must account for both LTR and RTL. Directional properties use logical CSS. |

---

## 3. Foundations — Tier 1

Foundations hold raw design decisions. They are the only place where raw values are permitted. No component or token may introduce a value that does not originate here.

| File | Responsibility |
|---|---|
| [color.md](specs/foundations/color.md) | Full color palette. Neutral, brand, status, and data visualization scales. Raw HEX values only. The brand scale (50–900) is structurally fixed — HEX values may change per product to support multi-brand flexibility while the scale structure remains unchanged. Light and dark themes are resolved entirely at the token layer; primitives are theme-agnostic. |
| [spacing.md](specs/foundations/spacing.md) | Spacing scale. Base-4 or base-8 increments. Named steps used across all layout and component spacing. |
| [typography.md](specs/foundations/typography.md) | Font families, size scale, line height scale, font weight scale, letter spacing scale. |
| [motion.md](specs/foundations/motion.md) | Duration scale and easing curves. Defines fast, short, medium, and complex motion durations. |
| [radius.md](specs/foundations/radius.md) | Border radius scale. From sharp (0) to full (pill). Named steps only. |

Foundations are not consumed directly by components. They are consumed by tokens.

---

## 4. Token System — Tier 2

Tokens translate foundation values into decisions with semantic meaning. All component styles must be expressed in tokens.

### Architecture

**Layer 1 — Primitives**
Direct aliases for foundation values. Named by value or scale position, not intent.
Example: `brand.500`, `neutral.100`, `space-200`, `radius-100`, `font.size.16`, `font.weight.semibold`

**Layer 2 — Semantic tokens**
Named by intent. Map to primitives. This is where decisions are made.
Example: `color.background.primary`, `color.text.subtle`, `text.body`, `text.heading.md`

**Layer 3 — Component usage**
Tokens resolved at the component level. Reference semantic tokens only.
Example: a button's background resolves to `color.background.primary`, not to `brand.500`.

Components reference tokens only. No component may bypass the token layer.

Color decisions follow the same rule: a component never references a color primitive such as `brand.500` or `neutral.800` directly. It references a semantic token such as `color.background.brand.default`, which resolves to the correct primitive for the active theme. This is how light and dark mode switching works without any change to the component.

### Banned in component styles

The following are not permitted in any atom or pattern spec:

- Raw HEX values — `#1D2125`, `rgba(0,0,0,0.5)`
- Raw px values — `14px`, `8px` (exception: 1px borders where no token exists and the value is structurally fixed)
- Direct primitive usage — `brand.500`, `neutral.800`, `font.size.16`, `font.weight.bold`, `space-200`

If a required token does not exist, define it in the token layer first. Do not skip the layer.

---

## 5. Components — Tier 3

Components are the atoms of the interface. Each atom is a single-purpose, self-contained unit. Atoms do not compose other atoms. They are consumed by patterns.

### Atoms folder

All atom specs live in `/specs/atoms`. One file per component. File names are lowercase and hyphen-separated.

Examples: `button.md`, `input.md`, `badge.md`, `avatar.md`, `checkbox.md`, `icon.md`

Specs define how components are used — their purpose, constraints, tokens, variants, states, and accessibility requirements. They are not implementation files.

### Mandatory spec sections

Every atom spec must include these sections in this order:

1. Overview
2. When to use
3. When not to use
4. Anatomy
5. Tokens used
6. Variants
7. Sizes
8. States
9. Behavior
10. Accessibility
11. Content guidelines
12. Code example
13. Cross references

A spec is not complete until all 13 sections are present.

---

## 6. Patterns — Tier 4

Patterns are cross-component compositions. They define how atoms and tokens combine to solve recurring interface problems. Patterns set layout rules, interaction flows, and content structure for repeatable scenarios.

Patterns do not define new visual primitives. They use what atoms and tokens already provide.

### Examples

- **Forms** — field arrangement, label placement, validation behavior, error messaging, submission states.
- **Dialogs** — focus trap, header and body structure, action placement, dismiss behavior.
- **Tables** — column behavior, sorting states, empty states, pagination, row actions.
- **Empty states** — icon usage, headline rules, body copy constraints, action placement.

Each pattern spec follows the same structure as atoms, with an added Composition section listing the atoms it uses.

---

## 7. Flows — Tier 5

Flows are complete user journeys that connect patterns and atoms into real product experiences. Where a pattern solves a recurring interface problem in isolation, a flow sequences those solutions into an end-to-end arc — from a user's entry point through every decision, state, and transition to their goal.

Flows do not define new visual primitives. They compose existing patterns and atoms. A flow spec describes the full shape of an interaction: how the user enters, what they encounter at each step, how variants branch, how states are communicated, and how errors and edge cases are handled.

### Flows folder

All flow specs live in `/specs/flows`. One file per journey. File names are lowercase and hyphen-separated.

### Two categories

**Core flows** — Primary journeys that define the product's essential value. Must be fully specified before the product ships.

**Supporting flows** — Operational and recovery journeys that handle post-primary interactions, errors, and edge cases.

Flows reference patterns and atoms. They add no raw values and introduce no new styling primitives.

---

## 8. Enforcement

[CLAUDE.md](CLAUDE.md) is the enforcement engine for this system.

All rules defined in CLAUDE.md are mandatory. They govern how files are generated, edited, and reviewed. They are not suggestions.

**Core enforcement behaviors:**

- Files are not rewritten unless explicitly requested.
- No extra files are generated beyond what is asked.
- Layer separation is enforced in every file. Atoms never reference foundations. Patterns never define new raw values.
- Accessibility is verified in every atom before a spec is marked stable.
- Token names must follow the naming convention on every write. Deviations are not permitted.

Consistency is maintained by following the structure. If a decision conflicts with a rule in CLAUDE.md, the rule wins. If a rule is insufficient for a new situation, the user is asked before proceeding.

---

## 9. Versioning and Updates

The system evolves incrementally. Stability is preserved by following a clear update strategy.

**Tokens**

Tokens are versioned by intent. When a token's mapped value changes, the token name is preserved and the foundation value is updated. When a token's semantic meaning changes, a new token is introduced and the old one is deprecated before removal.

Deprecated tokens remain in the system with `status: deprecated` until all references are migrated.

**Patterns**

Patterns evolve as product needs expand. A pattern moves through `draft → review → stable`. A pattern is never deleted — it is deprecated and replaced by a new spec.

**Foundations**

Foundation values change only when a deliberate design decision has been made. Raw value changes propagate automatically through the token and component layers.

---

## 10. When to Update Specs

| Trigger | Action |
|---|---|
| A component gains a new visual variant | Add the variant to the relevant atom spec. Update tokens if required. |
| A token is renamed or removed | Update all specs that reference it. Mark the old token deprecated. |
| A new pattern is identified in the product | Create a draft pattern spec. List the atoms it uses. Move to review when complete. |
| An accessibility requirement changes | Update the Accessibility section in the affected atom spec. Re-validate against WCAG 2.1 AA. |
| A foundation value changes | Update the foundation file. Verify token references are still valid. |
| A component is deprecated | Set `status: deprecated` in the spec. Do not delete the file. |
| A new atom is introduced | Create the full spec. All 13 sections must be complete before status moves to review. |

---

## 11. System Goal

This system exists to make the product faster to build, easier to maintain, and impossible to break by accident.

Designers work within a defined language. Engineers implement against a precise contract. Both teams operate from the same source of truth. Decisions made once are inherited everywhere.

The system scales because it separates concerns. Foundations hold values. Tokens give values meaning. Atoms apply meaning to interface elements. Patterns compose elements into experiences. Each layer is self-contained, testable, and replaceable without breaking the layers above or below.

Consistency is not a visual goal. It is an operational one. A consistent system reduces decision fatigue, eliminates drift, and lets both teams focus on product problems rather than design debt.

---

## 12. System Philosophy

This system is built on four principles that govern every structural and naming decision.

**Token-driven architecture**
Every visual decision — color, spacing, radius, motion — is expressed through a semantic token. Tokens sit between raw foundation values and the components that consume them. A component that references a token participates automatically in theming, density switching, and systematic updates. A component that bypasses the token layer does not.

**Reusability across multiple products**
The system is not a single-product stylesheet. It is a shared design language that multiple products can adopt without modification to the system itself. Adaptation is achieved through product context and token resolution — not by forking or customising the system's atoms and patterns.

**Consistency and scalability**
Decisions made once in the token and atom layers propagate automatically to every pattern and surface that consumes them. Adding a new product or domain does not require changes to existing foundations, tokens, or atoms. The system scales by extension, not by duplication.

**Separation between design system and product context**
The design system defines the language. The product defines how that language is used. These two concerns are maintained in separate files and must never be merged. System specs contain no product-specific logic. Product context contains no system-level decisions.

---

## 13. Product Separation

This design system is not tied to any specific product, brand, or organisation.

Product-specific context — including user priorities, interaction density, localization requirements, and domain-specific flows — is defined in a separate `product.md` file maintained alongside the system by the adopting product team. That file does not modify the system. It provides context for how the system is applied.

The system must remain product-agnostic. No atom, pattern, foundation, or token spec may reference a product name, a product-specific feature, or an assumption that holds for only one product. When a decision applies to one product but not universally, it belongs in product context — not in the design system.

**Implications:**

- Atom and pattern specs describe universal interface problems, not product flows.
- Token names describe semantic intent, not product terminology.
- Content guidelines use generic examples rather than brand-specific copy.
- Cross-references point to system files only, never to product documentation.

---

## 14. Product Adaptation

The system is designed to be adopted across different products and domains without modification to the system itself. Adaptation happens at two levels.

**Token resolution**
A product team maps the system's semantic tokens to their own foundation values. The token names and their semantic meaning remain unchanged. The resolved values change to reflect the product's visual identity — different brand colors, a tighter spacing scale, a different type scale — without affecting any atom or pattern that references those tokens.

**Product context**
A product team documents their specific constraints, flows, and priorities in a `product.md` file. This file informs how system components are applied and prioritised in that product. It does not alter atoms, patterns, foundations, or tokens. The system itself remains unchanged.

This two-level model means the same catalog-card pattern, dialog, form, and table can be deployed in an e-commerce storefront and a healthcare dashboard using the same specs. The visual output differs because the token values differ. The structure, accessibility requirements, and interaction rules are identical.

---

## 15. Supported Domains

The system is designed to cover the full range of interface problems encountered across modern digital products. The following domains are explicitly supported.

| Domain | Representative use cases |
|---|---|
| E-commerce | Product catalogs, cart flows, checkout, order tracking, storefronts |
| Food delivery | Restaurant listings, menu browsing, item selection, delivery tracking |
| SaaS dashboards | Data tables, analytics views, filters, operator-facing controls |
| Finance and banking | Account summaries, transaction histories, payment flows, statements |
| Healthcare | Appointment scheduling, patient records, prescription management, triage |
| Education platforms | Course catalogs, progress tracking, assessments, learner dashboards |
| Transportation and logistics | Route planning, shipment tracking, fleet management, booking flows |
| Enterprise systems | HR portals, CRM interfaces, workflow management, reporting dashboards |
| Media and entertainment | Content catalogs, player interfaces, subscription management, recommendations |
| Real estate | Property listings, search and filter, booking and inquiry flows |
| Social and community platforms | User profiles, feeds, messaging interfaces, content moderation |

Adding support for a new domain requires no changes to the design system. The appropriate atoms and patterns are selected, a product context file is authored, and tokens are resolved to the domain's visual identity. The system layer remains untouched.
