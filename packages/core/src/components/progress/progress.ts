export interface ProgressProps {
  hideLabel?: boolean;
  max?: number;
  min?: number;
  size?: 'regular' | 'large';
  value: number;
}
