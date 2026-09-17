import assert from "node:assert/strict";
import {readdirSync,readFileSync} from "node:fs";
import path from "node:path";

const root=path.resolve(new URL("..",import.meta.url).pathname);
const scriptsDir=path.join(root,"scripts");
const scriptNames=readdirSync(scriptsDir).filter(name=>/\.(?:mjs|cjs|js)$/u.test(name));
const violations=[];

const WRITE_FUNCTIONS=new Map([
  ["writeFileSync",0],
  ["writeFile",0],
  ["appendFileSync",0],
  ["appendFile",0],
  ["copyFileSync",1],
  ["copyFile",1],
  ["renameSync",1],
  ["rename",1]
]);
const SOURCE_EXT=/\.(?:js|jsx|ts|tsx|css)$/iu;
const SOURCE_ROOT=/(?:^|\/)(?:app|src|components|lib)\//u;
const EXACT_PROTECTED=new Set(["app/page.js","app/globals.css"]);
const TEXT_MATCH=/\.(?:replace|replaceAll|includes|indexOf|search|match)\s*\(/u;

function normalizeRepoPath(value){
  if(!value)return null;
  let normalized=String(value).replaceAll("\\","/");
  const rootNormalized=root.replaceAll("\\","/");
  if(normalized.startsWith(rootNormalized+"/"))normalized=normalized.slice(rootNormalized.length+1);
  normalized=path.posix.normalize(normalized);
  while(normalized.startsWith("../"))normalized=normalized.slice(3);
  return normalized.replace(/^\.\//u,"");
}

function scanArguments(source,openParen){
  const args=[];
  let current="";
  let depthParen=0,depthBracket=0,depthBrace=0;
  let quote=null,escaped=false;
  for(let i=openParen+1;i<source.length;i++){
    const ch=source[i];
    if(quote){
      current+=ch;
      if(escaped){escaped=false;continue}
      if(ch==="\\"){escaped=true;continue}
      if(ch===quote){quote=null}
      continue;
    }
    if(ch==='"'||ch==="'"||ch==='`'){quote=ch;current+=ch;continue}
    if(ch==="("){depthParen++;current+=ch;continue}
    if(ch===")"){
      if(depthParen===0&&depthBracket===0&&depthBrace===0){
        args.push(current.trim());
        return args;
      }
      depthParen--;current+=ch;continue;
    }
    if(ch==="["){depthBracket++;current+=ch;continue}
    if(ch==="]"){depthBracket--;current+=ch;continue}
    if(ch==="{"){depthBrace++;current+=ch;continue}
    if(ch==="}"){depthBrace--;current+=ch;continue}
    if(ch===","&&depthParen===0&&depthBracket===0&&depthBrace===0){args.push(current.trim());current="";continue}
    current+=ch;
  }
  return args;
}

function writeCalls(source){
  const calls=[];
  const re=/\b(writeFileSync|writeFile|appendFileSync|appendFile|copyFileSync|copyFile|renameSync|rename)\s*\(/gu;
  for(const match of source.matchAll(re)){
    const fn=match[1];
    const openParen=match.index+match[0].lastIndexOf("(");
    calls.push({fn,args:scanArguments(source,openParen)});
  }
  return calls;
}

function initializerFor(source,identifier){
  if(!/^[A-Za-z_$][\w$]*$/u.test(identifier))return null;
  const escaped=identifier.replace(/[.*+?^${}()|[\]\\]/gu,"\\$&");
  const declaration=new RegExp(`\\b(?:const|let|var)\\s+${escaped}\\s*=\\s*`,"u").exec(source);
  if(!declaration)return null;
  const start=declaration.index+declaration[0].length;
  let quote=null,escapedQuote=false,paren=0,bracket=0,brace=0;
  for(let i=start;i<source.length;i++){
    const ch=source[i];
    if(quote){
      if(escapedQuote){escapedQuote=false;continue}
      if(ch==="\\"){escapedQuote=true;continue}
      if(ch===quote)quote=null;
      continue;
    }
    if(ch==='"'||ch==="'"||ch==='`'){quote=ch;continue}
    if(ch==="(")paren++;
    else if(ch===")")paren--;
    else if(ch==="[")bracket++;
    else if(ch==="]")bracket--;
    else if(ch==="{")brace++;
    else if(ch==="}")brace--;
    else if((ch===";"||ch==="\n")&&paren===0&&bracket===0&&brace===0)return source.slice(start,i).trim();
  }
  return source.slice(start).trim();
}

function stringLiterals(expr){
  const values=[];
  for(const match of expr.matchAll(/(["'])(.*?)\1/gu))values.push(match[2]);
  return values;
}

function resolveTarget(expr,source,seen=new Set()){
  if(!expr)return null;
  const trimmed=expr.trim();
  if(/^[A-Za-z_$][\w$]*$/u.test(trimmed)){
    if(seen.has(trimmed))return null;
    seen.add(trimmed);
    const init=initializerFor(source,trimmed);
    return init?resolveTarget(init,source,seen):null;
  }

  const direct=/^(["'])(.*?)\1$/u.exec(trimmed);
  if(direct)return normalizeRepoPath(direct[2]);

  const urlMatch=/new\s+URL\s*\(\s*(["'])(.*?)\1\s*,\s*import\.meta\.url\s*\)/u.exec(trimmed);
  if(urlMatch){
    const absolute=path.resolve(scriptsDir,urlMatch[2]);
    return normalizeRepoPath(absolute);
  }

  if(/\bpath\.(?:join|resolve)\s*\(/u.test(trimmed)){
    const parts=stringLiterals(trimmed);
    if(!parts.length)return null;
    const combined=parts.join("/");
    return normalizeRepoPath(combined);
  }

  return null;
}

function contentUsesTextMatching(expr,source,seen=new Set()){
  if(!expr)return false;
  if(TEXT_MATCH.test(expr))return true;
  const trimmed=expr.trim();
  if(!/^[A-Za-z_$][\w$]*$/u.test(trimmed)||seen.has(trimmed))return false;
  seen.add(trimmed);

  const init=initializerFor(source,trimmed);
  if(init&&contentUsesTextMatching(init,source,seen))return true;

  const escaped=trimmed.replace(/[.*+?^${}()|[\]\\]/gu,"\\$&");
  const reassignment=new RegExp(`\\b${escaped}\\s*=\\s*${escaped}\\s*\\.(?:replace|replaceAll|includes|indexOf|search|match)\\s*\\(`,"u");
  return reassignment.test(source);
}

function isSourceTarget(target){
  return !!target&&SOURCE_EXT.test(target)&&SOURCE_ROOT.test(target);
}

for(const name of scriptNames){
  if(name==="source-rewrite-policy-audit.mjs")continue;
  const full=path.join(scriptsDir,name);
  const source=readFileSync(full,"utf8");

  for(const call of writeCalls(source)){
    const targetIndex=WRITE_FUNCTIONS.get(call.fn);
    const targetExpr=call.args[targetIndex];
    const target=resolveTarget(targetExpr,source);
    if(!target)continue;

    if(EXACT_PROTECTED.has(target)){
      violations.push(`${name}: ${call.fn} escreve diretamente em ${target}`);
      continue;
    }

    if(!isSourceTarget(target))continue;

    // write/append recebem o conteúdo no argumento seguinte ao caminho. Para copy/rename
    // não existe transformação textual do conteúdo, pelo que só a regra dos alvos
    // absolutamente protegidos acima se aplica.
    if(!/^(?:writeFileSync|writeFile|appendFileSync|appendFile)$/u.test(call.fn))continue;
    const contentExpr=call.args[targetIndex+1];
    if(contentUsesTextMatching(contentExpr,source)){
      violations.push(`${name}: ${call.fn} reescreve ${target} a partir de correspondência textual`);
    }
  }
}

assert.equal(
  violations.length,
  0,
  `Política de arquitetura violada:\n- ${violations.join("\n- ")}`
);

console.log(`✓ source rewrite policy: ${scriptNames.length} scripts inspecionados · alvos de escrita analisados por argumento · zero patches textuais sobre código versionado`);
