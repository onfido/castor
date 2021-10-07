import { c, classy, m, PopoverProps, SelectProps } from '@onfido/castor';
import React, { ReactNode, useMemo, useRef, useState } from 'react';
import { Popover } from '../../popover/popover';
import { NativeSelect } from '../native';
import { CustomSelectProvider } from './useCustomSelect';

export type CustomSelectProps = SelectProps & PopoverProps & JsxSelect;

export function CustomSelect({
  align = 'start',
  borderless,
  children,
  className,
  defaultValue,
  name: initialName,
  position = 'bottom',
  ...props
}: CustomSelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedOption, setSelectedOption] = useState<ReactNode>();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(props.value ?? defaultValue);

  const name = useMemo(
    () => initialName || `castor-select-${++id}`,
    [initialName]
  );

  const open = () => setIsOpen(true);

  const close = () => {
    setIsOpen(false);
    focus(selectRef.current);
  };

  return (
    <CustomSelectProvider
      value={{
        name,
        selectedOption,
        value,
        initialize(option, optionValue) {
          // initial value
          if (value == optionValue) setSelectedOption(option);
          // or placeholder is first option
          else setSelectedOption((current) => current ?? option);
        },
        select(option, value) {
          setSelectedOption(option);
          setValue(value);
          close();
        },
      }}
    >
      <NativeSelect
        {...props}
        notNative
        ref={selectRef}
        borderless={borderless}
        className={className}
        name={name}
        open={isOpen}
        value={value}
        onClick={() => (isOpen ? close() : open())}
        onKeyUp={(event) => {
          if (openSelectKeys.has(event.key)) open();
        }}
      >
        <output className={classy(c('select-output'))}>{selectedOption}</output>
      </NativeSelect>

      {isOpen && (
        <Popover
          align={align}
          className={classy(c('select-dropdown'), m({ borderless }))}
          overlay
          position={position}
          target={selectRef}
          onClose={() => setIsOpen(false)}
          onKeyUp={(ev) => {
            if (closeSelectKeys.has(ev.key)) close();
          }}
          onKeyDown={(event) => {
            // close if focus moves outside
            if (event.key === 'Tab') {
              setTimeout(close);
              event.preventDefault();
            }
          }}
          onRender={(element) =>
            // focus either selected or first non-disabled question
            focus(
              element?.querySelector(':checked') ??
                element?.querySelector('input:not(:disabled)')
            )
          }
        >
          {children}
        </Popover>
      )}

      {/* render once to find placeholder */}
      {!selectedOption && <div style={{ display: 'none' }}>{children}</div>}
    </CustomSelectProvider>
  );
}

const closeSelectKeys = new Set(['Escape']);
const openSelectKeys = new Set([' ', 'ArrowDown', 'ArrowUp']);

const focus = (element: HTMLElement | null | undefined) =>
  element?.focus({ preventScroll: true });

let id = 0;

type JsxSelect = Omit<JSX.IntrinsicElements['select'], 'placeholder'>;
