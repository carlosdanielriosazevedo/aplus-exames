import fs from "node:fs";

const file="app/clientApp.js";
let source=fs.readFileSync(file,"utf8");
const oldBlock=`      const portuguesePaused=recoveredState.activeSubjectId==="portuguese"&&(\n        !!subjectProgressFor(recoveredState,"portuguese").lastPosition||\n        !!recoveredState.subjectSettings?.portuguese?.miniExamDraft\n      );\n      const activeSubjectId=recoveredState.activeSubjectId;`;
const newBlock=`      const activeSubjectId=recoveredState.activeSubjectId;\n      const subjectPaused=!!activeSubjectId&&(\n        !!subjectProgressFor(recoveredState,activeSubjectId).lastPosition||\n        (activeSubjectId==="portuguese"&&!!recoveredState.subjectSettings?.portuguese?.miniExamDraft)\n      );`;
if(!source.includes(oldBlock))throw new Error("Bloco de retoma antigo não encontrado.");
source=source.replace(oldBlock,newBlock);
source=source.replace('if(activeSubjectDiagnosticDone(recoveredState)||portuguesePaused)setScreen("home");','if(activeSubjectDiagnosticDone(recoveredState)||subjectPaused)setScreen("home");');
fs.writeFileSync(file,source);
console.log("✓ retoma por lastPosition generalizada às disciplinas ativas");
