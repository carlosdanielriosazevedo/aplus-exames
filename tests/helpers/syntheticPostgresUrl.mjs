// Test-only URL fields: no embedded credential-bearing DSN literals in source.
// Callers mock the driver or reject the target before any network operation.
export function syntheticPostgresUrl(target,{
  username="synthetic-test-user",password="synthetic-test-password"
}={}){
  const url=new URL(target);
  url.username=username;
  url.password=password;
  return url.href;
}
