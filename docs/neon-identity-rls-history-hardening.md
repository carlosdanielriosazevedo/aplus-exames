# Neon identity/RLS and cloud history hardening — review gate

Status: **Draft only. SQL not executed. No permission to merge or deploy.**

## Scope and evidence

- Source: `main@118021d48ae354ec28b029c132d943d5a20b1c4f`.
- Separate project inspected (read-only): Neon `steep-fog-69048956`, branch `br-noisy-unit-b9p6cf1u`, database `neondb`.
- This project's name contains "Synthetic", **but that does not establish that all records are synthetic**. PostgreSQL statistics estimate six `app_users` and two `student_cloud_state` rows; no row contents were inspected. Do not branch, copy, reset or migrate these rows before provenance is established.
- Applied schema marker observed as version 8.
- RLS OFF and no policies: `app_users`, `app_user_roles`, `student_profiles`, `parent_invites`, `student_parent_links`, `parent_link_change_requests`. Role `authenticated` currently has SELECT/INSERT/UPDATE/DELETE on all six. This may allow cross-account access through an authenticated Data API, but an exploit was not attempted.
- `student_cloud_state_history`: RLS ON, one SELECT-own policy, yet direct INSERT/UPDATE/DELETE privileges still granted. Existing trigger `trg_student_cloud_state_snapshot` is enabled; function `snapshot_student_cloud_state` is currently **SECURITY INVOKER**, owned by `neondb_owner`. Authenticated UPDATE with automatic history insert is not proven to work.
- `student_cloud_state` currently has four ownership policies; not changed by migration 009.

## Proposed migration

`db/migrations/009_v5_8_neon_rls_history_hardening.sql` is a full **single-transaction** corrective migration, derived from migration 007 and with a separate repair of the cloud history trigger.

1. Confirm database, role, schema 8, trigger/function existence and function ownership; abort on mismatch.
2. Revoke accumulated grants to authenticated/anonymous/PUBLIC on six identity and parent tables; apply **least-privilege** grants and identity/parental RLS policies. `app_users` becomes client read-only; account creation and provider-derived email updates remain server-authoritative via `ensureAppUser()` using `DATABASE_URL`. `student_profiles` permits edits to educational fields but forbids client-controlled identity keys and technical timestamps.
3. Strip direct writes to history. Restore only SELECT-own permission for `authenticated`.
4. Make `snapshot_student_cloud_state()` a `SECURITY DEFINER` trigger function under a verified owner, with hardened `search_path`, explicit schema-qualified INSERT of **OLD** fields only and no direct EXECUTE grant to untrusted roles.
5. Verify RLS flags, grants, policy counts, role access, function ownership; update schema marker to 9. Any check failure rolls back the transaction.

**Do not run migration 007 as the fix:** granting a smaller set does not revoke earlier grants. **Do not simply grant history INSERT to authenticated:** that would weaken the trust boundary. A privileged trigger should be independently reviewed for escalation and bypass paths before use.

Apply whole file verbatim via an approved controlled `psql -v ON_ERROR_STOP=1 -f` workflow, not a statement-splitting helper that breaks PL/pgSQL dollar quotes. Application is **not authorized by this Draft PR**.

## Conditions BEFORE an isolated SQL execution

- Confirm by deployment/configuration audit that the target project and branch have never received production/personal records; table names and estimated counts are not enough. If uncertain, prepare a **new empty database/project** (only with explicit approval if costs or external configuration change).
- Confirm Neon Auth and Data API settings, schema 8, current owner, existing application endpoints and migrations. Never transmit credentials or JWTs in logs.
- Independent review of SQL, including possible RLS joins and dependence on `app_users`, server-side role/parent linking, and trigger's `SECURITY DEFINER`.
- Approved backup/restore procedure, without copying personal data into test infrastructure.
- Explicit approval for applying SQL. No production changes.

## E2E acceptance matrix — real signed JWT, NOT owner/SET ROLE simulation

Using only three dedicated synthetic Neon Auth identities A (student), B (student), P (parent) created in the verified empty isolated project:

| Action | Expected |
|---|---|
| A SELECT/UPDATE B's profile/user | Denied or zero affected rows |
| B SELECT/UPDATE A's profile/user | Denied or zero affected rows |
| A INSERT/UPDATE/DELETE `app_user_roles` to become admin/reviewer | Denied |
| A/P direct INSERT/UPDATE/DELETE of invites/links/change requests | Denied |
| P reads A's student profile before link | Denied |
| Server legitimately creates active P–A link, P reads A | Only A allowed |
| P reads B with no link | Denied |
| Server revokes P–A link; P reads A again | Denied |
| Anonymous attempts identity or parental access | Denied |
| A updates own `student_cloud_state` with expected revision | Success, exactly one historical snapshot |
| A replays old revision or B races same revision | CAS rejects stale write; no extra history/XP |
| A directly inserts/updates/deletes history | Denied |
| Logout/login and data API retry | Ownership and history intact |
| Server identity bootstrap / parent invite lifecycle / pilot endpoints | No regressions |

Inspect HTTP responses and DB counts only for synthetic rows. Do not infer JWT isolation from tests run as `neondb_owner`, which has BYPASSRLS in the inspected project.

## Prepared real Neon JWT read-only test — NOT EXECUTED

The opt-in script `scripts/neon-identity-jwt-readonly.mjs` is pinned to the **existing isolated** Neon Data API host and performs **GET requests only**. It requires explicit `CONFIRM_SYNTHETIC_NEON_READONLY=YES`, a verified synthetic target, and three independently signed **synthetic test-account** JWTs supplied at runtime via environment variables (`NEON_SYNTHETIC_JWT_A`, `NEON_SYNTHETIC_JWT_B`, `NEON_SYNTHETIC_JWT_P`), plus `NEON_SYNTHETIC_DATA_API_URL`. It makes no request unless all safeguards pass. Never commit these tokens, inject real-user JWTs, or paste credentials into a PR, CI log, chat, or file.

The test checks unauthenticated denial or empty results; and that each signed token sees only its own `app_users` row and roles. It is **not** yet an end-to-end validation of protected writes, parent relationships, JWT expiry, session renewal or cloud CAS, and must not run against the current schema 8 with RLS off. The tested endpoint currently has Neon Auth and Data API provisioned, but no matching authenticated test execution has been performed. A new empty independently approved synthetic environment or a fully validated existing isolated dataset is needed first, along with an explicit migration approval.

## Vercel/Neon connection audit — read-only 2026-11-02

- Confirmed Vercel **production project** `aplus-exames` has `DATABASE_URL` configured for Production. Confirmed Vercel **isolated preview project** `applus-beta-synthetic-isolated` has `DATABASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `NEXT_PUBLIC_NEON_AUTH_URL` and `NEXT_PUBLIC_NEON_DATA_API_URL` configured for Preview. **Only variable names, targets and types were inspected, never decrypted values.** The presence of a variable does NOT prove its connection points to the intended project, branch or Postgres role.
- On isolated Neon project `steep-fog-69048956`, branch `br-noisy-unit-b9p6cf1u`, read-only PostgreSQL catalog queries confirmed `neondb_owner` has BYPASSRLS while `authenticator`, `authenticated` and `anonymous` do not. This is not an attestation of the role actually used by Vercel.
- Vercel isolated Preview project's **public** `NEXT_PUBLIC_NEON_AUTH_URL` and `NEXT_PUBLIC_NEON_DATA_API_URL` hostnames match the inspected Neon isolated endpoint `ep-holy-term-b93irruj`; the sensitive Preview `DATABASE_URL` is configured but was NOT decrypted, so its host/role are **unknown**. The project preview variables have no `gitBranch` restriction; branch-scoping must not be assumed.
- The inspected Neon branch `main` is primary, created 2026-10-22 via `neon-mcp-server` in its own project. This metadata is consistent with an isolated test project but does **not** prove that every stored record is artificial.
- The diagnostic now **requires** `VERCEL_ENV=preview` and the exact `VERCEL_PROJECT_ID` of the isolated project; missing context fails closed. This is an explicitly supplied safety check, not independent attestation of project identity. A human must verify the execution context before running it. The Vercel connector returned the sensitive Preview `DATABASE_URL` with `decrypted=false` even for read-only inspection; its host and role could not be verified from metadata alone. The latest isolated READY deployment belongs to `codex/grader-418-419-evidence-safe`, not this PR. Do not assume that deployment contains the attestation script.

- Added `scripts/neon-isolated-server-role-attestation.mjs`: **read-only**, opt-in, and pinned to the isolated Neon DB host and database. It only queries role privileges and prints role/capability booleans (never a DSN, credential or personal record). It is syntax-checked in CI but **has not been run with Vercel environment secrets**. Run it only with scoped permission from the isolated Preview project after validating its `DATABASE_URL` target; it does not attest production.
- Additional exposure found: table-wide SELECT on `parent_invites` would expose `token_hash` to the originating student's Data API session. Migration 009 now grants SELECT to a safe column subset, explicitly excluding `token_hash`, with synthetic negative access tests.

## Limitation of Vercel Preview Secrets — correction (2026-11-02)

**Do not attempt the previously proposed Windows `vercel env run -e preview` workaround
for `DATABASE_URL`.** The CLI command itself exists, but the actual Vercel variable
has the **Secret** type. Vercel's current Secret model restricts retrieving values
after saving: Production/Preview Secrets are supplied to deployments and are not
available to local variable-pull workflows. Thus CLI login, a verified local
`.vercel/project.json` and an offline-mocked successful CLI invocation do **not**
prove that the original Preview Secret will reach the child process.
The local launcher and its mock tests have been removed to avoid implying otherwise.

Sources checked (2026-11-02):
- Vercel changelog, *Environment variables now use Config and Secret types* (2026-08-24):
  https://vercel.com/changelog/environment-variables-now-use-config-and-secret-types
- Vercel CLI environment command, `env run` syntax:
  https://vercel.com/docs/cli/env
- Vercel-maintained plugin's environment reference on non-retrievable Preview Secrets:
  https://github.com/vercel/vercel-plugin/blob/main/commands/env.md

**Historical state before the authorized 2026-11-02 Preview build:** Preview `DATABASE_URL` existed in the isolated Vercel project but its effective host/database/role were **unverified at that time**. See the attestation section below for the subsequently observed result.
Public Auth/Data API URLs matching the authorized Neon endpoint cannot prove the
`DATABASE_URL` secret matches. Neon management-API role observations also do not
establish the credential used by the Vercel runtime.

**Approved diagnostic route (subsequently used):** an isolated **Preview deployment** with the original Secret supplied by Vercel at build time.
Pre-deployment design requirements that were considered:
1. Prove project ID `prj_8n5XwTMF651SAfsykIDji93oZp3r`, Preview environment,
   source commit, and intended isolated Neon target independently.
2. Gate any diagnostic endpoint behind strong server-side authorization and Vercel
   deployment protection, or use a strictly controlled deployment-runtime execution
   without an internet-exposed endpoint; avoid a public route which exposes the
   Postgres administrative role/capabilities.
3. Validate the exact approved Neon hostname and `/neondb` database path before
   any SQL; perform **only** a read-only role/privilege catalog query; redact errors
   and never emit DSNs, tokens or user records.
4. Explicitly review deployment cost, access, logs, cleanup and noninterference
   with production. This is a **proposed** separate release/test operation, not
   authorization to create a deployment.
5. Record identity/privilege results in PR #453, then request independent
   security review before considering a data-changing SQL migration.

The staged `scripts/neon-isolated-server-role-attestation.mjs` remains unexecuted with the Vercel Secret; the **separate build-only** `audits/neon-preview-attestation/attest.mjs` produced the observed read-only attestation instead. The Beta CI release guard must remain enabled.

## Vercel Preview runtime attestation — confirmed 2026-11-02 (read-only)

**Scope:** ONE authorized, build-only Preview deployment of the isolated Vercel
project `applus-beta-synthetic-isolated`
(`prj_8n5XwTMF651SAfsykIDji93oZp3r`), deployment
`dpl_2CgyxcpU5MUFKoN1PAKyVR14wKTw`. GitHub source of the submitted
three-file attestation package: PR #453 commit
`567ce21e80e59b8022ebb1b0fa4e05498206105f`.
Vercel's deployment API independently confirmed READY, `target=null`
(Preview), exact project ID and source file tree containing only
`attest.mjs`, `package.json`, `vercel.json`.

**User-observed Build Logs screenshot (2026-11-02 15:03; not retrieved via
the build-events connector):** install succeeded and build ran
`node attest.mjs`. The `ATTESTATION_RESULT` line displayed these
non-secret, aggregate role findings:

| Field | Observed result |
| --- | --- |
| `project` | `isolated-preview` |
| `database` | `neondb` |
| `role` | `neondb_owner` |
| `bypassRls` | `true` |
| `superuser` | `false` |
| `insertAppUsers` | `true` |
| `updateAppUsers` | `true` |

The attestation script validates the exact allowlisted isolated Neon
PostgreSQL endpoint and database name **before** opening the connection;
therefore a successful marker supports the actual Preview build's
`DATABASE_URL` pointing at the allowlisted isolated endpoint and provides
a SQL-attested runtime role. The role privileges support the trusted
server-side `ensureAppUser()` upsert design. No credentials or user
records appear in the screenshot; the SQL is a read-only catalog SELECT.

**Evidence caveat:** build logs were supplied as a screenshot by the owner;
the Vercel build-events API returned 404 and did not independently return
the line. The independent Vercel deployment metadata and source-file
inspection support its association but do not themselves prove SQL results.
This proves the **one attestation Preview build**, not every existing or
future Preview deployment, not the production runtime, and not any Neon
Data API JWT's permissions. `neondb_owner` has BYPASSRLS: this is a
trusted-server privilege and must never be distributed to browsers or used
to evaluate end-user row isolation.

**Gates now closed:** Preview `DATABASE_URL` endpoint allowlist and actual
PostgreSQL role/identity-upsert grants, subject to the stated evidence source.

**Gates still OPEN:** verify no server-secret exposure to browser,
independent migration/RLS security review, provenance of fully synthetic
test identities/data, authorized SQL migration of isolated schema 8→9,
and signed Neon Auth JWT end-to-end isolation tests after that migration.
The ordinary Beta CI release gate correctly disallows mixing schema
changes into an application release. No Neon migration, data writes,
production deployment, or merge are authorized by this attestation.

## CAS bypass remediation staged in Draft — NOT DEPLOYED

**Finding confirmed on isolated Neon schema 8** (read-only catalog, 2026-11-02):
`authenticated` has direct `INSERT, UPDATE, DELETE` on
`public.student_cloud_state`. Its UPDATE policy only checks
`auth.user_id() = auth_user_id`, not the expected revision. Existing
`app/lib/cloud.js` did include `.eq("revision", expectedRevision)`
but a modified client could omit it. The previous `009` migration
did not originally revoke those grants.

**Mitigation prepared in this Draft:**

1. `app/lib/cloud.js` sends GET/POST to same-origin
   `/api/cloud/state`, **no direct Data API writes or deletes**.
   The client continues to strip answer texts.
2. `app/api/cloud/state/route.js` requires an authenticated Neon
   server session, rejects cross-origin POST, bounds request size and
   returns privacy-safe errors. It derives the `auth_user_id` solely
   from the authenticated session; the request cannot select another
   account. The endpoint deliberately does not require an
   `app_user_roles` row because the current `ensureAppUser()` flow
   does not guarantee role provisioning on first login.
3. `app/lib/server/cloud-state-store.js` uses a one-statement
   `INSERT ... ON CONFLICT DO NOTHING` for initial state, and a
   one-statement `UPDATE ... WHERE auth_user_id=$sessionUser AND
   revision=$expected` that increments revision server-side for
   existing state. A stale write is returned as a conflict with the
   current remote row, preserving the old UI conflict contract.
4. `009` explicitly REVOKEs all inherited prior direct grants on
   `student_cloud_state`, regrants SELECT for the ownership RLS
   policy, drops client INSERT/UPDATE/DELETE policies and verifies
   resulting privileges. Existing `student_cloud_state_history`
   remains server-triggered and client READ-ONLY.
5. Disposable PostgreSQL tests exercise client attempts to UPDATE
   without CAS, DELETE and upsert; legitimate owner CAS, replayed
   initial INSERT, stale writes and OLD-state snapshots. Offline
   Node tests also check payload, authorization wiring and server SQL
   contract. **These do not prove real signed JWT behavior.**

**Critical deployment ordering:** The API/client build and role
attestation must be independently validated in the isolated Preview.
Applying `009` before a compatible API is live intentionally breaks
legacy browser cloud writes. Conversely, deploying the API alone before
the grants are revoked does not prevent malicious direct Data API
writes. A coordinated migration-specific release, approved rollback
strategy and actual signed-JWT tests are required; the ordinary Beta
CI must remain blocked for direct database-change release.

**Unresolved academic-integrity risk:** CAS is a concurrency and
history invariant, **not** proof that `state_json` is truthful. A
modified authenticated client can still submit fabricated XP, exam
results, or completion entries to the new endpoint. Do **not** label
this change anti-cheat, reward-authoritative or completion-immutable.
Before real users and monetization, introduce server-verified
completion receipts and idempotent server-calculated rewards, plus
monotonic/immutable session validation. Independent verification of
session/auth authorization, privileged server `DATABASE_URL`,
parental access, and Neon Auth JWT isolation remains mandatory.

## Verified XP is NOT client XP — reward receipt foundation (staged, not active)

**Observed 2026-11-02:** `app/lib/subjectProgress.js` and
`app/lib/competition.js` calculate study/competitive XP client-side.
`app/lib/cloud.js` persists those values inside client-reported
`state_json`. A modified browser can forge them; session authentication,
ownership RLS and atomic CAS **do not establish that an exam was completed
or that XP was earned**. This is a distinct security boundary from #453
cloud-save concurrency and from #450 FQ A academic grading.

**Staged in migration 009, still unexecuted:**
- `verified_completion_receipts` is a new, append-only owner-only
  PostgreSQL table, keyed uniquely by `(auth_user_id,completion_id)`.
  Each future receipt requires kind, award, verifier version, and digest
  of trusted grading evidence. No `authenticated`, `anonymous`, or
  `PUBLIC` privilege or RLS policy permits reading/creating receipts via
  the Data API. A BEFORE UPDATE/DELETE trigger refuses edits, except
  `DELETE` in a transaction explicitly scoped by the database owner using
  `SET LOCAL app.verified_receipt_erasure = 'YES'` for lawful account
  erasure. UPDATE remains forbidden, including in that scope.
  A foreign key to `app_users(auth_user_id)` prevents orphan awards.
  Administrative reward corrections need a separate reviewed migration.
- `GET /api/cloud/rewards` authenticates via Neon Auth server session,
  derives the owner from that session, and returns XP summed **only** from
  the immutable server-owned ledger. It never reads claimed XP from
  `student_cloud_state.state_json`, and does not offer POST/PUT/DELETE.
  New identities with no receipts return zero verified XP, not an estimate.
- `app/lib/server/cloud-state-validation.js` now rejects unexpected
  top-level cloud fields and reserved server-authority names, including
  nested attempts to impersonate `verifiedXp` or `rewardReceipts`.
  Ordinary `xp`, competitive XP, and progress are still permitted
  as explicitly **unverified client-reported state** to preserve personal
  progress and offline cloud merge; they are **not** reward receipts.
- Disposable SQL fixtures attempt forged client INSERT/SELECT, owner
  replayed receipt (unique constraint), receipt UPDATE and DELETE,
  cross-account aggregation. Mocked HTTP/unit tests require a real
  session, account-owner filtering, no SQL error leakage, and zero XP
  on a ledger without receipts. CI does not connect to Neon.

**Deliberately NOT implemented / still NO-GO:** no code creates a
receipt and no claimed completion is trusted merely because it arrives
at an authenticated endpoint. Server-verified assessment starts,
server-known item/answer keys, scoring, evidence retention and
idempotent awarding must be independently designed and tested first.
Do not use `state_json.xp`, `competition.weeks[*].xp`, or the demo
leaderboard as the official/paid ranking. Do not backfill receipts by
copying unverified client XP. The `verified_completion_receipts` table
is intentionally empty until a future audited trusted grader exists.

**Integration dependency:** PR #450 modifies `app/lib/cloud.js`,
`app/lib/subjectProgress.js` and academic integrity for FQ A;
the changes are not merged into this Draft. A later merge/rebase must
reconcile the pedagogical and cloud projections with tests before any
publication. The ordinary release safety gate stays enabled.

## Seven-question server-graded preview protocol — CI prototype only

**Scope and safety boundary (2026-11-02):** This Draft contains a
separate `db/migrations/010_v5_9_verified_pilot_sessions.sql` with
a hard preflight requiring `app.synthetic_verified_pilot_ci =
'ONLY_DISPOSABLE'`, owner `neondb_owner`, and schema version 9.
**It is NOT approved for any Neon deployment, including the isolated
Neon project.** GitHub Actions runs it only after 009's disposable
PostgreSQL assertions and the 009 reapply-fail-closed check. Applying
010 changes the version marker to 10 in disposable CI; the staged
real-JWT read-only identity smoke still expects exactly version 9,
so any future 010 rollout needs a separately reviewed schema/version
compatibility plan.

**Pilot content:** seven original elementary mathematics choice
questions, deliberately NOT a Portuguese national-exam assessment.
`app/lib/server/preview-verified-pilot.js` supplies only the stem,
options and question IDs. Correct options are present in the
server-only SQL function in migration 010. This protects against
client-provided grade fields, **not** determined attackers who can
read the source repository or discover correct answers elsewhere.

**Protocol:** the route `/api/internal/verified-pilot` is disabled
unless all of these conditions hold simultaneously: explicit
`APPROVA_VERIFIED_PILOT_ENABLED=YES`, Vercel
`VERCEL_ENV=preview`, exact isolated Vercel project ID and exact
isolated Neon hostname/database name allowlist. The route never
uses browser-provided account IDs. It requires the Neon Auth server
session, provisions `app_users` via `ensureAppUser` **only on the
explicit POST start**, and rejects cross-origin POSTs. GET is read-only
and never provisions a user account.

- POST `{"action":"start"}`: `INSERT ON CONFLICT DO NOTHING`
  creates at most one attempt per student+pilot. Subsequent requests
  continue the same immutable session; no restart.
- POST `{"action":"answer","questionId":"q1","choiceIndex":1}`:
  PostgreSQL conditionally appends an answer only if that question
  was never answered and the session remains unfinished. Replaying
  or changing a submitted answer cannot overwrite it.
- POST `{"action":"finish"}`: an owner-only PostgreSQL function
  atomically transitions to complete only when all seven answers
  exist, computes the seven deterministic results **inside SQL**
  from the stored answers, and appends one unique
  `verified_completion_receipts` row. The receipt's SHA-256
  reflects those stored choices, not a claimed client score.
  Duplicate finishes return the same receipt; mismatched receipt
  state aborts the transaction. The synthetic award is 5 XP per
  correct answer, limited to 35. **It must not enter real ranking.**
- GET returns only the own session status, answered question IDs and
  (only after completion) the XP from a matching, trusted reward receipt.
  It never reveals correct keys or client-claimed grades. A completed
  attempt without its receipt fails closed. Answers are selected-choice
  integers only; no free-text response is sent.

**Evidence required:** CI must prove client roles cannot read/write
sessions or execute the finalizer; first-start idempotence;
no answer rewrites; incomplete finish denied; all seven original
question keys synchronized with grading SQL; one exact-once reward;
no cross-user award leak; owner-only receipt. Unit tests cover
feature gate, requests with wrong identities/grades, CSRF and
session absence. No real Neon Auth JWT and no browser E2E is
involved in these synthetic tests.

**Explicit limitations:** The pilot is not wired into real
diagnósticos, missões, treinos or mini-exames, and it cannot
correct Portuguese or FQ A free responses. Questions and answer
keys are visible in repository source. There are no official
test blueprints, cheating heuristics, proctoring, rate limits or
validated account-consent flows. This proves a **server-side award
protocol in a disposable experiment**; it does not prove that
real pupils deserve XP or that the production app is antifraud.
PR #450 pedagogical integrity changes remain separate.

## Rollback / independent gate

The SQL transaction rolls back automatically on an error **during execution**. After commit, a blind rollback to the previous broad grants would knowingly reintroduce unsafe access and is prohibited. Prefer fix-forward with a reviewed compatible migration, and preserve historical data. Test application-level compatibility and login before any rollout.

The added Vitest test is a static guard, **not** a real RLS or privacy audit.

**Security regression tested:** client cannot insert/update `app_users`, including forged provider email or creation timestamps; owner-based server flow can update its legitimate identity row; the client may update education fields in `student_profiles` but cannot choose immutable timestamps. Live Neon Auth user sign-in, end-to-end Data API JWT verification, session expiry and cross-user consent must still be tested separately.

The dedicated workflow `.github/workflows/neon-rls-synthetic.yml` starts a **fresh disposable PostgreSQL 16 container**, creates roles and only three hardcoded synthetic identities, applies migration 009 using the synthetic DB owner, and asserts SQL-level RLS isolation, parental access/revocation, direct-write denial, CAS idempotency and historical snapshot insertion. There is **no Neon connection, secret or copied data**. Its `request.jwt.claim.sub` is a fixture variable, **not** a cryptographically verified JWT. Passing this workflow demonstrates migration SQL and PostgreSQL role-policy behavior only.

**Important CAS limitation and staged fix:** original schema 8 still allows browser-initiated cloud writes without a CAS condition. The revised `009` Draft now includes direct-write revocation and a new server-side CAS endpoint, as detailed above. Nothing has been applied to Neon or deployed, and CAS still does not authenticate claimed XP/completions.

The general release-recovery gate intentionally fails if a release candidate includes a database/API migration; this security-only PR should **not** weaken or bypass that gate. It needs its separate migration-specific approval and a later authorized integration/release plan.

**Decision:** GO to review this Draft; NO-GO to run SQL, use real accounts, merge #450 or ship the app. This proposal is separate from the academic-integrity work.
