"use client";
import {useEffect,useState} from "react";
import {ApronsoNudge,Back,BrandName,Shell,StudentNav,StudentTop} from "./chrome";
import {AVAILABLE_SUBJECT_IDS,SECONDARY_EXAM_SUBJECTS,examCodesLabel} from "../data/subjects";
import {subjectProgressFor} from "../lib/subjectProgress";
import {subjectGoal,uniqueSubjectIds} from "../lib/subjectWorkspace";
import {ROLES,normalizeIdentity,can,defaultScreenForRole,createParentInvite,activeParentLink,requestLinkRemoval,confirmLinkRemoval,demoIdentity} from "../lib/identity";
import {engagementSummary} from "../lib/engagement";
import {examScoreLabel} from "../lib/constructedResponseView";
import {competitionSummary,latestCompetitiveActivity,demoLeaderboard,leaderboardAroundUser,leagueProjection,updateCompetitionProfile,scopeAvailability,PORTUGAL_REGIONS,DIVISIONS,PROMOTION_COUNT,DEMOTION_COUNT,SCHOOL_MIN_PARTICIPANTS,DISTRICT_MIN_PARTICIPANTS} from "../lib/competition";

const DEFAULT_SUBJECT_ID="math-a";
function subjectById(id){return SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===id)||SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===DEFAULT_SUBJECT_ID);}

export function Ranking({s,setS,go}){
  const summary=competitionSummary(s);
  const projection=leagueProjection(s);
  const profile=summary.profile||{};
  const [scope,setScope]=useState("league");
  const [nickname,setNickname]=useState(profile.nickname||"");
  const [region,setRegion]=useState(profile.region||"");
  const [school,setSchool]=useState(profile.school||"");
  const [schoolYear,setSchoolYear]=useState(s.profile?.schoolYear||"");
  const [districtOptIn,setDistrictOptIn]=useState(!!profile.districtOptIn);
  const [schoolOptIn,setSchoolOptIn]=useState(!!profile.schoolOptIn);
  const availability=scopeAvailability(s,scope);
  const allRows=availability.available?demoLeaderboard(s,{scope}):[];
  const rows=scope==="league"?allRows:leaderboardAroundUser(allRows,3);
  const self=allRows.find(x=>x.self);
  const latest=latestCompetitiveActivity(s);

  const scopeLabel={
    league:`Divisão ${summary.division.label}`,
    general:"Geral",
    year:s.profile?.schoolYear||"Meu ano",
    district:profile.region||"Distrito/Região",
    school:profile.school||"Escola"
  }[scope];

  function saveProfile(){
    setS(prev=>updateCompetitionProfile({
      ...prev,
      profile:{...prev.profile,schoolYear:schoolYear||prev.profile?.schoolYear||null}
    },{
      nickname,
      region:region||null,
      school:school.trim()||null,
      districtOptIn,
      schoolOptIn
    }));
  }

  return <Shell><StudentTop s={s} go={go}/>
    <ApronsoNudge pose="welcome">Eu trato das contas. Tu só precisas de estudar — o ranking mede esforço, nunca conhecimento.</ApronsoNudge>
    <div className="rankingHero">
      <div><p className="eyebrow">🏆 COMPETIÇÃO SEMANAL</p><h1>Treina. Ganha XP. Sobe.</h1>
        <p className="muted">O ranking compara <b>atividade de estudo</b>, nunca Domínio, Certeza, Índice de Preparação ou notas.</p></div>
      <div className="divisionBadge"><span>{summary.division.icon}</span><b>{summary.division.label}</b><small>{summary.weekXp} XP esta semana</small></div>
    </div>

    <div className="demoRankingWarning"><b>DEMONSTRAÇÃO LOCAL</b><span>Os outros nomes e XP desta versão são simulados para testarmos a experiência. O ranking real só será ligado quando existir backend multiutilizador.</span></div>

    <div className="rankingTabs">
      {[["league","Divisão"],["general","Geral"],["year","Ano"],["district","Distrito"],["school","Escola"]].map(([id,label])=>
        <button key={id} className={scope===id?"sel":""} onClick={()=>setScope(id)}>{label}</button>
      )}
    </div>

    {scope==="league"&&<section className="leagueStatus">
      <div><small>DIVISÃO ATUAL</small><h3>{summary.division.icon} {summary.division.label}</h3><p>{projection?.message}</p></div>
      <div><b>#{projection?.position||"—"}</b><span>de {allRows.length||20}</span></div>
      <footer><span>↑ Top {PROMOTION_COUNT} sobem</span><span>↓ Últimos {DEMOTION_COUNT} descem</span><span>Termina em ~{summary.daysRemaining} d</span></footer>
    </section>}

    {!availability.available?<div className="rankingLocked">
      <b>{scope==="district"?"Ranking de distrito/região ainda não ativo":"Ranking de escola ainda não ativo"}</b>
      <span>{availability.reason}</span>
      <small>{scope==="school"
        ?`No ranking real, só abriremos uma tabela de escola com pelo menos ${SCHOOL_MIN_PARTICIPANTS} participantes elegíveis, para reduzir risco de identificação.`
        :`No ranking real, o distrito/região terá um limiar mínimo de ${DISTRICT_MIN_PARTICIPANTS} participantes.`}</small>
    </div>:<section className="leaderboard">
      <div className="leaderboardHead"><div><small>RANKING SEMANAL · {scopeLabel?.toUpperCase()}</small><h3>{scope==="league"?"A tua liga":scopeLabel}</h3></div><span>{self?`Tu: #${self.position}`:"—"}</span></div>
      <div className="leaderboardRows">{rows.map(row=>{
        const promote=scope==="league"&&row.position<=PROMOTION_COUNT;
        const demote=scope==="league"&&row.position>allRows.length-DEMOTION_COUNT;
        return <div key={row.id} className={(row.self?"self ":"")+(promote?"promote ":demote?"demote ":"")}>
          <b className="rankPos">{row.position}</b>
          <span className="rankAvatar">{row.self?"🙂":row.position===1?"🥇":row.position===2?"🥈":row.position===3?"🥉":"●"}</span>
          <div><strong>{row.nickname}{row.self?" · TU":""}</strong><small>{row.demo?"tester simulado":"o teu perfil"}</small></div>
          <em>{row.xp} XP</em>
        </div>
      })}</div>
      {scope!=="league"&&<small className="aroundYouNote">Em rankings muito grandes, a experiência deverá privilegiar a tua posição e quem está imediatamente acima/abaixo — não uma lista infinita.</small>}
    </section>}

    <section className="xpRules">
      <div><small>COMO GANHAS XP COMPETITIVO</small><h3>Mais estudo útil, menos farming.</h3></div>
      <div className="xpRuleGrid">
        <div><b>🎯 +50</b><span>Missão diária</span><small>Uma única Missão por dia.</small></div>
        <div><b>🧠 até +40</b><span>Treino Livre</span><small>Repetir sempre o mesmo foco reduz progressivamente o XP competitivo.</small></div>
        <div><b>📝 até +80</b><span>Mini-exame</span><small>XP pela atividade concluída, não pela nota.</small></div>
        <div><b>🧭 +30</b><span>1.º Diagnóstico</span><small>Conta uma vez.</small></div>
      </div>
      {latest&&<div className="lastRankXp"><b>Último ganho: +{latest.rankedXp} XP</b><span>{latest.reason}</span></div>}
      <p className="muted">O teu <b>XP total</b> continua acumulado para sempre. O <b>XP competitivo</b> reinicia semanalmente para que um aluno novo possa competir desde a primeira semana.</p>
    </section>

    <section className="divisionLadder">
      <small>DIVISÕES</small>
      <div>{DIVISIONS.map(d=><div key={d.id} className={d.id===summary.division.id?"current":""}><span>{d.icon}</span><b>{d.label}</b></div>)}</div>
      <p>Em produção, cada liga terá um pequeno grupo de alunos com atividade comparável. No final da semana, os primeiros sobem e os últimos podem descer.</p>
    </section>

    <section className="rankingProfile">
      <div><small>PERFIL PÚBLICO DO RANKING</small><h3>Nickname, nunca nota.</h3>
        <p>O ano já faz parte do teu perfil académico. Para entrares no ranking da escola, indica o ano, a escola e ativa a participação. O nome da escola serve apenas para agrupar resultados e nunca aparece publicamente.</p></div>
      <label>Nickname<input maxLength="24" value={nickname} onChange={e=>setNickname(e.target.value)} placeholder="Ex.: Sigma17"/></label>
      <label>Distrito/Região<select value={region} onChange={e=>setRegion(e.target.value)}><option value="">Não indicar</option>{PORTUGAL_REGIONS.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
      <label>Ano para o ranking<select value={schoolYear} onChange={e=>setSchoolYear(e.target.value)}><option value="">Selecionar ano</option><option value="10.º">10.º ano</option><option value="11.º">11.º ano</option><option value="12.º">12.º ano</option><option value="Já terminei o secundário">Já terminei o secundário</option></select></label>
      <label>Escola<input value={school} onChange={e=>setSchool(e.target.value)} placeholder="Nome da escola (opcional)"/></label>
      <label className="rankConsent"><input type="checkbox" checked={districtOptIn} onChange={e=>setDistrictOptIn(e.target.checked)}/><span>Participar no ranking do meu distrito/região.</span></label>
      <label className="rankConsent"><input type="checkbox" checked={schoolOptIn} onChange={e=>setSchoolOptIn(e.target.checked)}/><span>Participar no ranking da minha escola.</span></label>
      <button className="primary" onClick={saveProfile}>Guardar perfil de ranking</button>
      <small className="privacyRankNote">Nunca entram no ranking: Domínio, Certeza, Índice de Preparação, nota objetivo, resultados de exame ou número de erros.</small>
    </section>
    <StudentNav active="ranking" go={go}/>
  </Shell>;
}

export function IdentityLab({s,setS,go}){
  const identity=normalizeIdentity(s.identity);
  const [authState,setAuthState]=useState({loading:true,authConfigured:false});

  useEffect(()=>{
    let alive=true;
    fetch("/api/auth/capabilities",{cache:"no-store"})
      .then(r=>r.json()).then(x=>{if(alive)setAuthState({loading:false,...x})})
      .catch(()=>{if(alive)setAuthState({loading:false,authConfigured:false})});
    return ()=>{alive=false};
  },[]);

  function switchDemo(role){
    const next=demoIdentity(role);
    setS(prev=>({...prev,identity:next}));
  }

  function openRole(){
    go(defaultScreenForRole(normalizeIdentity(s.identity).activeRole));
  }

  function simulateParentAccept(){
    const pending=[...(s.parentInvites||[])].reverse().find(x=>x.status==="pending");
    if(!pending)return;
    const parent=demoIdentity("parent");
    if(pending.email)parent.email=pending.email;
    setS(prev=>({...prev,parentInvites:(prev.parentInvites||[]).map(x=>x.id===pending.id?{
      ...x,status:"accepted",acceptedAt:Date.now(),parentEmail:parent.email,parentName:"Pai/Mãe Demo"
    }:x)}));
  }

  function confirmRemovalAsParent(){
    const link=activeParentLink(s.parentInvites||[]);
    if(!link?.removal)return;
    setS(prev=>({...prev,parentInvites:(prev.parentInvites||[]).map(x=>x.id===link.id?confirmLinkRemoval(x,"parent"):x)}));
  }

  return <Shell><Back go={go}/><p className="eyebrow">PAINEL INTERNO · IDENTIDADE & PERMISSÕES</p>
    <h1>Uma identidade. Papéis diferentes.</h1>
    <p className="muted">Nesta versão não criamos passwords. O modo abaixo serve apenas para testar a experiência dos vários papéis antes de ligarmos a sessão real do Neon Auth.</p>

    <div className={"authStatus "+(authState.authConfigured?"online":"demo")}>
      <span>{authState.authConfigured?"●":"○"}</span>
      <div><b>{authState.authConfigured?"Neon Auth disponível no ambiente":"Modo demo local"}</b>
        <small>{authState.authConfigured?"A infraestrutura existe; falta ligar a sessão real à interface.":"Sem autenticação real. Seguro para prototipagem, não para produção."}</small></div>
    </div>

    <div className="identityCard">
      <div><span>Pessoa ativa</span><b>{identity.displayName}</b><small>{identity.email}</small></div>
      <strong>{ROLES[identity.activeRole]?.icon} {ROLES[identity.activeRole]?.label}</strong>
    </div>

    <h3>Simular papel</h3>
    <div className="roleGrid">{Object.entries(ROLES).map(([role,meta])=><button key={role} className={identity.activeRole===role?"sel":""} onClick={()=>switchDemo(role)}>
      <span>{meta.icon}</span><b>{meta.label}</b>
      <small>{role==="student"?"Estudo, progresso e convites parentais":role==="parent"?"Acompanhamento do aluno":role==="reviewer"?"Revisão pedagógica":"Qualidade, beta e gestão"}</small>
    </button>)}</div>

    <button className="primary" onClick={openRole}>Abrir experiência de {ROLES[identity.activeRole]?.label}</button>
    <button className="secondary" onClick={()=>go("account")}>Conta <BrandName/> &amp; Progresso na Cloud →</button>

    <div className="permissionMatrix"><h3>Permissões principais</h3>
      {[
        ["study","Estudar / fazer Missões"],
        ["parent_dashboard","Área parental"],
        ["review_content","Rever conteúdo"],
        ["beta_admin","Administrar beta"]
      ].map(([cap,label])=><div key={cap}><span>{label}</span><b className={can(identity,cap)?"allowed":"denied"}>{can(identity,cap)?"✓ Permitido":"— Não permitido"}</b></div>)}
    </div>

    <div className="demoActions"><h3>Teste rápido da ligação parental</h3>
      <button onClick={()=>go("parent")}>1. Criar convite como aluno →</button>
      <button disabled={!(s.parentInvites||[]).some(x=>x.status==="pending")} onClick={simulateParentAccept}>2. Simular aceitação pelo Pai/Mãe</button>
      <button disabled={!activeParentLink(s.parentInvites||[])?.removal} onClick={confirmRemovalAsParent}>3. Simular confirmação de remoção pelo Pai/Mãe</button>
    </div>

    <div className="notice"><b>Regra de segurança</b><span>Os papéis <b>Professor Revisor</b> e <b>Admin</b> nunca serão escolhidos no registo pelo próprio utilizador. Serão concedidos apenas por uma conta administrativa autorizada.</span></div>
    <div className="notice"><b>Sem pesquisa pública</b><span>Um Pai/Mãe não procura o nome do filho na plataforma. O aluno cria um convite privado, de utilização única e com validade limitada.</span></div>
  </Shell>
}

export function Parent({s,setS,go,prepIndex,measuredThemes}){
  const index=prepIndex(s),measured=measuredThemes(s);
  const identity=normalizeIdentity(s.identity);
  const link=activeParentLink(s.parentInvites||[]);
  const [email,setEmail]=useState("");
  const [copied,setCopied]=useState(false);
  const [entryChoice,setEntryChoice]=useState(null);
  const parentAccess=identity.activeRole==="parent";
  const weekly=engagementSummary(s);
  const activeDaysWeek=weekly.last7.filter(day=>day.active).length;
  const weeklyXp=weekly.last7.reduce((sum,day)=>sum+(day.xp||0),0);
  const selectedSubjects=uniqueSubjectIds(s.selectedSubjectIds||[],AVAILABLE_SUBJECT_IDS);
  const visibleSubjectIds=selectedSubjects.length?selectedSubjects:[DEFAULT_SUBJECT_ID];

  function createInvite(){
    if(!email.trim())return;
    const invite=createParentInvite({studentName:identity.displayName,email});
    setS(prev=>({...prev,parentInvites:[...(prev.parentInvites||[]),invite]}));
    setEmail("");
  }

  function copyInvite(invite){
    const url=`https://aplus-exames.vercel.app/convite/${invite.token}`;
    if(navigator?.clipboard)navigator.clipboard.writeText(url);
    setCopied(true);setTimeout(()=>setCopied(false),1400);
  }

  function requestRemoval(){
    if(!link)return;
    const requestedBy=parentAccess?"parent":"student";
    setS(prev=>({...prev,parentInvites:(prev.parentInvites||[]).map(x=>x.id===link.id?requestLinkRemoval(x,requestedBy):x)}));
  }

  function confirmRemoval(){
    if(!link?.removal)return;
    const confirmedBy=parentAccess?"parent":"student";
    setS(prev=>({...prev,parentInvites:(prev.parentInvites||[]).map(x=>x.id===link.id?confirmLinkRemoval(x,confirmedBy):x)}));
  }

  function subjectSnapshot(id){
    const meta=subjectById(id);
    if(id===DEFAULT_SUBJECT_ID){
      const missionCount=(s.missionHistory||[]).length;
      const examCount=(s.examHistory||[]).length;
      return {
        id,meta,goal:subjectGoal(s,id,s.goal||14),diagnosticDone:!!s.diagnosticDone,
        sessions:missionCount+examCount,lastActivityAt:null,
        detail:index===null?"Ainda sem indicador global":`Índice de preparação: ${index}/100`
      };
    }
    const progress=subjectProgressFor(s,id);
    return {
      id,meta,goal:subjectGoal(s,id,s.goal||14),diagnosticDone:!!progress.diagnosticDone,
      sessions:(progress.sessions||[]).length,lastActivityAt:progress.lastActivityAt||null,
      detail:progress.diagnosticDone?"Diagnóstico concluído":"Diagnóstico por concluir"
    };
  }

  const subjectRows=visibleSubjectIds.map(subjectSnapshot);

  const evidenceRows=[];
  measured.forEach(t=>{
    const value=s.scores?.[t.id]?.domain;
    if(Number.isFinite(value))evidenceRows.push({subject:"Matemática A",label:t.short||t.name,value,attempts:1});
  });
  visibleSubjectIds.filter(id=>id!==DEFAULT_SUBJECT_ID).forEach(id=>{
    const progress=subjectProgressFor(s,id);
    const subject=subjectById(id)?.shortName||subjectById(id)?.name||id;
    Object.values(progress.competence||{}).forEach(row=>{
      const attempts=Number(row.attempts)||0;
      if(!attempts)return;
      const correct=Number(row.correct)||0;
      evidenceRows.push({subject,label:row.label||row.domainId||"Competência",value:Math.round(correct/attempts*100),attempts});
    });
  });
  const strongest=[...evidenceRows].sort((a,b)=>b.value-a.value||b.attempts-a.attempts)[0]||null;
  const weakest=[...evidenceRows].sort((a,b)=>a.value-b.value||b.attempts-a.attempts)[0]||null;
  function localStudyDayKey(at){
    const d=new Date(at);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }

  const engagementDays=s.engagement?.days||{};
  const studyTrend=Array.from({length:4},(_,reverseIndex)=>{
    const weeksAgo=3-reverseIndex;
    let activeDays=0,xp=0;
    for(let offset=0;offset<7;offset++){
      const d=new Date();
      d.setHours(12,0,0,0);
      d.setDate(d.getDate()-(weeksAgo*7+6-offset));
      const row=engagementDays[localStudyDayKey(d.getTime())];
      if(row&&Object.values(row.activities||{}).some(value=>value>0))activeDays+=1;
      xp+=Number(row?.xp)||0;
    }
    const end=new Date();end.setHours(12,0,0,0);end.setDate(end.getDate()-weeksAgo*7);
    const start=new Date(end);start.setDate(start.getDate()-6);
    return {
      key:`week-${weeksAgo}`,activeDays,xp,
      label:weeksAgo===0?"Esta semana":`${start.toLocaleDateString("pt-PT",{day:"2-digit",month:"2-digit"})}–${end.toLocaleDateString("pt-PT",{day:"2-digit",month:"2-digit"})}`
    };
  });
  const maxTrendDays=Math.max(1,...studyTrend.map(row=>row.activeDays));

  function sessionReviewSummary(session){
    const results=Array.isArray(session?.results)?session.results:[];
    const answered=results.filter(result=>result?.status&&result.status!=="unanswered").length;
    const final=results.filter(result=>result?.final).length;
    const pending=results.filter(result=>result?.requiresReview||(!result?.final&&result?.status&&result.status!=="unanswered")).length;
    if(!results.length)return "Sessão concluída";
    if(pending)return `${answered}/${results.length} respostas registadas · ${pending} por rever`;
    if(final)return `${final}/${results.length} respostas com correção concluída`;
    return `${answered}/${results.length} respostas registadas`;
  }

  const assessmentRows=[
    ...(s.examHistory||[]).map(row=>({
      id:row.id||`math-${row.at}`,subject:"Matemática A",kind:"Mini-exame",
      at:row.at||0,
      result:Number.isFinite(row.score20)?examScoreLabel(row):"Resultado registado",
      detail:row.reviewRequired?"Há componentes que exigem confirmação da revisão.":`${row.correctCount??"—"}/${row.total??"—"} respostas corretas`
    })),
    ...visibleSubjectIds.filter(id=>id!==DEFAULT_SUBJECT_ID).flatMap(id=>{
      const subject=subjectById(id)?.shortName||subjectById(id)?.name||id;
      return (subjectProgressFor(s,id).sessions||[])
        .filter(row=>["mini_exam","full_exam","practice_exam"].includes(row.kind))
        .map(row=>({
          id:row.sessionId||`${id}-${row.completedAt}`,subject,
          kind:row.kind==="mini_exam"?"Mini-exame":"Exame Completo",
          at:row.completedAt||0,
          result:sessionReviewSummary(row),
          detail:"Mostramos o estado da correção; não inventamos uma nota quando existem respostas abertas ou provisórias."
        }));
    })
  ].sort((a,b)=>b.at-a.at).slice(0,6);

  const studentName=link?.studentName||"Aluno associado";

  return <Shell><Back go={go} to={parentAccess?"welcome":"home"}/><p className="eyebrow">ÁREA DOS PAIS</p>
    <h1>{parentAccess?"Acompanhar o estudo sem transformar progresso em vigilância.":"Partilha o progresso com quem te acompanha."}</h1>

    {!link&&parentAccess&&<>
      <p className="muted">Escolhe como queres começar. A conta do encarregado fica separada da área de estudo do aluno.</p>
      <div className="parentEntryChoices">
        <button className={entryChoice==="link"?"selected":""} onClick={()=>setEntryChoice("link")}>
          <span>🔗</span><b>Associar um aluno</b><small>Para um aluno que já utiliza a APProva+.</small>
        </button>
        <button className={entryChoice==="create"?"selected":""} onClick={()=>setEntryChoice("create")}>
          <span>＋</span><b>Criar perfil do aluno</b><small>Para começar a configuração em conjunto.</small>
        </button>
      </div>

      {entryChoice==="link"&&<div className="parentConnect parentEntryPanel">
        <b>Associar um aluno existente</b>
        <span>Por segurança, não existe pesquisa pública de alunos. A ligação começa através de um convite privado criado pelo aluno.</span>
        <span><b>Como funciona?</b> O aluno envia-te o convite; depois de o aceitares com a tua conta, apenas o progresso autorizado fica disponível aqui.</span>
      </div>}

      {entryChoice==="create"&&<div className="parentConnect parentEntryPanel">
        <b>Criar um perfil acompanhado</b>
        <span>O perfil do aluno será independente da conta do encarregado: disciplinas, diagnósticos e respostas pertencem ao aluno; o encarregado recebe apenas os indicadores de acompanhamento.</span>
        <span>Nesta beta, o fluxo de ligação por convite já está ativo. A criação de subperfis familiares fica preparada como fluxo separado para não misturar identidades nem dados académicos.</span>
      </div>}

      {!entryChoice&&<div className="parentPrivacyHint"><b>O princípio é simples</b><span>O encarregado acompanha consistência, evolução, prioridades e resultados — não abre cada resposta dada pelo aluno.</span></div>}
    </>}

    {!link&&!parentAccess&&<div className="parentConnect">
      <b>Ligar Pai/Mãe ou Encarregado de Educação</b>
      <span>Não existe pesquisa pública de utilizadores. A ligação nasce sempre de um convite privado criado pelo aluno.</span>
      <div><input type="email" placeholder="email do encarregado" value={email} onChange={e=>setEmail(e.target.value)}/><button disabled={!email.trim()} onClick={createInvite}>Criar convite</button></div>
      {(s.parentInvites||[]).filter(x=>x.status==="pending").slice(-3).reverse().map(inv=><div className="pendingInvite" key={inv.id}>
        <div><b>{inv.email}</b><small>Expira em 7 dias · uso único</small></div>
        <button onClick={()=>copyInvite(inv)}>{copied?"Copiado ✓":"Copiar link demo"}</button>
      </div>)}
      <small className="parentFoot">O convite é privado, de utilização única e com validade limitada.</small>
    </div>}

    {link&&parentAccess&&<>
      <div className="parentDashboardHero">
        <div><small>ALUNO ASSOCIADO</small><h2>{studentName}</h2><span>{subjectRows.map(row=>row.meta?.shortName||row.meta?.name).join(" · ")}</span></div>
        <div className="parentWeekBadge"><b>{activeDaysWeek}/7</b><span>dias com estudo esta semana</span></div>
      </div>

      <div className="parentWeeklyGrid">
        <div><small>ESTA SEMANA</small><b>{activeDaysWeek}</b><span>{activeDaysWeek===1?"dia ativo":"dias ativos"}</span></div>
        <div><small>RITMO ATUAL</small><b>🔥 {weekly.streak}</b><span>{weekly.streak===1?"dia em sequência":"dias em sequência"}</span></div>
        <div><small>ATIVIDADE</small><b>{weeklyXp} XP</b><span>nos últimos 7 dias</span></div>
      </div>

      <section className="parentDashboardSection parentTrendSection">
        <div className="parentSectionHead"><div><small>EVOLUÇÃO</small><h3>Regularidade de estudo nas últimas 4 semanas</h3></div><span>dias ativos por semana</span></div>
        <div className="parentTrendChart">{studyTrend.map(row=><div className="parentTrendWeek" key={row.key}>
          <div className="parentTrendBarTrack"><span style={{height:`${Math.max(8,Math.round(row.activeDays/maxTrendDays*100))}%`}}/></div>
          <b>{row.activeDays}/7</b><small>{row.label}</small><em>{row.xp} XP</em>
        </div>)}</div>
        <p className="parentTrendNote">Esta evolução mede consistência de estudo, não “qualidade” do aluno. Uma semana com menos dias pode resultar de férias, escola ou outros fatores que a app não conhece.</p>
      </section>

      <section className="parentDashboardSection">
        <div className="parentSectionHead"><div><small>PREPARAÇÃO PARA OS EXAMES</small><h3>Estado por disciplina</h3></div><span>{subjectRows.length} {subjectRows.length===1?"disciplina":"disciplinas"}</span></div>
        <div className="parentSubjectGrid">{subjectRows.map(row=><div className="parentSubjectCard" key={row.id}>
          <div className="parentSubjectTitle"><span className="subjectIcon">{row.meta?.icon}</span><div><b>{row.meta?.shortName||row.meta?.name}</b><small>Prova {examCodesLabel(row.meta)} · objetivo {row.goal} valores</small></div></div>
          <strong className={row.diagnosticDone?"done":"pending"}>{row.diagnosticDone?"Diagnóstico concluído":"Diagnóstico por concluir"}</strong>
          <div className="parentSubjectMeta"><span>{row.sessions} {row.sessions===1?"sessão registada":"sessões registadas"}</span><span>{row.detail}</span></div>
        </div>)}</div>
      </section>

      <div className="parentInsightGrid">
        <section className="parentDashboardSection">
          <div className="parentSectionHead"><div><small>LEITURA RÁPIDA</small><h3>O que está a correr bem</h3></div></div>
          {strongest?<div className="parentInsight good"><b>{strongest.subject}</b><strong>{strongest.label}</strong><span>É uma das áreas com evidência mais favorável neste momento.</span></div>:<div className="parentEmptyInsight">Ainda não existe evidência suficiente para destacar um ponto forte.</div>}
        </section>
        <section className="parentDashboardSection">
          <div className="parentSectionHead"><div><small>PRIORIDADE</small><h3>Onde vale a pena reforçar</h3></div></div>
          {weakest?<div className="parentInsight focus"><b>{weakest.subject}</b><strong>{weakest.label}</strong><span>É uma das áreas onde os resultados registados justificam mais prática.</span></div>:<div className="parentEmptyInsight">A prioridade aparecerá quando houver respostas suficientes para comparar áreas.</div>}
        </section>
      </div>

      <section className="parentDashboardSection">
        <div className="parentSectionHead"><div><small>AVALIAÇÕES</small><h3>Resultados recentes em contexto de prova</h3></div><span>até 6 registos</span></div>
        {assessmentRows.length?<div className="parentAssessmentList">{assessmentRows.map(row=><div key={row.id}>
          <div><b>{row.subject}</b><span>{row.kind}{row.at?` · ${new Date(row.at).toLocaleDateString("pt-PT")}`:""}</span></div>
          <strong>{row.result}</strong>
          <small>{row.detail}</small>
        </div>)}</div>:<div className="parentEmptyInsight">Ainda não existem Mini-exames ou Exames Completos concluídos para mostrar.</div>}
        <p className="parentTrendNote">Estes resultados servem para acompanhar evolução e hábitos de preparação. Não são uma previsão da classificação no Exame Nacional.</p>
      </section>

      <section className="parentDashboardSection">
        <div className="parentSectionHead"><div><small>PLANO</small><h3>Próximos passos do aluno</h3></div></div>
        <div className="parentPlanList">{subjectRows.map(row=><div key={row.id}><span>{row.meta?.icon}</span><div><b>{row.meta?.shortName||row.meta?.name}</b><small>{row.diagnosticDone?"Continuar o plano adaptativo e cumprir as próximas sessões.":"Concluir primeiro o diagnóstico para a app poder personalizar o estudo."}</small></div><strong>{row.diagnosticDone?"Em curso":"Pendente"}</strong></div>)}</div>
      </section>

      <div className="parentPrivacyNotice"><b>🔒 O que o encarregado vê — e o que não vê</b><span>Vê consistência, evolução, prioridades, objetivos e resultados agregados. Não vê cada resposta individual nem transforma o histórico de estudo numa lista de erros para fiscalização.</span></div>

      {!link.removal&&<button className="secondary" onClick={requestRemoval}>Pedir remoção da ligação</button>}
      {link.removal?.status==="awaiting_other_party"&&<div className="notice warning"><b>Remoção pendente de confirmação</b><span>A ligação mantém-se ativa até a outra parte confirmar.</span>{link.removal.requestedBy!=="parent"&&<button className="secondary" onClick={confirmRemoval}>Confirmar remoção</button>}</div>}
    </>}

    {link&&!parentAccess&&<>
      <div className="parent"><div><b>{link.parentName||"Pai/Mãe ligado"}</b><span>{link.parentEmail||link.email} · acesso de acompanhamento</span></div><strong>{index??"—"}<small>/100*</small></strong></div>
      <small className="parentFoot">* índice parcial enquanto o perfil académico está a ser construído</small>
      <div className="notice"><b>O que partilhas?</b><span>Consistência, evolução, prioridades, tempo de estudo e resultados agregados — não cada resposta individual.</span></div>
      {!link.removal&&<button className="secondary" onClick={requestRemoval}>Pedir remoção da ligação</button>}
      {link.removal?.status==="awaiting_other_party"&&<div className="notice warning"><b>Remoção pendente de confirmação</b><span>A ligação mantém-se ativa até a outra parte confirmar.</span>{link.removal.requestedBy!=="student"&&<button className="secondary" onClick={confirmRemoval}>Confirmar remoção</button>}</div>}
    </>}
  </Shell>
}
