import { describe, expect, it } from '@jest/globals';
import { splitContainerProps } from './splitContainerProps';

describe('splitContainerProps', () => {
  it('should split props into [containerProps, inputProps]', () => {
    const foo = {};
    const props = { foo, bar: 1, 'data-test': 'bar' };

    const [containerProps, inputProps] = splitContainerProps(props as any);

    expect(containerProps).toStrictEqual({ 'data-test': 'bar' });
    expect(inputProps).toStrictEqual({ foo, bar: 1 });
  });
});
