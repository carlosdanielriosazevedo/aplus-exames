# FQ A — avaliação científica experimental (shadow-v1)

**Estado: investigação; NÃO AUTORIZADO A CLASSIFICAR.** Relacionado com #419, #420, #421, #422 e #423.

## O que existe
- `scripts/lib/physicsChemistryShadowRelations.mjs` inspeciona **relações entre conceitos**, afirmações contraditórias e correções explícitas do aluno nas sete perguntas originais `FQA-R-*`.
- Devolve `score:null`, `points:null`, `scoringAuthorized:false`, `reviewRequired:true` **sempre**. Nenhuma saída alimenta o corretor real, o Progresso, o Ranking ou a memória do Apronso.
- `scripts/physics-chemistry-shadow-audit.mjs` compara os 35 exemplos sintéticos já existentes (5 por questão) e imprime diagnóstico agregado.
- `tests/unit/physicsChemistryShadowRelations.test.js` fixa casos adversariais, equivalentes, listas de palavras e autocontradição corrigida.
- `scripts/physics-chemistry-blind-teacher-packet.mjs` prepara CSV para avaliação cega dos mesmos 35 exemplos, **sem qualquer etiqueta de resposta ou nota automática**.

## Resultados de diagnóstico — 26/10/2026
Avaliado num checkout isolado do GitHub, após atualizar o classificador para deteção de erros em Ondas e equivalentes de titulação:

| Perfil sintético | N | Sinais de contradição | Relações candidatas | Sem evidência suficiente |
|---|---:|---:|---:|---:|
| Afirmação parcial com conclusão falsa | 7 | 7 | 0 | 0 |
| Relacionada mas não responde | 7 | 0 | 0 | 7 |
| Correta com prudência | 7 | 0 | 5 | 2 |
| Autocorreção explícita | 7 | 0 | 6 | 1 |
| Formulação abreviada de aluno | 7 | 0 | 6 | 1 |

**Interpretação limitada:** 7/7 e 0/7 são apenas resultados nestas frases conhecidas, NÃO estimativas de precisão no mundo real. Existem **4 falsos negativos potenciais** entre os 21 perfis adequados. O conjunto foi usado durante a construção e NÃO pode ser usado como holdout independente. A presença de relações não certifica correção nem determina a pontuação.

## Como reproduzir sem custos externos de IA
```bash
node scripts/physics-chemistry-shadow-audit.mjs
npm run test:unit
node scripts/physics-chemistry-blind-teacher-packet.mjs > /tmp/fqa_teacher_blind_35.csv
```

A amostra cega atual tem apenas 5 respostas por item. É **um ponto de partida**: antes da aprovação exige-se uma bateria de pelo menos 15 exemplos independentes por cada um dos 7 itens, além de amostras verdadeiramente novas de professores, incluindo: resposta excelente, parcial, incorreta, vagueza, negação, contradição, paráfrase, autocorreção e injection.

A coluna `human_awarded_points` fica vazia até um professor real efetuar a classificação **antes** de conhecer diagnósticos do motor. A coluna `human_criterion_breakdown` deve justificar a soma da cotação e `human_rationale` explicar diferenças de interpretação. Não pedir respostas ou dados identificáveis de alunos.

## Critérios de saída — bloqueantes
1. **Revisão científica independente** das rubricas para 10.º e 11.º ano. Sem copiar enunciados/figuras/critérios oficiais do IAVE sem autorização.
2. Testar pelo menos 105 respostas adjudicadas cegamente (15 por cada item), mais holdout novo e independente, com limiares de falsos positivos e negativos acordados previamente. Os 35 exemplos atuais não fazem parte do holdout.
3. Não basta detetar palavras-chave; verificar relações, negações, contexto, correções e contradições, e explicar por critério o crédito ou a abstenção.
4. Recuperar a avaliação automática **apenas** para tipos/perguntas que demonstrem fiabilidade. Para os restantes, manter `points:null`, sem converter para zero nem inventar revisores humanos.
5. Cumprir os gates pedagógicos v4/v5/v7, performance do bundle total, testes do browser desktop/mobile, recuperação e segurança.
6. Resolver a migração histórica não destrutiva (#423), sem reintroduzir pontos legados nos agregados.
7. Nova auditoria externa no SHA definitivo, com decisão GO explícita antes de permitir alteração à produção.

**Nota importante:** `READY` num Preview não constitui aprovação pedagógica. Enquanto as condições acima não estiverem cumpridas, **NO-GO** para merge/publicação da #420.
