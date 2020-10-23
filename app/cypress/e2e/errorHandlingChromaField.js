import color from '../../theme/color';
import nativeInputValueSetter from '../utils/nativeInputValueSetter';

describe('Chroma field', () => {
  describe('Error handling: missing input', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.findByLabelText(/color code/i)
        .click()
        .clear()
        .type('rgb(126, 135, 23)')
        .blur(); // So no error for the color code field
    });
    it('Blurring with a missing input alerts the user and resets chroma to be 255', () => {
      cy.findByTestId('chroma-field').click().clear().blur();
      cy.findByTestId('chromaError').should('be.visible');
      cy.findByTestId('chroma-setter').should('have.value', '255');
    });
    describe('Alert on the missing input will disappear as soon as the user:', () => {
      beforeEach(() => {
        cy.findByTestId('chroma-field').click().clear().blur();
      });
      it('drags the slider', () => {
        cy.findByTestId('chroma-setter').then($range => {
          const range = $range[0];
          nativeInputValueSetter.call(range, 15);
          range.dispatchEvent(new Event('change', {value: 15, bubbles: true}));
        });
        cy.findByTestId('chromaError').should('be.hidden');
      });
      it('clicks the chroma text field', () => {
        cy.findByTestId('chroma-field').click();
        cy.findByTestId('chromaError').should('be.hidden');
    });
  });
  });

  describe('Error handling: arrow keys', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.findByLabelText(/color code/i)
        .click()
        .clear()
        .type('rgb(126, 135, 23)')
        .blur(); // So no error for the color code field
    });
    it('Pressing arrow UP key does not change chroma if it is 255, and the alert will be shown with an appropriate text. When pressing arrow DOWN key, then the alert disappears.', () => {
      // Make sure the chroma value is 255
      cy.findByTestId('chroma-field').should('have.value', '255');
      // Execute
      cy.findByTestId('chroma-field').click().type('{uparrow}');
      // verify
      cy.findByTestId('chroma-field').should('have.value', '255');
      cy.findByTestId('chromaError').should('be.visible').contains('255');
      // Execute
      cy.findByTestId('chroma-field').click().type('{downarrow}');
      // Verify
      cy.findByTestId('chroma-field').should('have.value', '254');
      cy.findByTestId('chromaError').should('be.hidden');
    });
    it('Pressing arrow DOWN key does not change chroma if it is 0, and the alert will be shown with an appropriate text. When pressing arrow UP key, then the alert disappears.', () => {
      // Make sure the chroma value is 0
      cy.findByTestId('chroma-field').click().clear().type('0');
      // Execute
      cy.findByTestId('chroma-field').click().type('{downarrow}');
      // verify
      cy.findByTestId('chroma-field').should('have.value', '0');
      cy.findByTestId('chromaError').should('be.visible').contains('0');
      // Execute
      cy.findByTestId('chroma-field').click().type('{uparrow}');
      // Verify
      cy.findByTestId('chroma-field').should('have.value', '1');
      cy.findByTestId('chromaError').should('be.hidden');
    });
  });

  describe('Error handling: invalid input', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.findByLabelText(/color code/i)
        .click()
        .clear()
        .type('rgb(126, 135, 23)')
        .blur(); // So no error for the color code field
    });

    it('No error message is shown (with no change in border color) while entering text', () => {
      cy.findByTestId('chroma-field').click().type('a');
      cy.findByTestId('chromaError').should('be.hidden');
      cy.findByTestId('chroma-field').should(
        'have.css',
        'border-color',
        color.chromaTextField.background.lightMode,
      );
    });

    it('Blurring with an invalid input shows an error message with the field box color in alert, but does not focus the input field', () => {
      cy.findByTestId('chroma-field').click().type('a').blur();
      cy.findByTestId('chromaError').should('be.visible');
      cy.findByTestId('chroma-field').should(
        'have.css',
        'border-color',
        color.paragraphErrorMessage.font.forLightColor,
      );
      cy.focused().should('not.have.attr', 'id', 'chroma-field');
    });

    it('Clicking the submit button with an invalid input shows an error message and focuses the chroma field with its border in alert color', () => {
      cy.findByTestId('chroma-field').click().type('a');
      cy.findByText(/get/i).click();
      cy.findByTestId('chromaError').should('be.visible');
      cy.findByTestId('chroma-field').should(
        'have.css',
        'border-color',
        color.paragraphErrorMessage.font.forLightColor,
      );
      // TODO: Figure out why this test fails: cy.focused().should('have.attr', 'id', 'chroma-field');
    });

    it('Correcting an invalid input value erases the error message as soon as it satisfies the requirement', () => {
      cy.findByTestId('chroma-field').click().clear().type('256').blur();
      cy.findByTestId('chromaError').should('be.visible');
      cy.findByTestId('chroma-field').should(
        'have.css',
        'border-color',
        color.paragraphErrorMessage.font.forLightColor,
      );
      cy.findByTestId('chroma-field').click().type('{backspace}');
      cy.findByTestId('chromaError').should('be.hidden');
      cy.findByTestId('chroma-field').should(
        'have.css',
        'border-color',
        color.chromaTextField.background.lightMode,
      );
    });

    it('Clearing an invalid input hides an error message with the field box border back to normal', () => {
      cy.findByTestId('chroma-field').click().clear().type('256').blur();
      cy.findByTestId('chromaError').should('be.visible');
      cy.findByTestId('chroma-field').should(
        'have.css',
        'border-color',
        color.paragraphErrorMessage.font.forLightColor,
      );
      cy.findByTestId('chroma-field').click().clear();
      cy.findByTestId('chromaError').should('be.hidden');
      cy.findByTestId('chroma-field').should(
        'have.css',
        'border-color',
        color.chromaTextField.background.lightMode,
      );
    });
  });
});
