import {PORTUGUESE_LITERARY_WORKS} from "./portugueseLiteraryWorks";
import {PORTUGUESE_TAXONOMY} from "./portugueseTaxonomy";
import {portugueseReviewGuide} from "./portugueseReviewGuides";

const WORK_UNIT_IDS={
  "poesia-trovadoresca":"pt10-trovadoresca","fernao-lopes-djoao-i":"pt10-fernao-lopes","gil-vicente-teatro":"pt10-gil-vicente","camoes-rimas":"pt10-camoes-rimas","os-lusiadas-reflexoes":"pt10-lusiadas",
  "sermao-santo-antonio":"pt11-vieira","frei-luis-de-sousa":"pt11-frei-luis","viagens-minha-terra":"pt11-romantismo-opcao","a-abobada":"pt11-romantismo-opcao","amor-perdicao":"pt11-romantismo-opcao","os-maias":"pt11-eca","ilustre-casa-ramires":"pt11-eca","antero-sonetos":"pt11-antero","cesario-ocidental":"pt11-cesario",
  "jorge-sena-poesia":"pt12-poesia-contemporanea","eugenio-andrade-poesia":"pt12-poesia-contemporanea","ana-luisa-amaral-poesia":"pt12-poesia-contemporanea","sempre-e-uma-companhia":"pt12-conto",george:"pt12-conto","familias-desavindas":"pt12-conto","pessoa-ortonimo":"pt12-pessoa-ortonimo","pessoa-heteronimos":"pt12-pessoa-heteronimos",mensagem:"pt12-mensagem","ano-morte-ricardo-reis":"pt12-saramago","memorial-do-convento":"pt12-saramago"
};

const DEEP_DIVES={
  "poesia-trovadoresca":{
    overview:"A poesia trovadoresca deve ser lida como uma situação de voz e relação: quem fala, a quem fala, em que circunstância e com que efeito. A forma repetitiva não é decorativa; refrão e paralelismo organizam emoção, insistência e expectativa.",
    connections:["Nas cantigas de amigo, observar a voz feminina construída e a relação com amigas, mãe, natureza ou amado ausente.","Nas cantigas de amor, relacionar submissão amorosa, distância e idealização com a posição do sujeito.","Nas cantigas de escárnio e maldizer, distinguir ironia indireta de ataque explícito e ligar linguagem a intenção crítica."]
  },
  "fernao-lopes-djoao-i":{
    overview:"Na Crónica de D. João I, Fernão Lopes transforma acontecimentos históricos em narrativa viva. A atenção ao povo, à ação coletiva e ao movimento das cenas permite perceber como a História é construída por indivíduos e comunidades.",
    connections:["Distinguir informação histórica de processos narrativos que intensificam a cena.","Observar enumeração, discurso direto, ritmo e detalhe sensorial na criação de vivacidade.","Relacionar representação do povo com legitimidade política e memória coletiva."]
  },
  "gil-vicente-teatro":{
    overview:"No teatro vicentino, o cómico serve frequentemente para tornar visíveis vícios, interesses e contradições sociais. As personagens funcionam como indivíduos em cena, mas também como tipos reconhecíveis por linguagem, comportamento e estatuto.",
    connections:["Distinguir cómico de caráter, situação e linguagem a partir do efeito produzido.","Relacionar o percurso das personagens com crítica de costumes e valores sociais.","Ler diálogo, entradas, saídas e didascálias como elementos da construção dramática."]
  },
  "camoes-rimas":{
    overview:"Nas Rimas, a experiência amorosa cruza-se com consciência da mudança, desconcerto e instabilidade. A forma lírica organiza o pensamento: contrastes, paradoxos, imagens e progressão argumentativa tornam visível a tensão entre desejo e limite.",
    connections:["Relacionar amor idealizado, ausência e conflito interior sem reduzir o poema a autobiografia.","Observar antíteses e paradoxos como formas de pensar mudança e contradição.","Ligar organização estrófica e sintática ao desenvolvimento do raciocínio poético."]
  },
  "os-lusiadas-reflexoes":{
    overview:"As reflexões do Poeta interrompem a ação épica para avaliar mérito, ambição, risco, reconhecimento e experiência humana. A obra celebra feitos, mas não elimina a crítica: é precisamente essa tensão que torna a visão épica mais complexa.",
    connections:["Distinguir episódio narrado de comentário reflexivo do Poeta.","Relacionar experiência, esforço e glória com os custos humanos da ação.","Explicar como interpelações, perguntas e generalizações reforçam a dimensão ética e cívica."]
  },
  "sermao-santo-antonio":{
    overview:"O Sermão de Santo António aos Peixes constrói uma argumentação alegórica: falar dos peixes permite criticar comportamentos humanos. A eficácia depende da progressão entre louvor, censura, exemplos e recursos retóricos.",
    connections:["Identificar tese, sequência argumentativa e função de exemplos.","Relacionar características dos peixes com os comportamentos humanos criticados.","Explicar efeitos de apóstrofe, interrogação, antítese e repetição na persuasão."]
  },
  "viagens-minha-terra":{
    overview:"Em Viagens na Minha Terra, a viagem real convive com digressões, comentário político e narrativa sentimental. O narrador intervém, conversa com o leitor e usa a deslocação pelo país como ponto de partida para pensar identidade e sociedade.",
    connections:["Distinguir relato de viagem, digressão e narrativa de Carlos e Joaninha.","Relacionar narrador interventivo com ironia e comentário político-cultural.","Ler espaço e deslocação como formas de pensar Portugal e os seus conflitos."]
  },
  "a-abobada":{
    overview:"A Abóbada dramatiza o conflito entre mérito, autoria e poder através de Mestre Afonso Domingues. O episódio histórico é trabalhado como confronto entre reconhecimento pessoal, honra e autoridade.",
    connections:["Caracterizar Afonso Domingues pela relação entre competência, orgulho e dignidade.","Relacionar a abóbada com prova de mérito e reconhecimento.","Distinguir historicidade de dramatização literária do episódio."]
  },
  "amor-perdicao":{
    overview:"Amor de Perdição constrói uma paixão submetida a conflito familiar, honra e fatalidade. A intensidade emocional nasce tanto das escolhas das personagens como de uma estrutura narrativa que estreita progressivamente as possibilidades de saída.",
    connections:["Relacionar Simão e Teresa com conflito entre vontade individual e ordem familiar.","Observar o papel de Mariana na complexificação afetiva e ética do romance.","Analisar narrador, antecipação e concentração temporal na construção da fatalidade."]
  },
  "os-maias":{
    overview:"Os Maias articula drama familiar e crítica da sociedade portuguesa oitocentista. Personagens, espaços, episódios sociais e ironia constroem um retrato de hábitos, ambições e fracassos individuais e coletivos.",
    connections:["Relacionar Carlos, Ega e outras figuras com ambientes e valores sociais.","Ler espaços como o Ramalhete e os salões como elementos simbólicos e sociais.","Identificar ironia do narrador e contraste entre projeto, aparência e resultado."]
  },
  "ilustre-casa-ramires":{
    overview:"A Ilustre Casa de Ramires confronta Gonçalo com a memória da linhagem e com as exigências do presente. A escrita de uma narrativa histórica dentro do romance permite comparar heroísmo ancestral, fragilidade individual e construção de identidade.",
    connections:["Relacionar Gonçalo com contradições entre ambição, hesitação e desejo de reconhecimento.","Observar o contraste entre passado glorioso e presente problemático.","Analisar ironia e narrativa encaixada como instrumentos de leitura da personagem."]
  },
  "antero-sonetos":{
    overview:"Nos sonetos de Antero, o pensamento avança por tensão, pergunta e procura de resposta. O conflito interior e existencial organiza-se formalmente: a estrutura do soneto acompanha muitas vezes uma mudança de perspetiva ou tentativa de conclusão.",
    connections:["Relacionar conflito interior com procura de sentido e consciência do limite.","Observar como quartetos e tercetos organizam desenvolvimento e viragem do pensamento.","Explicar o efeito de personificação, antítese e abstração filosófica no poema."]
  },
  "cesario-ocidental":{
    overview:"O Sentimento dum Ocidental acompanha uma deambulação por Lisboa em que espaço, luz, corpos e atividade urbana se transformam em experiência sensorial e crítica social. O sujeito observa a cidade e, ao observá-la, revela também o seu estado interior.",
    connections:["Seguir a progressão espacial e temporal ao longo das quatro partes.","Relacionar imagens urbanas com contraste social, doença, trabalho e desejo de evasão.","Observar enumeração, sinestesia e detalhe visual como base da imagética cesariana."]
  },
  "jorge-sena-poesia":{
    overview:"Na poesia de Jorge de Sena, experiência pessoal, História e responsabilidade ética podem coexistir no mesmo gesto poético. A voz não se fecha no íntimo: interroga o mundo e a posição do sujeito perante ele.",
    connections:["Relacionar memória individual com experiência histórica e coletiva.","Observar tom reflexivo e interventivo sem reduzir o poema a mensagem política.","Explicar como imagens e referências culturais alargam o campo de sentido."]
  },
  "eugenio-andrade-poesia":{
    overview:"A poesia de Eugénio de Andrade procura intensidade através da depuração. Corpo, água, luz, matéria e natureza surgem em imagens sensoriais concisas, onde som, ritmo e escolha lexical têm um peso decisivo.",
    connections:["Ler imagens sensoriais sem as transformar imediatamente em símbolos fixos.","Relacionar concisão verbal com intensidade emocional.","Observar musicalidade, repetição e associação de elementos naturais na construção do poema."]
  },
  "ana-luisa-amaral-poesia":{
    overview:"Na poesia de Ana Luísa Amaral, o quotidiano pode abrir-se a questões de identidade, tradição, género e memória. A voz poética combina intimidade, inteligência crítica, ironia e diálogo com outros textos.",
    connections:["Relacionar objetos e cenas quotidianas com questões mais amplas de identidade e experiência.","Observar ironia e mudança de tom como formas de questionar expectativas.","Reconhecer reescrita e intertextualidade sem depender de identificar uma referência externa para interpretar o poema."]
  },
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
