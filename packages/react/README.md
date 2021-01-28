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

## Use components

Include any Castor component and use it within JSX directly.

```js
import { Button } from '@onfido/castor-react';
```

Then use within your JSX app. For example, as a "destructive" kind:

```jsx
const App = () => (
  <>
    <Button kind="destructive">Destructive Button</Button>
  </>
);
```

Please note that Castor is exported as an [ECMAScript module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) targeting ECMAScript 2019.

You may wish to configure your bundler to transpile to a different module syntax, and/or to target a lower ECMAScript version.

For example, you might choose UMD module syntax targeting ES5 if your app needs to support IE11.

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
