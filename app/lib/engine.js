import {TAXONOMY,PREREQUISITES,QUESTION_BANK} from "../data/content";
import {generateVariants,hasGenerator} from "./generators";
import {isEligibleForContext} from "./quality";

export const emptyScores=()=>TAXONOMY.reduce((acc,t)=>{
  acc[t.id]={domain:null,conf:0,evidence:[]};
  return acc;
},{});

export const theme=id=>TAXONOMY.find(t=>t.id===id);
export const byYear=year=>TAXONOMY.filter(t=>t.year===year);

export function getQuestions(themeId,context,focus=null){
  let q=QUESTION_BANK.filter(x=>x.themeId===themeId && x.contexts.includes(context));
  if(focus){
    const exact=q.filter(x=>x.focus===focus);
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

export function applyEvidence(score,item,correct,source="diagnostic",strength=1){
  const previous=score?.evidence || [];
  const duplicateSignature=previous.some(e=>e.signature===item.signature);
  const effectiveStrength=strength*(duplicateSignature?0.28:1);

  const newEvidence={
    itemId:item.id,
    themeId:item.themeId,
    correct,
    difficulty:item.difficulty,
    cognitive:item.cognitive,
    signature:item.signature,
    source,
    at:Date.now(),
    signal:signalFor(item,correct),
    strength:effectiveStrength
  };

  const evidence=[...previous,newEvidence];

  const weighted=evidence.map(e=>{
    const difficultyWeight=e.difficulty>=3?1.18:e.difficulty===2?1.05:0.9;
    const sourceWeight=e.source==="exam"?1.35:e.source==="mission"?1.2:1;
    return {...e,w:difficultyWeight*sourceWeight*(e.strength??1)};
  });

  const denom=weighted.reduce((a,e)=>a+e.w,0);
  const domain=Math.round(weighted.reduce((a,e)=>a+e.signal*e.w,0)/denom);

  const independentSignatures=new Set(evidence.filter(e=>(e.strength??1)>=0.5).map(e=>e.signature)).size;
  const cognitiveVariety=new Set(evidence.map(e=>e.cognitive)).size;
  const sourceVariety=new Set(evidence.map(e=>e.source)).size;
  const difficultyVariety=new Set(evidence.map(e=>e.difficulty)).size;

  const conf=Math.min(94,Math.round(
    8 +
    independentSignatures*15 +
    Math.max(0,cognitiveVariety-1)*6 +
    Math.max(0,sourceVariety-1)*7 +
    Math.max(0,difficultyVariety-1)*4
  ));

  return {domain,conf,evidence};
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
  return (100-v.domain)*0.60 + (100-v.conf)*0.18 + t.relevance*2.4 + t.blocking*2.1;
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

export function shouldEndMission({targetCount,totalCount,beforeConf,currentScore,sessionTargetItems}){
  if(totalCount>=6)return true;
  if(targetCount>=5)return true;
  if(targetCount<3)return false;
  const variety=new Set(sessionTargetItems.map(x=>x.cognitive)).size;
  const confGain=currentScore.conf-beforeConf;
  return variety>=2 && confGain>=12;
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

export function dailyMissionPlan(s){
  const signal=strongestTrainingSignal(s);
  if(signal && eligibleQuestions(s,signal.themeId,"mission").length){
    return {
      type:"confirmation",
      themeId:signal.themeId,
      focus:signal.focus,
      reason:"O Treino Livre mostrou uma possível evolução que merece confirmação em contexto avaliativo.",
      signal
    };
  }

  const unknown=calibrationCandidates(s);
  const measured=measuredThemes(s);

  // Nos primeiros dias, a A+ dedica parte das Missões a preencher grandes zonas desconhecidas.
  // Só o faz se já houver pelo menos 4 áreas medidas para não transformar o pós-diagnóstico
  // numa continuação interminável do diagnóstico.
  if(unknown.length && measured.length>=4){
    const seenCalibration=(s.missionHistory||[]).filter(m=>m.type==="calibration").length;
    if(seenCalibration < 3){
      const candidate=[...unknown].sort((a,b)=>(b.relevance+b.blocking)-(a.relevance+a.blocking))[0];
      return {
        type:"calibration",
        themeId:candidate.id,
        focus:null,
        reason:"Ainda não existe evidência nesta área e ela é relevante para completar o teu mapa."
      };
    }
  }

  const t=selectMissionTheme(s);
  if(!t)return {
    type:"blocked",
    themeId:null,
    focus:null,
    reason:"Não existem questões elegíveis suficientes para criar uma Missão neste modo de conteúdo."
  };
  return {
    type:"priority",
    themeId:t.id,
    focus:null,
    reason:"Esta é atualmente uma das melhores oportunidades de evolução considerando Domínio, Certeza da A+, relevância e pré-requisitos."
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

  return [...candidates].sort((a,b)=>{
    const score=q=>Math.abs(q.difficulty-target)*3
      +(usedSignatures.includes(q.signature)?5:0)
      +(usedCogs.has(q.cognitive)?1.5:0)
      +(plan.focus && q.focus!==plan.focus?2:0)
      +(q.generated?0.25:0);
    return score(a)-score(b);
  })[0];
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

export {hasGenerator} from "./generators";
