import { browser, $, expect } from '@wdio/globals';

describe('Gremlins.js - Ataque de Alta Velocidad', () => {

    it('Debe resistir el ataque de una horda de Gremlins', async () => {
        
        // 1. PREPARACIÓN (Login)
        await browser.maximizeWindow();
        await browser.url('/');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        // 2. INYECCIÓN DEL SCRIPT (El Caballo de Troya)
        // Ejecutamos JS puro dentro del navegador para cargar la librería desde internet
        console.log('Inyectando Gremlins.js desde CDN...');
        
        await browser.execute(() => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/gremlins.js';
            document.body.appendChild(script);
        });

        // 3. ESPERA ACTIVA
        // Esperamos a que la variable global 'gremlins' exista en la ventana del navegador
        await browser.waitUntil(async () => {
            return await browser.execute(() => !!window.gremlins);
        }, {
            timeout: 5000,
            timeoutMsg: 'Los Gremlins no llegaron a tiempo (Error de carga)'
        });

        console.log('Gremlins cargados. ¡Liberando a la horda!');

        // 4. EJECUCIÓN DEL ATAQUE (Async)
        // Usamos executeAsync porque unleash() devuelve una Promesa y queremos esperar a que termine
        await browser.executeAsync((done) => {
            
            // Configuración de la Horda
            window.gremlins.createHorde({
                species: [
                    window.gremlins.species.clicker(), // Hace clicks
                    window.gremlins.species.formFiller(), // Llena inputs
                    window.gremlins.species.scroller() // Hace scroll
                ],
                mogwais: [
                    window.gremlins.mogwais.alert(), // Evita que los alerts bloqueen el test
                    window.gremlins.mogwais.fps() // Monitorea los cuadros por segundo
                ],
                strategies: [
                    // Estrategia de distribución: ataca todo lo que ve
                    window.gremlins.strategies.distribution() 
                ]
            })
            .unleash({
                nb: 100, // Número total de ataques (acciones)
                delay: 10 // Milisegundos entre ataques (¡Muy rápido!)
            })
            .then(() => {
                console.log('Ataque terminado.');
                done(); // Avisamos a WDIO que terminó
            });
        });

        // 5. EVALUACIÓN DE DAÑOS
        // Si llegamos aquí, la app no crasheó totalmente.
        const currentUrl = await browser.getUrl();
        console.log(`El navegador sobrevivió. URL final: ${currentUrl}`);
        
        // Verificamos que no nos hayan sacado de la app
        await expect(browser).toHaveUrl(/inventory/);

    }, 60000);
});
