// waiting on official types but until then we can augment them a bit, see
// https://github.com/storybookjs/storybook/issues/11916

import { ArgType as BaseArgType, StoryContext } from '@storybook/addons';
import {
  Meta as BaseMeta,
  Story as BaseStory,
} from '@storybook/react/types-6-0';
import { FC, ReactElement } from 'react';
import { ContainerParams } from '../decorators/withContainer';

export interface Meta<Args>
  extends Omit<BaseMeta<Args>, 'argTypes' | 'component'>,
    Annotation<Args> {
  component: FC<Args> | ((props: Args) => string);
  parameters?: BaseMeta['parameters'] & ContainerParams;
}

export interface Story<Args>
  extends Annotation<Args>,
    Omit<BaseStory<Args>, 'argTypes'> {
  (args: Args, context: StoryContext): ReactElement | ReactElement[] | string;
  parameters?: BaseStory['parameters'] & ContainerParams;
}

/**
 * Augments from '@storybook/addons' for better `argTypes` types.
 */
interface Annotation<Args> {
  /**
   * ArgTypes encode basic metadata for args, such as `name`, `description`,
   * `defaultValue` for an arg. These get automatically filled in by Storybook
   * Docs.
   *
   * @see [Control annotations](https://github.com/storybookjs/storybook/blob/91e9dee33faa8eff0b342a366845de7100415367/addons/controls/README.md#control-annotations)
   */
  argTypes?: ArgTypes<Args>;
}

type ArgTypes<Props> = {
  [key in keyof Props]?: ArgType<Props[key]>;
};

interface ArgType<T> extends BaseArgType {
  control?: Control<T> | Control<T>['type'] | Disable;
  defaultValue?: T;
  table?: Table;
  [key: string]: unknown;
}

type Control<T> =
  | ControlArray
  | ControlBare
  | ControlColor
  | ControlEnum<T>
  | ControlNumber;

interface ControlBare {
  type: 'boolean' | 'object' | 'text' | 'date';
}

interface ControlArray {
  type: 'array';
  separator?: string;
}

interface ControlColor {
  type: 'color';
  presetColors?: string[];
}

interface ControlEnum<Option> {
  type:
    | 'radio'
    | 'inline-radio'
    | 'check'
    | 'inline-check'
    | 'select'
    | 'multi-select';
  options: readonly Option[];
}

interface ControlNumber {
  type: 'number' | 'range';
  min?: number;
  max?: number;
  step?: number;
}

interface Table extends Disable {
  defaultValue?: Row;
  type?: Row;
}

interface Row {
  detail?: string;
  summary?: string;
}

interface Disable {
  disable?: boolean;
}
