import { Stagehand } from "@browserbasehq/stagehand";
import { StagehandConfig } from "../stagehand.config.ts";

async function runFlow(iteration: number) {
  console.log(`\nINICIO ITERACIÓN ${iteration}`);
  console.time(`Tiempo Total Iteración ${iteration}`);

  const stagehand = new Stagehand({
    ...StagehandConfig,
    // Aseguramos que el cache esté activo (por defecto lo está en v3)
  });

  try {
    await stagehand.init();
    const page = stagehand.context.activePage();
    if(!page) throw new Error("No page");

    await page.goto("https://www.saucedemo.com/");

    // Medimos acciones individuales para ver el impacto
    console.time("Login Action");
    await stagehand.act("Escribe 'standard_user' en el campo de usuario");
    await stagehand.act("Escribe 'secret_sauce' en el campo de contraseña");
    await stagehand.act("Haz click en el botón de login");
    await page.waitForTimeout(1500);

    // Agregar producto
    console.log("Agregando producto al carrito...");
    await stagehand.act("Haz click en el botón que dice 'Add to cart' del primer producto visible");
    await page.waitForTimeout(1000);

    // Ir al carrito
    console.log("Navegando al carrito...");
    await stagehand.act("Haz click en el icono del carrito de compras en la parte superior derecha de la página");
    await page.waitForTimeout(1500);
    
    // Verificación visual rápida
    const url = page.url();
    if (!url.includes("cart")) throw new Error("No llegamos al carrito");

  } catch (error) {
    console.error(`Fallo en iteración ${iteration}:`, error);
  } finally {
    await stagehand.close();
    console.timeEnd(`Tiempo Total Iteración ${iteration}`);
  }
}

async function main() {
  // PRIMERA EJECUCIÓN (Cold Start - Sin Cache)
  console.log("EJECUCIÓN EN FRÍO (Usando LLM)...");
  await runFlow(1);

  console.log("\n-----------------------------------\n");

  // SEGUNDA EJECUCIÓN (Warm Start - Con Cache)
  console.log("EJECUCIÓN EN CALIENTE (Usando Cache)...");
  await runFlow(2);
}

main();
