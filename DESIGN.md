---
name: Meet Rathod Portfolio
description: Editorial stone-and-blueprint portfolio showcasing Python systems, Discord bots, and FastAPI tools.
colors:
  blueprint-cobalt: "#2456d6"
  cobalt-ink: "#ffffff"
  warm-stone: "#dfdedb"
  stone-surface: "#d3d2ce"
  olive-charcoal: "#26251e"
  stone-muted: "#5a5850"
  charcoal-surface: "#313029"
  ash-muted: "#9e9d99"
  obsidian-code: "#1c1b17"
  sand-ground: "#d9ccb7"
  sand-surface: "#e9e0d2"
  sand-ink: "#2a2622"
  sand-muted: "#5a534a"
  sand-ochre: "#a8794a"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(40px, 1.143vw + 35.54px, 52px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(30px, 1.72vw + 23.3px, 48px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 560
    lineHeight: 1.44
    letterSpacing: "-0.012em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
  stat:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(28px, 0.952vw + 24.29px, 38px)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontFeature: "tnum"
  mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  ui: "12px"
  pill: "999px"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
  s-9: "96px"
  s-10: "128px"
components:
  button-primary:
    backgroundColor: "{colors.blueprint-cobalt}"
    textColor: "{colors.cobalt-ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "color-mix(in oklab, #2456d6 84%, #dfdedb)"
  button-primary-xl:
    backgroundColor: "{colors.blueprint-cobalt}"
    textColor: "{colors.cobalt-ink}"
    rounded: "{rounded.pill}"
    padding: "0 32px"
    height: "clamp(64px, 1.4vw + 48px, 72px)"
    width: "min(100%, 640px)"
  button-copy-pill:
    backgroundColor: "{colors.stone-surface}"
    textColor: "{colors.olive-charcoal}"
    typography: "{typography.mono}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  button-icon-circle:
    backgroundColor: "{colors.warm-stone}"
    textColor: "{colors.olive-charcoal}"
    rounded: "{rounded.pill}"
    width: "32px"
    height: "32px"
  card-open:
    backgroundColor: "transparent"
    textColor: "{colors.olive-charcoal}"
    rounded: "{rounded.lg}"
    padding: "0px"
  panel-sand:
    backgroundColor: "{colors.sand-ground}"
    textColor: "{colors.sand-ink}"
    rounded: "{rounded.lg}"
  chip-stack:
    backgroundColor: "{colors.stone-surface}"
    textColor: "{colors.olive-charcoal}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  nav-bar:
    backgroundColor: "{colors.warm-stone}"
    textColor: "{colors.olive-charcoal}"
    height: "72px"
  inspector-sheet:
    backgroundColor: "{colors.warm-stone}"
    textColor: "{colors.olive-charcoal}"
    rounded: "{rounded.lg}"
    width: "min(680px, 100%)"
  inspector-tab:
    backgroundColor: "transparent"
    textColor: "{colors.stone-muted}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  inspector-tab-active:
    backgroundColor: "{colors.olive-charcoal}"
    textColor: "{colors.cobalt-ink}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
---

# Design System: Meet Rathod Portfolio

## Overview

**Creative North Star: "The Stone Drafting Table"**

This system treats software engineering work like architectural plates laid out on warm drafting stone. Rather than wrapping every project in dark-mode SaaS cards or neon terminal clichés, the interface pairs matte warm stone grounds with crisp olive-charcoal ink, sharp structural corners, and a single blueprint cobalt accent reserved for primary actions and live signal paths. Note that while an earlier surface brief explored dark indigo technical vellum, the shipped build landed decisively in this daylight stone-and-blueprint world.

Content breathes across full-screen editorial bands: a three-column triptych hero with a cycling WebGL gradient-mesh collage, open borderless project cards whose inset sand panels frame live UI fragments and hub diagrams, an inverse charcoal band for pinned architecture chapters, and a sand-lit closing statement footer. Interactive inspection happens inside a spring-driven slide-over drawer with shared-layout pill tabs and monospace code blocks.

**Key Characteristics:**
- Warm stone ground (`#dfdedb`) paired with deep olive-charcoal ink (`#26251e`) and a single blueprint cobalt accent (`#2456d6`).
- Sharp structural radii (`4px`–`8px`) contrasted against full-pill interactive buttons and tabs (`999px`).
- Geist for display and body copy paired with Geist Mono for file paths, metrics, and code blocks.
- Open borderless work cards sitting directly on the page ground above sand-lit inset panels (`#d9ccb7`).
- Tactile motion combining CSS ease-out micro-interactions, scroll-driven pinned chapters and counter rolls, and spring physics in the inspector drawer.

## Colors

A daylight stone-and-sand palette anchored by olive-charcoal ink, an inverse charcoal band for deep technical walkthroughs, and a single blueprint cobalt accent.

### Primary
- **Blueprint Cobalt** (#2456d6): Primary action fill for pill CTAs, inline case-study triggers, active collage progress dots, diagram signal pulses, and focus outlines.
- **Cobalt Ink** (#ffffff): High-contrast foreground text on Blueprint Cobalt buttons, active inspector tab labels, and the crisp surface of light collage cards and UI fragment windows.

### Neutral
- **Warm Stone** (#dfdedb): Primary page background, fixed header ground, inspector drawer body, and inverse foreground ink on dark bands.
- **Stone Surface** (#d3d2ce): Secondary neutral surface for stack tool chips, inspector header and metric strips, copy pills, and tech tags.
- **Olive Charcoal** (#26251e): Primary body and heading ink on light grounds, active inspector tab pill fill, and the background of the inverse architecture band.
- **Stone Muted** (#5a5850): Secondary metadata, muted heading clauses, inactive inspector tab labels, and collage card headers.
- **Charcoal Surface** (#313029): Elevated card surface inside the inverse architecture chapters band.
- **Ash Muted** (#9e9d99): Muted metadata and dimmed code comments on inverse charcoal and dark collage surfaces.
- **Obsidian Code** (#1c1b17): Deep neutral surface for dark collage code cards and inspector code blocks.
- **Sand Ground** (#d9ccb7): Lit ground behind the hero collage, work card panels, stack hub diagram frame, and closing statement footer.
- **Sand Surface** (#e9e0d2): Highlight stop inside sand radial meshes and WebGL gradient-mesh folds.
- **Sand Ink** (#2a2622): Primary ink on sand-lit grounds and the closing statement footer.
- **Sand Muted** (#5a534a): Secondary text and legal metadata on sand-lit grounds.
- **Sand Ochre** (#a8794a): Warm secondary stop inside sand panel meshes and gradient-mesh shaders.

### Named Rules
**The Single Cobalt Signal Rule.** Blueprint Cobalt (#2456d6) is the sole chromatic accent across the page; it marks primary actions, active diagram pulses, and key metrics, never decorative backgrounds or multi-color badges.

**The Three-Ground Alternation Rule.** Sections alternate strictly across three grounds—Warm Stone (#dfdedb), Olive Charcoal inverse (#26251e), and Sand Ground (#d9ccb7)—so adjacent bands separate by tone rather than horizontal divider rules.

## Typography

**Display Font:** Geist (with system-ui, sans-serif fallback)
**Body Font:** Geist (with system-ui, sans-serif fallback)
**Label/Mono Font:** Geist Mono (with ui-monospace, SFMono-Regular, Menlo, Consolas, monospace fallback)

**Character:** Geometric neo-grotesque clarity paired with crisp technical monospace. Tight negative tracking on medium-weight Geist headings gives headlines architectural density, while Geist Mono grounds file paths, metrics, and code snippets in authentic developer tooling.

### Hierarchy
- **Display** (500, clamp(40px, 1.143vw + 35.54px, 52px), 1.04): Triptych hero headline (`h1`) with `-0.045em` tracking and cap-height top alignment.
- **Headline** (500, clamp(30px, 1.72vw + 23.3px, 48px), 1.1): Section headings (`h2`) with `-0.035em` tracking; secondary clauses step down to muted ink.
- **Title** (560, 18px, 1.44): Open work card headings (`h3`) and inspector section titles with `-0.012em` tracking.
- **Body** (400, 16px, 1.55): Running prose, card summaries, and inspector descriptions, capped at 46ch–62ch for comfortable reading.
- **Label** (500, 13px, 1.4, 0.01em tracking): Mega-menu column headers, stack tool chips, and legal metadata.
- **Stat** (500, clamp(28px, 0.952vw + 24.29px, 38px), 1): Tabular counter-roll figures (`font-variant-numeric: tabular-nums`) in the proof strip.
- **Mono** (400, 13px, 1.55): File paths, code snippets, terminal output, copy pills, and inspector metric values.

### Named Rules
**The Tabular Telemetry Rule.** Every numeric metric, counter-roll figure, and diff line number uses `tabular-nums` so animated digit strips and aligned columns never jitter horizontally.

**The Two-Tone Heading Rule.** Section headings pair a primary statement in full ink with a secondary clause in muted ink inside the same `h2`, eliminating the need for separate eyebrow labels above headings.

## Layout

The page follows a one-section-per-screen vertical rhythm inside a centered `1280px` container (`--container`) with a 12-column CSS grid and `24px` column gutters (`12px` below `640px`). Side margins scale symmetrically from `24px` on mobile (`<640px`), to `48px` on tablet (`640px–1023px`), to `80px` on desktop (`>=1024px`).

- **Hero (`100svh`)**: Three-column triptych (`3 / 6 / 3` spans at `>=1280px`) placing the headline and lead left, the cycling collage center, and the primary CTA right; collapses to a `4 / 7` split at `1024px–1279px` and a vertical stack below `1024px`.
- **Work Section (`200svh` via `.g2`)**: Two stacked screen groups holding a `2x2` grid of `span-6` open cards (`336px` panel height at `>=1280px`, `200px` at `640px–1279px`, `140px` on mobile) followed by a 4-column proof counter strip (`2` columns below `1024px`).
- **Architecture Chapters**: Inverse dark band running `pinned-chapters` (`200svh` sticky split at `>=1024px` with left step list and right visual stage; static stacked rows below `1024px`).
- **Stack Section**: Asymmetric `5 / 6` split pairing prose and an auto-fill tool chip mosaic (`minmax(132px, 1fr)`, `2` columns on mobile) with a sand-lit hub diagram frame (`min-height: 460px`).
- **Closing Statement Footer**: Full-bleed sand ground combining the closing CTA (`max-width: 640px`) with a 5-column link grid (`4 / 2 / 2 / 2 / 2` spans on desktop, `2`-column link grid on mobile).

### Named Rules
**The Equal-Edge Container Rule.** Every header, section, and footer aligns to the same centered `1280px` container with equal left and right gutters; no content block bleeds off only one side of the viewport.

## Elevation & Depth

Surfaces are flat by default and rely on tonal ground shifts and `1px` hairlines (`color-mix(in oklab, var(--ink) 11%, transparent)`) rather than drop shadows. Ambient layered shadows appear strictly on floating UI artifacts inside panels, collage pieces, circular pause controls, and the modal inspector sheet.

### Shadow Vocabulary
- **Collage Piece** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.08), 0 22px 48px -22px rgb(0 0 0 / 0.34)`): Lifts overlapping code, metric, and icon cards off the WebGL gradient-mesh hero canvas.
- **UI Fragment Window** (`box-shadow: inset 0 1px 0 var(--u-hi), 0 1px 1px color-mix(in oklab, var(--u-sh) 40%, transparent), 0 2px 4px -1px color-mix(in oklab, var(--u-sh) 45%, transparent), 0 12px 24px -8px color-mix(in oklab, var(--u-sh) 80%, transparent), 0 32px 64px -24px var(--u-sh)`): Grounds embedded diff, terminal, and pipeline windows inside sand panels.
- **Diagram Node** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.05), 0 8px 18px -12px rgb(0 0 0 / 0.22)`): Separates interactive hub and spoke nodes from the dotted diagram canvas.
- **Panel Hover Lift** (`box-shadow: 0 14px 32px -18px oklch(from var(--bg) 0 0 0 / calc(0.75 - l * 0.55))`): Applied alongside a `-2px` vertical lift on fine-pointer hover over open work card panels.
- **Inspector Sheet** (`box-shadow: 0 24px 64px -16px rgb(0 0 0 / 0.35)`): Elevates the slide-over case study drawer above a `rgb(38 37 30 / 0.56)` backdrop with `6px` blur.
- **Pause Disc** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.12), 0 4px 12px -4px rgb(0 0 0 / 0.28)`): Keeps the `32px` circular pause control legible over animated collage and diagram corners.

### Named Rules
**The Flat-Ground Rule.** Page sections, open work cards, and stack chips carry zero drop shadow at rest; elevation is reserved for embedded UI windows, collage layers, and modal overlays.

## Shapes

The system pairs crisp architectural corners (`4px` small, `6px` medium, `8px` large) on structural containers, panels, code blocks, and chips with full-pill geometry (`999px`) on interactive buttons, segmented tabs, and status pills. Embedded UI fragment windows step up slightly to a `12px` outer radius (`--ui-radius`) so nested product mockups read distinctly from the page's own `8px` panels.

### Named Rules
**The Sharp-Frame, Pill-Action Rule.** Structural frames, panels, and chips stay sharp (`4px`–`8px` radius), while primary actions, copy pills, and segmented tabs take full `999px` pill geometry so clickable controls read immediately against rectangular architecture.

## Components

### Buttons
Tactile pill controls with crisp color shifts, animated arrow stems, and subtle press compression (`scale(0.985)` or `scale(0.97)`).
- **Shape:** Full pill (`999px` radius via `data-buttons="pill"`).
- **Primary:** Blueprint Cobalt (`#2456d6`) fill with Cobalt Ink (`#ffffff`) text, `44px` height, `0 24px` horizontal padding, and an inline `.m-arrow` SVG whose stem extends and head shifts `3px` right on hover.
- **Hover / Focus:** Background mixes toward the ground (`color-mix(in oklab, #2456d6 84%, #dfdedb)`), lifts `-1px` (`-2px` on XL) on fine pointers, and shows an immediate `2px` Blueprint Cobalt focus outline (`2px` offset).
- **XL Statement CTA:** `min(100%, 640px)` width, `clamp(64px, 1.4vw + 48px, 72px)` height, `clamp(20px, 0.6vw + 16px, 26px)` Geist display text (`48px` height full-width on mobile).
- **Inline Card Trigger & Copy Pill:** `.work-card-btn` renders borderless Blueprint Cobalt text (`16px`, weight `500`) with `.m-arrow`; `.copy-pill` uses Stone Surface (`#d3d2ce`) fill, `1px` strong hairline border, `10px 18px` padding, Geist Mono `14px` text, and a blur-bridged `160ms` swap to a copied confirmation state.
- **Circular Icon Controls:** `32px` (`.loop-pause` with `44px` hit area) and `40px` (`.inspector-close`) circles on Warm Stone (`#dfdedb`) with `1px` hairline borders; `.inspector-close` inverts to Olive Charcoal (`#26251e`) on hover.

### Chips
Compact rectangular tool badges and pill status indicators.
- **Style:** Stack tool chips (`.stack-chip`) use Stone Surface (`#d3d2ce`) fill, `1px` hairline border, `6px` radius, `12px 16px` padding, `22px` full-color SVG brand icon, and `14px` medium Geist label; inspector tech tags use `4px` radius, `4px 10px` padding, and `13px` Geist Mono.
- **State:** Stack chips lift `-2px` and deepen their border on fine-pointer hover (`160ms` `--ease-out`).

### Cards / Containers
Open ground-integrated project cards paired with sand-lit inset panels and inverse chapter cards.
- **Corner Style:** `8px` radius (`--r-lg`) on inset panels, collage frames, and inverse chapter cards; `6px` radius (`--r-md`) on inner code boxes and highlight cards.
- **Background:** Open work cards (`.card--open`) sit transparently on Warm Stone (`#dfdedb`) above Sand Ground (`#d9ccb7`) panels with a subtle radial mesh; inverse chapter cards use Charcoal Surface (`#313029`) over Olive Charcoal (`#26251e`).
- **Shadow Strategy:** Flat at rest on open cards and chapter cards; `-2px` hover lift with ambient shadow on `.card--open > .panel`; layered shadows on collage pieces and `.ui-panel` windows inside panels.
- **Border:** `1px` hairline (`--line`) on stack chips, highlight cards, and frames; `1px` inner edge (`::after`) on sand panels; `1px solid rgb(223 222 219 / 0.14)` on inverse chapter cards.
- **Internal Padding:** `0px` on `.card--open` (text sits directly on the ground); `32px` (`--s-6`) on inverse chapter cards; `16px` (`--s-4`) on inspector highlight cards.

### Navigation
Fixed opaque stone header with centered links, hover mega-menu, and full-screen mobile sheet.
- **Style:** `72px` height (`56px` below `640px`), Warm Stone (`#dfdedb`) background, `1px` bottom hairline, `22px` Geist medium wordmark left, centered `15px` medium links, and GitHub link plus primary pill CTA right.
- **States:** Desktop links draw a `2px` underline from left to right on hover/focus (`180ms`); hovering `Work` opens a full-width mega-menu after `150ms` intent (`200ms` fade/slide in, `120ms` out). Below `1024px`, links collapse into a full-screen sheet toggled by a `44px` button while keeping the primary CTA visible in the bar (`640px–1023px`).

### Case Study Inspector
Spring-animated slide-over drawer (`min(680px, 100%)` wide, `8px` radius on desktop, `0px` full-bleed below `640px`) entering with `type: "spring", duration: 0.42, bounce: 0.1` over a blurred charcoal backdrop (`Escape` or backdrop click closes). Features a Stone Surface header, segmented pill tabs with a shared `layoutId` spring indicator (`duration: 0.32, bounce: 0.14`), a 3-column metric strip, blur-bridged tab content transitions (`220ms` `--ease-out`), and an Obsidian Code (`#1c1b17`) snippet block.

### Interactive UI Fragments & Hub Diagrams
Self-contained product UI windows (`diff-review`, `terminal-run`, `pipeline-board`) and interactive SVG hub-and-spoke diagrams (`.dg`) mounted inside sand panels and frames. Fragments use `13px` Geist and `13px` Geist Mono on a `4px` grid with `12px` outer radius, bottom/right edge-fade masks (`64px` fade), and `prefers-reduced-motion` static fallbacks.

## Do's and Don'ts

### Do:
- **Do** keep Blueprint Cobalt (#2456d6) strictly for primary pill CTAs, inline action triggers, active diagram pulses, and key metrics so its signal stays unmistakable.
- **Do** pair sharp structural radii (`4px`–`8px`) on panels, frames, and chips with full-pill (`999px`) geometry on buttons, tabs, and copy pills.
- **Do** place open work cards directly on the Warm Stone (#dfdedb) ground with zero outer card box, letting the inset Sand Ground (#d9ccb7) panel carry the visual weight.
- **Do** use `tabular-nums` on all counter-roll stats, diff line numbers, and monospace metrics.
- **Do** honor `prefers-reduced-motion` by pausing cycling collages, terminal loops, and WebGL shaders while preserving color and state feedback.

### Don't:
- **Don't** wrap open work cards or stack sections in extra bordered boxes or drop shadows at rest; keep page-level surfaces flat and separated by ground shifts.
- **Don't** introduce secondary chromatic accents, neon glows, or dark-mode SaaS gradients outside the inverse Olive Charcoal (#26251e) architecture band and Obsidian Code (#1c1b17) blocks.
- **Don't** add eyebrow or kicker labels above section or modal headings; use the two-tone heading pattern (ink + muted clause) instead.
- **Don't** replace full-color local SVG tool marks in the stack mosaic or UI fragments with monochrome icon-font glyphs or external CDN icon URLs.
- **Don't** break the equal-edge `1280px` container alignment with one-sided viewport bleeds.
