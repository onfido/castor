import { c, classy, m } from '@onfido/castor';
import React, { MouseEvent, useEffect, useMemo, useRef } from 'react';
import { useCustomSelect } from './useCustomSelect';

let idCount = 0;

export const CustomOption = ({
  value: externalValue,
  children: title,
  className,
  onClick,
  ...restProps
}: CustomOptionProps): JSX.Element => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const internalId = useMemo<number>(() => ++idCount, []);
  const {
    value: currentValue,
    setValue,
    addOption,
    changeOption,
    removeOption,
  } = useCustomSelect();

  const value = externalValue.toString();
  const selected = currentValue === value;

  useEffect(() => {
    addOption(internalId, { value, title });
    return () => {
      removeOption(internalId);
    };
  }, []);

  useEffect(() => {
    changeOption(internalId, { value, title });
  }, [value, title]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setValue(value);
    onClick?.(event);
  };

  return (
    <button
      {...restProps}
      ref={ref}
      className={classy(c('select-custom-option'), m({ selected }), className)}
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
