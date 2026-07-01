# /write-experience-details

Write the detail-page copy for one **experience** (a job / role in Michael's work
history: Meta/Instagram, Home Depot / OrangeWorks Innovation Lab, Facebook, MealMe,
DCU), in Michael's voice, aimed at the people who decide whether he gets hired.

> Writing up a **project** instead? Use **`/write-project-details`** — projects are
> more self-contained and usually have images and a live link.

Unlike a project, an experience is **résumé-adjacent and checkable** (LinkedIn is
public), the source material is often either **thin** (a one-line blurb) or
**bloated** (a whole `.docx` of everything that happened over years), and there are
**no images or links** to lean on — so the write-up has to carry the whole thing on
narrative alone. That's why this command **starts with a conversation**: the goal
is to get the facts and the framing exactly right *before* writing a word of copy.

The pages are **not** bespoke screens. Detail copy lives as **data fields on the
item in `src/content/work.js`** and is rendered by the shared
`src/screens/WorkDetail/WorkDetail.js` screen via `bySlug(slug)`. **CineMind
(`FLAGSHIPS` → `cinemind`) is the reference implementation for the *voice and
shape*** — copy its writeup convention, just without a `link` or `gallery`. Your
job is to fill in the fields, not to build anything.

## Arguments

`$ARGUMENTS` should name **the experience** to write up (ex. "Meta", "OrangeWorks",
"MealMe"). It may also name extra context sources or notes. If it's missing or
ambiguous which experience is meant, ask before starting.

## Read first (always)

Ground yourself before the conversation:

- **`personal_context/job_search_positioning.md`** — the audience and the argument.
  The reader is a recruiter / founder / hiring engineer at a small, AI-native,
  in-person Boston startup. Experience copy has to demonstrate **Michael's
  competency as an engineer / builder**, so narrate the *thinking*: the problem he
  was handed, the decisions he made, the ownership he took, the tradeoffs. Tie into
  the right pillar (zero-to-one product judgment / production discipline at scale /
  AI-native depth) and lead with what the audience cares about.
- **`personal_context/my_writing_style.md`** — write **as Michael, always**. Use
  the **polished public register** (the one CineMind's writeup uses): full
  paragraphs, warm, first-person, but still problem-first, reasoning-exposed, and
  willing to commit to an opinion. Honor the hard don'ts: **no em dashes ever**, no
  "e.g."/"i.e." (use "ex."), no corporate fluff ("leverage", "seamless",
  "cutting-edge"), no feature-first openings, no invented numbers.
- **`.claude/rules/website-copy-voice.md`** — the **professional overlay** that
  governs all user-facing site copy and **overrides the casual parts** of the style
  guide. Two hard rules to internalize: **never undermine or downplay his own work**
  (don't call what he built easy/trivial/"straightforward"), and **never use "cus"**
  or other casual slang spellings ("gonna"/"gotta"/etc.), even though the base style
  guide lists them as his quirks. Keep his voice, lift the register.
- **`personal_context/linkedin_profile_export.pdf`** — the factual spine: roles,
  titles, dates, employers, his own public phrasing. Use it to anchor anything
  checkable. (The Read tool reads PDFs directly via the `pages` arg.)
- **The experience's own source file(s)**, and any others named in `$ARGUMENTS`:
  - **Meta / Instagram** → `meta_context.docx` and `meta_logging_learnings.pdf`.
  - **OrangeWorks / Home Depot, MealMe, Facebook, DCU** → the LinkedIn export plus
    `job_search_positioning.md` (and whatever notes `$ARGUMENTS` adds).
  `.docx` needs converting first, ex. `textutil -convert txt -stdout <file>.docx`
  (or `pandoc <file>.docx -t plain`).
- If the gap year, the **non-shipped Facebook intern feature**, or the
  Meta-to-independent narrative comes up, also read
  `personal_context/independent_ai_year_framing.md` and frame per it.

## The process (do it in this order — this is a conversation, not a one-shot)

**Step 1 — Mine the context for candidates.** Read everything above and pull out a
**candidate list**: the specific stories, decisions, owned outcomes, and metrics in
this experience that could go on the page. For each candidate note (a) which
positioning pillar it serves, (b) how strong it is for a hiring reader, and (c) how
solid the source is — is it **verified**, **thin** (mentioned but not fleshed out),
or **unverified** (a number/claim that needs confirming). Also form a read on the
source as a whole: is it **sparse** (too little to fill a page well) or **bloated**
(way more than belongs on one page)?

**Step 2 — Ask targeted questions (the heart of this command).** Bring the
candidate list to Michael and interview him about the experience *as a whole* to
get it accurate and right-sized. Tailor the questions to what the source needs:
- **When the source is sparse** — draw out what's missing: "The notes just say you
  'owned experimentation' here. What's a concrete story? What did you actually
  build, who did you work with, and did anything move a number?"
- **When the source is bloated** — narrow ruthlessly: "There are 6 threads here.
  For a hiring reader, which 2 or 3 actually matter, and what should we cut?" The
  job is to land on the **essential details**, not to cram everything in.
- **Always verify the checkable facts** — titles, dates, level/scope, team size,
  and any metric. Experiences are public-facing and résumé-adjacent, so a wrong or
  inflated fact is worse here than anywhere else. Confirm the flagged ones (ex. the
  Home Depot "shipped 2023 / millions in transactions" detail, the IC3→IC4 timing)
  rather than repeating them on faith.
Batch related questions so it's a tight back-and-forth, not an interrogation. Keep
going until the fact base is solid and the set of points feels right-sized.

**Step 3 — Confirm the narrative (get explicit sign-off).** Synthesize the answers
into the **one overall narrative** this experience should convey: the throughline /
arc in a sentence or two, and which pillar it leads with. State it back to Michael
plainly and **wait for him to confirm or adjust it before going further.** Don't
build an outline on an unconfirmed narrative.

**Step 4 — Build the outline and iterate.** Turn the confirmed narrative into a
section outline: the intro hook, the ordered section headings, and a one-line note
on what each section argues. Follow CineMind's *shape* (heading-less intro that
says what the role was + the throughline + the scope/ownership, then problem-first,
decision-by-decision sections that expose reasoning and tradeoffs, real outcomes
where the numbers are true, an ownership/what-it-taught-me closer) adapted to a
role rather than a product. **Show Michael the outline and iterate with him until he
approves it.** It's cheap to redirect here and expensive after a full draft.

**Step 5 — Write the page.** Only after the outline is approved, write the actual
copy into `src/content/work.js` on the matching entry, in his voice.

## Wiring the fields (experiences have NO images or links)

Add these to the experience's entry in `src/content/work.js`:

- **`tagline`** — **always the dates of employment** (renders as a short eyebrow
  line above the title). Format is `Month - Month Year` with a plain spaced hyphen,
  ex. `May - August 2019`. If the span crosses years, include the year on **both**
  sides, ex. `June 2021 - March 2024` (or `January 2023 - Present` for a current
  role). Nothing else goes here, not a subtitle or a one-liner; the dates are the
  tagline for every experience. Pull the exact span from the LinkedIn export and
  confirm it in Step 2.
- **`writeup`** — an **array of blocks**: a plain string is a `<p>` paragraph, an
  object `{ heading: 'Section name' }` is an `<h2>`. Open with a heading-less intro
  paragraph, then alternate `{ heading }` + paragraphs. This is the body; spend the
  most care here.
- **No `link`, no `gallery`.** Experiences don't get the inline product link or the
  screenshot strip. `WorkDetail` guards both fields (renders neither when absent),
  so leaving them off is correct, not a bug. Don't invent screenshots or a URL to
  fill the space — the narrative carries the page.

`WorkDetail` only renders once an item has a `writeup`, so adding `tagline` +
`writeup` is all that's needed — no screen or component changes.

### Resolving the right entry (gotcha — read this before editing `work.js`)

The screen resolves copy via `bySlug`, which only sees
`ALL_WORK = FLAGSHIPS + EXPLORATIONS + EARLIER_WORK`. Experiences are split across
two lists, so **which entry you edit matters**:

- **`instagram` and `orangeworks-innovation-lab`** exist in **both** `FLAGSHIPS`
  (homepage, and part of `ALL_WORK`) **and** `EXPERIENCES` (the `/experience`
  grid). `bySlug` resolves to the `FLAGSHIPS` copy, so **put `tagline` + `writeup`
  on the `FLAGSHIPS` entry.** (The `EXPERIENCES` twin is just the grid card; keep
  its `summary` consistent if you touch it, but the detail fields live on
  `FLAGSHIPS`.)
- **`facebook`, `mealme`, `dcu`** exist **only** in `EXPERIENCES`, which is **not**
  in `ALL_WORK`, so `bySlug` returns nothing and the route renders `<InProgress>`
  no matter what copy you write. Before writing one of these, the **`bySlug`
  reconciliation must land first** (see the item in `TODOs.md`): fold `EXPERIENCES`
  into `ALL_WORK` / `bySlug` without creating a duplicate-slug clash with the two
  flagship experiences. Either do that reconciliation as part of this task or flag
  it to Michael, or the page will never leave `<InProgress>`.

## Truth & guardrails

- **Accuracy is the whole point of this command.** Only use facts and figures that
  Michael confirmed in Step 2. The positioning doc flags unverified numbers (ex.
  the Home Depot "shipped 2023 / millions in transactions" detail, the IC3→IC4
  timing) — don't repeat those unless he confirmed them. If something isn't
  confirmed, leave it out or flag it rather than guessing.
- **Honesty reads as strength.** Being plain about scope ("I was the most junior
  person on it", "this never shipped", "it was still early") is more credible than
  polishing it, and it's in his voice. Never inflate a role or invent a metric.
- **Mind the sensitive framing.** The gap year and the non-shipped Facebook feature
  must read as deliberate, not as drift or failure — frame per
  `independent_ai_year_framing.md`.

## After writing (memory system)

Per `.claude/rules/memory-system.md`, in the same pass:
- Update **`ARCHITECTURE.md`** if you wired a new experience's detail fields (or did
  the `EXPERIENCES` → `ALL_WORK` reconciliation — that's a real structural change to
  note in the `work.js` section).
- Update **`TODOs.md`**: check off the relevant experience detail-page item (and the
  `bySlug` reconciliation item if you did it), and record any follow-up that came up
  (ex. a fact still to confirm).
