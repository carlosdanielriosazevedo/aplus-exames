"use client";

import {useEffect} from "react";
import {reportClientError} from "./lib/clientRuntimeReport";

export default function GlobalError({error}){
  useEffect(()=>{reportClientError({kind:"global_boundary",error})},[error]);
  return <html lang="pt-PT"><body>
    <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:24,fontFamily:"system-ui,sans-serif",background:"#081827",color:"white"}}>
      <section style={{maxWidth:620,textAlign:"center"}}>
        <p style={{fontWeight:800,letterSpacing:1}}>APProva+</p>
        <h1>Não conseguimos abrir a aplicação.</h1>
        <p>Os dados que já estavam guardados no teu dispositivo não são apagados por este erro.</p>
        <button onClick={()=>window.location.reload()} style={{marginTop:16,padding:"12px 18px",border:0,borderRadius:12,fontWeight:800,cursor:"pointer"}}>Tentar novamente</button>
      </section>
    </main>
  </body></html>;
}
