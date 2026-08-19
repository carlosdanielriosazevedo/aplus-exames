"use client";

import { useEffect, useMemo, useState } from "react";

const QUESTIONS = [
  {id:"ALG1", skill:"Álgebra", level:1, q:"Se 3x − 5 = 16, qual é o valor de x?", options:["5","6","7","8"], answer:2, explain:"3x = 21, logo x = 7."},
  {id:"GEO1", skill:"Geometria", level:1, q:"Qual é a distância entre A(1,2) e B(4,6)?", options:["3","4","5","7"], answer:2, explain:"d = √[(4−1)²+(6−2)²] = 5."},
  {id:"PROB1", skill:"Probabilidades", level:1, q:"Num saco há 3 bolas vermelhas e 2 azuis. Qual é P(vermelha)?", options:["2/5","1/2","3/5","3/2"], answer:2, explain:"Há 3 casos favoráveis em 5 possíveis: 3/5."},
  {id:"FUN1", skill:"Funções", level:1, q:"Se f é contínua em x=2, qual afirmação é necessariamente verdadeira?", options:["f(2)=0","lim x→2 f(x)=f(2)","f'(2) existe","f é crescente perto de 2"], answer:1, explain:"Continuidade implica que o limite coincide com o valor da função."},
  {id:"DER1", skill:"Derivadas", level:1, q:"Se f(x)=x³−3x, qual é f'(x)?", options:["3x²−3","x²−3","3x²−3x","x³−3"], answer:0, explain:"f'(x)=3x²−3."},
  {id:"CPLX1", skill:"Complexos", level:1, q:"A que ponto corresponde z=3−2i no plano complexo?", options:["(−2,3)","(3,−2)","(3,2)","(−3,−2)"], answer:1, explain:"Parte real = abcissa; parte imaginária = ordenada."},

  {id:"PROB2", skill:"Probabilidades", level:2, q:"Se P(A)=0,6, P(B)=0,5 e P(A∩B)=0,3, quanto vale P(A∪B)?", options:["0,8","1,1","0,3","0,2"], answer:0, explain:"0,6+0,5−0,3 = 0,8."},
  {id:"PROB3", skill:"Probabilidades", level:2, q:"60% estudam Matemática e 30% estudam Matemática e Física. Sabendo que estuda Matemática, qual é P(Física)?", options:["0,18","0,30","0,50","0,90"], answer:2, explain:"P(F|M)=0,30/0,60=0,50."},
  {id:"FUN2", skill:"Funções", level:2, q:"Para f(x)=1/(x−2), qual é a assíntota vertical?", options:["x=0","y=2","x=2","y=0"], answer:2, explain:"O denominador anula-se em x=2."},
  {id:"DER2", skill:"Derivadas", level:2, q:"Se f'(x)>0 em ]1,4[, o que podemos concluir nesse intervalo?", options:["f é negativa","f é decrescente","f é crescente","f é constante"], answer:2, explain:"Derivada positiva implica função crescente."},
  {id:"GEO2", skill:"Geometria", level:2, q:"Para que valor de k os vetores (2,k) e (3,−6) são perpendiculares?", options:["−1","1","2","3"], answer:1, explain:"2·3 + k(−6)=0 ⇒ k=1."},
  {id:"CPLX2", skill:"Complexos", level:2, q:"Qual é o módulo de z=3+4i?", options:["3","4","5","7"], answer:2, explain:"|z|=√(3²+4²)=5."},

  {id:"FUN3", skill:"Funções", level:3, q:"Sabe-se que f'(x)=(x−1)(x−3). Em que intervalos f é crescente?", options:["]1,3[","]−∞,1[ e ]3,+∞[","]−∞,3[","]1,+∞["], answer:1, explain:"O produto é positivo para x<1 e x>3."},
  {id:"DER3", skill:"Derivadas", level:3, q:"Um retângulo tem perímetro 20. Se um lado mede x, qual função dá a área?", options:["10x−x²","20x−x²","10−x²","x²−10x"], answer:0, explain:"2x+2y=20 ⇒ y=10−x; A=x(10−x)."},
  {id:"PROB4", skill:"Probabilidades", level:3, q:"Se A e B são independentes, P(A)=0,4 e P(B)=0,5, quanto vale P(A∩B)?", options:["0,9","0,2","0,45","0,1"], answer:1, explain:"Independência ⇒ P(A∩B)=0,4×0,5=0,2."},
];

const ALL_SKILLS = ["Álgebra","Geometria","Probabilidades","Funções","Derivadas","Complexos"];

const SKILL_LABELS = {
  "Álgebra":"Manipulação algébrica",
  "Geometria":"Geometria analítica",
  "Probabilidades":"Probabilidades",
  "Funções":"Funções",
  "Derivadas":"Derivadas e monotonia",
  "Complexos":"Números complexos"
};

function calcSkillScores(results){
  const scores = {};
  ALL_SKILLS.forEach(s => scores[s] = {earned:0, possible:0, correct:0, total:0});
  results.forEach(r => {
    const q = QUESTIONS.find(x=>x.id===r.id);
    if(!q) return;
    const w = q.level===1 ? 1 : q.level===2 ? 1.5 : 2.2;
    scores[q.skill].possible += w;
    scores[q.skill].total += 1;
    if(r.correct){
      scores[q.skill].earned += w;
      scores[q.skill].correct += 1;
    }
  });
  const out = {};
  ALL_SKILLS.forEach(s=>{
    const d=scores[s];
    const raw=d.possible ? d.earned/d.possible : 0.5;
    // confidence-aware: unseen skills stay neutral rather than 0
    const confidence=Math.min(1,d.total/2);
    out[s]=Math.round((raw*confidence + 0.5*(1-confidence))*100);
  });
  return out;
}

function getPriorities(scores){
  return Object.entries(scores).sort((a,b)=>a[1]-b[1]).map(([skill,score])=>({skill,score}));
}

function missionTemplates(priorities){
  const p1=priorities[0]?.skill || "Probabilidades";
  const p2=priorities[1]?.skill || "Funções";
  const p3=priorities[2]?.skill || "Geometria";
  return [
    {day:"Hoje", title:`Reforça ${SKILL_LABELS[p1]}`, focus:p1, type:"Fundamentos + confirmação", mins:12, xp:90},
    {day:"Amanhã", title:`Aplica ${SKILL_LABELS[p1]}`, focus:p1, type:"Aplicação em contexto", mins:15, xp:110},
    {day:"Dia 3", title:`Liga ${SKILL_LABELS[p2]} a ${SKILL_LABELS[p1]}`, focus:p2, type:"Mistura de competências", mins:14, xp:120},
    {day:"Dia 4", title:`Consolida ${SKILL_LABELS[p3]}`, focus:p3, type:"Treino adaptativo", mins:12, xp:100},
    {day:"Dia 5", title:"Revisão inteligente", focus:"Revisão", type:`Erros de ${p1}, ${p2} e ${p3}`, mins:10, xp:100},
    {day:"Dia 6", title:"Mini-exame misto", focus:"Exame", type:"Questões de vários temas", mins:20, xp:160},
    {day:"Dia 7", title:"Recuperação + desafio", focus:"Revisão", type:"Revisão espaçada + 1 questão difícil", mins:12, xp:120},
  ];
}

export default function Page(){
  const [screen,setScreen]=useState("welcome");
  const [goal,setGoal]=useState("16–17");
  const [daily,setDaily]=useState("15 min");
  const [diagQueue,setDiagQueue]=useState([]);
  const [diagIndex,setDiagIndex]=useState(0);
  const [results,setResults]=useState([]);
  const [selected,setSelected]=useState(null);
  const [feedback,setFeedback]=useState(null);
  const [scores,setScores]=useState(null);
  const [missions,setMissions]=useState([]);
  const [missionDay,setMissionDay]=useState(0);
  const [xp,setXp]=useState(0);
  const [streak,setStreak]=useState(1);

  useEffect(()=>{
    try{
      const saved=JSON.parse(localStorage.getItem("aplus-v03")||"null");
      if(saved?.scores){
        setScores(saved.scores); setMissions(saved.missions||[]);
        setXp(saved.xp||0); setStreak(saved.streak||1);
      }
    }catch{}
  },[]);

  function beginDiagnostic(){
    // 6 anchors + adaptive candidates
    const anchors=["ALG1","GEO1","PROB1","FUN1","DER1","CPLX1"];
    setDiagQueue(anchors); setDiagIndex(0); setResults([]); setSelected(null); setFeedback(null);
    setScreen("diagnostic");
  }

  function choose(idx){
    if(feedback) return;
    const id=diagQueue[diagIndex];
    const q=QUESTIONS.find(x=>x.id===id);
    setSelected(idx);
    setFeedback({correct:idx===q.answer, explain:q.explain});
  }

  function nextDiagnostic(){
    const id=diagQueue[diagIndex];
    const q=QUESTIONS.find(x=>x.id===id);
    const correct=selected===q.answer;
    const newResults=[...results,{id,correct}];
    setResults(newResults);

    let newQueue=[...diagQueue];

    // After each anchor, add a harder item if correct, a confirmation item if wrong.
    if(q.level===1){
      const same=QUESTIONS.filter(x=>x.skill===q.skill && x.level===2);
      if(same[0] && !newQueue.includes(same[0].id)) newQueue.push(same[0].id);
    } else if(q.level===2 && correct){
      const hard=QUESTIONS.find(x=>x.skill===q.skill && x.level===3);
      if(hard && !newQueue.includes(hard.id)) newQueue.push(hard.id);
    }

    // cap diagnostic to 11 items for MVP
    newQueue=newQueue.slice(0,11);
    setDiagQueue(newQueue);

    const next=diagIndex+1;
    if(next>=newQueue.length){
      finishDiagnostic(newResults);
    }else{
      setDiagIndex(next); setSelected(null); setFeedback(null);
    }
  }

  function finishDiagnostic(finalResults){
    const s=calcSkillScores(finalResults);
    const p=getPriorities(s);
    const m=missionTemplates(p);
    setScores(s); setMissions(m); setXp(120); setStreak(1);
    try{localStorage.setItem("aplus-v03",JSON.stringify({scores:s,missions:m,xp:120,streak:1}));}catch{}
    setScreen("result");
  }

  const priorities=useMemo(()=>scores?getPriorities(scores):[],[scores]);
  const prepIndex=useMemo(()=>{
    if(!scores) return 0;
    const vals=Object.values(scores);
    return Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
  },[scores]);

  function completeToday(){
    const gain=missions[missionDay]?.xp || 100;
    const newXp=xp+gain;
    const newDay=(missionDay+1)%Math.max(1,missions.length);
    setXp(newXp); setMissionDay(newDay); setStreak(streak+1);
    try{localStorage.setItem("aplus-v03",JSON.stringify({scores,missions,xp:newXp,streak:streak+1}));}catch{}
  }

  if(screen==="welcome") return <Welcome onStart={()=>setScreen("goal")} onResume={scores?()=>setScreen("home"):null}/>;
  if(screen==="goal") return <Goal goal={goal} setGoal={setGoal} onNext={()=>setScreen("time")}/>;
  if(screen==="time") return <Time daily={daily} setDaily={setDaily} onStart={beginDiagnostic}/>;
  if(screen==="diagnostic"){
    const id=diagQueue[diagIndex], q=QUESTIONS.find(x=>x.id===id);
    return <Diagnostic q={q} index={diagIndex} total={diagQueue.length} selected={selected} feedback={feedback} choose={choose} next={nextDiagnostic}/>;
  }
  if(screen==="result") return <Result scores={scores} priorities={priorities} index={prepIndex} onHome={()=>setScreen("home")}/>;
  return <Home scores={scores} priorities={priorities} prepIndex={prepIndex} missions={missions} missionDay={missionDay} xp={xp} streak={streak} completeToday={completeToday} restart={()=>{setScreen("welcome");setScores(null);setMissions([]);try{localStorage.removeItem("aplus-v03")}catch{}}}/>;
}

function Welcome({onStart,onResume}){
  return <main className="shell"><section className="hero">
    <nav><div className="brand">A<span>+</span> EXAMES</div><div className="subject">MATEMÁTICA A · 635</div></nav>
    <div className="heroCopy"><div className="badge">PREPARAÇÃO PARA O EXAME NACIONAL</div>
      <h1>A tua melhor nota<br/><em>começa aqui.</em></h1>
      <p>Descobre onde estás a perder pontos e recebe um plano de treino que muda à medida que evoluis.</p>
      <button className="primary heroButton" onClick={onStart}>Descobrir o meu nível <span>→</span></button>
      {onResume && <button className="ghost" onClick={onResume}>Continuar o meu plano</button>}
      <div className="micro"><span>⚡ 10–20 min/dia</span><span>🎯 Adaptativo</span><span>📈 Progresso real</span></div>
    </div>
    <div className="preview">
      <div className="miniCard"><small>MISSÃO DE HOJE</small><b>Treino personalizado</b><span>12 min · +90 XP</span></div>
      <div className="miniCard purple"><small>PREPARAÇÃO</small><b>68 → 74</b><span>+6 esta semana</span></div>
      <div className="miniCard"><small>PRIORIDADE</small><b>Probabilidades</b><span>detetada pelo diagnóstico</span></div>
    </div>
    <div className="trust">Sem cartão · Experimenta primeiro · O plano só aparece depois do diagnóstico</div>
  </section></main>
}

function Goal({goal,setGoal,onNext}){
  return <main className="lightShell"><section className="panel"><Top step="1 de 2"/>
    <div className="center"><p className="eyebrow">O TEU OBJETIVO</p><h1>Que nota queres alcançar a Matemática A?</h1><p className="muted">Serve para ajustarmos a exigência do teu percurso.</p>
    <div className="goalGrid">{["10–12","13–15","16–17","18–20"].map(g=><button key={g} className={goal===g?"choice selected":"choice"} onClick={()=>setGoal(g)}><strong>{g}</strong><span>valores</span></button>)}</div>
    <button className="primary wide" onClick={onNext}>Continuar</button></div>
  </section></main>
}

function Time({daily,setDaily,onStart}){
  return <main className="lightShell"><section className="panel"><Top step="2 de 2"/>
    <div className="center"><p className="eyebrow">RITMO DE ESTUDO</p><h1>Quanto tempo consegues dedicar por dia?</h1><p className="muted">As missões vão adaptar-se à tua rotina.</p>
    <div className="timeGrid">{["10 min","15 min","20 min","30 min"].map(t=><button key={t} className={daily===t?"choice selected":"choice"} onClick={()=>setDaily(t)}><strong>{t}</strong><span>por dia</span></button>)}</div>
    <button className="primary wide" onClick={onStart}>Começar diagnóstico</button></div>
  </section></main>
}

function Top({step}){return <><div className="topline"><div className="brand dark">A<span>+</span> EXAMES</div><span>{step}</span></div><div className="progress"><i style={{width:step==="1 de 2"?"50%":"100%"}}/></div></>}

function Diagnostic({q,index,total,selected,feedback,choose,next}){
  if(!q) return null;
  return <main className="lightShell"><section className="panel diag">
    <div className="diagTop"><div className="brand dark">A<span>+</span> EXAMES</div><span>Diagnóstico · {index+1}/{total}</span></div>
    <div className="progress"><i style={{width:`${((index+1)/total)*100}%`}}/></div>
    <div className="qmeta"><span>{q.skill}</span><b>Nível {q.level}</b></div>
    <h2>{q.q}</h2>
    <div className="options">{q.options.map((o,i)=>{
      let cls="option";
      if(selected===i) cls+=" picked";
      if(feedback && i===q.answer) cls+=" right";
      if(feedback && selected===i && i!==q.answer) cls+=" wrong";
      return <button key={i} className={cls} onClick={()=>choose(i)}><span>{String.fromCharCode(65+i)}</span>{o}</button>
    })}</div>
    {feedback && <div className={feedback.correct?"feedback good":"feedback bad"}><b>{feedback.correct?"Certo! +XP":"Ainda não."}</b><span>{feedback.explain}</span></div>}
    <button className="primary wide" disabled={selected===null} onClick={feedback?next:()=>{}}>{feedback?"Continuar":"Seleciona uma resposta"}</button>
  </section></main>
}

function Result({scores,priorities,index,onHome}){
  return <main className="lightShell"><section className="panel resultPanel">
    <div className="brand dark">A<span>+</span> EXAMES</div>
    <p className="eyebrow">DIAGNÓSTICO CONCLUÍDO</p><h1>Já sabemos por onde começar.</h1>
    <div className="indexCircle"><strong>{index}</strong><span>/100</span></div>
    <p className="muted centerText">Índice de Preparação inicial. Ainda não é uma previsão da tua nota.</p>
    <div className="skillList">{priorities.map((p,i)=><div key={p.skill} className="skillRow"><div><b>{p.skill}</b><small>{i===0?"Prioridade principal":i===1?"Segunda prioridade":"A acompanhar"}</small></div><div className="bar"><i style={{width:`${p.score}%`}}/></div><strong>{p.score}</strong></div>)}</div>
    <div className="resultCallout"><b>O teu plano não vai repetir a mesma missão todos os dias.</b><span>Vamos alternar fundamentos, aplicação, revisão espaçada e mini-exames conforme os teus resultados.</span></div>
    <button className="primary wide" onClick={onHome}>Ver o meu plano</button>
  </section></main>
}

function Home({scores,priorities,prepIndex,missions,missionDay,xp,streak,completeToday,restart}){
  const m=missions[missionDay]||missions[0];
  return <main className="dashShell"><section className="dashboard">
    <div className="dashTop"><div><div className="brand">A<span>+</span> EXAMES</div><small>MATEMÁTICA A · 635</small></div><div className="stats"><b>🔥 {streak}</b><span>{xp} XP</span></div></div>
    <div className="welcome"><div><p>O teu plano adapta-se a cada sessão</p><h1>Missão de hoje</h1></div><div className="prep"><small>PREPARAÇÃO</small><strong>{prepIndex}<span>/100</span></strong></div></div>
    <div className="missionCard"><div><span className="pill">{m?.type}</span><h2>{m?.title}</h2><p>{m?.mins} min · +{m?.xp} XP · foco em {m?.focus}</p></div><button onClick={completeToday}>Concluir missão →</button></div>

    <div className="grid2">
      <div className="card">
        <div className="cardTitle"><h3>Próximos 7 dias</h3><span>ajusta automaticamente</span></div>
        <div className="week">{missions.map((x,i)=><div key={i} className={i===missionDay?"day active":"day"}><b>{x.day}</b><span>{x.title}</span><small>{x.mins} min</small></div>)}</div>
      </div>
      <div className="card">
        <div className="cardTitle"><h3>Prioridades atuais</h3><span>do diagnóstico</span></div>
        {priorities.slice(0,4).map((p,i)=><div className="priority" key={p.skill}><div><b>{p.skill}</b><small>{i===0?"Alta":i===1?"Média":"A acompanhar"}</small></div><div className="bar"><i style={{width:`${p.score}%`}}/></div><strong>{p.score}</strong></div>)}
      </div>
    </div>

    <div className="card adapt"><div><span>🧠</span><div><b>Porque é que amanhã pode mudar?</b><p>Se hoje dominares a prioridade principal, a A+ reduz esse foco. Se aparecer uma nova lacuna, ela sobe no plano.</p></div></div></div>
    <button className="reset" onClick={restart}>Recomeçar protótipo</button>
  </section></main>
}
