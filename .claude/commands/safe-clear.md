# /safe-clear

Run the memory-system maintenance pass **before the context is cleared**, so
nothing learned or left undone in this conversation is lost. This is the
checkpoint to run when you're about to `/clear`, compact, or end a session.

Follow `.claude/rules/memory-system.md`. Do the following, in order:

1. **Review the conversation** since the last checkpoint. Identify: code/file-
   structure changes made, decisions reached, mission/priority shifts, and any
   actions we agreed on but did **not** implement.

2. **Update the freely-editable memory files** to reflect this conversation:
   - `ARCHITECTURE.md` — if files, folders, components, screens, conventions,
     tokens, or build setup changed, bring the map back in sync.
   - `PROJECT.md` — if the mission, audience, core argument, goals, or priorities
     shifted, update them.
   Make these edits directly (no need to ask).

3. **Capture deferred work in `TODOs.md`.** For every action we discussed but
   didn't actually do, add an open item:
   `- [ ] YYYY-MM-DD — <action>. <why / where>` (use today's date). Don't
   duplicate items already listed. Check off or remove any TODOs we completed
   this session.

4. **Propose `KEY_DECISIONS.md` entries (ask first).** If we settled any durable
   decision, draft the entry (decision + why) and **ask Michael to approve**
   before writing it. Do not edit `KEY_DECISIONS.md` or `CLAUDE.md` without
   approval.

5. **Report** a short summary of what you updated (files touched, TODOs added,
   decisions proposed) so it's clear the memory is safe to clear.

Optional focus / notes for this pass: $ARGUMENTS
