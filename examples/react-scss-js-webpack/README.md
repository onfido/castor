# Please don't use as a build example

webpack has an extremely convoluted setup and complex build processes can emerge when not kept in check.

It's also hard to keep up to date because it has fewer conventions and needs manual work.

This is here for the core contributors to test Castor integration with older projects which use a similiar setup.

Even Babel is not recommended in favour of TypeScript.

**Prefer any other example**, you might want to see `react-scss-ts-bundler` or `react-emotion-ts-bundler`.

## ES5 and IE 11 support

If you use another example with TypeScript, all you need to do is set the `tsconfig.json` target to `es5`. That's it.

For webpack and older projects, Babel is used instead.

By default webpack emits `es5`, and it's up to you to decide your module format (ESM, CommonJS, UMD, Global).

This example minimally shows how to set that up.

Castor is distributed as an `esm` (ECMAScript Module) so any bundler can parse and tree-shake it for bundle size efficiency.

You can build this example and then check its `dist` ECMAScript version with the following script:

```
yarn build && yarn test
```

Look at `package.json` and those scripts to be able to reproduce in your own project and ensure IE 11 is supported by your app.

## A note on css-loader

If you have an older version of webpack and `css-loader`, try and update so you can use the solution in `webpack.config.js`.

If you can't update, you'll need two `rules`:

```ts
module: {
  rules: [
    ...
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      // enables CSS modules for .scss files only
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
          },
        },
        'sass-loader',
      ],
    },
    ...
  ],
},
```

If you can use Sass exclusively you can assume all are modules and not worry about `.css` files.

See `react-scss-ts-bundler` for a different example.
