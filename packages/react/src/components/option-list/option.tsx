import { c, classy } from '@onfido/castor';
import React, { ReactNode, useEffect } from 'react';
import { MaybeIcon } from '../../internal';
import { textContent } from '../../utils';
import { useOptionList } from './useOptionList';

export interface OptionProps extends JsxLabel {
  children?: ReactNode;
  disabled?: boolean;
  /**
   * Keywords that can also match Combobox search.
   * If `true` will always show regardless of search term.
   */
  keywords?: string | readonly string[] | boolean;
  value: string | number | readonly string[];
}

export function Option({
  children,
  className,
  disabled,
  hidden,
  keywords,
  value: optionValue,
  onClick,
  onKeyUp,
  ...restProps
}: OptionProps) {
  const { icon, initialize, name, search, select, value } = useOptionList();

  useEffect(() => initialize(children, optionValue), []);

  if (hidden) return null;
  if (!matches(search, children, optionValue, keywords)) return null;

  const selectOption = () => disabled || select(children, optionValue);
  const selected = value == optionValue;

  return (
    <label
      {...restProps}
      className={classy(c('option'), className)}
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
        aria-hidden={true}
        className={classy(c('option-input'))}
        checked={selected}
        disabled={disabled}
        name={name}
        readOnly
        type="radio"
      />
      <span role="option" className={classy(c('option-content'))}>
        {children}
      </span>
      {selected && !disabled && <MaybeIcon icon={icon} name="check" />}
    </label>
  );
}

const matches = (
  search: string | undefined,
  children: ReactNode,
  value: Value | number,
  keywords: Value | boolean
) => {
  if (keywords === true) return true;

  const label = textContent(children);
  const term = search?.toLowerCase().trim();
  const values = [label, value, keywords].flat().map(String).filter(Boolean);

  return !term || values.some((v) => v?.toLowerCase().includes(term));
};

const selectOptionKeys = new Set([' ', 'Enter']);

type JsxLabel = JSX.IntrinsicElements['label'];
type Value = string | readonly string[] | undefined;
