# Cobertura de Conteúdo — v5.1

## Objetivo

Eliminar os buracos estruturais da taxonomia de Matemática A sem usar provas,
enunciados ou adaptações de conteúdo do IAVE.

Todas as novas questões desta versão são originais e permanecem com:

`reviewStatus: "prototype"`

A validação automática interna não substitui revisão pedagógica por professor.

## Antes da v5.1

- 69 microcompetências na taxonomia;
- 93 questões originais no corpus;
- 42 focos considerados críticos (temas com relevância >= 4);
- apenas 24/42 focos críticos tinham pelo menos 2 assinaturas independentes de Mission;
- 20 microcompetências não tinham qualquer questão;
- 9 temas não tinham caminho de Treino Livre;
- mesmo com todo o corpus revisto, o readiness estrutural máximo era ~87%.

## v5.1

Foram acrescentadas **52 questões originais**.

### Reforço dos focos críticos

Foram preenchidos os 18 focos críticos incompletos:

- Cálculo diferencial
  - Taxa de variação
  - Otimização
- Funções — 11.º
  - Transformações
  - Modelação
  - Interpretação gráfica
- Função composta e derivadas
  - Composição
  - Regra da cadeia
  - Aplicações
- Probabilidades
  - Regra de Laplace
  - Problemas mistos
- Números complexos
  - Módulo e argumento
  - Forma trigonométrica
- Primitivas e integrais
  - Integral definido
  - Áreas
  - segunda evidência de Primitivas
- Geometria analítica
  - segunda evidência de Vetores
- Contagem
  - segunda evidência do Princípio multiplicativo
- Trigonometria
  - segunda evidência de Equações trigonométricas

Resultado:

**42/42 focos críticos têm >=2 assinaturas independentes disponíveis no corpus.**

### Cobertura mínima da restante taxonomia

Foi adicionada uma questão a cada uma das 20 microcompetências que ainda estavam
totalmente vazias, incluindo:

- Eleições e partilha;
- Matemática financeira;
- Estatística;
- Geometria sintética;
- Produto escalar;
- Sucessões;
- Resolução aproximada;
- Inferência estatística;
- Matrizes.

Resultado:

**69/69 microcompetências têm pelo menos uma questão.**

## Treino Livre

Todos os 21 temas da taxonomia passam a ter pelo menos um item com contexto
`training`.

Isto não significa que todos os temas já tenham profundidade suficiente para
produção. Significa que deixou de existir um tema estruturalmente sem caminho de
Treino Livre.

## Validação interna

`scripts/content-coverage-v5-1-audit.mjs` verifica:

- 52 novas questões marcadas como origem original v5.1;
- 4 opções distintas;
- índice correto válido;
- microcompetência mapeada;
- contextos Mission/Training/Exam;
- resposta correta contra um oráculo determinístico separado;
- IDs e assinaturas únicas;
- ausência de focos críticos com menos de 2 assinaturas;
- ausência de microcompetências sem questão;
- ausência de temas sem Treino Livre;
- ausência de erros estruturais do banco.

## Readiness

Estado real, sem aprovações de professor:

**10% — NO-GO para beta pedagógica fechada.**

Isto continua correto.

Se todo o corpus atual fosse formalmente revisto:

**100% de readiness estrutural.**

A diferença é importante:

- cobertura = agora existe conteúdo onde antes havia buracos;
- revisão = ainda falta um professor confirmar matemática, clareza, dificuldade,
  distratores, solução e classificação pedagógica.

## Roadmap mínimo de revisão

Com o corpus v5.1, o planeador calcula atualmente:

**64 aprovações** para atingir o gate mínimo de beta pedagógica fechada.

O ficheiro prioritário é gerado em:

`docs/REVISAO_PROFESSOR_PRIORIDADES_v5.1.csv`

## Direitos

Nenhuma das 52 questões foi copiada ou adaptada de uma prova oficial do IAVE.
A política mantém-se: conteúdo oficial continua bloqueado até existir clarificação
formal sobre autorização/licenciamento.
