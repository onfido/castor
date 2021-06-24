import { c, classy, m } from '@onfido/castor';
import React, { MouseEvent, useEffect, useMemo, useRef } from 'react';
import { useCustomSelect } from './useCustomSelect';

let idCount = 0;

export const CustomOption = ({
  value: externalValue,
  children: title,
  disabled,
  className,
  onMouseEnter,
  onClick,
  ...restProps
}: CustomOptionProps): JSX.Element => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const internalId = useMemo<number>(() => ++idCount, []);
  const {
    value: currentValue,
    focusOption: currentFocusOption,
    setValue,
    setFocusOption,
    addOption,
    changeOption,
    removeOption,
  } = useCustomSelect();

  const value = externalValue.toString();
  const focused = currentFocusOption?.id === internalId;
  const selected = currentValue === value;

  useEffect(() => {
    addOption(internalId, { value, title, disabled });
    return () => {
      removeOption(internalId);
    };
  }, []);

  useEffect(() => {
    changeOption(internalId, { value, title, disabled });
  }, [value, title, disabled]);

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    if (!focused) setFocusOption({ id: internalId, value });
    onMouseEnter?.(event);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!selected) setValue(value);
    onClick?.(event);
  };

  return (
    <button
      {...restProps}
      ref={ref}
      disabled={disabled}
      className={classy(
        c('select-custom-option'),
        m({ focused, selected }),
        className
      )}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export type CustomOptionProps = Omit<
  JSX.IntrinsicElements['button'],
  'children'
> & {
  children?: string | number | null;
  value: string | number;
};
