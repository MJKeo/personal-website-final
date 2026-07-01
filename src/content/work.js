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
      { src: '/images/projects/cinemind/additional-images/image1.png', alt: 'Search results for "mind bending sci-fi-thrillers' },
      { src: '/images/projects/cinemind/additional-images/image2.png', alt: 'Similar movie search: home screen with inspirations' },
      { src: '/images/projects/cinemind/additional-images/image3.png', alt: 'Similar movie results' },
      { src: '/images/projects/cinemind/additional-images/image4.png', alt: 'Freeform text query breakdown' },
      { src: '/images/projects/cinemind/additional-images/image5.png', alt: 'Movie details page (click a trait to find more movies with it)' },
      { src: '/images/projects/cinemind/additional-images/image6.png', alt: 'Searching with active filters' },
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
    // ---- Detail-page fields (rendered by the WorkDetail screen via bySlug) ----
    tagline: 'August - December 2020, August - December 2021',
    writeup: [
      "OrangeWorks is Home Depot's internal innovation lab, and I interned there twice, both in the fall (2020 and 2021). The setup is a lot closer to a startup than to a normal dev job. You don't get a spec or a ticket, you get a rough problem space with some known pain points, and the entire job is to go figure out what should actually exist and build a case for it. Each intern owns their project, so it's yours end to end from day one: find the real problem, design the answer, prototype it, and pitch it well enough that leadership decides to fund building it for real. Both years ran the same way, so I'll walk through the process once, then get into the two things I built and what came of them.",

      { heading: 'Start with a problem, not a solution' },
      "The instinct most people have, handed a vague space like that, is to start brainstorming solutions right away. That's the trap. I'd already learned the opposite habit through Georgia Tech's Grand Challenges program, and OrangeWorks ran on the same principle: you don't start from solutions. You start by gathering real information about the pain points, use that to work out what the underlying problem actually is, and only then let yourself think about what to build. Skip that and you'll build something clever for a problem nobody really has, a hammer searching for a nail.",
      "Our first few weeks were focused on utilizing Google's design sprint framework to explore the space, conduct stakeholder and user interviews, mapping out opportunities through HMW statements, and finally designing solutions. This would then become your project for the rest of the internship.",

      { heading: 'Getting the real story out of people' },
      "Most of that early stretch went into interviews with the people who actually live in the space, both experts across the relevant parts of the business and the customers themselves. I found pulling actionable information out of those conversations to be a skill in its own right. A naive approach would be to just ask people what they want, but that almost always leads you astray. People are a wealth of information ready to aid your development, but there are better ways at accessing that information that having them process it into their own ideas. Get them to walk you through what they find frustrating or painful and why, what they pay attention to, what their priorities are. Often times the things they don't say can be just as insightful. From there it's your job as the engineer to analyze the vast dataset, identifying patterns and trends, forming the bigger picture, and keying in on high ROI opportunities.",

      { heading: 'From patterns to a pitch' },
      "Once you've built a prototype demonstrating your idea in action there's one more challenge to overcome: getting leadership on board. It's not a product showcase but a pitch to investors, to get Home Depot to believe in the idea enough to fund turning it into a real product. So the prototype and the story around it each have a job, one proving the thing is possible and the other proving it's worth doing.",

      { heading: 'My projects and outcomes' },
      "Fall 2020:",
      "I built a system that let Pro customers pre-authorize spending for the workers they send to the store. The existing system worked as follows: contractors would hire workers for a project, often for short durations or even a single day. While working there'll be times when they need additional supplies, so one or more workers will be tasked with going to Home Depot and buying them. At the checkout they'll provide some credential indicating what Pro account should be charged, a text is sent to the contractor in charge of that account, and the purchase is approved once they respond to said message. So much could go wrong here, maybe the worker lost or forgot the credential, maybe the contractor wasn't immediately available, and these caused significant delays to the checkout process that created frustrations among its users.",
      "The best way to speed this process up was a way to pre-authorize the transaction so the contractor doesn't need to be available for approval. The simplest form would be just giving the worker a company card or cash, but due to the nature of the work setup that opened the door to misuse. My process let contractors give permission to a specific person to spend a fixed budget on a limited set of goods. While the best experience was the iOS app, many workers did not have smart phones so there were alternative flows for each case. Once the payment went through the contractor received a copy of the receipt for async verification. Now the checkout was instant aside from times when non-permitted items were included or the total went over budget, at which point we prompt the contractor for approval.",
      "It was a huge hit with executives and shortly after my final presentation they informed me they were going to pursue building this into a real feature. In January 2023 Pro Allowances was officially launched.",
      "Fall 2021:",
      "I aimed to build a smart home management system. Keeping on top of home maintenance is a near impossible task, whether it's knowing what needs to be done, how to get it done, or how much things would cost. This system would pull a full list of records on your home and facilitate home improvement projects (through Home Depot of course) by flagging repairs / replacements likely needed, providing course materials for DIY, and estimating costs for projects built directly connected to the online shopping experience. Although this product did not ship I genuinely believe in the idea, it even fits quite nicely with the modern movements of AI assistance.",
    ],
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
      "InterviewPro is an AI interview-prep tool: you hand it a job listing, it researches the company and the role, runs a mock interview with you (over voice or text), and then gives you feedback on your actual answers, one by one. It started because my brother was prepping for his first round of interviews, and watching him grind through it I realized interview prep lines up almost perfectly with the things LLMs are genuinely good at: consolidation of large datasets and analysis of natural language. I designed, built, and shipped this independently.",

      { heading: 'Prep that happens in your own head' },
      "Prepping for an interview is often unstructured and independent. You read up on the company, anticipate what they'll ask, rehearse some answers, and then walk in hoping you did the right thing. What's missing is a real back-and-forth: something that knows this specific company and this specific role, can ask you a real question, react to what you actually say, and then tell you where your answer was strong and where it fell flat. A friend could help a bit but lacks the deep understanding needed, and professional help is too expensive.",
      "I had just learned about building deep research workflows, and seeing the problem from up close set off a lightbulb in my head. These same workflows could provide tremendous value in helping a candidate develop a crucial understanding of the role and broader company it's under. That same context would easily facilitate a mock interview process as well, so candidates can practice the real thing, make inevitable mistakes, and learn before the stakes matter.",

      { heading: 'What it actually does' },
      "The product has 3 parts, and they happen in order. First you give it the position, either by pasting a job listing URL or filling in the details yourself, and it goes off and does its own research on the company and the role, then hands you back a clean summary you can read through. That summary turned out to be the most useful part of the whole thing, more than the mock interview itself. It's exactly what LLMs are best at: going through tons of scattered material and distilling it down to the value-dense report, so you can ramp up on a company fast instead of clicking through 15 tabs trying to figure out what they even do.",
      "Second is the actual mock interview, over voice or text. The model takes on the persona of an interviewer for that role and works through a rough structure, but the part that matters is that it adapts to you: it asks follow-ups when your answer opens one up, asks for clarification when something's vague, and skips questions you already answered earlier instead of robotically marching down a fixed list. A canned question bank would have been way easier to build, but it wouldn't feel like an interview, and that's the whole point.",
      "Third, once you're done, it goes back over the transcript and gives you feedback answer by answer, grounded in the research it did up front. It's evaluating you against what this role actually wants, not generic interview advice off the internet. You can also upload extra context about yourself, like a resume or some project notes, and it'll point out places where you could have represented yourself better. It's not just about what you said, it's about what you COULD have said and didn't.",

      { heading: 'Judging something this subjective' },
      "The feedback is the piece I'm most proud of, because judging an interview answer is genuinely hard. It's subjective, there's no single right answer, and a strong answer is strong along a bunch of different axes at once. The easy version, and my first instinct, is to dump the whole transcript into one LLM and ask 'how'd they do?'. That works, sort of, but the feedback comes out shallow and generic and many responses get skipped over. Because you're asking one model to hold the entire messy problem in its head at once, it ends up doing every part of it to a mediocre degree.",
      "So instead I broke the judgment into 6 passes that run in parallel, each one looking at your answers through a single narrow lens. Content (did you actually say something real and specific, with evidence and ownership, or was it filler), Structure (was it organized and easy to follow, separate from whether the substance was any good), Fit (does the person you're presenting match what this role and company actually need), Communication (how you come across as a person, tone, confidence vs arrogance, owning a failure gracefully), Risk (did you say something that could actively hurt you, ex. a contradiction or a red flag), and Candidate context (given the resume you uploaded, were there better examples you could have reached for). Each lens looks for both the good and the bad on its own terms, and then a final LLM takes all 6 perspectives and aggregates them, per answer, into one clean list of actionable feedback with a clear reason attached to each point.",
      "This does WAY better than the single broad-sweep version, for the same reason it's easier to do 6 small focused tasks well than one giant fuzzy one. It's the idea I keep coming back to across all my AI work: take a big subjective problem and break it into pieces small and concrete enough that each one can be done really well.",

      { heading: 'Running the guardrail in parallel' },
      "One of the cleaner engineering lessons here came out of trying to keep the thing from getting abused. Once you put an LLM-backed app online, someone will eventually try to wrap your API and farm free model calls off it. You need to look over your product, identify cases where users provide text content to a model, and wrap those instances in the proper safety measures. There are obvious forms like the mock interview process, but even the initial job listing parsing, which reads from a website linked by the user, could sneak in a prompt injection that creates unwanted behaviors. For this app I added a guardrail agent to analyze content and ensure it's safe to proceed. The catch is that check takes a couple seconds, and bolting a couple seconds of latency onto a flow that necessitates quick responses can be a serious degradation to the user experience.",
      "Instead of running the guardrail first and the response generation second, I run BOTH at the same time and only commit to returning real response once both come back (the guardrail finishes first 99% of the time since its output is a single boolean). In the rare case a message does get flagged, I've technically paid for a generation I end up throwing away, but that's a tiny price for never making a legit user sit through a guardrail check they didn't need. Going forward I made this my rule for LLM workflows: anytime 2 calls don't depend on each other (ex. one's output isn't the other's input), they should be running in parallel.",
    ],
    gallery: [
      { src: '/images/projects/interviewpro/additional-images/image1.png', alt: 'Home page with sample job url and candidate context attached' },
      { src: '/images/projects/interviewpro/additional-images/image2.png', alt: 'Conducting a mock interview' },
      { src: '/images/projects/interviewpro/additional-images/image3.png', alt: 'Per-response feedback aggregation' },
      { src: '/images/projects/interviewpro/additional-images/image4.png', alt: 'Job listing and company deep research' },
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
      "NerdBot is an agentic chatbot that lets you have a full conversation with an over-the-top video game nerd: you tell it what you just bought, what you're into, or what you're in the mood to play, and it fires game recommendations back at you with way too much enthusiasm (think a caricature of the most passionate person in your friend group, EPIC and cringe and all). The personality is the fun part, but the real reason I built it was to get hands-on experience building deployable expertise agents from scratch. I designed, built, and deployed this independently, and it's live on HuggingFace if you want to go talk to it.",

      { heading: 'How it works' },
      "An LLM left to its own devices will confidently talk about games it's only half-remembering, so instead of letting it lean on whatever it memorized in training, I gave it a tool. The game facts come from RAWG (a big video game database), exposed as something the agent can call whenever it needs real data to answer you. I built that tool from scratch on OpenAI's tools structure rather than reaching for a framework, specifically so I'd understand the machinery myself instead of having it hidden behind an abstraction.",
      "So the flow is: you talk to it in plain English (ex. 'I just got a PS5, what should I buy' or 'I want something with a good progression system'), the agent decides mid-conversation when it needs to go pull data, calls the tool, gets structured results back, and works them into a recommendation with actual reasoning. The whole thing is wrapped in a Gradio interface, which is what let me get it deployed to HuggingFace fast.",

      { heading: 'Key learnings' },
      "The big one was that giving an agent a tool is the easy part, getting it to use that tool correctly is where all the work lives. It's shockingly easy for an agent to miss that it should have called a tool, or to call one it didn't need, so you have to be crystal clear about WHEN each tool is for, and the way you earn that clarity is by keeping tools narrow. One mega tool that does everything needs a pile of parameters (every one it doesn't currently need is just a distraction) and covers too many cases to explain cleanly, whereas a handful of small, sharply-divided tools is far easier for the model to get right.",
      "The other half is shrinking how much the model has to do at all, cus anything that can be done with code MUST be done with code. Enums were the cleanest version of this: the user says 'ps5', the LLM just outputs that enum, and my code maps it to the real platform ID, so the model never has to produce a brittle magic value. Structured output works the same way (ex. a date range as a first_date, nullable second_date, and a relationship that code then cleans up and validates), and when a tool call fails, the error it hands back has to say WHAT went wrong so the agent can actually fix its request and retry instead of failing the same way again. Underneath all of it is the mental model that stuck with me: LLMs are like very smart junior devs, genuinely capable but needing crystal-clear instructions, and every decision here was really just a way of being a better manager to that junior dev. Those lessons fed straight into the bigger things I built after (InterviewPro, CineMind).",
    ],
    gallery: [
      { src: '/images/projects/nerdbot/additional-images/image1.png', alt: 'Constrained product search, handling impossible request with grace' },
      { src: '/images/projects/nerdbot/additional-images/image2.png', alt: 'Combining parametric knowledge with concrete data' },
      { src: '/images/projects/nerdbot/additional-images/image3.png', alt: 'Head-to-head game comparison' },
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
      "Wizard Battle is a game where you describe a wizard in plain English (ex. 'one million lions', or 'a monkey who reached enlightenment watching David Goggins videos') and the AI turns that sentence into an actual combatant, then pits two of them against each other in a turn-based duel where it makes every move. I designed, built, and deployed all of it, and it's live. But the wizards were mostly an excuse. It was the smallest and most focused of my AI-year experiments, built to chew on one question I find genuinely interesting: how do you hand an LLM a messy, constantly-changing situation so it can actually make smart decisions inside it?",

      { heading: 'How it works' },
      "There are two LLM jobs under the hood. The first is generation: you type a description and the model builds a full, playable wizard out of it (a name, an element or two from a fixed set, a stat spread, and a spellbook where every spell has real mechanics). Structured output does the heavy lifting here, so the model gets to be creative about the theme while the parts that have to be rigid stay rigid (the elements are an enum, the numbers are bounded fields), and the game engine can actually run whatever comes back.",
      "The second job is piloting a wizard through the fight. Every turn the model gets the current state and has to pick a move, and the whole design is about shrinking that job down to just the part that genuinely needs a language model. Code handles anything code can (ex. it's handed 'critical' instead of raw health numbers, and it returns the id of the spell to cast rather than prose), and before it commits to a move it walks a short reasoning chain out loud (what's the state, what's threatening me, what was I setting up, so what's my move). Each step of the duel streams out into a running battle log as it resolves, so there's always something happening instead of a frozen screen while the model thinks.",

      { heading: 'Key learnings' },
      "A handful of things stuck with me. The FORM of the data matters as much as the data itself: an LLM only has so much attention, so making it do arithmetic on raw health numbers is attention stolen from the actual decision (hand it 'critical', or hide the info entirely when it doesn't matter). Reasoning has to come BEFORE the answer, not after: a justification field tacked on afterward just rationalizes a call already made, while the same reasoning placed first genuinely shapes the output. Latency is the real tax on chaining LLM calls, and streaming partial results (plus asking for the fewest output tokens possible) is what keeps it from feeling slow. And few-shot examples quietly teach patterns you didn't intend (if every attack example uses a storm wizard, the model learns storm = attack), so they have to span the space on purpose, or get dropped for stated principles when the space is too varied to cover in a few cases.",
      "Underneath all of it is the rule I lean on everywhere since: anything that can be done with code MUST be done with code, and the LLM should only ever own the part that truly needs it. That's not wizard-battle advice, it's the same instinct that powers the hard parts of CineMind. And under all the engineering it's still just a goofy game where 'a monkey who reached enlightenment watching David Goggins videos' can throw hands with 'one million lions', so go make something ridiculous and watch them fight.",
    ],
    gallery: [
      { src: '/images/projects/wizard-battle/additional-images/image1.png', alt: "Wizard generation screen with sample prompts" },
      { src: '/images/projects/wizard-battle/additional-images/image2.png', alt: "A duel in progress, each action generated by the LLM in the fighting style of that wizard" },
      { src: '/images/projects/wizard-battle/additional-images/image3.png', alt: "See which of your favorite characters would win in a fight" },
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
    tagline: 'May - August 2021',
    writeup: [
      "This was a summer as an iOS Developer Intern at Facebook (remote), and my first time building product on a large team at real scale. I owned a new 'events happening now' feature: a way to help millions of people discover events happening live in the moment, either physically near them or hosted online.",

      { heading: 'What I did' },
      "The first challenge was just getting useful. I was dropped into a large, unfamiliar codebase written in Objective-C, a language I'd never touched (I came up on Swift), and my mentor's workday didn't start until my early afternoon, so most mornings I was on my own. If I got stuck, it was on me to work it out rather than wait hours for a hand, so I got good fast at reading an undocumented system and finding my own way through it (a muscle I'd lean on constantly in the years after). Alongside the feature work, this was my first real look at how a big team actually ships: code reviews, product meetings, and coordinating across several departments to get one thing over the line.",
      "On the feature itself, I built toward the 'happening now' experience and stood up the large-scale A/B experiment that would measure whether it actually helped people, my first time working with experimentation at that kind of user scale. I identified ways to improve the core product, such as a more intuitive way to display dates for soon-to or recently started events that ended up shipping across the entire events space.",

      { heading: 'Outcomes and learnings' },
      "The 'happening now' feature never made it to launch, and understanding why is the most valuable thing I took from the internship. Two scoping gaps sank it. The first was technical: the feature depended on the events backend being able to search for what's live right now near a given user, and I had treated that capability as a given when it wasn't actually there. Building it properly would have been an entire project of its own, and we only realized that weeks into development. The second was conceptual: I never stopped to size the thing the feature was built around. The pool of events genuinely happening live for any one person turned out to be small, especially off-peak, and thin enough that the unit would surface low-quality or inappropriate content, so it couldn't responsibly go live no matter how well I built it.",
      "Both of those were catchable in the first week or two, and neither was. So the lesson I walked away with is to validate feasibility before committing to a build, both technically and conceptually: stand up a rough, ugly end-to-end version early to prove the whole flow is even possible, and if it isn't, raise it right away so the plan can change while there's still time to change it. It's a discipline I brought straight into my full-time work when I came back, and it's shaped how I scope every project since.",
    ],
  },
  {
    slug: 'mealme',
    category: 'experience',
    href: '/experience/mealme',
    title: 'MealMe',
    cover: '/images/experiences/mealme/banner.png',
    summary:
      'As one of four employees at the food-ordering startup MealMe, I cut costs in the data layer and improved the core product experience, getting the app into a state where the team could focus on aggressive expansion in the market.',
    tagline: 'June - August 2020',
    writeup: [
      "MealMe was a food-delivery price-comparison platform (open it, pick a restaurant order, and it finds you the best deal across the various delivery services), built by two founders fresh out of TechStars who had just brought on their first two interns. I came on as one of them, the iOS Engineer Intern, tasked with two goals: get our runaway data costs under control so we could actually afford to scale, and smooth out the browsing experience so users could reach our real differentiator with as little friction as possible. Having just taught myself iOS development in the months prior, this was my first real taste of owning a product end to end, and was a great lesson in product judgment.",

      { heading: 'Making the browsing data free' },
      "The first major problem I tackled was that our data was quietly bleeding us dry. All of our restaurant information came from an expensive mapping API, and because data such as hours of operation were subject to change anytime, there wasn't much we could cache. We were paying full price for fresh data on nearly every request. Coming straight out of TechStars with limited runway, that cost was the single biggest threat to the company. It was steep enough that every new user cost us real money the moment they opened the app, which meant we couldn't afford to advertise, and it put a hard ceiling on how much we could grow.",
      "The realization that cracked it was that best-in-class map data was never our differentiator. Nobody opened MealMe for the restaurant listings, they opened it for the price comparison, so paying a premium for the nicest possible browsing data meant spending our scarcest resource on what was really a commodity. So I rebuilt the browsing layer to run on free data, stitching Apple's MapKit together with Yelp into one experience that covered what our users actually needed completely for free. The quality hit was small and mostly invisible to users, but now we were free to scale.",

      { heading: 'Redesigning the part users actually touch' },
      "With the data costs eliminated my next goal was revamping the browisng experience. The insight was the same one from the data work: browsing was the on-ramp, not the destination, so the win wasn't making it clever, it was making it frictionless enough that people actually reached the price comparison they came for. I studied what competitors got right and wrong, surveyed friends and family to find where people stalled out, and redesigned the flow around getting the user to the restaurants they want with as little efforrt as possible. I even added a primitive recommendation system so browsing results would be personalized based on your in-app behavior. Upon release we saw our daily active users double, confirming the new experience was a success.",

      { heading: 'What it taught me' },
      "The biggest lesson was about scope. Sometimes the better product wins, and sometimes the FIRST product wins, and a lot of the game is knowing which situation you're in. A product doesn't have to be perfect to go out the door: if the core of it is genuinely solid and provides real value, you can ship a lean version and let actual customer data tell you what to build next. There's even a nice forcing function hiding in that; when the core is good, the users who want more will ask for the features they're missing rather than walking away over them. It only works if the thing at the center is truly valuable, but when it is, first and lean beats late and perfect more often than people expect.",
      "I also took a lesson from watching the company itself, as they had recently pivoted from being a food-based social media platform to this price comparison idea, finding genuine product market fit. There's real discipline in looking at a product honestly, recognizing where it's capped, and having the flexibility to restart in a space with more potential, rather than clinging to something just because you already built it.",
      "And more than anything, MealMe showed me up close how brutal the early traction fight is. You have to network, advertise, and be relentlessly efficient with resources you barely have, and a huge part of it is staying clear-eyed about which pieces of your product are your real, differentiated offering versus which are just the table-stakes commodities everyone already expects. That one distinction, spend on what sets you apart and go cheap on what doesn't, ran through everything I did there, and it's the product instinct I've leaned on in everything I've built since.",
    ],
  },
  {
    slug: 'dcu',
    category: 'experience',
    href: '/experience/dcu',
    title: 'Digital Federal Credit Union',
    cover: '/images/experiences/dcu/banner.png',
    summary:
      "An IT intern at one of the country's largest credit unions, where I automated internal workflows and built dashboards that streamlined the team's day-to-day operations.",
    tagline: 'May - August 2019',
    writeup: [
      "This was a summer internship on the IT team at DCU (Digital Federal Credit Union), one of the largest credit unions in the country, and my first real look at how a big, established company runs its technology day to day. My work split into two streams: automating the repetitive tasks the team handled by hand, and building dashboards to give us a clearer read on how our sprints were performing. Between them, they taught me a lot about what makes an internal tool worth building, and what it takes to get people to actually use one.",

      { heading: 'What I did' },
      "Most of the work was taking the repetitive tasks the team handled manually and turning them into scripts, mostly with PowerShell and Active Directory. I automated things like provisioning employee profiles for new hires so nobody had to click through that whole setup by hand and a scheduled job that cleared out old logs to keep disk space in check. One of my favorites was quite simple: a coworker had a job that required accessing employee's internal contact info. This was spread across multiple spreadsheets with no organization or consistency, turning it into a tedious manual process. In just one afternoon I wrote him a script to easily search and update these sheets, saving him hours of work each day. A small, well-aimed piece of code can pay for itself many times over.",
      "The other stream was analytics. Sprints were how our team organized its work, and after each one we ran a retro to figure out how we could work more efficiently the next time, so having a clear, accurate picture of a sprint really mattered. The trouble was that the raw ticket data lived in Jira in a shape that couldn't show us everything we wanted to track, so I used SQL to consolidate and clean it up, then fed it into a set of PowerBI dashboards. That preprocessing is what did the real work: it turned a scattered pile of tickets into something we could read at a glance, which made it easy to steer ourselves while a sprint was live and just as easy to look back and retro it once it wrapped.",

      { heading: 'What it taught me' },
      "The biggest thing I took away is that a good product has to clear two bars at once. It has to do something its users genuinely value, and it has to be usable by the exact people it's meant for. Clearing only one isn't enough. A tool can do something genuinely impressive, but if that capability is locked behind a confusing interface, its value never really gets realized, and the people it was built for just don't get the benefit. The insight that made this concrete for me is that your users didn't build the system, you did, so the things that feel obvious to you are only obvious because you built it. Telling someone to 'just run this command in your terminal' is a non-starter, and the answer isn't to expect them to adapt to you, it's to wrap that same capability in something that fits how they already work.",
      "The other thing that stuck was how much effort companies still put into simply staying organized, into cutting down the time spent on everything that isn't the core work. I saw it at DCU, and then I saw the same priority at Meta, a completely different kind of company at a completely different scale. What stands out to me is that companies of every size are still working this hard at it, all these years later, which tells me there's a huge amount of room left to do it better. It looks like a space that's short on genuinely good products, and that's exactly the kind of problem I like aiming myself at.",
    ],
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
      { src: '/images/projects/orm-strength-tracker/additional-images/image1.png', alt: 'The home dashboard' },
      { src: '/images/projects/orm-strength-tracker/additional-images/image2.png', alt: 'Features overview and value proposition' },
      { src: '/images/projects/orm-strength-tracker/additional-images/image3.png', alt: 'Tracking an exercise over time' },
      { src: '/images/projects/orm-strength-tracker/additional-images/image4.png', alt: 'Easily see your personal bests' },
      { src: '/images/projects/orm-strength-tracker/additional-images/image5.png', alt: 'Standalone tool for calculating one rep maxes to entice downloads' },
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
    tagline: 'Budgeting without the bloat',
    writeup: [
      "Easy Budgeting is an iOS budgeting app I built in June 2022, over about 2 weeks. My start date at Meta got pushed (my work laptop was stuck in the mail), I'd just graduated and was trying to get a handle on my money, and every budgeting app I tried was so buried in features that the simple thing I wanted was nowhere to be found. So I built it myself, then used it to run my own finances for over a year.",

      { heading: 'A cluttering problem' },
      "I didn't want much: set a budget, track what I spend, know if I'm on track. But the apps out there were all stuffed with extras I never asked for, most of them there to upsell me rather than actually help me budget. I was about 2 weeks from starting full time as an iOS developer, so I figured I'd just make the simple one myself.",

      { heading: "Keeping things simple" },
      "The whole app is 2 screens: one to set a budget per category and log expenses against it, and one with a burndown chart per category so you can see your spending across the month (or look back at previous ones). I went with a burndown instead of a single 'amount left' number on purpose, since a number only tells you you've overspent once it's already too late, while the slope of a burndown shows you you're going too fast with time still left to pull back.",
      "There are obvious ways it could be better (custom timeframes, auto-importing expenses instead of typing each one in), and I knew that at the time. I left them out because the simple version did the job, and it did, I lived on it for over a year. It's an old project and isn't live anymore, but it's an early version of how I still work: find the real problem, build the smallest thing that solves it, and actually use it.",
    ],
    gallery: [
      { src: '/images/projects/easy-budgeting/additional-images/image1.png', alt: 'Home screen: current monthly expenses grouped into custom categories' },
      { src: '/images/projects/easy-budgeting/additional-images/image2.png', alt: 'Home screen: categories expanded' },
      { src: '/images/projects/easy-budgeting/additional-images/image3.png', alt: 'Spending burndown chart' },
      { src: '/images/projects/easy-budgeting/additional-images/image4.png', alt: "Spending burndown chart (part 2)" },
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
    tagline: 'Making a recovery device\'s data usable for doctors and patients',
    writeup: [
      "Tyes was an organization I cofounded with 7 other Georgia Tech students through our Grand Challenges program, built to make better tools for people recovering from muscular spasticity. It came out of a real gap in how that recovery gets measured.", 

      { heading: 'Identifying a problem' },
      "Our program started with a completely blank slate, our job was to identify potential problem spaces and ideate on their solutions. We learned how to approach this with the right mindset: genuinely learning about the space and its pain points before even considering what technologies to build. A solution seeking a problem is the easiest way to make poor decisions. When you hold a hammer everything becomes a nail. Through structured research and guided brainstorming sessions we aligned on our problem.",
      "The standard assessment for muscular spasticity recovery, the 9-hole peg test, has a patient move 9 pegs in and out of a board while being timed, and the whole result is a single completion time. That one number, inherently flawed as it's hand-timed, throws away almost everything about how the patient actually performed. Furthermore the vast majority of recovery takes place between sessions, including an invaluable period shortly after incidents such as a stroke that dictate the overall quality of recovery. We wanted to fix both problems: allow physicians to easily gather consistent and detailed data on a patient's motor abilities, and improve patient participation in structured recovery activities between sessions. It stayed a student proof of concept, built alongside doctors at Emory and licensed physical therapists and aimed at the Impact 2020 conference, ultimately sidelined by Covid.",

      { heading: 'How it works' },
      "We started small: how could we take a test doctors already know and trust and improve it to capture a broader suite of data in a more consistent manner? Our approach was to create an intelligent test device that automatically initiated the test, tracked key events during, and recorded the final completion time. This left doctors free to analyze more subjective parts of the patient's mechical control without worrying about simultaneous data gathering.",
      "On top of this we experimented with how we could create a take-home version of the test that varied the skills necessary to complete. By varying the shape of the objects to be grabbed and the placement precision needed, it could serve as a structured progression in rehabilitation. Since this would be used at home it would connect with a patient-therapist portal allowing the doctors to check in between appointments, motivate patients to follow their prescribed routine, and even capture additional data for the doctor to evaluate during sessions.",
      "In the end we built an initial prototype for this intelligent standard test with a connected interface for surfacing results to physicians. We planned to get backing for further developments at the Impact 2020 conference, which was ultimately cancelled due to the pandemic.",

      { heading: 'What I took from it' },
      "Although we ended early, this was a foundational experience that shaped how I approached similar problems later on. Research the space before you design anything, go talk to the people who actually live the problem (here, the therapists and patients) instead of guessing, and let what you learn decide what to build. Work with your intended audience not against them, adoption is just as important as making a product that is technologically impressive.",
    ],
    gallery: [
      { src: '/images/projects/tyes/additional-images/image1.png', alt: "The Tyes site's 'How Our System Works' page: a CAD render and a photo of the instrumented peg-board prototype, next to an explanation of how it records fine-motor timing data" },
      { src: '/images/projects/tyes/additional-images/image2.png', alt: "The results view: a line chart of individual peg placement times (today vs last week) and a time-analysis breakdown (total time, average placement time, deviation from a healthy average, degree of impairment)" },
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
    tagline: "Making a class's data make sense to teachers and students",
    writeup: [
      "Intelligent Tutoring Systems was a Georgia Tech VIP (Vertically Integrated Projects) team I worked on across 2 semesters, building a tool to help teachers understand how their class was actually doing and help students understand where they stood and how to improve. The idea we kept coming back to is that a course throws off a mountain of data and material (years of performance data, plus all the notes, homework, and resources around it), and almost none of it is in a shape anyone can actually learn from. It's all there, it's just not legible. I was the frontend and product side of the team, so my job was two things at once: figuring out what this should actually be for the people using it, and building the interface that brought it to life. It stayed an academic project, we got a working demo we were proud of, and it never shipped as a real product.",

      { heading: 'How it worked' },
      "Under the hood, the product pulled a course's performance data together and tried to make it actionable for both sides of the classroom. It consolidated results across prior years and the current one, ran a KNN model to categorize assignments by difficulty (so a teacher could spot the ones that were miscalibrated, too hard or too easy), and grouped students into categories based on how past semesters had played out, so it could point a given student at the areas they were weakest in.",
      "My side of it was turning all of that into something people could actually use. I designed and built the two main interfaces, the teacher view and the student view, which started with working out what each of them even needed out of the same pile of numbers (a teacher wants a read on the whole class and on individual assignments, a student wants an honest picture of where they stand and what to do next), and then building for it. The heart of that was the dynamic charts and graphs: interactive views that took the raw data behind everything above and turned it into something you could read at a glance and dig into, instead of a table nobody was ever going to sit down and parse.",

      { heading: 'What I took from it' },
      "The lesson that stuck with me is how much of a good interface happens before you draw any of it. I couldn't build the teacher view or the student view until I'd figured out what each of those people actually needed, cus a teacher and a student are chasing completely different things even though it's the exact same data underneath. And the visualization side was really a communication problem as much as an engineering one: the whole point was taking something dense and abstract and turning it into something a person just gets the second they look at it. Starting from who's going to use this and what they need to understand, then building backward to it, is the instinct I've leaned on in just about everything I've built since.",
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
      "Ape Unit (a play on JUnit) was born from our data structures and algorithms class at Georgia Tech. It has a reputation for being the first challenging course that weeds out many prospective graduates early on. It was heavily project based and it just so happened that they allowed students to build and share unit tests with each other. They can't give you the answer, but they can catch mistakes and give you confidence that if you passed them you're likely getting a strong grade.",
      "I had been making my own unit tests for the first few weeks and saw the attention they were getting in the class' online portal. My friends and I, who really enjoy putting serious effort into knowlingly dumb but funny things, decided this would be a great opportunity to spread our love for apes. Little did we know this would spread into a cultural phenomena with a legacy that lived on even after we finished the course.",

      { heading: 'How it works' },
      "The key foundation was the unit test. We needed to get a test made soon after the project was released and it needed to be thorough enough that it was the best option for any student looking to make sure their project was in a good state. This was our hook to bring students in.",
      "Attached to each test was a silly ape-themed game. If you passed all of the tests we'd automatically open up this game as your 'reward', although it was really just us trying to have some fun. Each weak the game become more complex and larger in scale. It was an inside joke that had to keep one-upping itself with each assignment. The best part was the contrast between the real utility of the tests and the ridiculousness of the games: passing our tests all but guaranteed a 100, then suddenly you're playing a flappy bird clone with apes.",
      
      { heading: 'A cultural phenomena' },
      "Our antics spread like wildfire. Students loved the stupidity of it all and were genuinely performing better. Each week people would be posting in the online forums asking when the tests would come out. I would see people around campus actively playing our games. A friend of mine, who wasn't studying computer science let alone in the class, asked me if I'd heard about 'the ape guys'. Even a year later, long after we'd completed the course, people were asking in the forums about what happened in the Spring of 2019.",

      { heading: 'What it taught me' },
      "The lesson I still carry is about incentives: we wanted to market something and students wanted better grades. Eventually the games themselves became an incentive to pass the tests creating a whole ecosystem of mutually beneficial behaviors. As silly as it sounds this it's a philosophy I've seen applied to real businesses.",
    ],
    gallery: [
      { src: '/images/projects/ape-unit/additional-images/image1.png', alt: "Our main landing page" },
      { src: '/images/projects/ape-unit/additional-images/image2.png', alt: 'History of the class assignments and the games we released for them' },
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
      { src: '/images/projects/project-shatter/additional-images/image1.png', alt: 'Problem statement page' },
      { src: '/images/projects/project-shatter/additional-images/image2.png', alt: 'Student dashboard showing challenges aimed at connecting students with companies' },
      { src: '/images/projects/project-shatter/additional-images/image3.png', alt: 'Challenge details screen' },
      { src: '/images/projects/project-shatter/additional-images/image4.png', alt: 'Successfully completed challenge' },
      { src: '/images/projects/project-shatter/additional-images/image5.png', alt: 'Facilitating the learning process' },
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

/**
 * The experience-only entries (facebook, mealme, dcu) live solely in EXPERIENCES;
 * instagram and orangeworks-innovation-lab already appear in FLAGSHIPS under the
 * same slugs, so we drop those two here to avoid a duplicate-slug clash in bySlug
 * (which resolves to the FLAGSHIPS copy, listed first below).
 */
const EXPERIENCE_ONLY = EXPERIENCES.filter(
  (e) => !FLAGSHIPS.some((f) => f.slug === e.slug)
);

/** Everything, for index screens that filter by category. */
export const ALL_WORK = [...FLAGSHIPS, ...EXPLORATIONS, ...EARLIER_WORK, ...EXPERIENCE_ONLY];

export const byCategory = (category) => ALL_WORK.filter((w) => w.category === category);
export const bySlug = (slug) => ALL_WORK.find((w) => w.slug === slug);
