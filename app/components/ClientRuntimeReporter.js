"use client";

import {useEffect} from "react";

async function report(payload){
  try{const {reportClientError}=await import("../lib/clientRuntimeReport");reportClientError(payload)}catch{}
}

export default function ClientRuntimeReporter(){
  useEffect(()=>{
    const onError=event=>report({kind:"window_error",error:event.error instanceof Error?event.error:new Error("Browser runtime error"),source:event.filename||"",line:event.lineno,column:event.colno});
    const onRejection=event=>report({kind:"unhandled_rejection",error:event.reason instanceof Error?event.reason:new Error("Unhandled promise rejection")});
    window.addEventListener("error",onError);
    window.addEventListener("unhandledrejection",onRejection);
    return ()=>{window.removeEventListener("error",onError);window.removeEventListener("unhandledrejection",onRejection)};
  },[]);
  return null;
}
