# F7 — validação e recuperação segura de snapshots (PR #453)

Âmbito exclusivo: F7, sobre `23c748d711347782ffbc9f9045e7de8e5ca57965`, na branch Draft `codex/neon-rls-history-hardening`. Sem merge, deployment, SQL Neon, contas reais ou alterações às migrações 009/010, F5 ou F6. Os resultados finais por SHA e os links dos workflows ficam registados na conversa da PR.

## Reprodução independente

No commit de referência, `validateCloudWrite` aceita um snapshot v8 com `missionHistory: {}`. `safeCloudMerge` recebe-o e lança `TypeError` ao iterar o histórico. O original da reprodução foi guardado fora do repositório antes das alterações. Os testes permanentes exercitam agora o mesmo caso no validador, no merge e na rota HTTP: rejeição controlada, sem modificar os inputs.

A investigação encontrou riscos semelhantes em `examHistory`, `scores.evidence`, `subjectProgress.sessions`, resultados, rubricas, hipóteses pedagógicas, versões e estruturas nulas. O merge anterior também descartava registos sem ID, confundia evidências de itens diferentes com o mesmo completion ID e escolhia silenciosamente uma de duas versões incompatíveis do mesmo registo.

## Contrato e limites

`cloudSnapshotValidation.js` é partilhado pelo servidor, serializer, leitura local e merge. Valida os campos consumidos por cada estrutura; por exemplo, `observations` é contador nas hipóteses e array nas rubricas. Objetos de progresso e linhas de evidência não podem ser nulos; arrays de resultados podem conservar os `null` legítimos produzidos por tentativas incompletas. Campos opcionais ausentes são aceites sem inventar progresso. Extensões aninhadas JSON continuam sujeitas aos limites gerais; não recebem autoridade adicional.

Limites por snapshot: 2.000.000 bytes UTF-8, 25.000 nós incluindo primitivas, profundidade 40, 10.000 elementos por array, 2.000 propriedades por objeto e 65.536 unidades de texto por string. Rejeitam-se números não finitos ou fora do intervalo seguro de JavaScript, valores inválidos para cada campo, estruturas cíclicas/não JSON, arrays esparsos e chaves de protótipo. O resultado combinado volta a ser validado; se exceder o orçamento, a operação bloqueia sem truncar os inputs.

Novas gravações continuam limitadas a v8 e à allowlist de campos. Leituras e revisão aceitam v1–v8 estruturalmente compatíveis e modelos antigos conhecidos. Versões desconhecidas exigem revisão. Testes usam também os produtores reais de mini-exames, sessões de Português/FQ A, rubricas, hipóteses e planos diários.

As respostas privadas continuam removidas pelo serializer e proibidas na API de escrita. Uma leitura/exportação autenticada pode conservar respostas históricas já existentes do próprio utilizador. Campos de XP oficialmente verificado, recibos e outra autoridade oficial continuam proibidos mesmo quando aninhados. XP do snapshot mantém a classificação `client-reported`; a correção não altera avaliação, recompensas oficiais ou conteúdos.

## Quarentena e revisão

Um snapshot remoto malformado produz HTTP 409 `CLOUD_SNAPSHOT_RECOVERY_REQUIRED`; não é entregue aos consumidores automáticos nem substituído por uma gravação normal, incluindo de clientes antigos. O original permanece na base de dados. `GET ?recovery=original&account=...` exporta, sem escrita, o registo original completo com revisão, identidade e digest SHA-256, como attachment privado sem cache. A identidade pedida é comparada com a sessão fresca antes de consultar o armazenamento.

A recuperação é explícita: exportar, rever uma cópia, validar, confirmar e combinar. A confirmação fica vinculada à conta, digest e revisão do original. O servidor repete as verificações e recusa uma cópia que descarte XP ou registos ainda legíveis. Apenas containers malformados vazios/nulos podem ser corrigidos por este percurso conservador; estruturas malformadas não vazias exigem revisão adicional, conservando a exportação. Respostas privadas antigas ficam no original/histórico e na cópia local, nunca são reintroduzidas no payload de escrita.

A atualização continua a usar o CAS atómico existente. Duas reparações concorrentes da mesma revisão têm um único vencedor. O trigger 009 preserva exatamente OLD, incluindo os dados malformados e respostas históricas. Uma falha transacional reverte tanto a alteração como o histórico. Estes contratos são testados apenas em PostgreSQL 16 descartável; não representam confirmação do schema de qualquer instância Neon.

Dados locais inválidos ou JSON ilegível não são removidos. Uma cópia ilegível bloqueia também o fallback que poderia escondê-la. O ecrã de recuperação permite exportar os bytes originais, preserva os controlos globais de retry/saída, e exige confirmação para aplicar uma cópia revista. Bloqueia tentativas em curso, perda de dados legíveis e alterações do armazenamento após a exportação. JSON impossível de interpretar fica disponível para exportação/revisão manual, sem reset automático.

## Preservação e merge

Antes de cargas, escolhas de conflito e reparações, ambos os originais ficam em chaves únicas `a25-cloud-recovery-v1:*`, sem rotação nem eliminação. A escrita é verificada por leitura e exige localStorage durável; o fallback volátil não autoriza substituição. Se faltar espaço, pode exportar-se o original, mas a substituição permanece bloqueada. Filas e backups antigos não são apagados. O arquivo pode atingir a quota: é uma limitação explícita, não uma razão para descartar dados.

O merge não modifica os inputs, conserva registos sem ID, separa evidência por item e usa ordem cronológica com desempate estável. Cópias complementares do mesmo registo, incluindo uma cópia de rede sem respostas privadas, são reconciliadas sem perder os campos locais. Valores incompatíveis para o mesmo registo exigem revisão (`CLOUD_MERGE_REVIEW_REQUIRED`). O XP local não diminui durante a combinação. Posições pendentes ultrapassadas e campos remotos não adotados ficam arquivados localmente com o conteúdo completo. Recalibração, preferências e escolhas explícitas existentes conservam os seus contratos; os originais completos permanecem exportáveis.

Uma resposta tardia não substitui trabalho académico entretanto alterado nem o baseline de uma avaliação iniciada durante o pedido. Recuperações confirmam novamente a identidade antes/depois das operações assíncronas e mantêm a vinculação à conta no servidor.

## Provas permanentes e compatibilidade F5

- `cloudSnapshotSafety.test.mjs`: tipos/nulos/versões, limites, autoridade oficial, respostas privadas, determinismo, conflitos ambíguos, preservação de inputs, evidência e tentativas, backups e falhas de armazenamento.
- `cloudSnapshotRecoveryRoute.test.mjs`: API real com SQL sintético, exportação exata, autorização, bloqueio de overwrite, confirmação, conservação de dados legíveis, concorrência CAS e falhas de recuperação.
- `cloudSnapshotProducers.test.mjs`: formatos gerados pelos motores atuais, rubricas e respostas locais.
- `cloud-snapshot-postgres-contract.sh` e fixtures SQL: PostgreSQL descartável, rollback e dois CAS concorrentes, original histórico exato e conta B intacta; adicionalmente, os sete cenários F1/F2 e os contratos 010 existentes.
- `cloud-snapshot-browser-contract.mjs`: Chromium com os componentes reais, API real e SDK Neon Auth real instalado, substituindo apenas contextos/transportes por identidades e SQL sintéticos. Exercita quarentena, ficheiros exportados, reparação, quota, respostas tardias, avaliação em curso e recuperação local.

A compatibilidade F5 usa os módulos reais, lidos sem alterações no SHA imutável da PR #454 `3e6e8e9b4477f1e3bd50ab3c996e264bfed5370a`: cliente, fila, sessão verificada, workspace, persistência e binding do servidor. Em duas abas, A grava e deixa uma fila, termina sessão, B autentica e sincroniza apenas o seu progresso. O contexto antigo de A é recusado; filas sem identidade ficam em quarentena e intactas. A volta a autenticar-se e recupera o seu namespace. Os backups F7 respeitam os wrappers de armazenamento F5: B não vê os de A e dados de A não entram em B. Não se alterou nem integrou a PR #454. Isto valida a composição funcional testada; a futura integração dos ficheiros comuns exige revisão de conflitos.

O CI especializado mantém os testes F1–F4/F6 e acrescenta os testes F7, Chromium/F5 e PostgreSQL. Technical Gate, Source Hygiene, syntax, build e orçamento de performance continuam obrigatórios.

## Validação local antes da publicação

1.033/1.033 testes unitários, incluindo 94 novos testes F7 e os 29 testes F6 do SDK real; 673 ficheiros no Syntax Audit; Source Hygiene e Technical Gate GO; build e budgets aprovados; actionlint 1.7.12 aprovado. Chromium executou os cinco grupos de contratos acima. PostgreSQL 16 aprovou os sete cenários nominal/adulterados, o novo contrato F7 de rollback/CAS/histórico e as regressões 010. Os contratos CAS, navegação e recuperação passaram. Todos os transportes e identidades são sintéticos. O CI do commit final é verificado separadamente e registado na PR.

## Bloqueios e decisão delimitada

A proteção de release permanece inalterada. O contrato `release-recovery-compatibility.mjs` exige identidade textual com a persistência histórica #385; a validação local necessária a F7 provoca a recusa `candidate must preserve #385 storage guards`, antes da verificação subsequente. A proteção `no database/API migration in release` também permanece intacta e incompatível com as alterações de API/db já presentes nesta PR. Não se removeu, ignorou ou contornou qualquer dessas verificações. Testes que o Beta CI salte por esse bloqueio devem ser identificados; os testes de segurança aplicáveis executam no workflow especializado.

Não houve validação de dados, schemas, contas ou revogação numa instância real Neon. Dados demasiado grandes, versões desconhecidas, JSON ilegível e conflitos não reconciliáveis continuam preservados e bloqueados para revisão manual. O novo percurso de recuperação vincula a operação à conta verificada. O isolamento geral de filas e sincronização F5 permanece pendente na PR separada; F7 não o substitui.

A decisão desta fase é apenas para F7 em desenvolvimento isolado, condicionada ao CI do SHA publicado. Não constitui GO de release, aplicação, merge, deployment ou migração.
