export function portugueseWordCount(value){
  const normalized=String(value??"").trim();
  return normalized?normalized.split(/\s+/u).filter(Boolean).length:0;
}

export function portugueseWordLimitFeedback(item,response){
  const count=portugueseWordCount(response);
  const min=item?.wordLimit?.min??0;
  const max=item?.wordLimit?.max??Number.POSITIVE_INFINITY;

  if(count===0){
    return {status:"empty",count,min,max,delta:min,label:`Escreve entre ${min} e ${max} palavras`};
  }
  if(count<min){
    const delta=min-count;
    return {status:"below",count,min,max,delta,label:`Faltam ${delta} ${delta===1?"palavra":"palavras"}`};
  }
  if(count>max){
    const delta=count-max;
    return {status:"above",count,min,max,delta,label:`Excedeste ${delta} ${delta===1?"palavra":"palavras"}`};
  }
  return {
    status:"within",count,min,max,delta:0,label:"Dentro do intervalo",
    caution:"A extensão está certa; o conteúdo continua a ser avaliado pela grelha."
  };
}
