-- Synthetic-only PostgreSQL 16 fixture for CI. NEVER execute against a Neon project.
-- Invoked on a newly-created ephemeral GitHub Actions postgres service.
CREATE ROLE anonymous NOLOGIN;
CREATE ROLE authenticated NOLOGIN;
CREATE ROLE neondb_owner NOLOGIN BYPASSRLS;

CREATE SCHEMA auth;
CREATE FUNCTION auth.user_id() RETURNS text
LANGUAGE sql STABLE
AS $auth$
 SELECT nullif(current_setting('request.jwt.claim.sub', true), '')
$auth$;
GRANT USAGE ON SCHEMA auth TO anonymous,authenticated;
GRANT EXECUTE ON FUNCTION auth.user_id() TO anonymous,authenticated;

SET ROLE neondb_owner;

CREATE TABLE public.app_users(
  id uuid PRIMARY KEY, auth_user_id text NOT NULL UNIQUE, display_name text
);
CREATE TABLE public.app_user_roles(
  user_id uuid NOT NULL REFERENCES public.app_users(id),role text NOT NULL,
  PRIMARY KEY(user_id,role)
);
CREATE TABLE public.student_profiles(
  user_id uuid PRIMARY KEY REFERENCES public.app_users(id),
  school_year text
);
CREATE TABLE public.parent_invites(
  id uuid PRIMARY KEY,student_user_id uuid NOT NULL REFERENCES public.app_users(id)
);
CREATE TABLE public.student_parent_links(
  id uuid PRIMARY KEY, student_user_id uuid NOT NULL REFERENCES public.app_users(id),
  parent_user_id uuid NOT NULL REFERENCES public.app_users(id),
  status text NOT NULL DEFAULT 'active'
);
CREATE TABLE public.parent_link_change_requests(
  id uuid PRIMARY KEY, link_id uuid NOT NULL REFERENCES public.student_parent_links(id)
);
CREATE TABLE public.student_cloud_state(
  auth_user_id text PRIMARY KEY, revision integer NOT NULL DEFAULT 0,
  state_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  last_device_id text, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.student_cloud_state_history(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id text NOT NULL, revision integer NOT NULL,
  state_json jsonb NOT NULL, device_id text, saved_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.app_schema_meta(
  singleton boolean PRIMARY KEY,
  schema_version integer NOT NULL,
  migration_name text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.app_schema_meta(singleton,schema_version,migration_name)
VALUES(true,8,'008_pilot_telemetry_consent');

CREATE FUNCTION public.snapshot_student_cloud_state()
RETURNS trigger LANGUAGE plpgsql AS $body$
BEGIN
  INSERT INTO public.student_cloud_state_history(auth_user_id,revision,state_json,device_id,saved_at)
  VALUES(OLD.auth_user_id,OLD.revision,OLD.state_json,OLD.last_device_id,OLD.updated_at);
  RETURN NEW;
END;
$body$;
CREATE TRIGGER trg_student_cloud_state_snapshot
BEFORE UPDATE ON public.student_cloud_state
FOR EACH ROW EXECUTE FUNCTION public.snapshot_student_cloud_state();

ALTER TABLE public.student_cloud_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_cloud_state_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY student_cloud_state_select_own ON public.student_cloud_state
  FOR SELECT TO authenticated USING ((SELECT auth.user_id())=auth_user_id);
CREATE POLICY student_cloud_state_insert_own ON public.student_cloud_state
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.user_id())=auth_user_id);
CREATE POLICY student_cloud_state_update_own ON public.student_cloud_state
  FOR UPDATE TO authenticated USING ((SELECT auth.user_id())=auth_user_id)
  WITH CHECK ((SELECT auth.user_id())=auth_user_id);
CREATE POLICY student_cloud_state_delete_own ON public.student_cloud_state
  FOR DELETE TO authenticated USING ((SELECT auth.user_id())=auth_user_id);
CREATE POLICY student_cloud_history_select_own ON public.student_cloud_state_history
  FOR SELECT TO authenticated USING ((SELECT auth.user_id())=auth_user_id);

-- Reproduce the insecure pre-009 privilege layout without using real user data.
GRANT SELECT,INSERT,UPDATE,DELETE ON TABLE
 public.app_users,public.app_user_roles,public.student_profiles,
 public.parent_invites,public.student_parent_links,public.parent_link_change_requests,
 public.student_cloud_state,public.student_cloud_state_history
TO authenticated;

INSERT INTO public.app_users(id,auth_user_id,display_name) VALUES
 ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','synthetic-student-a','Test A'),
 ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','synthetic-student-b','Test B'),
 ('cccccccc-cccc-4ccc-8ccc-cccccccccccc','synthetic-parent-p','Test P');
INSERT INTO public.student_profiles(user_id,school_year) VALUES
 ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','11.º'),
 ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','10.º');
INSERT INTO public.app_user_roles(user_id,role) VALUES
 ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','student'),
 ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','student'),
 ('cccccccc-cccc-4ccc-8ccc-cccccccccccc','parent');
INSERT INTO public.student_cloud_state(auth_user_id,revision,state_json,last_device_id) VALUES
 ('synthetic-student-a',0,'{"test":"a"}'::jsonb,'device-a'),
 ('synthetic-student-b',0,'{"test":"b"}'::jsonb,'device-b');
RESET ROLE;
