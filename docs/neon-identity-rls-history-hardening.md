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

## Rollback / independent gate

The SQL transaction rolls back automatically on an error **during execution**. After commit, a blind rollback to the previous broad grants would knowingly reintroduce unsafe access and is prohibited. Prefer fix-forward with a reviewed compatible migration, and preserve historical data. Test application-level compatibility and login before any rollout.

The added Vitest test is a static guard, **not** a real RLS or privacy audit.

**Security regression tested:** client cannot insert/update `app_users`, including forged provider email or creation timestamps; owner-based server flow can update its legitimate identity row; the client may update education fields in `student_profiles` but cannot choose immutable timestamps. Live Neon Auth user sign-in, end-to-end Data API JWT verification, session expiry and cross-user consent must still be tested separately.

The dedicated workflow `.github/workflows/neon-rls-synthetic.yml` starts a **fresh disposable PostgreSQL 16 container**, creates roles and only three hardcoded synthetic identities, applies migration 009 using the synthetic DB owner, and asserts SQL-level RLS isolation, parental access/revocation, direct-write denial, CAS idempotency and historical snapshot insertion. There is **no Neon connection, secret or copied data**. Its `request.jwt.claim.sub` is a fixture variable, **not** a cryptographically verified JWT. Passing this workflow demonstrates migration SQL and PostgreSQL role-policy behavior only.

**Important CAS limitation:** the smoke test proves that a write carrying `WHERE revision = expected` rejects a stale revision. Existing `student_cloud_state` RLS does **not** force an authenticated client to include that predicate or increment revisions sequentially. An altered client can still submit a different UPDATE shape to its own row. Server-enforced CAS and durable academic receipts require a separate, server-controlled write contract; do not infer that migration 009 solves this.

The general release-recovery gate intentionally fails if a release candidate includes a database/API migration; this security-only PR should **not** weaken or bypass that gate. It needs its separate migration-specific approval and a later authorized integration/release plan.

**Decision:** GO to review this Draft; NO-GO to run SQL, use real accounts, merge #450 or ship the app. This proposal is separate from the academic-integrity work.
