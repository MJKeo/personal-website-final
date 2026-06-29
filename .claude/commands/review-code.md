# /review-code

Review the most recent code changes against this project's standards and design
intent. By default, review the changes made most recently in this session.

## What to review

Determine the change set from, in order of preference:
1. The files/scope named in `$ARGUMENTS`, if any.
2. Otherwise, the **uncommitted git diff** (`git status` + `git diff` and
   `git diff --staged`) combined with the **conversation context** — i.e. the
   changes we just made. Use the conversation to understand the *intent* behind
   them; use the diff to see what actually landed.

If there's no diff and no clear recent change, ask what to review before going on.

## Read first (memory system)

Per `.claude/rules/memory-system.md`, ground the review in our memory store:
- **`PROJECT.md`** — the mission, priorities, and constraints. Review against
  what actually matters for this site (a hiring asset; see its goal ordering).
- **`KEY_DECISIONS.md`** — settled decisions the changes must respect; flag any
  change that silently contradicts one.
- **`ARCHITECTURE.md`** — the file-structure map and the **Conventions** section
  (screens vs components, the two-tier "Fern" token rules, content in
  `src/content/`, `AppLink` for internal links, assets in `public/`).
- **`.cursor/rules/`** — the enforced coding conventions; treat as standards.

## Review process

1. **Intent alignment.** Do the changes accomplish what the conversation said
   they should? Anything missing or divergent? If intent is unclear from the
   conversation, ask before proceeding.

2. **Bugs.** Concrete bugs only — real code paths that produce wrong results, not
   hypotheticals. For each: what triggers it; what happens vs what should;
   severity (critical / high / medium / low).

3. **Logic errors.** Off-by-one, wrong boundary, inverted boolean, bad null
   handling, broken React state/effect/render logic, etc. For each: location
   (file + function/component), what it does vs should do, a concrete fix.

4. **Convention & architecture compliance.** Check against `ARCHITECTURE.md`
   conventions, `.cursor/rules/`, and `KEY_DECISIONS.md`. Common ones here:
   - Hard-coded hex/color instead of `var(--color-*)` semantic tokens; reaching
     past semantic tokens into raw primitives.
   - A full page added as a component instead of a routed screen under
     `src/screens/`; missing route registration in `App.js`.
   - Page copy/data placed inside a component/screen instead of `src/content/`.
   - Internal navigation via raw `<a>` instead of `AppLink`/router; external/file
     links missing new-tab `rel` safety.
   - Component not generic/data-driven, or missing its JSDoc prop header / paired
     `.css`.
   Flag violations only — don't list what's already correct.

5. **Efficiency.** Inefficiencies that matter given `PROJECT.md` priorities —
   unnecessary re-renders, wasteful work in render, missed reuse of existing
   components/utilities. Skip micro-optimizations.

6. **Frontend safety.** `dangerouslySetInnerHTML` / unsanitized HTML, leaked
   secrets or personal data that shouldn't ship, missing `rel="noopener
   noreferrer"` on `target="_blank"` links, broken accessibility (missing alt /
   aria where the existing components set a clear bar). Concrete issues only.

## Output

Organize by severity, most important first:

**Critical** — incorrect behavior, broken build/route, or leaked data. Fix before commit.
**Warning** — issue under specific conditions, a convention/decision violation, or notable inefficiency.
**Suggestion** — non-blocking improvement (style, minor efficiency, readability).

For each finding: state the file + function/component, describe the problem
concretely, and propose a specific fix. Don't pad — skip empty categories, and if
the code is clean say so in one sentence.

## After the review (memory system)

If the review surfaces real follow-ups we won't fix right now, offer to record
them in `TODOs.md` (or just run `/create-todo`) so they aren't lost. Don't edit
`KEY_DECISIONS.md` or `CLAUDE.md` as part of a review.

Focus on: $ARGUMENTS
