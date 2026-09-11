// ReviewerDashboard: painel interno de revisão editorial de conteúdo,
// extraído de app/page.js. Sem alterações de comportamento.
import {useState, useEffect, useMemo} from "react";
import {QUESTION_BANK, TAXONOMY} from "../data/content";
import {theme} from "../lib/engine";
import {Shell, Back} from "./chrome";
import {
  applyEditorialDecision, betaContentReadiness, editorialQueue, editorialStats,
  makeReviewBatch, prioritizedReviewQueue, reviewPackRows, reviewRoadmapProgress, urgentReviewItems
} from "../lib/quality";
import {
  applyTeacherReviewImport, buildTeacherReviewPack, parseSemicolonCsv, serializeSemicolonCsv,
  teacherReviewInstructions, teacherReviewOperationsSummary, validateTeacherReviewImport
} from "../lib/teacherReview";
import {
  applyContentRevision, editorialRevisionSummary, revertLastContentRevision,
  revisionCandidateFromItem, validateRevisionCandidate
} from "../lib/editorialRevisions";
import {qaForItemId} from "../lib/preReviewQa";
import {
  hybridBetaReadiness, hybridLaneForItem, hybridValidationPlan, hybridValidationSummary
} from "../lib/hybridValidation";
import {buildHybridTeacherBatches} from "../lib/hybridTeacherReview";

export function ReviewerDashboard({s,setS,go}){
  const [statusFilter,setStatusFilter]=useState("prototype");
  const [themeFilter,setThemeFilter]=useState("all");
  const [selectedId,setSelectedId]=useState(null);
  const [note,setNote]=useState("");
  const [reviewer,setReviewer]=useState("Professor Revisor");
  const [checklist,setChecklist]=useState({
    math:false,clarity:false,unique:false,distractors:false,
    solution:false,taxonomy:false,difficulty:false,hypothesis:false
  });
  const [importPreview,setImportPreview]=useState(null);
  const [importFileName,setImportFileName]=useState("");
  const [importMessage,setImportMessage]=useState("");
  const [revisionOpen,setRevisionOpen]=useState(false);
  const [revisionDraft,setRevisionDraft]=useState(null);
  const [revisionMessage,setRevisionMessage]=useState("");

  const queue=editorialQueue(QUESTION_BANK,s.editorialOverrides||{},s.contentReports||[]);
  const stats=editorialStats(queue);
  const urgent=urgentReviewItems(queue);
  const readiness=betaContentReadiness(s.editorialOverrides||{},s.contentReports||[]);
  const priorityQueue=prioritizedReviewQueue(s.editorialOverrides||{},s.contentReports||[],30);
  const roadmap=reviewRoadmapProgress(s.editorialOverrides||{},s.contentReports||[]);
  const reviewOps=useMemo(
    ()=>teacherReviewOperationsSummary(s.editorialOverrides||{},s.contentReports||[]),
    [s.editorialOverrides,s.contentReports]
  );
  const hybridPlan=useMemo(
    ()=>hybridValidationPlan(s.editorialOverrides||{},s.contentReports||[]),
    [s.editorialOverrides,s.contentReports]
  );
  const hybridSummary=useMemo(
    ()=>hybridValidationSummary(s.editorialOverrides||{},s.contentReports||[]),
    [s.editorialOverrides,s.contentReports]
  );
  const hybridReadiness=useMemo(
    ()=>hybridBetaReadiness(s.editorialOverrides||{},s.contentReports||[]),
    [s.editorialOverrides,s.contentReports]
  );
  const hybridOps=useMemo(
    ()=>buildHybridTeacherBatches(s.editorialOverrides||{},s.contentReports||[],{reviewer}),
    [s.editorialOverrides,s.contentReports,reviewer]
  );
  const allChecks=Object.values(checklist).every(Boolean);

  const filtered=queue.filter(row=>{
    const okStatus=statusFilter==="all" || row.status===statusFilter;
    const okTheme=themeFilter==="all" || row.item.themeId===themeFilter;
    return okStatus && okTheme;
  });

  const selected=queue.find(x=>x.item.id===selectedId) || filtered[0] || null;
  const selectedQa=selected?qaForItemId(selected.item.id,s.editorialOverrides||{}):null;
  const selectedHybrid=selected?hybridLaneForItem(selected.item,s.editorialOverrides||{}):null;
  const revisionStats=editorialRevisionSummary(s.editorialOverrides||{});
  const revisionValidation=useMemo(
    ()=>selected&&revisionDraft?validateRevisionCandidate(selected.item,revisionDraft):null,
    [selected?.item?.id,selected?.currentFingerprint,revisionDraft]
  );

  useEffect(()=>{
    setRevisionOpen(false);
    setRevisionDraft(null);
    setRevisionMessage("");
  },[selected?.item?.id]);

  function openRevisionEditor(){
    if(!selected)return;
    setRevisionDraft(revisionCandidateFromItem(selected.item));
    setRevisionOpen(true);
    setRevisionMessage("");
  }

  function applyRevision(){
    if(!selected||!revisionDraft)return;
    const result=applyContentRevision(
      s.editorialOverrides||{},
      selected.item.id,
      revisionDraft,
      {
        editor:"Equipa editorial",
        note:note.trim()||"Alteração pedida na revisão pedagógica",
        requestedBy:(s.editorialOverrides||{})[selected.item.id]?.reviewer||reviewer||null
      }
    );
    if(!result.ok){
      setRevisionMessage((result.errors||[]).join(" · ")||"Não foi possível aplicar a alteração.");
      return;
    }
    setS(prev=>({...prev,editorialOverrides:result.overrides}));
    setRevisionDraft(revisionCandidateFromItem(result.item));
    setRevisionOpen(false);
    setRevisionMessage(`Nova versão v${result.revision.toVersion} criada. A aprovação anterior deixou de valer e a questão voltou a “A rever”.`);
    setChecklist({math:false,clarity:false,unique:false,distractors:false,solution:false,taxonomy:false,difficulty:false,hypothesis:false});
  }

  function revertRevision(){
    if(!selected)return;
    const result=revertLastContentRevision(
      s.editorialOverrides||{},
      selected.item.id,
      {editor:"Equipa editorial",note:"Reversão manual da última alteração"}
    );
    if(!result.ok){
      setRevisionMessage(result.reason||"Não foi possível reverter.");
      return;
    }
    setS(prev=>({...prev,editorialOverrides:result.overrides}));
    setRevisionOpen(false);
    setRevisionDraft(null);
    setRevisionMessage(`Reversão aplicada como nova versão v${result.revision.toVersion}. Continua a exigir nova revisão pedagógica.`);
  }

  function decide(decision){
    if(!selected)return;
    if(decision==="approve"&&(selectedQa?.blockerCount||0)>0){
      setRevisionMessage("Esta questão tem bloqueios automáticos de pré-QA. Corrige-os antes de aprovar.");
      return;
    }
    const next=applyEditorialDecision(
      s.editorialOverrides||{},
      selected.item.id,
      decision,
      {
        reviewer,
        note,
        checklist:decision==="approve"?checklist:null,
        source:"in_app"
      }
    );
    setS(prev=>({...prev,editorialOverrides:next}));
    setNote("");
    setChecklist({math:false,clarity:false,unique:false,distractors:false,solution:false,taxonomy:false,difficulty:false,hypothesis:false});
    const idx=filtered.findIndex(x=>x.item.id===selected.item.id);
    const nextRow=filtered[idx+1]||filtered[idx-1];
    if(decision==="changes"){
      setSelectedId(selected.item.id);
      setRevisionDraft(revisionCandidateFromItem(selected.item));
      setRevisionOpen(true);
      setRevisionMessage("Pedido de alteração registado. Podes agora preparar a nova versão lado a lado.");
    }else{
      setSelectedId(nextRow?.item.id||null);
    }
  }

  function bump(){
    openRevisionEditor();
  }

  function createBatch(){
    const ids=makeReviewBatch(queue,{
      size:12,
      themeId:themeFilter==="all"?null:themeFilter,
      status:statusFilter==="all"?"prototype":statusFilter
    });
    if(!ids.length)return;
    const batch={
      id:`batch-${Date.now()}`,
      createdAt:Date.now(),
      reviewer,
      itemIds:ids,
      status:"open"
    };
    setS(prev=>({...prev,reviewBatches:[...(prev.reviewBatches||[]),batch]}));
    setSelectedId(ids[0]);
  }

  function createPriorityBatch(){
    const ids=priorityQueue.slice(0,12).map(x=>x.item.id);
    if(!ids.length)return;
    const batch={
      id:`priority-batch-${Date.now()}`,
      createdAt:Date.now(),
      reviewer,
      itemIds:ids,
      status:"open",
      kind:"beta_priority"
    };
    setS(prev=>({...prev,reviewBatches:[...(prev.reviewBatches||[]),batch]}));
    setStatusFilter("all");
    setThemeFilter("all");
    setSelectedId(ids[0]);
  }

  function csvEscape(value){
    const s=String(value??"");
    return `"${s.replace(/"/g,'""')}"`;
  }

  function downloadCsv(csv,fileName){
    const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportPriorityPack(){
    const rows=reviewPackRows(s.editorialOverrides||{},s.contentReports||[],30);
    if(!rows.length)return;
    const headers=Object.keys(rows[0]);
    const csv=[
      headers.map(csvEscape).join(";"),
      ...rows.map(r=>headers.map(h=>csvEscape(r[h])).join(";"))
    ].join("\n");
    downloadCsv(csv,`revisao-professor-prioridades-${Date.now()}.csv`);
  }

  function exportExternalReviewPack(){
    const rows=buildTeacherReviewPack(
      s.editorialOverrides||{},
      s.contentReports||[],
      {roadmapOnly:true,reviewer}
    );
    if(!rows.length)return;
    downloadCsv(
      serializeSemicolonCsv(rows),
      `revisao-professor-caminho-beta-${rows.length}-questoes.csv`
    );
  }

  function exportOperationalBatch(batch){
    if(!batch?.rows?.length)return;
    const n=String(batch.index).padStart(2,"0");
    downloadCsv(
      serializeSemicolonCsv(batch.rows.map(row=>({...row,reviewer:reviewer||row.reviewer}))),
      `revisao-professor-lote-${n}-${batch.count}-questoes.csv`
    );
  }

  function exportHybridBatch(batch){
    if(!batch?.rows?.length)return;
    const n=String(batch.index).padStart(2,"0");
    downloadCsv(
      serializeSemicolonCsv(batch.rows.map(row=>({...row,reviewer:reviewer||row.reviewer}))),
      `revisao-professor-hibrido-lote-${n}-${batch.count}-questoes.csv`
    );
  }

  function exportHybridFullPack(){
    const rows=hybridOps.batches.flatMap(batch=>batch.rows);
    if(!rows.length)return;
    downloadCsv(
      serializeSemicolonCsv(rows.map(row=>({...row,reviewer:reviewer||row.reviewer}))),
      `revisao-professor-hibrida-${rows.length}-questoes.csv`
    );
  }

  async function previewImport(file){
    setImportMessage("");
    setImportPreview(null);
    setImportFileName(file?.name||"");
    if(!file)return;
    try{
      const text=await file.text();
      const rows=parseSemicolonCsv(text);
      const validation=validateTeacherReviewImport(rows,s.editorialOverrides||{});
      setImportPreview({rows,validation});
    }catch{
      setImportMessage("Não foi possível ler este ficheiro de revisão.");
    }
  }

  function applyImportedReviews(){
    if(!importPreview?.validation)return;
    const importId=`teacher-import-${Date.now()}`;
    const result=applyTeacherReviewImport(
      s.editorialOverrides||{},
      importPreview.validation,
      {importId,allowPartial:false}
    );
    if(result.rejected){
      setImportMessage(result.reason||"Importação recusada.");
      return;
    }

    const record={
      id:importId,
      at:Date.now(),
      fileName:importFileName,
      applied:result.applied.length,
      reviewerNames:[...new Set(result.applied.map(x=>x.reviewer))],
      itemIds:result.applied.map(x=>x.id),
      batchIds:[...new Set(result.applied.map(x=>x.batchId).filter(Boolean))],
      packIds:[...new Set(result.applied.map(x=>x.packId).filter(Boolean))],
      qualityControl:result.applied.filter(x=>x.qualityControl).length
    };

    setS(prev=>({
      ...prev,
      editorialOverrides:result.overrides,
      reviewImports:[...(prev.reviewImports||[]),record]
    }));
    setImportMessage(`${result.applied.length} decisões importadas com sucesso.`);
    setImportPreview(null);
    setImportFileName("");
  }

  function openItem(itemId){
    setStatusFilter("all");
    setThemeFilter("all");
    setSelectedId(itemId);
    setNote("");
    setChecklist({math:false,clarity:false,unique:false,distractors:false,solution:false,taxonomy:false,difficulty:false,hypothesis:false});
  }

  const statusLabel={
    prototype:"Protótipo",
    pending:"A rever",
    reviewed:"Revisto",
    blocked:"Bloqueado"
  };

  return <Shell><Back go={go}/><p className="eyebrow">PAINEL INTERNO · REVISÃO PEDAGÓGICA</p>
    <h1>Workflow editorial de Matemática A.</h1>
    <p className="muted">Protótipo do espaço de trabalho de um professor revisor. Nada deste painel é visível para alunos.</p>

    <section className="betaReadinessCard">
      <div className="betaReadinessTop"><div><small>PRONTIDÃO DO CONTEÚDO PARA BETA FECHADA</small><h2>{readiness.score}%</h2></div><span className={readiness.canClosedBeta?"ready":"notReady"}>{readiness.canClosedBeta?"Pronto para beta":"Ainda não pronto"}</span></div>
      <div className="readinessBar"><i style={{width:readiness.score+"%"}}/></div>
      <div className="readinessMetrics">
        <div><span>Diagnóstico</span><b>{readiness.diagnostic.ready}/{readiness.diagnostic.total}</b><small>temas com âncora + probe revistos</small></div>
        <div><span>Missões</span><b>{readiness.missions.ready}/{readiness.missions.total}</b><small>focos críticos com ≥2 evidências revistas</small></div>
        <div><span>Mini-exame</span><b>{readiness.exam.items}/8</b><small>{readiness.exam.themes}/6 temas · {readiness.exam.cognitive}/3 tipos</small></div>
        <div><span>Total revisto</span><b>{readiness.totalReviewed}</b><small>questões aprovadas</small></div>
      </div>
      {readiness.blockers.length>0&&<div className="readinessBlockers"><b>O que bloqueia a beta neste momento</b>{readiness.blockers.map((x,i)=><span key={i}>• {x}</span>)}</div>}
      <div className="readinessActions"><button onClick={createPriorityBatch}>Criar lote prioritário de 12</button><button className="secondary" onClick={exportPriorityPack}>Exportar 30 prioridades</button></div>

      <div className="teacherBridge">
        <div className="teacherBridgeHead"><div><small>PONTE COM PROFESSOR EXTERNO</small><h3>Rever fora da app e importar depois</h3></div><span>{roadmap.approvalsNeeded} no caminho atual</span></div>
        <p>Exporta o roteiro mínimo já com enunciados, opções, solução e checklist. O professor preenche apenas as colunas de revisão e devolve o mesmo CSV.</p>
        <div className="teacherBridgeInstructions">{teacherReviewInstructions().map((x,i)=><span key={i}>{i+1}. {x}</span>)}</div>
        <div className="teacherBridgeActions">
          <button onClick={exportHybridFullPack}>Exportar roteiro híbrido recomendado ({hybridOps.remaining})</button>
          <button className="secondary" onClick={exportExternalReviewPack}>Exportar roteiro conservador ({roadmap.approvalsNeeded})</button>
          <label className="importFileButton">Importar CSV devolvido<input type="file" accept=".csv,text/csv" onChange={e=>previewImport(e.target.files?.[0]||null)}/></label>
        </div>

        {importPreview&&<div className="importPreview">
          <div className="importPreviewStats">
            <div><span>Decisões válidas</span><b>{importPreview.validation.valid.length}</b></div>
            <div><span>Linhas inválidas</span><b>{importPreview.validation.invalid.length}</b></div>
            <div><span>Conflitos</span><b>{importPreview.validation.conflicts?.length||0}</b></div>
            <div><span>Sem decisão</span><b>{importPreview.validation.ignored.length}</b></div>
          </div>
          {importPreview.validation.invalid.length>0&&<div className="importErrors"><b>Corrigir antes de importar</b>{importPreview.validation.invalid.slice(0,8).map((x,i)=><span key={i}>Linha {x.rowNumber} · {x.id||"sem ID"} — {x.reason}</span>)}</div>}
          {(importPreview.validation.conflicts?.length||0)>0&&<div className="importErrors conflict"><b>Conflitos que exigem decisão explícita</b>{importPreview.validation.conflicts.slice(0,8).map((x,i)=><span key={i}>Linha {x.rowNumber} · {x.id} — {x.reason}</span>)}</div>}
          <button disabled={!importPreview.validation.canApply} onClick={applyImportedReviews}>Aplicar decisões válidas</button>
          {!importPreview.validation.canApply&&<small>A importação é atómica: enquanto existir uma linha inválida, nenhuma decisão é aplicada.</small>}
        </div>}
        {importMessage&&<div className="importMessage">{importMessage}</div>}
      </div>
    </section>

    <section className="hybridValidationPanel">
      <div className="hybridValidationHead">
        <div><small>POLÍTICA HÍBRIDA · v5.5</small><h2>Professor onde acrescenta julgamento. Máquina onde consegue provar.</h2></div>
        <span>{hybridSummary.hybridTeacherTarget} vs {hybridSummary.conservativeTeacherApprovals}</span>
      </div>
      <p>O modelo conservador pedia revisão humana de todas as {hybridSummary.conservativeTeacherApprovals} questões do caminho mínimo. O novo modelo mantém revisão humana obrigatória no Diagnóstico, em questões com avisos e em itens de maior julgamento pedagógico; exercícios objetivos e atestados entram num lane de máquina, com uma amostra humana de controlo de 20%.</p>
      <div className="hybridValidationMetrics">
        <div><span>Humano obrigatório</span><b>{hybridSummary.mandatoryHuman}</b><small>impacto/complexidade pedagógica</small></div>
        <div><span>Amostra humana</span><b>{hybridSummary.teacherSample}</b><small>20% do lane de máquina</small></div>
        <div><span>Lane de máquina</span><b>{hybridSummary.machineCount}</b><small>oracle + fingerprint + pré-QA</small></div>
        <div><span>Revisões poupadas</span><b>{hybridSummary.savedHumanReviews}</b><small>−{hybridSummary.savedPct}% de trabalho humano</small></div>
      </div>
      <div className="hybridGateLine">
        <b>Gate híbrido para beta fechada</b>
        <span>{hybridReadiness.score}% estrutural</span>
        <em className={hybridReadiness.canClosedBeta?"go":"wait"}>{hybridReadiness.canClosedBeta?"GO":"A aguardar revisão humana"}</em>
      </div>
      {hybridReadiness.reasons.length>0&&<div className="hybridReasons">{hybridReadiness.reasons.slice(0,5).map((x,i)=><span key={i}>• {x}</span>)}</div>}
      <div className="hybridPolicyNotes">
        <span><b>Diagnóstico:</b> continua 100% humano.</span>
        <span><b>Machine lane:</b> só é válido se o fingerprint atual coincidir com a atestação e o oracle determinístico passar.</span>
        <span><b>Produção comercial:</b> ainda não aceita machine-only; o segundo validador externo/IA continua por configurar.</span>
        <span><b>Dados reais:</b> dificuldade empírica será recalibrada com respostas dos alunos, não “certificada” por uma IA.</span>
      </div>
      <div className="reviewBatchCards hybrid">{hybridOps.batches.map(batch=><div key={batch.id}>
        <div><small>LOTE HÍBRIDO {String(batch.index).padStart(2,"0")}</small><b>{batch.count} questões · ~{batch.estimatedMinutes} min</b></div>
        <span>{batch.mandatoryCount} obrigatórias · {batch.sampleCount} de amostragem</span>
        <button onClick={()=>exportHybridBatch(batch)}>Exportar este lote</button>
      </div>)}</div>
      <small className="reviewOpsFoot">O modelo antigo de 64 revisões continua disponível como opção conservadora. A política híbrida não inventa aprovação: cria tipos diferentes de evidência e mantém rastreabilidade por fingerprint.</small>
    </section>

    <section className="reviewOperations">
      <div className="reviewOpsHead">
        <div><small>ROTEIRO CONSERVADOR · v5.4</small><h3>{reviewOps.approvalsNeeded} aprovações em {reviewOps.batches.length} lote{reviewOps.batches.length===1?"":"s"}</h3></div>
        <b>{reviewOps.estimatedHours} h estimadas</b>
      </div>
      <p>Em vez de enviar dezenas de questões soltas, o caminho mínimo é dividido em lotes de 8. Cada ficheiro fica preso a um <b>fingerprint do conteúdo</b>: se uma pergunta mudar depois da exportação, a aprovação antiga deixa de valer automaticamente.</p>
      <div className="reviewOpsMetrics">
        <div><span>Aprovações desatualizadas</span><b>{reviewOps.staleApprovals}</b><small>mudaram depois da revisão</small></div>
        <div><span>QC por confirmar</span><b>{reviewOps.qcPending}</b><small>amostra ~10% após aprovações</small></div>
        <div><span>Pack</span><b>{reviewOps.packId.slice(-8)}</b><small>identifica este roteiro</small></div>
        <div><span>Revisões editoriais</span><b>{revisionStats.revisions}</b><small>{revisionStats.itemsChanged} questões alteradas</small></div>
        <div><span>Pré-QA bloqueadas</span><b>{reviewOps.preReviewQa.blocked}</b><small>não chegam ao professor</small></div>
        <div><span>Pré-QA com avisos</span><b>{reviewOps.preReviewQa.withWarnings}</b><small>professor vê as flags</small></div>
      </div>
      <div className="answerBalance"><b>Distribuição da resposta correta</b><span>A {reviewOps.preReviewQa.answerPositions.counts[0]} · B {reviewOps.preReviewQa.answerPositions.counts[1]} · C {reviewOps.preReviewQa.answerPositions.counts[2]} · D {reviewOps.preReviewQa.answerPositions.counts[3]}</span><em>{reviewOps.preReviewQa.answerPositions.balanced?"✓ equilibrada":"⚠ rever distribuição"}</em></div>
      {!reviewOps.preflightOk&&<div className="preQaBlocker"><b>⛔ Existem questões bloqueadas antes da revisão</b><span>Os lotes exportáveis excluem automaticamente esses itens. Corrige o pré-QA e recalcula o roteiro antes de avançar.</span></div>}
      <div className="reviewBatchCards">{reviewOps.batches.map(batch=><div key={batch.id} className={batch.projected.canClosedBeta?"final":""}>
        <div><small>LOTE {String(batch.index).padStart(2,"0")}</small><b>{batch.count} questões · ~{batch.estimatedMinutes} min</b></div>
        <span>Após aprovação: readiness projetado <b>{batch.projected.readinessScore}%</b></span>
        <small>Diagnóstico {batch.projected.diagnostic} · focos {batch.projected.missions} · exame {batch.projected.examItems} itens / {batch.projected.examThemes} temas</small>
        <button onClick={()=>exportOperationalBatch(batch)}>Exportar este lote</button>
      </div>)}</div>
      <small className="reviewOpsFoot">A projeção assume APROVAÇÃO dos itens do lote; ALTERAR/BLOQUEAR recalcula automaticamente o roteiro seguinte. QC é controlo de qualidade adicional e não cria falsa dupla aprovação.</small>
    </section>

    <section className="reviewRoadmap">
      <div className="reviewRoadmapHead"><div><small>CAMINHO MÍNIMO PARA “GO”</small><h3>{roadmap.ready?"Critérios mínimos já cumpridos":`${roadmap.approvalsNeeded} aprovações estimadas em falta`}</h3></div><b>{roadmap.ready?"✓":roadmap.estimatedHours+" h"}</b></div>
      {!roadmap.ready&&<><p>O motor calculou uma sequência de revisão que tenta satisfazer os critérios da beta com o menor número de aprovações possível. A estimativa usa cerca de 5 min por questão.</p>
        <div className="roadmapSteps">{roadmap.selected.slice(0,10).map(row=><button key={row.item.id} onClick={()=>openItem(row.item.id)}>
          <span>{row.step}</span><div><b>{row.item.id} · {theme(row.item.themeId)?.short}</b><small>{row.item.focus||"Geral"} · {row.reasons.slice(0,2).join(" · ")}</small></div>
        </button>)}</div>
        {roadmap.selected.length>10&&<small className="moreRows">+ {roadmap.selected.length-10} aprovações seguintes no roteiro</small>}
      </>}
      <div className="roadmapGateGrid">
        <div><span>Diagnóstico</span><b>{roadmap.status.diagnosticReady}/{roadmap.status.diagnosticTotal}</b></div>
        <div><span>Focos críticos</span><b>{roadmap.status.criticalReady}/{roadmap.status.criticalTarget}</b></div>
        <div><span>Exame · itens</span><b>{roadmap.status.examItems}/8</b></div>
        <div><span>Exame · temas</span><b>{roadmap.status.examThemes}/6</b></div>
      </div>
    </section>

    <div className="reviewStats">
      <div><span>Protótipo</span><b>{stats.prototype}</b></div>
      <div><span>A rever</span><b>{stats.pending}</b></div>
      <div><span>Revisto</span><b>{stats.reviewed}</b></div>
      <div><span>Bloqueado</span><b>{stats.blocked}</b></div>
    </div>

    {urgent.length>0&&<div className="urgentReview">
      <div><b>⚠ Revisão prioritária</b><span>{urgent.length} itens bloqueados ou com vários reports</span></div>
      <div className="urgentChips">{urgent.slice(0,6).map(x=><button key={x.item.id} onClick={()=>setSelectedId(x.item.id)}>{x.item.id} · {x.reports} reports</button>)}</div>
    </div>}

    {priorityQueue.length>0&&<section className="priorityReviewList"><div><b>Próximas revisões com maior impacto na beta</b><span>Ordenadas pelo que desbloqueia diagnóstico, Missões e Mini-exames.</span></div>
      <div>{priorityQueue.slice(0,8).map((row,i)=><button key={row.item.id} onClick={()=>openItem(row.item.id)}>
        <b>{i+1}. {row.item.id}</b><span>{row.theme?.short} · {row.item.focus||"Geral"}</span><small>{row.reasons.slice(0,3).join(" · ")}</small>
      </button>)}</div>
    </section>}

    <div className="reviewToolbar">
      <label>Estado<select value={statusFilter} onChange={e=>{setStatusFilter(e.target.value);setSelectedId(null)}}>
        <option value="prototype">Protótipo</option><option value="pending">A rever</option><option value="reviewed">Revisto</option><option value="blocked">Bloqueado</option><option value="all">Todos</option>
      </select></label>
      <label>Tema<select value={themeFilter} onChange={e=>{setThemeFilter(e.target.value);setSelectedId(null)}}>
        <option value="all">Todos</option>{TAXONOMY.map(t=><option key={t.id} value={t.id}>{t.year} · {t.short}</option>)}
      </select></label>
      <label>Revisor<input value={reviewer} onChange={e=>setReviewer(e.target.value)}/></label>
      <button onClick={createBatch}>Criar lote de 12</button>
    </div>

    <div className="reviewWorkspace">
      <aside className="reviewQueue">
        <div className="queueTitle"><b>Fila</b><span>{filtered.length} itens</span></div>
        {filtered.slice(0,80).map(row=><button key={row.item.id} className={selected?.item.id===row.item.id?"active":""} onClick={()=>{setSelectedId(row.item.id);setNote("");setChecklist({math:false,clarity:false,unique:false,distractors:false,solution:false,taxonomy:false,difficulty:false,hypothesis:false})}}>
          <div><b>{row.item.id}</b><small>{theme(row.item.themeId)?.short}</small></div>
          <span className={`state ${row.status}`}>{statusLabel[row.status]||row.status}</span>
          {row.reports>0&&<em>⚠ {row.reports}</em>}
        </button>)}
      </aside>

      <section className="reviewCard">
        {!selected?<div className="qaEmpty">Não existem itens neste filtro.</div>:<>
          <div className="reviewTop">
            <div><small>{theme(selected.item.themeId)?.year} · {theme(selected.item.themeId)?.short}</small><h2>{selected.item.focus||"Sem foco"}</h2></div>
            <div className="reviewMeta"><span>Versão {selected.version}</span><b className={`state ${selected.status}`}>{statusLabel[selected.status]}</b></div>
          </div>
          {selected.reviewStale&&<div className="staleReviewAlert"><b>⚠ Aprovação invalidada automaticamente</b><span>{selected.integrityReason}</span><small>Fingerprint atual: {selected.currentFingerprint}</small></div>}

          <div className="reviewQuestion">
            <small>{selected.item.cognitive} · D{selected.item.difficulty} · {selected.item.generated?"Gerada":"Curada"}</small>
            <h3>{selected.item.q}</h3>
            <div className="reviewOptions">{selected.item.o.map((o,i)=><div key={i} className={i===selected.item.a?"correct":""}>
              <b>{String.fromCharCode(65+i)}</b><span>{o}</span>{i===selected.item.a&&<em>✓ correta</em>}
            </div>)}</div>
          </div>

          <div className="reviewDetails">
            <div><b>Resolução</b><span>{selected.item.sol}</span></div>
            <div><b>Hipótese de erro</b><span>{selected.item.hyp}</span></div>
            <div><b>Assinatura semântica</b><span>{selected.item.signature}</span></div>
            <div><b>Fingerprint editorial</b><span>{selected.currentFingerprint}</span></div>
            {selected.item.generated&&<div><b>Template</b><span>{selected.item.templateId} · seed {selected.item.variantSeed}</span></div>}
          </div>

          {selectedHybrid&&<div className={"hybridItemLane "+selectedHybrid.lane}>
            <b>{selectedHybrid.lane==="machine_plus_sample"?"⚙ Lane máquina + amostragem":selectedHybrid.lane==="blocked"?"⛔ Bloqueado":"👤 Revisão humana"}</b>
            <span>{selectedHybrid.reason}</span>
            {selectedHybrid.passport?.attestation&&<small>Oracle: {selectedHybrid.passport.localOracle.status} · fingerprint {selectedHybrid.passport.attestationMatch?"válido":"desatualizado"} · segundo validador: {selectedHybrid.passport.externalSecondValidator}</small>}
          </div>}

          {selectedQa&&<div className={"preQaItem "+selectedQa.status}>
            <div><b>{selectedQa.status==="clean"?"✓ Pré-QA limpo":selectedQa.status==="warning"?"⚠ Pré-QA com avisos":"⛔ Pré-QA bloqueado"}</b><span>{selectedQa.blockerCount} bloqueio{selectedQa.blockerCount===1?"":"s"} · {selectedQa.warningCount} aviso{selectedQa.warningCount===1?"":"s"}</span></div>
            {selectedQa.issues.map((issue,i)=><p key={`${issue.code}-${i}`} className={issue.severity}><strong>{issue.code}</strong><span>{issue.message}</span></p>)}
            {selectedQa.status==="clean"&&<small>Os controlos mecânicos passaram. Isto não substitui a avaliação matemática e pedagógica do professor.</small>}
          </div>}

          <div className="reviewChecklist">
            {[
              ["math","Matemática correta"],
              ["clarity","Enunciado claro"],
              ["unique","Resposta inequívoca"],
              ["distractors","Distratores plausíveis"],
              ["solution","Resolução suficiente"],
              ["taxonomy","Classificação curricular correta"],
              ["difficulty","Dificuldade adequada"],
              ["hypothesis","Hipótese de erro plausível"]
            ].map(([k,l])=><label key={k}><input type="checkbox" checked={checklist[k]} onChange={e=>setChecklist(prev=>({...prev,[k]:e.target.checked}))}/>{l}</label>)}
          </div>

          {selected.reports>0&&<div className="itemReports"><b>⚠ {selected.reports} report{selected.reports!==1?"s":""} de utilizadores</b>
            <span>{(s.contentReports||[]).filter(r=>r.itemId===selected.item.id).map(r=>r.label).join(" · ")}</span></div>}

          <textarea className="reviewNote" placeholder="Nota do revisor (opcional)" value={note} onChange={e=>setNote(e.target.value)}/>

          {(!allChecks||(selectedQa?.blockerCount||0)>0)&&<small className="reviewGateHint">{(selectedQa?.blockerCount||0)>0?"O pré-QA encontrou um bloqueio mecânico. Corrige a questão antes de pedir aprovação.":"Para aprovar, o revisor tem de confirmar os 8 critérios acima. “Pedir alteração” e “Bloquear” continuam disponíveis sem checklist completa."}</small>}
          <div className="reviewActions">
            <button className="approve" disabled={!allChecks||!reviewer.trim()||(selectedQa?.blockerCount||0)>0} onClick={()=>decide("approve")}>✓ Aprovar</button>
            <button className="changes" onClick={()=>decide("changes")}>✎ Pedir alteração</button>
            <button className="block" onClick={()=>decide("block")}>⛔ Bloquear</button>
          </div>

          <button className="versionButton" onClick={bump}>✎ Preparar alteração editorial desta questão</button>
          {revisionMessage&&<div className="revisionMessage">{revisionMessage}</div>}

          {revisionOpen&&revisionDraft&&<div className="revisionEditor">
            <div className="revisionEditorHead"><div><small>NOVA VERSÃO EDITORIAL</small><h3>Editar sem perder o histórico</h3></div><button onClick={()=>{setRevisionOpen(false);setRevisionDraft(null)}}>Fechar</button></div>
            <p>A alteração só cria uma nova versão <b>pending</b>. Mesmo que a versão anterior estivesse aprovada, esta nova versão não entra numa beta pedagógica/produção até ser novamente revista.</p>

            <label>Enunciado<textarea value={revisionDraft.q} onChange={e=>setRevisionDraft(prev=>({...prev,q:e.target.value}))}/></label>
            <div className="revisionOptionGrid">{revisionDraft.o.map((value,i)=><label key={i}>Opção {String.fromCharCode(65+i)}
              <input value={value} onChange={e=>setRevisionDraft(prev=>({...prev,o:prev.o.map((x,j)=>j===i?e.target.value:x)}))}/>
            </label>)}</div>
            <div className="revisionMetaGrid">
              <label>Resposta correta<select value={revisionDraft.a} onChange={e=>setRevisionDraft(prev=>({...prev,a:Number(e.target.value)}))}>{revisionDraft.o.map((_,i)=><option key={i} value={i}>{String.fromCharCode(65+i)}</option>)}</select></label>
              <label>Dificuldade<select value={revisionDraft.difficulty} onChange={e=>setRevisionDraft(prev=>({...prev,difficulty:Number(e.target.value)}))}>{[1,2,3,4,5].map(x=><option key={x} value={x}>D{x}</option>)}</select></label>
              <label>Tipo cognitivo<input value={revisionDraft.cognitive} onChange={e=>setRevisionDraft(prev=>({...prev,cognitive:e.target.value}))}/></label>
            </div>
            <label>Resolução<textarea value={revisionDraft.sol} onChange={e=>setRevisionDraft(prev=>({...prev,sol:e.target.value}))}/></label>
            <label>Hipótese de erro<textarea value={revisionDraft.hyp} onChange={e=>setRevisionDraft(prev=>({...prev,hyp:e.target.value}))}/></label>

            <div className="revisionDiff">
              <div><b>Comparação antes → depois</b><span>{revisionValidation?.diff?.length||0} campo{revisionValidation?.diff?.length===1?"":"s"} alterado{revisionValidation?.diff?.length===1?"":"s"}</span></div>
              {(revisionValidation?.diff||[]).map(d=><div key={d.field}><strong>{d.label}</strong><small>ANTES</small><code>{Array.isArray(d.before)?d.before.join(" | "):String(d.before)}</code><small>DEPOIS</small><code>{Array.isArray(d.after)?d.after.join(" | "):String(d.after)}</code></div>)}
              {revisionValidation?.warnings?.map((x,i)=><em key={i}>⚠ {x}</em>)}
              {revisionValidation?.errors?.map((x,i)=><em className="error" key={i}>✕ {x}</em>)}
              {revisionValidation?.valid&&<footer><span>Fingerprint atual: {revisionValidation.beforeFingerprint}</span><span>Novo: {revisionValidation.afterFingerprint}</span></footer>}
            </div>

            <div className="revisionEditorActions">
              <button className="approve" disabled={!revisionValidation?.valid} onClick={applyRevision}>Aplicar como nova versão</button>
              {((s.editorialOverrides||{})[selected.item.id]?.revisionHistory||[]).length>0&&<button className="secondary" onClick={revertRevision}>Reverter última alteração</button>}
            </div>
          </div>}

          <div className="reviewAudit">
            <b>Histórico editorial</b>
            {((s.editorialOverrides||{})[selected.item.id]?.history||[]).length===0
              ?<span>Sem decisões registadas.</span>
              :[...((s.editorialOverrides||{})[selected.item.id]?.history||[])].reverse().map((h,i)=><div key={i}>
                <small>v{h.version} · {new Date(h.at).toLocaleString("pt-PT")}</small>
                <span>{h.reviewer}: {h.decision}{h.note?` — ${h.note}`:""}</span>
              </div>)}
            {((s.editorialOverrides||{})[selected.item.id]?.revisionHistory||[]).length>0&&<details className="revisionHistory"><summary>Ver alterações de conteúdo</summary>
              {[...((s.editorialOverrides||{})[selected.item.id]?.revisionHistory||[])].reverse().map((r,i)=><div key={i}>
                <small>v{r.fromVersion} → v{r.toVersion} · {new Date(r.at).toLocaleString("pt-PT")}</small>
                <span>{r.editor}: {r.kind==="rollback"?"reversão":(r.diff||[]).map(d=>d.label).join(", ")}</span>
              </div>)}
            </details>}
          </div>
        </>}
      </section>
    </div>

    {(s.reviewImports||[]).length>0&&<section className="reviewImports"><h3>Importações externas</h3>{[...(s.reviewImports||[])].reverse().slice(0,8).map(x=><div key={x.id}>
      <div><b>{x.applied} decisões aplicadas</b><small>{x.fileName||"CSV externo"} · {new Date(x.at).toLocaleString("pt-PT")}</small></div>
      <span>{(x.reviewerNames||[]).join(", ")||"Revisor externo"}</span>
    </div>)}</section>}

    {(s.reviewBatches||[]).length>0&&<section className="reviewBatches"><h3>Lotes criados</h3>{[...s.reviewBatches].reverse().slice(0,8).map(b=><div key={b.id}>
      <div><b>{b.itemIds.length} questões</b><small>{b.reviewer} · {new Date(b.createdAt).toLocaleDateString("pt-PT")}</small></div><span>{b.status==="open"?"Aberto":"Fechado"}</span>
    </div>)}</section>}

    <div className="notice"><b>O que falta para produção?</b><span>Autenticação real de revisores, permissões, backend, edição simultânea colaborativa, comentários em thread e notificações. Nesta versão estamos a validar o workflow e a experiência.</span></div>
  </Shell>
}
