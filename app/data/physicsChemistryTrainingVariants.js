function mc({id,year,domain,subtopicId,competencyId="fqa-problems",prompt,options,answerIndex,explanation,difficultyTarget=2}){
  return {id,year,domain,subtopicId,competencyId,prompt,options,answerIndex,explanation,responseType:"multiple-choice",gradingMode:"deterministic",sourceOrigin:"original",reviewStatus:"prototype",difficultyTarget,maxPoints:10,generated:true,templateId:id.split("-V")[0]};
}
function n(x,d=2){return Number(x.toFixed(d))}
function opts(correct,a,b,c,format=x=>String(x)){
  const values=[correct,a,b,c].map(format);
  if(new Set(values).size!==4)throw new Error("Duplicate FQ training variant option: "+values.join("|"));
  return {options:values,answerIndex:0};
}
const rows=[];

[
  [18,9,.5],[44,22,.5],[58.5,29.25,.5],[40,10,.25],[98,49,.5],[32,8,.25]
].forEach(([M,m,ans],i)=>{const p=opts(ans,ans*2,ans/2,M/m*10,x=>String(n(x,2)).replace(".",","));rows.push(mc({id:`FQA-V-MOL-V${i+1}`,year:"10.º",domain:"q10-elements",subtopicId:"q10-amount-molar",prompt:`Uma amostra tem massa ${String(m).replace(".",",")} g e massa molar ${String(M).replace(".",",")} g mol⁻¹. Qual é a quantidade de matéria?`,...p,explanation:`n=m/M=${m}/${M}=${String(ans).replace(".",",")} mol.`}))});

[
  [0.20,0.50],[0.15,0.30],[0.40,0.80],[0.12,0.60],[0.25,1.00],[0.36,0.90]
].forEach(([mol,vol],i)=>{const ans=n(mol/vol,3);const p=opts(ans,n(ans*2,3),n(ans/2,3),n(vol/mol,3),x=>String(x).replace(".",","));rows.push(mc({id:`FQA-V-SOL-V${i+1}`,year:"10.º",domain:"q10-matter",subtopicId:"q10-gases-solutions",prompt:`Uma solução contém ${String(mol).replace(".",",")} mol de soluto em ${String(vol).replace(".",",")} dm³. Qual é a concentração molar?`,...p,explanation:`c=n/V=${mol}/${vol}=${ans} mol dm⁻³.`}))});

[
  [120,170,-50],[210,160,50],[90,135,-45],[300,250,50],[145,205,-60],[260,310,-50]
].forEach(([breakE,formE,ans],i)=>{const p=opts(ans,-ans,Math.abs(ans),0,x=>`${x} kJ mol⁻¹`);rows.push(mc({id:`FQA-V-ENTH-V${i+1}`,year:"10.º",domain:"q10-matter",subtopicId:"q10-enthalpy",prompt:`Numa estimativa energética, quebrar ligações requer ${breakE} kJ mol⁻¹ e formar as novas ligações liberta ${formE} kJ mol⁻¹. Qual é ΔH aproximado?`,...p,explanation:`ΔH≈E(quebradas)−E(formadas)=${breakE}−${formE}=${ans} kJ mol⁻¹.`}))});

[
  [2,3],[4,5],[1.5,8],[3,4],[5,2],[2.5,6]
].forEach(([m,v],i)=>{const ans=n(.5*m*v*v,2);const p=opts(ans,n(m*v*v,2),n(.5*m*v,2),n(ans+5,2),x=>`${String(x).replace(".",",")} J`);rows.push(mc({id:`FQA-V-KINEN-V${i+1}`,year:"10.º",domain:"f10-energy",subtopicId:"f10-energy-motion",prompt:`Um corpo de ${String(m).replace(".",",")} kg move-se a ${String(v).replace(".",",")} m s⁻¹. Qual é a sua energia cinética?`,...p,explanation:`E_c=½mv²=${ans} J.`}))});

[
  [12,5,0],[20,3,0],[15,4,60],[30,2,60],[18,6,0],[25,4,60]
].forEach(([F,d,ang],i)=>{const factor=ang===0?1:.5;const ans=n(F*d*factor,2);const p=opts(ans,n(F*d,2),n(F+d,2),n(ans/2,2),x=>`${String(x).replace(".",",")} J`);rows.push(mc({id:`FQA-V-WORK-V${i+1}`,year:"10.º",domain:"f10-energy",subtopicId:"f10-work",prompt:`Uma força constante de ${F} N atua durante um deslocamento de ${d} m, fazendo ${ang}° com o deslocamento. Qual é o trabalho realizado?`,...p,explanation:`W=Fd cosθ=${ans} J.`}))});

[
  [12,6],[24,8],[9,3],[20,5],[15,10],[30,12]
].forEach(([U,R],i)=>{const ans=n(U/R,3);const p=opts(ans,n(U*R,3),n(R/U,3),n(U/(2*R),3),x=>`${String(x).replace(".",",")} A`);rows.push(mc({id:`FQA-V-ELEC-V${i+1}`,year:"10.º",domain:"f10-energy",subtopicId:"f10-electric",prompt:`Um resistor de ${R} Ω está sujeito a uma diferença de potencial de ${U} V. Qual é a corrente elétrica?`,...p,explanation:`I=U/R=${U}/${R}=${ans} A.`}))});

[
  [0,4,2],[3,5,-1],[10,2,3],[5,6,.5],[-2,8,1.5],[4,3,-2]
].forEach(([v0,t,a],i)=>{const ans=n(v0+a*t,2);const p=opts(ans,n(v0+a,2),n(a*t,2),n(v0-a*t,2),x=>`${String(x).replace(".",",")} m s⁻¹`);rows.push(mc({id:`FQA-V-KIN-V${i+1}`,year:"11.º",domain:"f11-mechanics",subtopicId:"f11-kinematics",prompt:`Um móvel tem velocidade inicial ${v0} m s⁻¹ e aceleração constante ${String(a).replace(".",",")} m s⁻² durante ${t} s. Qual é a velocidade final?`,...p,explanation:`v=v₀+at=${ans} m s⁻¹.`}))});

[
  [12,3],[20,5],[18,6],[35,7],[16,4],[27,9]
].forEach(([F,m],i)=>{const ans=n(F/m,3);const p=opts(ans,n(F*m,3),n(m/F,3),n(ans*2,3),x=>`${String(x).replace(".",",")} m s⁻²`);rows.push(mc({id:`FQA-V-NEWTON-V${i+1}`,year:"11.º",domain:"f11-mechanics",subtopicId:"f11-newton-gravity",prompt:`Uma força resultante de ${F} N atua num corpo de ${m} kg. Qual é a aceleração?`,...p,explanation:`Pela 2.ª lei de Newton, a=F_R/m=${ans} m s⁻².`}))});

[
  [4,2],[6,3],[8,4],[10,5],[5,1.25],[12,6]
].forEach(([v,r],i)=>{const ans=n(v*v/r,3);const p=opts(ans,n(v/r,3),n(v*v*r,3),n(r/v,3),x=>`${String(x).replace(".",",")} m s⁻²`);rows.push(mc({id:`FQA-V-CIRC-V${i+1}`,year:"11.º",domain:"f11-mechanics",subtopicId:"f11-circular",prompt:`Um corpo descreve movimento circular uniforme com rapidez ${v} m s⁻¹ numa trajetória de raio ${String(r).replace(".",",")} m. Qual é a aceleração centrípeta?`,...p,explanation:`a_c=v²/r=${ans} m s⁻².`}))});

[
  [2,4],[5,3],[10,2],[8,5],[12,2.5],[6,7]
].forEach(([f,lambda],i)=>{const ans=n(f*lambda,3);const p=opts(ans,n(f/lambda,3),n(lambda/f,3),n(f+lambda,3),x=>`${String(x).replace(".",",")} m s⁻¹`);rows.push(mc({id:`FQA-V-WAVE-V${i+1}`,year:"11.º",domain:"f11-waves",subtopicId:"f11-waves-signals",prompt:`Uma onda tem frequência ${String(f).replace(".",",")} Hz e comprimento de onda ${String(lambda).replace(".",",")} m. Qual é a velocidade de propagação?`,...p,explanation:`v=fλ=${ans} m s⁻¹.`}))});

[
  [340,170],[330,110],[345,230],[320,160],[336,240],[350,140]
].forEach(([v,f],i)=>{const ans=n(v/f,3);const p=opts(ans,n(f/v,3),n(v*f,3),n(ans*2,3),x=>`${String(x).replace(".",",")} m`);rows.push(mc({id:`FQA-V-SOUND-V${i+1}`,year:"11.º",domain:"f11-waves",subtopicId:"f11-sound",prompt:`No meio considerado, o som propaga-se a ${v} m s⁻¹ e tem frequência ${f} Hz. Qual é o comprimento de onda?`,...p,explanation:`λ=v/f=${ans} m.`}))});

[
  [2,1,3],[1,3,2],[4,2,5],[3,1,4],[2,4,1],[5,2,4]
].forEach(([a,b,pdt],i)=>{const ans=n((pdt/a)*b,3);const wrong1=n((pdt/b)*a,3),wrong2=n(pdt*a*b,3),wrong3=n(pdt/(a*b),3);const p=opts(ans,wrong1,wrong2,wrong3,x=>`${String(x).replace(".",",")} mol`);rows.push(mc({id:`FQA-V-STO-V${i+1}`,year:"11.º",domain:"q11-equilibrium",subtopicId:"q11-stoichiometry",prompt:`Na reação ${a} A → ${b} B, formaram-se ${String(pdt).replace(".",",")} mol de A consumido. Quantos mol de B se formam, segundo a proporção estequiométrica?`,...p,explanation:`n(B)=n(A)×${b}/${a}=${ans} mol.`}))});

[
  [50,.8],[80,.75],[120,.6],[40,.9],[150,.7],[90,.85]
].forEach(([theoretical,yieldFrac],i)=>{const ans=n(theoretical*yieldFrac,2);const p=opts(ans,n(theoretical/yieldFrac,2),n(theoretical*(1-yieldFrac),2),n(theoretical+yieldFrac*100,2),x=>`${String(x).replace(".",",")} g`);rows.push(mc({id:`FQA-V-YIELD-V${i+1}`,year:"11.º",domain:"q11-equilibrium",subtopicId:"q11-limiting-yield",prompt:`A massa teórica de produto é ${theoretical} g e o rendimento é ${Math.round(yieldFrac*100)}%. Qual é a massa efetivamente obtida?`,...p,explanation:`m_real=η×m_teórica=${ans} g.`}))});

[
  [2,.5,1],[4,.25,.5],[3,1,1.5],[5,.4,1],[2.5,.8,1],[6,.5,1.5]
].forEach(([K,a,b],i)=>{const Q=n(b/a,3);const ans=Q<K?"sentido direto":Q>K?"sentido inverso":"equilíbrio";const distract=[..."sentido direto|sentido inverso|equilíbrio|não é possível decidir".split("|")].filter(x=>x!==ans);rows.push(mc({id:`FQA-V-KQ-V${i+1}`,year:"11.º",domain:"q11-equilibrium",subtopicId:"q11-kq",prompt:`Para A ⇌ B, Kc=${String(K).replace(".",",")}. Num instante, [A]=${String(a).replace(".",",")} mol dm⁻³ e [B]=${String(b).replace(".",",")} mol dm⁻³. Em que sentido tende o sistema a evoluir?`,options:[ans,...distract],answerIndex:0,explanation:`Qc=[B]/[A]=${Q}. Comparando com Kc=${K}, prevê-se ${ans}.`,difficultyTarget:3}))});

[
  [1e-2,2],[1e-3,3],[1e-4,4],[1e-5,5],[1e-6,6],[1e-1,1]
].forEach(([h,ans],i)=>{const p=opts(ans,14-ans,ans+1,Math.max(0,ans-1),x=>String(x));rows.push(mc({id:`FQA-V-PH-V${i+1}`,year:"11.º",domain:"q11-aqueous",subtopicId:"q11-ph",prompt:`Uma solução tem [H₃O⁺]=${h.toExponential(0).replace("e-","×10⁻")} mol dm⁻³. Qual é o pH?`,...p,explanation:`pH=−log[H₃O⁺]=${ans}.`}))});

export const PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS=rows;
