export interface ProgressProps {
  children?: string;
  hideLabel?: boolean;
  max?: number;
  size?: 'regular' | 'large';
  value: number;
}
