import {equivalentPolynomial} from "./polynomial.js";
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

function withoutPrefix(value){return normalizedInput(value).replace(/^[a-zA-ZÀ-ÿ′']+(?:\([^)]*\))?=/,"")}
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
    correct=hasText(value)&&input.replace(/[.!]$/g,"")===normalizedWords(spec.expected).replace(/[.!]$/g,"");
    if(!input)reason="empty_justification";
  }
  return {stepId:spec.id,label:spec.label,status:correct?"correct":"incorrect",correct,points:correct?spec.points:0,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason:correct?null:reason};
}

function stepwiseLines(answer){
  if(typeof answer==="string")return answer.split(/\r?\n/).map(row=>row.trim()).filter(Boolean);
  if(hasText(answer?.working))return answer.working.split(/\r?\n/).map(row=>row.trim()).filter(Boolean);
  return [];
}

function gradeStepFromWorking(spec,lines,fullAnswer){
  const candidates=[...lines];
  if(spec.type!=="text")for(const line of lines){
    const parts=line.split("=").map(x=>x.trim());
    // Only extract from an equation with the expected mathematical designation.
    const expectedPrefix=String(spec.expected).split("=")[0];
    if(parts.length>1&&[expectedPrefix,...(spec.prefixes||[])].some(prefix=>normalizedExpression(parts[0])===normalizedExpression(prefix)))candidates.push(...parts.slice(1));
  }
  if(spec.type==="text"&&hasText(fullAnswer))candidates.push(fullAnswer);
  for(const candidate of candidates){
    const result=gradeStep(spec,candidate);
    if(result.correct)return result;
  }
  const result=gradeStep(spec,"");
  return fullAnswer.trim()?{...result,status:"needs_review",reason:"not_verified",answer:""}:result;
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
  return result.reviewRequired?`${lower}–${String(result.score20Upper).replace(".",",")}/20 · provisório`:`${lower}/20`;
}
