import { Stagehand } from "@browserbasehq/stagehand";
import { StagehandConfig } from "../stagehand.config.js";

async function main() {
  console.log("Iniciando flujo de compra agéntico...");

  const stagehand = new Stagehand(StagehandConfig);

  try {
    await stagehand.init();
    const page = stagehand.context.activePage();
    if(!page) throw new Error("No hay página activa");

    await page.goto("https://www.saucedemo.com/");

    // 1. LOGIN (Ya dominado)
    console.log("Logueando...");
    await stagehand.act("Ingresa el usuario 'standard_user'");
    await stagehand.act("Ingresa la contraseña 'secret_sauce'");
    await stagehand.act("Click en el botón de Login");

    // 2. INTERACCIÓN COMPLEJA (Filtros)
    // Aquí la IA debe encontrar un dropdown, abrirlo y seleccionar una opción por su texto.
    console.log("Filtrando productos...");
    await stagehand.act("Cambia el filtro de productos para ordenar por 'Price (low to high)'");
    
    // Esperamos un segundo para ver visualmente el reordenamiento
    await page.waitForTimeout(1000);

    // 3. SELECCIÓN SEMÁNTICA
    // "Primer producto" es un concepto relativo visualmente.
    console.log("Agregando productos...");
    await stagehand.act("Agrega el primer producto de la lista al carrito haciendo click en su botón 'Add to cart'");
    
    // Esperamos un poco para que se actualice el contador
    await page.waitForTimeout(500);
    
    // Búsqueda específica por contenido
    await stagehand.act("Encuentra el producto llamado 'Sauce Labs Onesie' y agrega al carrito");

    // 4. NAVEGACIÓN POR ICONOS
    // Swag Labs tiene un icono de carrito, no siempre dice "Cart".
    // La IA infiere que el icono representa el carrito.
    console.log("Yendo al carrito...");
    await stagehand.act("Navega al carrito haciendo click en el ícono del carrito que está en la barra de navegación superior");

    // 5. CHECKOUT
    console.log("Iniciando checkout...");
    await stagehand.act("En la página del carrito, haz click en el botón 'Checkout'");

    // Validación visual para nosotros
    await page.waitForTimeout(2000);
    console.log("Flujo completado sin usar un solo selector CSS.");

  } catch (error) {
    console.error("El agente falló:", error);
  } finally {
    await stagehand.close();
  }
}

main();
