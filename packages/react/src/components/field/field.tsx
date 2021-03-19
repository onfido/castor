import { c, classy, FieldProps as BaseProps, FieldState } from '@onfido/castor';
import { useForm } from '@onfido/castor-react';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FieldProvider } from './useField';

export { useField } from './useField';

/**
 * Use to wrap any input component (`Input`, `Textarea`, `Radio`, `Checkbox`)
 * to make `Validation` react to its `ValidityState`. Requires a [name].
 *
 * @example
 * <Field>
 *   <Input name="foo" minlength={3} required />
 *   <Validation state="error" if="valueMissing">
 *     Will show if [required] is invalid.
 *   </Validation>
 *   <Validation state="error" if="tooShort">
 *     Will show if [minlength] is invalid.
 *   </Validation>
 * </Field>
 */
export const Field = ({
  disabled,
  onBlur,
  onChange,
  onInvalid,
  className,
  ...restProps
}: FieldProps): JSX.Element => {
  const form = useForm();
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
};

export type FieldProps = BaseProps & JSX.IntrinsicElements['div'];
