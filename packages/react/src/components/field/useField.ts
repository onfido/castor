import { FieldState } from '@onfido/castor';
import { useForm } from '@onfido/castor-react';
import { createContext, useContext } from 'react';

const FieldContext = createContext({} as FieldState);

export const useField = () => {
  const form = useForm();
  const field = useContext(FieldContext);

  return { ...omitNullish(form), ...omitNullish(field) } as FieldState;
};

export const FieldProvider = FieldContext.Provider;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const omitNullish = <T extends Record<string, any>>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value != null)
  ) as Partial<T>;
