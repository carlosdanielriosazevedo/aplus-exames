import Link from "next/link";
import styles from "../pilot.module.css";
import {guardianPilotText} from "../../lib/pilotCopy";

export const metadata={title:"Informação para encarregado de educação · APProva+",alternates:{canonical:"/piloto/encarregado"}};

export default function GuardianPilotInfo(){
  return <main className={styles.page}><section className={styles.wrap}>
    <p><b>APProva+ · Informação para encarregado de educação</b></p>
    <h1>O que é este piloto?</h1>
    <p className={styles.copy}>{guardianPilotText()}</p>
    <div className={styles.section}>
      <h2>O que acontece se não participar?</h2>
      <p className={styles.copy}>Nada muda no acesso à APProva+. A participação no piloto é opcional e não interfere com a escola, notas ou preparação para os exames.</p>
    </div>
    <div className={styles.section}>
      <h2>Quem pode participar?</h2>
      <p className={styles.copy}>Neste piloto, o aluno confirma que tem 13 anos ou mais antes de poder dar consentimento. A página de consentimento mostra a informação essencial antes da decisão.</p>
    </div>
    <div className={styles.section}>
      <h2>Como deixar de participar?</h2>
      <p className={styles.copy}>Nas Definições, o aluno pode parar a recolha de novos dados sem apagar imediatamente o histórico já recolhido, ou apagar os dados do piloto. O registo técnico do consentimento é mantido apenas como prova da concessão e eventual revogação.</p>
    </div>
    <p className={styles.small}>Esta página é apenas informativa. Não cria uma conta de encarregado de educação nem dá acesso aos dados do aluno.</p>
    <div className={styles.links}><Link href="/piloto">Voltar ao consentimento</Link><Link href="/privacidade">Privacidade</Link><Link href="/definicoes">Definições de privacidade</Link></div>
  </section></main>;
}
