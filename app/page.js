"use client";
import {useMemo,useState} from "react";

const skills={
 "Funções":["Domínio e limites","Assíntotas","Transformações"],
 "Derivadas":["Regras de derivação","Monotonia","Otimização"],
 "Probabilidades":["Combinatória","Probabilidade condicionada","Independência"],
 "Geometria":["Vetores","Geometria analítica","Retas e planos"],
 "Complexos":["Forma algébrica","Módulo e argumento","Operações"],
 "Álgebra":["Equações","Inequações","Manipulação algébrica"]
};
const levels=[
 ["auto","✨","Adaptado ao meu nível","A A+ escolhe a dificuldade."],
 ["base","🟢","Básico","Consolidar fundamentos."],
 ["mid","🔵","Intermédio","Aplicação corrente."],
 ["adv","🟣","Avançado","Problemas exigentes."],
 ["challenge","🔥","Desafio","Dificuldade elevada."]
];

export default function Page(){
 const [view,setView]=useState("home");
 const [topic,setTopic]=useState("");
 const [sub,setSub]=useState("");
 const [level,setLevel]=useState("auto");
 const [scores,setScores]=useState({Funções:74,Derivadas:68,Probabilidades:54,Geometria:71,Complexos:79,Álgebra:76});
 const [xp,setXp]=useState(1240),[streak,setStreak]=useState(12);
 const prep=useMemo(()=>Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/6),[scores]);

 function finishMission(){
   const before={...scores}, after={...scores};
   after.Probabilidades=61; after.Funções=76; after.Geometria=69;
   setScores(after); setXp(xp+110); setStreak(streak+1);
   setView("missionResult");
 }
 if(view==="train") return <Train topic={topic} setTopic={setTopic} sub={sub} setSub={setSub} level={level} setLevel={setLevel} back={()=>setView("home")} start={()=>setView("training")}/>;
 if(view==="training") return <Training topic={topic} sub={sub} level={level} done={()=>setView("trainingResult")}/>;
 if(view==="trainingResult") return <TrainingResult topic={topic} sub={sub} home={()=>setView("home")} again={()=>setView("train")}/>;
 if(view==="missionResult") return <MissionResult scores={scores} home={()=>setView("home")}/>;
 return <Home prep={prep} scores={scores} xp={xp} streak={streak} mission={finishMission} train={()=>setView("train")}/>;
}

function Logo(){return <div className="logo">A<span>+</span> EXAMES</div>}
function Home({prep,scores,xp,streak,mission,train}){
 return <main className="dark"><section className="dash">
  <header><div><Logo/><small>MATEMÁTICA A · 635</small></div><div className="stats">🔥 {streak} dias　 <b>{xp} XP</b></div></header>
  <div className="hello"><div><p>Boa noite 👋</p><h1>O que vamos conquistar hoje?</h1></div><div className="prep"><small>ÍNDICE DE PREPARAÇÃO</small><strong>{prep}<i>/100</i></strong></div></div>
  <section className="mission"><div><span>🎯 MISSÃO RECOMENDADA</span><h2>Probabilidade condicionada</h2><p>A A+ escolheu este foco porque é atualmente a tua maior oportunidade de evolução.</p><small>12 min · +110 XP · Avalia o teu nível</small></div><button onClick={mission}>Começar missão →</button></section>
  <div className="actions">
   <button onClick={train}><b>🧠 Treinar</b><span>Tu escolhes matéria, submatéria e dificuldade.</span><i>→</i></button>
   <button><b>📝 Exames</b><span>Resolve provas e mede a preparação em contexto real.</span><i>→</i></button>
  </div>
  <div className="cols"><section className="card"><div className="title"><h3>Prioridades</h3><span>atualizadas pelas Missões e Exames</span></div>
   {Object.entries(scores).sort((a,b)=>a[1]-b[1]).slice(0,4).map(([k,v])=><div className="row" key={k}><b>{k}</b><div className="bar"><i style={{width:v+"%"}}/></div><strong>{v}</strong></div>)}
  </section><section className="card"><div className="title"><h3>Próximos dias</h3><span>o plano pode mudar</span></div>
   {["Hoje · Probabilidade condicionada","Amanhã · Aplicação de probabilidades","Dia 3 · Funções + revisão","Dia 4 · Geometria analítica"].map((x,i)=><div className="day" key={x}><b>{i===0?"●":"○"}</b>{x}</div>)}
  </section></div>
 </section></main>
}
function Train({topic,setTopic,sub,setSub,level,setLevel,back,start}){
 return <main className="light"><section className="panel">
  <header><button className="back" onClick={back}>←</button><Logo/><span className="mode">MODO LIVRE</span></header>
  <p className="eyebrow">TREINAR</p><h1>O que queres praticar?</h1>
  <p className="note">O treino livre ajuda-te a aprender e gera sinais para a A+, mas <b>não altera diretamente o teu Índice de Preparação.</b></p>
  <h3>1. Matéria</h3><div className="grid">{Object.keys(skills).map(x=><button className={topic===x?"pick sel":"pick"} onClick={()=>{setTopic(x);setSub("")}} key={x}>{x}</button>)}</div>
  {topic&&<><h3>2. Submatéria</h3><div className="chips"><button className={sub==="Tudo"?"chip sel":"chip"} onClick={()=>setSub("Tudo")}>Treinar tudo</button>{skills[topic].map(x=><button className={sub===x?"chip sel":"chip"} onClick={()=>setSub(x)} key={x}>{x}</button>)}</div></>}
  {sub&&<><h3>3. Nível</h3><div className="levels">{levels.map(l=><button className={level===l[0]?"level sel":"level"} onClick={()=>setLevel(l[0])} key={l[0]}><span>{l[1]}</span><div><b>{l[2]}</b><small>{l[3]}</small></div></button>)}</div></>}
  <button className="primary" disabled={!topic||!sub} onClick={start}>Começar treino</button>
 </section></main>
}
function Training({topic,sub,level,done}){
 const name=levels.find(x=>x[0]===level)?.[2];
 return <main className="light"><section className="panel center">
  <Logo/><p className="eyebrow">{topic} · {name}</p><h1>{sub}</h1>
  <div className="info">🧠 <div><b>Treino livre</b><span>O resultado desta sessão não mexe diretamente na tua avaliação.</span></div></div>
  <div className="question"><small>QUESTÃO 1 DE 10</small><h2>O banco de treino fica aqui.</h2><p>Esta v0.4 demonstra a arquitetura. As questões parametrizadas e validadas entram na evolução seguinte.</p></div>
  <button className="primary" onClick={done}>Simular conclusão</button>
 </section></main>
}
function TrainingResult({topic,sub,home,again}){
 return <main className="light"><section className="panel center"><Logo/><div className="big">🧠</div><p className="eyebrow">TREINO CONCLUÍDO</p><h1>Boa sessão de {topic}.</h1>
  <div className="three"><div><b>8/10</b><span>corretas</span></div><div><b>+80</b><span>XP</span></div><div><b>{sub}</b><span>foco</span></div></div>
  <div className="signal"><b>Possível evolução detetada ↑</b><span>A tua avaliação não mudou. A A+ poderá confirmar este progresso numa próxima Missão ou Exame.</span></div>
  <button className="primary" onClick={home}>Voltar ao plano</button><button className="secondary" onClick={again}>Treinar outra matéria</button>
 </section></main>
}
function MissionResult({scores,home}){
 const changes=[["Probabilidades",54,61],["Funções",74,76],["Geometria",71,69]];
 const prep=Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/6);
 return <main className="light"><section className="panel center"><Logo/><div className="check">✓</div><p className="eyebrow">MISSÃO CONCLUÍDA · +110 XP</p><h1>A tua preparação foi atualizada.</h1>
  <div className="changes">{changes.map(c=><div key={c[0]}><b>{c[0]}</b><span>{c[1]}</span><i>→</i><strong>{c[2]}</strong><em className={c[2]>=c[1]?"up":"down"}>{c[2]>=c[1]?"+":""}{c[2]-c[1]}</em></div>)}</div>
  <div className="global"><span>Índice de Preparação</span><strong>{prep}/100</strong></div>
  <p className="note">Uma descida não é uma penalização: significa que apareceu nova evidência sobre uma competência.</p>
  <button className="primary" onClick={home}>Ver plano atualizado</button>
 </section></main>
}
