import {getContrastRatio} from '../../utils/helpers';

const colorList = [
  {red: 123, green: 133, blue: 23},
  {red: 53, green: 2, blue: 223},
];

describe('Clicking a particular color swatch', () => {
  beforeEach(() => {
    cy.visit('/');
    const color = colorList[0];
    cy.findByLabelText('R:').clear().type(color.red.toString());
    cy.findByLabelText('G:').clear().type(color.green.toString());
    cy.findByLabelText('B:').clear().type(color.blue.toString());

    cy.findByTestId('Violet').click();
  });

  it('shows the RGB color code for the clicked color', () => {
    // set up
    const clickedColorCode = [
      {
        red: 162,
        green: 84,
        blue: 252,
      },
      {
        red: 165,
        green: 93,
        blue: 221,
      },
    ];
    // execute
    cy.findByTestId(
      `rgb-${clickedColorCode[0].red}-${clickedColorCode[0].green}-${clickedColorCode[0].blue}`,
    ).click();
    // verify
    cy.findByText(
      `rgb(${clickedColorCode[0].red}, ${clickedColorCode[0].green}, ${clickedColorCode[0].blue})`,
    );

    // execute
    cy.findByTestId(
      `rgb-${clickedColorCode[1].red}-${clickedColorCode[1].green}-${clickedColorCode[1].blue}`,
    ).click();
    cy.findByText(
      `rgb(${clickedColorCode[1].red}, ${clickedColorCode[1].green}, ${clickedColorCode[1].blue})`,
    );
  });

  it('allows the user to click the button to copy the color code onto their clipboard', () => {
    // This feature cannot be tested with Cypress. See https://github.com/cypress-io/cypress/issues/2752
    // We just verify that the copy button is rendered
    cy.findByText(/copy/i);
  });
});
