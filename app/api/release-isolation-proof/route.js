export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(){
 if(process.env.VERCEL_ENV!=="preview"||process.env.VERCEL_PROJECT_ID!=="prj_8n5XwTMF651SAfsykIDji93oZp3r")return new Response("Not found",{status:404});
 const host=value=>{try{return new URL(value).hostname}catch{return null}};
 const databaseHost=host(process.env.DATABASE_URL);
 const expected=["ep-holy-term-b93irruj.c-7.eu-central-1.aws.neon.tech","ep-holy-term-b93irruj-pooler.c-7.eu-central-1.aws.neon.tech"];
 return Response.json({projectId:process.env.VERCEL_PROJECT_ID,environment:process.env.VERCEL_ENV,databaseHost,isolatedDatabaseMatched:expected.includes(databaseHost),authHost:host(process.env.NEXT_PUBLIC_NEON_AUTH_URL),dataApiHost:host(process.env.NEXT_PUBLIC_NEON_DATA_API_URL)},{headers:{"Cache-Control":"no-store"}});
}
