import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = path.join(process.cwd(), ".next", "static", "chunks");
const rows = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith(".js")) {
      const raw = fs.readFileSync(full);
      rows.push({
        file: path.relative(root, full).replaceAll(path.sep, "/"),
        bytes: raw.length,
        gzipBytes: zlib.gzipSync(raw, { level: 9 }).length,
      });
    }
  }
}

walk(root);
rows.sort((a,b) => b.bytes - a.bytes);

const total = rows.reduce((n,r) => n + r.bytes, 0);
const totalGzip = rows.reduce((n,r) => n + r.gzipBytes, 0);
const appPage = rows.filter(r => /^app\/page-[^/]+\.js$/.test(r.file));

console.log("\n=== APProva+ PERFORMANCE BASELINE ===");
console.log(`JS chunks: ${rows.length}`);
console.log(`Total JS: ${total.toLocaleString("en-US")} B (${(total/1024).toFixed(1)} KiB)`);
console.log(`Total gzip: ${totalGzip.toLocaleString("en-US")} B (${(totalGzip/1024).toFixed(1)} KiB)`);
console.log("\nLargest chunks:");
for (const row of rows.slice(0, 15)) {
  console.log(`  ${row.bytes.toString().padStart(10)} B | gzip ${row.gzipBytes.toString().padStart(8)} B | ${row.file}`);
}
console.log("\nRoute page chunks:");
for (const row of appPage) {
  console.log(`  ${row.bytes.toLocaleString("en-US")} B | gzip ${row.gzipBytes.toLocaleString("en-US")} B | ${row.file}`);
}

const output = {
  generatedAt: new Date().toISOString(),
  totalJsBytes: total,
  totalGzipBytes: totalGzip,
  chunkCount: rows.length,
  largestChunks: rows.slice(0, 15),
  routePageChunks: appPage,
};
fs.writeFileSync(
  path.join(process.cwd(), "performance-baseline.json"),
  JSON.stringify(output, null, 2) + "\n",
);
