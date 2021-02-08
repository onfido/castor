import { format } from 'prettier';
import parserTypeScript from 'prettier/parser-typescript';
import { prepareForInline } from './prepareForInline';

/**
 * Makes story source code more readable by running prettier and unwrapping
 * strings.

 * @param src Source story code as string to transform.
 */
export const transformSource = (src: string) =>
  !src.startsWith('{`')
    ? src
    : // prettier requires JSX element arrays to have parents,
      // so we add a fragment here
      prettier('<>' + src.replace(/{`|`}/g, '') + '</>')
        // then remove it
        .slice(2, -5)
        // and `shift + tab` once
        .replace(/^ {2}/gm, '');

export const docs = { prepareForInline, transformSource };

const prettier = (src: string) =>
  format(src, {
    parser: 'typescript',
    plugins: [parserTypeScript],
  });
