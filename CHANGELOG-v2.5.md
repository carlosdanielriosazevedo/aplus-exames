# A+ Exames — v2.5

## Conta real + Progresso na Cloud

### SDK Neon unificado
- adicionada dependência `@neondatabase/neon-js` 0.7.0-beta;
- cliente único para Neon Auth + Data API;
- configuração só ativa quando existem:
  - `NEXT_PUBLIC_NEON_AUTH_URL`
  - `NEXT_PUBLIC_NEON_DATA_API_URL`.

### Conta A+
Novo ecrã:
- Criar conta;
- Entrar;
- detetar sessão;
- Terminar sessão.

As passwords são processadas pelo Neon Auth, não pela base de negócio da A+.

### Progresso entre dispositivos
Utilizador autenticado pode:
- guardar progresso local na cloud;
- carregar progresso remoto para o dispositivo.

A sincronização é manual nesta primeira versão para podermos estudar conflitos antes de automatizar.

### Dados sincronizados
- objetivo;
- perfil;
- Domínio/Certeza/evidência;
- XP/streak;
- diagnóstico;
- Missões;
- sinais de Treino;
- Mini-exames.

Não são enviados dados administrativos/revisão editorial como parte do estado do aluno.

### PostgreSQL RLS
Nova tabela:
`student_cloud_state`

Acesso protegido por:
`auth.user_id() = auth_user_id`

A role anónima é explicitamente revogada.

Migração:
`db/migrations/004_v2_5_student_cloud_rls.sql`

### Modo local continua
Se Neon Auth/Data API não estiverem configurados:
- a app não quebra;
- não pede credenciais falsas;
- continua integralmente em modo local.

### Próxima validação necessária
Depois de ligar Neon no projeto real:
1. criar duas contas de teste;
2. guardar progresso;
3. confirmar isolamento RLS;
4. entrar na mesma conta noutro dispositivo;
5. carregar progresso;
6. testar conflitos e falhas de rede.
