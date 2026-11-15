// Variantes literárias de treino V2–V6 (PT639-LIT-V2..V6-*) retiradas do uso com
// alunos em 2026-11-15 (decisão do product owner): V4–V6 encadeavam várias
// perguntas e respondiam com conselhos genéricos de estudo iguais para todas as
// obras; V2–V3 tinham distratores que se denunciavam sozinhos. Continuam
// disponíveis apenas para retomar ou rever sessões antigas; nunca são selecionadas.
export const PORTUGUESE_RETIRED_ITEM_PATTERN=/^PT639-LIT-V[2-6]-/;
export function isRetiredPortugueseItem(item){
  return PORTUGUESE_RETIRED_ITEM_PATTERN.test(String(item?.id||""));
}
