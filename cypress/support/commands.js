// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
import 'cypress-file-upload'

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Screenshot.defaults({
    overwrite: true,
})
Cypress.Commands.add('forceVisit', (url) => {
    cy.get('body').then((body$) => {
        const appWindow = body$[0].ownerDocument.defaultView
        const appIframe = appWindow.parent.document.querySelector('iframe')

        // We return a promise here because we don't want to
        // continue from this command until the new page is
        // loaded.
        return new Promise((resolve) => {
            appIframe.onload = () => resolve()
            appWindow.location = url
        })
    })
})
