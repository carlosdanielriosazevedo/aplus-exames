export const RECURRING_ERROR_MEMORY_VERSION=1;
export const RECURRING_ERROR_STALE_DAYS=45;

const DAY=24*60*60*1000;
const GENERIC_CODES=new Set(["correct_or_near_correct","correct","incorrect","partial_credit","not_verified","needs_review","unknown"]);

const CATEGORY_RULES=[
  {id:"units",terms:["unit","unidade"],label:"Unidades e grandezas",message:"Tens perdido pontos por não indicar, trocar ou usar incorretamente unidades/grandezas.",global:true},
  {id:"sign",terms:["sign","sinal","algebr"],label:"Sinais e sentido algébrico",message:"O sinal ou o sentido algébrico tem aparecido como fonte de perda de pontos.",global:true},
  {id:"rounding",terms:["round","arredond","approximate","aproxim"],label:"Arredondamentos e aproximações",message:"O arredondamento ou o uso de aproximações tem retirado precisão às respostas.",global:true},
  {id:"final_form",terms:["final_form","wrong_final_form","forma final"],label:"Forma final da resposta",message:"O raciocínio pode estar encaminhado, mas a forma final pedida nem sempre fica respeitada.",global:true},
  {id:"missing_work",terms:["missing_required_work","final_result_only","missing_work","justifica","justification","fundament"],label:"Justificação insuficiente",message:"Tens chegado a respostas sem mostrar toda a justificação necessária para obter a pontuação completa.",global:true},
  {id:"instruction",terms:["instruction_violation","instruction","instru"],label:"Cumprimento do pedido",message:"Parte da pontuação tem sido perdida por não cumprir exatamente uma instrução do enunciado.",global:true},
  {id:"contradiction",terms:["contrad","incompat"],label:"Contradições na resposta",message:"Foram detetadas ideias incompatíveis dentro da mesma resposta.",global:true},
  {id:"wrong_quantity",terms:["wrong_quantity","grandeza errada"],label:"Grandeza ou relação escolhida",message:"Tens aplicado uma expressão ou relação a uma grandeza diferente da que o problema pede.",global:false},
  {id:"calculation",terms:["calculation_error","calculo","cálculo"],label:"Execução do cálculo",message:"Há um padrão de erros na execução de cálculos depois de o método já estar escolhido.",global:false},
  {id:"conceptual",terms:["conceptual_error","concept","conceit"],label:"Conceito científico/matemático",message:"A mesma dificuldade conceptual voltou a aparecer nesta área.",global:false}
];

const text=value=>String(value??"").trim();
const norm=value=>text(value).toLocaleLowerCase("pt-PT").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9_ -]/g," ");
const unique=list=>[...new Set(list.filter(Boolean))];

function scoreRatio(result){
  const awarded=Number.isFinite(result?.provisionalPoints)?Number(result.provisionalPoints):Number(result?.points);
  const maximum=Number(result?.maxPoints);
  return Number.isFinite(awarded)&&Number.isFinite(maximum)&&maximum>0?awarded/maximum:null;
}

function categoryFor(rawCode,label="",message=""){
  const haystack=norm([rawCode,label,message].filter(Boolean).join(" "));
  return CATEGORY_RULES.find(rule=>rule.terms.some(term=>haystack.includes(norm(term))))||null;
}

function scopeFor(item,category){
  if(category?.global)return "subject";
  return item?.competencyId||item?.subtopicId||item?.domain||item?.themeId||"general";
}

function diagnosticCandidates(result={}){
  return [result?.errorDiagnosis,result?.feedbackSummary?.errorDiagnosis,result?.diagnosticCard?.errorDiagnosis]
    .filter(Boolean)
    .map(row=>({code:row.code||row.id||row.reason,label:row.label||row.title,message:row.message||row.detail}));
}

export function extractErrorSignals(item,result={}){
  if(!result||result.status==="unanswered")return [];
  const candidates=[...diagnosticCandidates(result)];

  for(const step of result.steps||result.stepResults||[]){
    if(["correct","observed"].includes(step?.status)||step?.correct===true)continue;
    const code=step?.errorType||step?.reason;
    if(code)candidates.push({code,label:step.label,message:step.lossReason||step.message||step.note});
  }

  for(const criterion of result.criteria||[]){
    if(["observed","correct"].includes(criterion?.status))continue;
    if(!["partial","not-observed","unsure","needs_review","incorrect"].includes(criterion?.status))continue;
    candidates.push({
      code:`criterion:${criterion.id||norm(criterion.label)||"unknown"}`,
      label:criterion.label||criterion.title||"Critério da resposta",
      message:criterion.lossReason||criterion.feedback||criterion.message||criterion.note
    });
  }

  const byKey=new Map();
  for(const candidate of candidates){
    const raw=norm(candidate.code);
    if(!raw||GENERIC_CODES.has(raw))continue;
    const category=categoryFor(raw,candidate.label,candidate.message);
    const categoryId=category?.id||(raw.startsWith("criterion ")||raw.startsWith("criterion:" )?raw.replace(/\s+/g,"_"):raw);
    const scope=scopeFor(item,category);
    const key=`${scope}|${categoryId}`;
    if(byKey.has(key))continue;
    byKey.set(key,{
      key,code:categoryId,rawCode:candidate.code,scope,
      label:category?.label||candidate.label||"Aspeto a melhorar",
      message:candidate.message||category?.message||"Este aspeto voltou a retirar pontuação à resposta.",
      itemId:item?.id||null,domain:item?.domain||item?.themeId||null,
      competencyId:item?.competencyId||null,subtopicId:item?.subtopicId||null
    });
  }
  return [...byKey.values()];
}

export function normalizeErrorPatterns(patterns={}){
  if(!patterns||typeof patterns!=="object"||Array.isArray(patterns))return {};
  return Object.fromEntries(Object.entries(patterns).map(([key,row])=>[key,{
    key,
    code:row?.code||key.split("|").at(-1),scope:row?.scope||key.split("|")[0]||"general",
    label:row?.label||"Aspeto a melhorar",message:row?.message||"Este aspeto tem aparecido mais do que uma vez.",
    count:Number(row?.count)||0,firstAt:row?.firstAt||null,lastAt:row?.lastAt||null,
    itemIds:unique(Array.isArray(row?.itemIds)?row.itemIds:[]).slice(-12),
    recoveryEvidence:Number(row?.recoveryEvidence)||0,status:row?.status||"observed",
    domain:row?.domain||null,competencyId:row?.competencyId||null,subtopicId:row?.subtopicId||null
  }]));
}

function patternMatchesItem(pattern,item){
  if(pattern.scope==="subject")return true;
  return pattern.scope===(item?.competencyId||item?.subtopicId||item?.domain||item?.themeId||"general");
}

function strongSuccess(result){
  if(result?.correct===true)return true;
  const ratio=scoreRatio(result);
  return ratio!==null&&ratio>=.8&&!result?.requiresReview&&!result?.reviewRequired;
}

export function recordErrorPatternEvidence(patterns,item,result,at=Date.now()){
  const next=normalizeErrorPatterns(patterns);
  const signals=extractErrorSignals(item,result);
  const signalKeys=new Set(signals.map(row=>row.key));

  for(const signal of signals){
    const previous=next[signal.key]||{...signal,count:0,itemIds:[],recoveryEvidence:0,status:"observed",firstAt:at};
    const itemIds=unique([...(previous.itemIds||[]),signal.itemId]).slice(-12);
    const count=(previous.count||0)+1;
    const recurring=itemIds.length>=2||count>=3;
    next[signal.key]={...previous,...signal,count,itemIds,firstAt:previous.firstAt||at,lastAt:at,recoveryEvidence:0,status:recurring?"recurring":"observed"};
  }

  if(strongSuccess(result)){
    for(const [key,pattern] of Object.entries(next)){
      if(signalKeys.has(key)||!patternMatchesItem(pattern,item)||!["recurring","improving"].includes(pattern.status))continue;
      const recoveryEvidence=(pattern.recoveryEvidence||0)+1;
      next[key]={...pattern,recoveryEvidence,status:recoveryEvidence>=3?"resolved":recoveryEvidence>=2?"improving":pattern.status};
    }
  }
  return next;
}

export function recurringErrorPatterns(patterns={},now=Date.now()){
  return Object.values(normalizeErrorPatterns(patterns))
    .map(row=>{
      const ageDays=row.lastAt?Math.max(0,(now-row.lastAt)/DAY):999;
      return {...row,ageDays,stale:ageDays>RECURRING_ERROR_STALE_DAYS};
    })
    .filter(row=>["recurring","improving"].includes(row.status)&&!row.stale)
    .sort((a,b)=>(b.lastAt||0)-(a.lastAt||0)||(b.count||0)-(a.count||0));
}

export function recurringErrorNudge(patterns,item,result,now=Date.now()){
  const current=extractErrorSignals(item,result);
  if(!current.length)return null;
  const active=recurringErrorPatterns(patterns,now);
  const match=current.map(signal=>active.find(pattern=>pattern.key===signal.key)).find(Boolean);
  if(!match)return null;
  return {
    key:match.key,
    label:match.label,
    message:match.status==="improving"
      ?`Este padrão já apareceu antes, mas também já mostraste sinais de recuperação. Confirma este ponto nas próximas respostas.`
      :match.message,
    occurrences:match.count,
    distinctItems:match.itemIds.length,
    status:match.status
  };
}
