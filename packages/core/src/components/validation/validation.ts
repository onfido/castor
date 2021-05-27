export interface ValidationProps {
  if?: Exclude<keyof ValidityState, 'valid'> | 'invalid';
  state: 'error';
  withIcon?: boolean;
}
