"use client";
import {useEffect,useMemo,useState} from "react";

/*
  TAXONOMIA CENTRAL
  -----------------
  Esta é a única fonte de verdade de conteúdos no protótipo.
  Diagnóstico, Treino Livre e Progresso são todos gerados a partir daqui.
*/
const TAXONOMY = [
  {id:"10-ele",year:"10.º",name:"Modelos matemáticos nas eleições e partilha",short:"Eleições e partilha",focus:["Métodos de votação","Métodos de partilha","Interpretação de resultados"]},
  {id:"10-fin",year:"10.º",name:"Modelos matemáticos em finanças",short:"Matemática financeira",focus:["Juros","Capitalização","Modelação financeira"]},
  {id:"10-est",year:"10.º",name:"Estatística",short:"Estatística",focus:["Representações de dados","Medidas estatísticas","Interpretação de dados"]},
  {id:"10-gs",year:"10.º",name:"Geometria sintética",short:"Geometria sintética",focus:["Propriedades geométricas","Raciocínio geométrico","Resolução de problemas"]},
  {id:"10-fun",year:"10.º",name:"Funções",short:"Funções",focus:["Domínio e zeros","Representações","Monotonia e extremos"]},
  {id:"10-ga",year:"10.º",name:"Geometria analítica no plano e no espaço",short:"Geometria analítica",focus:["Coordenadas","Vetores","Retas e planos"]},

  {id:"11-trig",year:"11.º",name:"Trigonometria",short:"Trigonometria",focus:["Razões trigonométricas","Equações trigonométricas","Funções trigonométricas"]},
  {id:"11-pe",year:"11.º",name:"Produto escalar",short:"Produto escalar",focus:["Produto escalar","Perpendicularidade","Aplicações geométricas"]},
  {id:"11-cont",year:"11.º",name:"Contagem",short:"Contagem",focus:["Princípio multiplicativo","Ordem","Combinações"]},
  {id:"11-suc",year:"11.º",name:"Sucessões",short:"Sucessões",focus:["Termo geral","Progressões","Comportamento"]},
  {id:"11-fun",year:"11.º",name:"Funções",short:"Funções — 11.º",focus:["Transformações","Modelação","Interpretação gráfica"]},
  {id:"11-cd",year:"11.º",name:"Cálculo diferencial",short:"Cálculo diferencial",focus:["Derivadas","Taxa de variação","Monotonia e extremos","Otimização"]},

  {id:"12-cplx",year:"12.º",name:"Números complexos",short:"Números complexos",focus:["Forma algébrica","Módulo e argumento","Forma trigonométrica","Potências e raízes"]},
  {id:"12-prob",year:"12.º",name:"Probabilidade",short:"Probabilidades",focus:["Acontecimentos","Regra de Laplace","Probabilidade condicionada","Independência","Problemas mistos"]},
  {id:"12-expl",year:"12.º",name:"Funções exponenciais e logarítmicas",short:"Exponenciais e logaritmos",focus:["Exponenciais","Logaritmos","Equações","Modelação"]},
  {id:"12-fcd",year:"12.º",name:"Função composta e derivadas",short:"Função composta e derivadas",focus:["Composição","Regra da cadeia","Aplicações"]},
  {id:"12-fcont",year:"12.º",name:"Funções contínuas e deriváveis",short:"Continuidade e derivabilidade",focus:["Limites","Continuidade","Derivabilidade","Assíntotas"]},
  {id:"12-rae",year:"12.º",name:"Resolução aproximada de equações",short:"Resolução aproximada",focus:["Interpretação gráfica","Aproximações","Validação de soluções"]},
  {id:"12-ie",year:"12.º",name:"Introdução à inferência estatística",short:"Inferência estatística",focus:["Amostras","Estimativas","Interpretação inferencial"]},
  {id:"12-int",year:"12.º",name:"Primitivas imediatas e integrais definidos",short:"Primitivas e integrais",focus:["Primitivas","Integral definido","Áreas"]},
  {id:"12-mat",year:"12.º",name:"Matrizes",short:"Matrizes",focus:["Operações","Representação","Aplicações"]}
];

const initialScores = TAXONOMY.reduce((acc,t,i)=>{
  const base = [64,70,72,68,71,73,67,69,66,70,72,65,74,58,63,67,62,69,71,64,70][i];
  const conf = [35,38,40,34,55,42,40,38,52,41,44,49,48,43,36,39,41,33,30,35,32][i];
  acc[t.id] = {domain:base,conf};
  return acc;
},{});

const initial = {goal:17,xp:1240,streak:12,scores:initialScores};

const Q=[
["P(A∩B)=0,18 e P(B)=0,60. Quanto vale P(A|B)?",["0,30","0,108","0,42","0,78"],0,"P(A|B)=0,18/0,60=0,30."],
["Em P(A|B), qual é o universo relevante?",["O universo original","Apenas B","Apenas A","A∪B"],1,"A condição B restringe o universo relevante."],
["P(A|B)=0,25 e P(B)=0,60. Quanto vale P(A∩B)?",["0,15","0,35","0,40","0,85"],0,"0,25×0,60=0,15."]
];

const byYear = year => TAXONOMY.filter(t=>t.year===year);
const theme = id => TAXONOMY.find(t=>t.id===id);

export default function App(){
 const [s,setS]=useState(initial),[screen,setScreen]=useState("welcome");
 useEffect(()=>{try{let x=JSON.parse(localStorage.getItem("a12"));if(x){setS({...initial,...x,scores:{...initial.scores,...x.scores}});setScreen("home")}}catch{}},[]);
 useEffect(()=>{try{localStorage.setItem("a12",JSON.stringify(s))}catch{}},[s]);
 const go=x=>setScreen(x);
 if(screen==="welcome")return <Welcome go={go}/>;
 if(screen==="onboard")return <GoalScreen s={s} setS={setS} go={go} onboarding/>;
 if(screen==="goalSettings")return <GoalScreen s={s} setS={setS} go={go}/>;
 if(screen==="diag")return <Diag s={s} go={go}/>;
 if(screen==="mission")return <Mission s={s} setS={setS} go={go}/>;
 if(screen==="train")return <Train go={go}/>;
 if(screen==="progress")return <Progress s={s} go={go}/>;
 if(screen==="exams")return <Exams go={go}/>;
 if(screen==="parent")return <Parent go={go}/>;
 return <Home s={s} go={go} reset={()=>{localStorage.removeItem("a12");setS(initial);go("welcome")}}/>
}

const Logo=()=> <div className="logo">A<span>+</span> EXAMES</div>;

function Welcome({go}){return <main className="dark center"><section className="hero"><Logo/><p className="eyebrow">PREPARAÇÃO INTELIGENTE PARA EXAMES NACIONAIS</p><h1>A tua melhor nota<br/><em>começa aqui.</em></h1><p>A A+ descobre onde estás a perder pontos e decide o que vale mais a pena estudar hoje.</p><button onClick={()=>go("onboard")}>Descobrir o meu nível →</button><div className="features"><span>⚡ 10–20 min/dia</span><span>🎯 Adaptativo</span><span>📈 Progresso real</span></div></section></main>}

function GoalScreen({s,setS,go,onboarding=false}){
 const [goal,setGoal]=useState(s.goal);
 function save(){
   setS({...s,goal});
   go(onboarding?"diag":"home");
 }
 return <Shell><Logo/><p className="eyebrow">{onboarding?"O TEU OBJETIVO":"AJUSTAR OBJETIVO"}</p>
 <h1>Que nota queres alcançar?</h1>
 <p className="muted">{onboarding?"Isto ajusta a exigência das Missões. Não é uma previsão da tua nota.":"Podes alterar o teu objetivo quando quiseres. A A+ adapta as Missões seguintes, sem apagar o teu histórico."}</p>
 <div className="goalHero"><strong>{goal}</strong><span>valores</span></div>
 <div className="sliderLabels"><span>10</span><span>15</span><span>20</span></div>
 <input aria-label="Nota objetivo" className="goalSlider" type="range" min="10" max="20" step="1" value={goal} onChange={e=>setGoal(Number(e.target.value))}/>
 <div className="goalMessage"><b>{goal>=18?"Objetivo muito exigente":goal>=16?"Objetivo ambicioso":"Objetivo sólido"}</b><span>A dificuldade e profundidade do plano serão ajustadas progressivamente a este objetivo.</span></div>
 <button className="primary" onClick={save}>{onboarding?"Começar diagnóstico":"Guardar novo objetivo"}</button>
 {!onboarding&&<button className="secondary" onClick={()=>go("home")}>Cancelar</button>}
 </Shell>
}

function Diag({s,go}){
 const statusFor=(id)=>{
   const x=s.scores[id];
   if(x.conf>=50)return "done";
   if(x.conf>=40)return "active";
   return "todo";
 };
 return <Shell><Logo/><p className="eyebrow">DIAGNÓSTICO ADAPTATIVO</p><h1>A A+ está a construir o teu perfil.</h1>
 <p className="muted">A lista vem da mesma taxonomia usada no Treino e no Progresso. ✓ significa evidência suficiente; ● significa que a área está a ser avaliada; ○ significa que ainda falta evidência.</p>
 <div className="diagLegend"><span>✓ Evidência suficiente</span><span>● A avaliar</span><span>○ Por avaliar</span></div>
 {["10.º","11.º","12.º"].map(y=><div className="diagYear" key={y}><h3>{y} ano</h3><div className="diagGrid">
   {byYear(y).map(t=>{const st=statusFor(t.id);return <div className={"diagItem "+st} key={t.id}><b>{st==="done"?"✓":st==="active"?"●":"○"}</b><span>{t.short}</span></div>})}
 </div></div>)}
 <div className="notice"><b>Importante</b><span>Um diagnóstico adaptativo não precisa de fazer uma pergunta de todas as microcompetências. O motor aprofunda apenas onde a evidência é insuficiente ou contraditória.</span></div>
 <button className="primary" onClick={()=>go("home")}>Simular diagnóstico concluído →</button>
 </Shell>
}

function Home({s,go,reset}){
 const vals=Object.values(s.scores),avg=Math.round(vals.reduce((a,x)=>a+x.domain,0)/vals.length);
 const weakest=[...TAXONOMY].sort((a,b)=>s.scores[a.id].domain-s.scores[b.id].domain).slice(0,5);
 return <main className="dark"><section className="wrap"><header><div><Logo/><small>MATEMÁTICA A · PROTÓTIPO</small></div><div>🔥 {s.streak} dias · <b>{s.xp} XP</b></div></header>
 <div className="hello"><div><p>Boa noite 👋</p><h1>O que vamos conquistar hoje?</h1><button className="goalLink" onClick={()=>go("goalSettings")}>🎯 Objetivo: {s.goal} valores · Alterar</button></div><strong>{avg}<small>/100<br/>preparação</small></strong></div>
 <div className="mission"><div><small>🎯 MISSÃO DE HOJE · ~12 MIN</small><h2>Probabilidade condicionada</h2><p>É uma das tuas maiores oportunidades de evolução. A A+ considerou domínio, confiança, pré-requisitos e o teu objetivo de {s.goal} valores.</p></div><button onClick={()=>go("mission")}>Começar →</button></div>
 <div className="navgrid">{[["🧠","Treinar","Tema → foco → nível.","train"],["📝","Exames","Avaliação em contexto de prova.","exams"],["📈","Progresso","A mesma taxonomia, com domínio + confiança.","progress"],["👨‍👩‍👧","Área dos pais","Acompanhamento parental.","parent"]].map(x=><button key={x[1]} onClick={()=>go(x[3])}><b>{x[0]} {x[1]}</b><span>{x[2]}</span></button>)}</div>
 <div className="card"><h3>Prioridades atuais</h3>{weakest.map(t=>{const v=s.scores[t.id];return <div className="skill" key={t.id}><span>{t.short}</span><div className="bar"><i style={{width:v.domain+"%"}}/></div><b>{v.domain}</b><small>conf. {v.conf}%</small></div>})}</div>
 <button className="reset" onClick={reset}>Recomeçar protótipo</button></section></main>
}

function Mission({s,setS,go}){
 const [i,setI]=useState(0),[sel,setSel]=useState(null),[fb,setFb]=useState(null),[ok,setOk]=useState(0);let q=Q[i];
 function answer(n){if(fb)return;setSel(n);let c=n===q[2];if(c)setOk(ok+1);setFb(c?["good","✓ Correto",q[3]]:["bad","A A+ detetou uma hipótese.","A próxima evidência ajuda a distinguir uma falha de conceito de uma falha de cálculo."])}
 function next(){if(i<2){setI(i+1);setSel(null);setFb(null)}else{let ns=JSON.parse(JSON.stringify(s));let d=ok>=1?5:-4;ns.scores["12-prob"].domain=Math.max(0,Math.min(100,ns.scores["12-prob"].domain+d));ns.scores["12-prob"].conf=Math.min(96,ns.scores["12-prob"].conf+14);ns.xp+=110;setS(ns);go("progress")}}
 return <Shell><Logo/><div className="notice"><b>Porque esta pergunta?</b><span>A A+ está a recolher evidência sobre probabilidade condicionada. Uma resposta isolada nunca decide o teu nível.</span></div><p className="eyebrow">EVIDÊNCIA {i+1}</p><h2>{q[0]}</h2><div className="opts">{q[1].map((x,n)=><button key={x} className={(sel===n?"sel ":"")+(fb&&n===q[2]?"correct ":"")+(fb&&sel===n&&n!==q[2]?"wrong":"")} onClick={()=>answer(n)}><b>{String.fromCharCode(65+n)}</b>{x}</button>)}</div>{fb&&<div className={"feedback "+fb[0]}><b>{fb[1]}</b><span>{fb[2]}</span><small>Ver resolução passo a passo</small></div>}<button disabled={!fb} className="primary" onClick={next}>Continuar</button></Shell>
}

function Train({go}){
 const [year,setYear]=useState("12.º");
 const themes=byYear(year);
 const [themeId,setThemeId]=useState(themes[0].id);
 const current=theme(themeId) || themes[0];
 const [focus,setFocus]=useState(current.focus[0]);
 const [level,setLevel]=useState("auto");
 function changeYear(y){const first=byYear(y)[0];setYear(y);setThemeId(first.id);setFocus(first.focus[0])}
 function changeTheme(id){const t=theme(id);setThemeId(id);setFocus(t.focus[0])}
 return <Shell><Back go={go}/><p className="eyebrow">TREINO LIVRE</p><h1>O que queres praticar?</h1><p className="muted">Podes escolher livremente. <b>O treino não altera diretamente a avaliação A+.</b> A organização abaixo vem da mesma taxonomia usada no Diagnóstico e no Progresso.</p>
 <h3>1. Ano</h3><div className="chips">{["10.º","11.º","12.º"].map(y=><button key={y} className={year===y?"sel":""} onClick={()=>changeYear(y)}>{y}</button>)}</div>
 <h3>2. Tema</h3><div className="themeGrid">{themes.map(t=><button key={t.id} className={themeId===t.id?"sel":""} onClick={()=>changeTheme(t.id)}>{t.short}</button>)}</div>
 <h3>3. Em que queres focar-te?</h3><div className="chips">{current.focus.map(x=><button key={x} className={focus===x?"sel":""} onClick={()=>setFocus(x)}>{x}</button>)}</div>
 <h3>4. Nível</h3><div className="levelGrid">{[["auto","✨","Adaptado ao meu nível"],["basic","🟢","Básico"],["mid","🔵","Intermédio"],["adv","🟣","Avançado"],["challenge","🔥","Desafio"]].map(x=><button key={x[0]} className={level===x[0]?"sel":""} onClick={()=>setLevel(x[0])}><span>{x[1]}</span><b>{x[2]}</b></button>)}</div>
 <div className="trainingSummary"><b>{current.short} → {focus}</b><span>{level==="auto"?"A A+ escolhe a dificuldade adequada ao teu nível.":"Escolheste manualmente a dificuldade. O resultado continua sem alterar diretamente o teu domínio."}</span></div>
 <button className="primary" onClick={()=>go("home")}>Simular treino concluído</button>
 </Shell>
}

function Progress({s,go}){
 const [year,setYear]=useState("12.º");
 return <Shell><Back go={go}/><p className="eyebrow">PROGRESSO</p><h1>O mesmo mapa de conhecimento, agora visto através do teu desempenho.</h1>
 <div className="chips">{["10.º","11.º","12.º"].map(y=><button key={y} className={year===y?"sel":""} onClick={()=>setYear(y)}>{y}</button>)}</div>
 {byYear(year).map(t=>{const v=s.scores[t.id];return <div className="prog" key={t.id}><div className="progHead"><b>{t.short}</b><small>{t.name}</small></div><span>Domínio {v.domain}</span><div className="bar"><i style={{width:v.domain+"%"}}/></div><span>Confiança {v.conf}%</span><div className="bar green"><i style={{width:v.conf+"%"}}/></div></div>})}
 <div className="notice"><b>Porque separar domínio de confiança?</b><span>Um 80/100 baseado em pouca evidência não vale o mesmo que um 80/100 confirmado em vários formatos e momentos.</span></div>
 </Shell>
}

function Exams({go}){return <Shell><Back go={go}/><p className="eyebrow">EXAMES</p><h1>Avaliação em contexto de prova.</h1><div className="exam"><b>⚡ Mini-exame</b><span>15–25 min · várias competências da taxonomia</span></div><div className="exam"><b>📝 Exame de treino A+</b><span>Prova completa criada para o teu nível</span></div><div className="exam locked"><b>🏛️ Exames oficiais</b><span>🔒 A aguardar esclarecimento sobre utilização dos conteúdos oficiais</span></div><div className="notice"><b>Mais tarde</b><span>Respostas desenvolvidas em papel, fotografia e correção assistida por IA exigem uma camada própria de controlo de qualidade. Não entra na primeira beta.</span></div></Shell>}

function Parent({go}){return <Shell><Back go={go}/><p className="eyebrow">ÁREA DOS PAIS · PRÉ-VISUALIZAÇÃO</p><h1>Acompanhar progresso, não vigiar respostas.</h1><div className="parent"><div><b>Aluno ligado</b><span>Matemática A</span></div><strong>68<small>/100</small></strong></div><div className="metrics"><div><b>🔥 12</b><span>dias</span></div><div><b>4/5</b><span>missões</span></div><div><b>+6</b><span>evolução</span></div></div><div className="notice"><b>Ligação segura</b><span>O aluno envia um convite. Não haverá pesquisa pública de utilizadores. Os pais recebem progresso, exames de treino, tempo de estudo e evolução.</span></div></Shell>}

function Back({go}){return <button className="back" onClick={()=>go("home")}>← Voltar</button>}
function Shell({children}){return <main className="light"><section className="panel">{children}</section></main>}
