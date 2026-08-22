// A+ v2.4 — domínio de identidade e permissões
// A autenticação real será delegada ao Neon Auth.
// Este módulo contém apenas regras de negócio da A+ (roles, ligações, convites).

export const ROLES={
  student:{label:"Aluno",icon:"🎓"},
  parent:{label:"Pai/Mãe",icon:"👨‍👩‍👧"},
  reviewer:{label:"Professor Revisor",icon:"👨‍🏫"},
  admin:{label:"Admin",icon:"🛠️"}
};

export const ROLE_CAPABILITIES={
  student:new Set(["study","progress","exams","manage_parent_link"]),
  parent:new Set(["parent_dashboard"]),
  reviewer:new Set(["review_content","view_reports"]),
  admin:new Set(["study","progress","exams","manage_parent_link","parent_dashboard","review_content","view_reports","beta_admin","quality_admin","manage_roles"])
};

export function normalizeIdentity(identity){
  const roles=Array.isArray(identity?.roles)&&identity.roles.length?identity.roles:["student"];
  const activeRole=roles.includes(identity?.activeRole)?identity.activeRole:roles[0];
  return {
    mode:identity?.mode||"demo",
    authUserId:identity?.authUserId||null,
    displayName:identity?.displayName||"Aluno Demo",
    email:identity?.email||"aluno.demo@aplus.local",
    roles,
    activeRole
  };
}

export function hasRole(identity,role){
  return normalizeIdentity(identity).roles.includes(role);
}

export function can(identity,capability){
  const i=normalizeIdentity(identity);
  return ROLE_CAPABILITIES[i.activeRole]?.has(capability)||false;
}

export function defaultScreenForRole(role){
  if(role==="parent")return "parent";
  if(role==="reviewer")return "review";
  if(role==="admin")return "beta";
  return "home";
}

export function createParentInvite({studentName="Aluno",email=""}={}){
  const bytes=new Uint32Array(4);
  if(typeof crypto!=="undefined" && crypto.getRandomValues)crypto.getRandomValues(bytes);
  else for(let i=0;i<4;i++)bytes[i]=Math.floor(Math.random()*2**32);
  const token=[...bytes].map(x=>x.toString(16).padStart(8,"0")).join("");
  return {
    id:`pinv-${Date.now()}-${token.slice(0,8)}`,
    token,
    studentName,
    email:email.trim().toLowerCase(),
    status:"pending",
    createdAt:Date.now(),
    expiresAt:Date.now()+7*24*60*60*1000,
    acceptedAt:null
  };
}

export function inviteExpired(invite){
  return !invite || Date.now()>invite.expiresAt;
}

export function acceptParentInvite(invite,parentIdentity){
  if(!invite || invite.status!=="pending" || inviteExpired(invite))return null;
  const parent=normalizeIdentity(parentIdentity);
  if(invite.email && parent.email && invite.email!==parent.email.toLowerCase())return null;
  return {
    ...invite,
    status:"accepted",
    acceptedAt:Date.now(),
    parentEmail:parent.email,
    parentName:parent.displayName
  };
}

export function activeParentLink(invites=[]){
  return [...invites].reverse().find(x=>x.status==="accepted")||null;
}

export function requestLinkRemoval(link,requestedBy="student"){
  if(!link || link.status!=="accepted")return link;
  return {
    ...link,
    removal:{
      status:"awaiting_other_party",
      requestedBy,
      requestedAt:Date.now(),
      confirmedAt:null
    }
  };
}

export function confirmLinkRemoval(link,confirmedBy){
  if(!link?.removal || link.removal.status!=="awaiting_other_party")return link;
  if(link.removal.requestedBy===confirmedBy)return link;
  return {
    ...link,
    status:"revoked",
    revokedAt:Date.now(),
    removal:{...link.removal,status:"confirmed",confirmedBy,confirmedAt:Date.now()}
  };
}

export function demoIdentity(role="student"){
  const profiles={
    student:{displayName:"Aluno Demo",email:"aluno.demo@aplus.local",roles:["student"]},
    parent:{displayName:"Encarregado Demo",email:"pai.demo@aplus.local",roles:["parent"]},
    reviewer:{displayName:"Professor Revisor",email:"revisor.demo@aplus.local",roles:["reviewer"]},
    admin:{displayName:"Admin A+",email:"admin.demo@aplus.local",roles:["admin"]}
  };
  return normalizeIdentity({mode:"demo",activeRole:role,...profiles[role]});
}
