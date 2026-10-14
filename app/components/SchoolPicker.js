"use client";

import {useEffect,useMemo,useRef,useState} from "react";

function normalized(value){
  return String(value||"").normalize("NFD").replace(/\p{Diacritic}/gu,"").toLocaleLowerCase("pt-PT").replace(/\s+/gu," ").trim();
}

function searchable(school){
  return normalized(`${school.name} ${school.municipality} ${school.district}`);
}

export default function SchoolPicker({value,onChange,initialText=""}){
  const rootRef=useRef(null);
  const [schools,setSchools]=useState(null);
  const [query,setQuery]=useState(value?.name||initialText||"");
  const [open,setOpen]=useState(false);
  const [loading,setLoading]=useState(false);
  const [loadError,setLoadError]=useState(false);
  const [activeIndex,setActiveIndex]=useState(-1);

  useEffect(()=>{
    if(value?.name)setQuery(value.name);
  },[value?.id,value?.name]);

  useEffect(()=>{
    const close=event=>{if(!rootRef.current?.contains(event.target))setOpen(false)};
    document.addEventListener("pointerdown",close);
    return ()=>document.removeEventListener("pointerdown",close);
  },[]);

  async function ensureSchools(){
    if(schools||loading)return;
    setLoading(true);setLoadError(false);
    try{
      const response=await fetch("/api/schools",{credentials:"same-origin"});
      if(!response.ok)throw new Error("load");
      const body=await response.json();
      if(!Array.isArray(body?.schools)||body.schools.length<1000)throw new Error("incomplete");
      setSchools(body.schools);
    }catch{
      setLoadError(true);
    }finally{
      setLoading(false);
    }
  }

  const results=useMemo(()=>{
    const needle=normalized(query);
    if(!schools||needle.length<2)return [];
    const tokens=needle.split(" ").filter(Boolean);
    return schools.filter(school=>{
      const haystack=searchable(school);
      return tokens.every(token=>haystack.includes(token));
    }).slice(0,16);
  },[schools,query]);

  function edit(next){
    setQuery(next);setOpen(true);setActiveIndex(-1);ensureSchools();
    if(value&&next!==value.name)onChange(null);
  }

  function choose(school){
    setQuery(school.name);setOpen(false);setActiveIndex(-1);onChange(school);
  }

  function onKeyDown(event){
    if(event.key==="Escape"){setOpen(false);return}
    if(!open&&["ArrowDown","ArrowUp"].includes(event.key)){setOpen(true);ensureSchools();event.preventDefault();return}
    if(!results.length)return;
    if(event.key==="ArrowDown"){event.preventDefault();setActiveIndex(index=>Math.min(results.length-1,index+1));}
    else if(event.key==="ArrowUp"){event.preventDefault();setActiveIndex(index=>Math.max(0,index-1));}
    else if(event.key==="Enter"&&activeIndex>=0){event.preventDefault();choose(results[activeIndex]);}
  }

  const listVisible=open&&(loading||loadError||normalized(query).length>=2);
  return <div className="schoolPicker" ref={rootRef}>
    <input
      value={query}
      onChange={event=>edit(event.target.value)}
      onFocus={()=>{setOpen(true);ensureSchools()}}
      onKeyDown={onKeyDown}
      placeholder="Procura pelo nome ou concelho"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={listVisible}
      aria-controls="school-picker-results"
      aria-activedescendant={activeIndex>=0?`school-option-${activeIndex}`:undefined}
      autoComplete="off"
    />
    {value&&<small className="schoolPickerSelection">✓ {value.municipality} · {value.district}</small>}
    {!value&&query.trim()&&<small className="schoolPickerHint">Seleciona uma opção da lista para confirmar a escola.</small>}
    {listVisible&&<div id="school-picker-results" className="schoolPickerResults" role="listbox" aria-label="Escolas encontradas">
      {loading&&<p>A carregar escolas…</p>}
      {loadError&&<p role="alert">Não foi possível carregar a lista de escolas. Tenta novamente.</p>}
      {!loading&&!loadError&&results.map((school,index)=><button
        type="button"
        role="option"
        aria-selected={value?.id===school.id}
        id={`school-option-${index}`}
        className={index===activeIndex?"active":""}
        key={school.id}
        onMouseDown={event=>event.preventDefault()}
        onClick={()=>choose(school)}
      ><b>{school.name}</b><span>{school.municipality} · {school.district}</span></button>)}
      {!loading&&!loadError&&normalized(query).length>=2&&results.length===0&&<p>Não encontrámos essa escola. Confirma o nome ou pesquisa pelo concelho.</p>}
    </div>}
  </div>;
}
