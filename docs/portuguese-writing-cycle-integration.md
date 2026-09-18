# Contrato de integração — ciclo de revisão de Português

A integração no mini-exame deve respeitar estes limites:

1. Renderizar `PortugueseWritingCycleSummary` apenas quando existir um snapshot anterior da autoavaliação e uma versão revista.
2. Passar `item.rubric.criteria`, o snapshot anterior, o snapshot atual e o número de revisão.
3. Não substituir `selfAssessmentProgress`; o novo motor acrescenta um próximo passo acionável e uma síntese compacta.
4. Não alterar a memória histórica até o aluno guardar a autoavaliação revista.
5. Nunca converter `improvedCount`, `attentionCount` ou qualquer estado de critério numa classificação, percentagem ou nota.
6. Manter Português em estado foundation/prototype enquanto os audits editoriais e técnicos não autorizarem o desbloqueio.

A separação entre motor, componente e integração reduz o risco de regressão no fluxo atual e permite testar o comportamento isoladamente antes de o tornar visível no mini-exame.
