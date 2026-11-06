// P1-A v2 — Armazenamento canónico próprio para as chaves académicas.
//
// As versões anteriores gravam nas chaves "legadas":
//   - main (produção): chaves brutas ("a25", "a25-active-session-v1", …), sem
//     qualquer verificação antes de gravar;
//   - versões experimentais com contas (F5, #459/#461): "a25-account-v1:<conta>:<chave>".
// Na mesma chave, um separador antigo sobrescreve sempre; não há bloqueio do lado
// novo que o impeça. Por isso a nova versão grava o progresso num espaço próprio
// ("canónico") e trata as chaves legadas como só de leitura:
//   - importação única, dentro de um mandato de escritor provado;
//   - alterações posteriores ao legado = escrita de uma versão anterior: são
//     preservadas como cópia restaurável e nunca tocam no canónico.
// Este módulo não importa nada (evita ciclos entre accountWorkspace e stateWriter).

export const ACADEMIC_KEYS=Object.freeze([
  "a25","a25-friends-beta","a25-active-session-v1","a25-friends-active-session-v1",
  "applus:fqa-exam-draft:v1:fqa-mini-1","applus:fqa-exam-draft:v1:fqa-mini-2","applus:fqa-exam-draft:v1:fqa-full-715",
  "a25-completed-sessions-v1","approva.portuguese-writing-memory.v1"
]);
export const STATE_KEYS=Object.freeze(["a25","a25-friends-beta"]);
export const isAcademicKey=key=>ACADEMIC_KEYS.includes(key);

export const CANONICAL_PREFIX="a25-ws-v2:";
const subjectOf=scope=>scope&&scope!=="global"?scope:null;
export const scopeTag=scope=>{const subject=subjectOf(scope);return subject?`acct:${encodeURIComponent(subject)}`:"global";};
// Chave canónica de uma chave académica.
export const canonicalKey=(key,scope)=>`${CANONICAL_PREFIX}${scopeTag(scope)}:${key}`;
// Chaves internas do espaço canónico (selo, mandato, importação, cópias).
// O "~" impede colisões com nomes de chaves académicas.
export const workspaceKey=(name,scope)=>`${CANONICAL_PREFIX}${scopeTag(scope)}:~${name}`;
// Chave legada (só leitura para esta versão).
export const legacyKey=(key,scope)=>{const subject=subjectOf(scope);return subject?`a25-account-v1:${encodeURIComponent(subject)}:${key}`:key;};

// Impressão digital estável (FNV-1a + comprimento) de bytes guardados.
export function fingerprint(raw){
  if(raw===null||raw===undefined)return null;
  const text=String(raw);let h=2166136261;
  for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);}
  return `fp1-${(h>>>0).toString(16)}-${text.length}`;
}
