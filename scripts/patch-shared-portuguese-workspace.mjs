import {readFileSync,writeFileSync} from "node:fs";

const pagePath="app/page.js";
let page=readFileSync(pagePath,"utf8");
const replacements=[
  ['    }else if(preview==="portuguese"){\n      setScreen("portugueseLab");','    }else if(preview==="portuguese"){\n      recoveredState=normalizeSubjectWorkspace({...recoveredState,selectedSubjectIds:[...(recoveredState.selectedSubjectIds||[]),"portuguese"],activeSubjectId:"portuguese"});\n      setS(recoveredState);\n      setScreen("home");'],
  ['    }else if(recoveredState.activeSubjectId==="portuguese"){\n      setScreen("portugueseLab");\n    }else setScreen(recoveredState.diagnosticDone?"home":"welcome");','    }else setScreen(recoveredState.diagnosticDone?"home":"welcome");']
];
for(const [from,to] of replacements){
  if(!page.includes(from))throw new Error(`page.js migration anchor missing: ${from.slice(0,80)}`);
  page=page.replace(from,to);
}
writeFileSync(pagePath,page);

const labPath="app/components/PortugueseLabLazy.js";
let lab=readFileSync(labPath,"utf8");
const labReplacements=[
  ['<div className="portugueseSharedHeading"><p className="eyebrow">ESPAÇO DE ESTUDO · PORTUGUÊS</p><h1>{view==="train"?"Treinar Português":view==="exams"?"Mini-exames de Português":view==="progress"?"Progresso de Português":"Plano de Português"}</h1><p className="muted">A navegação, topo e posição das ações são os mesmos da Matemática A. Só o conteúdo muda.</p></div>',''],
  ['<div className="portugueseLabHead"><span>Aa</span><div><p className="eyebrow">PILOTO CONTROLADO</p><h1>Português · Prova 639</h1></div></div>','<div className="portugueseLabHead"><span>Aa</span><div><p className="eyebrow">PORTUGUÊS</p><h1>Português · Prova 639</h1></div></div>'],
  ['<div className="notice warning"><b>Piloto controlado — ainda não conta para o plano académico</b><span>Podes testar diagnóstico, missões e correção assistida com o conteúdo atual. O resultado é provisório e não altera o teu nível de Matemática A.</span></div>',''],
  ['<div className="notice"><b>300 itens disponíveis · publicação geral ainda bloqueada</b><span>Os 120 itens permitem testar os fluxos; a base atual já tem dimensão suficiente para o piloto controlado. O que falta fechar é a calibração de dificuldade, a consistência editorial entre competências e a validação da correção aberta com respostas reais de alunos.</span></div>','']
];
for(const [from,to] of labReplacements){
  if(lab.includes(from))lab=lab.replace(from,to);
}
lab=lab.replace('<div className="progressMascot" aria-hidden="true">🦉</div>','<div className="progressMascot"><Apronso expression="happy" size={108}/></div>');
writeFileSync(labPath,lab);
