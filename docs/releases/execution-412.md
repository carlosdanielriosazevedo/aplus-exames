# APProva+ — execução de 24/10/2026

Atualização de 25/10/2026: **validação técnica da candidata concluída; NO-GO para publicação imediata até fechar a preparação operacional no projeto real**. Candidata técnica consolidada na PR #412, Draft, sem merge. Este registo atualiza o relatório inicial `docs/releases/rc-412-readiness.md`, que descrevia gates entretanto concluídos. Referência central: Issue #373.

## A. Consolidação

Base/main: `98e811f8be6139f15e89de38c5b5e335dc631bdc`.
Candidata #412: `660b4d5a19671f44e10b23820d75f7c6119bb16d`, árvore `c2a874ca8190c6029116280d9481d183be4f406e`.

Inclui #390 (combinação #385/#387), #393/#394, #395–#399, desktop #400–#403 e mobile #404/#405/#407/#409/#410/#411. #406/#408 excluídas, confirmado pela ancestralidade Git. #388/#389 são referências de recuperação, não uma integração concorrente. #411 original permanece inalterada nesta retoma.

Não há diferenças de `app/api` ou `db` face à produção. Desde #385, a única diferença em `app/lib` é texto de feedback em `constructedResponse.js`, sem alteração das regras ou pontos de avaliação.

## B. Correções

- Guardar currículo deixava de preservar o rascunho ativo e abandonava tentativas. O callback passa a atualizar apenas o currículo, preservando diagnóstico, missão, treino e mini-exame.
- Português/FQ A passam pela introdução do diagnóstico ao abrir o cartão inicial.
- Corrigidos testes desatualizados de onboarding, suites `node:test` não recolhidas pelo Vitest e auditorias textuais desatualizadas de Português/FQ A. Não removidos testes nem aumentados limites.
- Inspeção de screenshots identificou Apronso sobreposto à descrição a 320 px e XP de seis algarismos sobreposto ao menu. Corrigida a âncora da mascote existente nos títulos das três disciplinas e a largura do XP; preservadas as posições do logótipo/seletor.
- Workflow novamente limitado a PRs para main, sem a base transitória da #411. Acrescentados contrato de recuperação e artefactos de browser com retenção de três dias.

## C. Execuções reais

| Verificação | Resultado |
| --- | --- |
| Beta CI original #40123854000 / SHA 620a974 | FAILURE, não aceite como aprovação |
| Beta CI #40134166781, head 660b4d5, job 120992025449 | SUCCESS, todos os passos |
| Unitários candidata | 836/836 PASS |
| Browser integral | 114/114 PASS |
| Mobile reforçado | 12/12 PASS: três disciplinas × 320/360/390/430, quatro menus |
| Desktop e Rever a Matéria | 6/6 PASS: três disciplinas × 1366×768/1920×1080 |
| Percurso completo adicional | 3/3 PASS: onboarding, diagnóstico, Aprender, missão, treino, mini-exame, correção, Progresso e Ranking |
| Technical Gate, Grader Quality e 16 auditorias adicionais | PASS; gate global de três disciplinas GO |
| Build de produção e performance | PASS: total da rota / 350,7/650 KiB; /portugues-mini-exame 449,5/500 KiB |
| Compatibilidade integral | 770 verificações PASS |
| Browser sobre Preview real da candidata | 12 ecrãs PASS, três disciplinas × quatro menus a 390 px; sem tentativas de escrita nesses ensaios |
| Smoke autenticado HTTP no ambiente isolado | PASS: signup/login, cloud, privacidade, consentimento, revogação, erasure dos seus dados de telemetria, CSRF e idempotência |
| Smoke autenticado na interface (25/10) | PASS: signup, login, sessão após reload, guardar/carregar cloud, XP preservado, consentimento/revogação e logout |

CI: https://github.com/carlosdanielriosazevedo/aplus-exames/actions/runs/40134166781
Artefacto de browser: ID `12576910985`, SHA256 `77c2fac` (prefixo; consultar API para digest integral), expira 27/10. Screenshots do CI foram extraídos e inspecionados, incluindo indicadores emoji e seis algarismos de XP a 320 px. Não confundir inspeção de CSS com validação visual.

O browser remoto utilizou o proxy do ambiente e ignorou apenas a cadeia de certificados desse proxy. Estes ensaios não constituem auditoria TLS. A CSP bloqueia o script opcional de feedback da Vercel; não foi relaxada.

Content Readiness: lane de revisão humana 10%, NO-GO nesse lane. A revisão pedagógica adiada não foi executada nem considerada aprovada. O benchmark de Grader Quality não mede concordância humana. Nenhuma política de elegibilidade foi alterada para contornar estes resultados.

## D. Persistência e recuperação

Não usar `98e811f` como rollback depois da atualização: o controlo negativo reproduz remoção de rascunhos antigos. Não foi feito rollback real.

Preparada alternativa derivada de #388/#385 com apenas a correção preservadora do currículo. Branch `codex/recovery-safe-curriculum-412`: runtime `1625a727795dd338b448c99aa195a7337cc393f2`; descendente apenas de teste `2615dc45b155d6d515a55a1c523198aab1a4cd1b`.

- 805/805 unitários, Technical Gate e build/performance PASS.
- 27/27 testes de browser PASS sobre o runtime de recuperação.
- Contrato integral de persistência: 770 PASS. Contrato de identidade/compatibilidade da recuperação: 555 PASS; permite apenas a transformação exata aprovada de SetupScreens, exigindo identidade dos restantes módulos app/db com #385.
- Preview de recuperação `dpl_4st7vDVTvmWnKL9M3VnctJhZMDCR`, READY, SHA runtime 1625a727.
- Transferência de snapshots exclusivamente sintéticos do Preview candidato para o Preview de recuperação: três disciplinas PASS, mantendo duas respostas, posição, identidade, resultados e tempo inicial. `updatedAt` pode avançar pela gravação normal; não foi confundido com perda de respostas.

Os 770 casos cobrem diagnósticos concluídos/incompletos, missão/treino/mini-exame interrompidos, respostas/correções, XP/progresso entre disciplinas, versões 29/31, atualização, leitura pela versão segura anterior, rascunhos antigos/vazios/corrompidos e guardas contra substituição silenciosa. Não são dados reais.

A recuperação foi ensaiada como Preview isolado. Ainda não existe artefacto de recuperação reconstruído com configuração de produção e preparado para promoção no projeto real. A publicação futura deve preparar esse destino seguro; não promover um Preview com variáveis sintéticas para produção.

## E. Vercel — ensaio operacional concluído

Repo privado descartável `applus-vercel-release-lab`, projeto `prj_C4WUG2oe1jjOsVXiwrrlU3pJbPVP`, endereço `https://applus-vercel-release-lab.vercel.app`. Apenas HTML/TXT e CI mínimo, sem backend, BD, domínio personalizado ou dados/código da APProva+.

| Ação | SHA | Deployment/resultado |
| --- | --- | --- |
| Baseline | 3f860817eb9c9d92d706e4c04d0fb71622b7cf2f | dpl_5yZ9y4ezzhibg4DVMVhcPC7Muq3N READY |
| Primeiro commit que ativa false | adc864b1b7e3e23a33d3c822803525f17482373b | Nenhum deployment observado |
| Commit seguinte bloqueado | d3849f10acea514dd05995a1b77e5b64f9f9573e | Nenhum |
| Reativar true | 64c8e7797c759b852bd67d52530657a3d0ac481c | dpl_HVtM2vBDdWVwPxszd2GTUbFEMBXZ READY automático |
| Reativar bloqueio + CI mínimo | 1e59857be9f97a87ebb0690eaa5b560de60906a8 | CI 40134559298 PASS, nenhum deployment |
| Merge PR lab #1 | 6552c637a5aca76fd494ac3806de13a9b5eb9af4 | CI 40134683780 PASS, nenhum deployment |
| Merge PR lab #2 | c8c11fd91da1534a349b13e97763c9c1a556df13 | CI 40134687920 PASS, nenhum deployment automático |
| Criação manual do último SHA, Git false | c8c11fd91da1534a349b13e97763c9c1a556df13 | dpl_GCjg3vwmD5sLCoovZPo8ChDEE2zg READY; uma criação |
| Promover o mesmo ID | mesmo SHA | Alias primário mudou para GCjg, sem rebuild nem novo deployment |
| Ignored Build Step exit 0 + Git true | 4a365b90d841abbe36983598a12fd9e72e1c7162 | dpl_9EmPsM3vBtUygUsACwk5izUwPFw7 CANCELED |
| Segundo commit com ignore | 2c48dd5c3f5213e9ba8e03ef759b05bf09ebf93d | dpl_FpZvxcXTv6YiiyagciSG88SgJubz CANCELED |
| Restaurar false e remover ignore | 93712f95b257de58615a987198c1b9c81bcf46ce | Nenhum novo/replayed; CI 40135036724 PASS |

Inventário final: exatamente 5 objetos, 3 READY e 2 CANCELED, sem QUEUED/BLOCKED. Alias primário mantém GCjg. Os commits acumulados não geraram deployments individuais na reativação anterior: foi publicado o head então atual. **Reativar Git é uma ação de publicação.**

O commit de ativação de false não publicou em dois ensaios, mas isso não garante ausência de corridas em todos os projetos. Ativar antes da integração, aguardar o inventário estabilizar e interromper se surgir deployment inesperado; não usar um merge real como experiência.

Criação manual ensaiada: `create_deployment` com `target:production`, `project:ID_LAB`, `gitSource:{type:github,repoId:1429598883,ref:SHA,sha:SHA}`, mantendo false. Antes, `update_project({autoAssignCustomDomains:false})`. O alias primário continuou no deployment antigo e respondeu HTTP 200 enquanto o novo ID ficou READY e os três ficheiros foram verificados. Depois `request_promote({projectId:ID_LAB,deploymentId:ID_VALIDADO})` alterou o alias primário sem rebuild. Um alias automático da conta mudou durante staging: não se afirma congelamento de todos os aliases.

Git false oferece mais controlo e evita a criação desses objetos de deployment. Ignored Build Step criou dois objetos cancelados e executou a decisão de ignorar. Não foram medidos segundos de CPU nem faturação: não se atribui uma poupança monetária fictícia.

### Ambiente APProva+ isolado e bloqueio atual

Projeto Vercel `prj_8n5XwTMF651SAfsykIDji93oZp3r`; Neon independente `steep-fog-69048956`, branch `br-noisy-unit-b9p6cf1u`, compute `ep-holy-term-b93irruj`, 0,25 CU. Não é clone da base real. Identidade das três ligações confirmada por endpoint temporário só de Preview numa branch separada, sem devolver credenciais nem integrar a #412.

Preview candidato configurado: `dpl_8FAuAULx1K8eQj9iWMYMdjJkFc5o`, SHA 660b4d5, READY. Alias de ensaio `https://applus-beta-synthetic-git-1472c7-carlos-rios-azevedo-s-projects.vercel.app`.

Corrigidos exclusivamente neste ambiente: trusted origin do Neon Auth e variáveis Preview não secretas de política/retenção sintética. O smoke autenticado HTTP passou, incluindo 5 logins (mediana 305,1 ms), cloud, CSRF, privacidade e consentimento. Contas geradas em memória com emails reservados example.com e marcadas como teste antes das escritas; não se recolheram credenciais reais.

**Histórico entretanto superado:** em 24/10 o browser autenticava, mas o preflight CORS da Data API não devolvia `Access-Control-Allow-Origin` para o alias candidato. `get_data_api` mostra a allowlist atualizada; OPTIONS real continua a aceitar apenas a antiga origem de staging. Reiniciar o compute PostgreSQL isolado não resolveu. Não foram enfraquecidos RLS/JWT/CSP, nem aberto wildcard. A allowlist final solicitada conserva a origem anterior e a candidata. Em 25/10, depois de recuperar o ambiente e iniciar o mesmo compute, o teste integral da interface PASSOU. A resposta real da Data API foi HTTP200 com ACAO igual à origem candidata. Não foi necessária nova alteração de configuração nem novo deployment. Registo: `docs/releases/evidence-412/browser-auth-20261025.log`. A causa temporal exata da divergência anterior não foi demonstrada; não atribuir a resolução a uma intervenção não executada.

A conta rejeitou a tentativa de configurar suspensão automática com HTTP 412. Não se declara scale-to-zero configurado nem custo nulo. Sem serviços pagos adicionais ou domínios criados.

## F. Produção

Consulta final: `www.approvamais.pt` → `dpl_BNT57a7tuSrhSiYj9yqsadJwspQ9`, READY/production, SHA `98e811f8be6139f15e89de38c5b5e335dc631bdc`, projeto `prj_H0nD83gkRwu7Id05OhzL4CC60s4M`.

Nenhum merge em main, deployment/rollback real, migração, reset, cópia de secrets ou escrita sobre dados reais nesta execução. A confirmação de não intervenção não é uma auditoria de cada registo de produção: a base real não foi consultada para isso.

## G. Decisão

**Validação técnica da candidata: concluída**, incluindo cloud autenticada pela interface, recuperação e laboratório operacional. **NO-GO para publicação imediata**: a política atual ainda permite deployment automático de main, e ainda não existe artefacto seguro de recuperação reconstruído com configuração de produção no projeto real. Esses preparativos não foram executados devido à separação entre ensaio isolado e intervenção real. Não fazer merge de main:true antes de ativar/verificar o controlo. A revisão humana adiada continua não validada; segundo `scripts/content-readiness.mjs`, o NO-GO desse lane não invalida o piloto controlado, cujo gate próprio passou, nem autoriza produção comercial. Não se introduz aqui uma exigência nova de revisão nem se altera productionEligible=false.

## H. Procedimento reproduzível e próximo passo

1. **Concluído em 25/10:** teste de interface real passou; não repetir alterações da Data API só para reproduzir a falha antiga. Para futuros ensaios, verificar a allowlist já guardada. Confirmar OPTIONS com Origin do alias candidato e `Access-Control-Request-Headers: authorization,x-neon-client-info`. Exigir ACAO igual à origem e headers permitidos, sem wildcard ou alterações de RLS. Repetir `browser-auth.mjs` com share link temporário; exigir signup, sessão após reload, guardar/carregar, XP preservado, consentimento/revogação e logout/login. Se falhar, manter NO-GO.
2. Preservar a política atual de piloto controlado, a revisão humana adiada/não validada e productionEligible=false. Não confundir deploy técnico no ambiente de produção com aprovação de conteúdo para produção comercial. Uma mudança dessa política exige decisão própria; não é parte desta publicação visual/técnica.
3. Rever a #412 no SHA 660b4d5. Qualquer alteração de código requer novo SHA/CI. O CI de PR executou a árvore de merge; registar também o SHA e a árvore efetivamente integrados.
4. Antes de qualquer integração real, preparar uma alteração isolada de política para `git.deploymentEnabled:false` (o ficheiro atual ainda permite main). Não misturar com a integração funcional. Repetir o CI e inspecionar inventário de todos os estados; se surgir publicação, cancelar a sequência e manter NO-GO. Este passo ainda não foi feito no projeto real.
5. Manter Git false na integração única das alterações #385/#387 e da cadeia visual através da #412. A integração não pode repor `main:true`. Verificar a árvore final e CI do SHA final, e ausência de deployments automáticos. Não fazer merges separados das PRs históricas.
6. Preparar recuperação segura com o runtime ensaiado e configuração de produção, mantendo o serviço atual nos domínios públicos. Não usar 98e811f como destino de recuperação após novos dados. Não promover previews com BD sintética.
7. Após todos os gates e decisão explícita de publicação, usar a sequência provada no lab: desativar atribuição automática de domínios personalizados, criar deliberadamente um único deployment de produção fixado no SHA final e com Git false, esperar READY, validar ID/SHA/região/configuração e verificar que TODOS os domínios públicos continuam no ID antigo antes da promoção. A nuance dos aliases automáticos exige verificação, não pressuposição. Não executar o smoke que apaga dados de teste sobre alunos reais.
8. Promover apenas esse ID validado. Confirmar domínios, acessibilidade e smoke não destrutivo. Registar SHA, ID, aliases, gates e hora na #373. Não reativar Git como limpeza: deixá-lo bloqueado para futuras publicações deliberadas, ou tratar a reposição como nova publicação com janela própria.

Reprodução de percurso local: instalar dependências, `npm run build`, `npx playwright test -c tests/release-evidence/journey.playwright.mjs`. Os scripts nesta branch de evidência não alteram a candidata aprovada nem a sua configuração permanente de CI. `browser-auth.mjs` precisa de `RELEASE_SHARE_TOKEN` temporário; o token nunca é versionado. O teste deixa contas exclusivamente sintéticas e não deve ser apontado a produção.


## Atualização final de 25/10 — execução autenticada real

Mesmo head660b4d5 e deployment8FAu; alias de teste confirmado no ID esperado. Acesso temporário criado no alias, sem desativar Deployment Protection, sem versionar o token. Chromium140/Playwright1.55; script `browser-auth.mjs` já versionado na branch de evidência. Resultado process exit0:

```json
{"signupUi":true,"signinUi":true,"reloadSession":true,"cloudSaveLoad":true,"consentUi":true,"academicProgressPreserved":true,"logoutUi":true}
```

A CSP continuou a bloquear apenas o feedback opcional da Vercel; não foi relaxada. Contas sintéticas marcadas como teste antes de cloud/telemetria. Nenhum teste foi removido, asserção enfraquecida ou limite aumentado. Os workflows externos anteriores permanecem FAILURE pelos motivos registados, não foram reclassificados como aprovados. Este PASS é de uma execução distinta, integral e autenticada.


## Preparação operacional posterior — PR #413

Criada PR Draft #413, head `bbceb1ee873cb7f319e8016c85a0905b9af88771`, base98e811f, mudando apenas main:true→false em vercel.json. [Beta CI40179073959](https://github.com/carlosdanielriosazevedo/aplus-exames/actions/runs/40179073959), job121126014125: **SUCCESS**, incluindo browser, unitários, Technical Gate, auditorias e build integral. Nenhum deployment do head no projeto real; inventário por SHA vazio. A integração sintética das configurações da #412 e #413 não tem conflito e preserva main:false, todas as regras false e o mesmo buildCommand.

A PR#413 está preparada para a decisão de ativação real do controlo; não foi integrada e não ativa o bloqueio por estar apenas aberta. A integração funcional única continua na #412. Procedimento com identidades, payloads concretos e gates: `docs/releases/production-staging-412.md`. Prevê dois builds necessários (recuperação+funcional) e uma promoção pública funcional; não é uma declaração de custo zero. Sem artefacto de recuperação de produção criado, sem ID fictício e sem promoção de Preview sintético. Main e projeto real permanecem inalterados nesta preparação.
