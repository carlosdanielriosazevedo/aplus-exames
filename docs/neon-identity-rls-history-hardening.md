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

## Rollback / independent gate

The SQL transaction rolls back automatically on an error **during execution**. After commit, a blind rollback to the previous broad grants would knowingly reintroduce unsafe access and is prohibited. Prefer fix-forward with a reviewed compatible migration, and preserve historical data. Test application-level compatibility and login before any rollout.

The added Vitest test is a static guard, **not** a real RLS or privacy audit.

**Security regression tested:** client cannot insert/update `app_users`, including forged provider email or creation timestamps; owner-based server flow can update its legitimate identity row; the client may update education fields in `student_profiles` but cannot choose immutable timestamps. Live Neon Auth user sign-in, end-to-end Data API JWT verification, session expiry and cross-user consent must still be tested separately.

The dedicated workflow `.github/workflows/neon-rls-synthetic.yml` starts a **fresh disposable PostgreSQL 16 container**, creates roles and only three hardcoded synthetic identities, applies migration 009 using the synthetic DB owner, and asserts SQL-level RLS isolation, parental access/revocation, direct-write denial, CAS idempotency and historical snapshot insertion. There is **no Neon connection, secret or copied data**. Its `request.jwt.claim.sub` is a fixture variable, **not** a cryptographically verified JWT. Passing this workflow demonstrates migration SQL and PostgreSQL role-policy behavior only.

**Important CAS limitation:** the smoke test proves that a write carrying `WHERE revision = expected` rejects a stale revision. Existing `student_cloud_state` RLS does **not** force an authenticated client to include that predicate or increment revisions sequentially. An altered client can still submit a different UPDATE shape to its own row. Server-enforced CAS and durable academic receipts require a separate, server-controlled write contract; do not infer that migration 009 solves this.

The general release-recovery gate intentionally fails if a release candidate includes a database/API migration; this security-only PR should **not** weaken or bypass that gate. It needs its separate migration-specific approval and a later authorized integration/release plan.

**Decision:** GO to review this Draft; NO-GO to run SQL, use real accounts, merge #450 or ship the app. This proposal is separate from the academic-integrity work.
