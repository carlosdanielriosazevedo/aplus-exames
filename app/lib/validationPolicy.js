
import {MACHINE_VALIDATION_ATTESTATIONS} from "../data/validationEvidence.js";
import {machineOracleCheck} from "./machineMathOracle.js";
import {contentRevisionFingerprint,validationHash} from "./validationFingerprint.js";

export const HYBRID_POLICY_VERSION=1;
export const HUMAN_COGNITIVE_TYPES=new Set([
  "Compreensão","Interpretação","Raciocínio","Modelação",
  "Resolução de problemas","Validação"
]);

export function machineValidationPassport(item){
  const att=MACHINE_VALIDATION_ATTESTATIONS[item?.id]||null;
  const fingerprint=contentRevisionFingerprint(item);
  const oracle=machineOracleCheck(item);
  const attestationMatch=!!att && att.fingerprint===fingerprint;
  const localPassed=attestationMatch && oracle.passed && att?.localOracle==="passed";

  return {
    itemId:item?.id||null,
    policyVersion:HYBRID_POLICY_VERSION,
    fingerprint,
    attestation:att,
    attestationMatch,
    localOracle:oracle,
    preReviewAttestedClean:att?.preReviewStatus==="clean"&&attestationMatch,
    externalSecondValidator:att?.externalSecondValidator||"not_configured",
    closedBetaEligible:!!localPassed && att?.preReviewStatus==="clean",
    productionEligible:false,
    status:!att
      ?"not_attested"
      :!attestationMatch
        ?"stale_attestation"
        :!oracle.passed
          ?"oracle_failed"
          :"validated_for_closed_beta"
  };
}

export function machineClosedBetaEligible(item){
  return machineValidationPassport(item).closedBetaEligible;
}

export function requiresHumanPedagogy(item,{qaStatus="clean"}={}){
  if(!item)return true;
  if(item.contexts?.includes("diagnostic"))return true;
  if(item.role==="anchor"||item.role==="probe")return true;
  if(qaStatus==="warning"||qaStatus==="blocked")return true;
  if(HUMAN_COGNITIVE_TYPES.has(item.cognitive))return true;
  return !machineClosedBetaEligible(item);
}

function stableSampleScore(item){
  const seed=`hybrid-sample|${item?.id||""}|${item?.themeId||""}|${item?.cognitive||""}`;
  return parseInt(validationHash(seed),16)>>>0;
}

export function deterministicTeacherSample(items,{rate=0.20,min=1}={}){
  const pool=[...(items||[])];
  if(!pool.length)return [];
  const target=Math.max(min,Math.ceil(pool.length*rate));

  // Garantir representação dos 3 anos quando possível.
  const byYear=new Map();
  for(const item of pool){
    const year=String(item.themeId||"").slice(0,2);
    if(!byYear.has(year))byYear.set(year,[]);
    byYear.get(year).push(item);
  }

  const chosen=[];
  for(const [,rows] of [...byYear.entries()].sort()){
    const pick=[...rows].sort((a,b)=>stableSampleScore(a)-stableSampleScore(b))[0];
    if(pick&&!chosen.some(x=>x.id===pick.id))chosen.push(pick);
  }

  for(const item of [...pool].sort((a,b)=>stableSampleScore(a)-stableSampleScore(b))){
    if(chosen.length>=target)break;
    if(!chosen.some(x=>x.id===item.id))chosen.push(item);
  }
  return chosen.slice(0,target);
}
