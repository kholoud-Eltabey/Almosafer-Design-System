---
name: Onboarding Flow
tier: flow
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Onboarding Flow

---

## 1. Overview

The onboarding flow is the first experience a new user has with Almosafer. It runs once, on first launch, and its sole purpose is to move the user from arrival to their first meaningful action — searching, booking, or saving a trip — with as little friction as possible.

Onboarding is not a product tour. It is not a feature showcase. It does not teach the interface — the interface must be clear enough to require no teaching. Onboarding on Almosafer serves three narrow purposes: establishing identity (guest or signed-in), collecting the minimum setup data needed to personalise the experience (preferred departure city, language preference), and directing the user to the first action that delivers value.

Every step in the flow is either mandatory because the product cannot function without the data it collects, or optional because skipping it does not prevent the user from reaching value. Optional steps carry an explicit skip control at all times. Mandatory steps carry a clear explanation of why the data is needed. No step collects data the product does not immediately use.

The flow supports Arabic and English across RTL and LTR layouts. All directional properties use logical CSS. The flow is linear — there is no branching within a step, only between variant paths determined at the entry point.

---

## 2. Entry Points

### First launch

The first-launch entry point is triggered when the application detects no existing session and no prior onboarding completion record. The full onboarding flow is presented. After completion, a completion flag is stored locally so the flow is not re-triggered.

### Guest entry

A user who declines sign-in at the identity step proceeds through onboarding as a guest. They complete the same setup steps available to guests (location, language), skip authentication-dependent steps (saved addresses, account preferences), and land on the home or category browse surface. Guest users may be shown a soft sign-in prompt at high-intent moments later in the session (add to cart, checkout initiation) but are not blocked from browsing.

### Deep link entry

A user arriving via a deep link (from a notification, email campaign, or external share) bypasses onboarding if the link target is a product or category page. Onboarding is deferred — the user lands on the linked destination immediately. A minimal identity prompt (guest or sign-in) appears as a non-blocking overlay after the destination loads if no session exists. Full onboarding runs on next cold launch after session establishment.

If the deep link target requires authentication (order tracking, account), the user is redirected to the sign-in step, completing authentication before landing on the target. Onboarding is then presented after the first authenticated session ends and the user returns to the app.

---

## 3. Steps

### Step 1 — Welcome

**Purpose:** Orient the user and set tone. Establish that Extra is fast, clear, and worth continuing.

**Composition:**

| Element | Atom | Role |
|---|---|---|
| Brand mark | Icon | The Almosafer logo or wordmark. Centred. `aria-hidden="true"` — the page heading provides the accessible name. |
| Headline | Heading element | A single short statement of the product's value. Not a slogan — a factual statement of what the user can do. |
| Subheadline | Paragraph | One sentence of supporting context. Optional. |
| Primary action | Button (primary) | Labelled "Get started." Advances to Step 2. |
| Secondary action | Button (secondary) or Link | Labelled "Sign in" for users who already have an account. Navigates directly to the sign-in step, skipping the guest/new-user fork. |

**Skip:** Not applicable. This step is the entry to the flow, not a collection step.

**Token reference:**

| Part | Token | Role |
|---|---|---|
| Step background | `color.background.surface` | Full-screen card or page surface. |
| Headline text | `color.text.primary` | Maximum contrast for the primary statement. |
| Subheadline text | `color.text.secondary` | Supporting copy, reduced emphasis. |
| Headline size | `text.heading.lg` | Large, prominent type for the welcome statement. |
| Subheadline size | `text.body.lg` | Readable single-sentence support. |
| Vertical gap — headline to subheadline | `spacing.md` | Gap between headline and supporting sentence. |
| Vertical gap — subheadline to actions | `spacing.xl` | Gap between copy block and action area. |
| Vertical gap — between actions | `spacing.sm` | Gap between primary and secondary Buttons. |

---

### Step 2 — Identity (sign in / sign up)

**Purpose:** Establish the user's identity or confirm guest intent. This step determines which subsequent steps are available.

**Composition:**

| Element | Atom / Pattern | Role |
|---|---|---|
| Step heading | Heading element | "Create an account" or "Sign in" — determined by which path the user chose from Step 1. |
| Email Input | Input (via Form pattern) | Collects email address. `autocomplete="email"`. |
| Password Input | Input (via Form pattern) | Collects password. `autocomplete="current-password"` for sign-in; `autocomplete="new-password"` for registration. |
| Name Input | Input (via Form pattern) | First and last name. Registration only. `autocomplete="name"`. |
| Submit Button | Button (primary) | Labelled "Create account" or "Sign in." Enters loading state during the authentication request. |
| Skip / Guest Button | Button (secondary) | Labelled "Continue as guest." Always present. Bypasses the identity step and marks the session as guest. |
| Toggle Link | Link | "Already have an account? Sign in" / "New to Almosafer? Create account." Switches between registration and sign-in within the same step without navigating away. |

The Form pattern governs field layout, label association, inline validation, and error handling within this step. Field-level errors (wrong password, email already registered) are displayed per the Input atom's error state. A form-level error summary appears above the fields on failed submission.

**Skip:** "Continue as guest" is always visible and advances past this step into the guest onboarding path.

**Token reference:**

| Part | Token | Role |
|---|---|---|
| Step background | `color.background.surface` | Step card surface. |
| Step heading | `color.text.primary` | Step title. |
| Step heading size | `text.heading.md` | Sub-screen heading within the onboarding container. |
| Form layout | Per form.md token assignments | Field gaps, error colors, and action spacing are governed by the Form pattern. |
| Toggle Link color | `color.text.brand` | Brand-colored inline switch Link. |
| Gap — heading to form | `spacing.lg` | Vertical space between step heading and first form field. |
| Gap — form to skip action | `spacing.md` | Vertical space between the submit Button and the guest bypass Button. |

---

### Step 3 — Permissions

**Purpose:** Request only the permissions the product needs to function at its best. Each permission is requested individually with a specific reason.

**Composition:**

| Element | Atom | Role |
|---|---|---|
| Permission icon | Icon | A contextually relevant icon for each permission type: `map-pin` (location), `bell` (notifications). `aria-hidden="true"`. |
| Permission heading | Heading element | Names the permission: "Allow location access", "Enable notifications." |
| Permission rationale | Paragraph | One sentence explaining the specific benefit: "So we can show you flights, hotels, and deals available from your location." Not a generic "This improves your experience." |
| Allow Button | Button (primary) | Triggers the native OS permission prompt. Labelled "Allow" or "Turn on." |
| Skip Button | Button (secondary) | Bypasses this permission without requesting it. Labelled "Not now." |

Permissions are requested one at a time, in separate sub-steps within Step 3: location first, then notifications. This prevents the OS from stacking permission prompts and the user from reflexively dismissing both.

The native OS permission dialog is outside the design system's scope. The step only controls the pre-prompt screen that explains the permission before the OS dialog appears.

**Skip:** "Not now" is always present. Skipping a permission does not block progress. The product functions without either permission — location falls back to manual address entry; notifications are disabled.

**Token reference:**

| Part | Token | Role |
|---|---|---|
| Step background | `color.background.surface` | Step card surface. |
| Permission icon color | `color.text.brand` | Icon color reinforces brand identity on the permission request. |
| Heading text | `color.text.primary` | Permission name. |
| Heading size | `text.heading.md` | Step heading. |
| Rationale text | `color.text.secondary` | Supporting explanation. |
| Rationale size | `text.body.md` | Default body size. |
| Gap — icon to heading | `spacing.md` | Vertical space between icon and heading. |
| Gap — heading to rationale | `spacing.sm` | Vertical space between heading and explanation. |
| Gap — rationale to actions | `spacing.lg` | Vertical space between explanation and action buttons. |
| Gap — between actions | `spacing.sm` | Vertical space between Allow and Not now buttons. |

---

### Step 4 — Initial setup

**Purpose:** Collect the minimum configuration data to personalise the first experience. For authenticated users: preferred departure city or airport, language preference. For guest users: departure city or area selection and language preference only.

**Composition — authenticated path:**

| Element | Atom / Pattern | Role |
|---|---|---|
| Step heading | Heading element | "Set up your account." |
| Departure city Input | Input group (via Form pattern) | Preferred departure city or airport. Used to personalise flight search defaults and show relevant deals. Only the city field is required at this step — full traveler details are collected at booking checkout. |
| Language selector | Radio group (via Form pattern) | "Arabic" / "English." Selecting a language applies the RTL or LTR layout immediately, without requiring a page reload or form submission. |
| Continue Button | Button (primary) | Labelled "Continue." Saves the entered data and advances to Step 5. |
| Skip Button | Button (secondary) | Labelled "Skip for now." Advances without saving. Required fields are collected at the first relevant moment (e.g., delivery address at checkout). |

**Composition — guest path:**

| Element | Atom / Pattern | Role |
|---|---|---|
| Step heading | Heading element | "Where are you?" |
| Departure city Search | Search pattern (search.md) | Allows the user to search for their departure city or airport. Used in preference to a long scrolling Select. Returns a short list of matching airports or cities from the system's supported origins. |
| Language selector | Radio group (via Form pattern) | Same as authenticated path. |
| Continue Button | Button (primary) | Labelled "Continue." |
| Skip Button | Button (secondary) | Labelled "Skip for now." |

**Skip:** "Skip for now" is always present. The product must function without a pre-configured departure city or explicit language selection. Language defaults to the device's system language. Traveler details are collected at booking checkout.

**Token reference:**

| Part | Token | Role |
|---|---|---|
| Step background | `color.background.surface` | Step card surface. |
| Step heading | `color.text.primary` | Step title. |
| Step heading size | `text.heading.md` | Step heading. |
| Form layout | Per form.md token assignments | Field gaps and action spacing governed by Form pattern. |
| Language selector gap | `spacing.sm` | Gap between Radio options in the language selector. |
| Gap — heading to form | `spacing.lg` | Vertical space between step heading and first form section. |
| Gap — form to actions | `spacing.lg` | Vertical space between last field and action buttons. |

---

### Step 5 — First action

**Purpose:** Guide the user from setup completion into their first meaningful product interaction. The step must deliver immediate value — the user must see flights, hotels, or destinations before the onboarding sequence is considered complete.

**Composition:**

| Element | Atom / Pattern | Role |
|---|---|---|
| Step heading | Heading element | "What are you looking for?" |
| Search Input | Search pattern (search.md) | Full search input, active and ready for query entry. Autofocused on step render. The most direct path to value for a user who knows their destination. |
| Travel shortcuts | Button group or Link group | A short set (four to six) of the platform's top travel categories, rendered as tappable chips: Flights, Hotels, Packages, Saved trips, Popular destinations. Each navigates directly to the relevant search or catalog surface. Labelled with the category name. |
| Explore all Link | Link | "Explore flights, hotels and packages" — navigates to the Explore destination. Below the travel shortcuts. |

Completing this step — either by submitting a search, tapping a travel shortcut, or activating the explore link — ends the onboarding flow. The completion flag is stored, the onboarding container is dismissed, and the user lands in the selected destination within the main navigation structure (navigation-flow.md).

If the user does nothing on this step (closes the app, for example), the onboarding is marked as complete up to Step 4. On next launch, the flow resumes at Step 5 — the incomplete onboarding state.

**Skip:** Not applicable. This step does not collect data — it surfaces the product. The user exits onboarding by interacting with the product, not by skipping a step.

**Token reference:**

| Part | Token | Role |
|---|---|---|
| Step background | `color.background.surface` | Step card surface. |
| Step heading | `color.text.primary` | Step title. |
| Step heading size | `text.heading.md` | Step heading. |
| Category chip background | `color.background.subtle` | Background of each category shortcut chip. |
| Category chip background — hover | `color.background.selected` | Hover state of each chip. |
| Category chip border | `color.border.default` | Border on each category chip. |
| Category chip radius | `radius.lg` | Corner rounding on category chips. |
| Category chip padding | `spacing.sm` | Internal padding within each chip. |
| Category chip text | `color.text.primary` | Label text on each chip. |
| Gap — heading to search | `spacing.md` | Vertical space between step heading and the Search input. |
| Gap — search to category shortcuts | `spacing.lg` | Vertical space between the Search input and the category chip group. |
| Gap — between category chips | `spacing.sm` | Gap between individual category chips (wrap layout). |
| Gap — chips to browse all Link | `spacing.md` | Vertical space between the chip group and the browse-all Link. |

---

## 4. Variants

| Variant | Description | Steps included |
|---|---|---|
| Guest onboarding | The user declines sign-in at Step 2 or arrives without an account. Identity step resolves to guest. Setup step is simplified — city/area selection only, no address form. | Step 1 → Step 2 (guest exit) → Step 3 → Step 4 (guest) → Step 5 |
| Signed-in onboarding | The user signs in or creates an account at Step 2. Full setup step is available including address and language preference. | Step 1 → Step 2 (auth) → Step 3 → Step 4 (authenticated) → Step 5 |
| Skip onboarding | The user activates a skip control that exits the entire flow. Available only after Step 1 is shown. A global "Skip setup" Link appears in the step progress area from Step 2 onward. The user lands on Home. Onboarding is marked complete to prevent re-triggering. | Step 1 → Skip → Home |

---

## 5. Behavior

### Progressive steps

The flow advances linearly. The user cannot jump to a later step by navigating forward, but can return to the previous step using back navigation. The current step is communicated by a step progress indicator — a sequence of dots or a labeled counter ("Step 2 of 5") — visible on every step from Step 2 onward. Step 1 (Welcome) does not show the progress indicator; it is the pre-flow entry screen.

Step progress indicator composition:

| Part | Token | Role |
|---|---|---|
| Progress dot — completed | `color.background.selected` | Filled dot for completed steps. |
| Progress dot — active | `color.background.primary` | Filled dot for the current step. |
| Progress dot — pending | `color.border.default` | Outlined dot for future steps. |
| Gap between dots | `spacing.xs` | Horizontal gap between progress dots. |

### Ability to skip

Each optional step carries a skip control (Button, secondary, or Link). The skip control is always visible — it is never hidden or disabled. Skipping a step stores a skip record for that step so the system knows the user was offered the step and chose to bypass it. Skipped steps are not re-presented during the same onboarding session.

A global "Skip setup" Link is present in the step progress area from Step 2 onward. Activating it exits the entire remaining flow and lands the user on Home. The onboarding completion flag is set to prevent re-triggering.

### Save progress

After each step is completed or skipped, the step's data and state are saved immediately. If the user exits the application mid-flow, the flow resumes from the last incomplete step on next launch. Data entered in partial steps (e.g., an email address typed but not submitted) is not preserved — only fully completed or explicitly skipped steps are saved.

### Guide to first meaningful action

Step 5 is the only step that ends the flow by action rather than by explicit completion. The flow does not show a "You're all set" screen — the product itself is the confirmation that setup is complete. The user transitions from the onboarding container directly into the live product surface (search results, category page, or home) without an intermediate confirmation state.

If the user completes Step 4 and exits the application before interacting with Step 5, the resume behavior on next launch presents Step 5 — the incomplete onboarding state.

---

## 6. States

| State | Description | Behavior |
|---|---|---|
| First-time | No onboarding record exists. No session exists. | Full onboarding flow presented from Step 1. Entry point: first launch. |
| Returning user | Onboarding completion flag is set. Session may or may not exist. | Onboarding flow is not presented. User lands directly on Home or their last active route. |
| Incomplete onboarding | Onboarding has been started but not completed. Completion flag is absent. Step progress is partially saved. | Flow resumes at the last incomplete step on next launch. The user is shown the step they left, not Step 1. |
| Guest session | User completed onboarding as a guest. No authentication record exists. | Guest-path onboarding marked complete. User lands on Home as a guest. Sign-in prompts may appear at high-intent moments (add to cart, checkout) but are non-blocking. |
| Deep link bypass | User arrived via a deep link and skipped onboarding. | Onboarding deferred. Full flow presented on next cold launch after session establishment. A minimal identity prompt appears as non-blocking overlay on the deep link target. |

---

## 7. Accessibility

**Landmark and heading structure**

The onboarding container must carry `role="main"` and a descriptive `aria-label`: `aria-label="Account setup"` or `aria-label="Welcome to Almosafer"` on Step 1. Each step must have an `<h1>` heading that names the step. The step progress indicator is a supplementary region, not a landmark.

**Required ARIA attributes**

| Attribute | Applied to | Purpose |
|---|---|---|
| `aria-live="polite"` | Step progress indicator | Announces the current step when the step changes: "Step 3 of 5". |
| `aria-current="step"` | Active step dot in the progress indicator | Identifies the active position in the progress sequence. |
| `aria-label="Skip [step name]"` | Each skip Button / Link | Names the specific step being skipped, not just "Skip." Example: `aria-label="Skip location permissions"`. |
| `aria-label="Skip account setup"` | Global skip Link | Names the consequence of the global skip. |
| `aria-busy="true"` | Step container during submission | Applied during sign-in or account creation request. Removed when the next step renders. |
| `aria-live="assertive"` | Form error summary | Announces submission errors immediately on failed authentication. |
| `aria-label` on Search Input (Step 5) | Search atom | Carries `aria-label="Search flights, hotels, or destinations"` to contextualise the field within onboarding. |

**Keyboard navigation**

- Tab moves through all interactive elements within the current step in document order.
- Enter or Space activates the focused Button or Link.
- Within the Radio group on the language selector, Arrow keys navigate between options. Tab moves past the group.
- The Search Input on Step 5 is autofocused when the step renders so keyboard users can begin typing immediately.
- The step progress indicator dots are not interactive — they do not receive focus and are not keyboard-operable.
- Back navigation between steps uses a Button (labelled "Back") above the step content. It is the first interactive element in the step when present.

**Focus management**

- When a step renders, focus moves to the step's `<h1>` heading or to the first interactive element if the heading is not focusable.
- When the language is switched in Step 4, the layout direction updates and focus is preserved on the Radio option that was activated.
- When Step 5 renders, focus is placed on the Search Input.
- When the onboarding flow completes and the main application renders, focus moves to the main navigation's first interactive element per navigation-flow.md focus management rules.

**Clear instructions**

Each step carries one clear instruction as the heading and at most one sentence of supporting context. The purpose of a step must be understood from the heading alone — the supporting sentence adds specificity, not explanation. No step requires the user to read more than three sentences before knowing what to do.

**Readable content**

All step content must render at `text.body.md` minimum size. Permission rationale text and supporting copy use `text.body.md` at `color.text.secondary`. No copy within the flow uses `text.caption` — that size is reserved for timestamps and metadata, not instructional content.

---

## 8. Content Guidelines

**Tone**

- Short and specific. Every sentence earns its place.
- Do not use exclamation marks. Enthusiasm expressed through punctuation reads as pressure.
- Do not use "we" excessively. The user is the subject, not the company.
- Friendly means clear and respectful. It does not mean casual, emoji-laden, or patronising.

**Welcome step**

- Headline: state what the product is or what it lets the user do. "Search, compare, and book flights and hotels." Not "Welcome to Almosafer!" — the logo already communicated the brand.
- Subheadline: one factual supporting detail. "Flights, hotels, and packages across the region." Optional — omit if it adds no new information.

**Identity step**

- Heading for registration: "Create your account." Not "Join the Almosafer family" or "Get started today."
- Heading for sign-in: "Sign in." Not "Welcome back!" — the system does not know if the user is happy to be back.
- Guest bypass label: "Continue as guest." Not "No thanks" or "Maybe later" — these are evasive and imply the product expects refusal.

**Permissions step**

- Permission heading: "Allow location access." Imperative, specific, short.
- Rationale: one sentence that names the direct benefit to the user. "So we can show flights, hotels, and deals available from your location." Not "This helps us improve your experience."
- Allow button: "Allow." Not "Yes" or "Enable" — match the language of the OS permission dialog that follows.
- Skip button: "Not now." Not "Deny" or "No thanks" — "Not now" implies the option remains available later, which it does.

**Setup step**

- Heading: "Where do you fly from?" (guest) or "Set up your account." (authenticated). Direct questions are acceptable here — they frame the step as a conversation, not a form to fill.
- Departure city field helper text: "Used to personalise flight search results and surface deals near you. You can update this anytime."
- Language selector label: "Language." Not "Select your preferred language" — the context makes it clear.

**First action step**

- Heading: "Where would you like to go?" Not "You're all set!" — the user has not accomplished anything yet; they are about to.
- Search placeholder: per search.md content guidelines — specific and instructive: "Search flights, hotels, or destinations."
- Travel shortcut labels: exact category names from the platform's taxonomy. Do not shorten, abbreviate, or editorialize.
- Explore Link: "Explore flights, hotels and packages." Not "See more" or "View all" — name the destination.

**Skip controls**

- Per-step skip: "Skip for now." Consistent across all steps.
- Global skip: "Skip setup." Two words. No punctuation.
- Neither skip label implies regret, loss, or consequence. The user is making a valid choice.

**Error messages within the flow**

- Per form.md and error-state.md content guidelines. Specific, calm, actionable. No apologies.
- Authentication failure: "Incorrect email or password." Not "Invalid credentials."
- Email already registered: "An account with this email already exists. Sign in instead." Include the "Sign in" toggle Link inline.

---

## 9. Cross References

- form.md
- search.md
- navigation-flow.md
- dialog.md
- notifications.md
- error-state.md
- button.md
- input.md
- radio.md
- icon.md
- spinner.md
- label.md
- token-reference.md

---

## When to use

- A user launches the application for the first time and has not previously established identity or location preference.
- The product requires a minimum set of user inputs (location, language) before it can deliver a relevant experience.
- The flow must offer a guest path for users who do not want to register before seeing value.

---

## When not to use

- For returning authenticated users — they bypass this flow entirely and land on the home route per their session state.
- For feature education, tutorials, or product tours — onboarding is not a teaching surface; use contextual help at the point of use instead.
- As a re-engagement or upsell mechanism — this flow runs once on first launch and is not shown again to users who have completed it.
