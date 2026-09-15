import fs from "node:fs";

const path=new URL("../app/lib/constructedResponse.js",import.meta.url);
let source=fs.readFileSync(path,"utf8");

const importAnchor=`import {canonicalPolynomial,equivalentPolynomial} from "./polynomial.js";`;
const importReplacement=`import {canonicalPolynomial,equivalentPolynomial} from "./polynomial.js";\nimport {scoreIaveStep,iaveSituationLabel} from "./iaveScoring.js";`;
if(source.includes(importAnchor)&&!source.includes('from "./iaveScoring.js"'))source=source.replace(importAnchor,()=>importReplacement);

const oldNormalizer=`function normalizedWords(value){return String(value??"").toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").replace(/[−–—]/g,"-").replace(/\\s+/g," ").trim()}`;
const newNormalizer=`function normalizedWords(value){
  const base=String(value??"").toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").replace(/[−–—]/g,"-").replace(/\\s+/g," ").trim();
  const numberWords={zero:"0",um:"1",uma:"1",dois:"2",duas:"2",tres:"3",quatro:"4",cinco:"5",seis:"6",sete:"7",oito:"8",nove:"9",dez:"10"};
  return base.replace(/\\b(zero|um|uma|dois|duas|tres|quatro|cinco|seis|sete|oito|nove|dez)\\b/g,word=>numberWords[word]||word);
}
function escapeRegex(value){return String(value).replace(/[.*+?^$()|[\\]\\\\{}]/g,"\\\\$&")}
function conceptPresent(input,candidate){
  const concept=normalizedWords(candidate);
  if(!concept)return false;
  if(new RegExp("(?:^|\\\\b)"+escapeRegex(concept)+"(?:\\\\b|$)","u").test(input))return true;
  if(concept.endsWith("r")&&concept.length>=6){
    const stem=concept.slice(0,-1);
    return new RegExp("\\\\b"+escapeRegex(stem)+"[a-z]*\\\\b","u").test(input);
  }
  return false;
}
function conceptGroupsMatch(spec,input){
  const groups=Array.isArray(spec?.conceptGroups)?spec.conceptGroups:[];
  if(!groups.length||!input)return false;
  const allCandidates=groups.flat().map(normalizedWords).filter(Boolean);
  const explicitNegation=allCandidates.some(candidate=>candidate.includes("nao")&&conceptPresent(input,candidate));
  if(/\\b(?:nao|nunca|jamais)\\b/u.test(input)&&!explicitNegation)return false;
  return groups.every(group=>group.some(candidate=>conceptPresent(input,candidate)));
}
function optionalUnitOmissionMatches(input,candidate){
  const normalizedCandidate=normalizedWords(candidate).replace(/[.!]$/g,"");
  const withoutUnit=normalizedCandidate.replace(/\\s*(?:€|eur|euros?|%|º|graus?|mm|cm|dm|km|m|mg|g|kg|ml|cl|dl|l)\\s*$/u,"").trim();
  return withoutUnit!==normalizedCandidate&&input.replace(/[.!]$/g,"")===withoutUnit;
}`;

if(source.includes(oldNormalizer))source=source.replace(oldNormalizer,()=>newNormalizer);
else if(!source.includes("function conceptGroupsMatch(spec,input)"))throw new Error("constructedResponse normalizer anchor not found");

const oldText=`  if(spec.type==="text"){
    const input=normalizedWords(value);
    // Unrestricted prose is not certified by keyword presence.
    const accepted=[spec.expected,...(spec.accepted||[])].map(candidate=>normalizedWords(candidate).replace(/[.!]$/g,""));
    correct=hasText(value)&&accepted.includes(input.replace(/[.!]$/g,""));
    if(!input)reason="empty_justification";
  }`;
const oldTextAlreadyPatched=`  if(spec.type==="text"){
    const input=normalizedWords(value);
    const accepted=[spec.expected,...(spec.accepted||[])].map(candidate=>normalizedWords(candidate).replace(/[.!]$/g,""));
    correct=hasText(value)&&accepted.includes(input.replace(/[.!]$/g,""));
    if(!correct&&hasText(value)&&conceptGroupsMatch(spec,input))correct=true;
    if(!input)reason="empty_justification";
  }`;
const newText=`  if(spec.type==="text"){
    const input=normalizedWords(value);
    const candidates=[spec.expected,...(spec.accepted||[])].filter(Boolean);
    const accepted=candidates.map(candidate=>normalizedWords(candidate).replace(/[.!]$/g,""));
    correct=hasText(value)&&accepted.includes(input.replace(/[.!]$/g,""));
    // IAVE 2026, situação 16: a omissão da unidade no resultado final não desvaloriza.
    if(!correct&&hasText(value))correct=candidates.some(candidate=>optionalUnitOmissionMatches(input,candidate));
    if(!correct&&hasText(value)&&conceptGroupsMatch(spec,input))correct=true;
    if(!input)reason="empty_justification";
  }`;

if(source.includes(oldText))source=source.replace(oldText,()=>newText);
else if(source.includes(oldTextAlreadyPatched))source=source.replace(oldTextAlreadyPatched,()=>newText);
else if(!source.includes("optionalUnitOmissionMatches(input,candidate)"))throw new Error("constructedResponse text grading anchor not found");

const stepwiseAnchor=`function stepwiseLines(answer){
  if(typeof answer==="string")return answer.split(/\\r?\\n/).map(row=>row.trim()).filter(Boolean);
  if(hasText(answer?.working))return answer.working.split(/\\r?\\n/).map(row=>row.trim()).filter(Boolean);
  return [];
}`;
const stepwiseReplacement=`function stepwiseLines(answer){
  if(typeof answer==="string")return answer.split(/\\r?\\n/).map(row=>row.trim()).filter(Boolean);
  if(hasText(answer?.working))return answer.working.split(/\\r?\\n/).map(row=>row.trim()).filter(Boolean);
  return [];
}
function presentsOnlyFinalResult(question,answer){
  if(answer&&typeof answer==="object"&&Object.values(answer.steps||{}).some(hasText))return false;
  const lines=stepwiseLines(answer);
  if(lines.length!==1||question?.response?.type!=="stepwise"||question.response.steps.length<2)return false;
  const line=lines[0];
  const equalityCount=(line.match(/=/g)||[]).length;
  if(equalityCount>1||/[→⇒]/u.test(line))return false;
  const finalSpec=question.response.steps.at(-1);
  return gradeStep(finalSpec,line).correct;
}`;
if(source.includes(stepwiseAnchor))source=source.replace(stepwiseAnchor,()=>stepwiseReplacement);
else if(!source.includes("function presentsOnlyFinalResult(question,answer)"))throw new Error("stepwise final-result anchor not found");

const explicitAnchor=`          explicit.push({line,correct:values.every(value=>Math.abs(value-target)<=tolerance)});`;
const explicitReplacement=`          explicit.push({line,parts,values,target,tolerance,correct:values.every(value=>Math.abs(value-target)<=tolerance)});`;
if(source.includes(explicitAnchor))source=source.replace(explicitAnchor,()=>explicitReplacement);

const wrongAnchor=`    if(wrong)return {...base,status:right?"needs_review":"incorrect",reason:right?"conflicting_results":"calculation_error",answer:explicit.map(row=>row.line).join("\\n")};`;
const wrongReplacement=`    if(wrong){
      // IAVE 2026, situação 8: só classificamos automaticamente como erro ocasional
      // quando a própria cadeia mostra uma expressão correta e apenas o cálculo final falha.
      const row=explicit.length===1?explicit[0]:null;
      const previousPart=row?.parts?.at(-2)||"";
      const finalPart=row?.parts?.at(-1)||"";
      const previousValue=row?.values?.at(-2);
      const finalValue=row?.values?.at(-1);
      const arithmeticSlip=!!row&&row.values.length>=2&&/[+\\-*/^]/.test(previousPart)&&parseNumeric(finalPart)!==null&&Math.abs(previousValue-row.target)<=row.tolerance&&Math.abs(finalValue-row.target)>row.tolerance;
      if(arithmeticSlip){
        const reason="occasional_calculation_error";
        return {...base,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",answer:row.line};
      }
      return {...base,status:right?"needs_review":"incorrect",reason:right?"conflicting_results":"calculation_error",classificationConfidence:right?"unknown":"low",answer:explicit.map(row=>row.line).join("\\n")};
    }`;
if(source.includes(wrongAnchor))source=source.replace(wrongAnchor,()=>wrongReplacement);
else if(!source.includes('reason="occasional_calculation_error"'))throw new Error("IAVE arithmetic classification anchor not found");

const gradeAnchor=`  if(type==="stepwise"){
    const lines=stepwiseLines(answer);
    const fullAnswer=typeof answer==="string"?answer:answer?.working||"";`;
const gradeReplacement=`  if(type==="stepwise"){
    // IAVE 2026, situação 3: num item por etapas, apresentar apenas o resultado final vale 0 pontos.
    if(presentsOnlyFinalResult(question,answer))return {status:"incorrect",correct:false,points:0,maxPoints,stepResults:[],pendingPoints:0,reviewRequired:false,reason:"final_result_only",iaveSituation:iaveSituationLabel("final_result_only"),classificationConfidence:"high"};
    const lines=stepwiseLines(answer);
    const fullAnswer=typeof answer==="string"?answer:answer?.working||"";`;
if(source.includes(gradeAnchor))source=source.replace(gradeAnchor,()=>gradeReplacement);
else if(!source.includes('reason:"final_result_only"'))throw new Error("stepwise grade anchor not found");

const feedbackAnchor=`export function stepFeedback(row){
  if(row.reason==="calculation_error")return "O cálculo identificado não dá o valor esperado. Compara-o com a resolução abaixo.";`;
const feedbackReplacement=`export function stepFeedback(row){
  if(row.reason==="final_result_only")return "Nos itens de construção por etapas, o resultado final isolado não é pontuado: apresenta os cálculos e justificações necessários.";
  if(row.reason==="occasional_calculation_error")return "O processo identificado está correto, mas há uma falha ocasional no cálculo final desta etapa. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="calculation_error")return "O cálculo identificado não dá o valor esperado. Como não é seguro concluir automaticamente que se trata apenas de uma falha ocasional, esta classificação não é inferida sem evidência suficiente.";`;
if(source.includes(feedbackAnchor))source=source.replace(feedbackAnchor,()=>feedbackReplacement);

fs.writeFileSync(path,source);
console.log("✓ constructed-response grader upgraded: IAVE staged-item rules + high-confidence error classification enabled");
