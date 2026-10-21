"use client";
import {useState} from "react";
import {Shell,StudentNav,StudentTop} from "./chrome";
import {AVAILABLE_SUBJECT_IDS,SECONDARY_EXAM_SUBJECTS} from "../data/subjects";
import {
  competitionSummary,latestCompetitiveActivity,demoLeaderboard,leaderboardAroundUser,leagueProjection,
  updateCompetitionProfile,scopeAvailability,PORTUGAL_REGIONS,DIVISIONS,PROMOTION_COUNT,DEMOTION_COUNT,
  SCHOOL_MIN_PARTICIPANTS,DISTRICT_MIN_PARTICIPANTS
} from "../lib/competition";
import {schoolsForRegion} from "../data/secondarySchools";

const DEFAULT_SUBJECT_ID="math-a";
const RANKING_SUBJECT_IDS=["math-a","portuguese","physics-chemistry-a"].filter(id=>AVAILABLE_SUBJECT_IDS.includes(id));
function subjectById(id){return SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===id)||SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===DEFAULT_SUBJECT_ID);}

export default function Ranking({s,setS,go}){
  const globalSummary=competitionSummary(s);
  const projection=leagueProjection(s);
  const profile=globalSummary.profile||{};
  const [subjectFilter,setSubjectFilter]=useState("all");
  const [scope,setScope]=useState("league");
  const subjectId=subjectFilter==="all"?null:subjectFilter;
  const summary=competitionSummary(s,Date.now(),{subjectId});
  const subjectMeta=subjectId?subjectById(subjectId):null;
  const subjectLabel=subjectMeta?.shortName||subjectMeta?.name||"Todas";
  const [nickname,setNickname]=useState(profile.nickname||"");
  const [region,setRegion]=useState(profile.region||"");
  const initialSchool=schoolsForRegion(profile.region||"").find(row=>row.id===profile.schoolId||row.name===profile.school);
  const [schoolId,setSchoolId]=useState(profile.schoolId||initialSchool?.id||"");
  const [schoolYear,setSchoolYear]=useState(s.profile?.schoolYear||"");
  const [municipality,setMunicipality]=useState(initialSchool?.municipality||"");
  const regionSchoolOptions=schoolsForRegion(region);
  const municipalityOptions=[...new Set(regionSchoolOptions.map(row=>row.municipality))].sort((a,b)=>a.localeCompare(b,"pt"));
  const schoolOptions=municipality?regionSchoolOptions.filter(row=>row.municipality===municipality):[];
  const selectedSchool=schoolOptions.find(row=>row.id===schoolId)||null;
  const [districtOptIn,setDistrictOptIn]=useState(!!profile.districtOptIn);
  const [schoolOptIn,setSchoolOptIn]=useState(!!profile.schoolOptIn);
  const availability=scopeAvailability(s,scope);
  const allRows=availability.available?demoLeaderboard(s,{scope,subjectId}):[];
  const rows=scope==="league"?allRows:leaderboardAroundUser(allRows,3);
  const self=allRows.find(x=>x.self);
  const latest=latestCompetitiveActivity(s,Date.now(),subjectId);
  const latestGain=latest?.rankedXp>0?latest:null;
  const divisionMode=scope==="league"&&!subjectId;

  const scopeLabel={
    league:`Divisão ${globalSummary.division.label}`,
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
      school:selectedSchool?.name||null,
      schoolId:selectedSchool?.id||null,
      districtOptIn,
      schoolOptIn:Boolean(selectedSchool&&schoolOptIn)
    }));
  }

  return <Shell><StudentTop s={s} go={go}/>
    <div className="rankingHero">
      <div><p className="eyebrow">🏆 COMPETIÇÃO SEMANAL</p><h1>Treina. Ganha XP. Sobe.</h1>
        <p className="muted">O ranking compara <b>atividade de estudo</b>, nunca Domínio, Certeza, Índice de Preparação ou notas.</p></div>
      <div className="divisionBadge"><span>{globalSummary.division.icon}</span><b>{globalSummary.division.label}</b><small>{globalSummary.weekXp} XP total esta semana</small>{subjectId&&<small>{summary.weekXp} XP · {subjectLabel}</small>}</div>
    </div>

    <details className="demoRankingDisclosure"><summary>Modo de demonstração · participantes simulados ⓘ</summary><p>Os restantes participantes são simulados nesta fase e não representam outros alunos reais.</p></details>

    <section aria-label="Filtrar ranking por disciplina">
      <small className="eyebrow">DISCIPLINA</small>
      <label className="rankingSubjectSelectLabel" htmlFor="rankingSubjectFilter">Escolher disciplina</label>
      <select id="rankingSubjectFilter" className="rankingSubjectSelect" value={subjectFilter} onChange={event=>setSubjectFilter(event.target.value)}>
        <option value="all">Todas as disciplinas</option>
        {RANKING_SUBJECT_IDS.map(id=>{const subject=subjectById(id);return <option key={id} value={id}>{subject.name}</option>})}
      </select>
      <p className="muted">{subjectId
        ?`Estás a comparar apenas o XP ganho em ${subjectLabel}. A tua divisão continua a ser decidida pelo XP total em “Todas”.`
        :"“Todas” soma o XP das tuas disciplinas. Usa os filtros para comparar a tua atividade numa disciplina específica."}</p>
    </section>

    <div className="rankingTabs" aria-label="Âmbito do ranking">
      {[["league","Divisão"],["general","Geral"],["year","Ano"],["district","Distrito"],["school","Escola"]].map(([id,label])=>
        <button key={id} className={scope===id?"sel":""} onClick={()=>setScope(id)}>{label}</button>
      )}
    </div>

    {scope==="league"&&<section className="leagueStatus">
      <div><small>DIVISÃO ATUAL · XP TOTAL</small><h3>{globalSummary.division.icon} {globalSummary.division.label}</h3><p>{projection?.message}</p>{subjectId&&<small>O filtro {subjectLabel} não altera a zona de subida ou descida.</small>}</div>
      <div><b>#{projection?.position||"—"}</b><span>de 20</span></div>
      <footer><span>↑ Top {PROMOTION_COUNT} sobem</span><span>↓ Últimos {DEMOTION_COUNT} descem</span><span>Termina em ~{globalSummary.daysRemaining} d</span></footer>
    </section>}

    {!availability.available?<div className="rankingLocked">
      <b>{scope==="district"?"Ranking de distrito/região indisponível":"Ranking de escola indisponível"}</b>
      <span>{availability.reason}</span>
      <small>{scope==="school"
        ?`No ranking real, só abriremos uma tabela de escola com pelo menos ${SCHOOL_MIN_PARTICIPANTS} participantes elegíveis, para reduzir risco de identificação.`
        :`No ranking real, o distrito/região terá um limiar mínimo de ${DISTRICT_MIN_PARTICIPANTS} participantes.`}</small>
    </div>:<section className="leaderboard">
      <div className="leaderboardHead"><div><small>RANKING SEMANAL · {scopeLabel?.toUpperCase()} · {subjectId?subjectLabel.toUpperCase():"TODAS"}</small><h3>{scope==="league"?(subjectId?`A tua liga · ${subjectLabel}`:"A tua liga"):scopeLabel}</h3></div><span>{self?`Tu: #${self.position}`:"—"}</span></div>
      <div className="leaderboardRows">{rows.map(row=>{
        const promote=divisionMode&&row.position<=PROMOTION_COUNT;
        const demote=divisionMode&&row.position>allRows.length-DEMOTION_COUNT;
        return <div key={row.id} className={(row.self?"self ":"")+(promote?"promote ":demote?"demote ":"")}>
          <b className="rankPos">{row.position}</b>
          <span className="rankAvatar">{row.self?"🙂":row.position===1?"🥇":row.position===2?"🥈":row.position===3?"🥉":"●"}</span>
          <div><strong>{row.nickname}{row.self?" · TU":""}</strong><small>{row.demo?"participante simulado":"o teu perfil"}</small></div>
          <em>{row.xp} XP</em>
        </div>;
      })}</div>
      {subjectId&&<small className="aroundYouNote">Esta classificação por disciplina é comparativa. As promoções e descidas da tua divisão usam sempre o XP total da semana.</small>}
      {scope!=="league"&&<small className="aroundYouNote">Em rankings grandes mostramos a tua posição e os participantes mais próximos.</small>}
    </section>}

    <section className="xpRules">
      <div><small>{subjectId?`XP COMPETITIVO · ${subjectLabel.toUpperCase()}`:"COMO GANHAS XP COMPETITIVO"}</small><h3>{subjectId?`O que conta em ${subjectLabel}.`:"Mais estudo útil, menos repetição."}</h3></div>
      <div className="xpRuleGrid">
        <div><b>🎯 +50</b><span>Missão diária</span><small>Uma única Missão por dia. O XP fica associado à disciplina dessa Missão.</small></div>
        <div><b>🧠 até +40</b><span>Treino Livre</span><small>Repetir sempre o mesmo foco reduz progressivamente o XP competitivo.</small></div>
        <div><b>📝 até +80</b><span>Mini-exame</span><small>XP pela atividade concluída, não pela nota.</small></div>
        <div><b>⏱️ até +120</b><span>Exame Completo</span><small>Depende da parte da prova respondida, nunca da nota. Uma recompensa por disciplina/dia.</small></div>
        {!subjectId&&<div><b>🧭 +30</b><span>1.º Diagnóstico</span><small>Bónus inicial global: conta uma vez em “Todas” e não entra nos filtros por disciplina.</small></div>}
      </div>
      {subjectId&&<p className="muted">O bónus único do 1.º Diagnóstico pertence apenas ao ranking “Todas”, por isso não aparece nesta lista.</p>}
      {latestGain&&<div className="lastRankXp"><b>Último ganho{subjectId?` em ${subjectLabel}`:""}: +{latestGain.rankedXp} XP</b><span>{latestGain.reason}</span></div>}
      <p className="muted">O teu <b>XP total</b> continua acumulado para sempre. O <b>XP competitivo</b> reinicia semanalmente para que um aluno novo possa competir desde a primeira semana.</p>
    </section>

    <section className="divisionLadder">
      <small>DIVISÕES</small>
      <div>{DIVISIONS.map(d=><div key={d.id} className={d.id===globalSummary.division.id?"current":""}><span>{d.icon}</span><b>{d.label}</b></div>)}</div>
      <p>Cada liga junta um pequeno grupo de até 20 alunos. No fim da semana, os primeiros sobem e os últimos podem descer. A divisão usa sempre o XP total, mesmo quando consultas um filtro por disciplina.</p>
    </section>

    <section className="rankingProfile">
      <div><small>PERFIL PÚBLICO DO RANKING</small><h3>Nickname, nunca nota.</h3>
        <p>O ano já faz parte do teu perfil académico. Para entrares no ranking da escola, indica o ano, a escola e ativa a participação. O nome da escola serve apenas para agrupar resultados e nunca aparece publicamente.</p></div>
      <label>Nickname<input maxLength="24" value={nickname} onChange={e=>setNickname(e.target.value)} placeholder="Ex.: Sigma17"/></label>
      <label>Distrito/Região<select value={region} onChange={e=>{const next=e.target.value;setRegion(next);setMunicipality("");setSchoolId("")}}><option value="">Não indicar</option>{PORTUGAL_REGIONS.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
      <label>Ano para o ranking<select value={schoolYear} onChange={e=>setSchoolYear(e.target.value)}><option value="">Selecionar ano</option><option value="10.º">10.º ano</option><option value="11.º">11.º ano</option><option value="12.º">12.º ano</option><option value="Já terminei o secundário">Já terminei o secundário</option></select></label>
      <label>Município<select value={municipality} disabled={!region} onChange={e=>{setMunicipality(e.target.value);setSchoolId("")}}><option value="">{region?"Selecionar município":"Escolhe primeiro o distrito/região"}</option>{municipalityOptions.map(name=><option key={name} value={name}>{name}</option>)}</select></label>
      <label>Escola<select value={schoolId} disabled={!municipality} onChange={e=>setSchoolId(e.target.value)}><option value="">{municipality?"Não indicar":"Escolhe primeiro o município"}</option>{schoolOptions.map(row=><option key={row.id} value={row.id}>{row.name}</option>)}</select></label>
      <label className="rankConsent"><input type="checkbox" checked={districtOptIn} onChange={e=>setDistrictOptIn(e.target.checked)}/><span>Participar no ranking do meu distrito/região.</span></label>
      <label className="rankConsent"><input type="checkbox" checked={schoolOptIn} onChange={e=>setSchoolOptIn(e.target.checked)}/><span>Participar no ranking da minha escola.</span></label>
      <button className="primary" onClick={saveProfile}>Guardar perfil de ranking</button>
      <small className="privacyRankNote">Nunca entram no ranking: Domínio, Certeza, Índice de Preparação, nota objetivo, resultados de exame ou número de erros.</small>
    </section>
    <StudentNav active="ranking" go={go}/>
  </Shell>;
}