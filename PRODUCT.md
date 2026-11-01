# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React 19 + TypeScript.
Animation: GSAP 3 (ScrollTrigger, Draggable, Flip, SplitText) + `@gsap/react` (`useGSAP`).
Smooth Scroll: Lenis synchronized with `gsap.ticker`.
Styling: Vanilla CSS with custom properties / design tokens. (Zero Tailwind, zero shadcn, zero generic UI kits).
Deployment: GitHub Pages via `/docs` build folder on default `retro` branch.

## Users

Recruiters, engineering leads, open-source collaborators, hackathon judges, and fellow developers. They want proof of genuine engineering capability: systems programming, bot architecture, compiler exploration, game mechanics, and Linux tooling.

## Product Purpose

Prove Meet Rathod builds real things, ships them, and deeply understands why they work. A portfolio that rejects boilerplate "available for work" theater in favor of technical rigor, architectural honesty, and a distinctive point of view.

## Positioning

An editorial magazine that boots like an operating system, grounded in the clarity of brutalism. Not a generic dark-mode SaaS portfolio, but an authentic reflection of a builder passionate about Omarchy Linux, C++, Python, TypeScript, game engines, and anime culture.

## Operating Context

- Display range: Fluidly responsive from mobile (390px) to ultra-wide desktop (2560px).
- Navigation modes: Mouse/pointer desktop dragging & resizing, touch mobile sheets, and full keyboard navigation (arrow keys, Enter, Esc, Alt+Tab cycling).
- Performance baseline: Lighthouse Performance 90+ on mobile, Accessibility 95+, total JS bundle under 250 KB gzipped.

## Capabilities and Constraints

- Draggable & resizable project windows with real z-order management and viewport boundary clamping.
- Interactive terminal contact shell with real command parser, command history, tab-completion, and live DOM output.
- Single unified animation loop: Lenis driven strictly by `gsap.ticker`, `gsap.ticker.lagSmoothing(0)`.
- Internal scroll containers marked with `data-lenis-prevent`.
- Strictly zero layout-property animation (only `transform`, `opacity`, `clip-path`).
- Safe localStorage access wrapped in try/catch solely for theme and window geometry persistence.
- Complete prefers-reduced-motion support disabling smooth scroll and animations in favor of instant states.

## Brand Commitments

- Name: Meet Rathod
- Handles: Gojo, iTsukiyomi
- Pronouns: he/him
- Email: meetr459@gmail.com
- Profile: First-year BSc IT student, Linux (Omarchy) enthusiast, developer of Pokémon Duel, Mafioso, ani-cli C++ port, and SHEDSKIN.

## Evidence on Hand

- Repositories: `iTsukiyomi/pypoke` (Pokémon Duel), `iTsukiyomi/Mafia` (Mafioso bot), `iTsukiyomi/ani-cpp` (ani-cli C++ port), `iTsukiyomi/peakclover` / SHEDSKIN (Unity 6 Metroidvania).
- Real system configurations: Arch Linux / Omarchy, Neovim, GCC/Clang, uv/Python 3.12, Node.js.
- Active GitHub account: `https://github.com/iTsukiyomi`

## Product Principles

1. **Honest Structure Over Polish**: Visible grids, hard 2px borders, zero-blur hard offset shadows, functional typography.
2. **Specific Engineering Voice**: Every case study features problem definition, architecture diagram, three hardest decisions, real bugs with error logs, and retrospectives.
3. **Motion With Weight & Purpose**: Animations respond to user intent or mark one singular moment. Never ambient looping noise.
4. **Accessible & Keyboard First**: True semantic HTML (`header`, `nav`, `main`, `article`, `dialog`), focus rings, ARIA live regions for console output.
