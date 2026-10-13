const STORAGE_NAMES=["localStorage","sessionStorage"];
const volatileMemory=new Map();
let volatileActive=false;
const volatileStorage={
  getItem:key=>volatileMemory.get(key)??null,
  setItem:(key,value)=>volatileMemory.set(key,String(value)),
  removeItem:key=>volatileMemory.delete(key)
};

export function volatileStorageActive(){return volatileActive}

function announceStorageMode(temporary){
  if(volatileActive===temporary)return;
  volatileActive=temporary;
  if(typeof window!=="undefined")try{
    window.dispatchEvent(new CustomEvent(temporary?"approva:volatile-storage":"approva:durable-storage"));
  }catch{}
}

export function browserStores(){
  const stores=[];
  for(const name of STORAGE_NAMES)try{
    const store=globalThis[name];
    if(store)stores.push(store);
  }catch{}
  // Last-resort same-tab storage is a browser resilience layer. Keep it out of
  // single-store server/audit harnesses so genuine persistence fault injection
  // can still fail closed there. In a real browser, window exists even when
  // both Web Storage getters/writes are blocked.
  if(typeof window!=="undefined"||stores.length>1)stores.push(volatileStorage);
  return stores;
}

export function readStorageRows(key){
  const rows=[];
  let readable=false;
  for(const store of browserStores())try{
    const raw=store.getItem(key);
    readable=true;
    if(raw)rows.push([store,raw]);
  }catch{}
  return {rows,readable};
}

export function writeStorageFallback(key,payload){
  const stores=browserStores();
  for(let i=0;i<stores.length;i++)try{
    stores[i].setItem(key,payload);
    for(let j=i+1;j<stores.length;j++)try{stores[j].removeItem(key)}catch{}
    announceStorageMode(stores[i]===volatileStorage);
    return true;
  }catch{}
  return false;
}

export function removeStorageKey(key){
  const stores=browserStores();
  let ok=!!stores.length;
  for(const store of stores)try{store.removeItem(key)}catch{ok=false}
  if(ok&&volatileMemory.size===0)announceStorageMode(false);
  return ok;
}
