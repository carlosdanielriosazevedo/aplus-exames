import {TAXONOMY,QUESTION_BANK} from "../data/content";
import {generatorTemplates} from "./generators";

export const REVIEW_STATUS={
  prototype:"Protótipo",
  pending:"A rever por professor",
  reviewed:"Revisto por professor",
  blocked:"Bloqueado"
};

export function contentReviewStatus(item){return item.reviewStatus||"prototype"}

export function allFocusRows(){
  const rows=[];
  TAXONOMY.forEach(t=>t.focus.forEach(f=>{
    const curated=QUESTION_BANK.filter(q=>q.themeId===t.id && q.focus===f && !q.generated);
    const templates=generatorTemplates(t.id,f);
    rows.push({
      themeId:t.id,year:t.year,theme:t.short,focus:f,
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

export function applyEditorialDecision(overrides,itemId,decision,{reviewer="Professor Revisor",note=""}={}){
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
      version:prev.version||1,
      history:[
        ...(prev.history||[]),
        {at:Date.now(),decision,status,reviewer,note,version:prev.version||1}
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
