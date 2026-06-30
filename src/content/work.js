/**
 * Work content — the evidence behind the homepage argument.
 *
 *   FLAGSHIPS    the three strongest proofs (CineMind, Meta, Home Depot) that
 *                the homepage leads with, per the IA spec.
 *   EXPLORATIONS the smaller "AI year" projects — progressively smaller paths
 *                into Michael's broader AI/product work.
 *
 * Every item is data-only so screens and the reusable <ProjectCard> can render
 * it. `category` drives which index screen lists it (projects/experience/games).
 * `href` points at the item's detail route. Thumbnails are intentional
 * placeholders until real imagery is supplied (see <Thumbnail>).
 */

export const FLAGSHIPS = [
  {
    slug: 'cinemind',
    category: 'project',
    href: '/projects/cinemind',
    title: 'CineMind',
    cover: '/images/projects/cinemind/banner.png',
    subtitle: 'Advanced LLM systems and zero-to-one product ownership',
    summary:
      'A film discovery platform centered around describing what you\'re in the mood for. Its two core LLM systems work from opposite sides of the search problem: one represents each movie across complementary semantic vector spaces and lexical data, while the other converts natural-language intent into executable searches over that representation. Reduced generation costs by 4x and search latency by 25% through evaluation-driven optimization. Currently deployed and in active iteration.',
    // ---- Detail-page fields (rendered by the WorkDetail screen via bySlug) ----
    // Writeup is an array of blocks: strings render as paragraphs, `{ heading }`
    // objects render as section headings (see WorkDetail.js).
    tagline: 'Natural-language film discovery, owned end to end',
    link: { href: 'https://www.cinemind.dev', label: 'cinemind.dev' },
    writeup: [
      "CineMind is a film discovery platform built around a simple idea: you should be able to describe the kind of movie you're in the mood for, in plain English, and get the right thing back. You can type out a vibe, blend a few movies you already love into one search, or follow any result down a rabbit hole of similar films, actors, and themes. I designed, built, evaluated, and deployed all of it myself.",

      { heading: "When you don't have a title in mind" },
      "When you actually want to watch something but don't have a title in mind, it usually starts one of two ways. Either you're chasing a mood (kind of like deciding what cuisine you're in the mood for before you pick the restaurant), or you have a movie or two in mind and you want more things like them. A mood can sometimes collapse down into a single genre, and for that a normal search box is fine. But the second you add any real nuance (ex. 'scary, but more dread than gore' or 'a comedy that's actually about something'), something like Netflix's search falls apart completely.",
      "So I wasn't trying to win the case where you already know you want The Matrix and just need to find it. I was building for exploration. The goal is that you can type whatever you want, get inspired by what comes back, change course when something catches your eye, or follow a thread off in a new direction. The whole system is designed around browsing like that, not around nailing the single perfect result on the first try. The first result being exactly right is almost beside the point. The good stuff is in the wandering.",
      "The idea itself came out of an LLM course I was taking. I was experimenting with RAG and semantic search, and somewhere in there I thought, I really wish my movie browser worked like this. From there the framing above clicked into place and the project basically fell out of it. So it was a little bit of a technology looking for a problem, but it was much more a simultaneous 'oh, this would be great for that' than the usual case of holding a shiny new tool and desperately hunting for somewhere to use it.",

      { heading: 'Representing a movie' },
      "The naive version of this is: write a description of each movie, embed it, and search those embeddings. I tried exactly that early on, and it falls apart fast. A movie carries way too many different kinds of information to cram into a single vector. What literally happens in the plot, how it feels to sit through, how it was actually made, what audiences thought of it afterward... those are genuinely unrelated axes, and forcing them all into one embedding means every one of them gets represented poorly. There are only so many numbers in a vector, and unrelated ideas just end up competing for the same space.",
      "So instead of one overloaded vector per movie, I broke each film into a handful of separate semantic spaces, each one capturing a distinct facet of the movie. The important nuance is that a single space can still hold several pieces of information, as long as those pieces complement each other and build toward one bigger picture (ex. everything about how a movie was received), rather than being orthogonal ideas fighting for attention inside the same set of numbers. Group what belongs together, split what doesn't. That separation is most of what makes the matching feel sharp, because a query about what happens in a movie only ever touches the space that's about what happens, and never gets muddied by, say, production trivia.",
      "The other decision was what belongs in a vector at all versus what belongs in structured, lexical data. That comes down to two things: the kind of match the user expects, and the size of the space of possible answers. Something like release year or genre wants an exact, deterministic match, so it lives in structured data (Postgres, in my case). But some traits feel like a clean yes/no and still have to be vectors, simply because the space of options is effectively infinite. You can't enumerate every possible thing that happens in every movie as its own column, so 'is there a scene where X happens' ends up handled semantically even though the user wants a binary answer. Knowing which side of that line each trait falls on, and why, is a big part of why search behaves itself.",

      { heading: 'Deciding which movies are worth ingesting' },
      "Before any of the search work, I had to build the dataset, and that turned into its own project. I worked backward from the features I wanted in the MVP to the exact data those features would need, and pretty quickly it was clear no single source had all of it. So the data layer became a staged pipeline that pulls from a few different sources, enriches them, and reconciles everything into one clean representation per movie.",
      "The harder question wasn't how to fetch the data, it was which movies were even worth ingesting in the first place. I only wanted a movie in the database if two things were true: a non-trivial number of people would actually want it as a result, and there was enough good data about it to represent it well in search. That second one matters more than it sounds. A movie that's missing key data isn't just a movie that'll never match, it can actually match too strongly on the wrong things, because we don't have the data that would say otherwise. Sparse, low-quality entries don't sit there quietly, they actively pollute everyone else's results.",
      "So before paying to enrich anything, I scored each movie on how likely it was to be both wanted and well-representable, and only the ones that cleared the bar moved on to the next (more expensive) stage. I didn't want to set those cutoffs by gut, so I leaned on the data: I looked at the survival curve of the scores and used its derivatives to find the thresholds where the curve flattens out, so a small nudge to the cutoff doesn't wildly swing how many movies get in. That took an initial pool of roughly 1M candidates down to the 120K or so that actually ship, without spending money enriching films that were never going to earn their place.",

      { heading: 'Consolidating and reshaping the data' },
      "Even for the movies worth keeping, the raw data is a mess. It's noisy, it contradicts itself, and it's almost never in the shape you'd actually want to embed. So a big part of the pipeline is an LLM layer whose entire job is to take that sprawl and converge it into clean, consistent bundles, one per semantic space, that are ready to be embedded and searched.",
      "The shape of that problem changes movie to movie. Sometimes the plot data is one giant synopsis that's far too long to embed accurately, so the job is to distill it down without losing what matters. Other times it's spread across a couple of thin, partial sources that have to be merged into a single richer picture. Reviews are their own headache: they openly contradict each other, so the task becomes reconciling a pile of opinions into a fair consensus, so that one person ranting about 'cheesy dialogue' doesn't drag the whole movie toward matching 'cheesy dialogue' when everyone else disagreed. The point is to kill the noise before it ever reaches an embedding, because noise in is noise out.",

      { heading: "Generating the data that wasn't there" },
      "Reformatting existing data only gets you so far. Some of the things people search for don't exist in the data at all, or exist only as something you'd have to infer. Users want a clean yes/no on questions like 'does it have a happy ending', 'is there a twist', or 'is there a female lead', and early experiments with search made it obvious that a specific set of traits (ex. certain kinds of sensitive content) needed to be far more precise than vector matching could ever be, and got asked for often enough to be worth real effort. Vector similarity is great at spectrums and bad at hard binaries, so for these I needed actual structured labels.",
      "So I had an LLM read what we already knew about each movie and tag it with keywords inside specific categories. The interesting wrinkle is that I needed deterministic, repeatable output out of a fundamentally probabilistic tool. The way I got there was to use a slightly cheaper model but run it 3 times per movie and take a majority vote: each candidate keyword is just an include-or-exclude decision, and whichever way at least 2 of the 3 runs landed becomes the truth. A few cheap runs plus voting beats one expensive run here, because it cancels out the random variance you always get from a single generation.",
      "I also didn't just make up the list of keywords to label. I chose the categories by studying the data I actually had alongside the kinds of searches the system needed to support, and filling the gaps between them, so the labels exist exactly where there's both real demand and enough signal to generate them well. Data-backed, not guessed.",

      { heading: 'Evaluating in a subjective space' },
      "All of this raises an obvious question: how do I actually know the models are doing a good job? I'm one person, and I'm very cost sensitive, so I needed to measure performance against cost and find the balance that worked for me, and I needed to measure the impact of every change to a prompt, an input, or an output schema incrementally rather than all at once. I was deliberate about not just eyeballing a handful of outputs and calling it 'good enough'. I tried to treat it like I was at a real company where someone would grill me on the reasoning behind every decision.",
      "The trouble is the whole space is subjective. What even counts as a good distillation of a plot, or a fair enrichment of a pile of reviews? So the first thing I built was a rubric: a set of axes to grade a response on, drawn from my own exploration of each task and what a good result actually looks like. Each axis had 4 possible levels, from bad to great. The 4 is intentional. An odd number gives the model a comfortable middle to default to when it's unsure, and I wanted to force it to lean one way or the other. But too many levels and the gap between adjacent scores gets blurry, which just makes the grader inconsistent. 4 was the sweet spot.",
      "Then I put together a set of evaluation movies, bucketed by what their data looked like (what was present, what was missing, how rich it was), so I was testing across a spread that actually reflected the whole dataset and not just the famous movies I happen to know. That let me see whether quality fell off in a particular bucket, dig into why, and in some cases decide a bucket simply didn't carry enough data to ever produce good results and cut it loose.",
      "With the rubric and test set in place, I'd run several models and parameter settings over those movies, 3 times each to wash out variance, then have stronger models grade every result against the rubric. The key subtlety is that they graded result quality given the inputs that were available, not in a vacuum. If the input data itself said something false, I didn't want to punish the model for believing it. Every score came with a written justification, which mattered later, and scores got averaged across the 3 runs. I also logged token usage for each model so I could attach a real dollar cost to every option.",
      "From there I'd point my Claude Code setup at all of it, justifications included, and have it hand me back the current failure patterns with concrete examples, and we'd decide what to try next. Comparing across models, input setups, and output structures, I could find the best quality per dollar and project what it would cost across the full 120K set. That whole loop is what let me pick the model that struck the right balance and trim input and output tokens aggressively while using the evaluator to make sure I wasn't quietly introducing regressions. It's where the roughly 4x drop in ingestion cost came from. I also had to keep an eye on my own changes not contaminating the test set (ex. accidentally leaking the answers into the system prompt, which Claude Code will happily do for you if you aren't paying attention).",

      { heading: 'Turning language into search' },
      "With a database that represents movies well, the other half of the product is turning whatever a person types into actual searches over it. This is deceptively hard. A short request like 'scary movies that lean on tension over jump scares' is really several requirements with different weights (some define which movies are even in the running, some just reorder them, some are penalties). And people don't talk in database terms. They ask based on half-remembered details, and they expect things they never actually said out loud.",
      "The trick that made this tractable was to abstract the whole interpretation problem down to a fixed set of cases, and then handle each case with its own focused logic. That way the early, hardest models aren't asked to juggle the entire messy space at once. Their job becomes mapping a big, sprawling input onto a specific known label, which is exactly the kind of thing LLMs are genuinely good at. The complexity gets handled in pieces instead of in one impossible step.",
      "The other constraint was latency. I knew the problem was too complex to do in a single pass, but every sequential layer you add throws multiple seconds onto the response, and those add up fast. So the real goal became doing it in as few sequential layers as possible without giving up too much quality. It's a balance, and finding the right number of layers was its own tuning problem.",
      "A couple of principles hold the whole thing together. Rather than ever telling you 'no matches', everything gets scored and combined, so even a request nothing perfectly satisfies still surfaces its closest options and keeps you moving. And to stay fast and cheap, I run independent calls in parallel wherever I can and fall back to plain deterministic code anywhere an LLM isn't actually earning its keep. I'll keep the deepest internals to myself (I worked hard on them and would rather own that), but the shape is the interesting part anyway: take something vague and subjective and break it into pieces small and concrete enough that each one can be done really well.",

      { heading: 'Evaluating the search itself' },
      "Search needed its own evaluation setup, and it was even trickier than the ingestion side. It's more subjective to begin with, and because it's a chain of pieces that all have to work together to produce one coherent result, you can't really judge any single layer in isolation.",
      "So I built an experimentation loop around it. Each change starts as a written hypothesis (doing X should cause Y, which is better because Z). It then implements the code change needed to test that, regenerates results across a fixed set of test queries, compares them against every previous generation to see what actually moved, and writes up a detailed report on what it found. Learnings compound across runs, and anything that didn't pan out is easy to revert and back out of. It turned what would have been a slow, tedious slog of 'change something, squint at a few queries, hope' into something fast and genuinely data-driven.",

      { heading: 'Finding more like this' },
      "My favorite feature started as a personal annoyance while building. I'd run a search, two or three results would be perfect, and the rest would be off, and I just wanted more like the good ones. The representation I'd already built happened to be perfect for that, so I added a similarity search that takes one movie, or several, and finds others like them. The catch is that 'similar' means wildly different things to different people (same franchise, same vibe, same director, same real-life subject), so instead of one overall similarity number, the system looks along a bunch of separate angles at once and combines them, weighting the angles that tend to actually mean 'similar' more heavily.",
      "With a single movie it's straightforward, you match against that one across all the angles. With several, the first question is how cohesive the set even is. A handful of Studio Ghibli films is a tight, obvious theme; a random grab-bag is not. So I build a kind of 'average movie' out of the seeds and lean harder on the dimensions where they actually agree (ex. if they all share a mood but vary wildly in plot, trust the mood and ignore the plot, that's the real common thread). The tighter the set, the more confidently the system commits to that shared identity; a loose set gets a gentler, more careful match. And there's a safety valve: if the seeds are too unrelated to have any genuine common thread at all, it stops trying to average them into mush and instead just blends each one's individual results, because 'movies like A, and movies like B' is far more useful than a meaningless average of the two.",
      "The last piece is ordering. A pure 'most similar' sort tends to hand back ten near-identical movies (every sequel in a franchise, or six films by the same director). Technically correct, terrible to browse. So the top of the list deliberately mixes in different reasons a movie might be a match (best overall, same franchise, same notable director, a rare shared trait, a shared lead actor), and how many slots each reason earns adapts to how strong that signal actually is for this particular search (no notable director means no director slots, and those open back up for stronger overall matches instead). It fills the slots by balancing how good each candidate is against how underfilled its category still is, so you get variety without ever forcing a bad pick in. A few guardrails sit on top (the very top results have to be the same format as what you searched, so a documentary doesn't return scripted films, a cap so one franchise can't swallow the whole list, and a rule that keeps a strong same-director match from getting quietly crowded out forever). The payoff is a list that's both genuinely similar and varied in the ways it's similar, which is exactly what makes it fun to explore.",

      { heading: 'Built for browsing' },
      "Everything else I built sits in service of that same goal: keep you exploring. You can grab any movie (or a few) out of a result set and instantly run 'more like this' on them. You can write a quick clarification when the system didn't quite get what you meant, or when something you saw made you want to steer somewhere new, so you're never stuck with its first interpretation. You can search a specific title and land on a details screen where the similar movies, the cast, and the keywords are all clickable, so any actor or theme becomes the seed of a brand new search. Every freeform search also quietly spins off a couple of alternate takes on what you asked, to knock loose ideas you might not have thought to type. And there are quieter conveniences underneath it all (hard filters for when you do know one constraint exactly, saving movies to come back to later, and streaming the model's reasoning live so the wait actually shows you something).",
      "None of these are the 'core' search, but they're sort of the whole point. The product's real strength isn't handing you the one right answer, it's giving you a dozen good ways to wander toward something you didn't know you were looking for.",

      { heading: 'Shipping it' },
      "The first version I put online was deliberately simple: a multi-container backend (FastAPI, Postgres, the vector database, and Redis) wired together with Docker Compose on a single AWS box, behind a Next.js and React frontend. No fancy edge layer, no observability, just the thing running somewhere people could use it.",
      "Then reality showed up. The very first time I shared it, a friend immediately wrapped my API in a token farmer to mooch free model calls, which sent me down a whole path on abuse. No system prevents abuse perfectly, and I wasn't going to pretend mine would. What you can do is stack up layers of protection that shrink how much an attacker actually stands to gain, so the value they can extract drops below the effort it takes to get it. So I added a handful the real product never notices: hard limits on input length, caps on the structured outputs so the thing can't be turned into a free text generator, locked-down CORS, and IP rate limiting on the expensive endpoints (this is where Cloudflare came in). Once there's little left to gain, the incentive goes with it and they move on to an easier target.",
      "Once it was holding up, I added real observability (PostHog for product analytics, Langfuse for the LLM side) so I could actually see how people were using it and where the pipeline was slow or expensive, instead of guessing.",
      "That's roughly where it is now: live, stable, and in active iteration. I'm focused on driving cost and latency down further and starting to actually market it as a real product, with room down the line for a monetization angle (ads being the obvious one). It's still early, but it works, it's deployed, and I own every layer of it end to end.",
    ],
    gallery: [
      { src: '/images/projects/cinemind/additional-images/image1.png', alt: 'CineMind screenshot 1' },
      { src: '/images/projects/cinemind/additional-images/image2.png', alt: 'CineMind screenshot 2' },
      { src: '/images/projects/cinemind/additional-images/image3.png', alt: 'CineMind screenshot 3' },
      { src: '/images/projects/cinemind/additional-images/image4.png', alt: 'CineMind screenshot 4' },
      { src: '/images/projects/cinemind/additional-images/image5.png', alt: 'CineMind screenshot 5' },
      { src: '/images/projects/cinemind/additional-images/image6.png', alt: 'CineMind screenshot 6' },
    ],
  },
  {
    slug: 'instagram',
    category: 'experience',
    href: '/experience/instagram',
    title: 'Instagram',
    cover: '/images/experiences/instagram/banner.png',
    subtitle: 'Cross-functional execution at scale',
    summary:
      'Here I shipped user-facing products to millions of creators inside mature, high-traffic systems, often while designs and dependencies were still moving. We worked quickly, wearing whatever hat was needed to meet our deadlines. Beyond implementation, owned the experimentation and analysis needed to understand what worked, why, and what to build next. By the end of my tenure I was leading self-initiated projects involving multiple engineers and XFN collaborators.',
  },
  {
    slug: 'orangeworks-innovation-lab',
    category: 'experience',
    href: '/experience/orangeworks-innovation-lab',
    title: 'OrangeWorks Innovation Lab',
    cover: '/images/experiences/orangeworks-innovation-lab/banner.png',
    subtitle: 'Stakeholder research and solution design',
    summary:
      'Given a broad problem space rather than a feature request, I spent weeks interviewing stakeholders to understand where Pro customers were experiencing the most friction. I identified in-store waiting as a recurring pain point, designed and built a prototype for pre-authorized purchasing allowances, and pitched it to executives. They approved the concept for production, and it is now a launched feature within Home Depot\'s Pro Extra program.',
  },
];

export const EXPLORATIONS = [
  {
    slug: 'interviewpro',
    category: 'project',
    href: '/projects/interviewpro',
    title: 'InterviewPro',
    cover: '/images/projects/interviewpro/banner.png',
    summary:
      'An AI interview-prep platform that researches a target role, conducts a tailored mock interview, and provides answer-by-answer feedback.',
    tags: ['Multi-agent', 'LLM-as-judge', 'Voice'],
    tagline: 'AI interview prep that judges what you actually said',
    link: { href: 'https://www.interviewpro.mikeohane.com', label: 'interviewpro.mikeohane.com' },
    writeup: [
      "InterviewPro is an AI interview-prep tool: you hand it a job listing, it researches the company and the role, runs a mock interview with you (over voice or text), and then gives you feedback on your actual answers, one by one. It started because my brother was prepping for his first round of interviews, and watching him grind through it I realized interview prep lines up almost perfectly with the things LLMs are genuinely good at. I designed, built, and shipped all of it, and it's live. It was also one of the first things I built by really leaning on AI tooling to write the code, not just to power the product, so it's an early step in my AI year (but a meaty one).",

      { heading: 'Prep that happens in your own head' },
      "Prepping for an interview mostly happens inside your own head. You read up on the company, you guess at what they'll ask, you rehearse answers in the shower, and you walk in with basically no idea whether any of it actually lands. What's missing is a real back-and-forth: something that knows this specific company and this specific role, can ask you a real question, react to what you actually say, and then tell you where your answer was strong and where it fell flat. A friend can sort of do that, but they don't know the role and they tap out after 2 questions.",
      "So when my brother was grinding through this, the thing that jumped out at me was how cleanly it maps onto what LLMs are actually good at: chewing through a pile of data and pulling out what matters, analyzing language, taking on a persona, and holding a conversation. That's the entire job of a mock interviewer. This wasn't a tool hunting for a problem, it was a real annoyance that happened to line up with the strengths of the exact thing I was trying to get better at.",

      { heading: 'What it actually does' },
      "The product has 3 parts, and they happen in order. First you give it the position, either by pasting a job listing URL or filling in the details yourself, and it goes off and does its own research on the company and the role, then hands you back a clean summary you can read through. That summary turned out to be the most useful part of the whole thing, more than the mock interview itself. It's exactly what LLMs are best at: going through tons of scattered material and distilling it down to the value-dense stuff, so you can ramp up on a company fast instead of clicking through 15 tabs trying to figure out what they even do.",
      "Second is the actual mock interview, over voice or text. The model takes on the persona of an interviewer for that role and works through a rough structure, but the part that matters is that it adapts to you: it asks follow-ups when your answer opens one up, asks for clarification when something's vague, and skips questions you already answered earlier instead of robotically marching down a fixed list. A canned question bank would have been way easier to build, but it wouldn't feel like an interview, and feeling like a real interview is the whole point.",
      "Third, once you're done, it goes back over the transcript and gives you feedback answer by answer, grounded in the research it did up front (so it's judging you against what THIS role actually wants, not generic interview advice off the internet). You can also upload extra context about yourself, like a resume or some project notes, and it'll point out places where you could have represented yourself better. Cus it's not just about what you said, it's about what you COULD have said and didn't.",

      { heading: 'Judging something this subjective' },
      "The feedback is the piece I'm most proud of, because judging an interview answer is genuinely hard. It's subjective, there's no single right answer, and a strong answer is strong along a bunch of different axes at once. The easy version, and my first instinct, is to dump the whole transcript into one LLM and ask 'how'd they do?'. That works, sort of, but the feedback comes out shallow and generic, because you're asking one model to hold the entire messy problem in its head at once and it ends up doing every part of it a little badly.",
      "So instead I broke the judgment into 6 passes that run in parallel, each one looking at your answers through a single narrow lens. Content (did you actually say something real and specific, with evidence and ownership, or was it filler), Structure (was it organized and easy to follow, separate from whether the substance was any good), Fit (does the person you're presenting match what this role and company actually need), Communication (how you come across as a person, tone, confidence vs arrogance, owning a failure gracefully), Risk (did you say something that could actively hurt you, ex. a contradiction or a red flag), and Candidate context (given the resume you uploaded, were there better examples you could have reached for). Each lens looks for both the good and the bad on its own terms, and then a final LLM takes all 6 perspectives and aggregates them, per answer, into one clean list of actionable feedback with a clear reason attached to each point.",
      "This does WAY better than the single broad-sweep version, for the same reason it's easier to do 6 small focused tasks well than one giant fuzzy one. It's the idea I keep coming back to across all my AI work: take a big subjective problem and break it into pieces small and concrete enough that each one can be done really well.",

      { heading: 'Running the guardrail in parallel' },
      "One of the cleaner engineering lessons here came out of trying to keep the thing from getting abused. Once you put an LLM-backed app online, someone will eventually try to wrap your API and farm free model calls off it, so I wanted a guardrail that checks whether a user's message is legit before acting on it. The catch is that check takes a couple seconds, and bolting a couple seconds onto the front of a system that's already not the snappiest is a real hit to the experience.",
      "So instead of running the guardrail first and the response generation second, I run BOTH at the same time and only commit to the real response once both come back (the guardrail almost always finishes first anyway, since all it has to return is a single yes/no). In the rare case a message does get flagged, I've technically paid for a generation I end up throwing away, but that's a tiny price for never making a legit user sit through a guardrail check they didn't need. After this I basically made it a rule: anytime 2 calls don't depend on each other (ex. one's output isn't the other's input), they should be running in parallel, not in a line.",
      "On the abuse side itself, I went in knowing you can't actually stop a determined bad actor, the goal is just to make farming your app more annoying than going to find an easier one. Same logic as a lock: it won't stop someone who really wants in, but if it takes enough effort, most people wander off to a softer target.",

      { heading: 'Building it for real' },
      "A couple of things made this project matter to me beyond the product itself. It was one of the first real things I built with AI actually in the loop writing code (Cursor, at the time), and I treated learning that as half the point: where does the AI keep tripping up and how do I write rules so it stops, what am I doing by hand over and over and how do I turn that into a reusable command. It was also the first time I had to seriously choose the right model for a job instead of just grabbing whatever the default was, ex. what am I actually optimizing for here, which models just happen to perform better in this specific domain, and how do I measure that rather than guess.",
      "And it was a real lesson in how much further a usable product is than a working prototype. Once the LLM core worked, there was still all the unglamorous stuff that actually decides whether a stranger can use the thing: failure flows for when a generation breaks, presenting dense feedback in a way that helps instead of overwhelms, the surrounding features (saving and managing multiple job applications, each with its own set of interviews), and just making it feel polished enough to trust. If I built InterviewPro today I'd do a lot of it differently, and that's the point: it was an early, deliberate step toward bigger and more complete products, and a lot of what I figured out here is exactly what ended up going into CineMind.",
    ],
    gallery: [
      { src: '/images/projects/interviewpro/additional-images/image1.png', alt: 'The setup screen: paste a job listing URL or enter the role by hand, then attach a resume or LinkedIn export for sharper results' },
      { src: '/images/projects/interviewpro/additional-images/image2.png', alt: 'The mock interview, a back-and-forth with an AI interviewer playing a recruiter for the target role over voice or text' },
      { src: '/images/projects/interviewpro/additional-images/image3.png', alt: 'Answer-by-answer feedback on a response, split into why it is good, why it can be improved, and concrete opportunities to improve' },
      { src: '/images/projects/interviewpro/additional-images/image4.png', alt: 'The research brief generated for a role: company identity, mission, growth stage and funding, core offerings, and strategic positioning on one page' },
    ],
  },
  {
    slug: 'nerdbot',
    category: 'project',
    href: '/projects/nerdbot',
    title: 'NerdBot',
    cover: '/images/projects/nerdbot/banner.png',
    summary:
      'A conversational video game discovery assistant that researches and recommends games from a live database.',
    tags: ['Agents', 'Tool use', 'Gradio'],
    tagline: 'An agentic game-nerd chatbot, built to learn tool-calling from scratch',
    link: { href: 'https://huggingface.co/spaces/mike-ai-guy/vg-nerd-bot', label: 'HuggingFace' },
    writeup: [
      "NerdBot is an agentic chatbot that lets you have a full conversation with an over-the-top video game nerd: you tell it what you just bought, what you're into, or what you're in the mood to play, and it fires game recommendations back at you with way too much enthusiasm (think a caricature of the most passionate person in your friend group, EPIC and cringe and all). The personality is the fun part, but the real reason I built it was to teach myself how to build a tool-calling agent from scratch, one that goes and looks up real game data instead of making it up. I designed, built, and deployed all of it, and it's live on HuggingFace if you want to go talk to it.",

      { heading: 'Why a video game nerd' },
      "This was one of the smaller, focused experiments in my year of going deep on AI development, and that focus was the entire point. Instead of trying to learn everything at once, I wanted to isolate one specific skill and actually get good at it: building custom tool-calling agents and wiring them into an external API. Picking a single thing to nail beats half-understanding ten things.",
      "So why a video game nerd? Partly because I'm a nerd and it kept me engaged (a project you actually enjoy is a project you actually finish), but there's a real product idea under the goofiness too. A normal search box makes you already know the game you want. I wanted something you could just talk to, describe a vibe or a situation (ex. 'I just got a PS5, what should I buy' or 'I want something with a good progression system') and get back actual recommendations with reasoning. And the engineering question under that was the interesting bit: how do you get an agent to reach for the right tool at the right moment, and then hand it data it can actually do something with?",

      { heading: 'Grounding it in real data' },
      "An LLM left to its own devices will confidently talk about games it's only half-remembering, and for a recommendation bot that's a real problem, cus wrong facts delivered with full confidence are worse than no facts at all. So I didn't want the model leaning on whatever it happened to memorize in training. I wanted it going and looking things up.",
      "The game data comes from RAWG (a big video game database), and I exposed it to the agent as a tool it can call whenever it needs real facts to answer you. I built that tool from scratch on OpenAI's tools structure instead of reaching for a framework, specifically because I wanted to understand the machinery myself rather than have it hidden behind an abstraction. The agent decides, mid-conversation, that it needs to go pull data, calls the tool, gets structured results back, and works them into its reply. Then the whole thing is wrapped in a Gradio interface so I could get it published to HuggingFace fast and actually put it in front of people.",

      { heading: 'Making the agent reach for the right tool' },
      "The first real lesson was that giving an agent a tool is the easy part. Getting it to use that tool correctly is where all the work lives. It's shockingly easy for an agent to completely miss that it should have called a tool, or to call one when it didn't need to, and because LLMs are probabilistic you'll never drive that to zero, but you can absolutely make it happen WAY less.",
      "The biggest lever is being crystal clear about WHEN each tool is meant to be used, and the way you earn that clarity is by keeping tools narrow. It's tempting to build one mega tool that does everything, but that's a trap. A mega tool needs a pile of parameters (and every parameter it doesn't need for the current job is just a distraction sitting in the model's face), and it covers so many use cases at once that you can't cleanly explain when to reach for it. A handful of small, sharply-divided tools, each with an obvious 'this is the one situation I'm for', is far easier for the agent to get right than one Swiss Army knife it has to reason its way through every single time.",

      { heading: "Enums are an LLM's best friend" },
      "The other half of making the agent reliable was shrinking how much it actually had to do. The principle I kept coming back to (and lean on in everything since) is that anything that can be done with code MUST be done with code. The LLM should only own the part that genuinely needs a language model, and you should hand it that part in the most language-friendly shape you can.",
      "Enums turned out to be the cleanest version of this. Say the API wants an integer ID for a gaming platform, but the user is going to talk in plain English (ex. 'ps5'). I don't make the LLM produce the magic ID, that's brittle, and it'll give you 'playstation5' one time and 'ps5' the next. Instead the LLM speaks and thinks in a fixed enum ('ps5'), and my code maps that to the real ID before any request goes out. Same idea for structured output: when someone asks for every game released in March 2025, I have the model output a first_date, a nullable second_date, and a relationship (between, before, after), and then code turns that into a clean API query, fills in defaults, and handles the cases where the dates and the relationship don't line up. You can even order the fields so later ones reference earlier ones (output the relationship first, then let the dates lean on it) to keep the whole thing consistent. Every bit of work I move off the model's plate is one less thing for it to get subtly wrong.",

      { heading: 'When the tool call fails' },
      "Things go wrong, and how you tell the agent they went wrong matters a lot. Early on a failed tool call would basically just come back as 'it failed', which is useless, cus the agent has nothing to act on and will just fail the exact same way again. So I made the error responses actually informative: when I can programmatically figure out WHAT went wrong (a bad parameter, an empty result, whatever it is), I pass that back, so the agent has what it needs to fix its request and retry instead of flailing.",
      "The flip side is that you can't just dump everything back at it either. A tool response should carry exactly the info that's needed and nothing more, because every extra field is more context for the model to wade through. The same thinking applies to the conversation as a whole: in a long chat you don't need to keep the entire verbatim history of every tool call hanging around. Compacting old calls down to their essentials keeps the important context alive without slowly drowning the model in its own backlog (which is both a performance problem and a cost one).",

      { heading: 'What it taught me' },
      "The mental model that stuck with me from this project is that LLMs are like very smart junior devs. They're genuinely capable, but they need crystal-clear instructions, and the second things get vague they'll make a naive assumption or get over-excited and wander off the path you wanted. Almost every decision above is really just a way of being a better manager to that junior dev: give it narrow, obvious tools, hand it data in a shape it can't misread, let code handle anything deterministic, and tell it exactly what broke when it stumbles.",
      "NerdBot was never meant to be a big product, it was a focused experiment, and it did its job. It's where I actually learned to build tool-calling agents and integrate an external API from scratch, and those lessons fed directly into the bigger, more complete things I built afterward (the multi-agent research in InterviewPro, the whole search pipeline in CineMind). It's deployed on HuggingFace and still kicking (I went back for a v2 to fold in what I'd learned), so if you feel like arguing with an unhinged video game nerd about whether Sonic Adventure 2 is epic or cringe, go for it.",
    ],
    gallery: [
      { src: '/images/projects/nerdbot/additional-images/image1.png', alt: 'A NerdBot conversation recommending games for a new PS5 and for someone who wants a good progression system, answering in an over-the-top enthusiastic voice' },
      { src: '/images/projects/nerdbot/additional-images/image2.png', alt: "NerdBot delivering a passionate, all-caps verdict that Sonic Adventure 2 is 'EPIC' in response to a one-line 'epic or crap?' question" },
      { src: '/images/projects/nerdbot/additional-images/image3.png', alt: "NerdBot recommending kid-friendly Nintendo Switch games for a 6-year-old's birthday, then following up with relaxed, non-violent exploration picks" },
    ],
  },
  {
    slug: 'wizard-battle',
    category: 'project',
    href: '/projects/wizard-battle',
    title: 'Wizard Battle',
    cover: '/images/projects/wizard-battle/banner.png',
    summary:
      'A two-player battle game where AI turns free-form wizard descriptions into combatants and controls their decisions in turn-based duels.',
    tags: ['Structured generation', 'Eval', 'Game state'],
    tagline: 'An AI wizard duel, built to learn how LLMs make decisions',
    link: { href: 'https://www.wizardbattle.mikeohane.com', label: 'wizardbattle.mikeohane.com' },
    writeup: [
      "Wizard Battle is a game where you describe a wizard in plain English (ex. 'one million lions', or 'a monkey who reached enlightenment watching David Goggins videos') and the AI turns that sentence into an actual combatant: a name, an element or two, a stat spread, and a whole themed spellbook with real mechanics. Then two of these wizards duel turn by turn, with the AI deciding every move each one makes. I designed, built, and deployed all of it, and it's live. But the wizards were mostly an excuse. Underneath the goofiness it was the smallest and most focused of my AI-year experiments, built to chew on a question I find genuinely interesting: how do you hand an LLM a messy, constantly-changing situation so it can actually make smart decisions inside it?",

      { heading: 'The question under the game' },
      "A duel turned out to be a near-perfect sandbox for that question. At any given moment the game has a pile of state (each wizard's health and mana, whatever effects are currently ticking, what just happened last turn, what the opponent is clearly setting up) and on every single turn the model has to look at ALL of that and pick a good move. That's a tiny, self-contained version of the general problem I actually cared about: how do you represent a situation to a model so it behaves intelligently, instead of just dumping data on it and hoping? A wizard battle just made it fun to poke at.",
      "There are really two separate LLM jobs in here, and they're different beasts. The first is generation: take a freeform description and build a playable wizard out of it. The second is the decision-making: take the live state of a battle and pilot a wizard through it. The generation is the part that makes it feel like a game, so I'll start there, but the decision-making is where almost all the actual lessons came from.",

      { heading: 'Turning a sentence into a combatant' },
      "The front door is the fun part. You type whatever you want, and the model has to hand back a complete, structured game object: a name, one or two elements pulled from a fixed set (fire, storm, life, death, balance), a spread across attack / defense / healing / arcane, and a spellbook where every spell has a name, a flavor, and mechanics (damage, hit chance, mana cost) that all have to actually be playable. The interesting tension is that it needs to be creative AND stay inside the lines, because a wizard the game engine can't run is useless no matter how clever the flavor text is.",
      "So this is where structured output earns its keep. The elements aren't freeform strings the model gets to invent, they're an enum, so 'storm' is always exactly 'storm' and my code knows what to do with it. The numbers come back in fixed, bounded fields, so the model can't accidentally hand me a spell that does 9000 damage and breaks the whole match. The model gets to be imaginative about the stuff that should be imaginative (the theme, the name, how 'one million lions' should fight) while the parts that have to be rigid stay rigid. That split (let it be creative where creativity helps, lock it down where structure matters) is the whole trick to getting something both fun and runnable out the other side.",

      { heading: "Don't make the model do math" },
      "Now the hard half. The big realization piloting a wizard is that an LLM can only pay attention to so much, and BOTH the form of the data you give it and the tasks you ask of it eat into that budget. The classic trap is handing it something that looks obvious to us but secretly makes it do work. Ex. if I pass it '317 health' and '692 max health', that reads as totally clear info to a human, but now the model has to do arithmetic just to realize its wizard is in trouble before it can even start deciding what to do about it, and that's attention burned on the wrong thing.",
      "So I let code do that part and hand the model 'critical' instead of two numbers (or, when health is fine, I just don't mention it at all, ex. only surface it once it's getting low). Same idea on the way out: I don't ask the model to describe its move in prose, I give every spell a unique identifier and ask it to return the id of the spell to cast. The principle underneath all of it is the one I lean on in everything: anything that can be done with code MUST be done with code. Analyzing a health bar is code. Deciding whether THIS particular personality (some freeform sentence about lions or an enlightened monkey) would rather heal up or go for the throat in this exact spot, that genuinely needs a language model. My whole job as the engineer is to strip the work down to just that last part and hand it over in the most language-friendly shape I can, so the model spends all its attention on the one thing only it can do.",

      { heading: 'Reasoning before the answer, not after' },
      "This next one is the single most important thing the project taught me, and it's a distinction a lot of people get backwards. You CAN get a much better decision out of a model by having it reason first... but only if the reasoning physically comes BEFORE the field that actually matters. The order is not a stylistic choice, it's the entire mechanism.",
      "Here's the failure mode. If you ask for the decision first and tack a 'justification' field on after it, that justification does literally nothing to improve the decision. The answer was already generated, so all the model is doing now is inventing a nice-sounding story for a call it already made, and it'll happily defend a bad move with total confidence (which is worse than no justification, because now the bad move LOOKS reasoned). Flip the order and it's a completely different tool: the reasoning gets generated first, so the actual decision is forced to build on top of it.",
      "So before a wizard ever picks a move, I have it walk a fixed little chain out loud: what's the broad state of the game right now, what threats am I facing, what weaknesses can I exploit, what was I already setting up, and THEN, given all of that, what's my actual move. By the time it commits to a spell id, it's standing on a real assessment instead of a gut reaction. And because all of those questions look at the same battle and feed the same goal, they group cleanly into one call, which matters: when sub-tasks share data and reasoning like that, bundling them is great, but the second you're asking a model (especially a smaller one like 4o-mini) to juggle things with no conceptual overlap, that's the sign you're cramming too much into one request and should split it.",

      { heading: 'Keeping it from feeling slow' },
      "Latency is the tax you pay for all of this, and it's a real one. LLMs are slow to begin with, and a duel chains a bunch of calls back to back, so the naive version just freezes and makes the user stare at nothing while the robot thinks. People are used to snappy software, so dead air is a quick way to lose them.",
      "My main answer was to stream each step out as it finishes instead of waiting for the whole turn to resolve. That's what the running battle log is: as each action lands, it shows up, so there's always something happening and constant proof that progress is being made. It's the same reason a good loading bar works, ex. the way Mr Beast's bars shoot up fast then crawl toward the end and always show you roughly how far you've got left, even when the bar is basically a polite lie. Something to watch beats a frozen screen every time. And for the moments where you can't stream and genuinely have to wait for a full result, the lever that's left is output tokens: ask for the bare minimum in the simplest form, and reach for a tight, targeted reasoning field rather than just cranking a model's reasoning effort way up. Returning a spell id instead of a paragraph quietly pays off twice here, once for clarity and once for speed.",

      { heading: 'Crafting the few-shot examples' },
      "The last thing that surprised me was how much craft goes into few-shot examples. Examples are how you teach a smaller, cheaper model to act like a smarter one, you're basically baking a better model's reasoning into the prompt so the little one doesn't have to figure it out from scratch. But examples are sneaky, because they teach the patterns you intended AND a bunch of patterns you didn't. Ex. if every single example where the wizard attacks happens to use a storm wizard, the model will quietly conclude storm wizard = attack, even though that was never the lesson, it was just an accident of the examples I happened to pick.",
      "So good examples have to span the space ON PURPOSE: the extremes and the averages, the smart moves and the dumb ones, each with the reasoning attached so the model is learning the WHY and not just memorizing the shape of a few cases. And sometimes the space is too varied to ever cover fairly in a handful of examples, and at that point the better move is to stop showing examples and just state the underlying principles directly, because a few narrow cases would do more harm than good by making it pattern-match every new situation back to them. Knowing which of those two situations you're in (give it examples, or give it principles) is most of the skill.",

      { heading: 'What it was, and what it taught me' },
      "Wizard Battle was one of the smaller, deliberately-scoped experiments from my AI year, a sandbox I built to learn in. But it punched above its weight on lessons. Every piece of it was one long rep at the thing I now run into absolutely everywhere: a model is only ever as good as the context you hand it and the shape you let it answer in. Strip the work down to what genuinely needs a brain, hand it that work in language it can read at a glance, make it reason before it commits instead of after, and never make it do something code could do faster and more reliably. That's not wizard-battle advice, that's the exact instinct that powers the hard parts of CineMind. And under all the engineering it's still just a goofy game where 'a monkey who reached enlightenment watching David Goggins videos' can throw hands with 'one million lions', so go make something ridiculous and watch them fight.",
    ],
    gallery: [
      { src: '/images/projects/wizard-battle/additional-images/image1.png', alt: "The pre-battle screen: two wizards the AI generated from one-line descriptions, 'Kind Hearthwarden' (from 'my neighbor, he's a really nice guy') against 'Pride Sovereign of the Savanna' (from 'one million lions'), each with element tags, a stat spread, and a full generated spellbook" },
      { src: '/images/projects/wizard-battle/additional-images/image2.png', alt: "A duel in progress: each wizard's health, mana, and active effects down the sides, with a central turn-by-turn battle log streaming each move as it happens" },
      { src: '/images/projects/wizard-battle/additional-images/image3.png', alt: "Another generated matchup, 'Homer Atom Melter' (from a prompt about Homer Simpson causing a meltdown) facing 'Hardened Primate Ascendant' (from 'a monkey who reached enlightenment watching David Goggins videos'), showing how a freeform sentence becomes a themed wizard with elements, stats, and spells" },
    ],
  },
];

/**
 * EXPERIENCES — Michael's professional work history, rendered as the grid on the
 * Experience screen (`/experience`). Reverse-chronological. Each card shows a 16:9
 * banner, the company/role title, and a one-sentence elevator-pitch `summary`
 * (high-level overview; the nitty-gritty lives on the future detail pages).
 *
 * Scope is fixed by the available banners under `public/images/experiences/`.
 * Home Depot is a single entry ("OrangeWorks Innovation Lab"); its two intern
 * stints are differentiated later on the detail page.
 *
 * The `instagram` and `orangeworks-innovation-lab` entries intentionally reuse the
 * homepage FLAGSHIPS' slugs/hrefs/covers/titles (same future detail page) — only
 * the summary differs (one sentence here vs. the longer flagship copy). They're
 * kept out of ALL_WORK for now to avoid a duplicate-slug clash; reconcile when the
 * experience detail pages need `bySlug` (see TODOs.md).
 */
export const EXPERIENCES = [
  {
    slug: 'instagram',
    category: 'experience',
    href: '/experience/instagram',
    title: 'Instagram',
    cover: '/images/experiences/instagram/banner.png',
    summary:
      'Spent three years as a software engineer on Instagram, shipping creator-facing features to millions of users while owning the full cycle from building to the experimentation that decided what to ship next.',
  },
  {
    slug: 'orangeworks-innovation-lab',
    category: 'experience',
    href: '/experience/orangeworks-innovation-lab',
    title: 'OrangeWorks Innovation Lab',
    cover: '/images/experiences/orangeworks-innovation-lab/banner.png',
    summary:
      "Home Depot's internal innovation lab, where across two stints I researched Pro-customer friction and designed, prototyped, and pitched new products, one of which shipped into the Pro Xtra program and now handles millions in transactions.",
  },
  {
    slug: 'facebook',
    category: 'experience',
    href: '/experience/facebook',
    title: 'Facebook',
    cover: '/images/experiences/facebook/banner.png',
    summary:
      "As an iOS engineering intern at Facebook, I built a new 'happening now' events feature to help millions of users discover and join gatherings in real time.",
  },
  {
    slug: 'mealme',
    category: 'experience',
    href: '/experience/mealme',
    title: 'MealMe',
    cover: '/images/experiences/mealme/banner.png',
    summary:
      'As one of four employees at the food-ordering startup MealMe, I cut costs in the data layer and improved the core product experience, getting the app into a state where the team could focus on aggressive expansion in the market.',
  },
  {
    slug: 'dcu',
    category: 'experience',
    href: '/experience/dcu',
    title: 'Digital Federal Credit Union',
    cover: '/images/experiences/dcu/banner.png',
    summary:
      "A software engineering intern at one of the country's largest credit unions, where I automated internal workflows and built dashboards that streamlined the team's day-to-day operations.",
  },
];

/**
 * EARLIER_WORK — the wider, non-AI portfolio (apps, games, academic, hackathons)
 * from before/beyond the AI year. Each carries a one-line `summary` and a `cover`
 * banner (sourced from the old Personal-Website-2.0 repo). `category: 'earlier'`.
 */
export const EARLIER_WORK = [
  {
    slug: 'orm-strength-tracker',
    category: 'earlier',
    href: '/projects/orm-strength-tracker',
    title: 'ORM: Strength Progress Tracker',
    cover: '/images/projects/orm-strength-tracker/banner.png',
    summary:
      'An iOS app for lifters that uses one-rep max conversions to let you track your strength over time without needing to risk injury through high-weight, low-rep sets.',
    tagline: 'Strength tracking without the injury risk, shipped solo',
    writeup: [
      "ORM: Strength Progress Tracker is an iOS app built around one slightly annoying truth: the best way to measure how strong you are is your one-rep max, and actually testing your one-rep max is a great way to hurt yourself. It lets you log any set you actually did and turns it into a single comparable strength number, so you can watch yourself get stronger week to week without ever loading a max onto the bar. It was the first app I shipped to the App Store and my first real solo project, and I owned all of it: the idea, the designs, the code, and the unglamorous work of actually getting people to download it. It's not live anymore, but at its peak it hit #45 in the Health & Fitness category with around 700 downloads.",

      { heading: "The metric you can't safely test" },
      "If you actually want to know whether you're getting stronger, the cleanest answer is your one-rep max: the most weight you can move for a single rep on a given lift. The trouble is that genuinely testing a one-rep max is one of the easier ways to get hurt in a gym. So you're stuck with the metric that tracks progress best being the exact one that's most dangerous to check, which means nobody sane is maxing out every week just to log a data point.",
      "The usual workaround is to just write down whatever sets you did, but raw sets are basically impossible to compare. If I benched 10 reps of 145 lbs today and 8 reps of 150 lbs earlier in the week, which day was actually stronger? You can't tell at a glance, and the whole point of tracking progress is being able to tell at a glance. So the real problem was never logging workouts (plenty of apps do that), it was making any two workouts comparable without asking you to do something stupid to get the number.",

      { heading: 'One number for every set' },
      "The fix is a conversion: take any combination of reps and weight you actually lifted and turn it into a hypothetical one-rep max, the weight you theoretically could have done for a single rep. Once every set collapses down to that one standardized number, all of them live on the same scale and suddenly compare cleanly. That 10 reps of 145 and 8 reps of 150 stop being apples and oranges and just become two points on the same line, and you can see which day was stronger without ever actually maxing out.",
      "That one idea is basically the whole product. Everything else (the per-exercise progress graphs, the goals you set per lift, even a strength-level rating that compares your estimated max against other lifters of your age, weight, and gender) is built on top of that single standardized number. I led with the problem and let the product fall out of it, which is a pattern I'd lean on a heck of a lot harder in everything I built later.",

      { heading: 'Planning before the code' },
      "This was also how I taught myself iOS development, so I was deliberate about the process instead of just diving into XCode and flailing. I worked in 3 phases: planning, designing, then developing. The planning phase was really just forcing myself to answer two questions before anything else, what is this app actually for, and what is the smallest set of features that genuinely serves that purpose. It's easy to skip that and start building, but answering it up front is what kept the app focused instead of turning into a pile of half-related fitness features.",
      "Then, before writing a single line of code, I mocked up every screen in Adobe XD. The reasoning there matters: if you design while you're also worrying about what you currently know how to build, you'll quietly water the product down to whatever's easy to code. So I designed what I thought it should be with zero regard for whether I knew how to make it yet, and then went and figured out how to actually build that. Learning the tools to match the design is a way better order than letting my half-formed iOS skills decide what the product was allowed to be.",

      { heading: 'Shipping is more than the code' },
      "Here's the thing nobody warns you about: finishing the code was maybe half the job. After that came building the app icon, the splash screen, and all the App Store screenshots, and then the part that genuinely surprised me, which is that getting your app live on the App Store gets you exactly zero downloads on its own. Nobody just stumbles onto it. So I had to actually go market the thing, spread the word, and convince real people to try it, which turned out to be a completely separate skill from building it.",
      "It topped out at #45 in the Health & Fitness category and got downloaded around 700 times, but the part that stuck with me was the approach it kicked off: find the actual problem (you can't safely measure the thing you most want to measure), design the right answer to it before letting the code talk me out of anything, and then own it the entire way out the door, including all the boring parts that decide whether anyone ever sees it.",
    ],
    gallery: [
      { src: '/images/projects/orm-strength-tracker/additional-images/image1.png', alt: 'The home dashboard: a recent-activity graph for bench press, the closest goal (Deadlift 315 lbs), and a grid of saved exercises' },
      { src: '/images/projects/orm-strength-tracker/additional-images/image2.png', alt: 'The onboarding screen explaining the three things the app does: estimate a hypothetical one-rep max, compare you to similar lifters, and set goals per exercise' },
      { src: '/images/projects/orm-strength-tracker/additional-images/image3.png', alt: 'The Bench Press detail screen: a progress graph with strength-level bands, plus best ORM, current goal, and current strength level' },
      { src: '/images/projects/orm-strength-tracker/additional-images/image4.png', alt: 'The Records screen: each exercise listed with its best one-rep max and a colored strength-level badge' },
      { src: '/images/projects/orm-strength-tracker/additional-images/image5.png', alt: 'The standalone One Rep Max calculator: enter reps and weight to get an estimated one-rep max, a strength level, and where you fall against standard strength tiers' },
    ],
  },
  {
    slug: 'tyes',
    category: 'earlier',
    href: '/projects/tyes',
    title: 'Tyes',
    cover: '/images/projects/tyes/banner.png',
    summary:
      'Formed through Georgia Tech\'s Grand Challenges LLC we sought to create intelligent medical devices that aided in muscular spasticity recovery.',
    tagline: 'A smarter clinical recovery test, built with real clinicians',
    writeup: [
      "Tyes was an organization I cofounded with 7 other Georgia Tech students through our Grand Challenges program, built around a single goal: intelligent medical devices to help people recovering from muscular spasticity. The thing we actually made was a smarter version of a recovery test doctors already use (the 9-hole peg test), paired with software that turned it from a stopwatch number into a real picture of how someone's motor function was coming back. I led the 4-person software team that built the app talking to the device and the portal connecting patients to their therapists. It ran across about 2 years, alongside real doctors at Emory and licensed physical therapists, and aimed at presenting at the Impact 2020 conference. It was a proof of concept rather than a shipped medical product, and it's the project where the way I approach everything since first started to take shape.",

      { heading: 'What a single number leaves out' },
      "Muscular spasticity makes muscles stiff and hard to control, and recovering from it is slow, grinding work where progress is genuinely hard to see week to week. The standard way clinicians measure that progress is the 9-hole peg test: you place 9 pegs into a board and pull them back out, and you get timed doing it. It's simple and it's trusted, which is exactly why it's everywhere. But the output is one number, how many seconds the whole thing took, and that single number throws away almost everything interesting about how the patient actually performed. Did they fumble the grip every time? Was one corner of the board way harder than another? Are they getting smoother even when they aren't yet getting faster? A stopwatch can't tell you any of that.",
      "And there's a second gap that's just as bad. The test only happens in the clinic, but the patient does the real work of recovery at home, over the weeks between appointments, and during all that time the therapist can't see a thing. So you've got a metric that throws away most of its own signal, plus long stretches where nobody is watching at all.",

      { heading: 'Researching it with the people who live it' },
      "The Grand Challenges program drilled one habit into me that I still lead with: research the space before you design anything. Don't walk in assuming you already know the problem, go find the people who live it and let them show you where it actually hurts. So before we committed to building, we spent real time with doctors at Emory and with licensed physical therapists, trying to understand where recovery breaks down for them and their patients instead of guessing from the outside.",
      "The insight that came out of that is the part I'm still proud of. The naive move would have been to invent some flashy new assessment from scratch. But the 9-hole peg test isn't popular by accident, clinicians trust it and patients already know how to do it, and that trust is worth a lot. So rather than replace the thing that works, we decided to instrument it: keep the test everyone already understands, and quietly capture way more about how it goes. Meet the existing workflow where it is instead of asking a whole field to adopt something new. That one call shaped the entire build.",

      { heading: 'Instrumenting the test, then closing the gap between visits' },
      "So the hardware side became a peg board that could actually sense what was happening on it, and my side was the software that made sense of all that signal. I led 4 developers building an Electron app that talked directly to the device, took in the raw data of a patient working through the test, and turned it into something a clinician could read and learn from, the how of a performance and not just the how-long. The hard part wasn't either half on its own, it was the seam between them, getting a physical device and a desktop app to speak to each other reliably enough that a therapist could actually trust what they were looking at.",
      "Then came the second half, a proof-of-concept portal connecting patients and their therapists. This was our answer to that between-sessions blind spot, a place where the thread of someone's recovery could stay alive in the weeks they weren't in the clinic, so the therapist wasn't starting from zero at every appointment. It was early and rough, but the point was to prove the shape of it: recovery is a continuous thing, so the tool tracking it shouldn't go dark the second the patient walks out the door.",

      { heading: 'Where my whole approach started' },
      "This is where my whole approach was born. It was a student project, built by a team learning as it went, and it stayed a proof of concept aimed at Impact 2020 rather than something that reached a real patient, but the instinct I lead with on everything since (start from a real person and the actual bind they're in, go talk to the people who live it, and only then design the thing that needs to exist) is the exact instinct Grand Challenges forced me to practice here for the first time. CineMind and everything after it are really just that same method run again with sharper tools.",
    ],
    gallery: [
      { src: '/images/projects/tyes/additional-images/image1.png', alt: "The 'How Our System Works' page from the Tyes portal, explaining how the instrumented peg board captures force and timing data per peg — alongside a render of the layered sensor board and a photo of the physical prototype with its grid of peg holes" },
      { src: '/images/projects/tyes/additional-images/image2.png', alt: "The Results screen: an 'Individual Peg Times' chart plotting time-to-place for each of the 9 pegs, this week against last, above a Time Analysis breakdown — total time, average peg placement time, deviation from healthy average, and degree of impairment — turning the test from one stopwatch number into a detailed picture of motor function" },
    ],
  },
  {
    slug: 'easy-budgeting',
    category: 'earlier',
    href: '/projects/easy-budgeting',
    title: 'Easy Budgeting',
    cover: '/images/projects/easy-budgeting/banner.png',
    summary:
      'An iOS budgeting app built to cut the clutter of bloated finance apps; a clean, simple interface for tracking your spending habits and nothing you don\'t need.',
    tagline: 'Budgeting without the bloat, built solo in two weeks',
    writeup: [
      "Easy Budgeting is a dead-simple iOS budgeting app I built in June 2022, over about 2 weeks. My start date at Meta got pushed (my work laptop was stuck in the mail), I'd just graduated and was trying to get a handle on my money, and every budgeting app I tried was so buried in features that the simple thing I wanted was nowhere to be found. So I built it myself, then used it to run my own finances for over a year.",

      { heading: 'Too much app for a simple job' },
      "I didn't want much: set a budget, track what I spend, know if I'm on track. But the apps out there were all stuffed with extras I never asked for, most of them there to upsell me rather than actually help me budget. I was about 2 weeks from starting full time as an iOS developer, so I figured I'd just make the simple one myself.",

      { heading: "Two screens, that's it" },
      "The whole app is 2 screens, and keeping it that small was the point. One to set a budget per category and log expenses against it, and one with a burndown chart per category so you can see your spending across the month (or look back at previous ones). I went with a burndown instead of a single 'amount left' number on purpose, cus a number only tells you you've overspent once it's already too late, while the slope of a burndown shows you you're going too fast with time still left to pull back.",
      "There are obvious ways it could be better (custom timeframes, auto-importing expenses instead of typing each one in), and I knew that at the time. I left them out because the simple version did the job, and it did, I lived on it for over a year. It's an old project and isn't live anymore, but it's an early version of how I still work: find the real problem, build the smallest thing that solves it, and actually use it.",
    ],
    gallery: [
      { src: '/images/projects/easy-budgeting/additional-images/image1.png', alt: 'The budget screen: total budget and budget remaining across the top, then a color-coded card per spending category (Housing, Groceries, Dining Out, Transportation, Utilities, Entertainment), each showing its set budget and amount remaining, collapsed so the whole month fits on one screen' },
      { src: '/images/projects/easy-budgeting/additional-images/image2.png', alt: 'The same budget screen with categories expanded to reveal the individual expenses logged against each one — monthly rent and renters insurance under Housing, a run of grocery trips under Groceries — each line a date and amount' },
      { src: '/images/projects/easy-budgeting/additional-images/image3.png', alt: 'The Analyze screen: a burndown chart of the overall budget for the month, with a scrubber reading out the budget remaining on a given day, above per-category burndowns (Housing, Groceries) showing how fast each budget is being spent down' },
      { src: '/images/projects/easy-budgeting/additional-images/image4.png', alt: "More of the Analyze screen, scrolled to the per-category burndown charts (Groceries, Dining Out, Transportation) — each plots how quickly that category's budget drained over the month, so you read your pace and not just your balance" },
    ],
  },
  {
    slug: 'intelligent-tutoring-systems',
    category: 'earlier',
    href: '/projects/intelligent-tutoring-systems',
    title: 'Intelligent Tutoring Systems',
    cover: '/images/projects/intelligent-tutoring-systems/banner.png',
    summary:
      'A classroom analytics platform that pulls together years of student performance data so teachers can spot weak assignments and struggling students, and students can see where they stand and where to improve.',
    tagline: 'Making scattered course material actually usable',
    writeup: [
      "Intelligent Tutoring Systems was a Georgia Tech VIP (Vertically Integrated Projects) team I worked on, where a small group of us tried to build a system that could make an entire course's worth of scattered material and student data actually useful, both to the students trying to figure out where they stood and to the teachers trying to figure out what was working. My piece was the front of that pipeline: taking all the messy, mismatched course material (notes, the textbook, years of old homework, banks of past tests and solutions, labs, random web resources) and mining the concepts out of it so it could be tied together and actually queried, instead of just sitting in a dozen disconnected places. Where it landed matters for how you read the rest: it was a multi-semester academic project, we got a working demo we were proud of, and it never shipped as a real product.",

      { heading: "A course's knowledge, scattered everywhere" },
      "Think about where the knowledge for a single class actually lives. It's smeared across a dozen disconnected places (the lecture notes, the textbook, every homework set from the last few years, a pile of old exams and their solutions, lab writeups, whatever web resources the professor linked), and none of it talks to each other. A student who just wants a straight answer to 'what should I actually go study' has no way to get one, cus the material that would tell them is scattered everywhere and tagged nowhere. And the performance data that could tell a teacher which assignment is quietly broken, or which students are sliding, is just as fragmented. So the problem was never that a course is missing material. If anything it's drowning in material. The real problem is that none of it is connected, and none of it is queryable.",

      { heading: 'Making a pile of messy material usable' },
      "My half of it was that first problem: taking all that sprawling, mismatched material and turning it into something a system could actually reason over. And the hard part is right there in the word 'mismatched'. A set of lecture notes, a textbook chapter, an old exam question, and a lab writeup are wildly different kinds of documents (different structure, different language, different purpose), so you can't just throw them in a pile and hope they line up. So the job was to mine the actual concepts out of each one and attach metadata describing what it was really about, so a homework problem on, say, recursion could get linked up with the exact section of notes and the past exam questions that cover the same idea. Once everything carried that shared layer of 'what concept is this really about', the scattered pile stopped being a pile and started being something you could move through.",
      "The era matters here, cus it changes how you should read it. This was 2019, well before I could just hand a stack of documents to an LLM and get clean structured concepts back out. The tools I had to mine concepts and generate that metadata were way cruder than what I'd reach for today, and a lot of what would now be a few solid prompts was a much more manual, fiddly process back then. But the shape of the problem stuck with me hard: take a messy, heterogeneous pile of data, figure out what each piece is actually about, and connect it so it can be searched and explored. That's almost exactly the problem I'd spend the back half of my career chewing on. I just didn't have the right tools for it yet.",

      { heading: 'Turning the data into something personal' },
      "The other half of the system, which the team built out alongside the material side, was about turning a class's performance data into something useful for both sides of the classroom. The whole thing ran as a ReactJS frontend on top of a Flask and SQL backend, with interactive charts so a teacher could actually see how the class did on any given assignment instead of squinting at a gradebook.",
      "The part I thought was clever was using the data to grade the assignments, not just the students. We ran a KNN model over the historical performance data to categorize assignments by difficulty and flag the ones that were miscalibrated, ex. a 'hard' problem everyone breezed through or an 'easy' one that quietly wrecked the whole class. That's genuinely useful feedback for a teacher, cus a broken assignment is basically invisible until you line it up against everything else. And on the student side, instead of treating everyone identically, we looked at how students had clustered in past semesters (the groups they tended to fall into, each with its own strong and weak spots) and slotted each current student into the group that matched them, so the help could actually target their real soft areas. The piece we were still building when I was there was a review system to turn that diagnosis into action, ex. handing a student real practice questions aimed squarely at the areas they kept struggling with.",

      { heading: 'What it was, and what it became' },
      "It was a university research team, not a startup, and it never crossed the line from working demo into a thing real students and teachers used day to day. But it's an early-work piece I still like pointing at, cus it's the first time I ran straight at the problem I'd end up specializing in: a giant, messy, scattered pile of different kinds of data, and the question of how you make any of it actually useful to a real person. Years later that same instinct (mine the meaning out of heterogeneous data, connect it, make it searchable) is basically the whole engine under CineMind. I just got to do it right the second time, with the tools to match.",
    ],
  },
  {
    slug: 'ape-unit',
    category: 'earlier',
    href: '/projects/ape-unit',
    title: 'Ape Unit',
    cover: '/images/projects/ape-unit/banner.png',
    summary:
      'Using primate-themed browser games alongside comprehensive unit tests for our Data Structures class to improve comprehension and start a cultural movement.',
    tagline: 'Turning a brutal CS class into a campus movement',
    link: { href: 'https://ape-unit.github.io/', label: 'ape-unit.github.io' },
    writeup: [
      "Ape Unit started as a way to survive Data Structures and Algorithms, which at Georgia Tech has a real reputation for chewing people up. A few of us wrote thorough JUnit test suites for the weekly assignments, the kind that actually help you find your bug, and then we did the goofy part: we gated a primate-themed browser game behind passing each one, so the reward for getting your code right was a new game to play. It grew week over week, spread way past our own class, and turned into a whole brand (merch and all, 'the Ape Unitverse'). I owned the games side, writing most of the JavaScript ones, including a choose-your-own-adventure called Banandersnatch. It was Spring 2019, it was a team thing, and it's still live if you want to go play it.",

      { heading: 'A grader that judges, never helps' },
      "Data Structures and Algorithms is the class that decides whether a lot of people stay CS majors. You spend a week implementing something gnarly (a balanced AVL tree, a hashmap, a heap), you submit it to an autograder, and you get back a cold pass or fail. When you fail, it barely tells you anything: some edge case broke, and now it's on you to stare at your own code and guess which one. It's demoralizing, it's lonely, and there's no reason to engage with any of it beyond the grade you need. The whole experience is built around judging your code, not helping you write it.",

      { heading: 'Tests that actually help, not just grade' },
      "So the first half of Ape Unit was the genuinely useful half: we wrote our own JUnit suites for the assignments, and we wrote them to be thorough. Not 'does it compile and survive the happy path', but the annoying edge cases that are exactly what the real autograder dings you on and then refuses to explain (ex. an empty structure, a single element, duplicate keys, the resize boundary on a hashmap). Run ours and you'd actually see which specific case you were failing, so you could go fix that one thing instead of guessing in the dark. That mattered more than it might sound. Finding the edges of a thing and accounting for them (the empty case, the off-by-one, the boundary nobody thinks to check) is a habit I've leaned on in everything since, and Ape Unit is just an early, goofier version of it.",

      { heading: 'Gating the fun behind getting it right' },
      "But here's the thing: a thorough test suite is vegetables. It's good for you and nobody runs it for fun. If we'd stopped there it would've been a slightly nicer way to fail an assignment and not much else. So the actual idea, the one that made Ape Unit work, was to put a reward on the other side of passing. Clear the tests for a given unit and you unlocked that week's game. All of a sudden passing wasn't just a grade you needed, it was the only thing standing between you and a new primate-themed game, and people will do a lot more to get to something fun than to dodge a bad number.",
      "What I like about it looking back is how cleanly the incentive lined up with the goal. We weren't bribing people to do unrelated busywork, the reward was gated behind the exact behavior we actually wanted (writing correct, edge-case-proof code), so chasing the fun made you better at the class as a side effect. Each data structure got its own game tied to that week's topic (the BST unit had Ape Invasion, the heap unit had Banandersnatch, the hashmap unit had Ape Kong, and on down the syllabus), and the whole thing grew in complexity right alongside the course.",

      { heading: 'My games, and what it became' },
      "My slice of it was the games. I wrote most of the JavaScript ones, and the one I had the most fun with was Banandersnatch, a choose-your-own-adventure thing inspired by Black Mirror: Bandersnatch, with a pile of branching paths and secret endings to dig up. The engineering was nothing fancy, these were scrappy little browser games held together with tape and glue, but shipping a fresh one every week on the same cadence as the class was its own kind of discipline, and getting people to actually want to play them was the real bar.",
      "And they did. It outgrew our class pretty fast, students across campus started playing and asking what the next week's game would be, and it snowballed into an actual brand with a logo, a site, and merch (the 'Ape Unitverse', which, sure, is deeply goofy). Ape Unit was a college project and a genuinely fun one, and it's an early version of an instinct I keep coming back to: find the reason people don't care about something (here, a dry pass/fail autograder that only ever judged you), and design the thing so the reward people actually want is pulling them toward the behavior you want. It's also the first place my edge-case-testing habit and my 'make people actually want to use this' product side showed up in the same project, which is basically the combination I've been chasing ever since.",
    ],
    gallery: [
      { src: '/images/projects/ape-unit/additional-images/image1.png', alt: "The Ape Unit landing page: the project's primate logo over the tagline 'the Ape Unitverse is here,' with buttons out to the games, merch, and GitHub" },
      { src: '/images/projects/ape-unit/additional-images/image2.png', alt: 'The games menu, pairing each data structure from the class with its own primate-themed game: a BST with Ape Invasion, a heap with Banandersnatch, a hashmap with Ape Kong, an AVL tree with mini games, and pattern matching and sorting with APE Racer' },
    ],
  },
  {
    slug: 'chaos-colleagues',
    category: 'earlier',
    href: '/projects/chaos-colleagues',
    title: 'Chaos Colleagues',
    cover: '/images/projects/chaos-colleagues/banner.png',
    summary:
      'A cross-platform party game combining the accessibility of Jackbox games with the chaos of Mario Party and the immersion of VR.',
    tagline: 'Asymmetric VR party games, built in a weekend',
    link: { href: 'https://devpost.com/software/chaos-colleagues', label: 'Devpost' },
    writeup: [
      "Chaos Colleagues is a party game where one person straps into VR and becomes a giant, and everyone else joins from the phone or laptop already in their pocket to play as the tiny people scrambling around underneath them. The whole thing is built around that imbalance: one big player against a swarm of little ones. I built it with 3 friends over a 36-hour hackathon (HackGT 6), and it ended up winning Best Spatial Software.",

      { heading: 'The problem with VR party games' },
      "VR is one of the least social things you can do in a room full of people. Almost nobody owns more than one headset, you definitely can't all wear them at once, so 'playing VR together' really just means one person plays while everyone else watches and waits their turn. That's the opposite of a party. Meanwhile Jackbox had already cracked the social version of this for normal games: nobody needs a controller, you just pull out the phone that's already in your pocket and you're in. So the question we started from wasn't 'what VR game should we make', it was 'why can't a VR game be the thing the whole room joins, the way a Jackbox game is?'",

      { heading: 'Making the imbalance the point' },
      "The obvious instinct is to try to even things out so everybody has the same experience. But you can't, only one person has the headset, and faking it would just get you a worse version of a game that already exists. So we did the opposite and made the imbalance the entire point. The VR player isn't a peer, they're a giant: they tower over a little world and can reach down, grab the tiny phone-and-laptop players, and fling them around. Everyone else is small, fast, and trying not to get scooped up. That one decision is what makes it actually scale, ex. a single headset can host a room of 4 to 10 people with zero extra hardware, because nobody but the giant needs anything more than a browser and a room code. From there the game modes kind of design themselves out of the asymmetry: Sharks and Minnows (the giant hunts, the little players run), Art Heist (the small players steal while the giant guards the museum), Prop Hunt (the small players hide as furniture while the giant hunts them down). Same core relationship every time, just different rules stacked on top.",

      { heading: 'Getting VR and multiplayer to coexist' },
      "The hard part wasn't either half on its own, it was the seam between them. We got multiplayer working. We got VR working. And then we put the two together and watched a pile of problems we thought we'd already solved come right back, now tangled up in each other, because syncing a VR player's hands and a giant body across a network to a bunch of phone clients is a genuinely different beast than either piece alone. With 36 hours on the clock there was no time for all of us to stare at the same bug, so we leaned hard into splitting up: everyone went deep on their own slice (the VR interactions, the networking, the world itself) with clear ownership so we weren't constantly stepping on each other's toes. Wrangling Unity through Git with 4 people committing at once was its own little adventure on top of all that.",

      { heading: 'What we shipped' },
      "Going in we'd set a pretty modest goal: just a tech demo where the phone players could run around a world with a VR player watching over them. We hit that in the first 12 hours, which caught us off guard, and instead of coasting we spent the back half of the hackathon on the stuff that actually makes it fun, the grabbing and throwing, the interactions, the start of real game modes. It won Best Spatial Software at the end. It's a project I still like pointing at, not because the code was anything precious (it was a hackathon, so it was tape and glue and a heap of free Unity assets), but because the win came from starting in the right place: we found the real reason VR parties don't work, designed the whole thing around that one constraint instead of fighting it, and got it standing up in front of people before the buzzer.",
    ],
    gallery: [
      { src: '/images/projects/chaos-colleagues/additional-images/image1.png', alt: "A non-VR player's laptop view looking up at the giant VR player looming over the room" },
      { src: '/images/projects/chaos-colleagues/additional-images/image2.png', alt: "The VR player's view, holding a tiny non-VR player they just picked up" },
      { src: '/images/projects/chaos-colleagues/additional-images/image3.png', alt: 'The physical setup: a player in a VR headset between two screens showing the VR and non-VR perspectives at once' },
      { src: '/images/projects/chaos-colleagues/additional-images/image4.png', alt: "A game room: the tabletop of the VR player's oversized house, where tiny partygoers dodge a giant hand" },
    ],
  },
  {
    slug: 'project-shatter',
    category: 'earlier',
    href: '/projects/project-shatter',
    title: 'Project Shatter',
    cover: '/images/projects/project-shatter/banner.png',
    summary:
      'A platform concept that links rural Georgia students with paid, computing-related gig work from local businesses, so students who lack CS in school and can\'t afford to study instead of work can build real skills and earn income at the same time.',
    tagline: 'Getting rural students paid to build real CS skills',
    link: { href: 'https://devpost.com/software/project-shatter', label: 'Devpost' },
    writeup: [
      "Project Shatter is a platform that connects high schoolers in rural Georgia with paid, computing-related gig work from local businesses and nonprofits. The whole idea is that a kid who can't afford to spend their afternoons studying instead of working shouldn't have to pick one: the small paid tasks they take on ARE how they build real CS skills. We built it over a single weekend at the Collegiate Cup 2019 hackathon as a team of 4, and I owned the project research up front and the backend that the whole network runs on.",

      { heading: 'When learning competes with earning' },
      "Picture a high schooler in Barnesville, Georgia. They work hard, they're near the top of their class, and they also hold down a part-time job after school, because like 25% of kids in the state they grew up in a home at or below the federal poverty line. They want to work in tech someday, but their school doesn't even offer AP Computer Science. So there's a glass ceiling sitting over them that has nothing to do with how smart or driven they are, and that's the thing we wanted to break.",
      "When I actually dug into the space, the interesting part was that the obvious framing ('these kids don't have a CS class') isn't really the problem. The real bind is about time. The hours they'd need to spend learning to code are the exact hours they need to spend earning money for their family, so 'just go learn on your own' quietly assumes a kind of free time they don't have. And the surrounding numbers make it worse, not better: 28.1% of Georgians don't have access to broadband, and from 2010 to 2015 Atlanta's job count grew 10.4% while rural regions saw just 3.1%. The on-ramps that would let these students catch up (internet at home, tech jobs nearby) are exactly the ones that aren't there, and the gap is widening.",

      { heading: 'The insight that made it click' },
      "So the question that actually mattered was: how do you hand someone real CS skills when the time to learn is time they genuinely can't spare? Most answers throw more free coursework at it (ex. 'here's a free bootcamp, go for it'), but that just competes with their job for hours that don't exist. It treats motivation as the missing ingredient when the missing ingredient is time and money.",
      "The move that made the whole thing click was to stop treating learning and earning as two separate things fighting over the same afternoon. Instead of asking students to study INSTEAD of work, we connect them with small, paid, computing-related tasks posted by local businesses and nonprofits, so the work they get paid for is also the work that builds the skill. Earning becomes learning. And just as importantly, it isn't charity, which matters because charity is awkward to be on the receiving end of and it doesn't really scale. A small business or nonprofit gets cheap help on a minor task they could never justify hiring out, the student gets paid and gets real experience to point to, so it's a two-sided network where both sides actually have a reason to show up.",

      { heading: 'Building the trust layer' },
      "There's an obvious hole in that plan though: no business is going to hand a real task to a 16-year-old they've never met with nothing to show for themselves. So before any of the matchmaking can work, a student needs a way to prove they can actually do the thing. That's what the skill challenges are for. They're coding problems you solve right in the browser (ex. write a function that decides whether a word's letters are in alphabetical order), and when you submit, your code gets run against a set of hidden test cases and graded automatically, pass or fail. Clear one and you earn experience points and level up.",
      "The points and levels look like a game, and that's on purpose, but they're really doing serious work: they're the credentialing layer. A student's level and the specific challenges they've cleared become a track record a business can glance at and actually trust, which is what makes someone comfortable handing real work to a stranger. On the backend, my job was the Firestore data model holding all of it together: the students, the organizations, the tasks they post, the applications, and each student's challenge progress and XP, all wired into one two-sided system. It was a hackathon build, so plenty of it was tape and glue under the hood, but the data model still had to faithfully represent both sides of the network and the trust signal connecting them, and getting that shape right in a weekend was most of the backend work.",

      { heading: 'What I took from it' },
      "Project Shatter was a weekend prototype, but it's still one of the clearest examples I have of the way I like to work. The win wasn't the code, it was refusing to take the obvious problem at face value and digging until I found the real one (it's not 'no CS class', it's 'no time to learn that doesn't cost them money'), then designing the product around that constraint instead of around the feature I assumed I'd build. That's the same instinct I lead with on everything since: start from a real person and the actual bind they're in, figure out what genuinely needs to exist, and build that. It just happened on a much tighter clock here.",
    ],
    gallery: [
      { src: '/images/projects/project-shatter/additional-images/image1.png', alt: 'The student dashboard listing coding challenges, each worth potential experience points' },
      { src: '/images/projects/project-shatter/additional-images/image2.png', alt: 'A skill-assessment coding challenge with a description, input/output examples, and an in-browser code editor' },
      { src: '/images/projects/project-shatter/additional-images/image3.png', alt: 'The Project Shatter landing page framing the problem with statistics on poverty and broadband access in Georgia' },
      { src: '/images/projects/project-shatter/additional-images/image4.png', alt: 'A completed challenge showing a passing test run, a perfect score, and a level-up to level 15' },
      { src: '/images/projects/project-shatter/additional-images/image5.png', alt: 'The Helpful Resources page curating free coding-education sites and tutorials' },
    ],
  },
];

/**
 * GAMES — the browser games shown on the Games screen (`/games`). Unlike projects
 * and experiences, these have **no detail page**: each card's `href` is the live,
 * externally-hosted game itself (GitHub Pages), opened in a new tab. Covers are
 * flat files under `public/images/games/<slug>.png` (no per-game sub-folder, since
 * there's no detail page to hold additional media), sourced from the icons the old
 * Personal-Website-2.0 games page used. Order mirrors that old page.
 *
 * `summary` is a placeholder on every entry for now — replace with a one-line
 * description per game (see TODOs.md).
 */
export const GAMES = [
  {
    slug: 'worst-tic-tac-toe',
    category: 'game',
    href: 'https://mjkeo.github.io/Worst_TicTacToe/',
    title: 'Worst Tic-Tac-Toe',
    cover: '/images/games/worst-tic-tac-toe.png',
    summary: 'A tic-tac-toe bot designed to make the worst decision possible for any given board state. See if you can lose.',
  },
  {
    slug: 'squids-tower-defense',
    category: 'game',
    href: 'https://mjkeo.github.io/Squids-Tower-Defense/',
    title: 'Squids Tower Defense',
    cover: '/images/games/squids-tower-defense.png',
    summary: 'I played a lot of Bloons Tower Defense so I made one using my friends as the towers.',
  },
  {
    slug: 'snake',
    category: 'game',
    href: 'https://mjkeo.github.io/Snake/',
    title: 'Snake',
    cover: '/images/games/snake.png',
    summary: 'A absolute classic that helped me learn javascript.',
  },
  {
    slug: 'banandersnatch',
    category: 'game',
    href: 'https://mjkeo.github.io/Banandersnatch/',
    title: 'Banandersnatch',
    cover: '/images/games/banandersnatch.png',
    summary: '[Apeunit] A choose your own adventure game inspired by Bandersnatched containing many secret endings.',
  },
  {
    slug: 'flappy-ape',
    category: 'game',
    href: 'https://ape-unit.github.io/FlappyApe/',
    title: 'Flappy Ape',
    cover: '/images/games/flappy-ape.png',
    summary: '[Apeunit] A complete ripoff of flappy bird but with apes and it\'s harder.',
  },
  {
    slug: 'jump-ape',
    category: 'game',
    href: 'https://ape-unit.github.io/JumpAPE/',
    title: 'Jump Ape',
    cover: '/images/games/jump-ape.png',
    summary: '[Apeunit] Jump over rocks as they get progressively faster.',
  },
];

/**
 * PROJECTS — the grid shown on the Projects screen (`/projects`): the AI-year
 * builds first (CineMind, then the explorations), then the wider non-AI work,
 * in the same order they appear on the homepage. CineMind reuses its FLAGSHIPS
 * entry but overrides the long flagship summary with a one-sentence version so
 * every card carries a single-sentence description (the homepage flagship card
 * keeps the longer copy).
 */
export const PROJECTS = [
  {
    ...FLAGSHIPS.find((f) => f.slug === 'cinemind'),
    summary:
      'A deployed AI film-discovery platform built around describing the kind of movie you\'re in the mood for, powered by two complementary LLM systems that represent every film and turn natural-language intent into search.',
  },
  ...EXPLORATIONS,
  ...EARLIER_WORK,
];

/** Everything, for index screens that filter by category. */
export const ALL_WORK = [...FLAGSHIPS, ...EXPLORATIONS, ...EARLIER_WORK];

export const byCategory = (category) => ALL_WORK.filter((w) => w.category === category);
export const bySlug = (slug) => ALL_WORK.find((w) => w.slug === slug);
