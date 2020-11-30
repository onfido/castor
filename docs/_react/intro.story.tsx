import React from 'react';
import { Source } from '@storybook/components';

export const Intro = () => (
  <>
    <h1>Castor React</h1>
    <p>
      <i>Castor React</i> is Onfido&#39;s design system addition. It provides
      React component library.
    </p>

    <h2>Install</h2>
    <p>
      You can install with <code>npm</code>:
    </p>
    <Source
      language="bash"
      code={`
        npm install @onfido/castor @onfido/castor-icons @onfido/castor-react
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
        yarn add @onfido/castor @onfido/castor-icons @onfido/castor-react
      `}
      format
      dark
    />
  </>
);
