# KEY_DECISIONS.md

A durable log of decisions and learnings we want to carry across conversations,
so we don't re-litigate settled choices or lose hard-won context. Absorbed at the
start of every session alongside `PROJECT.md`.

**Edit policy:** the agent must **ask Michael before adding/changing entries
here** (see the memory-system rule). Each entry should be short, dated, and state
the decision + the reasoning so future-us understands the "why."

Format:
```
## YYYY-MM-DD — <short title>
**Decision:** what we settled on.
**Why:** the reasoning / what it rules out.
```

---

## 2026-06-26 — Memory system established
**Decision:** Maintain a four-file memory system at the repo root: `PROJECT.md`
(mission/context), `ARCHITECTURE.md` (codebase map), `KEY_DECISIONS.md` (this
file), and `CLAUDE.md` (session entrypoint that ties them together). Sessions
absorb `PROJECT.md` + `KEY_DECISIONS.md` up front and consult `ARCHITECTURE.md`
as needed.
**Why:** Keeps context durable and cheap to load across conversations; separates
the *why* (PROJECT), the *where* (ARCHITECTURE), and the *what-we-settled*
(KEY_DECISIONS) so each stays focused and individually maintainable.

## 2026-06-26 — Site's purpose is to get Michael hired
**Decision:** This website is a hiring asset aimed at small, AI-native,
in-person Boston startups (SWE / Founding / Product / AI Engineer roles). Every
content/design choice is judged by "does this make a target company want to talk
to Michael?"
**Why:** A single, explicit success metric keeps scope and messaging disciplined.
Full positioning lives in `PROJECT.md`.

## 2026-06-26 — "Fern" two-tier design-token system
**Decision:** Color is driven by a two-tier token system in
`src/styles/tokens/` — Tier 1 primitives (raw `--sage/clay/sand-*` ramps) and
Tier 2 semantic role tokens (`--color-*`). Components consume **only** semantic
tokens; dark mode re-points the same names via `prefers-color-scheme`. Palette is
"Fern": sage-green primary, terracotta accent, sand neutrals.
**Why:** Theming changes happen in one layer without touching components;
mirrors the proven pattern from Material / Spectrum / Carbon / Tailwind.

## 2026-06-26 — Generic, data-driven components
**Decision:** Components (`Navbar`, `Button`, `SocialLinks`, `Footer`) are kept
generic and reusable — all content comes in via props; page-level data lives in
`App.js` constants. Each component is a `Name/` folder with paired `.js` + `.css`
and a JSDoc prop header.
**Why:** Keeps the component layer reusable as the site grows and concentrates
editable content in one place.

## 2026-06-29 — Images organized by scope under `public/images/`
**Decision:** All static imagery lives in `public/images/`, foldered by *where it
is used*: `app-wide/` (site/browser-chrome branding), `home-page/`, `projects/`,
`experiences/`. Reference by root-absolute path (`/images/...`).
`public/README.md` is the source-of-truth map and is linked from `ARCHITECTURE.md`.
Card cover images are named `<slug>_banner.png` and placed in the folder matching
the item's domain — project covers in `projects/`, experience covers in
`experiences/` (e.g. CineMind is a project, so `projects/cinemind_banner.png`) —
wired via the `cover` field in `src/content/work.js`.
**Why:** Organizing by scope (not file type) makes images predictable to find and
add as the site grows, and keeps a single documented place for the convention so
it doesn't drift.

## 2026-06-26 — Interior pages are routed stubs for now
**Decision:** Build the homepage first; every other page (Projects / Experience /
Games index pages and all project/experience/game detail routes) is a real route
that renders a single shared `<InProgress>` placeholder until its content is
authored.
**Why:** Michael chose "homepage only for now." This keeps navigation honest and
the routing architecture in place without investing in pages whose copy isn't
written yet. Deferred build-out is tracked in `TODOs.md`.

## 2026-07-01 — Website copy uses a professional register (voice overlay)
**Decision:** All user-facing site copy follows a professional overlay on top of
Michael's writing style (`personal_context/my_writing_style.md`), captured in
`.claude/rules/website-copy-voice.md`. Two hard rules: (1) never undermine or
downplay his own work (nothing framed as easy/trivial/"straightforward"), and
(2) never use "cus" or other casual slang spellings in site copy, even though the
base style guide lists them as his quirks. Keep his voice (problem-first, reasoning
exposed, opinionated, "ex.", concrete examples); lift the register.
**Why:** The site is a hiring asset; casual self-deprecation and slang undercut the
credibility it needs. The base style guide optimizes for his authentic casual voice
(right for personal writing, too informal here). This overlay keeps the voice
recognizable while making it hiring-appropriate.
