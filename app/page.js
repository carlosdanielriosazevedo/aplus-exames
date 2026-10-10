"use client";
import dynamic from "next/dynamic";

const ClientApp=dynamic(()=>import("./clientApp"),{
  ssr:false,
  loading:()=>
    <main aria-busy="true" aria-live="polite" style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:"24px",background:"#fffaf0",color:"#15233c"}}>
      <div style={{textAlign:"center"}}>
        <strong style={{fontSize:"24px"}}>APProva<span style={{color:"#e97800"}}>+</span></strong>
        <p style={{margin:"10px 0 0",fontSize:"14px"}}>A preparar o teu espaço de estudo…</p>
      </div>
    </main>
});

export default function HomePage(){
  return <ClientApp/>;
}
