// Gerado por scripts/generate-vnext-exam.mjs. Não editar manualmente.
// Três itens originais, independentes e não reservados por submatéria para Mini-exames.
// Permanecem protótipos até revisão pedagógica; productionEligible continua false.
export const VNEXT_EXAM_QUESTIONS=[
  {
    "id": "EX-VN10ELE-BOR-019",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Método de Borda",
    "q": "Para três candidatos, comparar Borda 3-2-1 com a escala 2-1-0, aplicada aos mesmos boletins completos, conduz a quê?",
    "o": [
      "Pode mudar sempre o vencedor.",
      "Produz necessariamente um empate.",
      "Mantém as diferenças de pontuação e o vencedor, porque se retira 1 ponto a cada candidato por eleitor.",
      "Só mantém o vencedor se houver dois candidatos."
    ],
    "a": 2,
    "sol": "A escala 2-1-0 é a escala 3-2-1 menos 1 em todas as posições. Cada candidato perde exatamente um ponto por eleitor, por isso as diferenças permanecem.",
    "hyp": "Pode pensar que qualquer alteração numérica da escala altera a classificação.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-borda:10-ele-borda:transformacao-afim-translacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-019",
    "sourceFile": "content/vnext/math-a/10/10-ele-borda.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10ELE-BOR-041",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Método de Borda",
    "q": "Usa Borda 4-3-2-1. Há 4 eleitores A > B > C > D, 3 B > C > D > A, 2 C > D > A > B e 1 D > A > B > C. Quem vence?",
    "o": [
      "B",
      "A",
      "C",
      "D"
    ],
    "a": 0,
    "sol": "As pontuações são A=26, B=28, C=26 e D=20. B vence.",
    "hyp": "Pode perder-se na agregação de vários perfis com quatro candidatos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-borda:10-ele-borda:perfil-4-candidatos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-041",
    "sourceFile": "content/vnext/math-a/10/10-ele-borda.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10ELE-BOR-007",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Método de Borda",
    "q": "No mesmo perfil — 4 eleitores A > B > C, 3 B > A > C e 2 C > A > B — qual é a pontuação de B em Borda 3-2-1?",
    "o": [
      "17",
      "18",
      "19",
      "20"
    ],
    "a": 2,
    "sol": "B recebe 4×2 + 3×3 + 2×1 = 8+9+2 = 19.",
    "hyp": "Pode ignorar um grupo ou atribuir pontos errados à posição de B.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-borda:10-ele-borda:perfil-3-grupos-score",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-007",
    "sourceFile": "content/vnext/math-a/10/10-ele-borda.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10ELE-DHO-018",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Método de D'Hondt",
    "q": "A=1200 e B=600 votos. Qual igualdade de quocientes ocorre?",
    "o": [
      "A÷3 = B÷1",
      "A÷2 = B÷1",
      "A÷1 = B÷2",
      "A÷4 = B÷1"
    ],
    "a": 1,
    "sol": "1200÷2=600 e 600÷1=600.",
    "hyp": "Pode não reconhecer empates entre quocientes de ordens diferentes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-dhondt:10-ele-dhondt:empate-quocientes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-018",
    "sourceFile": "content/vnext/math-a/10/10-ele-dhondt.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10ELE-DHO-041",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Método de D'Hondt",
    "q": "Com votos A=1300, B=950, C=520 e 5 mandatos, A recebe 40% dos lugares (2 em 5), apesar de ter cerca de 46,9% dos votos. O que ilustra isto?",
    "o": [
      "A partilha de mandatos é discreta e não reproduz necessariamente as percentagens de votos de forma exata.",
      "D'Hondt ignora os votos de A.",
      "A deveria receber 2,345 mandatos.",
      "O método está mal aplicado."
    ],
    "a": 0,
    "sol": "Como os mandatos são inteiros, a representação final aproxima proporções através de uma regra discreta de quocientes.",
    "hyp": "Pode esperar igualdade exata entre percentagem de votos e percentagem de lugares.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-dhondt:10-ele-dhondt:discretizacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-041",
    "sourceFile": "content/vnext/math-a/10/10-ele-dhondt.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10ELE-DHO-007",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Método de D'Hondt",
    "q": "Há 5 mandatos: A=1300, B=950 e C=520 votos. Qual é a distribuição de mandatos por D'Hondt?",
    "o": [
      "A:3, B:1, C:1",
      "A:2, B:3, C:0",
      "A:2, B:2, C:1",
      "A:3, B:2, C:0"
    ],
    "a": 2,
    "sol": "Os cinco maiores quocientes são 1300(A), 950(B), 650(A), 520(C) e 475(B). Distribuição 2-2-1.",
    "hyp": "Pode ignorar o segundo quociente de B ou o primeiro de C.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-dhondt:10-ele-dhondt:alocacao-3-listas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-007",
    "sourceFile": "content/vnext/math-a/10/10-ele-dhondt.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10ELE-MAJ-022",
    "themeId": "10-ele",
    "subtopicId": "10-ele-majorias",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Maioria simples e maioria absoluta",
    "q": "Em 100 votos válidos, A tem 49, B 32 e C 19. Um voto de B passa para A. O que acontece?",
    "o": [
      "A passa a ter maioria absoluta.",
      "A fica com 50 votos e continua sem maioria absoluta.",
      "A deixa de ter maioria simples.",
      "B passa para primeiro lugar."
    ],
    "a": 1,
    "sol": "A passa a 50 votos, exatamente metade. Maioria absoluta exige mais de 50.",
    "hyp": "Pode considerar 50% suficiente para maioria absoluta.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-majorias:10-ele-majorias:transferencia-votos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-MAJ-022",
    "sourceFile": "content/vnext/math-a/10/10-ele-majorias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10ELE-MAJ-046",
    "themeId": "10-ele",
    "subtopicId": "10-ele-majorias",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Maioria simples e maioria absoluta",
    "q": "Com a mesma regra de eleição à primeira volta apenas com mais de 50% dos votos válidos, os resultados são A=50%, B=27%, C=23%. Qual é a decisão correta?",
    "o": [
      "A é eleita porque atingiu 50%.",
      "A e B passam à segunda volta.",
      "A e C passam à segunda volta.",
      "A eleição fica automaticamente anulada."
    ],
    "a": 1,
    "sol": "A tem exatamente 50%, não mais de 50%. Não há maioria absoluta; passam os dois mais votados, A e B.",
    "hyp": "Pode interpretar 'mais de 50%' como 'pelo menos 50%'.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-majorias:10-ele-majorias:regra-duas-voltas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-MAJ-046",
    "sourceFile": "content/vnext/math-a/10/10-ele-majorias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10ELE-MAJ-008",
    "themeId": "10-ele",
    "subtopicId": "10-ele-majorias",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Maioria simples e maioria absoluta",
    "q": "Numa assembleia há 75 votos válidos. Uma proposta recebeu 37 votos a favor, 28 contra e 10 noutra opção. Tem maioria absoluta?",
    "o": [
      "Sim, porque 37 é o maior número.",
      "Sim, porque 37 é quase metade.",
      "Não, porque seriam necessários 40 votos.",
      "Não, porque são necessários pelo menos 38 votos."
    ],
    "a": 3,
    "sol": "Mais de metade de 75 é mais de 37,5; são necessários pelo menos 38 votos.",
    "hyp": "Pode usar o maior número de votos em vez do limiar de metade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-majorias:10-ele-majorias:limiar-impar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-MAJ-008",
    "sourceFile": "content/vnext/math-a/10/10-ele-majorias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10ELE-STL-010",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Com 6 mandatos e votos A=980, B=760, C=460, D=300, qual lista recebe dois mandatos além de A?",
    "o": [
      "C",
      "B",
      "D",
      "Nenhuma"
    ],
    "a": 1,
    "sol": "St. Laguë dá A=2, B=2, C=1 e D=1.",
    "hyp": "Pode desvalorizar os primeiros quocientes de C e D face aos segundos quocientes das listas maiores.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-stlague-comparacao:10-ele-stlague-comparacao:mandatos-lista-4",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-010",
    "sourceFile": "content/vnext/math-a/10/10-ele-stlague-comparacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10ELE-STL-035",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Com A=980, B=760, C=460, D=300 e 6 mandatos, qual é o menor quociente entre os seis selecionados em St. Laguë?",
    "o": [
      "300 de D",
      "326,67 de A",
      "253,33 de B",
      "460 de C"
    ],
    "a": 2,
    "sol": "Os selecionados são 980(A),760(B),460(C),326,67(A),300(D),253,33(B). O menor é 253,33.",
    "hyp": "Pode identificar o menor voto inicial em vez do último quociente vencedor.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-stlague-comparacao:10-ele-stlague-comparacao:quociente-limite-4",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-035",
    "sourceFile": "content/vnext/math-a/10/10-ele-stlague-comparacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10ELE-STL-016",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Se existem 6 mandatos, quantos mandatos devem estar distribuídos no final da aplicação do método?",
    "o": [
      "5",
      "7",
      "Depende do número de listas",
      "6"
    ],
    "a": 3,
    "sol": "O método preenche os 6 lugares disponíveis.",
    "hyp": "Pode achar que uma lista sem quociente elevado deixa um lugar vazio.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-stlague-comparacao:10-ele-stlague-comparacao:conservacao-mandatos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-016",
    "sourceFile": "content/vnext/math-a/10/10-ele-stlague-comparacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-AMO-022",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "Uma escola envia questionário a todos os alunos, mas só 15% responde. Qual risco permanece?",
    "o": [
      "Nenhum, porque todos receberam o questionário.",
      "Enviesamento de não resposta.",
      "A população desaparece.",
      "A amostra passa a ser censo."
    ],
    "a": 1,
    "sol": "Respondentes e não respondentes podem diferir sistematicamente.",
    "hyp": "Pode confundir convite universal com resposta universal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-amostragem:10-est-amostragem:nao-resposta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-022",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-AMO-041",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "Uma população tem 2 000 elementos divididos em estratos de 1 000, 600 e 400. Numa amostra proporcional de 250, quantos vêm do menor estrato?",
    "o": [
      "50",
      "40",
      "60",
      "80"
    ],
    "a": 0,
    "sol": "400/2000=20%; 20% de 250=50.",
    "hyp": "Pode aplicar 400/250 em vez de 400/2000.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-amostragem:10-est-amostragem:estratificada-proporcional",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-041",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-AMO-009",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "Na amostragem estratificada, a população é primeiro...",
    "o": [
      "dividida em grupos relevantes, escolhendo-se depois elementos de cada grupo.",
      "ordenada alfabeticamente e truncada.",
      "reduzida ao grupo maior.",
      "substituída por voluntários."
    ],
    "a": 0,
    "sol": "Os estratos são subgrupos definidos por características relevantes.",
    "hyp": "Pode confundir estratos com amostras de conveniência.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-amostragem:10-est-amostragem:estratificada-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-009",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-BIV-023",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "A previsão é 20 e o observado é 17. Qual é o resíduo observado−previsto?",
    "o": [
      "3",
      "17",
      "−3",
      "20"
    ],
    "a": 2,
    "sol": "17−20=−3.",
    "hyp": "Pode usar valor absoluto e perder o sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-bivariados-regressao:10-est-bivariados-regressao:residuo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-023",
    "sourceFile": "content/vnext/math-a/10/10-est-bivariados-regressao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-BIV-038",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "Um modelo y=30−0,5x é usado para x entre 0 e 20. Prever para x=100 é...",
    "o": [
      "interpolação.",
      "extrapolação forte.",
      "cálculo de mediana.",
      "sempre seguro por ser uma reta."
    ],
    "a": 1,
    "sol": "100 está muito fora do intervalo observado.",
    "hyp": "Pode pensar que equação válida implica previsão segura em qualquer x.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-bivariados-regressao:10-est-bivariados-regressao:extrapolacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-038",
    "sourceFile": "content/vnext/math-a/10/10-est-bivariados-regressao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-BIV-008",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "Um valor r próximo de −1 indica...",
    "o": [
      "forte associação linear positiva.",
      "ausência de relação.",
      "variância zero.",
      "forte associação linear negativa."
    ],
    "a": 3,
    "sol": "r próximo de −1 corresponde a forte padrão linear decrescente.",
    "hyp": "Pode ignorar o sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-bivariados-regressao:10-est-bivariados-regressao:interpretar-r-negativo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-008",
    "sourceFile": "content/vnext/math-a/10/10-est-bivariados-regressao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-DIS-022",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "Nos mesmos dados 1 a 8, Q3 é...",
    "o": [
      "5,5",
      "6,5",
      "6",
      "7"
    ],
    "a": 1,
    "sol": "Metade superior 5,6,7,8; mediana=(6+7)/2=6,5.",
    "hyp": "Pode usar 6 ou 7 diretamente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-dispersao:10-est-dispersao:quartil",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-022",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-DIS-038",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "Um conjunto tem variância 16. Qual é o desvio padrão?",
    "o": [
      "2",
      "4",
      "8",
      "16"
    ],
    "a": 1,
    "sol": "sqrt(16)=4.",
    "hyp": "Pode esquecer a raiz quadrada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-dispersao:10-est-dispersao:variancia-para-dp",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-038",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-DIS-007",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "O desvio padrão é...",
    "o": [
      "o quadrado da média.",
      "o máximo menos o mínimo.",
      "a raiz quadrada da variância.",
      "sempre igual à mediana."
    ],
    "a": 2,
    "sol": "Desvio padrão=sqrt(variância).",
    "hyp": "Pode inverter relação entre variância e desvio padrão.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-dispersao:10-est-dispersao:desvio-padrao-conceito",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-007",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-LOC-023",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Medidas de localização",
    "q": "Nos dados 10,10,11,12,57, qual é a média?",
    "o": [
      "11",
      "18",
      "20",
      "22"
    ],
    "a": 2,
    "sol": "Soma=100; média=20.",
    "hyp": "Pode confundir média com mediana.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-localizacao:10-est-localizacao:media-outlier",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-023",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-LOC-037",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Medidas de localização",
    "q": "A média de 10 valores é 15. Retira-se um valor 24. Qual é a nova média?",
    "o": [
      "14",
      "13",
      "14,5",
      "15"
    ],
    "a": 0,
    "sol": "Soma inicial=150; nova soma=126; 126/9=14.",
    "hyp": "Pode subtrair 24 à média em vez da soma.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-localizacao:10-est-localizacao:remover-valor",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-037",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-LOC-011",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Medidas de localização",
    "q": "Um conjunto em que todos os valores têm a mesma frequência tem necessariamente uma moda única?",
    "o": [
      "Sim.",
      "Só se tiver 10 valores.",
      "Não.",
      "Só se a média for inteira."
    ],
    "a": 2,
    "sol": "Sem uma frequência superior às outras, pode não existir uma moda única.",
    "hyp": "Pode forçar uma moda quando não há valor dominante.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-localizacao:10-est-localizacao:sem-moda-unica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-011",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-PPA-023",
    "themeId": "10-est",
    "subtopicId": "10-est-problema-pop-amostra",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Problema estatístico, variabilidade, população, amostra e variável",
    "q": "A variável 'distrito de residência' é melhor classificada como...",
    "o": [
      "qualitativa ordinal.",
      "quantitativa contínua.",
      "qualitativa nominal.",
      "quantitativa discreta."
    ],
    "a": 2,
    "sol": "Os distritos são categorias sem ordem quantitativa natural.",
    "hyp": "Pode impor uma ordem arbitrária às categorias.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-problema-pop-amostra:10-est-problema-pop-amostra:qualitativa-nominal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-PPA-023",
    "sourceFile": "content/vnext/math-a/10/10-est-problema-pop-amostra.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-PPA-042",
    "themeId": "10-est",
    "subtopicId": "10-est-problema-pop-amostra",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Problema estatístico, variabilidade, população, amostra e variável",
    "q": "Pretende-se estudar a duração de bateria de uma produção de 10 000 aparelhos, testando uma amostra de 40. Qual combinação está correta?",
    "o": [
      "População=40; amostra=10 000; variável=marca.",
      "População=10 000 aparelhos; amostra=40; variável=duração da bateria.",
      "População=duração; amostra=baterias; variável=40.",
      "População=laboratório; amostra=40; variável=produção."
    ],
    "a": 1,
    "sol": "A população é o lote de interesse, a amostra são os testados e a variável é a duração.",
    "hyp": "Pode trocar os três conceitos centrais.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-problema-pop-amostra:10-est-problema-pop-amostra:tripla-identificacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-PPA-042",
    "sourceFile": "content/vnext/math-a/10/10-est-problema-pop-amostra.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-PPA-009",
    "themeId": "10-est",
    "subtopicId": "10-est-problema-pop-amostra",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Problema estatístico, variabilidade, população, amostra e variável",
    "q": "A variável 'massa corporal em kg' é normalmente tratada como...",
    "o": [
      "quantitativa contínua.",
      "qualitativa.",
      "quantitativa discreta.",
      "binária."
    ],
    "a": 0,
    "sol": "A massa pode assumir valores numéricos numa escala contínua.",
    "hyp": "Pode tratar qualquer valor registado com casas decimais como categoria.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-problema-pop-amostra:10-est-problema-pop-amostra:tipo-continua",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-PPA-009",
    "sourceFile": "content/vnext/math-a/10/10-est-problema-pop-amostra.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-UNI-022",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Dados univariados e representações",
    "q": "A frequência acumulada é especialmente útil quando as categorias/valores têm...",
    "o": [
      "nenhuma ordem possível.",
      "uma ordem natural.",
      "apenas nomes aleatórios.",
      "sempre frequência igual."
    ],
    "a": 1,
    "sol": "A acumulação faz sentido quando se pode falar em 'até' determinado valor/classe.",
    "hyp": "Pode acumular categorias nominais sem significado ordinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-univariados-representacoes:10-est-univariados-representacoes:acumulada-conceito",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-022",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-UNI-039",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Dados univariados e representações",
    "q": "Uma tabela apresenta frequências relativas 0,15; 0,25; 0,35; x. Qual é x?",
    "o": [
      "0,15",
      "0,20",
      "0,25",
      "0,30"
    ],
    "a": 2,
    "sol": "x=1−0,75=0,25.",
    "hyp": "Pode completar para 100 em vez de 1 na forma decimal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-univariados-representacoes:10-est-univariados-representacoes:completar-relativas-decimal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-039",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-UNI-008",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Dados univariados e representações",
    "q": "Numa tabela, as frequências relativas são 20%, 35%, 15% e x. Qual é x?",
    "o": [
      "20%",
      "25%",
      "35%",
      "30%"
    ],
    "a": 3,
    "sol": "x=100−20−35−15=30%.",
    "hyp": "Pode esquecer que as frequências relativas totalizam 100%.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-univariados-representacoes:10-est-univariados-representacoes:completar-relativas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-008",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-BRL-022",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Um bruto de 2 400 € tem descontos de 11% e 14%, ambos sobre o bruto. Qual é o total de descontos?",
    "o": [
      "540 €",
      "600 €",
      "660 €",
      "720 €"
    ],
    "a": 1,
    "sol": "Taxa total=25%. 25% de 2 400=600 €.",
    "hyp": "Pode aplicar 14% sobre o valor já reduzido em 11% apesar de a base comum estar explícita.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-bruto-liquido:10-fin-bruto-liquido:duas-taxas-mesma-base",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-022",
    "sourceFile": "content/vnext/math-a/10/10-fin-bruto-liquido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-BRL-041",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Um bruto de 2 500 € sofre dois descontos: 10% do bruto e depois um desconto adicional de 5% calculado sobre o valor que resta após o primeiro desconto. Qual é o líquido?",
    "o": [
      "2 137,50 €",
      "2 125 €",
      "2 150 €",
      "2 175 €"
    ],
    "a": 0,
    "sol": "Após 10% restam 2 250 €. Depois descontam-se 5% de 2 250=112,50 €. Líquido=2 137,50 €.",
    "hyp": "Pode somar 10%+5% como se incidissem sobre a mesma base.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-bruto-liquido:10-fin-bruto-liquido:taxas-sucessivas-bases-diferentes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-041",
    "sourceFile": "content/vnext/math-a/10/10-fin-bruto-liquido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-BRL-014",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Qual afirmação é necessariamente verdadeira num modelo em que apenas se subtraem descontos não negativos ao salário bruto?",
    "o": [
      "O salário líquido é maior do que o bruto.",
      "O salário líquido é menor ou igual ao bruto.",
      "O bruto é sempre zero.",
      "Os descontos são sempre 50%."
    ],
    "a": 1,
    "sol": "Subtrair valores não negativos não pode aumentar o salário.",
    "hyp": "Pode ignorar a relação algébrica líquido=bruto−descontos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-bruto-liquido:10-fin-bruto-liquido:ordem-bruto-liquido",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-014",
    "sourceFile": "content/vnext/math-a/10/10-fin-bruto-liquido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-IRS-022",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Que taxa efetiva resulta de 200 € de imposto num rendimento de 2 000 €?",
    "o": [
      "8%",
      "10%",
      "12%",
      "25%"
    ],
    "a": 1,
    "sol": "200/2 000 = 10%.",
    "hyp": "Pode usar a taxa marginal de 25%.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-irs:10-fin-irs:efetiva",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-022",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-IRS-037",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Tabela 10%-20%-30% com limites em 1 000 € e 2 000 €. Para que rendimento a taxa efetiva é exatamente 20%?",
    "o": [
      "3 000 €",
      "2 000 €",
      "2 500 €",
      "4 000 €"
    ],
    "a": 0,
    "sol": "Em 3 000 €, imposto 600 €; 600/3 000 = 20%.",
    "hyp": "Pode associar 20% ao segundo escalão sem resolver a média.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-irs:10-fin-irs:resolver-efetiva-alvo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-037",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-IRS-015",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Numa tabela progressiva com taxas crescentes, qual afirmação pode ser verdadeira?",
    "o": [
      "A taxa efetiva é sempre superior a todas as marginais.",
      "Todos os escalões usam a mesma taxa.",
      "A taxa efetiva é inferior à maior taxa marginal atingida.",
      "O imposto total é sempre zero."
    ],
    "a": 2,
    "sol": "As parcelas inferiores pagam taxas menores, baixando a taxa média.",
    "hyp": "Pode inverter a relação entre taxa marginal e efetiva.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-irs:10-fin-irs:efetiva-inferior",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-015",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-JC-021",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "5 000 € são aplicados a 3% ao ano durante 4 anos. Qual é o montante composto aproximado?",
    "o": [
      "5 627,54 €",
      "5 600,00 €",
      "5 650,00 €",
      "5 720,00 €"
    ],
    "a": 0,
    "sol": "5000×1,03⁴≈5627,54 €.",
    "hyp": "Pode usar 12% simples e obter 5600 €.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-juro-composto-credito:10-fin-juro-composto-credito:quatro-periodos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-021",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-JC-037",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "Um capital termina em 2 420 € após dois anos a 10% ao ano em regime composto. Qual era o capital inicial?",
    "o": [
      "2 000 €",
      "1 900 €",
      "2 100 €",
      "2 200 €"
    ],
    "a": 0,
    "sol": "C=2420/1,21=2000 €.",
    "hyp": "Pode subtrair 20% do montante em vez de dividir pelo fator acumulado.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-juro-composto-credito:10-fin-juro-composto-credito:inverter-capital",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-037",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-JC-016",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Comparação",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "1 000 € a 10% durante 2 anos: qual é a diferença entre o montante composto e o simples?",
    "o": [
      "5 €",
      "20 €",
      "100 €",
      "10 €"
    ],
    "a": 3,
    "sol": "Composto=1210 €. Simples=1200 €. Diferença=10 €.",
    "hyp": "Pode comparar apenas os juros do segundo ano sem calcular ambos os montantes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-juro-composto-credito:10-fin-juro-composto-credito:comparar-simples-composto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-016",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-JS-021",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Juro simples",
    "q": "Um empréstimo didático de 4 000 € usa juro simples de 7% ao ano por 2 anos. Se for pago integralmente no fim, qual é o montante total?",
    "o": [
      "4 560 €",
      "4 280 €",
      "4 420 €",
      "4 700 €"
    ],
    "a": 0,
    "sol": "4000+560=4560 €.",
    "hyp": "Pode confundir prestação com montante final.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-juro-simples:10-fin-juro-simples:emprestimo-montante",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-021",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-JS-038",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Juro simples",
    "q": "Uma aplicação simples de 2 400 € termina com 2 688 € após 3 anos. Qual foi a taxa anual?",
    "o": [
      "3%",
      "4%",
      "5%",
      "6%"
    ],
    "a": 1,
    "sol": "J=288 €. i=288/(2400×3)=0,04=4%.",
    "hyp": "Pode calcular a taxa total de 12% e não anualizar.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-juro-simples:10-fin-juro-simples:inverter-taxa-montante",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-038",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-JS-017",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Juro simples",
    "q": "Se o tempo de aplicação duplica num regime simples, mantendo capital e taxa, o juro...",
    "o": [
      "duplica.",
      "fica igual.",
      "quadruplica.",
      "é elevado ao quadrado."
    ],
    "a": 0,
    "sol": "J=Cin é diretamente proporcional a n.",
    "hyp": "Pode aplicar uma lógica exponencial.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-juro-simples:10-fin-juro-simples:proporcionalidade-tempo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-017",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-SAL-023",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Uma pessoa ganha 10 € por hora e trabalha 1 750 horas num ano. Qual é a remuneração anual, neste modelo?",
    "o": [
      "16 500 €",
      "17 000 €",
      "17 500 €",
      "18 500 €"
    ],
    "a": 2,
    "sol": "10×1 750=17 500 €.",
    "hyp": "Pode converter desnecessariamente para meses e introduzir erro.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-salarios:10-fin-salarios:hora-para-anual",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-023",
    "sourceFile": "content/vnext/math-a/10/10-fin-salarios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-SAL-041",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Oferta A: 16 800 € anuais por 1 680 h/ano. Oferta B: 17 100 € anuais por 1 800 h/ano. Qual tem maior valor médio por hora?",
    "o": [
      "A, com 10 €/h.",
      "B, com 10 €/h.",
      "B, com 9,50 €/h.",
      "Têm o mesmo valor/hora."
    ],
    "a": 0,
    "sol": "A: 16 800/1 680=10 €/h. B: 17 100/1 800=9,50 €/h. A tem maior valor por hora.",
    "hyp": "Pode escolher o maior salário anual sem ponderar as horas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-salarios:10-fin-salarios:comparar-anual-valor-hora",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-041",
    "sourceFile": "content/vnext/math-a/10/10-fin-salarios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-SAL-009",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Uma oferta paga 1 400 € em 12 prestações e outra 1 200 € em 14 prestações. Qual é a comparação anual?",
    "o": [
      "São iguais: 16 800 € por ano.",
      "A segunda é maior em 400 €.",
      "A primeira é maior em 1 200 €.",
      "A segunda é maior em 1 200 €."
    ],
    "a": 0,
    "sol": "1 400×12=16 800 € e 1 200×14=16 800 €. Os totais anuais são iguais.",
    "hyp": "Pode escolher a prestação mensal maior sem anualizar as duas propostas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-salarios:10-fin-salarios:comparar-ofertas-iguais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-009",
    "sourceFile": "content/vnext/math-a/10/10-fin-salarios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-AF-022",
    "themeId": "10-fun",
    "subtopicId": "10-fun-afim",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função afim e modelação",
    "q": "Qual é a equação da reta que passa por (−1,4) e (2,−2)?",
    "o": [
      "y=2x+6",
      "y=−2x+2",
      "y=−x+3",
      "y=−2x−2"
    ],
    "a": 1,
    "sol": "Declive=(−2−4)/(2−(−1))=−6/3=−2. 4=2+b => b=2.",
    "hyp": "Pode errar diferenças com negativos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-afim:10-fun-afim:equacao-dois-pontos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-AF-022",
    "sourceFile": "content/vnext/math-a/10/10-fun-afim.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-AF-039",
    "themeId": "10-fun",
    "subtopicId": "10-fun-afim",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Função afim e modelação",
    "q": "Se duas funções afins têm declives de sinais opostos, uma é crescente e outra...",
    "o": [
      "constante.",
      "paralela.",
      "decrescente.",
      "necessariamente perpendicular."
    ],
    "a": 2,
    "sol": "Sinais opostos implicam monotonicidades opostas.",
    "hyp": "Pode inferir perpendicularidade apenas do sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-afim:10-fun-afim:comparar-monotonia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-AF-039",
    "sourceFile": "content/vnext/math-a/10/10-fun-afim.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-AF-007",
    "themeId": "10-fun",
    "subtopicId": "10-fun-afim",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Função afim e modelação",
    "q": "Se a<0 numa função afim, a função é...",
    "o": [
      "crescente.",
      "constante.",
      "decrescente.",
      "sempre positiva."
    ],
    "a": 2,
    "sol": "Declive negativo implica decréscimo.",
    "hyp": "Pode associar sinal de a ao sinal de f.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-afim:10-fun-afim:monotonia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-AF-007",
    "sourceFile": "content/vnext/math-a/10/10-fun-afim.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-CR-023",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Conceito de função e representações",
    "q": "Uma relação dada pelos pares (1,2),(1,3),(2,4) é função de x?",
    "o": [
      "Sim.",
      "Só se 2=3.",
      "Não.",
      "Só para x=2."
    ],
    "a": 2,
    "sol": "A entrada 1 tem duas saídas distintas.",
    "hyp": "Pode não verificar entradas repetidas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-conceito-representacoes:10-fun-conceito-representacoes:pares-nao-funcao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-023",
    "sourceFile": "content/vnext/math-a/10/10-fun-conceito-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-CR-037",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Conceito de função e representações",
    "q": "No domínio R, f(x)=(x²−1)/(x−1) e g(x)=x+1 definem a mesma função?",
    "o": [
      "Não, porque f não está definida em x=1 e g está.",
      "Sim, porque simplificam para a mesma expressão.",
      "Sim, sempre que x≠0.",
      "Não, porque os gráficos nunca coincidem."
    ],
    "a": 0,
    "sol": "Apesar de f(x)=x+1 para x≠1, os domínios diferem em x=1.",
    "hyp": "Pode simplificar uma expressão e esquecer restrições do domínio.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-conceito-representacoes:10-fun-conceito-representacoes:mesma-expressao-dominio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-037",
    "sourceFile": "content/vnext/math-a/10/10-fun-conceito-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-CR-009",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Conceito de função e representações",
    "q": "O teste da reta vertical num gráfico serve para verificar se...",
    "o": [
      "cada valor de x tem no máximo um valor de y no gráfico.",
      "cada y tem no máximo um x.",
      "o gráfico é uma reta.",
      "a função é crescente."
    ],
    "a": 0,
    "sol": "Se alguma reta vertical intersecta o gráfico em mais de um ponto, não é gráfico de função y=f(x).",
    "hyp": "Pode confundir reta vertical com horizontal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-conceito-representacoes:10-fun-conceito-representacoes:teste-reta-vertical",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-009",
    "sourceFile": "content/vnext/math-a/10/10-fun-conceito-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-DIZ-022",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Domínio, contradomínio/imagem, zeros e sinal",
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
      "exam"
    ],
    "signature": "exam:10-fun-dominio-imagem-zeros:10-fun-dominio-imagem-zeros:imagem-quadratica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-DIZ-022",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-DIZ-037",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Domínio, contradomínio/imagem, zeros e sinal",
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
      "exam"
    ],
    "signature": "exam:10-fun-dominio-imagem-zeros:10-fun-dominio-imagem-zeros:dominio-combinado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-DIZ-037",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-DIZ-008",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Domínio, contradomínio/imagem, zeros e sinal",
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
      "exam"
    ],
    "signature": "exam:10-fun-dominio-imagem-zeros:10-fun-dominio-imagem-zeros:sinal-positivo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-DIZ-008",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-QUA-022",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "Uma parábola tem zeros −4 e 2. Qual é a abcissa do vértice?",
    "o": [
      "−2",
      "−1",
      "1",
      "3"
    ],
    "a": 1,
    "sol": "(−4+2)/2=−1.",
    "hyp": "Pode errar a média com negativos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-quadratica:10-fun-quadratica:eixo-entre-raizes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-022",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-QUA-042",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "No modelo h(t)=−5t²+20t+1, qual é a altura máxima?",
    "o": [
      "16",
      "21",
      "20",
      "25"
    ],
    "a": 1,
    "sol": "h(2)=−20+40+1=21.",
    "hyp": "Pode usar apenas o termo 20 ou esquecer o +1.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-quadratica:10-fun-quadratica:modelo-altura-maximo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-042",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-QUA-007",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "Quais são os zeros de f(x)=x²−5x+6?",
    "o": [
      "−2 e −3.",
      "1 e 6.",
      "2 e 3.",
      "−1 e 6."
    ],
    "a": 2,
    "sol": "x²−5x+6=(x−2)(x−3).",
    "hyp": "Pode fatorizar com sinais errados.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-quadratica:10-fun-quadratica:zeros-fatorizacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-007",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-TRM-022",
    "themeId": "10-fun",
    "subtopicId": "10-fun-transformacoes-ramos-modulo",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Transformações de gráficos, funções por ramos e módulo",
    "q": "O gráfico de y=|x|+2 tem vértice...",
    "o": [
      "(2,0).",
      "(0,2).",
      "(0,−2).",
      "(−2,0)."
    ],
    "a": 1,
    "sol": "Translação vertical de 2 para cima.",
    "hyp": "Pode trocar deslocamento vertical com horizontal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-transformacoes-ramos-modulo:10-fun-transformacoes-ramos-modulo:modulo-translacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-TRM-022",
    "sourceFile": "content/vnext/math-a/10/10-fun-transformacoes-ramos-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-TRM-038",
    "themeId": "10-fun",
    "subtopicId": "10-fun-transformacoes-ramos-modulo",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Transformações de gráficos, funções por ramos e módulo",
    "q": "Qual expressão representa |2x+4| por ramos?",
    "o": [
      "2x+4 se x≥2; −2x−4 se x<2.",
      "2x+4 se x≥−2; −2x−4 se x<−2.",
      "2x+4 para todo x.",
      "−2x−4 para todo x."
    ],
    "a": 1,
    "sol": "A mudança ocorre quando 2x+4=0, isto é, x=−2.",
    "hyp": "Pode usar sinal oposto ou fronteira errada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-transformacoes-ramos-modulo:10-fun-transformacoes-ramos-modulo:modulo-ramos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-TRM-038",
    "sourceFile": "content/vnext/math-a/10/10-fun-transformacoes-ramos-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-TRM-011",
    "themeId": "10-fun",
    "subtopicId": "10-fun-transformacoes-ramos-modulo",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Transformações de gráficos, funções por ramos e módulo",
    "q": "Multiplicar f(x) por 2, isto é, g(x)=2f(x), provoca...",
    "o": [
      "uma translação 2 unidades para cima.",
      "uma dilatação horizontal por fator 2.",
      "uma dilatação vertical por fator 2.",
      "uma reflexão."
    ],
    "a": 2,
    "sol": "Todas as ordenadas ficam multiplicadas por 2.",
    "hyp": "Pode confundir multiplicação com translação.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-transformacoes-ramos-modulo:10-fun-transformacoes-ramos-modulo:escala-vertical",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-TRM-011",
    "sourceFile": "content/vnext/math-a/10/10-fun-transformacoes-ramos-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-RET-022",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Colinearidade e equações de retas",
    "q": "Uma reta de declive 2 é perpendicular a uma reta de declive...",
    "o": [
      "1/2.",
      "−1/2.",
      "−2.",
      "2."
    ],
    "a": 1,
    "sol": "2×(−1/2)=−1.",
    "hyp": "Pode usar apenas o oposto.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-colinearidade-retas:10-ga-colinearidade-retas:perpendicularidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-022",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-RET-037",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Colinearidade e equações de retas",
    "q": "Que equação reduzida corresponde a (x,y)=(1,2)+t(2,4)?",
    "o": [
      "y=2x.",
      "y=2x+1.",
      "y=4x−2.",
      "y=x+1."
    ],
    "a": 0,
    "sol": "x=1+2t => t=(x−1)/2; y=2+4t=2+2(x−1)=2x.",
    "hyp": "Pode usar diretamente 4/2 como b.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-colinearidade-retas:10-ga-colinearidade-retas:parametrica-para-reduzida",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-037",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-RET-008",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Colinearidade e equações de retas",
    "q": "Se uma reta tem declive positivo, ela é...",
    "o": [
      "decrescente.",
      "horizontal.",
      "vertical.",
      "crescente da esquerda para a direita."
    ],
    "a": 3,
    "sol": "m>0 implica crescimento.",
    "hyp": "Pode confundir sinal do declive.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-colinearidade-retas:10-ga-colinearidade-retas:declive-sinal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-008",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-CT-022",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Coordenadas e transformações no plano",
    "q": "Uma rotação de 90° no sentido horário em torno da origem transforma (x,y) em...",
    "o": [
      "(−y,x).",
      "(y,−x).",
      "(−x,−y).",
      "(x,−y)."
    ],
    "a": 1,
    "sol": "A regra horária é (x,y)→(y,−x).",
    "hyp": "Pode trocar os sentidos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-coordenadas-transformacoes:10-ga-coordenadas-transformacoes:rotacao-90",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-022",
    "sourceFile": "content/vnext/math-a/10/10-ga-coordenadas-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-CT-038",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Coordenadas e transformações no plano",
    "q": "Uma rotação de 90° anti-horária leva A=(a,b) a A'=(−4,3). Quais são a e b?",
    "o": [
      "a=−3,b=−4.",
      "a=3,b=4.",
      "a=4,b=3.",
      "a=−4,b=3."
    ],
    "a": 1,
    "sol": "(−b,a)=(−4,3), logo b=4 e a=3.",
    "hyp": "Pode inverter a regra.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-coordenadas-transformacoes:10-ga-coordenadas-transformacoes:inverter-rotacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-038",
    "sourceFile": "content/vnext/math-a/10/10-ga-coordenadas-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-CT-008",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Coordenadas e transformações no plano",
    "q": "Um ponto com x<0 e y>0 pertence ao...",
    "o": [
      "1.º quadrante.",
      "3.º quadrante.",
      "4.º quadrante.",
      "2.º quadrante."
    ],
    "a": 3,
    "sol": "No 2.º quadrante x é negativo e y positivo.",
    "hyp": "Pode inverter sinais.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-coordenadas-transformacoes:10-ga-coordenadas-transformacoes:quadrantes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-008",
    "sourceFile": "content/vnext/math-a/10/10-ga-coordenadas-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-DPM-022",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Distâncias e ponto médio",
    "q": "Os pontos P=(x,4) estão a distância 5 da origem. Que valores de x são possíveis?",
    "o": [
      "−5 e 5.",
      "−3 e 3.",
      "3 apenas.",
      "−4 e 4."
    ],
    "a": 1,
    "sol": "x²+16=25 => x²=9 => x=±3.",
    "hyp": "Pode esquecer uma solução.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-distancias-ponto-medio:10-ga-distancias-ponto-medio:distancia-inversa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-022",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-DPM-046",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Distâncias e ponto médio",
    "q": "Se dois segmentos têm pontos médios iguais, pode concluir-se que têm os mesmos extremos?",
    "o": [
      "Sim.",
      "Não.",
      "Só se tiverem o mesmo comprimento.",
      "Só se forem horizontais."
    ],
    "a": 1,
    "sol": "Muitos segmentos diferentes podem partilhar o mesmo ponto médio.",
    "hyp": "Pode confundir ponto médio com identificação única do segmento.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-distancias-ponto-medio:10-ga-distancias-ponto-medio:ponto-medio-nao-unico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-046",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-DPM-007",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Distâncias e ponto médio",
    "q": "Qual é o ponto médio de A=(−2,3) e B=(4,7)?",
    "o": [
      "(2,5).",
      "(1,10).",
      "(1,5).",
      "(−3,2)."
    ],
    "a": 2,
    "sol": "((−2+4)/2,(3+7)/2)=(1,5).",
    "hyp": "Pode errar soma com número negativo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-distancias-ponto-medio:10-ga-distancias-ponto-medio:ponto-medio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-007",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-ESP-023",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "Duas retas no espaço com vetores diretores proporcionais são...",
    "o": [
      "sempre coincidentes.",
      "sempre perpendiculares.",
      "paralelas ou coincidentes.",
      "sempre secantes."
    ],
    "a": 2,
    "sol": "Vetores proporcionais dão a mesma direção; a posição decide se coincidem ou são distintas.",
    "hyp": "Pode concluir coincidência só pela direção.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-espaco:10-ga-espaco:retas-paralelas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-023",
    "sourceFile": "content/vnext/math-a/10/10-ga-espaco.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-ESP-038",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "O ponto Q=(7,3,−1) pertence à reta (x,y,z)=(1,0,2)+t(2,1,−1)?",
    "o": [
      "Não.",
      "Sim.",
      "Só se t=2.",
      "Não é possível saber."
    ],
    "a": 1,
    "sol": "De x: t=3; então y=3 e z=−1, logo pertence.",
    "hyp": "Pode testar só uma coordenada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-espaco:10-ga-espaco:pertença-reta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-038",
    "sourceFile": "content/vnext/math-a/10/10-ga-espaco.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-ESP-009",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "Qual é a distância entre A=(1,1,1) e B=(4,5,1)?",
    "o": [
      "5",
      "4",
      "6",
      "7"
    ],
    "a": 0,
    "sol": "Diferenças 3,4,0; distância 5.",
    "hyp": "Pode ignorar que z não varia e somar diferenças.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-espaco:10-ga-espaco:distancia-espaco",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-009",
    "sourceFile": "content/vnext/math-a/10/10-ga-espaco.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-LG-022",
    "themeId": "10-ga",
    "subtopicId": "10-ga-lugares-geometricos",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica",
    "q": "A mediatriz de A=(2,−1) e B=(2,5) tem equação...",
    "o": [
      "x=2.",
      "y=2.",
      "y=3.",
      "x=3."
    ],
    "a": 1,
    "sol": "Ponto médio (2,2), AB vertical; mediatriz horizontal y=2.",
    "hyp": "Pode confundir ponto médio com equação x=2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-lugares-geometricos:10-ga-lugares-geometricos:mediatriz-coordenadas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-LG-022",
    "sourceFile": "content/vnext/math-a/10/10-ga-lugares-geometricos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-LG-042",
    "themeId": "10-ga",
    "subtopicId": "10-ga-lugares-geometricos",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica",
    "q": "Se duas circunferências têm o mesmo centro e o mesmo raio, então...",
    "o": [
      "são tangentes.",
      "coincidem.",
      "são secantes em dois pontos apenas.",
      "são exteriores."
    ],
    "a": 1,
    "sol": "A equação geométrica é a mesma.",
    "hyp": "Pode limitar a interseção a pontos finitos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-lugares-geometricos:10-ga-lugares-geometricos:coincidentes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-LG-042",
    "sourceFile": "content/vnext/math-a/10/10-ga-lugares-geometricos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-LG-008",
    "themeId": "10-ga",
    "subtopicId": "10-ga-lugares-geometricos",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica",
    "q": "Qual é a equação da circunferência de centro (2,−1) e raio 3?",
    "o": [
      "(x+2)²+(y−1)²=9.",
      "(x−2)²+(y−1)²=3.",
      "x²+y²=9.",
      "(x−2)²+(y+1)²=9."
    ],
    "a": 3,
    "sol": "Substituindo a=2,b=−1,r=3 obtém-se a expressão indicada.",
    "hyp": "Pode trocar sinais dentro dos quadrados.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-lugares-geometricos:10-ga-lugares-geometricos:equacao-circunferencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-LG-008",
    "sourceFile": "content/vnext/math-a/10/10-ga-lugares-geometricos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-VET-022",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Vetores, coordenadas, norma e operações",
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
      "exam"
    ],
    "signature": "exam:10-ga-vetores:10-ga-vetores:norma-parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-022",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-VET-041",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Vetores, coordenadas, norma e operações",
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
      "exam"
    ],
    "signature": "exam:10-ga-vetores:10-ga-vetores:soma-nula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-041",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-VET-009",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Vetores, coordenadas, norma e operações",
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
      "exam"
    ],
    "signature": "exam:10-ga-vetores:10-ga-vetores:vetor-oposto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-009",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-BAR-021",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Baricentro e propriedades das medianas",
    "q": "Na mediana AM, AG=12. Quanto mede GM?",
    "o": [
      "6",
      "4",
      "8",
      "12"
    ],
    "a": 0,
    "sol": "AG=2GM, logo GM=6.",
    "hyp": "Pode usar 12/3 como GM.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-baricentro-medianas:10-gs-baricentro-medianas:razao-2-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-021",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-BAR-037",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Baricentro e propriedades das medianas",
    "q": "As três medianas dividem ABC em seis triângulos iguais em área. Se um deles tem área 7, qual é a área de ABC?",
    "o": [
      "42",
      "21",
      "35",
      "49"
    ],
    "a": 0,
    "sol": "6×7=42.",
    "hyp": "Pode multiplicar por 3.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-baricentro-medianas:10-gs-baricentro-medianas:seis-areas-iguais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-037",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-BAR-011",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Baricentro e propriedades das medianas",
    "q": "As três medianas de um triângulo...",
    "o": [
      "são sempre paralelas.",
      "só duas se intersectam.",
      "são concorrentes.",
      "são sempre perpendiculares."
    ],
    "a": 2,
    "sol": "As três medianas passam pelo baricentro.",
    "hyp": "Pode não reconhecer concorrência.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-baricentro-medianas:10-gs-baricentro-medianas:medianas-concorrentes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-011",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-CI-023",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Circuncentro e incentro",
    "q": "Se O é circuncentro e o raio da circunferência circunscrita é 9, então o diâmetro é...",
    "o": [
      "9",
      "27",
      "18",
      "81"
    ],
    "a": 2,
    "sol": "d=2r=18.",
    "hyp": "Pode confundir com quadrado do raio.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-circuncentro-incentro:10-gs-circuncentro-incentro:diametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-023",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-CI-040",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Circuncentro e incentro",
    "q": "Qual afirmação distingue corretamente circuncentro e incentro?",
    "o": [
      "Ambos são equidistantes dos vértices.",
      "Ambos são interseções das medianas.",
      "Circuncentro é sempre interior e incentro pode ser exterior.",
      "Circuncentro: equidistante dos vértices; incentro: equidistante dos lados."
    ],
    "a": 3,
    "sol": "Essa é a diferença geométrica fundamental entre os dois centros.",
    "hyp": "Pode trocar as propriedades dos centros.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-circuncentro-incentro:10-gs-circuncentro-incentro:comparar-centros",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-040",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-CI-008",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Circuncentro e incentro",
    "q": "Se I é o incentro e a distância perpendicular de I ao lado AB é 4 cm, qual é a distância de I ao lado BC?",
    "o": [
      "2 cm",
      "8 cm",
      "depende do comprimento de BC",
      "4 cm"
    ],
    "a": 3,
    "sol": "O incentro é equidistante dos três lados.",
    "hyp": "Pode não reconhecer que a distância a uma reta é perpendicular.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-circuncentro-incentro:10-gs-circuncentro-incentro:raio-inscrita",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-008",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-E9-021",
    "themeId": "10-gs",
    "subtopicId": "10-gs-euler-nove-pontos",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Localização dos centros, reta de Euler e circunferência dos nove pontos",
    "q": "Se O, G e H estão alinhados e OG=6, qual é a distância GH?",
    "o": [
      "12",
      "3",
      "6",
      "18"
    ],
    "a": 0,
    "sol": "GH=2OG=12.",
    "hyp": "Pode inverter a razão.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-euler-nove-pontos:10-gs-euler-nove-pontos:euler-razao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-E9-021",
    "sourceFile": "content/vnext/math-a/10/10-gs-euler-nove-pontos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-E9-043",
    "themeId": "10-gs",
    "subtopicId": "10-gs-euler-nove-pontos",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Localização dos centros, reta de Euler e circunferência dos nove pontos",
    "q": "Num triângulo isósceles, por que incentro, circuncentro, baricentro e ortocentro ficam alinhados?",
    "o": [
      "Porque qualquer quatro pontos são colineares.",
      "Porque o triângulo é sempre retângulo.",
      "Todos pertencem ao eixo de simetria.",
      "Porque os lados são todos iguais."
    ],
    "a": 2,
    "sol": "A simetria força esses centros a pertencerem ao eixo do triângulo.",
    "hyp": "Pode confundir isósceles com equilátero ou usar argumento inválido.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-euler-nove-pontos:10-gs-euler-nove-pontos:isosceles-centros-alinhados",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-E9-043",
    "sourceFile": "content/vnext/math-a/10/10-gs-euler-nove-pontos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-E9-007",
    "themeId": "10-gs",
    "subtopicId": "10-gs-euler-nove-pontos",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Localização dos centros, reta de Euler e circunferência dos nove pontos",
    "q": "Outros três pontos da circunferência dos nove pontos são...",
    "o": [
      "os três vértices.",
      "as interseções das medianas com os lados.",
      "os pés das três alturas.",
      "os três pontos de tangência da inscrita sempre."
    ],
    "a": 2,
    "sol": "Os pés das alturas pertencem à circunferência dos nove pontos.",
    "hyp": "Pode confundir com pontos de tangência da incircunferência.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-euler-nove-pontos:10-gs-euler-nove-pontos:nove-pontos-pes-alturas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-E9-007",
    "sourceFile": "content/vnext/math-a/10/10-gs-euler-nove-pontos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-ORT-023",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Ortocentro e alturas",
    "q": "Num triângulo retângulo com catetos a,b e hipotenusa c, a altura h à hipotenusa satisfaz...",
    "o": [
      "a+b=c+h.",
      "a²+b²=h².",
      "ab=ch.",
      "h=c."
    ],
    "a": 2,
    "sol": "Igualando áreas: ab/2=ch/2, logo ab=ch.",
    "hyp": "Pode confundir com Pitágoras.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-ortocentro:10-gs-ortocentro:altura-hipotenusa-formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-023",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-ORT-041",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Ortocentro e alturas",
    "q": "O ortocentro é equidistante dos vértices?",
    "o": [
      "Não necessariamente.",
      "Sim, por definição.",
      "Sim, mas só em obtusângulos.",
      "Sempre à distância zero."
    ],
    "a": 0,
    "sol": "Equidistância aos vértices caracteriza o circuncentro, não o ortocentro.",
    "hyp": "Pode misturar propriedades dos centros.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-ortocentro:10-gs-ortocentro:ortocentro-nao-equidistante",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-041",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-ORT-012",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Ortocentro e alturas",
    "q": "O pé de uma altura é...",
    "o": [
      "o ponto médio do lado.",
      "o baricentro.",
      "o centro da circunferência inscrita.",
      "o ponto onde a perpendicular pelo vértice encontra a reta do lado oposto."
    ],
    "a": 3,
    "sol": "É a projeção perpendicular do vértice sobre a reta suporte do lado oposto.",
    "hyp": "Pode confundir pé da altura com ponto médio.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-ortocentro:10-gs-ortocentro:pe-altura",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-012",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-PC-022",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Propriedades geométricas e construções de base",
    "q": "O critério LLL de congruência usa...",
    "o": [
      "dois lados e qualquer ângulo.",
      "três lados correspondentes iguais.",
      "três ângulos iguais.",
      "um lado apenas."
    ],
    "a": 1,
    "sol": "Se os três lados correspondentes são iguais, os triângulos são congruentes.",
    "hyp": "Pode confundir com critérios de semelhança.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-propriedades-construcoes:10-gs-propriedades-construcoes:criterio-lll",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-022",
    "sourceFile": "content/vnext/math-a/10/10-gs-propriedades-construcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-PC-040",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Propriedades geométricas e construções de base",
    "q": "De um ponto exterior P traçam-se duas tangentes à mesma circunferência, tocando-a em A e B. Então...",
    "o": [
      "PA+PB é sempre o diâmetro.",
      "PA é sempre o dobro de PB.",
      "A e B coincidem.",
      "PA=PB."
    ],
    "a": 3,
    "sol": "Os segmentos tangentes a partir do mesmo ponto exterior têm comprimentos iguais.",
    "hyp": "Pode não reconhecer a propriedade das tangentes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-propriedades-construcoes:10-gs-propriedades-construcoes:tangentes-exteriores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-040",
    "sourceFile": "content/vnext/math-a/10/10-gs-propriedades-construcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-PC-010",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Propriedades geométricas e construções de base",
    "q": "Um ângulo mede 86°. Qual é a amplitude de cada ângulo criado pela sua bissetriz?",
    "o": [
      "38°",
      "43°",
      "46°",
      "48°"
    ],
    "a": 1,
    "sol": "86÷2=43°.",
    "hyp": "Pode subtrair 2 em vez de dividir por 2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-propriedades-construcoes:10-gs-propriedades-construcoes:bissetriz-aplicacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-010",
    "sourceFile": "content/vnext/math-a/10/10-gs-propriedades-construcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-DP-027",
    "themeId": "11-cd",
    "subtopicId": "11-cd-derivada-ponto",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocinio",
    "focus": "Taxa instantanea e derivada num ponto",
    "q": "Para f(x)=x^2, o limite lim_{h->0} [f(1+h)-f(1)]/h vale",
    "o": [
      "1",
      "3",
      "2",
      "4"
    ],
    "a": 2,
    "sol": "Expandindo e simplificando, o quociente tende para 2a=2.",
    "hyp": "Pode confundir taxa media com derivada, ou substituir incorretamente no quociente incremental.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-derivada-ponto:11-cd-derivada-ponto:definicao-limite:27",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-DP-027",
    "sourceFile": "content/vnext/math-a/11/11-cd-derivada-ponto.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-DP-042",
    "themeId": "11-cd",
    "subtopicId": "11-cd-derivada-ponto",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelacao",
    "focus": "Taxa instantanea e derivada num ponto",
    "q": "A posicao e dada por s(t)=2t^2. Qual e a velocidade instantanea em t=4?",
    "o": [
      "18",
      "16",
      "14",
      "4"
    ],
    "a": 1,
    "sol": "A velocidade e s'(t); avaliando em t=4, obtem-se 16.",
    "hyp": "Pode confundir taxa media com derivada, ou substituir incorretamente no quociente incremental.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-derivada-ponto:11-cd-derivada-ponto:movimento:42",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-DP-042",
    "sourceFile": "content/vnext/math-a/11/11-cd-derivada-ponto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-DP-014",
    "themeId": "11-cd",
    "subtopicId": "11-cd-derivada-ponto",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicacao",
    "focus": "Taxa instantanea e derivada num ponto",
    "q": "Para f(x)=x^2, quanto vale f'(-2)?",
    "o": [
      "-3",
      "-4",
      "-5",
      "-8"
    ],
    "a": 1,
    "sol": "Derivando a expressao e substituindo x=-2, obtem-se -4.",
    "hyp": "Pode confundir taxa media com derivada, ou substituir incorretamente no quociente incremental.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-derivada-ponto:11-cd-derivada-ponto:calculo:14",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-DP-014",
    "sourceFile": "content/vnext/math-a/11/11-cd-derivada-ponto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-FD-038",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretacao",
    "focus": "Funcao derivada",
    "q": "Se f'(x)=x^2, em todo x diferente de 0, entao",
    "o": [
      "f e decrescente",
      "f e crescente",
      "f e constante",
      "f alterna monotonia"
    ],
    "a": 1,
    "sol": "x^2>0 para x diferente de 0.",
    "hyp": "Pode confundir a funcao derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-funcao-derivada:11-cd-funcao-derivada:sinal:38",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-038",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-FD-047",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocinio",
    "focus": "Funcao derivada",
    "q": "f'(x)=6x; uma possibilidade para f(x) e",
    "o": [
      "6x^2+C",
      "x^6+C",
      "3x^2+C",
      "3x+C"
    ],
    "a": 2,
    "sol": "A derivada de 3x^2+C e 6x.",
    "hyp": "Pode confundir a funcao derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-funcao-derivada:11-cd-funcao-derivada:reconstruir:47",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-047",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-FD-014",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicacao",
    "focus": "Funcao derivada",
    "q": "Se f(x)=x^2+3x, entao f'(x)=",
    "o": [
      "x^2+3x",
      "2x+3",
      "2x+3+1",
      "0"
    ],
    "a": 1,
    "sol": "Derivando termo a termo obtem-se 2x+3.",
    "hyp": "Pode confundir a funcao derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-funcao-derivada:11-cd-funcao-derivada:derivar-polinomio:14",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-014",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-MO-032",
    "themeId": "11-cd",
    "subtopicId": "11-cd-monotonia-otimizacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocinio",
    "focus": "Monotonia, extremos e otimizacao",
    "q": "No intervalo [0,5], para f(x)=x^2-4x, os extremos absolutos sao",
    "o": [
      "maximo 5 em x=5",
      "minimo -4 em x=2",
      "apenas o ponto onde f'=0",
      "maximo 5 em x=5; minimo -4 em x=2."
    ],
    "a": 3,
    "sol": "Comparam-se valores nos pontos criticos e nas extremidades do intervalo.",
    "hyp": "Pode confundir zeros da derivada com extremos garantidos, ou interpretar incorretamente a mudanca de sinal de f'.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-monotonia-otimizacao:11-cd-monotonia-otimizacao:extremos-absolutos:32",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-MO-032",
    "sourceFile": "content/vnext/math-a/11/11-cd-monotonia-otimizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-MO-047",
    "themeId": "11-cd",
    "subtopicId": "11-cd-monotonia-otimizacao",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocinio",
    "focus": "Monotonia, extremos e otimizacao",
    "q": "Se f'(x)<0 em ]-inf,4[, f'(4)=0 e f'(x)>0 em ]4,+inf[, entao",
    "o": [
      "f tem maximo local",
      "f e decrescente em todo o dominio",
      "f tem minimo local em x=4",
      "f(4)=0"
    ],
    "a": 2,
    "sol": "O sinal muda de - para +.",
    "hyp": "Pode confundir zeros da derivada com extremos garantidos, ou interpretar incorretamente a mudanca de sinal de f'.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-monotonia-otimizacao:11-cd-monotonia-otimizacao:avancado:47",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-MO-047",
    "sourceFile": "content/vnext/math-a/11/11-cd-monotonia-otimizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-MO-013",
    "themeId": "11-cd",
    "subtopicId": "11-cd-monotonia-otimizacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretacao",
    "focus": "Monotonia, extremos e otimizacao",
    "q": "Se f'(x)=x-3, entao junto de x=3 a situacao correta e",
    "o": [
      "decrescente para x<3 e crescente para x>3; minimo em x=3.",
      "decrescente para x<3 e crescente para x>3",
      "minimo em x=3",
      "nao se pode concluir nada"
    ],
    "a": 0,
    "sol": "Analisa-se o sinal de f' antes e depois de 3.",
    "hyp": "Pode confundir zeros da derivada com extremos garantidos, ou interpretar incorretamente a mudanca de sinal de f'.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-monotonia-otimizacao:11-cd-monotonia-otimizacao:sinal:13",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-MO-013",
    "sourceFile": "content/vnext/math-a/11/11-cd-monotonia-otimizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-REG-023",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicacao",
    "focus": "Regras de derivacao",
    "q": "Usando a regra do produto, deriva f(x)=x(x^2+3).",
    "o": [
      "3x^2-3",
      "x(x^2+3)",
      "3x^2+3",
      "0"
    ],
    "a": 2,
    "sol": "Aplicando (uv)'=u'v+uv' e simplificando obtem-se 3x^2+3.",
    "hyp": "Pode aplicar uma regra de derivacao ao objeto errado, esquecer fatores ou confundir produto/quociente com derivacao termo a termo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-regras:11-cd-regras:produto:23",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-023",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-REG-042",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocinio",
    "focus": "Regras de derivacao",
    "q": "Se f'(x)=4x^3, entao (5f)'(x)=",
    "o": [
      "5x^3",
      "20x^3",
      "4x^3+5",
      "20x^4"
    ],
    "a": 1,
    "sol": "Multiplica-se a derivada por 5.",
    "hyp": "Pode aplicar uma regra de derivacao ao objeto errado, esquecer fatores ou confundir produto/quociente com derivacao termo a termo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-regras:11-cd-regras:misto:42",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-042",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-REG-014",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicacao",
    "focus": "Regras de derivacao",
    "q": "Deriva f(x)=-2x^6.",
    "o": [
      "-2x^6",
      "-12x^5",
      "-12x^5+1",
      "0"
    ],
    "a": 1,
    "sol": "Aplicando regra da potencia e linearidade obtem-se -12x^5.",
    "hyp": "Pode aplicar uma regra de derivacao ao objeto errado, esquecer fatores ou confundir produto/quociente com derivacao termo a termo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-regras:11-cd-regras:potencia:14",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-014",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-TAN-027",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocinio",
    "focus": "Reta tangente e interpretacao geometrica",
    "q": "Sabendo que f(1)=4 e f'(1)=-2, qual e a reta tangente?",
    "o": [
      "y=-2x+4",
      "y=4x+-2",
      "y=-2x+6",
      "x=1"
    ],
    "a": 2,
    "sol": "y-4=-2(x-1)",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-tangente:11-cd-tangente:dados:27",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-027",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-TAN-047",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelacao",
    "focus": "Reta tangente e interpretacao geometrica",
    "q": "Sabendo que f(1)=4 e f'(1)=-2, pela aproximacao linear f(1,05) e",
    "o": [
      "4,1",
      "3,8",
      "aproximadamente 3,9",
      "2"
    ],
    "a": 2,
    "sol": "h=0,05; 4-2(0,05)=3,9.",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-tangente:11-cd-tangente:aproximacao-linear:47",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-047",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-TAN-014",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicacao",
    "focus": "Reta tangente e interpretacao geometrica",
    "q": "Para f(x)=x^2+1, a tangente em x=0 tem equacao",
    "o": [
      "y=0x+1",
      "y=1",
      "y=1x+0",
      "x=0"
    ],
    "a": 1,
    "sol": "Usa-se y-1=0(x-0), que simplifica para y=1.",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-tangente:11-cd-tangente:equacao-tangente:14",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-014",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-TM-033",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Modelacao",
    "focus": "Taxa media de variacao",
    "q": "Uma grandeza de populacao passa de 500 para 620 em 6 unidades de tempo. Qual e a taxa media?",
    "o": [
      "20",
      "120",
      "6",
      "620"
    ],
    "a": 0,
    "sol": "(620-500)/6=20 individuos por ano.",
    "hyp": "Pode confundir variacao total com taxa media ou inverter o quociente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-taxa-media:11-cd-taxa-media:modelacao:33",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-033",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-TM-042",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocinio",
    "focus": "Taxa media de variacao",
    "q": "Se f(0)=2 e a taxa media em [0,5] e 4, quanto vale f(5)?",
    "o": [
      "23",
      "22",
      "21",
      "6"
    ],
    "a": 1,
    "sol": "[f(5)-2]/(5-0)=4, logo f(5)=22.",
    "hyp": "Pode confundir variacao total com taxa media ou inverter o quociente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-taxa-media:11-cd-taxa-media:inversa:42",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-042",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-TM-014",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicacao",
    "focus": "Taxa media de variacao",
    "q": "Para f(x)=x^2, qual e a taxa media de variacao entre x=-2 e x=1?",
    "o": [
      "0",
      "-1",
      "-2",
      "-3"
    ],
    "a": 1,
    "sol": "(1-4)/(1--2)=-1.",
    "hyp": "Pode confundir variacao total com taxa media ou inverter o quociente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-taxa-media:11-cd-taxa-media:quadratica:14",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-014",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-AM-023",
    "themeId": "11-cont",
    "subtopicId": "11-cont-adicao-multiplicacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Princípios da adição e multiplicação",
    "q": "Quantos números de 3 algarismos pares existem?",
    "o": [
      "500.",
      "900.",
      "450.",
      "400."
    ],
    "a": 2,
    "sol": "Centenas:9, dezenas:10, unidades pares:5. 9×10×5=450.",
    "hyp": "Pode contar zero inicial ou esquecer paridade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-adicao-multiplicacao:11-cont-adicao-multiplicacao:numeros-pares",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-AM-023",
    "sourceFile": "content/vnext/math-a/11/11-cont-adicao-multiplicacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-AM-046",
    "themeId": "11-cont",
    "subtopicId": "11-cont-adicao-multiplicacao",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Princípios da adição e multiplicação",
    "q": "Quando os números de opções da segunda etapa dependem da primeira...",
    "o": [
      "multiplica-se sempre o total de opções médias.",
      "podemos somar os produtos de cada ramo.",
      "usa-se apenas adição.",
      "não é possível contar."
    ],
    "a": 1,
    "sol": "Conta-se cada ramo pelo princípio da multiplicação e somam-se os ramos exclusivos.",
    "hyp": "Pode aplicar uma multiplicação uniforme que não existe.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-adicao-multiplicacao:11-cont-adicao-multiplicacao:principio-misto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-AM-046",
    "sourceFile": "content/vnext/math-a/11/11-cont-adicao-multiplicacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-AM-007",
    "themeId": "11-cont",
    "subtopicId": "11-cont-adicao-multiplicacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Princípios da adição e multiplicação",
    "q": "Para ir de A a B há 3 estradas e de B a C há 5. Quantos percursos A-B-C?",
    "o": [
      "8.",
      "5.",
      "15.",
      "3."
    ],
    "a": 2,
    "sol": "Escolhe-se uma estrada em cada etapa: 3×5.",
    "hyp": "Pode somar caminhos de etapas sucessivas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-adicao-multiplicacao:11-cont-adicao-multiplicacao:percursos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-AM-007",
    "sourceFile": "content/vnext/math-a/11/11-cont-adicao-multiplicacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-ARR-023",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Arranjos",
    "q": "De 8 atletas escolhem-se 1.º e 2.º lugares. Quantos resultados?",
    "o": [
      "28.",
      "64.",
      "56.",
      "16."
    ],
    "a": 2,
    "sol": "8×7=56.",
    "hyp": "Pode usar C(8,2).",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-arranjos:11-cont-arranjos:dois-lugares",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-023",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-ARR-048",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Arranjos",
    "q": "De 12 equipas escolhem-se 1.º, 2.º, 3.º e 4.º lugares. Quantos resultados?",
    "o": [
      "495.",
      "20736.",
      "48.",
      "11880."
    ],
    "a": 3,
    "sol": "12×11×10×9=11880.",
    "hyp": "Pode usar combinação 495.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-arranjos:11-cont-arranjos:modelacao-classificacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-048",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-ARR-007",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Arranjos",
    "q": "Quantas palavras de 3 letras distintas podem ser feitas com 7 letras disponíveis?",
    "o": [
      "35.",
      "343.",
      "210.",
      "21."
    ],
    "a": 2,
    "sol": "7×6×5=210.",
    "hyp": "Pode permitir repetição ou ignorar ordem.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-arranjos:11-cont-arranjos:palavras-sem-repeticao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-007",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-COMB-023",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Combinações e escolha sem ordem",
    "q": "Numa turma de 10 alunos, quantos pares distintos podem formar-se?",
    "o": [
      "90.",
      "100.",
      "45.",
      "20."
    ],
    "a": 2,
    "sol": "C(10,2)=45.",
    "hyp": "Pode contar AB e BA separadamente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-combinacoes:11-cont-combinacoes:pares",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-023",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-COMB-050",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Combinações e escolha sem ordem",
    "q": "De 20 questões, um teste escolhe 5 distintas sem atender à ordem. Quantos conjuntos possíveis?",
    "o": [
      "1860480.",
      "15504.",
      "100000.",
      "4845."
    ],
    "a": 1,
    "sol": "C(20,5)=15504.",
    "hyp": "Pode usar A(20,5) ou 20^5.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-combinacoes:11-cont-combinacoes:modelacao-teste",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-050",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-COMB-008",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Combinações e escolha sem ordem",
    "q": "C(8,1) é...",
    "o": [
      "1.",
      "7.",
      "56.",
      "8."
    ],
    "a": 3,
    "sol": "Escolher 1 elemento entre 8 pode ser feito de 8 formas.",
    "hyp": "Pode usar 1 por haver apenas uma escolha.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-combinacoes:11-cont-combinacoes:C-n-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-008",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-DG-023",
    "themeId": "11-cont",
    "subtopicId": "11-cont-diagramas",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Diagramas, tabelas e organização de casos",
    "q": "Numa tabela de dupla entrada para pares (i,j), a diagonal principal costuma corresponder a...",
    "o": [
      "casos em que i≠j.",
      "casos impossíveis sempre.",
      "casos em que i=j.",
      "resultados não ordenados."
    ],
    "a": 2,
    "sol": "Na diagonal, índice da linha e coluna coincide.",
    "hyp": "Pode interpretar diagonal como exclusão obrigatória.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-diagramas:11-cont-diagramas:diagonal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-DG-023",
    "sourceFile": "content/vnext/math-a/11/11-cont-diagramas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-DG-037",
    "themeId": "11-cont",
    "subtopicId": "11-cont-diagramas",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Diagramas, tabelas e organização de casos",
    "q": "Uma árvore começa com 3 opções. Após a primeira há 2 escolhas, após a segunda 3 e após a terceira 4. Total de folhas?",
    "o": [
      "9.",
      "24.",
      "12.",
      "6."
    ],
    "a": 0,
    "sol": "Somam-se os ramos finais:2+3+4=9.",
    "hyp": "Pode multiplicar 3×2×3×4.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-diagramas:11-cont-diagramas:arvore-dependente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-DG-037",
    "sourceFile": "content/vnext/math-a/11/11-cont-diagramas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-DG-007",
    "themeId": "11-cont",
    "subtopicId": "11-cont-diagramas",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Diagramas, tabelas e organização de casos",
    "q": "Num diagrama de árvore com ramos não uniformes, o total de resultados obtém-se...",
    "o": [
      "multiplicando sempre os graus máximos.",
      "contando apenas os nós internos.",
      "somando o número de folhas de todos os ramos.",
      "fazendo a média dos ramos."
    ],
    "a": 2,
    "sol": "Cada folha representa um resultado final distinto.",
    "hyp": "Pode aplicar multiplicação uniforme quando não existe.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-diagramas:11-cont-diagramas:arvore-nao-uniforme",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-DG-007",
    "sourceFile": "content/vnext/math-a/11/11-cont-diagramas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-FAT-022",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Fatorial e contagens elementares",
    "q": "Resolve n!=120.",
    "o": [
      "n=4.",
      "n=5.",
      "n=6.",
      "n=120."
    ],
    "a": 1,
    "sol": "5!=120.",
    "hyp": "Pode escolher 6! sem calcular.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-fatorial:11-cont-fatorial:equacao-fatorial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-022",
    "sourceFile": "content/vnext/math-a/11/11-cont-fatorial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-FAT-046",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Fatorial e contagens elementares",
    "q": "Em contagem, o fatorial aparece naturalmente quando...",
    "o": [
      "todas as etapas têm sempre o mesmo número de opções.",
      "há uma sequência de escolhas sem repetição com uma opção a menos em cada etapa.",
      "a ordem nunca importa.",
      "há apenas duas alternativas."
    ],
    "a": 1,
    "sol": "n×(n−1)×…×1=n! surge ao ordenar n objetos distintos.",
    "hyp": "Pode associar fatorial apenas à notação, sem o processo de contagem.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-fatorial:11-cont-fatorial:origem-fatorial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-046",
    "sourceFile": "content/vnext/math-a/11/11-cont-fatorial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-FAT-007",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Fatorial e contagens elementares",
    "q": "A relação correta é...",
    "o": [
      "n!=(n−1)!+n.",
      "n!=n+(n−1).",
      "n!=n(n−1)!.",
      "n!=(n−1)!/n."
    ],
    "a": 2,
    "sol": "É a relação recursiva fundamental do fatorial.",
    "hyp": "Pode trocar produto por soma.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-fatorial:11-cont-fatorial:recorrencia-fatorial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-007",
    "sourceFile": "content/vnext/math-a/11/11-cont-fatorial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-PERM-023",
    "themeId": "11-cont",
    "subtopicId": "11-cont-permutacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Permutações",
    "q": "Numa fila de 7, A,B,C devem ficar juntos e nessa ordem. Quantas filas?",
    "o": [
      "720.",
      "24.",
      "120.",
      "5040."
    ],
    "a": 2,
    "sol": "Bloco ABC com ordem fixa +4 pessoas =5 blocos:5!=120.",
    "hyp": "Pode multiplicar por 3!.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-permutacoes:11-cont-permutacoes:tres-juntos-ordem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-PERM-023",
    "sourceFile": "content/vnext/math-a/11/11-cont-permutacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-PERM-046",
    "themeId": "11-cont",
    "subtopicId": "11-cont-permutacoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Permutações",
    "q": "Se uma condição fixa k posições específicas numa permutação de n objetos distintos, e fixa também que objetos ocupam essas posições, restam...",
    "o": [
      "n! ordens.",
      "(n−k)! ordens.",
      "k! ordens.",
      "n−k ordens."
    ],
    "a": 1,
    "sol": "Só os n−k objetos restantes precisam ser permutados.",
    "hyp": "Pode multiplicar novamente pelas posições fixas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-permutacoes:11-cont-permutacoes:k-posicoes-fixas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-PERM-046",
    "sourceFile": "content/vnext/math-a/11/11-cont-permutacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-PERM-017",
    "themeId": "11-cont",
    "subtopicId": "11-cont-permutacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Permutações",
    "q": "Numa permutação de objetos distintos...",
    "o": [
      "todos os objetos são usados uma vez.",
      "alguns objetos ficam sempre de fora.",
      "a ordem não importa.",
      "a repetição é obrigatória."
    ],
    "a": 0,
    "sol": "Permuta-se o conjunto inteiro de objetos.",
    "hyp": "Pode confundir com arranjo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-permutacoes:11-cont-permutacoes:todos-usados",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-PERM-017",
    "sourceFile": "content/vnext/math-a/11/11-cont-permutacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-AM-023",
    "themeId": "11-fun",
    "subtopicId": "11-fun-assintotas-modelacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Assíntotas, interpretação e modelação",
    "q": "Para f(x)=(x+2)/[(x−1)(x+3)], a assíntota horizontal é...",
    "o": [
      "y=1.",
      "y=−3.",
      "y=0.",
      "não existe."
    ],
    "a": 2,
    "sol": "Grau do numerador 1 < grau do denominador 2.",
    "hyp": "Pode usar a razão dos coeficientes líderes sem comparar graus.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-assintotas-modelacao:11-fun-assintotas-modelacao:horizontal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-AM-023",
    "sourceFile": "content/vnext/math-a/11/11-fun-assintotas-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-AM-039",
    "themeId": "11-fun",
    "subtopicId": "11-fun-assintotas-modelacao",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Assíntotas, interpretação e modelação",
    "q": "Para f(x)=(2x²+3x+1)/(x−1)=2x+5+6/(x−1), uma assíntota oblíqua é...",
    "o": [
      "y=2x+1.",
      "y=6.",
      "y=2x+5.",
      "x=1."
    ],
    "a": 2,
    "sol": "O resto 6/(x−1) tende a 0 em módulo para |x| grande.",
    "hyp": "Pode usar o resto como ordenada na origem.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-assintotas-modelacao:11-fun-assintotas-modelacao:obliqua",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-AM-039",
    "sourceFile": "content/vnext/math-a/11/11-fun-assintotas-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-AM-008",
    "themeId": "11-fun",
    "subtopicId": "11-fun-assintotas-modelacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Assíntotas, interpretação e modelação",
    "q": "A função f(x)=−3/(x−2)+5 tem centro de simetria...",
    "o": [
      "(−2,5).",
      "(2,−5).",
      "(−3,5).",
      "(2,5)."
    ],
    "a": 3,
    "sol": "O centro é a interseção x=2,y=5.",
    "hyp": "Pode usar o coeficiente −3 como coordenada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-assintotas-modelacao:11-fun-assintotas-modelacao:centro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-AM-008",
    "sourceFile": "content/vnext/math-a/11/11-fun-assintotas-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-CQ-022",
    "themeId": "11-fun",
    "subtopicId": "11-fun-cubicas-quarticas",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Famílias cúbicas/quárticas e comportamento gráfico",
    "q": "Uma cúbica real pode ter quantos zeros reais distintos?",
    "o": [
      "apenas 3.",
      "1, 2 ou 3.",
      "0, 2 ou 4.",
      "apenas 1."
    ],
    "a": 1,
    "sol": "Pode ter um zero simples e um duplo (2 distintos) ou três simples, ou apenas um real.",
    "hyp": "Pode achar que o grau fixa o número de zeros reais distintos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-cubicas-quarticas:11-fun-cubicas-quarticas:numero-zeros-cubica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-CQ-022",
    "sourceFile": "content/vnext/math-a/11/11-fun-cubicas-quarticas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-CQ-037",
    "themeId": "11-fun",
    "subtopicId": "11-fun-cubicas-quarticas",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Famílias cúbicas/quárticas e comportamento gráfico",
    "q": "Se uma cúbica monica tem zeros −1,2 e 4, uma expressão é...",
    "o": [
      "(x+1)(x−2)(x−4).",
      "(x−1)(x+2)(x+4).",
      "(x+1)(x+2)(x+4).",
      "x³−8."
    ],
    "a": 0,
    "sol": "Cada zero r origina fator x−r.",
    "hyp": "Pode trocar os sinais dos fatores.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-cubicas-quarticas:11-fun-cubicas-quarticas:construir-pelos-zeros",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-CQ-037",
    "sourceFile": "content/vnext/math-a/11/11-fun-cubicas-quarticas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-CQ-010",
    "themeId": "11-fun",
    "subtopicId": "11-fun-cubicas-quarticas",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Famílias cúbicas/quárticas e comportamento gráfico",
    "q": "Uma função polinomial de grau ímpar com coeficiente líder positivo tem, nos extremos...",
    "o": [
      "ambos para +∞.",
      "esquerda para −∞ e direita para +∞.",
      "ambos para −∞.",
      "esquerda +∞ e direita −∞."
    ],
    "a": 1,
    "sol": "É o padrão típico de grau ímpar positivo.",
    "hyp": "Pode aplicar o padrão de grau par.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-cubicas-quarticas:11-fun-cubicas-quarticas:padrao-impar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-CQ-010",
    "sourceFile": "content/vnext/math-a/11/11-fun-cubicas-quarticas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-DP-023",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Depois de dividir x³−6x²+11x−6 por x−1, fatorizar o quociente dá...",
    "o": [
      "(x+2)(x+3).",
      "(x−1)(x−6).",
      "(x−2)(x−3).",
      "(x−3)²."
    ],
    "a": 2,
    "sol": "x²−5x+6=(x−2)(x−3).",
    "hyp": "Pode trocar os sinais das raízes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-divisao-polinomios:11-fun-divisao-polinomios:fatorizar-quociente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-023",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-DP-046",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "O objetivo de usar Ruffini repetidamente numa fatorização é...",
    "o": [
      "aumentar o grau.",
      "extrair fatores lineares conhecidos e reduzir o grau.",
      "eliminar todos os coeficientes.",
      "transformar qualquer polinómio em quadrática sem condições."
    ],
    "a": 1,
    "sol": "Cada divisão exata por x−a reduz o grau em 1.",
    "hyp": "Pode achar que Ruffini descobre automaticamente todas as raízes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-divisao-polinomios:11-fun-divisao-polinomios:ruffini-repetido",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-046",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-DP-007",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Divide x²−4x+3 por x−1. O quociente é...",
    "o": [
      "x+3.",
      "x−1.",
      "x−3.",
      "x−4."
    ],
    "a": 2,
    "sol": "x²−4x+3=(x−1)(x−3).",
    "hyp": "Pode trocar o sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-divisao-polinomios:11-fun-divisao-polinomios:divisao-quadratica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-007",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-OP-022",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Operações entre funções",
    "q": "Se f(x)=2x−1 e g(x)=x², então (g∘f)(x)=",
    "o": [
      "2x²−1.",
      "(2x−1)².",
      "4x²−1.",
      "x²−2x+1."
    ],
    "a": 1,
    "sol": "g(f(x))=(2x−1)².",
    "hyp": "Pode não elevar toda a expressão ao quadrado.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-operacoes:11-fun-operacoes:composicao-quadratica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-022",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-OP-038",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Operações entre funções",
    "q": "Se f(x)=√x e g(x)=x² com x≥0, então (f∘g)(x)=",
    "o": [
      "|x|.",
      "x.",
      "x².",
      "√x."
    ],
    "a": 1,
    "sol": "√(x²)=x porque x≥0.",
    "hyp": "Pode escrever |x| sem usar a restrição.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-operacoes:11-fun-operacoes:composicao-inversas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-038",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-OP-010",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Operações entre funções",
    "q": "O domínio de f+g é, em geral...",
    "o": [
      "D_f∪D_g.",
      "D_f∩D_g.",
      "D_f apenas.",
      "D_g apenas."
    ],
    "a": 1,
    "sol": "Ambas as funções têm de estar definidas.",
    "hyp": "Pode usar união em vez de interseção.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-operacoes:11-fun-operacoes:dominio-soma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-010",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-RAT-022",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Funções racionais",
    "q": "Resolve (x−2)/(x+1)=0.",
    "o": [
      "x=−1.",
      "x=2.",
      "x=0.",
      "x=1."
    ],
    "a": 1,
    "sol": "O numerador deve ser zero e o denominador não zero.",
    "hyp": "Pode usar a raiz do denominador.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-racionais:11-fun-racionais:equacao-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-022",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-RAT-044",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Funções racionais",
    "q": "Uma função racional pode ter várias exclusões no domínio quando...",
    "o": [
      "o numerador tem vários termos.",
      "o grau do numerador é alto.",
      "o coeficiente líder é negativo.",
      "o denominador tem vários zeros reais distintos."
    ],
    "a": 3,
    "sol": "Cada zero real do denominador é um candidato a exclusão.",
    "hyp": "Pode olhar para o numerador.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-racionais:11-fun-racionais:varias-exclusoes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-044",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-RAT-010",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Funções racionais",
    "q": "f(x)=(x²−1)/(x−1) simplifica-se, para x≠1, para...",
    "o": [
      "x−1.",
      "x+1.",
      "x²+1.",
      "1."
    ],
    "a": 1,
    "sol": "x²−1=(x−1)(x+1).",
    "hyp": "Pode recuperar indevidamente x=1 no domínio.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-racionais:11-fun-racionais:simplificacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-010",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-RR-022",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "Se P(x)=2x³−x²+kx+3 é divisível por x−1, então k=",
    "o": [
      "4.",
      "−4.",
      "−3.",
      "3."
    ],
    "a": 1,
    "sol": "P(1)=2−1+k+3=k+4=0, logo k=−4.",
    "hyp": "Pode esquecer o termo +3.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-resto-raizes:11-fun-resto-raizes:parametro-fator",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-022",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-RR-047",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "Conhecer uma raiz de um polinómio de grau 4 permite...",
    "o": [
      "concluir todas as outras raízes.",
      "garantir quatro raízes reais.",
      "reduzir o problema a um polinómio de grau 3 por divisão exata.",
      "transformá-lo diretamente em linear."
    ],
    "a": 2,
    "sol": "Dividir pelo fator linear reduz o grau em 1.",
    "hyp": "Pode achar que uma raiz determina todas as restantes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-resto-raizes:11-fun-resto-raizes:reduzir-grau",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-047",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-RR-007",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "O resto de 2x³+x²−4 por x−2 é...",
    "o": [
      "12.",
      "8.",
      "16.",
      "0."
    ],
    "a": 2,
    "sol": "P(2)=16+4−4=16.",
    "hyp": "Pode esquecer o termo x².",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-resto-raizes:11-fun-resto-raizes:resto-cubica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-007",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-AN-023",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Produto escalar, norma e ângulo",
    "q": "Normalizar um vetor significa...",
    "o": [
      "multiplicá-lo pela norma.",
      "somar as componentes.",
      "dividi-lo pela sua norma.",
      "torná-lo perpendicular."
    ],
    "a": 2,
    "sol": "O resultado é um vetor unitário com mesma direção e sentido.",
    "hyp": "Pode confundir com projeção.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-angulo-norma:11-pe-angulo-norma:normalizacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-023",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-AN-037",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Produto escalar, norma e ângulo",
    "q": "Se ||u||=4, ||v||=5 e o ângulo é 120°, então u·v=",
    "o": [
      "−10.",
      "10.",
      "−20.",
      "20."
    ],
    "a": 0,
    "sol": "4×5×cos120°=20×(−1/2)=−10.",
    "hyp": "Pode ignorar o sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-angulo-norma:11-pe-angulo-norma:produto-angulo-obtuso",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-037",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-AN-007",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Produto escalar, norma e ângulo",
    "q": "Se ||u||=5, ||v||=2 e θ=90°, então u·v=",
    "o": [
      "10.",
      "5.",
      "0.",
      "2."
    ],
    "a": 2,
    "sol": "cos90°=0.",
    "hyp": "Pode multiplicar apenas as normas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-angulo-norma:11-pe-angulo-norma:produto-perpendicular",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-007",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-DI-023",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Declive e inclinação",
    "q": "Se uma reta tem declive 0, então a inclinação em [0,π[ é...",
    "o": [
      "π/2.",
      "π.",
      "0.",
      "π/4."
    ],
    "a": 2,
    "sol": "tan0=0.",
    "hyp": "Pode usar π, que não pertence ao intervalo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-declive-inclinacao:11-pe-declive-inclinacao:alpha-horizontal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-023",
    "sourceFile": "content/vnext/math-a/11/11-pe-declive-inclinacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-DI-038",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Declive e inclinação",
    "q": "Uma reta tem declive m e a perpendicular tem declive 4. Então m=",
    "o": [
      "1/4.",
      "−1/4.",
      "−4.",
      "4."
    ],
    "a": 1,
    "sol": "m×4=−1.",
    "hyp": "Pode usar apenas o oposto.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-declive-inclinacao:11-pe-declive-inclinacao:declive-inverso",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-038",
    "sourceFile": "content/vnext/math-a/11/11-pe-declive-inclinacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-DI-007",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Declive e inclinação",
    "q": "Se uma reta tem declive negativo, a inclinação α em [0,π[ satisfaz...",
    "o": [
      "0<α<π/2.",
      "α=0.",
      "π/2<α<π.",
      "α=π/2."
    ],
    "a": 2,
    "sol": "Declive negativo corresponde a ângulo obtuso.",
    "hyp": "Pode achar que inclinação pode ser negativa.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-declive-inclinacao:11-pe-declive-inclinacao:sinal-inclinacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-007",
    "sourceFile": "content/vnext/math-a/11/11-pe-declive-inclinacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-DIST-022",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Distâncias em problemas geométricos",
    "q": "A distância entre os planos x+2y+2z−3=0 e x+2y+2z+6=0 é...",
    "o": [
      "9.",
      "3.",
      "1.",
      "√3."
    ],
    "a": 1,
    "sol": "|6−(−3)|/√9=9/3=3.",
    "hyp": "Pode usar 9 como distância.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-distancias:11-pe-distancias:planos-paralelos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-022",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-DIST-037",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Distâncias em problemas geométricos",
    "q": "Para que valor positivo de k a distância da origem à reta 3x+4y−k=0 seja 6?",
    "o": [
      "30.",
      "6.",
      "5.",
      "24."
    ],
    "a": 0,
    "sol": "k/5=6 => k=30.",
    "hyp": "Pode esquecer multiplicar pela norma da normal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-distancias:11-pe-distancias:parametro-distancia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-037",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-DIST-011",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Distâncias em problemas geométricos",
    "q": "A distância do ponto P=(x0,y0) à reta ax+by+c=0 é...",
    "o": [
      "|ax0+by0+c|.",
      "√(x0²+y0²).",
      "|ax0+by0+c|/√(a²+b²).",
      "(ax0+by0+c)/(a²+b²)."
    ],
    "a": 2,
    "sol": "Divide-se o valor absoluto da substituição pela norma do vetor normal (a,b).",
    "hyp": "Pode esquecer a normalização.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-distancias:11-pe-distancias:formula-ponto-reta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-011",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-PERP-022",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Perpendicularidade",
    "q": "O plano 2x−y+3z=5 tem vetor normal...",
    "o": [
      "(5,0,0).",
      "(2,−1,3).",
      "(1,2,3).",
      "(2,1,−3)."
    ],
    "a": 1,
    "sol": "Os coeficientes de x,y,z formam uma normal.",
    "hyp": "Pode incluir o termo independente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-perpendicularidade:11-pe-perpendicularidade:normal-plano",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-022",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-PERP-041",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Perpendicularidade",
    "q": "Uma reta contida num plano é necessariamente perpendicular ao vetor normal desse plano?",
    "o": [
      "Sim.",
      "Não.",
      "Só se passar pela origem.",
      "Só se a reta for horizontal."
    ],
    "a": 0,
    "sol": "Qualquer direção do plano é ortogonal à normal.",
    "hyp": "Pode confundir posição com direção.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-perpendicularidade:11-pe-perpendicularidade:reta-contida-normal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-041",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-PERP-009",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Perpendicularidade",
    "q": "As retas de vetores diretores (1,2) e (2,−1) são...",
    "o": [
      "perpendiculares.",
      "paralelas.",
      "coincidentes.",
      "reversas."
    ],
    "a": 0,
    "sol": "O produto escalar dos vetores é zero.",
    "hyp": "Pode olhar apenas para a aparência das componentes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-perpendicularidade:11-pe-perpendicularidade:retas-vetores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-009",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-PC-022",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Produto escalar por coordenadas",
    "q": "Se u·v=5, então (3u)·v=",
    "o": [
      "8.",
      "15.",
      "45.",
      "5/3."
    ],
    "a": 1,
    "sol": "3(u·v)=15.",
    "hyp": "Pode usar 3².",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-produto-coordenadas:11-pe-produto-coordenadas:linearidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-022",
    "sourceFile": "content/vnext/math-a/11/11-pe-produto-coordenadas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-PC-037",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Produto escalar por coordenadas",
    "q": "Se ||u||=3, ||v||=4 e u·v=6, então cosθ=",
    "o": [
      "1/2.",
      "2.",
      "1/4.",
      "3/4."
    ],
    "a": 0,
    "sol": "cosθ=(u·v)/(||u||||v||)=6/12=1/2.",
    "hyp": "Pode esquecer dividir pelas duas normas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-produto-coordenadas:11-pe-produto-coordenadas:cos-por-produto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-037",
    "sourceFile": "content/vnext/math-a/11/11-pe-produto-coordenadas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-PC-009",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Produto escalar por coordenadas",
    "q": "No espaço, para u=(a,b,c) e v=(d,e,f), u·v é...",
    "o": [
      "ad+be+cf.",
      "ad−be+cf.",
      "a+d+b+e+c+f.",
      "af+be+cd."
    ],
    "a": 0,
    "sol": "Somam-se os produtos das componentes correspondentes.",
    "hyp": "Pode cruzar componentes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-produto-coordenadas:11-pe-produto-coordenadas:formula-espaco",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-009",
    "sourceFile": "content/vnext/math-a/11/11-pe-produto-coordenadas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-RP-023",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "Qual é o cosseno do ângulo entre os planos x+y+z=0 e x−y=0?",
    "o": [
      "1/2.",
      "1/√2.",
      "0.",
      "−1/2."
    ],
    "a": 2,
    "sol": "Normais (1,1,1) e (1,−1,0) têm produto 0.",
    "hyp": "Pode esquecer a componente z nula.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-retas-planos:11-pe-retas-planos:planos-perpendiculares",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-023",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-RP-044",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "Se o ângulo entre uma reta e um plano é 30°, então o ângulo entre o diretor da reta e uma normal ao plano pode ser...",
    "o": [
      "30°.",
      "90°.",
      "120° como menor ângulo.",
      "60°."
    ],
    "a": 3,
    "sol": "Os ângulos são complementares.",
    "hyp": "Pode esquecer a complementaridade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-retas-planos:11-pe-retas-planos:complementaridade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-044",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-RP-007",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "As retas de diretores (1,2) e (2,−1) formam ângulo...",
    "o": [
      "45°.",
      "0°.",
      "90°.",
      "60°."
    ],
    "a": 2,
    "sol": "Produto escalar=2−2=0.",
    "hyp": "Pode usar apenas declives sem calcular corretamente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-retas-planos:11-pe-retas-planos:angulo-retas-perp",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-007",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-MC-023",
    "themeId": "11-suc",
    "subtopicId": "11-suc-modelacao-comportamento",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Comportamento e modelação com sucessões",
    "q": "Numa PG de razão 0,8, a redução percentual por passo é...",
    "o": [
      "80%.",
      "8%.",
      "20%.",
      "0,8%."
    ],
    "a": 2,
    "sol": "Multiplicar por 0,8 significa reter 80% e perder 20%.",
    "hyp": "Pode confundir fator de retenção com percentagem perdida.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-modelacao-comportamento:11-suc-modelacao-comportamento:fator-para-percentagem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-MC-023",
    "sourceFile": "content/vnext/math-a/11/11-suc-modelacao-comportamento.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-MC-038",
    "themeId": "11-suc",
    "subtopicId": "11-suc-modelacao-comportamento",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Comportamento e modelação com sucessões",
    "q": "Uma quantidade passa de 500 para 405 em 2 períodos com a mesma taxa de redução. A taxa de redução por período é...",
    "o": [
      "19%.",
      "10%.",
      "9,5%.",
      "5%."
    ],
    "a": 1,
    "sol": "405/500=0,81=0,9², logo reduz 10% por período.",
    "hyp": "Pode dividir a redução total de 19% por 2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-modelacao-comportamento:11-suc-modelacao-comportamento:taxa-reducao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-MC-038",
    "sourceFile": "content/vnext/math-a/11/11-suc-modelacao-comportamento.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-MC-007",
    "themeId": "11-suc",
    "subtopicId": "11-suc-modelacao-comportamento",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Comportamento e modelação com sucessões",
    "q": "Um valor inicial de 200 aumenta 10% por período. Após 4 aumentos vale...",
    "o": [
      "280.",
      "240.",
      "292,82.",
      "300."
    ],
    "a": 2,
    "sol": "200×1,1^4=292,82.",
    "hyp": "Pode somar 20 em cada período.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-modelacao-comportamento:11-suc-modelacao-comportamento:percentagem-composta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-MC-007",
    "sourceFile": "content/vnext/math-a/11/11-suc-modelacao-comportamento.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-PA-023",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Progressões aritméticas",
    "q": "Se u_5=20 e u_12=48, então a razão é...",
    "o": [
      "28/12.",
      "7.",
      "4.",
      "3."
    ],
    "a": 2,
    "sol": "48−20=28 em 7 passos, logo r=4.",
    "hyp": "Pode dividir por 12−5+1.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-pa:11-suc-pa:razao-indices",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-023",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-PA-045",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Progressões aritméticas",
    "q": "Uma empresa paga 900 € no 1.º ano e aumenta 50 € por ano. Qual o valor no 6.º ano?",
    "o": [
      "1150 €.",
      "1200 €.",
      "950 €.",
      "1100 €."
    ],
    "a": 0,
    "sol": "900+5×50=1150.",
    "hyp": "Pode contar 6 aumentos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-pa:11-suc-pa:modelacao-salario",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-045",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-PA-007",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Progressões aritméticas",
    "q": "Numa PA com u_1=10 e r=−2, u_6=",
    "o": [
      "2.",
      "−2.",
      "0.",
      "−10."
    ],
    "a": 2,
    "sol": "u_6=10+5(−2)=0.",
    "hyp": "Pode fazer apenas 4 passos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-pa:11-suc-pa:calcular-termo-negativo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-007",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-PG-023",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Progressões geométricas",
    "q": "Numa PG, u_2=6 e u_6=486, com q>0. Qual é u_1?",
    "o": [
      "6.",
      "18.",
      "2.",
      "1."
    ],
    "a": 2,
    "sol": "u_2=u_1q => 6=3u_1, logo u_1=2.",
    "hyp": "Pode dividir por q².",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-pg:11-suc-pg:achar-primeiro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-023",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-PG-043",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Progressões geométricas",
    "q": "Uma PG com q=−1 e u_1≠0 é...",
    "o": [
      "constante.",
      "crescente.",
      "alternada entre dois valores opostos.",
      "decrescente."
    ],
    "a": 2,
    "sol": "Os termos alternam u_1,−u_1,u_1,−u_1,...",
    "hyp": "Pode confundir |q|=1 com constância.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-pg:11-suc-pg:q-menos1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-043",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-PG-007",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Progressões geométricas",
    "q": "Numa PG com u_1=64 e q=1/2, u_5=",
    "o": [
      "8.",
      "2.",
      "4.",
      "16."
    ],
    "a": 2,
    "sol": "64×(1/2)^4=4.",
    "hyp": "Pode fazer apenas três divisões por 2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-pg:11-suc-pg:calcular-termo-fracao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-007",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-SOM-023",
    "themeId": "11-suc",
    "subtopicId": "11-suc-somas",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Somas de termos de PA e PG",
    "q": "Numa PA, a soma de 11 termos consecutivos cujo termo central é 20 é...",
    "o": [
      "200.",
      "240.",
      "220.",
      "110."
    ],
    "a": 2,
    "sol": "Em uma PA, a média dos termos simétricos é o termo central; média=20, logo soma=11×20=220.",
    "hyp": "Pode somar apenas 10 termos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-somas:11-suc-somas:termo-central",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-SOM-023",
    "sourceFile": "content/vnext/math-a/11/11-suc-somas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-SOM-044",
    "themeId": "11-suc",
    "subtopicId": "11-suc-somas",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Somas de termos de PA e PG",
    "q": "Um plano de poupança deposita 50 € no 1.º mês e aumenta o depósito em 10 € por mês. Quanto é depositado ao todo em 12 meses?",
    "o": [
      "1200 €.",
      "1320 €.",
      "720 €.",
      "1260 €."
    ],
    "a": 3,
    "sol": "Último depósito=50+11×10=160; soma=12(50+160)/2=1260.",
    "hyp": "Pode multiplicar 12 pelo depósito final.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-somas:11-suc-somas:poupanca-pa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-SOM-044",
    "sourceFile": "content/vnext/math-a/11/11-suc-somas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-SOM-007",
    "themeId": "11-suc",
    "subtopicId": "11-suc-somas",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Somas de termos de PA e PG",
    "q": "Qual é a soma 10+8+6+4+2?",
    "o": [
      "20.",
      "40.",
      "30.",
      "25."
    ],
    "a": 2,
    "sol": "É uma PA com 5 termos; média dos extremos=(10+2)/2=6; total 30.",
    "hyp": "Pode multiplicar 5 por 4.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-somas:11-suc-somas:soma-decrescente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-SOM-007",
    "sourceFile": "content/vnext/math-a/11/11-suc-somas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-TR-023",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "Qual é um termo geral para 2,4,6,8,... começando em n=1?",
    "o": [
      "u_n=n+1.",
      "u_n=2n+2.",
      "u_n=2n.",
      "u_n=n²."
    ],
    "a": 2,
    "sol": "Os termos são os números pares positivos.",
    "hyp": "Pode deslocar a sequência uma posição.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-termo-recorrencia:11-suc-termo-recorrencia:inferir-termo-geral",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-023",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-TR-041",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "Logo, u_n=n/(n+1) é...",
    "o": [
      "estritamente crescente.",
      "decrescente.",
      "constante.",
      "alternada."
    ],
    "a": 0,
    "sol": "A diferença consecutiva é positiva.",
    "hyp": "Pode focar-se apenas no denominador crescente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-termo-recorrencia:11-suc-termo-recorrencia:monotonia-racional",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-041",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-TR-007",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "Se u_1=2 e u_{n+1}=u_n+3, então u_2=",
    "o": [
      "3.",
      "6.",
      "5.",
      "1."
    ],
    "a": 2,
    "sol": "u_2=2+3=5.",
    "hyp": "Pode somar ao índice em vez do termo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-termo-recorrencia:11-suc-termo-recorrencia:recorrencia-primeiro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-007",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-AR-023",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "Um ângulo coterminal em [0,2π[ com −π/4 é...",
    "o": [
      "π/4",
      "3π/4",
      "7π/4",
      "5π/4"
    ],
    "a": 2,
    "sol": "−π/4+2π=7π/4.",
    "hyp": "Pode apenas trocar o sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-angulos-radianos:11-trig-angulos-radianos:reduzir-rad-negativo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-023",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-AR-038",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "Um ponto percorre 3 voltas no sentido horário e depois mais π/4 no mesmo sentido. Qual é a amplitude orientada?",
    "o": [
      "−13π/4",
      "−25π/4",
      "25π/4",
      "−7π/4"
    ],
    "a": 1,
    "sol": "−3×2π−π/4=−6π−π/4=−25π/4.",
    "hyp": "Pode perder o sinal ou contar 3π.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-angulos-radianos:11-trig-angulos-radianos:voltas-orientadas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-038",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-AR-007",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "A conversão de radianos para graus faz-se multiplicando por...",
    "o": [
      "π/180",
      "360/π",
      "180/π",
      "π/360"
    ],
    "a": 2,
    "sol": "θ(°)=θ(rad)×180/π.",
    "hyp": "Pode usar o fator inverso.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-angulos-radianos:11-trig-angulos-radianos:converter-rad-graus",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-007",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-CIR-022",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Círculo trigonométrico e redução",
    "q": "Quanto vale cos(π/3)?",
    "o": [
      "√2/2",
      "1/2",
      "√3/2",
      "0"
    ],
    "a": 1,
    "sol": "É um valor notável.",
    "hyp": "Pode trocar seno e cosseno.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-circulo:11-trig-circulo:valores-notaveis",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-022",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-CIR-037",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Círculo trigonométrico e redução",
    "q": "Qual é sin(13π/6)?",
    "o": [
      "1/2",
      "−1/2",
      "√3/2",
      "0"
    ],
    "a": 0,
    "sol": "13π/6=2π+π/6, logo tem o mesmo seno de π/6.",
    "hyp": "Pode reduzir incorretamente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-circulo:11-trig-circulo:reducao-2pi",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-037",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-CIR-007",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Círculo trigonométrico e redução",
    "q": "O ponto associado a θ=3π/2 é...",
    "o": [
      "(−1,0).",
      "(0,1).",
      "(0,−1).",
      "(1,0)."
    ],
    "a": 2,
    "sol": "3π/2=270°, direção do eixo Oy negativo.",
    "hyp": "Pode confundir com π/2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-circulo:11-trig-circulo:pontos-notaveis",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-007",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-EQ-023",
    "themeId": "11-trig",
    "subtopicId": "11-trig-equacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Equações trigonométricas",
    "q": "Resolve cos²x=1/4 em [0,2π[.",
    "o": [
      "π/3 e 5π/3 apenas.",
      "2π/3 e 4π/3 apenas.",
      "π/3,2π/3,4π/3,5π/3.",
      "π/6,5π/6,7π/6,11π/6."
    ],
    "a": 2,
    "sol": "cos x=±1/2, produzindo quatro soluções.",
    "hyp": "Pode esquecer a raiz negativa ou usar os valores de seno.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-equacoes:11-trig-equacoes:quadratica-cos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-EQ-023",
    "sourceFile": "content/vnext/math-a/11/11-trig-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-EQ-046",
    "themeId": "11-trig",
    "subtopicId": "11-trig-equacoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Equações trigonométricas",
    "q": "Ao dividir uma equação por sin x, que cuidado é necessário?",
    "o": [
      "Pode criar sempre soluções com sin x=0.",
      "Pode perder soluções com sin x=0.",
      "Não há qualquer cuidado.",
      "A tangente deixa de existir sempre."
    ],
    "a": 1,
    "sol": "Dividir por uma expressão que pode ser zero elimina os casos em que ela se anula; esses casos devem ser testados separadamente.",
    "hyp": "Pode dividir por expressão desconhecida sem analisar zeros.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-equacoes:11-trig-equacoes:divisao-perigosa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-EQ-046",
    "sourceFile": "content/vnext/math-a/11/11-trig-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-EQ-007",
    "themeId": "11-trig",
    "subtopicId": "11-trig-equacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Equações trigonométricas",
    "q": "Em [0,2π[, cos x=1/2 tem soluções...",
    "o": [
      "π/3 e 2π/3.",
      "π/6 e 11π/6.",
      "π/3 e 5π/3.",
      "2π/3 e 4π/3."
    ],
    "a": 2,
    "sol": "Cosseno positivo nos quadrantes I e IV, referência π/3.",
    "hyp": "Pode usar quadrantes do seno.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-equacoes:11-trig-equacoes:cos-valor",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-EQ-007",
    "sourceFile": "content/vnext/math-a/11/11-trig-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-FUN-022",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Funções seno e cosseno",
    "q": "No modelo y=A sin(Bx+C)+D, |A| representa...",
    "o": [
      "o período.",
      "a amplitude.",
      "a fase.",
      "o valor médio."
    ],
    "a": 1,
    "sol": "O módulo de A determina a escala vertical.",
    "hyp": "Pode usar A sem módulo quando A<0.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-funcoes:11-trig-funcoes:parametro-A",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-022",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-FUN-038",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Funções seno e cosseno",
    "q": "Uma função sinusoidal tem máximo 9 e mínimo 1. A amplitude é...",
    "o": [
      "5.",
      "4.",
      "8.",
      "10."
    ],
    "a": 1,
    "sol": "Amplitude=(9−1)/2=4.",
    "hyp": "Pode usar a diferença total 8.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-funcoes:11-trig-funcoes:amplitude-de-extremos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-038",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-FUN-008",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Funções seno e cosseno",
    "q": "cos(x−2π) é igual a...",
    "o": [
      "−cos x.",
      "sin x.",
      "−sin x.",
      "cos x."
    ],
    "a": 3,
    "sol": "Deslocar por um período não altera o valor.",
    "hyp": "Pode errar o sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-funcoes:11-trig-funcoes:periodicidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-008",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-MOD-023",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Num triângulo, b=10, B=60° e C=30°. Quanto mede c?",
    "o": [
      "5",
      "5√3",
      "10/√3",
      "20"
    ],
    "a": 2,
    "sol": "c=10 sin30°/sin60°=10/√3≈5,77.",
    "hyp": "Pode usar sin60/sin30 em vez do inverso.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-modelacao:11-trig-modelacao:lei-senos-calculo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-023",
    "sourceFile": "content/vnext/math-a/11/11-trig-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-MOD-049",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Num triângulo com AB=100, A=45°, B=60° e C=75°, a distância AC, oposta a B=60°, é dada por...",
    "o": [
      "100 sin60°/sin75°",
      "100 sin75°/sin60°",
      "100 cos60°/cos75°",
      "100 tan60°"
    ],
    "a": 0,
    "sol": "Pela Lei dos Senos, AC/sin60°=100/sin75°.",
    "hyp": "Pode inverter a proporção.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-modelacao:11-trig-modelacao:triangulacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-049",
    "sourceFile": "content/vnext/math-a/11/11-trig-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-MOD-007",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Num triângulo retângulo, sin α=1/2 e a hipotenusa mede 10. O cateto oposto mede...",
    "o": [
      "10",
      "20",
      "5",
      "√5"
    ],
    "a": 2,
    "sol": "oposto/10=1/2 => oposto=5.",
    "hyp": "Pode dividir por 1/2 em vez de multiplicar.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-modelacao:11-trig-modelacao:usar-sin",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-007",
    "sourceFile": "content/vnext/math-a/11/11-trig-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-REL-021",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "sin(π−x) é igual a...",
    "o": [
      "sin x.",
      "−sin x.",
      "cos x.",
      "−cos x."
    ],
    "a": 0,
    "sol": "Ângulos suplementares têm o mesmo seno.",
    "hyp": "Pode trocar a relação de redução.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-relacoes:11-trig-relacoes:reducoes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-021",
    "sourceFile": "content/vnext/math-a/11/11-trig-relacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-REL-037",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "Se sin x+cos x=1, então sin x·cos x=",
    "o": [
      "0.",
      "1/2.",
      "1.",
      "−1/2."
    ],
    "a": 0,
    "sol": "1=(sin+cos)²=1+2sin cos, logo sin cos=0.",
    "hyp": "Pode não usar a identidade sin²+cos²=1.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-relacoes:11-trig-relacoes:produto-sin-cos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-037",
    "sourceFile": "content/vnext/math-a/11/11-trig-relacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-REL-007",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "Se cos x=−3/5 e x está no 2.º quadrante, então sin x=",
    "o": [
      "−4/5",
      "3/4",
      "4/5",
      "−3/4"
    ],
    "a": 2,
    "sol": "sin²x=1−9/25=16/25 e no 2.º quadrante sin>0.",
    "hyp": "Pode errar o sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-relacoes:11-trig-relacoes:achar-sin",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-007",
    "sourceFile": "content/vnext/math-a/11/11-trig-relacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-AG-023",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "Se z1=i e z2=−i, os pontos equidistantes são...",
    "o": [
      "o eixo imaginário.",
      "a reta y=1.",
      "o eixo real.",
      "a circunferência unitária."
    ],
    "a": 2,
    "sol": "A mediatriz do segmento vertical é y=0.",
    "hyp": "Pode escolher o segmento original.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-argand:12-cplx-argand:mediatriz-eixos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-023",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-AG-047",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "Do ponto z1=2−i ao ponto z2=−1+3i, o deslocamento é...",
    "o": [
      "3−4i.",
      "1+2i.",
      "−3+4i.",
      "−1+2i."
    ],
    "a": 2,
    "sol": "z2−z1=(−1−2)+(3−(−1))i=−3+4i.",
    "hyp": "Pode inverter a ordem.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-argand:12-cplx-argand:deslocamento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-047",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-AG-009",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "O oposto −z corresponde a...",
    "o": [
      "simetria central relativamente à origem.",
      "reflexão no eixo real.",
      "reflexão no eixo imaginário.",
      "translação de 1."
    ],
    "a": 0,
    "sol": "(x,y)→(−x,−y).",
    "hyp": "Pode mudar apenas uma coordenada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-argand:12-cplx-argand:oposto-geometrico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-009",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-CM-023",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Conjugado e módulo",
    "q": "O módulo do conjugado satisfaz...",
    "o": [
      "|conj(z)|=−|z|.",
      "|conj(z)|=1/|z|.",
      "|conj(z)|=|z|.",
      "|conj(z)|=0."
    ],
    "a": 2,
    "sol": "Refletir no eixo real não altera a distância à origem.",
    "hyp": "Pode achar que conjugação muda a magnitude.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-conjugado-modulo:12-cplx-conjugado-modulo:modulo-conjugado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-023",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-CM-037",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Conjugado e módulo",
    "q": "Se z=x+yi e z+conj(z)=8, então...",
    "o": [
      "x=4.",
      "y=4.",
      "x=8.",
      "y=8."
    ],
    "a": 0,
    "sol": "2x=8.",
    "hyp": "Pode usar a parte imaginária.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-conjugado-modulo:12-cplx-conjugado-modulo:soma-parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-037",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-CM-006",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Conjugado e módulo",
    "q": "|−5+12i| é...",
    "o": [
      "17.",
      "13.",
      "169.",
      "7."
    ],
    "a": 1,
    "sol": "√(25+144)=13.",
    "hyp": "Pode usar a soma dos módulos das partes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-conjugado-modulo:12-cplx-conjugado-modulo:modulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-006",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-FA-022",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "Se (2a−1)+(b+3)i=5−2i, então b=",
    "o": [
      "5.",
      "−5.",
      "−2.",
      "1."
    ],
    "a": 1,
    "sol": "b+3=−2 => b=−5.",
    "hyp": "Pode esquecer o sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-forma-algebrica:12-cplx-forma-algebrica:parametros",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-022",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-FA-043",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "A aplicação z↦iz, na forma algébrica, transforma (a,b) em...",
    "o": [
      "(b,a).",
      "(−a,−b).",
      "(−b,a).",
      "(a,−b)."
    ],
    "a": 2,
    "sol": "iz=−b+ai.",
    "hyp": "Pode trocar a regra de rotação.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-forma-algebrica:12-cplx-forma-algebrica:transformacao-i",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-043",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-FA-006",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "Se z=−5+7i, Re(z) é...",
    "o": [
      "7.",
      "−5.",
      "5.",
      "−7."
    ],
    "a": 1,
    "sol": "Re(z)=−5.",
    "hyp": "Pode escolher a parte imaginária.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-forma-algebrica:12-cplx-forma-algebrica:ler-real",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-006",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-FT-022",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-trig",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Forma trigonométrica, módulo e argumento",
    "q": "Se |z|=4 e arg(z)=π/6, então z=",
    "o": [
      "2+2√3i.",
      "2√3+2i.",
      "4√3+2i.",
      "√3+2i."
    ],
    "a": 1,
    "sol": "4cosπ/6=2√3 e 4sinπ/6=2.",
    "hyp": "Pode trocar seno e cosseno.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-forma-trig:12-cplx-forma-trig:converter",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FT-022",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-FT-042",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-trig",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Forma trigonométrica, módulo e argumento",
    "q": "A condição arg(z)=π/2, z≠0, descreve...",
    "o": [
      "todo o eixo imaginário.",
      "o semieixo imaginário positivo.",
      "o semieixo real positivo.",
      "uma circunferência."
    ],
    "a": 1,
    "sol": "Argumento π/2 fixa a direção positiva de Oy.",
    "hyp": "Pode incluir a direção oposta.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-forma-trig:12-cplx-forma-trig:lugar-arg",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FT-042",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-FT-008",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-trig",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Forma trigonométrica, módulo e argumento",
    "q": "Um argumento de −1+i é...",
    "o": [
      "π/4.",
      "5π/4.",
      "7π/4.",
      "3π/4."
    ],
    "a": 3,
    "sol": "2.º quadrante, ângulo de referência π/4.",
    "hyp": "Pode ignorar os sinais das coordenadas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-forma-trig:12-cplx-forma-trig:arg-notavel",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FT-008",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-OA-021",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Operações na forma algébrica",
    "q": "(3+4i)/(1+i)=",
    "o": [
      "(7+i)/2.",
      "(7−i)/2.",
      "3+4i.",
      "7+i."
    ],
    "a": 0,
    "sol": "(3+4i)(1−i)/2=(7+i)/2.",
    "hyp": "Pode errar os termos cruzados.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-operacoes-algebricas:12-cplx-operacoes-algebricas:divisao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-021",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-algebricas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-OA-049",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Operações na forma algébrica",
    "q": "Dois sinais z1=2+i e z2=−1+3i somam-se. O resultado é...",
    "o": [
      "1+4i.",
      "3+2i.",
      "1+2i.",
      "−3+4i."
    ],
    "a": 0,
    "sol": "Somam-se componentes correspondentes.",
    "hyp": "modelacao-soma",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-operacoes-algebricas:12-cplx-operacoes-algebricas:undefined",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-049",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-algebricas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-OA-006",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Operações na forma algébrica",
    "q": "(2−3i)−(−4+i)=",
    "o": [
      "−2−2i.",
      "6−4i.",
      "6−2i.",
      "−6−4i."
    ],
    "a": 1,
    "sol": "2+4=6 e −3−1=−4.",
    "hyp": "Pode esquecer mudar o sinal de −4.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-operacoes-algebricas:12-cplx-operacoes-algebricas:subtracao-sinais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-006",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-algebricas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-OT-022",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "As soluções de z²=−1 são...",
    "o": [
      "±1.",
      "±i.",
      "i apenas.",
      "−1 apenas."
    ],
    "a": 1,
    "sol": "i²=−1 e (−i)²=−1.",
    "hyp": "Pode esquecer a segunda raiz.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-operacoes-trig:12-cplx-operacoes-trig:raiz-quadrada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-022",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-OT-046",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "Dividir por um complexo de módulo 2 e argumento π/4 corresponde a...",
    "o": [
      "dilatar por 2 e rodar π/4.",
      "dilatar por 1/2 e rodar −π/4.",
      "rodar π/4 sem escala.",
      "refletir no eixo real."
    ],
    "a": 1,
    "sol": "No quociente, divide-se o módulo e subtrai-se o argumento.",
    "hyp": "Pode aplicar as regras da multiplicação.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-operacoes-trig:12-cplx-operacoes-trig:transformacao-quociente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-046",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-OT-008",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "[cosπ/4+i sinπ/4]^2 é...",
    "o": [
      "1.",
      "−1.",
      "−i.",
      "i."
    ],
    "a": 3,
    "sol": "Pelo Moivre, cosπ/2+i sinπ/2=i.",
    "hyp": "Pode manter o argumento π/4.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-operacoes-trig:12-cplx-operacoes-trig:moivre-notavel",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-008",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-UE-021",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "Resolve x²−2x+5=0.",
    "o": [
      "x=1±2i.",
      "x=−1±2i.",
      "x=2±i.",
      "x=1±i."
    ],
    "a": 0,
    "sol": "Δ=4−20=−16; x=(2±4i)/2=1±2i.",
    "hyp": "Pode errar a divisão por 2a.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-unidade-equacoes:12-cplx-unidade-equacoes:quadratica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-021",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-UE-046",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "Se uma equação quadrática com coeficientes reais tem discriminante <0, então as raízes...",
    "o": [
      "são reais distintas.",
      "têm a mesma parte real e partes imaginárias opostas.",
      "são ambas imaginárias puras sempre.",
      "têm módulos necessariamente diferentes."
    ],
    "a": 1,
    "sol": "São conjugadas: a±bi.",
    "hyp": "Pode pensar que parte real tem de ser zero.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-unidade-equacoes:12-cplx-unidade-equacoes:estrutura-raizes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-046",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-UE-006",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "i¹⁰ é...",
    "o": [
      "1.",
      "−1.",
      "i.",
      "−i."
    ],
    "a": 1,
    "sol": "10≡2 mod4, logo i¹⁰=i²=−1.",
    "hyp": "Pode reduzir o expoente módulo 2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-unidade-equacoes:12-cplx-unidade-equacoes:potencia-grande",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-006",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-EQ-023",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Resolve 5^(x−1)=12. Uma expressão para x é...",
    "o": [
      "log_5 12−1.",
      "log_12 5+1.",
      "1+log_5 12.",
      "12+log_5 5."
    ],
    "a": 2,
    "sol": "x−1=log_5 12, logo x=1+log_5 12.",
    "hyp": "Pode esquecer recompor o termo−1.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-equacoes:12-expl-equacoes:exp-logaritmos-23",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-023",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-EQ-044",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Uma quantidade Q(t)=500·0,8^t atinge250 quando t é...",
    "o": [
      "1.",
      "2.",
      "ln0,8/ln0,5.",
      "ln0,5/ln0,8."
    ],
    "a": 3,
    "sol": "0,8^t=0,5 =>t=ln0,5/ln0,8.",
    "hyp": "Pode inverter a razão de logaritmos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-equacoes:12-expl-equacoes:modelacao-meia-44",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-044",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-EQ-006",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Resolve 4^(x−1)=16.",
    "o": [
      "x=2.",
      "x=3.",
      "x=1.",
      "x=4."
    ],
    "a": 1,
    "sol": "16=4²; x−1=2 =>x=3.",
    "hyp": "Pode responder2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-equacoes:12-expl-equacoes:exp-linear-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-006",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-EXP-023",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função exponencial",
    "q": "Se f(x)=4^x, então f(x+1)/f(x)=...",
    "o": [
      "x+1.",
      "1.",
      "4.",
      "4^x."
    ],
    "a": 2,
    "sol": "4^(x+1)/4^x=4.",
    "hyp": "Pode achar que a razão depende de x.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-exponencial:12-expl-exponencial:razao-23",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-023",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-EXP-042",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Função exponencial",
    "q": "Geometricamente, y=2^(−x) obtém-se de y=2^x por reflexão...",
    "o": [
      "em Ox.",
      "em Oy.",
      "na reta y=x.",
      "na origem."
    ],
    "a": 1,
    "sol": "Substituir x por−x reflete horizontalmente no eixo Oy.",
    "hyp": "Pode confundir sinais dentro e fora da função.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-exponencial:12-expl-exponencial:reflexao-Oy-42",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-042",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-EXP-007",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Função exponencial",
    "q": "Se 0<a<1, f(x)=a^x é...",
    "o": [
      "crescente.",
      "constante.",
      "estritamente decrescente.",
      "não definida para x<0."
    ],
    "a": 2,
    "sol": "Uma base entre0 e1 produz decrescimento exponencial.",
    "hyp": "Pode achar que base positiva implica crescimento.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-exponencial:12-expl-exponencial:monotonia-a-menor1-7",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-007",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-IR-021",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Função inversa e raízes",
    "q": "8^(2/3)=...",
    "o": [
      "4.",
      "16.",
      "2.",
      "64."
    ],
    "a": 0,
    "sol": "Raiz cúbica de8 é2;2²=4.",
    "hyp": "Pode fazer8²/3.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-inversa-raizes:12-expl-inversa-raizes:expoente-racional-21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-021",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-IR-037",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Função inversa e raízes",
    "q": "Se f(x)=(x−1)/3, então f^−1(x)=...",
    "o": [
      "3x+1.",
      "x/3−1.",
      "3x−1.",
      "(x+1)/3."
    ],
    "a": 0,
    "sol": "y=(x−1)/3 =>x=3y+1.",
    "hyp": "Pode repetir a própria função.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-inversa-raizes:12-expl-inversa-raizes:inversa-afim-37",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-037",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-IR-009",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Função inversa e raízes",
    "q": "A função f(x)=a^x, com a>0 e a≠1, é invertível porque é...",
    "o": [
      "estritamente monótona.",
      "par.",
      "periódica.",
      "limitada."
    ],
    "a": 0,
    "sol": "A exponencial é estritamente crescente se a>1 e estritamente decrescente se0<a<1.",
    "hyp": "Pode associar invertibilidade a ter imagem positiva.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-inversa-raizes:12-expl-inversa-raizes:exp-injetiva-9",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-009",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-LOG-022",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Função logarítmica e propriedades",
    "q": "log_2 10 pode calcular-se por...",
    "o": [
      "ln2/ln10.",
      "ln10/ln2.",
      "ln20.",
      "10/2."
    ],
    "a": 1,
    "sol": "Aplica-se mudança de base usando ln.",
    "hyp": "Pode inverter a fração.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-logaritmica:12-expl-logaritmica:mudanca-base-num-22",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-022",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-LOG-038",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Função logarítmica e propriedades",
    "q": "A assíntota de y=log_2(x−3) é...",
    "o": [
      "y=3.",
      "x=3.",
      "x=−3.",
      "y=0."
    ],
    "a": 1,
    "sol": "O argumento aproxima-se de0 quando x→3^+.",
    "hyp": "Pode tratar a translação horizontal como vertical.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-logaritmica:12-expl-logaritmica:assintota-trans-38",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-038",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-LOG-010",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Função logarítmica e propriedades",
    "q": "A imagem de f(x)=log_2 x é...",
    "o": [
      "]0,+∞[.",
      "R.",
      "[0,+∞[.",
      "]−∞,0[."
    ],
    "a": 1,
    "sol": "A função inversa da exponencial recebe todos os valores reais como saídas.",
    "hyp": "Pode confundir domínio e imagem.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-logaritmica:12-expl-logaritmica:imagem-10",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-010",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-MOD-023",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Uma quantidade cai de800 para648 em2 períodos com fator constante. O fator por período é...",
    "o": [
      "0,81.",
      "0,95.",
      "0,9.",
      "0,8."
    ],
    "a": 2,
    "sol": "648/800=0,81=0,9², portanto fator0,9.",
    "hyp": "Pode usar0,81 como fator de um único período.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-modelacao:12-expl-modelacao:inferir-dec-23",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-023",
    "sourceFile": "content/vnext/math-a/12/12-expl-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-MOD-040",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Num modelo de crescimento percentual, a diferença Q(t+1)−Q(t)...",
    "o": [
      "é constante.",
      "é sempre zero.",
      "é igual à base b.",
      "é proporcional a Q(t)."
    ],
    "a": 3,
    "sol": "Q(t+1)−Q(t)=Q(t)(b−1).",
    "hyp": "Pode confundir percentagem constante com aumento absoluto constante.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-modelacao:12-expl-modelacao:diferenca-proporcional-40",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-040",
    "sourceFile": "content/vnext/math-a/12/12-expl-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-MOD-007",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Um medicamento começa com80 mg e perde20% por hora. Um modelo é...",
    "o": [
      "80·1,2^t.",
      "80−0,2t.",
      "80·0,8^t.",
      "80·0,2^t."
    ],
    "a": 2,
    "sol": "Após cada hora permanece80%=0,8 da quantidade anterior.",
    "hyp": "Pode usar a taxa perdida0,2 como fator que permanece.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-modelacao:12-expl-modelacao:modelo-dec-7",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-007",
    "sourceFile": "content/vnext/math-a/12/12-expl-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-AP-022",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Para R(q)=20q−q², a quantidade que maximiza a receita é...",
    "o": [
      "q=20.",
      "q=10.",
      "q=5.",
      "q=0."
    ],
    "a": 1,
    "sol": "R'=20−2q=0 =>q=10.",
    "hyp": "Pode usar a interseção com o eixo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-aplicacoes:12-fcd-aplicacoes:otimizacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-022",
    "sourceFile": "content/vnext/math-a/12/12-fcd-aplicacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-AP-038",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Se f'(x)=(x−1)(x+2), então f tem...",
    "o": [
      "mínimo em−2 e máximo em1.",
      "máximo local em −2 e mínimo local em1.",
      "dois máximos.",
      "dois mínimos."
    ],
    "a": 1,
    "sol": "O sinal muda +→− em−2 e −→+ em1.",
    "hyp": "Pode inverter os extremos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-aplicacoes:12-fcd-aplicacoes:extremos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-038",
    "sourceFile": "content/vnext/math-a/12/12-fcd-aplicacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-AP-013",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Se f''(a)>0 e f'(a)=0, então a é, sob condições usuais...",
    "o": [
      "ponto de mínimo local.",
      "ponto de máximo local.",
      "ponto de inflexão.",
      "assíntota vertical."
    ],
    "a": 0,
    "sol": "Segunda derivada positiva indica convexidade local.",
    "hyp": "Pode inverter o teste da segunda derivada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-aplicacoes:12-fcd-aplicacoes:segunda-derivada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-013",
    "sourceFile": "content/vnext/math-a/12/12-fcd-aplicacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-COMP-023",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função composta e domínio",
    "q": "Se f(x)=ln x e g(x)=x²−9, o domínio de f∘g é...",
    "o": [
      "[−3,3].",
      "]−3,3[.",
      "]−∞,−3[∪]3,+∞[.",
      "R\\{−3,3}."
    ],
    "a": 2,
    "sol": "ln(x²−9) exige x²−9>0.",
    "hyp": "Pode usar condição ≠0 em vez de >0.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-composicao:12-fcd-composicao:dominio-log",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-023",
    "sourceFile": "content/vnext/math-a/12/12-fcd-composicao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-COMP-043",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Função composta e domínio",
    "q": "Se g é constante, g(x)=c, então f∘g...",
    "o": [
      "é igual a f.",
      "é sempre identidade.",
      "é constante sempre que c∈D_f.",
      "não pode ser definida."
    ],
    "a": 2,
    "sol": "f(g(x))=f(c), valor constante.",
    "hyp": "Pode pensar que uma função constante desaparece na composição.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-composicao:12-fcd-composicao:composicao-constante",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-043",
    "sourceFile": "content/vnext/math-a/12/12-fcd-composicao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-COMP-007",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Função composta e domínio",
    "q": "Se f(x)=√x e g(x)=x−2, qual é o domínio de f∘g?",
    "o": [
      "]−∞,2].",
      "R.",
      "[2,+∞[.",
      "]2,+∞[."
    ],
    "a": 2,
    "sol": "(f∘g)(x)=√(x−2) exige x−2≥0; logo, o domínio é [2,+∞[.",
    "hyp": "Pode impor x−2>0 e excluir incorretamente x=2, ou inverter a desigualdade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-composicao:12-fcd-composicao:dominio-regra",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-007",
    "sourceFile": "content/vnext/math-a/12/12-fcd-composicao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-EE-022",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Número e e derivada da exponencial",
    "q": "A tangente a y=e^x em x=1 tem equação...",
    "o": [
      "y=e x+1.",
      "y=e x.",
      "y=x+e.",
      "y=e(x+1)."
    ],
    "a": 1,
    "sol": "Em x=1, ponto (1,e) e declive e: y−e=e(x−1), isto é y=ex.",
    "hyp": "Pode não reconhecer formas equivalentes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-e-exponencial:12-fcd-e-exponencial:tangente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-022",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-EE-038",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Número e e derivada da exponencial",
    "q": "No modelo P(t)=P0e^{kt}, k representa...",
    "o": [
      "o valor inicial.",
      "a taxa de crescimento contínuo por unidade de tempo.",
      "o tempo de duplicação diretamente.",
      "o valor final."
    ],
    "a": 1,
    "sol": "k é o parâmetro de crescimento/decrescimento contínuo.",
    "hyp": "Pode confundir com P0.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-e-exponencial:12-fcd-e-exponencial:parametro-k",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-038",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-EE-007",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Número e e derivada da exponencial",
    "q": "A função e^x é...",
    "o": [
      "estritamente decrescente.",
      "constante.",
      "estritamente crescente em R.",
      "crescente só para x>0."
    ],
    "a": 2,
    "sol": "A derivada e^x é sempre positiva.",
    "hyp": "Pode achar que expoentes negativos produzem função decrescente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-e-exponencial:12-fcd-e-exponencial:monotonia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-007",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-LTP-023",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "A derivada de ln(x²+1) é...",
    "o": [
      "1/(x²+1).",
      "2x ln(x²+1).",
      "2x/(x²+1).",
      "2/(x+1)."
    ],
    "a": 2,
    "sol": "Pela cadeia: g'/g.",
    "hyp": "Pode esquecer o numerador2x.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-log-trig-potencias:12-fcd-log-trig-potencias:ln-polinomio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-023",
    "sourceFile": "content/vnext/math-a/12/12-fcd-log-trig-potencias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-LTP-049",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "Uma oscilação é y(t)=5sin(2t). A velocidade y'(t) é...",
    "o": [
      "10cos(2t).",
      "5cos(2t).",
      "10sin(2t).",
      "−10sin(2t)."
    ],
    "a": 0,
    "sol": "Deriva-se seno e multiplica-se pela frequência angular2.",
    "hyp": "Pode esquecer o fator2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-log-trig-potencias:12-fcd-log-trig-potencias:modelacao-oscilacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-049",
    "sourceFile": "content/vnext/math-a/12/12-fcd-log-trig-potencias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-LTP-008",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "A derivada de 1/x=x^{-1} é...",
    "o": [
      "1/x².",
      "−1/x.",
      "1.",
      "−1/x²."
    ],
    "a": 3,
    "sol": "−x^{-2}=−1/x².",
    "hyp": "Pode perder o sinal negativo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-log-trig-potencias:12-fcd-log-trig-potencias:reciproco",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-008",
    "sourceFile": "content/vnext/math-a/12/12-fcd-log-trig-potencias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-RC-022",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "A derivada de 1/(2x+3) é...",
    "o": [
      "−1/(2x+3)².",
      "−2/(2x+3)².",
      "2/(2x+3)².",
      "1/(2x+3)."
    ],
    "a": 1,
    "sol": "(2x+3)^{-1}'=−(2x+3)^{-2}·2.",
    "hyp": "Pode perder o fator ou o sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-regras-cadeia:12-fcd-regras-cadeia:cadeia-negativa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-022",
    "sourceFile": "content/vnext/math-a/12/12-fcd-regras-cadeia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-RC-037",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "A derivada de ln(x²+e^x) é...",
    "o": [
      "(2x+e^x)/(x²+e^x).",
      "1/(x²+e^x).",
      "2x+e^x.",
      "ln(2x+e^x)."
    ],
    "a": 0,
    "sol": "Para g(x)=x²+e^x, tem-se g'(x)=2x+e^x. Como (ln g)'=g'/g, a derivada é (2x+e^x)/(x²+e^x).",
    "hyp": "Pode esquecer dividir pela função interna.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-regras-cadeia:12-fcd-regras-cadeia:cadeia-log-complexa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-037",
    "sourceFile": "content/vnext/math-a/12/12-fcd-regras-cadeia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-RC-009",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "A derivada de x cos x é...",
    "o": [
      "cos x−x sin x.",
      "−sin x.",
      "x sin x.",
      "cos x+x sin x."
    ],
    "a": 0,
    "sol": "Pela regra do produto, (x cos x)'=1·cos x+x(−sin x)=cos x−x sin x.",
    "hyp": "Pode perder o sinal do cosseno.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-regras-cadeia:12-fcd-regras-cadeia:produto-trig",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-009",
    "sourceFile": "content/vnext/math-a/12/12-fcd-regras-cadeia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-DER-023",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "Considere f(x)=x² para x≤1 e f(x)=ax+b para x>1. Se f é contínua e derivável em1, quais são a e b?",
    "o": [
      "a=1,b=0.",
      "a=2,b=1.",
      "a=2,b=−1.",
      "a=−2,b=3."
    ],
    "a": 2,
    "sol": "a=2 e a+b=1 =>b=−1.",
    "hyp": "Pode resolver o sistema incorretamente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-derivabilidade:12-fcont-derivabilidade:ramos-parametros",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-023",
    "sourceFile": "content/vnext/math-a/12/12-fcont-derivabilidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-DER-039",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "Para f(x)=x sin(1/x), x≠0, e f(0)=0, o quociente incremental em0 é sin(1/h). Como este não tem limite quando h→0, a função...",
    "o": [
      "é derivável com derivada0.",
      "é descontínua em0.",
      "não é derivável em0.",
      "tem derivada1."
    ],
    "a": 2,
    "sol": "O quociente incremental oscila sem limite.",
    "hyp": "Pode pensar que continuidade garante derivabilidade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-derivabilidade:12-fcont-derivabilidade:oscilatoria",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-039",
    "sourceFile": "content/vnext/math-a/12/12-fcont-derivabilidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-DER-007",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "A função f(x)=√x é derivável para...",
    "o": [
      "x≥0.",
      "todo R.",
      "x>0.",
      "x<0."
    ],
    "a": 2,
    "sol": "f'(x)=1/(2√x) requer x>0; em0 a derivada finita não existe.",
    "hyp": "Pode confundir domínio com domínio de derivabilidade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-derivabilidade:12-fcont-derivabilidade:raiz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-007",
    "sourceFile": "content/vnext/math-a/12/12-fcont-derivabilidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-EG-021",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "Para f(x)=x³−3x, f'(x)=",
    "o": [
      "3x²−3.",
      "x²−3.",
      "3x²−1.",
      "3x−3."
    ],
    "a": 0,
    "sol": "Derivada de x³ é3x².",
    "hyp": "Pode esquecer o fator3.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-estudo-global:12-fcont-estudo-global:cubica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-021",
    "sourceFile": "content/vnext/math-a/12/12-fcont-estudo-global.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-EG-038",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "A função x/(1+x²) é crescente em...",
    "o": [
      "]−∞,−1[∪]1,+∞[.",
      "]−1,1[.",
      "R.",
      "x>0."
    ],
    "a": 1,
    "sol": "f'>0 quando1−x²>0.",
    "hyp": "Pode inverter a desigualdade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-estudo-global:12-fcont-estudo-global:racional-monotonia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-038",
    "sourceFile": "content/vnext/math-a/12/12-fcont-estudo-global.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-EG-011",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "Um ponto de inflexão é um ponto onde...",
    "o": [
      "f'=0 sempre.",
      "f=0.",
      "a concavidade muda.",
      "há um máximo absoluto."
    ],
    "a": 2,
    "sol": "A mudança de concavidade é a característica essencial.",
    "hyp": "Pode usar f''=0 como definição suficiente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-estudo-global:12-fcont-estudo-global:inflexao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-011",
    "sourceFile": "content/vnext/math-a/12/12-fcont-estudo-global.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-LC-023",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Limite intuitivo e continuidade",
    "q": "Se lim_{x→a}f(x)=+∞, então...",
    "o": [
      "f é contínua em a.",
      "f(a)=+∞ como número real.",
      "não existe limite real finito em a.",
      "a é raiz."
    ],
    "a": 2,
    "sol": "+∞ descreve comportamento ilimitado, não um valor real da função.",
    "hyp": "Pode tratar infinito como número real.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-limites-continuidade:12-fcont-limites-continuidade:infinito",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-023",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-LC-037",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Limite intuitivo e continuidade",
    "q": "Para que valor de k a função f(x)=(x²−4)/(x−2), x≠2, e f(2)=k seja contínua?",
    "o": [
      "4.",
      "2.",
      "0.",
      "−4."
    ],
    "a": 0,
    "sol": "O limite em2 é4.",
    "hyp": "Pode usar o valor do numerador ou do denominador.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-limites-continuidade:12-fcont-limites-continuidade:prolongamento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-037",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-LC-007",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Limite intuitivo e continuidade",
    "q": "Se lim_{x→2−}f(x)=3 e lim_{x→2+}f(x)=3, então lim_{x→2}f(x)=",
    "o": [
      "6.",
      "0.",
      "3.",
      "não existe."
    ],
    "a": 2,
    "sol": "Os limites laterais coincidem.",
    "hyp": "Pode somar os limites.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-limites-continuidade:12-fcont-limites-continuidade:laterais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-007",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-OP-022",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Operações com funções contínuas",
    "q": "lim_{x→0} e^{x²}=",
    "o": [
      "0.",
      "1.",
      "e.",
      "não existe."
    ],
    "a": 1,
    "sol": "x²→0 e e^0=1.",
    "hyp": "Pode confundir expoente com valor final.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-operacoes:12-fcont-operacoes:composicao-limite",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-022",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-OP-037",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Operações com funções contínuas",
    "q": "lim_{x→0} ln(1+x)/x é...",
    "o": [
      "1.",
      "0.",
      "+∞.",
      "−1."
    ],
    "a": 0,
    "sol": "É um limite fundamental ligado à derivada de ln em1.",
    "hyp": "Pode substituir e parar em0/0.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-operacoes:12-fcont-operacoes:fundamental-log",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-037",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-OP-011",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Operações com funções contínuas",
    "q": "Se f é contínua em a e k é constante, então kf é...",
    "o": [
      "descontínua se k=0.",
      "contínua só se k>0.",
      "contínua em a.",
      "sempre derivável."
    ],
    "a": 2,
    "sol": "Multiplicar por constante preserva continuidade.",
    "hyp": "Pode achar que k=0 é exceção problemática.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-operacoes:12-fcont-operacoes:escalar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-011",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-DA-023",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "A distribuição de X̄ costuma ser menos dispersa do que a distribuição individual porque...",
    "o": [
      "a média é sempre igual a μ.",
      "os dados individuais deixam de variar.",
      "a média agrega informação de várias observações.",
      "σ aumenta."
    ],
    "a": 2,
    "sol": "A média suaviza flutuações individuais.",
    "hyp": "Pode confundir menor variabilidade com ausência de variabilidade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-distribuicoes-amostragem:12-ie-distribuicoes-amostragem:xbar-dispersao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-023",
    "sourceFile": "content/vnext/math-a/12/12-ie-distribuicoes-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-DA-038",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "A correção finita √[(N−n)/(N−1)] é...",
    "o": [
      "sempre maior que1.",
      "menor ou igual a1.",
      "sempre zero.",
      "igual a n/N."
    ],
    "a": 1,
    "sol": "Como N−n≤N−1 para n≥1, o fator não excede1.",
    "hyp": "Pode achar que correção aumenta o erro.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-distribuicoes-amostragem:12-ie-distribuicoes-amostragem:cpf",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-038",
    "sourceFile": "content/vnext/math-a/12/12-ie-distribuicoes-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-DA-007",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "Se σ=20 e n=100, o erro padrão é...",
    "o": [
      "0,2.",
      "10.",
      "2.",
      "20."
    ],
    "a": 2,
    "sol": "20/10=2.",
    "hyp": "Pode dividir por100.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-distribuicoes-amostragem:12-ie-distribuicoes-amostragem:ep-calculo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-007",
    "sourceFile": "content/vnext/math-a/12/12-ie-distribuicoes-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-EST-023",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Estimação de parâmetros",
    "q": "Se um estimador tem viés2 e variância9, o MSE é...",
    "o": [
      "11.",
      "9.",
      "13.",
      "4."
    ],
    "a": 2,
    "sol": "9+2²=13.",
    "hyp": "Pode somar viés sem quadrar.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-estimacao:12-ie-estimacao:mse",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-023",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-EST-039",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Estimação de parâmetros",
    "q": "Dobrar a precisão no sentido de reduzir o erro padrão para metade exige aproximadamente...",
    "o": [
      "duplicar n.",
      "reduzir n para metade.",
      "quadruplicar n.",
      "aumentar n em50%."
    ],
    "a": 2,
    "sol": "Erro padrão varia com1/√n.",
    "hyp": "Pode usar relação linear.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-estimacao:12-ie-estimacao:precisao-n",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-039",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-EST-007",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Estimação de parâmetros",
    "q": "Uma amostra tem valores 4,6,8. A estimativa de μ pela média é...",
    "o": [
      "18.",
      "3.",
      "6.",
      "2."
    ],
    "a": 2,
    "sol": "(4+6+8)/3=6.",
    "hyp": "Pode usar a soma.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-estimacao:12-ie-estimacao:media",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-007",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-IA-022",
    "themeId": "12-ie",
    "subtopicId": "12-ie-inferencia-amostragem",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Raciocínio inferencial e amostragem",
    "q": "Conglomerados, ao contrário de estratos, são frequentemente escolhidos por...",
    "o": [
      "garantir cada subgrupo na proporção exata.",
      "conveniência logística e agrupamento natural.",
      "eliminar toda a correlação interna.",
      "tornar a amostra um censo."
    ],
    "a": 1,
    "sol": "Pode ser mais barato observar grupos inteiros geograficamente ou administrativamente próximos.",
    "hyp": "Pode confundir os objetivos de estratificação e conglomerados.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-inferencia-amostragem:12-ie-inferencia-amostragem:conglomerados",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IA-022",
    "sourceFile": "content/vnext/math-a/12/12-ie-inferencia-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-IA-041",
    "themeId": "12-ie",
    "subtopicId": "12-ie-inferencia-amostragem",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Raciocínio inferencial e amostragem",
    "q": "Se duas estratégias são não enviesadas mas A tem menor variância que B, A é...",
    "o": [
      "mais precisa.",
      "mais enviesada.",
      "menos eficiente.",
      "sempre pior."
    ],
    "a": 0,
    "sol": "Menor variância significa menor dispersão amostral.",
    "hyp": "Pode confundir variância menor com viés maior.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-inferencia-amostragem:12-ie-inferencia-amostragem:comparar-estimadores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IA-041",
    "sourceFile": "content/vnext/math-a/12/12-ie-inferencia-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-IA-011",
    "themeId": "12-ie",
    "subtopicId": "12-ie-inferencia-amostragem",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Raciocínio inferencial e amostragem",
    "q": "Aumentar o tamanho da amostra tende a reduzir...",
    "o": [
      "todo o viés de seleção automaticamente.",
      "o tamanho da população.",
      "a variabilidade amostral.",
      "o parâmetro."
    ],
    "a": 2,
    "sol": "Amostras maiores costumam produzir estimativas menos variáveis.",
    "hyp": "Pode pensar que tamanho corrige qualquer desenho enviesado.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-inferencia-amostragem:12-ie-inferencia-amostragem:tamanho",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IA-011",
    "sourceFile": "content/vnext/math-a/12/12-ie-inferencia-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-IC-022",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "Para reduzir a margem a um terço, n deve ser multiplicado por...",
    "o": [
      "3.",
      "9.",
      "6.",
      "27."
    ],
    "a": 1,
    "sol": "1/√9=1/3.",
    "hyp": "Pode usar o mesmo fator3.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-intervalos-confianca:12-ie-intervalos-confianca:planeamento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-022",
    "sourceFile": "content/vnext/math-a/12/12-ie-intervalos-confianca.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-IC-040",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "No planeamento de n, arredonda-se geralmente...",
    "o": [
      "para baixo.",
      "para o inteiro par mais próximo.",
      "sempre para100.",
      "para cima."
    ],
    "a": 3,
    "sol": "Precisamos garantir que a margem não excede o alvo.",
    "hyp": "Pode reduzir n e perder a garantia.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-intervalos-confianca:12-ie-intervalos-confianca:arredondar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-040",
    "sourceFile": "content/vnext/math-a/12/12-ie-intervalos-confianca.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-IC-007",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "A interpretação frequentista correta de 95% é...",
    "o": [
      "95% dos dados estão dentro do intervalo.",
      "o parâmetro muda de amostra para amostra.",
      "em muitas repetições do procedimento, cerca de95% dos intervalos conteriam o parâmetro.",
      "há 95% de certeza subjetiva por definição."
    ],
    "a": 2,
    "sol": "A cobertura refere-se à frequência de sucesso do método.",
    "hyp": "Pode confundir intervalo para parâmetro com intervalo para dados.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-intervalos-confianca:12-ie-intervalos-confianca:cobertura",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-007",
    "sourceFile": "content/vnext/math-a/12/12-ie-intervalos-confianca.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-TLC-022",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "Com X̄≈N(50,3²), o valor z de44 é...",
    "o": [
      "2.",
      "−2.",
      "−6.",
      "−1."
    ],
    "a": 1,
    "sol": "(44−50)/3=−2.",
    "hyp": "Pode perder o sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-tlc:12-ie-tlc:padronizar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-022",
    "sourceFile": "content/vnext/math-a/12/12-ie-tlc.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-TLC-037",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "A aproximação Normal à Binomial é uma manifestação de...",
    "o": [
      "ideias do TLC.",
      "Teorema de Pitágoras.",
      "regra do produto escalar.",
      "derivação."
    ],
    "a": 0,
    "sol": "A soma de Bernoullis normalizada aproxima a Normal.",
    "hyp": "Pode ver as aproximações como não relacionadas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-tlc:12-ie-tlc:binomial-normal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-037",
    "sourceFile": "content/vnext/math-a/12/12-ie-tlc.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-TLC-008",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "A regra 'n≥30' é...",
    "o": [
      "uma condição matemática necessária e suficiente.",
      "válida só para proporções.",
      "sempre falsa.",
      "uma heurística, não uma lei universal."
    ],
    "a": 3,
    "sol": "O tamanho necessário depende da distribuição e do objetivo.",
    "hyp": "Pode tratar regra prática como teorema.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-tlc:12-ie-tlc:regra30",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-008",
    "sourceFile": "content/vnext/math-a/12/12-ie-tlc.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-AR-023",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Áreas e aplicações",
    "q": "A área delimitada por y=2x e y=x² é...",
    "o": [
      "2.",
      "8/3.",
      "4/3.",
      "2/3."
    ],
    "a": 2,
    "sol": "∫_0^2(2x−x²)dx=[x²−x³/3]_0^2=4−8/3=4/3.",
    "hyp": "Pode integrar na ordem errada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-areas:12-int-areas:area-curvas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-023",
    "sourceFile": "content/vnext/math-a/12/12-int-areas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-AR-038",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Áreas e aplicações",
    "q": "Em [0,1], e^x≥1, logo a área entre y=e^x e y=1 é...",
    "o": [
      "∫_0^1(1−e^x)dx.",
      "∫_0^1(e^x−1)dx.",
      "∫_0^1(e^x+1)dx.",
      "e−1."
    ],
    "a": 1,
    "sol": "Subtrai-se a função inferior à superior.",
    "hyp": "Pode esquecer retirar a reta y=1.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-areas:12-int-areas:entre-exp",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-038",
    "sourceFile": "content/vnext/math-a/12/12-int-areas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-AR-007",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Áreas e aplicações",
    "q": "A área sob y=3x² entre x=0 e x=2 é...",
    "o": [
      "12.",
      "4.",
      "8.",
      "6."
    ],
    "a": 2,
    "sol": "∫_0^2 3x²dx=[x³]_0^2=8.",
    "hyp": "Pode esquecer integrar o fator3.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-areas:12-int-areas:parabola",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-007",
    "sourceFile": "content/vnext/math-a/12/12-int-areas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-ID-022",
    "themeId": "12-int",
    "subtopicId": "12-int-integral-definido",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Integral definido",
    "q": "Se f é constante igual a7 em [2,5], o seu valor médio é...",
    "o": [
      "21.",
      "7.",
      "3.",
      "9."
    ],
    "a": 1,
    "sol": "A média de uma função constante é a própria constante.",
    "hyp": "Pode usar integral total21.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-integral-definido:12-int-integral-definido:media-constante",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-ID-022",
    "sourceFile": "content/vnext/math-a/12/12-int-integral-definido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-ID-038",
    "themeId": "12-int",
    "subtopicId": "12-int-integral-definido",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Integral definido",
    "q": "A distância total percorrida quando v muda de sinal é...",
    "o": [
      "|∫v(t)dt| sempre.",
      "∫|v(t)|dt.",
      "∫v'(t)dt.",
      "∫t v(t)dt."
    ],
    "a": 1,
    "sol": "O módulo elimina cancelamentos de direção.",
    "hyp": "Pode usar módulo apenas no resultado final.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-integral-definido:12-int-integral-definido:distancia-total",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-ID-038",
    "sourceFile": "content/vnext/math-a/12/12-int-integral-definido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-ID-006",
    "themeId": "12-int",
    "subtopicId": "12-int-integral-definido",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Integral definido",
    "q": "∫_0^1 1 dx=",
    "o": [
      "0.",
      "1.",
      "1/2.",
      "2."
    ],
    "a": 1,
    "sol": "É a área de um retângulo de base1 e altura1.",
    "hyp": "Pode confundir com média dos limites.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-integral-definido:12-int-integral-definido:constante",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-ID-006",
    "sourceFile": "content/vnext/math-a/12/12-int-integral-definido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-PR-021",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "∫(x²+2x)dx=",
    "o": [
      "x³/3+x²+C.",
      "x³+2x²+C.",
      "2x+2+C.",
      "x²/2+x²+C."
    ],
    "a": 0,
    "sol": "Integra-se termo a termo.",
    "hyp": "Pode esquecer dividir pelo novo expoente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-primitiva:12-int-primitiva:soma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-021",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-PR-037",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "Uma primitiva de 2x/(x²+1) é...",
    "o": [
      "ln(x²+1).",
      "1/(x²+1).",
      "2ln x.",
      "(x²+1)²."
    ],
    "a": 0,
    "sol": "A derivada de ln(x²+1) é2x/(x²+1).",
    "hyp": "Pode não reconhecer a composição.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-primitiva:12-int-primitiva:reconhecimento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-037",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-PR-008",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "Para n≠−1, uma primitiva de x^n é...",
    "o": [
      "n x^{n−1}.",
      "x^{n−1}/(n−1).",
      "x^{n+1}.",
      "x^{n+1}/(n+1)."
    ],
    "a": 3,
    "sol": "É a regra inversa da derivação de potências.",
    "hyp": "Pode aplicar a regra da derivada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-primitiva:12-int-primitiva:formula-potencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-008",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-TP-021",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Primitivas imediatas e propriedades",
    "q": "∫[6x²/(x³+1)]dx=",
    "o": [
      "2ln|x³+1|+C.",
      "ln|x³+1|+C.",
      "6ln|x³+1|+C.",
      "2/(x³+1)+C."
    ],
    "a": 0,
    "sol": "g'=3x²; 6x²=2g'.",
    "hyp": "Pode esquecer o fator2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-tabela-propriedades:12-int-tabela-propriedades:log-composta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-021",
    "sourceFile": "content/vnext/math-a/12/12-int-tabela-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-TP-037",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Primitivas imediatas e propriedades",
    "q": "A igualdade ∫f(x)g(x)dx=∫f dx·∫g dx é...",
    "o": [
      "falsa em geral.",
      "sempre verdadeira.",
      "verdadeira para polinómios.",
      "a regra do produto inversa."
    ],
    "a": 0,
    "sol": "Não existe propriedade multiplicativa simples para primitivas.",
    "hyp": "Pode tentar integrar fatores separadamente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-tabela-propriedades:12-int-tabela-propriedades:produto-falso",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-037",
    "sourceFile": "content/vnext/math-a/12/12-int-tabela-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-TP-006",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Primitivas imediatas e propriedades",
    "q": "∫cos x dx=",
    "o": [
      "−sin x+C.",
      "sin x+C.",
      "cos x+C.",
      "−cos x+C."
    ],
    "a": 1,
    "sol": "(sinx)'=cosx.",
    "hyp": "Pode trocar sinais.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-tabela-propriedades:12-int-tabela-propriedades:trig",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-006",
    "sourceFile": "content/vnext/math-a/12/12-int-tabela-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-TFC-023",
    "themeId": "12-int",
    "subtopicId": "12-int-tfc-barrow",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Teorema Fundamental do Cálculo / Fórmula de Barrow",
    "q": "Se A(x)=∫_1^x (t−2)dt, então A(3)=",
    "o": [
      "1.",
      "−1/2.",
      "0.",
      "2."
    ],
    "a": 2,
    "sol": "Primitiva (t−2)²/2? Melhor: t²/2−2t; em3 dá4,5−6=−1,5; em1 dá0,5−2=−1,5; diferença0.",
    "hyp": "Pode confundir derivada e valor acumulado.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-tfc-barrow:12-int-tfc-barrow:acumulacao-cancelamento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TFC-023",
    "sourceFile": "content/vnext/math-a/12/12-int-tfc-barrow.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-TFC-040",
    "themeId": "12-int",
    "subtopicId": "12-int-tfc-barrow",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Teorema Fundamental do Cálculo / Fórmula de Barrow",
    "q": "O TFC mostra que calcular acumulação por uma integral e calcular variação de uma primitiva são...",
    "o": [
      "operações sem relação.",
      "iguais apenas para constantes.",
      "válidas só para polinómios.",
      "duas perspetivas do mesmo fenómeno."
    ],
    "a": 3,
    "sol": "Integração acumula uma taxa e a primitiva mede a quantidade acumulada.",
    "hyp": "Pode limitar o teorema a funções simples.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-tfc-barrow:12-int-tfc-barrow:significado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TFC-040",
    "sourceFile": "content/vnext/math-a/12/12-int-tfc-barrow.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-TFC-006",
    "themeId": "12-int",
    "subtopicId": "12-int-tfc-barrow",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Teorema Fundamental do Cálculo / Fórmula de Barrow",
    "q": "∫_0^2 x² dx=",
    "o": [
      "4.",
      "8/3.",
      "2.",
      "4/3."
    ],
    "a": 1,
    "sol": "Primitiva x³/3;8/3.",
    "hyp": "Pode usar x²/2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-tfc-barrow:12-int-tfc-barrow:potencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TFC-006",
    "sourceFile": "content/vnext/math-a/12/12-int-tfc-barrow.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-AE-021",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "Se A+X=B, então X=",
    "o": [
      "B−A.",
      "A−B.",
      "A+B.",
      "AB."
    ],
    "a": 0,
    "sol": "Subtrai-se A a ambos os membros.",
    "hyp": "Pode trocar a ordem da subtração.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-adicao-escalar:12-mat-adicao-escalar:equacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-021",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-AE-041",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "A soma de uma matriz simétrica e uma antissimétrica pode ser...",
    "o": [
      "uma matriz geral.",
      "sempre simétrica.",
      "sempre antissimétrica.",
      "sempre nula."
    ],
    "a": 0,
    "sol": "As duas componentes podem coexistir numa matriz arbitrária.",
    "hyp": "Pode pensar que uma propriedade domina a outra.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-adicao-escalar:12-mat-adicao-escalar:decomposicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-041",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-AE-008",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "A−B significa...",
    "o": [
      "B−A.",
      "AB.",
      "A+B.",
      "A+(−B)."
    ],
    "a": 3,
    "sol": "Subtração matricial é soma com o oposto.",
    "hyp": "Pode trocar a ordem.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-adicao-escalar:12-mat-adicao-escalar:subtracao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-008",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-MOD-023",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Modelação e aplicações",
    "q": "Numa rede com matriz de adjacência A=[[0,1],[1,0]], tem-se A²=I. O facto de (A²)_11=1 significa...",
    "o": [
      "há um laço direto no vértice1.",
      "o grau é1 necessariamente por essa entrada.",
      "existe um percurso de comprimento2 do vértice1 para ele próprio.",
      "o vértice1 é isolado."
    ],
    "a": 2,
    "sol": "O percurso é1→2→1.",
    "hyp": "Pode interpretar A² como adjacência direta.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-modelacao:12-mat-modelacao:caminho",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-023",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-MOD-038",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Modelação e aplicações",
    "q": "Uma matriz C pode converter quantidades de produtos em necessidades de matérias-primas. Se q muda, Cq...",
    "o": [
      "permanece igual.",
      "atualiza automaticamente os consumos segundo o modelo linear.",
      "dá sempre preços.",
      "só existe se C for identidade."
    ],
    "a": 1,
    "sol": "O modelo linear combina necessidades por unidade com quantidades.",
    "hyp": "Pode pensar que a matriz é apenas armazenamento de dados sem operação.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-modelacao:12-mat-modelacao:conversao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-038",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-MOD-008",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Modelação e aplicações",
    "q": "Com Q=[[10,20],[15,5]] e p=(2,3)^T, Qp=",
    "o": [
      "(25,25)^T.",
      "(50,60)^T.",
      "(30,20)^T.",
      "(80,45)^T."
    ],
    "a": 3,
    "sol": "1.ª loja:10·2+20·3=80; 2.ª:15·2+5·3=45.",
    "hyp": "Pode somar quantidades sem ponderar pelos preços.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-modelacao:12-mat-modelacao:receita-calculo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-008",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-PRD-023",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "Se A=[[1,2],[0,1]], então A²=",
    "o": [
      "[[1,2],[0,1]].",
      "[[1,0],[0,1]].",
      "[[1,4],[0,1]].",
      "[[2,4],[0,2]]."
    ],
    "a": 2,
    "sol": "A·A dá (1,1)=1, (1,2)=2+2=4, (2,2)=1.",
    "hyp": "Pode elevar cada entrada ao quadrado.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-produto:12-mat-produto:potencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-023",
    "sourceFile": "content/vnext/math-a/12/12-mat-produto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-PRD-037",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "Se A=[[2,0],[0,3]], uma inversa é...",
    "o": [
      "[[1/2,0],[0,1/3]].",
      "[[2,0],[0,3]].",
      "[[-2,0],[0,−3]].",
      "[[3,0],[0,2]]."
    ],
    "a": 0,
    "sol": "O produto das diagonais correspondentes fica 1.",
    "hyp": "Pode trocar ou mudar sinais sem inverter.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-produto:12-mat-produto:inversa-diagonal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-037",
    "sourceFile": "content/vnext/math-a/12/12-mat-produto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-PRD-008",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "Para qualquer matriz A compatível, AI e IA são...",
    "o": [
      "iguais a I.",
      "iguais a 0.",
      "iguais a A^T.",
      "iguais a A."
    ],
    "a": 3,
    "sol": "A identidade é o elemento neutro do produto matricial.",
    "hyp": "Pode confundir com matriz nula.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-produto:12-mat-produto:neutro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-008",
    "sourceFile": "content/vnext/math-a/12/12-mat-produto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-RT-021",
    "themeId": "12-mat",
    "subtopicId": "12-mat-representacao-tipos",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Representação, dimensão, elementos e tipos de matrizes",
    "q": "Se A=[[1,2,3],[4,5,6]], então A^T é...",
    "o": [
      "[[1,4],[2,5],[3,6]].",
      "[[1,2],[3,4],[5,6]].",
      "[[6,5,4],[3,2,1]].",
      "[[1,4,2],[5,3,6]]."
    ],
    "a": 0,
    "sol": "As colunas de A tornam-se linhas da transposta.",
    "hyp": "Pode apenas reorganizar sem respeitar linhas/colunas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-representacao-tipos:12-mat-representacao-tipos:transposta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-RT-021",
    "sourceFile": "content/vnext/math-a/12/12-mat-representacao-tipos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-RT-037",
    "themeId": "12-mat",
    "subtopicId": "12-mat-representacao-tipos",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Compreensão",
    "focus": "Representação, dimensão, elementos e tipos de matrizes",
    "q": "A diagonal secundária de uma matriz n×n contém posições com...",
    "o": [
      "i+j=n+1.",
      "i=j.",
      "i+j=n.",
      "i−j=1."
    ],
    "a": 0,
    "sol": "Em indexação começando em1, os índices somam n+1.",
    "hyp": "Pode usar a regra da diagonal principal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-representacao-tipos:12-mat-representacao-tipos:diagonal-secundaria",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-RT-037",
    "sourceFile": "content/vnext/math-a/12/12-mat-representacao-tipos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-RT-007",
    "themeId": "12-mat",
    "subtopicId": "12-mat-representacao-tipos",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Representação, dimensão, elementos e tipos de matrizes",
    "q": "Uma matriz linha tem...",
    "o": [
      "uma coluna.",
      "duas linhas.",
      "uma linha.",
      "todos os elementos nulos."
    ],
    "a": 2,
    "sol": "É uma matriz 1×n.",
    "hyp": "Pode confundir matriz linha e coluna.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-representacao-tipos:12-mat-representacao-tipos:linha",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-RT-007",
    "sourceFile": "content/vnext/math-a/12/12-mat-representacao-tipos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-TR-022",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Transformações geométricas com matrizes",
    "q": "Para θ=π/2, a matriz de rotação é...",
    "o": [
      "[[0,1],[−1,0]].",
      "[[0,−1],[1,0]].",
      "[[−1,0],[0,−1]].",
      "[[1,0],[0,1]]."
    ],
    "a": 1,
    "sol": "cosπ/2=0 e sinπ/2=1.",
    "hyp": "Pode inverter o sinal do seno.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-transformacoes:12-mat-transformacoes:rotacao-pi2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-022",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-TR-038",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Transformações geométricas com matrizes",
    "q": "Para a mesma R, R⁴=",
    "o": [
      "−I.",
      "I.",
      "R.",
      "0."
    ],
    "a": 1,
    "sol": "Quatro rotações de90° completam360°.",
    "hyp": "Pode confundir com R².",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-transformacoes:12-mat-transformacoes:ciclo-rotacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-038",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-TR-009",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Transformações geométricas com matrizes",
    "q": "A transformação (x,y)→(y,x) é reflexão na reta...",
    "o": [
      "y=x.",
      "y=−x.",
      "x=0.",
      "y=0."
    ],
    "a": 0,
    "sol": "Os pontos da reta y=x ficam fixos.",
    "hyp": "Pode confundir as duas bissetrizes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-transformacoes:12-mat-transformacoes:reflexao-yx",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-009",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PC-023",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Probabilidade condicionada",
    "q": "Se P(A|B)=0, com P(B)>0, então...",
    "o": [
      "P(A)=0 sempre.",
      "P(B)=0.",
      "P(A∩B)=0.",
      "A=B."
    ],
    "a": 2,
    "sol": "A probabilidade da interseção é P(A|B)P(B)=0.",
    "hyp": "Pode concluir que A é globalmente impossível.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-condicionada:12-prob-condicionada:cond0-23",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-023",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PC-041",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Aplicação",
    "focus": "Probabilidade condicionada",
    "q": "De 100 clientes, 40 compraram A, 30 compraram B e 20 compraram ambos. Entre quem comprou B, a percentagem que também comprou A é...",
    "o": [
      "66,7% aproximadamente.",
      "20%.",
      "50%.",
      "30%."
    ],
    "a": 0,
    "sol": "P(A|B)=20/30=2/3≈66,7%.",
    "hyp": "Pode dividir 20 pelo total 100.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-condicionada:12-prob-condicionada:clientes-41",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-041",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PC-019",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Probabilidade condicionada",
    "q": "P(A|B) e P(B|A)...",
    "o": [
      "são sempre iguais.",
      "somam sempre 1.",
      "podem ser diferentes.",
      "são sempre complementares."
    ],
    "a": 2,
    "sol": "Os denominadores são diferentes: P(B) num caso e P(A) no outro.",
    "hyp": "Pode assumir simetria da interseção implica simetria da condicionada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-condicionada:12-prob-condicionada:nao-simetria-19",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-019",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-CI-023",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Tabelas de contingência e independência",
    "q": "Independência significa que...",
    "o": [
      "os acontecimentos nunca ocorrem juntos.",
      "têm a mesma probabilidade.",
      "conhecer a ocorrência de um não altera a probabilidade do outro.",
      "a sua união é certa."
    ],
    "a": 2,
    "sol": "Essa é a interpretação probabilística da independência.",
    "hyp": "Pode confundir independência com incompatibilidade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-contingencia-independencia:12-prob-contingencia-independencia:interpretacao-23",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-023",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-CI-037",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Tabelas de contingência e independência",
    "q": "Uma tabela tem 1000 casos. A ocorre em 400, B em 300 e ambos em 120. O teste de independência dá...",
    "o": [
      "120/1000=(400/1000)(300/1000), logo independência.",
      "120=400+300, logo independência.",
      "400/300=120, logo independência.",
      "dependência porque a interseção não é zero."
    ],
    "a": 0,
    "sol": "0,12=0,4×0,3.",
    "hyp": "Pode exigir interseção zero para independência.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-contingencia-independencia:12-prob-contingencia-independencia:tabela-37",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-037",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-CI-007",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Tabelas de contingência e independência",
    "q": "P(A)=0,3, P(B)=0,2 e P(A∩B)=0,06. Os acontecimentos são...",
    "o": [
      "incompatíveis.",
      "complementares.",
      "independentes.",
      "iguais."
    ],
    "a": 2,
    "sol": "0,3×0,2=0,06.",
    "hyp": "Pode confundir produto pequeno com incompatibilidade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-contingencia-independencia:12-prob-contingencia-independencia:testar-7",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-007",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-FA-021",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "Se A⊂B, então A∪B=...",
    "o": [
      "B.",
      "A.",
      "∅.",
      "A^c."
    ],
    "a": 0,
    "sol": "A não acrescenta elementos fora de B.",
    "hyp": "Pode trocar união e interseção.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-fenomeno-acontecimentos:12-prob-fenomeno-acontecimentos:inclusao-uniao-21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-021",
    "sourceFile": "content/vnext/math-a/12/12-prob-fenomeno-acontecimentos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-FA-043",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "A descrição 'pelo menos um de A ou B ocorre' corresponde a...",
    "o": [
      "A∩B.",
      "(A∪B)^c.",
      "A∪B.",
      "A\\B."
    ],
    "a": 2,
    "sol": "'Pelo menos um' inclui A, B ou ambos.",
    "hyp": "Pode interpretar 'ou' como exclusivo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-fenomeno-acontecimentos:12-prob-fenomeno-acontecimentos:linguagem-pelo-menos-43",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-043",
    "sourceFile": "content/vnext/math-a/12/12-prob-fenomeno-acontecimentos.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-FA-007",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "O acontecimento impossível é representado por...",
    "o": [
      "Ω.",
      "{Ω}.",
      "∅.",
      "1."
    ],
    "a": 2,
    "sol": "Não contém qualquer resultado elementar.",
    "hyp": "Pode trocar acontecimento impossível e certo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-fenomeno-acontecimentos:12-prob-fenomeno-acontecimentos:impossivel-7",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-007",
    "sourceFile": "content/vnext/math-a/12/12-prob-fenomeno-acontecimentos.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-NO-021",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "A regra empírica indica que aproximadamente 68% de uma Normal está em...",
    "o": [
      "[μ−σ, μ+σ].",
      "[μ−2σ, μ+2σ].",
      "[μ−3σ, μ+3σ].",
      "[0,μ]."
    ],
    "a": 0,
    "sol": "Cerca de68% fica a menos de um desvio-padrão da média.",
    "hyp": "Pode trocar as percentagens 68-95-99,7.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-normal:12-prob-normal:68-21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-021",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-NO-037",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "Se X vale0 ou1 com p=0,5, então Var(X)=...",
    "o": [
      "0,25.",
      "0,5.",
      "1.",
      "0."
    ],
    "a": 0,
    "sol": "0,5×0,5=0,25.",
    "hyp": "Pode confundir variância com média.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-normal:12-prob-normal:bernoulli-var-num-37",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-037",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-NO-010",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "Alterar μ mantendo σ desloca a curva...",
    "o": [
      "verticalmente apenas.",
      "horizontalmente, sem alterar a forma.",
      "e altera obrigatoriamente a dispersão.",
      "tornando-a assimétrica."
    ],
    "a": 1,
    "sol": "μ define a localização do centro.",
    "hyp": "Pode confundir localização com escala.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-normal:12-prob-normal:mu-10",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-010",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PA-023",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "P(A)=0,4, P(B|A)=0,5 e P(C|A∩B)=0,3. P(A∩B∩C)=...",
    "o": [
      "0,2.",
      "0,15.",
      "0,06.",
      "0,12."
    ],
    "a": 2,
    "sol": "0,4×0,5×0,3=0,06.",
    "hyp": "Pode somar três probabilidades condicionais.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-produto-arvores:12-prob-produto-arvores:tres-etapas-23",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-023",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PA-046",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "Se 30% entram em loja física e 40% desses compram, P(físico e compra)=...",
    "o": [
      "0,7.",
      "0,12.",
      "0,4.",
      "0,3."
    ],
    "a": 1,
    "sol": "0,3×0,4=0,12.",
    "hyp": "Pode somar percentagens.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-produto-arvores:12-prob-produto-arvores:modelacao-loja-46",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-046",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PA-007",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "Uma moeda equilibrada é lançada 3 vezes. P(CCC)=...",
    "o": [
      "1/6.",
      "3/8.",
      "1/8.",
      "1/3."
    ],
    "a": 2,
    "sol": "(1/2)^3=1/8.",
    "hyp": "Pode usar 3/8 por haver três caras.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-produto-arvores:12-prob-produto-arvores:3-moedas-7",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-007",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PR-023",
    "themeId": "12-prob",
    "subtopicId": "12-prob-propriedades",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Probabilidade e propriedades elementares",
    "q": "Se P(A)=0,7 e P(B)=0,6, então P(A∩B) é pelo menos...",
    "o": [
      "0.",
      "0,1.",
      "0,3.",
      "0,6."
    ],
    "a": 2,
    "sol": "P(A∪B)≤1 =>0,7+0,6−P(A∩B)≤1, logo P(A∩B)≥0,3.",
    "hyp": "Pode assumir interseção zero apesar de a soma ultrapassar 1.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-propriedades:12-prob-propriedades:limite-inter-23",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PR-023",
    "sourceFile": "content/vnext/math-a/12/12-prob-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PR-046",
    "themeId": "12-prob",
    "subtopicId": "12-prob-propriedades",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Probabilidade e propriedades elementares",
    "q": "Numa escola, 60% praticam desporto, 45% música e 25% ambas as atividades. Qual é a percentagem que não pratica nenhuma das duas?",
    "o": [
      "25%.",
      "20%.",
      "80%.",
      "45%."
    ],
    "a": 1,
    "sol": "Complemento de 80%:20%.",
    "hyp": "Pode usar a interseção como nenhum.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-propriedades:12-prob-propriedades:modelacao-nenhum-46",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PR-046",
    "sourceFile": "content/vnext/math-a/12/12-prob-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PR-007",
    "themeId": "12-prob",
    "subtopicId": "12-prob-propriedades",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Probabilidade e propriedades elementares",
    "q": "Se A e B são incompatíveis, então P(A∪B)=...",
    "o": [
      "P(A)P(B).",
      "P(A)+P(B)−1.",
      "P(A)+P(B).",
      "P(A∩B)."
    ],
    "a": 2,
    "sol": "Como P(A∩B)=0, a probabilidade da união é a soma.",
    "hyp": "Pode multiplicar probabilidades por ver dois acontecimentos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-propriedades:12-prob-propriedades:incomp-uniao-7",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PR-007",
    "sourceFile": "content/vnext/math-a/12/12-prob-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PT-023",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "Uma doença afeta 1% da população e um teste dá positivo em 99% dos doentes. Qual é P(doente∩positivo)?",
    "o": [
      "0,99.",
      "0,05.",
      "0,0099.",
      "0,0594."
    ],
    "a": 2,
    "sol": "0,01×0,99=0,0099.",
    "hyp": "Pode usar a taxa de positivos total.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-total:12-prob-total:teste-junta-23",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-023",
    "sourceFile": "content/vnext/math-a/12/12-prob-total.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PT-040",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "Uma média simples das taxas condicionais é correta no teorema da probabilidade total apenas quando...",
    "o": [
      "há dois grupos.",
      "as taxas são diferentes.",
      "os grupos são independentes.",
      "os pesos dos grupos são iguais, ou por coincidência numérica produz o mesmo valor."
    ],
    "a": 3,
    "sol": "A fórmula correta usa pesos P(Ai); com pesos iguais reduz-se à média simples.",
    "hyp": "Pode fazer média simples em qualquer mistura.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-total:12-prob-total:media-simples-40",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-040",
    "sourceFile": "content/vnext/math-a/12/12-prob-total.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PT-007",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "Uma escola tem 40% alunos do 10.º, 35% do 11.º e 25% do 12.º. Taxas de participação:50%,60%,80%. P(participar)=...",
    "o": [
      "0,63.",
      "0,60.",
      "0,61.",
      "0,65."
    ],
    "a": 2,
    "sol": "0,4×0,5+0,35×0,6+0,25×0,8=0,20+0,21+0,20=0,61.",
    "hyp": "Pode fazer média simples das três taxas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-total:12-prob-total:escola-7",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-007",
    "sourceFile": "content/vnext/math-a/12/12-prob-total.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-VD-023",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "Se E(X)=4, então E(3X−2)=...",
    "o": [
      "6.",
      "12.",
      "10.",
      "14."
    ],
    "a": 2,
    "sol": "3×4−2=10.",
    "hyp": "Pode calcular3(4−2).",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-variaveis-discretas:12-prob-variaveis-discretas:linearidade-num-23",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-023",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-VD-044",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "Um prémio paga 100 € com probabilidade 0,01, 10 € com 0,09 e 0 € com 0,90. Se o bilhete custa 2 €, qual é o saldo esperado do jogador?",
    "o": [
      "+1,90€.",
      "−2€.",
      "+0,10€.",
      "−0,10€."
    ],
    "a": 3,
    "sol": "1,90−2=−0,10€.",
    "hyp": "Pode ignorar o custo ou trocar o sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-variaveis-discretas:12-prob-variaveis-discretas:premio-liquido-44",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-044",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-VD-007",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "X assume 0, 1 e 2 com probabilidades 0,2; 0,5; 0,3. Qual é P(X>0)?",
    "o": [
      "0,2.",
      "0,5.",
      "0,8.",
      "0,3."
    ],
    "a": 2,
    "sol": "P(X=1)+P(X=2)=0,5+0,3=0,8.",
    "hyp": "Pode usar o complementar errado.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-variaveis-discretas:12-prob-variaveis-discretas:cauda-7",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-007",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12RAE-BIS-023",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "Como f(1,25)=1,5625−2<0, o novo intervalo passa a...",
    "o": [
      "[1,1,25].",
      "[1,5,2].",
      "[1,25,1,5].",
      "[1,25,2]."
    ],
    "a": 2,
    "sol": "A mudança de sinal é entre1,25 e1,5.",
    "hyp": "Pode escolher o lado com dois valores negativos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-bissecao:12-rae-bissecao:sqrt2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-023",
    "sourceFile": "content/vnext/math-a/12/12-rae-bissecao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12RAE-BIS-042",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "Se a função não muda de sinal no intervalo inicial, a bisseção clássica baseada em Bolzano...",
    "o": [
      "funciona sempre igual.",
      "não tem a sua garantia habitual.",
      "encontra automaticamente raízes duplas.",
      "usa a derivada para compensar."
    ],
    "a": 1,
    "sol": "O invariante de mudança de sinal deixa de estar disponível.",
    "hyp": "Pode achar que qualquer intervalo serve.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-bissecao:12-rae-bissecao:sem-bracket",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-042",
    "sourceFile": "content/vnext/math-a/12/12-rae-bissecao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12RAE-BIS-007",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "Se f(1)<0, f(3)>0 e f(2)>0, o novo intervalo é...",
    "o": [
      "[2,3].",
      "[1,3].",
      "[1,2].",
      "[0,2]."
    ],
    "a": 2,
    "sol": "A mudança de sinal ocorre entre1 e2.",
    "hyp": "Pode escolher a metade errada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-bissecao:12-rae-bissecao:novo-intervalo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-007",
    "sourceFile": "content/vnext/math-a/12/12-rae-bissecao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12RAE-BL-023",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bolzano-localizacao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes",
    "q": "Para f(x)=x³−5, temos f(1)=−4 e f(2)=3. Qual teste seguinte melhora a localização?",
    "o": [
      "avaliar apenas f(10).",
      "calcular f'(0).",
      "avaliar f num ponto entre1 e2, por exemplo1,5.",
      "mudar para um intervalo sem relação."
    ],
    "a": 2,
    "sol": "Testar um ponto interior permite escolher um subintervalo com mudança de sinal.",
    "hyp": "Pode não refinar o intervalo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-bolzano-localizacao:12-rae-bolzano-localizacao:refinamento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BL-023",
    "sourceFile": "content/vnext/math-a/12/12-rae-bolzano-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12RAE-BL-039",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bolzano-localizacao",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes",
    "q": "A amplitude do intervalo ]1,32;1,33[ é...",
    "o": [
      "0,1.",
      "1,325.",
      "0,01.",
      "0,001."
    ],
    "a": 2,
    "sol": "1,33−1,32=0,01.",
    "hyp": "Pode confundir número de casas decimais com amplitude.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-bolzano-localizacao:12-rae-bolzano-localizacao:amplitude",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BL-039",
    "sourceFile": "content/vnext/math-a/12/12-rae-bolzano-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12RAE-BL-008",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bolzano-localizacao",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes",
    "q": "Para f(x)=x³−2, f(1)<0 e f(2)>0. Assim...",
    "o": [
      "a raiz é exatamente1,5.",
      "há duas raízes.",
      "não há raiz.",
      "há pelo menos uma raiz em ]1,2[."
    ],
    "a": 3,
    "sol": "Continuidade e mudança de sinal dão existência.",
    "hyp": "Pode confundir localização com aproximação exata.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-bolzano-localizacao:12-rae-bolzano-localizacao:cubica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BL-008",
    "sourceFile": "content/vnext/math-a/12/12-rae-bolzano-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12RAE-NEW-022",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "Um resíduo |f(x_n)| pequeno garante sempre erro pequeno em x?",
    "o": [
      "Sim, sempre.",
      "Não.",
      "Só se x_n>0.",
      "Só para polinómios."
    ],
    "a": 1,
    "sol": "Se f for muito plana, pequenos resíduos podem corresponder a erros maiores na abcissa.",
    "hyp": "Pode equiparar erro vertical e horizontal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-newton:12-rae-newton:residuo-erro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-022",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12RAE-NEW-037",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "Aplicando Newton a f(x)=(x−1)², obtemos...",
    "o": [
      "x_{n+1}=(x_n+1)/2.",
      "x_{n+1}=1 em um passo sempre.",
      "x_{n+1}=x_n².",
      "x_{n+1}=2x_n−1."
    ],
    "a": 0,
    "sol": "x−(x−1)²/[2(x−1)]=x−(x−1)/2=(x+1)/2.",
    "hyp": "Pode esperar convergência instantânea.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-newton:12-rae-newton:raiz-dupla",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-037",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12RAE-NEW-007",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "Com x0=1 para x²−2=0, x1 é...",
    "o": [
      "1,25.",
      "2.",
      "1,5.",
      "√2 exatamente."
    ],
    "a": 2,
    "sol": "(1+2)/2=1,5.",
    "hyp": "Pode usar o ponto médio [1,2].",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-newton:12-rae-newton:sqrt2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-007",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  }
];
