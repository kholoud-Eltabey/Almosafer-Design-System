---
name: Navigation Flow
tier: flow
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Navigation Flow

---

## 1. Overview

The navigation flow defines how users move through the Almosafer platform — from entry into the application through search, booking, and post-booking tracking. It establishes the structural hierarchy of routes, the components that surface those routes, the rules that govern forward and backward movement, and the accessibility requirements that ensure every path is reachable by every user.

Navigation on Almosafer is a conversion-critical system. Every friction point between a user's intent and their destination is a potential drop-off. The navigation structure must therefore be flat, predictable, and recoverable at every step. Users must always know where they are, where they can go, and how to return to where they were.

The platform serves both Arabic and English speakers in RTL and LTR orientations. All navigation components must support both directions without layout modification. All directional properties in this spec use logical CSS. Physical directional properties are not permitted.

Navigation components compose existing atoms — Icon, Icon Button, Link, Badge, and Button — against structural surfaces governed by tokens. No new atoms are introduced.

---

## 2. Primary Navigation Structure

The application is organised into a shallow three-level hierarchy. Deep nesting is not permitted. Every destination must be reachable within three interactions from the home entry point.

```
Level 1 — Root destinations (always visible in global navigation)
  ├── Home
  ├── Search
  ├── Explore (Flights, Hotels, Packages)
  ├── My Trips
  └── Account

Level 2 — Section destinations (reached from Level 1)
  ├── Flight search results (from Search or Explore → Flights)
  ├── Hotel search results (from Search or Explore → Hotels)
  ├── Flight or hotel detail (from search results)
  ├── Trip summary (from My Trips)
  ├── Booking history (from Account)
  └── Booking tracking (from Booking history or notification)

Level 3 — Flow destinations (reached from Level 2, context-specific)
  ├── Booking checkout (from Trip summary)
  ├── Booking confirmation (terminal — reached from Checkout only)
  ├── Cancellation (from Booking tracking)
  └── Refund flow (from Booking tracking)
```

Level 3 destinations are flow-bound. They are not accessible from the global navigation during an active flow. Back navigation within a Level 3 flow is governed by the flow's own step structure, not by the global navigation.

**Token reference — structural surfaces**

| Part | Token | Role |
|---|---|---|
| Header background | `color.background.surface` | Surface behind the global header. |
| Header border | `color.border.subtle` | Bottom edge separating the header from page content. |
| Header height padding | `spacing.md` | Block-direction internal padding within the header. |
| Header inline padding | `spacing.layout.sm` | Inline-direction internal padding within the header (logical). |
| Bottom navigation background | `color.background.surface` | Surface behind the bottom navigation bar. |
| Bottom navigation border | `color.border.subtle` | Top edge separating the bottom bar from page content. |
| Bottom navigation padding | `spacing.sm` | Internal padding within the bottom navigation bar. |
| Tab bar background | `color.background.surface` | Surface behind a tab row. |
| Tab bar border | `color.border.subtle` | Bottom edge of the tab bar. |
| Tab active indicator | `color.border.selected` | Active tab underline or highlight. |
| Tab inactive text | `color.text.subtle` | Label color for inactive tabs. |
| Tab active text | `color.text.brand` | Label color for the active tab. |
| Back navigation background | `color.background.surface` | Surface of the back navigation row when rendered as a standalone bar. |
| Back navigation border | `color.border.subtle` | Bottom edge of the back navigation row. |
| Back navigation padding | `spacing.md` | Internal padding within the back navigation row. |
| Page transition | `motion.layout` | Full-page transition between Level 1 and Level 2 destinations. |
| Tab transition | `motion.normal` | Transition between tab content panels. |
| Loading bar | `color.background.primary` | Progress indicator color during route loading. |

---

## 3. Entry Points

### Home

The home route is the default entry point for all authenticated users and the fallback destination for unauthenticated users after sign-in. It is not a marketing surface — it is a navigation surface. Its role is to surface the fastest paths to the user's most likely next action: browsing a category, resuming a search, or continuing a purchase.

Home exposes direct Links to featured destinations and a persistent Search entry point. It does not reproduce the full search results — it provides curated entry points into flights, hotels, and packages.

### Search

Search is a first-class entry point, accessible from the header on every route at Level 1 and Level 2. It is never buried behind a menu. Activating the search control opens the Search pattern (search.md) in-page or as an overlay depending on viewport. The Search entry point in the header uses an Icon Button (search icon) on compact viewports and an expanded Input on wide viewports.

Search is available from all routes except active Level 3 flows (Booking checkout, Cancellation, Refund flow), where the header is simplified and the Search entry point is suppressed to reduce distraction during high-commitment steps.

### Explore

Explore is the primary browsing entry point. The Explore destination surfaces entry points to Flights, Hotels, and Packages. Selecting a category navigates to the relevant search results page (Level 2), which renders the Catalog List pattern for that content type. Explore is accessible from the global navigation — both the header on wide viewports and the bottom navigation on compact viewports.

---

## 4. Navigation Paths

### Browsing flow

```
Home
  → Explore
    → Flight or Hotel search results (Catalog List)
      → Flight or Hotel detail
        → Save to My Trips
          → Trip summary (trip-summary)
```

The browsing flow is the primary conversion path. Every step must preserve the user's ability to return to the previous step without losing their position. Returning to search results from a flight or hotel detail page must restore the user's scroll position and active filters.

Search result pages render the Catalog List pattern. Flight and hotel detail pages are standalone routes outside the Catalog List pattern. My Trips renders the Trip Summary pattern.

### Purchase flow

```
Trip summary (trip-summary)
  → Booking checkout (checkout-flow)
    → Booking confirmation (order-confirmation)
```

The purchase flow is a protected linear sequence. During active booking checkout, the global navigation header is simplified: the logo and a back-to-trip-summary Link remain; all other navigation controls are suppressed. The bottom navigation is hidden. This prevents accidental exits from a high-commitment flow.

Back navigation within the checkout flow is governed by the checkout-flow spec's own step structure. The browser Back button is supported — activating it within checkout returns the user to the previous checkout step, not to the trip summary, unless the user is on the first checkout step.

### Booking tracking flow

```
Account
  → Booking history
    → Booking tracking (order-tracking)
      → Cancellation flow (optional)
      → Refund flow (optional)
```

The booking tracking flow is accessible from the Account destination and from notification deep links. It does not require the user to navigate through Account and Booking history if accessed via a direct link — deep linking is supported (see Behavior). The Cancellation and Refund flows are reachable only from within the Booking tracking view for the relevant booking.

---

## 5. Navigation Components

### Header

The header is the persistent top-level navigation surface. It is visible on all routes at Level 1 and Level 2. It is simplified on Level 3 flow routes.

**Standard header composition:**

| Element | Atom | Role |
|---|---|---|
| Logo | Link | Navigates to Home. Always present. In RTL, positioned at the inline-end of the header. |
| Search control | Icon Button (compact) or Input (wide) | Opens or activates the Search pattern. |
| Cart icon | Icon Button | Navigates to the Cart route. Carries a Badge showing the item count when the cart is non-empty. |
| Account icon | Icon Button | Navigates to the Account destination or opens an account menu. |

**Simplified header (Level 3 flows):**

| Element | Atom | Role |
|---|---|---|
| Logo | Icon or non-interactive mark | Not a Link during active booking checkout. Prevents accidental navigation away from a payment step. |
| Back Link | Link with leading Icon | Returns to the previous non-flow route (Trip summary for Booking checkout; Booking tracking for Cancellation and Refund flow). Labelled explicitly: "Back to trip summary", "Back to booking". |

All directional icons in the header (back arrow, forward chevron) must flip in RTL. The Icon atom's RTL flip behavior applies.

### Bottom navigation

The bottom navigation bar is the primary navigation surface on compact viewports. It is always visible at Level 1 and Level 2, and hidden at Level 3.

**Composition:**

| Destination | Icon name | Label |
|---|---|---|
| Home | `home` | Home |
| Search | `search` | Search |
| Explore | `compass` | Explore |
| My Trips | `bookmark` | My Trips |
| Account | `user` | Account |

Each destination is an Icon Button with a visible text label below the icon. The active destination is indicated by the active token set (icon and label use `color.text.brand`; an indicator bar uses `color.border.selected`). The My Trips item carries a Badge when the trip summary is non-empty.

The bottom navigation must remain above the soft keyboard on mobile. It must not overlap page content — page content must be padded at the block-end by the height of the bottom navigation bar.

### Tabs

Tabs appear at Level 2 within sections that have parallel content categories: for example, within the Account destination ("Bookings", "Saved travelers", "Payment methods") or within a search results page that spans multiple content types (Flights, Hotels, Packages).

**Composition:**

| Element | Atom | Role |
|---|---|---|
| Tab label | Link | Each tab label is a navigational Link that activates its panel. The active tab carries `aria-selected="true"`. |
| Active indicator | Structural — token-styled | A bar beneath the active tab label using `color.border.selected`. |

Tabs do not scroll horizontally unless the number of tabs exceeds the available width. When horizontal scrolling is required, scroll indicators (faded edges) are shown at the inline-start and inline-end of the tab bar.

Tab panels are rendered in the document below the tab bar. Switching tabs does not navigate to a new route — it toggles panel visibility within the same route. If a tab destination warrants its own URL (deep linkable), it is a Level 2 route, not a tab.

### Back navigation

Back navigation appears at the top of Level 2 and Level 3 routes as a standalone row below the header, or integrated within the header's inline-start region on wide viewports.

**Composition:**

| Element | Atom | Role |
|---|---|---|
| Back Icon | Icon | A directional arrow icon. Flips in RTL. `aria-hidden="true"`. |
| Back label | Link | The destination name: "Back to [source]" or simply the parent route name. Never just "Back" without a destination. |

Back navigation is always explicit about its destination. "Back to Explore", "Back to search results", "Back to trip summary" — not a bare back arrow with no label.

On Level 3 flow routes with their own step structure (Booking checkout, Refund flow), the back navigation within the flow is managed by the flow's own "Back" Button atom, not by this header-level back navigation component.

---

## 6. Behavior

### Forward navigation

Forward navigation moves the user to a deeper level of the hierarchy or into a flow. Every forward navigation action produces an immediate visual response: the current route begins its exit transition using `motion.layout` while the new route enters. A loading indicator (a progress bar using `color.background.primary`) appears at the top of the viewport if the route requires a data fetch before rendering.

If the data fetch takes longer than `motion.slow`, a Spinner or skeleton state appears within the new route's content area. The route shell (header, navigation) renders immediately — loading states are scoped to content, not to the entire viewport.

### Backward navigation

Backward navigation returns the user to the previous route or step. Three backward navigation paths exist:

1. **In-app back control** — The explicit Back Link or Button within the current route. Always present at Level 2 and within Level 3 flows. This is the preferred backward navigation mechanism.
2. **Browser back button** — Supported on all routes. Must produce the same result as the in-app back control. The browser history stack must reflect the user's navigation path accurately.
3. **Bottom navigation re-tap** — Tapping the active bottom navigation destination scrolls the current page to the top. It does not navigate backward. Re-tapping a non-active destination navigates to that destination's root state.

Backward navigation from Level 2 to Level 1 must restore the Level 1 surface to its previous state — scroll position, active tab, and any applied filters must be preserved using the session's navigation history. A user returning to search results from a flight or hotel detail page sees the same scroll position and filters they left.

Backward navigation from Level 3 flows (Booking checkout, Cancellation, Refund flow) uses the flow's own Back control. Pressing browser back within a flow returns to the previous flow step, not to the Level 2 route, until the user reaches the first step — at which point browser back exits the flow to the Level 2 route.

### Deep linking

All Level 1, Level 2, and the Order tracking Level 3 destination support direct URL access. A user arriving via a deep link (from a notification, email, or external share) must land on the correct route without requiring navigation from Home.

Deep link behavior:

- **Authenticated user, valid route** — Render the target route directly.
- **Unauthenticated user, authenticated-only route** — Redirect to sign-in. After sign-in, redirect to the originally requested route. Preserve the target URL in session state across the authentication step.
- **Valid URL, unavailable content** — Render the route shell and display the appropriate empty state or error state within the content area. Do not redirect to Home.
- **Invalid or expired URL** — Render a page-level error state with a "Go to home" Link. Do not expose raw 404 pages.

Level 3 flow routes (Booking checkout, Cancellation, Refund flow) are not deep-linkable. Arriving at a flow URL without the required flow state redirects to the appropriate Level 2 entry point — Trip summary for Booking checkout, Booking tracking for Cancellation and Refund flow.

---

## 7. States

### Active navigation item

An active navigation item is the destination that corresponds to the user's current route. It communicates the user's current location in the navigation hierarchy.

| Component | Active visual | Token |
|---|---|---|
| Bottom navigation item | Icon and label use brand color. Indicator bar above icon. | `color.text.brand` for icon and label. `color.border.selected` for indicator. |
| Tab | Active underline bar below tab label. Label uses brand color. | `color.text.brand` for label. `color.border.selected` for underline. |
| Header icon (current section) | No persistent active state in the header — the bottom navigation is the primary active indicator on compact viewports. On wide viewports, the active section may carry a subtle underline. | `color.border.selected` for underline on wide viewports. |

### Inactive navigation item

An inactive navigation item is any destination that is not the user's current route.

| Component | Inactive visual | Token |
|---|---|---|
| Bottom navigation item | Icon and label use subtle color. No indicator. | `color.text.subtle` for icon and label. |
| Tab | No underline. Label uses subtle color. | `color.text.subtle` for label. |

### Loading transitions

When a route change requires a data fetch, the interface must communicate that navigation is in progress without blocking the user from understanding where they are.

| Moment | Visual | Token |
|---|---|---|
| Route change initiated | Progress bar appears at top of viewport. Route shell renders immediately. | Progress bar: `color.background.primary`. |
| Content loading | Spinner or skeleton within the content area of the new route. Header and navigation are fully rendered. | Spinner: `color.text.secondary`. |
| Content loaded | Progress bar completes and fades. Content renders with `motion.enter`. | Content transition: `motion.enter`. |
| Load failed | Error state renders within the content area per error-state.md. Progress bar is removed. | Per error-state.md token assignments. |

---

## 8. Accessibility

**Landmark structure**

Every page in the application must define the following landmark regions so screen reader users can navigate by landmark:

| Landmark | Element | Role |
|---|---|---|
| Header | `<header>` | Contains the logo, search control, cart icon, and account icon. |
| Main navigation | `<nav aria-label="Main navigation">` | Contains the primary navigation links (header on wide viewports, bottom navigation on compact viewports). |
| Tab navigation | `<nav aria-label="[Section name] navigation">` | Contains the tab list when tabs are present. |
| Main content | `<main>` | The primary content region of the current route. |
| Breadcrumb (if used) | `<nav aria-label="Breadcrumb">` | Ordered list of ancestor routes. |

**Required ARIA attributes**

| Attribute | Applied to | Purpose |
|---|---|---|
| `aria-current="page"` | Active bottom navigation Link or header Link | Identifies the current route to screen readers. |
| `aria-selected="true"` | Active tab | Identifies the active tab within a tab list. |
| `aria-selected="false"` | Inactive tabs | Explicitly marks inactive tabs. |
| `role="tablist"` | Tab bar container | Identifies the container as a tab list. |
| `role="tab"` | Each tab Link | Identifies each tab as a tab control. |
| `role="tabpanel"` | Each tab content panel | Identifies each content panel. |
| `aria-controls` | Each tab | References the `id` of the panel it controls. |
| `aria-label="My Trips, [N] saved"` | My Trips Icon Button | Announces the saved trip count as part of the button's accessible name. Updated when count changes. |
| `aria-label="Open search"` | Search Icon Button (compact header) | Names the search trigger. |
| `aria-live="polite"` | Route loading status region | Announces route loading state changes: "Loading [destination name]", "Done". |

**Keyboard navigation**

| Key | Context | Behavior |
|---|---|---|
| Tab | Global | Moves focus through all interactive elements in document order. |
| Arrow Left / Right | Tab bar | Moves focus between tabs. Does not activate — use Enter or Space to activate. |
| Enter / Space | Tab | Activates the focused tab and displays its panel. |
| Enter | Navigation Link | Navigates to the Link's destination. |
| Escape | Search overlay (if open) | Closes the search overlay and returns focus to the search trigger. |

Navigation links in the bottom navigation and header must be reachable by Tab in a logical order. The bottom navigation is positioned at the end of the document visually but must appear after the main content in the DOM to prevent screen reader users from encountering navigation before content on every page load.

**Focus management**

- When a route change completes, focus moves to the `<main>` element of the new route, or to the route's primary heading (`<h1>`) if it is present.
- When tabs are switched, focus moves to the activated tab panel's first interactive element or to the panel heading.
- When the search overlay opens, focus moves to the Search Input.
- When the search overlay closes, focus returns to the search trigger Icon Button.
- When the simplified header is shown during Level 3 flows, the first focusable element in the header is the Back Link.

**Skip navigation**

A "Skip to main content" Link must be the first focusable element in every page. It is visually hidden until focused. On activation, it moves focus to the `<main>` landmark. This is mandatory for all routes.

**RTL keyboard directionality**

Directional keyboard interactions (Arrow Left / Arrow Right within tab bars) must respect the active text direction. In RTL, Arrow Left moves to the next tab (inline-end direction) and Arrow Right moves to the previous tab (inline-start direction).

**Clear navigation labels**

All navigation Links must have visible text labels. Icon-only navigation items in the bottom navigation carry a visible text label below the icon at all times — labels are never hidden to save space. Icon Buttons in the header carry `aria-label` values that name the destination, not the icon: `aria-label="Search"`, `aria-label="Cart"`, `aria-label="Account"`.

---

## 9. Content Guidelines

**Navigation labels**

- Use noun labels for destinations: "Home", "Search", "Explore", "My Trips", "Account."
- Do not use verb labels for navigation items: "Shop", "Find", "Browse" are actions, not destinations.
- Labels must match the heading of the page they navigate to. If the Explore destination leads to a page headed "Flights, Hotels & Packages", the navigation label is "Explore" and the page heading is consistent — not two different destination names.
- In Arabic, navigation labels must be translated and reviewed by a native speaker. Do not machine-translate navigation labels. They are the primary orientation system for the user.

**Back navigation labels**

- Always name the destination: "Back to trip summary", "Back to [search results]", "Back to search results."
- Never use a bare back arrow without a label. An icon alone is not sufficient for accessibility or clarity.
- If the source route name is dynamic (e.g., a category name), use the actual name: "Back to Beverages", not "Back to category."

**Cart badge**

- Display the saved trip count as a numeral. Do not display a dot or an unqualified indicator. "3" is correct. A filled dot with no number is not.
- When the count exceeds 99, display "99+".
- The Badge's accessible label must include context: `aria-label="My Trips, 3 saved"`. The numeral alone is not sufficient.

**Loading state labels**

- The `aria-live` loading region must announce the destination: "Loading trip summary", "Loading booking #12345", "Loading search results."
- On completion, announce: "Trip summary loaded", "Booking loaded."
- On failure: do not announce a raw error code. Announce: "Couldn't load [destination]. Try again."

**Tab labels**

- Use short, specific nouns: "Bookings", "Saved travelers", "Payment methods" — not "My bookings", "My saved travelers."
- Maximum 20 characters per tab label. If a label exceeds this, the concept is too broad for a tab.
- Do not use tab labels that differ only by punctuation or capitalisation across languages.

**Predictable navigation**

- A navigation item must always navigate to the same destination. Do not change the destination of a persistent navigation item based on user state. If an item's destination changes conditionally (e.g., Cart navigates to an empty state vs. a populated cart), the destination is the Cart route — the cart route handles its own empty state, not the navigation item.
- Do not use navigation items to trigger actions (add to cart, sign out). Navigation items navigate. Actions use Buttons.

**Avoid deep nesting**

- No destination must require more than three interactions to reach from Home.
- If a piece of content cannot be reached within three steps, it must be surfaced via search, not buried deeper in the hierarchy.
- Breadcrumbs may be used at Level 2 when the category hierarchy has more than one level. Breadcrumbs must not exceed three levels: Home / Category / Subcategory. If a fourth level exists in the data, it is a filter, not a navigation level.

---

## 10. Cross References

- catalog-list.md
- catalog-card.md
- search.md
- trip-summary.md
- checkout-flow.md
- order-tracking.md
- order-confirmation.md
- notifications.md
- error-state.md
- icon.md
- icon-button.md
- link.md
- badge.md
- button.md
- spinner.md
- token-reference.md

---

## When to use

- The application has a defined hierarchy of destinations and users must be able to move between top-level sections from any point in the product.
- A user journey spans more than one route and requires persistent navigation components (header, bottom navigation, tabs, back controls).
- The interface supports both LTR and RTL layouts and navigation components must adapt to direction without structural changes.
- A route change requires a loading state, a progress indicator, and focus management on arrival.

---

## When not to use

- Inside a dialog or modal — navigation within overlaid surfaces is scoped to that surface and does not use the persistent navigation patterns defined here.
- Within a linear multi-step flow (checkout, onboarding, authentication) — those flows define their own forward and backward movement; use their respective specs instead.
- For secondary or contextual navigation within a single route — use tabs or in-page anchors scoped to that route rather than applying global navigation rules.
