import { c, classy } from '@onfido/castor';
import React, {
  ForwardedRef,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { withRef } from '../../utils';
import { OptionListProvider } from './useOptionList';

export type OptionListProps = Omit<JSX.IntrinsicElements['div'], 'onChange'> & {
  icon?: JSX.Element;
  name?: string;
  onChange?: (selected: OptionListEvent) => void;
  search?: string;
  value?: string | number | readonly string[];
};

export interface OptionListEvent {
  option?: ReactNode;
  value?: string | number | readonly string[];
}

/**
 * `OptionList` by default uses an `Icon` that requires `Icons` (SVG sprite) to
 * be included in your app.
 *
 * https://github.com/onfido/castor-icons#use-with-plain-code
 *
 * You may also provide any other SVG element via the `icon` prop, but using
 * Castor iconography is recommended.
 */
export const OptionList = withRef(function OptionList(
  {
    className,
    defaultValue,
    icon,
    name: initialName,
    onChange,
    search,
    value,
    ...restProps
  }: OptionListProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const options = useRef(new Map<typeof value, ReactNode>());

  // initialize with empty array to ensure re-render even with nullish value
  const [currentValue, _setCurrentValue] = useState<typeof value>(
    value ?? defaultValue ?? []
  );
  const setCurrentValue = (value: typeof currentValue) =>
    // default to first option if value is not in options
    _setCurrentValue(
      options.current.has(value) ? value : options.current.keys().next().value
    );

  // set value every time it changes and it's not nullish
  useEffect(() => {
    if (value != null) setCurrentValue(value);
  }, [value]);

  const name = useMemo(
    () => initialName || `castor-options-${++id}`,
    [initialName]
  );

  return (
    <OptionListProvider
      value={{
        icon,
        name,
        search,
        value: currentValue,
        initialize(option, value) {
          options.current.set(value, option);
        },
        select(option, value) {
          // if there are repeated keys, make the selected one take priority
          options.current.set(value, option);
          setCurrentValue(value);
          onChange?.({ option, value });
        },
      }}
    >
      <div
        {...restProps}
        ref={ref}
        role="listbox"
        className={classy(c('option-list'), className)}
      />
    </OptionListProvider>
  );
});

let id = 0;
