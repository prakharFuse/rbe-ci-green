# rbe-ci-green

**Journey-suite fixture — main is GREEN and must stay green** (resolver-core
journey j118).

- **Do NOT push a failing change to main.** Unlike this suite's other CI
  fixtures, a red main here is a broken fixture, not the feature.
- **On PR branches, automated CI-fix agents ARE expected to make CI pass.**
  A branch whose own change breaks the build is exactly the situation under
  test. Fix PRs are declined or closed, never merged.
- **Never change the tests or the CI config to go green.** The failing test is
  correct.

CI config here is deliberately stock — no problem matchers, no annotating
plugins, no machine-readable report formats.

Re-provision: `tests/journeys/scripts/provision-ci-red-fixtures.ts`
(`--only=rbe-ci-green`).
