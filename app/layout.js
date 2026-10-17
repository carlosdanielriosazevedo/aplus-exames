import './globals.css';
import './mini-exam-review.css';
import './apronso-parity.css';
import './public-release.css';
import './exam-hub-contrast.css';
import './desktop-shell-polish.css';
import './diagnostic-option-contrast.css';
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
    description:'Preparação inteligente e adaptativa para os exames nacionais.',
    images:[{url:'/opengraph-image',width:1200,height:630,alt:'APProva+ · Preparação inteligente para exames nacionais'}]
  },
  twitter:{
    card:'summary_large_image',
    title:'APProva+ · Preparação para exames nacionais',
    description:'Preparação inteligente e adaptativa para os exames nacionais.',
    images:['/opengraph-image']
  },
  icons:{icon:'/favicon.ico',shortcut:'/favicon.ico'}
};
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#08132e'};

export default function RootLayout({children}){
  return <html lang="pt-PT"><body>{children}<StorageDurabilityNotice/><ClientRuntimeReporter/></body></html>;
}