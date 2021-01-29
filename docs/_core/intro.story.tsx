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
      You can install with <code>npm</code> CLI tool:
    </p>
    <Source
      language="bash"
      code={`
        npm install @onfido/castor
      `}
      format
      dark
    />
    <p>
      If you plan to use icons, also install <code>Castor Icons</code> package:
    </p>
    <Source
      language="bash"
      code={`
        npm install @onfido/castor-icons
      `}
      format
      dark
    />
  </>
);
