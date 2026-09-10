import fs from "node:fs";
import path from "node:path";
import {CURRICULUM_SUBTOPICS} from "../app/data/curriculumVnext.js";
import {VNEXT_DIAGNOSTIC_QUESTIONS} from "../app/data/vnextDiagnostic.js";
import {VNEXT_MISSION_QUESTIONS} from "../app/data/vnextMission.js";

const ROOT=path.resolve("content/vnext/math-a");
const OUTPUT=path.resolve("app/data/vnextExam.js");
const CHECK=process.argv.includes("--check");
const TARGET_DIFFICULTIES=[3,4,2];
const COGNITIVE_LABELS={
  aplicacao:"Aplicação",
  comparacao:"Comparação",
  compreensao:"Compreensão",
  interpretacao:"Interpretação",
  modelacao:"Modelação",
  raciocinio:"Raciocínio"
};
const reservedSourceIds=new Set([
  ...VNEXT_DIAGNOSTIC_QUESTIONS.map(question=>question.sourceQuestionId),
  ...VNEXT_MISSION_QUESTIONS.map(question=>question.sourceQuestionId)
]);

const sources=new Map();
for(const relative of fs.readdirSync(ROOT,{recursive:true}).filter(file=>file.endsWith(".json")).sort()){
  const document=JSON.parse(fs.readFileSync(path.join(ROOT,relative),"utf8"));
  sources.set(document.subtopicId,{document,relative});
}
function canonicalCognitive(value){
  const key=String(value||"")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLocaleLowerCase("pt-PT")
    .trim();
  return COGNITIVE_LABELS[key]||String(value||"").trim();
}
function correctOptionLengthOutlier(question){
  if(!Array.isArray(question.o)||question.o.length!==4||![0,1,2,3].includes(question.a))return true;
  const lengths=question.o.map(option=>String(option).trim().length);
  const correct=lengths[question.a];
  const others=lengths.filter((_,index)=>index!==question.a);
  const average=others.reduce((sum,length)=>sum+length,0)/others.length;
  return correct>average*2.2||correct*2.2<average;
}
function qualityPenalty(question){
  const solutionLength=String(question.sol||"").trim().length;
  const questionLength=String(question.q||"").trim().length;
  return Math.max(0,40-solutionLength)*8+
    Math.max(0,24-questionLength)*3+
    (correctOptionLengthOutlier(question)?120:0);
}
function chooseQuestions(questions){
  const selected=[];
  for(const target of TARGET_DIFFICULTIES){
    const usedSignatures=new Set(selected.map(question=>question.signature));
    const usedCognitive=new Set(selected.map(question=>question.cognitive));
    const candidates=questions.filter(question=>!reservedSourceIds.has(question.id)&&!usedSignatures.has(question.signature));
    if(!candidates.length)throw new Error("Não existem três itens de exame independentes e não reservados.");
    candidates.sort((left,right)=>{
      const score=question=>Math.abs(question.difficulty-target)*1000+
        (usedCognitive.has(canonicalCognitive(question.cognitive))?40:0)+
        qualityPenalty(question);
      return score(left)-score(right)||left.id.localeCompare(right.id);
    });
    selected.push(candidates[0]);
  }
  return selected;
}

function examItem(question,subtopic,sourceFile){
  return {
    id:`EX-${question.id}`,
    themeId:question.themeId,
    subtopicId:question.subtopicId,
    year:question.year,
    difficulty:question.difficulty,
    cognitive:canonicalCognitive(question.cognitive),
    focus:subtopic.label,
    q:question.q,
    o:question.o,
    a:question.a,
    sol:question.sol,
    hyp:question.hyp,
    contexts:["exam"],
    signature:`exam:${question.subtopicId}:${question.signature}`,
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
    rows.push(examItem(question,subtopic,`content/vnext/math-a/${source.relative}`));
  }
}

const header=`// Gerado por scripts/generate-vnext-exam.mjs. Não editar manualmente.\n`+
  `// Três itens originais, independentes e não reservados por submatéria para Mini-exames.\n`+
  `// Permanecem protótipos até revisão pedagógica; productionEligible continua false.\n`;
const output=`${header}export const VNEXT_EXAM_QUESTIONS=${JSON.stringify(rows,null,2)};\n`;

if(CHECK){
  if(!fs.existsSync(OUTPUT)||fs.readFileSync(OUTPUT,"utf8")!==output){
    console.error("app/data/vnextExam.js está desatualizado. Executa npm run vnext-exam:generate.");
    process.exit(1);
  }
  console.log(`✓ banco de Mini-exames sincronizado: ${rows.length} perguntas · ${CURRICULUM_SUBTOPICS.length} submatérias`);
}else{
  fs.writeFileSync(OUTPUT,output);
  console.log(`✓ gerado ${path.relative(process.cwd(),OUTPUT)} com ${rows.length} perguntas`);
}
