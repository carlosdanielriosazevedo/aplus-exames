"use client";
import {useEffect,useRef,useState} from "react";
import {beginRecoveryAccess} from "./recoveryAccess.js";
import {subscribeAccountChanges} from "./cloudAccountSession.js";

// Keep component state in memory while replacing its private render. This
// prevents logout from erasing an unfinished local review or exposing its DOM.
export function useRecoveryViewGuard(){
  const [ready,setReady]=useState(false),check=useRef(async()=>{});
  useEffect(()=>{
    let live=true,ticket=0;
    async function verify(){const current=++ticket;setReady(false);try{await beginRecoveryAccess({select:true});if(live&&current===ticket)setReady(true);}catch{if(live&&current===ticket)setReady(false);}}
    check.current=verify;const unsubscribe=subscribeAccountChanges(verify);
    const focus=()=>{void verify();};window.addEventListener("focus",focus);
    const visibility=()=>{if(document.visibilityState==="visible")focus();};document.addEventListener("visibilitychange",visibility);
    void verify();return ()=>{live=false;ticket++;unsubscribe();window.removeEventListener("focus",focus);document.removeEventListener("visibilitychange",visibility);};
  },[]);
  return {ready,recheck:()=>check.current()};
}
