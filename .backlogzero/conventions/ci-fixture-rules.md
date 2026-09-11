---
name: ci-fixture-rules
description: Hard constraints for this repo — read before touching tests, CI config, or main
type: convention
scope: global
updated: '2026-09-11'
captured_sha: 1df2aa2025345dd186b18f86d9570aa7a018da6a
sources:
  - README.md
sources_sha256:
  README.md: e66ee402f3a39dc56fa8493058181025fbe386a586806a5b11bb0016d8dcba02
---

This repo is a journey-suite fixture (resolver-core journey j118) for testing
automated CI-fix agents. The rules below are load-bearing for the fixture's
purpose, not ordinary style preferences — see `README.md`.

- **Never push a failing change to `main`.** A red `main` here means the
  fixture itself is broken, not that a feature is "in progress."
- **On PR branches, a failing build caused by the PR's own change is the
  intended scenario**, not a bug to route around. CI-fix agents are expected
  to fix the underlying drift (bring `src/config.js` and
  `config-keys.manifest` back into agreement) — never to weaken the check.
- **Never edit `tests/config-manifest.test.js` or `.github/workflows/ci.yml`
  to make CI pass.** The test and the stock CI config are correct by
  construction; changing them to go green defeats the fixture.
- Fix PRs that follow the intended path (correcting the config/manifest drift
  itself) are declined or closed rather than merged — this is a fixture, not
  a repo that accumulates history.

See [[overview]] for what the config/manifest check actually verifies.
