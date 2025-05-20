
describe('Project - 02', () => {
  beforeEach(()=>{
    cy.visit('https://techglobal-training.com/frontend/login')
  })


  /**
   * Navigate to https://techglobal-training.com/frontend/project-2
   * Validate that the username input box is displayed
   * Validate that the username input box is not required
   * Validate that the label of the username input box is "Please enter your username"
   * Validate that the password input box is displayed
   * Validate that the password input box is not required
   * Validate that the label of the password input box is "Please enter your password"
   * Validate the "LOGIN" button is displayed
   * Validate the "LOGIN" button is clickable
   * Validate that the button text is "LOGIN"
   * Validate the "Forgot Password?" link is displayed
   * Validate that the "Forgot Password?" link is clickable
   * Validate that the link text is "Forgot Password?"
  */

  
  it('Test Case 01 - Validate the login form', () => {  
    cy.get("div > input").each(($el) => {
      cy.wrap($el).should("be.visible");
      cy.wrap($el).should("not.have.attr", "required");
    });
  
    const expectedLabel = [
      "Please enter your username",
      "Please enter your password",
    ];
  
    cy.get("div > label").each(($txt, index) => {
      expect($txt.text()).to.equal(expectedLabel[index]);
    });  /// Тобто ти перевіряєш не Cypress-об'єкт, а рядок — а отже, потрібен expect
    ///Це виглядає правильно, але Cypress не повторює each, тому якщо елементи ще не готові або динамічні — тест може впасти.
  
    cy.get("#login_btn").should('be.visible').and('be.enabled').and('have.text', 'LOGIN');
  
    cy.get("#login_btn").next().should('be.visible').and('have.text', 'Forgot Password?').and('have.css', 'pointer-events', 'auto');;
  })

  /**
   * Navigate to https://techglobal-training.com/frontend/project-2
   * Enter the username as "TechGlobal"
   * Enter the password as "Test1234"
   * Click on the "LOGIN" button
   * Validate the success message is displayed as "You are logged in"
   * Validate the logout button displayed with the text "LOGOUT"
   */

  /**
   * Navigate to https://techglobal-training.com/frontend/project-2
   * Enter the username as "TechGlobal"
   * Enter the password as "Test1234"
   * Click on the "LOGIN" button
   * Click on the "LOGOUT" button
   * Validate that the login form is displayed
   */
  it('Test Case 02 03 - Validate the valid login', () => {
    const credentials = ["TechGlobal", "Test1234"];

    cy.get("div > input").each(($el, index) => {
      cy.wrap($el).type(credentials[index]);
    });

    cy.get("#login_btn").click();

    cy.get("#success_lgn").should("have.text", "You are logged in");

    cy.get("#logout").should("be.visible");

    cy.get("#logout").click()

    cy.get("form").should('be.visible')
  })


  /**
   * Navigate to https://techglobal-training.com/frontend/project-2
   * Click on the "Forgot Password?" link
   * Validate that the modal heading "Reset Password" is displayed
   * Validate that the close button is displayed
   * Validate that the email input box is displayed
   * Validate that the label of the email input box is "Enter your email address and we'll send you a link to reset your password."
   * Validate the "SUBMIT" button is displayed
   * Validate the "SUBMIT" button is clickable
   * Validate that the button text is "SUBMIT"
   */
  /**
   * Navigate to https://techglobal-training.com/frontend/project-2
   * Click on the "Forgot Password?" link
   * Validate that the "Reset Password" modal is displayed
   * Click on the close button
   * Validate that the "Reset Password" modal is closed
   */

  /**
   * Navigate to https://techglobal-training.com/frontend/project-2
   * Click on the "Forgot Password?" link
   * Enter an email
   * Click on the "SUBMIT" button
   * Validate the form message "A link to reset your password has been sent to your email address." is displayed under the "SUBMIT" button
   */


  it('Test Case 04 05 06 - Validate the Forgot Password? Link and Reset Password modal', () => {
    cy.get('#login_btn').next().as('forgotBtn').click();

    cy.get('#modal_title').should('have.text', "Reset Password");

    cy.get('[aria-label="close"]').as('closeBtn').should('be.visible');
    cy.get('@closeBtn').click()
    cy.get(".modal").should("not.exist");
    cy.get('@forgotBtn').click();

    cy.get('#email').should('be.visible');
    cy.get('[for="email"]').then(($txt) => {
      expect($txt.text().trim()).to.equal("Enter your email address and we'll send you a link to reset your password.");
    });
    cy.get("#email").type("techgloba@tech.com");
  

    cy.get('#submit').should('be.visible').and('be.enabled').and('have.text', "SUBMIT");
    cy.get("#submit").click();

    cy.get("#confirmation_message")
    .should( "have.text", "A link to reset your password has been sent to your email address." );
  })


  /**
   * Navigate to https://techglobal-training.com/frontend/project-2
   * Leave username empty
   * Leave password empty
   * Click on the "LOGIN" button
   * Validate the failure message is displayed as "Invalid Username entered!" above the form
   */

  /**
   * Navigate to https://techglobal-training.com/frontend/project-2
   * Enter the username as "John"
   * Enter the password as "Test1234"
   * Click on the "LOGIN" button
   * Validate the failure message is displayed as "Invalid Username entered!" above the form
   */

  /**
   * Navigate to https://techglobal-training.com/frontend/project-2
   * Enter the username as "TechGlobal"
   * Enter the password as "1234"
   * Click on the "LOGIN" button
   * Validate the failure message is displayed as "Invalid Password entered!" above the form
   */

  /**
   * Navigate to https://techglobal-training.com/frontend/project-2
   * Enter the username as "John"
   * Enter the password as "1234"
   * Click on the "LOGIN" button
   * Validate the failure message is displayed as "Invalid Username entered!" above the form
   */

const testCases = [
  {
    description: "Test Case 07 - Validate empty username and password",
    username: " ",
    password: " ",
    expectedMessage: "Invalid Username entered!"
  },
  {
    description: "Test Case 08 - Validate incorrect username",
    username: "John",
    password: "Test1234",
    expectedMessage: "Invalid Username entered!"
  },
  {
    description: "Test Case 09 - Validate incorrect password",
    username: "TechGlobal",
    password: "1234",
    expectedMessage: "Invalid Password entered!"
  },
  {
    description: "Test Case 10 - Validate incorrect username and password",
    username: "John",
    password: "1234",
    expectedMessage: "Invalid Username entered!"
  }
];

testCases.forEach(({ description, username, password, expectedMessage }) => {
  it(description, () => {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#login_btn').click()
    cy.get('#error_message').should('have.text', expectedMessage)
  });
});
})
