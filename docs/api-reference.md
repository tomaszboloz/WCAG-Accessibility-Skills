# API reference

## JavaScript API

```js
const { loadInput, scanHtml, criteriaFor, markdown, html } = require('wcag-accessibility-skills');
const input = await loadInput('page.html');
const report = scanHtml(input.html, { source: input.source, version: '2.2', level: 'AA' });
```

`scanHtml(html, options)` accepts non-empty HTML and options `{source, version, level}`. Version is `2.1` or `2.2`; level is `A`, `AA`, or `AAA`. It returns the canonical report schema. `criteriaFor(level, version)` returns the active cumulative criterion scope. `markdown(report)` and `html(report)` render non-canonical exports.

## Report schema

`schemaVersion`, `generatedAt`, `source`, `wcag`, `summary`, `issues`, `manualReview`, and `disclaimer` are always present. Each issue includes an unstable report-local ID, criterion ID, severity, message, evidence, and suggested fix. Consumers must key regression comparisons on criterion/message/evidence, not the random issue ID.

## Adapter contract

```json
{"command":"audit","input":"https://example.test","options":{"version":"2.2","level":"AA","format":"json"}}
```

Adapters validate enum values before invoking the core. Errors are structured by the host, retain the message, and map to CLI exit code 2. A fixing agent receives the `/delegate` payload and must re-audit before it marks work complete.
