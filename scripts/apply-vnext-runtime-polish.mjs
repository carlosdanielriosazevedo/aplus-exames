import fs from "node:fs";
import path from "node:path";
import {polishVnextItem} from "../app/lib/vnextPedagogicalPolish.js";
import {VNEXT_PILOT_QUESTIONS} from "../app/data/vnextPilot.js";
import {VNEXT_DIAGNOSTIC_QUESTIONS} from "../app/data/vnextDiagnostic.js";
import {VNEXT_MISSION_QUESTIONS} from "../app/data/vnextMission.js";
import {VNEXT_EXAM_QUESTIONS} from "../app/data/vnextExam.js";

const targets=[
  ["app/data/vnextPilot.js","VNEXT_PILOT_QUESTIONS",VNEXT_PILOT_QUESTIONS],
  ["app/data/vnextDiagnostic.js","VNEXT_DIAGNOSTIC_QUESTIONS",VNEXT_DIAGNOSTIC_QUESTIONS],
  ["app/data/vnextMission.js","VNEXT_MISSION_QUESTIONS",VNEXT_MISSION_QUESTIONS],
  ["app/data/vnextExam.js","VNEXT_EXAM_QUESTIONS",VNEXT_EXAM_QUESTIONS]
];

let changedItems=0;
for(const [relative,name,items] of targets){
  const polished=items.map(item=>{
    const next=polishVnextItem(item);
    if(JSON.stringify(next)!==JSON.stringify(item))changedItems++;
    return next;
  });
  const header=`// Gerado/normalizado para runtime pela camada editorial APProva+.\n// Não editar manualmente: as fontes curriculares continuam em content/vnext/math-a.\n`;
  fs.writeFileSync(path.resolve(relative),`${header}export const ${name}=${JSON.stringify(polished,null,2)};\n`);
}

console.log(`✓ runtime vNext polido antes do build: ${changedItems} item(ns) com normalização editorial efetiva`);
