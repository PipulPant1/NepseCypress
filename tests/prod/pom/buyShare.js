/// <reference types="cypress" />
//Generating the constant for the NEPSE
const tmsURL = Cypress.config().baseUrl // => "laura.dev"
const username = Cypress.env('username') // => "laura.dev"
const password = Cypress.env('password') // => "laura.dev"Cypress.env('login_url') // '/login'
const StockName = 'SPC'
const StockQuantity = '10'
export default class buyShare {
    //Generating the constant for the NEPSE
    visitLoginPage(page = 'list') {
        //vsit the tms website
        cy.visit(tmsURL, { timeout: 30000 })
    }
    //visiting the market depth
    visitMarketDepth() {
        // Redirecting to market depth
        cy.visit(`${tmsURL + '/tms/me/stockQuoteScreenComponent'}`, {
            timeout: 10000,
        })
    }
    visitBuySellShare() {
        //redirect to buy sell order management
        cy.visit(`${tmsURL + '/tms/me/memberclientorderentry'}`)
    }

    enterIDPassonly() {
        cy.get('input[placeholder="Client Code/ User Name"]').type(username)
        cy.get('input[placeholder="Password"]').type(password)
        cy.wait(10000)
        cy.get('input[value="Login"]').click()
        cy.wait(5000)
    }
    waitForCaptchaTime() {
        cy.wait(10000)
    }
    clickBuyToggleButton() {
        //Switching to the buy mode
        cy.get('label[class="xtoggler-btn-wrapper"]').last().click()
    }
    //search share in Market Depth
    searchStockMarketDepth() {
        //Searching for the stock in the market depth
        cy.get('input[role="combobox"]', { timeout: 10000 }).type(StockName)
        //Clicking in the in search result
        cy.get('.ng-option-label')
        cy.get('.ng-option-label').click()
    }
    takeCaptchScreenshot() {
        //Take screenshot of the Captcha
        cy.get('.row > .form-control').screenshot('./')
    }
    enterValidBuySell() {
        //Entering the stock name
        cy.get('.order__form--name > .form-control').type(StockName)
        cy.get('.dropdown > .dropdown-item > span').click()
        //Entering the stock  buy amount
        cy.get('.order__form--price > .form-control').type(
            generate_minus10buy_amount
        )
        cy.get('.order__form--qty > .form-control').type(StockQuantity)
    }
    closeErrorPopoup() {
        cy.get('.close-button')
    }
    clearBuyPageInputs() {
        //Clearing the input fields
        cy.get('.order__form--name > .form-control').clear()
        //Entering the stock  buy amount
        cy.get('.order__form--price > .form-control').clear()
        //Entering the stock quantity
        cy.get('.order__form--qty > .form-control').clear()
    }
    clickBuyButton() {
        //Clicking the buy amount
        cy.get('button[class="btn btn-sm btn-primary"]').click()
    }
    extract_LTP_buyShare() {
        cy.get('.market__depth__general-info > tbody > :nth-child(3) > td', {
            timeout: 10000,
        })
            .invoke('text')
            .then((div) => {
                const generate_minus10buy_amount = div - div * 0.1
                //redirect to buy sell order management
                this.visitBuySellShare()
                //Verify User is redirected to buy sell page
                cy.get('.box', { timeout: 10000 }).should('be.visible')
                //Switching to the buy mode
                this.clickBuyToggleButton()
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
                        this.enterValidBuySell()
                        cy.get('.toast-title')
                            .invoke('text')
                            .then((toast_title) => {
                                cy.log(toast_title)
                                if (toast_title == 'Error') {
                                    this.closeErrorPopoup()
                                    this.clearBuyPageInputs()
                                } else {
                                    //Entering the stock name
                                    this.enterValidBuySell()
                                    //Clicking the buy amount
                                    this.clickBuyButton()
                                    //Clearing the input fields
                                    this.clearBuyPageInputs()
                                }
                            })
                    }
                } catch {}
            })
    }
}
