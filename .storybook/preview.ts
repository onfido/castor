import { Parameters } from '@storybook/addons';
import { withContainer } from '../docs/decorators/withContainer';
import { withIcons } from '../docs/decorators/withIcons';
import {
  initTheme,
  preferredTheme,
  prepareForInline,
  sbCastorTheme,
  themes,
  transformSource,
} from './custom';
import './preview.scss';

export const parameters: Parameters = {
  viewMode: 'docs',
  previewTabs: {
    'storybook/docs/panel': { hidden: false },
    canvas: { hidden: false },
  },
  options: {
    panelPosition: 'right',
    storySort: {
      order: ['Intro'],
    },
  },
  docs: {
    prepareForInline,
    transformSource,
    theme: sbCastorTheme,
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Change the theme of the preview',
    defaultValue: preferredTheme,
    toolbar: {
      icon: 'paintbrush',
      items: themes,
    },
  },
};

export const decorators = [withContainer, withIcons];

initTheme();
