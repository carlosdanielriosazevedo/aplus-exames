# Publicação controlada — procedimento preparado em 25/10/2026

**Atualização:** controlo#413 integrado e recuperação real6Sbc preparada/ensaiada; ver [preparation-completed-412.md](./preparation-completed-412.md). Não repetir esses passos nem reconstruir a recuperação sem necessidade. A integração funcional e promoção pública não foram executadas. Este documento conserva os payloads e gates do procedimento. Referência: Issue #373; PR operacional #413 e integração funcional única #412. Nenhuma das PRs históricas deve ser integrada separadamente.

## Identidades e dados fixos

| Recurso | Identificador |
| --- | --- |
| Repositório | carlosdanielriosazevedo/aplus-exames, repoId 1338890258 |
| Projeto real | prj_H0nD83gkRwu7Id05OhzL4CC60s4M |
| Projeto sintético — nunca usar para promoção real | prj_8n5XwTMF651SAfsykIDji93oZp3r |
| Produção atual esperada | dpl_BNT57a7tuSrhSiYj9yqsadJwspQ9 |
| main esperada antes da intervenção | 98e811f8be6139f15e89de38c5b5e335dc631bdc |
| Controlo #413 | bbceb1ee873cb7f319e8016c85a0905b9af88771 |
| Candidata #412 ensaiada | 660b4d5a19671f44e10b23820d75f7c6119bb16d |
| Recuperação segura, runtime testado | 1625a727795dd338b448c99aa195a7337cc393f2 |
| Recuperação com contrato de teste atualizado | 2615dc45b155d6d515a55a1c523198aab1a4cd1b |

Não usar deployments antigos98e811f/90b55fe como recuperação depois da atualização: o ensaio negativo demonstra eliminação de rascunhos antigos. A versão de recuperação acima preserva as proteções de #385 e o currículo; não é remédio universal para qualquer defeito futuro de #385. Um incidente nesse código requer correção progressiva testada.

## 1. Antes de qualquer mutação real

Ler os aliases www.approvamais.pt e approvamais.pt e confirmar o ID esperado. Confirmar main e os heads das PRs. Se diferirem, interromper e reconciliar; não aplicar cegamente este procedimento. Guardar inventário completo, incluindo todos os estados e páginas, configurações de atribuição de domínios e IDs dos aliases. Nunca imprimir variáveis secretas.

CI da #413 concluído: run40179073959, job121126014125, SUCCESS no headbbceb1ee873cb7f319e8016c85a0905b9af88771. Inclui browser, unitários, Technical Gate, auditorias e build integral. Revalidar se o head mudar. A PR só muda uma linha de vercel.json: main:true→false. A verificação `git merge-file` da configuração #412 + base98e811f + controlo resultou sem conflito, main:false e restantes regras false preservadas. Uma simulação local não é prova de ativação no projeto real.

Só depois da decisão de intervenção real, integrar #413 antes de #412. Registar o SHA de merge e verificar o ficheiro remoto, CI e inventário de deployments em todos os estados. O commit de ativação não publicou nos dois ensaios do lab, mas não se promete ausência universal de corridas. Se houver deployment inesperado, interromper a sequência e investigar, sem avançar para a candidata ou fazer rollback experimental.

## 2. Preparar a recuperação com configuração de produção

Esta etapa cria um artefacto adicional necessário de recuperação, sem promover domínios. Não copia secrets para ficheiros, laboratório ou chat: o target production seleciona a configuração já existente do projeto real.

Confirmar por metadados apenas que existem os grupos de configuração usados pelo código: DATABASE_URL; NEON_AUTH_COOKIE_SECRET; URL Auth (NEON_AUTH_BASE_URL/NEON_AUTH_URL/NEXT_PUBLIC_NEON_AUTH_URL conforme a precedência existente); NEXT_PUBLIC_NEON_DATA_API_URL; PILOT_POLICY_VERSION; PILOT_RETENTION_UNTIL. Não substituir valores reais por política sintética, não alterar schemas, grants, RLS ou migrações. Preservar os valores atuais.

Confirmar a configuração corrente do projeto e, na janela de intervenção real, aplicar:

```json
{
  "tool": "update_project",
  "args": {
    "idOrName": "prj_H0nD83gkRwu7Id05OhzL4CC60s4M",
    "requestBody": {"autoAssignCustomDomains": false}
  }
}
```

Ler novamente para confirmar persistência. O ensaio no lab demonstrou que o domínio primário continuou no ID antigo, mas um alias automático da conta mudou durante staging. Por isso, verificar os dois domínios públicos explicitamente depois de cada criação; não pressupor que todos os aliases ficam congelados.

Preparar a recuperação fixada no SHA já testado:

```json
{
  "tool": "create_deployment",
  "args": {
    "requestBody": {
      "name": "aplus-exames",
      "project": "prj_H0nD83gkRwu7Id05OhzL4CC60s4M",
      "target": "production",
      "gitSource": {
        "type": "github",
        "repoId": "1338890258",
        "ref": "2615dc45b155d6d515a55a1c523198aab1a4cd1b",
        "sha": "2615dc45b155d6d515a55a1c523198aab1a4cd1b"
      }
    }
  }
}
```

Esperar READY, guardar o ID e URL devolvidos e confirmar projeto/SHA/região/target. Não inventar antecipadamente o deployment ID. Confirmar www e raiz ainda no BNT57. O build anterior e Preview de recuperação já foram testados, mas um build novo com configuração production tem de ser verificado novamente.

Na URL imutável, verificar GET `/` e GET `/api/health`. Este health usa SELECT e não executa migrações: exigir HTTP200, região fra1, backendReachable=true, schemaVersion8. Comparar metadados/configuração com o projeto real sem devolver valores secretos. Não usar o endpoint temporário de prova de isolamento, ausente desta branch.

Repetir continuação/recuperação apenas com estado local sintético num perfil de browser novo, sem conta real e com pedidos de escrita bloqueados no teste. Conservar os snapshots brutos antes do loader, não os reinicializar. Uma configuração de Auth que só permite os domínios públicos pode impedir autenticação na URL imutável; não alterar trusted origins reais nem declarar esse login testado por inferência. A autenticação integral no ambiente isolado já passou; qualquer limitação do staging deve ficar explícita na decisão.

**Não executar `post-deploy-smoke.mjs` ou `browser-auth.mjs` sobre produção:** esses testes criam contas, gravam cloud e alteram consentimentos de teste. Não usar dados de alunos como smoke.

## 3. Integração funcional com Git bloqueado

Depois de ter recuperação utilizável e controlo ativo, atualizar/verificar a árvore de merge da #412 contra a main que contém #413. Não trazer #406/#408, não reativar main:true. A simulação da configuração já passou, mas o SHA final ainda não existe: tem de ser obtido no GitHub, nunca substituído automaticamente pelo SHA antigo660b4d5.

Exigir CI integral da árvore exata a integrar e do SHA integrado. Se o processo de merge gerar outro SHA, confirmar a árvore e executar as verificações exigidas nesse SHA. Registar ausência de deployments automáticos após a integração, em todos os estados. Não criar commits vazios para forçar CI nem reduzir testes/limites.

## 4. Uma publicação pública deliberada

Com o SHA integrado e aprovado, criar o artefacto funcional com o mesmo formato de chamada anterior, substituindo apenas `gitSource.ref` e `gitSource.sha` pelo SHA final confirmado. Continuar com Git bloqueado e autoAssignCustomDomains:false. Não usar branch flutuante `main` como substituto de SHA.

Esperar READY; verificar ID, SHA, projeto real, configuração production, health, ecrãs/continuação sintética sem escritas e manutenção dos domínios públicos no BNT57. Se algum gate falhar, manter o domínio no deployment atual e não promover.

Depois da decisão GO, promover **o mesmo ID já validado**, sem rebuild:

```json
{
  "tool": "request_promote",
  "args": {
    "projectId": "prj_H0nD83gkRwu7Id05OhzL4CC60s4M",
    "deploymentId": "ID_FUNCIONAL_READY_VALIDADO"
  }
}
```

O placeholder tem de ser preenchido pelo ID devolvido e verificado, não pelo ID do Preview isolado. Confirmar ambos os domínios públicos no novo ID e acessíveis. No caminho normal há dois builds deliberados (recuperação+funcional) e **uma promoção pública funcional**; não se apresenta a criação necessária de recuperação como custo zero ou como segundo release funcional.

## 5. Incidente e política posterior

Se o incidente for compatível com o destino seguro ensaiado, promover o ID de recuperação criado na etapa2, preservando os dados. Não promover o Preview sintético nem o deployment98e811f. Se o defeito estiver nos módulos de segurança partilhados, usar correção progressiva mínima sobre a release, com regressão sintética, e proteger a via de escrita afetada; não prometer recuperação universal.

Recuperar código não recria respostas apagadas. Não restaurar uma base inteira sobre dados mais recentes nem limpar storage para contornar erro. Não há neste ensaio prova de backup/PITR real; não o anunciar como disponível. Dados locais apenas podem ser recuperados das cópias preservadas.

Manter Git bloqueado após a publicação deliberada. Reativar true ou restaurar atribuição automática é outra alteração operacional, não limpeza automática. Registar no #373 todos os SHAs, IDs, aliases, resultados e limitações. Preservar a política do piloto e productionEligible=false; revisão humana adiada não passa a aprovada.

## Limite de autorização desta preparação

A preparação destas PRs/documentos não executou as mutações reais acima. A instrução inicial proíbe alterações no projeto real e em main durante o ensaio isolado; a missão posterior exige apresentação da candidata/decisão e proíbe publicação enquanto houver bloqueios. Este procedimento torna a intervenção real concreta e revisável. As condições de segurança continuam a aplicar-se à sua execução.
