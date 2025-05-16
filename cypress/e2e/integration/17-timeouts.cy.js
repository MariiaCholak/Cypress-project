/// <reference types="cypress"/>

describe("Timeouts", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend");
    cy.clickCard("HTML Elements");
  });

  it("Explicit and Inline Timeouts", () => {
    cy.get("#main_heading", { timeout: 6000 });

    cy.get("#hello_paragraph", { timeout: 5000 }).click({ timeout: 10 * 1000 });

    cy.get("#checkbox-button-group input").click({
      multiple: true,
      timeout: 5000,
      force: true,
      log: true,
    });

    // npx cypress run --config defaultCommandTimeout=10000
  });

  it("Waits", () => {
    cy.visit(`${Cypress.env("SITE_URL")}/frontend`);
    cy.clickCard("Waits");

    cy.get("#red").click();

    cy.get(".box", { timeout: 10000 }).should("be.visible");
  });
});