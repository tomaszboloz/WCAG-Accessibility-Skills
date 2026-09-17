# Sources

Accessed 2026-09-17. These are authoritative specification, tool, platform, legal, and research references. Each item includes its relevance and a practical takeaway; verify current legal obligations with qualified counsel and the current official publication.

## W3C and WAI

1. **Web Content Accessibility Guidelines (WCAG) 2.2** — https://www.w3.org/TR/WCAG22/ — Normative criterion source. Takeaway: evaluate active success criteria at the selected level.
2. **Web Content Accessibility Guidelines (WCAG) 2.1** — https://www.w3.org/TR/WCAG21/ — Normative 2.1 baseline. Takeaway: preserve version-specific scope.
3. **Understanding WCAG 2.2** — https://www.w3.org/WAI/WCAG22/Understanding/ — Criterion intent and examples. Takeaway: tests need human interpretation.
4. **Techniques for WCAG 2.2** — https://www.w3.org/WAI/WCAG22/Techniques/ — Sufficient and advisory techniques. Takeaway: techniques are implementation evidence, not guarantees.
5. **WCAG 2.2 Quick Reference** — https://www.w3.org/WAI/WCAG22/quickref/ — Filterable criterion index. Takeaway: record level and technology assumptions.
6. **WCAG 2.1 Understanding** — https://www.w3.org/WAI/WCAG21/Understanding/ — 2.1 rationale. Takeaway: use the matching version explanation.
7. **WCAG 2.1 Techniques** — https://www.w3.org/WAI/WCAG21/Techniques/ — 2.1 techniques. Takeaway: map evidence to a stable reference.
8. **WCAG 2.1 Quick Reference** — https://www.w3.org/WAI/WCAG21/quickref/ — 2.1 index. Takeaway: avoid mixing 2.2 additions into 2.1 claims.
9. **WCAG 2 Overview** — https://www.w3.org/WAI/standards-guidelines/wcag/ — Version relationship. Takeaway: WCAG is a family of standards.
10. **WCAG 2 Conformance** — https://www.w3.org/TR/WCAG22/#conformance — Normative conformance requirements. Takeaway: a tool output alone is not a claim.
11. **WCAG-EM 1.0** — https://www.w3.org/TR/WCAG-EM/ — Evaluation methodology. Takeaway: define scope and sample before reporting.
12. **WCAG-EM Report Tool** — https://www.w3.org/WAI/eval/report-tool/ — Report guidance. Takeaway: document evaluator and limitations.
13. **ARIA Authoring Practices Guide** — https://www.w3.org/WAI/ARIA/apg/ — Widget patterns. Takeaway: native semantics first, tested APG patterns when needed.
14. **WAI-ARIA 1.2** — https://www.w3.org/TR/wai-aria-1.2/ — Roles, states, and properties. Takeaway: name, role, and value are programmatic contracts.
15. **Accessible Rich Internet Applications** — https://www.w3.org/WAI/standards-guidelines/aria/ — ARIA overview. Takeaway: ARIA supplements, not replaces, HTML.
16. **WAI Tutorials** — https://www.w3.org/WAI/tutorials/ — Practical patterns. Takeaway: test keyboard and screen-reader behaviour.
17. **Easy Checks** — https://www.w3.org/WAI/test-evaluate/preliminary/ — Early review checks. Takeaway: use automated checks as a starting point.
18. **Accessibility Statements** — https://www.w3.org/WAI/planning/statements/ — Statement guidance. Takeaway: make claims precise and maintainable.
19. **Accessibility Evaluation Resources** — https://www.w3.org/WAI/test-evaluate/ — Evaluation methods. Takeaway: combine tools and expert review.
20. **W3C Internationalization language declarations** — https://www.w3.org/International/questions/qa-html-language-declarations — `lang` guidance. Takeaway: page language is machine-readable metadata.

## Tools and engineering

21. **axe-core GitHub** — https://github.com/dequelabs/axe-core — Rule-engine source. Takeaway: pin engine versions and retain rule IDs.
22. **axe-core API documentation** — https://github.com/dequelabs/axe-core/blob/develop/doc/API.md — API contract. Takeaway: capture engine configuration in reports.
23. **Deque axe DevTools** — https://www.deque.com/axe/devtools/ — Commercial browser workflow. Takeaway: browser automation complements source scanning.
24. **Pa11y documentation** — https://pa11y.org/ — Automated accessibility runner. Takeaway: use representative URL sets.
25. **Pa11y CI** — https://github.com/pa11y/pa11y-ci — CI configuration. Takeaway: compare builds against a baseline.
26. **WAVE Web Accessibility Evaluation Tool** — https://wave.webaim.org/ — Visual evaluation aid. Takeaway: human review remains central.
27. **WAVE API** — https://wave.webaim.org/api/ — Service integration reference. Takeaway: protect API keys and respect terms.
28. **Lighthouse accessibility audits** — https://developer.chrome.com/docs/lighthouse/accessibility/ — Browser audit documentation. Takeaway: report the browser/version and limitations.
29. **Chrome DevTools accessibility** — https://developer.chrome.com/docs/devtools/accessibility/reference — Inspector reference. Takeaway: inspect accessibility trees, not source alone.
30. **Playwright accessibility testing** — https://playwright.dev/docs/accessibility-testing — E2E integration. Takeaway: pair scan results with interaction tests.
31. **MDN Accessibility** — https://developer.mozilla.org/en-US/docs/Web/Accessibility — Web platform guidance. Takeaway: semantic HTML gives the strongest default.
32. **MDN ARIA** — https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA — ARIA usage. Takeaway: incorrect ARIA can degrade accessibility.
33. **Web Platform Tests accessibility** — https://github.com/web-platform-tests/wpt — Interoperability corpus. Takeaway: browser differences must be tested.
34. **HTML Standard** — https://html.spec.whatwg.org/ — Semantic element definitions. Takeaway: prefer native controls.
35. **Tenon API documentation** — https://tenon.io/documentation/understanding-the-tenantest-api/ — Optional engine. Takeaway: external findings need provenance.

## Law and policy

36. **ADA.gov guidance on web accessibility** — https://www.ada.gov/resources/web-guidance/ — US civil-rights context. Takeaway: legal obligations are context-specific.
37. **ADA Title III** — https://www.ada.gov/law-and-regs/title-iii-regulations/ — Public accommodation regulation. Takeaway: seek legal advice for applicability.
38. **Section 508 standards** — https://www.section508.gov/manage/laws-and-policies/ — US federal ICT rules. Takeaway: test against the procurement standard in force.
39. **Revised Section 508 standards** — https://www.access-board.gov/ict/ — Technical standard source. Takeaway: WCAG mappings do not replace scope analysis.
40. **European Accessibility Act Directive 2019/882** — https://eur-lex.europa.eu/eli/dir/2019/882/oj — EU directive. Takeaway: national transposition controls duties.
41. **EN 301 549** — https://www.etsi.org/deliver/etsi_en/301500_301599/301549/ — ICT accessibility standard. Takeaway: use the edition required by contract/law.
42. **EU Web Accessibility Directive 2016/2102** — https://eur-lex.europa.eu/eli/dir/2016/2102/oj — Public-sector rule. Takeaway: monitoring and statement duties may apply.
43. **UK accessibility regulations** — https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps — UK public-sector guidance. Takeaway: publish and maintain an accessibility statement.
44. **US Access Board standards** — https://www.access-board.gov/ — Standards authority. Takeaway: track referenced-rule revisions.

## AI platform contracts

45. **Model Context Protocol specification** — https://modelcontextprotocol.io/specification — Tool protocol. Takeaway: define explicit tool inputs and outputs.
46. **Anthropic MCP documentation** — https://docs.anthropic.com/en/docs/mcp — Claude integration. Takeaway: host authorization governs writes.
47. **Anthropic tool use** — https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview — Structured tool calls. Takeaway: validate tool arguments.
48. **Anthropic computer use** — https://docs.anthropic.com/en/docs/agents-and-tools/computer-use — Browser interaction boundaries. Takeaway: require human safeguards for consequential actions.
49. **OpenAI function calling** — https://platform.openai.com/docs/guides/function-calling — Tool schema design. Takeaway: JSON schemas constrain command inputs.
50. **OpenAI tools** — https://platform.openai.com/docs/guides/tools — Tool orchestration. Takeaway: retain audit evidence across calls.
51. **OpenAI Agents SDK** — https://openai.github.io/openai-agents-js/ — Agent implementation. Takeaway: make delegation status observable.
52. **Gemini function calling** — https://ai.google.dev/gemini-api/docs/function-calling — Gemini tool contract. Takeaway: use typed arguments and error responses.
53. **Gemini API documentation** — https://ai.google.dev/gemini-api/docs — Platform reference. Takeaway: isolate platform adapters from core rules.

## Research and evidence

54. **WebAIM Million** — https://webaim.org/projects/million/ — Annual home-page study. Takeaway: use its methodology/date with any statistic.
55. **WebAIM screen reader survey** — https://webaim.org/projects/screenreadersurvey10/ — User evidence. Takeaway: assistive technology behaviour needs real-user context.
56. **W3C Accessibility Conformance Testing (ACT) Rules Format** — https://www.w3.org/TR/act-rules-format/ — Rule interoperability. Takeaway: tests must state applicability and expectations.
57. **ACT Rules Community** — https://www.w3.org/WAI/standards-guidelines/act/rules/ — Published rules. Takeaway: machine rules have scoped assumptions.
58. **Accessibility Support database** — https://a11ysupport.io/ — Assistive-technology compatibility data. Takeaway: test target browser/AT combinations.
59. **Deque automated testing limitations** — https://www.deque.com/axe/core-documentation/api-documentation/ — Tool boundary context. Takeaway: no scanner covers all barriers.
60. **W3C Accessibility Maturity Model** — https://www.w3.org/TR/maturity-model/ — Organisational practice. Takeaway: sustainable accessibility includes governance and process.
