// Gerado por scripts/generate-vnext-diagnostic.mjs. Não editar manualmente.
// Duas perguntas originais e compactas por submatéria: âncora intermédia + aprofundamento base.
// Permanecem protótipos até revisão pedagógica; productionEligible continua false.
export const VNEXT_DIAGNOSTIC_QUESTIONS=[
  {
    "id": "DG-VN10ELE-BOR-016",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Método de Borda",
    "q": "Com três candidatos, Borda 3-2-1 e 20 eleitores, qual tem de ser a soma das pontuações finais dos três candidatos?",
    "o": [
      "100",
      "110",
      "140",
      "120"
    ],
    "a": 3,
    "sol": "Cada eleitor distribui 3+2+1=6 pontos. Com 20 eleitores, a soma global é 20×6=120.",
    "hyp": "Pode não usar a conservação do total de pontos para validar resultados.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ele-borda:anchor:10-ele-borda:soma-global",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-016",
    "sourceFile": "content/vnext/math-a/10/10-ele-borda.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10ELE-BOR-001",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Método de Borda",
    "q": "Num método de Borda com três candidatos, cada eleitor ordena os candidatos e atribuem-se 3 pontos ao 1.º, 2 ao 2.º e 1 ao 3.º. O vencedor é...",
    "o": [
      "o candidato com maior soma de pontos.",
      "o candidato com mais votos em último lugar.",
      "sempre quem tiver mais primeiros lugares.",
      "o candidato com menor soma de pontos."
    ],
    "a": 0,
    "sol": "No método de Borda somam-se os pontos associados às posições de todos os boletins; vence a maior pontuação total.",
    "hyp": "Pode reduzir o método de Borda à contagem de primeiros lugares.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ele-borda:probe:10-ele-borda:definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-001",
    "sourceFile": "content/vnext/math-a/10/10-ele-borda.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10ELE-DHO-010",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Método de D'Hondt",
    "q": "Para A=1300, B=950, C=520 e 5 mandatos, qual é o quociente que atribui o 5.º mandato?",
    "o": [
      "650 de A",
      "475 de B",
      "520 de C",
      "433,33... de A"
    ],
    "a": 1,
    "sol": "Após 1300(A), 950(B), 650(A) e 520(C), o 5.º maior é 950÷2=475, de B.",
    "hyp": "Pode parar a ordenação antes do último lugar ou usar apenas primeiros quocientes.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ele-dhondt:anchor:10-ele-dhondt:quociente-limite",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-010",
    "sourceFile": "content/vnext/math-a/10/10-ele-dhondt.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10ELE-DHO-001",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Método de D'Hondt",
    "q": "No método de D'Hondt, os votos de cada lista são sucessivamente divididos por...",
    "o": [
      "1, 2, 3, 4, ...",
      "2, 4, 6, 8, ...",
      "1, 3, 5, 7, ...",
      "10, 100, 1000, ..."
    ],
    "a": 0,
    "sol": "Os quocientes de D'Hondt obtêm-se dividindo os votos de cada lista por 1, 2, 3, 4, ...",
    "hyp": "Pode confundir a sequência de divisores de D'Hondt com outras regras de partilha.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ele-dhondt:probe:10-ele-dhondt:definicao-divisores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-001",
    "sourceFile": "content/vnext/math-a/10/10-ele-dhondt.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10ELE-MAJ-006",
    "themeId": "10-ele",
    "subtopicId": "10-ele-majorias",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Maioria simples e maioria absoluta",
    "q": "Numa eleição com 200 votos válidos, a candidata A obteve 98, B obteve 72 e C obteve 30. Qual afirmação é correta?",
    "o": [
      "A venceu por maioria absoluta.",
      "A venceu por maioria simples, mas não absoluta.",
      "B venceu por maioria simples.",
      "Não existe vencedor por maioria simples."
    ],
    "a": 1,
    "sol": "A tem mais votos do que os restantes, por isso vence por maioria simples. Para maioria absoluta precisaria de mais de 100 votos.",
    "hyp": "Pode assumir que o primeiro classificado tem sempre maioria absoluta.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ele-majorias:anchor:10-ele-majorias:simples-sem-absoluta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-MAJ-006",
    "sourceFile": "content/vnext/math-a/10/10-ele-majorias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10ELE-MAJ-001",
    "themeId": "10-ele",
    "subtopicId": "10-ele-majorias",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Maioria simples e maioria absoluta",
    "q": "Numa eleição por maioria simples, qual é a regra usada para determinar o vencedor?",
    "o": [
      "Vence quem tiver mais votos do que qualquer outro candidato.",
      "Vence apenas quem ultrapassar metade dos votos válidos.",
      "Vence o candidato com menos votos nulos.",
      "Vence sempre quem ficar acima de 40%."
    ],
    "a": 0,
    "sol": "Na maioria simples basta obter mais votos do que cada adversário; não é necessário ultrapassar 50%.",
    "hyp": "Pode confundir maioria simples com maioria absoluta.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ele-majorias:probe:10-ele-majorias:definicao-simples",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-MAJ-001",
    "sourceFile": "content/vnext/math-a/10/10-ele-majorias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10ELE-STL-006",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Usa St. Laguë (1,3,5,...). Há 4 mandatos e votos A=1000, B=800, C=600. Qual é a distribuição?",
    "o": [
      "A:1, B:2, C:1",
      "A:2, B:1, C:1",
      "A:2, B:2, C:0",
      "A:3, B:1, C:0"
    ],
    "a": 1,
    "sol": "Os quatro maiores quocientes são 1000(A), 800(B), 600(C) e 333,33...(A). Resultado 2-1-1.",
    "hyp": "Pode usar os quocientes de D'Hondt ou repartir apenas pela ordem dos votos.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ele-stlague-comparacao:anchor:10-ele-stlague-comparacao:alocacao-3-listas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-006",
    "sourceFile": "content/vnext/math-a/10/10-ele-stlague-comparacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10ELE-STL-001",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Nesta versão do método de St. Laguë usam-se os divisores...",
    "o": [
      "1, 3, 5, 7, ...",
      "1, 2, 3, 4, ...",
      "2, 4, 6, 8, ...",
      "1, 4, 9, 16, ..."
    ],
    "a": 0,
    "sol": "St. Laguë usa a sequência dos ímpares 1,3,5,7,... para formar os quocientes.",
    "hyp": "Pode confundir St. Laguë com D'Hondt.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ele-stlague-comparacao:probe:10-ele-stlague-comparacao:definicao-divisores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-001",
    "sourceFile": "content/vnext/math-a/10/10-ele-stlague-comparacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10EST-AMO-008",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "Uma população tem alunos do 10.º, 11.º e 12.º. Para garantir presença dos três anos, uma estratégia útil é...",
    "o": [
      "escolher apenas o 12.º ano.",
      "escolher só a primeira turma disponível.",
      "inquirir apenas alunos voluntários.",
      "amostragem estratificada por ano."
    ],
    "a": 3,
    "sol": "Estratificar permite assegurar representação de subgrupos relevantes.",
    "hyp": "Pode ignorar grupos importantes da população.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-est-amostragem:anchor:10-est-amostragem:estratificada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-008",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10EST-AMO-001",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "Uma amostra é representativa quando...",
    "o": [
      "reflete de forma razoável características relevantes da população.",
      "é sempre muito pequena.",
      "contém apenas voluntários.",
      "tem exatamente 100 elementos."
    ],
    "a": 0,
    "sol": "Uma amostra representativa procura refletir a diversidade relevante da população.",
    "hyp": "Pode confundir representatividade com tamanho fixo.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-est-amostragem:probe:10-est-amostragem:representatividade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-001",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10EST-BIV-011",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "Os pares (1,2),(2,4),(3,6),(4,8) apresentam que padrão?",
    "o": [
      "Linear negativo perfeito.",
      "Sem tendência.",
      "Linear positivo perfeito.",
      "Curvo."
    ],
    "a": 2,
    "sol": "Todos os pontos pertencem a y=2x.",
    "hyp": "Pode não reconhecer alinhamento exato crescente.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-est-bivariados-regressao:anchor:10-est-bivariados-regressao:padrao-linear-perfeito",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-011",
    "sourceFile": "content/vnext/math-a/10/10-est-bivariados-regressao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10EST-BIV-001",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "Dados bivariados correspondem a...",
    "o": [
      "duas variáveis observadas em cada unidade estatística.",
      "duas amostras sem relação.",
      "uma variável com duas modas.",
      "dois gráficos da mesma variável."
    ],
    "a": 0,
    "sol": "Em dados bivariados, cada unidade fornece um par (x,y).",
    "hyp": "Pode confundir duas variáveis emparelhadas com dois conjuntos independentes.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-est-bivariados-regressao:probe:10-est-bivariados-regressao:definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-001",
    "sourceFile": "content/vnext/math-a/10/10-est-bivariados-regressao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10EST-DIS-009",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "Os dados 2,4,6 têm média 4. Quais são os desvios à média?",
    "o": [
      "−2,0,2",
      "2,4,6",
      "−4,0,4",
      "2,0,−2"
    ],
    "a": 0,
    "sol": "Subtrai-se 4 a cada valor: −2,0,2.",
    "hyp": "Pode usar valores absolutos ou inverter sinais.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-est-dispersao:anchor:10-est-dispersao:desvios-media",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-009",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10EST-DIS-001",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "A amplitude de um conjunto de dados é...",
    "o": [
      "máximo−mínimo.",
      "média−mediana.",
      "soma dos valores.",
      "maior frequência."
    ],
    "a": 0,
    "sol": "Amplitude=max−min.",
    "hyp": "Pode confundir amplitude com média ou frequência.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-est-dispersao:probe:10-est-dispersao:amplitude-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-001",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10EST-LOC-015",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Medidas de localização",
    "q": "A média de 4 valores é 10. Qual é a soma desses valores?",
    "o": [
      "10",
      "20",
      "40",
      "30"
    ],
    "a": 2,
    "sol": "Soma=média×n=10×4=40.",
    "hyp": "Pode confundir média com soma.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-est-localizacao:anchor:10-est-localizacao:soma-a-partir-media",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-015",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10EST-LOC-001",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Medidas de localização",
    "q": "A média aritmética de um conjunto de valores é...",
    "o": [
      "a soma dos valores dividida pelo número de valores.",
      "sempre o valor mais frequente.",
      "o valor central depois de ordenar.",
      "a diferença entre máximo e mínimo."
    ],
    "a": 0,
    "sol": "A média é soma/número de observações.",
    "hyp": "Pode confundir média com moda, mediana ou amplitude.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-est-localizacao:probe:10-est-localizacao:media-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-001",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10EST-PPA-010",
    "themeId": "10-est",
    "subtopicId": "10-est-problema-pop-amostra",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Problema estatístico, variabilidade, população, amostra e variável",
    "q": "Num estudo sobre o meio de transporte usado para ir à escola, qual é a natureza da variável?",
    "o": [
      "Quantitativa contínua.",
      "Qualitativa.",
      "Quantitativa discreta.",
      "Uma constante."
    ],
    "a": 1,
    "sol": "Carro, autocarro, a pé, etc. são categorias.",
    "hyp": "Pode tentar ordenar numericamente categorias sem significado quantitativo.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-est-problema-pop-amostra:anchor:10-est-problema-pop-amostra:tipo-qualitativa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-PPA-010",
    "sourceFile": "content/vnext/math-a/10/10-est-problema-pop-amostra.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10EST-PPA-001",
    "themeId": "10-est",
    "subtopicId": "10-est-problema-pop-amostra",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Problema estatístico, variabilidade, população, amostra e variável",
    "q": "Num estudo estatístico, o que é a população?",
    "o": [
      "O conjunto total de indivíduos/elementos sobre os quais se pretende estudar uma característica.",
      "Apenas os elementos efetivamente observados.",
      "A média dos dados.",
      "Uma representação gráfica."
    ],
    "a": 0,
    "sol": "A população é o conjunto de referência do estudo.",
    "hyp": "Pode confundir população com amostra.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-est-problema-pop-amostra:probe:10-est-problema-pop-amostra:definicao-populacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-PPA-001",
    "sourceFile": "content/vnext/math-a/10/10-est-problema-pop-amostra.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10EST-UNI-006",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Dados univariados e representações",
    "q": "As frequências absolutas de quatro categorias são 4, 6, 5 e 5. Qual é o total de observações?",
    "o": [
      "15",
      "20",
      "18",
      "24"
    ],
    "a": 1,
    "sol": "4+6+5+5=20.",
    "hyp": "Pode calcular média das frequências em vez da soma.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-est-univariados-representacoes:anchor:10-est-univariados-representacoes:total-frequencias",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-006",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10EST-UNI-001",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Dados univariados e representações",
    "q": "Numa tabela de frequências, a frequência absoluta de um valor indica...",
    "o": [
      "quantas vezes esse valor ocorre.",
      "a percentagem acumulada.",
      "a média dos dados.",
      "o maior valor."
    ],
    "a": 0,
    "sol": "A frequência absoluta é a contagem de ocorrências.",
    "hyp": "Pode confundir contagem com percentagem.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-est-univariados-representacoes:probe:10-est-univariados-representacoes:freq-absoluta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-001",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FIN-BRL-018",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Um trabalhador recebe 1 360 € líquidos depois de descontos iguais a 15% do bruto. Qual é o bruto?",
    "o": [
      "1 500 €",
      "1 600 €",
      "1 550 €",
      "1 650 €"
    ],
    "a": 1,
    "sol": "O líquido representa 85% do bruto. Bruto=1 360/0,85=1 600 €.",
    "hyp": "Pode somar 15% ao líquido em vez de inverter a percentagem restante.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fin-bruto-liquido:anchor:10-fin-bruto-liquido:reconstruir-bruto-percentagem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-018",
    "sourceFile": "content/vnext/math-a/10/10-fin-bruto-liquido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FIN-BRL-001",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Qual é a diferença entre salário bruto e salário líquido?",
    "o": [
      "O bruto é o valor antes dos descontos; o líquido é o valor após os descontos.",
      "O líquido é sempre maior do que o bruto.",
      "O bruto é apenas o valor por hora.",
      "Não existe diferença."
    ],
    "a": 0,
    "sol": "O salário bruto corresponde ao valor antes das deduções; o líquido é o valor que resta depois das deduções consideradas.",
    "hyp": "Pode inverter os conceitos de bruto e líquido.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fin-bruto-liquido:probe:10-fin-bruto-liquido:definicao-bruto-liquido",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-001",
    "sourceFile": "content/vnext/math-a/10/10-fin-bruto-liquido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FIN-IRS-013",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Numa tabela em que o segundo escalão tem taxa marginal de 20%, quanto aumenta o imposto se o rendimento subir 100 € dentro desse escalão?",
    "o": [
      "20 €",
      "10 €",
      "30 €",
      "100 €"
    ],
    "a": 0,
    "sol": "20% de 100 € = 20 €.",
    "hyp": "Pode recalcular todo o imposto em vez de olhar para a parcela adicional.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fin-irs:anchor:10-fin-irs:incremento-marginal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-013",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FIN-IRS-001",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Numa tabela progressiva por escalões, o que significa uma taxa marginal de 20% num certo escalão?",
    "o": [
      "Aplica-se apenas à parcela do rendimento situada nesse escalão.",
      "Aplica-se sempre ao rendimento total.",
      "É igual à taxa efetiva de todos os contribuintes.",
      "Significa pagar 20 € de imposto."
    ],
    "a": 0,
    "sol": "A taxa marginal incide sobre a parcela do rendimento que cai nesse escalão.",
    "hyp": "Pode confundir taxa marginal com taxa efetiva ou com uma taxa única.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fin-irs:probe:10-fin-irs:marginal-conceito",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-001",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FIN-JC-011",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "Um montante de 1 210 € resulta de 1 000 € aplicados durante 2 anos a uma taxa anual composta constante. Qual é essa taxa?",
    "o": [
      "5%",
      "15%",
      "10%",
      "21%"
    ],
    "a": 2,
    "sol": "1210/1000=1,21=1,1², logo i=10%.",
    "hyp": "Pode tomar 21% como taxa anual em vez de crescimento acumulado.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fin-juro-composto-credito:anchor:10-fin-juro-composto-credito:inverter-taxa-dois-periodos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-011",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FIN-JC-001",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "No regime de juro composto, os juros de cada período são calculados sobre...",
    "o": [
      "o capital acumulado, incluindo juros anteriores.",
      "apenas o capital inicial.",
      "apenas os juros anteriores.",
      "uma média dos montantes."
    ],
    "a": 0,
    "sol": "No juro composto, os juros são incorporados no capital e passam também a render.",
    "hyp": "Pode confundir juro composto com juro simples.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fin-juro-composto-credito:probe:10-fin-juro-composto-credito:definicao-capitalizacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-001",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FIN-JS-013",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Juro simples",
    "q": "Um capital gera 100 € de juro em 1 ano a uma taxa simples de 5%. Qual era o capital?",
    "o": [
      "2 000 €",
      "1 000 €",
      "1 500 €",
      "2 500 €"
    ],
    "a": 0,
    "sol": "C=J/(i n)=100/0,05=2000 €.",
    "hyp": "Pode dividir pela percentagem escrita como 5 em vez de 0,05.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fin-juro-simples:anchor:10-fin-juro-simples:inverter-capital",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-013",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FIN-JS-001",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Juro simples",
    "q": "No regime de juro simples, os juros de cada período são calculados sobre...",
    "o": [
      "o capital inicial.",
      "o montante acumulado até esse momento.",
      "apenas os juros anteriores.",
      "uma média aleatória."
    ],
    "a": 0,
    "sol": "No juro simples, a base de cálculo mantém-se no capital inicial.",
    "hyp": "Pode confundir juro simples com juro composto.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fin-juro-simples:probe:10-fin-juro-simples:definicao-base",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-001",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FIN-SAL-013",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Se uma remuneração anual de 16 800 € for paga em 12 prestações, cada uma vale 1 400 €. Se for repartida em 14 prestações iguais, quanto vale cada uma?",
    "o": [
      "1 200 €",
      "1 000 €",
      "1 100 €",
      "1 300 €"
    ],
    "a": 0,
    "sol": "16 800÷14=1 200 €.",
    "hyp": "Pode concluir que mais prestações aumentam o total anual.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fin-salarios:anchor:10-fin-salarios:mesmo-anual-diferentes-prestacoes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-013",
    "sourceFile": "content/vnext/math-a/10/10-fin-salarios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FIN-SAL-001",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Uma pessoa recebe 950 € por mês durante 12 meses. Qual é o salário anual correspondente?",
    "o": [
      "11 400 €",
      "10 400 €",
      "11 900 €",
      "12 400 €"
    ],
    "a": 0,
    "sol": "950×12=11 400 €.",
    "hyp": "Pode multiplicar pelo número errado de meses.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fin-salarios:probe:10-fin-salarios:mensal-para-anual-12",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-001",
    "sourceFile": "content/vnext/math-a/10/10-fin-salarios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FUN-AF-013",
    "themeId": "10-fun",
    "subtopicId": "10-fun-afim",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Função afim e modelação",
    "q": "A reta passa por (0,3) e (2,7). Qual é o declive?",
    "o": [
      "2",
      "1",
      "3",
      "4"
    ],
    "a": 0,
    "sol": "(7−3)/(2−0)=2.",
    "hyp": "Pode dividir variação de x por variação de y.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fun-afim:anchor:10-fun-afim:declive-dois-pontos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-AF-013",
    "sourceFile": "content/vnext/math-a/10/10-fun-afim.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FUN-AF-001",
    "themeId": "10-fun",
    "subtopicId": "10-fun-afim",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função afim e modelação",
    "q": "Uma função afim tem a forma...",
    "o": [
      "f(x)=ax+b.",
      "f(x)=ax²+b.",
      "f(x)=a/x+b.",
      "f(x)=|x|+b."
    ],
    "a": 0,
    "sol": "A forma geral de uma função afim é ax+b.",
    "hyp": "Pode confundir função afim com quadrática ou racional.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fun-afim:probe:10-fun-afim:forma-geral",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-AF-001",
    "sourceFile": "content/vnext/math-a/10/10-fun-afim.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FUN-CR-013",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Conceito de função e representações",
    "q": "Se f(x)=3x−2, quanto vale f(0)?",
    "o": [
      "−2",
      "0",
      "1",
      "2"
    ],
    "a": 0,
    "sol": "f(0)=−2.",
    "hyp": "Pode ignorar o termo independente.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fun-conceito-representacoes:anchor:10-fun-conceito-representacoes:avaliar-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-013",
    "sourceFile": "content/vnext/math-a/10/10-fun-conceito-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FUN-CR-001",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Conceito de função e representações",
    "q": "Uma função associa a cada elemento do domínio...",
    "o": [
      "exatamente um valor de saída.",
      "sempre dois valores de saída.",
      "nenhum valor de saída.",
      "todos os valores do contradomínio."
    ],
    "a": 0,
    "sol": "A característica essencial de uma função é a unicidade da imagem de cada elemento do domínio.",
    "hyp": "Pode confundir função com uma relação arbitrária.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fun-conceito-representacoes:probe:10-fun-conceito-representacoes:definicao-funcao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-001",
    "sourceFile": "content/vnext/math-a/10/10-fun-conceito-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FUN-DIZ-010",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Domínio, contradomínio/imagem, zeros e sinal",
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
      "diagnostic"
    ],
    "signature": "diagnostic:10-fun-dominio-imagem-zeros:anchor:10-fun-dominio-imagem-zeros:sinal-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-DIZ-010",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FUN-DIZ-001",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Domínio, contradomínio/imagem, zeros e sinal",
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
      "diagnostic"
    ],
    "signature": "diagnostic:10-fun-dominio-imagem-zeros:probe:10-fun-dominio-imagem-zeros:dominio-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-DIZ-001",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FUN-QUA-019",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "Se os zeros de uma quadrática são 2 e 5 e a=1, uma expressão possível é...",
    "o": [
      "f(x)=(x+2)(x+5).",
      "f(x)=x²+7.",
      "f(x)=(x−2)(x−5).",
      "f(x)=x−10."
    ],
    "a": 2,
    "sol": "Fatores x−raiz produzem os zeros dados.",
    "hyp": "Pode trocar sinais.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fun-quadratica:anchor:10-fun-quadratica:forma-fatorizada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-019",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FUN-QUA-001",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "Uma função quadrática tem a forma...",
    "o": [
      "f(x)=ax²+bx+c, com a≠0.",
      "f(x)=ax+b.",
      "f(x)=a/x.",
      "f(x)=|x|+b."
    ],
    "a": 0,
    "sol": "O termo de grau 2 com coeficiente não nulo caracteriza a função quadrática.",
    "hyp": "Pode confundir quadrática com afim.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fun-quadratica:probe:10-fun-quadratica:forma-geral",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-001",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FUN-TRM-007",
    "themeId": "10-fun",
    "subtopicId": "10-fun-transformacoes-ramos-modulo",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Transformações de gráficos, funções por ramos e módulo",
    "q": "Se f(x)=x², qual é g(x)=f(x)+4?",
    "o": [
      "(x+4)²",
      "x²−4",
      "x²+4",
      "4x²"
    ],
    "a": 2,
    "sol": "A transformação soma 4 à saída: g(x)=x²+4.",
    "hyp": "Pode colocar a translação dentro do argumento.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fun-transformacoes-ramos-modulo:anchor:10-fun-transformacoes-ramos-modulo:aplicar-translacao-vertical",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-TRM-007",
    "sourceFile": "content/vnext/math-a/10/10-fun-transformacoes-ramos-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10FUN-TRM-001",
    "themeId": "10-fun",
    "subtopicId": "10-fun-transformacoes-ramos-modulo",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Transformações de gráficos, funções por ramos e módulo",
    "q": "O gráfico de g(x)=f(x)+3 obtém-se do gráfico de f por uma translação...",
    "o": [
      "3 unidades para cima.",
      "3 unidades para baixo.",
      "3 unidades para a direita.",
      "3 unidades para a esquerda."
    ],
    "a": 0,
    "sol": "Somar 3 aos valores da função desloca todas as ordenadas 3 unidades para cima.",
    "hyp": "Pode confundir transformação vertical com horizontal.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-fun-transformacoes-ramos-modulo:probe:10-fun-transformacoes-ramos-modulo:translacao-vertical",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-TRM-001",
    "sourceFile": "content/vnext/math-a/10/10-fun-transformacoes-ramos-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GA-RET-014",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Colinearidade e equações de retas",
    "q": "Qual é a equação da reta de declive 2 que passa por (0,3)?",
    "o": [
      "y=3x+2.",
      "y=2x+3.",
      "y=2x−3.",
      "x=3."
    ],
    "a": 1,
    "sol": "A ordenada na origem é 3.",
    "hyp": "Pode trocar parâmetros.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ga-colinearidade-retas:anchor:10-ga-colinearidade-retas:equacao-reta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-014",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GA-RET-001",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Colinearidade e equações de retas",
    "q": "Três pontos A,B,C são colineares quando...",
    "o": [
      "pertencem à mesma reta.",
      "têm a mesma ordenada sempre.",
      "têm a mesma abcissa sempre.",
      "formam um triângulo."
    ],
    "a": 0,
    "sol": "Colinearidade significa pertença a uma mesma reta.",
    "hyp": "Pode reduzir colinearidade a casos horizontais ou verticais.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ga-colinearidade-retas:probe:10-ga-colinearidade-retas:colinearidade-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-001",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GA-CT-014",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Coordenadas e transformações no plano",
    "q": "Qual é o simétrico de A=(3,−5) relativamente ao eixo Oy?",
    "o": [
      "(3,5).",
      "(−3,−5).",
      "(−3,5).",
      "(5,−3)."
    ],
    "a": 1,
    "sol": "Muda o sinal de x e mantém y.",
    "hyp": "Pode refletir no eixo errado.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ga-coordenadas-transformacoes:anchor:10-ga-coordenadas-transformacoes:simetria-Oy",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-014",
    "sourceFile": "content/vnext/math-a/10/10-ga-coordenadas-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GA-CT-001",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Coordenadas e transformações no plano",
    "q": "Num referencial cartesiano do plano, um ponto P=(x,y) é determinado por...",
    "o": [
      "duas coordenadas.",
      "uma única coordenada.",
      "três coordenadas.",
      "apenas a distância à origem."
    ],
    "a": 0,
    "sol": "No plano cartesiano, cada ponto é descrito por uma abcissa x e uma ordenada y.",
    "hyp": "Pode confundir plano com espaço.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ga-coordenadas-transformacoes:probe:10-ga-coordenadas-transformacoes:coordenadas-plano",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-001",
    "sourceFile": "content/vnext/math-a/10/10-ga-coordenadas-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GA-DPM-011",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Distâncias e ponto médio",
    "q": "A distância entre A=(a,0) e B=(0,b) é...",
    "o": [
      "a+b.",
      "|a−b|.",
      "√(a²+b²).",
      "ab."
    ],
    "a": 2,
    "sol": "As diferenças são −a e b; pelos quadrados obtém-se √(a²+b²).",
    "hyp": "Pode somar coordenadas sem Pitágoras.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ga-distancias-ponto-medio:anchor:10-ga-distancias-ponto-medio:distancia-eixos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-011",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GA-DPM-001",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Distâncias e ponto médio",
    "q": "A distância entre A=(x1,y1) e B=(x2,y2) é dada por...",
    "o": [
      "√[(x2−x1)²+(y2−y1)²].",
      "|x2−x1|+|y2−y1| sempre.",
      "(x1+x2)/2.",
      "(y1+y2)/2."
    ],
    "a": 0,
    "sol": "A fórmula resulta do Teorema de Pitágoras aplicado às diferenças de coordenadas.",
    "hyp": "Pode confundir distância com ponto médio.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ga-distancias-ponto-medio:probe:10-ga-distancias-ponto-medio:formula-distancia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-001",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GA-ESP-006",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "Se A=(1,2,3) e B=(4,6,5), então AB=",
    "o": [
      "(5,8,8).",
      "(3,4,2).",
      "(−3,−4,−2).",
      "(3,2,4)."
    ],
    "a": 1,
    "sol": "Subtraindo coordenadas: (3,4,2).",
    "hyp": "Pode somar ou trocar componentes.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ga-espaco:anchor:10-ga-espaco:vetor-AB",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-006",
    "sourceFile": "content/vnext/math-a/10/10-ga-espaco.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GA-ESP-001",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "No espaço cartesiano, um ponto P é representado por...",
    "o": [
      "três coordenadas (x,y,z).",
      "duas coordenadas.",
      "uma coordenada.",
      "quatro coordenadas obrigatoriamente."
    ],
    "a": 0,
    "sol": "No espaço tridimensional usam-se três coordenadas.",
    "hyp": "Pode confundir plano com espaço.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ga-espaco:probe:10-ga-espaco:coordenadas-espaco",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-001",
    "sourceFile": "content/vnext/math-a/10/10-ga-espaco.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GA-LG-018",
    "themeId": "10-ga",
    "subtopicId": "10-ga-lugares-geometricos",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica",
    "q": "Para A=(−2,0) e B=(2,0), a mediatriz de AB é...",
    "o": [
      "y=0.",
      "x=0.",
      "x=2.",
      "y=2."
    ],
    "a": 1,
    "sol": "AB é horizontal e o ponto médio é a origem; a mediatriz é vertical.",
    "hyp": "Pode escolher a reta AB.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ga-lugares-geometricos:anchor:10-ga-lugares-geometricos:mediatriz-coordenadas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-LG-018",
    "sourceFile": "content/vnext/math-a/10/10-ga-lugares-geometricos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GA-LG-001",
    "themeId": "10-ga",
    "subtopicId": "10-ga-lugares-geometricos",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica",
    "q": "O lugar geométrico dos pontos do plano à mesma distância de A e B é...",
    "o": [
      "a mediatriz de AB.",
      "a reta AB.",
      "uma circunferência de centro A.",
      "o eixo Ox."
    ],
    "a": 0,
    "sol": "A mediatriz reúne os pontos equidistantes dos extremos do segmento.",
    "hyp": "Pode confundir distância a dois pontos com pertença à reta que os une.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-ga-lugares-geometricos:probe:10-ga-lugares-geometricos:mediatriz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-LG-001",
    "sourceFile": "content/vnext/math-a/10/10-ga-lugares-geometricos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GA-VET-006",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Vetores, coordenadas, norma e operações",
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
      "diagnostic"
    ],
    "signature": "diagnostic:10-ga-vetores:anchor:10-ga-vetores:norma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-006",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GA-VET-001",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Vetores, coordenadas, norma e operações",
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
      "diagnostic"
    ],
    "signature": "diagnostic:10-ga-vetores:probe:10-ga-vetores:componentes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-001",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GS-BAR-009",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Baricentro e propriedades das medianas",
    "q": "Se G é baricentro na mediana AM e AG=8, então GM=",
    "o": [
      "4",
      "2",
      "6",
      "8"
    ],
    "a": 0,
    "sol": "AG:GM=2:1, logo GM=4.",
    "hyp": "Pode pensar que as duas partes são iguais.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-gs-baricentro-medianas:anchor:10-gs-baricentro-medianas:razao-2-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-009",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GS-BAR-001",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Baricentro e propriedades das medianas",
    "q": "O baricentro de um triângulo é o ponto de interseção das...",
    "o": [
      "medianas.",
      "alturas.",
      "mediatrizes.",
      "bissetrizes."
    ],
    "a": 0,
    "sol": "As três medianas são concorrentes no baricentro.",
    "hyp": "Pode confundir os centros notáveis.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-gs-baricentro-medianas:probe:10-gs-baricentro-medianas:baricentro-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-001",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GS-CI-013",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Circuncentro e incentro",
    "q": "Num triângulo retângulo com hipotenusa 10 cm, qual é o raio da circunferência circunscrita?",
    "o": [
      "5 cm",
      "2,5 cm",
      "10 cm",
      "20 cm"
    ],
    "a": 0,
    "sol": "O circuncentro é o ponto médio da hipotenusa; o raio é metade de 10, ou seja, 5.",
    "hyp": "Pode usar a hipotenusa inteira como raio.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-gs-circuncentro-incentro:anchor:10-gs-circuncentro-incentro:raio-circunscrita-retangulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-013",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GS-CI-001",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Circuncentro e incentro",
    "q": "O circuncentro de um triângulo é o ponto de interseção das...",
    "o": [
      "mediatrizes dos lados.",
      "bissetrizes internas.",
      "medianas.",
      "alturas."
    ],
    "a": 0,
    "sol": "As três mediatrizes dos lados são concorrentes no circuncentro.",
    "hyp": "Pode confundir os quatro centros notáveis.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-gs-circuncentro-incentro:probe:10-gs-circuncentro-incentro:circuncentro-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-001",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GS-E9-015",
    "themeId": "10-gs",
    "subtopicId": "10-gs-euler-nove-pontos",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Localização dos centros, reta de Euler e circunferência dos nove pontos",
    "q": "Se OG=4 cm, quanto mede OH?",
    "o": [
      "8 cm",
      "10 cm",
      "12 cm",
      "16 cm"
    ],
    "a": 2,
    "sol": "GH=8 e OH=OG+GH=12; equivalentemente OH=3OG.",
    "hyp": "Pode esquecer uma das partes.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-gs-euler-nove-pontos:anchor:10-gs-euler-nove-pontos:euler-OH",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-E9-015",
    "sourceFile": "content/vnext/math-a/10/10-gs-euler-nove-pontos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GS-E9-001",
    "themeId": "10-gs",
    "subtopicId": "10-gs-euler-nove-pontos",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Localização dos centros, reta de Euler e circunferência dos nove pontos",
    "q": "Num triângulo não equilátero, a reta de Euler contém...",
    "o": [
      "circuncentro, baricentro e ortocentro.",
      "incentro, baricentro e excentro.",
      "apenas os pontos médios.",
      "os três vértices."
    ],
    "a": 0,
    "sol": "Circuncentro O, baricentro G e ortocentro H são colineares na reta de Euler.",
    "hyp": "Pode incluir o incentro, que em geral não pertence à reta de Euler.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-gs-euler-nove-pontos:probe:10-gs-euler-nove-pontos:euler-pontos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-E9-001",
    "sourceFile": "content/vnext/math-a/10/10-gs-euler-nove-pontos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GS-ORT-015",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Ortocentro e alturas",
    "q": "Se duas alturas de um triângulo se intersectam em H, então a terceira altura...",
    "o": [
      "é paralela a ambas.",
      "não existe.",
      "também passa por H.",
      "passa pelo circuncentro obrigatoriamente."
    ],
    "a": 2,
    "sol": "As três alturas são concorrentes.",
    "hyp": "Pode achar que concorrência não é garantida.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-gs-ortocentro:anchor:10-gs-ortocentro:alturas-concorrentes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-015",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GS-ORT-001",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Ortocentro e alturas",
    "q": "O ortocentro de um triângulo é o ponto de interseção das...",
    "o": [
      "alturas.",
      "medianas.",
      "mediatrizes.",
      "bissetrizes."
    ],
    "a": 0,
    "sol": "As três alturas são concorrentes no ortocentro.",
    "hyp": "Pode confundir os centros notáveis.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-gs-ortocentro:probe:10-gs-ortocentro:ortocentro-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-001",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GS-PC-007",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Propriedades geométricas e construções de base",
    "q": "Se P pertence à mediatriz de AB, então...",
    "o": [
      "PA+PB=AB.",
      "PA=AB.",
      "PA=PB.",
      "PB=2PA."
    ],
    "a": 2,
    "sol": "Todo ponto da mediatriz é equidistante de A e B.",
    "hyp": "Pode não associar mediatriz a equidistância.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-gs-propriedades-construcoes:anchor:10-gs-propriedades-construcoes:mediatriz-lugar-geometrico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-007",
    "sourceFile": "content/vnext/math-a/10/10-gs-propriedades-construcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN10GS-PC-001",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Propriedades geométricas e construções de base",
    "q": "Num triângulo, a soma dos ângulos internos é...",
    "o": [
      "180°",
      "90°",
      "270°",
      "360°"
    ],
    "a": 0,
    "sol": "A soma dos ângulos internos de qualquer triângulo euclidiano é 180°.",
    "hyp": "Pode confundir com a soma dos ângulos de um quadrilátero.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:10-gs-propriedades-construcoes:probe:10-gs-propriedades-construcoes:soma-angulos-triangulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-001",
    "sourceFile": "content/vnext/math-a/10/10-gs-propriedades-construcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CD-DP-011",
    "themeId": "11-cd",
    "subtopicId": "11-cd-derivada-ponto",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicacao",
    "focus": "Taxa instantanea e derivada num ponto",
    "q": "Para f(x)=x^2, quanto vale f'(0)?",
    "o": [
      "1",
      "-1",
      "0",
      "2"
    ],
    "a": 2,
    "sol": "Derivando a expressao e substituindo x=0, obtem-se 0.",
    "hyp": "Pode confundir taxa media com derivada, ou substituir incorretamente no quociente incremental.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cd-derivada-ponto:anchor:11-cd-derivada-ponto:calculo:11",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-DP-011",
    "sourceFile": "content/vnext/math-a/11/11-cd-derivada-ponto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CD-DP-001",
    "themeId": "11-cd",
    "subtopicId": "11-cd-derivada-ponto",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensao",
    "focus": "Taxa instantanea e derivada num ponto",
    "q": "A derivada de f no ponto a representa",
    "o": [
      "a taxa instantanea de variacao de f em a",
      "uma taxa media em qualquer intervalo",
      "o valor f(a)",
      "a area acumulada"
    ],
    "a": 0,
    "sol": "A derivada mede a variacao local instantanea.",
    "hyp": "Pode confundir taxa media com derivada, ou substituir incorretamente no quociente incremental.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cd-derivada-ponto:probe:11-cd-derivada-ponto:conceito:1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-DP-001",
    "sourceFile": "content/vnext/math-a/11/11-cd-derivada-ponto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CD-FD-011",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicacao",
    "focus": "Funcao derivada",
    "q": "Se f(x)=x^4, entao f'(x)=",
    "o": [
      "x^4",
      "4x^3+1",
      "4x^3",
      "0"
    ],
    "a": 2,
    "sol": "Derivando termo a termo obtem-se 4x^3.",
    "hyp": "Pode confundir a funcao derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cd-funcao-derivada:anchor:11-cd-funcao-derivada:derivar-polinomio:11",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-011",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CD-FD-001",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensao",
    "focus": "Funcao derivada",
    "q": "A funcao derivada f' associa a cada x do seu dominio",
    "o": [
      "o declive da tangente ao grafico de f nesse x",
      "o valor f(x)",
      "a area sob f",
      "a taxa media desde 0"
    ],
    "a": 0,
    "sol": "A funcao derivada recolhe as taxas instantaneas de variacao.",
    "hyp": "Pode confundir a funcao derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cd-funcao-derivada:probe:11-cd-funcao-derivada:conceito:1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-001",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CD-MO-011",
    "themeId": "11-cd",
    "subtopicId": "11-cd-monotonia-otimizacao",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Interpretacao",
    "focus": "Monotonia, extremos e otimizacao",
    "q": "Se f'(x)=2x, entao junto de x=0 a situacao correta e",
    "o": [
      "decrescente em ]-inf,0[ e crescente em ]0,+inf[",
      "minimo em x=0",
      "decrescente em ]-inf,0[ e crescente em ]0,+inf[; minimo em x=0.",
      "nao se pode concluir nada"
    ],
    "a": 2,
    "sol": "Analisa-se o sinal de f' antes e depois de 0.",
    "hyp": "Pode confundir zeros da derivada com extremos garantidos, ou interpretar incorretamente a mudanca de sinal de f'.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cd-monotonia-otimizacao:anchor:11-cd-monotonia-otimizacao:sinal:11",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-MO-011",
    "sourceFile": "content/vnext/math-a/11/11-cd-monotonia-otimizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CD-MO-001",
    "themeId": "11-cd",
    "subtopicId": "11-cd-monotonia-otimizacao",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensao",
    "focus": "Monotonia, extremos e otimizacao",
    "q": "Sabe-se que f'(x)>0 para todo o x de ]−2,3[. Como varia f nesse intervalo?",
    "o": [
      "crescente nesse intervalo",
      "decrescente",
      "constante",
      "necessariamente positiva"
    ],
    "a": 0,
    "sol": "O sinal positivo da derivada determina crescimento.",
    "hyp": "Pode confundir zeros da derivada com extremos garantidos, ou interpretar incorretamente a mudanca de sinal de f'.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cd-monotonia-otimizacao:probe:11-cd-monotonia-otimizacao:conceito:1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-MO-001",
    "sourceFile": "content/vnext/math-a/11/11-cd-monotonia-otimizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CD-REG-011",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicacao",
    "focus": "Regras de derivacao",
    "q": "Deriva f(x)=x^5.",
    "o": [
      "x^5",
      "5x^4+1",
      "5x^4",
      "0"
    ],
    "a": 2,
    "sol": "Aplicando regra da potencia e linearidade obtem-se 5x^4.",
    "hyp": "Pode aplicar uma regra de derivacao ao objeto errado, esquecer fatores ou confundir produto/quociente com derivacao termo a termo.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cd-regras:anchor:11-cd-regras:potencia:11",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-011",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CD-REG-001",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensao",
    "focus": "Regras de derivacao",
    "q": "A derivada de uma soma f+g e",
    "o": [
      "f'+g'",
      "f'g'",
      "f'+g",
      "fg'"
    ],
    "a": 0,
    "sol": "A derivacao e linear relativamente a soma.",
    "hyp": "Pode aplicar uma regra de derivacao ao objeto errado, esquecer fatores ou confundir produto/quociente com derivacao termo a termo.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cd-regras:probe:11-cd-regras:conceito:1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-001",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CD-TAN-011",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicacao",
    "focus": "Reta tangente e interpretacao geometrica",
    "q": "Para f(x)=x^2, a tangente em x=1 tem equacao",
    "o": [
      "y=2x+1",
      "y=1x+2",
      "y=2x-1",
      "x=1"
    ],
    "a": 2,
    "sol": "Usa-se y-1=2(x-1), que simplifica para y=2x-1.",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cd-tangente:anchor:11-cd-tangente:equacao-tangente:11",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-011",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CD-TAN-001",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensao",
    "focus": "Reta tangente e interpretacao geometrica",
    "q": "A reta tangente ao grafico de f em x=a passa por",
    "o": [
      "(a,f(a))",
      "(a,f'(a))",
      "(f(a),a)",
      "(0,f(a))"
    ],
    "a": 0,
    "sol": "O ponto de tangencia pertence ao grafico.",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cd-tangente:probe:11-cd-tangente:conceito:1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-001",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CD-TM-011",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicacao",
    "focus": "Taxa media de variacao",
    "q": "Para f(x)=x^2, qual e a taxa media de variacao entre x=1 e x=3?",
    "o": [
      "5",
      "3",
      "4",
      "8"
    ],
    "a": 2,
    "sol": "(9-1)/(3-1)=4.",
    "hyp": "Pode confundir variacao total com taxa media ou inverter o quociente.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cd-taxa-media:anchor:11-cd-taxa-media:quadratica:11",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-011",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CD-TM-001",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensao",
    "focus": "Taxa media de variacao",
    "q": "A taxa media de variacao de f entre a e b e",
    "o": [
      "(f(b)-f(a))/(b-a)",
      "(f(a)+f(b))/2",
      "f(b)-f(a)",
      "(b-a)/(f(b)-f(a))"
    ],
    "a": 0,
    "sol": "E a variacao da funcao por unidade de variacao da variavel.",
    "hyp": "Pode confundir variacao total com taxa media ou inverter o quociente.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cd-taxa-media:probe:11-cd-taxa-media:conceito:1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-001",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CONT-AM-013",
    "themeId": "11-cont",
    "subtopicId": "11-cont-adicao-multiplicacao",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Princípios da adição e multiplicação",
    "q": "Uma senha tem 3 posições binárias (0 ou 1). Quantas senhas?",
    "o": [
      "8.",
      "6.",
      "3.",
      "2."
    ],
    "a": 0,
    "sol": "2³=8.",
    "hyp": "Pode multiplicar apenas duas posições.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cont-adicao-multiplicacao:anchor:11-cont-adicao-multiplicacao:binario",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-AM-013",
    "sourceFile": "content/vnext/math-a/11/11-cont-adicao-multiplicacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CONT-AM-001",
    "themeId": "11-cont",
    "subtopicId": "11-cont-adicao-multiplicacao",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Princípios da adição e multiplicação",
    "q": "O princípio da adição aplica-se quando contamos alternativas...",
    "o": [
      "mutuamente exclusivas.",
      "que ocorrem em sequência.",
      "com repetição obrigatória.",
      "com ordem irrelevante apenas."
    ],
    "a": 0,
    "sol": "Se os casos não podem ocorrer simultaneamente, somam-se as contagens.",
    "hyp": "Pode usar multiplicação quando os casos são alternativos.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cont-adicao-multiplicacao:probe:11-cont-adicao-multiplicacao:principio-adicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-AM-001",
    "sourceFile": "content/vnext/math-a/11/11-cont-adicao-multiplicacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CONT-ARR-016",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Arranjos",
    "q": "A(n,2) simplifica para...",
    "o": [
      "n².",
      "n(n+1).",
      "n!/2.",
      "n(n−1)."
    ],
    "a": 3,
    "sol": "n!/(n−2)!=n(n−1).",
    "hyp": "Pode usar n² como se houvesse repetição.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cont-arranjos:anchor:11-cont-arranjos:simbolico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-016",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CONT-ARR-001",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Arranjos",
    "q": "Um arranjo de n elementos tomados k a k corresponde a...",
    "o": [
      "escolher e ordenar k elementos distintos de um conjunto de n.",
      "escolher k elementos sem ordem.",
      "ordenar todos os n elementos.",
      "escolher com repetição ilimitada."
    ],
    "a": 0,
    "sol": "Nos arranjos simples, escolhem-se k elementos distintos e a ordem importa.",
    "hyp": "Pode confundir arranjo com combinação.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cont-arranjos:probe:11-cont-arranjos:definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-001",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CONT-COMB-006",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Combinações e escolha sem ordem",
    "q": "Quantas equipas de 2 pessoas podem ser escolhidas entre 7?",
    "o": [
      "42.",
      "21.",
      "49.",
      "14."
    ],
    "a": 1,
    "sol": "C(7,2)=21.",
    "hyp": "Pode contar AB e BA separadamente.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cont-combinacoes:anchor:11-cont-combinacoes:equipa-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-006",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CONT-COMB-001",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Combinações e escolha sem ordem",
    "q": "Uma combinação de n elementos tomados k a k corresponde a...",
    "o": [
      "escolher k elementos sem atender à ordem.",
      "ordenar k elementos escolhidos.",
      "ordenar todos os n elementos.",
      "escolher com repetição obrigatória."
    ],
    "a": 0,
    "sol": "Numa combinação simples, interessa apenas o subconjunto escolhido.",
    "hyp": "Pode confundir combinação com arranjo.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cont-combinacoes:probe:11-cont-combinacoes:definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-001",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CONT-DG-017",
    "themeId": "11-cont",
    "subtopicId": "11-cont-diagramas",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Diagramas, tabelas e organização de casos",
    "q": "Um aluno escolhe Ciências ou Humanidades. Em Ciências há 3 opções de clube; em Humanidades há 2. Quantas folhas finais?",
    "o": [
      "5.",
      "6.",
      "3.",
      "2."
    ],
    "a": 0,
    "sol": "3+2=5.",
    "hyp": "Pode multiplicar os ramos principais.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cont-diagramas:anchor:11-cont-diagramas:arvore-ramos-desiguais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-DG-017",
    "sourceFile": "content/vnext/math-a/11/11-cont-diagramas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CONT-DG-001",
    "themeId": "11-cont",
    "subtopicId": "11-cont-diagramas",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Diagramas, tabelas e organização de casos",
    "q": "Um diagrama de árvore é útil para...",
    "o": [
      "organizar escolhas sucessivas e visualizar ramos.",
      "calcular derivadas.",
      "resolver apenas equações.",
      "representar funções contínuas."
    ],
    "a": 0,
    "sol": "Cada nível da árvore pode representar uma etapa do processo de escolha.",
    "hyp": "Pode pensar que diagramas de árvore são apenas de probabilidade.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cont-diagramas:probe:11-cont-diagramas:arvore-utilidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-DG-001",
    "sourceFile": "content/vnext/math-a/11/11-cont-diagramas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CONT-FAT-011",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Fatorial e contagens elementares",
    "q": "n!/(n−1)! simplifica para...",
    "o": [
      "n−1.",
      "n!−1.",
      "n.",
      "1/n."
    ],
    "a": 2,
    "sol": "n!=n(n−1)!.",
    "hyp": "Pode subtrair fatoriais.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cont-fatorial:anchor:11-cont-fatorial:simplificar-simbolico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-011",
    "sourceFile": "content/vnext/math-a/11/11-cont-fatorial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CONT-FAT-001",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Fatorial e contagens elementares",
    "q": "Para n natural positivo, n! significa...",
    "o": [
      "n(n−1)(n−2)…2·1.",
      "n+n−1+…+1.",
      "n².",
      "2n."
    ],
    "a": 0,
    "sol": "O fatorial é o produto dos inteiros positivos de n até 1.",
    "hyp": "Pode confundir produto com soma.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cont-fatorial:probe:11-cont-fatorial:definicao-fatorial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-001",
    "sourceFile": "content/vnext/math-a/11/11-cont-fatorial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CONT-PERM-007",
    "themeId": "11-cont",
    "subtopicId": "11-cont-permutacoes",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Permutações",
    "q": "Se duas pessoas A e B devem ficar nas duas primeiras posições, em qualquer ordem, numa fila de 5, quantas filas?",
    "o": [
      "24.",
      "6.",
      "12.",
      "20."
    ],
    "a": 2,
    "sol": "A e B podem trocar:2! maneiras; restantes 3 pessoas:3!=6. Total 12.",
    "hyp": "Pode fixar uma ordem para A,B.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cont-permutacoes:anchor:11-cont-permutacoes:duas-primeiras",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-PERM-007",
    "sourceFile": "content/vnext/math-a/11/11-cont-permutacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11CONT-PERM-001",
    "themeId": "11-cont",
    "subtopicId": "11-cont-permutacoes",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Permutações",
    "q": "Uma permutação de n objetos distintos é...",
    "o": [
      "uma ordenação dos n objetos.",
      "uma escolha de alguns objetos sem ordem.",
      "uma escolha com repetição.",
      "uma soma de fatoriais."
    ],
    "a": 0,
    "sol": "Permutar significa ordenar todos os objetos distintos.",
    "hyp": "Pode confundir permutação com combinação.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-cont-permutacoes:probe:11-cont-permutacoes:definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-PERM-001",
    "sourceFile": "content/vnext/math-a/11/11-cont-permutacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11FUN-AM-016",
    "themeId": "11-fun",
    "subtopicId": "11-fun-assintotas-modelacao",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Assíntotas, interpretação e modelação",
    "q": "Divide x²+1 por x. Obtém-se...",
    "o": [
      "x+1.",
      "x².",
      "1/x.",
      "x+1/x."
    ],
    "a": 3,
    "sol": "x²/x=x e sobra 1/x.",
    "hyp": "Pode cancelar x num termo onde não existe.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-fun-assintotas-modelacao:anchor:11-fun-assintotas-modelacao:divisao-racional",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-AM-016",
    "sourceFile": "content/vnext/math-a/11/11-fun-assintotas-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11FUN-AM-001",
    "themeId": "11-fun",
    "subtopicId": "11-fun-assintotas-modelacao",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Assíntotas, interpretação e modelação",
    "q": "Uma assíntota vertical de uma função racional ocorre tipicamente num valor x=a onde...",
    "o": [
      "o denominador se anula sem cancelamento completo.",
      "o numerador se anula.",
      "a função vale zero.",
      "a função é constante."
    ],
    "a": 0,
    "sol": "Se o denominador tende a zero e o fator não se cancela, o gráfico pode divergir junto de x=a.",
    "hyp": "Pode confundir zero da função com exclusão do domínio.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-fun-assintotas-modelacao:probe:11-fun-assintotas-modelacao:assintota-vertical",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-AM-001",
    "sourceFile": "content/vnext/math-a/11/11-fun-assintotas-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11FUN-CQ-015",
    "themeId": "11-fun",
    "subtopicId": "11-fun-cubicas-quarticas",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Famílias cúbicas/quárticas e comportamento gráfico",
    "q": "Resolver x⁴−13x²+36=0 equivale a resolver, com y=x²...",
    "o": [
      "y⁴−13y²+36=0.",
      "y²−13x+36=0.",
      "y²−13y+36=0.",
      "y−13+36=0."
    ],
    "a": 2,
    "sol": "Substituindo y=x², x⁴=y².",
    "hyp": "Pode substituir apenas um termo.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-fun-cubicas-quarticas:anchor:11-fun-cubicas-quarticas:substituicao-y",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-CQ-015",
    "sourceFile": "content/vnext/math-a/11/11-fun-cubicas-quarticas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11FUN-CQ-001",
    "themeId": "11-fun",
    "subtopicId": "11-fun-cubicas-quarticas",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Famílias cúbicas/quárticas e comportamento gráfico",
    "q": "Uma função polinomial cúbica tem grau...",
    "o": [
      "3.",
      "2.",
      "4.",
      "1."
    ],
    "a": 0,
    "sol": "Cúbica significa grau 3.",
    "hyp": "Pode confundir cúbica com quadrática.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-fun-cubicas-quarticas:probe:11-fun-cubicas-quarticas:grau-cubica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-CQ-001",
    "sourceFile": "content/vnext/math-a/11/11-fun-cubicas-quarticas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11FUN-DP-016",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Divide x³+2x²−x−2 por x+2. O quociente é...",
    "o": [
      "x²+1.",
      "x²−2x+1.",
      "x²+2x−1.",
      "x²−1."
    ],
    "a": 3,
    "sol": "Por agrupamento: x²(x+2)−1(x+2)=(x+2)(x²−1).",
    "hyp": "Pode não reconhecer o fator comum.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-fun-divisao-polinomios:anchor:11-fun-divisao-polinomios:divisao-cubica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-016",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11FUN-DP-001",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Na divisão de polinómios P(x) por D(x), com D≠0, escreve-se...",
    "o": [
      "P=DQ+R.",
      "P=Q+R.",
      "P=DR.",
      "P=D+Q+R."
    ],
    "a": 0,
    "sol": "É a identidade fundamental da divisão euclidiana de polinómios.",
    "hyp": "Pode esquecer multiplicar divisor pelo quociente.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-fun-divisao-polinomios:probe:11-fun-divisao-polinomios:algoritmo-divisao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-001",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11FUN-OP-006",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Operações entre funções",
    "q": "Se f(x)=x² e g(x)=x−3, então (f−g)(x)=",
    "o": [
      "x²+x−3.",
      "x²−x+3.",
      "x²−3x.",
      "x²−x−3."
    ],
    "a": 1,
    "sol": "x²−(x−3)=x²−x+3.",
    "hyp": "Pode não distribuir o sinal menos.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-fun-operacoes:anchor:11-fun-operacoes:subtracao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-006",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11FUN-OP-001",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Operações entre funções",
    "q": "A soma de duas funções f e g é definida por...",
    "o": [
      "(f+g)(x)=f(x)+g(x).",
      "(f+g)(x)=f(g(x)).",
      "(f+g)(x)=f(x)g(x).",
      "(f+g)(x)=f(x)/g(x)."
    ],
    "a": 0,
    "sol": "Somam-se os valores das duas funções no mesmo x.",
    "hyp": "Pode confundir soma com composição.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-fun-operacoes:probe:11-fun-operacoes:definicao-soma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-001",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11FUN-RAT-014",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Funções racionais",
    "q": "Qual é o sinal de 1/x para x>0?",
    "o": [
      "negativo.",
      "positivo.",
      "zero.",
      "indefinido."
    ],
    "a": 1,
    "sol": "Numerador e denominador são positivos.",
    "hyp": "Pode confundir proximidade de zero com valor zero.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-fun-racionais:anchor:11-fun-racionais:sinal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-014",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11FUN-RAT-001",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Funções racionais",
    "q": "Uma função racional é, em geral, um quociente...",
    "o": [
      "de dois polinómios, com denominador não identicamente nulo.",
      "de duas funções trigonométricas.",
      "de dois números naturais.",
      "de duas sucessões."
    ],
    "a": 0,
    "sol": "Funções racionais têm a forma P(x)/Q(x), com Q não nulo.",
    "hyp": "Pode confundir racional com qualquer fração numérica.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-fun-racionais:probe:11-fun-racionais:definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-001",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11FUN-RR-008",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "Se P(5)=0, então...",
    "o": [
      "x+5 é fator de P.",
      "P é de grau 5.",
      "5 é o resto da divisão por x−5.",
      "x−5 é fator de P."
    ],
    "a": 3,
    "sol": "P(5)=0 implica divisibilidade por x−5.",
    "hyp": "Pode trocar o sinal.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-fun-resto-raizes:anchor:11-fun-resto-raizes:zero-fator",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-008",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11FUN-RR-001",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "O Teorema do Resto afirma que o resto da divisão de P(x) por x−a é...",
    "o": [
      "P(a).",
      "P(0).",
      "a.",
      "P'(a)."
    ],
    "a": 0,
    "sol": "O resto é o valor do polinómio no zero do divisor.",
    "hyp": "Pode confundir com o termo constante.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-fun-resto-raizes:probe:11-fun-resto-raizes:teorema-resto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-001",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11PE-AN-010",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Produto escalar, norma e ângulo",
    "q": "Se u·v=12, ||u||=3 e ||v||=4, então θ=",
    "o": [
      "π/3.",
      "0.",
      "π/2.",
      "π."
    ],
    "a": 1,
    "sol": "cosθ=12/(12)=1, logo θ=0.",
    "hyp": "Pode pensar que produto igual ao produto das normas implica 60°.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-pe-angulo-norma:anchor:11-pe-angulo-norma:angulo-produto-maximo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-010",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11PE-AN-001",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Produto escalar, norma e ângulo",
    "q": "Para vetores não nulos u e v, u·v é igual a...",
    "o": [
      "||u||||v||cosθ.",
      "||u||+||v||.",
      "||u||||v||sinθ.",
      "cos(||u||+||v||)."
    ],
    "a": 0,
    "sol": "Esta é a forma geométrica do produto escalar.",
    "hyp": "Pode trocar cosseno por seno.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-pe-angulo-norma:probe:11-pe-angulo-norma:formula-geometrica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-001",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11PE-DI-019",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Declive e inclinação",
    "q": "Qual é o declive da reta paralela a y=4x−7?",
    "o": [
      "−4.",
      "7.",
      "4.",
      "−7."
    ],
    "a": 2,
    "sol": "Retas paralelas têm o mesmo declive.",
    "hyp": "Pode usar o termo independente.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-pe-declive-inclinacao:anchor:11-pe-declive-inclinacao:paralela",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-019",
    "sourceFile": "content/vnext/math-a/11/11-pe-declive-inclinacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11PE-DI-001",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Declive e inclinação",
    "q": "O declive de uma reta não vertical que passa por A(x1,y1) e B(x2,y2) é...",
    "o": [
      "(y2−y1)/(x2−x1).",
      "(x2−x1)/(y2−y1).",
      "(x1+x2)/(y1+y2).",
      "y2−y1."
    ],
    "a": 0,
    "sol": "O declive é a razão entre a variação vertical e a variação horizontal.",
    "hyp": "Pode inverter a razão.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-pe-declive-inclinacao:probe:11-pe-declive-inclinacao:formula-declive",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-001",
    "sourceFile": "content/vnext/math-a/11/11-pe-declive-inclinacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11PE-DIST-006",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Distâncias em problemas geométricos",
    "q": "Qual é a distância de P=(3,4) ao eixo Ox?",
    "o": [
      "3.",
      "4.",
      "5.",
      "7."
    ],
    "a": 1,
    "sol": "O eixo Ox tem y=0, logo a distância vertical é |4|.",
    "hyp": "Pode usar a abcissa.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-pe-distancias:anchor:11-pe-distancias:distancia-eixo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-006",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11PE-DIST-001",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Distâncias em problemas geométricos",
    "q": "A distância de um ponto P a uma reta r é...",
    "o": [
      "o comprimento do segmento perpendicular de P a r.",
      "qualquer segmento que una P a r.",
      "a distância à origem.",
      "o declive da reta."
    ],
    "a": 0,
    "sol": "A menor distância é medida segundo a perpendicular à reta.",
    "hyp": "Pode usar um segmento oblíquo.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-pe-distancias:probe:11-pe-distancias:distancia-ponto-reta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-001",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11PE-PERP-006",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Perpendicularidade",
    "q": "Para que k os vetores (k,3) e (2,−4) sejam perpendiculares?",
    "o": [
      "−6.",
      "6.",
      "3/2.",
      "−3/2."
    ],
    "a": 1,
    "sol": "2k−12=0 => k=6.",
    "hyp": "Pode errar o sinal.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-pe-perpendicularidade:anchor:11-pe-perpendicularidade:parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-006",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11PE-PERP-001",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Perpendicularidade",
    "q": "Dois vetores não nulos são perpendiculares quando...",
    "o": [
      "o produto escalar é 0.",
      "são proporcionais.",
      "têm a mesma norma.",
      "a soma é nula."
    ],
    "a": 0,
    "sol": "u·v=||u||||v||cos90°=0.",
    "hyp": "Pode confundir ortogonalidade com oposição.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-pe-perpendicularidade:probe:11-pe-perpendicularidade:criterio-produto-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-001",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11PE-PC-018",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Produto escalar por coordenadas",
    "q": "Para que k os vetores (k,2) e (3,−6) sejam perpendiculares?",
    "o": [
      "−4.",
      "4.",
      "1.",
      "3."
    ],
    "a": 1,
    "sol": "3k+2(−6)=0 => 3k=12 => k=4.",
    "hyp": "Pode resolver a equação de sinais incorretamente.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-pe-produto-coordenadas:anchor:11-pe-produto-coordenadas:parametro-perpendicular",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-018",
    "sourceFile": "content/vnext/math-a/11/11-pe-produto-coordenadas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11PE-PC-001",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Produto escalar por coordenadas",
    "q": "No plano, o produto escalar de u=(a,b) e v=(c,d) é...",
    "o": [
      "ac+bd.",
      "ac−bd.",
      "a+c+b+d.",
      "ad+bc."
    ],
    "a": 0,
    "sol": "Multiplicam-se componentes correspondentes e somam-se os produtos.",
    "hyp": "Pode trocar componentes ou usar determinante.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-pe-produto-coordenadas:probe:11-pe-produto-coordenadas:formula-plano",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-001",
    "sourceFile": "content/vnext/math-a/11/11-pe-produto-coordenadas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11PE-RP-009",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "Qual é o cosseno do ângulo entre u=(1,2) e v=(2,1)?",
    "o": [
      "4/5.",
      "3/5.",
      "1/5.",
      "−4/5."
    ],
    "a": 0,
    "sol": "u·v=4 e ambas as normas são √5, logo cosθ=4/5.",
    "hyp": "Pode dividir por √5 em vez de 5.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-pe-retas-planos:anchor:11-pe-retas-planos:cos-retas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-009",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11PE-RP-001",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "O ângulo entre duas retas secantes é definido como...",
    "o": [
      "o menor ângulo entre vetores diretores das retas.",
      "a soma das inclinações.",
      "sempre 90°.",
      "o maior ângulo entre vetores diretores."
    ],
    "a": 0,
    "sol": "Usa-se o menor ângulo entre as direções das retas.",
    "hyp": "Pode confundir com diferença orientada de inclinações sem redução.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-pe-retas-planos:probe:11-pe-retas-planos:angulo-retas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-001",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11SUC-MC-015",
    "themeId": "11-suc",
    "subtopicId": "11-suc-modelacao-comportamento",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Comportamento e modelação com sucessões",
    "q": "Qual cresce mais rapidamente para n grande: u_n=100+5n ou v_n=100·1,05^n?",
    "o": [
      "u_n.",
      "crescem exatamente igual.",
      "v_n.",
      "não é possível comparar."
    ],
    "a": 2,
    "sol": "O crescimento exponencial com base >1 acaba por superar o crescimento linear.",
    "hyp": "Pode olhar apenas para os primeiros termos.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-suc-modelacao-comportamento:anchor:11-suc-modelacao-comportamento:linear-vs-exponencial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-MC-015",
    "sourceFile": "content/vnext/math-a/11/11-suc-modelacao-comportamento.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11SUC-MC-001",
    "themeId": "11-suc",
    "subtopicId": "11-suc-modelacao-comportamento",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Comportamento e modelação com sucessões",
    "q": "Numa modelação discreta, cada termo de uma sucessão pode representar...",
    "o": [
      "o valor de uma grandeza num instante ou etapa.",
      "apenas uma coordenada geométrica.",
      "sempre uma probabilidade.",
      "um intervalo contínuo inteiro."
    ],
    "a": 0,
    "sol": "Sucessões modelam grandezas observadas em etapas discretas.",
    "hyp": "Pode confundir modelo discreto com função contínua.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-suc-modelacao-comportamento:probe:11-suc-modelacao-comportamento:modelo-discreto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-MC-001",
    "sourceFile": "content/vnext/math-a/11/11-suc-modelacao-comportamento.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11SUC-PA-008",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Progressões aritméticas",
    "q": "Se u_1=5 e u_4=14 numa PA, a razão é...",
    "o": [
      "9.",
      "4.",
      "14/5.",
      "3."
    ],
    "a": 3,
    "sol": "14=5+3r => r=3.",
    "hyp": "Pode dividir a diferença por 4 em vez de 3.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-suc-pa:anchor:11-suc-pa:achar-razao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-008",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11SUC-PA-001",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Progressões aritméticas",
    "q": "Uma progressão aritmética (PA) é uma sucessão em que...",
    "o": [
      "a diferença entre termos consecutivos é constante.",
      "a razão entre termos consecutivos é constante.",
      "todos os termos são positivos.",
      "o termo geral é sempre quadrático."
    ],
    "a": 0,
    "sol": "Numa PA, u_{n+1}−u_n=r é constante.",
    "hyp": "Pode confundir PA com PG.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-suc-pa:probe:11-suc-pa:definicao-pa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-001",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11SUC-PG-008",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Progressões geométricas",
    "q": "Se u_1=5 e u_3=45 numa PG de razão positiva, q=",
    "o": [
      "9.",
      "√5.",
      "2.",
      "3."
    ],
    "a": 3,
    "sol": "45=5q² => q²=9; sendo q>0, q=3.",
    "hyp": "Pode esquecer a raiz ou a condição de sinal.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-suc-pg:anchor:11-suc-pg:achar-razao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-008",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11SUC-PG-001",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Progressões geométricas",
    "q": "Uma progressão geométrica (PG) é uma sucessão em que...",
    "o": [
      "a razão entre termos consecutivos é constante.",
      "a diferença entre termos consecutivos é constante.",
      "todos os termos são positivos.",
      "o termo geral é sempre linear."
    ],
    "a": 0,
    "sol": "Numa PG, para termos não nulos, u_{n+1}/u_n=q é constante.",
    "hyp": "Pode confundir PG com PA.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-suc-pg:probe:11-suc-pg:definicao-pg",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-001",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11SUC-SOM-008",
    "themeId": "11-suc",
    "subtopicId": "11-suc-somas",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Somas de termos de PA e PG",
    "q": "A soma dos primeiros 20 termos da PA 3,6,9,... é...",
    "o": [
      "600.",
      "660.",
      "603.",
      "630."
    ],
    "a": 3,
    "sol": "u_20=60; S=20(3+60)/2=630.",
    "hyp": "Pode usar 20×30.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-suc-somas:anchor:11-suc-somas:soma-multiplos-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-SOM-008",
    "sourceFile": "content/vnext/math-a/11/11-suc-somas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11SUC-SOM-001",
    "themeId": "11-suc",
    "subtopicId": "11-suc-somas",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Somas de termos de PA e PG",
    "q": "A soma dos n primeiros termos de uma PA é...",
    "o": [
      "S_n=n(u_1+u_n)/2.",
      "S_n=nu_1.",
      "S_n=u_1r^n.",
      "S_n=(u_1+u_n)/n."
    ],
    "a": 0,
    "sol": "Emparelhar primeiro e último termo conduz à fórmula n(u_1+u_n)/2.",
    "hyp": "Pode confundir média com soma.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-suc-somas:probe:11-suc-somas:soma-pa-extremos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-SOM-001",
    "sourceFile": "content/vnext/math-a/11/11-suc-somas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11SUC-TR-019",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "Se u_n=4n−1, para que n se tem u_n=19?",
    "o": [
      "4.",
      "6.",
      "5.",
      "20."
    ],
    "a": 2,
    "sol": "4n−1=19 => 4n=20 => n=5.",
    "hyp": "Pode não isolar n corretamente.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-suc-termo-recorrencia:anchor:11-suc-termo-recorrencia:indice-por-termo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-019",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11SUC-TR-001",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "Uma sucessão é...",
    "o": [
      "uma função cujo domínio é um subconjunto dos números naturais.",
      "qualquer conjunto sem ordem.",
      "uma equação do 2.º grau.",
      "uma função apenas definida em R."
    ],
    "a": 0,
    "sol": "Uma sucessão associa a cada índice natural um termo.",
    "hyp": "Pode confundir sucessão com conjunto não ordenado.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-suc-termo-recorrencia:probe:11-suc-termo-recorrencia:definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-001",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11TRIG-AR-008",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "60° correspondem a...",
    "o": [
      "π/6",
      "2π/3",
      "3π",
      "π/3"
    ],
    "a": 3,
    "sol": "60×π/180=π/3.",
    "hyp": "Pode simplificar a fração incorretamente.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-trig-angulos-radianos:anchor:11-trig-angulos-radianos:graus-para-rad",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-008",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11TRIG-AR-001",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "Uma volta completa mede...",
    "o": [
      "360°",
      "180°",
      "90°",
      "720°"
    ],
    "a": 0,
    "sol": "Uma rotação completa corresponde a 360°.",
    "hyp": "Pode confundir meia-volta com volta completa.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-trig-angulos-radianos:probe:11-trig-angulos-radianos:graus-volta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-001",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11TRIG-CIR-012",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Círculo trigonométrico e redução",
    "q": "Quanto vale cos 0?",
    "o": [
      "0",
      "−1",
      "1/2",
      "1"
    ],
    "a": 3,
    "sol": "A abcissa de (1,0) é 1.",
    "hyp": "Pode usar a ordenada.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-trig-circulo:anchor:11-trig-circulo:valores-notaveis",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-012",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11TRIG-CIR-001",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Círculo trigonométrico e redução",
    "q": "No círculo trigonométrico, o raio é...",
    "o": [
      "1.",
      "π.",
      "2.",
      "variável."
    ],
    "a": 0,
    "sol": "Por definição, o círculo trigonométrico é unitário.",
    "hyp": "Pode confundir raio com diâmetro.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-trig-circulo:probe:11-trig-circulo:raio-unitario",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-001",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11TRIG-EQ-017",
    "themeId": "11-trig",
    "subtopicId": "11-trig-equacoes",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Equações trigonométricas",
    "q": "Resolve 2sin x=1 em [0,2π[.",
    "o": [
      "π/6 e 5π/6.",
      "π/3 e 2π/3.",
      "7π/6 e 11π/6.",
      "π/6 apenas."
    ],
    "a": 0,
    "sol": "A equação reduz-se a sin x=1/2.",
    "hyp": "Pode esquecer dividir por 2.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-trig-equacoes:anchor:11-trig-equacoes:equacao-linear-sin",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-EQ-017",
    "sourceFile": "content/vnext/math-a/11/11-trig-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11TRIG-EQ-001",
    "themeId": "11-trig",
    "subtopicId": "11-trig-equacoes",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Equações trigonométricas",
    "q": "A equação sin x=0 tem, em R, soluções...",
    "o": [
      "x=kπ, k∈Z.",
      "x=π/2+kπ.",
      "x=2kπ apenas.",
      "x=π/4+kπ."
    ],
    "a": 0,
    "sol": "O seno anula-se nos múltiplos inteiros de π.",
    "hyp": "Pode esquecer os múltiplos ímpares de π.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-trig-equacoes:probe:11-trig-equacoes:sin-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-EQ-001",
    "sourceFile": "content/vnext/math-a/11/11-trig-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11TRIG-FUN-007",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Funções seno e cosseno",
    "q": "sin(x+2π) é igual a...",
    "o": [
      "−sin x.",
      "cos x.",
      "sin x.",
      "−cos x."
    ],
    "a": 2,
    "sol": "Período do seno é 2π.",
    "hyp": "Pode aplicar mudança de sinal indevida.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-trig-funcoes:anchor:11-trig-funcoes:periodicidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-007",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11TRIG-FUN-001",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Funções seno e cosseno",
    "q": "A função y=sin x tem período fundamental...",
    "o": [
      "2π.",
      "π.",
      "π/2.",
      "4π."
    ],
    "a": 0,
    "sol": "O seno repete os valores a cada 2π.",
    "hyp": "Pode confundir com a tangente.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-trig-funcoes:probe:11-trig-funcoes:periodo-seno",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-001",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11TRIG-MOD-009",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Uma escada de 5 m encostada a uma parede faz 60° com o chão. A altura atingida é...",
    "o": [
      "5√3/2 m",
      "2,5 m",
      "5 m",
      "5/√3 m"
    ],
    "a": 0,
    "sol": "Altura=5 sin60°=5√3/2.",
    "hyp": "Pode usar cosseno em vez de seno.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-trig-modelacao:anchor:11-trig-modelacao:modelacao-escada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-009",
    "sourceFile": "content/vnext/math-a/11/11-trig-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11TRIG-MOD-001",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Num triângulo retângulo, sin α é...",
    "o": [
      "cateto oposto/hipotenusa.",
      "cateto adjacente/hipotenusa.",
      "cateto oposto/cateto adjacente.",
      "hipotenusa/cateto oposto."
    ],
    "a": 0,
    "sol": "Por definição, sin α=oposto/hipotenusa.",
    "hyp": "Pode trocar seno e cosseno.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-trig-modelacao:probe:11-trig-modelacao:razoes-triangulo-retangulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-001",
    "sourceFile": "content/vnext/math-a/11/11-trig-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11TRIG-REL-017",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "Se tan x=3/4 e x está no 1.º quadrante, uma escolha compatível para (sin x,cos x) é...",
    "o": [
      "(3/5,4/5).",
      "(4/5,3/5).",
      "(−3/5,4/5).",
      "(3/4,1)."
    ],
    "a": 0,
    "sol": "Um triângulo 3-4-5 dá sin/cos=3/4.",
    "hyp": "Pode inverter seno e cosseno.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-trig-relacoes:anchor:11-trig-relacoes:tan-para-sincos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-017",
    "sourceFile": "content/vnext/math-a/11/11-trig-relacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN11TRIG-REL-001",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "A identidade trigonométrica fundamental é...",
    "o": [
      "sin²x+cos²x=1.",
      "sin x+cos x=1.",
      "tan²x=1.",
      "sin x cos x=1."
    ],
    "a": 0,
    "sol": "Resulta da equação do círculo unitário.",
    "hyp": "Pode confundir soma dos quadrados com soma simples.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:11-trig-relacoes:probe:11-trig-relacoes:identidade-fundamental",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-001",
    "sourceFile": "content/vnext/math-a/11/11-trig-relacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-AG-007",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "A distância da origem ao ponto que representa 6+8i é...",
    "o": [
      "14.",
      "100.",
      "10.",
      "2."
    ],
    "a": 2,
    "sol": "√(36+64)=10.",
    "hyp": "Pode usar soma das coordenadas.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-argand:anchor:12-cplx-argand:distancia-origem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-007",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-AG-001",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "No plano de Argand-Gauss, z=a+bi corresponde ao ponto...",
    "o": [
      "(a,b).",
      "(b,a).",
      "(a,−b).",
      "(−a,b)."
    ],
    "a": 0,
    "sol": "A abcissa é a parte real e a ordenada a parte imaginária.",
    "hyp": "Pode trocar as componentes.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-argand:probe:12-cplx-argand:representacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-001",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-CM-019",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Conjugado e módulo",
    "q": "Se z=3+bi e |z|=5, então b pode ser...",
    "o": [
      "±2.",
      "4 apenas.",
      "±4.",
      "±5."
    ],
    "a": 2,
    "sol": "9+b²=25 => b²=16.",
    "hyp": "Pode esquecer as duas soluções.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-conjugado-modulo:anchor:12-cplx-conjugado-modulo:modulo-parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-019",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-CM-001",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Conjugado e módulo",
    "q": "O conjugado de z=a+bi é...",
    "o": [
      "a−bi.",
      "−a+bi.",
      "−a−bi.",
      "b+ai."
    ],
    "a": 0,
    "sol": "Muda-se apenas o sinal da parte imaginária.",
    "hyp": "Pode confundir conjugado com oposto.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-conjugado-modulo:probe:12-cplx-conjugado-modulo:conjugado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-001",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-FA-013",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "Se 2+xi=2−3i, então x=",
    "o": [
      "−3.",
      "3.",
      "2.",
      "0."
    ],
    "a": 0,
    "sol": "Igualando partes imaginárias: x=−3.",
    "hyp": "Pode comparar x com a parte real.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-forma-algebrica:anchor:12-cplx-forma-algebrica:igualdade-parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-013",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-FA-001",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "A forma algébrica de um número complexo é...",
    "o": [
      "a+bi, com a,b reais.",
      "a/b.",
      "a+bx.",
      "r(cosθ+i sinθ) apenas."
    ],
    "a": 0,
    "sol": "Todo complexo pode escrever-se como a+bi.",
    "hyp": "Pode confundir forma algébrica com trigonométrica.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-forma-algebrica:probe:12-cplx-forma-algebrica:forma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-001",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-FT-006",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-trig",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Forma trigonométrica, módulo e argumento",
    "q": "O complexo 1+i tem módulo...",
    "o": [
      "2.",
      "√2.",
      "1.",
      "1/√2."
    ],
    "a": 1,
    "sol": "√(1+1)=√2.",
    "hyp": "Pode usar soma 2.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-forma-trig:anchor:12-cplx-forma-trig:modulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FT-006",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-FT-001",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-trig",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Forma trigonométrica, módulo e argumento",
    "q": "A forma trigonométrica de z≠0 pode escrever-se como...",
    "o": [
      "r(cosθ+i sinθ), com r>0.",
      "a+bi apenas.",
      "r+iθ.",
      "cos r+i sin r."
    ],
    "a": 0,
    "sol": "r é o módulo e θ um argumento de z.",
    "hyp": "Pode trocar módulo e argumento.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-forma-trig:probe:12-cplx-forma-trig:forma-trig",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FT-001",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-OA-015",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Operações na forma algébrica",
    "q": "(1+i)³ é...",
    "o": [
      "2+2i.",
      "−2−2i.",
      "−2+2i.",
      "2i."
    ],
    "a": 2,
    "sol": "(1+i)²=2i; multiplicando por (1+i):−2+2i.",
    "hyp": "Pode usar potência componente a componente.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-operacoes-algebricas:anchor:12-cplx-operacoes-algebricas:potencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-015",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-algebricas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-OA-001",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Operações na forma algébrica",
    "q": "A soma (a+bi)+(c+di) é...",
    "o": [
      "(a+c)+(b+d)i.",
      "(ac)+(bd)i.",
      "(a−c)+(b−d)i.",
      "(a+d)+(b+c)i."
    ],
    "a": 0,
    "sol": "Somam-se partes reais e imaginárias separadamente.",
    "hyp": "Pode misturar componentes.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-operacoes-algebricas:probe:12-cplx-operacoes-algebricas:soma-formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-001",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-algebricas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-OT-015",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "Se z=√2(cosπ/4+i sinπ/4), então z em forma algébrica é...",
    "o": [
      "√2+i.",
      "1+√2i.",
      "1+i.",
      "√2+√2i."
    ],
    "a": 2,
    "sol": "√2·√2/2=1 em ambas as componentes.",
    "hyp": "Pode esquecer multiplicar pelo módulo.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-operacoes-trig:anchor:12-cplx-operacoes-trig:converter",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-015",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-OT-001",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "Se z1=r1(cosα+i sinα) e z2=r2(cosβ+i sinβ), então z1z2 tem módulo...",
    "o": [
      "r1r2.",
      "r1+r2.",
      "r1/r2.",
      "|r1−r2|."
    ],
    "a": 0,
    "sol": "Na multiplicação, os módulos multiplicam-se.",
    "hyp": "Pode somar módulos.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-operacoes-trig:probe:12-cplx-operacoes-trig:produto-modulos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-001",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-UE-011",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "A soma 1+i+i²+i³ vale...",
    "o": [
      "1.",
      "i.",
      "0.",
      "−1."
    ],
    "a": 2,
    "sol": "1+i−1−i=0.",
    "hyp": "Pode somar módulos em vez de termos.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-unidade-equacoes:anchor:12-cplx-unidade-equacoes:soma-ciclo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-011",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12CPLX-UE-001",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "A unidade imaginária i satisfaz...",
    "o": [
      "i²=−1.",
      "i²=1.",
      "i=−1.",
      "i²=0."
    ],
    "a": 0,
    "sol": "Por definição, i²=−1.",
    "hyp": "Pode confundir i com um número real negativo.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-cplx-unidade-equacoes:probe:12-cplx-unidade-equacoes:def-i",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-001",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12EXPL-EQ-007",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Resolve 8^x=4.",
    "o": [
      "x=1/2.",
      "x=3/2.",
      "x=2/3.",
      "x=2."
    ],
    "a": 2,
    "sol": "2^(3x)=2², logo x=2/3.",
    "hyp": "Pode dividir as bases8/4.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-expl-equacoes:anchor:12-expl-equacoes:converter-base-7",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-007",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12EXPL-EQ-001",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Resolve 2^x=8.",
    "o": [
      "x=3.",
      "x=4.",
      "x=2.",
      "x=8."
    ],
    "a": 0,
    "sol": "8=2³, logo x=3.",
    "hyp": "Pode dividir8 por2.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-expl-equacoes:probe:12-expl-equacoes:exp-base-comum-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-001",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12EXPL-EXP-015",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Função exponencial",
    "q": "2^(x+1)/2^x simplifica para...",
    "o": [
      "2^x.",
      "1.",
      "2.",
      "x+1."
    ],
    "a": 2,
    "sol": "2^(x+1−x)=2.",
    "hyp": "Pode cancelar as bases e ficar com expoentes.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-expl-exponencial:anchor:12-expl-exponencial:quociente-15",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-015",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12EXPL-EXP-001",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função exponencial",
    "q": "Uma função exponencial elementar tem forma f(x)=a^x, com...",
    "o": [
      "a>0 e a≠1.",
      "a<0.",
      "a=1 apenas.",
      "a=0."
    ],
    "a": 0,
    "sol": "Para uma exponencial real definida em todo R exige-se base positiva e diferente de1.",
    "hyp": "Pode admitir bases não positivas ou a base1 como caso exponencial não trivial.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-expl-exponencial:probe:12-expl-exponencial:def-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-001",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12EXPL-IR-007",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Função inversa e raízes",
    "q": "Se f(x)=x² em R, f tem inversa em todo R?",
    "o": [
      "Sim, porque é contínua.",
      "Sim, porque é positiva.",
      "Não, porque não é injetiva em R.",
      "Não, porque não tem imagem."
    ],
    "a": 2,
    "sol": "f(−x)=f(x), portanto valores distintos podem ter a mesma imagem.",
    "hyp": "Pode confundir continuidade com invertibilidade.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-expl-inversa-raizes:anchor:12-expl-inversa-raizes:x2-nao-injetiva-7",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-007",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12EXPL-IR-001",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função inversa e raízes",
    "q": "Uma função admite inversa como função no seu domínio se for...",
    "o": [
      "injetiva.",
      "constante.",
      "periódica não constante.",
      "sempre par."
    ],
    "a": 0,
    "sol": "Para cada valor da imagem existir um único antecedente, a função tem de ser injetiva.",
    "hyp": "Pode confundir inversa com recíproco algébrico.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-expl-inversa-raizes:probe:12-expl-inversa-raizes:injetiva-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-001",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12EXPL-LOG-006",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Função logarítmica e propriedades",
    "q": "log_a a, com a válido, é...",
    "o": [
      "0.",
      "1.",
      "a.",
      "−1."
    ],
    "a": 1,
    "sol": "a^1=a.",
    "hyp": "Pode confundir com log_a1.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-expl-logaritmica:anchor:12-expl-logaritmica:loga-a-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-006",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12EXPL-LOG-001",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função logarítmica e propriedades",
    "q": "log_a b=c significa que...",
    "o": [
      "a^c=b.",
      "b^c=a.",
      "a^b=c.",
      "c^a=b."
    ],
    "a": 0,
    "sol": "O logaritmo é o expoente a que se eleva a base a para obter b.",
    "hyp": "Pode trocar base, argumento e resultado.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-expl-logaritmica:probe:12-expl-logaritmica:def-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-001",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12EXPL-MOD-014",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Um modelo para meia-vida H pode escrever-se como...",
    "o": [
      "Q0·2^(t/H).",
      "Q0·(1/2)^(t/H).",
      "Q0·(1/2)^(Ht).",
      "Q0−t/H."
    ],
    "a": 1,
    "sol": "Quando t=H, o expoente é1 e a quantidade fica Q0/2.",
    "hyp": "Pode usar fator2 ou multiplicar H pelo tempo.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-expl-modelacao:anchor:12-expl-modelacao:modelo-meia-vida-14",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-014",
    "sourceFile": "content/vnext/math-a/12/12-expl-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12EXPL-MOD-001",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Um modelo Q(t)=Q0·a^t com a>1 representa, em geral...",
    "o": [
      "crescimento exponencial.",
      "decrescimento exponencial.",
      "crescimento linear.",
      "uma constante."
    ],
    "a": 0,
    "sol": "Um fator multiplicativo maior que1 faz a quantidade crescer a cada unidade de tempo.",
    "hyp": "Pode confundir base maior que1 com taxa absoluta.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-expl-modelacao:probe:12-expl-modelacao:crescimento-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-001",
    "sourceFile": "content/vnext/math-a/12/12-expl-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCD-AP-009",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Se f'(x)=x(x−3), os pontos críticos são...",
    "o": [
      "0 e 3.",
      "0 apenas.",
      "3 apenas.",
      "−3 e0."
    ],
    "a": 0,
    "sol": "Produto nulo quando x=0 ou x=3.",
    "hyp": "Pode resolver apenas um fator.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcd-aplicacoes:anchor:12-fcd-aplicacoes:criticos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-009",
    "sourceFile": "content/vnext/math-a/12/12-fcd-aplicacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCD-AP-001",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Se f'(x)>0 num intervalo, então f é...",
    "o": [
      "crescente nesse intervalo.",
      "decrescente nesse intervalo.",
      "constante.",
      "necessariamente positiva."
    ],
    "a": 0,
    "sol": "Derivada positiva implica crescimento.",
    "hyp": "Pode confundir sinal da função com sinal da derivada.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcd-aplicacoes:probe:12-fcd-aplicacoes:monotonia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-001",
    "sourceFile": "content/vnext/math-a/12/12-fcd-aplicacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCD-COMP-008",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Função composta e domínio",
    "q": "Se f(x)=√x e g(x)=x−2, o domínio de f∘g é...",
    "o": [
      "[0,+∞[.",
      "]−∞,2].",
      "R.",
      "[2,+∞[."
    ],
    "a": 3,
    "sol": "É preciso x−2≥0, logo x≥2.",
    "hyp": "Pode usar apenas o domínio de f antes da composição.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcd-composicao:anchor:12-fcd-composicao:dominio-raiz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-008",
    "sourceFile": "content/vnext/math-a/12/12-fcd-composicao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCD-COMP-001",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função composta e domínio",
    "q": "A composição (f∘g)(x) significa...",
    "o": [
      "f(g(x)).",
      "g(f(x)).",
      "f(x)g(x).",
      "f(x)+g(x)."
    ],
    "a": 0,
    "sol": "Por definição, aplica-se primeiro g e depois f.",
    "hyp": "Pode trocar a ordem da composição.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcd-composicao:probe:12-fcd-composicao:definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-001",
    "sourceFile": "content/vnext/math-a/12/12-fcd-composicao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCD-EE-017",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Número e e derivada da exponencial",
    "q": "A equação e^x=1 tem solução...",
    "o": [
      "x=0.",
      "x=1.",
      "x=e.",
      "não tem solução."
    ],
    "a": 0,
    "sol": "e^0=1 e a função é estritamente crescente.",
    "hyp": "Pode confundir expoente e valor.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcd-e-exponencial:anchor:12-fcd-e-exponencial:equacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-017",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCD-EE-001",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Número e e derivada da exponencial",
    "q": "O número e é aproximadamente...",
    "o": [
      "2,71828.",
      "3,14159.",
      "1,61803.",
      "0,57721."
    ],
    "a": 0,
    "sol": "e≈2,71828.",
    "hyp": "Pode confundir e com π.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcd-e-exponencial:probe:12-fcd-e-exponencial:valor-e",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-001",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCD-LTP-020",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "A derivada de √(x²+1) é...",
    "o": [
      "1/(2√(x²+1)).",
      "2x√(x²+1).",
      "√(2x).",
      "x/√(x²+1)."
    ],
    "a": 3,
    "sol": "(1/2)(x²+1)^{-1/2}·2x.",
    "hyp": "Pode esquecer a derivada interna.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcd-log-trig-potencias:anchor:12-fcd-log-trig-potencias:raiz-composta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-020",
    "sourceFile": "content/vnext/math-a/12/12-fcd-log-trig-potencias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCD-LTP-001",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "A derivada de ln x, para x>0, é...",
    "o": [
      "1/x.",
      "ln x.",
      "x.",
      "e^x."
    ],
    "a": 0,
    "sol": "(ln x)'=1/x.",
    "hyp": "Pode confundir função e derivada.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcd-log-trig-potencias:probe:12-fcd-log-trig-potencias:ln-basico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-001",
    "sourceFile": "content/vnext/math-a/12/12-fcd-log-trig-potencias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCD-RC-006",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "Qual é a derivada de f(x)=x²e^x?",
    "o": [
      "2xe^x.",
      "e^x(x²+2x).",
      "x²e^{x−1}.",
      "e^x(x²+2)."
    ],
    "a": 1,
    "sol": "Pela regra do produto, f'(x)=2xe^x+x²e^x=e^x(x²+2x).",
    "hyp": "Pode derivar apenas x² ou apenas e^x, omitindo um dos termos da regra do produto.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcd-regras-cadeia:anchor:12-fcd-regras-cadeia:produto-exp",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-006",
    "sourceFile": "content/vnext/math-a/12/12-fcd-regras-cadeia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCD-RC-001",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "A derivada de f(x)+g(x) é...",
    "o": [
      "f'(x)+g'(x).",
      "f'(x)g'(x).",
      "f(x)+g'(x).",
      "f'(x)+g(x)."
    ],
    "a": 0,
    "sol": "A derivação é linear relativamente à soma.",
    "hyp": "Pode multiplicar derivadas por analogia com o produto.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcd-regras-cadeia:probe:12-fcd-regras-cadeia:soma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-001",
    "sourceFile": "content/vnext/math-a/12/12-fcd-regras-cadeia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCONT-DER-009",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "Para f(x)=|x|, a derivada lateral esquerda em0 é...",
    "o": [
      "−1.",
      "1.",
      "0.",
      "não existe."
    ],
    "a": 0,
    "sol": "Para x<0, |x|=−x.",
    "hyp": "Pode usar a expressão do ramo direito.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcont-derivabilidade:anchor:12-fcont-derivabilidade:modulo-lateral",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-009",
    "sourceFile": "content/vnext/math-a/12/12-fcont-derivabilidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCONT-DER-001",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "Se f é derivável em a, então f é...",
    "o": [
      "contínua em a.",
      "descontínua em a.",
      "constante perto de a.",
      "necessariamente crescente."
    ],
    "a": 0,
    "sol": "Derivabilidade implica continuidade.",
    "hyp": "Pode inverter a implicação.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcont-derivabilidade:probe:12-fcont-derivabilidade:derivavel-continua",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-001",
    "sourceFile": "content/vnext/math-a/12/12-fcont-derivabilidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCONT-EG-006",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "Se f'(x)>0 em ]−∞,1[ e f'(x)<0 em ]1,+∞[, então x=1 é...",
    "o": [
      "mínimo local.",
      "máximo local.",
      "ponto de inflexão.",
      "nenhum extremo."
    ],
    "a": 1,
    "sol": "A função passa de crescente a decrescente.",
    "hyp": "Pode inverter a mudança de sinais.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcont-estudo-global:anchor:12-fcont-estudo-global:maximo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-006",
    "sourceFile": "content/vnext/math-a/12/12-fcont-estudo-global.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCONT-EG-001",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "Para estudar a monotonia de f usa-se sobretudo o sinal de...",
    "o": [
      "f'.",
      "f.",
      "f'' apenas.",
      "ln f."
    ],
    "a": 0,
    "sol": "O sinal da primeira derivada determina crescimento/decrescimento.",
    "hyp": "Pode usar o sinal da própria função.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcont-estudo-global:probe:12-fcont-estudo-global:monotonia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-001",
    "sourceFile": "content/vnext/math-a/12/12-fcont-estudo-global.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCONT-LC-009",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Limite intuitivo e continuidade",
    "q": "Se lim_{x→a}f(x)=L mas f(a)≠L, então f em a é...",
    "o": [
      "descontínua.",
      "contínua.",
      "derivável.",
      "constante."
    ],
    "a": 0,
    "sol": "A igualdade limite=valor falha.",
    "hyp": "Pode achar que existir limite basta.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcont-limites-continuidade:anchor:12-fcont-limites-continuidade:removivel",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-009",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCONT-LC-001",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Limite intuitivo e continuidade",
    "q": "Dizer que f é contínua em a significa, em termos intuitivos, que...",
    "o": [
      "o gráfico não apresenta quebra em a.",
      "f(a)=0.",
      "f'(a)=0.",
      "f é constante perto de a."
    ],
    "a": 0,
    "sol": "Continuidade significa ausência de salto, buraco ou quebra no ponto.",
    "hyp": "Pode confundir continuidade com derivada nula.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcont-limites-continuidade:probe:12-fcont-limites-continuidade:intuicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-001",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCONT-OP-013",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Operações com funções contínuas",
    "q": "Como |x|=√(x²), a continuidade de |x| pode justificar-se por...",
    "o": [
      "composição de funções contínuas.",
      "produto de funções descontínuas.",
      "quociente com denominador zero.",
      "derivabilidade em0."
    ],
    "a": 0,
    "sol": "x² é contínua e √· é contínua em [0,+∞[.",
    "hyp": "Pode usar derivabilidade em0, que é falsa.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcont-operacoes:anchor:12-fcont-operacoes:modulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-013",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12FCONT-OP-001",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Operações com funções contínuas",
    "q": "A soma de duas funções contínuas num ponto é...",
    "o": [
      "contínua nesse ponto.",
      "sempre descontínua.",
      "contínua só se ambas forem positivas.",
      "derivável obrigatoriamente."
    ],
    "a": 0,
    "sol": "A continuidade é preservada pela soma.",
    "hyp": "Pode pensar que a soma cria quebras.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-fcont-operacoes:probe:12-fcont-operacoes:soma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-001",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12IE-DA-008",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "Quadruplicar n faz o erro padrão da média...",
    "o": [
      "ficar um quarto.",
      "duplicar.",
      "não mudar.",
      "ficar metade."
    ],
    "a": 3,
    "sol": "√(4n)=2√n.",
    "hyp": "Pode supor proporcionalidade direta com n.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-ie-distribuicoes-amostragem:anchor:12-ie-distribuicoes-amostragem:escala",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-008",
    "sourceFile": "content/vnext/math-a/12/12-ie-distribuicoes-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12IE-DA-001",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "Uma distribuição de amostragem descreve...",
    "o": [
      "a distribuição de uma estatística em muitas amostras possíveis.",
      "a distribuição dos dados de uma única amostra apenas.",
      "a população sem incerteza.",
      "apenas os erros de medição."
    ],
    "a": 0,
    "sol": "Imagina-se repetir o processo amostral e observar a estatística em cada amostra.",
    "hyp": "Pode confundir distribuição dos dados com distribuição de uma estatística.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-ie-distribuicoes-amostragem:probe:12-ie-distribuicoes-amostragem:definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-001",
    "sourceFile": "content/vnext/math-a/12/12-ie-distribuicoes-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12IE-EST-016",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Estimação de parâmetros",
    "q": "Se X̄ estima μ com erro padrão 2, uma amostra maior tende a produzir erro padrão...",
    "o": [
      "maior sempre.",
      "igual sempre.",
      "negativo.",
      "menor que2, mantendo σ comparável."
    ],
    "a": 3,
    "sol": "EP≈σ/√n.",
    "hyp": "Pode pensar que mais dados aumentam erro.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-ie-estimacao:anchor:12-ie-estimacao:n",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-016",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12IE-EST-001",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Estimação de parâmetros",
    "q": "Estimar um parâmetro significa...",
    "o": [
      "usar dados amostrais para aproximar uma característica populacional desconhecida.",
      "calcular um valor sem incerteza.",
      "observar toda a população sempre.",
      "substituir a amostra pelo parâmetro."
    ],
    "a": 0,
    "sol": "A estimação usa estatísticas para aprender sobre parâmetros desconhecidos.",
    "hyp": "Pode confundir estimativa com valor exato.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-ie-estimacao:probe:12-ie-estimacao:definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-001",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12IE-IA-006",
    "themeId": "12-ie",
    "subtopicId": "12-ie-inferencia-amostragem",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Raciocínio inferencial e amostragem",
    "q": "A média de 80 alunos selecionados de uma escola é...",
    "o": [
      "um parâmetro populacional necessariamente.",
      "uma estatística amostral.",
      "a população.",
      "um viés."
    ],
    "a": 1,
    "sol": "Foi calculada numa amostra.",
    "hyp": "Pode chamar parâmetro a qualquer média.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-ie-inferencia-amostragem:anchor:12-ie-inferencia-amostragem:media-amostral",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IA-006",
    "sourceFile": "content/vnext/math-a/12/12-ie-inferencia-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12IE-IA-001",
    "themeId": "12-ie",
    "subtopicId": "12-ie-inferencia-amostragem",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Raciocínio inferencial e amostragem",
    "q": "A inferência estatística procura...",
    "o": [
      "tirar conclusões sobre uma população a partir de uma amostra.",
      "descrever apenas a amostra sem generalizar.",
      "eliminar toda a incerteza.",
      "substituir a recolha de dados."
    ],
    "a": 0,
    "sol": "A ideia central é usar informação amostral para aprender sobre parâmetros populacionais.",
    "hyp": "Pode confundir estatística descritiva com inferencial.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-ie-inferencia-amostragem:probe:12-ie-inferencia-amostragem:objetivo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IA-001",
    "sourceFile": "content/vnext/math-a/12/12-ie-inferencia-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12IE-IC-015",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "Para 95%, usando z*=1,96, σ=10 e n=100, a margem de erro é 1,96. Se a média amostral é 40, qual é aproximadamente o IC95%?",
    "o": [
      "[30;50].",
      "[39,02;40,98].",
      "[38,04;41,96].",
      "[40;41,96]."
    ],
    "a": 2,
    "sol": "40±1,96.",
    "hyp": "Pode usar 0,98 como margem.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-ie-intervalos-confianca:anchor:12-ie-intervalos-confianca:media-ic",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-015",
    "sourceFile": "content/vnext/math-a/12/12-ie-intervalos-confianca.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12IE-IC-001",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "Um intervalo de confiança procura...",
    "o": [
      "dar um intervalo plausível para um parâmetro populacional.",
      "dar o valor exato do parâmetro.",
      "eliminar a variabilidade amostral.",
      "descrever apenas os dados individuais."
    ],
    "a": 0,
    "sol": "Combina estimativa pontual e margem de erro.",
    "hyp": "Pode confundir intervalo com certeza absoluta.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-ie-intervalos-confianca:probe:12-ie-intervalos-confianca:definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-001",
    "sourceFile": "content/vnext/math-a/12/12-ie-intervalos-confianca.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12IE-TLC-011",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "Assim, X̄ é aproximadamente N(100,2²), se a notação usar variância no segundo parâmetro. Isto significa desvio padrão...",
    "o": [
      "4.",
      "100.",
      "2.",
      "20."
    ],
    "a": 2,
    "sol": "2² é a variância, logo o desvio padrão é2.",
    "hyp": "Pode confundir variância e desvio padrão.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-ie-tlc:anchor:12-ie-tlc:notacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-011",
    "sourceFile": "content/vnext/math-a/12/12-ie-tlc.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12IE-TLC-001",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "O Teorema Limite Central descreve, em termos gerais, o comportamento...",
    "o": [
      "da distribuição da média/soma de muitas observações.",
      "apenas da mediana populacional.",
      "de qualquer dado individual.",
      "só de amostras de tamanho1."
    ],
    "a": 0,
    "sol": "Sob condições adequadas, médias/somas normalizadas aproximam uma distribuição Normal.",
    "hyp": "Pode confundir dados individuais com médias amostrais.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-ie-tlc:probe:12-ie-tlc:ideia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-001",
    "sourceFile": "content/vnext/math-a/12/12-ie-tlc.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12INT-AR-010",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Áreas e aplicações",
    "q": "A área geométrica entre y=x e Ox em [−1,1] pode escrever-se...",
    "o": [
      "∫_{−1}^1 xdx.",
      "∫_{−1}^0(−x)dx+∫_0^1 xdx.",
      "∫_{−1}^1(−x)dx.",
      "∫_0^1 xdx apenas."
    ],
    "a": 1,
    "sol": "No lado negativo, a função está abaixo de Ox e usa-se −x.",
    "hyp": "Pode não inverter o sinal onde a função é negativa.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-int-areas:anchor:12-int-areas:separar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-010",
    "sourceFile": "content/vnext/math-a/12/12-int-areas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12INT-AR-001",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Áreas e aplicações",
    "q": "Se f(x)≥0 em [a,b], a área entre o gráfico de f e o eixo Ox é...",
    "o": [
      "∫_a^b f(x)dx.",
      "−∫_a^b f(x)dx.",
      "|f(b)−f(a)|.",
      "f(a)+f(b)."
    ],
    "a": 0,
    "sol": "Quando f é não negativa, a integral definida coincide com a área geométrica.",
    "hyp": "Pode confundir área com variação da função.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-int-areas:probe:12-int-areas:area-positiva",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-001",
    "sourceFile": "content/vnext/math-a/12/12-int-areas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12INT-ID-009",
    "themeId": "12-int",
    "subtopicId": "12-int-integral-definido",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Integral definido",
    "q": "Se ∫_1^3 f=5, então ∫_3^1 f=",
    "o": [
      "−5.",
      "5.",
      "0.",
      "1/5."
    ],
    "a": 0,
    "sol": "Trocar limites muda o sinal.",
    "hyp": "Pode manter o valor.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-int-integral-definido:anchor:12-int-integral-definido:troca",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-ID-009",
    "sourceFile": "content/vnext/math-a/12/12-int-integral-definido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12INT-ID-001",
    "themeId": "12-int",
    "subtopicId": "12-int-integral-definido",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Integral definido",
    "q": "A integral definida ∫_a^b f(x)dx representa, em termos geométricos...",
    "o": [
      "área algébrica entre o gráfico e Ox.",
      "sempre área positiva.",
      "a derivada de f.",
      "a média de a e b."
    ],
    "a": 0,
    "sol": "Áreas acima de Ox contam positivamente e abaixo negativamente.",
    "hyp": "Pode confundir integral com área geométrica sempre positiva.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-int-integral-definido:probe:12-int-integral-definido:interpretacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-ID-001",
    "sourceFile": "content/vnext/math-a/12/12-int-integral-definido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12INT-PR-019",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "Se F'(x)=2x e F(0)=5, então F(x)=",
    "o": [
      "x².",
      "2x+5.",
      "x²+5.",
      "x²−5."
    ],
    "a": 2,
    "sol": "F=x²+C; F(0)=C=5.",
    "hyp": "Pode esquecer usar a condição inicial.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-int-primitiva:anchor:12-int-primitiva:condicao-inicial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-019",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12INT-PR-001",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "Uma função F é primitiva de f num intervalo se...",
    "o": [
      "F'=f nesse intervalo.",
      "F=f'.",
      "F=f.",
      "F''=0."
    ],
    "a": 0,
    "sol": "Por definição, derivar F devolve f.",
    "hyp": "Pode inverter a relação entre função e primitiva.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-int-primitiva:probe:12-int-primitiva:definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-001",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12INT-TP-014",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Primitivas imediatas e propriedades",
    "q": "∫(3e^x−2cosx)dx=",
    "o": [
      "3e^x+2sinx+C.",
      "3e^x−2sinx+C.",
      "e^{3x}−2sinx+C.",
      "3e^x−2cosx+C."
    ],
    "a": 1,
    "sol": "Integra-se cada termo.",
    "hyp": "Pode trocar a primitiva do cosseno.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-int-tabela-propriedades:anchor:12-int-tabela-propriedades:exp-trig",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-014",
    "sourceFile": "content/vnext/math-a/12/12-int-tabela-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12INT-TP-001",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Primitivas imediatas e propriedades",
    "q": "A integral indefinida é linear: ∫(f+g)dx=",
    "o": [
      "∫f dx+∫g dx.",
      "∫f dx·∫g dx.",
      "∫f dx−∫g dx.",
      "∫fg dx."
    ],
    "a": 0,
    "sol": "Primitivas somam-se termo a termo.",
    "hyp": "Pode confundir soma com produto.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-int-tabela-propriedades:probe:12-int-tabela-propriedades:linearidade-soma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-001",
    "sourceFile": "content/vnext/math-a/12/12-int-tabela-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12INT-TFC-011",
    "themeId": "12-int",
    "subtopicId": "12-int-tfc-barrow",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Teorema Fundamental do Cálculo / Fórmula de Barrow",
    "q": "∫_1^e 1/x dx=",
    "o": [
      "e−1.",
      "ln(e−1).",
      "1.",
      "0."
    ],
    "a": 2,
    "sol": "Primitiva lnx; ln e−ln1=1.",
    "hyp": "Pode usar e−1.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-int-tfc-barrow:anchor:12-int-tfc-barrow:log",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TFC-011",
    "sourceFile": "content/vnext/math-a/12/12-int-tfc-barrow.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12INT-TFC-001",
    "themeId": "12-int",
    "subtopicId": "12-int-tfc-barrow",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Teorema Fundamental do Cálculo / Fórmula de Barrow",
    "q": "A Fórmula de Barrow afirma que, se F'=f, então...",
    "o": [
      "∫_a^b f(x)dx=F(b)−F(a).",
      "∫_a^b f=F(a)−F(b).",
      "∫f=F'(b).",
      "∫f=f(b)−f(a)."
    ],
    "a": 0,
    "sol": "Avalia-se uma primitiva nos limites superior e inferior.",
    "hyp": "Pode inverter os limites ou usar f em vez de F.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-int-tfc-barrow:probe:12-int-tfc-barrow:barrow",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TFC-001",
    "sourceFile": "content/vnext/math-a/12/12-int-tfc-barrow.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12MAT-AE-007",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "Se A=[[1,−3],[2,0]], então −A=",
    "o": [
      "[[1,3],[−2,0]].",
      "[[-1,−3],[2,0]].",
      "[[-1,3],[-2,0]].",
      "[[0,0],[0,0]]."
    ],
    "a": 2,
    "sol": "Muda-se o sinal de cada elemento.",
    "hyp": "Pode mudar apenas alguns sinais.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-mat-adicao-escalar:anchor:12-mat-adicao-escalar:oposto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-007",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12MAT-AE-001",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "Duas matrizes podem somar-se quando...",
    "o": [
      "têm a mesma dimensão.",
      "são ambas quadradas apenas.",
      "têm o mesmo determinante.",
      "o número total de elementos é igual, mesmo com dimensões diferentes."
    ],
    "a": 0,
    "sol": "A soma é definida elemento a elemento em posições correspondentes.",
    "hyp": "Pode olhar apenas para o número de elementos.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-mat-adicao-escalar:probe:12-mat-adicao-escalar:compatibilidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-001",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12MAT-MOD-018",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Modelação e aplicações",
    "q": "Se A é matriz de adjacência 0/1, a soma dos elementos da linha i numa rede não dirigida simples dá...",
    "o": [
      "o número total de vértices.",
      "o grau do vértice i.",
      "o número de caminhos de comprimento2.",
      "a distância ao vértice i."
    ],
    "a": 1,
    "sol": "Conta quantos vizinhos estão ligados a i.",
    "hyp": "Pode confundir ligações diretas com caminhos.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-mat-modelacao:anchor:12-mat-modelacao:grau",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-018",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12MAT-MOD-001",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Modelação e aplicações",
    "q": "Uma vantagem das matrizes em modelação é...",
    "o": [
      "organizar e combinar muitos dados relacionados de forma compacta.",
      "eliminar a necessidade de interpretar unidades.",
      "garantir que qualquer modelo é linear.",
      "substituir todos os gráficos."
    ],
    "a": 0,
    "sol": "Matrizes permitem estruturar tabelas, transformações e relações lineares.",
    "hyp": "Pode atribuir às matrizes propriedades que o modelo não tem.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-mat-modelacao:probe:12-mat-modelacao:vantagem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-001",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12MAT-PRD-006",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "[[1,2],[3,4]]·[[1,0],[0,1]]=",
    "o": [
      "[[1,0],[0,4]].",
      "[[1,2],[3,4]].",
      "[[1,3],[2,4]].",
      "[[2,2],[3,8]]."
    ],
    "a": 1,
    "sol": "Multiplicar pela identidade à direita não altera a matriz.",
    "hyp": "Pode tratar a identidade como máscara diagonal.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-mat-produto:anchor:12-mat-produto:identidade-direita",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-006",
    "sourceFile": "content/vnext/math-a/12/12-mat-produto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12MAT-PRD-001",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "O produto AB está definido quando...",
    "o": [
      "o número de colunas de A é igual ao número de linhas de B.",
      "A e B têm a mesma dimensão.",
      "A e B são quadradas.",
      "o número de linhas de A é igual ao número de colunas de B."
    ],
    "a": 0,
    "sol": "Para multiplicar A_{m×n} por B_{n×p}, as dimensões internas n têm de coincidir.",
    "hyp": "Pode exigir dimensões iguais como na soma.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-mat-produto:probe:12-mat-produto:compatibilidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-001",
    "sourceFile": "content/vnext/math-a/12/12-mat-produto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12MAT-RT-009",
    "themeId": "12-mat",
    "subtopicId": "12-mat-representacao-tipos",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Representação, dimensão, elementos e tipos de matrizes",
    "q": "A matriz [[3,−1,4]] é uma matriz...",
    "o": [
      "linha 1×3.",
      "coluna 3×1.",
      "quadrada3×3.",
      "diagonal."
    ],
    "a": 0,
    "sol": "Tem uma linha e três colunas.",
    "hyp": "Pode ler os três elementos como linhas.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-mat-representacao-tipos:anchor:12-mat-representacao-tipos:linha",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-RT-009",
    "sourceFile": "content/vnext/math-a/12/12-mat-representacao-tipos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12MAT-RT-001",
    "themeId": "12-mat",
    "subtopicId": "12-mat-representacao-tipos",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Representação, dimensão, elementos e tipos de matrizes",
    "q": "Uma matriz m×n tem...",
    "o": [
      "m linhas e n colunas.",
      "m colunas e n linhas.",
      "m+n linhas.",
      "mn linhas."
    ],
    "a": 0,
    "sol": "A primeira dimensão indica linhas e a segunda colunas.",
    "hyp": "Pode trocar linhas e colunas.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-mat-representacao-tipos:probe:12-mat-representacao-tipos:dimensao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-RT-001",
    "sourceFile": "content/vnext/math-a/12/12-mat-representacao-tipos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12MAT-TR-006",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Transformações geométricas com matrizes",
    "q": "[[1,0],[0,−1]] transforma (2,−3) em...",
    "o": [
      "(−2,−3).",
      "(2,3).",
      "(−2,3).",
      "(3,2)."
    ],
    "a": 1,
    "sol": "Mantém x e muda o sinal de y.",
    "hyp": "Pode refletir no eixo errado.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-mat-transformacoes:anchor:12-mat-transformacoes:reflexao-ox",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-006",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12MAT-TR-001",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Transformações geométricas com matrizes",
    "q": "Uma transformação linear do plano representada por uma matriz 2×2 atua num ponto/vetor (x,y)^T através de...",
    "o": [
      "A(x,y)^T.",
      "(x,y)A sem convenção.",
      "A+(x,y).",
      "A^T apenas."
    ],
    "a": 0,
    "sol": "Com vetores-coluna, a imagem é obtida pelo produto matriz-vetor.",
    "hyp": "Pode confundir transformação com soma matricial.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-mat-transformacoes:probe:12-mat-transformacoes:acao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-001",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-PC-007",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Probabilidade condicionada",
    "q": "Se A⊂B e P(B)>0, então P(A|B)=...",
    "o": [
      "P(B)/P(A).",
      "P(A).",
      "P(A)/P(B).",
      "1."
    ],
    "a": 2,
    "sol": "A∩B=A, logo P(A|B)=P(A)/P(B).",
    "hyp": "Pode concluir 1 só por haver inclusão.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-condicionada:anchor:12-prob-condicionada:inclusao-7",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-007",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-PC-001",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Probabilidade condicionada",
    "q": "A probabilidade condicionada P(A|B) significa...",
    "o": [
      "a probabilidade de A sabendo que B ocorreu.",
      "a probabilidade de B sabendo que A ocorreu.",
      "a probabilidade de A∪B.",
      "a probabilidade de A^c."
    ],
    "a": 0,
    "sol": "A barra vertical lê-se 'dado que' ou 'sabendo que'.",
    "hyp": "Pode inverter a ordem A e B.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-condicionada:probe:12-prob-condicionada:def-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-001",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-CI-010",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Tabelas de contingência e independência",
    "q": "Se A e B são independentes, P(A)=0,6 e P(B)=0,5, então P(A∪B)=...",
    "o": [
      "1,1.",
      "0,8.",
      "0,3.",
      "0,5."
    ],
    "a": 1,
    "sol": "Interseção=0,3; união=0,6+0,5−0,3=0,8.",
    "hyp": "Pode somar e ultrapassar 1.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-contingencia-independencia:anchor:12-prob-contingencia-independencia:uniao-10",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-010",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-CI-001",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Tabelas de contingência e independência",
    "q": "Uma tabela de contingência organiza dados segundo...",
    "o": [
      "duas variáveis categóricas.",
      "uma única variável contínua.",
      "apenas médias.",
      "apenas probabilidades condicionadas."
    ],
    "a": 0,
    "sol": "As linhas e colunas correspondem a categorias de duas variáveis.",
    "hyp": "Pode confundir com tabela de frequências univariada.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-contingencia-independencia:probe:12-prob-contingencia-independencia:def-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-001",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-FA-020",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "Se A⊂B, então A∩B=...",
    "o": [
      "B.",
      "∅.",
      "Ω.",
      "A."
    ],
    "a": 3,
    "sol": "Tudo o que está em A já pertence a B.",
    "hyp": "Pode trocar interseção com união.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-fenomeno-acontecimentos:anchor:12-prob-fenomeno-acontecimentos:inclusao-intersecao-20",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-020",
    "sourceFile": "content/vnext/math-a/12/12-prob-fenomeno-acontecimentos.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-FA-001",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "Um fenómeno aleatório é uma experiência cujo resultado...",
    "o": [
      "não pode ser previsto com certeza antes da realização.",
      "é sempre o mesmo.",
      "é necessariamente numérico.",
      "é impossível de observar."
    ],
    "a": 0,
    "sol": "Num fenómeno aleatório conhecem-se os resultados possíveis, mas não o que ocorrerá numa realização concreta.",
    "hyp": "Pode confundir aleatoriedade com ausência total de regras.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-fenomeno-acontecimentos:probe:12-prob-fenomeno-acontecimentos:definicao-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-001",
    "sourceFile": "content/vnext/math-a/12/12-prob-fenomeno-acontecimentos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-NO-019",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "Para uma Normal, P(X<μ) e P(X>μ) são...",
    "o": [
      "0 e1.",
      "dependentes de μ.",
      "ambas 0,5.",
      "ambas 1."
    ],
    "a": 2,
    "sol": "A simetria divide a área ao meio e P(X=μ)=0.",
    "hyp": "Pode achar que o valor numérico de μ altera as metades.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-normal:anchor:12-prob-normal:simetria-19",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-019",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-NO-001",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "A variância de uma variável aleatória mede sobretudo...",
    "o": [
      "a dispersão em torno do valor médio.",
      "a probabilidade total.",
      "o valor máximo.",
      "a mediana sempre."
    ],
    "a": 0,
    "sol": "A variância quantifica a variabilidade relativamente à média.",
    "hyp": "Pode confundir dispersão com localização.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-normal:probe:12-prob-normal:variancia-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-001",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-PA-015",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "Na urna 3 V e 2 A sem reposição, P(duas cores diferentes)=...",
    "o": [
      "3/10.",
      "1/2.",
      "3/5.",
      "6/25."
    ],
    "a": 2,
    "sol": "P(VA)+P(AV)=3/10+3/10=3/5.",
    "hyp": "Pode contar apenas uma das ordens.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-produto-arvores:anchor:12-prob-produto-arvores:cores-dif-15",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-015",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-PA-001",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "A regra do produto pode escrever-se como...",
    "o": [
      "P(A∩B)=P(A)P(B|A).",
      "P(A∩B)=P(A)+P(B).",
      "P(A∪B)=P(A)P(B).",
      "P(A|B)=P(A)P(B)."
    ],
    "a": 0,
    "sol": "A probabilidade de ocorrer A e depois B é P(A) vezes a probabilidade de B condicionada a A.",
    "hyp": "Pode somar probabilidades de etapas sucessivas.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-produto-arvores:probe:12-prob-produto-arvores:regra-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-001",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-PR-011",
    "themeId": "12-prob",
    "subtopicId": "12-prob-propriedades",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Probabilidade e propriedades elementares",
    "q": "P(A)=0,4, P(B)=0,7 e P(A∪B)=0,8. P(A∩B)=...",
    "o": [
      "0,1.",
      "0,2.",
      "0,3.",
      "0,4."
    ],
    "a": 2,
    "sol": "0,4+0,7−x=0,8 => x=0,3.",
    "hyp": "Pode somar a união em vez de isolar a interseção.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-propriedades:anchor:12-prob-propriedades:inter-num-11",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PR-011",
    "sourceFile": "content/vnext/math-a/12/12-prob-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-PR-001",
    "themeId": "12-prob",
    "subtopicId": "12-prob-propriedades",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Probabilidade e propriedades elementares",
    "q": "Para qualquer acontecimento A, P(A) pertence a...",
    "o": [
      "[0,1].",
      "R.",
      "]1,+∞[.",
      "{0,1} apenas."
    ],
    "a": 0,
    "sol": "Uma probabilidade está sempre entre 0 e 1.",
    "hyp": "Pode confundir probabilidade com frequência absoluta.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-propriedades:probe:12-prob-propriedades:intervalo-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PR-001",
    "sourceFile": "content/vnext/math-a/12/12-prob-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-PT-011",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "Se P(B|A)=0,2 e P(B|A^c)=0,8, então P(B)...",
    "o": [
      "tem de ser 0,5.",
      "tem de ser 1.",
      "fica entre 0,2 e0,8, dependendo de P(A).",
      "é sempre 0,16."
    ],
    "a": 2,
    "sol": "É uma média ponderada de 0,2 e0,8.",
    "hyp": "Pode usar média simples sem conhecer os pesos.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-total:anchor:12-prob-total:intervalo-media-11",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-011",
    "sourceFile": "content/vnext/math-a/12/12-prob-total.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-PT-001",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "Se A e A^c formam uma partição, então P(B) pode escrever-se como...",
    "o": [
      "P(B|A)P(A)+P(B|A^c)P(A^c).",
      "P(B|A)+P(B|A^c).",
      "P(A)P(A^c).",
      "P(A|B)+P(A^c|B)."
    ],
    "a": 0,
    "sol": "B pode ocorrer pelo ramo A ou pelo ramo A^c; somam-se as probabilidades conjuntas dos dois caminhos.",
    "hyp": "Pode somar condicionais sem ponderar.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-total:probe:12-prob-total:formula-dois-ramos-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-001",
    "sourceFile": "content/vnext/math-a/12/12-prob-total.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-VD-008",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "Se X assume 1,2,3 com probabilidades 0,2;0,3;k, então k=...",
    "o": [
      "0,2.",
      "0,3.",
      "0,4.",
      "0,5."
    ],
    "a": 3,
    "sol": "0,2+0,3+k=1 =>k=0,5.",
    "hyp": "Pode fazer a soma das massas igual ao maior valor de X.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-variaveis-discretas:anchor:12-prob-variaveis-discretas:normalizar-8",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-008",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12PROB-VD-001",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "Uma variável aleatória discreta associa a cada resultado elementar...",
    "o": [
      "um valor numérico de um conjunto finito ou enumerável.",
      "uma probabilidade necessariamente igual.",
      "um intervalo contínuo obrigatório.",
      "um acontecimento impossível."
    ],
    "a": 0,
    "sol": "Uma variável aleatória é uma função numérica sobre o espaço de resultados; discreta quando os valores possíveis são finitos ou enumeráveis.",
    "hyp": "Pode confundir variável aleatória com probabilidade.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-prob-variaveis-discretas:probe:12-prob-variaveis-discretas:def-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-001",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12RAE-BIS-012",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "Se L0=1, após 10 bisseções a amplitude é...",
    "o": [
      "1/10.",
      "1/100.",
      "1024.",
      "1/1024."
    ],
    "a": 3,
    "sol": "1/2^{10}=1/1024.",
    "hyp": "Pode confundir potência com produto10×2.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-rae-bissecao:anchor:12-rae-bissecao:amplitude-10",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-012",
    "sourceFile": "content/vnext/math-a/12/12-rae-bissecao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12RAE-BIS-001",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "O método da bisseção começa com...",
    "o": [
      "um intervalo [a,b] onde uma função contínua muda de sinal.",
      "um ponto qualquer e a derivada.",
      "duas raízes exatas.",
      "um polinómio obrigatoriamente."
    ],
    "a": 0,
    "sol": "A bisseção usa uma garantia de raiz por mudança de sinal.",
    "hyp": "Pode confundir com Newton, que usa um ponto inicial.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-rae-bissecao:probe:12-rae-bissecao:inicio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-001",
    "sourceFile": "content/vnext/math-a/12/12-rae-bissecao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12RAE-BL-017",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bolzano-localizacao",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes",
    "q": "Se f é contínua e estritamente crescente em [a,b], com f(a)<0<f(b), então há...",
    "o": [
      "exatamente uma raiz em ]a,b[.",
      "pelo menos duas raízes.",
      "nenhuma raiz.",
      "uma raiz apenas se f'(a)=0."
    ],
    "a": 0,
    "sol": "Bolzano dá existência e monotonia estrita dá unicidade.",
    "hyp": "Pode ignorar o papel da monotonia.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-rae-bolzano-localizacao:anchor:12-rae-bolzano-localizacao:existencia-unicidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BL-017",
    "sourceFile": "content/vnext/math-a/12/12-rae-bolzano-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12RAE-BL-001",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bolzano-localizacao",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes",
    "q": "O Teorema de Bolzano permite garantir uma raiz de f em ]a,b[ quando...",
    "o": [
      "f é contínua em [a,b] e f(a)f(b)<0.",
      "f'(a)=f'(b).",
      "f(a)=f(b).",
      "f é derivável e positiva."
    ],
    "a": 0,
    "sol": "A mudança de sinal numa função contínua força passagem por zero.",
    "hyp": "Pode esquecer a hipótese de continuidade.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-rae-bolzano-localizacao:probe:12-rae-bolzano-localizacao:bolzano-condicoes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BL-001",
    "sourceFile": "content/vnext/math-a/12/12-rae-bolzano-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12RAE-NEW-012",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "role": "anchor",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "A reta tangente a f em x_n tem equação...",
    "o": [
      "y=f'(x_n)x.",
      "y=f(x_n)x+x_n.",
      "y=x_n+f'(x_n).",
      "y=f(x_n)+f'(x_n)(x−x_n)."
    ],
    "a": 3,
    "sol": "É a forma ponto-declive.",
    "hyp": "Pode esquecer o ponto de tangência.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-rae-newton:anchor:12-rae-newton:tangente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-012",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "DG-VN12RAE-NEW-001",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "role": "probe",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "O método de Newton-Raphson usa, em cada passo...",
    "o": [
      "a reta tangente ao gráfico.",
      "o ponto médio de um intervalo.",
      "apenas os sinais nos extremos.",
      "uma média de duas raízes."
    ],
    "a": 0,
    "sol": "A próxima aproximação é a abcissa onde a tangente corta o eixo Ox.",
    "hyp": "Pode confundir com bisseção.",
    "contexts": [
      "diagnostic"
    ],
    "signature": "diagnostic:12-rae-newton:probe:12-rae-newton:ideia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-001",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  }
];
