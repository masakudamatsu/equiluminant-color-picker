import color from '../../theme/color';
const darkModeBackgroundColor = `${color.body.background.darkMode}`;
const darkModeFontColor = `${color.body.font.darkMode}`;
const normalBackgroundColor = `${color.body.background.lightMode}`;
const normalFontColor = `${color.body.font.lightMode}`;

Cypress.Commands.add('checkDarkModeColorScheme', () => {
  cy.get('body')
    .should('have.css', 'background-color', darkModeBackgroundColor)
    .should('have.css', 'color', darkModeFontColor);
});

Cypress.Commands.add('checkNormalColorScheme', () => {
  cy.get('body')
    .should('have.css', 'background-color', normalBackgroundColor)
    .should('have.css', 'color', normalFontColor);
});
