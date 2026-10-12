import Link from "next/link";

export default function NotFound(){
  return <main className="dark center">
    <section className="hero" style={{maxWidth:680}}>
      <p className="eyebrow">APProva+</p>
      <h1>Esta página não existe.</h1>
      <p>Podes voltar à página inicial sem alterar o teu progresso.</p>
      <Link href="/" style={{display:"inline-block",marginTop:12,padding:"12px 18px",borderRadius:12,fontWeight:800,textDecoration:"none",background:"white",color:"#081827"}}>Voltar ao início</Link>
    </section>
  </main>;
}
