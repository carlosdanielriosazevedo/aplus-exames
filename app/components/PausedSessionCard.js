import PausedActivityEyebrow,{PausedSessionMeta} from "./PausedActivityEyebrow";

// Cartão de uma prova a meio, por baixo do cartão principal do Aprender (o estudo
// e as provas são independentes desde 2026-11-22). Uma única ação: retomar ESTA prova.
export default function PausedSessionCard({kind,title,position,onContinue}){
  return <div className="pausedSession homePausedExam"><div><PausedActivityEyebrow kind={kind}/><b>{title}</b><div className="missionCardMeta"><PausedSessionMeta position={position}/></div></div><button onClick={onContinue}>Continuar sessão</button></div>;
}
