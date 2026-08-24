
export function stableValidationPayload(item){
  return {
    id:item?.id||null,
    themeId:item?.themeId||null,
    microcompetencyId:item?.microcompetencyId||null,
    q:item?.q||"",
    o:item?.o||[],
    a:item?.a,
    sol:item?.sol||"",
    hyp:item?.hyp||"",
    cognitive:item?.cognitive||null,
    difficulty:item?.difficulty||null,
    contexts:item?.contexts||[],
    signature:item?.signature||null
  };
}

export function validationHash(text){
  let h=2166136261;
  for(let i=0;i<text.length;i++){
    h^=text.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return (h>>>0).toString(16).padStart(8,"0");
}

export function contentRevisionFingerprint(item){
  return `cr1-${validationHash(JSON.stringify(stableValidationPayload(item)))}`;
}
