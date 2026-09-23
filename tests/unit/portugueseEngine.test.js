import {describe,expect,it} from "vitest";
import {
  assessPortugueseRubricCriterion,
  assessPortugueseRubricObservation,
  gradePortugueseResponse,
  normalizePortugueseAnswer,
  portugueseObservationAction,
  portugueseRevisionCompare,
  portugueseRevisionEvidenceCompare,
  portugueseRubricGuidance,
  portugueseWordCount,
  restorePortugueseRubricEvidence,
  revisePortugueseResponse,
  rubricEvidenceSnapshot,
  rubricObservationEvidenceSnapshot
} from "../../app/lib/portugueseEngine.js";

const multipleChoice={
  id:"pt-test-mcq",
  responseType:"multiple-choice",
  answerIndex:2,
  maxPoints:4,
  gradingMode:"deterministic"
};

const shortAnswer={
  id:"pt-test-short",
  responseType:"short-answer",
  acceptedAnswers:["Os Lusíadas","Lusíadas"],
  maxPoints:3,
  gradingMode:"deterministic"
};

const restricted={
  id:"pt-test-restricted",
  responseType:"restricted-response",
  maxPoints:8,
  wordLimit:{min:4,max:12},
  rubric:{
    criteria:[
      {
        id:"c1",
        label:"Identifica a ideia central",
        points:4,
        observations:[
          {id:"o1",label:"Apresenta a ideia central"},
          {id:"o2",label:"Relaciona-a com o texto"}
        ]
      },
      {
        id:"c2",
        label:"Justifica com evidência",
        points:4,
        observations:[
          {id:"o3",label:"Inclui evidência textual"}
        ]
      }
    ]
  }
};

describe("normalização e contagem",()=>{
  it("normaliza acentos, pontuação e caixa",()=>{
    expect(normalizePortugueseAnswer("  OS «LUSÍADAS»! ")).toBe("os lusiadas");
  });

  it("conta palavras de forma estável com espaços múltiplos",()=>{
    expect(portugueseWordCount("  uma   resposta\ncom quatro palavras ")).toBe(5);
    expect(portugueseWordCount("")).toBe(0);
  });
});

describe("correção determinística",()=>{
  it("corrige escolha múltipla correta",()=>{
    expect(gradePortugueseResponse(multipleChoice,2)).toMatchObject({
      final:true,status:"final",correct:true,points:4,maxPoints:4
    });
  });

  it("corrige escolha múltipla errada sem inventar crédito parcial",()=>{
    expect(gradePortugueseResponse(multipleChoice,1)).toMatchObject({
      final:true,status:"final",correct:false,points:0
    });
  });

  it("mantém escolha múltipla sem resposta como unanswered",()=>{
    expect(gradePortugueseResponse(multipleChoice,null)).toMatchObject({
      final:true,status:"unanswered",correct:null,points:null
    });
  });

  it("aceita equivalência textual normalizada em resposta curta",()=>{
    expect(gradePortugueseResponse(shortAnswer,"os lusiadas")).toMatchObject({
      final:true,status:"final",correct:true,points:3
    });
  });

  it("rejeita resposta curta não prevista",()=>{
    expect(gradePortugueseResponse(shortAnswer,"Mensagem")).toMatchObject({
      final:true,status:"final",correct:false,points:0
    });
  });
});

describe("respostas abertas e grelha",()=>{
  it("não atribui classificação final automática a resposta restrita",()=>{
    const result=gradePortugueseResponse(restricted,"Esta resposta apresenta uma ideia central clara.");
    expect(result).toMatchObject({
      final:false,
      status:"awaiting-rubric",
      points:null,
      correct:null,
      gradingMode:"rubric-assisted-provisional",
      rubricCompleted:false
    });
  });

  it("regista cumprimento do limite de palavras sem o converter em nota",()=>{
    const within=gradePortugueseResponse(restricted,"uma resposta com cinco palavras");
    const outside=gradePortugueseResponse(restricted,"duas palavras");
    expect(within.wordLimit.within).toBe(true);
    expect(outside.wordLimit.within).toBe(false);
    expect(outside.points).toBeNull();
  });

  it("autoavalia uma observação e preserva evidência do texto",()=>{
    let result=gradePortugueseResponse(restricted,"A resposta apresenta a ideia central e explica a relação.");
    result=assessPortugueseRubricObservation(result,"c1","o1","partial");
    const observation=result.criteria[0].observations.find(row=>row.id==="o1");
    expect(observation.status).toBe("partial");
    expect(observation.studentEvidence).toEqual(["A resposta apresenta a ideia central e explica a relação."]);
    expect(result.finalScore).toBeNull();
  });

  it("só marca a grelha concluída quando todas as observações têm estado válido",()=>{
    let result=gradePortugueseResponse(restricted,"A resposta apresenta a ideia central e usa evidência.");
    result=assessPortugueseRubricObservation(result,"c1","o1","observed");
    result=assessPortugueseRubricObservation(result,"c1","o2","observed");
    expect(result.rubricCompleted).toBe(false);
    result=assessPortugueseRubricObservation(result,"c2","o3","partial");
    expect(result.rubricCompleted).toBe(true);
    expect(result.status).toBe("self-assessed-awaiting-review");
    expect(result.finalScore).toBeNull();
  });

  it("autoavalia um critério inteiro sem gerar nota final",()=>{
    let result=gradePortugueseResponse(restricted,"Uma resposta suficientemente longa para avaliação guiada.");
    result=assessPortugueseRubricCriterion(result,"c1","observed");
    expect(result.criteria[0].status).toBe("observed");
    expect(result.criteria[0].observations.every(row=>row.status==="observed")).toBe(true);
    expect(result.finalScore).toBeNull();
  });

  it("produz snapshots de critérios e observações",()=>{
    let result=gradePortugueseResponse(restricted,"Uma resposta suficientemente longa para ficar guardada.");
    result=assessPortugueseRubricObservation(result,"c1","o1","observed");
    expect(rubricEvidenceSnapshot(result)).toContainEqual({criterionId:"c1",evidence:"pending"});
    expect(rubricObservationEvidenceSnapshot(result)).toContainEqual(expect.objectContaining({
      criterionId:"c1",observationId:"o1",evidence:"observed"
    }));
  });

  it("restaura evidência apenas quando o rubricId corresponde",()=>{
    let result=gradePortugueseResponse(restricted,"Uma resposta suficientemente longa para ser restaurada.");
    result=assessPortugueseRubricObservation(result,"c1","o1","observed");
    const snapshot={
      rubricId:result.rubricId,
      responseText:result.responseText,
      rubricObservationEvidence:rubricObservationEvidenceSnapshot(result)
    };
    const restored=restorePortugueseRubricEvidence(restricted,snapshot);
    expect(restored.criteria[0].observations.find(row=>row.id==="o1").status).toBe("observed");
    expect(restorePortugueseRubricEvidence(restricted,{...snapshot,rubricId:"stale"})).toBeNull();
  });
});

describe("revisão pedagógica",()=>{
  it("preserva a versão anterior ao rever uma resposta aberta",()=>{
    const first=gradePortugueseResponse(restricted,"Primeira resposta com uma ideia ainda pouco desenvolvida.");
    const revised=revisePortugueseResponse(restricted,first,"Segunda resposta com uma ideia mais desenvolvida e clara.");
    expect(revised.revisionCount).toBe(1);
    expect(revised.previousResponseText).toBe(first.responseText);
    expect(revised.revisionHistory).toHaveLength(1);
    expect(revised.points).toBeNull();
  });

  it("compara versões sem fingir melhoria académica automática",()=>{
    expect(portugueseRevisionCompare("uma ideia simples","uma ideia simples mais clara")).toMatchObject({
      changed:true,beforeWords:3,afterWords:5
    });
  });

  it("classifica evolução de evidência sem produzir nota",()=>{
    let current=gradePortugueseResponse(restricted,"Uma resposta suficientemente longa para comparar evidência.");
    current=assessPortugueseRubricObservation(current,"c1","o1","observed");
    const comparison=portugueseRevisionEvidenceCompare([
      {criterionId:"c1",observationId:"o1",evidence:"partial"}
    ],current);
    expect(comparison.find(row=>row.observationId==="o1")).toMatchObject({
      before:"partial",after:"observed",direction:"improved"
    });
  });

  it("orientação pedagógica prioriza elementos em falta sem nota final",()=>{
    let result=gradePortugueseResponse(restricted,"Uma resposta suficientemente longa para receber orientação.");
    result=assessPortugueseRubricObservation(result,"c1","o1","not-observed");
    result=assessPortugueseRubricObservation(result,"c1","o2","partial");
    const guidance=portugueseRubricGuidance(result);
    expect(guidance.reviewObservations.some(row=>row.status==="not-observed")).toBe(true);
    expect(guidance.nextAction).toMatch(/Acrescenta/u);
    expect(guidance.finalScore).toBeNull();
  });

  it("gera ações diferentes para falta, parcial e incerteza",()=>{
    expect(portugueseObservationAction({status:"not-observed"}).title).toMatch(/Falta/u);
    expect(portugueseObservationAction({status:"partial"}).title).toMatch(/incompleto/u);
    expect(portugueseObservationAction({status:"unsure"}).title).toMatch(/confirmar/u);
  });
});
