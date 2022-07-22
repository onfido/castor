import { c, classy, m, PopoverProps, SelectProps } from '@onfido/castor';
import React, { ForwardedRef, SyntheticEvent, useState } from 'react';
import { useForwardedRef, withRef } from '../../../utils';
import { OptionList, OptionListEvent } from '../../option-list/option-list';
import { OptionListInit } from '../../option-list/options-list-init';
import { Popover } from '../../popover/popover';
import { NativeSelect, NativeSelectProps } from '../native';

export interface CustomSelectProps
  extends SelectProps,
    NativeSelectProps,
    PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  selectedIcon?: JSX.Element;
}

export const CustomSelect = withRef(function CustomSelect(
  {
    id,
    align = 'start',
    borderless,
    children,
    className,
    defaultValue,
    name,
    open: isOpen,
    position = 'bottom',
    onBlur,
    onClick,
    onKeyUp,
    onOpenChange,
    selectedIcon,
    value,
    ...restProps
  }: CustomSelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  const selectRef = useForwardedRef(ref);
  const [selected, setSelected] = useState<OptionListEvent>({});

  const open = () => onOpenChange?.(true);
  const close = () => {
    onOpenChange?.(false);
    focus(selectRef.current);
  };

  return (
    <>
      <NativeSelect
        {...restProps}
        ref={selectRef}
        id={id}
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
        aria-controls={`${id}_options`}
        aria-autocomplete="list"
        aria-expanded={isOpen}
      >
        {!selected.value || <option hidden value={selected.value} />}
      </NativeSelect>

      <output className={classy(c('select-output'))}>
        {selected.option}
        &nbsp; {/* non-breaking space guarantees element height */}
      </output>

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
          onRender={(element) => {
            // focus :checked option if :enabled, otherwise first :enabled
            focus(
              element?.querySelector(':checked:enabled') ??
                element?.querySelector('input:enabled')
            );
          }}
          // stop bubbling so that Field validation isn't affected
          onBlur={stopPropagation}
          onChange={stopPropagation}
          onInvalid={stopPropagation}
        >
          <OptionList
            id={`${id}_options`}
            defaultValue={defaultValue}
            icon={selectedIcon}
            name={name}
            value={selected.value ?? value ?? defaultValue}
            onChange={(selected) => {
              setSelected(selected);
              close();
              // propagate onChange manually because <select> won't naturally when
              // its value is changed programatically by React, and on next tick
              // because React needs to update its value first
              setTimeout(() =>
                selectRef.current?.dispatchEvent(
                  new Event('change', { bubbles: true })
                )
              );
            }}
          >
            {children}
          </OptionList>
        </Popover>
      )}

      {!selected.option && (
        <OptionListInit
          defaultValue={defaultValue}
          value={value}
          onInit={setSelected}
        >
          {children}
        </OptionListInit>
      )}
    </>
  );
});

const closeSelectKeys = new Set(['Escape']);
const openSelectKeys = new Set([' ', 'ArrowDown', 'ArrowUp']);

const focus = (element: HTMLElement | null | undefined) =>
  element?.focus({ preventScroll: true });

const stopPropagation = (event: SyntheticEvent) => event.stopPropagation();
