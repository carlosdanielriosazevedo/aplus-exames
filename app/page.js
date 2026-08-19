"use client";
import {useMemo,useState} from "react";

const MICRO = {
  "PROB-07": {name:"Interpretar probabilidade condicionada", parent:"Probabilidades"},
  "PROB-08": {name:"Calcular probabilidade condicionada", parent:"Probabilidades"},
  "PROB-10": {name:"Distinguir independência de incompatibilidade", parent:"Probabilidades"},
  "PROB-11": {name:"Verificar independência", parent:"Probabilidades"},
  "PROB-15": {name:"Reconhecer quando a ordem não importa", parent:"Combinatória"},
  "PROB-16": {name:"Calcular combinações", parent:"Combinatória"},
  "PROB-17": {name:"Combinar contagem e probabilidade", parent:"Probabilidades"},
};

const Q = {
  P007:{
    micro:"PROB-08", level:2,
    text:"60% dos alunos estudam Matemática e 30% estudam Matemática e Física. Sabendo que um aluno estuda Matemática, qual é a probabilidade de também estudar Física?",
    opts:["0,18","0,30","0,50","0,90"], answer:2,
    explain:"P(F|M)=P(F∩M)/P(M)=0,30/0,60=0,50.",
    wrongHypothesis:"Pode estar a falhar a interpretação da condição."
  },
  P018:{
    micro:"PROB-07", level:1,
    text:"Numa turma de 20 alunos, 10 estudam Matemática e, desses 10, 4 também estudam Física. Ao calcular P(Física | Matemática), qual é o universo relevante?",
    opts:["Os 20 alunos","Os 10 que estudam Matemática","Os 4 que estudam ambas","Os que não estudam Matemática"], answer:1,
    explain:"A condição 'Matemática' restringe o universo aos 10 alunos que estudam Matemática.",
    wrongHypothesis:"Lacuna conceptual em probabilidade condicionada."
  },
  P019:{
    micro:"PROB-08", level:1,
    text:"Entre 10 alunos que estudam Matemática, 4 também estudam Física. Quanto vale P(Física | Matemática)?",
    opts:["2/5","2/10","5/10","1/5"], answer:0,
    explain:"Dentro do universo condicionado de 10 alunos, 4 são favoráveis: 4/10=2/5.",
    wrongHypothesis:"A fórmula/execução da probabilidade condicionada ainda não está consolidada."
  },
  P010:{
    micro:"PROB-11", level:2,
    text:"Se P(A)=0,4, P(B)=0,5 e P(A∩B)=0,2, A e B são independentes?",
    opts:["Sim","Não, porque P(A)≠P(B)","Não, porque P(A∩B)≠0","Só seriam independentes se fossem incompatíveis"], answer:0,
    explain:"P(A)P(B)=0,4×0,5=0,2=P(A∩B), portanto são independentes.",
    wrongHypothesis:"Pode haver confusão entre independência e incompatibilidade."
  },
  P020:{
    micro:"PROB-10", level:1,
    text:"Dois acontecimentos independentes podem ocorrer simultaneamente?",
    opts:["Sim","Não","Só se tiverem a mesma probabilidade","Só se forem complementares"], answer:0,
    explain:"Independência não significa incompatibilidade. Dois acontecimentos independentes podem ocorrer ao mesmo tempo.",
    wrongHypothesis:"Confusão conceptual entre independência e incompatibilidade."
  },
  P015:{
    micro:"PROB-16", level:2,
    text:"De um grupo de 5 alunos, quantas equipas diferentes de 2 alunos podem ser formadas?",
    opts:["10","20","25","5"], answer:0,
    explain:"Como a ordem não interessa, C(5,2)=10.",
    wrongHypothesis:"Pode estar a confundir combinação com arranjo."
  },
  P014:{
    micro:"PROB-15", level:1,
    text:"Ao escolher 2 alunos para formar uma equipa, a ordem da escolha altera a equipa?",
    opts:["Não","Sim","Só se houver 5 ou mais alunos","Depende da idade"], answer:0,
    explain:"Escolher Ana e Rui é a mesma equipa que escolher Rui e Ana.",
    wrongHypothesis:"A noção de seleção sem ordem não está consolidada."
  },
  P016:{
    micro:"PROB-17", level:3,
    text:"Uma turma tem 6 raparigas e 4 rapazes. Escolhem-se 2 alunos ao acaso. Qual expressão representa a probabilidade de escolher 2 raparigas?",
    opts:["C(6,2)/C(10,2)","6/10 × 6/10","C(10,2)/C(6,2)","6/10 + 5/9"], answer:0,
    explain:"Os casos favoráveis são as combinações de 2 raparigas e os possíveis são as combinações de 2 alunos.",
    wrongHypothesis:"Pode haver falha de integração entre contagem e probabilidade."
  }
};

const PATHS = {
  conditioned:{
    title:"Probabilidade condicionada",
    initial:"P007",
    confirm:"P018",
    formula:"P019"
  },
  independence:{
    title:"Independência",
    initial:"P010",
    confirm:"P020"
  },
  combinations:{
    title:"Combinações",
    initial:"P015",
    confirm:"P014"
  }
};

export default function Page(){
 const [view,setView]=useState("home");
 const [pathKey,setPathKey]=useState(null);
 const [qid,setQid]=useState(null);
 const [selected,setSelected]=useState(null);
 const [feedback,setFeedback]=useState(null);
 const [history,setHistory]=useState([]);
 const [scores,setScores]=useState({
   "PROB-07":62,"PROB-08":58,"PROB-10":66,"PROB-11":64,"PROB-15":70,"PROB-16":68,"PROB-17":57
 });
 const [lastResult,setLastResult]=useState(null);

 const overall=useMemo(()=>{
   const vals=Object.values(scores);
   return Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
 },[scores]);

 function startPath(key){
   const p=PATHS[key];
   setPathKey(key); setQid(p.initial); setSelected(null); setFeedback(null); setHistory([]); setView("question");
 }

 function answer(i){
   if(feedback) return;
   const q=Q[qid];
   setSelected(i);
   setFeedback({correct:i===q.answer, text:i===q.answer?q.explain:q.wrongHypothesis});
 }

 function next(){
   const q=Q[qid];
   const correct=selected===q.answer;
   const newHistory=[...history,{qid,correct}];
   setHistory(newHistory);

   if(pathKey==="conditioned"){
     if(qid==="P007"){
       if(correct) return finishMission(newHistory,[
         {micro:"PROB-08",delta:+4,reason:"Aplicação correta em contexto intermédio."}
       ],"Condicionada sólida","Amanhã avançamos para problemas de várias etapas.");
       setQid("P018"); resetQ(); return;
     }
     if(qid==="P018"){
       if(!correct) return finishMission(newHistory,[
         {micro:"PROB-07",delta:-7,reason:"A dificuldade está na interpretação da condição."}
       ],"Lacuna conceptual confirmada","A próxima Missão vai trabalhar o significado de P(A|B) antes da fórmula.");
       setQid("P019"); resetQ(); return;
     }
     if(qid==="P019"){
       if(!correct) return finishMission(newHistory,[
         {micro:"PROB-08",delta:-6,reason:"Interpretação correta, mas cálculo/fórmula frágil."}
       ],"Fórmula a consolidar","A próxima Missão será de cálculo de probabilidade condicionada.");
       return finishMission(newHistory,[
         {micro:"PROB-07",delta:+2,reason:"Interpretação confirmada."},
         {micro:"PROB-08",delta:-2,reason:"O erro inicial parece ter sido pontual."}
       ],"Erro isolado","Não vamos penalizar fortemente esta competência.");
     }
   }

   if(pathKey==="independence"){
     if(qid==="P010"){
       if(correct) return finishMission(newHistory,[{micro:"PROB-11",delta:+4,reason:"Critério de independência aplicado corretamente."}],"Independência sólida","Podemos subir a complexidade.");
       setQid("P020"); resetQ(); return;
     }
     if(qid==="P020"){
       if(!correct) return finishMission(newHistory,[{micro:"PROB-10",delta:-7,reason:"Confusão conceptual entre independência e incompatibilidade."}],"Conceito a rever","A próxima Missão será conceptual.");
       return finishMission(newHistory,[{micro:"PROB-11",delta:-3,reason:"Conceito está presente; a aplicação precisa de treino."}],"Aplicação a consolidar","A próxima Missão terá cálculos curtos de independência.");
     }
   }

   if(pathKey==="combinations"){
     if(qid==="P015"){
       if(correct) return finishMission(newHistory,[{micro:"PROB-16",delta:+4,reason:"Combinações aplicadas corretamente."}],"Combinações sólidas","Podemos misturar com probabilidade.");
       setQid("P014"); resetQ(); return;
     }
     if(qid==="P014"){
       if(!correct) return finishMission(newHistory,[{micro:"PROB-15",delta:-7,reason:"A noção de ordem ainda não está consolidada."}],"Ordem vs seleção","A próxima Missão começa por reconhecer quando a ordem importa.");
       return finishMission(newHistory,[{micro:"PROB-16",delta:-4,reason:"O conceito está correto; falta consolidar o cálculo."}],"Cálculo combinatório","A próxima Missão será de cálculo de combinações.");
     }
   }
 }

 function resetQ(){ setSelected(null); setFeedback(null); }

 function finishMission(hist,changes,title,nextMission){
   const before={...scores}, after={...scores};
   changes.forEach(c=>after[c.micro]=Math.max(0,Math.min(100,(after[c.micro]||50)+c.delta)));
   setScores(after);
   setLastResult({before,after,changes,title,nextMission,history:hist});
   setView("result");
 }

 if(view==="question") return <Question q={Q[qid]} selected={selected} feedback={feedback} answer={answer} next={next} pathTitle={PATHS[pathKey]?.title}/>;
 if(view==="result") return <Result data={lastResult} overall={overall} home={()=>setView("home")}/>;
 return <Home overall={overall} scores={scores} startPath={startPath}/>;
}

function Logo(){return <div className="logo">A<span>+</span> EXAMES</div>}

function Home({overall,scores,startPath}){
 return <main className="dark"><section className="dash">
   <header><div><Logo/><small>MATEMÁTICA A · PILOTO ADAPTATIVO</small></div><div className="badge">Probabilidades</div></header>
   <div className="heroText"><p>Primeiro teste real do motor pedagógico</p><h1>A A+ já tenta descobrir <em>porque erraste.</em></h1><span>Escolhe um dos três percursos abaixo e responde de propósito de maneiras diferentes para veres o motor mudar de caminho.</span></div>

   <div className="pathGrid">
    <button onClick={()=>startPath("conditioned")}><span>01</span><h3>Probabilidade condicionada</h3><p>Testa interpretação da condição vs aplicação da fórmula.</p><b>Começar →</b></button>
    <button onClick={()=>startPath("independence")}><span>02</span><h3>Independência</h3><p>Distingue confusão conceptual de erro de aplicação.</p><b>Começar →</b></button>
    <button onClick={()=>startPath("combinations")}><span>03</span><h3>Combinações</h3><p>Distingue noção de ordem de erro de cálculo.</p><b>Começar →</b></button>
   </div>

   <section className="card">
    <div className="cardTitle"><h3>Microcompetências atuais</h3><strong>Índice piloto {overall}/100</strong></div>
    {Object.entries(scores).map(([id,v])=><div className="scoreRow" key={id}><div><b>{MICRO[id].name}</b><small>{id}</small></div><div className="bar"><i style={{width:v+"%"}}/></div><strong>{v}</strong></div>)}
   </section>
 </section></main>
}

function Question({q,selected,feedback,answer,next,pathTitle}){
 return <main className="light"><section className="panel">
  <header><Logo/><span className="mode">{pathTitle}</span></header>
  <p className="eyebrow">MISSÃO AVALIATIVA · NÍVEL {q.level}</p>
  <h1>{q.text}</h1>
  <div className="opts">{q.opts.map((o,i)=>{
    let c="opt";
    if(selected===i)c+=" sel";
    if(feedback && i===q.answer)c+=" correct";
    if(feedback && selected===i && i!==q.answer)c+=" wrong";
    return <button className={c} key={i} onClick={()=>answer(i)}><span>{String.fromCharCode(65+i)}</span>{o}</button>
  })}</div>
  {feedback&&<div className={feedback.correct?"feedback good":"feedback bad"}><b>{feedback.correct?"Certo.":"A A+ detetou uma hipótese."}</b><span>{feedback.text}</span></div>}
  <button className="primary" disabled={selected===null} onClick={feedback?next:()=>{}}>{feedback?"Continuar":"Seleciona uma resposta"}</button>
 </section></main>
}

function Result({data,overall,home}){
 return <main className="light"><section className="panel result">
  <Logo/><div className="check">✓</div><p className="eyebrow">MISSÃO CONCLUÍDA</p><h1>{data.title}</h1>
  <p className="muted">A A+ só alterou a microcompetência para a qual encontrou evidência suficiente.</p>
  <div className="changes">{data.changes.map(c=><div key={c.micro}><div><b>{MICRO[c.micro].name}</b><small>{c.micro}</small></div><span>{data.before[c.micro]}</span><i>→</i><strong>{data.after[c.micro]}</strong><em className={c.delta>=0?"up":"down"}>{c.delta>=0?"+":""}{c.delta}</em><p>{c.reason}</p></div>)}</div>
  <div className="next"><span>PRÓXIMA DECISÃO DA A+</span><b>{data.nextMission}</b></div>
  <div className="overall"><span>Índice piloto atual</span><strong>{overall}/100</strong></div>
  <button className="primary" onClick={home}>Testar outro percurso</button>
 </section></main>
}
