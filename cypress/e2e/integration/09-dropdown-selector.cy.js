/// <reference types="cypress"/>

describe('Dropdown select', () => {
    beforeEach(() => {
        cy.visit("https://www.techglobal-training.com/frontend")
      cy.contains(".card", "Dropdowns").click();

    });
  
    it('Select product & color', () => {
      // cy.get('#product_dropdown')
      //   .select('Apple Watch Series 8')
      //   .should('have.value', 'Apple Watch Series 8');
  
      // cy.get('#color_dropdown')
      //   .select('Yellow')
      //   .should('have.value', 'Yellow');
  
      cy.get('#product_dropdown').select('Apple Watch Series 8');
      cy.get('#color_dropdown').select('Yellow');
  
      cy.get('#product_dropdown option:selected').should('have.text', 'Apple Watch Series 8');
      cy.get('#color_dropdown option:selected').should('have.text', 'Yellow');
    })
  
    it('Select product & color & delivery', () => {
      cy.get('#product_dropdown option:selected').should('contain.text', 'Select');
      cy.get('#product_dropdown').select('Apple Watch Series 8');
      cy.get('#product_dropdown option:selected').should('have.text', 'Apple Watch Series 8');
  
      cy.get('#color_dropdown option:selected').should('contain.text', 'Select');
      cy.get('#color_dropdown').select('Yellow');
      cy.get('#color_dropdown').select('Silver');
      cy.get('#color_dropdown option:selected').should('have.text', 'Silver');
  
      cy.get('#shipment_dropdown').click();
      cy.get('span[aria-label="Delivery"]').click();
    });
  
    it('Validate the result of selections', () => {
      /*
        Select "iPad Pro 11"
        Select "Green"
        Select "Pick up"
        Click on "SUBMIT" button
        Validate "Your Green iPad Pro 11 is ready to be picked up." is visible
      */
     cy.get('#product_dropdown option:selected').should('contain.text', 'Select');
cy.get('#product_dropdown').select('iPad Pro 11')
cy.get('#product_dropdown option:selected').should('have.text', 'iPad Pro 11');

cy.get('#color_dropdown option:selected').should('contain.text', 'Select');
cy.get('#color_dropdown').select('Green')
cy.get('#color_dropdown option:selected').should('have.text', 'Green');

cy.get('.react-dropdown-select-content').should('have.text', 'Select');
cy.get('.react-dropdown-select-content').click()
cy.get('[aria-label="Pick up"]').click()
cy.get('.react-dropdown-select-content').should('have.text', 'Pick up');


cy.get('#submit').click()
cy.get("#result").should('have.text', 'Your Green iPad Pro 11 is ready to be picked up.')



    })
  })