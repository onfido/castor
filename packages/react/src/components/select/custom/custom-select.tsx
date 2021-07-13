import { c, classy, m, SelectProps as BaseProps } from '@onfido/castor';
import React, { ReactNode, useRef, useState } from 'react';
import { PopoverPortal } from '../../popover/portal';
import { NativeSelect } from '../native/native-select';
import { CustomSelectProvider } from './useCustomSelect';

export function CustomSelect({
  children,
  className,
  defaultValue,
  name,
  ...props
}: CustomSelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedOption, setSelectedOption] = useState<ReactNode>();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(props.value ?? defaultValue);

  const select = (option: ReactNode, value?: CustomSelectProps['value']) => {
    setSelectedOption(option);
    setValue(value);
    // there is no value on defaultValue assignments, so don't close
    if (value != null) close();
  };

  const open = () => setIsOpen(true);

  const close = () => {
    setIsOpen(false);
    selectRef.current?.focus();
  };

  const toggle = () => (isOpen ? close() : open());

  return (
    <CustomSelectProvider
      value={{
        name: name || `castor-select-${++id}`,
        select,
        selectedOption,
        value,
      }}
    >
      <div className={classy(c('select'), m({ open: isOpen }), className)}>
        <NativeSelect
          {...props}
          ref={selectRef}
          name={name}
          value={value}
          onClick={toggle}
          onKeyUp={(ev) => {
            if (openSelectKeys.has(ev.key)) open();
          }}
        />
        <output className={classy(c('select-output'))}>{selectedOption}</output>
        {isOpen && (
          <PopoverPortal>
            <div
              ref={(element) => {
                // focus first question when nothing selected on open
                if (!selectedOption) element?.querySelector('input')?.focus();
              }}
              className={classy(c('select-dropdown'))}
              onKeyUp={(ev) => {
                if (closeSelectKeys.has(ev.key)) close();
              }}
              onKeyDown={(ev) => {
                // close if focus moves outside
                if (ev.key === 'Tab') setTimeout(close);
              }}
            >
              {children}
            </div>
          </PopoverPortal>
        )}
      </div>
    </CustomSelectProvider>
  );
}

export type CustomSelectProps = BaseProps & JSX.IntrinsicElements['select'];

const closeSelectKeys = new Set(['Escape']);
const openSelectKeys = new Set([' ', 'ArrowDown', 'ArrowUp']);

let id = 0;
