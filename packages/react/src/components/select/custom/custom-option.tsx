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
  hidden,
  value: optionValue,
  onClick,
  onKeyUp,
  ...restProps
}: CustomOptionProps) {
  const { initialize, name, select, value } = useCustomSelect();

  useEffect(() => initialize(children, optionValue), []);

  if (hidden) return null;

  const selectOption = () => disabled || select(children, optionValue);
  const selected = value == optionValue;

  return (
    <label
      {...restProps}
      className={classy(c('select-option'), className)}
      onClick={(event) => {
        // moving through options with arrow keys (onChange) will trigger
        // onClick events here, but we don't want to select then, so we filter
        // only events that have detail, which are triggered by mouse clicks
        if (event.detail) selectOption();
        onClick?.(event);
      }}
      onKeyUp={(event) => {
        if (selectOptionKeys.has(event.key)) selectOption();
        onKeyUp?.(event);
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
      {selected && !disabled && (
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
