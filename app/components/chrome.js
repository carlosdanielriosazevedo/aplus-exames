// Componentes de apresentação extraídos de app/page.js (sem estado próprio,
// sem lógica de negócio). Primeiro passo de divisão do monólito.
import {useState, useEffect} from "react";
import {isFriendsBeta, friendsBetaRequested} from "../lib/friendsBeta";

export const BrandName = ({className=""}) => (
  <span className={`brandName ${className}`.trim()} aria-label="APProva+">
    <span className="brandAP">AP</span><span className="brandProva">Prova</span><span className="brandPlus">+</span>
  </span>
);

export const Logo = () => <div className="logo"><BrandName/></div>;

const APRONSO_MOTION_CSS = `
@keyframes apronsoIdle {
  0%,100% { transform: translate3d(0,0,0) rotate(0deg); }
  50% { transform: translate3d(0,-2px,0) rotate(-0.35deg); }
}
@keyframes apronsoThink {
  0%,100% { transform: translate3d(0,0,0) rotate(0deg); }
  25% { transform: translate3d(0,-2px,0) rotate(-2deg); }
  55% { transform: translate3d(0,-1px,0) rotate(2deg); }
  75% { transform: translate3d(0,0,0) rotate(0deg); }
}
@keyframes apronsoCelebrate {
  0%,100% { transform: translate3d(0,0,0) rotate(0deg) scale(1); }
  20% { transform: translate3d(0,-7px,0) rotate(-2deg) scale(1.01); }
  40% { transform: translate3d(0,0,0) rotate(2deg) scale(1); }
  60% { transform: translate3d(0,-5px,0) rotate(-1deg) scale(1.01); }
  80% { transform: translate3d(0,0,0) rotate(1deg) scale(1); }
}
.apronso-motion-idle { animation: apronsoIdle 3.8s ease-in-out infinite; transform-origin: 50% 90%; }
.apronso-motion-thinking { animation: apronsoThink 1.8s ease-in-out infinite; transform-origin: 50% 90%; }
.apronso-motion-celebrate { animation: apronsoCelebrate 1.15s ease-out 1; transform-origin: 50% 90%; }
@media (prefers-reduced-motion: reduce) {
  .apronso-motion-idle,
  .apronso-motion-thinking,
  .apronso-motion-celebrate { animation: none !important; }
}
`;

function apronsoMotionClass(pose){
  if(pose==="celebrate") return "apronso-motion-celebrate";
  if(pose==="thinking") return "apronso-motion-thinking";
  return "apronso-motion-idle";
}

export function Apronso({pose="welcome", className="", alt=""}){
  return <>
    <style>{APRONSO_MOTION_CSS}</style>
    <img className={`apronso ${apronsoMotionClass(pose)} ${className}`.trim()} src={`/mascot/apronso-${pose}.webp`} alt={alt}/>
  </>;
}

export function ApronsoNudge({pose="thinking", tone="light", children}){
  return <aside className={`apronsoNudge ${tone}`}><Apronso pose={pose} alt=""/><p>{children}</p></aside>;
}

export const Back = ({go, to="home"}) => <button className="back" onClick={()=>go(to)}>← Voltar</button>;

export const STUDENT_NAV = [["home","⌂","Aprender"],["train","◎","Treinar"],["ranking","△","Ranking"],["progress","◫","Progresso"]];

export function StudentNav({active, go}){
  return (
    <nav className="studentNav" aria-label="Navegação principal">
      {STUDENT_NAV.map(([id,icon,label]) => (
        <button type="button" key={id} className={active===id?"active":""} aria-current={active===id?"page":undefined} onClick={()=>go(id)}>
          <span aria-hidden="true">{icon}</span><b>{label}</b>
        </button>
      ))}
    </nav>
  );
}

export function FriendsBetaRibbon({s}){
  const [queryActive, setQueryActive] = useState(false);
  useEffect(() => setQueryActive(friendsBetaRequested(window.location.search)), []);
  if(!(isFriendsBeta(s) || queryActive)) return null;
  return <div className="friendsBetaRibbon"><b>🧪 TESTE PRIVADO</b><span>Conteúdo ainda em revisão · resultados provisórios</span></div>;
}

export const Shell = ({children}) => <main className="light"><FriendsBetaRibbon/><section className="panel">{children}</section></main>;
