import color from '../../theme/color';

describe('Color code field', () => {
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

    it('Clicking the submit button without any input value DOES show an error message, focus the color code field with its border in the alert color. But once entering text, the alert disappears.', () => {
      // execute
      cy.findByText(/get/i).click();
      // verify
      cy.findByTestId('colorCodeError').should('be.visible');
      cy.focused().should('have.attr', 'id', 'inputColorCode');
      cy.findByLabelText(/color code/i).should(
        'have.css',
        'border-color',
        color.paragraphErrorMessage.font.forLightColor,
      );

      // execute
      cy.findByLabelText(/color code/i).type('r');
      // verify
      cy.findByTestId('colorCodeError').should('be.hidden');
      cy.findByLabelText(/color code/i).should(
        'have.css',
        'border-color',
        color.body.font.lightMode,
      );
    });
  });

  describe('Error handling: invalid input', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('No error message is shown (with no change in border color) while entering text', () => {
      cy.findByLabelText(/color code/i)
        .click()
        .type('a');
      cy.findByTestId('colorCodeError').should('be.hidden');
      cy.findByLabelText(/color code/i).should(
        'have.css',
        'border-color',
        color.body.font.lightMode,
      );
    });

    it('Blurring with an invalid input shows an error message with the field box color in alert, but does not focus the input field', () => {
      cy.findByLabelText(/color code/i)
        .click()
        .type('a')
        .blur();
      cy.findByTestId('colorCodeError').should('be.visible');
      cy.findByLabelText(/color code/i).should(
        'have.css',
        'border-color',
        color.paragraphErrorMessage.font.forLightColor,
      );
      cy.focused().should('not.have.attr', 'id', 'inputColorCode');
    });

    it('Clicking the submit button with an invalid input shows an error message and focuses the color code field with its border in alert color', () => {
      cy.findByLabelText(/color code/i)
        .click()
        .type('a');
      cy.findByText(/get/i).click();
      cy.findByTestId('colorCodeError').should('be.visible');
      cy.findByLabelText(/color code/i).should(
        'have.css',
        'border-color',
        color.paragraphErrorMessage.font.forLightColor,
      );
      cy.focused().should('have.attr', 'id', 'inputColorCode');
    });

    it('Correcting an invalid input value erases the error message as soon as it satisfies the requirement', () => {
      const colorCode = 'rgb(123, 123, 223)';
      cy.findByLabelText(/color code/i)
        .click()
        .type(colorCode[0]) // Enter one letter at a time
        .blur();
      cy.findByTestId('colorCodeError').should('be.visible');
      cy.findByLabelText(/color code/i).should(
        'have.css',
        'border-color',
        color.paragraphErrorMessage.font.forLightColor,
      );
      for (let i = 1; i < colorCode.length; i++) {
        cy.findByLabelText(/color code/i).type(colorCode[i]);
        if (i < colorCode.length - 1) {
          cy.findByTestId('colorCodeError').should('be.visible');
          cy.findByLabelText(/color code/i).should(
            'have.css',
            'border-color',
            color.paragraphErrorMessage.font.forLightColor,
          );
        } else {
          cy.findByTestId('colorCodeError').should('be.hidden');
          cy.findByLabelText(/color code/i).should(
            'have.css',
            'border-color',
            color.body.font.lightMode,
          );
        }
      }
    });

    it('Removing an invalid input hides an error message with the field box border back to normal', () => {
      // simulate error
      cy.findByLabelText(/color code/i)
        .click()
        .type('a')
        .blur();
      cy.findByTestId('colorCodeError').should('be.visible');
      cy.findByLabelText(/color code/i).should(
        'have.css',
        'border-color',
        color.paragraphErrorMessage.font.forLightColor,
      );
      // clear the input value
      cy.findByLabelText(/color code/i)
        .click()
        .type('{backspace}');
      // verify
      cy.findByTestId('colorCodeError').should('be.hidden');
      cy.findByLabelText(/color code/i).should(
        'have.css',
        'border-color',
        color.body.font.lightMode,
      );
    });
  });

  describe('Error-handling: Pressing the return key alerts the user to', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('enter a color code if the user has not entered any text', () => {
      cy.findByLabelText(/color code/i)
        .click()
        .type('{enter}');
      cy.findByTestId('colorCodeError').should(
        'have.text',
        'Please enter a css color code before pressing the search button',
      );
    });
    it('enter a valid color code if an invalid input is provided', () => {
      cy.findByLabelText(/color code/i)
        .click()
        .type('rgb{enter}');
      cy.findByTestId('colorCodeError').should(
        'have.text',
        'Please enter a valid css color code as shown in the above examples',
      );
    });
    it('choose chroma if the input is valid', () => {
      cy.findByLabelText(/color code/i)
        .click()
        .type('rgb(100,100,100){enter}');
      cy.findByTestId('colorCodeError').contains(/choose chroma/i);
      cy.focused().should('not.have.attr', 'id', 'inputColorCode');
    });
  });
});
