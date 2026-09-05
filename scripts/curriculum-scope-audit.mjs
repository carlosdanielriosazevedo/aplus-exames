import assert from "node:assert/strict";
import fs from "node:fs";
import {DIAGNOSTIC_BLUEPRINT,TAXONOMY} from "../app/data/content.js";
import {
  emptyScores,measuredThemes,prepIndex,selectMissionTheme,calibrationCandidates,
  buildMiniExam,trainingQuestions,diagnosticAnchor,selectQuestionForPlan,applyEvidence,scopedThemeScore
} from "../app/lib/engine.js";
import {
  academicScopeThemes,diagnosticBlueprintForProfile,isThemeInAcademicScope,
  currentYearSubtopicIds,isQuestionInAcademicScope,isSubtopicInAcademicScope
} from "../app/lib/curriculumScope.js";
import {createDiagnosticDraft,validateDiagnosticDraft} from "../app/lib/diagnosticRecovery.js";
import {migrateDailyMission} from "../app/lib/dailyMission.js";

const profile=schoolYear=>{
  const base={schoolYear,recentGrade:"",syllabus:"most",examTiming:"thisYear",optionalTopics:[]};
  return {...base,taughtSubtopicIds:currentYearSubtopicIds(base)};
};
const stateFor=schoolYear=>({
  profile:profile(schoolYear),
  goal:17,
  betaMode:"internal",
  editorialOverrides:{},
  scores:emptyScores(),
  freeTrainingSignals:[],
  missionHistory:[]
});

const years=themes=>new Set(themes.map(t=>t.year));

const s10=stateFor("10.º");
assert.deepEqual([...years(academicScopeThemes(s10.profile))],["10.º"]);
assert.deepEqual(diagnosticBlueprintForProfile(s10.profile),DIAGNOSTIC_BLUEPRINT.filter(id=>id.startsWith("10-")));

// No ano atual, o âmbito é fechado ao nível da submatéria, não apenas do tema.
const partial10=stateFor("10.º");
partial10.profile.taughtSubtopicIds=["mc-10-fun-dominio-e-zeros"];
assert.deepEqual(academicScopeThemes(partial10.profile).map(t=>t.id),["10-fun"]);
assert.equal(isSubtopicInAcademicScope(TAXONOMY.find(t=>t.id==="10-fun"),"mc-10-fun-dominio-e-zeros",partial10.profile),true);
assert.equal(isSubtopicInAcademicScope(TAXONOMY.find(t=>t.id==="10-fun"),"mc-10-fun-monotonia-e-extremos",partial10.profile),false);
const currentQuestions=buildMiniExam(partial10,8);
assert.ok(currentQuestions.every(q=>isQuestionInAcademicScope(q,partial10.profile,"exam")));
const selectedQuestion=trainingQuestions(partial10,{themeId:"10-fun",focus:"mc-10-fun-dominio-e-zeros",level:"auto"},1)[0];
const hiddenQuestion=trainingQuestions(partial10,{themeId:"10-fun",focus:"mc-10-fun-monotonia-e-extremos",level:"auto"},1)[0];
partial10.scores["10-fun"]=applyEvidence(partial10.scores["10-fun"],selectedQuestion,true,"exam");
partial10.scores["10-fun"]=applyEvidence(partial10.scores["10-fun"],hiddenQuestion,false,"training");
assert.equal(scopedThemeScore(partial10,"10-fun").evidence.length,1);

const s11=stateFor("11.º");
assert.deepEqual([...years(academicScopeThemes(s11.profile))],["10.º","11.º"]);
assert.ok(diagnosticBlueprintForProfile(s11.profile).every(id=>!id.startsWith("12-")));

const s12=stateFor("12.º");
assert.deepEqual([...years(academicScopeThemes(s12.profile))],["10.º","11.º","12.º"]);
assert.deepEqual(diagnosticBlueprintForProfile(s12.profile),DIAGNOSTIC_BLUEPRINT);
assert.equal(academicScopeThemes(s12.profile).some(t=>t.optionalTrack),false);
const s12WithOptional=stateFor("12.º");
s12WithOptional.profile.optionalTopics=["matrizes"];
s12WithOptional.profile.taughtSubtopicIds=currentYearSubtopicIds(s12WithOptional.profile);
assert.equal(isThemeInAcademicScope(TAXONOMY.find(t=>t.id==="12-mat"),s12WithOptional.profile),true);
assert.equal(isThemeInAcademicScope(TAXONOMY.find(t=>t.id==="12-ie"),s12WithOptional.profile),false);
assert.equal(isThemeInAcademicScope(TAXONOMY.find(t=>t.id==="12-int"),s12WithOptional.profile),false);

const finished=stateFor("Já terminei o secundário");
assert.equal(academicScopeThemes(finished.profile).length,TAXONOMY.length);
assert.deepEqual(diagnosticBlueprintForProfile(finished.profile),DIAGNOSTIC_BLUEPRINT);

// Evidência futura pode existir num estado antigo ou vinda de Treino Livre,
// mas não entra no índice/preparação nem nas prioridades de um aluno do 10.º.
const scope10Question=diagnosticAnchor("10-fun",2,s10);
s10.scores["10-fun"]=applyEvidence(s10.scores["10-fun"],scope10Question,true,"diagnostic");
const scope12Question=trainingQuestions(s10,{themeId:"12-prob",focus:null,level:"auto"},1)[0];
s10.scores["12-prob"]=applyEvidence(s10.scores["12-prob"],scope12Question,false,"training");
assert.deepEqual(measuredThemes(s10).map(t=>t.id),["10-fun"]);
assert.notEqual(prepIndex(s10),null);
assert.equal(selectMissionTheme(s10)?.year,"10.º");
assert.ok(calibrationCandidates(s10).every(t=>t.year==="10.º"));

// O Mini-exame nunca sobe para matéria futura.
for(const [state,maxYear] of [[s10,10],[s11,11],[s12,12]]){
  const exam=buildMiniExam(state,8);
  assert.equal(exam.length,8);
  for(const q of exam){
    const t=TAXONOMY.find(x=>x.id===q.themeId);
    const n=Number.parseInt(t.year,10);
    assert.ok(n<=maxYear,state.profile.schoolYear+" recebeu "+t.year+": "+q.id);
    assert.equal(isThemeInAcademicScope(t,state.profile),true);
  }
}

// Treino Livre continua deliberadamente aberto: escolher matéria futura não
// transforma essa matéria numa fraqueza nem numa Missão automática.
const futureTraining=trainingQuestions(s10,{themeId:"12-prob",focus:null,level:"auto"},2);
assert.ok(futureTraining.length>0);
assert.ok(futureTraining.every(q=>q.themeId==="12-prob"));
assert.equal(selectMissionTheme(s10)?.year,"10.º");

// O blueprint fica congelado no WAL do diagnóstico para recovery determinístico.
const blueprint10=diagnosticBlueprintForProfile(s10.profile);
const first=diagnosticAnchor(blueprint10[0],2,s10);
assert.ok(first);
const session={id:"scope-diagnostic",kind:"diagnostic",startedAt:Date.now()-1000,finishedAt:null,meta:{}};
const draft=createDiagnosticDraft({session,item:first,difficulty:2,blueprint:blueprint10,now:Date.now()-1000});
assert.equal(draft.version,3);
assert.deepEqual(draft.blueprint,blueprint10);
assert.equal(validateDiagnosticDraft(draft).ok,true);

// Uma atribuição diária antiga fora do scope é descartada na migração e um
// plano legado fora do scope não consegue selecionar nova pergunta.
const invalidPlan={type:"priority",themeId:"12-prob",focus:null};
const legacy10={...s10,dailyMission:{version:1,assignment:{day:"2026-09-04",assignedAt:1,plan:invalidPlan},prompt:{}}};
assert.equal(migrateDailyMission(legacy10).dailyMission.assignment,null);
assert.equal(selectQuestionForPlan(s10,invalidPlan),null);
const hiddenFocusPlan={type:"priority",themeId:"10-fun",focus:"mc-10-fun-monotonia-e-extremos"};
const hiddenAssignment={...partial10,dailyMission:{version:1,assignment:{day:"2026-09-04",assignedAt:1,plan:hiddenFocusPlan},prompt:{}}};
assert.equal(migrateDailyMission(hiddenAssignment).dailyMission.assignment,null);
assert.equal(selectQuestionForPlan(partial10,hiddenFocusPlan),null);

// Drafts v2 anteriores ao scope continuam válidos usando o blueprint histórico.
const legacyDraft={...draft,version:2};
delete legacyDraft.blueprint;
assert.equal(validateDiagnosticDraft(legacyDraft).ok,true);

const pageSource=fs.readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
assert.match(pageSource,/const scopedThemes=academicScopeThemes\(s\.profile\)/);
assert.match(pageSource,/const preferredYear=\["10\.º","11\.º","12\.º"\]\.includes\(s\.profile\?\.schoolYear\)/);
assert.doesNotMatch(pageSource,/8 questões · ~10–15 min · 10\.º, 11\.º e 12\.º/);
assert.match(pageSource,/Que tema opcional está a tua turma a estudar\?/);
assert.match(pageSource,/Matéria dada na escola/);
assert.doesNotMatch(pageSource,/Quanto do programa já deste\?/);

console.log("✓ curriculum year scope audit: diagnostic, missions, progress and mini-exam stay inside academic scope; Free Training remains open");
