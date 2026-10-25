import PersistentPortuguesePrototype from "../components/PersistentPortuguesePrototype";
import passageDocument from "../../content/vnext/portuguese/portuguese-639-passage-prototypes.json";
import {buildPortuguesePassagePrototypeExam} from "../lib/portuguesePassages";
import "./passage-mini-exam.css";
import "../portuguese-writing-cycle.css";

export const metadata={title:"Mini-exame Português 639 · APProva+"};

export default function PortuguesePassageMiniExamPage(){
  const exam=buildPortuguesePassagePrototypeExam(passageDocument);
  return <PersistentPortuguesePrototype exam={exam}/>;
}
