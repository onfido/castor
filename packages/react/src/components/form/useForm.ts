import { createContext, useContext } from 'react';

const FormContext = createContext({} as FormState);

export const useForm = () => useContext(FormContext);

export const FormProvider = FormContext.Provider;

export interface FormState {
  disabled?: boolean;
  touched?: boolean;
}
