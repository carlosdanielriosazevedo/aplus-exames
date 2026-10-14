export const MATH_SYNTHETIC_GEOMETRY_10_REVIEW_VERSION="2026.10-wave16";

export const SYNTHETIC_GEOMETRY_10_REVIEW={
  id:"10-gs",
  title:"Geometria sintética no plano",
  lead:"Neste tema, construir e demonstrar são tão importantes como calcular. Vais organizar as retas notáveis de um triângulo, perceber de onde surgem incentro, circuncentro, baricentro e ortocentro, estudar como a posição desses pontos muda com o tipo de triângulo e fechar o capítulo com a reta de Euler e a circunferência dos nove pontos. O objetivo é justificar propriedades geométricas, não decorar desenhos.",
  goals:[
    "Construir e distinguir mediatrizes, bissetrizes, medianas e alturas e relacioná-las com os pontos notáveis do triângulo.",
    "Caracterizar incentro e circuncentro, incluindo as circunferências inscrita e circunscrita e as propriedades de equidistância que as justificam.",
    "Compreender as propriedades das medianas e do baricentro, incluindo a razão 2:1 e a divisão do triângulo em seis triângulos equivalentes.",
    "Caracterizar o ortocentro e localizar os quatro pontos notáveis em diferentes tipos de triângulo.",
    "Verificar e interpretar a reta de Euler e a circunferência dos nove pontos e as suas relações métricas fundamentais."
  ],
  sourceBasis:[
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 10.º ano · março de 2026 · Geometria sintética no plano",
    "DGE · Coletânea de tarefas das turmas piloto · Geometria sintética · Matemática A 10.º ano · 2023/2024"
  ],
  sections:[
    {
      id:"10-gs-propriedades-construcoes",
      kicker:"1 · RETAS NOTÁVEIS E CONSTRUÇÕES",
      title:"Cada construção responde a uma propriedade geométrica diferente",
      paragraphs:[
        "Num triângulo, uma mediana liga um vértice ao ponto médio do lado oposto; uma altura passa por um vértice e é perpendicular à reta que contém o lado oposto; uma bissetriz interna divide um ângulo em dois ângulos iguais; uma mediatriz é perpendicular a um segmento no seu ponto médio. Estas quatro construções não são intercambiáveis.",
        "As propriedades de equidistância dão sentido às construções. Um ponto da mediatriz de um segmento está à mesma distância dos extremos; um ponto da bissetriz de um ângulo está à mesma distância das duas retas que formam o ângulo. São estas propriedades que permitem demonstrar por que certos pontos de concorrência são centros de circunferências.",
        "Régua, compasso e geometria dinâmica podem ajudar a construir, explorar e formular conjeturas, mas uma figura muito convincente não substitui uma demonstração. A construção mostra onde procurar a propriedade; o argumento explica por que ela é verdadeira para qualquer triângulo nas condições dadas."
      ],
      formulas:[
        "P na mediatriz de AB ⇔ PA=PB",
        "P na bissetriz de ∠ABC ⇔ dist(P,BA)=dist(P,BC), para P no interior do ângulo",
        "mediana: vértice → ponto médio do lado oposto",
        "altura: vértice → reta perpendicular ao lado oposto"
      ],
      example:{
        title:"Exemplo resolvido · identificar a construção certa",
        steps:[
          "Pretende-se encontrar um ponto P equidistante dos três vértices A, B e C de um triângulo.",
          "PA=PB implica que P pertence à mediatriz de AB.",
          "PB=PC implica que P pertence à mediatriz de BC.",
          "A interseção dessas duas mediatrizes é também equidistante de A, B e C e determina o circuncentro."
        ],
        result:"Para procurar um ponto equidistante dos vértices, usam-se mediatrizes, não medianas nem bissetrizes.",
        note:"A escolha da construção vem da propriedade pedida: equidistância de pontos → mediatriz; equidistância de lados de um ângulo → bissetriz."
      },
      remember:"Antes de traçar uma reta notável, identifica a propriedade que precisas: ponto médio, perpendicularidade ou equidistância.",
      pitfalls:[
        "Confundir mediana com mediatriz só porque ambas envolvem um ponto médio.",
        "Aceitar como prova uma propriedade que apenas parece verdadeira numa construção dinâmica particular."
      ]
    },
    {
      id:"10-gs-circuncentro-incentro",
      kicker:"2 · CIRCUNCENTRO E INCENTRO",
      title:"Equidistância dos vértices e equidistância dos lados geram dois centros diferentes",
      paragraphs:[
        "O circuncentro O é o ponto de interseção das mediatrizes dos lados. Como O está na mediatriz de cada lado, OA=OB=OC; por isso existe uma circunferência de centro O que passa pelos três vértices — a circunferência circunscrita.",
        "O incentro I é o ponto de interseção das bissetrizes internas. Como I está à mesma distância dos três lados, uma circunferência com centro I e raio igual a essa distância é tangente aos três lados — a circunferência inscrita.",
        "A posição do circuncentro depende do tipo de triângulo: num acutângulo fica no interior; num retângulo coincide com o ponto médio da hipotenusa; num obtusângulo fica no exterior. O incentro, por resultar das bissetrizes internas, fica sempre no interior de um triângulo não degenerado."
      ],
      formulas:[
        "O=circuncentro ⇒ OA=OB=OC=R",
        "I=incentro ⇒ dist(I,AB)=dist(I,BC)=dist(I,CA)=r",
        "triângulo retângulo ⇒ circuncentro=ponto médio da hipotenusa",
        "incentro ∈ interior do triângulo"
      ],
      example:{
        title:"Exemplo resolvido · circunferência circunscrita num triângulo retângulo",
        steps:[
          "Num triângulo retângulo ABC com hipotenusa AB=10, o circuncentro é o ponto médio O de AB.",
          "Como O é ponto médio, OA=OB=5.",
          "Pelo resultado geométrico do triângulo retângulo, OC tem o mesmo valor e a circunferência de centro O passa pelos três vértices.",
          "Logo o raio da circunferência circunscrita é 5."
        ],
        result:"R=5, metade da hipotenusa.",
        note:"Esta propriedade é específica da localização do circuncentro num triângulo retângulo; não significa que o raio circunscrito seja sempre metade de qualquer lado."
      },
      remember:"Circuncentro: mediatrizes e vértices. Incentro: bissetrizes e lados.",
      pitfalls:[
        "Trocar incentro e circuncentro por ambos serem centros de circunferências associadas ao triângulo.",
        "Afirmar que o circuncentro está sempre dentro do triângulo."
      ]
    },
    {
      id:"10-gs-baricentro-medianas",
      kicker:"3 · BARICENTRO E MEDIANAS",
      title:"As três medianas encontram-se no centro de massa do triângulo",
      paragraphs:[
        "As três medianas de um triângulo são concorrentes num ponto G chamado baricentro. Cada mediana divide o triângulo em dois triângulos de igual área, porque esses triângulos têm bases iguais e a mesma altura relativa à reta do lado dividido.",
        "Em conjunto, as três medianas dividem o triângulo em seis triângulos equivalentes, isto é, com a mesma área. Esta propriedade é mais forte do que simplesmente dizer que cada mediana corta a área a meio.",
        "O baricentro divide cada mediana na razão 2:1: a distância do vértice até G é dois terços do comprimento da mediana e a distância de G ao ponto médio do lado é um terço. Esta relação ajuda também a interpretar G como centro de massa de uma lâmina triangular homogénea."
      ],
      formulas:[
        "AG=(2/3)AM, se M é o ponto médio de BC",
        "GM=(1/3)AM",
        "AG:GM=2:1",
        "três medianas ⇒ 6 triângulos de igual área"
      ],
      example:{
        title:"Exemplo resolvido · usar a razão do baricentro",
        steps:[
          "Numa mediana AM de comprimento 15 cm, G é o baricentro.",
          "A distância do vértice A ao baricentro é AG=(2/3)·15=10 cm.",
          "A parte restante é GM=15−10=5 cm.",
          "Confirma-se AG:GM=10:5=2:1."
        ],
        result:"AG=10 cm e GM=5 cm.",
        note:"A razão 2:1 mede-se a partir do vértice: o segmento maior é sempre vértice–baricentro."
      },
      remember:"O baricentro fica a dois terços da mediana contados a partir do vértice.",
      pitfalls:[
        "Trocar a razão e colocar o baricentro a um terço da mediana contado a partir do vértice.",
        "Concluir que qualquer três segmentos que dividam a área a meio têm necessariamente o mesmo papel geométrico das medianas."
      ]
    },
    {
      id:"10-gs-ortocentro",
      kicker:"4 · ORTOCENTRO E LOCALIZAÇÃO DOS PONTOS NOTÁVEIS",
      title:"As alturas podem encontrar-se dentro, num vértice ou fora do triângulo",
      paragraphs:[
        "O ortocentro H é o ponto comum às três alturas. Como uma altura é perpendicular à reta que contém o lado oposto, em triângulos obtusângulos pode ser necessário prolongar lados para visualizar a interseção das alturas.",
        "Num triângulo acutângulo, H fica no interior. Num triângulo retângulo, duas alturas coincidem com os catetos e o ortocentro é o vértice do ângulo reto. Num triângulo obtusângulo, H fica no exterior.",
        "Comparar a localização de H com O, I e G ajuda a consolidar os quatro centros: incentro e baricentro mantêm-se no interior; circuncentro e ortocentro podem deslocar-se para o bordo ou exterior conforme a forma do triângulo. Num triângulo equilátero, os quatro pontos coincidem."
      ],
      formulas:[
        "H=interseção das três alturas",
        "triângulo retângulo ⇒ H=vértice do ângulo reto",
        "triângulo obtusângulo ⇒ H exterior",
        "triângulo equilátero ⇒ O=I=G=H"
      ],
      example:{
        title:"Exemplo resolvido · localizar H sem coordenadas",
        steps:[
          "Considera um triângulo ABC retângulo em C.",
          "AC é perpendicular a BC; logo AC já funciona como altura relativa ao lado BC.",
          "Pelo mesmo motivo, BC funciona como altura relativa a AC.",
          "As duas alturas intersectam-se em C, portanto a terceira passa também por C e H=C."
        ],
        result:"Num triângulo retângulo, o ortocentro é o vértice do ângulo reto.",
        note:"Não é necessário construir três alturas depois de duas alturas não paralelas determinarem o ponto de concorrência."
      },
      remember:"A localização do ortocentro acompanha os ângulos: agudos → dentro; reto → vértice; obtuso → fora.",
      pitfalls:[
        "Obrigar o pé de uma altura a ficar sempre no segmento do lado oposto; num obtusângulo pode cair no prolongamento.",
        "Afirmar que todos os quatro pontos notáveis estão sempre no interior do triângulo."
      ]
    },
    {
      id:"10-gs-euler-nove-pontos",
      kicker:"5 · RETA DE EULER E CIRCUNFERÊNCIA DOS NOVE PONTOS",
      title:"Circuncentro, baricentro e ortocentro revelam uma estrutura comum",
      paragraphs:[
        "Num triângulo não equilátero, o circuncentro O, o baricentro G e o ortocentro H são colineares: pertencem à reta de Euler. O baricentro fica entre O e H e satisfaz HG=2·GO. Num triângulo equilátero, O=G=H, pelo que a configuração colapsa num único ponto e não determina uma reta de Euler única.",
        "A circunferência dos nove pontos passa pelos pontos médios dos três lados, pelos pés das três alturas e pelos pontos médios dos segmentos que ligam o ortocentro aos três vértices. Estes nove pontos, aparentemente construídos de formas diferentes, pertencem à mesma circunferência.",
        "O centro N da circunferência dos nove pontos é o ponto médio de OH e o seu raio é R/2, onde R é o raio da circunferência circunscrita. Estas relações métricas ligam diretamente a nova circunferência ao circuncentro e ao ortocentro já estudados.",
        "A geometria dinâmica é especialmente útil para deslocar vértices e observar como a reta e a circunferência se mantêm, incluindo casos limite como triângulos retângulos ou quase equiláteros. A exploração sugere a propriedade; a justificação matemática continua a ser necessária."
      ],
      formulas:[
        "O,G,H colineares e HG=2·GO, no caso não equilátero",
        "N=ponto médio de OH",
        "R_9=R/2",
        "9 pontos: 3 pontos médios dos lados + 3 pés das alturas + 3 pontos médios de AH, BH e CH"
      ],
      example:{
        title:"Exemplo resolvido · relações métricas na reta de Euler",
        steps:[
          "Num triângulo não equilátero, sabe-se que GO=4 cm.",
          "Pela relação da reta de Euler, HG=2·GO=8 cm.",
          "Como G fica entre O e H, OH=OG+GH=4+8=12 cm.",
          "O centro N da circunferência dos nove pontos é o ponto médio de OH, logo ON=NH=6 cm."
        ],
        result:"HG=8 cm, OH=12 cm e ON=NH=6 cm.",
        note:"A relação HG=2·GO fixa também a ordem dos três pontos: O—G—H na reta de Euler, exceto no caso equilátero degenerado."
      },
      remember:"Reta de Euler: O, G, H e razão 1:2. Nove pontos: centro no meio de OH e raio igual a metade de R.",
      pitfalls:[
        "Incluir o incentro na reta de Euler como se os quatro centros fossem sempre colineares.",
        "Dizer que num triângulo equilátero existe uma reta de Euler única, apesar de O, G e H coincidirem num único ponto."
      ]
    }
  ]
};

export function mathSyntheticGeometry10ReviewContentFor(themeId){
  return themeId==="10-gs"?SYNTHETIC_GEOMETRY_10_REVIEW:null;
}
