---
name: Checkout Flow
tier: pattern
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Checkout Flow

---

## 1. Overview

The checkout flow guides a user from trip summary review through to booking confirmation. It collects traveler information, trip details, and payment method, presents a final booking review, and delivers a clear confirmation on success. At every step the interface must reduce cognitive friction, reinforce trust, and communicate progress without ambiguity. It is the highest-stakes interaction in the platform — a broken or confusing checkout directly ends a booking.

The checkout flow is a composition of sub-patterns and atoms. It does not introduce new visual primitives. It orchestrates the form, trip-summary, dialog, and input patterns within a structured, step-aware layout.

---

## 2. When to Use

- Guiding an authenticated or guest user from a non-empty trip selection through to a placed booking.
- Any surface where a user completes a transactional booking requiring traveler details and payment collection.

---

## 3. When Not to Use

- **Empty selection** — Do not render the checkout flow when no trip has been selected. Redirect to the search results or catalog list with an appropriate empty state.
- **Subscription or recurring billing** — Recurring payment setup has distinct legal and UX requirements. Use a dedicated subscription confirmation flow.
- **Free bookings** — If the total is zero (full discount or promotional fare), the payment step is omitted and the flow proceeds directly from booking review to confirmation. Treat this as a variant of the review step, not a separate pattern.
- **Single-field transactions** — Top-up, tip, or donation flows that require only a payment method and amount are too simple to warrant the full checkout pattern. Use a focused dialog with an embedded payment form instead.

---

## 4. Composition

| Pattern / Atom | Role |
|---|---|
| **form** pattern | Customer information form, traveler details form, and payment card detail form. Handles field layout, inline validation, error summary, and submission behavior. |
| **trip-summary** pattern | Booking summary panel displayed alongside the active step on desktop. Read-only in the checkout context — selection editing is not available. |
| **input** atom | Individual form fields for address, card number, expiry, CVV, and email. Managed by the form pattern. |
| **label** atom | Field labels for all form controls. Managed by the form pattern. |
| **radio** atom | Payment method selection (credit card, digital wallet, pay at property); fare or add-on option selection. |
| **checkbox** atom | "Same billing address as delivery"; "Save this address"; "Create an account" at confirmation. |
| **button** atom | Step navigation (Continue, Back); Place Order; Edit (per section in review step); Browse more trips on confirmation. |
| **dialog** atom | Payment failure alert — alert dialog variant. Presents a specific error and the available recovery action without allowing accidental dismissal. |
| **empty-state** pattern | Shown if the user arrives at the checkout URL without a trip selection. |

Additional structural elements (not atoms):

| Element | Role |
|---|---|
| **Progress indicator** | An ordered step list showing all checkout steps, the user's current position, completed steps, and upcoming steps. Not an atom — defined entirely within this pattern. |
| **Section card** | A visually contained card wrapping each checkout step's form content. Provides focus and separates concerns between steps. |
| **Fare option card** | A radio-atom-backed card presenting a single fare or add-on option — option name, price, and key inclusions — with a selected visual state. |
| **Payment error banner** | An inline alert region appearing at the block-start of the payment section when a charge fails. Distinct from the dialog — used for soft errors that do not block the page. |
| **Order review block** | A read-only summary of a completed section (address, delivery, payment) shown in the review step. Each block carries an Edit button atom. |
| **Confirmation area** | The success state rendered after the booking is placed. Contains booking reference, brief summary, and next-step actions. |

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Page background | `color.background.sunken` | Recessed canvas behind the checkout layout |
| Page padding (inline) | `spacing.layout.md` | Outer horizontal page padding |
| Page padding (block) | `spacing.layout.sm` | Outer vertical page padding |
| Column gap | `spacing.lg` | Gap between the main content column and order summary sidebar |
| Step gap (single-page) | `spacing.md` | Vertical gap between section cards in single-page layout |
| **Progress indicator** | | |
| Step circle — size | `spacing.lg` | Diameter of each step indicator circle |
| Step circle — background (active) | `color.background.primary` | Active step fill |
| Step circle — background (completed) | `color.background.success` | Completed step fill |
| Step circle — background (upcoming) | `color.background.subtle` | Upcoming step fill |
| Step circle — background (error) | `color.background.danger` | Step with an unresolved error |
| Step circle — text (active, completed, error) | `color.text.inverse` | Step number or icon on a filled circle |
| Step circle — text (upcoming) | `color.text.subtle` | Step number on an unfilled circle |
| Step connector (upcoming) | `color.border.subtle` | Line connecting upcoming steps |
| Step connector (completed) | `color.status.success` | Line connecting completed steps |
| Step label — font size | `text.body.sm` | Label below each step circle |
| Step label — color (active) | `color.text.primary` | Active step label |
| Step label — color (completed) | `color.text.secondary` | Completed step label |
| Step label — color (upcoming) | `color.text.subtle` | Upcoming step label |
| Progress indicator — padding (block) | `spacing.md` | Top and bottom padding of the indicator bar |
| **Section card** | | |
| Section card — background | `color.background.surface` | Each step section surface |
| Section card — border | `color.border.default` | Section card edge, 1px |
| Section card — border (error) | `color.border.danger` | Section containing unresolved validation errors |
| Section card — radius | `radius.xl` | Section card rounding |
| Section card — padding | `spacing.lg` | Internal padding |
| Section heading — font size | `text.heading.sm` | Step section heading |
| Section heading — color | `color.text.primary` | Full-contrast heading |
| Completed section — background | `color.background.subtle` | Background of a collapsed/completed section in single-page layout |
| Completed section summary — font size | `text.body.sm` | Summary text for a completed section |
| Completed section summary — color | `color.text.secondary` | Supporting hierarchy |
| **Delivery option card** | | |
| Delivery option — background (default) | `color.background.surface` | Option card surface |
| Delivery option — border (default) | `color.border.default` | Option card edge, 1px |
| Delivery option — background (hover) | `color.background.subtle` | Pointer hover state |
| Delivery option — border (hover) | `color.border.strong` | Pointer hover border |
| Delivery option — background (selected) | `color.background.selected` | Selected delivery method |
| Delivery option — border (selected) | `color.border.selected` | Selected delivery method border |
| Delivery option — radius | `radius.lg` | Option card rounding |
| Delivery option — padding | `spacing.md` | Internal option card padding |
| Delivery option — transition | `motion.fast` | Border and background state transition |
| Delivery method name — font size | `text.body.md` | Method name label |
| Delivery method name — color | `color.text.primary` | Full-contrast method name |
| Delivery method price — font size | `text.body.sm` | Price beside the method name |
| Delivery method price — color | `color.text.primary` | Price label |
| Delivery method detail — font size | `text.caption` | Estimated time or detail note |
| Delivery method detail — color | `color.text.secondary` | Supporting hierarchy |
| Delivery option gap | `spacing.sm` | Vertical gap between stacked option cards |
| **Payment error banner** | | |
| Payment error banner — background | `color.background.danger` | Error banner surface |
| Payment error banner — border | `color.border.danger` | Error banner edge, 1px |
| Payment error banner — radius | `radius.md` | Error banner rounding |
| Payment error banner — padding | `spacing.md` | Internal padding |
| Payment error banner — font size | `text.body.sm` | Error message text |
| Payment error banner — color | `color.text.danger` | Error text color |
| **Step navigation** | | |
| Step navigation — padding (block-start) | `spacing.md` | Space above Back / Continue buttons |
| Step navigation — gap | `spacing.sm` | Gap between Back and Continue |
| **Order review block** | | |
| Review block — background | `color.background.subtle` | Read-only review block surface |
| Review block — radius | `radius.md` | Review block rounding |
| Review block — padding | `spacing.md` | Internal padding |
| Review block label — font size | `text.body.sm` | Label for each reviewed field group |
| Review block label — color | `color.text.secondary` | Supporting hierarchy |
| Review block value — font size | `text.body.md` | Reviewed value text |
| Review block value — color | `color.text.primary` | Full-contrast value |
| Review block gap | `spacing.md` | Vertical gap between review blocks |
| **Confirmation area** | | |
| Confirmation icon — color | `color.status.success` | Success checkmark icon |
| Confirmation heading — font size | `text.heading.lg` | "Booking confirmed" heading |
| Confirmation heading — color | `color.text.primary` | Full-contrast heading |
| Booking reference — font size | `text.heading.sm` | Displayed booking reference number |
| Booking reference — color | `color.text.primary` | Full-contrast |
| Confirmation body — font size | `text.body.md` | Confirmation descriptive copy |
| Confirmation body — color | `color.text.secondary` | Supporting hierarchy |
| Confirmation actions — gap | `spacing.sm` | Gap between next-step buttons |
| Confirmation actions — padding (block-start) | `spacing.lg` | Space above action buttons |

---

## 6. Variants

### Multi-step checkout

The flow is divided into discrete steps, each occupying the main content area independently. A progress indicator at the top of the page tracks position. The user advances with a "Continue" button and retreats with "Back". Completed steps can be revisited by clicking their indicator node in the progress bar. Validation for each step runs on Continue — the user cannot proceed if the current step contains errors. The order summary sidebar is visible throughout all steps.

Steps in the default multi-step configuration:

| Step | Label | Content |
|---|---|---|
| 1 | Information | Email, first name, last name, phone number, nationality |
| 2 | Traveler Details | Passport or ID details, date of birth, traveler preferences |
| 3 | Payment | Payment method selection, card detail form |
| 4 | Review | Read-only summary of all previous steps. Place Order button |
| 5 | Confirmation | Booking confirmation, booking reference, next-step actions |

### Single-page checkout

All sections are rendered simultaneously as stacked, collapsible section cards. The user can fill sections in any order. Each section collapses to a summary view once completed, showing key details and an Edit button. Validation runs on "Place Order" submission — any section with errors expands and the error summary scrolls into view. Suitable for simpler checkouts or surfaces where the user is likely to review and edit frequently across sections.

### Guest checkout

The user has no authenticated session. An email address is collected in the Information step as the first field. No saved traveler details or payment methods are pre-populated. All fields are blank on load. At the confirmation step, an optional "Create an account" checkbox allows the user to set a password and save their booking history. The progress indicator, form structure, and all other behavior are identical to the signed-in variant.

### Signed-in checkout

The user is authenticated. The Information step pre-fills name, email, and phone. The Traveler Details step offers a list of saved traveler profiles as selectable options (radio atoms in option card layout) with an "Add traveler details" expansion. The Payment step offers saved payment methods with an "Add new card" option. Saved methods reduce required input to a single click per step. The "Save traveler details" and "Save this card" checkboxes default to unchecked to preserve user control.

---

## 7. Behavior

### Step navigation

In the multi-step variant, pressing Continue validates the current step. If validation passes, the next step's section card is rendered and the progress indicator updates. If validation fails, the form pattern surfaces the error summary and inline errors — the user remains on the current step.

Pressing Back navigates to the previous step without validation. All previously entered data is preserved. Completed step data is retained in state throughout the session regardless of back-navigation.

Clicking a completed step node in the progress indicator navigates directly to that step. Clicking an upcoming step node has no effect — steps cannot be skipped forward.

### Validation

Inline field validation follows the rules defined in form.md. For checkout specifically:

- Validation fires on blur for all fields, per the product constraint that checkout inputs validate inline on blur.
- On pressing Continue, a full-sweep validation of the current step runs. All errored fields are highlighted simultaneously and an error summary appears at the block-start of the section card.
- Payment card fields (card number, expiry, CVV) use format validation in addition to presence validation: card number validates the Luhn algorithm; expiry validates the date is in the future; CVV validates digit count.
- The Place Order button is disabled during submission to prevent duplicate orders. Once pressed, it enters loading state and remains non-interactive until the response is received.

### Saving progress

In the multi-step variant, completed step data is held in the checkout session. Navigating back to a previous step preserves all entered values. If the user leaves the checkout page and returns within the same session, progress is restored to the last completed step.

In the guest checkout variant, session data is not persisted beyond the browser session. If the user closes the browser, progress is lost and they restart from step one.

### Payment error handling

If the payment provider declines the charge:

1. The Place Order button returns to its default active state.
2. A dialog atom (alert dialog variant) presents the specific decline reason: "Your card ending in 4242 was declined. No charge was made. Please check your card details or try a different payment method."
3. On dialog dismissal, focus returns to the payment method section. The card form fields remain filled — the user should not be required to re-enter all details for a simple retry.
4. If the same card is declined a second time, the alert dialog text updates to recommend using a different payment method.

For network or server errors that are not specific to the card:

1. A payment error banner appears at the block-start of the payment section: "We could not process your order. Please try again or contact support."
2. The Place Order button is restored.
3. The user may retry immediately.

Never surface a generic "Payment error" message. Always name the specific problem and the available recovery path.

### Fare and add-on selection

Fare and add-on options are presented as a group of fare option cards, each containing a radio atom, option name, price, and key inclusions. Selecting a card updates the radio state and applies the selected visual treatment. The trip summary sidebar updates to reflect the new selection cost immediately. The total recalculates to reflect any changes in fare or add-on selection.

### Payment method selection

Payment method types (Credit / Debit Card, Apple Pay, Cash on Delivery) are presented as radio atoms in option card layout. Selecting "Credit / Debit Card" expands the card detail form inline below the option cards using the form pattern. Selecting another method collapses the card form and clears its values. The selection persists if the user navigates back and forward between steps.

### Order review

The review step presents each completed section as a read-only order review block. Each block shows the section heading, its key values, and an Edit button atom (ghost variant). Pressing Edit navigates to that step in edit mode. After saving from edit mode, the user is returned to the review step, not advanced to the next sequential step.

### Confirmation

On successful booking placement, the checkout layout transitions to the confirmation area. The progress indicator is removed. The confirmation area shows a success icon (using the icon atom, `color.status.success`), the booking reference, a brief confirmation message, and the key booking dates. The trip summary sidebar remains visible showing the confirmed selections.

Two button atoms are presented as next-step actions: "Browse more trips" (secondary) and "View your booking" (primary, links to the booking detail page). No further checkout actions are available on the confirmation screen.

### Empty cart guard

If a user navigates directly to the checkout URL without a trip selection, the checkout layout does not render. The empty-state pattern is shown with a "Browse flights" action. The progress indicator is not rendered.

---

## 8. Accessibility

| Requirement | Rule |
|---|---|
| Page landmark | The checkout layout must be wrapped in `<main>`. The trip summary sidebar must be an `<aside>` with `aria-label="Booking summary"`. |
| Progress indicator | The progress indicator must be an `<ol>` (ordered list) with `aria-label="Checkout progress"`. Each step is an `<li>`. The active step carries `aria-current="step"`. Completed steps carry a visually hidden "Completed" text suffix. |
| Progress indicator interactivity | Completed step nodes that are clickable must be `<button>` elements, not `<li>` elements, to be reachable by keyboard. Upcoming step nodes must be non-interactive (`aria-disabled="true"` if rendered as buttons, or plain `<span>` elements). |
| Section heading | Each section card must carry a visible `<h2>` heading that names the step: "Delivery", "Payment", "Review". The heading must be present at all times — do not use `aria-label` on the section alone. |
| Section `aria-labelledby` | Each `<section>` element carries `aria-labelledby` referencing its heading's `id`. |
| Step change focus | When the user advances to a new step in the multi-step variant, focus must move to the new section's heading. This communicates the step change to screen readers and keyboard users without requiring the page to reload. |
| Step change announcement | A live region outside the section card announces step transitions: `aria-live="polite"` region reading "Step 2 of 4: Delivery". This supplements the focus move for screen readers that may not read the heading immediately. |
| Delivery option cards | Each delivery option card must wrap a `<label>` element containing the radio atom and all descriptive text (method name, price, estimated time). The radio `<input>` is the interactive control. The card's visual selected state is supplementary — the radio state is the authoritative signal. |
| Payment error banner | The payment error banner must carry `role="alert"` so screen readers announce it immediately when it appears. It must not use `aria-live="polite"` — payment failures require immediate attention. |
| Payment alert dialog | The dialog atom in alert dialog variant carries `role="alertdialog"`. Focus moves to the dialog on open. The confirm/dismiss action returns focus to the Place Order button or the payment method field. |
| Place Order — loading state | The Place Order button carries `aria-disabled="true"` and the native `disabled` attribute while the submission is in progress. A visually hidden status message announces "Placing your order" via `aria-live="polite"`. |
| Confirmation announcement | When the confirmation area appears, a visually hidden `aria-live="assertive"` message announces "Your booking has been placed. Booking reference [number]." immediately. Focus moves to the confirmation heading. |
| Order review blocks | Each review block is a `<dl>` with `<dt>` for each field label and `<dd>` for each value. This communicates label-value pairs correctly to screen readers without requiring a visual table. |
| Form accessibility | Handled by the form pattern. Inline validation, error summary, and focus management on error follow form.md rules. |
| Keyboard navigation | Tab moves through: progress indicator (completed step buttons) → section heading → form controls → fare option cards → step navigation buttons. The trip summary sidebar is skipped in the tab order (it is read-only and accessible via the `<aside>` landmark). |
| WCAG criteria | SC 1.3.1 (Info and Relationships), SC 2.1.1 (Keyboard), SC 2.4.3 (Focus Order), SC 3.3.1 (Error Identification), SC 3.3.2 (Labels or Instructions), SC 4.1.3 (Status Messages), SC 1.4.3 (Contrast Minimum) |

---

## 9. Content Guidelines

- **Step labels: one or two words.** "Information", "Delivery", "Payment", "Review" — not "Enter your details", "Choose how to receive it", "How would you like to pay?". The label identifies the step's subject, not its instruction.
- **Section headings: match the step label exactly.** The `<h2>` inside the section card must use the same wording as the progress indicator step label. Inconsistency between the indicator and the section heading confuses users.
- **Continue button: label it by action, not by step name.** "Continue" is correct for all intermediate steps. Do not use "Next", "Proceed", or the name of the upcoming step. Reserve step names for the progress indicator.
- **Place Order: use this exact label.** "Place Order" is the only acceptable label for the final submission button. Do not use "Submit", "Pay Now", "Confirm", or "Complete Purchase". Users must understand they are committing to a charge.
- **Prices: always show the currency.** Every price in the checkout — delivery cost, discount, item prices, total — must carry the currency label. Do not rely on a page-level indicator.
- **Total: show what the user will actually be charged.** The total displayed at the bottom of the order summary must be the final charge including delivery, taxes, and applied discounts. Never show a subtotal where the total is expected.
- **Fare option labels: include the price and key inclusions.** "Economy flex — SAR 850 · Seat selection included · Free cancellation" is correct. "Economy" alone is not. The user must know the cost and what is included without reading supplementary text.
- **Payment errors: name the card and the action.** "Your card ending in 4242 was not charged" is correct. "Payment failed" is not. "Your card was declined" is not enough — add the recovery step: "Please update your card details or use a different payment method."
- **Confirmation message: confirm the booking reference first.** The booking reference is the most important information on the confirmation screen. Lead with it. "Booking #98341 is confirmed" before any descriptive copy.
- **Guest checkout: do not pressure account creation.** The "Create an account" option at confirmation must be framed as optional and clearly secondary. Do not use language that implies the booking is incomplete without an account.
- **Avoid vague trust signals.** "Secure checkout" alone is not a trust signal. If a security indicator is shown, name the standard: "256-bit SSL encryption" or the payment provider. Vague badges add visual noise without building genuine trust.

---

## 10. Code Example

```html
<!-- ============================================================ -->
<!-- Checkout flow — multi-step layout                            -->
<!-- ============================================================ -->
<main class="checkout" aria-label="Checkout">

  <!-- Step change live region — updated on every step transition -->
  <div
    class="checkout__step-announce"
    aria-live="polite"
    aria-atomic="true"
  >
    <span class="visually-hidden">Step 3 of 4: Payment</span>
  </div>

  <!-- ── Progress indicator ── -->
  <ol class="checkout__progress" aria-label="Checkout progress">

    <li class="checkout__step checkout__step--completed">
      <button
        class="checkout__step-node"
        type="button"
        aria-label="Go back to Information step"
      >
        <span class="checkout__step-circle" aria-hidden="true">
          <!-- check icon -->
          <svg class="icon icon--sm" aria-hidden="true" focusable="false">
            <use href="/icons/sprite.svg#check" />
          </svg>
        </span>
        <span class="checkout__step-label">
          Information
          <span class="visually-hidden"> — Completed</span>
        </span>
      </button>
      <span class="checkout__step-connector" aria-hidden="true"></span>
    </li>

    <li class="checkout__step checkout__step--completed">
      <button
        class="checkout__step-node"
        type="button"
        aria-label="Go back to Delivery step"
      >
        <span class="checkout__step-circle" aria-hidden="true">
          <svg class="icon icon--sm" aria-hidden="true" focusable="false">
            <use href="/icons/sprite.svg#check" />
          </svg>
        </span>
        <span class="checkout__step-label">
          Delivery
          <span class="visually-hidden"> — Completed</span>
        </span>
      </button>
      <span class="checkout__step-connector" aria-hidden="true"></span>
    </li>

    <li class="checkout__step checkout__step--active">
      <span class="checkout__step-node" aria-current="step">
        <span class="checkout__step-circle" aria-hidden="true">3</span>
        <span class="checkout__step-label">Payment</span>
      </span>
      <span class="checkout__step-connector" aria-hidden="true"></span>
    </li>

    <li class="checkout__step checkout__step--upcoming">
      <span class="checkout__step-node">
        <span class="checkout__step-circle" aria-hidden="true">4</span>
        <span class="checkout__step-label">Review</span>
      </span>
    </li>

  </ol>

  <!-- ── Two-column layout ── -->
  <div class="checkout__columns">

    <!-- Main content: active step -->
    <div class="checkout__main">

      <!-- ── Step 3: Payment ── -->
      <section
        class="checkout__section"
        aria-labelledby="step-payment-heading"
      >
        <h2 id="step-payment-heading" class="checkout__section-heading">
          Payment
        </h2>

        <!-- Payment error banner — role="alert", shown on charge failure -->
        <div class="checkout__payment-error" role="alert" hidden>
          <p class="checkout__payment-error-text">
            Your card ending in 4242 was declined. No charge was made.
            Please check your card details or use a different payment method.
          </p>
        </div>

        <!-- Payment method selection — radio option cards -->
        <fieldset class="checkout__option-group">
          <legend class="checkout__field-group-label">Payment method</legend>

          <!-- Delivery option card: Credit / Debit card — selected -->
          <label class="checkout__option-card checkout__option-card--selected">
            <!-- radio atom -->
            <input
              class="radio__input"
              type="radio"
              name="payment-method"
              value="card"
              checked
            />
            <span class="checkout__option-content">
              <span class="checkout__option-name">Credit / Debit Card</span>
              <span class="checkout__option-detail">Visa, Mastercard, Mada</span>
            </span>
          </label>

          <!-- Delivery option card: Digital wallet -->
          <label class="checkout__option-card">
            <input
              class="radio__input"
              type="radio"
              name="payment-method"
              value="wallet"
            />
            <span class="checkout__option-content">
              <span class="checkout__option-name">Apple Pay</span>
              <span class="checkout__option-detail">Pay with Face ID or Touch ID</span>
            </span>
          </label>

          <!-- Delivery option card: Cash on delivery -->
          <label class="checkout__option-card">
            <input
              class="radio__input"
              type="radio"
              name="payment-method"
              value="cod"
            />
            <span class="checkout__option-content">
              <span class="checkout__option-name">Pay at Property</span>
              <span class="checkout__option-detail">Pay when you check in</span>
            </span>
          </label>

        </fieldset>

        <!-- Card details form — shown when card method is selected -->
        <!-- form pattern — contains input and label atoms -->
        <div class="checkout__card-form" id="card-form-region">
          <!-- form pattern fields: Card number, Expiry, CVV -->
          <!-- Billing address same as delivery — checkbox atom -->
          <label class="checkbox">
            <input class="checkbox__input" type="checkbox" name="billing-same" checked />
            <span class="checkbox__label">Billing address same as delivery address</span>
          </label>
        </div>

        <!-- Step navigation -->
        <div class="checkout__nav">
          <button class="button button--secondary button--md" type="button">
            Back
          </button>
          <button class="button button--primary button--md" type="button">
            Continue
          </button>
        </div>

      </section>

    </div>

    <!-- Booking summary sidebar — trip-summary pattern (read-only) -->
    <aside class="checkout__summary" aria-label="Booking summary">
      <!-- trip-summary pattern -->
    </aside>

  </div>

</main>


<!-- ============================================================ -->
<!-- Step 4: Order review — read-only blocks with Edit actions    -->
<!-- ============================================================ -->
<section class="checkout__section" aria-labelledby="step-review-heading">
  <h2 id="step-review-heading" class="checkout__section-heading">Review your booking</h2>

  <!-- Information review block -->
  <div class="checkout__review-block">
    <div class="checkout__review-block-header">
      <h3 class="checkout__review-block-title">Information</h3>
      <!-- button atom — ghost -->
      <button class="button button--ghost button--sm" type="button">Edit</button>
    </div>
    <dl class="checkout__review-dl">
      <div class="checkout__review-row">
        <dt class="checkout__review-label">Name</dt>
        <dd class="checkout__review-value">Sara Al-Otaibi</dd>
      </div>
      <div class="checkout__review-row">
        <dt class="checkout__review-label">Email</dt>
        <dd class="checkout__review-value">sara@example.com</dd>
      </div>
      <div class="checkout__review-row">
        <dt class="checkout__review-label">Phone</dt>
        <dd class="checkout__review-value">+966 50 000 0000</dd>
      </div>
    </dl>
  </div>

  <!-- Delivery review block -->
  <div class="checkout__review-block">
    <div class="checkout__review-block-header">
      <h3 class="checkout__review-block-title">Delivery</h3>
      <button class="button button--ghost button--sm" type="button">Edit</button>
    </div>
    <dl class="checkout__review-dl">
      <div class="checkout__review-row">
        <dt class="checkout__review-label">Address</dt>
        <dd class="checkout__review-value">King Fahd Road, Riyadh 12345, Saudi Arabia</dd>
      </div>
      <div class="checkout__review-row">
        <dt class="checkout__review-label">Method</dt>
        <dd class="checkout__review-value">Economy Flex · SAR 850 · Seat selection included</dd>
      </div>
    </dl>
  </div>

  <!-- Payment review block -->
  <div class="checkout__review-block">
    <div class="checkout__review-block-header">
      <h3 class="checkout__review-block-title">Payment</h3>
      <button class="button button--ghost button--sm" type="button">Edit</button>
    </div>
    <dl class="checkout__review-dl">
      <div class="checkout__review-row">
        <dt class="checkout__review-label">Card</dt>
        <dd class="checkout__review-value">Visa ending in 4242</dd>
      </div>
    </dl>
  </div>

  <!-- Place Order -->
  <div class="checkout__nav checkout__nav--place-order">
    <button
      class="button button--primary button--lg checkout__place-order"
      type="button"
    >
      Place Order — SAR 523
    </button>
    <p class="checkout__order-notice">
      By placing your order you agree to our terms and conditions.
    </p>
  </div>

</section>


<!-- ============================================================ -->
<!-- Confirmation area — success state                            -->
<!-- ============================================================ -->

<!-- Announcement live region — fires immediately on success -->
<div aria-live="assertive" aria-atomic="true" class="visually-hidden">
  Your booking has been placed. Booking reference 98341.
</div>

<section class="checkout__confirmation" aria-labelledby="confirmation-heading" tabindex="-1">

  <div class="checkout__confirmation-icon" aria-hidden="true">
    <!-- icon atom — check-circle, color.status.success -->
    <svg class="icon icon--lg" aria-hidden="true" focusable="false">
      <use href="/icons/sprite.svg#check-circle" />
    </svg>
  </div>

  <h2 id="confirmation-heading" class="checkout__confirmation-heading">
    Booking #98341 confirmed
  </h2>

  <p class="checkout__confirmation-body">
    We've received your booking and will send a confirmation to sara@example.com.
    Check-in: Wednesday, 30 April.
  </p>

  <div class="checkout__confirmation-actions">
    <!-- button atom — primary -->
    <a href="/bookings/98341" class="button button--primary button--md">
      View your booking
    </a>
    <!-- button atom — secondary -->
    <a href="/flights" class="button button--secondary button--md">
      Browse more trips
    </a>
  </div>

</section>
```

```css
/* ============================================================ */
/* Checkout Flow — layout styles                                  */
/* All directional properties use logical CSS for RTL support   */
/* ============================================================ */

/* --- Page container --- */
.checkout {
  background: var(--color-background-sunken);
  padding-block: var(--spacing-layout-sm);
  padding-inline: var(--spacing-layout-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* --- Progress indicator --- */
.checkout__progress {
  list-style: none;
  padding: var(--spacing-md) 0;
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: 0;
}

.checkout__step {
  display: flex;
  align-items: center;
  flex: 1;
}

.checkout__step:last-child {
  flex: none;
}

.checkout__step-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  background: none;
  border: none;
  padding: 0;
  cursor: default;
}

.checkout__step--completed .checkout__step-node {
  cursor: pointer;
}

.checkout__step-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--spacing-lg);
  block-size: var(--spacing-lg);
  border-radius: var(--radius-full);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-semibold);
  background: var(--color-background-subtle);
  color: var(--color-text-subtle);
}

.checkout__step--active .checkout__step-circle {
  background: var(--color-background-primary);
  color: var(--color-text-inverse);
}

.checkout__step--completed .checkout__step-circle {
  background: var(--color-background-success);
  color: var(--color-text-inverse);
}

.checkout__step--error .checkout__step-circle {
  background: var(--color-background-danger);
  color: var(--color-text-inverse);
}

.checkout__step-label {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-subtle);
  white-space: nowrap;
}

.checkout__step--active .checkout__step-label {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

.checkout__step--completed .checkout__step-label {
  color: var(--color-text-secondary);
}

.checkout__step-connector {
  flex: 1;
  block-size: 1px;
  background: var(--color-border-subtle);
  margin-block-start: calc(var(--spacing-lg) / 2);
  align-self: flex-start;
}

.checkout__step--completed .checkout__step-connector {
  background: var(--color-status-success);
}

/* --- Two-column layout --- */
.checkout__columns {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: var(--spacing-lg);
  align-items: start;
}

@media (max-width: 900px) {
  .checkout__columns {
    grid-template-columns: 1fr;
  }
}

/* --- Section card --- */
.checkout__section {
  background: var(--color-background-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.checkout__section--error {
  border-color: var(--color-border-danger);
}

.checkout__section-heading {
  font-size: var(--text-heading-sm-size);
  color: var(--color-text-primary);
  margin: 0;
}

/* --- Payment error banner --- */
.checkout__payment-error {
  background: var(--color-background-danger);
  border: 1px solid var(--color-border-danger);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.checkout__payment-error-text {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-danger);
  margin: 0;
}

/* --- Field group label --- */
.checkout__field-group-label {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  padding: 0;
  margin-block-end: var(--spacing-xs);
}

/* --- Delivery / payment option cards --- */
.checkout__option-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  border: none;
  padding: 0;
  margin: 0;
}

.checkout__option-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-background-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: background-color var(--motion-fast), border-color var(--motion-fast);
}

.checkout__option-card:hover {
  background: var(--color-background-subtle);
  border-color: var(--color-border-strong);
}

.checkout__option-card--selected,
.checkout__option-card:has(.radio__input:checked) {
  background: var(--color-background-selected);
  border-color: var(--color-border-selected);
}

.checkout__option-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.checkout__option-name {
  font-size: var(--text-body-size);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.checkout__option-price {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-primary);
}

.checkout__option-detail {
  font-size: var(--text-caption-size);
  color: var(--color-text-secondary);
}

/* --- Step navigation --- */
.checkout__nav {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  padding-block-start: var(--spacing-md);
  border-block-start: 1px solid var(--color-border-subtle);
}

/* --- Order summary sidebar --- */
.checkout__summary {
  position: sticky;
  inset-block-start: var(--spacing-md);
}

/* --- Review blocks --- */
.checkout__review-block {
  background: var(--color-background-subtle);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.checkout__review-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkout__review-block-title {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  margin: 0;
}

.checkout__review-dl {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin: 0;
}

.checkout__review-row {
  display: flex;
  gap: var(--spacing-sm);
}

.checkout__review-label {
  font-size: var(--text-body-sm-size);
  color: var(--color-text-secondary);
  min-inline-size: 6ch;
  flex-shrink: 0;
}

.checkout__review-value {
  font-size: var(--text-body-size);
  color: var(--color-text-primary);
}

/* Place Order area */
.checkout__nav--place-order {
  flex-direction: column;
  align-items: stretch;
}

.checkout__place-order {
  inline-size: 100%;
}

.checkout__order-notice {
  font-size: var(--text-caption-size);
  color: var(--color-text-subtle);
  text-align: center;
  margin: 0;
}

/* --- Confirmation --- */
.checkout__confirmation {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-md);
  padding-block: var(--spacing-layout-sm);
}

.checkout__confirmation-icon {
  color: var(--color-status-success);
}

.checkout__confirmation-heading {
  font-size: var(--text-heading-lg-size);
  color: var(--color-text-primary);
  margin: 0;
}

.checkout__confirmation-body {
  font-size: var(--text-body-size);
  color: var(--color-text-secondary);
  margin: 0;
  max-inline-size: 48ch;
}

.checkout__confirmation-actions {
  display: flex;
  gap: var(--spacing-sm);
  padding-block-start: var(--spacing-lg);
}

/* --- Visually hidden utility --- */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

/* --- Reduced motion --- */
@media (prefers-reduced-motion: reduce) {
  .checkout__option-card {
    transition: none;
  }
}
```

---

## 11. Cross References

- [form.md](../patterns/form.md) — Customer information, traveler details, and payment card detail forms; inline validation and error summary behavior
- trip-summary.md — Booking summary sidebar throughout all steps and read-only booking summary at confirmation
- [button.md](../atoms/button.md) — Continue, Back, Place Order, Edit, and confirmation next-step actions
- [input.md](../atoms/input.md) — Individual form fields for address, card details, and promo code; managed by the form pattern
- [label.md](../atoms/label.md) — Field labels in all form sections; managed by the form pattern
- [radio.md](../atoms/radio.md) — Payment method selection and delivery method selection within option cards
- [checkbox.md](../atoms/checkbox.md) — Billing same as delivery; save address; save card; create account options
- [dialog.md](../patterns/dialog.md) — Alert dialog variant for payment decline errors requiring explicit acknowledgment
- [empty-state.md](../patterns/empty-state.md) — Shown when the user arrives at the checkout URL without a trip selection
- [icon.md](../atoms/icon.md) — Checkmark icon in completed progress step circles and success icon in confirmation area
- [spinner.md](../atoms/spinner.md) — Loading state within the Place Order button during submission; managed by the button atom
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all values used by this pattern
