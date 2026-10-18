// Aplica a normalização de espaços palavra↔número aos JSON de origem de Matemática A,
// substituindo apenas os textos alterados (o formato de cada ficheiro mantém-se).
// Uso: node scripts/normalize-math-spacing.mjs [--check]
import fs from "node:fs";
import path from "node:path";
import {separateWordsFromNumbers} from "../app/lib/mathVisibleCopy.js";

const CHECK=process.argv.includes("--check");
const ROOT="content/vnext/math-a";
const VISIBLE=new Set(["q","sol","hyp","note","focus","subtopic","prompt","explanation","title","subtitle","label","feedback","hint","text","statement","instruction","o","options"]);

function collect(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
    const file=path.join(dir,entry.name);
    return entry.isDirectory()?collect(file):entry.name.endsWith(".json")?[file]:[];
  });
}
function changedStrings(value,visible,found){
  if(Array.isArray(value)){for(const item of value)changedStrings(item,visible,found);return}
  if(value&&typeof value==="object"){
    for(const [key,item] of Object.entries(value))changedStrings(item,VISIBLE.has(key),found);
    return;
  }
  if(typeof value==="string"&&visible){
    const next=separateWordsFromNumbers(value);
    if(next!==value)found.set(value,next);
  }
}
let files=0,strings=0;
for(const file of collect(ROOT)){
  let source=fs.readFileSync(file,"utf8");
  const found=new Map();
  changedStrings(JSON.parse(source),false,found);
  if(!found.size)continue;
  files++;strings+=found.size;
  if(CHECK)continue;
  for(const [from,to] of found){
    const encodedFrom=JSON.stringify(from);
    if(!source.includes(encodedFrom))throw new Error(`${file}: texto não encontrado tal como escrito: ${from}`);
    source=source.split(encodedFrom).join(JSON.stringify(to));
  }
  fs.writeFileSync(file,source);
}
console.log(`${CHECK?"Por corrigir":"Corrigidos"}: ${files} ficheiros, ${strings} textos distintos.`);
if(CHECK&&strings)process.exit(1);
