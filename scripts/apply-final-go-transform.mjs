import fs from "node:fs";

function read(path){return fs.readFileSync(path,"utf8")}
function write(path,content){fs.writeFileSync(path,content)}
function replace(path,from,to,label=path){
  let source=read(path);
  if(source.includes(to))return;
  if(!source.includes(from))throw new Error(`Transform anchor missing: ${label}`);
  source=source.replace(from,to);
  write(path,source);
}
function replaceAll(path,from,to){
  const source=read(path);
  if(!source.includes(from))return;
  write(path,source.split(from).join(to));
}

replace("app/layout.js","import './exam-hub-contrast.css';","import './exam-hub-contrast.css';\nimport './school-picker.css';","layout school-picker CSS");

replace("app/components/SecondaryScreens.js",
  'import {Back,BrandName,Shell,StudentNav,StudentTop} from "./chrome";',
  'import {Back,BrandName,Shell,StudentNav,StudentTop} from "./chrome";\nimport SchoolPicker from "./SchoolPicker";',
  "SecondaryScreens SchoolPicker import");
replace("app/components/SecondaryScreens.js",
  '  const [school,setSchool]=useState(profile.school||"");',
  '  const [selectedSchool,setSelectedSchool]=useState(profile.schoolId&&profile.school?{id:profile.schoolId,name:profile.school,municipality:profile.schoolMunicipality||"",district:profile.schoolDistrict||""}:null);',
  "SecondaryScreens canonical school state");
replace("app/components/SecondaryScreens.js",
  '      school:school.trim()||null,\n      districtOptIn,\n      schoolOptIn',
  '      school:selectedSchool?.name||null,\n      schoolId:selectedSchool?.id||null,\n      schoolMunicipality:selectedSchool?.municipality||null,\n      schoolDistrict:selectedSchool?.district||null,\n      districtOptIn,\n      schoolOptIn:Boolean(schoolOptIn&&selectedSchool?.id)',
  "SecondaryScreens canonical school save");
replace("app/components/SecondaryScreens.js",
  '<b>{scope==="district"?"Ranking de distrito/região ainda não ativo":"Ranking de escola ainda não ativo"}</b>',
  '<b>{scope==="district"?"Ranking de distrito/região indisponível":"Ranking de escola indisponível"}</b>',
  "ranking availability copy");
replace("app/components/SecondaryScreens.js",
  '?`No ranking real, só abriremos uma tabela de escola com pelo menos ${SCHOOL_MIN_PARTICIPANTS} participantes elegíveis, para reduzir risco de identificação.`\n        :`No ranking real, o distrito/região terá um limiar mínimo de ${DISTRICT_MIN_PARTICIPANTS} participantes.`}',
  '?`O ranking da escola só fica disponível com pelo menos ${SCHOOL_MIN_PARTICIPANTS} participantes elegíveis, para reduzir risco de identificação.`\n        :`O ranking do distrito/região só fica disponível com pelo menos ${DISTRICT_MIN_PARTICIPANTS} participantes elegíveis.`}',
  "ranking privacy copy");
replace("app/components/SecondaryScreens.js",
  'Em rankings muito grandes, a experiência deverá privilegiar a tua posição e quem está imediatamente acima/abaixo — não uma lista infinita.',
  'Em rankings muito grandes, mostramos a tua posição e quem está imediatamente acima e abaixo.',
  "ranking concise copy");
replace("app/components/SecondaryScreens.js",
  'Em produção, cada liga terá um pequeno grupo de alunos com atividade comparável. No final da semana, os primeiros sobem e os últimos podem descer.',
  'Cada liga reúne um pequeno grupo de alunos com atividade comparável. No final da semana, os primeiros sobem e os últimos podem descer.',
  "ranking production copy");
replace("app/components/SecondaryScreens.js",
  '<label>Escola<input value={school} onChange={e=>setSchool(e.target.value)} placeholder="Nome da escola (opcional)"/></label>',
  '<label>Escola<SchoolPicker value={selectedSchool} initialText={profile.school||""} onChange={school=>{setSelectedSchool(school);if(!school)setSchoolOptIn(false)}}/></label>',
  "SchoolPicker UI");
replace("app/components/SecondaryScreens.js",
  '<label className="rankConsent"><input type="checkbox" checked={schoolOptIn} onChange={e=>setSchoolOptIn(e.target.checked)}/><span>Participar no ranking da minha escola.</span></label>',
  '<label className="rankConsent"><input type="checkbox" disabled={!selectedSchool?.id} checked={Boolean(schoolOptIn&&selectedSchool?.id)} onChange={e=>setSchoolOptIn(e.target.checked)}/><span>Participar no ranking da minha escola.</span></label>',
  "canonical school opt-in");

replace("app/lib/competition.js",
  '      school:null,\n      schoolOptIn:false,',
  '      school:null,\n      schoolId:null,\n      schoolMunicipality:null,\n      schoolDistrict:null,\n      schoolOptIn:false,',
  "competition canonical school defaults");
replace("app/lib/competition.js",
  '  const school=patch.school!==undefined\n    ?cleanRankingText(patch.school,80)||null\n    :c.profile.school;\n  const districtOptIn=',
  '  const school=patch.school!==undefined\n    ?cleanRankingText(patch.school,160)||null\n    :c.profile.school;\n  const schoolId=patch.schoolId!==undefined\n    ?cleanRankingText(patch.schoolId,80)||null\n    :(patch.school!==undefined?null:c.profile.schoolId);\n  const schoolMunicipality=patch.schoolMunicipality!==undefined\n    ?cleanRankingText(patch.schoolMunicipality,100)||null\n    :(patch.school!==undefined?null:c.profile.schoolMunicipality);\n  const schoolDistrict=patch.schoolDistrict!==undefined\n    ?cleanRankingText(patch.schoolDistrict,100)||null\n    :(patch.school!==undefined?null:c.profile.schoolDistrict);\n  const districtOptIn=',
  "competition canonical school normalization");
replace("app/lib/competition.js",
  '  const schoolOptIn=patch.schoolOptIn!==undefined?Boolean(patch.schoolOptIn):Boolean(c.profile.schoolOptIn);',
  '  const requestedSchoolOptIn=patch.schoolOptIn!==undefined?Boolean(patch.schoolOptIn):Boolean(c.profile.schoolOptIn);\n  const schoolOptIn=Boolean(requestedSchoolOptIn&&school&&schoolId);',
  "competition canonical opt-in guard");
replace("app/lib/competition.js",
  '        region,\n        school,\n        districtOptIn,',
  '        region,\n        school,\n        schoolId,\n        schoolMunicipality,\n        schoolDistrict,\n        districtOptIn,',
  "competition canonical school persistence");
replace("app/lib/competition.js",
  '    return c.profile.school&&c.profile.schoolOptIn&&schoolYear',
  '    return c.profile.school&&c.profile.schoolId&&c.profile.schoolOptIn&&schoolYear',
  "school ranking availability identity guard");
replace("app/lib/competition.js",
  '    school:c.profile.schoolOptIn?c.profile.school:null,',
  '    schoolId:c.profile.schoolOptIn?c.profile.schoolId:null,\n    school:c.profile.schoolOptIn?c.profile.school:null,',
  "public ranking canonical school id");

for(const file of ["app/clientApp.js","app/components/PortugueseSubject.js","app/components/PhysicsChemistrySubject.js"])replaceAll(file,"Voltar à Home","Ir para o menu inicial");

replace("scripts/competition-audit.mjs",
  '  school:"Escola Demo",\n  districtOptIn:true,',
  '  school:"Escola Demo",\n  schoolId:"pt-school-demo-001",\n  schoolMunicipality:"Aveiro",\n  schoolDistrict:"Aveiro",\n  districtOptIn:true,',
  "competition audit canonical base profile");
replace("scripts/competition-audit.mjs",
  'assert.equal(publicFields.schoolYear,"12.º");',
  'assert.equal(publicFields.schoolYear,"12.º");\nassert.equal(publicFields.schoolId,"pt-school-demo-001");',
  "competition public school ID assertion");
replace("scripts/competition-audit.mjs",
  '  school:"\\u0000  Escola   Demo  ",\n  districtOptIn:"yes",\n  schoolOptIn:1,',
  '  school:"\\u0000  Escola   Demo  ",\n  schoolId:"pt-school-demo-001",\n  schoolMunicipality:"  Lisboa ",\n  schoolDistrict:" Lisboa ",\n  districtOptIn:"yes",\n  schoolOptIn:1,',
  "competition hardened canonical school fixture");
replace("scripts/competition-audit.mjs",
  'assert.equal(hardenedProfile.competition.profile.school,"Escola Demo");\nassert.equal(hardenedProfile.competition.profile.districtOptIn,true);',
  'assert.equal(hardenedProfile.competition.profile.school,"Escola Demo");\nassert.equal(hardenedProfile.competition.profile.schoolId,"pt-school-demo-001");\nassert.equal(hardenedProfile.competition.profile.schoolMunicipality,"Lisboa");\nassert.equal(hardenedProfile.competition.profile.schoolDistrict,"Lisboa");\nassert.equal(hardenedProfile.competition.profile.districtOptIn,true);',
  "competition canonical school normalization assertions");
replace("scripts/competition-audit.mjs",
  'assert.equal("secretField" in hardenedProfile.competition.profile,false);',
  'assert.equal("secretField" in hardenedProfile.competition.profile,false);\nassert.equal(scopeAvailability(hardenedProfile,"school").available,true);\n\nconst freeTextSchool=updateCompetitionProfile(s,{school:"Escola escrita à mão",schoolOptIn:true});\nassert.equal(freeTextSchool.competition.profile.schoolOptIn,false,"Uma escola sem identificador canónico nunca pode ativar o ranking escolar.");\nassert.equal(scopeAvailability(freeTextSchool,"school").available,false);',
  "competition free-text rejection assertion");

replace("scripts/technical-gate.mjs",
  '  ["Rankings e divisões","npm",["run","competition:audit"]],',
  '  ["Rankings e divisões","npm",["run","competition:audit"]],\n  ["Diretório canónico de escolas","npm",["run","school-directory:audit"]],\n  ["Certificação final de experiência","npm",["run","final-go:audit"]],',
  "technical gate school/final audits");

replace("scripts/post-deploy-smoke.mjs",
  'assert.equal(Number(health.pilotSmokeApiVersion),1,"Preview smoke API must be ready before authenticated smoke");',
  'assert.equal(Number(health.pilotSmokeApiVersion),1,"Preview smoke API must be ready before authenticated smoke");\n\nconst schoolResponse=await appFetch("/api/schools",{cache:"no-store"});\nconst schoolDirectory=await jsonOrText(schoolResponse);\nassert.equal(schoolResponse.status,200,"/api/schools must return 200");\nassert.ok(Array.isArray(schoolDirectory.schools)&&schoolDirectory.schools.length>=1100,"School directory must expose the full official secondary/professional network");\nassert.equal(schoolDirectory.count,schoolDirectory.schools.length,"School directory count must match its canonical rows");',
  "preview school directory smoke");
replace("scripts/production-smoke.mjs",
  'assert.equal(health.body?.dataApiUrl,null,"Production health must not expose the Neon Data API URL");',
  'assert.equal(health.body?.dataApiUrl,null,"Production health must not expose the Neon Data API URL");\n\nconst schools=await getJson("/api/schools");\nassert.equal(schools.response.status,200,`Production /api/schools must return 200, got ${schools.response.status}`);\nassert.ok(Array.isArray(schools.body?.schools)&&schools.body.schools.length>=1100,"Production school directory must include the full official secondary/professional network");\nassert.equal(schools.body?.count,schools.body.schools.length,"Production school directory count must match canonical rows");',
  "production school directory smoke");

const pkg=JSON.parse(read("package.json"));
pkg.scripts["school-directory:audit"]="node scripts/school-directory-audit.mjs";
pkg.scripts["school-directory:live-audit"]="node scripts/school-directory-live-audit.mjs";
pkg.scripts["final-go:audit"]="node scripts/final-go-audit.mjs";
pkg.scripts["security:production-audit"]="npm audit --omit=dev --audit-level=moderate";
pkg.scripts["final:go"]="npm run school-directory:live-audit && npm run security:production-audit && npm run technical:gate && npm run final-go:audit && npm run build";
write("package.json",JSON.stringify(pkg,null,2)+"\n");

console.log("✓ final GO transformation applied");
