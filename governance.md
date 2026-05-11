---
name: Design System Governance
tier: enforcement
status: stable
last-updated: 2026-05-06
maintainer: Team 4
source: Atlassian Design System — https://atlassian.design
---

# Design System Governance

This file defines how the design system is maintained, reviewed, extended, and protected over time. It is the operational contract between everyone who uses, contributes to, or makes decisions about the system. It does not define UI. It governs the system that defines UI.

Every rule in this file is mandatory. Where this file conflicts with assumptions or convention, this file wins. Where this file is silent, CLAUDE.md governs.

---

## 1. Overview

The design system is a shared, versioned, and enforced source of truth for all visual and interaction decisions in the product. It exists to eliminate drift, reduce decision overhead, and make the product consistent and accessible by default.

Governance is what keeps the system functional as it grows. Without governance, systems accumulate exceptions, undocumented changes, and silent incompatibilities. With governance, every change is deliberate, justified, visible, and reversible.

This file covers:

- Who owns the system and what their responsibilities are
- How contributions are proposed, reviewed, and approved
- When new system primitives are warranted and when they are not
- How files are placed, versioned, and deprecated
- What the review checklist requires before any file is marked stable

---

## 2. Ownership

The design system has a single designated maintainer at any point in time. The maintainer is responsible for the integrity, consistency, and evolution of the entire system.

| Role | Responsibility scope |
|---|---|
| **System maintainer** | Full system. Approves all promotions to `stable`. Owns CLAUDE.md, DESIGN.md, README.md, governance.md, and product.md. Final authority on naming, structure, and layer decisions. |
| **Spec author** | Individual spec files. Responsible for following all rules in CLAUDE.md and this file when creating or editing specs. |
| **Reviewer** | Reviews submitted specs against the review checklist. May approve promotion from `draft` to `review`. Cannot promote to `stable`. |

The current system maintainer is listed in the `maintainer` field of each root-level file's frontmatter. When maintainership changes, all root-level file frontmatter must be updated before the outgoing maintainer's last session.

---

## 3. Roles and Responsibilities

### System Maintainer

- Owns the layer model, naming conventions, and token architecture.
- Approves all changes to CLAUDE.md, DESIGN.md, README.md, and governance.md.
- Makes final decisions when a contribution conflicts with existing system rules.
- Reviews all `review`-status specs before promoting to `stable`.
- Initiates deprecation when a spec is superseded.
- Is responsible for ensuring the system remains product-agnostic. Product-specific decisions belong in product.md, not in spec files.

### Spec Author

- Follows CLAUDE.md in full when creating or editing any spec.
- Follows this governance file when determining whether a new spec is warranted.
- Does not promote their own spec from `draft` to `stable` without review.
- Documents the reason for a new spec at the start of the contribution process (see section 4).
- Updates `last-updated` in frontmatter on every edit.
- Does not rewrite an existing completed spec without explicit approval from the maintainer.

### Reviewer

- Reviews submitted specs against the review checklist in section 10.
- Returns specs to `draft` status with written feedback if the checklist is not fully satisfied.
- Does not approve structural or naming decisions without maintainer sign-off when those decisions are ambiguous or set a new precedent.
- Is responsible for catching raw values, foundation references, and missing accessibility sections before a spec advances.

---

## 4. Contribution Process

Every new spec or meaningful change to an existing spec follows this process. No step may be skipped.

### Step 1 — Justify

Before creating a file, answer: does this need exist in the system, or can it be served by what already exists?

- Search the existing system for a component, pattern, or flow that could satisfy the need.
- If an existing spec could be extended with a variant or state, extend it instead of creating a new file.
- If a new file is genuinely required, state in one sentence what the new file provides that nothing in the system currently does.

New files are not created speculatively. The product must have an active, confirmed need for the spec.

### Step 2 — Determine layer placement

Identify which layer the new spec belongs to, using the layer rules in section 8 of this file and the layer definitions in CLAUDE.md. Incorrect layer placement is a blocking error — it must be corrected before the file is created.

### Step 3 — Draft

Create the file with `status: draft`. Follow all CLAUDE.md rules. Complete every mandatory section for the file's tier. Do not reference foundations from atoms. Do not use raw values in atoms, patterns, or flows.

### Step 4 — Self-review

Run the review checklist in section 10 against the drafted file. Correct all failures before submitting for review.

### Step 5 — Submit for review

Present the draft to a reviewer. The reviewer runs the checklist independently. If the checklist passes, the file status is promoted to `review`.

### Step 6 — Maintainer approval

The system maintainer reviews `review`-status files. On approval, the status is promoted to `stable` and `last-updated` is set to the approval date. On rejection, the file returns to `draft` with documented feedback.

### Step 7 — Record the change

Add an entry to the change log section of this file (section 14) recording the file, the change type, and the date.

---

## 5. When to Create New Foundations

A new foundation file or scale entry is warranted when:

- The product requires a visual property that has no existing primitive — for example, a shadow scale, a z-index scale, or a new color palette range.
- The existing scale cannot accommodate a genuine product need and interpolation (intermediate values) is being used as a workaround.
- A new typeface, icon set, or brand color system is being adopted at the system level.

A new foundation is **not** warranted when:

- A token could be created to map an existing primitive to a new semantic role.
- A one-off value is needed for a single component — raw values do not belong in the system; this is a design decision that must be resolved before creating any file.
- An existing foundation value is being misapplied and the correct fix is to use the right existing value.

**Process:** A new foundation value must be added to the relevant foundation file before any token is created that references it. Tokens may not reference values that do not exist in a foundation file.

---

## 6. When to Create New Tokens

A new token is warranted when:

- A semantic role exists in the product that no current token names — for example, a new interactive state, a new surface type, or a new status severity.
- An existing token is being reused in a context that differs meaningfully from its defined role, creating ambiguity about what it means.
- A product theme or density mode requires a new semantic decision that existing tokens do not cover.

A new token is **not** warranted when:

- An existing token already covers the semantic role, even if the resolved value would need to change. In that case, update the foundation mapping.
- The need is component-specific and has no general applicability across the system. Component-specific decisions do not become tokens.
- The token would duplicate an existing token under a different name.

**Naming:** Every new token must follow the naming convention `[category].[role].[property].[state]` exactly. No deviation is permitted. Names are permanent — renaming is a breaking change and requires a deprecation cycle.

**Process:** A new token must be added to the token reference file before any atom, pattern, or flow references it.

---

## 7. When to Create New Atoms

A new atom is warranted when:

- A genuinely new single-purpose UI element is needed that no existing atom covers — for example, a slider, a progress bar, a stepper, or a date picker.
- An existing atom is being stretched to cover behavior it was not designed for, causing its spec to become incoherent.

A new atom is **not** warranted when:

- An existing atom can be extended with a new variant or state to cover the need.
- The element is a composition of existing atoms — that is a pattern, not a new atom.
- The element is product-specific and has no general reuse potential across different product contexts.

**Completeness requirement:** An atom spec must have all 13 mandatory sections complete before its status may advance beyond `draft`. The 13 sections are defined in CLAUDE.md. A spec missing any section is incomplete and must not be marked `review` or `stable`.

**Accessibility requirement:** The Accessibility section must be complete and must meet WCAG 2.1 AA as a minimum. An atom may not be marked `stable` with an incomplete Accessibility section under any circumstances.

---

## 8. When to Create New Patterns

A new pattern is warranted when:

- A recurring UI composition exists across multiple product surfaces that could benefit from a single, consistent specification.
- A multi-atom arrangement requires layout rules, interaction rules, or content guidelines that cannot be expressed within any single atom spec.
- A product surface involves a named, recognisable interface element that engineering and design consistently reference by name but that has no spec.

A new pattern is **not** warranted when:

- The composition is used only once and is unlikely to recur.
- The need can be met by an existing pattern variant.
- The composition is a full user journey rather than a recurring UI element — that belongs in a flow.

**Layer rule:** Patterns reference atoms and tokens only. They do not reference foundations. They do not define new raw values. They do not duplicate atom-level detail already covered in an atom spec.

---

## 9. When to Create New Flows

A new flow is warranted when:

- A user journey spans multiple steps, screens, or states in a way that cannot be expressed within a single pattern spec.
- A journey has defined entry points, variants, success and failure states, and a terminal outcome that requires coordinated specification across multiple atoms and patterns.
- An existing flow does not cover the journey and the journey cannot be expressed as a variant of an existing flow.

A new flow is **not** warranted when:

- The journey is a simple two-screen interaction that can be expressed as a pattern with behavior and state sections.
- The journey is product-specific content navigation rather than a structured interaction arc.
- The flow already exists under a different name or as a variant of an existing flow.

**Two categories of flows:**

- **Core flows** — Primary journeys the product depends on. Must be fully specified before the product ships. Examples: checkout, onboarding, authentication, navigation.
- **Supporting flows** — Operational and recovery journeys. Examples: cancellation, refund and return, error states, notifications.

**Layer rule:** Flows reference patterns and atoms. They do not define new visual primitives. They do not duplicate pattern-level or atom-level detail already covered in existing specs.

---

## 10. Review Checklist

Every spec must pass this checklist before it may be promoted from `draft` to `review`. The reviewer confirms each item independently of the author.

### Frontmatter

- [ ] `name` is present and matches the file's content.
- [ ] `tier` is correct for the folder the file is placed in.
- [ ] `status` is set to `draft` (for new files entering review).
- [ ] `last-updated` is the date of the most recent edit.
- [ ] `maintainer` is the current maintainer name.
- [ ] `source` is present.

### File placement

- [ ] The file is in the correct folder per section 13 of this file.
- [ ] The file name is lowercase and hyphen-separated.
- [ ] No existing file covers the same content.

### Layer integrity

- [ ] No raw values (HEX, px, rem, ms, numeric weights) appear in atom, pattern, or flow specs.
- [ ] No foundation primitives are referenced directly in atom, pattern, or flow specs.
- [ ] All tokens referenced exist in the token reference file.
- [ ] Token names follow the `[category].[role].[property].[state]` convention exactly.
- [ ] No atom-level detail is duplicated in pattern or flow specs.
- [ ] No pattern-level detail is duplicated in flow specs.

### Completeness — atoms

- [ ] All 13 mandatory sections are present and non-empty.
- [ ] The Anatomy section names every structural part of the component.
- [ ] The Tokens used table lists every token applied to the component.
- [ ] The States table covers at minimum: default, hover, focused, active, disabled.
- [ ] The Code example is minimal and uses no raw values.

### Completeness — patterns

- [ ] Overview, When to use, When not to use, Composition, Tokens used, Variants, Behavior, Accessibility, Content guidelines, Code example, and Cross references are all present.
- [ ] The Composition section names every atom used and its role.
- [ ] The Tokens used table covers all layout and surface decisions specific to the pattern.

### Completeness — flows

- [ ] Overview, When to use, When not to use, Composition, Variants, Behavior, States, Accessibility, Content guidelines, and Cross references are all present.
- [ ] The Composition section names every atom and pattern used and its role.
- [ ] Every state listed in the States section has a corresponding behavior description.

### Accessibility

- [ ] ARIA roles are specified for all interactive elements.
- [ ] Keyboard navigation is fully specified (key-by-key for interactive components).
- [ ] Focus management is described for all state changes.
- [ ] Color contrast requirement is stated and meets WCAG 2.1 AA minimum.
- [ ] No state or type is communicated by color alone.

### Content guidelines

- [ ] All copy examples are generic and product-agnostic (unless the file is a flow spec tied to a specific product context).
- [ ] No technical jargon appears in user-facing copy examples.
- [ ] Error message examples name the specific problem and the specific fix.

### Cross references

- [ ] All referenced files exist in the system.
- [ ] No external URLs appear in cross references — system files only.

---

## 11. Accessibility Requirements

Accessibility is not a review step — it is a design and authoring requirement. Every spec must meet these requirements from the first draft.

**Minimum standard:** WCAG 2.1 AA for all interactive atoms, patterns, and flows.

| Requirement | Rule |
|---|---|
| Color contrast | Text and interactive elements must meet 4.5:1 (normal text) and 3:1 (large text, UI components). Measured against the token values in use. |
| Non-color communication | Every state (error, success, warning, disabled, active) must be communicated by at least two signals. Color is one signal. The second must be shape, icon, label, or text. |
| Keyboard operability | Every interactive element must be reachable and operable by keyboard. Tab order must follow visual document order. |
| Focus visibility | Focus rings must be visible on all interactive elements using `color.border.focus`. They must not be suppressed. |
| ARIA correctness | ARIA roles, states, and properties must be semantically accurate. Incorrect ARIA is worse than no ARIA. Do not add ARIA that conflicts with the element's native semantics. |
| Screen reader announcements | Dynamic state changes (loading, error, success, live regions) must be announced. `aria-live` regions must be specified in every spec where dynamic content changes. |
| Touch targets | Minimum touch target size is 44×44px. Atoms that are used as touch targets must specify the spacing token that achieves this minimum. |
| Motion | Transitions and animations must respect the user's reduced-motion preference. Specs that use motion tokens must note where `prefers-reduced-motion` applies. |
| Text scaling | No spec may assume a fixed container height that would clip text scaled to 200%. Specs must not hardcode heights that conflict with browser text scaling. |
| Language and script | All interactive element labels must be translatable. No label must be expressed solely as an icon with no text fallback. |

An atom may not be promoted to `stable` with an incomplete or non-compliant Accessibility section.

---

## 12. Token Enforcement

Tokens are the contract between the system and the product. Their integrity is non-negotiable.

**What is enforced:**

| Rule | Consequence of violation |
|---|---|
| No raw values in atoms, patterns, or flows | The file fails the review checklist and cannot be promoted. |
| No foundation references in atoms, patterns, or flows | The file fails the review checklist and cannot be promoted. |
| Token names must follow `[category].[role].[property].[state]` | Names that deviate must be corrected before the file advances. A deviant name in a `stable` file is a breaking defect. |
| Tokens must exist before they are referenced | A spec may not reference a token that has not been added to the token reference file. |
| Tokens must not chain | A token maps to a foundation primitive only. A token that maps to another token violates the layer model. |
| Renaming a token requires deprecation | The old name must be marked `deprecated` and preserved until all references are migrated. Only then may it be removed. |

**Auditing:** The token reference file is the authoritative list of all tokens in the system. Any token used in a spec that does not appear in the token reference file is an error. Token audits should be conducted whenever new specs are added to the system.

---

## 13. File Placement Rules

Every file in this system has exactly one correct location. Misplaced files violate the layer model.

| Location | Contents | Examples |
|---|---|---|
| `/specs/foundations/` | Raw design decisions. The only place where raw values (HEX, px, ms, curves) are permitted. | `color.md`, `spacing.md`, `typography.md`, `motion.md`, `radius.md` |
| `/specs/tokens/` | Semantic token specifications. Maps token names to foundation values. No raw values. | `token-reference.md` |
| `/specs/atoms/` | Single-purpose reusable component specs. References tokens only. | `button.md`, `input.md`, `icon.md`, `badge.md` |
| `/specs/patterns/` | Reusable UI compositions built from atoms. Covers recurring interface problems. | `form.md`, `dialog.md`, `search.md`, `notifications.md` |
| `/specs/flows/` | Complete user journeys connecting patterns and atoms. Core and supporting flows. | `checkout-flow.md`, `authentication-flow.md`, `error-state.md` |
| Root (`/`) | System-level files that govern or document the system itself. Not spec files. | `CLAUDE.md`, `DESIGN.md`, `README.md`, `product.md`, `governance.md` |

**Rules:**

- A spec file may not exist outside `/specs/` and its sub-folders.
- Root files may not contain spec content (token tables, atom definitions, pattern compositions).
- No new sub-folders may be added to `/specs/` without maintainer approval and an update to this file, CLAUDE.md, DESIGN.md, and README.md.
- File names must be lowercase and hyphen-separated. Spaces, camelCase, and underscores are not permitted.

---

## 14. Versioning and Change Log Rules

The design system does not use semver. It uses a change log model: every meaningful change is recorded with the date, the file affected, the type of change, and the author.

### Change types

| Type | Description |
|---|---|
| `add` | A new file or spec section was created. |
| `update` | An existing file was edited without changing its semantic meaning or structure. |
| `extend` | A new variant, state, or section was added to an existing stable spec. |
| `deprecate` | A file or token was marked deprecated. References must be migrated. |
| `remove` | A deprecated file or token was removed after all references were migrated. |
| `fix` | A correction to a factual error, broken reference, or accessibility defect. |
| `promote` | A file was promoted from `draft` to `review`, or from `review` to `stable`. |

### Change log format

Each entry follows this format:

```
[date] [type] [file] — [one-line description] ([author])
```

Example:

```
2026-04-30  add     specs/flows/authentication-flow.md — Initial spec for login, signup, OTP, and password reset (Kholoud Eltabey)
2026-04-30  promote specs/atoms/button.md — Promoted to stable after accessibility review (Kholoud Eltabey)
```

### Rules

- Every change to any file must produce a change log entry.
- Change log entries are appended to the bottom of this file under section 16.
- `last-updated` in each file's frontmatter must be updated to match the date of the change log entry.
- Do not batch multiple changes into one entry. Each file changed gets its own entry.
- Entries are never deleted. The change log is append-only.

---

## 15. Deprecation Rules

Deprecation is the controlled retirement of a system element. Files and tokens are never deleted without first completing a full deprecation cycle.

### When to deprecate

- A spec is superseded by a new spec that covers the same need more correctly.
- A token's semantic meaning has changed and the old name would now mislead implementers.
- A foundation value is being removed from the system.
- An atom or pattern is no longer used anywhere in the product and maintaining its spec creates confusion.

### Deprecation cycle — tokens

1. Create the replacement token with the correct name and add it to the token reference file.
2. Set the old token's status to `deprecated` in the token reference file. Add a note: "Replaced by `[new token name]`."
3. Migrate all references from the old token to the new token in all affected specs.
4. Verify that zero specs reference the old token name.
5. Remove the old token from the token reference file.
6. Add a `deprecate` and then a `remove` entry to the change log.

### Deprecation cycle — spec files

1. Set `status: deprecated` in the file's frontmatter.
2. Add a deprecation notice at the top of the file body, beneath the heading: "This spec is deprecated. Use `[replacement file name]` instead."
3. Do not delete the file. Deprecated files are preserved for historical reference.
4. Remove references to the deprecated file from all cross reference sections in other files, replacing them with the correct replacement file reference.
5. Add a `deprecate` entry to the change log.

### Rules

- No spec file may be deleted from the repository. Set `status: deprecated` and preserve it.
- No token may be removed before all references are migrated. Removing a referenced token without migration is a breaking defect.
- The `deprecated` status is permanent. A deprecated spec is never re-promoted to `stable`. If the need re-emerges, a new file is created.

---

## 16. Approval Process

All changes to the system follow a consistent approval path. The path varies by change type.

### Routine edits (no approval required from maintainer)

- Fixing a typographical error in a spec body.
- Adding a missing cross reference to an existing `stable` spec.
- Updating `last-updated` in frontmatter.
- Correcting a broken internal link.

These changes may be made directly by the spec author and recorded in the change log.

### Standard changes (reviewer approval required)

- Creating a new `draft` spec.
- Adding a variant, state, or section to an existing `draft` or `review` spec.
- Promoting a spec from `draft` to `review`.
- Correcting an accessibility defect in an existing spec.
- Updating copy examples in content guidelines.

These changes require sign-off from a reviewer before the change log entry is written.

### Structural changes (maintainer approval required)

- Promoting any spec from `review` to `stable`.
- Creating a new token.
- Adding a new foundation value or scale entry.
- Changing a token name (initiating a deprecation cycle).
- Adding a new sub-folder to `/specs/`.
- Editing CLAUDE.md, DESIGN.md, README.md, or this file.
- Changing the `maintainer` field in any root-level file.
- Deprecating a `stable` spec.
- Any change that sets a new naming, structural, or layer precedent.

Maintainer approval is given in writing (in the session, in a review comment, or in a documented decision) before the change is committed and the change log entry is written.

### Escalation

If a contribution produces a disagreement between the author and the reviewer, the maintainer makes the final decision. The maintainer's decision is recorded as a note in the change log entry for the affected file.

---

## 17. Change Log

```
2026-04-28  add     specs/foundations/color.md — Initial color palette and status scale (Kholoud Eltabey)
2026-04-28  add     specs/foundations/spacing.md — Initial spacing scale (Kholoud Eltabey)
2026-04-28  add     specs/foundations/typography.md — Initial typography scale and font families (Kholoud Eltabey)
2026-04-28  add     specs/foundations/radius.md — Initial border radius scale (Kholoud Eltabey)
2026-04-28  add     specs/foundations/motion.md — Initial motion duration and easing scale (Kholoud Eltabey)
2026-04-28  add     specs/tokens/token-reference.md — Full semantic token reference (Kholoud Eltabey)
2026-04-28  add     specs/atoms/button.md — Button atom spec (Kholoud Eltabey)
2026-04-28  add     specs/atoms/input.md — Input atom spec (Kholoud Eltabey)
2026-04-28  add     specs/atoms/checkbox.md — Checkbox atom spec (Kholoud Eltabey)
2026-04-28  add     specs/atoms/radio.md — Radio atom spec (Kholoud Eltabey)
2026-04-28  add     specs/atoms/switch.md — Switch atom spec (Kholoud Eltabey)
2026-04-28  add     specs/atoms/badge.md — Badge atom spec (Kholoud Eltabey)
2026-04-28  add     specs/atoms/tag.md — Tag atom spec (Kholoud Eltabey)
2026-04-28  add     specs/atoms/link.md — Link atom spec (Kholoud Eltabey)
2026-04-28  add     specs/atoms/icon.md — Icon atom spec (Kholoud Eltabey)
2026-04-28  add     specs/atoms/avatar.md — Avatar atom spec (Kholoud Eltabey)
2026-04-28  add     specs/atoms/label.md — Label atom spec (Kholoud Eltabey)
2026-04-28  add     specs/atoms/icon-button.md — Icon Button atom spec (Kholoud Eltabey)
2026-04-28  add     specs/atoms/spinner.md — Spinner atom spec (Kholoud Eltabey)
2026-04-28  add     specs/atoms/tooltip.md — Tooltip atom spec (Kholoud Eltabey)
2026-04-29  add     specs/patterns/form.md — Form pattern spec (Kholoud Eltabey)
2026-04-29  add     specs/patterns/dialog.md — Dialog pattern spec (Kholoud Eltabey)
2026-04-29  add     specs/patterns/empty-state.md — Empty State pattern spec (Kholoud Eltabey)
2026-04-29  add     specs/patterns/table.md — Table pattern spec (Kholoud Eltabey)
2026-04-29  add     specs/patterns/catalog-card.md — Catalog Card pattern spec (Kholoud Eltabey)
2026-04-30  add     specs/patterns/catalog-list.md — Catalog List pattern spec (Kholoud Eltabey)
2026-04-30  add     specs/patterns/filters.md — Filters pattern spec (Kholoud Eltabey)
2026-04-30  add     specs/patterns/search.md — Search pattern spec (Kholoud Eltabey)
2026-04-30  add     specs/patterns/notifications.md — Notifications pattern spec (Kholoud Eltabey)
2026-04-30  add     specs/flows/cart-summary.md — Cart Summary flow spec (Kholoud Eltabey)
2026-04-30  add     specs/flows/checkout-flow.md — Checkout Flow spec (Kholoud Eltabey)
2026-04-30  add     specs/flows/order-confirmation.md — Order Confirmation flow spec (Kholoud Eltabey)
2026-04-30  add     specs/flows/order-tracking.md — Order Tracking flow spec (Kholoud Eltabey)
2026-04-30  add     specs/flows/error-state.md — Error State flow spec (Kholoud Eltabey)
2026-04-30  add     specs/flows/cancellation-flow.md — Cancellation Flow spec (Kholoud Eltabey)
2026-04-30  add     specs/flows/refund-return-flow.md — Refund and Return Flow spec (Kholoud Eltabey)
2026-04-30  add     specs/flows/navigation-flow.md — Navigation Flow spec (Kholoud Eltabey)
2026-04-30  add     specs/flows/onboarding-flow.md — Onboarding Flow spec (Kholoud Eltabey)
2026-04-30  add     specs/flows/authentication-flow.md — Authentication Flow spec covering login, signup, OTP, and password reset (Kholoud Eltabey)
2026-04-30  update  specs/foundations/typography.md — Updated font families to IBM Plex Sans (Latin) and IBM Plex Sans Arabic (Kholoud Eltabey)
2026-04-30  update  CLAUDE.md — Added /specs/flows to project structure, added flow tier, added Layer 5 definition (Kholoud Eltabey)
2026-04-30  update  DESIGN.md — Added section 7 Flows — Tier 5, renumbered subsequent sections (Kholoud Eltabey)
2026-04-30  update  README.md — Added /flows to folder structure, reading order, contribution guidance (Kholoud Eltabey)
2026-04-30  add     governance.md — Initial governance file (Kholoud Eltabey)
```
