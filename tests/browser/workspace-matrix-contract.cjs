const assert=require('node:assert/strict');
const widths=[320,360,390,759,761,1440];
const motions=['reduce','no-preference'];
const subjects=['math-a','portuguese','physics-chemistry-a'];
const slots=['hero','heading','title','label','copy','mascot'];
function compareBox(a,b,label,yOffset=0){
  assert.ok(a&&b,`${label}: missing box`);
  let max=0;
  for(const key of ['x','y','width','height']){
    const delta=Math.abs(a[key]-b[key]-(key==='y'?yOffset:0));
    assert.ok(Number.isFinite(delta)&&delta<=2,`${label}/${key}: delta ${delta} > 2 px`);
    max=Math.max(max,delta);
  }
  return max;
}
function validateMatrix(cases,{partial=false}={}){
  const comparisons=[];const coverage=[];
  for(const width of widths)for(const motion of motions){
    const group=cases.filter(c=>c.width===width&&c.reducedMotion===motion);
    if(partial&&!group.length)continue;
    for(const beta of [false,true])for(const xp of [1,123456]){
      const matching=group.filter(c=>c.beta===beta&&c.xp===xp);
      assert.equal(matching.length,1,`${width}/${motion}/${beta}/${xp}: exactly one raw case required`);
      const rows=matching[0].measurements;
      assert.equal(rows.length,6,'three subjects × two menus required');
      for(const subject of subjects)for(const tab of ['Aprender','Treinar']){
        assert.equal(rows.filter(r=>r.subject===subject&&r.tab===tab).length,1,`${subject}/${tab}: coverage`);
      }
      coverage.push({width,motion,beta,xp,streak:matching[0].streak,rows:rows.length});
    }
    const rows=group.flatMap(c=>c.measurements.map(r=>({...r,beta:c.beta,xp:c.xp})));
    const reference=rows[0];
    for(const row of rows){
      let maxTop=0,maxHero=0;
      for(let i=0;i<7;i++){
        if(i===5&&(!row.anchors[i]||!reference.anchors[i]))continue; // XP is deliberately absent in private beta.
        maxTop=Math.max(maxTop,compareBox(row.anchors[i],reference.anchors[i],`${width}/${motion}/${row.subject}/${row.tab}/top-${i}`));
      }
      const contextOffset=row.contextBand-reference.contextBand;
      for(const key of slots)maxHero=Math.max(maxHero,compareBox(row[key],reference[key],`${width}/${motion}/${row.subject}/${row.tab}/${key}`,contextOffset));
      comparisons.push({width,motion,subject:row.subject,tab:row.tab,beta:row.beta,xp:row.xp,
        reference:{subject:reference.subject,tab:reference.tab,beta:reference.beta,xp:reference.xp},
        maxTop,maxHero,rawHeroDeltaY:row.hero.y-reference.hero.y,contextBandDeltaY:contextOffset});
    }
  }
  assert.ok(cases.length,'raw cases required');
  return {status:'PASS',tolerancePx:2,partial,caseCount:cases.length,coverage,comparisons};
}
module.exports={validateMatrix,compareBox};
