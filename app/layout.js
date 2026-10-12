import './globals.css';
import './mini-exam-review.css';
import './apronso-parity.css';

const SITE_URL='https://approvamais.pt';

export const metadata={
  metadataBase:new URL(SITE_URL),
  title:'APProva+ · Preparação para exames nacionais',
  description:'Preparação inteligente e adaptativa para os exames nacionais.',
  alternates:{canonical:'/'},
  openGraph:{
    type:'website',
    locale:'pt_PT',
    url:SITE_URL,
    siteName:'APProva+',
    title:'APProva+ · Preparação para exames nacionais',
    description:'Preparação inteligente e adaptativa para os exames nacionais.'
  }
};
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover'};

export default function RootLayout({children}){
  return <html lang="pt"><body>{children}</body></html>;
}
