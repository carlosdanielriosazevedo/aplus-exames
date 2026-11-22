import {afterEach,beforeEach,describe,expect,it} from "vitest";
import {settleDeviceForAccount,OPEN_HOME_AFTER_SIGNIN_KEY} from "../../app/lib/signInDevice.js";
import {hasAcademicData} from "../../app/lib/accountDeviceStorage.js";

// Decisão do product owner (2026-11-22): ao entrar numa conta num dispositivo com
// estudo feito sem conta, a conta manda. Conta com progresso → o estudo deste
// dispositivo é apagado e a conta é carregada; conta vazia → fica com o que foi feito.
function memoryStore(){
  const m=new Map();
  return {get length(){return m.size},key:i=>[...m.keys()][i]??null,getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)};
}
let saved;
beforeEach(()=>{saved={l:globalThis.localStorage,s:globalThis.sessionStorage};globalThis.localStorage=memoryStore();globalThis.sessionStorage=memoryStore()});
afterEach(()=>{globalThis.localStorage=saved.l;globalThis.sessionStorage=saved.s});
const anonymous=()=>localStorage.setItem("a25",JSON.stringify({xp:40,diagnosticDone:true}));
const remoteWith=state=>async()=>({revision:3,state_json:state});

describe("entrar numa conta com estudo sem conta neste dispositivo",()=>{
  it("conta com progresso: o estudo deste dispositivo é apagado e a app abre no menu",async()=>{
    anonymous();
    const result=await settleDeviceForAccount("ana",{load:remoteWith({schema:"aplus-student-state-v8",xp:500,diagnosticDone:true})});
    expect(result).toEqual({action:"replaced"});
    expect(hasAcademicData()).toBe(false);
    expect(sessionStorage.getItem(OPEN_HOME_AFTER_SIGNIN_KEY)).toBe("1");
  });
  it("conta vazia (nunca guardou progresso): fica com o que foi feito aqui",async()=>{
    anonymous();
    expect(await settleDeviceForAccount("ana",{load:async()=>null})).toEqual({action:"adopt"});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(40);
  });
  it("conta com linha mas sem estudo também conta como vazia",async()=>{
    anonymous();
    expect(await settleDeviceForAccount("ana",{load:remoteWith({schema:"aplus-student-state-v8",xp:0,diagnosticDone:false})})).toEqual({action:"adopt"});
    expect(hasAcademicData()).toBe(true);
  });
  it("sem rede: nada é apagado",async()=>{
    anonymous();
    expect(await settleDeviceForAccount("ana",{load:async()=>{throw new Error("offline")}})).toEqual({action:"error"});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(40);
  });
  it("dispositivo limpo ou progresso que já é de uma conta: não faz nada",async()=>{
    expect(await settleDeviceForAccount("ana",{load:async()=>{throw new Error("não devia ser chamado")}})).toEqual({action:"none"});
    localStorage.setItem("a25",JSON.stringify({xp:9,cloudSync:{accountId:"ana"}}));
    expect(await settleDeviceForAccount("ana",{load:async()=>{throw new Error("não devia ser chamado")}})).toEqual({action:"none"});
  });
});
