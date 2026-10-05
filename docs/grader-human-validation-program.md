# Programa de validação humana do corretor APProva+

## Princípio

A APProva+ não trata a correção automática como autoridade universal. O sistema só deve apresentar uma decisão automática como humanamente validada quando essa classe de resposta demonstrar desempenho suficiente contra avaliações independentes de professores num holdout que nunca foi usado para escolher thresholds.

O `policyScore` atual é uma força de evidência pré-calibração. Não é uma probabilidade de acerto e não pode ser comunicado como confiança calibrada.

## Os 12 pontos

1. **Manter o corretor automático atual.** Os sinais existentes — semântica, critérios, relações, contradições, ambiguidade, substância e coerência — continuam a ser aproveitados.
2. **Formalizar decisão seletiva.** `policyScore` agrega sinais observáveis sem depender da autoconfiança declarada por um LLM.
3. **Quatro saídas.** `accept`, `partial`, `reject` e `abstain`. Classes interpretativas ficam especialmente conservadoras antes da validação humana.
4. **Recolha separada e consentida.** Respostas reais destinadas a validação usam armazenamento local separado do progresso normal e exigem consentimento específico.
5. **Revisão cega por professor.** `/internal/grader-validation` importa packs sem decisão do Apronso e exporta labels do professor.
6. **Primeiro piloto FQ A.** O primeiro gold set real deve começar com revisão independente de FQ A, aproveitando o acesso a uma professora da disciplina.
7. **Expandir a professores de Português e Matemática A.** A arquitetura aceita as três disciplinas e mantém métricas separadas.
8. **Gold set real.** Casos reais são distinguidos de fixtures sintéticas e nunca podem ser confundidos com validação humana concluída.
9. **Comparar professor ↔ Apronso.** Medir acordo de decisão, MAE de score, overgrading, undergrading, erros catastróficos e abstention.
10. **Thresholds por disciplina/tipo.** Não existe threshold global. Matemática numérica, FQ cálculo, FQ conceptual, Português curto, restrito e extenso têm políticas distintas.
11. **Holdout protegido.** Casos `holdout` provocam erro se forem fornecidos ao afinamento de thresholds.
12. **Promoção só com evidência.** Os estados são `infrastructure_ready` → `human_calibration_started` → `human_validated`. O último exige holdout independente suficiente e métricas mínimas.

## Fases do dataset

### Fase 1 — sanity check
Meta inicial: ~50 respostas reais, classificadas por professor, por disciplina. Serve para encontrar erros grosseiros e verificar se os sinais de confiança têm alguma relação com a realidade.

### Fase 2 — calibração
Meta: ~150–250 respostas por disciplina, distribuídas por matéria, tipo de resposta, qualidade e estilo de aluno. Aqui podem ser escolhidos thresholds e regras seletivas.

### Fase 3 — holdout
Conjunto independente que nunca participa no afinamento. Deve incluir pelo menos dezenas de casos por disciplina e, idealmente, sobreposição de avaliadores numa amostra para medir acordo humano-humano.

## Métricas obrigatórias

- cobertura seletiva: % de casos em que o sistema decide;
- abstention rate;
- acordo `accept / partial / reject` nos casos decididos;
- erro absoluto médio de classificação;
- acordo dentro de ±10 pontos percentuais;
- overgrading >10 pp;
- undergrading >10 pp;
- erro catastrófico: diferença ≥50 pp ou `accept` ↔ `reject`;
- métricas por disciplina;
- métricas por família de resposta;
- métricas por bucket de `policyScore`;
- acordo humano-humano onde houver dois revisores.

## Regra para beta pública

Até existir validação humana real, respostas abertas devem ser descritas como **correção automática experimental**. Um número elevado de abstentions em Português interpretativo não é, por si só, um problema; pode significar que o sistema está a ser prudentemente seletivo. Uma abstention rate irrealisticamente baixa antes de validação é um sinal de alarme.

## Privacidade

O dataset de validação não deve transportar nome, email ou credenciais do aluno. O texto livre usado no estudo fica separado do estado normal de progresso/cloud. Packs de professor são cegos: não incluem score, decisão, diagnóstico, `policyScore` ou snapshot do Apronso.
