export function conciseMathExplanation(value){
  const text=String(value??"").trim();
  if(!text)return "";
  const markers=[" Passo-chave:"," A opção obtida deve coincidir"," Porquê:"];
  let cut=text.length;
  for(const marker of markers){
    const index=text.indexOf(marker);
    if(index>=0)cut=Math.min(cut,index);
  }
  return text.slice(0,cut).trim();
}
