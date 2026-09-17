---
name: wcag-accessibility-skills
description: Audit HTML, local pages, or approved public URLs against WCAG 2.1 and 2.2 with explicit automated, semi-automated, and manual-review boundaries. Use for `/wcag-audit`, WCAG criterion checks, accessible repair proposals, CI accessibility reports, and task delegation. Do not use a clean automated result as a legal or conformance claim.
metadata:
  short-description: WCAG audit and manual-review skill
---

# WCAG Accessibility Skills

Use this skill to produce reproducible accessibility evidence while preserving the work that must be tested by people.

## Command routing

Run the CLI from this skill directory or an installed package. Use the slash form in agent conversations and the matching `wcag-*` executable in a shell.

| Request | Command | Output |
|---|---|---|
| Audit one URL, file, or HTML fragment | `/wcag-audit <target> [--level A|AA|AAA] [--version 2.1|2.2] [--format json|markdown|html] [--output <path>] [--fail-on low|medium|high|critical|none]` | Canonical audit report |
| Inspect a WCAG 2.2 criterion | `/wcag-check <criterion>` | Criterion metadata and W3C URL |
| Store project defaults | `/wcag-configure <A|AA|AAA> <2.1|2.2>` | `.wcag-skill.json` |
| Get a proposed repair | `/wcag-fix <issue-id> --report <report.json>` | Evidence, proposal, verification steps |
| Render an existing report | `/wcag-report <report.json> [--format json|markdown|html] [--output <path>] [--fail-on ...]` | Formatted report |
| Create a repair task payload | `/wcag-delegate <issue-id> --report <report.json>` | Bounded task JSON |
| Summarize a report | `/wcag-status --report <report.json>` | Release-oriented JSON summary |

For the repository checkout, invoke the command with:

```bash
node bin/wcag-skill.js /wcag-audit ./page.html --level AA --version 2.2 --format json --output reports/audit.json
```

Read [README.md](README.md) for all argument semantics and examples. Read [docs/wcag-coverage.md](docs/wcag-coverage.md) when deciding how a success criterion is verified. Read [docs/api-reference.md](docs/api-reference.md) before implementing a Claude MCP, Codex, or Gemini adapter.

## Operating boundaries

- Treat JSON as the canonical report. Markdown and HTML are renderings only.
- Preserve `manualReview` in every summary, issue, agent handoff, or external integration.
- A static scan can establish limited source evidence. It cannot establish legal compliance, a WCAG conformance claim, meaningful text alternatives, keyboard usability, rendered contrast, focus visibility, screen-reader interaction, captions, or full-process usability.
- Use an approved public URL, a local file in scope, or supplied HTML. Do not scan authenticated systems or unapproved targets.
- `/wcag-fix` and `/wcag-delegate` propose work but never authorize file edits, pull requests, tickets, or production changes. Apply fixes only under the host's normal write and review permissions.
- Interpret exit code `0` as “no finding reached the configured threshold”, `1` as valid evidence at that threshold, and `2` as an operational or input failure. Never label exit code `2` as an accessibility pass.

## Repair and verification workflow

1. Audit the target and retain the JSON report.
2. Inspect the relevant W3C criterion with `/wcag-check` when the rule needs context.
3. Use `/wcag-fix` to obtain the narrow proposal and current evidence.
4. Apply a minimal repair only with authorization.
5. Re-run the same audit and verify the finding is absent.
6. Complete the criterion-specific manual testing required by `manualReview`, including keyboard and relevant assistive technology where applicable.

Do not close a task merely because the static finding disappears.
