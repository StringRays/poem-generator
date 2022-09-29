describe('My Tests', () => {
  it('opens correctly', () => {
    cy.visit('../index.html')
    
    cy.get('[data-cy="first"]')
      .type('This is a test')
      .should('have.value', 'This is a test')

    cy.get('[data-cy="second"]')
      .type('try another')
      .should('have.value', 'try another')

    cy.get('[data-cy="third"]')
      .type('also some words')
      .should('have.value', 'also some words')

    cy.get('#submit').click();
    
    cy.get('#firstLineAnswer').should('be.visible');
    cy.get('#secondLineAnswer').should('be.visible');
    cy.get('#thirdLineAnswer').should('be.visible');
  })
})