
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root=path.resolve(".");
const page=fs.readFileSync("app/page.js","utf8");
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));

const forbidden=[
  {pattern:/DATABASE_URL\s*=\s*["'][^"']+["']/,label:"DATABASE_URL real em código"},
  {pattern:/postgres(?:ql)?:\/\/[^ \n"']+:[^ \n"']+@/i,label:"credenciais PostgreSQL em código"},
  {pattern:/NEXT_PUBLIC_NEON_AUTH_URL\s*=\s*https?:\/\//,label:"env público hardcoded em JS"},
];

const scanFiles=[];
function walk(dir){
  for(const name of fs.readdirSync(dir)){
    if(["node_modules",".next",".git"].includes(name))continue;
    const full=path.join(dir,name);
    const st=fs.statSync(full);
    if(st.isDirectory())walk(full);
    else if(/\.(js|mjs|cjs|json|md|env|example)$/.test(name) || name===".env.example")scanFiles.push(full);
  }
}
walk(root);

for(const file of scanFiles){
  if(file.endsWith(".env.example"))continue;
  const txt=fs.readFileSync(file,"utf8");
  for(const f of forbidden){
    assert.ok(!f.pattern.test(txt),`${f.label}: ${path.relative(root,file)}`);
  }
}

assert.ok(!page.includes("MOTOR v3.2"),"Rótulo de motor antigo reapareceu na UI.");
assert.ok(page.includes("devView"),"Ferramentas internas deixaram de estar protegidas pelo modo dev.");
assert.ok(page.includes("PONTE COM PROFESSOR EXTERNO"),"Ponte de revisão externa desapareceu.");
assert.ok(page.includes("BETA PRIVADA · TESTE DE EXPERIÊNCIA"),"Entrada da beta de amigos desapareceu.");
assert.ok(page.includes("if(hydrated)saveLocalState(s)"),"Proteção de hidratação antes de persistir estado desapareceu.");
assert.equal(pkg.version,"4.2.0");

console.log(`✓ source hygiene: ${scanFiles.length} ficheiros verificados`);
