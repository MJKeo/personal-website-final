# TODOs.md

Outstanding actions we discussed during a conversation but did **not** actually
implement. This is the project's "we said we'd do this" list so deferred work
isn't lost between sessions. Reviewed at the start of each session.

**Edit policy:** freely editable by the agent — add an item whenever we agree
something should happen but don't do it now; check items off (or remove them)
once they're actually done. Added via the `/create-todo` command or
automatically during work (see `.claude/rules/memory-system.md`).

Format:
```
- [ ] YYYY-MM-DD — <action>. <optional: why / context / where>
```

---

## Open

- [ ] 2026-06-26 — Fill in the 8 non-AI `EARLIER_WORK` cards in
  `src/content/work.js` (Intelligent Tutoring Systems, ORM, Tyes, Chaos
  Colleagues, Ape Unit, Project Shatter, Let's Get Ready, THD Hackathon). They're
  title-only placeholders now — add a one-line summary + tags for each, and
  confirm the category guesses (which are games / apps / academic / hackathon)
  and that THD = The Home Depot.
- [ ] 2026-06-26 — Write the flagship detail pages (CineMind, Meta, Home Depot).
  Routes `/projects/:slug` & `/experience/:slug` exist but render `<InProgress>`;
  replace `WorkDetail` (or add per-item screens) with real write-ups. _In progress
  2026-06-30: `WorkDetail` is now a built-out, data-driven detail screen
  (tagline → title + optional inline product link → full-width writeup → bottom
  image `<Gallery>` w/ lightbox), driven by new `work.js` detail fields
  (`tagline`/`writeup`/`link`/`gallery`) resolved via `bySlug`. **CineMind**
  (`/projects/cinemind`) is **fully written 2026-06-30, then deepened 2026-06-30**:
  the writeup was rewritten in Michael's voice (per `personal_context/my_writing_style.md`)
  to ~11 headed sections + intro at much higher technical detail (problem/two-browse-flows
  + RAG-course origin, vector-vs-structured reasoning, movie-quality filtering, LLM
  consolidation, LLM keyword generation w/ majority voting, ingestion eval harness holding
  the 4x cost win, query decomposition, search eval loop, full similarity/cohesion/diverse-
  ordering detail, browsing features, productionizing-as-evolution). Proprietary vector +
  search internals kept deliberately vague; data sources unnamed per the IMDB-TOS
  constraint. NOTE: per Michael's request the intro dropped the `$1,200` + `cinemind.dev`
  mentions and the "Owning the whole thing" section was removed, so **the `$1,200` figure
  no longer appears anywhere in the writeup** (live link still on the title arrow) — re-add
  the cost somewhere if desired. `WorkDetail` writeups accept `{ heading }` blocks (render
  as `<h2>`) alongside paragraph strings. Meta + Home Depot still need detail copy, and
  their experience slugs require the `bySlug` reconciliation below before they resolve to
  anything but `<InProgress>`._
- [ ] 2026-06-26 — Build out the index screens (Projects, Games) and the AI /
  earlier-work detail pages — all currently render `<InProgress>`. _Experience
  index done 2026-06-29: `/experience` now renders a grid of `EXPERIENCES` cards
  (`src/screens/Experience/Experience.js`)._ _Projects index done 2026-06-29:
  `/projects` now renders a grid of the new `PROJECTS` list (CineMind + the 3 AI
  explorations + the 6 earlier-work cards, in homepage order) via
  `src/screens/Projects/Projects.js`, same `PageHeader` + `CardGrid` +
  `ProjectCard` pattern as Experience._ _Games index done 2026-06-29: `/games` now
  renders a grid of the new `GAMES` list (5 browser games ported from the old site)
  via `src/screens/Games/Games.js`, same pattern, but each card passes `external`
  so it links straight out to the live hosted game (no detail page). AI /
  earlier-work detail pages still pending._ _Update 2026-06-30: first earlier-work
  detail page authored — **Chaos Colleagues** (`/projects/chaos-colleagues`) now
  has full detail copy (tagline + 4-section hackathon `writeup` + `link` to its
  Devpost + 4-image gallery), written via `/write-work-page` from the Devpost
  submission. _Update 2026-06-30: second earlier-work detail page authored —
  **Project Shatter** (`/projects/project-shatter`) now has full detail copy
  (tagline + 4-section problem-first `writeup` + `link` to its Devpost + 5-image
  gallery), written via `/write-work-page` from the Devpost submission +
  screenshots; framed honestly as a Collegiate Cup 2019 team-of-4 hackathon build
  where Michael owned project research + the Firestore backend (no award claimed,
  per Michael)._ _Update 2026-06-30: first AI-year exploration detail page authored
  — **NerdBot** (`/games/nerdbot`, it's an `EXPLORATIONS` entry with
  `category: 'game'` so it resolves via `bySlug` to the `/games/:slug` route) now
  has full detail copy (tagline + intro + 6-section `writeup` + `link` to its
  HuggingFace Space + 3-image gallery), written via `/write-work-page` from
  `gap_projects_writeup.docx`; framed honestly as a focused AI-year experiment in
  building tool-calling agents from scratch (Pillar 3), leading with the
  engineering judgment (narrow-vs-mega tools, enums/structured output, tool-error
  response design, "LLMs are very smart junior devs") and metric-light since no
  real NerdBot numbers exist._ _Update 2026-06-30: second AI-year exploration detail
  page authored — **InterviewPro** (`/projects/interviewpro`) now has full detail
  copy (tagline + intro + 5-section `writeup` + `link` to its live site
  `interviewpro.mikeohane.com` + 4-image gallery), written via `/write-work-page`
  from `gap_projects_writeup.docx`; led with Pillar 3 (AI-native depth), centerpiece
  is the 6-perspective parallel LLM-as-judge feedback engine (Content / Structure /
  Fit / Communication / Risk / Candidate-context + an aggregator), plus the
  parallel-guardrail latency call and the first-AI-assisted-build / prototype-vs-product
  arc toward CineMind. Only the true figure (6 eval perspectives) used; the "2-3s" and
  "25%" from the source treated as illustrative, no invented usage numbers._ _Update
  2026-06-30: third earlier-work detail page authored — **Ape Unit**
  (`/projects/ape-unit`) now has full detail copy (tagline + intro + 4-section
  `writeup` + `link` to `ape-unit.github.io` + 2-image gallery), written via
  `/write-work-page` from the old Personal-Website-2.0 `ApeUnit.js` context + the two
  screenshots; framed honestly as a Spring-2019 Georgia Tech Data Structures team
  project (comprehensive JUnit suites + primate browser games unlocked by passing
  them). Leads with Pillar 1 (incentive design: gate the fun behind the behavior you
  want), woven with the edge-case-testing habit and initiative/culture-building;
  Michael owned the JS games (incl. Banandersnatch). Kept qualitative since the source
  has NO hard numbers (no download/student counts) — none invented._ _Update
  2026-06-30: final AI-year exploration detail page authored — **Wizard Battle**
  (`/games/wizard-battle`, an `EXPLORATIONS` entry with `category: 'game'` so it
  resolves via `bySlug` to the `/games/:slug` route, like NerdBot) now has full
  detail copy (tagline + intro + 7-section `writeup` + `link` to its live site
  `wizardbattle.mikeohane.com` + 3-image gallery), written via `/write-work-page`
  from `gap_projects_writeup.docx` + the 3 screenshots; led with Pillar 3 (AI-native
  depth), framed as the smallest/most-focused AI-year experiment around the question
  "how do you convey state to an LLM so it makes good decisions." Covers structured
  generation (freeform sentence → schema-valid wizard, elements as enums), state
  abstraction ("critical" not raw HP; return a spell id not prose; code-is-king),
  the reasoning-BEFORE-the-answer distinction (guided reasoning fields ordered before
  the decision field), latency/streaming (the battle log + Mr Beast loading-bar
  analogy), and few-shot crafting (unintended pattern leakage). Metric-light by design
  — the source has NO hard numbers, so none were invented. **All 3 AI-year
  explorations (InterviewPro, NerdBot, Wizard Battle) now have authored detail pages._
  _Update 2026-06-30: another earlier-work detail page authored — **ORM: Strength
  Progress Tracker** (`/projects/orm-strength-tracker`) now has full detail copy
  (tagline + intro + 4-section `writeup` + 5-image gallery; **no `link`** since the
  app is no longer on the App Store — Michael confirmed there's no URL), written via
  `/write-work-page` from the old Personal-Website-2.0 `ORM.js` writeup + the 5
  screenshots. Leads with Pillar 1 (zero-to-one product judgment + scrappy
  ships-solo): centerpiece is the standardize-every-set-into-a-hypothetical-1RM
  insight (measure progress without the injury risk of actually maxing out), plus the
  deliberate plan→design(Adobe XD mockups)→develop method and a "shipping is more than
  the code" beat (icons/splash/screenshots + marketing). Only true figures used (#45
  in Health & Fitness, ~700 downloads); honest about it being an early learn-iOS-on-it
  project. Remaining earlier-work detail copy: Tyes, Intelligent Tutoring Systems,
  Easy Budgeting._ _Update 2026-06-30: another earlier-work detail page authored —
  **Tyes** (`/projects/tyes`) now has full detail copy (tagline + intro + 4-section
  `writeup`; **no `link` or `gallery`** per Michael, since the project has neither),
  written via `/write-work-page` from the old Personal-Website-2.0 `Tyes.js`. Leads
  with Pillar 1 (zero-to-one product judgment / the problem-first method origin): a
  Georgia Tech Grand Challenges org (cofounded w/ 7 peers, ~2018–2020) that instrumented
  the standard 9-hole peg test and built an Electron app reading the device plus a
  proof-of-concept patient–therapist portal; Michael led the 4-dev software team. Framed
  honestly as a student proof of concept (planned Impact 2020), centered on the
  stakeholder research w/ Emory doctors + licensed PTs and the instrument-don't-replace
  decision; no invented figures. Remaining earlier-work detail copy: Intelligent Tutoring
  Systems, Easy Budgeting._ _Update 2026-06-30: another earlier-work detail page authored
  — **Intelligent Tutoring Systems** (`/projects/intelligent-tutoring-systems`) now has
  full detail copy (tagline + intro + 4-section `writeup`; **no `link` or `gallery`** per
  Michael, since the project has neither and its `additional-images/` folder is empty),
  written via `/write-work-page` from the old Personal-Website-2.0 `VIP.js` (the Aug-2019
  team Intelligent Review System) + the LinkedIn blurb (Michael's concept-mining/metadata
  contribution). A Georgia Tech VIP team project; led with Michael's piece (mining concepts
  + generating metadata across heterogeneous course material so it could be tied together
  and queried), folding in the team's analytics half (ReactJS/Flask/SQL, KNN assignment-
  difficulty flagging, student-archetype grouping, in-progress practice system). Framed
  honestly as a 2019 academic team effort that reached a working demo but never shipped;
  drew the messy-multi-source-data throughline forward to CineMind WITHOUT claiming the
  2019 concept-mining was LLM/RAG (explicitly called out as pre-LLM, cruder tooling). No
  invented figures. Remaining earlier-work detail copy: Easy Budgeting._
  _Update 2026-06-30: final earlier-work detail page authored — **Easy Budgeting**
  (`/projects/easy-budgeting`) now has full detail copy (tagline + intro + 2-section
  `writeup` + 1-image gallery; **no `link`** per Michael, since the app was never on
  the App Store; deliberately kept short per Michael), written via `/write-work-page`
  from Michael's brief. A solo iOS
  budgeting app built June 2022 over ~2 weeks (while his Meta start was delayed by a
  laptop stuck in the mail). Leads with Pillar 1 (zero-to-one product judgment), with
  the distinctive angle being **restraint** (only 2 screens, "what do I leave out" as
  the real design work) + the burndown-over-a-running-total insight (pace, not just
  position) + dogfooding it on his own finances for over a year. Only true figures used
  (2 screens, ~2 weeks, over a year of use); honest about it being a small, deliberately
  simple project. **All earlier-work detail copy is now authored.** _Update 2026-06-30:
  the Easy Budgeting gallery was expanded from 1 to 4 screenshots — the Budget screen
  (collapsed `image1`, expanded to show logged expenses `image2`) and the Analyze
  burndown screen (`image3`, `image4`), all with fresh alt text. The stale old `image1`
  alt (Nov 2023 / Gas–Subscriptions–Miscellaneous categories) was rewritten to match the
  replaced screenshot._
- [ ] 2026-06-29 — Write the real one-line descriptions for the 5 games in `GAMES`
  (`src/content/work.js`) — every `summary` is a `'Placeholder description — coming
  soon.'` stub right now. Also confirm the "Minigame Mashup" cover (currently the
  old flappy-ape icon) is the image Michael wants, since that game now points at
  `ape-unit.github.io/MinigameMashup/`.
- [ ] 2026-06-29 — Reconcile the duplicated experience entries when the experience
  detail pages get built: `instagram` and `orangeworks-innovation-lab` live in both
  `FLAGSHIPS` (long summary, homepage) and `EXPERIENCES` (one-sentence, Experience
  screen) with the same slugs, so `EXPERIENCES` is deliberately kept out of
  `ALL_WORK`/`bySlug` to avoid a slug clash. Merge to one source (or have the
  homepage derive from `EXPERIENCES`) once `bySlug` must resolve those slugs.
- [ ] 2026-06-26 — Confirm flagged facts before publishing externally: Home Depot
  "shipped 2023 / millions in transactions" links to the 2020 Pro Xtra
  pre-auth app; CineMind token cost (~$1,176 in writeup vs. "unverified ~$1,200"
  in positioning) and the 5–7s→sub-second latency fix (in positioning doc, not
  the CineMind writeup); IC3→IC4 promotion detail. Add to copy once verified.
- [ ] 2026-06-26 — Add real thumbnail images and any live project URLs (CineMind,
  InterviewPro, NerdBot, etc.) — none were in `personal_context`. _Partially done
  2026-06-29: the 3 flagship cards have `cover` banners (`projects/cinemind_banner.png`,
  `experiences/instagram_banner.png`, `experiences/orangeworks_banner.png`), and the
  3 AI-year exploration cards now have `cover` banners under `projects/`
  (`interview_pro_banner.png`, `nerdbot_banner.png`, `wizard_battle_banner.png`);
  earlier-work cards still render the `<Thumbnail>` placeholder, and no live project
  URLs are wired yet._ _Done 2026-06-29: the earlier-work covers are placed in
  `public/images/projects/` (`<slug>_banner.png`, sourced from the old
  Personal-Website-2.0 repo's square project icons) and wired into `work.js` with
  a `cover` + one-line overview `summary` each, so the homepage "wider portfolio"
  cards render real banners and copy. The section was later trimmed to 6 cards in
  a set order (ORM, Tyes, Intelligent Tutoring, Ape Unit, Chaos Colleagues,
  Project Shatter); the Let's Get Ready and THD Hackathon cards + their banner
  files were removed. _Update 2026-06-29: Easy Budgeting (iOS budgeting app) was
  later inserted before Ape Unit, making 7 earlier-work cards; its banner lives at
  `public/images/projects/easy-budgeting/banner.png`._ Caveat: the Intelligent
  Tutoring Systems source icon is only
  200×200 (low-res), and all are square logos/icons rather than wide banner art —
  worth replacing later._
- [ ] 2026-06-29 — Replace the placeholder PWA identity in `public/manifest.json`
  (`"short_name": "React App"`, `"name": "Create React App Sample"`) with the real
  site name. Leftover Create React App boilerplate.
- [ ] 2026-06-26 — Decide the final non-AI section title (currently "The wider
  portfolio", eyebrow "Before the AI year") — Michael may prefer an alternative.

## Done

- [x] 2026-06-29 — Wire the staged exploration covers into `work.js`: added a
  `cover` field to the InterviewPro, NerdBot, and Wizard Battle entries pointing
  at their `public/images/projects/*_banner.png` files, so the AI-year cards now
  render real banners instead of the `<Thumbnail>` placeholder.
