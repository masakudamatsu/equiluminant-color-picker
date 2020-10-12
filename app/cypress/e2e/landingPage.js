import {getContrastRatio} from '../../utils/helpers';
import color from '../../theme/color';

const colorList = [
  {
    red: 126,
    green: 135,
    blue: 23,
    rgbCode: 'rgb(126, 135, 23)', // 5.36:1 contrast ratio to pure black
    hexCode: '#7e8717',
    hslCode: 'hsl(65, 71%, 31%)',
  },
  {
    red: 54,
    green: 2,
    blue: 222,
    rgbCode: 'rgb(54, 2, 222)', // 2.22:1 contrast ratio to pure black
    hexCode: '#3602de',
    hslCode: 'hsl(254, 98%, 44%)',
  },
];

const initialChroma = '255';
const newChroma = '25';

// Simulate the user's interaction with the range input slider
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value',
).set; // A workaround for React overriding the Dom node's setter. See https://github.com/cypress-io/cypress/issues/1570#issuecomment-450966053

describe('Landing Page shows non-interactive UI components', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('h1 element for accessibility', () => {
    cy.get('h1').should('have.text', 'Luminance Picker');
  });
  it('h2 elements', () => {
    cy.findByText(/set luminance/i);
    cy.findByText(/choose chroma/i);
  });
  it('color code examples', () => {
    cy.findByText(/examples/i);
    cy.findByText(/rgb\(/i);
    cy.findByText(/hsl\(/i);
    cy.findByText('#4287f5');
  });
});

describe('Blurring after typing a valid color code changes the color scheme appropriately', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('light color in RGB', () => {
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[0].rgbCode)
      .blur();
    cy.get('html').should('have.css', 'background-color', colorList[0].rgbCode);
    cy.get('body').should('have.css', 'color', color.body.font.lightMode);
  });
  it('dark color in RGB', () => {
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[1].rgbCode)
      .blur();
    cy.get('html').should('have.css', 'background-color', colorList[1].rgbCode);
    cy.get('body').should('have.css', 'color', color.body.font.darkMode);
  });
  it('light color in HEX', () => {
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[0].hexCode)
      .blur();
    cy.get('html').should('have.css', 'background-color', colorList[0].rgbCode);
    cy.get('body').should('have.css', 'color', color.body.font.lightMode);
  });
  it('dark color in HEX', () => {
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[1].hexCode)
      .blur();
    cy.get('html').should('have.css', 'background-color', colorList[1].rgbCode);
    cy.get('body').should('have.css', 'color', color.body.font.darkMode);
  });
  it('light color in HSL', () => {
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[0].hslCode)
      .blur();
    cy.get('html').should('have.css', 'background-color', colorList[0].rgbCode);
    cy.get('body').should('have.css', 'color', color.body.font.lightMode);
  });
  it('dark color in HSL', () => {
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[1].hslCode)
      .blur();
    cy.get('html').should('have.css', 'background-color', colorList[1].rgbCode);
    cy.get('body').should('have.css', 'color', color.body.font.darkMode);
  });
});

describe('Moving the slider', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[0].rgbCode)
      .blur();
  });

  it('changes the chroma value displayed', () => {
    // Check the initial value
    cy.findByLabelText(/vivid/i)
      .siblings('span')
      .should('have.text', initialChroma);
    // Move the slider
    cy.findByLabelText(/vivid/i).then($range => {
      const range = $range[0];
      nativeInputValueSetter.call(range, Number(newChroma));
      range.dispatchEvent(
        new Event('change', {value: Number(newChroma), bubbles: true}),
      );
    });

    // Verify the new value
    cy.findByLabelText(/vivid/i)
      .siblings('span')
      .should('have.text', newChroma);
  });
});

describe('Clicking the submit button', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[0].rgbCode)
      .blur();
    cy.findByLabelText(/vivid/i).then($range => {
      const range = $range[0];
      nativeInputValueSetter.call(range, Number(newChroma));
      range.dispatchEvent(
        new Event('change', {value: Number(newChroma), bubbles: true}),
      );
    });
  });

  it('redirects the user to the results page', () => {
    cy.findByText(/get/i).click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/results`);
  });
});
