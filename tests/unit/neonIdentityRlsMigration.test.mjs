import {test,expect} from "vitest";
import {readFileSync} from "node:fs";

const sql=readFileSync(new URL("../../db/migrations/009_v5_8_neon_rls_history_hardening.sql",import.meta.url),"utf8");

// Static contract regression only. Real RLS/API authorization requires JWT-based E2E.
test("Neon identity migration uses transaction, strict preflight and postflight",()=>{
  expect(sql).toMatch(/\bBEGIN;[\s\S]*\bCOMMIT;/);
  expect(sql).toMatch(/current_database\(\)/);
  expect(sql).toMatch(/current_user <> 'neondb_owner'/);
  expect(sql).toMatch(/schema_version=8/);
  expect(sql).toMatch(/schema_version=9/);
  expect(sql).toMatch(/RLS\/grant postconditions failed/);
});

test("Neon identity migration revokes previous grants before regranting minimum rights",()=>{
  const revocation=sql.indexOf("REVOKE ALL ON TABLE");
  const firstGrant=sql.indexOf("grant select on table app_users to authenticated");
  expect(revocation).toBeGreaterThan(-1);
  expect(firstGrant).toBeGreaterThan(revocation);
  for(const table of ["app_users","app_user_roles","student_profiles","parent_invites","student_parent_links","parent_link_change_requests"]){
    expect(sql).toContain("alter table "+table+" enable row level security;");
  }
  for(const policy of ["app_users_select_self","app_user_roles_select_self","student_profiles_select_authorized","student_profiles_insert_self","student_profiles_update_self","parent_invites_select_student","student_parent_links_select_party","parent_link_change_requests_select_party"]){
    expect(sql).toContain("create policy \""+policy+"\"");
  }
  expect(sql).toMatch(/FROM authenticated, anonymous, PUBLIC/);
  expect(sql).toContain('grant select on table app_users to authenticated;');
  expect(sql).toContain('drop policy if exists "app_users_insert_self" on app_users;');
  expect(sql).toContain('drop policy if exists "app_users_update_self" on app_users;');
  expect(sql).toContain("('app_users',true,false,false,false,1)");
  expect(sql).toContain("grant update (school_year,recent_grade,goal,syllabus_progress,exam_timing,updated_at) on table student_profiles to authenticated;");
  expect(sql).toContain("Unsafe or incomplete column-level UPDATE privileges");
});

test("Cloud history requires privileged trigger, no direct authenticated writes",()=>{
  expect(sql).toMatch(/REVOKE ALL ON TABLE public\.student_cloud_state_history FROM authenticated, anonymous, PUBLIC/);
  expect(sql).toMatch(/GRANT SELECT ON TABLE public\.student_cloud_state_history TO authenticated/);
  expect(sql).toMatch(/CREATE OR REPLACE FUNCTION public\.snapshot_student_cloud_state\(\)[\s\S]*SECURITY DEFINER[\s\S]*SET search_path=pg_catalog,pg_temp/);
  expect(sql).toMatch(/INSERT INTO public\.student_cloud_state_history[\s\S]*OLD\.auth_user_id[\s\S]*OLD\.state_json/);
  expect(sql).toMatch(/REVOKE ALL ON FUNCTION public\.snapshot_student_cloud_state\(\) FROM PUBLIC, authenticated, anonymous/);
  expect(sql).not.toMatch(/GRANT (INSERT|UPDATE|DELETE) ON TABLE public\.student_cloud_state_history TO authenticated/);
});

test("Every PL/pgSQL block terminates correctly before its dollar-quote",()=>{
  for(const tag of ["preflight","snapshot","postflight","versioncheck"]){
    expect(sql,tag+" must end PL/pgSQL body with END;")
      .toContain("END;\n$"+tag+"$;");
  }
});
