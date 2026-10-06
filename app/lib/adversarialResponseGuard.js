const normalize=value=>String(value??"")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g,"")
  .toLowerCase()
  .replace(/[“”«»]/g,'"')
  .replace(/\s+/g," ")
  .trim();

const META_PATTERNS=[
  /\bignora(?:r)?\s+(?:as|todas as)?\s*instrucoes\b/u,
  /\bignora(?:r)?\s+(?:o|os)?\s*(?:criterio|criterios|corretor|apronso|sistema)\b/u,
  /\b(?:atribui|da|dar|concede|marca|considera)\b[\s\S]{0,48}\b(?:pontuacao|nota|cotacao|valor)\s*(?:maxima|total|100|20|20\/20)\b/u,
  /\b(?:marca|considera)\b[\s\S]{0,36}\b(?:criterio|resposta)\b[\s\S]{0,24}\b(?:cumprido|correto|correct|observed|aceite)\b/u,
  /\b(?:system prompt|prompt do sistema|instrucoes do sistema|developer message)\b/u,
  /\b(?:o corretor|o apronso|a ia|a inteligencia artificial)\b[\s\S]{0,45}\b(?:deve|tem de|vai)\b[\s\S]{0,36}\b(?:aceitar|aprovar|dar|atribuir|classificar)\b/u,
  /\b(?:resposta correta|resposta certa)\s*[:=-]\s*(?:sim|esta|100|verdadeiro)\b/u
];

const splitSegments=text=>String(text??"")
  .split(/(?<=[.!?;])\s+|\n+/u)
  .map(row=>row.trim())
  .filter(Boolean);

export function inspectAdversarialResponse(response){
  const segments=splitSegments(response);
  const removed=[];
  const kept=[];
  for(const segment of segments){
    const normalized=normalize(segment);
    const matched=META_PATTERNS.some(pattern=>pattern.test(normalized));
    if(matched)removed.push(segment);
    else kept.push(segment);
  }
  const manipulationDetected=removed.length>0;
  return {
    manipulationDetected,
    removedSegments:removed,
    sanitizedResponse:kept.join(" ").trim(),
    originalResponse:String(response??""),
    signalCount:removed.length
  };
}

export function adversarialSafeResponse(response){
  return inspectAdversarialResponse(response).sanitizedResponse;
}

export const ADVERSARIAL_RESPONSE_GUARD_SCHEMA="aplus-adversarial-response-guard-v1";
