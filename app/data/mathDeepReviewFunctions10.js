export const MATH_FUNCTIONS_10_REVIEW_VERSION="2026.10-wave17";

export const FUNCTIONS_10_REVIEW={
  id:"10-fun",
  title:"Funções",
  lead:"Uma função descreve como uma grandeza depende de outra e pode ser representada por diagramas, tabelas, gráficos ou expressões analíticas. Neste capítulo vais consolidar domínio, conjunto de chegada e imagem, estudar zeros e sinal, aprofundar funções afins e quadráticas e terminar com transformações de gráficos, funções definidas por ramos e função módulo. O objetivo é passar com segurança de uma representação para outra e interpretar cada conclusão no contexto do problema.",
  goals:[
    "Reconhecer uma função em diferentes representações e distinguir domínio, conjunto de chegada, contradomínio/imagem, objeto e imagem.",
    "Determinar domínio, imagem, zeros, sinal e interseções com os eixos a partir de tabelas, gráficos ou expressões.",
    "Estudar funções afins em termos de declive, ordenada na origem, zero, sinal e monotonia e usá-las em modelação.",
    "Estudar funções quadráticas: concavidade, eixo de simetria, vértice, zeros, sinal, monotonia e extremos, incluindo equações e inequações do 2.º grau.",
    "Prever transformações do gráfico de x² e estudar funções definidas por ramos, reconhecendo |x| como um caso particular."
  ],
  sourceBasis:[
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 10.º ano · março de 2026 · Funções",
    "DGE · recursos e tarefas de Matemática A · 10.º ano · Funções"
  ],
  sections:[
    {
      id:"10-fun-conceito-representacoes",
      kicker:"1 · CONCEITO DE FUNÇÃO E REPRESENTAÇÕES",
      title:"A mesma dependência pode ser vista numa tabela, num gráfico ou numa expressão",
      paragraphs:[
        "Uma função associa a cada objeto x do domínio exatamente uma imagem. O mesmo objeto não pode ter duas imagens diferentes na mesma função, embora objetos diferentes possam ter a mesma imagem.",
        "Uma função pode ser apresentada por diagrama, tabela, gráfico ou expressão analítica. Saber mudar de representação é parte do conceito: uma tabela destaca valores discretos observados, um gráfico evidencia comportamento global e uma expressão permite calcular e justificar propriedades.",
        "O domínio reúne os objetos admissíveis. O conjunto de chegada é o conjunto declarado como destino; a imagem (ou contradomínio no uso adotado pelas AE) reúne os valores que a função efetivamente assume. Em modelação, o domínio matemático pode ainda ser restringido pelo contexto."
      ],
      formulas:[
        "f:D→C, x↦f(x)",
        "cada x∈D tem exatamente uma imagem f(x)",
        "Im(f)={f(x):x∈D}⊆C",
        "x=variável independente; f(x)=variável dependente"
      ],
      example:{
        title:"Exemplo resolvido · passar de uma expressão a uma tabela",
        steps:[
          "Considera f(x)=2x+1 para x∈{−1,0,1,2}.",
          "Calcula f(−1)=−1, f(0)=1, f(1)=3 e f(2)=5.",
          "A tabela tem pares (−1,−1), (0,1), (1,3), (2,5).",
          "A imagem é {−1,1,3,5}; nenhum objeto do domínio ficou sem uma única imagem."
        ],
        result:"D_f={−1,0,1,2} e Im(f)={−1,1,3,5}.",
        note:"Uma expressão só ganha significado funcional completo quando o domínio relevante também é conhecido."
      },
      remember:"Função significa uma imagem por objeto; a representação pode mudar, mas essa regra não muda.",
      pitfalls:[
        "Confundir conjunto de chegada com o conjunto de valores efetivamente atingidos pela função.",
        "Olhar apenas para a fórmula e ignorar restrições do domínio dadas pelo contexto."
      ]
    },
    {
      id:"10-fun-dominio-imagem-zeros",
      kicker:"2 · DOMÍNIO, IMAGEM, ZEROS E SINAL",
      title:"Ler um gráfico é responder a perguntas sobre x e sobre f(x)",
      paragraphs:[
        "O domínio responde ‘para que valores de x existe função?’. A imagem responde ‘que valores de y são efetivamente atingidos?’. Num gráfico, o domínio pode ser lido pela projeção sobre o eixo Ox e a imagem pela projeção sobre Oy, respeitando pontos abertos, fechados e interrupções.",
        "Um zero é um objeto x para o qual f(x)=0; graficamente corresponde a uma interseção com o eixo Ox. A interseção com Oy, quando x=0 pertence ao domínio, é o ponto (0,f(0)). Não confundas o zero da função com o valor f(0).",
        "Estudar o sinal significa localizar onde f(x)>0, f(x)=0 ou f(x)<0. No gráfico, valores positivos ficam acima de Ox e negativos abaixo. Em expressões fatorizadas, os zeros ajudam a dividir a reta em intervalos onde o sinal pode ser analisado."
      ],
      formulas:[
        "zero a ⇔ f(a)=0",
        "interseção com Oy=(0,f(0)), se 0∈D_f",
        "f(x)>0 ⇔ gráfico acima de Ox",
        "f(x)<0 ⇔ gráfico abaixo de Ox"
      ],
      example:{
        title:"Exemplo resolvido · domínio, imagem e sinal a partir de f(x)=x²−4 em [−3,3]",
        steps:[
          "O domínio foi dado: D_f=[−3,3].",
          "Os zeros resolvem x²−4=0, logo x=−2 e x=2.",
          "A função é negativa entre os zeros e positiva fora deles no domínio: f<0 em ]−2,2[ e f>0 em [−3,−2[∪]2,3].",
          "O mínimo é f(0)=−4 e o máximo no domínio ocorre em ±3, com valor 5; logo Im(f)=[−4,5]."
        ],
        result:"D_f=[−3,3], Im(f)=[−4,5], zeros −2 e 2.",
        note:"A imagem depende do domínio: a mesma expressão em ℝ teria imagem [−4,+∞[."
      },
      remember:"Domínio é sobre objetos; imagem é sobre valores; zeros são objetos que produzem imagem zero.",
      pitfalls:[
        "Chamar ‘zero’ da função ao valor f(0).",
        "Determinar a imagem da expressão como se o domínio fosse sempre ℝ, ignorando um domínio restrito."
      ]
    },
    {
      id:"10-fun-afim",
      kicker:"3 · FUNÇÃO AFIM",
      title:"Declive e ordenada na origem controlam toda a reta",
      paragraphs:[
        "Uma função afim tem expressão f(x)=mx+b. O número m é o declive: mede a variação de f quando x aumenta uma unidade. O valor b=f(0) é a ordenada na origem e determina a interseção com Oy.",
        "Se m>0, a função é estritamente crescente; se m<0, é estritamente decrescente; se m=0, é constante. Quando m≠0, o zero resolve mx+b=0, isto é, x=−b/m, e permite organizar o estudo do sinal.",
        "Em modelação, m representa uma taxa constante e b um valor inicial. A interpretação deve manter unidades: numa tarifa com custo fixo e custo por quilómetro, b pode representar o custo de partida e m o custo adicional por quilómetro."
      ],
      formulas:[
        "f(x)=mx+b",
        "m=[f(x₂)−f(x₁)]/(x₂−x₁), x₁≠x₂",
        "f(0)=b",
        "m≠0 ⇒ zero x=−b/m"
      ],
      example:{
        title:"Exemplo resolvido · tarifa de transporte",
        steps:[
          "Uma tarifa é C(d)=3+0,80d, com d em km e C em euros.",
          "C(0)=3: há um custo inicial de 3 €.",
          "O declive 0,80 significa que cada quilómetro acrescenta 0,80 €.",
          "Para 12 km: C(12)=3+0,80·12=12,60 €."
        ],
        result:"Uma viagem de 12 km custa 12,60 € no modelo.",
        note:"O declive tem unidades €/km; não é apenas um número abstrato."
      },
      remember:"Numa afim, m diz como varia e b diz onde começa quando x=0.",
      pitfalls:[
        "Trocar declive e ordenada na origem.",
        "Interpretar a expressão fora do domínio contextual, por exemplo usar distância negativa num modelo de viagem."
      ]
    },
    {
      id:"10-fun-quadratica",
      kicker:"4 · FUNÇÃO QUADRÁTICA",
      title:"Concavidade, eixo e vértice organizam o comportamento da parábola",
      paragraphs:[
        "Uma função quadrática tem forma f(x)=ax²+bx+c, com a≠0. Se a>0 a parábola tem concavidade voltada para cima e o vértice é um mínimo; se a<0 a concavidade é voltada para baixo e o vértice é um máximo.",
        "O eixo de simetria é x=−b/(2a). A abcissa do vértice é esse valor e a ordenada obtém-se calculando f nele. Os zeros dependem do discriminante Δ=b²−4ac: Δ>0 dá dois zeros reais distintos, Δ=0 um zero real duplo e Δ<0 nenhum zero real.",
        "Zeros, concavidade e vértice permitem estudar sinal e monotonia e resolver inequações do 2.º grau. A fórmula resolvente encontra candidatos exatos, mas a solução de uma inequação exige voltar a interpretar em que intervalos a parábola está acima ou abaixo do eixo.",
        "Em modelação, o vértice pode representar uma altura máxima, um custo mínimo ou outro extremo. A resposta final deve respeitar o domínio e as unidades do problema, não apenas o resultado algébrico."
      ],
      formulas:[
        "f(x)=ax²+bx+c, a≠0",
        "x_v=−b/(2a); y_v=f(x_v)",
        "Δ=b²−4ac",
        "x=[−b±√Δ]/(2a), quando Δ≥0"
      ],
      example:{
        title:"Exemplo resolvido · estudar f(x)=x²−6x+5",
        steps:[
          "a=1>0, por isso a parábola abre para cima.",
          "Eixo: x=−(−6)/(2·1)=3; vértice: f(3)=9−18+5=−4, logo V=(3,−4).",
          "Fatoriza f(x)=(x−1)(x−5), portanto os zeros são 1 e 5.",
          "Com concavidade para cima, f<0 entre os zeros e f>0 fora deles."
        ],
        result:"V=(3,−4); zeros 1 e 5; mínimo −4; f<0 em ]1,5[.",
        note:"Resolver f=0 não chega para descrever sinal ou monotonia; a forma da parábola completa a análise."
      },
      remember:"Quadrática: começa por a, eixo/vértice e zeros; depois lê sinal, monotonia e extremo como partes da mesma parábola.",
      pitfalls:[
        "Usar x_v=−b/a em vez de −b/(2a).",
        "Resolver uma inequação quadrática e devolver apenas os zeros, sem indicar os intervalos que satisfazem a condição."
      ]
    },
    {
      id:"10-fun-transformacoes-ramos-modulo",
      kicker:"5 · TRANSFORMAÇÕES, FUNÇÕES POR RAMOS E MÓDULO",
      title:"Transformar um gráfico e escolher um ramo exigem ler condições, não decorar desenhos",
      paragraphs:[
        "A partir de f(x)=x², substituir x por x−a desloca o gráfico horizontalmente a unidades para a direita quando a>0; somar b desloca-o verticalmente; multiplicar por c altera a escala vertical e, se c<0, reflete o gráfico relativamente a Ox. Estas regras devem ser ligadas a pontos concretos do gráfico para evitar erros de sinal.",
        "Uma função definida por ramos usa expressões diferentes em partes diferentes do domínio. Para calcular f(x), começa por decidir qual condição contém esse x; só depois usa a expressão desse ramo. O estudo do domínio, imagem, interseções e sinal deve respeitar os extremos abertos/fechados de cada condição.",
        "A função módulo é um caso particular: |x|=x se x≥0 e |x|=−x se x<0. O gráfico é obtido refletindo para cima a parte negativa da reta y=x. Em expressões como |g(x)|, o módulo atua sobre os valores de g e torna-os não negativos, mas não altera automaticamente o domínio de g.",
        "Funções por ramos modelam tarifas por escalões, custos dependentes de intervalos ou movimentos com fases diferentes. A transição entre ramos pode criar saltos ou unir-se sem salto; no 10.º ano a prioridade é ler e construir corretamente o modelo, sem antecipar a teoria formal de continuidade."
      ],
      formulas:[
        "y=(x−a)²+b ⇒ vértice (a,b)",
        "y=c·f(x): |c| escala verticalmente; c<0 acrescenta reflexão em Ox",
        "|x|={x, se x≥0; −x, se x<0}",
        "função por ramos: escolher expressão pela condição que contém x"
      ],
      example:{
        title:"Exemplo resolvido · função por ramos com módulo",
        steps:[
          "Considera f(x)=|x−2|. O interior x−2 muda de sinal em x=2.",
          "Se x≥2, x−2≥0 e f(x)=x−2.",
          "Se x<2, x−2<0 e f(x)=−(x−2)=2−x.",
          "Logo f(x)={2−x, x<2; x−2, x≥2}; o vértice do V está em (2,0)."
        ],
        result:"|x−2| é uma função por ramos com mínimo 0 em x=2.",
        note:"O sinal dentro do módulo decide o ramo; não se distribui o símbolo | | termo a termo."
      },
      remember:"Em transformações, segue pontos; em funções por ramos, segue condições; no módulo, segue o sinal da expressão interior.",
      pitfalls:[
        "Dizer que f(x−a) desloca o gráfico para a esquerda quando a>0; o efeito horizontal tem sinal aparentemente invertido.",
        "Aplicar simultaneamente todos os ramos a um mesmo x ou ignorar se a fronteira usa <, ≤, > ou ≥."
      ]
    }
  ]
};

export function mathFunctions10ReviewContentFor(themeId){
  return themeId==="10-fun"?FUNCTIONS_10_REVIEW:null;
}
