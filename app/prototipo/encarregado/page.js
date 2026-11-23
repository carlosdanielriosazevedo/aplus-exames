import {notFound} from "next/navigation";
import GuardianPrototype from "./GuardianPrototype";

// Protótipo da área do encarregado de educação (dados de exemplo). Nunca aparece em
// produção: só em desenvolvimento e em pré-visualizações, para o product owner decidir.
export const metadata={title:"Protótipo · encarregado de educação · APProva+",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";

export default function Page(){
  if(process.env.VERCEL_ENV==="production")notFound();
  return <GuardianPrototype/>;
}
