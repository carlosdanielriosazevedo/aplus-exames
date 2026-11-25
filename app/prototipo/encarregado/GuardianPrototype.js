"use client";
import {useMemo,useState} from "react";
import {StudentGuardianLink,GuardianInviteAccept,GuardianDashboard,WeeklyEmailPreview} from "../../components/guardian/GuardianScreens";
import {guardianFixtures} from "../../components/guardian/guardianFixtures";
import {guardianChildModel,weeklyEmailHtml,weeklyEmailModel} from "../../lib/guardianDashboard";

const TABS=[["student","1 · Aluno convida"],["accept","2 · Encarregado aceita"],["dashboard","3 · Painel"],["email","4 · Email semanal"]];
const STUDENT_STATES=[["none","Sem ligação"],["pending","Convite enviado"],["linked","Ligados"],["removal_student","Aluno pede para terminar"],["removal_guardian","Encarregado pede para terminar"]];

export default function GuardianPrototype(){
  const [tab,setTab]=useState(()=>typeof window!=="undefined"&&new URLSearchParams(window.location.search).get("ecra")||"dashboard");
  const [studentState,setStudentState]=useState("none");
  const [twoChildren,setTwoChildren]=useState(true);
  const [childId,setChildId]=useState("rui");
  const models=useMemo(()=>guardianFixtures().map(child=>guardianChildModel(child)),[]);
  const shown=twoChildren?models:models.slice(0,1);
  const emailModel=models.find(row=>row.id===childId)||models[0];
  const email=weeklyEmailModel(emailModel);
  const bar={position:"sticky",top:0,zIndex:5,background:"#102b42",color:"#fff",padding:"10px 12px",display:"grid",gap:8};
  const chip=on=>({border:0,borderRadius:999,padding:"7px 11px",fontSize:13,fontWeight:800,cursor:"pointer",background:on?"#ffb224":"rgba(255,255,255,.12)",color:on?"#102b42":"#fff"});
  return <main style={{background:"#f5f7f8",minHeight:"100vh"}}>
    <div style={bar}>
      <b style={{fontSize:13}}>Protótipo · área do encarregado de educação · dados de exemplo</b>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{TABS.map(([id,label])=><button key={id} style={chip(tab===id)} onClick={()=>setTab(id)}>{label}</button>)}</div>
      {tab==="student"&&<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{STUDENT_STATES.map(([id,label])=><button key={id} style={chip(studentState===id)} onClick={()=>setStudentState(id)}>{label}</button>)}</div>}
      {tab==="dashboard"&&<div style={{display:"flex",gap:6}}><button style={chip(!twoChildren)} onClick={()=>{setTwoChildren(false);setChildId("rui")}}>1 educando</button><button style={chip(twoChildren)} onClick={()=>setTwoChildren(true)}>2 educandos</button></div>}
      {tab==="email"&&<div style={{display:"flex",gap:6}}>{models.map(row=><button key={row.id} style={chip(childId===row.id)} onClick={()=>setChildId(row.id)}>Resumo de {row.firstName}</button>)}</div>}
    </div>
    {tab==="student"&&<StudentGuardianLink state={studentState} onState={setStudentState}/>}
    {tab==="accept"&&<GuardianInviteAccept studentName="Rui"/>}
    {tab==="dashboard"&&<GuardianDashboard models={shown} activeId={childId} onSelect={setChildId}/>}
    {tab==="email"&&<WeeklyEmailPreview subject={email.subject} preheader={email.preheader} html={weeklyEmailHtml(emailModel,{baseUrl:typeof window!=="undefined"?window.location.origin:"https://approvamais.pt"})}/>}
  </main>;
}
