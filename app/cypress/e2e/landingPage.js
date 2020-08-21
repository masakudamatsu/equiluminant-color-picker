describe("Landing Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows the non-interactive UI components correctly", () => {
    cy.get("h1").should("have.text", "Luminance Picker");
  });
});
