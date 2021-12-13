import { Parameters } from '@storybook/addons';
import { withContainer } from '../docs/decorators/withContainer';
import { withIcons } from '../docs/decorators/withIcons';
import { themeNames, withTheme } from '../docs/decorators/withTheme';
import { prepareForInline, transformSource } from './custom';
import './styles.scss';

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
  docs: { prepareForInline, transformSource },
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

export const decorators = [withTheme, withContainer, withIcons];
