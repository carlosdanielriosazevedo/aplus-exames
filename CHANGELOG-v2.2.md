# A+ Exames — v2.2

## Backend Ready + Gates Reais

### Correções de robustez
- Corrigidos imports em falta na instrumentação da v2.1.
- Corrigido o feedback de Mini-exame que estava a aparecer no resultado de Missão.
- Validação sintática feita sobre os módulos e JSX principais.

### Persistência local-first
- Novo `app/lib/persistence.js`.
- A UI deixa de conhecer diretamente a implementação de `localStorage`.
- Existe agora uma fronteira clara para trocar persistência local por sincronização remota.
- Chave local da versão: `a22`.

### Backend preparado, mas não fingido
- Nova rota server-side `/api/health`.
- Nova rota server-side `/api/beta/sync`.
- Sem variáveis secretas configuradas, a sincronização responde deliberadamente `BACKEND_NOT_CONFIGURED`.
- O browser nunca recebe o token secreto do backend.
- Se um backend for configurado mais tarde, a rota funciona como gateway server-side.

### Esquema PostgreSQL
Novo `db/schema.sql` para:
- participantes pseudónimos;
- sessões;
- eventos;
- feedback;
- reports de conteúdo;
- itens editoriais;
- histórico de revisão;
- lotes de revisão.

### Gates de publicação agora aplicados pelo motor
Na v2.1 os gates eram sobretudo auditáveis no painel. Na v2.2 passam a afetar a seleção real:
- Diagnóstico;
- Missões;
- pré-requisitos;
- Treino Livre;
- Mini-exames.

`internal` continua a permitir protótipos.
`closed_beta` e `production` deixam de selecionar itens que não cumprem o estado editorial exigido.

Se um modo protegido não tiver conteúdo suficiente, a interface bloqueia a ação em vez de usar silenciosamente perguntas não aprovadas.

### Painel da Beta
- Verifica se o gateway do backend está configurado.
- Mostra volume local de eventos/sessões/reports.
- Tem botão de sincronização real para quando o backend existir.
- Uma falha de sincronização nunca apaga os dados locais.

### Documentação
- `.env.example`
- `docs/BACKEND_SETUP.md`
- `db/schema.sql`

## Decisão arquitetural
A v2.2 não escolhe ainda definitivamente Supabase, Neon ou outro fornecedor. Primeiro estabiliza o contrato de dados e o gateway. Assim evitamos prender o motor pedagógico a um fornecedor antes de ser necessário.
