export const MATH_APPROXIMATE_EQUATIONS_REVIEW_VERSION="2026.10-wave6";

export const APPROXIMATE_EQUATIONS_REVIEW={
  id:"12-rae",
  title:"Resolução aproximada de equações",
  lead:"Nem todas as equações relevantes admitem uma solução exata simples. Neste tema vais aprender a provar que uma solução existe e, depois, a aproximá-la com controlo: primeiro localizando raízes por continuidade, depois refinando intervalos pelo método da bisseção e, por fim, usando as tangentes no método de Newton-Raphson. O objetivo não é executar algoritmos às cegas, mas compreender as hipóteses, a precisão e as limitações de cada método.",
  goals:[
    "Aplicar corretamente o Teorema do Valor Intermédio/Bolzano-Cauchy para garantir existência e localizar zeros, sem confundir existência com unicidade.",
    "Executar o método da bisseção, controlar a amplitude dos intervalos e relacioná-la com o erro máximo de uma aproximação pelo ponto médio.",
    "Aplicar e interpretar geometricamente o método de Newton-Raphson, compreendendo o efeito da aproximação inicial e as situações em que o processo pode falhar.",
    "Escolher criticamente entre bisseção, Newton-Raphson e tecnologia de acordo com as garantias e a precisão exigidas pelo problema."
  ],
  sourceBasis:[
    "EduQA/DGE · Coletânea de tarefas das turmas piloto · Resolução aproximada de equações · Matemática A 12.º ano · junho de 2026",
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 12.º ano · março de 2026 · Resolução aproximada de equações",
    "IAVE · Prova Nacional de Matemática A 635 e critérios de classificação de 2026"
  ],
  sections:[
    {
      id:"12-rae-bolzano-localizacao",
      kicker:"1 · BOLZANO-CAUCHY E LOCALIZAÇÃO DE RAÍZES",
      title:"Uma mudança de sinal garante um zero quando a continuidade está assegurada",
      paragraphs:[
        "O Teorema do Valor Intermédio afirma que uma função contínua num intervalo fechado [a,b] toma todos os valores compreendidos entre f(a) e f(b). Para resolver equações, interessa especialmente o corolário de Bolzano-Cauchy: se f é contínua em [a,b] e f(a) e f(b) têm sinais contrários, então existe pelo menos um c em ]a,b[ tal que f(c)=0.",
        "A continuidade é indispensável. Uma simples mudança de sinal entre os extremos não garante um zero se a função puder saltar de valores negativos para positivos através de uma descontinuidade. Do mesmo modo, o teorema garante existência, mas não garante que o zero seja único.",
        "Para localizar uma solução de uma equação F(x)=G(x), transforma-a em f(x)=F(x)−G(x) e procura um intervalo onde f seja contínua e haja mudança de sinal. Depois podes estreitar esse intervalo por novas avaliações — ideia que prepara diretamente o método da bisseção."
      ],
      formulas:[
        "f contínua em [a,b] e f(a)·f(b)<0 ⇒ ∃c∈]a,b[: f(c)=0",
        "F(x)=G(x) ⇔ f(x)=F(x)−G(x)=0",
        "Bolzano-Cauchy garante pelo menos um zero; não garante unicidade"
      ],
      example:{
        title:"Exemplo resolvido · provar que x³+x−1=0 tem uma solução em ]0,1[",
        steps:[
          "Define f(x)=x³+x−1. Por ser polinomial, f é contínua em ℝ e, em particular, em [0,1].",
          "Calcula os valores nos extremos: f(0)=−1 e f(1)=1.",
          "Como f(0)·f(1)=−1<0, os valores têm sinais contrários.",
          "Pelo Teorema de Bolzano-Cauchy, existe pelo menos um c∈]0,1[ tal que f(c)=0."
        ],
        result:"A equação x³+x−1=0 tem pelo menos uma solução no intervalo ]0,1[.",
        note:"Neste caso f'(x)=3x²+1>0, pelo que a função é estritamente crescente e a raiz é única; essa unicidade vem de informação adicional, não do Teorema de Bolzano-Cauchy por si só."
      },
      remember:"A sequência lógica é sempre: continuidade + sinais contrários nos extremos ⇒ existência de pelo menos um zero no interior.",
      pitfalls:[
        "Aplicar Bolzano-Cauchy apenas porque f(a) e f(b) têm sinais contrários, sem verificar continuidade em todo o intervalo.",
        "Concluir que há exatamente uma raiz quando o teorema apenas garante que existe pelo menos uma."
      ]
    },
    {
      id:"12-rae-bissecao",
      kicker:"2 · MÉTODO DA BISSEÇÃO",
      title:"Reduzir sistematicamente um intervalo que mantém a raiz aprisionada",
      paragraphs:[
        "O método da bisseção parte de um intervalo [a₀,b₀] onde uma função contínua muda de sinal. Calcula-se o ponto médio m=(a+b)/2 e conserva-se a metade em cujos extremos continua a existir mudança de sinal. Repetindo este processo, obtêm-se intervalos encaixados cada vez menores que continuam a conter pelo menos uma raiz.",
        "A força do método está no controlo do erro. Se o intervalo inicial tem amplitude L₀=b₀−a₀, após n bisseções a amplitude é Lₙ=L₀/2ⁿ. Se tomarmos o ponto médio do intervalo final como aproximação da raiz, a distância até qualquer ponto desse intervalo — e portanto até a raiz nele contida — é no máximo metade da amplitude: L₀/2ⁿ⁺¹.",
        "A bisseção é robusta, mas relativamente lenta. Exige uma mudança de sinal e continuidade no intervalo, e não deteta diretamente raízes de multiplicidade par quando a função toca no eixo e conserva o mesmo sinal. Em compensação, cada iteração mantém uma garantia clara sobre onde está a solução e sobre a precisão alcançada."
      ],
      formulas:[
        "m_n=(a_n+b_n)/2",
        "L_n=(b_0−a_0)/2^n",
        "erro do ponto médio ≤ L_n/2=(b_0−a_0)/2^(n+1)",
        "Para erro ≤ ε, escolhe n tal que (b_0−a_0)/2^(n+1)≤ε"
      ],
      example:{
        title:"Exemplo resolvido · aproximar a raiz de x³+x−1=0 com erro inferior a 0,01",
        steps:[
          "Do exemplo anterior, sabemos que existe uma raiz em [0,1]. A amplitude inicial é L₀=1.",
          "Para garantir erro inferior a 0,01 usando o ponto médio final, precisamos de 1/2^(n+1)<0,01. Como 1/2⁷≈0,0078125, seis bisseções são suficientes.",
          "As escolhas sucessivas, pelo sinal de f, conduzem aos intervalos [0,5;1], [0,5;0,75], [0,625;0,75], [0,625;0,6875], [0,65625;0,6875] e [0,671875;0,6875].",
          "O ponto médio do último intervalo é 0,6796875 e o erro máximo garantido é metade da amplitude 0,015625, isto é, 0,0078125."
        ],
        result:"x≈0,6796875 com erro máximo garantido inferior a 0,01.",
        note:"A aproximação pode estar muito mais perto da raiz real do que o limite de erro indica; o valor 0,0078125 é uma garantia, não uma previsão do erro efetivamente cometido."
      },
      remember:"Na bisseção, não basta produzir muitos algarismos: a precisão vem da amplitude do intervalo que comprovadamente continua a conter a raiz.",
      pitfalls:[
        "Escolher sempre a metade onde |f| parece menor em vez de conservar a metade que mantém a condição de mudança de sinal.",
        "Confundir a amplitude do intervalo final com o erro máximo do seu ponto médio; o erro máximo do ponto médio é metade dessa amplitude."
      ]
    },
    {
      id:"12-rae-newton",
      kicker:"3 · MÉTODO DE NEWTON-RAPHSON",
      title:"Usar retas tangentes para produzir aproximações sucessivas",
      paragraphs:[
        "O método de Newton-Raphson transforma uma aproximação xₙ numa nova aproximação usando a reta tangente ao gráfico de y=f(x) no ponto de abcissa xₙ. A interseção dessa tangente com o eixo Ox fornece xₙ₊₁=xₙ−f(xₙ)/f'(xₙ). Geometricamente, cada passo tenta substituir localmente a curva pela sua tangente.",
        "Quando a aproximação inicial é favorável e a função se comporta bem perto de uma raiz simples, Newton-Raphson pode convergir muito depressa. Mas não tem a robustez automática da bisseção: se f'(xₙ)=0 o passo nem sequer está definido, e uma escolha infeliz de x₀ pode levar a outra raiz, a oscilações ou à divergência.",
        "Na prática pode usar-se |xₙ₊₁−xₙ| como critério de paragem para indicar que as iterações estabilizaram. Contudo, sem hipóteses adicionais, essa diferença não é por si só uma prova universal de que o erro verdadeiro |xₙ−r| é inferior ao mesmo valor. É importante distinguir um critério computacional de paragem de uma garantia matemática de erro como a que a bisseção fornece.",
        "A escolha do método depende do problema. A bisseção privilegia garantia e controlo do intervalo; Newton-Raphson privilegia rapidez quando existe derivada e uma boa aproximação inicial. Calculadoras e software podem automatizar métodos numéricos, mas o aluno deve compreender o processo que sustenta o valor apresentado."
      ],
      formulas:[
        "x_(n+1)=x_n−f(x_n)/f'(x_n)",
        "reta tangente em x_n: y=f(x_n)+f'(x_n)(x−x_n)",
        "f'(x_n)=0 ⇒ a iteração de Newton não está definida nesse passo",
        "|x_(n+1)−x_n| pequeno pode ser critério de paragem; não é sempre uma garantia absoluta do erro verdadeiro"
      ],
      example:{
        title:"Exemplo resolvido · aproximar √2 resolvendo x²−2=0",
        steps:[
          "Define f(x)=x²−2 e f'(x)=2x. Escolhe x₀=1,5, próximo da raiz positiva e com f'(x₀)≠0.",
          "Primeira iteração: x₁=1,5−(1,5²−2)/(2·1,5)=1,416666…",
          "Segunda iteração: x₂=x₁−(x₁²−2)/(2x₁)≈1,414215686.",
          "Terceira iteração: x₃≈1,414213562. As aproximações estabilizam rapidamente perto da raiz positiva."
        ],
        result:"Após três iterações a partir de x₀=1,5, obtém-se √2≈1,414213562.",
        note:"Se o objetivo fosse uma garantia formal de erro baseada apenas no método estudado, a bisseção daria um controlo mais direto. Newton-Raphson oferece aqui uma convergência muito mais rápida."
      },
      remember:"Newton-Raphson é poderoso porque usa informação local da derivada; essa mesma dependência explica por que o valor inicial e o comportamento da função são decisivos.",
      pitfalls:[
        "Aplicar a fórmula sem verificar se f'(x_n) é nula ou muito próxima de zero, situação que pode tornar o passo impossível ou instável.",
        "Assumir que qualquer aproximação inicial converge para a raiz pretendida ou que duas iterações muito próximas constituem sempre uma prova rigorosa do erro real."
      ]
    }
  ]
};

export function mathApproximateEquationsReviewContentFor(themeId){
  return themeId==="12-rae"?APPROXIMATE_EQUATIONS_REVIEW:null;
}
