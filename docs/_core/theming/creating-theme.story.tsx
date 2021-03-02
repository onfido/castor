import { Source } from '@storybook/components';
import React from 'react';

export const CreatingTheme = () => (
  <>
    <p>Castor components use theme tokens for styling.</p>
    <p>
      Most of a time theme tokens will be using base tokens with an alpha
      variation. But it can also have static values.
    </p>
    <p>When creating a new theme, each theme token must be defined.</p>
    <p>
      Easiest would be to extend one of Castor themes, for example a
      &#34;day&#34; theme, and then changing some of theme tokens:
    </p>
    <Source
      language="scss"
      code={`
        @use '~@onfido/castor';

        // .castor-theme--custom-a
        @include castor.theme('custom-a', 'class') {
          @include castor.day();

          // custom overrides in a format: r(ed), g(reen), b(lue), a(lpha)
          --ods-color-content-main: 0, 0, 0, 1;
          --ods-color-content-secondary: 136, 136, 136, 0.8;
        }
      `}
      format
      dark
    />
    <p>
      Or by extending a &#34;night&#34; theme, and then changing some of base
      tokens:
    </p>
    <Source
      language="scss"
      code={`
        @use '~@onfido/castor';

        // .castor-theme--custom-b
        @include castor.theme('custom-b', 'class') {
          @include castor.night();

          // custom overrides in a format: r(ed), g(reen), b(lue)
          --ods-color-neutral-700: 96, 96, 96;
          --ods-color-primary-500: 255, 20, 147;
        }
      `}
      format
      dark
    />
    <p>
      Also, you can use Castor&#39;s default &#34;day&#34; and &#34;night&#34;
      themes, but instead override base tokens:
    </p>
    <Source
      language="scss"
      code={`
        @use '~@onfido/castor';

        :root {
          @include castor.tokens();

          // custom overrides that will affect all themes
          --ods-color-neutral-700: 96, 96, 96;
          --ods-color-primary-500: 255, 20, 147;
        }

        @include castor.day('class', 'raw');
        @include castor.night('class', 'raw');
      `}
      format
      dark
    />
    <p>
      Please note that here default Castor themes are used as &#34;raw&#34;, as
      they should not include base tokens but use the ones attached/overriden
      from the <code>:root</code> element.
    </p>
  </>
);
