# /write-project-details

Write the detail-page copy for one **project**, in Michael's voice, aimed at the
people who decide whether he gets hired.

> Writing up an **experience** (Meta/Instagram, Home Depot/OrangeWorks, Facebook,
> MealMe, DCU) instead? Use **`/write-experience-details`** — experiences have no
> images or links and want a conversation up front to get the facts right.

The pages are **not** bespoke screens. Detail copy lives as **data fields on the
item in `src/content/work.js`** and is rendered by the shared
`src/screens/WorkDetail/WorkDetail.js` screen via `bySlug(slug)`. **CineMind
(`FLAGSHIPS` → `cinemind` in `work.js`) is the reference implementation — copy its
convention exactly.** Your job is to fill in those fields, not to build anything.

## Arguments

`$ARGUMENTS` will contain two things:

1. **The context sources to read** (which `personal_context/` files, and any other
   notes). Read every one named before writing.
2. **The name of the project** to write up.

If either is missing or ambiguous, ask before starting.

## Read first (always)

Ground yourself before touching copy:

- **`personal_context/job_search_positioning.md`** — the audience and the argument.
  The reader is a recruiter / founder / hiring engineer at a small, AI-native,
  in-person Boston startup. The copy must demonstrate **both the product AND
  Michael's competency as an engineer** — so narrate the *thinking*: the problem,
  the decisions, the dead ends, the tradeoffs. Showing the reasoning is how the
  reader learns he actually has the knowledge. Tie into the right pillar for this
  piece (zero-to-one product judgment / production discipline at scale / AI-native
  depth) and lead with what that audience cares about.
- **`personal_context/my_writing_style.md`** — write **as Michael, always**. Use
  the **polished public register** (the one CineMind's writeup uses): full
  paragraphs, warm, first-person, but still problem-first, reasoning-exposed, and
  willing to commit to an opinion. Honor the hard don'ts: **no em dashes ever**,
  no "e.g."/"i.e." (use "ex."), no corporate fluff ("leverage", "seamless",
  "cutting-edge"), no feature-first openings, no invented numbers.
- **`.claude/rules/website-copy-voice.md`** — the **professional overlay** that
  governs all user-facing site copy and **overrides the casual parts** of the style
  guide. Two hard rules: **never undermine or downplay his own work** (don't call
  what he built easy/trivial/"straightforward"), and **never use "cus"** or other
  casual slang spellings, even though the base style guide lists them. Keep his
  voice, lift the register.
- **The context sources named in `$ARGUMENTS`.** Many live in `personal_context/`
  as `.docx`/`.pdf`. The Read tool reads PDFs directly (use the `pages` arg). For
  `.docx`, convert first, ex. `textutil -convert txt -stdout <file>.docx` (or
  `pandoc <file>.docx -t plain`).
- If the gap year / employment gap or the Meta-to-independent narrative comes up
  (the AI-year explorations all touch it), also read
  `personal_context/independent_ai_year_framing.md` and frame per it.

## The process (do it in this order)

**Step 1 — Read & analyze.** Read all the context above. Pull out the points worth
conveying *for this audience*: the real problem, the hardest decisions, the
engineering judgment on display, the tradeoffs, and the concrete outcomes. Note
which positioning pillar this piece should lead with.

**Step 2 — Rough outline.** Turn that analysis into a rough section outline (the
intro hook, the ordered section headings, and a one-line note on what each section
argues). Follow CineMind's shape: a heading-less intro paragraph (what it is + the
one-line hook + that he owned it end to end + live/deployed status if true), then
problem-first, then decision-by-decision build sections that expose reasoning and
tradeoffs, an evaluation/results beat with real numbers where they're true, and an
ownership/throughline closer.

**Step 3 — Checkpoint.** Show Michael the analysis (key points + chosen pillar) and
the outline. **Pause for his confirmation or tweaks before writing the full copy.**
It's cheap to redirect at the outline stage and expensive after a full draft.

**Step 4 — Write the page.** Only after the outline is approved, write the actual
copy into `src/content/work.js` on the matching item, in his voice.

## Wiring the fields (match CineMind exactly)

Add these to the project's entry in `src/content/work.js` (see the `cinemind`
entry):

- **`tagline`** — a short eyebrow line (renders above the title).
- **`writeup`** — an **array of blocks**: a plain string is a `<p>` paragraph, an
  object `{ heading: 'Section name' }` is an `<h2>`. Open with a heading-less intro
  paragraph, then alternate `{ heading }` + paragraphs. This is the body; spend the
  most care here.
- **`link`** *(optional)* — `{ href, label }`, renders as the inline product link
  by the title. **Michael must provide this.** If `$ARGUMENTS` didn't include a URL
  for the project, **flag it and ask him for the link** (or to confirm there isn't
  one — some projects genuinely have no live URL) before finishing.
- **`gallery`** *(required)* — `[{ src, alt }]`. **Every project page should have
  the horizontal-scroll image strip** unless Michael confirms there are no images.
  Build it from that project's images: `ls
  public/images/projects/<slug>/additional-images/` and add one entry per
  `imageN.png` as `/images/projects/<slug>/additional-images/imageN.png`. View the
  images so the `alt` text describes what's actually shown (fall back to `'<Title>
  screenshot N'` only if you can't tell).

`WorkDetail` only renders once an item has a `writeup`, so adding these fields is
all that's needed — no screen or component changes.

### Resolving the right entry (gotcha)

The screen resolves copy via `bySlug`, which only sees
`ALL_WORK = FLAGSHIPS + EXPLORATIONS + EARLIER_WORK`. **Every project lives in one
of those three lists** (CineMind in `FLAGSHIPS`, the AI-year explorations in
`EXPLORATIONS`, the wider portfolio in `EARLIER_WORK`), so a project's slug always
resolves — add the fields directly to its entry. (Experiences are the ones with the
`bySlug` reconciliation gotcha; that's handled in `/write-experience-details`.)

## Truth & guardrails

- **Only use figures that are actually true.** The positioning doc flags unverified
  numbers (ex. the CineMind token cost, the Home Depot "shipped 2023 / millions in
  transactions" detail). If a specific number isn't confirmed in the sources, leave
  it out or **flag it for Michael to confirm** rather than guessing. Honesty about
  limits ("it's still early") makes the story stronger, not weaker.

## After writing (memory system)

Per `.claude/rules/memory-system.md`, in the same pass:
- Update **`ARCHITECTURE.md`** if you wired a new project's detail fields (the note
  in the `work.js` / `WorkDetail` sections about which slugs have authored copy).
- Update **`TODOs.md`**: check off the relevant detail-page item, and record any
  follow-up that came up (ex. an unverified figure to confirm, a missing link).
