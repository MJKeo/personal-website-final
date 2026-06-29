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
  replace `WorkDetail` (or add per-item screens) with real write-ups.
- [ ] 2026-06-26 — Build out the index screens (Projects, Games) and the AI /
  earlier-work detail pages — all currently render `<InProgress>`. _Experience
  index done 2026-06-29: `/experience` now renders a grid of `EXPERIENCES` cards
  (`src/screens/Experience/Experience.js`)._ _Projects index done 2026-06-29:
  `/projects` now renders a grid of the new `PROJECTS` list (CineMind + the 3 AI
  explorations + the 6 earlier-work cards, in homepage order) via
  `src/screens/Projects/Projects.js`, same `PageHeader` + `CardGrid` +
  `ProjectCard` pattern as Experience. Games index still pending._
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
  files were removed. Caveat: the Intelligent Tutoring Systems source icon is only
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
