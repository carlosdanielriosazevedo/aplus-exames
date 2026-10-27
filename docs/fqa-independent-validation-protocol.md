# FQ A — protocolo pré-registado de validação independente (v1)

**Estado:** protocolo de investigação. **NÃO autoriza classificação, publicação, merge da PR #420, uso de dados reais ou alteração de Progresso.**
**Origem:** #419, #420, #421, #422 e #423. Branch separada da PR #420 para manter a candidata intacta.

## 1. Pergunta de avaliação
Determinar se um candidato a corretor de respostas abertas de FQ A consegue atribuir crédito por **evidência científica e relações causais**, distinguindo paráfrases de ideias erradas, com justificação por critério e abstenção quando não existe sustentação suficiente.

**Separar três capacidades distintas:**
1. Detetar relações e contradições em modo shadow (não é pontuação).
2. Produzir classificações por critério que concordam com docentes independentes.
3. Preservar estados de sessão, Progresso, privacidade e recuperação.

Nenhuma métrica do ponto 1 substitui o ponto 2.

## 2. Bancos e prevenção de fuga de dados
- **DEV-105:** 105 respostas sintéticas atuais, 15 por item, geradas por `scripts/physics-chemistry-blind-teacher-packet.mjs`. Já conhecidas pelo desenvolvimento; podem servir para diagnóstico e revisão docente, **nunca como holdout**.
- **HOLDOUT-NOVO:** criar, fora da branch do motor e antes de abrir os resultados, pelo menos **15 respostas inéditas por item (105 adicionais)**. Criadas por autores que não tenham acesso às regras do candidato nem consultem saídas do analisador. Guardar ficheiro e hash SHA-256 antes de testar; restringir acesso ao motor durante a avaliação. Não usar qualquer destas respostas para afinação.
- **ADVERSARIAL-NOVO:** conjunto adicional e independente, com negação, contradição, keyword soup, prompt injection, fórmulas e autocorreção. Deve conter respostas cientificamente certas e erradas.
- Não usar textos, identificadores, contas ou respostas pessoais de alunos.

## 3. Adjudicação humana (antes das previsões)
Dois docentes habilitados de Física e Química A avaliam individualmente, **sem acesso aos rótulos de desenvolvimento, ao modelo ou às previsões**, a resposta, o enunciado e uma rubrica original por critério.
Guardar por linha: blind_id, item_id, max_points, rubric_version, teacher_A_criterion_points, teacher_B_criterion_points, rationale_A, rationale_B, adjudicated_criterion_points, adjudicator, adjudication_reason, adjudicated_total, scoreable, date.
- Resolver divergências com terceiro avaliador ou consenso documentado, **sem observar a previsão do motor**.
- Verificar `0 <= pontos_por_critério <= máximo`, somas, possíveis escalas descontínuas e arredondamentos.
- Excluir casos ambíguos **apenas** mediante decisão humana prévia e conservar motivo e contagem. Não excluir posteriormente erros difíceis.
- A rubrica deve cobrir factos científicos, relações causais, unidades e limites do enunciado. Não reproduzir enunciados oficiais protegidos sem autorização.

## 4. Plano de estratificação
Em cada um dos sete itens `FQA-R-*`, garantir cobertura de: excelente, paráfrase equivalente, correta abreviada, correta com autocorreção, parcialmente correta, vaga, irrelevante, erro científico, negação, contradição, enumeração de palavras-chave, manipulação do corretor e ambiguidade.
Os 15 casos por item são **mínimo**, não garantia de equilíbrio por estrato. Reportar amostras e taxas por item, estrato e faixa de pontos. Adicionar casos se um estrato ficar sub-representado, sem alterar os mínimos após conhecer os resultados.

## 5. Pré-requisitos operacionais e critérios de aprovação
**Não emitir GO com base apenas em percentagens globais** ou na deteção shadow. Antes de avaliar o holdout, fixar a versão do candidato, as rubricas, as tolerâncias e os limiares num registo datado.

Condições bloqueantes (zero tolerância no conjunto de segurança avaliado):
- Nunca executar instruções inseridas na resposta como se fossem comandos do corretor.
- Nunca atribuir automaticamente pontuação alta a keyword soup, resposta irrelevante, contradição científica material ou negação fundamental. Pontuação parcial só se houver evidência independente por critério, documentada e consistente com adjudicação.
- Nunca converter `points:null` em `0`; nunca marcar uma abstenção como revisão humana concluída.
- Nenhuma soma incoerente dos critérios, `maxPoints` perdido, `lostPoints` contraditório ou falsa explicação.
- A mesma resposta, mesmo enunciado e mesma versão devem produzir resultado reproduzível, ou variação explicitamente medida e aceitável.

Métricas obrigatórias para fixar e medir antes de decisão GO:
- Cobertura = n.º de respostas pontuadas / total; reportar cobertura por item/estrato e taxa de abstenção.
- Erro absoluto da nota versus adjudicação, MAE global e por item, e distribuição de erros máximos.
- Taxas de crédito excessivo grave, subavaliação grave e erro por critério, denominadores explícitos e intervalos de confiança.
- Concordância entre docentes, antes do consenso; análise de ambiguidades e divergências.
- Custos e latência p50/p95 por correção (se existir componente de IA); taxa de falhas/timeout e resultado seguro nesses casos.

**Nota:** não estabelecer um limiar permissivo arbitrário para conseguir verde. O limiar final deve ser aprovado por responsável pedagógico antes do holdout. Qualquer mudança da arquitetura ou prompt depois de consultar o holdout invalida o conjunto como teste independente para essa versão.

## 6. Execução cega e trilho de auditoria
1. Gerar o DEV-105 com `node scripts/physics-chemistry-blind-teacher-packet.mjs > fqa_dev105.csv` e verificar 106 linhas CSV (incluindo cabeçalho), 15 IDs por item e zero notas humanas preenchidas.
2. Criar HOLDOUT-NOVO separadamente, cifrar/restringir acesso, guardar hash e data; não incluir as etiquetas do autor no ficheiro dos docentes.
3. Adjudicar independentemente e selar o CSV de referência antes de executar qualquer candidato sobre o holdout.
4. Congelar SHA Git, configuração, versão do modelo, prompt, temperatura e rubricas; registar hashes de entradas, saídas, código e critérios.
5. Executar uma única avaliação inicial sobre o holdout, produzir tabela esperado/observado por ID, métricas estratificadas, abstenções, evidências por critério e todos os erros.
6. Se falhar, abrir issue corretiva e desenvolver **novo holdout** antes da próxima decisão de GO. Não reciclar o mesmo conjunto como prova independente.
7. Auditor externo que não implementou a correção confirma o relatório e repete testes técnicos e E2E.

## 7. Barreiras à integração
Mesmo que os testes pedagógicos sejam aprovados, não alterar `automaticPhysicsChemistryRubricResult` nem o Progresso sem:
- Resolver a migração de pontuações históricas #423, incluindo idempotência, cloud merge e retenção de evidência verificada.
- Fazer `npm run test:unit`, `npm run technical:gate`, `npm run build`, budget de **Route client bundles**, recuperação e percursos E2E desktop/mobile no SHA final, com logs/exit codes.
- Fazer auditoria externa #421 e obter decisão GO explícita. Até lá, PR #420 continua Draft/NO-GO e `points:null` nos sete itens de resposta aberta.

## 8. Registo de decisão
| Campo | Valor |
|---|---|
| Versão do protocolo | v1 |
| Revisão humana realizada | Não |
| DEV-105 | Existe, contaminado para teste independente |
| HOLDOUT-NOVO | Por criar |
| Classificação automática FQA-R-* | Não autorizada |
| Technical Gate global | NO-GO no último registo verificado |
| Produção | Não alterar |
| Decisão | **NO-GO** |
