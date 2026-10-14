export const MATH_STATISTICS_10_REVIEW_VERSION="2026.10-wave15";

export const STATISTICS_10_REVIEW={
  id:"10-est",
  title:"Estatística",
  lead:"Estatística não é apenas calcular médias: começa por formular uma pergunta em que existe variabilidade, recolher dados de forma credível e escolher representações e medidas adequadas. Neste capítulo vais distinguir população, amostra e variável, reconhecer enviesamentos, organizar dados univariados, interpretar localização e dispersão e estudar associações entre duas variáveis sem confundir correlação com causalidade.",
  goals:[
    "Reconhecer um problema estatístico, identificar população, amostra e variável e distinguir dados quantitativos discretos e contínuos.",
    "Avaliar se uma amostra pode representar a população e reconhecer mecanismos de seleção que introduzem enviesamento.",
    "Organizar e representar dados univariados com tabelas, gráficos de barras, caule-e-folhas, extremos-e-quartis e histogramas adequados.",
    "Interpretar média, mediana, moda, percentis, amplitude, amplitude interquartil e desvio padrão, incluindo resistência a outliers.",
    "Interpretar diagramas de dispersão, correlação linear e regressão, respeitando o domínio dos dados e distinguindo associação de causa-efeito."
  ],
  sourceBasis:[
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 10.º ano · março de 2026 · Estatística",
    "DGE · Coletânea de tarefas das turmas piloto · Estatística · Matemática A 10.º ano · abril de 2024"
  ],
  sections:[
    {
      id:"10-est-problema-pop-amostra",
      kicker:"1 · PROBLEMA ESTATÍSTICO, POPULAÇÃO, AMOSTRA E VARIÁVEL",
      title:"Uma pergunta estatística admite variabilidade nas respostas",
      paragraphs:[
        "Um problema estatístico nasce de uma pergunta cuja resposta depende de dados e em que existe variabilidade. Perguntar a altura de uma pessoa concreta é uma medição; perguntar como se distribuem as alturas dos alunos de uma escola é um problema estatístico porque diferentes unidades podem produzir valores diferentes.",
        "A população é o conjunto de unidades sobre o qual se pretende conhecer algo. Uma amostra é um subconjunto dessas unidades observado para estudar a população. A variável é a característica registada em cada unidade: por exemplo, idade, tempo de deslocação ou meio de transporte.",
        "Dados quantitativos discretos resultam tipicamente de contagens e assumem valores isolados; dados quantitativos contínuos resultam tipicamente de medições e podem assumir valores num intervalo. A forma como a variável é registada também importa: uma idade contínua pode aparecer arredondada a anos inteiros, e uma medida contínua pode ser agrupada em categorias."
      ],
      formulas:[
        "procedimento estatístico: produzir/adquirir dados → organizar/representar → interpretar",
        "população = conjunto de unidades de interesse",
        "amostra ⊂ população, quando é selecionada a partir dessa população",
        "variável = característica observada em cada unidade estatística"
      ],
      example:{
        title:"Exemplo resolvido · tempos de deslocação para a escola",
        steps:[
          "Pergunta: ‘Como se distribui o tempo de deslocação dos alunos da escola até às aulas?’ Há variabilidade, logo é uma questão estatística.",
          "População: todos os alunos da escola. Se forem observados 120 alunos, esses 120 constituem a amostra.",
          "Variável: tempo de deslocação, medido em minutos; conceptualmente é quantitativa contínua, mesmo que seja registada ao minuto inteiro.",
          "Depois da recolha, os valores devem ser organizados e representados antes de tirar conclusões."
        ],
        result:"Problema estatístico identificado; população, amostra e variável ficam definidos antes da análise.",
        note:"Uma lista de números sem contexto não diz, por si só, qual é a população nem como os dados foram produzidos."
      },
      remember:"Antes de calcular seja o que for, pergunta: qual é a questão, quem é a população, quem foi observado e que variável foi medida?",
      pitfalls:[
        "Confundir a amostra — as unidades observadas — com a lista de valores que a variável assume nessas unidades.",
        "Classificar automaticamente uma variável apenas pelo aspeto dos dados registados, ignorando a natureza e o modo de medição."
      ]
    },
    {
      id:"10-est-amostragem",
      kicker:"2 · AMOSTRAGEM, REPRESENTATIVIDADE E ENVIESAMENTO",
      title:"Uma amostra grande pode continuar errada se for mal selecionada",
      paragraphs:[
        "Quando não é possível observar toda a população, recolhe-se uma amostra e usa-se a informação obtida para aprender sobre a população. Para que essa inferência seja credível, o processo de seleção deve evitar favorecer sistematicamente certos grupos ou excluir outros relevantes.",
        "Uma amostra de conveniência — por exemplo, perguntar apenas a quem está disponível num local específico — pode ser fácil de recolher e ainda assim produzir conclusões enviesadas. Aumentar o número de respostas não corrige automaticamente um mecanismo de seleção tendencioso.",
        "Métodos de amostragem procuram dar à população uma representação adequada. Dependendo do contexto, pode fazer sentido uma seleção aleatória ou garantir presença de grupos relevantes. Mais importante do que decorar nomes é conseguir explicar por que o processo usado pode ou não representar a população a que se pretende generalizar."
      ],
      formulas:[
        "amostra representativa ⇒ composição relevante semelhante à população para o objetivo do estudo",
        "enviesamento de seleção = mecanismo que favorece sistematicamente certas unidades/grupos",
        "amostra maior ≠ garantia de ausência de enviesamento"
      ],
      example:{
        title:"Exemplo resolvido · inquérito sobre utilização da cantina",
        steps:[
          "Objetivo: estimar a percentagem de alunos da escola que almoça regularmente na cantina.",
          "Recolher respostas apenas à saída da cantina sobre-representa precisamente quem a utiliza e cria enviesamento de seleção.",
          "Uma seleção de alunos a partir das turmas, cobrindo diferentes anos e horários, é mais plausível como representação da escola.",
          "Mesmo com 500 respostas recolhidas à porta da cantina, o problema do mecanismo de seleção continuaria a existir."
        ],
        result:"A qualidade da inferência depende do modo de seleção, não apenas do tamanho da amostra.",
        note:"Representatividade é sempre relativa à população e à pergunta concreta do estudo."
      },
      remember:"Pergunta sempre quem teve oportunidade de entrar na amostra e quem ficou sistematicamente de fora.",
      pitfalls:[
        "Assumir que uma amostra é representativa apenas porque tem muitos elementos.",
        "Generalizar para toda a população conclusões obtidas num grupo escolhido por conveniência sem discutir o enviesamento."
      ]
    },
    {
      id:"10-est-univariados-representacoes",
      kicker:"3 · DADOS UNIVARIADOS E REPRESENTAÇÕES",
      title:"A representação deve revelar o padrão sem esconder a variabilidade",
      paragraphs:[
        "Dados univariados correspondem à observação de uma única variável. Podem ser organizados em tabelas de frequências absolutas, relativas e acumuladas. Frequências relativas permitem comparar grupos de dimensões diferentes porque expressam a proporção de observações em cada valor ou classe.",
        "A escolha do gráfico depende do tipo de dados e do objetivo. Gráficos de barras são naturais para valores discretos/categorias; diagramas de caule-e-folhas preservam os valores individuais; diagramas de extremos-e-quartis ajudam a comparar distribuições; histogramas organizam dados quantitativos contínuos em intervalos e representam frequências por áreas.",
        "Num histograma, a escolha das classes muda a aparência do padrão. Com classes demasiado numerosas o gráfico pode parecer ruidoso; com classes demasiado largas pode esconder estrutura. Nas AE do 10.º ano trabalha-se a construção com classes de igual amplitude, mas o aluno deve perceber que o histograma não é simplesmente um gráfico de barras sem espaços."
      ],
      formulas:[
        "frequência relativa=frequência absoluta / número total de observações",
        "frequência relativa acumulada=Σ frequências relativas até ao valor/classe",
        "classes de igual amplitude: amplitude da classe=limite superior−limite inferior",
        "histograma: frequência representada pela área das barras"
      ],
      example:{
        title:"Exemplo resolvido · frequências de número de irmãos",
        steps:[
          "Dados de 10 alunos: 0,1,1,1,2,2,2,3,3,4.",
          "Para o valor 2, a frequência absoluta é 3 e a relativa é 3/10=0,30=30%.",
          "A frequência absoluta acumulada até 2 é 1+3+3=7; a relativa acumulada é 70%.",
          "Como o número de irmãos é discreto, um gráfico de barras é mais natural do que um histograma."
        ],
        result:"Para 2 irmãos: frequência absoluta 3, relativa 30%; até 2 irmãos: frequência acumulada 7 ou 70%.",
        note:"O tipo de gráfico é uma decisão estatística, não apenas estética."
      },
      remember:"Organiza primeiro; depois escolhe uma representação coerente com o tipo de variável e com a pergunta.",
      pitfalls:[
        "Usar um histograma para categorias isoladas como se fosse um gráfico de barras comum.",
        "Interpretar a forma de um histograma sem considerar que o número e a amplitude das classes influenciam o aspeto do gráfico."
      ]
    },
    {
      id:"10-est-localizacao",
      kicker:"4 · MEDIDAS DE LOCALIZAÇÃO",
      title:"Média, mediana, moda e percentis descrevem posições diferentes da distribuição",
      paragraphs:[
        "A média é o quociente entre a soma dos valores e o número de observações. A mediana separa os dados ordenados em duas metades e é menos sensível a valores extremos. A moda identifica o valor ou categoria mais frequente e pode não existir de forma única.",
        "Os percentis localizam uma observação relativamente à distribuição; os quartis são percentis particulares. O primeiro quartil, a mediana e o terceiro quartil ajudam a descrever a posição dos 25%, 50% e 75% dos dados segundo a convenção de cálculo usada pela ferramenta ou procedimento definido no curso.",
        "A média é pouco resistente a outliers. Por isso, quando uma distribuição é muito assimétrica ou contém valores extremos, a mediana pode representar melhor o centro. A escolha da medida deve ser justificada pelo contexto e pela forma dos dados, não por hábito."
      ],
      formulas:[
        "média x̄=(x₁+x₂+…+x_n)/n",
        "mediana = valor central dos dados ordenados, ou média dos dois centrais quando n é par",
        "Q₁≈percentil 25; Me≈percentil 50; Q₃≈percentil 75",
        "Σ(x_i−x̄)=0"
      ],
      example:{
        title:"Exemplo resolvido · efeito de um outlier na média e na mediana",
        steps:[
          "Conjunto A: 10,11,11,12,12. Média=11,2 e mediana=11.",
          "Substitui o último valor 12 por 60: conjunto B=10,11,11,12,60.",
          "A nova média é 104/5=20,8, enquanto a mediana continua 11.",
          "O valor extremo deslocou fortemente a média, mas não a mediana."
        ],
        result:"A mediana mostra maior resistência ao outlier neste exemplo.",
        note:"Resistência não significa que a mediana seja sempre ‘melhor’; depende do que se pretende descrever."
      },
      remember:"Escolhe a medida de centro depois de olhar para a distribuição e para possíveis valores extremos.",
      pitfalls:[
        "Usar sempre a média como resumo do centro mesmo quando poucos outliers dominam o resultado.",
        "Tratar moda, média e mediana como se fossem obrigatoriamente iguais ou únicas."
      ]
    },
    {
      id:"10-est-dispersao",
      kicker:"5 · MEDIDAS DE DISPERSÃO",
      title:"Duas distribuições com o mesmo centro podem ter espalhamentos muito diferentes",
      paragraphs:[
        "A amplitude mede a distância entre máximo e mínimo e, por depender apenas de dois valores, é muito sensível a extremos. A amplitude interquartil Q₃−Q₁ descreve o espalhamento dos 50% centrais e é mais resistente a outliers.",
        "O desvio padrão mede o afastamento típico dos valores relativamente à média. É zero se e só se todos os dados forem iguais. Tal como a média, é pouco resistente a outliers porque valores muito afastados têm forte influência no cálculo.",
        "Medidas de centro e dispersão devem ser lidas em conjunto e ligadas aos gráficos. Quando os dados têm outliers, pode ser preferível combinar mediana com amplitude interquartil; para distribuições mais regulares, média e desvio padrão podem ser informativos. Amplitude interquartil igual a zero não implica necessariamente ausência total de variabilidade fora dos 50% centrais."
      ],
      formulas:[
        "amplitude=máximo−mínimo",
        "AIQ=Q₃−Q₁",
        "desvio padrão s≥0; s=0 ⇔ todos os dados são iguais",
        "outliers podem alterar fortemente média, amplitude e desvio padrão"
      ],
      example:{
        title:"Exemplo resolvido · mesmo centro, dispersões diferentes",
        steps:[
          "A={8,9,10,11,12} e B={0,5,10,15,20}; ambos têm média 10 e mediana 10.",
          "Amplitude de A=12−8=4; amplitude de B=20−0=20.",
          "Apesar do mesmo centro, B apresenta valores muito mais espalhados.",
          "Uma medida de localização isolada não distingue estas duas distribuições; é necessário acrescentar uma medida de dispersão e observar o gráfico."
        ],
        result:"Os centros coincidem, mas B tem dispersão claramente superior.",
        note:"Comparar distribuições exige mais do que comparar médias."
      },
      remember:"Centro responde ‘onde estão os dados?’; dispersão responde ‘quão espalhados estão?’. Usa ambos.",
      pitfalls:[
        "Concluir que duas amostras são semelhantes só porque têm a mesma média.",
        "Afirmar que AIQ=0 significa que todos os valores da amostra são iguais."
      ]
    },
    {
      id:"10-est-bivariados-regressao",
      kicker:"6 · DADOS BIVARIADOS, CORRELAÇÃO E REGRESSÃO",
      title:"Associação linear não é causalidade — e um número nunca substitui o diagrama",
      paragraphs:[
        "Para estudar a associação entre duas variáveis quantitativas observadas nas mesmas unidades, representa-se cada par (x,y) num diagrama de dispersão. Antes de calcular qualquer coeficiente, observa a forma da nuvem: direção, intensidade aparente, linearidade e presença de outliers.",
        "O coeficiente de correlação linear r pertence a [−1,1] e descreve direção e força da associação linear. Valores próximos de 1 ou −1 indicam forte alinhamento linear; r próximo de zero indica fraca associação linear, mas pode coexistir com uma relação não linear forte. Por isso, visualizar os dados vem antes de resumir a associação num único número.",
        "Quando o diagrama mostra associação aproximadamente linear suficientemente forte, uma reta de regressão pode modelar a variável resposta em função da variável explanatória. A escolha de qual variável é explanatória importa. As previsões devem ser feitas dentro do domínio observado sempre que possível; extrapolar para muito fora dos dados pode ser enganador.",
        "Correlação não prova causa-efeito. Uma terceira variável perturbadora pode influenciar ambas as variáveis e criar uma associação aparente. Outliers também podem alterar fortemente r e a reta de regressão; devem ser investigados, não apagados automaticamente só porque incomodam o modelo."
      ],
      formulas:[
        "−1≤r≤1",
        "r>0 ⇒ associação linear positiva; r<0 ⇒ associação linear negativa",
        "|r| próximo de 1 ⇒ forte associação linear; r≈0 não exclui associação não linear",
        "reta de regressão: ŷ=a+bx, com x explanatória e y resposta"
      ],
      example:{
        title:"Exemplo resolvido · interpretar uma regressão de altura em função da idade",
        steps:[
          "Um estudo de crianças observa idade x e altura y e obtém uma nuvem aproximadamente linear crescente, com r=0,88.",
          "O sinal positivo e |r| elevado sugerem forte associação linear positiva na amostra.",
          "Uma reta ajustada ŷ=80+5x permite estimar y para idades dentro do intervalo estudado; para x=10, ŷ=130 cm.",
          "O resultado não prova que aumentar artificialmente a idade ‘cause’ 5 cm por ano em qualquer pessoa, nem justifica extrapolar a reta para idades muito fora da amostra."
        ],
        result:"O modelo descreve uma associação e permite previsão contextual dentro do domínio observado; não estabelece causalidade universal.",
        note:"Um r elevado justifica investigar uma relação linear, não uma afirmação automática de causa-efeito."
      },
      remember:"Primeiro olha para o diagrama; depois interpreta r e a regressão. E nunca troques associação por causalidade.",
      pitfalls:[
        "Concluir que r≈0 significa que não existe qualquer relação entre as variáveis, mesmo quando a associação pode ser não linear.",
        "Usar uma reta de regressão para extrapolar muito além dos dados ou afirmar causalidade apenas porque a correlação é forte."
      ]
    }
  ]
};

export function mathStatistics10ReviewContentFor(themeId){
  return themeId==="10-est"?STATISTICS_10_REVIEW:null;
}
