# v4.4 — Math Validation Pipeline

- Criado `app/lib/mathValidation.js`.
- Os 9 geradores passam a emitir `mathWitness`.
- A resposta correta é recalculada por um módulo separado do gerador.
- Variante gerada só entra no motor com `validated_local`.
- Estados preparados para validação dupla e conflito.
- Discordância entre validadores resulta em `blocked_conflict`.
- Criado `externalValidationSpec` provider-neutral.
- Criado fingerprint matemático para cache/verificação futura.
- Criado contrato server-side de provider externo sem ativar chamadas externas.
- Painel de Qualidade mostra amostras, validadas e conflitos.
- Nova auditoria `npm run math-validation:audit`.
- Auditoria atual recalcula 900 variantes.
- Technical Gate passa a incluir validação matemática.
- Conteúdo curado continua `structural_only` até validação/revisão adequada.
