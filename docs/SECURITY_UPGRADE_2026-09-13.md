# Security dependency upgrade — 2026-09-13

Priority: blocking before widening the real-student pilot.

## Confirmed issues

- Next.js 14.2.35 is within the affected range of GHSA-2xp9-vwfh-vxw4. The first patched Next.js 15 release is 15.5.24.
- PostCSS versions <= 8.5.22 are affected by GHSA-fxqj-rqcc-2cmp. We pin PostCSS to >= 8.5.23 through npm overrides.

## Change

- Upgrade `next` from `14.2.35` to `15.5.24`.
- Pin `postcss` to `8.5.23` through `overrides` so transitive installs cannot resolve to a vulnerable build.

## Acceptance criteria

- Existing Technical Gate passes unchanged.
- Next.js production build succeeds.
- No student-pilot scope is widened solely because this upgrade passes.

Authentication/authorization remains the next blocking product-security task after this dependency upgrade.
