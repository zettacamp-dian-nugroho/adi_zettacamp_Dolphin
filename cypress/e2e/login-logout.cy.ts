describe('try login and logout spec', () => {
  it('should be visited', () => {
    cy.visit('http://localhost:4200/')
    cy.wait(1000)
    cy.get('[data-cy="input-name"]').type('adi')
    cy.wait(1000)
    cy.get('[data-cy="input-password"]').type('koknanya?')
    cy.wait(1000)
    cy.get('[data-cy="btn-login"]').click()
    cy.wait(1500)
    cy.scrollTo(0, 50)
    cy.wait(1500)
    cy.scrollTo(0, 100)
    cy.wait(1500)
    cy.scrollTo(0, 150)
    cy.wait(1500)
    cy.scrollTo(0, 200)
    cy.wait(1500)
    cy.scrollTo(0, 250)
    cy.wait(1500)
    cy.scrollTo(0, 300)
    cy.wait(1500)
    cy.scrollTo(0, 200)
    cy.wait(1500)
    cy.scrollTo(0, 150)
    cy.wait(1500)
    cy.scrollTo(0, 100)
    cy.wait(1500)
    cy.scrollTo(0, 0)
    cy.wait(2000)
    cy.get('[data-cy="btn-logout"]').click()
  })
})
