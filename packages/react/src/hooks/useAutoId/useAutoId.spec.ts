import { describe, expect, it } from '@jest/globals';
import { useAutoId } from './useAutoId';

jest.mock('react', () => ({ useMemo: (fn: any) => fn() }));

describe('useAutoId', () => {
  it('should generate with same unique prefix', () => {
    const result1 = useAutoId('castor_test');

    expect(result1).toEqual('castor_test_1');

    const result2 = useAutoId('castor_test');

    expect(result2).toEqual('castor_test_2');
  });

  it('should generate with different unique prefixes', () => {
    const result1 = useAutoId('castor_test1');

    expect(result1).toEqual('castor_test1_3');

    const result2 = useAutoId('castor_test2');

    expect(result2).toEqual('castor_test2_4');
  });
});
