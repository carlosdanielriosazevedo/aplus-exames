// Synthetic fetch mock; NEVER invokes the network or accepts real credentials.
// Used solely by tests/scripts/neon-jwt-smoke-contract.mjs.
const expectedBase="https://ep-holy-term-b93irruj.apirest.c-7.eu-central-1.aws.neon.tech/neondb/rest/v1";
const version=Number(process.env.SYNTHETIC_MOCK_SCHEMA_VERSION||0);
function response(payload,status=200){
  return new Response(JSON.stringify(payload),{
    status,headers:{"content-type":"application/json"}
  });
}
globalThis.fetch=async (url,options={})=>{
  if(typeof url!=="string"||!url.startsWith(expectedBase+"/"))
    throw new Error("MOCK_REFUSED_NON_ISOLATED_HOST");
  if(options.method!=="GET")throw new Error("MOCK_REFUSED_NON_GET");
  const path=url.slice(expectedBase.length);
  const auth=options.headers?.authorization;
  if(path==="/app_schema_meta?select=schema_version&singleton=eq.true"){
    if(!auth)throw new Error("MOCK_SCHEMA_MARKER_REQUIRES_TEST_JWT");
    return response([{schema_version:version}]);
  }
  if(version!==9)throw new Error("MOCK_UNSAFE_IDENTITY_READ_BEFORE_SCHEMA_GATE");
  if(path==="/app_users?select=id" && !auth)return response({message:"forbidden"},403);
  if(!auth)throw new Error("MOCK_EXPECTED_SIGNED_TEST_JWT");
  const jwt=auth.replace(/^Bearer /,"");
  const parsed=JSON.parse(Buffer.from(jwt.split(".")[1],"base64url").toString("utf8"));
  const map={
    "synthetic-student-a":{id:"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",role:"student"},
    "synthetic-student-b":{id:"bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",role:"student"},
    "synthetic-parent-p":{id:"cccccccc-cccc-4ccc-8ccc-cccccccccccc",role:"parent"}
  };
  const current=map[parsed.sub];
  if(!current)throw new Error("MOCK_UNKNOWN_SYNTHETIC_SUBJECT");
  if(path==="/app_users?select=id,auth_user_id")
    return response([{id:current.id,auth_user_id:parsed.sub}]);
  if(path==="/app_user_roles?select=user_id,role")
    return response([{user_id:current.id,role:current.role}]);
  throw new Error("MOCK_UNEXPECTED_API_PATH");
};
