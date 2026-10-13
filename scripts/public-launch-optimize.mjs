import fs from "node:fs";

function edit(path,fn){
  const source=fs.readFileSync(path,"utf8"),next=fn(source);
  if(next===source)throw new Error(`${path}: nenhuma alteração aplicada`);
  fs.writeFileSync(path,next);
}

edit("app/components/chrome.js",source=>{
  const start=source.indexOf("function elementText(node){");
  const end=source.indexOf("export function StudentTop",start);
  if(start<0||end<0)throw new Error("chrome.js: bloco de menu não encontrado");
  const compact=`function augmentStudentMenu(children,go,s,subjectId){\n  if(subjectId!==\"physics-chemistry-a\"||!isValidElement(children))return children;\n  const parts=Children.toArray(children.props.children),index=parts.findIndex(child=>isValidElement(child)&&child.type===\"div\");\n  if(index<0)return children;\n  const body=parts[index],extras=[\n    <button key=\"core-apronso\" type=\"button\" onClick={()=>go(\"apronsoIntro\")}>Apronso e como funciona a app</button>,\n    isFriendsBeta(s)?<button key=\"core-beta\" type=\"button\" onClick={()=>go(\"friendsBetaInfo\")}>Informação do teste</button>:<button key=\"core-account\" type=\"button\" onClick={()=>go(\"account\")}>Conta e progresso</button>,\n    <button key=\"core-parent\" type=\"button\" onClick={()=>go(\"parent\")}>Área dos pais</button>\n  ];\n  parts[index]=cloneElement(body,body.props,[...Children.toArray(body.props.children),...extras]);\n  return cloneElement(children,children.props,parts);\n}\n`;
  let next=source.slice(0,start)+compact+source.slice(end);
  next=next.replace("menu=augmentStudentMenu(children,go,s);return","menu=augmentStudentMenu(children,go,s,subject.id);return");
  if(next===source)throw new Error("chrome.js: StudentTop não atualizado");
  return next;
});

for(const path of ["app/page.js","app/components/PortugueseSubject.js"]){
  edit(path,source=>source.replaceAll("Conta e progresso na cloud","Conta e progresso"));
}

console.log("✓ launch bundle/menu optimization applied");
