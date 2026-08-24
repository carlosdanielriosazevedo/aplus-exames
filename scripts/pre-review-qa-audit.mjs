
import assert from "node:assert/strict";
import {QUESTION_BANK} from "../app/data/content.js";
import {
  itemPreReviewQa,preReviewQaReport,answerPositionDistribution,reviewableAfterQa
} from "../app/lib/preReviewQa.js";
import {
  contentRevisionFingerprint,effectiveEditorialItem
} from "../app/lib/quality.js";
import {
  buildTeacherReviewPack,validateTeacherReviewImport,TEACHER_REVIEW_SCHEMA
} from "../app/lib/teacherReview.js";

function stableTarget(id){
  let h=2166136261;
  const text=String(id||"");
  for(let i=0;i<text.length;i++){
    h^=text.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return (h>>>0)%4;
}

const report=preReviewQaReport();
assert.equal(report.total,145);
assert.equal(report.blocked,0,"O corpus atual não deve enviar bloqueios mecânicos ao professor.");
assert.equal(report.canExportToProfessor,true);
assert.ok(report.clean>=110);
assert.ok(report.withWarnings>0,"Warnings heurísticos devem continuar visíveis ao professor.");

// Resposta correta deixa de ter o forte viés histórico para B.
// Cada questão recebe posição estável por ID; adicionar reload não muda a resposta.
for(const q of QUESTION_BANK){
  assert.equal(q.a,stableTarget(q.id),`${q.id}: posição correta não é determinística.`);
}
const distribution=answerPositionDistribution();
assert.deepEqual(distribution.counts,[33,41,41,30]);
assert.equal(distribution.balanced,true);
assert.ok(distribution.maxMinRatio<1.5);

// O probe de derivadas que era uma cópia exata deixou de ser duplicado.
const probe=QUESTION_BANK.find(q=>q.id==="D11D-P");
const anchor=QUESTION_BANK.find(q=>q.id==="D11D-E");
assert.notEqual(probe.q,anchor.q);
assert.equal(itemPreReviewQa(probe).blockerCount,0);

// Heurística encontra um item sintético mecanicamente inválido.
const base=QUESTION_BANK[0];
const synthetic={
  ...base,
  id:"QA-SYNTHETIC",
  o:["igual","igual","outra","última"],
  a:0
};
const syntheticQa=itemPreReviewQa(synthetic,{corpus:[synthetic]});
assert.equal(syntheticQa.status,"blocked");
assert.ok(syntheticQa.issues.some(x=>x.code==="duplicate_options"));

// Exact duplicate questions are blockers, not merely warnings.
const d1={...base,id:"QA-DUP-1",q:"Quanto vale 2+2?",o:["3","4","5","6"],a:1};
const d2={...base,id:"QA-DUP-2",q:"Quanto vale 2+2?",o:["1","2","4","8"],a:2};
const dupQa=itemPreReviewQa(d1,{corpus:[d1,d2]});
assert.ok(dupQa.issues.some(x=>x.code==="duplicate_question"&&x.severity==="blocker"));

// All current roadmap rows export with explicit QA metadata.
const rows=buildTeacherReviewPack({},[],{roadmapOnly:true,reviewer:"Prof. QA"});
assert.equal(rows.length,64);
assert.ok(rows.every(x=>x.schema===TEACHER_REVIEW_SCHEMA));
assert.ok(rows.every(x=>["clean","warning"].includes(x.qa_status)));
assert.ok(rows.every(x=>Object.prototype.hasOwnProperty.call(x,"qa_flags")));

// Packs com itemIds têm de exportar a versão editorial efetiva, não o texto-base.
const first=rows[0];
const source=QUESTION_BANK.find(q=>q.id===first.id);
const safePatchedQuestion=`${source.q} — clarificação editorial`;
const safeOverrides={
  [source.id]:{
    version:2,
    status:"pending",
    contentPatch:{
      q:safePatchedQuestion,
      o:[...source.o],
      a:source.a,
      sol:source.sol,
      hyp:source.hyp,
      cognitive:source.cognitive,
      difficulty:source.difficulty
    }
  }
};
const safeEffective=effectiveEditorialItem(source,safeOverrides);
const patchedPack=buildTeacherReviewPack(safeOverrides,[],{
  roadmapOnly:false,itemIds:[source.id],reviewer:"Prof. QA"
});
assert.equal(patchedPack.length,1);
assert.equal(patchedPack[0].question,safePatchedQuestion);
assert.equal(patchedPack[0].version,2);
assert.equal(patchedPack[0].content_fingerprint,contentRevisionFingerprint(safeEffective));

// A future editorial patch that creates duplicate options is automatically kept
// out of the professor pack and cannot be approved via imported CSV.
const badOverrides={
  [source.id]:{
    version:2,
    status:"pending",
    contentPatch:{
      q:source.q,
      o:["duplicada","duplicada","x","y"],
      a:0,
      sol:source.sol,
      hyp:source.hyp,
      cognitive:source.cognitive,
      difficulty:source.difficulty
    }
  }
};
const effectiveBad=effectiveEditorialItem(source,badOverrides);
const badQa=itemPreReviewQa(source,{overrides:badOverrides});
assert.ok(badQa.blockerCount>0);

const selection=reviewableAfterQa([source.id],badOverrides);
assert.deepEqual(selection.allowed,[]);
assert.equal(selection.blocked.length,1);

const filteredPack=buildTeacherReviewPack(badOverrides,[],{
  roadmapOnly:false,
  itemIds:[source.id],
  reviewer:"Prof. QA"
});
assert.equal(filteredPack.length,0);

const forged=[{
  ...first,
  version:"2",
  content_fingerprint:contentRevisionFingerprint(effectiveBad),
  decision:"APROVAR",
  reviewer:"Prof. QA",
  check_math:"SIM",check_clarity:"SIM",check_unique:"SIM",check_distractors:"SIM",
  check_solution:"SIM",check_taxonomy:"SIM",check_difficulty:"SIM",check_hypothesis:"SIM"
}];
const validation=validateTeacherReviewImport(forged,badOverrides);
assert.equal(validation.valid.length,0);
assert.equal(validation.invalid.length,1);
assert.match(validation.invalid[0].reason,/pré-QA/i);

console.log(`✓ pre-review QA: ${report.total} itens · ${report.blocked} blockers · ${report.withWarnings} com warnings · respostas A/B/C/D ${distribution.counts.join("/")}`);
