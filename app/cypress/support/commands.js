import color from '../../theme/color';
const darkModeBackgroundColor = `${color.darkMode.background}`;
// create various custom commands and overwrite
const normalBackgroundColor = `${color.background}`;

Cypress.Commands.add('checkDarkModeColorScheme', () => {
  cy.get('body')
    .should('have.css', 'background-color', darkModeBackgroundColor)
//
});

Cypress.Commands.add('checkNormalColorScheme', () => {
  cy.get('body')
    .should('have.css', 'background-color', normalBackgroundColor)
//
});
