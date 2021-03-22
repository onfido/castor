import { describe, expect, it } from '@jest/globals';
import { useContext } from 'react';
import { FormProvider, useForm } from './useForm';

jest.mock('react', () => {
  const context = { Provider: {} };
  return {
    createContext: () => context,
    useContext: () => context,
  };
});

describe('FormProvider', () => {
  it('should be the context.Provider', () => {
    const context = useContext<any>(null as any);

    expect(FormProvider).toBe(context.Provider);
  });
});

describe('useForm', () => {
  it('should simply wrap useContext', () => {
    const context = useContext(null as any);

    const result = useForm();

    expect(result).toBe(context);
  });
});
