export const CONSTRUCTED_RESPONSE_BANK=[
  {
    id:"CRV1-10FUN-NUM-1",themeId:"10-fun",subtopicId:"10-fun-dominio-imagem-zeros",
    microcompetencyId:"mc-10-fun-dominio-e-zeros",focus:"Domínio e zeros",difficulty:2,cognitive:"Aplicação",
    q:"Considera a função f(x)=3x−12. Determina o zero de f.",
    response:{type:"numeric",value:4,tolerance:0,placeholder:"Ex.: 4",label:"Resposta numérica"},
    points:35,sol:"O zero verifica f(x)=0. Assim, 3x−12=0, logo x=4.",
    hyp:"Pode existir dificuldade em determinar o zero de uma função afim.",
    contexts:["exam"],signature:"10-fun:Domínio e zeros:constructed-v1-1",reviewStatus:"prototype",origin:"constructed_v1"
  },
  {
    id:"CRV1-10GA-FRAC-1",themeId:"10-ga",subtopicId:"10-ga-colinearidade-retas",
    microcompetencyId:"mc-10-ga-retas-e-planos",focus:"Retas e planos",difficulty:2,cognitive:"Aplicação",
    q:"Determina o declive da reta que passa pelos pontos A(1,2) e B(5,4). Apresenta o resultado na forma de fração irredutível.",
    response:{type:"fraction",numerator:1,denominator:2,placeholder:"Ex.: 1/2",label:"Fração irredutível"},
    points:35,sol:"m=(4−2)/(5−1)=2/4=1/2.",
    hyp:"Pode existir dificuldade em calcular e simplificar o declive de uma reta.",
    contexts:["exam"],signature:"10-ga:Retas e planos:constructed-v1-1",reviewStatus:"prototype",origin:"constructed_v1"
  },
  {
    id:"CRV1-11CD-NUM-1",themeId:"11-cd",subtopicId:"11-cd-derivada-ponto",
    microcompetencyId:"mc-11-cd-derivadas",focus:"Derivadas",difficulty:3,cognitive:"Aplicação",
    q:"Seja f(x)=x³−2x. Calcula f′(2).",
    response:{type:"numeric",value:10,tolerance:0,placeholder:"Ex.: 10",label:"Resposta numérica"},
    points:35,sol:"f′(x)=3x²−2. Portanto, f′(2)=3×4−2=10.",
    hyp:"Pode existir dificuldade em calcular uma derivada num ponto.",
    contexts:["exam"],signature:"11-cd:Derivadas:constructed-v1-1",reviewStatus:"prototype",origin:"constructed_v1"
  },
  {
    id:"CRV1-11CONT-NUM-1",themeId:"11-cont",subtopicId:"11-cont-combinacoes",
    microcompetencyId:"mc-11-cont-combinacoes",focus:"Combinações",difficulty:2,cognitive:"Aplicação",
    q:"De um grupo de 5 alunos, quantas comissões diferentes de 2 alunos podem ser formadas?",
    response:{type:"numeric",value:10,tolerance:0,placeholder:"Ex.: 10",label:"Número de comissões"},
    points:35,sol:"A ordem não interessa: C(5,2)=5!/(2!3!)=10.",
    hyp:"Pode existir dificuldade em reconhecer e calcular uma combinação.",
    contexts:["exam"],signature:"11-cont:Combinações:constructed-v1-1",reviewStatus:"prototype",origin:"constructed_v1"
  },
  {
    id:"CRV1-12FCONT-NUM-1",themeId:"12-fcont",subtopicId:"12-fcont-limites-continuidade",
    microcompetencyId:"mc-12-fcont-limites",focus:"Limites",difficulty:3,cognitive:"Aplicação",
    q:"Calcula lim(x→3) (x²−9)/(x−3).",
    response:{type:"numeric",value:6,tolerance:0,placeholder:"Ex.: 6",label:"Valor do limite"},
    points:35,sol:"Para x≠3, (x²−9)/(x−3)=x+3. Logo, o limite é 3+3=6.",
    hyp:"Pode existir dificuldade em resolver uma indeterminação por fatorização.",
    contexts:["exam"],signature:"12-fcont:Limites:constructed-v1-1",reviewStatus:"prototype",origin:"constructed_v1"
  },
  {
    id:"CRV1-12INT-FRAC-1",themeId:"12-int",subtopicId:"12-int-integral-definido",
    microcompetencyId:"mc-12-int-integral-definido",focus:"Integral definido",difficulty:2,cognitive:"Aplicação",
    q:"Calcula ∫₀¹ x dx. Apresenta o resultado na forma de fração irredutível.",
    response:{type:"fraction",numerator:1,denominator:2,placeholder:"Ex.: 1/2",label:"Fração irredutível"},
    points:35,sol:"∫₀¹x dx=[x²/2]₀¹=1/2.",
    hyp:"Pode existir dificuldade em calcular um integral definido elementar.",
    contexts:["exam"],signature:"12-int:Integral definido:constructed-v1-1",reviewStatus:"prototype",origin:"constructed_v1"
  }
];

export function responseType(question){
  return question?.response?.type||"choice";
}

export function isConstructedResponse(question){
  return responseType(question)!=="choice";
}

export function isResponseAnswered(question,answer){
  if(responseType(question)==="choice")return Number.isInteger(answer);
  return typeof answer==="string"&&answer.trim().length>0;
}

function normalizedInput(value){
  return String(value??"").trim().replace(/−/g,"-").replace(/\s+/g,"").replace(",", ".");
}

function parseNumeric(value){
  const input=normalizedInput(value);
  if(!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(input))return null;
  const parsed=Number(input);
  return Number.isFinite(parsed)?parsed:null;
}

function parseFraction(value){
  const input=normalizedInput(value);
  const match=input.match(/^([+-]?\d+)\/([+-]?\d+)$/);
  if(!match)return null;
  const numerator=Number(match[1]),denominator=Number(match[2]);
  if(!Number.isSafeInteger(numerator)||!Number.isSafeInteger(denominator)||denominator===0)return null;
  return {numerator,denominator};
}

export function expectedResponseLabel(question){
  const response=question?.response;
  if(!response)return question?.o?.[question?.a]??"—";
  if(response.type==="numeric")return String(response.value).replace(".",",");
  if(response.type==="fraction")return `${response.numerator}/${response.denominator}`;
  return "—";
}

export function studentResponseLabel(question,answer){
  if(!isResponseAnswered(question,answer))return "Sem resposta";
  if(responseType(question)==="choice")return `${String.fromCharCode(65+answer)} — ${question.o[answer]}`;
  return String(answer).trim();
}

export function gradeResponse(question,answer){
  const type=responseType(question);
  const maxPoints=Number(question?.points)||(type==="choice"?5:35);
  if(!isResponseAnswered(question,answer))return {status:"unanswered",correct:false,points:0,maxPoints};

  let correct=false,reason="incorrect";
  if(type==="choice")correct=answer===question.a;
  if(type==="numeric"){
    const parsed=parseNumeric(answer);
    const tolerance=Math.max(0,Number(question.response.tolerance)||0);
    correct=parsed!==null&&Math.abs(parsed-Number(question.response.value))<=tolerance+Number.EPSILON;
    if(parsed===null)reason="invalid_numeric_format";
  }
  if(type==="fraction"){
    const parsed=parseFraction(answer);
    correct=!!parsed&&parsed.numerator*question.response.denominator===question.response.numerator*parsed.denominator;
    if(!parsed)reason="invalid_fraction_format";
  }

  return {status:correct?"correct":"incorrect",correct,points:correct?maxPoints:0,maxPoints,reason:correct?null:reason};
}

export function miniExamPointSummary(questions=[],answers=[]){
  const results=questions.map((question,index)=>({questionId:question.id,answer:answers[index],...gradeResponse(question,answers[index])}));
  const earnedPoints=results.reduce((sum,row)=>sum+row.points,0);
  const maxPoints=results.reduce((sum,row)=>sum+row.maxPoints,0);
  const score20=maxPoints?Math.round((earnedPoints/maxPoints)*200)/10:0;
  return {results,earnedPoints,maxPoints,score20,correctCount:results.filter(row=>row.correct).length};
}
