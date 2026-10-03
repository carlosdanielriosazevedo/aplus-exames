import {writeFileSync} from "node:fs";
import {pathToFileURL} from "node:url";
import {OPEN_RESPONSE_CALIBRATION_CASES,portugueseCalibrationItemById} from "../app/data/openResponseCalibrationBank.js";
import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";
import {MATH_RESPONSE_CALIBRATION_CASES} from "../app/data/mathResponseCalibrationBank.js";
import {CONSTRUCTED_RESPONSE_BANK} from "../app/lib/constructedResponseBank.js";
import {
  GRADER_HUMAN_VALIDATION_SCHEMA,
  GRADER_HUMAN_VALIDATION_TARGET,
  makeBlindValidationRow,
  serializeHumanValidationCsv
} from "../app/lib/graderHumanValidation.js";

const OPEN_CATEGORIES=["excellent","paraphrase","partial","vague","wrong"];
const MATH_PROFILES=["full-correct","partial","propagated-conceptual","wrong","final-only"];

// The Portuguese calibration records predate the blind-validation workflow and
// store rubric/reference-answer data without repeating the task statement.
// Keep the task statements explicit here so the reviewer sees a self-contained
// question without exposing the reference answer or benchmark category.
const PORTUGUESE_CALIBRATION_PROMPTS={
  "PT639-FND-311":"Explica de que modo uma organização que apresenta primeiro o problema, depois alternativas concretas e, por fim, as condições para as aplicar contribui para a clareza de um texto expositivo.",
  "PT639-FND-313":"Explica de que modo as razões «mais apoio ao estudo» e «maior acesso para alunos sem condições adequadas em casa» sustentam a tese favorável ao alargamento do horário da biblioteca.",
  "PT639-FND-315":"Explica de que modo as expressões «Esta iniciativa» e «Por isso» contribuem para a coesão de um excerto em que uma escola cria uma horta, várias turmas se envolvem e é criado um segundo espaço.",
  "PT639-FND-317":"Na frase «Marta reviu o relatório e entregou-o depois a Leonor», identifica o antecedente do pronome «o» e explica a sua função na coesão da frase.",
  "PT639-FND-319":"Na frase «Os alunos consideraram a proposta útil para a comunidade», identifica a função sintática de «útil para a comunidade» e justifica a resposta.",
  "PT639-FND-322":"Na frase «Quando a chuva terminou, os alunos retomaram a atividade que tinha sido interrompida», classifica as orações «Quando a chuva terminou» e «que tinha sido interrompida» e justifica brevemente.",
};

function takePerProfile(rows,key,profiles,count=3){
  return profiles.flatMap(profile=>rows.filter(row=>row[key]===profile).slice(0,count));
}

function questionForOpenItem(subject,item){
  if(subject==="portuguese")return PORTUGUESE_CALIBRATION_PROMPTS[item.id]||item.q||item.question||item.prompt||"";
  return item.q||item.question||item.prompt||"";
}

function openRows(subject){
  return takePerProfile(OPEN_RESPONSE_CALIBRATION_CASES.filter(row=>row.subject===subject),"category",OPEN_CATEGORIES,3)
    .map(row=>{
      const item=subject==="portuguese"?portugueseCalibrationItemById(row.itemId):physicsChemistryConstructedItemById(row.itemId);
      if(!item)throw new Error(`Missing ${subject} item ${row.itemId}`);
      return makeBlindValidationRow({
        subject,itemId:row.itemId,question:questionForOpenItem(subject,item),response:row.response,maxPoints:item.points||item.maxPoints||100
      });
    });
}

function mathRows(){
  return takePerProfile(MATH_RESPONSE_CALIBRATION_CASES,"profile",MATH_PROFILES,3)
    .map(row=>{
      const item=CONSTRUCTED_RESPONSE_BANK.find(candidate=>candidate.id===row.itemId);
      if(!item)throw new Error(`Missing Mathematics item ${row.itemId}`);
      return makeBlindValidationRow({
        subject:"mathematics",itemId:row.itemId,question:item.q,response:row.answer,maxPoints:item.points||100
      });
    });
}

export function buildGraderHumanValidationPack(){
  const rows=[...mathRows(),...openRows("portuguese"),...openRows("physics-chemistry-a")];
  const counts=rows.reduce((acc,row)=>({...acc,[row.subject]:(acc[row.subject]||0)+1}),{});
  if(rows.length!==GRADER_HUMAN_VALIDATION_TARGET.cases)throw new Error(`Expected ${GRADER_HUMAN_VALIDATION_TARGET.cases} cases, got ${rows.length}`);
  for(const subject of ["mathematics","portuguese","physics-chemistry-a"]){
    if(counts[subject]!==GRADER_HUMAN_VALIDATION_TARGET.perSubject){
      throw new Error(`Expected ${GRADER_HUMAN_VALIDATION_TARGET.perSubject} ${subject} cases, got ${counts[subject]||0}`);
    }
  }
  return rows;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const rows=buildGraderHumanValidationPack();
  const output=new URL("../grader-human-validation-pack.csv",import.meta.url);
  writeFileSync(output,serializeHumanValidationCsv(rows));
  console.log(`✓ ${GRADER_HUMAN_VALIDATION_SCHEMA}: ${rows.length} blind cases written to grader-human-validation-pack.csv`);
  console.log("  15 Matemática A · 15 Português · 15 FQ A");
  console.log("  The export intentionally excludes benchmark labels, answer keys, solutions, grader scores and grader diagnoses.");
}
