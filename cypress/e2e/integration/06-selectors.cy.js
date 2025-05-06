/// <reference types="cypress"/>

describe("Cypress Selectors", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend");
  });

  it("Practice Web Elements using - get() and contains()", () => {
    cy.get(".CardGrids_CardGrids__qDdyI").as("allCards");

    cy.get("@allCards");

    // Handling multiple elements

    // Returns the first element
    cy.get(".card").first();

    // Returns the last element
    cy.get(".card").last();

    // Target the specific index of an element
    cy.get(".card").eq(8)

    // Locates the web element by its VISUAL text on the GUI
    cy.contains('HTML Elements')

    cy.contains('Elements')

    // This one tries to find element with "HTML Elements" visible text inside the web element
    // using .card class name
    cy.contains('.card', 'HTML Elements')

    // This will do the same thing as above locator in more explicit way
    // It will look for card with "HTML Elements" visible text only inside the class name
    // @allCards => .CardGrids_CardGrids__qDdyI
    cy.get('@allCards').contains('HTML Elements')
  });

  it('Practice Web Elements using - find()', () => {
    cy.contains('.card', 'HTML Elements').click()

    cy.get('#radio-button-group').find('div')

    cy.get('#radio-button-group div')
  })

  it('Practice Web Elements using - Siblings, Parent and Child', () => {
    cy.contains('.card', 'HTML Elements').click()


    // next()         => Locates the immediate next sibling of a web element
    cy.get('div').contains('Paragraphs').next()

    // nextAll()      => Locates the ALL immediate next siblings of a web element
    cy.get('div').contains('Paragraphs').nextAll()


    // prev()         => Locates the immediate previous sibling of a web element
    cy.get('#testing_paragraph').prev()

    // prevAll()      => Locates the ALL immediate previous siblings of a web element
    cy.get('#testing_paragraph').prevAll()

    // Locates the immediate parent of a web element
    cy.get('#testing_paragraph').parent()

    // Locates one of the parents of a web element
    cy.get('#testing_paragraph').parents('.HtmlElements_mainContainer__Fpn6M')
    cy.get('#testing_paragraph').parents('.SubPageLayout_subpageContent__3aNg7')


    // Locates untill the specific parent
    cy.get('#testing_paragraph').parentsUntil('.SubPageLayout_wrapper__hs6Iw')

    cy.get('[data-identifier="Paragraphs"]').children()

    cy.get('#apple_check')
    .parents('#checkbox-button-group')
    .next()
    .find('div')
    .children()
    .find('input')
    .parent()
    .parent()
    .parent()
    .prev()
  })
  
});