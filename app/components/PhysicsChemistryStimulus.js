"use client";

function TableStimulus({stimulus}){
  return <div className="fqaStimulus"><table><thead><tr>{stimulus.columns.map(column=><th key={column}>{column}</th>)}</tr></thead><tbody>{stimulus.rows.map((row,rowIndex)=><tr key={rowIndex}>{row.map((cell,cellIndex)=><td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function LineChartStimulus({stimulus}){
  const width=520,height=260,pad={left:58,right:20,top:18,bottom:48};
  const points=stimulus.points||[];
  const xs=points.map(row=>Number(row.x)),ys=points.map(row=>Number(row.y));
  const minX=stimulus.xMin??Math.min(...xs),maxX=stimulus.xMax??Math.max(...xs);
  const minY=stimulus.yMin??Math.min(0,...ys),maxY=stimulus.yMax??Math.max(...ys);
  const sx=x=>pad.left+(Number(x)-minX)/(maxX-minX||1)*(width-pad.left-pad.right);
  const sy=y=>height-pad.bottom-(Number(y)-minY)/(maxY-minY||1)*(height-pad.top-pad.bottom);
  const line=points.map((row,index)=>(index?"L":"M")+sx(row.x)+" "+sy(row.y)).join(" ");
  const xTicks=stimulus.xTicks||[minX,(minX+maxX)/2,maxX];
  const yTicks=stimulus.yTicks||[minY,(minY+maxY)/2,maxY];
  return <figure className="fqaChartStimulus">
    {stimulus.caption&&<figcaption>{stimulus.caption}</figcaption>}
    <svg viewBox={"0 0 "+width+" "+height} role="img" aria-label={stimulus.ariaLabel||stimulus.caption||"Gráfico de dados"}>
      <line x1={pad.left} y1={height-pad.bottom} x2={width-pad.right} y2={height-pad.bottom} className="axis"/>
      <line x1={pad.left} y1={pad.top} x2={pad.left} y2={height-pad.bottom} className="axis"/>
      {xTicks.map(value=><g key={"x"+value}><line x1={sx(value)} y1={height-pad.bottom} x2={sx(value)} y2={height-pad.bottom+6} className="axis"/><text x={sx(value)} y={height-pad.bottom+22} textAnchor="middle">{value}</text></g>)}
      {yTicks.map(value=><g key={"y"+value}><line x1={pad.left-6} y1={sy(value)} x2={pad.left} y2={sy(value)} className="axis"/><text x={pad.left-10} y={sy(value)+4} textAnchor="end">{value}</text></g>)}
      <path d={line} fill="none" className="dataLine"/>
      {points.map((row,index)=><circle key={index} cx={sx(row.x)} cy={sy(row.y)} r="4.5" className="dataPoint"/>)}
      <text x={(pad.left+width-pad.right)/2} y={height-10} textAnchor="middle" className="axisLabel">{stimulus.xLabel}</text>
      <text x="15" y={(pad.top+height-pad.bottom)/2} textAnchor="middle" transform={"rotate(-90 15 "+((pad.top+height-pad.bottom)/2)+")"} className="axisLabel">{stimulus.yLabel}</text>
    </svg>
  </figure>;
}

function DiagramStimulus({stimulus}){
  return <figure className="fqaDiagramStimulus">
    {stimulus.caption&&<figcaption>{stimulus.caption}</figcaption>}
    <div className="fqaDiagramFlow">{(stimulus.nodes||[]).map((node,index)=><div key={node.id||index} className="fqaDiagramNode"><b>{node.label}</b>{node.note&&<small>{node.note}</small>}{index<(stimulus.nodes.length-1)&&<span aria-hidden="true">→</span>}</div>)}</div>
  </figure>;
}

export default function PhysicsChemistryStimulus({item}){
  const stimulus=item?.stimulus;
  if(!stimulus)return null;
  if(stimulus.type==="table")return <TableStimulus stimulus={stimulus}/>;
  if(stimulus.type==="line-chart")return <LineChartStimulus stimulus={stimulus}/>;
  if(stimulus.type==="diagram")return <DiagramStimulus stimulus={stimulus}/>;
  return null;
}
