export function insertMathText(text,start,end,insertion){
  const value=String(text??"");
  const from=Math.max(0,Math.min(value.length,Number(start)||0));
  const to=Math.max(from,Math.min(value.length,Number(end)||from));
  return {value:value.slice(0,from)+insertion+value.slice(to),cursor:from+insertion.length};
}
