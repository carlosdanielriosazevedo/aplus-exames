import Link from "next/link";

export const metadata={title:"Termos de utilização · APProva+",alternates:{canonical:"/termos"}};

const section={marginTop:28};

export default function TermsPage(){
  return <main style={{minHeight:"100vh",background:"#0f172a",color:"#f8fafc",padding:"40px 20px"}}>
    <article style={{maxWidth:760,margin:"0 auto",lineHeight:1.65}}>
      <Link href="/" style={{color:"#fdba74",textDecoration:"none"}}>← Voltar à APProva+</Link>
      <h1 style={{fontSize:"clamp(2rem,6vw,3.2rem)",marginBottom:8}}>Termos de utilização</h1>
      <p style={{color:"#cbd5e1"}}>Última atualização: 15 de novembro de 2026 · versão beta pública</p>

      <section style={section}>
        <h2>Uma ferramenta de preparação</h2>
        <p>A APProva+ é uma ferramenta educativa de preparação para exames nacionais. Não é uma plataforma oficial do IAVE, da Direção-Geral da Educação, de uma escola ou de outra entidade pública.</p>
      </section>

      <section style={section}>
        <h2>Resultados e correções</h2>
        <p>Diagnósticos, estimativas de domínio, feedback automático, classificações e outras indicações da aplicação destinam-se a apoiar o estudo. Não substituem a classificação oficial de uma prova, a avaliação de um professor ou uma decisão escolar.</p>
        <p>Durante a beta, a correção de respostas abertas deve ser entendida como correção automática em validação contínua. A APProva+ procura decidir apenas quando existe evidência suficiente e pode apresentar uma resposta como provisória ou abster-se de uma decisão definitiva quando a confiança não é adequada.</p>
      </section>

      <section style={section}>
        <h2>Versão beta pública</h2>
        <p>A aplicação continua em desenvolvimento. Podem existir erros, alterações de conteúdo, interrupções temporárias ou diferenças entre uma correção automática e a avaliação que seria feita num contexto oficial. As alterações procuram melhorar a fiabilidade sem atribuir valor oficial a resultados anteriores.</p>
      </section>

      <section style={section}>
        <h2>Alunos menores de idade</h2>
        <p>A APProva+ destina-se à preparação de alunos do ensino secundário, incluindo utilizadores menores de idade. Se fores menor, envolve o teu encarregado de educação sempre que uma funcionalidade peça dados adicionais, participação opcional num piloto ou uma decisão sobre a utilização de dados. A informação de Privacidade e a página dirigida a encarregados de educação explicam estes controlos.</p>
      </section>

      <section style={section}>
        <h2>Idade mínima e conta</h2>
        <p>Para criar conta é necessário ter pelo menos 13 anos. A conta é pessoal: não a partilhes nem partilhes a palavra-passe. Em computadores partilhados, termina sempre a sessão no fim do estudo. A utilização é gratuita durante a beta.</p>
      </section>

      <section style={section}>
        <h2>Utilização responsável</h2>
        <p>O utilizador deve usar a aplicação como apoio ao estudo e confirmar informação importante através de professores, materiais oficiais e outras fontes adequadas. Tentativas de explorar, danificar ou aceder indevidamente a dados ou sistemas da aplicação não fazem parte da utilização permitida.</p>
      </section>

      <section style={section}>
        <h2>Conta e progresso</h2>
        <p>Algumas funcionalidades podem funcionar apenas neste dispositivo e outras podem permitir guardar progresso online quando o utilizador inicia sessão. A aplicação procura evitar substituições silenciosas de progresso entre dispositivos, mas o utilizador deve confirmar qualquer aviso de conflito antes de escolher que versão manter.</p>
      </section>

      <section style={section}>
        <h2>Conteúdo e evolução do produto</h2>
        <p>A estrutura, funcionalidades, perguntas, explicações e critérios da APProva+ podem ser atualizados ao longo da beta. Uma alteração não implica que resultados anteriores tenham valor oficial ou permanente.</p>
      </section>

      <section style={section}>
        <h2>Suspensão e fim do serviço</h2>
        <p>Podemos suspender temporariamente funcionalidades, como novos registos ou a gravação online, para proteger o serviço ou os dados dos utilizadores, e podemos suspender contas usadas de forma abusiva. Se a beta terminar, avisaremos com antecedência razoável e indicaremos como obter uma cópia do progresso.</p>
      </section>

      <section style={section}>
        <h2>Responsabilidade</h2>
        <p>A APProva+ é disponibilizada gratuitamente, tal como está, durante a beta. Procuramos que o conteúdo seja correto e que o serviço esteja disponível, mas não garantimos ausência de erros nem resultados em exames. Na medida permitida por lei, não somos responsáveis por decisões de estudo tomadas apenas com base na aplicação. Nada nestes termos limita direitos que a lei garanta aos consumidores.</p>
      </section>

      <section style={section}>
        <h2>Privacidade</h2>
        <p>A utilização de dados, armazenamento local, progresso online e telemetria opcional é explicada na informação de Privacidade. Quando uma recolha depende de consentimento, a utilização principal da app deve continuar disponível sem esse consentimento, salvo se a funcionalidade em causa exigir tecnicamente uma conta ou ligação online.</p>
      </section>

      <section style={section}>
        <h2>Lei aplicável e contacto</h2>
        <p>Estes termos regem-se pela lei portuguesa. Para questões sobre a aplicação ou sobre os teus dados, usa o contacto indicado na informação de Privacidade.</p>
      </section>

      <p style={{marginTop:36}}><Link href="/privacidade" style={{color:"#fdba74"}}>Consultar a informação de Privacidade</Link></p>
    </article>
  </main>;
}
