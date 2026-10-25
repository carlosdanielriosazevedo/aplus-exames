# APProva+ — preparação real da publicação, 25/10/2026

Esta execução foi autorizada explicitamente para integrar apenas #413 e preparar a recuperação no projeto real, mantendo #412 sem merge e sem promoção de domínios. Atualiza os estados pendentes dos relatórios de 24/10 e da preparação inicial de 25/10.

## A. Candidata consolidada

PR funcional única: #412. Head anterior validado `660b4d5a19671f44e10b23820d75f7c6119bb16d`; head com política `c738866bd89f881f9528483ebded56a16b474da0`; head final `3f9e99fca8a926d16a2ee173db069fe2ec614ab1`, árvore `f7bd0db2035d75fd0f9391e75506dd437e936f60`.

O commit de política integra a main que já contém o controlo. Comparação GitHub660b4d5…c738866: **um ficheiro e uma linha** — main:true→false em vercel.json. O commit final adicional corrige três asserções desatualizadas de deploymentFreeze.test.js que ainda exigiam main:true. Exigem agora main:false e nenhum valor diferente de false em qualquer regra, mantendo os testes das branches específicas e wildcard. Todos os bytes da aplicação, API, BD, conteúdo, dependências e workflow são iguais aos da candidata ensaiada. Não há merge da #412 em main.

Mantém a cadeia #385/#387 através de #390, #393–#405, #407/#409/#410/#411 e exclui #406/#408. #388/#389 servem de referência de recuperação.

## B. Alterações efetuadas nesta fase

- #413 integrada, sem alterações funcionais: apenas política main:false. Head da PR `bbceb1ee873cb7f319e8016c85a0905b9af88771`; merge/main `5c4402b3d7059a72ccb31a44294cac9ac992ad18`.
- Definição do projeto real `autoAssignCustomDomains:false` aplicada por conector e confirmada no painel autenticado: Production, Disabled, checkbox desmarcada, Save indisponível. O conector omite este campo na leitura; a confirmação veio da UI, não de inferência pelo PATCH.
- Criado um deployment manual de recuperação no projeto real, target production, sem promover domínios.
- Branch da #412 atualizada para preservar o controlo e executar CI na árvore final preparada. A PR continua sem merge.

Não foram alterados valores de variáveis, trusted origins, autenticação, schemas, grants, RLS ou dados de alunos.

## C. Validação

| Execução | SHA/resultado |
| --- | --- |
| CI #413 antes da integração, run40179073959/job121126014125 | bbceb1ee, SUCCESS integral |
| CI main após integração, run40179649654 | 5c4402b3, SUCCESS integral |
| CI inicial após controlo, run40180012456 | c738866, FAILURE: 833/836 unitários PASS; três asserções antigas exigiam main:true |
| CI final após corrigir contrato, run40180782011 | 3f9e99fc, SUCCESS integral |
| Build Vercel da recuperação | READY, SHA2615dc45 |
| Health da recuperação | HTTP200, backendReachable=true, schemaVersion8, migration008_pilot_telemetry_consent, regiãofra1 |
| Candidata→recuperação real com dados locais sintéticos | Matemática A, Português e FQ A: PASS, duas respostas conservadas, identidade/posição/resultados preservados |
| Guardas de escrita do ensaio | Bloqueio de métodos não GET/HEAD/OPTIONS e asserção de zero tentativas de escrita em cada contexto; processo exit0 |

Os resultados anteriores continuam válidos para o código da aplicação que não mudou: 836 unitários, 114 browser, 12 cenários mobile nas quatro larguras, 6 desktop/Rever Matéria, 3 percursos completos, Technical Gate, Grader Quality, auditorias e orçamento do bundle total por rota. Recuperação: 770 checks integrais, 805 unitários, 27 browser e contrato555 PASS. O teste autenticado real de25/10 passou signup/login, reload, guardar/carregar cloud, XP, consentimento/revogação e logout.

O browser de ensaio usou o proxy do ambiente com a respetiva cadeia de certificados ignorada; não é uma auditoria TLS. Não foram alteradas proteções do serviço. Links temporários dos dois deployments revogados após o ensaio. Não se promoveu a recuperação para testar permissões reais de promoção.

## D. Recuperação preparada no projeto real

Projeto: `prj_H0nD83gkRwu7Id05OhzL4CC60s4M`.
Deployment: **`dpl_6SbcBr1MuiwN7DMH2eK5jxjSMEkp`**.
URL imutável: `https://aplus-exames-b1i1www76-carlos-rios-azevedo-s-projects.vercel.app`.
SHA: `2615dc45b155d6d515a55a1c523198aab1a4cd1b`, runtime igual ao Preview1625a727 ensaiado; o descendente só atualiza o contrato de teste.
Target: production. Estado: READY. Região: fra1.

O build selecionou as variáveis production já existentes do próprio projeto. Não foram lidos nem copiados secrets ou transplantados valores do ambiente sintético. A saúde foi verificada por SELECT1 e leitura de metadados do schema, sem migrações. A continuação foi testada apenas em perfis novos, com snapshots sintéticos locais e sem conta real; não houve operações sobre registos de alunos.

Este ID é o destino preparado para recuperação de código compatível com os ensaios. Não usar98e811f/90b55fe após a atualização. Não promete corrigir um defeito desconhecido nos módulos de segurança partilhados nem recuperar dados apagados sem cópia. Nesses casos, correção progressiva, preservação bruta do storage e reconciliação específica continuam necessárias. Backup/PITR real não foi testado nesta execução e não é apresentado como disponível.

## E. Vercel — controlo efetivo

O controlo foi confirmado no ficheiro remoto do SHA5c4402b3: main:false. Inventário completo de todos os estados no intervalo desde2026-10-25T09:11:50Z, limite100 e resultado1: apenas a recuperação manual6Sbc… READY. Nenhum objeto automático, incluindo CANCELED/QUEUED/BLOCKED, para a ativação do controlo. Não se confunde ausência de deployment com ausência de CI: o CI de main passou.

O staging mudou um alias técnico automático da conta e criou o alias da referência Git, como observado no lab. Os domínios públicos www.approvamais.pt e approvamais.pt permaneceram no BNT57. Não afirmar congelamento de todos os aliases.

O laboratório privado demonstrou que reativar Git publica o head atual e que Ignored Build Step cria objetos CANCELED. Mantém-se Git bloqueado; não o reativar como limpeza. A atribuição automática de domínios também permanece desativada. Foi necessário um build real de recuperação, sem nova BD ou serviço pago. Não foram medidos custos de CPU/faturação nem se afirma custo zero.

## F. Serviço público

Os dois domínios continuam no deployment **`dpl_BNT57a7tuSrhSiYj9yqsadJwspQ9`**, READY, SHA **`98e811f8be6139f15e89de38c5b5e335dc631bdc`**.

Main tem agora5c4402b3, que só altera a política; isto não significa que o serviço público esteja no novo SHA. A recuperação está preparada em production como artefacto staged, mas não servida pelos domínios públicos. Não foi feito rollback, promoção, merge da #412, migração, reset ou escrita sobre dados reais.

## G. Decisão

**GO técnico para a próxima fase de integração controlada da #412.** Os bloqueios técnicos desta preparação foram resolvidos com execução real. A #412 fica Ready for review, sem merge e sem auto-merge. A promoção pública continua condicionada ao CI do SHA de merge e à validação do deployment funcional exato; esse artefacto ainda não foi criado nem promovido. A autorização desta fase foi respeitada: apenas #413 integrada e recuperação preparada, mantendo os domínios atuais.

Revisão humana continua adiada/não validada. O lane correspondente de Content Readiness não autoriza produção comercial; o gate do piloto controlado é separado e passou, conforme o próprio repositório. Preservar a política existente e productionEligible=false. A publicação visual/técnica não é uma alteração dessa política.

## H. Próxima fase — uma publicação funcional deliberada

1. Confirmar head da #412 igual a 3f9e99fc e CI integral aprovado. Manter os domínios no BNT57 e o controlo/atribuição automática desativados. A autorização desta execução não inclui integrar #412 nem promover domínios.
2. Na fase de integração funcional autorizada, fazer merge único da #412 com expected head 3f9e99fc. Guardar o SHA de merge devolvido; verificar árvoref7bd0db e main:false. Se a árvore diferir, interromper e repetir os testes necessários.
3. Exigir CI integral no SHA de merge efetivo e inventário sem deployment automático, em todos os estados. Não presumir que o CI de um SHA anterior aprova outro.
4. Criar uma única implantação funcional deliberada no projeto real, target production, com gitSource tipo github, repoId1338890258 e ref/sha iguais ao SHA de merge aprovado. Não usar um branch flutuante nem o ID do Preview sintético. O artefacto de recuperação já existe; não reconstruí-lo sem necessidade.
5. Esperar READY, verificar ID/SHA/target/região, health e continuação sintética sem escritas; confirmar os dois domínios ainda no BNT57. Não executar os smokes que criam contas/gravam cloud/consentimento em produção. Se falhar, não promover e manter o serviço atual.
6. Após GO dos gates do artefacto, `request_promote` no projeto real e **nesse mesmo ID validado**, sem rebuild. Confirmar ambos os domínios no novo ID, acessíveis. Uma promoção pública funcional; recuperação6Sbc disponível sem a promover no caminho normal.
7. Em incidente compatível com os ensaios, usar o ID de recuperação6Sbc, não98e811f nem um Preview sintético. Em defeito partilhado de integridade, seguir correção progressiva específica. Não limpar storage nem restaurar cegamente a BD.
8. Registar SHAs, IDs, inventário, aliases, gates e resultados na #373. Deixar Git bloqueado e atribuição automática desativada; reposição exige outra decisão operacional deliberada.

O procedimento anterior com payloads completos está em `production-staging-412.md`; esta atualização substitui os passos já executados e fornece o ID real de recuperação em vez de um placeholder.


## Correção do contrato de controlo

A falha40180012456 foi investigada nos logs: não foi falha da aplicação nem desativação acidental da segurança. Os testes antigos exigiam explicitamente a política automática anterior. Foi alterado apenas o contrato para a política deliberadamente aprovada. Três testes mantidos, sem aumentar limites nem eliminar casos; focused3/3 PASS, syntax628 ficheiros PASS e Technical GateGO. Controlo negativo local: reintroduzir main:true faz o contrato falhar (resultado esperado), e a configuração foi reposta byte a byte. Novo CI integral40180782011, não uma reclassificação da execução falhada.


## Aliases confirmados no fecho

- www.approvamais.pt, approvamais.pt, aplus-exames.vercel.app e aplus-exames-git-main-carlos-rios-azevedo-s-projects.vercel.app: BNT57/98e811f.
- aplus-exames-carlos-rios-azevedo-s-projects.vercel.app: recuperação6Sbc/2615dc45. É o alias técnico automático que mudou durante staging, não uma promoção dos domínios públicos.

Reprodução do ensaio readonly: Node24.22.1 e Playwright1.55, ficheiro `tests/release-evidence/production-recovery-probe.mjs`, tokens temporários em CANDIDATE_SHARE/RECOVERY_SHARE e PLAYWRIGHT_BROWSERS_PATH. Nunca versionar tokens. O teste usa perfis novos, snapshots locais sintéticos e falha perante qualquer tentativa de escrita. Logs e health estão anexados nesta branch de evidência.
