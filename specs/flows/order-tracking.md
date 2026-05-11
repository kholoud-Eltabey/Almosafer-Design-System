---
name: Order Tracking
tier: pattern
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Order Tracking

---

## 1. Overview

Booking tracking communicates the current status and progress of a placed booking. It gives the user transparency at every stage — from initial processing through to completion or cancellation — without requiring them to contact support to understand the status of their booking.

The pattern is built around a timeline indicator: a vertical sequence of steps where each step has a state (completed, active, pending), a label, and an optional timestamp. The timeline is a structural composition styled with tokens; it is not a separate atom. Surrounding it are a status header that names the current state, a booking detail section, and optional actions.

Booking tracking does not collect input and does not alter the booking. It is a read surface. Every interactive element on the screen is either a navigation action or a recovery action.

---

## 2. When to Use

- After booking confirmation, when the user wants to follow the status of a placed booking.
- On a booking history page where multiple past or active bookings are listed and each links to its tracking view.
- When the platform integrates with a reservation or airline system that provides status events over time.
- When the user has been directed to booking tracking from a notification, confirmation email, or support interaction.

---

## 3. When Not to Use

- **Before booking confirmation** — Do not render this pattern for an unconfirmed or in-progress checkout. Use the checkout flow and booking confirmation patterns instead.
- **For instant-fulfil products** — If the product is fulfilled immediately upon booking (e.g., voucher code), booking tracking is unnecessary. Show a confirmation with the relevant details directly.
- **As a substitute for support** — If the booking has genuinely failed, direct the user to support rather than showing a permanently stalled tracking view. An error state with a clear escalation path is required.
- **For real-time flight map views** — If the variant requires a live flight map, that surface is outside this pattern's scope and requires a dedicated integration layer.

---

## 4. Composition

| Atom / Pattern | Role |
|---|---|
| Badge | Displays the current booking status as a labelled status chip in the header (e.g., "Confirmed", "Completed", "Cancelled"). Colour variant matches the semantic state. |
| Icon | Used in three roles: (1) step node icon within the timeline — checkmark for completed steps, dot for the active step, empty circle for pending steps; (2) leading icon in the status header to reinforce the current state visually; (3) leading icon on action Buttons and Links. |
| Button (primary) | Main contextual action — "Contact support" in error or cancelled states; "Book again" on the completed state. One primary Button is present at a time. |
| Button (secondary) | Supporting navigation action — "View booking details" or "Back to bookings". Lower visual weight than the primary Button. |
| Link | Inline references within the detail section — booking confirmation page, support chat, or refund policy. Used for navigational destinations only, not for state-changing actions. |
| Spinner | Shown during the loading state while the system fetches the current booking status. Centred within the tracking card. |
| Tooltip | Attached to timeline step nodes to surface the full timestamp on hover or focus when the timestamp is truncated in the compact layout. |

**Timeline indicator**

The timeline is a structural element composed entirely with tokens. It is not an existing atom. It consists of:

- A vertical connector line running through all steps, styled with `color.border.subtle`.
- Per-step nodes: circular markers styled with background and border tokens that change by step state.
- Per-step labels: the step name and an optional timestamp below it.

The timeline is not interactive. Steps are not clickable. Navigation to step-level detail is handled by the Button or Link in the action area.

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Page background | `color.background.sunken` | Recessed canvas behind the tracking card. |
| Tracking card background | `color.background.surface` | Surface of the main tracking card. |
| Tracking card border | `color.border.subtle` | Low-emphasis edge separating the card from the page canvas. |
| Tracking card radius | `radius.xl` | Corner rounding on the tracking card. |
| Tracking card padding | `spacing.layout.sm` | Internal padding on all sides of the tracking card. |
| Status header background | `color.background.subtle` | Slightly elevated surface for the status header row. |
| Status header radius | `radius.lg` | Corner rounding on the status header block. |
| Status header padding | `spacing.md` | Internal padding within the status header. |
| Status headline text | `color.text.primary` | The current status name displayed as the leading heading. |
| Status subtext | `color.text.secondary` | Supporting detail below the status headline — estimated date, last update timestamp. |
| Timeline connector line | `color.border.subtle` | Vertical line connecting all timeline step nodes. |
| Timeline connector line — completed segment | `color.border.selected` | Segment of the connector line between completed steps, indicating progression. |
| Step node background — completed | `color.background.selected` | Filled background of a completed step node. |
| Step node background — active | `color.background.primary` | Filled background of the current active step node. |
| Step node background — pending | `color.background.surface` | Empty background of a future pending step node. |
| Step node border — completed | `color.border.selected` | Border of a completed step node. |
| Step node border — active | `color.border.selected` | Border of the active step node. |
| Step node border — pending | `color.border.default` | Border of a pending step node. |
| Step node icon — completed | `color.text.inverse` | Checkmark icon color inside a completed step node. |
| Step node icon — active | `color.text.inverse` | Dot or active indicator color inside the active step node. |
| Step label text — completed | `color.text.secondary` | Step name for completed steps — reduced emphasis. |
| Step label text — active | `color.text.primary` | Step name for the current active step — full emphasis. |
| Step label text — pending | `color.text.subtle` | Step name for pending steps — lowest emphasis. |
| Step timestamp text | `color.text.subtle` | Timestamp below each completed step label. |
| Booking detail section label | `color.text.subtle` | Labels for detail rows (e.g., "Booking reference", "Destination", "Traveler"). |
| Booking detail section value | `color.text.primary` | Values for each detail row. |
| Divider | `color.border.subtle` | Horizontal rule separating the timeline from the detail section, and the detail section from the action area. |
| Gap between status header and timeline | `spacing.lg` | Vertical space between the status header block and the first timeline step. |
| Gap between timeline steps | `spacing.md` | Vertical space between each step row in the timeline. |
| Gap between timeline and detail section | `spacing.lg` | Vertical space below the timeline before the booking detail rows. |
| Gap between detail rows | `spacing.sm` | Vertical space between individual detail rows. |
| Gap between action buttons | `spacing.sm` | Vertical space between stacked action Buttons. |
| Tracking card enter transition | `motion.enter` | Card appearing after the loading state resolves. |
| Loading-to-content transition | `motion.fast` | Spinner-to-card crossfade on load completion. |
| Status update transition | `motion.normal` | Step node state change animation when a new status event arrives. |

---

## 6. Variants

| Variant | Description | Default |
|---|---|---|
| Booking status tracking | Tracks a booking from placement through to completion. Steps: Booking placed → Payment confirmed → Processing → Active → Completed. Includes key dates (check-in, departure) in the status header. | Yes |
| Flight tracking | Tracks the status of a flight booking including airline confirmation. Steps: Booking placed → Confirmed → Check-in open → Departed → Arrived. Includes airline reference and flight number in the detail section. A Link to the airline's own check-in page is provided where available. | No |
| Booking history view | A compact read-only view of a completed or cancelled booking, accessible from the booking history list. Shows the full timeline in its terminal state (all steps completed or terminated at the cancellation point), the final status Badge, and a "Book again" primary action for completed bookings. No real-time update behavior. | No |

---

## 7. Behavior

### Updates over time

In the booking status tracking and flight tracking variants, the pattern polls or receives push updates from the reservation or airline system at a defined interval. When a new status event arrives, the relevant timeline step node transitions from pending to active or from active to completed using `motion.normal`. The status header Badge and headline update to reflect the new state. The user is not required to refresh the page.

### Reflects real-time status

The status header always displays the most recent confirmed status. The timestamp in the status subtext shows when the current status was last updated ("Updated 3 minutes ago" or an absolute timestamp). If the connection to the reservation or airline system is interrupted, the pattern shows the last known status with a warning note and a "Retry" action rather than clearing the display.

### Allows navigation to details

The "View booking details" Button navigates to the full booking detail page (or the booking confirmation view for recent bookings). The "Back to bookings" Button navigates to the booking history list. These are the only navigation paths originating from this pattern. The timeline itself does not navigate.

### Cancelled state behavior

When a booking is cancelled, the timeline terminates at the step where the cancellation occurred. Subsequent steps are removed rather than shown as pending. A cancellation reason is shown in the status subtext where the system provides one. The primary action becomes "Book again" if the same trip or route is available, or "Contact support" if it is not.

### Error state behavior

When the system cannot retrieve the booking status, the tracking card content is replaced by an inline error message with a "Try again" Button. The error message does not assert what happened to the booking — only that the status could not be loaded. The last known booking reference remains visible in the card header so the user can contact support with the correct reference.

---

## 8. States

| State | Visual change | Token change |
|---|---|---|
| Loading | Spinner centred in the card. No timeline or detail content visible. | Spinner: `color.text.secondary`. Card: `color.background.surface`. |
| Processing | First step node is active. All subsequent steps are pending. Status Badge: neutral. | Active node: `color.background.primary`. Pending nodes: `color.background.surface` with `color.border.default`. |
| In progress | One or more steps completed. Current step node is active. Remaining steps pending. Completed connector segments use `color.border.selected`. | Completed nodes: `color.background.selected`. Active node: `color.background.primary`. |
| Completed | All step nodes completed. Connector line fully uses `color.border.selected`. Status Badge: success variant. Primary action: "Book again". | All nodes: `color.background.selected`. Badge: success token set. |
| Cancelled | Timeline terminates at the cancellation step. Subsequent steps absent. Status Badge: danger variant. Cancellation reason in subtext. | Cancelled step node border: `color.border.danger`. Badge: danger token set. Subtext: `color.text.danger`. |
| Error | Timeline and detail content replaced by inline error message and "Try again" Button. Booking reference remains in card header. | Error message text: `color.text.danger`. |

---

## 9. Accessibility

**ARIA role and landmark**

The tracking card must be within the `<main>` landmark. The page `<title>` must include the current booking status (e.g., "Booking #12345 — In progress — Almosafer") and must update when the status changes.

**Status announcement**

When the booking status updates in real time, the new status must be announced to screen readers without requiring navigation. Apply `aria-live="polite"` to the status header region. Status updates triggered by polling or push events must update the live region content so the announcement fires automatically.

**Timeline accessibility**

The timeline must be rendered as a list element (`<ol>`) so screen readers announce the total number of steps and the user's position. Each step is a list item (`<li>`) with a clear label that includes both the step name and its state.

| Attribute | Applied to | Purpose |
|---|---|---|
| `aria-current="step"` | Active timeline step | Identifies the current step to assistive technologies. |
| `aria-label` | Each step node Icon | Describes the step state: `aria-label="Completed"`, `aria-label="Current step"`, `aria-label="Pending"`. |
| `aria-live="polite"` | Status header region | Announces status changes when real-time updates arrive. |
| `aria-busy="true"` | Tracking card | Set during the loading state. Removed when content renders. |
| `aria-label` | Tracking card container | Provides context: `aria-label="Booking tracking for booking #12345"`. |

**Keyboard navigation**

- All interactive elements (Buttons, Links, Tooltips) are reachable by Tab in document order.
- The timeline itself is not interactive and does not receive focus.
- Tooltip content on step nodes is accessible via keyboard focus on the node's associated element.
- No focus trapping. The user can Tab freely through the full page.

**Readable timeline**

Each timeline step must expose its full label and timestamp to screen readers regardless of visual truncation. Use `aria-label` or visually hidden text on truncated timestamps so the full date and time are available without the Tooltip.

**Color contrast**

All text must meet WCAG 2.1 AA: minimum 4.5:1 for body text, minimum 3:1 for large text and UI component boundaries. Step node state must not be communicated by color alone — the Icon inside the node (checkmark, dot, empty) provides a shape-based signal alongside the color change.

---

## 10. Content Guidelines

**Status names**

- Use plain, user-facing language for every status. Name the step from the user's perspective, not the system's.
- Preferred step labels: "Booking placed", "Confirmed", "Processing", "Active", "Completed".
- Do not use internal reservation terminology: "TICKETED", "SEAT_ASSIGNED", "PNR_ISSUED".
- Cancelled step label: "Booking cancelled". Do not use "Terminated" or "Voided".

**Status header subtext**

- For in-progress bookings: "Check-in: [date]" or "Departure: [date and time]."
- For completed bookings: "Completed on [date] at [time]."
- For cancelled bookings: include the reason if the system provides one and it is user-intelligible. Example: "Cancelled — booking cancelled per your request." If the reason is not user-intelligible, omit it and offer a "Contact support" link instead.
- For the error state: "Status unavailable. Last updated: [timestamp]."

**Timestamps**

- Use absolute dates for completed steps: "12 Apr, 09:42".
- Do not use relative timestamps ("3 hours ago") for completed steps — they become ambiguous as time passes.
- Use relative time only for the most recent update in the status subtext, where freshness matters: "Updated 5 minutes ago."

**Airline and booking reference**

- In the flight tracking variant, name the airline plainly: "Operated by [Airline name]."
- Display the airline reference as a labeled value: "Airline reference: [ID]."
- If an airline check-in Link is available, label it "Check in with [Airline name]" — not "Click here" or "External link."

**Actions**

- Primary action labels must name the destination or outcome: "Book again", "Contact support" — not "OK" or "Proceed."
- "Book again" must only appear when the same trip or route is available. If availability is unknown, use "Contact support."
- Do not show both "Book again" and "Contact support" as co-equal primary actions. Choose one based on state.

---

## 11. Code Example

```jsx
{isLoading && (
  <div aria-busy="true" aria-label="Loading booking status">
    <Spinner />
  </div>
)}

{isLoaded && (
  <main>
    <div
      aria-label={`Booking tracking for booking #${order.id}`}
    >
      <header>
        <Icon name={statusIconMap[order.status]} aria-hidden="true" />
        <div aria-live="polite">
          <h1>{order.statusLabel}</h1>
          <p>{order.statusSubtext}</p>
        </div>
        <Badge variant={statusBadgeVariantMap[order.status]}>
          {order.statusLabel}
        </Badge>
      </header>

      <ol aria-label="Booking progress">
        {order.steps.map((step) => (
          <li
            key={step.id}
            aria-current={step.state === 'active' ? 'step' : undefined}
          >
            <Icon
              name={stepIconMap[step.state]}
              aria-label={stepAriaLabelMap[step.state]}
            />
            <span>{step.label}</span>
            {step.timestamp && (
              <time dateTime={step.isoTimestamp}>{step.formattedTimestamp}</time>
            )}
          </li>
        ))}
      </ol>

      <section aria-label="Booking details">
        <dl>
          <dt>Booking reference</dt>
          <dd>{order.id}</dd>
          <dt>Destination</dt>
          <dd>{order.destinationCity}</dd>
          {order.airline && (
            <>
              <dt>Airline</dt>
              <dd>
                {order.airline}
                {order.airlineUrl && (
                  <Link href={order.airlineUrl}>
                    Check in with {order.airline}
                  </Link>
                )}
              </dd>
            </>
          )}
        </dl>
      </section>

      <div>
        {order.status === 'completed' && (
          <Button variant="primary" onClick={handleBookAgain}>
            Book again
          </Button>
        )}
        {(order.status === 'cancelled' || order.status === 'error') && (
          <Button variant="primary" onClick={handleContactSupport}>
            Contact support
          </Button>
        )}
        <Button variant="secondary" onClick={handleBackToBookings}>
          Back to bookings
        </Button>
      </div>
    </div>

    {fetchError && (
      <div role="alert">
        <p>Status unavailable. Last updated: {order.lastUpdated}</p>
        <Button variant="primary" onClick={handleRetry}>Try again</Button>
      </div>
    )}
  </main>
)}
```

---

## 12. Cross References

- order-confirmation.md
- button.md
- icon.md
- badge.md
- link.md
- spinner.md
- tooltip.md
- token-reference.md
