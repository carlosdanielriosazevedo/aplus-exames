export function portuguesePassageId(item){
  const id=String(item?.passageId||"").trim();
  return id||null;
}

export function validatePortugueseSharedPassages(items){
  const groups=new Map();
  for(const item of items||[]){
    const passageId=portuguesePassageId(item);
    if(!passageId)continue;
    const passageText=String(item.passageText||"").trim();
    if(!passageText)throw new Error(`${item.id}: passageId exige passageText.`);
    if(!groups.has(passageId))groups.set(passageId,{text:passageText,title:String(item.passageTitle||"").trim(),items:[]});
    const group=groups.get(passageId);
    if(group.text!==passageText)throw new Error(`${passageId}: itens do mesmo texto partilhado têm passageText diferente.`);
    if(group.title!==String(item.passageTitle||"").trim())throw new Error(`${passageId}: itens do mesmo texto partilhado têm passageTitle diferente.`);
    group.items.push(item);
  }
  return groups;
}

export function buildPortugueseExamBlocks(items){
  const source=items||[];
  const groups=validatePortugueseSharedPassages(source);
  const emitted=new Set();
  const blocks=[];

  for(const item of source){
    const passageId=portuguesePassageId(item);
    if(!passageId){
      blocks.push({type:"single-item",key:`item:${item.id}`,itemIds:[item.id],items:[item]});
      continue;
    }
    if(emitted.has(passageId))continue;
    emitted.add(passageId);
    const group=groups.get(passageId);
    blocks.push({
      type:"shared-passage",
      key:`passage:${passageId}`,
      passageId,
      title:group.title||null,
      passageText:group.text,
      itemIds:group.items.map(row=>row.id),
      items:group.items
    });
  }
  return blocks;
}

export function portugueseExamReadingLoad(items){
  const blocks=buildPortugueseExamBlocks(items);
  const words=value=>String(value||"").trim().split(/\s+/u).filter(Boolean).length;
  return blocks.reduce((total,block)=>{
    if(block.type==="shared-passage")return total+words(block.passageText);
    return total+words(block.items[0]?.stimulus);
  },0);
}
