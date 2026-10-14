export const MATH_TRIGONOMETRY_REVIEW_VERSION="2026.10-wave7";

export const TRIGONOMETRY_REVIEW={
  id:"11-trig",
  title:"Trigonometria",
  lead:"A Trigonometria do 11.º ano liga geometria, círculo trigonométrico e funções periódicas. Nesta revisão vais recuperar a resolução de triângulos, trabalhar ângulos generalizados e radianos, usar seno, cosseno e tangente no círculo trigonométrico e, por fim, interpretar e construir modelos de fenómenos periódicos. O objetivo é compreender as relações e saber escolhê-las em problemas, não decorar listas de fórmulas desligadas.",
  goals:[
    "Resolver problemas com triângulos recorrendo de forma criteriosa às razões trigonométricas e a decomposições geométricas adequadas.",
    "Relacionar ângulos orientados, ângulos generalizados, radianos e o círculo trigonométrico.",
    "Usar seno, cosseno e tangente, a fórmula fundamental e a redução ao primeiro quadrante com atenção aos sinais.",
    "Analisar as funções seno, cosseno e tangente e modelar fenómenos periódicos com apoio crítico da tecnologia."
  ],
  sourceBasis:[
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 11.º ano · março de 2026 · Trigonometria",
    "DGE · Coletânea de tarefas das turmas piloto · Trigonometria · Matemática A 11.º ano · janeiro de 2025"
  ],
  sections:[
    {
      id:"11-trig-triangulos",
      kicker:"1 · RESOLUÇÃO DE PROBLEMAS COM TRIÂNGULOS",
      title:"Transformar medidas e ângulos em relações que resolvem o problema",
      paragraphs:[
        "Antes de entrar no círculo trigonométrico, o 11.º ano recupera métodos trigonométricos já estudados para resolver problemas com triângulos retângulos e não retângulos. Num triângulo retângulo, a escolha entre seno, cosseno e tangente depende dos lados conhecidos e procurados relativamente ao ângulo de referência.",
        "Um triângulo não retângulo pode muitas vezes ser decomposto em dois triângulos retângulos através de uma altura. Essa construção transforma um problema aparentemente novo em duas relações trigonométricas simples ligadas pela mesma incógnita. O desenho deve acompanhar a escolha das relações e não servir apenas de ilustração.",
        "As leis dos senos e dos cossenos surgem nas AE atuais como possível aprofundamento, não como requisito obrigatório deste núcleo. Por isso, nesta revisão base privilegiamos os métodos explicitamente exigidos: razões trigonométricas, decomposição geométrica, raciocínio e modelação."
      ],
      formulas:[
        "sen α = cateto oposto / hipotenusa",
        "cos α = cateto adjacente / hipotenusa",
        "tg α = cateto oposto / cateto adjacente",
        "num triângulo retângulo: sen²α+cos²α=1"
      ],
      example:{
        title:"Exemplo resolvido · altura de um ponto observado a partir de dois extremos",
        steps:[
          "Num segmento horizontal AB com 100 m, observa-se um ponto C acima do segmento. Os ângulos CAB e CBA medem 50° e 65°. Traça a altura CD perpendicular a AB e chama x a AD e h a CD.",
          "No triângulo ACD, tg 50°=h/x, logo h=x·tg 50°.",
          "No triângulo BCD, tg 65°=h/(100−x), logo h=(100−x)·tg 65°.",
          "Iguala as duas expressões de h: x·tg50°=(100−x)·tg65°. Daqui resulta x≈64,28 m.",
          "Substitui em h=x·tg50° e obtém h≈76,60 m."
        ],
        result:"A altura CD mede aproximadamente 76,6 m.",
        note:"O passo decisivo foi criar dois triângulos retângulos que partilham a mesma altura; não foi necessário introduzir uma fórmula nova para triângulos não retângulos."
      },
      remember:"Num problema geométrico, identifica primeiro o triângulo útil e os lados relativamente ao ângulo escolhido; só depois escolhe seno, cosseno ou tangente.",
      pitfalls:[
        "Usar uma razão trigonométrica sem fixar claramente qual é o ângulo de referência e quais são os catetos oposto e adjacente.",
        "Tratar a lei dos senos ou a lei dos cossenos como conteúdo obrigatório deste núcleo quando as AE atuais as apresentam apenas como possível aprofundamento."
      ]
    },
    {
      id:"11-trig-angulos-radianos",
      kicker:"2 · ÂNGULOS GENERALIZADOS E RADIANOS",
      title:"O mesmo lado final pode corresponder a infinitas amplitudes",
      paragraphs:[
        "Um ângulo orientado é positivo quando a rotação se faz no sentido contrário ao dos ponteiros do relógio e negativo no sentido oposto. Como uma volta completa devolve o mesmo lado final, ângulos que diferem por um múltiplo inteiro de 360° — ou de 2π radianos — têm os mesmos lados.",
        "A unidade radiano nasce da relação entre o comprimento de um arco e o raio da circunferência. Um ângulo ao centro mede 1 radiano quando subtende um arco de comprimento igual ao raio. Como uma circunferência tem comprimento 2πr, uma volta completa mede 2π radianos.",
        "Graus e radianos descrevem o mesmo ângulo em escalas diferentes. No estudo de funções trigonométricas, os radianos tornam as relações algébricas e gráficas mais naturais; por isso é importante converter sem misturar unidades dentro do mesmo cálculo."
      ],
      formulas:[
        "ângulos com os mesmos lados: θ+2kπ, k∈ℤ",
        "180°=π rad ; 360°=2π rad",
        "θ(rad)=θ(°)·π/180",
        "comprimento do arco: s=rθ, com θ em radianos"
      ],
      example:{
        title:"Exemplo resolvido · interpretar −225° em radianos e encontrar uma amplitude equivalente",
        steps:[
          "Converte para radianos: −225°·π/180=−5π/4.",
          "Para obter uma amplitude positiva com os mesmos lados, soma uma volta completa: −5π/4+2π=3π/4.",
          "Assim, −225°, 135°, −5π/4 e 3π/4 conduzem ao mesmo lado final.",
          "No círculo trigonométrico, esse lado final está no 2.º quadrante."
        ],
        result:"−225°=−5π/4 rad e é coterminal com 135°=3π/4 rad.",
        note:"Somar 2π não altera o lado final; apenas escolhe outro representante da mesma família de ângulos generalizados."
      },
      remember:"Uma volta completa é simultaneamente 360° e 2π rad. Usa esta equivalência como âncora para todas as conversões.",
      pitfalls:[
        "Somar 360 a um valor expresso em radianos ou somar 2π a um valor expresso em graus.",
        "Pensar que duas amplitudes diferentes não podem representar o mesmo par de lados."
      ]
    },
    {
      id:"11-trig-circulo",
      kicker:"3 · CÍRCULO TRIGONOMÉTRICO",
      title:"Seno e cosseno passam a ser coordenadas; a tangente nasce do quociente",
      paragraphs:[
        "No círculo trigonométrico, de centro na origem e raio 1, ao ângulo θ associa-se o ponto P=(cos θ, sen θ). Esta interpretação estende seno e cosseno a ângulos generalizados e torna imediata a leitura dos sinais em cada quadrante.",
        "A tangente é definida por tg θ=sen θ/cos θ sempre que cos θ≠0. Por isso não existe nos ângulos cujo ponto no círculo tem abcissa zero, como π/2+kπ. O sinal da tangente resulta dos sinais de seno e cosseno.",
        "O círculo permite resolver muitos problemas sem calculadora: reconhecer ângulos de referência, comparar valores, identificar sinais e perceber por que ângulos que diferem de 2π têm o mesmo seno e cosseno."
      ],
      formulas:[
        "P(θ)=(cos θ, sen θ)",
        "tg θ=sen θ/cos θ, se cos θ≠0",
        "sen(θ+2kπ)=sen θ e cos(θ+2kπ)=cos θ",
        "tg(θ+kπ)=tg θ, quando definida"
      ],
      example:{
        title:"Exemplo resolvido · determinar seno e tangente a partir do cosseno",
        steps:[
          "Sabe-se que θ está no 2.º quadrante e cos θ=−3/5.",
          "No círculo de raio 1, usa sen²θ+cos²θ=1: sen²θ=1−9/25=16/25.",
          "No 2.º quadrante o seno é positivo, portanto sen θ=4/5.",
          "Calcula a tangente: tg θ=(4/5)/(−3/5)=−4/3."
        ],
        result:"sen θ=4/5 e tg θ=−4/3.",
        note:"A equação dá duas possibilidades para o seno; o quadrante é que decide o sinal correto."
      },
      remember:"No círculo trigonométrico, cosseno é a abcissa e seno é a ordenada. Saber o quadrante resolve grande parte das dúvidas de sinal.",
      pitfalls:[
        "Esquecer que tg θ deixa de estar definida quando cos θ=0.",
        "Retirar uma raiz quadrada e escolher automaticamente o sinal positivo sem usar o quadrante."
      ]
    },
    {
      id:"11-trig-relacoes",
      kicker:"4 · FÓRMULA FUNDAMENTAL E REDUÇÃO AO PRIMEIRO QUADRANTE",
      title:"Reduzir um ângulo sem perder o sinal que o quadrante impõe",
      paragraphs:[
        "Como o ponto (cos θ,sen θ) pertence à circunferência x²+y²=1, obtém-se a fórmula fundamental sen²θ+cos²θ=1. Esta relação permite determinar uma razão trigonométrica a partir de outra, desde que se use informação adicional para decidir o sinal.",
        "Reduzir ao primeiro quadrante significa identificar um ângulo de referência α entre 0 e π/2 e reconstruir o valor trigonométrico a partir da simetria do círculo. O valor absoluto coincide com o do ângulo de referência; o quadrante determina o sinal.",
        "É mais seguro raciocinar geometricamente do que decorar uma tabela longa. Por exemplo, π−α está no 2.º quadrante: tem a mesma ordenada de α e abcissa oposta, logo sen(π−α)=sen α e cos(π−α)=−cos α."
      ],
      formulas:[
        "sen²θ+cos²θ=1",
        "sen(π−α)=sen α ; cos(π−α)=−cos α",
        "sen(π+α)=−sen α ; cos(π+α)=−cos α",
        "sen(2π−α)=−sen α ; cos(2π−α)=cos α"
      ],
      example:{
        title:"Exemplo resolvido · usar a fórmula fundamental no 3.º quadrante",
        steps:[
          "Sabe-se que θ está no 3.º quadrante e cos θ=−12/13.",
          "Pela fórmula fundamental, sen²θ=1−144/169=25/169.",
          "No 3.º quadrante o seno é negativo, logo sen θ=−5/13.",
          "A tangente é positiva nesse quadrante: tg θ=(−5/13)/(−12/13)=5/12."
        ],
        result:"sen θ=−5/13 e tg θ=5/12.",
        note:"A fórmula fundamental fornece o módulo do seno; a posição no círculo fornece o sinal."
      },
      remember:"Na redução ao primeiro quadrante, separa duas perguntas: qual é o ângulo de referência e qual deve ser o sinal no quadrante original?",
      pitfalls:[
        "Aplicar sen²θ+cos²θ=1 e esquecer que a passagem de sen²θ para sen θ introduz duas possibilidades de sinal.",
        "Decorar sinais sem relacioná-los com as coordenadas do ponto no círculo, tornando a redução vulnerável a erros de memória."
      ]
    },
    {
      id:"11-trig-funcoes",
      kicker:"5 · FUNÇÕES SENO, COSSENO E TANGENTE",
      title:"Do círculo para gráficos periódicos com domínios e períodos próprios",
      paragraphs:[
        "As funções seno e cosseno estão definidas para todos os números reais, têm valores entre −1 e 1 e repetem-se de 2π em 2π. Os seus gráficos têm a mesma forma básica, mas estão desfasados: cos x=sen(x+π/2).",
        "A função tangente tem um comportamento diferente. Como tg x=sen x/cos x, não está definida quando cos x=0, isto é, em x=π/2+kπ. O seu período fundamental é π e a sua imagem é ℝ; entre duas assíntotas verticais consecutivas, o gráfico percorre todos os valores reais.",
        "Os radianos são a unidade natural dos eixos destas funções. Ao ler um gráfico, distingue domínio, zeros, extremos, período e assíntotas; não transfiras automaticamente para a tangente propriedades que pertencem apenas ao seno e ao cosseno."
      ],
      formulas:[
        "D_sen=D_cos=ℝ ; Im_sen=Im_cos=[−1,1]",
        "sen(x+2π)=sen x ; cos(x+2π)=cos x",
        "D_tg=ℝ\\{π/2+kπ:k∈ℤ} ; Im_tg=ℝ",
        "tg(x+π)=tg x"
      ],
      example:{
        title:"Exemplo resolvido · comparar periodicidade e zeros de seno e tangente",
        steps:[
          "Para sen x, os zeros são x=kπ e o período fundamental é 2π.",
          "Para tg x, os zeros também são x=kπ, mas o período fundamental é π.",
          "Assim, sen(x+π)=−sen x em geral, enquanto tg(x+π)=tg x.",
          "Por exemplo, em x=π/4: sen(5π/4)=−√2/2, mas tg(5π/4)=1=tg(π/4)."
        ],
        result:"Seno e tangente podem partilhar zeros, mas têm períodos e domínios diferentes.",
        note:"Um gráfico periódico não é caracterizado apenas pelos zeros; domínio, período e amplitude/comportamento vertical também contam."
      },
      remember:"Seno e cosseno: período 2π e valores em [−1,1]. Tangente: período π, imagem ℝ e falhas de domínio em π/2+kπ.",
      pitfalls:[
        "Afirmar que a tangente tem período 2π apenas porque seno e cosseno o têm.",
        "Desenhar a tangente como uma onda limitada entre −1 e 1, ignorando as assíntotas verticais e a imagem ℝ."
      ]
    },
    {
      id:"11-trig-modelacao",
      kicker:"6 · FENÓMENOS PERIÓDICOS E MODELAÇÃO",
      title:"Ler período, amplitude e deslocamentos como características do fenómeno",
      paragraphs:[
        "Fenómenos que repetem o seu comportamento podem ser modelados por funções trigonométricas. Em modelos do tipo a+b·sen(c(x−d)) ou a+b·cos(c(x−d)), o parâmetro a desloca a linha média, |b| controla a amplitude, c controla o período e d representa um deslocamento horizontal.",
        "Para seno e cosseno, o período de um modelo com argumento c(x−d) é T=2π/|c|. Se a variável independente for tempo, a frequência é o número de ciclos por unidade de tempo, f=1/T. Máximo e mínimo ficam a±|b| quando não existem outras restrições de domínio.",
        "As AE valorizam a tecnologia gráfica para explorar modelos e determinar aproximadamente zeros, extremos e outros pontos relevantes. A calculadora ou software ajuda a resolver numericamente; a interpretação matemática continua necessária para escolher a janela, verificar unidades e decidir se a solução faz sentido no contexto."
      ],
      formulas:[
        "y=a+b·sen(c(x−d)) ou y=a+b·cos(c(x−d))",
        "amplitude=|b|",
        "período T=2π/|c|, com c≠0",
        "frequência f=1/T",
        "máximo=a+|b| ; mínimo=a−|b|"
      ],
      example:{
        title:"Exemplo resolvido · altura numa roda gigante",
        steps:[
          "Modela-se a altura, em metros, por h(t)=15+12·sen[(π/20)(t−5)], com t em segundos.",
          "A linha média é 15 m e a amplitude é 12 m, logo as alturas extrema são 15−12=3 m e 15+12=27 m.",
          "Como c=π/20, o período é T=2π/(π/20)=40 s; a frequência é 1/40 ciclo por segundo.",
          "Em t=5 s, o argumento é zero e h(5)=15 m: a cabine cruza a linha média nesse instante.",
          "Se for pedido o primeiro instante posterior em que a altura atinge, por exemplo, 20 m, uma ferramenta gráfica ou numérica pode aproximar a solução, que deve depois ser interpretada dentro do intervalo temporal relevante."
        ],
        result:"O modelo oscila entre 3 m e 27 m, repete-se de 40 em 40 segundos e tem linha média 15 m.",
        note:"O parâmetro d=5 não é o período; desloca horizontalmente a curva e indica aqui uma passagem pela linha média."
      },
      remember:"Num modelo periódico, traduz cada parâmetro para o contexto: linha média, amplitude, período/frequência e deslocamento. Só depois procura instantes ou valores específicos.",
      pitfalls:[
        "Confundir o coeficiente c com o período; em seno/cosseno o período é 2π/|c|.",
        "Aceitar todas as soluções mostradas pela tecnologia sem verificar o domínio temporal e o significado físico do problema."
      ]
    }
  ]
};

export function mathTrigonometryReviewContentFor(themeId){
  return themeId==="11-trig"?TRIGONOMETRY_REVIEW:null;
}
