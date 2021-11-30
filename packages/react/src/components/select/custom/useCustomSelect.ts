import { createContext, ReactNode, useContext } from 'react';

const CustomSelectContext = createContext({} as CustomSelectState);

export const useCustomSelect = () => useContext(CustomSelectContext);

export const CustomSelectProvider = CustomSelectContext.Provider;

export interface CustomSelectState {
  initialize: (option: ReactNode, value: Value) => void;
  name?: string;
  select: (option: ReactNode, value: Value) => void;
  value?: Value;
}

type Value = string | number | readonly string[];
