import fs from "node:fs";
import path from "node:path";
import {CURRICULUM_SUBTOPICS} from "../app/data/curriculumVnext.js";

const ROOT=path.resolve("content/vnext/math-a");
const OUTPUT=path.resolve("app/data/vnextDiagnostic.js");
const CHECK=process.argv.includes("--check");

const files=fs.readdirSync(ROOT,{recursive:true})
  .filter(file=>file.endsWith(".json"))
  .sort((a,b)=>a.localeCompare(b,"pt"));

const bySubtopic=new Map();
for(const relative of files){
  const document=JSON.parse(fs.readFileSync(path.join(ROOT,relative),"utf8"));
  if(bySubtopic.has(document.subtopicId))throw new Error(`Submatéria repetida: ${document.subtopicId}`);
  bySubtopic.set(document.subtopicId,{document,relative});
}

function candidateScore(question,targetDifficulty,role){
  const cognitivePriority=role==="anchor"
    ?{Raciocínio:0,Aplicação:1,Interpretação:2,Compreensão:3,Procedimento:4,Conhecimento:5}
    :{Compreensão:0,Conhecimento:1,Procedimento:2,Aplicação:3,Interpretação:4,Raciocínio:5};
  return Math.abs(question.difficulty-targetDifficulty)*20+(cognitivePriority[question.cognitive]??9);
}

function selectQuestion(questions,{role,exclude=null}){
  const targetDifficulty=role==="anchor"?2:1;
  const candidates=questions.filter(question=>question.id!==exclude?.id&&question.signature!==exclude?.signature);
  if(!candidates.length)throw new Error(`Sem candidato independente para ${role}`);
  return [...candidates].sort((a,b)=>
    candidateScore(a,targetDifficulty,role)-candidateScore(b,targetDifficulty,role)
    ||a.id.localeCompare(b.id)
  )[0];
}

function diagnosticItem(question,subtopic,role,sourceFile){
  return {
    id:`DG-${question.id}`,
    themeId:question.themeId,
    subtopicId:question.subtopicId,
    year:question.year,
    role,
    difficulty:question.difficulty,
    cognitive:question.cognitive,
    focus:subtopic.label,
    q:question.q,
    o:question.o,
    a:question.a,
    sol:question.sol,
    hyp:question.hyp,
    contexts:["diagnostic"],
    signature:`diagnostic:${question.subtopicId}:${role}:${question.signature}`,
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
  const source=bySubtopic.get(subtopic.id);
  if(!source)throw new Error(`Falta o ficheiro da submatéria ${subtopic.id}`);
  const questions=source.document.questions||[];
  const anchor=selectQuestion(questions,{role:"anchor"});
  const probe=selectQuestion(questions,{role:"probe",exclude:anchor});
  rows.push(diagnosticItem(anchor,subtopic,"anchor",`content/vnext/math-a/${source.relative}`));
  rows.push(diagnosticItem(probe,subtopic,"probe",`content/vnext/math-a/${source.relative}`));
}

const header=`// Gerado por scripts/generate-vnext-diagnostic.mjs. Não editar manualmente.\n`+
  `// Duas perguntas originais e compactas por submatéria: âncora intermédia + aprofundamento base.\n`+
  `// Permanecem protótipos até revisão pedagógica; productionEligible continua false.\n`;
const output=`${header}export const VNEXT_DIAGNOSTIC_QUESTIONS=${JSON.stringify(rows,null,2)};\n`;

if(CHECK){
  if(!fs.existsSync(OUTPUT)||fs.readFileSync(OUTPUT,"utf8")!==output){
    console.error("app/data/vnextDiagnostic.js está desatualizado. Executa npm run vnext-diagnostic:generate.");
    process.exit(1);
  }
  console.log(`✓ banco diagnóstico compacto sincronizado: ${rows.length} perguntas · ${CURRICULUM_SUBTOPICS.length} submatérias`);
}else{
  fs.writeFileSync(OUTPUT,output);
  console.log(`✓ gerado ${path.relative(process.cwd(),OUTPUT)} com ${rows.length} perguntas`);
}
