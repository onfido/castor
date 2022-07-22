export interface OptionProps {
  disabled?: boolean;
  selected?: boolean;
  value: string | number | readonly string[];
}

export interface OptionListProps {
  name?: string;
  value?: string | number | readonly string[];
}
