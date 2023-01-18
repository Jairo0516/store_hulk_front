describe('<Home />', () => {

  it('Flujo Carrito', () => {
    cy.visit('localhost:3000')
    cy.wait(2000)
    cy.get('[data-cy=see_more_0]').click()
    cy.wait(2000)
    cy.get('[data-cy=add_to_cart]').click()
    cy.wait(2000)
    cy.get('[data-cy=open_cart]').click()
    cy.wait(2000)
    cy.get('[data-cy=end_checkout]').click()
    cy.wait(2000)
    cy.end()
  })
})
