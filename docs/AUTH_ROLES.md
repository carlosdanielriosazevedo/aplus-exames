# A+ v2.4 — Identidade, Neon Auth e permissões

## Decisão

A A+ não vai implementar passwords, recuperação de password, sessões ou OAuth de raiz.

A autenticação será delegada ao Neon Auth. A aplicação mantém apenas as regras de negócio:
- Aluno
- Pai/Mãe
- Professor Revisor
- Admin

A identidade autenticada (`auth_user_id`) é ligada à tabela `app_users`.

## Porque separar Auth de Roles

Autenticação responde:
> Quem és?

Autorização da A+ responde:
> O que podes fazer?

Um utilizador autenticado não ganha automaticamente acesso a revisão pedagógica ou administração.

## Roles

### student
- diagnóstico;
- missões;
- treino;
- progresso;
- exames;
- criação de convite parental.

### parent
- dashboard parental;
- evolução e consistência do aluno ligado;
- não vê cada resposta individual.

### reviewer
- painel de revisão;
- reports de conteúdo;
- lotes editoriais.

### admin
- qualidade;
- beta;
- revisão;
- gestão futura de roles;
- acesso operacional.

`reviewer` e `admin` nunca podem ser escolhidos pelo utilizador no registo.

## Ligação Pai/Mãe ↔ Aluno

Fluxo:
1. aluno introduz email do encarregado;
2. servidor cria token criptograficamente seguro;
3. BD guarda apenas `token_hash`;
4. email recebe link privado;
5. encarregado autentica/cria conta;
6. token é validado, email é comparado e convite é consumido;
7. cria-se `student_parent_links`.

Não existe pesquisa pública de utilizadores.

## Remoção da ligação

No fluxo normal, uma das partes cria um pedido.
A outra parte confirma.
Só depois a ligação fica `revoked`.

A administração poderá intervir em situações excecionais.

## Estado da v2.4

A UI inclui um **modo demo de papéis** para testar todas as experiências sem autenticação real.
Isto não é uma fronteira de segurança e nunca deve ser usado como tal em produção.

Quando Neon Auth estiver ativado:
- remover/ocultar o role switcher fora de ambientes internos;
- resolver `auth_user_id` da sessão;
- carregar roles da BD;
- proteger API routes server-side;
- associar sincronização beta ao utilizador autenticado.
