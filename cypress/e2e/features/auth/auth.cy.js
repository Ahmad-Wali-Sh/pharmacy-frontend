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
    cy.contains("credentials").click();
  });
});
