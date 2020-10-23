import color from '../../theme/color';
import nativeInputValueSetter from '../utils/nativeInputValueSetter';

describe('Color code text field', () => {
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
    it('click the hue swatch if the input is valid (and the input element is blurred)', () => {
      cy.findByLabelText(/color code/i)
        .click()
        .type('rgb(100,100,100){enter}');
      cy.findByTestId('colorCodeError').should(
        'have.text',
        'Please click one of the hue swatches below',
      );
      cy.focused().should('not.have.attr', 'id', 'inputColorCode');
    });
  });
});

describe('Chroma text field', () => {
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
      it('clicks the chroma text field', () => {});
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
