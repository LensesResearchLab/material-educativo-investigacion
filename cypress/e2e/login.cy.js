// Importamos el Page Object
import { loginPage } from '../support/pages/LoginPage';

describe('Swag Labs - Login Tests (Refactorizado)', () => {

  // Hook: Se ejecuta antes de cada test (it)
  beforeEach(() => {
    // Cargamos el JSON y lo guardamos en el alias 'users'
    cy.fixture('users').as('users');
    // Siempre visitamos la página antes de testear
    loginPage.visit();
  });

  it('TC-01: Login Exitoso con usuario estándar', function() {
    // Nota: Usamos 'function()' en lugar de '() =>' para poder acceder a 'this'
    const user = this.users.standard;

    // Acción: Usamos el método de alto nivel del POM
    loginPage.login(user.username, user.password);

    // Aserción: Verificamos que entramos al inventario
    cy.url().should('include', '/inventory.html');
  });

  it('TC-02: Validación de Usuario Bloqueado', function() {
    const user = this.users.locked;

    // Acción
    loginPage.login(user.username, user.password);

    // Aserción: Verificamos el mensaje de error usando el getter del POM
    loginPage.errorMessage
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out.');
  });
});
