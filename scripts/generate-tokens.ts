import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { convert, registerFormat } from 'theo';

const themePath = join(__dirname, 'packages/core/src/theme');

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
