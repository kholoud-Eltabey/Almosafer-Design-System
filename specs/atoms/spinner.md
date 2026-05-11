---
name: Spinner
tier: atom
status: draft
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Spinner

---

## 1. Overview

A spinner indicates that a process is in progress and its duration is unknown. It communicates that the system is working without specifying how long that work will take. It appears on demand, persists only while the operation is active, and disappears immediately on completion.

A spinner is not decoration. It is a functional signal. It must never appear unless work is genuinely in progress, and it must never persist after the work is done.

---

## 2. When to Use

- An asynchronous operation has been triggered and its duration cannot be predicted — data fetching, file uploads, form submission with server validation.
- A page section is waiting for content to load before it can render.
- A button has been activated and its action is processing — paired with the loading state of the button component.
- A full-page or full-panel transition is in progress and the interface is temporarily unavailable.
- An operation in the background needs to surface its active status without blocking the full interface.

---

## 3. When Not to Use

- **When the operation duration is known** — Use a progress bar. A spinner provides no sense of progress; a determinate indicator respects the user's time by communicating completion percentage.
- **When the operation completes in under one second** — Do not show a spinner. Flashing a spinner for a fast operation creates visual noise without communicating anything useful. Debounce appearance to avoid unnecessary renders.
- **As the only feedback for a critical failure** — If an operation fails, replace the spinner immediately with an error state. A spinner that stops without feedback is a broken experience.
- **As decoration or ambient motion** — Every spinner must correspond to a real, active system operation. Decorative spinning is banned by the motion foundation.
- **When a skeleton screen or placeholder content is more appropriate** — For content-heavy regions with predictable shape, a skeleton communicates structure before content arrives. A spinner communicates only wait.

---

## 4. Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | The bounding element for the spinner component. Carries size tokens. Centers the indicator within the available space. Carries `role="status"` and the `aria-live` region for screen reader announcements. |
| Track | Conditional | A static, full-circle ring forming the background of the rotating indicator. Provides visual continuity and makes the animated arc easier to perceive. Present on default and inline variants. Not used on the inverse variant where the surface contrast already defines the indicator clearly. |
| Indicator | Yes | The rotating arc that signals active work. A partial-circle arc rendered as an SVG stroke. Animated using the motion foundation's easing system. Inherits its color from the active variant's color token. |
| Accessible text | Conditional | A visually hidden text node inside the container, read by screen readers as the `aria-live` announcement. Defaults to "Loading". Should be replaced with a specific message when the operation has known context: "Saving changes", "Loading comments". Not visible by default but must always be present in the DOM for the live region to function. |

---

## 5. Tokens Used

| Part | Token | Role |
|---|---|---|
| Indicator — default variant | `color.text.brand` | Rotating arc color on light and neutral surfaces |
| Indicator — inverse variant | `color.text.inverse` | Rotating arc color on dark or brand-colored surfaces |
| Indicator — inline variant | Inherits via `currentColor` | Arc color matches surrounding text or button label color |
| Indicator — paused state | `color.text.disabled` | Indicator color when animation is suspended by reduced motion preference |
| Track — default variant | `color.border.subtle` | Static background ring on light and neutral surfaces |
| Track — inline variant | `color.border.subtle` | Static background ring in inline contexts |
| Container — size, small | `spacing.sm` | Width and height of the small spinner |
| Container — size, medium | `spacing.md` | Width and height of the medium spinner |
| Container — size, large | `spacing.lg` | Width and height of the large spinner |
| Entry transition | `motion.enter` | Opacity transition when the spinner appears |
| Exit transition | `motion.exit` | Opacity transition when the spinner disappears |

**Note on rotation:** The indicator's rotation is a purposeful loading animation, not a decorative loop. It is implemented using the motion foundation's easing values and must respect `prefers-reduced-motion`. When reduced motion is active, the rotation is suspended and the indicator renders as a static arc. The enter and exit opacity transitions remain active under reduced motion at the shortest available duration.

---

## 6. Variants

### Default

For use on light and neutral page surfaces. The track provides a subtle background ring. The indicator uses brand color to signal active system work.

| Part | Token |
|---|---|
| Indicator | `color.text.brand` |
| Track | `color.border.subtle` |

This is the standard spinner for most page, panel, and form loading contexts.

---

### Inverse

For use on dark surfaces, brand-colored backgrounds, or filled button loading states. No track is rendered — the surface contrast defines the indicator clearly against the background.

| Part | Token |
|---|---|
| Indicator | `color.text.inverse` |
| Track | Not rendered |

Use the inverse variant inside filled buttons during loading, inside dark panels, and on brand-colored banners.

---

### Inline

For use embedded within a line of text, a form field, or alongside a label where the spinner must flow with surrounding content. The indicator inherits its color from the surrounding text context via `currentColor`. This variant scales to match its typographic context — it does not define a fixed size outside the size table below.

| Part | Token |
|---|---|
| Indicator | `currentColor` (inherits) |
| Track | `color.border.subtle` |

Use the inline variant inside icon buttons during loading, within table cell loading states, and in search fields during query processing.

---

## 7. Sizes

| Size | Container token | Use case |
|---|---|---|
| Small | `spacing.sm` | Inline contexts, compact table cells, icon button loading states, dense list items. |
| Medium | `spacing.md` | Default. Panel loading states, card content areas, standard form submission. |
| Large | `spacing.lg` | Full-page loading, section-level blocking states, prominent empty-state loading. |

All sizes use the same indicator arc weight and track weight proportionally. Do not set container dimensions in raw values. Do not use different sizes for width and height — the spinner is always square.

---

## 8. States

| State | Indicator | Track | Animation | Notes |
|---|---|---|---|---|
| Loading | Variant default color | Variant default | Active rotation | The only state in which the spinner is interactive with the system. `aria-live="polite"` region announces to screen readers. |
| Paused | `color.text.disabled` | `color.border.subtle` | Suspended | Applied when `prefers-reduced-motion: reduce` is active. The spinner is visible as a static arc. No rotation occurs. The live region still announces loading state. |
| Hidden | Not rendered | Not rendered | None | The spinner is removed from the DOM or set to `display: none` when the operation completes. It must not linger. Removal triggers the exit transition before unmounting. |

**Rules:**

- The spinner must never persist after the operation completes. Implement a maximum visible duration as a safety timeout for operations that fail to return a response — surface an error state rather than spinning indefinitely.
- The paused state is not a user-controlled state. It is exclusively controlled by the user's system motion preference via `prefers-reduced-motion`. Do not expose a pause control.
- Transitioning from loading to hidden uses `motion.exit`. Do not remove the spinner abruptly — the exit transition confirms to the user that the operation concluded.

---

## 9. Behavior

**Appearance**
- The spinner appears using the `motion.enter` opacity transition. It does not animate in from a position — it fades in where it is placed.
- Debounce appearance by a short delay when the operation is likely to complete quickly. This prevents the spinner from flashing for fast operations. The debounce threshold is set at the implementation level, not within the spinner component.

**Disappearance**
- When the operation completes (success or failure), the spinner exits using the `motion.exit` opacity transition, then is removed from the DOM.
- Do not replace the spinner with a success icon or status indicator — that responsibility belongs to the parent component or pattern.

**Rotation**
- The indicator rotates to signal continuous active work. Rotation is purposeful, not decorative, and corresponds directly to a real system operation.
- The rotation animation uses the motion foundation's easing values and must be implemented without arbitrary duration values or easing curves outside the defined system.
- The rotation does not convey progress. It conveys presence of work only. It is not a progress bar.

**Reduced motion**
- When `prefers-reduced-motion: reduce` is active, the rotation is fully suspended. The spinner remains visible as a static arc in the paused state, with the indicator rendered in `color.text.disabled` to signal it is non-animated intentionally.
- The enter and exit opacity transitions remain active under reduced motion, as they communicate appearance and disappearance rather than continuous motion.
- Do not substitute a pulsing opacity animation for the rotation under reduced motion. Static is the correct reduced-motion state for a spinner.

**Blocking vs non-blocking**
- A full-page or full-section spinner may be positioned over content using an overlay. This overlay must not trap keyboard focus. Users must still be able to navigate away from the loading section.
- An inline or button spinner does not use an overlay. It replaces the existing content (icon or label) within the control's bounding box without changing dimensions.

**Screen reader announcements**
- The `aria-live="polite"` region announces the loading text when the spinner appears. `polite` ensures the announcement does not interrupt content already being read.
- Use `aria-live="assertive"` only when the loading state represents a system interruption that the user must be aware of immediately — not for standard background operations.

---

## 10. Accessibility

| Requirement | Rule |
|---|---|
| Live region | The spinner container must carry `role="status"` and `aria-live="polite"`. This announces the loading text to screen readers when the spinner is inserted into the DOM. |
| Accessible text | A visually hidden text node must be present inside the spinner container at all times during the loading state. The text must describe what is loading when context is known. Default text is "Loading". |
| Indicator is decorative | The SVG indicator and track carry `aria-hidden="true"`. The live region text is the only accessible content. The indicator is a visual signal only. |
| Avoid focus trapping | A spinner overlay must never trap keyboard focus. Users must retain the ability to navigate the page, activate skip links, or dismiss the loading state if the interface allows. |
| Reduced motion | The rotation animation must be suspended when `prefers-reduced-motion: reduce` is active. This is not optional. Rotating spinners can cause vestibular disruption for motion-sensitive users. |
| Long loading feedback | For operations expected to take more than a few seconds, supplement the spinner with a visible text label outside the visually hidden region. Inform the user what is happening and, if possible, reassure them the system is working. |
| No duration dependency | No interface element must gate usability on the spinner completing. All interactive controls outside the loading region must remain accessible. |
| WCAG criteria | Applies SC 1.3.1 (Info and Relationships), SC 1.4.3 (Contrast Minimum), SC 2.1.2 (No Keyboard Trap), SC 2.3.3 (Animation from Interactions — AAA, recommended), SC 4.1.3 (Status Messages). |

---

## 11. Content Guidelines

- **Default text is "Loading" — replace it when context exists.** "Loading comments", "Saving changes", "Verifying email address" tells the user specifically what is happening. "Loading" alone is acceptable only when no context is available.
- **Write in present continuous tense.** "Saving" not "Save". "Loading" not "Load". The operation is active, and the message should reflect that.
- **Do not promise a duration.** Do not write "Loading, this may take a moment" unless you have confirmed the operation is long-running. False reassurance undermines trust.
- **Do not show a spinner without any context in a critical path.** If the operation is payment processing, identity verification, or data deletion, pair the spinner with a visible label outside the live region so sighted users also understand what is happening.
- **Keep loading messages short.** One to five words. Screen readers announce the full message on insertion. Long messages interrupt the reading flow for no benefit.
- **Do not use ellipsis in loading text.** "Loading..." is not meaningfully different from "Loading" and the punctuation adds no information. Use the plain word.
- **Replace the message on failure.** When loading ends in an error, the spinner is removed and a specific, actionable error message must appear. Do not leave the user in a silent failed state.

---

## 12. Code Example

```html
<!-- Default spinner — medium, with accessible text -->
<div class="spinner spinner--md" role="status" aria-live="polite" aria-label="Loading">
  <svg class="spinner__indicator" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle class="spinner__track" cx="12" cy="12" r="10" />
    <circle class="spinner__arc" cx="12" cy="12" r="10" />
  </svg>
  <span class="visually-hidden">Loading</span>
</div>

<!-- Default spinner — with specific context message -->
<div class="spinner spinner--md" role="status" aria-live="polite">
  <svg class="spinner__indicator" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle class="spinner__track" cx="12" cy="12" r="10" />
    <circle class="spinner__arc" cx="12" cy="12" r="10" />
  </svg>
  <span class="visually-hidden">Saving changes</span>
</div>

<!-- Inverse spinner — medium, for dark surfaces -->
<div class="spinner spinner--md spinner--inverse" role="status" aria-live="polite">
  <svg class="spinner__indicator" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle class="spinner__arc" cx="12" cy="12" r="10" />
  </svg>
  <span class="visually-hidden">Loading</span>
</div>

<!-- Inline spinner — small, inside a button loading state -->
<button class="button is-loading" type="button" aria-busy="true" aria-disabled="true"
        aria-label="Saving">
  <span class="spinner spinner--sm spinner--inline" role="status" aria-live="polite">
    <svg class="spinner__indicator" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle class="spinner__track" cx="12" cy="12" r="10" />
      <circle class="spinner__arc" cx="12" cy="12" r="10" />
    </svg>
    <span class="visually-hidden">Saving</span>
  </span>
</button>

<!-- Large spinner — full-section loading -->
<div class="spinner spinner--lg" role="status" aria-live="polite">
  <svg class="spinner__indicator" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle class="spinner__track" cx="12" cy="12" r="10" />
    <circle class="spinner__arc" cx="12" cy="12" r="10" />
  </svg>
  <span class="visually-hidden">Loading dashboard</span>
</div>
```

```css
/* Base container */
.spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: spinner-fade-in var(--motion-enter) both;
}

/* Sizes */
.spinner--sm {
  width: var(--spacing-sm);
  height: var(--spacing-sm);
}

.spinner--md {
  width: var(--spacing-md);
  height: var(--spacing-md);
}

.spinner--lg {
  width: var(--spacing-lg);
  height: var(--spacing-lg);
}

/* SVG fills the container */
.spinner__indicator {
  width: 100%;
  height: 100%;
}

/* Track — static background ring */
.spinner__track {
  fill: none;
  stroke: var(--color-border-subtle);
  stroke-width: 2;
}

/* Rotating arc — default variant */
.spinner__arc {
  fill: none;
  stroke: var(--color-text-brand);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 40 60;
  transform-origin: center;
  animation: spinner-rotate var(--motion-normal) linear infinite;
}

/* Inverse variant */
.spinner--inverse .spinner__arc {
  stroke: var(--color-text-inverse);
}

.spinner--inverse .spinner__track {
  display: none;
}

/* Inline variant — inherits color */
.spinner--inline .spinner__arc {
  stroke: currentColor;
}

/* Entry fade */
@keyframes spinner-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Rotation — references motion foundation easing */
@keyframes spinner-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Exit — applied before removal */
.spinner.is-exiting {
  animation: spinner-fade-out var(--motion-exit) both;
}

@keyframes spinner-fade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}

/* Reduced motion — suspend rotation, render static arc */
@media (prefers-reduced-motion: reduce) {
  .spinner__arc {
    animation: none;
    stroke: var(--color-text-disabled);
  }

  .spinner {
    animation: none;
  }
}

/* Visually hidden utility */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## 13. Cross References

- [button.md](./button.md) — The loading state of a button uses the inline spinner variant; the inverse spinner variant applies inside filled buttons
- [icon.md](./icon.md) — The spinner indicator follows the same SVG and color token conventions as icons; both use `aria-hidden="true"` on the glyph
- [motion.md](../foundations/motion.md) — Motion foundation governing all duration and easing values; defines the reduced motion accessibility requirement and the prohibition on arbitrary looping animations
- [token-reference.md](../tokens/token-reference.md) — Full token definitions for all values used by this component
