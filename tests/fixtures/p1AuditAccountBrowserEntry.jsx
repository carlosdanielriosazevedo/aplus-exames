// Entrada esbuild das provas P1-B/P1-C (auditoria independente da #459).
// Os imports `app/...` e `content/...` são resolvidos pelo contrato para a
// árvore em teste (candidata corrigida ou SHA original), sem reescrever código.
import {createRoot} from "react-dom/client";
import App from "app/clientApp.js";
import Prototype from "app/components/PersistentPortuguesePrototype.js";
import {buildPortuguesePassagePrototypeExam} from "app/lib/portuguesePassages.js";
import passageDocument from "content/vnext/portuguese/portuguese-639-passage-prototypes.json";
import * as accounts from "app/lib/cloudAccountSession.js";
import * as workspace from "app/lib/accountWorkspace.js";
import * as cloud from "app/lib/cloud.js";

window.probe={accounts,workspace,cloud};
const mount=element=>{const root=document.createElement("div");document.body.append(root);createRoot(root).render(element);};
window.mountActualApp=()=>mount(<App/>);
window.mountPrototype=()=>mount(<Prototype exam={buildPortuguesePassagePrototypeExam(passageDocument)}/>);
