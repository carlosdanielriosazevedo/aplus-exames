export const BANK = [
  {
    "id": "Q001",
    "micro": "PROB-04",
    "tema": "Probabilidade condicionada",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "format": "EM",
    "signature": "cond|tabela|universo",
    "text": "Numa turma, 12 alunos praticam futebol e 5 desses 12 também natação. Em P(Natação|Futebol), qual é o universo relevante?",
    "options": [
      "Toda a turma",
      "Os 12 que praticam futebol",
      "Os 5 que praticam ambos",
      "Os que não praticam futebol"
    ],
    "correct": "B",
    "solution": "A condição Futebol restringe o universo aos 12 alunos que praticam futebol.",
    "hypothesis": "Pode não estar a interpretar a condição como restrição do universo.",
    "time": 50,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q002",
    "micro": "PROB-04",
    "tema": "Probabilidade condicionada",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "format": "EM",
    "signature": "cond|texto|universo",
    "text": "Escolhe-se uma pessoa sabendo que é maior de idade. Para calcular P(Tem carta|Maior de idade), entre quem contamos os casos possíveis?",
    "options": [
      "Toda a população",
      "Apenas maiores de idade",
      "Apenas quem tem carta",
      "Apenas menores"
    ],
    "correct": "B",
    "solution": "O universo condicionado contém apenas as pessoas maiores de idade.",
    "hypothesis": "Pode estar a usar o universo original em vez do universo condicionado.",
    "time": 50,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q003",
    "micro": "PROB-04",
    "tema": "Probabilidade condicionada",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "format": "EM",
    "signature": "cond|notacao|significado",
    "text": "O que significa P(A|B)?",
    "options": [
      "Probabilidade de A ou B",
      "Probabilidade de A sabendo que B ocorreu",
      "Probabilidade de B sabendo que A ocorreu",
      "Probabilidade de A e B serem incompatíveis"
    ],
    "correct": "B",
    "solution": "A barra vertical lê-se «sabendo que»; B é a condição.",
    "hypothesis": "Pode estar a inverter ou a não compreender a notação condicionada.",
    "time": 45,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q004",
    "micro": "PROB-04",
    "tema": "Probabilidade condicionada",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "format": "EM",
    "signature": "cond|tabela2x2|denominador",
    "text": "Numa tabela 2×2, para calcular P(A|B), que total deve aparecer no denominador?",
    "options": [
      "Total geral",
      "Total da linha/coluna correspondente a B",
      "Total correspondente a A",
      "Total de A∩B"
    ],
    "correct": "B",
    "solution": "O denominador é o total do acontecimento condicionado B.",
    "hypothesis": "Pode não reconhecer qual o denominador após a condição.",
    "time": 60,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q005",
    "micro": "PROB-04",
    "tema": "Probabilidade condicionada",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "format": "EM",
    "signature": "cond|comparacao|universos",
    "text": "Qual afirmação é correta?",
    "options": [
      "P(A|B) usa sempre o mesmo universo de P(A)",
      "Conhecer B pode alterar a probabilidade atribuída a A",
      "P(A|B)=P(B|A) sempre",
      "P(A|B) só existe se A e B forem independentes"
    ],
    "correct": "B",
    "solution": "A informação B restringe o universo e pode alterar a probabilidade de A.",
    "hypothesis": "Pode estar a tratar condicionamento como uma operação puramente algébrica.",
    "time": 75,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q006",
    "micro": "PROB-05",
    "tema": "Probabilidade condicionada",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "condcalc|inteiros|direto",
    "text": "Entre 20 alunos que estudam Matemática, 8 também estudam Física. Quanto vale P(Física|Matemática)?",
    "options": [
      "2/5",
      "8/28",
      "3/5",
      "1/5"
    ],
    "correct": "A",
    "solution": "8/20=2/5.",
    "hypothesis": "Interpretação pode estar correta, mas a razão favoráveis/condicionados pode falhar.",
    "time": 55,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q007",
    "micro": "PROB-05",
    "tema": "Probabilidade condicionada",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "condcalc|decimal|formula",
    "text": "P(A∩B)=0,18 e P(B)=0,60. Quanto vale P(A|B)?",
    "options": [
      "0,30",
      "0,108",
      "0,42",
      "0,78"
    ],
    "correct": "A",
    "solution": "0,18/0,60=0,30.",
    "hypothesis": "Pode estar a multiplicar em vez de dividir pela condição.",
    "time": 65,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q008",
    "micro": "PROB-05",
    "tema": "Probabilidade condicionada",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "condcalc|percentagens|contexto",
    "text": "40% dos clientes compram café e 10% compram café e bolo. Sabendo que um cliente compra café, qual a probabilidade de também comprar bolo?",
    "options": [
      "10%",
      "25%",
      "40%",
      "50%"
    ],
    "correct": "B",
    "solution": "10%/40%=25%.",
    "hypothesis": "Pode estar a usar a interseção diretamente sem condicionar.",
    "time": 75,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q009",
    "micro": "PROB-05",
    "tema": "Probabilidade condicionada",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "format": "Curta",
    "signature": "condcalc|formula|semopcoes",
    "text": "Se P(A∩B)=0,24 e P(B)=0,80, determina P(A|B).",
    "options": [],
    "correct": "0,30",
    "solution": "P(A|B)=0,24/0,80=0,30.",
    "hypothesis": "Erro permite testar se a fórmula ou a divisão decimal é a causa.",
    "time": 75,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q010",
    "micro": "PROB-05",
    "tema": "Probabilidade condicionada",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "condcalc|inversao|intersecao",
    "text": "P(A|B)=0,35 e P(B)=0,40. Quanto vale P(A∩B)?",
    "options": [
      "0,14",
      "0,75",
      "0,875",
      "0,05"
    ],
    "correct": "A",
    "solution": "P(A∩B)=P(A|B)×P(B)=0,35×0,40=0,14.",
    "hypothesis": "Pode compreender condicionada mas não conseguir reorganizar a relação.",
    "time": 85,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q011",
    "micro": "PROB-06",
    "tema": "Independência",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "format": "EM",
    "signature": "indep|conceito|simultaneo",
    "text": "Dois acontecimentos independentes podem ocorrer simultaneamente?",
    "options": [
      "Sim",
      "Não",
      "Só se tiverem igual probabilidade",
      "Só se forem complementares"
    ],
    "correct": "A",
    "solution": "Independência não significa incompatibilidade.",
    "hypothesis": "Pode estar a confundir independência com incompatibilidade.",
    "time": 45,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q012",
    "micro": "PROB-06",
    "tema": "Independência",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "format": "EM",
    "signature": "indep|conceito|influencia",
    "text": "Se A e B são independentes, saber que B ocorreu...",
    "options": [
      "torna A impossível",
      "não altera a probabilidade de A",
      "obriga A a ocorrer",
      "faz P(A)=P(B)"
    ],
    "correct": "B",
    "solution": "Independência significa que B não altera a probabilidade de A.",
    "hypothesis": "Pode não compreender independência como ausência de influência probabilística.",
    "time": 50,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q013",
    "micro": "PROB-06",
    "tema": "Independência",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "format": "EM",
    "signature": "indep|vsincomp|definicao",
    "text": "Qual frase distingue corretamente independência de incompatibilidade?",
    "options": [
      "Independentes nunca ocorrem juntos",
      "Incompatíveis não ocorrem juntos; independentes podem ocorrer",
      "São sinónimos",
      "Independentes têm sempre probabilidade 1/2"
    ],
    "correct": "B",
    "solution": "Incompatibilidade impede ocorrência conjunta; independência não.",
    "hypothesis": "Confusão conceptual entre duas relações diferentes.",
    "time": 60,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q014",
    "micro": "PROB-06",
    "tema": "Independência",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "format": "EM",
    "signature": "indep|condicionada|equivalencia",
    "text": "Se P(A|B)=P(A), com P(B)>0, isso sugere que...",
    "options": [
      "A e B são independentes",
      "A e B são incompatíveis",
      "A=B",
      "B é complementar de A"
    ],
    "correct": "A",
    "solution": "B não alterou P(A), que é precisamente a ideia de independência.",
    "hypothesis": "Pode conhecer a definição verbal mas não reconhecer a forma condicionada.",
    "time": 65,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q015",
    "micro": "PROB-06",
    "tema": "Independência",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "format": "EM",
    "signature": "indep|contraexemplo|conceito",
    "text": "A e B têm probabilidades positivas e são incompatíveis. Podem ser independentes?",
    "options": [
      "Sim, sempre",
      "Não",
      "Só se P(A)=P(B)",
      "Só se a união for 1"
    ],
    "correct": "B",
    "solution": "Se são incompatíveis, P(A∩B)=0; com probabilidades positivas, P(A)P(B)>0, logo não são independentes.",
    "hypothesis": "Pode faltar ligação entre conceito e critério formal.",
    "time": 90,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q016",
    "micro": "PROB-07",
    "tema": "Independência",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "indepcalc|produto|direto",
    "text": "P(A)=0,2, P(B)=0,5 e P(A∩B)=0,1. São independentes?",
    "options": [
      "Sim",
      "Não",
      "Só se A=B",
      "Não há dados"
    ],
    "correct": "A",
    "solution": "0,2×0,5=0,1, igual à interseção.",
    "hypothesis": "Pode usar um critério incorreto de independência.",
    "time": 60,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q017",
    "micro": "PROB-07",
    "tema": "Independência",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "indepcalc|produto|nao",
    "text": "P(A)=0,4, P(B)=0,3 e P(A∩B)=0,20. São independentes?",
    "options": [
      "Sim",
      "Não",
      "Só se forem incompatíveis",
      "Não há dados"
    ],
    "correct": "B",
    "solution": "0,4×0,3=0,12≠0,20.",
    "hypothesis": "Pode comparar valores errados ou assumir independência sem verificar.",
    "time": 65,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q018",
    "micro": "PROB-07",
    "tema": "Independência",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "format": "Curta",
    "signature": "indepcalc|intersecao|independentes",
    "text": "A e B são independentes, P(A)=0,6 e P(B)=0,25. Determina P(A∩B).",
    "options": [],
    "correct": "0,15",
    "solution": "Para acontecimentos independentes: 0,6×0,25=0,15.",
    "hypothesis": "Pode somar probabilidades em vez de multiplicar.",
    "time": 70,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q019",
    "micro": "PROB-07",
    "tema": "Independência",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "format": "EM",
    "signature": "indepcalc|condicionada|teste",
    "text": "P(A)=0,45 e P(A|B)=0,45, com P(B)>0. Qual conclusão é adequada?",
    "options": [
      "A e B são independentes",
      "A e B são incompatíveis",
      "A=B",
      "P(B)=0,45"
    ],
    "correct": "A",
    "solution": "A condição B não alterou a probabilidade de A.",
    "hypothesis": "Pode não reconhecer um critério equivalente de independência.",
    "time": 65,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q020",
    "micro": "PROB-07",
    "tema": "Independência",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "format": "EM",
    "signature": "indepcalc|parametro|criterio",
    "text": "P(A)=0,5, P(B)=x e P(A∩B)=0,15. Se A e B forem independentes, x vale...",
    "options": [
      "0,075",
      "0,30",
      "0,65",
      "0,20"
    ],
    "correct": "B",
    "solution": "0,15=0,5x, logo x=0,30.",
    "hypothesis": "Pode falhar no critério ou na resolução da equação.",
    "time": 90,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q021",
    "micro": "CONT-01",
    "tema": "Contagem",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "mult|roupa|2etapas",
    "text": "Há 3 camisolas e 4 pares de calças. Quantos conjuntos diferentes se podem formar escolhendo uma de cada?",
    "options": [
      "7",
      "12",
      "16",
      "24"
    ],
    "correct": "B",
    "solution": "3×4=12 escolhas possíveis.",
    "hypothesis": "Pode estar a somar possibilidades de etapas sucessivas.",
    "time": 45,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q022",
    "micro": "CONT-01",
    "tema": "Contagem",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "mult|menu|3etapas",
    "text": "Um menu permite escolher 2 entradas, 3 pratos e 2 sobremesas. Quantos menus completos existem?",
    "options": [
      "7",
      "12",
      "10",
      "24"
    ],
    "correct": "B",
    "solution": "2×3×2=12.",
    "hypothesis": "Pode não aplicar o princípio multiplicativo a todas as etapas.",
    "time": 50,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q023",
    "micro": "CONT-01",
    "tema": "Contagem",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "mult|codigo|repeticao",
    "text": "Um código tem 2 algarismos, podendo repetir-se, escolhidos de 0 a 9. Quantos códigos existem?",
    "options": [
      "20",
      "90",
      "100",
      "10"
    ],
    "correct": "C",
    "solution": "Há 10 opções para cada posição: 10×10=100.",
    "hypothesis": "Pode não distinguir posições sucessivas ou excluir indevidamente repetições.",
    "time": 60,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q024",
    "micro": "CONT-01",
    "tema": "Contagem",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "format": "EM",
    "signature": "mult|arvore|decisao",
    "text": "Uma viagem tem 3 opções de comboio e, para cada uma, 2 opções de autocarro. Quantos percursos completos existem?",
    "options": [
      "5",
      "6",
      "9",
      "3"
    ],
    "correct": "B",
    "solution": "Cada uma das 3 escolhas pode combinar-se com 2: 3×2=6.",
    "hypothesis": "Pode estar a somar ramos em vez de multiplicar etapas.",
    "time": 55,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q025",
    "micro": "CONT-01",
    "tema": "Contagem",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "format": "Curta",
    "signature": "mult|codigo|restricao",
    "text": "Uma matrícula fictícia tem 2 letras seguidas de 2 algarismos. Há 5 letras possíveis e 10 algarismos possíveis, com repetição. Quantas matrículas?",
    "options": [],
    "correct": "2500",
    "solution": "5×5×10×10=2500.",
    "hypothesis": "Pode falhar ao modelar o número de opções em cada posição.",
    "time": 80,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q026",
    "micro": "CONT-02",
    "tema": "Contagem",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "format": "EM",
    "signature": "ordem|equipa|conceito",
    "text": "Escolher Ana e Bruno para uma equipa é diferente de escolher Bruno e Ana?",
    "options": [
      "Sim",
      "Não",
      "Só se houver capitão",
      "Depende da idade"
    ],
    "correct": "B",
    "solution": "Sem funções distintas, a equipa é a mesma; a ordem não interessa.",
    "hypothesis": "Pode não reconhecer uma seleção não ordenada.",
    "time": 40,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q027",
    "micro": "CONT-02",
    "tema": "Contagem",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "format": "EM",
    "signature": "ordem|podio|conceito",
    "text": "Num pódio com 1.º, 2.º e 3.º lugares, a ordem dos atletas interessa?",
    "options": [
      "Sim",
      "Não",
      "Só no 1.º lugar",
      "Só se houver empate"
    ],
    "correct": "A",
    "solution": "As posições são diferentes; trocar atletas altera o resultado.",
    "hypothesis": "Pode não reconhecer situações em que a ordem cria resultados diferentes.",
    "time": 40,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q028",
    "micro": "CONT-02",
    "tema": "Contagem",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "format": "EM",
    "signature": "ordem|comissao|contexto",
    "text": "Para escolher uma comissão de 3 alunos sem cargos, deve usar-se uma contagem em que...",
    "options": [
      "a ordem interessa",
      "a ordem não interessa",
      "há repetição obrigatória",
      "todos são escolhidos"
    ],
    "correct": "B",
    "solution": "Sem cargos, interessa apenas o conjunto dos 3 alunos.",
    "hypothesis": "Pode confundir comissão com distribuição de cargos.",
    "time": 55,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q029",
    "micro": "CONT-02",
    "tema": "Contagem",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "format": "EM",
    "signature": "ordem|senha|contexto",
    "text": "Numa senha de 3 símbolos, trocar a posição dos mesmos símbolos produz...",
    "options": [
      "a mesma senha",
      "uma senha diferente",
      "sempre uma senha inválida",
      "apenas duas senhas"
    ],
    "correct": "B",
    "solution": "Numa sequência/senha, a posição faz parte do resultado.",
    "hypothesis": "Pode tratar sequências ordenadas como conjuntos.",
    "time": 50,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q030",
    "micro": "CONT-02",
    "tema": "Contagem",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "format": "EM",
    "signature": "ordem|comparacao|doiscontextos",
    "text": "Qual situação exige considerar a ordem?",
    "options": [
      "Escolher 3 livros para levar",
      "Escolher presidente e vice entre 6 pessoas",
      "Escolher 2 sabores para uma taça sem posições",
      "Escolher 4 alunos para uma equipa"
    ],
    "correct": "B",
    "solution": "Presidente e vice são funções distintas; trocar as pessoas altera o resultado.",
    "hypothesis": "Pode reconhecer exemplos isolados mas não transferir o conceito.",
    "time": 70,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q031",
    "micro": "CONT-03",
    "tema": "Contagem",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "comb|c5_2|direto",
    "text": "Quanto vale C(5,2)?",
    "options": [
      "10",
      "20",
      "25",
      "5"
    ],
    "correct": "A",
    "solution": "C(5,2)=5×4/(2×1)=10.",
    "hypothesis": "Pode conhecer o contexto mas falhar o cálculo da combinação.",
    "time": 55,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q032",
    "micro": "CONT-03",
    "tema": "Contagem",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "comb|c6_2|direto",
    "text": "Quanto vale C(6,2)?",
    "options": [
      "12",
      "15",
      "30",
      "8"
    ],
    "correct": "B",
    "solution": "C(6,2)=6×5/2=15.",
    "hypothesis": "Pode esquecer dividir pelas permutações internas.",
    "time": 55,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q033",
    "micro": "CONT-03",
    "tema": "Contagem",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "comb|equipa|contexto",
    "text": "Quantas equipas de 3 pessoas podem ser escolhidas entre 7?",
    "options": [
      "21",
      "35",
      "210",
      "343"
    ],
    "correct": "B",
    "solution": "Como a ordem não interessa, C(7,3)=35.",
    "hypothesis": "Pode escolher arranjos/permutação em vez de combinação.",
    "time": 70,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q034",
    "micro": "CONT-03",
    "tema": "Contagem",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "format": "Curta",
    "signature": "comb|c8_2|semopcoes",
    "text": "Calcula C(8,2).",
    "options": [],
    "correct": "28",
    "solution": "C(8,2)=8×7/2=28.",
    "hypothesis": "Permite distinguir domínio real de reconhecimento por opções.",
    "time": 65,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q035",
    "micro": "CONT-03",
    "tema": "Contagem",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "format": "EM",
    "signature": "comb|restricao|grupo",
    "text": "De 5 raparigas e 4 rapazes escolhem-se 2 raparigas para uma equipa. Quantas escolhas?",
    "options": [
      "10",
      "20",
      "25",
      "9"
    ],
    "correct": "A",
    "solution": "Escolhem-se 2 entre as 5 raparigas: C(5,2)=10.",
    "hypothesis": "Pode introduzir elementos irrelevantes ou escolher do total de 9.",
    "time": 75,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q036",
    "micro": "PROB-03",
    "tema": "Regra de Laplace",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "laplace|dado|direto",
    "text": "Num dado equilibrado, qual é P(sair número par)?",
    "options": [
      "1/6",
      "1/3",
      "1/2",
      "2/3"
    ],
    "correct": "C",
    "solution": "Há 3 casos favoráveis em 6: 3/6=1/2.",
    "hypothesis": "Pode contar incorretamente favoráveis ou possíveis.",
    "time": 45,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q037",
    "micro": "PROB-03",
    "tema": "Regra de Laplace",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "laplace|urna|direto",
    "text": "Uma caixa tem 3 bolas vermelhas e 2 azuis. Retira-se uma ao acaso. P(vermelha)=...",
    "options": [
      "2/5",
      "3/5",
      "1/2",
      "3/2"
    ],
    "correct": "B",
    "solution": "3 casos favoráveis em 5 possíveis: 3/5.",
    "hypothesis": "Pode inverter favoráveis e possíveis.",
    "time": 45,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q038",
    "micro": "PROB-03",
    "tema": "Regra de Laplace",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "format": "EM",
    "signature": "laplace|cartoes|numeros",
    "text": "Escolhe-se ao acaso um cartão numerado de 1 a 10. P(número múltiplo de 3)=...",
    "options": [
      "1/10",
      "2/10",
      "3/10",
      "4/10"
    ],
    "correct": "C",
    "solution": "Os múltiplos de 3 são 3,6,9: 3 em 10.",
    "hypothesis": "Pode não identificar corretamente os casos favoráveis.",
    "time": 55,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q039",
    "micro": "PROB-03",
    "tema": "Regra de Laplace",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "format": "EM",
    "signature": "laplace|doisdados|soma",
    "text": "Lançam-se dois dados equilibrados. Qual é o número total de pares ordenados possíveis?",
    "options": [
      "12",
      "18",
      "36",
      "6"
    ],
    "correct": "C",
    "solution": "Cada dado tem 6 resultados: 6×6=36.",
    "hypothesis": "Pode falhar no princípio multiplicativo antes de aplicar Laplace.",
    "time": 60,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q040",
    "micro": "PROB-03",
    "tema": "Regra de Laplace",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "format": "Curta",
    "signature": "laplace|doisdados|soma7",
    "text": "Dois dados equilibrados são lançados. Qual é P(a soma ser 7)?",
    "options": [],
    "correct": "1/6",
    "solution": "Há 6 pares favoráveis entre 36: 6/36=1/6.",
    "hypothesis": "Erro pode resultar de contagem ou da própria regra de Laplace.",
    "time": 90,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q041",
    "micro": "PROB-08",
    "tema": "Problemas mistos",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "format": "EM",
    "signature": "misto|comb|selecao",
    "text": "Escolhem-se 2 alunos ao acaso entre 6 raparigas e 4 rapazes. Qual expressão dá P(escolher 2 raparigas)?",
    "options": [
      "C(6,2)/C(10,2)",
      "6/10×6/10",
      "C(10,2)/C(6,2)",
      "6/10+5/9"
    ],
    "correct": "A",
    "solution": "Casos favoráveis: escolher 2 das 6 raparigas; possíveis: escolher 2 dos 10 alunos.",
    "hypothesis": "Pode falhar na contagem, no modelo probabilístico ou em ambos.",
    "time": 95,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q042",
    "micro": "PROB-08",
    "tema": "Problemas mistos",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "format": "EM",
    "signature": "misto|semreposicao|sequencial",
    "text": "Uma urna tem 3 vermelhas e 2 azuis. Retiram-se 2 sem reposição. P(duas vermelhas)=...",
    "options": [
      "3/5×2/4",
      "3/5×3/5",
      "2/5×1/4",
      "C(3,2)/5"
    ],
    "correct": "A",
    "solution": "Após retirar uma vermelha ficam 2 vermelhas em 4 bolas: 3/5×2/4.",
    "hypothesis": "Pode ignorar a alteração do universo sem reposição.",
    "time": 85,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q043",
    "micro": "PROB-08",
    "tema": "Problemas mistos",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "format": "EM",
    "signature": "misto|comb|exatamente",
    "text": "De 5 mulheres e 3 homens escolhem-se 3 pessoas. Qual expressão conta grupos com exatamente 2 mulheres?",
    "options": [
      "C(5,2)C(3,1)",
      "C(8,3)",
      "C(5,3)",
      "5×3"
    ],
    "correct": "A",
    "solution": "Escolhem-se 2 das 5 mulheres e 1 dos 3 homens.",
    "hypothesis": "Pode não decompor corretamente a restrição «exatamente».",
    "time": 100,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q044",
    "micro": "PROB-08",
    "tema": "Problemas mistos",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "format": "Curta",
    "signature": "misto|comb|probabilidade",
    "text": "De 4 raparigas e 2 rapazes escolhem-se 2 alunos ao acaso. Determina P(serem ambos rapazes).",
    "options": [],
    "correct": "1/15",
    "solution": "C(2,2)/C(6,2)=1/15.",
    "hypothesis": "Exige escolher o modelo combinatório e aplicar Laplace.",
    "time": 110,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q045",
    "micro": "PROB-08",
    "tema": "Problemas mistos",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "format": "EM",
    "signature": "misto|complementar|contagem",
    "text": "Escolhem-se 2 pessoas de um grupo de 5. Para calcular P(pelo menos uma pessoa específica ser escolhida), uma estratégia eficiente é...",
    "options": [
      "usar o complementar de nenhuma ser escolhida",
      "somar sempre 1/5+1/5",
      "usar apenas C(5,2)",
      "multiplicar por 5"
    ],
    "correct": "A",
    "solution": "«Pelo menos uma» é frequentemente mais simples pelo complementar «nenhuma».",
    "hypothesis": "Pode não reconhecer estratégias eficientes em problemas de contagem.",
    "time": 95,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q046",
    "micro": "ALG-01",
    "tema": "Álgebra transversal",
    "difficulty": 1,
    "cognitive": "Procedimento",
    "format": "Curta",
    "signature": "alg|linear|inteiros",
    "text": "Resolve 3x+5=20.",
    "options": [],
    "correct": "5",
    "solution": "3x=15, logo x=5.",
    "hypothesis": "Se falhar numa questão probabilística algébrica, esta questão separa álgebra do conteúdo principal.",
    "time": 45,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q047",
    "micro": "ALG-01",
    "tema": "Álgebra transversal",
    "difficulty": 1,
    "cognitive": "Procedimento",
    "format": "EM",
    "signature": "alg|linear|decimal",
    "text": "0,5x=0,15. x vale...",
    "options": [
      "0,075",
      "0,30",
      "0,65",
      "3"
    ],
    "correct": "B",
    "solution": "x=0,15/0,5=0,30.",
    "hypothesis": "Pode haver dificuldade algébrica/decimal independente do conteúdo de Probabilidades.",
    "time": 50,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q048",
    "micro": "ALG-01",
    "tema": "Álgebra transversal",
    "difficulty": 2,
    "cognitive": "Procedimento",
    "format": "Curta",
    "signature": "alg|formula|isolar",
    "text": "Se y=ax e a=0,4, y=0,12, determina x.",
    "options": [],
    "correct": "0,30",
    "solution": "x=y/a=0,12/0,4=0,30.",
    "hypothesis": "Serve de diagnóstico quando o aluno precisa isolar uma variável.",
    "time": 55,
    "validation": "Simbólica",
    "status": "Validado lógico"
  },
  {
    "id": "Q049",
    "micro": "REP-01",
    "tema": "Representações",
    "difficulty": 1,
    "cognitive": "Interpretação",
    "format": "EM",
    "signature": "repr|tabela|total",
    "text": "Numa tabela, uma linha tem frequências 4, 6 e 10. Qual é o total da linha?",
    "options": [
      "10",
      "16",
      "20",
      "24"
    ],
    "correct": "C",
    "solution": "4+6+10=20.",
    "hypothesis": "Testa leitura/agregação básica de tabela sem conteúdo probabilístico avançado.",
    "time": 35,
    "validation": "Determinística",
    "status": "Validado lógico"
  },
  {
    "id": "Q050",
    "micro": "REP-01",
    "tema": "Representações",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "format": "EM",
    "signature": "repr|tabela|subgrupo",
    "text": "Numa tabela de 30 pessoas, a coluna B totaliza 12. Se a pergunta diz «sabendo que pertence a B», qual total deve orientar a leitura?",
    "options": [
      "30",
      "12",
      "18",
      "42"
    ],
    "correct": "B",
    "solution": "A condição restringe a leitura ao subgrupo B, com total 12.",
    "hypothesis": "Se falhar, a dificuldade pode estar na leitura de representações e não na fórmula.",
    "time": 50,
    "validation": "Determinística",
    "status": "Validado lógico"
  }
];

export const MICRO = {
  "PROB-04": {
    "name": "Interpretar probabilidade condicionada",
    "parent": "Probabilidades",
    "prereqs": [
      "REP-01"
    ]
  },
  "PROB-05": {
    "name": "Calcular probabilidade condicionada",
    "parent": "Probabilidades",
    "prereqs": [
      "PROB-04",
      "ALG-01"
    ]
  },
  "PROB-06": {
    "name": "Distinguir independência de incompatibilidade",
    "parent": "Probabilidades",
    "prereqs": [
      "PROB-04"
    ]
  },
  "PROB-07": {
    "name": "Verificar independência",
    "parent": "Probabilidades",
    "prereqs": [
      "PROB-06",
      "PROB-05"
    ]
  },
  "CONT-01": {
    "name": "Aplicar princípio multiplicativo",
    "parent": "Contagem",
    "prereqs": []
  },
  "CONT-02": {
    "name": "Reconhecer quando a ordem interessa",
    "parent": "Contagem",
    "prereqs": [
      "CONT-01"
    ]
  },
  "CONT-03": {
    "name": "Calcular combinações",
    "parent": "Contagem",
    "prereqs": [
      "CONT-02",
      "ALG-01"
    ]
  },
  "PROB-03": {
    "name": "Aplicar regra de Laplace",
    "parent": "Probabilidades",
    "prereqs": [
      "CONT-01"
    ]
  },
  "PROB-08": {
    "name": "Combinar contagem e probabilidade",
    "parent": "Probabilidades",
    "prereqs": [
      "PROB-03",
      "CONT-03"
    ]
  },
  "ALG-01": {
    "name": "Resolver equações lineares",
    "parent": "Álgebra transversal",
    "prereqs": []
  },
  "REP-01": {
    "name": "Interpretar tabelas e subgrupos",
    "parent": "Representações",
    "prereqs": []
  }
};
