
import assert from "node:assert/strict";
import {
  TAXONOMY,MICROCOMPETENCIES,QUESTION_BANK
} from "../app/data/content.js";
import {betaContentReadiness,runContentChecks,contentRevisionFingerprint} from "../app/lib/quality.js";

const norm=x=>String(x).replace(/\s+/g,"").replaceAll("−","-");

const expected={
  "CV51-11CD-TV-1":()=>`${((3**2+2*3)-(1**2+2*1))/(3-1)} m/s`,
  "CV51-11CD-TV-2":()=>String(6*2),
  "CV51-11CD-OPT-1":()=>String(5*(10-5)),
  "CV51-11CD-OPT-2":()=>String(6/2),

  "CV51-11FUN-TR-1":()=>"3 unidades para a direita",
  "CV51-11FUN-TR-2":()=>"Translada-se 2 unidades para cima",
  "CV51-11FUN-MOD-1":()=>"C(x)=3+0,8x",
  "CV51-11FUN-MOD-2":()=>"V(t)=100−4t",
  "CV51-11FUN-IG-1":()=>"x=1 corresponde a um máximo local",
  "CV51-11FUN-IG-2":()=>"f(−2)=0",

  "CV51-12FCD-COMP-1":()=>String((2*2+1)**2),
  "CV51-12FCD-COMP-2":()=>"x≥3",
  "CV51-12FCD-RC-1":()=>"12(3x−1)³",
  "CV51-12FCD-RC-2":()=>"1/√(2x+5)",
  "CV51-12FCD-APL-1":()=>`${2*2*2}π`,
  "CV51-12FCD-APL-2":()=>String(4*1*(1**2+1)),

  "CV51-12PROB-LAP-1":()=>"1/2",
  "CV51-12PROB-LAP-2":()=>`${6/2}/${20/2}`, // 3/10
  "CV51-12PROB-MIX-1":()=>String(0.3/0.6).replace(".",","),
  "CV51-12PROB-MIX-2":()=>"3/10",

  "CV51-12CPLX-MA-1":()=>String(Math.hypot(-3,4)),
  "CV51-12CPLX-MA-2":()=>"2π/3",
  "CV51-12CPLX-FT-1":()=>"√2(cos(π/4)+i sin(π/4))",
  "CV51-12CPLX-FT-2":()=>"cos(3π/2)+i sin(3π/2)",

  "CV51-12INT-ID-1":()=>String(2**3-0**3),
  "CV51-12INT-ID-2":()=>String(10-4),
  "CV51-12INT-AREA-1":()=>String(2**2),
  "CV51-12INT-AREA-2":()=>"32/3",

  "CV51-10GA-VET-2":()=>`(${2+3},${-1+4})`,
  "CV51-11CONT-PM-2":()=>String(4*3),
  "CV51-11TRIG-EQ-2":()=>"0, π e 2π",
  "CV51-12INT-PRIM-2":()=>"x³+2x",

  "CV51-10ELE-VOT-1":()=>"A",
  "CV51-10ELE-PART-1":()=>`${600*(3/(1+2+3))} €`,
  "CV51-10ELE-INT-1":()=>"X vence por 5 pontos",
  "CV51-10FIN-JUR-1":()=>`${1000*0.04} €`,
  "CV51-10FIN-CAP-1":()=>`${Math.round(1000*(1.1**2))} €`,
  "CV51-10FIN-MOD-1":()=>"C(n)=800·1,05ⁿ",
  "CV51-10EST-REP-1":()=>"Diagrama de barras",
  "CV51-10EST-MED-1":()=>String((4+6+8+10)/4),
  "CV51-10GS-PROP-1":()=>String(Math.sqrt(3**2+4**2)),
  "CV51-10GS-RP-1":()=>`${Math.sqrt(5**2-3**2)} m`,
  "CV51-11PE-PE-1":()=>String(1*3+2*(-1)),
  "CV51-11PE-AG-1":()=>"0",
  "CV51-11SUC-PROG-1":()=>String(5+(4-1)*3),
  "CV51-11SUC-COMP-1":()=>"aproxima-se de 0",
  "CV51-12RAE-APR-1":()=>"[1,2]",
  "CV51-12RAE-VAL-1":()=>"1,414² e comparar com 2",
  "CV51-12IE-EST-1":()=>String(120/200).replace(".",","),
  "CV51-12IE-INF-1":()=>"A amostra fornece evidência para estimar a preferência na população, com incerteza",
  "CV51-12MAT-REP-1":()=>"3×2",
  "CV51-12MAT-APL-1":()=>`${3*2+5*4} €`
};

const rows=QUESTION_BANK.filter(q=>q.origin==="original_v5_1");
assert.equal(rows.length,52,"A v5.1 deve adicionar exatamente 52 questões originais.");
assert.equal(Object.keys(expected).length,52);

for(const q of rows){
  assert.ok(expected[q.id],`Sem oráculo independente para ${q.id}`);
  assert.equal(q.reviewStatus,"prototype",`${q.id} não pode saltar revisão por professor.`);
  assert.ok(q.contexts.includes("mission"),`${q.id} sem mission.`);
  assert.ok(q.contexts.includes("training"),`${q.id} sem training.`);
  assert.ok(q.contexts.includes("exam"),`${q.id} sem exam.`);
  assert.ok(q.microcompetencyId,`${q.id} sem microcompetencyId.`);
  assert.equal(q.o.length,4,`${q.id} sem 4 opções.`);
  assert.equal(new Set(q.o).size,4,`${q.id} tem opções duplicadas.`);
  assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<4,`${q.id} índice correto inválido.`);

  const calculated=expected[q.id]();
  const actual=q.o[q.a];
  assert.equal(norm(actual),norm(calculated),`${q.id}: opção correta diverge do oráculo (${calculated} vs ${actual}).`);
}

assert.equal(new Set(rows.map(q=>q.id)).size,rows.length,"IDs v5.1 duplicados.");
assert.equal(new Set(rows.map(q=>q.signature)).size,rows.length,"Assinaturas v5.1 duplicadas.");

// Cobertura estrutural dos 42 focos críticos: todos passam a ter pelo menos
// duas assinaturas independentes disponíveis para Mission.
const critical=[];
for(const t of TAXONOMY.filter(t=>t.relevance>=4)){
  for(const mc of t.microcompetencies||[]){
    const mission=QUESTION_BANK.filter(q=>
      q.microcompetencyId===mc.id && q.contexts?.includes("mission")
    );
    const signatures=new Set(mission.map(q=>q.signature||q.id));
    critical.push({id:mc.id,count:signatures.size});
  }
}
const gaps=critical.filter(x=>x.count<2);
assert.deepEqual(gaps,[],"Ainda existem focos críticos com menos de 2 assinaturas.");

// Toda a taxonomia passa a ter pelo menos uma questão, e todos os temas passam
// a disponibilizar Treino Livre sem recorrer a conteúdo externo.
const uncoveredMicro=MICROCOMPETENCIES.filter(mc=>
  !QUESTION_BANK.some(q=>q.microcompetencyId===mc.id)
);
assert.deepEqual(uncoveredMicro,[],"Ainda existem microcompetências sem qualquer questão.");

const themesWithoutTraining=TAXONOMY.filter(t=>
  !QUESTION_BANK.some(q=>q.themeId===t.id&&q.contexts?.includes("training"))
);
assert.deepEqual(themesWithoutTraining,[],"Ainda existem temas sem caminho de Treino Livre.");

// Se todo o corpus fosse formalmente revisto, a cobertura atual já deve conseguir
// obter a pontuação estrutural máxima. Isto NÃO altera o readiness real atual.
const allReviewed=Object.fromEntries(QUESTION_BANK.map(q=>[
  q.id,{
    status:"reviewed",version:1,reviewer:"coverage-audit",
    reviewedFingerprint:contentRevisionFingerprint(q)
  }
]));
const full=betaContentReadiness(allReviewed,[]);
assert.equal(full.score,100,"Corpus totalmente revisto já deveria atingir 100% de readiness estrutural.");
assert.equal(full.missions.ready,full.missions.total);
assert.equal(full.canClosedBeta,true);

// O banco real continua sem falsas aprovações.
const actual=betaContentReadiness({},[]);
assert.equal(actual.totalReviewed,0);
assert.equal(actual.canClosedBeta,false);

const structuralErrors=runContentChecks().filter(x=>x.severity==="error");
assert.equal(structuralErrors.length,0,"Novas questões introduziram erros estruturais.");

console.log(`✓ content coverage v5.1: ${rows.length} originais verificadas · 69/69 microcompetências cobertas · ${critical.length}/${critical.length} focos críticos com ≥2 assinaturas · corpus totalmente revisto = ${full.score}%`);
