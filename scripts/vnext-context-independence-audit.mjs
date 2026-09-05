import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("content/vnext/math-a");

const dependencyPatterns = [
  /\bitem anterior\b/i,
  /\bcaso anterior\b/i,
  /\bquest[aã]o anterior\b/i,
  /\bproblema anterior\b/i,
  /\bmodelo anterior\b/i,
  /\btabela anterior\b/i,
  /\bestudo anterior\b/i,
  /\bpopula[cç][aã]o anterior\b/i,
  /\bconjunto anterior\b/i,
  /\breta anterior\b/i,
  /\bintervalo anterior\b/i,
  /\bmatriz anterior\b/i,
  /\bno mesmo exemplo\b/i,
  /\bno mesmo contexto\b/i,
  /\bno mesmo grupo\b/i,
  /\bno mesmo produto\b/i,
  /\bno mesmo sinal\b/i,
  /\bna mesma transforma[cç][aã]o\b/i,
  /\bna mesma vari[aá]vel\b/i,
  /\bna mesma urna\b/i,
  /\bna mesma rede\b/i,
  /\bcom as mesmas fun[cç][oõ]es\b/i,
  /\bcom os mesmos A e B\b/i,
  /\bcom as mesmas A,B\b/i,
  /\bna mesma Q\b/i
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const files = walk(ROOT).filter((file) => file.endsWith(".json"));
const hits = [];
let questionCount = 0;

for (const file of files) {
  const payload = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const question of payload.questions ?? []) {
    questionCount += 1;
    const text = String(question.q ?? "");
    const matched = dependencyPatterns.filter((pattern) => pattern.test(text));
    if (matched.length) {
      hits.push({
        file: path.relative(process.cwd(), file),
        id: question.id,
        q: text,
        matches: matched.map(String)
      });
    }
  }
}

if (hits.length) {
  console.error(JSON.stringify({
    ok: false,
    files: files.length,
    questions: questionCount,
    contextualDependencies: hits
  }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  files: files.length,
  questions: questionCount,
  contextualDependencies: 0
}, null, 2));
