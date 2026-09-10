import './globals.css';

export const metadata={title:'APProva+ · Preparação para exames nacionais',description:'Preparação inteligente e adaptativa para os exames nacionais.'};
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover'};

export default function RootLayout({children}){
  return <html lang="pt"><body>{children}</body></html>;
}
