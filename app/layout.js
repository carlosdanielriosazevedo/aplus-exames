import './globals.css';
import './mini-exam-review.css';
import './apronso-parity.css';
import './public-release.css';
import ClientRuntimeReporter from './components/ClientRuntimeReporter';
import StorageDurabilityNotice from './components/StorageDurabilityNotice';

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
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#08132e'};

export default function RootLayout({children}){
  return <html lang="pt-PT"><body>{children}<StorageDurabilityNotice/><ClientRuntimeReporter/></body></html>;
}
