import {
  Description,
  Radio as BaseRadio,
  RadioProps,
} from '@onfido/castor-react';
import React, { useEffect, useState } from 'react';
import { Meta, omit, Story, storyOf } from '../../../../../docs';

const Radio = (props: RadioProps): JSX.Element => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (checked) {
        setChecked(false);
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [checked]);

  return (
    <BaseRadio {...props} checked={checked} onChange={() => setChecked(true)} />
  );
};

export default {
  title: 'React/Radio',
  component: Radio,
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
} as Meta<RadioProps>;

export const Playground: Story<RadioProps> = (props: RadioProps) => (
  <Radio {...props} />
);

export const Bordered = storyOf(Radio, 'bordered', [true, false], {
  labelMode: 'children',
});
Bordered.argTypes = omit<RadioProps>('bordered');

export const Invalid = storyOf(Radio, 'invalid', [true, false], {
  labelMode: 'children',
});
Invalid.argTypes = omit<RadioProps>('invalid');

export const Disabled = storyOf(Radio, 'disabled', [true, false], {
  labelMode: 'children',
});
Disabled.argTypes = omit<RadioProps>('disabled');

interface RadioWithDescriptionProps extends RadioProps {
  label: string;
  description: string;
}

export const WithDescription = ({
  label,
  description,
  disabled,
  ...restRadioProps
}: RadioWithDescriptionProps) => (
  <Radio {...{ ...restRadioProps, disabled }}>
    {label}
    <Description {...{ disabled }}>{description}</Description>
  </Radio>
);
WithDescription.argTypes = omit<RadioWithDescriptionProps>('children');
WithDescription.args = {
  label: 'Label',
  description: 'Description',
};
