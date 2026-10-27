"use client";

import dynamic from "next/dynamic";
import {useEffect,useState} from "react";

const ClientApp=dynamic(()=>import("./clientApp"),{ssr:false,loading:()=> <Loading/>});
const STORAGE_KEYS=["a25","a25-friends-beta"];
const ENTRY_KEY="a25-onboarding-entry";

function storedProgress(){
  for(const name of ["localStorage","sessionStorage"])try{
    const store=window[name];
    if(STORAGE_KEYS.some(key=>store?.getItem(key))||(name==="sessionStorage"&&store?.getItem(ENTRY_KEY)==="1"))return true;
  }catch{}
  return false;
}
function privateEntry(){
  const q=new URLSearchParams(window.location.search);
  return q.get("beta")==="friends"||q.get("mode")==="friends_beta";
}
function Brand(){return <span className="brandName" aria-label="APProva+"><span className="brandAP">AP</span><span className="brandProva">Prova</span><span className="brandPlus">+</span></span>}
function Loading(){return <main aria-busy="true" aria-live="polite" className="dark center"><section className="hero"><div className="logo"><Brand/></div><p className="eyebrow">A PREPARAR O TEU ESPAÇO</p></section></main>}
function Landing({onStart}){return <main className="dark center"><section className="hero">
  <div className="logo"><Brand/></div>
  <div className="welcomeApronso"><img className="apronso apronso-motion-idle" src="/mascot/apronso-welcome.webp" alt="Apronso, a mascote da APProva+"/><div><small>OLÁ, EU SOU O APRONSO</small><b>O teu parceiro de estudo.</b><span>Vou ajudar-te a perceber o que estudar, explicar dificuldades e celebrar cada conquista.</span></div></div>
  <p className="eyebrow">PREPARAÇÃO INTELIGENTE PARA EXAMES NACIONAIS</p>
  <h1>A tua melhor nota<br/><em>começa aqui.</em></h1>
  <p>A <Brand/> descobre onde estás a perder pontos e decide o que vale mais a pena estudar hoje.</p>
  <button type="button" onClick={onStart}>Descobrir o meu nível →</button>
  <div className="features"><span>⚡ 10–20 min/dia</span><span>🎯 Adaptativo</span><span>📈 Progresso real</span></div>
  <div aria-label="Informação legal" className="publicLegalLinks"><a href="/privacidade">Privacidade</a><a href="/termos">Termos de utilização</a></div>
</section></main>}

export default function Page(){
  const [ready,setReady]=useState(false),[boot,setBoot]=useState(false);
  useEffect(()=>{const q=new URLSearchParams(window.location.search);setBoot(storedProgress()||privateEntry()||q.has("preview"));setReady(true)},[]);
  function start(){
    try{window.sessionStorage.setItem(ENTRY_KEY,"1")}catch{}
    setBoot(true);
  }
  if(!ready)return <Loading/>;
  return boot?<ClientApp/>:<Landing onStart={start}/>;
}
