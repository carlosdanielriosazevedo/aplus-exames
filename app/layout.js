import './globals.css';

export const metadata={title:'A+ Exames v1.1'};
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover'};

export default function RootLayout({children}){
  return <html lang="pt"><body>{children}</body></html>;
}
