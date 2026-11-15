// A strict server-owned source for future, independently graded rewards.
// No mutation helper is exported: cloud snapshots must NEVER mint XP receipts.
// Only trusted graders may be allowed to append receipts in a later reviewed PR.
export async function readVerifiedRewardTotals(sql,authUserId){
  if(typeof authUserId!=="string"||!authUserId.trim())
    throw new Error("Authenticated account required");
  const rows=await sql`
    select coalesce(sum(verified_xp),0)::bigint as verified_xp,
           count(*)::bigint as receipt_count
    from public.verified_completion_receipts
    where auth_user_id=${authUserId}
      -- CI/Preview receipts must never contribute to official totals.
      and grading_version not like 'synthetic-%'
  `;
  const count=Number(rows[0]?.receipt_count??0);
  const xp=Number(rows[0]?.verified_xp??0);
  if(!Number.isSafeInteger(count)||count<0||!Number.isSafeInteger(xp)||xp<0)
    throw new Error("Invalid trusted reward totals");
  return {verifiedXp:xp,receiptCount:count};
}
