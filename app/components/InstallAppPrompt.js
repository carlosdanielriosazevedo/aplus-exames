"use client";
// Cartão «Instala a APProva+» no Aprender, depois do diagnóstico, só no
// telemóvel e só se a app ainda não estiver instalada. «Agora não» esconde-o
// durante 14 dias.
import {useEffect,useState} from "react";
import {Apronso} from "./chrome";
import {INSTALL_PROMPT_KEY,installPlatform,installPromptVisible,installCopy} from "../lib/installPlatform";

function readDismissed(){try{return JSON.parse(localStorage.getItem(INSTALL_PROMPT_KEY)||"null")?.dismissedAt||null}catch{return null}}

export default function InstallAppPrompt({eligible}){
  const [platform,setPlatform]=useState(null);
  const [hidden,setHidden]=useState(true);
  useEffect(()=>{
    const standalone=window.matchMedia?.("(display-mode: standalone)")?.matches||window.navigator.standalone===true;
    const detect=()=>{
      const p=installPlatform({userAgent:navigator.userAgent,maxTouchPoints:navigator.maxTouchPoints||0,standalone,hasInstallEvent:!!window.__approvaInstallPrompt});
      setPlatform(p);
      setHidden(!installPromptVisible({platform:p,dismissedAt:readDismissed(),eligible}));
    };
    detect();
    window.addEventListener("approva:install-available",detect);
    const installed=()=>setHidden(true);
    window.addEventListener("appinstalled",installed);
    return ()=>{window.removeEventListener("approva:install-available",detect);window.removeEventListener("appinstalled",installed)};
  },[eligible]);
  if(hidden||!platform)return null;
  const copy=installCopy(platform);
  if(!copy)return null;
  const dismiss=()=>{try{localStorage.setItem(INSTALL_PROMPT_KEY,JSON.stringify({dismissedAt:Date.now()}))}catch{};setHidden(true)};
  const install=async()=>{
    const event=window.__approvaInstallPrompt;
    if(!event){dismiss();return}
    try{await event.prompt();const choice=await event.userChoice;if(choice?.outcome==="accepted")setHidden(true)}catch{}
    window.__approvaInstallPrompt=null;
  };
  return <section className="installAppPrompt" aria-label="Instalar a APProva+">
    <Apronso pose="pointing" className="installApronso" alt=""/>
    <div>
      <b>{copy.title}</b>
      {copy.steps.length>1?<ol>{copy.steps.map(step=><li key={step}>{step}</li>)}</ol>:<p>{copy.steps[0]}</p>}
      <div className="installActions">
        {copy.action&&<button type="button" className="installPrimary" onClick={install}>{copy.action}</button>}
        <button type="button" className="installLater" onClick={dismiss}>Agora não</button>
      </div>
    </div>
  </section>;
}
