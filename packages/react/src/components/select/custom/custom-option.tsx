import { c, classy } from '@onfido/castor';
import { Icon } from '@onfido/castor-react';
import React, { ReactNode, useEffect } from 'react';
import { useCustomSelect } from './useCustomSelect';

export interface CustomOptionProps extends JsxLabel {
  children?: ReactNode;
  disabled?: boolean;
  value: string | number | readonly string[];
}

export function CustomOption({
  children,
  className,
  disabled,
  value: optionValue,
  onKeyUp,
  onMouseUp,
  ...restProps
}: CustomOptionProps) {
  const { name, register, select, value } = useCustomSelect();

  useEffect(() => register(children, optionValue), []);

  const selectOption = () => disabled || select(children, optionValue);

  const selected = value == optionValue;

  return (
    <label
      {...restProps}
      className={classy(c('select-option'), className)}
      onKeyUp={(event) => {
        if (selectOptionKeys.has(event.key)) selectOption();
        onKeyUp?.(event);
      }}
      onMouseUp={(event) => {
        selectOption();
        onMouseUp?.(event);
      }}
    >
      <input
        className={classy(c('select-option-input'))}
        checked={selected}
        disabled={disabled}
        name={name}
        readOnly
        type="radio"
      />
      <span className={classy(c('select-option-content'))}>{children}</span>
      {selected && (
        <Icon
          className={classy(c('select-option-icon'))}
          aria-hidden="true"
          name="check"
        />
      )}
    </label>
  );
}

const selectOptionKeys = new Set([' ', 'Enter']);

type JsxLabel = JSX.IntrinsicElements['label'];
