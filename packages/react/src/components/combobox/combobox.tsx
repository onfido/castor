import {
  c,
  classy,
  ComboboxProps as BaseProps,
  InputProps,
  m,
  PopoverProps,
} from '@onfido/castor';
import { Input } from '@onfido/castor-react';
import React, { ForwardedRef, SyntheticEvent, useRef, useState } from 'react';
import { MaybeIcon } from '../../internal';
import { textContent, withRef } from '../../utils';
import { OptionList, OptionListEvent } from '../option-list/option-list';
import { OptionListProvider } from '../option-list/useOptionList';
import { Popover } from '../popover/popover';
import { CustomSelectProps } from '../select/custom';

export interface ComboboxProps
  extends BaseProps,
    InputProps,
    PopoverProps,
    Omit<JSX.IntrinsicElements['input'], 'type'> {
  icon?: JSX.Element;
  /** Option to show when search yields no results. */
  empty?: string;
  selectedIcon?: JSX.Element;
}

/**
 * `Combobox` by default uses two `Icon` that require `Icons` (SVG sprite) to be
 * included in your app.
 *
 * https://github.com/onfido/castor-icons#use-with-plain-code
 *
 * You may also provide any other SVG element via the `icon` and `selectedIcon`
 * props, but using Castor iconography is recommended.
 */
export const Combobox = withRef(function Combobox(
  {
    align,
    children,
    className,
    defaultValue,
    disabled,
    empty = 'No matching options',
    icon,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyUp,
    position = 'bottom',
    selectedIcon,
    value,
    ...restProps
  }: ComboboxProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [placeholder, setPlaceholder] = useState<string>();
  const [selected, setSelected] = useState<OptionListEvent>({});
  const [open, setOpen] = useState(false);
  const preventBlur = useRef(false);

  const close = () => setOpen(false);

  return (
    <div
      {...restProps}
      ref={ref}
      className={classy(c('combobox'), m({ open }), className)}
    >
      <input
        ref={valueRef}
        disabled={disabled}
        hidden
        name={name}
        onChange={() => void 0}
        value={selected.value || ''}
      />
      <Input
        ref={inputRef}
        autoComplete="off"
        disabled={disabled}
        placeholder={placeholder}
        value={search}
        onBlur={(event) => {
          if (preventBlur.current) return (preventBlur.current = false);

          setSearch(textContent(selected.option));
          close();
          onBlur?.(event);
        }}
        onChange={(event) => {
          setSearch(event.target.value);
          onChange?.(event);
        }}
        onClick={(event) => {
          setOpen(true);
          onClick?.(event);
        }}
        onFocus={(event) => {
          setSearch('');
          setOpen(true);
          onFocus?.(event);
        }}
        onKeyUp={(event) => {
          // arrow up and down keys move inside popover
          if (navigateKeys.has(event.key)) {
            preventBlur.current = true;
            focus(optionsRef.current?.querySelector('input:enabled'));
            setOpen(true);
            preventBlur.current = false;
          }
          // select first option if confirming when focus is still on inputRef
          else if (open && confirmKeys.has(event.key))
            click(optionsRef.current?.querySelector('input:enabled'));
          // close if 'Esc' is pressed, otherwise open on any other key
          else setOpen(!closeKeys.has(event.key));

          onKeyUp?.(event);
        }}
      />

      {!open && (
        <output className={classy(c('select-output'))}>
          {selected.option}
          &nbsp; {/* non-breaking space guarantees element height */}
        </output>
      )}

      <MaybeIcon icon={icon} name="chevron-down" />

      {open && (
        <Popover
          align={align}
          className={classy(c('select-dropdown'))}
          overlay
          position={position}
          target={inputRef}
          onClose={close}
          onPointerDown={() => {
            preventBlur.current = true;
          }}
          onKeyUp={(event) => {
            // 'Esc' moves back to inputRef
            if (closeKeys.has(event.key)) focus(inputRef.current);
          }}
          onKeyDown={(event) => {
            // close if focus moves outside
            if (event.key === 'Tab') {
              close();
              event.preventDefault();
            }
          }}
          // stop bubbling so that Field validation isn't affected
          onBlur={stopPropagation}
          onChange={stopPropagation}
          onInvalid={stopPropagation}
        >
          <OptionList
            ref={optionsRef}
            defaultValue={defaultValue}
            icon={selectedIcon}
            name={name}
            search={search}
            value={selected.value ?? value ?? defaultValue}
            onChange={(selected) => {
              setSelected(selected);
              focus(inputRef.current);
              // propagate onChange manually because <input> won't naturally when
              // its value is changed programatically by React, and on next tick
              // because React needs to update its value first
              setTimeout(() =>
                valueRef.current?.dispatchEvent(
                  new Event('change', { bubbles: true })
                )
              );
            }}
          >
            {children}
            <div className={classy(c('option-content'), m('empty'))}>
              {empty}
            </div>
          </OptionList>
        </Popover>
      )}

      {!placeholder && (
        <Init
          defaultValue={defaultValue}
          value={value}
          onInit={(first) => setPlaceholder(textContent(first.option))}
        >
          {children}
        </Init>
      )}
    </div>
  );
});

const Init = ({
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

const closeKeys = new Set(['Escape']);
const confirmKeys = new Set(['Enter']);
const navigateKeys = new Set(['ArrowDown', 'ArrowUp']);

const click = (element: HTMLElement | null | undefined) =>
  // dispatch event because `detail` must be truthy
  element?.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));

const focus = (element: HTMLElement | null | undefined) =>
  element?.focus({ preventScroll: true });

const noop = () => void 0;

const stopPropagation = (event: SyntheticEvent) => event.stopPropagation();
