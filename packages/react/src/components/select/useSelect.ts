import { createContext, useContext } from 'react';

const SelectContext = createContext({} as SelectState);

export const useSelect = () => useContext(SelectContext);

export const SelectProvider = SelectContext.Provider;

export interface SelectState {
  native?: boolean;
}
