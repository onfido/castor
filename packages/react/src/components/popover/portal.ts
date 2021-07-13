import { c, classy } from '@onfido/castor';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export const PopoverPortal = ({ children }: { children: ReactNode }) =>
  createPortal(children, replaceContainer());

const id = 'castor-popover-portal';

function createContainer() {
  const container = document.createElement('div');
  container.id = id;
  container.className = classy(c('popover-portal'));
  container.style.height = `${document.body.scrollHeight}px`;
  document.body.appendChild(container);
  return container;
}

const getContainer = () => document.getElementById(id);

const replaceContainer = () => {
  getContainer()?.remove();
  return createContainer();
};
