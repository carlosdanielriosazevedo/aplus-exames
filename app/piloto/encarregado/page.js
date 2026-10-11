import Link from "next/link";
import styles from "../pilot.module.css";
import {guardianPilotText} from "../../lib/pilotCopy";

export const metadata={title:"Informação para encarregado de educação · APProva+"};

export default function GuardianPilotInfo(){
  return <main className={styles.page}><section className={styles.wrap}>
    <p><b>APProva+ · Informação para encarregado de educação</b></p>
    <h1>O que é este piloto?</h1>
    <p className={styles.copy}>{guardianPilotText()}</p>
    <p className={styles.small}>Esta página é apenas informativa. Não cria uma conta de encarregado de educação nem bloqueia a utilização da app.</p>
    <div className={styles.links}><Link href="/piloto">Voltar ao consentimento</Link><Link href="/privacidade">Privacidade</Link></div>
  </section></main>;
}
