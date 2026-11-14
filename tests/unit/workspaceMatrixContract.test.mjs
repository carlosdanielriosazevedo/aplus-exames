import {test,expect} from 'vitest';
import {createRequire} from 'node:module';
const {validateMatrix,compareBox}=createRequire(import.meta.url)('../browser/workspace-matrix-contract.cjs');
function fixtures(){
  return [320,360,390,759,761,1440].flatMap(width=>['reduce','no-preference'].flatMap(reducedMotion=>[false,true].flatMap(beta=>[1,123456].map(xp=>{
    const contextBand=beta?60:0;
    const box={x:16,y:25,width:100,height:42};
    return {width,reducedMotion,beta,xp,streak:xp===1?1:365,measurements:['math-a','portuguese','physics-chemistry-a'].flatMap(subject=>['Aprender','Treinar'].map(tab=>({subject,tab,contextBand,
      anchors:Array.from({length:8},(_,i)=>i===5&&beta?null:{...box}),
      ...Object.fromEntries(['hero','heading','title','label','copy','mascot'].map(key=>[key,{...box,y:150+contextBand}]))
    })))};
  }))));
}
test('accepts the complete matrix and records the contextual beta offset explicitly',()=>{
  const result=validateMatrix(fixtures());
  expect(result.coverage).toHaveLength(48);expect(result.comparisons).toHaveLength(288);
  expect(result.comparisons.find(row=>row.beta)).toMatchObject({rawHeroDeltaY:60,contextBandDeltaY:60,maxTop:0,maxHero:0});
});
test('rejects an absent private state rather than claiming cross-state coverage',()=>{
  const cases=fixtures();cases.pop();expect(()=>validateMatrix(cases)).toThrow('exactly one raw case required');
});
test('rejects a duplicate subject/menu even with the correct row count',()=>{
  const cases=fixtures();cases[0].measurements[5]={...cases[0].measurements[0]};
  expect(()=>validateMatrix(cases)).toThrow('coverage');
});
test('rejects a 3 px counter/menu shift between short and long XP',()=>{
  const cases=fixtures();cases[1].measurements[0].anchors[6].x+=3;
  expect(()=>validateMatrix(cases)).toThrow('delta 3 > 2 px');
});
test('does not let the contextual beta allowance hide an unrelated hero shift',()=>{
  const cases=fixtures();cases[2].measurements[0].hero.y+=3;
  expect(()=>validateMatrix(cases)).toThrow('delta 3 > 2 px');
});
test('keeps the maximum tolerance at 2 px, including fractional differences',()=>{
  const box={x:0,y:0,width:10,height:10};
  expect(compareBox({...box,x:2},box,'boundary')).toBe(2);
  expect(()=>compareBox({...box,x:2.001},box,'outside')).toThrow();
});
