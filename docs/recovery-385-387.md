# Recovery and coordinated release: PRs #385 / #387

Status: prepared locally, NOT deployed; no operational recovery claim.
Human pedagogical review: deferred by owner, not validated. Invited beta is later.

## Candidate

Branch `codex/recovery-safe-baseline` starts at #385 `94ee6db5409e213494e275e28d8da01d3a2b4623`.
Application code is deliberately identical to #385. It retains all pending-attempt guards,
non-expiring drafts, original timers, stale-callback reset guard, cloud merge protection,
completion deduplication and preservation of malformed recovery data. No new migration,
new storage key or state version. Original commits 0ee096b/ac79973 remain preserved.
It excludes #387 visual/feedback changes, so it can recover specifically from those changes.
It cannot repair an unknown bug in #385 itself: that needs a targeted roll-forward fix.

Never use old deployments 98e811f / 90b55fe after this release as a lossless recovery path.
Their loader deletes aged Math drafts and lacks the reset guard. Database backups do not
restore device-local drafts. Do not clear browser storage, reset accounts or restore a DB
snapshot as a release-recovery step.

## Verification

`node scripts/recovery-compatibility.mjs` extracts actual modules from pinned Git objects,
computes the merge tree of #385 and #387, and compares synthetic writers/readers with this
candidate. Its only data stores are Maps. Temporary files contain code only; no network or
credentials. Missing history is an error, never a skip. CI checkout uses fetch-depth: 0.
`npm run test:unit` includes the compatibility runner and existing concurrency, incoming
progress, incomplete assessments, corrupted drafts, stale callbacks, reward deduplication,
Portuguese and FQA recovery tests. Existing Chromium pending-reset and diagnostic-resume
proofs at the identical #385 runtime remain relevant; new local tests are not remote CI.
Run syntax, Technical Gate, full npm run build and enforced total-route Performance Budget.
Do not modify thresholds. Evidence logs are retained separately.

## Recovery choice

Recommend a prepared roll-forward candidate for this phase, with the explicit limitation
that publication/build permission and recovery duration are unproved. On a visual regression,
publish the pinned safety candidate as a new release, after checking for subsequent app/data
changes; do not blindly revert history. On an integrity regression, stop release expansion and
prepare a focused fix preserving stored attempts; this candidate is not a universal fallback.

A prebuilt recovery deployment would shorten response time, but needs separate authorization,
correct production environment, a health check, confirmation of eligibility and a recorded
immutable deployment ID. A preview alone is not evidence of Instant Rollback eligibility.
No such deployment was created. No automatic failover or RTO is claimed.

Before any incident action: record source/target SHA and deployment IDs, schema and environment;
confirm storage compatibility and permission; do not migrate/erase data. After an authorized
switch: health, existing login, synthetic retained-session resume and error monitoring, then
verify approvamais.pt points to the intended deployment. Never use a student's attempt as test data.

## Coordinated integration (future execution, not authorized here)

1. Confirm Vercel effective preview disablement, production branch main, Git trigger policy,
   production protection/access and recovery permissions in an authenticated panel. Record proof.
2. Prepare one integration branch containing BOTH exact PR heads. Publish only after automatic
   preview suppression is verified. Run remote full CI on its exact head and compare its application
   tree with the tested combination fb6ba323d06c51f9c083f3e897a7b5ddf6fe8a9c.
3. Before any merge, establish and verify a project-level hold on automatic Git deployments
   (including main) while retaining the existing live deployment and domains. Audit deployment
   hooks/workflows too. Do not use Pause Project, which interrupts access. Do not rely on a
   commit-message skip, timing two merges quickly, or the preview-only flag to stop main.
4. With later authorization, integrate the combined change via one reviewed integration PR and
   one main update. Do not merge #385 and #387 separately with main auto-deploy enabled.
   If governance requires two merges, keep the verified deployment hold throughout both.
5. Validate final main SHA/application tree and all required CI before triggering exactly one
   production publication from that SHA. A changed tree needs relevant revalidation.
6. Keep the existing application accessible until the replacement is ready. Verify domain,
   auth, synthetic continuation, health and logs. No data reset. Record outcome and recovery ID.
   Restore automatic main policy only deliberately, after recording current state and confirming
   it will not queue an unintended publication. Review deferral remains recorded.

## Current operational blockers

The available get_project response omits previewDeploymentsDisabled and production branch.
The Work browser redirects the Git settings URL to Vercel Login. Intervention is needed at
Log in to Vercel, selecting the owner's normal sign-in method in that Work browser. Do not send
passwords/codes in chat. After login, inspect project Git settings and Production environment,
then deployment recovery controls without confirming a rollback.
The connector's rollbackCandidate listing returns 403 for deploymentRollback. This proves
connector access is blocked, not that an OWNER cannot use the dashboard. CLI is unavailable.
No flag or permission is inferred from a successful PATCH, account role or a READY status.

Publication remains NO-GO until the effective policy, remote CI for any new release head, and
an executable recovery route are evidenced. A local branch/build is only preparation.

## Authenticated operational inspection — 22 October 2026

Verified in the Vercel dashboard as the signed-in project owner:
- Preview environment: Branch Tracking unchecked, Save disabled (persisted state).
  The panel explicitly states CLI/API deployments remain possible. This is automatic
  Git preview suppression, not a blanket prohibition on manual deployments.
- Production environment: Branch is main; every main commit creates a production
  deployment; Auto-Assign Custom Production Domains checked.
- Git repository connected; no Deploy Hooks. Repository workflows contain no deploy
  action for codex/recovery-safe-baseline; Beta CI starts on opening its PR.
- Overview still shows production 98e811f / BNT57a7tuSrhSiYj9yqsadJwspQ9.
- Instant Rollback opens a dialog showing current 98e811f and previous 90b55fe,
  Choose another deployment, Cancel and Continue. Cancel selected; no Continue.
  UI availability is proven; final backend execution authorization is NOT tested.
The earlier login blocker is resolved. The connector 403 does not describe the
owner's dashboard UI capability. No project setting was changed in this inspection.

## Incident in #385: code recovery versus student data

The safety baseline contains #385 and cannot cure a defect in #385 by itself.
Use a targeted roll-forward from the exact deployed release, retaining the non-expiry,
non-overwrite and reset guards. Reproduce the defect using a synthetic fixture first,
add a failing regression, implement the smallest fix, rerun the recovery matrix and
full release gates, then obtain authorization for a single corrective deployment.
For an incident threatening integrity, first contain the affected write path with a
separately validated patch; do not load 98e811f/90b55fe over current device storage.
A separately built read-only recovery UI could preserve raw local/session storage
without invoking application loaders or synchronisation, but does NOT exist yet and
must not be advertised as a ready emergency fallback. No universal repair for an
unknown future defect can be pre-certified.

Code recovery changes the executing code only. It does not recover lost answers.
For device-local attempts, preserve raw values before any repair and operate on copies;
never clear storage or replace pending state from an older cloud snapshot. A server
backup cannot restore device-only work. For cloud data, restoration would need a
verified backup/PITR window, an isolated restore and record-level reconciliation to
avoid overwriting newer progress; availability and restore permissions have not been
verified. No production backup, restore, export or database modification was performed.
Actual deleted data without a retained copy cannot be promised recoverable.

For publication: the observed main auto-promotion means two separate merges would
produce independent publications. Keep the previously specified deployment hold and
single integration procedure; this inspection has NOT applied that hold. The recovery
branch can be published for CI now: Preview Branch Tracking is off, there are no deploy
hooks, its Git rules exclude the branch and its workflows do not deploy on that push/PR.
Keep the new PR Draft and verify no deployment was created for its head.
