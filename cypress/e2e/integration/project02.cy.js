
/// <reference types="cypress"/>

describe(' practice locating web elements for logging in, logging out, resetting passwords, and handling input fields', () => {
    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/login')
    })

    /*
Navigate to https://techglobal-training.com/frontend/login
Validate that the username input box is displayed
Validate that the username input box is not required
Validate that the label of the username input box is “Please enter your username”
Validate that the password input box is displayed
Validate that the password input box is not required
Validate that the label of the password input box is “Please enter your password”
Validate the “LOGIN” button is displayed
Validate the “LOGIN” button is clickable
Validate that the button text is “LOGIN”
Validate the “Forgot Password?” link is displayed
Validate that the “Forgot Password?” link is clickable
Validate that the link text is “Forgot Password?”
    */

    it('Test Case 01 - Validate the login form', () => {
        const userMessage = ['Please enter your username', 'Please enter your password']

      
        cy.get('.LoginForm_form__m12Jc').find('#username, #password').each((el, index) => {
            cy.wrap(el).should('be.visible')
            .and('not.have.attr', 'required')
// what require means?  if you see an input box has an attribute it's called required it means that without passing a value inside of  this one you cannot move on
/// it doesn't allowed you to do action, you need to provide inf.

            cy.wrap(el).prev().should('have.text', userMessage[index])
          })
          
          const haveText = ['LOGIN', 'Forgot Password?']       // can i use 2 locators together?
       cy.get('#login_btn').parent().find('#login_btn, [href="/frontend/login"]').each((el, index) => {
        cy.wrap(el).should('be.visible')   //// expect?
        .and('have.text', haveText[index])
        
        if (el.attr('id') === 'login_btn'){
            cy.wrap(el).should('be.enabled')
         } else { 
           cy.wrap(el).should('have.attr', 'href', '/frontend/login')
         }
    })


    })
/*
   2  Navigate to https://techglobal-training.com/frontend/login
Enter the username as “TechGlobal”
Enter the password as “Test1234”
Click on the “LOGIN” button
Validate the success message is displayed as “You are logged in”
Validate the logout button displayed with the text “LOGOUT”

Test Case 03 - Validate the logout
Navigate to https://techglobal-training.com/frontend/login
Enter the username as “TechGlobal”
Enter the password as “Test1234”
Click on the “LOGIN” button
Click on the “LOGOUT” button
Validate that the login form is displayed
*/

    it('Test Case 02 - Validate the valid login and Test Case 03 - Validate the logout', () => {
        const credential = ['TechGlobal', 'Test1234']
        cy.get('#username, #password').each((el, index) => {     /// can i provide 2 elem?
            cy.wrap(el).clear().type(credential[index])
           }).then(() => {
              cy.get('#login_btn').click()
              cy.get('#success_lgn').should('be.visible')
              .and('have.text', 'You are logged in')  /// by cheking this text we validate it's display 
              cy.get('#logout').should('be.visible')
               .and('have.text', 'LOGOUT').click()
              cy.get('.is-size-3').should('be.visible')
              .and('have.text', 'Login Form')
           })
    })
  
    /*
    Test Case 04 - Validate the Forgot Password? Link and Reset Password modal
Navigate to https://techglobal-training.com/frontend/login
Click on the “Forgot Password?” link
Validate that the modal heading “Reset Password” is displayed
Validate that the close button is displayed
Validate that the email input box is displayed
Validate that the label of the email input box is “Enter your email address and we'll send you a link to reset your password.”
Validate the “SUBMIT” button is displayed
Validate the “SUBMIT” button is clickable
Validate that the button text is “SUBMIT”
    */

    it('Test Case 04 - Validate the Forgot Password? Link and Reset Password modal', () => {
    cy.get('[href="/frontend/login"]').click()
    cy.get('#modal_title').should('be.visible')
    .and('have.text', 'Reset Password')
    cy.get('.delete').should('be.visible')    ///('[aria-label="close"]')
    cy.get('#email').should('be.visible')
    cy.get('[for="email"]').should('be.visible')
    .and('have.text', `Enter your email address and we'll send you a link to reset your password. `)
 //// out space issue in the text
    cy.get('[for="email"]').then(($txt) => {
      expect($txt.text().trim()).to.equal("Enter your email address and we'll send you a link to reset your password.");
    });



    cy.get('#submit').should('be.visible')
    .and('have.text', 'SUBMIT')
    .and('be.enabled')
   
    })

    /*
Navigate to https://techglobal-training.com/frontend/login
Click on the “Forgot Password?” link
Validate that the “Reset Password” modal is displayed
Click on the close button
Validate that the “Reset Password” modal is closed

    */

it('Test Case 05 - Validate the Reset Password modal close button', () => {
cy.get('[href="/frontend/login"]').click()
    cy.get('#modal_title').should('be.visible')
    .and('have.text', 'Reset Password')
        cy.get('.delete').should('be.visible').click()
         cy.get('#modal_title').should('not.exist')
})


/*
Navigate to https://techglobal-training.com/frontend/login
Click on the “Forgot Password?” link
Enter an email
Click on the “SUBMIT” button
Validate the form message “A link to reset your password has been sent to your email address.” is displayed under the “SUBMIT” button
*/

it('Test Case 06 - Validate the Reset Password form submission', () => {

    cy.get('[href="/frontend/login"]').click()
    cy.get('#email').type('blablabla@17')
    cy.get('#submit').click()
    cy.get('#confirmation_message').should('be.visible')
    .and('have.text', 'A link to reset your password has been sent to your email address.')

})

/*
Test Case 07 - Validate the invalid login with the empty credentials
Navigate to https://techglobal-training.com/frontend/login
Leave username empty
Leave password empty
Click on the “LOGIN” button
Validate the failure message is displayed as “Invalid Username entered!” above the form
*/

it('Test Case 07 - Validate the invalid login with the empty credentials', () => {
    cy.get('#login_btn').click()
    cy.get('#error_message').should('be.visible')
    .and('have.text', 'Invalid Username entered!' )
})

/*Test Case 7-8-9-10 - Validate the invalid login with the wrong username and password
Navigate to https://techglobal-training.com/frontend/login
Enter the username as “John”
Enter the password as “1234”
Click on the “LOGIN” button
Validate the failure message is displayed as “Invalid Username entered!” above the form
*/

const testData = [
    {
    title: 'Test Case 07 - Validate the invalid login with the empty credentials',  
    userName: ' ',
    password: ' ',
    message: 'Invalid Username entered!'
    },
{ 
    title: 'Test Case 08 - Wrong username',
    userName: 'John',
    password: 'Test1234',
    message: 'Invalid Username entered!'
},
{ 
    title: 'Test Case 09 - Wrong password',
    userName: 'TechGlobal',
    password: '1234',
    message: 'Invalid Password entered!'
}, 
{
   title: 'Test Case 10 - Wrong username and password',
   userName: 'John',
    password: '1234',
    message: 'Invalid Username entered!' 
}]

testData.forEach(({title, userName, password, message})=> {

    it(title, () => {

        cy.get('#username').clear().type(userName || " ")
             cy.get('#password').clear().type(password || " ")
            cy.get('#login_btn').click()
            cy.get('#error_message')
           .should('be.visible')
            .and('have.text', message)
        })
         })   


})