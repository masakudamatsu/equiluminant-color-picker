import color from '../../theme/color';
import rgbCode from '../../utils/rgbCode';

// User input values

const initialChroma = 0;
const chromaSwatches = [
  {
    testId: 'Purple',
    rgbCodeInitial: rgbCode(initialChroma).purple,
  },
  {
    testId: 'Red',
    rgbCodeInitial: rgbCode(initialChroma).red,
  },
  {
    testId: 'Yellow',
    rgbCodeInitial: rgbCode(initialChroma).yellow,
  },
  {
    testId: 'Green',
    rgbCodeInitial: rgbCode(initialChroma).green,
  },
  {
    testId: 'Cyan',
    rgbCodeInitial: rgbCode(initialChroma).cyan,
  },
  {
    testId: 'Blue',
    rgbCodeInitial: rgbCode(initialChroma).blue,
  },
];

describe('Landing Page shows non-interactive UI components', () => {
  before(() => {
    cy.visit('/');
  }); // No interactions in the following tests. So we don't need to refresh each time
  it('h1 element for accessibility', () => {
    cy.get('h1').should('have.text', 'Equiluminant Color Picker');
  });
  it('h2 elements', () => {
    cy.findByRole('heading', {name: /luminance/i});
    cy.findByRole('heading', {name: /saturation/i});
    cy.findByRole('heading', {name: /find/i});
    cy.findByRole('heading', {name: /copy/i});
  });
  it('color code examples', () => {
    cy.findByText(/examples/i);
    cy.findByText(/rgb\(66, 135, 245\)/i);
    cy.findByText(/hsl\(217, 90%, 61%\)/i);
    cy.findByText('#4287f5');
  });
  it('saturation value examples', () => {
    cy.findByText(/0 for grayscale/i);
    cy.findByText(/255 for full saturation/i);
  });
});

describe('Interactive components show the expected initial values', () => {
  before(() => {
    cy.visit('/');
  });
  it('Color code text field shows no default value', () => {
    cy.findByLabelText(/enter css color code/i).should('have.text', '');
  });
  it(`Chroma text field shows ${initialChroma}`, () => {
    cy.findByTestId('chroma-field').should('have.value', initialChroma);
  });
  it(`Chroma preview swatches get rendered in accordance with ${initialChroma}`, () => {
    chromaSwatches.forEach(swatch => {
      cy.findByTestId(swatch.testId).should(
        'have.css',
        'fill',
        swatch.rgbCodeInitial,
      );
    });
  });
  it(`Slider is set at the value of ${initialChroma}`, () => {
    cy.findByTestId('chroma-setter').should('have.value', initialChroma);
  });
  it('The greyed-out color wheel is shown', () => {
    cy.findAllByTestId('sector').should(
      'have.css',
      'fill',
      'rgb(209, 209, 209)',
    );
  });
  it('The greyed-out color swatches are shown', () => {
    cy.findAllByTestId('swatch').should(
      'have.css',
      'background-color',
      'rgb(209, 209, 209)',
    );
  });
});
