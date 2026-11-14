import {test,expect} from 'vitest';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
const {validateMatrix,compareBox,compareCounters}=createRequire(import.meta.url)('../browser/workspace-matrix-contract.cjs');
function fixtures(){
  return [320,360,390,759,761,1440].flatMap(width=>['reduce','no-preference'].flatMap(reducedMotion=>[false,true].flatMap(beta=>[1,123456].map(xp=>{
    const contextBand=beta?60:0;
    const box={x:16,y:25,width:100,height:42};
    const counter=()=>({button:{...box},icon:{...box},iconGlyph:{...box},value:{...box,width:xp===1?7:42},valueText:{...box,width:xp===1?7:42},problems:[]});
    return {width,reducedMotion,beta,xp,streak:xp===1?1:365,measurements:['math-a','portuguese','physics-chemistry-a'].flatMap(subject=>['Aprender','Treinar'].map(tab=>({subject,tab,contextBand,
      anchors:Array.from({length:8},(_,i)=>i===5&&beta?null:{...box}),
      counters:{streak:counter(),xp:beta?null:counter()},
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
test('rejects an internal icon shift even when its button and fixed cell stay still',()=>{
  const cases=fixtures();cases[1].measurements[0].counters.xp.iconGlyph.x+=3;
  expect(()=>validateMatrix(cases)).toThrow('iconGlyph/x: delta 3 > 2 px');
});
test('allows numeric width to grow but rejects a moving number origin',()=>{
  const cases=fixtures();expect(()=>validateMatrix(cases)).not.toThrow();
  cases[1].measurements[0].counters.xp.valueText.x+=3;
  expect(()=>validateMatrix(cases)).toThrow('valueText/x: delta 3 > 2 px');
});
test('requires internal measurements and the correct hidden-XP state',()=>{
  const cases=fixtures();delete cases[0].measurements[0].counters;
  expect(()=>validateMatrix(cases)).toThrow('Streak measurements required');
  const hidden=fixtures();hidden[2].measurements[0].counters.xp=hidden[0].measurements[0].counters.xp;
  expect(()=>validateMatrix(hidden)).toThrow('XP measurements must match beta visibility');
});
test('rejects clipping or overlap reported in an early counter frame',()=>{
  const a=fixtures()[0].measurements[0].counters,b=structuredClone(a);
  b.streak.problems.push('icon overlaps number');
  expect(()=>compareCounters(b,a,'early frame')).toThrow('clipping, overflow or overlap');
});
test('detects the audited defect in real measurements from the previous HEAD',()=>{
  const before=JSON.parse(readFileSync(new URL('../../docs/measurements/pr-473-counter-before.json',import.meta.url),'utf8'));
  for(const width of [320,360,390,759,761,1440])for(const subject of ['math-a','portuguese','physics-chemistry-a'])for(const tab of ['Aprender','Treinar']){
    const rows=before.rows.filter(row=>row.width===width&&row.subject===subject&&row.tab===tab);
    expect(rows).toHaveLength(2);
    expect(()=>compareCounters(rows[0].counters,rows[1].counters,`${width}/${subject}/${tab}`)).toThrow('> 2 px');
  }
});
