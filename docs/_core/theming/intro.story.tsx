import { Source } from '@storybook/components';
import React from 'react';

export const Intro = () => (
  <>
    <p>
      Castor comes with generated theme <code>.css</code> files. You can use
      them directly in your app.
    </p>
    <p>For example, you may import a &#34;day&#34; theme via JavaScript:</p>
    <Source
      language="js"
      code={`
        import '@onfido/castor/dist/themes/day.css';
      `}
      format
      dark
    />
    <p>
      Then if you import also a &#34;night&#34; theme, it will override any
      previously imported one:
    </p>
    <Source
      language="js"
      code={`
        import '@onfido/castor/dist/themes/night.css';
      `}
      format
      dark
    />
    <p>
      This happens because a theme (or theme CSS variables, to be more precise)
      by default gets attached to a <code>:root</code> element of a document. So
      there can only be one at a time.
    </p>
    <p>
      In order to be able to switch between themes, Castor also comes with
      generated &#34;classed&#34; version of themes, alongside a theme switching
      helper:
    </p>
    <Source
      language="js"
      code={`
        import { switchTheme } from '@onfido/castor';
        import '@onfido/castor/dist/themes/day-class.css';
        import '@onfido/castor/dist/themes/night-class.css';

        // switch to a "day" theme
        switchTheme('day');
        // then to a "night" theme
        switchTheme('night');
      `}
      format
      dark
    />
    <p>
      You are also able to switch a theme on any selectable element, like such:
    </p>
    <Source
      language="js"
      code={`
        switchTheme('day', document.querySelector('.page'));
        switchTheme('night', document.querySelector('.section'));
      `}
      format
      dark
    />
    <p>This allows to manage multiple themes within one document.</p>
    <p>
      If you prefer, you may also include class themes within your Sass files:
    </p>
    <Source
      language="scss"
      code={`
        @use '~@onfido/castor';

        @include castor.day('class');
        @include castor.night('class');
      `}
      format
      dark
    />
    <p>
      And optimize such by including base tokens only once, then each
      &#34;raw&#34; version of a theme:
    </p>
    <Source
      language="scss"
      code={`
        @use '~@onfido/castor';

        :root {
          @include castor.tokens();
        }
        
        @include castor.day('class', 'raw');
        @include castor.night('class', 'raw');
      `}
      format
      dark
    />
  </>
);
