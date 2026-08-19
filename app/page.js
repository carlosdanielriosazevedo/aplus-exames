"use client";
import {useMemo,useState} from "react";
import {BANK,MICRO} from "./bank";

const INITIAL = {
  "PROB-04":{domain:62,conf:44},
  "PROB-05":{domain:58,conf:43},
  "PROB-06":{domain:66,conf:48},
  "PROB-07":{domain:64,conf:46},
  "CONT-01":{domain:74,conf:56},
  "CONT-02":{domain:70,conf:55},
  "CONT-03":{domain:68,conf:52},
  "PROB-03":{domain:72,conf:54},
  "PROB-08":{domain:57,conf:39},
  "ALG-01":{domain:76,conf:60},
  "REP-01":{domain:73,conf:50},
};

const TARGETS=["PROB-05","PROB-07","CONT-03","PROB-08"];

function byMicro(id){return BANK.filter(q=>q.micro===id)}

function evidenceStats(list){
  return {
    n:list.length,
    correct:list.filter(x=>x.correct).length,
    signatures:new Set(list.map(x=>x.signature)).size,
    cognitive:new Set(list.map(x=>x.cognitive)).size,
    hard:list.filter(x=>x.correct&&x.difficulty>=3).length
  };
}

function desiredDifficulty(score, goal=17){
  if(score.domain<55) return 1;
  if(score.domain<72) return 2;
  return goal>=18?3:2;
}

function chooseQuestion({target,scores,seen,evidence,pendingPrereq}){
  let micro = pendingPrereq || target;
  let pool = byMicro(micro).filter(q=>!seen.includes(q.id));
  if(!pool.length) pool=byMicro(micro);

  const wanted=desiredDifficulty(scores[micro]||{domain:50},17);
  const seenSigs=new Set(evidence.map(e=>e.signature));
  const seenCog=new Set(evidence.map(e=>e.cognitive));

  pool = [...pool].sort((a,b)=>{
    const sa =
      Math.abs(a.difficulty-wanted)*5 +
      (seenSigs.has(a.signature)?12:0) +
      (seenCog.has(a.cognitive)?3:0);
    const sb =
      Math.abs(b.difficulty-wanted)*5 +
      (seenSigs.has(b.signature)?12:0) +
      (seenCog.has(b.cognitive)?3:0);
    return sa-sb;
  });
  const q=pool[0];

  let why="";
  if(pendingPrereq){
    why=`A resposta anterior deixou uma dúvida sobre um pré-requisito. Esta questão testa ${MICRO[micro]?.name?.toLowerCase() || micro} antes de mexermos no teu nível principal.`;
  }else if(evidence.length===0){
    why=`Começamos perto do teu nível atual em ${MICRO[target].name.toLowerCase()}.`;
  }else if(!seenSigs.has(q.signature)){
    why="Escolhemos uma estrutura diferente das anteriores para evitar confundir memorização com domínio.";
  }else{
    why="Esta questão ajuda a completar a evidência que ainda falta nesta competência.";
  }
  return {q,why,micro};
}

function shouldStop(evidence){
  const s=evidenceStats(evidence);
  if(s.n<3) return {stop:false};
  if(s.correct===s.n && s.signatures>=3 && s.cognitive>=2) return {stop:true,reason:"Demonstraste domínio consistente em diferentes estruturas de questão."};
  if(s.n>=3 && s.correct<=1 && s.signatures>=2) return {stop:true,reason:"A dificuldade repetiu-se em evidências suficientemente diferentes."};
  if(s.n>=4 && s.correct>=3 && s.signatures>=3) return {stop:true,reason:"Já temos evidência diversificada suficiente, apesar de uma resposta contraditória."};
  if(s.n>=6) return {stop:true,reason:"Atingimos o limite de duração desta Missão sem forçar uma conclusão excessiva."};
  return {stop:false};
}

function updateScore(old,evidence){
  const s=evidenceStats(evidence), ratio=s.correct/s.n;
  let d=0;
  if(ratio>=.85) d=s.hard?7:5;
  else if(ratio>=.65) d=2;
  else if(ratio<=.35) d=-7;
  else d=-2;

  const diversity=Math.min(18,s.signatures*4+s.cognitive*2);
  const volume=Math.min(18,s.n*3);
  const contradiction=(ratio>.35&&ratio<.8)?8:0;
  return {
    domain:Math.max(0,Math.min(100,old.domain+d)),
    conf:Math.max(old.conf,Math.min(96,old.conf+diversity+volume-contradiction)),
    delta:d
  };
}

export default function Page(){
  const [scores,setScores]=useState(INITIAL);
  const [view,setView]=useState("home");
  const [target,setTarget]=useState(null);
  const [current,setCurrent]=useState(null);
  const [why,setWhy]=useState("");
  const [selected,setSelected]=useState(null);
  const [typed,setTyped]=useState("");
  const [feedback,setFeedback]=useState(null);
  const [evidence,setEvidence]=useState([]);
  const [seen,setSeen]=useState([]);
  const [pendingPrereq,setPendingPrereq]=useState(null);
  const [result,setResult]=useState(null);

  const overall=useMemo(()=>{
    const vals=TARGETS.map(k=>scores[k].domain);
    return Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
  },[scores]);

  function start(k){
    const choice=chooseQuestion({target:k,scores,seen:[],evidence:[],pendingPrereq:null});
    setTarget(k);setEvidence([]);setSeen([]);setPendingPrereq(null);
    setCurrent(choice.q);setWhy(choice.why);setSelected(null);setTyped("");setFeedback(null);setView("question");
  }

  function isCorrect(){
    if(current.format==="Curta"){
      const norm=x=>String(x).trim().replace(",",".").replace(/\s/g,"");
      return norm(typed)===norm(current.correct);
    }
    const letters=["A","B","C","D"];
    return letters[selected]===current.correct;
  }

  function submit(){
    if(feedback) return;
    const ok=isCorrect();
    setFeedback({
      ok,
      text:ok?current.solution:current.hypothesis
    });
  }

  function next(){
    const ok=isCorrect();
    const ev={
      id:current.id,micro:current.micro,correct:ok,signature:current.signature,
      cognitive:current.cognitive,difficulty:current.difficulty
    };
    const all=[...evidence,ev];
    const allSeen=[...seen,current.id];

    // If wrong on main target and there is a prerequisite, test one before changing the target score.
    let prereq=null;
    if(!ok && current.micro===target){
      const candidates=MICRO[target]?.prereqs||[];
      prereq=candidates.find(p=>byMicro(p).length>0 && !all.some(e=>e.micro===p)) || null;
    }

    if(prereq){
      const choice=chooseQuestion({target,scores,seen:allSeen,evidence:all,pendingPrereq:prereq});
      setEvidence(all);setSeen(allSeen);setPendingPrereq(prereq);
      setCurrent(choice.q);setWhy(choice.why);setSelected(null);setTyped("");setFeedback(null);
      return;
    }

    // A prerequisite question is diagnostic. If passed, return to target. If failed, update prerequisite only.
    if(current.micro!==target){
      if(!ok){
        const old=scores[current.micro]||{domain:50,conf:30};
        const change={domain:Math.max(0,old.domain-5),conf:Math.min(96,old.conf+12)};
        const ns={...scores,[current.micro]:change};
        setScores(ns);
        setResult({
          target:current.micro,
          old,
          updated:change,
          reason:`A A+ confirmou uma dificuldade no pré-requisito «${MICRO[current.micro]?.name}». O nível de ${MICRO[target]?.name} não foi penalizado diretamente.`,
          evidence:all
        });
        setView("result");return;
      }else{
        const choice=chooseQuestion({target,scores,seen:allSeen,evidence:all.filter(e=>e.micro===target),pendingPrereq:null});
        setEvidence(all);setSeen(allSeen);setPendingPrereq(null);
        setCurrent(choice.q);setWhy("O pré-requisito foi confirmado. Voltamos agora à competência original com uma questão diferente.");
        setSelected(null);setTyped("");setFeedback(null);return;
      }
    }

    const targetEvidence=all.filter(e=>e.micro===target);
    const stop=shouldStop(targetEvidence);
    if(stop.stop){
      const old=scores[target];
      const updated=updateScore(old,targetEvidence);
      const ns={...scores,[target]:{domain:updated.domain,conf:updated.conf}};
      setScores(ns);
      setResult({target,old,updated,reason:stop.reason,evidence:targetEvidence});
      setView("result");return;
    }

    const choice=chooseQuestion({target,scores,seen:allSeen,evidence:targetEvidence,pendingPrereq:null});
    setEvidence(all);setSeen(allSeen);setPendingPrereq(null);
    setCurrent(choice.q);setWhy(choice.why);setSelected(null);setTyped("");setFeedback(null);
  }

  if(view==="question") return <Question q={current} why={why} selected={selected} setSelected={setSelected} typed={typed} setTyped={setTyped} feedback={feedback} submit={submit} next={next} count={evidence.length+1}/>;
  if(view==="result") return <Result data={result} scores={scores} home={()=>setView("home")} />;
  return <Home scores={scores} overall={overall} start={start}/>;
}

function Logo(){return <div className="logo">A<span>+</span> EXAMES</div>}

function Home({scores,overall,start}){
  return <main className="dark"><section className="wrap">
    <header><div><Logo/><small>BANCO + MOTOR · v0.9</small></div><div className="pill">Índice piloto {overall}/100</div></header>
    <div className="hero"><p>SELETOR DINÂMICO DE QUESTÕES</p><h1>Agora o motor pede uma questão ao banco — <em>não sabe qual vem a seguir.</em></h1>
      <span>Escolhe uma competência e responde de formas diferentes. A A+ procura variar estrutura, dificuldade e tipo cognitivo e pode recuar a um pré-requisito se o erro for ambíguo.</span></div>
    <div className="cards">
      {TARGETS.map(k=><button key={k} onClick={()=>start(k)}>
        <b>{MICRO[k].name}</b><small>{MICRO[k].parent}</small>
        <div className="metric"><span>Domínio</span><strong>{scores[k].domain}</strong></div><div className="bar"><i style={{width:scores[k].domain+"%"}}/></div>
        <div className="metric"><span>Confiança</span><strong>{scores[k].conf}%</strong></div><div className="bar green"><i style={{width:scores[k].conf+"%"}}/></div>
        <em>Começar Missão →</em>
      </button>)}
    </div>
    <div className="architecture"><b>O que mudou nesta versão</b><span>50 questões estão fora do código do percurso, num banco com metadados. O seletor escolhe por microcompetência, dificuldade e assinatura semântica e evita reutilizar estruturas recentes.</span></div>
  </section></main>
}

function Question({q,why,selected,setSelected,typed,setTyped,feedback,submit,next,count}){
  return <main className="light"><section className="panel">
    <header><Logo/><span className="mode">EVIDÊNCIA {count} · D{q.difficulty}</span></header>
    <div className="whyQ"><b>Porque escolheste esta pergunta?</b><span>{why}</span></div>
    <p className="eyebrow">{q.cognitive.toUpperCase()} · {q.micro}</p><h1>{q.text}</h1>
    {q.format==="Curta"?
      <input className="answerInput" value={typed} onChange={e=>setTyped(e.target.value)} placeholder="Escreve a tua resposta" disabled={!!feedback}/>:
      <div className="opts">{q.options.map((x,i)=>{
        let c="opt"; if(selected===i)c+=" sel";
        const letter=["A","B","C","D"][i];
        if(feedback && letter===q.correct)c+=" correct";
        if(feedback && selected===i && letter!==q.correct)c+=" wrong";
        return <button key={i} className={c} onClick={()=>!feedback&&setSelected(i)}><span>{letter}</span>{x}</button>
      })}</div>}
    {feedback&&<div className={feedback.ok?"feedback good":"feedback bad"}><b>{feedback.ok?"✓ Correto":"A A+ detetou uma hipótese."}</b><span>{feedback.text}</span><button>Ver resolução passo a passo</button></div>}
    <div className="details"><span>Assinatura: {q.signature}</span><span>{q.format}</span><span>~{q.time}s</span></div>
    {!feedback?<button className="primary" disabled={q.format==="Curta"?!typed:selected===null} onClick={submit}>Confirmar resposta</button>:
      <button className="primary" onClick={next}>Continuar</button>}
  </section></main>
}

function Result({data,scores,home}){
  const name=MICRO[data.target]?.name||data.target;
  const delta=data.updated.domain-data.old.domain;
  const cdelta=data.updated.conf-data.old.conf;
  return <main className="light"><section className="panel result">
    <Logo/><div className="check">✓</div><p className="eyebrow">MISSÃO CONCLUÍDA</p><h1>{name}</h1>
    <div className="reason"><b>Porque terminou?</b><span>{data.reason}</span></div>
    <div className="compare">
      <div><span>Domínio</span><b>{data.old.domain} → {data.updated.domain}</b><em className={delta>=0?"up":"down"}>{delta>=0?"+":""}{delta}</em></div>
      <div><span>Confiança</span><b>{data.old.conf}% → {data.updated.conf}%</b><em className={cdelta>=0?"up":"down"}>{cdelta>=0?"+":""}{cdelta}%</em></div>
      <div><span>Evidências</span><b>{data.evidence.length}</b><em>{new Set(data.evidence.map(e=>e.signature)).size} estruturas</em></div>
    </div>
    <div className="reason"><b>Porque tomou a A+ esta decisão?</b><span>A alteração usa apenas evidências relevantes para a microcompetência confirmada. Perguntas de pré-requisito servem para localizar a causa e não penalizam automaticamente a competência original.</span></div>
    <button className="primary" onClick={home}>Voltar ao painel</button>
  </section></main>
}
