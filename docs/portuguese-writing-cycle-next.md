# Próxima integração

O bloco seguinte deve editar apenas o necessário no fluxo real:

- importar `PortugueseWritingCycleSummary` em `PortuguesePassageMiniExam`;
- importar `portuguese-writing-cycle.css` na rota/componente apropriado;
- renderizar a síntese junto da comparação já existente apenas quando houver snapshot anterior e revisão;
- reutilizar `revisions[item.id]` e a autoavaliação atual em vez de criar uma segunda fonte de verdade;
- confirmar que guardar uma revisão continua a atualizar a memória uma única vez;
- acrescentar ao Technical Gate um audit que confirme a presença da síntese e a ausência de classificação automática.

Não se deve desbloquear Português nem alterar o banco live neste passo.
