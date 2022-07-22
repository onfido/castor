import { createContext, ReactNode, useContext } from 'react';

const OptionListContext = createContext({} as OptionListState);

export const useOptionList = () => useContext(OptionListContext);

export const OptionListProvider = OptionListContext.Provider;

export interface OptionListState {
  icon?: JSX.Element;
  initialize: (option: ReactNode, value: Value) => void;
  name?: string;
  search?: string;
  select: (option: ReactNode, value: Value) => void;
  value?: Value;
}

type Value = string | number | readonly string[];
