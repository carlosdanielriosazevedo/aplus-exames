"use client";

import {useEffect} from "react";
import {reportClientError} from "../lib/clientRuntimeReport";

export default function ClientRuntimeReporter(){
  useEffect(()=>{
    const onError=event=>reportClientError({
      kind:"window_error",
      error:event.error instanceof Error?event.error:new Error("Browser runtime error"),
      source:event.filename||"",
      line:event.lineno,
      column:event.colno
    });
    const onRejection=event=>{
      const reason=event.reason;
      reportClientError({
        kind:"unhandled_rejection",
        error:reason instanceof Error?reason:new Error("Unhandled promise rejection")
      });
    };
    window.addEventListener("error",onError);
    window.addEventListener("unhandledrejection",onRejection);
    return ()=>{
      window.removeEventListener("error",onError);
      window.removeEventListener("unhandledrejection",onRejection);
    };
  },[]);
  return null;
}
