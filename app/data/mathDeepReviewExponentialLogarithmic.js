export const MATH_EXP_LOG_REVIEW_VERSION="2026.10-wave3";

export const EXPONENTIAL_LOGARITHMIC_REVIEW={
  id:"12-expl",
  title:"Funções exponenciais e logarítmicas",
  lead:"As funções exponenciais descrevem processos em que a variação acontece por fatores multiplicativos. As funções logarítmicas surgem como suas inversas e permitem responder à pergunta inversa: a que expoente é preciso elevar uma base para obter determinado valor? Nesta revisão vais ligar expressões, gráficos, modelos, inversão e resolução de equações.",
  goals:[
    "Reconhecer e interpretar funções exponenciais, incluindo transformações do seu gráfico.",
    "Modelar crescimento e decrescimento multiplicativo e interpretar os parâmetros do modelo.",
    "Compreender função inversa e a ligação entre potenciação, radiciação, exponencial e logaritmo.",
    "Usar propriedades dos logaritmos e resolver equações exponenciais e logarítmicas, verificando sempre as condições de existência."
  ],
  sourceBasis:[
    "EduQA/DGE · Coletânea de tarefas das turmas piloto · Funções exponenciais e logarítmicas · Matemática A 12.º ano · março de 2026",
    "DGE · Aprendizagens Essenciais de Matemática A · 12.º ano · Funções exponenciais e logarítmicas",
    "IAVE · Prova Nacional de Matemática A 635 e critérios de classificação de 2026"
  ],
  sections:[
    {
      id:"12-expl-exponencial",
      kicker:"1 · FUNÇÃO EXPONENCIAL",
      title:"Crescer ou decrescer multiplicando sempre pelo mesmo fator",
      paragraphs:[
        "Uma função exponencial tem a variável no expoente. Na forma base f(x)=a^x, com a>0 e a≠1, o domínio é ℝ e os valores da função são sempre positivos. O gráfico passa por (0,1), não tem zeros e aproxima-se do eixo Ox sem o intersetar.",
        "Se a>1, a função é estritamente crescente: aumentar x faz aumentar a^x. Se 0<a<1, a função é estritamente decrescente. Em ambos os casos, a função é contínua e a reta y=0 funciona como assíntota horizontal do gráfico de a^x.",
        "Expressões como g(x)=b·a^(x−c)+d transformam o gráfico de a^x. O parâmetro c produz uma translação horizontal, d uma translação vertical e b altera a escala vertical; se b<0, há também reflexão relativamente ao eixo Ox. A assíntota horizontal passa de y=0 para y=d."
      ],
      formulas:[
        "f(x)=a^x, com a>0 e a≠1",
        "D_f=ℝ e Im(f)=]0,+∞[",
        "f(0)=1 e a^x>0 para todo x∈ℝ",
        "g(x)=b·a^(x−c)+d ⇒ assíntota horizontal y=d, se b≠0"
      ],
      example:{
        title:"Exemplo resolvido · estudar g(x)=2·3^(x−1)−4",
        steps:[
          "A base 3 é maior do que 1, por isso 3^(x−1) é crescente; como o fator 2 é positivo, g continua crescente.",
          "A translação vertical é −4, logo a assíntota horizontal é y=−4.",
          "Interseção com Oy: g(0)=2·3^(−1)−4=2/3−4=−10/3.",
          "Para determinar um zero, resolve 2·3^(x−1)−4=0 ⇒ 3^(x−1)=2 ⇒ x=1+log₃2."
        ],
        result:"g é crescente, tem assíntota y=−4, interseta Oy em (0,−10/3) e tem um único zero em x=1+log₃2.",
        note:"Nas transformações, não tentes memorizar o gráfico inteiro: identifica primeiro base, escala e translações."
      },
      remember:"Numa função exponencial, a base decide o sentido da monotonia; a translação vertical decide a nova assíntota horizontal.",
      pitfalls:["Confundir a^x com x^a: só a primeira é exponencial na variável x.","Dizer que a função exponencial tem zero porque o gráfico se aproxima do eixo Ox; aproximar-se não significa intersetar."]
    },
    {
      id:"12-expl-modelacao",
      kicker:"2 · MODELAÇÃO EXPONENCIAL",
      title:"Reconhecer processos em que a mesma percentagem atua repetidamente",
      paragraphs:[
        "Um modelo exponencial é adequado quando, em intervalos de tempo iguais, uma quantidade é multiplicada aproximadamente pelo mesmo fator. Se cresce r por cento em cada período, o fator multiplicativo é 1+r; se decresce r por cento, é 1−r, usando r em forma decimal.",
        "Um modelo típico é Q(t)=Q₀·a^t. Q₀ representa o valor inicial e a o fator por período. Quando a>1 há crescimento; quando 0<a<1 há decrescimento. A expressão Q(t)=Q₀e^(kt) é outra forma muito usada: k>0 corresponde a crescimento e k<0 a decrescimento.",
        "Modelar não é apenas substituir valores numa fórmula. É preciso interpretar a unidade de t, verificar se o fator corresponde ao mesmo intervalo temporal e avaliar se o resultado é plausível no contexto. Para descobrir quando o modelo atinge um valor, resolve-se uma equação exponencial, analiticamente ou com tecnologia quando necessário."
      ],
      formulas:[
        "Crescimento de r por período: Q(t)=Q₀(1+r)^t",
        "Decrescimento de r por período: Q(t)=Q₀(1−r)^t",
        "Modelo contínuo: Q(t)=Q₀e^(kt)",
        "Se Q(t+n)=c·Q(t), então c é o fator multiplicativo em n unidades de tempo"
      ],
      example:{
        title:"Exemplo resolvido · população que cresce 8% ao ano",
        steps:[
          "Uma população tem inicialmente 12 000 indivíduos. O fator anual é 1+0,08=1,08.",
          "O modelo é P(t)=12000·1,08^t, com t em anos.",
          "Ao fim de 5 anos: P(5)=12000·1,08^5≈17632.",
          "Para saber quando ultrapassa 20 000, resolve 12000·1,08^t>20000, ou seja, 1,08^t>5/3; a solução pode ser obtida com logaritmos ou graficamente."
        ],
        result:"O modelo traduz uma variação percentual repetida, e não um aumento fixo de 8% do valor inicial em todos os anos.",
        note:"Crescer 8% por ano não é somar sempre 960; os 8% incidem sobre o valor atualizado."
      },
      remember:"Variação percentual repetida sugere um fator multiplicativo e, portanto, um modelo exponencial.",
      pitfalls:["Usar 8 em vez de 0,08 numa taxa de 8%.","Aplicar uma taxa anual com t medido em meses sem converter o período ou reinterpretar o fator."]
    },
    {
      id:"12-expl-inversa-raizes",
      kicker:"3 · FUNÇÃO INVERSA E RAÍZES",
      title:"Desfazer uma função e perceber por que aparecem logaritmos",
      paragraphs:[
        "Uma função admite inversa quando cada valor da sua imagem corresponde a um único valor do domínio. Graficamente, isto significa que nenhuma reta horizontal pode cortar o gráfico da função em mais do que um ponto. É o chamado teste da reta horizontal.",
        "Se f é invertível, f⁻¹ desfaz a ação de f: f⁻¹(f(x))=x. O domínio de f⁻¹ é a imagem de f e a imagem de f⁻¹ é o domínio de f. Os gráficos de f e f⁻¹ são simétricos relativamente à reta y=x.",
        "A radiciação de índice natural desfaz a potenciação em domínios adequados. De modo análogo, a função logarítmica de base a desfaz a função exponencial a^x. Esta ligação é a ponte conceptual para passar de uma equação exponencial a uma equação em que o expoente fica isolado."
      ],
      formulas:[
        "f⁻¹(f(x))=x e f(f⁻¹(x))=x, nos domínios adequados",
        "D_(f⁻¹)=Im(f) e Im(f⁻¹)=D_f",
        "x^n=y ⇔ x=ⁿ√y, respeitando o domínio escolhido",
        "a^x=y ⇔ x=log_a(y), com a>0, a≠1 e y>0"
      ],
      example:{
        title:"Exemplo resolvido · inversa de f(x)=2^x",
        steps:[
          "A função f(x)=2^x é estritamente crescente, logo é invertível.",
          "Escreve y=2^x e troca o papel das variáveis: x=2^y.",
          "Resolve em ordem a y: y=log₂x.",
          "Assim f⁻¹(x)=log₂x, com domínio ]0,+∞[."
        ],
        result:"A inversa da exponencial de base 2 é a função logarítmica de base 2.",
        note:"A simetria dos gráficos relativamente a y=x troca domínio e imagem."
      },
      remember:"Uma inversa não é 1/f(x). É uma função que desfaz a correspondência criada por f.",
      pitfalls:["Confundir f⁻¹(x) com 1/f(x).","Procurar uma inversa global de uma função que não é injetiva no domínio considerado sem primeiro restringir o domínio."]
    },
    {
      id:"12-expl-logaritmica",
      kicker:"4 · FUNÇÃO LOGARÍTMICA",
      title:"O logaritmo é um expoente",
      paragraphs:[
        "O número log_a x é o expoente a que é preciso elevar a base a para obter x. Por definição, a^(log_a x)=x para x>0. A base deve satisfazer a>0 e a≠1, e o argumento de um logaritmo real tem de ser estritamente positivo.",
        "A função f(x)=log_a x tem domínio ]0,+∞[ e imagem ℝ. Passa por (1,0) porque log_a1=0 e possui assíntota vertical x=0. Se a>1 é crescente; se 0<a<1 é decrescente.",
        "As propriedades operatórias dos logaritmos resultam das propriedades das potências. Transformam produtos em somas, quocientes em diferenças e potências em fatores multiplicativos. Não existe, porém, uma regra equivalente para log_a(x+y)."
      ],
      formulas:[
        "log_a x=y ⇔ a^y=x, com a>0, a≠1 e x>0",
        "log_a(xy)=log_a x+log_a y, para x,y>0",
        "log_a(x/y)=log_a x−log_a y, para x,y>0",
        "log_a(x^r)=r·log_a x, quando a expressão está definida",
        "log_a x = ln x / ln a = log_b x / log_b a"
      ],
      example:{
        title:"Exemplo resolvido · simplificar log₂(8x²), com x>0",
        steps:[
          "Separa o produto: log₂(8x²)=log₂8+log₂(x²).",
          "Como 2³=8, log₂8=3.",
          "Como x>0, log₂(x²)=2log₂x.",
          "Junta os termos: log₂(8x²)=3+2log₂x."
        ],
        result:"log₂(8x²)=3+2log₂x, para x>0.",
        note:"A condição x>0 garante que log₂x está definido; as condições de existência fazem parte da resolução."
      },
      remember:"Ler log_a x como «o expoente que transforma a em x» torna muitas propriedades mais naturais.",
      pitfalls:["Escrever log(x+y)=log x+log y; essa propriedade não existe.","Aceitar argumentos iguais a zero ou negativos em logaritmos reais."]
    },
    {
      id:"12-expl-equacoes",
      kicker:"5 · EQUAÇÕES EXPONENCIAIS E LOGARÍTMICAS",
      title:"Escolher a estratégia antes de aplicar logaritmos",
      paragraphs:[
        "Uma equação exponencial pode muitas vezes ser resolvida escrevendo os dois membros na mesma base. Se isso não for possível, os logaritmos permitem trazer o expoente para fora da potência. Também é legítimo resolver graficamente, sobretudo em problemas de modelação em que a solução exata não é o objetivo principal.",
        "Numa equação logarítmica, começa sempre pelas condições de existência: cada argumento de logaritmo tem de ser positivo. Só depois aplicas propriedades, comparas argumentos quando as bases são iguais ou passas para forma exponencial.",
        "No fim, verifica as soluções na equação original. Manipulações algébricas podem gerar valores incompatíveis com as condições de existência, particularmente quando aparecem expressões dentro de logaritmos."
      ],
      formulas:[
        "a^u=a^v ⇔ u=v, para a>0 e a≠1",
        "a^u=c, c>0 ⇒ u=log_a c",
        "log_a u=log_a v ⇔ u=v, desde que u>0 e v>0",
        "log_a u=c ⇔ u=a^c, com u>0"
      ],
      example:{
        title:"Exemplo resolvido · log₂(x−1)+log₂(x+1)=3",
        steps:[
          "Condições de existência: x−1>0 e x+1>0, logo x>1.",
          "Usa a regra do produto: log₂[(x−1)(x+1)]=3.",
          "Passa para forma exponencial: (x−1)(x+1)=2³=8.",
          "x²−1=8 ⇒ x²=9 ⇒ x=−3 ou x=3.",
          "Aplica a condição x>1: apenas x=3 é admissível."
        ],
        result:"Solução: x=3.",
        note:"Sem escrever primeiro as condições de existência, seria fácil aceitar indevidamente x=−3."
      },
      remember:"Em equações logarítmicas: condições primeiro, álgebra depois, verificação no fim.",
      pitfalls:["Aplicar logaritmos sem garantir que os valores envolvidos permitem essa operação no conjunto dos reais.","Manter soluções algébricas que não pertencem ao domínio da equação original."]
    }
  ]
};

export function mathExpLogReviewContentFor(themeId){
  return themeId==="12-expl"?EXPONENTIAL_LOGARITHMIC_REVIEW:null;
}
