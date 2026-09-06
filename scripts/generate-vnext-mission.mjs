import fs from "node:fs";
import path from "node:path";
import {CURRICULUM_SUBTOPICS} from "../app/data/curriculumVnext.js";
import {VNEXT_DIAGNOSTIC_QUESTIONS} from "../app/data/vnextDiagnostic.js";

const ROOT=path.resolve("content/vnext/math-a");
const OUTPUT=path.resolve("app/data/vnextMission.js");
const CHECK=process.argv.includes("--check");
const TARGET_DIFFICULTIES=[2,1,3,2,4,1,3];
const diagnosticSourceIds=new Set(VNEXT_DIAGNOSTIC_QUESTIONS.map(q=>q.sourceQuestionId));

const sources=new Map();
for(const relative of fs.readdirSync(ROOT,{recursive:true}).filter(file=>file.endsWith(".json")).sort()){
  const document=JSON.parse(fs.readFileSync(path.join(ROOT,relative),"utf8"));
  sources.set(document.subtopicId,{document,relative});
}

function normalized(text){
  return String(text||"").normalize("NFD").replace(/\p{Diacritic}/gu,"").toLowerCase().replace(/\s+/g," ").trim();
}

function chooseQuestions(questions){
  const selected=[];
  for(const target of TARGET_DIFFICULTIES){
    const usedSignatures=new Set(selected.map(q=>q.signature));
    const usedCognitive=new Set(selected.map(q=>q.cognitive));
    const candidates=questions.filter(q=>!diagnosticSourceIds.has(q.id)&&!usedSignatures.has(q.signature));
    if(!candidates.length)throw new Error("Não existem sete assinaturas independentes para a Missão.");
    candidates.sort((a,b)=>{
      const score=q=>Math.abs(q.difficulty-target)*20+(usedCognitive.has(q.cognitive)?4:0)+(normalized(q.q).length<24?3:0);
      return score(a)-score(b)||a.id.localeCompare(b.id);
    });
    selected.push(candidates[0]);
  }
  return selected;
}

function missionItem(question,subtopic,sourceFile){
  return {
    id:`MS-${question.id}`,
    themeId:question.themeId,
    subtopicId:question.subtopicId,
    year:question.year,
    difficulty:question.difficulty,
    cognitive:question.cognitive,
    focus:subtopic.label,
    q:question.q,
    o:question.o,
    a:question.a,
    sol:question.sol,
    hyp:question.hyp,
    contexts:["mission"],
    signature:`mission:${question.subtopicId}:${question.signature}`,
    reviewStatus:"prototype",
    origin:"original_vnext_2026",
    sourceQuestionId:question.id,
    sourceFile,
    optionOrderVersion:question.optionOrderVersion??1,
    productionEligible:false
  };
}

const rows=[];
for(const subtopic of CURRICULUM_SUBTOPICS){
  const source=sources.get(subtopic.id);
  if(!source)throw new Error(`Falta o ficheiro da submatéria ${subtopic.id}`);
  for(const question of chooseQuestions(source.document.questions||[])){
    rows.push(missionItem(question,subtopic,`content/vnext/math-a/${source.relative}`));
  }
}

const header=`// Gerado por scripts/generate-vnext-mission.mjs. Não editar manualmente.\n`+
  `// Sete perguntas originais e independentes por submatéria para Missões de 3–5 minutos.\n`+
  `// Permanecem protótipos até revisão pedagógica; productionEligible continua false.\n`;
const output=`${header}export const VNEXT_MISSION_QUESTIONS=${JSON.stringify(rows,null,2)};\n`;

if(CHECK){
  if(!fs.existsSync(OUTPUT)||fs.readFileSync(OUTPUT,"utf8")!==output){
    console.error("app/data/vnextMission.js está desatualizado. Executa npm run vnext-mission:generate.");
    process.exit(1);
  }
  console.log(`✓ banco de Missões sincronizado: ${rows.length} perguntas · ${CURRICULUM_SUBTOPICS.length} submatérias`);
}else{
  fs.writeFileSync(OUTPUT,output);
  console.log(`✓ gerado ${path.relative(process.cwd(),OUTPUT)} com ${rows.length} perguntas`);
}
