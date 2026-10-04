# APProva+ — feedback e analytics da closed beta

Durante a closed beta, o objetivo é aprender sem transformar os testers em QA manual.

## Feedback explícito

A app mantém o feedback contextual após sessões através de `BetaSessionFeedback`:
- clareza das perguntas;
- adequação da dificuldade;
- utilidade da sessão;
- comentário livre e, quando aplicável, sinais adicionais de experiência.

O feedback fica local-first e segue no envelope de sincronização para `beta_feedback` quando existe sessão autenticada/cloud disponível.

## Analytics de produto

A app já mede localmente:
- abertura da app;
- início e conclusão do onboarding;
- seleção de disciplinas;
- perfil e objetivo;
- início e conclusão do diagnóstico;
- primeiro plano visto;
- primeira Missão iniciada e concluída;
- D1, D3 e D7;
- ativação e tempo até ativação.

A partir desta vaga, cada sincronização persiste também um `product_analytics_snapshot` em `beta_events`. Isto permite analisar o funil e retenção centralmente sem criar uma segunda infraestrutura nem recolher dados desnecessários.

## Regras

- Não guardar respostas ou texto livre como analytics de produto fora dos fluxos já previstos.
- Não introduzir trackers de terceiros nesta fase.
- Continuar local-first: falha do backend não pode bloquear estudo.
- Feedback e analytics não substituem observação qualitativa dos testers.
- Qualquer alteração futura ao funil deve atualizar `beta-feedback-analytics-audit.mjs`.
