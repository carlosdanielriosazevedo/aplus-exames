import {gradePortugueseResponse} from "../app/lib/portugueseEngine.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";

const ptItem={
  id:"AUDIT-PT-OPEN",responseType:"restricted-response",maxPoints:13,
  gradingMode:"rubric-assisted-provisional",
  wordLimit:{min:20,max:80},
  referenceAnswer:"A personificação do relógio reforça a passagem inevitável do tempo.",
  rubric:{criteria:[
    {id:"conteudo",label:"Relaciona a personificação do relógio com a passagem inevitável do tempo.",points:10,observations:[
      {id:"conteudo-1",label:"Identifica a personificação do relógio."},
      {id:"conteudo-2",label:"Relaciona a repetição com a passagem inevitável do tempo."}
    ]},
    {id:"lingua",label:"Escreve com correção linguística suficiente.",points:3,observations:[]}
  ]}
};

const ptGood=gradePortugueseResponse(ptItem,"O relógio é personificado como uma presença humana e insistente. A repetição dos segundos mostra que o tempo continua a passar de forma inevitável, apesar da vontade das personagens.");
const ptWeak=gradePortugueseResponse(ptItem,"O relógio aparece no texto e a noite é silenciosa.");

const fqItem={
  id:"FQA-R-EQ-01",responseType:"restricted-response",maxPoints:10,
  gradingMode:"rubric-review",
  criteria:[
    "Relaciona o aumento de temperatura com o favorecimento do sentido endotérmico.",
    "Distingue alteração da composição de equilíbrio de alteração da rapidez.",
    "Explica que o catalisador acelera os dois sentidos sem alterar Kc nem a composição de equilíbrio."
  ]
};
const fqGood=gradePhysicsChemistryResponse(fqItem,"Num equilíbrio exotérmico, aumentar a temperatura favorece o sentido endotérmico e altera a composição de equilíbrio. Um catalisador acelera os dois sentidos, mas não altera Kc nem a composição final.");
const fqWeak=gradePhysicsChemistryResponse(fqItem,"A temperatura e o catalisador afetam a reação.");

const checks=[
  ["Portuguese open response is auto-assessed",ptGood.status==="auto-assessed-provisional"&&ptGood.rubricCompleted],
  ["Portuguese returns provisional points",Number.isFinite(ptGood.provisionalPoints)&&ptGood.provisionalPoints>0],
  ["Portuguese stronger answer scores above weak answer",(ptGood.provisionalPoints||0)>(ptWeak.provisionalPoints||0)],
  ["FQ A open response is auto-assessed",fqGood.status==="auto-assessed-provisional"&&fqGood.rubricCompleted],
  ["FQ A returns provisional points",Number.isFinite(fqGood.provisionalPoints)&&fqGood.provisionalPoints>0],
  ["FQ A stronger answer scores above weak answer",(fqGood.provisionalPoints||0)>(fqWeak.provisionalPoints||0)]
];

const failed=checks.filter(([,ok])=>!ok);
for(const [label,ok] of checks)console.log(`${ok?"✓":"✗"} ${label}`);
if(failed.length){
  console.error("\nAutomatic open-response audit failed: "+failed.map(([label])=>label).join(", "));
  process.exit(1);
}
console.log("\nAutomatic open-response audit passed.");
