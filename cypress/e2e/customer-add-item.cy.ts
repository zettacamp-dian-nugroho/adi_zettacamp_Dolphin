describe('authentication', () => {
  it('login', () => {
    cy.visit('http://localhost:4200/')
    cy.wait(1000)
    cy.get('[data-cy="input-name"]').type('adi')
    cy.wait(1000)
    cy.get('[data-cy="input-password"]').type('koknanya?')
    cy.wait(1000)
    cy.get('[data-cy="btn-login"]').click()
    cy.wait(1500)
    cy.get(':nth-child(1) > .card-body > [data-cy="btn-add-menu-item-to-cart"]').click()
    cy.wait(1500)
    cy.get(':nth-child(2) > .card-body > [data-cy="btn-add-menu-item-to-cart"]').click()
    cy.wait(1000)
    cy.scrollTo(0, 200)
    cy.wait(1000)
    cy.scrollTo(0, 250)
    cy.wait(1000)
    cy.scrollTo(0, 300)
    cy.wait(1500)
    cy.get(':nth-child(3) > .card-body > [data-cy="btn-add-menu-item-to-cart"]').click()
    cy.wait(1500)
    cy.get(':nth-child(4) > .card-body > [data-cy="btn-add-menu-item-to-cart"]').click()
    cy.wait(1000)
    cy.get('[data-cy="btn-checkout"]').click()
    cy.wait(1000)
    cy.scrollTo(0, 200)
    cy.wait(1000)
    cy.scrollTo(0, 150)
    cy.wait(1000)
    cy.scrollTo(0, 100)
    cy.wait(1000)
    cy.scrollTo(0, 0)
    cy.wait(3000)
    cy.get('[data-cy="btn-logout"]').click()
  })
})
