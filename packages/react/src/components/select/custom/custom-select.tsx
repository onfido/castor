import { c, classy, m, PopoverProps, SelectProps } from '@onfido/castor';
import React, {
  ReactNode,
  SyntheticEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Popover } from '../../popover/popover';
import { NativeSelect, NativeSelectProps } from '../native';
import { CustomSelectProvider } from './useCustomSelect';

export interface CustomSelectProps
  extends SelectProps,
    NativeSelectProps,
    PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelectOption?: (value: string | number | readonly string[]) => void;
}

export function CustomSelect({
  align = 'start',
  borderless,
  children,
  className,
  defaultValue,
  name: initialName,
  open: isOpen,
  position = 'bottom',
  onClick,
  onKeyUp,
  onOpenChange,
  onSelectOption,
  ...restProps
}: CustomSelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedOption, setSelectedOption] = useState<ReactNode>();
  const [value, setValue] = useState(restProps.value ?? defaultValue);

  const name = useMemo(
    () => initialName || `castor-select-${++id}`,
    [initialName]
  );

  const open = () => onOpenChange?.(true);

  const close = () => {
    onOpenChange?.(false);
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
          // or default to first option
          else setSelectedOption((current) => current ?? option);
        },
        select(option, value) {
          setSelectedOption(option);
          setValue(value);
          close();
          onSelectOption?.(value);
        },
      }}
    >
      <NativeSelect
        {...restProps}
        ref={selectRef}
        className={classy(m('absolute'), className)}
        name={name}
        onClick={(event) => {
          isOpen ? close() : open();
          onClick?.(event);
        }}
        onKeyUp={(event) => {
          if (openSelectKeys.has(event.key)) open();
          onKeyUp?.(event);
        }}
      >
        {!value || <option hidden value={value} />}
      </NativeSelect>

      <output className={classy(c('select-output'))}>{selectedOption}</output>

      {isOpen && (
        <Popover
          align={align}
          className={classy(c('select-dropdown'), m({ borderless }))}
          overlay
          position={position}
          target={selectRef}
          onClose={close}
          onKeyUp={(event) => {
            if (closeSelectKeys.has(event.key)) close();
          }}
          onKeyDown={(event) => {
            // close if focus moves outside
            if (event.key === 'Tab') {
              setTimeout(close);
              event.preventDefault();
            }
          }}
          onRender={(element) =>
            // focus :checked option if :enabled, otherwise first :enabled
            focus(
              element?.querySelector(':checked:enabled') ??
                element?.querySelector('input:enabled')
            )
          }
          // stop bubbling so that Field validation isn't affected
          onBlur={stopPropagation}
          onChange={stopPropagation}
          onInvalid={stopPropagation}
        >
          {children}
        </Popover>
      )}

      {/* render once to find output */}
      {!selectedOption && <div style={{ display: 'none' }}>{children}</div>}
    </CustomSelectProvider>
  );
}

const closeSelectKeys = new Set(['Escape']);
const openSelectKeys = new Set([' ', 'ArrowDown', 'ArrowUp']);

const focus = (element: HTMLElement | null | undefined) =>
  element?.focus({ preventScroll: true });

const stopPropagation = (event: SyntheticEvent) => event.stopPropagation();

let id = 0;
