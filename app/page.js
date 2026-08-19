"use client";
import {useMemo,useState} from "react";

const MC={
 c:{name:"Probabilidade condicionada",domain:58,conf:43},
 i:{name:"Independência",domain:64,conf:48},
 k:{name:"Combinações",domain:68,conf:55}
};
const BANK={
 c:[
  {id:"C1",d:2,type:"interpretação",q:"60% dos alunos estudam Matemática e 30% estudam Matemática e Física. Sabendo que um aluno estuda Matemática, qual é a probabilidade de também estudar Física?",o:["0,18","0,30","0,50","0,90"],a:2,sol:"Restringimos o universo aos alunos de Matemática: 0,30 ÷ 0,60 = 0,50.",wrong:"Pode haver dificuldade em interpretar qual é o universo depois de aplicada a condição."},
  {id:"C2",d:1,type:"conceito",q:"Numa turma de 20 alunos, 10 estudam Matemática e 4 desses 10 também Física. Em P(Física | Matemática), qual é o universo relevante?",o:["20 alunos","10 alunos","4 alunos","16 alunos"],a:1,sol:"A condição é «estuda Matemática», portanto trabalhamos apenas dentro dos 10 alunos que satisfazem essa condição.",wrong:"A condição parece ainda não estar a restringir corretamente o universo."},
  {id:"C3",d:2,type:"cálculo",q:"Entre 15 pessoas com carta de condução, 6 têm carro elétrico. Quanto vale P(elétrico | carta de condução)?",o:["2/5","6/21","3/5","5/6"],a:0,sol:"Dentro das 15 pessoas condicionadas, 6 são favoráveis: 6/15 = 2/5.",wrong:"A interpretação pode estar correta, mas a execução da probabilidade condicionada precisa de confirmação."},
  {id:"C4",d:3,type:"contexto",q:"P(B)=0,40 e P(A∩B)=0,12. Qual é P(A|B)?",o:["0,28","0,30","0,48","0,52"],a:1,sol:"P(A|B)=P(A∩B)/P(B)=0,12/0,40=0,30.",wrong:"Esta questão combina interpretação e cálculo num nível superior."},
  {id:"C5",d:3,type:"inversão",q:"P(A|B)=0,25 e P(B)=0,60. Quanto vale P(A∩B)?",o:["0,15","0,35","0,40","0,85"],a:0,sol:"P(A∩B)=P(A|B)×P(B)=0,25×0,60=0,15.",wrong:"Pode existir dificuldade em reorganizar a relação da probabilidade condicionada."}
 ],
 i:[
  {id:"I1",d:2,type:"aplicação",q:"P(A)=0,4, P(B)=0,5 e P(A∩B)=0,2. A e B são independentes?",o:["Sim","Não","Só se forem incompatíveis","Não há dados"],a:0,sol:"0,4×0,5=0,2=P(A∩B), logo satisfazem o critério de independência.",wrong:"Pode haver confusão entre o critério de independência e incompatibilidade."},
  {id:"I2",d:1,type:"conceito",q:"Dois acontecimentos independentes podem ocorrer simultaneamente?",o:["Sim","Não","Só se forem equiprováveis","Só se forem complementares"],a:0,sol:"Sim. Independência significa que um não altera a probabilidade do outro; não significa que não possam ocorrer juntos.",wrong:"Há sinais de confusão entre independência e acontecimentos incompatíveis."},
  {id:"I3",d:2,type:"cálculo",q:"A e B são independentes, P(A)=0,3 e P(B)=0,4. Quanto vale P(A∩B)?",o:["0,12","0,70","0,10","0,34"],a:0,sol:"Sendo independentes, P(A∩B)=P(A)×P(B)=0,3×0,4=0,12.",wrong:"O conceito pode estar presente, mas a aplicação do produto precisa de confirmação."},
  {id:"I4",d:3,type:"interpretação",q:"Se P(A|B)=P(A) e P(B)>0, qual é a conclusão correta?",o:["A e B são independentes","A e B são incompatíveis","A=B","B é impossível"],a:0,sol:"Se conhecer B não altera P(A), então A e B são independentes.",wrong:"É uma formulação diferente do mesmo conceito; precisamos de mais evidência."}
 ],
 k:[
  {id:"K1",d:2,type:"aplicação",q:"De 5 alunos, quantas equipas diferentes de 2 podem ser formadas?",o:["10","20","25","5"],a:0,sol:"A ordem não interessa: C(5,2)=5!/(2!3!)=10.",wrong:"Pode estar a confundir uma seleção sem ordem com um arranjo."},
  {id:"K2",d:1,type:"conceito",q:"Ao escolher Ana e Rui para uma equipa, escolher Rui e Ana produz uma equipa diferente?",o:["Não","Sim","Depende da ordem alfabética","Só em grupos grandes"],a:0,sol:"Não. Os elementos são os mesmos; logo a ordem não cria uma nova equipa.",wrong:"A noção de que a ordem não interessa ainda precisa de confirmação."},
  {id:"K3",d:2,type:"cálculo",q:"Quanto vale C(6,2)?",o:["15","12","30","8"],a:0,sol:"C(6,2)=6×5/(2×1)=15.",wrong:"O conceito de combinação pode estar correto, mas o cálculo precisa de confirmação."},
  {id:"K4",d:3,type:"contexto",q:"Uma comissão de 3 pessoas é escolhida entre 7. Quantas comissões diferentes existem?",o:["35","210","21","343"],a:0,sol:"Como a ordem dos membros não interessa, C(7,3)=35.",wrong:"Esta questão testa se reconheces e aplicas combinações num contexto diferente."}
 ]
};

export default function Page(){
 const [state,setState]=useState(MC),[view,setView]=useState("home"),[key,setKey]=useState(null);
 const [idx,setIdx]=useState(0),[sel,setSel]=useState(null),[fb,setFb]=useState(null),[ev,setEv]=useState([]);
 const [start,setStart]=useState(null),[result,setResult]=useState(null);
 const avg=useMemo(()=>Math.round(Object.values(state).reduce((s,x)=>s+x.domain,0)/3),[state]);

 function begin(k){setKey(k);setIdx(0);setSel(null);setFb(null);setEv([]);setStart({...state[k]});setView("q")}
 function answer(i){if(fb)return;let q=BANK[key][idx],ok=i===q.a;setSel(i);setFb({ok,msg:ok?q.sol:q.wrong})}
 function quality(evidence){
   let correct=evidence.filter(x=>x.ok).length, diverse=new Set(evidence.map(x=>x.type)).size, hard=evidence.filter(x=>x.ok&&x.d>=3).length;
   return {correct,diverse,hard};
 }
 function advance(){
   let q=BANK[key][idx], evidence=[...ev,{ok:sel===q.a,d:q.d,type:q.type,id:q.id}], m=quality(evidence);
   setEv(evidence);
   // Adaptive stop: strong consistent evidence; confirmed weakness; otherwise continue up to bank limit.
   let stop=false, reason="";
   if(evidence.length>=3 && m.correct===evidence.length && m.diverse>=3){stop=true;reason="Domínio demonstrado em evidências diferentes."}
   else if(evidence.length>=3 && m.correct<=1){stop=true;reason="Dificuldade confirmada por múltiplas evidências."}
   else if(evidence.length>=4 && m.correct>=3 && m.diverse>=3){stop=true;reason="Evidência suficiente apesar de uma resposta contraditória."}
   else if(idx>=BANK[key].length-1){stop=true;reason="Atingido o limite desta Missão piloto."}
   if(stop){finish(evidence,reason);return}
   setIdx(idx+1);setSel(null);setFb(null)
 }
 function finish(evidence,reason){
   let m=quality(evidence), old=state[key], ratio=m.correct/evidence.length;
   let deltaD= ratio>=.8 ? (m.hard?7:5) : ratio<=.4 ? -7 : ratio>=.6 ? 2 : -2;
   let diversityBonus=Math.min(18,m.diverse*5), evidenceBonus=Math.min(20,evidence.length*4);
   let newConf=Math.min(96, Math.max(old.conf, old.conf + diversityBonus + evidenceBonus - (ratio>.4&&ratio<.8?10:0)));
   let newDomain=Math.max(0,Math.min(100,old.domain+deltaD));
   let ns={...state,[key]:{...old,domain:newDomain,conf:newConf}};
   setState(ns);
   setResult({old,newDomain,newConf,evidence,reason,ratio,m});
   setView("result")
 }
 if(view==="q") return <Question q={BANK[key][idx]} n={idx+1} sel={sel} fb={fb} answer={answer} advance={advance} evidence={ev}/>;
 if(view==="result") return <Result data={result} item={state[key]} home={()=>setView("home")} again={()=>begin(key)}/>;
 return <Home state={state} avg={avg} begin={begin}/>;
}
function Logo(){return <div className="logo">A<span>+</span> EXAMES</div>}
function Home({state,avg,begin}){return <main className="dark"><section className="wrap"><header><div><Logo/><small>MOTOR ADAPTATIVO · v0.6</small></div><div className="pill">Índice piloto {avg}/100</div></header>
<div className="hero"><p>DOMÍNIO + CONFIANÇA + EVIDÊNCIA</p><h1>A Missão já não termina <em>porque acabou o questionário.</em></h1><span>Termina quando a A+ considera que reuniu evidência suficiente — ou quando atinge um limite de segurança.</span></div>
<div className="cards">{Object.entries(state).map(([k,x])=><button key={k} onClick={()=>begin(k)}><b>{x.name}</b><div className="metric"><span>Domínio</span><strong>{x.domain}</strong></div><div className="meter"><i style={{width:x.domain+"%"}}/></div><div className="metric"><span>Confiança</span><strong>{x.conf}%</strong></div><div className="meter confidence"><i style={{width:x.conf+"%"}}/></div><small>Começar Missão adaptativa →</small></button>)}</div>
<section className="rule"><b>Regra desta versão</b><span>Acertar uma pergunta nunca confirma domínio. A A+ procura evidências diferentes e aumenta a duração quando os resultados são contraditórios.</span></section>
</section></main>}
function Question({q,n,sel,fb,answer,advance,evidence}){return <main className="light"><section className="panel"><header><Logo/><span className="mode">QUESTÃO {n} · D{q.d}</span></header>
<div className="progress"><i style={{width:Math.min(100,(n/5)*100)+"%"}}/></div><p className="eyebrow">{q.type.toUpperCase()}</p><h1>{q.q}</h1>
<div className="opts">{q.o.map((x,i)=>{let c="opt";if(sel===i)c+=" sel";if(fb&&i===q.a)c+=" correct";if(fb&&sel===i&&i!==q.a)c+=" wrong";return <button className={c} key={i} onClick={()=>answer(i)}><span>{String.fromCharCode(65+i)}</span>{x}</button>})}</div>
{fb&&<div className={fb.ok?"feedback good":"feedback bad"}><b>{fb.ok?"✓ Correto":"A A+ detetou uma hipótese."}</b><span>{fb.msg}</span><button>Ver resolução passo a passo</button></div>}
<div className="tiny">Evidências recolhidas nesta Missão: <b>{evidence.length+(fb?1:0)}</b> · A duração adapta-se às tuas respostas.</div>
<button className="primary" disabled={!fb} onClick={advance}>Continuar</button></section></main>}
function Result({data,item,home,again}){let up=data.newDomain-data.old.domain, cu=data.newConf-data.old.conf;return <main className="light"><section className="panel result"><Logo/><div className="check">✓</div><p className="eyebrow">MISSÃO TERMINADA PELA A+</p><h1>{item.name}</h1>
<div className="why"><b>Porque terminou agora?</b><span>{data.reason}</span></div>
<div className="compare"><div><span>Domínio</span><b>{data.old.domain} → {data.newDomain}</b><em className={up>=0?"up":"down"}>{up>=0?"+":""}{up}</em></div><div><span>Confiança</span><b>{data.old.conf}% → {data.newConf}%</b><em className={cu>=0?"up":"down"}>{cu>=0?"+":""}{cu}%</em></div><div><span>Evidências</span><b>{data.evidence.length}</b><em>{data.m.diverse} tipos</em></div></div>
<div className="explain"><b>Porque tomou a A+ esta decisão?</b><span>{data.ratio>=.8?"Demonstraste desempenho consistente em formulações diferentes. A estimativa de domínio subiu e temos agora mais confiança nela.":data.ratio<=.4?"A dificuldade repetiu-se em mais do que uma evidência. A A+ reduziu o domínio estimado em vez de tratar o primeiro erro como um caso isolado.":"As respostas foram parcialmente contraditórias. A alteração de domínio foi pequena; a A+ evita tirar uma conclusão forte enquanto a evidência não for consistente."}</span></div>
<button className="primary" onClick={home}>Voltar ao painel</button><button className="secondary" onClick={again}>Repetir percurso com outras respostas</button></section></main>}
