export const env = process.env.NODE_ENV; // defined by Storybook
export const mode = process.env.STORYBOOK_MODE; // defined on CI script

if (env === 'production' && mode === 'production')
  window.STORYBOOK_GA_ID = process.env.STORYBOOK_GA_ID;

declare global {
  interface Window {
    STORYBOOK_GA_ID: string;
  }
}
