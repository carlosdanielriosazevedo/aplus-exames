"use client";
import dynamic from "next/dynamic";
const ScoreLossDetails=dynamic(()=>import("./ScoreLossDetails"),{ssr:false});
export default function ScoreLossExplanation(props){return props.result?<ScoreLossDetails {...props}/>:null}
