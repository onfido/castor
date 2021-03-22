import { describe, expect, it } from '@jest/globals';
import { useContext } from 'react';
import { FieldProvider, useField } from './useField';

jest.mock('react', () => {
  const context = { Provider: {} };
  return {
    createContext: () => context,
    useContext: () => context,
  };
});

describe('FieldProvider', () => {
  it('should be the context.Provider', () => {
    const context = useContext<any>(null as any);

    expect(FieldProvider).toBe(context.Provider);
  });
});

describe('useField', () => {
  it('should simply wrap useContext', () => {
    const context = useContext(null as any);

    const result = useField();

    expect(result).toBe(context);
  });
});
