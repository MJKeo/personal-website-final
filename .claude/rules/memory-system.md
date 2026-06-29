# Rule: Memory System

This project uses a file-based memory system — files at the repo root, plus a
background-material index in `personal_context/`. Follow this rule in every
session.

## The files

| File | Purpose | Load when |
|---|---|---|
| `PROJECT.md` | Mission & conceptual context — the what and why. | **Every session, up front.** |
| `KEY_DECISIONS.md` | Durable decisions/learnings carried across conversations. | **Every session, up front.** |
| `TODOs.md` | Actions we discussed but didn't implement — deferred work. | **Every session, up front.** |
| `personal_context/README.md` | Index of background material on Michael; the underlying files are large and loaded on demand. | **Every session, up front.** |
| `ARCHITECTURE.md` | Map of the codebase file structure for navigation. | **As needed** for codebase traversal. |
| `CLAUDE.md` | Session entrypoint that points to the above. | Auto-loaded. |

## Session start

At the start of each session, **absorb `PROJECT.md`, `KEY_DECISIONS.md`,
`TODOs.md`, and `personal_context/README.md`** so you act with the mission, prior
decisions, outstanding work, and Michael's background in mind. Read
`ARCHITECTURE.md` when you need to locate or navigate code rather than reading the
whole tree. Open the individual `personal_context/` files only when a task needs
them (the index says which one).

## Auto-maintenance

Whenever you do work that **changes the codebase**, keep the memory system
current as part of that same task:

- **`ARCHITECTURE.md`** — update it whenever the file structure changes: new/
  removed/moved files or folders, new components, new conventions, or changes to
  the token system or build setup. Keep it accurate; it's the navigation map.
- **`PROJECT.md`** — update it when the mission, target audience, core argument,
  goals, or priorities shift.
- **`TODOs.md`** — whenever we agree something should be done but don't do it in
  the moment, add it as an open item. Check off (or remove) items once they're
  actually implemented. Keep it current so deferred work isn't lost.
- **`personal_context/README.md`** — update the index when files are added to or
  removed from `personal_context/` so it stays an accurate map of the background
  material.

You may edit **`ARCHITECTURE.md`, `PROJECT.md`, `TODOs.md`, and
`personal_context/README.md` freely** (no need to ask) when keeping them in sync
with work you're doing.

## Requires permission first

You must **ask Michael before editing**:

- **`KEY_DECISIONS.md`** — propose the entry (decision + why), get approval, then
  add it. This is the durable record of settled choices; don't write to it
  unilaterally.
- **`CLAUDE.md`** — ask before changing the session entrypoint / memory pointers.

## Notes

- Keep entries concise and dated (`KEY_DECISIONS.md` uses `YYYY-MM-DD`).
- Don't duplicate content across files: *why* → `PROJECT.md`, *where* →
  `ARCHITECTURE.md`, *what-we-settled* → `KEY_DECISIONS.md`, *what's-still-undone*
  → `TODOs.md`.
- The `/safe-clear` command runs the maintenance pass (update memory + capture
  TODOs) before a context clear; `/create-todo` adds a single item to `TODOs.md`.
- If a change spans several files, update all relevant memory files in the same
  pass so they never drift out of sync.
