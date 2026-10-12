const SITE_URL='https://approvamais.pt';

export default function sitemap(){
  return [
    {url:`${SITE_URL}/`,changeFrequency:'weekly',priority:1},
    {url:`${SITE_URL}/privacidade`,changeFrequency:'monthly',priority:0.4},
    {url:`${SITE_URL}/piloto`,changeFrequency:'monthly',priority:0.3},
    {url:`${SITE_URL}/piloto/encarregado`,changeFrequency:'monthly',priority:0.2}
  ];
}
