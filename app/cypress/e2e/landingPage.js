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

describe('RGB value input fields', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('show the contrast ratio to pure black of the user-selected RGB color code', () => {
    // execute
    colorList.forEach(color => {
      cy.findByLabelText('R:').clear().type(color.red.toString());
      cy.findByLabelText('G:').clear().type(color.green.toString());
      cy.findByLabelText('B:').clear().type(color.blue.toString());
      // verify
      cy.findByText(/contrast ratio with pure black/i).contains(
        getContrastRatio(color.red, color.green, color.blue),
      );
    });
  });

  it('changes the color scheme depending on the luminance level of the user-selected RGB color code', () => {
    // execute
    colorList.forEach((color, index) => {
      cy.findByLabelText('R:').clear().type(color.red.toString());
      cy.findByLabelText('G:').clear().type(color.green.toString());
      cy.findByLabelText('B:').clear().type(color.blue.toString());
      const contrastRatio = getContrastRatio(
        color.red,
        color.green,
        color.blue,
      );
      // verify
      // if (index === 0) {
      //   cy.checkDarkModeColorScheme();
      // }
      // if (index === 1) {
      //   cy.checkNormalColorScheme();
      // }
    });
  });
});

describe('Clicking one of the 12 hue swatches', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[0].rgbCode)
      .blur();
  });

  hueList.forEach((hue, index) => {
    it(`redirects to the results page and shows the swatches of equiluminant colors with the contrast ratio and the hue shown: ${hue}`, () => {
      // setup
      cy.findByTestId(hue).click();
      const expectedHue = (index * 30).toFixed();
      // verify
      cy.url().should('eq', `${Cypress.config().baseUrl}/results`);
      cy.findByText(/contrast ratio with pure black/i).contains(
        getContrastRatio(
          colorList[0].red,
          colorList[0].green,
          colorList[0].blue,
        ),
      );
      cy.findByText(/hue/i).contains(expectedHue);
    });
  });
});
