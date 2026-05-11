---
name: Notifications
tier: pattern
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Notifications

---

## 1. Overview

Notifications are the system's primary channel for communicating outcomes, updates, and alerts to the user in response to their actions or background events. They span the full lifecycle of product flows on the platform — from transactional feedback during checkout, through payment and order status events, to delivery updates after the order leaves the warehouse.

This spec defines the notification system as a whole: the forms notifications take, the semantic types they carry, the rules that govern their behavior, and the content standards that make them useful rather than intrusive. It does not redefine the atoms it composes — Icon, Button, Link, Badge, and Icon Button are used as-is from their respective atom specs.

Notifications exist in two forms:

- **Toast** — A floating, ephemeral message that appears in response to a user-initiated action or a real-time system event. It overlays content, auto-dismisses after a defined interval, and does not require user action to resolve.
- **Inline** — A persistent message embedded within the page or section it relates to. It does not overlay content, does not auto-dismiss, and remains until the condition it describes is resolved or the user explicitly dismisses it.

The correct form depends on whether the message is ephemeral feedback (toast) or a persistent condition the user must understand before acting (inline).

---

## 2. When to Use

**Toast — use when:**

- Confirming the outcome of a user-initiated action that completed in the background: "Flight selected", "Traveler details saved", "Booking placed."
- Communicating a real-time status update that arrived while the user was on the page: "Your booking is confirmed."
- Reporting a non-critical background failure the user should know about but does not need to act on immediately: "We couldn't save your preference. Try again later."

**Inline — use when:**

- A condition affecting the user's ability to complete a flow must be visible before they can proceed: payment declined, flight no longer available, hotel sold out for selected dates.
- A booking, payment, or delivery status has changed in a way that requires the user to review and decide: refund initiated, flight rescheduled, partial cancellation.
- A warning about a page-level state must persist until the condition is resolved: price change warning on a saved trip, session about to expire.
- A success state must remain visible as the user continues reading the page: booking confirmed banner at the top of the booking confirmation view.

---

## 3. When Not to Use

- **To replace a dedicated page or pattern** — A payment failure that requires re-entering card details belongs in the checkout flow with inline form errors, not in a notification alone. A notification may accompany the error, but cannot replace the structured recovery surface.
- **To communicate non-events** — Do not use notifications for marketing messages, promotional announcements, or content recommendations. These are not system feedback and must not share the notification surface.
- **To stack unrelated messages** — Do not queue multiple simultaneous toasts for unrelated events. If multiple events occur in rapid succession, collapse them or use the most critical message only.
- **Instead of a Dialog for destructive confirmations** — An irreversible action (cancel booking, delete account) requires a Dialog, not a notification. A notification cannot substitute for confirmation.
- **To communicate form validation errors** — Field-level and form-level errors belong in the form pattern as inline error messages. A notification may accompany a failed form submission but cannot replace field errors.

---

## 4. Composition

| Atom | Role |
|---|---|
| Icon | Semantic icon that identifies the notification type at a glance. Positioned as the leading element of the notification. Each type maps to a fixed icon: checkmark (success), x-circle (error), alert-triangle (warning), info-circle (info), package (order status), credit-card (payment status), truck (delivery update). Always paired with a text label — never the sole indicator of meaning. |
| Icon Button | Dismiss control on dismissible toasts and inline notifications. Carries `aria-label="Dismiss"`. Absent on non-dismissible inline notifications where the condition must persist. |
| Button | Action trigger within a notification when the user must or can act on the message. At most one Button per notification. Examples: "Retry", "View order", "Update payment". Used only when the action is directly relevant to the notification's message. |
| Link | Inline navigational reference within the notification body when a destination is helpful context but not a required action. Examples: "View order details", "Check delivery status". One Link per notification at most. |
| Badge | Used in order status and delivery update notifications to surface the current status label inline alongside the message body. Variant matches the notification type. |

**Toast structure**

A toast notification is a composed surface, not a named atom. It consists of:

- A leading Icon (semantic type).
- A title — one short sentence naming the outcome.
- An optional body — one additional sentence of supporting detail.
- An optional action — one Button or one Link, never both.
- A dismiss Icon Button, present on all toasts except loading toasts.

**Inline structure**

An inline notification is a composed surface. It consists of:

- A leading Icon (semantic type).
- A title — one short sentence naming the condition.
- An optional body — one or two sentences of supporting detail or instruction.
- An optional action — one Button or one Link, never both.
- An optional dismiss Icon Button, absent when the condition must persist until resolved.

---

## 5. Variants

### By semantic type

| Variant | Purpose | Icon name | Token set |
|---|---|---|---|
| Success | Confirms a completed action or positive outcome. | `check-circle` | Success token set |
| Error | Reports a failure that blocked an action or requires recovery. | `x-circle` | Danger token set |
| Warning | Flags a condition that may affect the user's next action but has not yet caused a failure. | `alert-triangle` | Warning token set |
| Info | Provides neutral context, a status update, or helpful guidance. | `info-circle` | Info (selected) token set |
| Order status | Communicates a change in the order's fulfilment state: confirmed, preparing, dispatched. | `package` | Success or info token set depending on state |
| Payment status | Communicates the outcome or change in a payment event: confirmed, declined, refund initiated. | `credit-card` | Success, danger, or warning token set depending on state |
| Delivery update | Communicates a change in the delivery timeline or logistics state: out for delivery, delivered, delayed, attempted. | `truck` | Success, warning, or info token set depending on state |

### By form

| Variant | Placement | Persistence | Dismissible |
|---|---|---|---|
| Toast | Fixed overlay, top-right (desktop) or top-center (mobile). Stacks vertically if multiple. | Auto-dismisses after `4000ms` (success, info) or `6000ms` (warning). Error toasts do not auto-dismiss. | Yes — dismiss Icon Button always present. |
| Inline | Embedded in page content at the point of relevance. Full width of its container. | Persists until condition resolves or user dismisses. | Conditional — present for warnings and info; absent when persistence is mandatory (error blocking a flow, order status). |

---

## 6. Behavior

### Appearing

Toasts enter from the top of the screen using `motion.enter`. They stack below existing toasts with `spacing.sm` between them. A maximum of three toasts are visible simultaneously; if a fourth arrives, the oldest is dismissed first.

Inline notifications render in document flow at the time they become relevant — either on page load (for persistent conditions) or immediately after the triggering event (for dynamic conditions). They do not animate in unless the surrounding content is already loaded; if the page is still loading, the inline notification renders as part of the initial layout.

### Auto-dismissing

Success and info toasts dismiss automatically after their defined interval. A progress indicator line at the base of the toast communicates the remaining display time using `motion.layout`. Hovering or focusing a toast pauses the auto-dismiss timer. The timer resumes when focus or hover leaves the toast.

Warning and error toasts do not auto-dismiss. They require explicit user dismissal or resolution of the triggering condition.

### Dismissing

Activating the dismiss Icon Button closes the notification immediately with `motion.exit`. For toasts, focus returns to the element that had focus before the toast appeared, or to the next interactive element in document order. For inline notifications, focus returns to the nearest meaningful content landmark.

### Stacking and queuing

Toasts from concurrent events stack vertically. When the maximum of three is reached, new toasts are queued and appear as older ones are dismissed. Queued toasts inherit the same auto-dismiss behavior as if they had appeared immediately. Critical error toasts skip the queue and appear immediately, displacing a lower-priority toast if necessary.

### Real-time status updates

Order status, payment status, and delivery update notifications may arrive as push events during an active session. They appear as toasts if the user is not currently viewing the relevant flow page. If the user is already on the order tracking or order confirmation page, the notification is suppressed in favor of the page's own live region update — the two must not duplicate the same information simultaneously.

### Persistent inline notifications

An inline error or warning notification that describes a blocking condition remains visible until the condition is resolved. It is not dismissible. When the condition resolves — for example, when the user successfully retries a failed payment — the inline notification is removed and replaced by a success inline notification that auto-removes after `3000ms`.

---

## 7. States

| State | Description | Token behavior |
|---|---|---|
| Default (success) | Positive outcome confirmation. No action required. | Background: `color.background.success`. Icon and title: `color.status.success.bold`. Border: none. |
| Default (error) | Failure requiring user attention or recovery. | Background: `color.background.danger`. Icon and title: `color.text.danger`. Border: `color.border.danger` on inline variant. |
| Default (warning) | Advisory condition. User may act or acknowledge. | Background: `color.background.warning`. Icon and title: `color.text.warning`. Border: `color.border.default` on inline variant. |
| Default (info) | Neutral status or guidance. | Background: `color.background.selected`. Icon and title: `color.text.brand`. Border: `color.border.subtle` on inline variant. |
| Focused | A Button, Link, or Icon Button within the notification is keyboard-focused. | Focus ring: `color.border.focus` on the focused element. Notification background unchanged. |
| Hovered (toast) | Cursor is over the toast. Auto-dismiss timer paused. | Background: `color.background.subtle` applied as a surface overlay. Timer paused visually. |
| Dismissing | Dismiss Icon Button activated. Notification exiting. | Transition: `motion.exit`. |
| Loading (payment / order) | A payment or order submission is in progress. Toast shows a Spinner in place of the type Icon. No dismiss control. | Spinner: `color.text.secondary`. Background: `color.background.subtle`. |

---

## 8. Accessibility

**ARIA roles**

| Form | Role | Rationale |
|---|---|---|
| Toast — success, info | `role="status"` with `aria-live="polite"` | Non-critical. Announced at the next opportunity without interrupting the user. |
| Toast — warning | `role="status"` with `aria-live="polite"` | Advisory. Does not require immediate interruption. |
| Toast — error | `role="alert"` with `aria-live="assertive"` | Critical failure. Must be announced immediately, interrupting the current screen reader output. |
| Inline — all types | `role="region"` with a descriptive `aria-label` | Persistent. Part of the document flow; screen readers encounter it during normal navigation. |
| Order / payment / delivery update toast | `role="status"` with `aria-live="polite"` | Background update. Announced politely; user is likely engaged elsewhere. |

**Required ARIA attributes**

| Attribute | Applied to | Purpose |
|---|---|---|
| `aria-live` | Toast container | Set to `"polite"` or `"assertive"` per the table above. |
| `aria-atomic="true"` | Toast container | Ensures the full notification content is announced as a single unit, not piecemeal. |
| `aria-label="Dismiss"` | Dismiss Icon Button | Names the dismiss action for screen readers. |
| `aria-label` | Inline notification region | Describes the region: e.g., `aria-label="Payment error"`, `aria-label="Order status update"`. |
| `aria-hidden="true"` | Decorative type Icon | Applied when the Icon's meaning is fully communicated by the adjacent text label. |
| `aria-label` | Type Icon when standalone | Applied when the Icon must carry its own accessible name: e.g., `aria-label="Error"`. |

**Keyboard navigation**

- Tab moves focus into the notification if it contains interactive elements (Button, Link, dismiss Icon Button).
- Within the notification, Tab moves between interactive elements in document order: dismiss Icon Button last.
- Escape dismisses a toast while it is focused, equivalent to activating the dismiss Icon Button.
- Inline notifications receive focus only when they contain interactive elements. Non-interactive inline notifications are not focusable.

**Focus management**

- When a toast appears, focus is not moved to it. The user's current focus position is preserved.
- When a toast is dismissed via keyboard, focus returns to the element that triggered the event that produced the toast, if that element is still in the DOM. If not, focus moves to the next logical interactive element.
- When an inline notification is injected into the page dynamically, focus is not moved to it unless the notification describes a blocking error that must be addressed before the user can proceed — in that case, focus is moved to the notification's first interactive element.

**Color contrast**

All text within notifications must meet WCAG 2.1 AA: minimum 4.5:1 for body text, minimum 3:1 for large text and UI component boundaries. Notification type must not be communicated by color or Icon alone — the title text must explicitly state the nature of the message (e.g., "Payment failed", not just an error icon and a generic body).

**Auto-dismiss and timing**

Users who have enabled the operating system's "Reduce Motion" preference must receive extended display times for auto-dismissing notifications (minimum 10 seconds) or the auto-dismiss behavior must be disabled entirely, requiring explicit user dismissal. The progress indicator line must not animate when Reduce Motion is active.

---

## 9. Content Guidelines

**Title**

- State the outcome or condition in plain language. One sentence. No trailing punctuation unless the sentence is a question.
- Lead with the subject: "Payment confirmed", "Booking placed", "Flight delayed" — not "We wanted to let you know that your payment…"
- Do not use vague titles: "Something went wrong", "Notice", "Update". Name the specific event.
- Maximum 60 characters. If the title cannot be expressed in 60 characters, the message is too complex for a notification — use an inline pattern or a dedicated page instead.

**Body (optional)**

- Provide one additional sentence of context or instruction when the title alone is insufficient.
- Do not repeat the title. Add information the user needs to act or understand.
- Maximum 120 characters.
- Do not include technical detail, error codes, or system messages. If a reference is necessary for support, provide it as a plain reference number ("Reference: #ERR-4821"), not as a stack trace or technical descriptor.

**Actions**

- If an action is included, its label must name the outcome or destination: "Retry payment", "View booking", "Update payment method" — not "Click here", "OK", or "Continue".
- Do not include more than one action per notification.
- Do not use a destructive action within a notification. Destructive confirmations belong in a Dialog.

**Success notifications**

- Confirm specifically what succeeded: "Booking #12345 placed", "Traveler details saved", "Trip removed from saved."
- Do not add unnecessary reassurance: "Great! Your booking has been placed successfully and we're so excited to help you." — use "Booking placed."

**Error notifications**

- State what failed and, where possible, why: "Payment declined — card expired."
- Provide a single clear recovery instruction: "Update your payment method to continue."
- Do not blame the user. Do not use apologetic padding: "We're so sorry, but unfortunately…" — use "Payment declined."
- If the cause is unknown, say so plainly: "Payment couldn't be processed. Try again or use a different card."

**Warning notifications**

- Name the condition and the consequence if it is not addressed: "Price for this flight has changed — your saved trip may not be available at this rate."
- Do not use scare language or manufactured urgency.

**Booking, payment, and flight/hotel updates**

- Use the same plain status vocabulary defined in booking-confirmation.md: "Booking confirmed", "Refund initiated", "Flight rescheduled."
- Include the booking reference where space allows: "Booking #12345 is confirmed."
- Estimated arrival or check-in dates must be stated plainly: "Check-in 13 May – Check-out 15 May."
- Do not state a specific arrival time unless the system has confirmed it with the airline or property.

---

## 10. Cross References

- order-confirmation.md
- order-tracking.md
- checkout-flow.md
- button.md
- icon.md
- icon-button.md
- badge.md
- link.md
- spinner.md
- dialog.md
- token-reference.md
