import {getContrastRatio} from '../../utils/helpers';

const colorList = [
  {red: 123, green: 133, blue: 23, rgbCode: 'rgb(123, 133, 23)'},
  {red: 53, green: 2, blue: 223, rgbCode: 'rgb(53, 2, 223)'},
];

describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows the non-interactive UI components correctly', () => {
    cy.get('h1').should('have.text', 'Luminance Picker');
  });

  it('shows the contrast ratio to pure black of the user-selected RGB color code', () => {
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

  it('Entering a RGB code changes the RGB color code input fields', () => {
    colorList.forEach(color => {
      cy.findByLabelText(/css color code/i)
        .click()
        .clear()
        .type(color.rgbCode)
        .blur();
      cy.findByLabelText('R:').should('have.value', color.red.toString());
      cy.findByLabelText('G:').should('have.value', color.green.toString());
      cy.findByLabelText('B:').should('have.value', color.blue.toString());
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
