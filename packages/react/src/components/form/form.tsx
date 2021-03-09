import { c, classy, FormProps as BaseProps } from '@onfido/castor';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { getFormValues } from './getFormValues';
import { FormProvider, FormState } from './useForm';

export function Form<T extends Values>({
  className,
  disabled,
  onChange,
  onInvalid,
  onSubmit,
  ...restProps
}: FormProps<T>) {
  const ref = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ disabled } as FormState);

  useEffect(() => update({ disabled }), [disabled]);

  const update = (values: Partial<FormState>) =>
    setForm((form) => ({ ...form, ...values }));

  return (
    <FormProvider value={form}>
      <form
        {...restProps}
        ref={ref}
        className={classy(c('form'), className)}
        onChange={(event) =>
          onChange?.(event, getFormValues(event.currentTarget))
        }
        onInvalid={(event) => {
          event.preventDefault();
          update({ touched: true });
          onInvalid?.(event);
        }}
        onSubmit={(event) => {
          event.preventDefault();
          update({ touched: true });

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
}

export interface FormProps<T extends Values>
  extends BaseProps,
    Omit<JSX.IntrinsicElements['form'], 'onChange' | 'onSubmit'> {
  onChange?: (event: FormEvent<HTMLFormElement>, values: T) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>, values: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Values = Record<string, any>;
