import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('content/vnext/portuguese/foundation');
const files = fs.readdirSync(root)
  .filter((name) => /^portuguese-639-(pilot|wave\d+)\.json$/.test(name))
  .sort();

const items = files.flatMap((name) => {
  const doc = JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
  return (doc.items || []).map((item) => ({...item, __file: name}));
});

function countBy(key) {
  return items.reduce((acc, item) => {
    const value = item[key] ?? 'missing';
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function nestedCount(a, b) {
  return items.reduce((acc, item) => {
    const first = item[a] ?? 'missing';
    const second = item[b] ?? 'missing';
    acc[first] ||= {};
    acc[first][second] = (acc[first][second] || 0) + 1;
    return acc;
  }, {});
}

const duplicateIds = Object.entries(countBy('id')).filter(([, count]) => count > 1);
const missingCore = items.filter((item) => !item.id || !item.year || !item.domain || !item.competencyId || !item.responseType || !item.cognitive);
const nonOriginal = items.filter((item) => item.sourceOrigin !== 'original');

const report = {
  examCode: '639',
  files,
  totalItems: items.length,
  byYear: countBy('year'),
  byDomain: countBy('domain'),
  byResponseType: countBy('responseType'),
  byCognitive: countBy('cognitive'),
  byReviewStatus: countBy('reviewStatus'),
  byCompetency: countBy('competencyId'),
  yearByDomain: nestedCount('year', 'domain'),
  duplicateIds: duplicateIds.map(([id, count]) => ({id, count})),
  missingCoreCount: missingCore.length,
  nonOriginalCount: nonOriginal.length,
};

console.log(JSON.stringify(report, null, 2));

if (duplicateIds.length) {
  console.error(`Português 639: ${duplicateIds.length} IDs duplicados.`);
  process.exitCode = 1;
}
if (missingCore.length) {
  console.error(`Português 639: ${missingCore.length} itens sem metadados nucleares.`);
  process.exitCode = 1;
}
