import {NextResponse} from "next/server";
import {fetchOfficialSecondarySchools,SCHOOL_DIRECTORY_SOURCE} from "../../lib/server/schoolDirectory";

export const dynamic="force-dynamic";
export const revalidate=86400;

export async function GET(){
  try{
    const schools=await fetchOfficialSecondarySchools();
    return NextResponse.json({source:SCHOOL_DIRECTORY_SOURCE,count:schools.length,schools},{
      headers:{
        "Cache-Control":"public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options":"nosniff"
      }
    });
  }catch(error){
    console.error("[school-directory] unavailable",{code:error?.message||"UNKNOWN"});
    return NextResponse.json({error:"SCHOOL_DIRECTORY_UNAVAILABLE"},{status:503,headers:{"Cache-Control":"no-store"}});
  }
}
