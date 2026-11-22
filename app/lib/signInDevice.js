// Ao entrar numa conta num dispositivo com estudo feito sem conta (decisão do
// product owner, 2026-11-22): a conta manda.
// - A conta já tem progresso → o estudo sem conta deste dispositivo é apagado e o
//   progresso da conta é carregado do zero (o mesmo caminho de entrar num
//   dispositivo novo). Nada se mistura.
// - A conta está vazia → fica com o que o aluno acabou de fazer aqui.
// Progresso que já pertença a uma conta não passa por aqui (é separado por conta).
import {activeStateAccount,hasAcademicData,eraseAcademicDataFromDevice,OPEN_HOME_AFTER_SIGNIN_KEY} from "./accountDeviceStorage.js";
import {hasMeaningfulProgress} from "./cloudAutosync.js";

export {OPEN_HOME_AFTER_SIGNIN_KEY};

export async function settleDeviceForAccount(userId,{load,erase=eraseAcademicDataFromDevice,storage=globalThis.sessionStorage}={}){
  if(!userId)return {action:"none"};
  if(activeStateAccount()||!hasAcademicData())return {action:"none"};
  let remote;
  try{remote=await load({expectedOwner:String(userId)})}catch{return {action:"error"}}
  if(remote&&hasMeaningfulProgress(remote.state_json)){
    const erased=erase(null);
    if(!erased?.ok)return {action:"error"};
    // Depois de recarregar, abrir no menu (e não no início do onboarding).
    try{storage?.setItem(OPEN_HOME_AFTER_SIGNIN_KEY,"1")}catch{}
    return {action:"replaced"};
  }
  return {action:"adopt"};
}
