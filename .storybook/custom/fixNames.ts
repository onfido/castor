import {
  Checkbox,
  Fieldset,
  Form,
  Input,
  Progress,
  Radio,
  Spinner,
  Textarea,
} from '@onfido/castor-react';
import { FC } from 'react';

// It is unclear why some of these fail to have their name inferred correctly
// by Storybook tools, but for every instance where it does we can simply
// hard-code them here.
// Only applies to Storybook, not to the output library.

(Checkbox as FC).displayName = 'Checkbox';
(Fieldset as FC).displayName = 'Fieldset';
(Form as FC).displayName = 'Form';
(Input as FC).displayName = 'Input';
(Progress as FC).displayName = 'Progress';
(Radio as FC).displayName = 'Radio';
(Spinner as FC).displayName = 'Spinner';
(Textarea as FC).displayName = 'Textarea';
