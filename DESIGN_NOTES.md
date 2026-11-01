# DESIGN_NOTES.md

## Phase 1: Design Plan

### 1. Subject & Identity Grounding
- **Subject**: Meet Rathod (Handles: Gojo, iTsukiyomi). First-year BSc IT student, systems programmer, Discord bot architect, game dev, Arch/Omarchy Linux builder.
- **Audience**: Recruiters, open-source collaborators, hackathon judges, fellow systems and game engineers.
- **Job of Site**: Prove real software gets built, shipped, and debugged at the architectural level. Reject boilerplate "available for work" theater.
- **Metaphor**: A printed engineering magazine that boots like an operating system, built with the honesty of brutalism.

---

### 2. Compact Token System (Themes)
Three distinct, named worlds. Not light/dark inversions.

#### Theme A: `photocopy` (Daylight Newsprint & Heavy Carbon)
- `--bg`: `#e6e4dd` (raw newsprint paper; noticeably grittier than sterile cream)
- `--surface`: `#f1efe8` (reproduced document backing)
- `--ink`: `#111213` (carbon toner black)
- `--border`: `#111213` (hard 2px black structural lines)
- `--accent`: `#ff3800` (safety vermilion-orange; editorial registration stamp)
- `--muted`: `#707068` (dense halftone ink)
- `--shadow`: `4px 4px 0px #111213`

#### Theme B: `dusk` (Industrial Blueprint & Cold Iron)
- `--bg`: `#1c2229` (cold slate iron plate)
- `--surface`: `#242c35` (cad drafting surface)
- `--ink`: `#e5eaf0` (crisp blueprint chalk white)
- `--border`: `#3a4553` (sheet-metal junction seam)
- `--accent`: `#00f0ff` (laser plotter cyan)
- `--muted`: `#778799` (blueprint wash)
- `--shadow`: `4px 4px 0px #0b0e12`

#### Theme C: `phosphor` (Cathode Ray Amber & CRT Glow)
- `--bg`: `#0d100d` (anti-glare CRT shadow mask)
- `--surface`: `#141a13` (phosphor anode grid)
- `--ink`: `#ffb300` (amber terminal phosphor)
- `--border`: `#3d2f08` (heavy chassis rule)
- `--accent`: `#39ff14` (emergency green strobe)
- `--muted`: `#826214` (decay trace)
- `--shadow`: `4px 4px 0px #000000`

`theme auto`: Dynamically selects based on real local hour (06:00-17:59 `photocopy`, 18:00-21:59 `dusk`, 22:00-05:59 `phosphor`).

---

### 3. Typography Selection & Hierarchy
- **Display & Editorial Headlines**: `Cabinet Grotesk` (Variable, 800/900 weight, tight tracking, punchy geometric architecture).
- **Chrome, Data, & Terminal**: `Martian Mono` (Variable, mechanical, brutalist proportion, distinct glyph forms).
- **Type Scale**:
  - `hero`: `clamp(3.5rem, 8vw + 1rem, 7.5rem)` — line-height `0.92`, letter-spacing `-0.04em`.
  - `h1`: `clamp(2rem, 4vw + 0.5rem, 3.25rem)` — line-height `1.05`, letter-spacing `-0.03em`.
  - `h2`: `clamp(1.4rem, 2vw + 0.2rem, 2rem)` — line-height `1.15`, letter-spacing `-0.02em`.
  - `body`: `clamp(1rem, 0.4vw + 0.9rem, 1.125rem)` — line-height `1.55`, max-width `68ch`.
  - `meta`: `0.8125rem` (`Martian Mono`), uppercase only when functional (e.g. status flags).

---

### 4. Layout Architecture & ASCII Wireframes

#### Desktop Layout (1440px - 2560px)
```
+-----------------------------------------------------------------------------+
| [RATHOD // VOL. 01]   [SYS: OMARCHY LINUX]   [THEME: PHOTOCOPY]   [14:42:09]|
+-----------------------------------------------------------------------------+
|                                                                             |
|  +-- DESKTOP ICONS (draggable/clickable) --------------------------------+  |
|  | [1] dueler.bot    [2] mafioso.py    [3] ani-cli.cpp    [4] shedskin   |  |
|  | [5] about.txt     [6] contact.sh    [7] next.txt       [8] resume.pdf |  |
|  +-----------------------------------------------------------------------+  |
|                                                                             |
|  +-- EDITORIAL ISSUE COVER / MASTHEAD -----------------------------------+  |
|  | ISSUE NO. 01               ARCH / SYSTEMS / GAMES         2026.11        |
|  | ===================================================================== |  |
|  |                                                                       |  |
|  |   MEET RATHOD                                                         |  |
|  |   // SYSTEMS & BOT ARCHITECTURE                                       |  |
|  |                                                                       |  |
|  |   "Real software is defined by its edge cases and recovery loops,     |  |
|  |    not its happy-path marketing copy."                                |  |
|  +-----------------------------------------------------------------------+  |
|                                                                             |
|  +-- FLOATING WINDOW (Draggable, 3D tilt, Z-indexed, Clamped) -----------+  |
|  | [ # dueler.bot // CASE STUDY ]                        [_] [^] [X]     |  |
|  | --------------------------------------------------------------------- |  |
|  | THE PROBLEM  | Turn-based tactical battle engine on Discord without   |  |
|  | ARCHITECTURE | [SVG Dataflow: Bot -> Engine -> Snapshot -> View]      |  |
|  | 3 DECISIONS  | 1. Functional immutability  2. Heuristic Minimax       |  |
|  | WHAT BROKE   | KeyError: 'damage_class' on Gen4 physical/special      |  |
|  | RETROSPECT   | Would migrate button grid to WebSockets companion      |  |
|  +-----------------------------------------------------------------------+  |
|                                                                             |
|  +-- EDITORIAL SPREAD: ABOUT & COLOPHON ---------------------------------+  |
|  | [PHOTO CROP: NEVOM / ARCH WORKSPACE] | DROP CAP: "I build tools that  |  |
|  |                                      | live in terminals and engines. |  |
|  | GUTTER ASIDE: "Omarchy setup running | First-year BSc IT exploring    |  |
|  | Hyprland on Arch Linux kernel 7.2"   | memory models & compilers..."  |  |
|  +-----------------------------------------------------------------------+  |
|                                                                             |
|  +-- INTERACTIVE TERMINAL CONTACT: contact.sh ---------------------------+  |
|  | gojo@omarchy:~$ help                                                  |  |
|  | Available: whoami, ls, cat, projects, open <id>, neofetch, sudo, clear|  |
|  | gojo@omarchy:~$ _                                                     |  |
|  +-----------------------------------------------------------------------+  |
|                                                                             |
+-----------------------------------------------------------------------------+
| [START] [dueler.bot] [about.txt]                     [CPU: 1.2%] [RAM: OK]  |
+-----------------------------------------------------------------------------+
```

#### Mobile Shell (<768px)
```
+---------------------------------------------------+
| [RATHOD // ISSUE 01]            [PHOTOCOPY] [14:42]|
+---------------------------------------------------+
| APP LAUNCHER / METRO DESKTOP                      |
| +-------------+ +-------------+ +---------------+ |
| | dueler.bot  | | mafioso.py  | | ani-cli.cpp   | |
| +-------------+ +-------------+ +---------------+ |
| +-------------+ +-------------+ +---------------+ |
| | shedskin    | | about.txt   | | contact.sh    | |
| +-------------+ +-------------+ +---------------+ |
|                                                   |
| EDITORIAL SUMMARY CAROUSEL                        |
|                                                   |
| +-- BOTTOM SHEET (SLIDE UP MODAL ON OPEN) ------+ |
| | [=== DRAG HANDLE ===]             [X CLOSE]   | |
| | dueler.bot : CASE STUDY                       | |
| | Scrollable case study body with touch targets | |
| +-----------------------------------------------+ |
|                                                   |
| CHIP-DRIVEN TERMINAL INPUT                        |
| [ whoami ] [ projects ] [ email ] [ neofetch ]    |
| > _                                               |
+---------------------------------------------------+
```

---

### 5. Signature Moments & Deliberate Imperfections
1. **The Single Hero Moment**: **The Raster Print Carriage Stamp**.
   On page boot, the masthead is physically locked into the grid lines. A fast single-pass laser/print line sweeps across the masthead grid leaving the inky stamp of the title block.
2. **The One Memorable Thing**: Dual-mode reading experience.
   Read the page linearly as a publication, or activate the desktop shell where every case study, about article, and terminal is an interactive, draggable, resizable OS window with 3D perspective tilt.
3. **Deliberate Imperfections (Anti-AI Signature)**:
   - *Imperfection 1*: The top right issue number badge is rotated `-2.4deg` and intentionally breaks past the 2px boundary rule like an authentic ink stamp misaligned on newsprint.
   - *Imperfection 2*: An unfinished-looking diagnostic readout box in the bottom bar with raw memory counters and a manual tick lever.
   - *Imperfection 3*: The architecture diagram in the About section bleeds 32px out into the right gutter margin, breaking the strict column grid on purpose.

---

## Phase 2: Review & Attack Against Banned List

### Banned List Audit & Self-Critique
| Potential Default / AI Tell | Why It Was Flagged | What Was Chosen Instead |
| :--- | :--- | :--- |
| **Fonts**: Inter or Space Grotesk | Default AI typography choice | **Cabinet Grotesk** (display) + **Martian Mono** (chrome/code). Authentic character and brutalist presence. |
| **Colors**: Cream (#F4F1EA) + Terracotta (#D97757) | Typical Anthropic/Claude generated palette | **Photocopy**: `#e6e4dd` gritty newsprint + `#111213` toner + `#ff3800` vivid signal vermilion. |
| **Colors**: Dark mode + Purple gradient | Generic SaaS aesthetic | **Dusk** slate-iron + cyan, and **Phosphor** amber CRT monochrome. No gradients anywhere. |
| **Hero**: Centered title + 3 stat pills | AI portfolio archetype | Asymmetric, left-anchored magazine masthead with real issue volume, build timestamp, and real commit SHA. |
| **Cards**: Identical rounded cards with soft shadows | Generic component library default | 0px sharp corners, hard 2px solid borders, hard offset shadows (`4px 4px 0 #111213`), varied sizes. |
| **Chrome**: "PROJECTS — 01" tracked label | Generic eyebrow tell | Functional directory syntax (`~/projects/dueler.bot`), real file extensions, no fake numbers. |
| **Copy**: "Passionate developer crafting digital experiences" | Generic buzzword slop | "First-year BSc IT student. I build Discord bot engines, terminal media players in C++, and Metroidvanias in Unity. If it doesn't break under load, it hasn't been tested." |

### Cover-The-Logo Test Pass
Every case study features actual code details, specific file names (`pokemon.py`, `moves.py`, `ptypes.py`), real error tracebacks (`KeyError: 'damage_class'`, `asyncio.CancelledError`), and honest design trade-offs. None of this copy could sit on any other developer's site.
