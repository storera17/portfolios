// Public-safe worksheet generator.
//
// This writes original coding worksheet metadata and fill-in code chunks to
// frontend/public/worksheets/worksheets.json. It does not copy source-course
// text; sourceRefs preserve where each worksheet was inspired from.
import { mkdirSync, writeFileSync } from 'node:fs';
import { WORKSHEETS, WORKSHEET_SOURCE_MAP } from './worksheets/index.mjs';

const payload = {
  meta: {
    name: 'MomentumProdigy Coding Worksheets',
    generatedAt: new Date().toISOString(),
    counts: {
      worksheets: WORKSHEETS.length,
      chunks: WORKSHEETS.reduce((sum, w) => sum + w.chunks.length, 0),
      languages: [...new Set(WORKSHEETS.map((w) => w.language))].length,
    },
  },
  worksheets: WORKSHEETS,
  sourceMap: WORKSHEET_SOURCE_MAP,
};

mkdirSync(new URL('../../frontend/public/worksheets/', import.meta.url), { recursive: true });
writeFileSync(new URL('../../frontend/public/worksheets/worksheets.json', import.meta.url), JSON.stringify(payload, null, 2));
console.log(`Coding worksheets generated -> frontend/public/worksheets/worksheets.json`);
console.log(`  worksheets=${payload.meta.counts.worksheets} chunks=${payload.meta.counts.chunks}`);
