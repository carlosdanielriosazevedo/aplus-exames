export const MATH_DIFFERENTIAL_CALCULUS_11_REVIEW_VERSION="2026.10-wave12";

export const DIFFERENTIAL_CALCULUS_11_REVIEW={
  id:"11-cd",
  title:"Cálculo diferencial",
  lead:"A derivada mede variação instantânea. Neste capítulo vais começar pela taxa média, aproximar a taxa instantânea através da razão incremental, interpretar a derivada como declive da tangente, construir a função derivada, aplicar as regras de derivação previstas no 11.º ano e usar o sinal da derivada para estudar monotonia, extremos e problemas simples de otimização.",
  goals:[
    "Interpretar a taxa média de variação como declive de uma secante e a derivada num ponto como taxa instantânea e declive da tangente.",
    "Passar da razão incremental à definição intuitiva de derivada e compreender a função derivada como uma nova função.",
    "Aplicar regras de derivação da soma, diferença, produto, quociente e potências de expoente natural, sem antecipar a regra da cadeia do 12.º ano.",
    "Relacionar o sinal e os zeros da derivada com monotonia e extremos e resolver problemas simples de otimização com justificação."
  ],
  sourceBasis:[
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 11.º ano · março de 2026 · Cálculo diferencial",
    "DGE · recursos e tarefas das turmas piloto · Cálculo diferencial · Matemática A 11.º ano"
  ],
  sections:[
    {
      id:"11-cd-taxa-media",
      kicker:"1 · TAXA MÉDIA DE VARIAÇÃO",
      title:"A variação média é o declive da secante entre dois pontos",
      paragraphs:[
        "A taxa média de variação de f entre a e b compara quanto a função mudou com quanto a variável mudou. Calcula-se por [f(b)−f(a)]/(b−a), com a≠b. As unidades são as unidades de f por unidade da variável independente.",
        "Geometricamente, esta taxa é o declive da reta secante ao gráfico que passa por (a,f(a)) e (b,f(b)). Esta leitura liga álgebra e gráfico: taxa positiva significa que, entre os dois pontos, o valor final é maior; taxa negativa significa que é menor.",
        "A taxa média não descreve necessariamente o que aconteceu em cada instante do intervalo. Uma viagem pode ter velocidade média de 80 km/h sem o veículo circular a 80 km/h durante todo o percurso. A derivada nasce precisamente da tentativa de descrever a variação num instante."
      ],
      formulas:[
        "TMV_[a,b]=[f(b)−f(a)]/(b−a), a≠b",
        "declive da secante AB=Δy/Δx",
        "Δx=b−a; Δf=f(b)−f(a)"
      ],
      example:{
        title:"Exemplo resolvido · taxa média de s(t)=t²+2t entre t=1 e t=4",
        steps:[
          "Calcula s(1)=1+2=3 e s(4)=16+8=24.",
          "A variação da posição é 24−3=21.",
          "A variação do tempo é 4−1=3.",
          "Logo a taxa média é 21/3=7."
        ],
        result:"A taxa média de variação é 7 unidades de posição por unidade de tempo.",
        note:"O valor 7 pertence ao intervalo inteiro [1,4]; não é ainda uma taxa instantânea em t=1 ou t=4."
      },
      remember:"Taxa média = variação vertical / variação horizontal = declive da secante.",
      pitfalls:[
        "Dividir f(b)−f(a) por b em vez de pela variação b−a.",
        "Interpretar a taxa média como se a função tivesse obrigatoriamente a mesma taxa em todos os pontos do intervalo."
      ]
    },
    {
      id:"11-cd-derivada-ponto",
      kicker:"2 · DERIVADA NUM PONTO",
      title:"A secante aproxima-se da tangente quando o intervalo encolhe",
      paragraphs:[
        "Para estudar a variação de f perto de x=a, compara-se f(a+h) com f(a). A razão [f(a+h)−f(a)]/h é a razão incremental: mede a taxa média num pequeno intervalo de comprimento h a partir de a.",
        "Quando h se aproxima de zero, sem ser zero, observamos o comportamento dessas taxas médias. Se elas se aproximarem de um valor finito comum, esse valor é a derivada f'(a). No 11.º ano esta passagem usa uma noção intuitiva de limite, coerente com as AE atuais.",
        "A derivada num ponto tem duas leituras fundamentais: taxa de variação instantânea e declive da reta tangente ao gráfico nesse ponto. Uma derivada positiva significa tangente com declive positivo; uma derivada negativa, declive negativo; uma derivada nula corresponde a tangente horizontal, mas não garante por si só um extremo."
      ],
      formulas:[
        "razão incremental=[f(a+h)−f(a)]/h, h≠0",
        "f'(a)=lim_(h→0)[f(a+h)−f(a)]/h, quando este valor existe",
        "f'(a)=declive da tangente ao gráfico de f em x=a"
      ],
      example:{
        title:"Exemplo resolvido · derivada de f(x)=x² em x=3 pela razão incremental",
        steps:[
          "Escreve [f(3+h)−f(3)]/h=[(3+h)²−9]/h.",
          "Desenvolve o numerador: 9+6h+h²−9=6h+h².",
          "Para h≠0, simplifica (6h+h²)/h=6+h.",
          "Quando h se aproxima de 0, 6+h aproxima-se de 6."
        ],
        result:"f'(3)=6.",
        note:"Só se cancela h enquanto h≠0; o valor final surge da aproximação h→0, não de substituir h=0 na fração original."
      },
      remember:"A derivada é o valor para o qual tendem as taxas médias em intervalos cada vez menores junto do ponto.",
      pitfalls:[
        "Substituir imediatamente h=0 na razão incremental e concluir 0/0, sem simplificar e estudar a aproximação.",
        "Concluir que f'(a)=0 implica automaticamente máximo ou mínimo em a."
      ]
    },
    {
      id:"11-cd-tangente",
      kicker:"3 · RETA TANGENTE E INTERPRETAÇÃO GEOMÉTRICA",
      title:"Conhecer o ponto e a derivada determina a tangente",
      paragraphs:[
        "Se f é derivável em a, a reta tangente ao gráfico no ponto A=(a,f(a)) tem declive f'(a). Conhecendo um ponto e o declive, usa-se a forma ponto-declive da equação de uma reta.",
        "A tangente fornece uma descrição linear local do gráfico: muito perto do ponto de tangência, a função e a reta podem ter valores semelhantes. No 11.º ano, o foco principal é interpretar o declive e construir a equação da tangente, não desenvolver ainda toda a teoria de aproximação linear.",
        "Uma tangente horizontal tem f'(a)=0, mas o gráfico pode atravessar esse ponto sem aí ter extremo. Por isso, a geometria da tangente e o estudo de monotonia devem ser articulados em vez de tratados como conclusões automáticas."
      ],
      formulas:[
        "A=(a,f(a))",
        "m_tangente=f'(a)",
        "y−f(a)=f'(a)(x−a)"
      ],
      example:{
        title:"Exemplo resolvido · tangente a f(x)=x²−x em x=2",
        steps:[
          "Calcula o ponto: f(2)=4−2=2, logo A=(2,2).",
          "A função derivada é f'(x)=2x−1, portanto f'(2)=3.",
          "Usa a forma ponto-declive: y−2=3(x−2).",
          "Simplifica: y=3x−4."
        ],
        result:"A reta tangente é y=3x−4.",
        note:"Não basta conhecer f'(2)=3: a reta também tem de passar pelo ponto (2,f(2))."
      },
      remember:"Tangente em x=a: passa por (a,f(a)) e tem declive f'(a).",
      pitfalls:[
        "Usar f(a) como declive da tangente em vez de f'(a).",
        "Escrever y=f'(a)x sem garantir que a reta passa efetivamente pelo ponto do gráfico."
      ]
    },
    {
      id:"11-cd-funcao-derivada",
      kicker:"4 · FUNÇÃO DERIVADA",
      title:"Derivar em cada ponto cria uma nova função",
      paragraphs:[
        "A função derivada f' associa a cada ponto x onde f é derivável o valor da derivada de f nesse ponto. Assim, f'(x) não é uma taxa média num intervalo fixo: é uma função que descreve como o declive de f varia ao longo do domínio onde a derivada existe.",
        "O gráfico de f' pode ser lido em relação ao gráfico de f. Onde f' é positiva, f tende a crescer; onde f' é negativa, f tende a decrescer. Os zeros de f' assinalam pontos de tangente horizontal e candidatos a extremos, mas a classificação exige informação adicional sobre o sinal da derivada.",
        "No sentido inverso, observar o gráfico de f permite antecipar qualitativamente o sinal de f'. O objetivo é criar uma ligação entre representações — expressão, tabela, gráfico de f e gráfico de f' — em vez de tratar a derivada apenas como uma manipulação simbólica."
      ],
      formulas:[
        "f': x ↦ f'(x)",
        "f'(x)>0 ⇒ f crescente no intervalo considerado",
        "f'(x)<0 ⇒ f decrescente no intervalo considerado",
        "f'(a)=0 ⇒ a é candidato a ponto estacionário; não garante extremo"
      ],
      example:{
        title:"Exemplo resolvido · interpretar f'(x)=3x²−3",
        steps:[
          "Resolve f'(x)=0: 3x²−3=0 ⇒ x=−1 ou x=1.",
          "Como 3x²−3>0 para x<−1 e x>1, f é crescente nesses intervalos.",
          "Como 3x²−3<0 para −1<x<1, f é decrescente nesse intervalo.",
          "Logo a passagem + para − em x=−1 indica máximo local e a passagem − para + em x=1 indica mínimo local."
        ],
        result:"Crescente em ]−∞,−1[ e ]1,+∞[; decrescente em ]−1,1[; máximo local em x=−1 e mínimo local em x=1.",
        note:"A classificação dos extremos vem da mudança de sinal de f', não apenas da equação f'=0."
      },
      remember:"O gráfico de f' é um mapa dos declives de f.",
      pitfalls:[
        "Confundir os zeros de f com os zeros de f'.",
        "Classificar todo zero de f' como extremo sem verificar a mudança de sinal."
      ]
    },
    {
      id:"11-cd-regras",
      kicker:"5 · REGRAS DE DERIVAÇÃO",
      title:"Reconhecer a operação exterior antes de aplicar a regra",
      paragraphs:[
        "Depois de compreender a derivada pela razão incremental, as regras permitem derivar funções mais eficientemente. No 11.º ano, as AE incluem adição, subtração, multiplicação, divisão e potências com expoente natural.",
        "Para um produto, é necessário derivar ambos os fatores de forma cruzada: (uv)'=u'v+uv'. Para um quociente, (u/v)'=(u'v−uv')/v², nos pontos em que v≠0. Estas fórmulas não se reduzem a multiplicar ou dividir simplesmente as derivadas.",
        "A regra da potência dá (x^n)'=n x^(n−1) para expoente natural no enquadramento estudado. A regra da cadeia e as derivadas de exponenciais, logaritmos e trigonométricas são aprofundamentos do 12.º ano e não devem ser antecipadas como exigência central desta wave."
      ],
      formulas:[
        "(u+v)'=u'+v' ; (u−v)'=u'−v'",
        "(uv)'=u'v+uv'",
        "(u/v)'=(u'v−uv')/v², v≠0",
        "(x^n)'=n·x^(n−1), n∈ℕ"
      ],
      example:{
        title:"Exemplo resolvido · derivar f(x)=(x²+1)(x−3)",
        steps:[
          "Identifica um produto: u=x²+1 e v=x−3.",
          "Deriva os fatores: u'=2x e v'=1.",
          "Aplica a regra do produto: f'=2x(x−3)+(x²+1)·1.",
          "Simplifica: f'(x)=3x²−6x+1."
        ],
        result:"f'(x)=3x²−6x+1.",
        note:"Derivar o produto como u'v' daria 2x, perdendo quase toda a informação da função original."
      },
      remember:"Produto e quociente têm regras próprias; identifica primeiro a estrutura da expressão.",
      pitfalls:[
        "Escrever (uv)'=u'v' ou (u/v)'=u'/v'.",
        "Usar a regra da cadeia ou fórmulas de derivação do 12.º ano como se fossem pré-requisitos deste capítulo."
      ]
    },
    {
      id:"11-cd-monotonia-otimizacao",
      kicker:"6 · MONOTONIA, EXTREMOS E OTIMIZAÇÃO",
      title:"A derivada produz candidatos; o sinal justifica a decisão",
      paragraphs:[
        "O sinal de f' permite estudar a monotonia de f: f'>0 associa-se a crescimento e f'<0 a decrescimento nos intervalos em análise. Zeros da derivada e pontos onde a derivada não existe podem separar intervalos e criar candidatos relevantes para o estudo.",
        "O Teorema de Fermat dá uma condição necessária: se uma função tem um extremo local num ponto interior e é derivável nesse ponto, então a derivada é zero. O recíproco é falso; f'(a)=0 não basta para concluir que existe máximo ou mínimo.",
        "Num problema de otimização, começa por identificar a grandeza a maximizar ou minimizar, construir a função objetivo e determinar o domínio imposto pelo contexto. Depois encontra candidatos e usa o sinal da derivada, os extremos do domínio quando aplicáveis e o significado do problema para justificar a solução.",
        "A tecnologia pode ajudar a explorar o modelo e a verificar resultados, mas a resposta deve explicar por que o candidato escolhido é efetivamente ótimo dentro do domínio relevante."
      ],
      formulas:[
        "f'(x)>0 ⇒ f crescente; f'(x)<0 ⇒ f decrescente, nos intervalos considerados",
        "extremo local interior + derivabilidade ⇒ f'(a)=0",
        "f'(a)=0 ⇏ extremo local",
        "otimização: modelo + domínio + candidatos + justificação"
      ],
      example:{
        title:"Exemplo resolvido · maximizar a área com 20 m de vedação em três lados",
        steps:[
          "Se x é a largura perpendicular a uma parede e y o lado paralelo, a vedação impõe 2x+y=20, logo y=20−2x.",
          "A área é A(x)=x(20−2x)=20x−2x², com 0<x<10.",
          "Deriva: A'(x)=20−4x. O único zero é x=5.",
          "A'>0 para x<5 e A'<0 para x>5; portanto A cresce até 5 e decresce depois. O máximo ocorre em x=5, y=10."
        ],
        result:"A área máxima é 50 m², obtida para x=5 m e y=10 m.",
        note:"Resolver A'=0 encontrou o candidato; foi a mudança de sinal, juntamente com o domínio, que justificou o máximo."
      },
      remember:"Em otimização, nunca pares em f'=0. Mostra por que o candidato é máximo ou mínimo no domínio do problema.",
      pitfalls:[
        "Aplicar o Teorema de Fermat ao contrário e afirmar que derivada nula garante extremo.",
        "Otimizar uma expressão sem determinar primeiro o domínio imposto pelo contexto real."
      ]
    }
  ]
};

export function mathDifferentialCalculus11ReviewContentFor(themeId){
  return themeId==="11-cd"?DIFFERENTIAL_CALCULUS_11_REVIEW:null;
}
