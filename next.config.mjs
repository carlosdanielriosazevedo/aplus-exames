function origin(value){
  if(!value)return null;
  try{return new URL(value).origin}catch{return null}
}

const connectOrigins=[
  "'self'",
  origin(process.env.NEXT_PUBLIC_NEON_AUTH_URL),
  origin(process.env.NEXT_PUBLIC_NEON_DATA_API_URL)
].filter(Boolean);

const csp=[
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  `connect-src ${connectOrigins.join(' ')}`,
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "form-action 'self'",
  "upgrade-insecure-requests"
].join('; ');

const securityHeaders=[
  {key:'Content-Security-Policy',value:csp},
  {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
  {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
  {key:'X-Content-Type-Options',value:'nosniff'},
  {key:'X-Frame-Options',value:'DENY'}
];

const nextConfig={
  async headers(){
    return [{source:'/:path*',headers:securityHeaders}];
  }
};

export default nextConfig;
