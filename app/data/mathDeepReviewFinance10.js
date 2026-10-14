export const MATH_FINANCE_10_REVIEW_VERSION="2026.10-wave14";

export const FINANCE_10_REVIEW={
  id:"10-fin",
  title:"Modelos matemáticos em finanças",
  lead:"Este capítulo liga matemática a decisões financeiras do dia a dia. Vais comparar salários em bases diferentes, decompor um recibo entre bruto e líquido, interpretar retenção e IRS progressivo e distinguir juro simples de capitalização composta. As taxas fiscais reais mudam com o tempo; por isso, o objetivo é dominar o mecanismo matemático e saber trabalhar corretamente com os dados ou tabelas fornecidos.",
  goals:[
    "Converter salários mensal, anual e horário respeitando as condições concretas do contrato.",
    "Distinguir salário bruto de líquido e calcular descontos percentuais e retenções quando as taxas são fornecidas.",
    "Interpretar escalões progressivos em casos simples sem aplicar a taxa marginal máxima a todo o rendimento.",
    "Calcular juro simples e capital final, mantendo compatíveis a taxa e a unidade de tempo.",
    "Modelar capitalização composta com diferentes periodicidades e resolver problemas de poupança/crédito sem antecipar ferramentas fora do 10.º ano."
  ],
  sourceBasis:[
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 10.º ano · março de 2026 · Modelos Matemáticos em finanças",
    "DGE · recursos e tarefas de Matemática A · 10.º ano · matemática financeira e cidadania"
  ],
  sections:[
    {
      id:"10-fin-salarios",
      kicker:"1 · SALÁRIO MENSAL, ANUAL E VALOR-HORA",
      title:"Só se podem comparar salários depois de os colocar na mesma base",
      paragraphs:[
        "Um salário pode ser apresentado por mês, por ano ou por hora. Converter corretamente exige ler as condições do contrato: número de pagamentos anuais, horas semanais, semanas efetivamente consideradas e eventuais componentes adicionais. Não existe uma regra universal que permita multiplicar sempre o salário mensal pelo mesmo número sem conhecer o enunciado.",
        "O rendimento anual obtém-se somando os pagamentos que o contrato prevê. Se o problema indicar p pagamentos iguais de valor M, então o total anual é pM. Para comparar duas propostas com estruturas diferentes, converte ambas para a mesma unidade antes de decidir qual tem maior valor monetário.",
        "O valor-hora deve ser calculado a partir do montante e do número de horas correspondentes àquele período. Se um enunciado fornece rendimento anual e total de horas anuais, divide diretamente um pelo outro; se fornece dados semanais, constrói primeiro uma estimativa coerente com as semanas pagas/trabalhadas indicadas."
      ],
      formulas:[
        "rendimento anual=n.º de pagamentos×valor de cada pagamento, quando os pagamentos são iguais",
        "valor-hora=remuneração do período / horas desse período",
        "comparação válida ⇒ converter propostas para a mesma unidade temporal"
      ],
      example:{
        title:"Exemplo resolvido · comparar duas propostas anuais",
        steps:[
          "Proposta A: 1 300 € em 14 pagamentos. Proposta B: 1 480 € em 12 pagamentos.",
          "A: 1 300×14=18 200 € por ano.",
          "B: 1 480×12=17 760 € por ano.",
          "Apesar de B ter maior valor mensal anunciado, A tem maior total anual neste modelo simplificado."
        ],
        result:"A supera B em 440 € por ano.",
        note:"A comparação considera apenas os valores dados; benefícios, impostos, horas e outras condições teriam de ser incluídos se o problema os fornecesse."
      },
      remember:"Nunca compares apenas números mensais se os contratos tiverem números de pagamentos ou cargas horárias diferentes.",
      pitfalls:[
        "Multiplicar automaticamente qualquer salário mensal por 12 ou por 14 sem ler as condições do contrato.",
        "Comparar um salário bruto anual com um salário líquido mensal como se estivessem na mesma base."
      ]
    },
    {
      id:"10-fin-bruto-liquido",
      kicker:"2 · SALÁRIO BRUTO, SALÁRIO LÍQUIDO E DESCONTOS",
      title:"O líquido resulta do bruto depois dos descontos aplicáveis",
      paragraphs:[
        "O salário bruto é a remuneração antes dos descontos considerados no problema. O salário líquido é o montante que resta depois de subtrair contribuições, retenções e outros descontos aplicáveis e, quando o enunciado o prevê, somar componentes não incluídas no bruto de referência.",
        "Um desconto percentual calcula-se sobre a base indicada. Se uma contribuição tem taxa s sobre um salário bruto B, o desconto é B·s. É essencial converter percentagens para forma decimal e confirmar qual é a base de incidência indicada no exercício.",
        "A retenção na fonte de IRS é um adiantamento/provisão mensal para o imposto anual, não deve ser confundida com o IRS anual definitivo. Para exercícios escolares, usa as taxas ou tabelas fornecidas e não assumes que uma taxa real se mantém válida noutro ano."
      ],
      formulas:[
        "desconto percentual=base×taxa",
        "líquido=bruto+abonos considerados−descontos considerados",
        "taxa de 11%=0,11; taxa de r%=r/100"
      ],
      example:{
        title:"Exemplo resolvido · recibo simplificado com taxas fornecidas",
        steps:[
          "Salário bruto B=1 500 €. O exercício fornece contribuição de 11% e retenção de 8%, ambas sobre B.",
          "Contribuição: 1 500×0,11=165 €.",
          "Retenção: 1 500×0,08=120 €.",
          "No modelo simplificado, líquido=1 500−165−120=1 215 €."
        ],
        result:"Salário líquido simplificado: 1 215 €.",
        note:"As percentagens são dados do exemplo pedagógico; não são uma afirmação sobre a taxa real aplicável a uma pessoa concreta."
      },
      remember:"Primeiro identifica a base de cada desconto; só depois multiplica pela taxa.",
      pitfalls:[
        "Somar percentagens e aplicá-las a uma base diferente da indicada no problema.",
        "Tratar a retenção mensal na fonte como se fosse necessariamente igual ao imposto anual definitivo."
      ]
    },
    {
      id:"10-fin-irs",
      kicker:"3 · IRS, ESCALÕES E PROGRESSIVIDADE",
      title:"Num sistema progressivo, diferentes parcelas podem ser tributadas a taxas diferentes",
      paragraphs:[
        "Em problemas simplificados de IRS progressivo, o rendimento é dividido por escalões. Cada taxa marginal aplica-se à parcela de rendimento que cai no respetivo intervalo, de acordo com a tabela fornecida. A taxa do último escalão atingido não deve ser aplicada automaticamente a todo o rendimento.",
        "Esta estrutura explica a diferença entre taxa marginal e taxa média/efetiva. A taxa marginal corresponde à tributação da parcela adicional no último escalão considerado; a taxa média resulta de dividir o imposto total pelo rendimento de referência do exercício.",
        "As AE também pedem compreender que a retenção mensal tem carácter provisório. Por isso, um exercício sobre retenção e outro sobre imposto anual podem usar tabelas e bases diferentes. O aluno deve seguir os dados do problema em vez de transferir mecanicamente uma taxa de um cálculo para o outro."
      ],
      formulas:[
        "imposto simplificado=Σ(parcela em cada escalão×taxa desse escalão)",
        "taxa média=imposto total / rendimento de referência",
        "taxa marginal≠taxa aplicada a todo o rendimento num modelo progressivo por escalões"
      ],
      example:{
        title:"Exemplo resolvido · tabela progressiva pedagógica",
        steps:[
          "Tabela fictícia do exercício: primeiros 10 000 € a 10%; parcela de 10 000 € a 20 000 € a 20%; parcela acima de 20 000 € a 30%.",
          "Para rendimento de 24 000 €: primeiros 10 000 geram 1 000 €.",
          "Os 10 000 seguintes geram 2 000 €; os 4 000 restantes geram 1 200 €.",
          "Total simplificado=1 000+2 000+1 200=4 200 €."
        ],
        result:"Imposto simplificado=4 200 €; taxa média=4 200/24 000=17,5%, embora a taxa marginal do último escalão seja 30%.",
        note:"A tabela é fictícia e serve apenas para estudar progressividade; numa questão real devem usar-se os dados fornecidos para o período em causa."
      },
      remember:"Entrar num escalão superior não significa aplicar a taxa desse escalão a todo o rendimento.",
      pitfalls:[
        "Calcular 30% de todo o rendimento só porque a última parcela chegou ao escalão de 30%.",
        "Usar uma tabela fiscal memorizada de outro ano em vez da tabela fornecida no problema."
      ]
    },
    {
      id:"10-fin-juro-simples",
      kicker:"4 · JURO SIMPLES",
      title:"O juro de cada período é calculado sempre sobre o capital inicial",
      paragraphs:[
        "No juro simples, o capital que serve de base ao cálculo dos juros mantém-se constante. Se C₀ é o capital inicial, r a taxa por período e n o número de períodos, o juro total é J=C₀rn e o capital final é Cₙ=C₀+J.",
        "Taxa e tempo têm de usar a mesma unidade. Uma taxa anual combina diretamente com tempo em anos; se o problema trabalhar em meses, é necessário converter o tempo ou a taxa segundo a convenção explicitada no exercício.",
        "O crescimento do capital é linear em n: acrescenta-se a mesma quantidade de juro em cada período. Esta característica distingue juro simples de juro composto, em que os juros já acumulados passam também a produzir juros."
      ],
      formulas:[
        "J=C₀·r·n",
        "Cₙ=C₀(1+r·n)",
        "juro por período no regime simples=C₀·r"
      ],
      example:{
        title:"Exemplo resolvido · 2 000 € a 4% ao ano durante 3 anos",
        steps:[
          "C₀=2 000, r=0,04 e n=3.",
          "J=2 000×0,04×3=240 €.",
          "Capital final=2 000+240=2 240 €.",
          "Cada ano acrescenta 80 €, sempre calculados sobre os 2 000 € iniciais."
        ],
        result:"Juro total=240 € e capital final=2 240 €.",
        note:"Não calcules o segundo ano sobre 2 080 €: isso já seria lógica de capitalização composta."
      },
      remember:"Juro simples cresce por adições iguais; a base de cálculo não incorpora os juros anteriores.",
      pitfalls:[
        "Usar 4 em vez de 0,04 numa fórmula cuja taxa é escrita em forma decimal.",
        "Misturar uma taxa anual com um número de meses sem compatibilizar as unidades."
      ]
    },
    {
      id:"10-fin-juro-composto-credito",
      kicker:"5 · JURO COMPOSTO, CAPITALIZAÇÃO E POUPANÇA/CRÉDITO",
      title:"Os juros acumulados passam a fazer parte da base do período seguinte",
      paragraphs:[
        "No juro composto, ao fim de cada período o capital cresce por um fator multiplicativo. Com taxa r por período, Cₙ=C₀(1+r)^n. O crescimento deixa de ser linear porque os juros acumulados passam também a produzir juros.",
        "Quando a capitalização ocorre várias vezes por ano, a taxa e o número de períodos têm de ser ajustados ao modelo fornecido. Num modelo escolar com taxa anual nominal r repartida uniformemente por m capitalizações anuais, usa-se r/m por período e mn períodos ao fim de n anos.",
        "A fórmula pode ser usada em sentido inverso para calcular o capital inicial necessário: C₀=Cₙ/(1+r)^n. Para encontrar um tempo mínimo no 10.º ano, pode testar-se sucessivamente n com calculadora/folha de cálculo até a condição ser satisfeita, sem antecipar logaritmos que pertencem a conteúdo posterior.",
        "Em situações de crédito, distingue montante em dívida, juros e pagamentos. Fórmulas de prestações constantes podem ser estudadas como aprofundamento, mas não devem ser apresentadas como pré-requisito deste núcleo quando as AE centrais pedem juro simples/composto e capitalização."
      ],
      formulas:[
        "Cₙ=C₀(1+r)^n",
        "C₀=Cₙ/(1+r)^n",
        "capitalização m vezes/ano no modelo nominal simples: C=C₀(1+r/m)^(mn)",
        "fator de crescimento por período=1+r"
      ],
      example:{
        title:"Exemplo resolvido · comparar capitalização anual e mensal num modelo fornecido",
        steps:[
          "Capital inicial 3 000 €, taxa anual nominal de 6%, durante 2 anos.",
          "Capitalização anual: C=3 000(1+0,06)^2≈3 370,80 €.",
          "Capitalização mensal no modelo r/12: C=3 000(1+0,06/12)^24≈3 381,48 €.",
          "Com os mesmos dados nominais deste modelo, a capitalização mais frequente produz um capital final ligeiramente maior."
        ],
        result:"Anual ≈3 370,80 €; mensal ≈3 381,48 €.",
        note:"A relação entre taxa nominal e taxa por período deve vir do modelo/enunciado; não dividas qualquer taxa efetiva por 12 sem justificação."
      },
      remember:"No composto, identifica sempre a taxa por período e o número total de períodos antes de aplicar a potência.",
      pitfalls:[
        "Usar C₀(1+rn) num problema de juro composto, confundindo crescimento linear com multiplicativo.",
        "Dividir uma taxa anual por 12 automaticamente sem verificar se o enunciado está a trabalhar com uma taxa nominal repartida ou com outra convenção."
      ]
    }
  ]
};

export function mathFinance10ReviewContentFor(themeId){
  return themeId==="10-fin"?FINANCE_10_REVIEW:null;
}
