
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
assert.ok(page.includes("qual é a tua perspetiva neste teste?"),"Segmentação dos testers desapareceu.");
assert.ok(page.includes("RELATÓRIOS DOS TESTERS"),"Agregador de feedback externo desapareceu.");
assert.ok(page.includes("Pipeline matemático dos geradores"),"Painel de validação matemática desapareceu.");
assert.ok(page.includes("RITMO DIÁRIO"),"Cartão de engagement diário desapareceu.");
assert.ok(!page.includes("streak:Math.max(1,finalState.streak+1)"),"Streak voltou a incrementar por Missão em vez de por dia.");
assert.ok(page.includes("COMPETIÇÃO SEMANAL"),"Área de rankings desapareceu.");
assert.ok(page.includes("MISSÃO DE HOJE CONCLUÍDA"),"Regra visual de uma Missão por dia desapareceu.");
assert.ok(page.includes("missionCompletedToday(s)"),"Guard técnico de uma Missão por dia desapareceu.");
assert.ok(page.includes("Nunca entram no ranking: Domínio"),"Barreira de privacidade académica do ranking desapareceu.");
assert.ok(page.includes("A TUA MISSÃO DE HOJE"),"Modal automático da Missão de Hoje desapareceu.");
assert.ok(page.includes("dailyMissionPromptDecision"),"Lógica automática da Missão de Hoje desapareceu.");
assert.ok(page.includes("missionPlanForToday(s,dailyMissionPlan(s))"),"Missão diária deixou de usar a atribuição congelada.");
assert.ok(page.includes("MEMÓRIA PEDAGÓGICA · CICLO DE VIDA"),"UI do ciclo de vida da memória pedagógica desapareceu.");
assert.ok(page.includes("refreshLearningHypotheses"),"Refresh da memória pedagógica após evidência desapareceu.");
assert.ok(page.includes("Conflito detetado — nada foi sobrescrito"),"UI explícita de conflitos cloud desapareceu.");
assert.ok(page.includes("Guardar com controlo de revisão"),"Save cloud deixou de indicar controlo de revisão.");
assert.ok(page.includes("Combinar atividade"),"Resolução segura de conflito por combinação desapareceu.");
assert.ok(page.includes("FUNIL + RETENÇÃO"),"Painel de funil/retenção desapareceu.");
assert.ok(page.includes("recordAppOpen"),"Registo de abertura diária da app desapareceu.");
assert.ok(page.includes("first_mission_completed"),"Milestone de ativação pela primeira Missão desapareceu.");
assert.ok(page.includes("D1 real"),"Separação entre intenção de regresso e retenção real desapareceu.");
const contentSource=fs.readFileSync("app/data/content.js","utf8");
assert.ok(contentSource.includes("COVERAGE_V5_1_BANK"),"Banco original de cobertura v5.1 desapareceu.");
assert.ok(contentSource.includes('origin:"original_v5_1"'),"Marcação de origem original das questões v5.1 desapareceu.");
assert.ok(page.includes("ROTEIRO CONSERVADOR · v5.4"),"Painel conservador de revisão desapareceu.");
assert.ok(page.includes("Aprovação invalidada automaticamente"),"Aviso de aprovação editorial desatualizada desapareceu.");
assert.ok(page.includes("Fingerprint editorial"),"Fingerprint editorial deixou de estar visível no painel.");
assert.ok(page.includes("NOVA VERSÃO EDITORIAL"),"Editor de revisões de conteúdo desapareceu.");
assert.ok(page.includes("Comparação antes → depois"),"Diff editorial antes/depois desapareceu.");
assert.ok(page.includes("Aplicar como nova versão"),"Ação explícita de versionamento editorial desapareceu.");
assert.ok(page.includes("Pré-QA bloqueadas"),"Resumo de pré-QA desapareceu do painel de revisão.");
assert.ok(page.includes("Distribuição da resposta correta"),"Controlo de enviesamento da posição correta desapareceu.");
assert.ok(page.includes("Pré-QA limpo"),"Estado de pré-QA por questão desapareceu.");
assert.ok(page.includes("POLÍTICA HÍBRIDA · v5.5"),"Painel da política híbrida desapareceu.");
assert.ok(page.includes("Professor onde acrescenta julgamento. Máquina onde consegue provar."),"Princípio da validação híbrida desapareceu.");
assert.ok(page.includes("Exportar roteiro híbrido recomendado"),"Exportação do pack híbrido desapareceu.");
assert.ok(page.includes("Produção comercial:"),"Barreira entre beta híbrida e produção desapareceu.");
assert.ok(page.includes("if(hydrated)saveLocalState(s)"),"Proteção de hidratação antes de persistir estado desapareceu.");
assert.equal(pkg.version,"5.5.0");

console.log(`✓ source hygiene: ${scanFiles.length} ficheiros verificados`);
