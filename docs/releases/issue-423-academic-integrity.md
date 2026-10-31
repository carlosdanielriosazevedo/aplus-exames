# Issue #423 — FQ A historical academic integrity

Base: main `118021d48ae354ec28b029c132d943d5a20b1c4f`. Dedicated branch:
`codex/issue-423-academic-integrity`. Synthetic data only. No #420 merge,
production migration, deployment, credentials or real student data.

## Implemented contract

Policy v1 is deterministic and recomputed on reads. Persisted academic projections
and arbitrary `validated`, `final`, reviewer or rubric-completion claims cannot
make a scientific open response eligible. No human-attestation verifier exists;
this version admits **no scientific open-response score**, including claimed
human reviews without an independently supported verification path.

Raw subject progress remains the historical record. The separate projection is
used by FQA Progress, adaptive mission competence ordering, parent competence
comparisons and Apronso error nudges. Known objective and structured events need
a matching catalog/result fingerprint, supported grading lane and coherent score
contract. New engine results carry that provenance; compaction retains it.
Fingerprints are reproducible consistency checks, not signatures, proof against
client tampering, or pedagogical certification. They contain no student answers.

Legacy events lacking this provenance and opaque lifetime aggregates remain
stored but are not silently certified. This deliberately means **some legitimate
legacy objective/structured evidence is also unavailable in the active index**.
The UI says information is insufficient, or that coverage is partial; absent
scores never become incorrect answers. A future audited import/adjudication path
is needed to admit additional historical evidence. This PR does not regrade the
past or restore data already lost before the update.

The projection replays identifiable retained events chronologically, deduplicates
session identities and excludes conflicts. Training contributes no academic
competence. Error memory is derived only from eligible retained events; opaque
legacy patterns remain archived, not shown as student weaknesses. New scientific
completions retain their responses/activity/legitimate mission XP but do not add
competence or error evidence. The scientific grader's presentation/calibration
itself remains outside #423; #422 is not resolved.

## Preservation and synchronization

- Initial policy preparation archives original FQA progress before later session
  writes can compact legacy fields. Raw scores, existing text/revisions, dates,
  unknown fields, aggregate values and pending attempts remain recoverable.
- FQA normalization and subsequent completion no longer truncate the retained
  history to 100 sessions. No missing past is fabricated from the retained window.
- Merge/load retains whole source metadata snapshots and unique session/pending
  variants. Newer timestamps may choose the operational shell, never erase the
  other response. Incompatible completed variants are academically excluded.
- Monotonic conflicted-session IDs survive cloud privacy filtering; stripping
  private text must not accidentally clear a known response conflict.
- Divergent pending variants block begin/advance/complete/reset/technical archive
  and exam exit writes. This version **does not implement automatic conflict
  resolution**; it preserves variants and reports a required safe resolution.
- A completed identity never becomes a resumed attempt. Older pauses are archived,
  not reactivated by merging a newer completed state. Incomplete history rows do
  not falsely complete an otherwise valid pause. Existing XP/reward deduplication
  and exam clocks remain unchanged.
- Local loading combines FQA copies from available stores. Malformed JSON is
  preserved and fails closed through the existing recovery screen rather than
  being deleted. This defensive shared-loader change also protects other subjects.
- Cloud loads, merges, and serialization (including retry of queued old states)
  use the current policy. Queued/snapshot originals are not rewritten in bulk.
  CAS ownership/revision predicates and schema v8 remain unchanged.
- The recursive cloud privacy filter remains in place for archives and variants:
  no new response text, answers or student evidence are sent to the cloud.

No #420 code was cherry-picked. The narrow idea of excluding scientific responses
from error accumulation is implemented against current main; the policy and
historical-preservation approach are independent of #420's grader/UI changes.
Android assets and manifest entries are unchanged.

## Limits and blockers for promotion

1. No live Neon/RLS, real-account, Safari/iOS or physical-device test is claimed.
2. A stale application cannot be made to run this client policy. Updated clients
   exclude unsafe science even when an old device writes old aggregates, but this
   change cannot guarantee that an unmodified old client preserves every field,
   or retains responses it never uploaded. No server minimum-client-policy rule
   is introduced. Mixed-version rollout requires an independent compatibility
   decision; there is no production GO on the strength of these tests alone.
3. Raw private text intentionally stays local. A different device cannot recover
   text absent from its cloud payload. Existing local variants are retained when
   loading cloud, but missing text is not fabricated or collected anew.
4. Preservation archives are not silently capped. Growth can hit browser quota;
   existing storage failure/fallback reporting remains necessary. Quota tests
   prove the prior durable source is not removed, not unlimited durable capacity.
5. Unknown provenance, conflicts, and incomplete historical coverage reduce usable
   evidence. Counts in the new index are not promised to equal old lifetime totals.
6. No automatic human-review queue or reviewer identity is fabricated. Historical
   adjudications need a separate verifiable import before academic reuse.

## Synthetic test matrix and evidence

`tests/unit/fqaAcademicIntegrity.test.js`: all seven FQA-R items, forged review
claims, high/low/zero old marks, objective/structured contracts, changed catalog,
old state versions, unidentifiable/malformed records, opaque/truncated totals,
130 retained events, training/paused/completed identities, duplicate rewards,
variant conflicts in both merge orders, privacy roundtrips, reload, two storage
copies, quota failure, old queue/snapshots, exam clock and other-subject isolation.

`tests/unit/fqaAcademicIntegration.test.js`: actual cloud save/serialization path
with synthetic auth/data clients; ownership, revision conflict, old queued payload,
merge/load, private variants and no private text in outgoing cloud state. This is
not a database/RLS or live identity-provider test.

`tests/browser/fqa-academic-integrity.spec.mjs`: 360/390/430/1366 px, raw scientific
history and XP survive reload, unsafe preparation is unavailable and alleged error
patterns are absent. Additional existing browser tests cover recovery and other
subjects. Runtime validation results are recorded in the Draft PR.

The historical recovery contract keeps byte equality of #385 draft/clock/storage
helpers. Its full-state persistence assertion now checks preservation of every
original subject field while allowing additive integrity metadata. It exercises
actual stored version tags 29/31; no previous preservation check is dropped.

## Audit decision

Candidate for independent technical audit only. NO-GO for merge, deployment or
production data migration until audit and rollout limitations above are resolved.
