import fs from "node:fs";

const file="app/clientApp.js";
let source=fs.readFileSync(file,"utf8");

const oldFallback=`      setScreen(activeSubjectDiagnosticDone(recoveredState)||portuguesePaused?"home":"welcome");`;
const newFallback=`      const activeSubjectId=recoveredState.activeSubjectId;\n      const activeSubjectConfigured=!!activeSubjectId\n        &&(recoveredState.selectedSubjectIds||[]).includes(activeSubjectId)\n        &&(recoveredState.subjectSettings?.[activeSubjectId]?.profileConfigured===true||recoveredState.onboardingSharedProfileDone===true);\n      if(activeSubjectDiagnosticDone(recoveredState)||portuguesePaused)setScreen("home");\n      else setScreen(activeSubjectConfigured?"diag":"welcome");`;

if(!source.includes(oldFallback))throw new Error("Fallback de arranque esperado não encontrado.");
source=source.replace(oldFallback,newFallback);

const oldPause=`<button className="pauseLink" onClick={()=>go("diag")}>Guardar e continuar depois</button>`;
const newPause=`<button className="pauseLink" onClick={()=>go("home")}>Guardar e continuar depois</button>`;
if(!source.includes(oldPause))throw new Error("Pausa do diagnóstico de Matemática esperada não encontrada.");
source=source.replace(oldPause,newPause);

fs.writeFileSync(file,source);
console.log("✓ clientApp.js atualizado: retoma configurada + pausa de Matemática na Home");
