import {useState} from "react";
import {demoIdentity} from "../lib/identity";
import {betaEvent} from "../lib/beta";
import {recordMilestone} from "../lib/productAnalytics";
import {
  TESTER_SEGMENTS,PUBLIC_ENTRY_SEGMENTS,markFriendsBetaConsent,
  isFriendsBeta,testerSegmentInfo,currentTesterSegment
} from "../lib/friendsBeta";
import {currentGraderValidationConsent,setGraderValidationConsent} from "../lib/graderValidationConsent";
import {Logo,Apronso,BrandName} from "./chrome";

// Ecrã inicial (Welcome), extraído de app/page.js. Depende de vários módulos
// lib/*; mantém o mesmo comportamento, sem alterações de lógica.
export function Welcome({s, setS, go}){
  const friends = isFriendsBeta(s);
  const savedSegment = currentTesterSegment(s);
  const [segment, setSegment] = useState(PUBLIC_ENTRY_SEGMENTS.includes(savedSegment) ? savedSegment : null);
  const [graderValidationConsent,setLocalGraderValidationConsent]=useState(()=>currentGraderValidationConsent().granted);

  function toggleGraderValidationConsent(value){
    const granted=value===true;
    setGraderValidationConsent(granted);
    setLocalGraderValidationConsent(granted);
  }

  function start(){
    if(friends){
      if(!segment) return;
      setS(prev => {
        const next = {...markFriendsBetaConsent(prev, {segment}), identity: demoIdentity(segment === "parent" ? "parent" : "student")};
        const already = (next.betaEvents || []).some(e => e.type === "friends_beta_started");
        return already ? next : {
          ...next,
          betaEvents: [...(next.betaEvents || []), betaEvent("friends_beta_started", {
            participantCode: next.betaParticipant?.code || null,
            purpose: "ux_experience",
            testerSegment: segment,
            testerGroup: testerSegmentInfo(segment).group
          })]
        };
      });
    }
    setS(prev => recordMilestone(prev, "onboarding_started", {
      testerSegment: friends ? segment : null
    }));
    go(friends && segment === "parent" ? "parent" : "subjectOnboard");
  }

  return <main className="dark center"><section className="hero">
    <Logo/>
    <div className="welcomeApronso">
      <Apronso pose="welcome" alt="Apronso, a mascote da APProva+"/>
      <div><small>OLÁ, EU SOU O APRONSO</small><b>O teu parceiro de estudo.</b><span>Vou ajudar-te a perceber o que estudar, explicar dificuldades e celebrar cada conquista.</span></div>
    </div>
    {friends ? <><p className="eyebrow">🧪 BETA PRIVADA · TESTE DE EXPERIÊNCIA</p>
      <div className="friendsWelcome"><b>Estás a ver uma versão ainda em construção.</b><span>Queremos perceber se a app é clara, útil e motivadora. O conteúdo ainda está em validação, por isso não uses os resultados como avaliação real do teu nível.</span></div>
      <div className="testerSegmentPicker"><b>Como vais usar a <BrandName/>?</b>
        <span>Escolhe o tipo de acesso para abrirmos a experiência certa.</span>
        <div>{PUBLIC_ENTRY_SEGMENTS.map(key => [key, TESTER_SEGMENTS[key]]).map(([key, item]) => <button key={key} className={segment === key ? "selected" : ""} onClick={() => setSegment(key)}>
          <strong>{item.label}</strong><small>{item.description}</small>
        </button>)}</div>
      </div>
      {segment&&segment!=="parent"&&<label style={{display:"flex",gap:10,textAlign:"left",alignItems:"flex-start",maxWidth:650,margin:"16px auto",padding:"14px 16px",border:"1px solid rgba(255,255,255,.18)",borderRadius:14}}>
        <input type="checkbox" checked={graderValidationConsent} onChange={e=>toggleGraderValidationConsent(e.target.checked)} style={{marginTop:3}}/>
        <span><b style={{display:"block"}}>Ajudar a validar o corretor automático (opcional)</b><small style={{display:"block",marginTop:4}}>Se ativares, as respostas abertas que deres durante esta beta podem ser guardadas com um identificador pseudónimo e revistas cegamente por professores para comparar a correção do Apronso. Isto não altera a tua nota, não guarda o teu nome/email neste conjunto e podes desligar a recolha quando quiseres.</small></span>
      </label>}
    </> : <p className="eyebrow">PREPARAÇÃO INTELIGENTE PARA EXAMES NACIONAIS</p>}
    <h1>A tua melhor nota<br/><em>começa aqui.</em></h1>
    <p>A <BrandName/> descobre onde estás a perder pontos e decide o que vale mais a pena estudar hoje.</p>
    <button disabled={friends && !segment} onClick={start}>{friends ? (segment ? "Continuar →" : "Escolhe primeiro o teu perfil") : "Descobrir o meu nível →"}</button>
    <div className="features"><span>⚡ 10–20 min/dia</span><span>🎯 Adaptativo</span><span>{friends ? "🧪 Feedback importante" : "📈 Progresso real"}</span></div>
    <div aria-label="Informação legal" style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginTop:18,fontSize:13}}>
      <a href="/privacidade" style={{color:"#cbd5e1"}}>Privacidade</a>
      <a href="/termos" style={{color:"#cbd5e1"}}>Termos de utilização</a>
    </div>
  </section></main>;
}
