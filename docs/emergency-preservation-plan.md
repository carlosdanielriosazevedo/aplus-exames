# APProva+ — emergency preservation and controlled release plan
Status: DESIGN ONLY / NO-GO. No emergency recovery executable or recovery deployment exists.
Base: PR #388 head 29518d11661012cc712f4684f78eb1265edf296c, application behavior unchanged.

## Threat and boundaries
- A defect in #387 (UI/feedback) may be corrected by roll-forward to the pinned #385-safe baseline, **only after** checking changes made since its preparation.
- A defect in #385 itself **cannot** be fixed by this baseline. Produce a targeted corrective release, with regression reproducer and complete gates.
- Device-only draft answers (localStorage/IndexedDB/browser context, as actually used by the deployed app) are not restored by a database backup. Cloud progress requires distinct point-in-time and reconciliation evidence.
- Historical 98e811f / 90b55fe are NOT safe post-#385 restore targets due to draft expiry and dev reset regression.
- Do not claim a deployment rollback, zero RTO, universal recovery, nor recoverability of already-deleted records.

## Incident workflow — preservation before restoration
1. Freeze rollout, identify production deployment ID, source SHA/tree, environment/schema, incident time, affected cohorts and error mode. Preserve logs without logging learner answers or credentials.
2. If integrity at risk, stop ONLY the faulty write/synchronisation path with a reviewed, tested containment change (or use an existing proven kill switch if one is documented). Do not introduce untested client-side deletion/overwrite.
3. Reproduce with synthetic accounts/device-local data. Before opening any version that might trigger a destructive loader, preserve *raw* storage on a controlled test device; do not recommend students paste tokens, storage or answer contents into tickets.
4. If bug limited to #387, test the #385-compatible recovery candidate on a disposable isolated browser profile with aged/incomplete attempts. A branch or passing unit test is not an eligible production rollback deployment.
5. If bug in #385, create an isolated focused roll-forward patch from exact production SHA. Preserve non-expiry, non-overwrite, stale callback/reset guard, completion_pending and original timers. A read-only preservation UI is only a prospective design, NOT available.
6. Run compatibility matrix, unit, real Chromium resume/restart, Technical Gate, grader protections, full production build and total route budget; require all on the *exact* proposed commit/tree. Check data schema backward/forward compatibility and deployment permissions.
7. Obtain explicit release authorization; perform one controlled deployment; verify assigned production domain, health, login, synthetic retained attempts, write reconciliation and logs. If checks fail, do NOT blindly rollback to old code.
8. Document who can execute, escalation path and incident timestamp; measure recovery elapsed time only after an actual authorized rehearsal/incident.

## Read-only recovery tool — acceptance contract BEFORE implementation
- Operates on same origin only in a separately reviewed and isolated delivery flow; cannot be assumed to access storage from a different origin, profile or device.
- No app initializers/loaders, hydration, sync, migration, account reset, purge or schema-normalising reads before snapshot; otherwise it might destroy what it intends to recover.
- Enumerates *allowlisted* draft/session keys supported by code review, copying raw values without parsing or modifying them. Unknown keys may contain sensitive tokens: do not blindly export all browser storage.
- Snapshots must be consciously initiated by owner/tester; encrypt or otherwise protect sensitive exported data, provide local-only save, no third-party upload or telemetry, and do not expose tokens.
- Verify export completeness and SHA-256 checksum against synthetic fixtures, then verify restoration to a separate disposable profile / key namespace. Never restore over a real student's current data during testing.
- Mobile browser storage and iOS PWA origin/container quirks must be tested on actual devices; no claim of portability without evidence.
- Must pass malicious/corrupt payload, quota errors, partial writes, session-key collision and interruption tests.
- Until these contracts are implemented and validated, emergency procedure is a controlled fix-forward, not a working read-only recovery UI.

## Git / Vercel publication hold — operational gate
Authenticated observation on 22 Oct: Preview Branch Tracking off, production branch main, main auto-deploy and automatic custom-domain assignment on. No Deploy Hooks observed.
Do NOT assume preview branch rules can stop main production deploys. Do NOT Pause Project.
Before any main update, use an independently verified project-level method to prevent Git-triggered production deployments while the existing domain remains live. The exact method and ability to restore it must be proven first, ideally with harmless test in a non-production clone; if not demonstrable, NO-GO.
Prove the hold by inspecting effective settings and Git integration behavior, not a successful API response alone. Do not use [skip ci], racing multiple merges, or disabling domain access as substitutes.
Create one integrated exact-head candidate of #385 and #387, then CI on that immutable head, verify application tree against tested combination, and request approval for one main update and one deliberate production deployment.
Restore automatic deployment policy only after confirming no queued surprise build.

## Outstanding evidence / hard release gates
- CI #2202 for #388@29518d11661012cc712f4684f78eb1265edf296c SUCCESS; Vercel deployments for SHA 0 at time checked.
- No operational emergency restoration build, no verified full rollback permission, no validated production deployment hold, no tested RTO.
- Human pedagogical review deferred, not validated. Accessibility manual (NVDA/VoiceOver), PWA Android/iOS and telemetry/error probe delivery remain separate pending tasks.
- Keep #385/#387/#388 Draft, main/production/database unchanged, and Issue #373 open.

## Verified Vercel release-hold alternatives (official documentation; NOT applied)

1. **`git.deploymentEnabled: false` in `vercel.json`** suppresses automatic Git deployments for every branch (Vercel docs: https://vercel.com/docs/project-configuration/git-configuration). This is stronger than turning off Preview Branch Tracking, which does not stop production/main. **Activation caveat**: committing this value onto main itself can trigger a build/deployment before it is active; do not claim a verified hold from this edit alone. Confirm effective behavior in a disposable test project and define an activation/release method first.
2. **Project-level Ignored Build Step**, e.g. a checked temporary `exit 0` configuration, cancels the build when the command runs (https://vercel.com/docs/project-configuration/project-settings). It is NOT the same as preventing an event/deployment record; canceled builds still count toward quotas and may require a separate action to bypass on an authorized release. Never override an existing custom ignore command without preserving and restoring it.
3. **No change applied** to project settings, main or production. The connected Vercel project API supports `commandForIgnoringBuildStep`, but that alone is not proof of an event-free hold or safe restore. Prefer verifying on a disposable copy that production traffic and domain remain unchanged during activation, blocked pushes and reactivation.
4. **GO test for hold**: record prior configuration and production deployment+domain; activate chosen hold through an approved non-production rehearsal; push a harmless synthetic test commit in the isolated project; inspect effective settings, exact SHA deployments, domain alias and queues; restore prior state; make sure restore does not enqueue unexpected deployments. A test that generates a canceled deployment is not evidence of zero Git-triggered deployments.

Documentation discovery does not authorize a setting change, test commit to main, deployment, or publication. NO-GO remains.
