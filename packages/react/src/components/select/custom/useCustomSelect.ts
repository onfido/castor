import { createContext, Dispatch, SetStateAction, useContext } from 'react';

const CustomSelectContext = createContext({} as CustomSelectState);

export const useCustomSelect = () => useContext(CustomSelectContext);

export const CustomSelectProvider = CustomSelectContext.Provider;

export interface CustomSelectState extends OptionsManager, FocusOptionManager {
  value: Option['value'];
  setValue: Dispatch<SetStateAction<Option['value']>>;
}

interface OptionsManager {
  options: IndexedOption[];
  addOption: (id: IndexedOption['id'], option: Option) => void;
  changeOption: (id: IndexedOption['id'], option: Option) => void;
  removeOption: (id: IndexedOption['id']) => void;
}

interface FocusOptionManager {
  focusOption: IndexedOption | null;
  setFocusOption: Dispatch<SetStateAction<IndexedOption>>;
}

export interface Option {
  value: string;
  title?: string | number | null;
}

export interface IndexedOption extends Option {
  id: number;
}
