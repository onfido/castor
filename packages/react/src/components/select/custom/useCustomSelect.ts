import { createContext, Dispatch, SetStateAction, useContext } from 'react';

const CustomSelectContext = createContext({} as CustomSelectState);

export const useCustomSelect = () => useContext(CustomSelectContext);

export const CustomSelectProvider = CustomSelectContext.Provider;

export interface CustomSelectState extends Pick<SelectElementProps, 'value'> {
  setValue: Dispatch<SetStateAction<string>>;
  addOption: (id: number, option: Option) => void;
  changeOption: (id: number, option: Option) => void;
  removeOption: (id: number) => void;
}

export interface Option {
  value: string;
  title?: string | number | null;
}

type SelectElementProps = JSX.IntrinsicElements['select'];
