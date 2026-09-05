// Piloto vNext: subconjunto explicitamente carregado no cliente.
// Continua como protótipo; não equivale a revisão pedagógica por professor.
export const VNEXT_PILOT_META=[
  {
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "sourceSha256": "eaf5a77b31465749efac4c57901c3ee5da5e98a4fb588a42c6248d977e571cf1",
    "questionCount": 50
  },
  {
    "subtopicId": "10-ga-vetores",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "sourceSha256": "a4013d60141a71efcbfb71a34a5b3eab8809bcbb81f39be76a1aa36daf4e35b8",
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
    "sol": "O domínio reúne os valores que podem ser usados como argumentos.",
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
      "o contradomínio sempre por definição."
    ],
    "a": 1,
    "sol": "A imagem contém as saídas que a função realmente assume.",
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
    "sol": "Os zeros são as preimagens de 0.",
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
    "sol": "x−3=0 => x=3.",
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
    "sol": "2x+4=0 => x=−2.",
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
    "q": "No gráfico de y=f(x), os zeros correspondem aos pontos onde o gráfico...",
    "o": [
      "interseta o eixo Oy.",
      "interseta ou toca o eixo Ox.",
      "atinge a média.",
      "tem sempre máximo."
    ],
    "a": 1,
    "sol": "Nesses pontos y=0.",
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
    "q": "Se o gráfico cruza o eixo Ox em x=−1 e x=4, os zeros são...",
    "o": [
      "0 e 3.",
      "−4 e 1.",
      "−1 e 4.",
      "apenas 4."
    ],
    "a": 2,
    "sol": "As abcissas das interseções com Ox são os zeros.",
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
    "q": "Dizer que f(x)>0 significa que o gráfico está...",
    "o": [
      "abaixo do eixo Ox.",
      "sobre o eixo Oy.",
      "sempre no primeiro quadrante.",
      "acima do eixo Ox."
    ],
    "a": 3,
    "sol": "f(x)>0 significa ordenada positiva.",
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
    "q": "Dizer que f(x)<0 significa que o gráfico está...",
    "o": [
      "abaixo do eixo Ox.",
      "acima do eixo Ox.",
      "à direita do eixo Oy.",
      "sempre no terceiro quadrante."
    ],
    "a": 0,
    "sol": "f(x)<0 corresponde a ordenada negativa.",
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
    "sol": "x−5>0 => x>5.",
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
    "sol": "2−x>0 => x<2.",
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
    "sol": "3x+6<0 => x<−2.",
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
    "sol": "Não se pode dividir por zero.",
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
    "sol": "x−2 não pode ser zero, logo x≠2.",
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
    "sol": "A raiz quadrada real exige x≥0.",
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
    "sol": "x−3≥0 => x≥3.",
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
    "sol": "5−x≥0 => x≤5.",
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
    "sol": "É preciso x≥0 para a raiz e, por estar no denominador, √x≠0; logo x>0.",
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
    "sol": "O domínio refere-se às entradas possíveis.",
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
    "sol": "Imagem refere-se às saídas realmente atingidas.",
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
    "sol": "Quadrados reais são não negativos e qualquer valor não negativo é atingido.",
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
    "sol": "Como x²≥0, x²+2≥2, e 2 é atingido em x=0.",
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
    "sol": "−x²≤0, logo f(x)≤5, e 5 é atingido em x=0.",
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
    "sol": "O valor absoluto nunca é negativo e assume todos os valores não negativos.",
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
    "q": "Se f(x)=x²−4, quais são os zeros?",
    "o": [
      "−2 e 2.",
      "−4 e 4.",
      "0 e 4.",
      "apenas 2."
    ],
    "a": 0,
    "sol": "x²−4=0 => x²=4 => x=±2.",
    "hyp": "Pode esquecer uma das raízes.",
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
    "q": "Se f(x)=(x−1)(x+3), quais são os zeros?",
    "o": [
      "−1 e 3.",
      "1 e −3.",
      "1 e 3.",
      "−1 e −3."
    ],
    "a": 1,
    "sol": "Cada fator pode ser zero: x=1 ou x=−3.",
    "hyp": "Pode trocar sinais dos fatores.",
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
    "sol": "Produto zero quando x=0 ou x−5=0.",
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
    "sol": "Não ter zeros significa não ter pontos com y=0; pode estar acima, abaixo ou em regiões separadas.",
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
      "cruza ou toca Ox em x=2 e muda de sinal aí.",
      "nunca toca Ox.",
      "tem zero em x=0.",
      "é sempre crescente."
    ],
    "a": 0,
    "sol": "x=2 é zero e o sinal muda de positivo para negativo.",
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
    "q": "Se f(x)>0 dos dois lados de x=1 e f(1)=0, então em x=1 o gráfico pode...",
    "o": [
      "atravessar obrigatoriamente o eixo.",
      "tocar o eixo Ox sem o atravessar.",
      "ter assíntota vertical.",
      "deixar de ser função."
    ],
    "a": 1,
    "sol": "Um zero de multiplicidade par, por exemplo, pode tocar sem mudar de sinal.",
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
    "sol": "Entre os zeros −1 e 2, os fatores têm sinais opostos, logo o produto é negativo.",
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
    "sol": "Fora dos zeros, os fatores têm o mesmo sinal.",
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
    "sol": "(x−1)(x+2) é negativo entre −2 e 1; o sinal menos torna f positiva aí.",
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
    "q": "Se o domínio de f é [−3,4] e f tem zeros em −1 e 2, quantos zeros são conhecidos?",
    "o": [
      "1.",
      "2.",
      "7.",
      "Não se pode dizer que −1 e 2 pertençam ao domínio."
    ],
    "a": 1,
    "sol": "Ambos pertencem ao domínio e foram explicitamente dados como zeros.",
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
      "Sim, sempre.",
      "Só em funções quadráticas.",
      "Não.",
      "Só se for negativo."
    ],
    "a": 2,
    "sol": "Um zero é, por definição, um elemento do domínio onde f(x)=0.",
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
    "q": "Considere f(x)=(x²−1)/(x−1), com domínio R\\{1}. A equação f(x)=0 tem solução...",
    "o": [
      "x=−1 e x=1.",
      "x=1 apenas.",
      "nenhuma.",
      "x=−1 apenas."
    ],
    "a": 3,
    "sol": "O numerador zera em ±1, mas x=1 não pertence ao domínio; resta x=−1.",
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
    "sol": "É necessário x+2≥0 e x≠3.",
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
    "sol": "É preciso 4−x>0 porque a raiz está no denominador; logo x<4.",
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
    "sol": "x²−9=0 em x=±3, que devem ser excluídos.",
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
    "sol": "9−x²≥0 => x²≤9 => −3≤x≤3.",
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
    "q": "Qual é a imagem de f(x)=√x+2, x≥0?",
    "o": [
      "[2,+∞[.",
      "[0,+∞[.",
      "R.",
      "]2,+∞[."
    ],
    "a": 0,
    "sol": "√x≥0 e vale 0 em x=0, logo f≥2 e 2 é atingido.",
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
    "sol": "|x|≥0, então 3−|x|≤3 e pode descer sem limite.",
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
    "sol": "A imagem não contém valores acima de 5 e contém 5.",
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
    "sol": "É o menor valor pertencente à imagem.",
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
    "sol": "x²−1≤0 => x²≤1 => −1≤x≤1.",
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
    "sol": "x²>4 => |x|>2.",
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
    "sol": "−x²+9≥0 => x²≤9.",
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
    "q": "Uma função tem domínio [0,10] e imagem [−2,7]. Pode concluir-se que f(10)=7?",
    "o": [
      "Sim.",
      "Só se f for crescente.",
      "Sim, porque 10 e 7 são extremos.",
      "Não."
    ],
    "a": 3,
    "sol": "Conhecer domínio e imagem não diz em que entrada o máximo 7 ocorre.",
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
    "sol": "0 estar na imagem significa existir algum x do domínio com f(x)=0.",
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
    "q": "Uma altura h(t)=20−5t é fisicamente válida até atingir o solo. Qual é o domínio temporal natural e o zero do modelo?",
    "o": [
      "Domínio R e zero t=5.",
      "Domínio [0,4] e zero t=4.",
      "Domínio [0,5] e zero t=4.",
      "Domínio [−4,0] e zero t=−4."
    ],
    "a": 1,
    "sol": "20−5t=0 dá t=4; fisicamente considera-se desde t=0 até esse instante.",
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
    "sol": "No plano, um vetor tem componentes horizontal e vertical.",
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
    "sol": "AB=(xB−xA,yB−yA).",
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
    "q": "Se A=(1,2) e B=(4,6), então AB=",
    "o": [
      "(5,8).",
      "(−3,−4).",
      "(3,4).",
      "(2,3)."
    ],
    "a": 2,
    "sol": "(4−1,6−2)=(3,4).",
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
    "sol": "(1−(−2),−1−3)=(3,−4).",
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
    "q": "A norma de v=(a,b) é...",
    "o": [
      "√(a²+b²).",
      "a+b.",
      "|a−b|.",
      "ab."
    ],
    "a": 0,
    "sol": "A norma é o comprimento do vetor.",
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
    "sol": "√(9+16)=5.",
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
    "sol": "√(25+144)=13.",
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
    "sol": "Tem ambas as componentes nulas.",
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
    "sol": "O vetor oposto tem mesma norma e direção, mas sentido contrário.",
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
    "sol": "Mudam os sinais das duas componentes.",
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
    "sol": "Soma-se componente a componente.",
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
    "sol": "(2−1,3+4)=(1,7).",
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
    "sol": "(5−3,−2−1)=(2,−3).",
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
    "sol": "A multiplicação escalar atua em todas as componentes.",
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
    "sol": "Multiplicam-se ambas as componentes por 3.",
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
    "sol": "−2×−3=6 e −2×4=−8.",
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
    "q": "Se v=2u, então v e u são...",
    "o": [
      "colineares e com o mesmo sentido se u≠0.",
      "perpendiculares.",
      "sempre de mesma norma.",
      "não relacionados."
    ],
    "a": 0,
    "sol": "Um múltiplo escalar positivo preserva direção e sentido.",
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
    "sol": "Múltiplo negativo inverte o sentido.",
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
    "sol": "Por definição, vetor unitário tem comprimento 1.",
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
    "sol": "||(1,0)||=1.",
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
    "sol": "k²+16=25 => k²=9 => k=±3.",
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
    "sol": "36+k²=100 => k²=64 => k=8.",
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
    "sol": "2+x=5 => x=3.",
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
    "sol": "Divide-se cada componente por 2.",
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
    "sol": "2u=(2,4); 2u−v=(−1,5).",
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
    "sol": "2v=(−4,6); soma=(0,7).",
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
    "q": "Dois vetores não nulos são colineares se...",
    "o": [
      "têm a mesma norma.",
      "a soma é zero sempre.",
      "um é múltiplo escalar do outro.",
      "as primeiras componentes são iguais."
    ],
    "a": 2,
    "sol": "Proporcionalidade das componentes caracteriza direção comum.",
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
    "sol": "v=2u.",
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
    "sol": "v=−2u.",
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
    "q": "Os vetores (2,3) e (4,5) são colineares?",
    "o": [
      "Sim.",
      "Não.",
      "Só se tiverem mesma norma.",
      "Só se forem pontos."
    ],
    "a": 1,
    "sol": "4/2=2, mas 5/3≠2.",
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
    "sol": "(k,6)=2(2,3), logo k=4.",
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
    "sol": "4=(−2)(−2), portanto k=(−2)×3=−6.",
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
    "sol": "Da origem ao ponto, as componentes coincidem com as coordenadas de P.",
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
    "sol": "As componentes do vetor posição são as coordenadas do ponto.",
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
    "sol": "OB=OA+AB=(5,−3).",
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
    "sol": "A soma de deslocamentos consecutivos dá o deslocamento total.",
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
    "sol": "AB+BC=AC=(−1−1,3−2)=(−2,1).",
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
    "sol": "AB+BC=AC => BC=AC−AB=(−4,3).",
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
    "sol": "||2u||=2||u||=20.",
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
    "sol": "Norma usa o módulo do escalar: 3×7=21.",
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
    "sol": "A soma nula significa que os vetores são opostos.",
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
    "sol": "u=−v=(3,2), logo x=3.",
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
    "sol": "Divide-se o vetor pela sua norma √29.",
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
    "sol": "O resultado tem norma 1 e conserva direção e sentido.",
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
    "sol": "u tem norma 5; multiplicar por 2 dá norma 10.",
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
    "sol": "||v||=|−2|×4=8.",
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
    "q": "Um deslocamento de 5 m para leste e 12 m para norte é representado por v=(5,12). Qual é o deslocamento direto?",
    "o": [
      "17 m.",
      "7 m.",
      "13 m.",
      "60 m."
    ],
    "a": 2,
    "sol": "A norma de (5,12) é 13.",
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
    "sol": "u+v=(2,7).",
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
    "sol": "√(4+49)=√53.",
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
    "sol": "Multiplicar por 1/2 dá (3,4).",
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

