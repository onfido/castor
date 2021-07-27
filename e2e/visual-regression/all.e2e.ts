const storyName = 'All Combinations';

describe('components', () => {
  it('should have no visual regressions', () => {
    cy.visit('/');

    cy.get('#storybook-explorer-searchfield').type(storyName);

    cy.get('#storybook-explorer-menu li a').each((link) => {
      const title: string = link.prop('title');
      const name = title.replaceAll(' / ', '/');
      const id = title
        .toLowerCase()
        .replace(' / ', '-')
        .replaceAll(' / ', '--')
        .replaceAll(' ', '-');

      cy.visit(`/iframe.html?id=${id}`);

      // use slightly higher timeout because sometimes the iframe is slow
      cy.get('body', { timeout: 10000 }).should(
        'have.class',
        'castor-theme--day'
      );

      // give React one cycle to run effects and timeouts and stuff,
      // and give the browser one requestFrame
      cy.wait(20);

      cy.get('body').matchImageSnapshot(name);
    });
  });
});
