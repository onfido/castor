import React from 'react';
import { Primary, Stories } from '@storybook/addon-docs/blocks';

const docsPage = () => (
  <>
    <Primary />
    <Stories />
  </>
);

export default {
  title: 'Castor',
  parameters: {
    docs: { page: docsPage },
  },
};

export { Intro } from './intro.story';
