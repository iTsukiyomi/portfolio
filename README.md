# Meet Rathod. Portfolio.

React + TypeScript + Tailwind CSS v4 + Framer Motion. Dark theme, spotlight glow hero, bento grid, 3D tilt cards.

Screenshots of every section are in `/screenshots`.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Framer Motion for scroll reveals and the stagger in headline
- Radix UI primitives (Dialog) wrapped in hand written components
- Self built effects: spotlight glow, 3D tilt plus cursor glow cards, magnetic buttons

## Content is grounded in the real resume

Everything on the site now matches the actual resume: first year B.Sc IT student, real name Meet, real email, real projects (a FastAPI based manga CLI tool and a plain HTML and CSS portfolio). Earlier drafts of this site had fabricated content (Discord bots, C++, Rust, a compiler) pulled from unrelated notes. None of that is here anymore.

## Fixes from the last round

- The project modal background was rendering white instead of dark. Cause: the overlay used `bg-ink/40`, but `ink` is the text color token (near white), not a background token. Fixed to use the actual background token with a stronger blur.
- The empty circle card in the bento grid (a decorative CSS sphere) is gone, replaced with a small Languages card (English, French, Hindi, pulled straight from the resume).
- The Contact panel used to have a big always on glow that partly washed out the text. It now uses the same hover reactive spotlight as every other card: dim at rest, glows and follows the cursor on hover.

## Run it

```
npm install
npm run dev
```

Build for production:

```
npm run build
```

Output lands in `dist/`. Drag that into Netlify or Vercel, or serve it from any static host.

## Editing content

Two files:

- `src/data/profile.ts`: name, email, tech stack list, the three focus area cards, languages
- `src/data/projects.ts`: project cards. `repo` is optional, leave it out for a project with no public link (the button shows "No public repo for this one yet" instead)

Add a project by adding another object to the `projects` array. It renders automatically.

## Structure

```
src/
  components/
    ui/          button, badge, dialog, spotlight, spotlight-card, magnetic, reveal
    sections/    nav, hero, bento, projects, contact, footer
  data/          profile.ts, projects.ts
  App.tsx
  main.tsx
  index.css      design tokens (@theme block)
screenshots/      reference screenshots of every section, desktop and mobile
```
