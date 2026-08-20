export const BANK={
  "PROB-04": {
    "name": "Interpretar probabilidade condicionada",
    "parent": "Probabilidades",
    "weight": 1.15,
    "prereqs": [
      "REP-01"
    ],
    "questions": [
      {
        "id": "P401",
        "d": 1,
        "type": "interpretação",
        "sig": "cond|universo|tabela",
        "q": "Numa turma, 12 alunos praticam futebol e 5 desses 12 também natação. Em P(Natação|Futebol), qual é o universo relevante?",
        "o": [
          "Toda a turma",
          "Os 12 que praticam futebol",
          "Os 5 que praticam ambos",
          "Os que não praticam futebol"
        ],
        "a": 1,
        "sol": "A condição Futebol restringe o universo aos 12 alunos que praticam futebol."
      },
      {
        "id": "P402",
        "d": 2,
        "type": "notação",
        "sig": "cond|notacao|significado",
        "q": "O que significa P(A|B)?",
        "o": [
          "Probabilidade de A ou B",
          "Probabilidade de A sabendo que B ocorreu",
          "Probabilidade de B sabendo que A ocorreu",
          "Probabilidade de A e B serem incompatíveis"
        ],
        "a": 1,
        "sol": "A barra vertical lê-se «sabendo que»; B é a condição."
      },
      {
        "id": "P403",
        "d": 3,
        "type": "raciocínio",
        "sig": "cond|efeito|universo",
        "q": "Qual afirmação é correta?",
        "o": [
          "P(A|B) usa sempre o mesmo universo de P(A)",
          "Conhecer B pode alterar a probabilidade atribuída a A",
          "P(A|B)=P(B|A) sempre",
          "P(A|B) só existe se A e B forem independentes"
        ],
        "a": 1,
        "sol": "A informação B restringe o universo e pode alterar a probabilidade de A."
      }
    ]
  },
  "PROB-05": {
    "name": "Calcular probabilidade condicionada",
    "parent": "Probabilidades",
    "weight": 1.25,
    "prereqs": [
      "PROB-04",
      "ALG-01"
    ],
    "questions": [
      {
        "id": "P501",
        "d": 1,
        "type": "aplicação",
        "sig": "condcalc|inteiros",
        "q": "Entre 20 alunos que estudam Matemática, 8 também estudam Física. Quanto vale P(Física|Matemática)?",
        "o": [
          "2/5",
          "8/28",
          "3/5",
          "1/5"
        ],
        "a": 0,
        "sol": "8/20=2/5."
      },
      {
        "id": "P502",
        "d": 2,
        "type": "aplicação",
        "sig": "condcalc|decimal",
        "q": "P(A∩B)=0,18 e P(B)=0,60. Quanto vale P(A|B)?",
        "o": [
          "0,30",
          "0,108",
          "0,42",
          "0,78"
        ],
        "a": 0,
        "sol": "P(A|B)=0,18/0,60=0,30."
      },
      {
        "id": "P503",
        "d": 3,
        "type": "inversão",
        "sig": "condcalc|inversao",
        "q": "P(A|B)=0,35 e P(B)=0,40. Quanto vale P(A∩B)?",
        "o": [
          "0,14",
          "0,75",
          "0,875",
          "0,05"
        ],
        "a": 0,
        "sol": "P(A∩B)=0,35×0,40=0,14."
      }
    ]
  },
  "ALG-01": {
    "name": "Resolver equações lineares",
    "parent": "Álgebra transversal",
    "weight": 0.85,
    "prereqs": [],
    "questions": [
      {
        "id": "A101",
        "d": 1,
        "type": "procedimento",
        "sig": "alg|linear|decimal",
        "q": "0,5x=0,15. Quanto vale x?",
        "o": [
          "0,075",
          "0,30",
          "0,65",
          "3"
        ],
        "a": 1,
        "sol": "x=0,15/0,5=0,30."
      },
      {
        "id": "A102",
        "d": 2,
        "type": "procedimento",
        "sig": "alg|isolar",
        "q": "Se y=ax, a=0,4 e y=0,12, quanto vale x?",
        "o": [
          "0,048",
          "0,30",
          "0,52",
          "3"
        ],
        "a": 1,
        "sol": "x=y/a=0,12/0,4=0,30."
      }
    ]
  },
  "REP-01": {
    "name": "Interpretar tabelas e subgrupos",
    "parent": "Representações",
    "weight": 0.8,
    "prereqs": [],
    "questions": [
      {
        "id": "R101",
        "d": 1,
        "type": "interpretação",
        "sig": "repr|subgrupo|tabela",
        "q": "Numa tabela de 30 pessoas, a coluna B totaliza 12. Se a pergunta diz «sabendo que pertence a B», qual total deve orientar a leitura?",
        "o": [
          "30",
          "12",
          "18",
          "42"
        ],
        "a": 1,
        "sol": "A condição restringe a leitura ao subgrupo B, com total 12."
      },
      {
        "id": "R102",
        "d": 2,
        "type": "interpretação",
        "sig": "repr|linha|total",
        "q": "Numa tabela, uma linha tem frequências 4, 6 e 10. Qual é o total da linha?",
        "o": [
          "10",
          "16",
          "20",
          "24"
        ],
        "a": 2,
        "sol": "4+6+10=20."
      }
    ]
  },
  "CONT-02": {
    "name": "Reconhecer quando a ordem interessa",
    "parent": "Contagem",
    "weight": 1.0,
    "prereqs": [],
    "questions": [
      {
        "id": "C201",
        "d": 1,
        "type": "conceito",
        "sig": "ordem|equipa",
        "q": "Escolher Ana e Bruno para uma equipa é diferente de escolher Bruno e Ana?",
        "o": [
          "Sim",
          "Não",
          "Só se houver capitão",
          "Depende da idade"
        ],
        "a": 1,
        "sol": "Sem funções distintas, a equipa é a mesma; a ordem não interessa."
      },
      {
        "id": "C202",
        "d": 2,
        "type": "contexto",
        "sig": "ordem|podio",
        "q": "Num pódio com 1.º, 2.º e 3.º lugares, a ordem dos atletas interessa?",
        "o": [
          "Sim",
          "Não",
          "Só no 1.º lugar",
          "Só se houver empate"
        ],
        "a": 0,
        "sol": "As posições são diferentes; trocar atletas altera o resultado."
      }
    ]
  },
  "CONT-03": {
    "name": "Calcular combinações",
    "parent": "Contagem",
    "weight": 1.1,
    "prereqs": [
      "CONT-02",
      "ALG-01"
    ],
    "questions": [
      {
        "id": "C301",
        "d": 1,
        "type": "aplicação",
        "sig": "comb|c5_2",
        "q": "Quanto vale C(5,2)?",
        "o": [
          "10",
          "20",
          "25",
          "5"
        ],
        "a": 0,
        "sol": "C(5,2)=10."
      },
      {
        "id": "C302",
        "d": 2,
        "type": "aplicação",
        "sig": "comb|equipa",
        "q": "Quantas equipas de 3 pessoas podem ser escolhidas entre 7?",
        "o": [
          "21",
          "35",
          "210",
          "343"
        ],
        "a": 1,
        "sol": "Como a ordem não interessa, C(7,3)=35."
      },
      {
        "id": "C303",
        "d": 3,
        "type": "restrição",
        "sig": "comb|restricao",
        "q": "De 5 raparigas e 4 rapazes escolhem-se 2 raparigas. Quantas escolhas existem?",
        "o": [
          "10",
          "20",
          "25",
          "9"
        ],
        "a": 0,
        "sol": "Escolhem-se 2 entre as 5 raparigas: C(5,2)=10."
      }
    ]
  }
};
