import { readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { convert, registerFormat } from 'theo';

const rootPath = resolve('.');
const themePath = join(rootPath, 'packages/core/src/theme');

const srcPath = join(themePath, 'tokens.json');
const destPath = join(themePath, 'tokens.scss');
const formatPath = join(themePath, 'tokens.scss.hbs');

registerFormat('scss', readFileSync(formatPath, 'utf8'));

convert({
  transform: {
    type: 'raw',
    file: srcPath,
  },
  format: {
    type: 'scss',
  },
})
  .then((data) => writeFileSync(destPath, data))
  .catch(console.error);
