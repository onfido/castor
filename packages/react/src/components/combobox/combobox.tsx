import {
  c,
  classy,
  ComboboxProps as BaseProps,
  InputProps,
  m,
  PopoverProps,
} from '@onfido/castor';
import {
  Input,
  OptionList,
  OptionListEvent,
  Popover,
} from '@onfido/castor-react';
import React, {
  ForwardedRef,
  SyntheticEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MaybeIcon } from '../../internal';
import { textContent, withRef } from '../../utils';
import { OptionListInit } from '../option-list/options-list-init';

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
    id: initialId,
    align = 'start',
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
  const [input, setInput] = useState('');
  const [search, setSearch] = useState<string>();
  const [placeholder, setPlaceholder] = useState<string>();
  const [selected, setSelected] = useState<OptionListEvent>({});
  const [open, setOpen] = useState(false);
  const preventBlur = useRef(false);

  const id = useMemo(() => `castor_combobox_${++idCount}`, [initialId]);

  const close = () => setOpen(false);

  return (
    <div ref={ref} className={classy(c('combobox'), m({ open }), className)}>
      <input
        ref={valueRef}
        disabled={disabled}
        hidden
        name={name}
        onChange={() => void 0}
        value={selected.value || ''}
      />
      <Input
        {...restProps}
        ref={inputRef}
        id={id}
        role="combobox"
        value={input}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        onBlur={(event) => {
          if (preventBlur.current) return (preventBlur.current = false);

          setInput(textContent(selected.option));
          setSearch(undefined);
          close();
          onBlur?.(event);
        }}
        onChange={(event) => {
          setInput(event.target.value);
          setSearch(event.target.value);
          onChange?.(event);
        }}
        onClick={(event) => {
          setOpen(true);
          onClick?.(event);
        }}
        onKeyUp={(event) => {
          // ignore 'Tab'
          if (event.key !== 'Tab') {
            // select first option if confirming when focus is still on inputRef
            if (open && confirmKeys.has(event.key))
              select(optionsRef.current?.querySelector('input:enabled'));
            // arrow up and down keys move inside popover
            else if (navigateKeys.has(event.key)) {
              preventBlur.current = true;
              focus(optionsRef.current?.querySelector('input:enabled'));
              setOpen(true);
            }
            // close if 'Esc' is pressed, otherwise open on any other key
            else setOpen(!closeKeys.has(event.key));
          }

          onKeyUp?.(event);
        }}
        aria-controls={`${id}_options`}
        aria-autocomplete="list"
        aria-expanded={open}
      />

      <MaybeIcon icon={icon} name="chevron-down" />

      {open && (
        <Popover
          align={align}
          className={classy(c('combobox-dropdown'))}
          overlay
          position={position}
          target={inputRef}
          onClose={() => {
            setInput(textContent(selected.option));
            setSearch(undefined);
            close();
          }}
          // stop bubbling so that Field validation isn't affected
          onBlur={stopPropagation}
          onChange={stopPropagation}
          onInvalid={stopPropagation}
        >
          <OptionList
            ref={optionsRef}
            id={`${id}_options`}
            defaultValue={defaultValue}
            icon={selectedIcon}
            name={name}
            search={search}
            value={selected.value ?? value ?? defaultValue}
            onChange={(selected) => {
              preventBlur.current = true;
              setSelected(selected);
              setInput(textContent(selected.option));
              setSearch(undefined);
              focus(inputRef.current);
              close();
              // propagate onChange manually because <input> won't naturally when
              // its value is changed programatically by React, and on next tick
              // because React needs to update its value first
              setTimeout(() =>
                valueRef.current?.dispatchEvent(
                  new Event('change', { bubbles: true })
                )
              );
            }}
            onKeyDown={(event) => {
              // ignore 'Enter'
              if (confirmKeys.has(event.key)) return;
              // close if focus moves outside
              if (event.key === 'Tab') {
                close();
                return event.preventDefault();
              }
              // reset state on 'Esc'
              if (closeKeys.has(event.key)) {
                focus(inputRef.current);
                return close();
              }
              // any other key is assumed to be typing on the Input
              if (!navigateKeys.has(event.key)) {
                if (moveCursorKeys.has(event.key)) event.preventDefault();
                return focus(inputRef.current);
              }
            }}
            onKeyUp={(event) => {
              // close on 'Enter' after change happened
              if (confirmKeys.has(event.key)) return close();
            }}
            onPointerDown={() => {
              preventBlur.current = true;
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
        <OptionListInit
          defaultValue={defaultValue}
          value={value}
          onInit={(first) => setPlaceholder(textContent(first.option))}
        >
          {children}
        </OptionListInit>
      )}
    </div>
  );
});

const closeKeys = new Set(['Escape', 'Enter']);
const confirmKeys = new Set(['Enter']);
const moveCursorKeys = new Set(['ArrowLeft', 'ArrowRight']);
const navigateKeys = new Set(['ArrowDown', 'ArrowUp', 'Enter']);

const focus = (element: HTMLElement | null | undefined) =>
  element?.focus({ preventScroll: true });

// dispatch event to fake pressing 'Enter' to select option and close popover
const select = (element: HTMLElement | null | undefined) =>
  element?.dispatchEvent(
    new KeyboardEvent('keyup', { bubbles: true, key: 'Enter' })
  );

const stopPropagation = (event: SyntheticEvent) => event.stopPropagation();

let idCount = 0;
