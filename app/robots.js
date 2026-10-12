const SITE_URL='https://approvamais.pt';

export default function robots(){
  return {
    rules:[
      {userAgent:'*',allow:'/',disallow:['/api/','/internal/']}
    ],
    sitemap:`${SITE_URL}/sitemap.xml`,
    host:SITE_URL
  };
}
