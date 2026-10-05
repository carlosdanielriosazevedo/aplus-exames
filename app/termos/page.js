import Link from "next/link";

export const metadata={title:"Termos de utilização · APProva+"};

const section={marginTop:28};

export default function TermsPage(){
  return <main style={{minHeight:"100vh",background:"#0f172a",color:"#f8fafc",padding:"40px 20px"}}>
    <article style={{maxWidth:760,margin:"0 auto",lineHeight:1.65}}>
      <Link href="/" style={{color:"#fdba74",textDecoration:"none"}}>← Voltar à APProva+</Link>
      <h1 style={{fontSize:"clamp(2rem,6vw,3.2rem)",marginBottom:8}}>Termos de utilização</h1>
      <p style={{color:"#cbd5e1"}}>Última atualização: 4 de outubro de 2026 · versão beta</p>

      <section style={section}>
        <h2>Uma ferramenta de preparação</h2>
        <p>A APProva+ é uma ferramenta educativa de preparação para exames nacionais. Não é uma plataforma oficial do IAVE, da Direção-Geral da Educação, de uma escola ou de outra entidade pública.</p>
      </section>

      <section style={section}>
        <h2>Resultados e correções</h2>
        <p>Diagnósticos, estimativas de domínio, feedback automático, classificações e outras indicações da aplicação destinam-se a apoiar o estudo. Não substituem a classificação oficial de uma prova, a avaliação de um professor ou uma decisão escolar.</p>
      </section>

      <section style={section}>
        <h2>Versão beta</h2>
        <p>A aplicação continua em desenvolvimento. Podem existir erros, alterações de conteúdo, interrupções temporárias ou diferenças entre uma correção automática e a avaliação que seria feita num contexto oficial. Durante a beta, o feedback dos utilizadores é usado para reduzir estes problemas.</p>
      </section>

      <section style={section}>
        <h2>Utilização responsável</h2>
        <p>O utilizador deve usar a aplicação como apoio ao estudo e confirmar informação importante através de professores, materiais oficiais e outras fontes adequadas. Tentativas de explorar, danificar ou aceder indevidamente a dados ou sistemas da aplicação não fazem parte da utilização permitida.</p>
      </section>

      <section style={section}>
        <h2>Conteúdo e evolução do produto</h2>
        <p>A estrutura, funcionalidades, perguntas, explicações e critérios da APProva+ podem ser atualizados ao longo da beta. Uma alteração não implica que resultados anteriores tenham valor oficial ou permanente.</p>
      </section>

      <section style={section}>
        <h2>Antes da abertura pública</h2>
        <p>Estes termos são adequados ao funcionamento atual da closed beta, mas ainda não constituem a versão jurídica final para lançamento público. Antes dessa abertura serão acrescentados os dados formais do responsável pelo serviço, contacto e revisão final das condições aplicáveis.</p>
      </section>

      <p style={{marginTop:36}}><Link href="/privacidade" style={{color:"#fdba74"}}>Consultar a informação de Privacidade</Link></p>
    </article>
  </main>;
}
