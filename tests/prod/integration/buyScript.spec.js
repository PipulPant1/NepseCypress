/// <reference types="cypress" />
import { buyshare } from '../pom/index'

context('My First Test', () => {
    it('Buy Share At -10% Circuit ', () => {
        buyshare.visitLoginPage()
        //Enter Captcha in the Website
        buyshare.waitForCaptchaTime()
        //Entering the Nepse,ID,Password only
        buyshare.enterIDPassonly()
        // Redirecting to market depth
        buyshare.visitMarketDepth()
        //Searching for the stock in the market depth
        buyshare.searchStockMarketDepth()
        //Extracting the today's LTP price
        buyshare.extract_LTP_buyShare()
    })
})
