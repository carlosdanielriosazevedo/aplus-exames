export function sameOriginRequest(request){
  const origin=request.headers.get("origin");
  const fetchSite=request.headers.get("sec-fetch-site");
  if(!origin)return {ok:false,code:"ORIGIN_REQUIRED"};
  let expected;
  let supplied;
  try{
    expected=new URL(request.url).origin;
    supplied=new URL(origin).origin;
  }catch{
    return {ok:false,code:"INVALID_ORIGIN"};
  }
  if(supplied!==expected)return {ok:false,code:"CSRF_ORIGIN_MISMATCH"};
  if(fetchSite&&!new Set(["same-origin","none"]).has(fetchSite))return {ok:false,code:"CSRF_FETCH_SITE_MISMATCH"};
  return {ok:true};
}
