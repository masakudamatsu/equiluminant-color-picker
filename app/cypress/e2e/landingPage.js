import {getContrastRatio} from '../../utils/helpers';

describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows the non-interactive UI components correctly', () => {
    cy.get('h1').should('have.text', 'Luminance Picker');
  });

  it('shows the contrast ratio to pure black of the user-selected RGB color code', () => {
    // setup
    const colorList = [
      {red: 123, green: 133, blue: 23},
      {red: 53, green: 2, blue: 223},
    ];
    // execute
    colorList.forEach(color => {
      cy.findByLabelText(/r/i).clear().type(color.red.toString());
      cy.findByLabelText(/g/i).clear().type(color.green.toString());
      cy.findByLabelText(/b/i).clear().type(color.blue.toString());
      // verify
      cy.findByText(/contrast ratio with pure black/i).contains(
        getContrastRatio(color.red, color.green, color.blue),
      );
    });
  });
});
