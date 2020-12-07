# Castor &middot; [![npm version](https://img.shields.io/npm/v/@onfido/castor.svg?style=flat-square)](https://www.npmjs.com/package/@onfido/castor)

_Castor_ is Onfido's design system.

## Get started

### Install package

```sh
npm install @onfido/castor
```

If you plan to use icons, also install [Castor Icons](https://github.com/onfido/castor-icons) package:

```sh
npm install @onfido/castor-icons
```

For monospaced font we do use [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono?sidebar.open=true&selection.family=Roboto+Mono), please use any desired way of including it in your app.

### Setup using CSS

In order to use Castor with plain HTML + CSS, you must make its source available to public, and include `castor.css` and a chosen theme.

For example, if you serve your app from "public" directory, you can copy `castor.css` and the `themes` folder from `node_modules/@onfido/castor/dist` to `public` (or your root assets folder), then include them in your HTML file:

```html
<link rel="stylesheet" href="./castor.css" />
```

Choose _one_ theme from the following options:

```html
<link rel="stylesheet" href="./themes/day.css" />
<link rel="stylesheet" href="./themes/night.css" />
```

### Setup using Sass

`@use` Castor within your main Sass file:

```scss
@use '~@onfido/castor';
```

One time only, choose and include _one_ theme within your root element from the following options:

```scss
:root {
  // "day" theme
  @include castor.day();

  // OR "night" theme
  @include castor.night();
}
```

Also include any component(s) you wish to use. For example:

```scss
@include castor.Button();
@include castor.Icon();

// OR all at once, only recommended for prototyping
@include castor.components();
```

If you're using CSS modules, you must use a global scope when including components. For example, for [PostCSS](https://postcss.org/):

```scss
@use '~@onfido/castor';

:global {
  @include castor.Button();
  @include castor.Icon();
}
```

### Setup using CSS-in-JS (for example Emotion)

Import `castor.css` in your root JS file:

```js
import '@onfido/castor/dist/castor.css';
```

Choose and import _one_ theme from the following options:

```js
import '@onfido/castor/dist/themes/day.css';
import '@onfido/castor/dist/themes/night.css';
```

## Switch theme

To be able to switch between one and another, use "classed" themes when importing, and switch with the helper:

```js
import { switchTheme } from '@onfido/castor';

// switch to "day" theme
import '@onfido/castor/dist/themes/day-class.css';
switchTheme('day');

// OR to "night" theme
import '@onfido/castor/dist/themes/night-class.css';
switchTheme('night');
```

You can also include class themes within your Sass file instead:

```scss
@use '~@onfido/castor';

@include castor.day('class');
@include castor.night('class');
```

These themes are not applied to the root element but instead theme variables are scoped to CSS classes, which are then applied to the body element.

You can also switch a theme on any selectable elements, for example switching on a section using the custom theme:

```scss
.castor-theme--custom {
  // ...theme CSS variables
}
```

```js
switchTheme('custom', document.querySelector('.section'));
```

If you do not use JavaScript, you might consider including a different CSS theme file based on URL parameter.

Lastly, if you're extremely concerned about efficiency, you can shave off 1-3 KBs by not including base tokens twice, if they're shared between the themes you're switching:

```scss
@use '~@onfido/castor';

:root {
  @include castor.tokens();
}

@include castor.day('class', 'raw');
@include castor.night('class', 'raw');
```

## Use components

When everything's setup using either CSS or Sass approach, you can then easily add a primary action Castor button to your HTML:

```html
<button class="ods-button -action--primary">Button</button>
```

The appearance of this button can be changed by applying different predefined modifiers. For example, you might use the `-action--secondary` modifier to style it as a secondary (action) button instead.

You can also create and use your custom modifiers using tokens.

For example, if you'd like a round button, you can create a CSS modifier class using the "full" border-radius token:

```css
.ods-button.round {
  border-radius: var(--border-radius-full);
}
```

Or using the Sass helper:

```scss
@use '~@onfido/castor';

.ods-button.round {
  border-radius: castor.border-radius('full');
}
```

```html
<button class="ods-button -action--primary round">Round Button</button>
```
