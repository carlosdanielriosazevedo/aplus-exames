// APProva+ — autorização server-side.
//
// Este módulo NÃO transforma identidade demo numa fronteira de segurança.
// Só `auth_user_id` validado pelo fornecedor + RLS/servidor pode autorizar dados reais.

const ROLE_CAPABILITIES={
  student:new Set(["study","progress","exams","manage_parent_link"]),
  parent:new Set(["parent_dashboard"]),
  reviewer:new Set(["review_content","view_reports"]),
  admin:new Set(["study","progress","exams","manage_parent_link","parent_dashboard","review_content","view_reports","beta_admin","quality_admin","manage_roles"])
};

export function roleAllows(role,capability){
  return ROLE_CAPABILITIES[role]?.has(capability)||false;
}

export function assertRoleCapability(role,capability){
  if(!roleAllows(role,capability)){
    const error=new Error("Forbidden");
    error.status=403;
    error.code="FORBIDDEN";
    throw error;
  }
  return true;
}

export function authConfiguration(){
  const authUrl=process.env.NEXT_PUBLIC_NEON_AUTH_URL||process.env.NEON_AUTH_URL||null;
  const dataApiUrl=process.env.NEXT_PUBLIC_NEON_DATA_API_URL||null;
  const serverSessionSecret=process.env.NEON_AUTH_COOKIE_SECRET||null;
  const serverSessionEnforced=false; // só passa a true quando as rotas privadas validarem sessão no servidor.
  return {
    provider:"neon-auth",
    strategy:"managed-auth-plus-app-rbac",
    authProviderConfigured:!!authUrl,
    dataApiConfigured:!!dataApiUrl,
    serverSessionConfigured:!!serverSessionSecret,
    serverSessionEnforced,
    rowLevelSecurityExpected:true,
    realUserReady:!!authUrl && !!dataApiUrl && serverSessionEnforced
  };
}
