// Unified, presentation-only status for a paused assessment on the Aprender card.
// The session kind is descriptive; continuing always uses the existing resume action.
export function pausedActivityLabel(kind){
  const normalized=String(kind||"").toLowerCase().replace(/[- ]/g,"_");
  if(normalized==="mission")return "MISSÃO DE HOJE";
  if(normalized==="diagnostic")return "DIAGNÓSTICO";
  if(["training","free_training","practice","free_practice"].includes(normalized))return "TREINO LIVRE";
  if(["mini_exam","miniexam"].includes(normalized))return "MINI-EXAME";
  if(["full_exam","complete_exam","exam"].includes(normalized))return "EXAME COMPLETO";
  if(normalized==="review")return "REVISÃO DA PROVA";
  return "SESSÃO";
}

export default function PausedActivityEyebrow({kind}){
  return <small className="pausedActivityEyebrow" aria-label={`${pausedActivityLabel(kind)} — Sessão em pausa`}>
    <span>{pausedActivityLabel(kind)}</span>
    <span className="pausedActivitySeparator" aria-hidden="true">—</span>
    <span className="pausedActivityStatus">SESSÃO EM PAUSA</span>
  </small>;
}

// Pedido do product owner (2026-11-22): sempre que uma avaliação fica a meio
// (diagnóstico, missão, treino, mini-exame, exame, revisão), aparece a mesma
// etiqueta «… — SESSÃO EM PAUSA» a vermelho e «Progresso guardado»; a posição
// («Pergunta 3 de 8») só quando é conhecida.
export function PausedSessionMeta({position}){
  return <><span className="sessionPausedMeta">Progresso guardado</span>{position?<span className="sessionPausedPosition">{position}</span>:null}</>;
}

// Etiqueta e chips para fora do cartão principal do Aprender (diagnóstico,
// treino, Progresso). Não tem ação própria: a ação continua a ser o botão do ecrã.
export function PausedSessionStatus({kind,position}){
  return <div className="pausedSessionStatus"><PausedActivityEyebrow kind={kind}/><div className="missionCardMeta"><PausedSessionMeta position={position}/></div></div>;
}

export {pausedPosition} from "../lib/pausedPosition.js";
