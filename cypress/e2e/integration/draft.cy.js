
describe(' practice locating web elements for logging in, logging out, resetting passwords, and handling input fields', () => {
    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/login')
    })

    

const testData = [
    {
    title: 'Test Case 07 - Validate the invalid login with the empty credentials',  
    userName: '',
    password: '',
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








/*
Test Case 08 - Validate the invalid login with the wrong username
Navigate to https://techglobal-training.com/frontend/login
Enter the username as “John”
Enter the password as “Test1234”
Click on the “LOGIN” button
Validate the failure message is displayed as “Invalid Username entered!” above the form
*/

it('Test Case 08 - Validate the invalid login with the wrong username', () => {
cy.get('#username').type('John')
cy.get('#password').type('Test1234')
cy.get('#login_btn').click()
cy.get('#error_message').should('be.visible')
.and('have.text', 'Invalid Username entered!' )
})


/*
Test Case 09 - Validate the invalid login with the wrong password
Navigate to https://techglobal-training.com/frontend/login
Enter the username as “TechGlobal”
Enter the password as “1234”
Click on the “LOGIN” button
Validate the failure message is displayed as “Invalid Password entered!” above the form
*/
it('Test Case 09 - Validate the invalid login with the wrong password', () => {
cy.get('#username').type('TechGlobal')
cy.get('#password').type('1234')
cy.get('#login_btn').click()
cy.get('#error_message').should('be.visible')
.and('have.text', 'Invalid Password entered!' )
})











        //// if (userName === '') {
      ////  cy.get('#username').clear() // Очистимо поле, але не будемо використовувати .type()

