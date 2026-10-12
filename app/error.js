"use client";

export default function Error({reset}){
  return <main className="dark center">
    <section className="hero" style={{maxWidth:680}}>
      <p className="eyebrow">APProva+</p>
      <h1>Algo não correu como esperado.</h1>
      <p>O teu progresso guardado não é apagado por este ecrã. Podes tentar carregar novamente esta parte da app.</p>
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={()=>reset()}>Tentar novamente</button>
        <button className="secondary" onClick={()=>{window.location.href="/"}}>Ir para o início</button>
      </div>
    </section>
  </main>;
}
