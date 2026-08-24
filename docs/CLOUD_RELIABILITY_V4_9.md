# Cloud Reliability — v4.9

## Objetivo

Impedir que dois dispositivos da mesma conta se sobrescrevam silenciosamente.

Exemplo que esta versão passa a proteger:

1. aluno estuda no telemóvel;
2. abre o portátil que ainda conhece uma versão antiga;
3. tenta guardar;
4. a cloud já avançou;
5. a escrita do portátil é bloqueada;
6. a app mostra um conflito e pede uma decisão explícita.

## Revisões

`student_cloud_state` passa a ter:

- `revision`
- `last_device_id`

Cada gravação segura usa **compare-and-swap**:

`UPDATE ... WHERE revision = expected_revision`

Se outra sessão/dispositivo já avançou a revisão, zero linhas são alteradas e a app
trata isso como conflito.

Não existe last-write-wins silencioso.

## Device ID

Cada instalação/browser recebe um identificador local aleatório.

Serve apenas para:
- diagnosticar de que dispositivo veio a última gravação;
- explicar conflitos;
- auditoria técnica.

Não é password nem credencial.

## Revision 0

A v4.9 distingue:

- **primeiro save sem linha conhecida** → INSERT;
- **linha já carregada com revision 0** → UPDATE compare-and-swap.

Isto é necessário para migrar estados cloud antigos sem criar um loop de conflitos.

## Conflitos

A interface oferece três ações explícitas:

### Manter cloud
A versão local é guardada num snapshot e a cloud passa a ser a base do dispositivo.

### Manter este dispositivo
A app tenta substituir a cloud **apenas se a revisão remota ainda for a mesma**.
Se mudou novamente, bloqueia outra vez.

### Combinar atividade
Combina evidências pedagógicas, Missões, exames e sinais independentes pelos seus IDs
estáveis, volta a recalcular Domínio/Certeza e tenta guardar sobre a revisão remota.

O merge é deliberadamente conservador:
- nunca confia diretamente em Domínio/Confiança armazenados pelos dois lados;
- reúne evidência e força recalibração;
- mantém preferências/intenção atual do dispositivo local;
- usa o maior XP total conhecido para evitar duplicação artificial.

## Snapshots locais

Antes de carregar, substituir ou combinar dados, é criado um snapshot local.

São mantidos até 8 snapshots recentes no browser.

Mesmo que uma decisão de conflito seja posteriormente considerada errada, existe
uma rede de recuperação local.

## Snapshots no servidor

Migration:

`db/migrations/006_v4_9_cloud_revisions.sql`

Adiciona também `student_cloud_state_history`.

Um trigger PostgreSQL guarda automaticamente a versão anterior antes de cada UPDATE.

A aplicação autenticada pode ler o seu próprio histórico por RLS, mas não escrever
diretamente nessa tabela.

## Fila de tentativas

Se uma gravação falha por rede/indisponibilidade:
- o progresso local continua;
- a tentativa é guardada localmente;
- pode ser repetida manualmente.

Uma falha de rede não transforma estudo offline em perda de progresso.

## Segurança

São problemas diferentes:

**RLS**
protege utilizador A contra acesso aos dados do utilizador B.

**Optimistic concurrency**
protege dois dispositivos do próprio utilizador A contra sobrescritas acidentais.

Precisamos das duas.

## Estado de ativação

A arquitetura está implementada, mas não ativa serviços externos.

Antes de usar cloud real:
1. provisionar/confirmar Neon Auth + Data API;
2. aplicar migrations até `006_v4_9_cloud_revisions.sql`;
3. configurar env vars;
4. testar duas sessões/dispositivos reais;
5. testar conflitos deliberados;
6. só depois considerar sync automático.

Até lá, a app continua local-first.
