import './globals.css'

export const metadata = {
  title: 'A+ Exames — Matemática A',
  description: 'Protótipo MVP para preparação adaptativa do Exame Nacional de Matemática A.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  )
}
