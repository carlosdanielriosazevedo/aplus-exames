import {describe,expect,it} from "vitest";
import {PHYSICS_CHEMISTRY_A_SUBTOPICS} from "../../app/data/physicsChemistryTaxonomy";
import {
  PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS,
  physicsChemistryDeepReviewContentFor
} from "../../app/data/physicsChemistryDeepReviewRegistry";

const REQUIRED={
  "q10-elements":[
    "q10-atom-structure","q10-amount-molar","q10-spectra","q10-electron-config","q10-periodicity"
  ],
  "q10-matter":[
    "q10-bonding","q10-geometry-polarity","q10-carbon","q10-intermolecular","q10-gases-solutions","q10-enthalpy","q10-photochemistry"
  ],
  "f10-energy":[
    "f10-energy-motion","f10-work","f10-mechanical-energy","f10-electric","f10-thermal-radiation","f10-thermodynamics"
  ],
  "f11-mechanics":[
    "f11-kinematics","f11-interactions","f11-newton-gravity","f11-forces-motion","f11-circular","f11-experimental-motion"
  ],
  "f11-waves":[
    "f11-waves-signals","f11-sound","f11-fields","f11-induction","f11-em-waves","f11-optics"
  ],
  "q11-equilibrium":[
    "q11-stoichiometry","q11-limiting-yield","q11-equilibrium-state","q11-kq","q11-lechatelier","q11-green-industry"
  ],
  "q11-aqueous":[
    "q11-acid-base","q11-ph","q11-titration","q11-redox","q11-electrochem","q11-solubility","q11-ksp"
  ]
};

const REQUIRED_DOMAIN_IDS=Object.keys(REQUIRED);

describe("Rever Matéria · gate transversal de Física e Química A",()=>{
  it("cobre todos e apenas os sete domínios atuais da taxonomia",()=>{
    const taxonomyDomains=[...new Set(PHYSICS_CHEMISTRY_A_SUBTOPICS.map(row=>row.domain))].sort();
    expect(REQUIRED_DOMAIN_IDS.slice().sort()).toEqual(taxonomyDomains);
    expect(PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS.slice().sort()).toEqual(taxonomyDomains);
    for(const domainId of REQUIRED_DOMAIN_IDS){
      expect(physicsChemistryDeepReviewContentFor(domainId),domainId).not.toBeNull();
    }
  });

  it("mantém as 43 submatérias da taxonomia sem perdas nem duplicados",()=>{
    const all=[];
    for(const [domainId,expected] of Object.entries(REQUIRED)){
      const study=physicsChemistryDeepReviewContentFor(domainId);
      const actual=study.sections.map(section=>section.id);
      const taxonomyForDomain=PHYSICS_CHEMISTRY_A_SUBTOPICS.filter(row=>row.domain===domainId).map(row=>row.id);
      expect(actual,domainId).toEqual(expected);
      expect(actual,`${domainId}: divergência da taxonomia`).toEqual(taxonomyForDomain);
      expect(new Set(actual).size,`${domainId}: IDs duplicados`).toBe(actual.length);
      all.push(...actual);
    }
    expect(all.length).toBe(43);
    expect(new Set(all).size).toBe(43);
    expect(all.slice().sort()).toEqual(PHYSICS_CHEMISTRY_A_SUBTOPICS.map(row=>row.id).sort());
  });

  it("mantém o contrato editorial profundo em todos os domínios",()=>{
    for(const domainId of REQUIRED_DOMAIN_IDS){
      const study=physicsChemistryDeepReviewContentFor(domainId);
      expect(study.id,domainId).toBe(domainId);
      expect(study.title,domainId).toBeTruthy();
      expect(study.lead,domainId).toBeTruthy();
      expect(study.goals.length,domainId).toBeGreaterThanOrEqual(3);
      expect(study.sourceBasis.length,domainId).toBeGreaterThanOrEqual(2);
      expect(study.sourceBasis.join(" "),domainId).toMatch(/DGE/iu);
      for(const section of study.sections){
        expect(section.kicker,section.id).toBeTruthy();
        expect(section.title,section.id).toBeTruthy();
        expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.example?.result,section.id).toBeTruthy();
        expect(section.example?.note,section.id).toBeTruthy();
        expect(section.remember,section.id).toBeTruthy();
        expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("mantém o registo sem domínios inexistentes ou providers órfãos",()=>{
    for(const domainId of PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS){
      expect(REQUIRED_DOMAIN_IDS).toContain(domainId);
      const study=physicsChemistryDeepReviewContentFor(domainId);
      expect(study?.id,domainId).toBe(domainId);
    }
  });
});
