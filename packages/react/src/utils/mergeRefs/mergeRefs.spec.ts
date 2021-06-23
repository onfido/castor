import { describe, expect, it } from '@jest/globals';
import { LegacyRef, MutableRefObject } from 'react';
import { mergeRefs } from './mergeRefs';

describe('mergeRefs', () => {
  it('should merge multiple ref objects', () => {
    const ref1: LegacyRef<any> = jest.fn();
    const ref2: MutableRefObject<any> = { current: null };
    const component = () => null;

    mergeRefs(ref1, ref2)(component);

    expect(ref1).toHaveBeenCalledTimes(1);
    expect(ref1).toHaveBeenCalledWith(component);
    expect(ref2.current).toBe(component);
  });
});
