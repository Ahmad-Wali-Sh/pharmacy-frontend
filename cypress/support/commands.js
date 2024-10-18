Cypress.Commands.add('login', (username, password) => {
        cy.visit('/')
        cy.get('.login').should('exist')
        cy.get("input[name='username']").type(username)
        cy.get("input[name='password']").type(password)
        cy.get("button[class='login__submit']").click()
        cy.get("div[class='header']").should('exist')
        cy.get("div[class='navbar']").should('exist')
})