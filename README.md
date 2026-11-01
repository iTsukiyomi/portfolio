# Meet Rathod — Engineering Portfolio (Retro Desktop OS)

> Live URL: [itsukiyomi.github.io/portfolio](https://itsukiyomi.github.io/portfolio)

An honest, opinionated personal engineering portfolio for **Meet Rathod** (Gojo / iTsukiyomi). Built with the aesthetic and functional rigor of a brutalist printed magazine that boots directly into an interactive retro desktop workstation.

---

## ⚡ Core Concept & Philosophy

- **Operating System Metaphor**: The screen boots via an authentic BIOS sequence into a functional retro workstation with desktop icons, a draggable/resizable window manager, a system status bar, and an interactive POSIX-style terminal shell (`contact.sh`).
- **No Template Slop**: Zero Tailwind, zero shadcn, zero generic SaaS card grids, zero purple-blue gradients, zero marketing buzzwords. Every project is presented as an in-depth engineering case study with architecture diagrams, trade-off analysis, real failure logs, and post-mortems.
- **Three World Themes**:
  1. `Photocopy`: Cold architectural newsprint, carbon toner ink, and safety vermilion-orange.
  2. `Dusk`: Industrial slate iron plate with CAD blueprint drafting lines and laser cyan.
  3. `Phosphor`: Cathode Ray Tube (CRT) shadow mask with scanline grid, amber glow, and neon green alert strobe.
  - `Auto`: Follows local time of day (06:00-17:59 `photocopy`, 18:00-21:59 `dusk`, 22:00-05:59 `phosphor`).

---

## 🛠️ Stack & Standards

- **Core**: Vite 8 + React 19 + TypeScript 6
- **Animation**: GSAP 3 (ScrollTrigger, Draggable, Flip, SplitText) via `@gsap/react`
- **Smooth Scroll**: Lenis synchronized with `gsap.ticker` in a single unified animation loop (`lagSmoothing(0)`)
- **Styling**: Vanilla CSS with custom properties & design tokens. 100% composite-only motion (`transform`, `opacity`).
- **Typography**: 100% self-hosted WOFF2 fonts: `Cabinet Grotesk` (Indian Type Foundry / Fontshare) and `Martian Mono` (Evil Martians).
- **Quality Metrics**:
  - **Lighthouse Desktop**: 98 Performance / 100 Accessibility / 96 Best Practices / 100 SEO
  - **Lighthouse Mobile**: 97 Performance / 100 Accessibility / 96 Best Practices / 100 SEO
  - **Bundle Budget**: ~150 KB gzipped JS (well below the 250 KB budget)
  - **Impeccable Audit**: 0 anti-patterns detected

---

## 📁 Projects Featured

1. **dueler.bot (Pokémon Duel)**: Asynchronous Discord battle engine with speed bracket priorities, functional turn evaluation, heuristic minimax switch prediction, and FastAPI companion.
2. **mafioso.py (Mafioso)**: 12+ player hidden-role social deduction engine with FSM phase coordination and atomic Redis CAS voting tally locks.
3. **ani-cli.cpp**: Zero-dependency 380 KB compiled C++20 media streaming binary with raw ANSI VT100 terminal interface and automated POSIX zombie process reaper.
4. **shedskin**: 2D Metroidvania in Unity 6 featuring a 16-ray custom kinematic collision solver and exoskeleton skin-shedding decoy mechanics.
5. **next.txt**: R&D exploration into bytecode virtual machines in C++23 and deterministic rollback netcode.

---

## 🚀 Development & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run Oxlint on application code
npm run lint

# Build static production bundle into docs/
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment to GitHub Pages

GitHub Pages is configured directly from the default branch `retro` using the `/docs` folder:
- Default branch: `retro` (previous portfolio archived on branch `ai`)
- Build output path: `docs/`
- Every push to `retro` automatically updates the live website at `https://iTsukiyomi.github.io/portfolio`.

---

## 📋 TODO(meet) Checklist

Use this checklist to personalize or update your portfolio over time:

- [ ] **Resume PDF**: Place your latest compiled resume PDF in `public/resume.pdf` if you'd like a direct download link.
- [ ] **next.txt Updates**: Add benchmark metrics and public repository links to `src/data/portfolioData.ts` under the `next` project entry once your C++ compiler / VM prototype is ready to publish.
- [ ] **Custom Domain (Optional)**: If you purchase a custom domain (e.g. `meetrathod.dev`), add a `CNAME` file to `public/` and configure DNS settings on GitHub.
- [ ] **New Projects**: Add new project records to `PROJECTS_DATA` in `src/data/portfolioData.ts` and add corresponding desktop icon triggers in `DesktopIcons.tsx`.
