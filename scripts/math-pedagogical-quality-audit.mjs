import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const ROOT = path.resolve("content/vnext/math-a");
const YEARS = ["10", "11", "12"];
const EXPECTED_FILES = 113;
const EXPECTED_QUESTIONS = 5650;

function cleanText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[−–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function promptKey(value) {
  return cleanText(value)
    .replace(/\d+(?:[.,]\d+)?/g, "#")
    .replace(/\b(?:pi|π|e)\b/g, "CONST")
    .replace(/[a-z]\d*/g, "v")
    .replace(/\s+/g, " ")
    .trim();
}

function ratio(n, d) {
  return d ? n / d : 0;
}

function pct(n, d) {
  return `${(100 * ratio(n, d)).toFixed(1)}%`;
}

const files = [];
for (const year of YEARS) {
  const dir = path.join(ROOT, year);
  for (const name of fs.readdirSync(dir).filter(x => x.endsWith(".json")).sort()) {
    files.push(path.join(dir, name));
  }
}
assert.equal(files.length, EXPECTED_FILES, `Esperados ${EXPECTED_FILES} ficheiros vNext de Matemática A`);

const all = [];
const exactPromptMap = new Map();
const idSet = new Set();
const fileReports = [];
const warnings = [];
const blockers = [];

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  assert.ok(Array.isArray(data.questions), `${file}: questions em falta`);

  const items = data.questions;
  const difficulties = new Map();
  const cognitives = new Map();
  const answers = [0, 0, 0, 0];
  const templateCounts = new Map();
  let shortPromptCount = 0;
  let shortSolutionCount = 0;

  for (const q of items) {
    if (!q?.id || idSet.has(q.id)) blockers.push(`${file}: ID ausente ou repetido (${q?.id || "sem ID"})`);
    idSet.add(q.id);
    const p = cleanText(q.q);
    if (!p) blockers.push(`${q.id}: enunciado vazio`);
    const existing = exactPromptMap.get(p) || [];
    existing.push({id: q.id, file});
    exactPromptMap.set(p, existing);

    const key = promptKey(q.q);
    templateCounts.set(key, (templateCounts.get(key) || 0) + 1);
    difficulties.set(String(q.difficulty ?? "?"), (difficulties.get(String(q.difficulty ?? "?")) || 0) + 1);
    cognitives.set(String(q.cognitive ?? "?"), (cognitives.get(String(q.cognitive ?? "?")) || 0) + 1);
    if ([0,1,2,3].includes(q.a)) answers[q.a]++;
    if (cleanText(q.q).length < 28) shortPromptCount++;
    if (cleanText(q.sol).length < 18) shortSolutionCount++;
    all.push({...q, __file:file, __subtopic:data.subtopic, __year:data.year});
  }

  const maxTemplate = Math.max(0, ...templateCounts.values());
  const templateDiversity = ratio(templateCounts.size, items.length);
  const maxAnswer = Math.max(...answers);
  const cognitiveCategories = [...cognitives.keys()].filter(x => x !== "?").length;
  const difficultyCategories = [...difficulties.keys()].filter(x => x !== "?").length;

  const localWarnings = [];
  if (templateDiversity < 0.35) localWarnings.push(`baixa diversidade de estrutura (${pct(templateCounts.size, items.length)} templates únicos)`);
  if (maxTemplate >= Math.ceil(items.length * 0.35)) localWarnings.push(`template dominante em ${maxTemplate}/${items.length} itens`);
  if (cognitiveCategories < 2) localWarnings.push(`apenas ${cognitiveCategories} categoria cognitiva`);
  if (difficultyCategories < 2) localWarnings.push(`apenas ${difficultyCategories} nível de dificuldade`);
  if (maxAnswer > Math.ceil(items.length * 0.45)) localWarnings.push(`posição de resposta demasiado concentrada (${maxAnswer}/${items.length})`);
  if (shortPromptCount > Math.ceil(items.length * 0.60)) localWarnings.push(`${shortPromptCount}/${items.length} enunciados muito curtos`);
  if (shortSolutionCount > Math.ceil(items.length * 0.50)) localWarnings.push(`${shortSolutionCount}/${items.length} resoluções muito curtas`);

  if (localWarnings.length) warnings.push({file, subtopic:data.subtopic, warnings:localWarnings});
  fileReports.push({
    file,
    year:data.year,
    subtopic:data.subtopic,
    questions:items.length,
    templateDiversity:Number(templateDiversity.toFixed(3)),
    maxTemplate,
    difficulties:Object.fromEntries(difficulties),
    cognitives:Object.fromEntries(cognitives),
    answerPositions:answers,
    shortPromptCount,
    shortSolutionCount,
    warnings:localWarnings
  });
}

assert.equal(all.length, EXPECTED_QUESTIONS, `Esperadas ${EXPECTED_QUESTIONS} perguntas vNext`);
assert.equal(idSet.size, EXPECTED_QUESTIONS, `Esperados ${EXPECTED_QUESTIONS} IDs únicos`);

const exactDuplicates = [...exactPromptMap.entries()]
  .filter(([text, rows]) => text && rows.length > 1)
  .map(([text, rows]) => ({text, count:rows.length, ids:rows.map(x => x.id), files:[...new Set(rows.map(x => x.file))]}))
  .sort((a,b) => b.count - a.count || a.text.localeCompare(b.text));

const totalDifficulty = {};
const totalCognitive = {};
const totalAnswer = [0,0,0,0];
for (const q of all) {
  const d = String(q.difficulty ?? "?");
  const c = String(q.cognitive ?? "?");
  totalDifficulty[d] = (totalDifficulty[d] || 0) + 1;
  totalCognitive[c] = (totalCognitive[c] || 0) + 1;
  if ([0,1,2,3].includes(q.a)) totalAnswer[q.a]++;
}

const report = {
  schemaVersion:1,
  subject:"Matemática A",
  pass:"pedagogical_quality_transversal_v1",
  files:files.length,
  questions:all.length,
  exactDuplicatePromptGroups:exactDuplicates.length,
  warningSubtopics:warnings.length,
  blockers,
  overall:{difficulty:totalDifficulty,cognitive:totalCognitive,answerPositions:totalAnswer},
  warnings,
  duplicateExamples:exactDuplicates.slice(0,30),
  generatedAt:new Date().toISOString()
};

console.log("\n=== Passagem pedagógica transversal — Matemática A ===");
console.log(`Banco: ${report.files} submatérias · ${report.questions} perguntas`);
console.log(`Duplicados exatos de enunciado: ${report.exactDuplicatePromptGroups} grupos`);
console.log(`Submatérias com sinais de baixa variedade/calibração: ${report.warningSubtopics}`);
console.log(`Distribuição de dificuldade: ${JSON.stringify(totalDifficulty)}`);
console.log(`Distribuição cognitiva: ${JSON.stringify(totalCognitive)}`);
console.log(`Posição das respostas A/B/C/D: ${totalAnswer.join("/")}`);

if (warnings.length) {
  console.log("\nSinais para revisão editorial prioritária:");
  for (const row of warnings.slice(0,40)) console.log(`- ${row.subtopic}: ${row.warnings.join("; ")}`);
  if (warnings.length > 40) console.log(`- … +${warnings.length - 40} submatérias`);
}
if (exactDuplicates.length) {
  console.log("\nDuplicados exatos (amostra):");
  for (const row of exactDuplicates.slice(0,20)) console.log(`- ${row.count}× ${row.ids.join(", ")} :: ${row.text.slice(0,110)}`);
}

if (blockers.length) {
  console.error(`\nPEDAGOGICAL QUALITY GATE: NO-GO — ${blockers.length} blocker(s)`);
  for (const item of blockers.slice(0,30)) console.error(`- ${item}`);
  process.exit(1);
}

console.log("\nPEDAGOGICAL QUALITY GATE: GO estrutural");
console.log("Nota: warnings são pistas editoriais, não erros automáticos. O objetivo é identificar repetição, mecanização e calibração para segunda passagem humana/IA.");
