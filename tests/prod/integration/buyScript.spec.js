/// <reference types="cypress" />

context('My First Test', () => {
    it('C393424| Verify Trivia API ', () => {
        const StockName = 'SPC'
        const StockQuantity = '10'
        //Generating the constant for the NEPSE
        const tmsURL = Cypress.config().baseUrl // => "laura.dev"
        const username = Cypress.env('username') // => "laura.dev"
        const password = Cypress.env('password') // => "laura.dev"Cypress.env('login_url') // '/login'
        //vsit the tms website
        cy.visit(tmsURL, { timeout: 30000 })
        //Take screenshot of the Captcha
        //cy.get('.row > .form-control').screenshot('./')
        cy.get('input[placeholder="Client Code/ User Name"]').type(username)
        cy.get('input[placeholder="Password"]').type(password)
        cy.wait(10000)
        cy.get('input[value="Login"]').click()
        cy.wait(5000)

        // Redirecting to market depth
        cy.visit(`${tmsURL + '/tms/me/stockQuoteScreenComponent'}`, {
            timeout: 10000,
        })
        //Searching for the stock in the market depth
        cy.get('input[role="combobox"]', { timeout: 10000 }).type(StockName)
        //Clicking in the in search result
        cy.get('.ng-option-label')
        cy.get('.ng-option-label').click()
        //Extracting the today's LTP price
        cy.get('.market__depth__general-info > tbody > :nth-child(3) > td', {
            timeout: 10000,
        })
            .invoke('text')
            .then((div) => {
                const generate_minus10buy_amount = div - div * 0.1
                cy.log(generate_minus10buy_amount)

                //redirect to buy sell order management
                cy.visit(`${tmsURL + '/tms/me/memberclientorderentry'}`)
                //Verify User is redirected to buy sell page
                cy.get('.box', { timeout: 10000 }).should('be.visible')
                //Switching to the buy mode
                cy.get('label[class="xtoggler-btn-wrapper"]').last().click()
                //Scrolling to the Top elements
                cy.scrollTo('top')
                cy.scrollTo('top')
                //Checking if the box is visible or not
                cy.get('.box-order-entry').should('be.visible')
                //Checking if the session is continuous or not
                cy.get(':nth-child(1) > fieldset').should(
                    'have.text',
                    ' Continuous '
                )
                try {
                    for (let i = 0; i < 3600; i++) {
                        cy.log(`${i} Trail`)
                        //Entering the stock name
                        cy.get('.order__form--name > .form-control').type(
                            StockName
                        )
                        cy.get('.dropdown > .dropdown-item > span').click()
                        //Entering the stock  buy amount
                        cy.get('.order__form--price > .form-control').type(
                            generate_minus10buy_amount
                        )
                        cy.get('.order__form--qty > .form-control').type(
                            StockQuantity
                        )
                        cy.get('.toast-title')
                            .invoke('text')
                            .then((toast_title) => {
                                cy.log(toast_title)
                                if (toast_title == 'Error') {
                                    cy.get('.close-button')
                                    //Clearing the input fields
                                    cy.get(
                                        '.order__form--name > .form-control'
                                    ).clear()
                                    //Entering the stock  buy amount
                                    cy.get(
                                        '.order__form--price > .form-control'
                                    ).clear()
                                    //Entering the stock quantity
                                    cy.get(
                                        '.order__form--qty > .form-control'
                                    ).clear()
                                } else {
                                    //Entering the stock name
                                    cy.get(
                                        '.order__form--name > .form-control'
                                    ).type(StockName)
                                    cy.get(
                                        '.dropdown > .dropdown-item > span'
                                    ).click()
                                    //Entering the stock  buy amount
                                    cy.get(
                                        '.order__form--price > .form-control'
                                    ).type(generate_minus10buy_amount)
                                    //Entering the stock quantity
                                    cy.get(
                                        '.order__form--qty > .form-control'
                                    ).type(StockQuantity)
                                    //Clicking the buy amount
                                    cy.get(
                                        'button[class="btn btn-sm btn-primary"]'
                                    ).click()

                                    //Clearing the input fields
                                    cy.get(
                                        '.order__form--name > .form-control'
                                    ).clear()
                                    //Entering the stock  buy amount
                                    cy.get(
                                        '.order__form--price > .form-control'
                                    ).clear()
                                    //Entering the stock quantity
                                    cy.get(
                                        '.order__form--qty > .form-control'
                                    ).clear()
                                }
                            })
                    }
                } catch {}
            })
    })
})
