import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {SCHOOL_CATALOG,schoolsForRegion} from "../app/data/secondarySchools.js";
import {PORTUGAL_REGIONS} from "../app/lib/competition.js";

const ranking=readFileSync(new URL("../app/components/SecondaryScreens.js",import.meta.url),"utf8");
const account=readFileSync(new URL("../app/components/AccountCloud.js",import.meta.url),"utf8");
const competition=readFileSync(new URL("../app/lib/competition.js",import.meta.url),"utf8");
assert.equal(SCHOOL_CATALOG.length,917,"o snapshot nacional deve manter a contagem validada");
assert.equal(new Set(SCHOOL_CATALOG.map(x=>x.id)).size,SCHOOL_CATALOG.length,"IDs de escola devem ser únicos");
assert.equal(new Set(SCHOOL_CATALOG.map(x=>`${x.region}|${x.municipality}|${x.name}`)).size,SCHOOL_CATALOG.length,"estabelecimentos por região/município/nome devem ser únicos");
for(const region of PORTUGAL_REGIONS)assert.ok(schoolsForRegion(region).length>0,`catálogo sem escolas para ${region}`);
assert.equal(schoolsForRegion("Açores").length,39,"Açores: 22 públicas com secundário + 16 profissionais + 1 particular com secundário");
assert.equal(schoolsForRegion("Madeira").length,26,"Madeira: deve acompanhar os 26 estabelecimentos com secundário reportados em 2025/26");
assert.ok(SCHOOL_CATALOG.filter(x=>!["Açores","Madeira"].includes(x.region)).length>=840,"Continente: snapshot DGEEC inesperadamente pequeno");
for(const school of SCHOOL_CATALOG){
  assert.ok(school.name?.trim(),`escola sem nome: ${school.id}`);
  assert.ok(school.municipality?.trim(),`escola sem município: ${school.id}`);
}
assert.doesNotMatch(ranking,/Nome da escola \(opcional\)/u,"Ranking não pode regressar a escola em texto livre");
assert.match(ranking,/regionSchoolOptions=schoolsForRegion\(region\)/u,"Ranking deve filtrar escolas pela região");
assert.match(ranking,/municipalityOptions=\[\.\.\.new Set\(regionSchoolOptions\.map\(row=>row\.municipality\)\)\]/u,"Ranking deve usar município antes da escola");
assert.match(ranking,/schoolOptions=municipality\?regionSchoolOptions\.filter/u,"a lista de escolas deve depender do município");
assert.match(ranking,/value=\{schoolId\}/u,"Ranking deve guardar seleção por ID canónico");
assert.match(account,/rankingSchoolId/u,"Conta deve usar a mesma seleção canónica de escola");
assert.doesNotMatch(account,/placeholder="Nome da escola"/u,"Conta não pode aceitar escola em texto livre");
assert.match(competition,/schoolId/u,"perfil competitivo deve preservar ID canónico da escola");
assert.match(ranking,/Escolhe primeiro o distrito\/região/u,"município deve depender da região");
assert.match(ranking,/Escolhe primeiro o município/u,"escola deve depender do município");
console.log(`✓ School catalogue audit passed: ${SCHOOL_CATALOG.length} establishments across ${PORTUGAL_REGIONS.length} regions`);
