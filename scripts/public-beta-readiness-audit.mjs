import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {spawnSync} from "node:child_process";

const welcome=readFileSync(new URL("../app/components/Welcome.js",import.meta.url),"utf8");
const privacy=readFileSync(new URL("../app/privacidade/page.js",import.meta.url),"utf8");
const terms=readFileSync(new URL("../app/termos/page.js",import.meta.url),"utf8");
const pilot=readFileSync(new URL("../app/piloto/page.js",import.meta.url),"utf8");
const guardian=readFileSync(new URL("../app/piloto/encarregado/page.js",import.meta.url),"utf8");
const settings=readFileSync(new URL("../app/definicoes/page.js",import.meta.url),"utf8");
const pilotCopy=readFileSync(new URL("../app/lib/pilotCopy.js",import.meta.url),"utf8");

assert.match(welcome,/href="\/privacidade"/u,"A entrada pública deve expor Privacidade.");
assert.match(welcome,/href="\/termos"/u,"A entrada pública deve expor Termos de utilização.");
assert.match(privacy,/Sem consentimento ativo, a app não recolhe nem envia telemetria do piloto/u,"Privacidade deve explicar que sem pilot_self não há telemetria.");
assert.match(privacy,/retirar o consentimento ou apagar os dados do piloto/u,"Privacidade deve explicar revogação e apagamento.");
assert.match(pilot,/Tenho 13 anos ou mais/u,"Consentimento deve exigir confirmação 13+ não pré-selecionada.");
assert.match(pilot,/Li isto e aceito participar no piloto/u,"Consentimento deve exigir aceitação explícita não pré-selecionada.");
assert.match(pilot,/Agora não/u,"Piloto deve permitir continuar sem telemetria.");
assert.match(pilot,/href="\/privacidade"/u,"Consentimento deve ligar à página de privacidade.");
assert.match(pilot,/href="\/piloto\/encarregado"/u,"Consentimento deve disponibilizar informação opcional ao encarregado.");
assert.match(pilot,/href="\/definicoes"/u,"Consentimento deve ligar às definições de dados do piloto.");
assert.match(settings,/Apagar os meus dados do piloto/u,"Definições devem expor o apagamento dos dados do piloto.");
assert.match(settings,/\/api\/pilot\/data/u,"Apagamento deve usar o endpoint autenticado do piloto.");
assert.match(guardian,/Esta página é apenas informativa/u,"Página do encarregado não deve criar um fluxo de conta bloqueante.");
assert.match(pilotCopy,/\[responsável\]/u,"Responsável deve continuar configurável, sem valor inventado.");
assert.match(pilotCopy,/\[email\]/u,"Contacto deve continuar configurável, sem valor inventado.");
assert.match(pilotCopy,/\[data fim do piloto\]/u,"Fim do piloto deve continuar configurável, sem valor inventado.");
assert.match(pilotCopy,/não guardamos o texto das tuas respostas/u,"Texto adolescente deve declarar a regra de minimização protegida pelo serializer cloud.");
assert.match(terms,/Não é uma plataforma oficial do IAVE/u,"Termos devem deixar claro que a APProva+ não é oficial.");
assert.match(terms,/Não substituem a classificação oficial/u,"Termos devem distinguir feedback da classificação oficial.");
assert.match(terms,/não constituem a versão jurídica final/u,"A beta não deve fingir revisão jurídica final.");

const checks=[
  ["Primeira experiência e percurso do aluno","npm",["run","student-experience:audit"]],
  ["Onboarding e reteste","npm",["run","onboarding-retest:audit"]],
  ["Mobile e legibilidade","npm",["run","mobile:audit"]],
  ["Retoma e conflitos entre dispositivos","npm",["run","cloud-reliability:audit"]],
  ["Persistência de feedback e analytics","node",["scripts/beta-feedback-analytics-audit.mjs"]]
];

let failed=0;
for(const [label,cmd,args] of checks){
  console.log(`\n=== ${label} ===`);
  const result=spawnSync(cmd,args,{stdio:"inherit",shell:process.platform==="win32"});
  if(result.status!==0){
    failed++;
    console.error(`✗ ${label}`);
  }else{
    console.log(`✓ ${label}`);
  }
}

if(failed){
  console.error(`PUBLIC BETA READINESS: NO-GO (${failed} check(s) falharam)`);
  process.exit(1);
}
console.log("✓ PUBLIC BETA READINESS: GO — UX inicial, mobile, cloud, consentimento pilot_self, analytics e transparência protegidos");