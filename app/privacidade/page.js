import Link from "next/link";
import styles from "../piloto/pilot.module.css";
import {pilotPublicFields} from "../lib/pilotCopy";

export const metadata={title:"Privacidade · APProva+",alternates:{canonical:"/privacidade"}};

function PublicContact(){
  const {responsible,email}=pilotPublicFields();
  const configured=!responsible.startsWith("[")&&!email.startsWith("[");
  return <div className={styles.section}>
    <h2>Responsável e contacto</h2>
    {configured
      ?<p className={styles.copy}>Responsável pelo serviço: <b>{responsible}</b>. Para questões de privacidade, pedidos de acesso ou outras questões relacionadas com dados pessoais: <b>{email}</b>.</p>
      :<p className={styles.copy}><b>Informação formal ainda por configurar.</b> A identificação pública do responsável pelo serviço e o contacto de privacidade têm de estar configurados antes da abertura pública. Esta versão não inventa esses dados.</p>}
  </div>;
}

export default function PrivacyPage(){
  return <main className={styles.page}><section className={styles.wrap}>
    <p><b>APProva+ · Privacidade</b></p>
    <h1>Os teus dados, explicados sem complicar</h1>
    <p className={styles.copy}>A APProva+ foi desenhada para permitir estudar com o mínimo de dados necessário. Algumas informações ficam apenas no teu dispositivo; outras só são guardadas online quando usas funcionalidades que o exigem, como uma conta; e a telemetria do piloto continua separada e depende de consentimento.</p>

    <div className={styles.section}>
      <h2>Utilizadores menores e encarregados de educação</h2>
      <p className={styles.copy}>A APProva+ destina-se a alunos do ensino secundário e foi desenhada para minimizar os dados pedidos. Funcionalidades opcionais que usem dados adicionais, como participação num piloto ou ranking escolar, identificam a escolha correspondente. Se fores menor, envolve o teu encarregado de educação sempre que uma funcionalidade peça uma decisão adicional sobre utilização de dados. Os encarregados de educação podem consultar a informação própria e contactar-nos através do endereço de privacidade indicado abaixo.</p>
    </div>

    <div className={styles.section}>
      <h2>Progresso guardado no dispositivo</h2>
      <p className={styles.copy}>A app usa armazenamento do browser para manter configurações, progresso académico e sessões em pausa. Este armazenamento permite fechar e voltar à app sem recomeçar do zero. Se o browser bloquear esse armazenamento, a APProva+ pode usar temporariamente a memória do separador para não impedir o estudo; nesse caso mostramos um aviso porque fechar ou atualizar o separador pode eliminar o que ainda não ficou guardado de forma durável.</p>
    </div>

    <div className={styles.section}>
      <h2>Conta e progresso online</h2>
      <p className={styles.copy}>Se criares ou iniciares sessão numa conta, são tratados os dados necessários à autenticação, como o nome e o email que forneceres, e pode ser guardado online um estado académico limitado para permitir recuperação e continuidade entre dispositivos. O estado enviado para o serviço online usa uma lista explícita de campos permitidos e remove recursivamente o texto das respostas do aluno antes da gravação.</p>
    </div>

    <div className={styles.section}>
      <h2>Ranking</h2>
      <p className={styles.copy}>A participação em rankings escolares depende de uma escolha explícita. Quando aderires, podem ser usados o ano escolar, a escola indicada e os dados competitivos necessários para calcular a posição. Não precisas de indicar escola para usar as restantes áreas da aplicação.</p>
    </div>

    <div className={styles.section}>
      <h2>Telemetria opcional do piloto</h2>
      <p className={styles.copy}>A telemetria pedagógica do piloto é opcional e só é enviada quando existe consentimento ativo. Pode incluir frequência e duração de utilização, disciplina, resultado por pergunta, tempo gasto, data e feedback que decidas escrever. Esta telemetria não guarda o texto das respostas dadas às perguntas. Sem consentimento ativo, a utilização principal da APProva+ continua disponível.</p>
    </div>

    <div className={styles.section}>
      <h2>Diagnóstico técnico de erros</h2>
      <p className={styles.copy}>Quando ocorre uma falha inesperada no browser, a app pode enviar um relatório técnico mínimo para conseguirmos perceber e corrigir o problema. Esse relatório contém o tipo de erro, o ecrã lógico onde aconteceu, o caminho da página, referências técnicas da falha, versão da aplicação e informação do browser. Não inclui o texto das respostas, palavra-passe ou email do aluno. Estes registos são usados apenas para fiabilidade, segurança e investigação de erros e são mantidos apenas durante o período necessário para esses fins, sujeito também às regras de retenção da infraestrutura de alojamento.</p>
    </div>

    <div className={styles.section}>
      <h2>O que não fazemos</h2>
      <p className={styles.copy}>A APProva+ não vende dados pessoais, não usa dados académicos para publicidade e não envia o texto das respostas para a telemetria do piloto ou para os relatórios técnicos de erro. A informação académica apresentada pela app serve para apoiar o estudo e não é uma classificação oficial.</p>
    </div>

    <div className={styles.section}>
      <h2>Controlos do piloto</h2>
      <p className={styles.copy}>Se tiveres aderido à telemetria do piloto, podes retirar o consentimento a qualquer momento ou pedir a eliminação desses dados nas Definições. Retirar o consentimento bloqueia imediatamente novos envios; apagar os dados é uma ação separada.</p>
    </div>

    <PublicContact/>

    <div className={styles.links}><Link href="/termos">Termos de utilização</Link><Link href="/definicoes">Definições de privacidade</Link><Link href="/piloto/encarregado">Informação para encarregado de educação</Link></div>
  </section></main>;
}
