# APProva+ — Non-regression policy

This policy is a standing engineering rule for the project.

## Principle
A green build is necessary but not sufficient. A change is complete only when the relevant user-visible behaviour, academic invariants, performance and deployment assumptions have been checked against the correct metric or oracle.

## Required workflow
1. Define acceptance criteria before implementation.
2. Identify the real user-facing metric/invariant being protected; do not substitute a convenient proxy without justification.
3. Implement on a branch and validate with focused tests/audits.
4. Run the full CI gate before merge.
5. Inspect the result, not just the exit code. Confirm the test/gate actually exercised the intended path and metric.
6. Do not merge while a relevant regression is known, hidden, waived or merely relabelled.

## Performance
- Performance budgets must enforce the total client payload that the browser actually downloads for the route, including shared client chunks where applicable.
- Page-only or isolated chunk sizes may be reported diagnostically but must not replace the route-level browser payload budget.
- Do not raise a budget just to make CI pass.
- A budget may be changed only when the product owner explicitly accepts a justified new baseline or when the measured architecture changes in a way that makes the old metric invalid.
- When a regression is detected, identify the chunks/dependencies responsible and reduce the regression or document an explicit trade-off before merge.

## Cross-subject parity
For shared APProva+ UX, navigation, layout, session rules, answer flow, review flow and common components, changes must be checked across Matemática A, Português and FQ A unless the feature is intentionally subject-specific.

## Assessment/correction engines
- Keep deterministic or explicit rubric oracles where available.
- Calibration must include correct, partially correct, vague, contradictory, paraphrased, typo-bearing and adversarial responses.
- Do not make a failing calibration green by weakening expected outcomes without evidence.
- When correcting a false positive/negative, add a regression case so the failure cannot silently return.

## CI and tests
- Never delete or bypass a valid failing test to obtain a green build.
- Never weaken a threshold, assertion or fixture solely to make CI pass.
- Prefer adding a regression test for every fixed defect with a stable reproduction.
- If a gate prints both a proxy and a real user metric, enforce the real user metric.
- A CI job that did not execute the relevant test is not evidence that the change is safe.

## Deployment and cost
- Heavy audits/calibration belong in GitHub CI or local tooling, not in every Vercel deployment.
- Automatic Vercel deployments should remain limited to production-worthy integration, with `main` as the normal production source.
- Do not add paid services or increase recurring infrastructure spend without explicit approval.

## Merge rule
A PR may be merged under standing authorization only when:
- required CI is green;
- the relevant regression checks are known to have actually run;
- no known product, academic, performance or reliability regression remains unresolved;
- no threshold/baseline was relaxed merely to obtain green status;
- any shared UX change has been checked for cross-subject parity;
- the change stays within the previously authorized product/cost/privacy/legal boundaries.

If these conditions are not satisfied, keep the PR open and fix the underlying problem.
