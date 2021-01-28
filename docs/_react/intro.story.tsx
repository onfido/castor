import { Source } from '@storybook/components';
import React from 'react';

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
    <p>
      Then (only once) inline the <code>Icons</code> SVG sprite in your app:
    </p>
    <Source
      language="jsx"
      code={`
        import { Icons } from '@onfido/castor-icons';
        import React, { Fragment } from 'react';
        
        const App = () => (
          <Fragment>
            <Icons />
            {/* ...anything else e.g. app routes */}
          </Fragment>
        );
      `}
      format
      dark
    />
  </>
);
