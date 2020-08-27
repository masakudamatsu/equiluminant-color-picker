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
    cy.contains('rgb(129, 125, 133)');
    cy.contains('rgb(134, 122, 146)');
    cy.contains('rgb(138, 119, 157)');
    cy.contains('rgb(142, 116, 168)');
    cy.contains('rgb(143, 115, 171)');
    cy.contains('rgb(144, 114, 175)');
    cy.contains('rgb(145, 113, 178)');
    cy.contains('rgb(146, 112, 181)');
    cy.contains('rgb(147, 111, 184)');
    cy.contains('rgb(148, 110, 187)');
    cy.contains('rgb(149, 109, 190)');
    cy.contains('rgb(150, 108, 193)');
    cy.contains('rgb(151, 107, 195)');
    cy.contains('rgb(152, 106, 198)');
    cy.contains('rgb(153, 105, 200)');
    cy.contains('rgb(156, 101, 210)');
    cy.contains('rgb(157, 99, 216)');
    cy.contains('rgb(158, 97, 221)');
    cy.contains('rgb(158, 98, 218)');
    cy.contains('rgb(159, 96, 223)');
    cy.contains('rgb(159, 97, 219)');
    cy.contains('rgb(160, 95, 224)');
    cy.contains('rgb(161, 92, 232)');
    cy.contains('rgb(161, 93, 229)');
    cy.contains('rgb(162, 90, 236)');
    cy.contains('rgb(162, 91, 233)');
    cy.contains('rgb(162, 92, 230)');
    cy.contains('rgb(163, 88, 240)');
    cy.contains('rgb(163, 89, 237)');
    cy.contains('rgb(163, 90, 234)');
    cy.contains('rgb(164, 87, 241)');
    cy.contains('rgb(164, 88, 238)');
    cy.contains('rgb(165, 84, 247)');
    cy.contains('rgb(165, 85, 244)');
    cy.contains('rgb(165, 86, 242)');
    cy.contains('rgb(166, 82, 250)');
    cy.contains('rgb(166, 83, 248)');
    cy.contains('rgb(167, 80, 253)');
    cy.contains('rgb(167, 81, 251)');
  });
});
