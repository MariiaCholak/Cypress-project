
import BasePage from './BasePage'

class TablesPage extends BasePage {
  /* Methods */

  getCompanyTableHeaders() {
    return cy.get('.header')
  }

}

export default TablesPage
