
class LoginPage {

  /* Locators */
  getUsernameField() {
    return cy.get('#username')
  }

  getPasswordField() {
    return cy.get('#password')
  }

  getSubmitButton() {
    return cy.get('#login_btn')
  }

  getSuccessMessage() {
    return cy.get('#success_lgn')
  }
  
  getErrorMessage() {
    return cy.get('#error_message')
    
  }

  /* Methods */
  clickLoginButton() {
    this.getSubmitButton().click()
  }

  /**
   * This methods can be used to login in LoginPage
   * 
   * @param {string} username 
   * @param {string} password
   * 
   * @example
   * userLogin('Tech', 'Global')
   */
  userLogin(username, password) {
    this.getUsernameField().type(username)
    this.getPasswordField().type(password)
    this.clickLoginButton()
  }
}

export default LoginPage