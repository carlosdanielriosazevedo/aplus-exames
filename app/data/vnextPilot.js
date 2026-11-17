// Piloto vNext: subconjunto explicitamente carregado no cliente.
// Continua como protótipo; não equivale a revisão pedagógica por professor.
export const VNEXT_PILOT_META=[
  {
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "sourceSha256": "640584f57f5d78355b463a3267423686082845b4e29a439be53bf60132878d14",
    "questionCount": 50
  },
  {
    "subtopicId": "10-ga-vetores",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "sourceSha256": "1964960fe46d536a148db8933fe7f657a2470767adeebc6c0b04359c2dcf153d",
    "questionCount": 50
  }
];

export const VNEXT_PILOT_QUESTIONS=[
  {
    "id": "VN10FUN-DIZ-001",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "q": "O domínio de uma função é...",
    "o": [
      "o conjunto dos valores de entrada admissíveis.",
      "o conjunto dos valores de saída obtidos.",
      "o maior valor da função.",
      "o conjunto dos zeros apenas."
    ],
    "a": 0,
    "sol": "O domínio reúne os valores que podem ser usados como argumentos. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode confundir domínio com imagem.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:dominio-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-002",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "q": "A imagem de uma função é...",
    "o": [
      "o conjunto de todas as entradas.",
      "o conjunto dos valores efetivamente obtidos pela função.",
      "um único valor obrigatório.",
      "o conjunto das entradas para as quais a função toma o valor zero."
    ],
    "a": 1,
    "sol": "Para formar a imagem, calcula f(x) para os valores x do domínio e reúne as saídas obtidas. Um valor pertence à imagem porque é atingido pela função para pelo menos uma entrada.",
    "hyp": "Pode confundir imagem com domínio ou contradomínio.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:imagem-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-003",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "q": "Um zero de f é um valor x tal que...",
    "o": [
      "x=0 obrigatoriamente.",
      "f(0)=x.",
      "f(x)=0.",
      "f(x)=1."
    ],
    "a": 2,
    "sol": "Para determinar os zeros, procura as entradas do domínio para as quais a ordenada vale zero. Assim, um valor x é zero da função porque verifica f(x)=0.",
    "hyp": "Pode achar que zero da função significa apenas x=0.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:zero-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-004",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "q": "Se f(x)=x−3, qual é o zero de f?",
    "o": [
      "−3",
      "0",
      "6",
      "3"
    ],
    "a": 3,
    "sol": "x−3=0 ⇒ x=3. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “3”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode trocar sinal.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:zero-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-005",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "q": "Se g(x)=2x+4, qual é o zero?",
    "o": [
      "−2",
      "−4",
      "2",
      "4"
    ],
    "a": 0,
    "sol": "2x+4=0 ⇒ x=−2. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “−2”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode dividir incorretamente.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:zero-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-006",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "q": "No gráfico de y=f(x), os zeros são as abcissas dos pontos em que o gráfico...",
    "o": [
      "interseta o eixo Oy.",
      "interseta ou toca o eixo Ox.",
      "muda de monotonia.",
      "tem sempre máximo."
    ],
    "a": 1,
    "sol": "Um zero é a abcissa de um ponto do gráfico cuja ordenada é nula, porque f(x)=0. Assim, localiza os pontos onde o gráfico encontra o eixo Ox e lê as suas abcissas.",
    "hyp": "Pode confundir eixo Ox com Oy.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:zero-grafico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-007",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "q": "Se o gráfico de f interseta o eixo Ox apenas em x=−1 e x=4, quais são os zeros de f?",
    "o": [
      "0 e 3.",
      "−4 e 1.",
      "−1 e 4.",
      "apenas 4."
    ],
    "a": 2,
    "sol": "Nos pontos de interseção com o eixo Ox, a ordenada é zero porque todos os pontos desse eixo têm a forma (x; 0). Assim, os zeros de f são −1 e 4.",
    "hyp": "Pode usar ordenadas em vez de abcissas.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:zeros-grafico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-008",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "q": "Em relação ao eixo Ox, onde está o ponto de abcissa x do gráfico de f, sabendo que f(x)>0?",
    "o": [
      "abaixo do eixo Ox.",
      "sobre o eixo Ox.",
      "sempre no primeiro quadrante.",
      "acima do eixo Ox."
    ],
    "a": 3,
    "sol": "Para cada entrada x, o ponto do gráfico tem coordenadas (x; f(x)). Se f(x)>0, a ordenada é positiva, por isso o ponto fica acima do eixo Ox.",
    "hyp": "Pode associar positividade a x>0.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:sinal-positivo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-009",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "q": "Se f(x)<0, onde está o ponto do gráfico de f que tem abcissa x?",
    "o": [
      "abaixo do eixo Ox.",
      "acima do eixo Ox.",
      "à direita do eixo Oy.",
      "sempre no terceiro quadrante."
    ],
    "a": 0,
    "sol": "Para cada entrada x, o ponto do gráfico tem coordenadas (x; f(x)). Se f(x)<0, a ordenada é negativa, por isso o ponto fica abaixo do eixo Ox.",
    "hyp": "Pode confundir sinal de x com sinal de f(x).",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:sinal-negativo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-010",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "Para f(x)=x−5, em que valores é f(x)>0?",
    "o": [
      "x<5",
      "x>5",
      "x≥0",
      "x<0"
    ],
    "a": 1,
    "sol": "x−5>0 ⇒ x>5. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “x>5”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode inverter desigualdade sem razão.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:sinal-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-011",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "Para f(x)=2−x, quando é f(x)>0?",
    "o": [
      "x>2",
      "x<0",
      "x<2",
      "x>0"
    ],
    "a": 2,
    "sol": "2−x>0 ⇒ x<2. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “x<2”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode esquecer o sinal negativo de x.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:sinal-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-012",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "Para f(x)=3x+6, quando é f(x)<0?",
    "o": [
      "x>−2",
      "x<2",
      "x>2",
      "x<−2"
    ],
    "a": 3,
    "sol": "3x+6<0 ⇒ x<−2. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “x<−2”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode trocar o sinal do zero.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:sinal-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-013",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "q": "O domínio de f(x)=1/x, em R, é...",
    "o": [
      "R\\{0}.",
      "R.",
      "[0,+∞[.",
      "]−∞,0]."
    ],
    "a": 0,
    "sol": "Não se pode dividir por zero. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “R\\{0}.”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode esquecer a restrição do denominador.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:dominio-racional",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-014",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "q": "O domínio de f(x)=1/(x−2) é...",
    "o": [
      "R\\{−2}.",
      "R\\{2}.",
      "R.",
      "[2,+∞[."
    ],
    "a": 1,
    "sol": "x−2 não pode ser zero, logo x≠2. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “R\\{2}.”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode resolver x−2=0 com sinal errado.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:dominio-racional",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-015",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "q": "O domínio real de f(x)=√x é...",
    "o": [
      "R.",
      "]−∞,0].",
      "[0,+∞[.",
      "R\\{0}."
    ],
    "a": 2,
    "sol": "A raiz quadrada real exige x≥0. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “[0,+∞[.”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode pensar que raiz quadrada aceita qualquer real.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:dominio-raiz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-016",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "O domínio real de f(x)=√(x−3) é...",
    "o": [
      "]−∞,3].",
      "R\\{3}.",
      "R.",
      "[3,+∞[."
    ],
    "a": 3,
    "sol": "x−3≥0 ⇒ x≥3. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “[3,+∞[.”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode impor apenas x≠3.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:dominio-raiz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-017",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "O domínio real de f(x)=√(5−x) é...",
    "o": [
      "]−∞,5].",
      "[5,+∞[.",
      "R\\{5}.",
      "R."
    ],
    "a": 0,
    "sol": "5−x≥0 ⇒ x≤5. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “]−∞,5].”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode inverter a desigualdade de forma errada.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:dominio-raiz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-018",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "O domínio de f(x)=1/√x, em R, é...",
    "o": [
      "[0,+∞[.",
      "]0,+∞[.",
      "R\\{0}.",
      "]−∞,0[."
    ],
    "a": 1,
    "sol": "É preciso x≥0 para a raiz e, por estar no denominador, √x≠0; logo x>0. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode permitir x=0.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:dominio-raiz-denominador",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-019",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "q": "Se uma função tem domínio [−2,5], isso significa que...",
    "o": [
      "as saídas estão sempre entre −2 e 5.",
      "os zeros são −2 e 5.",
      "só estão admitidas entradas entre −2 e 5, inclusive.",
      "a função vale zero fora desse intervalo."
    ],
    "a": 2,
    "sol": "O domínio refere-se às entradas possíveis. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode confundir domínio com imagem ou zeros.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:dominio-intervalo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-020",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "q": "Se a imagem de f é [1,4], então...",
    "o": [
      "o domínio é [1,4].",
      "os zeros são 1 e 4.",
      "f só está definida para x entre 1 e 4.",
      "os valores assumidos por f ficam entre 1 e 4."
    ],
    "a": 3,
    "sol": "Imagem refere-se às saídas realmente atingidas. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode trocar domínio e imagem.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:imagem-intervalo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-021",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "q": "Qual é a imagem de f(x)=x² com domínio R?",
    "o": [
      "[0,+∞[.",
      "R.",
      "]−∞,0].",
      "R\\{0}."
    ],
    "a": 0,
    "sol": "Quadrados reais são não negativos e qualquer valor não negativo é atingido. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode achar que a imagem é R.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:imagem-quadrado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-022",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "q": "Qual é a imagem de f(x)=x²+2 com domínio R?",
    "o": [
      "[0,+∞[.",
      "[2,+∞[.",
      "R.",
      "[−2,+∞[."
    ],
    "a": 1,
    "sol": "Como x²≥0, temos x²+2≥2. Qualquer y≥2 é atingido, porque basta tomar x=√(y−2) para obter f(x)=y. Assim, a imagem é [2,+∞[.",
    "hyp": "Pode deslocar a imagem para o lado errado.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:imagem-quadratica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-023",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "q": "Qual é a imagem de f(x)=−x²+5 com domínio R?",
    "o": [
      "[5,+∞[.",
      "R.",
      "]−∞,5].",
      "[0,5]."
    ],
    "a": 2,
    "sol": "Como x²≥0, temos −x²+5≤5. Qualquer y≤5 é atingido, porque basta tomar x=√(5−y) para obter f(x)=y. Assim, a imagem é ]−∞,5].",
    "hyp": "Pode confundir máximo com mínimo.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:imagem-quadratica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-024",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "q": "Qual é a imagem de f(x)=|x| com domínio R?",
    "o": [
      "R.",
      "]−∞,0].",
      "R\\{0}.",
      "[0,+∞[."
    ],
    "a": 3,
    "sol": "O valor absoluto nunca é negativo e assume todos os valores não negativos. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode tratar |x| como x.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:imagem-modulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-025",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Considera a parábola y=x²−2x e a reta y=4−2x. Quais são as abcissas dos pontos de interseção dos dois gráficos?",
    "o": [
      "−2 e 2.",
      "−4 e 4.",
      "0 e 4.",
      "apenas 2."
    ],
    "a": 0,
    "sol": "Iguala x²−2x e 4−2x, porque as ordenadas coincidem nos pontos de interseção. Soma 2x aos dois membros para obter x²=4. Assim, os gráficos encontram-se nas abcissas −2 e 2.",
    "hyp": "Pode procurar os zeros de cada expressão em vez de igualar as duas ordenadas.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:zeros-quadratica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-026",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Se f(x)=(x+1)(x−3) e g(x)=f(−x), quais são os zeros de g?",
    "o": [
      "−1 e 3.",
      "1 e −3.",
      "1 e 3.",
      "−1 e −3."
    ],
    "a": 1,
    "sol": "Os fatores de f anulam-se em −1 e 3. Para resolver g(x)=0, iguala −x a cada um desses valores, porque g(x)=f(−x). Assim, −x=−1 ou −x=3, logo os zeros de g são 1 e −3.",
    "hyp": "Pode usar diretamente os zeros de f sem trocar o sinal das abcissas na reflexão do gráfico.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:zeros-fatorizados",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-027",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Se f(x)=x(x−5), quais são os zeros?",
    "o": [
      "−5 e 0.",
      "5 apenas.",
      "0 e 5.",
      "0 apenas."
    ],
    "a": 2,
    "sol": "Pela lei do anulamento do produto, x(x−5)=0 exatamente quando x=0 ou x−5=0. A segunda condição dá x=5, logo tanto 0 como 5 são zeros. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode esquecer o fator x.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:zeros-fatorizados",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-028",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "q": "Se uma função não tem zeros reais, o seu gráfico...",
    "o": [
      "não interseta o eixo Oy.",
      "é necessariamente constante.",
      "está sempre acima de Ox.",
      "não interseta o eixo Ox."
    ],
    "a": 3,
    "sol": "Não ter zeros significa não ter pontos com y=0; pode estar acima, abaixo ou em regiões separadas. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode concluir sinal positivo sem dados suficientes.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:sem-zeros",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-029",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "q": "Se f(x)>0 em ]−∞,2[ e f(x)<0 em ]2,+∞[, com f(2)=0, então o gráfico...",
    "o": [
      "contém (2; 0) e passa de ordenadas positivas para negativas.",
      "nunca toca Ox.",
      "tem zero em x=0.",
      "é sempre crescente."
    ],
    "a": 0,
    "sol": "Para x<2, a ordenada é positiva; para x>2, a ordenada é negativa. Em x=2, f(2)=0, logo o gráfico contém o ponto (2; 0) e o sinal de f muda de positivo para negativo. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode confundir mudança de sinal com monotonia.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:tabela-sinal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-030",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "q": "Uma função quadrática f verifica f(1)=0 e toma valores positivos de ambos os lados de x=1. O que acontece ao gráfico em x=1?",
    "o": [
      "atravessa o eixo Ox.",
      "toca o eixo Ox sem o atravessar.",
      "tem uma assíntota vertical.",
      "interseta o eixo Oy."
    ],
    "a": 1,
    "sol": "Como f(1)=0, o gráfico encontra Ox em (1; 0). Fica acima de Ox à esquerda e à direita desse ponto porque f é positiva em ambos os lados. Assim, toca o eixo sem o atravessar.",
    "hyp": "Pode achar que todo zero implica mudança de sinal.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:zero-sem-mudanca-sinal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-031",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "q": "Para f(x)=(x−2)(x+1), em que intervalo é f(x)<0?",
    "o": [
      "]−∞,−1[∪]2,+∞[.",
      "]−∞,2[.",
      "]−1,2[.",
      "]−1,+∞[."
    ],
    "a": 2,
    "sol": "Entre os zeros −1 e 2, os fatores têm sinais opostos, logo o produto é negativo. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode não fazer quadro de sinais.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:sinal-produto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-032",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "q": "Para f(x)=(x−2)(x+1), em que conjunto é f(x)>0?",
    "o": [
      "]−1,2[.",
      "[−1,2].",
      "R.",
      "]−∞,−1[∪]2,+∞[."
    ],
    "a": 3,
    "sol": "Fora dos zeros, os fatores têm o mesmo sinal. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode trocar interior e exterior.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:sinal-produto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-033",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "q": "Para f(x)=−(x−1)(x+2), em que intervalo é f(x)>0?",
    "o": [
      "]−2,1[.",
      "]−∞,−2[∪]1,+∞[.",
      "]−∞,1[.",
      "]−2,+∞[."
    ],
    "a": 0,
    "sol": "(x−1)(x+2) é negativo entre −2 e 1; o sinal menos torna f positiva aí. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode esquecer o sinal global negativo.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:sinal-produto-negado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-034",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "As únicas interseções do gráfico de f com os eixos são (−1; 0), (0; 3) e (2; 0). Quantos zeros tem f?",
    "o": [
      "1.",
      "2.",
      "3.",
      "0."
    ],
    "a": 1,
    "sol": "Para determinar os zeros a partir de um gráfico, lê as abcissas dos pontos em que ele encontra o eixo Ox, porque nesses pontos f(x)=0. As abcissas indicadas são −1 e 2, logo há dois zeros.",
    "hyp": "Pode confundir quantidade de zeros com extensão do domínio.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:contar-zeros",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-035",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "q": "Pode um zero de uma função ficar fora do domínio?",
    "o": [
      "Sim, se a expressão se anular após simplificação.",
      "Sim, se esse valor pertencer à imagem.",
      "Não.",
      "Sim, se a função se anular ao aproximar-se desse valor."
    ],
    "a": 2,
    "sol": "Um zero é, por definição, um elemento do domínio onde f(x)=0. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode resolver uma equação sem verificar se a solução pertence ao domínio.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:zero-e-dominio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-036",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Considera f(x)=(x²−1)/(x−1), com domínio ℝ sem o número 1. Qual é a solução da equação f(x)=0?",
    "o": [
      "x=−1 e x=1.",
      "x=1 apenas.",
      "nenhuma.",
      "x=−1 apenas."
    ],
    "a": 3,
    "sol": "Fatora o numerador como (x−1)(x+1). Para x≠1, podemos cancelar x−1 e resolver x+1=0, obtendo x=−1. O valor 1 não é um zero porque está fora do domínio.",
    "hyp": "Pode aceitar raiz anulada pelo denominador.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:zeros-com-restricao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-037",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Qual é o domínio real de f(x)=√(x+2)/(x−3)?",
    "o": [
      "[−2,+∞[\\{3}.",
      "[−2,3[.",
      "R\\{3}.",
      "]−2,+∞[."
    ],
    "a": 0,
    "sol": "A raiz exige x+2≥0, isto é, x≥−2. O denominador exige x−3≠0, logo exclui-se 3, porque é o único valor que o anula. Assim, o domínio é [−2,+∞[ sem o 3.",
    "hyp": "Pode esquecer uma das duas restrições.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:dominio-combinado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-038",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Qual é o domínio real de f(x)=1/√(4−x)?",
    "o": [
      "]−∞,4].",
      "]−∞,4[.",
      "[4,+∞[.",
      "R\\{4}."
    ],
    "a": 1,
    "sol": "É preciso 4−x>0 porque a raiz está no denominador; logo x<4. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode permitir x=4 ou inverter desigualdade.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:dominio-raiz-denominador",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-039",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Qual é o domínio de f(x)=1/(x²−9)?",
    "o": [
      "R\\{9}.",
      "R\\{3}.",
      "R\\{−3,3}.",
      "[−3,3]."
    ],
    "a": 2,
    "sol": "x²−9=0 em x=±3, que devem ser excluídos. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “R\\{−3,3}.”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode esquecer a raiz negativa.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:dominio-racional-quadratico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-040",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Qual é o domínio real de f(x)=√(9−x²)?",
    "o": [
      "R\\{−3,3}.",
      "[0,3].",
      "]−3,3[.",
      "[−3,3]."
    ],
    "a": 3,
    "sol": "9−x²≥0 ⇒ x²≤9 ⇒ −3≤x≤3. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “[−3,3].”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode aceitar apenas x≥0 ou excluir extremos.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:dominio-raiz-quadratica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-041",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Qual é a imagem de f(x)=√(x)+2, com x≥0?",
    "o": [
      "[2,+∞[.",
      "[0,+∞[.",
      "R.",
      "]2,+∞[."
    ],
    "a": 0,
    "sol": "A raiz √x toma todos os valores a partir de zero. Quando lhe somas 2, cada saída aumenta duas unidades, por isso a imagem fica [2,+∞[.",
    "hyp": "Pode esquecer a translação vertical.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:imagem-raiz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-042",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Qual é a imagem de f(x)=3−|x|, x∈R?",
    "o": [
      "[3,+∞[.",
      "]−∞,3].",
      "R.",
      "[0,3]."
    ],
    "a": 1,
    "sol": "Como |x|≥0, temos 3−|x|≤3. Qualquer y≤3 é atingido, porque basta escolher x=3−y para obter f(x)=y. Assim, a imagem é ]−∞,3].",
    "hyp": "Pode assumir imagem não negativa por causa do módulo.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:imagem-modulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-043",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "q": "Se a imagem de uma função é ]−∞,5], qual afirmação é correta?",
    "o": [
      "5 é zero obrigatório.",
      "o domínio termina em 5.",
      "5 é valor máximo da função.",
      "a função é crescente."
    ],
    "a": 2,
    "sol": "A imagem não contém valores acima de 5 e contém 5. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode confundir extremo da imagem com extremo do domínio.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:imagem-maximo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-044",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "q": "Se a imagem é [−2,+∞[, então −2 é...",
    "o": [
      "um zero obrigatório.",
      "a única entrada.",
      "o máximo da função.",
      "um valor mínimo assumido pela função."
    ],
    "a": 3,
    "sol": "É o menor valor pertencente à imagem. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “um valor mínimo assumido pela função.”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode confundir valor mínimo com zero.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:imagem-minimo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-045",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Para f(x)=x²−1, em que conjunto é f(x)≤0?",
    "o": [
      "[−1,1].",
      "]−∞,−1]∪[1,+∞[.",
      "]−1,1[.",
      "R."
    ],
    "a": 0,
    "sol": "x²−1≤0 ⇒ x²≤1 ⇒ −1≤x≤1. Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido. A opção obtida deve coincidir com “[−1,1].”. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode trocar sinal ou excluir os zeros.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:sinal-quadratica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-046",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Para f(x)=x²−4, em que conjunto é f(x)>0?",
    "o": [
      "]−2,2[.",
      "]−∞,−2[∪]2,+∞[.",
      "[−2,2].",
      "R\\{0}."
    ],
    "a": 1,
    "sol": "Resolve x²−4>0 para obter x²>4, ou seja, |x|>2. Assim, x<−2 ou x>2. Os extremos não entram porque neles f(x)=0.",
    "hyp": "Pode escolher o intervalo entre as raízes.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:sinal-quadratica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-047",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Para f(x)=−x²+9, em que conjunto é f(x)≥0?",
    "o": [
      "]−∞,−3]∪[3,+∞[.",
      "]−3,3[.",
      "[−3,3].",
      "R."
    ],
    "a": 2,
    "sol": "Resolve −x²+9≥0, ou seja, x²≤9. Isto equivale a −3≤x≤3, logo o conjunto é [−3,3]. Os extremos pertencem à solução porque neles f(x)=0.",
    "hyp": "Pode esquecer que a parábola abre para baixo.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:sinal-quadratica-negada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-048",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "q": "Uma função tem domínio [0, 10] e imagem [−2, 7]. Estes dados garantem que f(10)=7?",
    "o": [
      "Sim, porque o valor 10 pertence ao domínio.",
      "Sim, porque 7 é a última saída por ordem das entradas.",
      "Sim, porque os extremos direitos dos dois intervalos correspondem sempre.",
      "Não, porque o máximo pode ser atingido noutra entrada."
    ],
    "a": 3,
    "sol": "A imagem contém 7 como valor máximo, mas não diz em que entrada é atingido. Por exemplo, f(x)=7−0,9x tem a imagem dada e f(10)=−2. Assim, f(10)=7 não é garantido. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode emparelhar extremos sem justificação.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:dominio-imagem-nao-determina",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-049",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "q": "Se 0 pertence à imagem de f, então...",
    "o": [
      "f tem pelo menos um zero.",
      "0 pertence necessariamente ao domínio.",
      "f é constante.",
      "a imagem é apenas {0}."
    ],
    "a": 0,
    "sol": "0 estar na imagem significa existir algum x do domínio com f(x)=0. Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.",
    "hyp": "Pode confundir entrada zero com saída zero.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:zero-e-imagem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10FUN-DIZ-050",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "q": "A altura de um objeto é dada por h(t)=20−5t, com t, em segundos, contado desde o início da observação até o objeto atingir o solo. Qual é o domínio temporal do modelo e qual é o seu zero?",
    "o": [
      "Domínio R e zero t=5.",
      "Domínio [0,4] e zero t=4.",
      "Domínio [0,5] e zero t=4.",
      "Domínio [−4,0] e zero t=−4."
    ],
    "a": 1,
    "sol": "Iguala a altura a zero: 20−5t=0, logo t=4. O modelo começa em t=0 e termina em t=4, porque este é o instante em que o objeto atinge o solo. Assim, o domínio é [0,4].",
    "hyp": "Pode ignorar o contexto ao definir o domínio.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-fun-dominio-imagem-zeros:modelo-dominio-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-fun-dominio-e-zeros",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-001",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "q": "Um vetor no plano pode ser representado por...",
    "o": [
      "duas componentes.",
      "uma única coordenada sempre.",
      "três componentes obrigatoriamente.",
      "apenas um comprimento."
    ],
    "a": 0,
    "sol": "No plano, um vetor tem componentes horizontal e vertical. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode confundir ponto com comprimento escalar.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:componentes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-002",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "q": "O vetor AB é calculado por...",
    "o": [
      "A+B.",
      "B−A coordenada a coordenada.",
      "A−B.",
      "ponto médio de A e B."
    ],
    "a": 1,
    "sol": "AB=(xB−xA,yB−yA). Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “B−A coordenada a coordenada.”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode inverter a ordem.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:vetor-AB",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-003",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "q": "O vetor de posição de A é (−2, −1). O ponto B é a imagem da origem pela translação de vetor (1, 3). Quais são as componentes do vetor AB?",
    "o": [
      "(−1,2).",
      "(−3,−4).",
      "(3,4).",
      "(1,3)."
    ],
    "a": 2,
    "sol": "O vetor de posição dá A=(−2, −1) e a translação da origem dá B=(1, 3). Para calcular o vetor de A para B, subtrai-se cada coordenada de A à de B. Resulta (1−(−2), 3−(−1))=(3, 4). Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode somar coordenadas ou inverter o sentido.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:vetor-AB",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-004",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "q": "Se A=(−2,3) e B=(1,−1), então AB=",
    "o": [
      "(−3,4).",
      "(−1,2).",
      "(1,−1).",
      "(3,−4)."
    ],
    "a": 3,
    "sol": "(1−(−2),−1−3)=(3,−4). Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(3,−4).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode errar sinais.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:vetor-AB",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-005",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "q": "Num referencial ortonormado do plano, qual é a norma do vetor v=(a, b)?",
    "o": [
      "√(a²+b²).",
      "a+b.",
      "|a−b|.",
      "ab."
    ],
    "a": 0,
    "sol": "Num referencial ortonormado, as projeções do vetor sobre os eixos formam os catetos de um triângulo retângulo, com comprimentos |a| e |b|. Pelo teorema de Pitágoras, a norma de v é √(a²+b²), fórmula que vale também quando uma componente é nula. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode confundir norma com soma das componentes.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:norma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-006",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "Qual é a norma de v=(3,4)?",
    "o": [
      "4",
      "5",
      "7",
      "25"
    ],
    "a": 1,
    "sol": "√(9+16)=5. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “5”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode somar 3+4 ou esquecer a raiz.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:norma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-007",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "Qual é a norma de v=(−5,12)?",
    "o": [
      "17",
      "7",
      "13",
      "169"
    ],
    "a": 2,
    "sol": "√(25+144)=13. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “13”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode deixar o sinal negativo influenciar o quadrado.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:norma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-008",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "q": "O vetor nulo no plano é...",
    "o": [
      "(1,0).",
      "(0,1).",
      "(1,1).",
      "(0,0)."
    ],
    "a": 3,
    "sol": "Tem ambas as componentes nulas. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(0,0).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode confundir com vetor unitário.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:vetor-nulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-009",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "q": "O vetor oposto de v=(a,b) é...",
    "o": [
      "(−a,−b).",
      "(b,a).",
      "(−b,a).",
      "(a,−b)."
    ],
    "a": 0,
    "sol": "O vetor oposto é −v=(−a, −b), porque v+(−v) é o vetor nulo. Quando v é diferente de zero, a multiplicação por −1 conserva a direção e a norma e inverte o sentido. O vetor nulo é o seu próprio oposto.",
    "hyp": "Pode mudar só uma componente.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:vetor-oposto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-010",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "O oposto de v=(2,−7) é...",
    "o": [
      "(2,7).",
      "(−2,7).",
      "(−7,2).",
      "(7,−2)."
    ],
    "a": 1,
    "sol": "Mudam os sinais das duas componentes. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(−2,7).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode trocar coordenadas em vez de sinais.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:vetor-oposto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-011",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "q": "A soma de u=(a,b) e v=(c,d) é...",
    "o": [
      "(ac,bd).",
      "(a−c,b−d).",
      "(a+c,b+d).",
      "(a+d,b+c)."
    ],
    "a": 2,
    "sol": "Soma-se componente a componente. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(a+c,b+d).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode misturar componentes.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:soma-vetores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-012",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "Se u=(2,3) e v=(−1,4), então u+v=",
    "o": [
      "(3,−1).",
      "(−2,12).",
      "(1,1).",
      "(1,7)."
    ],
    "a": 3,
    "sol": "(2−1,3+4)=(1,7). Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(1,7).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode multiplicar em vez de somar.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:soma-vetores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-013",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "Se u=(5,−2) e v=(3,1), então u−v=",
    "o": [
      "(2,−3).",
      "(8,−1).",
      "(−2,3).",
      "(2,3)."
    ],
    "a": 0,
    "sol": "(5−3,−2−1)=(2,−3). Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(2,−3).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode esquecer subtrair a segunda componente.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:subtracao-vetores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-014",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "q": "Multiplicar v=(a,b) por k dá...",
    "o": [
      "(a+k,b+k).",
      "(ka,kb).",
      "(a/k,b/k) sempre.",
      "(kb,ka)."
    ],
    "a": 1,
    "sol": "A multiplicação escalar atua em todas as componentes. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode confundir com translação.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:produto-escalar-por-numero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-015",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "3(2,−1)=",
    "o": [
      "(5,2).",
      "(6,3).",
      "(6,−3).",
      "(3,−1)."
    ],
    "a": 2,
    "sol": "Multiplicam-se ambas as componentes por 3. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode errar o sinal.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:produto-escalar-por-numero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-016",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "−2(−3,4)=",
    "o": [
      "(−6,8).",
      "(6,8).",
      "(−1,2).",
      "(6,−8)."
    ],
    "a": 3,
    "sol": "−2×−3=6 e −2×4=−8. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(6,−8).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode perder um dos sinais.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:produto-escalar-por-numero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-017",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "q": "Se u é um vetor não nulo e v=2u, qual é a relação entre v e u?",
    "o": [
      "São colineares e têm o mesmo sentido.",
      "São perpendiculares.",
      "Têm a mesma norma.",
      "São colineares e de sentidos opostos."
    ],
    "a": 0,
    "sol": "Como v é um múltiplo de u, os vetores têm a mesma direção. O fator 2 é positivo, por isso os dois vetores têm o mesmo sentido. A norma de v é o dobro da norma de u. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode confundir colinearidade com igualdade.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:vetores-proporcionais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-018",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "q": "Se v=−3u e u≠0, então v e u têm...",
    "o": [
      "direções perpendiculares.",
      "mesma direção e sentidos opostos.",
      "mesma norma.",
      "sentido igual."
    ],
    "a": 1,
    "sol": "Múltiplo negativo inverte o sentido. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “mesma direção e sentidos opostos.”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode ignorar o sinal do escalar.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:vetores-proporcionais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-019",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "q": "Um vetor unitário tem norma...",
    "o": [
      "0.",
      "2.",
      "1.",
      "dependente do quadrante."
    ],
    "a": 2,
    "sol": "Por definição, vetor unitário tem comprimento 1. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode confundir com vetor nulo.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:vetor-unitario",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-020",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "q": "Qual destes vetores é unitário?",
    "o": [
      "(1,1).",
      "(2,0).",
      "(3,4).",
      "(1,0)."
    ],
    "a": 3,
    "sol": "||(1,0)||=1. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(1,0).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode escolher vetor com componentes pequenas sem calcular norma.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:vetor-unitario",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-021",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Para que k o vetor (k,4) tenha norma 5?",
    "o": [
      "k=−3 ou 3.",
      "k=3 apenas.",
      "k=−5 ou 5.",
      "k=1."
    ],
    "a": 0,
    "sol": "k²+16=25 ⇒ k²=9 ⇒ k=±3. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “k=−3 ou 3.”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode esquecer uma solução.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:norma-parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-022",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Para que k>0 o vetor (6,k) tenha norma 10?",
    "o": [
      "6",
      "8",
      "10",
      "16"
    ],
    "a": 1,
    "sol": "36+k²=100 ⇒ k²=64 ⇒ k=8. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “8”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode esquecer a condição k>0.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:norma-parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-023",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Se u=(2,−1) e v=(x,3) e u+v=(5,2), então x=",
    "o": [
      "2",
      "4",
      "3",
      "5"
    ],
    "a": 2,
    "sol": "2+x=5 ⇒ x=3. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “3”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode usar a segunda componente para x.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:equacao-vetorial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-024",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Se 2u=(6,−8), então u=",
    "o": [
      "(12,−16).",
      "(4,−3).",
      "(−3,4).",
      "(3,−4)."
    ],
    "a": 3,
    "sol": "Divide-se cada componente por 2. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(3,−4).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode multiplicar novamente.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:equacao-vetorial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-025",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Se u=(1,2) e v=(3,−1), quanto vale 2u−v?",
    "o": [
      "(−1,5).",
      "(5,3).",
      "(1,5).",
      "(−1,3)."
    ],
    "a": 0,
    "sol": "2u=(2,4); 2u−v=(−1,5). Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(−1,5).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode fazer v−2u ou esquecer multiplicar.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:combinacao-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-026",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Se u=(4,1) e v=(−2,3), quanto vale u+2v?",
    "o": [
      "(2,4).",
      "(0,7).",
      "(8,5).",
      "(0,5)."
    ],
    "a": 1,
    "sol": "2v=(−4,6); soma=(0,7). Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(0,7).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode multiplicar apenas uma componente.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:combinacao-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-027",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "q": "Qual é a condição necessária e suficiente para que dois vetores não nulos sejam colineares?",
    "o": [
      "têm a mesma norma.",
      "a sua soma é o vetor nulo.",
      "um é múltiplo escalar do outro.",
      "as primeiras componentes são iguais."
    ],
    "a": 2,
    "sol": "Dois vetores não nulos são colineares exatamente quando um é um múltiplo do outro. Os vetores opostos são um caso particular, em que o fator é −1 e a soma é o vetor nulo. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode confundir mesma norma com mesma direção.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:colinearidade-vetores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-028",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Os vetores u=(2,3) e v=(4,6) são...",
    "o": [
      "perpendiculares.",
      "de sentidos opostos.",
      "de normas iguais.",
      "colineares."
    ],
    "a": 3,
    "sol": "v=2u. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “colineares.”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode olhar apenas para componentes diferentes.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:colinearidade-vetores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-029",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Os vetores u=(2,3) e v=(−4,−6) têm...",
    "o": [
      "mesma direção e sentidos opostos.",
      "direções diferentes.",
      "mesma norma.",
      "sentido igual."
    ],
    "a": 0,
    "sol": "v=−2u. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “mesma direção e sentidos opostos.”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode ignorar o fator negativo.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:colinearidade-vetores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-030",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Os vetores (2, 3) e (4, 5) são colineares? Seleciona a conclusão acompanhada de uma justificação.",
    "o": [
      "Sim, porque as primeiras componentes são proporcionais.",
      "Não, porque as razões 4/2 e 5/3 são diferentes.",
      "Não, porque têm normas diferentes.",
      "Sim, porque somar 2 a cada componente do primeiro dá o segundo."
    ],
    "a": 1,
    "sol": "O fator que transforma 2 em 4 é 2. Aplicado à segunda componente, daria 2×3=6, mas a segunda componente de (4, 5) é 5. Como não há um único fator para as duas componentes, os vetores não são colineares. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode verificar apenas uma componente.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:testar-colinearidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-031",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Se (k,6) é colinear com (2,3), então k=",
    "o": [
      "2",
      "6",
      "4",
      "12"
    ],
    "a": 2,
    "sol": "(k,6)=2(2,3), logo k=4. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “4”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode usar 6/2 em vez da razão correta.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:colinearidade-parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-032",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Se (4,k) é colinear com (−2,3), então k=",
    "o": [
      "−3",
      "3",
      "6",
      "−6"
    ],
    "a": 3,
    "sol": "4=(−2)(−2), portanto k=(−2)×3=−6. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “−6”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode perder o sinal.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:colinearidade-parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-033",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "q": "O vetor posição de P=(x,y), relativamente à origem O, é...",
    "o": [
      "OP=(x,y).",
      "PO=(x,y).",
      "OP=(−x,−y).",
      "OP=(y,x)."
    ],
    "a": 0,
    "sol": "Da origem ao ponto, as componentes coincidem com as coordenadas de P. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode inverter o sentido.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:vetor-posicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-034",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "q": "Se OP=(−3,5), então P=",
    "o": [
      "(3,−5).",
      "(−3,5).",
      "(5,−3).",
      "(−5,3)."
    ],
    "a": 1,
    "sol": "As componentes do vetor posição são as coordenadas do ponto. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode trocar componentes.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:vetor-posicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-035",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "q": "Se OA=(2,1) e AB=(3,−4), então OB=",
    "o": [
      "(1,−3).",
      "(6,−4).",
      "(5,−3).",
      "(−1,5)."
    ],
    "a": 2,
    "sol": "OB=OA+AB=(5,−3). Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(5,−3).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode subtrair em vez de somar.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:relacao-chasles",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-036",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "q": "A relação AB+BC=AC é conhecida como...",
    "o": [
      "Teorema de Pitágoras.",
      "Teorema de Tales.",
      "regra da bissetriz.",
      "relação de Chasles."
    ],
    "a": 3,
    "sol": "A soma de deslocamentos consecutivos dá o deslocamento total. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode associar soma vetorial a outro teorema.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:chasles",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-037",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "A=(1,2), B=(4,6), C=(−1,3). Quanto vale AB+BC?",
    "o": [
      "(−2,1).",
      "(2,−1).",
      "(−5,−3).",
      "(5,4)."
    ],
    "a": 0,
    "sol": "AB+BC=AC=(−1−1,3−2)=(−2,1). Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(−2,1).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode calcular dois vetores e somar com erro em vez de usar Chasles.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:chasles",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-038",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Se AB=(3,4) e AC=(−1,7), então BC=",
    "o": [
      "(4,−3).",
      "(−4,3).",
      "(2,11).",
      "(−2,3)."
    ],
    "a": 1,
    "sol": "AB+BC=AC ⇒ BC=AC−AB=(−4,3). Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(−4,3).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode fazer AB−AC.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:chasles-inverso",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-039",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Se u=(a,b) tem norma 10 e 2u é considerado, a norma de 2u é...",
    "o": [
      "10.",
      "5.",
      "20.",
      "100."
    ],
    "a": 2,
    "sol": "||2u||=2||u||=20. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “20.”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode elevar ao quadrado o fator.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:norma-escalar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-040",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Se ||u||=7, então ||−3u||=",
    "o": [
      "−21.",
      "10.",
      "49.",
      "21."
    ],
    "a": 3,
    "sol": "Norma usa o módulo do escalar: 3×7=21. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “21.”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode dar norma negativa.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:norma-escalar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-041",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "q": "Ter u+v=0 implica...",
    "o": [
      "v=−u.",
      "u=v.",
      "ambos são necessariamente nulos.",
      "u e v são perpendiculares."
    ],
    "a": 0,
    "sol": "A soma nula significa que os vetores são opostos. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode concluir que ambos têm de ser zero.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:soma-nula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-042",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Se u=(x,2) e v=(−3,−2) e u+v=0, então x=",
    "o": [
      "−3",
      "3",
      "2",
      "0"
    ],
    "a": 1,
    "sol": "u=−v=(3,2), logo x=3. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “3”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode igualar u a v.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:soma-nula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-043",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Se u=(2,5), qual é um vetor unitário com a mesma direção e sentido?",
    "o": [
      "(2/29,5/29).",
      "(√29/2,√29/5).",
      "(2/√29,5/√29).",
      "(−2/√29,−5/√29)."
    ],
    "a": 2,
    "sol": "Divide-se o vetor pela sua norma √29. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(2/√29,5/√29).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode dividir por a norma ao quadrado ou inverter o sentido.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:normalizar-vetor",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-044",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "q": "Normalizar um vetor não nulo significa...",
    "o": [
      "somar 1 a cada componente.",
      "torná-lo nulo.",
      "trocar as componentes.",
      "dividi-lo pela sua norma."
    ],
    "a": 3,
    "sol": "O resultado tem norma 1 e conserva direção e sentido. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode confundir normalização com translação.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:normalizacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-045",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Se u=(3,4), qual é um vetor de norma 10 com a mesma direção e sentido?",
    "o": [
      "(6,8).",
      "(3,4).",
      "(10,0).",
      "(−6,−8)."
    ],
    "a": 0,
    "sol": "u tem norma 5; multiplicar por 2 dá norma 10. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode escolher vetor de norma 10 sem respeitar direção.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:redimensionar-vetor",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-046",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "q": "Se u e v são colineares, ||u||=4 e v=−2u, então ||v||=",
    "o": [
      "−8",
      "8",
      "2",
      "4"
    ],
    "a": 1,
    "sol": "||v||=|−2|×4=8. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “8”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode dar comprimento negativo.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:norma-colinear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-047",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "q": "Uma pessoa desloca-se 5 m para leste e depois 12 m para norte. Qual é a distância em linha reta entre o ponto de partida e o ponto de chegada?",
    "o": [
      "17 m.",
      "7 m.",
      "13 m.",
      "60 m."
    ],
    "a": 2,
    "sol": "Os dois percursos são perpendiculares e formam os catetos de um triângulo retângulo. A distância em linha reta é a hipotenusa, que mede √(5²+12²)=√169=13 m. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode somar as componentes.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:modelacao-deslocamento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-048",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "q": "Um robô executa deslocamentos u=(3,2) e depois v=(−1,5). O deslocamento resultante é...",
    "o": [
      "(4,−3).",
      "(−3,10).",
      "(2,3).",
      "(2,7)."
    ],
    "a": 3,
    "sol": "u+v=(2,7). Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(2,7).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode somar apenas módulos.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:modelacao-soma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-049",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "q": "Qual é a norma do vetor deslocamento resultante (2,7)?",
    "o": [
      "√53.",
      "9.",
      "5.",
      "53."
    ],
    "a": 0,
    "sol": "√(4+49)=√53. Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “√53.”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode somar 2+7 ou esquecer a raiz.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:modelacao-norma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  },
  {
    "id": "VN10GA-VET-050",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "q": "Uma força vetorial simplificada F=(6,8) é reduzida para metade mantendo direção e sentido. O novo vetor é...",
    "o": [
      "(12,16).",
      "(3,4).",
      "(−3,−4).",
      "(6,4)."
    ],
    "a": 1,
    "sol": "Multiplicar por 1/2 dá (3,4). Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar. A opção obtida deve coincidir com “(3,4).”. Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.",
    "hyp": "Pode reduzir só uma componente ou inverter sentido.",
    "contexts": [
      "mission",
      "training",
      "exam"
    ],
    "signature": "10-ga-vetores:modelacao-escala",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "optionOrderVersion": 1,
    "microcompetencyId": "mc-10-ga-vetores",
    "pilotStatus": "machine_prechecked",
    "productionEligible": false
  }
];
