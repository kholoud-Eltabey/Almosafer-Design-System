---
name: Order Confirmation
tier: pattern
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Order Confirmation

---

## 1. Overview

Booking confirmation communicates the successful completion of a transaction. It is the terminal screen of the checkout flow: the user has placed their booking and the system has accepted it. The pattern's role is to provide immediate certainty, preserve the relevant booking details for reference, and give the user a clear path forward.

This pattern does not collect input. It does not present options. It confirms, informs, and directs. Every element on the screen exists to reinforce one of those three purposes.

---

## 2. When to Use

- Immediately after a successful booking submission at the end of the checkout flow.
- When the system has confirmed payment acceptance and assigned a booking reference.
- When the user must be given a reference they can act on — to track, contact support, or return to browsing.

---

## 3. When Not to Use

- **Mid-checkout** — Do not render this pattern until the order is fully confirmed. Premature confirmation causes trust failures if the transaction later fails.
- **Free or zero-value completions** — If no payment was processed, adapt the headline copy to reflect the nature of the completion (e.g., reservation, free sample) rather than treating it as a standard order.
- **Subscription setup** — Recurring billing confirmation has distinct regulatory and informational requirements. Use a dedicated subscription confirmation surface.
- **Trip summary or booking review** — The trip summary and checkout flow patterns handle pre-submission states. This pattern begins after the server confirms the booking.

---

## 4. Composition

| Atom / Pattern | Role |
|---|---|
| Icon | Large success icon (checkmark within a circle) positioned at the top of the confirmation card. Sets the visual tone of the screen before the user reads any text. In the error fallback variant, replaced by a danger or warning icon. |
| Button (primary) | The main next action — "View booking" navigates to the booking tracking view. Only one primary Button is present at a time. |
| Button (secondary) | Optional supplementary action — "Browse more trips" returns the user to the search or catalog. Rendered below the primary Button, lower visual weight. |
| Link | Inline contextual references within the body — support contact, terms of service, or order history. Used only for navigational destinations, not for actions. |
| Spinner | Replaces the confirmation card content during the loading state while the system finalises the order record. Centred within the card area. |
| Empty State | Fills the confirmation surface in the error fallback state when the system cannot confirm the order. Provides a clear error message and a recovery action. |

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Page background | `color.background.sunken` | Recessed canvas behind the confirmation card. |
| Confirmation card background | `color.background.surface` | Surface of the main confirmation card. |
| Confirmation card border | `color.border.subtle` | Low-emphasis edge separating the card from the page canvas. |
| Confirmation card radius | `radius.xl` | Corner rounding on the confirmation card. |
| Success icon color | `color.status.success` | Color applied to the success checkmark icon. |
| Danger icon color | `color.status.danger` | Color applied to the error icon in the error fallback variant. |
| Confirmation headline text | `color.text.primary` | Main confirmation heading ("Booking confirmed"). |
| Booking reference label text | `color.text.secondary` | "Booking #" label preceding the booking reference. |
| Booking reference value text | `color.text.primary` | The booking reference itself — must be visually distinct for easy reference and copying. |
| Item name text | `color.text.primary` | Each line-item name within the booking summary (flight route, hotel name). |
| Item meta text (cabin class, dates) | `color.text.secondary` | Supporting detail below each item name (e.g., Economy, 12 Apr – 15 Apr). |
| Price text | `color.text.primary` | Line-item price and booking total. |
| Total label text | `color.text.secondary` | "Total" label in the totals row. |
| Divider | `color.border.subtle` | Horizontal rule separating the item list from the totals row, and the totals from the action area. |
| Section label text | `color.text.subtle` | Labels for grouped detail sections (e.g., "Booked for", "Check-in", "Departure"). |
| Section value text | `color.text.primary` | Values within grouped detail sections. |
| Card internal padding | `spacing.layout.sm` | Padding inside the confirmation card on all sides. |
| Gap between icon and headline | `spacing.md` | Vertical space between the success icon and the confirmation headline. |
| Gap between headline and booking reference | `spacing.sm` | Vertical space between the confirmation headline and the booking reference row. |
| Gap between sections | `spacing.lg` | Vertical space between the order summary, delivery details, and action area. |
| Gap between item rows | `spacing.sm` | Vertical space between individual line items in the order summary. |
| Gap between action buttons | `spacing.sm` | Vertical space between the primary and secondary Buttons. |
| Confirmation card enter transition | `motion.enter` | Card appearing after the loading state resolves. |
| Loading-to-content transition | `motion.fast` | Spinner-to-card crossfade. |

---

## 6. Variants

| Variant | Description | Default |
|---|---|---|
| Success confirmation | Full confirmation state. Success Icon, confirmation headline, booking reference, booking summary, trip details, primary action, optional secondary action. Shown when the booking is accepted and the booking record is available. | Yes |
| Partial success | Used when the booking is accepted but one or more items could not be fulfilled (flight sold out at time of confirmation, hotel unavailable). The success Icon is shown but accompanied by a warning Icon inline with the affected items. A descriptive message explains which items are affected and the next step (refund, alternative, or contact). | No |
| Error fallback | Shown when the system cannot confirm the booking or cannot retrieve the booking record after submission. Replaces the confirmation card content with the Empty State pattern. Includes a "Try again" Button and a Link to contact support. Does not state that payment failed unless the system has confirmed this explicitly. | No |

---

## 7. Behavior

### Shown after successful checkout

The booking confirmation screen is rendered immediately after the checkout flow receives a successful booking response from the system. The Spinner is shown during the interval between the user submitting the booking and the system returning confirmation. Once the booking record is available, the Spinner transitions to the confirmation card with `motion.enter`.

### Provides next actions

The primary Button directs the user to the booking tracking view. If tracking is unavailable (e.g., for guest checkouts without a tracking URL), the primary action changes to "Back to home" or the most logical continuation point for the platform context. The secondary Button ("Browse more trips") returns the user to the search or catalog without requiring them to use the browser back control.

### May include navigation options

Inline Links within the order detail section allow the user to navigate to order history, contact support, or review the platform's delivery and returns policy. These are supplementary. They do not compete visually with the primary action.

### Partial success notification

When items are partially fulfilled, the affected line items are marked with a warning Icon inline. A descriptive note beneath the item row explains the impact. The primary action remains "View booking" for the fulfilled portion. A secondary Link directs the user to the relevant support or refund flow for the unfulfilled items.

### Error fallback recovery

In the error fallback state, the primary action within the Empty State is "Try again", which re-requests the order status. If the retry fails, the action changes to "Contact support" with a Link to the support channel. The screen does not encourage the user to resubmit the order — this risks duplicate charges.

---

## 8. States

| State | Visual change | Token change |
|---|---|---|
| Loading | Spinner centred in the card area. No booking content visible. | Spinner uses `color.text.secondary`. Card background: `color.background.surface`. |
| Success | Confirmation card fully rendered. Success Icon, headline, booking details, and actions visible. | Success Icon: `color.status.success`. All text and surface tokens as defined in Tokens Used. |
| Partial success | As success, with warning Icon inline on affected line items. Warning note below affected rows. | Warning Icon: `color.status.warning`. Warning note text: `color.text.warning`. |
| Error fallback | Confirmation card content replaced by Empty State. Error Icon at top of Empty State. | Handled by the Empty State pattern token assignments. |

---

## 9. Accessibility

**ARIA role and landmark**

The confirmation card must be wrapped in a `<main>` landmark or be the primary content of the page. The page `<title>` must update to reflect the confirmation state (e.g., "Booking confirmed — Almosafer") immediately after the loading state resolves.

**Success announcement**

The confirmation headline must be announced to screen readers as soon as it renders. Apply `role="status"` or `aria-live="polite"` to the region containing the confirmation headline and order ID so assistive technologies announce the outcome without requiring the user to navigate to it.

**Required ARIA attributes**

| Attribute | Applied to | Purpose |
|---|---|---|
| `aria-live="polite"` | Confirmation headline region | Announces the confirmation outcome to screen readers on render. |
| `aria-label="Booking [reference]"` | Booking reference value | Ensures the booking reference is announced as a distinct reference, not as raw numeric text. |
| `aria-busy="true"` | Confirmation card | Set during loading state. Removed when content renders. |
| `aria-label` | Success and warning Icons | Descriptive label for each status Icon (e.g., `aria-label="Booking confirmed"`, `aria-label="Warning: item unavailable"`). Decorative Icons carry `aria-hidden="true"`. |

**Keyboard navigation**

- All interactive elements (Buttons, Links) are reachable by Tab in document order: primary Button before secondary Button before inline Links.
- No focus trapping. The user can Tab freely through the page after the confirmation renders.
- The first interactive element (primary Button) receives focus automatically when the confirmation card renders, after the loading state exits.

**Readable order summary**

The order summary list must use a semantically correct list element (`<ul>` or `<ol>`) so screen readers announce item count and allow list navigation. Each line item is a list item containing the item name, quantity, and price as separate labelled elements — not merged into a single text node.

**Color contrast**

All text must meet WCAG 2.1 AA: minimum 4.5:1 for body text, minimum 3:1 for large text and UI component boundaries. The success and warning icons must not be the sole indicator of status — they must be paired with text.

---

## 10. Content Guidelines

**Confirmation headline**

- Lead with a positive, unambiguous statement. Example: "Booking confirmed" or "Your booking is confirmed."
- Do not use vague phrasing such as "Thank you!" alone — it does not communicate what happened.
- Do not include the booking reference in the headline. The reference belongs in a clearly labeled reference row below.

**Booking reference**

- Label it explicitly: "Booking #12345678" or "Your booking reference: 12345678."
- Display the reference in a visually distinct style (using `color.text.primary` and sufficient size) so it is easy to read and copy.
- Do not abbreviate or truncate the booking reference under any circumstances.

**Booking summary**

- List every item in the booking. Do not omit items to reduce length.
- Show the item name (flight route or hotel name), key details (cabin class, room type, dates), and line price per item.
- Show the booking total clearly, labeled "Total" — not "Grand total", "Amount charged", or "You paid".
- Do not repeat the full traveler details or payment card details. Reference the destination city only.

**Next steps**

- The primary action label must name the destination: "View booking", not "Continue" or "Next."
- The secondary action label must name the destination: "Browse more trips", not "Go back."
- Check-in or departure information, if available, is shown as a single line beneath the totals row: "Check-in: [date]" or "Departure: [date and time]."

**Partial success copy**

- Be specific about what was affected and why: "The selected hotel room is no longer available and has been removed from your booking."
- State the resolution: "You will not be charged for this item. A refund will appear within 3–5 business days."
- Do not use vague hedges: "Some items may not be available."

**Error fallback copy**

- Do not assert payment failure unless confirmed: "We couldn't confirm your order. Your payment has not been charged."
- Provide a clear next step: "Try again" if retrying is safe, or "Contact support" if it is not.
- Avoid technical language. Do not expose error codes or system messages.

---

## 11. Code Example

```jsx
{isLoading && (
  <div aria-busy="true" aria-label="Confirming your booking">
    <Spinner />
  </div>
)}

{isSuccess && (
  <main>
    <div role="status" aria-live="polite">
      <Icon name="check-circle" aria-label="Booking confirmed" />
      <h1>Booking confirmed</h1>
      <p aria-label={`Booking ${booking.id}`}>Booking #{booking.id}</p>
    </div>

    <section aria-label="Booking summary">
      <ul>
        {booking.items.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>{item.details}</span>
            <span>{item.dates}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
      <div>
        <span>Total</span>
        <span>{booking.total}</span>
      </div>
    </section>

    <section aria-label="Trip details">
      <p>{booking.destinationCity}</p>
      {booking.checkIn && (
        <p>Check-in: {booking.checkIn}</p>
      )}
      {booking.departure && (
        <p>Departure: {booking.departure}</p>
      )}
    </section>

    <div>
      <Button variant="primary" onClick={handleViewBooking}>
        View booking
      </Button>
      <Button variant="secondary" onClick={handleBrowseMoreTrips}>
        Browse more trips
      </Button>
    </div>

    <p>
      Need help? <Link href="/support">Contact support</Link>
    </p>
  </main>
)}

{isError && (
  <EmptyState
    icon={<Icon name="alert-circle" aria-label="Error" />}
    headline="We couldn't confirm your order"
    body="Your payment has not been charged. Try again or contact support if the issue persists."
    action={<Button variant="primary" onClick={handleRetry}>Try again</Button>}
    secondaryAction={<Link href="/support">Contact support</Link>}
  />
)}
```

---

## 12. Cross References

- checkout-flow.md
- trip-summary.md
- button.md
- icon.md
- link.md
- empty-state.md
- token-reference.md
