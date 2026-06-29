# ARCHITECTURE.md

A map of the codebase so an agent can navigate efficiently without re-scanning
everything. Keep this in sync with the actual file structure (see the memory-
system rule). This describes the *how/where*; `PROJECT.md` covers the *why*.

## Stack at a glance

- **React** via **Create React App** (`react-scripts`). No TypeScript, no CSS
  framework.
- **React Router** (`react-router-dom` v6) for client-side routing — every page
  is a real route (see `src/screens/`).
- **Plain CSS** with a two-tier design-token system ("Fern" palette).
- Icons via **`react-icons`**.
- Scripts: `npm start` (dev server), `npm run build` (prod bundle), `npm test`.

> Hosting note: this is a client-side SPA (`BrowserRouter`). Static hosts must
> fall back to `index.html` for unknown paths so deep links / refreshes work.

## Top-level layout

```
personal-website-final/
├── CLAUDE.md            Session entrypoint + memory-system pointers
├── PROJECT.md           Mission & conceptual context (the "why")
├── ARCHITECTURE.md      This file — codebase map (the "how/where")
├── KEY_DECISIONS.md     Durable decisions/learnings across sessions
├── README.md           Default CRA readme (boilerplate)
├── package.json        Deps + scripts
├── .cursor/rules/      Cursor coding-convention rules (screens/components/tokens)
├── public/             Static assets served as-is
├── src/                Application source
└── personal_context/   Background material on Michael (gitignored; see CLAUDE.md)
```

## `public/` — static assets

Served from the site root (`/`); referenced by root-absolute path
(`/images/app-wide/icon.png`), not imported. **See
[`public/README.md`](public/README.md) for the full image folder map and
conventions — read it first when locating, adding, or moving any image.**

- **`images/`** — all imagery, organized **by scope** (where it's used):
  - `app-wide/` — whole-site/browser-chrome branding: `favicon.ico`,
    `icon.png` (hero avatar + 512×512 PWA icon), `apple-touch-icon.png`, `me.png`.
  - `home-page/` — Home-screen-only assets: `banana.png` (the `<ParticleField>`
    "banana" particle).
  - `projects/` — one sub-folder per project, named by its `slug`; each holds a
    `banner.png` card cover (wired via `work.js` `cover`) and an empty
    `additional-images/` for future detail-page media. Covers: `cinemind/`,
    `interviewpro/`, `nerdbot/`, `wizard-battle/` (CineMind flagship + the three
    AI-year explorations), plus the 6 earlier-work covers (`orm-strength-tracker/`,
    `tyes/`, `intelligent-tutoring-systems/`, `ape-unit/`, `chaos-colleagues/`,
    `project-shatter/`), sourced from the old Personal-Website-2.0 repo's square
    project icons and wired via each `EARLIER_WORK` item's `cover`.
  - `experiences/` — same per-`slug` sub-folder layout (`banner.png` +
    `additional-images/`), one per `EXPERIENCES` card: `instagram/`,
    `orangeworks-innovation-lab/`, `facebook/`, `mealme/`, `dcu/` (all 16:9).
- `index.html` — HTML shell (CRA mount point `#root`); links favicon, icon, and
  apple-touch-icon via their `images/app-wide/` paths.
- `resume_summer_2026.pdf` — résumé, linked from the Navbar action button.
- `manifest.json`, `robots.txt` — PWA manifest (icons under `images/app-wide/`)
  and crawler rules.

## `src/` — application source

### Entry & shell
- `index.js` — React entry; mounts `<App>` inside `<BrowserRouter>` in
  StrictMode, imports `index.css`, wires `reportWebVitals`.
- `index.css` — global element resets / base typography (body, code fonts).
- `App.js` — the **router + shared chrome**. Defines `<Layout>` (Navbar +
  `<main>` `<Outlet>` + Footer) and the `<Routes>` table; includes a
  `ScrollToTop` on route change. Pulls all page data from `src/content/`.
- `App.css` — base body styles + `.app-main` layout (imports the token barrel).
- `App.test.js`, `setupTests.js`, `reportWebVitals.js`, `logo.svg` — CRA
  boilerplate. Low priority.

### Content/data — `src/content/`
Page copy and config live here (not inside components/screens) so content is
editable in one layer.
- `site.js` — `IDENTITY` (name, avatar, pitch, tagline), `CONTACT_EMAIL`,
  `RESUME`, `NAV_LINKS`, `SOCIAL_LINKS`.
- `work.js` — the evidence: `FLAGSHIPS` (CineMind, Instagram/Meta, Home Depot's
  OrangeWorks lab), `EXPLORATIONS` (the AI-year projects), `EXPERIENCES` (the full
  professional work history shown on the Experience screen), and `EARLIER_WORK`
  (the wider non-AI portfolio — apps, games, academic, hackathons), plus
  `byCategory()` / `bySlug()` helpers. Each entry is data-only and rendered by
  `<ProjectCard>`. Flagship entries carry `title` + `subtitle` + `summary` + a
  `cover` image path → `<Thumbnail src>` (all three flagships have covers under
  `images/experiences/`); explorations carry `title` + `summary` + `tags` + a
  `cover` (banners under `images/projects/`); earlier-work cards now carry a
  one-line `summary` + a `cover` banner (also under `images/projects/`).
  `EXPERIENCES` (5 entries, reverse-chronological: Instagram, OrangeWorks
  Innovation Lab, Facebook, MealMe, DCU) carry a company `title`, a one-sentence
  `summary`, and a 16:9 `cover` at `images/experiences/<slug>/banner.png`. Its two
  flagship entries (`instagram`, `orangeworks-innovation-lab`) reuse the FLAGSHIPS
  slugs/hrefs/covers (only the summary is shorter) and are **not** included in
  `ALL_WORK` (avoids a duplicate-slug clash) — reconcile when experience detail
  pages need `bySlug`. A derived `PROJECTS` list (CineMind + `EXPLORATIONS` +
  `EARLIER_WORK`, in homepage order) backs the Projects screen; its CineMind
  entry reuses the FLAGSHIPS data but overrides the long summary with a
  one-sentence version so every grid card has single-sentence copy.

### Screens (routed pages) — `src/screens/<Name>/`
**Every full page is a screen with its own route** (registered in `App.js`),
not a swapped-in component. Each is a folder with paired `Name.js` + optional
`Name.css`. Screens compose reusable components and pull copy from `src/content/`.
- **`Home/`** — the persuasive homepage: hero argument → "Key Experiences"
  flagship evidence cards → "LLM Engineering" / "AI-Native Applications"
  builds carousel → "The Wider Portfolio" / "Apps, Games & Research" carousel.
  (`/`) **Fully built** (along with `Experience/`). The evidence section uses a
  `SectionHeading` with eyebrow "The Proof" + title "Key Experiences" (no
  lead), three `feature` `<ProjectCard>`s, then a centered "More experiences →"
  text link (`AppLink`, primary color, underline-on-hover — styled like the
  card CTA, not a button) to `/experience`. That link's top gap and the section's
  bottom padding are matched (`clamp(36px, 6.75vh, 72px)`) via the
  `home__evidence` class. A clipped `home__hero-stage` wraps the hero *and* the
  evidence section, with a `<ParticleField>` (secondary/clay) layered behind both
  and a `<ParticleControls>` picker pinned to the stage's top-left corner (under
  the navbar; off · circle · square · star · banana; default off). The clip keeps
  the particles inside that band, out of the sections below. The two project
  carousels (AI builds + wider portfolio) use the default primary (sage) accent.
  In the evidence ("Key Experiences") section, the flagship card taglines
  (`.project-card__subtitle`) are re-tinted to the secondary (clay) color via the
  `home__evidence` class.
- **`Experience/`** — the work-history index (`/experience`). Built: a
  `<PageHeader>` (eyebrow "The Track Record" + title "Experience" + lead) over a
  `<CardGrid>` of `compact` `<ProjectCard>`s mapped from `EXPERIENCES`, each
  passing `coverRatio="16/9"` so the wide banners aren't cropped to 4:3. No screen
  CSS — pure composition; cards keep the default primary (sage) accent. Each card
  links to its `/experience/:slug` detail route (still `<InProgress>`).
- **`Projects/`** — the projects index (`/projects`). Built: a `<PageHeader>`
  (eyebrow "The Build Log" + title "Projects" + lead) over a `<CardGrid>` of
  `compact` `<ProjectCard>`s mapped from `PROJECTS`, with `showTags={false}` and
  the default 4/3 cover ratio (matching how these same cards render on the
  homepage). No screen CSS — pure composition, mirroring `Experience/`. Each card
  links to its `/projects/:slug` or `/games/:slug` detail route (still
  `<InProgress>`).
- **`Games/`** — index page (`/games`). Not built out yet — renders only the
  shared `<InProgress>` notice.
- **`WorkDetail/`** — shared detail route for one item, resolved by `:slug`
  (`/projects/:slug`, `/experience/:slug`, `/games/:slug`). Not built out yet —
  renders only `<InProgress>`.
- **`NotFound/`** — minimal 404 for unmatched routes (`*`).

### Components — `src/components/<Name>/`
Each component is a folder with paired `Name.js` + `Name.css`. All are
intentionally **generic/reusable** (data passed via props) and consume semantic
tokens so they theme automatically. JSDoc headers document each prop API.

- **`AppLink/`** — smart link primitive: client-side `<NavLink>` for internal
  routes, `<a>` (safe new-tab rel) for external/file/hash. Used by Navbar,
  Button, and cards. (No CSS — inherits caller styling via `className`.)
- **`Navbar/`** — sticky top nav, right-aligned link cluster + actions. Props:
  `logoSrc`, `siteName`, `homeHref`, `links[]`, `actions`. Uses `AppLink` for
  active-route highlighting.
- **`Button/`** — renders an `AppLink` when `href` is set, else `<button>`.
  Variants: `primary` | `secondary` | `ghost`. `external` adds new-tab rel.
- **`Hero/`** — large landing header: avatar, eyebrow, title, lead, actions slot.
- **`PageHeader/`** — compact interior-page header (eyebrow + title + lead).
- **`Section/`** — centered max-width content band (`width`, `muted`) for
  consistent page rhythm.
- **`SectionHeading/`** — eyebrow + title + lead block inside a section. All
  three are optional (title renders only when provided).
- **`ProjectCard/`** — primary evidence card. `feature` (large flagship) and
  `compact` variants; whole card links to `item.href`. `feature` renders
  thumbnail + eyebrow + title + `subtitle` + summary + (optional bullets/tags);
  `compact` renders thumbnail + title + summary + tags. A `showTags` prop
  (default `true`) hides the tag chips when `false` — the AI year cards pass
  `showTags={false}` (their tag data stays in `work.js` for future detail pages).
  The flagship cards currently pass title/subtitle/summary only. An optional
  `coverRatio` prop overrides the per-variant thumbnail ratio (default 16/9 for
  `feature`, 4/3 for `compact`) — the Experience cards pass `coverRatio="16/9"`.
- **`CardGrid/`** — responsive auto-fit grid wrapper (`min`, `columns`, `gap`).
- **`CardCarousel/`** — paginated horizontal-scroll track (snap + page dots,
  navigated by swipe/scroll; no arrow buttons). Used for the homepage project
  rows.
- **`Thumbnail/`** — media tile; renders a themed **placeholder** (initials +
  pattern) when no `src` is supplied. Swap in real imagery later, no other change.
- **`Tag/`** (+ `TagList`) — small pill labels for tech/category chips.
- **`InProgress/`** — minimal, self-contained "this page is in progress" notice.
  The sole content of every non-home screen until those pages are built out.
- **`ParticleField/`** — generic decorative `<canvas>` layer of free-floating
  particles that drift, **scatter from the cursor on hover**, and are **pulled
  toward it while the pointer is held down** (gravity). Non-interactive
  (`pointer-events: none`); absolutely fills + is clipped to its `position:
  relative` parent, so drop it in as a first child to layer it *behind* content.
  Density is **area-based** (count scales with field size). Props: `shape`
  (`off`|`circle`|`square`|`star`|`image`), `imageSrc`, `imageScale`, `count`
  (floor), `areaPerParticle` (lower = denser), `color` (defaults to themed
  `--particle-color`), `minSize`/`maxSize`, `repelRadius`/`repelStrength`,
  `gravityRadius`/`gravityStrength`. Idle (no rAF) when `shape="off"`. Zero deps.
- **`ParticleControls/`** — generic collapsible picker that rests as a single
  circle showing the current selection and **unfurls a vertical column of
  options on hover / focus / tap** (CSS transition + staggered pop), collapsing
  back to the chosen icon (a "no" prohibition sign when `off`). Tap-to-toggle
  for touch. Icons render into a shared 20×20 box; the Home picker passes
  uniformly-sized SVG shapes (not font glyphs) so every option matches. Pairs
  with `ParticleField` but is decoupled. Props: `value`, `onChange`, `options`
  (`{value, label, icon?}`), `ariaLabel`.
- **`SocialLinks/`** — row of icon links; `links[]` of `{label, href, icon}`.
- **`Footer/`** — brand band: "Get in touch" (mailto) + "Find me online"
  (`SocialLinks`). Props: `email`, `socialLinks[]`.

### Design tokens — `src/styles/tokens/`
Two-tier system; **components must only consume Tier 2 (semantic) tokens**,
never raw primitives.
- `index.css` — barrel; imports primitives then semantic (order matters).
- `primitives.css` — **Tier 1**: raw color ramps (`--sage-*`, `--clay-*`,
  `--sand-*`), 50→950. "What the color is."
- `semantic.css` — **Tier 2**: role tokens components use (`--color-bg`,
  `--color-text`, `--color-primary`, etc.). Light is `:root`; dark mode
  re-points the same names via `prefers-color-scheme`. "What the color is for."

The palette is **"Fern"**: sage-green primary, terracotta ("clay") accent, warm
sand neutrals.

## Conventions

These are enforced by `.cursor/rules/coding-conventions.mdc` — keep both in sync.

- **New screen (page) →** its own route in `App.js` **and** its own folder under
  `src/screens/`. Never swap a page in as a component.
- **New component →** new folder under `src/components/`, paired `.js` + `.css`,
  JSDoc prop header, keep it data-driven/generic and reusable.
- **Styling →** use `var(--color-*)` semantic tokens only; add new colors as a
  primitive in `primitives.css` then a role in `semantic.css` (light + dark),
  never hard-code hex in component/screen CSS.
- **Page content/data →** lives in `src/content/` (`site.js`, `work.js`), not
  inside components or screens.
- **Internal links →** use `AppLink` (or router links) so navigation is
  client-side; external/file links get new-tab rel safety.
- **Assets →** drop in `public/images/` (by scope; see `public/README.md`),
  reference by root-absolute path (`/images/app-wide/icon.png`).

## Not yet present (so you don't go looking)

No state management, no backend/API, no env config in use, no test suite beyond
the CRA smoke test. The Home, Experience, and Projects index screens are built;
the **Games index and all project/experience/game detail pages are scaffolded
routes only** (render `<InProgress>`) — the full write-ups are the next
build-out. The three
flagship cards (`images/experiences/`), the three AI-year exploration cards, and
the six earlier-work cards (`images/projects/`) now all have real `cover`
images, so the `<Thumbnail>` placeholder is no longer used on the homepage.
