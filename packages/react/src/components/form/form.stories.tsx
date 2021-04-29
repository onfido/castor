import {
  Asterisk,
  Button,
  Checkbox,
  Field,
  FieldLabel,
  Form,
  FormProps,
  HelperText,
  Input,
  Radio,
  Validation,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, Story } from '../../../../../docs';
import { FieldsetLegend } from '../fieldset-legend/fieldset-legend';
import { Fieldset } from '../fieldset/fieldset';

export default {
  title: 'React/Form',
  component: Form,
} as Meta<FormProps<Values>>;

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  day?: number;
  month?: number;
  year?: number;
  source?: string;
  agreement: boolean;
}

export const Playground: Story<FormProps<Values>> = (props) => (
  <Form {...props}>
    <Field>
      <FieldLabel>
        <span>
          First name <Asterisk aria-label="required" />
        </span>
        <Input name="firstName" required />
      </FieldLabel>
      <Validation state="error" if="valueMissing">
        Please fill in this field
      </Validation>
    </Field>

    <Field>
      <FieldLabel>
        <span>
          Last name <Asterisk aria-label="required" />
        </span>
        <Input name="lastName" required />
      </FieldLabel>
      <Validation state="error" if="valueMissing">
        Please fill in this field
      </Validation>
    </Field>

    <Field>
      <FieldLabel>
        <span>
          Email address <Asterisk aria-label="required" />
        </span>
        <Input type="email" name="email" required />
      </FieldLabel>
      <Validation state="error" if="valueMissing">
        Please fill in this field
      </Validation>
      <Validation state="error" if="typeMismatch">
        Please enter a valid email address
      </Validation>
    </Field>

    <Field>
      <FieldLabel htmlFor="dob-day">
        Date of birth
        <HelperText>DD / MM / YYYY</HelperText>
      </FieldLabel>
      <div
        style={{
          display: 'grid',
          gap: '0.5rem',
          grid: '1fr / 5rem 5rem 6rem',
        }}
      >
        <Input
          id="dob-day"
          type="number"
          name="day"
          placeholder="DD"
          min={1}
          max={31}
        />
        <Input type="number" name="month" placeholder="MM" min={1} max={12} />
        <Input
          type="number"
          name="year"
          placeholder="YYYY"
          min={new Date().getUTCFullYear() - 150}
          max={new Date().getUTCFullYear()}
        />
      </div>
    </Field>

    <Fieldset
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FieldsetLegend>How did you hear about us?</FieldsetLegend>
      <Radio name="source">
        Social media
        <HelperText>Facebook, Twitter, TikTok, etc...</HelperText>
      </Radio>
      <Radio name="source">Search engine</Radio>
      <Radio name="source">Word of mouth</Radio>
      <Radio name="source">Other...</Radio>
    </Fieldset>

    <Field>
      <Checkbox name="agreement" required>
        I agree to the{' '}
        <a
          href="https://github.com/onfido/castor"
          style={{ pointerEvents: 'auto' }}
        >
          Privacy policy
        </a>{' '}
        and{' '}
        <a
          href="https://github.com/onfido/castor"
          style={{ pointerEvents: 'auto' }}
        >
          Terms and conditions
        </a>
        .
      </Checkbox>
      <Validation state="error" if="valueMissing">
        Please confirm you agree
      </Validation>
    </Field>

    <Button>Send email</Button>
  </Form>
);
