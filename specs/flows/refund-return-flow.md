---
name: Refund and Return Flow
tier: flow
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Refund and Return Flow

---

## 1. Overview

The refund and return flow defines how users request a refund, report a service issue, or request an alternative booking for a completed or partially fulfilled booking. It is a multi-step, form-driven sequence that begins from the booking tracking or booking history surface, guides the user through eligibility assessment, reason collection, and evidence submission where required, presents a review step before commitment, and communicates the outcome after submission.

This flow operates after the booking has been completed or has reached a terminal state. It is the post-booking recovery path — the mechanism by which the platform honours its commitments to users who received incorrect service, experienced a disruption, or are entitled to a refund within the platform's stated refund policy.

The flow is composed entirely from existing patterns and atoms: the Form pattern governs data collection, the Dialog pattern governs review confirmation, the notification and error-state flows govern outcome communication. No new surface primitives are introduced.

Unlike the cancellation flow — which terminates a booking before travel — this flow begins after the booking service has been delivered. The two flows share a structural philosophy (eligibility gate, explicit confirmation, status communication) but differ in entry points, steps, and eligibility conditions.

---

## 2. When to Use

- A completed booking involved a service issue — incorrect room type, flight disruption, or accommodation not as described.
- The user is entitled to a refund and the refund window has not expired.
- A refund was not applied automatically (e.g., after a partial cancellation) and the user needs to claim it.
- The user experienced a service issue and the platform offers an alternative booking as resolution.
- The platform's refund policy permits refund requests within a defined window and the booking qualifies.

---

## 3. When Not to Use

- **Before travel** — If the booking has not yet commenced, use the cancellation flow. Refund requests apply only to completed or partially completed bookings.
- **For automatically processed refunds** — If the platform issues a refund without user initiation (e.g., after a successful cancellation), no flow is required. Communicate the refund via a notification and update the booking status.
- **For subscription billing disputes** — Subscription refunds and cancellations operate under different legal requirements. Do not use this flow for recurring billing disputes.
- **For expired refund windows** — When the refund window has expired and no exception applies, render the ineligible state and direct the user to support. Do not expose the request form.
- **For non-refundable bookings** — Fares or rate plans marked as non-refundable at the time of booking are not eligible. Show the ineligible state with the specific reason and a Link to the relevant policy.

---

## 4. Composition

| Atom / Pattern | Role |
|---|---|
| Button (secondary) | The entry point trigger on the booking tracking or booking history page. Labelled "Request refund", "Report an issue", or "Request an alternative" depending on context. Activating it begins the flow. Present only when the booking is in an eligible state. |
| Form | The primary data-collection surface across all steps of the flow. Governs field layout, label association, inline validation, error summary, and submission. Each step of the multi-step flow is a discrete Form section. |
| Radio | Item selection step — the user selects which service or services from the booking the request applies to, rendered as a Radio group for single-service bookings or single-selection requests. Checkbox group for multi-service selection. Each option displays the service name, dates, and price. |
| Checkbox | Multi-service selection — when the booking contains multiple services and the user may select more than one for the request. Also used for policy acknowledgment at the review step ("I confirm the information provided is accurate to the best of my knowledge"). |
| Input | Reason elaboration — a free-text field for additional context, present in all variants. Optional unless the selected reason is "Other." Also used for collection of a refund reference or support ticket number if provided by the user. |
| Icon | Leading icon in the eligibility state blocks and the confirmation state. Uses a check-circle (eligible), x-circle (ineligible), and check-circle (submitted successfully). Always paired with adjacent text — not the sole indicator of status. Carries `aria-hidden="true"` in all cases. |
| Button (primary) | Step-advancing action at each step: "Continue." Final step submission action: "Submit request." Enters loading state during async submission. |
| Button (secondary) | Step-retreating action at each step: "Back." Also the dismiss action on the review Dialog: "Edit request." |
| Dialog | Review and confirmation surface at the final step. Summarises the request — type, items, reason, resolution preference — and presents the "Submit request" and "Edit request" Buttons. Prevents accidental submission. Uses `role="dialog"` (not `alertdialog`) — the submission is intentional and not destructive. |
| Spinner | Replaces the "Submit request" Button during the submitting state. The Dialog remains open and non-interactive. |

**Evidence upload**

Where the platform requires photographic evidence (for service issue claims), a file input control is embedded within the Form at the reason step. This is a standard `<input type="file">` element, labelled by a visible Label atom, constrained to image file types, and governed by the Form pattern's field layout. It is not a separate atom. A maximum file count and size limit are stated in the Label's helper text.

**Multi-step structure**

The flow is divided into four steps, each rendered as a discrete Form section within a step-aware layout:

1. **Eligibility and entry** — Confirms the booking qualifies. Displays the refund window status. The user selects the request type (refund, service issue, alternative booking).
2. **Item selection** — The user selects which item or items the request covers.
3. **Reason and evidence** — The user selects a reason from a Radio group and optionally provides additional detail via Input and uploads evidence.
4. **Review** — A read-only summary of all selections. The user submits via a Dialog.

**Token reference — surface and layout**

| Part | Token | Role |
|---|---|---|
| Page background | `color.background.sunken` | Canvas behind the flow surface. |
| Step card background | `color.background.surface` | Surface of each step card. |
| Step card border | `color.border.subtle` | Edge of each step card. |
| Step card radius | `radius.xl` | Corner rounding on step cards. |
| Step card padding | `spacing.layout.sm` | Internal padding on all sides of each step card. |
| Step label text — active | `color.text.primary` | Step number and name for the current step. |
| Step label text — completed | `color.text.secondary` | Step number and name for completed steps. |
| Step label text — pending | `color.text.subtle` | Step number and name for future steps. |
| Step connector line | `color.border.subtle` | Vertical line between step indicators. |
| Step connector line — completed | `color.border.selected` | Segment between completed steps. |
| Eligibility banner — eligible | `color.background.success` | Background of the eligible state banner. |
| Eligibility banner — ineligible | `color.background.danger` | Background of the ineligible state banner. |
| Eligibility icon — eligible | `color.status.success` | Icon color in the eligible banner. |
| Eligibility icon — ineligible | `color.status.danger` | Icon color in the ineligible banner. |
| Eligibility text | `color.text.primary` | Primary message in eligibility banners. |
| Eligibility subtext | `color.text.secondary` | Supporting detail in eligibility banners. |
| Item selection row background | `color.background.surface` | Surface for each selectable item row. |
| Item selection row background — selected | `color.background.selected` | Surface for a selected item row. |
| Item selection row border | `color.border.default` | Border on unselected item rows. |
| Item selection row border — selected | `color.border.selected` | Border on selected item rows. |
| Item selection row radius | `radius.lg` | Corner rounding on item rows. |
| Item selection row padding | `spacing.md` | Internal padding within item rows. |
| Review section label | `color.text.subtle` | Label for each review summary group (e.g., "Request type", "Items", "Reason"). |
| Review section value | `color.text.primary` | Value text for each review summary row. |
| Gap between steps | `spacing.xl` | Vertical gap between the step progress indicator and the active step card. |
| Gap between form sections | `spacing.lg` | Vertical gap between grouped fields within a step. |
| Gap between item rows | `spacing.sm` | Vertical gap between selectable item rows. |
| Gap between action buttons | `spacing.sm` | Gap between primary and secondary action Buttons at each step. |

---

## 5. Variants

| Variant | Description | Steps affected | Resolution |
|---|---|---|---|
| Refund request | The user requests a monetary refund for a completed booking or service. No physical return is required. The reason must be provided. | All four steps. | Refund to original payment method within the stated processing window. |
| Service issue request | The user reports a service issue (accommodation not as described, flight disruption, or service not provided) and requests a refund. A supporting information step is included between reason collection and review. | All four steps, plus supporting information step. | Case reference and expected review timeline provided after submission. Refund issued after the case is reviewed and approved. |
| Alternative booking request | The user requests an alternative booking. Available only when an equivalent option is available and within the refund window. Shown only when the system confirms availability. | All four steps. Resolution type displayed as "Alternative booking" in the review step. | Alternative booking confirmed after submission is approved. Fare difference, if any, is communicated before confirmation. |
| Partial refund | The user selects a subset of services from a multi-service booking. The refund applies only to the selected services. The remaining services are unaffected. | Item selection step explicitly supports multi-select. Review step shows selected services only with their subtotal. | Partial refund to original payment method for the selected services only. |
| Ineligible refund | The booking does not qualify for a refund — the refund window has expired, the booking type is excluded, or the user's claim history has exceeded a threshold. No form is presented. | No form steps rendered. | Ineligible state shown with the specific reason and a Link to policy or support. |

---

## 6. Behavior

### Validate eligibility

When the user activates the entry point trigger, the system checks eligibility before rendering any form steps. Eligibility conditions checked: whether the refund window is open, whether the booking type is eligible for a refund, and whether the booking has reached a completed or terminal state. The eligibility result determines which variant is rendered. If the booking is ineligible, the ineligible state is shown immediately and no form steps are rendered.

### Collect reason

At step three, the user selects a reason from a Radio group. Predefined options cover the most common cases. "Other" is always the last option. If "Other" is selected, a free-text Input appears below the Radio group using `motion.fast`. The free-text Input is optional unless "Other" is the only selected option and no predefined reason was chosen — in that case the Input is marked required and the "Continue" Button remains disabled until it contains at least one character.

For service issue claims (accommodation not as described or service not provided), an evidence upload field appears below the reason Input. The field accepts image files up to the stated size limit. Upload is optional for "Changed my mind" and similar reasons; required for "Accommodation not as described" and "Service not provided."

### Confirm before submission

At the review step, the user sees a read-only summary of all selections. Activating "Submit request" opens the Dialog, which repeats the summary and presents the final "Submit request" and "Edit request" Buttons. This confirms the user has reviewed the full request before committing. Activating "Edit request" closes the Dialog and returns the user to the review step with all selections intact.

### Show status after submission

On successful submission:
1. The Dialog closes with `motion.exit`.
2. The flow surface transitions to the submitted confirmation state.
3. A success notification toast appears: "Refund request submitted" (or "Service issue request submitted," or "Alternative booking request submitted") per notifications.md.
4. The confirmation state displays the request reference number, expected response time, and a Link to track the request status.

On submission failure:
1. The Spinner is replaced by the "Submit request" and "Edit request" Buttons.
2. An inline error message appears within the Dialog body above the actions per error-state.md inline variant.
3. The Dialog remains open. The user can retry or close the Dialog to return to the review step.

### Allow tracking request progress

After a successful submission, the confirmation state includes a request reference number and a statement of the expected response window (e.g., "We'll review your request within 2 business days"). If the platform supports a request status page, a "Track your request" Link is provided. If tracking is unavailable, a "Contact support" Link with the reference number pre-populated where possible is shown instead.

---

## 7. States

| State | Description | Token behavior |
|---|---|---|
| Eligible | Entry point trigger visible. Eligibility banner (success) shown at the top of the flow. Form steps rendered. | Eligibility banner: `color.background.success`. Icon: `color.status.success`. |
| Not eligible | Entry point trigger absent or deactivated. Ineligible state block shown in place of the form. Reason stated. Link to policy or support provided. | Ineligible block: `color.background.danger`. Icon: `color.status.danger`. Text: `color.text.danger` for the reason; `color.text.secondary` for supporting copy. |
| Submitting | "Submit request" Button replaced by Spinner within Dialog. Dialog non-interactive. | Spinner: `color.text.secondary`. Dialog surface unchanged. |
| Submitted | Flow surface replaced by confirmation state. Request reference, response time, and tracking Link visible. Success notification toast shown. | Confirmation state background: `color.background.surface`. Icon: `color.status.success`. Reference text: `color.text.primary`. |
| Rejected | Request was reviewed and rejected by the platform. Displayed on the request status page (out of scope for this flow) or communicated via a notification. | Governed by notifications.md and order-tracking.md status token sets. |
| Approved | Request was approved. Refund, return instructions, or replacement dispatch confirmed. Communicated via notification and updated request status. | Governed by notifications.md success token set. |
| Error | Submission failed. Inline error shown within Dialog. Buttons restored. Dialog remains open. | Per error-state.md inline variant token assignments. |

---

## 8. Accessibility

**ARIA roles and structure**

| Element | Role | Purpose |
|---|---|---|
| Multi-step form container | `role="main"` with `aria-label="Refund request"` (or "Service issue request", "Alternative booking request") | Identifies the primary content region. |
| Step progress indicator | `role="list"` with each step as `role="listitem"` | Communicates the total number of steps and the current position. |
| Active step indicator | `aria-current="step"` on the active step listitem | Identifies the current step to screen readers. |
| Item selection Radio group | `<fieldset>` with `<legend>` | Groups service options with a visible group label ("Select services for this request"). |
| Item selection Checkbox group (multi-item) | `<fieldset>` with `<legend>` | Groups service checkboxes with a visible group label. |
| Reason Radio group | `<fieldset>` with `<legend>` | Groups reason options with a visible group label ("Reason for request"). |
| Evidence upload field | `<label>` associated with `<input type="file">` | Named field for the file input. Helper text states accepted types and size limit. |
| Policy acknowledgment Checkbox | `aria-required="true"` | Signals that checking is required before the submit action is available. |
| Review Dialog | `role="dialog"` with `aria-labelledby` and `aria-describedby` | Review is intentional, not destructive — `role="dialog"` is correct here, not `alertdialog`. |
| Eligibility banner | `role="status"` with `aria-live="polite"` | Announced when the eligibility result renders after the entry trigger is activated. |
| Inline error (submission failure) | `role="alert"` with `aria-live="assertive"` | Immediately interrupts to announce the failure. |
| Confirmation state | `role="status"` with `aria-live="polite"` | Announced when the flow transitions to the submitted state. |

**Keyboard navigation**

- Tab moves through all interactive elements in each step in document order: Radio options (Arrow keys within group), Checkboxes, Inputs, file input, and step-advancing Buttons.
- Within Radio groups, Arrow keys navigate between options. Tab moves past the group to the next field.
- Within the review Dialog, focus is trapped. Tab cycles through: "Submit request" Button, "Edit request" Button.
- Escape closes the review Dialog and returns focus to the "Submit request" trigger on the review step.
- When the Dialog opens, focus moves to the Dialog's first interactive element ("Submit request" Button is intentionally first — the user arrived here deliberately).

**Focus management**

- When the flow first renders after the eligibility check, focus moves to the eligibility banner heading or the first form field in step one.
- When advancing to the next step, focus moves to the heading or first interactive element of the new step.
- When returning to a previous step, focus moves to the heading of that step.
- When the review Dialog closes via "Edit request," focus returns to the "Submit request" Button on the review step.
- When the flow transitions to the submitted confirmation state, focus moves to the confirmation heading.
- When a submission error occurs and the Dialog re-enables its Buttons, focus moves to the inline error message.

**Form labels and errors**

All form fields must have a visible Label atom associated via `for`/`id`. Error messages appear below their associated field per the Input atom's error state. A form-level error summary is rendered at the top of the affected step when multiple fields fail simultaneously, listing each error with a Link that moves focus to the relevant field. This behavior is governed by the Form pattern.

**Color contrast**

All text must meet WCAG 2.1 AA: minimum 4.5:1 for body text, minimum 3:1 for large text and UI component boundaries. Eligibility and error states must not be communicated by color alone — Icon shape and text label provide redundant non-color signals.

---

## 9. Content Guidelines

**Eligibility messages**

- State the window plainly: "You can submit a refund request for this booking until [date]." Do not say "within 30 days" — give the absolute date.
- If ineligible, name the specific reason: "The refund window for this booking closed on [date]." or "This booking is not eligible for a refund." Do not use a generic "You cannot request a refund."
- Provide the next step in the ineligible state: "For help with this booking, contact support." Include a Link.

**Request type selection**

- Use plain labels: "Request a refund", "Report a service issue", "Request an alternative booking."
- Add one-line descriptions under each option: "Your payment will be refunded to your original payment method. No physical return is required." — not legal boilerplate.

**Reason labels**

- Preferred labels: "Accommodation not as described", "Service not provided", "Booking details did not match", "I changed my mind", "Service was not delivered", "Other."
- Do not use internal codes or categories.
- "Other" must always be last.

**Evidence upload field**

- Label: "Upload evidence of the issue" or "Attach supporting photos."
- Helper text: "Accepted formats: JPG, PNG. Maximum 5 MB per file. Up to 3 files."
- Do not use "Drag and drop or click" as the sole affordance label — provide a visible Button or Link within the upload field.

**Review step**

- Show all selected values in plain language. Each summary row has a label ("Request type:", "Items:", "Reason:") and the user's selected value.
- Include a final line: "Once submitted, you cannot change your request. Contact support if you need to amend it."
- Do not include legal disclaimers in the review step. These belong in the policy page, linked from the helper text of the acknowledgment Checkbox.

**Submit Button**

- "Submit request" — not "Send", "Confirm", "OK", or "Proceed."

**Confirmation state**

- Lead with the request type: "Refund request submitted", "Service issue request submitted", "Alternative booking request submitted."
- State the reference: "Your request reference is [ID]."
- State the expected response time: "We'll review your request within 2 business days."
- Provide the next step: "Track your request" (Link) or "Contact support" (Link) with the reference number.

**Rejection and approval notifications**

- Per notifications.md: "Refund approved — SAR [amount] will appear in your account within 3–5 business days." or "Refund request rejected — [specific reason]. Contact support for help."
- Never say "unfortunately" or apologise. State the outcome and the next step.

---

## 10. Cross References

- order-tracking.md
- order-confirmation.md
- cancellation-flow.md
- form.md
- dialog.md
- notifications.md
- error-state.md
- button.md
- input.md
- radio.md
- checkbox.md
- icon.md
- spinner.md
- label.md
- token-reference.md
