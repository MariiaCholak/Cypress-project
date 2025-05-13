/// <reference types="cypress"/>

describe("Handling Multiple Windows", () => {
    beforeEach(() => {
      cy.visit("https://www.techglobal-training.com/frontend");
      cy.clickCard("Multiple Windows");
    });
  
    it("Tabs", () => {
      cy.get("#microsoft").should("have.attr", "target", "_blank");
  
      cy.get("#microsoft").invoke("removeAttr", "target").click();
    });
  
    /**
     * Go to https://techglobal-training.com/frontend/
     * Click on the "Multiple Windows" card
     * Click on the "Apple" link
     * Validate that the child window title is "Apple"
     * Navigate back to main page
     * Validate title contains "techglobal"
     */
    it('Test Case', () => {
      cy.get('#apple').invoke('removeAttr', 'target').click()
      cy.title().should('contain', 'Apple')
    /// normaly when i validate text i should use have text, but since it'snot web elem we should use eq, equal,
    //contain 
      cy.go(-1)
    
      cy.title().then((title) => {
        cy.wrap(title.toLowerCase()).should('contain', 'techglobal')
      })
    })
    //// text what comes from web page i can't change. 
    /// this is not jQury because it's not a web element( we talk about title), it's a pure str, and we use str mathod
  
  
  });