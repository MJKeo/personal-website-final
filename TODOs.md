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
  as `<h2>`) alongside paragraph strings. _Done 2026-07-01: all three flagship detail
  pages are now authored — Home Depot/OrangeWorks and Instagram/Meta both have full
  `tagline` + `writeup` on their FLAGSHIPS entries (see the experience detail-pages
  item below for the specifics), and the `bySlug` reconciliation landed so every slug
  resolves._
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
  — **NerdBot** (`/projects/nerdbot`, an `EXPLORATIONS` entry, later moved from
  `category: 'game'` to `'project'`) now
  has full detail copy (tagline + intro + compact 2-section `writeup` (How it works
  + Key learnings) + `link` to its
  HuggingFace Space + 3-image gallery), written via `/write-work-page` from
  `gap_projects_writeup.docx`; framed honestly as a focused AI-year experiment in
  building tool-calling agents from scratch (Pillar 3), leading with the
  engineering judgment (narrow-vs-mega tools, enums/structured output, tool-error
  response design, "LLMs are very smart junior devs") and metric-light since no
  real NerdBot numbers exist. Trimmed 2026-07-01 from 6 sections to the compact
  How-it-works + Key-learnings shape per Michael._ _Update 2026-06-30: second AI-year exploration detail
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
  (`/projects/ape-unit`) now has full detail copy (tagline + intro + compact
  2-section `writeup` (How it works + What it taught me) + `link` to
  `ape-unit.github.io` + 2-image gallery), written via
  `/write-work-page` from the old Personal-Website-2.0 `ApeUnit.js` context + the two
  screenshots; framed honestly as a Spring-2019 Georgia Tech Data Structures team
  project (comprehensive JUnit suites + primate browser games unlocked by passing
  them). Leads with Pillar 1 (incentive design: gate the fun behind the behavior you
  want), woven with the edge-case-testing habit and initiative/culture-building;
  Michael owned the JS games (incl. Banandersnatch). Kept qualitative since the source
  has NO hard numbers (no download/student counts) — none invented. Trimmed 2026-07-01
  from 4 sections to the compact overview shape (intro → How it works → What it taught
  me) per Michael, and worked in the anecdote of seeing people play the games around
  campus + a non-CS-major asking if he'd heard of the group._ _Update
  2026-06-30: final AI-year exploration detail page authored — **Wizard Battle**
  (`/projects/wizard-battle`, an `EXPLORATIONS` entry Michael reclassified to
  `category: 'project'`, so it resolves via `bySlug` to the `/projects/:slug` route)
  now has full detail copy (tagline + intro + a compact 2-section `writeup` (How it
  works + Key learnings) + `link` to its live site `wizardbattle.mikeohane.com` +
  3-image gallery), written via `/write-work-page`
  from `gap_projects_writeup.docx` + the 3 screenshots; led with Pillar 3 (AI-native
  depth), framed as the smallest/most-focused AI-year experiment around the question
  "how do you convey state to an LLM so it makes good decisions." Covers structured
  generation (freeform sentence → schema-valid wizard, elements as enums), state
  abstraction ("critical" not raw HP; return a spell id not prose; code-is-king),
  the reasoning-BEFORE-the-answer distinction (guided reasoning fields ordered before
  the decision field), latency/streaming (the battle log + Mr Beast loading-bar
  analogy), and few-shot crafting (unintended pattern leakage). Metric-light by design
  — the source has NO hard numbers, so none were invented. (Drafted as a longer
  ~7-section writeup, then compacted to the 3-part overview at Michael's request.)
  **All 3 AI-year
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
  **Tyes** (`/projects/tyes`) now has full detail copy (tagline + intro + a compact
  3-part `writeup` — overview intro, "How it works", "What I took from it" — plus a
  2-image `gallery`; **no `link`**), written via `/write-work-page` from the old
  Personal-Website-2.0 `Tyes.js` and the two product screenshots. Leads with Pillar 1
  (zero-to-one product judgment / the problem-first method origin): a Georgia Tech Grand
  Challenges org (cofounded w/ 7 peers, ~2018–2020) that instrumented the standard 9-hole
  peg test for richer fine-motor timing data. **Rewritten 2026-07-01 per Michael to be a
  compact overview AND to stop overclaiming — scoped strictly to his real role (product
  ideation + building the patient/therapist interface that made the device's captured data
  readable), NOT leading the whole software team and NOT the hardware the rest of the team
  built.** Framed honestly as a student proof of concept (planned Impact 2020); no invented
  figures. Remaining earlier-work detail copy: Intelligent Tutoring
  Systems, Easy Budgeting._ _Update 2026-06-30: another earlier-work detail page authored
  — **Intelligent Tutoring Systems** (`/projects/intelligent-tutoring-systems`) now has
  full detail copy (tagline + a compact 3-part `writeup` — overview intro, "How it
  worked", "What I took from it"; **no `link` or `gallery`** per Michael, since the
  project has neither and its `additional-images/` folder is empty), written via
  `/write-work-page` from the old Personal-Website-2.0 `VIP.js` (the Aug-2019 team
  Intelligent Review System) + the LinkedIn blurb + Michael's direct account of his
  role. A Georgia Tech VIP team project iterated over 2 semesters. **Michael was the
  frontend/product person**: the copy frames the shared idea (a course buries its
  data/material where nobody can learn from it) as "we" and states his real work in
  "I" — conceiving what the product should be for its users, and building the two
  main interfaces (teacher + student views) and the dynamic charts/graphs. The
  backend mechanics (consolidating performance data, KNN difficulty flagging,
  student-category grouping) are described in neutral "under the hood" voice, not
  claimed as his. Key learning centers his real work: product thinking (design for
  each distinct user before building) + data-viz as a communication problem. Framed
  as a 2019 academic team effort that hit a working demo but never shipped; no
  invented figures. **IMPORTANT correction 2026-07-01:** an earlier draft fabricated
  a lot — it led with the concept-mining/metadata as *his* contribution, invented a
  "pipeline"/cross-linking feature (the "recursion homework tied to notes" example)
  and a CineMind data-throughline, and split labor he never described. Michael caught
  it and clarified he was the frontend guy (charts/graphs + teacher/student views);
  rewritten to represent only what he actually did, positively ("I worked on Y", not
  "I didn't do X"). Lesson for future write-ups: attribute only what the sources
  actually support, and use "we"/"the system" for team/uncertain work rather than
  inventing an ownership split. Remaining earlier-work detail copy: Easy Budgeting._
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
- [ ] 2026-07-01 — Write the remaining experience detail pages. First one done
  2026-07-01: **DCU** (`/experience/dcu`) now has full detail copy (tagline = the
  employment dates `May - August 2019`; compact 3-part `writeup`: intro + `What I
  did` + `What it taught me`; **no `link`/`gallery`**), written via
  `/write-experience-details` from the LinkedIn blurb + Michael's notes + old-resume
  bullets. Framed (Pillar 1) around small PowerShell/Active-Directory automations
  (new-hire profile provisioning, scheduled log cleanup, a contact-directory
  consolidation script that saved a coworker hours a day) plus SQL-fed PowerBI
  sprint dashboards (final copy emphasizes the data consolidation/preprocessing that
  let the team manage a sprint live and retro it after, NOT the burndown mechanics
  or edge-case difficulty, which Michael had me cut), and the lessons that a good
  product must both do something valued AND be usable by its intended audience, and
  that companies of every scale still work hard at getting organized (so it reads as
  a space with lots of room and few good products). Kept respectful/neutral on DCU
  per Michael (no gassing up, no trashing); metrics kept to what he confirmed
  ("hours a day", no invented figures). Also corrected the card `summary` title from
  "software engineering intern" to "IT intern" for accuracy. Went through several
  rounds of his feedback: a professional-register sweep + creation of the new
  `.claude/rules/website-copy-voice.md` rule (never undermine his own work, never
  "cus"/slang; a professional overlay on `my_writing_style.md`), now referenced from
  both `/write-experience-details` and `/write-project-details`. _Update 2026-07-01: second one done — **MealMe** (`/experience/mealme`)
  now has full detail copy (tagline = employment dates `June - August 2020`; a tight
  4-sentence intro + 3 headed sections: `Making the browsing data free`, `Redesigning
  the part users actually touch`, `What it taught me`; **no `link`/`gallery`**),
  written via `/write-experience-details` from Michael's own notes + the LinkedIn
  bullets, then revised twice on his feedback. Key facts to preserve: title = iOS
  Engineer Intern; dates June–Aug 2020; doubled-DAU metric OK to state (public on
  LinkedIn); the company was **2 founders + 2 interns** fresh out of TechStars (NOT a
  4-person full-time team) and a **live food-delivery price-comparison platform
  looking to grow** (do NOT frame it as hunting for PMF or mention the earlier
  social-food-sharing origin). Framed (Pillar 1) around the throughline "know your
  differentiator and don't overspend, money or effort, on what isn't it": browsing is
  the on-ramp, the price comparison is the edge, so the two centerpieces are killing
  the map-API data cost by rebuilding browsing on a free MapKit+Yelp pipeline, and a
  research-driven browse redesign that doubled DAU with no ad spend to get users to
  the differentiator with less friction (recommendation system kept to ONE sentence
  per Michael). `What it taught me` carries his three lessons: (1) sometimes the
  better product wins and sometimes the FIRST does — ship a lean MVP on a solid core
  and let real customer usage guide features (a good core means users request
  features instead of leaving); (2) the discipline to recognize a product's ceiling
  and restart in a higher-potential space; (3) the brutal early-traction reality
  (network, advertise, be resource-efficient) and staying clear-eyed about which
  parts are the differentiated core vs. commodity table-stakes. Per Michael: the
  $0.10/user, ~75%, ~1M figures are rough estimates and were NOT used (kept
  qualitative); the "restaurant selection beyond any competitor" phrase dropped; the
  scrappy ask-forgiveness tactics (rotating API keys, scraping) left off (legally grey
  + company-level); the how-I-got-hired beat kept but reframed as drive/initiative
  (self-taught iOS in the pandemic, shipped an app to the App Store, beat a
  competitive pool), not nepotism. _Update 2026-07-01: third one done —
  **OrangeWorks Innovation Lab** (`/experience/orangeworks-innovation-lab`) now has
  full detail copy on its **FLAGSHIPS** entry (tagline = the two employment spans
  `August - December 2020, August - December 2021`; heading-less intro + 6 conceptual
  sections: `Given a problem, not a solution` / `Getting the real story out of
  people` / `From patterns to a pitch` / `The idea that shipped` / `The one I'd still
  build` / `What it proved`; **no `link`/`gallery`**), written via
  `/write-experience-details` grouping BOTH Home Depot intern stints (Fall 2020 iOS
  pre-auth app + Fall 2021 web home-planner) onto one page. Led with Pillar 1
  (product sense / zero-to-one judgment): a year-agnostic walkthrough of the research
  → interview → prototype → executive-pitch method that carries the insights (not
  just the steps), then the two problems, weighted heavily toward the 2020 runner
  pre-authorization app (the checkout-wait friction, the design call to also work
  over plain texting so a runner needs only a cell phone, and the shipped outcome)
  and brief on the 2021 home-management concept that never shipped. Per Michael: KEEP
  the "millions in transactions" claim (he confirmed Home Depot released his exact
  feature, largely unchanged, in January 2023, now handling millions in
  transactions); headings kept conceptual/concise; the process walkthrough carries
  learnings alongside what he did; the closer focuses on what WAS valuable (product
  judgment), not on diminishing the code. Ran the finished draft through the new
  `website-copy-voice.md` overlay (removed ALL-CAPS emphasis, "annoying",
  "basically", "a big pile", "guys...day-of", "fancy phones"). Michael then revised
  heavily by hand and had me restructure: the writeup is now intro + 4 sections
  (`Start with a problem, not a solution` / `Getting the real story out of people` /
  `From patterns to a pitch` / `My projects and outcomes`) — the two separate project
  sections (`The idea that shipped` + `The one I'd still build`) were merged into one
  `My projects and outcomes` section that leads with what he built → the problem → why
  it was the right solution → the outcome, with the 2021 concept reframed as un-shipped
  but liked (he sees similar "intelligent management systems" everywhere now). NOTE:
  his hand-edited section-1 copy uses "utilizing" (a `website-copy-voice.md` banned
  word) — left as-is since it's his manual wording; flag if a cleanup pass is
  wanted._ _Update 2026-07-01: fourth one done — **Facebook** (`/experience/facebook`)
  now has full detail copy on its `EXPERIENCES` entry (tagline = employment dates
  `May - August 2021`; a very short heading-less intro + 2 headed sections: `What I
  did` / `Outcomes and learnings`; **no `link`/`gallery`**), written via
  `/write-experience-details` from Michael's internal notes + the LinkedIn bullets +
  an old-resume line. Facts confirmed with him in Step 2: title = iOS Developer Intern,
  Remote, May–Aug 2021; the "events happening now" feature **never launched**; the
  LinkedIn "conducted A/B testing / proved impact" bullet is really **"set up, never
  launched"** (so copy says he *stood up* the experiment, does NOT claim results); the
  self-initiated **dynamic date-line component DID ship** (the "events happening soon"
  bullet) and is the real "thing I landed" beat, kept proportionate. Per Michael's
  Step-2 choices: **lead with the build**, keep the not-launching brief; **drop the
  "publicly-broadcast funerals" example** (he deselected it — pool-quality problem kept
  general: "low-quality or inappropriate content"); OK to name the feature, keep the
  Objective-C cold-start + timezone-mentor ramp, and frame experimentation-at-scale
  accurately. Honest about both scoping gaps (technical: treated the events backend's
  search capability as a given when it wasn't; conceptual: never sized the live-event
  pool, thin/low-quality off-peak) and framed as scoping discipline he carried into
  his full-time return. Respectful/neutral on Facebook (gaps framed as HIS scoping
  misses, not the employer's fault) per the past-employers memory._ _Update
  2026-07-01: fifth and final one done — **Instagram/Meta** (`/experience/instagram`)
  now has full detail copy on its **FLAGSHIPS** entry (tagline = employment dates
  `June 2022 - May 2025`; heading-less intro + 5 headed sections: `Working fast
  without breaking things` / `Wearing whatever hat the product needs` / `The value
  of data` / `Owning more than my own execution` / `What it taught me`; **no
  `link`/`gallery`**), written via `/write-experience-details` from
  `meta_context.docx` + `meta_logging_learnings.pdf` + the LinkedIn bullets.
  Structure came from Michael directly: the intro outlines the key skills, then
  each section proves one, with the big stories deployed as evidence INSIDE those
  arguments (Creator Achievements cross-media expansion → shipping safely at scale;
  Creator Goals → many hats; the logging overhaul → the value of data; the
  ship-rerighting / interdependent-experiment coordination + mentoring → owning
  beyond your own execution). Per Michael's guardrails: challenges framed neutrally,
  never as complaints about Meta or coworkers (ex. the logging gaps are "we treated
  logging as an afterthought", self-inclusive); NO promotion line (IC3→IC4 cut as
  bragging without narrative fit) and no "most junior" framing; closer is learnings
  only, NO bridge to the AI year. Facts used, all public on LinkedIn: 34% regression,
  millions of creators, 2-day retention / 3-hour query windows, 3 years. Important
  chronology kept accurate: the 34% regression + broken logger were on
  **Achievements**, the rebuilt system was applied to **Goals** from day one (whose
  insights became the team's primary deliverable when the feature didn't ship).
  **All five experience detail pages are now authored (DCU, MealMe, OrangeWorks,
  Facebook, Instagram).**_ _Update 2026-07-01: sixth one done — **Independent AI
  Product Development** (`/experience/independent-ai-product-development`, the
  new EXPERIENCES-only entry listed first on the grid) now has full detail copy
  (tagline = `June 2025 - Now` per Michael's explicit format; card `summary` +
  a 3-paragraph heading-less intro + 3 headed sections: `A year with a shape` /
  `The lessons that repeated` / `Where it stands`; **no `link`/`gallery`**;
  `cover` path is wired but the banner image itself is still pending), written
  via `/write-experience-details` from `job_search_positioning.md` +
  `independent_ai_year_framing.md` + both project writeup docs, off an outline
  Michael approved in-conversation. Framing decisions: the page is the
  **connective narrative of the year** (the projects' own pages hold the deep
  dives, so each gets roughly a sentence); the deliberateness is shown by
  confident storytelling, never by denying a gap; Meta is credited neutrally as
  the foundation (per the past-employers memory) with the leave framed as
  ownership/skills he wanted, not escape; the close is a confident both-halves
  statement (scale discipline + zero-to-one judgment) with NO job pitch.
  Structure evolution: a 6-section draft outline was cut to intro + 4 sections
  after re-evaluation, then per Michael the `Why I left a job I liked` section
  was **merged into the intro** — the entire why-I-left story now lives in the
  3-paragraph intro, opportunity-framed and positive (entrepreneurial past ex.
  Home Depot / MealMe / Grand Challenges + Meta's at-scale supplement → ready
  to combine the two, next growth steps had no clear in-Meta path and he was
  already planning a move to smaller companies → the LLM/agent "wild west" was
  revolutionary enough to justify going all in, full-time, doing every part
  himself), flowing directly into `A year with a shape`. The **$1,200**
  figure appears as "roughly $1,200" for CineMind's total LLM spend — Michael
  approved using it as an estimate rather than the exact $1,176. Later same
  day: Michael hand-tuned the intro (Meta beat now "large network of engineers
  and partners, fast execution with a high quality bar, whatever hat the
  product needed"; "within my current position" not "within Meta"), and `A year
  with a shape` was reframed per him — NOT a capability ladder but "take a
  technology I'd just learned and apply it to a real use case," growing in
  scale each time, with weighting: receipt splitter + Wizard Battle get small
  mentions, NerdBot = first real product (still small), InterviewPro = the real
  jump (full complicated deployed system), CineMind = the production-grade
  payoff that only exists because of the others ("masterpiece" from his notes
  deliberately softened per `independent_ai_year_framing.md`'s
  don't-say-masterpiece guidance). Also corrected `Where it stands`: CineMind
  is live and being iterated toward a state where he can start advertising it,
  NOT "entering real user validation". **All six experience detail pages are
  now authored.** Remaining for this entry: the `cover` banner image file._
- [ ] 2026-07-01 — Decide whether to reference the new
  `.claude/rules/website-copy-voice.md` from `CLAUDE.md`'s memory-system table so it
  loads every session (editing `CLAUDE.md` needs Michael's OK per the memory rules).
  Right now the rule is only discoverable via the two write-*-details command files.
- [ ] 2026-07-01 — Audit the existing user-facing writeups against the new
  `website-copy-voice.md` rule and decide whether to retrofit. Several older ones
  (CineMind, InterviewPro, NerdBot, Wizard Battle, and others) use "cus" and a more
  casual register that the rule now bans for site copy; Michael previously approved
  those, so this is a "revisit and confirm", not an automatic rewrite.
- [ ] 2026-06-29 — Write the real one-line descriptions for the 5 games in `GAMES`
  (`src/content/work.js`) — every `summary` is a `'Placeholder description — coming
  soon.'` stub right now. Also confirm the "Minigame Mashup" cover (currently the
  old flappy-ape icon) is the image Michael wants, since that game now points at
  `ape-unit.github.io/MinigameMashup/`.
- [x] 2026-06-29 — Reconcile the duplicated experience entries when the experience
  detail pages get built: `instagram` and `orangeworks-innovation-lab` live in both
  `FLAGSHIPS` (long summary, homepage) and `EXPERIENCES` (one-sentence, Experience
  screen) with the same slugs, so `EXPERIENCES` is deliberately kept out of
  `ALL_WORK`/`bySlug` to avoid a slug clash. Merge to one source (or have the
  homepage derive from `EXPERIENCES`) once `bySlug` must resolve those slugs.
  _Done 2026-07-01: `ALL_WORK` now appends `EXPERIENCE_ONLY` (`EXPERIENCES` minus
  any slug already in `FLAGSHIPS`), which adds `facebook`, `mealme`, and `dcu` to
  `bySlug` with no slug clash — `instagram`/`orangeworks-innovation-lab` still
  resolve to their fuller FLAGSHIPS copy (listed first in `ALL_WORK`). Done as part
  of authoring the DCU experience page._
- [ ] 2026-06-26 — Confirm flagged facts before publishing externally: Home Depot
  "shipped 2023 / millions in transactions" links to the 2020 Pro Xtra
  pre-auth app; the 5–7s→sub-second latency fix (in positioning doc, not
  the CineMind writeup); IC3→IC4 promotion detail. Add to copy once verified.
  _Partially resolved 2026-07-01: the CineMind token cost is settled — Michael
  approved "roughly $1,200" as the public estimate (used on the new
  independent-year experience page) instead of chasing the exact $1,176._
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
