import { c, classy, m, PopoverProps, SelectProps } from '@onfido/castor';
import React, {
  ReactNode,
  SyntheticEvent,
  useEffect,
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
  onBlur,
  onClick,
  onKeyUp,
  onOpenChange,
  value,
  ...restProps
}: CustomSelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const options = useRef(new Map<typeof value, ReactNode>());

  // initialize with empty array to ensure re-render even with nullish value
  const [currentValue, _setCurrentValue] = useState<typeof value>([]);
  const setCurrentValue = (value: typeof currentValue) =>
    // default to first option if value is not in options
    _setCurrentValue(
      options.current.has(value) ? value : options.current.keys().next().value
    );

  // set initial value only after options have been initialized
  useEffect(() => setCurrentValue(value ?? defaultValue), []);

  // set value every time it changes and it's not nullish
  useEffect(() => {
    if (value != null) setCurrentValue(value);
  }, [value]);

  const name = useMemo(
    () => initialName || `castor-select-${++id}`,
    [initialName]
  );

  const open = () => onOpenChange?.(true);
  const close = () => {
    onOpenChange?.(false);
    focus(selectRef.current);
  };

  const selectedOption = options.current.get(currentValue);

  return (
    <CustomSelectProvider
      value={{
        name,
        selectedOption,
        value: currentValue,
        initialize(option, optionValue) {
          options.current.set(optionValue, option);
        },
        select(option, optionValue) {
          // if there are repeated keys, make the selected one take priority
          options.current.set(optionValue, option);
          setCurrentValue(optionValue);
          close();
          // propagate onChange manually because <select> won't naturally when
          // its value is changed programatically by React, and on next tick
          // because React needs to update its value first
          setTimeout(() =>
            selectRef.current?.dispatchEvent(
              new Event('change', { bubbles: true })
            )
          );
        },
      }}
    >
      <NativeSelect
        {...restProps}
        ref={selectRef}
        className={classy(m('absolute'), className)}
        name={name}
        onBlur={(event) => {
          // if the Popover is open, focus is still inside Select
          // we don't want Field/Form validation to trigger
          if (isOpen) event.stopPropagation();
          onBlur?.(event);
        }}
        onClick={(event) => {
          isOpen ? close() : open();
          onClick?.(event);
        }}
        onKeyUp={(event) => {
          if (openSelectKeys.has(event.key)) open();
          onKeyUp?.(event);
        }}
      >
        {!currentValue || <option hidden value={currentValue} />}
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
