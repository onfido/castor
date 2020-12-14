import { Primary, Stories } from '@storybook/addon-docs/blocks';
import React from 'react';

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
