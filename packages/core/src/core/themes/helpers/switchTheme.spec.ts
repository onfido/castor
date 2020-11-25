import { describe, expect, it } from '@jest/globals';
import { switchTheme } from './switchTheme';

describe('switchTheme', () => {
  const prefix = 'castor-theme--';

  it('should enable "new" theme', () => {
    const mockedElement = element('body');
    document.body = mockedElement;

    switchTheme('new');

    expect(mockedElement.className).toBe(`${prefix}new`);
  });

  it('should also disable "old" theme', () => {
    const mockedElement = element('body', `${prefix}old other-class-name`);
    document.body = mockedElement;

    switchTheme('new');

    expect(mockedElement.className).toBe(`other-class-name ${prefix}new`);
  });

  it('should enable theme on multiple elements', () => {
    const mockedDocumentFragmentChildren = documentFragmentChildren(3, 'div');

    switchTheme('test', mockedDocumentFragmentChildren);

    Array.from(mockedDocumentFragmentChildren).forEach(({ className }) =>
      expect(className).toBe(`${prefix}test`)
    );
  });

  it('should support "dash-case" named themes', () => {
    const mockedElement = element('body', `${prefix}test-foo`);

    switchTheme('test-bar', mockedElement);

    expect(mockedElement.className).toBe(`${prefix}test-bar`);
  });

  it('should not add extra whitespace', () => {
    const mockedElement = element('body', `${prefix}other`);

    [...Array(3)].forEach(() => switchTheme('test', mockedElement));

    expect(mockedElement.className).toBe(`${prefix}test`);
  });

  it('should throw error when no selection available', () => {
    const act = () => switchTheme('test', null);

    expect(act).toThrowError('Unable to switch theme: no selection available');
  });
});

function element<TagName extends keyof HTMLElementTagNameMap>(
  tagName: TagName,
  className = ''
) {
  const element = document.createElement(tagName);
  element.className = className;

  return element;
}

function documentFragmentChildren(
  amount: number,
  tagName: keyof HTMLElementTagNameMap,
  className = ''
): HTMLCollectionOf<Element> {
  const documentFragment = document.createDocumentFragment();

  [...Array(amount)].forEach(() =>
    documentFragment.appendChild(element(tagName, className))
  );

  return documentFragment.children;
}
