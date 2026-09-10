# APProva+ — Product backlog

This file records product commitments explicitly approved by the product owner but deferred from the current implementation cycle.

## Pending

### Português 639

**Status:** fundação técnica criada; expansão congelada até Matemática A atingir o Beta Candidate
**Objetivo:** tornar Português a segunda disciplina da APProva+ sem reutilizar indevidamente a lógica de correção matemática.

Condições de progressão:

1. **Piloto interno:** pelo menos 60 itens originais, cobrindo leitura, educação literária, gramática e escrita nos três anos.
2. **Beta privado:** pelo menos 300 itens, diagnóstico e Missões próprios, revisão de textos e critérios por especialista de Português.
3. **Disponibilização:** fluxos por disciplina isolados, progresso separado e correção de resposta restrita testada com respostas reais de alunos.

Regras já decididas:

- escolha múltipla e respostas curtas objetivas podem ter correção determinística;
- respostas restritas recebem análise por critérios e resultado provisório;
- a produção escrita extensa nunca recebe uma classificação final apresentada como certa apenas por IA;
- todos os textos e itens são originais enquanto não existir autorização explícita para usar material oficial;
- Oralidade faz parte do currículo, mas não deve ser confundida com os domínios do exame escrito 639.


### Contextual Apronso animations

**Status:** approved and pending  
**Timing:** after the current core learning and Beta Candidate priorities  
**Goal:** make Apronso feel like a companion that reacts to the student's journey, rather than a static decorative image.

Initial animation set:

1. **Idle:** subtle breathing and occasional blinking.
2. **Thinking:** gentle head tilt and upward glance.
3. **Correct answer:** short jump and raised wing.
4. **Completion:** stronger celebration, optionally using the trophy pose.

Acceptance criteria:

- each animation has a clear contextual meaning;
- movement remains appropriate for students aged 14–18 and does not feel childish;
- animations are brief and do not run constantly across every screen;
- assets remain lightweight and smooth on typical mobile devices;
- `prefers-reduced-motion` is respected;
- the Apronso design stays visually consistent across all frames/states;
- static fallback remains available if an animation fails to load.

Implementation note: restrained CSS movement of the existing static images may be used temporarily, but the intended result is articulated animation (eyes, head and/or wings), using an appropriate lightweight format such as Rive, Lottie or optimized animated assets after prototype comparison.
