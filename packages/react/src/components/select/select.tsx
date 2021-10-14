import { c, classy, m, SelectProps as BaseProps } from '@onfido/castor';
import { Icon } from '@onfido/castor-react';
import React, { useEffect, useState } from 'react';
import { CustomSelect, CustomSelectProps } from './custom';
import { NativeSelect, NativeSelectProps } from './native';
import { SelectProvider } from './useSelect';

export type SelectProps =
  | ({ native: true } & BaseProps & NativeSelectProps)
  | ({ native?: false } & BaseProps &
      Omit<CustomSelectProps, 'open' | 'onOpenChange' | 'onSelectOption'>);

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
  ...restProps
}: SelectProps) => {
  const { defaultValue, value } = restProps;
  const [empty, setEmpty] = useState(!(value ?? defaultValue));
  const [open, setOpen] = useState(false);

  useEffect(() => setEmpty(!value), [value]);

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
          onEmptyChange={setEmpty}
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
  onEmptyChange: (empty: boolean) => void;
  onOpenChange: (open: boolean) => void;
}

function Content({
  borderless,
  native,
  open,
  onChange,
  onEmptyChange,
  onOpenChange,
  ...restProps
}: ContentProps) {
  if (native)
    return (
      <NativeSelect
        {...restProps}
        onChange={(event) => {
          onEmptyChange(!event.currentTarget.value);
          onChange?.(event);
        }}
      />
    );

  return (
    <CustomSelect
      {...restProps}
      borderless={borderless}
      open={open}
      onOpenChange={onOpenChange}
      onSelectOption={(value) => onEmptyChange(!value)}
    />
  );
}
