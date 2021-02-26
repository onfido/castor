# Castor React &middot; [![npm version](https://img.shields.io/npm/v/@onfido/castor-react.svg?style=flat-square)](https://www.npmjs.com/package/@onfido/castor-react)

_Castor React_ is Onfido's design system addition. It provides [React](https://reactjs.org/) component library.

## Get started

### Install packages

```sh
npm install @onfido/castor @onfido/castor-react
```

Follow [Castor](https://github.com/onfido/castor) instructions for initial setup.

If you plan to use Icon component, also install [Castor Icons](https://github.com/onfido/castor-icons) package:

```sh
npm install @onfido/castor-icons
```

Then (only once) inline the SVG sprite in your app:

```jsx
import { Icons } from '@onfido/castor-icons';
import React, { Fragment } from 'react';

const App = () => (
  <Fragment>
    <Icons />
    {/* ...anything else e.g. app routes */}
  </Fragment>
);
```

## Use components

Include any Castor component and use it within JSX directly.

```js
import { Button } from '@onfido/castor-react';
```

Then use within your JSX app. For example, as a "destructive" kind:

```jsx
import React, { Fragment } from 'react';

const App = () => (
  <Fragment>
    <Button kind="destructive">Destructive Button</Button>
  </Fragment>
);
```

Please note that Castor is exported as an [ECMAScript module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) targeting ECMAScript 2019.

You may wish to configure your bundler to transpile to a different module syntax, and/or to target a lower ECMAScript version.

For example, you might choose UMD module syntax targeting ES5 if your app needs to support IE11 (please note that Castor is not tested in Internet Explorer).

### Use with TypeScript

Components extend base prop types with JSX additions.

When using with TypeScript, always import types from `@onfido/castor-react`.

Please note that the `@onfido/castor-icons` package is a peer dependency and is required to be installed for **types** to work properly. Yarn and newer versions of npm (using lockfile v2) will resolve it, otherwise it must be installed manually even if you don't plan to use icons.

### Make custom styled components

You should use props for each component modifier, but it is also possible to create custom styled components.

For example, if you'd like a round button, you could create a component using "full" border-radius token:

```jsx
import styled from '@emotion/styled';
import { borderRadius } from '@onfido/castor';
import { Button } from '@onfido/castor-react';

const RoundButton = styled(Button)({
  borderRadius: borderRadius('full'),
});
```

## Use for prototyping

If you need to prototype with Castor, the quickest way is to use the generated single file global `Castor` exposed as [IIFE module](https://esbuild.github.io/api/#format-iife):

```html
<script src="https://cdn.jsdelivr.net/npm/@onfido/castor-react/prototype.min.js"></script>
```

You can also use any previously released version (v1.2.0 and up), for example:

```html
<script src="https://cdn.jsdelivr.net/npm/@onfido/castor-react@1.2.0/prototype.min.js"></script>
```

The same prototype file (not minified) is located on each npm package version.

For modern browsers you may use ECMAScript modules directly via [Skypack](https://www.skypack.dev/):

```html
<script type="module">
  import { borderRadius } from 'https://cdn.skypack.dev/@onfido/castor';
  import { Button } from 'https://cdn.skypack.dev/@onfido/castor-react';

  // all other app code
</script>
```

Also it is easy to use Skypack distributions [with Deno](https://docs.skypack.dev/skypack-cdn/code/deno).
