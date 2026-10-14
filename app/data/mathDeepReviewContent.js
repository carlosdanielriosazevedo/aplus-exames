export const MATH_DEEP_REVIEW_VERSION="2026.10-wave1";

const COMPLEX_NUMBERS={
  id:"12-cplx",
  title:"Números complexos",
  lead:"Os números complexos permitem trabalhar com equações e situações que não têm solução no conjunto dos números reais. Nesta revisão vais estudar a matéria por etapas: primeiro a forma algébrica, depois a interpretação geométrica e, por fim, a forma trigonométrica e as operações em que ela é mais eficiente.",
  goals:[
    "Reconhecer e representar números complexos nas formas algébrica e trigonométrica.",
    "Escolher a representação mais adequada à operação ou ao problema.",
    "Interpretar módulo, argumento, conjugado e operações no plano complexo.",
    "Resolver equações e problemas geométricos simples no conjunto dos números complexos."
  ],
  sourceBasis:[
    "DGE · Novas Aprendizagens Essenciais de Matemática A · 12.º ano · Números complexos",
    "DGE · Estudo Autónomo · recursos de Números complexos do 12.º ano",
    "IAVE/EduQA · Informação-Prova Matemática A 635 · 2026"
  ],
  sections:[
    {
      id:"12-cplx-unidade-equacoes",
      kicker:"1 · UNIDADE IMAGINÁRIA E CONJUNTO ℂ",
      title:"Porque aparecem os números complexos",
      paragraphs:[
        "Nos números reais, uma equação como x² = −1 não tem solução, porque o quadrado de qualquer número real é não negativo. Para ultrapassar esta limitação define-se a unidade imaginária i pela relação i² = −1.",
        "Um número complexo escreve-se na forma z = a + bi, com a e b reais. O conjunto de todos os números desta forma representa-se por ℂ. Os números reais estão incluídos em ℂ: basta tomar b = 0.",
        "Esta extensão permite também resolver equações do 2.º grau com discriminante negativo. Se Δ < 0, usa-se √(−k) = i√k, com k > 0, e continua-se a fórmula resolvente no conjunto ℂ."
      ],
      formulas:[
        "i² = −1",
        "i³ = −i",
        "i⁴ = 1",
        "i^(4q+r) = i^r, com r ∈ {0,1,2,3}",
        "Se Δ < 0: x = (−b ± i√(−Δ)) / (2a)"
      ],
      example:{
        title:"Exemplo resolvido · x² + 4x + 13 = 0",
        steps:[
          "Calcula o discriminante: Δ = 4² − 4×1×13 = 16 − 52 = −36.",
          "Como √(−36) = 6i, aplica a fórmula resolvente.",
          "x = (−4 ± 6i)/2 = −2 ± 3i."
        ],
        result:"Soluções: −2 + 3i e −2 − 3i.",
        note:"O sinal ± continua a representar duas soluções; a diferença é que agora pertencem a ℂ."
      },
      remember:"As potências de i repetem-se de 4 em 4. Antes de calcular uma potência muito elevada, reduz o expoente módulo 4.",
      pitfalls:["Escrever √(−36)=−6 em vez de 6i.","Esquecer que todo o número real também é um número complexo."]
    },
    {
      id:"12-cplx-forma-algebrica",
      kicker:"2 · FORMA ALGÉBRICA",
      title:"Parte real, parte imaginária e igualdade",
      paragraphs:[
        "Na forma algébrica z = a + bi, o número a é a parte real e b é a parte imaginária. Atenção: a parte imaginária é b, não bi.",
        "Dois números complexos são iguais exatamente quando têm a mesma parte real e a mesma parte imaginária. Esta propriedade é muito útil para determinar parâmetros desconhecidos.",
        "Um número é real quando a sua parte imaginária é zero. É imaginário puro quando a parte real é zero e a parte imaginária é diferente de zero."
      ],
      formulas:[
        "z = a + bi ⇒ Re(z)=a e Im(z)=b",
        "a + bi = c + di ⇔ a=c e b=d",
        "z ∈ ℝ ⇔ Im(z)=0"
      ],
      example:{
        title:"Exemplo resolvido · determinar parâmetros",
        steps:[
          "Se (x−1) + (2y+3)i = 4 − 5i, compara partes reais e imaginárias.",
          "Parte real: x−1 = 4 ⇒ x = 5.",
          "Parte imaginária: 2y+3 = −5 ⇒ 2y = −8 ⇒ y = −4."
        ],
        result:"x = 5 e y = −4.",
        note:"Não é preciso fazer nenhuma operação com i: a igualdade de complexos reduz-se a duas igualdades reais."
      },
      remember:"Em exercícios com parâmetros, separa sempre a condição real da condição imaginária.",
      pitfalls:["Confundir Im(a+bi) com bi.","Comparar módulos para decidir se dois complexos são iguais; complexos diferentes podem ter o mesmo módulo."]
    },
    {
      id:"12-cplx-conjugado-modulo",
      kicker:"3 · CONJUGADO E MÓDULO",
      title:"Distância à origem e simetria em relação ao eixo real",
      paragraphs:[
        "O conjugado de z = a + bi obtém-se trocando o sinal da parte imaginária: z̄ = a − bi. Geometricamente, z e z̄ são simétricos em relação ao eixo real.",
        "O módulo |z| mede a distância do afixo de z à origem do plano complexo. Por isso é sempre não negativo e depende das duas componentes de z.",
        "A relação z·z̄ = |z|² é central: permite, por exemplo, transformar uma divisão de complexos numa forma algébrica sem número complexo no denominador."
      ],
      formulas:[
        "Se z=a+bi, então z̄=a−bi",
        "|z| = √(a²+b²)",
        "z·z̄ = |z|² = a²+b²",
        "|z|=0 ⇔ z=0"
      ],
      example:{
        title:"Exemplo resolvido · z = 3 − 4i",
        steps:[
          "Conjugado: z̄ = 3 + 4i.",
          "Módulo: |z| = √(3² + (−4)²) = √25 = 5.",
          "Produto: z·z̄ = (3−4i)(3+4i) = 9 − (4i)² = 9+16 = 25 = |z|²."
        ],
        result:"z̄ = 3+4i e |z| = 5.",
        note:"O módulo é uma distância; nunca pode ser negativo."
      },
      remember:"Quando o problema fala em distância à origem, pensa imediatamente em módulo.",
      pitfalls:["Calcular √(a²−b²) em vez de √(a²+b²).","Trocar os sinais das duas partes ao construir o conjugado; só muda o sinal da parte imaginária."]
    },
    {
      id:"12-cplx-operacoes-algebricas",
      kicker:"4 · OPERAÇÕES NA FORMA ALGÉBRICA",
      title:"Somar, multiplicar e dividir sem perder o significado de i² = −1",
      paragraphs:[
        "A adição e a subtração fazem-se agrupando partes reais e partes imaginárias. Na multiplicação, desenvolve-se como numa expressão algébrica e substitui-se sempre i² por −1.",
        "Na divisão, o objetivo é retirar i do denominador. Multiplica-se numerador e denominador pelo conjugado do denominador; o denominador passa então a ser um número real.",
        "A forma algébrica é normalmente a representação mais eficiente para somas, diferenças e equações que exigem comparação direta das partes real e imaginária."
      ],
      formulas:[
        "(a+bi)+(c+di)=(a+c)+(b+d)i",
        "(a+bi)(c+di)=(ac−bd)+(ad+bc)i",
        "1/(c+di) = (c−di)/(c²+d²), se c+di ≠ 0"
      ],
      example:{
        title:"Exemplo resolvido · (2+3i)/(1−i)",
        steps:[
          "Multiplica numerador e denominador pelo conjugado 1+i.",
          "Numerador: (2+3i)(1+i)=2+2i+3i+3i²=−1+5i.",
          "Denominador: (1−i)(1+i)=1−i²=2.",
          "Divide as duas componentes por 2."
        ],
        result:"(2+3i)/(1−i) = −1/2 + (5/2)i.",
        note:"Usar o conjugado não é um truque arbitrário: explora o facto de (c+di)(c−di)=c²+d² ser real."
      },
      remember:"Depois de multiplicar complexos, procura imediatamente ocorrências de i² e substitui-as por −1.",
      pitfalls:["Tratar i como uma variável qualquer e esquecer i²=−1.","Na divisão, multiplicar apenas o denominador pelo conjugado; tens de multiplicar a fração inteira."]
    },
    {
      id:"12-cplx-argand",
      kicker:"5 · PLANO DE ARGAND-GAUSS",
      title:"Ver um número complexo como um ponto ou vetor",
      paragraphs:[
        "Ao número z = a + bi associa-se o ponto A(a,b), chamado afixo de z. O eixo horizontal representa a parte real e o eixo vertical representa a parte imaginária.",
        "Nesta representação, o módulo |z| é a distância de A à origem. Mais geralmente, |z−w| é a distância entre os afixos de z e w. Esta leitura permite traduzir condições algébricas em lugares geométricos.",
        "Por exemplo, |z−z₀|=r representa uma circunferência de centro no afixo de z₀ e raio r. Uma condição |z−z₁|=|z−z₂| representa os pontos equidistantes de dois afixos: a mediatriz do segmento que os une."
      ],
      formulas:[
        "z=a+bi ↔ A(a,b)",
        "|z| = distância(O,A)",
        "|z−w| = distância(Az,Aw)",
        "|z−z₀|=r ⇔ circunferência de centro z₀ e raio r"
      ],
      example:{
        title:"Exemplo resolvido · |z − (2+i)| = 3",
        steps:[
          "O complexo 2+i tem afixo C(2,1).",
          "A expressão |z−(2+i)| mede a distância do afixo de z ao ponto C.",
          "A condição diz que essa distância é sempre 3."
        ],
        result:"O lugar geométrico é a circunferência de centro (2,1) e raio 3.",
        note:"Antes de desenvolver contas, pergunta se uma expressão com módulos pode ser interpretada como distância."
      },
      remember:"No plano complexo, subtrações dentro de um módulo costumam esconder distâncias.",
      pitfalls:["Trocar as coordenadas: a parte real é a abcissa e a parte imaginária é a ordenada.","Confundir |z−z₀|≤r com a circunferência; com ≤ obténs o disco, incluindo o interior."]
    },
    {
      id:"12-cplx-forma-trig",
      kicker:"6 · FORMA TRIGONOMÉTRICA",
      title:"Módulo e argumento como coordenadas polares",
      paragraphs:[
        "Um complexo não nulo também pode ser descrito pelo seu módulo r e por um argumento θ, isto é, um ângulo orientado que localiza o seu afixo relativamente ao semieixo real positivo.",
        "A forma trigonométrica é z = r(cos θ + i sin θ), com r=|z|>0. Como os ângulos θ+2kπ determinam a mesma direção, um complexo não nulo tem infinitos argumentos que diferem de múltiplos inteiros de 2π.",
        "Para passar da forma algébrica para a trigonométrica, determina primeiro o módulo e depois identifica o quadrante antes de escolher o argumento. Usar apenas a tangente pode conduzir ao quadrante errado."
      ],
      formulas:[
        "z = r(cos θ + i sin θ)",
        "a = r cos θ e b = r sin θ",
        "r = √(a²+b²)",
        "arg(z) = θ + 2kπ, k∈ℤ"
      ],
      example:{
        title:"Exemplo resolvido · z = −1 + √3 i",
        steps:[
          "Módulo: r = √(1+3)=2.",
          "O afixo está no 2.º quadrante, porque a parte real é negativa e a imaginária é positiva.",
          "cos θ = −1/2 e sin θ = √3/2, logo podemos tomar θ=2π/3."
        ],
        result:"z = 2[cos(2π/3) + i sin(2π/3)].",
        note:"O argumento 2π/3 não é único: 2π/3 + 2kπ representa a mesma direção."
      },
      remember:"Módulo primeiro, quadrante depois, ângulo no fim.",
      pitfalls:["Usar arctan(b/a) sem verificar o quadrante.","Escrever a forma trigonométrica com r negativo; por convenção usa-se r>0 para z≠0."]
    },
    {
      id:"12-cplx-operacoes-trig",
      kicker:"7 · PRODUTOS, POTÊNCIAS E RAÍZES",
      title:"Quando a forma trigonométrica simplifica o problema",
      paragraphs:[
        "Na multiplicação de complexos em forma trigonométrica, multiplicam-se os módulos e somam-se os argumentos. Na divisão, dividem-se os módulos e subtraem-se os argumentos. Esta é a razão pela qual a forma trigonométrica é tão útil para produtos e quocientes.",
        "A fórmula de De Moivre permite elevar um complexo a uma potência inteira: eleva-se o módulo e multiplica-se o argumento pelo expoente.",
        "Na radiciação de índice n, uma equação zⁿ=w tem n raízes distintas quando w≠0. Todas têm módulo igual à raiz n-ésima de |w| e os seus argumentos ficam igualmente espaçados de 2π/n no plano complexo."
      ],
      formulas:[
        "r₁ cis α · r₂ cis β = r₁r₂ cis(α+β)",
        "(r₁ cis α)/(r₂ cis β) = (r₁/r₂) cis(α−β), r₂≠0",
        "(r cis θ)ⁿ = rⁿ cis(nθ)",
        "zⁿ = R cis φ ⇒ z_k = R^(1/n) cis((φ+2kπ)/n), k=0,…,n−1"
      ],
      example:{
        title:"Exemplo resolvido · resolver z³ = 8",
        steps:[
          "Escreve 8 em forma trigonométrica: 8 cis(0+2kπ).",
          "O módulo das raízes é ∛8 = 2.",
          "Os argumentos são (0+2kπ)/3 para k=0,1,2: 0, 2π/3 e 4π/3."
        ],
        result:"As raízes são 2, −1+√3 i e −1−√3 i.",
        note:"As três raízes ficam nos vértices de um triângulo equilátero centrado na origem; o espaçamento angular é 2π/3."
      },
      remember:"Numa raiz de índice n de um complexo não nulo, deves obter n soluções distintas.",
      pitfalls:["Dar apenas uma raiz por usar apenas um argumento do número inicial.","Somar argumentos numa soma de complexos; a regra de somar argumentos vale para produtos, não para adições."]
    }
  ]
};

export const MATH_DEEP_REVIEW_CONTENT={
  "12-cplx":COMPLEX_NUMBERS
};

export function mathDeepReviewContentFor(themeId){
  return MATH_DEEP_REVIEW_CONTENT[themeId]||null;
}
