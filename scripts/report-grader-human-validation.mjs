import {readFileSync,writeFileSync} from "node:fs";
import {resolve} from "node:path";
import {OPEN_RESPONSE_CALIBRATION_CASES,portugueseCalibrationItemById} from "../app/data/openResponseCalibrationBank.js";
import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";
import {applyPortugueseRubricObservations} from "../app/data/portugueseRubrics.js";
import {gradePortugueseResponse} from "../app/lib/portugueseEngine.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";
import {MATH_RESPONSE_CALIBRATION_CASES} from "../app/data/mathResponseCalibrationBank.js";
import {CONSTRUCTED_RESPONSE_BANK} from "../app/lib/constructedResponseBank.js";
import {gradeResponse as gradeMathResponse} from "../app/lib/constructedResponse.js";
import {buildGraderHumanValidationPack} from "./generate-grader-human-validation-pack.mjs";
import {humanValidationCaseId,summarizeHumanAgreement,validateHumanValidationRows} from "../app/lib/graderHumanValidation.js";

const OPEN_CATEGORIES=["excellent","paraphrase","partial","vague","wrong"];
const MATH_PROFILES=["full-correct","partial","propagated-conceptual","wrong","final-only"];

function takePerProfile(rows,key,profiles,count=3){
  return profiles.flatMap(profile=>rows.filter(row=>row[key]===profile).slice(0,count));
}

function parseDelimitedCsv(text){
  const rows=[];let row=[],cell="",quoted=false;
  const pushCell=()=>{row.push(cell);cell=""};
  const pushRow=()=>{if(row.length||cell){pushCell();rows.push(row)}row=[]};
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    if(quoted){
      if(ch==='"'&&text[i+1]==='"'){cell+='"';i++;continue}
      if(ch==='"'){quoted=false;continue}
      cell+=ch;continue;
    }
    if(ch==='"'){quoted=true;continue}
    if(ch===';'){pushCell();continue}
    if(ch==='\n'){pushRow();continue}
    if(ch==='\r')continue;
    cell+=ch;
  }
  pushRow();
  if(!rows.length)return [];
  const headers=rows[0].map(value=>value.trim());
  return rows.slice(1).filter(values=>values.some(value=>String(value).trim()!=="")).map(values=>Object.fromEntries(headers.map((header,index)=>[header,values[index]??""])));
}

function scorePercent(result){
  if(Number.isFinite(result?.provisionalPoints)&&Number(result?.maxPoints)>0)return Math.round(result.provisionalPoints/result.maxPoints*1000)/10;
  if(Number.isFinite(result?.points)&&Number(result?.maxPoints)>0)return Math.round(result.points/result.maxPoints*1000)/10;
  return 0;
}
function diagnosisCode(result){return result?.feedbackSummary?.errorDiagnosis?.code||result?.errorDiagnosis?.code||null}
function requiresReview(result){return !!result?.requiresReview||result?.status==="needs_review"}

function openGraderRows(){
  return takePerProfile(OPEN_RESPONSE_CALIBRATION_CASES.filter(row=>["portuguese","physics-chemistry-a"].includes(row.subject)),"category",OPEN_CATEGORIES,3)
    .map(row=>{
      let item=row.subject==="portuguese"?portugueseCalibrationItemById(row.itemId):physicsChemistryConstructedItemById(row.itemId);
      if(!item)throw new Error(`Missing ${row.subject} item ${row.itemId}`);
      if(row.subject==="portuguese")item=applyPortugueseRubricObservations([item])[0];
      const result=row.subject==="portuguese"?gradePortugueseResponse(item,row.response):gradePhysicsChemistryResponse(item,row.response);
      return {
        caseId:humanValidationCaseId(row.subject,row.itemId,row.response),
        scorePercent:scorePercent(result),
        diagnosis:diagnosisCode(result)||"other",
        requiresReview:requiresReview(result)
      };
    });
}

function mathGraderRows(){
  return takePerProfile(MATH_RESPONSE_CALIBRATION_CASES,"profile",MATH_PROFILES,3).map(row=>{
    const item=CONSTRUCTED_RESPONSE_BANK.find(candidate=>candidate.id===row.itemId);
    if(!item)throw new Error(`Missing Mathematics item ${row.itemId}`);
    const result=gradeMathResponse(item,row.answer);
    return {
      caseId:humanValidationCaseId("mathematics",row.itemId,row.answer),
      scorePercent:scorePercent(result),
      diagnosis:diagnosisCode(result)||"other",
      requiresReview:requiresReview(result)
    };
  });
}

export function currentGraderRowsForHumanValidation(){return [...mathGraderRows(),...openGraderRows()]}

export function buildHumanAgreementReport(reviewRows){
  const pack=buildGraderHumanValidationPack();
  const checked=validateHumanValidationRows(reviewRows,pack);
  const graderRows=currentGraderRowsForHumanValidation();
  const summary=summarizeHumanAgreement(checked.valid,graderRows);
  return {...summary,invalidRows:checked.invalid,validLabels:checked.valid.length};
}

if(process.argv.length<3){
  console.error("Uso: node scripts/report-grader-human-validation.mjs <csv-preenchido> [outro.csv ...]");
  process.exit(2);
}

const files=process.argv.slice(2);
const reviewRows=files.flatMap(file=>parseDelimitedCsv(readFileSync(resolve(file),"utf8")));
const report=buildHumanAgreementReport(reviewRows);
writeFileSync(resolve("grader-human-validation-report.json"),JSON.stringify(report,null,2));

console.log("=== APProva+ · HUMAN GRADER AGREEMENT ===");
console.log(`Ficheiros importados: ${files.length}`);
console.log(`Labels válidos: ${report.validLabels}`);
console.log(`Casos únicos: ${report.uniqueCases}/45`);
console.log(`Revisores: ${report.reviewers}`);
console.log(`Overlaps: ${report.overlapCases}/9`);
console.log(`Linhas inválidas: ${report.invalidRows.length}`);
if(report.invalidRows.length)report.invalidRows.forEach(row=>console.log(`  ✗ linha ${row.rowNumber}: ${row.reason}`));
console.log(`Human agreement measured: ${report.humanAgreementMeasured?"SIM":"NÃO"}`);
if(report.validLabels){
  console.log(`Δ médio humano↔Apronso: ${report.overall.meanAbsoluteScoreDelta} pp`);
  console.log(`Dentro de ±10 pp: ${report.overall.within10pp}%`);
  console.log(`Concordância diagnóstico: ${report.overall.diagnosisAgreement}%`);
  console.log(`Concordância revisão: ${report.overall.reviewAgreement}%`);
  console.log(`Inter-revisor: ${report.interRater.pairs} pares · Δ médio ${report.interRater.meanAbsoluteScoreDelta??"—"} pp · diagnóstico ${report.interRater.diagnosisAgreement??"—"}%`);
}
console.log("Relatório: grader-human-validation-report.json");

if(report.invalidRows.length)process.exit(1);
