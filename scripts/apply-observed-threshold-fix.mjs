import fs from "node:fs";
const path="app/lib/automaticEvidenceGrader.js";
const source=fs.readFileSync(path,"utf8");
const from='  if(substantiveResponse&&((matched.length>=3&&semanticScore>=.32)||(matched.length>=2&&semanticScore>=.44)))status="observed";';
const to='  if(substantiveResponse&&semanticScore>=.52&&((matched.length>=3&&relation>=.18)||(matched.length>=2&&relation>=.3)))status="observed";';
const count=source.split(from).length-1;
if(count!==1)throw new Error(`observed threshold: esperado 1 match, encontrados ${count}`);
fs.writeFileSync(path,source.replace(from,to));
console.log("OBSERVED THRESHOLD FIX: GO");
