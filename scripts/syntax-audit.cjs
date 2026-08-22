
const fs=require("fs");
const path=require("path");

let ts;
try{
  ts=require("typescript");
}catch(error){
  try{
    ts=require("/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript");
  }catch{
    console.error("TypeScript parser não disponível. Executa npm install.");
    process.exit(2);
  }
}

const ROOT=path.resolve(__dirname,"..");
const IGNORE=new Set(["node_modules",".next",".git"]);
const files=[];

function walk(dir){
  for(const name of fs.readdirSync(dir)){
    if(IGNORE.has(name))continue;
    const full=path.join(dir,name);
    const st=fs.statSync(full);
    if(st.isDirectory())walk(full);
    else if(/\.(js|mjs|cjs)$/.test(name))files.push(full);
  }
}
walk(ROOT);

const errors=[];
for(const file of files){
  const src=fs.readFileSync(file,"utf8");
  const isJsx=file.endsWith(".js") && src.includes("<");
  const result=ts.transpileModule(src,{
    fileName:file,
    reportDiagnostics:true,
    compilerOptions:{
      allowJs:true,
      checkJs:false,
      jsx:ts.JsxEmit.Preserve,
      target:ts.ScriptTarget.ES2022,
      module:ts.ModuleKind.ESNext,
      moduleResolution:ts.ModuleResolutionKind.Bundler
    }
  });

  for(const d of result.diagnostics||[]){
    if(d.category!==ts.DiagnosticCategory.Error)continue;
    const msg=ts.flattenDiagnosticMessageText(d.messageText,"\n");
    let loc="";
    if(d.file && typeof d.start==="number"){
      const pos=d.file.getLineAndCharacterOfPosition(d.start);
      loc=`:${pos.line+1}:${pos.character+1}`;
    }
    errors.push(`${path.relative(ROOT,file)}${loc} — ${msg}`);
  }
}

if(errors.length){
  console.error(`Syntax audit falhou com ${errors.length} erro(s):`);
  errors.forEach(x=>console.error(`- ${x}`));
  process.exit(1);
}

console.log(`✓ syntax audit: ${files.length} ficheiros JS/MJS/CJS analisados sem erros de parser`);
