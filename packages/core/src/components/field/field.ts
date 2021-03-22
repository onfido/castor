export interface FieldProps {
  disabled?: boolean;
}

export interface FieldState {
  disabled: boolean;
  reset: () => void;
  touched: boolean;
  validity: ValidityState;
}
