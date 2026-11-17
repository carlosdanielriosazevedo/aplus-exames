import Link from "next/link";
import styles from "../piloto/pilot.module.css";
import {pilotPublicFields} from "../lib/pilotCopy";

// Página pública exigida pela Google Play: como eliminar a conta e os dados.
export const metadata={title:"Eliminar conta · APProva+",alternates:{canonical:"/eliminar-conta"}};

export default async function DeleteAccountPage({searchParams}){
  const params=await searchParams;
  const done=params?.concluido==="1";
  const {email}=pilotPublicFields();
  const contact=email&&!email.startsWith("[")?email:null;
  return <main className={styles.page}><section className={styles.wrap}>
    <p><b>APProva+ · Eliminar conta</b></p>
    {done
      ?<><h1>A tua conta foi eliminada</h1>
        <p className={styles.copy}>Apagámos a tua conta e o progresso que estava guardado online. Os dados de estudo que existiam neste dispositivo também foram apagados. Se quiseres voltar a usar a APProva+, podes criar uma conta nova.</p></>
      :<h1>Como eliminar a tua conta</h1>}

    <div className={styles.section}>
      <h2>Na app</h2>
      <p className={styles.copy}>Entra na tua conta, abre o menu <b>•••</b> e escolhe <b>Conta</b>. No fim da página, em <b>Eliminar conta</b>, confirma com a tua palavra-passe e escreve <b>ELIMINAR</b>. A eliminação é imediata e não pode ser desfeita.</p>
      <p className={styles.copy}><Link href="/?conta=1">Abrir a APProva+ e entrar na conta</Link></p>
    </div>

    <div className={styles.section}>
      <h2>O que é apagado</h2>
      <ul className={styles.copy}>
        <li>A conta: nome, email, palavra-passe e sessões abertas.</li>
        <li>O progresso guardado online e as versões anteriores desse progresso.</li>
        <li>O registo de aceitação dos termos e da política de privacidade.</li>
        <li>O perfil e a atividade de ranking, se existirem.</li>
        <li>Os dados de estudo guardados no dispositivo onde fizeres a eliminação.</li>
      </ul>
      <p className={styles.copy}>Ficam apenas contagens diárias anónimas de utilização e os reportes de problemas em perguntas, que nunca guardam nome, email nem identificador de conta.</p>
    </div>

    <div className={styles.section}>
      <h2>Não consegues entrar na conta?</h2>
      <p className={styles.copy}>Primeiro tenta <b>Esqueci-me da palavra-passe</b> no ecrã de entrada. {contact
        ?<>Se mesmo assim não conseguires, envia um email para <b>{contact}</b> a partir do endereço da conta, com o assunto «Eliminar conta». Respondemos e eliminamos a conta no prazo máximo de 30 dias.</>
        :<>Se mesmo assim não conseguires, usa o contacto indicado na <Link href="/privacidade">política de privacidade</Link>.</>}</p>
    </div>

    <p className={styles.copy}><Link href="/privacidade">Política de privacidade</Link> · <Link href="/termos">Termos de utilização</Link></p>
  </section></main>;
}
