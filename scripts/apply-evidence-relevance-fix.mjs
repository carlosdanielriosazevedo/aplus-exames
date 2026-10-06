import fs from "node:fs";

function patch(path,replacements){
  let source=fs.readFileSync(path,"utf8");
  for(const [label,from,to] of replacements){
    const count=source.split(from).length-1;
    if(count!==1)throw new Error(`${label}: expected 1 match in ${path}, got ${count}`);
    source=source.replace(from,to);
  }
  fs.writeFileSync(path,source);
}

patch("app/lib/automaticEvidenceGrader.js",[[
  "direct factual criteria",
  `  let status="not-observed";\n  if(substantiveResponse&&semanticScore>=.40&&((matched.length>=3&&relation>=.18)||(matched.length>=2&&relation>=.3)))status="observed";\n  else if(matched.length>=1&&semanticScore>=.12)status="partial";`,
  `  const evidenceInstruction=normalizeEvidenceText(evidenceTexts.filter(Boolean).join(" "));\n  const directFactualCriterion=/\\b(?:refere|indica|identifica|seleciona|menciona|nomeia)\\b/u.test(evidenceInstruction);\n  let status="not-observed";\n  if(substantiveResponse&&semanticScore>=.40&&((matched.length>=3&&relation>=.18)||(matched.length>=2&&relation>=.3)))status="observed";\n  else if(substantiveResponse&&directFactualCriterion&&matched.length>=2&&semanticScore>=.3)status="observed";\n  else if(matched.length>=1&&semanticScore>=.12)status="partial";`
]]);

patch("app/lib/portugueseEngine.js",[[
  "relevant semantic evidence",
  `    const structuralAssessment=criterion=>{\n      const normalized=normalizePortugueseAnswer(responseText);`,
  `    const semanticCriteria=(item.rubric?.criteria||[]).filter(criterion=>!["lingua","correcao-linguistica","estrutura","coerencia"].includes(criterion.id));\n    const relevantAssessment=semanticCriteria.length\n      ?assessEvidence(responseText,...semanticCriteria.map(criterion=>criterion.label),item.referenceAnswer)\n      :null;\n    const relevantResponseWords=portugueseWordCount(relevantAssessment?.evidence||responseText);\n\n    const structuralAssessment=criterion=>{\n      const normalized=normalizePortugueseAnswer(responseText);`
],[
  "language uses relevant evidence",
  `      if(["lingua","correcao-linguistica"].includes(criterion.id)){\n        const status=words>=Math.max(20,min*.55)?"observed":words>=10?"partial":"not-observed";`,
  `      if(["lingua","correcao-linguistica"].includes(criterion.id)){\n        const status=relevantResponseWords>=Math.max(20,min*.55)?"observed":relevantResponseWords>=10?"partial":"not-observed";`
],[
  "content cap uses criterion evidence",
  `      if(criterion.id==="conteudo"&&Number.isFinite(min)&&min>0&&words<min){\n        const ratio=words/min;\n        const cap=ratio<.45?.45:ratio<.7?.62:.78;\n        aggregate={...aggregate,scoreRatio:Math.min(aggregate.scoreRatio,cap),status:aggregate.status==="observed"?"partial":aggregate.status};\n      }`,
  `      if(criterion.id==="conteudo"&&Number.isFinite(min)&&min>0){\n        const evidenceText=[...new Set(observations.flatMap(observation=>observation.studentEvidence||[]).filter(Boolean))].join(" ");\n        const evidenceWords=portugueseWordCount(evidenceText||responseText);\n        if(evidenceWords<min){\n          const ratio=evidenceWords/min;\n          const cap=ratio<.45?.45:ratio<.7?.62:.78;\n          aggregate={...aggregate,scoreRatio:Math.min(aggregate.scoreRatio,cap),status:aggregate.status==="observed"?"partial":aggregate.status};\n        }\n      }`
]]);

console.log("EVIDENCE RELEVANCE PATCH: GO");
