const MAX_STACK_LINES=12;
const MAX_VALUE=160;
const recent=new Map();

function clean(value,max=MAX_VALUE){
  return String(value??"").replace(/[\r\n\t]+/g," ").trim().slice(0,max);
}

function stackFrames(error){
  const raw=typeof error?.stack==="string"?error.stack:"";
  return raw.split("\n")
    .slice(1)
    .filter(line=>/_next|approvamais|localhost/u.test(line))
    .slice(0,MAX_STACK_LINES)
    .map(line=>clean(line.replace(/\?.*?(?=[):]|$)/gu,""),320));
}

function signature(payload){
  return [payload.kind,payload.name,payload.screen,payload.path,payload.line,payload.column,payload.stack?.[0]].join("|");
}

export function reportClientError({kind="runtime",error=null,source="",line=null,column=null}={}){
  if(typeof window==="undefined")return;
  const state=window.history.state||{};
  const payload={
    kind:clean(kind,32),
    name:clean(error?.name||"Error",80),
    screen:clean(state.approvaScreen||"unknown",80),
    path:clean(window.location.pathname,160),
    source:clean(source,160),
    line:Number.isFinite(Number(line))?Number(line):null,
    column:Number.isFinite(Number(column))?Number(column):null,
    stack:stackFrames(error)
  };
  const key=signature(payload),now=Date.now(),last=recent.get(key)||0;
  if(now-last<30_000)return;
  recent.set(key,now);
  if(recent.size>50){
    for(const [entry,at] of recent){if(now-at>5*60_000)recent.delete(entry)}
  }
  try{
    fetch("/api/client-errors",{
      method:"POST",
      credentials:"same-origin",
      keepalive:true,
      headers:{"content-type":"application/json"},
      body:JSON.stringify(payload)
    }).catch(()=>{});
  }catch{}
}
