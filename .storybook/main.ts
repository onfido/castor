// cannot use typescript here - build fails because of unsupported syntax,
// see https://github.com/storybookjs/storybook/issues/11843
// import { StorybookConfig } from '@storybook/react/types';

const { resolve } = require('path');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const istanbul = require('vite-plugin-istanbul');

module.exports = {
  stories: ['../{docs,packages}/**/*.stories.ts{,x}'],

  core: {
    // vite builder still not 100%, breaks Core stories and code snippets
    // but we can use it locally as it's much faster
    builder:
      process.env.NODE_ENV === 'production'
        ? 'webpack4'
        : 'storybook-builder-vite',
  },

  addons: [
    '@storybook/addon-google-analytics',
    '@storybook/addon-docs',
    '@storybook/addon-postcss',
    '@storybook/addon-toolbars',
    // below order matters, as it's the same as addon tab appearance order
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
  ],

  // used locally, with 'start-storybook' or 'yarn start'
  viteFinal: (config) => {
    // resolve Castor imports
    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliasPackage({
        '@onfido/castor': 'core',
        '@onfido/castor-react': 'react',
      }),
    };

    // if running E2E tests
    if (process.env.NODE_ENV === 'e2e') {
      // don't watch
      config.watchOptions = { ignored: [/.*/] };

      // instrument source code
      config.plugins.push(
        istanbul({
          include: 'packages/**/*',
          exclude: ['node_modules', 'dist', '*.stor{y,ies}.*'],
          extension: ['.ts', '.tsx'],
          cypress: true,
          requireEnv: true,
        })
      );
    }

    return config;
  },

  // used for builds, with 'build-storybook'
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
      ...aliasPackage({
        '@onfido/castor': 'core',
        '@onfido/castor-react': 'react',
      }),
    };

    // if running E2E tests
    if (process.env.NODE_ENV === 'e2e') {
      // don't watch
      config.watchOptions = { ignored: [/.*/] };

      // instrument source code
      if (process.env.NODE_ENV === 'e2e')
        config.module.rules
          .flatMap((r) => r.use)
          .map((u) => u?.options?.plugins)
          .filter(Boolean)
          .forEach((p) => p.push('istanbul'));
    }

    return config;
  },
};

const aliasPackage = (aliases) =>
  Object.fromEntries(
    Object.entries(aliases).flatMap(([source, packageName]) =>
      [source, `~${source}`].map((source) => [source, resolveTo(packageName)])
    )
  );

const resolveTo = (name) => resolve(__dirname, `../packages/${name}/src`);
