import { c, classy, FieldProps as BaseProps, FieldState } from '@onfido/castor';
import { useForm } from '@onfido/castor-react';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { FieldProvider } from './useField';

/**
 * Intended to wrap `Input` and `Textarea` components, so that `FieldLabel` and
 * `Validation` can wrap nicely following the minimum content allowed.
 */
export function Field({
  className,
  disabled,
  onBlur,
  onChange,
  onInvalid,
  ...restProps
}: FieldProps): JSX.Element {
  const form = useForm();
  const ref = useRef<HTMLDivElement>(null);
  const [field, setField] = useState<FieldState>(initial);

  useEffect(() => update(form), [form]);

  function initial(): FieldState {
    const reset = () => setField(initial);
    return { ...form, disabled, reset, validity: {} } as FieldState;
  }

  const update = (state: Partial<FieldState>) =>
    setField((field) => ({ ...field, ...state }));

  const readInput = (event: SyntheticEvent<HTMLDivElement>) => {
    const { disabled, validity } = event.target as HTMLInputElement;
    update({ disabled, validity });
  };

  return (
    <FieldProvider value={field}>
      <div
        {...restProps}
        ref={ref}
        className={classy(c('field'), className)}
        onBlur={(event) => {
          update({ touched: true });
          readInput(event);
          onBlur?.(event);
        }}
        onChange={(event) => {
          readInput(event);
          onChange?.(event);
        }}
        onInvalid={(event) => {
          readInput(event);
          onInvalid?.(event);
        }}
      />
    </FieldProvider>
  );
}

export type FieldProps = BaseProps & JSX.IntrinsicElements['div'];
