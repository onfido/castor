import { Checkbox, CheckboxProps, Description } from '@onfido/castor-react';
import React, { ChangeEvent, useRef } from 'react';
import { Meta, omit, Story, storyOf } from '../../../../../docs';

export default {
  title: 'React/Checkbox',
  component: Checkbox,
  argTypes: {
    children: { control: 'text' },
    bordered: {
      table: { type: { summary: 'boolean' } },
    },
    invalid: {
      table: { type: { summary: 'boolean' } },
    },
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
  },
  args: {
    bordered: false,
    invalid: false,
    disabled: false,
  },
} as Meta<CheckboxProps>;

export const Playground: Story<CheckboxProps> = (props: CheckboxProps) => (
  <Checkbox {...props} />
);

export const Bordered = storyOf(Checkbox, 'bordered', [true, false], {
  labelMode: 'children',
});
Bordered.argTypes = omit<CheckboxProps>('bordered');
Bordered.args = { name: 'bordered-playground' };

export const Invalid = storyOf(Checkbox, 'invalid', [true, false], {
  labelMode: 'children',
});
Invalid.argTypes = omit<CheckboxProps>('invalid');
Invalid.args = { name: 'invalid-playground' };

export const Disabled = storyOf(Checkbox, 'disabled', [true, false], {
  labelMode: 'children',
});
Disabled.argTypes = omit<CheckboxProps>('disabled');
Disabled.args = { name: 'disabled-playground' };

export const AsIndeterminate = (props: CheckboxProps) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const handleChange = ({
    target: { checked: indeterminate },
  }: ChangeEvent<HTMLInputElement>) => {
    if (checkboxRef.current) checkboxRef.current.indeterminate = indeterminate;
  };

  return <Checkbox {...props} ref={checkboxRef} onChange={handleChange} />;
};

interface CheckboxWithDescriptionProps extends CheckboxProps {
  label: string;
  description: string;
}

export const WithDescription = ({
  label,
  description,
  ...restCheckboxProps
}: CheckboxWithDescriptionProps) => (
  <Checkbox {...restCheckboxProps}>
    {label}
    <Description>{description}</Description>
  </Checkbox>
);
WithDescription.argTypes = omit<CheckboxWithDescriptionProps>('children');
WithDescription.args = {
  label: 'Label',
  description: 'Description',
};
