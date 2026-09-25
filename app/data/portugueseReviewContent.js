import {PORTUGUESE_LITERARY_WORKS} from "./portugueseLiteraryWorks";
import {PORTUGUESE_TAXONOMY} from "./portugueseTaxonomy";
import {portugueseReviewGuide} from "./portugueseReviewGuides";

const WORK_UNIT_IDS={
  "poesia-trovadoresca":"pt10-trovadoresca","fernao-lopes-djoao-i":"pt10-fernao-lopes","gil-vicente-teatro":"pt10-gil-vicente","camoes-rimas":"pt10-camoes-rimas","os-lusiadas-reflexoes":"pt10-lusiadas",
  "sermao-santo-antonio":"pt11-vieira","frei-luis-de-sousa":"pt11-frei-luis","viagens-minha-terra":"pt11-romantismo-opcao","a-abobada":"pt11-romantismo-opcao","amor-perdicao":"pt11-romantismo-opcao","os-maias":"pt11-eca","ilustre-casa-ramires":"pt11-eca","antero-sonetos":"pt11-antero","cesario-ocidental":"pt11-cesario",
  "jorge-sena-poesia":"pt12-poesia-contemporanea","eugenio-andrade-poesia":"pt12-poesia-contemporanea","ana-luisa-amaral-poesia":"pt12-poesia-contemporanea","sempre-e-uma-companhia":"pt12-conto",george:"pt12-conto","familias-desavindas":"pt12-conto","pessoa-ortonimo":"pt12-pessoa-ortonimo","pessoa-heteronimos":"pt12-pessoa-heteronimos",mensagem:"pt12-mensagem","ano-morte-ricardo-reis":"pt12-saramago","memorial-do-convento":"pt12-saramago"
};

const DEEP_DIVES={
  "pessoa-ortonimo":{
    overview:"No Pessoa ortónimo, o poema encena uma consciência que se observa a sentir e a pensar. O fingimento não significa falsidade: é transformação estética da experiência, construída pela linguagem e pela forma.",
    connections:["Distinguir o eu biográfico da voz construída no poema.","Relacionar a dor de pensar com divisão, lucidez e perda da espontaneidade.","Ler sonho, infância e nostalgia como respostas à tensão entre consciência e felicidade."]
  },
  "pessoa-heteronimos":{
    overview:"Caeiro, Reis e Campos não são apenas nomes diferentes: cada um possui uma poética, uma linguagem e uma relação próprias com o mundo. A identificação deve partir de marcas do texto, nunca de uma etiqueta isolada.",
    connections:["Caeiro privilegia sensação imediata e recusa a interpretação metafísica.","Reis disciplina a emoção, aceita a brevidade da vida e procura medida clássica.","Campos oscila entre exaltação moderna, excesso sensacionista, cansaço e crise do eu."]
  },
  mensagem:{
    overview:"Mensagem reconstrói poeticamente a História de Portugal para interrogar uma missão futura. As figuras históricas tornam-se símbolos e o império projetado é sobretudo espiritual e cultural.",
    connections:["Ler Brasão, Mar Português e O Encoberto como etapas de fundação, realização e renovação.","Distinguir referência histórica, transformação mítica e valor simbólico.","Relacionar sebastianismo, nevoeiro e Quinto Império com ausência e expectativa de regeneração."]
  },
  "ano-morte-ricardo-reis":{
    overview:"O romance coloca o heterónimo Ricardo Reis na Lisboa de 1936 e confronta a sua atitude contemplativa com a violência da História. O diálogo com Fernando Pessoa expõe tensões entre distância, responsabilidade e participação.",
    connections:["Relacionar notícias, cidade e contexto político com a formação do sentido.","Analisar Ricardo Reis como personagem e não apenas como heterónimo poético.","Observar narrador interventivo, ironia, intertextualidade e fronteira instável entre vida e morte."]
  },
  "memorial-do-convento":{
    overview:"O romance cruza a construção do convento de Mafra com a história de Baltasar, Blimunda e Bartolomeu. A narrativa contrapõe o poder régio e religioso ao trabalho anónimo, ao amor e à capacidade humana de sonhar.",
    connections:["Contrastar História oficial e perspetiva dos trabalhadores e excluídos.","Interpretar a passarola e as vontades como imagens de liberdade e criação coletiva.","Observar narrador, ironia, pontuação e mistura de tempos como parte da visão crítica."]
  },
  "sempre-e-uma-companhia":{
    overview:"A chegada da telefonia à venda de Batola altera uma comunidade marcada pelo isolamento. O conto mostra como uma transformação material pode reconstruir relações, expectativas e pertença.",
    connections:["Caracterizar Batola antes e depois da instalação da telefonia.","Relacionar o espaço rural com solidão, rotina e abertura ao exterior.","Explicar o desfecho como mudança coletiva e não apenas como acontecimento técnico."]
  },
  george:{
    overview:"George confronta diferentes imagens de si própria através de Gi e Gina. O conto trabalha memória, envelhecimento e identidade numa narrativa em que o tempo psicológico torna ambígua a fronteira entre encontro e projeção interior.",
    connections:["Relacionar George, Gi e Gina com diferentes momentos e possibilidades do eu.","Observar focalização, memória e sinais de ambiguidade na construção narrativa.","Interpretar viagem, casa e espelho temporal sem reduzir o conto a um resumo biográfico."]
  },
  "familias-desavindas":{
    overview:"O conto transforma uma rivalidade familiar herdada numa situação absurda e cómica. A ironia expõe a persistência irracional do conflito e a fragilidade das justificações transmitidas entre gerações.",
    connections:["Distinguir acontecimentos narrados e efeito humorístico da forma de os narrar.","Relacionar repetição e herança familiar com a crítica ao conflito.","Analisar ironia, exagero e desfecho como mecanismos de construção do absurdo."]
  }
};

function taxonomyUnit(id){return PORTUGUESE_TAXONOMY.flatMap(row=>row.units).find(unit=>unit.id===id)||null}

function workOverview(work){
  return DEEP_DIVES[work.id]?.overview||`${work.author}: revisão orientada de ${work.focus.map(point=>point.toLocaleLowerCase("pt-PT")).join(", ")}. O objetivo é ligar cada interpretação a marcas concretas do texto, e não memorizar apenas um resumo da obra.`;
}

function workConnections(work){
  return DEEP_DIVES[work.id]?.connections||work.focus.slice(0,3).map(point=>`Explicar ${point.toLocaleLowerCase("pt-PT")} a partir de elementos concretos da obra.`);
}

function literaryReviewEntry(work){
  const unit=taxonomyUnit(WORK_UNIT_IDS[work.id]);
  return {id:`work:${work.id}`,year:work.year,domain:"educacao-literaria",kind:"obra",title:work.title,subtitle:`${work.author} · ${work.curriculumLabel}`,summary:workOverview(work),keyPoints:work.focus,connections:workConnections(work),guide:portugueseReviewGuide(unit),work};
}

function competencyReviewEntry(unit,year){
  return {...unit,year,subtitle:"Competência transversal",connections:unit.keyPoints.map(point=>`Conseguir ${point.charAt(0).toLocaleLowerCase("pt-PT")}${point.slice(1)}`),guide:portugueseReviewGuide(unit)};
}

export function portugueseReviewEntriesForYear(year){
  const row=PORTUGUESE_TAXONOMY.find(item=>item.year===year);
  if(!row)return [];
  const works=PORTUGUESE_LITERARY_WORKS.filter(work=>work.year===year).map(literaryReviewEntry);
  const competencies=row.units.filter(unit=>unit.domain!=="educacao-literaria").map(unit=>competencyReviewEntry(unit,year));
  return [...works,...competencies];
}

export function portugueseReviewEntry(id,year){return portugueseReviewEntriesForYear(year).find(entry=>entry.id===id)||null}

export {WORK_UNIT_IDS};
