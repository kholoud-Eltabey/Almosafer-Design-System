---
name: Motion Foundation
tier: foundation
status: stable
last-updated: 2026-05-06
maintainer: Team 4
source: Almosafer Design System
---

# Motion Foundation

This file defines the primitive motion layer of the design system. It is the only place where duration values and easing functions are declared. All animation and transition decisions in components and patterns must trace back to this file.

---

## 1. Philosophy

Motion communicates state. It confirms actions, signals transitions, and maintains spatial continuity. It is not decoration. Every animated property must justify its existence against a user need.

**Rules:**

- Motion must be purposeful. If removing an animation does not reduce clarity or feedback quality, the animation should not exist.
- Motion must be fast. The system defaults to short durations. Slow animations create perceived latency.
- Motion must be predictable. The same interaction produces the same motion response every time.
- Motion must be subtle. Nothing in the UI should demand attention for its own sake.
- Primitives are reference values. They are not consumed directly by components or patterns.
- The token layer is required. All component-level motion passes through semantic tokens.
- Arbitrary duration and easing values are banned. If a value is not in the scale, it does not exist in the system.

---

## 2. Motion System Structure

The system defines motion through two primitive categories: **duration** and **easing**. A complete motion decision always combines one duration value with one easing function. Neither is used in isolation.

**Separation of concerns:**

```
Motion primitives (this file)
    ↓
Motion tokens (semantic layer)
    ↓
Components and patterns (tokens only)
```

Primitives carry no context. A token such as `motion.transition.interactive.default` carries meaning — it maps to the correct duration and easing combination for that interaction type. The component does not select primitives directly.

**Scale and consistency:**

Motion must feel uniform across the product. A hover state on a button and a hover state on a table row must resolve to the same token and therefore the same duration and easing. Consistency at the primitive level makes this possible.

---

## 3. Duration Scale — Layer 1 (Primitives)

| Token | Value | Usage note |
|---|---|---|
| `duration-50` | `50ms` | Micro feedback. Instant-feeling responses. Color and opacity changes on hover. |
| `duration-100` | `100ms` | Fast feedback. Icon state changes, subtle indicator transitions. |
| `duration-150` | `150ms` | Default interactive feedback. Button press, checkbox toggle, focus ring appearance. |
| `duration-200` | `200ms` | Standard transition. Dropdown open, tooltip appear, tab switch. |
| `duration-300` | `300ms` | Medium transition. Panel expand, accordion open, slide-in overlays. |
| `duration-400` | `400ms` | Deliberate transition. Modal enter, drawer open, page-level state change. |
| `duration-500` | `500ms` | Maximum. Reserved for complex layout transitions with spatial continuity. |

Values above `duration-500` are not permitted. Any interaction requiring more than 500ms of animation indicates an architectural problem, not a missing duration step.

---

## 4. Easing Functions

Easing defines the acceleration curve of a transition. Three curves cover all system interactions. Do not introduce custom curves outside these definitions.

| Token | Value | Usage note |
|---|---|---|
| `easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default. Elements that stay on screen. State changes, property transitions, hover effects. |
| `easing-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the viewport. Modals, drawers, tooltips, dropdowns appearing. Decelerates into position. |
| `easing-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the viewport. Dismissing overlays, collapsing panels. Accelerates out. |

**Rules:**

- `easing-standard` is the default for all transitions not involving enter or exit.
- `easing-enter` and `easing-exit` are paired. An element that enters with `easing-enter` must exit with `easing-exit`.
- Do not use `linear` easing. Linear motion feels mechanical and unnatural at UI scale.
- Do not use `ease`, `ease-in`, `ease-out`, or `ease-in-out` keywords. Use the defined cubic-bezier values only.
- Do not invent new easing curves for individual components.

---

## 5. Usage Rules

| Rule | Detail |
|---|---|
| Primitives are not used in components | No atom or pattern spec may reference `duration-150` or `easing-standard` directly. |
| Token layer is mandatory | All component motion references a semantic token. The token maps to a duration and easing combination. |
| No arbitrary durations | `transition: 250ms`, `animation-duration: 0.35s`, `transition: 0.6s ease` are not permitted. |
| No arbitrary easing | Do not write inline cubic-bezier values in component specs. Use the defined primitives through tokens. |
| Duration and easing are always paired | A motion decision is never duration alone or easing alone. Every transition declares both. |
| Keep animations short | Default to the shortest duration that communicates the state change clearly. Do not use longer durations to appear more "polished". |
| Consistency is mandatory | The same interaction type must resolve to the same token across all components. Hover states do not have different durations on different components. |
| Decorative animation is banned | Animation that does not communicate state, transition, or spatial relationship is not permitted in the system. |

---

## 6. Interaction Principles

Motion in this system serves three and only three purposes.

**Feedback**
Confirms that an interaction was received. Hover, press, focus, and toggle states use motion to acknowledge user input immediately. Feedback motion is always fast (`duration-50` to `duration-150`) and uses `easing-standard`.

**Transition**
Communicates a change in component or view state. Opening a dropdown, switching a tab, expanding an accordion. Transition motion uses the mid-range of the duration scale (`duration-200` to `duration-300`) and pairs `easing-enter` or `easing-exit` with `easing-standard` depending on direction.

**Continuity**
Maintains spatial orientation during layout changes. Navigation transitions, drawer opens, modal overlays. Continuity motion uses the longer durations (`duration-300` to `duration-500`) and always uses directional easing — `easing-enter` for elements arriving, `easing-exit` for elements departing.

| Purpose | Duration range | Easing |
|---|---|---|
| Feedback | `duration-50` – `duration-150` | `easing-standard` |
| Transition | `duration-200` – `duration-300` | `easing-standard`, `easing-enter`, `easing-exit` |
| Continuity | `duration-300` – `duration-500` | `easing-enter` + `easing-exit` (paired) |

---

## 7. Accessibility

Motion is a potential barrier. Users with vestibular disorders, epilepsy, or motion sensitivity may be harmed by animation. The system takes this seriously.

| Requirement | Rule |
|---|---|
| Reduced motion support | All animations must respect the `prefers-reduced-motion: reduce` media query. When reduced motion is active, transitions must either be instant (`duration-0`) or replaced with a non-motion equivalent (opacity fade at `duration-100` maximum). |
| No looping animations | Continuously looping animations are not permitted in the system. Use loading indicators with discrete states rather than infinite loops. |
| No large motion paths | Avoid animating elements across significant distances. Large position changes are disorienting for motion-sensitive users. |
| No flashing content | Do not animate opacity, color, or brightness in rapid sequences. Content that flashes more than three times per second violates WCAG 2.3.1 (AAA) and causes seizure risk. |
| Motion does not gate usability | No interaction or information must be dependent on animation completing. Users who disable animation must have full access to all functionality. |
| Predictability | The same action always produces the same motion response. Unpredictable motion is disorienting. Do not vary duration or easing based on content size, user state, or context unless defined at the token level. |

---

## 8. Do / Don't

### ✓ Correct

Reference a semantic motion token. Let the token resolve to the correct duration and easing combination.

```
✓  transition: motion.transition.interactive.default
✓  transition: motion.transition.overlay.enter
✓  transition: motion.transition.overlay.exit
```

The component does not select a duration. It does not select an easing curve. It does not know which primitive is active.

---

### ✗ Incorrect

**Using arbitrary duration values**

```
✗  transition: all 250ms ease
✗  animation-duration: 0.35s
✗  transition: opacity 0.6s ease-in-out
```

Arbitrary values are not traceable and break the consistency contract across the product.

---

**Referencing a primitive directly**

```
✗  transition: all duration-150 easing-standard
✗  animation: duration-300 easing-enter fade-in
```

Primitives carry no semantic meaning. A component referencing `duration-150` directly cannot participate in token-level updates or reduced motion handling.

---

**Using long or decorative animations**

```
✗  transition: all 800ms ease          /* exceeds duration-500 */
✗  animation: spin 2s linear infinite  /* looping, decorative */
✗  transition: transform 600ms bounce  /* non-system easing, excessive duration */
```

Long durations create perceived latency. Looping animations are banned. Non-system easing curves are not permitted.

---

**Inconsistent motion across similar interactions**

```
✗  /* Dropdown A */
   transition: opacity 200ms ease

   /* Dropdown B — same component type, different context */
   transition: opacity 300ms ease-in
```

Inconsistent motion within a component family breaks the predictability contract. All instances of the same interaction type must resolve to the same token.

---

## 9. Adding New Motion Values

New primitives are added only when the existing scale cannot satisfy a genuine product need.

| Step | Action |
|---|---|
| 1. Justify | State specifically why no existing duration or easing satisfies the need. Name the interaction and describe the problem. |
| 2. Check the scale | Confirm the value does not already exist. A 25ms difference is not sufficient justification for a new duration step. |
| 3. Extend carefully | If a new step is justified, assign it the correct numeric name consistent with the scale pattern. Do not insert a step between two existing steps without evaluating impact on all tokens that reference adjacent steps. |
| 4. Document before use | Add the new primitive to this file with its value and usage note before any token or component references it. |
| 5. Update last-updated | Set `last-updated` in frontmatter to the date of the change. |

Do not add a new duration step to resolve a subjective preference. Every addition becomes a permanent part of the motion contract and must be maintained indefinitely.

---

## 10. Cross-references

- [motion-tokens.md](../tokens/motion-tokens.md) — Semantic token definitions that map to this primitive scale
- [spacing.md](spacing.md) — Layout shift animations depend on spatial values from the spacing scale
- [color.md](color.md) — Color transition animations (hover, focus, state changes) reference color primitives through tokens
