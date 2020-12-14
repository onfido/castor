import { Source } from '@storybook/components';
import React from 'react';

export const Intro = () => (
  <>
    <h1>Castor</h1>
    <p>
      <i>Castor</i> is Onfido&#39;s design system.
    </p>

    <h2>Install</h2>
    <p>
      You can install with <code>npm</code>:
    </p>
    <Source
      language="bash"
      code={`
        npm install @onfido/castor @onfido/castor-icons
      `}
      format
      dark
    />
    <p>
      Or add with <code>Yarn</code>:
    </p>
    <Source
      language="bash"
      code={`
        yarn add @onfido/castor @onfido/castor-icons
      `}
      format
      dark
    />
  </>
);
