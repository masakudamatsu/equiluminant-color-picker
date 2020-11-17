import {getContrastRatio} from '../../utils/helpers';
import color from '../../theme/color';
import nativeInputValueSetter from '../utils/nativeInputValueSetter';
import rgbCode from '../../utils/rgbCode';

// describe('Once all inputs are provided correctly', () => {
//   beforeEach(() => {
//     cy.visit('/');
//     cy.findByLabelText(/enter css color code/i)
//       .click()
//       .clear()
//       .type(colorList[0].rgbCode)
//       .blur();
//     cy.findByTestId('chroma-setter').then($range => {
//       const range = $range[0];
//       nativeInputValueSetter.call(range, Number(newChroma));
//       range.dispatchEvent(
//         new Event('change', {value: Number(newChroma), bubbles: true}),
//       );
//     });
//   });
//
//   it('Clicking the submit button redirects the user to the results page', () => {
//     cy.findByText(/get/i).click();
//     cy.url().should('eq', `${Cypress.config().baseUrl}/results`);
//   });
//
//   it('Pressing the enter key redirects the user to the results page', () => {
//     cy.findByTestId('chroma-field').click().type('{enter}');
//     cy.url().should('eq', `${Cypress.config().baseUrl}/results`);
//   });
// });

it('Clicking the Search button turns the button label into "Fetching..." and then into "Choose a hue"', () => {
  // cy.findByRole('button', { name: 'Search' }).click();
  // cy.findByTestId('submit-button').should('have.text', 'Fetching...');
  // cy.findByTestId('submit-button').should('have.text', 'Choose a hue');
});
