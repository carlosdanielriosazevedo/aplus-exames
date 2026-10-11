import Link from "next/link";
import styles from "../piloto/pilot.module.css";
import {pilotConsentText} from "../lib/pilotCopy";

export const metadata={title:"Privacidade · APProva+"};

export default function PrivacyPage(){
  return <main className={styles.page}><section className={styles.wrap}>
    <p><b>APProva+ · Privacidade do piloto</b></p>
    <h1>Os teus dados, explicados sem complicar</h1>
    <p className={styles.copy}>{pilotConsentText()}</p>

    <div className={styles.section}>
      <h2>Se não quiseres participar</h2>
      <p className={styles.copy}>Podes continuar a usar a APProva+. Sem consentimento ativo, a app não recolhe nem envia telemetria do piloto.</p>
    </div>

    <div className={styles.section}>
      <h2>Se mudares de ideias</h2>
      <p className={styles.copy}>Podes retirar o consentimento ou apagar os dados do piloto nas Definições. A recolha fica bloqueada imediatamente.</p>
    </div>

    <div className={styles.links}><Link href="/piloto">Consentimento do piloto</Link><Link href="/definicoes">Definições</Link><Link href="/piloto/encarregado">Informação para encarregado de educação</Link></div>
  </section></main>;
}
