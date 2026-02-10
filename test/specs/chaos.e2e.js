describe('Chaos Monkey - Fase de Calentamiento', () => {
    
    it('Debe abrir la aplicación y preparar el entorno', async () => {
        // 1. Preparamos la viewport
        // Maximizar asegura que todos los elementos sean visibles y clickeables
        await browser.maximizeWindow();

        // 2. Navegación
        // Usamos '/' porque ya definimos la baseUrl en el archivo de config
        await browser.url('/');

        // 3. Verificación de Estado
        // Antes de soltar al mono, confirmamos que la app está viva
        const title = await browser.getTitle();
        if (title !== 'Swag Labs') {
             throw new Error('La aplicación no cargó correctamente. Abortando misión.');
        }

        console.log('Conexión establecida: El objetivo "Swag Labs" ha sido localizado.');
        
        // Pausa didáctica para observar el resultado (evitar en producción)
        await browser.pause(2000);
    });

});
