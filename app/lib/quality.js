import {
  TAXONOMY,QUESTION_BANK,DIAGNOSTIC_BLUEPRINT,
  MICROCOMPETENCIES,MICRO_PREREQUISITES,microcompetencyId
} from "../data/content.js";
import {generatorTemplates} from "./generators.js";

export const REVIEW_STATUS={
  prototype:"Protótipo",
  pending:"A rever por professor",
  reviewed:"Revisto por professor",
  blocked:"Bloqueado"
};

export function contentReviewStatus(item){return item.reviewStatus||"prototype"}

export function allFocusRows(){
  const rows=[];
  TAXONOMY.forEach(t=>(t.microcompetencies||[]).forEach(mc=>{
    const curated=QUESTION_BANK.filter(q=>q.themeId===t.id && q.microcompetencyId===mc.id && !q.generated);
    const templates=generatorTemplates(t.id,mc.label);
    rows.push({
      themeId:t.id,year:t.year,theme:t.short,
      focus:mc.label,microcompetencyId:mc.id,
      curatedCount:curated.length,
      generatorCount:templates.length,
      reviewedCount:curated.filter(q=>contentReviewStatus(q)==="reviewed").length,
      examEligibleCount:curated.filter(q=>q.contexts?.includes("exam") && contentReviewStatus(q)!=="blocked").length,
      status:(curated.length||templates.length)?"covered":"gap"
    });
  }));
  return rows;
}

export function coverageSummary(){
  const rows=allFocusRows();
  const covered=rows.filter(r=>r.status==="covered").length;
  return {
    totalFocus:rows.length,covered,gaps:rows.length-covered,
    generated:rows.filter(r=>r.generatorCount>0).length,
    curated:rows.filter(r=>r.curatedCount>0).length,
    reviewed:rows.filter(r=>r.reviewedCount>0).length,
    coveragePct:rows.length?Math.round(covered/rows.length*100):0
  };
}

export function runContentChecks(){
  const issues=[]; const ids=new Set();
  QUESTION_BANK.forEach(q=>{
    if(ids.has(q.id))issues.push({severity:"error",itemId:q.id,message:`ID duplicado: ${q.id}`});
    ids.add(q.id);
    const t=TAXONOMY.find(t=>t.id===q.themeId);
    if(!t)issues.push({severity:"error",itemId:q.id,message:"Tema inexistente na taxonomia."});
    else if(q.focus && !t.focus.includes(q.focus))issues.push({severity:"warning",itemId:q.id,message:`Foco \"${q.focus}\" não existe no tema da taxonomia.`});
    if(!q.q || !String(q.q).trim())issues.push({severity:"error",itemId:q.id,message:"Enunciado em falta."});
    if(!Array.isArray(q.o)||q.o.length!==4)issues.push({severity:"error",itemId:q.id,message:"A questão deve ter exatamente 4 opções."});
    if(Array.isArray(q.o)&&new Set(q.o).size!==q.o.length)issues.push({severity:"error",itemId:q.id,message:"Opções duplicadas."});
    if(!Number.isInteger(q.a)||q.a<0||q.a>3)issues.push({severity:"error",itemId:q.id,message:"Índice de resposta correta inválido."});
    if(!q.sol)issues.push({severity:"warning",itemId:q.id,message:"Resolução em falta."});
    if(!q.hyp)issues.push({severity:"warning",itemId:q.id,message:"Hipótese de erro em falta."});
    if(!q.signature)issues.push({severity:"warning",itemId:q.id,message:"Assinatura semântica em falta."});
    if(!q.cognitive)issues.push({severity:"warning",itemId:q.id,message:"Tipo cognitivo em falta."});
    if(!q.difficulty)issues.push({severity:"warning",itemId:q.id,message:"Dificuldade em falta."});
    if(!q.microcompetencyId)issues.push({severity:"error",itemId:q.id,message:"Microcompetência estável em falta."});
    else{
      const mc=MICROCOMPETENCIES.find(x=>x.id===q.microcompetencyId);
      if(!mc)issues.push({severity:"error",itemId:q.id,message:`Microcompetência desconhecida: ${q.microcompetencyId}`});
      else if(mc.themeId!==q.themeId)issues.push({severity:"error",itemId:q.id,message:"Microcompetência pertence a outro tema."});
    }
  });

  const mcIds=MICROCOMPETENCIES.map(x=>x.id);
  if(new Set(mcIds).size!==mcIds.length){
    issues.push({severity:"error",itemId:"TAXONOMY",message:"Existem IDs de microcompetência duplicados."});
  }
  Object.entries(MICRO_PREREQUISITES||{}).forEach(([target,deps])=>{
    if(!MICROCOMPETENCIES.some(x=>x.id===target)){
      issues.push({severity:"error",itemId:"PREREQUISITES",message:`Target de pré-requisito inexistente: ${target}`});
    }
    (deps||[]).forEach(dep=>{
      if(dep.microcompetencyId && !MICROCOMPETENCIES.some(x=>x.id===dep.microcompetencyId)){
        issues.push({severity:"error",itemId:"PREREQUISITES",message:`Pré-requisito inexistente: ${dep.microcompetencyId}`});
      }
    });
  });
  return issues;
}

export function qualitySnapshot(reports=[]){
  const checks=runContentChecks(),coverage=coverageSummary(),counts={};
  reports.forEach(r=>counts[r.itemId]=(counts[r.itemId]||0)+1);
  return {
    coverage,checks,
    errors:checks.filter(x=>x.severity==="error").length,
    warnings:checks.filter(x=>x.severity==="warning").length,
    reports:reports.length,
    hotItems:Object.entries(counts).map(([itemId,count])=>({itemId,count})).sort((a,b)=>b.count-a.count)
  };
}


export function editorialQueue(items=QUESTION_BANK,overrides={},reports=[]){
  const reportCount={};
  reports.forEach(r=>{reportCount[r.itemId]=(reportCount[r.itemId]||0)+1});

  return items.map(q=>{
    const ov=overrides[q.id]||{};
    const status=ov.status || contentReviewStatus(q);
    return {
      item:q,
      status,
      version:ov.version||1,
      reviewer:ov.reviewer||null,
      reviewedAt:ov.reviewedAt||null,
      note:ov.note||"",
      reports:reportCount[q.id]||0,
      priority:(reportCount[q.id]||0)*10
        +(status==="pending"?5:0)
        +(status==="blocked"?8:0)
        +(q.contexts?.includes("exam")?3:0)
    };
  }).sort((a,b)=>b.priority-a.priority || a.item.id.localeCompare(b.item.id));
}

export function editorialStats(queue){
  const count=status=>queue.filter(x=>x.status===status).length;
  return {
    prototype:count("prototype"),
    pending:count("pending"),
    reviewed:count("reviewed"),
    blocked:count("blocked"),
    total:queue.length
  };
}

export function makeReviewBatch(queue,{size=12,themeId=null,status="prototype"}={}){
  let rows=queue.filter(x=>x.status===status);
  if(themeId)rows=rows.filter(x=>x.item.themeId===themeId);
  return rows.slice(0,size).map(x=>x.item.id);
}

export function applyEditorialDecision(overrides,itemId,decision,{
  reviewer="Professor Revisor",
  note="",
  checklist=null,
  source="in_app",
  importId=null
}={}){
  const prev=overrides[itemId]||{version:1};
  let status=prev.status||"prototype";
  if(decision==="approve")status="reviewed";
  if(decision==="changes")status="pending";
  if(decision==="block")status="blocked";
  if(decision==="reopen")status="pending";

  return {
    ...overrides,
    [itemId]:{
      ...prev,
      status,
      reviewer,
      note,
      reviewedAt:Date.now(),
      reviewChecklist:checklist||prev.reviewChecklist||null,
      reviewSource:source,
      importId:importId||null,
      version:prev.version||1,
      history:[
        ...(prev.history||[]),
        {
          at:Date.now(),decision,status,reviewer,note,version:prev.version||1,
          checklist:checklist||null,source,importId:importId||null
        }
      ]
    }
  };
}

export function bumpEditorialVersion(overrides,itemId,note="Conteúdo alterado"){
  const prev=overrides[itemId]||{version:1};
  const nextVersion=(prev.version||1)+1;
  return {
    ...overrides,
    [itemId]:{
      ...prev,
      version:nextVersion,
      status:"pending",
      reviewedAt:null,
      note,
      history:[
        ...(prev.history||[]),
        {at:Date.now(),decision:"version_bump",status:"pending",reviewer:"Sistema",note,version:nextVersion}
      ]
    }
  };
}

export function urgentReviewItems(queue){
  return queue.filter(x=>x.reports>=3 || x.status==="blocked")
    .sort((a,b)=>b.reports-a.reports);
}


export function effectiveReviewStatus(item,overrides={}){
  return overrides[item.id]?.status || contentReviewStatus(item);
}

export function isEligibleForContext(item,context,overrides={},mode="internal"){
  const status=effectiveReviewStatus(item,overrides);
  if(status==="blocked")return false;

  // Durante desenvolvimento interno podemos testar protótipos.
  if(mode==="internal")return true;

  // Beta de experiência com amigos:
  // permite conteúdo curado ainda não revisto para testar UX, compreensão e engagement.
  // O motor continua a bloquear variantes geradas fora do modo interno e a interface
  // marca todos os resultados como provisórios.
  if(mode==="friends_beta")return true;

  // Beta fechada:
  // Diagnóstico e Exames exigem revisão; Missões e Treino podem usar pending
  // apenas se a equipa ativar explicitamente essa política mais tarde.
  if(mode==="closed_beta"){
    if(context==="diagnostic" || context==="exam")return status==="reviewed";
    if(context==="mission")return status==="reviewed";
    if(context==="training")return status==="reviewed" || status==="pending";
  }

  // Produção comercial: só conteúdo formalmente revisto.
  if(mode==="production")return status==="reviewed";

  return false;
}

export function eligibilitySummary(items=QUESTION_BANK,overrides={},mode="production"){
  const contexts=["diagnostic","mission","training","exam"];
  const result={mode};
  contexts.forEach(ctx=>{
    const pool=items.filter(q=>q.contexts?.includes(ctx));
    const eligible=pool.filter(q=>isEligibleForContext(q,ctx,overrides,mode));
    result[ctx]={total:pool.length,eligible:eligible.length,blocked:pool.length-eligible.length};
  });
  return result;
}


function uniqueSignatures(items){
  return new Set(items.map(q=>q.signature||q.id)).size;
}

function reviewedItems(overrides={}){
  return QUESTION_BANK.filter(q=>effectiveReviewStatus(q,overrides)==="reviewed");
}

export function betaContentReadiness(overrides={},reports=[]){
  const checks=runContentChecks();
  const errors=checks.filter(x=>x.severity==="error").length;
  const reviewed=reviewedItems(overrides);

  const diagRows=DIAGNOSTIC_BLUEPRINT.map(themeId=>{
    const items=QUESTION_BANK.filter(q=>q.themeId===themeId && q.contexts?.includes("diagnostic"));
    const approved=items.filter(q=>effectiveReviewStatus(q,overrides)==="reviewed");
    const roles=new Set(approved.map(q=>q.role).filter(Boolean));
    return {
      themeId,
      total:items.length,
      reviewed:approved.length,
      hasAnchor:roles.has("anchor"),
      hasProbe:roles.has("probe"),
      ready:roles.has("anchor") && roles.has("probe")
    };
  });
  const diagReady=diagRows.filter(x=>x.ready).length;

  const criticalFocusRows=[];
  TAXONOMY.filter(t=>t.relevance>=4).forEach(t=>(t.microcompetencies||[]).forEach(mc=>{
    const pool=QUESTION_BANK.filter(q=>
      q.themeId===t.id && q.microcompetencyId===mc.id && q.contexts?.includes("mission")
    );
    const approved=pool.filter(q=>effectiveReviewStatus(q,overrides)==="reviewed");
    criticalFocusRows.push({
      themeId:t.id,theme:t.short,year:t.year,focus:mc.label,microcompetencyId:mc.id,relevance:t.relevance,
      total:pool.length,reviewed:approved.length,
      independent:uniqueSignatures(approved),
      ready:uniqueSignatures(approved)>=2
    });
  }));
  const criticalReady=criticalFocusRows.filter(x=>x.ready).length;

  const examReviewed=reviewed.filter(q=>q.contexts?.includes("exam"));
  const examThemes=new Set(examReviewed.map(q=>q.themeId)).size;
  const examCognitive=new Set(examReviewed.map(q=>q.cognitive).filter(Boolean)).size;
  const examIndependent=uniqueSignatures(examReviewed);
  const examReady=examIndependent>=8 && examThemes>=6 && examCognitive>=3;

  const trainingEligible=QUESTION_BANK.filter(q=>
    q.contexts?.includes("training") &&
    ["reviewed","pending"].includes(effectiveReviewStatus(q,overrides))
  );
  const trainingThemes=new Set(trainingEligible.map(q=>q.themeId)).size;
  const trainingReady=Math.min(1,trainingThemes/7);

  const reportCounts={};
  (reports||[]).forEach(r=>reportCounts[r.itemId]=(reportCounts[r.itemId]||0)+1);
  const reviewedWithReports=reviewed.filter(q=>(reportCounts[q.id]||0)>0).length;

  const structuralScore=errors===0?10:Math.max(0,10-errors*3);
  const diagnosticScore=Math.round((diagReady/Math.max(1,diagRows.length))*25);
  const missionScore=Math.round((criticalReady/Math.max(1,criticalFocusRows.length))*30);
  const examScore=Math.round(Math.min(1,examIndependent/8)*10)
    +Math.round(Math.min(1,examThemes/6)*6)
    +Math.round(Math.min(1,examCognitive/3)*4);
  const trainingScore=Math.round(trainingReady*10);

  const score=Math.max(0,Math.min(100,
    structuralScore+diagnosticScore+missionScore+examScore+trainingScore
  ));

  const blockers=[];
  if(errors>0)blockers.push(`${errors} erro${errors===1?"":"s"} estrutural${errors===1?"":"ais"} no banco`);
  if(diagReady<diagRows.length)blockers.push(`diagnóstico revisto em ${diagReady}/${diagRows.length} temas-núcleo`);
  if(criticalReady<Math.ceil(criticalFocusRows.length*.55))blockers.push(`apenas ${criticalReady}/${criticalFocusRows.length} focos críticos têm ≥2 evidências revistas`);
  if(!examReady)blockers.push(`mini-exame: ${examIndependent}/8 itens independentes · ${examThemes}/6 temas · ${examCognitive}/3 tipos cognitivos`);

  const canClosedBeta=
    errors===0 &&
    diagReady===diagRows.length &&
    criticalReady>=Math.ceil(criticalFocusRows.length*.55) &&
    examReady;

  return {
    score,
    stage:canClosedBeta?"closed_beta_ready":score>=55?"teacher_review":"content_build",
    canClosedBeta,
    errors,
    totalReviewed:reviewed.length,
    reviewedWithReports,
    diagnostic:{ready:diagReady,total:diagRows.length,rows:diagRows,score:diagnosticScore},
    missions:{ready:criticalReady,total:criticalFocusRows.length,rows:criticalFocusRows,score:missionScore},
    exam:{ready:examReady,items:examIndependent,themes:examThemes,cognitive:examCognitive,score:examScore},
    training:{themes:trainingThemes,score:trainingScore},
    structuralScore,
    blockers
  };
}

export function prioritizedReviewQueue(overrides={},reports=[],limit=40){
  const reportCount={};
  (reports||[]).forEach(r=>reportCount[r.itemId]=(reportCount[r.itemId]||0)+1);

  const focusReviewedCount={};
  QUESTION_BANK.forEach(q=>{
    const key=q.microcompetencyId||microcompetencyId(q.themeId,q.focus)||`${q.themeId}|${q.focus||""}`;
    if(effectiveReviewStatus(q,overrides)==="reviewed"){
      focusReviewedCount[key]=(focusReviewedCount[key]||0)+1;
    }
  });

  const rows=QUESTION_BANK
    .filter(q=>!["reviewed","blocked"].includes(effectiveReviewStatus(q,overrides)))
    .map(q=>{
      const t=TAXONOMY.find(x=>x.id===q.themeId);
      const contexts=q.contexts||[];
      const focusKey=q.microcompetencyId||microcompetencyId(q.themeId,q.focus)||`${q.themeId}|${q.focus||""}`;
      const reasons=[];
      let score=0;

      if(contexts.includes("diagnostic")){
        score+=28;
        reasons.push("diagnóstico");
        if(DIAGNOSTIC_BLUEPRINT.includes(q.themeId)){score+=10;reasons.push("tema-núcleo")}
        if(q.role==="anchor"){score+=5;reasons.push("âncora")}
        if(q.role==="probe"){score+=4;reasons.push("probe")}
      }
      if(contexts.includes("exam")){score+=18;reasons.push("mini-exame")}
      if(contexts.includes("mission")){score+=13;reasons.push("missões")}
      if(contexts.includes("training"))score+=4;

      score+=(t?.relevance||0)*3;
      score+=(t?.blocking||0)*2;

      if((focusReviewedCount[focusKey]||0)===0){
        score+=10;
        reasons.push("foco sem revisão");
      }else if((focusReviewedCount[focusKey]||0)===1){
        score+=5;
        reasons.push("falta 2.ª evidência");
      }

      const reportsHere=reportCount[q.id]||0;
      if(reportsHere){
        score+=reportsHere*20;
        reasons.push(`${reportsHere} report${reportsHere===1?"":"s"}`);
      }
      if(q.causalProbe){score+=3;reasons.push("diagnóstico causal")}

      return {
        item:q,
        status:effectiveReviewStatus(q,overrides),
        score,
        reasons:[...new Set(reasons)],
        theme:t
      };
    })
    .sort((a,b)=>b.score-a.score || a.item.id.localeCompare(b.item.id));

  return rows.slice(0,limit);
}

export function reviewPackRows(overrides={},reports=[],limit=30){
  return prioritizedReviewQueue(overrides,reports,limit).map((row,index)=>({
    priority:index+1,
    id:row.item.id,
    year:row.theme?.year||"",
    theme:row.theme?.short||row.item.themeId,
    focus:row.item.focus||"",
    contexts:(row.item.contexts||[]).join(" | "),
    cognitive:row.item.cognitive||"",
    difficulty:row.item.difficulty||"",
    question:row.item.q||"",
    optionA:row.item.o?.[0]||"",
    optionB:row.item.o?.[1]||"",
    optionC:row.item.o?.[2]||"",
    optionD:row.item.o?.[3]||"",
    correct:["A","B","C","D"][row.item.a]||"",
    solution:row.item.sol||"",
    errorHypothesis:row.item.hyp||"",
    signature:row.item.signature||"",
    reviewReason:row.reasons.join(" · "),
    currentStatus:row.status
  }));
}


function reviewable(item,overrides={}){
  const status=effectiveReviewStatus(item,overrides);
  return status!=="reviewed" && status!=="blocked";
}

function missionCriticalFocusKeys(){
  const keys=[];
  TAXONOMY.filter(t=>t.relevance>=4).forEach(t=>{
    (t.microcompetencies||[]).forEach(mc=>keys.push(mc.id));
  });
  return keys;
}

function currentReviewedByFocus(overrides={}){
  const map={};
  QUESTION_BANK.forEach(q=>{
    if(effectiveReviewStatus(q,overrides)!=="reviewed")return;
    const key=q.microcompetencyId||microcompetencyId(q.themeId,q.focus);
    if(key)map[key]=(map[key]||0)+1;
  });
  return map;
}

function currentDiagnosticCoverage(overrides={}){
  const map={};
  DIAGNOSTIC_BLUEPRINT.forEach(themeId=>{map[themeId]={anchor:false,probe:false}});
  QUESTION_BANK.forEach(q=>{
    if(!map[q.themeId])return;
    if(effectiveReviewStatus(q,overrides)!=="reviewed")return;
    if(q.role==="anchor")map[q.themeId].anchor=true;
    if(q.role==="probe")map[q.themeId].probe=true;
  });
  return map;
}

function currentExamCoverage(overrides={}){
  const reviewed=QUESTION_BANK.filter(q=>
    q.contexts?.includes("exam") &&
    effectiveReviewStatus(q,overrides)==="reviewed"
  );
  return {
    ids:new Set(reviewed.map(q=>q.signature||q.id)),
    themes:new Set(reviewed.map(q=>q.themeId)),
    cognitive:new Set(reviewed.map(q=>q.cognitive).filter(Boolean))
  };
}

function reviewGain(item,state){
  const reasons=[];
  let score=0;

  const diag=state.diag[item.themeId];
  if(item.contexts?.includes("diagnostic") && diag){
    if(item.role==="anchor" && !diag.anchor){score+=90;reasons.push("fecha âncora do diagnóstico")}
    if(item.role==="probe" && !diag.probe){score+=85;reasons.push("fecha probe do diagnóstico")}
  }

  const focusKey=item.microcompetencyId||microcompetencyId(item.themeId,item.focus);
  if(state.criticalKeys.has(focusKey) && item.contexts?.includes("mission")){
    const have=state.focusCounts[focusKey]||0;
    if(have===0){score+=42;reasons.push("1.ª evidência de foco crítico")}
    else if(have===1){score+=55;reasons.push("2.ª evidência de foco crítico")}
  }

  if(item.contexts?.includes("exam")){
    const sig=item.signature||item.id;
    if(!state.exam.ids.has(sig)){score+=20;reasons.push("novo item independente para Mini-exame")}
    if(!state.exam.themes.has(item.themeId)){score+=22;reasons.push("novo tema para Mini-exame")}
    if(item.cognitive && !state.exam.cognitive.has(item.cognitive)){score+=16;reasons.push("novo tipo cognitivo para Mini-exame")}
  }

  const t=TAXONOMY.find(x=>x.id===item.themeId);
  score+=(t?.relevance||0)*2+(t?.blocking||0);
  if(item.causalProbe)score+=3;

  return {score,reasons};
}

function applyReviewToPlannerState(item,state){
  const next={
    diag:Object.fromEntries(Object.entries(state.diag).map(([k,v])=>[k,{...v}])),
    focusCounts:{...state.focusCounts},
    criticalKeys:state.criticalKeys,
    exam:{
      ids:new Set(state.exam.ids),
      themes:new Set(state.exam.themes),
      cognitive:new Set(state.exam.cognitive)
    }
  };

  if(next.diag[item.themeId]){
    if(item.role==="anchor")next.diag[item.themeId].anchor=true;
    if(item.role==="probe")next.diag[item.themeId].probe=true;
  }

  const focusKey=item.microcompetencyId||microcompetencyId(item.themeId,item.focus);
  if(next.criticalKeys.has(focusKey) && item.contexts?.includes("mission")){
    next.focusCounts[focusKey]=(next.focusCounts[focusKey]||0)+1;
  }

  if(item.contexts?.includes("exam")){
    next.exam.ids.add(item.signature||item.id);
    next.exam.themes.add(item.themeId);
    if(item.cognitive)next.exam.cognitive.add(item.cognitive);
  }
  return next;
}

function plannerGateStatus(state){
  const diagnosticReady=Object.values(state.diag).filter(x=>x.anchor&&x.probe).length;
  const criticalReady=[...state.criticalKeys].filter(k=>(state.focusCounts[k]||0)>=2).length;
  const criticalTarget=Math.ceil(state.criticalKeys.size*.55);
  const examReady=state.exam.ids.size>=8 && state.exam.themes.size>=6 && state.exam.cognitive.size>=3;

  return {
    diagnosticReady,
    diagnosticTotal:Object.keys(state.diag).length,
    criticalReady,
    criticalTarget,
    criticalTotal:state.criticalKeys.size,
    examItems:state.exam.ids.size,
    examThemes:state.exam.themes.size,
    examCognitive:state.exam.cognitive.size,
    examReady,
    ready:
      diagnosticReady===Object.keys(state.diag).length &&
      criticalReady>=criticalTarget &&
      examReady
  };
}

export function minimumReviewRoadmap(overrides={},reports=[],maxItems=120){
  let state={
    diag:currentDiagnosticCoverage(overrides),
    focusCounts:currentReviewedByFocus(overrides),
    criticalKeys:new Set(missionCriticalFocusKeys()),
    exam:currentExamCoverage(overrides)
  };

  const initial=plannerGateStatus(state);
  if(initial.ready){
    return {ready:true,selected:[],approvalsNeeded:0,status:initial,impossible:false,uncovered:[]};
  }

  const reportCount={};
  (reports||[]).forEach(r=>reportCount[r.itemId]=(reportCount[r.itemId]||0)+1);

  const pool=QUESTION_BANK.filter(q=>reviewable(q,overrides));
  const selected=[];
  const used=new Set();

  while(selected.length<maxItems){
    const status=plannerGateStatus(state);
    if(status.ready)break;

    const candidates=pool
      .filter(q=>!used.has(q.id))
      .map(q=>{
        const gain=reviewGain(q,state);
        const reportBoost=Math.min(20,(reportCount[q.id]||0)*5);
        return {item:q,score:gain.score+reportBoost,reasons:gain.reasons};
      })
      .filter(x=>x.score>0)
      .sort((a,b)=>b.score-a.score || a.item.id.localeCompare(b.item.id));

    const best=candidates[0];
    if(!best)break;

    used.add(best.item.id);
    selected.push({
      item:best.item,
      step:selected.length+1,
      score:Math.round(best.score*10)/10,
      reasons:best.reasons
    });
    state=applyReviewToPlannerState(best.item,state);
  }

  const finalStatus=plannerGateStatus(state);
  const uncovered=[];

  Object.entries(state.diag).forEach(([themeId,v])=>{
    if(!v.anchor)uncovered.push({kind:"diagnostic_anchor",themeId});
    if(!v.probe)uncovered.push({kind:"diagnostic_probe",themeId});
  });
  if(state.exam.ids.size<8)uncovered.push({kind:"exam_items",missing:8-state.exam.ids.size});
  if(state.exam.themes.size<6)uncovered.push({kind:"exam_themes",missing:6-state.exam.themes.size});
  if(state.exam.cognitive.size<3)uncovered.push({kind:"exam_cognitive",missing:3-state.exam.cognitive.size});
  if(finalStatus.criticalReady<finalStatus.criticalTarget){
    uncovered.push({kind:"critical_focus",missing:finalStatus.criticalTarget-finalStatus.criticalReady});
  }

  return {
    ready:finalStatus.ready,
    selected,
    approvalsNeeded:selected.length,
    status:finalStatus,
    impossible:!finalStatus.ready && selected.length>=pool.length,
    uncovered
  };
}

export function reviewRoadmapProgress(overrides={},reports=[]){
  const roadmap=minimumReviewRoadmap(overrides,reports);
  const current=betaContentReadiness(overrides,reports);
  const totalPath=Math.max(1,current.totalReviewed+roadmap.approvalsNeeded);
  const progress=current.canClosedBeta?100:Math.round(current.totalReviewed/totalPath*100);

  return {
    ...roadmap,
    currentReviewed:current.totalReviewed,
    pathProgress:progress,
    estimatedMinutes:roadmap.approvalsNeeded*5,
    estimatedHours:Math.round(roadmap.approvalsNeeded*5/60*10)/10
  };
}
