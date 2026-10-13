import fs from "node:fs";

function rewrite(path,changes){
  let source=fs.readFileSync(path,"utf8"),next=source;
  for(const [from,to] of changes){
    if(!next.includes(from))throw new Error(`${path}: padrão em falta: ${from}`);
    next=next.replaceAll(from,to);
  }
  if(next!==source)fs.writeFileSync(path,next);
}

rewrite("app/components/AccountCloud.js",[
  [">Password<input",">Palavra-passe<input"],
  ["CONTA <BrandName/> · CLOUD SEGURA","CONTA <BrandName/> · PROGRESSO ONLINE"],
  ["Progresso guardado com segurança na cloud","Progresso guardado online com segurança"],
  ["Cloud carregada · revisão","Progresso online carregado · revisão"]
]);

rewrite("app/components/PhysicsChemistrySubject.js",[
  ["Voltar à Home","Voltar ao menu inicial"]
]);

console.log("✓ Public launch copy codemod applied");
