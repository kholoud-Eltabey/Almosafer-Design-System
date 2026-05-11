---
name: Authentication Flow
tier: flow
status: draft
last-updated: 2026-04-30
maintainer: Team 4
source: Almosafer Design System
---

# Authentication Flow

---

## 1. Overview

The authentication flow governs how users establish and recover their identity across the platform. It covers four discrete sub-flows — login, signup, OTP verification, and password reset — each of which is a self-contained sequence with its own entry point, steps, and terminal state.

Authentication is a high-trust, high-friction moment. The interface must reduce that friction without reducing the security signal. Every field must be clearly labelled. Every error must name the specific problem and the specific fix. Every step must communicate its purpose before asking the user to act.

The flow is composed entirely from existing atoms and patterns. The Form pattern governs all data-collection surfaces. Error feedback follows notifications.md for toast-level outcomes and error-state.md for blocking failures. No new atoms or structural primitives are introduced.

The platform serves Arabic and English speakers. All directional properties use logical CSS. `autocomplete` attributes are mandatory on all credential fields. The OTP input must support both numeric keyboard on mobile and standard keyboard on desktop.

---

## 2. Flows

### 2.1 Login

The login flow authenticates a returning user. Entry points: the login route accessed directly, a redirect from a protected route, or the "Sign in" action within the onboarding flow.

**Steps:**

1. User arrives on the login surface. The form renders with the identifier field focused.
2. User enters their identifier (email or phone) and password.
3. User submits. The submit Button enters its loading state.
4. On success: the session is established and the user is redirected to their intended destination (or Home if no destination was stored).
5. On failure: an inline error appears on the relevant field or a form-level error summary appears above the fields.

**Switch path:** A "Create account" Link below the form navigates to the signup surface. No data entered in the login form is transferred.

**Forgot password path:** A "Forgot password?" Link below the password field initiates the password reset sub-flow. The identifier field value is carried forward if it was already entered.

---

### 2.2 Signup

The signup flow creates a new user account. Entry points: the signup route accessed directly, a "Create account" Link from the login surface, or the identity step of the onboarding flow.

**Steps:**

1. User arrives on the signup surface. The form renders with the name field focused.
2. User enters their full name, email address or phone number, and a password.
3. User submits. The submit Button enters its loading state.
4. If the platform requires email or phone verification: the user is redirected to the OTP verification sub-flow.
5. If no verification is required: the session is established and the user is redirected to the next onboarding step or Home.
6. On failure: field-level errors appear inline. A form-level error summary appears above the fields for multi-field failures.

**Switch path:** A "Sign in" Link below the form navigates to the login surface. No data is transferred.

---

### 2.3 OTP Verification

The OTP verification sub-flow confirms ownership of a phone number or email address. It is triggered after signup when the platform requires identity verification, or as the primary authentication mechanism for phone-based login.

**Steps:**

1. User arrives on the OTP surface after submitting their phone number or email. The surface displays the destination the code was sent to (partially masked: `+971 •••• 4521` or `k••••@gmail.com`).
2. User enters the OTP code in the OTP input field.
3. User submits. The submit Button enters its loading state.
4. On success: the session is established or the next flow step is triggered.
5. On failure (wrong code): an inline error appears on the OTP field. The code attempt count is tracked.
6. On expiry: the OTP field is disabled. A "Resend code" Link appears. Activating it requests a new code and resets the expiry timer.
7. On retry limit reached: the locked state is shown. No further attempts are permitted until the cooldown period expires.

**Resend behavior:** The "Resend code" Link is inactive for 60 seconds after each code is sent. A countdown ("Resend in 0:48") is displayed using `color.text.subtle`. After 60 seconds the Link activates.

---

### 2.4 Forgot Password / Reset Password

The password reset sub-flow allows a user who cannot access their account to set a new password. It is initiated from the "Forgot password?" Link on the login surface.

**Steps:**

1. **Request step** — User enters their registered email address. User submits. The submit Button enters its loading state. On success, a success inline notification appears: "Check your email for a reset link." The form is replaced by a confirmation message. If the email is not registered, the same confirmation message is shown — the system does not confirm whether an account exists for a given email (enumeration prevention).
2. **Reset step** — User arrives via the link in their email. The reset surface presents a new password field and a confirm password field. User submits. On success: the session is established and the user is redirected to Home with a success notification toast.
3. **Expired link** — If the reset link has expired, the reset surface shows the error-state.md page-level error variant with a "Request a new link" Button that returns the user to step 1.

---

## 3. Composition

| Atom / Pattern | Role |
|---|---|
| Form | Governs all field layout, label association, validation timing, error summary, and submission behavior across every authentication surface. The Form pattern is the primary structural container for all authentication steps. |
| Input (email) | Email address field. `type="email"`. `autocomplete="email"`. Applied in login, signup, and password reset request. |
| Input (tel) | Phone number field. `type="tel"`. `autocomplete="tel"`. Applied in phone-based login and signup. |
| Input (password) | Password entry field. `type="password"`. `autocomplete="current-password"` on login; `autocomplete="new-password"` on signup and reset. Includes a show/hide toggle using an Icon Button. |
| Input (OTP) | Single-field or segmented numeric code input. `type="text"`. `inputmode="numeric"`. `autocomplete="one-time-code"`. Applied in the OTP verification sub-flow. |
| Input (text) | Full name field. `autocomplete="name"`. Applied in signup only. |
| Button (primary) | The submit action on every form step. Label varies by step: "Sign in", "Create account", "Verify", "Send reset link", "Set new password". Enters loading state on activation. Disabled until required fields pass client-side format validation. |
| Button (secondary) | Alternative path actions where a lower-weight action exists alongside the primary: "Resend code" in OTP verification (rendered as a Link when inactive, as a Button when active). |
| Link | Inline switching and navigation controls: "Forgot password?", "Create account", "Sign in", "Back to login". All Links carry a clear destination label. |
| Icon | Leading icon in error banners and success confirmation areas. `aria-hidden="true"` when adjacent text carries the semantic meaning. |
| Dialog | Used for the session-expired scenario: a blocking Dialog informs the user their session has ended and presents a "Sign in again" Button. This Dialog uses `role="alertdialog"` — it cannot be dismissed without signing in again. |

**OTP input structure**

The OTP input is a single Input field accepting the full code as one value. It does not use a multi-cell segmented layout — segmented inputs create accessibility and autocomplete problems. The field accepts the full OTP as pasted or typed text. `autocomplete="one-time-code"` enables SMS autofill on supported devices.

**Token reference — surface and layout**

| Part | Token | Role |
|---|---|---|
| Page / card background | `color.background.surface` | Authentication card surface. |
| Page canvas | `color.background.sunken` | Recessed background behind the centered card. |
| Card border | `color.border.subtle` | Low-emphasis card edge. |
| Card radius | `radius.xl` | Corner rounding on the authentication card. |
| Card padding | `spacing.layout.sm` | Internal padding on all sides. |
| Form heading text | `color.text.primary` | Step title: "Sign in", "Create your account", etc. |
| Form heading size | `text.heading.md` | Heading within the authentication card. |
| Subheading / instruction text | `color.text.secondary` | Supporting sentence below the form heading. |
| Subheading size | `text.body.md` | Default body size. |
| Toggle Link color | `color.text.brand` | "Create account" / "Sign in" switch Link. |
| Masked destination text | `color.text.secondary` | Partially masked email or phone in OTP surface. |
| OTP resend countdown text | `color.text.subtle` | "Resend in 0:48" countdown label. |
| Locked state background | `color.background.danger` | Background of the locked / retry-limit-reached banner. |
| Locked state text | `color.text.danger` | Message text in the locked state banner. |
| Gap — heading to form | `spacing.lg` | Vertical space between heading and first field. |
| Gap — form to secondary actions | `spacing.md` | Vertical space between submit Button and switch Link. |
| Gap — between action Links | `spacing.sm` | Vertical space between "Forgot password?" and "Create account" Links. |
| Card entry transition | `motion.enter` | Card appearing on initial route load. |
| Error shake transition | `motion.fast` | Brief visual emphasis on field or form-level error appearance. |

---

## 4. Variants

| Variant | Identifier | Password required | OTP step |
|---|---|---|---|
| Email login | Email address | Yes | No |
| Phone login | Phone number | Yes | No |
| OTP login | Phone number | No | Yes — OTP replaces password |
| Social login (optional) | OAuth provider token | No | No — handled by provider |

**Social login**

When the platform supports OAuth-based social login (Google, Apple), each provider is represented by a Button using the provider's icon and name: "Continue with Google", "Continue with Apple." These Buttons appear above the email/phone form, separated by a divider labelled "or." The OAuth redirect and callback are outside this flow's scope — the system handles the provider result and either establishes a session (success path) or shows an error (failure path) on return.

Social login Buttons are secondary in visual weight relative to the primary email/phone form. They are never the default or only option.

---

## 5. Behavior

### Validation

Client-side validation runs on blur for each field. The submit Button is disabled until all required fields have a non-empty value that passes format checks. Validation does not run on mount — fields are not shown as invalid before the user has interacted with them.

| Field | Format rule |
|---|---|
| Email | Must contain `@` and a domain. RFC 5322-compatible check. |
| Phone | Must match the expected format for the selected country code. |
| Password (login) | Non-empty. No client-side strength check on login — server validates credentials. |
| Password (signup) | Minimum 8 characters. At least one number or special character. Strength indicator shown below the field using the Input atom's helper text. |
| Confirm password (reset) | Must match the new password field exactly. Validated on blur of the confirm field. |
| OTP | Numeric. Exactly the expected code length (4 or 6 digits depending on configuration). |

### Error handling

**Invalid credentials (login):** A form-level error summary appears above the fields: "Incorrect email or password." Neither field is pre-cleared. Focus moves to the error summary. The user can correct either field and resubmit.

**Email already registered (signup):** An inline error on the email field: "An account with this email already exists." A Link inline within the error message: "Sign in instead." Activating it navigates to the login surface with the email field pre-filled.

**Expired OTP:** The OTP field is disabled. An inline message appears below it: "This code has expired." The "Resend code" control activates immediately — no 60-second wait on the first expiry.

**Wrong OTP:** An inline error on the OTP field: "Incorrect code. [N] attempts remaining." On the final attempt before lockout: "Incorrect code. 1 attempt remaining — after this, you'll need to request a new code."

**Network error on submission:** The submit Button restores from loading state. An inline error-state.md non-blocking banner appears above the form: "Couldn't connect. Check your connection and try again." The form fields retain their values.

**Server error on submission:** Same surface as network error. Message: "Something went wrong on our end. Try again." A reference number is displayed if the server provides one.

### Success navigation

After successful login or signup: the user is redirected to their stored intended destination (the route they were attempting to reach before being redirected to authentication). If no destination was stored, they are redirected to Home.

After successful password reset: the user is redirected to Home with a success notification toast: "Password updated. You're signed in."

After successful OTP verification during signup: the user continues to the next step in the onboarding flow or is redirected to Home if onboarding is not active.

### Retry flows

After a failed login attempt, the user may retry immediately. The form retains all field values. Only the password field value is cleared if the credentials were invalid — email is preserved to reduce re-entry friction.

After the OTP retry limit is reached, the user must wait for the cooldown period before requesting a new code. The locked state shows the remaining wait time, updated every second: "Try again in 4:32."

After a failed password reset link (expired), the user is directed back to the request step. The email field is pre-filled with their previously entered address.

---

## 6. States

| State | Surface change | Token behavior |
|---|---|---|
| Default | Form fields rendered, unfocused. Submit Button enabled (if fields pre-filled) or disabled. | All surfaces at base token values. |
| Loading | Submit Button in loading state — label replaced by Spinner. Form fields non-interactive. | Spinner: `color.text.secondary`. Button: loading variant per button.md. |
| Error — field level | Inline error message below the affected field. Input border transitions to error state. Submit Button re-enabled after error display. | Per input.md error state tokens. Error text: `color.text.danger`. |
| Error — form level | Error summary banner above the form fields. Lists all field errors. Focus moves to the summary. | Error summary: `color.background.danger`, `color.border.danger`, `color.text.danger`. Per form.md error summary tokens. |
| Error — blocking | Page-level error card (network, server). Form fields retained. Retry action available. | Per error-state.md page-level variant tokens. |
| Success | Form replaced by confirmation message (password reset request, OTP resend). Or session established and redirect fires. Success toast appears. | Confirmation icon: `color.status.success`. Toast: per notifications.md success token set. |
| Locked | OTP field disabled. Retry limit banner visible. Countdown timer shown. No submit action available until cooldown expires. | Locked banner background: `color.background.danger`. Locked text: `color.text.danger`. Countdown: `color.text.subtle`. |

---

## 7. Accessibility

**Landmark and heading structure**

Each authentication surface must have a `<main>` landmark containing the authentication card. The card heading (`<h1>`) names the current step: "Sign in", "Create your account", "Verify your phone", "Reset your password." The heading is the accessible name of the surface.

**Required ARIA attributes**

| Attribute | Applied to | Purpose |
|---|---|---|
| `aria-live="assertive"` | Form-level error summary | Announces submission errors immediately when they appear. |
| `aria-atomic="true"` | Form-level error summary | Ensures the full error summary is read as a unit. |
| `aria-describedby` | Each Input field in error state | References the field's error message element. |
| `aria-invalid="true"` | Each Input field in error state | Signals the field has an invalid value. |
| `aria-busy="true"` | Form container during loading | Set when the submit request is in progress. Removed on resolution. |
| `aria-live="polite"` | OTP resend countdown region | Announces countdown updates without interrupting the user. |
| `aria-label="Show password"` / `aria-label="Hide password"` | Password visibility Icon Button | Names the toggle action accurately based on current state. |
| `role="alertdialog"` | Session-expired Dialog | Identifies the Dialog as a high-urgency alert requiring action. |
| `aria-labelledby` | Session-expired Dialog | References the Dialog title element. |
| `autocomplete` | All credential Inputs | Enables browser and OS autofill. Specific values per field listed in Composition. |

**Keyboard navigation**

- Tab moves through fields in document order: name → email/phone → password → submit Button → secondary Links.
- Within the OTP field, the user types or pastes the full code. Tab moves to the submit Button.
- Enter submits the form when focus is on any field within it — equivalent to activating the submit Button.
- Escape closes the session-expired Dialog only if a "Maybe later" action exists. If sign-in is mandatory to continue, Escape has no effect and this is communicated via `aria-label` on the Dialog.
- The password show/hide Icon Button is reachable by Tab and activated by Enter or Space.

**Focus management**

- On mount, focus is placed on the first empty required field (typically email/phone or name on signup).
- On submission failure, focus moves to the form-level error summary if one is present, or to the first field in error if the failure is field-level only.
- On the OTP surface, focus is placed on the OTP Input field immediately on mount.
- On success redirect, focus follows the navigation-flow.md rules for the destination route.
- On the session-expired Dialog opening, focus moves to the "Sign in again" Button.

**Error announcements**

Field-level errors are announced via `aria-describedby` as the user tabs off the field. Form-level errors are announced via `aria-live="assertive"` on submission. The content of each error must name the problem explicitly — it is the only communication an assistive technology user receives about why submission failed.

**Color contrast**

All text must meet WCAG 2.1 AA: minimum 4.5:1 for body text and field labels, minimum 3:1 for large text and UI component boundaries. Error states must not be communicated by color alone — the `aria-invalid` attribute, the error icon, and the error message text together provide redundant non-color signals.

**Language and script**

For Arabic users, all field labels, placeholders, error messages, and Button labels must be presented in Arabic. The OTP input's `inputmode="numeric"` must use Eastern Arabic numerals where appropriate for the locale. RTL layout is applied to the authentication card in full — field layout, label positions, error message alignment, and Button order all follow the logical CSS direction model.

---

## 8. Content Guidelines

**Form headings**

- Login: "Sign in." Not "Welcome back", "Login", or "Log in to your account."
- Signup: "Create your account." Not "Join us", "Register", or "Get started."
- OTP: "Enter your verification code." Not "OTP" or "One-time passcode" — these are technical terms.
- Password reset request: "Forgot your password?" Not "Account recovery" or "Reset password."
- Password reset: "Set a new password." Not "Update password" or "Create password."

**Field labels**

- Email: "Email address." Not "Email" alone — "address" clarifies the expected format.
- Phone: "Phone number." Include a country code selector where required.
- Password (login): "Password."
- Password (signup): "Create a password."
- Confirm password: "Confirm your password."
- OTP: "Verification code."
- Name: "Full name."

**Submit Button labels**

- Login: "Sign in."
- Signup: "Create account."
- OTP: "Verify."
- Password reset request: "Send reset link."
- Password reset: "Set new password."

Do not use "Submit", "Continue", "Next", or "OK" on any authentication submit Button. The label must name the specific outcome.

**Switch Links**

- From login to signup: "Don't have an account? Create one."
- From signup to login: "Already have an account? Sign in."
- Do not use "Click here" or bare "Sign up" / "Log in" without context.

**Error messages**

- Invalid credentials: "Incorrect email or password." Not "Invalid credentials" or "Authentication failed."
- Email not found (signup context only — not on login, to prevent enumeration): "No account found with this email. Create an account instead."
- Email already registered: "An account with this email already exists. Sign in instead."
- Wrong OTP: "Incorrect code. [N] attempts remaining."
- Expired OTP: "This code has expired. Request a new one."
- Weak password: "Password must be at least 8 characters and include a number or special character."
- Passwords do not match: "Passwords don't match. Check and try again."
- Network error: "Couldn't connect. Check your connection and try again."
- Server error: "Something went wrong on our end. Try again."
- Locked: "Too many attempts. Try again in [time]." Not "Account temporarily locked" — that language implies a penalty.

**OTP surface**

- Show the destination clearly: "We sent a 6-digit code to k••••@gmail.com."
- Resend Link inactive: "Resend code in 0:48." Not "Resend" with a disabled state and no explanation.
- Resend Link active: "Resend code." Not "Send again."

**Password reset confirmation**

- "Check your email. If an account exists for that address, we've sent a reset link." (Enumeration-safe: does not confirm whether an account exists.)

**Session-expired Dialog**

- Title: "Your session has ended."
- Body: "Sign in again to continue where you left off."
- Action: "Sign in again." Not "OK" or "Dismiss."

---

## 9. Cross References

- form.md
- input.md
- button.md
- icon.md
- icon-button.md
- link.md
- dialog.md
- notifications.md
- error-state.md
- onboarding-flow.md
- navigation-flow.md
- spinner.md
- token-reference.md

---

## When to use

- A user attempts to access a session-protected action or route while unauthenticated — surface the login sub-flow with a return destination.
- A user initiates account creation to persist identity, booking history, saved trips, and payment methods across sessions.
- An authenticated session has expired and the user must re-authenticate to continue from where they stopped.
- A user has forgotten their password and needs to recover access through a verified reset flow.

---

## When not to use

- For guest users accessing non-authenticated features — do not force authentication before the user has seen product value.
- When the user has not triggered a session-protected action — defer authentication to the first moment it is genuinely required.
- As a blocking modal over general browsing — authentication surfaces only in response to a specific user action that requires identity.
