import assert from "node:assert/strict";
import fs from "node:fs";
import {normalizeSchoolFeatures,SCHOOL_DIRECTORY_SOURCE} from "../app/lib/server/schoolDirectory.js";

const read=path=>fs.readFileSync(path,"utf8");
const route=read("app/api/schools/route.js");
const picker=read("app/components/SchoolPicker.js");
const ranking=read("app/components/SecondaryScreens.js");
const competition=read("app/lib/competition.js");
const layout=read("app/layout.js");

assert.match(SCHOOL_DIRECTORY_SOURCE.url,/gesedu\.pt\/PesquisaRede/u,"A fonte do diretório deve ser a Pesquisa da Rede Escolar oficial.");
assert.match(SCHOOL_DIRECTORY_SOURCE.featureLayer,/RedeEscolar_tab\/FeatureServer\/0/u,"O diretório deve usar a camada oficial da Rede Escolar.");
assert.match(route,/s-maxage=86400/u,"A resposta nacional deve ser cacheada para não depender de uma chamada externa por aluno.");
assert.match(route,/SCHOOL_DIRECTORY_UNAVAILABLE/u,"Uma indisponibilidade da fonte oficial deve falhar explicitamente, nunca devolver uma lista parcial como completa.");
assert.match(picker,/role="combobox"/u);
assert.match(picker,/role="listbox"/u);
assert.match(picker,/aria-activedescendant/u,"O seletor deve funcionar também por teclado.");
assert.match(picker,/fetch\("\/api\/schools"/u,"A lista nacional deve ser carregada apenas quando o aluno usa o seletor, sem aumentar o bundle inicial.");
assert.match(ranking,/SchoolPicker/u,"O perfil do ranking deve usar o seletor canónico.");
assert.doesNotMatch(ranking,/<label>Escola<input/u,"O nome da escola não pode voltar a ser um campo de texto livre.");
assert.match(competition,/c\.profile\.schoolId/u,"O ranking escolar deve exigir o identificador canónico da escola.");
assert.match(layout,/school-picker\.css/u,"Os estilos acessíveis do seletor devem estar carregados.");

const fixture=[
  {attributes:{CODUOME:"100",NOME:"Escola Secundária Exemplo",CONCELHO:"Lisboa",DISTRITO:"Lisboa"}},
  {attributes:{CODUOME:"100",NOME:"Escola Secundária Exemplo - Pólo",CONCELHO:"Sintra",DISTRITO:"Lisboa"}},
  {attributes:{CODUOME:null,NOME:"Escola Profissional Exemplo",CONCELHO:"Funchal",DISTRITO:"Ilha da Madeira"}},
  {attributes:{CODUOME:null,NOME:"Escola Profissional Exemplo",CONCELHO:"Funchal",DISTRITO:"Ilha da Madeira"}}
];
const normalized=normalizeSchoolFeatures(fixture);
assert.equal(normalized.length,3,"Registos idênticos devem ser deduplicados, mas pólos distintos nunca podem colidir.");
assert.equal(new Set(normalized.map(row=>row.id)).size,3);
assert.ok(normalized.every(row=>row.name&&row.municipality&&row.district&&row.id));

console.log("✓ diretório canónico de escolas: fonte oficial, seleção fechada, teclado e identidade escolar validados");
