describe("Authentication Test-Cases", () => {
  it("Authentication Pass", () => {
    cy.login("admin", "123456");
  });

  it("Server Down Handle", () => {
    cy.intercept("GET", `${Cypress.env('backendUrl')}/api/`, {
      statusCode: 500,
      body: {},
    }).as("getConfig");

    cy.visit("/login", {
      failOnStatusCode: false,
    });

    cy.wait("@getConfig");
    cy.contains("404");
    cy.get("button").click();
    cy.contains("message");
  });

  it("Invalid Crediantials Handle", () => {
    cy.visit("/");
    cy.get(".login").should("exist");
    cy.get("input[name='username']").type("wrongUser");
    cy.get("input[name='password']").type("wrongPass");
    cy.get("button[class='login__submit']").click();
    cy.get("#error-toast").click();
    cy.contains(/unauthorized/i).click();
  });

  it("Log-Out Handle", () => {
    cy.login("admin", "123456");
      cy.get('.log-out-button').click()
      cy.get("input[name='username']")
      cy.get("input[name='password']")
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  })

  it("Refresh Page Handle", () => {
    cy.login('admin', '123456')
    cy.get('.log-out-button')
    cy.visit('/')
    cy.get("input[name='username']")
    cy.get("input[name='password']")
    cy.visit('/sell')
    cy.get("input[name='username']")
    cy.get("input[name='password']")
  })
});
