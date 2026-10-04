export const metadata={title:"Privacidade · APProva+"};

const section={marginTop:28};

export default function PrivacyPage(){
  return <main style={{minHeight:"100vh",background:"#0f172a",color:"#f8fafc",padding:"40px 20px"}}>
    <article style={{maxWidth:760,margin:"0 auto",lineHeight:1.65}}>
      <a href="/" style={{color:"#fdba74",textDecoration:"none"}}>← Voltar à APProva+</a>
      <h1 style={{fontSize:"clamp(2rem,6vw,3.2rem)",marginBottom:8}}>Privacidade</h1>
      <p style={{color:"#cbd5e1"}}>Última atualização: 4 de outubro de 2026 · versão beta</p>

      <section style={section}>
        <h2>O que a APProva+ guarda</h2>
        <p>Para funcionar e melhorar a experiência de estudo, a aplicação pode guardar dados de configuração e progresso, como disciplina e ano escolar, objetivo de nota, respostas e resultados, sessões de estudo, progresso, feedback enviado pelo utilizador e eventos essenciais do percurso na aplicação.</p>
      </section>

      <section style={section}>
        <h2>Porque usamos estes dados</h2>
        <p>Usamos estes dados para apresentar e manter o progresso, adaptar a experiência de estudo, permitir retoma entre sessões e dispositivos quando a conta/sincronização está ativa, detetar problemas de utilização e melhorar a qualidade da beta.</p>
      </section>

      <section style={section}>
        <h2>Beta e analytics</h2>
        <p>Durante a beta podem ser registados eventos de produto, como abertura da aplicação, conclusão do onboarding, início e conclusão de diagnósticos ou missões e feedback sobre uma sessão. Esta informação serve para perceber onde a experiência funciona ou falha. A APProva+ não precisa de trackers publicitários de terceiros para esta recolha.</p>
      </section>

      <section style={section}>
        <h2>Armazenamento local e cloud</h2>
        <p>Parte do estado pode ficar guardada no próprio browser. Quando o utilizador inicia sessão e a cloud está disponível, determinados dados de progresso e beta podem também ser sincronizados com a infraestrutura do projeto. A aplicação foi desenhada para não colocar palavras-passe dentro do estado de progresso.</p>
      </section>

      <section style={section}>
        <h2>Utilizadores mais novos</h2>
        <p>A APProva+ destina-se a estudantes do ensino secundário. A beta deve recolher apenas a informação necessária à experiência educativa e à sua melhoria. Antes da abertura pública, os fluxos de conta, consentimento e informação a menores serão revistos especificamente.</p>
      </section>

      <section style={section}>
        <h2>Importante nesta fase</h2>
        <p>Esta página descreve de forma transparente o funcionamento atual da beta. Não substitui uma revisão jurídica final. Antes do lançamento público serão acrescentados os dados formais do responsável pelo serviço e um canal de contacto para pedidos relativos a dados pessoais.</p>
      </section>

      <p style={{marginTop:36}}><a href="/termos" style={{color:"#fdba74"}}>Ler também os Termos de utilização</a></p>
    </article>
  </main>;
}
