import { c, classy, FieldProps as BaseProps, FieldState } from '@onfido/castor';
import React, { SyntheticEvent, useState } from 'react';
import { FieldProvider } from './useField';

export { useField } from './useField';

/**
 * Use to wrap any input component (`Input`, `Textarea`, `Radio`, `Checkbox`)
 * to make `Validation` react to its `ValidityState`.
 *
 * @example
 * <Field>
 *   <Input minLength={3} required />
 *   <Validation state="error" if="valueMissing">
 *     Will show if [required] is invalid.
 *   </Validation>
 *   <Validation state="error" if="tooShort">
 *     Will show if [minLength] is invalid.
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
  const [field, setField] = useState<FieldState>(initial);

  function initial(): FieldState {
    const reset = () => setField(initial);
    return { reset, validity: {} } as FieldState;
  }

  const update = (state: Partial<FieldState>) =>
    setField((field) => ({ ...field, ...state }));

  return (
    <FieldProvider value={{ ...field, disabled }}>
      <div
        {...restProps}
        className={classy(c('field'), className)}
        onBlur={(event) => {
          update({ touched: true, ...readInput(event) });
          onBlur?.(event);
        }}
        onChange={(event) => {
          update({ touched: true, ...readInput(event) });
          onChange?.(event);
        }}
        onInvalid={(event) => {
          update(readInput(event));
          onInvalid?.(event);
        }}
      />
    </FieldProvider>
  );
};

export type FieldProps = BaseProps & JSX.IntrinsicElements['div'];

const readInput = (event: SyntheticEvent<HTMLDivElement>) => {
  const { disabled, validity } = event.target as HTMLInputElement;
  return { ...(disabled != null && { disabled }), validity };
};
