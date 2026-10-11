const PILOT_CONSENT_KEY="aplus-pilot-consent-active-v1";

export function pilotTelemetryAllowed(){
  if(typeof window==="undefined")return false;
  try{return window.localStorage.getItem(PILOT_CONSENT_KEY)==="1"}catch{return false}
}

export function setPilotTelemetryAllowed(active){
  if(typeof window==="undefined")return;
  try{
    if(active)window.localStorage.setItem(PILOT_CONSENT_KEY,"1");
    else window.localStorage.removeItem(PILOT_CONSENT_KEY);
  }catch{}
}
