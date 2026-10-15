export const MATH_ANALYTIC_GEOMETRY_10_REVIEW_VERSION="2026.10-wave18";

export const ANALYTIC_GEOMETRY_10_REVIEW={
  id:"10-ga",
  title:"Geometria analítica no plano e no espaço",
  lead:"A geometria analítica traduz posições, distâncias, lugares geométricos, vetores e retas para coordenadas. Neste capítulo vais ligar figuras e equações sem perder o significado geométrico: primeiro no plano, depois no espaço. O objetivo não é decorar fórmulas isoladas, mas perceber o que cada coordenada, vetor ou equação está a descrever.",
  goals:[
    "Usar coordenadas e transformações simples para localizar e relacionar pontos no plano.",
    "Calcular distâncias e pontos médios e interpretar esses resultados geometricamente.",
    "Reconhecer e representar mediatrizes, planos mediadores, circunferências, círculos, superfícies esféricas e esferas por condições de distância.",
    "Trabalhar com vetores por coordenadas, norma, soma e multiplicação por escalar.",
    "Caracterizar colinearidade e escrever equações de retas no plano e no espaço, distinguindo a forma reduzida das retas verticais.",
    "Estender coordenadas, distâncias, vetores e retas ao espaço sem antecipar produto escalar e ângulos, que pertencem ao 11.º ano."
  ],
  sourceBasis:[
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 10.º ano · março de 2026 · Geometria analítica no plano e no espaço",
    "DGE · recursos e tarefas de Matemática A · 10.º ano · Geometria analítica"
  ],
  sections:[
    {
      id:"10-ga-coordenadas-transformacoes",
      kicker:"1 · COORDENADAS E TRANSFORMAÇÕES NO PLANO",
      title:"As coordenadas tornam posições e transformações mensuráveis",
      paragraphs:[
        "Num referencial cartesiano ortonormado, um ponto P=(x,y) fica determinado pela abcissa x e pela ordenada y. Os sinais das coordenadas ajudam a identificar quadrantes, mas a leitura deve começar sempre pela posição relativamente aos eixos e à origem.",
        "Transformações simples podem ser descritas diretamente nas coordenadas. Uma translação por um vetor (a,b) soma a a cada abcissa e b a cada ordenada. Reflexões nos eixos ou na origem mudam apenas os sinais adequados, preservando distâncias.",
        "A fórmula em coordenadas deve ser lida como uma regra geométrica. Se um ponto muda de (x,y) para (x+3,y−2), isso significa três unidades para a direita e duas para baixo; não é apenas uma manipulação algébrica."
      ],
      formulas:[
        "translação por (a,b): (x,y)→(x+a,y+b)",
        "simetria em Ox: (x,y)→(x,−y)",
        "simetria em Oy: (x,y)→(−x,y)",
        "simetria central na origem: (x,y)→(−x,−y)"
      ],
      example:{
        title:"Exemplo resolvido · translação e reflexão",
        steps:[
          "Parte de A=(−2,4).",
          "Translada A pelo vetor (3,−1): A'=(−2+3,4−1)=(1,3).",
          "Reflete A' em Oy: A''=(−1,3).",
          "Confirma no desenho: a reflexão em Oy mantém a ordenada e troca o sinal da abcissa."
        ],
        result:"Depois das duas transformações, o ponto é A''=(−1,3).",
        note:"Aplicar duas transformações sucessivas exige respeitar a ordem em que são feitas."
      },
      remember:"Uma transformação em coordenadas deve conseguir ser lida como um movimento ou uma simetria no plano.",
      pitfalls:[
        "Trocar os efeitos das simetrias em Ox e Oy.",
        "Somar uma translação ao ponto original quando já houve uma transformação intermédia."
      ]
    },
    {
      id:"10-ga-distancias-ponto-medio",
      kicker:"2 · DISTÂNCIA E PONTO MÉDIO",
      title:"Pitágoras liga coordenadas a comprimento",
      paragraphs:[
        "A distância entre dois pontos no plano resulta do teorema de Pitágoras aplicado às diferenças das coordenadas. A ordem de A e B não altera a distância porque as diferenças ficam elevadas ao quadrado.",
        "O ponto médio de um segmento obtém-se fazendo a média das abcissas e a média das ordenadas. Esta regra exprime exatamente a ideia de ficar a meio do caminho em cada direção coordenada.",
        "Distância e ponto médio aparecem juntos em problemas de localização, mediatrizes, circunferências e vetores. Antes de substituir números, identifica que grandeza geométrica está a ser pedida."
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
      kicker:"3 · LUGARES GEOMÉTRICOS",
      title:"Uma condição de distância pode descrever uma figura inteira",
      paragraphs:[
        "Um lugar geométrico é o conjunto de pontos que satisfazem uma condição. No plano, a mediatriz de AB reúne os pontos P tais que PA=PB; no espaço, o plano mediador desempenha o papel análogo para um segmento.",
        "Uma circunferência é o conjunto dos pontos a distância fixa r de um centro C=(a,b), enquanto o círculo inclui também os pontos interiores. Em coordenadas, a equação reduzida torna centro e raio imediatamente visíveis.",
        "No espaço, a superfície esférica reúne os pontos a distância exatamente r de C=(a,b,c); a esfera inclui o interior. Nesta fase usa-se a forma reduzida destas equações, sem transformar o tema numa antecipação de geometria algébrica mais avançada."
      ],
      formulas:[
        "mediatriz de AB: PA=PB",
        "circunferência: (x−a)²+(y−b)²=r²",
        "círculo: (x−a)²+(y−b)²≤r²",
        "superfície esférica: (x−a)²+(y−b)²+(z−c)²=r²",
        "esfera: (x−a)²+(y−b)²+(z−c)²≤r²"
      ],
      example:{
        title:"Exemplo resolvido · ler uma circunferência pela equação",
        steps:[
          "Considera (x−2)²+(y+1)²=25.",
          "Compara com (x−a)²+(y−b)²=r².",
          "Da primeira parcela, a=2; de y+1=y−(−1), resulta b=−1.",
          "Como r²=25 e r>0, r=5."
        ],
        result:"Centro C=(2,−1) e raio 5.",
        note:"O sinal visível dentro do parêntese é o oposto da coordenada do centro."
      },
      remember:"Igualdade descreve a fronteira; desigualdade ≤ inclui a região interior.",
      pitfalls:[
        "Confundir circunferência com círculo ou superfície esférica com esfera.",
        "Ler y+1 como centro de ordenada +1 em vez de −1."
      ]
    },
    {
      id:"10-ga-vetores",
      kicker:"4 · VETORES",
      title:"Um vetor regista deslocamento, não uma posição absoluta",
      paragraphs:[
        "O vetor AB descreve o deslocamento de A para B. As suas coordenadas obtêm-se fazendo coordenadas do ponto final menos coordenadas do ponto inicial. Vetores com as mesmas coordenadas representam o mesmo deslocamento, mesmo que sejam desenhados em posições diferentes.",
        "Somar vetores combina deslocamentos; multiplicar por um escalar altera comprimento e, se o escalar for negativo, também o sentido. A norma mede o comprimento do vetor e no plano resulta novamente de Pitágoras.",
        "Vetores permitem traduzir movimentos, paralelismo e retas para linguagem algébrica. O produto escalar e o cálculo de ângulos entre vetores são deliberadamente deixados para o bloco próprio do 11.º ano."
      ],
      formulas:[
        "AB⃗=(x_B−x_A,y_B−y_A)",
        "u⃗+v⃗=(u₁+v₁,u₂+v₂)",
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
        "Dois vetores não nulos são colineares quando um é múltiplo escalar do outro. Assim, três pontos A, B e C estão alinhados quando os vetores AB e AC têm a mesma direção, isto é, são linearmente dependentes.",
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
        "Afirmar que qualquer par de vetores é colinear escolhendo um quociente diferente para cada coordenada.",
        "Tentar atribuir um declive real a uma reta vertical."
      ]
    },
    {
      id:"10-ga-espaco",
      kicker:"6 · COORDENADAS E VETORES NO ESPAÇO",
      title:"As mesmas ideias passam de duas para três coordenadas",
      paragraphs:[
        "No espaço, um ponto P=(x,y,z) precisa de três coordenadas. Distância, ponto médio e vetores generalizam-se acrescentando a terceira componente; a lógica permanece a mesma do plano.",
        "Uma reta no espaço continua a ser determinada por um ponto e um vetor diretor não nulo: (x,y,z)=A+t·v. Aqui não existe uma única forma reduzida análoga a y=mx+b que descreva todas as retas espaciais.",
        "A geometria analítica do 10.º ano deve consolidar localização, distância, vetores, colinearidade e equações vetoriais. Produto escalar, perpendicularidade por coordenadas e ângulos entre retas/planos ficam para o 11.º ano, evitando misturar níveis curriculares."
      ],
      formulas:[
        "d(A,B)=√((x_B−x_A)²+(y_B−y_A)²+(z_B−z_A)²)",
        "M_AB=((x_A+x_B)/2,(y_A+y_B)/2,(z_A+z_B)/2)",
        "AB⃗=(x_B−x_A,y_B−y_A,z_B−z_A)",
        "reta no espaço: (x,y,z)=(x₀,y₀,z₀)+t(a,b,c), (a,b,c)≠(0,0,0)"
      ],
      example:{
        title:"Exemplo resolvido · reta no espaço",
        steps:[
          "Considera A=(1,0,−2) e B=(3,4,1).",
          "AB⃗=(2,4,3).",
          "Uma equação vetorial da reta AB é (x,y,z)=(1,0,−2)+t(2,4,3).",
          "Para t=1 obtém-se (3,4,1), confirmando que B pertence à reta."
        ],
        result:"r: (x,y,z)=(1,0,−2)+t(2,4,3), t∈ℝ.",
        note:"Qualquer múltiplo não nulo de (2,4,3) também pode servir de vetor diretor da mesma reta."
      },
      remember:"No espaço, acrescenta-se uma coordenada; o raciocínio de ponto, deslocamento e direção mantém-se.",
      pitfalls:[
        "Esquecer a componente z ao calcular distância ou vetor no espaço.",
        "Antecipar produto escalar ou ângulos entre retas/planos como se já pertencessem a este bloco do 10.º ano."
      ]
    }
  ]
};

export function mathAnalyticGeometry10ReviewContentFor(themeId){
  return themeId==="10-ga"?ANALYTIC_GEOMETRY_10_REVIEW:null;
}
