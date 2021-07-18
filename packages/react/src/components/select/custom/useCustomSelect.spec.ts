import { describe, expect, it } from '@jest/globals';
import { useContext } from 'react';
import { CustomSelectProvider, useCustomSelect } from './useCustomSelect';

jest.mock('react', () => {
  const context = { Provider: {} };
  return {
    createContext: () => context,
    useContext: () => context,
  };
});

describe('CustomSelectProvider', () => {
  it('should be the context.Provider', () => {
    const context = useContext<any>(null as any);

    expect(CustomSelectProvider).toBe(context.Provider);
  });
});

describe('useCustomSelect', () => {
  it('should simply wrap useContext', () => {
    const context = useContext(null as any);

    const result = useCustomSelect();

    expect(result).toBe(context);
  });
});
