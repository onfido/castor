// @ts-nocheck
// cannot use typescript here - build fails because of unsupported syntax,
// see https://github.com/storybookjs/storybook/issues/11843
// import type { StorybookConfig } from '@storybook/react/types';

const { ESBuildMinifyPlugin } = require('esbuild-loader');
const { resolve } = require('path');

module.exports = {
  stories: ['../docs', '../packages'],
  staticDirs: ['./public'],
  addons: [
    '@storybook/addon-google-analytics',
    '@storybook/addon-docs',
    '@storybook/addon-postcss',
    '@storybook/addon-toolbars',
    // below order matters, as it's the same as addon tab appearance order
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
  ],

  webpackFinal: (config) => {
    // minify with esbuild
    config.optimization = {
      minimizer: [new ESBuildMinifyPlugin({ target: 'es2019' })],
    };

    // replace Babel with esbuild
    config.module.rules
      .flatMap((rule) => rule.use || [])
      .filter((use) => use.loader?.includes('babel-loader'))
      .forEach((use) => {
        use.loader = 'esbuild-loader';
        use.options = { loader: 'tsx', target: 'es2019' };
      });

    // add Sass loader
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { modules: true } },
        'sass-loader',
      ],
    });

    // https://webpack.js.org/configuration/performance/#performancehints
    config.performance = { hints: false };

    // resolve Castor imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@onfido/castor': resolve(__dirname, '../packages/core/src'),
      '@onfido/castor-react': resolve(__dirname, '../packages/react/src'),
    };

    // if running E2E tests
    if (process.env.NODE_ENV === 'e2e') {
      // don't watch
      config.watchOptions = { ignored: [/.*/] };

      // instrument source code after esbuild has compiled it
      config.module.rules.unshift({
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['istanbul'],
          },
        },
      });
    }

    return config;
  },
};
