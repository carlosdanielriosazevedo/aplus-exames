// Componentes de apresentação extraídos de app/page.js (sem estado próprio,
// sem lógica de negócio). Primeiro passo de divisão do monólito.
import {Children,cloneElement,isValidElement,useState,useEffect,useRef} from "react";
import {isFriendsBeta, friendsBetaRequested} from "../lib/friendsBeta";
import {engagementSummary} from "../lib/engagement";
import {SECONDARY_EXAM_SUBJECTS} from "../data/subjects";

export const BrandName = ({className=""}) => (
  <span className={`brandName ${className}`.trim()} aria-label="APProva+">
    <span className="brandAP">AP</span><span className="brandProva">Prova</span><span className="brandPlus">+</span>
  </span>
);
export const Logo = () => <div className="logo"><BrandName/></div>;
function apronsoMotionClass(pose){return pose==="celebrate"?"apronso-motion-celebrate":pose==="thinking"?"apronso-motion-thinking":"apronso-motion-idle"}
export function Apronso({pose="welcome",className="",alt=""}){return <img className={`apronso ${apronsoMotionClass(pose)} ${className}`.trim()} src={`/mascot/apronso-${pose}.webp`} alt={alt}/>}
export function ApronsoNudge({pose="thinking",tone="light",children}){return <aside className={`apronsoNudge ${tone}`}><Apronso pose={pose} alt=""/><p>{children}</p></aside>}

function safePrevious(go,to){
  if(to){go(to);return}
  if(typeof window!=="undefined"&&window.history.state?.approvaScreen&&window.history.length>1){
    window.history.back();
    return;
  }
  go("home");
}
export const Back=({go,to})=><button className="back" type="button" onClick={()=>safePrevious(go,to)}>← Voltar</button>;

function runExitReplacingSessionEntry(onExit){
  if(typeof window==="undefined"){onExit?.();return}
  const originalPush=window.history.pushState.bind(window.history);
  const originalReplace=window.history.replaceState.bind(window.history);
  let intercepted=false;
  window.history.pushState=(state,title,url)=>{
    intercepted=true;
    originalReplace({...state,approvaSessionGuard:false},title,url);
  };
  try{onExit?.()}finally{window.history.pushState=originalPush}
  if(!intercepted&&window.history.state?.approvaSessionGuard){
    originalReplace({...window.history.state,approvaSessionGuard:false},"");
  }
}

export function StudySessionHeader({progress=0,label="",onExit,exitLabel="Sair da sessão"}){
  const width=Math.max(0,Math.min(100,Number(progress)||0));
  const onExitRef=useRef(onExit);
  const leavingRef=useRef(false);
  useEffect(()=>{onExitRef.current=onExit},[onExit]);
  useEffect(()=>{
    if(typeof window==="undefined")return;
    const base={...window.history.state,approvaSessionGuard:false};
    if(!window.history.state?.approvaSessionGuard){
      window.history.pushState({...base,approvaSessionGuard:true},"");
    }
    const finish=()=>runExitReplacingSessionEntry(onExitRef.current);
    const onPop=event=>{
      if(event.state?.approvaSessionGuard)return;
      if(leavingRef.current){leavingRef.current=false;finish();return}
      const safeDraft=exitLabel==="Guardar e sair";
      const message=safeDraft
        ?"Guardar e sair desta sessão? O progresso já registado fica guardado."
        :"Sair desta sessão? O progresso já submetido fica guardado. Se ainda não carregaste em Responder, a resposta atual pode não ficar guardada.";
      if(window.confirm(message))finish();
      else window.history.pushState({...event.state,approvaSessionGuard:true},"");
    };
    window.addEventListener("popstate",onPop);
    return ()=>window.removeEventListener("popstate",onPop);
  },[exitLabel]);
  const safeExit=()=>{
    if(typeof window==="undefined"){onExitRef.current?.();return}
    const safeDraft=exitLabel==="Guardar e sair";
    const message=safeDraft
      ?"Guardar e sair desta sessão? O progresso já registado fica guardado."
      :"Sair desta sessão? O progresso já submetido fica guardado. Se ainda não carregaste em Responder, a resposta atual pode não ficar guardada.";
    if(!window.confirm(message))return;
    if(window.history.state?.approvaSessionGuard){leavingRef.current=true;window.history.back();return}
    runExitReplacingSessionEntry(onExitRef.current);
  };
  return <div className="focusTop sessionTop"><button type="button" onClick={safeExit} aria-label={exitLabel}>×</button><div className="focusTrack"><i style={{width:`${width}%`}}/></div><span>{label&&<>{label} · </>}<strong data-session-progress>{Math.round(width)}%</strong></span></div>
}
export const STUDENT_NAV=[["home","Aprender"],["train","Treinar"],["ranking","Ranking"],["progress","Progresso"]];
function NavIcon({name}){const common={viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true"};if(name==="home")return <svg {...common}><path d="M3.5 10.5 12 3.8l8.5 6.7"/><path d="M5.5 9.8v10h13v-10"/><path d="M9.5 19.8v-6h5v6"/></svg>;if(name==="train")return <svg {...common}><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="m15.2 8.8 4.3-4.3"/><path d="M16.5 4.5h3v3"/></svg>;if(name==="ranking")return <svg {...common}><path d="M8 20v-6H4.5v6"/><path d="M13.75 20V9H10.25v11"/><path d="M19.5 20V4h-3.5v16"/></svg>;return <svg {...common}><path d="M4 18.5V13"/><path d="M9.3 18.5V9.5"/><path d="M14.7 18.5V6"/><path d="M20 18.5V3.5"/><path d="M3.5 20.5h17"/></svg>}
export function StudentNav({active,go}){return <nav className="studentNav" aria-label="Navegação principal">{STUDENT_NAV.map(([id,label])=><button type="button" key={id} className={active===id?"active":""} aria-current={active===id?"page":undefined} onClick={()=>go(id)}><span className="studentNavIcon"><NavIcon name={id}/></span><b>{label}</b></button>)}</nav>}
function latestPattern(progress){const now=Date.now();return Object.values(progress?.errorPatterns||{}).filter(x=>["recurring","improving"].includes(x?.status)&&x?.lastAt&&now-x.lastAt<=45*864e5).sort((a,b)=>(b.lastAt||0)-(a.lastAt||0)||(b.count||0)-(a.count||0))[0]||null}
function augmentStudentMenu(children,go,s,subjectId){
  if(subjectId!=="physics-chemistry-a"||!isValidElement(children))return children;
  const parts=Children.toArray(children.props.children),index=parts.findIndex(child=>isValidElement(child)&&child.type==="div");
  if(index<0)return children;
  const body=parts[index],extras=[
    <button key="core-apronso" type="button" onClick={()=>go("apronsoIntro")}>Apronso e como funciona a app</button>,
    isFriendsBeta(s)?<button key="core-beta" type="button" onClick={()=>go("friendsBetaInfo")}>Informação do teste</button>:<button key="core-account" type="button" onClick={()=>go("account")}>Conta e progresso</button>,
    <button key="core-parent" type="button" onClick={()=>go("parent")}>Área dos pais</button>
  ];
  parts[index]=cloneElement(body,body.props,[...Children.toArray(body.props.children),...extras]);
  return cloneElement(children,children.props,parts);
}
export function StudentTop({s,go,children}){const daily=engagementSummary(s),subject=SECONDARY_EXAM_SUBJECTS.find(row=>row.id===s.activeSubjectId)||SECONDARY_EXAM_SUBJECTS[0],pattern=latestPattern(s.subjectProgress?.[subject.id]),menu=children?augmentStudentMenu(children,go,s,subject.id):<details className="studentMenu"><summary aria-label="Abrir menu">•••</summary><div><button type="button" onClick={()=>go("curriculumSettings")}>Matéria dada na escola</button><button type="button" onClick={()=>go("profileSettings")}>Ano e percurso escolar</button><button type="button" onClick={()=>go("goalSettings")}>Objetivo da disciplina</button><button type="button" onClick={()=>go("apronsoIntro")}>Apronso e como funciona a app</button>{isFriendsBeta(s)?<button type="button" onClick={()=>go("friendsBetaInfo")}>Informação do teste</button>:<button type="button" onClick={()=>go("account")}>Conta e progresso</button>}<button type="button" onClick={()=>go("parent")}>Área dos pais</button></div></details>;return <><header className="studentTop"><div className="studentTopIdentity"><Logo/><button type="button" className="subjectSwitcher" onClick={()=>go("subjectManager")} aria-label={`Mudar de disciplina. Disciplina atual: ${subject.name}`}><span aria-hidden="true">{subject.icon}</span><b>{subject.shortName||subject.name}</b><i aria-hidden="true">⌄</i></button></div><div className="studentTopActions"><button type="button" onClick={()=>go("home")} aria-label={`Sequência: ${daily.streak} dias`}>🔥 <b>{daily.streak}</b></button>{!isFriendsBeta(s)&&<button type="button" onClick={()=>go("ranking")} aria-label={`${s.xp} XP`}>🏆 <b>{s.xp}</b></button>}{menu}</div></header>{pattern&&<aside className="apronsoPatternInsight" aria-label="Padrão de aprendizagem identificado pelo Apronso"><b>🦉 O Apronso reparou num padrão</b><span><strong>{pattern.label}</strong> apareceu em {pattern.count} respostas. {pattern.status==="improving"?"Já estás a mostrar recuperação; vou continuar a confirmar.":pattern.message}</span><small>Isto é uma hipótese baseada no teu histórico, não uma conclusão definitiva. Deixa de ser destacada quando houver recuperação consistente.</small></aside>}</>}
export function FriendsBetaRibbon({s}){const [queryActive,setQueryActive]=useState(false);useEffect(()=>setQueryActive(friendsBetaRequested(window.location.search)),[]);if(!(isFriendsBeta(s)||queryActive))return null;return <div className="friendsBetaRibbon"><b>🧪 TESTE PRIVADO</b><span>Conteúdo ainda em revisão · resultados provisórios</span></div>}

const ROOT_SCREENS=new Set(["welcome","home","train","ranking","progress","exams"]);
const FOCUS_SCREENS=new Set(["diagRun","mission","trainingRun","miniExamRun","miniExamReview","portugueseMiniExam","physicsChemistryExam","physicsChemistryMini1","physicsChemistryMini2"]);
function walk(children,visit){
  Children.forEach(children,child=>{
    if(!isValidElement(child))return;
    visit(child);
    if(child.props?.children)walk(child.props.children,visit);
  });
}
function childText(children){
  let text="";
  Children.forEach(children,child=>{
    if(typeof child==="string"||typeof child==="number")text+=` ${child}`;
    else if(isValidElement(child)&&child.props?.children)text+=` ${childText(child.props.children)}`;
  });
  return text;
}
function hasBack(children){let found=false;walk(children,child=>{if(child.type===Back||child.type===StudySessionHeader)found=true});return found}
function currentScreen(){return typeof window!=="undefined"?window.history.state?.approvaScreen:null}
function retryApp(){if(typeof window!=="undefined")window.location.reload()}
function goSafeStart(){
  if(typeof window==="undefined")return;
  const query=window.location.search||"";
  window.location.assign(`/${query}`);
}
function goSafeScreen(screen){
  const state={...(window.history.state||{}),approvaScreen:screen,approvaSessionGuard:false};
  window.history.replaceState(state,"");
  window.dispatchEvent(new PopStateEvent("popstate",{state}));
}
export const Shell=({children,className=""})=>{
  const screen=currentScreen();
  const text=childText(children);
  const fatalRecovery=/Não foi possível (?:recuperar esta sessão|ler o progresso guardado)/u.test(text);
  const diagnosticRecovery=/Não foi possível recuperar esta sessão/u.test(text)||(/Estamos a confirmar o teu progresso/u.test(text)&&/Tentar novamente/u.test(text));
  const diagnosticStartFailure=/Não foi possível guardar o progresso/u.test(text);
  const autoBack=!!screen&&!ROOT_SCREENS.has(screen)&&!FOCUS_SCREENS.has(screen)&&!hasBack(children);
  const recoveryAnnouncement=diagnosticStartFailure?"Não foi possível guardar o progresso. Podes tentar novamente ou voltar ao menu inicial.":diagnosticRecovery?"Não foi possível recuperar esta sessão. Podes tentar novamente. A tentativa guardada mantém-se.":fatalRecovery?"Ocorreu um problema ao recuperar o progresso. Podes tentar novamente ou voltar ao início.":"";
  return <main className={`light ${className}`.trim()}><FriendsBetaRibbon/>
    <section className="panel">
      {recoveryAnnouncement&&<p className="srOnly" role="alert">{recoveryAnnouncement}</p>}
      {autoBack&&<button className="back" type="button" onClick={()=>{
        if(window.history.length>1)window.history.back();else goSafeStart();
      }}>← Voltar</button>}
      {children}
      {diagnosticStartFailure&&<div className="recoveryActions" role="group" aria-label="Sair do diagnóstico" style={{display:"grid",gap:10,marginTop:18}}>
        <button className="secondary" type="button" onClick={()=>goSafeScreen("home")}>Ir para o menu inicial</button>
      </div>}
      {fatalRecovery&&<div className="recoveryActions" role="group" aria-label="Opções de recuperação" style={{display:"grid",gap:10,marginTop:18}}>
        <button className="primary" type="button" onClick={retryApp}>Tentar novamente</button>
        <button className="secondary" type="button" onClick={goSafeStart}>Ir para o início</button>
      </div>}
    </section>
  </main>;
};