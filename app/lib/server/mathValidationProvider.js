
// Contrato server-side para um segundo validador matemático.
// Não faz chamadas externas nesta versão. A ativação de um provider real
// exige configuração/custos/licenciamento próprios.

export const EXTERNAL_MATH_RESULT_STATUS={
  agree:"agree",
  disagree:"disagree",
  unavailable:"unavailable",
  notConfigured:"not_configured"
};

export function externalMathProviderConfiguration(){
  const provider=(process.env.MATH_VALIDATION_PROVIDER||"").trim().toLowerCase();
  return {
    configured:!!provider,
    provider:provider||null
  };
}

export function notConfiguredExternalMathResult(){
  const cfg=externalMathProviderConfiguration();
  return {
    provider:cfg.provider,
    status:cfg.configured?"unavailable":"not_configured",
    checkedAt:Date.now(),
    note:cfg.configured
      ?"Existe um provider indicado, mas o respetivo adapter ainda não está instalado."
      :"Segundo validador matemático ainda não configurado."
  };
}

export function normalizeExternalMathResult(provider,result={}){
  const status=["agree","disagree","unavailable","not_configured"].includes(result.status)
    ?result.status
    :"unavailable";
  return {
    provider:provider||result.provider||"unknown",
    status,
    checkedAt:result.checkedAt||Date.now(),
    fingerprint:result.fingerprint||null,
    note:result.note||null
  };
}
