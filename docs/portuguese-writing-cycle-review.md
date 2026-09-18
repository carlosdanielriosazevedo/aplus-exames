# Revisão do bloco

A branch está deliberadamente isolada de `main` e, neste ponto, só adiciona ficheiros novos. Não altera Matemática, o banco live, o router, nem o mini-exame existente.

Isto permite rever o motor e a linguagem pedagógica sem risco de regressão funcional. A integração no componente real será o passo seguinte e deve ser feita num commit pequeno, depois de validar como os snapshots e revisões atuais são representados no `PortuguesePassageMiniExam`.

Critério para merge: integração concluída + Technical Gate completo + ausência de regressões nos audits existentes.
