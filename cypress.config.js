const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // URL base de nuestra aplicación (Swag Labs)
    baseUrl: 'https://www.saucedemo.com',
    // Patrón para encontrar nuestros archivos de prueba
    specPattern: 'cypress/e2e/**/*.cy.js',
    // Deshabilitamos video por defecto (lo activaremos luego)
    video: false,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // listeners
    },
  },
});
