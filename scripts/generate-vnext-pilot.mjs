import fs from "node:fs";
import crypto from "node:crypto";
import {polishVnextItem} from "../app/lib/vnextPedagogicalPolish.js";

const specs=[
  {subtopicId:"10-fun-dominio-imagem-zeros",sourceFile:"content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",microcompetencyId:"mc-10-fun-dominio-e-zeros"},
  {subtopicId:"10-ga-vetores",sourceFile:"content/vnext/math-a/10/10-ga-vetores.json",microcompetencyId:"mc-10-ga-vetores"}
];
const metas=[];
const questions=[];
for(const spec of specs){
  const raw=fs.readFileSync(spec.sourceFile,"utf8");
  const source=JSON.parse(raw);
  metas.push({subtopicId:spec.subtopicId,sourceFile:spec.sourceFile,sourceSha256:crypto.createHash("sha256").update(raw).digest("hex"),questionCount:source.questions.length});
  for(const question of source.questions)questions.push({...polishVnextItem(question),microcompetencyId:spec.microcompetencyId,pilotStatus:"machine_prechecked",productionEligible:false});
}
const header="// Piloto vNext: subconjunto explicitamente carregado no cliente.\n// Continua como protótipo; não equivale a revisão pedagógica por professor.\n";
fs.writeFileSync("app/data/vnextPilot.js",header+"export const VNEXT_PILOT_META="+JSON.stringify(metas,null,2)+";\n\nexport const VNEXT_PILOT_QUESTIONS="+JSON.stringify(questions,null,2)+";\n");
console.log(`✓ piloto vNext regenerado: ${questions.length} itens sincronizados com as fontes e com o polish editorial atual`);
