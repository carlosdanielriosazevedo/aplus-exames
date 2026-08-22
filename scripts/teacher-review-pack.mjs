
import fs from "node:fs";
import {
  buildTeacherReviewPack,serializeSemicolonCsv,teacherReviewInstructions
} from "../app/lib/teacherReview.js";

const rows=buildTeacherReviewPack({},[],{roadmapOnly:true,reviewer:""});
const csv=serializeSemicolonCsv(rows);
fs.writeFileSync("docs/REVISAO_PROFESSOR_CAMINHO_MINIMO_v3.9.csv","\ufeff"+csv);

const md=[
  "# Instruções — revisão externa v3.9",
  "",
  ...teacherReviewInstructions().map((x,i)=>`${i+1}. ${x}`),
  "",
  `O ficheiro atual contém ${rows.length} questões do caminho mínimo calculado para a primeira beta.`,
  "",
  "A app volta a validar versões e checklist quando o CSV é importado."
].join("\n");
fs.writeFileSync("docs/REVISAO_PROFESSOR_INSTRUCOES_v3.9.md",md);
console.log(`Teacher review pack generated: ${rows.length} items`);
