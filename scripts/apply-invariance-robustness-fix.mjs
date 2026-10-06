import fs from "node:fs";

const path="app/lib/automaticEvidenceGrader.js";
let source=fs.readFileSync(path,"utf8");
function replaceExact(from,to,label){
  const count=source.split(from).length-1;
  if(count!==1)throw new Error(`${label}: expected 1 match, got ${count}`);
  source=source.replace(from,to);
}

replaceExact(
`  return responseTokens.some(token=>
    token.length>=6&&
    Math.abs(token.length-cue.length)<=1&&
    cue.slice(0,4)===token.slice(0,4)&&
    oneEditApart(cue,token)
  );`,
`  return responseTokens.some(token=>{
    if(token.length<6)return false;
    if(Math.abs(token.length-cue.length)<=1&&cue.slice(0,4)===token.slice(0,4)&&oneEditApart(cue,token))return true;
    // A typo can prevent suffix stemming (e.g. algebrica -> algebrca),
    // making a one-letter error look two characters longer after stemming.
    // Accept only a conservative long shared stem in that case.
    return Math.abs(token.length-cue.length)<=2&&Math.min(token.length,cue.length)>=6&&
      (token.startsWith(cue)||cue.startsWith(token));
  });`,
"typo-tolerant cue matching"
);

replaceExact(
`  const coherentProse=relationMarkers.some(marker=>normalizedResponse.split(" ").includes(marker))||/[.!?;:]/u.test(rawResponse)||symbolicStructure;
  const substantiveResponse=wordCount>=8&&uniqueContentTokens>=5&&coherentProse;`,
`  const hasRelationMarker=relationMarkers.some(marker=>normalizedResponse.split(" ").includes(marker));
  // Punctuation is presentation, not evidence. Removing accents/punctuation must not
  // change whether the same semantic response is considered substantive.
  const coherentProse=hasRelationMarker||symbolicStructure||(wordCount>=8&&uniqueContentTokens>=5);
  const substantiveResponse=wordCount>=8&&uniqueContentTokens>=5&&coherentProse;`,
"punctuation-invariant substantive response"
);

fs.writeFileSync(path,source);
console.log("INVARIANCE ROBUSTNESS PATCH: GO");
