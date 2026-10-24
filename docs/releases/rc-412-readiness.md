# APProva+ — candidata consolidada #412

Data: 24/10/2026. Referência operacional: Issue #373. **NO-GO para produção.**

## Consolidação

Base de produção: `98e811f8be6139f15e89de38c5b5e335dc631bdc`.
Head original #411: `620a974ee312fe5f2aa3795cc96687a2bc0baa90`.
Primeiro head da integração #412: `016725632c088faae1010063dd04daaea6eb493e`.
O SHA final e os resultados do respetivo CI devem ser registados na #373; uma execução de um SHA anterior não aprova uma revisão posterior.

| Origem | Conteúdo efetivo |
| --- | --- |
| #385/#387, reunidas em #390 | Guardas de persistência, recuperação e UI; a árvore de #390 é idêntica à combinação anteriormente ensaiada |
| #393/#394 e #395–#399 | Shell desktop, onboarding opcional de diagnóstico, nota obrigatória, currículo por disciplina e menu comum |
| #400–#403 | Cinco blocos de revisão, títulos e badges, fallback literário a toda a largura e margens desktop |
| #404/#405 | Adaptação mobile e superfícies brancas dos quatro menus |
| #407/#409/#410/#411 | Reconstrução da base estável, títulos, streak, Ranking compacto e remoção da imagem duplicada |
| #406/#408 | Excluídas; `git merge-base --is-ancestor` devolveu 1 para ambas |
| #388/#389 | Referências de recuperação e documentação; não integram uma segunda linha de alterações concorrente |

A única diferença em `app/lib` desde #385 é texto explicativo em `constructedResponse.js`; não muda pontos nem regras de avaliação. Não há alterações em `app/api` ou `db` face à produção. Não houve migrações ou operações sobre dados de alunos.

## Correções durante a retoma

- Guardar a matéria de Matemática apagava o rascunho ativo e abandonava tentativas. O callback preserva agora os dados e só atualiza o currículo. Quatro ensaios de browser verificam o rascunho antigo de diagnóstico, missão, treino e mini-exame.
- Português e FQ A abriam diretamente a primeira pergunta pelo cartão inicial. O cartão passa pela introdução comum, preservando a escolha explícita do aluno.
- Os testes ainda presumiam diagnóstico automático e dispensavam a nota recente obrigatória. Foram atualizados para o percurso implementado, sem remover verificações de respostas, retoma, duplo clique e rede.
- Nove ficheiros usavam `node:test` dentro do Vitest, originando suites sem testes recolhidos. Passaram a importar `test` do Vitest.
- A auditoria de Português procurava uma expressão de rendering substituída pelo fallback atual. Verifica agora o mapa das conexões/pontos essenciais dos cinco blocos.
- As capturas reais revelaram sobreposição da mascote com a descrição em 320 px e transbordo do XP de seis algarismos. A mascote existente passa a estar ancorada ao título nas três disciplinas; o contador reserva largura suficiente. Mantém-se um único Apronso e as posições do logótipo e do seletor.
- O workflow volta a PRs para `main`; remove a branch temporária. Acrescenta o contrato sintético de recuperação e conserva capturas por três dias para permitir revisão.

## Evidência técnica e limites

- Unitários: 836/836, zero falhas, relatório JSON local.
- Technical Gate: GO após correção da verificação de Português; repetido após as correções visuais.
- Grader Quality: PASS no benchmark; concordância humana não medida.
- Content Readiness: 10% no lane de revisão humana, NO-GO nesse lane. A revisão pedagógica anteriormente adiada continua não validada.
- Build de produção: PASS. Bundle total por rota: `/` 350,6/650 KiB e `/portugues-mini-exame` 449,4/500 KiB. Limites não aumentados.
- Compatibilidade: 554 verificações sintéticas, apenas memória, sem rede, contra produção/#385/#390/candidata. Inclui tentativas com 90 dias, vazias, em curso, conclusão pendente, respostas, identidade, relógio, rascunho de PT v1/v2, exames FQ e dados corrompidos preservados.
- Desktop: seis cenários (três disciplinas × 1366×768/1920×1080); abertura real de Rever matéria e conteúdo com pelo menos cinco blocos. Capturas inspecionadas.
- Mobile: 12 cenários de cabeçalho (três disciplinas × 320/360/390/430), cada um nos quatro menus. Verifica geometria, overflow, XP, filtros e mascote. Capturas inspecionadas; testes de pausa também fazem parte da suite integral.
- A primeira execução integral local fez 113 PASS e uma falha 404 da fixture de fórmulas: o comando local omitira `FORMULA_A11Y_FIXTURE=1` em runtime. Corrigido o comando de ensaio; o workflow versionado já continha a variável. Não foi removido o teste.
- Reexecução integral local: **114/114 PASS** em 3,5 minutos, incluindo a fixture de fórmulas e as correções visuais. O Beta CI ainda tem de aprovar o SHA final; consultar os links/resultados na #373.

Não confundir a cobertura de retoma e navegação com uma aprovação integral de login/sincronização numa infraestrutura isolada. Os ensaios locais não possuem ligação à base de dados nem ao fornecedor de autenticação. Faltam smoke de autenticação/cloud e confirmação de todos os percursos de conclusão de missão/treino/exame na candidata isolada. O Exame Completo de Matemática continua bloqueado por política existente.

## Recuperação

`98e811f` não é destino seguro após a atualização. O controlo negativo reproduz a remoção de rascunhos antigos pelo loader dessa versão. Não fazer rollback experimental em produção.

A estratégia é uma correção progressiva sobre a candidata, mantendo os módulos de persistência e as guardas de #385, incluindo a correção de Guardar matéria. Os módulos de armazenamento da candidata são idênticos aos da segurança #385; o contrato recusa substituir uma tentativa por outra e conserva dados corrompidos para recuperação. Não executar resets, limpeza de storage ou migrações destrutivas para contornar uma falha.

Uma versão de recuperação só pode ser promovida depois de passar os mesmos dados sintéticos escritos pela candidata, incluindo o callback de currículo. A existência das PRs #388/#389 ou de um `rollbackCandidate` não prova essa condição. Ainda não existe nesta retoma um deployment de recuperação final promovível e ensaiado ponta a ponta: mantém-se este gate.

## Vercel: factos operacionais

Laboratório: repositório privado `applus-vercel-release-lab`, projeto `prj_C4WUG2oe1jjOsVXiwrrlU3pJbPVP`. Evidência de 22/10: comentário `6341160562` da #373.

| Ensaio anterior | SHA | Deployment |
| --- | --- | --- |
| Baseline | `3f860817eb9c9d92d706e4c04d0fb71622b7cf2f` | `dpl_5yZ9y4ezzhibg4DVMVhcPC7Muq3N`, READY |
| Ativar bloqueio | `adc864b1b7e3e23a33d3c822803525f17482373b` | Nenhum observado |
| Alterar HTML com bloqueio | `d3849f10acea514dd05995a1b77e5b64f9f9573e` | Nenhum observado |
| Reativar automático | `64c8e7797c759b852bd67d52530657a3d0ac481c` | `dpl_HVtM2vBDdWVwPxszd2GTUbFEMBXZ`, READY |

O inventário anterior continha exatamente dois deployments: sem objetos intermédios cancelados/em fila/bloqueados. A reativação publicou o head atual, já com as alterações acumuladas; não criou um deployment individual por commit anterior. O commit que ativa o bloqueio não publicou nesse ensaio, o que não deve ser convertido numa garantia universal.

Nesta retoma, o inventário do laboratório devolveu 403. Foi solicitada autorização de equipa através do conector; o CLI não tinha credenciais. Não foram alteradas configurações do projeto real para contornar este bloqueio.

| Estratégia | Conclusão comprovada | Lacuna |
| --- | --- | --- |
| `git.deploymentEnabled:false` | No ensaio anterior evitou a criação dos deployments intermédios; reativar publicou imediatamente | Sequência final com integração e publicação deliberada ainda por ensaiar |
| Ignored Build Step | Não foi ensaiado nesta retoma | Não declarar equivalente, mais barato ou operacionalmente aprovado sem inventário e logs comparativos |
| Publicação manual mantendo Git bloqueado | Alternativa a provar no laboratório, permitindo separar integração/CI de publicação | Não aprovada apenas por documentação; falta ensaio de SHA, alias, contagem e recuperação |

Não foram criadas bases de dados, serviços pagos, domínios ou novos ambientes permanentes nesta retoma.

## Procedimento proposto — ainda não autorizado como GO

1. Manter a produção atual e `main` intactas. Obter acesso ao laboratório, sem copiar código, secrets ou dados reais.
2. No laboratório, registar o inventário completo e o alias ativo; repetir bloqueio e dois commits de integração sintéticos, aguardando os respetivos CI. Consultar todas as páginas e estados do inventário, não apenas READY.
3. Com Git bloqueado, criar deliberadamente um deployment do SHA final sintético, verificar conteúdo e ID e confirmar que só houve uma publicação. Ensaiar a promoção e a recuperação mantendo o alias anterior acessível até a substituição estar pronta. Comparar com um commit sob Ignored Build Step e medir objetos criados/tempo de build.
4. Só depois de documentada essa sequência, preparar a candidata isolada exata da #412, concluir login/cloud, percursos nas três disciplinas e recuperação com os mesmos dados sintéticos. Nunca apontar o ambiente isolado à base de produção.
5. Aprovar o Beta CI e o orçamento no SHA final da PR única, e verificar a árvore a integrar. Uma alteração posterior invalida essa aprovação. Confirmar que o mecanismo de bloqueio já demonstrado está ativo antes de qualquer integração real; não usar o próprio merge para o experimentar.
6. Integrar uma única PR para `main` mantendo a política bloqueada, se e apenas se os gates e a autorização de publicação estiverem satisfeitos. Executar o CI do SHA integrado e confirmar ausência de deployment automático em todos os estados.
7. Publicar deliberadamente esse SHA pelo mecanismo ensaiado. Esperar READY e validar o destino antes de trocar os aliases. Não reativar Git como simples limpeza: a reativação é uma nova ação de publicação, como demonstrado no laboratório.
8. Registar SHA/deployment/aliases, smoke sem resets e estratégia de correção progressiva. Não usar 98e811f como rollback. Repor automação apenas numa janela deliberada, com o efeito de publicação explicitamente aceite e ensaiado.

Enquanto os passos 2–4 e os gates finais não estiverem comprovados, a decisão é **NO-GO**. Estes passos são um roteiro de ensaio, não uma declaração de procedimento aprovado.

## Produção

Última consulta desta retoma: `www.approvamais.pt` → `dpl_BNT57a7tuSrhSiYj9yqsadJwspQ9`, READY/production, SHA `98e811f8be6139f15e89de38c5b5e335dc631bdc`, projeto `prj_H0nD83gkRwu7Id05OhzL4CC60s4M`. Não houve merge, publicação, rollback ou operação sobre dados reais. O projeto sintético existente `prj_8n5XwTMF651SAfsykIDji93oZp3r` permanece separado.
