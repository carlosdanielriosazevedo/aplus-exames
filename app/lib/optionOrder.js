// Posição da resposta certa nas perguntas de escolha múltipla.
//
// Problema: nos bancos escritos à mão, a letra da resposta certa seguia o
// padrão de quem escreveu (no piloto de Matemática nunca se repetia entre
// perguntas seguidas; no diagnóstico 60% eram a opção A). Um aluno atento
// aprende o padrão e acerta sem saber a matéria.
//
// Regra: cada pergunta tem uma posição-alvo fixa, calculada a partir do seu
// ID (hash estável). A posição é independente entre perguntas, por isso numa
// sequência a letra certa repete-se com a frequência do acaso (≈25% com 4
// opções), sem padrão aprendível, e é igual em todos os dispositivos.
// As opções erradas mantêm a ordem relativa original.
//
// Exceção: opções numéricas por ordem crescente/decrescente ficam como estão,
// porque mover uma delas denunciaria a certa.
//
// As sessões guardadas antes desta regra registavam o índice na ordem antiga:
// `legacyOptionIndex` converte-o para a ordem atual.

export const OPTION_ORDER_VERSION=2;

// FNV-1a seguido do finalizador do MurmurHash3. Sem o finalizador, os bits
// baixos do FNV-1a de IDs seguidos (…-001, …-002) alternam de forma
// previsível e a letra certa quase nunca se repetia entre perguntas seguidas.
function hash(text){
  let h=2166136261;
  for(let i=0;i<text.length;i++){
    h^=text.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  h^=h>>>16;h=Math.imul(h,0x85ebca6b);
  h^=h>>>13;h=Math.imul(h,0xc2b2ae35);
  h^=h>>>16;
  return h>>>0;
}

export function balancedOptionTarget(id,count){
  return hash(`option-order-v2:${String(id||"")}`)%count;
}

function numericValue(value){
  const text=String(value??"").trim().replace(/\s+/g,"").replace(/−/g,"-").replace(",",".");
  if(!/^[-+]?\d+(\.\d+)?$/.test(text))return null;
  const n=Number(text);
  return Number.isFinite(n)?n:null;
}

export function hasOrderedNumericOptions(options){
  const values=options.map(numericValue);
  if(values.some(v=>v===null))return false;
  const ascending=values.every((v,i)=>i===0||values[i-1]<=v);
  const descending=values.every((v,i)=>i===0||values[i-1]>=v);
  return ascending||descending;
}

export function balanceOptionOrder(item,{optionsKey="o",answerKey="a"}={}){
  const options=item?.[optionsKey],answer=item?.[answerKey];
  if(!Array.isArray(options)||options.length<2||!Number.isInteger(answer)||answer<0||answer>=options.length)return item;
  if(hasOrderedNumericOptions(options))return item;
  const target=balancedOptionTarget(item.id,options.length);
  if(target===answer)return {...item,optionOrderVersion:OPTION_ORDER_VERSION};
  // source[novaPosição] = posição original
  const source=options.map((_,index)=>index);
  const [correct]=source.splice(answer,1);
  source.splice(target,0,correct);
  return {
    ...item,
    [optionsKey]:source.map(index=>options[index]),
    [answerKey]:target,
    optionOrderVersion:OPTION_ORDER_VERSION,
    optionOrderSource:source
  };
}

export function balanceOptionOrderBank(items,keys){
  return items.map(item=>balanceOptionOrder(item,keys));
}

// Converte um índice escolhido na ordem antiga para a ordem atual.
export function legacyOptionIndex(item,value){
  if(!Number.isInteger(value)||!Array.isArray(item?.optionOrderSource))return value;
  const index=item.optionOrderSource.indexOf(value);
  return index<0?value:index;
}
