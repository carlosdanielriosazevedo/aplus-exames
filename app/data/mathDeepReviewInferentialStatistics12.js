export const MATH_INFERENTIAL_STATISTICS_12_REVIEW_VERSION="2026.10-wave19";

export const INFERENTIAL_STATISTICS_12_REVIEW={
  id:"12-ie",
  title:"Introdução à inferência estatística",
  lead:"A inferência estatística usa informação de amostras para aprender sobre uma população sem observar todos os seus elementos. Nesta revisão vais distinguir parâmetro de estatística, perceber a variabilidade amostral, interpretar distribuições de amostragem e o Teorema Limite Central e terminar com estimativas pontuais, intervalos de confiança e margem de erro.",
  goals:[
    "Distinguir população, amostra, parâmetro, estatística e estimador em problemas de inferência.",
    "Perceber por que motivo amostras diferentes produzem estimativas diferentes e como a dimensão da amostra afeta essa variabilidade.",
    "Interpretar distribuições de amostragem e o papel do Teorema Limite Central na aproximação Normal da média amostral.",
    "Construir e interpretar estimativas pontuais e intervalares para uma média ou proporção, incluindo confiança e margem de erro."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Matemática A · 12.º ano · março de 2026 · Introdução à inferência estatística",
    "DGE/AEM · Recursos do Ensino Secundário · brochura e tarefas de Introdução à Inferência Estatística"
  ],
  sections:[
    {
      id:"12-ie-inferencia-amostragem",
      kicker:"1 · RACIOCÍNIO INFERENCIAL E AMOSTRAGEM",
      title:"Da amostra para a população, com incerteza explícita",
      paragraphs:[
        "Numa inferência estatística pretende-se tirar conclusões sobre uma população usando dados recolhidos numa amostra. Uma característica numérica da população, como a média μ ou a proporção p, chama-se parâmetro; uma quantidade calculada a partir da amostra, como x̄ ou p̂, é uma estatística e pode ser usada como estimador do parâmetro.",
        "O modo como a amostra é selecionada é decisivo. Uma amostra aleatória pretende reduzir enviesamentos sistemáticos e permitir que a probabilidade seja usada para quantificar a incerteza associada à passagem da amostra para a população. Amostra grande não corrige automaticamente um processo de seleção enviesado.",
        "A variabilidade amostral é inevitável: duas amostras aleatórias da mesma população podem produzir médias ou proporções diferentes. Essa variabilidade não é um erro de cálculo; é parte do próprio processo inferencial e deve ser quantificada e interpretada."
      ],
      formulas:[
        "parâmetro: característica numérica da população, por exemplo μ ou p",
        "estatística amostral: quantidade calculada na amostra, por exemplo x̄ ou p̂",
        "inferência = informação amostral + modelo de variabilidade → conclusão sobre a população"
      ],
      example:{
        title:"Exemplo resolvido · o que é parâmetro e o que é estimativa?",
        steps:[
          "Pretende-se estimar o tempo médio diário de estudo de todos os alunos de uma escola.",
          "Seleciona-se aleatoriamente uma amostra de 80 alunos e obtém-se x̄=74 minutos.",
          "A média populacional μ é o parâmetro desconhecido; 74 minutos é o valor observado da estatística x̄.",
          "Se fosse recolhida outra amostra de 80 alunos, seria natural obter uma média ligeiramente diferente."
        ],
        result:"x̄=74 min é uma estimativa de μ, não uma prova de que μ seja exatamente 74 min.",
        note:"Inferir significa aceitar e medir a incerteza criada por observar apenas uma parte da população."
      },
      remember:"Uma boa inferência começa antes das contas: começa num processo de amostragem adequado.",
      pitfalls:[
        "Chamar parâmetro a um valor calculado apenas com a amostra.",
        "Assumir que uma amostra muito grande é representativa mesmo quando foi recolhida de forma enviesada."
      ]
    },
    {
      id:"12-ie-distribuicoes-amostragem",
      kicker:"2 · DISTRIBUIÇÕES DE AMOSTRAGEM",
      title:"Um estimador também varia de amostra para amostra",
      paragraphs:[
        "A distribuição de amostragem de uma estatística é a distribuição dos valores que essa estatística produziria ao considerar todas as amostras possíveis de uma dada dimensão segundo o mesmo esquema de amostragem. Ela descreve o comportamento do estimador, não a distribuição dos dados individuais da população.",
        "Para a média amostral x̄, o centro da distribuição de amostragem coincide com μ sob as condições usuais e a sua dispersão diminui quando n aumenta. O desvio-padrão da distribuição de x̄ é frequentemente chamado erro-padrão da média.",
        "A ideia central é comparar estimadores pelo seu comportamento repetido. Um estimador útil deve estar centrado no parâmetro que pretende estimar e apresentar uma variabilidade suficientemente pequena para o objetivo do problema."
      ],
      formulas:[
        "E(x̄)=μ",
        "DP(x̄)=σ/√n",
        "se n aumenta, σ/√n diminui"
      ],
      example:{
        title:"Exemplo resolvido · efeito de aumentar a dimensão da amostra",
        steps:[
          "Suponha uma população com σ=12.",
          "Para amostras de dimensão n=36, o erro-padrão é 12/√36=2.",
          "Para amostras de dimensão n=144, o erro-padrão é 12/√144=1.",
          "Quadruplicar n reduziu o erro-padrão para metade."
        ],
        result:"A média de uma amostra maior tende a variar menos de amostra para amostra.",
        note:"Duplicar n não reduz o erro-padrão para metade; para isso é necessário quadruplicar n."
      },
      remember:"A distribuição da população e a distribuição de amostragem de um estimador são objetos diferentes.",
      pitfalls:[
        "Confundir o desvio-padrão dos dados σ com o erro-padrão σ/√n da média amostral.",
        "Afirmar que aumentar n elimina toda a variabilidade amostral."
      ]
    },
    {
      id:"12-ie-tlc",
      kicker:"3 · TEOREMA LIMITE CENTRAL",
      title:"A média amostral aproxima-se de um comportamento Normal",
      paragraphs:[
        "O Teorema Limite Central explica por que razão o modelo Normal aparece tantas vezes na inferência sobre médias. Para amostras aleatórias de dimensão suficientemente grande, a distribuição de amostragem de x̄ pode ser aproximada por uma distribuição Normal, mesmo quando a população de origem não é Normal.",
        "O TLC não afirma que os dados individuais passam a ter distribuição Normal. O que tende para um comportamento aproximadamente Normal é a distribuição das médias obtidas em muitas amostras da mesma dimensão.",
        "À medida que n cresce, a distribuição de x̄ mantém centro μ e fica mais concentrada porque o seu erro-padrão σ/√n diminui. É esta combinação de forma aproximadamente Normal e variabilidade quantificada que sustenta muitos intervalos de confiança."
      ],
      formulas:[
        "para n suficientemente grande: x̄ ≈ Normal(μ, σ/√n)",
        "centro da distribuição de x̄: μ",
        "erro-padrão de x̄: σ/√n"
      ],
      example:{
        title:"Exemplo resolvido · interpretar uma distribuição de médias",
        steps:[
          "Uma população tem média μ=50 e desvio-padrão σ=10.",
          "Consideram-se amostras aleatórias de dimensão n=100.",
          "O erro-padrão da média é 10/√100=1.",
          "Pelo TLC, a distribuição de x̄ é aproximadamente Normal com centro 50 e desvio-padrão 1, sob as condições adequadas."
        ],
        result:"As médias amostrais concentram-se muito mais perto de 50 do que os valores individuais da população.",
        note:"O TLC justifica uma aproximação; não transforma a população original numa população Normal."
      },
      remember:"No TLC, a Normal descreve o comportamento do estimador média em amostras repetidas.",
      pitfalls:[
        "Dizer que o TLC torna os dados da população Normais.",
        "Ignorar que a aproximação depende das condições do processo de amostragem e de uma dimensão adequada."
      ]
    },
    {
      id:"12-ie-estimacao",
      kicker:"4 · ESTIMAÇÃO DE PARÂMETROS",
      title:"Uma estimativa pontual é útil, mas não mostra sozinha a incerteza",
      paragraphs:[
        "Uma estimativa pontual usa um único valor amostral para estimar um parâmetro. A média amostral x̄ estima μ e a proporção amostral p̂ estima p. O valor obtido muda se a amostra mudar, por isso deve ser interpretado como uma aproximação.",
        "Uma estimativa intervalar acrescenta à estimativa pontual uma margem que representa a incerteza amostral. Em vez de apresentar apenas um valor, constrói-se um intervalo por um procedimento cuja fiabilidade pode ser quantificada.",
        "A escolha do estimador, o erro-padrão e o nível de confiança estão ligados. Maior precisão exige normalmente mais informação amostral; não existe um intervalo estreito e altamente confiável sem custo em dimensão amostral ou sem condições fortes sobre o modelo."
      ],
      formulas:[
        "estimativa pontual de μ: x̄",
        "estimativa pontual de p: p̂=x/n",
        "estimativa intervalar = estimativa pontual ± margem de erro"
      ],
      example:{
        title:"Exemplo resolvido · estimar uma proporção",
        steps:[
          "Numa amostra aleatória de 400 pessoas, 236 preferem a opção A.",
          "A proporção amostral é p̂=236/400=0,59.",
          "Assim, 0,59 é a estimativa pontual da proporção populacional p.",
          "Uma conclusão responsável acrescentará uma medida de incerteza, em vez de apresentar 59% como valor exato da população."
        ],
        result:"A estimativa pontual é p̂=0,59, mas p permanece desconhecido.",
        note:"O objetivo da inferência não é fingir que a amostra é a população; é usar a amostra para aprender sobre a população."
      },
      remember:"Uma estimativa pontual diz onde está o melhor palpite; uma estimativa intervalar mostra também quanta incerteza o acompanha.",
      pitfalls:[
        "Escrever que p=0,59 só porque a amostra deu p̂=0,59.",
        "Comparar duas estimativas pontuais sem considerar que podem ter erros-padrão muito diferentes."
      ]
    },
    {
      id:"12-ie-intervalos-confianca",
      kicker:"5 · INTERVALOS DE CONFIANÇA E MARGEM DE ERRO",
      title:"Confiança descreve o procedimento, não uma probabilidade posterior do parâmetro",
      paragraphs:[
        "Para estimar μ, o modelo Normal permite construir intervalos do tipo x̄±z·σ/√n. Para 95% de confiança usa-se z≈1,96; quando σ é desconhecido, as AE admitem a substituição pelo desvio-padrão amostral no contexto estudado.",
        "A leitura correta de 95% de confiança refere-se ao procedimento repetido: se recolhêssemos muitas amostras pelo mesmo método e construíssemos um intervalo para cada uma, aproximadamente 95% desses intervalos conteriam o verdadeiro parâmetro. Depois de calculado um intervalo concreto, μ é fixo; o intervalo é que resultou da amostra aleatória.",
        "A margem de erro é metade da amplitude do intervalo. Mantendo o resto, aumentar n reduz a margem de erro; exigir maior confiança tende a aumentá-la. Para proporções, p̂ funciona como estimador de p e a sua variabilidade pode ser tratada através da aproximação Normal nas condições adequadas."
      ],
      formulas:[
        "IC para μ: x̄ ± z_(1−α/2)·σ/√n",
        "95%: z_(0,975)≈1,96",
        "margem de erro E = metade da amplitude do intervalo",
        "erro-padrão aproximado de p̂: √(p̂(1−p̂)/n)"
      ],
      example:{
        title:"Exemplo resolvido · intervalo de 95% para uma média",
        steps:[
          "Uma amostra de n=100 tem x̄=72 e usa-se σ=10.",
          "O erro-padrão é 10/√100=1.",
          "Para 95%, a margem é E=1,96×1=1,96.",
          "O intervalo é [72−1,96;72+1,96]=[70,04;73,96]."
        ],
        result:"O procedimento produz o intervalo de 95% [70,04;73,96] para μ.",
        note:"Não se deve dizer «há 95% de probabilidade de μ estar neste intervalo»; a confiança caracteriza o método de construção de intervalos."
      },
      remember:"Mais confiança ou menos erro exigem compromisso: a margem depende do nível de confiança, da variabilidade e da dimensão da amostra.",
      pitfalls:[
        "Interpretar 95% de confiança como probabilidade de 95% de um parâmetro fixo pertencer ao intervalo já observado.",
        "Esquecer a raiz de n no erro-padrão ou assumir que duplicar n reduz a margem de erro para metade."
      ]
    }
  ]
};

export function mathInferentialStatistics12ReviewContentFor(themeId){
  return themeId==="12-ie"?INFERENTIAL_STATISTICS_12_REVIEW:null;
}
