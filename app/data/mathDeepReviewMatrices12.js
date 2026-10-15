export const MATH_MATRICES_12_REVIEW_VERSION="2026.10-wave21";

export const MATRICES_12_REVIEW={
  id:"12-mat",
  title:"Matrizes",
  lead:"Uma matriz organiza números por linhas e colunas e permite representar dados, operações e transformações de forma compacta. Nesta revisão vais dominar a linguagem matricial, as operações elementares, a compatibilidade do produto e a sua não comutatividade, e depois usar matrizes para descrever transformações geométricas e situações de modelação.",
  goals:[
    "Ler a dimensão, localizar elementos e reconhecer matrizes linha, coluna, quadradas, diagonais e identidade.",
    "Efetuar adição, subtração e multiplicação por escalar respeitando as dimensões.",
    "Calcular produtos de matrizes, decidir quando existem e compreender por que AB e BA não são, em geral, iguais nem ambos definidos.",
    "Usar matrizes e vetores-coluna para representar transformações geométricas e organizar modelos simples."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Matemática A · 12.º ano · março de 2026 · Matrizes",
    "DGE/AEM · Recursos do Ensino Secundário · tarefas de Matrizes e transformações geométricas"
  ],
  sections:[
    {
      id:"12-mat-representacao-tipos",
      kicker:"1 · REPRESENTAÇÃO, DIMENSÃO E TIPOS",
      title:"A posição de cada elemento faz parte da informação",
      paragraphs:[
        "Uma matriz A de dimensão m×n tem m linhas e n colunas. O elemento aᵢⱼ encontra-se na linha i e na coluna j; trocar os índices altera, em geral, o elemento referido. Duas matrizes só são iguais quando têm a mesma dimensão e todos os elementos correspondentes são iguais.",
        "Uma matriz com uma única linha chama-se matriz linha e uma matriz com uma única coluna chama-se matriz coluna. Uma matriz é quadrada quando tem o mesmo número de linhas e colunas; numa matriz quadrada distinguem-se a diagonal principal e tipos especiais como matrizes diagonais e a matriz identidade.",
        "A matriz identidade I funciona, no produto matricial compatível, como o número 1 na multiplicação: IA=A e AI=A. O tamanho da identidade deve, porém, ser adequado à dimensão de A; não existe uma identidade única que sirva indiscriminadamente para qualquer produto."
      ],
      formulas:[
        "A=[aᵢⱼ]_(m×n) ⇒ A tem m linhas e n colunas",
        "A=B ⇔ mesma dimensão e aᵢⱼ=bᵢⱼ para todos i,j",
        "Iₙ=diag(1,1,…,1)",
        "IₘA=A e AIₙ=A, se A é m×n"
      ],
      example:{
        title:"Exemplo resolvido · ler dimensão e elementos",
        steps:[
          "Considera A=[[2,−1,4],[0,3,5]], que tem 2 linhas e 3 colunas.",
          "Logo A é uma matriz 2×3 e não é quadrada.",
          "O elemento a₁₃ é 4: primeira linha, terceira coluna.",
          "O elemento a₂₂ é 3: segunda linha, segunda coluna."
        ],
        result:"A tem dimensão 2×3, a₁₃=4 e a₂₂=3.",
        note:"A ordem é sempre linha primeiro, coluna depois."
      },
      remember:"A dimensão m×n e a posição (i,j) são parte essencial da linguagem matricial.",
      pitfalls:[
        "Ler m×n como n linhas e m colunas.",
        "Confundir aᵢⱼ com aⱼᵢ ou chamar quadrada a uma matriz apenas por ter poucos elementos."
      ]
    },
    {
      id:"12-mat-adicao-escalar",
      kicker:"2 · ADIÇÃO, SUBTRAÇÃO E PRODUTO POR ESCALAR",
      title:"Operações elemento a elemento exigem a mesma forma",
      paragraphs:[
        "A soma e a diferença de matrizes são feitas elemento a elemento e só estão definidas quando as matrizes têm exatamente a mesma dimensão. O resultado conserva essa dimensão.",
        "Multiplicar uma matriz por um número real k significa multiplicar todos os seus elementos por k. Ao contrário da soma entre matrizes, esta operação não exige comparar dimensões com outra matriz.",
        "As propriedades algébricas familiares continuam válidas para estas operações: a adição é comutativa e associativa, existe a matriz nula para cada dimensão e a multiplicação por escalar distribui-se sobre a soma."
      ],
      formulas:[
        "A+B=[aᵢⱼ+bᵢⱼ], apenas se A e B têm a mesma dimensão",
        "A−B=[aᵢⱼ−bᵢⱼ]",
        "kA=[k aᵢⱼ]",
        "k(A+B)=kA+kB"
      ],
      example:{
        title:"Exemplo resolvido · combinar duas matrizes",
        steps:[
          "Se A=[[1,2],[−1,3]] e B=[[4,−2],[5,0]], as duas matrizes são 2×2.",
          "A+B=[[1+4,2−2],[−1+5,3+0]]=[[5,0],[4,3]].",
          "2A=[[2,4],[−2,6]].",
          "Como as dimensões coincidem, a soma está definida; se B fosse 2×3, A+B não existiria."
        ],
        result:"A+B=[[5,0],[4,3]] e 2A=[[2,4],[−2,6]].",
        note:"Nunca se completa uma matriz com zeros só para tornar uma soma possível, salvo se isso fizer parte explícita do modelo."
      },
      remember:"Somar ou subtrair matrizes exige dimensões iguais; multiplicar por escalar atua em todos os elementos.",
      pitfalls:[
        "Somar matrizes de dimensões diferentes porque têm o mesmo número total de elementos.",
        "Multiplicar apenas uma linha ou uma coluna pelo escalar em vez da matriz toda."
      ]
    },
    {
      id:"12-mat-produto",
      kicker:"3 · PRODUTO DE MATRIZES",
      title:"Linhas da primeira encontram colunas da segunda",
      paragraphs:[
        "Se A é m×n e B é n×p, o produto AB está definido e tem dimensão m×p. A condição decisiva é a igualdade entre o número de colunas de A e o número de linhas de B: são as dimensões interiores do produto.",
        "Cada elemento de AB resulta do produto escalar da linha correspondente de A pela coluna correspondente de B: multiplicam-se elementos posição a posição e somam-se os produtos. O produto matricial não é uma multiplicação elemento a elemento.",
        "Em geral AB≠BA. Além disso, pode acontecer AB existir e BA nem sequer estar definido. A ordem dos fatores transporta significado e não pode ser trocada por conveniência. A identidade é exceção estruturada: quando as dimensões são compatíveis, AI=A e IA=A."
      ],
      formulas:[
        "A_(m×n) B_(n×p) ⇒ AB é m×p",
        "(AB)ᵢⱼ=Σₖ aᵢₖbₖⱼ",
        "em geral, AB≠BA",
        "A Iₙ=A e Iₘ A=A, para A m×n"
      ],
      example:{
        title:"Exemplo resolvido · produto e ordem",
        steps:[
          "Se A=[[1,2],[0,1]] e B=[[3,0],[4,−1]], ambos são 2×2.",
          "AB=[[1·3+2·4,1·0+2·(−1)],[0·3+1·4,0·0+1·(−1)]]=[[11,−2],[4,−1]].",
          "BA=[[3·1+0·0,3·2+0·1],[4·1+(−1)·0,4·2+(−1)·1]]=[[3,6],[4,7]].",
          "Os dois produtos existem, mas AB≠BA."
        ],
        result:"AB=[[11,−2],[4,−1]] e BA=[[3,6],[4,7]].",
        note:"A não comutatividade não é uma exceção rara; é uma característica central do produto matricial."
      },
      remember:"Confirma primeiro as dimensões; depois multiplica linha por coluna; nunca troques a ordem sem justificar.",
      pitfalls:[
        "Decidir que AB existe porque A e B têm o mesmo número de elementos.",
        "Calcular AB multiplicando entradas correspondentes ou assumir AB=BA."
      ]
    },
    {
      id:"12-mat-transformacoes",
      kicker:"4 · TRANSFORMAÇÕES GEOMÉTRICAS",
      title:"Matrizes transformam vetores-coluna de forma sistemática",
      paragraphs:[
        "Um ponto ou vetor do plano pode ser representado por uma matriz coluna X=[[x],[y]]. Uma transformação linear pode então ser escrita X'=AX. A matriz A codifica como as coordenadas são combinadas e permite aplicar a mesma regra a todos os pontos de uma figura.",
        "Escalas, simetrias, rotações em torno da origem e cisalhamentos podem ser descritos por matrizes 2×2. Uma translação não é, em coordenadas cartesianas 2D usuais, uma transformação da forma AX; representa-se neste nível adicionando uma matriz coluna de deslocamento: X'=X+v.",
        "Compor duas transformações lineares corresponde a multiplicar as respetivas matrizes na ordem correta. Se primeiro se aplica A e depois B, obtém-se X''=B(AX)=(BA)X. A não comutatividade explica por que trocar a ordem das transformações pode produzir uma figura diferente."
      ],
      formulas:[
        "escala: [[x'],[y']]=[[sₓ,0],[0,sᵧ]][[x],[y]]",
        "rotação θ: Rθ=[[cosθ,−sinθ],[sinθ,cosθ]]",
        "translação por v: X'=X+v",
        "primeiro A, depois B ⇒ matriz composta BA"
      ],
      example:{
        title:"Exemplo resolvido · rotação de 90° em torno da origem",
        steps:[
          "Para θ=90°, cosθ=0 e sinθ=1, logo R=[[0,−1],[1,0]].",
          "Aplica R ao ponto P=(3,1), escrito X=[[3],[1]].",
          "RX=[[0·3−1·1],[1·3+0·1]]=[[-1],[3]].",
          "O ponto transformado é P'=(-1,3), coerente com uma rotação anti-horária de 90°."
        ],
        result:"R₉₀(3,1)=(-1,3).",
        note:"Verificar geometricamente a transformação ajuda a detetar sinais trocados na matriz de rotação."
      },
      remember:"A ordem da composição é inversa à leitura informal: primeiro A e depois B produz BA.",
      pitfalls:[
        "Tratar uma translação 2D usual como simples produto por uma matriz 2×2.",
        "Escrever AB quando a transformação A acontece primeiro e B depois."
      ]
    },
    {
      id:"12-mat-modelacao",
      kicker:"5 · MODELAÇÃO E APLICAÇÕES",
      title:"A matriz separa a estrutura dos dados da operação que os transforma",
      paragraphs:[
        "As matrizes são úteis quando várias quantidades relacionadas precisam de ser organizadas e transformadas de forma repetível. Linhas e colunas podem representar categorias, períodos, localizações ou componentes, desde que o significado de cada dimensão fique explicitamente definido.",
        "Um produto matricial pode agregar informação. Por exemplo, uma matriz de quantidades por produto e uma matriz coluna de preços unitários podem gerar uma matriz coluna de custos totais por loja. O cálculo só faz sentido se a ordem e as dimensões refletirem corretamente o significado do modelo.",
        "Modelar com matrizes exige interpretar o resultado, não apenas executar contas. As unidades de cada linha e coluna, a dimensão do produto e a coerência do contexto devem ser verificadas. Métodos de Gauss, grafos, PageRank e modelos populacionais podem ser aprofundamentos interessantes, mas não são tratados aqui como núcleo deste tema."
      ],
      formulas:[
        "Q_(m×n) p_(n×1) ⇒ c=Qp é m×1",
        "cᵢ=Σⱼ qᵢⱼ pⱼ",
        "dimensão do resultado = linhas da primeira × colunas da segunda"
      ],
      example:{
        title:"Exemplo resolvido · custos de duas lojas",
        steps:[
          "Duas lojas compram três produtos: Q=[[2,1,4],[1,3,2]], onde cada linha é uma loja e cada coluna um produto.",
          "Os preços são p=[[5],[8],[2]] euros por unidade.",
          "Qp=[[2·5+1·8+4·2],[1·5+3·8+2·2]]=[[26],[33]].",
          "A primeira loja gasta 26 € e a segunda 33 €."
        ],
        result:"O vetor de custos é c=[[26],[33]] euros.",
        note:"A dimensão 2×1 confirma que se obteve um total por cada uma das duas lojas."
      },
      remember:"Num modelo matricial, explica sempre o que representam linhas, colunas e unidades antes de interpretar o produto.",
      pitfalls:[
        "Escolher a ordem das matrizes apenas para conseguir multiplicá-las, ignorando o significado das dimensões.",
        "Apresentar a matriz resultado sem dizer o que cada linha, coluna ou unidade representa."
      ]
    }
  ]
};

export function mathMatrices12ReviewContentFor(themeId){
  return themeId==="12-mat"?MATRICES_12_REVIEW:null;
}
