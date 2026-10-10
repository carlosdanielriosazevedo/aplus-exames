"use client";

import dynamic from "next/dynamic";
import {useEffect,useState} from "react";

const ClientApp=dynamic(()=>import("./clientApp"),{ssr:false,loading:()=> <main className="dark center"><section className="hero"><div className="logo"><span className="brandName"><span className="brandAP">AP</span><span className="brandProva">Prova</span><span className="brandPlus">+</span></span></div><p className="eyebrow">A PREPARAR O TEU ESPAÇO</p></section></main>});
const STORAGE_KEY="a25";
const FRIENDS_STORAGE_KEY="a25-friends-beta";

function hasSavedProgress(){
  try{return Boolean(localStorage.getItem(STORAGE_KEY)||localStorage.getItem(FRIENDS_STORAGE_KEY))}catch{return false}
}

function isPrivateBeta(){
  if(typeof window==="undefined")return false;
  const params=new URLSearchParams(window.location.search);
  return params.has("friends")||params.has("beta")||params.get("mode")==="friends_beta";
}

function Landing({onStart}){
  return <main className="dark center"><section className="hero">
    <div className="logo"><span className="brandName" aria-label="APProva+"><span className="brandAP">AP</span><span className="brandProva">Prova</span><span className="brandPlus">+</span></span></div>
    <div className="welcomeApronso">
      <img className="apronso apronso-motion-idle" src="/mascot/apronso-welcome.webp" alt="Apronso, a mascote da APProva+"/>
      <div><small>OLÁ, EU SOU O APRONSO</small><b>O teu parceiro de estudo.</b><span>Vou ajudar-te a perceber o que estudar, explicar dificuldades e celebrar cada conquista.</span></div>
    </div>
    <p className="eyebrow">PREPARAÇÃO INTELIGENTE PARA EXAMES NACIONAIS</p>
    <h1>A tua melhor nota<br/><em>começa aqui.</em></h1>
    <p>A <span className="brandName"><span className="brandAP">AP</span><span className="brandProva">Prova</span><span className="brandPlus">+</span></span> descobre onde estás a perder pontos e decide o que vale mais a pena estudar hoje.</p>
    <button onClick={onStart}>Descobrir o meu nível →</button>
    <div className="features"><span>⚡ 10–20 min/dia</span><span>🎯 Adaptativo</span><span>📈 Progresso real</span></div>
    <div aria-label="Informação legal" style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginTop:18,fontSize:13}}>
      <a href="/privacidade" style={{color:"#cbd5e1"}}>Privacidade</a><a href="/termos" style={{color:"#cbd5e1"}}>Termos de utilização</a>
    </div>
  </section></main>;
}

export default function Page(){
  const [boot,setBoot]=useState(false);
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    const shouldBoot=hasSavedProgress()||isPrivateBeta()||new URLSearchParams(window.location.search).has("preview");
    setBoot(shouldBoot);
    setReady(true);
  },[]);

  function start(){
    const url=new URL(window.location.href);
    url.searchParams.set("preview","subjects");
    window.history.replaceState(window.history.state,"",`${url.pathname}${url.search}${url.hash}`);
    setBoot(true);
  }

  if(!ready)return <Landing onStart={()=>{}}/>;
  return boot?<ClientApp/>:<Landing onStart={start}/>;
}
