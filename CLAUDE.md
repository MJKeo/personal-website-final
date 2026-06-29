# CLAUDE.md

## What this project is

A personal website to help Michael Keohane get hired. See `PROJECT.md` for the
full *what* and *why* — mission, audience, the argument the site must make, goals,
and priorities.

## Memory system (read this first)

This project maintains a file-based memory system. The full operating rules live
in `.claude/rules/memory-system.md` — including the auto-maintenance and
permission rules. Summary:

| File | Purpose | When |
|---|---|---|
| `PROJECT.md` | Mission & conceptual context — the *what* and *why* (who Michael is, audience, core argument, goals, priorities). | **Absorb every session, up front.** |
| `KEY_DECISIONS.md` | Durable decisions/learnings across conversations. | **Absorb every session, up front.** |
| `TODOs.md` | Actions discussed but not yet implemented (deferred work). | **Absorb every session, up front.** |
| `personal_context/README.md` | Index of background material on Michael (Meta, CineMind, gap-year projects, LinkedIn). | **Absorb every session, up front.** |
| `ARCHITECTURE.md` | Map of the codebase file structure (the *where*). | **Use as needed** for code navigation. |
| `CLAUDE.md` | This file — entrypoint tying the system together. | Auto-loaded. |

**At the start of each session: absorb `PROJECT.md`, `KEY_DECISIONS.md`,
`TODOs.md`, and `personal_context/README.md`, and use `ARCHITECTURE.md` for
codebase traversal.**

**Maintenance:** when work changes the codebase, keep `ARCHITECTURE.md`,
`PROJECT.md` (if the mission shifts), and `TODOs.md` (capture deferred actions)
in sync in the same pass — these may be edited freely. **Ask Michael before
editing `KEY_DECISIONS.md` or `CLAUDE.md`.** Commands: `/safe-clear` runs the
full maintenance + TODO-capture pass before clearing context; `/create-todo`
adds a single TODO. See the rule file for details.
