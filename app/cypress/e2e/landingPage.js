import {getContrastRatio} from '../../utils/helpers';

const colorList = [
  {red: 123, green: 133, blue: 23},
  {red: 53, green: 2, blue: 223},
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

  it('shows the list of 12 hues to select from', () => {
    cy.findByLabelText(/red/i);
    cy.findByLabelText(/orange/i);
    cy.findByLabelText(/yellow/i);
    cy.findByLabelText(/chartreuse/i);
    cy.findByLabelText('Green');
    cy.findByLabelText('Spring Green');
    cy.findByLabelText(/cyan/i);
    cy.findByLabelText(/azure/i);
    cy.findByLabelText(/blue/i);
    cy.findByLabelText(/violet/i);
    cy.findByLabelText(/magenta/i);
    cy.findByLabelText(/rose/i);
  });
});

describe('Clicking the submit button with all inputs selected', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('redirects to the results page with the contrast ratio and the hue range shown', () => {
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
