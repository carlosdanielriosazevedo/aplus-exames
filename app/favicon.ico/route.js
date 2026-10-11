export const dynamic = "force-static";

const favicon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="APProva+">
  <rect width="64" height="64" rx="14" fill="#111827"/>
  <path d="M16 45 29 17h7l12 28h-8l-2.4-6H26.8l-2.5 6H16Zm13.2-12h6.1l-3-7.7-3.1 7.7Z" fill="#fff"/>
  <path d="M45 17h5v6h6v5h-6v6h-5v-6h-6v-5h6v-6Z" fill="#f59e0b"/>
</svg>`;

export function GET() {
  return new Response(favicon, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
