import {getSql,databaseConfigured} from "./db";

export async function deleteOwnPilotData(authUserId){
  if(!databaseConfigured())return {ok:false,code:"DATABASE_NOT_CONFIGURED"};
  if(!authUserId)return {ok:false,code:"UNAUTHORIZED"};
  const sql=getSql();
  const rows=await sql`
    select delete_own_pilot_data(${authUserId}) as deleted
  `;
  return {ok:true,deleted:rows[0]?.deleted||{}};
}
