
import fs from "node:fs";
import path from "node:path";
import {buildHybridTeacherBatches} from "../app/lib/hybridTeacherReview.js";
import {serializeSemicolonCsv,teacherReviewInstructions} from "../app/lib/teacherReview.js";
import {hybridValidationPlan,hybridValidationSummary} from "../app/lib/hybridValidation.js";
import {machineValidationPassport} from "../app/lib/validationPolicy.js";

const out="docs/professor-review-v5.5-hybrid";
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});

const ops=buildHybridTeacherBatches({},[],{batchSize:8,reviewer:""});
const plan=hybridValidationPlan({},[]);
const summary=hybridValidationSummary({},[]);

for(const batch of ops.batches){
  const n=String(batch.index).padStart(2,"0");
  fs.writeFileSync(
    path.join(out,`LOTE_HIBRIDO_${n}_${batch.count}_QUESTOES.csv`),
    "\ufeff"+serializeSemicolonCsv(batch.rows)
  );
}

const machine=plan.machineLane.map(item=>{
  const p=machineValidationPassport(item);
  return {
    id:item.id,
    fingerprint:p.fingerprint,
    localOracle:p.localOracle.status,
    preReviewAttestedClean:p.preReviewAttestedClean,
    externalSecondValidator:p.externalSecondValidator,
    closedBetaEligible:p.closedBetaEligible,
    productionEligible:p.productionEligible,
    sampledByTeacher:plan.teacherSample.some(x=>x.id===item.id)
  };
});

const manifest={
  schema:ops.schema,
  generatedAt:new Date().toISOString(),
  packId:ops.packId,
  policy:"conservative_hybrid_beta_v1",
  conservativeApprovals:ops.conservativeApprovals,
  hybridTarget:ops.hybridTarget,
  savedReviews:ops.savedReviews,
  savedPct:ops.savedPct,
  mandatoryHuman:ops.mandatoryHuman,
  teacherSample:ops.teacherSample,
  machineLane:ops.machineLane,
  sampleRate:ops.sampleRate,
  estimatedHours:ops.estimatedHours,
  instructions:teacherReviewInstructions(),
  batches:ops.batches.map(x=>({
    id:x.id,index:x.index,count:x.count,
    mandatoryCount:x.mandatoryCount,sampleCount:x.sampleCount,
    estimatedMinutes:x.estimatedMinutes,itemIds:x.itemIds
  })),
  machine
};
fs.writeFileSync(path.join(out,"MANIFEST.json"),JSON.stringify(manifest,null,2)+"\n");

const readme=`# Revisão pedagógica híbrida v5.5

## Recomendação atual

- modelo conservador antigo: ${summary.conservativeTeacherApprovals} revisões humanas
- modelo híbrido: ${summary.hybridTeacherTarget} revisões humanas
- redução: ${summary.savedHumanReviews} revisões (${summary.savedPct}%)
- revisão humana obrigatória: ${summary.mandatoryHuman}
- amostra humana do lane de máquina: ${summary.teacherSample}
- lane de máquina: ${summary.machineCount}

## Filosofia

Não tratamos “IA disse que está certo” como certificação pedagógica.

O lane de máquina só contém questões:
- objetivas;
- fora do Diagnóstico;
- sem warnings de pré-QA;
- com fingerprint congelado;
- com oracle determinístico reproduzível.

20% desse lane continua a ser revisto por professor para apanhar problemas de
linguagem, dificuldade ou pedagogia que a validação matemática não vê.

Diagnóstico, interpretação, raciocínio, modelação, compreensão e itens com warnings
continuam no lane humano.

## Produção

Machine-only é permitido apenas no gate da beta fechada desta política.

Produção comercial continua a exigir uma política posterior, idealmente com:
- segundo validador independente;
- dados empíricos de alunos;
- monitorização de reports;
- amostragem pedagógica contínua.

O segundo validador externo está preparado por contrato técnico, mas **não está
configurado nem ativo** nesta release.

## Fluxo

1. Enviar um lote híbrido de cada vez.
2. Importar decisões.
3. Corrigir ALTERAR/BLOQUEAR.
4. Recalcular plano.
5. Continuar até o gate híbrido ficar GO.
`;
fs.writeFileSync(path.join(out,"README.md"),readme);

console.log(`✓ hybrid teacher pack: ${ops.hybridTarget} human reviews · ${ops.batches.length} batches · ${ops.savedPct}% reduction · ${ops.packId}`);
