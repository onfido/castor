import { Parameters } from '@storybook/addons';
import { withThemer, themeNames } from '../docs/themer/react';
import { withSpacer } from '../docs/spacer/react';
import { withIcons } from '../docs/icons/react';
import { storySort } from './storySort';
import './styles.scss';

export const parameters: Parameters = {
  viewMode: 'docs',
  previewTabs: {
    'storybook/docs/panel': { hidden: false },
    canvas: { hidden: false },
  },
  knobs: { escapeHTML: false },
  options: {
    panelPosition: 'right',
    storySort,
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Change the theme of the preview',
    defaultValue: 'day',
    toolbar: {
      icon: 'paintbrush',
      items: themeNames,
    },
  },
};

export const decorators = [withThemer, withSpacer, withIcons];
