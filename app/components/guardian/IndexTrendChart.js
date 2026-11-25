"use client";
// Evolução semanal do índice de preparação de uma disciplina (uma só série: o
// título do cartão diz o que é, sem legenda). Linha de 2px, ponto final com anel,
// grelha discreta, cruz + valor ao tocar/passar (ao tocar, o valor fica até ao
// próximo toque), e tabela para leitores de ecrã.
import {useMemo,useRef,useState} from "react";
import styles from "./guardian.module.css";

const W=320,H=128,PAD={top:14,right:34,bottom:22,left:28};
const LINE="#d97706";

export default function IndexTrendChart({series,title}){
  const [active,setActive]=useState(null);
  const ref=useRef(null);
  const geometry=useMemo(()=>{
    const values=series.map(point=>point.value);
    const lo=Math.max(0,Math.floor((Math.min(...values)-8)/10)*10);
    const hi=Math.min(100,Math.ceil((Math.max(...values)+8)/10)*10);
    const x=i=>PAD.left+(series.length===1?0:i*(W-PAD.left-PAD.right)/(series.length-1));
    const y=value=>PAD.top+(hi-value)*(H-PAD.top-PAD.bottom)/Math.max(1,hi-lo);
    const ticks=[lo,Math.round((lo+hi)/2),hi];
    return {x,y,ticks,points:series.map((point,i)=>({...point,cx:x(i),cy:y(point.value)}))};
  },[series]);
  if(!series.length)return null;
  const {points,ticks,y}=geometry;
  const path=points.map((p,i)=>`${i?"L":"M"}${p.cx.toFixed(1)},${p.cy.toFixed(1)}`).join(" ");
  const area=`${path} L${points[points.length-1].cx.toFixed(1)},${(H-PAD.bottom).toFixed(1)} L${points[0].cx.toFixed(1)},${(H-PAD.bottom).toFixed(1)} Z`;
  const last=points[points.length-1];
  function pick(event){
    const box=ref.current?.getBoundingClientRect();if(!box)return;
    const px=(event.clientX-box.left)*W/box.width;
    let best=0;points.forEach((p,i)=>{if(Math.abs(p.cx-px)<Math.abs(points[best].cx-px))best=i});
    setActive(best);
  }
  const shown=active===null?null:points[active];
  return <figure className={styles.chart}>
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title}: de ${points[0].value} para ${last.value} nas últimas ${points.length} semanas`}
      onPointerMove={pick} onPointerDown={pick} onPointerLeave={event=>{if(event.pointerType==="mouse")setActive(null)}}>
      {ticks.map(tick=><g key={tick}>
        <line x1={PAD.left} x2={W-PAD.right} y1={y(tick)} y2={y(tick)} stroke="#e3e9ed" strokeWidth="1"/>
        <text x={PAD.left-6} y={y(tick)+4} textAnchor="end" className={styles.axis}>{tick}</text>
      </g>)}
      <text x={PAD.left} y={H-6} className={styles.axis}>{points[0].label}</text>
      <text x={W-PAD.right} y={H-6} textAnchor="end" className={styles.axis}>{points.length>1?"esta semana":points[0].label}</text>
      <path d={area} fill={LINE} opacity=".1"/>
      <path d={path} fill="none" stroke={LINE} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
      {shown&&<line x1={shown.cx} x2={shown.cx} y1={PAD.top-6} y2={H-PAD.bottom} stroke="#9aa6b2" strokeWidth="1"/>}
      <circle cx={(shown||last).cx} cy={(shown||last).cy} r="5" fill={LINE} stroke="#ffffff" strokeWidth="2"/>
      {!shown&&<text x={last.cx+8} y={last.cy+4} className={styles.endLabel}>{last.value}</text>}
    </svg>
    {shown&&<div className={styles.tooltip} style={{left:`${Math.min(78,Math.max(8,shown.cx/W*100))}%`}}>
      <span className={styles.tooltipKey} aria-hidden="true"/>Semana de {shown.label}: <b>{shown.value}</b>
    </div>}
    <table className={styles.srOnly}><caption>{title}</caption><thead><tr><th>Semana</th><th>Índice</th></tr></thead>
      <tbody>{points.map(p=><tr key={p.key}><td>{p.label}</td><td>{p.value}</td></tr>)}</tbody></table>
  </figure>;
}
