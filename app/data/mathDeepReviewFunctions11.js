export const MATH_FUNCTIONS_11_REVIEW_VERSION="2026.10-wave11";

export const FUNCTIONS_11_REVIEW={
  id:"11-fun",
  title:"Funções",
  lead:"Neste capítulo vais aprofundar funções polinomiais e racionais sem antecipar o cálculo diferencial que pertence ao tema seguinte. O objetivo é ler gráficos e expressões em conjunto: perceber o comportamento de cúbicas e quárticas, trabalhar a divisão e a fatorização de polinómios, resolver equações e inequações, operar com funções e interpretar funções racionais, os seus domínios e as suas assíntotas.",
  goals:[
    "Estudar zeros, sinal, monotonia, extremos e comportamento no infinito de funções cúbicas e quárticas com apoio crítico da tecnologia gráfica.",
    "Usar divisão euclidiana, Ruffini/Horner, Teorema do Resto, multiplicidade e fatorização para compreender e resolver problemas com polinómios.",
    "Caracterizar soma, diferença, produto e quociente de funções, determinando corretamente domínios, zeros e sinal em casos adequados.",
    "Reconhecer e modelar funções racionais, identificando assíntotas verticais e horizontais e distinguindo conclusões analíticas de simples observações gráficas."
  ],
  sourceBasis:[
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 11.º ano · março de 2026 · Funções",
    "DGE · Coletânea de tarefas das turmas piloto · Funções · Matemática A 11.º ano"
  ],
  sections:[
    {
      id:"11-fun-cubicas-quarticas",
      kicker:"1 · FUNÇÕES CÚBICAS E QUÁRTICAS",
      title:"O termo de maior grau domina o comportamento no infinito",
      paragraphs:[
        "Uma função polinomial cúbica tem grau 3 e uma quártica tem grau 4. O gráfico pode apresentar vários zeros e mudanças de monotonia, mas o comportamento quando |x| cresce é comandado pelo termo de maior grau. Os termos de grau inferior tornam-se relativamente menos importantes à medida que x se afasta da origem.",
        "Num polinómio de grau ímpar, os dois extremos do gráfico têm comportamentos opostos: um sobe e o outro desce. Como uma função polinomial é contínua, existe sempre pelo menos um zero real. Isto não significa que uma cúbica tenha sempre três zeros reais distintos; pode ter apenas um.",
        "Numa quártica, os dois extremos apontam no mesmo sentido, determinado pelo sinal do coeficiente do termo de grau 4. Uma função de grau par pode ter zero, um ou vários zeros reais, contando valores distintos, e o gráfico ajuda a formular hipóteses sobre zeros, extremos e monotonia.",
        "A tecnologia gráfica é muito útil para explorar famílias e escolher janelas adequadas, mas um gráfico não deve ser usado como prova de que um zero é exatamente um certo número nem de que não existem outros zeros fora da janela observada."
      ],
      formulas:[
        "p(x)=a_nx^n+…+a_1x+a_0, com a_n≠0",
        "|x| grande ⇒ o comportamento de p(x) é dominado por a_nx^n",
        "grau ímpar ⇒ existe pelo menos um zero real",
        "grau par: os dois ramos no infinito têm o mesmo sentido; grau ímpar: sentidos opostos"
      ],
      example:{
        title:"Exemplo resolvido · comportamento de p(x)=−2x⁴+3x²+5",
        steps:[
          "O termo de maior grau é −2x⁴: o grau é par e o coeficiente principal é negativo.",
          "Quando x→+∞, −2x⁴ domina os restantes termos e p(x)→−∞.",
          "Quando x→−∞, x⁴ continua positivo e também p(x)→−∞.",
          "Logo os dois extremos do gráfico descem. Isto não determina sozinho quantos zeros existem; para isso é necessário estudar a expressão ou o gráfico com mais informação."
        ],
        result:"p(x) tende para −∞ nos dois sentidos do infinito.",
        note:"O comportamento no infinito depende do grau e do coeficiente principal, não do termo constante nem do maior coeficiente em valor absoluto."
      },
      remember:"Para antecipar o comportamento no infinito de um polinómio, olha primeiro para o grau e para o sinal do coeficiente do termo de maior grau.",
      pitfalls:[
        "Concluir que uma cúbica tem necessariamente três zeros reais porque o seu grau é 3.",
        "Considerar que a janela da calculadora mostra todo o gráfico e usar a ausência visual de interseções como prova de que não existem outros zeros."
      ]
    },
    {
      id:"11-fun-divisao-polinomios",
      kicker:"2 · DIVISÃO EUCLIDIANA, RUFFINI E HORNER",
      title:"Dividir polinómios com a mesma lógica de quociente e resto",
      paragraphs:[
        "Na divisão euclidiana de polinómios, um dividendo P pode escrever-se como P(x)=D(x)Q(x)+R(x), em que o resto tem grau inferior ao divisor. Esta identidade permite verificar uma divisão e compreender por que o resto contém toda a informação que sobra após retirar múltiplos do divisor.",
        "Quando o divisor é da forma x−a, a regra de Ruffini/algoritmo de Horner organiza os coeficientes para obter rapidamente o quociente e o resto. O processo usa todos os coeficientes, incluindo zeros correspondentes a graus ausentes no polinómio.",
        "Horner também fornece uma forma eficiente de avaliar um polinómio num ponto, reduzindo a expressão a uma sequência de multiplicações e adições. A técnica é algorítmica, mas deve ser ligada à identidade da divisão para não se transformar numa tabela feita mecanicamente."
      ],
      formulas:[
        "P(x)=D(x)Q(x)+R(x)",
        "grau R < grau D, quando R≠0",
        "D(x)=x−a ⇒ R é constante",
        "P(x)=(x−a)Q(x)+R"
      ],
      example:{
        title:"Exemplo resolvido · dividir P(x)=2x³−3x²+4x−5 por x−2",
        steps:[
          "Usa os coeficientes 2, −3, 4, −5 e o valor a=2.",
          "Baixa 2; multiplica por 2 e soma ao coeficiente seguinte: −3+4=1.",
          "Multiplica 1 por 2 e soma: 4+2=6; multiplica 6 por 2 e soma: −5+12=7.",
          "Os coeficientes 2,1,6 definem Q(x)=2x²+x+6 e o último valor é o resto 7."
        ],
        result:"P(x)=(x−2)(2x²+x+6)+7.",
        note:"Se faltasse, por exemplo, o termo em x², teria de entrar um coeficiente 0 na tabela de Ruffini."
      },
      remember:"Ruffini é uma forma compacta de executar a divisão por x−a; o resultado continua a obedecer a P=DQ+R.",
      pitfalls:[
        "Omitir um coeficiente zero correspondente a um grau que não aparece escrito no polinómio.",
        "Aplicar diretamente a tabela de Ruffini a um divisor que não está na forma x−a sem fazer a adaptação algébrica necessária."
      ]
    },
    {
      id:"11-fun-resto-raizes",
      kicker:"3 · TEOREMA DO RESTO, RAÍZES, MULTIPLICIDADE E FATORIZAÇÃO",
      title:"Os zeros transformam-se em fatores — e os fatores explicam o sinal",
      paragraphs:[
        "O Teorema do Resto liga avaliação e divisão: o resto da divisão de P(x) por x−a é P(a). Assim, P(a)=0 se e só se x−a é fator de P. Esta equivalência permite testar candidatos a raízes e decompor progressivamente um polinómio.",
        "Uma raiz a tem multiplicidade m quando (x−a)^m divide P, mas (x−a)^(m+1) já não divide. Uma raiz de multiplicidade par não provoca mudança de sinal do fator ao atravessar a; uma raiz de multiplicidade ímpar provoca, desde que os restantes fatores não alterem simultaneamente o raciocínio local.",
        "A fatorização em fatores lineares e quadráticos permite construir tabelas de sinal e resolver equações e inequações polinomiais de grau superior a 2. Em vez de testar pontos ao acaso em toda a reta, identificam-se zeros, ordenam-se e analisa-se o sinal dos fatores em cada intervalo.",
        "A existência de fórmulas resolventes gerais para os graus 3 e 4 não significa que sejam o método central deste tema. Nas AE, o foco está na estrutura, fatorização, tecnologia, Teorema do Resto e resolução de problemas adequados."
      ],
      formulas:[
        "resto de P(x)÷(x−a)=P(a)",
        "P(a)=0 ⇔ (x−a) é fator de P(x)",
        "a raiz de multiplicidade m ⇔ (x−a)^m|P e (x−a)^(m+1)∤P",
        "P(x)=a_n∏ fatores ⇒ sinal de P resulta do sinal conjunto dos fatores"
      ],
      example:{
        title:"Exemplo resolvido · resolver x³−4x²+x+6≥0",
        steps:[
          "Testa x=2: P(2)=8−16+2+6=0, portanto x−2 é fator.",
          "A divisão dá P(x)=(x−2)(x²−2x−3)=(x−2)(x−3)(x+1).",
          "Os zeros são −1, 2 e 3. Como são simples, o sinal muda em cada um.",
          "Com coeficiente principal positivo, P é positivo em ]3,+∞[; alternando o sinal obtém-se P≥0 em [−1,2]∪[3,+∞[."
        ],
        result:"S={x∈ℝ: −1≤x≤2 ou x≥3}.",
        note:"Nos zeros usa-se intervalo fechado porque a inequação é ≥0. Para >0, esses pontos seriam excluídos."
      },
      remember:"Teorema do Resto encontra fatores; os fatores revelam zeros, multiplicidades e sinal.",
      pitfalls:[
        "Confundir P(a)=0 com dizer que x+a é fator; o fator associado à raiz a é x−a.",
        "Assumir que o sinal muda em todas as raízes sem atender à multiplicidade."
      ]
    },
    {
      id:"11-fun-operacoes",
      kicker:"4 · OPERAÇÕES COM FUNÇÕES",
      title:"A expressão nova herda restrições das funções que a constroem",
      paragraphs:[
        "Dadas duas funções f e g, podemos formar f+g, f−g, fg e f/g. Para soma, diferença e produto, um valor x só pode ser usado quando pertence simultaneamente aos domínios de f e g. No quociente existe uma condição adicional: g(x) não pode ser zero.",
        "Zeros e sinal de uma função resultante podem ser estudados a partir da expressão obtida e da informação sobre as funções de origem. Num produto, por exemplo, os zeros provêm dos fatores; num quociente, zeros do numerador podem ser zeros da função, mas zeros do denominador são sempre excluídos do domínio.",
        "Em modelação, as operações têm significado. Somar funções pode representar a junção de dois custos; dividir uma função de custo pelo número de unidades pode originar um custo médio. A expressão algébrica deve manter as restrições do contexto mesmo quando uma simplificação formal parece permitir mais valores."
      ],
      formulas:[
        "D_(f±g)=D_f∩D_g",
        "D_(fg)=D_f∩D_g",
        "D_(f/g)={x∈D_f∩D_g : g(x)≠0}",
        "(fg)(x)=f(x)g(x); (f/g)(x)=f(x)/g(x)"
      ],
      example:{
        title:"Exemplo resolvido · domínio e zeros de h(x)=(x²−4)/(x−2)",
        steps:[
          "A expressão nasce de um quociente, por isso x=2 fica excluído do domínio.",
          "Fatoriza o numerador: x²−4=(x−2)(x+2). Para x≠2, h(x)=x+2.",
          "O zero da expressão simplificada é x=−2 e este valor pertence ao domínio original.",
          "Apesar de h(x)=x+2 para os valores admissíveis, h(2) não existe; a simplificação não recupera o ponto excluído."
        ],
        result:"D_h=ℝ\\{2} e o único zero é x=−2.",
        note:"A expressão simplificada descreve os mesmos valores onde a função original está definida, mas não altera retroativamente o domínio."
      },
      remember:"Nas operações, determina o domínio antes de simplificar. As restrições pertencem à função, não apenas à aparência final da fórmula.",
      pitfalls:[
        "Cancelar fatores num quociente e voltar a incluir um valor que estava excluído pelo denominador original.",
        "Procurar zeros de um quociente anulando também o denominador; um zero do denominador não é zero da função — é um ponto fora do domínio."
      ]
    },
    {
      id:"11-fun-racionais",
      kicker:"5 · FUNÇÕES RACIONAIS DO TIPO a+b/(x−c)",
      title:"Uma hipérbole deslocada torna domínio, sinal e assíntotas visíveis",
      paragraphs:[
        "A função f(x)=a+b/(x−c), com b≠0, pode ser entendida a partir de y=1/x por transformações do gráfico. O valor c desloca a estrutura horizontalmente e a desloca-a verticalmente; o fator b altera escala e orientação dos ramos.",
        "O ponto x=c está excluído do domínio. Quando x se aproxima de c pelos dois lados, o termo b/(x−c) cresce em módulo, com sinais que dependem de b e do lado da aproximação. Quando |x| cresce, b/(x−c) aproxima-se de zero e f(x) aproxima-se de a.",
        "As interseções com os eixos exigem contas simples mas informativas: f(0), quando 0 pertence ao domínio, dá a ordenada na origem; para encontrar o zero resolve-se a+b/(x−c)=0. O sinal pode então ser estudado tendo em conta o zero e o ponto excluído x=c.",
        "Em problemas de modelação, o domínio matemático pode ter de ser ainda restringido pelo contexto — por exemplo, a variável pode representar distância, tempo ou quantidade e só admitir valores positivos."
      ],
      formulas:[
        "f(x)=a+b/(x−c), b≠0",
        "D_f=ℝ\\{c}",
        "x=c é assíntota vertical; y=a é assíntota horizontal",
        "f(x)=0 ⇔ a(x−c)+b=0, com x≠c"
      ],
      example:{
        title:"Exemplo resolvido · estudar f(x)=2−6/(x−3)",
        steps:[
          "O domínio exclui x=3, portanto D_f=ℝ\\{3}.",
          "A estrutura mostra imediatamente as assíntotas x=3 e y=2.",
          "Para o zero: 2−6/(x−3)=0 ⇒ 2(x−3)=6 ⇒ x=6.",
          "Para a ordenada na origem: f(0)=2−6/(−3)=4. Assim o gráfico passa por (0,4)."
        ],
        result:"D_f=ℝ\\{3}; zero em x=6; interseção com Oy em (0,4); assíntotas x=3 e y=2.",
        note:"A assíntota horizontal descreve uma aproximação: o gráfico pode cruzá-la noutras funções racionais; 'assíntota' não significa automaticamente 'reta proibida'."
      },
      remember:"Em a+b/(x−c), lê diretamente o centro da estrutura: x=c separa os ramos e y=a descreve o nível para o qual a função tende no infinito.",
      pitfalls:[
        "Trocar o sinal de c e dizer que x=−c é a assíntota vertical quando o denominador é x−c.",
        "Confundir aproximar-se de y=a quando |x| cresce com afirmar que a função toma obrigatoriamente o valor a."
      ]
    },
    {
      id:"11-fun-assintotas-modelacao",
      kicker:"6 · ASSÍNTOTAS E MODELAÇÃO COM FUNÇÕES RACIONAIS",
      title:"Uma assíntota descreve comportamento, não apenas uma linha desenhada pela calculadora",
      paragraphs:[
        "Nas AE atuais do 11.º ano, o estudo analítico centra-se nas assíntotas verticais e horizontais das funções racionais trabalhadas neste tema, em particular quocientes de funções afins. Uma assíntota vertical surge quando a função cresce sem limite em módulo ao aproximar-se de um certo valor excluído; uma assíntota horizontal descreve o valor para o qual a função se aproxima no infinito.",
        "Num quociente de funções afins (mx+n)/(px+q), com p≠0, o valor que anula px+q é candidato a assíntota vertical, mas uma simplificação por fator comum deve ser verificada antes de concluir. Para |x| grande, se numerador e denominador têm ambos grau 1, a razão dos coeficientes de x determina a assíntota horizontal.",
        "Modelos racionais aparecem em custos médios, concentrações, intensidade em função da distância e relações geométricas. A interpretação deve respeitar unidades, domínio contextual e significado das assíntotas: uma reta assintótica pode representar um limite operacional ou uma fronteira matemática sem ser um valor efetivamente atingido.",
        "A calculadora pode sugerir assíntotas, mas a janela pode esconder comportamento importante. No 11.º ano, a análise algébrica deve sustentar as assíntotas verticais e horizontais previstas no currículo; assíntotas oblíquas pertencem a um aprofundamento diferente e não são aqui impostas como núcleo desta wave."
      ],
      formulas:[
        "g(x)=(mx+n)/(px+q), p≠0",
        "px+q=0 ⇒ x=−q/p é candidato a assíntota vertical, salvo cancelamento que remova o comportamento infinito",
        "m,p≠0 ⇒ y=m/p é assíntota horizontal de (mx+n)/(px+q)",
        "assíntota horizontal y=L ⇔ f(x) aproxima-se de L quando x→+∞ e/ou x→−∞"
      ],
      example:{
        title:"Exemplo resolvido · assíntotas e interpretação de C(x)=(12x+50)/(x+5)",
        steps:[
          "O denominador anula-se em x=−5 e não existe fator comum que se cancele com o numerador; x=−5 é a assíntota vertical matemática.",
          "Numerador e denominador têm grau 1; a razão dos coeficientes principais é 12/1=12, logo y=12 é assíntota horizontal.",
          "Também se pode escrever C(x)=12−10/(x+5), tornando o comportamento imediatamente visível.",
          "Se x representar uma quantidade produzida, o domínio contextual pode ser x≥0. Nesse contexto, a assíntota vertical x=−5 não é atingível fisicamente, embora faça parte da estrutura matemática da função."
        ],
        result:"As assíntotas matemáticas são x=−5 e y=12; num modelo com x≥0, y=12 continua a descrever o comportamento para grandes quantidades.",
        note:"Distinguir domínio matemático de domínio contextual evita atribuir significado real a valores que o problema nunca admite."
      },
      remember:"Para justificar assíntotas, usa a estrutura algébrica e o comportamento da função; o gráfico é apoio, não substituto da argumentação.",
      pitfalls:[
        "Declarar automaticamente uma assíntota vertical em todo zero do denominador sem verificar se houve cancelamento de um fator comum.",
        "Incluir assíntotas oblíquas como exigência central desta matéria do 11.º ano apesar de as AE de março de 2026 focarem aqui as verticais e horizontais."
      ]
    }
  ]
};

export function mathFunctions11ReviewContentFor(themeId){
  return themeId==="11-fun"?FUNCTIONS_11_REVIEW:null;
}
