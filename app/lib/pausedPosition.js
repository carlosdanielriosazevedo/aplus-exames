// «Pergunta 3 de 8» numa sessão em pausa, só quando a posição e o total são
// conhecidos (nunca «Pergunta 1 de 0»).
export function pausedPosition(index,total){
  return Number.isInteger(index)&&index>=0&&Number(total)>0?`Pergunta ${index+1} de ${total}`:null;
}
