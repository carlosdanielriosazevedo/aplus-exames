-- Prepare exactly one uncompleted synthetic attempt for two concurrent
-- PostgreSQL clients. Never run this against Neon.
SET ROLE neondb_owner;
INSERT INTO public.app_users(id,auth_user_id,display_name)
VALUES('dddddddd-dddd-4ddd-8ddd-dddddddddddd','synthetic-race-student','Synthetic race');
INSERT INTO public.preview_verified_math_sessions(auth_user_id,answers)
VALUES('synthetic-race-student',
       '{"q1":1,"q2":0,"q3":2,"q4":0,"q5":2,"q6":1,"q7":0}'::jsonb);
RESET ROLE;
