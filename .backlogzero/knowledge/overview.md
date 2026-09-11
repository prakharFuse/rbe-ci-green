---
name: overview
description: What rbe-ci-green is and why its CI is deliberately built to break
type: knowledge
scope: global
updated: '2026-09-11'
captured_sha: 1df2aa2025345dd186b18f86d9570aa7a018da6a
sources:
  - package.json
  - src/config.js
  - config-keys.manifest
  - tests/config-manifest.test.js
  - README.md
  - .github/workflows/ci.yml
sources_sha256:
  .github/workflows/ci.yml: c7272d9bd2076dd506ddac2de01e74f8031b165a1fe0949e282f2b8e68f4e1c7
  README.md: e66ee402f3a39dc56fa8493058181025fbe386a586806a5b11bb0016d8dcba02
  config-keys.manifest: a41aad4c827abf34ed606e99300554a197016610fdc7328d0ec53d33fbb5c0c3
  package.json: 41cb79628dead978c554f40a6f08e34c84803c154833577bafd05f00eff2b7b1
  src/config.js: 1b643e20bf456ebadd644afd5012e7dd582a63a8f96d64e4563b25f2a17035f9
  tests/config-manifest.test.js: cb31dc6b374214b9c6530ce8b543a8b49af55df28a6a3ef7b421a0bc2da3ddbd
---

This repo is a **test fixture**, not a product. It exists so that CI-fix
agents can be exercised against a repo where `main` is green and a PR breaks
CI through its own change. See `README.md` for the full framing.

The whole "application" is a config-drift check:
- `src/config.js` exports three constants: `API_BASE_URL`, `REQUEST_TIMEOUT_MS`,
  `MAX_PAGE_SIZE`.
- `config-keys.manifest` lists the same three names, one per line.
- `tests/config-manifest.test.js` parses both (`export const (\w+)` regex vs.
  manifest lines) and fails if either side has a name the other lacks.
- CI (`.github/workflows/ci.yml`) runs `npm test` (`node --test`) on push and
  PR, Node 20, 5-minute timeout. No special reporters or problem matchers.

At HEAD, `src/config.js` and `config-keys.manifest` agree, so `npm test`
passes. The intended failure mode for this fixture is a PR that edits one
side (e.g. adds/renames an export) without updating the other, which fails
`tests/config-manifest.test.js`.

See [[ci-fixture-rules]] for the hard constraints on what may and may not be
changed when working in this repo.
