describe('Authentication Test', () => {
  it('passes', () => {
    cy.visit('http://172.21.192.1:3000/')
    cy.get('.login').should('exist')

    cy.get("input[name='username']").type('admin')
    cy.get("input[name='password']").type('123456')
    cy.get("button[class='login__submit']").click()
    cy.contains('خوش آمدید')
  })
})