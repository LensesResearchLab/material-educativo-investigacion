describe('Swag Labs - Smoke Test', () => {
  it('Debe cargar la página de inicio correctamente', () => {
    cy.visit('/'); // Usa la baseUrl configurada
    cy.title().should('eq', 'Swag Labs');
    cy.log('La página cargó correctamente');
  });
});
