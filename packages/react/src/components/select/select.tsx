import { c, classy, m, SelectProps as BaseProps } from '@onfido/castor';
import { Icon } from '@onfido/castor-react';
import React, { ForwardedRef, useEffect, useState } from 'react';
import { useForwardedRef, withRef } from '../../utils';
import { CustomSelect, CustomSelectProps } from './custom';
import { NativeSelect, NativeSelectProps } from './native';
import { SelectProvider } from './useSelect';

export type SelectProps =
  | ({ native: true } & BaseProps & NativeSelectProps)
  | ({ native?: false } & BaseProps &
      Omit<CustomSelectProps, 'open' | 'onOpenChange'>);

/**
 * `Select` uses an `Icon` that requires `Icons` (SVG sprite) to be included in
 * your app.
 *
 * https://github.com/onfido/castor-icons#use-with-plain-code
 */
export const Select = withRef(function Select(
  { borderless, className, native, onChange, ...restProps }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  const { defaultValue, value } = restProps;
  const selectRef = useForwardedRef(ref);
  const [empty, setEmpty] = useState(!(value ?? defaultValue));
  const [open, setOpen] = useState(false);

  // on every re-render, check for "empty" just after a DOM cycle
  useEffect(() => void setTimeout(() => setEmpty(!selectRef.current?.value)));

  useEffect(() => {
    if (value != null) setEmpty(!value);
  }, [value]);

  return (
    <div
      className={classy(c('select'), m({ borderless, empty, open }), className)}
    >
      <SelectProvider value={{ native }}>
        <Content
          {...restProps}
          ref={selectRef}
          borderless={borderless}
          native={native}
          open={open}
          onChange={(event) => {
            setEmpty(!event.currentTarget.value);
            onChange?.(event);
          }}
          onOpenChange={setOpen}
        />
        <Icon name="chevron-down" aria-hidden="true" />
      </SelectProvider>
    </div>
  );
});

interface ContentProps extends CustomSelectProps {
  borderless?: boolean;
  native?: boolean;
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

const Content = withRef(function Content(
  { borderless, native, open, onOpenChange, ...restProps }: ContentProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  if (native) return <NativeSelect {...restProps} ref={ref} />;

  return (
    <CustomSelect
      {...restProps}
      ref={ref}
      borderless={borderless}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
});
