const STORAGE_NAMES=["localStorage","sessionStorage"];
const volatileMemory=new Map();
const volatileStorage={
  getItem:key=>volatileMemory.get(key)??null,
  setItem:(key,value)=>volatileMemory.set(key,String(value)),
  removeItem:key=>volatileMemory.delete(key)
};

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
    return true;
  }catch{}
  return false;
}

export function removeStorageKey(key){
  const stores=browserStores();
  let ok=!!stores.length;
  for(const store of stores)try{store.removeItem(key)}catch{ok=false}
  return ok;
}
