// Trusted Neon SQL operations. Call ONLY after requireSession() verified the
// requester. The account ID is derived from that session, never from JSON input.
// Revisions are compared and incremented in one PostgreSQL UPDATE statement.
export async function readCloudRow(sql,authUserId){
  const rows=await sql`
    select state_json,updated_at,revision,last_device_id
    from public.student_cloud_state
    where auth_user_id=${authUserId}
    limit 1
  `;
  return rows[0]||null;
}

export async function writeCloudRow(sql,authUserId,validated){
  const {operation,expectedRevision,state,deviceId}=validated;
  const serialized=JSON.stringify(state);
  let rows;

  if(operation==="insert"){
    // No read-then-insert race and no replacement of an existing snapshot.
    rows=await sql`
      insert into public.student_cloud_state
        (auth_user_id,state_json,revision,last_device_id,updated_at)
      values (${authUserId},${serialized}::jsonb,1,${deviceId},now())
      on conflict (auth_user_id) do nothing
      returning updated_at,revision,last_device_id
    `;
  }else{
    // PostgreSQL's row lock + WHERE compare implements atomic CAS. Stale
    // revisions return zero rows. The OLD-row history trigger runs on success.
    rows=await sql`
      update public.student_cloud_state
      set state_json=${serialized}::jsonb,
          revision=revision+1,
          last_device_id=${deviceId},
          updated_at=now()
      where auth_user_id=${authUserId} and revision=${expectedRevision}
      returning updated_at,revision,last_device_id
    `;
  }

  if(rows.length)return {ok:true,conflict:false,data:rows[0]};
  const remote=await readCloudRow(sql,authUserId);
  return {ok:false,conflict:true,remote};
}
