export function classifyPortugueseFullExamResults(exam,results=[]){
  if(!exam)return null;
  const resultById=new Map(results.map(result=>[result.id||result.itemId,result]));
  const mandatory=exam.items.filter(item=>item.classificationMode==="mandatory");
  const optional=exam.items.filter(item=>item.classificationMode==="best-of-five");
  const optionalBestCount=exam.scoringPolicy?.optionalBestCount??3;
  const rankedOptional=optional.map((item,index)=>{
    const result=resultById.get(item.id)||{};
    const points=Number.isFinite(result.points)?result.points:0;
    return {item,index,points,result};
  }).sort((a,b)=>b.points-a.points||a.index-b.index);
  const selectedOptional=rankedOptional.slice(0,optionalBestCount);
  const selectedIds=new Set(selectedOptional.map(row=>row.item.id));
  const answeredOptionalCount=optional.filter(item=>(resultById.get(item.id)||{}).status!=="unanswered").length;
  const selectedItems=[...mandatory,...selectedOptional.map(row=>row.item)];
  const knownPoints=selectedItems.reduce((sum,item)=>{
    const result=resultById.get(item.id)||{};
    return sum+(Number.isFinite(result.points)?result.points:0);
  },0);
  const pendingItems=selectedItems.filter(item=>!Number.isFinite((resultById.get(item.id)||{}).points));
  return {
    mandatoryItemIds:mandatory.map(item=>item.id),
    optionalItemIds:optional.map(item=>item.id),
    selectedOptionalItemIds:optional.filter(item=>selectedIds.has(item.id)).map(item=>item.id),
    excludedOptionalItemIds:optional.filter(item=>!selectedIds.has(item.id)).map(item=>item.id),
    answeredOptionalCount,
    knownPoints,
    pendingItemIds:pendingItems.map(item=>item.id),
    maxPoints:exam.maxPoints
  };
}
