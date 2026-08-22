// A+ v1.5 — conteúdo separado da interface e do motor.

const TAXONOMY = [
  {id:"10-ele",year:"10.º",name:"Modelos matemáticos nas eleições e partilha",short:"Eleições e partilha",focus:["Métodos de votação","Métodos de partilha","Interpretação de resultados"],relevance:2,blocking:1},
  {id:"10-fin",year:"10.º",name:"Modelos matemáticos em finanças",short:"Matemática financeira",focus:["Juros","Capitalização","Modelação financeira"],relevance:2,blocking:1},
  {id:"10-est",year:"10.º",name:"Estatística",short:"Estatística",focus:["Representações de dados","Medidas estatísticas","Interpretação de dados"],relevance:3,blocking:2},
  {id:"10-gs",year:"10.º",name:"Geometria sintética",short:"Geometria sintética",focus:["Propriedades geométricas","Raciocínio geométrico","Resolução de problemas"],relevance:2,blocking:2},
  {id:"10-fun",year:"10.º",name:"Funções",short:"Funções",focus:["Domínio e zeros","Representações","Monotonia e extremos"],relevance:5,blocking:5},
  {id:"10-ga",year:"10.º",name:"Geometria analítica no plano e no espaço",short:"Geometria analítica",focus:["Coordenadas","Vetores","Retas e planos"],relevance:4,blocking:4},

  {id:"11-trig",year:"11.º",name:"Trigonometria",short:"Trigonometria",focus:["Razões trigonométricas","Equações trigonométricas","Funções trigonométricas"],relevance:4,blocking:3},
  {id:"11-pe",year:"11.º",name:"Produto escalar",short:"Produto escalar",focus:["Produto escalar","Perpendicularidade","Aplicações geométricas"],relevance:3,blocking:2},
  {id:"11-cont",year:"11.º",name:"Contagem",short:"Contagem",focus:["Princípio multiplicativo","Ordem","Combinações"],relevance:4,blocking:4},
  {id:"11-suc",year:"11.º",name:"Sucessões",short:"Sucessões",focus:["Termo geral","Progressões","Comportamento"],relevance:3,blocking:2},
  {id:"11-fun",year:"11.º",name:"Funções",short:"Funções — 11.º",focus:["Transformações","Modelação","Interpretação gráfica"],relevance:4,blocking:4},
  {id:"11-cd",year:"11.º",name:"Cálculo diferencial",short:"Cálculo diferencial",focus:["Derivadas","Taxa de variação","Monotonia e extremos","Otimização"],relevance:5,blocking:5},

  {id:"12-cplx",year:"12.º",name:"Números complexos",short:"Números complexos",focus:["Forma algébrica","Módulo e argumento","Forma trigonométrica","Potências e raízes"],relevance:4,blocking:2},
  {id:"12-prob",year:"12.º",name:"Probabilidade",short:"Probabilidades",focus:["Acontecimentos","Regra de Laplace","Probabilidade condicionada","Independência","Problemas mistos"],relevance:5,blocking:3},
  {id:"12-expl",year:"12.º",name:"Funções exponenciais e logarítmicas",short:"Exponenciais e logaritmos",focus:["Exponenciais","Logaritmos","Equações","Modelação"],relevance:5,blocking:4},
  {id:"12-fcd",year:"12.º",name:"Função composta e derivadas",short:"Função composta e derivadas",focus:["Composição","Regra da cadeia","Aplicações"],relevance:5,blocking:5},
  {id:"12-fcont",year:"12.º",name:"Funções contínuas e deriváveis",short:"Continuidade e derivabilidade",focus:["Limites","Continuidade","Derivabilidade","Assíntotas"],relevance:5,blocking:5},
  {id:"12-rae",year:"12.º",name:"Resolução aproximada de equações",short:"Resolução aproximada",focus:["Interpretação gráfica","Aproximações","Validação de soluções"],relevance:3,blocking:2},
  {id:"12-ie",year:"12.º",name:"Introdução à inferência estatística",short:"Inferência estatística",focus:["Amostras","Estimativas","Interpretação inferencial"],relevance:3,blocking:2},
  {id:"12-int",year:"12.º",name:"Primitivas imediatas e integrais definidos",short:"Primitivas e integrais",focus:["Primitivas","Integral definido","Áreas"],relevance:4,blocking:3},
  {id:"12-mat",year:"12.º",name:"Matrizes",short:"Matrizes",focus:["Operações","Representação","Aplicações"],relevance:3,blocking:2}
];

const PREREQUISITES = {
  "11-cd":"10-fun",
  "12-fcont":"11-cd",
  "12-fcd":"11-cd",
  "12-expl":"10-fun",
  "12-prob":"11-cont"
};

const DIAG_BANK = [
  // 10.º — Funções
  {id:"D10F-A",themeId:"10-fun",role:"anchor",difficulty:2,cognitive:"Aplicação",
   q:"A função f(x)=x²−4 tem que zeros?",o:["−4 e 4","−2 e 2","0 e 4","apenas 2"],a:1,
   sol:"f(x)=0 ⇔ x²=4 ⇔ x=−2 ou x=2.",hyp:"Pode existir uma dificuldade na leitura de zeros ou na resolução de uma equação quadrática simples.",probe:"D10F-P"},
  {id:"D10F-P",themeId:"10-fun",role:"probe",difficulty:1,cognitive:"Compreensão",
   q:"Se f(3)=0, o que significa geometricamente?",o:["O gráfico passa por (0,3)","3 é um zero da função","A função é constante","O domínio termina em 3"],a:1,
   sol:"f(3)=0 significa que x=3 é um zero da função.",hyp:"A dificuldade pode estar no próprio significado de zero de uma função."},

  // 10.º — Geometria analítica
  {id:"D10G-A",themeId:"10-ga",role:"anchor",difficulty:2,cognitive:"Aplicação",
   q:"Qual é o ponto médio de A(2,4) e B(6,8)?",o:["(4,6)","(8,12)","(2,2)","(3,4)"],a:0,
   sol:"M=((2+6)/2,(4+8)/2)=(4,6).",hyp:"Pode haver dificuldade no uso de coordenadas ou na média de cada componente.",probe:"D10G-P"},
  {id:"D10G-P",themeId:"10-ga",role:"probe",difficulty:1,cognitive:"Aplicação",
   q:"Se A(1,2) e B(4,6), então o vetor AB é...",o:["(5,8)","(3,4)","(−3,−4)","(4,6)"],a:1,
   sol:"AB=B−A=(4−1,6−2)=(3,4).",hyp:"A dificuldade pode estar numa operação básica com coordenadas."},

  // 11.º — Trigonometria
  {id:"D11T-A",themeId:"11-trig",role:"anchor",difficulty:2,cognitive:"Aplicação",
   q:"Num ângulo agudo, sin(x)=3/5. Se cos(x)>0, quanto vale cos(x)?",o:["2/5","4/5","3/4","5/3"],a:1,
   sol:"sin²x+cos²x=1, logo cos²x=1−9/25=16/25 e cos(x)=4/5.",hyp:"Pode faltar a identidade fundamental ou a interpretação do sinal do cosseno.",probe:"D11T-P"},
  {id:"D11T-P",themeId:"11-trig",role:"probe",difficulty:1,cognitive:"Compreensão",
   q:"Qual identidade é verdadeira para qualquer x onde seno e cosseno estejam definidos?",o:["sin x+cos x=1","sin²x+cos²x=1","sin x=cos x","sin²x−cos²x=1"],a:1,
   sol:"A identidade fundamental é sin²x+cos²x=1.",hyp:"A dificuldade pode estar numa identidade trigonométrica fundamental."},

  // 11.º — Contagem
  {id:"D11C-A",themeId:"11-cont",role:"anchor",difficulty:2,cognitive:"Aplicação",
   q:"De 6 alunos, quantas equipas diferentes de 2 podem ser formadas?",o:["12","15","30","36"],a:1,
   sol:"Como a ordem não interessa, C(6,2)=15.",hyp:"Pode haver confusão entre escolhas ordenadas e não ordenadas.",probe:"D11C-P"},
  {id:"D11C-P",themeId:"11-cont",role:"probe",difficulty:1,cognitive:"Compreensão",
   q:"Escolher Ana e Bruno para uma equipa sem cargos é diferente de escolher Bruno e Ana?",o:["Sim","Não","Só se forem de turmas diferentes","Só se houver mais de 2 pessoas"],a:1,
   sol:"Sem cargos, a equipa é a mesma: a ordem não interessa.",hyp:"A dificuldade pode estar em reconhecer quando a ordem interessa."},

  // 11.º — Cálculo diferencial
  {id:"D11D-A",themeId:"11-cd",role:"anchor",difficulty:2,cognitive:"Interpretação",
   q:"Se f'(x)>0 em todo o intervalo ]1,4[, o que podemos concluir?",o:["f é crescente nesse intervalo","f é decrescente nesse intervalo","f é negativa nesse intervalo","f tem necessariamente um máximo em x=2"],a:0,
   sol:"Derivada positiva indica que a função é crescente nesse intervalo.",hyp:"Pode existir uma lacuna na interpretação do sinal da derivada.",probe:"D11D-P"},
  {id:"D11D-P",themeId:"11-cd",role:"probe",difficulty:1,cognitive:"Procedimento",
   q:"Qual é a derivada de f(x)=x²?",o:["x","2x","x²/2","2"],a:1,
   sol:"Pela regra da potência, (x²)'=2x.",hyp:"A dificuldade pode estar numa regra elementar de derivação."},

  // 12.º — Complexos
  {id:"D12C-A",themeId:"12-cplx",role:"anchor",difficulty:2,cognitive:"Aplicação",
   q:"Qual é o módulo do número complexo z=3+4i?",o:["3","4","5","7"],a:2,
   sol:"|z|=√(3²+4²)=5.",hyp:"Pode haver dificuldade no conceito ou cálculo do módulo.",probe:"D12C-P"},
  {id:"D12C-P",themeId:"12-cplx",role:"probe",difficulty:1,cognitive:"Compreensão",
   q:"Qual é o conjugado de 2+3i?",o:["−2−3i","2−3i","−2+3i","3+2i"],a:1,
   sol:"O conjugado mantém a parte real e troca o sinal da parte imaginária.",hyp:"A dificuldade pode estar numa noção básica de números complexos."},

  // 12.º — Probabilidades
  {id:"D12P-A",themeId:"12-prob",role:"anchor",difficulty:2,cognitive:"Aplicação",
   q:"P(A∩B)=0,18 e P(B)=0,60. Quanto vale P(A|B)?",o:["0,30","0,108","0,42","0,78"],a:0,
   sol:"P(A|B)=0,18/0,60=0,30.",hyp:"Pode estar a falhar o condicionamento ou a operação necessária.",probe:"D12P-P"},
  {id:"D12P-P",themeId:"12-prob",role:"probe",difficulty:1,cognitive:"Compreensão",
   q:"Em P(A|B), qual é o universo relevante depois de sabermos que B ocorreu?",o:["O universo original inteiro","Apenas B","Apenas A","A∪B"],a:1,
   sol:"A condição B restringe o universo relevante ao acontecimento B.",hyp:"A dificuldade pode estar no significado da condição, e não no cálculo."},

  // 12.º — Exponenciais e logaritmos
  {id:"D12E-A",themeId:"12-expl",role:"anchor",difficulty:2,cognitive:"Aplicação",
   q:"Qual é a solução de 2^x=8?",o:["2","3","4","8"],a:1,
   sol:"8=2³, logo x=3.",hyp:"Pode haver dificuldade em relacionar potências e equações exponenciais.",probe:"D12E-P"},
  {id:"D12E-P",themeId:"12-expl",role:"probe",difficulty:1,cognitive:"Compreensão",
   q:"Quanto vale log₁₀(100)?",o:["1","2","10","100"],a:1,
   sol:"10²=100, por isso log₁₀(100)=2.",hyp:"A dificuldade pode estar na definição elementar de logaritmo."},

  // 12.º — Continuidade e derivabilidade
  {id:"D12L-A",themeId:"12-fcont",role:"anchor",difficulty:2,cognitive:"Compreensão",
   q:"Se lim(x→a) f(x)=f(a), então f é...",o:["contínua em a","necessariamente derivável em a","necessariamente crescente em a","necessariamente positiva em a"],a:0,
   sol:"A igualdade lim(x→a)f(x)=f(a) é a condição de continuidade em a.",hyp:"Pode haver dificuldade no conceito de continuidade.",probe:"D12L-P"},
  {id:"D12L-P",themeId:"12-fcont",role:"probe",difficulty:1,cognitive:"Compreensão",
   q:"Se os limites laterais de f em a são diferentes, então o limite de f quando x→a...",o:["existe e vale 0","não existe","é sempre infinito","é igual a f(a)"],a:1,
   sol:"Para existir um limite finito, os dois limites laterais têm de coincidir.",hyp:"A dificuldade pode estar na condição de existência de um limite."}
];

const MISSION_BANK = [
  // Funções
  {id:"M10F-1",themeId:"10-fun",difficulty:2,cognitive:"Aplicação",q:"Para f(x)=2x−6, qual é o zero?",o:["−3","0","3","6"],a:2,sol:"2x−6=0 ⇔ x=3.",hyp:"Pode haver dificuldade em ligar o zero à equação f(x)=0."},
  {id:"M10F-2",themeId:"10-fun",difficulty:2,cognitive:"Interpretação",q:"Se o gráfico de f corta o eixo Ox em x=−1, então...",o:["f(−1)=0","f(0)=−1","f(−1)=1","−1 não pertence ao domínio"],a:0,sol:"Intersetar o eixo Ox significa ter ordenada 0.",hyp:"Pode haver dificuldade na leitura gráfica de zeros."},
  {id:"M10F-3",themeId:"10-fun",difficulty:3,cognitive:"Raciocínio",q:"Uma função tem zeros −2 e 5. Qual expressão tem necessariamente esses zeros?",o:["(x+2)(x−5)","(x−2)(x+5)","x²−7","(x+2)(x+5)"],a:0,sol:"Os fatores anulam-se em x=−2 e x=5.",hyp:"Pode faltar a ligação entre zeros e fatores."},

  // Geometria analítica
  {id:"M10G-1",themeId:"10-ga",difficulty:2,cognitive:"Aplicação",q:"O vetor de A(−1,2) para B(3,5) é...",o:["(2,7)","(4,3)","(−4,−3)","(3,5)"],a:1,sol:"AB=(3−(−1),5−2)=(4,3).",hyp:"Pode haver dificuldade na subtração de coordenadas."},
  {id:"M10G-2",themeId:"10-ga",difficulty:2,cognitive:"Aplicação",q:"A distância entre (0,0) e (3,4) é...",o:["5","7","12","25"],a:0,sol:"d=√(3²+4²)=5.",hyp:"Pode haver dificuldade na fórmula da distância ou no Teorema de Pitágoras."},
  {id:"M10G-3",themeId:"10-ga",difficulty:3,cognitive:"Raciocínio",q:"Se o ponto M(2,1) é o ponto médio de A(0,0) e B(x,y), então B é...",o:["(1,0,5)","(4,2)","(2,1)","(−4,−2)"],a:1,sol:"(x/2,y/2)=(2,1), logo x=4 e y=2.",hyp:"Pode haver dificuldade em inverter a relação do ponto médio."},

  // Trigonometria
  {id:"M11T-1",themeId:"11-trig",difficulty:2,cognitive:"Aplicação",q:"Se cos(x)=1/2 e x é agudo, então sin(x) é...",o:["1/2","√3/2","√2/2","3/2"],a:1,sol:"sin²x=1−1/4=3/4, logo sin(x)=√3/2.",hyp:"Pode faltar a identidade fundamental."},
  {id:"M11T-2",themeId:"11-trig",difficulty:2,cognitive:"Compreensão",q:"Num ângulo do 2.º quadrante, o seno é...",o:["positivo","negativo","sempre zero","não definido"],a:0,sol:"No 2.º quadrante, o seno é positivo.",hyp:"Pode haver dificuldade nos sinais das funções trigonométricas."},
  {id:"M11T-3",themeId:"11-trig",difficulty:3,cognitive:"Raciocínio",q:"Se sin(x)=0 e x∈[0,2π], então x pode ser...",o:["π/2 apenas","0, π ou 2π","π/4 ou 3π/4","π/2 ou 3π/2"],a:1,sol:"O seno anula-se nos múltiplos de π.",hyp:"Pode haver dificuldade em localizar zeros da função seno."},

  // Contagem
  {id:"M11C-1",themeId:"11-cont",difficulty:2,cognitive:"Aplicação",q:"Quantas comissões de 3 pessoas podem ser escolhidas entre 7?",o:["21","35","210","343"],a:1,sol:"Sem cargos, a ordem não interessa: C(7,3)=35.",hyp:"Pode estar a usar uma contagem ordenada."},
  {id:"M11C-2",themeId:"11-cont",difficulty:2,cognitive:"Aplicação",q:"Um código tem 2 algarismos, com repetição permitida. Quantos códigos existem?",o:["20","90","100","10"],a:2,sol:"Há 10 opções em cada posição: 10×10=100.",hyp:"Pode estar a somar possibilidades de etapas sucessivas."},
  {id:"M11C-3",themeId:"11-cont",difficulty:3,cognitive:"Raciocínio",q:"Entre 6 pessoas escolhem-se presidente e vice. Quantos resultados diferentes existem?",o:["15","30","36","12"],a:1,sol:"As funções são distintas: 6×5=30.",hyp:"Pode não reconhecer que a ordem/função interessa."},

  // Cálculo diferencial
  {id:"M11D-1",themeId:"11-cd",difficulty:2,cognitive:"Procedimento",q:"Qual é a derivada de 3x²−2x?",o:["6x−2","3x−2","6x","x²−2"],a:0,sol:"(3x²−2x)'=6x−2.",hyp:"Pode haver dificuldade nas regras básicas de derivação."},
  {id:"M11D-2",themeId:"11-cd",difficulty:2,cognitive:"Interpretação",q:"Se f'(x)<0 num intervalo, então f é...",o:["crescente","decrescente","constante","sempre negativa"],a:1,sol:"Derivada negativa implica função decrescente.",hyp:"Pode haver dificuldade em interpretar o sinal da derivada."},
  {id:"M11D-3",themeId:"11-cd",difficulty:3,cognitive:"Raciocínio",q:"Se f'(2)=0 e f' muda de positivo para negativo em x=2, então x=2 corresponde a...",o:["um mínimo local","um máximo local","um ponto sem extremo","uma assíntota"],a:1,sol:"A passagem de crescente para decrescente indica um máximo local.",hyp:"Pode haver dificuldade na análise de sinal e extremos."},

  // Complexos
  {id:"M12C-1",themeId:"12-cplx",difficulty:2,cognitive:"Aplicação",q:"(2+i)+(1−3i) é...",o:["3−2i","1−2i","3+4i","2−3i"],a:0,sol:"Somam-se partes reais e imaginárias: 3−2i.",hyp:"Pode haver dificuldade em operar partes real e imaginária."},
  {id:"M12C-2",themeId:"12-cplx",difficulty:2,cognitive:"Compreensão",q:"Se z=−4+3i, então Re(z) é...",o:["3","−4","4","−3"],a:1,sol:"A parte real é −4.",hyp:"Pode haver dificuldade em identificar as componentes do número complexo."},
  {id:"M12C-3",themeId:"12-cplx",difficulty:3,cognitive:"Aplicação",q:"Quanto vale i²?",o:["1","−1","i","−i"],a:1,sol:"Por definição, i²=−1.",hyp:"Pode faltar uma propriedade fundamental da unidade imaginária."},

  // Probabilidades
  {id:"M12P-1",themeId:"12-prob",difficulty:2,cognitive:"Aplicação",q:"40% compram café e 10% compram café e bolo. Sabendo que compra café, P(comprar bolo) é...",o:["10%","25%","40%","50%"],a:1,sol:"10%/40%=25%.",hyp:"Pode estar a usar diretamente a interseção sem condicionar."},
  {id:"M12P-2",themeId:"12-prob",difficulty:2,cognitive:"Compreensão",q:"Se A e B são independentes, saber que B ocorreu...",o:["torna A impossível","não altera P(A)","obriga A a ocorrer","faz P(A)=P(B)"],a:1,sol:"Independência significa ausência de alteração na probabilidade de A.",hyp:"Pode estar a confundir independência com incompatibilidade."},
  {id:"M12P-3",themeId:"12-prob",difficulty:3,cognitive:"Raciocínio",q:"P(A)=0,4, P(B)=0,3 e P(A∩B)=0,12. A e B são...",o:["independentes","incompatíveis","complementares","iguais"],a:0,sol:"0,4×0,3=0,12, logo satisfazem o critério de independência.",hyp:"Pode haver dificuldade em aplicar o critério formal de independência."},

  // Exponenciais e logaritmos
  {id:"M12E-1",themeId:"12-expl",difficulty:2,cognitive:"Aplicação",q:"A solução de 3^x=27 é...",o:["2","3","9","27"],a:1,sol:"27=3³, logo x=3.",hyp:"Pode haver dificuldade em reconhecer potências equivalentes."},
  {id:"M12E-2",themeId:"12-expl",difficulty:2,cognitive:"Aplicação",q:"log₂(8) vale...",o:["2","3","4","8"],a:1,sol:"2³=8, por isso log₂(8)=3.",hyp:"Pode haver dificuldade na definição de logaritmo."},
  {id:"M12E-3",themeId:"12-expl",difficulty:3,cognitive:"Raciocínio",q:"Se log₁₀(x)=2, então x é...",o:["20","100","2","0,01"],a:1,sol:"x=10²=100.",hyp:"Pode haver dificuldade em passar da forma logarítmica para a exponencial."},

  // Continuidade
  {id:"M12L-1",themeId:"12-fcont",difficulty:2,cognitive:"Compreensão",q:"Uma função derivável num ponto é necessariamente...",o:["contínua nesse ponto","descontínua nesse ponto","positiva nesse ponto","crescente nesse ponto"],a:0,sol:"Derivabilidade implica continuidade.",hyp:"Pode haver dificuldade na relação entre derivabilidade e continuidade."},
  {id:"M12L-2",themeId:"12-fcont",difficulty:2,cognitive:"Interpretação",q:"Se lim(x→2−)f(x)=1 e lim(x→2+)f(x)=4, então lim(x→2)f(x)...",o:["vale 2,5","vale 1","vale 4","não existe"],a:3,sol:"Os limites laterais são diferentes, logo o limite não existe.",hyp:"Pode haver dificuldade na leitura dos limites laterais."},
  {id:"M12L-3",themeId:"12-fcont",difficulty:3,cognitive:"Raciocínio",q:"Se f é contínua em 3 e f(3)=7, então lim(x→3)f(x) é...",o:["0","3","7","não existe"],a:2,sol:"Pela continuidade, o limite é igual ao valor da função.",hyp:"Pode haver dificuldade em aplicar a definição de continuidade."}
];


const EXTRA_BANK = [
  {id:"M10F-4",themeId:"10-fun",difficulty:3,cognitive:"Interpretação",q:"A função f(x)=−(x−2)²+5 atinge o seu valor máximo quando...",o:["x=−2","x=0","x=2","x=5"],a:2,sol:"A parábola está na forma de vértice e tem máximo no vértice, x=2.",hyp:"Pode haver dificuldade em interpretar a forma de vértice de uma função quadrática."},
  {id:"M10F-5",themeId:"10-fun",difficulty:3,cognitive:"Raciocínio",q:"Se f(x)=(x−1)(x+3), quais são os zeros de f?",o:["1 e −3","−1 e 3","1 e 3","−1 e −3"],a:0,sol:"Cada fator deve ser zero: x=1 ou x=−3.",hyp:"Pode faltar a ligação entre fatores e zeros de uma função."},

  {id:"M10G-4",themeId:"10-ga",difficulty:3,cognitive:"Aplicação",q:"Qual é o declive da reta que passa por (1,2) e (3,6)?",o:["1","2","3","4"],a:1,sol:"m=(6−2)/(3−1)=4/2=2.",hyp:"Pode haver dificuldade no cálculo do declive a partir de dois pontos."},
  {id:"M10G-5",themeId:"10-ga",difficulty:2,cognitive:"Compreensão",q:"Qual das equações representa uma reta de declive 2 que passa na origem?",o:["y=x+2","y=2x","y=2","x=2y"],a:1,sol:"Uma reta pela origem tem ordenada na origem 0: y=2x.",hyp:"Pode haver dificuldade em relacionar declive e equação reduzida da reta."},

  {id:"M11T-4",themeId:"11-trig",difficulty:2,cognitive:"Conhecimento",q:"Quanto vale sin(π/6)?",o:["0","1/2","√2/2","1"],a:1,sol:"sin(π/6)=1/2.",hyp:"Pode faltar um valor trigonométrico notável."},
  {id:"M11T-5",themeId:"11-trig",difficulty:3,cognitive:"Aplicação",q:"Em [0,2π], as soluções de cos(x)=0 são...",o:["0 e π","π/2 e 3π/2","π/4 e 5π/4","apenas π/2"],a:1,sol:"O cosseno anula-se em π/2 e 3π/2 nesse intervalo.",hyp:"Pode haver dificuldade em localizar zeros da função cosseno."},

  {id:"M11C-4",themeId:"11-cont",difficulty:2,cognitive:"Aplicação",q:"De quantas maneiras podem ser ordenados 4 livros diferentes numa prateleira?",o:["4","8","16","24"],a:3,sol:"São 4! = 24 ordenações.",hyp:"Pode haver dificuldade em reconhecer uma permutação."},
  {id:"M11C-5",themeId:"11-cont",difficulty:3,cognitive:"Aplicação",q:"Quantos pares diferentes podem ser escolhidos entre 8 pessoas?",o:["16","28","56","64"],a:1,sol:"Como a ordem não interessa, C(8,2)=28.",hyp:"Pode haver confusão entre combinações e escolhas ordenadas."},

  {id:"M11D-4",themeId:"11-cd",difficulty:2,cognitive:"Procedimento",q:"Qual é a derivada de f(x)=x³?",o:["x²","2x","3x²","3x"],a:2,sol:"Pela regra da potência, (x³)'=3x².",hyp:"Pode haver dificuldade numa regra básica de derivação."},
  {id:"M11D-5",themeId:"11-cd",difficulty:3,cognitive:"Interpretação",q:"Se f'(x)=2x−4, f' é negativa antes de 2 e positiva depois de 2. O ponto x=2 corresponde a...",o:["um máximo local","um mínimo local","uma assíntota","nenhum extremo"],a:1,sol:"A função passa de decrescente para crescente, logo tem um mínimo local.",hyp:"Pode haver dificuldade em transformar o sinal da derivada numa conclusão sobre extremos."},

  {id:"M12C-4",themeId:"12-cplx",difficulty:2,cognitive:"Aplicação",q:"Quanto vale (1+i)(1−i)?",o:["0","1","2","2i"],a:2,sol:"(1+i)(1−i)=1−i²=2.",hyp:"Pode haver dificuldade na multiplicação de complexos ou na utilização de i²=−1."},
  {id:"M12C-5",themeId:"12-cplx",difficulty:2,cognitive:"Conhecimento",q:"Quanto vale i³?",o:["1","−1","i","−i"],a:3,sol:"i³=i²·i=−i.",hyp:"Pode faltar o ciclo das potências da unidade imaginária."},

  {id:"M12P-4",themeId:"12-prob",difficulty:3,cognitive:"Aplicação",q:"P(A)=0,4, P(B)=0,5 e P(A∩B)=0,2. Quanto vale P(A∪B)?",o:["0,2","0,7","0,9","1,1"],a:1,sol:"P(A∪B)=0,4+0,5−0,2=0,7.",hyp:"Pode haver dificuldade na fórmula da união ou em descontar a interseção."},
  {id:"M12P-5",themeId:"12-prob",difficulty:3,cognitive:"Aplicação",q:"A e B são independentes, P(A)=0,3 e P(B)=0,4. Quanto vale P(A∩B)?",o:["0,12","0,7","0,1","1,2"],a:0,sol:"Para acontecimentos independentes, P(A∩B)=P(A)P(B)=0,12.",hyp:"Pode haver dificuldade em aplicar o critério de independência."},

  {id:"M12E-4",themeId:"12-expl",difficulty:2,cognitive:"Conhecimento",q:"Quanto vale ln(e³)?",o:["e","3","ln(3)","9"],a:1,sol:"ln e³=3.",hyp:"Pode faltar a relação inversa entre exponencial e logaritmo natural."},
  {id:"M12E-5",themeId:"12-expl",difficulty:3,cognitive:"Raciocínio",q:"Quanto vale 10^(log₁₀7)?",o:["1","7","10","70"],a:1,sol:"A exponencial de base 10 e o logaritmo de base 10 são funções inversas.",hyp:"Pode haver dificuldade na relação entre funções exponenciais e logarítmicas."},

  {id:"M12L-4",themeId:"12-fcont",difficulty:2,cognitive:"Interpretação",q:"A função f(x)=1/x tem uma assíntota vertical em...",o:["x=−1","x=0","x=1","y=0"],a:1,sol:"Quando x se aproxima de 0, 1/x cresce em módulo sem limite; x=0 é assíntota vertical.",hyp:"Pode haver dificuldade em relacionar comportamento limite e assíntotas."},
  {id:"M12L-5",themeId:"12-fcont",difficulty:2,cognitive:"Aplicação",q:"Quanto vale lim(x→2)(x²+1)?",o:["3","4","5","não existe"],a:2,sol:"Sendo um polinómio contínuo, basta substituir: 2²+1=5.",hyp:"Pode haver dificuldade em calcular limites de funções contínuas."}
];



const FOCUS_MAP = {
  "D10F-A":"Domínio e zeros","D10F-P":"Domínio e zeros","M10F-1":"Domínio e zeros","M10F-2":"Representações","M10F-3":"Domínio e zeros","M10F-4":"Monotonia e extremos","M10F-5":"Domínio e zeros",
  "D10G-A":"Coordenadas","D10G-P":"Vetores","M10G-1":"Vetores","M10G-2":"Coordenadas","M10G-3":"Coordenadas","M10G-4":"Retas e planos","M10G-5":"Retas e planos",
  "D11T-A":"Razões trigonométricas","D11T-P":"Razões trigonométricas","M11T-1":"Razões trigonométricas","M11T-2":"Funções trigonométricas","M11T-3":"Funções trigonométricas","M11T-4":"Razões trigonométricas","M11T-5":"Equações trigonométricas",
  "D11C-A":"Combinações","D11C-P":"Ordem","M11C-1":"Combinações","M11C-2":"Princípio multiplicativo","M11C-3":"Ordem","M11C-4":"Ordem","M11C-5":"Combinações",
  "D11D-A":"Monotonia e extremos","D11D-P":"Derivadas","M11D-1":"Derivadas","M11D-2":"Monotonia e extremos","M11D-3":"Monotonia e extremos","M11D-4":"Derivadas","M11D-5":"Monotonia e extremos",
  "D12C-A":"Módulo e argumento","D12C-P":"Forma algébrica","M12C-1":"Forma algébrica","M12C-2":"Forma algébrica","M12C-3":"Potências e raízes","M12C-4":"Forma algébrica","M12C-5":"Potências e raízes",
  "D12P-A":"Probabilidade condicionada","D12P-P":"Probabilidade condicionada","M12P-1":"Probabilidade condicionada","M12P-2":"Independência","M12P-3":"Independência","M12P-4":"Acontecimentos","M12P-5":"Independência",
  "D12E-A":"Exponenciais","D12E-P":"Logaritmos","M12E-1":"Equações","M12E-2":"Logaritmos","M12E-3":"Equações","M12E-4":"Logaritmos","M12E-5":"Modelação",
  "D12L-A":"Continuidade","D12L-P":"Limites","M12L-1":"Derivabilidade","M12L-2":"Limites","M12L-3":"Continuidade","M12L-4":"Assíntotas","M12L-5":"Limites"
};



const PROFILE_DIAG_VARIANTS = [
  {id:"D10F-E",themeId:"10-fun",role:"anchor",difficulty:1,cognitive:"Aplicação",focus:"Domínio e zeros",
   q:"Qual é o zero de f(x)=x−5?",o:["−5","0","5","1"],a:2,sol:"x−5=0 ⇔ x=5.",hyp:"Pode existir uma dificuldade muito básica na noção de zero de uma função.",contexts:["diagnostic"],signature:"10-fun:zeros:easy"},
  {id:"D10F-H",themeId:"10-fun",role:"anchor",difficulty:3,cognitive:"Raciocínio",focus:"Monotonia e extremos",
   q:"A função f(x)=−(x−1)²+4 tem máximo igual a...",o:["−4","1","4","5"],a:2,sol:"O vértice é (1,4), logo o máximo é 4.",hyp:"Pode existir dificuldade em interpretar a forma de vértice.",contexts:["diagnostic"],signature:"10-fun:extremos:hard"},

  {id:"D11D-E",themeId:"11-cd",role:"anchor",difficulty:1,cognitive:"Procedimento",focus:"Derivadas",
   q:"Qual é a derivada de f(x)=x²?",o:["x","2x","x²","2"],a:1,sol:"(x²)'=2x.",hyp:"Pode existir uma dificuldade numa regra elementar de derivação.",contexts:["diagnostic"],signature:"11-cd:derivadas:easy"},
  {id:"D11D-H",themeId:"11-cd",role:"anchor",difficulty:3,cognitive:"Raciocínio",focus:"Monotonia e extremos",
   q:"Se f' é positiva antes de x=3 e negativa depois de x=3, então f tem em x=3...",o:["um mínimo local","um máximo local","uma assíntota","um zero obrigatório"],a:1,sol:"A função passa de crescente para decrescente: existe um máximo local.",hyp:"Pode existir dificuldade em ligar o sinal da derivada à monotonia e aos extremos.",contexts:["diagnostic"],signature:"11-cd:extremos:hard"},

  {id:"D12P-E",themeId:"12-prob",role:"anchor",difficulty:1,cognitive:"Compreensão",focus:"Acontecimentos",
   q:"Se P(A)=0,35, qual é P(Aᶜ)?",o:["0,35","0,65","1,35","0"],a:1,sol:"P(Aᶜ)=1−0,35=0,65.",hyp:"Pode existir uma dificuldade numa propriedade elementar da probabilidade.",contexts:["diagnostic"],signature:"12-prob:complementar:easy"},
  {id:"D12P-H",themeId:"12-prob",role:"anchor",difficulty:3,cognitive:"Raciocínio",focus:"Independência",
   q:"P(A)=0,5, P(B)=0,4 e P(A∩B)=0,2. Que conclusão é correta?",o:["A e B são independentes","A e B são incompatíveis","A=B","B é complementar de A"],a:0,sol:"0,5×0,4=0,2, logo os acontecimentos satisfazem o critério de independência.",hyp:"Pode existir dificuldade em distinguir independência de incompatibilidade.",contexts:["diagnostic"],signature:"12-prob:independencia:hard"},

  {id:"D12E-E",themeId:"12-expl",role:"anchor",difficulty:1,cognitive:"Aplicação",focus:"Exponenciais",
   q:"Quanto vale 2³?",o:["5","6","8","9"],a:2,sol:"2³=2×2×2=8.",hyp:"Pode existir uma dificuldade muito básica com potências.",contexts:["diagnostic"],signature:"12-expl:potencias:easy"},
  {id:"D12E-H",themeId:"12-expl",role:"anchor",difficulty:3,cognitive:"Raciocínio",focus:"Equações",
   q:"Se log₂(x)=4, então x é...",o:["6","8","16","32"],a:2,sol:"x=2⁴=16.",hyp:"Pode existir dificuldade em converter entre a forma logarítmica e exponencial.",contexts:["diagnostic"],signature:"12-expl:equacoes:hard"}
];

const CALIBRATION_BANK = [
  {id:"C10EST-1",themeId:"10-est",difficulty:2,cognitive:"Interpretação",focus:"Interpretação de dados",
   q:"Num conjunto de valores, aumentar apenas o maior valor tende a afetar diretamente...",o:["a média","apenas a moda","nunca a mediana","o número de observações"],a:0,
   sol:"A média usa todos os valores e aumenta quando um valor aumenta.",hyp:"Pode haver dificuldade em compreender a sensibilidade da média.",contexts:["mission"],signature:"10-est:media:cal1"},
  {id:"C10GS-1",themeId:"10-gs",difficulty:2,cognitive:"Raciocínio",focus:"Raciocínio geométrico",
   q:"Num triângulo, dois ângulos medem 50° e 60°. O terceiro mede...",o:["60°","70°","80°","110°"],a:1,
   sol:"A soma dos ângulos internos de um triângulo é 180°: 180−110=70.",hyp:"Pode haver dificuldade numa propriedade geométrica elementar.",contexts:["mission"],signature:"10-gs:triangulo:cal1"},
  {id:"C11SUC-1",themeId:"11-suc",difficulty:2,cognitive:"Aplicação",focus:"Termo geral",
   q:"Na sucessão uₙ=2n+1, quanto vale u₅?",o:["6","10","11","12"],a:2,
   sol:"u₅=2×5+1=11.",hyp:"Pode haver dificuldade em substituir o índice no termo geral.",contexts:["mission"],signature:"11-suc:termo:cal1"},
  {id:"C11PE-1",themeId:"11-pe",difficulty:2,cognitive:"Compreensão",focus:"Perpendicularidade",
   q:"Se dois vetores não nulos têm produto escalar igual a zero, então são...",o:["paralelos","perpendiculares","iguais","opostos"],a:1,
   sol:"Produto escalar nulo entre vetores não nulos caracteriza perpendicularidade.",hyp:"Pode haver dificuldade na interpretação geométrica do produto escalar.",contexts:["mission"],signature:"11-pe:perp:cal1"},
  {id:"C12INT-1",themeId:"12-int",difficulty:2,cognitive:"Aplicação",focus:"Primitivas",
   q:"Uma primitiva de f(x)=2x é...",o:["x²","2x²","x","2"],a:0,
   sol:"A derivada de x² é 2x.",hyp:"Pode haver dificuldade na relação entre derivação e primitivação.",contexts:["mission"],signature:"12-int:primitiva:cal1"},
  {id:"C12MAT-1",themeId:"12-mat",difficulty:2,cognitive:"Compreensão",focus:"Operações",
   q:"Se A é uma matriz 2×3 e B uma matriz 3×1, o produto AB terá dimensão...",o:["2×1","3×3","1×2","não existe"],a:0,
   sol:"As dimensões interiores coincidem e permanecem as exteriores: 2×1.",hyp:"Pode haver dificuldade nas regras de dimensão da multiplicação matricial.",contexts:["mission"],signature:"12-mat:dimensoes:cal1"},
  {id:"C12IE-1",themeId:"12-ie",difficulty:2,cognitive:"Compreensão",focus:"Amostras",
   q:"Uma amostra é usada principalmente para...",o:["substituir sempre a população","obter informação sobre uma população","eliminar toda a incerteza","garantir resultados exatos"],a:1,
   sol:"Uma amostra permite inferir características da população, mantendo incerteza.",hyp:"Pode haver dificuldade no papel de uma amostra em inferência estatística.",contexts:["mission"],signature:"12-ie:amostra:cal1"},
  {id:"C12RAE-1",themeId:"12-rae",difficulty:2,cognitive:"Interpretação",focus:"Interpretação gráfica",
   q:"Se os gráficos de y=f(x) e y=g(x) se intersectam em x≈2,3, então 2,3 é aproximadamente solução de...",o:["f(x)=0","g(x)=0","f(x)=g(x)","f(x)+g(x)=0 obrigatoriamente"],a:2,
   sol:"Nos pontos de interseção, as ordenadas das duas funções são iguais.",hyp:"Pode haver dificuldade em interpretar graficamente uma equação.",contexts:["mission"],signature:"12-rae:intersecao:cal1"}
];

export const DIAGNOSTIC_BLUEPRINT = ["10-fun","11-cd","12-prob","10-ga","11-cont","12-expl","12-cplx"];

const diagnostic = DIAG_BANK.map(q=>({
  ...q,
  reviewStatus:q.reviewStatus || "prototype",
  focus:FOCUS_MAP[q.id] || "Geral",
  signature:`${q.themeId}:${FOCUS_MAP[q.id] || "geral"}:${q.id.replace(/-[AP]$/,"")}`,
  contexts:["diagnostic"]
}));

const reusable = [...MISSION_BANK,...EXTRA_BANK].map(q=>({
  ...q,
  reviewStatus:q.reviewStatus || "prototype",
  focus:FOCUS_MAP[q.id] || "Geral",
  signature:`${q.themeId}:${FOCUS_MAP[q.id] || "geral"}:${q.id}`,
  contexts:["mission","training","exam"]
}));

export {TAXONOMY,PREREQUISITES};
export const QUESTION_BANK=[
  ...diagnostic,
  ...PROFILE_DIAG_VARIANTS.map(q=>({...q,reviewStatus:q.reviewStatus||"prototype"})),
  ...reusable,
  ...CALIBRATION_BANK.map(q=>({...q,reviewStatus:q.reviewStatus||"prototype"}))
];
