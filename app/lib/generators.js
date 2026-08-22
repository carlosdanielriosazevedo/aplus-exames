// A+ v1.8 — Geradores paramétricos validados
// -------------------------------------------------
// Estes itens NÃO são escritos por IA em tempo real.
// Cada template tem regras fechadas, resposta calculada deterministicamente
// e validação estrutural antes de ser aceite pelo motor.

function hashString(str){
  let h=2166136261;
  for(let i=0;i<str.length;i++){
    h^=str.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return h>>>0;
}

function rng(seed){
  let x=(seed>>>0)||123456789;
  return ()=>{
    x^=x<<13; x^=x>>>17; x^=x<<5;
    return (x>>>0)/4294967296;
  };
}

function pick(r,arr){return arr[Math.floor(r()*arr.length)]}
function int(r,min,max){return Math.floor(r()*(max-min+1))+min}
function shuffle(r,arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(r()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function optionPack(r,correct,distractors,format=x=>String(x)){
  const raw=[correct,...distractors].map(format);
  const unique=[...new Set(raw)];
  if(unique.length<4)return null;
  const opts=shuffle(r,unique.slice(0,4));
  return {o:opts,a:opts.indexOf(format(correct))};
}

function gcd(a,b){while(b){[a,b]=[b,a%b]}return Math.abs(a)}
function comb(n,k){
  k=Math.min(k,n-k);
  let x=1;
  for(let i=1;i<=k;i++)x=x*(n-k+i)/i;
  return Math.round(x);
}
function dec(x){
  return String(Math.round(x*1000)/1000).replace(".",",");
}

export function validateGeneratedItem(q){
  if(!q || !q.id || !q.themeId || !q.templateId)return false;
  if(!Array.isArray(q.o) || q.o.length!==4)return false;
  if(new Set(q.o).size!==4)return false;
  if(!Number.isInteger(q.a) || q.a<0 || q.a>3)return false;
  if(!q.q || !q.sol || !q.signature)return false;
  return true;
}

const TEMPLATES = [
  {
    templateId:"T10F-LINEAR-ZERO",themeId:"10-fun",focus:"Domínio e zeros",difficulty:2,cognitive:"Aplicação",
    build(r){
      const a=int(r,2,7), x0=int(r,-6,7), b=-a*x0;
      const p=optionPack(r,x0,[x0+1,x0-1,-x0]);
      if(!p)return null;
      return {...p,q:`Qual é o zero de f(x)=${a}x${b>=0?"+":""}${b}?`,
        sol:`${a}x${b>=0?"+":""}${b}=0 ⇔ x=${x0}.`,
        hyp:"Pode haver dificuldade em ligar o zero da função à equação f(x)=0."};
    }
  },
  {
    templateId:"T10G-MIDPOINT",themeId:"10-ga",focus:"Coordenadas",difficulty:2,cognitive:"Aplicação",
    build(r){
      const x1=int(r,-5,4),y1=int(r,-5,4);
      const mx=int(r,-3,5),my=int(r,-3,5);
      const x2=2*mx-x1,y2=2*my-y1;
      const correct=`(${mx},${my})`;
      const p=optionPack(r,correct,[`(${x1+x2},${y1+y2})`,`(${mx+1},${my})`,`(${mx},${my-1})`],x=>x);
      if(!p)return null;
      return {...p,q:`Qual é o ponto médio de A(${x1},${y1}) e B(${x2},${y2})?`,
        sol:`M=((${x1}+${x2})/2,(${y1}+${y2})/2)=(${mx},${my}).`,
        hyp:"Pode haver dificuldade em calcular a média de cada coordenada."};
    }
  },
  {
    templateId:"T11T-PYTHAG",themeId:"11-trig",focus:"Razões trigonométricas",difficulty:2,cognitive:"Aplicação",
    build(r){
      const triples=[[3,4,5],[5,12,13],[8,15,17]];
      const [a,b,c]=pick(r,triples);
      const useA=r()>.5;
      const sin=useA?a/c:b/c, cos=useA?b/c:a/c;
      const fracSin=useA?`${a}/${c}`:`${b}/${c}`;
      const fracCos=useA?`${b}/${c}`:`${a}/${c}`;
      const wrong1=useA?`${a}/${b}`:`${b}/${a}`;
      const wrong2=useA?`${c}/${b}`:`${c}/${a}`;
      const wrong3=fracSin;
      const p=optionPack(r,fracCos,[wrong1,wrong2,wrong3],x=>x);
      if(!p)return null;
      return {...p,q:`Num ângulo agudo, sin(x)=${fracSin}. Quanto vale cos(x)?`,
        sol:`Pela identidade sin²x+cos²x=1, obtém-se cos(x)=${fracCos}.`,
        hyp:"Pode faltar a identidade fundamental ou a interpretação do sinal no 1.º quadrante."};
    }
  },
  {
    templateId:"T11C-COMB2",themeId:"11-cont",focus:"Combinações",difficulty:2,cognitive:"Aplicação",
    build(r){
      const n=int(r,5,10), correct=comb(n,2);
      const p=optionPack(r,correct,[n*(n-1),n*2,n+2]);
      if(!p)return null;
      return {...p,q:`De ${n} pessoas, quantos pares diferentes podem ser formados?`,
        sol:`A ordem não interessa: C(${n},2)=${correct}.`,
        hyp:"Pode estar a tratar uma escolha sem ordem como se fosse ordenada."};
    }
  },
  {
    templateId:"T11D-POWER",themeId:"11-cd",focus:"Derivadas",difficulty:2,cognitive:"Procedimento",
    build(r){
      const a=int(r,2,6),n=int(r,2,5),coef=a*n,pow=n-1;
      const correct=pow===1?`${coef}x`:`${coef}x^${pow}`;
      const d1=pow===1?`${a}x`:`${a}x^${pow}`;
      const d2=`${coef}x^${n}`;
      const d3=pow===1?`${n}x`:`${n}x^${pow}`;
      const p=optionPack(r,correct,[d1,d2,d3],x=>x);
      if(!p)return null;
      return {...p,q:`Qual é a derivada de f(x)=${a}x^${n}?`,
        sol:`Pela regra da potência: f'(x)=${coef}x^${pow}.`,
        hyp:"Pode haver dificuldade na regra da potência ou no produto pelo expoente."};
    }
  },
  {
    templateId:"T12C-MOD",themeId:"12-cplx",focus:"Módulo e argumento",difficulty:2,cognitive:"Aplicação",
    build(r){
      const triples=[[3,4,5],[5,12,13],[8,15,17]];
      let [a,b,c]=pick(r,triples);
      if(r()>.5)a=-a;if(r()>.5)b=-b;
      const p=optionPack(r,c,[Math.abs(a),Math.abs(b),Math.abs(a)+Math.abs(b)]);
      if(!p)return null;
      return {...p,q:`Qual é o módulo de z=${a}${b>=0?"+":""}${b}i?`,
        sol:`|z|=√(${a}²+${b}²)=${c}.`,
        hyp:"Pode haver dificuldade no cálculo do módulo de um número complexo."};
    }
  },
  {
    templateId:"T12P-COND",themeId:"12-prob",focus:"Probabilidade condicionada",difficulty:3,cognitive:"Aplicação",
    build(r){
      const pb=pick(r,[0.4,0.5,0.6,0.8]);
      const cond=pick(r,[0.2,0.25,0.3,0.5,0.75]);
      const inter=Math.round(pb*cond*1000)/1000;
      const correct=cond;
      const vals=[inter,pb,Math.min(.99,Math.round((pb-inter)*1000)/1000)];
      const p=optionPack(r,correct,vals,dec);
      if(!p)return null;
      return {...p,q:`P(A∩B)=${dec(inter)} e P(B)=${dec(pb)}. Quanto vale P(A|B)?`,
        sol:`P(A|B)=P(A∩B)/P(B)=${dec(inter)}/${dec(pb)}=${dec(cond)}.`,
        hyp:"Pode haver dificuldade no significado ou cálculo da probabilidade condicionada."};
    }
  },
  {
    templateId:"T12E-EXP",themeId:"12-expl",focus:"Equações",difficulty:2,cognitive:"Aplicação",
    build(r){
      const base=int(r,2,5),exp=int(r,2,4),value=base**exp;
      const p=optionPack(r,exp,[exp+1,Math.max(1,exp-1),base]);
      if(!p)return null;
      return {...p,q:`Qual é a solução de ${base}^x=${value}?`,
        sol:`${value}=${base}^${exp}, logo x=${exp}.`,
        hyp:"Pode haver dificuldade em reconhecer potências equivalentes numa equação exponencial."};
    }
  },
  {
    templateId:"T12L-POLYLIM",themeId:"12-fcont",focus:"Limites",difficulty:2,cognitive:"Aplicação",
    build(r){
      const a=int(r,1,5),b=int(r,-4,4),x=int(r,-3,4),correct=a*x*x+b;
      const p=optionPack(r,correct,[a*x+b,a*x*x-b,correct+1]);
      if(!p)return null;
      return {...p,q:`Quanto vale lim(x→${x}) (${a}x²${b>=0?"+":""}${b})?`,
        sol:`Sendo um polinómio contínuo, substitui-se x=${x}: ${a}×${x}²${b>=0?"+":""}${b}=${correct}.`,
        hyp:"Pode haver dificuldade em reconhecer que um polinómio é contínuo e permite substituição direta."};
    }
  }
];

export function generatorTemplates(themeId,focus=null){
  return TEMPLATES.filter(t=>t.themeId===themeId && (!focus || t.focus===focus));
}

export function hasGenerator(themeId,focus=null){
  return generatorTemplates(themeId,focus).length>0;
}

export function generateVariants({themeId,focus=null,difficulty=2,count=4,salt=""}){
  const templates=generatorTemplates(themeId,focus);
  if(!templates.length)return [];
  const out=[];
  let attempt=0;

  while(out.length<count && attempt<count*10){
    const t=templates[attempt%templates.length];
    const seed=hashString(`${t.templateId}|${salt}|${attempt}`);
    const r=rng(seed);
    const core=t.build(r);
    attempt++;
    if(!core)continue;

    const q={
      ...core,
      id:`GEN-${t.templateId}-${seed}`,
      templateId:t.templateId,
      variantSeed:seed,
      themeId:t.themeId,
      focus:t.focus,
      difficulty:t.difficulty,
      cognitive:t.cognitive,
      signature:`${t.themeId}:${t.focus}:${t.templateId}`,
      contexts:["mission","training"],
      generated:true,
      reviewStatus:"prototype",
      validation:{
        method:"deterministic-template",
        status:"validated",
        templateId:t.templateId,
        seed
      }
    };

    if(validateGeneratedItem(q))out.push(q);
  }

  return out;
}
