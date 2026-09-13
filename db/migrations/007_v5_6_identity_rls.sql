-- APProva+ v5.6 — fronteiras reais de autorização para identidade/parental
--
-- Objetivo: impedir que um utilizador autenticado leia ou altere dados de outra
-- conta diretamente através da Data API. Operações privilegiadas (atribuição de
-- roles, aceitação de convites, criação/revogação de ligações) devem passar por
-- código de servidor confiável e NÃO por permissões do browser.

-- Helper lógico repetido nas policies: resolve o app_users.id da sessão atual.
-- auth.user_id() é fornecido pelo Neon Data API a partir do JWT autenticado.

alter table app_users enable row level security;
alter table app_user_roles enable row level security;
alter table student_profiles enable row level security;
alter table parent_invites enable row level security;
alter table student_parent_links enable row level security;
alter table parent_link_change_requests enable row level security;

revoke all on table app_users from anonymous;
revoke all on table app_user_roles from anonymous;
revoke all on table student_profiles from anonymous;
revoke all on table parent_invites from anonymous;
revoke all on table student_parent_links from anonymous;
revoke all on table parent_link_change_requests from anonymous;

-- O browser autenticado pode gerir apenas o seu registo base e o seu perfil de aluno.
grant select, insert, update on table app_users to authenticated;
grant select on table app_user_roles to authenticated;
grant select, insert, update on table student_profiles to authenticated;

-- As tabelas parentais são apenas legíveis pelas duas partes da ligação.
-- Escritas ficam deliberadamente sem grant para authenticated: serão feitas por
-- endpoints server-side depois de validar sessão, role, token e transição de estado.
grant select on table parent_invites to authenticated;
grant select on table student_parent_links to authenticated;
grant select on table parent_link_change_requests to authenticated;

-- app_users: cada sessão vê/cria/edita apenas o próprio utilizador.
drop policy if exists "app_users_select_self" on app_users;
create policy "app_users_select_self"
on app_users for select to authenticated
using (auth_user_id = (select auth.user_id()));

drop policy if exists "app_users_insert_self" on app_users;
create policy "app_users_insert_self"
on app_users for insert to authenticated
with check (auth_user_id = (select auth.user_id()));

drop policy if exists "app_users_update_self" on app_users;
create policy "app_users_update_self"
on app_users for update to authenticated
using (auth_user_id = (select auth.user_id()))
with check (auth_user_id = (select auth.user_id()));

-- Roles: o utilizador pode ler os próprios roles, mas nunca autoatribuir reviewer/admin.
drop policy if exists "app_user_roles_select_self" on app_user_roles;
create policy "app_user_roles_select_self"
on app_user_roles for select to authenticated
using (
  user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
);

-- Perfil de aluno: o aluno lê/escreve o seu. Um encarregado ligado pode apenas ler.
drop policy if exists "student_profiles_select_authorized" on student_profiles;
create policy "student_profiles_select_authorized"
on student_profiles for select to authenticated
using (
  user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
  or exists (
    select 1
    from student_parent_links spl
    join app_users parent_user on parent_user.id = spl.parent_user_id
    where spl.student_user_id = student_profiles.user_id
      and spl.status = 'active'
      and parent_user.auth_user_id = (select auth.user_id())
  )
);

drop policy if exists "student_profiles_insert_self" on student_profiles;
create policy "student_profiles_insert_self"
on student_profiles for insert to authenticated
with check (
  user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
);

drop policy if exists "student_profiles_update_self" on student_profiles;
create policy "student_profiles_update_self"
on student_profiles for update to authenticated
using (
  user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
)
with check (
  user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
);

-- Convites: só o aluno que os criou os pode consultar diretamente.
-- O destinatário aceita através de endpoint de servidor; o token nunca é pesquisável.
drop policy if exists "parent_invites_select_student" on parent_invites;
create policy "parent_invites_select_student"
on parent_invites for select to authenticated
using (
  student_user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
);

-- Ligações: aluno e encarregado veem apenas ligações onde são parte.
drop policy if exists "student_parent_links_select_party" on student_parent_links;
create policy "student_parent_links_select_party"
on student_parent_links for select to authenticated
using (
  student_user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
  or parent_user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
);

-- Pedidos de alteração: visíveis apenas às partes da ligação correspondente.
drop policy if exists "parent_link_change_requests_select_party" on parent_link_change_requests;
create policy "parent_link_change_requests_select_party"
on parent_link_change_requests for select to authenticated
using (
  exists (
    select 1
    from student_parent_links spl
    join app_users current_user_row
      on current_user_row.auth_user_id = (select auth.user_id())
    where spl.id = parent_link_change_requests.link_id
      and current_user_row.id in (spl.student_user_id, spl.parent_user_id)
  )
);

-- Não conceder INSERT/UPDATE/DELETE das tabelas parentais nem de roles a
-- `authenticated`. O facto de existir RLS não substitui esta segunda barreira.
