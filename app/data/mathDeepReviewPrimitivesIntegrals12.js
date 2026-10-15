export const MATH_PRIMITIVES_INTEGRALS_12_REVIEW_VERSION="2026.10-wave20";

export const PRIMITIVES_INTEGRALS_12_REVIEW={
  id:"12-int",
  title:"Primitivas imediatas e integrais definidos",
  lead:"Primitivar é inverter a derivação; integrar num intervalo liga essa ideia à acumulação e, em particular, à área. Nesta revisão vais aprender a reconhecer famílias de primitivas, usar a tabela e as propriedades elementares, interpretar o integral definido e aplicar o Teorema Fundamental do Cálculo e a fórmula de Barrow em problemas adequados ao programa.",
  goals:[
    "Reconhecer uma primitiva de uma função e compreender por que aparece uma constante arbitrária.",
    "Determinar primitivas imediatas e de combinações lineares usando uma tabela curta e propriedades elementares.",
    "Interpretar o integral definido como acumulação e, para funções contínuas não negativas, como área sob o gráfico.",
    "Usar o Teorema Fundamental do Cálculo e a fórmula de Barrow para calcular integrais definidos e resolver problemas de áreas."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Matemática A · 12.º ano · março de 2026 · Primitivas imediatas e integrais definidos",
    "DGE/AEM · Recursos do Ensino Secundário · tarefas de Primitivas e Integrais"
  ],
  sections:[
    {
      id:"12-int-primitiva",
      kicker:"1 · CONCEITO DE PRIMITIVA",
      title:"Primitivar é procurar uma função cuja derivada conhecemos",
      paragraphs:[
        "Uma função F é uma primitiva de f num intervalo quando F'(x)=f(x) em todos os pontos desse intervalo. Assim, primitivar é um processo inverso da derivação: em vez de partir de F para obter F', parte-se de f e procura-se uma função que a tenha como derivada.",
        "Se F é uma primitiva de f, então F+C também é, para qualquer constante real C, porque a derivada de uma constante é zero. Num intervalo, todas as primitivas de uma mesma função diferem por uma constante; por isso a constante de integração não é um detalhe opcional.",
        "Uma condição adicional pode determinar C. Por exemplo, se se sabe que uma primitiva F satisfaz F(0)=5, essa informação seleciona uma única função dentro da família de primitivas. Uma boa verificação consiste sempre em derivar a resposta final e confirmar que se recupera f."
      ],
      formulas:[
        "F é primitiva de f ⇔ F'(x)=f(x)",
        "se F'=f, então (F+C)'=f, C∈ℝ",
        "∫ f(x) dx = F(x)+C"
      ],
      example:{
        title:"Exemplo resolvido · encontrar a família e usar uma condição",
        steps:[
          "Pretende-se uma primitiva de f(x)=3x²+2.",
          "Como (x³)'=3x² e (2x)'=2, a família é F(x)=x³+2x+C.",
          "Se F(0)=5, então 5=C.",
          "Verificação: (x³+2x+5)'=3x²+2=f(x)."
        ],
        result:"A família é F(x)=x³+2x+C; com F(0)=5 obtém-se F(x)=x³+2x+5.",
        note:"Sem uma condição inicial, não há razão para escolher um valor particular de C."
      },
      remember:"Uma primitiva não é única: é uma família de funções que diferem por uma constante.",
      pitfalls:[
        "Esquecer a constante C ao escrever uma família de primitivas.",
        "Aceitar uma expressão como primitiva sem a verificar por derivação."
      ]
    },
    {
      id:"12-int-tabela-propriedades",
      kicker:"2 · PRIMITIVAS IMEDIATAS E PROPRIEDADES",
      title:"Uma tabela pequena resolve muitas combinações lineares",
      paragraphs:[
        "As primitivas imediatas resultam diretamente de fórmulas de derivação já conhecidas. No núcleo deste tema trabalham-se funções da tabela e combinações lineares dessas funções; a estratégia é reconhecer cada parcela, aplicar a primitiva correspondente e reunir as constantes numa única constante C.",
        "A primitivação é linear: multiplicar uma função por uma constante multiplica uma primitiva pela mesma constante, e uma primitiva de uma soma pode obter-se somando primitivas. Estas propriedades permitem desmontar expressões sem inventar técnicas de integração que não pertencem ao núcleo do programa.",
        "A condição n≠−1 na primitiva de xⁿ é essencial. Quando aparece 1/x, a primitiva é ln|x|, num intervalo que não atravesse zero. Também deves reconhecer imediatamente as primitivas de eˣ, seno e cosseno."
      ],
      formulas:[
        "∫ xⁿ dx = x^(n+1)/(n+1)+C, n≠−1",
        "∫ (1/x) dx = ln|x|+C, num intervalo sem 0",
        "∫ eˣ dx = eˣ+C",
        "∫ sin x dx = −cos x+C; ∫ cos x dx = sin x+C",
        "∫(a f+b g)dx = a∫f dx+b∫g dx"
      ],
      example:{
        title:"Exemplo resolvido · combinação linear de primitivas imediatas",
        steps:[
          "Calcula ∫(6x²−3/x+4eˣ)dx num intervalo onde x>0.",
          "∫6x²dx=2x³; ∫(−3/x)dx=−3ln x; ∫4eˣdx=4eˣ.",
          "Junta os termos e uma única constante: F(x)=2x³−3ln x+4eˣ+C.",
          "Derivando F obtém-se 6x²−3/x+4eˣ."
        ],
        result:"∫(6x²−3/x+4eˣ)dx=2x³−3ln x+4eˣ+C, para x>0.",
        note:"Em geral escreve-se ln|x|; neste exemplo x>0 permite escrever simplesmente ln x."
      },
      remember:"Antes de calcular, pergunta se a expressão é uma combinação linear de funções cuja primitiva é imediata.",
      pitfalls:[
        "Aplicar a fórmula de xⁿ com n=−1 e dividir por zero em vez de usar ln|x|.",
        "Introduzir integração por partes, substituições avançadas ou outras técnicas fora do núcleo quando a expressão é imediata."
      ]
    },
    {
      id:"12-int-integral-definido",
      kicker:"3 · INTEGRAL DEFINIDO",
      title:"O integral mede acumulação num intervalo",
      paragraphs:[
        "O integral definido ∫ₐᵇf(x)dx associa um número à função f e ao intervalo [a,b]. Para uma função contínua e não negativa, esse número coincide com a área da região limitada pelo gráfico de f, pelo eixo Ox e pelas retas x=a e x=b.",
        "Ao contrário de uma primitiva indefinida, um integral definido tem limites e produz um valor, não uma família com +C. A orientação do intervalo importa: trocar os limites muda o sinal, e integrar de a até a dá zero.",
        "O integral é uma soma acumulada. Mesmo quando é calculado através de uma primitiva, convém manter a interpretação geométrica ou contextual: unidades, intervalo considerado e sinal da função ajudam a perceber se o resultado faz sentido."
      ],
      formulas:[
        "∫ₐᵃ f(x)dx=0",
        "∫ᵦₐ f(x)dx=−∫ₐᵦ f(x)dx",
        "∫ₐᵦ(f+g)dx=∫ₐᵦf dx+∫ₐᵦg dx",
        "se f≥0 em [a,b], área sob o gráfico = ∫ₐᵦ f(x)dx"
      ],
      example:{
        title:"Exemplo resolvido · ler um integral como área",
        steps:[
          "Considera f(x)=2x em [0,3]; neste intervalo f(x)≥0.",
          "Geometricamente, a região é um triângulo de base 3 e altura 6.",
          "A área é (3×6)/2=9.",
          "Logo ∫₀³2x dx=9, resultado que depois também pode ser confirmado por Barrow."
        ],
        result:"∫₀³2x dx=9.",
        note:"A interpretação direta como área é segura aqui porque f é não negativa no intervalo."
      },
      remember:"Integral definido é um valor de acumulação; primitiva é uma função ou família de funções.",
      pitfalls:[
        "Acrescentar +C ao resultado de um integral definido.",
        "Confundir automaticamente integral com área geométrica quando a função assume valores negativos."
      ]
    },
    {
      id:"12-int-tfc-barrow",
      kicker:"4 · TEOREMA FUNDAMENTAL E FÓRMULA DE BARROW",
      title:"Derivação e integração encontram-se no mesmo teorema",
      paragraphs:[
        "O Teorema Fundamental do Cálculo liga a acumulação descrita por um integral à derivação. Se f é contínua, a função A(x)=∫ₐˣf(t)dt tem derivada A'(x)=f(x). Assim, uma função construída por acumulação é uma primitiva da função acumulada.",
        "A fórmula de Barrow transforma essa ligação num método de cálculo: se F é uma primitiva de f num intervalo que contém [a,b], então ∫ₐᵇf(x)dx=F(b)−F(a). A constante de uma primitiva desaparece na diferença.",
        "O método tem duas fases que não devem ser misturadas: primeiro encontra uma primitiva correta; depois avalia-a nos extremos, sempre na ordem limite superior menos limite inferior."
      ],
      formulas:[
        "A(x)=∫ₐˣ f(t)dt ⇒ A'(x)=f(x)",
        "se F'=f, então ∫ₐᵦf(x)dx=F(b)−F(a)",
        "[F(x)]ₐᵦ=F(b)−F(a)"
      ],
      example:{
        title:"Exemplo resolvido · aplicar Barrow",
        steps:[
          "Calcula ∫₁³(2x+1)dx.",
          "Uma primitiva é F(x)=x²+x.",
          "F(3)=9+3=12 e F(1)=1+1=2.",
          "Pela fórmula de Barrow, ∫₁³(2x+1)dx=12−2=10."
        ],
        result:"∫₁³(2x+1)dx=10.",
        note:"Qualquer escolha F+C daria a mesma diferença, porque a constante cancela."
      },
      remember:"Barrow é sempre «valor da primitiva no limite superior menos valor no limite inferior».",
      pitfalls:[
        "Trocar a ordem e calcular F(a)−F(b).",
        "Aplicar Barrow sem antes confirmar uma primitiva válida para o integrando."
      ]
    },
    {
      id:"12-int-areas",
      kicker:"5 · ÁREAS E APLICAÇÕES",
      title:"O sinal do integral e a área geométrica não são a mesma coisa",
      paragraphs:[
        "Para uma função contínua não negativa em [a,b], a área entre o gráfico e o eixo Ox é diretamente ∫ₐᵇf(x)dx. É esta a situação-base destacada nas Aprendizagens Essenciais e deve ser dominada antes de generalizações.",
        "Se a função muda de sinal, o integral definido contabiliza acumulação com sinal: zonas abaixo de Ox contribuem negativamente. Por isso, quando a pergunta pede área geométrica, é necessário localizar os zeros relevantes e separar as regiões antes de somar áreas positivas.",
        "Em modelação, um integral pode representar uma quantidade acumulada a partir de uma taxa: distância a partir da velocidade, quantidade total a partir de uma taxa de produção ou outra acumulação coerente com as unidades. A interpretação das unidades é parte da resposta."
      ],
      formulas:[
        "f(x)≥0 em [a,b] ⇒ A=∫ₐᵦf(x)dx",
        "área geométrica com mudança de sinal = soma das áreas positivas de cada região",
        "se f é uma taxa por unidade de x, ∫ₐᵦf(x)dx representa a acumulação entre a e b"
      ],
      example:{
        title:"Exemplo resolvido · distinguir integral e área",
        steps:[
          "Considera f(x)=x em [−1,1]. A função é negativa em [−1,0] e positiva em [0,1].",
          "Por simetria, ∫₋₁¹x dx=0: as contribuições com sinal anulam-se.",
          "A área geométrica, porém, é a soma de dois triângulos de base 1 e altura 1.",
          "Cada triângulo tem área 1/2, logo a área total é 1."
        ],
        result:"O integral definido é 0, mas a área geométrica entre o gráfico e Ox é 1.",
        note:"Este contraste ajuda a evitar a regra errada «integral = área» sem verificar o sinal."
      },
      remember:"O integral definido é acumulação orientada; área geométrica é sempre não negativa.",
      pitfalls:[
        "Dar uma área negativa ou zero porque não separaste regiões onde a função muda de sinal.",
        "Usar técnicas de integração avançadas como se fossem requisito deste tema, em vez de dominar primitivas imediatas, Barrow e interpretação."
      ]
    }
  ]
};

export function mathPrimitivesIntegrals12ReviewContentFor(themeId){
  return themeId==="12-int"?PRIMITIVES_INTEGRALS_12_REVIEW:null;
}
