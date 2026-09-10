import {canonicalPolynomial,equivalentPolynomial} from "./polynomial.js";
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
      step("derivative","1. Expressão de f′(x)","expression",15,{accepted:["f'(x)=3x^2-2","3x^2-2","f′(x)=3x^2-2"],expected:"f′(x)=3x²−2",placeholder:"Ex.: 3x^2−2"}),
      step("substitution","2. Substituição de x=2","expression",8,{prefixes:["f'(2)"],accepted:["3*2^2-2","3x2^2-2","3·2^2-2","3(2)^2-2"],expected:"3×2²−2",placeholder:"Ex.: 3×2^2−2"}),
      step("value","3. Valor de f′(2)","numeric",12,{value:10,tolerance:0,expected:"f′(2)=10",placeholder:"Ex.: 10"})
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
      step("primitive","1. Uma primitiva de x","expression",15,{accepted:["x^2/2","(x^2)/2","1/2x^2","x²/2"],expected:"x²/2",placeholder:"Ex.: x^2/2"}),
      step("barrow","2. Aplicação nos extremos","expression",10,{accepted:["1^2/2-0^2/2","(1^2)/2-(0^2)/2","1/2-0"],expected:"1²/2−0²/2",placeholder:"Ex.: 1^2/2−0^2/2"}),
      step("value","3. Valor exato do integral","fraction",10,{numerator:1,denominator:2,expected:"1/2",placeholder:"Ex.: 1/2"})
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
      step("formula","1. Expressão do termo geral","expression",12,{accepted:["u_n=3+(n-1)*2","un=3+(n-1)*2","3+(n-1)*2","u_n=3+2(n-1)"],expected:"uₙ=3+2(n−1)",placeholder:"Ex.: u_n=3+2(n−1)"}),
      step("substitution","2. Substituição de n=10","expression",10,{accepted:["3+2*(10-1)","3+2(10-1)","3+(10-1)*2"],expected:"3+2(10−1)",placeholder:"Ex.: 3+2(10−1)"}),
      step("value","3. Valor de u₁₀","numeric",13,{value:21,tolerance:0,expected:"u₁₀=21",placeholder:"Ex.: u₁₀=21"})
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
function normalizedWords(value){return String(value??"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[−–—]/g,"-").replace(/\s+/g," ").trim()}

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

function gradeStep(spec,value){
  let correct=false,reason="incorrect";
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
    correct=!!parsed&&parsed.numerator*spec.denominator===spec.numerator*parsed.denominator;
    if(!parsed)reason="invalid_fraction_format";
  }
  if(spec.type==="expression"){
    const input=normalizedExpression(value);
    correct=hasText(value)&&(spec.accepted||[]).some(candidate=>{
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
    // Unrestricted prose is not certified by keyword presence.
    const accepted=[spec.expected,...(spec.accepted||[])].map(candidate=>normalizedWords(candidate).replace(/[.!]$/g,""));
    correct=hasText(value)&&accepted.includes(input.replace(/[.!]$/g,""));
    if(!input)reason="empty_justification";
  }
  return {stepId:spec.id,label:spec.label,status:correct?"correct":"incorrect",correct,points:correct?spec.points:0,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason:correct?null:reason};
}

function stepwiseLines(answer){
  if(typeof answer==="string")return answer.split(/\r?\n/).map(row=>row.trim()).filter(Boolean);
  if(hasText(answer?.working))return answer.working.split(/\r?\n/).map(row=>row.trim()).filter(Boolean);
  return [];
}

function constantValue(source){
  const canonical=canonicalPolynomial(normalizedExpression(source));
  if(!canonical||canonical.includes(","))return null;
  const [n,d]=canonical.split("/").map(Number);
  const value=n/d;return Number.isFinite(value)?value:null;
}

function gradeStepFromWorking(spec,lines,fullAnswer){
  const candidates=[...lines],explicit=[];
  const expectedPrefix=String(spec.expected).includes("=")?String(spec.expected).split("=")[0]:null;
  for(const line of lines){
    const parts=line.split("=").map(x=>x.trim());
    const matches=parts.length>1&&[expectedPrefix,...(spec.prefixes||[])].filter(Boolean).some(prefix=>normalizedExpression(parts[0])===normalizedExpression(prefix));
    if(matches){
      candidates.push(...parts.slice(1));
      if(["numeric","fraction"].includes(spec.type)){
        const values=parts.slice(1).map(constantValue);
        if(values.every(value=>value!==null)){
          const target=spec.type==="numeric"?spec.value:spec.numerator/spec.denominator;
          const tolerance=Math.max(0,Number(spec.tolerance)||0)+Number.EPSILON;
          explicit.push({line,correct:values.every(value=>Math.abs(value-target)<=tolerance)});
        }
      }
    }
  }
  const base=gradeStep(spec,"");
  if(explicit.length){
    const right=explicit.some(row=>row.correct),wrong=explicit.some(row=>!row.correct);
    if(wrong)return {...base,status:right?"needs_review":"incorrect",reason:right?"conflicting_results":"calculation_error",answer:explicit.map(row=>row.line).join("\n")};
    return {...base,status:"correct",correct:true,points:spec.points,reason:null,answer:explicit[0].line};
  }
  if(spec.type==="text"&&hasText(fullAnswer))candidates.push(fullAnswer);
  for(const candidate of candidates){
    const result=gradeStep(spec,candidate);
    if(result.correct)return result;
  }
  // This describes recognition, not a claim that unfamiliar mathematics is invalid.
  const recognizable=lines.some(line=>canonicalPolynomial(normalizedExpression(line))!==null||/[=→∫√]/.test(line)||/[a-zÀ-ÿ]{3,}/i.test(line));
  return fullAnswer.trim()?{...base,status:"needs_review",reason:recognizable?"not_verified":"no_recognizable_work",answer:""}:base;
}

export function stepFeedback(row){
  if(row.reason==="calculation_error")return "O cálculo identificado não dá o valor esperado. Compara-o com a resolução abaixo.";
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
    const lines=stepwiseLines(answer);
    const fullAnswer=typeof answer==="string"?answer:answer?.working||"";
    const stepResults=question.response.steps.map(spec=>{
      if(hasText(answer?.steps?.[spec.id])){
        const result=gradeStep(spec,answer.steps[spec.id]);
        return !result.correct&&spec.type==="text"?{...result,status:"needs_review",reason:"not_verified"}:result;
      }
      return gradeStepFromWorking(spec,lines,fullAnswer);
    });
    const points=stepResults.reduce((sum,row)=>sum+row.points,0),correct=points===maxPoints;
    const pendingPoints=stepResults.filter(row=>row.status==="needs_review").reduce((sum,row)=>sum+row.maxPoints,0);
    return {status:pendingPoints?"needs_review":correct?"correct":points>0?"partial":"incorrect",correct,points,maxPoints,stepResults,pendingPoints,reviewRequired:pendingPoints>0,reason:pendingPoints?"not_verified":correct?null:points>0?"partial_credit":"incorrect"};
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
