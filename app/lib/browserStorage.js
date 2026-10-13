const STORAGE_NAMES=["localStorage","sessionStorage"];

export function browserStores(){
  const stores=[];
  for(const name of STORAGE_NAMES)try{
    const store=globalThis[name];
    if(store)stores.push(store);
  }catch{}
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
