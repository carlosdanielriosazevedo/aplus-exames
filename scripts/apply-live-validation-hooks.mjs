import fs from "node:fs";

function replaceExact(path,from,to,label){
  const source=fs.readFileSync(path,"utf8");
  const count=source.split(from).length-1;
  if(count!==1)throw new Error(`${label}: esperado 1 match em ${path}, encontrados ${count}`);
  fs.writeFileSync(path,source.replace(from,to));
}

replaceExact(
  "app/components/PortugueseSubject.js",
  'import {isFriendsBeta} from "../lib/friendsBeta";',
  'import {isFriendsBeta} from "../lib/friendsBeta";\nimport {capturePortugueseValidationCase} from "../lib/graderValidationCapture";',
  "import português"
);
replaceExact(
  "app/components/PortugueseSubject.js",
  '    const nextFeedback=gradePortugueseResponse(item,answer);\n    setFeedback(nextFeedback);',
  '    const nextFeedback=gradePortugueseResponse(item,answer);\n    capturePortugueseValidationCase({item,response:answer,result:nextFeedback});\n    setFeedback(nextFeedback);',
  "captura português"
);
replaceExact(
  "app/components/PortugueseSubject.js",
  'As respostas objetivas dão uma indicação inicial. As respostas abertas permanecem separadas e dependem da grelha de autoavaliação; não são transformadas automaticamente numa nota.',
  'As respostas objetivas dão uma indicação inicial. As respostas abertas são avaliadas automaticamente por critérios; quando a app não tem evidência suficiente, mantém o resultado provisório em vez de fingir certeza.',
  "copy diagnóstico português"
);
replaceExact(
  "app/components/PortugueseSubject.js",
  '{row.pending>0&&<small>{row.pending} resposta(s) aberta(s) aguardam autoavaliação</small>}',
  '{row.pending>0&&<small>{row.pending} resposta(s) aberta(s) com avaliação provisória ou por confirmar</small>}',
  "copy pendentes português"
);

replaceExact(
  "app/page.js",
  'import {\n  responseType,isConstructedResponse,isResponseAnswered,completionFilledCount,\n  expectedResponseLabel,studentResponseLabel,examScoreLabel,stepFeedback\n} from "./lib/constructedResponseView";',
  'import {\n  responseType,isConstructedResponse,isResponseAnswered,completionFilledCount,\n  expectedResponseLabel,studentResponseLabel,examScoreLabel,stepFeedback\n} from "./lib/constructedResponseView";\nimport {captureMathematicsValidationCase} from "./lib/graderValidationCapture";',
  "import matemática"
);
replaceExact(
  "app/page.js",
  '  async function submitAnswer(){if(!fb&&isResponseAnswered(current,sel))setFb(await gradeMathResponse(current,sel))}',
  '  async function submitAnswer(){\n    if(!fb&&isResponseAnswered(current,sel)){\n      const result=await gradeMathResponse(current,sel);\n      captureMathematicsValidationCase({item:current,response:sel,result});\n      setFb(result);\n    }\n  }',
  "captura matemática missão"
);
replaceExact(
  "app/page.js",
  '  async function submitAnswer(){if(!fb&&isResponseAnswered(q,sel))setFb(await gradeMathResponse(q,sel))}',
  '  async function submitAnswer(){\n    if(!fb&&isResponseAnswered(q,sel)){\n      const result=await gradeMathResponse(q,sel);\n      captureMathematicsValidationCase({item:q,response:sel,result});\n      setFb(result);\n    }\n  }',
  "captura matemática treino"
);

console.log("LIVE VALIDATION HOOKS PATCHED: GO");
