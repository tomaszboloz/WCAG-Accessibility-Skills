# Changelog

All notable changes follow Semantic Versioning.

## 1.1.1 — 2026-09-18

- Replace invalid numeric W3C Understanding URLs with verified official slugs for all 86 active WCAG 2.2 criteria.
- Correct WCAG 2.2 levels for 2.4.10 Section Headings and 2.5.6 Concurrent Input Mechanisms, restoring the Level AA scope to 55 criteria.
- Escape report-controlled values in HTML output and apply a restrictive Content Security Policy to prevent report XSS.
- Enforce LF line endings for tracked files and verify them in CI.

## 1.1.0 — 2026-09-17

- Add root `SKILL.md` adapter for Codex skill discovery and portable agent routing.
- Document every `/wcag-*` command, report boundary, exit-code semantics, and authorized repair workflow in the adapter.

## 1.0.0 — 2026-09-17

- Initial portable WCAG 2.1/2.2 command skill.
- Dependency-free static scanner, criterion registry, reports, baseline comparison, and CI wrapper.
- Claude MCP, OpenAI Codex, and Gemini adapter contracts.
