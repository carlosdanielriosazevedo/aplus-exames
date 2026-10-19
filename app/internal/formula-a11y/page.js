import {notFound} from "next/navigation";
import DeepReviewStudy from "../../../components/DeepReviewStudy";

export const dynamic="force-dynamic";

const formulas=["P(A)=3/5","√52","√(a+b)","σ/√n","f(x)=a^x","x^1/2","√((a+b)²)"];
const study={
  lead:"Revisão da apresentação matemática para acessibilidade.",
  goals:["Ler as fórmulas.","Preservar a notação.","Evitar leitura duplicada."],
  sections:[{
    id:"a11y-formulas",
    title:"Fórmulas de controlo",
    paragraphs:["As relações essenciais seguintes testam o componente real."],
    formulas,
    example:{title:"Verificação",steps:["Ler os símbolos.","Confirmar a notação.","Verificar a acessibilidade."]},
    remember:"Uma fórmula deve ter um único nome acessível.",
    pitfalls:["Não duplicar fragmentos.","Não alterar o significado."]
  }]
};
export default function Page(){
  if(process.env.FORMULA_A11Y_FIXTURE!=="1")notFound();
  return <main><DeepReviewStudy study={study}/></main>;
}
