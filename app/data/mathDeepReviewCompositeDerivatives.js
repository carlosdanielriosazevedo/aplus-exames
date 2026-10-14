export const MATH_COMPOSITE_DERIVATIVES_REVIEW_VERSION="2026.10-wave4";

export const COMPOSITE_DERIVATIVES_REVIEW={
  id:"12-fcd",
  title:"Função composta e derivadas",
  lead:"Neste tema, a derivada deixa de ser apenas uma técnica de cálculo e passa a funcionar como uma ferramenta para compreender funções mais complexas. Vais ligar composição de funções, número e, novas regras de derivação, regra da cadeia, monotonia, otimização e concavidade, escolhendo em cada problema a estrutura certa antes de começar a calcular.",
  goals:[
    "Compor funções corretamente e determinar o domínio de uma função composta.",
    "Compreender o papel do número e e derivar funções exponenciais, logarítmicas, trigonométricas e potências reais.",
    "Aplicar regras de derivação e a regra da cadeia em expressões compostas.",
    "Usar primeira e segunda derivadas para estudar funções, resolver problemas de modelação e justificar extremos e concavidades."
  ],
  sourceBasis:[
    "EduQA/DGE · Coletânea de tarefas das turmas piloto · Função composta e derivadas · Matemática A 12.º ano · maio de 2026",
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 12.º ano · Função composta e derivadas",
    "IAVE · Prova Nacional de Matemática A 635 e critérios de classificação de 2026"
  ],
  sections:[
    {
      id:"12-fcd-composicao",
      kicker:"1 · FUNÇÃO COMPOSTA E DOMÍNIO",
      title:"Uma função atua sobre o resultado de outra",
      paragraphs:[
        "Na composição f∘g, aplica-se primeiro g e só depois f. Assim, (f∘g)(x)=f(g(x)). A ordem é essencial: em geral, f∘g e g∘f são funções diferentes, podendo até ter domínios diferentes.",
        "O domínio de f∘g não se obtém olhando apenas para a expressão final já simplificada. Um valor x só é admissível se pertencer ao domínio de g e, além disso, se g(x) pertencer ao domínio de f. Esta condição deve ser verificada antes de cancelar fatores ou simplificar expressões.",
        "A composição é especialmente útil em modelos por etapas. Se uma grandeza depende de uma segunda grandeza e esta, por sua vez, depende do tempo, a composição permite escrever diretamente a primeira grandeza em função do tempo."
      ],
      formulas:[
        "(f∘g)(x)=f(g(x))",
        "D_(f∘g)={x∈D_g : g(x)∈D_f}",
        "Em geral, f∘g ≠ g∘f",
        "Se y=f(u) e u=g(x), então y=(f∘g)(x)"
      ],
      example:{
        title:"Exemplo resolvido · domínio de f∘g",
        steps:[
          "Considera f(x)=√x e g(x)=1/(x−2). Então (f∘g)(x)=√(1/(x−2)).",
          "Para g estar definida, é necessário x≠2.",
          "Como f só aceita argumentos não negativos, também é necessário 1/(x−2)≥0.",
          "A fração é positiva apenas para x>2; não pode ser zero. Logo o domínio da composta é ]2,+∞[."
        ],
        result:"D_(f∘g)=]2,+∞[.",
        note:"O domínio vem das duas etapas da composição, não apenas do aspeto final da expressão."
      },
      remember:"Em f∘g, pensa sempre «g primeiro, f depois» e verifica se o resultado de g pode entrar em f.",
      pitfalls:["Trocar a ordem da composição e calcular g(f(x)) quando é pedido f(g(x)).","Simplificar uma expressão e recuperar indevidamente valores que estavam excluídos pelo domínio da função original."]
    },
    {
      id:"12-fcd-e-exponencial",
      kicker:"2 · NÚMERO e E DERIVADA DA EXPONENCIAL",
      title:"A exponencial cuja taxa de variação coincide com o próprio valor",
      paragraphs:[
        "Entre todas as funções exponenciais a^x, existe uma base especial: o número de Euler e≈2,71828. A função f(x)=e^x é a única exponencial de base positiva cuja função derivada coincide com a própria função: f'(x)=e^x.",
        "Esta propriedade torna e^x particularmente natural em modelos de crescimento e decrescimento contínuo. Se uma quantidade varia a uma taxa proporcional ao seu próprio valor, surgem frequentemente expressões do tipo Ce^(kx).",
        "Para uma base qualquer a>0, a≠1, a derivada de a^x é a^x·ln(a). O fator ln(a) explica por que a base e é especial: ln(e)=1. A função ln x é a inversa de e^x e será também essencial nas regras de derivação seguintes."
      ],
      formulas:[
        "e≈2,71828",
        "(e^x)'=e^x",
        "(a^x)'=a^x·ln(a), com a>0 e a≠1",
        "ln(e)=1 e e^(ln x)=x, para x>0"
      ],
      example:{
        title:"Exemplo resolvido · taxa instantânea num modelo exponencial",
        steps:[
          "Uma grandeza é modelada por Q(t)=500e^(0,03t).",
          "Deriva: Q'(t)=500·0,03·e^(0,03t)=15e^(0,03t).",
          "No instante t=10, Q'(10)=15e^0,3≈20,25.",
          "O valor obtido é uma taxa instantânea: indica quanto Q está a variar por unidade de tempo naquele instante."
        ],
        result:"Q'(10)≈20,25 unidades de Q por unidade de tempo.",
        note:"A derivada não dá o valor da grandeza; dá a rapidez com que esse valor está a mudar."
      },
      remember:"A função e^x é a sua própria derivada; numa exponencial de outra base aparece o fator ln(a).",
      pitfalls:["Escrever (a^x)'=x·a^(x−1), confundindo uma função exponencial com uma potência.","Interpretar Q'(t) como quantidade acumulada em vez de taxa instantânea de variação."]
    },
    {
      id:"12-fcd-log-trig-potencias",
      kicker:"3 · LOGARITMOS, TRIGONOMÉTRICAS E POTÊNCIAS",
      title:"Ampliar o repertório de derivadas elementares",
      paragraphs:[
        "A derivada de ln x é 1/x, para x>0. Como log_a x=ln x/ln a, a derivada do logaritmo de base a é 1/(x ln a). As condições de domínio continuam a fazer parte do problema: não se deriva um logaritmo real ignorando que o seu argumento tem de ser positivo.",
        "Para potências x^α com expoente real, a regra (x^α)'=αx^(α−1) é usada, no enquadramento real geral, para x>0. Casos particulares podem admitir domínios mais largos, mas a expressão e o domínio devem ser lidos em conjunto.",
        "As derivadas trigonométricas fundamentais permitem estudar funções periódicas e modelos oscilatórios. Em radianos, (sen x)'=cos x, (cos x)'=−sen x e (tg x)'=1/cos²x nos pontos em que a tangente está definida."
      ],
      formulas:[
        "(ln x)'=1/x, para x>0",
        "(log_a x)'=1/(x·ln a), com a>0, a≠1 e x>0",
        "(x^α)'=αx^(α−1), para α∈ℝ e x>0",
        "(sen x)'=cos x",
        "(cos x)'=−sen x",
        "(tg x)'=1/cos²x, quando cos x≠0"
      ],
      example:{
        title:"Exemplo resolvido · derivar h(x)=ln x + x^(3/2) − 2cos x",
        steps:[
          "O domínio imposto por ln x e pela potência real é x>0.",
          "Deriva termo a termo: (ln x)'=1/x.",
          "(x^(3/2))'=(3/2)x^(1/2).",
          "(−2cos x)'=2sen x."
        ],
        result:"h'(x)=1/x + (3/2)√x + 2sen x, para x>0.",
        note:"Escrever o domínio antes da derivada evita tratar a fórmula como se fosse válida em valores onde a função original nem sequer está definida."
      },
      remember:"Cada nova fórmula de derivação vem com as condições de existência da função que estás a derivar.",
      pitfalls:["Esquecer o sinal negativo em (cos x)'=−sen x.","Usar (ln x)'=1/x em x≤0 como se ln x fosse uma função real definida nesses valores."]
    },
    {
      id:"12-fcd-regras-cadeia",
      kicker:"4 · OPERAÇÕES ENTRE DERIVADAS E REGRA DA CADEIA",
      title:"Reconhecer a estrutura antes de derivar",
      paragraphs:[
        "As regras da soma, produto e quociente permitem derivar funções construídas a partir de outras funções deriváveis. Antes de começar, identifica a operação dominante: soma, produto, quociente ou composição. Esta leitura reduz erros mecânicos.",
        "A regra da cadeia é a regra central para funções compostas. Se h(x)=f(g(x)), então h'(x)=f'(g(x))·g'(x). Em linguagem prática: deriva a função de fora, mantendo a de dentro, e multiplica pela derivada da função de dentro.",
        "A regra da cadeia combina-se com todas as restantes. Expressões como e^(x²), ln(1+x), sen(3x) ou (2x−1)^α não exigem novas fórmulas independentes: exigem reconhecer uma função conhecida aplicada a outra função."
      ],
      formulas:[
        "(u+v)'=u'+v'",
        "(uv)'=u'v+uv'",
        "(u/v)'=(u'v−uv')/v², com v≠0",
        "(f∘g)'(x)=f'(g(x))·g'(x)",
        "(e^(u(x)))'=e^(u(x))·u'(x)",
        "(ln(u(x)))'=u'(x)/u(x), quando u(x)>0"
      ],
      example:{
        title:"Exemplo resolvido · derivar p(x)=x²·ln(1+x)",
        steps:[
          "O domínio é x>−1. A expressão é um produto entre u(x)=x² e v(x)=ln(1+x).",
          "Pela regra do produto: p'(x)=2x·ln(1+x)+x²·v'(x).",
          "Para v, usa a regra da cadeia: v'(x)=1/(1+x)·1=1/(1+x).",
          "Substitui e simplifica apenas se isso ajudar a leitura."
        ],
        result:"p'(x)=2x·ln(1+x)+x²/(1+x), para x>−1.",
        note:"Neste exemplo coexistem produto e composição. A sequência correta é identificar primeiro a estrutura exterior de cada parte."
      },
      remember:"A regra da cadeia não substitui produto ou quociente; combina-se com eles quando a expressão tem várias camadas.",
      pitfalls:["Derivar f(g(x)) como f'(g(x)) e esquecer o fator g'(x).","Aplicar a regra do produto a uma composição, como se f(g(x)) fosse um produto de duas funções."]
    },
    {
      id:"12-fcd-aplicacoes",
      kicker:"5 · ESTUDO DE FUNÇÕES, MODELAÇÃO E OTIMIZAÇÃO",
      title:"Usar derivadas para justificar comportamento e decisões",
      paragraphs:[
        "O sinal de f' permite estudar monotonia: quando f'>0 a função é crescente e quando f'<0 é decrescente, em intervalos onde a função é derivável. Num ponto interior em que uma função derivável tem um extremo local, é necessário que f'(x)=0; a condição é necessária, mas não suficiente.",
        "Em problemas de otimização, começa por construir a função objetivo e determinar o domínio imposto pelo contexto. Depois procura pontos críticos, estuda o sinal da derivada e compara os candidatos relevantes, incluindo extremos do domínio quando existirem.",
        "A segunda derivada descreve a variação do declive. Quando f''>0, o gráfico é convexo (concavidade voltada para cima); quando f''<0, é côncavo (concavidade voltada para baixo). Uma mudança de sinal de f'' num ponto do gráfico identifica um ponto de inflexão; f''(x)=0, por si só, não basta."
      ],
      formulas:[
        "f'(x)>0 ⇒ f crescente localmente no intervalo considerado",
        "f'(x)<0 ⇒ f decrescente localmente no intervalo considerado",
        "Extremo interior + derivabilidade ⇒ f'(x)=0",
        "f''(x)>0 ⇒ gráfico convexo; f''(x)<0 ⇒ gráfico côncavo",
        "Ponto de inflexão ⇒ mudança de concavidade"
      ],
      example:{
        title:"Exemplo resolvido · máximo de f(x)=x·e^(−x), com x≥0",
        steps:[
          "Deriva pelo produto e pela regra da cadeia: f'(x)=e^(−x)−x·e^(−x)=e^(−x)(1−x).",
          "Como e^(−x)>0, o sinal de f' depende apenas de 1−x: é positivo para 0≤x<1 e negativo para x>1.",
          "Logo f cresce até x=1 e decresce depois de x=1; portanto x=1 dá o máximo global no domínio.",
          "O valor máximo é f(1)=1/e. A conclusão resulta do estudo do sinal, não apenas de resolver f'(x)=0."
        ],
        result:"f atinge o máximo em x=1, com valor máximo 1/e.",
        note:"Encontrar um zero da derivada cria um candidato; é o estudo do sinal ou outra justificação válida que demonstra que se trata de um máximo ou mínimo."
      },
      remember:"Em otimização, a derivada produz candidatos; a justificação vem do comportamento da função e do domínio do problema.",
      pitfalls:["Concluir automaticamente que f'(a)=0 implica extremo em a.","Dizer que f''(a)=0 garante ponto de inflexão sem verificar mudança de concavidade."]
    }
  ]
};

export function mathCompositeDerivativesReviewContentFor(themeId){
  return themeId==="12-fcd"?COMPOSITE_DERIVATIVES_REVIEW:null;
}
