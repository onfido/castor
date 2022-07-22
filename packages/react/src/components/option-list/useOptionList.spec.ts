import { describe, expect, it } from '@jest/globals';
import { useContext } from 'react';
import { OptionListProvider, useOptionList } from './useOptionList';

jest.mock('react', () => {
  const context = { Provider: {} };
  return {
    createContext: () => context,
    useContext: () => context,
  };
});

describe('OptionListProvider', () => {
  it('should be the context.Provider', () => {
    const context = useContext<any>(null as any);

    expect(OptionListProvider).toBe(context.Provider);
  });
});

describe('useOptionList', () => {
  it('should simply wrap useContext', () => {
    const context = useContext(null as any);

    const result = useOptionList();

    expect(result).toBe(context);
  });
});
