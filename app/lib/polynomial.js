// Exact, bounded polynomial comparison. No eval, sampling or variable division.
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b){[a,b]=[b,a%b]}return a||1n;};
const rational=(n,d=1n)=>{if(!d)throw Error("division by zero");const g=gcd(n,d);return d<0n?[-n/g,-d/g]:[n/g,d/g];};
const add=(a,b)=>rational(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const mul=(a,b)=>rational(a[0]*b[0],a[1]*b[1]);
const zero=()=>[0n,1n];
const trim=p=>{while(p.length>1&&p.at(-1)[0]===0n)p.pop();return p;};
function sum(a,b,sign=1n){return trim(Array.from({length:Math.max(a.length,b.length)},(_,i)=>add(a[i]||zero(),mul(b[i]||zero(),[sign,1n]))));}
function product(a,b){
  if(a.length+b.length>14)throw Error("degree limit");
  const p=Array.from({length:a.length+b.length-1},zero);
  a.forEach((x,i)=>b.forEach((y,j)=>{p[i+j]=add(p[i+j],mul(x,y));}));return trim(p);
}
export function canonicalPolynomial(source){
  try{
    const input=String(source).replace(/\s/g,"").replace(/−/g,"-").replace(/²/g,"^2").replace(/³/g,"^3").replace(/[×·]/g,"*").replace(/,/g,".");
    if(!input||input.length>200||/[^0-9x.+*/^()-]/.test(input))return null;
    const tokens=input.match(/\d+(?:\.\d+)?|\.\d+|[x.+*/^()-]/g)||[];
    if(tokens.join("")!==input||tokens.length>100)return null;
    let i=0;
    function atom(){
      const t=tokens[i++];
      if(t==="x")return [zero(),[1n,1n]];
      if(t==="("){const p=expression();if(tokens[i++]!==")")throw Error("parenthesis");return p;}
      if(!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(t||""))throw Error("number");
      const decimals=t.includes(".")?t.length-t.indexOf(".")-1:0;
      if(t.length>16)throw Error("number limit");return [rational(BigInt(t.replace(".","")),10n**BigInt(decimals))];
    }
    function power(){let p=atom();if(tokens[i]==="^"){i++;const n=tokens[i++];if(!/^[0-6]$/.test(n||""))throw Error("power");const a=p;p=[[1n,1n]];for(let k=0;k<Number(n);k++)p=product(p,a);}return p;}
    function unary(){if(tokens[i]==="+"){i++;return unary();}if(tokens[i]==="-"){i++;return product([[-1n,1n]],unary());}return power();}
    function term(){
      let p=unary();
      while(i<tokens.length){
        const op=tokens[i];const implicit=op==="x"||op==="(";
        if(op!=="*"&&op!=="/"&&!implicit)break;
        if(!implicit)i++;const q=unary();
        if(op==="/"){if(q.length!==1||!q[0][0])throw Error("variable divisor");p=product(p,[rational(q[0][1],q[0][0])]);}
        else p=product(p,q);
      }return p;
    }
    function expression(){let p=term();while(tokens[i]==="+"||tokens[i]==="-"){const op=tokens[i++];p=sum(p,term(),op==="+"?1n:-1n);}return p;}
    const p=expression();if(i!==tokens.length)return null;
    return p.map(([n,d])=>`${n}/${d}`).join(",");
  }catch{return null;}
}
export function equivalentPolynomial(a,b){const x=canonicalPolynomial(a),y=canonicalPolynomial(b);return x!==null&&y!==null&&x===y;}
