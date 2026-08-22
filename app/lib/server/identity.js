// A+ v2.4 — autorização server-side
// NÃO é autenticação. Recebe uma identidade já autenticada e valida permissões da A+.

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
  return {
    configured:!!process.env.NEON_AUTH_URL,
    provider:"neon-auth",
    strategy:"managed-auth-plus-app-rbac"
  };
}
