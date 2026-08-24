
import assert from "node:assert/strict";
import {TAXONOMY,QUESTION_BANK} from "../app/data/content.js";
import {generatorTemplates,generateVariants} from "../app/lib/generators.js";
import {
  validateGeneratedMath,reconcileExternalValidation,curatedMathValidation,
  externalValidationSpec
} from "../app/lib/mathValidation.js";

let generatedCount=0;
let templateCount=0;
let focusCount=0;
let first=null;

for(const t of TAXONOMY){
  for(const mc of t.microcompetencies||[]){
    const templates=generatorTemplates(t.id,mc.label);
    if(!templates.length)continue;
    focusCount++;
    templateCount+=templates.length;

    for(let batch=0;batch<10;batch++){
      const variants=generateVariants({
        themeId:t.id,
        focus:mc.label,
        count:10,
        salt:`audit|${t.id}|${mc.id}|${batch}`
      });
      assert.equal(variants.length,10,`Gerador sem 10 variantes válidas: ${t.id} / ${mc.label}`);
      for(const q of variants){
        first ||= q;
        generatedCount++;
        assert.ok(q.mathWitness,`Sem mathWitness: ${q.id}`);
        assert.equal(q.validation?.status,"validated_local",`Validação embebida inválida: ${q.id}`);
        assert.equal(q.validation?.passed,true,`Validação embebida falhou: ${q.id}`);

        const fresh=validateGeneratedMath(q);
        assert.equal(fresh.status,"validated_local",`Revalidação falhou: ${q.id}`);
        assert.equal(fresh.passed,true,`Revalidação não passou: ${q.id}`);
        assert.ok(externalValidationSpec(q)?.expression,`Sem spec externo: ${q.id}`);
      }
    }
  }
}

assert.equal(templateCount,9,"Número inesperado de templates geradores.");
assert.equal(focusCount,9,"Número inesperado de focos com gerador.");
assert.equal(generatedCount,900,"A auditoria deve validar 900 variantes.");

// A opção marcada como correta não pode divergir do witness.
const wrongIndex={...first,a:(first.a+1)%4};
const wrongIndexResult=validateGeneratedMath(wrongIndex);
assert.equal(wrongIndexResult.status,"invalid_local");
assert.equal(wrongIndexResult.passed,false);

// O witness também é autoridade independente do texto/answer index.
const tamperedWitness={
  ...first,
  mathWitness:{...first.mathWitness}
};
if(tamperedWitness.mathWitness.kind==="linear_zero"){
  tamperedWitness.mathWitness.b+=1;
}else{
  // Garantir um conflito mesmo que o primeiro template mude no futuro.
  tamperedWitness.o=[...tamperedWitness.o];
  tamperedWitness.o[tamperedWitness.a]="RESPOSTA IMPOSSÍVEL";
}
const tamperedResult=validateGeneratedMath(tamperedWitness);
assert.equal(tamperedResult.passed,false);

// Um segundo validador pode confirmar sem substituir o local.
const local=validateGeneratedMath(first);
const dual=reconcileExternalValidation(local,{
  provider:"example-external",
  status:"agree",
  checkedAt:Date.now()
});
assert.equal(dual.status,"validated_dual");
assert.equal(dual.passed,true);

// Discordância externa bloqueia.
const conflict=reconcileExternalValidation(local,{
  provider:"example-external",
  status:"disagree",
  checkedAt:Date.now(),
  note:"Resposta externa diferente."
});
assert.equal(conflict.status,"blocked_conflict");
assert.equal(conflict.passed,false);
assert.equal(conflict.reason,"validator_disagreement");

// Sem provider configurado, a validação local continua explícita.
const localOnly=reconcileExternalValidation(local,{status:"not_configured"});
assert.equal(localOnly.status,"validated_local");
assert.equal(localOnly.passed,true);

// Conteúdo curado não recebe falsa certificação matemática.
const curated=curatedMathValidation(QUESTION_BANK[0]);
assert.equal(curated.status,"structural_only");
assert.equal(curated.passed,true);

console.log(`✓ math validation: ${templateCount} templates · ${generatedCount} variantes recalculadas · tampering e conflito externo bloqueados`);
