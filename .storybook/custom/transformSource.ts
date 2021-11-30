import { format } from 'prettier';
import parserTypeScript from 'prettier/parser-typescript';

/**
 * Makes story source code more readable by running Prettier and unwrapping
 * strings.

 * @param src Source story code as string to transform.
 */
export const transformSource = (src: string) =>
  src.startsWith('{`') ? htmlString(src) : react(src);

const react = (src: string) =>
  src
    // remove React keys
    .replace(/ *key=".+?"\n?/gm, '')
    // remove "space" strings
    .replace(/{' '}/g, '')
    // remove needless new lines in component tag
    .replace(/<(\w+)\n(\/)?>/g, '<$1$2>')
    // improve refs
    .replace(/{\s+current: '\[Circular\]'\s+}/gm, 'ref')
    // remove fragments
    .replace(
      / *<(?:React\.Fragment)?>([\s\S]*?)<\/(?:React\.Fragment)?>/g,
      (_, content: string) =>
        content
          // "shift + tab" once
          .replace(/^ {2}/gm, '')
          // remove empty lines where fragment was
          .slice(1, -1)
    );

const htmlString = (src: string) =>
  // prettier requires JSX element arrays to have parents, so we add a fragment
  prettier('<>' + src.replace(/{`|`}/g, '') + '</>')
    // then remove it
    .slice(2, -5)
    // and "shift + tab" once
    .replace(/^ {2}/gm, '');

const prettier = (src: string) =>
  format(src, {
    parser: 'typescript',
    plugins: [parserTypeScript],
  });
