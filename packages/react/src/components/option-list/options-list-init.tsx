import React, { useRef } from 'react';
import { CustomSelectProps } from '../select/custom';
import { OptionListEvent } from './option-list';
import { OptionListProvider } from './useOptionList';

export const OptionListInit = ({
  children,
  defaultValue,
  value,
  onInit,
}: Pick<CustomSelectProps, 'children' | 'defaultValue' | 'value'> & {
  onInit: (selected: OptionListEvent) => void;
}) => {
  const hasInit = useRef(false);

  return (
    <OptionListProvider
      value={{
        value: value ?? defaultValue,
        initialize(option, value) {
          if (hasInit.current) return;
          hasInit.current = true;
          onInit({ option, value });
        },
        select: noop,
      }}
    >
      <div style={{ display: 'none' }}>{children}</div>
    </OptionListProvider>
  );
};

const noop = () => void 0;
