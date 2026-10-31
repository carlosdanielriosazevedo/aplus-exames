const SITE_URL='https://approvamais.pt';

export default function manifest(){
  return {
    name:'APProva+',
    short_name:'APProva+',
    description:'Preparação inteligente e adaptativa para os exames nacionais.',
    start_url:'/',
    scope:'/',
    display:'standalone',
    background_color:'#01133d',
    theme_color:'#08132e',
    lang:'pt-PT',
    orientation:'any',
    id:SITE_URL,
    icons:[
      {src:'/icons/icon-192.png?v=20261031-android-v3',sizes:'192x192',type:'image/png',purpose:'any'},
      {src:'/icons/icon-512.png?v=20261031-android-v3',sizes:'512x512',type:'image/png',purpose:'any'},
      {src:'/icons/maskable-192.png?v=20261031-android-v3',sizes:'192x192',type:'image/png',purpose:'maskable'},
      {src:'/icons/maskable-512.png?v=20261031-android-v3',sizes:'512x512',type:'image/png',purpose:'maskable'},
      // Ícone só para o splash nativo do Chrome/WebAPK (ideal ~240dp ≈ 660px):
      // logótipo aprovado de cantos arredondados sobre a cor de fundo, igual ao
      // da imagem de abertura. O launcher (ideal ~83dp) continua a usar o 512.
      {src:'/icons/splash-icon-1024.png?v=20261031-splash-v4',sizes:'1024x1024',type:'image/png',purpose:'maskable'}
    ]
  };
}
