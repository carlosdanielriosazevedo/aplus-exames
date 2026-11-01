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
2. Revoke accumulated grants to authenticated/anonymous/PUBLIC on six identity and parent tables; apply precise grants and the ten RLS policies.
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

## Rollback / independent gate

The SQL transaction rolls back automatically on an error **during execution**. After commit, a blind rollback to the previous broad grants would knowingly reintroduce unsafe access and is prohibited. Prefer fix-forward with a reviewed compatible migration, and preserve historical data. Test application-level compatibility and login before any rollout.

The added Vitest test is a static guard, **not** a real RLS or privacy audit.

**Decision:** GO to review this Draft; NO-GO to run SQL, use real accounts, merge #450 or ship the app. This proposal is separate from the academic-integrity work.
