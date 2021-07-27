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

      cy.get('#root').should('have.descendants');

      cy.get('body').matchImageSnapshot(name);
    });
  });
});
