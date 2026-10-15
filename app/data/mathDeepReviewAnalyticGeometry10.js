export const MATH_ANALYTIC_GEOMETRY_10_REVIEW_VERSION="2026.10-wave18";

export const ANALYTIC_GEOMETRY_10_REVIEW={
  id:"10-ga",
  title:"Geometria analítica no plano e no espaço",
  lead:"A geometria analítica traduz posições, distâncias, conjuntos de pontos, vetores e retas para coordenadas. Neste capítulo vais ligar figuras, condições e equações sem perder o significado geométrico: primeiro no plano, depois no espaço. O objetivo não é decorar fórmulas isoladas, mas perceber o que cada coordenada, vetor, igualdade ou desigualdade está a descrever.",
  goals:[
    "Usar coordenadas e transformações simples para localizar e relacionar pontos no plano.",
    "Calcular distâncias e pontos médios e interpretar esses resultados geometricamente.",
    "Descrever conjuntos de pontos por condições, incluindo semiplanos, mediatrizes, circunferências, círculos, planos mediadores, superfícies esféricas e esferas.",
    "Trabalhar com vetores por coordenadas, norma, soma, diferença e multiplicação por escalar.",
    "Caracterizar colinearidade e escrever equações de retas no plano e no espaço, distinguindo a forma reduzida das retas verticais.",
    "Reconhecer no espaço planos coordenados, planos paralelos a estes, retas paralelas aos eixos e planos mediadores, sem antecipar produto escalar e ângulos do 11.º ano."
  ],
  sourceBasis:[
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 10.º ano · março de 2026 · Geometria analítica no plano e no espaço",
    "DGE · Coletânea de tarefas das turmas piloto · Geometria Analítica · Matemática A 10.º ano"
  ],
  sections:[
    {
      id:"10-ga-coordenadas-transformacoes",
      kicker:"1 · COORDENADAS E TRANSFORMAÇÕES NO PLANO",
      title:"As coordenadas tornam posições e transformações mensuráveis",
      paragraphs:[
        "Num referencial cartesiano ortogonal e monométrico, um ponto P=(x,y) fica determinado pela abcissa x e pela ordenada y. Os sinais das coordenadas ajudam a identificar quadrantes, mas a leitura deve começar sempre pela posição relativamente aos eixos e à origem.",
        "Reflexões de eixo horizontal ou vertical e a meia-volta de centro na origem podem ser descritas diretamente nas coordenadas. Estas transformações preservam distâncias e ajudam a ligar uma construção geométrica a uma regra algébrica simples.",
        "Uma transformação em coordenadas deve ser lida geometricamente. Por exemplo, trocar (x,y) por (−x,y) não é uma mudança arbitrária de sinal: é a reflexão do ponto relativamente ao eixo Oy."
      ],
      formulas:[
        "simetria em Ox: (x,y)→(x,−y)",
        "simetria em Oy: (x,y)→(−x,y)",
        "meia-volta de centro O: (x,y)→(−x,−y)",
        "distâncias ao eixo Oy preservam-se na reflexão em Oy"
      ],
      example:{
        title:"Exemplo resolvido · duas transformações sucessivas",
        steps:[
          "Parte de A=(−2,4).",
          "Reflete A em Oy: A'=(2,4).",
          "Aplica depois uma meia-volta de centro na origem: A''=(−2,−4).",
          "Confirma no desenho que cada passo respeita a transformação indicada."
        ],
        result:"Depois das duas transformações, A''=(−2,−4).",
        note:"Em composições de transformações, a ordem dos passos pode alterar o resultado final."
      },
      remember:"Mudanças de sinal nas coordenadas correspondem a transformações geométricas concretas.",
      pitfalls:[
        "Trocar os efeitos das simetrias em Ox e Oy.",
        "Aplicar a segunda transformação ao ponto original em vez de ao ponto já transformado."
      ]
    },
    {
      id:"10-ga-distancias-ponto-medio",
      kicker:"2 · DISTÂNCIA E PONTO MÉDIO",
      title:"Pitágoras liga coordenadas a comprimento",
      paragraphs:[
        "A distância entre dois pontos no plano resulta do teorema de Pitágoras aplicado às diferenças das coordenadas. A ordem de A e B não altera a distância porque as diferenças ficam elevadas ao quadrado.",
        "O ponto médio de um segmento obtém-se fazendo a média das abcissas e a média das ordenadas. Esta regra exprime exatamente a ideia de ficar a meio do caminho em cada direção coordenada.",
        "Distância e ponto médio aparecem em problemas de localização, mediatrizes, circunferências e vetores. Antes de substituir números, identifica a grandeza geométrica pedida e o referencial em que estás a trabalhar."
      ],
      formulas:[
        "d(A,B)=√((x_B−x_A)²+(y_B−y_A)²)",
        "M_AB=((x_A+x_B)/2,(y_A+y_B)/2)",
        "d(A,B)=d(B,A)",
        "AM=MB quando M é o ponto médio de AB"
      ],
      example:{
        title:"Exemplo resolvido · distância e ponto médio",
        steps:[
          "Considera A=(−1,2) e B=(5,−2).",
          "Diferenças: x_B−x_A=6 e y_B−y_A=−4.",
          "d(A,B)=√(6²+(−4)²)=√52=2√13.",
          "M=((−1+5)/2,(2−2)/2)=(2,0)."
        ],
        result:"d(A,B)=2√13 e M=(2,0).",
        note:"O sinal da diferença vertical desaparece ao quadrado, mas não deve ser ignorado antes da fórmula."
      },
      remember:"Distância usa diferenças e quadrados; ponto médio usa médias coordenada a coordenada.",
      pitfalls:[
        "Somar coordenadas dentro da fórmula da distância em vez de calcular diferenças.",
        "Dividir apenas uma das coordenadas por 2 ao calcular o ponto médio."
      ]
    },
    {
      id:"10-ga-lugares-geometricos",
      kicker:"3 · CONJUNTOS DE PONTOS E CONDIÇÕES",
      title:"Igualdades, desigualdades e lógica descrevem regiões geométricas",
      paragraphs:[
        "Um conjunto de pontos pode ser definido por uma condição. No plano, a mediatriz de AB reúne os pontos P tais que PA=PB; uma reta separa ainda o plano em dois semiplanos, que podem ser descritos por desigualdades quando a reta fronteira é dada por uma equação.",
        "Uma circunferência é o conjunto dos pontos a distância fixa r de um centro C=(a,b), enquanto o círculo inclui também os pontos interiores. Nas Aprendizagens Essenciais deste nível usam-se equações reduzidas de circunferências.",
        "Conjunções e disjunções permitem combinar condições simples: ‘e’ corresponde à interseção de regiões; ‘ou’ corresponde à união. Esta leitura lógica ajuda a interpretar semiplanos, círculos e outros conjuntos sem tratar cada caso como uma fórmula isolada."
      ],
      formulas:[
        "mediatriz de AB: PA=PB",
        "reta ax+by=c ⇒ semiplanos ax+by≤c e ax+by≥c",
        "circunferência: (x−a)²+(y−b)²=r²",
        "círculo: (x−a)²+(y−b)²≤r²",
        "condição A e B ⇒ interseção; condição A ou B ⇒ união"
      ],
      example:{
        title:"Exemplo resolvido · círculo cortado por um semiplano",
        steps:[
          "Considera (x−2)²+y²≤9 e, simultaneamente, x≥2.",
          "A primeira condição descreve o círculo de centro (2,0) e raio 3.",
          "A segunda condição descreve o semiplano à direita da reta vertical x=2, incluindo a fronteira.",
          "Como as condições estão ligadas por ‘e’, a solução é a metade direita do círculo, incluindo o diâmetro x=2."
        ],
        result:"A região pedida é a interseção do círculo com o semiplano x≥2.",
        note:"Trocar ‘e’ por ‘ou’ mudaria completamente o conjunto representado."
      },
      remember:"Equações tendem a descrever fronteiras; desigualdades selecionam lados ou interiores; ‘e/ou’ combina regiões.",
      pitfalls:[
        "Confundir circunferência com círculo.",
        "Ler uma conjunção como união ou uma disjunção como interseção."
      ]
    },
    {
      id:"10-ga-vetores",
      kicker:"4 · VETORES",
      title:"Um vetor regista deslocamento, não uma posição absoluta",
      paragraphs:[
        "O vetor AB descreve o deslocamento de A para B. As suas coordenadas obtêm-se fazendo coordenadas do ponto final menos coordenadas do ponto inicial. Vetores com as mesmas coordenadas representam o mesmo deslocamento, mesmo que sejam desenhados em posições diferentes.",
        "Somar e subtrair vetores combina deslocamentos; multiplicar por um escalar altera o comprimento e, se o escalar for negativo, também o sentido. As propriedades algébricas destas operações permitem simplificar construções e problemas.",
        "A norma mede o comprimento do vetor e obtém-se por Pitágoras a partir das coordenadas. O produto escalar e o cálculo de ângulos entre vetores são deliberadamente deixados para o bloco próprio do 11.º ano."
      ],
      formulas:[
        "AB⃗=(x_B−x_A,y_B−y_A)",
        "u⃗+v⃗=(u₁+v₁,u₂+v₂)",
        "u⃗−v⃗=(u₁−v₁,u₂−v₂)",
        "k·u⃗=(ku₁,ku₂)",
        "||u⃗||=√(u₁²+u₂²)"
      ],
      example:{
        title:"Exemplo resolvido · vetor entre dois pontos",
        steps:[
          "Se A=(1,−2) e B=(4,3), então AB⃗=(4−1,3−(−2))=(3,5).",
          "A norma é ||AB⃗||=√(3²+5²)=√34.",
          "O vetor oposto é BA⃗=(−3,−5).",
          "Verifica que AB⃗+BA⃗=(0,0)."
        ],
        result:"AB⃗=(3,5), ||AB⃗||=√34 e BA⃗=−AB⃗.",
        note:"Trocar a ordem dos pontos troca o sentido do vetor."
      },
      remember:"Ponto final menos ponto inicial: esta ordem fixa o sentido do vetor.",
      pitfalls:[
        "Calcular AB⃗ como A−B e inverter o sentido sem perceber.",
        "Confundir as coordenadas de um ponto B com as coordenadas do vetor AB⃗ quando A não é a origem."
      ]
    },
    {
      id:"10-ga-colinearidade-retas",
      kicker:"5 · COLINEARIDADE E RETAS",
      title:"Uma reta fica determinada por um ponto e uma direção",
      paragraphs:[
        "Dois vetores não nulos são colineares quando um é múltiplo escalar do outro. Assim, em situações não degeneradas, três pontos A, B e C estão alinhados quando os vetores AB e AC são colineares.",
        "Uma reta pode ser descrita vetorialmente por X=A+t·v, onde A é um ponto da reta, v é um vetor diretor não nulo e t percorre os números reais. No plano, esta forma conduz facilmente a equações paramétricas.",
        "Quando a componente horizontal do vetor diretor é diferente de zero, o declive é m=v_y/v_x e pode escrever-se y=mx+b. Se v_x=0, a reta é vertical e tem equação x=x₀; não se força uma forma reduzida com declive infinito."
      ],
      formulas:[
        "u⃗ e v⃗ colineares ⇔ existe k com u⃗=k·v⃗, para vetores não nulos",
        "reta: X=A+t·v⃗, t∈ℝ, v⃗≠0⃗",
        "x=x_A+t v_x; y=y_A+t v_y",
        "v_x≠0 ⇒ m=v_y/v_x",
        "v_x=0 ⇒ reta vertical x=x_A"
      ],
      example:{
        title:"Exemplo resolvido · equação de uma reta a partir de ponto e direção",
        steps:[
          "A reta passa por A=(2,−1) e tem vetor diretor v=(3,6).",
          "Equação vetorial: (x,y)=(2,−1)+t(3,6).",
          "Como v_x=3≠0, m=6/3=2.",
          "Usando A: −1=2·2+b, logo b=−5 e y=2x−5."
        ],
        result:"A reta pode escrever-se (x,y)=(2,−1)+t(3,6) ou y=2x−5.",
        note:"Vetores diretores múltiplos entre si descrevem a mesma direção e podem gerar a mesma reta quando passam pelo mesmo ponto."
      },
      remember:"Ponto + direção dá uma reta; a forma y=mx+b não cobre retas verticais.",
      pitfalls:[
        "Afirmar colinearidade usando quocientes incompatíveis entre coordenadas.",
        "Tentar atribuir um declive real a uma reta vertical."
      ]
    },
    {
      id:"10-ga-espaco",
      kicker:"6 · GEOMETRIA ANALÍTICA NO ESPAÇO",
      title:"Três coordenadas descrevem pontos, planos especiais, esferas, vetores e retas",
      paragraphs:[
        "No espaço, um ponto P=(x,y,z) precisa de três coordenadas. Distância e ponto médio generalizam-se acrescentando a terceira componente. Os planos coordenados têm equações z=0, y=0 e x=0; planos paralelos a eles mantêm uma coordenada constante.",
        "Também se estudam retas paralelas a um dos eixos e planos mediadores. Um plano mediador de AB reúne os pontos P do espaço tais que PA=PB. A superfície esférica usa igualdade a r² e a esfera usa desigualdade ≤r²; nas AE consideram-se formas reduzidas.",
        "Vetores e retas passam naturalmente para três coordenadas. Uma reta no espaço é determinada por um ponto e um vetor diretor não nulo. Produto escalar, perpendicularidade por coordenadas e ângulos entre retas ou planos ficam para o 11.º ano."
      ],
      formulas:[
        "d(A,B)=√((x_B−x_A)²+(y_B−y_A)²+(z_B−z_A)²)",
        "M_AB=((x_A+x_B)/2,(y_A+y_B)/2,(z_A+z_B)/2)",
        "planos coordenados: x=0, y=0, z=0",
        "planos paralelos aos coordenados: x=k, y=k ou z=k",
        "plano mediador de AB: PA=PB",
        "superfície esférica: (x−a)²+(y−b)²+(z−c)²=r²",
        "esfera: (x−a)²+(y−b)²+(z−c)²≤r²",
        "AB⃗=(x_B−x_A,y_B−y_A,z_B−z_A)",
        "reta no espaço: (x,y,z)=(x₀,y₀,z₀)+t(a,b,c), (a,b,c)≠(0,0,0)"
      ],
      example:{
        title:"Exemplo resolvido · plano mediador no espaço",
        steps:[
          "Considera A=(0,0,0) e B=(2,0,0). Procura os pontos P=(x,y,z) equidistantes de A e B.",
          "PA²=x²+y²+z² e PB²=(x−2)²+y²+z².",
          "Iguala as distâncias ao quadrado: x²+y²+z²=(x−2)²+y²+z².",
          "Simplificando, obtém-se x=1, um plano paralelo ao plano yOz."
        ],
        result:"O plano mediador de AB é x=1.",
        note:"A condição PA=PB transforma uma propriedade geométrica numa equação de um conjunto de pontos."
      },
      remember:"No espaço, uma coordenada constante descreve planos paralelos aos planos coordenados; duas coordenadas constantes podem descrever retas paralelas a um eixo.",
      pitfalls:[
        "Esquecer a componente z ao calcular distância ou vetor no espaço.",
        "Confundir uma superfície esférica (=) com uma esfera (≤), ou antecipar produto escalar e ângulos do 11.º ano."
      ]
    }
  ]
};

export function mathAnalyticGeometry10ReviewContentFor(themeId){
  return themeId==="10-ga"?ANALYTIC_GEOMETRY_10_REVIEW:null;
}
