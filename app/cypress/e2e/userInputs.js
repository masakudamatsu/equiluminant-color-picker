import color from '../../theme/color';
import nativeInputValueSetter from '../utils/nativeInputValueSetter';
import rgbCode from '../../utils/rgbCode';

// User input values
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

const newChroma = 125;
const chromaSwatches = [
  {
    testId: 'Purple',
    rgbCodeNew: rgbCode(newChroma).purple,
  },
  {
    testId: 'Red',
    rgbCodeNew: rgbCode(newChroma).red,
  },
  {
    testId: 'Yellow',
    rgbCodeNew: rgbCode(newChroma).yellow,
  },
  {
    testId: 'Green',
    rgbCodeNew: rgbCode(newChroma).green,
  },
  {
    testId: 'Cyan',
    rgbCodeNew: rgbCode(newChroma).cyan,
  },
  {
    testId: 'Blue',
    rgbCodeNew: rgbCode(newChroma).blue,
  },
];

describe('Typing a valid color code and then blurring the text field will change the color scheme accordingly', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Typing alone does not change the color scheme', () => {
    // Verify initial color scheme
    cy.get('html').should(
      'have.css',
      'background-color',
      color.html.background.initial,
    );
    cy.get('body').should('have.css', 'color', color.body.font.lightMode);
    // Type
    cy.findByLabelText(/enter css color code/i)
      .click()
      .type(colorList[0].rgbCode);
    // Verify the color scheme doesn't change yet
    cy.get('html').should(
      'have.css',
      'background-color',
      color.html.background.initial,
    );
    cy.get('body').should('have.css', 'color', color.body.font.lightMode);
  });
  it('light color in RGB', () => {
    cy.findByLabelText(/enter css color code/i)
      .click()
      .type(colorList[0].rgbCode)
      .blur();
    cy.get('html').should('have.css', 'background-color', colorList[0].rgbCode);
    cy.get('body').should('have.css', 'color', color.body.font.lightMode);
  });
  it('dark color in RGB', () => {
    cy.findByLabelText(/enter css color code/i)
      .click()
      .type(colorList[1].rgbCode)
      .blur();
    cy.get('html').should('have.css', 'background-color', colorList[1].rgbCode);
    cy.get('body').should('have.css', 'color', color.body.font.darkMode);
  });
  it('light color in HEX', () => {
    cy.findByLabelText(/enter css color code/i)
      .click()
      .type(colorList[0].hexCode)
      .blur();
    cy.get('html').should('have.css', 'background-color', colorList[0].rgbCode);
    cy.get('body').should('have.css', 'color', color.body.font.lightMode);
  });
  it('dark color in HEX', () => {
    cy.findByLabelText(/enter css color code/i)
      .click()
      .type(colorList[1].hexCode)
      .blur();
    cy.get('html').should('have.css', 'background-color', colorList[1].rgbCode);
    cy.get('body').should('have.css', 'color', color.body.font.darkMode);
  });
  it('light color in HSL', () => {
    cy.findByLabelText(/enter css color code/i)
      .click()
      .type(colorList[0].hslCode)
      .blur();
    cy.get('html').should('have.css', 'background-color', colorList[0].rgbCode);
    cy.get('body').should('have.css', 'color', color.body.font.lightMode);
  });
  it('dark color in HSL', () => {
    cy.findByLabelText(/enter css color code/i)
      .click()
      .type(colorList[1].hslCode)
      .blur();
    cy.get('html').should('have.css', 'background-color', colorList[1].rgbCode);
    cy.get('body').should('have.css', 'color', color.body.font.darkMode);
  });
});

describe('Moving the slider', () => {
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

  it('changes the chroma swatch colors', () => {
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
  });
  it('changes chroma immediately', () => {
    const newChromaString = newChroma.toString();

    cy.findByTestId('chroma-field').click().clear().type(newChromaString[0]);

    cy.findByTestId('chroma-setter').should('have.value', newChromaString[0]);

    cy.findByTestId('chroma-field').type(newChromaString[1]);

    cy.findByTestId('chroma-setter').should(
      'have.value',
      newChromaString[0] + newChromaString[1],
    );

    cy.findByTestId('chroma-field').type(newChromaString[2]);

    cy.findByTestId('chroma-setter').should('have.value', newChroma);
  });
});

describe('Pressing arrow keys in the chroma value field box', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByTestId('chroma-field').click().clear().type(newChroma);
  });
  it('changes chroma by 1', () => {
    const originalChroma = newChroma;
    const expectedChroma = (Number(originalChroma) + 1).toString();

    cy.findByTestId('chroma-field').click().type('{uparrow}');

    cy.findByTestId('chroma-field').should('have.value', expectedChroma);

    cy.findByTestId('chroma-field').click().type('{downarrow}');

    cy.findByTestId('chroma-field').should('have.value', originalChroma);
  });
  it('changes chroma by 10 if pressed with Shift key', () => {
    const originalChroma = newChroma;
    const expectedChroma = (Number(originalChroma) + 10).toString();

    cy.findByTestId('chroma-field').click().type('{shift}{uparrow}');

    cy.findByTestId('chroma-field').should('have.value', expectedChroma);

    cy.findByTestId('chroma-field').click().type('{shift}{downarrow}');

    cy.findByTestId('chroma-field').should('have.value', originalChroma);
  });
});
