"use client";
import {useEffect,useMemo,useState} from "react";
import {BANK} from "./bank";

const DEFAULT={
 "PROB-04":{domain:62,conf:44,last:0,errors:0},
 "PROB-05":{domain:58,conf:43,last:0,errors:0},
 "ALG-01":{domain:76,conf:60,last:0,errors:0},
 "REP-01":{domain:73,conf:50,last:0,errors:0},
 "CONT-02":{domain:70,conf:55,last:0,errors:0},
 "CONT-03":{domain:68,conf:52,last:0,errors:0}
};
const DAY=86400000;

function priority(id,s,goal){
  const meta=BANK[id];
  const weakness=(100-s.domain)/100;
  const uncertainty=(100-s.conf)/100;
  const stale=s.last?Math.min(1,(Date.now()-s.last)/(DAY*14)):1;
  const blocker=Object.values(BANK).filter(x=>(x.prereqs||[]).includes(id)).length*0.08;
  const goalBoost=goal>=18?0.08:goal>=16?0.04:0;
  return weakness*.45+uncertainty*.22+stale*.10+(meta.weight||1)*.13+blocker+goalBoost;
}
function plan(scores,goal){
  return Object.keys(scores).map(id=>({id,p:priority(id,scores[id],goal)})).sort((a,b)=>b.p-a.p);
}
function desiredD(s,goal){
  if(s.domain<55)return 1;
  if(s.domain<75)return 2;
  return goal>=18?3:2;
}
function pickQ(id,scores,seen,goal){
  const pool=BANK[id].questions.filter(q=>!seen.includes(q.id));
  const source=pool.length?pool:BANK[id].questions;
  const d=desiredD(scores[id],goal);
  return [...source].sort((a,b)=>Math.abs(a.d-d)-Math.abs(b.d-d))[0];
}
function stopRule(ev){
  if(ev.length<3)return false;
  const c=ev.filter(x=>x.correct).length;
  const sig=new Set(ev.map(x=>x.sig)).size;
  if(c===ev.length&&sig>=3)return true;
  if(c<=1&&sig>=2)return true;
  if(ev.length>=5)return true;
  return false;
}

export default function Page(){
 const [scores,setScores]=useState(DEFAULT),[goal,setGoal]=useState(17),[view,setView]=useState("home");
 const [mission,setMission]=useState(null),[current,setCurrent]=useState(null),[selected,setSelected]=useState(null),[feedback,setFeedback]=useState(null);
 const [seen,setSeen]=useState([]),[ev,setEv]=useState([]),[route,setRoute]=useState([]),[result,setResult]=useState(null);

 useEffect(()=>{try{const x=JSON.parse(localStorage.getItem("aplus-v10")||"null");if(x?.scores)setScores(x.scores);if(x?.goal)setGoal(x.goal)}catch{}},[]);
 useEffect(()=>{try{localStorage.setItem("aplus-v10",JSON.stringify({scores,goal}))}catch{}},[scores,goal]);

 const ranked=useMemo(()=>plan(scores,goal),[scores,goal]);
 const top=ranked[0]?.id;
 const estimated=goal>=18?15:goal>=16?12:10;

 function startMission(){
   const target=top;
   const q=pickQ(target,scores,[],goal);
   setMission({target,reason:reasonFor(target),minutes:estimated});
   setRoute([target]);setSeen([]);setEv([]);setCurrent(q);setSelected(null);setFeedback(null);setView("mission");
 }
 function reasonFor(id){
   const s=scores[id], meta=BANK[id];
   const blocks=Object.entries(BANK).filter(([_,x])=>(x.prereqs||[]).includes(id)).map(([_,x])=>x.name);
   if(s.domain<60)return `${meta.name} é atualmente uma das tuas maiores oportunidades de evolução.`;
   if(s.conf<50)return `A A+ tem pouca confiança na estimativa de ${meta.name.toLowerCase()} e quer recolher evidência recente.`;
   if(blocks.length)return `${meta.name} é pré-requisito para competências posteriores e vale a pena consolidá-la agora.`;
   return `Está na altura de rever ${meta.name.toLowerCase()} para manter o domínio recente.`;
 }
 function answer(i){
   if(feedback)return;
   const ok=i===current.a;
   setSelected(i);
   setFeedback({ok,text:ok?current.sol:`A A+ detetou uma hipótese: a dificuldade pode estar em ${BANK[mission.target].name.toLowerCase()} ou num dos seus pré-requisitos.`});
 }
 function next(){
   const ok=selected===current.a;
   const item={id:current.id,micro:route[route.length-1],correct:ok,sig:current.sig,d:current.d};
   let nev=[...ev,item],nseen=[...seen,current.id],active=route[route.length-1];

   if(!ok && active===mission.target){
      const prereq=(BANK[active].prereqs||[]).find(p=>!route.includes(p));
      if(prereq){
        const q=pickQ(prereq,scores,nseen,goal);
        setEv(nev);setSeen(nseen);setRoute([...route,prereq]);setCurrent(q);setSelected(null);setFeedback(null);return;
      }
   }
   if(active!==mission.target){
      if(!ok){
        return finishPrereq(active,nev);
      }else{
        const q=pickQ(mission.target,scores,nseen,goal);
        setEv(nev);setSeen(nseen);setRoute([...route,mission.target]);setCurrent(q);setSelected(null);setFeedback(null);return;
      }
   }
   const targetEv=nev.filter(x=>x.micro===mission.target);
   if(stopRule(targetEv))return finishTarget(targetEv,nev);

   const q=pickQ(mission.target,scores,nseen,goal);
   setEv(nev);setSeen(nseen);setCurrent(q);setSelected(null);setFeedback(null);
 }
 function finishPrereq(prereq,all){
   const old=scores[prereq], ns={...scores,[prereq]:{...old,domain:Math.max(0,old.domain-5),conf:Math.min(96,old.conf+12),last:Date.now(),errors:old.errors+1}};
   setScores(ns);
   setResult({type:"prereq",changed:prereq,old,new:ns[prereq],all,next:`A próxima Missão vai consolidar ${BANK[prereq].name.toLowerCase()} antes de regressar a ${BANK[mission.target].name.toLowerCase()}.`});
   setView("result");
 }
 function finishTarget(targetEv,all){
   const old=scores[mission.target], correct=targetEv.filter(x=>x.correct).length,ratio=correct/targetEv.length;
   let delta=ratio>=.8?5:ratio<=.4?-6:1;
   const newConf=Math.min(96,old.conf+targetEv.length*5+new Set(targetEv.map(x=>x.sig)).size*3-(ratio>.4&&ratio<.8?6:0));
   const ns={...scores,[mission.target]:{...old,domain:Math.max(0,Math.min(100,old.domain+delta)),conf:newConf,last:Date.now(),errors:old.errors+(delta<0?1:0)}};
   setScores(ns);
   setResult({type:"target",changed:mission.target,old,new:ns[mission.target],all,next:`Amanhã a A+ volta a calcular a prioridade com base neste resultado e no resto do teu perfil.`});
   setView("result");
 }
 function reset(){setScores(DEFAULT);try{localStorage.removeItem("aplus-v10")}catch{}}
 if(view==="mission")return <Mission mission={mission} current={current} selected={selected} feedback={feedback} answer={answer} next={next} route={route} ev={ev}/>;
 if(view==="result")return <Result result={result} scores={scores} home={()=>setView("home")}/>;
 return <Home goal={goal} setGoal={setGoal} scores={scores} ranked={ranked} top={top} minutes={estimated} start={startMission} reset={reset}/>;
}
function Logo(){return <div className="logo">A<span>+</span> EXAMES</div>}
function Home({goal,setGoal,scores,ranked,top,minutes,start,reset}){return <main className="dark"><section className="wrap">
<header><div><Logo/><small>MISSÃO DE HOJE · v1.0</small></div><div className="goal">Objetivo <select value={goal} onChange={e=>setGoal(+e.target.value)}><option>12</option><option>14</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option></select> valores</div></header>
<div className="intro"><p>O TEU PLANO DE HOJE</p><h1>A A+ já decidiu onde vale mais a pena investir <em>{minutes} minutos.</em></h1><span>Não escolhe simplesmente a pior percentagem: considera domínio, confiança, recência, pré-requisitos e o teu objetivo.</span></div>
<section className="missionCard"><div><small>🎯 MISSÃO RECOMENDADA</small><h2>{BANK[top].name}</h2><p>{scores[top].domain<60?`${BANK[top].name} é uma das tuas maiores oportunidades de evolução.`:`A A+ quer consolidar esta competência com evidência recente e diversificada.`}</p><div className="chips"><span>~{minutes} min</span><span>Duração adaptativa</span><span>Domínio {scores[top].domain}</span><span>Confiança {scores[top].conf}%</span></div></div><button onClick={start}>Começar missão →</button></section>
<div className="grid"><section className="card"><h3>Porque esta prioridade?</h3>{ranked.slice(0,4).map((x,i)=><div className="priority" key={x.id}><b>{i+1}</b><div><strong>{BANK[x.id].name}</strong><small>Domínio {scores[x.id].domain} · Confiança {scores[x.id].conf}%</small></div><em>{Math.round(x.p*100)}</em></div>)}</section>
<section className="card"><h3>Memória pedagógica</h3><p>A A+ guarda quando cada competência foi avaliada, a confiança atual e erros recorrentes. Uma competência antiga pode voltar ao plano mesmo sem ter o pior score.</p><div className="memory">{Object.entries(scores).slice(0,4).map(([id,s])=><span key={id}><b>{BANK[id].name}</b>{s.last?` avaliada recentemente`:` ainda sem evidência recente`}</span>)}</div></section></div>
<button className="reset" onClick={reset}>Repor dados do protótipo</button>
</section></main>}
function Mission({mission,current,selected,feedback,answer,next,route,ev}){const active=route[route.length-1];const detour=active!==mission.target;return <main className="light"><section className="panel">
<header><Logo/><span>Missão · {ev.length+1} evidências</span></header>
<div className={detour?"route detour":"route"}><b>{detour?"A Missão mudou de rumo":"Porque estás a responder a isto?"}</b><span>{detour?`A resposta anterior levantou uma dúvida em ${BANK[active].name.toLowerCase()}. Vamos confirmar o pré-requisito antes de continuar.`:`Esta questão recolhe evidência sobre ${BANK[mission.target].name.toLowerCase()}.`}</span></div>
<p className="eyebrow">{BANK[active].parent.toUpperCase()} · D{current.d}</p><h1>{current.q}</h1>
<div className="opts">{current.o.map((x,i)=>{let c="opt";if(selected===i)c+=" sel";if(feedback&&i===current.a)c+=" correct";if(feedback&&selected===i&&i!==current.a)c+=" wrong";return <button key={i} className={c} onClick={()=>answer(i)}><span>{String.fromCharCode(65+i)}</span>{x}</button>})}</div>
{feedback&&<div className={feedback.ok?"feedback good":"feedback bad"}><b>{feedback.ok?"✓ Correto":"A A+ detetou uma hipótese."}</b><span>{feedback.text}</span><button>Ver resolução passo a passo</button></div>}
<div className="foot">A Missão termina quando houver evidência suficiente ou quando atingir o limite de duração.</div>
<button className="primary" disabled={!feedback} onClick={next}>Continuar</button>
</section></main>}
function Result({result,scores,home}){const id=result.changed,delta=result.new.domain-result.old.domain,cd=result.new.conf-result.old.conf;return <main className="light"><section className="panel result"><Logo/><div className="check">✓</div><p className="eyebrow">MISSÃO CONCLUÍDA</p><h1>{result.type==="prereq"?"Encontrámos o bloqueio real.":"A tua preparação foi atualizada."}</h1>
<div className="change"><div><b>{BANK[id].name}</b><small>{BANK[id].parent}</small></div><span>{result.old.domain}</span><i>→</i><strong>{result.new.domain}</strong><em className={delta>=0?"up":"down"}>{delta>=0?"+":""}{delta}</em></div>
<div className="conf"><span>Confiança</span><b>{result.old.conf}% → {result.new.conf}%</b><em className={cd>=0?"up":"down"}>{cd>=0?"+":""}{cd}%</em></div>
<div className="why"><b>Porque tomou a A+ esta decisão?</b><span>{result.type==="prereq"?"A dificuldade foi confirmada num pré-requisito. Por isso, a competência principal não foi penalizada diretamente.":"A atualização resulta de várias evidências desta Missão, não de uma única resposta."}</span></div>
<div className="next"><b>O que acontece a seguir?</b><span>{result.next}</span></div><button className="primary" onClick={home}>Voltar ao plano</button></section></main>}
