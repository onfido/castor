import { describe, expect, it, jest } from '@jest/globals';
import { withRef } from './withRef';

jest.mock('react', () => ({ forwardRef: (c: any) => c }));

describe('withRef', () => {
  it('should simply proxy forwardRef', () => {
    const component = () => null;

    expect(withRef(component)).toBe(component);
  });
});
