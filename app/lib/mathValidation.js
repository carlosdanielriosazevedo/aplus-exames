
function gcd(a,b){
  a=Math.abs(a);b=Math.abs(b);
  while(b){[a,b]=[b,a%b]}
  return a||1;
}

function comb(n,k){
  if(!Number.isInteger(n)||!Number.isInteger(k)||n<0||k<0||k>n)return null;
  k=Math.min(k,n-k);
  let x=1;
  for(let i=1;i<=k;i++)x=x*(n-k+i)/i;
  return Math.round(x);
}

function dec(x){
  return String(Math.round(x*1000)/1000).replace(".",",");
}

function fmtPowerDerivative(coef,pow){
  if(pow===0)return String(coef);
  if(pow===1)return `${coef}x`;
  return `${coef}x^${pow}`;
}

function sameNumber(a,b,tol=1e-9){
  return Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=tol;
}

function normalizeText(x){
  return String(x??"").replace(/\s+/g,"").replace(/−/g,"-");
}

export function structuralQuestionCheck(q){
  const issues=[];
  if(!q?.id)issues.push("id_missing");
  if(!q?.themeId)issues.push("theme_missing");
  if(!q?.q)issues.push("prompt_missing");
  if(!Array.isArray(q?.o)||q.o.length!==4)issues.push("options_invalid");
  else if(new Set(q.o.map(String)).size!==4)issues.push("options_not_unique");
  if(!Number.isInteger(q?.a)||q.a<0||q.a>3)issues.push("correct_index_invalid");
  if(!q?.sol)issues.push("solution_missing");
  if(!q?.signature)issues.push("signature_missing");
  return {ok:issues.length===0,issues};
}

export function expectedAnswerFromWitness(w){
  if(!w?.kind)return {ok:false,reason:"witness_missing"};

  switch(w.kind){
    case "linear_zero":{
      const {a,b}=w;
      if(!Number.isFinite(a)||!Number.isFinite(b)||a===0)return {ok:false,reason:"invalid_coefficients"};
      const x=-b/a;
      if(!Number.isInteger(x))return {ok:false,reason:"non_integer_zero"};
      return {ok:true,value:String(x),numeric:x};
    }

    case "midpoint":{
      const {x1,y1,x2,y2}=w;
      const values=[x1,y1,x2,y2];
      if(!values.every(Number.isFinite))return {ok:false,reason:"invalid_coordinates"};
      const mx=(x1+x2)/2,my=(y1+y2)/2;
      if(!Number.isInteger(mx)||!Number.isInteger(my))return {ok:false,reason:"non_integer_midpoint"};
      return {ok:true,value:`(${mx},${my})`,numeric:[mx,my]};
    }

    case "trig_pythag":{
      const {sinNumerator,cosNumerator,hypotenuse}=w;
      if(![sinNumerator,cosNumerator,hypotenuse].every(Number.isFinite)||hypotenuse<=0){
        return {ok:false,reason:"invalid_triangle"};
      }
      if(!sameNumber(sinNumerator**2+cosNumerator**2,hypotenuse**2)){
        return {ok:false,reason:"pythagorean_identity_failed"};
      }
      const g=gcd(cosNumerator,hypotenuse);
      return {ok:true,value:`${cosNumerator/g}/${hypotenuse/g}`,numeric:cosNumerator/hypotenuse};
    }

    case "combination":{
      const value=comb(w.n,w.k);
      if(value===null)return {ok:false,reason:"invalid_combination"};
      return {ok:true,value:String(value),numeric:value};
    }

    case "power_derivative":{
      const {coefficient,exponent}=w;
      if(!Number.isFinite(coefficient)||!Number.isInteger(exponent)||exponent<1){
        return {ok:false,reason:"invalid_power"};
      }
      const coef=coefficient*exponent;
      const pow=exponent-1;
      return {ok:true,value:fmtPowerDerivative(coef,pow),numeric:{coef,pow}};
    }

    case "complex_modulus":{
      const {re,im}=w;
      if(!Number.isFinite(re)||!Number.isFinite(im))return {ok:false,reason:"invalid_complex"};
      const value=Math.sqrt(re**2+im**2);
      if(!Number.isInteger(value))return {ok:false,reason:"non_integer_modulus"};
      return {ok:true,value:String(value),numeric:value};
    }

    case "conditional_probability":{
      const {intersection,conditionProbability}=w;
      if(!Number.isFinite(intersection)||!Number.isFinite(conditionProbability)||conditionProbability<=0){
        return {ok:false,reason:"invalid_probability"};
      }
      const value=intersection/conditionProbability;
      if(value<0||value>1+1e-9)return {ok:false,reason:"probability_out_of_range"};
      return {ok:true,value:dec(value),numeric:value};
    }

    case "exponential_equation":{
      const {base,value}=w;
      if(!Number.isInteger(base)||base<=1||!Number.isInteger(value)||value<=0){
        return {ok:false,reason:"invalid_exponential"};
      }
      let p=1;
      for(let exp=0;exp<=12;exp++){
        if(p===value)return {ok:true,value:String(exp),numeric:exp};
        p*=base;
      }
      return {ok:false,reason:"integer_exponent_not_found"};
    }

    case "polynomial_limit":{
      const {a,b,x}=w;
      if(![a,b,x].every(Number.isFinite))return {ok:false,reason:"invalid_polynomial"};
      const value=a*x*x+b;
      return {ok:true,value:String(value),numeric:value};
    }

    default:
      return {ok:false,reason:`unknown_witness:${w.kind}`};
  }
}


function hashString(str){
  let h=2166136261;
  for(let i=0;i<str.length;i++){
    h^=str.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return (h>>>0).toString(16).padStart(8,"0");
}

export function mathValidationFingerprint(item){
  const payload={
    templateId:item?.templateId||null,
    themeId:item?.themeId||null,
    mathWitness:item?.mathWitness||null
  };
  return `mv1-${hashString(JSON.stringify(payload))}`;
}

export function externalValidationSpec(item){
  const w=item?.mathWitness;
  if(!w?.kind)return null;

  const specs={
    linear_zero:()=>`solve(${w.a}*x+(${w.b})=0,x)`,
    midpoint:()=>`midpoint((${w.x1},${w.y1}),(${w.x2},${w.y2}))`,
    trig_pythag:()=>`sqrt(1-(${w.sinNumerator}/${w.hypotenuse})^2)`,
    combination:()=>`binomial(${w.n},${w.k})`,
    power_derivative:()=>`d/dx (${w.coefficient}*x^${w.exponent})`,
    complex_modulus:()=>`abs(${w.re}+(${w.im})*i)`,
    conditional_probability:()=>`(${w.intersection})/(${w.conditionProbability})`,
    exponential_equation:()=>`solve(${w.base}^x=${w.value},x)`,
    polynomial_limit:()=>`limit(${w.a}*x^2+(${w.b}),x->${w.x})`
  };

  const build=specs[w.kind];
  if(!build)return null;
  return {
    schema:"math-validation-request-v1",
    questionId:item.id||null,
    templateId:item.templateId||null,
    kind:w.kind,
    fingerprint:mathValidationFingerprint(item),
    expression:build()
  };
}

export function validateGeneratedMath(item){
  const structural=structuralQuestionCheck(item);
  if(!structural.ok){
    return {
      method:"local-deterministic-v1",
      status:"invalid_local",
      passed:false,
      structural,
      reason:"structural_failure"
    };
  }

  const expected=expectedAnswerFromWitness(item.mathWitness);
  if(!expected.ok){
    return {
      method:"local-deterministic-v1",
      status:"invalid_local",
      passed:false,
      structural,
      reason:expected.reason
    };
  }

  const actual=item.o?.[item.a];
  const answerMatches=normalizeText(actual)===normalizeText(expected.value);
  const externalSpec=externalValidationSpec(item);

  return {
    method:"local-deterministic-v1",
    status:answerMatches?"validated_local":"invalid_local",
    passed:answerMatches,
    structural,
    witnessKind:item.mathWitness?.kind||null,
    fingerprint:mathValidationFingerprint(item),
    expectedAnswer:expected.value,
    actualAnswer:actual??null,
    answerMatches,
    externalSpec,
    reason:answerMatches?null:"correct_option_disagrees_with_witness"
  };
}

export function reconcileExternalValidation(localResult,externalResult){
  if(!localResult?.passed){
    return {
      status:"blocked_conflict",
      passed:false,
      local:localResult||null,
      external:externalResult||null,
      reason:"local_validation_failed"
    };
  }

  if(!externalResult || externalResult.status==="unavailable" || externalResult.status==="not_configured"){
    return {
      ...localResult,
      status:"validated_local",
      passed:true,
      external:externalResult||{status:"not_configured"}
    };
  }

  if(externalResult.status==="agree"){
    return {
      ...localResult,
      status:"validated_dual",
      passed:true,
      external:externalResult
    };
  }

  if(externalResult.status==="disagree"){
    return {
      ...localResult,
      status:"blocked_conflict",
      passed:false,
      external:externalResult,
      reason:"validator_disagreement"
    };
  }

  return {
    ...localResult,
    status:"validated_local",
    passed:true,
    external:externalResult
  };
}

export function curatedMathValidation(item){
  const structural=structuralQuestionCheck(item);
  return {
    method:"curated-structural-v1",
    status:structural.ok?"structural_only":"invalid_local",
    passed:structural.ok,
    structural,
    note:"Questão curada: a validação estrutural não substitui verificação matemática nem revisão pedagógica."
  };
}

export function mathValidationStatus(item){
  if(item?.generated)return validateGeneratedMath(item);
  return curatedMathValidation(item);
}
