/// <reference types="cypress"/>

describe('TechGlobal Training Home Page Validation', () => {
    before(() => {
      cy.log('Starting TechGlobal Training Home Page Validation...');
    });
  
    after(() => {
      cy.log('Finished TechGlobal Training Home Page Validation...');
    });
  
    beforeEach(() => {
      cy.visit('https://www.techglobal-training.com/');
    });
  
    afterEach(() => {
      cy.log('Test is completed!');
    });
  
    it('Validate Welcome section', () => {
        // code here
    });
  
    it('Validate About Us section', () => {
        // code here
    });
  
    it('Validate Programs section', () => {
        // code here
    });
  });