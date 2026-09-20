import {canonicalPolynomial,equivalentPolynomial} from "./polynomial.js";
import {scoreIaveStep,iaveSituationLabel,dependentStepCap,applyIaveGlobalPenalties,iaveGlobalPenalty} from "./iaveScoring.js";
export function responseType(question){return question?.response?.type||"choice"}
export function isConstructedResponse(question){return !["choice","completion"].includes(responseType(question))}
export function completionFilledCount(question,answer){
  return (question.response?.blanks||[]).filter(blank=>Number.isInteger(answer?.[blank.id])&&answer[blank.id]>=0&&answer[blank.id]<blank.options.length).length;
}
const hasText=value=>typeof value==="string"&&value.trim().length>0;

export function isResponseAnswered(question,answer){
  if(responseType(question)==="completion")return completionFilledCount(question,answer)>0;
  if(responseType(question)==="choice")return Number.isInteger(answer);
  if(responseType(question)==="stepwise")return hasText(answer)||hasText(answer?.working)||Object.values(answer?.steps||{}).some(hasText);
  return hasText(answer);
}

function normalizedInput(value){return String(value??"").trim().replace(/−/g,"-").replace(/\s+/g,"").replace(",", ".")}
function normalizedExpression(value){return normalizedInput(value).toLowerCase().replace(/′/g,"'").replace(/²/g,"^2").replace(/³/g,"^3").replace(/[×·]/g,"*").replace(/:/g,"/")}
function normalizedWords(value){
  const base=String(value??"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[−–—]/g,"-").replace(/\s+/g," ").trim();
  const numberWords={zero:"0",um:"1",uma:"1",dois:"2",duas:"2",tres:"3",quatro:"4",cinco:"5",seis:"6",sete:"7",oito:"8",nove:"9",dez:"10"};
  return base.replace(/\b(zero|um|uma|dois|duas|tres|quatro|cinco|seis|sete|oito|nove|dez)\b/g,word=>numberWords[word]||word);
}
function escapeRegex(value){return String(value).replace(/[.*+?^$()|[\]\\{}]/g,"\\$&")}
function conceptPresent(input,candidate){
  const concept=normalizedWords(candidate);
  if(!concept)return false;
  if(new RegExp("(?:^|\\b)"+escapeRegex(concept)+"(?:\\b|$)","u").test(input))return true;
  if(concept.endsWith("r")&&concept.length>=6){
    const stem=concept.slice(0,-1);
    return new RegExp("\\b"+escapeRegex(stem)+"[a-z]*\\b","u").test(input);
  }
  return false;
}
function conceptGroupsMatch(spec,input){
  const groups=Array.isArray(spec?.conceptGroups)?spec.conceptGroups:[];
  if(!groups.length||!input)return false;
  const allCandidates=groups.flat().map(normalizedWords).filter(Boolean);
  const explicitNegation=allCandidates.some(candidate=>candidate.includes("nao")&&conceptPresent(input,candidate));
  if(/\b(?:nao|nunca|jamais)\b/u.test(input)&&!explicitNegation)return false;
  return groups.every(group=>group.some(candidate=>conceptPresent(input,candidate)));
}
function optionalUnitOmissionMatches(input,candidate){
  const normalizedCandidate=normalizedWords(candidate).replace(/[.!]$/g,"");
  const withoutUnit=normalizedCandidate.replace(/\s*(?:€|eur|euros?|%|º|graus?|mm|cm|dm|km|m|mg|g|kg|ml|cl|dl|l)\s*$/u,"").trim();
  return withoutUnit!==normalizedCandidate&&input.replace(/[.!]$/g,"")===withoutUnit;
}

function withoutPrefix(value){return normalizedInput(value).replace(/^[\p{L}′']+(?:\([^)]*\))?=/u,"")}
function parseNumeric(value){
  const input=withoutPrefix(value);
  if(!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(input))return null;
  const parsed=Number(input);return Number.isFinite(parsed)?parsed:null;
}
function parseFraction(value){
  const match=withoutPrefix(value).match(/^([+-]?\d+)\/([+-]?\d+)$/);
  if(!match)return null;
  const numerator=Number(match[1]),denominator=Number(match[2]);
  if(!Number.isSafeInteger(numerator)||!Number.isSafeInteger(denominator)||denominator===0)return null;
  return {numerator,denominator};
}
function decimalExactness(value,target){
  const input=withoutPrefix(value);
  const match=input.match(/^([+-]?(?:\d+\.\d+|\.\d+))$/);
  if(!match)return null;
  const parsed=Number(match[1]);
  if(!Number.isFinite(parsed))return null;
  const decimals=(match[1].split(".")[1]||"").length;
  const exactTolerance=Number.EPSILON*Math.max(1,Math.abs(target))*4;
  return {parsed,decimals,exact:Math.abs(parsed-target)<=exactTolerance,looksRounded:Math.abs(parsed-target)<=0.5*Math.pow(10,-decimals)+Number.EPSILON};
}
function highConfidenceTranscriptionSlip(previousPart,finalPart,target,tolerance){
  const previous=parseNumeric(previousPart),final=parseNumeric(finalPart);
  if(previous===null||final===null||Math.abs(previous-target)>tolerance||Math.abs(final-target)<=tolerance)return false;
  const a=normalizedInput(previousPart).replace(/^\+/,"");
  const b=normalizedInput(finalPart).replace(/^\+/,"");
  const unsignedA=a.replace(/^[+-]/,"");
  const unsignedB=b.replace(/^[+-]/,"");
  if(unsignedA===unsignedB&&a!==b)return true;
  if(a.length!==b.length)return false;
  let changes=0;
  for(let i=0;i<a.length;i++)if(a[i]!==b[i])changes++;
  return changes===1;
}
function decimalPlaces(value){
  const input=withoutPrefix(value);
  const match=input.match(/^[+-]?\d+(?:\.(\d+))?$/);
  if(!match)return null;
  return (match[1]||"").length;
}
function roundedValue(value,decimals){
  const factor=10**decimals;
  return Math.round((Number(value)+Number.EPSILON)*factor)/factor;
}
function highConfidenceWrongFinalRounding(spec,row){
  const decimals=Number(spec?.rounding?.decimals);
  const source=Number(spec?.rounding?.sourceValue);
  if(!row||!Number.isInteger(decimals)||decimals<0||decimals>10||!Number.isFinite(source)||row.values.length<2)return false;
  const expected=Number(spec.value);
  const mathematicallyRounded=roundedValue(source,decimals);
  const scale=Math.max(1,Math.abs(expected),Math.abs(source));
  if(!Number.isFinite(expected)||Math.abs(expected-mathematicallyRounded)>Number.EPSILON*scale*16)return false;
  const previous=row.values.at(-2),final=row.values.at(-1);
  if(Math.abs(previous-source)>Number.EPSILON*scale*16||Math.abs(final-expected)<=Number.EPSILON*scale*16)return false;
  if(decimalPlaces(row.parts.at(-1))!==decimals)return false;
  const unit=10**(-decimals);
  return Math.abs(final-expected)<=unit+Number.EPSILON*scale*16;
}
function matchesPropagatedApproximation(spec,value){
  const parsed=parseNumeric(value);
  if(parsed===null||!Array.isArray(spec?.propagatedApproximationValues))return false;
  return spec.propagatedApproximationValues.some(candidate=>Number.isFinite(Number(candidate))&&Math.abs(parsed-Number(candidate))<=Number.EPSILON*Math.max(1,Math.abs(parsed),Math.abs(Number(candidate)))*16);
}
function normalizedDeclaredStepValue(spec,value){
  if(spec?.type==="text")return normalizedWords(value).replace(/[.!]$/g,"");
  if(spec?.type==="expression")return normalizedExpression(value);
  return normalizedInput(value);
}
function declaredExactIssue(spec,value,key){
  if(!hasText(value)||!Array.isArray(spec?.[key]))return null;
  const actual=normalizedDeclaredStepValue(spec,value);
  return spec[key].map(entry=>typeof entry==="string"?{value:entry}:entry).find(entry=>entry&&hasText(entry.value)&&normalizedDeclaredStepValue(spec,entry.value)===actual)||null;
}
function declaredIncompleteStep(spec,value){
  if(!hasText(value)||!Array.isArray(spec?.incompleteAccepted))return null;
  const actual=normalizedDeclaredStepValue(spec,value);
  return spec.incompleteAccepted.find(entry=>entry&&typeof entry==="object"&&hasText(entry.value)&&typeof entry.missingOnlyFinalPassage==="boolean"&&normalizedDeclaredStepValue(spec,entry.value)===actual)||null;
}
function declaredIntermediateRounding(spec,value){
  if(!hasText(value)||!Array.isArray(spec?.intermediateRoundingAccepted))return null;
  const actual=normalizedDeclaredStepValue(spec,value);
  return spec.intermediateRoundingAccepted.find(entry=>hasText(entry)&&normalizedDeclaredStepValue(spec,entry)===actual)||null;
}
function declaredUpstreamErrorEffect(spec,value,stepResults){
  if(!hasText(value)||!Array.isArray(spec?.errorEffects))return null;
  const actual=normalizedDeclaredStepValue(spec,value);
  return spec.errorEffects.find(effect=>{
    if(!effect||typeof effect.from!=="string"||typeof effect.difficultyReduced!=="boolean"||!Array.isArray(effect.reasons)||!effect.reasons.length||!Array.isArray(effect.accepted)||!effect.accepted.length)return false;
    const upstream=stepResults.find(row=>row.stepId===effect.from);
    if(!upstream||!effect.reasons.includes(upstream.reason))return false;
    return effect.accepted.some(candidate=>hasText(candidate)&&normalizedDeclaredStepValue(spec,candidate)===actual);
  })||null;
}
function declaredInstructionViolation(spec,value){
  const issue=declaredExactIssue(spec,value,"instructionViolationAccepted");
  if(!issue||!Array.isArray(issue.dependentStepIds))return null;
  const dependentStepIds=issue.dependentStepIds.filter(id=>typeof id==="string"&&id.length>0);
  return {...issue,dependentStepIds};
}
function declaredImplicitRule(spec){
  const rule=spec?.implicitNonCalculation;
  if(!rule||!Array.isArray(rule.evidence)||!Array.isArray(rule.dependentStepIds))return null;
  const validEvidence=rule.evidence.filter(entry=>entry&&typeof entry.from==="string"&&Array.isArray(entry.accepted)&&entry.accepted.some(hasText));
  if(!validEvidence.length)return null;
  return {...rule,evidence:validEvidence,dependentStepIds:rule.dependentStepIds.filter(id=>typeof id==="string"&&id.length>0)};
}
function implicitEvidenceMatches(question,answer,rule){
  return rule.evidence.some(entry=>{
    const sourceSpec=question.response.steps.find(stepSpec=>stepSpec.id===entry.from);
    const sourceValue=answer?.steps?.[entry.from];
    if(!sourceSpec||!hasText(sourceValue))return false;
    const actual=normalizedDeclaredStepValue(sourceSpec,sourceValue);
    return entry.accepted.some(candidate=>hasText(candidate)&&normalizedDeclaredStepValue(sourceSpec,candidate)===actual);
  });
}

function gradeStep(spec,value){
  let correct=false,reason="incorrect";
  const instructionViolation=declaredInstructionViolation(spec,value);
  if(instructionViolation){
    reason="instruction_violation";
    return {stepId:spec.id,label:spec.label,status:"incorrect",correct:false,points:0,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",dependentStepIds:instructionViolation.dependentStepIds};
  }
  const missingRequiredWork=declaredExactIssue(spec,value,"missingRequiredWorkAccepted");
  if(missingRequiredWork){
    reason="missing_required_work";
    return {stepId:spec.id,label:spec.label,status:"incorrect",correct:false,points:0,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
  }
  const typedPrefix=String(value??"").includes("=")?String(value).split("=")[0]:null;
  const expectedPrefix=String(spec.expected).includes("=")?String(spec.expected).split("=")[0]:null;
  if(["numeric","fraction"].includes(spec.type)&&typedPrefix&&expectedPrefix&&normalizedExpression(typedPrefix)!==normalizedExpression(expectedPrefix))return {stepId:spec.id,label:spec.label,status:"incorrect",correct:false,points:0,maxPoints:spec.points,expected:spec.expected,answer:value,reason:"wrong_quantity"};
  if(spec.type==="numeric"){
    const parsed=parseNumeric(value),tolerance=Math.max(0,Number(spec.tolerance)||0);
    correct=parsed!==null&&Math.abs(parsed-Number(spec.value))<=tolerance+Number.EPSILON;
    if(parsed===null)reason="invalid_numeric_format";
  }
  if(spec.type==="fraction"){
    const parsed=parseFraction(value);
    const target=spec.numerator/spec.denominator;
    correct=!!parsed&&parsed.numerator*spec.denominator===spec.numerator*parsed.denominator;
    if(!parsed){
      const decimal=decimalExactness(value,target);
      if(decimal?.exact){
        reason="wrong_final_form";
        return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
      }
      if(decimal?.looksRounded){
        reason="approximate_instead_of_exact";
        return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
      }
      reason="invalid_fraction_format";
    }
  }
  if(spec.type==="expression"){
    const input=normalizedExpression(value);
    correct=hasText(value)&&[spec.expected,...(spec.accepted||[])].filter(Boolean).some(candidate=>{
      const expected=normalizedExpression(candidate);
      if(expected===input)return true;
      const strip=s=>s.replace(/^f'\(x\)=/,"");
      const a=strip(input),b=strip(expected);
      return a.includes("x")&&b.includes("x")&&equivalentPolynomial(a,b);
    });
    if(!input)reason="empty_expression";
  }
  if(spec.type==="text"){
    const input=normalizedWords(value);
    const candidates=[spec.expected,...(spec.accepted||[])].filter(Boolean);
    const accepted=candidates.map(candidate=>normalizedWords(candidate).replace(/[.!]$/g,""));
    correct=hasText(value)&&accepted.includes(input.replace(/[.!]$/g,""));
    if(!correct&&hasText(value))correct=candidates.some(candidate=>optionalUnitOmissionMatches(input,candidate));
    if(!correct&&hasText(value)&&conceptGroupsMatch(spec,input))correct=true;
    if(!input)reason="empty_justification";
  }
  if(!correct&&hasText(value)){
    const copiedData=declaredExactIssue(spec,value,"copiedDataAccepted");
    if(copiedData&&typeof copiedData.difficultyReduced==="boolean"){
      reason="copied_data_error";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:spec.points,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",difficultyReduced:copiedData.difficultyReduced};
    }
    const conceptual=declaredExactIssue(spec,value,"conceptualErrorAccepted");
    if(conceptual){
      reason="conceptual_error";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
    }
    const excess=declaredExactIssue(spec,value,"excessElementsAccepted");
    if(excess&&typeof excess.affectsPerformance==="boolean"){
      reason="excess_elements";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:spec.points,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",affectsPerformance:excess.affectsPerformance};
    }
    const formal=declaredExactIssue(spec,value,"formalNotationAccepted");
    if(formal&&typeof formal.onlyZeroPointSteps==="boolean"){
      reason="formal_notation_error";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:spec.points,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",onlyZeroPointSteps:formal.onlyZeroPointSteps};
    }
    const incomplete=declaredIncompleteStep(spec,value);
    if(incomplete){
      reason="incomplete_step";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason,missingOnlyFinalPassage:incomplete.missingOnlyFinalPassage}),maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",missingOnlyFinalPassage:incomplete.missingOnlyFinalPassage};
    }
    if(declaredIntermediateRounding(spec,value)){
      reason="intermediate_rounding";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:spec.points,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",globalPenalty:1};
    }
  }
  return {stepId:spec.id,label:spec.label,status:correct?"correct":"incorrect",correct,points:correct?spec.points:0,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason:correct?null:reason};
}

function stepwiseLines(answer){
  if(typeof answer==="string")return answer.split(/\r?\n/).map(row=>row.trim()).filter(Boolean);
  if(hasText(answer?.working))return answer.working.split(/\r?\n/).map(row=>row.trim()).filter(Boolean);
  return [];
}
function presentsOnlyFinalResult(question,answer){
  if(answer&&typeof answer==="object"&&Object.values(answer.steps||{}).some(hasText))return false;
  const lines=stepwiseLines(answer);
  if(lines.length!==1||question?.response?.type!=="stepwise"||question.response.steps.length<2)return false;
  const line=lines[0];
  const equalityCount=(line.match(/=/g)||[]).length;
  if(/[→⇒]/u.test(line))return false;
  if(equalityCount>1&&!line.includes(";"))return false;
  const finalSpec=question.response.steps.at(-1);
  if(gradeStep(finalSpec,line).correct)return true;
  return gradeStepFromWorking(finalSpec,[line],line,new Set()).correct;
}

function constantValue(source){
  const canonical=canonicalPolynomial(normalizedExpression(source));
  if(!canonical||canonical.includes(","))return null;
  const [n,d]=canonical.split("/").map(Number);
  const value=n/d;return Number.isFinite(value)?value:null;
}

function gradeStepFromWorking(spec,lines,fullAnswer,usedUnlabelled=new Set()){
  const candidates=lines.map((value,index)=>({value,index,labelled:value.includes("=")})).filter(row=>row.labelled||!usedUnlabelled.has(row.index));
  const explicit=[];
  const expectedPrefix=String(spec.expected).includes("=")?String(spec.expected).split("=")[0]:null;
  for(const [index,line] of lines.entries()){
    const parts=line.split("=").map(x=>x.trim());
    const matches=parts.length>1&&[expectedPrefix,...(spec.prefixes||[])].filter(Boolean).some(prefix=>normalizedExpression(parts[0])===normalizedExpression(prefix));
    if(matches){
      candidates.push(...parts.slice(1).map(value=>({value,index,labelled:true})));
      if(["numeric","fraction"].includes(spec.type)){
        const values=parts.slice(1).map(constantValue);
        if(values.every(value=>value!==null)){
          const target=spec.type==="numeric"?spec.value:spec.numerator/spec.denominator;
          const tolerance=Math.max(0,Number(spec.tolerance)||0)+Number.EPSILON;
          explicit.push({line,parts,values,target,tolerance,correct:values.every(value=>Math.abs(value-target)<=tolerance)});
        }
      }
    }
  }
  const base=gradeStep(spec,"");
  if(explicit.length){
    const right=explicit.some(row=>row.correct),wrong=explicit.some(row=>!row.correct);
    if(wrong){
      const row=explicit.length===1?explicit[0]:null;
      const previousPart=row?.parts?.at(-2)||"";
      const finalPart=row?.parts?.at(-1)||"";
      const previousValue=row?.values?.at(-2);
      const finalValue=row?.values?.at(-1);
      if(highConfidenceWrongFinalRounding(spec,row)){
        const reason="wrong_final_rounding";
        return {...base,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",answer:row.line};
      }
      const transcriptionSlip=!!row&&row.values.length>=2&&highConfidenceTranscriptionSlip(previousPart,finalPart,row.target,row.tolerance);
      if(transcriptionSlip){
        const reason="copied_number_or_sign_error";
        return {...base,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",answer:row.line};
      }
      const arithmeticSlip=!!row&&row.values.length>=2&&/[+\-*/^]/.test(previousPart)&&parseNumeric(finalPart)!==null&&Math.abs(previousValue-row.target)<=row.tolerance&&Math.abs(finalValue-row.target)>row.tolerance;
      if(arithmeticSlip){
        const reason="occasional_calculation_error";
        return {...base,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",answer:row.line};
      }
      return {...base,status:right?"needs_review":"incorrect",reason:right?"conflicting_results":"calculation_error",classificationConfidence:right?"unknown":"low",answer:explicit.map(row=>row.line).join("\n")};
    }
    return {...base,status:"correct",correct:true,points:spec.points,reason:null,answer:explicit[0].line};
  }
  if(spec.type==="text"&&hasText(fullAnswer))candidates.push({value:fullAnswer,index:null,labelled:true});
  for(const candidate of candidates){
    const result=gradeStep(spec,candidate.value);
    if(result.correct||result.status==="partial")return {...result,matchedUnlabelledIndex:candidate.labelled?null:candidate.index};
  }
  const recognizable=lines.some(line=>canonicalPolynomial(normalizedExpression(line))!==null||/[=→∫√]/.test(line)||/[a-zÀ-ÿ]{3,}/i.test(line));
  return fullAnswer.trim()?{...base,status:"needs_review",reason:recognizable?"not_verified":"no_recognizable_work",answer:""}:base;
}

export function stepFeedback(row){
  if(row.reason==="final_result_only")return "Nos itens de construção por etapas, o resultado final isolado não é pontuado: apresenta os cálculos e justificações necessários.";
  if(row.reason==="instruction_violation")return "Foi usado um processo que o enunciado excluía explicitamente. Esta etapa e apenas as etapas declaradas como dependentes recebem zero, de acordo com os critérios IAVE.";
  if(row.reason==="missing_required_work")return "Faltam os cálculos ou a justificação que o critério exige nesta etapa; por isso, esta etapa recebe zero pontos.";
  if(row.reason==="implicit_non_calculation_step")return row.implicitTraversal?"A etapa não foi escrita isoladamente, mas a resolução posterior prova inequivocamente que foi percorrida; foi atribuída a cotação prevista.":"A etapa não foi apresentada e a resolução não prova inequivocamente que foi percorrida; esta etapa e as dependentes declaradas recebem zero.";
  if(row.reason==="dependent_zero_due_to_iave")return "Esta etapa depende de uma etapa anterior que, pelos critérios IAVE, obriga a cotação zero nas etapas dependentes.";
  if(row.reason==="copied_data_error")return row.difficultyReduced?"Foi identificado um erro de cópia de dados que altera a dificuldade. O corretor mantém essa origem explícita para aplicar corretamente os limites nas etapas dependentes.":"Foi identificado um erro de cópia de dados sem redução de dificuldade. Aplicámos a desvalorização global prevista nos critérios IAVE.";
  if(row.reason==="copied_number_or_sign_error")return "A cadeia mostra o valor correto e uma troca isolada de algarismo ou sinal na sua transcrição. Aplicámos apenas a desvalorização prevista para esta situação.";
  if(row.reason==="occasional_calculation_error")return "O processo identificado está correto, mas há uma falha ocasional no cálculo final desta etapa. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="conceptual_error")return "O item identifica esta resposta como um erro conceptual específico. A etapa ficou limitada à parte inteira de metade da cotação, de acordo com os critérios IAVE.";
  if(row.reason==="incomplete_step")return row.missingOnlyFinalPassage?"A etapa está correta até à última passagem necessária. Foi aplicada apenas a desvalorização prevista para essa omissão final.":"A etapa está incompleta segundo o critério específico do item. Foi aplicado o limite de cotação previsto nos critérios IAVE.";
  if(row.reason==="intermediate_rounding")return "Foi identificado um cálculo intermédio com número de casas decimais diferente do solicitado ou um arredondamento intermédio incorreto. A regra geral IAVE retira um ponto à soma das pontuações da resposta.";
  if(row.reason==="upstream_error_effect")return row.difficultyReduced?"Esta etapa segue corretamente o erro anterior, mas esse erro tornou a etapa mais fácil. Aplicámos o limite de metade da cotação previsto na Nota 2 dos critérios IAVE.":"Esta etapa segue corretamente o erro anterior sem redução de dificuldade e foi classificada pelo critério específico adaptado.";
  if(row.reason==="wrong_final_form")return "O valor é matematicamente equivalente, mas não está apresentado na forma final pedida. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="approximate_instead_of_exact")return "Foi apresentado um valor aproximado quando era exigido um valor exato. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="approximate_used_instead_of_exact")return "Uma aproximação anterior foi usada num cálculo seguinte em vez do valor exato. Aplicámos o limite de cotação previsto nos critérios IAVE.";
  if(row.reason==="wrong_final_rounding")return "A cadeia mostra o valor não arredondado correto, mas o arredondamento final indicado está incorreto. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="excess_elements")return row.affectsPerformance?"Foram identificados elementos em excesso que afetam o desempenho pedido. Aplicámos a desvalorização global prevista nos critérios IAVE.":"Foram identificados elementos em excesso, mas sem efeito no desempenho pedido; não houve desvalorização automática.";
  if(row.reason==="formal_notation_error")return row.onlyZeroPointSteps?"Foi identificada uma incorreção de simbologia apenas em etapas sem pontuação; não houve desvalorização global.":"Foi identificada uma incorreção de simbologia formal numa etapa pontuada. Aplicámos a desvalorização global prevista nos critérios IAVE.";
  if(row.reason==="calculation_error")return "O cálculo identificado não dá o valor esperado. Como não é seguro concluir automaticamente que se trata apenas de uma falha ocasional, esta classificação não é inferida sem evidência suficiente.";
  if(row.reason==="conflicting_results")return "Encontrámos resultados incompatíveis para a mesma grandeza. Não atribuímos estes pontos automaticamente.";
  if(row.reason==="no_recognizable_work")return "Não identificámos cálculos ou uma explicação que permitam avaliar esta etapa.";
  if(row.status==="needs_review")return "Não conseguimos confirmar esta etapa. Pode estar incompleta ou escrita de uma forma que o corretor ainda não reconhece.";
  return `Identificado na tua resolução: ${row.answer||"Não identificado"}`;
}

export function expectedResponseLabel(question){
  const response=question?.response;
  if(response?.type==="completion")return response.blanks.map(b=>`${b.label} ${b.options[b.correct]}`).join(" · ");
  if(!response)return question?.o?.[question?.a]??"—";
  if(response.type==="numeric")return String(response.value).replace(".",",");
  if(response.type==="fraction")return `${response.numerator}/${response.denominator}`;
  if(response.type==="stepwise")return response.steps.map(row=>`${row.label}: ${row.expected}`).join(" · ");
  return "—";
}

export function studentResponseLabel(question,answer){
  if(!isResponseAnswered(question,answer))return "Sem resposta";
  if(responseType(question)==="completion")return question.response.blanks.map(b=>`${b.label} ${b.options[answer?.[b.id]]??"Sem resposta"}`).join(" · ");
  if(responseType(question)==="choice")return `${String.fromCharCode(65+answer)} — ${question.o[answer]}`;
  if(responseType(question)==="stepwise"){
    if(typeof answer==="string")return answer.trim();
    const filled=question.response.steps.filter(row=>hasText(answer?.steps?.[row.id])).length;
    return hasText(answer?.working)?answer.working.trim():`${filled}/${question.response.steps.length} etapas preenchidas`;
  }
  return String(answer).trim();
}

export function gradeResponse(question,answer){
  const type=responseType(question),maxPoints=Number(question?.points)||(type==="choice"?5:35);
  if(!isResponseAnswered(question,answer))return {status:"unanswered",correct:false,points:0,maxPoints,stepResults:[]};
  if(type==="completion"){
    const blanks=question.response.blanks;
    const blankResults=blanks.map(b=>({id:b.id,label:b.label,correct:answer?.[b.id]===b.correct,answer:b.options[answer?.[b.id]]??"Sem resposta",expected:b.options[b.correct]}));
    const correctCount=blankResults.filter(b=>b.correct).length;
    const points=maxPoints*correctCount/blanks.length,correct=correctCount===blanks.length;
    return {status:correct?"correct":points>0?"partial":"incorrect",correct,points,maxPoints,stepResults:[],blankResults};
  }
  if(type==="stepwise"){
    if(presentsOnlyFinalResult(question,answer))return {status:"incorrect",correct:false,points:0,maxPoints,stepResults:[],pendingPoints:0,reviewRequired:false,reason:"final_result_only",iaveSituation:iaveSituationLabel("final_result_only"),classificationConfidence:"high"};
    const lines=stepwiseLines(answer);
    const fullAnswer=typeof answer==="string"?answer:answer?.working||"";
    const usedUnlabelled=new Set();
    const rawStepResults=question.response.steps.map(spec=>{
      if(hasText(answer?.steps?.[spec.id])){
        const result=gradeStep(spec,answer.steps[spec.id]);
        return !result.correct&&result.status!=="partial"&&spec.type==="text"?{...result,status:"needs_review",reason:"not_verified"}:result;
      }
      const result=gradeStepFromWorking(spec,lines,fullAnswer,usedUnlabelled);
      if((result.correct||result.status==="partial")&&Number.isInteger(result.matchedUnlabelledIndex))usedUnlabelled.add(result.matchedUnlabelledIndex);
      return result;
    });
    const implicitAdjustedResults=rawStepResults.map((result,index)=>{
      const spec=question.response.steps[index];
      const rule=declaredImplicitRule(spec);
      if(!rule||hasText(answer?.steps?.[spec.id]))return result;
      const implicitTraversal=implicitEvidenceMatches(question,answer,rule);
      const reason="implicit_non_calculation_step";
      return {...result,status:implicitTraversal?"correct":"incorrect",correct:implicitTraversal,points:implicitTraversal?spec.points:0,reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",implicitTraversal,dependentStepIds:rule.dependentStepIds};
    });
    const approximationAdjustedResults=implicitAdjustedResults.map((result,index)=>{
      const spec=question.response.steps[index];
      if(result.correct||!spec?.approximationDependsOn||!matchesPropagatedApproximation(spec,answer?.steps?.[spec.id]))return result;
      const upstreamIds=Array.isArray(spec.approximationDependsOn)?spec.approximationDependsOn:[spec.approximationDependsOn];
      const upstreamApproximation=implicitAdjustedResults.some(row=>upstreamIds.includes(row.stepId)&&row.reason==="approximate_instead_of_exact");
      if(!upstreamApproximation)return result;
      const reason="approximate_used_instead_of_exact";
      return {...result,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
    });
    const dependencySources=approximationAdjustedResults.filter(row=>(row.reason==="instruction_violation"||(row.reason==="implicit_non_calculation_step"&&!row.implicitTraversal))&&Array.isArray(row.dependentStepIds));
    const zeroedByDependency=approximationAdjustedResults.map(result=>{
      const source=dependencySources.find(row=>row.dependentStepIds.includes(result.stepId));
      if(!source||result.stepId===source.stepId)return result;
      return {...result,status:"incorrect",correct:false,points:0,reason:"dependent_zero_due_to_iave",classificationConfidence:"high",sourceStepId:source.stepId,iaveRule:source.iaveSituation};
    });
    const stepResults=zeroedByDependency.map((result,index)=>{
      const spec=question.response.steps[index];
      const directValue=answer?.steps?.[spec.id];
      if(result.correct||result.status==="partial"||!hasText(directValue))return result;
      const effect=declaredUpstreamErrorEffect(spec,directValue,zeroedByDependency);
      if(!effect)return result;
      const points=effect.difficultyReduced?dependentStepCap(spec.points,{upstreamDifficultyReduced:true}):spec.points;
      return {...result,status:points===spec.points?"correct":"partial",correct:points===spec.points,points,reason:"upstream_error_effect",classificationConfidence:"high",iaveRule:"Nota 2",sourceStepId:effect.from,difficultyReduced:effect.difficultyReduced};
    });
    const stepPoints=stepResults.reduce((sum,row)=>sum+row.points,0);
    const globalReasons=[];
    if(stepResults.some(row=>row.reason==="intermediate_rounding"))globalReasons.push({reason:"intermediate_rounding"});
    for(const row of stepResults){
      if(row.reason==="copied_data_error")globalReasons.push({reason:row.reason,difficultyReduced:row.difficultyReduced});
      if(row.reason==="excess_elements")globalReasons.push({reason:row.reason,affectsPerformance:row.affectsPerformance});
      if(row.reason==="formal_notation_error")globalReasons.push({reason:row.reason,onlyZeroPointSteps:row.onlyZeroPointSteps});
    }
    const points=applyIaveGlobalPenalties(stepPoints,globalReasons),globalPenalty=stepPoints-points,correct=points===maxPoints;
    const pendingPoints=stepResults.filter(row=>row.status==="needs_review").reduce((sum,row)=>sum+row.maxPoints,0);
    const globalPenalties=globalReasons.map(item=>({reason:item.reason,iaveSituation:iaveSituationLabel(item.reason),points:iaveGlobalPenalty(item.reason,item),classificationConfidence:"high"})).filter(item=>item.points>0);
    return {status:pendingPoints?"needs_review":correct?"correct":points>0?"partial":"incorrect",correct,points,maxPoints,stepResults,pendingPoints,reviewRequired:pendingPoints>0,globalPenalty,globalPenalties,reason:pendingPoints?"not_verified":correct?null:points>0?"partial_credit":"incorrect"};
  }
  let correct=false,reason="incorrect";
  if(type==="choice")correct=answer===question.a;
  if(type==="numeric"){
    const parsed=parseNumeric(answer),tolerance=Math.max(0,Number(question.response.tolerance)||0);
    correct=parsed!==null&&Math.abs(parsed-Number(question.response.value))<=tolerance+Number.EPSILON;
    if(parsed===null)reason="invalid_numeric_format";
  }
  if(type==="fraction"){
    const parsed=parseFraction(answer);
    correct=!!parsed&&parsed.numerator*question.response.denominator===question.response.numerator*parsed.denominator;
    if(!parsed)reason="invalid_fraction_format";
  }
  return {status:correct?"correct":"incorrect",correct,points:correct?maxPoints:0,maxPoints,stepResults:[],reason:correct?null:reason};
}

export function miniExamPointSummary(questions=[],answers=[]){
  const results=questions.map((question,index)=>({questionId:question.id,answer:answers[index],...gradeResponse(question,answers[index])}));
  const earnedPoints=results.reduce((sum,row)=>sum+row.points,0),maxPoints=results.reduce((sum,row)=>sum+row.maxPoints,0);
  const score20=maxPoints?Math.round((earnedPoints/maxPoints)*200)/10:0;
  const pendingPoints=results.reduce((sum,row)=>sum+(row.pendingPoints||0),0);
  return {results,earnedPoints,maxPoints,score20,pendingPoints,reviewRequired:pendingPoints>0,score20Upper:maxPoints?Math.round((earnedPoints+pendingPoints)/maxPoints*200)/10:0,correctCount:results.filter(row=>row.correct).length};
}

export function examScoreLabel(result){
  const lower=String(result.score20).replace(".",",");
  return result.reviewRequired?"Avaliação incompleta":`${lower}/20`;
}
import {CONSTRUCTED_RESPONSE_BANK} from "./constructedResponseBank";
import {COMPLETION_RESPONSE_BANK} from "./completionResponseBank";

export function responseType(question){return question?.response?.type||"choice"}
export function isConstructedResponse(question){return !["choice","completion"].includes(responseType(question))}
export function completionFilledCount(question,answer){
  return (question.response?.blanks||[]).filter(blank=>Number.isInteger(answer?.[blank.id])&&answer[blank.id]>=0&&answer[blank.id]<blank.options.length).length;
}
const hasText=value=>typeof value==="string"&&value.trim().length>0;

export function isResponseAnswered(question,answer){
  if(responseType(question)==="completion")return completionFilledCount(question,answer)>0;
  if(responseType(question)==="choice")return Number.isInteger(answer);
  if(responseType(question)==="stepwise")return hasText(answer)||hasText(answer?.working)||Object.values(answer?.steps||{}).some(hasText);
  return hasText(answer);
}

function normalizedInput(value){return String(value??"").trim().replace(/−/g,"-").replace(/\s+/g,"").replace(",", ".")}
function normalizedExpression(value){return normalizedInput(value).toLowerCase().replace(/′/g,"'").replace(/²/g,"^2").replace(/³/g,"^3").replace(/[×·]/g,"*").replace(/:/g,"/")}
function normalizedWords(value){
  const base=String(value??"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[−–—]/g,"-").replace(/\s+/g," ").trim();
  const numberWords={zero:"0",um:"1",uma:"1",dois:"2",duas:"2",tres:"3",quatro:"4",cinco:"5",seis:"6",sete:"7",oito:"8",nove:"9",dez:"10"};
  return base.replace(/\b(zero|um|uma|dois|duas|tres|quatro|cinco|seis|sete|oito|nove|dez)\b/g,word=>numberWords[word]||word);
}
function escapeRegex(value){return String(value).replace(/[.*+?^$()|[\]\\{}]/g,"\\$&")}
function conceptPresent(input,candidate){
  const concept=normalizedWords(candidate);
  if(!concept)return false;
  if(new RegExp("(?:^|\\b)"+escapeRegex(concept)+"(?:\\b|$)","u").test(input))return true;
  if(concept.endsWith("r")&&concept.length>=6){
    const stem=concept.slice(0,-1);
    return new RegExp("\\b"+escapeRegex(stem)+"[a-z]*\\b","u").test(input);
  }
  return false;
}
function conceptGroupsMatch(spec,input){
  const groups=Array.isArray(spec?.conceptGroups)?spec.conceptGroups:[];
  if(!groups.length||!input)return false;
  const allCandidates=groups.flat().map(normalizedWords).filter(Boolean);
  const explicitNegation=allCandidates.some(candidate=>candidate.includes("nao")&&conceptPresent(input,candidate));
  if(/\b(?:nao|nunca|jamais)\b/u.test(input)&&!explicitNegation)return false;
  return groups.every(group=>group.some(candidate=>conceptPresent(input,candidate)));
}
function optionalUnitOmissionMatches(input,candidate){
  const normalizedCandidate=normalizedWords(candidate).replace(/[.!]$/g,"");
  const withoutUnit=normalizedCandidate.replace(/\s*(?:€|eur|euros?|%|º|graus?|mm|cm|dm|km|m|mg|g|kg|ml|cl|dl|l)\s*$/u,"").trim();
  return withoutUnit!==normalizedCandidate&&input.replace(/[.!]$/g,"")===withoutUnit;
}

function withoutPrefix(value){return normalizedInput(value).replace(/^[\p{L}′']+(?:\([^)]*\))?=/u,"")}
function parseNumeric(value){
  const input=withoutPrefix(value);
  if(!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(input))return null;
  const parsed=Number(input);return Number.isFinite(parsed)?parsed:null;
}
function parseFraction(value){
  const match=withoutPrefix(value).match(/^([+-]?\d+)\/([+-]?\d+)$/);
  if(!match)return null;
  const numerator=Number(match[1]),denominator=Number(match[2]);
  if(!Number.isSafeInteger(numerator)||!Number.isSafeInteger(denominator)||denominator===0)return null;
  return {numerator,denominator};
}
function decimalExactness(value,target){
  const input=withoutPrefix(value);
  const match=input.match(/^([+-]?(?:\d+\.\d+|\.\d+))$/);
  if(!match)return null;
  const parsed=Number(match[1]);
  if(!Number.isFinite(parsed))return null;
  const decimals=(match[1].split(".")[1]||"").length;
  const exactTolerance=Number.EPSILON*Math.max(1,Math.abs(target))*4;
  return {parsed,decimals,exact:Math.abs(parsed-target)<=exactTolerance,looksRounded:Math.abs(parsed-target)<=0.5*Math.pow(10,-decimals)+Number.EPSILON};
}
function highConfidenceTranscriptionSlip(previousPart,finalPart,target,tolerance){
  const previous=parseNumeric(previousPart),final=parseNumeric(finalPart);
  if(previous===null||final===null||Math.abs(previous-target)>tolerance||Math.abs(final-target)<=tolerance)return false;
  const a=normalizedInput(previousPart).replace(/^\+/,"");
  const b=normalizedInput(finalPart).replace(/^\+/,"");
  const unsignedA=a.replace(/^[+-]/,"");
  const unsignedB=b.replace(/^[+-]/,"");
  if(unsignedA===unsignedB&&a!==b)return true;
  if(a.length!==b.length)return false;
  let changes=0;
  for(let i=0;i<a.length;i++)if(a[i]!==b[i])changes++;
  return changes===1;
}
function decimalPlaces(value){
  const input=withoutPrefix(value);
  const match=input.match(/^[+-]?\d+(?:\.(\d+))?$/);
  if(!match)return null;
  return (match[1]||"").length;
}
function roundedValue(value,decimals){
  const factor=10**decimals;
  return Math.round((Number(value)+Number.EPSILON)*factor)/factor;
}
function highConfidenceWrongFinalRounding(spec,row){
  const decimals=Number(spec?.rounding?.decimals);
  const source=Number(spec?.rounding?.sourceValue);
  if(!row||!Number.isInteger(decimals)||decimals<0||decimals>10||!Number.isFinite(source)||row.values.length<2)return false;
  const expected=Number(spec.value);
  const mathematicallyRounded=roundedValue(source,decimals);
  const scale=Math.max(1,Math.abs(expected),Math.abs(source));
  if(!Number.isFinite(expected)||Math.abs(expected-mathematicallyRounded)>Number.EPSILON*scale*16)return false;
  const previous=row.values.at(-2),final=row.values.at(-1);
  if(Math.abs(previous-source)>Number.EPSILON*scale*16||Math.abs(final-expected)<=Number.EPSILON*scale*16)return false;
  if(decimalPlaces(row.parts.at(-1))!==decimals)return false;
  const unit=10**(-decimals);
  return Math.abs(final-expected)<=unit+Number.EPSILON*scale*16;
}
function matchesPropagatedApproximation(spec,value){
  const parsed=parseNumeric(value);
  if(parsed===null||!Array.isArray(spec?.propagatedApproximationValues))return false;
  return spec.propagatedApproximationValues.some(candidate=>Number.isFinite(Number(candidate))&&Math.abs(parsed-Number(candidate))<=Number.EPSILON*Math.max(1,Math.abs(parsed),Math.abs(Number(candidate)))*16);
}
function normalizedDeclaredStepValue(spec,value){
  if(spec?.type==="text")return normalizedWords(value).replace(/[.!]$/g,"");
  if(spec?.type==="expression")return normalizedExpression(value);
  return normalizedInput(value);
}
function declaredExactIssue(spec,value,key){
  if(!hasText(value)||!Array.isArray(spec?.[key]))return null;
  const actual=normalizedDeclaredStepValue(spec,value);
  return spec[key].map(entry=>typeof entry==="string"?{value:entry}:entry).find(entry=>entry&&hasText(entry.value)&&normalizedDeclaredStepValue(spec,entry.value)===actual)||null;
}
function declaredIncompleteStep(spec,value){
  if(!hasText(value)||!Array.isArray(spec?.incompleteAccepted))return null;
  const actual=normalizedDeclaredStepValue(spec,value);
  return spec.incompleteAccepted.find(entry=>entry&&typeof entry==="object"&&hasText(entry.value)&&typeof entry.missingOnlyFinalPassage==="boolean"&&normalizedDeclaredStepValue(spec,entry.value)===actual)||null;
}
function declaredIntermediateRounding(spec,value){
  if(!hasText(value)||!Array.isArray(spec?.intermediateRoundingAccepted))return null;
  const actual=normalizedDeclaredStepValue(spec,value);
  return spec.intermediateRoundingAccepted.find(entry=>hasText(entry)&&normalizedDeclaredStepValue(spec,entry)===actual)||null;
}
function declaredUpstreamErrorEffect(spec,value,stepResults){
  if(!hasText(value)||!Array.isArray(spec?.errorEffects))return null;
  const actual=normalizedDeclaredStepValue(spec,value);
  return spec.errorEffects.find(effect=>{
    if(!effect||typeof effect.from!=="string"||typeof effect.difficultyReduced!=="boolean"||!Array.isArray(effect.reasons)||!effect.reasons.length||!Array.isArray(effect.accepted)||!effect.accepted.length)return false;
    const upstream=stepResults.find(row=>row.stepId===effect.from);
    if(!upstream||!effect.reasons.includes(upstream.reason))return false;
    return effect.accepted.some(candidate=>hasText(candidate)&&normalizedDeclaredStepValue(spec,candidate)===actual);
  })||null;
}
function declaredInstructionViolation(spec,value){
  const issue=declaredExactIssue(spec,value,"instructionViolationAccepted");
  if(!issue||!Array.isArray(issue.dependentStepIds))return null;
  const dependentStepIds=issue.dependentStepIds.filter(id=>typeof id==="string"&&id.length>0);
  return {...issue,dependentStepIds};
}
function declaredImplicitRule(spec){
  const rule=spec?.implicitNonCalculation;
  if(!rule||!Array.isArray(rule.evidence)||!Array.isArray(rule.dependentStepIds))return null;
  const validEvidence=rule.evidence.filter(entry=>entry&&typeof entry.from==="string"&&Array.isArray(entry.accepted)&&entry.accepted.some(hasText));
  if(!validEvidence.length)return null;
  return {...rule,evidence:validEvidence,dependentStepIds:rule.dependentStepIds.filter(id=>typeof id==="string"&&id.length>0)};
}
function implicitEvidenceMatches(question,answer,rule){
  return rule.evidence.some(entry=>{
    const sourceSpec=question.response.steps.find(stepSpec=>stepSpec.id===entry.from);
    const sourceValue=answer?.steps?.[entry.from];
    if(!sourceSpec||!hasText(sourceValue))return false;
    const actual=normalizedDeclaredStepValue(sourceSpec,sourceValue);
    return entry.accepted.some(candidate=>hasText(candidate)&&normalizedDeclaredStepValue(sourceSpec,candidate)===actual);
  });
}

function gradeStep(spec,value){
  let correct=false,reason="incorrect";
  const instructionViolation=declaredInstructionViolation(spec,value);
  if(instructionViolation){
    reason="instruction_violation";
    return {stepId:spec.id,label:spec.label,status:"incorrect",correct:false,points:0,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",dependentStepIds:instructionViolation.dependentStepIds};
  }
  const missingRequiredWork=declaredExactIssue(spec,value,"missingRequiredWorkAccepted");
  if(missingRequiredWork){
    reason="missing_required_work";
    return {stepId:spec.id,label:spec.label,status:"incorrect",correct:false,points:0,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
  }
  const typedPrefix=String(value??"").includes("=")?String(value).split("=")[0]:null;
  const expectedPrefix=String(spec.expected).includes("=")?String(spec.expected).split("=")[0]:null;
  if(["numeric","fraction"].includes(spec.type)&&typedPrefix&&expectedPrefix&&normalizedExpression(typedPrefix)!==normalizedExpression(expectedPrefix))return {stepId:spec.id,label:spec.label,status:"incorrect",correct:false,points:0,maxPoints:spec.points,expected:spec.expected,answer:value,reason:"wrong_quantity"};
  if(spec.type==="numeric"){
    const parsed=parseNumeric(value),tolerance=Math.max(0,Number(spec.tolerance)||0);
    correct=parsed!==null&&Math.abs(parsed-Number(spec.value))<=tolerance+Number.EPSILON;
    if(parsed===null)reason="invalid_numeric_format";
  }
  if(spec.type==="fraction"){
    const parsed=parseFraction(value);
    const target=spec.numerator/spec.denominator;
    correct=!!parsed&&parsed.numerator*spec.denominator===spec.numerator*parsed.denominator;
    if(!parsed){
      const decimal=decimalExactness(value,target);
      if(decimal?.exact){
        reason="wrong_final_form";
        return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
      }
      if(decimal?.looksRounded){
        reason="approximate_instead_of_exact";
        return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
      }
      reason="invalid_fraction_format";
    }
  }
  if(spec.type==="expression"){
    const input=normalizedExpression(value);
    correct=hasText(value)&&[spec.expected,...(spec.accepted||[])].filter(Boolean).some(candidate=>{
      const expected=normalizedExpression(candidate);
      if(expected===input)return true;
      const strip=s=>s.replace(/^f'\(x\)=/,"");
      const a=strip(input),b=strip(expected);
      return a.includes("x")&&b.includes("x")&&equivalentPolynomial(a,b);
    });
    if(!input)reason="empty_expression";
  }
  if(spec.type==="text"){
    const input=normalizedWords(value);
    const candidates=[spec.expected,...(spec.accepted||[])].filter(Boolean);
    const accepted=candidates.map(candidate=>normalizedWords(candidate).replace(/[.!]$/g,""));
    correct=hasText(value)&&accepted.includes(input.replace(/[.!]$/g,""));
    if(!correct&&hasText(value))correct=candidates.some(candidate=>optionalUnitOmissionMatches(input,candidate));
    if(!correct&&hasText(value)&&conceptGroupsMatch(spec,input))correct=true;
    if(!input)reason="empty_justification";
  }
  if(!correct&&hasText(value)){
    const copiedData=declaredExactIssue(spec,value,"copiedDataAccepted");
    if(copiedData&&typeof copiedData.difficultyReduced==="boolean"){
      reason="copied_data_error";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:spec.points,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",difficultyReduced:copiedData.difficultyReduced};
    }
    const conceptual=declaredExactIssue(spec,value,"conceptualErrorAccepted");
    if(conceptual){
      reason="conceptual_error";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
    }
    const excess=declaredExactIssue(spec,value,"excessElementsAccepted");
    if(excess&&typeof excess.affectsPerformance==="boolean"){
      reason="excess_elements";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:spec.points,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",affectsPerformance:excess.affectsPerformance};
    }
    const formal=declaredExactIssue(spec,value,"formalNotationAccepted");
    if(formal&&typeof formal.onlyZeroPointSteps==="boolean"){
      reason="formal_notation_error";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:spec.points,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",onlyZeroPointSteps:formal.onlyZeroPointSteps};
    }
    const incomplete=declaredIncompleteStep(spec,value);
    if(incomplete){
      reason="incomplete_step";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason,missingOnlyFinalPassage:incomplete.missingOnlyFinalPassage}),maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",missingOnlyFinalPassage:incomplete.missingOnlyFinalPassage};
    }
    if(declaredIntermediateRounding(spec,value)){
      reason="intermediate_rounding";
      return {stepId:spec.id,label:spec.label,status:"partial",correct:false,points:spec.points,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",globalPenalty:1};
    }
  }
  return {stepId:spec.id,label:spec.label,status:correct?"correct":"incorrect",correct,points:correct?spec.points:0,maxPoints:spec.points,expected:spec.expected,answer:value??"",reason:correct?null:reason};
}

function stepwiseLines(answer){
  if(typeof answer==="string")return answer.split(/\r?\n/).map(row=>row.trim()).filter(Boolean);
  if(hasText(answer?.working))return answer.working.split(/\r?\n/).map(row=>row.trim()).filter(Boolean);
  return [];
}
function presentsOnlyFinalResult(question,answer){
  if(answer&&typeof answer==="object"&&Object.values(answer.steps||{}).some(hasText))return false;
  const lines=stepwiseLines(answer);
  if(lines.length!==1||question?.response?.type!=="stepwise"||question.response.steps.length<2)return false;
  const line=lines[0];
  const equalityCount=(line.match(/=/g)||[]).length;
  if(/[→⇒]/u.test(line))return false;
  if(equalityCount>1&&!line.includes(";"))return false;
  const finalSpec=question.response.steps.at(-1);
  if(gradeStep(finalSpec,line).correct)return true;
  return gradeStepFromWorking(finalSpec,[line],line,new Set()).correct;
}

function constantValue(source){
  const canonical=canonicalPolynomial(normalizedExpression(source));
  if(!canonical||canonical.includes(","))return null;
  const [n,d]=canonical.split("/").map(Number);
  const value=n/d;return Number.isFinite(value)?value:null;
}

function gradeStepFromWorking(spec,lines,fullAnswer,usedUnlabelled=new Set()){
  const candidates=lines.map((value,index)=>({value,index,labelled:value.includes("=")})).filter(row=>row.labelled||!usedUnlabelled.has(row.index));
  const explicit=[];
  const expectedPrefix=String(spec.expected).includes("=")?String(spec.expected).split("=")[0]:null;
  for(const [index,line] of lines.entries()){
    const parts=line.split("=").map(x=>x.trim());
    const matches=parts.length>1&&[expectedPrefix,...(spec.prefixes||[])].filter(Boolean).some(prefix=>normalizedExpression(parts[0])===normalizedExpression(prefix));
    if(matches){
      candidates.push(...parts.slice(1).map(value=>({value,index,labelled:true})));
      if(["numeric","fraction"].includes(spec.type)){
        const values=parts.slice(1).map(constantValue);
        if(values.every(value=>value!==null)){
          const target=spec.type==="numeric"?spec.value:spec.numerator/spec.denominator;
          const tolerance=Math.max(0,Number(spec.tolerance)||0)+Number.EPSILON;
          explicit.push({line,parts,values,target,tolerance,correct:values.every(value=>Math.abs(value-target)<=tolerance)});
        }
      }
    }
  }
  const base=gradeStep(spec,"");
  if(explicit.length){
    const right=explicit.some(row=>row.correct),wrong=explicit.some(row=>!row.correct);
    if(wrong){
      const row=explicit.length===1?explicit[0]:null;
      const previousPart=row?.parts?.at(-2)||"";
      const finalPart=row?.parts?.at(-1)||"";
      const previousValue=row?.values?.at(-2);
      const finalValue=row?.values?.at(-1);
      if(highConfidenceWrongFinalRounding(spec,row)){
        const reason="wrong_final_rounding";
        return {...base,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",answer:row.line};
      }
      const transcriptionSlip=!!row&&row.values.length>=2&&highConfidenceTranscriptionSlip(previousPart,finalPart,row.target,row.tolerance);
      if(transcriptionSlip){
        const reason="copied_number_or_sign_error";
        return {...base,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",answer:row.line};
      }
      const arithmeticSlip=!!row&&row.values.length>=2&&/[+\-*/^]/.test(previousPart)&&parseNumeric(finalPart)!==null&&Math.abs(previousValue-row.target)<=row.tolerance&&Math.abs(finalValue-row.target)>row.tolerance;
      if(arithmeticSlip){
        const reason="occasional_calculation_error";
        return {...base,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",answer:row.line};
      }
      return {...base,status:right?"needs_review":"incorrect",reason:right?"conflicting_results":"calculation_error",classificationConfidence:right?"unknown":"low",answer:explicit.map(row=>row.line).join("\n")};
    }
    return {...base,status:"correct",correct:true,points:spec.points,reason:null,answer:explicit[0].line};
  }
  if(spec.type==="text"&&hasText(fullAnswer))candidates.push({value:fullAnswer,index:null,labelled:true});
  for(const candidate of candidates){
    const result=gradeStep(spec,candidate.value);
    if(result.correct||result.status==="partial")return {...result,matchedUnlabelledIndex:candidate.labelled?null:candidate.index};
  }
  const recognizable=lines.some(line=>canonicalPolynomial(normalizedExpression(line))!==null||/[=→∫√]/.test(line)||/[a-zÀ-ÿ]{3,}/i.test(line));
  return fullAnswer.trim()?{...base,status:"needs_review",reason:recognizable?"not_verified":"no_recognizable_work",answer:""}:base;
}

export function stepFeedback(row){
  if(row.reason==="final_result_only")return "Nos itens de construção por etapas, o resultado final isolado não é pontuado: apresenta os cálculos e justificações necessários.";
  if(row.reason==="instruction_violation")return "Foi usado um processo que o enunciado excluía explicitamente. Esta etapa e apenas as etapas declaradas como dependentes recebem zero, de acordo com os critérios IAVE.";
  if(row.reason==="missing_required_work")return "Faltam os cálculos ou a justificação que o critério exige nesta etapa; por isso, esta etapa recebe zero pontos.";
  if(row.reason==="implicit_non_calculation_step")return row.implicitTraversal?"A etapa não foi escrita isoladamente, mas a resolução posterior prova inequivocamente que foi percorrida; foi atribuída a cotação prevista.":"A etapa não foi apresentada e a resolução não prova inequivocamente que foi percorrida; esta etapa e as dependentes declaradas recebem zero.";
  if(row.reason==="dependent_zero_due_to_iave")return "Esta etapa depende de uma etapa anterior que, pelos critérios IAVE, obriga a cotação zero nas etapas dependentes.";
  if(row.reason==="copied_data_error")return row.difficultyReduced?"Foi identificado um erro de cópia de dados que altera a dificuldade. O corretor mantém essa origem explícita para aplicar corretamente os limites nas etapas dependentes.":"Foi identificado um erro de cópia de dados sem redução de dificuldade. Aplicámos a desvalorização global prevista nos critérios IAVE.";
  if(row.reason==="copied_number_or_sign_error")return "A cadeia mostra o valor correto e uma troca isolada de algarismo ou sinal na sua transcrição. Aplicámos apenas a desvalorização prevista para esta situação.";
  if(row.reason==="occasional_calculation_error")return "O processo identificado está correto, mas há uma falha ocasional no cálculo final desta etapa. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="conceptual_error")return "O item identifica esta resposta como um erro conceptual específico. A etapa ficou limitada à parte inteira de metade da cotação, de acordo com os critérios IAVE.";
  if(row.reason==="incomplete_step")return row.missingOnlyFinalPassage?"A etapa está correta até à última passagem necessária. Foi aplicada apenas a desvalorização prevista para essa omissão final.":"A etapa está incompleta segundo o critério específico do item. Foi aplicado o limite de cotação previsto nos critérios IAVE.";
  if(row.reason==="intermediate_rounding")return "Foi identificado um cálculo intermédio com número de casas decimais diferente do solicitado ou um arredondamento intermédio incorreto. A regra geral IAVE retira um ponto à soma das pontuações da resposta.";
  if(row.reason==="upstream_error_effect")return row.difficultyReduced?"Esta etapa segue corretamente o erro anterior, mas esse erro tornou a etapa mais fácil. Aplicámos o limite de metade da cotação previsto na Nota 2 dos critérios IAVE.":"Esta etapa segue corretamente o erro anterior sem redução de dificuldade e foi classificada pelo critério específico adaptado.";
  if(row.reason==="wrong_final_form")return "O valor é matematicamente equivalente, mas não está apresentado na forma final pedida. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="approximate_instead_of_exact")return "Foi apresentado um valor aproximado quando era exigido um valor exato. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="approximate_used_instead_of_exact")return "Uma aproximação anterior foi usada num cálculo seguinte em vez do valor exato. Aplicámos o limite de cotação previsto nos critérios IAVE.";
  if(row.reason==="wrong_final_rounding")return "A cadeia mostra o valor não arredondado correto, mas o arredondamento final indicado está incorreto. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="excess_elements")return row.affectsPerformance?"Foram identificados elementos em excesso que afetam o desempenho pedido. Aplicámos a desvalorização global prevista nos critérios IAVE.":"Foram identificados elementos em excesso, mas sem efeito no desempenho pedido; não houve desvalorização automática.";
  if(row.reason==="formal_notation_error")return row.onlyZeroPointSteps?"Foi identificada uma incorreção de simbologia apenas em etapas sem pontuação; não houve desvalorização global.":"Foi identificada uma incorreção de simbologia formal numa etapa pontuada. Aplicámos a desvalorização global prevista nos critérios IAVE.";
  if(row.reason==="calculation_error")return "O cálculo identificado não dá o valor esperado. Como não é seguro concluir automaticamente que se trata apenas de uma falha ocasional, esta classificação não é inferida sem evidência suficiente.";
  if(row.reason==="conflicting_results")return "Encontrámos resultados incompatíveis para a mesma grandeza. Não atribuímos estes pontos automaticamente.";
  if(row.reason==="no_recognizable_work")return "Não identificámos cálculos ou uma explicação que permitam avaliar esta etapa.";
  if(row.status==="needs_review")return "Não conseguimos confirmar esta etapa. Pode estar incompleta ou escrita de uma forma que o corretor ainda não reconhece.";
  return `Identificado na tua resolução: ${row.answer||"Não identificado"}`;
}

export function expectedResponseLabel(question){
  const response=question?.response;
  if(response?.type==="completion")return response.blanks.map(b=>`${b.label} ${b.options[b.correct]}`).join(" · ");
  if(!response)return question?.o?.[question?.a]??"—";
  if(response.type==="numeric")return String(response.value).replace(".",",");
  if(response.type==="fraction")return `${response.numerator}/${response.denominator}`;
  if(response.type==="stepwise")return response.steps.map(row=>`${row.label}: ${row.expected}`).join(" · ");
  return "—";
}

export function studentResponseLabel(question,answer){
  if(!isResponseAnswered(question,answer))return "Sem resposta";
  if(responseType(question)==="completion")return question.response.blanks.map(b=>`${b.label} ${b.options[answer?.[b.id]]??"Sem resposta"}`).join(" · ");
  if(responseType(question)==="choice")return `${String.fromCharCode(65+answer)} — ${question.o[answer]}`;
  if(responseType(question)==="stepwise"){
    if(typeof answer==="string")return answer.trim();
    const filled=question.response.steps.filter(row=>hasText(answer?.steps?.[row.id])).length;
    return hasText(answer?.working)?answer.working.trim():`${filled}/${question.response.steps.length} etapas preenchidas`;
  }
  return String(answer).trim();
}

export function gradeResponse(question,answer){
  const type=responseType(question),maxPoints=Number(question?.points)||(type==="choice"?5:35);
  if(!isResponseAnswered(question,answer))return {status:"unanswered",correct:false,points:0,maxPoints,stepResults:[]};
  if(type==="completion"){
    const blanks=question.response.blanks;
    const blankResults=blanks.map(b=>({id:b.id,label:b.label,correct:answer?.[b.id]===b.correct,answer:b.options[answer?.[b.id]]??"Sem resposta",expected:b.options[b.correct]}));
    const correctCount=blankResults.filter(b=>b.correct).length;
    const points=maxPoints*correctCount/blanks.length,correct=correctCount===blanks.length;
    return {status:correct?"correct":points>0?"partial":"incorrect",correct,points,maxPoints,stepResults:[],blankResults};
  }
  if(type==="stepwise"){
    if(presentsOnlyFinalResult(question,answer))return {status:"incorrect",correct:false,points:0,maxPoints,stepResults:[],pendingPoints:0,reviewRequired:false,reason:"final_result_only",iaveSituation:iaveSituationLabel("final_result_only"),classificationConfidence:"high"};
    const lines=stepwiseLines(answer);
    const fullAnswer=typeof answer==="string"?answer:answer?.working||"";
    const usedUnlabelled=new Set();
    const rawStepResults=question.response.steps.map(spec=>{
      if(hasText(answer?.steps?.[spec.id])){
        const result=gradeStep(spec,answer.steps[spec.id]);
        return !result.correct&&result.status!=="partial"&&spec.type==="text"?{...result,status:"needs_review",reason:"not_verified"}:result;
      }
      const result=gradeStepFromWorking(spec,lines,fullAnswer,usedUnlabelled);
      if((result.correct||result.status==="partial")&&Number.isInteger(result.matchedUnlabelledIndex))usedUnlabelled.add(result.matchedUnlabelledIndex);
      return result;
    });
    const implicitAdjustedResults=rawStepResults.map((result,index)=>{
      const spec=question.response.steps[index];
      const rule=declaredImplicitRule(spec);
      if(!rule||hasText(answer?.steps?.[spec.id]))return result;
      const implicitTraversal=implicitEvidenceMatches(question,answer,rule);
      const reason="implicit_non_calculation_step";
      return {...result,status:implicitTraversal?"correct":"incorrect",correct:implicitTraversal,points:implicitTraversal?spec.points:0,reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high",implicitTraversal,dependentStepIds:rule.dependentStepIds};
    });
    const approximationAdjustedResults=implicitAdjustedResults.map((result,index)=>{
      const spec=question.response.steps[index];
      if(result.correct||!spec?.approximationDependsOn||!matchesPropagatedApproximation(spec,answer?.steps?.[spec.id]))return result;
      const upstreamIds=Array.isArray(spec.approximationDependsOn)?spec.approximationDependsOn:[spec.approximationDependsOn];
      const upstreamApproximation=implicitAdjustedResults.some(row=>upstreamIds.includes(row.stepId)&&row.reason==="approximate_instead_of_exact");
      if(!upstreamApproximation)return result;
      const reason="approximate_used_instead_of_exact";
      return {...result,status:"partial",correct:false,points:scoreIaveStep({maxPoints:spec.points,basePoints:spec.points,reason}),reason,iaveSituation:iaveSituationLabel(reason),classificationConfidence:"high"};
    });
    const dependencySources=approximationAdjustedResults.filter(row=>(row.reason==="instruction_violation"||(row.reason==="implicit_non_calculation_step"&&!row.implicitTraversal))&&Array.isArray(row.dependentStepIds));
    const zeroedByDependency=approximationAdjustedResults.map(result=>{
      const source=dependencySources.find(row=>row.dependentStepIds.includes(result.stepId));
      if(!source||result.stepId===source.stepId)return result;
      return {...result,status:"incorrect",correct:false,points:0,reason:"dependent_zero_due_to_iave",classificationConfidence:"high",sourceStepId:source.stepId,iaveRule:source.iaveSituation};
    });
    const stepResults=zeroedByDependency.map((result,index)=>{
      const spec=question.response.steps[index];
      const directValue=answer?.steps?.[spec.id];
      if(result.correct||result.status==="partial"||!hasText(directValue))return result;
      const effect=declaredUpstreamErrorEffect(spec,directValue,zeroedByDependency);
      if(!effect)return result;
      const points=effect.difficultyReduced?dependentStepCap(spec.points,{upstreamDifficultyReduced:true}):spec.points;
      return {...result,status:points===spec.points?"correct":"partial",correct:points===spec.points,points,reason:"upstream_error_effect",classificationConfidence:"high",iaveRule:"Nota 2",sourceStepId:effect.from,difficultyReduced:effect.difficultyReduced};
    });
    const stepPoints=stepResults.reduce((sum,row)=>sum+row.points,0);
    const globalReasons=[];
    if(stepResults.some(row=>row.reason==="intermediate_rounding"))globalReasons.push({reason:"intermediate_rounding"});
    for(const row of stepResults){
      if(row.reason==="copied_data_error")globalReasons.push({reason:row.reason,difficultyReduced:row.difficultyReduced});
      if(row.reason==="excess_elements")globalReasons.push({reason:row.reason,affectsPerformance:row.affectsPerformance});
      if(row.reason==="formal_notation_error")globalReasons.push({reason:row.reason,onlyZeroPointSteps:row.onlyZeroPointSteps});
    }
    const points=applyIaveGlobalPenalties(stepPoints,globalReasons),globalPenalty=stepPoints-points,correct=points===maxPoints;
    const pendingPoints=stepResults.filter(row=>row.status==="needs_review").reduce((sum,row)=>sum+row.maxPoints,0);
    const globalPenalties=globalReasons.map(item=>({reason:item.reason,iaveSituation:iaveSituationLabel(item.reason),points:iaveGlobalPenalty(item.reason,item),classificationConfidence:"high"})).filter(item=>item.points>0);
    return {status:pendingPoints?"needs_review":correct?"correct":points>0?"partial":"incorrect",correct,points,maxPoints,stepResults,pendingPoints,reviewRequired:pendingPoints>0,globalPenalty,globalPenalties,reason:pendingPoints?"not_verified":correct?null:points>0?"partial_credit":"incorrect"};
  }
  let correct=false,reason="incorrect";
  if(type==="choice")correct=answer===question.a;
  if(type==="numeric"){
    const parsed=parseNumeric(answer),tolerance=Math.max(0,Number(question.response.tolerance)||0);
    correct=parsed!==null&&Math.abs(parsed-Number(question.response.value))<=tolerance+Number.EPSILON;
    if(parsed===null)reason="invalid_numeric_format";
  }
  if(type==="fraction"){
    const parsed=parseFraction(answer);
    correct=!!parsed&&parsed.numerator*question.response.denominator===question.response.numerator*parsed.denominator;
    if(!parsed)reason="invalid_fraction_format";
  }
  return {status:correct?"correct":"incorrect",correct,points:correct?maxPoints:0,maxPoints,stepResults:[],reason:correct?null:reason};
}

export function miniExamPointSummary(questions=[],answers=[]){
  const results=questions.map((question,index)=>({questionId:question.id,answer:answers[index],...gradeResponse(question,answers[index])}));
  const earnedPoints=results.reduce((sum,row)=>sum+row.points,0),maxPoints=results.reduce((sum,row)=>sum+row.maxPoints,0);
  const score20=maxPoints?Math.round((earnedPoints/maxPoints)*200)/10:0;
  const pendingPoints=results.reduce((sum,row)=>sum+(row.pendingPoints||0),0);
  return {results,earnedPoints,maxPoints,score20,pendingPoints,reviewRequired:pendingPoints>0,score20Upper:maxPoints?Math.round((earnedPoints+pendingPoints)/maxPoints*200)/10:0,correctCount:results.filter(row=>row.correct).length};
}

export function examScoreLabel(result){
  const lower=String(result.score20).replace(".",",");
  return result.reviewRequired?"Avaliação incompleta":`${lower}/20`;
}
