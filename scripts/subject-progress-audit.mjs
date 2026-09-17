import assert from "node:assert/strict";
import {
  advanceSubjectSession,beginSubjectSession,migrateSubjectProgress,
  recordSubjectSession,resetSubjectProgress,subjectProgressFor
} from "../app/lib/subjectProgress.js";

const mathScores={functions:{mastery:.72}};
const legacy={scores:mathScores,diagnosticDone:false,missionHistory:[{id:"math-mission"}]};
let state=migrateSubjectProgress(legacy);
assert.deepEqual(state.scores,mathScores,"A migração não pode alterar resultados de Matemática A.");
assert.equal(state.diagnosticDone,false,"O diagnóstico global legado deve ser preservado.");

const items=[
  {id:"pt-1",domain:"leitura",competencyId:"pt-leitura-informacao"},
  {id:"pt-2",domain:"escrita",competencyId:"pt-escrita-argumentacao"}
];
state=beginSubjectSession(state,{subjectId:"portuguese",kind:"diagnostic",label:"Diagnóstico",items,startedAt:100});
state=advanceSubjectSession(state,"portuguese",{current:1,results:[{status:"final",final:true,correct:true,points:13,maxPoints:13,gradingMode:"deterministic"}],updatedAt:110});
assert.equal(subjectProgressFor(state,"portuguese").lastPosition.current,1,"A posição de retoma deve avançar.");

state=recordSubjectSession(state,{
  subjectId:"portuguese",kind:"diagnostic",label:"Diagnóstico",items,completedAt:120,
  results:[
    {status:"final",final:true,correct:true,points:13,maxPoints:13,gradingMode:"deterministic"},
    {status:"awaiting-rubric",final:false,correct:null,points:null,maxPoints:20,gradingMode:"rubric-assisted-provisional"}
  ]
});
const portuguese=subjectProgressFor(state,"portuguese");
assert.equal(portuguese.diagnosticDone,true,"O diagnóstico de Português deve ficar concluído.");
assert.equal(portuguese.lastPosition,null,"Uma sessão concluída não deve ficar disponível para retoma.");
assert.equal(portuguese.competence["pt-leitura-informacao"].correct,1);
assert.equal(portuguese.competence["pt-escrita-argumentacao"].pendingRubrics,1);
assert.equal(portuguese.competence["pt-escrita-argumentacao"].points,0,"Respostas abertas não podem receber pontos automáticos.");
assert.equal(state.diagnosticDone,false,"Português não pode concluir o diagnóstico de Matemática A.");
assert.deepEqual(state.scores,mathScores,"Português não pode alterar domínio de Matemática A.");
assert.deepEqual(state.missionHistory,[{id:"math-mission"}],"O histórico global legado de Matemática A deve permanecer intacto.");
assert.equal("response" in portuguese.sessions[0].results[1],false,"O histórico não deve guardar texto livre do aluno.");

state={...state,subjectProgress:{...state.subjectProgress,"math-a":{subjectId:"math-a",sessions:[{id:"keep"}]}}};
state=resetSubjectProgress(state,"portuguese");
assert.equal(state.subjectProgress.portuguese,undefined,"A reposição deve apagar apenas Português.");
assert.equal(state.subjectProgress["math-a"].sessions[0].id,"keep","A reposição de Português não pode apagar Matemática A.");
assert.deepEqual(state.scores,mathScores);

console.log("✓ progresso académico isolado por disciplina");
console.log("✓ diagnóstico, competências, retoma e histórico de Português persistem sem texto livre");
console.log("✓ reposição de Português preserva integralmente Matemática A");
