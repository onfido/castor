import React, { FC, Fragment, ReactNode } from 'react';
import { Story } from '../helpers/story';
import styles from './storyOf.scss';

/**
 * Automatically generates a story for a `component` with all of the variations
 * for the specified `prop`.
 *
 * @param Component Component to generate story for.
 * @param prop Property to generate variants for.
 * @param propValues An array of all possible values for the `prop`.
 * @param config Defines how the story is created. See each property for their
 * description.
 *
 * @deprecated Use `reactMatrix` instead.
 */
export function storyOf<Props, Prop extends keyof Props>(
  Component: FC<Props>,
  prop: Prop,
  propValues: readonly Props[Prop][],
  { display = 'flow', labelMode = 'children', labelProp }: Config<Props> = {}
): Story<Props> {
  const MaybeContainer = roots.has(labelMode) ? Fragment : Container;

  return (props) => (
    <div className={styles[display]}>
      {propValues.map((value) => {
        const label = `${value}`;
        const propLabel =
          labelProp && labelMode === 'prop' ? { [labelProp]: label } : {};

        return (
          <MaybeContainer key={label}>
            {labelMode === 'before' && <span>{label}</span>}
            {
              <Component {...props} {...{ [prop]: value }} {...propLabel}>
                {labelMode === 'children' ? label : null}
              </Component>
            }
            {labelMode === 'after' && <span>{label}</span>}
          </MaybeContainer>
        );
      })}
    </div>
  );
}

interface Config<T> {
  /**
   * How to display each variation:
   * - `block` will use a full row for each
   * - `flow` will flex to content and wrap on overflow
   * - `grid` will organize items in four columns
   *
   * Default `flow`.
   */
  display?: Display;
  /**
   * Where to render the value of each variation.
   * Default `children`.
   *
   * @example
   * storyOf(Button, 'variant', ['primary']); // { labelMode: 'children' }
   * // <Button variant="primary">primary</Button>
   *
   * storyOf(Button, 'variant', ['primary'], { labelMode: 'before' });
   * // primary<Button variant="primary"/>
   *
   * storyOf(Button, 'variant', ['primary'], { labelMode: 'after' });
   * // <Button variant="primary"/>primary
   *
   * storyOf(
   *   Input,
   *   'variant',
   *   ['primary'],
   *   { labelMode: 'prop', labelProp: 'value' },
   * );
   * // <Input variant="primary" value="primary" />
   */
  labelMode?: LabelMode;
  /**
   * Prop to render the label on.
   */
  labelProp?: keyof T;
}

type Display = 'block' | 'flow' | 'grid';

type LabelMode = 'after' | 'before' | 'children' | 'prop' | 'none';

const roots = new Set<LabelMode>(['children', 'prop']);

const Container = ({ children }: { children: ReactNode }) => (
  <span className={styles.container}>{children}</span>
);
