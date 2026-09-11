---
name: architecture
description: CI flow for the config-drift check (npm test -> manifest comparison)
type: knowledge
scope: global
updated: '2026-09-11'
captured_sha: 1df2aa2025345dd186b18f86d9570aa7a018da6a
sources:
  - .github/workflows/ci.yml
  - package.json
  - tests/config-manifest.test.js
  - src/config.js
  - config-keys.manifest
sources_sha256:
  .github/workflows/ci.yml: c7272d9bd2076dd506ddac2de01e74f8031b165a1fe0949e282f2b8e68f4e1c7
  config-keys.manifest: a41aad4c827abf34ed606e99300554a197016610fdc7328d0ec53d33fbb5c0c3
  package.json: 41cb79628dead978c554f40a6f08e34c84803c154833577bafd05f00eff2b7b1
  src/config.js: 1b643e20bf456ebadd644afd5012e7dd582a63a8f96d64e4563b25f2a17035f9
  tests/config-manifest.test.js: cb31dc6b374214b9c6530ce8b543a8b49af55df28a6a3ef7b421a0bc2da3ddbd
---

```mermaid
flowchart LR
  A[push / pull_request] --> B[ci.yml: test job\nnode 20, 5min timeout]
  B --> C[npm test\nnode --test]
  C --> D[tests/config-manifest.test.js]
  D -- reads --> E[src/config.js\nexport const NAMES]
  D -- reads --> F[config-keys.manifest\nNAMES, one per line]
  D -- compares sets --> G{exported == recorded?}
  G -- yes --> H[CI green]
  G -- no --> I[CI red: missing or stale keys reported]
```

There is no server, database, or runtime beyond the test process — `npm test`
*is* the product. The only data flow that matters is the two-file diff done
by `tests/config-manifest.test.js`: it regex-parses `export const` names out
of `src/config.js` and diffs that set against the non-comment, non-blank
lines of `config-keys.manifest`, failing on either a missing or a stale
entry.
