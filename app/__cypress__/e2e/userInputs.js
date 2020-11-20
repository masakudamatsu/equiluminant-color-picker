// To simulate range input manipulation
import nativeInputValueSetter from '../utils/nativeInputValueSetter';

// User input values
const userInputColor = {
  red: 126,
  green: 135,
  blue: 23,
  rgbCode: 'rgb(126, 135, 23)',
};
const newChroma = 125;

it('Clicking the search button with valid inputs renders the retrieved colors', () => {
  cy.route2('http://localhost:4000/graphql').as('graphQlServer');
  cy.visit('/');

  // Enter valid inputs
  cy.findByLabelText(/enter css color code/i)
    .click()
    .type(userInputColor.rgbCode)
    .blur();
  cy.findByTestId('chroma-setter').then($range => {
    const range = $range[0];
    nativeInputValueSetter.call(range, Number(newChroma));
    range.dispatchEvent(
      new Event('change', {value: Number(newChroma), bubbles: true}),
    );
  });

  // Click the button
  cy.findByRole('button', {name: /search/i}).click();

  // Wait for the server response
  cy.wait('@graphQlServer');

  // Verity the rendering of retrieved colors as an SVG image
  cy.findByTitle(/wheel of equiluminant colors/i);
});
