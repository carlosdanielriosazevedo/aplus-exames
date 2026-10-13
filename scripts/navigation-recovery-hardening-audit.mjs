import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const chrome=readFileSync(new URL("../app/components/chrome.js",import.meta.url),"utf8");
const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const setup=readFileSync(new URL("../app/components/SetupScreens.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const ptExam=readFileSync(new URL("../app/components/PortuguesePassageMiniExam.js",import.meta.url),"utf8");
const cloud=readFileSync(new URL("../app/lib/cloudReliability.js",import.meta.url),"utf8");
const cloudMerge=readFileSync(new URL("../app/lib/cloudStateMerge.js",import.meta.url),"utf8");

assert.match(chrome,/function safePrevious[\s\S]*window\.history\.back\(\)/u,"Voltar sem destino explícito deve respeitar o histórico real da app.");
assert.match(chrome,/export const Back=\(\{go,to\}\)/u,"Back deve distinguir destino explícito de retrocesso real.");
assert.match(chrome,/function StudySessionHeader[\s\S]*approvaSessionGuard/u,"Sessões focadas devem instalar um guard de navegação.");
assert.match(chrome,/window\.addEventListener\("popstate",onPop\)/u,"O retroceder físico/browser deve passar pela política segura da sessão.");
assert.match(chrome,/window\.confirm\(message\)/u,"Sair acidentalmente de uma sessão deve pedir confirmação.");
assert.match(chrome,/runExitReplacingSessionEntry/u,"Uma sessão encerrada não deve ficar como entrada morta imediatamente recuperável no histórico.");
assert.match(chrome,/Não foi possível \(\?:recuperar esta sessão\|ler o progresso guardado\)/u,"Os estados fatais conhecidos devem ser identificados pelo Shell.");
assert.match(chrome,/Tentar novamente/u,"Um estado fatal deve permitir tentar novamente.");
assert.match(chrome,/Ir para o início/u,"Um estado fatal deve ter uma saída segura.");
assert.match(chrome,/autoBack/u,"Ecrãs intermédios sem botão próprio devem receber retrocesso visível.");
assert.match(chrome,/ROOT_SCREENS/u,"As raízes da navegação não devem ganhar um botão Voltar artificial.");
assert.match(chrome,/FOCUS_SCREENS/u,"Sessões focadas não devem receber um segundo botão Voltar além do cabeçalho seguro.");

assert.match(page,/screen==="diagRecoveryError"[\s\S]*Não foi possível recuperar esta sessão/u,"O recovery do diagnóstico deve continuar coberto pela saída segura global.");
assert.match(page,/screen==="storageRecoveryError"[\s\S]*Não foi possível ler o progresso guardado/u,"Falhas de leitura local devem continuar cobertas pela saída segura global.");
assert.match(page,/window\.history\.pushState/u,"A navegação interna deve continuar a criar histórico do browser.");
assert.match(page,/window\.addEventListener\("popstate"/u,"A app deve continuar a responder ao retroceder do browser/sistema.");

assert.match(setup,/export function StudentProfile/u,"O onboarding de perfil deve continuar numa Shell elegível para retrocesso automático.");
assert.match(setup,/export function TaughtCurriculum/u,"A seleção de matéria deve continuar numa Shell elegível para retrocesso automático.");
assert.match(setup,/export function GoalScreen/u,"O objetivo deve continuar numa Shell elegível para retrocesso automático.");
assert.match(fqa,/StudySessionHeader/u,"Sessões normais de FQ A devem usar o cabeçalho de saída segura comum.");
assert.match(fqa,/useEffect\(\(\)=>\{\s*if\(!session\|\|session\.finished\)return;[\s\S]*active\.sessionId!==session\.sessionId[\s\S]*currentAnswer:answer/u,"FQ A deve persistir a resposta corrente antes de o aluno carregar em Responder, sem contaminar outra sessão.");
assert.match(fqa,/StudySessionHeader[\s\S]*exitLabel="Guardar e sair"/u,"Depois do autosave, a sessão normal de FQ A deve assumir explicitamente Guardar e sair.");
assert.match(ptExam,/onDraftChange/u,"Mini-exames de Português devem continuar a persistir rascunho durante a sessão.");

assert.match(cloud,/export \{safeCloudMerge\} from "\.\/cloudStateMerge\.js"/u,"O merge pesado deve ficar isolado num módulo separado do bootstrap inicial.");
assert.doesNotMatch(cloud,/function mergeSubjectProgressMaps\(/u,"O módulo carregado no arranque não deve conter o merge pesado por disciplina.");
assert.match(cloudMerge,/function mergeSubjectProgressMaps\(/u,"O merge de progresso por disciplina deve permanecer implementado.");
assert.match(cloudMerge,/subjectProgress:mergeSubjectProgressMaps\(local\?\.subjectProgress,remote\?\.subjectProgress\)/u,"O merge cloud não pode deixar o mapa local de progresso por disciplina apagar o progresso remoto.");
assert.match(cloudMerge,/newest=localAt>=remoteAt\?l:r/u,"A sessão/pausa deve ser decidida pelo estado de atividade mais recente.");
assert.match(cloudMerge,/let lastPosition=newest\?\.lastPosition\|\|null/u,"A retoma deve nascer do dispositivo com atividade mais recente, não de uma pausa antiga do outro dispositivo.");
assert.match(cloudMerge,/sessions\.some\(row=>row\?\.completedAt&&row\.sessionId===lastPosition\.sessionId\)\)lastPosition=null/u,"Uma sessão concluída noutro dispositivo nunca pode ressuscitar como sessão em pausa.");

console.log("✓ navegação/recovery: voltar real, browser back protegido, sessões sem entradas mortas, estados fatais com saída segura, rascunho FQ A preservado e merge multi-dispositivo sem regressão de progresso");
