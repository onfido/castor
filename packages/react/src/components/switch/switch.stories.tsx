import { color, type SwitchProps } from '@onfido/castor';
import { Field, FieldLabel, Fieldset, Switch } from '@onfido/castor-react';
import React, { useState, type ChangeEvent } from 'react';
import { Meta, Story } from '../../../../../docs';

export default {
  title: 'React/Switch',
  component: Switch,
  argTypes: {
    checked: {
      type: 'boolean',
    },
    children: { description: 'Acts as a label for the `<input>`.' },
    disabled: {
      type: 'boolean',
    },
  },
  args: {
    children: '',
  },
  parameters: {},
} as Meta<SwitchProps>;

export const Playground: Story<SwitchProps> = {};

export const Examples: Story<SwitchProps> = {
  render: () => {
    const [switchState, setSwitchState] = useState(true);
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSwitchState(event.target.checked);
    };

    return (
      <Fieldset>
        <Field>
          <Switch id="test1">
            <FieldLabel htmlFor="test1" style={{ width: 250 }}>
              Label
            </FieldLabel>
          </Switch>
        </Field>
        <Field>
          <Switch id="test2" disabled>
            <FieldLabel
              htmlFor="test2"
              style={{ width: 250, color: color('content-disabled') }}
            >
              Label with disabled switch
            </FieldLabel>
          </Switch>
        </Field>
        <Field>
          <Switch id="test3" checked={switchState} onChange={handleOnChange}>
            <FieldLabel htmlFor="test3" style={{ width: 250 }}>
              Label with checked switch
            </FieldLabel>
          </Switch>
        </Field>
      </Fieldset>
    );
  },
};
