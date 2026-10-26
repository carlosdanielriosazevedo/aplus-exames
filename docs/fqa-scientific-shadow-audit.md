# FQ A — avaliação científica experimental (shadow-v1)

**Estado: investigação; NÃO AUTORIZADO A CLASSIFICAR.** Relacionado com #419, #420, #421, #422 e #423.

## O que existe
- `scripts/lib/physicsChemistryShadowRelations.mjs` inspeciona **relações entre conceitos**, afirmações contraditórias e correções explícitas do aluno nas sete perguntas originais `FQA-R-*`.
- Devolve `score:null`, `points:null`, `scoringAuthorized:false`, `reviewRequired:true` **sempre**. Nenhuma saída alimenta o corretor real, o Progresso, o Ranking ou a memória do Apronso.
- `scripts/physics-chemistry-shadow-audit.mjs` compara os 35 exemplos históricos com **mais 70 exemplos sintéticos novos elaborados durante o desenvolvimento** (105 no total, 15 por questão) e imprime resultados **separados por banco/perfil**.
- `tests/unit/physicsChemistryShadowRelations.test.js` fixa casos adversariais, equivalentes, listas de palavras e autocontradição corrigida.
- `scripts/physics-chemistry-blind-teacher-packet.mjs` prepara CSV com as 105 respostas para avaliação cega, **sem perfis, notas esperadas ou sinais do analisador**; estes exemplos ainda não foram classificados por professores.

## Resultados de diagnóstico — 26/10/2026
Avaliado num checkout isolado do GitHub, após atualizar o classificador para deteção de erros em Ondas e equivalentes de titulação:

| Perfil sintético | N | Sinais de contradição | Relações candidatas | Sem evidência suficiente |
|---|---:|---:|---:|---:|
| Afirmação parcial com conclusão falsa | 7 | 7 | 0 | 0 |
| Relacionada mas não responde | 7 | 0 | 0 | 7 |
| Correta com prudência | 7 | 0 | 5 | 2 |
| Autocorreção explícita | 7 | 0 | 6 | 1 |
| Formulação abreviada de aluno | 7 | 0 | 6 | 1 |

**Interpretação limitada:** 7/7 e 0/7 são apenas resultados nestas frases conhecidas, NÃO estimativas de precisão no mundo real. As quatro falhas nesse conjunto foram posteriormente tratadas, atingindo 21/21 reconhecimentos **no próprio conjunto de desenvolvimento**; este número não mede generalização. O conjunto foi usado durante a construção e NÃO pode ser usado como holdout independente. A presença de relações não certifica correção nem determina a pontuação.

## Análise adicional — 70 exemplos novos (10 por questão)
Os novos casos foram escritos para investigar a generalização e **não são um teste cego independente**, pois o desenvolvimento já teve acesso às respostas e perfis. No primeiro ensaio havia dois falsos candidatos, incluindo uma contradição sobre conservação de energia e uma lista de palavras sobre titulação. Os dois casos deixaram de ser candidatos após reforçar as regras; as respostas não passaram a ser pontuadas.

| Perfil novo | N | Candidatos | Contradições sinalizadas | Tentativas de instruir o corretor | Sem evidência |
|---|---:|---:|---:|---:|---:|
| Excelente | 7 | 4 | 0 | 0 | 3 |
| Paráfrase | 7 | 1 | 0 | 0 | 6 |
| Parcial | 7 | 0 | 0 | 0 | 7 |
| Irrelevante | 7 | 0 | 0 | 0 | 7 |
| Contraditória | 7 | 0 | 3 | 0 | 4 |
| Negação científica errada | 7 | 0 | 7 | 0 | 0 |
| Lista de palavras | 7 | 0 | 0 | 0 | 7 |
| Autocorrigida | 7 | 3 | 0 | 0 | 4 |
| Tentativa de manipulação | 7 | 0 | 0 | 5 | 2 |
| Abreviatura científica | 7 | 0 | 0 | 0 | 7 |

**Problemas evidentes:** não basta impedir candidatos incorretos; o sistema também deixa de identificar relações em **20 de 28** exemplos elaborados como excelentes, paráfrases, autocorreções ou abreviaturas. Este total não é taxa de falsos negativos validada por professores, mas mostra a insuficiência do método baseado em expressões regulares. Quatro das sete contradições novas ficaram sem sinal específico, embora nenhuma tenha sido promovida a candidata. O módulo `shadow-v1` permanece apenas instrumental.

## Como reproduzir sem custos externos de IA
```bash
node scripts/physics-chemistry-shadow-audit.mjs
npm run test:unit
node scripts/physics-chemistry-blind-teacher-packet.mjs > /tmp/fqa_teacher_blind_105.csv
```

O CSV preparado contém **15 respostas sintéticas por item**, mas nenhuma foi adjudicada por professores; a maioria dos casos pertence a bancos usados para desenvolver o sistema. Isto **não satisfaz** por si só a exigência de 15 avaliações independentes por pergunta nem a necessidade de um holdout novo, que não pode ser usado para ajustar regras. Incluir na validação excelente, parcial, incorreta, vaga, negada, contraditória, paráfrase, autocorreção, abreviatura e manipulação.

A coluna `human_awarded_points` fica vazia até um professor real efetuar a classificação **antes** de conhecer diagnósticos do motor. A coluna `human_criterion_breakdown` deve justificar a soma da cotação e `human_rationale` explicar diferenças de interpretação. Não pedir respostas ou dados identificáveis de alunos.

## Critérios de saída — bloqueantes
1. **Revisão científica independente** das rubricas para 10.º e 11.º ano. Sem copiar enunciados/figuras/critérios oficiais do IAVE sem autorização.
2. Testar pelo menos 105 respostas adjudicadas cegamente (15 por cada item), mais holdout novo e independente, com limiares de falsos positivos e negativos acordados previamente. Nenhum dos 105 exemplos sintéticos de desenvolvimento pode ser contado como holdout independente.
3. Não basta detetar palavras-chave; verificar relações, negações, contexto, correções e contradições, e explicar por critério o crédito ou a abstenção.
4. Recuperar a avaliação automática **apenas** para tipos/perguntas que demonstrem fiabilidade. Para os restantes, manter `points:null`, sem converter para zero nem inventar revisores humanos.
5. Cumprir os gates pedagógicos v4/v5/v7, performance do bundle total, testes do browser desktop/mobile, recuperação e segurança.
6. Resolver a migração histórica não destrutiva (#423), sem reintroduzir pontos legados nos agregados.
7. Nova auditoria externa no SHA definitivo, com decisão GO explícita antes de permitir alteração à produção.

**Nota importante:** `READY` num Preview não constitui aprovação pedagógica. Enquanto as condições acima não estiverem cumpridas, **NO-GO** para merge/publicação da #420.
