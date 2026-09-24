export const MATH_REVIEW_CONTENT={
  "10-ele":{
    summary:"Os modelos eleitorais e de partilha usam regras matemáticas para transformar votos, preferências ou quantidades numa decisão. O essencial é perceber o procedimento de cada método e interpretar o resultado sem confundir regra com justiça absoluta.",
    keyIdeas:["Identificar corretamente os dados de partida: votos, preferências, lugares ou partes.","Aplicar cada método pela ordem certa e justificar cada passo.","Comparar resultados e reconhecer que métodos diferentes podem produzir decisões diferentes."],
    formulas:["Em métodos proporcionais, trabalha sempre com quocientes ou proporções definidos pelo método.","Na partilha, confirma no fim se a totalidade foi distribuída e se as restrições do problema foram respeitadas."],
    pitfalls:["Trocar a regra de desempate a meio do procedimento.","Comparar métodos sem usar exatamente os mesmos dados de partida."],
    studyTip:"Faz uma pequena tabela com o nome de cada método, os passos e a regra de desempate."
  },
  "10-fin":{
    summary:"A matemática financeira descreve como um capital evolui ao longo do tempo. A grande distinção é perceber quando o crescimento é linear, como no juro simples, e quando é multiplicativo, como no juro composto.",
    keyIdeas:["Distinguir capital inicial, taxa, período e capital acumulado.","Converter taxas apenas quando os períodos são compatíveis.","Interpretar o efeito da capitalização repetida no crescimento."],
    formulas:["Juro simples: C_n=C_0(1+n i).","Juro composto: C_n=C_0(1+i)^n."],
    pitfalls:["Usar uma taxa anual num número de períodos mensal sem conversão adequada.","Confundir juros ganhos num período com capital acumulado."],
    studyTip:"Antes de calcular, escreve sempre a unidade temporal da taxa e do número de períodos."
  },
  "10-est":{
    summary:"Estatística organiza e resume dados para permitir comparações e interpretações. Não basta calcular medidas: é preciso relacioná-las com a forma da distribuição e com o contexto.",
    keyIdeas:["Distinguir medidas de localização de medidas de dispersão.","Ler tabelas e gráficos sem perder a unidade nem a população em estudo.","Comparar distribuições usando mais do que uma medida quando necessário."],
    formulas:["Média: soma dos valores dividida pelo número de observações.","Amplitude: máximo menos mínimo."],
    pitfalls:["Concluir apenas pela média quando as dispersões são muito diferentes.","Confundir frequência absoluta com frequência relativa."],
    studyTip:"Treina explicar por palavras o que uma média, mediana ou medida de dispersão diz naquele contexto."
  },
  "10-gs":{
    summary:"A geometria sintética usa propriedades e relações geométricas para demonstrar resultados sem depender apenas de coordenadas. O foco deve estar nas propriedades que justificam cada construção.",
    keyIdeas:["Reconhecer propriedades de triângulos, circunferências e pontos notáveis.","Usar paralelismo, perpendicularidade e ângulos para encadear argumentos.","Distinguir uma observação visual de uma propriedade demonstrada."],
    formulas:["Em triângulos retângulos, o teorema de Pitágoras relaciona os comprimentos dos lados.","As somas e relações angulares devem ser justificadas pelas propriedades usadas."],
    pitfalls:["Assumir que duas medidas são iguais apenas porque o desenho parece simétrico.","Usar uma propriedade sem verificar as suas condições."],
    studyTip:"Ao rever uma demonstração, sublinha a propriedade usada em cada passagem."
  },
  "10-fun":{
    summary:"Uma função associa valores de entrada a valores de saída. Para estudar uma função, relaciona sempre expressão, tabela e gráfico: cada representação revela aspetos diferentes.",
    keyIdeas:["Determinar domínio, imagem e zeros.","Interpretar crescimento, decrescimento e extremos no gráfico.","Passar entre representações algébricas e gráficas."],
    formulas:["Zero de f: resolver f(x)=0.","Numa função afim f(x)=mx+b, m é o declive e b a ordenada na origem."],
    pitfalls:["Confundir domínio com imagem.","Ler um extremo local como se fosse necessariamente absoluto."],
    studyTip:"Para cada função, tenta responder sem calcular: onde existe, onde vale zero, onde cresce e onde atinge extremos."
  },
  "10-ga":{
    summary:"A geometria analítica traduz problemas geométricos para coordenadas, vetores e equações. O objetivo é usar a álgebra para descrever posições, distâncias e direções.",
    keyIdeas:["Calcular distâncias e pontos médios.","Interpretar vetores como deslocamentos e direções.","Relacionar equações de retas com posições relativas."],
    formulas:["Distância no plano: d=√((x₂-x₁)²+(y₂-y₁)²).","Ponto médio: M=((x₁+x₂)/2,(y₁+y₂)/2)."],
    pitfalls:["Trocar coordenadas ao calcular vetores.","Concluir paralelismo ou perpendicularidade sem comparar direções corretamente."],
    studyTip:"Desenha um esboço antes de escrever equações; ajuda a detetar sinais e posições impossíveis."
  },
  "11-trig":{
    summary:"A trigonometria relaciona ângulos, razões e funções periódicas. O círculo trigonométrico é a referência central para compreender sinais, periodicidade e soluções de equações.",
    keyIdeas:["Relacionar seno, cosseno e tangente com o círculo trigonométrico.","Converter entre graus e radianos.","Resolver equações tendo em conta a periodicidade."],
    formulas:["sin²x+cos²x=1.","tan x=sin x/cos x, quando cos x≠0.","180°=π rad."],
    pitfalls:["Dar apenas uma solução quando a equação tem soluções periódicas.","Ignorar o quadrante ao determinar sinais."],
    studyTip:"Mantém um círculo trigonométrico simples como referência para sinais e ângulos notáveis."
  },
  "11-pe":{
    summary:"O produto escalar liga vetores a comprimentos, ângulos e perpendicularidade. Em coordenadas, transforma relações geométricas em cálculos algébricos muito diretos.",
    keyIdeas:["Calcular produto escalar por coordenadas.","Usar produto escalar nulo para testar perpendicularidade.","Relacionar produto escalar, normas e ângulo."],
    formulas:["u·v=u₁v₁+u₂v₂ (+u₃v₃ no espaço).","u·v=||u|| ||v|| cos θ."],
    pitfalls:["Confundir produto escalar com produto de normas.","Aplicar a fórmula do ângulo sem verificar vetores não nulos."],
    studyTip:"Quando aparecer perpendicularidade, pensa imediatamente em produto escalar igual a zero."
  },
  "11-cont":{
    summary:"A contagem procura determinar quantas possibilidades existem sem as enumerar uma a uma. A pergunta-chave é sempre: a ordem importa? Há repetição? As escolhas são independentes?",
    keyIdeas:["Aplicar princípios da adição e multiplicação.","Distinguir permutações, arranjos e combinações.","Organizar casos com tabelas ou diagramas quando necessário."],
    formulas:["n!=n(n-1)…1.","Combinações: C(n,k)=n!/[k!(n-k)!]."],
    pitfalls:["Usar combinações quando a ordem altera o resultado.","Somar casos que não são mutuamente exclusivos."],
    studyTip:"Antes da fórmula, responde por escrito: ordem importa? repetição é permitida?"
  },
  "11-suc":{
    summary:"Uma sucessão é uma função definida nos naturais. O estudo centra-se na regularidade dos termos, na forma de os gerar e no comportamento à medida que o índice cresce.",
    keyIdeas:["Distinguir termo geral de definição por recorrência.","Reconhecer progressões aritméticas e geométricas.","Interpretar crescimento, decrescimento e comportamento global."],
    formulas:["PA: u_n=u_1+(n-1)r.","PG: u_n=u_1 q^(n-1)."],
    pitfalls:["Confundir razão de uma PG com diferença de uma PA.","Usar a fórmula de soma com índice inicial errado."],
    studyTip:"Escreve sempre os primeiros três ou quatro termos para validar a fórmula."
  },
  "11-fun":{
    summary:"No 11.º ano, o estudo de funções aprofunda operações, transformações e famílias de funções. É importante reconhecer como alterações algébricas mudam o gráfico.",
    keyIdeas:["Interpretar transformações do tipo f(x-a)+b.","Trabalhar com polinómios e funções racionais.","Relacionar fatorização, raízes e comportamento gráfico."],
    formulas:["Se P(a)=0, então x-a é fator de P(x).","Transformações horizontais e verticais devem ser lidas a partir da expressão completa."],
    pitfalls:["Trocar o sentido de uma translação horizontal.","Cancelar fatores sem registar restrições do domínio."],
    studyTip:"Liga cada manipulação algébrica ao efeito que teria no gráfico."
  },
  "11-cd":{
    summary:"A derivada mede taxa de variação instantânea e declive da reta tangente. Depois de compreender esse significado, usa-se a derivada para estudar monotonia, extremos e otimização.",
    keyIdeas:["Interpretar derivada num ponto como taxa instantânea e declive.","Aplicar regras de derivação.","Usar o sinal da derivada para estudar monotonia e extremos."],
    formulas:["f'(a)=lim_{h→0}[f(a+h)-f(a)]/h, quando existe.","Reta tangente em x=a: y=f(a)+f'(a)(x-a)."],
    pitfalls:["Concluir extremo apenas porque f'(a)=0.","Confundir taxa média com derivada."],
    studyTip:"Se estiveres a estudar monotonia, constrói uma tabela de sinais de f'."
  },
  "12-cplx":{
    summary:"Os números complexos estendem os reais através da unidade imaginária i. É essencial alternar entre forma algébrica e trigonométrica conforme a operação pretendida.",
    keyIdeas:["Identificar parte real, parte imaginária, módulo e argumento.","Usar a forma algébrica em adição e subtração.","Usar a forma trigonométrica para produtos, quocientes, potências e raízes."],
    formulas:["z=a+bi, com i²=-1.","|z|=√(a²+b²).","Na forma trigonométrica: z=r(cos θ+i sin θ)."],
    pitfalls:["Somar argumentos em operações onde isso não se aplica.","Esquecer a multiplicidade de argumentos e raízes."],
    studyTip:"Escolhe a forma do número complexo em função da operação, não por hábito."
  },
  "12-prob":{
    summary:"Probabilidade quantifica incerteza. A base é definir corretamente acontecimentos e relações entre eles antes de aplicar regras de cálculo.",
    keyIdeas:["Distinguir união, interseção e complementar.","Compreender probabilidade condicionada e independência.","Organizar problemas em árvores ou tabelas quando há várias etapas."],
    formulas:["P(A|B)=P(A∩B)/P(B), se P(B)>0.","Se A e B são independentes, P(A∩B)=P(A)P(B)."],
    pitfalls:["Confundir acontecimentos incompatíveis com independentes.","Trocar P(A|B) por P(B|A)."],
    studyTip:"Escreve primeiro os acontecimentos por símbolos antes de substituir números."
  },
  "12-expl":{
    summary:"Funções exponenciais e logarítmicas modelam crescimento, decrescimento e escalas multiplicativas. O logaritmo é a operação inversa da exponenciação.",
    keyIdeas:["Interpretar crescimento e decrescimento exponencial.","Usar propriedades dos logaritmos para transformar expressões.","Resolver equações exponenciais e logarítmicas respeitando o domínio."],
    formulas:["a^x=y ⇔ log_a y=x, com a>0, a≠1 e y>0.","log_a(xy)=log_a x+log_a y."],
    pitfalls:["Aplicar logaritmo a valores não positivos.","Transformar log(x+y) como se fosse log x+log y."],
    studyTip:"Antes de resolver uma equação logarítmica, escreve as condições de existência."
  },
  "12-fcd":{
    summary:"A derivação de funções compostas combina regras de derivação com a regra da cadeia. O desafio é reconhecer a estrutura externa e interna da função antes de derivar.",
    keyIdeas:["Identificar composição de funções.","Aplicar produto, quociente e regra da cadeia.","Usar derivadas em estudo de funções e otimização."],
    formulas:["Regra da cadeia: (f∘g)'(x)=f'(g(x))g'(x).","(uv)'=u'v+uv'."],
    pitfalls:["Derivar a função exterior e esquecer a derivada da interior.","Aplicar regras termo a termo a uma composição que exige cadeia."],
    studyTip:"Marca visualmente a função 'de fora' e a função 'de dentro' antes de derivar."
  },
  "12-fcont":{
    summary:"Limite, continuidade e derivabilidade descrevem o comportamento local e global das funções. A derivabilidade implica continuidade, mas o recíproco não é sempre verdadeiro.",
    keyIdeas:["Interpretar limites graficamente e analiticamente.","Verificar continuidade num ponto.","Relacionar derivada, monotonia, extremos e assíntotas."],
    formulas:["Continuidade em a exige lim_{x→a}f(x)=f(a).","Se f é derivável em a, então é contínua em a."],
    pitfalls:["Confundir existência de limite com existência do valor da função.","Assumir derivabilidade a partir apenas da continuidade."],
    studyTip:"Em pontos problemáticos, verifica por ordem: valor da função, limite e só depois derivabilidade."
  },
  "12-rae":{
    summary:"A resolução aproximada procura localizar e aproximar soluções quando não há uma forma algébrica simples. Mais importante do que obter um número é justificar o intervalo e o erro da aproximação.",
    keyIdeas:["Localizar raízes usando mudança de sinal e continuidade.","Aplicar bisseção de forma iterativa.","Interpretar aproximação e erro."],
    formulas:["Na bisseção, cada iteração reduz o intervalo para metade.","O erro pode ser controlado através do comprimento do intervalo final."],
    pitfalls:["Aplicar Bolzano sem verificar continuidade.","Apresentar uma aproximação sem indicar precisão ou intervalo."],
    studyTip:"Regista em tabela cada intervalo da bisseção; evita perder sinais e extremos."
  },
  "12-ie":{
    summary:"A inferência estatística usa informação de uma amostra para tirar conclusões sobre uma população. O essencial é distinguir o que foi observado do que está a ser estimado.",
    keyIdeas:["Distinguir população, amostra, parâmetro e estatística.","Interpretar estimativas e margens de erro.","Compreender o papel da variabilidade amostral."],
    formulas:["Uma estimativa pontual resume a amostra num valor para aproximar um parâmetro.","Um intervalo de confiança deve ser interpretado no contexto do procedimento, não como certeza absoluta sobre um caso isolado."],
    pitfalls:["Tratar uma amostra como se fosse a população inteira.","Interpretar confiança como probabilidade posterior do parâmetro sem enquadramento adequado."],
    studyTip:"Em cada problema identifica explicitamente população, amostra e parâmetro."
  },
  "12-int":{
    summary:"O cálculo integral relaciona primitivas com acumulação e áreas. A Fórmula de Barrow permite calcular integrais definidos através de uma primitiva.",
    keyIdeas:["Reconhecer primitivas imediatas.","Interpretar integral definido como acumulação e, em certos contextos, área algébrica.","Usar corretamente os limites de integração."],
    formulas:["Se F'=f, então ∫_a^b f(x)dx=F(b)-F(a).","Uma primitiva geral inclui uma constante: F(x)+C."],
    pitfalls:["Esquecer a constante em primitivas indefinidas.","Confundir área geométrica com integral quando a função toma valores negativos."],
    studyTip:"Depois de integrar, deriva mentalmente o resultado para confirmar a primitiva."
  },
  "12-mat":{
    summary:"As matrizes organizam informação e representam transformações e sistemas de relações. As operações dependem das dimensões, por isso a compatibilidade deve ser verificada antes de calcular.",
    keyIdeas:["Identificar ordem e elementos de uma matriz.","Efetuar adição, multiplicação por escalar e produto de matrizes.","Interpretar matrizes em modelação e transformações."],
    formulas:["AB só existe quando o número de colunas de A é igual ao número de linhas de B.","Em geral, AB≠BA."],
    pitfalls:["Multiplicar elemento a elemento quando o problema pede produto matricial.","Assumir comutatividade do produto."],
    studyTip:"Escreve as dimensões das matrizes antes de qualquer produto."
  }
};

export function mathReviewContentFor(themeId){
  return MATH_REVIEW_CONTENT[themeId]||null;
}
