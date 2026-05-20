---
name: Product Context — Almosafer
tier: enforcement
status: stable
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Product Context — Almosafer

This file defines the product context for Almosafer. It informs how the design system is applied within this product. It does not modify atoms, patterns, foundations, or tokens. The system remains reusable and product-agnostic. Branding is applied exclusively through token resolution.

---

## 1. Product Overview

**Product name:** Almosafer
**Domain:** Travel booking platform
**Experiences:** Flights · Hotels · Packages

Almosafer is a travel booking platform serving Arabic and English speakers in the MENA region. Users search, compare, and book travel across multiple product types. The interface operates under time pressure — travel decisions involve real money, real schedules, and high stakes.

**System relationship:**
The design system remains reusable across products. Almosafer branding (teal palette, bilingual typography) is applied entirely through the token layer. No atom, pattern, or flow spec contains Almosafer-specific styling. Components are product-agnostic. Product identity is resolved at token level only.

---

## 2. UX Priorities

| Priority | Definition | System implication |
|---|---|---|
| Trust | Users book travel with real money. The interface must signal reliability and professionalism at every step. | Consistent components. No visual noise. Error handling is precise and respectful. States are always communicated. |
| Clarity | Users must always know where they are, what they can do, and what happens next. | Hierarchy is strict. Labels are specific. Primary actions are always visible. |
| Speed | Travel decisions are time-sensitive. Perceived latency breaks trust. | Motion tokens use short durations. Feedback is immediate. Loading states are lightweight. |
| Easy comparison | Users evaluate multiple flights, hotels, or packages side by side. | Catalog layouts support parallel scanning. Pricing is prominent and consistent. Filter interactions are fast. |

---

## 3. Language and Directionality

Arabic and English are both primary languages. Neither is secondary or a fallback.

| Property | Requirement |
|---|---|
| Languages | Arabic and English |
| Script directions | RTL (Arabic) and LTR (English) |
| Layout direction | Determined by active language. Components must not assume LTR. |
| CSS approach | All directional properties use logical CSS (`margin-inline-start`, `padding-inline-end`, `text-align: start`). Physical properties (`margin-left`, `padding-right`) are banned in component specs. |
| Typography | `font.family` resolves to IBM Plex Sans in English mode and Cairo in Arabic mode. The token name does not change between languages. |
| Icon direction | Icons that imply direction (arrows, back/forward) must flip in RTL. Decorative icons do not flip. |
| Number formatting | Prices and quantities must respect locale-specific formatting. Components must not hardcode numeral systems. |

---

## 4. Core Flows

These flows represent the highest-priority user journeys. System decisions must not introduce friction in any of them.

| Flow | Description | System priority |
|---|---|---|
| Flight and hotel search | Users enter origin, destination, dates, and traveler count. | Input clarity, date picker usability, fast feedback on empty and error states. |
| Catalog browsing | Users scan and compare flights, hotels, or packages. | Grid density, pricing prominence, label readability, filter accessibility. |
| Search and filtering | Users narrow results by price, duration, rating, airline, or amenities. | Filter responsiveness, result count feedback, clear state communication. |
| Checkout and booking | Users provide traveler details, select extras, and confirm payment. | Form clarity, inline validation, error precision, trust signals, duplicate submission prevention. |
| Order tracking | Users monitor booking status and manage their trip. | Status clarity, notification timeliness, cancellation and refund accessibility. |

---

## 5. Branding

Almosafer uses a teal-based brand identity. All branding is applied through the token layer.

| Token | Light | Dark | Role |
|---|---|---|---|
| `color.background.primary` | `brand.500` | `brand.400` | Primary interactive surfaces |
| `color.text.brand` | `brand.500` | `brand.300` | Brand-colored text and active labels |
| `color.border.focus` | `brand.500` | `brand.400` | Keyboard focus ring |
| `color.background.selected` | `brand.100` | `brand.800` | Selected state backgrounds |

**Rules:**
- Do NOT hardcode brand colors in components.
- Do NOT reference `brand.*` primitives directly in atoms, patterns, or flows.
- Branding changes are made exclusively by updating token values.
- Neutral and status scales remain unchanged regardless of brand context.

---

## 6. Interaction Density

The platform operates at medium to high interaction density. Multiple interactive elements coexist in a single view. Users make frequent, rapid decisions.

**Implications:**
- Components must remain readable and distinguishable at close proximity.
- Spacing tokens must support compact layouts without sacrificing touch target minimums (44×44px).
- Visual hierarchy must be strong enough to guide attention without requiring large spacing buffers.
- Catalog layouts — flight grids, hotel listings, package comparisons — are first-class use cases.

---

## 7. Component Implications

### Buttons — Booking CTAs

Primary booking actions are the highest-stakes interactions on the platform.

- Primary buttons must have maximum visual contrast and clear hover and active states.
- CTA labels must be specific and action-oriented. "Book now", "Search flights", "Confirm booking" are correct. "Submit" is not.
- Danger buttons appear at destructive steps (cancel booking, remove traveler). They must not compete visually with primary booking CTAs in the same view.
- Loading state is critical during booking confirmation. Duplicate submission prevention is mandatory.

### Inputs — Traveler details and search

Input fields carry the booking flow. A broken or frustrating input stops a booking at the final step.

- Inline validation is required for all booking and traveler detail fields. Errors appear on blur, not only on submit.
- Error messages must name the specific problem and the specific fix.
- Placeholder text must not substitute for labels. Labels are always visible.
- Autofill support is required via `autocomplete` attributes on all traveler inputs.
- All inputs must support Arabic text input and RTL text direction without layout shifts.

### Feedback — Immediate and contextual

Travel users act under time pressure. Feedback must be fast and precise.

- State transitions on interactive elements use `motion.fast`.
- Notification components must appear within one motion cycle of the triggering action.
- Error states must be precise. "Passport number is invalid" is required. "Error" is not.
- Success states must confirm the specific outcome: "Booking confirmed", not "Success".
- Loading states must provide context. A spinner alone is insufficient for operations longer than `motion.slow`.
