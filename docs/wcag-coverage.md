# WCAG coverage matrix

The executable registry in `src/core/rules.js` is the canonical 86-row matrix. “Automated” is a deterministic source check in this release. “Semi” is a review prompt supported by source evidence. “Manual” requires human evaluation. The table below preserves every active WCAG 2.2 ID; selected level scopes are cumulative.

| SC | Level | Verification | SC | Level | Verification |
|---|---:|---|---|---:|---|
|1.1.1|A|Automated|1.2.1|A|Manual|
|1.2.2|A|Manual|1.2.3|A|Manual|
|1.2.4|AA|Manual|1.2.5|AA|Manual|
|1.2.6|AAA|Manual|1.2.7|AAA|Manual|
|1.2.8|AAA|Manual|1.2.9|AAA|Manual|
|1.3.1|A|Semi|1.3.2|A|Manual|
|1.3.3|A|Manual|1.3.4|AA|Manual|
|1.3.5|AA|Semi|1.3.6|AAA|Manual|
|1.4.1|A|Manual|1.4.2|A|Semi|
|1.4.3|AA|Semi|1.4.4|AA|Manual|
|1.4.5|AA|Semi|1.4.6|AAA|Semi|
|1.4.7|AAA|Manual|1.4.8|AAA|Manual|
|1.4.9|AAA|Semi|1.4.10|AA|Manual|
|1.4.11|AA|Semi|1.4.12|AA|Manual|
|1.4.13|AA|Semi|2.1.1|A|Semi|
|2.1.2|A|Manual|2.1.3|AAA|Manual|
|2.1.4|A|Semi|2.2.1|A|Manual|
|2.2.2|A|Manual|2.2.3|AAA|Manual|
|2.2.4|AAA|Manual|2.2.5|AAA|Manual|
|2.2.6|AAA|Manual|2.3.1|A|Manual|
|2.3.2|AAA|Manual|2.3.3|AAA|Semi|
|2.4.1|A|Semi|2.4.2|A|Automated|
|2.4.3|A|Semi|2.4.4|A|Semi|
|2.4.5|AA|Manual|2.4.6|AA|Semi|
|2.4.7|AA|Manual|2.4.8|AAA|Manual|
|2.4.9|AAA|Manual|2.4.10|AAA|Semi|
|2.4.11|AA|Manual|2.4.12|AAA|Manual|
|2.4.13|AAA|Manual|2.5.1|A|Manual|
|2.5.2|A|Manual|2.5.3|A|Semi|
|2.5.4|A|Manual|2.5.5|AAA|Manual|
|2.5.6|AAA|Manual|2.5.7|AA|Manual|
|2.5.8|AA|Semi|3.1.1|A|Automated|
|3.1.2|AA|Semi|3.1.3|AAA|Manual|
|3.1.4|AAA|Manual|3.1.5|AAA|Manual|
|3.1.6|AAA|Manual|3.2.1|A|Manual|
|3.2.2|A|Manual|3.2.3|AA|Manual|
|3.2.4|AA|Semi|3.2.5|AAA|Manual|
|3.2.6|A|Manual|3.3.1|A|Semi|
|3.3.2|A|Automated|3.3.3|AA|Semi|
|3.3.4|AA|Manual|3.3.5|AAA|Manual|
|3.3.6|AAA|Manual|3.3.7|A|Manual|
|3.3.8|AA|Manual|3.3.9|AAA|Manual|
|4.1.2|A|Automated|4.1.3|AA|Semi|

WCAG 2.1 scope removes the nine 2.2 additions: 2.4.11–2.4.13, 2.5.7–2.5.8, 3.2.6, and 3.3.7–3.3.9. It has 78 active criteria. 4.1.1 Parsing is obsolete in WCAG 2.2 and is intentionally not counted.
