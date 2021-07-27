export interface PopoverProps {
  placement?: Placement;
}

export type Placement = `${Position}-${Alignment}`;
export type Position = 'top' | 'bottom' | 'left' | 'right';
export type Alignment = 'center' | 'start' | 'end';
