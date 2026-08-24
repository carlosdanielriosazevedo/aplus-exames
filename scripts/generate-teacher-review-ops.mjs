
import fs from "node:fs";
import path from "node:path";
import {
  buildTeacherReviewBatches,serializeSemicolonCsv,teacherReviewInstructions
} from "../app/lib/teacherReview.js";

const out="docs/professor-review-v5.4";
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});

const ops=buildTeacherReviewBatches({},[],{batchSize:8,reviewer:""});
for(const batch of ops.batches){
  const n=String(batch.index).padStart(2,"0");
  const csv="\ufeff"+serializeSemicolonCsv(batch.rows);
  fs.writeFileSync(path.join(out,`LOTE_${n}_${batch.count}_QUESTOES.csv`),csv);
}

const manifest={
  schema:ops.schema,
  generatedAt:new Date().toISOString(),
  packId:ops.packId,
  approvalsNeeded:ops.approvalsNeeded,
  batchSize:ops.batchSize,
  estimatedMinutes:ops.estimatedMinutes,
  estimatedHours:ops.estimatedHours,
  preflightOk:ops.preflightOk,
  qaBlocked:ops.qaBlocked,
  qaWarnings:ops.qaWarnings.map(x=>({itemId:x.itemId,warningCount:x.warningCount,issues:x.issues})),
  instructions:teacherReviewInstructions(),
  batches:ops.batches.map(x=>({
    id:x.id,index:x.index,count:x.count,estimatedMinutes:x.estimatedMinutes,
    itemIds:x.itemIds,projected:x.projected
  }))
};
fs.writeFileSync(path.join(out,"MANIFEST.json"),JSON.stringify(manifest,null,2)+"\n");

const readme=`# Pack operacional de revisão pedagógica v5.4

Pack: \`${ops.packId}\`

- ${ops.approvalsNeeded} decisões no caminho mínimo atual
- ${ops.batches.length} lotes
- ${ops.batchSize} questões por lote
- ~${ops.estimatedHours} h estimadas no total
- pré-QA bloqueadas: ${ops.qaBlocked.length}
- questões exportáveis com avisos automáticos: ${ops.qaWarnings.length}

## Pré-QA

Antes de entrar neste pack, cada questão passa por verificações mecânicas. Itens com
bloqueios não são exportados. As colunas \`qa_status\` e \`qa_flags\` mostram avisos
que o professor deve conhecer, mas não substituem o checklist pedagógico.

## Como usar

1. Enviar um lote de cada vez ao professor.
2. O professor altera apenas reviewer, decision, note e check_*.
3. APROVAR exige os 8 check_* = SIM.
4. Importar o CSV devolvido na app antes de enviar o lote seguinte.
5. Se houver ALTERAR/BLOQUEAR, voltar a gerar o roteiro: as prioridades podem mudar.
6. Não editar content_fingerprint, pack_id, batch_id, id ou version.

O fingerprint protege contra aprovar por engano uma pergunta que foi alterada depois da exportação.

## Projeção

${ops.batches.map(x=>`- Lote ${String(x.index).padStart(2,"0")}: ${x.count} questões → readiness projetado ${x.projected.readinessScore}%${x.projected.canClosedBeta?" → GO mínimo":""}`).join("\n")}
`;
fs.writeFileSync(path.join(out,"README.md"),readme);

console.log(`✓ pack professor v5.4: ${ops.batches.length} lotes · ${ops.exportableApprovals}/${ops.approvalsNeeded} questões exportáveis · QA blockers ${ops.qaBlocked.length} · ${ops.packId}`);
