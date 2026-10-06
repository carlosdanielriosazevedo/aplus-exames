import fs from "node:fs";

function replaceExact(path,from,to,label){
  const source=fs.readFileSync(path,"utf8");
  const count=source.split(from).length-1;
  if(count!==1)throw new Error(`${label}: esperado 1 match em ${path}, encontrados ${count}`);
  fs.writeFileSync(path,source.replace(from,to));
}

replaceExact(
  "app/lib/automaticEvidenceGrader.js",
  `function cueMatched(cue,responseTokens){\n  if(responseTokens.includes(cue))return true;\n  if(cue.length<6)return false;\n  return responseTokens.some(token=>\n    token.length>=6&&\n    Math.abs(token.length-cue.length)<=1&&\n    cue.slice(0,4)===token.slice(0,4)&&\n    oneEditApart(cue,token)\n  );\n}`,
  `function cueMatched(cue,responseTokens){\n  if(responseTokens.includes(cue))return true;\n  if(cue.length<6)return false;\n  return responseTokens.some(token=>{\n    if(token.length<6||cue.slice(0,4)!==token.slice(0,4))return false;\n    const delta=Math.abs(token.length-cue.length);\n    if(delta<=1&&oneEditApart(cue,token))return true;\n    const shorter=token.length<=cue.length?token:cue;\n    const longer=token.length>cue.length?token:cue;\n    return delta<=2&&shorter.length>=6&&longer.startsWith(shorter.slice(0,6));\n  });\n}`,
  "tolerância ortográfica conservadora"
);

replaceExact(
  "app/lib/automaticEvidenceGrader.js",
  `function relationScore(response,cues){\n  const rows=String(response||"").split(/(?<=[.!?;])\\s+|\\n+/u).map(row=>row.trim()).filter(Boolean);\n  let best=0;\n  for(const row of rows){\n    const rowTokens=tokens(row);\n    const hits=cues.filter(cue=>cueMatched(cue,rowTokens)).length;\n    best=Math.max(best,cues.length?hits/Math.min(cues.length,6):0);\n  }\n  return best;\n}`,
  `function relationScore(response,cues){\n  const responseTokens=tokens(response);\n  if(!responseTokens.length)return 0;\n  const windowSize=Math.min(12,Math.max(6,cues.length*2));\n  let best=0;\n  for(let start=0;start<responseTokens.length;start++){\n    const rowTokens=responseTokens.slice(start,start+windowSize);\n    if(!rowTokens.length)break;\n    const hits=cues.filter(cue=>cueMatched(cue,rowTokens)).length;\n    best=Math.max(best,cues.length?hits/Math.min(cues.length,6):0);\n    if(start+windowSize>=responseTokens.length)break;\n  }\n  return best;\n}`,
  "relation score invariável a pontuação"
);

console.log("SEMANTIC INVARIANCE FIX: GO");
