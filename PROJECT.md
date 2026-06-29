# PROJECT.md — Personal Website for Michael Keohane

This is the conceptual source of truth for this project. It explains **who the
site is for, who it's about, what it needs to argue, and what success looks
like.** The technical README and `CLAUDE.md` cover the *how*; this file covers
the *why*.

---

## What this project is

A personal website whose single job is **to help Michael Keohane get hired** —
specifically into a small, AI-native, in-person Boston startup as a software /
founding / product / AI engineer. It is a hiring asset, not a portfolio for its
own sake. Every decision (content, structure, tone, what to show and what to
cut) should be evaluated against one question: *does this make a strong target
company more likely to want to talk to Michael?*

Current state: the persuasive **homepage is built**. A React + React Router
(CRA) site on a `screens/` + `content/` architecture and the "Fern" token
system. The homepage lands the core argument above the fold and leads with
CineMind, Meta, and Home Depot as the three evidence pieces, followed by
horizontal-scroll carousels of the broader AI-year work and the wider (non-AI)
portfolio. The **Experience index** (`/experience`) is now built — a grid of
work-history cards. The remaining interior pages (Projects/Games index pages +
every detail page) are real routes but still render a shared in-progress
placeholder. Writing those out — plus real project copy and images — is the
remaining work (see `TODOs.md`).

---

## Who Michael is (the 30-second version)

A software engineer who turns vague problems into shipped products, proven on
both ends of the spectrum:

- **3 years at Meta / Instagram** — shipped features into flows seen by
  billions, ramping constantly onto undocumented codebases and unfamiliar
  stacks. Promoted IC3 → IC4 at 18 months; became the main point-of-contact for
  one of the team's biggest features despite being the most junior person on it.
  Wore every hat as the org got lean: full-stack dev, data scientist,
  de-facto PM, mentor.
- **A deliberate ~1-year independent "AI year"** — left Meta on purpose to build
  AI-native products from scratch, culminating in **CineMind**, a deployed
  AI-native movie-discovery product. This is the cornerstone of his career pivot
  and the thing he is now iterating on and trying to market.

He is not a "give me a ticket" engineer. He starts from the problem, figures out
what needs to exist, and ships it.

---

## What he's looking for (target roles)

Roughly in priority order:

- **Boston, in person.** Wants to be in the room with people.
- **Small startup, ~25–100 people.** Early enough that the work spans many hats
  and he isn't boxed into one narrow lane.
- **Builds something that genuinely helps people.** Mission-fit is a real,
  hard screen for him — both directions.
- **AI-native**, ideally using Claude Code / agentic tooling in the actual dev
  process. Modern tooling as leverage, not novelty.
- **Real engineer autonomy** — ownership, fast movement, new spaces, no
  slow-moving bureaucracy.
- **Product with a real shot.** Early-stage is fine; aimless is not.

Fitting titles: **Software Engineer, Founding Engineer, Product Engineer, AI
Engineer.**

---

## The core argument (what the site has to land)

**One sentence:** *"I take ambiguous problems to shipped products, fast — and
I've done it both inside a billion-user system and from a blank repo by myself."*

That sentence threads the two things startups struggle to find together:
**production discipline at real scale (Meta)** AND **zero-to-one solo execution
(CineMind and the gap-year work).** Most candidates have one or the other.

### Three pillars beneath it

1. **Zero-to-one product judgment** *(the real differentiator).* Always starts
   from the problem, not a solution in search of one. Evidence: a Home Depot
   intern project he researched, pitched, and that Home Depot actually built and
   shipped (now handling millions in transactions); MealMe (owned an app at a
   4-person startup); CineMind (whole product, solo).

2. **Production discipline at scale** *(the credibility anchor).* Meta: shipped
   into flows seen by billions without breaking things, while constantly ramping
   onto undocumented systems. Strongest artifact: the **data-instrumentation /
   logging overhaul** — self-initiated, fixed reliability gaps tied to a 34%
   engagement-metric regression, became the org's gold standard.

3. **AI-native engineering depth.** CineMind + InterviewPro + the smaller
   agentic projects. The framing: he doesn't just *call* LLMs, he builds the
   engineering *around* them — eval harnesses, context management, the
   workflow-vs-agent judgment, abuse prevention, cost/latency tradeoffs at batch
   scale. Recurring maturity lesson: *"code is king; use the LLM only where its
   downsides aren't fatal."*

### Proof points worth surfacing

- **CineMind** — deployed AI-native movie discovery: multi-channel RAG over
  ~120K films, multiple embedding spaces, a contamination-controlled
  LLM-as-judge eval methodology, a full live-serving stack (Next.js/React
  frontend, FastAPI backend, AWS deploy), and a real performance fix (5–7s →
  sub-second query latency). The cornerstone project.
- **Home Depot → shipped in 2023** — rare, checkable end-to-end product outcome.
- **Meta logging/instrumentation overhaul** — initiative without permission,
  data-driven, became a reusable org standard.
- **The AI-coding-agent memory system** — provider-agnostic context system that
  reduced token usage and improved dev speed/quality under strict limits.

---

## The "year off" framing (important, sensitive)

The independent year must read as a **deliberate transition**, never as
unemployment or drift. Core claim: *Meta taught him to build responsibly at
scale; the independent year taught him to decide what should exist and take it
from idea to deployed system.* The progression was intentional — fundamentals →
focused experiments (NerdBot, Wizard Battle, InterviewPro) →
increasingly complete products → CineMind as the capstone. There is a credible
entrepreneurial dimension, but CineMind is honestly **early** (no proven PMF
yet) — and saying so plainly makes the story *more* credible, not less.

See `personal_context/independent_ai_year_framing.md` for the full treatment.

---

## Goals & priorities for the website

**Primary goal:** convert a visiting recruiter / founder / hiring engineer at a
target company into "I want to talk to this person."

Priorities, in order:

1. **Land the core argument fast** — the one-sentence thesis and the
   span-both-worlds claim should be unmissable above the fold.
2. **Make CineMind visible and impressive** — it's the cornerstone of the pivot;
   show the product, the architecture thinking, and the outcomes.
3. **Make the Meta credibility legible** — scale, ownership, the logging
   overhaul — without sounding like a new-grad resume.
4. **Reinforce AI-native depth** — show judgment (workflow-vs-agent, code-first,
   evals), not just "I used an LLM."
5. **Signal fit with the target environment** — small, fast, autonomous,
   mission-driven, modern tooling. The site itself should feel like something a
   sharp builder made.
6. **Make contact effortless** — email, LinkedIn, GitHub, resume always reachable.

**Audience-adaptive emphasis** (from the positioning doc):
- *AI-native startup:* lead with CineMind/AI depth, back with Meta-in-prod.
- *Product/consumer startup:* lead with zero-to-one product judgment + the Home
  Depot shipped outcome, back with Meta experimentation.
- *"Move fast, many hats" generalist:* lead with scrappy / learns-fast-across-
  stacks, back with Meta's "do everything to ship" era.

**Tone:** confident and honest. Concrete outcomes over adjectives. No
new-grad-coded filler (GPA, high-school honors, hackathon awards, "iOS guy").
Lead as a builder.

---

## Where to go deeper

Detailed source material lives in `personal_context/` — see `CLAUDE.md` for a map
of those files and when to consult each.
