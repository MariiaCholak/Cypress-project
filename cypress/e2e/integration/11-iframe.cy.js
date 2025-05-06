
/// <reference types="cypress"/>

describe("Handling iFrames", () => {
    beforeEach(() => {
      cy.visit("https://www.techglobal-training.com/frontend");
      cy.contains('.card', 'IFrames').click()
    });
  
    it('iFrames', () => {
        cy.get('#form_frame')
        .its('0.contentDocument.body')
        .find('#first_name')
        .type('maria')
      
        
    /**
   * Go to https://techglobal-training.com/frontend/
   * Click on the "IFrames" card
   * Enter "John" into the first name input box
   * Enter "Doe" into the last name input box
   * Click on the "SUBMIT" button
   * Validate the result equals "You entered: John Doe"
   */
    })
    it('Task', () => {
    

        it("iFrame Test Case", () => {
      
          const arr = ["John", "Doe"];
      
          // SELECT first_name, last_name FROM namesTable
      
          // "Alina, alineLastName, 1 , 12312321"
      
          cy.get('#form_frame')
          .its('0.contentDocument.body')
          .find('[id$="_name"]').each(($el, index) => {
            cy.wrap($el).type(arr[index])
          })
      
          cy.get('#form_frame')
          .its('0.contentDocument.body')
          .find('#submit').click()
      
          cy.get('#result').should('have.text', `You entered: ${arr.join(' ')}`)
        });
      });
      /*
        cy.get('#form_frame')
        .its('0.contentDocument.body')
        .find('#first_name')
        .type('John')  

        cy.get('#form_frame')
        .its('0.contentDocument.body')
        .find('#last_name')
        .type('Doe')

        cy.get('#form_frame')
        .its('0.contentDocument.body')
        .find('#submit').click()

        */

    })
 