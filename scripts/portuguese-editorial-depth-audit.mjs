import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {gradePortugueseResponse,normalizePortugueseAnswer} from "../app/lib/portugueseEngine.js";

const contentDir=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const packFiles=readdirSync(contentDir)
  .filter(name=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(name))
  .sort((a,b)=>{
    if(a.includes("pilot")) return -1;
    if(b.includes("pilot")) return 1;
    return Number(a.match(/wave(\d+)/u)?.[1]||0)-Number(b.match(/wave(\d+)/u)?.[1]||0);
  });
const packs=packFiles.map(name=>JSON.parse(readFileSync(new URL(name,contentDir),"utf8")));
const items=packs.flatMap(pack=>pack.items);
const deterministic=items.filter(item=>["multiple-choice","short-answer"].includes(item.responseType));
const open=items.filter(item=>["restricted-response","extended-writing"].includes(item.responseType));
const declaredSize=[...packs].reverse().find(pack=>Number.isInteger(pack.bankSizeAfterWave))?.bankSizeAfterWave||items.length;

assert.equal(items.length,declaredSize,"a passagem editorial deve cobrir todo o banco candidato declarado");
assert.ok(deterministic.length/items.length>=0.70,"o banco deve manter pelo menos 70% de itens determinísticos");
assert.ok(open.length/items.length>=0.18,"o banco deve manter pelo menos 18% de respostas abertas");

const weakSignals=[];
const lengthSkew=[];
let checkedShortAnswers=0;
let checkedMultipleChoice=0;
const words=value=>String(value||"").trim().split(/\s+/u).filter(Boolean).length;
const median=values=>{const sorted=[...values].sort((a,b)=>a-b);const m=Math.floor(sorted.length/2);return sorted.length%2?sorted[m]:(sorted[m-1]+sorted[m])/2;};
const suspiciousAbsolute=/\b(?:sempre|nunca|apenas|exclusivamente|qualquer|imediatamente|totalmente)\b/iu;

for(const item of items){
  assert.ok(item.stimulus?.trim().length>=20,`${item.id}: estímulo editorialmente demasiado curto`);
  assert.ok(item.prompt?.trim().length>=15,`${item.id}: enunciado editorialmente demasiado curto`);
  assert.ok(item.explanation?.trim().length>=35||item.rubric,`${item.id}: falta explicação pedagógica ou grelha`);
  if(item.explanation){
    assert.doesNotMatch(item.explanation,/porque (?:é|esta é) a resposta correta/iu,`${item.id}: explicação circular`);
    assert.doesNotMatch(item.explanation,/obviamente|claramente é/iu,`${item.id}: explicação demasiado assertiva sem raciocínio`);
  }
  if(item.responseType==="multiple-choice"){
    checkedMultipleChoice++;
    const result=gradePortugueseResponse(item,item.answerIndex);
    assert.equal(result.final,true,`${item.id}: escolha múltipla deve ter decisão final determinística`);
    assert.equal(result.correct,true,`${item.id}: answerIndex declarado deve ser reconhecido como correto`);
    for(let i=0;i<item.options.length;i++) if(i!==item.answerIndex) assert.equal(gradePortugueseResponse(item,i).correct,false,`${item.id}: distrator ${i} não pode ser aceite`);
    const optionWords=item.options.map(words);const m=median(optionWords);const correctWords=optionWords[item.answerIndex];
    if(item.domain!=="gramatica"&&m>=4&&(correctWords>m*2.4||correctWords<m*0.42)) lengthSkew.push(`${item.id}: correta=${correctWords} palavras; mediana=${m}`);
    const distractorAbsolutes=item.options.map((option,index)=>({option,index})).filter(row=>row.index!==item.answerIndex&&suspiciousAbsolute.test(row.option));
    if(distractorAbsolutes.length>=2) weakSignals.push(`${item.id}: ${distractorAbsolutes.length} distratores usam absolutos potencialmente denunciadores`);
  }
  if(item.responseType==="short-answer"){
    checkedShortAnswers++;
    const normalized=item.acceptedAnswers.map(normalizePortugueseAnswer);
    assert.equal(new Set(normalized).size,normalized.length,`${item.id}: equivalentes repetidos após normalização`);
    for(const accepted of item.acceptedAnswers){const result=gradePortugueseResponse(item,accepted);assert.equal(result.final,true,`${item.id}: resposta curta aceite deve ser final`);assert.equal(result.correct,true,`${item.id}: equivalente declarado deve ser aceite: ${accepted}`);}
    assert.equal(gradePortugueseResponse(item,"resposta editorialmente impossível 9472").correct,false,`${item.id}: resposta sentinela não pode ser aceite`);
  }
  if(["restricted-response","extended-writing"].includes(item.responseType)){
    const result=gradePortugueseResponse(item,"Resposta de teste para confirmar que a revisão editorial não ativa classificação automática.");
    assert.equal(result.final,false,`${item.id}: texto aberto não pode tornar-se final durante revisão editorial`);
    assert.equal(result.points,null,`${item.id}: texto aberto não pode receber pontos automáticos`);
  }
}

assert.equal(checkedMultipleChoice+checkedShortAnswers,deterministic.length,"todos os itens determinísticos devem ser exercitados pelo gate");
assert.ok(lengthSkew.length<=Math.ceil(checkedMultipleChoice*0.12),`demasiadas respostas corretas denunciam-se pelo comprimento: ${lengthSkew.join(" | ")}`);
assert.equal(weakSignals.length,0,`distratores linguisticamente denunciadores: ${weakSignals.join(" | ")}`);
const wave6=packs.find(pack=>pack.wave===6);
assert.ok(wave6,"a sexta vaga editorial de referência deve permanecer no banco");
for(const id of ["PT639-FND-101","PT639-FND-106","PT639-FND-107","PT639-FND-110","PT639-FND-113","PT639-FND-114","PT639-FND-119"]) assert.ok(wave6.items.some(item=>item.id===id),`${id}: item revisto deve permanecer na sexta vaga`);
const concession=wave6.items.find(item=>item.id==="PT639-FND-119");
assert.deepEqual(concession.acceptedAnswers,["concessão","valor concessivo","concessivo"],"PT639-FND-119 deve exigir valor concessivo, não um rótulo genérico de contraste");
console.log(`✓ profundidade editorial Português: ${items.length} itens · ${checkedMultipleChoice} MC · ${checkedShortAnswers} respostas curtas · ${open.length} abertas protegidas`);
console.log(`  sinais linguísticos a rever: ${weakSignals.length}; assimetrias de comprimento: ${lengthSkew.length}`);
