import { describe, expect, it } from '@jest/globals';
import { textContent } from './textContent';

describe('textContent', () => {
  it('should extract textContent from a ReactNode like DOM would', () => {
    const node = [
      { props: { children: ['foo', ' ', 'bar'] } },
      ' hi',
      false,
      undefined,
      null,
      [' ', 'world'],
    ];

    const result = textContent(node);

    expect(result).toBe('foo bar hi world');
  });
});
