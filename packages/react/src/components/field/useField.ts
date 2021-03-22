import { FieldState } from '@onfido/castor';
import { createContext, useContext } from 'react';

const FieldContext = createContext({} as FieldState);

export const useField = () => useContext(FieldContext);

export const FieldProvider = FieldContext.Provider;
