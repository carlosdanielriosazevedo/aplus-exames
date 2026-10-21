"use client";
import {useCallback,useEffect,useState} from "react";
import PortuguesePassageMiniExam from "./PortuguesePassageMiniExam";
import {normalizePortugueseMiniExamDraft} from "../lib/portugueseMiniExamDraft";

const KEY="applus:portuguese-prototype-draft:v1";
export default function PersistentPortuguesePrototype({exam}){
  const [recovery,setRecovery]=useState(null);
  useEffect(()=>{
    try{
      const raw=localStorage.getItem(KEY);
      const draft=raw?normalizePortugueseMiniExamDraft(JSON.parse(raw),{examId:"mini-1",itemIds:exam.items.map(item=>item.id)}):null;
      setRecovery({draft,error:!!raw&&!draft});
    }catch{setRecovery({error:true})}
  },[exam]);
  const save=useCallback(draft=>{
    try{localStorage.setItem(KEY,JSON.stringify(draft))}catch{setRecovery({error:true})}
  },[]);
  if(!recovery)return <p>A recuperar a avaliação…</p>;
  if(recovery.error)return <p role="alert">Não foi possível recuperar ou guardar esta avaliação. Os dados existentes foram conservados.</p>;
  return <PortuguesePassageMiniExam exam={exam} examId="mini-1" initialDraft={recovery.draft} onDraftChange={save}/>;
}
