"use client";
// "Guarda o teu plano": convite para criar conta no momento em que há algo a
// perder (como o Duolingo depois da primeira lição). Aparece no resultado do
// diagnóstico e, se o aluno disser "Agora não", só mais UMA vez, depois de 3
// missões. Nunca para quem já iniciou sessão neste dispositivo.
import {accountPromptVisible,ACCOUNT_MODE_KEY} from "../lib/accountPrompt";
import {Apronso} from "./chrome";
export {accountPromptVisible,ACCOUNT_MODE_KEY};

export function SaveProgressPrompt({s,setS,go,place}){
  if(!accountPromptVisible(s,place))return null;
  const createAccount=()=>{
    try{window.sessionStorage.setItem(ACCOUNT_MODE_KEY,"signup")}catch{}
    go("account");
  };
  const later=()=>setS(prev=>({...prev,accountPrompt:{dismissed:(Number(prev.accountPrompt?.dismissed)||0)+1,at:Date.now()}}));
  // Centrado e com as cores da marca; uma ação dominante («Criar conta grátis»)
  // e uma saída discreta («Agora não»). Pedido do product owner, 2026-11-21.
  return <section className="saveProgressPrompt" aria-label="Guardar o teu plano">
    <Apronso pose="pointing" className="savePromptApronso" alt=""/>
    <b>{place==="home"?"Já fizeste 3 missões. Guarda o teu progresso.":"Não percas o teu plano"}</b>
    <span>Cria uma conta gratuita: o teu plano e o teu progresso ficam guardados e continuam noutro telemóvel ou computador.</span>
    <button type="button" className="savePromptPrimary" onClick={createAccount}>Criar conta grátis</button>
    <button type="button" className="savePromptLater" onClick={later}>Agora não</button>
  </section>;
}
