import { addons } from '@storybook/addons';
import { sbCastorTheme } from './custom';

addons.setConfig({ theme: sbCastorTheme });

export const env = process.env.NODE_ENV; // defined by Storybook
export const mode = process.env.STORYBOOK_MODE; // defined on CI script

if (env === 'production' && mode === 'production')
  window.STORYBOOK_GA_ID = process.env.STORYBOOK_GA_ID;

// everytime Storybook changes the document title, replace it with "Castor"
new MutationObserver(() => {
  if (document.title.endsWith('Storybook'))
    document.title = document.title.slice(0, -9) + 'Castor';
}).observe(document.querySelector('title'), { childList: true });

declare global {
  interface Window {
    STORYBOOK_GA_ID: string;
  }
}
