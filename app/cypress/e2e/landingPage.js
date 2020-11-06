import {getContrastRatio} from '../../utils/helpers';
import color from '../../theme/color';
import nativeInputValueSetter from '../utils/nativeInputValueSetter';
import rgbCode from '../../utils/rgbCode';

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

const initialChroma = 0;
const newChroma = 125;
const chromaSwatches = [
  {
    testId: 'Purple',
    rgbCodeInitial: `rgb(${rgbCode(initialChroma).purple.r}, ${
      rgbCode(initialChroma).purple.g
    }, ${rgbCode(initialChroma).purple.b})`,
    rgbCodeNew: `rgb(${rgbCode(newChroma).purple.r}, ${
      rgbCode(newChroma).purple.g
    }, ${rgbCode(newChroma).purple.b})`,
  },
  {
    testId: 'Red',
    rgbCodeInitial: `rgb(${rgbCode(initialChroma).red.r}, ${
      rgbCode(initialChroma).red.g
    }, ${rgbCode(initialChroma).red.b})`,
    rgbCodeNew: `rgb(${rgbCode(newChroma).red.r}, ${
      rgbCode(newChroma).red.g
    }, ${rgbCode(newChroma).red.b})`,
  },
  {
    testId: 'Yellow',
    rgbCodeInitial: `rgb(${rgbCode(initialChroma).yellow.r}, ${
      rgbCode(initialChroma).yellow.g
    }, ${rgbCode(initialChroma).yellow.b})`,
    rgbCodeNew: `rgb(${rgbCode(newChroma).yellow.r}, ${
      rgbCode(newChroma).yellow.g
    }, ${rgbCode(newChroma).yellow.b})`,
  },
  {
    testId: 'Green',
    rgbCodeInitial: `rgb(${rgbCode(initialChroma).green.r}, ${
      rgbCode(initialChroma).green.g
    }, ${rgbCode(initialChroma).green.b})`,
    rgbCodeNew: `rgb(${rgbCode(newChroma).green.r}, ${
      rgbCode(newChroma).green.g
    }, ${rgbCode(newChroma).green.b})`,
  },
  {
    testId: 'Cyan',
    rgbCodeInitial: `rgb(${rgbCode(initialChroma).cyan.r}, ${
      rgbCode(initialChroma).cyan.g
    }, ${rgbCode(initialChroma).cyan.b})`,
    rgbCodeNew: `rgb(${rgbCode(newChroma).cyan.r}, ${
      rgbCode(newChroma).cyan.g
    }, ${rgbCode(newChroma).cyan.b})`,
  },
  {
    testId: 'Blue',
    rgbCodeInitial: `rgb(${rgbCode(initialChroma).blue.r}, ${
      rgbCode(initialChroma).blue.g
    }, ${rgbCode(initialChroma).blue.b})`,
    rgbCodeNew: `rgb(${rgbCode(newChroma).blue.r}, ${
      rgbCode(newChroma).blue.g
    }, ${rgbCode(newChroma).blue.b})`,
  },
];

describe('Landing Page shows non-interactive UI components', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('h1 element for accessibility', () => {
    cy.get('h1').should('have.text', 'Equiluminant Color Picker');
  });
  it('h2 elements', () => {
    cy.findByRole('heading', {name: /luminance/i});
    cy.findByRole('heading', {name: /saturation/i});
    cy.findByRole('heading', {name: /hue/i});
    cy.findByRole('heading', {name: /color code/i});
  });
  it('color code examples', () => {
    cy.findByText(/examples/i);
    cy.findByText(/rgb\(/i);
    cy.findByText(/hsl\(/i);
    cy.findByText('#4287f5');
  });
});

describe('Interactive components show the expected initial value', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Color code text field shows no default value', () => {
    cy.findByLabelText(/color code/i).should('have.text', '');
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
});

describe('Type a valid color code, and the color scheme changes accordingly after blurring the text field', () => {
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

describe.only('Moving the slider', () => {
  beforeEach(() => {
    cy.visit('/');
    // Move the slider
    cy.findByTestId('chroma-setter').then($range => {
      const range = $range[0];
      nativeInputValueSetter.call(range, Number(newChroma));
      range.dispatchEvent(
        new Event('change', {value: Number(newChroma), bubbles: true}),
      );
    });
  });

  it('changes the chroma value displayed', () => {
    cy.findByTestId('chroma-field').should('have.value', newChroma);
  });

  it.only('changes the chroma swatch colors', () => {
    chromaSwatches.forEach(swatch => {
      cy.findByTestId(swatch.testId).should(
        'have.css',
        'fill',
        swatch.rgbCodeNew,
      );
    });
  });
});

describe('Typing a value in the chroma value field box', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[0].rgbCode)
      .blur();
  });
  it('changes chroma immediately', () => {
    const newChroma = '120';

    cy.findByTestId('chroma-field').click().clear().type(newChroma[0]);

    cy.findByTestId('chroma-setter').should('have.value', newChroma[0]);

    cy.findByTestId('chroma-field').type(newChroma[1]);

    cy.findByTestId('chroma-setter').should(
      'have.value',
      newChroma[0] + newChroma[1],
    );

    cy.findByTestId('chroma-field').type(newChroma[2]);

    cy.findByTestId('chroma-setter').should('have.value', newChroma);
  });
});

describe('Pressing arrow keys in the chroma value field box', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[0].rgbCode)
      .blur();
  });
  it('changes chroma by 1', () => {
    const expectedChroma = (Number(initialChroma) - 1).toString();

    cy.findByTestId('chroma-field').click().type('{downarrow}');

    cy.findByTestId('chroma-field').should('have.value', expectedChroma);

    cy.findByTestId('chroma-field').click().type('{uparrow}');

    cy.findByTestId('chroma-field').should('have.value', initialChroma);
  });
  it('changes chroma by 10 if pressed with Shift key', () => {
    const expectedChroma = (Number(initialChroma) - 10).toString();

    cy.findByTestId('chroma-field').click().type('{shift}{downarrow}');

    cy.findByTestId('chroma-field').should('have.value', expectedChroma);

    cy.findByTestId('chroma-field').click().type('{shift}{uparrow}');

    cy.findByTestId('chroma-field').should('have.value', initialChroma);
  });
});

describe('Once all inputs are provided correctly', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByLabelText(/color code/i)
      .click()
      .clear()
      .type(colorList[0].rgbCode)
      .blur();
    cy.findByTestId('chroma-setter').then($range => {
      const range = $range[0];
      nativeInputValueSetter.call(range, Number(newChroma));
      range.dispatchEvent(
        new Event('change', {value: Number(newChroma), bubbles: true}),
      );
    });
  });

  it('Clicking the submit button redirects the user to the results page', () => {
    cy.findByText(/get/i).click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/results`);
  });

  it('Pressing the enter key redirects the user to the results page', () => {
    cy.findByTestId('chroma-field').click().type('{enter}');
    cy.url().should('eq', `${Cypress.config().baseUrl}/results`);
  });
});
