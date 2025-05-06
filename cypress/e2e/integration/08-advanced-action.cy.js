/// <reference types="cypress"/>

describe('Cypress Advanced Actions', () => {
    beforeEach(() => {
        cy.visit("https://www.techglobal-training.com/frontend");
      cy.contains(".card", "Actions").click();
    });
  
    it('Type and clear actions', () => {
  
      let query = 'Apple';
      
      cy.get('#input_box')
        // .should('exist') is useless since we have many other assertions
        .and('be.visible')
        .and('be.enabled')   /// you can text there 
        .and('have.attr', 'placeholder', 'Enter your message...')
        .and('have.attr', 'value', '')  /// empty it's no value yet
        .type(query)
        .should('have.attr', 'value', query)
        .clear()
        .should('have.attr', 'value', '')
        .and('be.empty')
  
      // cy.get('#input_box').then(($inputElement) => {
      //   const placeholder = $inputElement.attr('placeholder');
      //   cy.log(placeholder);
  
      //   cy.wrap($inputElement); // Cypress chainable
      // })
    })
  
    it('Right-Click and Double-Click', () => {
      cy.get('#right-click').rightclick();
      cy.get('#right_click_result')
        .should('be.visible')
        .and('have.text', 'You right-clicked on a button!');
  
      cy.get('#double-click').dblclick();
      cy.get('#double_click_result')
        .should('be.visible')
        .and('have.text', 'You double-clicked on a button!');
    });
  
    it('Drag and Drop', () => {
      cy.get('#drag_element').drag('#drop_element'); // requires 4tw/cypress-drag-drop dependency
      
      cy.get('#drag_and_drop_result')
        .should('be.visible')
        .and('have.text', 'An element dropped here!')
    });
  
    it('Hover Over', () => {
      // cy.get('#dropdown-testing').trigger('mouseover'); // does not work and requires cypress-real-events dependency
      cy.get('#dropdown-testing').realHover();
      cy.get('#backend-option').click();
      cy.url().should('include', 'backend');
  
      // cy.on() here is used to listen if we get any "uncaught:exception"
      // and ignore it by returning false
  
      cy.on('uncaught:exception', () => {
        return false
      });
    });
  })