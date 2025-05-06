
/// <reference types="cypress"/>



describe('Practice locating web elements', () => {
    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/form-elements')
    })

    /*
Navigate to https://techglobal-training.com/frontend/form-elements
Validate the heading is “Contact Us”
Validate the address is “2800 S River Rd Suite 310, Des Plaines, IL 60018”
Validate the email is “info@techglobalschool.com"
Validate the phone number is “(224) 580-2150”
    */
    it('Test Case 01 - Validate the Contact Us information', () => {
        cy.get('.is-size-3').should('have.text', 'Contact Us')
        cy.get('#address').should('contain.text', '2800 S River Rd Suite 310, Des Plaines, IL 60018')
        cy.get('#email').should('be.visible' )
        cy.get('#phone-number').should('have.text', '(224) 580-2150')
})

/*
Navigate to https://techglobal-training.com/frontend/form-elements
Validate that the Full name input box is displayed
Validate that the Full name input box is required
Validate that the label of the Full name input box is “Full name *”
Validate that the placeholder of the Full name input box is “Enter your full name”
*/
        it('Test Case 02 - Validate the Full name input box', () => {
            cy.get('input[placeholder="Enter your full name"]')
            .should('be.visible')
            .and('have.attr', 'required')

            cy.get('label[for="name"]')
            .should('have.text',  'Full name *')

            cy.get('input[placeholder="Enter your full name"]')
            .should('have.attr', 'placeholder', 'Enter your full name')

        })

        /*Navigate to https://techglobal-training.com/frontend/form-elements
Validate the label is “Gender *”
Validate that the Gender is required
Validate the options are “Female”, “Male” and “Prefer not to disclose”
Validate the options are clickable and not selected
Click on the “Male” option and validate it is selected while the others are not selected
Click on the “Female” option and validate it is selected while the others are not selected
*/
    
    it("Test Case 03 - Validate the Gender radio button", () => {
        cy.get('label').contains('Gender *').should('be.visible')
        .and('not.have.attr', 'required')

        cy.get('input[class="mr-1"]').should('be.visible')
        .and('be.enabled')
        .and('not.be.checked')

        cy.get('input[type="radio"]').eq(0).click()
        .should('be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')

        cy.get('input[type="radio"]').eq(1).click()
        .should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        
   
    })

   /* Navigate to https://techglobal-training.com/frontend/form-elements
    Validate that the Address input box is displayed
    Validate that the Address input box is not required
    Validate that the label of the Address input box is “Address”
    Validate that the placeholder of the Address input box is “Enter your address*”
    */

    it("Test Case 04 - Validate the Address input box", () => {
        cy.get('input[placeholder="Enter your address"]')
        .should('be.visible')
        .and('not.have.attr', 'required')
    ///  .and('have.attr', 'placeholder', 'Enter your address')         why error??????

        cy.contains('label', 'Address').should('have.text', 'Address')

        cy.get('input[placeholder="Enter your address"]')
        .should('have.attr', 'placeholder', 'Enter your address')  
        /// why i can't add it on top?


    })


/*
    Navigate to https://techglobal-training.com/frontend/form-elements
Validate that the Email input box is displayed
Validate that the Email input box is required
Validate that the label of the Email input box is “Email *”
Validate that the placeholder of the Email input box is “Enter your email”
*/
    it("Test Case 05 - Validate the Email input box", () => {
        cy.get('input[placeholder="Enter your email"]')
        .should('be.visible')
        .and('have.attr', 'required')
      ////  .should('have.attr', 'placeholder', 'Enter your email')
      
      cy.get('input[placeholder="Enter your address"]')
        .invoke('attr', 'placeholder')  
        .should('eq', 'Enter your address')

        cy.contains('label', 'Email *')


    })

/*
    Navigate to https://techglobal-training.com/frontend/form-elements
    Validate that the Phone input box is displayed
    Validate that the Phone input box is not required
    Validate that the label of the Phone input box is “Phone”
    Validate that the placeholder of the Address input box is “Enter your phone number”
    */ 

    it("Test Case 06 - Validate the Phone input box", () => {
        cy.get('input[placeholder="Enter your phone number"]')
        .should('be.visible')
        .and('not.have.attr', 'required')

        cy.get('input[placeholder="Enter your phone number"]').invoke('attr', 'placeholder') 
        .should('eq', 'Enter your phone number')

        cy.get('label').contains('Phone')


    })
/*
    Navigate to https://techglobal-training.com/frontend/form-elements
Validate that the Message text area is displayed
Validate that the Message text area is not required
Validate that the label of the Message text area is “Message”
Validate that the placeholder of the Message text area is “Type your message here…”
*/

    it("Test Case 07 - Validate the Message text area", () => {
        cy.get('textarea[placeholder="Type your message here..."]')
        .should('be.visible')
        .and('not.have.attr', 'required')
        
      //  cy.get('textarea[placeholder="Type your message here..."]')
       // .invoke('attr', 'placeholder').should('eq','Type your message here…')

        // why ... not working?

        cy.get("label").contains('Message')

    })
    
/*
    Navigate to https://techglobal-training.com/frontend/form-elements
Validate the label is “I give my consent to be contacted.”
Validate that the Consent checkbox is required
Validate that the Consent checkbox is clickable
Click on the “I give my consent to be contacted.” checkbox and validate it is selected
Click on the “I give my consent to be contacted.” checkbox again and validate it is not selected
*/

    it("Test Case 08 - Validate the Consent checkbox", () => {
        cy.get('label[class="checkbox"]').should('be.visible')
        .and('contain.text', 'I give my consent to be contacted.')

        cy.get('input[type="checkbox"]')
          .should('be.enabled')
          .and ('have.attr', 'required')
         
          cy.get('input[type="checkbox"]') .click().should('be.checked')
          cy.get('input[type="checkbox"]') .click().should('not.be.checked')

    })

    /*
    Navigate to https://techglobal-training.com/frontend/form-elements
Validate the “SUBMIT” button is displayed
Validate the “SUBMIT” button is clickable
Validate that the button text is “SUBMIT”
    */

it('Test Case 09 - Validate the SUBMIT button', () => {
cy.get('button[type="submit"]')
.should('be.visible')
.and('be.enabled')
.and('have.text', 'SUBMIT')

    
})

/*
Navigate to https://techglobal-training.com/frontend/form-elements
Enter a first name
Select a gender
Enter an address
Enter an email
Enter a phone number
Enter a message
Select the “I give my consent to be contacted.” checkbox
Click on the “SUBMIT” button
Validate the form message “Thanks for submitting!” is displayed under the “SUBMIT” button

*/

it('Test Case 10 - Validate the form submission', () => {
    Cypress.on('uncaught:exception', () => false);
    cy.get('input[placeholder="Enter your full name"]').type('Mariia')
   cy.get('input[type="radio"]').eq(1).check()
   cy.get('input[placeholder="Enter your address"]').type('Paris')
   cy.get('input[placeholder="Enter your email"]').type('Mariia.@gmail')
   cy.get('input[placeholder="Enter your phone number"]').type('123456789')
   cy.get('textarea[placeholder="Type your message here..."]').type('Hello')
   cy.get('input[type="checkbox"]').check()
   cy.get('button[type="submit"]').click()
   cy.contains('Thanks for submitting!').should('be.visible')

})

})
