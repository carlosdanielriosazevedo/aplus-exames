# APProva+ — candidato a beta externa com 3 disciplinas

A aplicação só avança para a primeira closed beta externa quando Matemática A, Português e Física e Química A estiverem simultaneamente utilizáveis como produto real.

## Critério técnico automático

O CI executa `scripts/three-subject-beta-candidate-audit.mjs` depois do Technical Gate e antes dos relatórios finais, build e orçamento de performance.

O gate conjunto protege:

- Matemática A: validação, qualidade pedagógica, soluções e autenticidade de exame;
- Português: cobertura, qualidade do banco, autenticidade do 639, Mini-exame e grelhas de correção;
- FQ A: prontidão beta geral, 11.º ano e percurso ponta a ponta;
- paridade entre disciplinas;
- Progresso independente por disciplina;
- experiência do aluno e mobile;
- diagnóstico, resultado e Rever Matéria;
- bloqueio da resposta depois de submetida;
- identidade APProva+ e presença do Apronso.

Este gate não substitui Unit Tests, Technical Gate, Grader Quality, Content Readiness, build de produção nem Performance Budget. Todos continuam obrigatórios.

## Smoke test manual final

Repetir em desktop e telemóvel nas três disciplinas:

1. onboarding sem disciplina pré-selecionada;
2. configuração da disciplina e objetivo de nota;
3. diagnóstico;
4. regresso ao Aprender sem arrancar automaticamente uma Missão;
5. Aprender;
6. Missão;
7. Praticar com ano, tema, foco e nível;
8. Rever Matéria;
9. Mini-exame;
10. Exame Completo;
11. submissão e revisão;
12. Progresso;
13. Ranking;
14. trocar para outra disciplina e confirmar que progresso/configuração não se misturam.

## Critério de saída

- zero blockers P0/P1;
- nenhum erro de correção conhecido que possa induzir o aluno em erro material;
- nenhuma disciplina pode parecer uma versão incompleta das restantes no percurso principal;
- Performance Budget tem de passar sobre a métrica total configurada, sem aumentar o limite apenas para acomodar regressões;
- problemas puramente cosméticos podem ficar registados para depois da closed beta se não prejudicarem compreensão, confiança, navegação ou correção.

## Fora do bloqueio desta closed beta

A área parental não é requisito para esta primeira entrega às testers. Também não é necessário chamar à aplicação uma versão final ou pública: o objetivo é obter feedback real sobre as três disciplinas já funcionais.
