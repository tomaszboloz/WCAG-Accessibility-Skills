# WCAG Accessibility Skills

> Portable WCAG accessibility audits with explicit human-review boundaries.

[![CI](https://github.com/tomaszboloz/WCAG-Accessibility-Skills/actions/workflows/ci.yml/badge.svg)](https://github.com/tomaszboloz/WCAG-Accessibility-Skills/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![Node 20+](https://img.shields.io/badge/node-20%2B-339933)](package.json)

WCAG Accessibility Skills is an open-source command skill for static accessibility evidence, review planning, and CI regression gates. It is intended for web accessibility audits, digital accessibility development, and accessibility compliance workflows across Claude MCP, OpenAI Codex, Gemini function calling, and any agent host that can execute a command or consume JSON.

## Contents

- [Why](#why)
- [Features](#features)
- [Install](#install)
- [Quick start](#quick-start)
- [Usage guide](#usage-guide)
- [Complete CLI reference](#complete-cli-reference)
- [WCAG coverage](#wcag-coverage)
- [Architecture](#architecture)
- [API reference](#api-reference)
- [Comparison](#comparison)
- [FAQ](#faq)
- [Contributing, roadmap, and support](#contributing-roadmap-and-support)

## Why

Web accessibility is a quality requirement, not an optional visual polish pass. People use websites through keyboards, voice input, screen readers, magnification, switches, browser zoom, different colour perception, and different cognitive strategies. A product that hides a submit button’s name from assistive technology, omits a language declaration, or puts a keyboard user into a broken interaction is not merely failing a checklist: it is blocking a person from completing a task. WCAG provides a stable shared language for detecting and discussing these barriers, and laws or procurement standards often reference WCAG-based requirements. The exact legal duty depends on jurisdiction, product type, contract, and current law; a technical tool cannot decide it for an organisation.

The WebAIM Million study is a useful reminder that obvious, detectable barriers remain widespread. It is not a universal compliance census and should always be cited with its date and method. Its value here is practical: teams need feedback while code is being written, before a defect becomes a release risk or an expensive remediation project. A static audit can reliably recognize several high-value patterns, including an image without an `alt` attribute, a document without `lang`, an unnamed control, an empty link, a missing title, or a positive `tabindex`. Those checks are quick, objective, and appropriate for continuous integration.

The dangerous alternative is an audit tool that turns a partial scan into a green “compliant” badge. Contrast depends on actual rendered colours; meaningful alternative text depends on purpose; focus order, motion, errors, authentication, captions, and the quality of a transaction need interaction and human judgement. Even a browser engine with a large rule catalogue cannot know all of that from a page snapshot. This project therefore makes the uncovered work visible in every report. It returns findings plus a criterion-by-criterion manual or semi-automated queue. That is intentionally less comforting than a score, and more useful for real accessibility work.

The skill also solves an agent-workflow problem. A coding agent can run `/wcag-audit`, inspect bounded evidence, receive a `/wcag-fix` proposal, create a `/wcag-delegate` payload for a fixing agent, and run the same audit after the patch. It cannot silently change code without the host’s write permission, and it cannot declare legal conformance after an automated pass. This separation lets a team automate routine evidence while reserving accountable decisions for the people qualified to make them.

## Features

The core package is deliberately small. Node.js 20 is the only runtime requirement, and no production dependency is installed. A local file, inline HTML, or HTTP(S) URL goes through a ten-second-bounded loader, then through deterministic source checks. The result is canonical JSON with source identity, WCAG version and level, severity totals, individual findings, a review queue, and an explicit limitation statement. Markdown and accessible HTML are renderers over that JSON rather than competing schemas.

Key features are:

1. WCAG 2.2 registry with all 86 active success criteria and the correct 78-criterion WCAG 2.1 scope.
2. Cumulative Level A, AA, and AAA scope resolution.
3. Deterministic checks for missing `alt`, document language, title, headings, links, labels, button names, iframe names, positive tabindex, and suspect clickable generic elements.
4. A manual and semi-automated queue with official Understanding URLs.
5. `/wcag-audit`, `/wcag-check`, `/wcag-fix`, `/wcag-configure`, `/wcag-report`, `/wcag-delegate`, and `/wcag-status` commands.
6. URL, file, and inline-HTML input paths.
7. JSON output designed for build pipelines and agent adapters.
8. Markdown output for pull requests and ticket descriptions.
9. HTML output with a readable findings table.
10. Baseline comparison to identify newly introduced findings.
11. CI exit codes: zero for no critical/high detection, one for critical/high evidence, two for misuse or operational failure.
12. Batch processing with per-target error isolation.
13. A local project configuration command.
14. Delegation payloads with priority, current evidence, proposal, and acceptance criteria.
15. Node built-in unit and integration tests.
16. A GitHub Actions workflow that validates package invariants.
17. A stable command and JSON contract for any host that can execute a local process.
18. A focused repository with only the CLI, runtime, tests, CI, and user documentation.

The package intentionally does not claim a 95% detection rate, “86 of 86 automatically tested,” or a universal two-second result. Those statements would need a versioned implementation, test corpus, machine profile, and methodology. The current metric is precise: the registry covers all criteria in scope, while only a subset has deterministic source evidence. The remaining criteria are labelled rather than hidden.

| Capability | This skill | axe DevTools | WAVE | Lighthouse | Pa11y |
|---|---|---|---|---|---|
| Local CLI without runtime dependency | Yes | Product-dependent | Web/extension | Browser | Node dependency |
| Explicit 86-criterion review queue | Yes | Engine-specific | Partial | Partial | Engine-specific |
| Browser-rendered rules | Adapter planned | Yes | Yes | Yes | Yes |
| Baseline regression JSON | Yes | Product-dependent | No | CI integration | Yes |
| Legal compliance certification | No | No | No | No | No |

This is not a ranking of those excellent tools. In a mature programme, use a browser engine such as axe-core or Pa11y in an adapter, validate rendered UI in Playwright, manually test representative journeys, and use this package as the cross-platform command and evidence contract. The best tool choice depends on application architecture, browser support, accessibility expertise, and the test environment.

## Install

Prerequisites are Node.js 20 or later and a project directory where the skill is allowed to read the target. Clone the repository, then run the included tests:

```bash
git clone https://github.com/tomaszboloz/WCAG-Accessibility-Skills.git
cd WCAG-Accessibility-Skills
npm test
npm run validate
node bin/wcag-skill.js configure AA 2.2
```

There are no production dependencies to install. To use it as a package command, run `npm link` during local development or execute `node bin/wcag-skill.js` directly. The configuration command writes `.wcag-skill.json` in the current project; commit it only when its shared project policy is intentional.

The npm artifact and repository intentionally contain only the executable, runtime source, tests, CI, `README.md`, `LICENSE`, and package metadata. There are no PRDs, agent-specification files, example projects, configuration presets, or secondary documentation trees to maintain.

For host integrations, run the CLI in the project sandbox, validate the command arguments, and preserve the canonical JSON unchanged. Each host must apply its own authorization boundary for file writes, network access, or ticket creation.

## Quick start

Audit an HTML fragment:

```bash
node bin/wcag-skill.js audit '<img src="product.jpg"><button></button>' --format markdown --fail-on none
```

The scanner reports a missing page language and title, an image without `alt`, an unnamed link or control where present, and a heading jump. It also emits a long manual-review list. That second list is expected: its presence means the tool refuses to treat a static pass as certification.

For JSON suitable for an artefact or API response:

```bash
node bin/wcag-skill.js audit ./page.html --level AA --version 2.2 --format json --output reports/page.json
node bin/wcag-skill.js status --report reports/page.json
```

Review one criterion before deciding whether a reported pattern applies:

```bash
node bin/wcag-skill.js check 1.4.3
```

Generate a bounded repair proposal, then let a host-authorized agent implement it:

```bash
node bin/wcag-skill.js fix WCAG-1.1.1-abc123 --report reports/page.json
node bin/wcag-skill.js delegate WCAG-1.1.1-abc123 --report reports/page.json
```

The IDs are deterministic for the same criterion, message, and evidence; copy the actual ID from the report. A `/wcag-fix` response is a proposal, not an applied patch. After an implementation change, rerun the same audit and manually verify the affected keyboard and assistive-technology behaviour. An `alt` string, for example, must reflect the image purpose in its context; no generator can decide that safely in every case.

For a simple CI gate:

```bash
wcag-audit https://staging.example.test --format json --output reports/staging.json --fail-on high
```

Use an allowlisted staging host in production CI to avoid server-side request forgery. Build systems should retain the report as an artefact, redact sensitive evidence, and treat network errors as operational failures rather than as a clean scan. If you compare reports across builds, do so in the CI system with the same WCAG version and level.

## Usage guide

`/wcag-audit` requires one target. The target may be a readable file path, a URL beginning with HTTP or HTTPS, or a literal HTML string. Its defaults are Level AA and WCAG 2.2, or the values saved by `/wcag-configure`. `--level` accepts exactly `A`, `AA`, or `AAA`; `--version` accepts exactly `2.1` or `2.2`; `--format` accepts `json`, `markdown`, or `html`; and `--output` writes the rendered representation. `--fail-on low|medium|high|critical|none` selects the CI threshold (default `high`). Malformed arguments, unknown criteria, failed reads, and timed-out fetches exit with code 2.

The severity labels prioritise remediation; they are not WCAG conformance levels and do not calculate user impact by themselves. Critical means a clear, likely blocker detected by the static rule, high means a serious programmatic barrier, and medium identifies a structural risk. A team can adjust CI policy in its wrapper, but should keep the source finding and criterion intact. Do not suppress a finding only to obtain a green build; document why a rule is inapplicable or improve the page.

`/wcag-check` returns one registry object containing its criterion title, conformance level, verification class, and W3C Understanding URL. It is useful in agent prompts: a developer can request `/wcag-check 3.3.2` before fixing an unnamed control. `/wcag-configure` validates and writes a local default scope, which later audits now load automatically.

`report` renders an existing JSON report and does not re-audit. It is useful after a CI job has stored canonical output. HTML output is a portable human-readable report; PDF conversion is intentionally delegated to the host rather than including a non-deterministic browser dependency. A published evaluation still needs scope, pages, evaluator, methods, dates, exceptions, and manual-test evidence.

`fix` reads an issue from an existing report and produces its suggested remediation, collected evidence, and required verification. It does not modify code. `delegate` produces a structured task. For critical or high issues its priority is P1; other issues are P2. The task requires a narrow implementation, a repeat audit, and human keyboard/assistive-technology review. A host can create a ticket, start a coding sub-agent, or present it to a developer. It must report task state and escalation if a re-audit still finds the issue.

Audit multiple independent pages through your own bounded CI or shell wrapper. Keep an error for an inaccessible target rather than abandoning the entire set. The correct concurrency depends on the target, network policy, and rate limit. Never scan production systems without permission; do not put credentials in URLs; and store report evidence as potentially sensitive development data.

For rich applications, a static source check is only one layer. Add a browser adapter that waits for stable rendering, include axe-core results with engine metadata, run keyboard tests through complete user journeys, inspect the accessibility tree, test zoom/reflow and touch targets, verify messages with a screen reader, and include people with disabilities in usability work. Where a tool and a person disagree, retain the evidence and investigate rather than choosing the more convenient result.

## Complete CLI reference

Every command has a chat form beginning with `/wcag-` and an equivalent shell executable without `/`: for example, `/wcag-audit` and `wcag-audit`. The compatibility form `wcag-skill audit` remains available but is not the preferred interface. A chat host must pass the tokens after the slash command to the same executable; a Unix shell cannot execute a command beginning with `/` because that denotes an absolute filesystem path.

### `/wcag-audit` / `wcag-audit`

```
/wcag-audit <target> [--level A|AA|AAA] [--version 2.1|2.2]
            [--format json|markdown|html] [--output <path>]
            [--fail-on low|medium|high|critical|none]
```

`target` is required and is exactly one URL beginning `http://` or `https://`, a readable local file path, or a literal non-empty HTML string. URL fetches time out after ten seconds. `--level` and `--version` override `.wcag-skill.json`; absent both configuration and flags, they default to `AA` and `2.2`. `--format` defaults to `json`. `--output` writes the selected representation; without it, the report goes to standard output. `--fail-on` defaults to `high`; `none` always returns zero after a successful audit, while the other values return one if at least one finding has that severity or higher. Invalid enum values, unreadable files, non-success HTTP responses, invalid configuration JSON, and empty input exit two.

Examples:

```bash
wcag-audit ./dist/index.html --level AA --version 2.2 --format markdown
wcag-audit https://staging.example.test --output reports/staging.json --fail-on critical
node bin/wcag-skill.js /wcag-audit '<html lang="en"><title>Example</title></html>' --fail-on none
```

### `/wcag-check` / `wcag-check`

```
/wcag-check <criterion>
```

`criterion` is required and must be an active WCAG 2.2 identifier present in the registry, such as `1.1.1`, `2.4.11`, or `4.1.3`. The command writes one JSON object with ID, title, conformance level, verification classification, and official W3C Understanding URL. It accepts no flags. Unknown identifiers exit two. For the WCAG 2.1-only historical criterion 4.1.1, consult the coverage matrix; the current check command intentionally exposes the active 2.2 registry.

### `/wcag-configure` / `wcag-configure`

```
/wcag-configure <level> <version>
```

Both positional arguments are required. `level` is exactly `A`, `AA`, or `AAA`; `version` is exactly `2.1` or `2.2`. The command writes `.wcag-skill.json` in the current working directory with the resolved criterion scope. Later `/wcag-audit` invocations load its level and version unless an explicit flag overrides either value. This is the only CLI command that writes project state. A malformed argument or an unwritable current directory exits two.

### `/wcag-fix` / `wcag-fix`

```
/wcag-fix <issue-id> --report <report.json>
```

`issue-id` and `--report` are both required. The report must be parseable JSON produced by the auditor and contain the exact issue ID. The result is JSON containing the evidence, criterion, proposed fix, and mandatory re-verification instruction. It never edits a file, creates a pull request, or marks a defect resolved. A missing report, malformed JSON, or non-existent issue ID exits two.

### `/wcag-report` / `wcag-report`

```
/wcag-report <report.json> [--format json|markdown|html] [--output <path>]
              [--fail-on low|medium|high|critical|none]
```

The positional report path is required. It re-renders existing canonical JSON; it does not fetch a page or repeat checks. Output and failure-threshold semantics are identical to `/wcag-audit`. This allows a CI system to generate canonical JSON once, then render it separately for a job summary or artefact. Missing or malformed report input exits two.

### `/wcag-delegate` / `wcag-delegate`

```
/wcag-delegate <issue-id> --report <report.json>
```

Inputs and error handling match `/wcag-fix`. The output is a `type: "accessibility-fix-task"` JSON payload. Critical and high findings receive `P1`; medium and low receive `P2`. The payload includes the original issue, proposed repair, re-audit acceptance criterion, and manual keyboard/assistive-technology verification. The command only constructs a task; the host decides whether it is sent to an agent, ticket tracker, or person.

### `/wcag-status` / `wcag-status`

```
/wcag-status --report <report.json>
```

`--report` is required. It prints source, generation time, finding totals, and the next action. It returns one when the report contains a critical or high finding, zero otherwise, and two for missing or malformed input. Unlike `/wcag-audit` and `/wcag-report`, status does not accept `--format`, `--output`, or `--fail-on`; it is a fixed JSON summary.

### Help, errors, and exit codes

`wcag-skill --help`, `wcag-skill -h`, or an invocation with no command prints the complete built-in help. The explicit shell commands are the recommended discovery path. Exit code `0` means the command completed and the configured audit/report threshold was not reached; `1` means an audit or rendered report contains a finding at its threshold, or status contains critical/high findings; `2` means the CLI could not validate or complete the request. Consumers must preserve code `2` as an operational failure, not downgrade it to an accessibility pass.

### Command decision guide

Use `/wcag-audit` when the input has changed or when no canonical report exists. Use `/wcag-report` when the source has not changed and the task is only to create a Markdown or HTML presentation of a previously stored JSON result. This distinction matters in CI: running an audit twice against a changing staging URL can produce two different snapshots and confuse reviewers. Create JSON once, attach it to the build, then render that same file as many times as needed.

Use `/wcag-check` before a repair when an agent needs the official criterion context. It is not an evaluator and it does not inspect a page. Use `/wcag-fix` when a developer needs the specific proposal associated with a finding. It should never be used as a blind code transformation: inspect the evidence, determine whether the finding is applicable, make the smallest semantic repair, and test the affected journey. Use `/wcag-delegate` when another person or agent owns the repair. The generated task is deliberately self-contained so it can be pasted into an issue tracker without losing the criterion, current evidence, or acceptance conditions.

Use `/wcag-configure` only at a project root. A developer who runs it in a subdirectory creates a configuration that applies only to later invocations from that directory. Teams should settle the baseline in version control or document why local configuration is intentionally ignored. Use `/wcag-status` in dashboards and release checklists; it summarizes a report but does not change its threshold. If a release policy differs from the default high/critical policy, make that decision at `/wcag-audit` or `/wcag-report` with `--fail-on` and retain the policy in the build configuration.

### Command-to-workflow recipes

**Pre-commit static check.** Audit the changed static entry point and show Markdown in the terminal. The developer fixes critical and high items immediately, then performs a focused keyboard test.

```bash
wcag-audit ./public/index.html --format markdown --fail-on high
```

**CI artefact and human review.** Generate JSON once, always upload it even when the command exits one, then render an HTML report for reviewers. A build runner must continue the artefact-upload step after exit one but stop or flag the deployment according to its policy.

```bash
wcag-audit https://staging.example.test --format json --output reports/audit.json --fail-on high
wcag-report reports/audit.json --format html --output reports/audit.html --fail-on none
wcag-status --report reports/audit.json
```

**Regression-only gate.** Keep a reviewed baseline in a protected artefact store. Produce the current report under the same scope, then compare them. A baseline is not a waiver: it identifies new evidence, while existing debt still needs a remediation plan.

```bash
wcag-audit ./dist/checkout.html --output reports/current.json --fail-on none
```

**Agent repair hand-off.** Inspect the finding, create a bounded task, allow a fixing agent to propose a patch, then independently re-audit and manually test. The fixing agent must not mark its own work as conformant based solely on a zero-issue static result.

```bash
wcag-fix WCAG-3.3.2-0123456789ab --report reports/audit.json
wcag-delegate WCAG-3.3.2-0123456789ab --report reports/audit.json
```

### Output contract and evidence handling

JSON is the canonical output and must be retained whenever a report is used for CI, an issue, an accessibility statement, or an evaluation record. It has a `schemaVersion`, ISO timestamp, source identity, selected WCAG scope, summary counts, findings, manual review queue, and disclaimer. Each finding has `id`, `criterion`, `severity`, `message`, `evidence`, and `suggestedFix`. The ID is deterministic for the same criterion, message, and evidence; it is not a global defect identity. If the source fragment changes, a new ID is expected even if the underlying user problem is related.

`evidence` can contain portions of HTML and therefore may contain names, URLs, internal identifiers, or other sensitive material from the target. Do not publish raw reports from authenticated or customer-specific environments without a data review. Prefer redacted, access-controlled CI artefacts. Never place credentials in an audit URL, in HTML supplied on a command line, or in a report committed to source control. The package sends no telemetry, but a URL audit necessarily makes a network request from the machine that runs it.

Markdown and HTML are convenience presentations. Do not parse them to implement policy. A renderer can change formatting without a schema-version change, whereas JSON consumers can enforce a known contract. The report HTML uses a simple accessible table and keeps the disclaimer visible; a host converting it to PDF is responsible for verifying the generated PDF’s tagging, reading order, language, title, and contrast.

### Severity and CI policy

Severity ranks are `critical`, `high`, `medium`, and `low`. They describe remediation urgency for the detector’s evidence; they do not change the WCAG conformance level and do not quantify impact for every disabled user. A missing `alt` is classified critical by this package because it is a clear programmatic absence. A heading jump is medium because the source pattern warrants review but context can affect its actual user impact. Teams may need a stricter policy for an authenticated checkout, a public-sector journey, or a high-risk transaction.

`--fail-on high` fails for high and critical. `--fail-on medium` also fails for medium. `--fail-on low` fails for every finding. `--fail-on critical` ignores high, medium, and low for the process status but does not remove them from the report. `--fail-on none` is for evidence collection; it never turns an operational failure into success. In every case, invalid input, URL failure, malformed report JSON, or configuration failure exits two. A CI pipeline should make exit two visibly different from exit one: one is accessibility evidence; two means no valid conclusion was produced.

### Scope, versions, and configuration examples

WCAG levels are cumulative. A includes Level A; AA includes A and AA; AAA includes all three. A Level AAA scope is not a promise that AAA is achievable or appropriate for every product. The configured version controls the criterion registry and manual-review queue. WCAG 2.1 has 78 active criteria, including 4.1.1 Parsing; WCAG 2.2 has 86 active criteria and treats 4.1.1 as obsolete. The CLI does not infer a version from a legal requirement or URL. Make that choice explicit with configuration or flags.

```bash
# Store project defaults for a normal AA, WCAG 2.2 release gate.
wcag-configure AA 2.2

# Override the project default only for this historical evaluation.
wcag-audit ./archive/page.html --version 2.1 --level A --fail-on none

# Use the saved project scope again.
wcag-audit ./dist/page.html --format json --output reports/page.json
```

The configuration file records the expanded criterion IDs for reviewability. The command currently consumes its level and version; the central rules registry remains authoritative so hand-editing the IDs does not change scanner behaviour. Treat a changed configuration as a code-review event because it changes the declared audit scope.

### Platform integration boundaries

A Claude MCP server should expose separate, typed tools for audit, criterion lookup, and delegation rather than passing arbitrary shell strings. An OpenAI Codex skill should document the same slash syntax and invoke the local CLI only in the active workspace. A Gemini function should accept a structured command object and whitelist the enum options. All three adapters should pass canonical JSON through without silently discarding manual-review items or converting a non-zero audit status into a success message.

Adapter authors should enforce path boundaries, URL allowlists, timeouts, request quotas, and file-write authorization. They should make URL fetching optional in sensitive environments, reject private or link-local address ranges where appropriate, and record engine/version metadata when adding axe-core, Pa11y, Lighthouse, or another browser runner. A platform adapter is not allowed to invent conformance status from a report. If it creates a fixing task, it must identify the task destination and leave the repair subject to the host’s write approval.

### Limits and required manual tests

Static checks cannot determine whether text alternatives are meaningful, whether contrast is sufficient after CSS and states render, whether keyboard focus is visible or obscured, whether a modal traps focus, whether captions are accurate, whether error recovery makes sense, or whether a complete purchase or authentication journey works with assistive technology. A release review must select representative pages and complete processes, test keyboard-only operation, examine the accessibility tree, test relevant screen reader/browser combinations, test zoom and reflow, test touch targets where applicable, and include expert judgement. For important user journeys, usability research with disabled participants supplies evidence a technical scan cannot produce.

The manual queue in this package is not a list of failures. It is a list of success criteria that still require an evaluation method. Record the method, pages, assistive technologies, browsers, evaluator, date, results, exceptions, and remediation plan in an evaluation report. Follow WCAG-EM for a structured website evaluation. Only an accountable evaluator with that evidence can make a conformance claim; legal compliance requires additional jurisdiction- and product-specific analysis.

### Release-readiness checklist

Before accepting a release, preserve the exact command line, Node version, rule-package version, project configuration, target list, and generated JSON report. Confirm that the audit target represents the deployed build rather than an old source directory. Review every critical and high finding; explicitly triage medium and low findings; and assign an owner and date to accepted debt. Confirm that network failures were not hidden with `--fail-on none` and that any baseline comparison used the same WCAG version, level, and rendering assumptions.

For each complete user process, test first load, validation failures, recovery, success confirmation, logout where applicable, and interrupted or expired-session behaviour. Test without a mouse, at browser zoom, with browser text scaling where supported, with reduced-motion preferences, and on narrow viewports. Verify that visible instructions agree with programmatic labels and that notifications reach assistive technology without stealing focus. Recheck translated pages, error pages, empty states, loading states, and permissions-denied states: these are common places where otherwise good component libraries lose semantic consistency.

Finally, store the human evaluation alongside the automated artefacts. A zero-issue static scan is evidence that a limited set of patterns was absent at one point in time; it is not evidence that all users can complete the service. The goal of the CLI is to make that distinction operationally easy to preserve.

## WCAG coverage

The embedded rule registry maps all active WCAG 2.2 criteria to automated, semi-automated, or manual verification. Level selection is cumulative: AA includes A, and AAA includes AA and A. WCAG 2.1 includes 78 active criteria; WCAG 2.2 includes 86 because 4.1.1 Parsing is obsolete and nine new criteria were added. The registry models this explicitly.

Automated source evidence is strongest for necessary syntactic facts. It can establish that an `img` lacks an `alt` attribute, but not whether a present alternative is meaningful. It can find an input without an associated programmatic label, but cannot establish whether its instructions are clear to a person. It can flag a positive tabindex, but only a user journey demonstrates an understandable focus order. Treat semi-automated prompts as a reviewer’s checklist, not a failure or pass by themselves.

## Architecture

The core is a local pipeline: command parser, input loader, scope registry, deterministic detectors, manual queue, and report formatter. Optional browser engines are additive; their findings must identify the engine and version, and never replace the manual queue.

## API reference

The only stable interchange is canonical JSON. Consumers should use criterion, message, and evidence to compare findings because issue IDs are local to an audit report. This prevents a regenerated report from creating misleading regressions solely because IDs changed.

## Comparison

Use this repository when a team needs a portable, inspectable command contract and wants the manual boundary made explicit. Use axe DevTools or axe-core when you need mature rendered-page rules; use WAVE when a visual overlay helps a reviewer; use Lighthouse when browser performance and accessibility feedback belong in one development workflow; and use Pa11y when a Node-based automated URL suite matches the existing pipeline. None removes the need for manual expert testing or creates legal compliance by itself.

## FAQ

1. **Does a zero-issue report mean WCAG compliant?** No. It means no implemented static rule found a matching pattern.
2. **Can it certify ADA, Section 508, EAA, or EN 301 549 compliance?** No. Consult qualified legal and accessibility professionals.
3. **Why does it list manual criteria?** To make the audit scope transparent.
4. **Why no axe-core dependency?** The base is portable; an adapter can add it.
5. **Can I audit a SPA?** Use a rendered-browser adapter for dynamic states.
6. **Can I use it in CI?** Yes; invoke `wcag-audit` and preserve JSON output.
7. **What does exit code 1 mean?** Critical or high static evidence was found.
8. **What does exit code 2 mean?** Invalid arguments or an operational error.
9. **Is a URL scan private?** No assumption is made; use controlled hosts and avoid sensitive URLs.
10. **Does it collect data?** The local package persists nothing by default.
11. **Can an agent auto-apply repairs?** Only a host with explicit write permission should do so.
12. **Why are contrast checks not fully automatic here?** Rendered CSS and visual context need a browser and review.
13. **Is WCAG 2.1 supported?** Yes, including 4.1.1 only in the 2.1 scope.
14. **How are reports versioned?** `schemaVersion` is part of JSON; releases use SemVer.
15. **Where are sources?** Each manual-review entry contains the official W3C Understanding URL for its success criterion.
16. **Which command should an AI agent call first?** Start with `/wcag-audit` when the agent has a URL, file, or HTML fragment and needs current evidence. Start with `/wcag-check` only when the agent already knows the success criterion and needs its registry metadata. The agent should store the returned JSON report, never summarize away the `manualReview` list, and ask for host authorization before it applies any proposed repair.
17. **Can `/wcag-fix` change my files automatically?** No. It intentionally returns a bounded proposal, evidence, and verification instruction only. A host may pass that output to an authorized coding agent, but the host must decide which files are in scope, show the resulting diff, re-run the audit, and retain human review for the criterion. This prevents a report renderer from becoming an unreviewed code-writing path.
18. **Why does a finding have a stable-looking ID?** The ID is a SHA-256-derived fingerprint of the criterion, message, and evidence, so identical evidence produces the same ID across equivalent audits. It is useful for `/wcag-fix`, `/wcag-delegate`, and baseline workflows. It is not a permanent database key: if the affected HTML changes, the evidence and therefore the finding ID can change too.
19. **What does `--fail-on none` do, and is it safe?** It makes a successfully completed audit return zero even when findings exist, so a pipeline can collect a report before policy enforcement is enabled. It does not suppress findings, change the report, or convert invalid input, a failed fetch, or malformed JSON into success; those remain exit code two. Use it for discovery or artefact collection, not to conceal a release decision.
20. **How should CI handle exit code 1 versus exit code 2?** Treat exit code one as valid accessibility evidence that reached your configured threshold. Upload the report and route the issue to the responsible team. Treat exit code two as an operational failure: the auditor could not form a valid conclusion because inputs, network access, configuration, or report data were invalid. A pipeline must never label exit code two as a clean accessibility pass.
21. **Does the tool crawl an entire site from one URL?** No. `/wcag-audit` handles one target per invocation. Run it from a reviewed, permissioned target list in your own CI or shell wrapper. A real website evaluation also needs representative-page selection and complete-process sampling; a URL list alone does not prove site-wide conformance.
22. **Can I scan authenticated pages?** Only if the host provides an approved, secure rendering or authentication workflow. Do not put usernames, passwords, session tokens, or signed URLs into command lines, shell history, source code, or JSON reports. The base static scanner is intentionally not an authenticated browser automation system. Build an adapter with secret management, URL allowlists, redacted logs, and short-lived credentials if that scope is needed.
23. **Why are colour contrast and focus visibility often listed for review?** The base package sees static HTML, not final computed CSS, pseudo-states, user preferences, font rendering, overlays, or animation timing. A rule that claims to decide contrast or visible focus without rendered context would create misleading results. Use a browser-based adapter for computed-style evidence, then manually inspect hover, focus, forced-colours, zoom, and interactive states.
24. **Can this replace manual screen-reader testing?** No. A screen reader presents a live accessibility tree, interaction model, announcements, and browser-specific behaviour that source inspection cannot fully predict. Test representative flows with the assistive-technology combinations used by the product’s audience, document the versions and tasks, and include keyboard-only testing. Automated evidence is a complementary early signal, not a replacement.
25. **What is the difference between automated, semi-automated, and manual coverage?** Automated means this implementation has a deterministic rule that can collect a source-level result. Semi-automated means the tool can identify relevant evidence but a person decides the outcome; a heading pattern or accessible name may still be inappropriate in context. Manual means the success criterion requires a human evaluation method. The classification is embedded in the registry and is preserved in every report.
26. **Can I claim WCAG AA conformance after the report has no findings?** No. A conformance claim requires evaluation of every applicable requirement, including manual and semi-automated work, within a defined scope. It also requires an accurate statement of pages, complete processes, technologies, exceptions, evaluator, and date. A zero-finding static report should be recorded as one input to that evaluation, never presented as a certificate.
27. **How do I add axe-core, Pa11y, or Lighthouse?** Implement an adapter outside `src/core/` that runs the selected engine against a controlled rendered page, captures its version and configuration, converts its output into additive evidence, and retains the core manual-review queue. Do not overwrite one engine’s finding with another or map a third-party rule to a WCAG criterion without documenting the mapping. Add fixtures and integration tests before using the adapter as a release gate.
28. **What should I include in a bug report for a false positive or false negative?** Provide the command and version, a minimal non-sensitive HTML example or reproducible URL, expected and actual result, criterion reference, target browser or renderer if relevant, and why the evidence is insufficient or wrong. For a false negative, explain the user impact and the test method that exposed it. Do not include credentials, personal data, or production tokens.
29. **How should teams maintain a baseline without normalising accessibility debt?** Store the baseline as a reviewed artefact with its scope, date, owner, and issue-remediation plan. Compare only like-for-like reports: same WCAG version, conformance level, target class, and engine configuration. Every baseline finding needs a tracked owner and deadline. New findings should fail immediately; existing findings remain visible until fixed rather than becoming invisible because they are old.
30. **What accessibility does the generated HTML report itself provide?** It uses a document title, semantic headings, readable text, and a findings table. It is not independently certified at WCAG AAA, especially after a host converts it to PDF or applies additional CSS. Before external distribution, audit the exact rendered report, verify keyboard navigation and reading order, and ensure any linked or embedded artefacts have accessible alternatives.

## Contributing, roadmap, and support

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Contributions must preserve traceability to official criteria and disclose each rule’s limitations. The roadmap includes a version-pinned axe-core adapter, browser fixtures, ACT-rule mapping, performance harness, optional signed report storage, and documented assistive-technology test protocols. These are planned work, not current features.

MIT permits reuse with the notices preserved; see [LICENSE](LICENSE). Copyright 2026 Tomasz Bołoz, [damtox.pl](https://www.damtox.pl). Report bugs or false positives with a minimal page, tool version, expected criterion handling, and non-sensitive evidence. For accessibility concerns in this documentation, open an issue with the interaction and assistive technology used.

> This tool aids WCAG work but does not guarantee legal compliance. Expert manual review is required before a conformance claim or certification.
