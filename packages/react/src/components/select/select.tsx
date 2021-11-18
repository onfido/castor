import { c, classy, m, SelectProps as BaseProps } from '@onfido/castor';
import { Icon } from '@onfido/castor-react';
import React, { useEffect, useState } from 'react';
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
export const Select = ({
  borderless,
  className,
  native,
  onChange,
  ...restProps
}: SelectProps) => {
  const { defaultValue, value } = restProps;
  const [empty, setEmpty] = useState(!(value ?? defaultValue));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (defaultValue == null) setEmpty(!value);
  }, [value]);

  return (
    <div
      className={classy(c('select'), m({ borderless, empty, open }), className)}
    >
      <SelectProvider value={{ native }}>
        <Content
          {...restProps}
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
};

interface ContentProps extends CustomSelectProps {
  borderless?: boolean;
  native?: boolean;
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

function Content({
  borderless,
  native,
  open,
  onOpenChange,
  ...restProps
}: ContentProps) {
  if (native) return <NativeSelect {...restProps} />;

  return (
    <CustomSelect
      {...restProps}
      borderless={borderless}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
