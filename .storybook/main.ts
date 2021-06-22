// cannot use typescript here - build fails because of unsupported syntax,
// see https://github.com/storybookjs/storybook/issues/11843
// import { StorybookConfig } from '@storybook/react/types';

const { resolve } = require('path');

module.exports = {
  addons: [
    '@storybook/addon-google-analytics',
    '@storybook/addon-docs',
    '@storybook/addon-toolbars',
    // below order matters, as it's the same as addon tab appearance order
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
  ],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { modules: true } },
        'sass-loader',
      ],
    });
    config.performance = {
      hints: false, // https://webpack.js.org/configuration/performance/#performancehints
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      '@onfido/castor': resolve(__dirname, '../packages/core/src'),
      '@onfido/castor-react': resolve(__dirname, '../packages/react/src'),
    };

    // instrument source code if running E2E tests
    if (process.env.NODE_ENV === 'e2e')
      config.module.rules
        .flatMap((r) => r.use)
        .map((u) => u?.options?.plugins)
        .filter(Boolean)
        .forEach((p) => p.push('istanbul'));

    return config;
  },
  // https://github.com/storybookjs/storybook/issues/14342
  stories: ['docs', 'packages'].map((f) => `../${f}/**/*.stories.ts{,x}`),
  // https://github.com/styleguidist/react-docgen-typescript/issues/356#issuecomment-857887751
  typescript: {
    reactDocgen: 'react-docgen',
  },
};
