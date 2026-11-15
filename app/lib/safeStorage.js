// Acesso protegido ao armazenamento do browser.
//
// Com o armazenamento bloqueado (definições de privacidade, alguns modos
// privados), aceder a window.localStorage — incluindo `typeof localStorage` —
// lança SecurityError. Estas funções nunca lançam: devolvem o armazenamento ou
// null. Quem as usa decide o que fazer sem armazenamento persistente.
export function safeLocalStorage(){
  try{return globalThis.localStorage||null}catch{return null}
}

export function safeSessionStorage(){
  try{return globalThis.sessionStorage||null}catch{return null}
}
