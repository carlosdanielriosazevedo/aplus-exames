import fs from "node:fs";

function replaceExact(path,from,to,label){
  const source=fs.readFileSync(path,"utf8");
  const count=source.split(from).length-1;
  if(count!==1)throw new Error(`${label}: esperado 1 match em ${path}, encontrados ${count}`);
  fs.writeFileSync(path,source.replace(from,to));
}

replaceExact(
  "app/lib/portugueseEngine.js",
  `      let aggregate=aggregateCriterionAssessment(observations);\n      if(criterion.id==="conteudo"&&Number.isFinite(min)&&min>0&&words<min){\n        const ratio=words/min;\n        const cap=ratio<.45?.45:ratio<.7?.62:.78;\n        aggregate={...aggregate,scoreRatio:Math.min(aggregate.scoreRatio,cap),status:aggregate.status==="observed"?"partial":aggregate.status};\n      }\n      return {...criterion,...aggregate,observations,observable:true,autoAssessed:true};`,
  `      const aggregate=aggregateCriterionAssessment(observations);\n      return {...criterion,...aggregate,observations,observable:true,autoAssessed:true};`,
  "conteúdo depende da evidência e não do enchimento verbal"
);

replaceExact(
  "app/lib/physicsChemistryRubric.js",
  `    const observations=(criterion.observations||[]).map(observation=>{\n      const assessed=assessEvidence(text,observation.label,criterion.label,item.criteria?.[criterionIndex]);\n      return {...observation,status:assessed.status,confidence:assessed.confidence,scoreRatio:assessed.scoreRatio,semanticScore:assessed.semanticScore,contradictionDetected:!!assessed.contradictionDetected,ambiguityDetected:!!assessed.ambiguityDetected,studentEvidence:assessed.evidence?[assessed.evidence]:[],autoAssessed:true};\n    });`,
  `    const observations=(criterion.observations||[]).map(observation=>{\n      const assessed=assessEvidence(text,observation.label,criterion.label,item.criteria?.[criterionIndex]);\n      const normalizedText=text.normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").toLocaleLowerCase("pt-PT");\n      const directDetection=observation.id==="detection-indicator"&&(/\\bindicador\\b/u.test(normalizedText)||/curva\\s+de\\s+ph/u.test(normalizedText));\n      const resolved=directDetection?{...assessed,status:"observed",scoreRatio:1,confidence:Math.max(.88,assessed.confidence||0)}:assessed;\n      return {...observation,status:resolved.status,confidence:resolved.confidence,scoreRatio:resolved.scoreRatio,semanticScore:resolved.semanticScore,contradictionDetected:!!resolved.contradictionDetected,ambiguityDetected:!!resolved.ambiguityDetected,studentEvidence:resolved.evidence?[resolved.evidence]:[],autoAssessed:true};\n    });`,
  "deteção direta por indicador ou curva de pH"
);

console.log("FINAL CALIBRATION FIX: GO");
