// Componentes de apresentação extraídos de app/page.js (sem estado próprio,
// sem lógica de negócio). Primeiro passo de divisão do monólito.
export const BrandName = ({className=""}) => (
  <span className={`brandName ${className}`.trim()} aria-label="APProva+">
    <span className="brandAP">AP</span><span className="brandProva">Prova</span><span className="brandPlus">+</span>
  </span>
);

export const Logo = () => <div className="logo"><BrandName/></div>;

export function Apronso({pose="welcome", className="", alt=""}){
  return <img className={`apronso ${className}`.trim()} src={`/mascot/apronso-${pose}.webp`} alt={alt}/>;
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
