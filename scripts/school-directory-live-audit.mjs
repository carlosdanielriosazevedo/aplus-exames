import assert from "node:assert/strict";
import {fetchOfficialSecondarySchools,SCHOOL_DIRECTORY_SOURCE} from "../app/lib/server/schoolDirectory.js";

const schools=await fetchOfficialSecondarySchools();
assert.ok(schools.length>=1100,`A fonte oficial devolveu apenas ${schools.length} estabelecimentos com Secundário/Profissional.`);
assert.equal(new Set(schools.map(school=>school.id)).size,schools.length,"O diretório canónico contém IDs repetidos.");
for(const school of schools){
  assert.ok(school.name&&school.municipality&&school.district,`Registo incompleto: ${JSON.stringify(school)}`);
}
const districts=new Set(schools.map(school=>school.district));
for(const district of ["Aveiro","Beja","Braga","Bragança","Castelo Branco","Coimbra","Évora","Faro","Guarda","Leiria","Lisboa","Portalegre","Porto","Santarém","Setúbal","Viana do Castelo","Vila Real","Viseu"]){
  assert.ok(districts.has(district),`Falta o distrito ${district}.`);
}
assert.ok([...districts].some(value=>/Madeira|Porto Santo/u.test(value)),"A rede escolar deve incluir Madeira/Porto Santo.");
assert.ok([...districts].some(value=>/São Miguel|Terceira|Faial|Pico|Santa Maria|São Jorge|Graciosa|Flores|Corvo/u.test(value)),"A rede escolar deve incluir os Açores.");
console.log(`✓ diretório oficial ao vivo: ${schools.length} estabelecimentos únicos · ${districts.size} distritos/ilhas · ${SCHOOL_DIRECTORY_SOURCE.authority}`);
