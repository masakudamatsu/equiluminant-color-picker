import {getContrastRatio} from '../../utils/helpers';

const colorList = [
  {
    red: 2,
    green: 0,
    blue: 6,
    rgbCode: 'rgb(2, 0, 6)', // 1.01:1 contrast ratio to pure black
  },
  {
    red: 250,
    green: 249,
    blue: 251,
    rgbCode: 'rgb(250, 249, 251)', // 20.01:1 contrast ratio to pure black
  },
]; // Colors that return very few equiluminant colors so the server response is quick enough for Cypress to execute tests without error.

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

describe('Results page shows contrast ratio of the user-selected color', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('light color', () => {
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[0].rgbCode)
      .blur();
    cy.findByTestId('Red').click();
    cy.findByText(/contrast ratio/i).contains(
      getContrastRatio(colorList[0].red, colorList[0].green, colorList[0].blue),
    );
  });
  it('dark color', () => {
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[1].rgbCode)
      .blur();
    cy.findByTestId('Red').click();
    cy.findByText(/contrast ratio/i).contains(
      getContrastRatio(colorList[1].red, colorList[1].green, colorList[1].blue),
    );
  });
});

describe('Results page shows the user-selected hue in degrees', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[0].rgbCode)
      .blur();
  });

  hueList.forEach((hue, index) => {
    it(`${hue}`, () => {
      const expectedHue = (index * 30).toFixed();
      cy.findByTestId(hue).click();
      cy.findByTestId('hue-in-degrees').contains(expectedHue);
    });
  });
});

describe('Clicking a color swatch shows its RGB code', () => {
  beforeEach(() => {
    cy.visit('/');
    const color = colorList[0];
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(color.rgbCode);
    cy.findByTestId('Violet').click();
  });

  // set up
  const clickedColorCodes = [
    {
      red: 5,
      green: 0,
      blue: 8,
    },
    {
      red: 7,
      green: 0,
      blue: 13,
    },
  ]; // contrast ratio 1.01, hue 270
  clickedColorCodes.forEach(colorCode => {
    it(`rgb(${colorCode.red}, ${colorCode.green}, ${colorCode.blue})`, () => {
      // execute
      cy.findByTestId(
        `rgb-${colorCode.red}-${colorCode.green}-${colorCode.blue}`,
      ).click();
      // verify
      cy.findByText(
        `rgb(${colorCode.red}, ${colorCode.green}, ${colorCode.blue})`,
      );
    });
  });
});

describe('Result page shows UI components not tested so far', () => {
  beforeEach(() => {
    cy.visit('/');
    const color = colorList[0];
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(color.rgbCode);
    cy.findByTestId('Violet').click();
  });
  it('copy button', () => {
    // This feature cannot be tested with Cypress. See https://github.com/cypress-io/cypress/issues/2752
    // We just verify that the copy button is rendered
    cy.findByText(/copy/i).click();
  });
});
