// Mantém a URL pública /favicon.ico, servindo o ícone multirresolução aprovado.
export const dynamic = "force-static";

export function GET() {
  return new Response(null, {
    status: 307,
    headers: {
      Location: "/icons/favicon.ico",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
