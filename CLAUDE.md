# CLAUDE.md — Portfolio Guidelines & Constraints

> **CRITICAL**: Read `DESIGN_NOTES.md` before making any design, CSS, or architectural changes. All decisions are documented there.

## Concept
A printed magazine that boots like an operating system, built with the honesty of brutalism.
- The page is an issue.
- The navigation is a desktop.
- Windows are articles.
- The contact form is an interactive terminal shell.
- Aesthetic: Raw, confident, slightly awkward on purpose (visible grid, 2px hard borders, hard offset shadows with zero blur, deliberate scale hierarchy), never generic SaaS or AI template.

## The Absolute Banned List
- **Banned Fonts**: Inter, Roboto, Open Sans, Lato, Poppins, Montserrat, Playfair Display, Space Grotesk, system fonts as display.
- **Banned Colors**: Purple/blue gradients, cream (#F4F1EA-ish) + terracotta (#D97757), near-black + acid green/vermilion, gradient washes as background decoration, pure #000 / #fff as the whole palette.
- **Banned Layouts**: Centered-everything, hero + stat row, three equal feature cards, bento-grid for its own sake, glassmorphism, uniform padding on every section.
- **Banned Chrome**: All-caps tracked eyebrow labels, "WORD, fragment" label pattern, mono face as generic decoration on body elements (mono is reserved for OS chrome and terminal only), numbered markers (01/02/03) unless strictly sequential, arrows appended to links (`→`), default lucide/heroicons sets.
- **Banned Copy**: "Passionate", "crafting", "seamless", "elevate", buzzword fluff, em-dash-heavy rhythm, three-item triplets, generic "Hi, I'm Meet" intro.

## Technology Stack & Wiring Requirements
- **Core**: Vite + React 19 + TypeScript.
- **Animation**: GSAP 3 (ScrollTrigger, Draggable, Flip, SplitText) via `@gsap/react` `useGSAP`.
- **Smooth Scroll**: Lenis.
- **Single Animation Loop**: Lenis driven strictly by `gsap.ticker.add((time) => lenis.raf(time * 1000))`, `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.lagSmoothing(0)`. Never two loops.
- **CSS**: Vanilla CSS with custom properties. No Tailwind, no shadcn, no component kits.
- **Scroll Isolation**: Scrollable regions inside windows and terminal must have `data-lenis-prevent`.
- **Compositor Motion**: Animate ONLY `transform`, `opacity`, and `clip-path`. NEVER animate `width`, `height`, `top`, `left`, or `box-shadow blur`.
- **Responsive & A11y**: Mobile sheets under 768px; desktop windows (768px+); `prefers-reduced-motion` completely disables Lenis and complex reveals; full keyboard accessibility.
- **Persistence**: Zero `localStorage` dependency for correctness; use strictly within `try/catch` for theme and window geometry.
- **Deployment**: Output builds directly to `docs/` folder for GitHub Pages deployment on default branch `retro`.
