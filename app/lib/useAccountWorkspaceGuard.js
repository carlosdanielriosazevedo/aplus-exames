"use client";
import {useEffect,useRef,useState} from "react";
import {openVerifiedAccount,accountContextCurrent,currentVerifiedAccount,subscribeAccountChanges} from "./cloudAccountSession.js";
import {workspaceAccountId} from "./accountWorkspace.js";

// Suspend the old study surface instead of letting the new person keep adding
// answers to the previous account's workspace. The underlying keys never move.
export function useAccountWorkspaceGuard(enabled){
  const [locked,setLocked]=useState(false);
  const proof=useRef(null),sequence=useRef(0),checkRef=useRef(async()=>{});
  const owner=workspaceAccountId();
  useEffect(()=>{
    if(!enabled||!process.env.NEXT_PUBLIC_NEON_AUTH_URL||!process.env.NEXT_PUBLIC_NEON_DATA_API_URL)return;
    let live=true;
    async function check(force=false){
      const ticket=++sequence.current;
      if(force)setLocked(true);
      try{
        const context=await openVerifiedAccount({expectedAccountId:owner});
        if(!live||ticket!==sequence.current)return;
        proof.current=context;setLocked(context.subject!==owner);
      }catch(error){
        if(!live||ticket!==sequence.current)return;
        if(!owner&&error?.status===401)setLocked(false);
        else if(force||error?.code)setLocked(true);
        else if(owner){
          const previous=proof.current||currentVerifiedAccount();
          setLocked(!accountContextCurrent(previous)||previous.subject!==owner);
        }
      }
    }
    checkRef.current=check;
    const changed=()=>{void check(true);};
    const focus=()=>{void check();};
    const visible=()=>{if(document.visibilityState==="visible")focus();};
    const unsubscribe=subscribeAccountChanges(changed);
    window.addEventListener("focus",focus);document.addEventListener("visibilitychange",visible);
    void check();
    return ()=>{live=false;sequence.current++;unsubscribe();window.removeEventListener("focus",focus);document.removeEventListener("visibilitychange",visible);};
  },[enabled,owner]);
  return {locked,recheck:()=>checkRef.current(true)};
}
