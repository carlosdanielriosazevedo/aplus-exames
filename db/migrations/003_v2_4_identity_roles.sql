-- A+ Exames v2.4 — identidade, roles e ligação parental

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id text not null unique,
  display_name text,
  email_snapshot text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists app_user_roles (
  user_id uuid not null references app_users(id) on delete cascade,
  role text not null check (role in ('student','parent','reviewer','admin')),
  granted_at timestamptz not null default now(),
  granted_by uuid references app_users(id) on delete set null,
  primary key (user_id,role)
);

create table if not exists student_profiles (
  user_id uuid primary key references app_users(id) on delete cascade,
  school_year text,
  recent_grade smallint check (recent_grade between 0 and 20),
  goal smallint check (goal between 10 and 20),
  syllabus_progress text,
  exam_timing text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists parent_invites (
  id uuid primary key default gen_random_uuid(),
  student_user_id uuid not null references app_users(id) on delete cascade,
  target_email text,
  token_hash text not null unique,
  status text not null default 'pending' check (status in ('pending','accepted','expired','cancelled')),
  expires_at timestamptz not null,
  accepted_by_user_id uuid references app_users(id) on delete set null,
  created_at timestamptz not null default now(),
  accepted_at timestamptz
);

create table if not exists student_parent_links (
  id uuid primary key default gen_random_uuid(),
  student_user_id uuid not null references app_users(id) on delete cascade,
  parent_user_id uuid not null references app_users(id) on delete cascade,
  status text not null default 'active' check (status in ('active','removal_pending','revoked')),
  created_from_invite_id uuid references parent_invites(id) on delete set null,
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique(student_user_id,parent_user_id)
);

create table if not exists parent_link_change_requests (
  id uuid primary key default gen_random_uuid(),
  link_id uuid not null references student_parent_links(id) on delete cascade,
  requested_by_user_id uuid not null references app_users(id) on delete cascade,
  request_type text not null check (request_type in ('remove')),
  status text not null default 'pending' check (status in ('pending','confirmed','rejected','cancelled')),
  confirmed_by_user_id uuid references app_users(id) on delete set null,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists idx_app_roles_role on app_user_roles(role,user_id);
create index if not exists idx_parent_invites_student on parent_invites(student_user_id,status);
create index if not exists idx_parent_links_student on student_parent_links(student_user_id,status);
create index if not exists idx_parent_links_parent on student_parent_links(parent_user_id,status);
