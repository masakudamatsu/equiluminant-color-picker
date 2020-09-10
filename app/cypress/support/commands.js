import color from '../../theme/color';
const darkModeBackgroundColor = `${color.darkMode.background}`;
const darkModeFontColor = `${color.darkMode.font}`;
const normalBackgroundColor = `${color.background}`;
const normalFontColor = `${color.font}`;

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
