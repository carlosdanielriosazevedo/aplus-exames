import assert from "node:assert/strict";
import {readdirSync,readFileSync} from "node:fs";
import path from "node:path";

const root=path.resolve(new URL("..",import.meta.url).pathname);
const scriptsDir=path.join(root,"scripts");
const scriptNames=readdirSync(scriptsDir).filter(name=>/\.(?:mjs|cjs|js)$/u.test(name));
const violations=[];

const writePattern=/\b(?:writeFileSync|writeFile|appendFileSync|appendFile|renameSync|copyFileSync)\b/u;
const textMatchPattern=/\.(?:replace|replaceAll|includes|indexOf|search|match)\s*\(/u;
const pageOrGlobalPattern=/(?:app[\\/]page\.js|app[\\/]globals\.css)/u;
const sourceTargetPattern=/(?:app|src|components|lib)[\\/][^"'`\n]+\.(?:js|jsx|ts|tsx|css)/u;

for(const name of scriptNames){
  if(name==="source-rewrite-policy-audit.mjs")continue;
  const full=path.join(scriptsDir,name);
  const source=readFileSync(full,"utf8");
  if(!writePattern.test(source))continue;

  if(pageOrGlobalPattern.test(source)){
    violations.push(`${name}: scripts não podem reescrever app/page.js ou app/globals.css`);
    continue;
  }

  if(sourceTargetPattern.test(source)&&textMatchPattern.test(source)){
    violations.push(`${name}: reescrita de ficheiro de código por correspondência de texto é proibida`);
  }
}

assert.equal(
  violations.length,
  0,
  `Política de arquitetura violada:\n- ${violations.join("\n- ")}`
);

console.log(`✓ source rewrite policy: ${scriptNames.length} scripts inspecionados · zero patches textuais sobre código versionado`);
