// Dados de exemplo do protótipo da área do encarregado de educação. Sintéticos:
// nenhum aluno real. A versão real recebe os mesmos campos do servidor.
import {dayKey} from "../../lib/guardianDashboard";

const DAY_MS=24*60*60*1000;

// pattern: índice 0 = hoje; [minutos, missões] por dia (0 minutos = sem estudo).
function daysFrom(pattern,now){
  const base=new Date(now);base.setHours(12,0,0,0);
  const days={};
  pattern.forEach(([minutes,missions],offset)=>{
    if(!minutes)return;
    const at=base.getTime()-offset*DAY_MS;
    days[dayKey(at)]={minutes,activities:{mission:missions,training:minutes>20?1:0}};
  });
  return days;
}

function weekly(values,now){
  const base=new Date(now);base.setHours(12,0,0,0);
  return values.map((value,i)=>{
    const at=base.getTime()-(values.length-1-i)*7*DAY_MS;
    const d=new Date(at);
    return {key:dayKey(at),label:`${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}`,value};
  });
}

export function guardianFixtures(now=Date.now()){
  return [
    {
      id:"rui",firstName:"Rui",schoolYear:"11.º ano",linkedSince:"12/11",
      days:daysFrom([[18,1],[0,0],[25,1],[14,1],[32,1],[0,0],[12,1],[20,1],[0,0],[15,1],[0,0],[22,1],[0,0],[10,1]],now),
      subjects:[
        {id:"math-a",name:"Matemática A",diagnosticDone:true,diagnosticAt:"03/11",series:weekly([41,44,43,47,50,52,55,58],now)},
        {id:"portuguese",name:"Português",diagnosticDone:true,diagnosticAt:"05/11",series:weekly([55,56,55,54,56,55,56,56],now)}
      ]
    },
    {
      id:"ana",firstName:"Ana",schoolYear:"10.º ano",linkedSince:"19/11",
      days:daysFrom([[0,0],[0,0],[9,1],[0,0],[0,0],[16,1],[0,0],[11,1],[14,1],[0,0],[0,0],[12,1],[0,0],[0,0]],now),
      subjects:[
        {id:"physics-chemistry-a",name:"Física e Química A",diagnosticDone:true,diagnosticAt:"19/11",series:weekly([48,47,45,42],now)},
        {id:"math-a",name:"Matemática A",diagnosticDone:false,series:[]}
      ]
    }
  ];
}
