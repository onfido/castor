import { describe, expect, it } from '@jest/globals';
import { useContext } from 'react';
import { SelectProvider, useSelect } from './useSelect';

jest.mock('react', () => {
  const context = { Provider: {} };
  return {
    createContext: () => context,
    useContext: () => context,
  };
});

describe('SelectProvider', () => {
  it('should be the context.Provider', () => {
    const context = useContext<any>(null as any);

    expect(SelectProvider).toBe(context.Provider);
  });
});

describe('useSelect', () => {
  it('should simply wrap useContext', () => {
    const context = useContext(null as any);

    const result = useSelect();

    expect(result).toBe(context);
  });
});
