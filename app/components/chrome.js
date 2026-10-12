// Componentes de apresentação extraídos de app/page.js (sem estado próprio,
// sem lógica de negócio). Primeiro passo de divisão do monólito.
import {Children,isValidElement,useState, useEffect} from "react";
import {isFriendsBeta, friendsBetaRequested} from "../lib/friendsBeta";
import {engagementSummary} from "../lib/engagement";
import {SECONDARY_EXAM_SUBJECTS} from "../data/subjects";

export const BrandName = ({className=""}) => (
  <span className={`brandName ${className}`.trim()} aria-label="APProva+">
    <span className="brandAP">AP</span><span className="brandProva">Prova</span><span className="brandPlus">+</span>
  </span>
);
export const Logo = () => <div className="logo"><BrandName/></div>;
const APRONSO_MOTION_CSS = `
@keyframes apronsoIdle {0%,100%{transform:translate3d(0,0,0) rotate(0deg)}50%{transform:translate3d(0,-2px,0) rotate(-.35deg)}}
@keyframes apronsoThink {0%,100%{transform:translate3d(0,0,0) rotate(0deg)}25%{transform:translate3d(0,-2px,0) rotate(-2deg)}55%{transform:translate3d(0,-1px,0) rotate(2deg)}75%{transform:translate3d(0,0,0) rotate(0deg)}}
@keyframes apronsoCelebrate {0%,100%{transform:translate3d(0,0,0) rotate(0deg) scale(1)}20%{transform:translate3d(0,-7px,0) rotate(-2deg) scale(1.01)}40%{transform:translate3d(0,0,0) rotate(2deg) scale(1)}60%{transform:translate3d(0,-5px,0) rotate(-1deg) scale(1.01)}80%{transform:translate3d(0,0,0) rotate(1deg) scale(1)}}
.apronso-motion-idle{animation:apronsoIdle 3.8s ease-in-out infinite;transform-origin:50% 90%}.apronso-motion-thinking{animation:apronsoThink 1.8s ease-in-out infinite;transform-origin:50% 90%}.apronso-motion-celebrate{animation:apronsoCelebrate 1.15s ease-out 1;transform-origin:50% 90%}@media(prefers-reduced-motion:reduce){.apronso-motion-idle,.apronso-motion-thinking,.apronso-motion-celebrate{animation:none!important}}
`;
function apronsoMotionClass(pose){return pose==="celebrate"?"apronso-motion-celebrate":pose==="thinking"?"apronso-motion-thinking":"apronso-motion-idle"}
export function Apronso({pose="welcome",className="",alt=""}){return <><style>{APRONSO_MOTION_CSS}</style><img className={`apronso ${apronsoMotionClass(pose)} ${className}`.trim()} src={`/mascot/apronso-${pose}.webp`} alt={alt}/></>}
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

export function StudySessionHeader({progress=0,label="",onExit,exitLabel="Guardar e sair"}){const width=Math.max(0,Math.min(100,Number(progress)||0));return <div className="focusTop sessionTop"><button type="button" onClick={onExit} aria-label={exitLabel}>×</button><div className="focusTrack"><i style={{width:`${width}%`}}/></div><span>{label}</span></div>}
export const STUDENT_NAV=[["home","Aprender"],["train","Treinar"],["ranking","Ranking"],["progress","Progresso"]];
function NavIcon({name}){const common={viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true"};if(name==="home")return <svg {...common}><path d="M3.5 10.5 12 3.8l8.5 6.7"/><path d="M5.5 9.8v10h13v-10"/><path d="M9.5 19.8v-6h5v6"/></svg>;if(name==="train")return <svg {...common}><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="m15.2 8.8 4.3-4.3"/><path d="M16.5 4.5h3v3"/></svg>;if(name==="ranking")return <svg {...common}><path d="M8 20v-6H4.5v6"/><path d="M13.75 20V9H10.25v11"/><path d="M19.5 20V4h-3.5v16"/></svg>;return <svg {...common}><path d="M4 18.5V13"/><path d="M9.3 18.5V9.5"/><path d="M14.7 18.5V6"/><path d="M20 18.5V3.5"/><path d="M3.5 20.5h17"/></svg>}
export function StudentNav({active,go}){return <nav className="studentNav" aria-label="Navegação principal">{STUDENT_NAV.map(([id,label])=><button type="button" key={id} className={active===id?"active":""} aria-current={active===id?"page":undefined} onClick={()=>go(id)}><span className="studentNavIcon"><NavIcon name={id}/></span><b>{label}</b></button>)}</nav>}
function latestPattern(progress){const now=Date.now();return Object.values(progress?.errorPatterns||{}).filter(x=>["recurring","improving"].includes(x?.status)&&x?.lastAt&&now-x.lastAt<=45*864e5).sort((a,b)=>(b.lastAt||0)-(a.lastAt||0)||(b.count||0)-(a.count||0))[0]||null}
export function StudentTop({s,go,children}){const daily=engagementSummary(s),subject=SECONDARY_EXAM_SUBJECTS.find(row=>row.id===s.activeSubjectId)||SECONDARY_EXAM_SUBJECTS[0],pattern=latestPattern(s.subjectProgress?.[subject.id]);return <><header className="studentTop"><div className="studentTopIdentity"><Logo/><button type="button" className="subjectSwitcher" onClick={()=>go("subjectManager")} aria-label={`Mudar de disciplina. Disciplina atual: ${subject.name}`}><span aria-hidden="true">{subject.icon}</span><b>{subject.shortName||subject.name}</b><i aria-hidden="true">⌄</i></button></div><div className="studentTopActions"><button type="button" onClick={()=>go("home")} aria-label={`Sequência: ${daily.streak} dias`}>🔥 <b>{daily.streak}</b></button>{!isFriendsBeta(s)&&<button type="button" onClick={()=>go("ranking")} aria-label={`${s.xp} XP`}>🏆 <b>{s.xp}</b></button>}{children}</div></header>{pattern&&<aside className="apronsoPatternInsight" aria-label="Padrão de aprendizagem identificado pelo Apronso"><b>🦉 O Apronso reparou num padrão</b><span><strong>{pattern.label}</strong> apareceu em {pattern.count} respostas. {pattern.status==="improving"?"Já estás a mostrar recuperação; vou continuar a confirmar.":pattern.message}</span><small>Isto é uma hipótese baseada no teu histórico, não uma conclusão definitiva. Deixa de ser destacada quando houver recuperação consistente.</small></aside>}</>}
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
function hasBack(children){let found=false;walk(children,child=>{if(child.type===Back)found=true});return found}
function currentScreen(){return typeof window!=="undefined"?window.history.state?.approvaScreen:null}
function retryApp(){if(typeof window!=="undefined")window.location.reload()}
function goSafeStart(){
  if(typeof window==="undefined")return;
  const query=window.location.search||"";
  window.location.assign(`/${query}`);
}
export const Shell=({children,className=""})=>{
  const screen=currentScreen();
  const text=childText(children);
  const fatalRecovery=/Não foi possível (?:recuperar esta sessão|ler o progresso guardado)/u.test(text);
  const autoBack=!!screen&&!ROOT_SCREENS.has(screen)&&!FOCUS_SCREENS.has(screen)&&!hasBack(children);
  return <main className={`light ${className}`.trim()}><FriendsBetaRibbon/>
    <section className="panel">
      {autoBack&&<button className="back" type="button" onClick={()=>{
        if(window.history.length>1)window.history.back();else goSafeStart();
      }}>← Voltar</button>}
      {children}
      {fatalRecovery&&<div className="recoveryActions" role="group" aria-label="Opções de recuperação">
        <button className="primary" type="button" onClick={retryApp}>Tentar novamente</button>
        <button className="secondary" type="button" onClick={goSafeStart}>Ir para o início</button>
      </div>}
    </section>
  </main>;
};
