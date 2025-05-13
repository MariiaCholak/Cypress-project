
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
   /// teacher did this  cy.get('.is-size-3').as('header').should('have.text', 'Contact Us')
   cy.get('@header').nextAll().each((ele) => {       /// it's give us all subling of our class
    const expectText = ['2800 S River Rd Suite 310, Des Plaines, IL 60018', 'nfo@techglobalschool.com', '(224) 580-2150'] // put expected text inside this arr ele
    cy.wrap(ele).should('have.text', expectText[index])  // we did to all others our
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
            .and('have.attr', 'placeholder', 'Enter your full name')
            .and('have.attr', 'required')

            cy.get('label[for="name"]')
            .should('have.text',  'Full name *')

            cy.get('input[placeholder="Enter your full name"]')
            .should('have.attr', 'placeholder', 'Enter your full name')

        })
        //// teacher way    he didn't use lebel
        cy.get('[for="name"]').parent().find('input').should('be.visible')   //// from this parent we find a child
        .and('have.attr', 'required')
        .and('have.attr', 'placeholder', 'Enter your full name')
/// teacher did last requrements, with first parts, which means it not necessery to have strick order how to write it
/// and and('have.attr', 'required') when you put this part, it's faile after this, that why use last one to make sure everything is working


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

        cy.get('input[type="radio"]').eq(0).click()   //// this elements they wrap inside the label
        .should('be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')

        cy.get('input[type="radio"]').eq(1).click()
        .should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
       
        //// teacher way  validate it has text gender
        cy.contains('Gender *').should('have.text', 'Gender *')
        const expectText = ['Male', 'Female', 'Prefer not to disclose']  // we created an array to loop all our element, because they belong to label
        cy.get('.radio > input').should('have.attr', 'required')   //// because our first only has attr
        cy.get('.radio > input').each((ele, index) => {
            cy.wrap(ele).parent().should('have.text', expectText[index])
            cy.wrap(ele).should('not.be.selected').and('be.enabled')

            const checkOptions = (optionToCheck, expectText) /// our func has 2 option to check
           cy.contains(optionToCheck).find('input').check().should('be.checked')
//// use js function filter to check which is checked 
expectText.filter(option => option !== optionToCheck).forEach(uncheckedOption => {
    cy.contains(uncheckedOption).find('input').should('not.be.checked')
})
        })

    })

   /* Navigate to https://techglobal-training.com/frontend/form-elements
    Validate that the Address input box is displayed
    Validate that the Address input box is not required
    Validate t hat the label of the Address input box is “Address”
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
        /// why i can't add it on top

    })

//// Burak way for 4-8 cases   arr of obj
const testCases = [
    {
        descr: 'Adress input box',
        label: 'Address',
        placeholder: 'Enter you address',
        require: false
    }
    {
        descr: 'Email input box',
        label: 'Email',
        placeholder: 'Enter you email',
        require: true
    }
    {
        descr: 'Phone input box',
        label: 'Phone',
        placeholder: 'Enter you phone number',
        require: false
    }
    {
        descr: 'Message text area ',
        label: 'Message',
        placeholder: 'Enter you message',
        require: false
    }
]
testCases.forEach((test, index) => {
        it (`Test Case0 ${index + 4} - ${test.description}`, () => {
        cy.contains( 'label', test.label).should( 'have, text', test.label)
        cy.contains ('label', test.label).parent().find( 'input, textarea')
        .should('be.visible')
        .and('have-attr', 'placeholder', test.placeholder)
        .and(test, required ? 'have.attr' : 'not.have.attr', 'required')
})
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
          .and ('have.attr', 'required')    //// after this doesn't wont to work can to it at the end
         
          cy.get('input[type="checkbox"]') .click().should('be.checked') 
          cy.get('input[type="checkbox"]') .click().should('not.be.checked')

          /// teacher
          cy.get('.checkbox').then((txt) => {
            expect(txt.text().trim()).to.be.eq ('I give my consent to be contacted.')
          })

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
const inputs = ['TechGlobal', '2860 S River Rd Suite 480, Des Plaines, IL 60018', 'Infoetechglobalschool.com', '(773) 257-3010', 'Random Message']
    cy.get('.control').find('*.input, textarea').each(($el, index) => {
    cy.wrap($el).type(inputs[index])
    cy.contains ('label', 'Male').find('input').check().cy-get('.checkbox').find("input").check().cy.get('.control > .button').click()
    cy.on('uncaught: exception', () => {
    return false
    })
    cy.get ('.mt-S').should('have, text', 'Thanks for submitting!')

})
})





//////bilal
describe('Project - 01', () => {
    beforeEach(()=>{
        cy.visit('https://techglobal-training.com/frontend/form-elements')
    })

    /**
     * Navigate to https://techglobal-training.com/frontend/project-1
     * Validate the heading is "Contact Us"
     * Validate the address is "2800 S River Rd Suite 310, Des Plaines, IL 60018"
     * Validate the email is "info@techglobalschool.com"
     * Validate the phone number is "(224) 580-2150"
    */
    it('Test Case 01 - Validate the Contact Us information', () => {
      cy.get('.is-size-3').should('have.text', 'Contact Us')
      cy.get('#address').should('have.text', '2800 S River Rd Suite 310, Des Plaines, IL 60018')
      cy.get('#email').should('have.text', 'info@techglobalschool.com')
      cy.get('#phone-number').should('have.text', '(224) 580-2150')

      //way2
      const expectedFields = ['Contact Us','2800 S River Rd Suite 310, Des Plaines, IL 60018','info@techglobalschool.com', '(224) 580-2150']

      cy.get('.mb-5').children().each((ele, index) => {
        cy.wrap(ele).should('have.text', expectedFields[index])
      })
    })


    /**
     * Navigate to https://techglobal-training.com/frontend/project-1
     * Validate that the Full name input box is displayed
     * Validate that the Full name input box is required
     * Validate that the label of the Full name input box is "Full name *"
     * Validate that the placeholder of the Full name input box is "Enter your full name"
    */
    it('Test Case 02 - Validate the Full name input box', () => {
      cy.get('[for="name"]').as('label').parent().find('.input').should('be.visible')
      .and('have.attr', 'placeholder', 'Enter your full name')
      .and('have.attr', 'required')
    
      cy.get('@label').should('have.text', 'Full name *')
    })
    

    /**
     * Navigate to https://techglobal-training.com/frontend/project-1
     * Validate the label is "Gender *"
     * Validate that the Gender is required
     * Validate the options are "Female", "Male" and "Prefer not to disclose"
     * Validate the options are clickable and not selected
     * Click on the "Male" option and validate it is selected while the others are not selected
     * Click on the "Female" option and validate it is selected while the others are not selected
    */

    it('Test Case 03 - Validate the Gender radio button', () => {
      cy.contains('Gender *').should('have.text', 'Gender *');

      cy.get("[type='radio']").first().should('have.attr', 'required')

      const expectedRadio = ['Male','Female', 'Prefer not to disclose']

      cy.get("[type='radio']").each((ele, index) => {
        cy.wrap(ele).parent().should('have.text', expectedRadio[index])
        cy.wrap(ele).should('be.enabled').and('not.be.checked')
      })

      // way 1
      cy.contains("Male").find('input').check().should('be.checked')
      cy.contains("Female").find('input').should('not.be.checked')
      cy.contains("Prefer not to disclose").find('input').should('not.be.checked')

      cy.contains("Female").find('input').check().should('be.checked')
      cy.contains("Male").find('input').should('not.be.checked')
      cy.contains("Prefer not to disclose").find('input').should('not.be.checked')

      //way 2
      const checkRadioOption = (selectedOption, allOptions) => {
        cy.contains(selectedOption).find('input').check().should('be.checked')

        const notSelectedOptions = allOptions.filter(ele => ele !== selectedOption)

        for(let option of notSelectedOptions){
          cy.contains(option).find('input').should('not.be.checked')
        }
      }

      checkRadioOption('Male', expectedRadio)
      checkRadioOption('Female', expectedRadio)
      checkRadioOption('Prefer not to disclose', expectedRadio)
    })
    

    /**
     * Navigate to https://techglobal-training.com/frontend/project-1
     * Validate that the Address input box is displayed
     * Validate that the Address input box is not required
     * Validate that the label of the Address input box is "Address"
     * Validate that the placeholder of the Address input box is "Enter your address*"
    */

    /**
     * Navigate to https://techglobal-training.com/frontend/project-1
     * Validate that the Email input box is displayed
     * Validate that the Email input box is required
     * Validate that the label of the Email input box is "Email *"
     * Validate that the placeholder of the Email input box is "Enter your email"
    */

    /**
     * Navigate to https://techglobal-training.com/frontend/project-1
     * Validate that the Phone input box is displayed
     * Validate that the Phone input box is not required
     * Validate that the label of the Phone input box is "Phone"
     * Validate that the placeholder of the Address input box is "Enter your phone number"
    */
    
    /**
     * Navigate to https://techglobal-training.com/frontend/project-1
     * Validate that the Message text area is displayed
     * Validate that the Message text area is not required
     * Validate that the label of the Message text area is "Message"
     * Validate that the placeholder of the Message text area is "Type your message here…"
    */
    

    const testCases = [
      {
        discription: 'Address Input Box',
        label: 'Address',
        placeholder: 'Enter your address',
        isRequired: false
      },
      {
        discription: 'Email Input Box',
        label: 'Email *',
        placeholder: 'Enter your email',
        isRequired: true
      },
      {
        discription: 'Phone Number Input Box',
        label: 'Phone',
        placeholder: 'Enter your phone number',
        isRequired: false
      },
      {
        discription: 'Message Test Area',
        label: 'Message',
        placeholder: 'Type your message here...',
        isRequired: false
      },
    ]

    for(const tc of testCases){
      it(`Test Case - ${tc.discription}`, () => {
        cy.contains('.label', tc.label).should('have.text', tc.label)
        .and('be.visible')

        cy.contains('.label', tc.label).parent().find('input, textarea')
        .should(tc.isRequired ? 'have.attr' : 'not.have.attr', 'required')
      })
    }

    
    

    /**
     * Navigate to https://techglobal-training.com/frontend/project-1
     * Validate the label is "I give my consent to be contacted."
     * Validate that the Consent checkbox is required
     * Validate that the Consent checkbox is clickable
     * Click on the "I give my consent to be contacted." checkbox and validate it is selected
     * Click on the "I give my consent to be contacted." checkbox again and validate it is not selected
    */
    it("Test Case 08 - Validate the Consent checkbox", () => {

    });
    
    
    /**
     * Navigate to https://techglobal-training.com/frontend/project-1
     * Validate the "SUBMIT" button is displayed
     * Validate the "SUBMIT" button is clickable
     * Validate that the button text is "SUBMIT"
    */
    it("Test Case 09 - Validate the SUBMIT button", () => {

    });
    

    /**
     * Navigate to https://techglobal-training.com/frontend/project-1
     * Enter a first name
     * Select a gender
     * Enter an address
     * Enter an email
     * Enter a phone number
     * Enter a message
     * Select the "I give my consent to be contacted." checkbox
     * Click on the "SUBMIT" button
     * Validate the form message "Thanks for submitting!" is displayed under the "SUBMIT" button
    */
    it("Test Case 10 - Validate the form submission", () => {
       
    });
  })

