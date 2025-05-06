/// <reference types="cypress"/>

describe("Basic", () => {
    beforeEach(() => {
      cy.visit("https://www.techglobal-training.com/frontend");
    });

it("Checkbox & Radio Buttons - check() 2", () => {
    /**
     * 1. Check on the Tesla checkbox button
     * 2. Then Validate its checked
     * 3. Uncheck the Tesla checkbox button
     * 4. Validate its unchecked
     */


        cy.get("#radio_1_option_1")
    .should('not.be.checked')
    .check()
    .should('be.checked')

    cy.get("#radio_1_option_")
    .should('not.be.checked')
    .check()

    cy.get("#radio_1_option_2").check()
    .should('be.checked')

  });

  

});