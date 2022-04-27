export interface InputProps {
  disabled?: boolean;
  invalid?: boolean;
  type?:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'tel'
    | 'url'
    | 'search'
    | 'date';
}
