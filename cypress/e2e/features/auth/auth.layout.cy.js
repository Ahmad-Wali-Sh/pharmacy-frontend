describe("Login Page Responsiveness", () => {

    it("Desktop Viewport", () => {
      cy.viewport(1280, 720); 
      cy.visit("/login");
      cy.get(".container").should("be.visible");
      cy.get(".screen").should("be.visible");
      cy.get(".login").should("be.visible");
      cy.get("input[name='username']").should("be.visible")
      cy.get("input[name='password']").should("be.visible")
      cy.get("button[class='login__submit']").should("be.visible")
    });
  
    it("Mobile Viewport", () => {
      cy.viewport('iphone-6'); 
      cy.visit("/login");
      cy.get(".screen").should("be.visible");
      cy.get(".container").should("be.visible");
      cy.get(".login").should("be.visible");
      cy.get("input[name='username']").should("be.visible")
      cy.get("input[name='password']").should("be.visible")
      cy.get("button[class='login__submit']").should("be.visible")
    });
  
    it("Tablet Viewports", () => {
      cy.viewport('ipad-2');
      cy.visit("/login");
      cy.get(".screen").should("be.visible");
      cy.get(".container").should("be.visible");
      cy.get(".login").should("be.visible");
      cy.get("input[name='username']").should("be.visible")
      cy.get("input[name='password']").should("be.visible")
      cy.get("button[class='login__submit']").should("be.visible")
    });
  });