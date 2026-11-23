import {PHYSICS_CHEMISTRY_A_STEPWISE_RULES,physicsChemistryStepwisePolicyFor} from "../data/physicsChemistryStepwisePolicy.js";

function normalizeText(value){
  return String(value??"").trim().toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/×|·/g,"*")
    .replace(/²/g,"^2")
    .replace(/₃/g,"3").replace(/₀/g,"0").replace(/₁/g,"1").replace(/₂/g,"2")
    .replace(/⁺/g,"+").replace(/⁻/g,"-")
    .replace(/\s+/g,"")
    .replace(/,/g,".");
}

const SUPERSCRIPT_DIGITS=Object.freeze({"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁻":"-","⁺":"+"});

// Notação científica como os alunos a escrevem no telemóvel: 5,8×10⁵, 5,8x10^5,
// 5,8 * 10^5, 5,8·10^5, 5.8e5 ou 580 000. (Auditoria 2026-11-23: "x10^", "*10^" e
// expoentes em superscrito eram lidos como 5,8 e davam um falso erro de cálculo.)
function scientificText(value){
  return String(value??"").trim()
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/gu,char=>SUPERSCRIPT_DIGITS[char])
    .replace(/(\d)[\s\u00a0](?=\d{3}(?:\D|$))/gu,"$1")
    .replace(",",".")
    .replace(/\s*[×·xX*]\s*10\s*\^?\s*\(?\s*([-+−]?)\s*(\d+)\s*\)?/u,(_,sign,exp)=>"e"+(sign==="−"?"-":sign)+exp)
    .replace(/\s*e\s*([-+]?)\s*(\d+)/iu,"e$1$2");
}

function numberFrom(value){
  if(typeof value==="number"&&Number.isFinite(value))return value;
  const match=scientificText(value).match(/[-+]?\d*\.?\d+(?:e[-+]?\d+)?/iu);
  const parsed=match?Number(match[0]):NaN;
  return Number.isFinite(parsed)?parsed:null;
}

// Arredondamento declarado pelo próprio aluno: metade da unidade do último algarismo
// significativo que escreveu (5,8×10⁵ → ±5×10³). Só conta com pelo menos 2
// algarismos significativos. (Auditoria 2026-11-23, B-02: arredondamentos
// corretos a 2 algarismos significativos eram tratados como erro de cálculo.)
export function declaredRoundingHalfUnit(value){
  if(typeof value==="number")return 0;
  const match=scientificText(value).match(/[-+]?(\d*)(?:\.(\d+))?(?:e([-+]?\d+))?/iu);
  if(!match||!(match[1]||match[2]))return 0;
  const integer=match[1]||"",decimals=match[2]||"",exponent=Number(match[3]||0);
  let unitExponent,significant;
  if(decimals){
    unitExponent=-decimals.length;
    significant=(integer+decimals).replace(/^0+/,"").length;
  }else{
    const trailingZeros=(integer.match(/0+$/)||[""])[0].length;
    unitExponent=trailingZeros;
    significant=integer.replace(/^0+/,"").replace(/0+$/,"").length;
  }
  if(significant<2)return 0;
  return 0.5*10**(unitExponent+exponent)*(1+1e-9);
}

function normalizedStepAnswer(raw){
  if(raw&&typeof raw==="object"&&!Array.isArray(raw)){
    return {work:String(raw.work??""),result:String(raw.result??raw.value??""),unit:String(raw.unit??"")};
  }
  return {work:"",result:String(raw??""),unit:""};
}

// Auditoria externa 2026-11-23 (C-01): o reconhecimento da relação é textual, por
// isso "Não se aplica n=m/M; não fiz o cálculo." continha a relação e recebia
// pontuação máxima. Uma resposta que nega o próprio processo, ou declara que não o
// fez, não demonstra a etapa: fica por rever, sem pontos automáticos. Em caso de
// dúvida o resultado é "por rever", nunca "errado".
const PROCESS_DENIAL_PATTERNS=Object.freeze([
  /\bnao\s+(fiz|faco|calculei|usei|utilizei|apliquei|resolvi|sei|percebi|consegui)\b/u,
  /\bnao\s+se\s+aplica\b/u,
  /\bnao\s+(e|esta)\s+(valida|valido|correta|correto|certa|certo|aplicavel)\b/u,
  /\bsem\s+(fazer|calculo|calculos|calcular|resolver)\b/u,
  /\b(chutei|adivinhei|palpite|ao\s+calhas|a\s+sorte|copiei)\b/u
]);

export function processDenied(work){
  const text=String(work??"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ");
  return PROCESS_DENIAL_PATTERNS.some(pattern=>pattern.test(text));
}

function relationAccepted(work,accepted=[]){
  const normalized=normalizeText(work);
  if(!normalized)return false;
  return accepted.some(candidate=>{
    const target=normalizeText(candidate);
    return normalized===target||normalized.includes(target)||target.includes(normalized);
  });
}

function normalizeUnit(unit){
  return normalizeText(unit).replace(/\^/g,"").replace(/³/g,"3");
}

function unitAccepted(unit,accepted=[]){
  if(!accepted.length)return true;
  const normalized=normalizeUnit(unit);
  return accepted.some(candidate=>normalizeUnit(candidate)===normalized);
}

function numericInExpectedUnit(value,unit,policy){
  const normalized=normalizeUnit(unit);
  const scales=policy?.unitScales||{};
  if(Object.prototype.hasOwnProperty.call(scales,normalized))return value*Number(scales[normalized]);
  return value;
}

function closeEnough(value,target,tolerance){
  return value!==null&&Math.abs(value-Number(target))<=Math.max(0,Number(tolerance)||0);
}

function followThroughValue(policy,previous){
  if(previous===null||!policy)return null;
  if(policy.kind==="multiply")return previous*Number(policy.factor);
  if(policy.kind==="divide")return previous/Number(policy.factor);
  if(policy.kind==="constantDivide")return Number(policy.factor)/previous;
  if(policy.kind==="sqrtScaled")return Math.sqrt(Number(policy.factor)*previous);
  return null;
}

function penaltyFor(type1Count,type2Count){
  if(type2Count>1)return PHYSICS_CHEMISTRY_A_STEPWISE_RULES.multipleType2Penalty;
  if(type2Count===1)return PHYSICS_CHEMISTRY_A_STEPWISE_RULES.oneType2Penalty;
  if(type1Count>0)return PHYSICS_CHEMISTRY_A_STEPWISE_RULES.type1Penalty;
  return 0;
}

export function normalizePhysicsChemistryStepAnswer(value){
  return normalizedStepAnswer(value);
}

export function gradePhysicsChemistryStepwise(item,value){
  const policy=physicsChemistryStepwisePolicyFor(item);
  const answers=value?.steps&&typeof value.steps==="object"?value.steps:{};
  const numericValues={};
  const traversed={};
  const steps=[];
  let type1Count=0,type2Count=0,requiresReview=false;

  for(const step of item.steps||[]){
    const row=normalizedStepAnswer(answers[step.id]);
    const stepPolicy=policy.steps?.[step.id]||{};
    const rawNumeric=step.type==="numeric"?numberFrom(row.result):null;
    const numeric=rawNumeric===null?null:numericInExpectedUnit(rawNumeric,row.unit,stepPolicy);
    if(step.type==="numeric"&&numeric!==null)numericValues[step.id]=numeric;
    const anyInput=Boolean(row.work.trim()||row.result.trim()||row.unit.trim());
    if(!anyInput){
      steps.push({id:step.id,status:"unanswered",points:0,maxPoints:step.points,expected:step.expected,answer:row,errorType:null});
      continue;
    }

    if(!row.work.trim()){
      steps.push({id:step.id,status:"process-missing",points:0,maxPoints:step.points,expected:step.expected,answer:row,errorType:"process-omitted",note:"O processo desta etapa não ficou evidenciado."});
      continue;
    }

    if(processDenied(row.work)){
      requiresReview=true;
      steps.push({id:step.id,status:"contradiction-review",points:null,maxPoints:step.points,expected:step.expected,answer:row,errorType:null,note:"A justificação nega ou não mostra o processo desta etapa. A app não atribui pontos automáticos; compara com a resolução."});
      continue;
    }
    const relationKnown=relationAccepted(row.work,stepPolicy.acceptedRelations||step.accepted||[]);
    if(!relationKnown){
      requiresReview=true;
      steps.push({id:step.id,status:"alternative-method-review",points:null,maxPoints:step.points,expected:step.expected,answer:row,errorType:null,note:"A app não conseguiu verificar automaticamente este processo. Pode ser cientificamente válido; compara-o com a resolução."});
      continue;
    }
    traversed[step.id]=true;

    if(step.type==="text"){
      const input=normalizeText(row.result||row.work);
      const accepted=[step.expected,...(step.accepted||[]),...(stepPolicy.acceptedRelations||[])].map(normalizeText);
      const correct=accepted.some(candidate=>input===candidate||input.includes(candidate)||candidate.includes(input));
      if(correct){
        steps.push({id:step.id,status:"correct",correct:true,points:step.points,maxPoints:step.points,expected:step.expected,answer:row,errorType:null});
      }else{
        type2Count+=1;
        steps.push({id:step.id,status:"analytical-error",correct:false,points:step.points,maxPoints:step.points,expected:step.expected,answer:row,errorType:2,note:"O processo base está identificado, mas o resultado simbólico não foi confirmado pela app."});
      }
      continue;
    }

    if(numeric===null){
      steps.push({id:step.id,status:"result-missing",points:0,maxPoints:step.points,expected:step.expected,answer:row,errorType:null,note:"Falta apresentar o resultado numérico da etapa."});
      continue;
    }

    let status="correct",errorType=null,note="";
    const unitScale=rawNumeric?Math.abs(numeric/rawNumeric):1;
    const roundingTolerance=declaredRoundingHalfUnit(row.result)*unitScale;
    const direct=closeEnough(numeric,step.value,Math.max(Number(step.tolerance)||0,roundingTolerance));
    if(!direct){
      const ft=stepPolicy.followThrough;
      const previous=ft&&traversed[ft.from]?numericValues[ft.from]:null;
      const propagated=followThroughValue(ft,previous);
      if(propagated!==null&&closeEnough(numeric,propagated,Math.max(Number(step.tolerance)||0,Math.abs(propagated)*0.002))){
        status="follow-through";
        note="A etapa está coerente com o valor obtido anteriormente; conserva crédito metodológico e o erro anterior é tratado separadamente.";
      }else{
        status="numeric-error";
        errorType=1;
        type1Count+=1;
        note="Com a relação correta, a diferença numérica é tratada provisoriamente como erro de cálculo.";
      }
    }

    if(stepPolicy.final&&step.unit&&stepPolicy.acceptedUnits?.length){
      if(!row.unit.trim()||!unitAccepted(row.unit,stepPolicy.acceptedUnits)){
        errorType=2;
        type2Count+=1;
        status=status==="correct"?"unit-error":status;
        note=(note?note+" ":"")+"No resultado final, a unidade está ausente ou não é reconhecida como equivalente.";
      }
    }

    steps.push({id:step.id,status,correct:direct,points:step.points,maxPoints:step.points,expected:step.expected,answer:row,errorType,note});
  }

  const answered=steps.some(step=>step.status!=="unanswered");
  if(!answered)return {status:"unanswered",final:false,correct:null,points:null,provisionalPoints:0,maxPoints:item.maxPoints||10,gradingMode:item.gradingMode,steps,requiresReview:false};

  const allProcessMissing=steps.filter(step=>step.status!=="unanswered").every(step=>["process-missing","result-missing"].includes(step.status));
  if(allProcessMissing&&PHYSICS_CHEMISTRY_A_STEPWISE_RULES.finalAnswerOnlyZero){
    return {
      status:"provisional-review",final:false,correct:null,points:null,provisionalPoints:0,maxPoints:item.maxPoints||10,gradingMode:item.gradingMode,steps,
      type1Count,type2Count,penalty:0,requiresReview,
      note:"Só o resultado final, sem processo percorrido, não permite atribuir pontuação num item organizado por etapas."
    };
  }

  const basePoints=steps.reduce((sum,step)=>sum+(Number.isFinite(step.points)?step.points:0),0);
  const penalty=penaltyFor(type1Count,type2Count);
  const provisionalPoints=requiresReview?null:Math.max(0,basePoints-penalty);
  return {
    status:"provisional-review",final:false,correct:null,points:null,provisionalPoints,maxPoints:item.maxPoints||10,gradingMode:item.gradingMode,steps,
    type1Count,type2Count,penalty,requiresReview,
    note:requiresReview
      ?"Há pelo menos uma etapa que a app não consegue avaliar automaticamente (processo alternativo, ou justificação que nega o próprio processo). A classificação não está disponível para essa parte da resposta."
      :"Indicação provisória segundo regras gerais de itens por etapas: soma das etapas e desvalorização por erros detetáveis. Não substitui os critérios específicos oficiais."
  };
}
