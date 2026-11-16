"use client";
// "Guarda o teu plano": convite para criar conta no momento em que há algo a
// perder (como o Duolingo depois da primeira lição). Aparece no resultado do
// diagnóstico e, se o aluno disser "Agora não", só mais UMA vez, depois de 3
// missões. Nunca para quem já iniciou sessão neste dispositivo.
import {accountPromptVisible,ACCOUNT_MODE_KEY} from "../lib/accountPrompt";
export {accountPromptVisible,ACCOUNT_MODE_KEY};

export function SaveProgressPrompt({s,setS,go,place}){
  if(!accountPromptVisible(s,place))return null;
  const createAccount=()=>{
    try{window.sessionStorage.setItem(ACCOUNT_MODE_KEY,"signup")}catch{}
    go("account");
  };
  const later=()=>setS(prev=>({...prev,accountPrompt:{dismissed:(Number(prev.accountPrompt?.dismissed)||0)+1,at:Date.now()}}));
  return <section className="saveProgressPrompt" aria-label="Guardar o teu plano">
    <b>{place==="home"?"Já fizeste 3 missões. Guarda o teu progresso.":"Guarda o teu plano"}</b>
    <span>Com uma conta gratuita, o teu progresso fica guardado e continua noutro telemóvel ou computador.</span>
    <div><button type="button" className="savePromptPrimary" onClick={createAccount}>Criar conta</button>
      <button type="button" className="savePromptLater" onClick={later}>Agora não</button></div>
  </section>;
}
