import {neon} from "@neondatabase/serverless";

let cached=null;

export function databaseConfigured(){
  return Boolean(process.env.DATABASE_URL);
}

export function getSql(){
  if(!databaseConfigured())return null;
  if(!cached)cached=neon(process.env.DATABASE_URL);
  return cached;
}

export async function databaseHealth(){
  if(!databaseConfigured())return {configured:false,reachable:false,provider:"neon-postgres"};
  try{
    const sql=getSql();
    await sql`select 1 as ok`;
    return {configured:true,reachable:true,provider:"neon-postgres"};
  }catch(error){
    return {configured:true,reachable:false,provider:"neon-postgres",error:String(error).slice(0,240)};
  }
}
