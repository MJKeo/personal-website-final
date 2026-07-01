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
├── TODOs.md            Deferred-work list (memory system)
├── package.json        Deps + scripts
├── .claude/            Agent config: rules/ (memory-system.md, website-copy-voice.md)
│                       + commands/ (write-experience-details, write-project-details, ...)
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
    AI-year explorations), plus the 7 earlier-work covers (`orm-strength-tracker/`,
    `tyes/`, `intelligent-tutoring-systems/`, `easy-budgeting/`, `ape-unit/`,
    `chaos-colleagues/`, `project-shatter/`), sourced from the old
    Personal-Website-2.0 repo's square
    project icons and wired via each `EARLIER_WORK` item's `cover`.
  - `experiences/` — same per-`slug` sub-folder layout (`banner.png` +
    `additional-images/`), one per `EXPERIENCES` card: `instagram/`,
    `orangeworks-innovation-lab/`, `facebook/`, `mealme/`, `dcu/` (all 16:9).
  - `games/` — **flat** game cover icons (`<slug>.png`, no per-game sub-folder):
    `worst-tic-tac-toe`, `banandersnatch`, `squids-tower-defense`,
    `minigame-mashup`, `snake`. Games have no detail page (cards
    link straight out to the hosted game), so there's no folder to hold extra
    media. Sourced from the old Personal-Website-2.0 games-page icons; wired via
    each `GAMES` item's `cover`.
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
  `summary`, and a 16:9 `cover` at `images/experiences/<slug>/banner.png`.
  `GAMES` (5 entries — the browser games, ported from the old site) are unlike the
  rest: each `href` is the **live, externally-hosted game** (GitHub Pages) rather
  than an internal detail route, so the Games cards open in a new tab and there are
  no `/games/:slug` detail pages for them. `cover` points at a flat
  `images/games/<slug>.png` icon; `summary` is a placeholder pending real copy.
  `GAMES` is standalone (not in `ALL_WORK`/`PROJECTS`). The `EXPERIENCES` entries
  for `instagram` and `orangeworks-innovation-lab` reuse the FLAGSHIPS
  slugs/hrefs/covers (only the summary is shorter), so to resolve experience detail
  routes `ALL_WORK` now appends `EXPERIENCE_ONLY` (`EXPERIENCES` minus any slug
  already in `FLAGSHIPS`), which adds `facebook`, `mealme`, and `dcu` to `bySlug`
  without a duplicate-slug clash (the two flagship experiences are listed first, so
  they still resolve to their fuller FLAGSHIPS copy). A derived `PROJECTS` list (CineMind + `EXPLORATIONS` +
  `EARLIER_WORK`, in homepage order) backs the Projects screen; its CineMind
  entry reuses the FLAGSHIPS data but overrides the long summary with a
  one-sentence version so every grid card has single-sentence copy.
  **Detail-page fields** (read by `WorkDetail` via `bySlug`, separate from the
  card fields): an item may carry `tagline` (string), `writeup` (string, or an
  array of blocks where a string is a paragraph and a `{ heading }` object is a
  section heading), an optional `link` (`{href, label}` for the inline title
  link), and a `gallery` (`[{src, alt}]` of `additional-images`). The CineMind
  FLAGSHIPS entry (real tagline + a full multi-section `writeup`; `link` is
  `https://www.cinemind.dev`, gallery is the six
  `cinemind/additional-images/image{1..6}.png`), the `chaos-colleagues`
  EARLIER_WORK entry (tagline + a 4-section hackathon `writeup`; `link` is its
  Devpost page, gallery is the four `chaos-colleagues/additional-images/image{1..4}.png`),
  the `project-shatter` EARLIER_WORK entry (tagline + a 4-section hackathon
  `writeup`; `link` is its Devpost page, gallery is the five
  `project-shatter/additional-images/image{1..5}.png`), the
  `orm-strength-tracker` EARLIER_WORK entry (tagline + a 4-section `writeup`; **no
  `link`** since the app is no longer on the App Store, gallery is the five
  `orm-strength-tracker/additional-images/image{1..5}.png`), the `nerdbot`
  EXPLORATIONS entry (tagline + intro + a compact 2-section `writeup` (How it works
  + Key learnings) on tool-calling-agent design; `link` is its HuggingFace Space,
  gallery is the three
  `nerdbot/additional-images/image{1..3}.png`), and the `interviewpro` EXPLORATIONS
  entry (tagline + a 5-section AI-year `writeup` on the multi-perspective LLM-as-judge
  feedback engine + parallel guardrail; `link` is `interviewpro.mikeohane.com`, gallery
  is the four `interviewpro/additional-images/image{1..4}.png`), the `ape-unit`
  EARLIER_WORK entry (tagline + intro + a compact 2-section `writeup` (How it works +
  What it taught me) on the Spring-2019 Data Structures gamification project, framed
  around incentive design + the edge-case testing habit; `link` is `ape-unit.github.io`, gallery is the two
  `ape-unit/additional-images/image{1..2}.png`), the `wizard-battle`
  EXPLORATIONS entry (tagline + intro + a compact 2-section `writeup` (How it works
  + Key learnings) on conveying game state to an LLM for decision-making, framed
  around state abstraction, reasoning-before-the-answer, latency/streaming, and
  few-shot crafting; `link` is `wizardbattle.mikeohane.com`, gallery is the three
  `wizard-battle/additional-images/image{1..3}.png`; note this entry uses
  `category: 'project'` + `href: '/projects/wizard-battle'`), the `tyes` EARLIER_WORK
  entry (tagline + a compact 3-part `writeup` — overview intro, `How it works`,
  `What I took from it` — on the Georgia Tech Grand Challenges medical-device project
  (instrumenting the 9-hole peg test for richer fine-motor timing data); deliberately
  scoped to Michael's actual role, the product ideation + the patient/therapist
  interface that made the device's data readable, and NOT the hardware the rest of the
  team built; **no `link`**, gallery is the two
  `tyes/additional-images/image{1..2}.png`), and the
  `intelligent-tutoring-systems` EARLIER_WORK entry (tagline + a compact 3-part
  `writeup` — overview intro, `How it worked`, `What I took from it` — on the
  Georgia Tech VIP intelligent-tutoring team (iterated over 2 semesters). Michael
  was the **frontend/product** person, so the copy frames the shared idea (a course
  buries its data/material where nobody can learn from it) as "we" and then states
  his actual work in "I": conceiving what the product should be for its users and
  building the two main interfaces (teacher view + student view) and the dynamic
  charts/graphs. The system's backend mechanics (consolidating performance data,
  KNN assignment-difficulty flagging, student-category grouping) are described in
  neutral "under the hood" voice, NOT claimed as his. Honest that it hit a working
  demo but never shipped; **no `link` or `gallery`** per Michael, since the project
  has neither and its `additional-images/` folder is empty). NOTE: an earlier draft
  wrongly led with the concept-mining/metadata work as his and drew a CineMind
  data-throughline — corrected 2026-07-01 after Michael clarified he was the
  frontend guy (charts/graphs + teacher/student views), not the data/backend side.
  The `easy-budgeting`
  EARLIER_WORK entry (tagline + a short 2-section `writeup` on the solo iOS budgeting app,
  framed around restraint/scope discipline + the burndown-over-a-running-total
  insight + a year of dogfooding; **no `link`** since it was never on the App Store,
  gallery is the four `easy-budgeting/additional-images/image{1..4}.png` — the Budget
  screen collapsed + expanded, then two Analyze burndown shots), and the `dcu`
  EXPERIENCES entry (the first experience detail page; `tagline` is the employment
  dates `May - August 2019`; a compact 3-part `writeup` (intro + `What I did` +
  `What it taught me`) on the summer-2019 IT internship, framed around small
  PowerShell/Active-Directory automations plus SQL-fed PowerBI sprint dashboards
  (the emphasis is data consolidation/preprocessing that let the team manage a
  sprint live and retro it after, not the burndown mechanics), and the lessons that
  a good product must both do something valued AND be usable by its intended
  audience, and that companies of every scale still work hard at getting organized
  (so it reads as a space with lots of room and few good products); **no `link` or
  `gallery`**), and the `mealme` EXPERIENCES entry (tagline `June - August
  2020`; a tight 4-sentence intro + 3 headed sections (`Making the browsing data
  free`, `Redesigning the part users actually touch`, `What it taught me`) on the
  summer-2020 iOS Engineer Intern stint at MealMe, a **live food-delivery
  price-comparison platform** that was **2 founders + 2 interns** fresh out of
  TechStars (NOT a 4-person full-time team; do not frame it as hunting for PMF or
  mention its earlier social-food-sharing origin), framed (Pillar 1) around "know
  your differentiator and don't overspend on what isn't it": browsing is the
  on-ramp and the price comparison is the edge, so the centerpieces are rebuilding
  browsing on a free MapKit+Yelp pipeline to kill map-API data costs, and a
  research-driven browse redesign that doubled DAU with no ad spend to get users to
  the differentiator with less friction (recommendation system kept to one
  sentence); `What it taught me` carries better-vs-first product + ship-a-lean-MVP-
  and-let-usage-guide-features, the discipline to pivot when a product is capped,
  and the early-traction core-vs-commodity reality; **no `link`/`gallery`**; the
  rough $0.10/user, ~75%, ~1M figures deliberately kept qualitative per Michael)
  have these so far, as does the `orangeworks-innovation-lab` FLAGSHIPS entry
  (tagline = the two intern spans `August - December 2020, August - December 2021`;
  heading-less intro + 4 conceptual sections — `Start with a problem, not a
  solution` / `Getting the real story out of people` / `From patterns to a pitch` /
  `My projects and outcomes` (the 2020 + 2021 projects merged into one outcomes
  section); **no `link`/`gallery`**), which groups both Home Depot intern stints onto one page,
  leads with Pillar 1 (product sense), walks the year-agnostic research → interview →
  prototype → executive-pitch method, then details the 2020 runner pre-authorization
  app that Home Depot shipped in January 2023 (now handling millions in transactions)
  and briefly covers the un-shipped 2021 home-management concept.
  Note `nerdbot` and `wizard-battle` are video-game-themed but live as regular
  `EXPLORATIONS` projects (`category: 'project'` + a `/projects/:slug` `href`), so
  their detail copy renders at `/projects/nerdbot` and `/projects/wizard-battle`
  alongside the other projects (there is no `/games/:slug` route).

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
  (`.project-card__subtitle`) are tinted to the primary (sage green) color via the
  `home__evidence` class.
- **`Experience/`** — the work-history index (`/experience`). Built: a
  `<PageHeader>` (eyebrow "The Track Record" + title "Experience" + lead) over a
  `<CardGrid>` of `compact` `<ProjectCard>`s mapped from `EXPERIENCES`, each
  passing `coverRatio="16/9"` so the wide banners aren't cropped to 4:3. No screen
  CSS — pure composition; cards keep the default primary (sage) accent. Each card
  links to its `/experience/:slug` detail route (`dcu` and `mealme` are authored;
  the others still `<InProgress>`).
- **`Projects/`** — the projects index (`/projects`). Built: a `<PageHeader>`
  (eyebrow "The Build Log" + title "Projects" + lead) over a `<CardGrid>` of
  `compact` `<ProjectCard>`s mapped from `PROJECTS`, with `showTags={false}` and
  the default 4/3 cover ratio (matching how these same cards render on the
  homepage). No screen CSS — pure composition, mirroring `Experience/`. Each card
  links to its `/projects/:slug` detail route (still `<InProgress>`).
- **`Games/`** — the games index (`/games`). Built: a `<PageHeader>` (eyebrow
  "The Arcade" + title "Games") over a `<CardGrid>` of `compact` `<ProjectCard>`s
  mapped from `GAMES`, each passing `external` so the whole card links out to the
  live hosted game in a new tab (no detail route). Same composition pattern as
  `Projects/` / `Experience/`; no screen CSS.
- **`WorkDetail/`** — shared, data-driven detail route for one item, resolved by
  `:slug` via `bySlug` (`/projects/:slug`, `/experience/:slug`).
  Built (`WorkDetail.js` + `WorkDetail.css`): renders inside a `<Section>` a
  tagline (PageHeader eyebrow style) → a title row (`<h1>` + an optional inline
  external-link icon, `HiArrowUpRight`, wrapped in `AppLink` when the item has a
  `link`) → the full-width `writeup` blocks (PageHeader lead type scale but
  **no** `max-width` cap; paragraph strings render as `<p>`, `{ heading }` blocks
  as scannable `<h2>` section headings) → a bottom `<Gallery>` of the item's images
  when present.
  The screen mirrors the Projects/Experience type scale in `WorkDetail.css`.
  **Items without a `writeup` fall back to `<InProgress>`**, so routes whose copy
  isn't authored yet (everything except CineMind, Chaos Colleagues, Project
  Shatter, ORM, Ape Unit, NerdBot, InterviewPro, Wizard Battle, Tyes,
  Intelligent Tutoring Systems, Easy Budgeting, and the `dcu` + `mealme`
  experiences) keep rendering the placeholder.
  Note: `ALL_WORK` now appends the experience-only slugs (`facebook`, `mealme`,
  `dcu`) via `EXPERIENCE_ONLY`, so `bySlug` resolves them and `/experience/:slug`
  renders authored copy where it exists (currently `dcu` and `mealme`); the rest
  still fall back to `<InProgress>` until written.
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
  An `external` prop (default `false`) forwards to `AppLink` so the whole card
  opens `item.href` in a new tab with rel safety — the Games cards pass it to link
  out to each hosted game.
- **`CardGrid/`** — responsive auto-fit grid wrapper (`min`, `columns`, `gap`).
- **`CardCarousel/`** — paginated horizontal-scroll track (snap + page dots,
  navigated by swipe/scroll; no arrow buttons). Used for the homepage project
  rows. Optional `slideSize` prop sets a `--carousel-slide-size` CSS var to
  override the per-slide flex-basis (default card width `clamp(250px, 80%, 320px)`)
  — the `Gallery` passes a wider value to fit ~2 images per view with a peek.
- **`Gallery/`** — horizontal-scroll image strip that reuses `CardCarousel`
  (with a wider `slideSize`) of clickable image tiles, plus a built-in
  full-screen **lightbox** overlay opened on tile click (dimmed `--color-overlay`
  backdrop, close button, prev/next when >1, closes on backdrop click + `Esc`,
  body scroll locked while open; the opened image's `alt` renders as a visible
  `<figcaption>` caption beneath it). Generic/data-driven — props: `images`
  (`[{src, alt}]`), `ariaLabel`. Used by `WorkDetail` for a project/experience's
  `additional-images`.
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
  `--color-text`, `--color-primary`, `--color-overlay` (modal scrim), etc.).
  Light is `:root`; dark mode re-points the same names via
  `prefers-color-scheme`. "What the color is for."

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
the CRA smoke test. The Home, Experience, Projects, and Games index screens are
built, and `WorkDetail` is now a built-out, data-driven detail screen — but
**only CineMind (`/projects/cinemind`), Chaos Colleagues
(`/projects/chaos-colleagues`), Project Shatter (`/projects/project-shatter`),
ORM (`/projects/orm-strength-tracker`), Ape Unit (`/projects/ape-unit`),
NerdBot (`/projects/nerdbot`), InterviewPro (`/projects/interviewpro`), Wizard
Battle (`/projects/wizard-battle`), Tyes (`/projects/tyes`), Intelligent
Tutoring Systems (`/projects/intelligent-tutoring-systems`), Easy Budgeting
(`/projects/easy-budgeting`), DCU (`/experience/dcu`), MealMe
(`/experience/mealme`), and OrangeWorks
(`/experience/orangeworks-innovation-lab`) have authored detail copy**; every other
detail route still falls back to `<InProgress>` until its `tagline`/`writeup`/
`gallery` are filled in. The `bySlug` reconciliation that lets experience slugs
resolve has now landed (`EXPERIENCE_ONLY` folded into `ALL_WORK`).
(The hosted browser games in `GAMES` have no detail pages by design — their cards
link out to the hosted game. NerdBot and Wizard Battle are video-game-themed but
are regular `EXPLORATIONS` projects (`category: 'project'`), so they get real
`/projects/nerdbot` and `/projects/wizard-battle` detail pages.)
The three
flagship cards (`images/experiences/`), the three AI-year exploration cards, and
the seven earlier-work cards (`images/projects/`) now all have real `cover`
images, so the `<Thumbnail>` placeholder is no longer used on the homepage.
