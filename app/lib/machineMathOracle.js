
function norm(value){
  return String(value??"")
    .normalize("NFKC")
    .replace(/[−–—]/g,"-")
    .replace(/\s+/g," ")
    .trim();
}

const expected={
  "M10G-1":()=>`(${3-(-1)},${5-2})`,
  "M11C-2":()=>String(10*10),
  "M11D-1":()=>"6x−2",
  "M12E-1":()=>String(3),
  "M11T-5":()=>"π/2 e 3π/2",
  "M11D-4":()=>"3x²",
  "M12L-5":()=>String(2**2+1),
  "BG10F-REP-1":()=>`f(x)=${(7-3)/(2-0)}x+3`,
  "BG12FC-ASS-1":()=>"x=3",
  "BG12E-EXP-1":()=>String(2),

  "CV51-11CD-TV-1":()=>`${((3**2+2*3)-(1**2+2*1))/(3-1)} m/s`,
  "CV51-11CD-TV-2":()=>String(6*2),
  "CV51-11CD-OPT-2":()=>String(6/2),
  "CV51-12FCD-COMP-1":()=>String((2*2+1)**2),
  "CV51-12FCD-RC-1":()=>"12(3x−1)³",
  "CV51-12FCD-RC-2":()=>"1/√(2x+5)",
  "CV51-12FCD-APL-1":()=>`${2*2*2}π`,
  "CV51-12FCD-APL-2":()=>String(4*1*(1**2+1)),
  "CV51-12PROB-LAP-1":()=>"1/2",
  "CV51-12PROB-LAP-2":()=>"3/10",
  "CV51-12INT-AREA-1":()=>String(2**2),
  "CV51-10GA-VET-2":()=>`(${2+3},${-1+4})`,
  "CV51-11CONT-PM-2":()=>String(4*3),
  "CV51-11TRIG-EQ-2":()=>"0, π e 2π"
};

export const MACHINE_ORACLE_IDS=Object.freeze(Object.keys(expected));

export function machineOracleCheck(item){
  const fn=expected[item?.id];
  if(!fn){
    return {
      supported:false,
      passed:false,
      status:"unsupported",
      method:null,
      expected:null,
      actual:item?.o?.[item?.a]??null
    };
  }
  const expectedValue=fn();
  const actual=item?.o?.[item?.a];
  const passed=norm(expectedValue)===norm(actual);
  return {
    supported:true,
    passed,
    status:passed?"validated_local_oracle":"invalid_local_oracle",
    method:item?.origin==="original_v5_1"
      ?"deterministic-answer-oracle-v5.1"
      :"deterministic-answer-oracle-legacy-priority-v1",
    expected:expectedValue,
    actual
  };
}
