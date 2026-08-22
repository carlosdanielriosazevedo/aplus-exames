# A+ Exames — v2.4

## Identidade, Perfis e Permissões

### Nova camada de identidade
- `app/lib/identity.js`
- roles: `student`, `parent`, `reviewer`, `admin`
- matriz explícita de capacidades
- role ativo separado da identidade autenticada

### Modo demo de contas
Novo painel interno para simular:
- Aluno
- Pai/Mãe
- Professor Revisor
- Admin

O role switcher é apenas uma ferramenta de prototipagem e não constitui segurança.

### Ligação parental
- não existe pesquisa pública;
- aluno cria convite privado;
- validade conceptual de 7 dias;
- utilização única;
- aceitação pelo Pai/Mãe;
- modelo de remoção com confirmação da outra parte.

### Base de dados
Novas tabelas:
- `app_users`
- `app_user_roles`
- `student_profiles`
- `parent_invites`
- `student_parent_links`
- `parent_link_change_requests`

Incluída migração:
`db/migrations/003_v2_4_identity_roles.sql`

### Auth real
Foi criada a separação arquitetural:
- Neon Auth: autenticação/sessão;
- A+ Postgres: perfil, roles e relações.

Nenhuma password é implementada pela A+.

### API
`GET /api/auth/capabilities`
permite verificar se o ambiente tem Neon Auth configurado sem expor segredos.

### Ainda falta
- ativar Neon Auth no projeto Neon;
- integrar o SDK oficial na interface;
- criar sign-in/sign-up real;
- resolver sessão no servidor;
- proteger endpoints por role;
- enviar convites parentais por email.
