import { createContext, ReactNode, useContext } from 'react';

const CustomSelectContext = createContext({} as CustomSelectState);

export const useCustomSelect = () => useContext(CustomSelectContext);

export const CustomSelectProvider = CustomSelectContext.Provider;

export interface CustomSelectState {
  name?: string;
  register: (option: ReactNode, value: Value) => void;
  select: (option: ReactNode, value: Value) => void;
  selectedOption?: ReactNode;
  value?: Value;
}

type Value = string | number | readonly string[];
