import { c, classy, m, SelectProps as BaseProps } from '@onfido/castor';
import React, { ForwardedRef, useEffect, useState } from 'react';
import { MaybeIcon } from '../../internal';
import { useForwardedRef, withRef } from '../../utils';
import { CustomSelect, CustomSelectProps } from './custom';
import { NativeSelect, NativeSelectProps } from './native';
import { SelectProvider } from './useSelect';

export type SelectProps = (Native | Custom) & {
  icon?: JSX.Element;
};

type Native = { native: true } & BaseProps & NativeSelectProps;
type Custom = { native?: false } & BaseProps &
  Omit<CustomSelectProps, 'open' | 'onOpenChange'>;

/**
 * `Select` by default uses an `Icon` that requires `Icons` (SVG sprite) to be
 * included in your app.
 *
 * https://github.com/onfido/castor-icons#use-with-plain-code
 *
 * You may also provide any other SVG element via the `icon` prop, but using
 * Castor iconography is recommended.
 */
export const Select = withRef(function Select(
  { borderless, className, icon, native, onChange, ...restProps }: SelectProps,
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
        <MaybeIcon icon={icon} name="chevron-down" />
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
