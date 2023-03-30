import { describe, expect, it, jest } from '@jest/globals';
import { useContext } from 'react';
import { useForm } from '../form/useForm';
import { FieldProvider, useField } from './useField';

jest.mock('@onfido/castor-react', () => ({ useForm: jest.fn() }));
jest.mock('react', () => {
  const context = { Provider: {} };
  return {
    createContext: () => context,
    useContext: jest.fn(() => context),
  };
});

describe('FieldProvider', () => {
  it('should be the context.Provider', () => {
    const context = useContext<any>(null as any);

    expect(FieldProvider).toBe(context.Provider);
  });
});

describe('useField', () => {
  it('should non-nullish-ly merge form and field state', () => {
    const form = { disabled: true, touched: undefined };
    (useForm as jest.Mock).mockReturnValueOnce(form);
    const field = { disabled: undefined, validity: {} };
    (useContext as jest.Mock).mockReturnValueOnce(field);

    const result = useField();

    expect(result).toStrictEqual({ disabled: true, validity: field.validity });
  });
});
