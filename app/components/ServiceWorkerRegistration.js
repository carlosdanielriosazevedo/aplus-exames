"use client";
import {useEffect} from "react";

// Regista o service worker mínimo (página offline). Só em HTTPS real, para não
// interferir com o desenvolvimento local nem com os testes automáticos.
export default function ServiceWorkerRegistration(){
  useEffect(()=>{
    if(typeof window==="undefined"||!("serviceWorker" in navigator))return;
    if(window.location.protocol!=="https:"||window.location.hostname==="localhost")return;
    navigator.serviceWorker.register("/sw.js",{scope:"/"}).catch(()=>{});
  },[]);
  return null;
}
