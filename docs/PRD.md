# Product Requirements Document — WCAG Accessibility Auditor Skill

## Executive Summary

WCAG Accessibility Auditor Skill is a portable command skill for development teams that need repeatable evidence about accessibility while retaining the expert judgement that WCAG requires. It accepts a URL, local HTML file, or inline HTML; identifies deterministic defects; maps the audit scope to active WCAG 2.1 or 2.2 success criteria at level A, AA, or AAA; and produces JSON, Markdown, or HTML evidence. The package also exposes a standard delegation payload so an agent can fix a bounded finding and re-run the same check.

The intended users are frontend developers working before code review, accessibility specialists triaging a release, QA engineers adding a non-regression gate, and product managers who need a transparent status rather than a misleading “accessible” badge. The primary outcome is faster detection of evidence-based failures such as absent text alternatives, unnamed controls, absent document language, empty page titles, and positive tabindex. It does not purport to determine every WCAG outcome from source alone.

Success is measured as: a valid registry of all 86 active WCAG 2.2 criteria and all 78 active WCAG 2.1 criteria; deterministic scanner results reproducible for the same input; command validation that rejects invalid versions and conformance levels; and CI output that fails on configured critical or high findings. Performance goals are targets, measured in an instrumented environment: under 2 seconds for a cached single-page static scan and under 30 seconds for ten independent static pages, excluding network transfer and manual review. The product never claims legal compliance. A release conformance decision requires an expert review of the manual and semi-automated queue, keyboard testing, and assistive-technology testing.

## Problem Statement

Existing linters, browser scanners, and hosted services are useful but often provide fragmented criterion references, inconsistent evidence, and no portable interface for agent workflows. Automated tooling can identify patterns, not human meaning, visual perception in every context, cognitive load, or a usable keyboard journey. Treating an automation score as an accessibility certification creates legal and user harm. Teams need an interface that makes automated findings quick to act on and makes the unautomated remainder impossible to ignore.

## Goals and Success Metrics

| Goal | Measure | Acceptance method |
|---|---|---|
| Complete normative scope | 86 active 2.2 / 78 active 2.1 IDs | unit registry test |
| Deterministic automated findings | same source yields same criterion/message/evidence | scanner unit tests |
| Useful local feedback | static scan target under 2 s | benchmark with documented hardware |
| CI safety | critical/high result exits 1 | CI integration test |
| Transparent coverage | every in-scope criterion classified | coverage matrix review |
| No false certification | disclaimer emitted in every report | report test and review |

Detection-rate and accuracy claims require a public labelled corpus, version-pinned engine, and published false-positive/false-negative protocol; this repository makes none until that study exists.

## User Personas

| Persona | Need | Pain point |
|---|---|---|
| Frontend developer | immediate, actionable code evidence | a generic accessibility score does not say what to change |
| Accessibility specialist | traceable criterion and review queue | tools conceal manual checks behind a green result |
| QA engineer | stable machine-readable CI output | regressions are hard to compare across builds |
| Product manager | risk status with limits | “100% compliant” claims are not defensible |

## Functional Requirements

### Core features

1. Audit URL, file, or inline HTML and return severity, criterion, evidence, and proposed repair.
2. Resolve criteria by WCAG version and cumulative conformance level.
3. List manual and semi-automated work in each report.
4. Render JSON, Markdown, and HTML reports; JSON is the canonical interchange format.
5. Compare an audit to a baseline and fail CI only for newly introduced high/critical findings.

### Command interface

| Command | Required input | Optional input | Result | Invalid input |
|---|---|---|---|---|
| `/audit` | URL, file, or HTML | level, version, format, output | report | exit 2 |
| `/check` | active criterion ID | level/version context | registry entry | exit 2 |
| `/fix` | issue ID and report | — | repair proposal | exit 2 |
| `/configure` | level, version | — | `.wcag-skill.json` | exit 2 |
| `/report` | report JSON | format | rendered report | exit 2 |
| `/delegate` | issue ID and report | — | task payload | exit 2 |
| `/status` | report JSON | — | audit summary | exit 2 |

Commands are exposed as `wcag-skill`; chat platforms translate slash syntax to the same structured payload. Read-only operations need no special permission. `configure` writes only the local project configuration. Applying a proposed repair or sending a delegation requires the host platform’s normal file/write permission. URL fetching uses a ten-second timeout; hosts should add allowlists, queue limits, and per-tenant rate limits.

### Integration points and configuration

Adapters consume the canonical `{ command, input, options }` request and return the JSON report or delegation task. Claude MCP exposes tools, Codex exposes a skill plus CLI, and Gemini exposes function declarations. Webhooks are optional: a host may publish the final JSON report to a build system after redacting source evidence. Configurations reside in `configs/` and resolve to the central registry; a project override is `.wcag-skill.json`.

## Technical Requirements

The initial runtime is Node.js 20 with no production dependency. It is API-first at the module boundary rather than a network microservice: `input → audit orchestrator → rule evidence → report formatter`. An optional adapter can call axe-core, Pa11y, Lighthouse, or a browser runner, but their findings must retain engine/version metadata and must not overwrite manual classifications. JSON Schema-compatible report fields are stable under semantic versioning.

The scanner has a 10-second HTTP timeout. No input is stored by default. If a host persists reports, it must obtain a retention policy, minimize snippets, secure access, and honour deletion requests. Security controls for a hosted service include SSRF-safe URL allowlists, authentication, encrypted storage, secret-free logs, dependency scanning, and rate limits.

## WCAG Coverage Matrix

`docs/wcag-coverage.md` is the source matrix. Every active criterion is in scope at the selected level. “Automated” means this package has a deterministic source check; “semi-automated” means it can flag evidence but a person decides; “manual” means human testing is required. WCAG 2.2 has 86 active criteria because 4.1.1 Parsing is obsolete and nine new 2.2 criteria are included.

## Testing Strategy

Unit tests assert registry integrity, version boundaries, parser detection, and invalid input. Integration tests invoke the CLI and validate JSON. E2E browser tests, axe-core comparisons, keyboard paths, screen-reader checks, and generated-report testing are planned adapter-level tests; they require a browser fixture and assistive-technology test protocol. Code coverage may be reported only after a coverage provider is configured; the repository does not invent a percentage.

## Deployment and Maintenance

CI runs Node 20 tests, package invariant validation, and a sample audit. Releases follow SemVer: major for incompatible commands/schemas, minor for compatible capabilities or WCAG mapping additions, patch for corrections. Monthly minor releases and weekly patches are targets, not a release guarantee. Previous major versions receive security fixes for twelve months only when an LTS policy is formally announced.

## Documentation Requirements

`README.md` is the user entry point. `docs/api-reference.md`, `docs/user-guide.md`, and `docs/developer-guide.md` document contracts and extension work. Reports include the normative scope, findings, manual-review queue, source, date, and disclaimer. `docs/wcag-em-template.md` provides a report outline aligned to WCAG-EM; it is not a completed evaluation by itself.

## Risk Assessment and Glossary

The critical risk is overclaiming: automated evidence is not certification. Mitigations are immutable manual-review output, criterion URLs, explicit severity policy, and a required human sign-off. “Conformance claim” has the meaning defined by WCAG; “finding” is evidence collected by this tool; “manual review” is an expert decision using representative pages, browsers, input methods, and assistive technology. See `sources.md` for normative and implementation references.
