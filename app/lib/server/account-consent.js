import {createHash} from "node:crypto";
import {TERMS_VERSION,PRIVACY_VERSION} from "../legalVersions.js";

export const CONSENT_TYPE="signup_age13_terms_privacy";
const ALLOWED_KEYS=new Set(["termsVersion","privacyVersion","ageConfirmed","termsAccepted","emailHash"]);
const HEX64=/^[0-9a-f]{64}$/;

export function emailHash(email){
  return createHash("sha256").update(String(email||"").trim().toLowerCase()).digest("hex");
}

// O pedido só é aceite para as versões em vigor, com as duas confirmações, e se
// o registo foi feito com o email da sessão atual (evita atribuir a outra conta
// um consentimento dado noutro registo no mesmo dispositivo).
export function validateConsent(payload,sessionEmail){
  if(!payload||typeof payload!=="object"||Array.isArray(payload))return {ok:false,code:"INVALID_CONSENT"};
  if(Object.keys(payload).some(key=>!ALLOWED_KEYS.has(key)))return {ok:false,code:"UNKNOWN_CONSENT_FIELD"};
  if(payload.ageConfirmed!==true||payload.termsAccepted!==true)return {ok:false,code:"CONSENT_NOT_GIVEN"};
  if(payload.termsVersion!==TERMS_VERSION||payload.privacyVersion!==PRIVACY_VERSION)return {ok:false,code:"CONSENT_VERSION_OUTDATED"};
  if(typeof payload.emailHash!=="string"||!HEX64.test(payload.emailHash))return {ok:false,code:"INVALID_CONSENT"};
  if(!sessionEmail||payload.emailHash!==emailHash(sessionEmail))return {ok:false,code:"CONSENT_ACCOUNT_MISMATCH"};
  return {ok:true,termsVersion:TERMS_VERSION,privacyVersion:PRIVACY_VERSION};
}

export async function insertConsent(sql,authUserId,{termsVersion,privacyVersion}){
  await sql`
    insert into public.account_consents(auth_user_id,consent_type,terms_version,privacy_version)
    values (${authUserId},${CONSENT_TYPE},${termsVersion},${privacyVersion})
    on conflict (auth_user_id,consent_type,terms_version,privacy_version) do nothing
  `;
}
