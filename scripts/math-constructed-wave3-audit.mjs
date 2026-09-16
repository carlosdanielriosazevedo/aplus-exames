import assert from "node:assert/strict";
import {CONSTRUCTED_RESPONSE_BANK,gradeResponse} from "../app/lib/constructedResponse.js";

const byId=id=>{
  const question=CONSTRUCTED_RESPONSE_BANK.find(row=>row.id===id);
  assert.ok(question,`${id}: item da terceira vaga em falta.`);
  return question;
};

const cases=[
  ["CRV2-10GA-LG-STEPS-1",{dx:"3",dy:"4",radius:"5",equation:"(x-2)^2+(y+1)^2=25"}],
  ["CRV2-11CONT-PERM-STEPS-1",{block:"A e B formam um bloco.",objects:"4",orders:"4!",internal:"2",total:"48"}],
  ["CRV2-11TRIG-MOD-STEPS-1",{ratio:"A razão adequada é a tangente.",model:"tan(45)=h/20",value:"1",height:"20"}],
  ["CRV2-12CPLX-POW-STEPS-1",{modulus:"8",argument:"pi/2",trig:"z^3=8(cos(pi/2)+i sin(pi/2))",algebraic:"8i"}],
  ["CRV2-12PROB-COND-STEPS-1",{events:"Dos 18 que praticam desporto, 6 também estudam música.",formula:"P(M|D)=6/18",fraction:"6/18",result:"1/3"}],
  ["CRV2-12INT-BARROW-STEPS-1",{primitive:"F(x)=x^3+x",barrow:"F(2)-F(0)",values:"10-0",result:"10"}]
];

for(const [id,steps] of cases){
  const grade=gradeResponse(byId(id),{steps});
  assert.equal(grade.points,35,`${id}: a resposta de referência deve totalizar 35 pontos.`);
  assert.equal(grade.correct,true,`${id}: a resposta de referência deve ser aceite.`);
}

const conditioned=byId("CRV2-12PROB-COND-STEPS-1");
const wrongDenominator=gradeResponse(conditioned,{steps:{events:"Há 30 alunos.",formula:"P(M|D)=6/30",fraction:"6/30",result:"1/5"}});
assert.equal(wrongDenominator.correct,false);
assert.equal(wrongDenominator.points,0,"Usar o universo não condicionado não pode receber pontos por coincidência parcial.");

console.log("✓ third constructed wave: geometria, contagem, trigonometria, complexos, probabilidade condicionada e Barrow validados");
