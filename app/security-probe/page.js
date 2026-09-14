"use client";

import {useEffect,useState} from "react";
import {getCloudClient,getCloudSession} from "../lib/cloud";

function decodeJwtClaims(token){
  if(!token || typeof token!=="string")return null;
  try{
    const part=token.split(".")[1];
    if(!part)return null;
    const normalized=part.replace(/-/g,"+").replace(/_/g,"/");
    const padded=normalized+"=".repeat((4-normalized.length%4)%4);
    return JSON.parse(atob(padded));
  }catch{return null;}
}

function errorSummary(error){
  if(!error)return null;
  return {
    message:error.message||String(error),
    code:error.code||null,
    details:error.details||null,
    hint:error.hint||null
  };
}

export default function SecurityProbePage(){
  const [result,setResult]=useState({status:"A iniciar teste..."});

  useEffect(()=>{
    let cancelled=false;
    async function run(){
      const params=new URLSearchParams(window.location.search);
      const targetAuthUserId=params.get("target")||"";
      const client=getCloudClient();
      if(!client){setResult({status:"Cloud não configurada."});return;}
      try{
        const session=await getCloudSession();
        if(!session?.user?.id){setResult({status:"Sem sessão autenticada."});return;}
        const selfId=String(session.user.id);

        const rawSessionResponse=await fetch("/api/auth/get-session",{credentials:"include",cache:"no-store"});
        const responseJwt=rawSessionResponse.headers.get("set-auth-jwt");
        const responseClaims=decodeJwtClaims(responseJwt);
        const rawSessionBody=await rawSessionResponse.json().catch(()=>null);
        const bodyToken=rawSessionBody?.session?.token||rawSessionBody?.data?.session?.token||null;
        const bodyClaims=decodeJwtClaims(bodyToken);
        const jwtClaims=responseClaims||bodyClaims;

        const selfQ=await client.from("app_users").select("id,auth_user_id,email_snapshot").eq("auth_user_id",selfId).maybeSingle();
        const targetQ=targetAuthUserId
          ? await client.from("app_users").select("id,auth_user_id,email_snapshot").eq("auth_user_id",targetAuthUserId).maybeSingle()
          : {data:null,error:null};
        const rolesQ=await client.from("app_user_roles").select("user_id,role");
        const targetProfileQ=targetAuthUserId
          ? await client.from("student_profiles").select("user_id,school_year,recent_grade,goal").eq("user_id",targetQ?.data?.id||"00000000-0000-0000-0000-000000000000").maybeSingle()
          : {data:null,error:null};
        const reviewerResponse=await fetch("/api/security/reviewer-probe",{credentials:"include",cache:"no-store"});
        const reviewerBody=await reviewerResponse.json().catch(()=>({}));

        const report={
          targetAuthUserId,
          selfVisible:Boolean(selfQ?.data),
          targetVisible:Boolean(targetQ?.data),
          visibleRoleCount:Array.isArray(rolesQ?.data)?rolesQ.data.length:0,
          targetProfileVisible:Boolean(targetProfileQ?.data),
          reviewerAllowed:Boolean(reviewerBody?.allowed),
          reviewerStatus:reviewerResponse.status,
          authSessionStatus:rawSessionResponse.status,
          jwtPresent:Boolean(responseJwt||bodyToken),
          jwtSub:jwtClaims?.sub||null,
          jwtRole:jwtClaims?.role||null,
          selfQueryError:errorSummary(selfQ?.error),
          targetQueryError:errorSummary(targetQ?.error),
          rolesQueryError:errorSummary(rolesQ?.error),
          targetProfileQueryError:errorSummary(targetProfileQ?.error)
        };

        await fetch("/api/security/probe-report",{
          method:"POST",
          credentials:"include",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(report)
        });

        if(!cancelled)setResult({status:"Teste concluído.",...report});
      }catch(error){
        if(!cancelled)setResult({status:"Erro no teste.",error:String(error?.message||error)});
      }
    }
    run();
    return()=>{cancelled=true;};
  },[]);

  return <main style={{maxWidth:760,margin:"48px auto",padding:"24px",fontFamily:"system-ui"}}>
    <h1>APProva+ — teste de segurança</h1>
    <p>Este ecrã é temporário e serve apenas para validar isolamento entre contas.</p>
    <pre style={{whiteSpace:"pre-wrap",wordBreak:"break-word",background:"#f5f5f5",padding:16,borderRadius:12}}>{JSON.stringify(result,null,2)}</pre>
  </main>;
}
