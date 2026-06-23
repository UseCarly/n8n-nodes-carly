// Copy node icons into dist (tsc doesn't copy non-TS assets).
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const icons = ['nodes/Carly/carly.svg'];

for (const icon of icons) {
  const dest = `dist/${icon}`;
  if (!existsSync(icon)) {
    console.warn(`icon missing, skipping: ${icon}`);
    continue;
  }
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(icon, dest);
  console.log(`copied ${icon} -> ${dest}`);
}
