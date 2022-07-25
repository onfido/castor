import React, { useRef } from 'react';
import { ComboboxProps } from '../combobox/combobox';
import { CustomSelectProps } from '../select/custom';
import { OptionListEvent } from './option-list';
import { OptionListProvider } from './useOptionList';

export const OptionListInit = ({
  children,
  defaultValue,
  value,
  onInit,
}: (
  | Pick<ComboboxProps, 'children' | 'defaultValue' | 'value'>
  | Pick<CustomSelectProps, 'children' | 'defaultValue' | 'value'>
) & {
  onInit: (selected: OptionListEvent) => void;
}) => {
  const hasInit = useRef(false);

  const currentValue = value ?? defaultValue;

  return (
    <OptionListProvider
      value={{
        value: currentValue,
        initialize(option, value) {
          if (hasInit.current) return;
          if (!currentValue || value === currentValue) {
            hasInit.current = true;
            onInit({ option, value });
          }
        },
        select: noop,
      }}
    >
      <div style={{ display: 'none' }}>{children}</div>
    </OptionListProvider>
  );
};

const noop = () => void 0;
