# APProva+ — beta readiness / independent audit (22 October 2026)

Status: **NO-GO for public release**. Source: PR #390 candidate SHA `6098805c1eea0ddec17c596d20414713d1cae7c6`. This document does not approve a deployment.

## Acceptance criteria for closed beta
1. **Backend isolation:** no preview/staging flow touches production DB/Auth. Verify effective env vars by target/branch without printing secret values; use fully synthetic Neon/Auth data and explicitly test write separation.
2. **Preservation:** pending diagnostics, training, mission, Portuguese and FQA mini/full exams retain raw answers, original timers and pending review after reload, delayed resume, quota failures, browser tab close, invalid JSON, duplicate sessions and transitions between app versions. No old loader may expire attempts. A rollback must not delete local work.
3. **No unsafe reset:** query parameters, user flows, stale callbacks, sign-out, account switching and diagnostics must not discard pending work.
4. **Grader quality:** Matemática A / Português / FQA honest partial credit, reasoned lost-points detail, malformed input and adversarial keyword-soup; preserve legitimate paraphrases. Independent subject expert review required.
5. **Accessibility and UX:** mobile Android, iOS PWA and desktop; screen readers, keyboard, contrast, focus, modals, label association, small viewport, loading/error states. Do not infer results from only Chromium 390x844.
6. **Cost and release:** verify total route client-bundle performance enforce, full build, CI exact SHA, no surprise automatic main deployment, safe roll-forward recovery and evidence of alias targeting.

## External auditor brief (copy verbatim)
You are an independent adversarial auditor of APProva+, Portuguese national exams app. Review GitHub PRs #385, #387, #388, #390 and #391, plus Issue #373. Candidate #390 is `6098805c1eea0ddec17c596d20414713d1cae7c6`. The staging deployment `dpl_GLAxF2PBQG6ZzydSuqnoojAgj5p3` reached READY, **but its Neon/Auth test isolation has NOT been validated; do not use real accounts or personal data**. Do not merge or deploy to production.

Prioritize severity P0/P1/P2, with: exact file/line, reproducible steps using synthetic fixtures, impact, evidence, targeted repair and regression test. Try to disprove: session durability across old/new versions, FQA draft collision and timers, pending evaluation overwrite, beta login and progress sync isolation, privacy/consent, data loss through stale reset and automatic production releases. Specifically inspect whether the newly introduced read-only recovery prototype (#391) is incomplete or gives false confidence: it is **not** an operational exporter or restorer. Test for both false positive security alarms and real loss paths. Do not report hypothetical vulnerabilities as proven. Deliver a prioritized findings table, 10 reproducible adversarial test scenarios, top 3 launch blockers and a plain GO/NO-GO conclusion. Provide links to evidence.

## Release decisions
- Closed test with friends needs isolated synthetic backend plus reproducible journey / persistence gate.
- 'Practically final' requires early real-user feedback and teacher review, not merely CI green.
- Hold #390 and #391 as Draft until resolved.
