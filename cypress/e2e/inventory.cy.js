import { loginPage } from '../support/pages/LoginPage';

describe('Swag Labs - Inventory Tests', () => {

  beforeEach(() => {
    cy.fixture('users').as('users');
    loginPage.visit();
  });

  // Este test pasará
  it('Debe mostrar la lista de productos', function() {
    loginPage.login(this.users.standard.username, this.users.standard.password);
    cy.get('.inventory_list').should('be.visible');
  });

  // Este test FALLARÁ INTENCIONALMENTE
  it('Debe encontrar un Iphone 15 (Fallo esperado)', function() {
    loginPage.login(this.users.standard.username, this.users.standard.password);

    // Intentamos buscar un elemento que no existe
    // Cypress esperará 4 segundos (default timeout) y fallará.
    cy.contains('.inventory_item_name', 'Iphone 15 Pro Max')
      .should('be.visible');
  });

});
