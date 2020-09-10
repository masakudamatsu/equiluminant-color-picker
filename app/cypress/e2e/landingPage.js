import {getContrastRatio} from '../../utils/helpers';

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

describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows the non-interactive UI components correctly', () => {
    cy.get('h1').should('have.text', 'Luminance Picker');
  });

  it('shows the list of 24 hues to select from', () => {
    cy.findByLabelText('Red');
    cy.findByLabelText('Vermilion');
    cy.findByLabelText('Orange');
    cy.findByLabelText('Amber');
    cy.findByLabelText('Yellow');
    cy.findByLabelText('Yellowish Green');
    cy.findByLabelText('Chartreuse');
    cy.findByLabelText('Leaf Green');
    cy.findByLabelText('Green');
    cy.findByLabelText('Cobalt Green');
    cy.findByLabelText('Spring Green');
    cy.findByLabelText('Turquois Green');
    cy.findByLabelText('Cyan');
    cy.findByLabelText('Cerulean Blue');
    cy.findByLabelText('Azure');
    cy.findByLabelText('Cobalt Blue');
    cy.findByLabelText('Blue');
    cy.findByLabelText('Hyacinth');
    cy.findByLabelText('Violet');
    cy.findByLabelText('Purple');
    cy.findByLabelText('Magenta');
    cy.findByLabelText('Reddish Purple');
    cy.findByLabelText('Rose');
    cy.findByLabelText('Carmine');
  });
});

describe('Color code input field', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Entering a RGB code changes the RGB color code input fields, shows its contrast ratio to pure black, and switches the color scheme for legibility if necessary', () => {
    colorList.forEach((color, index) => {
      cy.findByLabelText(/css color code/i)
        .click()
        .clear()
        .type(color.rgbCode)
        .blur();
      cy.findByLabelText('R:').should('have.value', color.red.toString());
      cy.findByLabelText('G:').should('have.value', color.green.toString());
      cy.findByLabelText('B:').should('have.value', color.blue.toString());
      // verify
      cy.findByText(/contrast ratio with pure black/i).contains(
        getContrastRatio(color.red, color.green, color.blue),
      );
      if (index === 0) {
        cy.checkDarkModeColorScheme();
      }
      if (index === 1) {
        cy.checkNormalColorScheme();
      }
    });
  });

  it('Entering a HEX code changes the RGB color code input fields, shows its contrast ratio to pure black, and switches the color scheme for legibility if necessary', () => {
    colorList.forEach((color, index) => {
      cy.findByLabelText(/css color code/i)
        .click()
        .clear()
        .type(color.hexCode)
        .blur();
      cy.findByLabelText('R:').should('have.value', color.red.toString());
      cy.findByLabelText('G:').should('have.value', color.green.toString());
      cy.findByLabelText('B:').should('have.value', color.blue.toString());
      // verify
      cy.findByText(/contrast ratio with pure black/i).contains(
        getContrastRatio(color.red, color.green, color.blue),
      );
      if (index === 0) {
        cy.checkDarkModeColorScheme();
      }
      if (index === 1) {
        cy.checkNormalColorScheme();
      }
    });
  });

  it('Entering a HSL code changes the RGB color code input fields, shows its contrast ratio to pure black, and switches the color scheme for legibility if necessary', () => {
    colorList.forEach((color, index) => {
      cy.findByLabelText(/css color code/i)
        .click()
        .clear()
        .type(color.hslCode)
        .blur();
      cy.findByLabelText('R:').should('have.value', color.red.toString());
      cy.findByLabelText('G:').should('have.value', color.green.toString());
      cy.findByLabelText('B:').should('have.value', color.blue.toString());
      // verify
      cy.findByText(/contrast ratio with pure black/i).contains(
        getContrastRatio(color.red, color.green, color.blue),
      );
      if (index === 0) {
        cy.checkDarkModeColorScheme();
      }
      if (index === 1) {
        cy.checkNormalColorScheme();
      }
    });
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
      if (index === 0) {
        cy.checkDarkModeColorScheme();
      }
      if (index === 1) {
        cy.checkNormalColorScheme();
      }
    });
  });
});

describe('Clicking the submit button with all inputs selected', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('redirects to the results page and shows the swatches of equiluminant colors with the contrast ratio and the hue shown', () => {
    // setup
    const color = colorList[0];
    cy.findByLabelText('R:').clear().type(color.red.toString());
    cy.findByLabelText('G:').clear().type(color.green.toString());
    cy.findByLabelText('B:').clear().type(color.blue.toString());

    cy.findByLabelText(/violet/i).click();
    const expectedHue = '270';

    cy.findByText(/get/i).click();

    // verify
    cy.url().should('eq', `${Cypress.config().baseUrl}/results`);
    cy.findByText(/contrast ratio with pure black/i).contains(
      getContrastRatio(color.red, color.green, color.blue),
    );
    cy.findByText(/hue/i).contains(expectedHue);
  });
});
