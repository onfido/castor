import { readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { convert, registerFormat } from 'theo';

const rootPath = resolve('.');
const themePath = join(rootPath, 'packages/core/src/theme');
const formatsPath = join(rootPath, 'scripts/formats');

const variants = {
  tokens: {
    src: join(themePath, 'tokens.json'),
    dest: join(themePath, 'tokens.scss'),
    format: join(formatsPath, 'tokens.scss.hbs'),
  },
};

const variant = variants['tokens'];

registerFormat('scss', readFileSync(variant.format, 'utf8'));

convert({
  transform: {
    type: 'raw',
    file: variant.src,
  },
  format: {
    type: 'scss',
  },
})
  .then((scss) => writeFileSync(variant.dest, scss))
  .catch(console.error);
