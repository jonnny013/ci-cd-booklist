describe('Book List', () => {
  beforeEach(() => {
    cy.visit('')
  })
  it('main page has correct text', () => {
    cy.contains('Login')
    cy.contains('中文')
    cy.contains('Authors')
    cy.contains('Books')
  })
  it('main page has correct text', () => {
    cy.contains('中文').click()
    cy.contains('English')
    cy.contains('登入')
  })
})