/** Non-interactive status inside the one primary resume card on Aprender. */
export default function PausedHomeStatus({progressText}){
  return <div className="missionPausedStatus" role="status" aria-label="Sessão em pausa">
    <span>⏸ SESSÃO EM PAUSA</span>
    {progressText&&<span className="missionPausedProgress">{progressText}</span>}
  </div>;
}
