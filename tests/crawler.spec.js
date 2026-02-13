import { test } from '@playwright/test';
import { Ripper } from '../src/Ripper';

test.describe('Systematic Exploration', () => {

  test('Debe mapear la aplicación completa (BFS) post-login', async ({ page, baseURL }) => {
    // Aumentamos el timeout del test específicamente
    test.setTimeout(120000); 

    // Instanciamos nuestro bot explorador
    const ripper = new Ripper(page, baseURL);

    // 1. Rompemos la seguridad
    await ripper.login();

    // 2. Liberamos al Kraken en zona segura
    await ripper.start();
  });

});
