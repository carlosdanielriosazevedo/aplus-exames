"use client";

import {useEffect,useState} from "react";
import {Back,Shell} from "./chrome";
import {QUESTION_BANK} from "../data/content";
import {theme} from "../lib/engine";
import {allFocusRows,qualitySnapshot,betaContentReadiness,reviewRoadmapProgress,eligibilitySummary} from "../lib/quality";
import {betaSummary,exportBetaPayload} from "../lib/beta";
import {retentionSummary,funnelSummary,activationSummary} from "../lib/productAnalytics";
import {engineAuditSummary,engineAuditLabel} from "../lib/engineAudit";
import {dataIntegrityAudit} from "../lib/reliability";
import {backendHealth,syncStateToBackend} from "../lib/persistence";
import {aggregateFriendsBetaReports} from "../lib/friendsBeta";

export function BetaDashboard({s,setS,go}){
  const sum=betaSummary(s);
  const retention=retentionSummary(s);
  const funnel=funnelSummary(s);
  const activation=activationSummary(s);
  const engineAudit=engineAuditSummary(s);
  const integrityAudit=dataIntegrityAudit(s);
  const contentReadiness=betaContentReadiness(s.editorialOverrides||{},s.contentReports||[]);
  const reviewRoadmap=reviewRoadmapProgress(s.editorialOverrides||{},s.contentReports||[]);
  const eligibility=eligibilitySummary(QUESTION_BANK,s.editorialOverrides||{},s.betaMode||"internal");
  const [code,setCode]=useState(s.betaParticipant?.code||"");
  const [cohort,setCohort]=useState(s.betaParticipant?.cohort||"Piloto Matemática A");
  const [infra,setInfra]=useState({loading:true,configured:false});
  const [syncing,setSyncing]=useState(false);
  const [syncMessage,setSyncMessage]=useState("");
  const [externalReports,setExternalReports]=useState([]);
  const [externalReportMessage,setExternalReportMessage]=useState("");

  useEffect(()=>{
    let live=true;
    backendHealth().then(x=>{if(live)setInfra({loading:false,...x})});
    return ()=>{live=false};
  },[]);

  function saveParticipant(){
    setS(prev=>({...prev,betaParticipant:{code,cohort}}));
  }

  async function syncNow(){
    setSyncing(true);setSyncMessage("");
    const attemptedAt=Date.now();
    const result=await syncStateToBackend({...s,betaParticipant:{code,cohort}});
    setS(prev=>({...prev,syncMeta:{
      ...(prev.syncMeta||{}),
      lastAttemptAt:attemptedAt,
      lastSuccessAt:result.ok?Date.now():(prev.syncMeta?.lastSuccessAt||null),
      lastStatus:result.ok?"synced":(result.code||"failed")
    }}));
    setSyncMessage(result.ok?"Sincronização concluída.":(["BACKEND_NOT_CONFIGURED","DATABASE_NOT_CONFIGURED"].includes(result.code)?"Neon ainda não está ligado — os dados continuam seguros neste navegador.":"Não foi possível sincronizar. Os dados locais não foram apagados."));
    setSyncing(false);
  }

  function download(){
    const payload=exportBetaPayload(s);
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=`aplus-beta-${s.betaParticipant?.code||"participante"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importFriendReports(files){
    const list=[...(files||[])];
    if(!list.length)return;
    const parsed=[];
    let rejected=0;
    for(const file of list){
      try{
        const data=JSON.parse(await file.text());
        if(["aplus-friends-beta-v2","aplus-friends-beta-v3"].includes(data?.schema))parsed.push(data);
        else rejected++;
      }catch{rejected++}
    }
    setExternalReports(prev=>{
      const byCode=new Map();
      [...prev,...parsed].forEach(r=>byCode.set(r?.participant?.code||`${r?.exportedAt}-${Math.random()}`,r));
      return [...byCode.values()];
    });
    setExternalReportMessage(`${parsed.length} relatório(s) válido(s) importado(s)${rejected?` · ${rejected} rejeitado(s)`:""}.`);
  }

  const externalAggregate=aggregateFriendsBetaReports(externalReports);

  return <Shell><Back go={go}/><p className="eyebrow">PAINEL INTERNO · BETA PILOTO</p>
    <h1>Medir antes de escalar.</h1>
    <p className="muted">Este painel permite testar a experiência num único dispositivo. Numa beta real, estes dados serão agregados num backend.</p>

    <div className="betaIdentity">
      <label>Código do participante<input value={code} onChange={e=>setCode(e.target.value)}/></label>
      <label>Coorte<input value={cohort} onChange={e=>setCohort(e.target.value)}/></label>
      <button onClick={saveParticipant}>Guardar</button>
    </div>

    <section className="backendCard">
      <div className="backendHead"><div><small>INFRAESTRUTURA DE DADOS</small><b>{infra.loading?"A verificar…":infra.backendConfigured?(infra.backendReachable?"Neon Postgres ligado":"Neon configurado · ligação por verificar"):"Local-first · Neon ainda não ligado"}</b></div><span className={infra.backendConfigured&&infra.backendReachable?"online":"local"}>{infra.backendConfigured?(infra.backendReachable?"● online":"● configuração"):"● local"}</span></div>
      <p>A aplicação grava sempre primeiro neste dispositivo. Quando o backend estiver configurado, o mesmo estado pode ser sincronizado através da API server-side sem expor credenciais no browser.</p>
      <div className="backendNumbers"><span>{(s.betaEvents||[]).length} eventos</span><span>{(s.betaSessions||[]).length} sessões</span><span>{(s.contentReports||[]).length} reports</span></div>
      <button disabled={syncing} onClick={syncNow}>{syncing?"A sincronizar…":"Sincronizar agora"}</button>
      {syncMessage&&<small className="syncMessage">{syncMessage}</small>}
      {s.syncMeta?.lastAttemptAt&&<small className="syncMeta">Última tentativa: {new Date(s.syncMeta.lastAttemptAt).toLocaleString("pt-PT")} · {s.syncMeta.lastStatus}</small>}
    </section>

    <div className="qaMetrics betaMetrics">
      <div><span>Sessões concluídas</span><b>{sum.sessions}</b><small>neste dispositivo</small></div>
      <div><span>Conclusão</span><b>{sum.completionRate}%</b><small>inícios → fins</small></div>
      <div><span>Feedbacks</span><b>{sum.feedbackCount}</b><small>qualitativos</small></div>
      <div><span>Reports</span><b>{sum.reports}</b><small>problemas de conteúdo</small></div>
    </div>

    <section className="qaSection retentionPanel">
      <div className="externalBetaHead"><div><small>FUNIL + RETENÇÃO</small><h3>A experiência cria hábito ou só uma boa primeira impressão?</h3></div><span>{retention.activeDays} dia{retention.activeDays===1?"":"s"} ativo{retention.activeDays===1?"":"s"}</span></div>
      <p>Estes números vêm de aberturas reais desta instalação, não da pergunta “voltarias amanhã?”. D1/D3/D7 só entram no denominador quando já passou tempo suficiente.</p>

      <div className="retentionCards">
        {[
          ["D1",retention.d1],
          ["D3",retention.d3],
          ["D7",retention.d7]
        ].map(([label,r])=><div key={label} className={r.eligible?(r.retained?"retained":"missed"):"waiting"}>
          <span>{label}</span><b>{!r.eligible?"…":r.retained?"✓":"×"}</b>
          <small>{!r.eligible?"Ainda não elegível":r.retained?"Regressou nesse dia":"Não abriu nesse dia"}</small>
        </div>)}
        <div className={activation.activated?"retained":"waiting"}><span>Ativação</span><b>{activation.activated?"✓":"…"}</b><small>{activation.activated?`Diagnóstico + 1.ª Missão${activation.minutesToActivation!==null?` · ${activation.minutesToActivation} min`:""}`:"Falta concluir diagnóstico + 1.ª Missão"}</small></div>
      </div>

      <div className="funnelRows">{funnel.map((step,i)=><div key={step.id} className={step.reached?"reached":"pending"}>
        <b>{i+1}</b><span>{step.label}</span><em>{step.reached?"✓":"—"}</em>
      </div>)}</div>

      <small className="auditFoot">Retenção mede abertura da app, enquanto streak mede estudo efetivo. São métricas diferentes de propósito.</small>
    </section>

    <section className="externalBetaReports">
      <div className="externalBetaHead"><div><small>RELATÓRIOS DOS TESTERS</small><h3>Separar alunos de observadores</h3></div><span>{externalAggregate.validReports} testers</span></div>
      <p>Importa aqui os JSON enviados pelos testers. Os ficheiros são analisados apenas neste browser e os resultados são separados pelo tipo de tester.</p>
      <label className="externalReportUpload">Importar relatórios JSON<input type="file" accept=".json,application/json" multiple onChange={e=>importFriendReports(e.target.files)}/></label>
      {externalReportMessage&&<small className="externalReportMessage">{externalReportMessage}</small>}
      {externalAggregate.validReports>0&&<>
        <div className="testerGroupCards">
          {[
            ["target","Alunos atuais"],
            ["near_target","Ex-alunos recentes"],
            ["buyer","Pais / mães"],
            ["observer","Observadores adultos"]
          ].map(([key,label])=>{
            const g=externalAggregate.byFit[key];
            return <div key={key} className={key==="target"?"targetGroup":""}>
              <span>{label}</span><b>{g.testers}</b><small>{g.sessionsPerTester} sessões/tester</small>
              <em>Intenção de voltar: {g.returnIntent??"—"}/5</em>
              <em>D1 real: {g.d1?.rate??"—"}% ({g.d1?.eligible||0} eleg.)</em>
              <em>Ativação: {g.activation?.rate??"—"}%</em>
              <em>Personalização: {g.personalization??"—"}/5</em>
            </div>
          })}
        </div>
        <div className="targetSignalCard">
          <b>{externalAggregate.byFit.target.testers>=5?"Já há um pequeno sinal do público-alvo":"Ainda precisamos de mais alunos reais"}</b>
          <span>{externalAggregate.byFit.target.testers
            ?`${externalAggregate.byFit.target.testers} aluno(s) atual(is) · ativação ${externalAggregate.byFit.target.activation?.rate??"—"}% · D1 real ${externalAggregate.byFit.target.d1?.rate??"—"}% (${externalAggregate.byFit.target.d1?.eligible||0} elegíveis) · intenção declarada ${externalAggregate.byFit.target.returnIntent??"—"}/5.`
            :"Os elogios de adultos continuam úteis para UX/conceito, mas esta caixa só começa a validar adesão quando entram alunos do secundário."}</span>
        </div>
      </>}
    </section>

    <section className="qaSection betaGoNoGo">
      <div className="engineHealthHead"><div><small>GO / NO-GO DA BETA</small><h3>Conteúdo pronto para beta pedagógica fechada?</h3></div><span className={contentReadiness.canClosedBeta?"healthy":"attention"}>{contentReadiness.canClosedBeta?"GO":"NO-GO"}</span></div>
      <div className="betaGoScore"><b>{contentReadiness.score}%</b><div className="readinessBar"><i style={{width:contentReadiness.score+"%"}}/></div></div>
      <p>{contentReadiness.canClosedBeta
        ?"Os critérios mínimos de conteúdo revisto estão cumpridos. Ainda é necessário confirmar infraestrutura e QA da versão a distribuir."
        :"A beta de experiência com amigos pode testar UX, clareza e engagement, mas ainda não devemos interpretar esses resultados académicos como pedagogicamente fiáveis enquanto estes bloqueios não forem resolvidos."}</p>
      {!contentReadiness.canClosedBeta&&<div className="readinessBlockers">{contentReadiness.blockers.slice(0,4).map((x,i)=><span key={i}>• {x}</span>)}</div>}
      {!contentReadiness.canClosedBeta&&<div className="goRoadmapSummary"><b>{reviewRoadmap.approvalsNeeded} aprovações no caminho mínimo</b><span>≈ {reviewRoadmap.estimatedHours} h de revisão a 5 min/questão</span></div>}
    </section>

    <section className="qaSection engineHealth"><div className="engineHealthHead"><div><small>AUDITORIA DO ORQUESTRADOR</small><h3>Saúde do motor</h3></div><span className={engineAudit.status}>{engineAuditLabel(engineAudit.status)}</span></div>
      <div className="perceptionGrid">
        <div><span>Maior sequência no mesmo tema</span><b>{engineAudit.maxSameThemeRun||0}</b></div>
        <div><span>Calibração</span><b>{engineAudit.calibrationRate}%</b></div>
        <div><span>Fim por pouca informação</span><b>{engineAudit.lowInfoRate}%</b></div>
      </div>
      {engineAudit.missions<5
        ?<div className="qaEmpty">Precisamos de pelo menos 5 Missões para avaliar padrões do motor.</div>
        :engineAudit.warnings.length===0
          ?<div className="engineHealthy">✓ Não foram detetados padrões problemáticos no histórico atual.</div>
          :<div className="engineWarnings">{engineAudit.warnings.map(w=><div key={w.code} className={w.severity}><b>{w.title}</b><span>{w.detail}</span></div>)}</div>}
      <small className="auditFoot">Esta auditoria não altera o plano do aluno. Serve apenas para detetar comportamentos anómalos durante desenvolvimento e beta.</small>
    </section>

    <section className="qaSection integrityHealth">
      <div className="engineHealthHead"><div><small>INTEGRIDADE DOS DADOS</small><h3>Sessões sem duplicação</h3></div><span className={integrityAudit.status}>{integrityAudit.status==="healthy"?"Saudável":integrityAudit.status==="attention"?"Requer atenção":"A observar"}</span></div>
      <div className="perceptionGrid">
        <div><span>Conclusões duplicadas</span><b>{integrityAudit.duplicateCompletions}</b></div>
        <div><span>IDs duplicados</span><b>{integrityAudit.duplicateSessionIds+integrityAudit.duplicateEventIds}</b></div>
        <div><span>Sessões ainda abertas</span><b>{integrityAudit.openSessions}</b></div>
      </div>
      {integrityAudit.issues.length===0
        ?<div className="engineHealthy">✓ Não foram encontrados sinais de dupla contabilização ou telemetria inconsistente.</div>
        :<div className="engineWarnings">{integrityAudit.issues.map(x=><div key={x.code} className={x.severity}><b>{x.title}</b><span>{x.detail}</span></div>)}</div>}
      <small className="auditFoot">As conclusões de Missão, Treino e Mini-exame usam agora uma chave de idempotência local antes de alterar o progresso.</small>
    </section>

    <section className="qaSection"><h3>Perceção dos alunos</h3>
      <div className="perceptionGrid">
        <div><span>Clareza</span><b>{sum.avgClarity??"—"}/5</b></div>
        <div><span>Dificuldade adequada</span><b>{sum.avgDifficultyFit??"—"}/5</b></div>
        <div><span>Utilidade</span><b>{sum.avgUsefulness??"—"}/5</b></div>
      </div>
    </section>

    <section className="qaSection"><h3>Duração por tipo de sessão</h3>
      <div className="sessionRows">{Object.entries(sum.byKind).length===0?<div className="qaEmpty">Ainda sem sessões concluídas.</div>:
        Object.entries(sum.byKind).map(([kind,v])=><div key={kind}><b>{kind}</b><span>{v.count} sessões</span><small>média {Math.round(v.totalSeconds/v.count/60*10)/10} min</small></div>)}
      </div>
    </section>

    <section className="qaSection"><h3>Modo de conteúdo</h3>
      <div className="betaModeChoices">
        {[
          ["internal","Interno","Pode usar conteúdo protótipo; serve para desenvolvimento."],
          ["closed_beta","Beta fechada","Os gates são aplicados pelo motor: Diagnóstico/Missões/Exames exigem conteúdo revisto."],
          ["production","Produção","O motor só seleciona conteúdo formalmente revisto."]
        ].map(([v,l,d])=><button key={v} className={(s.betaMode||"internal")===v?"sel":""} onClick={()=>setS(prev=>({...prev,betaMode:v}))}><b>{l}</b><span>{d}</span></button>)}
      </div>
      <div className="eligibilityTable">
        {["diagnostic","mission","training","exam"].map(ctx=><div key={ctx}><b>{ctx}</b><span>{eligibility[ctx].eligible}/{eligibility[ctx].total} elegíveis</span><small>{eligibility[ctx].blocked} bloqueados pelo gate</small></div>)}
      </div>
    </section>

    {(s.betaMode||"internal")!=="internal" && eligibility.diagnostic.eligible===0&&<div className="notice warning"><b>Gate de publicação aplicado pelo motor</b><span>Neste momento não existem questões de Diagnóstico formalmente revistas suficientes para este modo. O motor deixa de as selecionar — não é apenas um aviso visual.</span></div>}

    <section className="qaSection"><h3>Últimos feedbacks</h3>
      {(s.betaFeedback||[]).length===0?<div className="qaEmpty">Ainda sem feedback.</div>:<div className="feedbackRows">{[...(s.betaFeedback||[])].reverse().slice(0,12).map(f=><div key={f.id}><div><b>{f.kind}</b><small>{new Date(f.at).toLocaleString("pt-PT")}</small></div><span>Clareza {f.clarity}/5 · dificuldade {f.difficultyFit}/5 · utilidade {f.usefulness}/5</span>{f.comment&&<em>{f.comment}</em>}</div>)}</div>}
    </section>

    <div className="notice"><b>Backend Ready</b><span>A v2.3 já escreve diretamente em Neon Postgres através da API server-side. Sem `DATABASE_URL`, a app continua local-first e nunca perde os dados do navegador.</span></div>
    <button className="exportBeta" onClick={download}>Exportar dados deste participante (.json)</button>
    <div className="notice"><b>Privacidade na beta real</b><span>Devemos recolher apenas o necessário, informar os participantes do que é medido e evitar dados pessoais desnecessários. O código de participante pode ser pseudónimo.</span></div>
  </Shell>
}


export function QualityPanel({s,setS,go}){
  const snapshot=qualitySnapshot(s.contentReports||[]),rows=allFocusRows();
  const gaps=rows.filter(r=>r.status==="gap"),covered=rows.filter(r=>r.status==="covered"),reports=s.contentReports||[];
  return <Shell><Back go={go}/><p className="eyebrow">PAINEL INTERNO · QUALIDADE & BETA</p>
    <h1>O conteúdo tem de ser auditável.</h1>
    <button className="reviewShortcut" onClick={()=>go("review")}>Abrir workflow de revisão pedagógica →</button>
    <p className="muted">Este ecrã é de desenvolvimento. Não faz parte da experiência normal do aluno numa versão pública.</p>
    <div className="qaMetrics">
      <div><span>Cobertura inicial</span><b>{snapshot.coverage.coveragePct}%</b><small>{snapshot.coverage.covered}/{snapshot.coverage.totalFocus} focos</small></div>
      <div><span>Erros automáticos</span><b>{snapshot.errors}</b><small>devem ser 0</small></div>
      <div><span>Validação matemática</span><b>{snapshot.mathValidation.failed}</b><small>falhas em {snapshot.mathValidation.samples} variantes-amostra</small></div>
      <div><span>Reports</span><b>{snapshot.reports}</b><small>neste dispositivo</small></div>
    </div>
    <div className="notice"><b>Validação matemática ≠ revisão pedagógica</b><span>Uma variante automática só entra no motor se um validador independente do template recalcular a resposta e concordar com a opção marcada. Isso continua sem provar que o enunciado, dificuldade ou distratores são pedagogicamente bons — essa autoridade continua a ser do professor.</span></div>
    <section className="qaSection mathValidationSection"><h3>Pipeline matemático dos geradores</h3>
      <div className="mathValidationSummary"><div><span>Templates</span><b>{snapshot.mathValidation.templates}</b></div><div><span>Amostras</span><b>{snapshot.mathValidation.samples}</b></div><div><span>Validadas</span><b>{snapshot.mathValidation.passed}</b></div><div><span>Conflitos</span><b>{snapshot.mathValidation.failed}</b></div></div>
      <p className="muted">O pipeline já está preparado para uma segunda validação externa. Se no futuro um motor como Wolfram discordar do nosso cálculo local, a questão passa automaticamente a bloqueada para revisão humana.</p>
    </section>

    <section className="qaSection"><h3>Validações automáticas</h3>
      {snapshot.checks.length===0?<div className="qaOk">✓ Nenhum problema estrutural detetado no banco atual.</div>
      :<div className="qaIssues">{snapshot.checks.slice(0,25).map((x,i)=><div className={x.severity} key={`${x.itemId}-${i}`}><b>{x.severity==="error"?"ERRO":"AVISO"}</b><span>{x.itemId}: {x.message}</span></div>)}</div>}
    </section>

    <section className="qaSection"><h3>Focos ainda sem conteúdo</h3>
      {gaps.length===0?<div className="qaOk">✓ Todos os focos têm conteúdo curado ou gerador.</div>
      :<div className="gapGrid">{gaps.slice(0,30).map(r=><div key={`${r.themeId}-${r.focus}`}><small>{r.year} · {r.theme}</small><b>{r.focus}</b></div>)}</div>}
      {gaps.length>30&&<small className="moreRows">+ {gaps.length-30} focos adicionais</small>}
    </section>

    <section className="qaSection"><h3>Amostra de cobertura</h3><div className="coverageTable">
      {covered.slice(0,25).map(r=><div className="coverageRow" key={`${r.themeId}-${r.focus}`}><div><small>{r.year} · {r.theme}</small><b>{r.focus}</b></div><span>{r.curatedCount} curadas</span><span>{r.generatorCount} geradores</span><span>{r.reviewedCount} revistas</span></div>)}
    </div></section>

    <section className="qaSection"><h3>Problemas sinalizados por utilizadores</h3>
      {reports.length===0?<div className="qaEmpty">Ainda não existem reports neste dispositivo.</div>
      :<div className="reportList">{[...reports].reverse().slice(0,30).map(r=><div key={r.id}><div><b>{r.label}</b><small>{r.itemId} · {theme(r.themeId)?.short}</small></div><span>{r.generated?"Variante gerada":"Questão curada"}</span></div>)}</div>}
    </section>
    <div className="notice"><b>Limite do protótipo</b><span>Os reports estão apenas em localStorage. Numa beta real têm de ir para backend/base de dados para compararmos vários alunos.</span></div>
  </Shell>
}

