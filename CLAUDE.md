---
name: claude-system
tier: enforcement
status: stable
last-updated: 2026-04-28
maintainer: Team 4
source: Atlassian Design System — https://atlassian.design
---

# Design System — Operating Contract

This file defines strict rules that must be followed when generating or modifying any Design System files. It is not documentation. It is the binding contract for all generation, editing, and review of files in this project. Every rule below is mandatory unless explicitly overridden by the user in the current session.

---

## Project Structure

```
/specs
  /foundations
  /tokens
  /atoms
  /patterns
  /flows
```

Do not create folders outside this structure. Do not rename folders. Do not move files between folders without explicit user permission.

---

## Layer Definitions

### Layer 1 — Foundations

- Raw design decisions. The source of truth for all visual properties.
- May contain: HEX values, px values, rem values, font sizes, line heights, durations, easing curves.
- Scope: color palettes, typography scales, spacing scales, border radius scales, shadow scales, motion scales.
- Rule: Foundation values must never be referenced directly in atom specs. They are consumed only by tokens.

### Layer 2 — Tokens

- Semantic mapping layer. Every token maps to a foundation value.
- Must reference foundations by name, not by raw value.
- Tokens are the only allowed styling source for atoms and patterns.
- Naming pattern: `[category].[role].[property].[state]`
- Examples:
  - `color.background.neutral.default`
  - `color.text.subtle.default`
  - `color.border.focused`
  - `space.component.button.padding`
  - `radius.component.card.default`

### Layer 3 — Atoms

- Small, single-purpose reusable components.
- Examples: button, input, checkbox, badge, icon, avatar, tag, tooltip, spinner.
- Must use tokens only. No raw HEX, px, rem, or font values permitted.
- No foundation references. No inline styles. No hardcoded values.
- Each atom spec must follow the mandatory structure defined below.

### Layer 4 — Patterns

- Reusable UI compositions built from atoms that solve recurring interface problems.
- Examples: forms, dialogs, empty states, search, notifications, data tables, catalog layouts.
- Must reference atoms by name and tokens for any additional styling decisions.
- Do not introduce raw values or foundation references.

### Layer 5 — Flows

- Complete user journeys that sequence patterns and atoms into product experiences.
- `/specs/flows` contains two categories:
  - **Core flows** — Primary journeys the product depends on: checkout, onboarding, navigation, order tracking.
  - **Supporting flows** — Operational and recovery journeys: cancellation, refund and return, error states, notifications.
- Must reference patterns and atoms by name. No raw values. No foundation references.
- Flow files must use `tier: flow`.

---

## Metadata — Required Frontmatter

Every `.md` file in this project must open with this frontmatter block. No exceptions.

```yaml
---
name:
tier:
status:
last-updated:
maintainer:
source:
---
```

### Allowed `tier` Values

| Value | Used In |
|---|---|
| `foundation` | /specs/foundations |
| `token` | /specs/tokens |
| `atom` | /specs/atoms |
| `pattern` | /specs/patterns |
| `flow` | /specs/flows |
| `enforcement` | CLAUDE.md only |
| `governance` | governance.md — operational rules and contribution process |

### Allowed `status` Values

| Value | Meaning |
|---|---|
| `draft` | Work in progress, not ready for use |
| `review` | Pending review before promotion |
| `stable` | Approved, safe to reference |
| `deprecated` | No longer in use, preserved for reference only |

---

## Enforcement Rules

### File Generation

- Output Markdown only when generating `.md` files.
- Do not generate extra files unless explicitly requested.
- Do not create a file that already exists unless explicitly asked to rewrite it.
- Do not split a single spec into multiple files without permission.
- Every generated file must include valid frontmatter.

### File Editing

- Do not rewrite a completed file unless explicitly instructed.
- Continue from existing structure and content.
- Preserve all existing frontmatter values unless changing a specific field was requested.
- Do not change `status` to `stable` without user confirmation.

### Layer Integrity

- Do not mix layers in one file.
- Do not reference foundations directly in atom, pattern, or flow specs.
- Do not use raw values (HEX, px, rem, ms) in atom, pattern, or flow specs.
- Tokens are the only styling source for atoms, patterns, and flows.
- Flows may reference patterns and atoms. Patterns may reference atoms. Neither may skip a layer.

### Naming

- Token names must follow: `[category].[role].[property].[state]`
- State is optional when the token is stateless.
- Do not invent new naming categories without user approval.
- Be consistent. If a category exists, extend it. Do not duplicate.

### Behavior During Generation

- Do not explain content unless the user asks.
- Do not add commentary, rationale, or notes unless asked.
- Do not ask clarifying questions unless a critical decision is genuinely missing.
- When a decision is ambiguous but not critical, proceed with the best assumption.
- When an assumption is made that affects structure or naming, state it in one line at the end of output.

### Folder and Structure

- Do not change folder structure without explicit permission.
- Do not introduce subfolders without explicit permission.
- File names must be lowercase, hyphen-separated, and match the component name.
  - Example: `button.md`, `color-background.md`, `empty-state.md`

### Accessibility

- Accessibility is mandatory in every atom spec.
- WCAG 2.1 AA is the minimum standard.
- Do not mark an atom as `stable` if the accessibility section is incomplete.

---

## Atom Spec Structure

Every atom spec must include all 13 sections in this order. Do not omit, reorder, or rename sections.

```
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
```

### Section Rules

**1. Overview**
One to three sentences. State the component's purpose and role in the system.

**2. When to use**
Bulleted list. Each item is a specific, actionable use case.

**3. When not to use**
Bulleted list. Each item names the better alternative when appropriate.

**4. Anatomy**
Numbered list of parts. Each part has a name and a one-line description. Reference the part names consistently in all other sections.

**5. Tokens used**
Table with columns: Part | Token | Role. List every token applied to the component. No raw values permitted here.

**6. Variants**
Table or bulleted list. Name each variant. Describe the visual and semantic difference. State which is the default.

**7. Sizes**
Table with columns: Size | Token | Use case. If the component has no sizes, write: "This component has no size variants."

**8. States**
Table with columns: State | Visual change | Token change. Cover at minimum: default, hover, focused, active, disabled. Add loading or error where applicable.

**9. Behavior**
Describe interaction model, keyboard behavior, mouse behavior, touch behavior. Describe any animation using motion tokens.

**10. Accessibility**
- ARIA role
- Required ARIA attributes
- Keyboard navigation (key-by-key)
- Focus management
- Screen reader announcement
- Color contrast requirement (WCAG 2.1 AA minimum)
- Any additional WCAG criteria that apply

**11. Content guidelines**
Rules for labels, placeholder text, error messages, and any other copy within the component.

**12. Code example**
Minimal, correct, usage example. Show the most common use case. No raw values. No inline styles.

**13. Cross references**
Bulleted list of related atoms and patterns by name. Do not link to external URLs.

---

## Token Spec Structure

Every token spec must include:

1. Overview — what category this token file covers
2. Token table — columns: Token name | Foundation reference | Description | Example use

Token names must follow the naming convention exactly. Foundation references must name the foundation value, not repeat the raw value.

---

## Foundation Spec Structure

Every foundation spec must include:

1. Overview — what design decision this foundation captures
2. Scale table — columns: Name | Value | Usage note

Raw values are permitted only in foundation specs.

---

## Pattern Spec Structure

Every pattern spec must include:

1. Overview
2. When to use
3. When not to use
4. Composition — list of atoms used, with their roles
5. Tokens used — any tokens applied beyond what the atoms handle
6. Variants
7. Behavior
8. Accessibility
9. Content guidelines
10. Code example
11. Cross references

---

## Naming Convention Reference

```
[category].[role].[property].[state]
```

| Segment | Description |
|---|---|
| category | Top-level domain: `color`, `space`, `radius`, `shadow`, `motion`, `typography` |
| role | Semantic role: `background`, `text`, `border`, `icon`, `component` |
| property | Specific application: `neutral`, `subtle`, `focused`, `button`, `card` |
| state | Interaction state: `default`, `hover`, `active`, `disabled`, `focused` — omit if stateless |

Valid examples:
- `color.background.neutral.default`
- `color.text.subtle.default`
- `color.border.focused`
- `space.component.button.padding`
- `radius.component.card.default`
- `motion.duration.short`
- `typography.body.default.size`

---

## Primitives vs Semantic Tokens

The system uses two distinct naming layers. Every value belongs to exactly one of them.

### Primitive names — Foundation layer

Primitives live in `/specs/foundations`. They are named by scale position or value — not by intent.

| Pattern | Examples |
|---|---|
| `[category]-[step]` | `font-size-300`, `space-200`, `radius-100` |
| `[category]-[name]` | `font-weight-semibold`, `line-height-normal`, `letter-spacing-tight` |
| `[category].[step]` | `neutral.800`, `brand.500`, `status.danger.400`, `teal.300` |

- Primitive names carry no semantic meaning. `font-size-300` means 16px. It does not mean "body text."
- `neutral.800` means a specific gray value. It does not mean "heading color."
- Primitives are consumed only by token files. No other file may reference them.

### Semantic token names — Token layer

Semantic tokens live in `/specs/tokens`. They are named by intent — what the value means in context.

| Pattern | Examples |
|---|---|
| `[category].[role].[property].[state]` | `color.text.subtle.default`, `space.component.button.padding` |
| `[category].[role].[property]` | `typography.body.size`, `color.border.focus`, `typography.family.primary` |
| `[category].[role]` | `motion.enter`, `radius.full`, `typography.weight.body` |

- Semantic token names carry meaning. `typography.body.size` means "the font size for default body text."
- `color.text.primary` means "the color used for primary text" — the underlying primitive may change between themes.
- Semantic tokens are the only layer referenced by component specs. No atom, pattern, or flow may reference a primitive.

### Separation rule

| Layer | Named by | May be referenced by |
|---|---|---|
| Foundation primitive | Value or scale position | Token files only |
| Semantic token | Semantic intent | Atom, pattern, and flow specs only |

A file in `/specs/atoms` that references `font-size-300`, `neutral.800`, or `brand.500` directly is a layer violation. The correct references are `typography.body.size`, `color.text.primary`, and `color.background.brand.default`.

---

## Product Context

- Product: Almosafer
- Domain: Travel booking (flights, hotels, packages)
- Experience goals:
  - trust
  - clarity
  - premium feel
  - easy comparison

---

## Branding Rules

- Almosafer uses a teal-based brand identity
- Brand colors are applied through tokens only
- Do NOT hardcode brand colors in components
- Neutral system must remain unchanged
- Status colors must remain consistent

---

## System Principle

- The system is token-driven
- Branding must be applied via tokens only
- Do NOT modify components directly for branding

---

## System Philosophy

- The system is token-driven:
  primitives → semantic → components

- Components (atoms / patterns / flows):
  must NEVER use raw values

- Branding changes must be applied only through tokens

---

## Component Rules

- Do NOT modify atoms, patterns, or flows for branding
- Components must rely only on tokens
- Components must support:
  - light / dark
  - RTL / LTR

---

## Token Rules

- Always use semantic tokens in UI
- Never use primitives directly
- Tokens must control:
  - color
  - typography
  - spacing
  - radius

---

## Atlassian-Inspired Design Principles

These principles inform all decisions made within this system.

1. **Clear structure** — Every file, layer, and component has a defined place and purpose.
2. **Strict layer separation** — Foundations feed tokens. Tokens feed atoms. Atoms feed patterns. No layer skips.
3. **Token-driven decisions** — Styling decisions live in tokens, not in components.
4. **Accessibility-first** — Accessibility is designed in, not added on. It is never optional.
5. **Predictable naming** — Names are consistent, semantic, and follow the convention without exception.
6. **Scalable Markdown specs** — Specs are human-readable, versionable, and structured for tooling.

---

## Quick Reference Checklist

Before marking any file as `stable`, verify:

- [ ] Frontmatter is complete and valid
- [ ] Tier is correct for the folder
- [ ] No raw values in atom or pattern files
- [ ] No foundation references in atom or pattern files
- [ ] All 13 atom sections present (for atom files)
- [ ] Accessibility section is complete
- [ ] Token names follow `[category].[role].[property].[state]`
- [ ] File name is lowercase and hyphen-separated
- [ ] No extra files were created without request
- [ ] No existing completed files were rewritten without request
