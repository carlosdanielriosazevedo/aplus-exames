import {
  TAXONOMY,PREREQUISITES,FOCUS_PREREQUISITES,MICRO_PREREQUISITES,
  QUESTION_BANK,microcompetencyFor,microcompetencyId,microcompetencyLabel
} from "../data/content.js";
import {generateVariants,hasGenerator} from "./generators.js";
import {isEligibleForContext} from "./quality.js";

export const emptyScores=()=>TAXONOMY.reduce((acc,t)=>{
  acc[t.id]={domain:null,conf:0,evidence:[]};
  return acc;
},{});

export const theme=id=>TAXONOMY.find(t=>t.id===id);
export const byYear=year=>TAXONOMY.filter(t=>t.year===year);

export function getQuestions(themeId,context,focus=null){
  let q=QUESTION_BANK.filter(x=>x.themeId===themeId && x.contexts.includes(context));
  if(focus){
    const mcId=microcompetencyId(themeId,focus);
    const exact=q.filter(x=>
      mcId
        ?(x.microcompetencyId||microcompetencyId(x.themeId,x.focus))===mcId
        :x.focus===focus
    );
    if(exact.length)q=exact;
  }
  return q;
}

export function eligibleQuestions(s,themeId,context,focus=null){
  let q=getQuestions(themeId,context,focus);
  if(!s)return q;
  return q.filter(item=>isEligibleForContext(item,context,s.editorialOverrides||{},s.betaMode||"internal"));
}

export function eligibleCount(s,context){
  return QUESTION_BANK.filter(q=>q.contexts?.includes(context) && isEligibleForContext(q,context,s?.editorialOverrides||{},s?.betaMode||"internal")).length;
}

export function hasTrainingContent(themeId,focus=null,s=null){
  const curated=s?eligibleQuestions(s,themeId,"training",focus):getQuestions(themeId,"training",focus);
  const generatedAllowed=!s || (s.betaMode||"internal")==="internal";
  return curated.length>0 || (generatedAllowed && hasGenerator(themeId,focus));
}

export function diagnosticAnchor(themeId,startDifficulty=2,s=null){
  const candidates=(s?eligibleQuestions(s,themeId,"diagnostic"):QUESTION_BANK.filter(q=>q.themeId===themeId && q.contexts.includes("diagnostic"))).filter(q=>q.role==="anchor");
  if(!candidates.length)return null;
  return [...candidates].sort((a,b)=>Math.abs(a.difficulty-startDifficulty)-Math.abs(b.difficulty-startDifficulty))[0];
}

export const diagnosticProbe=(themeId,s=null)=>
  (s?eligibleQuestions(s,themeId,"diagnostic"):QUESTION_BANK.filter(q=>q.themeId===themeId && q.contexts.includes("diagnostic"))).find(q=>q.role==="probe");

export function certaintyLabel(value,evidenceCount=1){
  if(!evidenceCount)return "Ainda sem evidência";
  if(value>=85)return "Muito elevada";
  if(value>=65)return "Elevada";
  if(value>=40)return "Moderada";
  return "Baixa";
}

export function certaintyHelp(value,evidenceCount=1){
  if(!evidenceCount)return "A A+ ainda não recolheu evidência suficiente nesta área.";
  if(value>=85)return "A A+ já tem evidência muito consistente, variada e recente.";
  if(value>=65)return "A A+ tem evidência consistente, embora continue a recalibrar.";
  if(value>=40)return "Já existem alguns sinais, mas a A+ ainda quer confirmar melhor.";
  return "A A+ ainda tem pouca evidência e deverá voltar a testar esta área.";
}

function signalFor(item,correct){
  if(correct){
    if(item.difficulty<=1)return 62;
    if(item.difficulty===2)return 76;
    if(item.difficulty===3)return 86;
    return 92;
  }
  if(item.difficulty<=1)return 28;
  if(item.difficulty===2)return 42;
  if(item.difficulty===3)return 52;
  return 58;
}

function ageDays(at,now=Date.now()){
  if(!at)return 999;
  return Math.max(0,(now-at)/(1000*60*60*24));
}

function recencyWeight(at,now=Date.now()){
  // O conhecimento não "desaparece" por calendário, mas evidência antiga pesa
  // ligeiramente menos. Mantemos um piso alto para evitar quedas artificiais.
  const days=ageDays(at,now);
  return Math.max(.72,Math.exp(-days/420));
}

function sourceWeight(source){
  if(source==="exam")return 1.35;
  if(source==="mission")return 1.20;
  if(source==="diagnostic")return 1.05;
  return 1;
}

function difficultyWeight(difficulty){
  return difficulty>=3?1.18:difficulty===2?1.05:.90;
}

function signatureDiminishingFactors(evidence){
  const seen=new Map();
  return evidence.map(e=>{
    const key=e.signature||e.itemId||"sem-assinatura";
    const n=seen.get(key)||0;
    seen.set(key,n+1);
    // Repetir a mesma estrutura pode ser útil para aprender, mas não deve
    // fabricar Certeza. A primeira conta inteira; as seguintes rapidamente menos.
    return n===0?1:n===1?.26:n===2?.14:.08;
  });
}

function evidenceAgreement(evidence){
  // Usa a dispersão dos sinais já ajustados à dificuldade. Mistura de acertos e
  // erros é normal; apenas inconsistência forte reduz moderadamente a Certeza.
  const independent=[];
  const seen=new Set();
  [...evidence].sort((a,b)=>(b.at||0)-(a.at||0)).forEach(e=>{
    const key=e.signature||e.itemId;
    if(!seen.has(key) && (e.strength??1)>=.5){seen.add(key);independent.push(e)}
  });
  if(independent.length<2)return {factor:1,dispersion:0,contradictory:false};
  const vals=independent.map(e=>e.signal??50);
  const mean=vals.reduce((a,x)=>a+x,0)/vals.length;
  const variance=vals.reduce((a,x)=>a+(x-mean)**2,0)/vals.length;
  const sd=Math.sqrt(variance);
  const hasCorrect=independent.some(e=>e.correct===true);
  const hasWrong=independent.some(e=>e.correct===false);
  const factor=Math.max(.68,1-Math.max(0,sd-8)/105);
  return {factor,dispersion:Math.round(sd*10)/10,contradictory:hasCorrect&&hasWrong&&sd>=17};
}

function freshnessFactor(evidence,now=Date.now()){
  if(!evidence.length)return 0;
  const latest=Math.min(...evidence.map(e=>ageDays(e.at,now)));
  if(latest<=30)return 1;
  if(latest<=90)return .94;
  if(latest<=180)return .86;
  if(latest<=365)return .74;
  return .62;
}

export function summarizeEvidence(evidence=[],now=Date.now()){
  if(!evidence.length)return {domain:null,conf:0,evidence:[],diagnostics:{independentSignatures:0,contradictory:false,dispersion:0,latestAgeDays:999,stale:true}};

  const diminish=signatureDiminishingFactors(evidence);
  const weighted=evidence.map((e,i)=>({
    ...e,
    w:difficultyWeight(e.difficulty)*sourceWeight(e.source)*(e.strength??1)*diminish[i]*recencyWeight(e.at,now)
  }));
  const denom=weighted.reduce((a,e)=>a+e.w,0)||1;
  const domain=Math.round(weighted.reduce((a,e)=>a+(e.signal??50)*e.w,0)/denom);

  const strong=evidence.filter(e=>(e.strength??1)>=.5);
  const independentSignatures=new Set(strong.map(e=>e.signature||e.itemId)).size;
  const cognitiveVariety=new Set(strong.map(e=>e.cognitive).filter(Boolean)).size;
  const sourceVariety=new Set(strong.map(e=>e.source).filter(Boolean)).size;
  const difficultyVariety=new Set(strong.map(e=>e.difficulty).filter(x=>x!==undefined)).size;
  const agreement=evidenceAgreement(evidence);
  const freshness=freshnessFactor(evidence,now);

  const raw=8 + independentSignatures*14
    +Math.max(0,cognitiveVariety-1)*6
    +Math.max(0,sourceVariety-1)*7
    +Math.max(0,difficultyVariety-1)*4;
  const contradictionPenalty=agreement.contradictory?5:0;
  const conf=Math.max(8,Math.min(94,Math.round(raw*agreement.factor*freshness-contradictionPenalty)));
  const latestAgeDays=Math.round(Math.min(...evidence.map(e=>ageDays(e.at,now))));

  return {
    domain,conf,evidence,
    diagnostics:{
      independentSignatures,cognitiveVariety,sourceVariety,difficultyVariety,
      contradictory:agreement.contradictory,dispersion:agreement.dispersion,
      latestAgeDays,stale:latestAgeDays>120,freshness:Math.round(freshness*100)/100
    }
  };
}

export function recalibrateScore(score,now=Date.now()){
  return summarizeEvidence(score?.evidence||[],now);
}

export function recalibrateAllScores(scores={},now=Date.now()){
  return TAXONOMY.reduce((acc,t)=>{
    acc[t.id]=recalibrateScore(scores?.[t.id],now);
    return acc;
  },{});
}

export function evidenceHealth(score,now=Date.now()){
  return summarizeEvidence(score?.evidence||[],now).diagnostics;
}

export function applyEvidence(score,item,correct,source="diagnostic",strength=1){
  const previous=score?.evidence || [];
  const duplicateSignature=previous.some(e=>(e.signature||e.itemId)===(item.signature||item.id));
  const effectiveStrength=strength*(duplicateSignature?.55:1);

  const newEvidence={
    itemId:item.id,
    themeId:item.themeId,
    focus:item.focus || microcompetencyLabel(item.microcompetencyId) || null,
    microcompetencyId:item.microcompetencyId||microcompetencyId(item.themeId,item.focus)||null,
    correct,
    difficulty:item.difficulty,
    cognitive:item.cognitive,
    signature:item.signature,
    source,
    at:Date.now(),
    signal:signalFor(item,correct),
    strength:effectiveStrength
  };

  return summarizeEvidence([...previous,newEvidence]);
}

export function measuredThemes(s){
  return TAXONOMY.filter(t=>s.scores[t.id]?.domain!==null);
}

export function prepIndex(s){
  const measured=measuredThemes(s);
  if(!measured.length)return null;
  const rows=measured.map(t=>{
    const v=s.scores[t.id];
    const certaintyWeight=Math.max(.35,v.conf/100);
    const relevanceWeight=.75+t.relevance*.08;
    return {value:v.domain,w:certaintyWeight*relevanceWeight};
  });
  return Math.round(rows.reduce((a,r)=>a+r.value*r.w,0)/rows.reduce((a,r)=>a+r.w,0));
}

export function priorityScore(t,s){
  const v=s.scores[t.id];
  if(v?.domain===null || v?.domain===undefined)return -Infinity;
  return nextBestActionBreakdown(t,s).total;
}

export function selectMissionTheme(s){
  const assessed=TAXONOMY
    .filter(t=>s.scores[t.id]?.domain!==null && eligibleQuestions(s,t.id,"mission").length)
    .map(t=>({t,p:priorityScore(t,s)}))
    .sort((a,b)=>b.p-a.p);
  return assessed[0]?.t || null;
}

export function desiredDifficulty(score,goal=16){
  const d=score?.domain;
  let target=d===null||d===undefined?2:d<45?1:d<65?2:d<80?3:4;
  if(goal>=18 && d!==null && d>=55)target=Math.min(4,target+1);
  return target;
}

export function selectMissionQuestion(s,themeId,usedIds=[],usedSignatures=[]){
  const candidates=eligibleQuestions(s,themeId,"mission").filter(q=>!usedIds.includes(q.id));
  if(!candidates.length)return null;
  const target=desiredDifficulty(s.scores[themeId],s.goal);
  const usedCogs=new Set(
    usedIds.map(id=>QUESTION_BANK.find(q=>q.id===id)?.cognitive).filter(Boolean)
  );

  return [...candidates].sort((a,b)=>{
    const score=q=>{
      const diff=Math.abs(q.difficulty-target)*3;
      const signature=usedSignatures.includes(q.signature)?5:0;
      const cognitive=usedCogs.has(q.cognitive)?1.5:0;
      return diff+signature+cognitive;
    };
    return score(a)-score(b);
  })[0];
}

export function selectPrereqQuestion(s,targetThemeId,usedIds=[]){
  const preId=PREREQUISITES[targetThemeId];
  if(!preId)return null;
  const candidates=eligibleQuestions(s,preId,"mission").filter(q=>!usedIds.includes(q.id));
  if(!candidates.length)return null;
  const target=Math.max(1,desiredDifficulty(s.scores[preId],s.goal)-1);
  return [...candidates].sort((a,b)=>Math.abs(a.difficulty-target)-Math.abs(b.difficulty-target))[0];
}

export function missionStopDecision({
  missionType="priority",
  targetCount,
  totalCount,
  beforeConf=0,
  currentScore,
  sessionTargetItems=[],
  beforeFocusConf=null,
  currentFocusScore=null
}){
  const relevantBefore=beforeFocusConf??beforeConf??0;
  const relevantNow=currentFocusScore?.conf??currentScore?.conf??0;
  const confGain=relevantNow-relevantBefore;

  const independent=new Set(
    sessionTargetItems.map(x=>x.signature||x.id).filter(Boolean)
  ).size;
  const cognitiveVariety=new Set(
    sessionTargetItems.map(x=>x.cognitive).filter(Boolean)
  ).size;
  const difficultyVariety=new Set(
    sessionTargetItems.map(x=>x.difficulty).filter(x=>x!==undefined)
  ).size;

  // Calibração é deliberadamente curta: só precisamos de uma primeira âncora.
  if(missionType==="calibration" && targetCount>=1){
    return {
      stop:true,code:"calibration_anchor",
      title:"Primeira âncora recolhida",
      detail:"Esta área já deixou de estar totalmente desconhecida. Voltaremos a medi-la noutras Missões."
    };
  }

  // Confirmações de Treino Livre precisam de pelo menos duas evidências independentes.
  if(missionType==="confirmation"){
    if(targetCount>=2 && independent>=2){
      return {
        stop:true,code:"confirmation_independent",
        title:"Sinal confirmado com evidência independente",
        detail:"Foram recolhidas pelo menos duas evidências diferentes sem prolongar a sessão desnecessariamente."
      };
    }
    if(targetCount>=4 || totalCount>=5){
      return {
        stop:true,code:"confirmation_cap",
        title:"Confirmação encerrada por segurança",
        detail:"A sessão atingiu o limite útil para uma confirmação. Se ainda houver dúvida, o motor voltará a testar noutra ocasião."
      };
    }
    return {stop:false,code:"continue_confirmation"};
  }

  // Segurança: uma Missão nunca deve transformar-se num teste longo.
  if(totalCount>=7){
    return {
      stop:true,code:"session_cap",
      title:"Limite útil da sessão atingido",
      detail:"A A+ prefere distribuir a avaliação por momentos diferentes em vez de recolher demasiada evidência de uma só vez."
    };
  }
  if(targetCount>=6){
    return {
      stop:true,code:"target_cap",
      title:"Já existe evidência suficiente nesta sessão",
      detail:"Se ainda houver incerteza, é mais informativo voltar a esta competência noutra Missão."
    };
  }

  if(targetCount<3)return {stop:false,code:"minimum_not_reached"};

  // Caso ideal: informação diversa + ganho claro de certeza.
  if(independent>=3 && cognitiveVariety>=2 && confGain>=9){
    return {
      stop:true,code:"information_sufficient",
      title:"Informação suficiente para esta sessão",
      detail:`Foram recolhidas ${independent} evidências independentes em ${cognitiveVariety} tipos de raciocínio.`
    };
  }

  // Se a estimativa já está razoavelmente estável, não há benefício em insistir.
  if(targetCount>=4 && independent>=3 && relevantNow>=62){
    return {
      stop:true,code:"stable_estimate",
      title:"Estimativa suficientemente estável",
      detail:"Continuar a perguntar agora acrescentaria pouco valor comparado com voltar a testar mais tarde."
    };
  }

  // Banco sem diversidade: parar é melhor do que fabricar confiança com repetições.
  if(targetCount>=4 && independent<=1){
    return {
      stop:true,code:"low_information",
      title:"As próximas perguntas acrescentariam pouca informação",
      detail:"A sessão foi encerrada porque a evidência disponível é demasiado semelhante para aumentar a Certeza de forma responsável."
    };
  }

  // Um pouco mais de diversidade de dificuldade pode compensar menor ganho de confiança.
  if(targetCount>=5 && independent>=3 && difficultyVariety>=2){
    return {
      stop:true,code:"diverse_enough",
      title:"Já testámos a competência de formas suficientemente diferentes",
      detail:"A próxima verificação será mais útil depois de algum intervalo ou noutro contexto avaliativo."
    };
  }

  return {stop:false,code:"continue"};
}

export function shouldEndMission(args){
  return missionStopDecision(args).stop;
}

export function trainingQuestions(s,{themeId,focus,level},limit=4){
  let curated=eligibleQuestions(s,themeId,"training",focus);
  if(!curated.length)curated=eligibleQuestions(s,themeId,"training");

  const map={basic:1,mid:2,adv:3,challenge:4};
  const target=level==="auto"?desiredDifficulty(s.scores[themeId],s.goal):(map[level]||2);

  const generated=(s.betaMode||"internal")==="internal"?generateVariants({
    themeId,
    focus,
    difficulty:target,
    count:Math.max(limit,5),
    salt:`training|${themeId}|${focus}|${level}|${Date.now()}`
  }):[];

  let candidates=[...generated,...curated];
  if(!candidates.length){
    candidates=(s.betaMode||"internal")==="internal"?generateVariants({
      themeId,
      difficulty:target,
      count:Math.max(limit,5),
      salt:`training-fallback|${themeId}|${level}|${Date.now()}`
    }):[];
  }
  if(!candidates.length)return [];

  const selected=[];
  const usedCog=new Set();
  const usedSignatures=new Set();
  const pool=[...candidates];

  while(pool.length && selected.length<limit){
    pool.sort((a,b)=>{
      const score=q=>Math.abs(q.difficulty-target)*3
        +(usedCog.has(q.cognitive)?1.5:0)
        +(usedSignatures.has(q.signature)?3.5:0)
        +(q.generated?0:0.25);
      return score(a)-score(b);
    });
    const q=pool.shift();
    selected.push(q);
    usedCog.add(q.cognitive);
    usedSignatures.add(q.signature);
  }
  return selected;
}


export function startingDifficulty(profile,goal=16){
  const self=Number(profile?.recentGrade || 0);
  let d=2;
  if(self>0 && self<=10)d=1;
  else if(self>=16)d=3;
  if(goal>=18 && d<3)d+=1;
  if(profile?.syllabus==="little")d=Math.min(d,1);
  if(profile?.syllabus==="most")d=Math.min(d,2);
  return Math.max(1,Math.min(3,d));
}

export function nextDiagnosticDifficulty(previousDifficulty,correct,wasProbe=false){
  if(wasProbe)return previousDifficulty;
  if(correct)return Math.min(3,previousDifficulty+1);
  return Math.max(1,previousDifficulty-1);
}

export function unknownThemes(s){
  return TAXONOMY.filter(t=>s.scores[t.id]?.domain===null);
}

export function calibrationCandidates(s){
  return unknownThemes(s).filter(t=>eligibleQuestions(s,t.id,"mission").length);
}

export function strongestTrainingSignal(s){
  const signals=(s.freeTrainingSignals||[])
    .filter(sig=>!sig.confirmed && Date.now()-sig.at < 1000*60*60*24*21);
  if(!signals.length)return null;
  return [...signals].sort((a,b)=>(b.ratio-a.ratio) || (b.at-a.at))[0];
}

function recentMissionTypes(s,count=4){
  return [...(s?.missionHistory||[])]
    .sort((a,b)=>(b.at||0)-(a.at||0))
    .slice(0,count)
    .map(m=>m.type);
}

function confirmationCandidate(s){
  const signal=strongestTrainingSignal(s);
  const signalMcId=signal?.microcompetencyId||microcompetencyId(signal?.themeId,signal?.focus);
  if(!signal || !eligibleQuestions(s,signal.themeId,"mission",signalMcId||signal.focus).length)return null;

  const ageDays=Math.max(0,(Date.now()-(signal.at||Date.now()))/(1000*60*60*24));
  if(ageDays>21)return null;

  const recent=recentMissionTypes(s,3);
  const confirmationCount=recent.filter(x=>x==="confirmation").length;
  if(confirmationCount>=2)return null;

  const ratio=Math.max(0,Math.min(1,signal.ratio||0));
  const utility=60 + ratio*22 + Math.min(8,ageDays*.8) - confirmationCount*8;

  return {
    utility:Math.round(utility*10)/10,
    plan:{
      type:"confirmation",
      themeId:signal.themeId,
      focus:microcompetencyLabel(signalMcId)||signal.focus,
      microcompetencyId:signalMcId||null,
      reason:"O Treino Livre mostrou uma possível evolução que merece confirmação em contexto avaliativo.",
      reasons:[
        {kind:"confirmation",title:"Há um sinal positivo por confirmar",detail:`No Treino Livre acertaste ${Math.round(ratio*100)}% neste foco.`},
        {kind:"evidence",title:"Treinar não altera o Domínio diretamente",detail:"Precisamos de confirmar o progresso numa situação avaliativa independente."}
      ],
      signal
    },
    why:"training_signal"
  };
}

function calibrationCandidate(s){
  const unknown=calibrationCandidates(s);
  const measured=measuredThemes(s);
  if(!unknown.length || measured.length<4)return null;

  const recent=recentMissionTypes(s,3);
  const recentCalibration=recent.filter(x=>x==="calibration").length;
  if(recent[0]==="calibration" || recentCalibration>=2)return null;

  const seenCalibration=(s.missionHistory||[]).filter(m=>m.type==="calibration").length;
  // No início precisamos de abrir o mapa, mas sem transformar as Missões num segundo diagnóstico.
  const softCap=seenCalibration<3 ? 0 : seenCalibration<6 ? 8 : 18;

  const candidate=[...unknown]
    .filter(t=>eligibleQuestions(s,t.id,"mission").length)
    .sort((a,b)=>(b.relevance+b.blocking)-(a.relevance+a.blocking))[0];
  if(!candidate)return null;

  const focus=selectMissionFocus(s,candidate.id);
  const utility=48 + candidate.relevance*4 + candidate.blocking*3 - softCap - recentCalibration*7;

  return {
    utility:Math.round(utility*10)/10,
    plan:{
      type:"calibration",
      themeId:candidate.id,
      focus,
      reason:"Ainda não existe evidência nesta área e ela é relevante para completar o teu mapa.",
      reasons:[
        {kind:"calibration",title:"Ainda não conhecemos bem esta área",detail:"Uma pergunta informativa ajuda a completar o mapa sem prolongar o diagnóstico inicial."},
        {kind:"exam",title:"É relevante o suficiente para ser medida",detail:"O motor prefere reduzir zonas desconhecidas que podem influenciar o plano."}
      ],
      unlocks:likelyUnlocks(candidate.id)
    },
    why:"coverage_gap"
  };
}

function investigationCandidate(s){
  const hypotheses=[...(s?.learningHypotheses||[])]
    .filter(h=>h?.targetThemeId && (h.status==="hipótese" || h.status==="causa ainda ambígua" || h.status==="dificuldade de base provável"))
    .sort((a,b)=>(b.lastAt||0)-(a.lastAt||0));

  for(const h of hypotheses){
    const ageDays=Math.max(0,(Date.now()-(h.lastAt||0))/(1000*60*60*24));
    // Não reavaliar imediatamente a mesma hipótese: uma verificação independente no tempo é mais informativa.
    if(ageDays<1 || ageDays>30)continue;

    const targetMcId=h.targetMicrocompetencyId||microcompetencyId(h.targetThemeId,h.targetFocus);
    const recentSame=(s.missionHistory||[]).some(m=>
      m.themeId===h.targetThemeId &&
      (
        targetMcId
          ?(m.microcompetencyId||microcompetencyId(m.themeId,m.focus))===targetMcId
          :(m.focus||null)===(h.targetFocus||null)
      ) &&
      Date.now()-(m.at||0)<1000*60*60*24
    );
    if(recentSame)continue;
    if(!eligibleQuestions(s,h.targetThemeId,"mission",targetMcId||h.targetFocus).length)continue;

    const statusBonus=h.status==="causa ainda ambígua"?12:h.status==="dificuldade de base provável"?9:5;
    const utility=66 + statusBonus + Math.min(10,ageDays*.8);

    return {
      utility:Math.round(utility*10)/10,
      plan:{
        type:"investigation",
        themeId:h.targetThemeId,
        focus:h.targetFocus||microcompetencyLabel(targetMcId)||selectMissionFocus(s,h.targetThemeId),
        microcompetencyId:targetMcId||microcompetencyId(h.targetThemeId,h.targetFocus||selectMissionFocus(s,h.targetThemeId)),
        reason:"Existe uma hipótese pedagógica anterior que merece uma nova verificação independente.",
        reasons:[
          {kind:"investigation",title:"Estamos a confirmar a causa, não apenas o erro",detail:h.prerequisiteFocus
            ?`A app está a testar se ${h.prerequisiteFocus} continua a explicar parte da dificuldade.`
            :"A app está a tentar separar uma dificuldade específica de uma dificuldade de base."},
          {kind:"evidence",title:"A verificação foi espaçada no tempo",detail:`A última observação foi há cerca de ${Math.max(1,Math.round(ageDays))} dias.`}
        ],
        hypothesisKey:h.key,
        unlocks:likelyUnlocks(h.targetThemeId)
      },
      why:"causal_followup"
    };
  }
  return null;
}

function priorityCandidate(s){
  const t=selectMissionTheme(s);
  if(!t)return null;

  const focus=selectMissionFocus(s,t.id);
  const breakdown=nextBestActionBreakdown(t,s);
  const fs=focus?focusScore(s,t.id,focus):null;

  // Casos críticos não devem ser empurrados para trás por tarefas de calibração ou sinais de treino.
  let criticalBoost=0;
  if((fs?.domain??s.scores[t.id]?.domain??100)<35)criticalBoost+=10;
  if(breakdown.health?.contradictory)criticalBoost+=8;
  if(breakdown.review?.overdueDays>=7)criticalBoost+=6;

  return {
    utility:Math.round((breakdown.total+criticalBoost)*10)/10,
    plan:{
      type:"priority",
      themeId:t.id,
      focus,
      reason:focus
        ? `O motor escolheu ${t.short} e, dentro do tema, a competência “${focus}”.`
        : "O motor escolheu esta área como a próxima melhor ação para o teu perfil atual.",
      reasons:focusMissionReasons(t,focus,s),
      breakdown,
      unlocks:likelyUnlocks(t.id)
    },
    why:"next_best_action"
  };
}

export function missionCandidateQueue(s){
  const candidates=[
    priorityCandidate(s),
    investigationCandidate(s),
    confirmationCandidate(s),
    calibrationCandidate(s)
  ].filter(Boolean);

  return candidates
    .sort((a,b)=>b.utility-a.utility)
    .map((c,index)=>({
      ...c,
      rank:index+1,
      plan:{
        ...c.plan,
        microcompetencyId:c.plan.microcompetencyId
          ||(c.plan.themeId&&c.plan.focus?microcompetencyId(c.plan.themeId,c.plan.focus):null),
        decisionMeta:{
          selected:index===0,
          utility:c.utility,
          source:c.why
        }
      }
    }));
}

export function dailyMissionPlan(s){
  const queue=missionCandidateQueue(s);
  const selected=queue[0];
  if(!selected)return {
    type:"blocked",
    themeId:null,
    focus:null,
    reason:"Não existem questões elegíveis suficientes para criar uma Missão neste modo de conteúdo.",
    decisionMeta:{selected:true,utility:0,source:"blocked"}
  };

  return {
    ...selected.plan,
    alternatives:queue.slice(1,4).map(x=>({
      type:x.plan.type,
      themeId:x.plan.themeId,
      focus:x.plan.focus||null,
      microcompetencyId:x.plan.microcompetencyId
        ||(x.plan.themeId&&x.plan.focus?microcompetencyId(x.plan.themeId,x.plan.focus):null),
      utility:x.utility,
      source:x.why
    }))
  };
}

export function markTrainingSignalConfirmed(signals,signal){
  if(!signal)return signals||[];
  return (signals||[]).map(s=>s.at===signal.at && s.themeId===signal.themeId
    ? {...s,confirmed:true,confirmedAt:Date.now()}
    : s);
}

export function selectQuestionForPlan(s,plan,usedIds=[],usedSignatures=[]){
  let curated=eligibleQuestions(s,plan.themeId,"mission",plan.focus)
    .filter(q=>!usedIds.includes(q.id));

  const target=desiredDifficulty(s.scores[plan.themeId],s.goal);
  const evidenceCount=s.scores[plan.themeId]?.evidence?.length||0;
  const generated=(s.betaMode||"internal")==="internal"?generateVariants({
    themeId:plan.themeId,
    focus:plan.focus,
    difficulty:target,
    count:5,
    salt:`mission|${plan.type}|${s.goal}|${evidenceCount}|${usedIds.length}`
  }).filter(q=>!usedIds.includes(q.id)):[];

  let candidates=[...curated,...generated];
  if(!candidates.length){
    curated=eligibleQuestions(s,plan.themeId,"mission").filter(q=>!usedIds.includes(q.id));
    const fallbackGenerated=(s.betaMode||"internal")==="internal"?generateVariants({
      themeId:plan.themeId,
      difficulty:target,
      count:5,
      salt:`mission-fallback|${s.goal}|${evidenceCount}|${usedIds.length}`
    }):[];
    candidates=[...curated,...fallbackGenerated];
  }
  if(!candidates.length)return null;

  const usedCogs=new Set(
    usedIds.map(id=>QUESTION_BANK.find(q=>q.id===id)?.cognitive).filter(Boolean)
  );

  const selected=[...candidates].sort((a,b)=>{
    const score=q=>Math.abs(q.difficulty-target)*3
      +(usedSignatures.includes(q.signature)?5:0)
      +(usedCogs.has(q.cognitive)?1.5:0)
      +(plan.microcompetencyId
        ?((q.microcompetencyId||microcompetencyId(q.themeId,q.focus))!==plan.microcompetencyId?2:0)
        :(plan.focus && q.focus!==plan.focus?2:0))
      +(q.generated?0.25:0);
    return score(a)-score(b);
  })[0];
  return selected?{
    ...selected,
    microcompetencyId:selected.microcompetencyId||microcompetencyId(selected.themeId,selected.focus)||null
  }:null;
}


export function seenQuestionIds(s){
  const ids=[];
  Object.values(s.scores||{}).forEach(score=>{
    (score?.evidence||[]).forEach(e=>ids.push(e.itemId));
  });
  return new Set(ids);
}

function bestExamQuestionForTheme(s,themeId,seenIds,usedCognitive){
  const all=eligibleQuestions(s,themeId,"exam");
  if(!all.length)return null;
  const unseen=all.filter(q=>!seenIds.has(q.id));
  const pool=unseen.length?unseen:all;
  const target=desiredDifficulty(s.scores[themeId],s.goal);
  return [...pool].sort((a,b)=>{
    const score=q=>Math.abs(q.difficulty-target)*3
      +(usedCognitive.has(q.cognitive)?1.3:0)
      +(seenIds.has(q.id)?5:0);
    return score(a)-score(b);
  })[0];
}

export function buildMiniExam(s,count=8){
  const seen=seenQuestionIds(s);
  const usedCognitive=new Set();
  const selected=[];
  const usedThemes=new Set();

  // Nesta versão o banco de produção ainda não existe. O mini-exame procura
  // deliberadamente cobertura ampla: 10.º -> 11.º -> 12.º, em vez de se
  // transformar noutra Missão focada apenas nas fragilidades do aluno.
  const targets=[
    {year:"10.º",n:2},
    {year:"11.º",n:3},
    {year:"12.º",n:3}
  ];

  for(const group of targets){
    const candidates=byYear(group.year)
      .filter(t=>eligibleQuestions(s,t.id,"exam").length)
      .sort((a,b)=>{
        // relevância primeiro; em empate preferimos menor Certeza para o exame
        // também acrescentar informação útil ao mapa global.
        const ac=s.scores[a.id]?.conf||0, bc=s.scores[b.id]?.conf||0;
        return (b.relevance-a.relevance) || (ac-bc);
      });
    for(const t of candidates){
      if(selected.length>=count)break;
      const inYear=selected.filter(q=>theme(q.themeId)?.year===group.year).length;
      if(inYear>=group.n)break;
      if(usedThemes.has(t.id))continue;
      const q=bestExamQuestionForTheme(s,t.id,seen,usedCognitive);
      if(q){
        selected.push(q);usedThemes.add(t.id);usedCognitive.add(q.cognitive);
      }
    }
  }

  // Fallback caso o banco disponível não permita cumprir a distribuição.
  if(selected.length<count){
    const themes=TAXONOMY.filter(t=>eligibleQuestions(s,t.id,"exam").length && !usedThemes.has(t.id))
      .sort((a,b)=>b.relevance-a.relevance);
    for(const t of themes){
      if(selected.length>=count)break;
      const q=bestExamQuestionForTheme(s,t.id,seen,usedCognitive);
      if(q){selected.push(q);usedThemes.add(t.id);usedCognitive.add(q.cognitive)}
    }
  }

  return selected.slice(0,count);
}

export function miniExamScore20(questions,answers){
  if(!questions.length)return 0;
  const correct=questions.reduce((n,q,i)=>n+(answers[i]===q.a?1:0),0);
  return Math.round((correct/questions.length)*200)/10;
}

export function applyMiniExam(s,questions,answers,elapsedSeconds=0){
  const before={};
  questions.forEach(q=>{
    if(!before[q.themeId]){
      const v=s.scores[q.themeId];
      before[q.themeId]={domain:v.domain,conf:v.conf,evidenceCount:v.evidence.length};
    }
  });

  const scores={...s.scores};
  questions.forEach((q,i)=>{
    const answered=answers[i]!==null && answers[i]!==undefined;
    const correct=answered && answers[i]===q.a;
    // Em prova, uma não-resposta conta para o resultado, mas recebe peso
    // pedagógico ligeiramente menor do que uma resposta explicitamente errada.
    scores[q.themeId]=applyEvidence(scores[q.themeId],q,correct,"exam",answered?1:.65);
  });

  const correctCount=questions.reduce((n,q,i)=>n+(answers[i]===q.a?1:0),0);
  const score20=miniExamScore20(questions,answers);
  const changes=Object.keys(before).map(themeId=>({
    themeId,
    before:before[themeId],
    after:{
      domain:scores[themeId].domain,
      conf:scores[themeId].conf,
      evidenceCount:scores[themeId].evidence.length
    }
  }));

  const result={
    id:`mini-${Date.now()}`,
    type:"mini",
    at:Date.now(),
    elapsedSeconds,
    questionIds:questions.map(q=>q.id),
    answers,
    correctCount,
    total:questions.length,
    score20,
    changes
  };

  return {
    ...s,
    scores,
    xp:s.xp+correctCount*18,
    lastExam:result,
    examHistory:[...(s.examHistory||[]),result]
  };
}

export {hasGenerator} from "./generators.js";


export function dependentThemes(themeId){
  return Object.entries(PREREQUISITES)
    .filter(([,preId])=>preId===themeId)
    .map(([id])=>theme(id))
    .filter(Boolean)
    .sort((a,b)=>b.relevance-a.relevance);
}

function examUrgency(profile){
  const timing=profile?.examTiming;
  if(timing==="thisYear")return 1.22;
  if(timing==="nextYear")return 1.08;
  if(timing==="twoYears")return .94;
  return 1;
}

function recentEvidenceAgeDays(score){
  const evidence=score?.evidence||[];
  if(!evidence.length)return 999;
  const last=Math.max(...evidence.map(e=>e.at||0));
  return Math.max(0,(Date.now()-last)/(1000*60*60*24));
}


function latestMissionForTheme(s,themeId){
  return [...(s?.missionHistory||[])]
    .filter(m=>m.themeId===themeId)
    .sort((a,b)=>(b.at||0)-(a.at||0))[0]||null;
}

function daysSince(ts){
  if(!ts)return 999;
  return Math.max(0,(Date.now()-ts)/(1000*60*60*24));
}

export function reviewIntervalDays(score,profile={},goal=16){
  if(!score || score.domain===null || score.domain===undefined)return 2;
  const health=evidenceHealth(score);

  let days;
  if(health.contradictory)days=2;
  else if(score.conf<30)days=3;
  else if(score.domain<45)days=4;
  else if(score.conf<50)days=6;
  else if(score.domain<65)days=9;
  else if(score.domain<80)days=16;
  else if(score.conf<72)days=22;
  else days=35;

  // Quanto mais próximo o exame ou mais ambicioso o objetivo, mais cedo reconfirmamos.
  if(profile?.examTiming==="thisYear")days*=.72;
  else if(profile?.examTiming==="nextYear")days*=.90;
  else if(profile?.examTiming==="twoYears")days*=1.10;

  if(goal>=18)days*=.82;
  else if(goal<=12)days*=1.08;

  return Math.max(2,Math.min(45,Math.round(days)));
}

export function reviewStatusForTheme(s,themeId){
  const score=s?.scores?.[themeId];
  if(!score || score.domain===null)return {
    intervalDays:0,ageDays:999,dueInDays:0,overdueDays:0,status:"unknown"
  };

  const latestEvidence=Math.max(...(score.evidence||[]).map(e=>e.at||0),0);
  const intervalDays=reviewIntervalDays(score,s?.profile,s?.goal);
  const age=daysSince(latestEvidence);
  const dueIn=Math.round((intervalDays-age)*10)/10;

  return {
    intervalDays,
    ageDays:Math.round(age*10)/10,
    dueInDays:Math.max(0,dueIn),
    overdueDays:Math.max(0,Math.round((-dueIn)*10)/10),
    status:dueIn<=0?"due":age<1?"fresh":"waiting"
  };
}

function missionCooldownAdjustment(s,t,health){
  const last=latestMissionForTheme(s,t.id);
  if(!last)return {value:0,days:999};

  const days=daysSince(last.at);
  let penalty=0;
  if(days<.5)penalty=-18;
  else if(days<1)penalty=-12;
  else if(days<2)penalty=-7;
  else if(days<4)penalty=-3;

  // Contradições ou domínio muito baixo justificam voltar mais cedo.
  const domain=s.scores?.[t.id]?.domain??50;
  if(health?.contradictory)penalty*=.35;
  else if(domain<38)penalty*=.55;

  // Se as duas últimas Missões já foram neste tema, reforçar interleaving.
  const recent=[...(s?.missionHistory||[])].sort((a,b)=>(b.at||0)-(a.at||0)).slice(0,2);
  if(recent.length===2 && recent.every(m=>m.themeId===t.id))penalty-=5;

  return {value:Math.round(penalty*10)/10,days:Math.round(days*10)/10};
}

export function nextBestActionBreakdown(t,s){
  const v=s.scores[t.id]||{domain:null,conf:0,evidence:[]};
  const domain=v.domain??50;
  const weakness=(100-domain)*.48;
  const uncertainty=(100-(v.conf||0))*.16;
  const curricular=t.relevance*2.5*examUrgency(s.profile);
  const dependents=dependentThemes(t.id);
  const blocking=(t.blocking*1.7)+(dependents.reduce((a,x)=>a+x.relevance,0)*1.2);
  const age=recentEvidenceAgeDays(v);
  const health=evidenceHealth(v);
  const review=reviewStatusForTheme(s,t.id);
  const recency=Math.min(10,Math.max(0,(age-7)*.35));
  const dueBonus=review.status==="due"?Math.min(12,3+review.overdueDays*.55):0;
  const cooldown=missionCooldownAdjustment(s,t,health);
  const instability=(health.contradictory?6:0)+(health.stale?3:0);
  const goalPush=s.goal>=18 && domain>=55 ? 4 : s.goal>=16 && domain>=45 ? 2 : 0;

  return {
    weakness:Math.round(weakness*10)/10,
    uncertainty:Math.round(uncertainty*10)/10,
    curricular:Math.round(curricular*10)/10,
    blocking:Math.round(blocking*10)/10,
    recency:Math.round(recency*10)/10,
    dueBonus:Math.round(dueBonus*10)/10,
    cooldown:cooldown.value,
    instability,
    goalPush,
    health,
    review,
    total:Math.round((weakness+uncertainty+curricular+blocking+recency+dueBonus+cooldown.value+instability+goalPush)*10)/10,
    ageDays:Math.round(age),
    dependents
  };
}

export function humanMissionReasons(t,s){
  if(!t)return [];
  const v=s.scores[t.id]||{domain:null,conf:0,evidence:[]};
  const b=nextBestActionBreakdown(t,s);
  const rows=[];

  if(v.domain!==null && v.domain<60){
    rows.push({kind:"weakness",title:"Há margem clara para melhorar",detail:`Domínio atual: ${v.domain}/100.`});
  }else if(v.domain!==null && v.domain<78){
    rows.push({kind:"weakness",title:"É uma oportunidade eficiente de evolução",detail:`Domínio atual: ${v.domain}/100.`});
  }

  if(b.health?.contradictory){
    rows.push({kind:"certainty",title:"Os sinais recentes não são totalmente consistentes",detail:"A A+ prefere voltar a medir antes de assumir que houve melhoria ou regressão."});
  }else if((v.conf||0)<50){
    rows.push({kind:"certainty",title:"A estimativa ainda precisa de confirmação",detail:`Certeza da A+: ${certaintyLabel(v.conf,v.evidence?.length||0)}.`});
  }

  if(b.dependents.length){
    rows.push({
      kind:"blocking",
      title:"Esta base desbloqueia matéria à frente",
      detail:`Influencia ${b.dependents.slice(0,2).map(x=>x.short).join(" e ")}${b.dependents.length>2?` e mais ${b.dependents.length-2}`:""}.`
    });
  }else if(t.blocking>=4){
    rows.push({kind:"blocking",title:"É uma competência estrutural",detail:"Tem forte impacto noutras tarefas do programa."});
  }

  if(t.relevance>=5){
    rows.push({kind:"exam",title:"Tem elevada relevância curricular",detail:s.profile?.examTiming==="thisYear"?"O exame está próximo, por isso esta prioridade ganha peso.":"É uma área importante para a preparação global."});
  }

  if(b.review?.status==="due" && b.ageDays<999){
    rows.push({
      kind:"recency",
      title:"Está na altura de reconfirmar",
      detail:b.review.overdueDays>=1
        ?`Esta área já ultrapassou em cerca de ${Math.round(b.review.overdueDays)} dias o intervalo de revisão que o motor considerava útil.`
        :"O intervalo de revisão desta área chegou ao ponto em que nova evidência volta a ser informativa."
    });
  }

  if(s.goal>=18 && (v.domain??0)>=55){
    rows.push({kind:"goal",title:`O teu objetivo de ${s.goal} exige maior rigor`,detail:"O motor sobe gradualmente a exigência quando a base já está suficientemente sólida."});
  }

  return rows.slice(0,3);
}

export function rankedStudyPriorities(s,limit=4){
  return TAXONOMY
    .filter(t=>s.scores[t.id]?.domain!==null && eligibleQuestions(s,t.id,"mission").length)
    .map(t=>({theme:t,breakdown:nextBestActionBreakdown(t,s)}))
    .sort((a,b)=>b.breakdown.total-a.breakdown.total)
    .slice(0,limit);
}

export function likelyUnlocks(themeId){
  return dependentThemes(themeId).map(t=>({id:t.id,label:t.short,year:t.year}));
}


function evidenceMicrocompetencyId(e,themeId=null){
  if(e?.microcompetencyId)return e.microcompetencyId;
  const q=QUESTION_BANK.find(x=>x.id===e?.itemId);
  if(q?.microcompetencyId)return q.microcompetencyId;
  const resolvedTheme=themeId||e?.themeId||q?.themeId;
  return microcompetencyId(resolvedTheme,e?.focus||q?.focus)||null;
}

function evidenceFocus(e,themeId=null){
  const id=evidenceMicrocompetencyId(e,themeId);
  return microcompetencyLabel(id)||e?.focus||QUESTION_BANK.find(q=>q.id===e?.itemId)?.focus||null;
}

function summarizeEvidenceSubset(evidence=[]){
  return summarizeEvidence(evidence);
}

export function focusScore(s,themeId,focusRef){
  const mc=microcompetencyFor(themeId,focusRef);
  const evidence=(s?.scores?.[themeId]?.evidence||[]).filter(e=>{
    if(mc)return evidenceMicrocompetencyId(e,themeId)===mc.id;
    return evidenceFocus(e,themeId)===focusRef;
  });
  return summarizeEvidenceSubset(evidence);
}

export function focusRows(s,themeId){
  const t=theme(themeId);
  if(!t)return [];
  const rows=t.microcompetencies||t.focus.map(label=>microcompetencyFor(themeId,label)).filter(Boolean);
  return rows.map(mc=>{
    const score=focusScore(s,themeId,mc.id);
    const questions=eligibleQuestions(s,themeId,"mission",mc.id)
      .filter(q=>(q.microcompetencyId||microcompetencyId(q.themeId,q.focus))===mc.id).length;
    return {
      focus:mc.label,
      microcompetencyId:mc.id,
      ...score,
      questionCount:questions
    };
  });
}

export function selectMissionFocus(s,themeId){
  const rows=focusRows(s,themeId).filter(r=>r.questionCount>0);
  if(!rows.length)return null;
  const measured=rows.filter(r=>r.domain!==null);
  if(measured.length){
    return [...measured].sort((a,b)=>{
      const score=r=>(100-r.domain)*.68 + (100-r.conf)*.22 + (r.evidence.length<2?7:0);
      return score(b)-score(a);
    })[0].focus;
  }
  return rows[0].focus;
}

export function focusMissionReasons(t,focus,s){
  if(!focus)return humanMissionReasons(t,s);
  const fs=focusScore(s,t.id,focus);
  const rows=[];
  if(fs.domain===null){
    rows.push({kind:"focus",title:`Ainda não conhecemos bem “${focus}”`,detail:"Esta Missão vai recolher evidência específica nesta competência."});
  }else{
    if(fs.domain<60)rows.push({kind:"focus",title:`A dificuldade está concentrada em “${focus}”`,detail:`Domínio desta competência: ${fs.domain}/100.`});
    else if(fs.domain<78)rows.push({kind:"focus",title:`“${focus}” é uma boa oportunidade de evolução`,detail:`Domínio desta competência: ${fs.domain}/100.`});
    if(fs.conf<50)rows.push({kind:"certainty",title:"Precisamos de confirmar melhor esta competência",detail:`Certeza específica: ${certaintyLabel(fs.conf,fs.evidence.length)}.`});
  }
  const broad=humanMissionReasons(t,s).filter(r=>r.kind!=="weakness"&&r.kind!=="certainty");
  return [...rows,...broad].slice(0,3);
}

export function competenceMap(s,year=null){
  const themes=year?byYear(year):TAXONOMY;
  return themes.flatMap(t=>focusRows(s,t.id).map(r=>({themeId:t.id,theme:t.short,year:t.year,...r})));
}


export function causalPrerequisitesFor(themeId,focusRef){
  const targetId=microcompetencyId(themeId,focusRef);
  const exact=targetId?(MICRO_PREREQUISITES?.[targetId]||[]):[];
  if(exact.length){
    return exact.map(dep=>({
      ...dep,
      focus:microcompetencyLabel(dep.microcompetencyId)||null
    }));
  }
  const broad=PREREQUISITES[themeId];
  return broad?[{themeId:broad,focus:null,microcompetencyId:null,reason:"É um pré-requisito curricular deste tema."}]:[];
}

function causalCandidateScore(s,dep,q){
  const depRef=dep.microcompetencyId||dep.focus;
  const fs=depRef?focusScore(s,dep.themeId,depRef):s.scores?.[dep.themeId];
  const desired=fs?.domain===null||fs?.domain===undefined
    ?1
    :Math.max(1,Math.min(2,desiredDifficulty(fs,s.goal)-1));
  const qMc=q.microcompetencyId||microcompetencyId(q.themeId,q.focus);
  return Math.abs((q.difficulty||1)-desired)*3
    +(q.causalProbe?0:2)
    +(dep.microcompetencyId && qMc!==dep.microcompetencyId?7:0);
}

export function selectCausalProbe(s,targetThemeId,targetFocus,usedIds=[]){
  const deps=causalPrerequisitesFor(targetThemeId,targetFocus);
  for(const dep of deps){
    const depRef=dep.microcompetencyId||dep.focus;
    let candidates=eligibleQuestions(s,dep.themeId,"mission",depRef)
      .filter(q=>{
        if(usedIds.includes(q.id))return false;
        if(!dep.microcompetencyId)return !dep.focus || q.focus===dep.focus;
        return (q.microcompetencyId||microcompetencyId(q.themeId,q.focus))===dep.microcompetencyId;
      });
    if(!candidates.length && depRef){
      candidates=eligibleQuestions(s,dep.themeId,"mission").filter(q=>!usedIds.includes(q.id));
    }
    if(candidates.length){
      const question=[...candidates].sort((a,b)=>causalCandidateScore(s,dep,a)-causalCandidateScore(s,dep,b))[0];
      return {question,dependency:dep};
    }
  }
  return null;
}

export function causalVerdict({probeCorrect,targetThemeId,targetFocus,dependency}){
  if(!dependency)return null;
  const preLabel=dependency.focus||microcompetencyLabel(dependency.microcompetencyId)||theme(dependency.themeId)?.short||"pré-requisito";
  const targetLabel=targetFocus||theme(targetThemeId)?.short||"foco principal";
  if(probeCorrect){
    return {
      code:"target_more_likely",
      title:"A base respondeu bem",
      detail:`A verificação em ${preLabel} correu bem. A dificuldade parece, por agora, mais específica de ${targetLabel}.`,
      targetStrength:1
    };
  }
  return {
    code:"prerequisite_suspected",
    title:"Há uma base a investigar",
    detail:`A verificação em ${preLabel} também falhou. Isso torna esta base uma causa provável do erro anterior.`,
    targetStrength:.22
  };
}

export function recordLearningHypothesis(items=[],event){
  if(!event?.dependency || !event?.verdict)return items||[];

  const targetMcId=event.targetMicrocompetencyId
    ||microcompetencyId(event.targetThemeId,event.targetFocus);
  const prerequisiteMcId=event.dependency.microcompetencyId
    ||microcompetencyId(event.dependency.themeId,event.dependency.focus);

  const stableKey=[
    event.targetThemeId,targetMcId||event.targetFocus||"",
    event.dependency.themeId,prerequisiteMcId||event.dependency.focus||""
  ].join("|");
  const legacyKey=[
    event.targetThemeId,event.targetFocus||"",
    event.dependency.themeId,event.dependency.focus||""
  ].join("|");

  const list=[...(items||[])];
  const idx=list.findIndex(x=>x.key===stableKey || x.key===legacyKey);
  const prev=idx>=0?list[idx]:{
    key:stableKey,
    targetThemeId:event.targetThemeId,
    targetFocus:event.targetFocus||microcompetencyLabel(targetMcId)||null,
    targetMicrocompetencyId:targetMcId||null,
    prerequisiteThemeId:event.dependency.themeId,
    prerequisiteFocus:event.dependency.focus||microcompetencyLabel(prerequisiteMcId)||null,
    prerequisiteMicrocompetencyId:prerequisiteMcId||null,
    supportsPrerequisite:0,supportsTarget:0,observations:0,status:"hipótese"
  };

  const next={
    ...prev,
    key:stableKey,
    targetMicrocompetencyId:targetMcId||prev.targetMicrocompetencyId||null,
    prerequisiteMicrocompetencyId:prerequisiteMcId||prev.prerequisiteMicrocompetencyId||null,
    targetFocus:prev.targetFocus||event.targetFocus||microcompetencyLabel(targetMcId)||null,
    prerequisiteFocus:prev.prerequisiteFocus||event.dependency.focus||microcompetencyLabel(prerequisiteMcId)||null,
    supportsPrerequisite:prev.supportsPrerequisite+(event.verdict.code==="prerequisite_suspected"?1:0),
    supportsTarget:prev.supportsTarget+(event.verdict.code==="target_more_likely"?1:0),
    observations:prev.observations+1,
    lastAt:Date.now(),
    lastVerdict:event.verdict.code
  };
  if(next.observations>=2){
    if(next.supportsPrerequisite>=2)next.status="dificuldade de base provável";
    else if(next.supportsTarget>=2)next.status="dificuldade específica provável";
    else next.status="causa ainda ambígua";
  }
  if(idx>=0)list[idx]=next; else list.push(next);
  return list.slice(-40);
}

function migrateEvidenceIds(scores={}){
  return Object.fromEntries(Object.entries(scores||{}).map(([themeId,score])=>[
    themeId,
    {
      ...score,
      evidence:(score?.evidence||[]).map(e=>({
        ...e,
        themeId:e.themeId||themeId,
        microcompetencyId:e.microcompetencyId
          ||QUESTION_BANK.find(q=>q.id===e.itemId)?.microcompetencyId
          ||microcompetencyId(themeId,e.focus)
          ||null,
        focus:e.focus
          ||microcompetencyLabel(
            e.microcompetencyId
            ||QUESTION_BANK.find(q=>q.id===e.itemId)?.microcompetencyId
            ||microcompetencyId(themeId,e.focus)
          )
          ||null
      }))
    }
  ]));
}

function migrateHypothesisIds(items=[]){
  return (items||[]).map(h=>{
    const targetMcId=h.targetMicrocompetencyId||microcompetencyId(h.targetThemeId,h.targetFocus);
    const preMcId=h.prerequisiteMicrocompetencyId||microcompetencyId(h.prerequisiteThemeId,h.prerequisiteFocus);
    return {
      ...h,
      targetMicrocompetencyId:targetMcId||null,
      prerequisiteMicrocompetencyId:preMcId||null,
      targetFocus:microcompetencyLabel(targetMcId)||h.targetFocus||null,
      prerequisiteFocus:microcompetencyLabel(preMcId)||h.prerequisiteFocus||null,
      key:[
        h.targetThemeId,targetMcId||h.targetFocus||"",
        h.prerequisiteThemeId,preMcId||h.prerequisiteFocus||""
      ].join("|")
    };
  });
}

export function migratePedagogicalIds(state){
  if(!state)return state;
  const missionHistory=(state.missionHistory||[]).map(m=>({
    ...m,
    microcompetencyId:m.microcompetencyId||microcompetencyId(m.themeId,m.focus)||null
  }));
  const lastMission=state.lastMission
    ?{...state.lastMission,microcompetencyId:state.lastMission.microcompetencyId||microcompetencyId(state.lastMission.themeId,state.lastMission.focus)||null}
    :state.lastMission;
  const freeTrainingSignals=(state.freeTrainingSignals||[]).map(sig=>({
    ...sig,
    microcompetencyId:sig.microcompetencyId||microcompetencyId(sig.themeId,sig.focus)||null
  }));

  return {
    ...state,
    scores:migrateEvidenceIds(state.scores||{}),
    missionHistory,
    lastMission,
    freeTrainingSignals,
    learningHypotheses:migrateHypothesisIds(state.learningHypotheses||[]),
    pedagogicalIdVersion:1
  };
}

export function activeLearningHypotheses(s,limit=4){
  return [...(s?.learningHypotheses||[])]
    .sort((a,b)=>(b.lastAt||0)-(a.lastAt||0))
    .slice(0,limit);
}
