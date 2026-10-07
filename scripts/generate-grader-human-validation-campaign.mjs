import {mkdirSync,writeFileSync} from "node:fs";
import {dirname,resolve} from "node:path";
import {fileURLToPath,pathToFileURL} from "node:url";
import {buildGraderHumanValidationPack} from "./generate-grader-human-validation-pack.mjs";
import {GRADER_HUMAN_VALIDATION_TARGET,serializeHumanValidationCsv} from "../app/lib/graderHumanValidation.js";

const HERE=dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR=resolve(HERE,"../grader-human-validation-campaign");
const SUBJECTS=[
  {id:"mathematics",slug:"matematica-a",label:"Matemática A"},
  {id:"portuguese",slug:"portugues",label:"Português"},
  {id:"physics-chemistry-a",slug:"fqa",label:"Física e Química A"}
];

export function buildHumanValidationCampaign(){
  const pack=buildGraderHumanValidationPack();
  const primary={};
  const overlap={};
  for(const subject of SUBJECTS){
    const rows=pack.filter(row=>row.subject===subject.id);
    if(rows.length!==GRADER_HUMAN_VALIDATION_TARGET.perSubject){
      throw new Error(`Expected ${GRADER_HUMAN_VALIDATION_TARGET.perSubject} ${subject.id} cases, got ${rows.length}`);
    }
    primary[subject.id]=rows;
    overlap[subject.id]=rows.slice(0,3);
  }
  const overlapRows=SUBJECTS.flatMap(subject=>overlap[subject.id]);
  if(overlapRows.length!==GRADER_HUMAN_VALIDATION_TARGET.overlapCases){
    throw new Error(`Expected ${GRADER_HUMAN_VALIDATION_TARGET.overlapCases} overlap cases, got ${overlapRows.length}`);
  }
  return {pack,primary,overlap,overlapRows};
}

function instructions(){
  return `# APProva+ · validação humana cega do corretor\n\nEsta campanha serve para medir concordância real entre avaliação humana independente e o corretor da APProva+. Os ficheiros não incluem resposta-modelo, categoria de benchmark, nota do Apronso nem diagnóstico do Apronso.\n\n## Como rever\n\nCada revisor deve trabalhar apenas na disciplina em que tem competência para avaliar. Nos ficheiros primários existem 15 casos por disciplina. O ficheiro de sobreposição contém 9 casos (3 por disciplina) e deve ser preenchido por um segundo revisor independente da pessoa que avaliou esses mesmos casos no ficheiro primário.\n\nPreencher apenas as colunas: reviewer, score_percent, diagnosis, requires_review e, opcionalmente, note. Não alterar question, student_response, case_id, item_id, subject, schema, max_points ou case_fingerprint.\n\n- score_percent: 0 a 100, refletindo a percentagem da cotação que a resposta merece.\n- diagnosis: um dos códigos permitidos abaixo.\n- requires_review: SIM quando a resposta exigiria revisão humana/é demasiado ambígua para decisão automática segura; caso contrário NÃO.\n- note: comentário breve opcional.\n\n## Códigos de diagnóstico\n\n- correct_or_near_correct — correta ou praticamente correta\n- incomplete_answer — resposta incompleta\n- insufficient_justification — justificação insuficiente\n- conceptual_error — erro conceptual\n- conceptual_contradiction — contradição conceptual\n- calculation_error — erro de cálculo\n- result_only — apenas resultado, sem desenvolvimento necessário\n- ambiguous_answer — resposta ambígua\n- off_topic — não responde ao pedido\n- other — outro caso\n\n## Regra de cegamento\n\nO revisor não deve consultar a correção automática da APProva+ para estes casos antes de concluir e entregar o ficheiro. A concordância só é válida se a classificação humana for independente.\n\nA campanha global só é considerada medida quando os 45 casos únicos estiverem avaliados, houver pelo menos dois revisores e existirem 9 casos de sobreposição. Até lá, qualquer resultado parcial deve ser identificado explicitamente como validação parcial por disciplina.\n`;
}

export function writeHumanValidationCampaign(outputDir=OUTPUT_DIR){
  const campaign=buildHumanValidationCampaign();
  mkdirSync(outputDir,{recursive:true});
  for(const subject of SUBJECTS){
    writeFileSync(resolve(outputDir,`revisao-${subject.slug}-15.csv`),serializeHumanValidationCsv(campaign.primary[subject.id]));
  }
  writeFileSync(resolve(outputDir,"segunda-revisao-sobreposicao-9.csv"),serializeHumanValidationCsv(campaign.overlapRows));
  writeFileSync(resolve(outputDir,"INSTRUCOES.md"),instructions());
  return campaign;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const campaign=writeHumanValidationCampaign();
  console.log("✓ campanha cega gerada em grader-human-validation-campaign/");
  console.log("  Matemática A: 15 casos primários");
  console.log("  Português: 15 casos primários");
  console.log("  FQ A: 15 casos primários");
  console.log(`  Segunda revisão: ${campaign.overlapRows.length} casos (3 por disciplina)`);
  console.log("  Nenhum output do corretor é exposto aos revisores.");
}
