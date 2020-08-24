describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows the non-interactive UI components correctly', () => {
    cy.get('h1').should('have.text', 'Luminance Picker');
  });

  it.only('shows the contrast ratio to pure black of the user-selected RGB color code', () => {
    // setup
    const colorList = [
      {red: 123, green: 133, blue: 23},
      {red: 53, green: 2, blue: 223},
    ];
    const contrastRatio = (r, g, b) => {
      const normalize = eightBitNumber =>
        Math.pow((eightBitNumber / 255 + 0.055) / 1.055, 2.4);
      const relativeLuminance = (r, g, b) =>
        0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
      return ((relativeLuminance(r, g, b) + 0.05) / 0.05).toFixed(2);
    };
    // execute
    colorList.forEach(color => {
      cy.findByLabelText(/r/i).type(color.red.toString());
      cy.findByLabelText(/g/i).type(color.green.toString());
      cy.findByLabelText(/b/i).type(color.blue.toString()).blur();
      // verify
      cy.findByText(/contrast ratio with pure black/i).contains(
        contrastRatio(color.red, color.green, color.blue),
      );
    });
  });
});
