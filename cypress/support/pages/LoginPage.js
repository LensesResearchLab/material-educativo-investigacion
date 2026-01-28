class LoginPage {
  // --- Selectores (Getters) ---
  // Centralizamos los localizadores aquí.
  get usernameInput() { return cy.get('[data-test="username"]'); }
  get passwordInput() { return cy.get('[data-test="password"]'); }
  get loginButton() { return cy.get('[data-test="login-button"]'); }
  get errorMessage() { return cy.get('[data-test="error"]'); }

  // --- Acciones (Métodos de Negocio) ---

  // Método modular para navegar
  visit() {
    cy.visit('/');
  }

  // Método atómico para escribir credenciales
  fillCreds(username, password) {
    this.usernameInput.clear().type(username);
    this.passwordInput.clear().type(password);
  }

  // Método atómico para clickear
  submit() {
    this.loginButton.click();
  }

  // Método Agrupado (Helper): Realiza todo el flujo de login
  login(username, password) {
    this.fillCreds(username, password);
    this.submit();
  }
}

// Exportamos una instancia de la clase para no tener que hacer 'new' en cada test
export const loginPage = new LoginPage();
