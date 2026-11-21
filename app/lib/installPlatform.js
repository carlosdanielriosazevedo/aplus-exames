// Que instruções de instalação mostrar (sem React, testável).
// Decisão do product owner (2026-11-21): enquanto a app não está nas lojas, um
// cartão ensina a pôr a APProva+ no ecrã principal.

export const INSTALL_PROMPT_KEY="approva-install-prompt-v1";
const SNOOZE_MS=14*24*60*60*1000;

// Browsers internos de redes sociais não permitem instalar: é preciso abrir no browser.
const IN_APP=/Instagram|FBAN|FBAV|FB_IAB|TikTok|musical_ly|BytedanceWebview|Snapchat|Twitter|LinkedInApp/i;

export function installPlatform({userAgent="",maxTouchPoints=0,standalone=false,hasInstallEvent=false}={}){
  if(standalone)return "installed";
  const ua=String(userAgent);
  const ios=/iPhone|iPad|iPod/i.test(ua)||(/Macintosh/i.test(ua)&&maxTouchPoints>1);
  const android=/Android/i.test(ua);
  if(!ios&&!android)return "desktop";
  if(IN_APP.test(ua))return ios?"ios-in-app":"android-in-app";
  if(ios){
    // No iPhone só o Safari consegue adicionar ao ecrã principal de forma fiável.
    if(/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua))return "ios-other-browser";
    return "ios-safari";
  }
  return hasInstallEvent?"android-prompt":"android-menu";
}

export function installPromptVisible({platform,dismissedAt=null,now=Date.now(),eligible=true}){
  if(!eligible||platform==="installed"||platform==="desktop")return false;
  if(dismissedAt&&now-Number(dismissedAt)<SNOOZE_MS)return false;
  return true;
}

export function installCopy(platform){
  switch(platform){
    case "ios-safari":return {title:"Põe a APProva+ no teu ecrã principal",steps:["Toca em Partilhar (o quadrado com a seta ↑), na barra do Safari.","Desliza e escolhe «Adicionar ao ecrã principal».","Toca em «Adicionar». A APProva+ fica junto das tuas apps."]};
    case "ios-other-browser":return {title:"Põe a APProva+ no teu ecrã principal",steps:["Abre approvamais.pt no Safari (no iPhone, só o Safari consegue instalar).","Toca em Partilhar (↑) e escolhe «Adicionar ao ecrã principal»."]};
    case "ios-in-app":return {title:"Abre no Safari para instalar",steps:["Toca em ⋯ (ou no ícone do browser) no canto do ecrã.","Escolhe «Abrir no Safari» / «Abrir no browser».","No Safari: Partilhar (↑) → «Adicionar ao ecrã principal»."]};
    case "android-in-app":return {title:"Abre no Chrome para instalar",steps:["Toca em ⋮ no canto do ecrã.","Escolhe «Abrir no Chrome» / «Abrir no browser».","No Chrome, toca em «Instalar app»."]};
    case "android-prompt":return {title:"Instala a APProva+ no teu telemóvel",steps:["Fica no teu ecrã principal, abre num toque e funciona como uma app."],action:"Instalar"};
    case "android-menu":return {title:"Instala a APProva+ no teu telemóvel",steps:["Toca em ⋮ no canto do browser.","Escolhe «Instalar app» ou «Adicionar ao ecrã principal»."]};
    default:return null;
  }
}
