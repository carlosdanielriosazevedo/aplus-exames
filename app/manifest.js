const SITE_URL='https://approvamais.pt';

export default function manifest(){
  return {
    name:'APProva+ · Preparação para exames nacionais',
    short_name:'APProva+',
    description:'Preparação inteligente e adaptativa para os exames nacionais.',
    start_url:'/',
    scope:'/',
    display:'standalone',
    background_color:'#08132e',
    theme_color:'#08132e',
    lang:'pt-PT',
    orientation:'any',
    id:SITE_URL,
    icons:[{src:'/favicon.ico',sizes:'any',type:'image/svg+xml',purpose:'any'}]
  };
}
