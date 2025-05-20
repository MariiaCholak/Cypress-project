
/// <reference types="cypress"/>

describe('understanding of frontend automation, specifically in the context of form submission and date-picking processes. ', () => {
    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/booking')
    })
    /*
Navigate to https://techglobal-training.com/frontend/booking
+Validate that the “One way” radio button is displayed enabled and selected by default
+Validate that the “Round trip” radio button is displayed enabled and not selected by default
+validate that the “Cabin Class” label and dropdown are displayed
+Validate that the “From” label and dropdown are displayed
+Validate that the “To” label and dropdown are displayed
+Validate that the “Depart” label and date picker is displayed
+Validate that the “Return” label and date picker is displayed and disabled
+Validate that the “Number of passengers” label and dropdown are displayed and 1 is the default
+Validate that the “Passenger 1” category label and dropdown are displayed and “Adult (16-64)” is the default
+Validate that the “BOOK” button is displayed and enabled
    */

    it('Test Case 01 - Validate default state of the booking form', () => {

        const typeTrip = [{
            label: 'One way',
            checked: true     /// we choose 
        },
        {
            label: 'Round trip',
            checked: false
        }]

        cy.get("div[class='field']").each((ele) => {
            cy.wrap(ele).should('be.visible')
            cy.wrap(ele).within(() => {
                cy.get('label').should('be.visible')
                cy.get('select, input').should('be.visible')
            })
        })


        cy.get('[type="radio"]').each((el, index) => {
            cy.wrap(el).should('be.enabled')   // we check that 2 buttons are enable
            if (typeTrip[index].checked) {
                cy.wrap(el).should('be.checked')
            } else {
                cy.wrap(el).should('not.be.checked')
            }
        })
        /// return
        cy.get('input[placeholder="MM/DD/YY"]').eq(1).should('be.disabled')

        //dropdown w default
        cy.contains('Number of passengers').parent().find('select').should('have.value', '1')

        cy.contains('Passenger 1').parent().find('select').should('have.value', 'Adult (16-64)')

        ///Book
        cy.get('button[type="submit"]').should('be.visible').and('be.enabled')

    })


    /*
  Test Case 02 - Validate the Book your trip form when Round trip is selected
Navigate to https://techglobal-training.com/frontend/booking
Click on the “Round trip” radio button and validate it is selected
Validate that the “One way” radio button is not selected
Validate that the “Cabin Class” label and dropdown are displayed
Validate that the “From” label and dropdown are displayed
Validate that the “To” label and dropdown are displayed
Validate that the “Depart” label and date picker is displayed
Validate that the “Return” label and date picker is displayed
Validate that the “Number of passengers” label and dropdown are displayed and 1 is the default
Validate that the “Passenger 1” label and dropdown are displayed and “Adult (16-64)” is the default
Validate that the “BOOK” button is displayed and enabled

  */

    it('Validate the Book your trip form when Round trip is selected', () => {
        cy.get('[type="radio"]').eq(1).click()

        const typeTrip = [{
            label: 'One way',
            checked: false    /// we choose 
        },
        {
            label: 'Round trip',
            checked: true
        }]
        cy.get('[type="radio"]').each((el, index) => {
            if (typeTrip[index].checked) {
                cy.wrap(el).should('be.checked')
            } else {
                cy.wrap(el).should('not.be.checked')
            }
        })

        cy.get("div[class='field']").each((ele) => {
            cy.wrap(ele).should('be.visible')
            cy.wrap(ele).within(() => {
                cy.get('label').should('be.visible')
                cy.get('select, input').should('be.visible')
            })
            //dropdown w default
            cy.contains('Number of passengers').parent().find('select').should('have.value', '1')

            cy.contains('Passenger 1').parent().find('select').should('have.value', 'Adult (16-64)')

            ///Book
            cy.get('button[type="submit"]').should('be.visible').and('be.enabled')

        })
    })


    /*
             Navigate to https://techglobal-training.com/frontend/booking
    Select the “One way” radio button
    Select “Business” for the “Cabin Class” dropdown
    Select “Illinois” for the “From” dropdown
    Select “Florida” for the “To” dropdown
    Select the next week for the ”Depart”
    Select “1” for the “Number of passengers” dropdown
    Select “Senior (65+)” for the Passenger 1 dropdown
    Click on the “BOOK” button
    Validate the booking information displayed below
    DEPART
    IL to FL
    {dynamic date}
    Number of passengers: 1
    Passenger 1: Senior (65+)
    Cabin Class: Business
    */
    it('Validate the Book your trip form when Round trip is selected', () => {
        cy.get('[type="radio"]').eq(0).check()

        const selectors = ["Business", "Illinois", "Florida", "1", 'Senior (65+)']
        cy.get('div select').each((ele, index) => {
            cy.wrap(ele).select(selectors[index])
        })

        const nextWeek = new Date();    ///Створюється змінна nextWeek, яка містить сьогоднішню дату.
        nextWeek.setDate(nextWeek.getDate() + 7);
        //         Метод getDate() отримує поточне число місяця (наприклад, 20).
        // + 7 — додаємо 7 днів (тобто наступний тиждень).
        // setDate() оновлює об’єкт nextWeek.

        const formattedDate = `${(nextWeek.getMonth() + 1).toString().padStart(2, '0')}/${nextWeek.getDate().toString().padStart(2, '0')}/${nextWeek.getFullYear().toString().slice(-2)}`;
        //           getMonth() + 1 — JavaScript рахує місяці з 0 (січень — 0, грудень — 11), тому додаємо 1.
        // .toString().padStart(2, '0') — додає 0 спереду, якщо число менше 10 (наприклад, 5 → 05).
        // getFullYear().toString().slice(-2) — витягує останні 2 цифри року (2025 → 25).
        // В результаті маємо строку у форматі MM/DD/YY, як вимагає поле.


        cy.get('input[placeholder="MM/DD/YY"]').eq(0).clear().type(formattedDate);
        //         clear() — очищає поле перед вводом.
        // .type(formattedDate) — вводить згенеровану дату (наприклад, 05/27/25).

        cy.get('button[type="submit"]').click()

        const nextWeek1 = new Date();
        nextWeek1.setDate(nextWeek1.getDate() + 7);
        const formattedDate1 = nextWeek1.toDateString();


        const expectedTexts = ['DEPART', 'IL to FL', formattedDate1, 'Number of Passengers: 1', 'Passenger 1: Senior (65+)', 'Cabin class: Business'];

        cy.get('.ml-3').last().should('be.visible').then(form => {
            expectedTexts.forEach(text => {
                expect(form.text()).to.include(text)
            })
        })



    })

    it('Test Case 04 - Validate the booking for 1 passenger and round trip', () => {
        cy.get('[type="radio"]').eq(1).check()


        const selectors = ["First", "California", "Illinois", "1", 'Adult (16-64)']
        cy.get('div select').each((ele, index) => {
            cy.wrap(ele).select(selectors[index])
        })

        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);

        const formattedDate = `${(nextWeek.getMonth() + 1).toString().padStart(2, '0')}/${nextWeek.getDate().toString().padStart(2, '0')}/${nextWeek.getFullYear().toString().slice(-2)}`;

        cy.get('input[placeholder="MM/DD/YY"]').eq(0).clear().type(formattedDate);


        const today = new Date();
        const nextMonth = new Date(today);

        //// Збільшуємо місяць на 1
        nextMonth.setMonth(today.getMonth() + 1);

        const formattedMonth = `${(nextMonth.getMonth() + 1).toString().padStart(2, '0')}/${nextMonth.getDate().toString().padStart(2, '0')}/${nextMonth.getFullYear().toString().slice(-2)}`;

        cy.get('input[placeholder="MM/DD/YY"]').eq(1).clear().type(formattedMonth);

        cy.get('button[type="submit"]').click()

        const nextWeek1 = new Date();
        nextWeek1.setDate(nextWeek1.getDate() + 7);
        const formattedDate1 = nextWeek1.toDateString();

        const nextMonth1 = new Date();
        nextMonth1.setMonth(nextMonth1.getMonth() + 1);
        const formattedMonth1 = nextMonth1.toDateString();


        const expectedTexts = ['DEPART', 'CA to IL', formattedDate1, 'Number of Passengers: 1', 'Passenger 1: Adult (16-64)', 'Cabin class: First', 'RETURN', 'IL to CA', formattedMonth1];

        cy.get('.ml-3').last().should('be.visible').then(form => {
            expectedTexts.forEach(text => {
                expect(form.text()).to.include(text)
            })
        })
    })

    it('Test Case 05 - Validate the booking for 2 passengers and one way', () => {
        cy.get('[type="radio"]').eq(0).check()


        const selectors = ["Premium Economy", "New York", "Texas", "2"]
        cy.get('div select').each((ele, index) => {
            if (index < selectors.length)
                cy.wrap(ele).select(selectors[index])
        })

        const passengers = ['Adult (16-64)', 'Child (2-11)']
        passengers.forEach((passengerType, i) => {
            cy.get('div select').eq(i + selectors.length).select(passengerType);
        });

        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 1);

        const formattedDate = `${(nextWeek.getMonth() + 1).toString().padStart(2, '0')}/${nextWeek.getDate().toString().padStart(2, '0')}/${nextWeek.getFullYear().toString().slice(-2)}`;

        cy.get('input[placeholder="MM/DD/YY"]').eq(0).clear().type(formattedDate);

        cy.get('button[type="submit"]').click()

        const nextWeek1 = new Date();
        nextWeek1.setDate(nextWeek1.getDate() + 1);
        const formattedDate1 = nextWeek1.toDateString();

        const expectedTexts = ['DEPART', 'NY to TX', formattedDate1, 'Number of Passengers: 2', 'Passenger 1: Adult (16-64)', 'Passenger 2: Child (2-11)', 'Cabin class: Premium Economy'];

        cy.get('.ml-3').last().should('be.visible').then(form => {
            expectedTexts.forEach(text => {
                expect(form.text()).to.include(text)
            })
        })
    })
})
