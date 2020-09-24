describe('Error handling: missing input', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('By default, no error message is shown', () => {
    cy.findByTestId('colorCodeError').should('be.hidden');
  });

  it('Blurring without any input value DOES NOT show an error message.', () => {
    // execute
    cy.findByLabelText(/color code/i)
      .click()
      .blur();

    // verify
    cy.findByTestId('colorCodeError').should('be.hidden');
  });

  it('Clicking any hue swatch without any input value DOES show an error message, focus the color code field', () => {
    // execute
    cy.findByTestId('Red').click();

    // verify
    cy.findByTestId('colorCodeError').should('be.visible');
    cy.focused().should('have.attr', 'id', 'inputColorCode');
  });
});
