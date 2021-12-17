// waiting on official types but until then we can augment them a bit, see
// https://github.com/storybookjs/storybook/issues/11916

import { ArgType as BaseArgType } from '@storybook/addons';
import { StoryContext } from '@storybook/csf';
import { ReactFramework } from '@storybook/react/types-6-0';
import {
  Meta as BaseMeta,
  Story as BaseStory,
} from '@storybook/react/types-7-0';
import { FC, ReactNode } from 'react';
import { ContainerParams } from '../decorators/withContainer';

export interface Meta<Args>
  extends Omit<BaseMeta<Args>, 'argTypes' | 'component' | 'render'>,
    Annotation<Args> {
  component: FC<Args> | ((props: Args) => string);
  render?: Render<Args>;
  parameters?: Parameters;
}

export interface Story<Args>
  extends Omit<BaseStory<Args>, 'argTypes' | 'render'>,
    Annotation<Args> {
  parameters?: Parameters;
  render?: Render<Args>;
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

type Render<Args> = (
  args: Args,
  context: StoryContext<ReactFramework, Args>
) => ReactNode;

type Parameters = BaseStory['parameters'] & ContainerParams & DocsParams;

/**
 * Types some of '@storybook/addon-docs'.
 * https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md
 */
interface DocsParams {
  docs?: {
    disable?: boolean;
    description?: { story?: string };
    source?: { code?: string };
    page?: FC;
  };
}

type ArgTypes<Props> = {
  [key in keyof Props]?: ArgType<Props[key]>;
};

export interface ArgType<T> extends BaseArgType {
  control?: Control<T> | Control<T>['type'] | Disable;
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
