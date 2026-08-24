
import {QUESTION_BANK,TAXONOMY} from "../data/content.js";
import {
  applyEditorialDecision,minimumReviewRoadmap,effectiveReviewStatus,
  betaContentReadiness,contentRevisionFingerprint,editorialReviewIntegrity,
  effectiveEditorialItem
} from "./quality.js";
import {
  itemPreReviewQa,preReviewQaReport,reviewableAfterQa
} from "./preReviewQa.js";

export const REVIEW_CHECKS=[
  ["check_math","Matemática correta"],
  ["check_clarity","Enunciado claro"],
  ["check_unique","Resposta inequívoca"],
  ["check_distractors","Distratores plausíveis"],
  ["check_solution","Resolução suficiente"],
  ["check_taxonomy","Classificação curricular correta"],
  ["check_difficulty","Dificuldade adequada"],
  ["check_hypothesis","Hipótese de erro plausível"]
];

export const TEACHER_REVIEW_SCHEMA="teacher-review-v2";

function csvEscape(value){
  return `"${String(value??"").replace(/"/g,'""')}"`;
}

export function serializeSemicolonCsv(rows){
  if(!rows?.length)return "";
  const headers=Object.keys(rows[0]);
  return [
    headers.map(csvEscape).join(";"),
    ...rows.map(row=>headers.map(h=>csvEscape(row[h])).join(";"))
  ].join("\n");
}

export function parseSemicolonCsv(text){
  const rows=[];
  let row=[],cell="",quoted=false;
  const input=String(text||"").replace(/^\uFEFF/,"");

  for(let i=0;i<input.length;i++){
    const ch=input[i];
    if(quoted){
      if(ch==='"' && input[i+1]==='"'){cell+='"';i++}
      else if(ch==='"'){quoted=false}
      else cell+=ch;
    }else{
      if(ch==='"'){quoted=true}
      else if(ch===';'){row.push(cell);cell=""}
      else if(ch==='\n'){
        row.push(cell);rows.push(row);row=[];cell="";
      }else if(ch!=='\r')cell+=ch;
    }
  }
  if(cell.length||row.length){row.push(cell);rows.push(row)}
  if(!rows.length)return [];

  const headers=rows[0].map(x=>x.trim());
  return rows.slice(1)
    .filter(r=>r.some(x=>String(x).trim()!==""))
    .map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]??""])));
}

function yes(value){
  const v=String(value??"").trim().toLowerCase();
  return ["sim","s","yes","y","1","true","x","ok"].includes(v);
}

function decisionValue(value){
  const v=String(value??"").trim().toLowerCase();
  if(["aprovar","approve","approved","revisto","reviewed"].includes(v))return "approve";
  if(["alterar","changes","change","pedir alteração","pending"].includes(v))return "changes";
  if(["bloquear","block","blocked"].includes(v))return "block";
  return null;
}

function currentVersion(overrides,id){
  return Number(overrides?.[id]?.version||1);
}

function checklistFromRow(row){
  const result={};
  REVIEW_CHECKS.forEach(([column])=>{result[column]=yes(row[column])});
  return result;
}

function allChecklistTrue(checklist){
  return REVIEW_CHECKS.every(([column])=>checklist[column]===true);
}


function hashReviewText(text){
  let h=2166136261;
  for(let i=0;i<text.length;i++){
    h^=text.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return (h>>>0).toString(16).padStart(8,"0");
}

export function teacherReviewPackId(items=[]){
  const payload=(items||[]).map(x=>{
    const item=x?.item||x;
    return `${item?.id||""}:${contentRevisionFingerprint(item)}`;
  }).join("|");
  return `trp2-${hashReviewText(payload)}`;
}

function roadmapEntryMap(roadmap){
  return new Map((roadmap?.selected||[]).map(x=>[x.item.id,x]));
}

function packRowsFromItems(items,overrides,{
  reviewer="",
  packId=null,
  batchId=null,
  roadmapMap=new Map()
}={}){
  const resolvedPackId=packId||teacherReviewPackId(items);
  return items.map((item,index)=>{
    const t=TAXONOMY.find(x=>x.id===item.themeId);
    const roadmapRow=roadmapMap.get(item.id);
    return {
      schema:TEACHER_REVIEW_SCHEMA,
      pack_id:resolvedPackId,
      batch_id:batchId||`${resolvedPackId}-FULL`,
      batch_position:index+1,
      priority:roadmapRow?.step||index+1,
      id:item.id,
      version:currentVersion(overrides,item.id),
      content_fingerprint:contentRevisionFingerprint(item),
      year:t?.year||"",
      theme:t?.short||item.themeId,
      focus:item.focus||"",
      contexts:(item.contexts||[]).join(" | "),
      cognitive:item.cognitive||"",
      difficulty:item.difficulty||"",
      question:item.q||"",
      option_A:item.o?.[0]||"",
      option_B:item.o?.[1]||"",
      option_C:item.o?.[2]||"",
      option_D:item.o?.[3]||"",
      correct:["A","B","C","D"][item.a]||"",
      solution:item.sol||"",
      error_hypothesis:item.hyp||"",
      semantic_signature:item.signature||"",
      why_priority:(roadmapRow?.reasons||[]).join(" · "),
      qa_status:itemPreReviewQa(item,{overrides}).status,
      qa_flags:itemPreReviewQa(item,{overrides}).issues.map(x=>`${x.severity}:${x.code}`).join(" | "),
      reviewer,
      decision:"",
      note:"",
      check_math:"",
      check_clarity:"",
      check_unique:"",
      check_distractors:"",
      check_solution:"",
      check_taxonomy:"",
      check_difficulty:"",
      check_hypothesis:""
    };
  });
}

export function buildTeacherReviewPack(overrides={},reports=[],{
  limit=null,
  reviewer="",
  roadmapOnly=true,
  itemIds=null,
  packId=null,
  batchId=null
}={}){
  const roadmap=minimumReviewRoadmap(overrides,reports);
  const rmap=roadmapEntryMap(roadmap);

  let items;
  if(Array.isArray(itemIds)&&itemIds.length){
    const byId=new Map(QUESTION_BANK.map(q=>[q.id,effectiveEditorialItem(q,overrides)]));
    items=itemIds.map(id=>byId.get(id)).filter(Boolean);
  }else if(roadmapOnly){
    items=roadmap.selected.map(x=>x.item);
  }else{
    items=QUESTION_BANK
      .filter(q=>effectiveReviewStatus(q,overrides)!=="reviewed")
      .map(q=>effectiveEditorialItem(q,overrides));
  }

  const qa=reviewableAfterQa(items.map(x=>x.id),overrides);
  items=items.filter(x=>qa.allowed.includes(x.id));

  if(Number.isInteger(limit)&&limit>0)items=items.slice(0,limit);
  return packRowsFromItems(items,overrides,{reviewer,packId,batchId,roadmapMap:rmap});
}

export function buildTeacherReviewBatches(overrides={},reports=[],{
  batchSize=8,
  reviewer=""
}={}){
  const roadmap=minimumReviewRoadmap(overrides,reports);
  const selectedRaw=roadmap.selected.map(x=>x.item);
  const qaSelection=reviewableAfterQa(selectedRaw.map(x=>x.id),overrides);
  const selected=selectedRaw.filter(x=>qaSelection.allowed.includes(x.id));
  const packId=teacherReviewPackId(selected);
  const batches=[];
  let projected={...(overrides||{})};
  const fullChecklist=Object.fromEntries(REVIEW_CHECKS.map(([key])=>[key,true]));

  for(let offset=0;offset<selected.length;offset+=batchSize){
    const items=selected.slice(offset,offset+batchSize);
    const index=Math.floor(offset/batchSize)+1;
    const batchId=`${packId}-B${String(index).padStart(2,"0")}`;

    for(const item of items){
      projected=applyEditorialDecision(projected,item.id,"approve",{
        reviewer:"PROJEÇÃO INTERNA",
        checklist:fullChecklist,
        source:"review_projection",
        contentFingerprint:contentRevisionFingerprint(item),
        batchId,
        packId
      });
    }
    const readiness=betaContentReadiness(projected,reports);
    const rows=buildTeacherReviewPack(overrides,reports,{
      reviewer,itemIds:items.map(x=>x.id),packId,batchId
    });

    batches.push({
      id:batchId,
      packId,
      index,
      itemIds:items.map(x=>x.id),
      rows,
      count:items.length,
      estimatedMinutes:items.length*5,
      projected:{
        readinessScore:readiness.score,
        canClosedBeta:readiness.canClosedBeta,
        diagnostic:`${readiness.diagnostic.ready}/${readiness.diagnostic.total}`,
        missions:`${readiness.missions.ready}/${readiness.missions.total}`,
        examItems:readiness.exam.items,
        examThemes:readiness.exam.themes,
        examCognitive:readiness.exam.cognitive
      }
    });
  }

  return {
    schema:"teacher-review-operations-v2",
    packId,
    batchSize,
    approvalsNeeded:roadmap.approvalsNeeded,
    exportableApprovals:selected.length,
    qaBlocked:qaSelection.blocked,
    qaWarnings:qaSelection.warnings,
    preflightOk:qaSelection.blocked.length===0,
    estimatedMinutes:selected.length*5,
    estimatedHours:Math.round(selected.length*5/60*10)/10,
    batches
  };
}

export function teacherReviewQcQueue(overrides={},{
  rate=0.10,
  limit=30
}={}){
  const reviewed=QUESTION_BANK
    .filter(item=>effectiveReviewStatus(item,overrides)==="reviewed")
    .map(item=>({
      item,
      override:overrides[item.id]||{},
      integrity:editorialReviewIntegrity(item,overrides)
    }))
    .filter(x=>x.integrity.valid)
    .filter(x=>{
      const token=`${x.item.id}|${x.override.reviewedFingerprint||""}`;
      const bucket=parseInt(hashReviewText(token).slice(-4),16)%1000;
      return bucket<Math.round(rate*1000);
    })
    .filter(x=>(x.override.qualityControlCount||0)===0)
    .slice(0,limit);

  return reviewed;
}

export function teacherReviewOperationsSummary(overrides={},reports=[]){
  const ops=buildTeacherReviewBatches(overrides,reports);
  const readiness=betaContentReadiness(overrides,reports);
  const stale=QUESTION_BANK.filter(q=>editorialReviewIntegrity(q,overrides).stale);
  const qc=teacherReviewQcQueue(overrides);
  const preflight=preReviewQaReport({overrides});

  return {
    ...ops,
    currentReadiness:readiness.score,
    currentReviewed:readiness.totalReviewed,
    staleApprovals:stale.length,
    qcPending:qc.length,
    remainingBatches:ops.batches.length,
    preReviewQa:{
      total:preflight.total,
      clean:preflight.clean,
      withWarnings:preflight.withWarnings,
      blocked:preflight.blocked,
      answerPositions:preflight.answerPositions,
      byCode:preflight.byCode
    }
  };
}

export function teacherReviewInstructions(){
  return [
    "Preencher apenas reviewer, decision, note e check_*.",
    "decision aceita: APROVAR, ALTERAR ou BLOQUEAR.",
    "Para APROVAR, os oito campos check_* têm de estar SIM.",
    "ALTERAR e BLOQUEAR podem ser usados sem checklist completa.",
    "Não alterar pack_id, batch_id, id, version, content_fingerprint, pergunta, opções, resposta ou metadados.",
    "content_fingerprint identifica exatamente o conteúdo revisto: se a questão mudar, a decisão é rejeitada mesmo que alguém se esqueça de aumentar a versão.",
    "qa_status e qa_flags são preenchidos automaticamente; servem apenas para orientar a revisão e não devem ser editados.",
    "Uma decisão contraditória sobre uma questão já aprovada é tratada como conflito e nunca substitui silenciosamente a revisão anterior."
  ];
}

export function validateTeacherReviewImport(rows,overrides={}){
  const seen=new Set();
  const valid=[],invalid=[],ignored=[],conflicts=[];

  for(const [index,row] of (rows||[]).entries()){
    const rowNumber=index+2;
    if(row.schema!==TEACHER_REVIEW_SCHEMA){
      invalid.push({rowNumber,id:row.id||"",reason:"Schema incompatível. Exportar novamente o pack v5.2."});
      continue;
    }

    const item=QUESTION_BANK.find(q=>q.id===row.id);
    if(!item){
      invalid.push({rowNumber,id:row.id||"",reason:"ID de questão inexistente."});
      continue;
    }

    if(seen.has(row.id)){
      invalid.push({rowNumber,id:row.id,reason:"ID repetido no ficheiro."});
      continue;
    }
    seen.add(row.id);

    const decision=decisionValue(row.decision);
    if(!decision){
      if(!String(row.decision||"").trim()){
        ignored.push({rowNumber,id:row.id,reason:"Sem decisão."});
      }else{
        invalid.push({rowNumber,id:row.id,reason:"Decisão inválida. Usar APROVAR, ALTERAR ou BLOQUEAR."});
      }
      continue;
    }

    const fileVersion=Number(row.version);
    const liveVersion=currentVersion(overrides,row.id);
    if(!Number.isFinite(fileVersion)||fileVersion!==liveVersion){
      invalid.push({
        rowNumber,id:row.id,
        reason:`Versão desatualizada: ficheiro v${row.version||"?"}, app v${liveVersion}.`
      });
      continue;
    }

    const liveItem=effectiveEditorialItem(item,overrides);
    const liveFingerprint=contentRevisionFingerprint(liveItem);
    const fileFingerprint=String(row.content_fingerprint||"").trim();
    if(!fileFingerprint || fileFingerprint!==liveFingerprint){
      invalid.push({
        rowNumber,id:row.id,
        reason:`Conteúdo alterado desde a exportação: fingerprint ${fileFingerprint||"em falta"} ≠ ${liveFingerprint}.`
      });
      continue;
    }

    if(!String(row.pack_id||"").trim()||!String(row.batch_id||"").trim()){
      invalid.push({rowNumber,id:row.id,reason:"pack_id ou batch_id em falta."});
      continue;
    }

    const reviewer=String(row.reviewer||"").trim();
    if(!reviewer){
      invalid.push({rowNumber,id:row.id,reason:"Nome do revisor em falta."});
      continue;
    }

    const qa=itemPreReviewQa(item,{overrides});
    if(decision==="approve"&&qa.blockerCount>0){
      invalid.push({
        rowNumber,id:row.id,
        reason:`Aprovação recusada pelo pré-QA: ${qa.issues.filter(x=>x.severity==="blocker").map(x=>x.message).join(" · ")}`
      });
      continue;
    }

    const checklist=checklistFromRow(row);
    if(decision==="approve"&&!allChecklistTrue(checklist)){
      invalid.push({
        rowNumber,id:row.id,
        reason:"Aprovação recusada: os 8 critérios do checklist têm de estar SIM."
      });
      continue;
    }

    const existing=overrides?.[row.id]||null;
    const existingIntegrity=editorialReviewIntegrity(item,overrides);
    const alreadyApproved=existing?.status==="reviewed"&&existingIntegrity.valid;

    if(alreadyApproved){
      if(decision!=="approve"){
        conflicts.push({
          rowNumber,id:row.id,
          previousReviewer:existing.reviewer||"Revisor anterior",
          previousStatus:"reviewed",
          newReviewer:reviewer,
          requestedDecision:decision,
          reason:"A questão já está aprovada nesta mesma revisão de conteúdo. Reabrir explicitamente antes de substituir por ALTERAR/BLOQUEAR."
        });
        continue;
      }
      if(existing.reviewer===reviewer){
        ignored.push({rowNumber,id:row.id,reason:"A mesma versão já foi aprovada por este revisor."});
        continue;
      }
    }

    valid.push({
      rowNumber,
      id:row.id,
      decision,
      reviewer,
      note:String(row.note||"").trim(),
      checklist,
      fileVersion,
      contentFingerprint:fileFingerprint,
      packId:String(row.pack_id),
      batchId:String(row.batch_id),
      qualityControl:alreadyApproved&&decision==="approve"
    });
  }

  return {
    valid,invalid,ignored,conflicts,
    total:(rows||[]).length,
    canApply:valid.length>0 && invalid.length===0 && conflicts.length===0
  };
}

export function applyTeacherReviewImport(overrides,validation,{
  importId=`import-${Date.now()}`,
  allowPartial=false
}={}){
  if(!validation?.valid?.length)return {
    overrides,
    applied:[],
    importId,
    rejected:true,
    reason:"Nenhuma decisão válida."
  };
  if((validation.invalid?.length||validation.conflicts?.length)&&!allowPartial)return {
    overrides,
    applied:[],
    importId,
    rejected:true,
    reason:validation.conflicts?.length
      ?"Existem conflitos editoriais; importação não aplicada."
      :"Existem linhas inválidas; importação não aplicada."
  };

  let next={...(overrides||{})};
  const applied=[];
  for(const row of validation.valid){
    next=applyEditorialDecision(next,row.id,row.decision,{
      reviewer:row.reviewer,
      note:row.note,
      checklist:row.checklist,
      source:"external_csv",
      importId,
      contentFingerprint:row.contentFingerprint,
      batchId:row.batchId,
      packId:row.packId,
      qualityControl:!!row.qualityControl
    });
    applied.push({
      id:row.id,decision:row.decision,reviewer:row.reviewer,
      batchId:row.batchId,packId:row.packId,qualityControl:!!row.qualityControl
    });
  }

  return {overrides:next,applied,importId,rejected:false,reason:null};
}
