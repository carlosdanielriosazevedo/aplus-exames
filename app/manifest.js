const SITE_URL='https://approvamais.pt';

export default function manifest(){
  return {
    name:'APProva+',
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
    icons:[
      {src:'/icons/icon-192.png?v=20261030-2218-user-locked',sizes:'192x192',type:'image/png',purpose:'any'},
      {src:'/icons/icon-512.png?v=20261030-2218-user-locked',sizes:'512x512',type:'image/png',purpose:'any'},
      {src:'/icons/maskable-192.png?v=20261030-2218-user-locked',sizes:'192x192',type:'image/png',purpose:'maskable'},
      {src:'/icons/maskable-512.png?v=20261030-2218-user-locked',sizes:'512x512',type:'image/png',purpose:'maskable'}
    ]
  };
}
