export interface ProgressProps {
  children?: string;
  hideLabel?: boolean;
  max?: number;
  min?: number;
  size?: 'regular' | 'large';
  value: number;
}
