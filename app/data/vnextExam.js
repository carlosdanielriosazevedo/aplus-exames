// Gerado por scripts/generate-vnext-exam.mjs. Não editar manualmente.
// Três itens originais, independentes e não reservados por submatéria para Mini-exames.
// Permanecem protótipos até revisão pedagógica; productionEligible continua false.
export const VNEXT_EXAM_QUESTIONS=[
  {
    "id": "EX-VN10ELE-BOR-020",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Método de Borda",
    "q": "Se, para os mesmos boletins, a escala 3-2-1 for substituída por 6-4-2, o vencedor muda?",
    "o": [
      "Sim, necessariamente.",
      "Só muda se houver empate.",
      "Muda apenas com número ímpar de eleitores.",
      "Não: todas as pontuações ficam multiplicadas por 2."
    ],
    "a": 3,
    "sol": "6-4-2 é exatamente o dobro de 3-2-1. Multiplicar todas as pontuações por 2 preserva a ordem.",
    "hyp": "Pode não reconhecer que multiplicar todos os pesos pela mesma constante positiva preserva o ranking.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-borda:10-ele-borda:transformacao-escala",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-020",
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
    "id": "EX-VN10ELE-BOR-024",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Método de Borda",
    "q": "Em Borda 3-2-1, entra um novo boletim A > B > C. Que incremento recebem A, B e C, respetivamente?",
    "o": [
      "1,2,3",
      "3,1,2",
      "2,3,1",
      "3,2,1"
    ],
    "a": 3,
    "sol": "O boletim atribui 3 pontos ao primeiro, 2 ao segundo e 1 ao terceiro.",
    "hyp": "Pode inverter a direção da pontuação.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-borda:10-ele-borda:efeito-novo-boletim",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-024",
    "sourceFile": "content/vnext/math-a/10/10-ele-borda.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10ELE-DHO-025",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Método de D'Hondt",
    "q": "Uma distribuição final para 8 mandatos foi registada como A=4, B=3, C=2. O que se conclui imediatamente?",
    "o": [
      "Está errada, porque soma 9 mandatos.",
      "Está correta.",
      "Está errada porque A não pode ter 4.",
      "Só é possível com quatro listas."
    ],
    "a": 0,
    "sol": "4+3+2=9, mas só existem 8 mandatos. Há uma inconsistência independentemente dos votos.",
    "hyp": "Pode validar cada parcela isoladamente sem verificar o total.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-dhondt:10-ele-dhondt:auditar-total-mandatos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-025",
    "sourceFile": "content/vnext/math-a/10/10-ele-dhondt.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10ELE-DHO-050",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Método de D'Hondt",
    "q": "Há 7 mandatos e votos A=4200, B=3100 e C=1700. Qual afirmação resume corretamente a aplicação de D'Hondt?",
    "o": [
      "A recebe 3, B 3 e C 1.",
      "A recebe 4, B 2 e C 1.",
      "A recebe 4, B 1 e C 2.",
      "A recebe 5, B 2 e C 0."
    ],
    "a": 1,
    "sol": "Os 7 maiores quocientes são 4200(A), 3100(B), 2100(A), 1700(C), 1550(B), 1400(A) e 1050(A). Resultado: A=4, B=2, C=1.",
    "hyp": "Pode distribuir lugares por arredondamento intuitivo sem verificar a sequência de quocientes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-dhondt:10-ele-dhondt:modelacao-completa-7",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-050",
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
    "q": "Um regulamento determina que, se ninguém obtiver mais de 50% dos votos válidos, os dois candidatos mais votados passam à segunda volta. Os resultados são A=50%, B=27% e C=23%. Qual é a decisão correta?",
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
    "id": "EX-VN10ELE-STL-018",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Por que deve evitar-se arredondar demasiado cedo quocientes próximos em St. Laguë?",
    "o": [
      "Porque quocientes muito próximos têm obrigatoriamente de ser considerados um empate.",
      "Porque pode alterar artificialmente a ordem dos quocientes.",
      "Porque o número de mandatos depende da soma dos quocientes.",
      "Porque os maiores quocientes devem ser arredondados com menos casas decimais."
    ],
    "a": 1,
    "sol": "A distribuição depende da comparação ordenada dos quocientes; arredondamentos grosseiros podem trocar posições ou criar falsos empates.",
    "hyp": "Pode tratar o arredondamento como irrelevante para comparações próximas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-stlague-comparacao:10-ele-stlague-comparacao:arredondamento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-018",
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
    "q": "Com A=980, B=760, C=460, D=300 e 6 mandatos, qual é o menor quociente entre os seis selecionados em St. Laguë, arredondado às centésimas quando necessário?",
    "o": [
      "300 de D",
      "326,67 de A",
      "253,33 de B",
      "460 de C"
    ],
    "a": 2,
    "sol": "Os seis maiores quocientes são 980 de A, 760 de B, 460 de C, 980÷3 de A, 300 de D e 760÷3 de B. O menor é 760÷3≈253,33.",
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
    "id": "EX-VN10ELE-STL-013",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Uma lista recebeu 2100 votos. Qual é o seu quarto quociente em St. Laguë?",
    "o": [
      "300",
      "420",
      "350",
      "233,33..."
    ],
    "a": 0,
    "sol": "Os divisores são 1,3,5,7; 2100÷7=300.",
    "hyp": "Pode identificar o quarto quociente com divisor 4.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ele-stlague-comparacao:10-ele-stlague-comparacao:quociente-direto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-013",
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
    "q": "Uma escola envia um questionário a todos os alunos, mas só 15% responde. A possibilidade de os alunos que responderam diferirem sistematicamente dos restantes ilustra que risco?",
    "o": [
      "Nenhum, porque todos receberam o questionário.",
      "Enviesamento de não resposta.",
      "Enviesamento de medição causado pelo questionário.",
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
    "id": "EX-VN10EST-AMO-046",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "Uma sondagem seleciona aleatoriamente 1 000 pessoas, mas só 300 respondem. Qual é a amostra efetivamente observada para analisar respostas?",
    "o": [
      "1 000 selecionados.",
      "300 respondentes.",
      "A população inteira.",
      "700 não respondentes."
    ],
    "a": 1,
    "sol": "Os dados de resposta existem para os 300 que responderam; os 700 restantes representam não resposta.",
    "hyp": "Pode confundir amostra selecionada com amostra respondente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-amostragem:10-est-amostragem:selecionados-vs-respondentes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-046",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-AMO-010",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "Uma escola tem 60% de alunos do sexo feminino e 40% masculino. Numa amostra proporcional de 100 alunos, quantos de cada grupo seriam escolhidos?",
    "o": [
      "50 e 50",
      "60 e 40",
      "70 e 30",
      "80 e 20"
    ],
    "a": 1,
    "sol": "Uma amostra proporcional preserva as proporções da população: 60 e 40.",
    "hyp": "Pode impor igualdade em vez de proporcionalidade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-amostragem:10-est-amostragem:estratificada-proporcional",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-010",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-BIV-026",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "Ajustou-se uma reta a um conjunto de pontos. Para cada ponto, calculou-se o resíduo, que é a diferença entre o valor observado de y e o valor previsto pela reta. Se o gráfico dos resíduos em função de x mostra um padrão claramente curvo, o que se pode concluir?",
    "o": [
      "a correlação é necessariamente 1.",
      "uma reta pode não ser o modelo mais adequado.",
      "uma reta descreve bem a relação desde que os resíduos tenham média zero.",
      "não há relação entre as variáveis."
    ],
    "a": 1,
    "sol": "Um padrão sistemático nos resíduos mostra que a diferença entre o observado e o previsto depende de x de forma regular. Isso sugere que a reta deixou por explicar parte da relação entre as variáveis.",
    "hyp": "Pode ignorar evidência de não linearidade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-bivariados-regressao:10-est-bivariados-regressao:residuos-curvatura",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-026",
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
    "id": "EX-VN10EST-BIV-012",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "Os pares (1,8),(2,6),(3,4),(4,2) apresentam...",
    "o": [
      "associação linear positiva perfeita.",
      "sem relação.",
      "uma função constante.",
      "associação linear negativa perfeita."
    ],
    "a": 3,
    "sol": "Todos pertencem a uma reta decrescente y=10−2x.",
    "hyp": "Pode inverter o sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-bivariados-regressao:10-est-bivariados-regressao:padrao-linear-perfeito",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-012",
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
    "q": "Considera os dados ordenados 1, 2, 3, 4, 5, 6, 7 e 8. Usando a mediana das metades, qual é o terceiro quartil Q₃?",
    "o": [
      "5,5",
      "6,5",
      "6",
      "7"
    ],
    "a": 1,
    "sol": "A metade superior é 5, 6, 7 e 8. A mediana dessa metade é a média dos dois valores centrais: (6+7)/2=6,5.",
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
    "id": "EX-VN10EST-DIS-041",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "Se a variância é 0, o que se conclui?",
    "o": [
      "Todos os valores são iguais à média.",
      "A média é 0 obrigatoriamente.",
      "A amostra tem um elemento obrigatoriamente.",
      "A amplitude é positiva."
    ],
    "a": 0,
    "sol": "Quadrados dos desvios só têm média zero se todos os desvios forem zero.",
    "hyp": "Pode confundir ausência de dispersão com nível zero.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-dispersao:10-est-dispersao:variancia-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-041",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-DIS-015",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "Entre dois conjuntos com mesma unidade e média semelhante, o maior desvio padrão indica geralmente...",
    "o": [
      "menor dispersão.",
      "mesma dispersão obrigatoriamente.",
      "maior dispersão.",
      "maior mediana."
    ],
    "a": 2,
    "sol": "Desvio padrão maior significa maior espalhamento típico em torno da média.",
    "hyp": "Pode inverter interpretação.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-dispersao:10-est-dispersao:comparar-desvio-padrao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-015",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-LOC-027",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Medidas de localização",
    "q": "Uma turma de 20 alunos tem média 13. Outra de 30 alunos tem média 15. Qual é a média conjunta?",
    "o": [
      "14",
      "14,5",
      "14,2",
      "14,8"
    ],
    "a": 2,
    "sol": "Soma total=20×13+30×15=710; 710/50=14,2.",
    "hyp": "Pode fazer média simples de 13 e 15 e obter 14.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-localizacao:10-est-localizacao:media-combinada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-027",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-LOC-040",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Medidas de localização",
    "q": "Se a média é muito superior à mediana numa distribuição com alguns valores muito elevados, isso sugere frequentemente...",
    "o": [
      "simetria perfeita.",
      "ausência de variabilidade.",
      "todos os valores iguais.",
      "assimetria à direita."
    ],
    "a": 3,
    "sol": "Valores elevados extremos puxam a média para cima mais do que a mediana.",
    "hyp": "Pode não relacionar medidas de centro com assimetria.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-localizacao:10-est-localizacao:media-mediana-assimetria",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-040",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-LOC-010",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Medidas de localização",
    "q": "Qual é a moda de 2,2,3,3,4,5?",
    "o": [
      "2",
      "2 e 3",
      "3",
      "Não existe moda"
    ],
    "a": 1,
    "sol": "2 e 3 aparecem ambos duas vezes, a frequência máxima.",
    "hyp": "Pode assumir que só pode existir uma moda.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-localizacao:10-est-localizacao:bimodal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-010",
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
    "id": "EX-VN10EST-UNI-040",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Dados univariados e representações",
    "q": "As frequências absolutas são 12,18,30 e 40. Qual é a frequência relativa da terceira categoria?",
    "o": [
      "18%",
      "25%",
      "40%",
      "30%"
    ],
    "a": 3,
    "sol": "Total=100; terceira frequência=30, logo 30%.",
    "hyp": "Pode usar 30/40 em vez do total.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-univariados-representacoes:10-est-univariados-representacoes:freq-relativa-multiplas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-040",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10EST-UNI-015",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Dados univariados e representações",
    "q": "Para os dados 2,2,3,4,4,4,5, qual é a frequência relativa do valor 4?",
    "o": [
      "4/7",
      "3/5",
      "3/7",
      "4/5"
    ],
    "a": 2,
    "sol": "O 4 aparece 3 vezes em 7 observações: 3/7.",
    "hyp": "Pode dividir pelo número de valores distintos em vez do total.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-est-univariados-representacoes:10-est-univariados-representacoes:freq-relativa-fracao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-015",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-BRL-027",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Um trabalhador compara dois meses com o mesmo salário bruto. Num mês, a retenção foi 5%; no outro, 8%, mantendo-se os restantes descontos iguais. Em qual mês o líquido é maior?",
    "o": [
      "No mês com 8%.",
      "É igual.",
      "No mês com 5%.",
      "Não é possível saber mesmo com o bruto igual."
    ],
    "a": 2,
    "sol": "Com tudo o resto igual, uma retenção menor implica menor desconto total e maior líquido.",
    "hyp": "Pode interpretar uma percentagem maior como maior rendimento líquido.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-bruto-liquido:10-fin-bruto-liquido:comparar-retencoes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-027",
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
    "id": "EX-VN10FIN-BRL-009",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Com 1 400 € brutos, 11% de Segurança Social e 6% de retenção sobre o bruto, qual é o salário líquido?",
    "o": [
      "1 162 €",
      "1 122 €",
      "1 182 €",
      "1 238 €"
    ],
    "a": 0,
    "sol": "Descontos=238 €. Líquido=1 400−238=1 162 €.",
    "hyp": "Pode confundir o valor descontado com o valor líquido.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-bruto-liquido:10-fin-bruto-liquido:liquido-duas-taxas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-009",
    "sourceFile": "content/vnext/math-a/10/10-fin-bruto-liquido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-IRS-024",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Numa tabela progressiva, os primeiros 1 000 € são tributados a 10%, os 1 000 € seguintes a 20% e a parcela que excede 2 000 € a 30%. Qual é o rendimento que produz um imposto total de 600 €?",
    "o": [
      "2 500 €",
      "2 800 €",
      "3 200 €",
      "3 000 €"
    ],
    "a": 3,
    "sol": "Até 2 000 € pagam-se 300 €. Faltam 300 €, que a 30% correspondem a 1 000 € adicionais. Total 3 000 €.",
    "hyp": "Pode dividir o imposto inteiro por 30%.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-irs:10-fin-irs:inverter-imposto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-024",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-IRS-050",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Tabela didática: 0% até 800 €, 12% entre 800 € e 1 800 €, 24% acima de 1 800 €. Para rendimento de 2 300 €, qual é o imposto e a taxa efetiva aproximada?",
    "o": [
      "220 € e 9,57%",
      "240 € e 10,43%",
      "260 € e 11,30%",
      "276 € e 12%"
    ],
    "a": 1,
    "sol": "Imposto=120 € + 120 € = 240 €. Taxa efetiva=240/2 300≈10,43%.",
    "hyp": "Pode aplicar 24% ao total ou esquecer a parcela isenta.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-irs:10-fin-irs:modelacao-completa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-050",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-IRS-007",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Numa tabela progressiva, os primeiros 1 000 € são tributados a 10% e a parte acima de 1 000 € até 2 000 € é tributada a 20%. Qual é o imposto sobre um rendimento de 2 000 €?",
    "o": [
      "200 €",
      "250 €",
      "300 €",
      "400 €"
    ],
    "a": 2,
    "sol": "100 € no primeiro escalão + 200 € no segundo = 300 €.",
    "hyp": "Pode usar apenas a taxa do último escalão.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-irs:10-fin-irs:dois-escaloes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-007",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-JC-027",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "Numa aplicação com capitalização mensal, um capital inicial de 1 000 € cresce para 1 020,10 € em dois meses, sem depósitos ou levantamentos. Qual é a taxa de juro mensal?",
    "o": [
      "0,5%",
      "2%",
      "1%",
      "2,01%"
    ],
    "a": 2,
    "sol": "1020,10/1000=1,0201=1,01², logo 1% ao mês.",
    "hyp": "Pode usar 2,01% como taxa mensal em vez de crescimento total.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-juro-composto-credito:10-fin-juro-composto-credito:inverter-taxa-mensal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-027",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-JC-042",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "Num crédito com capitalização composta, taxa de juro positiva constante e sem pagamentos intermédios, por que razão o saldo aumenta mais, em euros, de um período para o seguinte?",
    "o": [
      "Porque a taxa aumenta obrigatoriamente.",
      "Porque a mesma taxa incide sobre uma base crescente.",
      "Porque se aplica a taxa apenas aos juros do período anterior.",
      "Porque se repete em cada período o mesmo valor de juro em euros."
    ],
    "a": 1,
    "sol": "Com taxa constante, a percentagem aplica-se a um montante crescente.",
    "hyp": "Pode atribuir o crescimento absoluto maior a uma taxa variável.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-juro-composto-credito:10-fin-juro-composto-credito:credito-base-crescente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-042",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-JC-008",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "1 500 € a 4% ao ano durante 3 anos. Qual é o montante composto aproximado?",
    "o": [
      "1 680,00 €",
      "1 700,00 €",
      "1 720,50 €",
      "1 687,30 €"
    ],
    "a": 3,
    "sol": "1500×1,04³=1687,296 €, aproximadamente 1687,30 €.",
    "hyp": "Pode usar 12% simples e obter 1680 €.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-juro-composto-credito:10-fin-juro-composto-credito:tres-periodos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-008",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-JS-023",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Juro simples",
    "q": "Um capital atingiu 1 260 € depois de dois anos a 5% ao ano, em regime de juro simples. Qual era o capital inicial, arredondado aos cêntimos?",
    "o": [
      "1 100 €",
      "1 200 €",
      "1 145,45 €",
      "1 230 €"
    ],
    "a": 2,
    "sol": "M=C(1+0,05×2)=1,1C. C=1260/1,1≈1145,45 €.",
    "hyp": "Pode subtrair 10% do montante em vez de dividir pelo fator 1,1.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-juro-simples:10-fin-juro-simples:capital-a-partir-montante",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-023",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-JS-042",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Juro simples",
    "q": "Numa aplicação em regime de juro simples, o montante em euros após t anos é M(t)=2 000+80t. O que representa 80?",
    "o": [
      "O capital inicial.",
      "O juro ganho por ano.",
      "A taxa percentual anual.",
      "O montante após 80 anos."
    ],
    "a": 1,
    "sol": "O coeficiente de t é o acréscimo anual constante em euros.",
    "hyp": "Pode confundir taxa percentual com juro anual em euros.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-juro-simples:10-fin-juro-simples:funcao-afim-declive",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-042",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-JS-011",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Juro simples",
    "q": "3 000 € a 4% ao ano durante 9 meses, em juro simples proporcional ao tempo. Qual é o juro?",
    "o": [
      "60 €",
      "75 €",
      "90 €",
      "120 €"
    ],
    "a": 2,
    "sol": "9 meses=0,75 ano; J=3000×0,04×0,75=90 €.",
    "hyp": "Pode usar 9/10 em vez de 9/12.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-juro-simples:10-fin-juro-simples:meses-fracao-ano",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-011",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-SAL-032",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Um contrato anual de 19 200 € é dividido em 12 pagamentos. Se cada pagamento aumentar 50 €, qual será o novo total anual?",
    "o": [
      "19 250 €",
      "19 600 €",
      "20 400 €",
      "19 800 €"
    ],
    "a": 3,
    "sol": "O aumento anual é 12×50=600 €. Novo total: 19 800 €.",
    "hyp": "Pode adicionar 50 € apenas uma vez ao total anual.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-salarios:10-fin-salarios:aumento-por-prestacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-032",
    "sourceFile": "content/vnext/math-a/10/10-fin-salarios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FIN-SAL-048",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Oferta A: 1 300 € em 12 pagamentos mais um bónus anual fixo de 600 €. Oferta B: 1 150 € em 14 pagamentos sem bónus. Qual tem maior total anual?",
    "o": [
      "B, por 100 €.",
      "A, por 500 €.",
      "São iguais.",
      "A, por 100 €."
    ],
    "a": 3,
    "sol": "A=1 300×12+600=16 200 €. B=1 150×14=16 100 €. A é maior em 100 €.",
    "hyp": "Pode comparar apenas salários base ou esquecer o bónus.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fin-salarios:10-fin-salarios:comparar-com-bonus",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-048",
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
      "negativa em todo o domínio.",
      "decrescente.",
      "positiva em todo o domínio."
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
    "q": "Se a<0 na função afim f(x)=ax+b, a função é...",
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
    "id": "EX-VN10FUN-CR-027",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Conceito de função e representações",
    "q": "No modelo h(t)=100−5t, o valor h(0)=100 representa...",
    "o": [
      "a taxa de variação.",
      "o instante final.",
      "a quantidade inicial.",
      "o domínio inteiro."
    ],
    "a": 2,
    "sol": "No instante zero, a função dá o valor inicial.",
    "hyp": "Pode confundir valor inicial com declive.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-conceito-representacoes:10-fun-conceito-representacoes:interpretar-parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-027",
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
    "q": "Considera as expressões f(x)=(x²−1)/(x−1) e g(x)=x+1, cada uma com o seu domínio real natural. Definem a mesma função?",
    "o": [
      "Não, porque f não está definida em x=1 e g está.",
      "Sim, porque simplificam para a mesma expressão.",
      "Sim, porque os dois domínios excluem x=1.",
      "Não, porque os gráficos só coincidem em x=1."
    ],
    "a": 0,
    "sol": "Se x≠1, podemos cancelar o fator x−1 no numerador e no denominador de f. Então f(x)=x+1 para esses valores. Porém, f não está definida em x=1, ao passo que g(1)=2. Os domínios são diferentes.",
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
    "id": "EX-VN10FUN-CR-019",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Conceito de função e representações",
    "q": "A frase 'a cada número associa-se o seu dobro menos 1' corresponde a...",
    "o": [
      "f(x)=x²−1",
      "f(x)=2(x−1)²",
      "f(x)=2x−1",
      "f(x)=x/2−1"
    ],
    "a": 2,
    "sol": "Dobro de x é 2x; depois subtrai-se 1.",
    "hyp": "Pode aplicar a operação pela ordem errada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-conceito-representacoes:10-fun-conceito-representacoes:descricao-para-formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-019",
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
    "sol": "Como x²≥0, temos x²+2≥2. Qualquer y≥2 é atingido, porque basta tomar x=√(y−2) para obter f(x)=y. Assim, a imagem é [2,+∞[.",
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
    "sol": "A raiz exige x+2≥0, isto é, x≥−2. O denominador exige x−3≠0, logo exclui-se 3, porque é o único valor que o anula. Assim, o domínio é [−2,+∞[ sem o 3.",
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
    "id": "EX-VN10FUN-QUA-024",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "Se uma quadrática com a<0 não tem zeros reais, o gráfico...",
    "o": [
      "fica totalmente acima de Ox.",
      "toca Ox uma vez.",
      "tem sempre dois zeros.",
      "fica totalmente abaixo de Ox."
    ],
    "a": 3,
    "sol": "Com concavidade para baixo e sem zeros, o máximo é negativo.",
    "hyp": "Pode inverter o sinal global.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-quadratica:10-fun-quadratica:sem-zeros-sinal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-024",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-QUA-047",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "Se o vértice de uma parábola com a>0 está exatamente sobre o eixo Ox, então a função tem...",
    "o": [
      "dois zeros distintos.",
      "nenhum zero.",
      "um zero real duplo.",
      "imagem R."
    ],
    "a": 2,
    "sol": "O mínimo é 0 e a parábola toca Ox no vértice.",
    "hyp": "Pode confundir toque com duas interseções.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-quadratica:10-fun-quadratica:vertice-sobre-eixo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-047",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-QUA-018",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "Qual é o valor máximo de f(x)=−(x−4)²+7?",
    "o": [
      "4",
      "7",
      "11",
      "−7"
    ],
    "a": 1,
    "sol": "Como o coeficiente é negativo, máximo no vértice =7.",
    "hyp": "Pode usar a abcissa 4 como máximo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-quadratica:10-fun-quadratica:valor-extremo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-018",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10FUN-TRM-027",
    "themeId": "10-fun",
    "subtopicId": "10-fun-transformacoes-ramos-modulo",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Transformações de gráficos, funções por ramos e módulo",
    "q": "|x−4|≤2 significa que x está...",
    "o": [
      "fora de [2,6].",
      "entre −2 e 2.",
      "entre 2 e 6, inclusive.",
      "acima de 6 apenas."
    ],
    "a": 2,
    "sol": "A distância de x a 4 é no máximo 2: 2≤x≤6.",
    "hyp": "Pode centrar o intervalo em zero.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-fun-transformacoes-ramos-modulo:10-fun-transformacoes-ramos-modulo:inequacao-modulo-centro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-TRM-027",
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
    "sol": "Se x≥−2, então 2x+4≥0 e |2x+4|=2x+4. Se x<−2, então 2x+4<0 e |2x+4|=−(2x+4)=−2x−4.",
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
    "id": "EX-VN10GA-RET-031",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Colinearidade e equações de retas",
    "q": "Para que k os pontos (0,0),(2,4),(3,k) sejam colineares?",
    "o": [
      "4",
      "5",
      "6",
      "8"
    ],
    "a": 2,
    "sol": "A reta pelos dois primeiros é y=2x; para x=3, k=6.",
    "hyp": "Pode usar diferença constante em vez de declive.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-colinearidade-retas:10-ga-colinearidade-retas:colinearidade-parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-031",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-RET-043",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Colinearidade e equações de retas",
    "q": "Se duas retas têm infinitos pontos em comum, então são...",
    "o": [
      "paralelas distintas.",
      "perpendiculares.",
      "coincidentes.",
      "verticais obrigatoriamente."
    ],
    "a": 2,
    "sol": "Duas retas no plano com mais de um ponto comum são a mesma reta.",
    "hyp": "Pode achar que paralelas partilham pontos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-colinearidade-retas:10-ga-colinearidade-retas:coincidentes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-043",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-RET-018",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Colinearidade e equações de retas",
    "q": "Duas retas distintas e não verticais são paralelas quando têm...",
    "o": [
      "declives opostos sempre.",
      "o mesmo declive.",
      "ordenadas na origem iguais.",
      "declives cujo produto é −1."
    ],
    "a": 1,
    "sol": "Uma reta não vertical de declive m tem como vetor diretor (1, m). Se os declives forem iguais, as retas têm a mesma direção e, por serem distintas, são paralelas.",
    "hyp": "Pode confundir paralelismo com perpendicularidade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-colinearidade-retas:10-ga-colinearidade-retas:paralelismo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-018",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-CT-025",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Coordenadas e transformações no plano",
    "q": "Uma rotação de 180° em torno da origem transforma (x,y) em...",
    "o": [
      "(−x,−y).",
      "(−y,x).",
      "(y,−x).",
      "(x,−y)."
    ],
    "a": 0,
    "sol": "Uma meia-volta equivale à simetria central na origem.",
    "hyp": "Pode confundir com rotação de 90°.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-coordenadas-transformacoes:10-ga-coordenadas-transformacoes:rotacao-180",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-025",
    "sourceFile": "content/vnext/math-a/10/10-ga-coordenadas-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-CT-042",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Coordenadas e transformações no plano",
    "q": "Uma homotetia de centro na origem e razão 2 transforma (x,y) em...",
    "o": [
      "(x+2,y+2).",
      "(2x,2y).",
      "(x/2,y/2) sempre.",
      "(−x,−y)."
    ],
    "a": 1,
    "sol": "Uma homotetia de razão 2 duplica as coordenadas relativamente à origem.",
    "hyp": "Pode confundir homotetia com translação.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-coordenadas-transformacoes:10-ga-coordenadas-transformacoes:homotetia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-042",
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
    "id": "EX-VN10GA-DPM-027",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Distâncias e ponto médio",
    "q": "Considera A=(1, 2), B=(5, 4) e P=(x, y). Que conjunto de pontos P é definido pela condição (x−1)²+(y−2)²=(x−5)²+(y−4)²?",
    "o": [
      "a reta AB.",
      "a circunferência de centro A sempre.",
      "a mediatriz de AB.",
      "o eixo Ox."
    ],
    "a": 2,
    "sol": "O primeiro membro é o quadrado da distância de P a A e o segundo é o quadrado da distância de P a B. Como as distâncias são não negativas, a igualdade é equivalente a PA=PB. Como A e B são distintos, o conjunto é a mediatriz de AB.",
    "hyp": "Pode confundir com segmento AB.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-distancias-ponto-medio:10-ga-distancias-ponto-medio:equidistancia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-027",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-DPM-037",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Distâncias e ponto médio",
    "q": "Que valor de k faz a distância entre A=(1,2) e B=(5,k) ser 5, com k>2?",
    "o": [
      "5",
      "3",
      "4",
      "7"
    ],
    "a": 0,
    "sol": "16+(k−2)²=25 => (k−2)²=9; k=5 ou −1. Como k>2, k=5.",
    "hyp": "Pode esquecer a condição adicional.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-distancias-ponto-medio:10-ga-distancias-ponto-medio:distancia-parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-037",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-DPM-010",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Distâncias e ponto médio",
    "q": "A distância entre dois pontos é sempre...",
    "o": [
      "negativa se x diminui.",
      "não negativa.",
      "igual à diferença das abcissas.",
      "um número inteiro."
    ],
    "a": 1,
    "sol": "Distância é um comprimento e não pode ser negativa.",
    "hyp": "Pode conservar sinais das diferenças.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-distancias-ponto-medio:10-ga-distancias-ponto-medio:distancia-nao-negativa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-010",
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
    "id": "EX-VN10GA-ESP-043",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "O vetor posição de P=(−2,5,4) é...",
    "o": [
      "PO=(−2,5,4).",
      "OP=(2,−5,−4).",
      "OP=(−2,5,4).",
      "OP=(5,4,−2)."
    ],
    "a": 2,
    "sol": "Do O ao ponto, as componentes coincidem com as coordenadas.",
    "hyp": "Pode inverter o sentido.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-espaco:10-ga-espaco:vetor-posicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-043",
    "sourceFile": "content/vnext/math-a/10/10-ga-espaco.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-ESP-010",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "O ponto médio de A=(x1,y1,z1) e B=(x2,y2,z2) obtém-se...",
    "o": [
      "subtraindo coordenadas.",
      "fazendo a média de cada par de coordenadas.",
      "somando apenas x e y.",
      "fazendo a média das distâncias à origem."
    ],
    "a": 1,
    "sol": "Cada coordenada do ponto médio é a média das coordenadas correspondentes.",
    "hyp": "Pode esquecer a terceira coordenada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-espaco:10-ga-espaco:ponto-medio-espaco",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-010",
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
    "id": "EX-VN10GA-LG-047",
    "themeId": "10-ga",
    "subtopicId": "10-ga-lugares-geometricos",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica",
    "q": "Uma antena deve ser colocada a igual distância de duas cidades A e B. Sem outras restrições, o conjunto de posições possíveis no plano é...",
    "o": [
      "o segmento AB.",
      "uma circunferência de centro A.",
      "a mediatriz de AB.",
      "o ponto médio apenas."
    ],
    "a": 2,
    "sol": "Todos os pontos da mediatriz satisfazem a condição de equidistância.",
    "hyp": "Pode reduzir um lugar geométrico inteiro a um único ponto.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-lugares-geometricos:10-ga-lugares-geometricos:modelacao-mediatriz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-LG-047",
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
    "id": "EX-VN10GA-VET-027",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Vetores, coordenadas, norma e operações",
    "q": "Qual é a condição necessária e suficiente para que dois vetores não nulos sejam colineares?",
    "o": [
      "têm a mesma norma.",
      "a sua soma é o vetor nulo.",
      "um é múltiplo escalar do outro.",
      "as primeiras componentes são iguais."
    ],
    "a": 2,
    "sol": "Dois vetores não nulos são colineares exatamente quando um é um múltiplo do outro. Os vetores opostos são um caso particular, em que o fator é −1 e a soma é o vetor nulo.",
    "hyp": "Pode confundir mesma norma com mesma direção.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-ga-vetores:10-ga-vetores:colinearidade-vetores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-027",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GA-VET-045",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Vetores, coordenadas, norma e operações",
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
      "exam"
    ],
    "signature": "exam:10-ga-vetores:10-ga-vetores:redimensionar-vetor",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-045",
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
    "sol": "O vetor oposto é −v=(−a, −b), porque v+(−v) é o vetor nulo. Quando v é diferente de zero, a multiplicação por −1 conserva a direção e a norma e inverte o sentido. O vetor nulo é o seu próprio oposto.",
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
    "id": "EX-VN10GS-BAR-027",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Baricentro e propriedades das medianas",
    "q": "Num triângulo equilátero, o baricentro coincide com...",
    "o": [
      "apenas o incentro.",
      "apenas o ortocentro.",
      "circuncentro, incentro e ortocentro.",
      "nenhum outro centro."
    ],
    "a": 2,
    "sol": "A simetria do equilátero faz coincidir todos os centros notáveis.",
    "hyp": "Pode pensar que definições diferentes impedem coincidência.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-baricentro-medianas:10-gs-baricentro-medianas:equilatero-centros",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-027",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-BAR-038",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Baricentro e propriedades das medianas",
    "q": "A área de ABC é 72. G é baricentro e M é ponto médio de BC. Qual é a área de triângulo BGM?",
    "o": [
      "6",
      "12",
      "18",
      "24"
    ],
    "a": 1,
    "sol": "As três medianas formam seis triângulos de igual área: 72/6=12.",
    "hyp": "Pode usar 1/3 ou 1/2 da área.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-baricentro-medianas:10-gs-baricentro-medianas:seis-areas-iguais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-038",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-BAR-007",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Baricentro e propriedades das medianas",
    "q": "Do vértice ao baricentro medem 10 cm. Quanto mede a mediana inteira?",
    "o": [
      "12 cm",
      "18 cm",
      "15 cm",
      "20 cm"
    ],
    "a": 2,
    "sol": "10 corresponde a 2/3 da mediana; total=15.",
    "hyp": "Pode somar metade ou duplicar.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-baricentro-medianas:10-gs-baricentro-medianas:inverter-mediana",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-007",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-CI-024",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Circuncentro e incentro",
    "q": "O raio da circunferência inscrita é igual...",
    "o": [
      "à distância do incentro a qualquer vértice.",
      "ao maior lado do triângulo.",
      "à mediana maior.",
      "à distância perpendicular do incentro a qualquer lado."
    ],
    "a": 3,
    "sol": "A circunferência inscrita é tangente aos três lados, e o raio é perpendicular ao lado no ponto de tangência.",
    "hyp": "Pode usar distância a vértices em vez de lados.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-circuncentro-incentro:10-gs-circuncentro-incentro:raio-inscrita",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-024",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-CI-037",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Circuncentro e incentro",
    "q": "Num triângulo ABC, I é incentro. Se a distância de I a AB é 3 e a distância de I a AC é x+1, qual é x?",
    "o": [
      "2",
      "1",
      "3",
      "4"
    ],
    "a": 0,
    "sol": "As distâncias aos lados são iguais: x+1=3, então x=2.",
    "hyp": "Pode não usar equidistância do incentro.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-circuncentro-incentro:10-gs-circuncentro-incentro:incentro-equacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-037",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-CI-010",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Circuncentro e incentro",
    "q": "Num triângulo retângulo, o circuncentro fica...",
    "o": [
      "no vértice do ângulo reto.",
      "no ponto médio da hipotenusa.",
      "no incentro.",
      "fora do triângulo."
    ],
    "a": 1,
    "sol": "O ponto médio da hipotenusa é equidistante dos três vértices.",
    "hyp": "Pode confundir com ortocentro.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-circuncentro-incentro:10-gs-circuncentro-incentro:circuncentro-retangulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-010",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-E9-026",
    "themeId": "10-gs",
    "subtopicId": "10-gs-euler-nove-pontos",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Localização dos centros, reta de Euler e circunferência dos nove pontos",
    "q": "Num triângulo não equilátero, orienta-se a reta de Euler do circuncentro O para o ortocentro H. As coordenadas de O e H são 0 e 30. Quais são as coordenadas do baricentro G e do centro N da circunferência dos nove pontos?",
    "o": [
      "G=15, N=10",
      "G=10, N=15",
      "G=20, N=15",
      "G=10, N=20"
    ],
    "a": 1,
    "sol": "G pertence ao segmento OH e fica a um terço de OH a partir de O, pelo que a sua coordenada é 30/3=10. N é o ponto médio de OH, pelo que a sua coordenada é (0+30)/2=15.",
    "hyp": "Pode inverter a razão de G ou confundir N com G.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-euler-nove-pontos:10-gs-euler-nove-pontos:coordenadas-euler",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-E9-026",
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
    "q": "Considera um triângulo escaleno não retângulo. Além dos pontos médios dos lados e dos pontos médios dos segmentos do ortocentro aos vértices, que outros pontos pertencem à circunferência dos nove pontos?",
    "o": [
      "os três vértices.",
      "as interseções das medianas com os lados.",
      "os pés das três alturas.",
      "os três pontos de tangência da inscrita sempre."
    ],
    "a": 2,
    "sol": "A terceira família é constituída pelos pés das alturas, isto é, as interseções das alturas com as retas que contêm os respetivos lados opostos.",
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
    "id": "EX-VN10GS-ORT-025",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Ortocentro e alturas",
    "q": "Se o ortocentro coincide com um vértice do triângulo, então o triângulo é...",
    "o": [
      "retângulo.",
      "equilátero.",
      "obtusângulo não retângulo.",
      "necessariamente escaleno."
    ],
    "a": 0,
    "sol": "Se o ortocentro coincide com A, a altura por B passa também por A. A reta AB é então perpendicular a AC. Logo, o triângulo tem um ângulo reto em A.",
    "hyp": "Pode confundir com circuncentro.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-ortocentro:10-gs-ortocentro:classificar-pelo-ortocentro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-025",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-ORT-039",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Ortocentro e alturas",
    "q": "Num triângulo retângulo, se a hipotenusa é 25 e uma projeção de um cateto sobre ela é 9, a outra projeção mede...",
    "o": [
      "9",
      "12",
      "16",
      "25"
    ],
    "a": 2,
    "sol": "As duas projeções somam a hipotenusa: 25−9=16.",
    "hyp": "Pode usar Pitágoras sem necessidade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-ortocentro:10-gs-ortocentro:projecoes-hipotenusa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-039",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-ORT-013",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Ortocentro e alturas",
    "q": "No triângulo ABC, a altura que parte de A intersecta a reta BC em D. Qual é a amplitude do ângulo entre as retas AD e BC?",
    "o": [
      "90°",
      "45°",
      "60°",
      "180°"
    ],
    "a": 0,
    "sol": "Uma altura é perpendicular à reta que contém o lado oposto. Neste caso, AD é perpendicular a BC, pelo que o ângulo entre as duas retas mede 90°.",
    "hyp": "Pode não traduzir perpendicularidade em 90°.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-ortocentro:10-gs-ortocentro:altura-perpendicular",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-013",
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
    "id": "EX-VN10GS-PC-042",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Propriedades geométricas e construções de base",
    "q": "Num triângulo, que ponto se pode localizar construindo com régua e compasso a mediatriz de cada um de dois lados?",
    "o": [
      "um ponto equidistante dos três lados.",
      "um ponto equidistante dos três vértices.",
      "o ponto médio de qualquer altura.",
      "o ponto de interseção das medianas."
    ],
    "a": 1,
    "sol": "A interseção das mediatrizes é equidistante dos três vértices; isso antecipa o circuncentro.",
    "hyp": "Pode confundir equidistância a vértices com equidistância a lados.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-propriedades-construcoes:10-gs-propriedades-construcoes:mediatrizes-intersecao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-042",
    "sourceFile": "content/vnext/math-a/10/10-gs-propriedades-construcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN10GS-PC-016",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Propriedades geométricas e construções de base",
    "q": "Se M é ponto médio de AB e AB=14 cm, então AM mede...",
    "o": [
      "6 cm",
      "8 cm",
      "14 cm",
      "7 cm"
    ],
    "a": 3,
    "sol": "Ponto médio divide o segmento em duas partes iguais: 14/2=7.",
    "hyp": "Pode confundir ponto médio com metade do perímetro.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:10-gs-propriedades-construcoes:10-gs-propriedades-construcoes:ponto-medio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-016",
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
    "cognitive": "Raciocínio",
    "focus": "Taxa instantânea e derivada num ponto",
    "q": "Para f(x)=x², quanto vale o limite do quociente [f(1+h)−f(1)]/h quando h→0?",
    "o": [
      "1",
      "3",
      "2",
      "4"
    ],
    "a": 2,
    "sol": "Para h≠0, o quociente é [(1+h)²−1]/h=2+h. Logo, quando h tende para 0, o limite vale 2.",
    "hyp": "Pode confundir taxa média com derivada, ou substituir incorretamente no quociente incremental.",
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
    "cognitive": "Modelação",
    "focus": "Taxa instantânea e derivada num ponto",
    "q": "A posição de uma partícula é dada por s(t)=2t², com s em metros e t em segundos. Qual é, em m/s, a velocidade instantânea no instante t=4?",
    "o": [
      "18",
      "16",
      "14",
      "4"
    ],
    "a": 1,
    "sol": "A velocidade instantânea é a derivada da posição. Como s′(t)=4t, no instante t=4 resulta s′(4)=16 m/s.",
    "hyp": "Pode confundir taxa média com derivada, ou substituir incorretamente no quociente incremental.",
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
    "cognitive": "Aplicação",
    "focus": "Taxa instantânea e derivada num ponto",
    "q": "Para f(x)=x^2, quanto vale f'(-2)?",
    "o": [
      "-3",
      "-4",
      "-5",
      "-8"
    ],
    "a": 1,
    "sol": "Pela regra da potência, f′(x)=2x. Logo f′(−2)=2×(−2)=−4.",
    "hyp": "Pode confundir taxa média com derivada, ou substituir incorretamente no quociente incremental.",
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
    "id": "EX-VN11CD-FD-044",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "função derivada",
    "q": "Se f′(x)=(x−1)(x+2), o que se pode concluir sobre f em ]−∞,−2[?",
    "o": [
      "f é decrescente",
      "f é constante",
      "não se pode concluir",
      "f é crescente"
    ],
    "a": 3,
    "sol": "Nesse intervalo, x−1<0 e x+2<0. Logo f′(x)>0, e f é crescente em ]−∞,−2[.",
    "hyp": "Pode confundir a função derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-funcao-derivada:11-cd-funcao-derivada:sinal:44",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-044",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-FD-049",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "função derivada",
    "q": "Em cada expressão, C representa uma constante real. Qual das expressões tem derivada 3x²+2?",
    "o": [
      "x^3+2x+C",
      "3x^3+2x+C",
      "x^3+x^2+C",
      "x^2+2x+C"
    ],
    "a": 0,
    "sol": "Ao derivar os termos x³, 2x e C, obtém-se respetivamente 3x², 2 e 0. Portanto, a derivada de x³+2x+C é 3x²+2.",
    "hyp": "Pode confundir a função derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-funcao-derivada:11-cd-funcao-derivada:reconstruir:49",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-049",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-FD-016",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "função derivada",
    "q": "Se f(x)=x^3+x, então f'(x)=",
    "o": [
      "x²+1",
      "3x²+x",
      "3x²",
      "3x^2+1"
    ],
    "a": 3,
    "sol": "A derivada de x³ é 3x² e a de x é 1. Somando, obtém-se f′(x)=3x²+1.",
    "hyp": "Pode confundir a função derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-funcao-derivada:11-cd-funcao-derivada:derivar-polinomio:16",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-016",
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
    "cognitive": "Raciocínio",
    "focus": "Monotonia, extremos e otimização",
    "q": "No intervalo [0,5], quais são o máximo e o mínimo absolutos de f(x)=x²−4x e onde se atingem?",
    "o": [
      "Máximo 5 em x=5 e mínimo 0 em x=0.",
      "Máximo 0 em x=0 e mínimo −4 em x=2.",
      "Máximo 5 em x=5 e mínimo −4 em x=0.",
      "Máximo 5 em x=5 e mínimo −4 em x=2."
    ],
    "a": 3,
    "sol": "A derivada f′(x)=2x−4 anula-se em x=2. Comparam-se o valor nesse ponto e os nas extremidades: f(0)=0, f(2)=−4 e f(5)=5. Máximo 5 em x=5 e mínimo −4 em x=2.",
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
    "id": "EX-VN11CD-MO-050",
    "themeId": "11-cd",
    "subtopicId": "11-cd-monotonia-otimizacao",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Monotonia, extremos e otimização",
    "q": "O que se deve fazer com uma solução de f′(x)=0 que está fora do domínio físico de um problema?",
    "o": [
      "deve ser sempre aceite",
      "deve ser rejeitada como candidata nesse contexto",
      "é automaticamente um máximo",
      "é automaticamente um mínimo"
    ],
    "a": 1,
    "sol": "Apenas os valores admissíveis da variável representam soluções possíveis do problema. Se uma solução de f′(x)=0 está fora do domínio físico, deve ser excluída dos candidatos a extremo.",
    "hyp": "Pode confundir zeros da derivada com extremos garantidos, ou interpretar incorretamente a mudanca de sinal de f'.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-monotonia-otimizacao:11-cd-monotonia-otimizacao:avancado:50",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-MO-050",
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
    "cognitive": "Interpretação",
    "focus": "Monotonia, extremos e otimização",
    "q": "Uma função f derivável em ℝ satisfaz f′(x)=x−3. Que opção indica a monotonia de f de cada lado de x=3 e o tipo de extremo em x=3?",
    "o": [
      "decrescente antes de 3, crescente depois de 3 e mínimo em x=3.",
      "crescente antes de 3, decrescente depois de 3 e máximo em x=3.",
      "decrescente antes de 3, crescente depois de 3 e máximo em x=3.",
      "decrescente antes de 3, decrescente depois de 3 e sem extremo em x=3."
    ],
    "a": 0,
    "sol": "Temos f′(3)=0. Antes de 3, f′ é negativa e depois é positiva. Portanto, f é decrescente antes de 3 e crescente depois de 3, pelo que tem um mínimo em x=3.",
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
    "cognitive": "Aplicação",
    "focus": "Regras de derivação",
    "q": "Usando a regra do produto, deriva f(x)=x(x^2+3).",
    "o": [
      "3x^2-3",
      "x²+3",
      "3x^2+3",
      "2x"
    ],
    "a": 2,
    "sol": "Pela regra do produto, a derivada de x(x²+3) é (x²+3)+2x²=3x²+3.",
    "hyp": "Pode aplicar uma regra de derivação ao objeto errado, esquecer fatores ou confundir produto/quociente com derivação termo a termo.",
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
    "id": "EX-VN11CD-REG-046",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Regras de derivação",
    "q": "Que relação se obtém entre os resultados ao derivar f(x)=x²(x+1) por expansão ou pela regra do produto?",
    "o": [
      "resultados diferentes",
      "o mesmo resultado",
      "apenas a expansão é válida",
      "apenas a regra do produto é válida"
    ],
    "a": 1,
    "sol": "Expandindo, f(x)=x³+x² e f′(x)=3x²+2x. Pela regra do produto, f′(x)=2x(x+1)+x²=3x²+2x. Os dois métodos dão o mesmo resultado.",
    "hyp": "Pode aplicar uma regra de derivação ao objeto errado, esquecer fatores ou confundir produto/quociente com derivação termo a termo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-regras:11-cd-regras:misto:46",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-046",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-REG-017",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Regras de derivação",
    "q": "Deriva f(x)=2x^5-3x^2.",
    "o": [
      "10x^4-6x",
      "5x⁴−2x",
      "10x⁴−3x",
      "10x⁵−6x²"
    ],
    "a": 0,
    "sol": "Pela regra da potência, (2x⁵)′=10x⁴ e (−3x²)′=−6x. Portanto, f′(x)=10x⁴−6x.",
    "hyp": "Pode aplicar uma regra de derivação ao objeto errado, esquecer fatores ou confundir produto/quociente com derivação termo a termo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-regras:11-cd-regras:potencia:17",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-017",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-TAN-037",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Reta tangente e interpretação geométrica",
    "q": "A reta tangente ao gráfico de f no ponto de abcissa 1 é y=−2x+7. Qual é o valor de f′(1)?",
    "o": [
      "-2",
      "5",
      "1",
      "-1"
    ],
    "a": 0,
    "sol": "A derivada no ponto de tangência é o declive dessa reta, dado pelo coeficiente de x. Logo, f′(1)=−2.",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-tangente:11-cd-tangente:ler-declive:37",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-037",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-TAN-043",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Reta tangente e interpretação geométrica",
    "q": "A reta tangente ao gráfico de f no ponto (0,−3) tem declive 4. Qual é a equação da reta perpendicular à tangente que passa por (0,−3)?",
    "o": [
      "y=4x-3",
      "y=-4x-3",
      "y=-(1/4)x-3",
      "x=0"
    ],
    "a": 2,
    "sol": "As duas retas não são verticais, por isso os declives têm produto −1. Como o declive da tangente é 4, o da perpendicular é −1/4. A reta passa por (0,−3), logo tem equação y=−(1/4)x−3.",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-tangente:11-cd-tangente:reta-normal:43",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-043",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-TAN-016",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Reta tangente e interpretação geométrica",
    "q": "Para f(x)=x^3, a tangente em x=1 tem equação",
    "o": [
      "y=3x+1",
      "y=x+3",
      "x=1",
      "y=3x-2"
    ],
    "a": 3,
    "sol": "Para f(x)=x³, f(1)=1 e f′(x)=3x². Logo f′(1)=3, e a reta passa por (1,1) com esse declive. Assim, y−1=3(x−1), ou seja, y=3x−2.",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-tangente:11-cd-tangente:equacao-tangente:16",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-016",
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
    "cognitive": "Modelação",
    "focus": "taxa média de variação",
    "q": "A população passa de 500 indivíduos para 620 indivíduos em 6 anos. Qual é a taxa média de variação, em indivíduos/ano?",
    "o": [
      "20",
      "120",
      "6",
      "620"
    ],
    "a": 0,
    "sol": "Divide-se a variação total pelo tempo decorrido. Assim, (620−500)/6=20 indivíduos/ano.",
    "hyp": "Pode confundir variação total com taxa média ou inverter o quociente.",
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
    "id": "EX-VN11CD-TM-045",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "taxa média de variação",
    "q": "Se f(4)=10 e a taxa média em [4,7] é 5, quanto vale f(7)?",
    "o": [
      "25",
      "26",
      "24",
      "15"
    ],
    "a": 0,
    "sol": "[f(7)-10]/(7-4)=5, logo f(7)=25.",
    "hyp": "Pode confundir variação total com taxa média ou inverter o quociente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-taxa-media:11-cd-taxa-media:inversa:45",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-045",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CD-TM-021",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "taxa média de variação",
    "q": "Para f(x)=2x+3, qual é a taxa média de variação entre x=1 e x=5?",
    "o": [
      "2",
      "3",
      "1",
      "4"
    ],
    "a": 0,
    "sol": "Temos f(1)=5 e f(5)=13. A taxa média é (13−5)/(5−1)=2, igual ao declive da função afim.",
    "hyp": "Pode confundir variação total com taxa média ou inverter o quociente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cd-taxa-media:11-cd-taxa-media:linear:21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-021",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 2,
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
    "q": "Quantos números pares de três algarismos existem?",
    "o": [
      "500.",
      "900.",
      "450.",
      "400."
    ],
    "a": 2,
    "sol": "Há 9 escolhas para o algarismo das centenas, 10 para o das dezenas e 5 escolhas pares (incluindo zero) para o das unidades. O total é 9×10×5=450.",
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
    "q": "Um percurso é construído em duas etapas. O número de opções na segunda depende da escolha efetuada na primeira. Qual é o procedimento correto para contar todos os percursos?",
    "o": [
      "multiplica-se o número de escolhas iniciais pelo maior número de escolhas seguintes.",
      "somam-se as contagens das escolhas seguintes para cada escolha inicial.",
      "somam-se as escolhas da primeira etapa e as do primeiro ramo.",
      "multiplica-se o número de escolhas da primeira etapa pelo menor número de escolhas seguintes."
    ],
    "a": 1,
    "sol": "Fixada uma escolha inicial, cada escolha seguinte completa um percurso. Os percursos de escolhas iniciais diferentes são disjuntos, pelo que se somam os números de percursos de cada ramo.",
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
    "id": "EX-VN11CONT-ARR-025",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Arranjos",
    "q": "Quantos números de 3 algarismos distintos podem ser formados com 0,1,2,3,4, sem zero inicial?",
    "o": [
      "48.",
      "60.",
      "36.",
      "100."
    ],
    "a": 0,
    "sol": "Primeiro: 4 opções (1-4); segundo: 4 restantes incluindo 0; terceiro: 3. Total 48.",
    "hyp": "Pode usar A(5,3)=60 sem excluir zero inicial.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-arranjos:11-cont-arranjos:zero-inicial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-025",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-ARR-049",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Arranjos",
    "q": "Se a ordem deixa de importar num problema originalmente contado por A(n,k), para obter a contagem correta devemos...",
    "o": [
      "dividir por k!.",
      "multiplicar por k!.",
      "dividir por n!.",
      "usar n^k."
    ],
    "a": 0,
    "sol": "Cada conjunto de k elementos foi contado nas k! ordens possíveis.",
    "hyp": "Pode multiplicar e aumentar a duplicação.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-arranjos:11-cont-arranjos:converter-combinacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-049",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-ARR-010",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Arranjos",
    "q": "Se k=n, então A(n,n) é...",
    "o": [
      "1.",
      "n!.",
      "n.",
      "n²."
    ],
    "a": 1,
    "sol": "Escolher e ordenar todos os n elementos é uma permutação.",
    "hyp": "Pode esquecer a ligação entre arranjos e permutações.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-arranjos:11-cont-arranjos:k-igual-n",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-010",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-COMB-024",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Combinações e escolha sem ordem",
    "q": "Quantos apertos de mão ocorrem se 8 pessoas apertarem a mão uma vez a cada outra?",
    "o": [
      "56.",
      "64.",
      "16.",
      "28."
    ],
    "a": 3,
    "sol": "Cada aperto corresponde a um par não ordenado: C(8,2)=28.",
    "hyp": "Pode contar cada aperto duas vezes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-combinacoes:11-cont-combinacoes:apertos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-024",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-COMB-041",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Combinações e escolha sem ordem",
    "q": "De 12 pessoas escolhem-se 5, com A obrigatoriamente incluído e B excluído. Quantas escolhas?",
    "o": [
      "210.",
      "330.",
      "495.",
      "126."
    ],
    "a": 0,
    "sol": "A fixo, B excluído; escolhem-se mais 4 entre 10: C(10,4)=210.",
    "hyp": "Pode escolher 5 entre 10.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-combinacoes:11-cont-combinacoes:inclui-exclui",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-041",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-COMB-011",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Combinações e escolha sem ordem",
    "q": "A identidade de simetria das combinações é...",
    "o": [
      "C(n,k)=C(k,n).",
      "C(n,k)=n−k.",
      "C(n,k)=C(n,n−k).",
      "C(n,k)=k!."
    ],
    "a": 2,
    "sol": "Escolher k elementos equivale a escolher os n−k que ficam de fora.",
    "hyp": "Pode trocar os argumentos sem condição.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-combinacoes:11-cont-combinacoes:simetria",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-011",
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
    "q": "Numa tabela de dupla entrada para pares (i,j), as linhas e as colunas são indexadas pelos mesmos valores na mesma ordem. A que casos corresponde a diagonal principal?",
    "o": [
      "casos em que i≠j.",
      "casos impossíveis sempre.",
      "casos em que i=j.",
      "resultados não ordenados."
    ],
    "a": 2,
    "sol": "Na diagonal, a linha e a coluna ocupam a mesma posição na ordem de índices. Os dois índices coincidem, logo i=j.",
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
    "id": "EX-VN11CONT-DG-040",
    "themeId": "11-cont",
    "subtopicId": "11-cont-diagramas",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Diagramas, tabelas e organização de casos",
    "q": "Numa grelha 6×6 de pares ordenados, quantas células estão estritamente acima da diagonal?",
    "o": [
      "30.",
      "6.",
      "18.",
      "15."
    ],
    "a": 3,
    "sol": "Fora da diagonal há 30; metade fica acima: 15.",
    "hyp": "Pode contar a diagonal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-diagramas:11-cont-diagramas:triangulo-superior",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-DG-040",
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
      "somando o número de folhas dos ramos que saem diretamente da raiz.",
      "fazendo a média dos ramos."
    ],
    "a": 2,
    "sol": "Cada folha representa um resultado final e pertence a exatamente um ramo que sai da raiz. Somar as folhas desses ramos conta cada resultado uma vez.",
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
    "id": "EX-VN11CONT-FAT-027",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Fatorial e contagens elementares",
    "q": "Para um inteiro n≥0, simplifica (n+3)!/(n+1)!.",
    "o": [
      "(n+3)(n+2)(n+1).",
      "n+3.",
      "(n+3)(n+2).",
      "n+2."
    ],
    "a": 2,
    "sol": "Como (n+3)!=(n+3)(n+2)(n+1)!, ao dividir por (n+1)! fica (n+3)(n+2).",
    "hyp": "Pode deixar um fator a mais.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-fatorial:11-cont-fatorial:simplificar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-027",
    "sourceFile": "content/vnext/math-a/11/11-cont-fatorial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11CONT-FAT-050",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Fatorial e contagens elementares",
    "q": "Um algoritmo testa as ordenações de oito itens distintos em que um item específico fica sempre em último lugar. Qual é o número de ordenações a testar?",
    "o": [
      "8!.",
      "7!.",
      "8!−7!.",
      "8!/7!."
    ],
    "a": 1,
    "sol": "O último lugar já está ocupado pelo item fixo. Os outros sete itens podem ocupar as sete primeiras posições em qualquer ordem, pelo que há 7! ordenações.",
    "hyp": "Pode usar potência por confundir posição com repetição.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-cont-fatorial:11-cont-fatorial:modelacao-ordens",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-050",
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
    "q": "Para n∈ℕ e n≥1, vale…",
    "o": [
      "n!=(n−1)!+n.",
      "n!=n+(n−1).",
      "n!=n(n−1)!.",
      "n!=(n−1)!/n."
    ],
    "a": 2,
    "sol": "No produto n!, o primeiro fator é n e o produto dos fatores restantes é (n−1)!. Logo, n!=n(n−1)!.",
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
    "sol": "Bloco ABC com ordem fixa +4 pessoas =5 blocos: 5!=120.",
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
    "q": "Para x≠1 e x≠−3, escreve-se f(x)=(x+2)/[(x−1)(x+3)]=3/[4(x−1)]+1/[4(x+3)]. Para |x| elevado, de que reta horizontal se aproxima o seu gráfico?",
    "o": [
      "y=1.",
      "y=−3.",
      "y=0.",
      "não existe."
    ],
    "a": 2,
    "sol": "Quando |x| cresce, 3/[4(x−1)] e 1/[4(x+3)] aproximam-se de zero. Portanto, f(x) aproxima-se de zero e a reta horizontal é y=0.",
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
    "q": "Reescreve (2x²+3x+1)/(x−1), com x≠1, como soma de uma expressão afim e de uma fração com numerador constante. Qual é o gráfico da parcela afim?",
    "o": [
      "y=2x+1.",
      "y=6.",
      "y=2x+5.",
      "y=2x+6."
    ],
    "a": 2,
    "sol": "Temos 2x²+3x+1=(x−1)(2x+5)+6. A divisão dá 2x+5+6/(x−1), pelo que a parcela afim tem gráfico y=2x+5.",
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
    "id": "EX-VN11FUN-AM-009",
    "themeId": "11-fun",
    "subtopicId": "11-fun-assintotas-modelacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Assíntotas, interpretação e modelação",
    "q": "Se o numerador e o denominador de uma função racional são ambos funções afins não constantes, que relação entre os seus coeficientes determina a ordenada da assíntota horizontal, quando existe?",
    "o": [
      "razão entre os coeficientes dos termos de maior grau.",
      "soma dos coeficientes dos termos de maior grau.",
      "diferença dos graus.",
      "razão dos termos constantes."
    ],
    "a": 0,
    "sol": "Para f(x)=(ax+b)/(cx+d), divide-se por x no numerador e no denominador. Quando |x| cresce, b/x e d/x aproximam-se de zero, pelo que f(x) se aproxima da razão a/c.",
    "hyp": "Pode usar os termos independentes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-assintotas-modelacao:11-fun-assintotas-modelacao:mesmo-grau",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-AM-009",
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
    "sol": "Por ser de grau 3, a função muda de sinal entre os dois extremos do gráfico e é contínua. Tem, assim, pelo menos um zero real e, pelo grau, no máximo três. Por exemplo, x³, x²(x−1) e x(x−1)(x+1) têm respetivamente um, dois e três zeros reais distintos.",
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
    "id": "EX-VN11FUN-CQ-038",
    "themeId": "11-fun",
    "subtopicId": "11-fun-cubicas-quarticas",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Famílias cúbicas/quárticas e comportamento gráfico",
    "q": "Se g é um polinómio mónico de grau 4 com zeros −2 e 3, ambos duplos, qual é a expressão de g(x)?",
    "o": [
      "g(x)=(x−2)²(x+3)².",
      "g(x)=(x+2)²(x−3)².",
      "g(x)=(x+2)(x−3).",
      "g(x)=x⁴−6."
    ],
    "a": 1,
    "sol": "Os fatores (x+2)² e (x−3)² já somam grau 4. Como o coeficiente de x⁴ é 1, conclui-se que g(x)=(x+2)²(x−3)².",
    "hyp": "Pode esquecer as multiplicidades.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-cubicas-quarticas:11-fun-cubicas-quarticas:construir-multiplicidades",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-CQ-038",
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
    "q": "Quando x tende para −∞ e +∞, como se comporta uma função polinomial de grau ímpar cujo coeficiente do termo de maior grau é positivo?",
    "o": [
      "ambos para +∞.",
      "esquerda para −∞ e direita para +∞.",
      "ambos para −∞.",
      "esquerda +∞ e direita −∞."
    ],
    "a": 1,
    "sol": "O termo de maior grau domina quando |x| é grande. Como o expoente é ímpar e o coeficiente é positivo, a função tende para −∞ à esquerda e para +∞ à direita.",
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
    "id": "EX-VN11FUN-DP-028",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Divide x⁴−1 por x−1. O quociente é...",
    "o": [
      "x³−x²+x−1.",
      "x³+1.",
      "x²+1.",
      "x³+x²+x+1."
    ],
    "a": 3,
    "sol": "Diferença de potências: x⁴−1=(x−1)(x³+x²+x+1).",
    "hyp": "Pode alternar sinais incorretamente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-divisao-polinomios:11-fun-divisao-polinomios:x4-menos1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-028",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-DP-037",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Divide x⁴−5x³+5x²+5x−6 por x−1. O quociente é...",
    "o": [
      "x³−4x²+x+6.",
      "x³−5x²+5x+5.",
      "x³−4x²−x+6.",
      "x³+4x²+x−6."
    ],
    "a": 0,
    "sol": "Ruffini com 1: coeficientes 1,−5,5,5,−6 → 1,−4,1,6, resto 0.",
    "hyp": "Pode errar uma das somas intermédias.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-divisao-polinomios:11-fun-divisao-polinomios:ruffini-grau4",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-037",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-DP-018",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Divide 2x³−3x²−8x+12 por x−2. O quociente é...",
    "o": [
      "2x²−7x+6.",
      "2x²+x−6.",
      "2x²+x+6.",
      "x²+x−6."
    ],
    "a": 1,
    "sol": "Ruffini com 2 nos coeficientes 2,−3,−8,12 dá 2,1,−6 e resto 0.",
    "hyp": "Pode errar uma soma intermédia.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-divisao-polinomios:11-fun-divisao-polinomios:ruffini-cubica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-018",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-OP-027",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Operações entre funções",
    "q": "Sejam D_f e D_g os domínios de f e g. Primeiro calcula-se g(x), depois usa-se o resultado como argumento de f. Que condições garantem que as duas avaliações estão definidas?",
    "o": [
      "x∈D_f apenas.",
      "x∈D_f∪D_g.",
      "x∈D_g e g(x)∈D_f.",
      "f(x)∈D_g."
    ],
    "a": 2,
    "sol": "Para calcular g(x), é preciso que x pertença a D_g. Para aplicar f ao resultado, é preciso que g(x) pertença a D_f.",
    "hyp": "Pode inverter a condição.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-operacoes:11-fun-operacoes:criterio-dominio-composicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-027",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-OP-039",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Operações entre funções",
    "q": "Sem restrição x≥0, √(x²) é...",
    "o": [
      "x.",
      "−x.",
      "|x|.",
      "x²."
    ],
    "a": 2,
    "sol": "A raiz quadrada principal devolve o número não negativo cujo quadrado é x². Se x≥0, esse número é x. Se x<0, é −x. Em ambos os casos, é |x|.",
    "hyp": "Pode cancelar quadrado e raiz sem considerar o sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-operacoes:11-fun-operacoes:raiz-quadrado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-039",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-OP-008",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Operações entre funções",
    "q": "Se f(x)=x²−1 e g(x)=x+1, então (f/g)(x) simplifica para...",
    "o": [
      "x−1 para todo x.",
      "x+1.",
      "x²−1.",
      "x−1, com x≠−1."
    ],
    "a": 3,
    "sol": "x²−1=(x−1)(x+1), mas o domínio original exclui x=−1.",
    "hyp": "Pode esquecer a restrição do domínio após simplificar.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-operacoes:11-fun-operacoes:quociente-simplificado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-008",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-RAT-031",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Funções racionais",
    "q": "Para a>0, como se obtém o gráfico de f(x)=1/(x−a) a partir do gráfico de g(x)=1/x?",
    "o": [
      "a unidades na vertical.",
      "a vezes na escala vertical.",
      "a unidades na horizontal.",
      "nenhuma."
    ],
    "a": 2,
    "sol": "Como f(x+a)=g(x) para x≠0, cada ponto (x,g(x)) passa a (x+a,g(x)). É uma translação horizontal de a unidades para a direita.",
    "hyp": "Pode confundir deslocamento horizontal e vertical.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-racionais:11-fun-racionais:transformacao-horizontal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-031",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-RAT-040",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Funções racionais",
    "q": "Resolve (x²−1)/(x−1)=4, respeitando o domínio.",
    "o": [
      "x=1.",
      "x=5.",
      "não tem solução.",
      "x=3."
    ],
    "a": 3,
    "sol": "Para x≠1, a expressão é x+1; x+1=4 => x=3.",
    "hyp": "Pode aceitar x=1 por cancelamento.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-racionais:11-fun-racionais:equacao-com-buraco",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-040",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-RAT-012",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Funções racionais",
    "q": "O domínio de (x²−9)/(x−3) é...",
    "o": [
      "R.",
      "R\\{−3,3}.",
      "R\\{−3}.",
      "R\\{3}."
    ],
    "a": 3,
    "sol": "Só o denominador original x−3 restringe o domínio.",
    "hyp": "Pode excluir também a raiz cancelada do numerador −3.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-racionais:11-fun-racionais:dominio-cancelamento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-012",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-RR-028",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "Um polinómio P de grau 3 tem raízes 1, 2 e 3 e o coeficiente de x³ é 2. Qual é a expressão de P(x)?",
    "o": [
      "P(x)=(x−1)(x−2)(x−3).",
      "P(x)=2(x+1)(x+2)(x+3).",
      "P(x)=x³−6.",
      "P(x)=2(x−1)(x−2)(x−3)."
    ],
    "a": 3,
    "sol": "As três raízes distintas dão os fatores (x−1), (x−2) e (x−3). Como o grau é 3, o produto destes fatores só precisa de ser multiplicado por 2 para ter o coeficiente de x³ indicado.",
    "hyp": "Pode esquecer o coeficiente líder.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-resto-raizes:11-fun-resto-raizes:construir-polinomio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-028",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-RR-041",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "Se P tem raízes −1 e 2, sendo 2 dupla, e coeficiente líder positivo, uma expressão compatível é...",
    "o": [
      "(x+1)(x−2)².",
      "(x−1)(x+2)².",
      "−(x+1)(x−2)².",
      "(x+1)²(x−2)."
    ],
    "a": 0,
    "sol": "Os fatores e multiplicidades correspondem exatamente às raízes indicadas.",
    "hyp": "Pode trocar qual raiz é dupla.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-resto-raizes:11-fun-resto-raizes:construir-multiplicidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-041",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11FUN-RR-010",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "Uma raiz ou zero de P é um número a tal que...",
    "o": [
      "P(a)=1.",
      "P(a)=0.",
      "P(0)=a.",
      "P(a)=a."
    ],
    "a": 1,
    "sol": "É a definição de zero de uma função polinomial.",
    "hyp": "Pode confundir zero com ordenada na origem.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-fun-resto-raizes:11-fun-resto-raizes:definicao-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-010",
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
    "q": "Em que consiste normalizar um vetor não nulo?",
    "o": [
      "multiplicá-lo pela norma.",
      "somar as componentes.",
      "dividi-lo pela sua norma.",
      "torná-lo perpendicular."
    ],
    "a": 2,
    "sol": "Divide-se o vetor pela sua norma, que é positiva. O vetor obtido tem norma 1 e mantém a direção e o sentido do vetor inicial.",
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
    "id": "EX-VN11PE-AN-042",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Produto escalar, norma e ângulo",
    "q": "Se ||u+v||²=||u||²+||v||², então...",
    "o": [
      "u=v.",
      "u·v=0.",
      "u·v=1.",
      "u e v são paralelos."
    ],
    "a": 1,
    "sol": "Expandindo: ||u+v||²=||u||²+2u·v+||v||².",
    "hyp": "Pode não reconhecer a condição de Pitágoras vetorial.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-angulo-norma:11-pe-angulo-norma:pitagoras-vetorial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-042",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-AN-020",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Produto escalar, norma e ângulo",
    "q": "Para qualquer escalar λ, ||λu||=",
    "o": [
      "λ||u|| sempre.",
      "λ²||u||.",
      "||u||+λ.",
      "|λ| ||u||."
    ],
    "a": 3,
    "sol": "A norma é não negativa, por isso entra o módulo de λ.",
    "hyp": "Pode dar norma negativa quando λ<0.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-angulo-norma:11-pe-angulo-norma:norma-escalar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-020",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-DI-024",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Declive e inclinação",
    "q": "À medida que a inclinação α se aproxima de π/2 pela esquerda, tan α...",
    "o": [
      "tende para 0.",
      "tende para −∞.",
      "fica constante.",
      "cresce sem limite."
    ],
    "a": 3,
    "sol": "A tangente cresce e não está definida em π/2.",
    "hyp": "Pode confundir com seno ou cosseno.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-declive-inclinacao:11-pe-declive-inclinacao:tan-perto-pi2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-024",
    "sourceFile": "content/vnext/math-a/11/11-pe-declive-inclinacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-DI-040",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Declive e inclinação",
    "q": "Se tan α=−2 e α∈[0,π[, então...",
    "o": [
      "α está no 1.º quadrante.",
      "α=π/2.",
      "α=0.",
      "α está no 2.º quadrante."
    ],
    "a": 3,
    "sol": "Tangente negativa no intervalo [0,π[ implica 2.º quadrante.",
    "hyp": "Pode permitir um ângulo negativo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-declive-inclinacao:11-pe-declive-inclinacao:quadrante-alpha",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-040",
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
    "id": "EX-VN11PE-DIST-027",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Distâncias em problemas geométricos",
    "q": "A distância da origem ao plano 6x+3y−2z−7=0 é...",
    "o": [
      "7.",
      "7/3.",
      "1.",
      "1/7."
    ],
    "a": 2,
    "sol": "A norma do vetor normal (6,3,−2) é √(36+9+4)=7. O valor absoluto do termo independente é 7, pelo que a distância da origem ao plano é 7/7=1.",
    "hyp": "Pode não reconhecer a norma 7.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-distancias:11-pe-distancias:ponto-plano-triplo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-027",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-DIST-048",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Distâncias em problemas geométricos",
    "q": "Dois pisos paralelos têm equações 2x−2y+z=1 e 2x−2y+z=10. A separação é...",
    "o": [
      "9.",
      "1.",
      "√3.",
      "3."
    ],
    "a": 3,
    "sol": "Diferença 9 dividida pela norma 3 da normal.",
    "hyp": "Pode usar 9 diretamente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-distancias:11-pe-distancias:modelacao-pisos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-048",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-DIST-010",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Distâncias em problemas geométricos",
    "q": "A distância do ponto (2,−3,5) ao plano xOz é...",
    "o": [
      "2.",
      "3.",
      "5.",
      "√38."
    ],
    "a": 1,
    "sol": "O plano xOz é y=0, logo a distância é |−3|=3.",
    "hyp": "Pode esquecer o valor absoluto.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-distancias:11-pe-distancias:distancia-plano-coordenado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-010",
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
    "id": "EX-VN11PE-PERP-047",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Perpendicularidade",
    "q": "Uma viga deve ficar contida no plano x+2y+2z=0. Qual dos vetores pode dar a direção da viga?",
    "o": [
      "(1,2,2).",
      "(2,4,4).",
      "(2,−1,0).",
      "(0,1,1)."
    ],
    "a": 2,
    "sol": "A direção da viga é perpendicular à normal (1,2,2) do plano. Para (2,−1,0), o produto escalar com a normal é 2−2+0=0, portanto essa direção é possível.",
    "hyp": "Pode usar a normal como direção da viga.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-perpendicularidade:11-pe-perpendicularidade:modelacao-viga",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-047",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-PERP-013",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Perpendicularidade",
    "q": "Qual das retas seguintes é perpendicular à reta de equação y=4?",
    "o": [
      "x=2.",
      "y=−1.",
      "y=x.",
      "y=4x."
    ],
    "a": 0,
    "sol": "A reta y=4 é horizontal; qualquer reta vertical, como x=2, é-lhe perpendicular.",
    "hyp": "Pode escolher outra reta horizontal por confundir paralelismo com perpendicularidade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-perpendicularidade:11-pe-perpendicularidade:horizontal-vertical",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-013",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-PC-028",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Produto escalar por coordenadas",
    "q": "O vetor (−b,a) resulta de (a,b), geometricamente, por...",
    "o": [
      "uma rotação de 180°.",
      "uma reflexão em Ox.",
      "uma homotetia de razão 2.",
      "uma rotação de 90° anti-horária."
    ],
    "a": 3,
    "sol": "A regra (a,b)→(−b,a) é uma rotação de 90° anti-horária.",
    "hyp": "Pode confundir rotação com reflexão.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-produto-coordenadas:11-pe-produto-coordenadas:rotacao-90",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-028",
    "sourceFile": "content/vnext/math-a/11/11-pe-produto-coordenadas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-PC-044",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Produto escalar por coordenadas",
    "q": "Se u=(4,−3) e e=(1,0), então u·e=",
    "o": [
      "−3.",
      "5.",
      "1.",
      "4."
    ],
    "a": 3,
    "sol": "Como e=(1,0), temos u·e=4×1+(−3)×0=4. O produto escalar com e dá a componente horizontal de u.",
    "hyp": "Pode usar a norma.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-produto-coordenadas:11-pe-produto-coordenadas:componente-horizontal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-044",
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
      "ad − be+cf.",
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
    "id": "EX-VN11PE-RP-029",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "Sejam v um vetor diretor de uma reta e n um vetor normal a um plano. O ângulo β entre a reta e o plano é complementar do ângulo entre as direções de v e n tomado em [0,π/2]. Qual das seguintes igualdades é válida?",
    "o": [
      "sinβ=|v·n|/(||v||||n||).",
      "cosβ=|v·n|/(||v||||n||).",
      "sinβ=|v·n|/(||v||+||n||).",
      "sinβ=1−|v·n|/(||v||||n||)."
    ],
    "a": 0,
    "sol": "O seno de β é o cosseno do ângulo entre a direção da reta e a direção normal ao plano tomado em [0,π/2]. Pelo produto escalar, esse cosseno é |v·n|/(‖v‖‖n‖).",
    "hyp": "Pode confundir com a fórmula entre dois vetores.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-retas-planos:11-pe-retas-planos:formula-reta-plano",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-029",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-RP-038",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "A reta r tem vetor diretor (1,2,−1) e o plano α tem vetor normal (2,−1,0). Sem conhecer um ponto de r, o que se pode concluir?",
    "o": [
      "A direção de r é paralela a α e r tem de estar contida em α.",
      "A direção de r é paralela a α e r pode estar contida em α.",
      "A direção de r é paralela a α e r tem de ser exterior a α.",
      "A direção de r é perpendicular a α e r interseta α."
    ],
    "a": 1,
    "sol": "O produto escalar entre o vetor diretor e o normal é 1×2+2×(−1)+(−1)×0=0. Assim, a direção de r é paralela ao plano. Dependendo de um ponto de r, ela pode estar contida no plano ou ser-lhe exterior.",
    "hyp": "Pode confundir produto zero com perpendicularidade reta-plano.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-retas-planos:11-pe-retas-planos:reta-paralela-plano",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-038",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11PE-RP-015",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "Os planos x=0 e y=0 são...",
    "o": [
      "paralelos.",
      "coincidentes.",
      "perpendiculares.",
      "reversos."
    ],
    "a": 2,
    "sol": "Normais (1,0,0) e (0,1,0) são perpendiculares.",
    "hyp": "Pode achar que planos coordenados são sempre paralelos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-pe-retas-planos:11-pe-retas-planos:planos-coordenados",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-015",
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
    "id": "EX-VN11SUC-MC-019",
    "themeId": "11-suc",
    "subtopicId": "11-suc-modelacao-comportamento",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Modelação",
    "focus": "Comportamento e modelação com sucessões",
    "q": "Uma bateria retém 90% da carga anterior em cada ciclo. A carga antes do primeiro ciclo é u_1=100. Qual é a expressão do termo geral u_n?",
    "o": [
      "u_n=100−10(n−1).",
      "u_n=90n.",
      "u_n=100·0,9^{n−1}.",
      "u_n=100·1,1^{n−1}."
    ],
    "a": 2,
    "sol": "Reter 90% significa multiplicar por 0,9 a cada ciclo. Para passar de u_1 a u_n há n−1 ciclos, logo u_n=100·0,9^{n−1}.",
    "hyp": "Pode subtrair sempre 10 pontos percentuais.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-modelacao-comportamento:11-suc-modelacao-comportamento:retencao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-MC-019",
    "sourceFile": "content/vnext/math-a/11/11-suc-modelacao-comportamento.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-PA-026",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Progressões aritméticas",
    "q": "Numa PA, u_2+u_6 é igual a...",
    "o": [
      "u_8.",
      "2u_4.",
      "u_4.",
      "4u_2."
    ],
    "a": 1,
    "sol": "Os índices 2 e 6 são simétricos em torno de 4, logo a soma é 2u_4.",
    "hyp": "Pode achar que só termos consecutivos têm relação média.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-pa:11-suc-pa:simetria-indices",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-026",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-PA-050",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Progressões aritméticas",
    "q": "Um reservatório contém 100 L no instante n=1 e perde 2,5 L por hora até esvaziar. Para n inteiro, com 1≤n≤41, que expressão dá o volume u_n ao fim de n−1 horas?",
    "o": [
      "u_n=100·2,5^{n−1}.",
      "u_n=100−2,5(n−1).",
      "u_n=100−2,5n.",
      "u_n=100+2,5(n−1)."
    ],
    "a": 1,
    "sol": "O primeiro valor é 100 L e a cada hora há uma variação de −2,5 L. Ao fim de n−1 horas, u_n=100−2,5(n−1), que se anula em n=41.",
    "hyp": "Pode usar um modelo multiplicativo ou deslocar mal o índice.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-pa:11-suc-pa:modelacao-perda",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-050",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-PA-016",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Progressões aritméticas",
    "q": "Numa PA, o termo médio de três termos consecutivos a,b,c satisfaz...",
    "o": [
      "b=a+c.",
      "b=ac.",
      "b=√(ac).",
      "b=(a+c)/2."
    ],
    "a": 3,
    "sol": "Como as diferenças são iguais, 2b=a+c.",
    "hyp": "Pode confundir média aritmética com geométrica.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-pa:11-suc-pa:media-aritmetica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-016",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-PG-025",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Progressões geométricas",
    "q": "Se u_5=16 e q=1/2, então u_2=",
    "o": [
      "128.",
      "64.",
      "32.",
      "8."
    ],
    "a": 0,
    "sol": "De u_2 a u_5 há 3 multiplicações por 1/2: u_5=u_2/8, logo u_2=128.",
    "hyp": "Pode multiplicar em vez de dividir ao recuar.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-pg:11-suc-pg:recuar-termos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-025",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-PG-050",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Progressões geométricas",
    "q": "Num modelo de compressões sucessivas, o tamanho de um ficheiro é reduzido a metade a cada compressão. Antes da primeira compressão, u_1=80 MB. Qual é o termo geral u_n?",
    "o": [
      "u_n=80−(n−1)/2.",
      "u_n=80·(1/2)^{n−1}.",
      "u_n=40n.",
      "u_n=80·2^{n−1}."
    ],
    "a": 1,
    "sol": "De u_1 até u_n são feitas n−1 compressões, cada uma multiplicando o tamanho por 1/2. Assim, u_n=80·(1/2)^{n−1}.",
    "hyp": "Pode modelar uma perda absoluta em vez de proporcional.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-pg:11-suc-pg:modelacao-compressao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-050",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-PG-012",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Progressões geométricas",
    "q": "Qual é o 5.º termo da PG 3,−6,12,−24,...?",
    "o": [
      "−48.",
      "24.",
      "−96.",
      "48."
    ],
    "a": 3,
    "sol": "A razão é −2; o 5.º termo é (−24)(−2)=48.",
    "hyp": "Pode perder a alternância de sinal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-pg:11-suc-pg:razao-negativa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-012",
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
    "sol": "Numa progressão aritmética, os termos à mesma distância do centro têm desvios opostos em relação a esse termo. A média dos 11 termos é, portanto, 20, e a soma é 11×20=220.",
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
    "id": "EX-VN11SUC-TR-048",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "Um capital começa em 500 € e aumenta 5% por período. Uma recorrência adequada é...",
    "o": [
      "C_{n+1}=C_n+0,05.",
      "C_{n+1}=5C_n.",
      "C_n=500+5n.",
      "C_1=500, C_{n+1}=1,05C_n."
    ],
    "a": 3,
    "sol": "Aumentar 5% significa multiplicar por 1,05.",
    "hyp": "Pode somar 0,05 € em vez de 5%.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-termo-recorrencia:11-suc-termo-recorrencia:modelacao-percentagem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-048",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11SUC-TR-015",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "A sucessão u_n=(−1)^n é...",
    "o": [
      "crescente.",
      "sempre positiva.",
      "alternada entre 1 e −1.",
      "convergente para 0."
    ],
    "a": 2,
    "sol": "O sinal alterna com a paridade de n.",
    "hyp": "Pode supor que potência grande faz tender a 0.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-suc-termo-recorrencia:11-suc-termo-recorrencia:alternancia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-015",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-AR-025",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "O comprimento de um arco de raio r e amplitude θ em radianos é...",
    "o": [
      "s=rθ.",
      "s=2πrθ.",
      "s=r/θ.",
      "s=θ/r."
    ],
    "a": 0,
    "sol": "A definição de radiano conduz diretamente a s=rθ.",
    "hyp": "Pode usar a fórmula apenas válida para graus sem conversão.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-angulos-radianos:11-trig-angulos-radianos:comprimento-arco",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-025",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-AR-040",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "Um setor de raio 5 ocupa 20% da área do círculo. Qual é o seu ângulo ao centro?",
    "o": [
      "π/5",
      "4π/5",
      "π/2",
      "2π/5"
    ],
    "a": 3,
    "sol": "20% de uma volta corresponde a 0,2×2π=2π/5.",
    "hyp": "Pode usar 20% de π.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-angulos-radianos:11-trig-angulos-radianos:setor-percentagem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-040",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-AR-016",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "Um ângulo orientado positivo mede-se, por convenção, no sentido...",
    "o": [
      "horário a partir do lado inicial.",
      "anti-horário só no 1.º quadrante.",
      "horário para amplitudes até 180°.",
      "anti-horário a partir do lado inicial."
    ],
    "a": 3,
    "sol": "A convenção usual toma o sentido anti-horário como positivo.",
    "hyp": "Pode inverter a convenção.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-angulos-radianos:11-trig-angulos-radianos:angulo-orientado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-016",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-CIR-029",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Círculo trigonométrico e redução",
    "q": "Se sen θ=√2/2 e θ∈[0,2π[, então θ pode ser...",
    "o": [
      "π/4 ou 3π/4.",
      "π/4 ou 7π/4.",
      "3π/4 ou 5π/4.",
      "π/2 apenas."
    ],
    "a": 0,
    "sol": "Seno positivo nos quadrantes I e II, referência π/4.",
    "hyp": "Pode usar quadrantes do cosseno.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-circulo:11-trig-circulo:preimagens-sin",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-029",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-CIR-045",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Círculo trigonométrico e redução",
    "q": "Os ângulos α e 2π−α, com α no 1.º quadrante, têm...",
    "o": [
      "o mesmo cosseno e senos opostos.",
      "o mesmo seno e cossenos opostos.",
      "seno e cosseno iguais.",
      "ambos seno e cosseno opostos."
    ],
    "a": 0,
    "sol": "São simétricos relativamente ao eixo Ox.",
    "hyp": "Pode confundir o eixo de simetria.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-circulo:11-trig-circulo:simetria-quadrantes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-045",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-CIR-017",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Círculo trigonométrico e redução",
    "q": "O ângulo de referência de 5π/6 é...",
    "o": [
      "π/6.",
      "π/3.",
      "5π/6.",
      "π/2."
    ],
    "a": 0,
    "sol": "No 2.º quadrante, referência=π−5π/6=π/6.",
    "hyp": "Pode usar o próprio ângulo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-circulo:11-trig-circulo:angulo-referencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-017",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-EQ-029",
    "themeId": "11-trig",
    "subtopicId": "11-trig-equacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Equações trigonométricas",
    "q": "Resolve sen x=cos x em [0,2π[.",
    "o": [
      "π/4 e 5π/4.",
      "π/4 e 3π/4.",
      "π/2 e 3π/2.",
      "0 e π."
    ],
    "a": 0,
    "sol": "Se cos x=0, então sen x=±1, logo os dois valores não são iguais. Nos restantes pontos, dividir por cos x dá tg x=1. Em [0,2π[, as soluções são π/4 e 5π/4.",
    "hyp": "Pode dividir por cos sem verificar, embora aqui os excluídos não sejam soluções.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-equacoes:11-trig-equacoes:sin-igual-cos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-EQ-029",
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
    "q": "Ao dividir uma equação por sen x, que cuidado é necessário?",
    "o": [
      "Pode criar sempre soluções com sen x=0.",
      "Pode perder soluções com sen x=0.",
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
    "q": "No modelo periódico y=A sen(Bx+C)+D, com A≠0 e B≠0, o que representa |A|?",
    "o": [
      "o período.",
      "a amplitude.",
      "a fase.",
      "o valor médio."
    ],
    "a": 1,
    "sol": "Como o seno percorre [−1,1], o máximo é D+|A| e o mínimo é D−|A|. A amplitude é metade da diferença entre esses extremos, ou seja, |A|.",
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
    "id": "EX-VN11TRIG-FUN-042",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Funções seno e cosseno",
    "q": "Qual é a menor translação horizontal para a direita que transforma o gráfico de y=2 sen(3x)+1 no gráfico de y=2 sen(3x−π)+1?",
    "o": [
      "π para a direita.",
      "π/3 para a direita.",
      "π/6 para a direita.",
      "2π/3 para a direita."
    ],
    "a": 1,
    "sol": "Como 3x−π=3(x−π/3), transladar π/3 para a direita dá o gráfico. O período fundamental do modelo é 2π/3. Os deslocamentos equivalentes diferem por múltiplos de 2π/3, pelo que π/3 é o menor positivo.",
    "hyp": "Pode usar C diretamente sem dividir por B.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-funcoes:11-trig-funcoes:fase",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-042",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-FUN-014",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Funções seno e cosseno",
    "q": "Qual é a imagem de y=2cos x?",
    "o": [
      "[−1,1].",
      "[−2,2].",
      "[0,2].",
      "ℝ."
    ],
    "a": 1,
    "sol": "Multiplicar por 2 duplica os valores extremos.",
    "hyp": "Pode esquecer a escala vertical.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-funcoes:11-trig-funcoes:imagem-escalada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-014",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-MOD-026",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Num triângulo com lados 5, 6 e 7, C é o ângulo oposto ao lado 7. Usa a relação 7²=5²+6²−2×5×6 cos C para calcular cos C.",
    "o": [
      "−1/5",
      "1/5",
      "3/5",
      "1/2"
    ],
    "a": 1,
    "sol": "Efetuando as potências e o produto, 49=25+36−60 cos C. Daqui resulta 60 cos C=12, portanto cos C=1/5.",
    "hyp": "Pode mover termos com sinal errado.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-modelacao:11-trig-modelacao:achar-angulo-cossenos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-026",
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
    "q": "Num triângulo ABC, AB=100 e os ângulos internos em A, B e C medem 45°, 60° e 75°. O quociente entre o comprimento de um lado e o seno do ângulo oposto é constante. Qual é a expressão do comprimento de AC?",
    "o": [
      "100 sen 60°/sen 75°",
      "100 sen 75°/sen 60°",
      "100 cos 60°/cos 75°",
      "100 tg 60°"
    ],
    "a": 0,
    "sol": "O lado AC é oposto ao ângulo de 60° e o lado AB é oposto ao ângulo de 75°. Portanto, AC/sen 60°=100/sen 75° e AC=100 sen 60°/sen 75°.",
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
    "id": "EX-VN11TRIG-MOD-011",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Num triângulo acutângulo ABC, a, b e c são os comprimentos dos lados opostos aos ângulos A, B e C. Ao exprimir a altura a partir de C pelos ângulos A e B, e a altura a partir de A pelos ângulos B e C, que relação se obtém?",
    "o": [
      "a cos A=b cos B=c cos C.",
      "a²+b²=c² sempre.",
      "a/sen A=b/sen B=c/sen C.",
      "sen A+sen B=sen C."
    ],
    "a": 2,
    "sol": "A altura a partir de C é b sen A ou a sen B, logo a/sen A=b/sen B. A altura a partir de A é c sen B ou b sen C, logo b/sen B=c/sen C. Assim, a/sen A=b/sen B=c/sen C.",
    "hyp": "Pode confundir com Lei dos Cossenos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-modelacao:11-trig-modelacao:lei-senos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-011",
    "sourceFile": "content/vnext/math-a/11/11-trig-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-REL-030",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "Se tg x=−√3 e x está no 2.º quadrante, então cos x=",
    "o": [
      "1/2",
      "−1/2",
      "−√3/2",
      "√3/2"
    ],
    "a": 1,
    "sol": "Ângulo de referência π/3; no 2.º quadrante cos<0.",
    "hyp": "Pode trocar seno e cosseno.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-relacoes:11-trig-relacoes:tan-notavel-quadrante",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-030",
    "sourceFile": "content/vnext/math-a/11/11-trig-relacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN11TRIG-REL-045",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "A identidade sen² x+cos² x=1 implica que o ponto (cos x,sen x)...",
    "o": [
      "pertence ao círculo unitário.",
      "pertence sempre à reta y=x.",
      "tem norma 2.",
      "fica sempre no 1.º quadrante."
    ],
    "a": 0,
    "sol": "x²+y²=1 é a equação do círculo unitário.",
    "hyp": "Pode não ligar a identidade à geometria.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:11-trig-relacoes:11-trig-relacoes:interpretacao-geometrica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-045",
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
    "q": "Se cos x=−3/5 e x está no 2.º quadrante, então sen x=",
    "o": [
      "−4/5",
      "3/4",
      "4/5",
      "−3/4"
    ],
    "a": 2,
    "sol": "sen² x=1−9/25=16/25 e no 2.º quadrante sen>0.",
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
    "id": "EX-VN12CPLX-AG-027",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "O ponto médio de z1 e z2 pode escrever-se como...",
    "o": [
      "z1−z2.",
      "z1z2.",
      "(z1+z2)/2.",
      "|z1−z2|."
    ],
    "a": 2,
    "sol": "A média complexa faz a média de ambas as coordenadas.",
    "hyp": "Pode confundir vetor com ponto médio.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-argand:12-cplx-argand:ponto-medio-formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-027",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-AG-037",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "Se conj designa o conjugado, a condição |z−(1+i)|=|conj(z)+(1+i)| é equivalente a...",
    "o": [
      "Re(z)=0.",
      "Im(z)=0.",
      "|z|=1.",
      "Re(z)=1."
    ],
    "a": 0,
    "sol": "O módulo do conjugado é igual ao módulo original, pelo que |conj(z)+(1+i)|=|z+(1−i)|. Os afixos 1+i e −1+i têm a mesma ordenada e são simétricos em relação ao eixo imaginário. A sua mediatriz é Re(z)=0.",
    "hyp": "Pode escolher o eixo que contém ±1.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-argand:12-cplx-argand:mediatriz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-037",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-AG-012",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "A distância entre os pontos z1 e z2 é...",
    "o": [
      "|z1+z2|.",
      "|z1||z2|.",
      "Re(z1−z2).",
      "|z1−z2|."
    ],
    "a": 3,
    "sol": "A diferença representa o vetor entre os pontos.",
    "hyp": "Pode usar a soma.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-argand:12-cplx-argand:distancia-dois-pontos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-012",
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
    "id": "EX-VN12CPLX-CM-050",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Conjugado e módulo",
    "q": "Se z=a+bi e |z|²=Re(z)²+Im(z)², então esta identidade é...",
    "o": [
      "verdadeira só para reais.",
      "verdadeira para todo z.",
      "verdadeira só para imaginários puros.",
      "falsa."
    ],
    "a": 1,
    "sol": "É exatamente a definição do módulo ao quadrado.",
    "hyp": "Pode achar que exige uma das partes nula.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-conjugado-modulo:12-cplx-conjugado-modulo:identidade-modulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-050",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-CM-010",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Conjugado e módulo",
    "q": "|z|=0 se e só se...",
    "o": [
      "Re(z)=0.",
      "z=0.",
      "Im(z)=0.",
      "z é real."
    ],
    "a": 1,
    "sol": "Só a origem está a distância zero da origem.",
    "hyp": "Pode confundir uma componente nula com o número nulo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-conjugado-modulo:12-cplx-conjugado-modulo:modulo-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-010",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-FA-025",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "A condição Re(z)=3 descreve, na forma z=x+yi...",
    "o": [
      "todos os complexos 3+yi.",
      "apenas z=3.",
      "todos os yi.",
      "os complexos de módulo 3."
    ],
    "a": 0,
    "sol": "A parte real está fixa e a imaginária é livre.",
    "hyp": "Pode reduzir uma condição a um único número.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-forma-algebrica:12-cplx-forma-algebrica:condicao-real",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-025",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-FA-038",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "Seja m real. Para que valor de m tem z=(m+2)+(m²−4)i parte real nula?",
    "o": [
      "m=2.",
      "m=−2.",
      "m=±2.",
      "m=0."
    ],
    "a": 1,
    "sol": "A parte real é m+2, pelo que m+2=0 equivale a m=−2. Para esse valor também se obtém m²−4=0, logo z=0.",
    "hyp": "Pode não verificar ambas as condições.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-forma-algebrica:12-cplx-forma-algebrica:imaginario-parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-038",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-FA-012",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "Dois complexos a+bi e c+di são iguais se e só se...",
    "o": [
      "a+b=c+d.",
      "a=d e b=c.",
      "a²+b²=c²+d².",
      "a=c e b=d."
    ],
    "a": 3,
    "sol": "Igualdade exige igualdade componente a componente.",
    "hyp": "Pode confundir igualdade com igual módulo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-forma-algebrica:12-cplx-forma-algebrica:igualdade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-012",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-FT-029",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-trig",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Forma trigonométrica, módulo e argumento",
    "q": "O argumento principal costuma ser escolhido num intervalo de comprimento...",
    "o": [
      "2π.",
      "π.",
      "π/2.",
      "4π."
    ],
    "a": 0,
    "sol": "Uma convenção possível é ]−π,π] ou [0,2π[.",
    "hyp": "Pode pensar que só existe uma convenção universal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-forma-trig:12-cplx-forma-trig:arg-principal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FT-029",
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
    "q": "Em que semieixo está o afixo de um complexo não nulo com argumento π/2?",
    "o": [
      "o semieixo imaginário negativo.",
      "o semieixo imaginário positivo.",
      "o semieixo real positivo.",
      "o semieixo real negativo."
    ],
    "a": 1,
    "sol": "O ponto tem abcissa r cos(π/2)=0 e ordenada r sin(π/2)=r>0, onde r é o módulo.",
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
    "id": "EX-VN12CPLX-OA-027",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Operações na forma algébrica",
    "q": "Se z=2+i, então z²−2z=",
    "o": [
      "1+2i.",
      "−1−2i.",
      "−1+2i.",
      "2i."
    ],
    "a": 2,
    "sol": "z²=(2+i)²=3+4i e 2z=4+2i; diferença=−1+2i.",
    "hyp": "Pode fazer z(z−2) sem expandir corretamente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-operacoes-algebricas:12-cplx-operacoes-algebricas:expressao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-027",
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
    "id": "EX-VN12CPLX-OA-016",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Operações na forma algébrica",
    "q": "Para tornar real o denominador c+di≠0 de um quociente, por que número convém multiplicar o numerador e o denominador?",
    "o": [
      "o oposto −c−di.",
      "i.",
      "o módulo apenas.",
      "o conjugado c−di."
    ],
    "a": 3,
    "sol": "Multiplica-se pelo conjugado c−di, que é não nulo. O denominador passa a (c+di)(c−di)=c²+d².",
    "hyp": "Pode usar o oposto, que não elimina i.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-operacoes-algebricas:12-cplx-operacoes-algebricas:divisao-conjugado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-016",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-algebricas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-OT-024",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "Uma solução de z²=i é...",
    "o": [
      "1+i.",
      "(1−i)/√2.",
      "i.",
      "(1+i)/√2."
    ],
    "a": 3,
    "sol": "Argumento π/4 e módulo 1; ao quadrado dá argumento π/2.",
    "hyp": "Pode esquecer normalizar o módulo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-operacoes-trig:12-cplx-operacoes-trig:raiz-i",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-024",
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
    "q": "No plano complexo, com centro das transformações na origem, a que corresponde dividir por um complexo de módulo 2 e argumento π/4?",
    "o": [
      "dilatar por 2 e rodar π/4.",
      "dilatar por 1/2 e rodar −π/4.",
      "rodar π/4 sem escala.",
      "refletir no eixo real."
    ],
    "a": 1,
    "sol": "Dividir por esse número reduz todas as distâncias à origem a metade e subtrai π/4 aos argumentos dos pontos diferentes da origem.",
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
    "id": "EX-VN12CPLX-OT-019",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "Se z^n=w, com n inteiro positivo e |w|=R>0, então cada raiz z tem módulo...",
    "o": [
      "R^n.",
      "R/n.",
      "R^(1/n).",
      "nR."
    ],
    "a": 2,
    "sol": "Tomando módulos na equação obtém-se |z|^n=R. Logo |z|=R^(1/n).",
    "hyp": "Pode dividir o módulo por n.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-operacoes-trig:12-cplx-operacoes-trig:raiz-modulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-019",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-UE-030",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "iⁿ=i quando...",
    "o": [
      "n≡2 mod 4.",
      "n≡1 mod 4.",
      "n≡3 mod 4.",
      "n≡0 mod 4."
    ],
    "a": 1,
    "sol": "O primeiro termo do ciclo corresponde a resto 1.",
    "hyp": "Pode trocar i e −i.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-unidade-equacoes:12-cplx-unidade-equacoes:classe-residuo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-030",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-UE-039",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "Uma equação do 2.º grau com coeficientes reais tem, em ℂ, a raiz 2+3i. Qual é a outra raiz?",
    "o": [
      "−2+3i.",
      "−2−3i.",
      "2−3i.",
      "3+2i."
    ],
    "a": 2,
    "sol": "Coeficientes reais implicam raízes complexas conjugadas.",
    "hyp": "Pode trocar sinais das duas partes.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-unidade-equacoes:12-cplx-unidade-equacoes:conjugadas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-039",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12CPLX-UE-018",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "Em C, qual é o conjunto-solução da equação x²−4=0?",
    "o": [
      "{−2i,2i}.",
      "{−2,2}.",
      "{2i}.",
      "∅."
    ],
    "a": 1,
    "sol": "x²−4=(x−2)(x+2)=0, logo x=−2 ou x=2. Portanto, S={−2,2}.",
    "hyp": "Pode inserir i desnecessariamente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-cplx-unidade-equacoes:12-cplx-unidade-equacoes:equacao-real",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-018",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-EQ-026",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Resolve em ℝ a equação ln(x−1)+ln(x+1)=ln(8).",
    "o": [
      "x=±3.",
      "x=3.",
      "x=−3.",
      "x=√8."
    ],
    "a": 1,
    "sol": "Os dois argumentos são positivos quando x>1. Pela propriedade do produto, (x−1)(x+1)=8. Então x²=9. Entre −3 e 3, o único valor no domínio é x=3.",
    "hyp": "Pode aceitar a raiz negativa sem verificar o domínio.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-equacoes:12-expl-equacoes:logs-produto-dominio-26",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-026",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-EQ-045",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Um investimento C(t)=2000·1,04^t ultrapassa 3000 quando...",
    "o": [
      "t>ln(1,5)/ln(1,04).",
      "t<ln(1,5)/ln(1,04).",
      "t>1,5/1,04.",
      "t>ln(1,04)/ln(1,5)."
    ],
    "a": 0,
    "sol": "Dividindo por 2000, obtém-se (1,04)^t>1,5. Como ln é crescente, t·ln(1,04)>ln(1,5). Dividindo por ln(1,04)>0, obtém-se t>ln(1,5)/ln(1,04).",
    "hyp": "Pode inverter a desigualdade ou a razão de logs.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-equacoes:12-expl-equacoes:modelacao-inequacao-45",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-045",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-EQ-012",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Resolve log₅(x−1)=1.",
    "o": [
      "x=5.",
      "x=1.",
      "x=4.",
      "x=6."
    ],
    "a": 3,
    "sol": "O domínio exige x>1. Pela definição de logaritmo, x−1=5¹=5, portanto x=6. Esse valor pertence ao domínio.",
    "hyp": "Pode esquecer recompor x.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-equacoes:12-expl-equacoes:log-linear-12",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-012",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-EXP-024",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Função exponencial",
    "q": "A propriedade f(x+1)=af(x) para f(x)=a^x mostra que...",
    "o": [
      "a função cresce sempre linearmente.",
      "a diferença entre termos é constante.",
      "a função é periódica.",
      "um aumento de 1 em x multiplica o valor por a."
    ],
    "a": 3,
    "sol": "A razão entre valores separados por uma unidade é constante e igual à base.",
    "hyp": "Pode confundir razão constante com diferença constante.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-exponencial:12-expl-exponencial:razao-interpret-24",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-024",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-EXP-037",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Função exponencial",
    "q": "Se g(x)=3·2^x, para que valor de k se tem g(x+k)=4g(x), qualquer que seja x?",
    "o": [
      "2.",
      "3.",
      "6.",
      "4."
    ],
    "a": 0,
    "sol": "A razão g(x+k)/g(x)=2^k. A condição pede 2^k=4=2². Pela injetividade da exponencial de base 2, k=2.",
    "hyp": "Pode multiplicar os fatores 3 e 2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-exponencial:12-expl-exponencial:razao-fator-37",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-037",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-EXP-012",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Função exponencial",
    "q": "Para a>0 e quaisquer x,y∈ℝ, qual é a expressão equivalente a a^(x+y)?",
    "o": [
      "a^x+a^y.",
      "a^(xy).",
      "a^x−a^y.",
      "a^x·a^y."
    ],
    "a": 3,
    "sol": "Ao multiplicar potências da mesma base somam-se expoentes.",
    "hyp": "Pode distribuir a potência sobre uma soma como adição.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-exponencial:12-expl-exponencial:propriedade-soma-12",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-012",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-IR-025",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Função inversa e raízes",
    "q": "A função x↦√x tem domínio real...",
    "o": [
      "[0,+∞[.",
      "R.",
      "]0,+∞[.",
      "]−∞,0]."
    ],
    "a": 0,
    "sol": "A raiz quadrada real exige radicando não negativo.",
    "hyp": "Pode excluir 0.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-inversa-raizes:12-expl-inversa-raizes:dominio-sqrt-25",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-025",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-IR-044",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Função inversa e raízes",
    "q": "Se a>1, a inversa de a^x é crescente ou decrescente?",
    "o": [
      "decrescente.",
      "constante.",
      "nem uma nem outra.",
      "crescente."
    ],
    "a": 3,
    "sol": "A exponencial de base maior que 1 é crescente, e a sua inversa também.",
    "hyp": "Pode pensar que inversa significa monotonia oposta.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-inversa-raizes:12-expl-inversa-raizes:log-monotonia-44",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-044",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-IR-010",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Função inversa e raízes",
    "q": "Para a>0 e a≠1, como se chama a função inversa de f(x)=a^x?",
    "o": [
      "função raiz quadrada.",
      "função logarítmica de base a.",
      "função recíproca 1/a^x.",
      "função afim."
    ],
    "a": 1,
    "sol": "Se y=a^x, então y>0 e a definição de logaritmo dá x=logₐ(y). Assim, a inversa é a função logarítmica de base a.",
    "hyp": "Pode confundir inversa funcional com recíproco.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-inversa-raizes:12-expl-inversa-raizes:log-inversa-10",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-010",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-LOG-027",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função logarítmica e propriedades",
    "q": "Para x>0, qual é a expressão equivalente a 2·log₃(x)?",
    "o": [
      "log₃(2x).",
      "log₃(x+2).",
      "log₃(x²).",
      "(log₃(x))²."
    ],
    "a": 2,
    "sol": "O coeficiente passa a expoente do argumento.",
    "hyp": "Pode multiplicar o argumento por 2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-logaritmica:12-expl-logaritmica:condensar-potencia-27",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-027",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-LOG-049",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Função logarítmica e propriedades",
    "q": "Por que razão aplicar ln aos dois membros pode ajudar a resolver uma equação com a incógnita no expoente?",
    "o": [
      "Porque passa o expoente a fator multiplicativo.",
      "Porque transforma a base no expoente da incógnita.",
      "Porque permite cancelar a base com o expoente.",
      "Porque transforma o expoente numa parcela aditiva."
    ],
    "a": 0,
    "sol": "Para a>0, ln(a^x)=x·ln(a). A incógnita passa a ser um fator e, se a≠1, pode isolar-se por divisão por ln(a).",
    "hyp": "Pode pensar que logaritmo é apenas notação calculadora.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-logaritmica:12-expl-logaritmica:modelacao-utilidade-49",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-049",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-LOG-017",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Função logarítmica e propriedades",
    "q": "Para a>0, a≠1 e x>0, qual é a expressão equivalente a logₐ(x^k), para qualquer k∈ℝ?",
    "o": [
      "k·logₐ(x).",
      "(logₐ(x))^k.",
      "logₐ(x)+k.",
      "logₐ(kx)."
    ],
    "a": 0,
    "sol": "O expoente passa a fator multiplicativo.",
    "hyp": "Pode elevar o próprio logaritmo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-logaritmica:12-expl-logaritmica:potencia-17",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-017",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-MOD-024",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Num modelo exponencial, uma taxa percentual constante significa que...",
    "o": [
      "se acrescenta sempre a mesma quantidade absoluta.",
      "o gráfico é uma reta.",
      "o valor inicial é irrelevante.",
      "se multiplica sempre pelo mesmo fator relativo."
    ],
    "a": 3,
    "sol": "A alteração absoluta varia com o nível da quantidade; o fator relativo é constante.",
    "hyp": "Pode confundir taxa percentual constante com diferença constante.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-modelacao:12-expl-modelacao:percentagem-vs-absoluto-24",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-024",
    "sourceFile": "content/vnext/math-a/12/12-expl-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12EXPL-MOD-037",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Uma quantidade cresce 50% em 2 períodos, com fator constante por período. O fator b satisfaz...",
    "o": [
      "b²=1,5.",
      "2b=1,5.",
      "b=1,5².",
      "b²=0,5."
    ],
    "a": 0,
    "sol": "O fator total é 1,50 e resulta de duas multiplicações pelo mesmo b.",
    "hyp": "Pode dividir 50% por 2 em vez de compor fatores.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-expl-modelacao:12-expl-modelacao:fator-medio-37",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-037",
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
    "q": "Um medicamento começa com 80 mg e perde 20% por hora. Um modelo é...",
    "o": [
      "80·1,2^t.",
      "80−0,2t.",
      "80·0,8^t.",
      "80·0,2^t."
    ],
    "a": 2,
    "sol": "Após cada hora permanece 80%=0,8 da quantidade anterior.",
    "hyp": "Pode usar a taxa perdida 0,2 como fator que permanece.",
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
    "id": "EX-VN12FCD-AP-032",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Para f(x)=x e^{-x}, x>0, f'(x)=",
    "o": [
      "e^{-x}(1+x).",
      "−xe^{-x}.",
      "e^{-x}.",
      "e^{-x}(1−x)."
    ],
    "a": 3,
    "sol": "Pela regra do produto, f'(x)=e^{-x}+x(−e^{-x})=e^{-x}−xe^{-x}=e^{-x}(1−x).",
    "hyp": "Pode esquecer a derivada de e^{-x}.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-aplicacoes:12-fcd-aplicacoes:produto-aplicacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-032",
    "sourceFile": "content/vnext/math-a/12/12-fcd-aplicacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-AP-049",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Uma caixa sem tampa é feita cortando quadrados de lado x nos cantos de uma folha 20×30. O volume é...",
    "o": [
      "V(x)=x(20−2x)(30−2x).",
      "V(x)=x(20−x)(30−x).",
      "V(x)=600x.",
      "V(x)=20·30−4x²."
    ],
    "a": 0,
    "sol": "Após dobrar, altura x e lados da base 20−2x e 30−2x.",
    "hyp": "Pode retirar x apenas uma vez de cada dimensão.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-aplicacoes:12-fcd-aplicacoes:caixa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-049",
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
    "q": "Supondo que f″ é contínua numa vizinhança de a, que tipo de ponto é a se f′(a)=0 e f″(a)>0?",
    "o": [
      "ponto de mínimo local.",
      "ponto de máximo local.",
      "ponto de inflexão.",
      "assíntota vertical."
    ],
    "a": 0,
    "sol": "Como f″ é contínua e positiva em a, é positiva perto de a, onde f′ é crescente. Como f′(a)=0, f′ é negativa à esquerda e positiva à direita de a. Portanto, f tem um mínimo local em a.",
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
    "id": "EX-VN12FCD-COMP-027",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função composta e domínio",
    "q": "Se f(x)=1/(x+2) e g(x)=1/x, qual é o domínio de (f∘g)(x)=x/(1+2x)?",
    "o": [
      "R\\{−2}.",
      "R\\{0}.",
      "R\\{0,−1/2}.",
      "R\\{1/2}."
    ],
    "a": 2,
    "sol": "É preciso x≠0 para g e 1/x≠−2, isto é x≠−1/2.",
    "hyp": "Pode olhar apenas para a forma simplificada ou apenas para um dos passos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-composicao:12-fcd-composicao:dominio-racional",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-027",
    "sourceFile": "content/vnext/math-a/12/12-fcd-composicao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-COMP-049",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Função composta e domínio",
    "q": "Uma empresa converte quantidade produzida q em custo C(q) e tempo t em quantidade q(t). O custo em função do tempo é...",
    "o": [
      "C(q(t)).",
      "q(C(t)).",
      "C(t)+q(t).",
      "C(t)q(t)."
    ],
    "a": 0,
    "sol": "Primeiro o tempo determina a produção; depois a produção determina o custo.",
    "hyp": "Pode inverter a cadeia causal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-composicao:12-fcd-composicao:modelacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-049",
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
    "q": "Considera f(x)=ln(x+1) e g(x)=√(x−2). Qual é o domínio de f∘g?",
    "o": [
      "]−∞,2].",
      "R.",
      "[2,+∞[.",
      "]2,+∞[."
    ],
    "a": 2,
    "sol": "A raiz exige x≥2. Para esses x, √(x−2)≥0, pelo que √(x−2)+1>0 e o logaritmo está definido. Logo, o domínio é [2, +∞[.",
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
    "id": "EX-VN12FCD-EE-049",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Número e e derivada da exponencial",
    "q": "O ponto x=0 de e^{−x²} é...",
    "o": [
      "um máximo.",
      "um mínimo.",
      "um ponto de descontinuidade.",
      "uma raiz."
    ],
    "a": 0,
    "sol": "A função cresce para x<0 e decresce para x>0, atingindo 1 em 0.",
    "hyp": "Pode confundir derivada nula com mínimo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-e-exponencial:12-fcd-e-exponencial:maximo-gauss",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-049",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-EE-011",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Número e e derivada da exponencial",
    "q": "Se g é derivável em x e f(x)=e^(g(x)), qual é a expressão de f′(x)?",
    "o": [
      "e^{g'(x)}.",
      "g(x)e^{g(x)−1}.",
      "g'(x)e^{g(x)}.",
      "e^{g(x)}/g'(x)."
    ],
    "a": 2,
    "sol": "É uma aplicação da regra da cadeia.",
    "hyp": "Pode derivar o expoente no lugar do próprio expoente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-e-exponencial:12-fcd-e-exponencial:regra-geral",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-011",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-LTP-024",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "A derivada de ln((x+1)/(x−1)), no domínio, é...",
    "o": [
      "1/(x+1)+1/(x−1).",
      "2x/(x²−1).",
      "ln(x+1)−ln(x−1).",
      "1/(x+1)−1/(x−1)."
    ],
    "a": 3,
    "sol": "O quociente u=(x+1)/(x−1) é positivo para x<−1 ou x>1. A sua derivada é u′=−2/(x−1)² e a de ln(u) é u′/u=−2/(x²−1). Esta expressão equivale a 1/(x+1)−1/(x−1) em todo o domínio.",
    "hyp": "Pode trocar o sinal da diferença.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-log-trig-potencias:12-fcd-log-trig-potencias:ln-quociente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-024",
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
    "q": "Uma oscilação é y(t)=5sen(2t). A velocidade y'(t) é...",
    "o": [
      "10cos(2t).",
      "5cos(2t).",
      "10sen(2t).",
      "−10sen(2t)."
    ],
    "a": 0,
    "sol": "Deriva-se seno e multiplica-se pela frequência angular 2.",
    "hyp": "Pode esquecer o fator 2.",
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
    "id": "EX-VN12FCD-LTP-009",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "A derivada de ln(2x), para x>0, é...",
    "o": [
      "1/x.",
      "2/x.",
      "1/(2x).",
      "2."
    ],
    "a": 0,
    "sol": "Para x>0, a regra da cadeia dá a derivada de ln(2x) como 2/(2x)=1/x. Também se pode usar ln(2x)=ln(2)+ln(x).",
    "hyp": "Pode esquecer simplificar o fator 2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-log-trig-potencias:12-fcd-log-trig-potencias:ln-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-009",
    "sourceFile": "content/vnext/math-a/12/12-fcd-log-trig-potencias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-RC-030",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "A derivada de sen(e^x) é...",
    "o": [
      "cos(e^x).",
      "e^x cos(e^x).",
      "e^x sen(e^x).",
      "cos(x)·e^x."
    ],
    "a": 1,
    "sol": "Pela regra da cadeia, a derivada de sen(e^x) é cos(e^x) vezes a derivada de e^x. Logo, é e^x cos(e^x).",
    "hyp": "Pode esquecer a derivada interna.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-regras-cadeia:12-fcd-regras-cadeia:cadeia-trig-exp",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-030",
    "sourceFile": "content/vnext/math-a/12/12-fcd-regras-cadeia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCD-RC-049",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "Se receita R(q)=q·p(q), então a receita marginal R'(q) é...",
    "o": [
      "p(q)+q p'(q).",
      "p'(q).",
      "q p'(q).",
      "p(q)p'(q)."
    ],
    "a": 0,
    "sol": "É uma aplicação direta da regra do produto.",
    "hyp": "Pode derivar apenas o preço.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcd-regras-cadeia:12-fcd-regras-cadeia:receita",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-049",
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
    "q": "A derivada de x cos(x) é...",
    "o": [
      "cos(x)−x sen(x).",
      "−sen(x).",
      "x sen(x).",
      "cos(x)+x sen(x)."
    ],
    "a": 0,
    "sol": "Pela regra do produto, (x cos(x))'=1·cos(x)+x(−sen(x))=cos(x)−x sen(x).",
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
    "id": "EX-VN12FCONT-DER-026",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "Para uma função por ramos ser derivável no ponto de junção, é necessário...",
    "o": [
      "apenas ter valores laterais iguais.",
      "ser contínua e ter derivadas laterais iguais.",
      "apenas ser contínua.",
      "ter derivada zero."
    ],
    "a": 1,
    "sol": "Derivabilidade exige continuidade e igualdade de declives laterais.",
    "hyp": "Pode verificar apenas a continuidade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-derivabilidade:12-fcont-derivabilidade:criterio-ramos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-026",
    "sourceFile": "content/vnext/math-a/12/12-fcont-derivabilidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-DER-040",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "Se f é derivável em a, então lim(h→0) [f(a+h)−f(a)−f′(a)h]/h=0. Que propriedade de f exprime este limite?",
    "o": [
      "uma identidade global exata.",
      "a definição de continuidade apenas.",
      "uma série infinita obrigatória.",
      "a aproximação linear local."
    ],
    "a": 3,
    "sol": "Pela definição de derivada, [f(a+h)−f(a)]/h tende para f′(a). Assim, o erro da aproximação de f(a+h) por f(a)+f′(a)h, dividido por h, tende para 0. A expressão f(a)+f′(a)h é a ordenada da reta tangente na abcissa a+h.",
    "hyp": "Pode tratar a aproximação como igualdade exata para qualquer h.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-derivabilidade:12-fcont-derivabilidade:linearizacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-040",
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
    "sol": "f'(x)=1/(2√x) requer x>0; em 0 a derivada finita não existe.",
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
    "id": "EX-VN12FCONT-EG-032",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "Para f(x)=x²−4x no intervalo [0, 5], que valores de x são candidatos a pontos de extremo absoluto?",
    "o": [
      "x=2 apenas.",
      "x=0 e 5 apenas.",
      "x=0, x=4 e x=5.",
      "x=0, x=2 e x=5."
    ],
    "a": 3,
    "sol": "f'=2x−4=0 dá 2, além das extremidades 0 e 5.",
    "hyp": "Pode considerar apenas pontos críticos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-estudo-global:12-fcont-estudo-global:candidatos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-032",
    "sourceFile": "content/vnext/math-a/12/12-fcont-estudo-global.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-EG-039",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "Para f(x)=x/(1+x²), há máximo local em...",
    "o": [
      "x=−1.",
      "x=0.",
      "x=1.",
      "nenhum."
    ],
    "a": 2,
    "sol": "f' passa de positivo para negativo em 1.",
    "hyp": "Pode trocar o ponto de máximo e mínimo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-estudo-global:12-fcont-estudo-global:racional-max",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-039",
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
    "id": "EX-VN12FCONT-LC-047",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Limite intuitivo e continuidade",
    "q": "lim_{x→1}(x^n−1)/(x−1), para n natural positivo, é...",
    "o": [
      "1.",
      "n−1.",
      "n.",
      "0."
    ],
    "a": 2,
    "sol": "É a soma 1+x+...+x^{n−1} avaliada em 1, com n termos.",
    "hyp": "Pode confundir com n−1.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-limites-continuidade:12-fcont-limites-continuidade:geral-potencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-047",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-LC-017",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Limite intuitivo e continuidade",
    "q": "A expressão 0/0 num cálculo de limite é...",
    "o": [
      "uma indeterminação, não o valor do limite.",
      "sempre igual a 0.",
      "sempre igual a 1.",
      "prova de inexistência do limite."
    ],
    "a": 0,
    "sol": "É necessário transformar ou analisar mais a expressão.",
    "hyp": "Pode tratar 0/0 como resultado final.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-limites-continuidade:12-fcont-limites-continuidade:indeterminacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-017",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-OP-028",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Operações com funções contínuas",
    "q": "Qual é o conjunto de continuidade de tg(x)=sen(x)/cos(x)?",
    "o": [
      "sen(x)≠0.",
      "x≠0.",
      "todo R.",
      "cos(x)≠0."
    ],
    "a": 3,
    "sol": "As funções seno e cosseno são contínuas em ℝ. O seu quociente está definido e é contínuo nos pontos em que cos(x)≠0.",
    "hyp": "Pode excluir zeros do numerador.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-operacoes:12-fcont-operacoes:tan",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-028",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-OP-050",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Operações com funções contínuas",
    "q": "Se um índice I(t)=A(t)/B(t), com A,B contínuas e B(t) nunca nulo no período estudado, então I...",
    "o": [
      "é descontínuo por ser quociente.",
      "é contínuo nesse período.",
      "é constante.",
      "só é contínuo se A=B."
    ],
    "a": 1,
    "sol": "Quociente de contínuas com denominador não nulo preserva continuidade.",
    "hyp": "Pode considerar qualquer quociente descontínuo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-operacoes:12-fcont-operacoes:modelacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-050",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12FCONT-OP-008",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Operações com funções contínuas",
    "q": "Qual é o maior conjunto em que f(x)=(x²+1)/(x−3) é contínua?",
    "o": [
      "R.",
      "R\\{−3}.",
      "]3,+∞[.",
      "R\\{3}."
    ],
    "a": 3,
    "sol": "Quociente de funções contínuas onde o denominador é não nulo.",
    "hyp": "Pode excluir a raiz do numerador inexistente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-fcont-operacoes:12-fcont-operacoes:racional",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-008",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-DA-024",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "Se σ é desconhecido na prática, o erro padrão da média é frequentemente estimado por...",
    "o": [
      "s/n.",
      "n/s.",
      "s√n.",
      "s/√n."
    ],
    "a": 3,
    "sol": "Substitui-se σ pelo desvio padrão amostral s.",
    "hyp": "Pode dividir por n.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-distribuicoes-amostragem:12-ie-distribuicoes-amostragem:ep-estimado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-024",
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
    "q": "Numa população de tamanho N>1 e para 1≤n≤N, considera o fator √[(N−n)/(N−1)] que corrige o erro padrão ao amostrar sem reposição. Que afirmação é sempre verdadeira sobre esse fator?",
    "o": [
      "sempre maior que 1.",
      "menor ou igual a 1.",
      "sempre zero.",
      "igual a n/N."
    ],
    "a": 1,
    "sol": "Como N−n≤N−1 para n≥1, o fator não excede 1.",
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
    "id": "EX-VN12IE-DA-012",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "Numa amostra de n observações independentes, cada uma com probabilidade p de sucesso, qual é o erro padrão teórico da proporção amostral p̂?",
    "o": [
      "p(1−p)/n.",
      "√p/n.",
      "p/√n.",
      "√[p(1−p)/n]."
    ],
    "a": 3,
    "sol": "É o desvio padrão da proporção amostral.",
    "hyp": "Pode esquecer a raiz.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-distribuicoes-amostragem:12-ie-distribuicoes-amostragem:phat-ep",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-012",
    "sourceFile": "content/vnext/math-a/12/12-ie-distribuicoes-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-EST-027",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Estimação de parâmetros",
    "q": "Um estimador calculado a partir dos dados, como a média amostral, pode depender de que informação?",
    "o": [
      "do valor verdadeiro do parâmetro desconhecido.",
      "dos dados que não foram observados.",
      "todos os dados da amostra.",
      "da média populacional que se quer estimar."
    ],
    "a": 2,
    "sol": "Estatísticas são funções dos dados observados.",
    "hyp": "Pode esquecer a dependência amostral.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-estimacao:12-ie-estimacao:funcao-dados",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-027",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-EST-040",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Estimação de parâmetros",
    "q": "Se um estimador é consistente mas enviesado em amostras pequenas, o viés pode...",
    "o": [
      "crescer obrigatoriamente.",
      "ser sempre constante.",
      "impedir consistência por definição.",
      "tender a desaparecer à medida que n cresce."
    ],
    "a": 3,
    "sol": "Consistência é propriedade assintótica; pequeno viés finito pode desaparecer.",
    "hyp": "Pode achar que qualquer viés exclui consistência.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-estimacao:12-ie-estimacao:consistencia-vies",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-040",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-EST-018",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Estimação de parâmetros",
    "q": "Se p̂=0,4 e n=100, o erro padrão estimado de p̂ é aproximadamente...",
    "o": [
      "0,4/100.",
      "√(0,4·0,6/100).",
      "0,24.",
      "√0,4/100."
    ],
    "a": 1,
    "sol": "Substitui-se p por p̂ na fórmula de erro padrão.",
    "hyp": "Pode esquecer o fator 1−p̂.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-estimacao:12-ie-estimacao:ep-proporcao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-018",
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
    "q": "Duas estratégias produzem estimadores não enviesados do mesmo parâmetro. Se o estimador da estratégia A tem menor variância do que o da estratégia B, como se compara a precisão das estimativas?",
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
    "id": "EX-VN12IE-IC-024",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "Há um compromisso entre...",
    "o": [
      "média e mediana apenas.",
      "n e população sempre.",
      "parâmetro e estimativa serem iguais.",
      "nível de confiança e precisão/largura do intervalo."
    ],
    "a": 3,
    "sol": "Com dados fixos, mais confiança implica intervalo mais largo.",
    "hyp": "Pode querer maximizar simultaneamente confiança e estreiteza sem custo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-intervalos-confianca:12-ie-intervalos-confianca:tradeoff",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-024",
    "sourceFile": "content/vnext/math-a/12/12-ie-intervalos-confianca.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-IC-038",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "Para margem≤0,03 a 95%, usando z*=1,96 e p=0,5, precisamos aproximadamente de n≥...",
    "o": [
      "384.",
      "1068.",
      "196.",
      "33."
    ],
    "a": 1,
    "sol": "n≥(1,96²×0,25)/(0,03²)≈1067,1, arredondando para cima 1068.",
    "hyp": "Pode usar a fórmula sem quadrar z ou margem.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-intervalos-confianca:12-ie-intervalos-confianca:n-prop",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-038",
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
      "em muitas repetições do procedimento, cerca de 95% dos intervalos conteriam o parâmetro.",
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
    "id": "EX-VN12IE-TLC-027",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "Numa distribuição normal de média μ e desvio padrão σ, entre que limites se encontra aproximadamente 95% da probabilidade?",
    "o": [
      "μ−σ e μ+σ.",
      "μ−3σ e μ+3σ.",
      "μ−2σ e μ+2σ.",
      "μ e μ+2σ."
    ],
    "a": 2,
    "sol": "É a regra aproximada dos dois desvios padrão.",
    "hyp": "Pode confundir 68% e 95%.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-tlc:12-ie-tlc:regra95",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-027",
    "sourceFile": "content/vnext/math-a/12/12-ie-tlc.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12IE-TLC-038",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "Para Binomial(n,p), média e variância são...",
    "o": [
      "p e p(1−p).",
      "np e np(1−p).",
      "n e p.",
      "np e √[np(1−p)]."
    ],
    "a": 1,
    "sol": "São os parâmetros da soma de Bernoullis.",
    "hyp": "Pode confundir variância com desvio padrão.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-ie-tlc:12-ie-tlc:binomial-param",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-038",
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
    "id": "EX-VN12INT-AR-032",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Áreas e aplicações",
    "q": "A área entre y=cos x e Ox em [0,π] é...",
    "o": [
      "0.",
      "1.",
      "π.",
      "2."
    ],
    "a": 3,
    "sol": "O cosseno muda de sinal em π/2. A área é ∫_0^{π/2} cos x dx−∫_{π/2}^π cos x dx=(1−0)−(0−1)=2.",
    "hyp": "Pode usar a integral algébrica 0.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-areas:12-int-areas:cosseno",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-032",
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
    "id": "EX-VN12INT-AR-011",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Áreas e aplicações",
    "q": "A área entre dois gráficos f e g, com f≥g em [a,b], é...",
    "o": [
      "∫_a^b[f(x)+g(x)]dx.",
      "∫_a^b[g(x)−f(x)]dx.",
      "∫_a^b[f(x)−g(x)]dx.",
      "f(b)−g(a)."
    ],
    "a": 2,
    "sol": "A altura vertical entre as curvas é f−g.",
    "hyp": "Pode somar as ordenadas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-areas:12-int-areas:entre-curvas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-011",
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
    "q": "Se f é constante igual a 7 em [2,5], o seu valor médio é...",
    "o": [
      "21.",
      "7.",
      "3.",
      "9."
    ],
    "a": 1,
    "sol": "A média de uma função constante é a própria constante.",
    "hyp": "Pode usar integral total 21.",
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
    "q": "A velocidade v(t) de um móvel muda de sinal entre os instantes a e b, com a<b. Que expressão dá a distância total percorrida nesse intervalo?",
    "o": [
      "|∫_a^b v(t) dt|.",
      "∫_a^b |v(t)| dt.",
      "∫_a^b v′(t) dt.",
      "∫_a^b t v(t) dt."
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
    "id": "EX-VN12INT-ID-013",
    "themeId": "12-int",
    "subtopicId": "12-int-integral-definido",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Integral definido",
    "q": "Para constante k, ∫_a^b kf=",
    "o": [
      "k∫_a^b f.",
      "∫f/k.",
      "k+∫f.",
      "∫f+k(b−a) sempre."
    ],
    "a": 0,
    "sol": "Constantes multiplicativas saem da integral.",
    "hyp": "Pode alterar a estrutura.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-integral-definido:12-int-integral-definido:linearidade-k",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-ID-013",
    "sourceFile": "content/vnext/math-a/12/12-int-integral-definido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-PR-030",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "A operação de obter primitivas é, em certo sentido...",
    "o": [
      "igual à derivação.",
      "inversa da derivação, até uma constante.",
      "inversa da multiplicação.",
      "sempre única."
    ],
    "a": 1,
    "sol": "Derivar uma primitiva recupera a função original.",
    "hyp": "Pode ignorar a constante.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-primitiva:12-int-primitiva:inversa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-030",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-PR-042",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "Uma primitiva de (2x+1)^3 pode obter-se por reconhecimento como...",
    "o": [
      "(2x+1)^4/4.",
      "(2x+1)^4/8.",
      "3(2x+1)^2.",
      "(2x+1)^4/2."
    ],
    "a": 1,
    "sol": "Derivar (2x+1)^4/8 dá 4·2/8=1 vezes o cubo.",
    "hyp": "Pode compensar mal o fator interno.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-primitiva:12-int-primitiva:potencia-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-042",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-PR-007",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "Uma primitiva de x³ é...",
    "o": [
      "3x².",
      "x⁴.",
      "x⁴/4.",
      "4x³."
    ],
    "a": 2,
    "sol": "Aumenta-se o expoente e divide-se pelo novo expoente.",
    "hyp": "Pode multiplicar em vez de dividir.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-primitiva:12-int-primitiva:potencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-007",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12INT-TP-034",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Primitivas imediatas e propriedades",
    "q": "Qual é ∫(x+1)e^{x²+2x}dx?",
    "o": [
      "e^{x²+2x}+C.",
      "(1/2)e^{x²+2x}+C.",
      "2e^{x²+2x}+C.",
      "(x+1)e^{x²+2x}+C."
    ],
    "a": 1,
    "sol": "A derivada de x²+2x é 2(x+1). Assim, pela regra da cadeia, a derivada de (1/2)e^{x²+2x} é (x+1)e^{x²+2x}. A expressão geral das primitivas é (1/2)e^{x²+2x}+C.",
    "hyp": "Pode esquecer o fator 1/2.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-tabela-propriedades:12-int-tabela-propriedades:reconhecimento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-034",
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
    "id": "EX-VN12INT-TP-008",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Primitivas imediatas e propriedades",
    "q": "∫1/x dx=",
    "o": [
      "1/x²+C.",
      "x ln x+C.",
      "e^x+C.",
      "ln|x|+C."
    ],
    "a": 3,
    "sol": "A primitiva é ln|x| em intervalos que não atravessam 0.",
    "hyp": "Pode aplicar a regra das potências com n=−1.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-tabela-propriedades:12-int-tabela-propriedades:log",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-008",
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
    "sol": "Como uma primitiva de t−2 é (t−2)²/2, pela fórmula de Barrow A(3)=(3−2)²/2−(1−2)²/2=1/2−1/2=0.",
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
    "id": "EX-VN12INT-TFC-018",
    "themeId": "12-int",
    "subtopicId": "12-int-tfc-barrow",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Teorema Fundamental do Cálculo / Fórmula de Barrow",
    "q": "Se A(x)=∫_0^x t²dt, então A'(x)=",
    "o": [
      "2x.",
      "x².",
      "x³/3.",
      "0."
    ],
    "a": 1,
    "sol": "Pelo TFC, a derivada da acumulação é o integrando no limite superior.",
    "hyp": "Pode integrar antes e derivar incorretamente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-int-tfc-barrow:12-int-tfc-barrow:tfc",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TFC-018",
    "sourceFile": "content/vnext/math-a/12/12-int-tfc-barrow.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-AE-027",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "Qual das expressões é sempre igual à transposta de kA?",
    "o": [
      "−kA^T.",
      "A^T/k.",
      "kA^T.",
      "k+A^T."
    ],
    "a": 2,
    "sol": "O escalar não é afetado pela transposição.",
    "hyp": "Pode alterar o escalar.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-adicao-escalar:12-mat-adicao-escalar:transposta-escalar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-027",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-AE-040",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "Se A é matriz 2×2 e λA=0 com A≠0, então λ=",
    "o": [
      "1.",
      "−1.",
      "2.",
      "0."
    ],
    "a": 3,
    "sol": "Um escalar não nulo não pode anular todos os elementos de uma matriz não nula.",
    "hyp": "Pode pensar que a matriz pode cancelar internamente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-adicao-escalar:12-mat-adicao-escalar:escalar-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-040",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-AE-009",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "[[4,5],[1,2]]−[[1,3],[2,−1]]=",
    "o": [
      "[[3,2],[−1,3]].",
      "[[5,8],[3,1]].",
      "[[3,8],[1,−3]].",
      "[[4,2],[−1,2]]."
    ],
    "a": 0,
    "sol": "Subtrai-se cada elemento correspondente.",
    "hyp": "Pode esquecer distribuir o sinal negativo.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-adicao-escalar:12-mat-adicao-escalar:subtracao-calculo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-009",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-MOD-026",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Modelação e aplicações",
    "q": "Uma população ocupa dois estados. Em cada passo, a distribuição evolui segundo xₙ₊₁=Pxₙ. A matriz P tem linhas (0,8; 0,3) e (0,2; 0,7). Se x₀=(100,0)ᵀ, qual é o vetor x₁?",
    "o": [
      "(30,70)^T.",
      "(80,20)^T.",
      "(100,0)^T.",
      "(50,50)^T."
    ],
    "a": 1,
    "sol": "A primeira coluna indica que 80% permanecem no estado 1 e 20% passam ao estado 2.",
    "hyp": "Pode usar a segunda coluna apesar de x_0 estar todo no estado 1.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-modelacao:12-mat-modelacao:transicao-calculo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-026",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-MOD-039",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Modelação e aplicações",
    "q": "Se C=[[2,1],[1,3]] e q=(4,2)^T, então Cq=",
    "o": [
      "(8,6)^T.",
      "(6,8)^T.",
      "(10,10)^T.",
      "(12,8)^T."
    ],
    "a": 2,
    "sol": "Primeiro recurso: 8+2=10; segundo: 4+6=10.",
    "hyp": "Pode multiplicar apenas diagonais.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-modelacao:12-mat-modelacao:conversao-calculo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-039",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-MOD-012",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Modelação e aplicações",
    "q": "A matriz A=[[2,1],[3,4]] indica as unidades de cada recurso (linhas) necessárias por unidade de cada produto (colunas). Para o vetor de produção q=(5,2)ᵀ, obtém-se Aq=(12,23)ᵀ. O que representa a primeira componente?",
    "o": [
      "produção total do produto 1.",
      "custo do recurso 1.",
      "número de produtos.",
      "consumo total do recurso 1."
    ],
    "a": 3,
    "sol": "A primeira linha corresponde ao recurso 1.",
    "hyp": "Pode interpretar a componente pela coluna em vez da linha.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-modelacao:12-mat-modelacao:interpretacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-012",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-PRD-031",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "A transposta de um produto satisfaz...",
    "o": [
      "(AB)^T=A^T B^T.",
      "(AB)^T=AB.",
      "(AB)^T=B^T A^T.",
      "(AB)^T=A+B."
    ],
    "a": 2,
    "sol": "A transposição inverte a ordem dos fatores.",
    "hyp": "Pode preservar a ordem indevidamente.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-produto:12-mat-produto:transposta-produto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-031",
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
    "sol": "O produto das duas matrizes diagonais tem entradas diagonais 2·(1/2)=1 e 3·(1/3)=1 e entradas nulas fora da diagonal. Resulta a matriz identidade, o que confirma a inversa.",
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
    "id": "EX-VN12MAT-PRD-010",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "[[1,2],[3,4]]·[[2,0],[1,5]]=",
    "o": [
      "[[2,0],[3,20]].",
      "[[4,10],[10,20]].",
      "[[3,7],[7,9]].",
      "[[4,5],[8,20]]."
    ],
    "a": 1,
    "sol": "1.ª linha: (1·2+2·1, 1·0+2·5)=(4,10); 2.ª linha=(10,20).",
    "hyp": "Pode multiplicar elemento a elemento.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-produto:12-mat-produto:calculo-2x2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-010",
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
    "sol": "Em indexação começando em 1, os índices somam n+1.",
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
    "id": "EX-VN12MAT-RT-012",
    "themeId": "12-mat",
    "subtopicId": "12-mat-representacao-tipos",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Representação, dimensão, elementos e tipos de matrizes",
    "q": "Uma matriz diagonal quadrada tem...",
    "o": [
      "todos os elementos iguais.",
      "diagonal principal nula.",
      "uma única coluna.",
      "elementos fora da diagonal principal iguais a 0."
    ],
    "a": 3,
    "sol": "Só a diagonal principal pode ter valores não nulos.",
    "hyp": "Pode inverter dentro/fora da diagonal.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-representacao-tipos:12-mat-representacao-tipos:diagonal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-RT-012",
    "sourceFile": "content/vnext/math-a/12/12-mat-representacao-tipos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-TR-024",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Transformações geométricas com matrizes",
    "q": "Qual das afirmações descreve corretamente o efeito de uma reflexão axial nas distâncias e na orientação do plano?",
    "o": [
      "Preserva as distâncias à origem, mas altera as distâncias entre pontos.",
      "Preserva as distâncias e a posição de todos os pontos.",
      "Preserva as distâncias e mantém a orientação.",
      "Preserva as distâncias e inverte a orientação."
    ],
    "a": 3,
    "sol": "Reflexões são isometrias, mas trocam orientação.",
    "hyp": "Pode confundir preservação de distâncias com preservação de orientação.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-transformacoes:12-mat-transformacoes:reflexao-propriedades",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-024",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-TR-041",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Transformações geométricas com matrizes",
    "q": "Refletir em y=x e depois novamente em y=x equivale a...",
    "o": [
      "identidade.",
      "rotação de 180°.",
      "reflexão no eixo Ox.",
      "cisalhamento."
    ],
    "a": 0,
    "sol": "Trocar coordenadas duas vezes recupera o ponto inicial.",
    "hyp": "Pode pensar que duas reflexões iguais mantêm a reflexão.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-transformacoes:12-mat-transformacoes:reflexao-involucao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-041",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12MAT-TR-017",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Transformações geométricas com matrizes",
    "q": "[[0,1],[−1,0]] representa rotação de...",
    "o": [
      "90° no sentido horário.",
      "90° anti-horário.",
      "180°.",
      "270° horário."
    ],
    "a": 0,
    "sol": "É uma rotação de −90°; equivalentemente 270° anti-horário.",
    "hyp": "Pode inverter o sentido.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-mat-transformacoes:12-mat-transformacoes:rotacao-horaria",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-017",
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
    "id": "EX-VN12PROB-PC-047",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Probabilidade condicionada",
    "q": "'Entre os alunos aprovados, 30% tiveram explicações' corresponde a...",
    "o": [
      "P(aprovado|explicações)=0,3.",
      "P(aprovado∩explicações)=0,3.",
      "P(explicações|aprovado)=0,3.",
      "P(explicações)=0,3."
    ],
    "a": 2,
    "sol": "O universo restringido é o grupo dos aprovados.",
    "hyp": "Pode inverter a leitura linguística da condicionada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-condicionada:12-prob-condicionada:linguagem-47",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-047",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PC-013",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Probabilidade condicionada",
    "q": "Numa turma, 12 de 30 alunos praticam natação. Entre os 18 alunos do sexo feminino, 9 praticam natação. P(natação | feminino)=...",
    "o": [
      "1/2.",
      "3/5.",
      "3/10.",
      "2/3."
    ],
    "a": 0,
    "sol": "Dentro do grupo feminino há 9 casos favoráveis em 18:9/18=1/2.",
    "hyp": "Pode usar o total da turma como denominador.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-condicionada:12-prob-condicionada:turma-13",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-013",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-CI-024",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Tabelas de contingência e independência",
    "q": "Uma associação observada numa tabela de contingência...",
    "o": [
      "prova causalidade.",
      "prova independência.",
      "é sempre erro amostral.",
      "não prova, por si só, causalidade."
    ],
    "a": 3,
    "sol": "Associação estatística e relação causal são conceitos distintos.",
    "hyp": "Pode interpretar associação como causa.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-contingencia-independencia:12-prob-contingencia-independencia:causalidade-24",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-024",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-CI-038",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Tabelas de contingência e independência",
    "q": "Numa tabela com 200 casos, A ocorre em 100, B em 80 e ambos em 50. A e B são...",
    "o": [
      "independentes porque 50 é metade de 100.",
      "dependentes.",
      "incompatíveis.",
      "complementares."
    ],
    "a": 1,
    "sol": "P(A)=0,5, P(B)=0,4, produto=0,2; P(A∩B)=0,25, logo dependentes.",
    "hyp": "Pode comparar proporções erradas.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-contingencia-independencia:12-prob-contingencia-independencia:tabela-38",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-038",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-CI-011",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Tabelas de contingência e independência",
    "q": "Se A e B são independentes, então A e B^c são...",
    "o": [
      "incompatíveis.",
      "complementares.",
      "independentes.",
      "necessariamente iguais."
    ],
    "a": 2,
    "sol": "P(A∩Bᶜ)=P(A)−P(A∩B)=P(A)−P(A)P(B)=P(A)(1−P(B))=P(A)P(Bᶜ). Logo, A e Bᶜ são independentes.",
    "hyp": "Pode achar que complementar destrói independência.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-contingencia-independencia:12-prob-contingencia-independencia:complementos-11",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-011",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-FA-027",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "Lançam-se duas moedas. Registam-se pela ordem da primeira e da segunda moeda as faces observadas, usando C para cara e K para coroa. Qual é o espaço de resultados deste registo?",
    "o": [
      "{C,K}.",
      "{CC,KK}.",
      "{CC,CK,KC,KK}.",
      "{0,1,2}."
    ],
    "a": 2,
    "sol": "Cada lançamento pode dar C ou K e a ordem dos lançamentos distingue CK de KC.",
    "hyp": "Pode ignorar a ordem dos lançamentos.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-fenomeno-acontecimentos:12-prob-fenomeno-acontecimentos:duas-moedas-27",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-027",
    "sourceFile": "content/vnext/math-a/12/12-prob-fenomeno-acontecimentos.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-FA-038",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "A diferença A\\B corresponde a...",
    "o": [
      "A∪B^c.",
      "A∩B^c.",
      "A^c∩B.",
      "A∩B."
    ],
    "a": 1,
    "sol": "São os resultados que pertencem a A e não a B.",
    "hyp": "Pode trocar qual acontecimento é complementado.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-fenomeno-acontecimentos:12-prob-fenomeno-acontecimentos:diferenca-38",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-038",
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
    "sol": "Cerca de 68% fica a menos de um desvio-padrão da média.",
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
    "id": "EX-VN12PROB-NO-040",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "Se Y=X+5, então Var(Y)=...",
    "o": [
      "Var(X)+5.",
      "Var(X)+25.",
      "5Var(X).",
      "Var(X)."
    ],
    "a": 3,
    "sol": "Somar uma constante desloca todos os valores mas não altera a dispersão.",
    "hyp": "Pode somar a constante à variância.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-normal:12-prob-normal:var-translacao-40",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-040",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-NO-014",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "Um z-score igual a 2 significa que o valor está...",
    "o": [
      "2 unidades acima da média.",
      "2 desvios-padrão acima da média.",
      "2 desvios-padrão abaixo da média.",
      "na média."
    ],
    "a": 1,
    "sol": "O z-score mede distância à média em unidades de σ.",
    "hyp": "Pode confundir unidades originais com desvios-padrão.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-normal:12-prob-normal:z-interpret-14",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-014",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PA-025",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "Num processo com probabilidade de falha 0,1 em cada uma de 4 etapas independentes, P(nenhuma falha)=...",
    "o": [
      "0,9^4.",
      "0,1^4.",
      "1−0,1^4.",
      "0,9×4."
    ],
    "a": 0,
    "sol": "Cada etapa tem sucesso 0,9; quatro sucessos independentes dão 0,9^4.",
    "hyp": "Pode usar a probabilidade de falha em vez da de sucesso.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-produto-arvores:12-prob-produto-arvores:nenhuma-falha-25",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-025",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PA-047",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "Um cliente entra online com probabilidade 0,7 e compra nesse canal com probabilidade 0,2; entra em loja física com probabilidade 0,3 e compra aí com probabilidade 0,4. Qual é a probabilidade total de compra?",
    "o": [
      "0,2.",
      "0,4.",
      "0,26.",
      "0,52."
    ],
    "a": 2,
    "sol": "Online+compra 0,14; físico+compra 0,12; total 0,26.",
    "hyp": "Pode fazer média simples das taxas 0,2 e 0,4.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-produto-arvores:12-prob-produto-arvores:modelacao-total-47",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-047",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PA-011",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "Uma urna tem 3 bolas vermelhas e 2 azuis. Retira-se ao acaso uma bola, repõe-se a bola e retira-se outra ao acaso. Qual é a probabilidade de ambas serem vermelhas?",
    "o": [
      "3/5.",
      "6/25.",
      "9/25.",
      "3/10."
    ],
    "a": 2,
    "sol": "Com reposição, a probabilidade de sair uma bola vermelha é 3/5 em cada extração e as duas extrações são independentes. Assim, a probabilidade pedida é (3/5)²=9/25.",
    "hyp": "Pode usar 3/5×2/5.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-produto-arvores:12-prob-produto-arvores:urna-rep-11",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-011",
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
    "q": "Se P(A)=0,7 e P(B)=0,6, qual é o menor valor possível de P(A∩B)?",
    "o": [
      "0.",
      "0,1.",
      "0,3.",
      "0,6."
    ],
    "a": 2,
    "sol": "Como P(A∪B)=1,3−P(A∩B)≤1, vale P(A∩B)≥0,3. O valor 0,3 é possível, por exemplo, com probabilidades 0,4 para apenas A, 0,3 para apenas B e 0,3 para ambos.",
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
    "id": "EX-VN12PROB-PR-050",
    "themeId": "12-prob",
    "subtopicId": "12-prob-propriedades",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Probabilidade e propriedades elementares",
    "q": "A regra de Laplace deve ser usada diretamente quando...",
    "o": [
      "os resultados têm probabilidades arbitrárias.",
      "os resultados elementares são equiprováveis e o espaço é finito.",
      "o espaço é necessariamente infinito.",
      "há apenas um acontecimento."
    ],
    "a": 1,
    "sol": "A razão casos favoráveis/casos possíveis pressupõe equiprobabilidade dos resultados elementares.",
    "hyp": "Pode aplicar contagem simples mesmo quando resultados não são equiprováveis.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-propriedades:12-prob-propriedades:laplace-condicao-50",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PR-050",
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
    "id": "EX-VN12PROB-PT-025",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "Uma doença afeta 1% da população. Um teste dá positivo em 99% das pessoas com a doença e em 5% das pessoas sem a doença. A probabilidade de ter a doença sabendo que o teste deu positivo é cerca de 16,7%. O que mostra este resultado sobre uma elevada sensibilidade do teste?",
    "o": [
      "não implica, por si só, elevada P(doença|positivo).",
      "garante posterior superior a 90%.",
      "torna irrelevante a prevalência.",
      "elimina falsos positivos."
    ],
    "a": 0,
    "sol": "A probabilidade de doença e teste positivo é 0,01×0,99=0,0099. A de teste positivo é 0,0099+0,99×0,05=0,0594. O quociente 0,0099/0,0594≈0,167 depende também da prevalência da doença e da taxa de positivos entre as pessoas sem a doença.",
    "hyp": "Pode ignorar a taxa-base.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-total:12-prob-total:base-rate-25",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-025",
    "sourceFile": "content/vnext/math-a/12/12-prob-total.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-PT-037",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "Uma condição rara ocorre em 2% dos casos. Um alarme dispara em 95% dos casos com condição e em 10% sem condição. P(alarme)=...",
    "o": [
      "0,117.",
      "0,105.",
      "0,95.",
      "0,019."
    ],
    "a": 0,
    "sol": "0,02×0,95+0,98×0,10=0,019+0,098=0,117.",
    "hyp": "Pode usar apenas a sensibilidade.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-total:12-prob-total:alarme-37",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-037",
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
    "q": "Uma escola tem 40% alunos do 10.º, 35% do 11.º e 25% do 12.º. Taxas de participação: 50%,60%,80%. P(participar)=...",
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
    "id": "EX-VN12PROB-VD-030",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "Lança-se uma moeda equilibrada duas vezes, de forma independente, e X conta o número de caras. Quanto vale P(X=1)?",
    "o": [
      "1/4.",
      "1/2.",
      "3/4.",
      "1."
    ],
    "a": 1,
    "sol": "Há quatro pares ordenados equiprováveis. Ocorre exatamente uma cara nos pares cara–coroa e coroa–cara, pelo que P(X=1)=2/4=1/2.",
    "hyp": "Pode contar apenas uma ordem.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-variaveis-discretas:12-prob-variaveis-discretas:caras-30",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-030",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-VD-041",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "Se P(X=0)=1/6, P(X=1)=2/6, P(X=2)=1/6 e P(X=3)=2/6, então E(X)=...",
    "o": [
      "5/3.",
      "3/2.",
      "2.",
      "7/6."
    ],
    "a": 0,
    "sol": "0×1/6+1×2/6+2×1/6+3×2/6=(2+2+6)/6=10/6=5/3.",
    "hyp": "Pode fazer média simples dos valores.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-variaveis-discretas:12-prob-variaveis-discretas:esperanca-41",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-041",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12PROB-VD-011",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "Como se calcula E(X) para uma variável aleatória X com um conjunto finito de valores possíveis?",
    "o": [
      "ΣP(X=x).",
      "Σx.",
      "ΣxP(X=x).",
      "o valor mais provável sempre."
    ],
    "a": 2,
    "sol": "É a média ponderada dos valores possíveis pelas respetivas probabilidades.",
    "hyp": "Pode confundir valor esperado com moda.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-prob-variaveis-discretas:12-prob-variaveis-discretas:esperanca-11",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-011",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12RAE-BIS-027",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "Numa iteração da bisseção, o intervalo é [a,b] e o seu ponto médio é m. Se f(a)<0<f(b) e f(m)=−0,1, qual é a atualização correta?",
    "o": [
      "substituímos b por m.",
      "terminamos.",
      "substituímos a por m.",
      "trocamos a e b."
    ],
    "a": 2,
    "sol": "Os valores f(m) e f(a) são negativos e f(b) é positivo. Mantém-se o subintervalo [m,b], onde f continua a ter sinais opostos nos extremos.",
    "hyp": "Pode escolher o extremo oposto.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-bissecao:12-rae-bissecao:atualizacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-027",
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
    "id": "EX-VN12RAE-BIS-011",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "O intervalo inicial tem amplitude L₀. Depois de n iterações do método da bisseção que reduzem o intervalo a metade, qual é a sua amplitude?",
    "o": [
      "L0/n.",
      "2^nL0.",
      "L0/2^n.",
      "L0−n."
    ],
    "a": 2,
    "sol": "Cada iteração divide a amplitude por 2.",
    "hyp": "Pode usar decrescimento linear.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-bissecao:12-rae-bissecao:formula-amplitude",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-011",
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
      "avaliar f num ponto entre 1 e 2, por exemplo 1,5.",
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
    "id": "EX-VN12RAE-BL-048",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bolzano-localizacao",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes",
    "q": "Quanto menor a amplitude de um intervalo que sabemos conter uma única raiz...",
    "o": [
      "menos sabemos sobre a raiz.",
      "maior é o erro máximo inevitável.",
      "mais provável é não haver raiz.",
      "mais precisa é a localização."
    ],
    "a": 3,
    "sol": "Um intervalo menor restringe mais a posição da raiz.",
    "hyp": "Pode inverter a noção de precisão.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-bolzano-localizacao:12-rae-bolzano-localizacao:precisao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BL-048",
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
      "a raiz é exatamente 1,5.",
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
    "id": "EX-VN12RAE-NEW-024",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "A aproximação 13/6≈2,1667 está...",
    "o": [
      "mais longe da raiz 2.",
      "exatamente na raiz.",
      "na raiz −2.",
      "mais perto da raiz 2 do que x0=3."
    ],
    "a": 3,
    "sol": "O erro passou de 1 para cerca de 0,1667.",
    "hyp": "Pode ignorar qual raiz está a ser aproximada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-newton:12-rae-newton:melhoria",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-024",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12RAE-NEW-043",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "Um método híbrido bisseção+Newton pode ser útil para...",
    "o": [
      "eliminar todas as avaliações de f.",
      "evitar qualquer derivada sempre.",
      "combinar garantia de intervalo com rapidez local.",
      "obter solução simbólica exata."
    ],
    "a": 2,
    "sol": "A bisseção mantém robustez e Newton acelera quando seguro.",
    "hyp": "Pode pensar que os métodos são incompatíveis.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-newton:12-rae-newton:hibrido",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-043",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "EX-VN12RAE-NEW-011",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "No método de Newton, se f′(xₙ)≠0, como se determina geometricamente a aproximação xₙ₊₁?",
    "o": [
      "O ponto médio entre xₙ e a ordenada f(xₙ).",
      "A ordenada da interseção da tangente com Oy.",
      "A abcissa da interseção da tangente com Ox.",
      "O declive da tangente no ponto de abcissa xₙ."
    ],
    "a": 2,
    "sol": "Traça-se a tangente ao gráfico no ponto (xₙ,f(xₙ)). No ponto em que a tangente corta o eixo Ox, a ordenada é zero e a abcissa é a aproximação seguinte xₙ₊₁.",
    "hyp": "Pode confundir abcissa e ordenada.",
    "contexts": [
      "exam"
    ],
    "signature": "exam:12-rae-newton:12-rae-newton:geometria",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-011",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  }
];
