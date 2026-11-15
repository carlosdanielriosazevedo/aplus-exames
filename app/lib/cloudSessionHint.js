// Sinal local (sem dados pessoais) de que já houve sessão iniciada neste
// dispositivo. Evita carregar a sincronização para visitantes anónimos.
export const CLOUD_ACCOUNT_HINT_KEY="approva-cloud-session-hint-v1";
export const AUTH_CHANGED_EVENT="approva:auth-changed";

export function rememberCloudSession(active){
  try{
    if(active)localStorage.setItem(CLOUD_ACCOUNT_HINT_KEY,"1");
    else localStorage.removeItem(CLOUD_ACCOUNT_HINT_KEY);
  }catch{}
  try{window.dispatchEvent(new CustomEvent(AUTH_CHANGED_EVENT,{detail:{active:!!active}}))}catch{}
}

export function cloudSessionHinted(){
  try{return localStorage.getItem(CLOUD_ACCOUNT_HINT_KEY)==="1";}catch{return false}
}
