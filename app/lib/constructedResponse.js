import {canonicalPolynomial,equivalentPolynomial} from "./polynomial.js";
import {scoreIaveStep,iaveSituationLabel,dependentStepCap,applyIaveGlobalPenalties,iaveGlobalPenalty} from "./iaveScoring.js";
const step=(id,label,type,points,expected)=>({id,label,type,points,...expected});

export const CONSTRUCTED_RESPONSE_BANK=[
  {
    id:"CRV2-10FUN-STEPS-1",themeId:"10-fun",subtopicId:"10-fun-dominio-imagem-zeros",
    microcompetencyId:"mc-10-fun-dominio-e-zeros",focus:"Domínio e zeros",difficulty:2,cognitive:"Raciocínio",
    q:"Considera a função f(x)=3x−12. Determina o zero de f e apresenta o teu raciocínio.",
    response:{type:"stepwise",steps:[
      step("equation","1. Equação que permite determinar o zero","expression",10,{accepted:["3x-12=0","0=3x-12"],expected:"3x−12=0",placeholder:"Ex.: 3x−12=0"}),
      step("value","2. Valor obtido para x","numeric",15,{value:4,tolerance:0,expected:"x=4",placeholder:"Ex.: 4"}),
      step("conclusion","3. Conclusão por palavras","text",10,{conceptGroups:[["zero","raiz"],["4"]],expected:"O zero de f é 4.",placeholder:"Explica o que representa o valor obtido."})
    ]},
    points:35,sol:"O zero verifica f(x)=0. Assim, 3x−12=0, logo x=4; portanto, o zero de f é 4.",
    hyp:"Pode existir dificuldade em ligar o zero à equação f(x)=0 ou em concluir o raciocínio.",
    contexts:["exam"],signature:"10-fun:Domínio e zeros:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-10GA-STEPS-1",themeId:"10-ga",subtopicId:"10-ga-colinearidade-retas",
    microcompetencyId:"mc-10-ga-retas-e-planos",focus:"Retas e planos",difficulty:2,cognitive:"Raciocínio",
    q:"Determina o declive da reta que passa pelos pontos A(1,2) e B(5,4). Apresenta e justifica os cálculos.",
    response:{type:"stepwise",steps:[
      step("deltaY","1. Variação das ordenadas, Δy","numeric",8,{value:2,tolerance:0,expected:"Δy=2",placeholder:"Ex.: 2"}),
      step("deltaX","2. Variação das abcissas, Δx","numeric",8,{value:4,tolerance:0,expected:"Δx=4",placeholder:"Ex.: 4"}),
      step("slope","3. Declive na forma de fração","fraction",12,{numerator:1,denominator:2,expected:"m=1/2",placeholder:"Ex.: 1/2"}),
      step("conclusion","4. Justificação por palavras","text",7,{conceptGroups:[["declive","m"],["ordenadas","delta y","variacao de y"],["abcissas","delta x","variacao de x"]],expected:"O declive é o quociente entre a variação das ordenadas e a variação das abcissas.",placeholder:"Explica por que dividiste estes dois valores."})
    ]},
    points:35,sol:"Δy=4−2=2 e Δx=5−1=4. Assim, m=Δy/Δx=2/4=1/2.",
    hyp:"Pode existir dificuldade em calcular as variações, simplificar o declive ou justificar o quociente.",
    contexts:["exam"],signature:"10-ga:Retas e planos:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-11CD-STEPS-1",themeId:"11-cd",subtopicId:"11-cd-derivada-ponto",
    microcompetencyId:"mc-11-cd-derivadas",focus:"Derivadas",difficulty:3,cognitive:"Raciocínio",
    q:"Seja f(x)=x³−2x. Calcula f′(2), apresentando todas as etapas.",
    response:{type:"stepwise",steps:[
      step("derivative","1. Expressão de f′(x)","expression",15,{accepted:["f'(x)=3x^2-2","3x^2-2","f′(x)=3x^2-2"],conceptualErrorAccepted:["f'(x)=3x^2","3x^2"],expected:"f′(x)=3x²−2",placeholder:"Ex.: 3x^2−2"}),
      step("substitution","2. Substituição de x=2","expression",8,{prefixes:["f'(2)"],accepted:["3*2^2-2","3x2^2-2","3·2^2-2","3(2)^2-2"],errorEffects:[
        {from:"derivative",reasons:["conceptual_error"],accepted:["3*2^2","3×2²","3(2)^2"],difficultyReduced:true}
      ],expected:"3×2²−2",placeholder:"Ex.: 3×2^2−2"}),
      step("value","3. Valor de f′(2)","numeric",12,{value:10,tolerance:0,errorEffects:[
        {from:"derivative",reasons:["conceptual_error"],accepted:["12","f'(2)=12","f′(2)=12"],difficultyReduced:true}
      ],expected:"f′(2)=10",placeholder:"Ex.: 10"})
    ]},
    points:35,sol:"f′(x)=3x²−2. Logo, f′(2)=3×2²−2=10.",
    hyp:"Pode existir dificuldade na regra da potência, na substituição ou no cálculo final.",
    contexts:["exam"],signature:"11-cd:Derivadas:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-11CONT-STEPS-1",themeId:"11-cont",subtopicId:"11-cont-combinacoes",
    microcompetencyId:"mc-11-cont-combinacoes",focus:"Combinações",difficulty:2,cognitive:"Raciocínio",
    q:"De um grupo de 5 alunos, determina quantas comissões diferentes de 2 alunos podem ser formadas. Justifica o modelo usado.",
    response:{type:"stepwise",steps:[
      step("model","1. Porque usas uma combinação?","text",8,{conceptGroups:[["ordem"],["nao interessa","nao e importante","irrelevante"]],expected:"Usa-se uma combinação porque a ordem dos alunos não interessa.",placeholder:"Justifica por palavras."}),
      step("expression","2. Expressão de cálculo","expression",12,{accepted:["c(5,2)","5!/(2!3!)","5!/(2!*3!)","5!/(2!x3!)"],expected:"C(5,2)=5!/(2!3!)",placeholder:"Ex.: C(5,2)"}),
      step("value","3. Número de comissões","numeric",15,{value:10,tolerance:0,expected:"10",placeholder:"Ex.: 10"})
    ]},
    points:35,sol:"Como a ordem não interessa, usa-se uma combinação: C(5,2)=5!/(2!3!)=10.",
    hyp:"Pode existir dificuldade em reconhecer que a ordem não interessa ou em calcular a combinação.",
    contexts:["exam"],signature:"11-cont:Combinações:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12FCONT-STEPS-1",themeId:"12-fcont",subtopicId:"12-fcont-limites-continuidade",
    microcompetencyId:"mc-12-fcont-limites",focus:"Limites",difficulty:3,cognitive:"Raciocínio",
    q:"Calcula lim(x→3) (x²−9)/(x−3), apresentando a resolução e justificando a conclusão.",
    response:{type:"stepwise",steps:[
      step("factorization","1. Fatorização de x²−9","expression",10,{accepted:["(x-3)(x+3)","(x+3)(x-3)"],expected:"(x−3)(x+3)",placeholder:"Ex.: (x−3)(x+3)"}),
      step("simplification","2. Expressão simplificada para x≠3","expression",10,{accepted:["x+3"],expected:"x+3",placeholder:"Ex.: x+3"}),
      step("conclusion","3. Conclusão justificada","text",15,{conceptGroups:[["continua","continuidade","substituir","substituicao"],["3"],["6"]],expected:"Como x+3 é contínua, substitui-se x=3 e o limite é 6.",placeholder:"Explica por palavras por que o limite é 6."})
    ]},
    points:35,sol:"x²−9=(x−3)(x+3). Para x≠3, o quociente simplifica-se para x+3. Como esta função é contínua, o limite é 3+3=6.",
    hyp:"Pode existir dificuldade na fatorização, na condição x≠3 ou na justificação por continuidade.",
    contexts:["exam"],signature:"12-fcont:Limites:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12INT-STEPS-1",themeId:"12-int",subtopicId:"12-int-integral-definido",
    microcompetencyId:"mc-12-int-integral-definido",focus:"Integral definido",difficulty:3,cognitive:"Raciocínio",
    q:"Calcula ∫₀¹ x dx, apresentando a primitiva e a aplicação da regra de Barrow.",
    response:{type:"stepwise",steps:[
      step("primitive","1. Uma primitiva de x","expression",15,{accepted:["x^2/2","(x^2)/2","1/2x^2","x²/2"],conceptualErrorAccepted:["x^2","x²"],expected:"x²/2",placeholder:"Ex.: x^2/2"}),
      step("barrow","2. Aplicação nos extremos","expression",10,{accepted:["1^2/2-0^2/2","(1^2)/2-(0^2)/2","1/2-0"],errorEffects:[
        {from:"primitive",reasons:["conceptual_error"],accepted:["1^2-0^2","1²−0²"],difficultyReduced:false}
      ],expected:"1²/2−0²/2",placeholder:"Ex.: 1^2/2−0^2/2"}),
      step("value","3. Valor exato do integral","fraction",10,{numerator:1,denominator:2,errorEffects:[
        {from:"primitive",reasons:["conceptual_error"],accepted:["1"],difficultyReduced:false}
      ],expected:"1/2",placeholder:"Ex.: 1/2"})
    ]},
    points:35,sol:"Uma primitiva de x é x²/2. Pela regra de Barrow, [x²/2]₀¹=1²/2−0²/2=1/2.",
    hyp:"Pode existir dificuldade em determinar a primitiva, aplicar os extremos ou manter o valor exato.",
    contexts:["exam"],signature:"12-int:Integral definido:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-10FIN-STEPS-1",themeId:"10-fin",subtopicId:"10-fin-juro-simples",
    microcompetencyId:"mc-10-fin-juros",focus:"Juros",difficulty:2,cognitive:"Modelação",
    q:"Uma aplicação de 1000 € rende juros simples à taxa anual de 5%. Determina o capital ao fim de um ano e apresenta os cálculos.",
    response:{type:"stepwise",steps:[
      step("interest","1. Valor dos juros","numeric",12,{value:50,tolerance:0,expected:"J=50",placeholder:"Ex.: J=50"}),
      step("capital","2. Capital ao fim de um ano","numeric",15,{value:1050,tolerance:0,expected:"C=1050",placeholder:"Ex.: C=1050"}),
      step("conclusion","3. Conclusão com unidade","text",8,{accepted:["O capital ao fim de um ano é 1050 €.","Ao fim de um ano, o capital é 1050 €."],expected:"O capital ao fim de um ano é 1050 €.",placeholder:"Conclui com a unidade monetária."})
    ]},
    points:35,sol:"Os juros são 1000×0,05=50 €. Logo, o capital ao fim de um ano é 1000+50=1050 €.",
    hyp:"Pode existir dificuldade em distinguir o juro obtido do capital acumulado.",
    contexts:["exam"],signature:"10-fin:Juros:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-10EST-STEPS-1",themeId:"10-est",subtopicId:"10-est-localizacao",
    microcompetencyId:"mc-10-est-medidas-estatisticas",focus:"Medidas estatísticas",difficulty:2,cognitive:"Procedimento",
    q:"Considera os valores 2, 4, 4 e 6. Calcula a média e apresenta os cálculos.",
    response:{type:"stepwise",steps:[
      step("sum","1. Soma dos valores","numeric",10,{value:16,tolerance:0,expected:"S=16",placeholder:"Ex.: S=16"}),
      step("count","2. Número de observações","numeric",8,{value:4,tolerance:0,expected:"n=4",placeholder:"Ex.: n=4"}),
      step("mean","3. Valor da média","numeric",17,{value:4,tolerance:0,expected:"média=4",placeholder:"Ex.: média=4"})
    ]},
    points:35,sol:"A soma é 2+4+4+6=16. Como existem quatro observações, a média é 16/4=4.",
    hyp:"Pode existir dificuldade em dividir a soma pelo número correto de observações.",
    contexts:["exam"],signature:"10-est:Medidas estatísticas:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-11TRIG-STEPS-1",themeId:"11-trig",subtopicId:"11-trig-equacoes",
    microcompetencyId:"mc-11-trig-equacoes-trigonometricas",focus:"Equações trigonométricas",difficulty:3,cognitive:"Raciocínio",
    q:"Resolve sin(x)=1/2 no intervalo [0,2π], apresentando as soluções nesse intervalo.",
    response:{type:"stepwise",steps:[
      step("reference","1. Ângulo de referência","expression",10,{accepted:["pi/6","π/6","x=pi/6","x=π/6"],expected:"π/6",placeholder:"Ex.: π/6"}),
      step("second","2. Segunda solução no intervalo","expression",12,{accepted:["5pi/6","5π/6","x=5pi/6","x=5π/6"],expected:"5π/6",placeholder:"Ex.: 5π/6"}),
      step("set","3. Conjunto-solução","expression",13,{accepted:["{pi/6,5pi/6}","{π/6,5π/6}","s={pi/6,5pi/6}","s={π/6,5π/6}"],expected:"S={π/6,5π/6}",placeholder:"Ex.: S={π/6,5π/6}"})
    ]},
    points:35,sol:"No círculo trigonométrico, o seno vale 1/2 no primeiro e no segundo quadrantes. Assim, x=π/6 ou x=5π/6.",
    hyp:"Pode existir dificuldade em encontrar a solução do segundo quadrante ou em respeitar o intervalo.",
    contexts:["exam"],signature:"11-trig:Equações trigonométricas:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-11PE-STEPS-1",themeId:"11-pe",subtopicId:"11-pe-produto-coordenadas",
    microcompetencyId:"mc-11-pe-produto-escalar",focus:"Produto escalar",difficulty:2,cognitive:"Procedimento",
    q:"Dados os vetores u=(2,−1) e v=(3,4), calcula u·v e conclui se são perpendiculares.",
    response:{type:"stepwise",steps:[
      step("expression","1. Expressão do produto escalar","expression",12,{accepted:["2*3+(-1)*4","2x3+(-1)x4","2×3+(−1)×4","2*3-1*4"],expected:"2×3+(−1)×4",placeholder:"Ex.: 2×3+(−1)×4"}),
      step("value","2. Valor do produto escalar","numeric",13,{value:2,tolerance:0,expected:"u·v=2",placeholder:"Ex.: u·v=2"}),
      step("conclusion","3. Conclusão geométrica","text",10,{accepted:["Os vetores não são perpendiculares porque o produto escalar não é zero.","Como u·v não é zero, os vetores não são perpendiculares."],expected:"Os vetores não são perpendiculares porque o produto escalar não é zero.",placeholder:"Relaciona o resultado com a perpendicularidade."})
    ]},
    points:35,sol:"u·v=2×3+(−1)×4=6−4=2. Como o produto escalar não é zero, os vetores não são perpendiculares.",
    hyp:"Pode existir dificuldade no sinal da segunda componente ou no critério de perpendicularidade.",
    contexts:["exam"],signature:"11-pe:Produto escalar:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-11SUC-STEPS-1",themeId:"11-suc",subtopicId:"11-suc-pa",
    microcompetencyId:"mc-11-suc-progressoes",focus:"Progressões",difficulty:2,cognitive:"Aplicação",
    q:"Numa progressão aritmética, u₁=3 e a razão é 2. Determina u₁₀, apresentando a expressão usada.",
    response:{type:"stepwise",steps:[
      step("formula","1. Expressão do termo geral","expression",12,{accepted:["u_n=3+(n-1)*2","un=3+(n-1)*2","3+(n-1)*2","u_n=3+2(n-1)"],conceptualErrorAccepted:["u_n=3+2n","un=3+2n","3+2n"],expected:"uₙ=3+2(n−1)",placeholder:"Ex.: u_n=3+2(n−1)"}),
      step("substitution","2. Substituição de n=10","expression",10,{accepted:["3+2*(10-1)","3+2(10-1)","3+(10-1)*2"],errorEffects:[
        {from:"formula",reasons:["conceptual_error"],accepted:["3+2*10","3+2(10)","3+20"],difficultyReduced:false}
      ],expected:"3+2(10−1)",placeholder:"Ex.: 3+2(10−1)"}),
      step("value","3. Valor de u₁₀","numeric",13,{value:21,tolerance:0,errorEffects:[
        {from:"formula",reasons:["conceptual_error"],accepted:["23","u_10=23","u₁₀=23"],difficultyReduced:false}
      ],expected:"u₁₀=21",placeholder:"Ex.: u₁₀=21"})
    ]},
    points:35,sol:"Numa progressão aritmética, uₙ=u₁+(n−1)r. Logo, u₁₀=3+(10−1)×2=21.",
    hyp:"Pode existir dificuldade em usar n−1 ou em substituir corretamente o índice.",
    contexts:["exam"],signature:"11-suc:Progressões:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12CPLX-STEPS-1",themeId:"12-cplx",subtopicId:"12-cplx-operacoes-algebricas",
    microcompetencyId:"mc-12-cplx-forma-algebrica",focus:"Forma algébrica",difficulty:2,cognitive:"Procedimento",
    q:"Calcula (2+i)+(1−3i) e apresenta o resultado na forma algébrica a+bi.",
    response:{type:"stepwise",steps:[
      step("real","1. Soma das partes reais","numeric",10,{value:3,tolerance:0,expected:"a=3",placeholder:"Ex.: a=3"}),
      step("imaginary","2. Soma dos coeficientes de i","numeric",10,{value:-2,tolerance:0,expected:"b=−2",placeholder:"Ex.: b=−2"}),
      step("result","3. Resultado na forma algébrica","expression",15,{accepted:["3-2i","z=3-2i","3+(-2)i","3+(−2)i"],expected:"3−2i",placeholder:"Ex.: 3−2i"})
    ]},
    points:35,sol:"Somam-se separadamente as partes reais e imaginárias: (2+1)+(1−3)i=3−2i.",
    hyp:"Pode existir dificuldade em combinar corretamente os coeficientes da parte imaginária.",
    contexts:["exam"],signature:"12-cplx:Forma algébrica:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12PROB-STEPS-1",themeId:"12-prob",subtopicId:"12-prob-propriedades",
    microcompetencyId:"mc-12-prob-regra-de-laplace",focus:"Regra de Laplace",difficulty:2,cognitive:"Raciocínio",
    q:"Um saco contém 3 bolas vermelhas e 2 azuis. Retira-se uma bola ao acaso. Calcula a probabilidade de sair vermelha e justifica pela regra de Laplace.",
    response:{type:"stepwise",steps:[
      step("favourable","1. Casos favoráveis","numeric",8,{value:3,tolerance:0,expected:"favoráveis=3",placeholder:"Ex.: favoráveis=3"}),
      step("possible","2. Casos possíveis","numeric",8,{value:5,tolerance:0,expected:"possíveis=5",placeholder:"Ex.: possíveis=5"}),
      step("probability","3. Probabilidade","fraction",12,{numerator:3,denominator:5,expected:"P(V)=3/5",placeholder:"Ex.: P(V)=3/5"}),
      step("conclusion","4. Justificação","text",7,{accepted:["Pela regra de Laplace, divide-se o número de casos favoráveis pelo número de casos possíveis.","A probabilidade é o quociente entre os casos favoráveis e os casos possíveis."],expected:"Pela regra de Laplace, divide-se o número de casos favoráveis pelo número de casos possíveis.",placeholder:"Explica o quociente usado."})
    ]},
    points:35,sol:"Existem 3 casos favoráveis e 5 casos possíveis, todos equiprováveis. Pela regra de Laplace, P(V)=3/5.",
    hyp:"Pode existir dificuldade em identificar o total de casos ou em inverter o quociente.",
    contexts:["exam"],signature:"12-prob:Regra de Laplace:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12EXPL-STEPS-1",themeId:"12-expl",subtopicId:"12-expl-equacoes",
    microcompetencyId:"mc-12-expl-equacoes",focus:"Equações",difficulty:2,cognitive:"Raciocínio",
    q:"Resolve a equação 2ˣ=8, apresentando o raciocínio que permite determinar x.",
    response:{type:"stepwise",steps:[
      step("rewrite","1. Escrita de 8 como potência de base 2","expression",12,{accepted:["8=2^3","2^3=8"],expected:"8=2³",placeholder:"Ex.: 8=2^3"}),
      step("equation","2. Igualdade entre potências","expression",10,{accepted:["2^x=2^3","2ˣ=2³"],expected:"2ˣ=2³",placeholder:"Ex.: 2^x=2^3"}),
      step("value","3. Solução da equação","numeric",13,{value:3,tolerance:0,expected:"x=3",placeholder:"Ex.: x=3"})
    ]},
    points:35,sol:"Como 8=2³, a equação fica 2ˣ=2³. Sendo as bases iguais, os expoentes são iguais, logo x=3.",
    hyp:"Pode existir dificuldade em escrever 8 como potência ou em usar a injetividade da exponencial.",
    contexts:["exam"],signature:"12-expl:Equações:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-10FUN-EXT-STEPS-1",themeId:"10-fun",subtopicId:"10-fun-quadratica",
    microcompetencyId:"mc-10-fun-monotonia-e-extremos",focus:"Monotonia e extremos",difficulty:3,cognitive:"Raciocínio",
    q:"Considera f(x)=x²−4x+1. Determina o mínimo de f e o valor de x onde é atingido, apresentando os cálculos.",
    response:{type:"stepwise",steps:[
      step("form","1. Escrita na forma de vértice","expression",12,{accepted:["(x-2)^2-3","f(x)=(x-2)^2-3","(x−2)²−3"],expected:"f(x)=(x−2)²−3",placeholder:"Ex.: f(x)=(x−2)^2−3"}),
      step("abscissa","2. Abscissa do vértice","numeric",8,{value:2,tolerance:0,expected:"x=2",placeholder:"Ex.: x=2"}),
      step("minimum","3. Valor mínimo","numeric",8,{value:-3,tolerance:0,expected:"mínimo=−3",placeholder:"Ex.: mínimo=−3"}),
      step("conclusion","4. Conclusão","text",7,{accepted:["O mínimo de f é −3 e é atingido em x=2.","A função atinge o mínimo −3 quando x=2."],expected:"O mínimo de f é −3 e é atingido em x=2.",placeholder:"Indica o mínimo e onde ocorre."})
    ]},
    points:35,sol:"f(x)=x²−4x+1=(x−2)²−3. Como (x−2)²≥0, o mínimo é −3 e ocorre quando x=2.",
    hyp:"Pode existir dificuldade em completar o quadrado ou distinguir as coordenadas do vértice.",
    contexts:["exam"],signature:"10-fun:Monotonia e extremos:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-10GA-VET-STEPS-1",themeId:"10-ga",subtopicId:"10-ga-vetores",
    microcompetencyId:"mc-10-ga-vetores",focus:"Vetores",difficulty:2,cognitive:"Procedimento",
    q:"Dados A(1,2) e B(4,6), determina o vetor AB e o seu comprimento.",
    response:{type:"stepwise",steps:[
      step("dx","1. Variação da primeira coordenada","numeric",7,{value:3,tolerance:0,expected:"Δx=3",placeholder:"Ex.: Δx=3"}),
      step("dy","2. Variação da segunda coordenada","numeric",7,{value:4,tolerance:0,expected:"Δy=4",placeholder:"Ex.: Δy=4"}),
      step("vector","3. Coordenadas do vetor AB","expression",10,{accepted:["(3,4)","ab=(3,4)","vetorab=(3,4)"],expected:"AB=(3,4)",placeholder:"Ex.: AB=(3,4)"}),
      step("length","4. Comprimento do vetor","numeric",11,{value:5,tolerance:0,expected:"|AB|=5",placeholder:"Ex.: |AB|=5"})
    ]},
    points:35,sol:"AB=(4−1,6−2)=(3,4). O comprimento é √(3²+4²)=√25=5.",
    hyp:"Pode existir dificuldade na ordem da subtração ou no cálculo da norma.",
    contexts:["exam"],signature:"10-ga:Vetores:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-11CD-MON-STEPS-1",themeId:"11-cd",subtopicId:"11-cd-monotonia-otimizacao",
    microcompetencyId:"mc-11-cd-monotonia-e-extremos",focus:"Monotonia e extremos",difficulty:3,cognitive:"Raciocínio",
    q:"Estuda a monotonia de f(x)=x²−4x e identifica o extremo da função.",
    response:{type:"stepwise",steps:[
      step("derivative","1. Derivada de f","expression",10,{accepted:["f'(x)=2x-4","2x-4","f′(x)=2x−4"],expected:"f′(x)=2x−4",placeholder:"Ex.: f'(x)=2x−4"}),
      step("critical","2. Ponto onde f′(x)=0","numeric",8,{value:2,tolerance:0,expected:"x=2",placeholder:"Ex.: x=2"}),
      step("variation","3. Intervalos de monotonia","expression",10,{accepted:["decrescente em ]-infinito,2[ e crescente em ]2,+infinito[","decrescente em ]−∞,2[ e crescente em ]2,+∞[","f decresce se x<2 e cresce se x>2"],expected:"f decresce se x<2 e cresce se x>2",placeholder:"Indica onde decresce e onde cresce."}),
      step("extreme","4. Extremo","text",7,{accepted:["f tem mínimo −4 em x=2.","A função atinge o mínimo −4 quando x=2."],expected:"f tem mínimo −4 em x=2.",placeholder:"Indica o tipo, valor e localização do extremo."})
    ]},
    points:35,sol:"f′(x)=2x−4, que se anula em x=2. A derivada é negativa antes de 2 e positiva depois de 2; f decresce e depois cresce, tendo mínimo f(2)=−4.",
    hyp:"Pode existir dificuldade em relacionar o sinal da derivada com a monotonia e o extremo.",
    contexts:["exam"],signature:"11-cd:Monotonia e extremos:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12FCD-CHAIN-STEPS-1",themeId:"12-fcd",subtopicId:"12-fcd-regras-cadeia",
    microcompetencyId:"mc-12-fcd-regra-da-cadeia",focus:"Regra da cadeia",difficulty:3,cognitive:"Procedimento",
    q:"Seja f(x)=(x²+1)³. Determina f′(x), explicitando a aplicação da regra da cadeia.",
    response:{type:"stepwise",steps:[
      step("inner","1. Função interior","expression",7,{accepted:["u=x^2+1","x^2+1","u=x²+1"],expected:"u=x²+1",placeholder:"Ex.: u=x^2+1"}),
      step("outer","2. Derivada da função exterior","expression",8,{accepted:["3u^2","3u²"],expected:"3u²",placeholder:"Ex.: 3u^2"}),
      step("innerDerivative","3. Derivada da função interior","expression",8,{accepted:["u'=2x","2x","u′=2x"],expected:"u′=2x",placeholder:"Ex.: u'=2x"}),
      step("result","4. Derivada final","expression",12,{accepted:["f'(x)=6x(x^2+1)^2","6x(x^2+1)^2","f′(x)=6x(x²+1)²"],expected:"f′(x)=6x(x²+1)²",placeholder:"Ex.: f'(x)=6x(x^2+1)^2"})
    ]},
    points:35,sol:"Tomando u=x²+1, tem-se f=u³, logo f′=3u²×u′. Como u′=2x, resulta f′(x)=6x(x²+1)².",
    hyp:"Pode existir dificuldade em multiplicar pela derivada da função interior.",
    contexts:["exam"],signature:"12-fcd:Regra da cadeia:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12FCONT-ASS-STEPS-1",themeId:"12-fcont",subtopicId:"12-fcont-estudo-global",
    microcompetencyId:"mc-12-fcont-assintotas",focus:"Assíntotas",difficulty:3,cognitive:"Raciocínio",
    q:"Considera f(x)=(2x+1)/(x−3). Determina as assíntotas vertical e horizontal, justificando os valores obtidos.",
    response:{type:"stepwise",steps:[
      step("excluded","1. Zero do denominador","numeric",7,{value:3,tolerance:0,expected:"x=3",placeholder:"Ex.: x=3"}),
      step("vertical","2. Assíntota vertical","expression",9,{accepted:["x=3"],expected:"x=3",placeholder:"Ex.: x=3"}),
      step("ratio","3. Quociente dos coeficientes dominantes","numeric",8,{value:2,tolerance:0,expected:"2/1=2",placeholder:"Ex.: 2"}),
      step("horizontal","4. Assíntota horizontal","expression",11,{accepted:["y=2"],expected:"y=2",placeholder:"Ex.: y=2"})
    ]},
    points:35,sol:"O denominador anula-se em x=3 e o numerador não, logo x=3 é assíntota vertical. Como numerador e denominador têm o mesmo grau, o limite no infinito é 2/1=2; portanto, y=2 é assíntota horizontal.",
    hyp:"Pode existir dificuldade em distinguir a condição da assíntota vertical da comparação dos termos dominantes.",
    contexts:["exam"],signature:"12-fcont:Assíntotas:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12RAE-STEPS-1",themeId:"12-rae",subtopicId:"12-rae-bolzano-localizacao",
    microcompetencyId:"mc-12-rae-aproximacoes",focus:"Aproximações",difficulty:2,cognitive:"Validação",
    q:"Mostra que √2 pertence ao intervalo ]1,41;1,42[, comparando os quadrados dos extremos com 2.",
    response:{type:"stepwise",steps:[
      step("lower","1. Quadrado do extremo inferior","numeric",10,{value:1.9881,tolerance:0.00001,expected:"1,41²=1,9881",placeholder:"Ex.: 1,9881"}),
      step("upper","2. Quadrado do extremo superior","numeric",10,{value:2.0164,tolerance:0.00001,expected:"1,42²=2,0164",placeholder:"Ex.: 2,0164"}),
      step("comparison","3. Comparação","expression",8,{accepted:["1.9881<2<2.0164","1,9881<2<2,0164"],incompleteAccepted:[
        {value:"1,9881<2<1,42²",missingOnlyFinalPassage:true},
        {value:"1,9881<2",missingOnlyFinalPassage:false}
      ],expected:"1,9881<2<2,0164",placeholder:"Ex.: 1,9881<2<2,0164"}),
      step("conclusion","4. Conclusão","text",7,{accepted:["Logo, 1,41<√2<1,42.","Conclui-se que √2 pertence a ]1,41;1,42[."],expected:"Logo, 1,41<√2<1,42.",placeholder:"Conclui a localização de √2."})
    ]},
    points:35,sol:"1,41²=1,9881<2 e 1,42²=2,0164>2. Como os números são positivos, conclui-se que 1,41<√2<1,42.",
    hyp:"Pode existir dificuldade em usar os quadrados para justificar a localização da raiz.",
    contexts:["exam"],signature:"12-rae:Aproximações:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12INT-AREA-STEPS-1",themeId:"12-int",subtopicId:"12-int-areas",
    microcompetencyId:"mc-12-int-areas",focus:"Áreas",difficulty:2,cognitive:"Aplicação",
    q:"Calcula a área limitada pelo gráfico de y=x, pelo eixo Ox e pelas retas x=0 e x=2.",
    response:{type:"stepwise",steps:[
      step("integral","1. Integral que representa a área","expression",10,{accepted:["integral_0^2 x dx","∫₀²x dx","∫₀² x dx"],expected:"∫₀² x dx",placeholder:"Ex.: ∫₀² x dx"}),
      step("primitive","2. Primitiva usada","expression",8,{accepted:["x^2/2","x²/2"],expected:"x²/2",placeholder:"Ex.: x^2/2"}),
      step("barrow","3. Aplicação nos extremos","expression",9,{accepted:["2^2/2-0^2/2","4/2-0"],expected:"2²/2−0²/2",placeholder:"Ex.: 2^2/2−0^2/2"}),
      step("area","4. Valor da área","numeric",8,{value:2,tolerance:0,expected:"A=2",placeholder:"Ex.: A=2"})
    ]},
    points:35,sol:"Como x≥0 em [0,2], a área é ∫₀²x dx=[x²/2]₀²=2²/2−0²/2=2.",
    hyp:"Pode existir dificuldade em traduzir a região para um integral ou em aplicar os extremos.",
    contexts:["exam"],signature:"12-int:Áreas:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12CPLX-MOD-STEPS-1",themeId:"12-cplx",subtopicId:"12-cplx-conjugado-modulo",
    microcompetencyId:"mc-12-cplx-modulo-e-argumento",focus:"Módulo e argumento",difficulty:2,cognitive:"Procedimento",
    q:"Determina o módulo do número complexo z=3−4i, apresentando os cálculos.",
    response:{type:"stepwise",steps:[
      step("squares","1. Soma dos quadrados das componentes","expression",10,{accepted:["3^2+(-4)^2","3²+(−4)²","9+16"],expected:"3²+(−4)²",placeholder:"Ex.: 3^2+(−4)^2"}),
      step("sum","2. Valor dentro da raiz","numeric",8,{value:25,tolerance:0,expected:"25",placeholder:"Ex.: 25"}),
      step("root","3. Cálculo da raiz","expression",8,{accepted:["sqrt(25)=5","√25=5","raiz(25)=5"],expected:"√25=5",placeholder:"Ex.: √25=5"}),
      step("modulus","4. Módulo de z","numeric",9,{value:5,tolerance:0,expected:"|z|=5",placeholder:"Ex.: |z|=5"})
    ]},
    points:35,sol:"|z|=√(3²+(−4)²)=√(9+16)=√25=5.",
    hyp:"Pode existir dificuldade em usar ambas as componentes ou em tratar o quadrado da parte imaginária.",
    contexts:["exam"],signature:"12-cplx:Módulo e argumento:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-10ELE-DHONDT-STEPS-1",themeId:"10-ele",subtopicId:"10-ele-dhondt",
    microcompetencyId:"mc-10-ele-metodos-de-votacao",focus:"Método de D'Hondt",difficulty:3,cognitive:"Aplicação",
    q:"As listas A, B e C obtiveram, respetivamente, 4800, 2800 e 1200 votos. Distribui quatro mandatos pelo método de D'Hondt, apresentando os quocientes decisivos.",
    response:{type:"stepwise",steps:[
      step("quotientsA","1. Quocientes relevantes da lista A","expression",10,{accepted:["A={4800;2400;1600;1200}"],expected:"A={4800;2400;1600;1200}",placeholder:"Ex.: A={4800;2400;1600;1200}"}),
      step("ranking","2. Quatro maiores quocientes por ordem","expression",12,{accepted:["4800(A)>2800(B)>2400(A)>1600(A)"],incompleteAccepted:[
        {value:"4800(A)>2800(B)>2400(A)",missingOnlyFinalPassage:true},
        {value:"4800(A)>2800(B)",missingOnlyFinalPassage:false}
      ],expected:"4800(A)>2800(B)>2400(A)>1600(A)",placeholder:"Ordena os quatro quocientes decisivos."}),
      step("allocation","3. Distribuição dos mandatos","expression",13,{accepted:["A=3;B=1;C=0","A:3;B:1;C:0"],expected:"A=3; B=1; C=0",placeholder:"Ex.: A=3; B=1; C=0"})
    ]},
    points:35,sol:"Os quatro maiores quocientes são 4800 (A), 2800 (B), 2400 (A) e 1600 (A). Assim, A recebe 3 mandatos, B recebe 1 e C não recebe mandatos.",
    hyp:"Pode existir dificuldade em ordenar quocientes de listas diferentes ou em contar os mandatos atribuídos.",
    contexts:["exam"],signature:"10-ele:D'Hondt:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-10GS-BAR-STEPS-1",themeId:"10-gs",subtopicId:"10-gs-baricentro-medianas",
    microcompetencyId:"mc-10-gs-raciocinio-geometrico",focus:"Baricentro",difficulty:2,cognitive:"Raciocínio",
    q:"Num referencial, considera A(0,0), B(6,0) e C(0,3). Determina as coordenadas do baricentro G do triângulo ABC.",
    response:{type:"stepwise",steps:[
      step("formula","1. Aplicação da fórmula do baricentro","expression",8,{accepted:["G=((0+6+0)/3,(0+0+3)/3)"],expected:"G=((0+6+0)/3,(0+0+3)/3)",placeholder:"Escreve a média de cada coordenada."}),
      step("xg","2. Abcissa do baricentro","numeric",9,{value:2,tolerance:0,expected:"xG=2",prefixes:["x_G","xg"],placeholder:"Ex.: xG=2"}),
      step("yg","3. Ordenada do baricentro","numeric",9,{value:1,tolerance:0,expected:"yG=1",prefixes:["y_G","yg"],placeholder:"Ex.: yG=1"}),
      step("point","4. Coordenadas de G","expression",9,{accepted:["G=(2,1)","(2,1)"],expected:"G=(2,1)",placeholder:"Ex.: G=(2,1)"})
    ]},
    points:35,sol:"As coordenadas do baricentro são as médias das coordenadas dos vértices: G=((0+6+0)/3,(0+0+3)/3)=(2,1).",
    hyp:"Pode existir dificuldade em calcular separadamente a média das abcissas e a média das ordenadas.",
    contexts:["exam"],signature:"10-gs:Baricentro:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-11FUN-RUFFINI-STEPS-1",themeId:"11-fun",subtopicId:"11-fun-divisao-polinomios",
    microcompetencyId:"mc-11-fun-transformacoes",focus:"Divisão de polinómios",difficulty:3,cognitive:"Raciocínio",
    q:"Considera P(x)=x³−4x²+x+6. Verifica que 2 é uma raiz e fatoriza completamente P.",
    response:{type:"stepwise",steps:[
      step("verification","1. Verificação de P(2)","expression",10,{accepted:["P(2)=8-16+2+6=0","8-16+2+6=0"],expected:"P(2)=8−16+2+6=0",placeholder:"Substitui x por 2."}),
      step("quotient","2. Quociente da divisão por x−2","expression",12,{accepted:["x^2-2x-3","x²−2x−3"],expected:"x²−2x−3",placeholder:"Aplica Ruffini ou a divisão de polinómios."}),
      step("factorization","3. Fatorização completa","expression",13,{accepted:["(x-2)(x-3)(x+1)","P(x)=(x-2)(x-3)(x+1)"],incompleteAccepted:[
        {value:"P(x)=(x−2)(x²−2x−3)",missingOnlyFinalPassage:true},
        {value:"P(x)=(x−2)Q(x)",missingOnlyFinalPassage:false}
      ],expected:"P(x)=(x−2)(x−3)(x+1)",placeholder:"Ex.: P(x)=(x−2)…"})
    ]},
    points:35,sol:"P(2)=8−16+2+6=0, logo x−2 é fator. A divisão dá x²−2x−3=(x−3)(x+1). Portanto, P(x)=(x−2)(x−3)(x+1).",
    hyp:"Pode existir dificuldade em ligar o resto nulo ao fator x−2 ou em fatorizar o quociente.",
    contexts:["exam"],signature:"11-fun:Ruffini:Divisão de polinómios:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12IE-IC-STEPS-1",themeId:"12-ie",subtopicId:"12-ie-intervalos-confianca",
    microcompetencyId:"mc-12-ie-estimativas",focus:"Intervalos de confiança",difficulty:3,cognitive:"Interpretação",
    q:"Uma estimativa para a média populacional é 50 e a margem de erro, a 95% de confiança, é 3. Constrói o intervalo de confiança e interpreta-o.",
    response:{type:"stepwise",steps:[
      step("lower","1. Limite inferior","numeric",8,{value:47,tolerance:0,expected:"LI=47",prefixes:["li"],placeholder:"Ex.: LI=47"}),
      step("upper","2. Limite superior","numeric",8,{value:53,tolerance:0,expected:"LS=53",prefixes:["ls"],placeholder:"Ex.: LS=53"}),
      step("interval","3. Intervalo de confiança","expression",9,{accepted:["IC95%=[47,53]","[47,53]"],expected:"IC95%=[47,53]",placeholder:"Ex.: IC95%=[47,53]"}),
      step("interpretation","4. Interpretação","text",10,{accepted:["Com 95% de confiança, a média populacional encontra-se entre 47 e 53.","O intervalo [47,53] estima a média populacional com 95% de confiança."],expected:"Com 95% de confiança, a média populacional encontra-se entre 47 e 53.",placeholder:"Interpreta o intervalo no contexto da média populacional."})
    ]},
    points:35,sol:"O intervalo é 50±3, isto é, [47,53]. Interpreta-se que, com 95% de confiança, a média populacional se encontra entre 47 e 53.",
    hyp:"Pode existir dificuldade em aplicar a margem de erro aos dois limites ou em interpretar o nível de confiança.",
    contexts:["exam"],signature:"12-ie:Intervalos de confiança:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12MAT-PROD-STEPS-1",themeId:"12-mat",subtopicId:"12-mat-produto",
    microcompetencyId:"mc-12-mat-operacoes",focus:"Produto de matrizes",difficulty:3,cognitive:"Aplicação",
    q:"Considera A=[[1,2],[3,4]] e B=[[2,0],[1,2]]. Calcula AB e explica por que não se deve trocar a ordem dos fatores.",
    response:{type:"stepwise",steps:[
      step("row1","1. Primeira linha do produto","expression",10,{accepted:["(4,4)","[4,4]"],expected:"(4,4)",placeholder:"Calcula os produtos linha-coluna."}),
      step("row2","2. Segunda linha do produto","expression",10,{accepted:["(10,8)","[10,8]"],expected:"(10,8)",placeholder:"Calcula os produtos linha-coluna."}),
      step("product","3. Matriz AB","expression",10,{accepted:["AB=[[4,4],[10,8]]","[[4,4],[10,8]]"],expected:"AB=[[4,4],[10,8]]",placeholder:"Ex.: AB=[[…],[…]]"}),
      step("order","4. Justificação sobre a ordem","text",5,{accepted:["Em geral, o produto de matrizes não é comutativo, pelo que AB pode ser diferente de BA.","O produto de matrizes não é comutativo: em geral, AB≠BA."],expected:"Em geral, o produto de matrizes não é comutativo, pelo que AB pode ser diferente de BA.",placeholder:"Refere a não comutatividade do produto."})
    ]},
    points:35,sol:"AB=[[1×2+2×1,1×0+2×2],[3×2+4×1,3×0+4×2]]=[[4,4],[10,8]]. Em geral, o produto de matrizes não é comutativo, por isso AB pode diferir de BA.",
    hyp:"Pode existir dificuldade em combinar linhas com colunas ou assumir incorretamente que AB=BA.",
    contexts:["exam"],signature:"12-mat:Produto de matrizes:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-10FUN-AFIM-STEPS-1",themeId:"10-fun",subtopicId:"10-fun-afim",
    microcompetencyId:"mc-10-fun-representacoes",focus:"Função afim e modelação",difficulty:2,cognitive:"Modelação",
    q:"Um serviço de entregas cobra 4 € de taxa fixa e 1,50 € por quilómetro. Escreve a função custo C(x) e determina o preço de uma entrega de 10 km.",
    response:{type:"stepwise",steps:[
      step("model","1. Modelo do custo em função da distância","expression",12,{accepted:["C(x)=4+1.5x","4+1.5x","C(x)=1.5x+4"],conceptualErrorAccepted:["C(x)=4x+1.5","4x+1.5"],expected:"C(x)=4+1,5x",placeholder:"Ex.: C(x)=4+1,5x"}),
      step("substitution","2. Substituição de x=10","expression",10,{accepted:["C(10)=4+1.5*10","4+1.5*10","4+1,5×10"],errorEffects:[
        {from:"model",reasons:["conceptual_error"],accepted:["C(10)=4*10+1.5","4*10+1.5","4×10+1,5"],difficultyReduced:false}
      ],expected:"C(10)=4+1,5×10",placeholder:"Ex.: C(10)=4+1,5×10"}),
      step("value","3. Preço da entrega","numeric",13,{value:19,tolerance:0,errorEffects:[
        {from:"model",reasons:["conceptual_error"],accepted:["41.5","41,5","C(10)=41,5"],difficultyReduced:false}
      ],expected:"C(10)=19",placeholder:"Ex.: 19"})
    ]},
    points:35,sol:"A taxa fixa é o termo independente e o preço por quilómetro é o declive: C(x)=4+1,5x. Assim, C(10)=4+1,5×10=19 €.",
    hyp:"Pode trocar a taxa fixa pelo coeficiente da distância ou não interpretar corretamente o valor obtido.",
    contexts:["exam"],signature:"10-fun:Função afim e modelação:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-10GA-DIST-STEPS-1",themeId:"10-ga",subtopicId:"10-ga-distancias-ponto-medio",
    microcompetencyId:"mc-10-ga-coordenadas",focus:"Distâncias e ponto médio",difficulty:2,cognitive:"Aplicação",
    q:"Considera os pontos A(−1,2) e B(3,5). Determina a distância AB, apresentando os cálculos.",
    response:{type:"stepwise",steps:[
      step("dx","1. Diferença das abcissas","numeric",7,{value:4,tolerance:0,expected:"Δx=4",placeholder:"Ex.: Δx=4"}),
      step("dy","2. Diferença das ordenadas","numeric",7,{value:3,tolerance:0,expected:"Δy=3",placeholder:"Ex.: Δy=3"}),
      step("formula","3. Aplicação da fórmula da distância","expression",11,{accepted:["sqrt(4^2+3^2)","√(4²+3²)","sqrt((3-(-1))^2+(5-2)^2)"],expected:"AB=√(4²+3²)",placeholder:"Ex.: AB=√(4²+3²)"}),
      step("distance","4. Distância entre os pontos","numeric",10,{value:5,tolerance:0,expected:"AB=5",placeholder:"Ex.: AB=5"})
    ]},
    points:35,sol:"Δx=3−(−1)=4 e Δy=5−2=3. Logo, AB=√(4²+3²)=√25=5.",
    hyp:"Pode errar a diferença com a abcissa negativa ou somar as diferenças sem aplicar Pitágoras.",
    contexts:["exam"],signature:"10-ga:Distâncias e ponto médio:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-11CD-TV-STEPS-1",themeId:"11-cd",subtopicId:"11-cd-funcao-derivada",
    microcompetencyId:"mc-11-cd-taxa-de-variacao",focus:"Taxa de variação",difficulty:3,cognitive:"Raciocínio",
    q:"A posição de uma partícula é s(t)=t²+3t. Determina a velocidade instantânea no instante t=2.",
    response:{type:"stepwise",steps:[
      step("derivative","1. Derivada da função posição","expression",12,{accepted:["s'(t)=2t+3","2t+3","s′(t)=2t+3"],conceptualErrorAccepted:["s'(t)=2t","2t","s′(t)=2t"],expected:"s′(t)=2t+3",placeholder:"Ex.: s'(t)=2t+3"}),
      step("substitution","2. Substituição de t=2","expression",10,{accepted:["s'(2)=2*2+3","2*2+3","2×2+3"],errorEffects:[
        {from:"derivative",reasons:["conceptual_error"],accepted:["s'(2)=2*2","2*2","2×2"],difficultyReduced:true}
      ],expected:"s′(2)=2×2+3",placeholder:"Ex.: s'(2)=2×2+3"}),
      step("velocity","3. Velocidade instantânea","numeric",13,{value:7,tolerance:0,errorEffects:[
        {from:"derivative",reasons:["conceptual_error"],accepted:["4","s'(2)=4","s′(2)=4"],difficultyReduced:true}
      ],expected:"s′(2)=7",placeholder:"Ex.: 7"})
    ]},
    points:35,sol:"A velocidade instantânea é a derivada da posição. Como s′(t)=2t+3, resulta s′(2)=2×2+3=7.",
    hyp:"Pode omitir a derivada do termo 3t; esse erro simplifica as etapas seguintes e deve ser propagado conservadoramente.",
    contexts:["exam"],signature:"11-cd:Taxa de variação:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12EXPL-MOD-STEPS-1",themeId:"12-expl",subtopicId:"12-expl-modelacao",
    microcompetencyId:"mc-12-expl-modelacao",focus:"Modelação",difficulty:3,cognitive:"Modelação",
    q:"Uma população é modelada por P(t)=1000×1,07ᵗ, com t em anos. Estima P(5), arredondando o resultado final às unidades.",
    response:{type:"stepwise",steps:[
      step("substitution","1. Substituição de t=5","expression",10,{accepted:["P(5)=1000*1.07^5","1000*1.07^5","1000×1,07^5"],expected:"P(5)=1000×1,07⁵",placeholder:"Ex.: P(5)=1000×1,07^5"}),
      step("raw","2. Valor antes do arredondamento","numeric",12,{value:1402.5517307,tolerance:0.0001,expected:"Valor não arredondado=1402,5517307",placeholder:"Ex.: 1402,5517307"}),
      step("rounded","3. Resultado arredondado às unidades","numeric",13,{value:1403,tolerance:0,rounding:{sourceValue:1402.5517307,decimals:0},expected:"Resultado=1403",placeholder:"Ex.: 1403"})
    ]},
    points:35,sol:"P(5)=1000×1,07⁵=1402,5517307… Como a primeira casa decimal é 5, arredonda-se às unidades: P(5)≈1403.",
    hyp:"Pode arredondar prematuramente ou aplicar incorretamente a regra de arredondamento final.",
    contexts:["exam"],signature:"12-expl:Modelação:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-10FUN-MOD-STEPS-1",themeId:"10-fun",subtopicId:"10-fun-transformacoes-ramos-modulo",
    microcompetencyId:"mc-10-fun-transformacoes-modulo",focus:"Transformações e módulo",difficulty:3,cognitive:"Raciocínio",
    q:"Considera f(x)=|x−2|−1. Indica o vértice do gráfico e determina os zeros de f, apresentando a resolução.",
    response:{type:"stepwise",steps:[
      step("vertex","1. Vértice do gráfico","expression",9,{accepted:["V=(2,-1)","(2,-1)","V(2,-1)"],expected:"V=(2,−1)",placeholder:"Ex.: V=(2,−1)"}),
      step("equation","2. Equação para determinar os zeros","expression",9,{accepted:["|x-2|=1","abs(x-2)=1"],expected:"|x−2|=1",placeholder:"Ex.: |x−2|=1"}),
      step("branches","3. Separação nos dois casos","expression",9,{accepted:["x-2=1 ou x-2=-1","x−2=1 ou x−2=−1","x-2=+-1"],expected:"x−2=1 ou x−2=−1",placeholder:"Apresenta os dois casos."}),
      step("zeros","4. Zeros da função","expression",8,{accepted:["x=1 ou x=3","{1,3}","Z={1,3}"],expected:"Z={1,3}",placeholder:"Ex.: Z={1,3}"})
    ]},
    points:35,sol:"O gráfico de |x| foi transladado 2 unidades para a direita e 1 para baixo, logo o vértice é (2,−1). Para os zeros, |x−2|−1=0, isto é, |x−2|=1. Assim, x−2=1 ou x−2=−1, donde x=3 ou x=1.",
    hyp:"Pode trocar o sentido das translações ou considerar apenas um dos ramos da equação modular.",
    contexts:["exam"],signature:"10-fun:Transformações e módulo:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-11CD-TAN-STEPS-1",themeId:"11-cd",subtopicId:"11-cd-tangente",
    microcompetencyId:"mc-11-cd-tangente",focus:"Reta tangente",difficulty:3,cognitive:"Aplicação",
    q:"Considera f(x)=x². Determina uma equação da reta tangente ao gráfico de f no ponto de abcissa 1.",
    response:{type:"stepwise",steps:[
      step("point","1. Ponto de tangência","expression",7,{accepted:["P=(1,1)","(1,1)","P(1,1)"],expected:"P=(1,1)",placeholder:"Calcula f(1)."}),
      step("derivative","2. Função derivada","expression",9,{accepted:["f'(x)=2x","2x","f′(x)=2x"],expected:"f′(x)=2x",placeholder:"Ex.: f'(x)=2x"}),
      step("slope","3. Declive da tangente","numeric",8,{value:2,tolerance:0,expected:"m=f′(1)=2",placeholder:"Ex.: m=2"}),
      step("line","4. Equação da reta tangente","expression",11,{accepted:["y=2x-1","y-1=2(x-1)","2x-y-1=0"],expected:"y=2x−1",placeholder:"Ex.: y=2x−1"})
    ]},
    points:35,sol:"O ponto de tangência é (1,f(1))=(1,1). Como f′(x)=2x, o declive é f′(1)=2. Pela forma ponto-declive, y−1=2(x−1), ou seja, y=2x−1.",
    hyp:"Pode confundir o valor da função com o declive ou escrever uma reta que não passa pelo ponto de tangência.",
    contexts:["exam"],signature:"11-cd:Reta tangente:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12CPLX-TRIG-STEPS-1",themeId:"12-cplx",subtopicId:"12-cplx-forma-trig",
    microcompetencyId:"mc-12-cplx-forma-trigonometrica",focus:"Forma trigonométrica",difficulty:3,cognitive:"Aplicação",
    q:"Escreve o número complexo z=−1+√3i na forma trigonométrica, usando um argumento pertencente a [0,2π[.",
    response:{type:"stepwise",steps:[
      step("modulus","1. Módulo de z","expression",9,{accepted:["|z|=2","sqrt((-1)^2+(sqrt(3))^2)=2","√((-1)²+(√3)²)=2"],expected:"|z|=2",placeholder:"Calcula o módulo."}),
      step("quadrant","2. Quadrante do afixo","text",7,{accepted:["O afixo pertence ao segundo quadrante.","Segundo quadrante.","2.º quadrante."],expected:"O afixo pertence ao segundo quadrante.",placeholder:"Identifica o quadrante."}),
      step("argument","3. Argumento em [0,2π[","expression",9,{accepted:["arg(z)=2pi/3","2pi/3","arg(z)=2π/3"],expected:"arg(z)=2π/3",placeholder:"Ex.: arg(z)=2π/3"}),
      step("trig","4. Forma trigonométrica","expression",10,{accepted:["z=2(cos(2pi/3)+i sin(2pi/3))","2(cos(2pi/3)+i sin(2pi/3))","z=2(cos(2π/3)+i sin(2π/3))"],expected:"z=2(cos(2π/3)+i sin(2π/3))",placeholder:"Escreve z=r(cos θ+i sin θ)."})
    ]},
    points:35,sol:"Tem-se |z|=√((-1)²+(√3)²)=2. O afixo está no segundo quadrante e o ângulo de referência é π/3, logo um argumento em [0,2π[ é 2π/3. Portanto, z=2(cos(2π/3)+i sin(2π/3)).",
    hyp:"Pode escolher o argumento do primeiro quadrante ou omitir o módulo na forma trigonométrica.",
    contexts:["exam"],signature:"12-cplx:Forma trigonométrica:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12EXPL-LOG-STEPS-1",themeId:"12-expl",subtopicId:"12-expl-logaritmica",
    microcompetencyId:"mc-12-expl-logaritmos",focus:"Função logarítmica",difficulty:3,cognitive:"Raciocínio",
    q:"Resolve, em ℝ, a equação log₂(x−1)=3, indicando a condição de existência.",
    response:{type:"stepwise",steps:[
      step("domain","1. Condição de existência","expression",8,{accepted:["x-1>0","x>1","CE:x>1"],expected:"x−1>0 ⇔ x>1",placeholder:"Indica a condição de existência."}),
      step("exponential","2. Passagem para a forma exponencial","expression",10,{accepted:["x-1=2^3","x−1=2³"],expected:"x−1=2³",placeholder:"Usa a definição de logaritmo."}),
      step("solution","3. Resolução da equação","expression",9,{accepted:["x-1=8 => x=9","x−1=8 ⇔ x=9","x=9"],expected:"x−1=8 ⇔ x=9",placeholder:"Resolve em ordem a x."}),
      step("check","4. Verificação da condição e conjunto-solução","text",8,{accepted:["Como 9>1, a solução é S={9}.","9 satisfaz a condição x>1, logo S={9}.","S={9}, pois 9>1."],expected:"Como 9>1, a solução é S={9}.",placeholder:"Confirma a condição e conclui."})
    ]},
    points:35,sol:"A condição de existência é x−1>0, ou seja, x>1. Pela definição de logaritmo, x−1=2³=8, pelo que x=9. Como 9>1, a solução é S={9}.",
    hyp:"Pode ignorar a condição de existência ou trocar a base pelo expoente na passagem à forma exponencial.",
    contexts:["exam"],signature:"12-expl:Função logarítmica:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-10GA-LG-STEPS-1",themeId:"10-ga",subtopicId:"10-ga-lugares-geometricos",
    microcompetencyId:"mc-10-ga-lugares-geometricos",focus:"Circunferência",difficulty:3,cognitive:"Aplicação",
    q:"Determina uma equação da circunferência de centro C(2,−1) que passa pelo ponto P(5,3).",
    response:{type:"stepwise",steps:[
      step("dx","1. Diferença das abcissas entre P e C","numeric",7,{value:3,tolerance:0,expected:"Δx=3",placeholder:"Ex.: Δx=5−2"}),
      step("dy","2. Diferença das ordenadas entre P e C","numeric",7,{value:4,tolerance:0,expected:"Δy=4",placeholder:"Ex.: Δy=3−(−1)"}),
      step("radius","3. Raio da circunferência","numeric",9,{value:5,tolerance:0,expected:"r=√(3²+4²)=5",placeholder:"Calcula a distância CP."}),
      step("equation","4. Equação da circunferência","expression",12,{accepted:["(x-2)^2+(y+1)^2=25","(x−2)²+(y+1)²=25"],expected:"(x−2)²+(y+1)²=25",placeholder:"Usa o centro e o raio."})
    ]},
    points:35,sol:"Entre C e P, as diferenças são 3 e 4. Logo, r=CP=√(3²+4²)=5. A circunferência tem equação (x−2)²+(y+1)²=25.",
    hyp:"Pode trocar os sinais das coordenadas do centro ou usar r em vez de r² no segundo membro.",
    contexts:["exam"],signature:"10-ga:Circunferência:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-11CONT-PERM-STEPS-1",themeId:"11-cont",subtopicId:"11-cont-permutacoes",
    microcompetencyId:"mc-11-cont-permutacoes",focus:"Permutações",difficulty:3,cognitive:"Raciocínio",
    q:"Cinco livros distintos vão ser colocados numa prateleira. De quantas formas podem ser ordenados se dois livros específicos, A e B, tiverem de ficar juntos?",
    response:{type:"stepwise",steps:[
      step("block","1. Tratamento de A e B como bloco","text",8,{accepted:["Consideram-se A e B como um único bloco.","A e B formam um bloco."],expected:"Consideram-se A e B como um único bloco.",placeholder:"Explica como tratas A e B."}),
      step("objects","2. Número de objetos a ordenar","numeric",7,{value:4,tolerance:0,expected:"n=4",placeholder:"Conta o bloco e os restantes livros."}),
      step("orders","3. Ordens dos quatro objetos","expression",8,{accepted:["4!","4!=24","24"],expected:"4!=24",placeholder:"Usa uma permutação."}),
      step("internal","4. Ordens internas do bloco","numeric",5,{value:2,tolerance:0,expected:"ordens internas=2",placeholder:"Conta AB e BA."}),
      step("total","5. Número total de ordenações","numeric",7,{value:48,tolerance:0,expected:"2×4!=48",placeholder:"Combina os dois fatores."})
    ]},
    points:35,sol:"Tratando A e B como um bloco, ordenam-se quatro objetos de 4!=24 formas. Dentro do bloco, A e B podem aparecer como AB ou BA. Portanto, existem 2×24=48 ordenações.",
    hyp:"Pode esquecer a ordem interna do bloco ou contar A e B como objetos separados depois de impor a adjacência.",
    contexts:["exam"],signature:"11-cont:Permutações com restrição:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-11TRIG-MOD-STEPS-1",themeId:"11-trig",subtopicId:"11-trig-modelacao",
    microcompetencyId:"mc-11-trig-modelacao",focus:"Modelação trigonométrica",difficulty:3,cognitive:"Modelação",
    q:"A partir de um ponto situado a 20 m da base de uma torre, observa-se o topo sob um ângulo de elevação de 45°. Admitindo terreno horizontal, determina a altura da torre.",
    response:{type:"stepwise",steps:[
      step("ratio","1. Razão trigonométrica adequada","text",8,{accepted:["Usa-se a tangente porque relaciona o cateto oposto com o adjacente.","A razão adequada é a tangente."],expected:"Usa-se a tangente porque relaciona o cateto oposto com o adjacente.",placeholder:"Identifica a razão trigonométrica."}),
      step("model","2. Equação do problema","expression",10,{accepted:["tan(45)=h/20","tan(45°)=h/20","h=20tan(45)"],expected:"tan(45°)=h/20",placeholder:"Representa a altura por h."}),
      step("value","3. Valor trigonométrico","numeric",7,{value:1,tolerance:0,expected:"valor da tangente=1",placeholder:"Indica o valor exato."}),
      step("height","4. Altura da torre","numeric",10,{value:20,tolerance:0,expected:"h=20",placeholder:"Conclui: h=20 m."})
    ]},
    points:35,sol:"No triângulo retângulo, tan(45°)=h/20. Como tan(45°)=1, resulta h/20=1 e, portanto, h=20 m.",
    hyp:"Pode usar seno ou cosseno sem identificar a hipotenusa, ou inverter os catetos na razão tangente.",
    contexts:["exam"],signature:"11-trig:Modelação de altura:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12CPLX-POW-STEPS-1",themeId:"12-cplx",subtopicId:"12-cplx-operacoes-trig",
    microcompetencyId:"mc-12-cplx-operacoes-trig",focus:"Potenciação na forma trigonométrica",difficulty:3,cognitive:"Aplicação",
    q:"Considera z=2(cos(π/6)+i sin(π/6)). Determina z³ na forma algébrica.",
    response:{type:"stepwise",steps:[
      step("modulus","1. Módulo de z³","numeric",7,{value:8,tolerance:0,expected:"|z³|=2³=8",placeholder:"Eleva o módulo ao cubo."}),
      step("argument","2. Argumento de z³","expression",8,{accepted:["3*pi/6=pi/2","3π/6=π/2","pi/2"],expected:"3×π/6=π/2",placeholder:"Multiplica o argumento por 3."}),
      step("trig","3. Forma trigonométrica de z³","expression",10,{accepted:["z^3=8(cos(pi/2)+i sin(pi/2))","8(cos(pi/2)+i sin(pi/2))","z³=8(cos(π/2)+i sin(π/2))"],expected:"z³=8(cos(π/2)+i sin(π/2))",placeholder:"Aplica a fórmula de Moivre."}),
      step("algebraic","4. Forma algébrica","expression",10,{accepted:["z^3=8i","8i","z³=8i"],expected:"z³=8i",placeholder:"Usa cos(π/2) e sin(π/2)."})
    ]},
    points:35,sol:"Pela fórmula de Moivre, z³=2³(cos(3π/6)+i sin(3π/6))=8(cos(π/2)+i sin(π/2))=8i.",
    hyp:"Pode manter o módulo igual a 2 ou elevar incorretamente o argumento em vez de o multiplicar por 3.",
    contexts:["exam"],signature:"12-cplx:Potenciação trigonométrica:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12PROB-COND-STEPS-1",themeId:"12-prob",subtopicId:"12-prob-condicionada",
    microcompetencyId:"mc-12-prob-condicionada",focus:"Probabilidade condicionada",difficulty:3,cognitive:"Raciocínio",
    q:"Numa turma de 30 alunos, 18 praticam desporto, 12 estudam música e 6 fazem ambas as atividades. Escolhe-se ao acaso um aluno que pratica desporto. Determina a probabilidade de esse aluno também estudar música.",
    response:{type:"stepwise",steps:[
      step("events","1. Identificação dos valores relevantes","text",7,{accepted:["Há 18 alunos no acontecimento condicionado e 6 na interseção.","Dos 18 que praticam desporto, 6 também estudam música."],expected:"Dos 18 que praticam desporto, 6 também estudam música.",placeholder:"Identifica o universo condicionado e a interseção."}),
      step("formula","2. Fórmula da probabilidade condicionada","expression",9,{accepted:["P(M|D)=P(M∩D)/P(D)","P(M|D)=6/18"],expected:"P(M|D)=P(M∩D)/P(D)",placeholder:"Escreve a fórmula."}),
      step("fraction","3. Fração obtida","fraction",9,{numerator:6,denominator:18,expected:"P(M|D)=6/18",placeholder:"Usa os alunos que praticam desporto como denominador."}),
      step("result","4. Probabilidade simplificada","fraction",10,{numerator:1,denominator:3,expected:"P(M|D)=1/3",placeholder:"Simplifica a fração."})
    ]},
    points:35,sol:"Sabendo que o aluno pratica desporto, o universo fica reduzido aos 18 praticantes. Destes, 6 também estudam música. Assim, P(M|D)=6/18=1/3.",
    hyp:"Pode usar os 30 alunos como denominador e ignorar que o universo foi condicionado.",
    contexts:["exam"],signature:"12-prob:Probabilidade condicionada:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  },
  {
    id:"CRV2-12INT-BARROW-STEPS-1",themeId:"12-int",subtopicId:"12-int-tfc-barrow",
    microcompetencyId:"mc-12-int-tfc-barrow",focus:"Fórmula de Barrow",difficulty:3,cognitive:"Aplicação",
    q:"Calcula o integral definido ∫₀²(3x²+1)dx, apresentando a primitiva usada e a aplicação da fórmula de Barrow.",
    response:{type:"stepwise",steps:[
      step("primitive","1. Primitiva do integrando","expression",10,{accepted:["F(x)=x^3+x","x^3+x","F(x)=x³+x"],expected:"F(x)=x³+x",placeholder:"Determina uma primitiva."}),
      step("barrow","2. Aplicação da fórmula de Barrow","expression",9,{accepted:["[x^3+x]_0^2","F(2)-F(0)","(2^3+2)-(0^3+0)"],expected:"[x³+x]₀²=F(2)−F(0)",placeholder:"Substitui os limites."}),
      step("values","3. Cálculo nos extremos","expression",8,{accepted:["(8+2)-0","10-0","F(2)=10 e F(0)=0"],expected:"F(2)−F(0)=10−0",placeholder:"Calcula F(2) e F(0)."}),
      step("result","4. Valor do integral","numeric",8,{value:10,tolerance:0,expected:"∫₀²(3x²+1)dx=10",placeholder:"Indica o resultado final."})
    ]},
    points:35,sol:"Uma primitiva de 3x²+1 é F(x)=x³+x. Pela fórmula de Barrow, ∫₀²(3x²+1)dx=F(2)−F(0)=(8+2)−0=10.",
    hyp:"Pode esquecer a primitiva da constante ou somar, em vez de subtrair, os valores nos extremos.",
    contexts:["exam"],signature:"12-int:Fórmula de Barrow:constructed-v2-1",reviewStatus:"prototype",origin:"constructed_v2"
  }
];

export const COMPLETION_RESPONSE_BANK=[{
  id:"SEL-COMP-10FUN-1",themeId:"10-fun",subtopicId:"10-fun-dominio-imagem-zeros",
  microcompetencyId:"mc-10-fun-dominio-e-zeros",focus:"Domínio e zeros",difficulty:2,cognitive:"Interpretação",
  q:"Considera f(x)=2x−6, definida em ℝ. Completa cada afirmação escolhendo uma opção por espaço.",
  response:{type:"completion",blanks:[
    {id:"a",label:"(a) O zero da função é",options:["−3","3","6"],correct:1},
    {id:"b",label:"(b) A função é",options:["crescente","decrescente","constante"],correct:0},
    {id:"c",label:"(c) O valor de f(0) é",options:["0","6","−6"],correct:2},
    {id:"d",label:"(d) A condição f(x)>0 verifica-se quando",options:["x<3","x>3","x>0"],correct:1}
  ]},points:5,contexts:["exam"],reviewStatus:"prototype",origin:"completion_v1",
  signature:"10-fun:Domínio e zeros:completion-v1-1",
  sol:"2x−6=0 dá x=3. O declive 2 é positivo, por isso f é crescente. f(0)=−6. Finalmente, 2x−6>0 equivale a x>3.",
  hyp:"Revê a relação entre a expressão de uma função afim, o zero, o declive e o sinal."
}];

export function responseType(question){return question?.response?.type||"choice"}
export function isConstructedResponse(question){return !["choice","completion"].includes(responseType(question))}
export function completionFilledCount(question,answer){
  return (question.response?.blanks||[]).filter(blank=>Number.isInteger(answer?.[blank.id])&&answer[blank.id]>=0&&answer[blank.id]<blank.options.length).length;
}
const hasText=value=>typeof value==="string"&&value.trim().length>0;

export function isResponseAnswered(question,answer){
  if(responseType(question)==="completion")return completionFilledCount(question,answer)>0;
  if(responseType(question)==="choice")return Number.isInteger(answer);
  if(responseType(question)==="stepwise")return hasText(answer)||hasText(answer?.working)||Object.values(answer?.steps||{}).some(hasText);
  return hasText(answer);
}

function normalizedInput(value){return String(value??"").trim().replace(/−/g,"-").replace(/\s+/g,"").replace(",", ".")}
function normalizedExpression(value){return normalizedInput(value).toLowerCase().replace(/′/g,"'").replace(/²/g,"^2").replace(/³/g,"^3").replace(/[×·]/g,"*").replace(/:/g,"/")}
function normalizedWords(value){
  const base=String(value??"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[−–—]/g,"-").replace(/\s+/g," ").trim();
  const numberWords={zero:"0",um:"1",uma:"1",dois:"2",duas:"2",tres:"3",quatro:"4",cinco:"5",seis:"6",sete:"7",oito:"8",nove:"9",dez:"10"};
  return base.replace(/\b(zero|um|uma|dois|duas|tres|quatro|cinco|seis|sete|oito|nove|dez)\b/g,word=>numberWords[word]||word);
}
function escapeRegex(value){return String(value).replace(/[.*+?^$()|[\]\\{}]/g,"\\$&")}
function conceptPresent(input,candidate){
  const concept=normalizedWords(candidate);
  if(!concept)return false;
  if(new RegExp("(?:^|\\b)"+escapeRegex(concept)+"(?:\\b|$)","u").test(input))return true;
  if(concept.endsWith("r")&&concept.length>=6){
    const stem=concept.slice(0,-1);
    return new RegExp("\\b"+escapeRegex(stem)+"[a-z]*\\b","u").test(input);
  }
  return false;
}
function conceptGroupsMatch(spec,input){
  const groups=Array.isArray(spec?.conceptGroups)?spec.conceptGroups:[];
  if(!groups.length||!input)return false;
  const allCandidates=groups.flat().map(normalizedWords).filter(Boolean);
  const explicitNegation=allCandidates.some(candidate=>candidate.includes("nao")&&conceptPresent(input,candidate));
  if(/\b(?:nao|nunca|jamais)\b/u.test(input)&&!explicitNegation)return false;
  return groups.every(group=>group.some(candidate=>conceptPresent(input,candidate)));
}
function optionalUnitOmissionMatches(input,candidate){
  const normalizedCandidate=normalizedWords(candidate).replace(/[.!]$/g,"");
  const withoutUnit=normalizedCandidate.replace(/\s*(?:€|eur|euros?|%|º|graus?|mm|cm|dm|km|m|mg|g|kg|ml|cl|dl|l)\s*$/u,"").trim();
  return withoutUnit!==normalizedCandidate&&input.replace(/[.!]$/g,"")===withoutUnit;
}

function withoutPrefix(value){return normalizedInput(value).replace(/^[\p{L}′']+(?:\([^)]*\))?=/u,"")}
function parseNumeric(value){
  const input=withoutPrefix(value);
  if(!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(input))return null;
  const parsed=Number(input);return Number.isFinite(parsed)?parsed:null;
}
function parseFraction(value){
  const match=withoutPrefix(value).match(/^([+-]?\d+)\/([+-]?\d+)$/);
  if(!match)return null;
  const numerator=Number(match[1]),denominator=Number(match[2]);
  if(!Number.isSafeInteger(numerator)||!Number.isSafeInteger(denominator)||denominator===0)return null;
  return {numerator,denominator};
}
function decimalExactness(value,target){
  const input=withoutPrefix(value);
  const match=input.match(/^([+-]?(?:\d+\.\d+|\.\d+))$/);
  if(!match)return null;
  const parsed=Number(match[1]);
  if(!Number.isFinite(parsed))return null;
  const decimals=(match[1].split(".")[1]||"").length;
  const exactTolerance=Number.EPSILON*Math.max(1,Math.abs(target))*4;
  return {parsed,decimals,exact:Math.abs(parsed-target)<=exactTolerance,looksRounded:Math.abs(parsed-target)<=0.5*Math.pow(10,-decimals)+Number.EPSILON};
}
function highConfidenceTranscriptionSlip(previousPart,finalPart,target,tolerance){
  const previous=parseNumeric(previousPart),final=parseNumeric(finalPart);
  if(previous===null||final===null||Math.abs(previous-target)>tolerance||Math.abs(final-target)<=tolerance)return false;
  const a=normalizedInput(previousPart).replace(/^\+/,"");
  const b=normalizedInput(finalPart).replace(/^\+/,"");
  const unsignedA=a.replace(/^[+-]/,"");
  const unsignedB=b.replace(/^[+-]/,"");
  if(unsignedA===unsignedB&&a!==b)return true;
  if(a.length!==b.length)return false;
  let changes=0;
  for(let i=0;i<a.length;i++)if(a[i]!==b[i])changes++;
  return changes===1;
}
function decimalPlaces(value){
  const input=withoutPrefix(value);
  const match=input.match(/^[+-]?\d+(?:\.(\d+))?$/);
  if(!match)return null;
  return (match[1]||"").length;
}
function roundedValue(value,decimals){
  const factor=10**decimals;
  return Math.round((Number(value)+Number.EPSILON)*factor)/factor;
}
function highConfidenceWrongFinalRounding(spec,row){
  const decimals=Number(spec?.rounding?.decimals);
  const source=Number(spec?.rounding?.sourceValue);
  if(!row||!Number.isInteger(decimals)||decimals<0||decimals>10||!Number.isFinite(source)||row.values.length<2)return false;
  const expected=Number(spec.value);
  const mathematicallyRounded=roundedValue(source,decimals);
  const scale=Math.max(1,Math.abs(expected),Math.abs(source));
  if(!Number.isFinite(expected)||Math.abs(expected-mathematicallyRounded)>Number.EPSILON*scale*16)return false;
  const previous=row.values.at(-2),final=row.values.at(-1);
  if(Math.abs(previous-source)>Number.EPSILON*scale*16||Math.abs(final-expected)<=Number.EPSILON*scale*16)return false;
  if(decimalPlaces(row.parts.at(-1))!==decimals)return false;
  const unit=10**(-decimals);
  return Math.abs(final-expected)<=unit+Number.EPSILON*scale*16;
}
function matchesPropagatedApproximation(spec,value){
  const parsed=parseNumeric(value);
  if(parsed===null||!Array.isArray(spec?.propagatedApproximationValues))return false;
  return spec.propagatedApproximationValues.some(candidate=>Number.isFinite(Number(candidate))&&Math.abs(parsed-Number(candidate))<=Number.EPSILON*Math.max(1,Math.abs(parsed),Math.abs(Number(candidate)))*16);
}
function normalizedDeclaredStepValue(spec,value){
  if(spec?.type==="text")return normalizedWords(value).replace(/[.!]$/g,"");
  if(spec?.type==="expression")return normalizedExpression(value);
  return normalizedInput(value);
}
function declaredExactIssue(spec,value,key){
  if(!hasText(value)||!Array.isArray(spec?.[key]))return null;
  const actual=normalizedDeclaredStepValue(spec,value);
  return spec[key].map(entry=>typeof entry==="string"?{value:entry}:entry).find(entry=>entry&&hasText(entry.value)&&normalizedDeclaredStepValue(spec,entry.value)===actual)||null;
}
function declaredIncompleteStep(spec,value){
  if(!hasText(value)||!Array.isArray(spec?.incompleteAccepted))return null;
  const actual=normalizedDeclaredStepValue(spec,value);
  return spec.incompleteAccepted.find(entry=>entry&&typeof entry==="object"&&hasText(entry.value)&&typeof entry.missingOnlyFinalPassage==="boolean"&&normalizedDeclaredStepValue(spec,entry.value)===actual)||null;
}
function declaredIntermediateRounding(spec,value){
  if(!hasText(value)||!Array.isArray(spec?.intermediateRoundingAccepted))return null;
  const actual=normalizedDeclaredStepValue(spec,value);
  return spec.intermediateRoundingAccepted.find(entry=>hasText(entry)&&normalizedDeclaredStepValue(spec,entry)===actual)||null;
}
function declaredUpstreamErrorEffect(spec,value,stepResults){
  if(!hasText(value)||!Array.isArray(spec?.errorEffects))return null;
  const actual=normalizedDeclaredStepValue(spec,value);
  return spec.errorEffects.find(effect=>{
    if(!effect||typeof effect.from!=="string"||typeof effect.difficultyReduced!=="boolean"||!Array.isArray(effect.reasons)||!effect.reasons.length||!Array.isArray(effect.accepted)||!effect.accepted.length)return false;
    const upstream=stepResults.find(row=>row.stepId===effect.from);
    if(!upstream||!effect.reasons.includes(upstream.reason))return false;
    return effect.accepted.some(candidate=>hasText(candidate)&&normalizedDeclaredStepValue(spec,candidate)===actual);
  })||null;
}
function declaredInstructionViolation(spec,value){
  const issue=declaredExactIssue(spec,value,"instructionViolationAccepted");
  if(!issue||!Array.isArray(issue.dependentStepIds))return null;
  const dependentStepIds=issue.dependentStepIds.filter(id=>typeof id==="string"&&id.length>0);
  return {...issue,dependentStepIds};
}
function declaredImplicitRule(spec){
  const rule=spec?.implicitNonCalculation;
  if(!rule||!Array.isArray(rule.evidence)||!Array.isArray(rule.dependentStepIds))return null;
  const validEvidence=rule.evidence.filter(entry=>entry&&typeof entry.from==="string"&&Array.isArray(entry.accepted)&&entry.accepted.some(hasText));
  if(!validEvidence.length)return null;
  return {...rule,evidence:validEvidence,dependentStepIds:rule.dependentStepIds.filter(id=>typeof id==="string"&&id.length>0)};
}
function implicitEvidenceMatches(question,answer,rule){
  return rule.evidence.some(entry=>{
    const sourceSpec=question.response.steps.find(stepSpec=>stepSpec.id===entry.from);
    const sourceValue=answer?.steps?.[entry.from];
    if(!sourceSpec||!hasText(sourceValue))return false;
    const actual=normalizedDeclaredStepValue(sourceSpec,sourceValue);
    return entry.accepted.some(candidate=>hasText(candidate)&&normalizedDeclaredStepValue(sourceSpec,candidate)===actual);
  });
}

function gradeStep(spec,value){
  let correct=false,reason="incorrect";
  const instructionViolation=declaredInstructionViolation(spec,value);
  if(instructionViolation){
    reason="instruction_violation";
    return {stepId:spec.id,label:spec.label,status:"incorrect",correct:false,points:0,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",dependentStepIds:instructionViolation.dependentStepIds};
  }
  const missingRequiredWork=declaredExactIssue(spec,value,"missingRequiredWorkAccepted");
  if(missingRequiredWork){
    reason="missing_required_work";
    return {stepId:spec.id,label:spec.label,status:"incorrect",correct:false,points:0,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
  }
  const typedPrefix=String(value??"").includes("=")?String(value).split("=")[0]:null;
  const expectedPrefix=String(spec.expected).includes("=")?String(spec.expected).split("=")[0]:null;
  if(["numeric","fraction"].includes(spec.type)&&typedPrefix&&expectedPrefix&&normalizedExpression(typedPrefix)!==normalizedExpression(expectedPrefix))return {stepId:spec.id,label:spec.label,status:"incorrect",correct:false,points:0,maxPoints:spec.points,expected:spec.expected,answer:value,reason:"wrong_quantity"};
  if(spec.type==="numeric"){
    const parsed=parseNumeric(value),tolerance=Math.max(0,Number(spec.tolerance)||0);
    correct=parsed!==null&&Math.abs(parsed-Number(spec.value))<=tolerance+Number.EPSILON;
    if(parsed===null)reason="invalid_numeric_format";
  }
  if(spec.type==="fraction"){
    const parsed=parseFraction(value);
    const target=spec.numerator/spec.denominator;
    correct=!!parsed&&parsed.numerator*spec.denominator===spec.numerator*parsed.denominator;
    if(!parsed){
      const decimal=decimalExactness(value,target);
      if(decimal?.exact){
        reason="wrong_final_form";
        return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
      }
      if(decimal?.looksRounded){
        reason="approximate_instead_of_exact";
        return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
      }
      reason="invalid_fraction_format";
    }
  }
  if(spec.type==="expression"){
    const input=normalizedExpression(value);
    correct=hasText(value)&&[spec.expected,...(spec.accepted||[])].filter(Boolean).some(candidate=>{
      const expected=normalizedExpression(candidate);
      if(expected===input)return true;
      const strip=s=>s.replace(/^f'\(x\)=/,"");
      const a=strip(input),b=strip(expected);
      return a.includes("x")&&b.includes("x")&&equivalentPolynomial(a,b);
    });
    if(!input)reason="empty_expression";
  }
  if(spec.type==="text"){
    const input=normalizedWords(value);
    const candidates=[spec.expected,...(spec.accepted||[])].filter(Boolean);
    const accepted=candidates.map(candidate=>normalizedWords(candidate).replace(/[.!]$/g,""));
    correct=hasText(value)&&accepted.includes(input.replace(/[.!]$/g,""));
    if(!correct&&hasText(value))correct=candidates.some(candidate=>optionalUnitOmissionMatches(input,candidate));
    if(!correct&&hasText(value)&&conceptGroupsMatch(spec,input))correct=true;
    if(!input)reason="empty_justification";
  }
  if(!correct&&hasText(value)){
    const copiedData=declaredExactIssue(spec,value,"copiedDataAccepted");
    if(copiedData&&typeof copiedData.difficultyReduced==="boolean"){
      reason="copied_data_error";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:spec.points,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",difficultyReduced:copiedData.difficultyReduced};
    }
    const conceptual=declaredExactIssue(spec,value,"conceptualErrorAccepted");
    if(conceptual){
      reason="conceptual_error";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
    }
    const excess=declaredExactIssue(spec,value,"excessElementsAccepted");
    if(excess&&typeof excess.affectsPerformance==="boolean"){
      reason="excess_elements";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:spec.points,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",affectsPerformance:excess.affectsPerformance};
    }
    const formal=declaredExactIssue(spec,value,"formalNotationAccepted");
    if(formal&&typeof formal.onlyZeroPointSteps==="boolean"){
      reason="formal_notation_error";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:spec.points,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",onlyZeroPointSteps:formal.onlyZeroPointSteps};
    }
    const incomplete=declaredIncompleteStep(spec,value);
    if(incomplete){
      reason="incomplete_step";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason,missingOnlyFinalPassage:incomplete.missingOnlyFinalPassage}),maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",missingOnlyFinalPassage:incomplete.missingOnlyFinalPassage};
    }
    if(declaredIntermediateRounding(spec,value)){
      reason="intermediate_rounding";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:spec.points,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",globalPenalty:1};
    }
  }
  return {stepId:spec.id,label:spec.label,status:correct?"correct":"incorrect",correct,points:correct?spec.points:0,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason:correct?null:reason};
}

function stepwiseLines(answer){
  if(typeof answer==="string")return answer.split(/\r?\n/).map(row=>row.trim()).filter(Boolean);
  if(hasText(answer?.working))return answer.working.split(/\r?\n/).map(row=>row.trim()).filter(Boolean);
  return [];
}
function presentsOnlyFinalResult(question,answer){
  if(answer&&typeof answer==="object"&&Object.values(answer.steps||{}).some(hasText))return false;
  const lines=stepwiseLines(answer);
  if(lines.length!==1||question?.response?.type!=="stepwise"||question.response.steps.length<2)return false;
  const line=lines[0];
  const equalityCount=(line.match(/=/g)||[]).length;
  if(/[→⇒]/u.test(line))return false;
  if(equalityCount>1&&!line.includes(";"))return false;
  const finalSpec=question.response.steps.at(-1);
  if(gradeStep(finalSpec,line).correct)return true;
  return gradeStepFromWorking(finalSpec,[line],line,new Set()).correct;
}

function constantValue(source){
  const canonical=canonicalPolynomial(normalizedExpression(source));
  if(!canonical||canonical.includes(","))return null;
  const [n,d]=canonical.split("/").map(Number);
  const value=n/d;return Number.isFinite(value)?value:null;
}

function gradeStepFromWorking(spec,lines,fullAnswer,usedUnlabelled=new Set()){
  const candidates=lines.map((value,index)=>({value,index,labelled:value.includes("=")})).filter(row=>row.labelled||!usedUnlabelled.has(row.index));
  const explicit=[];
  const expectedPrefix=String(spec.expected).includes("=")?String(spec.expected).split("=")[0]:null;
  for(const [index,line] of lines.entries()){
    const parts=line.split("=").map(x=>x.trim());
    const matches=parts.length>1&&[expectedPrefix,...(spec.prefixes||[])].filter(Boolean).some(prefix=>normalizedExpression(parts[0])===normalizedExpression(prefix));
    if(matches){
      candidates.push(...parts.slice(1).map(value=>({value,index,labelled:true})));
      if(["numeric","fraction"].includes(spec.type)){
        const values=parts.slice(1).map(constantValue);
        if(values.every(value=>value!==null)){
          const target=spec.type==="numeric"?spec.value:spec.numerator/spec.denominator;
          const tolerance=Math.max(0,Number(spec.tolerance)||0)+Number.EPSILON;
          explicit.push({line,parts,values,target,tolerance,correct:values.every(value=>Math.abs(value-target)<=tolerance)});
        }
      }
    }
  }
  const base=gradeStep(spec,"");
  if(explicit.length){
    const right=explicit.some(row=>row.correct),wrong=explicit.some(row=>!row.correct);
    if(wrong){
      const row=explicit.length===1?explicit[0]:null;
      const previousPart=row?.parts?.at(-2)||"";
      const finalPart=row?.parts?.at(-1)||"";
      const previousValue=row?.values?.at(-2);
      const finalValue=row?.values?.at(-1);
      if(highConfidenceWrongFinalRounding(spec,row)){
        const reason="wrong_final_rounding";
        return {...base,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",answer:row.line};
      }
      const transcriptionSlip=!!row&&row.values.length>=2&&highConfidenceTranscriptionSlip(previousPart,finalPart,row.target,row.tolerance);
      if(transcriptionSlip){
        const reason="copied_number_or_sign_error";
        return {...base,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",answer:row.line};
      }
      const arithmeticSlip=!!row&&row.values.length>=2&&/[+\-*/^]/.test(previousPart)&&parseNumeric(finalPart)!==null&&Math.abs(previousValue-row.target)<=row.tolerance&&Math.abs(finalValue-row.target)>row.tolerance;
      if(arithmeticSlip){
        const reason="occasional_calculation_error";
        return {...base,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",answer:row.line};
      }
      return {...base,status:right?"needs_review":"incorrect",reason:right?"conflicting_results":"calculation_error",classificationConfidence:right?"unknown":"low",answer:explicit.map(row=>row.line).join("\n")};
    }
    return {...base,status:"correct",correct:true,points:spec.points,reason:null,answer:explicit[0].line};
  }
  if(spec.type==="text"&&hasText(fullAnswer))candidates.push({value:fullAnswer,index:null,labelled:true});
  for(const candidate of candidates){
    const result=gradeStep(spec,candidate.value);
    if(result.correct||result.status==="partial")return {...result,matchedUnlabelledIndex:candidate.labelled?null:candidate.index};
  }
  const recognizable=lines.some(line=>canonicalPolynomial(normalizedExpression(line))!==null||/[=→∫√]/.test(line)||/[a-zÀ-ÿ]{3,}/i.test(line));
  return fullAnswer.trim()?{...base,status:"needs_review",reason:recognizable?"not_verified":"no_recognizable_work",answer:""}:base;
}

export function stepFeedback(row){
  if(row.reason==="final_result_only")return "Nos itens de construção por etapas, o resultado final isolado não é pontuado: apresenta os cálculos e justificações necessários.";
  if(row.reason==="instruction_violation")return "Foi usado um processo que o enunciado excluía explicitamente. Esta etapa e apenas as etapas declaradas como dependentes recebem zero, de acordo com os critérios IAVE.";
  if(row.reason==="missing_required_work")return "Faltam os cálculos ou a justificação que o critério exige nesta etapa; por isso, esta etapa recebe zero pontos.";
  if(row.reason==="implicit_non_calculation_step")return row.implicitTraversal?"A etapa não foi escrita isoladamente, mas a resolução posterior prova inequivocamente que foi percorrida; foi atribuída a cotação prevista.":"A etapa não foi apresentada e a resolução não prova inequivocamente que foi percorrida; esta etapa e as dependentes declaradas recebem zero.";
  if(row.reason==="dependent_zero_due_to_iave")return "Esta etapa depende de uma etapa anterior que, pelos critérios IAVE, obriga a cotação zero nas etapas dependentes.";
  if(row.reason==="copied_data_error")return row.difficultyReduced?"Foi identificado um erro de cópia de dados que altera a dificuldade. O corretor mantém essa origem explícita para aplicar corretamente os limites nas etapas dependentes.":"Foi identificado um erro de cópia de dados sem redução de dificuldade. Aplicámos a desvalorização global prevista nos critérios IAVE.";
  if(row.reason==="copied_number_or_sign_error")return "A cadeia mostra o valor correto e uma troca isolada de algarismo ou sinal na sua transcrição. Aplicámos apenas a desvalorização prevista para esta situação.";
  if(row.reason==="occasional_calculation_error")return "O processo identificado está correto, mas há uma falha ocasional no cálculo final desta etapa. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="conceptual_error")return "O item identifica esta resposta como um erro conceptual específico. A etapa ficou limitada à parte inteira de metade da cotação, de acordo com os critérios IAVE.";
  if(row.reason==="incomplete_step")return row.missingOnlyFinalPassage?"A etapa está correta até à última passagem necessária. Foi aplicada apenas a desvalorização prevista para essa omissão final.":"A etapa está incompleta segundo o critério específico do item. Foi aplicado o limite de cotação previsto nos critérios IAVE.";
  if(row.reason==="intermediate_rounding")return "Foi identificado um cálculo intermédio com número de casas decimais diferente do solicitado ou um arredondamento intermédio incorreto. A regra geral IAVE retira um ponto à soma das pontuações da resposta.";
  if(row.reason==="upstream_error_effect")return row.difficultyReduced?"Esta etapa segue corretamente o erro anterior, mas esse erro tornou a etapa mais fácil. Aplicámos o limite de metade da cotação previsto na Nota 2 dos critérios IAVE.":"Esta etapa segue corretamente o erro anterior sem redução de dificuldade e foi classificada pelo critério específico adaptado.";
  if(row.reason==="wrong_final_form")return "O valor é matematicamente equivalente, mas não está apresentado na forma final pedida. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="approximate_instead_of_exact")return "Foi apresentado um valor aproximado quando era exigido um valor exato. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="approximate_used_instead_of_exact")return "Uma aproximação anterior foi usada num cálculo seguinte em vez do valor exato. Aplicámos o limite de cotação previsto nos critérios IAVE.";
  if(row.reason==="wrong_final_rounding")return "A cadeia mostra o valor não arredondado correto, mas o arredondamento final indicado está incorreto. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="excess_elements")return row.affectsPerformance?"Foram identificados elementos em excesso que afetam o desempenho pedido. Aplicámos a desvalorização global prevista nos critérios IAVE.":"Foram identificados elementos em excesso, mas sem efeito no desempenho pedido; não houve desvalorização automática.";
  if(row.reason==="formal_notation_error")return row.onlyZeroPointSteps?"Foi identificada uma incorreção de simbologia apenas em etapas sem pontuação; não houve desvalorização global.":"Foi identificada uma incorreção de simbologia formal numa etapa pontuada. Aplicámos a desvalorização global prevista nos critérios IAVE.";
  if(row.reason==="calculation_error")return "O cálculo identificado não dá o valor esperado. Como não é seguro concluir automaticamente que se trata apenas de uma falha ocasional, esta classificação não é inferida sem evidência suficiente.";
  if(row.reason==="conflicting_results")return "Encontrámos resultados incompatíveis para a mesma grandeza. Não atribuímos estes pontos automaticamente.";
  if(row.reason==="no_recognizable_work")return "Não identificámos cálculos ou uma explicação que permitam avaliar esta etapa.";
  if(row.status==="needs_review")return "Não conseguimos confirmar esta etapa. Pode estar incompleta ou escrita de uma forma que o corretor ainda não reconhece.";
  return `Identificado na tua resolução: ${row.answer||"Não identificado"}`;
}

export function expectedResponseLabel(question){
  const response=question?.response;
  if(response?.type==="completion")return response.blanks.map(b=>`${b.label} ${b.options[b.correct]}`).join(" · ");
  if(!response)return question?.o?.[question?.a]??"—";
  if(response.type==="numeric")return String(response.value).replace(".",",");
  if(response.type==="fraction")return `${response.numerator}/${response.denominator}`;
  if(response.type==="stepwise")return response.steps.map(row=>`${row.label}: ${row.expected}`).join(" · ");
  return "—";
}

export function studentResponseLabel(question,answer){
  if(!isResponseAnswered(question,answer))return "Sem resposta";
  if(responseType(question)==="completion")return question.response.blanks.map(b=>`${b.label} ${b.options[answer?.[b.id]]??"Sem resposta"}`).join(" · ");
  if(responseType(question)==="choice")return `${String.fromCharCode(65+answer)} — ${question.o[answer]}`;
  if(responseType(question)==="stepwise"){
    if(typeof answer==="string")return answer.trim();
    const filled=question.response.steps.filter(row=>hasText(answer?.steps?.[row.id])).length;
    return hasText(answer?.working)?answer.working.trim():`${filled}/${question.response.steps.length} etapas preenchidas`;
  }
  return String(answer).trim();
}

export function gradeResponse(question,answer){
  const type=responseType(question),maxPoints=Number(question?.points)||(type==="choice"?5:35);
  if(!isResponseAnswered(question,answer))return {status:"unanswered",correct:false,points:0,maxPoints,stepResults:[]};
  if(type==="completion"){
    const blanks=question.response.blanks;
    const blankResults=blanks.map(b=>({id:b.id,label:b.label,correct:answer?.[b.id]===b.correct,answer:b.options[answer?.[b.id]]??"Sem resposta",expected:b.options[b.correct]}));
    const correctCount=blankResults.filter(b=>b.correct).length;
    const points=maxPoints*correctCount/blanks.length,correct=correctCount===blanks.length;
    return {status:correct?"correct":points>0?"partial":"incorrect",correct,points,maxPoints,stepResults:[],blankResults};
  }
  if(type==="stepwise"){
    if(presentsOnlyFinalResult(question,answer))return {status:"incorrect",correct:false,points:0,maxPoints,stepResults:[],pendingPoints:0,reviewRequired:false,reason:"final_result_only",iaveSituation:iaveSituationLabel("final_result_only"),classificationConfidence:"high"};
    const lines=stepwiseLines(answer);
    const fullAnswer=typeof answer==="string"?answer:answer?.working||"";
    const usedUnlabelled=new Set();
    const rawStepResults=question.response.steps.map(spec=>{
      if(hasText(answer?.steps?.[spec.id])){
        const result=gradeStep(spec,answer.steps[spec.id]);
        return !result.correct&&result.status!=="partial"&&spec.type==="text"?{...result,status:"needs_review",reason:"not_verified"}:result;
      }
      const result=gradeStepFromWorking(spec,lines,fullAnswer,usedUnlabelled);
      if((result.correct||result.status==="partial")&&Number.isInteger(result.matchedUnlabelledIndex))usedUnlabelled.add(result.matchedUnlabelledIndex);
      return result;
    });
    const implicitAdjustedResults=rawStepResults.map((result,index)=>{
      const spec=question.response.steps[index];
      const rule=declaredImplicitRule(spec);
      if(!rule||hasText(answer?.steps?.[spec.id]))return result;
      const implicitTraversal=implicitEvidenceMatches(question,answer,rule);
      const reason="implicit_non_calculation_step";
      return {...result,status:implicitTraversal?"correct":"incorrect",correct:implicitTraversal,points:implicitTraversal?spec.points:0,reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",implicitTraversal,dependentStepIds:rule.dependentStepIds};
    });
    const approximationAdjustedResults=implicitAdjustedResults.map((result,index)=>{
      const spec=question.response.steps[index];
      if(result.correct||!spec?.approximationDependsOn||!matchesPropagatedApproximation(spec,answer?.steps?.[spec.id]))return result;
      const upstreamIds=Array.isArray(spec.approximationDependsOn)?spec.approximationDependsOn:[spec.approximationDependsOn];
      const upstreamApproximation=implicitAdjustedResults.some(row=>upstreamIds.includes(row.stepId)&&row.reason==="approximate_instead_of_exact");
      if(!upstreamApproximation)return result;
      const reason="approximate_used_instead_of_exact";
      return {...result,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
    });
    const dependencySources=approximationAdjustedResults.filter(row=>(row.reason==="instruction_violation"||(row.reason==="implicit_non_calculation_step"&&!row.implicitTraversal))&&Array.isArray(row.dependentStepIds));
    const zeroedByDependency=approximationAdjustedResults.map(result=>{
      const source=dependencySources.find(row=>row.dependentStepIds.includes(result.stepId));
      if(!source||result.stepId===source.stepId)return result;
      return {...result,status:"incorrect",correct:false,points:0,reason:"dependent_zero_due_to_iave",classificationConfidence:"high",sourceStepId:source.stepId,iaveRule:source.iaveSituation};
    });
    const stepResults=zeroedByDependency.map((result,index)=>{
      const spec=question.response.steps[index];
      const directValue=answer?.steps?.[spec.id];
      if(result.correct||result.status==="partial"||!hasText(directValue))return result;
      const effect=declaredUpstreamErrorEffect(spec,directValue,zeroedByDependency);
      if(!effect)return result;
      const points=effect.difficultyReduced?dependentStepCap(spec.points,{upstreamDifficultyReduced:true}):spec.points;
      return {...result,status:points===spec.points?"correct":"partial",correct:points===spec.points,points,reason:"upstream_error_effect",classificationConfidence:"high",iaveRule:"Nota 2",sourceStepId:effect.from,difficultyReduced:effect.difficultyReduced};
    });
    const stepPoints=stepResults.reduce((sum,row)=>sum+row.points,0);
    const globalReasons=[];
    if(stepResults.some(row=>row.reason==="intermediate_rounding"))globalReasons.push({reason:"intermediate_rounding"});
    for(const row of stepResults){
      if(row.reason==="copied_data_error")globalReasons.push({reason:row.reason,difficultyReduced:row.difficultyReduced});
      if(row.reason==="excess_elements")globalReasons.push({reason:row.reason,affectsPerformance:row.affectsPerformance});
      if(row.reason==="formal_notation_error")globalReasons.push({reason:row.reason,onlyZeroPointSteps:row.onlyZeroPointSteps});
    }
    const points=applyIaveGlobalPenalties(stepPoints,globalReasons),globalPenalty=stepPoints-points,correct=points===maxPoints;
    const pendingPoints=stepResults.filter(row=>row.status==="needs_review").reduce((sum,row)=>sum+row.maxPoints,0);
    const globalPenalties=globalReasons.map(item=>({reason:item.reason,iaveSituation:iaveSituationLabel(item.reason),points:iaveGlobalPenalty(item.reason,item),classificationConfidence:"high"})).filter(item=>item.points>0);
    return {status:pendingPoints?"needs_review":correct?"correct":points>0?"partial":"incorrect",correct,points,maxPoints,stepResults,pendingPoints,reviewRequired:pendingPoints>0,globalPenalty,globalPenalties,reason:pendingPoints?"not_verified":correct?null:points>0?"partial_credit":"incorrect"};
  }
  let correct=false,reason="incorrect";
  if(type==="choice")correct=answer===question.a;
  if(type==="numeric"){
    const parsed=parseNumeric(answer),tolerance=Math.max(0,Number(question.response.tolerance)||0);
    correct=parsed!==null&&Math.abs(parsed-Number(question.response.value))<=tolerance+Number.EPSILON;
    if(parsed===null)reason="invalid_numeric_format";
  }
  if(type==="fraction"){
    const parsed=parseFraction(answer);
    correct=!!parsed&&parsed.numerator*question.response.denominator===question.response.numerator*parsed.denominator;
    if(!parsed)reason="invalid_fraction_format";
  }
  return {status:correct?"correct":"incorrect",correct,points:correct?maxPoints:0,maxPoints,stepResults:[],reason:correct?null:reason};
}

export function miniExamPointSummary(questions=[],answers=[]){
  const results=questions.map((question,index)=>({questionId:question.id,answer:answers[index],...gradeResponse(question,answers[index])}));
  const earnedPoints=results.reduce((sum,row)=>sum+row.points,0),maxPoints=results.reduce((sum,row)=>sum+row.maxPoints,0);
  const score20=maxPoints?Math.round((earnedPoints/maxPoints)*200)/10:0;
  const pendingPoints=results.reduce((sum,row)=>sum+(row.pendingPoints||0),0);
  return {results,earnedPoints,maxPoints,score20,pendingPoints,reviewRequired:pendingPoints>0,score20Upper:maxPoints?Math.round((earnedPoints+pendingPoints)/maxPoints*200)/10:0,correctCount:results.filter(row=>row.correct).length};
}

export function examScoreLabel(result){
  const lower=String(result.score20).replace(".",",");
  return result.reviewRequired?"Avaliação incompleta":`${lower}/20`;
}
