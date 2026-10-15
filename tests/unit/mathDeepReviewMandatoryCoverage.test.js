import {describe,expect,it} from "vitest";
import {TAXONOMY} from "../../app/data/content";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const REQUIRED={
  "10-ele":["10-ele-majorias","10-ele-borda","10-ele-dhondt","10-ele-stlague-comparacao"],
  "10-fin":["10-fin-salarios","10-fin-bruto-liquido","10-fin-irs","10-fin-juro-simples","10-fin-juro-composto-credito"],
  "10-est":["10-est-problema-pop-amostra","10-est-amostragem","10-est-univariados-representacoes","10-est-localizacao","10-est-dispersao","10-est-bivariados-regressao"],
  "10-gs":["10-gs-propriedades-construcoes","10-gs-circuncentro-incentro","10-gs-baricentro-medianas","10-gs-ortocentro","10-gs-euler-nove-pontos"],
  "10-fun":["10-fun-conceito-representacoes","10-fun-dominio-imagem-zeros","10-fun-afim","10-fun-quadratica","10-fun-transformacoes-ramos-modulo"],
  "10-ga":["10-ga-coordenadas-transformacoes","10-ga-distancias-ponto-medio","10-ga-lugares-geometricos","10-ga-vetores","10-ga-colinearidade-retas","10-ga-espaco"],
  "11-trig":["11-trig-triangulos","11-trig-angulos-radianos","11-trig-circulo","11-trig-relacoes","11-trig-funcoes","11-trig-modelacao"],
  "11-pe":["11-pe-declive-inclinacao","11-pe-produto-coordenadas","11-pe-angulo-norma","11-pe-perpendicularidade","11-pe-retas-planos","11-pe-distancias"],
  "11-cont":["11-cont-adicao-multiplicacao","11-cont-diagramas","11-cont-fatorial","11-cont-permutacoes","11-cont-arranjos","11-cont-combinacoes"],
  "11-suc":["11-suc-termo-recorrencia","11-suc-pa","11-suc-pg","11-suc-somas","11-suc-modelacao-comportamento"],
  "11-fun":["11-fun-cubicas-quarticas","11-fun-divisao-polinomios","11-fun-resto-raizes","11-fun-operacoes","11-fun-racionais","11-fun-assintotas-modelacao"],
  "11-cd":["11-cd-taxa-media","11-cd-derivada-ponto","11-cd-tangente","11-cd-funcao-derivada","11-cd-regras","11-cd-monotonia-otimizacao"],
  "12-cplx":["12-cplx-unidade-equacoes","12-cplx-forma-algebrica","12-cplx-conjugado-modulo","12-cplx-operacoes-algebricas","12-cplx-argand","12-cplx-forma-trig","12-cplx-operacoes-trig"],
  "12-prob":["12-prob-fenomeno-acontecimentos","12-prob-propriedades","12-prob-condicionada","12-prob-produto-arvores","12-prob-contingencia-independencia","12-prob-total","12-prob-variaveis-discretas","12-prob-normal"],
  "12-expl":["12-expl-exponencial","12-expl-modelacao","12-expl-inversa-raizes","12-expl-logaritmica","12-expl-equacoes"],
  "12-fcd":["12-fcd-composicao","12-fcd-e-exponencial","12-fcd-log-trig-potencias","12-fcd-regras-cadeia","12-fcd-aplicacoes"],
  "12-fcont":["12-fcont-limites-continuidade","12-fcont-operacoes","12-fcont-lhopital","12-fcont-assintotas","12-fcont-estudo-global"],
  "12-rae":["12-rae-bolzano-localizacao","12-rae-bissecao","12-rae-newton"]
};

const REQUIRED_THEME_IDS=Object.keys(REQUIRED);
const PRELIMINARY_IDS=new Set(["11-trig-equacoes","12-fcont-derivabilidade"]);

describe("Rever Matéria · gate transversal do currículo obrigatório",()=>{
  it("cobre todos e apenas os 18 grandes temas obrigatórios do 10.º, 11.º e 12.º",()=>{
    const mandatoryTaxonomy=TAXONOMY
      .filter(theme=>["10.º","11.º","12.º"].includes(theme.year)&&!theme.optionalTrack)
      .map(theme=>theme.id)
      .sort();
    expect(REQUIRED_THEME_IDS.slice().sort()).toEqual(mandatoryTaxonomy);
    for(const themeId of REQUIRED_THEME_IDS){
      expect(MATH_DEEP_REVIEW_THEME_IDS,themeId).toContain(themeId);
      expect(mathDeepReviewContentFor(themeId),themeId).not.toBeNull();
    }
  });

  it("mantém todas as submatérias profundas oficiais, sem perdas, duplicados ou IDs preliminares",()=>{
    const all=[];
    for(const [themeId,expected] of Object.entries(REQUIRED)){
      const study=mathDeepReviewContentFor(themeId);
      const actual=study.sections.map(section=>section.id);
      expect(actual,themeId).toEqual(expected);
      expect(new Set(actual).size,`${themeId}: ids duplicados`).toBe(actual.length);
      for(const id of actual)expect(PRELIMINARY_IDS.has(id),id).toBe(false);
      all.push(...actual);
    }
    expect(new Set(all).size).toBe(all.length);
  });

  it("mantém o contrato editorial profundo em todas as secções obrigatórias",()=>{
    for(const themeId of REQUIRED_THEME_IDS){
      const study=mathDeepReviewContentFor(themeId);
      expect(study.id,themeId).toBe(themeId);
      expect(study.title,themeId).toBeTruthy();
      expect(study.lead,themeId).toBeTruthy();
      expect(study.goals.length,themeId).toBeGreaterThanOrEqual(3);
      expect(study.sourceBasis.length,themeId).toBeGreaterThanOrEqual(2);
      for(const section of study.sections){
        expect(section.kicker,section.id).toBeTruthy();
        expect(section.title,section.id).toBeTruthy();
        expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.example?.result,section.id).toBeTruthy();
        expect(section.remember,section.id).toBeTruthy();
        expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("deixa os temas opcionais do 12.º fora do gate obrigatório até serem convertidos",()=>{
    for(const themeId of ["12-ie","12-int","12-mat"]){
      expect(REQUIRED_THEME_IDS).not.toContain(themeId);
    }
  });
});
