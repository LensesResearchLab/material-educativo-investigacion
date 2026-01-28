const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Definimos el reporter que acabamos de instalar
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,           // Muestra gráficos de torta (Pass/Fail)
    reportPageTitle: 'Reporte de Pruebas SwagLabs',
    embeddedScreenshots: true, // ¡Vital! Mete la foto del error dentro del HTML
    inlineAssets: true,     // Crea un solo archivo HTML (sin carpetas CSS externas)
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    chromeWebSecurity: false,
    video: false, // Apagamos video para este ejemplo (el reporter usa screenshots)
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      // Aquí registramos el plugin del reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
