---
name: Stepper
tier: pattern
status: draft
last-updated: 2026-05-20
maintainer: Team 4
source: Almosafer Design System
---

# Stepper

---

## 1. Overview

The Stepper is a sequential progress pattern that guides users through a defined, ordered journey. It communicates where the user is within a multi-step process, what they have completed, and what remains ahead. It does not navigate between parallel data pages — it tracks linear progress through a workflow.

The Stepper is the primary pattern for all multi-step flows on Almosafer: checkout, booking confirmation, refund requests, onboarding, and order tracking. Every step is meaningful, ordered, and has a clear completion signal. The Stepper makes a complex journey feel manageable by breaking it into named, bounded stages with an unambiguous sense of forward movement.

**This pattern is not Pagination.** Pagination moves between parallel pages of equivalent data. The Stepper moves through sequential stages of a single goal. Using one where the other is needed is an architectural error, not a styling choice.

---

## 2. When to Use

- A user must complete a fixed sequence of stages to achieve a single goal: booking a flight, completing checkout, filing a refund.
- The number of steps is known in advance and does not change dynamically during the journey.
- Each step has a meaningful name and represents a distinct phase of user effort — not a sub-element of the same screen.
- Completion status must be communicated visually at all times — users returning mid-flow need to know where they left off.
- The total step count is between two and six. Seven or more steps indicates the flow should be restructured, not displayed as a stepper.
- Checkout and booking confirmation flows where trust and perceived progress directly affect conversion.
- Order tracking where the user needs to see which phases are complete and which are in progress.
- Onboarding flows where each step unlocks access to a feature and partial completion must be recoverable.
- Refund and return flows where each stage (reason, confirmation, processing) has a distinct user action.

---

## 3. When Not to Use

- **Parallel page navigation** — Use Pagination. Steppers are for sequential journeys, not data result pages.
- **Non-linear navigation** — If the user can complete steps in any order, do not use a Stepper. Use a checklist or task board instead.
- **Fewer than two steps** — A single step is not a journey. A two-step confirmation may be a dialog, not a stepper.
- **More than six steps** — Restructure the journey into fewer, broader stages. A stepper with seven or more steps overwhelms rather than guides.
- **Optional and skippable flows** — If steps are optional and have no ordered dependency, a stepper implies a false sense of requirement. Use a progress checklist instead.
- **In-page section anchors** — Use a table of contents or scroll-spy navigation. Steppers imply page-level transitions, not within-page scrolling.
- **Filtering and search refinement** — Use Filters and Search patterns. Filtering is not a sequential journey.
- **Tabs** — Tabs represent sibling views. Steppers represent ordered stages. Do not use one as a substitute for the other.

---

## 4. Composition

| Element | Atom | Role |
|---|---|---|
| Step indicator | `Atom/Icon` | The visual marker for each step. Displays a step number (default and active states), a check icon (completed state), a warning icon (error state). Non-interactive in default and completed states; may be interactive for returning to a completed step. |
| Step label | `Atom/Label` | The text name of the step. Displayed below the indicator in the horizontal variant and to the inline-end of the indicator in the vertical variant. Active step uses stronger weight; completed and disabled steps use lower-contrast color tokens. |
| Step sub-label | `Atom/Label` | Optional. A short description or sub-status beneath the step label. Used to surface in-progress details, confirmation summaries, or error messages at the step level. Uses `text.body.sm` and `color.text.secondary`. |
| Status tag | `Atom/Tag` | Optional. Placed inline with the step label to flag special conditions — "Optional", "Skipped", "Action required". Used sparingly; maximum one tag per step. |
| Connector | — | A thin line drawn between adjacent step indicators. Not an atom — rendered as a structural element by the Stepper itself. Color and weight change based on the completion state of the step it follows. |
| Back button | `Atom/Button` | Navigates to the previous step. Uses the secondary or ghost button variant. Labeled "Back". Absent on the first step. |
| Continue button | `Atom/Button` | Advances to the next step. Uses the primary button variant. Labeled "Continue" on intermediate steps and "Confirm" or the specific action label on the final step. |
| Progress label | `Atom/Label` | Compact variant only. Displays "Step N of M" between the back and continue buttons. Not used in the horizontal or vertical variants — the step rail communicates position directly. |

---

## 5. Tokens Used

| Decision | Token | Role |
|---|---|---|
| **Step indicator — default (upcoming)** | | |
| Indicator background | `color.background.subtle` | Neutral fill for steps the user has not yet reached. |
| Indicator border | `color.border.default` | Outline defining the indicator boundary in the default state. |
| Indicator number / icon color | `color.text.subtle` | De-emphasised numeral or icon for upcoming steps. |
| **Step indicator — active (current)** | | |
| Indicator background | `color.background.primary` | Brand-dark teal fill signals the user's current position. |
| Indicator border | none | No border needed when the background provides sufficient contrast. |
| Indicator number / icon color | `color.text.inverse` | White numeral on the dark primary background. |
| **Step indicator — completed** | | |
| Indicator background | `color.background.primary` | Same brand-dark teal as active — communicates a positive, authoritative state. |
| Indicator icon (check) | `color.text.inverse` | White check icon on the dark primary background. |
| **Step indicator — error** | | |
| Indicator background | `color.background.danger` | Status-danger fill flags that this step requires attention. |
| Indicator border | `color.border.danger` | Danger-colored outline reinforces the error state boundary. |
| Indicator icon (warning) | `color.text.danger` | Danger-colored warning icon. |
| **Step indicator — disabled** | | |
| Indicator background | `color.background.disabled` | Muted fill signals the step is not yet accessible. |
| Indicator border | `color.border.disabled` | Muted border on disabled indicators. |
| Indicator number / icon color | `color.text.disabled` | De-emphasised numeral for locked steps. |
| **Step label** | | |
| Label — active | `color.text.primary` | Maximum-contrast label for the current step. |
| Label — active weight | `font.weight.semibold` | Strong weight distinguishes the active label from surrounding steps. |
| Label — default (upcoming) | `color.text.secondary` | Reduced-contrast label for steps not yet reached. |
| Label — completed | `color.text.primary` | Full-contrast label — completed steps are legible reference points. |
| Label — error | `color.text.danger` | Danger-colored label communicates that this step needs action. |
| Label — disabled | `color.text.disabled` | Fully muted label for locked steps. |
| Sub-label text | `color.text.secondary` | Supporting metadata, in-progress summaries, or error messages at step level. |
| **Connector line** | | |
| Connector — completed segment | `color.background.primary` | Brand-dark teal fill on the connector following a completed step. |
| Connector — upcoming segment | `color.border.subtle` | Low-emphasis fill on connectors between steps not yet reached. |
| Connector — active-to-next segment | `color.border.subtle` | The connector ahead of the active step uses the upcoming style. |
| **Container** | | |
| Container background | `color.background.surface` | Card or panel surface behind the step rail. |
| Container border | `color.border.subtle` | Low-emphasis boundary around the stepper surface where needed. |
| Container radius | `radius.lg` | Consistent with panel and card rounding. |
| **Spacing** | | |
| Indicator-to-label gap | `spacing.xs` | Tight gap between the indicator and its label. |
| Step-to-step gap (horizontal) | `spacing.lg` | Separation between complete step units in the horizontal layout. |
| Step-to-step gap (vertical) | `spacing.md` | Separation between complete step units in the vertical layout. |
| Container padding block | `spacing.md` | Top and bottom padding inside the stepper container. |
| Container padding inline | `spacing.md` | Left and right padding inside the stepper container. |
| Action button gap | `spacing.sm` | Gap between the Back and Continue buttons in the action row. |
| **Focus and motion** | | |
| Focus ring | `color.border.focus` | Visible focus ring on all interactive step indicators and action buttons. |
| State transition | `motion.fast` | Indicator background, label color, and connector color transitions on step state changes. |
| Step advance transition | `motion.layout` | Animation applied to the connector fill as the step advances. |

---

## 6. Variants

### Horizontal

The default variant. Step indicators are arranged in a single row with connector lines drawn between them. Step labels appear directly below each indicator. The action buttons sit below the step rail as a fixed row.

Used for checkout, booking confirmation, and onboarding flows where the screen is wide enough to accommodate all steps in a single row without truncation.

| Property | Specification |
|---|---|
| Step rail direction | Inline (left-to-right in LTR; right-to-left in RTL). |
| Connector orientation | Horizontal line between adjacent step indicators. |
| Step indicator size | 32 × 32px. |
| Label position | Below the indicator, centered on the indicator's inline-center axis. |
| Label truncation | Labels do not truncate. If a label is long, it wraps to a second line below the indicator. |
| Maximum steps | Six. Beyond six, the variant breaks down — restructure the flow. |
| Action row | Placed below the step rail with the Back button at inline-start and Continue at inline-end. |
| Mobile behavior | At narrow viewports, collapses to the Compact Mobile variant automatically. The horizontal variant is not used below 480px. |

---

### Vertical

Step indicators are stacked in a column with connector lines drawn vertically between them. Step labels and optional sub-labels appear to the inline-end of each indicator.

Used for long-form data entry, refund and return flows, and order tracking timelines where each step may surface detailed sub-information. The vertical layout accommodates sub-labels and status tags more comfortably than the horizontal variant.

| Property | Specification |
|---|---|
| Step rail direction | Block (top-to-bottom). |
| Connector orientation | Vertical line between adjacent step indicators, aligned on the indicator's block-center axis. |
| Step indicator size | 32 × 32px. |
| Label position | To the inline-end of the indicator. Vertically centered on the indicator. |
| Sub-label position | Below the primary label, indented to align with the label's inline-start. |
| Status tag position | Inline with the primary label, to the inline-end of the label text. |
| Action row | Placed below the final step in the rail. Back at inline-start, Continue at inline-end. |
| Mobile behavior | The vertical variant is used on all viewport widths. It does not collapse. |

---

### Compact Mobile

A space-efficient variant for narrow viewports. The full step rail is replaced by a single-line progress label ("Step 2 of 4") and a thin progress bar. The step names for previous and next steps may appear as supplementary context above and below the label.

Used on mobile checkout and booking flows where the horizontal variant would compress step indicators to illegibility, and the vertical variant would consume too much vertical space above the main form content.

| Property | Specification |
|---|---|
| Step rail | Not shown. Replaced by a progress label and progress bar. |
| Progress label | `Atom/Label` reading "Step N of M". N uses `color.text.primary` and `font.weight.semibold`. "of M" uses `color.text.secondary`. |
| Progress bar | Full-width bar. Fill width proportional to `(currentStep / totalSteps) * 100%`. Fill color: `color.background.primary`. Track color: `color.background.subtle`. Height: 4px. Radius: `radius.full`. |
| Step name | The active step name displayed below the progress label using `text.body.md` and `color.text.primary`. |
| Action row | Back at inline-start, Continue at inline-end. Both full-width on screens narrower than 360px. |
| Breakpoint | Used automatically when the viewport is narrower than 480px. Do not instantiate manually on wide layouts. |

---

## 7. States

States apply to individual steps within the stepper, not to the stepper container as a whole.

| State | Applies to | Visual appearance | Token assignments |
|---|---|---|---|
| Default | Steps not yet reached | Neutral indicator with step number. Muted label. Connector ahead is unlit. | Indicator bg: `color.background.subtle` · Border: `color.border.default` · Number: `color.text.subtle` · Label: `color.text.secondary` |
| Active | The step the user is currently on | Brand-dark indicator with step number. Full-contrast bold label. Connector behind is lit; connector ahead is unlit. | Indicator bg: `color.background.primary` · Number: `color.text.inverse` · Label: `color.text.primary` · Weight: `font.weight.semibold` |
| Completed | Steps the user has passed successfully | Brand-dark indicator with a check icon replacing the number. Full-contrast label. Connector behind and leading connector are both lit. | Indicator bg: `color.background.primary` · Icon: `color.text.inverse` · Label: `color.text.primary` |
| Error | A step the user has reached but could not complete successfully | Danger-fill indicator with a warning icon. Danger-colored label. The connector behind the error step is lit (steps before it were completed); the connector ahead is unlit. | Indicator bg: `color.background.danger` · Border: `color.border.danger` · Icon: `color.text.danger` · Label: `color.text.danger` |
| Disabled | Steps that are locked and cannot yet be accessed | Muted indicator with step number. Fully de-emphasised label. Not interactive. | Indicator bg: `color.background.disabled` · Border: `color.border.disabled` · Number: `color.text.disabled` · Label: `color.text.disabled` |

### State transition rules

- A step transitions from Default → Active when the user advances from the preceding step.
- A step transitions from Active → Completed when the user successfully submits the current step and advances.
- A step transitions from Active → Error when step validation fails on submission attempt.
- A step transitions from Error → Active when the user corrects the error condition and re-engages the step.
- A Disabled step may not transition to Active unless all preceding steps are Completed.
- A Completed step may transition back to Active if the user returns to edit it (when the flow allows backward navigation).

---

## 8. Behavior

### Forward navigation

The user completes the requirements of the current (Active) step and activates the Continue button. The system validates the step's content. If validation passes, the current step transitions to Completed, the next step transitions to Active, and the connector between them fills with `color.background.primary`. The transition uses `motion.layout`. If validation fails, the current step transitions to Error and validation messages appear inline within the step's form content.

### Backward navigation

The user activates the Back button. The current Active step reverts to Default (not Completed — the user has abandoned that step's input). The preceding Completed step transitions back to Active. Connectors update to reflect the new active position.

If backward navigation is allowed by directly clicking a Completed step indicator, the same behavior applies: the clicked step becomes Active and all steps after it revert from Completed to Default.

### Step indicator interactivity

- **Completed steps:** Step indicators for completed steps are interactive. Clicking or activating them returns the user to that step. This allows correction without starting over.
- **Active step:** The indicator for the current step is not interactive — the user is already there.
- **Default (upcoming) steps:** Not interactive. Users cannot skip forward.
- **Disabled steps:** Not interactive. They carry `tabindex="-1"` and `aria-disabled="true"`.

### Error recovery

When a step is in the Error state, the Continue button remains active and re-triggers validation on each attempt. The Back button is available — users may abandon the current step and return to a previous step. Error states are cleared when the user corrects the triggering condition, not on blur or keystroke — only on the next submission attempt.

### Progress persistence

If the user leaves a flow mid-journey (browser refresh, navigation away, session timeout), the system restores the step state from the last successfully completed step. The user re-enters at the Active step, not at step one. Completed steps remain Completed. This behavior is a product and API concern; the Stepper pattern renders whatever state it receives.

### Compact Mobile progress bar

The progress bar fill width updates immediately when the step changes — no intermediate animation. The step label updates in place. The Back and Continue buttons remain in fixed positions throughout the flow.

---

## 9. RTL / LTR Support

| Property | LTR | RTL |
|---|---|---|
| Horizontal step rail direction | Left to right: Step 1 — Step 2 — Step 3 | Right to left: Step 3 — Step 2 — Step 1 |
| Vertical step rail direction | Top to bottom in both directions. Block axis is unaffected by reading direction. | Top to bottom. Same as LTR. |
| Connector fill direction | Fills from inline-start to inline-end as steps are completed. | Fills from inline-end to inline-start as steps are completed. |
| Back button position | Inline-start (left). | Inline-end (right). |
| Continue button position | Inline-end (right). | Inline-start (left). |
| Step label alignment | Centered below indicator (horizontal) or at inline-end of indicator (vertical). | Same anchoring in the opposite reading direction. |
| Back arrow icon | Points to inline-start (← in LTR). Uses `icon--flip-rtl` class — flips to → in RTL. | Points to inline-start of the RTL layout (→). |
| Check icon (completed) | Not directional. Does not flip. | Not directional. Does not flip. |
| Warning icon (error) | Not directional. Does not flip. | Not directional. Does not flip. |
| Progress label (Compact) | "Step 2 of 4" — LTR reading order. | "خطوة ٢ من ٤" — RTL reading order. |
| Progress bar fill | Fills from inline-start. | Fills from inline-end. |
| CSS direction | All layout uses logical properties: `padding-inline`, `margin-inline`, `inset-inline-start`, `gap`. No `left` or `right` properties. | Resolved automatically from `dir` attribute. |

**Rule:** Never hardcode left/right directional logic in the Stepper. All positional decisions use CSS logical properties. The `dir` attribute on the `<html>` element resolves all directionality automatically.

---

## 10. Arabic / English Support

| Property | English (LTR) | Arabic (RTL) |
|---|---|---|
| Progress label (Compact) | "Step 2 of 4" | "خطوة ٢ من ٤" |
| Back button label | "Back" | "رجوع" |
| Continue button label | "Continue" | "متابعة" |
| Confirm button label (final step) | "Confirm booking" | "تأكيد الحجز" |
| Step 1 name (checkout example) | "Your details" | "بياناتك" |
| Step 2 name (checkout example) | "Payment" | "الدفع" |
| Step 3 name (checkout example) | "Confirmation" | "التأكيد" |
| Completed step accessible name | "Step 1: Your details, completed" | "خطوة ١: بياناتك، مكتملة" |
| Error step accessible name | "Step 2: Payment, error. Action required." | "خطوة ٢: الدفع، خطأ. مطلوب إجراء." |
| Numeral style | Western Arabic numerals (1, 2, 3) | Eastern Arabic-Indic numerals (١، ٢، ٣) or Western depending on locale setting |
| Font family (step labels) | `typography.family` → IBM Plex Sans | `typography.family` → Cairo |
| Font family (buttons) | `typography.family` → IBM Plex Sans | `typography.family` → Cairo |
| Label length consideration | English step labels are typically shorter. | Arabic step labels may be longer. Step indicators are fixed-size; labels wrap — they do not truncate. |

**Rule:** Step labels must never truncate in either language. If an Arabic label requires two lines below the indicator (horizontal variant) or beside it (vertical variant), the layout accommodates the wrapping. The indicator position does not shift.

---

## 11. Accessibility

| Requirement | Rule |
|---|---|
| Navigation landmark | The Stepper must be wrapped in a `<nav>` element with `aria-label="Booking progress"` in English or `aria-label="تقدم الحجز"` in Arabic. The label should reflect the specific journey name in context — "Checkout progress", "Refund progress", etc. |
| Active step | The indicator for the current step carries `aria-current="step"`. Screen readers announce this step as the current position in the sequence without relying on visual styling. |
| Step accessible name | Every step indicator carries an `aria-label` that communicates step number, step name, and state: `aria-label="Step 2: Payment, active"`. Do not rely on the visible number or icon alone. |
| Completed step | `aria-label="Step 1: Your details, completed"`. The word "completed" is essential — a sighted user reads the check icon; a screen reader user reads the label. |
| Error step | `aria-label="Step 2: Payment, error. Action required."`. The error condition and the call to action are both named. |
| Disabled step | `aria-disabled="true"` and `tabindex="-1"`. Disabled steps are announced as not available. Do not use the native `disabled` attribute on interactive elements — it removes them from the accessibility tree. |
| Keyboard navigation | Tab moves focus through all interactive step indicators and action buttons. Enter or Space activates a focused interactive indicator (completed steps only). Back and Continue buttons are standard buttons in the Tab order. Arrow keys do not navigate between steps. |
| Focus visibility | All interactive step indicators and action buttons display a visible focus ring using `color.border.focus`. `outline: none` without a CSS replacement is not permitted. |
| Progress announcement | When the step advances, a visually hidden `aria-live="polite"` region outside the Stepper announces "Step [N] of [M]: [step name]" so screen reader users are informed of the position change without re-reading the full rail. |
| Compact progress bar | The `<progress>` element or a `role="progressbar"` element must carry `aria-valuenow`, `aria-valuemin="1"`, and `aria-valuemax` equal to the total step count. The accessible name must describe the flow: `aria-label="Checkout progress"`. |
| Error announcement | When a step transitions to the Error state, the `aria-live="assertive"` region announces the error condition immediately. The step indicator label update is supplementary — the live region is the primary announcement mechanism. |
| Action button labels | The final-step Continue button uses a specific label that names the action: "Confirm booking", not a generic "Submit". This ensures screen reader users understand the weight of the action before activating it. |
| WCAG criteria | SC 1.3.1 (Info and Relationships), SC 1.4.1 (Use of Color — step states must not rely on color alone; icon and label changes are required), SC 2.1.1 (Keyboard), SC 2.4.3 (Focus Order), SC 2.4.7 (Focus Visible), SC 4.1.2 (Name, Role, Value), SC 4.1.3 (Status Messages). |
| Contrast | Active indicator: `color.background.primary` + `color.text.inverse` ≥ 13:1. Error indicator: `color.background.danger` + `color.text.danger` verified WCAG 2.1 AA. Completed and default indicators verified against their respective token combinations. |

---

## 12. Component Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `variant` | Enum: `Horizontal` · `Vertical` · `Compact` | `Horizontal` | Controls the layout of the step rail. `Compact` is used automatically on narrow viewports; it may also be set explicitly for space-constrained non-mobile surfaces. |
| `totalSteps` | Number | `3` | The total number of steps in the flow. Determines the step count label, the connector count, and the `aria-valuemax` on the compact progress bar. Minimum 2, maximum 6. |
| `currentStep` | Number | `1` | The index of the currently active step (1-based). Controls which step indicator receives the Active state and which steps receive the Completed state. |
| `stepStates` | Array of Enum: `default` · `active` · `completed` · `error` · `disabled` | Derived from `currentStep` | Optional override. When provided, each array entry explicitly sets the state of the corresponding step. Useful when step states are not strictly sequential — for example, an Error state on a previously completed step. |
| `stepLabels` | Array of String | `[]` | The label for each step. Required. Length must equal `totalSteps`. Labels are never truncated. |
| `stepSubLabels` | Array of String | `[]` | Optional sub-label for each step (vertical variant and compact variant only). Used for in-progress summaries or completion confirmations. |
| `allowBackNavigation` | Boolean | `true` | When true, completed step indicators are interactive — clicking returns the user to that step. When false, the step rail is read-only and only the action buttons provide navigation. |
| `showStepNumbers` | Boolean | `true` | When true, step numbers appear inside the indicator for default and active states. When false, only the icon (check or warning) is shown; default and active states show no numeral. |
| `backLabel` | String | `"Back"` | Label for the Back button. Override for context-specific labels: "Previous step", "رجوع". |
| `continueLabel` | String | `"Continue"` | Label for the Continue button on non-final steps. |
| `confirmLabel` | String | `"Confirm"` | Label for the action button on the final step. Must be a specific action label: "Confirm booking", "Submit refund". Not "Submit". |

---

## 13. Content Guidelines

**Step labels**

- Step labels are short, noun-phrase names for each stage: "Your details", "Payment", "Confirmation".
- Do not use verb phrases as step labels: "Enter your details", "Choose payment method". The step label names the stage; the content within the step instructs the action.
- Maximum recommended length: three words in English, four in Arabic. Longer labels are permitted if the content genuinely requires them, but layout integrity must be verified.
- Capitalize only the first word of each label. Do not use all-caps.
- In Arabic: "بياناتك"، "الدفع"، "التأكيد" — noun-phrase form, short, unambiguous.

**Sub-labels (vertical and compact variants)**

- Sub-labels provide contextual detail beneath a step label: a completion summary ("Emirates · RUH→DXB"), a status note ("Processing — up to 5 business days"), or an error nudge ("Invalid card number").
- Sub-labels are supplementary. If the step label alone is clear, omit the sub-label.
- Do not repeat the step label in the sub-label.
- Keep sub-labels to one line where possible. Two lines maximum.

**Continue and Back button labels**

- Use "Back" — not "Previous", "Go back", or "←".
- Use "Continue" on intermediate steps — not "Next", "Proceed", or "Go".
- Use a specific action label on the final step — not "Submit". Correct labels: "Confirm booking", "Complete payment", "Submit refund request", "تأكيد الحجز", "إتمام الدفع".
- The final-step button label must name the outcome. Users booking travel with real money must know exactly what they are confirming before they activate the button.

**Status tags**

- Use the Tag atom sparingly. One tag per step, maximum.
- Permitted tag content: "Optional", "Skipped", "Action required".
- Do not use tags for step numbers or completion states — those are communicated by the indicator icon and state, not a tag.
- Tags inherit the Tag atom's size, color, and radius tokens. Do not create custom tag styles for the Stepper.

**Error messages**

- Error messages at the step level (sub-label) must name the problem specifically and suggest a fix: "Card declined — try a different card", not "Payment error".
- Inline validation errors within a step's form content follow the Input and Form pattern rules. The Stepper's error state at the step indicator level signals that the step as a whole cannot be completed — it does not replace field-level validation.

**Step count guidance**

- Two steps: appropriate for simple confirmation flows. Example: "Review" → "Confirm".
- Three steps: the most common checkout structure. Example: "Your details" → "Payment" → "Confirmation".
- Four steps: appropriate for extended data entry. Example: "Traveler info" → "Extras" → "Payment" → "Confirmation".
- Five or six steps: use only when the additional stages are genuinely distinct and cannot be consolidated. Each additional step increases the perceived complexity of the journey.
- Never exceed six steps. If the flow requires more than six distinct phases, split it into sub-flows or restructure the stages.

---

## 14. Cross References

- [button.md](../atoms/button.md) — Back and Continue buttons are primary atoms in the Stepper action row; the final-step action uses the primary variant with a specific booking-action label
- [icon.md](../atoms/icon.md) — Check icon (completed state), warning icon (error state), and back-arrow icon (Back button); directional icons use `icon--flip-rtl` in RTL layouts
- [label.md](../atoms/label.md) — Step labels, sub-labels, and the "Step N of M" progress label in the Compact variant
- [tag.md](../atoms/tag.md) — Optional status tags (e.g., "Optional", "Action required") placed inline with step labels in the vertical variant
- [input.md](../atoms/input.md) — Stepper steps commonly contain form inputs; input validation states and inline error messages follow the Input atom spec, not the Stepper's error state rules
- [pagination.md](./pagination.md) — The complementary navigation pattern for parallel page data; Pagination and Stepper must not be substituted for one another
- [dialog.md](./dialog.md) — Confirmation dialogs may appear at the final Stepper step to surface a summary before the user commits; the dialog spec governs its own composition and accessibility
- [notifications.md](./notifications.md) — Toast or inline notifications that appear on step submission errors or completion confirmations follow the Notifications pattern
- [token-reference.md](../tokens/token-reference.md) — Full definitions for all color, spacing, radius, motion, and typography tokens used in this pattern
- [typography.md](../foundations/typography.md) — Font family (`IBM Plex Sans` in English, `Cairo` in Arabic), size, and weight primitives that underpin the typographic tokens used in step labels and action buttons
