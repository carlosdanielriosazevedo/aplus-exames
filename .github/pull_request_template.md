## What changed

<!-- Summarize the change and why it is needed. -->

## Non-regression checklist

- [ ] Acceptance criteria were defined before implementation.
- [ ] Relevant focused tests/audits were run.
- [ ] Full required CI gate is green.
- [ ] I verified the relevant gate actually exercised the intended behaviour/metric; green status alone is not being treated as proof.
- [ ] No valid failing test, threshold, assertion or fixture was removed/weakened merely to obtain green CI.
- [ ] Performance changes are checked against the real route/browser payload; page-only chunks are diagnostic only.
- [ ] Performance budgets were not raised merely to make CI pass.
- [ ] Shared UX/flow changes were checked across Matemática A, Português and FQ A, unless intentionally subject-specific.
- [ ] Fixed defects have a regression test/audit case where a stable reproduction is possible.
- [ ] No known product, academic, performance, reliability or accessibility regression remains unresolved.
- [ ] No paid service, recurring-cost increase, new personal-data collection, credential change or legal/licensing boundary was crossed without explicit approval.

## Evidence

<!-- List commands/checks run and the important result(s). -->

## Known limitations / follow-up

<!-- State anything not validated or intentionally deferred. -->

> Standing policy: see `docs/non-regression-policy.md`. A PR must not be merged by relaxing a real regression guard just to make CI green.
