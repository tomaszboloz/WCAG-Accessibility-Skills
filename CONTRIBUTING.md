# Contributing

Open an issue with the affected success criterion, a minimal reproducible page, expected result, and the relevant W3C reference. Do not mark a criterion as automatically testable without documenting the deterministic evidence it can collect and its known false-positive/false-negative boundaries.

Run `npm test && npm run validate` before opening a pull request. Keep changes small, add a test for scanner behavior, and update `docs/wcag-coverage.md` whenever verification classification changes. Contributions are licensed under MIT.
