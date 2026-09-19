# Português 639 — expansão editorial 200 → 300

## Objetivo
Aumentar o banco foundation de 200 para 300 itens sem transformar a meta num exercício de volume. Cada vaga deve corrigir lacunas reais de cobertura curricular, variedade de resposta e operação cognitiva.

## Referenciais obrigatórios
- Currículo: Aprendizagens Essenciais de Português em vigor, DGE, separadas por 10.º, 11.º e 12.º anos.
- Avaliação: estrutura da Prova 639 e critérios definitivos de classificação do IAVE.
- Conteúdo: original APProva+ (`original-only`); os exames oficiais servem de referência de estrutura, dificuldade e lógica de correção, não de fonte para copiar textos protegidos.
- Respostas abertas: grelha assistida e provisória, evidência por critério, sem classificação final automática quando é necessário juízo humano.

## Vagas
- Wave 11: 200 → 225
- Wave 12: 225 → 250
- Wave 13: 250 → 275
- Wave 14: 275 → 300

Antes de cada vaga, executar `npm run portuguese-content:priority`. A prioridade é determinada por: menor cobertura da competência no ano, menor volume total, pouca diversidade de formato e pouca diversidade cognitiva.

## Regras editoriais
1. Nenhuma vaga é preenchida apenas para atingir o número alvo.
2. Cada item declara ano, domínio, competência, operação cognitiva, formato, origem e estado editorial.
3. A distribuição deve continuar a cobrir Leitura, Educação Literária, Escrita e Gramática nos três anos.
4. Educação Literária deve respeitar rigorosamente o corpus/autor/obra previsto para o ano correspondente.
5. Leitura e Escrita devem trabalhar os géneros e operações previstos nas AE, não apenas perguntas genéricas de compreensão.
6. Gramática deve usar terminologia normativa e respeitar progressão/cumulatividade curricular.
7. A expansão deve aumentar respostas curtas/restritas quando uma competência está excessivamente dependente de escolha múltipla.
8. Itens novos permanecem `prototype` e `productionEligible: false` até revisão editorial.
9. Duplicação de IDs, estímulos ou enunciados bloqueia a vaga.
10. A meta de 300 representa profundidade para beta, não conclusão da disciplina. O horizonte editorial continua a ser aproximadamente 600 itens de qualidade antes de considerar o banco robusto.

## Gate aos 300
Chegar a 300 não desbloqueia Português automaticamente. Antes do beta devem passar auditorias de cobertura, qualidade, dificuldade, mini-exame, correção aberta e experiência de aluno; deve ainda existir revisão explícita das lacunas curriculares por ano.
