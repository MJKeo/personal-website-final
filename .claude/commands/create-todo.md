# /create-todo

Add a single TODO to `TODOs.md` — an action we want to remember to do later but
aren't doing now. See `.claude/rules/memory-system.md` (`TODOs.md` is freely
editable).

The action to record: $ARGUMENTS

Steps:

1. Read `TODOs.md`. If an equivalent item already exists, say so and don't
   duplicate it.
2. Add a new line under the **## Open** section using today's date:
   `- [ ] YYYY-MM-DD — <action>. <optional brief context / where it applies>`
   Keep the action concrete and self-contained so it makes sense in a future
   session with no other context. If `$ARGUMENTS` is vague, lightly sharpen the
   wording (and add a where/why if you know it from the conversation) — but don't
   invent scope that wasn't asked for.
3. Confirm by showing the exact line you added.

Do not implement the action now — this command only records it.
