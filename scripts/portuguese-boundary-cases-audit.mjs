import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {applyPortugueseRubricObservations} from "../app/data/portugueseRubrics.js";
import {buildPortugueseBoundaryCases} from "../app/data/portugueseBoundaryCases.js";
import {gradePortugueseResponse,portugueseWordCount} from "../app/lib/portugueseEngine.js";
import {portugueseObservationGuidance} from "../app/lib/portugueseObservationGuidance.js";

const contentDir=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const contentFiles=readdirSync(contentDir)
  .filter(name=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(name))
  .sort((a,b)=>{
    if(a.includes("pilot"))return -1;
    if(b.includes("pilot"))return 1;
    return Number(a.match(/wave(\d+)/u)?.[1]||0)-Number(b.match(/wave(\d+)/u)?.[1]||0);
  });
const rawItems=contentFiles.flatMap(name=>JSON.parse(readFileSync(new URL(name,contentDir),"utf8")).items);
const PORTUGUESE_ITEMS=applyPortugueseRubricObservations(rawItems);

const openItems=PORTUGUESE_ITEMS.filter(item=>["restricted-response","extended-writing"].includes(item.responseType));
const cases=buildPortugueseBoundaryCases(PORTUGUESE_ITEMS);
assert.equal(contentFiles.length,6,"os casos-limite devem ser verificados sobre piloto + cinco vagas");
assert.equal(PORTUGUESE_ITEMS.length,100,"os casos-limite devem partir do banco atual de 100 itens");
assert.equal(cases.length,openItems.length,"todas as respostas abertas devem ter casos-limite");
assert.ok(cases.length>0);

const substantiveIds=new Set(["conteudo","fundamentacao","argumentacao","posicao","funcao","justificacao","genero-tema"]);
const uniqueFormal=new Set();
let guidedObservations=0;
for(const entry of cases){
  const item=PORTUGUESE_ITEMS.find(row=>row.id===entry.id);
  assert.ok(item,`${entry.id}: item em falta`);

  const contradictory=entry.cases.contradictory;
  assert.ok(contradictory.response.trim().length>0,`${entry.id}: falta resposta contraditória`);
  assert.ok(contradictory.expected.criteria.some(row=>["partial","not-observed"].includes(row.status)),`${entry.id}: o caso contraditório deve falhar pelo menos um critério`);

  const formal=entry.cases.formalContentFailure;
  const count=portugueseWordCount(formal.response);
  assert.ok(count>=item.wordLimit.min&&count<=item.wordLimit.max,`${entry.id}: a resposta formal deve cumprir exatamente o intervalo de palavras`);
  uniqueFormal.add(formal.response);
  const substantiveFailure=formal.expected.criteria.find(row=>substantiveIds.has(row.id)&&row.status==="not-observed");
  assert.ok(substantiveFailure,`${entry.id}: cumprir palavras sem conteúdo deve deixar um critério substantivo por observar`);

  const grade=gradePortugueseResponse(item,formal.response);
  assert.equal(grade.final,false,`${entry.id}: resposta aberta não pode receber decisão final automática`);
  assert.equal(grade.points,null,`${entry.id}: resposta aberta não pode receber pontos automáticos`);
  assert.equal(grade.correct,null,`${entry.id}: resposta aberta não pode receber correto/incorreto automático`);
  assert.equal(grade.wordLimit.within,true,`${entry.id}: o caso formal deve ser reconhecido como dentro do limite`);

  for(const criterion of grade.criteria){
    for(const observation of criterion.observations){
      const guidance=portugueseObservationGuidance(item,criterion,observation);
      assert.ok(guidance.counts.length>=30,`${entry.id}/${criterion.id}/${observation.id}: falta orientação positiva concreta`);
      assert.ok(guidance.notEnough.length>=30,`${entry.id}/${criterion.id}/${observation.id}: falta orientação negativa concreta`);
      assert.notEqual(guidance.counts,guidance.notEnough,`${entry.id}/${criterion.id}/${observation.id}: exemplos positivos e negativos não podem ser iguais`);
      guidedObservations++;
    }
  }
}

assert.equal(cases.length,24,"as vagas 4 e 5 são determinísticas; as 24 respostas abertas calibradas mantêm-se como universo dos casos-limite");
assert.equal(uniqueFormal.size,cases.length,"cada pergunta aberta deve ter um caso formal de conteúdo insuficiente próprio");
assert.ok(guidedObservations>=100,"a orientação deve cobrir todas as observações atómicas do banco aberto");

const syntax=PORTUGUESE_ITEMS.find(item=>item.id==="PT639-FND-042");
const syntaxGrade=gradePortugueseResponse(syntax,"resposta de teste");
const syntaxCriterion=syntaxGrade.criteria.find(criterion=>criterion.id==="funcao");
const syntaxObservation=syntaxCriterion.observations[0];
const syntaxGuidance=portugueseObservationGuidance(syntax,syntaxCriterion,syntaxObservation);
assert.match(syntaxGuidance.counts,/predicativo do sujeito/i);
assert.match(syntaxGuidance.notEnough,/complemento oblíquo/i);

console.log(`✓ casos-limite Português: ${contentFiles.length} pacotes · ${PORTUGUESE_ITEMS.length} itens totais · ${cases.length} respostas abertas · ${guidedObservations} observações guiadas · extensão separada de conteúdo · zero classificação automática`);
