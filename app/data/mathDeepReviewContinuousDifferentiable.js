export const MATH_CONTINUOUS_DIFFERENTIABLE_REVIEW_VERSION="2026.10-wave5";

export const CONTINUOUS_DIFFERENTIABLE_REVIEW={
  id:"12-fcont",
  title:"Funções contínuas e deriváveis",
  lead:"Neste tema, o objetivo já não é aprender novas famílias de funções, mas perceber com rigor como elas se comportam. Vais ligar limites e continuidade, escolher corretamente quando usar a Regra de L’Hôpital, determinar assíntotas e reunir domínio, limites, derivadas e tecnologia num estudo global de funções. A prioridade é justificar cada conclusão — não confiar apenas no aspeto de um gráfico ou numa regra aplicada mecanicamente.",
  goals:[
    "Reconhecer continuidade num ponto e num intervalo e justificar continuidade através das famílias conhecidas e das operações entre funções.",
    "Resolver limites indeterminados 0/0 e ∞/∞, distinguindo quando a Regra de L’Hôpital é aplicável de quando outra técnica é mais adequada.",
    "Determinar e interpretar assíntotas verticais, horizontais e oblíquas através dos limites apropriados.",
    "Construir um estudo global coerente de uma função, articulando domínio, limites, assíntotas, derivadas e leitura crítica da tecnologia."
  ],
  sourceBasis:[
    "EduQA/DGE · Coletânea de tarefas das turmas piloto · Funções contínuas e deriváveis · Matemática A 12.º ano · maio de 2026",
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 12.º ano · março de 2026 · Funções contínuas e deriváveis",
    "IAVE · Prova Nacional de Matemática A 635 e critérios de classificação de 2026"
  ],
  sections:[
    {
      id:"12-fcont-limites-continuidade",
      kicker:"1 · LIMITE E CONTINUIDADE NUM PONTO",
      title:"Uma função é contínua quando o valor e o comportamento local concordam",
      paragraphs:[
        "Dizer que f é contínua num ponto a do seu domínio significa que, quando x se aproxima de a, os valores de f(x) se aproximam de f(a). Em linguagem de limites, a condição central é lim_(x→a) f(x)=f(a). Esta igualdade só faz sentido para continuidade em a quando a pertence ao domínio de f.",
        "Numa função definida por ramos, não basta substituir x=a na fórmula do ramo que contém o ponto. É necessário verificar o comportamento dos dois lados: para existir um limite bilateral finito, os limites laterais têm de existir e coincidir; depois esse valor comum tem ainda de ser igual a f(a).",
        "Uma descontinuidade pode surgir porque o limite não existe, porque é infinito, ou porque existe um limite finito mas o valor atribuído à função no ponto é diferente. Distinguir estas situações é mais importante do que decorar nomes para tipos de descontinuidade."
      ],
      formulas:[
        "f contínua em a ⇔ a∈D_f e lim_(x→a) f(x)=f(a)",
        "lim_(x→a−) f(x)=lim_(x→a+) f(x)=L ⇒ lim_(x→a) f(x)=L",
        "Se lim_(x→a) f(x)=L mas f(a)≠L, então f não é contínua em a"
      ],
      example:{
        title:"Exemplo resolvido · escolher um parâmetro para garantir continuidade",
        steps:[
          "Considera f(x)=(x²−1)/(x−1), se x≠1, e f(1)=k.",
          "Para x≠1, fatoriza x²−1=(x−1)(x+1), logo f(x)=x+1.",
          "Assim, lim_(x→1) f(x)=lim_(x→1)(x+1)=2.",
          "Para haver continuidade em x=1 é necessário que f(1) seja igual a esse limite; como f(1)=k, tem de ser k=2."
        ],
        result:"A função é contínua em x=1 exatamente quando k=2.",
        note:"Cancelar o fator ajuda a calcular o limite, mas não transforma automaticamente a expressão original numa função definida em x=1."
      },
      remember:"Continuidade num ponto exige três coisas ligadas entre si: o ponto pertence ao domínio, o limite existe e esse limite coincide com o valor da função.",
      pitfalls:[
        "Concluir que uma função é contínua em a apenas porque f(a) existe, sem estudar o limite.",
        "Usar apenas um limite lateral quando o ponto é interior do domínio e é necessário verificar o comportamento dos dois lados."
      ]
    },
    {
      id:"12-fcont-operacoes",
      kicker:"2 · CONTINUIDADE EM INTERVALOS E OPERAÇÕES",
      title:"Reconhecer continuidade sem recalcular limites ponto a ponto",
      paragraphs:[
        "As famílias elementares já conhecidas fornecem uma base de funções contínuas nos respetivos domínios: polinomiais, exponenciais, logarítmicas e trigonométricas. As funções racionais são contínuas em todos os pontos onde o denominador não se anula.",
        "A continuidade preserva-se através de operações usuais. Se f e g são contínuas num ponto, então f+g, f−g e fg também são contínuas nesse ponto; f/g é contínua quando, além disso, g não se anula. A composição f∘g é contínua quando g é contínua no ponto e f é contínua no valor produzido por g.",
        "Quando se pergunta em que intervalos uma expressão é contínua, o método mais eficiente é primeiro determinar o domínio e depois identificar as operações e composições usadas. Assim evita-se calcular limites desnecessários em cada ponto do intervalo."
      ],
      formulas:[
        "f,g contínuas em a ⇒ f±g e fg contínuas em a",
        "f,g contínuas em a e g(a)≠0 ⇒ f/g contínua em a",
        "g contínua em a e f contínua em g(a) ⇒ f∘g contínua em a",
        "Função racional: contínua em {x : denominador≠0}"
      ],
      example:{
        title:"Exemplo resolvido · intervalos de continuidade de h(x)=ln(x+2)/(x−1)",
        steps:[
          "O logaritmo exige x+2>0, logo x>−2.",
          "O denominador exige x−1≠0, logo x≠1.",
          "ln(x+2) é contínua para x>−2 e x−1 é um polinómio, portanto é contínuo em ℝ.",
          "O quociente é contínuo onde ambos estão definidos e o denominador não é zero."
        ],
        result:"h é contínua em ]−2,1[ e em ]1,+∞[.",
        note:"O domínio já revela os pontos onde a regra geral de continuidade do quociente deixa de poder ser usada."
      },
      remember:"Para estudar continuidade em intervalos, começa pelas funções-base e pelo domínio; usa depois as regras de soma, produto, quociente e composição.",
      pitfalls:[
        "Dizer que um quociente de funções contínuas é sempre contínuo, esquecendo os zeros do denominador.",
        "Afirmar que ln(u(x)) é contínua só porque u é contínua, sem impor u(x)>0."
      ]
    },
    {
      id:"12-fcont-lhopital",
      kicker:"3 · REGRA DE L’HÔPITAL E LIMITES NOTÁVEIS",
      title:"Primeiro identifica a indeterminação; só depois escolhe a ferramenta",
      paragraphs:[
        "A Regra de L’Hôpital é uma ferramenta para limites de quocientes que conduzem às formas indeterminadas 0/0 ou ∞/∞. Nessas condições, e verificadas as hipóteses de derivabilidade necessárias numa vizinhança do ponto, pode estudar-se o limite do quociente das derivadas. Não é uma regra para qualquer fração nem para qualquer expressão com infinitos.",
        "Antes de aplicar L’Hôpital, substitui ou analisa o comportamento para identificar a forma do limite. Expressões do tipo 0·∞, ∞−∞ ou 1^∞ não estão diretamente nas duas formas autorizadas: se for adequado, têm de ser transformadas primeiro. Também pode ser preferível fatorizar, racionalizar ou usar um limite notável quando isso torna a resolução mais curta e transparente.",
        "Os limites notáveis ajudam a comparar magnitudes e aparecem repetidamente no estudo de exponenciais, logaritmos e trigonometria. Entre os mais úteis estão (e^x−1)/x→1, ln(1+x)/x→1 e sen x/x→1 quando x→0, bem como o domínio assintótico da exponencial sobre potências e das potências sobre logaritmos quando x→+∞."
      ],
      formulas:[
        "0/0 ou ∞/∞ + hipóteses de L’Hôpital ⇒ lim f/g = lim f'/g', quando este limite existe no sentido aplicável",
        "lim_(x→0) (e^x−1)/x = 1",
        "lim_(x→0) ln(1+x)/x = 1",
        "lim_(x→0) sen(x)/x = 1",
        "a>1, p∈ℕ ⇒ lim_(x→+∞) a^x/x^p=+∞ e lim_(x→+∞) log_a(x)/x^p=0"
      ],
      example:{
        title:"Exemplo resolvido · lim_(x→0) (e^x−1−x)/x²",
        steps:[
          "A substituição direta dá (1−1−0)/0=0/0, por isso a forma é indeterminada e L’Hôpital pode ser considerada.",
          "Deriva numerador e denominador: o limite passa a lim_(x→0) (e^x−1)/(2x).",
          "A nova substituição continua a dar 0/0. Aplicando novamente a regra, obtém-se lim_(x→0) e^x/2.",
          "Agora já não há indeterminação: e^0/2=1/2."
        ],
        result:"lim_(x→0) (e^x−1−x)/x² = 1/2.",
        note:"Uma segunda aplicação só é legítima porque, depois da primeira, voltou a surgir uma forma 0/0."
      },
      remember:"L’Hôpital não se escolhe porque aparecem derivadas no programa; escolhe-se porque o limite é um quociente com forma 0/0 ou ∞/∞ e as condições da regra estão satisfeitas.",
      pitfalls:[
        "Aplicar L’Hôpital diretamente a 0·∞, ∞−∞ ou 1^∞ sem transformar a expressão numa forma adequada.",
        "Continuar a derivar numerador e denominador por rotina mesmo depois de a indeterminação ter desaparecido."
      ]
    },
    {
      id:"12-fcont-assintotas",
      kicker:"4 · ASSÍNTOTAS",
      title:"Traduzir comportamento-limite em retas de referência do gráfico",
      paragraphs:[
        "Uma assíntota vertical x=a está ligada ao comportamento da função quando x se aproxima de a: basta que pelo menos um dos limites laterais seja +∞ ou −∞. Por isso, a análise do domínio e dos limites laterais é decisiva; um ponto excluído do domínio não é automaticamente uma assíntota vertical.",
        "Uma assíntota horizontal y=b descreve o comportamento para x→+∞ ou x→−∞ quando f(x) tende para um número real b. A mesma função pode ter assíntotas horizontais diferentes nos dois extremos do eixo real.",
        "Uma assíntota oblíqua tem equação y=mx+b, com m≠0, e exige que f(x)−(mx+b) tenda para zero num dos infinitos. Quando os limites existem, é frequente determinar m por lim f(x)/x e depois b por lim(f(x)−mx)."
      ],
      formulas:[
        "x=a é assíntota vertical se lim_(x→a−)f(x)=±∞ ou lim_(x→a+)f(x)=±∞",
        "y=b é assíntota horizontal em ±∞ se lim_(x→±∞) f(x)=b",
        "y=mx+b é assíntota oblíqua se lim_(x→±∞)[f(x)−(mx+b)]=0, com m≠0",
        "m=lim_(x→±∞) f(x)/x ; b=lim_(x→±∞)[f(x)−mx], quando estes limites são finitos e adequados"
      ],
      example:{
        title:"Exemplo resolvido · assíntotas de f(x)=(2x²+3)/(x−1)",
        steps:[
          "O domínio exclui x=1. Como o numerador tende para 5 e o denominador tende para 0 com sinais opostos dos dois lados, os limites laterais são infinitos; logo x=1 é assíntota vertical.",
          "Efetua a divisão: (2x²+3)/(x−1)=2x+2+5/(x−1).",
          "Quando x→±∞, o termo 5/(x−1) tende para 0.",
          "Portanto f(x)−(2x+2)→0 nos dois infinitos."
        ],
        result:"As assíntotas são x=1 e y=2x+2.",
        note:"A exclusão x=1 sugeriu onde estudar uma possível assíntota vertical; foram os limites infinitos que a confirmaram."
      },
      remember:"Assíntotas são afirmações sobre limites. O desenho pode sugeri-las, mas a justificação analítica vem do comportamento-limite.",
      pitfalls:[
        "Chamar assíntota vertical a qualquer zero do denominador sem verificar se a função tende para infinito.",
        "Procurar uma assíntota oblíqua e uma horizontal no mesmo sentido do infinito como se ambas pudessem descrever simultaneamente o mesmo comportamento."
      ]
    },
    {
      id:"12-fcont-estudo-global",
      kicker:"5 · ESTUDO GLOBAL DE FUNÇÕES",
      title:"Juntar as peças numa descrição coerente do gráfico",
      paragraphs:[
        "Um estudo global deve começar pelo domínio e pelas características algébricas simples da função, como zeros, sinal ou simetrias relevantes. Só depois faz sentido organizar limites, assíntotas e derivadas. Esta ordem evita estudar pontos onde a função não existe ou interpretar como extremo um comportamento que pertence a ramos diferentes.",
        "A primeira derivada fornece monotonia e candidatos a extremos; a segunda derivada fornece informação sobre concavidade e possíveis pontos de inflexão. Os limites descrevem o comportamento junto de fronteiras do domínio e no infinito. Quando estas informações concordam, constroem uma imagem robusta do gráfico sem depender exclusivamente da calculadora.",
        "A tecnologia gráfica é uma ferramenta de verificação e exploração, não uma prova. Uma janela mal escolhida, uma resolução insuficiente ou escalas muito diferentes podem esconder extremos, assíntotas ou mudanças de concavidade. O estudo analítico deve explicar o que o gráfico mostra — e também detetar quando o gráfico pode enganar."
      ],
      formulas:[
        "Roteiro: domínio → zeros/sinal → limites/assíntotas → f' → f'' → síntese gráfica",
        "f'(x)>0 ⇒ crescente; f'(x)<0 ⇒ decrescente, nos intervalos considerados",
        "f''(x)>0 ⇒ gráfico convexo; f''(x)<0 ⇒ gráfico côncavo, onde f'' existe",
        "Tecnologia gráfica confirma/ilustra; a justificação analítica sustenta a conclusão"
      ],
      example:{
        title:"Exemplo resolvido · estudo essencial de f(x)=x+1/x",
        steps:[
          "Domínio: ℝ\\{0}. Como lim_(x→0−)f(x)=−∞ e lim_(x→0+)f(x)=+∞, x=0 é assíntota vertical. Como f(x)−x=1/x→0 quando x→±∞, y=x é assíntota oblíqua.",
          "Deriva: f'(x)=1−1/x²=(x²−1)/x². Os zeros são x=−1 e x=1.",
          "Como x²>0 no domínio, o sinal de f' depende de x²−1: f cresce em ]−∞,−1[ e ]1,+∞[, e decresce em ]−1,0[ e ]0,1[.",
          "Logo f(−1)=−2 é um máximo local no ramo negativo e f(1)=2 é um mínimo local no ramo positivo.",
          "A segunda derivada é f''(x)=2/x³: é negativa para x<0 e positiva para x>0. A concavidade muda ao atravessar 0, mas 0 não pertence ao domínio, portanto não existe ponto de inflexão em x=0.",
          "Um gráfico tecnológico deve reproduzir estes dois ramos, a assíntota vertical, a assíntota oblíqua e os dois extremos; se não o fizer, ajusta a janela antes de alterar a conclusão analítica."
        ],
        result:"O estudo analítico determina dois ramos separados por x=0, assíntota y=x, máximo local (−1,−2) e mínimo local (1,2), sem ponto de inflexão em x=0.",
        note:"Este exemplo mostra por que domínio, limites e derivadas têm de ser lidos em conjunto: uma mudança de concavidade através de um ponto ausente do domínio não cria um ponto de inflexão."
      },
      remember:"O estudo de funções não é uma lista de contas independentes; cada resultado deve contribuir para uma descrição única e consistente do comportamento da função.",
      pitfalls:[
        "Copiar a forma sugerida pela calculadora sem confirmar domínio, limites e derivadas.",
        "Declarar um ponto de inflexão apenas porque f'' muda de sinal em torno de um valor que nem sequer pertence ao domínio da função."
      ]
    }
  ]
};

export function mathContinuousDifferentiableReviewContentFor(themeId){
  return themeId==="12-fcont"?CONTINUOUS_DIFFERENTIABLE_REVIEW:null;
}
