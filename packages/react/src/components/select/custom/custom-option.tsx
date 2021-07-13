import { c, classy } from '@onfido/castor';
import React, { ReactNode, useEffect } from 'react';
import { useCustomSelect } from './useCustomSelect';

export function CustomOption({
  children,
  disabled,
  value: optionValue,
  ...props
}: CustomOptionProps) {
  const { name, select, selectedOption, value } = useCustomSelect();

  // defaultValue check
  useEffect(() => {
    if (selected && !selectedOption) select(children);
  }, []);

  const selected = value == optionValue;
  const selectOption = () => select(children, optionValue);

  return (
    <label
      {...props}
      className={classy(c('select-option'))}
      onKeyUp={({ key }) => {
        if (selectOptionKeys.has(key)) selectOption();
      }}
      onMouseUp={selectOption}
    >
      <input
        autoFocus={selected}
        checked={selected}
        disabled={disabled}
        name={name}
        readOnly
        type="radio"
      />
      <span>{children}</span>
    </label>
  );
}

export type CustomOptionProps = JSX.IntrinsicElements['label'] & {
  children?: ReactNode;
  disabled?: boolean;
  value: Value;
};

type Value = JSX.IntrinsicElements['select']['value'];

const selectOptionKeys = new Set([' ', 'Enter']);
