const SITE_URL='https://approvamais.pt';

export default function sitemap(){
  return [
    {url:`${SITE_URL}/`,changeFrequency:'weekly',priority:1},
    {url:`${SITE_URL}/privacidade`,changeFrequency:'monthly',priority:0.5},
    {url:`${SITE_URL}/termos`,changeFrequency:'monthly',priority:0.5}
  ];
}
