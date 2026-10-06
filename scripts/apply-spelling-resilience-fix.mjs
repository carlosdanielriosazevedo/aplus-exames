import fs from "node:fs";
const path="app/lib/automaticEvidenceGrader.js";
const source=fs.readFileSync(path,"utf8");
const from='  return responseTokens.some(token=>\n    token.length>=6&&\n    token.length===cue.length-1&&\n    cue.slice(0,4)===token.slice(0,4)&&\n    oneEditApart(cue,token)\n  );';
const to='  return responseTokens.some(token=>\n    token.length>=6&&\n    Math.abs(token.length-cue.length)<=1&&\n    cue.slice(0,4)===token.slice(0,4)&&\n    oneEditApart(cue,token)\n  );';
const count=source.split(from).length-1;
if(count!==1)throw new Error(`spelling resilience: esperado 1 match, encontrados ${count}`);
fs.writeFileSync(path,source.replace(from,to));
console.log("SPELLING RESILIENCE FIX: GO");
