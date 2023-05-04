import Alert from '../Alert.vue'

describe('Alert', () => {
  it('playground', () => {
    cy.mount(Alert, { props: { mesage: 'Hello Cypress' } })
  })

  it('renders properly', () => {
    cy.mount(Alert, { props: { mesage: 'Hello Cypress' } })
    cy.get('span.message').should('contain', 'Hello Cypress')
  })
})
