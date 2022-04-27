export interface CalendarProps {
  canSelectFuture?: boolean;
  canSelectPast?: boolean;
  selectedDate?: string | null;
  onDateSelect: (date: string) => void;
}
