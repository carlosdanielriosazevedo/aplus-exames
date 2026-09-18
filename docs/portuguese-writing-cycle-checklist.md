# Checklist de aceitação — ciclo de revisão de Português

- [x] Motor puro separado da interface.
- [x] Distingue estado do critério de evidência textual.
- [x] Identifica critérios ainda em atenção.
- [x] Produz um próximo passo concreto e curto.
- [x] Não calcula nota, percentagem ou classificação automática.
- [x] Componente visual isolado e responsivo.
- [x] Cenários pedagógicos cobrindo melhoria, falta de evidência e consolidação.
- [x] Audit de contrato para impedir regressão para classificação automática.
- [ ] Integrar no `PortuguesePassageMiniExam` depois de validar o estado e snapshots já existentes no componente.
- [ ] Ligar a folha de estilos ao fluxo real apenas no mesmo commit da integração.
- [ ] Executar Technical Gate completo antes do merge.

O último trio fica deliberadamente fora deste primeiro bloco para evitar uma integração cega num componente que já acumula memória de escrita, revisões e supressão de atenções resolvidas.
