// Additional account precondition; it never replaces session authentication.
export function assertRequestAccount(headers,authUserId,{required=false}={}){
  const raw=headers.get("x-approva-account");
  let expected=null;
  try{if(raw)expected=decodeURIComponent(raw);}catch{}
  if((required&&!expected)||(raw&&expected!==authUserId))
    throw Object.assign(new Error("Forbidden"),{status:403,code:"FORBIDDEN"});
}
