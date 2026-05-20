---
name: Figma Implementation Mapping
tier: enforcement
status: active
last-updated: 2026-05-07
maintainer: Team 4
source: Almosafer Design System
---

# Figma Implementation Mapping

---

## 1. Figma Implementation Philosophy

**Token-first architecture**

Every visual property inside Figma — color, font, spacing, radius, motion duration — must originate from a variable. No layer, frame, or component may carry a hardcoded fill, stroke, font size, or corner radius. If a value is not a variable, it does not belong in the file.

**Single source of truth**

The Figma variable library is the sole design-side source of truth for all token values. Spec files in `/specs/tokens` and the Figma library must remain in agreement at all times. When a token changes, it changes in both places simultaneously. Neither source may drift from the other.

**Semantic-driven implementation**

Primitive variables are never applied to components directly. All component and pattern styling references semantic variables. Semantic variables carry intent — `color/background/primary` means "the background used for primary surfaces," regardless of which primitive value it resolves to. This separation makes theme switching, mode changes, and brand updates non-destructive.

**Mode-driven system behavior**

Theme and language behavior is controlled entirely by Figma variable modes. Switching from Light to Dark, or from English to Arabic, must produce a complete and correct visual output with no manual layer edits. Every variable that must change between modes must be defined in all active modes. Variables that do not change across modes may be defined once.

**No raw values inside components**

No component frame, variant property, or layer inside a component may contain a raw hex value, absolute pixel size, or hardcoded font name. All styling is applied exclusively through variable bindings.

---

## 2. Figma Collections Structure

### Primitives

Contains raw scale values — the foundational palette and scale from which all other variables are derived. Primitive variables are named by scale position or value, not by intent. Scopes are always empty (`[]`) — primitives are hidden from all property pickers.

| Group | Naming pattern | Examples |
|---|---|---|
| Color brand | `color/brand/[step]` | `color/brand/50`, `color/brand/500`, `color/brand/900` |
| Color secondary | `color/secondary/[step]` | `color/secondary/50`, `color/secondary/500`, `color/secondary/900` |
| Color accent | `color/accent/[step]` | `color/accent/50`, `color/accent/500`, `color/accent/900` |
| Color neutral | `color/neutral/[step]` | `color/neutral/50`, `color/neutral/600`, `color/neutral/950`, `color/neutral/975`, `color/neutral/1000` |
| Color status | `color/status/[name]/[step]` | `color/status/danger/500`, `color/status/success/100` |
| Font size | `font/size/[px]` | `font/size/12`, `font/size/16`, `font/size/20`, `font/size/24`, `font/size/32`, `font/size/36`, `font/size/40` |
| Font weight | `font/weight/[name]` | `font/weight/regular`, `font/weight/semibold`, `font/weight/bold` |
| Font family | `font/family/[name]` | `font/family/ibm-plex-sans`, `font/family/ibm-plex-sans-arabic` |
| Line height | `line-height/[name]` | `line-height/tight` (120%), `line-height/normal` (150%), `line-height/loose` (180%) |
| Motion duration | `motion/duration/[ms]` | `motion/duration/100`, `motion/duration/150`, `motion/duration/200` |
| Radius | `radius/[step]` | `radius/0`, `radius/100`, `radius/400`, `radius/full` |
| Space | `space/[step]` | `space/100`, `space/300`, `space/600`, `space/1000` |
| Border width | `border/width/[px]` | `border/width/0`, `border/width/1`, `border/width/2`, `border/width/4` |

Primitives are consumed only by the three semantic collections through alias references. No component or pattern may reference primitives directly.

### Color Theme

Contains all semantic color variables. Every variable is an alias pointing to a Primitive color value. This is the only collection with theme modes — Light and Dark are both defined here.

| Group | Examples |
|---|---|
| Background | `color/background/primary`, `color/background/subtle`, `color/background/selected`, `color/background/success`, `color/background/danger` |
| Text | `color/text/primary`, `color/text/secondary`, `color/text/subtle`, `color/text/inverse`, `color/text/danger` |
| Border | `color/border/default`, `color/border/subtle`, `color/border/selected`, `color/border/danger`, `color/border/focus` |
| Status | `color/status/success`, `color/status/warning`, `color/status/danger` |

### Typography

Contains font family variables only. This collection exists solely to control language-mode switching. English and Arabic modes are both defined here.

| Variable | English mode | Arabic mode |
|---|---|---|
| `font/family/primary` | IBM Plex Sans | Cairo |

### Semantic

Contains all mode-invariant intent-mapped variables: font size, font weight, line height, spacing, radius, and motion. Every variable is an alias pointing to a Primitive value. No modes are defined in this collection — all variables are defined once.

| Group | Examples |
|---|---|
| Font size | `font/size/caption`, `font/size/body-md`, `font/size/heading-lg` |
| Font weight | `font/weight/regular`, `font/weight/medium`, `font/weight/semibold`, `font/weight/bold` |
| Font line height | `font/line-height/caption`, `font/line-height/body-md`, `font/line-height/heading-lg` |
| Spacing | `spacing/xs`, `spacing/sm`, `spacing/md`, `spacing/lg`, `spacing/xl` |
| Radius | `radius/sm`, `radius/md`, `radius/lg`, `radius/xl`, `radius/full` |
| Motion | `motion/fast`, `motion/normal`, `motion/enter`, `motion/exit` |
| Border width | `border/width/default`, `border/width/focus`, `border/width/error`, `border/width/strong` |

---

## 3. Modes Structure

### Theme Modes — Color Theme collection

**Light**

The default mode. All Color Theme variables resolve to their light-palette primitive values. Component surfaces, text, and borders use the light palette.

**Dark**

The dark mode variant. Color Theme variables are re-aliased to dark-palette primitives within this mode. Every variable in the Color Theme collection must have a Dark mode definition. No component or pattern requires manual editing when switching to Dark mode.

### Language Modes — Typography collection

**English**

The default language mode. The Typography collection resolves `font/family/primary` to IBM Plex Sans. Text direction is LTR. All layout frames must use logical CSS-equivalent constraints in Figma (start/end rather than left/right) so that switching to Arabic mode does not require manual mirroring.

**Arabic**

The Arabic language mode. The Typography collection resolves `font/family/primary` to Cairo. Text direction is RTL. Frame mirroring and auto-layout direction must reverse automatically when this mode is applied at the page or frame level.

### Mode Inheritance Behavior

Modes are applied at the highest possible frame level — typically the page or the root artboard — so that all nested frames, components, and instances inherit the active mode without individual overrides.

Component instances inherit the mode of their containing frame. Detaching a component to apply a different mode is not permitted. If a component must display in a mode different from its container, a scoped mode override is applied only to that instance, not by detaching.

The Color Theme collection defines two modes: Light and Dark. The Typography collection defines two modes: English and Arabic. The Semantic collection has no modes — all variables are defined once and are mode-invariant.

---

## 4. Naming Conventions

### Rules

- Semantic naming only. Names must express intent, not value.
- Lowercase only. No uppercase letters anywhere in a variable name.
- Slash-based hierarchy. Groups are separated by `/`.
- No raw values in names. Names must never embed hex codes, pixel values, or numeric scales.

### Colors

Pattern: `color/[role]/[property]`

| Example | Meaning |
|---|---|
| `color/background/primary` | Primary surface background |
| `color/background/subtle` | Subtle recessed background |
| `color/background/selected` | Background for selected state |
| `color/background/success` | Success-state background |
| `color/background/danger` | Danger-state background |
| `color/text/primary` | Primary body text |
| `color/text/secondary` | Secondary supporting text |
| `color/text/subtle` | Lowest-emphasis text |
| `color/text/inverse` | Text on dark or filled surfaces |
| `color/text/danger` | Error and danger text |
| `color/border/default` | Default border |
| `color/border/subtle` | Low-emphasis border |
| `color/border/selected` | Selected or active border |
| `color/border/danger` | Danger-state border |
| `color/border/focus` | Keyboard focus ring |
| `color/status/success` | Success semantic status |
| `color/status/warning` | Warning semantic status |
| `color/status/danger` | Danger semantic status |

### Font

Font variables are split across two collections by purpose. `font/family/primary` lives in the Typography collection because it switches between modes. All other font variables — size, weight, line height — live in the Semantic collection because they are mode-invariant.

**Font family** — `font/family/[script]` — Typography collection

| Example | Mode |
|---|---|
| `font/family/primary` | Resolves to IBM Plex Sans (English) or Cairo (Arabic) |

**Font size** — `font/size/[scale]` — Semantic collection

| Example | Scale |
|---|---|
| `font/size/caption` | Caption |
| `font/size/body-sm` | Small body |
| `font/size/body-md` | Default body |
| `font/size/body-lg` | Large body |
| `font/size/heading-sm` | Small heading |
| `font/size/heading-md` | Medium heading |
| `font/size/heading-lg` | Large heading |

**Font weight** — `font/weight/[weight]` — Semantic collection

| Example | Value |
|---|---|
| `font/weight/regular` | 400 |
| `font/weight/medium` | 500 |
| `font/weight/semibold` | 600 |
| `font/weight/bold` | 700 |

**Font line height** — `font/lineheight/[scale]` — Semantic collection

| Example | Scale |
|---|---|
| `font/lineheight/caption` | Caption |
| `font/lineheight/body-sm` | Small body |
| `font/lineheight/body-md` | Default body |
| `font/lineheight/body-lg` | Large body |
| `font/lineheight/heading-sm` | Small heading |
| `font/lineheight/heading-md` | Medium heading |
| `font/lineheight/heading-lg` | Large heading |

Text styles in Figma (`text/body/md`, `text/heading/lg`, etc.) bundle these variables together at the text style level. Text styles are named separately and are not Semantic variables.

### Spacing

Pattern: `spacing/[scale]`

| Example | Meaning |
|---|---|
| `spacing/xs` | Extra-small spacing unit |
| `spacing/sm` | Small spacing unit |
| `spacing/md` | Medium spacing unit |
| `spacing/lg` | Large spacing unit |
| `spacing/xl` | Extra-large spacing unit |

### Radius

Pattern: `radius/[scale]`

| Example | Meaning |
|---|---|
| `radius/sm` | Small corner radius |
| `radius/md` | Medium corner radius |
| `radius/lg` | Large corner radius |
| `radius/xl` | Extra-large corner radius |
| `radius/full` | Full/pill corner radius |

### Motion

Pattern: `motion/[scale]`

| Example | Meaning |
|---|---|
| `motion/fast` | Short-duration transition |
| `motion/normal` | Standard-duration transition |
| `motion/enter` | Enter animation duration |
| `motion/exit` | Exit animation duration |

### Border Width

Primitive pattern: `border/width/[px]` — Primitives collection, named by pixel value.

Semantic pattern: `border/width/[role]` — Semantic collection, named by intent.

**Primitives**

| Variable | Value |
|---|---|
| `border/width/0` | 0 |
| `border/width/1` | 1 |
| `border/width/2` | 2 |
| `border/width/4` | 4 |

**Semantic**

| Variable | Aliases | Meaning |
|---|---|---|
| `border/width/default` | `border/width/1` | Default structural border — inputs, cards, dividers |
| `border/width/focus` | `border/width/2` | Keyboard focus ring width |
| `border/width/error` | `border/width/2` | Error and invalid state border width |
| `border/width/strong` | `border/width/4` | Strong accent border — callouts, priority markers |

Border width variables live in the Semantic collection. They are mode-invariant — no Light/Dark modes required. All variables are defined once. Variable type is **Number** (not Color).

---

## 5. Token Architecture

```
Primitives
↓
Color Theme + Typography + Semantic
↓
Components (Atoms)
↓
Patterns
↓
Flows
```

**Dependency direction**

Primitives are the lowest layer. They hold raw values and are aliased by the three semantic collections: Color Theme, Typography, and Semantic.

Color Theme, Typography, and Semantic variables alias primitives and assign intent. Components bind to variables from all three collections as needed — color properties from Color Theme, font family from Typography, and all other properties from Semantic.

Patterns compose components. Patterns may also consume Color Theme and Semantic variables directly for layout-level styling (page backgrounds, dividers) not owned by a specific component.

Flows compose patterns and components. Flows do not introduce new variable bindings beyond what their constituent patterns and components define.

**No upward references**

A layer at any level must never reference a variable from a layer above it. Dependency flows downward only.

---

## 6. Font Mapping

### Font families

**IBM Plex Sans** — Applied in English mode. Used for all Latin script text across the entire system.

**Cairo** — Applied in Arabic mode. Used for all Arabic script text across the entire system. This font replaces IBM Plex Sans completely in Arabic mode; the two fonts are not mixed within a single text layer.

No other font families are permitted in the system.

### Font family mapping

| Variable | English mode | Arabic mode |
|---|---|---|
| `font/family/primary` | IBM Plex Sans | Cairo |

The `font/family/primary` variable is bound to every text layer in every component. Switching the language mode at the frame level updates all text layers automatically.

### Font weight mapping

| Variable | Value | Usage |
|---|---|---|
| `font/weight/regular` | 400 | Default body text, supporting text, captions |
| `font/weight/medium` | 500 | Emphasized body text, navigation labels |
| `font/weight/semibold` | 600 | Headings, button labels, status text |
| `font/weight/bold` | 700 | High-emphasis headings, hero text |

No weight values outside this set are permitted.

### Font scale mapping

Each scale maps three Semantic variables: `font/size/[scale]`, `font/weight/[weight]`, and `font/lineheight/[scale]`. These are bound independently to each text layer in Figma.

| Scale | Font size | Font weight | Font line height | Usage |
|---|---|---|---|---|
| caption | `font/size/caption` | `font/weight/regular` | `font/lineheight/caption` | Timestamps, footnotes, helper text |
| body-sm | `font/size/body-sm` | `font/weight/regular` | `font/lineheight/body-sm` | Secondary descriptions, metadata |
| body-md | `font/size/body-md` | `font/weight/regular` | `font/lineheight/body-md` | Default body text |
| body-lg | `font/size/body-lg` | `font/weight/medium` | `font/lineheight/body-lg` | Lead paragraphs, summaries |
| heading-sm | `font/size/heading-sm` | `font/weight/semibold` | `font/lineheight/heading-sm` | Card titles, section labels |
| heading-md | `font/size/heading-md` | `font/weight/semibold` | `font/lineheight/heading-md` | Page subsections |
| heading-lg | `font/size/heading-lg` | `font/weight/bold` | `font/lineheight/heading-lg` | Page titles, primary headings |

These are the only approved scales. No additional scales may be introduced without governance approval.

### Text styles

Figma text styles (`text/body/md`, `text/heading/lg`, etc.) bundle the three variables above for each scale. Text styles are applied to text layers in addition to the individual variable bindings. They are named separately from Semantic variables and are not part of the Semantic collection.

---

## 7. Figma Build Order

The following execution order is mandatory. No step may be started before the preceding step is complete and confirmed.

### Order

1. **Primitives** — Create the Primitives collection. Define all raw color, font scale, spacing, radius, and motion values. No aliases at this stage.

2. **Color Theme** — Create the Color Theme collection. Alias all color variables to Primitive values. Define Light and Dark mode variants for every variable in this collection.

3. **Typography** — Create the Typography collection. Alias `font/family/primary` to its Primitive value. Define English and Arabic mode variants.

4. **Semantic** — Create the Semantic collection. Define groups in this order: font size, font weight, font line height, spacing, radius, motion. Alias every variable to its Primitive value. No modes. All variables defined once.

5. **Modes validation** — Validate Light and Dark modes in Color Theme. Validate English and Arabic modes in Typography. Every variable must resolve correctly before proceeding.

6. **Atoms** — Build individual component sets in Figma. Bind Color Theme variables to color properties, Typography variables to font family, Semantic variables to all other properties. Validate all states and both language modes before marking an atom complete.

7. **Patterns** — Compose atoms into pattern frames. Apply Color Theme and Semantic variables for any layout-level styling not owned by a constituent atom. Validate all states and modes.

8. **Flows** — Compose patterns and atoms into flow screens. No new variable bindings are introduced at this stage beyond what patterns and atoms define.

### Constraints

Never build components before all three semantic collections are complete and modes are validated.

Never bind Primitive variables to component layers at any stage.

Never proceed to the next step without explicit confirmation that the current step is complete and validated.

---

## 8. Governance Rules

### Variable hygiene

- No duplicated variables. Before creating a new variable, verify that an equivalent does not already exist under a different name. Duplication is a naming violation, not a design decision.
- No raw styling inside components. Every fill, stroke, radius, and font property on every layer inside a component frame must be bound to a variable.

### Semantic layer integrity

- Color Theme, Typography, and Semantic variables are all mandatory — no component property may be left unbound.
- Variables must not be renamed without updating all component bindings and all documentation in `/specs/tokens`.
- No direct primitive consumption. No component, pattern, or flow frame may reference a Primitive variable.

### Mode synchronization

- Modes must stay synchronized. Adding a new Color Theme variable requires defining its value in both Light and Dark before the variable may be used. Adding a new Typography variable requires defining its value in both English and Arabic.
- Light and Dark modes in the Color Theme collection must always be in parity. A variable defined in Light that has no Dark equivalent is a blocking defect.
- English and Arabic modes in the Typography collection must always be in parity.
- The Semantic collection has no modes. Any variable added to it must not require mode-switching — if it does, it belongs in Color Theme or Typography instead.

### Language and direction support

- All components must support both English and Arabic. A component that functions only in one language mode is incomplete.
- All components must support both LTR and RTL. Auto-layout direction, icon placement, text alignment, and logical property usage must be validated in both directions before a component is marked complete.
- No component may use directional absolute positioning (left/right values) where logical positioning (start/end) is available.

### Contribution

- New Semantic variables require alignment with the token spec in `/specs/tokens/token-reference.md` before they are created in Figma.
- New Primitive values require alignment with the relevant foundation spec in `/specs/foundations` before they are added to the Primitives collection.

---

## 9. MCP Execution Rules

The following rules govern how MCP tooling and automated agents interact with the Figma implementation.

### Scope per execution

Work file-by-file only. Each execution handles one component, one collection, or one defined scope of work. Multi-file or multi-collection operations in a single execution are not permitted.

### Step-by-step progression

Never build the whole system at once. The build order defined in Section 7 is the only permitted sequence. Collections are built in this order: Primitives → Color Theme → Typography → Semantic → Atoms → Patterns → Flows. Each step is executed in full, validated, and confirmed before the next step begins.

### Pause and confirm

Stop after each implementation step. After completing a step, execution halts and waits for explicit confirmation before proceeding. Confirmation must come from the maintainer through the active session — not inferred from prior instructions or assumed from context.

### No speculative execution

Do not execute future steps in anticipation of confirmation. Do not apply partial implementations of a future step while waiting for confirmation on the current step.

### Validation before continuation

Before confirming a step complete, the following must be verified:
- All variables in the step are named correctly per Section 4.
- All mode values are defined and resolve correctly.
- No raw values are present in any bound layer.
- No layer in any component references a Primitive variable.
- Both language modes produce correct output for all font-dependent layers.
- Both theme modes produce correct output for all color-dependent layers.
