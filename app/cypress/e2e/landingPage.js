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

const hueList = [
  'Red',
  'Orange',
  'Yellow',
  'Chartreuse',
  'Green',
  'SpringGreen',
  'Cyan',
  'Azure',
  'Blue',
  'Violet',
  'Magenta',
  'Rose',
];

describe('Landing Page shows non-interactive UI components', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('h1 element for accessibility', () => {
    cy.get('h1').should('have.text', 'Luminance Picker');
  });
  it('h2 elements', () => {
    cy.findByText(/set luminance/i);
    cy.findByText(/choose hue/i);
  });
  it('color code examples', () => {
    cy.findByText(/examples/i);
    cy.findByText(/rgb/i);
    cy.findByText(/hsl/i);
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

describe('Clicking a hue swatche with a valid color code redirects to the results page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[0].rgbCode)
      .blur();
  });

  hueList.forEach((hue, index) => {
    it.only(`${hue}`, () => {
      // setup
      cy.findByTestId(hue).click();
      // verify
      cy.url().should('eq', `${Cypress.config().baseUrl}/results`);
    });
  });
});
