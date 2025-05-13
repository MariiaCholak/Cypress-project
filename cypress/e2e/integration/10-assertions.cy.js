/// <reference types="cypress"/>

describe('Cypress Assertion', () => {
    beforeEach(() => {
      cy.visit('https://www.techglobal-training.com/');
    });
  
    it('Default Assertions 1', () => {
      cy.get('img[class^="Footer_logo"]')
        .scrollIntoView()
        //.should('exist')
        //.and('be.visible')
        .and('have.attr', 'alt', 'Tech Global Logo');
    });
  
    it('Default Assertions 2', () => {
      cy.get('button').contains('Mock Interviews')
        //.should('be.enabled')   /// clicable or not  click 
        .click();
  
      cy.url().should('eq', 'https://www.techglobal-training.com/login');
      it('Explicit Assertions with then()', () => {
        cy.get('#dropdown-testing').then(el => { // then() is used to convert Cypress selector to jQuery object
          const text = el.text(); // jQuery method
    
          // These logs cannot be done with Cypress commands
          cy.log('Element color is', el.css('color'));
          cy.log('Element background color is', el.css('background-color'));
          cy.log(text);
    
          // Explicit Assertiions
          expect(el).to.be.visible;
          expect(text).eq('Testing');
    
          // wrap() is used to convert jQuery object back to Cypress chainable
          cy.wrap(el).should('be.visible').and('have.text', 'Testing'); 
        });
      });
    
      it.only('Explicit Assertions with invoke()', () => {
        cy.get('#dropdown-testing').should('have.text', 'Testing');
    
        cy.get('#dropdown-testing').invoke('text').should('eq', 'Testing');
    
        cy.get('#dropdown-testing').then((el) => {
          // In case you need multiple assertions
          expect(el.text()).eq('Testing');
          expect(el.attr('class').includes('button'));
        });
    
        cy.get('#dropdown-testing').invoke('text').then((txt) => {
          expect(txt).eq('Testing');
          cy.log(txt);
        });

        cy.get("#dropdown-testing")
        .invoke("text")
        .then((txt) => {
          expect(txt).eq("Testing");
          cy.log(txt);
        });
    });
      });






      it("Explicit Assertions with each() 1", () => {
        /*
        Hover over Exercises Nav Item
        Validate below option are visible, clickable, and make sure their text are correct
          Java Exercises
          JS Exercises
        */
    
        const expectedOptions = ["Java Exercises", "JS Exercises"];
    
        cy.get("#dropdown-exercises").realHover();
    
        cy.get('a[id*="j"]').should('have.length', 2).each((el, index) => {
          // Explicit assertions
          expect(el).to.be.visible;
          expect(el.text()).eq(expectedOptions[index]);
    
          // Implicit assertions
          cy.wrap(el).should('be.visible').and('have.text', expectedOptions[index]);
        })
    
        // Primitive way
        // cy.get("#java-option")
        //   .should("be.visible")
        //   // .and("be.enabled")
        //   .and("have.text", "Java Exercises");
    
        // cy.get("#js-option")
        //   .should("be.visible")
        //   // .and("be.enabled")
        //   .and("have.text", "JS Exercises");
      });
    
      it('Explicit Assertions with each() 2', () => {
        /*
        Validate there 5 social media icons are visible in the footer
        Validate all the links has "techglobal" in href attribute
        Validate all the links has target attribute value is "_blank"
        */
      });
    });
    
   

    