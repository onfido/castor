import {
  c,
  classy,
  ComboboxProps as BaseProps,
  m,
  PopoverProps,
  SelectProps,
} from '@onfido/castor';
import React, {
  ForwardedRef,
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MaybeIcon } from '../../internal';
import { textContent, withRef } from '../../utils';
import { Input } from '../input/input';
import { OptionList, OptionListEvent } from '../option-list/option-list';
import { OptionListInit } from '../option-list/options-list-init';
import { Popover } from '../popover/popover';

export interface ComboboxProps
  extends BaseProps,
    SelectProps,
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
    required,
    selectedIcon,
    value,
    ...restProps
  }: ComboboxProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState<string>();
  const [placeholder, setPlaceholder] = useState<string>();
  const [selected, setSelected] = useState<OptionListEvent>({});
  const [open, setOpen] = useState(false);
  const preventBlur = useRef(false);

  const id = useMemo(() => `castor_combobox_${++idCount}`, [initialId]);

  const propagateOnChange = useCallback(() => {
    // propagate `onChange` manually because <select> won't naturally when its
    // value is changed programatically by React, and on next tick, because
    // React needs to update its value first
    setTimeout(() =>
      selectRef.current?.dispatchEvent(new Event('change', { bubbles: true }))
    );
  }, []);

  const close = () => setOpen(false);

  return (
    <div ref={ref} className={classy(c('combobox'), m({ open }), className)}>
      <select
        ref={selectRef}
        name={name}
        disabled={disabled}
        required={required}
        hidden
        onChange={
          (onChange as JSX.IntrinsicElements['select']['onChange']) ??
          (() => void 0)
        }
      >
        {!selected.value || <option hidden value={selected.value} />}
      </select>
      <Input
        {...restProps}
        ref={inputRef}
        id={id}
        role="combobox"
        value={input}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        required={required}
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
        }}
        onClick={(event) => {
          if (!open) {
            setOpen(true);
            preventBlur.current = true;
          }

          onClick?.(event);
        }}
        onKeyUp={(event) => {
          // ignore 'Tab' - expect arrow up/down keys to open when/if pressed
          if (event.key !== 'Tab') {
            // select first option if confirming when focus is still on inputRef
            if (open && confirmKeys.has(event.key) && !selected.value) {
              select(optionsRef.current?.querySelector('input:enabled'));
            }
            // arrow up and down keys move inside popover
            else if (navigateKeys.has(event.key)) {
              if (!open) setOpen(true);
              preventBlur.current = true;
              setTimeout(() =>
                focus(optionsRef.current?.querySelector('input:enabled'))
              );
            }
            // close if 'Esc' is pressed, otherwise open on any other key
            else {
              setOpen(!closeKeys.has(event.key));
            }
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
              preventBlur.current = false;
              setSelected(selected);
              setInput(textContent(selected.option));
              setSearch(undefined);
              propagateOnChange();
              focus(inputRef.current);
              close();
            }}
            onKeyDown={(event) => {
              // ignore confirmation keys
              if (confirmKeys.has(event.key)) return;
              // reset state on closing key press
              else if (closeKeys.has(event.key)) {
                focus(inputRef.current);
                close();
              }
              // close if focus moves outside
              else if (event.key === 'Tab') {
                close();
                event.preventDefault();
              }
              // any other key is assumed to be typing on <input>
              else if (!navigateKeys.has(event.key)) {
                if (moveCursorKeys.has(event.key)) event.preventDefault();
                focus(inputRef.current);
              }
            }}
            onKeyUp={(event) => {
              // close on confirmation key press after change happened
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
          onInit={(selected) => {
            setSelected(selected);
            if (!selected.value) setPlaceholder(textContent(selected.option));
            else {
              setInput(textContent(selected.option));
              propagateOnChange();
            }
          }}
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
