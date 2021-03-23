import { c, classy, FormProps as BaseProps, m } from '@onfido/castor';
import React, { FormEvent, useState } from 'react';
import { getFormValues } from './getFormValues';
import { FormProvider } from './useForm';

export { useForm } from './useForm';

export const Form = <T extends Values>({
  disabled,
  onChange,
  onInvalid,
  onSubmit,
  className,
  ...restProps
}: FormProps<T>) => {
  const [touched, setTouched] = useState<boolean>();

  return (
    <FormProvider value={{ disabled, touched }}>
      <form
        {...restProps}
        className={classy(c('form'), m({ disabled }), className)}
        onChange={(event) =>
          onChange?.(event, getFormValues(event.currentTarget))
        }
        onInvalid={(event) => {
          event.preventDefault();
          setTouched(true);
          onInvalid?.(event);
        }}
        onSubmit={(event) => {
          event.preventDefault();
          setTouched(true);

          if (disabled) return;

          // prevent disabled buttons from submitting
          // https://github.com/facebook/react/issues/7711
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { submitter } = event.nativeEvent as any;
          if ((submitter as HTMLButtonElement)?.disabled) return;

          onSubmit?.(event, getFormValues(event.currentTarget));
        }}
      />
    </FormProvider>
  );
};

export interface FormProps<T extends Values>
  extends BaseProps,
    Omit<JSX.IntrinsicElements['form'], 'onChange' | 'onSubmit'> {
  onChange?: (event: FormEvent<HTMLFormElement>, values: T) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>, values: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Values = Record<string, any>;
