import './globals.css';

export const metadata = {
  title: 'A+ Exames',
  description: 'Preparação personalizada para o Exame Nacional de Matemática A'
};

export default function RootLayout({ children }) {
  return <html lang="pt"><body>{children}</body></html>;
}
