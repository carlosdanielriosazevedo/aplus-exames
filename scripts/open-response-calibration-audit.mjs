import {assessEvidence} from "../app/lib/automaticEvidenceGrader.js";

const ptEvidence=[
  "Identifica a personificação do relógio.",
  "Relaciona a repetição dos segundos com a passagem inevitável do tempo."
];
const ptParaphrase=assessEvidence(
  "O relógio é apresentado como se tivesse comportamento humano e, ao marcar continuamente os segundos, mostra que o tempo não espera por ninguém.",
  ...ptEvidence
);
const ptKeywordSoup=assessEvidence("relógio personificação repetição tempo",...ptEvidence);
const ptOffTopic=assessEvidence(
  "A noite é silenciosa e a casa parece vazia, criando uma atmosfera triste.",
  ...ptEvidence
);

const fqEvidence=[
  "O catalisador acelera os dois sentidos sem alterar Kc nem a composição de equilíbrio."
];
const fqParaphrase=assessEvidence(
  "O catalisador apenas faz o equilíbrio ser atingido mais depressa; mantém a constante Kc e a composição final.",
  ...fqEvidence
);
const fqContradiction=assessEvidence(
  "O catalisador acelera a reação e aumenta Kc, alterando também a composição de equilíbrio.",
  ...fqEvidence
);
const fqVague=assessEvidence("Catalisador, rapidez, Kc e equilíbrio.",...fqEvidence);

const checks=[
  ["Portuguese paraphrase receives meaningful credit",ptParaphrase.status!=="not-observed"],
  ["Portuguese keyword soup cannot receive full credit",ptKeywordSoup.status!=="observed"&&ptKeywordSoup.substantiveResponse===false],
  ["Portuguese off-topic answer is not fully credited",ptOffTopic.status!=="observed"],
  ["FQ A paraphrase receives meaningful credit",fqParaphrase.status!=="not-observed"],
  ["FQ A scientific contradiction is detected",fqContradiction.contradictionDetected===true&&fqContradiction.status!=="observed"],
  ["FQ A keyword soup cannot receive full credit",fqVague.status!=="observed"&&fqVague.substantiveResponse===false]
];

const failed=checks.filter(([,ok])=>!ok);
for(const [label,ok] of checks)console.log(`${ok?"✓":"✗"} ${label}`);
if(failed.length){
  console.error("\nOpen-response calibration audit failed: "+failed.map(([label])=>label).join(", "));
  process.exit(1);
}
console.log("\nOpen-response calibration audit passed.");
