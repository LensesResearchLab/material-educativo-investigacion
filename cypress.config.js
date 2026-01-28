const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    chromeWebSecurity: false,

    // --- Configuración de Debugging y Estabilidad ---

    // 1. Habilitamos video para ver la repetición de la jugada
    video: true,
    // Comprimimos el video para que no ocupe mucho espacio (0 a 51)
    videoCompression: 32,

    // 2. Screenshots: Por defecto es true al fallar, pero lo explicitamos
    screenshotOnRunFailure: true,

    // 3. Retries: Reintentar pruebas fallidas para evitar 'Flakiness'
    retries: {
      runMode: 1, // En CLI (Headless): reintenta 1 vez extra
      openMode: 0 // En GUI (Local): no reintentar, quiero ver el error ya
    },

    setupNodeEvents(on, config) {
      // Listeners de eventos
    },
  },
});
