# Gojo — Portfolio

React + TypeScript + Tailwind CSS v4 + Framer Motion. Dark theme, spotlight-glow hero, bento grid, 3D tilt cards — inspired by JavaScript Mastery's (Adrian Hajdin) portfolio structure, rebuilt with Gojo's actual content.

Screenshots of every section are in `/screenshots`.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Framer Motion for scroll reveals and the stagger-in headline
- Radix UI primitives (Dialog) wrapped in hand-written components — the shadcn CLI registry wasn't reachable from the sandbox this was built in, so `src/components/ui/*` is authored directly instead of CLI-generated
- Self-built effects: spotlight glow (`spotlight.tsx`), 3D tilt + cursor-glow cards (`spotlight-card.tsx`), CSS-only wireframe sphere (`wire-sphere.tsx`, no WebGL/Three.js), magnetic buttons

## Design direction

Dark theme only (no toggle, per request), violet accent (`#7C5CFF`), single-theme like the rest of this build's history — this time the reference point is Adrian Hajdin's "Modern & Minimal" portfolio: a spotlight-lit hero, an asymmetric bento grid for the about section, and tilt-on-hover project cards. Structure is borrowed; content is not — no fabricated testimonials, client work, or job history, since none of that applies here. The bento grid holds real facts only: the bio, the three actual focus areas, real tech stack, and a copy-email shortcut.

One real bug worth knowing about if you touch `spotlight.tsx` or `mesh`-style background components: a `-z-10` element inside a `position: relative` container that doesn't establish its own stacking context will render **behind the entire page**, not just behind its own section, because the negative z-index escapes up to the nearest ancestor stacking context (often the document root). The fix is adding `isolate` to the container (see `hero.tsx` and `contact.tsx`) — it forces a local stacking context so negative-z children stay scoped inside.

## Run it

```
npm install
npm run dev
```

Build for production:

```
npm run build
```

Output lands in `dist/` — drag that into Netlify/Vercel, or serve it from any static host.

## Editing content

Two files:

- `src/data/profile.ts` — name, email, tech stack list, and the three focus-area cards
- `src/data/projects.ts` — project cards, pulled from public GitHub repos only

Add a project by adding another object to the `projects` array in `src/data/projects.ts` — it renders automatically.

**Before deploying**, replace the placeholder email in `src/data/profile.ts`.

## Structure

```
src/
  components/
    ui/          button, badge, dialog, spotlight, spotlight-card, wire-sphere, magnetic, reveal
    sections/    nav, hero, bento, projects, contact, footer
  data/          profile.ts, projects.ts — edit these to update content
  App.tsx
  main.tsx
  index.css      design tokens (@theme block)
screenshots/      reference screenshots of every section, desktop + mobile
```

## Notes

- Only `manga-cli` and `fastapi-projects` are public on `github.com/iTsukiyomi`, so those are the only two project cards. Add more once other repos go public.
- No résumé has ever been attached in the chat this was built from — bio and copy come from prior conversation context, not a document. Sanity-check `src/data/profile.ts` and the bio text in `bento.tsx` before publishing, and swap in your real email.
