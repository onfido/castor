import { readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { convert, registerFormat } from 'theo';

const rootPath = resolve('.');
const themePath = join(rootPath, 'packages/core/src/theme');
const formatsPath = join(rootPath, 'scripts/formats');

const types = {
  tokens: {
    src: join(themePath, 'tokens.json'),
    dest: join(themePath, 'tokens.scss'),
    format: join(formatsPath, 'tokens.scss.hbs'),
  },
};

const type = types['tokens'];

registerFormat('scss', readFileSync(type.format, 'utf8'));

convert({
  transform: {
    type: 'raw',
    file: type.src,
  },
  format: {
    type: 'scss',
  },
})
  .then((scss) => {
    writeFileSync(type.dest, scss);
  })
  .catch((error) => console.error(error));
