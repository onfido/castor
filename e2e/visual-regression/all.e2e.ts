const storyName = 'All Combinations';
const theme = 'castor-theme--day';

describe('components', () => {
  it('should have no visual regressions', () => {
    cy.visit('/');

    cy.get('#castor').should('exist');

    cy.get('#storybook-explorer-searchfield').type(storyName);

    cy.get('#storybook-explorer-menu li a').each((link) => {
      const title = link.prop('title') as string;
      const name = title.replaceAll(' / ', '/');
      const id = title
        .toLowerCase()
        .replace(' / ', '-')
        .replaceAll(' / ', '--')
        .replaceAll(' ', '-');

      cy.visit(`/iframe.html?id=${id}`);

      // use slightly longer timeout because sometimes the iframe is slow
      cy.get('body', { timeout: 10000 })
        // will happen after one React cycle
        .should('have.class', theme)
        .matchImageSnapshot(name);
    });
  });
});
