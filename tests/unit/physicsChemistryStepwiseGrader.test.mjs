import {describe,expect,it} from "vitest";
import {gradePhysicsChemistryStepwise,processDenied,declaredRoundingHalfUnit} from "../../app/lib/physicsChemistryStepwiseGrader.js";
import {PHYSICS_CHEMISTRY_A_AUTHENTICITY_WAVE3} from "../../app/data/physicsChemistryAuthenticityWave3.js";
import {physicsChemistryConstructedItemById} from "../../app/data/physicsChemistryConstructed.js";

// Auditoria externa 2026-11-23 (C-01): respostas que negam o próprio processo
// recebiam 12/12 porque a relação era reconhecida por correspondência de texto.
const item=id=>physicsChemistryConstructedItemById(id);

describe("corretor por etapas de FQ A · processo negado",()=>{
  it("os três casos do auditor deixam de receber pontuação automática",()=>{
    const cases=[
      ["FQA-C-ELEM-01",{n:{work:"Não se aplica n=m/M; não fiz o cálculo.",result:"0.200",unit:"mol"},N:{work:"Não se aplica N=n*NA; não fiz o cálculo.",result:"1.204e23",unit:"átomos"}}],
      ["FQA-C-MAT-01",{n:{work:"Não se aplica n=cV; não fiz o cálculo.",result:"0.0200",unit:"mol"},V:{work:"Não se aplica V=n/c; não fiz o cálculo.",result:"0.0400",unit:"dm³"}}],
      ["FQA-C-ENE-01",{Ec:{work:"Não se aplica W=ΔEc; não fiz o cálculo.",result:"36",unit:"J"},v:{work:"Não se aplica v=√(2Ec/m); não fiz o cálculo.",result:"6.0",unit:"m s⁻¹"}}]
    ];
    for(const [id,steps] of cases){
      const result=gradePhysicsChemistryStepwise(item(id),{steps});
      expect(result.provisionalPoints,id).toBe(null);
      expect(result.requiresReview,id).toBe(true);
      expect(result.steps.every(step=>step.status==="contradiction-review"),id).toBe(true);
    }
  });

  it("uma resposta legítima continua a receber a pontuação completa",()=>{
    const result=gradePhysicsChemistryStepwise(item("FQA-C-ELEM-01"),{steps:{
      n:{work:"n = m/M = 5,40/27,0",result:"0,200",unit:"mol"},
      N:{work:"N = n × NA = 0,200 × 6,02×10²³",result:"1,204×10^23",unit:"átomos"}
    }});
    expect(result.requiresReview).toBe(false);
    expect(result.provisionalPoints).toBe(12);
  });

  it("um erro de cálculo com a relação certa mantém o desconto de 1 ponto (erro tipo 1)",()=>{
    const result=gradePhysicsChemistryStepwise(item("FQA-C-ELEM-01"),{steps:{
      n:{work:"n = m/M",result:"0,200",unit:"mol"},
      N:{work:"N = n × NA",result:"1,40×10^23",unit:"átomos"}
    }});
    expect(result.type1Count).toBe(1);
    expect(result.provisionalPoints).toBe(11);
  });

  it("deteta negações do processo sem confundir frases normais de resolução",()=>{
    for(const text of ["Não fiz o cálculo","nao usei a formula","Não se aplica E=mc","não sei","sem fazer contas","chutei","A relação não é válida aqui"]){
      expect(processDenied(text),text).toBe(true);
    }
    for(const text of ["n = m/M = 0,200 mol","Não é necessário converter unidades: n = m/M","Como a massa não varia, Ec = ½mv²","v = √(2Ec/m)",""]){
      expect(processDenied(text),text).toBe(false);
    }
  });
});

// Auditoria externa 2026-11-23 (B-02) e notação científica escrita no telemóvel.
const wave3=id=>PHYSICS_CHEMISTRY_A_AUTHENTICITY_WAVE3.find(row=>row.id===id);

describe("corretor por etapas de FQ A · números e arredondamentos",()=>{
  it("lê a notação científica como os alunos a escrevem",()=>{
    for(const written of ["1,204×10^23","1,204×10²³","1,204x10^23","1,204 x 10^23","1.204E23","1,2*10^23","1,204·10^23","1,20 × 10^(23)"]){
      const result=gradePhysicsChemistryStepwise(item("FQA-C-ELEM-01"),{steps:{
        n:{work:"n = m/M",result:"0,200",unit:"mol"},
        N:{work:"N = n × NA",result:written,unit:"átomos"}
      }});
      expect(result.steps[1].status,written).toBe("correct");
      expect(result.provisionalPoints,written).toBe(12);
    }
  });

  it("aceita arredondamentos corretos a 2 algarismos significativos e continua a detetar erros reais",()=>{
    const answer=written=>gradePhysicsChemistryStepwise(item("FQA-C-ELEM-01"),{steps:{
      n:{work:"n = m/M",result:"0,200",unit:"mol"},
      N:{work:"N = n × NA",result:written,unit:"átomos"}
    }}).steps[1].status;
    expect(answer("1,2×10^23")).toBe("correct");
    expect(answer("120 400 000 000 000 000 000 000")).toBe("correct");
    expect(answer("1,3×10^23")).toBe("numeric-error");
    expect(answer("1×10^23")).toBe("numeric-error");
  });

  it("itens sem política automática (ex.: FQA-W3-C-ENE-01) ficam por rever, sem falso erro",()=>{
    const result=gradePhysicsChemistryStepwise(wave3("FQA-W3-C-ENE-01"),{steps:{
      joule:{work:"E = P × Δt = 1200 × 480",result:"5,8×10^5",unit:"J"},
      kwh:{work:"E = P × Δt",result:"0,16",unit:"kWh"}
    }});
    expect(result.provisionalPoints).toBe(null);
    expect(result.steps.some(step=>step.status==="numeric-error")).toBe(false);
  });

  it("aceita [H₃O⁺] e [OH⁻] com os algarismos significativos que o pH 3,40 justifica",()=>{
    const result=gradePhysicsChemistryStepwise(item("FQA-C-AQ-01"),{steps:{
      h:{work:"[H3O+] = 10^-pH",result:"4,0×10^-4",unit:"mol dm-3"},
      oh:{work:"[OH-] = Kw/[H3O+]",result:"2,5×10^-11",unit:"mol dm-3"}
    }});
    expect(result.steps.map(step=>step.status)).toEqual(["correct","correct"]);
  });

  it("a tolerância declarada só conta com pelo menos 2 algarismos significativos",()=>{
    expect(declaredRoundingHalfUnit("5,8×10⁵")).toBeCloseTo(5000);
    expect(declaredRoundingHalfUnit("0,160")).toBeCloseTo(0.0005);
    expect(declaredRoundingHalfUnit("576 000")).toBeCloseTo(500);
    expect(declaredRoundingHalfUnit("6×10^5")).toBe(0);
    expect(declaredRoundingHalfUnit("0,2")).toBe(0);
    expect(declaredRoundingHalfUnit("")).toBe(0);
  });
});

