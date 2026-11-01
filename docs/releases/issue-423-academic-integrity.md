# Issue #423 — FQ A historical academic integrity

PR #450 only; branch `codex/issue-423-academic-integrity`.
Starting candidate: `d88bdfd3b98f0033137f1412e68b396c01addcf1`.
Main base: `118021d48ae354ec28b029c132d943d5a20b1c4f`.
Synthetic data only. Draft; no merge, deployment, production migration or Android
asset change. These are author implementation/tests, not an independent audit.

## Shared contracts and trust boundary

Policy v2 separates complete local history from academic projection. A matching
catalogue/result fingerprint is a consistency check, not authentication, a human
review or sufficient authority to admit an event.

`app/lib/fqaAcademicIntegrity.js` owns three-way attempt comparison
(`equal`/`different`/`unknown`), normalization, runtime context observations,
academic eligibility, error-memory inputs and assessment presentation.
`app/lib/fqaCloudProjection.js` owns the explicit FQA transport allowlist.

There is no externally trusted issuer in this PR. Native session entry establishes
an immutable in-memory context. The actual engine grading call must be observed
in that context and item slot. Completion binds identity/kind, item order, original
start, completion date and the consumed result contract. A result observed in
training cannot be replayed into a different mission context.

Observation registries live outside serialized state. Editing a stored kind,
fingerprint, score, timestamp or purported authority object cannot create an
observation. **Runtime observations are not cryptographic authentication.** They
do not establish human attestation or defend against arbitrary code execution in
the client. No local persisted flag is accepted as a substitute. Scientific prose
remains excluded even with invented reviewer claims or automatic marks.

## Approved conservative coverage reduction

The owner selected the conservative alternative after its recovery/privacy costs
were presented. Observations expire on full page reload or another device.
Otherwise coherent retained objective/structured events then remain historical
but unavailable to the academic projection. No grade becomes zero, no history is
regraded speculatively and opaque totals are never a fallback source.

Fresh native sessions with actual engine observations can contribute during the
current runtime. Complete local paused attempts can still resume after reload,
with identity, submitted answers and original clock preserved. An old resumed
attempt whose context cannot be authenticated may complete and receive legitimate
activity/XP without becoming academic evidence.

Progress, parental comparisons, error memory and adaptive competence ordering
consume the projection. Session, parental, full-exam and mini-exam presentations
also enforce eligibility. Excluded results are not displayed as correct,
incorrect or completed grading. Unavailable exam points are null, not zero.
Partial subtotals cover eligible items and explicitly are not a whole-exam grade.

This coverage reduction is substantial. A fresh diagnostic is tested as usable
and countable in the same runtime, then preserved but excluded after reload.
Durable academic continuity is not claimed. Independent review and a separate
rollout decision are still required.

## Pauses and privacy uncertainty

Administrative timestamps, display labels and catalogue-derived domain metadata
do not establish a different attempt. Identity, question order/position, original
start, submitted result facts and known responses remain material.

Cloud omission is explicitly unknown, including when original answers happened
to be equal. It cannot authorize continuation. Missing private content produces
`integrityPendingConflictKind: "privacy-unproven"`; known divergence remains
`semantic-v1`. Available originals survive merge order, permutations, redaction
and reload. Begin/advance/complete/reset/technical archive and unsafe exam exit
writes remain blocked.

The notice explains uncertainty without claiming a proven different answer.
Navigation to Progress/subject selection remains possible. No automatic conflict
resolution or manual adjudication workflow is fabricated.

A legitimate active cloud roundtrip can also be blocked because omitted answers
do not establish equivalence. A complete local copy remains usable before an
ambiguous cloud copy is merged; ambiguity then cannot be cleared automatically.
This availability cost is explicit and tested.

Random revision IDs and response commitments were considered. An ID copied by an
old client does not prove content equivalence; public hashes can expose short
answers through enumeration. Neither is introduced. No additional answers,
answer hashes, persistent keys or response-equivalence identifiers are collected.

## Preservation and transport

- Raw results, responses/revisions still present, unknown fields, aggregates,
  dates, attempts, XP, rewards and activity remain in additive local archives.
- Retained FQA history is not capped at 100. Missing past is not reconstructed.
- Completed/interrupted identities cannot restart or receive duplicate XP.
- Missing/malformed collections normalize before component reads. Original
  values remain recoverable; structural ambiguity retains its guard.
- An explicitly stored current submission missing from a contiguous result array
  is copied into that exact slot, with the original shorter array archived.
  Earlier gaps are not filled speculatively and contradictory result copies block
  continuation. Display projections never replace raw submitted-result storage.
- Missing/null/numeric labels receive a safe display label; originals remain
  recoverable and existing guards are never cleared.
- Cloud admits known event structures, catalogue item/step IDs, bounded identity
  fields, numeric facts, supported enums and omission/guard metadata.
- Labels, arbitrary diagnostics/criteria/extensions, malformed scalar/array
  content and opaque recovery material stay local. Archives use the same
  allowlist; nested raw archives are not exported recursively. Known null
  recovery markers may be transported.
- Untransportable event/identity material sets a remote recovery/omission guard
  rather than implying an empty safe history. Unknown subject-map wrappers cannot
  bypass serialization; Math/Portuguese regressions retain their contracts.
- Preparation/serialization faults are caught before storage writes. Quota
  failures retain prior durable bytes; existing fallback/volatile semantics stay.
- Old queued states pass current serialization at send time. Queue/snapshot
  originals are not bulk rewritten. Schema v8 and ownership/revision CAS stay.

Opaque local archives are therefore not complete cloud backups. Another device
cannot recover intentionally unuploaded content. Material already lost before
this update is not reconstructed.

## Future backend protocol — not implemented

A later reviewed protocol needs authority outside mutable client state, session
identity/lane ownership, verifiable item/result binding, issuance/verification
keys, replay/rotation/version rules and privacy-safe recovery/compatibility.
Blindly signing client kinds/scores would not establish correctness. Human
validation needs a real verifier and reviewer authority.

No receipt endpoints, signing keys, schema/migrations or production configuration
are introduced. Old applications do not acquire v2 by receiving its marker.
Mixed-version rollout and old clients discarding unknown fields remain risks.

## Tests and acceptance

New tests cover context validity/tampering, training replay, invented authority,
context loss at reload, three-way comparison, both merge orders, local reload/
retoma, old cloud/queues, opaque depths/archives/recovery, safe labels, serialization
faults, summaries and eligible/excluded exam points.

Positive fixtures in `tests/helpers/fqaRuntimeEvidence.js` execute ordinary
begin → grade → advance → record calls, without test-only authority injection.
Earlier positive competence, training-memory, exam wrapper and XP-deduplication
requirements are retained using actual contexts. Contract coherence is tested
separately from academic authority. Earlier optimistic redaction-equality cases
now require an uncertainty guard under the owner's approved policy.

Browser coverage includes a fresh native positive journey and reduced coverage
after reload; existing history, missing fields, private uncertainty, real
divergence, labels, scientific summaries, parental presentation and retained XP.
All prior tests remain; no acceptance threshold is lowered.

Counts and exact candidate SHA are recorded in the Draft PR after full unit,
synthetic cloud integration, historical recovery, browser, Technical Gate,
build and Performance Budget runs. Remote CI observations are separate.

## Remaining release limitations

No live Neon/RLS, real student/account, physical-device or Safari/iOS validation
is claimed. Ambiguous cloud pauses have no automatic resolution. Durable academic
context requires future backend work. Archives can exhaust quota. Old clients can
still apply old behavior or discard unknown data.

Keep PR #450 in Draft and NO-GO for integration/release pending independent review
and explicit acceptance of the coverage/recovery limits. Passing author tests
does not establish independent approval or production readiness.
