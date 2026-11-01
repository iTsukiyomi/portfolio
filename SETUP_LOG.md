# Phase 0 Setup Log

## 1. MCP Servers
- `playwright`: Verified connected via `claude mcp list` (`npx @playwright/mcp@latest`).
- `context7`: Local stdio MCP added via `claude mcp add context7 -- npx -y @upstash/context7-mcp` to local config (`/home/gojo/.claude.json`).

## 2. Design Skills & Tooling Installed
- `pbakaus/impeccable`: Installed to `.agents/skills/impeccable` and symlinked.
- `emilkowalski/skill`: Installed 16 skills (`emil-design-eng`, `animate`, `animation-performance`, etc.) to `.agents/skills/`.
- `taste-skill` (`design-taste-frontend`): Installed to `.agents/skills/design-taste-frontend`.
- `vercel-labs/agent-skills`: Installed 9 skills (`web-design-guidelines`, `vercel-composition-patterns`, etc.).
- `greensock/gsap-skills`: Installed 8 official GSAP skills (`gsap-core`, `gsap-react`, `gsap-scrolltrigger`, `gsap-plugins`, etc.).
- `frontend-design`: Installed and copied to `.claude/skills/frontend-design/SKILL.md`.

## 3. Git Repository Architecture & Branching
- Repositories inspected: `iTsukiyomi/portfolio` on GitHub.
- Accidental parent init identified; working directly in `/home/gojo/projects/portfolio`.
- GitHub branches created and configured:
  - `ai`: Preserves the previous portfolio state.
  - `retro`: The new active development and default branch (`gh repo edit iTsukiyomi/portfolio --default-branch retro`).
  - GitHub Pages configured to serve from `retro` branch with `/docs` directory via GitHub API.
  - Previous `main` deleted on remote.

## 4. Current Documentation Verified
- Official GSAP skills verified: `useGSAP` hook from `@gsap/react`, `ScrollTrigger.update`, `Draggable`, `Flip`, `SplitText`.
- Lenis single-animation loop pattern verified: Lenis driven by `gsap.ticker.add((time) => lenis.raf(time * 1000))`, `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.lagSmoothing(0)`.
- `data-lenis-prevent` applied to internal scrolling containers (windows, terminal).
- `gsap.matchMedia()` rules established for `(hover: hover) and (pointer: fine)` and `(prefers-reduced-motion: reduce)`.
