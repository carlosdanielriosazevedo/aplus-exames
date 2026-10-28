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
